// Turns the data of the AION2 Interactive Map (github.com/aion2-interactive-map/aion2-interactive-map) into the farm
// map's second source: public/data/farm/tcimba.json (spots and area labels) and public/maps/<region>.svg (the region
// outlines as a plain picture).
//
// Licence: only that repository's /public/data is used. It is CC BY-NC 4.0 (© Yihao Liu "tc-imba" and contributors):
// - non-commercial: the page loads tcimba.json only while no ads are configured (VITE_ADSENSE_CLIENT empty),
// - attribution and a note of the changes: in tcimba.json, in every SVG, on the farm page and in the README.
// Never use the repository's map tiles, icons, marker screenshots, /public/locales or /src code: they are not under
// that licence (the tiles and icons are NCSOFT game art, /src is GPL-3.0).
//
// What is taken: hidden cubes, Empyrean traces (their "monolithMaterial"), Kibelisks (their "teleport"), villages,
// dungeon entrances (their "seal": the sealed dungeons players explore), strongholds (their "occupation": enemy outposts
// and camps to conquer), and the borders of the areas (for the outlines and the area names). Battlefields are left out:
// what they are in the game is not clear yet.
// Positions are fractions of the region's box (Region.world.box in src/features/farm/farmRules.ts), the part of the
// map's pixel grid the region picture shows. The boxes are fixed: player spots are fractions of the same picture.
//
// Spot ids are "tc-" and the start of the upstream id. Players' found progress and links name spots by id, so an id
// must outlive an upstream rename: the script reads the tcimba.json it wrote last, and when an upstream id vanished
// and a new one of the same category appeared within CARRY_PX map pixels of it, the new spot keeps the old id. Such a
// spot also gets "u", the id its upstream id would give: later runs find it by that (wherever upstream moves it then)
// and keep the old id. Excluded spots stay in the file as "excluded" (not shown), so a renamed one stays out too.
//
// Usage: node scripts/farm-tcimba.mjs <checkout of aion2-interactive-map> [--commit <sha> --date <YYYY-MM-DD>
//                                        [--data-date <YYYY-MM-DD>]] [--check]
//   The checkout needs LICENSE and public/data (a sparse checkout of public/data is enough). Without --commit the
//   commit and its date come from `git -C <checkout> log -1`, and the data date (the last change of the marker and
//   area files read; the repository's newest commit is often months younger) from `git log -1 -- <those files>`.
//   With --commit, --data-date gives that date; without it tcimba.json has none and the page leaves it out.
//   --check writes nothing: it exits with 2 when tcimba.json or a region picture would change (for CI), 0 when both
//   are up to date; 1 is an error, as always.
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REGIONS } from '../src/features/farm/farmRules.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT_JSON = join(ROOT, 'public', 'data', 'farm', 'tcimba.json');
const USAGE = 'usage: node scripts/farm-tcimba.mjs <checkout> [--commit <sha> --date <YYYY-MM-DD> [--data-date <YYYY-MM-DD>]] [--check]';
/** --check: the output would change */
const EXIT_CHANGED = 2;

export const SOURCE = {
  name: 'AION2 Interactive Map',
  by: 'Yihao Liu (tc-imba) and contributors',
  url: 'https://github.com/aion2-interactive-map/aion2-interactive-map',
  license: 'CC BY-NC 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
};

/** their subtype → our category; subtypes that are not listed are left out */
const CATEGORY = {
  hiddenCube: 'cube', monolithMaterial: 'trace', teleport: 'teleport', village: 'village', seal: 'dungeon', occupation: 'stronghold',
};

/** categories whose spots keep the data's own name (an English id such as "CaveoftheDesperate", spaced out) */
const NAMED = new Set(['dungeon', 'stronghold']);

/**
 * names the data misspells or joins in a way spacedName cannot undo (raw name → name on the page). The ids also drop
 * apostrophes ("KonutinsCave"); they are not put back here, since "Smugglers" may be one smuggler's or many, and a
 * guess would make up a name the game may not use. The page's search ignores apostrophes, so "Konutin's" still finds it.
 */
