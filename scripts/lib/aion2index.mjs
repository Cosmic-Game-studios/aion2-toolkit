// Reads AION2 Index (https://aion2index.com) pages for scripts/fetch-top-builds.mjs and maps them to our Build
// (src/state/build.ts). Plain Node ESM, no dependencies, fetches nothing.
// The site is a Next.js app-router site: every value a page shows is also in the React Server Components ("flight")
// payload the HTML carries in <script>self.__next_f.push([1,"..."])</script> chunks, so the parsers read that payload
// instead of scraping markup.
//
//   parseRanking(html)   /rankings?class=<slug>                               ranked characters of one class
//   parseOverview(html)  /c/<region>/<server>/<name>                          header, gear, Arcana, Daevanion summary
//   parseSkills(html)    /c/<region>/<server>/<name>/skills                   skill and stigma levels and marks
//   parseBoard(html)     /c/<region>/<server>/<name>/daevanion?board=<id>     the cells of one Daevanion board
//   gearSkillLevels, skillLevels, stigmaSlots, boardsToDv, skillPointCorrection, shardCorrection
//                        the parts of our Build these pages can fill
//
// What the marks mean (checked on a Gladiator and a Cleric, both level 45, 2026-10-15):
// - The number badge on a skill is the level the game shows: bought levels + Daevanion ("incl. +N Daevanion")
//   + skill levels from gear and Arcana (the overview's item tooltips list them per item).
// - Gold icon border = on a skill bar (no key position); grey border + grayscale = not learned.
// - Stigmas: the "Equipped stigma" mark also sits on stigmas of another preset or bar. Only the levelled marked ones
//   are in the slots (exactly 4 per sample = the 4 slots at level 45); the others have level 0.
// - Specialisation lines only show unlocked / locked (part level <= skill level), not which parts the player picked,
//   and no page has key positions, so Build.sp and Build.bar stay empty.

// ------------------------------------------------------------------------------------------------ RSC payload

const PUSH_RE = /<script[^>]*>\s*self\.__next_f\.push\((\[[\s\S]*?\])\)\s*;?\s*<\/script>/g;

/**
 * Joins every self.__next_f.push([1,"..."]) chunk (each JSON-decoded) into the flight text. [3,"<base64>"] binary
 * chunks are decoded as UTF-8 and appended in order; [0] bootstrap and [2, ...] form-state chunks are skipped.
 * `stats` (optional) receives {chunks, used, skipped}, so a chunk that failed to decode is not lost silently.
 */
export function decodeRsc(html, stats) {
  let out = '', chunks = 0, used = 0, skipped = 0;
  for (const m of html.matchAll(PUSH_RE)) {
    chunks++;
    let arr;
    try { arr = JSON.parse(m[1]); } catch { skipped++; continue; }
    if (!Array.isArray(arr)) { skipped++; continue; }
    if (arr[0] === 1 && typeof arr[1] === 'string') { out += arr[1]; used++; }
    else if (arr[0] === 3 && typeof arr[1] === 'string') {
      try { out += Buffer.from(arr[1], 'base64').toString('utf8'); used++; } catch { skipped++; }
    }
  }
  if (stats && typeof stats === 'object') Object.assign(stats, { chunks, used, skipped });
  return out;
}

/**
 * Splits flight text into rows `<hexId>:<payload>\n` -> Map<id, {tag, value}>. tag '' = JSON row (parsed),
 * 'I' = client component import [module, chunks, exportName], 'T' = text row (`T<hexLen>,`, length in UTF-8 bytes,
 * may contain newlines), other letters as sent (HL hints, E errors). Id-less rows (":HL[...]") are skipped.
 */
