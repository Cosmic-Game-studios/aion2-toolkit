// Downloads every skill / specialisation / chain icon referenced in public/data/en/skills.json
// and public/data/learn-levels.json
// into public/icons/<ICON_ID>.webp, plus class emblems into public/emblems/.
// Icons are NCSOFT material (AION 2); fan-site mirrors: dbaion2.ru, endgametools.com.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = process.cwd();
const ICON_DIR = join(ROOT, 'public', 'icons');
const EMBLEM_DIR = join(ROOT, 'public', 'emblems');
const SOURCES = [(id) => `https://dbaion2.ru/icons/${id}.webp`, (id) => `https://endgametools.com/aion-2-classes/skills/${id}.webp`];
const EMBLEMS = ['Assassin', 'Chanter', 'Cleric', 'Elementalist', 'Fighter', 'Gladiator', 'Ranger', 'Sorcerer', 'Templar'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

async function download(urls, dest) {
  if (await exists(dest)) return 'skip';
  for (const url of urls) {
    const res = await fetch(url, { headers: { 'user-agent': 'aion2-toolkit icon fetch (fan project)' } });
    if (res.ok && (res.headers.get('content-type') || '').startsWith('image/')) {
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      return 'ok';
    }
  }
  return 'missing';
}

await mkdir(ICON_DIR, { recursive: true });
await mkdir(EMBLEM_DIR, { recursive: true });
const skills = JSON.parse(await readFile(join(ROOT, 'public', 'data', 'en', 'skills.json'), 'utf8'));
const ids = new Set();
for (const s of skills) {
  if (s.icon) ids.add(s.icon);
  for (const p of s.parts ?? []) if (p.icon) ids.add(p.icon);
  for (const c of s.chain ?? []) if (c.icon) ids.add(c.icon);
}
// Global-client icons that replace dbaion2's (see fetch-learn-levels.mjs)
const learn = JSON.parse(await readFile(join(ROOT, 'public', 'data', 'learn-levels.json'), 'utf8').catch(() => '{}'));
for (const [, icon] of Object.values(learn.skills ?? {})) if (icon) ids.add(icon);
console.log(`${ids.size} unique icons referenced`);
const missing = [];
let done = 0, skipped = 0;
for (const id of ids) {
  const r = await download(SOURCES.map((f) => f(id)), join(ICON_DIR, `${id}.webp`));
  if (r === 'missing') missing.push(id);
  else if (r === 'skip') skipped++;
  else { done++; await sleep(120); }
  if ((done + skipped + missing.length) % 50 === 0) console.log(`  ${done + skipped + missing.length}/${ids.size}`);
}
for (const e of EMBLEMS) {
  const r = await download([`https://dbaion2.ru/icons/UT_Class_${e}_Large.webp`], join(EMBLEM_DIR, `${e}.webp`));
  if (r === 'missing') missing.push(`emblem:${e}`);
}
console.log(`downloaded ${done}, skipped ${skipped}, missing ${missing.length}`);
if (missing.length) console.log('missing:', missing.join(', '));