const NAME_FIX = new Map([
  ['DeepandDarkPit', 'Deep and Dark Pit'],
  ['LiraryofPatience', 'Library of Patience'],
  ['PosisonousPlantHabitat', 'Poisonous Plant Habitat'],
]);

/** spot ids ("tc-…") to leave out, e.g. after a report that a spot is wrong; say why next to each */
const EXCLUDE = new Set([]);

/** a marker outside every area but this close to one (map pixels) still gets that area's name */
const AREA_NEAR = 160;

/** an upstream id that vanished passes to a new spot of the same category at most this far away (map pixels) */
const CARRY_PX = 8;

// ------------------------------------------------------------------------------------------------ YAML

/**
 * Reads the block YAML PyYAML writes: mappings, block sequences (also "- - - x"), plain / single-quoted /
 * double-quoted scalars and the empty flow forms [] and {}. Anything else throws, so a format change is noticed
 * instead of read wrong.
 */
export function parseYaml(text, file = 'yaml') {
  const lines = [];
  text.split(/\r?\n/).forEach((raw, n) => {
    if (!raw.trim() || /^\s*#/.test(raw)) return;
    if (/\t/.test(raw.slice(0, raw.length - raw.trimStart().length))) throw new Error(`${file}:${n + 1}: tab indent`);
    let indent = raw.length - raw.trimStart().length;
    let t = raw.trim();
    // "- - - x": every "- " opens a sequence item whose content starts further in
    while (t === '-' || t.startsWith('- ')) {
      lines.push({ indent, text: '-', n: n + 1 });
      const rest = t.slice(1);
      indent += 1 + (rest.length - rest.trimStart().length);
      t = rest.trim();
      if (!t) break;
    }
    if (t) lines.push({ indent, text: t, n: n + 1 });
  });

  let i = 0;
  const fail = (msg) => { throw new Error(`${file}:${lines[i]?.n ?? 'end'}: ${msg}`); };
  const KEY = /^([A-Za-z_][\w.-]*|'(?:[^']|'')*'|"(?:[^"\\]|\\.)*"):(?:\s+(.*))?$/;

  const scalar = (s) => {
    if (s === '[]') return [];
    if (s === '{}') return {};
    if (s.startsWith("'")) {
      if (!/^'(?:[^']|'')*'$/.test(s)) fail(`bad quoted text ${s}`);
      return s.slice(1, -1).replace(/''/g, "'");
    }
    if (s.startsWith('"')) return JSON.parse(s);
    if (/^[[{|>&*!%@`]/.test(s)) fail(`unsupported value ${s}`);
    if (s === 'null' || s === '~') return null;
    if (s === 'true') return true;
    if (s === 'false') return false;
    if (/^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(s)) return Number(s);
    return s;
  };
  const key = (s) => (s.startsWith("'") ? s.slice(1, -1).replace(/''/g, "'") : s.startsWith('"') ? JSON.parse(s) : s);

  function node(indent) {
    const l = lines[i];
    if (l.indent !== indent) fail('bad indent');
    if (l.text === '-') return seq(indent);
    if (KEY.test(l.text)) return map(indent);
    i++;
    if (i < lines.length && lines[i].indent > indent) fail('multi-line value');
    return scalar(l.text);
  }
  function seq(indent) {
    const out = [];
    while (i < lines.length && lines[i].indent === indent && lines[i].text === '-') {
      i++;
      out.push(i < lines.length && lines[i].indent > indent ? node(lines[i].indent) : null);
    }
    if (i < lines.length && lines[i].indent > indent) fail('bad indent after a list');
    return out;
  }
  function map(indent) {
    const out = {};
    while (i < lines.length && lines[i].indent === indent && lines[i].text !== '-') {
      const m = KEY.exec(lines[i].text);
      if (!m) fail(`expected "key: value", got ${lines[i].text}`);
      const k = key(m[1]);
      i++;
      if (m[2] !== undefined && m[2] !== '') {
        if (i < lines.length && lines[i].indent > indent) fail('multi-line value');
        out[k] = scalar(m[2]);
      } else if (i < lines.length && (lines[i].indent > indent || (lines[i].indent === indent && lines[i].text === '-'))) {
        out[k] = node(lines[i].indent);
      } else out[k] = null;
    }
    if (i < lines.length && lines[i].indent > indent) fail('bad indent after a mapping');
    return out;
  }

  if (!lines.length) return null;
  const doc = node(lines[0].indent);
  if (i < lines.length) fail('trailing content');
  return doc;
}

// ------------------------------------------------------------------------------------------------ geometry

/** even-odd test over all rings of an area (separate parts and holes alike) */
function inside(rings, x, y) {
  let hit = false;
  for (const ring of rings) {
    for (let a = 0, b = ring.length - 1; a < ring.length; b = a++) {
      const [xa, ya] = ring[a];
      const [xb, yb] = ring[b];
      if ((ya > y) !== (yb > y) && x < ((xb - xa) * (y - ya)) / (yb - ya) + xa) hit = !hit;
    }
  }
  return hit;
}

function segDist(x, y, [xa, ya], [xb, yb]) {
  const dx = xb - xa;
  const dy = yb - ya;
  const len = dx * dx + dy * dy;
  const t = len ? Math.max(0, Math.min(1, ((x - xa) * dx + (y - ya) * dy) / len)) : 0;
  return Math.hypot(x - (xa + t * dx), y - (ya + t * dy));
}

function edgeDist(rings, x, y) {
  let d = Infinity;
  for (const ring of rings) for (let a = 0, b = ring.length - 1; a < ring.length; b = a++) d = Math.min(d, segDist(x, y, ring[a], ring[b]));
  return d;
}

/** the point inside the area farthest from its border (where its name fits best), by two rounds of grid sampling */
function labelPoint(rings) {
  const pts = rings.flat();
  let [x0, y0, x1, y1] = [Math.min(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1])), Math.max(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[1]))];
  let best = null;
  for (let round = 0; round < 3; round++) {
    const N = 32;
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const x = x0 + ((x1 - x0) * i) / N;
        const y = y0 + ((y1 - y0) * j) / N;
        if (!inside(rings, x, y)) continue;
        const d = edgeDist(rings, x, y);
        if (!best || d > best.d) best = { x, y, d };
      }
    }
    if (!best) break;
    // look closer around the best point so far
    const w = (x1 - x0) / 8;
    const h = (y1 - y0) / 8;
    [x0, y0, x1, y1] = [best.x - w, best.y - h, best.x + w, best.y + h];
  }
  return best ? [best.x, best.y] : [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
}

// ------------------------------------------------------------------------------------------------ names

/** "ForestofExiles" → "Forest of Exiles", "RuinsoftheAncientCityofRoah" → "Ruins of the Ancient City of Roah" */
export function spacedName(id) {
  return String(id)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .split(' ')
    // a joined "of" / "of the" before the next capitalised word (the data writes "Caveofthe Desperate")
    .map((w, i, all) => (i < all.length - 1 && w.length > 4 ? w.replace(/^(.+?)(ofthe|of)$/, '$1 $2').replace(/ ofthe$/, ' of the') : w))
    .join(' ');
}

// ------------------------------------------------------------------------------------------------ the picture

const PALETTE = ['#2f4a3a', '#3b4a2c', '#2c4450', '#45402c', '#3a3550', '#2d4a48', '#4a3a34'];

/** greedy colouring: areas that touch get different colours */
function colours(areas) {
  const near = (a, b) => a.rings.some((ra) => ra.some(([x, y]) => edgeDist(b.rings, x, y) < 48));
  const out = [];
  areas.forEach((a, i) => {
    const used = new Set(areas.slice(0, i).filter((b) => near(a, b) || near(b, a)).map((b) => out[areas.indexOf(b)]));
    out.push(PALETTE.find((c) => !used.has(c)) ?? PALETTE[i % PALETTE.length]);
  });
  return out;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function svgOf(region, box, areas, meta) {
  const [x0, y0, x1, y1] = box;
  const w = x1 - x0;
  const h = y1 - y0;
  const fills = colours(areas);
  const paths = areas.map((a, i) => {
    const d = a.rings.map((r) => `M${r.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L')}Z`).join('');
    return `<path d="${d}" fill="${fills[i]}"/>`;
  });
  // no outlines (Reshanta): a faint grid, so the map still shows distance and direction
  const grid = [];
  if (!areas.length) {
    const step = 128;
    for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) grid.push(`M${x} ${y0}V${y1}`);
    for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) grid.push(`M${x0} ${y}H${x1}`);
  }
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} ${y0} ${w} ${h}" width="${region.image.w}" height="${region.image.h}">`,
    `<!-- ${esc(region.name.en)}: area outlines drawn from the ${esc(SOURCE.name)} data by ${esc(SOURCE.by)}, ${esc(SOURCE.url)}`,
    `     (commit ${esc(meta.commit.slice(0, 12))}, ${esc(meta.date)}), licensed ${esc(SOURCE.license)} (${esc(SOURCE.licenseUrl)}).`,
    `     Changes: only the area borders, drawn as plain shapes and cropped to the region. Not for commercial use. -->`,
    `<title>${esc(region.name.en)}</title>`,
    `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#141b24"/>`,
    grid.length ? `<path d="${grid.join('')}" stroke="#223040" stroke-width="2" fill="none"/>` : '',
    paths.length ? `<g stroke="#9fb3c8" stroke-opacity=".55" stroke-width="5" stroke-linejoin="round" fill-rule="evenodd">${paths.join('')}</g>` : '',
    '</svg>',
    '',
  ].filter(Boolean).join('\n');
}

