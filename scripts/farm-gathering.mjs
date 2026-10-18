// Turns the gathering points of the Aion 2 - Map Overlay (github.com/problem-xyz/aion2-map-overlay) into the farm
// map's third source: public/data/farm/gathering.json (ore, gems, plants, wood, Odyle and cooking ingredients of
// Verteron and Altgard).
//
// What is taken: only the "gathering-*" categories of assets/object-sets/verteron.json and altgard.json (one per
// material, children of "gathering") and their nodes. Never anything else of that repository: not its hidden cube
// spots (they come from lists of the game's cube groups, not from the data below), not its map images, not its code.
//
// Licence chain: the overlay adapted these points from the marker data the AION2 Interactive Map's site serves
// (© Yihao Liu "tc-imba" and contributors, CC BY-NC 4.0), and shares them under the same licence; its NOTICE says so,
// and this script refuses to run when it no longer does. So, as for tcimba.json:
// - non-commercial: the page loads gathering.json only while no ads are configured (VITE_ADSENSE_CLIENT empty),
// - attribution of both projects and a note of the changes: in gathering.json, on the farm page and in the README.
// The area names come from the AION2 Interactive Map's own /public/data (regions/<map>.yaml), like farm-tcimba.mjs
// reads them; its LICENSE is checked the same way.
//
// Positions: the overlay gives x and y as percentages of the 8192 x 8192 map layer, measured from its top-left corner
// (x = x_px / 8192 * 100, y = y_px / 8192 * 100). The region boxes (Region.world.box in src/features/farm/farmRules.ts)
// are in the AION2 Interactive Map's pixels, whose y counts up from the bottom, so a node lies at data pixel
// x = x% * 81.92, y = 8192 - y% * 81.92, and from there on it is converted like every tc-imba marker (fractionOf).
// Nodes outside the box are left out (and counted in the report).
//
// Spot ids are "px-" and 8 hex digits. The overlay's ids only number the nodes per material
// ("oss-World_L_A-gatheringOdyle-12"), and those numbers shift when upstream adds or drops a node, so they do not name
// a node: the id is the start of a SHA-1 of the region, the material and the position as the overlay writes them, and
// on a clash the whole hash. A node upstream moves gets a new hash; carryOver (farm-tcimba.mjs) then keeps the old id when a node of
// the same material vanished within CARRY_PX map pixels, reading the gathering.json written last.
//
// Usage: node scripts/farm-gathering.mjs <checkout of aion2-map-overlay> <checkout of aion2-interactive-map>
//                                         [--commit <sha> --date <YYYY-MM-DD>] [--check]
//   The overlay checkout needs NOTICE and assets/object-sets (a sparse checkout is enough), the other one LICENSE and
//   public/data. Without --commit the overlay's commit and its date come from `git -C <checkout> log -1`. --check
//   writes nothing: it exits with 2 when gathering.json would change, 0 when it is up to date; 1 is an error.
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REGIONS, categoryById } from '../src/features/farm/farmRules.ts';
import { SOURCE as UPSTREAM, areaFinder, carryOver, checkLicence, emit, fractionOf, gitInfo, parseYaml, readAreas } from './farm-tcimba.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT_JSON = join(ROOT, 'public', 'data', 'farm', 'gathering.json');
const USAGE = 'usage: node scripts/farm-gathering.mjs <overlay checkout> <interactive map checkout> [--commit <sha> --date <YYYY-MM-DD>] [--check]';

export const SOURCE = {
  name: 'Aion 2 - Map Overlay',
  by: 'problem-xyz',
  url: 'https://github.com/problem-xyz/aion2-map-overlay',
  license: 'CC BY-NC 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
};

/** the overlay's object sets and the regions they show: fixed by file name, not read from a file's mapName */
const SETS = [
  { file: 'verteron.json', region: 'verteron', map: 'World_L_A' },
  { file: 'altgard.json', region: 'altgard', map: 'World_D_A' },
];

/** the side of the map layer the overlay's percentages are of (pixels) */
const LAYER = 8192;

/**
 * The overlay's material (its category name) → our category. The Verteron kinds follow the AION2 Interactive Map's
 * types.yaml, whose icon names say what each one is (Herb, Food, Fruit, Ore, Gemstone, Wood, Od). Altgard's materials
 * have other names there and no such hint: they are taken to be the same kinds in the same upstream order (Asvata the
 * wood, Azpha and Calendula the herbs, the five after them cooking ingredients), which is likely but not certain. A
 * material that is not listed stops the script: someone has to decide where it belongs.
 */