export function rscRows(text) {
  const buf = Buffer.from(text, 'utf8');
  const rows = new Map();
  let p = 0;
  while (p < buf.length) {
    if (buf[p] === 0x0a) { p++; continue; } // a text row may or may not be followed by a newline
    const colon = buf.indexOf(0x3a, p);
    if (colon < 0) break;
    const id = buf.subarray(p, colon).toString();
    const q = colon + 1;
    if (buf[q] === 0x54 /* T */ && /^[0-9a-f]+,/.test(buf.subarray(q + 1, q + 12).toString())) {
      const comma = buf.indexOf(0x2c, q);
      const len = parseInt(buf.subarray(q + 1, comma).toString(), 16);
      if (id) rows.set(id, { tag: 'T', value: buf.subarray(comma + 1, comma + 1 + len).toString() });
      p = comma + 1 + len;
      continue;
    }
    const nl = buf.indexOf(0x0a, q);
    const end = nl < 0 ? buf.length : nl;
    const body = buf.subarray(q, end).toString();
    const mt = /^([A-Z]{1,3})(?=[[{"])/.exec(body);
    const tag = mt ? mt[1] : '';
    if (id && /^[0-9a-f]+$/.test(id)) {
      let value;
      try { value = JSON.parse(tag ? body.slice(tag.length) : body); } catch { value = body; }
      rows.set(id, { tag, value });
    }
    p = end + 1;
  }
  return rows;
}

/**
 * React Flight scalar escapes, applied once per string: "$$x" -> "$x", "$D<iso>" -> "<iso>", "$undefined" ->
 * undefined, "$NaN" / "$Infinity" / "$-Infinity" / "$-0" -> numbers. Other "$.." strings ("$S..", "$n..") stay.
 */
function unescapeRsc(s) {
  if (typeof s !== 'string' || s[0] !== '$') return s;
  if (s[1] === '$') return s.slice(1);
  if (s[1] === 'D') return s.slice(2);
  if (s === '$undefined') return undefined;
  if (s === '$NaN') return NaN;
  if (s === '$Infinity') return Infinity;
  if (s === '$-Infinity') return -Infinity;
  if (s === '$-0') return -0;
  return s;
}

/**
 * Resolves flight references: "$<hex>", "$@<hex>" (promise) and "$L<hex>" (lazy element), each with an optional
 * ":prop:path" suffix, become the referenced row's resolved value. A reference to a client component import stays the
 * string "$L<hex>" (componentName() names it); other strings are unescaped once. Shared rows resolve to the same
 * object (memoised, so tree walkers keep a visited set); a cycle resolves to null.
 */
export function createResolver(rows) {
  const cache = new Map();
  const get = (id) => {
    if (cache.has(id)) return cache.get(id);
    const r = rows.get(id);
    if (!r) return undefined;
    if (r.tag === 'T') return r.value;
    cache.set(id, null); // cycle guard
    const v = walk(r.value);
    cache.set(id, v);
    return v;
  };
  const walk = (v) => {
    if (typeof v === 'string') {
      const m = /^\$[L@]?([0-9a-f]+)((?::[^:]+)*)$/.exec(v);
      if (!m || !rows.has(m[1])) return unescapeRsc(v);
      if (rows.get(m[1]).tag === 'I') return `$L${m[1]}`;
      let x = get(m[1]);
      if (m[2]) for (const k of m[2].slice(1).split(':')) x = x?.[k];
      return x;
    }
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') {
      const o = {};
      for (const k of Object.keys(v)) o[k] = walk(v[k]);
      return o;
    }
    return v;
  };
  return { get, walk };
}

/** Export name of a client component element type ("$L2e" -> "GearInspector"), or the html tag. */
function componentName(type, rows) {
  const m = /^\$L([0-9a-f]+)$/.exec(type);
  const r = m ? rows.get(m[1]) : null;
  return r?.tag === 'I' && Array.isArray(r.value) ? r.value[2] || '' : type;
}

/** Depth-first search over the raw (unresolved) JSON rows for nodes matching pred(node). */
function findInRsc(rows, pred) {
  let hit;
  const walk = (node) => {
    if (hit !== undefined || !node || typeof node !== 'object') return;
    if (pred(node)) { hit = node; return; }
    for (const v of Array.isArray(node) ? node : Object.values(node)) walk(v);
  };
  for (const r of rows.values()) {
    if (r.tag !== '') continue;
    walk(r.value);
    if (hit !== undefined) break;
  }
  return hit;
}

/** Resolved props of the first element of a client component, found by its export name (e.g. "RankingsBoard"). */
function findComponentProps(rows, exportName) {
  const refs = new Set();
  for (const [id, r] of rows) if (r.tag === 'I' && Array.isArray(r.value) && r.value[2] === exportName) refs.add(`$L${id}`);
  if (!refs.size) return undefined;
  const node = findInRsc(rows, (n) => Array.isArray(n) && n[0] === '$' && refs.has(n[1]));
  return node ? createResolver(rows).walk(node[3]) : undefined;
}

// ------------------------------------------------------------------------------------------------ small helpers

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
function decodeEntities(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (all, e) => {
    if (e[0] === '#') {
      const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : all;
    }
    return NAMED[e.toLowerCase()] ?? all;
  });
}
const stripTags = (s) => decodeEntities(s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '')).trim();
/** "3,431" -> 3431 (every digit of the text; for table cells) */
const digitsOf = (s) => {
  if (s == null) return null;
  const t = String(s).replace(/[^\d.\-]/g, '');
  return t === '' || t === '-' ? null : Number(t);
};
/** "Level 45" / "237,373" -> the first number in the text */
const num = (s) => {
  if (s == null) return null;
  const m = String(s).replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
};
const clean = (v) => (v === undefined || v === '$undefined' || v === '' ? null : v);
const arr = (v) => (Array.isArray(v) ? v : []);
const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
/** decodeURIComponent that never throws (malformed % sequences are returned unchanged) */
const safeDecode = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
/** ".../Icon_WP_GS_0100_T06.png" -> "Icon_WP_GS_0100_T06" */
const iconId = (url) => {
  if (!url) return null;
  const m = /\/([^/?#]+?)\.(png|webp|jpg)(\?|#|$)/i.exec(String(url));
  return m ? m[1] : null;
};

// ------------------------------------------------------------------------------------------------ classes

/** Class slug / name on the source -> our ClassType. The source calls the Elementalist "Spiritmaster". */
const SITE_CLASS_TO_CLASSTYPE = {
  gladiator: 'Gladiator', templar: 'Templar', assassin: 'Assassin', ranger: 'Ranger',
  sorcerer: 'Sorcerer', spiritmaster: 'Elementalist', elementalist: 'Elementalist',
  cleric: 'Cleric', chanter: 'Chanter', fighter: 'Fighter', brawler: 'Fighter',
};
export function classTypeFromSite(key) {
  if (!key) return null;
  return SITE_CLASS_TO_CLASSTYPE[String(key).toLowerCase().replace(/[^a-z]/g, '')] ?? null;
}
/** First two digits of the 8-digit skill ids per ClassType (checked against public/data/en/skills.json). */
const CLASS_BY_ID_PREFIX = { 11: 'Gladiator', 12: 'Templar', 13: 'Assassin', 14: 'Ranger', 15: 'Sorcerer', 16: 'Elementalist', 17: 'Cleric', 18: 'Chanter', 19: 'Fighter' };
/** Ranking raceId -> our Faction (raceId 1 shows "ELYOS" on the profile, raceId 2 "ASMODIAN"). */
const FACTION_BY_RACE = { 1: 'Light', 2: 'Dark' };

// ------------------------------------------------------------------------------------------------ ranking

/** Server id scheme seen in RSC `servers` and avatar URLs: <race 1|2><region digit 1-5><2-digit n>. */
const decodeServerKey = (key) => {
  const s = String(key ?? '');
  return /^[12][1-5]\d\d$/.test(s) ? { serverKey: Number(s), raceId: Number(s[0]) } : null;
};

/**
 * Avatar ring colour of a ranking row ("box-shadow:0 0 0 2px #XXXXXX"): #F0B84A on every raceId 1 row, #A98BFF on every
 * raceId 2 row (100/100 on the samples). Used only when the avatar URL (server key) is missing.
 */
const RING_RACE = { F0B84A: 1, A98BFF: 2 };

function parseHtmlRow(tr) {
  const hrefM = /<a\b[^>]*\bhref="(\/c\/[^"]+)"/.exec(tr);
  if (!hrefM) return null;
  const href = decodeEntities(hrefM[1]);
  const [, region, server, ...nameParts] = href.split('/').slice(1);
  const tds = [...tr.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);

  let rank = null;
  const podium = /aria-label="Rank (\d+)"/.exec(tr);
  if (podium) rank = Number(podium[1]);
  else if (tds[0]) rank = digitsOf(stripTags(tds[0]));

  const nameM = /<span class="font-semibold">([\s\S]*?)<\/span>/.exec(tr);
  const classTitle = /<span title="([^"]+)"/.exec(tr);
  const classIcon = /class_icon_([a-z_]+)\.png/.exec(tr);
  const serverM = /href="\/servers\/([^/"]+)\/([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<span[^>]*>([\s\S]*?)<\/span>/.exec(tr);
  const imgM = /\/img\/p\/(\d+)\/(\d+)/.exec(tr);
  const timeM = /<time\b[^>]*\bdateTime="([^"]+)"/i.exec(tr);

  // Column layout: 0 rank | 1 character | 2 server | 3 lv | 4 item lv | 5 cp + time | 6 7-day change
  const cpM = tds[5] ? /<span[^>]*text-cp[^>]*>([\s\S]*?)<\/span>/.exec(tds[5]) : null;
  let cp7d = null;
  if (tds[6] != null) {
    const t = stripTags(tds[6]);
    const v = digitsOf(t.replace(/[▲▼+\-−]/g, ''));
    if (v != null) cp7d = /[▼\-−]/.test(t) || /text-down/.test(tds[6]) ? -v : v;
  }
  const sk = imgM ? decodeServerKey(imgM[1]) : null;
  const ringM = /box-shadow:0 0 0 2px #([0-9A-Fa-f]{6})"/.exec(tr);
  const raceId = sk?.raceId ?? (ringM ? RING_RACE[ringM[1].toUpperCase()] ?? null : null);
  return {
    rank,
    name: nameM ? stripTags(nameM[1]) : safeDecode(nameParts.join('/')),
    href,
    region: serverM ? serverM[1] : region,
    server: serverM ? stripTags(serverM[3]) : null,
    serverSlug: serverM ? decodeEntities(serverM[2]) : server,
    level: tds[3] != null ? digitsOf(stripTags(tds[3])) : null,
    itemLevel: tds[4] != null ? digitsOf(stripTags(tds[4])) : null,
    cp: cpM ? digitsOf(stripTags(cpM[1])) : null,
    updatedAt: timeM ? timeM[1] : null,
    cp7d,
    classType: classTypeFromSite(classIcon?.[1] ?? classTitle?.[1]),
    raceId: raceId ?? null,
    faction: FACTION_BY_RACE[raceId] ?? null,
    serverKey: sk?.serverKey ?? null,
    charKey: imgM ? imgM[2] : null,
  };
}

/** Rows of the streamed HTML table (fallback and cross-check) and the "N ranked characters" total. */
function parseRankingHtml(html) {
  // only <tr> that link to a character; the Suspense skeleton <tbody> (placeholder rows) has none
  const rows = [];
  for (const tb of html.matchAll(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/g)) {
    for (const tr of tb[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)) {
      const r = parseHtmlRow(tr[0]);
      if (r) rows.push(r);
    }
  }
  const totalM = /<span class="font-mono text-text">([\d,]+)<\/span>\s*(?:<!-- -->)?\s*ranked characters/.exec(html)
    ?? /Showing\s*(?:<!-- -->)?[\d,]+(?:<!-- -->)?\s*[–-]\s*(?:<!-- -->)?[\d,]+(?:<!-- -->)?\s*of\s*(?:<!-- -->)?([\d,]+)/.exec(html);
  return { rows, total: totalM ? digitsOf(totalM[1]) : null };
}