// ------------------------------------------------------------------------------------------------ stable ids

/**
 * The spots of the tcimba.json written last, per region ({ id, c, p, u? }), the excluded ones among them, so ids can be
 * carried over. No file (the first run) or a file that cannot be read means nothing to carry over; a broken one is
 * said, not silently ignored.
 */
async function previousSpots() {
  let text;
  try {
    text = await readFile(OUT_JSON, 'utf8');
  } catch {
    return new Map();
  }
  const ok = (s) => s && typeof s.id === 'string' && typeof s.c === 'string' && Array.isArray(s.p) && s.p.length === 2 && s.p.every(Number.isFinite)
    && (s.u === undefined || typeof s.u === 'string');
  const list = (x) => (Array.isArray(x) ? x : []).filter(ok);
  try {
    const json = JSON.parse(text);
    return new Map(Object.entries(json?.regions ?? {}).map(([id, r]) => [id, [...list(r?.spots), ...list(r?.excluded)]]));
  } catch (e) {
    console.warn(`${relative(ROOT, OUT_JSON)} could not be read, so no ids are carried over: ${e instanceof Error ? e.message : e}`);
    return new Map();
  }
}

/**
 * The ids of the last run for the spots of this one. `spots` come with the id their upstream id gives ("tc-" and its
 * start), `full` gives a spot's whole upstream id. A spot is matched by that id first (by its "u" if an earlier run
 * carried it over, else by its own id), wherever upstream has moved it since. A spot upstream gave a new id gets the
 * id of a spot that vanished from the same category at most CARRY_PX map pixels away (positions are fractions of the
 * box, which is in the map's pixel grid), and its own id as "u". The nearest pairs go first and every id passes on
 * once, so two spots that moved past each other cannot swap. A new spot whose id a carried spot holds already takes
 * its whole upstream id. Changes the spots in place; returns what it carried over in this run.
 */