const MATERIAL = {
  // both regions
  Odyle: 'odyle',
  Orichalcum: 'ore',
  Sapphire: 'gem',
  Diamond: 'gem',
  Ruby: 'gem',
  // Verteron
  Yggdrasil: 'wood',
  Aria: 'plant',
  Targena: 'plant',
  Coriolus: 'food',
  Kukuru: 'food',
  Mela: 'food',
  Inina: 'food',
  Cypri: 'food',
  // Altgard (inferred from the upstream order, see above)
  Asvata: 'wood',
  Azpha: 'plant',
  Calendula: 'plant',
  Morfa: 'food',
  Ohkra: 'food',
  Raydam: 'food',
  Conide: 'food',
  Pujery: 'food',
};

/** the overlay's category id of a material: "gathering-" and the material's id */
const MATERIAL_ID = /^gathering-([a-z0-9]+(?:-[a-z0-9]+)*)$/;

/** Our category of a material name, or an error that says what to do. */
export function categoryOf(name) {
  const c = Object.hasOwn(MATERIAL, name) ? MATERIAL[name] : undefined;
  if (!c) throw new Error(`unknown material "${name}": add it to MATERIAL in scripts/farm-gathering.mjs with its category`);
  if (categoryById(c)?.group !== 'gather') throw new Error(`material "${name}": ${c} is not a gathering category in farmRules.ts`);
  return c;
}

/**
 * The overlay's percentages (of the 8192 layer, from its top-left corner) as data pixels of the AION2 Interactive
 * Map (y up from the bottom).
 */
export const toData = (x, y) => [(x / 100) * LAYER, LAYER - (y / 100) * LAYER];

/** The hash a node's id is cut from: region, material and the position exactly as the overlay writes it. */
const nodeHash = (region, mat, x, y) => createHash('sha1').update(`${region}|${mat}|${x}|${y}`).digest('hex');

// ------------------------------------------------------------------------------------------------ the overlay's NOTICE

/**
 * Reads the overlay's NOTICE: the block that lists both object sets must still name the AION2 Interactive Map as the
 * source and CC BY-NC 4.0 as the licence, and give the gathering points' conversion this script relies on. Returns the
 * day the gathering points were retrieved. Throws when anything of it is missing.
 */
export function readNotice(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  // a block: its file list, a line of dashes, then its text up to the next block's file list
  const rules = lines.map((l, i) => (/^-{20,}\s*$/.test(l) ? i : -1)).filter((i) => i >= 0);
  const blocks = rules.map((r, k) => {
    let start = r;
    while (start > 0 && lines[start - 1].trim()) start--;
    return { start, files: lines.slice(start, r).map((l) => l.trim()), rule: r };
  });
  const k = blocks.findIndex((b) => SETS.every((s) => b.files.includes(`assets/object-sets/${s.file}`)));
  if (k < 0) throw new Error(`NOTICE no longer lists ${SETS.map((s) => `assets/object-sets/${s.file}`).join(' and ')}: check its new terms before using the data`);
  const body = lines.slice(blocks[k].rule + 1, blocks[k + 1]?.start ?? lines.length).join('\n').replace(/\s+/g, ' ');
  const need = [
    [/github\.com\/aion2-interactive-map\/aion2-interactive-map/, 'the AION2 Interactive Map as the source'],
    [/Creative Commons Attribution-NonCommercial 4\.0 International \(CC BY-NC 4\.0\)/, 'CC BY-NC 4.0 as the licence'],
    [/x = x_px \/ 8192 \* 100 and y = y_px \/ 8192 \* 100/, 'the gathering points as percentages of the 8192 layer from its top-left corner'],
  ];
  for (const [re, what] of need) if (!re.test(body)) throw new Error(`NOTICE no longer gives ${what} for the object sets: check it before using the data`);
  const date = /gathering points[\s\S]{0,600}?\bretrieved on (\d{4}-\d{2}-\d{2})/i.exec(body)?.[1];
  if (!date) throw new Error('NOTICE no longer says when the gathering points were retrieved ("retrieved on YYYY-MM-DD")');
  return date;
}

// ------------------------------------------------------------------------------------------------ stable ids