/** RankingsBoard.initialData: {rows: [...], total, page, pages}. An empty rows array is valid (page past the end). */
function isRankingData(n) {
  if (!n || Array.isArray(n) || typeof n !== 'object' || !Array.isArray(n.rows)) return false;
  if (n.rows.length === 0) return typeof n.total === 'number';
  return !!n.rows[0] && typeof n.rows[0] === 'object' && 'combatPower' in n.rows[0];
}

/** One resolved RSC ranking row -> our row. `serverIds` ("region/name" -> server id) fills serverKey without an avatar. */
function rowFromRsc(r, serverIds) {
  const img = typeof r.profileImage === 'string' ? /gameServerKey=(\d+)&(?:amp;)?charKey=(\d+)/.exec(r.profileImage) : null;
  const name = typeof r.name === 'string' ? r.name : r.name == null ? null : String(r.name);
  const region = r.region ?? null;
  return {
    rank: r.rank ?? null,
    name,
    href: region && r.serverSlug && name != null ? `/c/${region}/${r.serverSlug}/${encodeURIComponent(name)}` : null,
    region,
    server: r.serverName ?? null,
    serverSlug: r.serverSlug ?? null,
    level: r.level ?? null,
    itemLevel: r.itemLevel ?? null,
    cp: r.combatPower ?? null,
    updatedAt: typeof r.lastInfoAt === 'string' ? r.lastInfoAt : null,
    cp7d: typeof r.weekChange === 'number' ? r.weekChange : null,
    classType: classTypeFromSite(r.classKey),
    raceId: r.raceId ?? null,
    faction: FACTION_BY_RACE[r.raceId] ?? null,
    serverKey: img ? Number(img[1]) : serverIds?.get(`${region}/${r.serverName}`) ?? null,
    charKey: img ? img[2] : null,
    siteId: r.id ?? null, // == RefreshStatus.characterRef on the character pages
  };
}

/** Fields compared between the RSC row and the HTML row of the same rank (null on either side = not compared). */
const CROSS_CHECK_FIELDS = ['name', 'region', 'serverSlug', 'level', 'itemLevel', 'cp', 'updatedAt', 'cp7d', 'raceId', 'serverKey', 'charKey', 'classType'];

/**
 * Ranking page /rankings?class=<slug>[&page=N] -> { source: 'rsc'|'html'|'none', rows, total, page, warnings }.
 * Rows come from the RSC payload (RankingsBoard props initialData {rows,total,page,pages} and servers), else from the
 * streamed HTML table. When both exist, the href of the HTML row with the same rank replaces the RSC-derived one (so the
 * URL encoding is exactly the site's) and every other field is cross-checked; disagreements go to `warnings`.
 */
export function parseRanking(html) {
  const warnings = [];
  const stats = {};
  const payload = decodeRsc(html, stats);
  if (stats.skipped) warnings.push(`${stats.skipped} of ${stats.chunks} RSC chunks could not be decoded`);
  const rows = rscRows(payload);
  const props = findComponentProps(rows, 'RankingsBoard') ?? null;
  let data = props?.initialData;
  if (!isRankingData(data)) {
    // fallback: the first object shaped like {rows, total} anywhere in the payload (refs resolved before testing)
    const { walk } = createResolver(rows);
    const cand = findInRsc(rows, (n) => !Array.isArray(n) && 'rows' in n && 'total' in n && isRankingData(walk(n)));
    data = cand ? walk(cand) : null;
    if (props && !data) warnings.push('RankingsBoard found but its initialData has no ranking rows');
  }
  const h = parseRankingHtml(html);
  const serverIds = Array.isArray(props?.servers) ? new Map(props.servers.map((s) => [`${s.region}/${s.name}`, s.id])) : null;

  let source, list;
  if (data) {
    source = 'rsc';
    const byRank = new Map(h.rows.map((r) => [r.rank, r]));
    if (h.rows.length && h.rows.length !== data.rows.length) warnings.push(`RSC has ${data.rows.length} rows, HTML table has ${h.rows.length}`);
    list = data.rows.map((r) => {
      const row = rowFromRsc(r, serverIds);
      const hr = byRank.get(row.rank);
      if (!hr) {
        if (h.rows.length) warnings.push(`rank ${row.rank}: no HTML row`);
        return row;
      }
      const diff = CROSS_CHECK_FIELDS.filter((f) => hr[f] != null && row[f] != null && hr[f] !== row[f]);
      if (diff.length) warnings.push(`rank ${row.rank}: RSC/HTML differ in ${diff.map((f) => `${f} (${JSON.stringify(row[f])} vs ${JSON.stringify(hr[f])})`).join(', ')}`);
      if (hr.name === row.name) row.href = hr.href;
      return row;
    });
  } else {
    source = h.rows.length ? 'html' : 'none';
    list = h.rows;
  }
  return { source, rows: list, total: data?.total ?? h.total ?? null, page: data?.page ?? null, warnings };
}

// ------------------------------------------------------------------------------------------------ element trees

const isEl = (n) => Array.isArray(n) && n[0] === '$' && typeof n[1] === 'string' && n.length >= 4;
const propsOf = (el) => (el && el[3]) || {};
const classOf = (el) => String(propsOf(el).className ?? '');

/**
 * Depth-first walk over every element (overview). cb(el, ancestors) with el = {type, key, props, node}; type is the
 * html tag or the client component's export name. Element-valued props other than children (HoverCard "card") are
 * walked too.
 */
function walkElements(tree, rows, cb) {
  const stack = [];
  (function visit(n) {
    if (n == null || typeof n !== 'object') return;
    if (isEl(n)) {
      const props = n[3] || {};
      const el = { type: componentName(n[1], rows), key: n[2], props, node: n };
      cb(el, stack);
      stack.push(el);
      for (const k of Object.keys(props)) if (k !== 'children' && props[k] && typeof props[k] === 'object') visit(props[k]);
      visit(props.children);
      stack.pop();
      return;
    }
    if (Array.isArray(n)) { for (const x of n) visit(x); return; }
    for (const k of Object.keys(n)) visit(n[k]);
  })(tree);
}

const findElement = (tree, rows, pred) => {
  let hit = null;
  walkElements(tree, rows, (el, anc) => { if (!hit && pred(el, anc)) hit = el; });
  return hit;
};

/** Concatenated text (string/number children only; element-valued non-children props are ignored). */
function textOf(n) {
  if (n == null || typeof n === 'boolean') return '';
  if (typeof n === 'string' || typeof n === 'number') return String(n);
  if (isEl(n)) return textOf((n[3] || {}).children);
  if (Array.isArray(n)) return n.map(textOf).join('');
  return '';
}

/** Direct element children of an element node. */
const childElements = (node) => {
  const out = [];
  (function f(x) { if (isEl(x)) out.push(x); else if (Array.isArray(x)) x.forEach(f); })((node[3] || {}).children);
  return out;
};

/** Raw children list of an element (skills page helpers below). */
const childrenOf = (el) => {
  const c = propsOf(el).children;
  return c == null ? [] : Array.isArray(c) && !isEl(c) ? c : [c];
};
/** Depth-first in document order over children only (not into props.card, the hover card); fn returning false prunes. */
function visit(node, fn, seen = new Set()) {
  if (node == null || typeof node !== 'object' || seen.has(node)) return;
  seen.add(node);
  if (isEl(node)) {
    if (fn(node) === false) return;
    visit(propsOf(node).children, fn, seen);
  } else if (Array.isArray(node)) {
    for (const c of node) visit(c, fn, seen);
  }
}
function findAll(node, pred) {
  const out = [];
  visit(node, (el) => { if (pred(el)) out.push(el); });
  return out;
}
const find = (node, pred) => findAll(node, pred)[0];
/** Visible text: skips aria-hidden decorations (bullets, swatches) and images. */
function visibleText(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (isEl(node)) {
    const h = propsOf(node)['aria-hidden'];
    if (node[1] === 'img' || h === 'true' || h === true) return '';
    return visibleText(propsOf(node).children);
  }
  if (Array.isArray(node)) return node.map(visibleText).join('');
  return '';
}

