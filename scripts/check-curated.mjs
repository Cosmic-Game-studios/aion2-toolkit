// Checks the hand-curated class data against the game data:
//   src/data/combos/<class>.ts  – every skill / part id exists in that class, every evidence quote is in the skill texts
//   src/data/mechanics/<class>.ts – every skill / part id exists in that class
// Usage: node scripts/check-curated.mjs [class-file-name ...] [--report]   (Node 22.6+ strips the TypeScript types on import)
//   --report: print problems but exit 0 (the data update uses it, so a patch that changes a skill text is reported, not blocking)
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const load = async (lang) => JSON.parse(await readFile(join(ROOT, 'public', 'data', lang, 'skills.json'), 'utf8'));
const [en, de] = await Promise.all([load('en'), load('de')]);
const deById = new Map(de.map((s) => [s.id, s]));

const FILE_CLASS = {
  gladiator: 'Gladiator', templar: 'Templar', assassin: 'Assassin', ranger: 'Ranger', sorcerer: 'Sorcerer',
  elementalist: 'Elementalist', cleric: 'Cleric', chanter: 'Chanter', fighter: 'Fighter',
};
const norm = (t) => (t ?? '').replace(/\*\*/g, '').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();

/** every text of a skill in one language: descriptions of all levels, one specialisation or one chain skill */
function texts(s, where) {
  if (!s) return [];
  if (where.part) return (s.parts ?? []).filter((p) => p.id === where.part).map((p) => norm(p.desc));
  if (where.chain) {
    const c = (s.chain ?? [])[where.chainIndex];
    return c ? [].concat(c.desc ?? []).map(norm) : [];
  }
  return [norm(s.description), ...(s.levels ?? []).map((l) => norm(l.description))];
}

const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const reportOnly = process.argv.includes('--report');
let errors = 0;
let warnings = 0;
const err = (f, msg) => { errors++; console.log(`  ERROR ${f}: ${msg}`); };
const warn = (f, msg) => { warnings++; console.log(`  warn  ${f}: ${msg}`); };

async function files(dir) {
  const names = (await readdir(join(ROOT, dir))).filter((n) => n.endsWith('.ts') && !['types.ts', 'index.ts'].includes(n));
  return names.filter((n) => !only.length || only.some((o) => n.startsWith(o)));
}

for (const name of await files('src/data/combos')) {
  const slug = name.replace(/\.ts$/, '');
  const cls = FILE_CLASS[slug];
  const f = `combos/${name}`;
  if (!cls) { err(f, 'unknown class file name'); continue; }
  const mod = await import(pathToFileURL(join(ROOT, 'src/data/combos', name)).href);
  const list = mod.combos;
  if (!Array.isArray(list)) { err(f, 'no `export const combos`'); continue; }
  const mine = new Map(en.filter((s) => s.classType === cls).map((s) => [s.id, s]));
  const seen = new Set();
  console.log(`${f}: ${list.length} combos`);
  for (const c of list) {
    const tag = `${f} [${c.id}]`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.id ?? '')) err(tag, 'id must be kebab-case');
    if (seen.has(c.id)) err(tag, 'duplicate id');
    seen.add(c.id);
    for (const k of ['title', 'text', 'how']) if (!c[k]?.de || !c[k]?.en) err(tag, `missing ${k}.de / ${k}.en`);
    if (!c.setup?.length || !c.payoff?.length) err(tag, 'setup and payoff must not be empty');
    for (const ref of [...(c.setup ?? []), ...(c.payoff ?? []), ...(c.stack ?? []).map((id) => ({ id }))]) {
      const s = mine.get(ref.id);
      if (!s) { err(tag, `skill ${ref.id} is not a ${cls} skill`); continue; }
      if (ref.part && !(s.parts ?? []).some((p) => p.id === ref.part)) err(tag, `part ${ref.part} is not a specialisation of ${s.name}`);
    }
    if (!c.evidence?.length) err(tag, 'no evidence quotes');
    for (const e of c.evidence ?? []) {
      const s = mine.get(e.id);
      if (!s) { err(tag, `evidence skill ${e.id} is not a ${cls} skill`); continue; }
      const chainIndex = e.chain ? (s.chain ?? []).findIndex((x) => x.name === e.chain) : -1;
      if (e.chain && chainIndex < 0) { err(tag, `${s.name} has no chain skill "${e.chain}" (use the English chain name)`); continue; }
      const where = { part: e.part, chain: e.chain, chainIndex };
      const enT = texts(s, where);
      const deT = texts(deById.get(e.id), where);
      const what = `${s.name}${e.part ? ' part ' + e.part : ''}${e.chain ? ' chain ' + e.chain : ''}`;
      if (!enT.some((t) => t.includes(norm(e.en)))) err(tag, `EN quote not found in ${what}: "${e.en}"`);
      if (!deT.some((t) => t.includes(norm(e.de)))) err(tag, `DE quote not found in ${what}: "${e.de}"`);
      if (norm(e.en).length < 12 || norm(e.de).length < 12) warn(tag, `quote very short for ${s.name}`);
    }
    const inv = [...(c.setup ?? []), ...(c.payoff ?? [])].map((r) => r.id);
    if (!(c.evidence ?? []).some((e) => inv.includes(e.id))) err(tag, 'evidence must quote at least one skill of the combo');
  }
}

for (const name of await files('src/data/mechanics')) {
  const slug = name.slice(0, -3);
  const cls = FILE_CLASS[slug];
  const f = `mechanics/${name}`;
  if (!cls) { err(f, 'unknown class file name'); continue; }
  const mod = await import(pathToFileURL(join(ROOT, 'src/data/mechanics', name)).href);
  const list = mod.mechanics;
  if (!Array.isArray(list)) { err(f, 'no `export const mechanics`'); continue; }
  if (!list.length) { warn(f, 'empty (not modelled yet)'); continue; }
  const mine = new Map(en.filter((s) => s.classType === cls).map((s) => [s.id, s]));
  const seen = new Set();
  const chkPart = (s, part, what) => { if (part && !(s?.parts ?? []).some((p) => p.id === part)) err(f, `${what}: part ${part} is not a specialisation of ${s?.name}`); };
  for (const m of list) {
    const s = mine.get(m.id);
    if (!s) { err(f, `${m.id} is not a ${cls} skill`); continue; }
    if (seen.has(m.id)) err(f, `${s.name} listed twice`);
    seen.add(m.id);
    for (const c of [...(m.use ?? []), ...(m.useVia ?? []).flatMap((v) => v.use ?? [])]) {
      if (c.t === 'after') c.ids.forEach((id) => { if (!mine.has(id)) err(f, `${s.name}: after-skill ${id} is not a ${cls} skill`); });
    }
    for (const v of m.useVia ?? []) chkPart(s, v.part, `${s.name} useVia`);
    for (const e of m.gives ?? []) chkPart(s, e.part, `${s.name} gives ${e.s}`);
    for (const r of m.resets ?? []) { if (r.id !== 'all' && !mine.has(r.id)) err(f, `${s.name}: resets ${r.id}, not a ${cls} skill`); chkPart(s, r.part, `${s.name} resets`); }
  }
  console.log(`${f}: ${list.length} skills modelled`);
}

console.log(errors ? `\n${errors} error(s), ${warnings} warning(s)` : `\nall good (${warnings} warning(s))`);
process.exit(errors && !reportOnly ? 1 : 0);