/**
 * The spots of the gathering.json written last, per region, as carryOver takes them ({ id, c: material id, p, u? }).
 * No file means nothing to carry over; a broken one is said, not silently ignored.
 */
async function previousSpots(file = OUT_JSON) {
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch {
    return new Map();
  }
  try {
    const json = JSON.parse(text);
    return new Map(Object.entries(json?.regions ?? {}).map(([id, r]) => {
      const mats = Array.isArray(r?.materials) ? r.materials : [];
      const list = (Array.isArray(r?.spots) ? r.spots : [])
        .filter((s) => s && typeof s.id === 'string' && Number.isInteger(s.m) && typeof mats[s.m]?.id === 'string'
          && Array.isArray(s.p) && s.p.length === 2 && s.p.every(Number.isFinite) && (s.u === undefined || typeof s.u === 'string'))
        .map((s) => ({ id: s.id, c: mats[s.m].id, p: s.p, ...(s.u ? { u: s.u } : {}) }));
      return [id, list];
    }));
  } catch (e) {
    console.warn(`${relative(ROOT, file)} could not be read, so no ids are carried over: ${e instanceof Error ? e.message : e}`);
    return new Map();
  }
}

// ------------------------------------------------------------------------------------------------ main

/**
 * The gathering points of one object set as a region of gathering.json. `areas` are the region's areas (readAreas),
 * `before` the spots of the last run (previousSpots). Returns the region and what the report says about it.
 */
export function convertSet(set, json, region, areas, before = []) {
  const box = region.world.box;
  const [x0, y0, x1, y1] = box;
  const frac = fractionOf(box);
  const findArea = areaFinder(areas);
  if (!json || !Array.isArray(json.categories) || !Array.isArray(json.nodes)) throw new Error(`${set.file}: no categories or nodes`);

  // the materials: the children of "gathering", in the overlay's order
  const materials = [];
  const byCat = new Map();
  for (const cat of json.categories) {
    if (typeof cat?.id !== 'string' || !cat.id.startsWith('gathering-')) continue;
    const m = MATERIAL_ID.exec(cat.id);
    if (!m || cat.parentId !== 'gathering' || typeof cat.name !== 'string') throw new Error(`${set.file}: category ${cat.id} is not a material under "gathering"`);
    const mat = { id: m[1], name: cat.name.trim(), c: categoryOf(cat.name.trim()) };
    byCat.set(cat.id, materials.length);
    materials.push(mat);
  }
  if (!materials.length) throw new Error(`${set.file}: no gathering categories`);

  const spots = [];
  const full = new Map();
  const ids = new Set();
  let outside = 0;
  for (const node of json.nodes) {
    // a node right under "gathering" names no material
    if (node?.categoryId === 'gathering') throw new Error(`${set.file}: node ${node.id} has no material`);
    const mi = byCat.get(node?.categoryId);
    if (mi === undefined) continue;
    const { id, x, y } = node;
    if (typeof id !== 'string' || !Number.isFinite(x) || !Number.isFinite(y) || x < 0 || x > 100 || y < 0 || y > 100) {
      throw new Error(`${set.file}: gathering node without id or position: ${JSON.stringify(node)}`);
    }
    const [dx, dy] = toData(x, y);
    if (dx < x0 || dx > x1 || dy < y0 || dy > y1) { outside++; continue; }
    const hash = nodeHash(set.region, materials[mi].id, x, y);
    let sid = `px-${hash.slice(0, 8)}`;
    if (ids.has(sid)) sid = `px-${hash}`;
    if (ids.has(sid)) throw new Error(`${set.file}: two ${materials[mi].name} nodes at ${x}, ${y}`);
    ids.add(sid);
    const spot = { id: sid, c: materials[mi].id };
    const a = findArea(dx, dy);
    if (a >= 0) spot.a = a;
    spot.p = frac(dx, dy);
    spots.push(spot);
    full.set(spot, `px-${hash}`);
  }
  const carried = carryOver(before, spots, box, full);

  // stable order: material, area, north to south, west to east
  const matIndex = new Map(materials.map((m, i) => [m.id, i]));
  const out = spots.map((s) => ({ id: s.id, m: matIndex.get(s.c), ...(s.a !== undefined ? { a: s.a } : {}), p: s.p, ...(s.u ? { u: s.u } : {}) }));
  out.sort((p, q) => p.m - q.m || (p.a ?? 999) - (q.a ?? 999) || p.p[1] - q.p[1] || p.p[0] - q.p[0]);

  const counts = {};
  const perMat = {};
  for (const s of out) {
    const mat = materials[s.m];
    counts[mat.c] = (counts[mat.c] ?? 0) + 1;
    perMat[mat.name] = (perMat[mat.name] ?? 0) + 1;
  }
  const noArea = out.filter((s) => s.a === undefined).length;
  const report = [`${set.region} (${set.map}, ${set.file}): ${out.length} spots ${JSON.stringify(counts)}, ${JSON.stringify(perMat)}`
    + `${outside ? `, ${outside} outside the box (left out)` : ''}${noArea ? `, ${noArea} without an area` : ''}`
    + `${carried.length ? `, ${carried.length} ${carried.length === 1 ? 'id' : 'ids'} carried over` : ''}`];
  for (const k of carried) report.push(`  ${k.c}: ${k.from} keeps the id ${k.to} (${k.d.toFixed(1)} px away)`);
  return { region: { map: set.map, materials, areas: areas.map((a) => a.name), spots: out }, report, outside };
}