// ------------------------------------------------------------------------------------------------ overview

/**
 * Character overview /c/<region>/<server>/<name> -> {
 *   name, classType, level, itemLevel, cp, server, serverSlug, regionCode, faction ('Light'|'Dark'), siteCharacterId, url,
 *   gear / arcana: [{slot, itemId, name, grade, enchant, exceed, skills: [{name, level, icon}]}], wings, pet,
 *   daevanion: [{boardId, name, open, total}], gearSkillBonus: [{name, icon, levels, from}]
 * }. Throws on a page without a character (not found / error page) or on a sub-page.
 */
export function parseOverview(html) {
  const rows = rscRows(decodeRsc(html));
  if (!rows.has('0')) throw new Error('no RSC payload found');
  const root = rows.get('0').value;
  const tree = createResolver(rows).get('0');

  // URL segments: ["", "c", region, server, name]; sub-pages add a segment ("skills", "daevanion?board=11")
  const seg = (Array.isArray(root?.c) ? root.c : []).map((s) => String(s));
  if (seg[1] !== 'c' || seg.length < 5) throw new Error(`not a character page (/${seg.slice(1).join('/')})`);
  if (seg[5]) throw new Error(`not an overview page (sub-route "${seg[5]}")`);
  const stripQuery = (s) => (s == null ? s : s.replace(/[?#].*$/, ''));
  const urlRegion = stripQuery(seg[2]);
  const urlServer = stripQuery(seg[3]);
  const urlName = stripQuery(seg[4]); // percent-encoded for non-Latin names

  const out = {
    name: null, classType: null, level: null, itemLevel: null, cp: null,
    server: null, serverSlug: urlServer ? safeDecode(urlServer) : null, regionCode: urlRegion || null,
    faction: null, siteCharacterId: null, url: null,
    gear: [], arcana: [], wings: null, pet: null, daevanion: [], gearSkillBonus: [],
  };

  const canon = findElement(tree, rows, (el) => el.type === 'link' && el.props.rel === 'canonical' && typeof el.props.href === 'string');
  out.url = canon ? canon.props.href : `https://aion2index.com/c/${urlRegion}/${urlServer}/${encodeURIComponent(safeDecode(urlName))}`;

  // ---- header (ProfileNav) ----
  const navEl = findElement(tree, rows, (el) => el.type === 'ProfileNav');
  const nav = navEl?.node || tree;
  const h1 = findElement(nav, rows, (el) => el.type === 'h1');
  out.name = (h1 ? textOf(h1.node).trim() : '') || (urlName ? safeDecode(urlName) : null);

  let className = null;
  walkElements(nav, rows, (el) => {
    const p = el.props;
    // faction pill
    if (el.type === 'span' && typeof p.children === 'string') {
      const t = p.children.trim().toUpperCase();
      if (t === 'ELYOS') out.faction = 'Light';
      else if (t === 'ASMODIAN') out.faction = 'Dark';
    }
    // server link /servers/<region>/<server>, text "Kaisinel · Europe"
    if (typeof p.href === 'string') {
      const m = /^\/servers\/([^/]+)\/([^/?#]+)$/.exec(p.href);
      if (m) {
        out.server = textOf(el.node).split('·')[0].trim() || null;
        out.regionCode = m[1];
        out.serverSlug = m[2];
      }
    }
    // class: <img src=/img/s/class/class_icon_<slug>.png>
    if (el.type === 'img' && typeof p.src === 'string') {
      const m = /class_icon_([a-z]+)\./.exec(p.src);
      if (m && !className) { className = m[1]; out.classType = classTypeFromSite(m[1]); }
    }
    // "Level <strong>45</strong>"
    if (el.type === 'span' && out.level == null) {
      const m = /^Level\s+(\d+)$/.exec(textOf(el.node).trim());
      if (m) out.level = Number(m[1]);
    }
    if (el.type === 'RefreshStatus') out.siteCharacterId = p.characterRef ?? null; // == ranking row "id"
  });

  // stat boxes: [label span, value span, rank span?]
  walkElements(nav, rows, (el) => {
    if (el.type !== 'div') return;
    const ks = childElements(el.node);
    if (ks.length < 2) return;
    const label = textOf(ks[0]).trim().toLowerCase();
    if (label === 'combat power') out.cp = num(textOf(ks[1]));
    else if (label === 'item level') out.itemLevel = num(textOf(ks[1]));
  });

  // fallback: "..., level 45 Elyos Gladiator on Kaisinel (Europe) with 237,373 combat power"
  if (out.level == null || out.cp == null || !out.faction || !out.classType) {
    walkElements(tree, rows, (el) => {
      if (el.type !== 'meta' || el.props.name !== 'description') return;
      const m = /level (\d+) (Elyos|Asmodian) (\w+) on ([^(]+) \(([^)]+)\) with ([\d,]+) combat power/.exec(el.props.content || '');
      if (!m) return;
      out.level ??= Number(m[1]);
      out.faction ??= m[2] === 'Elyos' ? 'Light' : 'Dark';
      out.classType ??= classTypeFromSite(m[3]);
      out.server ??= m[4].trim();
      out.cp ??= num(m[6]);
    });
  }

  // ---- equipment (GearInspector client component, props.tiles) ----
  const gi = findElement(tree, rows, (el) => el.type === 'GearInspector' || Array.isArray(el.props.tiles));
  const tiles = gi && Array.isArray(gi.props.tiles) ? gi.props.tiles : [];
  for (const t of tiles) {
    const item = mapTile(t);
    if (/^wing$/i.test(item.slot) || t.slot === 'Wings') out.wings = { itemId: item.itemId, name: item.name, grade: item.grade };
    else if (/^pet$/i.test(item.slot) || t.slot === 'Pet') out.pet = { petId: item.itemId, name: item.name, grade: item.grade };
    else if (/^Arcana\d+$/i.test(item.slot)) out.arcana.push(item);
    else out.gear.push(item);
  }
  if (!navEl && !tiles.length) throw new Error('no character profile on this page (not found / error page?)');

  // skill level bonuses of gear + Arcana, summed per skill (by icon, else name)
  const bonus = new Map();
  for (const it of [...out.gear, ...out.arcana]) {
    for (const s of it.skills) {
      const k = s.icon || s.name;
      const cur = bonus.get(k) || { name: s.name, icon: s.icon, levels: 0, from: [] };
      cur.levels += Number(s.level) || 0;
      cur.from.push(it.slot);
      bonus.set(k, cur);
    }
  }
  out.gearSkillBonus = [...bonus.values()].sort((a, b) => b.levels - a.levels || a.name.localeCompare(b.name));

  // ---- Daevanion section: div key=<boardId> > [div > [span name, span "open / total · pct %"], bar] ----
  let dsec = null;
  walkElements(tree, rows, (el, anc) => {
    if (dsec || el.type !== 'h2' || textOf(el.node).trim() !== 'Daevanion') return;
    for (let i = anc.length - 1; i >= 0; i--) if (anc[i].type === 'section') { dsec = anc[i]; break; }
  });
  if (dsec) {
    for (const d of childElements(dsec.node)) {
      if (d[1] !== 'div' || !/^\d+$/.test(String(d[2] ?? ''))) continue;
      const row = childElements(d)[0];
      if (!row) continue;
      const [nameEl, valEl] = childElements(row);
      const m = /(\d+)\s*\/\s*(\d+)(?:\s*·\s*(\d+)\s*%)?/.exec(textOf(valEl));
      out.daevanion.push({ boardId: Number(d[2]), name: textOf(nameEl).trim(), open: m ? Number(m[1]) : null, total: m ? Number(m[2]) : null });
    }
  }
  return out;
}

/** One GearInspector tile ({key: "<Slot>-<itemId>", name, grade, enchantLevel, exceedLevel, tooltip}) -> item. */
function mapTile(t) {
  const key = String(t.key || '');
  const dash = key.indexOf('-');
  const rawId = dash < 0 ? '' : key.slice(dash + 1);
  const tt = t.tooltip && typeof t.tooltip === 'object' ? t.tooltip : null;
  return {
    slot: (dash < 0 ? key : key.slice(0, dash)) || null, // MainHand, SubHand, Helmet, ..., Rune2, Arcana3, wing, pet
    itemId: /^\d+$/.test(rawId) ? Number(rawId) || null : null,
    name: clean(t.name),
    grade: clean(t.grade),
    enchant: typeof t.enchantLevel === 'number' ? t.enchantLevel : null,
    exceed: typeof t.exceedLevel === 'number' ? t.exceedLevel : null,
    // skill level bonuses granted by the item (name + icon; gearSkillLevels() maps them to skill ids)
    skills: arr(tt?.skills).map((s) => ({ name: s.name, level: Number(s.level) || 0, icon: iconId(s.icon) })),
  };
}

/**
 * Gear and Arcana skill level bonuses by our skill id (what Build.gx holds), matched by icon, else by name. Icons are
 * unique within a class but not across classes (ICON_CO_SKILL_002 is "Defiance" for every class), so only the skills
 * of `classType` are searched. -> { gx: {skillId: levels}, unmatched: [{name, icon, levels}] }
 */
export function gearSkillLevels(overview, skills, classType) {
  const pool = skills.filter((s) => s.classType === classType);
  const byIcon = new Map();
  const byName = new Map();
  for (const s of pool) {
    if (s.icon) byIcon.set(String(s.icon).toLowerCase(), s);
    if (s.name) byName.set(String(s.name).toLowerCase(), s);
  }
  const gx = {};
  const unmatched = [];
  for (const b of overview.gearSkillBonus) {
    const s = (b.icon && byIcon.get(b.icon.toLowerCase())) || byName.get(String(b.name).toLowerCase());
    if (!s) { unmatched.push(b); continue; }
    gx[s.id] = (gx[s.id] || 0) + b.levels;
  }
  return { gx, unmatched };
}

// ------------------------------------------------------------------------------------------------ skills page

const GOLD = '#f0b84a';          // "On the skill bar" (also the glow of the equipped-stigma badge)
const NOT_LEARNED = '#2a303b';   // "Not learned yet" (learned and not on a bar is #3a4352)
const SECTION_KEYS = { Active: 'active', Passive: 'passive', Dp: 'stigma' };
const SECTION_TITLES = { 'active skills': 'active', 'passive skills': 'passive', 'stigma skills': 'stigma' };

/** "12 skills · 9 equipped · 2 not learned" -> counts (missing parts = 0) */
function parseCounts(text) {
  const t = norm(text);
  const n = (re) => { const m = re.exec(t); return m ? Number(m[1]) : 0; };
  return { total: n(/(\d+)\s+skills?\b/i), equipped: n(/(\d+)\s+equipped\b/i), notLearned: n(/(\d+)\s+not learned\b/i) };
}

const borderColor = (style) => (String(style?.border ?? '').match(/#[0-9a-f]{3,8}/i) || [])[0]?.toLowerCase() ?? null;

function parseTile(hc, section) {
  const p = propsOf(hc);
  const iconWrap = find(p.children, (el) => el[1] === 'span' && /\bsize-12\b/.test(classOf(el)));
  const img = find(iconWrap, (el) => el[1] === 'img');
  const style = img ? propsOf(img).style ?? {} : {};
  const border = borderColor(style);
  const badge = find(iconWrap, (el) => el[1] === 'span' && /-bottom-1\.5/.test(classOf(el)));
  const checkMark = find(iconWrap, (el) => propsOf(el).title === 'Equipped stigma' || propsOf(el)['aria-label'] === 'Equipped stigma');
  const nameCol = find(p.children, (el) => el[1] === 'span' && /flex-col/.test(classOf(el)) && !/\bsize-12\b/.test(classOf(el)));
  const spans = nameCol ? childrenOf(nameCol).filter(isEl) : [];
  const sub = spans[1] ? norm(visibleText(spans[1])) : '';
  // hover card title "<name> Lv. <n>" (no "Lv." at level 0)
  const title = norm(visibleText(find(p.card, (el) => el[1] === 'span' && /text-\[16px\]/.test(classOf(el)))));
  const tm = /^(.*?)\s+Lv\.\s*(\d+)$/.exec(title);
  const cardLevel = tm ? Number(tm[2]) : null;
  // Number('') is 0, so an absent or empty badge must not count as "level 0"; fall back to the card's "Lv. N"
  const badgeText = badge ? norm(visibleText(badge)) : '';
  const level = /^\d+$/.test(badgeText) ? Number(badgeText) : cardLevel;
  const dv = /incl\.\s*\+(\d+)\s*Daevanion/i.exec(sub);
  const greyed = border === NOT_LEARNED || /grayscale\(1\)/.test(String(style.filter ?? '')) || /text-faint/.test(classOf(spans[0]));
  return {
    id: Number(hc[2]),
    name: (spans[0] && norm(visibleText(spans[0]))) || (tm ? tm[1] : title) || null,
    level: Number.isFinite(level) ? level : null,
    dvBonus: dv ? Number(dv[1]) : 0,
    onBar: border === GOLD,
    learned: !greyed,
    ...(section === 'stigma' ? { equippedStigma: !!checkMark } : {}),
    levelKnown: Number.isFinite(level) && level > 0,
    cardLevel,
  };
}

/**
 * Skills page /c/<region>/<server>/<name>/skills -> {
 *   meta: {character, classType, classTypeFromIds, characterLevel, faction, characterRef},
 *   sections: {active|passive|stigma: {total, equipped, notLearned}}, countsOk,
 *   active, passive, stigma: [{id, name, level, dvBonus, onBar, learned, equippedStigma (stigma only), levelKnown, cardLevel}],
 *   warnings
 * }. level is the badge (0 on a stigma = no level on the source, then levelKnown is false). countsOk: every section is
 * there and its tiles agree with its header counts (a truncated stream or a changed layout would break it).
 */
export function parseSkills(html) {
  const out = { meta: {}, sections: {}, countsOk: false, active: [], passive: [], stigma: [], warnings: [] };
  const rows = rscRows(decodeRsc(html));
  if (!rows.size) { out.warnings.push('no RSC payload found'); return out; }
  const { get } = createResolver(rows);

  const seen = new Set();
  const sections = new Map();
  let title = null;
  const head = { h1: null, classIcon: null, level: null, race: null, characterRef: null, description: null };
  for (const [id, r] of rows) {
    if (r.tag) continue; // imports, hints, text rows
    visit(get(id), (el) => {
      const pr = propsOf(el);
      if (el[1] === 'title' && !title) title = norm(visibleText(el));
      if (el[1] === 'meta' && pr.name === 'description' && !head.description) head.description = String(pr.content ?? '');
      if (el[1] === 'h1' && head.h1 == null) head.h1 = norm(visibleText(el));
      if (el[1] === 'img' && /class_icon_/.test(String(pr.src)) && !head.classIcon) head.classIcon = String(pr.src);
      if (el[1] === 'span' && head.level == null && childrenOf(el)[0] === 'Level ' && isEl(childrenOf(el)[1])) head.level = Number(visibleText(childrenOf(el)[1]));
      if (el[1] === 'span' && /tracking-wide/.test(classOf(el)) && /^(ELYOS|ASMODIAN)$/i.test(norm(visibleText(el)))) head.race = norm(visibleText(el));
      if (pr.characterRef != null && head.characterRef == null) head.characterRef = pr.characterRef;
      if (el[1] === 'section') {
        const h2 = find(el, (e) => e[1] === 'h2');
        const key = SECTION_KEYS[el[2]] ?? SECTION_TITLES[norm(visibleText(h2)).toLowerCase()];
        if (key && !sections.has(key)) { sections.set(key, el); return false; }
        // other sections (the profile header is a <section> too) are searched for the meta fields above
      }
    }, seen);
  }

  // <title> "<name> Skills – <Class> Skill Levels on <Server> | AION2 Index"
  const tm = title ? /^(.+) Skills\s+[–-]\s+(.+?) Skill Levels on (.+?)\s*\|[^|]*$/.exec(title) : null;
  const slug = (/class_icon_([a-z]+)/i.exec(head.classIcon ?? '') || [])[1] ?? null;
  const d = /level (\d+) (Elyos|Asmodian) /i.exec(head.description ?? '');
  const race = (head.race ?? d?.[2] ?? '').toLowerCase();
  out.meta = {
    character: head.h1 || (tm ? tm[1] : null),
    classType: classTypeFromSite(slug) ?? classTypeFromSite(tm?.[2]),
    classTypeFromIds: null,
    characterLevel: Number.isFinite(head.level) ? head.level : d ? Number(d[1]) : null,
    faction: race === 'elyos' ? 'Light' : race === 'asmodian' ? 'Dark' : null,
    characterRef: head.characterRef,
  };

  let countsOk = true;
  for (const key of ['active', 'passive', 'stigma']) {
    const s = sections.get(key);
    if (!s) { out.warnings.push(`section ${key} missing`); countsOk = false; continue; }
    const header = find(s, (e) => e[1] === 'span' && /text-muted/.test(classOf(e)) && /skills?/.test(visibleText(e)));
    const c = out.sections[key] = parseCounts(visibleText(header));
    const cards = findAll(s, (e) => propsOf(e).card && /^\d+$/.test(String(e[2])));
    const list = out[key] = cards.map((hc) => parseTile(hc, key));

    // self-checks against the section header
    const eq = key === 'stigma' ? list.filter((e) => e.equippedStigma).length : list.filter((e) => e.onBar).length;
    const nl = list.filter((e) => !e.learned).length;
    if (c.total !== list.length) out.warnings.push(`${key}: header says ${c.total} skills, parsed ${list.length}`);
    if (c.equipped !== eq) out.warnings.push(`${key}: header says ${c.equipped} equipped, parsed ${eq}`);
    if (c.notLearned !== nl) out.warnings.push(`${key}: header says ${c.notLearned} not learned, parsed ${nl}`);
    if (c.total !== list.length || c.equipped !== eq || c.notLearned !== nl) countsOk = false;
    for (const [i, e] of list.entries()) {
      if (key === 'stigma' && e.equippedStigma !== /border-gold/.test(classOf(cards[i]))) out.warnings.push(`stigma ${e.id}: check mark and gold tile disagree`);
      if (key === 'stigma' && e.equippedStigma && !e.onBar) out.warnings.push(`stigma ${e.id}: check mark without the gold "on the skill bar" border`);
      if (e.levelKnown && e.cardLevel !== e.level) out.warnings.push(`${key} ${e.id}: badge ${e.level} != card Lv. ${e.cardLevel}`);
      if (e.level == null) out.warnings.push(`${key} ${e.id}: no level badge and no "Lv." on the card`);
      if (!e.learned && e.onBar) out.warnings.push(`${key} ${e.id}: not learned but on the skill bar`);
    }
  }
  out.countsOk = countsOk;
  // the class from the skill ids (11xxxxxx = Gladiator ...) must agree with the header
  const prefixes = new Set([...out.active, ...out.passive, ...out.stigma].map((e) => CLASS_BY_ID_PREFIX[String(e.id).slice(0, 2)] ?? '?'));
  out.meta.classTypeFromIds = prefixes.size === 1 ? [...prefixes][0] : prefixes.size ? [...prefixes].join('|') : null;
  if (out.meta.classTypeFromIds && out.meta.classType && out.meta.classTypeFromIds !== out.meta.classType) {
    out.warnings.push(`class from skill ids (${out.meta.classTypeFromIds}) != class on the page (${out.meta.classType})`);
  }
  if (!out.meta.classType && prefixes.size === 1 && !prefixes.has('?')) out.meta.classType = out.meta.classTypeFromIds;
  return out;
}

/** "A", "A and B", "A, B and C" */
const listing = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

/**
 * Normal skills of a parsed skills page -> { lv, gx (Build), skills (TopSkill[]), notes }.
 * Bought level = shown level - Daevanion - gear, clamped to 1..maxBuyable(id); levels above what skill points can buy
 * have no known source and go into gx with the gear levels, so the planner still shows the level the game shows.
 * @param {Record<string, number>} gearBonus skill levels from gear and Arcana by skill id (gearSkillLevels().gx)
 * @param {(id: number) => number} maxBuyable highest level skill points can buy (10 for every normal skill today)
 * @param {Map<number, number>} [nodeBonus] Daevanion levels from the learned skill nodes in our data (daevanionSkillBonus
 *   of the build's dv). Preferred over the page's "incl. +N Daevanion": the source misses nodes it cannot name (Rushing
 *   Smash, Blaze, both Robes, Melee Fire), while the shown level includes them; and the planner adds exactly these nodes.
 */
export function skillLevels(parsed, gearBonus, maxBuyable, nodeBonus) {
  const lv = {};
  const gx = {};
  const skills = [];
  const notes = [];
  for (const e of [...parsed.active, ...parsed.passive]) {
    if (!e.learned) continue;
    if (!e.levelKnown) { notes.push(`${e.name} shows no level on the source and is left out.`); continue; }
    const gear = gearBonus[e.id] ?? 0;
    const dv = nodeBonus ? (nodeBonus.get(e.id) ?? 0) : e.dvBonus;
    const rest = e.level - dv - gear; // bought levels, if the gear bonus is complete
    const cap = maxBuyable(e.id);
    lv[e.id] = Math.max(1, Math.min(cap, rest));
    const extra = gear + Math.max(0, rest - cap);
    if (extra) gx[e.id] = extra;
    if (rest > cap) {
      const k = rest - cap;
      notes.push(`${e.name}: ${k === 1 ? '1 level' : `${k} levels`} above the skill point maximum ${k === 1 ? 'has no known source; it is' : 'have no known source; they are'} added to the gear levels.`);
    }
    if (rest < 1) notes.push(`${e.name}: level ${e.level} is lower than its Daevanion and gear bonuses plus 1; the bought level is set to 1.`);
    skills.push({ id: e.id, lv: e.level, dv, gear, bar: e.onBar });
  }
  return { lv, gx, skills, notes };
}

/**
 * Stigmas of a parsed skills page -> { st (Build, one entry per slot), stigmas (TopStigma[]), notes }.
 * The levelled stigmas with the "Equipped stigma" mark fill the slots open at the character level, highest level
 * first (ties keep the page order; the page has no slot order). Marked stigmas at level 0 stay out of st, because
 * normalizeBuild would raise them to level 1 and invent a level; they are noted. Empty slots are {id: null, lv: 1},
 * exactly what emptyBuild() and normalizeBuild() produce.
 * @param {number[]} slotLevels character levels that open the slots (src/lib/stigmaRules.ts STIGMA_SLOT_LEVELS)
 */
export function stigmaSlots(parsed, slotLevels) {
  const charLevel = parsed.meta.characterLevel;
  const open = Number.isFinite(charLevel) ? slotLevels.filter((l) => charLevel >= l).length : slotLevels.length;
  const learned = parsed.stigma.filter((e) => e.learned);
  const levelled = learned.filter((e) => e.equippedStigma && e.levelKnown).sort((a, b) => b.level - a.level);
  const slotted = levelled.slice(0, open);
  const st = slotLevels.map((_, i) => (slotted[i] ? { id: slotted[i].id, lv: slotted[i].level } : { id: null, lv: 1 }));
  const inSt = new Set(slotted.map((e) => e.id));
  const notes = [];
  const extra = levelled.slice(open);
  if (extra.length) notes.push(`${listing(extra.map((e) => `${e.name} (Lv ${e.level})`))} ${extra.length === 1 ? 'is' : 'are'} also marked as equipped, but only ${open} stigma slot(s) are open; left out.`);
  const loose = learned.filter((e) => e.levelKnown && !e.equippedStigma);
  if (loose.length) notes.push(`${listing(loose.map((e) => `${e.name} (Lv ${e.level})`))} ${loose.length === 1 ? 'has' : 'have'} a level but no equipped mark, so ${loose.length === 1 ? 'it is' : 'they are'} not in a stigma slot.`);
  const marked = learned.filter((e) => e.equippedStigma && !e.levelKnown);
  if (marked.length) notes.push(`${listing(marked.map((e) => e.name))} ${marked.length === 1 ? 'is' : 'are'} marked as equipped but ${marked.length === 1 ? 'has' : 'have'} no level (another preset or skill bar), so ${marked.length === 1 ? 'it is' : 'they are'} not in a stigma slot.`);
  const stigmas = learned.map((e) => ({ id: e.id, lv: e.levelKnown ? e.level : 0, slot: inSt.has(e.id), marked: e.equippedStigma && !e.levelKnown }));
  return { st, stigmas, notes };
}

// ------------------------------------------------------------------------------------------------ Daevanion board

/** Return the JSON value (object or array) starting at text[start], string-aware bracket matching. */
function sliceJson(text, start) {
  const open = text[start];
  if (open !== '{' && open !== '[') throw new Error(`no JSON value at ${start}`);
  let depth = 0;
  let inStr = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (c === '\\') i++;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') {
      depth--;
      if (depth === 0) return JSON.parse(text.slice(start, i + 1));
    }
  }
  throw new Error('unterminated JSON value');
}

/**
 * The site's cell keys: key = boardId * 10000 + n with x = floor((n - 1) / 15) + 1 and y = (n - 1) % 15 + 1,
 * exactly the x/y of our daevanion.json nodes.
 */
const KEY_STRIDE = 15;
const keyToXY = (key) => {
  const n = key % 10000;
  return { boardId: Math.floor(key / 10000), x: Math.floor((n - 1) / KEY_STRIDE) + 1, y: ((n - 1) % KEY_STRIDE) + 1 };
};

/** React Flight string escapes: "$undefined" is undefined, a leading "$$" is a literal "$". */
const unRsc = (v) => (v === '$undefined' ? undefined : typeof v === 'string' && v.startsWith('$$') ? v.slice(1) : v);

/** If `v` is an outlined Flight reference ("$<hex id>"), parse that row of the payload; else return v. */
function deref(text, v) {
  if (typeof v !== 'string' || !/^\$[0-9a-f]+$/.test(v)) return v;
  const m = new RegExp(`(?:^|\\n)${v.slice(1)}:(?=[\\[{])`).exec(text);
  return m ? sliceJson(text, m.index + m[0].length) : v;
}

/**
 * Board page /c/<region>/<server>/<name>/daevanion?board=<id> -> {
 *   boardId, name, size, open, total,          // DaevanionBoard element + header "<open> of <total> nodes · s×s"
 *   requestedBoard, fallback,                  // ?board= of the request; fallback = the site showed another board
 *   route: {region, server, name} | null,      // character of the page, name URL-decoded
 *   classSlug,                                 // from the start cell frame board_icon_start_<slug>.png
 *   cells: [{key, boardId, x, y, kind ('stat'|'skill'|'start'|'empty'), open}],
 *   warnings
 * }. A wrong ?board= silently shows the class's first board (fallback = true). Throws when the page has no board.
 */
export function parseBoard(html) {
  const text = html.includes('self.__next_f') ? decodeRsc(html) : html;

  // the DaevanionBoard client component: `<ref>:I[<module>,[chunks],"DaevanionBoard"]`
  const refM = /(?:^|\n)([0-9a-z]+):I\[(?:\d+|"(?:[^"\\]|\\.)*"),\[[^\]]*\],"DaevanionBoard"[\],]/.exec(text);
  let at = -1;
  let elemKey = null;
  if (refM) {
    const m = new RegExp(`\\["\\$","\\$L${refM[1]}","(\\d+)",\\{"size":`, 'g').exec(text);
    if (m) { at = m.index + m[0].length - '{"size":'.length; elemKey = +m[1]; }
  }
  if (at < 0) {
    // fallback: the first object that looks like a board
    const m = /\{"size":\d+,"cells":["\[]/.exec(text);
    if (!m) throw new Error('no Daevanion board in page');
    at = m.index;
  }
  const props = sliceJson(text, at);
  const rawCells = deref(text, props.cells);
  if (!Array.isArray(rawCells)) throw new Error('board cells not found');
  const cells = rawCells.map((c) => ({ key: c.key, ...keyToXY(c.key), kind: unRsc(c.kind), open: c.open === true, frame: unRsc(c.frame) ?? null }));
  const ids = new Set(cells.map((c) => c.boardId));
  if (ids.size !== 1) throw new Error(`cells span several boards: ${[...ids]}`);
  const boardId = [...ids][0];
  if (elemKey != null && elemKey !== boardId) throw new Error(`element key ${elemKey} != cell board ${boardId}`);
  if (cells.length !== props.size * props.size) throw new Error(`${cells.length} cells for a ${props.size}x${props.size} board`);

  // what was requested: row 0 carries "c":["","c",<region>,<server>,<name>,"daevanion?board=<id>"],"q":"?board=<id>"
  const qM = /"q":"(\?[^"]*)"/.exec(text);
  const reqRaw = qM ? new URLSearchParams(qM[1]).get('board') : null;
  const requestedBoard = reqRaw != null && /^\d+$/.test(reqRaw) ? +reqRaw : null;
  const cM = /"c":(\["","c",(?:"(?:[^"\\]|\\.)*",?){3,}\])/.exec(text);
  let route = null;
  if (cM) {
    try {
      const seg = JSON.parse(cM[1]);
      route = { region: safeDecode(seg[2]), server: safeDecode(seg[3]), name: safeDecode(seg[4]) };
    } catch { /* leave null */ }
  }
  const startCell = cells.find((c) => c.kind === 'start');
  const classSlug = (/board_icon_start_([a-z0-9]+)\.png$/i.exec(startCell?.frame ?? '') ?? [])[1] ?? null;

  // header: ["$","h2",..,{"children":["Nezekan"," board"]}],["$","span",..,{"children":[64," of ",88," nodes · ",11,"×",11]}]
  const both = /"children":\["([^"]*)"," board"\]\}\],\["\$","span",null,\{[^{}]*"children":\[(\d+)," of ",(\d+)," nodes · ",(\d+),"×",(\d+)\]/.exec(text);
  const nameM = both ? [null, both[1]] : /"children":\["([^"]*)"," board"\]/.exec(text);
  const countM = both ? [null, both[2], both[3]] : /"children":\[(\d+)," of ",(\d+)," nodes · ",(\d+),"×",(\d+)\]/.exec(text);
  if (both && +both[4] !== props.size) throw new Error(`header size ${both[4]} != board size ${props.size}`);

  const open = countM ? +countM[1] : null;
  const total = countM ? +countM[2] : null;
  const fallback = requestedBoard != null && requestedBoard !== boardId;
  const warnings = [];
  if (fallback) warnings.push(`requested board ${requestedBoard} but the page shows board ${boardId}`);
  const nodes = cells.filter((c) => c.kind === 'stat' || c.kind === 'skill');
  const openCells = nodes.filter((c) => c.open).length;
  if (open != null && openCells !== open) warnings.push(`${openCells} open cells but the header says ${open}`);
  if (total != null && nodes.length !== total) warnings.push(`${nodes.length} nodes but the header says ${total}`);
  return { boardId, name: nameM ? nameM[1] : null, size: props.size, open, total, requestedBoard, fallback, route, classSlug, cells, warnings };
}

/** Set of "x,y" (our daevanion.json coordinates) of every open, learnable cell (start node excluded). */
export function toLearnedSet(cells) {
  const out = new Set();
  for (const c of cells) if (c.open === true && (c.kind === 'stat' || c.kind === 'skill')) out.add(`${c.x},${c.y}`);
  return out;
}

// ---- Build.dv encoding: exact port of src/lib/daevanionGraph.ts ----

/** daevanion.json stores nodes as [x, y, kind, grade, label, key, value, cost, needLevel]; accept both shapes. */
const nodeXY = (n) => (Array.isArray(n) ? { x: n[0], y: n[1], kind: n[2] } : n);
const nodeKey = (n) => { const { x, y } = nodeXY(n); return `${x},${y}`; };
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function connectedSet(board, learned) {
  const map = new Map(board.nodes.map((n) => [nodeKey(n), n]));
  const start = board.nodes.find((n) => nodeXY(n).kind === 'S') ?? board.nodes[0];
  const seen = new Set([nodeKey(start)]);
  const stack = [start];
  while (stack.length) {
    const { x, y } = nodeXY(stack.pop());
    for (const [dx, dy] of DIRS) {
      const k = `${x + dx},${y + dy}`;
      const nb = map.get(k);
      if (nb && !seen.has(k) && learned.has(k)) { seen.add(k); stack.push(nb); }
    }
  }
  return seen;
}

/** Same as encodeLearned(board, learned) in src/lib/daevanionGraph.ts. */
function encodeLearned(board, learned) {
  const bits = [];
  board.nodes.forEach((n, i) => { if (learned.has(nodeKey(n))) bits[i] = 1; });
  let hex = '';
  for (let i = 0; i < board.nodes.length; i += 4) {
    const v = (bits[i] ? 8 : 0) | (bits[i + 1] ? 4 : 0) | (bits[i + 2] ? 2 : 0) | (bits[i + 3] ? 1 : 0);
    hex += v.toString(16);
  }
  return hex.replace(/0+$/, '');
}

/** Same as decodeLearned(board, hex) in src/lib/daevanionGraph.ts (drops unconnected nodes). */
export function decodeLearned(board, hex) {
  const out = new Set();
  for (let i = 0; i < hex.length; i++) {
    const v = parseInt(hex[i], 16);
    if (Number.isNaN(v)) continue;
    for (let b = 0; b < 4; b++) {
      if (v & (8 >> b)) {
        const n = board.nodes[i * 4 + b];
        if (n && nodeXY(n).kind !== 'S') out.add(nodeKey(n));
      }
    }
  }
  const reach = connectedSet(board, out);
  for (const k of out) if (!reach.has(k)) out.delete(k);
  return out;
}

/**
 * boardsToDv(classType, boardsById, daevanionJson, issues?) -> Build.dv ({"<boardId>": hex})
 * boardsById: {[boardId]: parseBoard() result}. Only boards of `classType` are used; open cells that are not nodes of
 * ours or not connected to the start node are dropped (decodeLearned would drop them anyway) and reported in `issues`.
 * Throws when a parsed board is filed under another board id (e.g. the site's fallback page for a wrong ?board=).
 * Boards without a learned node are left out (the app treats a missing key as empty).
 */
export function boardsToDv(classType, boardsById, daevanionJson, issues = []) {
  const cls = daevanionJson.classes[classType];
  if (!cls) throw new Error(`unknown class ${classType}`);
  const dv = {};
  for (const board of cls.boards) {
    const src = boardsById[board.id];
    if (!src) continue;
    const srcIds = new Set(src.cells.map((c) => c.boardId));
    if (src.boardId != null) srcIds.add(src.boardId);
    if (srcIds.size !== 1 || !srcIds.has(board.id)) {
      throw new Error(`boardsById[${board.id}] holds board ${[...srcIds].join('/')}${src.fallback ? ' (site fallback page)' : ''}`);
    }
    const ours = new Set(board.nodes.filter((n) => nodeXY(n).kind !== 'S').map(nodeKey));
    const valid = new Set();
    for (const k of toLearnedSet(src.cells)) {
      if (ours.has(k)) valid.add(k);
      else issues.push(`board ${board.id}: open cell ${k} is not a node of ours, dropped`);
    }
    const reach = connectedSet(board, valid);
    const kept = new Set();
    for (const k of valid) {
      if (reach.has(k)) kept.add(k);
      else issues.push(`board ${board.id}: open cell ${k} is not connected to the start node, dropped`);
    }
    const hex = encodeLearned(board, kept);
    if (hex) dv[String(board.id)] = hex;
  }
  return dv;
}

/** Skill levels from the learned skill nodes of Build.dv by skill id (daevanionSkillBonus in src/lib/buildCalc.ts). */
export function daevanionSkillBonus(classType, dv, daevanionJson) {
  const map = new Map();
  for (const board of daevanionJson.classes[classType]?.boards ?? []) {
    const set = decodeLearned(board, dv[board.id] ?? '');
    for (const n of board.nodes) {
      // raw node: [x, y, kind, grade, label, key (skill id for K nodes), value, cost, needLevel]
      if (n[2] !== 'K' || !set.has(nodeKey(n))) continue;
      map.set(Number(n[5]), (map.get(Number(n[5])) ?? 0) + (n[6] ?? 0));
    }
  }
  return map;
}

// ------------------------------------------------------------------------------------------------ budgets

// Same rules as src/lib/skillCosts.ts. Entry i of skill-costs.json = cost of level i+1: a number = skill points,
// [skillPoints, stigmaShards] for stigmas.
const spOf = (e) => (e == null ? 0 : Array.isArray(e) ? e[0] : e);
const shardsOf = (e) => (e == null ? 0 : Array.isArray(e) ? e[1] : 0);

/** Highest level that skill points can buy (entries after it are 0); same as maxBuyableLevel(). */
export function maxBuyableLevel(costs, skillId, fallback = 10) {
  const list = costs[String(skillId)] ?? [];
  let max = 1;
  list.forEach((e, i) => { if (spOf(e) > 0) max = i + 1; });
  return list.length ? max : fallback;
}
const skillPointsTo = (costs, skillId, level) => {
  const list = costs[String(skillId)] ?? [];
  let total = 0;
  for (let lv = 2; lv <= level; lv++) total += spOf(list[lv - 1]);
  return total;
};
const stigmaShardsTo = (costs, skillId, level) => {
  const list = costs[String(skillId)] ?? [];
  let total = 0;
  for (let lv = 1; lv <= level; lv++) total += shardsOf(list[lv - 1]);
  return total;
};
/** Base skill points and stigma shards of a character level (skill-points.json rows [level, skillPoints, shards]). */
const pointsAtLevel = (points, level) => {
  const row = points.level.find((r) => r[0] === level) ?? points.level[points.level.length - 1];
  return { skill: row[1], stigma: row[2] };
};

/**
 * Build.e for an imported build: skill points its levels cost beyond what the planner gives at that character level
 * without extra sources (skillPointsSpent / skillPointBudget in src/lib/buildCalc.ts with x = []), at least 0.
 * `skills` must carry the acquireLevel the app uses (public/data/learn-levels.json applied, see src/data/loadData.ts).
 */
export function skillPointCorrection(build, { skills, costs, points }) {
  let spent = 0;
  for (const s of skills) {
    if (s.classType !== build.c || s.isStigma || s.acquireLevel > build.l) continue;
    const lv = Math.max(1, Math.min(maxBuyableLevel(costs, s.id), build.lv[s.id] ?? 1));
    spent += skillPointsTo(costs, s.id, lv);
  }
  return Math.max(0, spent - pointsAtLevel(points, build.l).skill);
}

/** Build.se for an imported build: stigma shards of the open slots beyond the level's base (shardsSpent / shardBudget). */
export function shardCorrection(build, { costs, points }, slotLevels) {
  const spent = build.st.reduce((sum, s, i) => (s.id != null && build.l >= slotLevels[i] ? sum + stigmaShardsTo(costs, s.id, s.lv) : sum), 0);
  return Math.max(0, spent - pointsAtLevel(points, build.l).stigma);
}