export function carryOver(before, spots, box, full = new Map()) {
  const w = box[2] - box[0];
  const h = box[3] - box[1];
  const byKey = new Map(before.map((s) => [s.u ?? s.id, s]));
  const matched = new Set();
  for (const f of spots) {
    const g = byKey.get(f.id);
    if (!g) continue;
    matched.add(g);
    matched.add(f);
    if (g.id !== f.id) {
      f.u = f.id;
      f.id = g.id;
    }
  }
  const gone = before.filter((s) => !matched.has(s));
  const fresh = spots.filter((s) => !matched.has(s));
  const pairs = [];
  for (const g of gone) {
    for (const f of fresh) {
      if (g.c !== f.c) continue;
      const d = Math.hypot((g.p[0] - f.p[0]) * w, (g.p[1] - f.p[1]) * h);
      if (d <= CARRY_PX) pairs.push({ g, f, d });
    }
  }
  pairs.sort((a, b) => a.d - b.d || a.g.id.localeCompare(b.g.id) || a.f.id.localeCompare(b.f.id));
  const carried = [];
  for (const { g, f, d } of pairs) {
    if (matched.has(g) || matched.has(f)) continue;
    matched.add(g);
    matched.add(f);
    carried.push({ from: f.id, to: g.id, c: f.c, d });
    f.u = f.id;
    f.id = g.id;
  }
  // upstream brought back an id a carried spot holds by now: the new spot is told apart by its whole upstream id
  const taken = new Set(spots.filter((s) => matched.has(s)).map((s) => s.id));
  for (const s of spots) {
    if (matched.has(s) || !taken.has(s.id)) continue;
    const id = `tc-${full.get(s)}`;
    if (!full.has(s) || taken.has(id)) throw new Error(`${s.id}: a carried spot holds this id, and there is no other id to give`);
    s.u = s.id;
    s.id = id;
    taken.add(id);
  }
  return carried;
}