/** The file's text: one region per line, so the diff of a data update stays readable. */
export function fileText(source, regions) {
  const body = Object.entries(regions).map(([id, r]) => `    ${JSON.stringify(id)}: ${JSON.stringify(r)}`).join(',\n');
  return `{\n  "v": 1,\n  "source": ${JSON.stringify(source)},\n  "regions": {\n${body}\n  }\n}\n`;
}

async function main(argv) {
  const [overlay, imap] = argv;
  if (!overlay || !imap || overlay.startsWith('--') || imap.startsWith('--')) throw new Error(USAGE);
  const opt = {};
  let check = false;
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--check') {
      check = true;
      continue;
    }
    if (!['--commit', '--date'].includes(argv[i]) || argv[i + 1] == null) throw new Error(USAGE);
    opt[argv[i].slice(2)] = argv[++i];
  }
  const meta = opt.commit ? { commit: opt.commit, date: opt.date ?? '' } : gitInfo(overlay);
  if (!/^[0-9a-f]{7,40}$/.test(meta.commit) || !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`bad commit or date: ${meta.commit} ${meta.date}`);

  // both licences first: nothing is read from data whose terms changed
  const retrieved = readNotice(await readFile(join(overlay, 'NOTICE'), 'utf8'));
  await checkLicence(imap);

  const data = join(imap, 'public', 'data');
  const read = async (p) => parseYaml(await readFile(join(data, p), 'utf8'), p);
  const maps = new Map(((await read('maps.yaml'))?.maps ?? []).map((m) => [m.name, m]));
  const previous = await previousSpots();

  const regions = {};
  const report = [];
  for (const set of SETS) {
    const region = REGIONS.find((r) => r.id === set.region);
    if (!region?.world || region.world.map !== set.map) throw new Error(`${set.file}: region ${set.region} must be on map ${set.map} in farmRules.ts`);
    const m = maps.get(set.map);
    if (!m) throw new Error(`${set.region}: map ${set.map} is not in maps.yaml`);
    const size = [m.tileWidth * m.tilesCountX, m.tileHeight * m.tilesCountY];
    // the overlay's percentages are of an 8192 square layer: another size would put every node elsewhere
    if (size[0] !== LAYER || size[1] !== LAYER) throw new Error(`${set.map} is ${size.join(' x ')} in maps.yaml, not ${LAYER} x ${LAYER}: the overlay's positions no longer fit`);
    const json = JSON.parse(await readFile(join(overlay, 'assets', 'object-sets', set.file), 'utf8'));
    const areas = readAreas(await read(`regions/${set.map}.yaml`));
    const r = convertSet(set, json, region, areas, previous.get(set.region) ?? []);
    regions[set.region] = r.region;
    report.push(...r.report);
  }

  const source = {
    ...SOURCE, commit: meta.commit, date: meta.date, retrieved,
    upstream: { name: UPSTREAM.name, by: UPSTREAM.by, url: UPSTREAM.url },
  };
  console.log(report.join('\n'));
  return emit([{ file: OUT_JSON, text: fileText(source, regions) }], check, `commit ${meta.commit.slice(0, 12)}, ${meta.date}; retrieved ${retrieved}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }, (e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
