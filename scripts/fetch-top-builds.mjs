// Reads the top 10 players of every class with their complete builds from AION2 Index (https://aion2index.com) into
// public/data/top/<ClassType>.json plus public/data/top/index.json (format: src/features/top/types.ts).
// Runs once a day in GitHub Actions (.github/workflows/update-top-builds.yml), about 570 pages in 30 minutes:
// - robots.txt first (the groups that name DaevaforgeBot, else those for *): a disallowed character page drops that
//   player, any other disallowed URL stops the run before it is requested; URLs containing /api/ and paths starting with
//   /search or /admin are never requested,
// - one request at a time, 2.5 s + up to 1 s pause (longer if robots.txt sets a Crawl-delay), 30 s timeout; on HTTP
//   429 / 5xx one retry after 60 s, then the run stops and writes nothing; in GitHub Actions a run estimated to take
//   longer than TOP_BUDGET_MIN minutes (default 50, below the job's timeout) stops before its first page,
// - per class: ranking page 1 (all regions), the first 10 characters, each with overview, skills and the Daevanion
//   boards that have open nodes; plausibility checks per player (a failing player is dropped and logged) and per class
//   (at least 8 valid players, combat power descending; otherwise the class keeps its old file),
// - a class file is rewritten only when its content changed, or to confirm unchanged data once a week (see FETCHED_AT).
//
// Usage: node scripts/fetch-top-builds.mjs [--class <ClassType>]... [--limit <n>] [--min <n>] [--offline <dir>] [--out <dir>] [--purge]
//   --class    only these classes (repeatable; default: all 8 Global classes)
//   --limit    players per class (default 10); --min  valid players a class needs (default 80 % of --limit)
//   --offline  parse saved pages instead of fetching: <dir>/<URL without scheme, other characters as "_">.html,
//              e.g. aion2index_com_rankings_class_gladiator.html, aion2index_com_c_eu_kaisinel_Name_skills.html
//   --out      output directory (default public/data/top)
//   --purge    no request: only removes the EXCLUDED players from the class files in --out and rewrites index.json
// AION 2 © NCSOFT; the character data is public on AION2 Index.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJson } from './lib/files.mjs';
import {
  boardsToDv, classTypeFromSite, daevanionSkillBonus, decodeLearned, gearSkillLevels, maxBuyableLevel, parseBoard,
  parseOverview, parseRanking, parseSkills, shardCorrection, skillLevels, skillPointCorrection, stigmaSlots, toLearnedSet,
} from './lib/aion2index.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BASE = 'https://aion2index.com';
const UA = 'DaevaforgeBot/1.0 (+https://github.com/Cosmic-Game-studios/aion2-toolkit)';
const PAUSE = 2500;
const JITTER = 1000;
const TIMEOUT = 30_000;
const RETRY_WAIT = 60_000;
/** never requested, whatever robots.txt says: URLs containing /api/, paths starting with /search or /admin */
const REFUSED = '/api/';
const REFUSED_PATHS = ['/search', '/admin'];
/** a run longer than this many minutes would be cancelled by the job's timeout-minutes (update-top-builds.yml) */
const BUDGET_MIN = Number(process.env.TOP_BUDGET_MIN) || (process.env.GITHUB_ACTIONS ? 50 : 0);
const REGIONS = ['nae', 'naw', 'eu', 'la', 'as'];
/** share of --limit that must pass the checks, else the class keeps its old file (8 of 10) */
const MIN_SHARE = 0.8;
/** profile and ranking are read seconds apart; a bigger combat power gap means the pages do not belong together */
const CP_TOLERANCE = 0.1;
/**
 * FETCHED_AT rule: fetchedAt is the run that last wrote the file. A run whose data equals the file (fetchedAt ignored)
 * leaves it alone, so quiet days create no commit, unless the file's fetchedAt is older than this; then the file is
 * rewritten only to confirm it. So fetchedAt is never more than a week older than the last run that read the same data.
 */