// ------------------------------------------------------------------------------------------------ main

const round4 = (n) => Math.round(n * 10000) / 10000;

function gitInfo(dir) {
  const out = execFileSync('git', ['-C', dir, 'log', '-1', '--format=%H %cs'], { encoding: 'utf8' }).trim();
  const [commit, date] = out.split(' ');
  return { commit, date };
}

/**
 * The day the given data files last changed at that commit. Only trees are compared (no rename detection, no lazy
 * fetch), so a partial clone without blobs never downloads anything for it.
 */
function gitDataDate(dir, commit, files) {
  return execFileSync('git', ['-C', dir, 'log', '-1', '--no-renames', '--format=%cs', commit, '--', ...files], {
    encoding: 'utf8', env: { ...process.env, GIT_NO_LAZY_FETCH: '1' },
  }).trim();
}

async function main(argv) {
  const dir = argv[0];
  if (!dir || dir.startsWith('--')) throw new Error(USAGE);
  const opt = {};
  let check = false;
  for (let i = 1; i < argv.length; i++) {
    if (argv[i] === '--check') {
      check = true;
      continue;
    }
    if (!['--commit', '--date', '--data-date'].includes(argv[i]) || argv[i + 1] == null) throw new Error(USAGE);
    opt[argv[i].slice(2)] = argv[++i];
  }
  const meta = opt.commit ? { commit: opt.commit, date: opt.date ?? '' } : gitInfo(dir);
  if (!/^[0-9a-f]{7,40}$/.test(meta.commit) || !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`bad commit or date: ${meta.commit} ${meta.date}`);
  if (opt['data-date'] != null && !/^\d{4}-\d{2}-\d{2}$/.test(opt['data-date'])) throw new Error(`bad data date: ${opt['data-date']}`);

  // the data must still be under the licence this script was written for
  const licence = await readFile(join(dir, 'LICENSE'), 'utf8');
  if (!/\/public\/data[\s\S]{0,200}CC BY-NC 4\.0/.test(licence)) throw new Error('LICENSE no longer puts /public/data under CC BY-NC 4.0: check the new terms before using the data');

  const data = join(dir, 'public', 'data');
  const read = async (p) => parseYaml(await readFile(join(data, p), 'utf8'), p);
  const maps = new Map(((await read('maps.yaml'))?.maps ?? []).map((m) => [m.name, m]));

  const out = { v: 1, source: { ...SOURCE, commit: meta.commit, date: meta.date }, regions: {} };
  const report = [];
  const dataFiles = [];
  /** the files to write (or, with --check, to compare): { file, text } */
  const files = [];
  const previous = await previousSpots();

  for (const region of REGIONS) {
    const world = region.world;
    if (!world) continue;
    const m = maps.get(world.map);
    if (!m) throw new Error(`${region.id}: map ${world.map} is not in maps.yaml`);
    const box = world.box;
    const [x0, y0, x1, y1] = box;
    const size = [m.tileWidth * m.tilesCountX, m.tileHeight * m.tilesCountY];
    if (!(x0 >= 0 && y0 >= 0 && x1 <= size[0] && y1 <= size[1] && x1 > x0 && y1 > y0)) throw new Error(`${region.id}: box ${box} is outside the ${size.join('x')} map`);
    if (!region.image || region.image.w !== (x1 - x0) / 2 || region.image.h !== (y1 - y0) / 2) {
      throw new Error(`${region.id}: image must be { src: 'maps/${region.id}.svg', w: ${(x1 - x0) / 2}, h: ${(y1 - y0) / 2} } (half the box)`);
    }
    if (region.image.src !== `maps/${region.id}.svg`) throw new Error(`${region.id}: image.src must be maps/${region.id}.svg`);

    dataFiles.push(`public/data/markers/${world.map}.yaml`, `public/data/regions/${world.map}.yaml`);
    const markers = (await read(`markers/${world.map}.yaml`))?.markers ?? [];
    const areaList = ((await read(`regions/${world.map}.yaml`))?.regions ?? [])
      .map((r) => ({ key: r.name, name: spacedName(r.name), rings: (r.borders ?? []).filter((ring) => ring.length >= 3) }))
      .filter((a) => a.rings.length);
    const areaIndex = new Map(areaList.map((a, i) => [a.key, i]));

    const areaOf = (mk) => {
      if (mk.region && areaIndex.has(mk.region)) return areaIndex.get(mk.region);
      const i = areaList.findIndex((a) => inside(a.rings, mk.x, mk.y));
      if (i >= 0) return i;
      let best = -1;
      let bestD = AREA_NEAR;
      areaList.forEach((a, k) => {
        const d = edgeDist(a.rings, mk.x, mk.y);
        if (d < bestD) { bestD = d; best = k; }
      });
      return best;
    };

    let spots = [];
    /** spot → its whole upstream id (for a clash with a carried id) */
    const full = new Map();
    const counts = {};
    let outside = 0;
    const ids = new Set();
    for (const mk of markers) {
      const c = CATEGORY[mk.subtype];
      if (!c) continue;
      if (typeof mk.x !== 'number' || typeof mk.y !== 'number' || typeof mk.id !== 'string') throw new Error(`${world.map}: marker without id or position`);
      let id = `tc-${mk.id.slice(0, 8)}`;
      if (ids.has(id)) id = `tc-${mk.id}`;
      ids.add(id);
      if (mk.x < x0 || mk.x > x1 || mk.y < y0 || mk.y > y1) { outside++; continue; }
      const spot = { id, c };
      const a = areaOf(mk);
      if (a >= 0) spot.a = a;
      // Empyrean traces are numbered in the game; dungeon entrances and strongholds are named by a plain English id
      // ("CaveoftheDesperate"). Kibelisk names are Chinese in this data and left out: the page numbers spots without a
      // name per area, as it does for cubes.
      const n = String(mk.name ?? '').trim();
      if (c === 'trace' && /^\d{1,4}$/.test(n)) spot.n = n;
      else if (NAMED.has(c) && /^[A-Za-z][A-Za-z0-9]{1,47}$/.test(n)) spot.n = NAME_FIX.get(n) ?? spacedName(n);
      spot.p = [round4((mk.x - x0) / (x1 - x0)), round4((mk.y - y0) / (y1 - y0))];
      spots.push(spot);
      full.set(spot, mk.id);
    }
    // ids first, EXCLUDE after: an excluded id the page shows may be one carried over to a new upstream id. The
    // excluded spots stay in the file (the page does not read them), so a later rename upstream still carries their
    // id over and keeps them out.
    const carried = carryOver(previous.get(region.id) ?? [], spots, box, full);
    const excluded = spots.filter((s) => EXCLUDE.has(s.id)).map(({ id, c, p, u }) => (u ? { id, c, p, u } : { id, c, p }));
    spots = spots.filter((s) => !EXCLUDE.has(s.id));
    for (const s of spots) counts[s.c] = (counts[s.c] ?? 0) + 1;
    // stable order: category, area, number, position (a name is no number: named spots go north to south)
    const num = (s) => (/^\d+$/.test(s.n ?? '') ? Number(s.n) : 0);
    spots.sort((p, q) => p.c.localeCompare(q.c) || (p.a ?? 999) - (q.a ?? 999) || num(p) - num(q) || p.p[1] - q.p[1] || p.p[0] - q.p[0]);

    out.regions[region.id] = {
      map: world.map,
      areas: areaList.map((a) => {
        const [x, y] = labelPoint(a.rings);
        return { name: a.name, pos: [round4((x - x0) / (x1 - x0)), round4((y - y0) / (y1 - y0))] };
      }),
      spots,
      ...(excluded.length ? { excluded } : {}),
    };
    files.push({ file: join(ROOT, 'public', region.image.src), text: svgOf(region, box, areaList, meta) });
    report.push(`${region.id} (${world.map}): ${spots.length} spots ${JSON.stringify(counts)}, ${areaList.length} areas` +
      `${outside ? `, ${outside} outside the box (left out)` : ''}${excluded.length ? `, ${excluded.length} excluded` : ''}` +
      `${carried.length ? `, ${carried.length} ${carried.length === 1 ? 'id' : 'ids'} carried over` : ''}`);
    // every carried id, so a maintainer can check that the spot really is the same one
    for (const k of carried) report.push(`  ${k.c}: ${k.from} keeps the id ${k.to} (${k.d.toFixed(1)} px away)`);
  }

  // the page shows how old the positions are, so it needs the date of the data itself, not of the newest commit
  const dataDate = opt.commit ? opt['data-date'] : gitDataDate(dir, meta.commit, dataFiles);
  if (dataDate != null && !/^\d{4}-\d{2}-\d{2}$/.test(dataDate)) throw new Error(`no data date for ${dataFiles.join(', ')}: ${dataDate}`);
  if (dataDate) out.source.dataDate = dataDate;

  // one region per line keeps the diff of a data update readable
  const body = Object.entries(out.regions).map(([id, r]) => `    ${JSON.stringify(id)}: ${JSON.stringify(r)}`).join(',\n');
  files.push({ file: OUT_JSON, text: `{\n  "v": 1,\n  "source": ${JSON.stringify(out.source)},\n  "regions": {\n${body}\n  }\n}\n` });
  console.log(report.join('\n'));

  if (check) {
    const changed = [];
    for (const { file, text } of files) {
      const now = await readFile(file, 'utf8').catch(() => null);
      // a Windows checkout (core.autocrlf) has CRLF line ends: the same data, not a change
      if (now?.replace(/\r\n/g, '\n') !== text) changed.push(relative(ROOT, file));
    }
    if (!changed.length) {
      console.log(`up to date (commit ${meta.commit.slice(0, 12)}, ${meta.date}; data ${dataDate ?? 'date unknown'})`);
      return 0;
    }
    console.log(`would change: ${changed.join(', ')}`);
    return EXIT_CHANGED;
  }
  for (const { file, text } of files) {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, text);
  }
  console.log(`wrote ${OUT_JSON} (commit ${meta.commit.slice(0, 12)}, ${meta.date}; data ${dataDate ?? 'date unknown'})`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }, (e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
