// dbaion2.ru reports acquireLevel 1 for every skill, so the level that teaches each skill is read from
// endgametools.com class pages (Global service, 8 classes). Output: public/data/learn-levels.json
// { "<classType>": { "<ICON_ID>": level } }   AION 2 © NCSOFT.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'https://endgametools.com/en/aion-2/classes/';
const CLASSES = {
  gladiator: 'Gladiator', templar: 'Templar', assassin: 'Assassin', ranger: 'Ranger',
  chanter: 'Chanter', cleric: 'Cleric', sorcerer: 'Sorcerer', spiritmaster: 'Elementalist',
};
const OUT = join(process.cwd(), 'public', 'data', 'learn-levels.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// One <li> per skill inside the "Skills" section:
// <li ...><button ...><img src="/aion-2-classes/skills/ICON_GL_SKILL_002.webp" ...><span translate="no" ...>Keen Strike</span>...Lv.<nbsp>1</button></li>
const LI = /<li\b[^>]*>(.*?)<\/li>/gs;
const RE = /\/aion-2-classes\/skills\/([A-Za-z0-9_]+)\.webp"[^>]*>.*?translate="no"[^>]*>([^<]+)<\/span>.*?Lv\.[^0-9]*(\d+)/s;

const result = {};
for (const [slug, classType] of Object.entries(CLASSES)) {
  const res = await fetch(BASE + slug, { headers: { 'user-agent': 'aion2-toolkit learn-level fetch (fan project)' } });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const full = await res.text();
  const start = full.indexOf('id="skills"');
  const html = start >= 0 ? full.slice(start) : full;
  const map = {};
  const names = {};
  for (const li of html.matchAll(LI)) {
    const m = RE.exec(li[1]);
    if (!m) continue;
    const [, icon, name, lvl] = m;
    if (map[icon] != null && map[icon] !== Number(lvl)) console.warn(`  ${classType}: icon ${icon} used twice (${names[icon]} Lv${map[icon]} / ${name} Lv${lvl}) – keeping the lower level`);
    map[icon] = map[icon] == null ? Number(lvl) : Math.min(map[icon], Number(lvl));
    names[icon] = name;
  }
  result[classType] = map;
  console.log(`${classType}: ${Object.keys(map).length} skills`);
  await sleep(300);
}
await mkdir(join(process.cwd(), 'public', 'data'), { recursive: true });
await writeFile(OUT, JSON.stringify({ source: 'https://endgametools.com', fetchedAt: new Date().toISOString(), levels: result }, null, 1));
console.log('written', OUT);