const CONFIRM_DAYS = 7;
/** Our ClassType -> class slug on the source. Fighter (Brawler) is not on the Global service and has no ranking. */
const CLASSES = {
  Gladiator: 'gladiator', Templar: 'templar', Assassin: 'assassin', Ranger: 'ranger',
  Sorcerer: 'sorcerer', Elementalist: 'spiritmaster', Cleric: 'cleric', Chanter: 'chanter',
};
const safeDecode = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
/** "<region>/<server slug>/<name>" in one spelling: Unicode NFC, lower case */
const playerKey = (region, server, name) => `${region}/${server}/${name}`.normalize('NFC').toLowerCase();
/** "eu/kaisinel/Name", "/c/eu/kaisinel/Name" or the full AION2 Index link, plain or percent-encoded -> playerKey */
const linkKey = (s) => {
  const [region, server, name] = String(s).trim().replace(/^https?:\/\/[^/]+/i, '').replace(/^\/?c\//, '').split(/[?#]/)[0].split('/');
  return playerKey(...[region, server, name].map((x) => safeDecode(x ?? '')));
};
/**
 * Characters whose owners asked to be left out (README > Top builds), as "<region>/<server slug>/<name>" like the
 * source's URL /c/<region>/<server>/<name>; the AION2 Index link itself works too, also with a percent-encoded name.
 * They are skipped before any of their pages is requested, and --purge removes them from the files already written.
 */
const EXCLUDED = new Set([
  // 'eu/kaisinel/SomeName', 'https://aion2index.com/c/as/zikel/%E5%90%8D%E5%89%8D',
].map(linkKey));

// ------------------------------------------------------------------------------------------------ options

function parseArgs(argv) {
  const opt = { classes: [], limit: 10, min: null, offline: null, out: join(ROOT, 'public', 'data', 'top'), purge: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const val = () => {
      if (argv[i + 1] == null) throw new Error(`${a} needs a value`);
      return argv[++i];
    };
    if (a === '--class') {
      const v = val();
      const cls = Object.keys(CLASSES).find((c) => c.toLowerCase() === v.toLowerCase()) ?? classTypeFromSite(v);
      if (!CLASSES[cls]) throw new Error(`unknown or non-Global class "${v}" (${Object.keys(CLASSES).join(', ')})`);
      if (!opt.classes.includes(cls)) opt.classes.push(cls);
    } else if (a === '--limit' || a === '--min') {
      const n = Number(val());
      if (!Number.isInteger(n) || n < 1 || n > 50) throw new Error(`${a} must be 1..50`);
      opt[a.slice(2)] = n;
    } else if (a === '--offline') opt.offline = resolve(val());
    else if (a === '--out') opt.out = resolve(val());
    else if (a === '--purge') opt.purge = true;
    else throw new Error(`unknown option ${a}`);
  }
  if (!opt.classes.length) opt.classes = Object.keys(CLASSES);
  opt.min = Math.min(opt.min ?? Math.ceil(opt.limit * MIN_SHARE), opt.limit);
  return opt;
}

let opt;
try {
  opt = parseArgs(process.argv.slice(2));
} catch (e) {
  console.error(`${e.message}\nusage: node scripts/fetch-top-builds.mjs [--class <ClassType>]... [--limit <n>] [--min <n>] [--offline <dir>] [--out <dir>] [--purge]`);
  process.exit(2);
}

// ------------------------------------------------------------------------------------------------ our data

const DATA = join(ROOT, 'public', 'data');
const loadJson = async (file) => JSON.parse(await readFile(join(DATA, file), 'utf8'));
const tsConst = async (file, re) => {
  const m = re.exec(await readFile(join(ROOT, file), 'utf8'));
  if (!m) throw new Error(`${re} not found in ${file}`);
  return m[1];
};
const data = {
  skills: await loadJson('en/skills.json'),
  costs: await loadJson('en/skill-costs.json'),
  points: await loadJson('en/skill-points.json'),
  daevanion: await loadJson('en/daevanion.json'),
};
// the planner takes the Global learn level from learn-levels.json (src/data/loadData.ts); the skill point budget
// only counts skills learned at the character level
const learn = (await readJson(join(DATA, 'learn-levels.json')))?.skills ?? {};
const appSkills = data.skills.map((s) => ({ ...s, acquireLevel: learn[s.id]?.[0] ?? s.acquireLevel }));
const LEVEL_CAP = Number(await tsConst('src/lib/levelCap.ts', /GAME_LEVEL_CAP = (\d+)/));
/** normalizeBuild (src/state/build.ts) caps the gear levels of a skill at GAME_SKILL_CAP */
const GX_MAX = Number(await tsConst('src/lib/levelCap.ts', /GAME_SKILL_CAP = (\d+)/));
const SLOT_LEVELS = (await tsConst('src/lib/stigmaRules.ts', /STIGMA_SLOT_LEVELS = \[([\d,\s]+)\]/)).split(',').map(Number);

// ------------------------------------------------------------------------------------------------ requests

/** Stops the whole run; nothing is written. */
class StopRun extends Error {}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const inActions = !!process.env.GITHUB_ACTIONS;
const annotate = (level, msg) => { if (inActions) console.log(`::${level}::${msg}`); };

/**
 * robots.txt -> { rules: Allow/Disallow of the groups that name our product token DaevaforgeBot (RFC 9309), or of the
 * groups for User-agent * only when no group names us, crawlDelay: seconds, the largest of both kinds of group, 0 if none }.
 */
function parseRobots(text) {
  const groups = [];
  let cur = null;
  let agentLine = false;
  for (const raw of text.split(/\r?\n/)) {
    const m = /^\s*([A-Za-z-]+)\s*:\s*(.*?)\s*$/.exec(raw.replace(/#.*/, ''));
    if (!m) continue;
    const key = m[1].toLowerCase();
    if (key === 'user-agent') {
      if (!agentLine) groups.push(cur = { agents: [], rules: [], delay: 0 });
      cur.agents.push(m[2].toLowerCase());
      agentLine = true;
      continue;
    }
    agentLine = false;
    if (cur && (key === 'allow' || key === 'disallow') && m[2]) cur.rules.push({ allow: key === 'allow', path: m[2] });
    if (cur && key === 'crawl-delay') cur.delay = Math.max(cur.delay, Number(m[2]) || 0);
  }
  const token = (a) => a.split('/')[0].trim(); // "DaevaforgeBot/1.0" names us too
  const named = groups.filter((g) => g.agents.some((a) => token(a) === 'daevaforgebot'));
  const star = groups.filter((g) => g.agents.includes('*'));
  const ours = named.length ? named : star;
  return { rules: ours.flatMap((g) => g.rules), crawlDelay: Math.max(0, ...[...named, ...star].map((g) => g.delay)) };
}
/** RFC 9309: the longest matching rule wins, Allow on a tie; "*" matches any characters, a final "$" anchors. */
function robotsAllows({ rules }, url) {
  const u = new URL(url);
  const target = u.pathname + u.search;
  let best = null;
  for (const r of rules) {
    const anchored = r.path.endsWith('$');
    const body = anchored ? r.path.slice(0, -1) : r.path;
    const re = new RegExp(`^${body.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*')}${anchored ? '$' : ''}`);
    if (!re.test(target)) continue;
    if (!best || r.path.length > best.path.length || (r.path.length === best.path.length && r.allow)) best = r;
  }
  return !best || best.allow;
}
// self-check, no request: a group that names us replaces the * group, so a block by name is obeyed
if (robotsAllows(parseRobots('User-agent: *\nAllow: /\n\nUser-agent: DaevaforgeBot\nDisallow: /\n'), `${BASE}/rankings?class=gladiator`)
  || !robotsAllows(parseRobots('User-agent: *\nDisallow: /\n\nUser-agent: DaevaforgeBot/1.0\nAllow: /c/\n'), `${BASE}/c/eu/kaisinel/X`)) {
  throw new Error('robots.txt self-check failed: the groups that name DaevaforgeBot must replace the * group');
}

let robots = null;
let requests = 0;
let lastEnd = 0;

/**
 * One page -> { status, text } (text null for 404 / 410 / redirects). Any other answer stops the run: 429, 5xx and
 * network errors after one retry 60 s later, everything else at once.
 */
async function get(url) {
  const u = new URL(url);
  if (u.origin !== BASE) throw new StopRun(`refusing ${url}: not ${BASE}`);
  const path = u.pathname.toLowerCase();
  const prefix = REFUSED_PATHS.find((p) => path.startsWith(p));
  const refused = url.toLowerCase().includes(REFUSED) ? `contains ${REFUSED}` : prefix && `path starts with ${prefix}`;
  if (refused) throw new Error(`refusing to request ${url} (${refused})`);
  if (robots && !robotsAllows(robots, url)) {
    // a rule for one character page drops only that player (readClass logs it); any other disallowed URL stops the run
    if (path.startsWith('/c/')) throw new Error(`robots.txt disallows ${url}`);
    throw new StopRun(`robots.txt disallows ${url}`);
  }
  if (opt.offline) return readSaved(url);
  for (let attempt = 1; ; attempt++) {
    const wait = lastEnd + Math.max(PAUSE, (robots?.crawlDelay ?? 0) * 1000) + Math.random() * JITTER - Date.now();
    if (lastEnd && wait > 0) await sleep(wait);
    let res = null;
    let text = null;
    let error = null;
    try {
      res = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html,text/plain;q=0.9' }, redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT) });
      text = await res.text();
    } catch (e) { error = e; }
    lastEnd = Date.now();
    requests++;
    const status = res?.status ?? 0;
    console.log(`    GET ${url} -> ${error ? `${error.name}: ${error.message}` : status}${text ? ` (${Math.round(text.length / 1024)} KB)` : ''}`);
    if (status >= 200 && status < 300) return { status, text };
    if (status === 404 || status === 410) return { status, text: null };
    if (status >= 300 && status < 400) return { status, text: null, location: res.headers.get('location') };
    if (error || status === 429 || status >= 500) {
      if (attempt === 1) {
        console.log(`    waiting ${RETRY_WAIT / 1000} s before one retry`);
        await sleep(RETRY_WAIT);
        continue;
      }
      throw new StopRun(`${url}: ${error ? error.message : `HTTP ${status}`} again after the retry`);
    }
    throw new StopRun(`${url}: HTTP ${status}`);
  }
}

/** The saved file of a URL, named like the pages in a --offline directory. */
const savedName = (url) => url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
const savedBoards = new Map();
async function readSaved(url) {
  requests++;
  const text = await readFile(join(opt.offline, `${savedName(url)}.html`), 'utf8').catch(() => null);
  if (text != null) return { status: 200, text };
  // A saved board page may be named after another ?board=: the site shows the class's first board for a wrong id,
  // so e.g. a Cleric's "_daevanion_board_11" file holds board 71. Find it by the board it shows.
  const m = /^(.*\/daevanion\?board=)(\d+)$/.exec(url);
  if (m) {
    const prefix = savedName(m[1]);
    for (const f of (await readdir(opt.offline)).filter((x) => x.startsWith(prefix) && x.endsWith('.html'))) {
      if (!savedBoards.has(f)) {
        let id = null;
        try { id = parseBoard(await readFile(join(opt.offline, f), 'utf8')).boardId; } catch { /* not a board */ }
        savedBoards.set(f, id);
      }
      if (savedBoards.get(f) === Number(m[2])) return { status: 200, text: await readFile(join(opt.offline, f), 'utf8') };
    }
  }
  return { status: 404, text: null };
}

// ------------------------------------------------------------------------------------------------ one player

const fail = (msg) => { throw new Error(msg); };
const sameSet = (a, b) => a.size === b.size && [...a].every((k) => b.has(k));

/** One ranking row -> TopPlayer, or throws with the reason the player is dropped. */
async function readPlayer(cls, row) {
  if (row.classType !== cls) fail(`ranking lists the class as ${row.classType}`);
  if (!REGIONS.includes(row.region)) fail(`unknown region "${row.region}"`);
  if (!row.href) fail('no character link in the ranking');
  if (!row.updatedAt) fail('no update time in the ranking');
  if (!(Number.isInteger(row.level) && row.level >= 1 && row.level <= LEVEL_CAP)) fail(`level ${row.level} is outside 1..${LEVEL_CAP}`);
  if (!(row.cp > 0 && row.itemLevel > 0)) fail(`combat power ${row.cp} / item level ${row.itemLevel}`);
  const url = BASE + row.href;
  const ourBoards = new Map(data.daevanion.classes[cls].boards.map((b) => [b.id, b]));

  // ---- overview: identity, class, level, combat power, gear, Daevanion summary ----
  const ovPage = await get(url);
  if (!ovPage.text) fail(`profile page missing (HTTP ${ovPage.status}${ovPage.location ? ` -> ${ovPage.location}` : ''})`);
  const ov = parseOverview(ovPage.text);
  if (ov.classType !== cls) fail(`profile shows the class ${ov.classType}`);
  if (ov.name !== row.name) fail(`profile shows the name ${ov.name}`);
  if (row.siteId != null && ov.siteCharacterId != null && ov.siteCharacterId !== row.siteId) fail(`profile is character ${ov.siteCharacterId}, the ranking row ${row.siteId}`);
  if (ov.level !== row.level) fail(`profile shows level ${ov.level}, the ranking ${row.level}`);
  if (!(ov.cp > 0) || Math.abs(ov.cp - row.cp) > row.cp * CP_TOLERANCE) fail(`profile shows combat power ${ov.cp}, the ranking ${row.cp}`);
  if (row.faction && ov.faction && row.faction !== ov.faction) fail(`profile shows the faction ${ov.faction}, the ranking ${row.faction}`);
  if (!ov.daevanion.length) fail('no Daevanion summary on the profile');
  for (const d of ov.daevanion) {
    if (!ourBoards.has(d.boardId)) fail(`board ${d.boardId} is not in our Daevanion data`);
    if (!Number.isInteger(d.open) || !Number.isInteger(d.total)) fail(`no node counts for board ${d.boardId}`);
  }

  // ---- skills page ----
  const skPage = await get(`${url}/skills`);
  if (!skPage.text) fail(`skills page missing (HTTP ${skPage.status})`);
  const sk = parseSkills(skPage.text);
  if (sk.meta.classType !== cls || sk.meta.classTypeFromIds !== cls) fail(`skills page shows the class ${sk.meta.classType} (skill ids: ${sk.meta.classTypeFromIds})`);
  if (!sk.countsOk) fail(`skill sections do not match their counts (${sk.warnings.join('; ')})`);
  if (sk.meta.characterRef != null && ov.siteCharacterId != null && sk.meta.characterRef !== ov.siteCharacterId) fail(`skills page is character ${sk.meta.characterRef}`);
  if (sk.meta.characterLevel !== row.level) fail(`skills page shows level ${sk.meta.characterLevel}`);
  for (const w of sk.warnings) console.log(`    warning: ${w}`);

  const notes = [];
  const known = new Set(data.skills.filter((s) => s.classType === cls).map((s) => s.id));
  const unknown = [...sk.active, ...sk.passive, ...sk.stigma].filter((e) => e.learned && !known.has(e.id));
  if (unknown.length) {
    notes.push(`${unknown.map((e) => `${e.name} (${e.id})`).join(', ')} ${unknown.length === 1 ? 'is' : 'are'} not in our skill data yet and left out.`);
    for (const k of ['active', 'passive', 'stigma']) sk[k] = sk[k].filter((e) => known.has(e.id));
  }
  const gear = gearSkillLevels(ov, data.skills, cls);
  for (const u of gear.unmatched) notes.push(`A gear bonus of +${u.levels} to ${u.name} matches none of our skills and is left out.`);
  const stg = stigmaSlots(sk, SLOT_LEVELS);

  // ---- Daevanion boards with open nodes ----
  const boards = {};
  const openCount = new Map(); // node count per board as the board page itself shows it
  for (const d of ov.daevanion) {
    if (d.open === 0) continue;
    const page = await get(`${url}/daevanion?board=${d.boardId}`);
    const b = page.text ? parseBoard(page.text) : null;
    if (!b || b.boardId !== d.boardId) {
      // a wrong ?board= shows the class's first board instead (b.fallback)
      console.log(`    board ${d.boardId} missing (${b ? `the page shows board ${b.boardId}` : `HTTP ${page.status}`})`);
      notes.push(`The ${d.name} board could not be read, so its ${d.open} nodes are missing from the Daevanion build.`);
      continue;
    }
    if (b.route && (b.route.name !== row.name || b.route.region !== row.region)) fail(`board ${d.boardId} page belongs to ${b.route.region}/${b.route.name}`);
    if (b.classSlug && classTypeFromSite(b.classSlug) !== cls) fail(`board ${d.boardId} is a ${b.classSlug} board`);
    for (const w of b.warnings) console.log(`    warning: board ${d.boardId}: ${w}`);
    const open = toLearnedSet(b.cells).size;
    if (open !== b.open) fail(`board ${d.boardId}: ${open} open cells, the board header says ${b.open}`);
    // the profile's summary can lag behind the board page (read at different times); the board page is complete
    if (open !== d.open) console.log(`    warning: board ${d.boardId}: ${open} open nodes, the profile summary says ${d.open}; using the board page`);
    boards[d.boardId] = b;
    openCount.set(d.boardId, open);
  }
  const issues = [];
  const dv = boardsToDv(cls, boards, data.daevanion, issues);
  if (issues.length) fail(issues.join('; '));
  for (const [id, b] of Object.entries(boards)) {
    if (!sameSet(decodeLearned(ourBoards.get(Number(id)), dv[id] ?? ''), toLearnedSet(b.cells))) fail(`board ${id} does not survive the dv round trip`);
  }
  // the planner adds the skill nodes of dv itself, so the Daevanion part comes from those nodes, not from the page's
  // "incl. +N Daevanion" (the source leaves out nodes it cannot name; the shown level still includes them)
  const bonus = daevanionSkillBonus(cls, dv, data.daevanion);
  const lvl = skillLevels(sk, gear.gx, (id) => maxBuyableLevel(data.costs, id), bonus);
  if (!lvl.skills.length) fail('no learned skill with a level on the skills page');
  notes.push(...lvl.notes, ...stg.notes);
  if (Object.keys(boards).length === ov.daevanion.filter((d) => d.open > 0).length) {
    const off = [...sk.active, ...sk.passive].filter((e) => e.learned && e.levelKnown && (bonus.get(e.id) ?? 0) !== e.dvBonus);
    if (off.length) console.log(`    note: the source's Daevanion breakdown differs from the nodes for ${off.map((e) => `${e.id} (page +${e.dvBonus}, nodes +${bonus.get(e.id) ?? 0})`).join(', ')}; using the nodes`);
  }

  // ---- our build (src/state/build.ts; already what normalizeBuild returns) ----
  const gx = { ...lvl.gx };
  for (const [id, n] of Object.entries(gx)) {
    if (n <= GX_MAX) continue;
    gx[id] = GX_MAX;
    notes.push(`${data.skills.find((s) => s.id === Number(id))?.name ?? id}: ${n} gear levels, the planner keeps at most ${GX_MAX}.`);
  }
  const faction = row.faction ?? ov.faction ?? null;
  const build = {
    v: 1, c: cls, l: row.level, f: faction ?? 'Light', x: [], e: 0, se: 0, cdr: 0,
    lv: lvl.lv, sp: {}, gx, st: stg.st, dv, bar: {}, auto: [], macros: [],
  };
  // corrections so the planner does not show the build over budget (it knows no extra point sources of the player)
  build.e = skillPointCorrection(build, { skills: appSkills, costs: data.costs, points: data.points });
  build.se = shardCorrection(build, data, SLOT_LEVELS);

  const item = (g) => ({ slot: g.slot, name: g.name, grade: g.grade ?? '', enchant: g.enchant ?? 0, exceed: g.exceed ?? 0 });
  return {
    rank: row.rank,
    name: row.name,
    url,
    region: row.region,
    server: row.server ?? ov.server,
    faction,
    level: row.level,
    itemLevel: row.itemLevel,
    cp: row.cp,
    cp7d: row.cp7d,
    updatedAt: row.updatedAt,
    skills: lvl.skills,
    stigmas: stg.stigmas,
    boards: ov.daevanion.map((d) => ({ id: d.boardId, open: openCount.get(d.boardId) ?? d.open, total: d.total })),
    gear: ov.gear.filter((g) => g.itemId != null && g.name).map(item),
    arcana: ov.arcana.filter((g) => g.itemId != null && g.name).map(item),
    wings: ov.wings?.name ?? null,
    pet: ov.pet?.name ?? null,
    build,
    notes,
  };
}

// ------------------------------------------------------------------------------------------------ one class

async function readClass(cls, fetchedAt) {
  const url = `${BASE}/rankings?class=${CLASSES[cls]}`;
  console.log(`\n${cls}`);
  const page = await get(url);
  if (!page.text) return { cls, error: `ranking page missing (HTTP ${page.status})` };
  const rk = parseRanking(page.text);
  for (const w of rk.warnings) console.log(`    warning: ranking: ${w}`);
  const ranked = [...rk.rows].sort((a, b) => a.rank - b.rank);
  const allowed = ranked.filter((r) => !EXCLUDED.has(playerKey(r.region, r.serverSlug, r.name)));
  const rows = allowed.slice(0, opt.limit);
  const skipped = ranked.length - allowed.length;
  console.log(`  ${rk.total ?? '?'} ranked characters (${rk.source}), reading ${rows.length}${skipped ? ` (${skipped} on the page excluded)` : ''}`);
  const players = [];
  for (const row of rows) {
    const label = `#${row.rank} ${row.name} (${row.region}/${row.serverSlug})`;
    console.log(`  ${label}`);
    try {
      const p = await readPlayer(cls, row);
      players.push(p);
      console.log(`  ok: ${p.skills.length} skills, ${p.stigmas.filter((s) => s.slot).length} slotted stigmas, ${Object.keys(p.build.dv).length} boards, e ${p.build.e}, se ${p.build.se}${p.notes.length ? `, ${p.notes.length} note(s)` : ''}`);
    } catch (e) {
      if (e instanceof StopRun) throw e;
      console.log(`  dropped ${label}: ${e.message}`);
      annotate('warning', `Top builds ${cls}: dropped ${label}: ${e.message}`);
    }
  }
  if (players.length < opt.min) return { cls, error: `only ${players.length} of ${rows.length} players passed the checks (${opt.min} needed)` };
  const i = players.findIndex((p, k) => k > 0 && players[k - 1].cp < p.cp);
  if (i > 0) return { cls, error: `combat power is not descending at rank ${players[i].rank}` };
  return { cls, file: { v: 1, cls, fetchedAt, source: { name: 'AION2 Index', url }, total: rk.total ?? null, players } };
}

// ------------------------------------------------------------------------------------------------ output

/** Compact JSON with one player per line, so a data update gives a readable diff. */
function render(file) {
  const head = JSON.stringify({ ...file, players: [] }).slice(0, -2); // ends with "players":[
  return `${head}\n${file.players.map((p) => JSON.stringify(p)).join(',\n')}\n]}\n`;
}
const withoutFetchedAt = (f) => JSON.stringify({ ...f, fetchedAt: null });

/** Writes the class file unless the old one holds the same data and was confirmed less than CONFIRM_DAYS ago. */
async function writeClass(file) {
  const path = join(opt.out, `${file.cls}.json`);
  const old = await readJson(path);
  if (old && withoutFetchedAt(old) === withoutFetchedAt(file)) {
    const age = Date.parse(file.fetchedAt) - Date.parse(old.fetchedAt);
    if (age < CONFIRM_DAYS * 86_400_000) return 'unchanged';
    await writeFile(path, render(file));
    return 'unchanged, fetchedAt confirmed';
  }
  await writeFile(path, render(file));
  return old ? 'updated' : 'created';
}

/** index.json from the class files on disk (also those this run did not touch); fetchedAt = the newest class file. */
async function writeIndex(fetchedAt) {
  const classes = [];
  for (const cls of Object.keys(CLASSES)) {
    const f = await readJson(join(opt.out, `${cls}.json`));
    if (f?.cls === cls && Array.isArray(f.players)) classes.push({ cls, players: f.players.length, fetchedAt: f.fetchedAt });
  }
  const newest = classes.map((c) => c.fetchedAt).sort().at(-1) ?? fetchedAt;
  const text = `${JSON.stringify({ v: 1, fetchedAt: newest, classes: [] }).slice(0, -2)}\n${classes.map((c) => JSON.stringify(c)).join(',\n')}\n]}\n`;
  const path = join(opt.out, 'index.json');
  if ((await readFile(path, 'utf8').catch(() => null)) === text) return 'unchanged';
  await writeFile(path, text);
  return 'written';
}

/**
 * Removes the EXCLUDED players from the class files on disk, also from those this run kept or did not read; no request.
 * fetchedAt stays, since nothing was read again. Returns one line per changed file.
 */
async function purgeExcluded() {
  const changed = [];
  for (const cls of Object.keys(CLASSES)) {
    const path = join(opt.out, `${cls}.json`);
    const f = await readJson(path);
    if (f?.cls !== cls || !Array.isArray(f.players)) continue;
    const players = f.players.filter((p) => !EXCLUDED.has(linkKey(p.url ?? '')));
    if (players.length === f.players.length) continue;
    await writeFile(path, render({ ...f, players }));
    changed.push(`${cls}: removed ${f.players.length - players.length} excluded player(s)`);
  }
  return changed;
}

// ------------------------------------------------------------------------------------------------ run

async function main() {
  const fetchedAt = new Date().toISOString();
  console.log(`Top builds from ${BASE}${opt.offline ? ` (offline: ${opt.offline})` : ''}: ${opt.classes.join(', ')}, ${opt.limit} per class, ${opt.min} needed`);
  const rb = await get(`${BASE}/robots.txt`);
  if (rb.text == null && rb.status !== 404 && rb.status !== 410) throw new StopRun(`robots.txt could not be read (HTTP ${rb.status})`);
  robots = parseRobots(rb.text ?? ''); // no robots.txt = no rules
  console.log(`robots.txt: ${robots.rules.length} rule(s) for us${robots.crawlDelay ? `, crawl delay ${robots.crawlDelay} s` : ''}`);
  // a run the job's timeout cancels would make all its requests for nothing, so it stops before the first page instead
  // (per class the ranking, per player overview, skills and at most all boards; pause + mean jitter + ~0.3 s answer)
  const pages = opt.classes.reduce((n, cls) => n + 1 + opt.limit * (2 + data.daevanion.classes[cls].boards.length), 0);
  const minutes = Math.ceil(pages * (Math.max(PAUSE, robots.crawlDelay * 1000) + JITTER / 2 + 300) / 60_000);
  console.log(`about ${pages} pages, ${minutes} min${BUDGET_MIN ? ` (budget ${BUDGET_MIN} min)` : ''}`);
  if (!opt.offline && BUDGET_MIN && minutes > BUDGET_MIN) {
    throw new StopRun(`${pages} pages${robots.crawlDelay ? ` at a crawl delay of ${robots.crawlDelay} s` : ''} need about ${minutes} min, over the ${BUDGET_MIN} min budget; raise timeout-minutes and TOP_BUDGET_MIN in .github/workflows/update-top-builds.yml`);
  }

  const results = [];
  for (const cls of opt.classes) results.push(await readClass(cls, fetchedAt));

  await mkdir(opt.out, { recursive: true });
  console.log(`\n${requests} request(s). Results:`);
  for (const r of results) {
    if (r.error) {
      console.log(`  ${r.cls}: kept the old file: ${r.error}`);
      annotate('warning', `Top builds ${r.cls}: kept the old file: ${r.error}`);
    } else {
      console.log(`  ${r.cls}: ${r.file.players.length} players, ${await writeClass(r.file)}`);
    }
  }
  for (const line of await purgeExcluded()) console.log(`  ${line}`);
  console.log(`  index.json: ${await writeIndex(fetchedAt)}`);
  if (results.every((r) => r.error)) {
    annotate('error', 'Top builds: no class passed the checks');
    process.exitCode = 1;
  }
}

try {
  if (opt.purge) {
    const changed = await purgeExcluded();
    console.log(changed.length ? changed.join('\n') : `No EXCLUDED player in the class files in ${opt.out}.`);
    if (changed.length) console.log(`index.json: ${await writeIndex(new Date().toISOString())}`);
  } else await main();
} catch (e) {
  if (!(e instanceof StopRun)) throw e;
  console.error(`\nStopped: ${e.message}\nNo file was written.`);
  annotate('error', `Top builds: run stopped, no file written: ${e.message}`);
  process.exitCode = 1;
}
