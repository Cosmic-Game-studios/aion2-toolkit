// dbaion2.ru reports acquireLevel 1 for every skill, and for some skills it lists the icon of the
// Korean client (e.g. Cleric "Voice of Doom", Gladiator "Zikel's Blessing"). The level that teaches each
// skill and the icon the Global client shows are read from the endgametools.com class pages (Global
// service, 8 classes) and matched to our skills by English name.
// Output: public/data/learn-levels.json  { "skills": { "<skillId>": [level, "<ICON_ID>"] } }   AION 2 © NCSOFT.
import { mkdir, readFile } from 'node:fs/promises';
import { writeIfChanged } from './lib/files.mjs';
import { join } from 'node:path';

const BASE = 'https://endgametools.com/en/aion-2/classes/';
const CLASSES = {
  gladiator: 'Gladiator', templar: 'Templar', assassin: 'Assassin', ranger: 'Ranger',
  chanter: 'Chanter', cleric: 'Cleric', sorcerer: 'Sorcerer', spiritmaster: 'Elementalist',
};
const OUT = join(process.cwd(), 'public', 'data', 'learn-levels.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .trim();
const norm = (s) => s.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, ' ');

// One <li> per skill inside the "Skills" section:
// <li ...><button ...><img src="/aion-2-classes/skills/ICON_GL_SKILL_002.webp" ...><span translate="no" ...>Keen Strike</span>...Lv.<nbsp>1</button></li>
const LI = /<li\b[^>]*>(.*?)<\/li>/gs;
const RE = /\/aion-2-classes\/skills\/([A-Za-z0-9_]+)\.webp"[^>]*>.*?translate="no"[^>]*>([^<]+)<\/span>.*?Lv\.[^0-9]*(\d+)/s;

const skills = JSON.parse(await readFile(join(process.cwd(), 'public', 'data', 'en', 'skills.json'), 'utf8'));
const result = {};
for (const [slug, classType] of Object.entries(CLASSES)) {
  const res = await fetch(BASE + slug, { headers: { 'user-agent': 'aion2-toolkit learn-level fetch (fan project)' } });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const full = await res.text();
  const start = full.indexOf('id="skills"');
  const html = start >= 0 ? full.slice(start) : full;
  const byName = new Map();
  for (const li of html.matchAll(LI)) {
    const m = RE.exec(li[1]);
    if (!m) continue;
    const [, icon, name, lvl] = m;
    const key = norm(decode(name));
    if (!byName.has(key)) byName.set(key, { icon, level: Number(lvl) });
  }
  const own = skills.filter((s) => s.classType === classType);
  const unmatched = [];
  let icons = 0;
  for (const s of own) {
    const hit = byName.get(norm(s.name));
    if (!hit) { unmatched.push(s.name); continue; }
    result[s.id] = [hit.level, hit.icon];
    if (hit.icon !== s.icon) icons++;
  }
  console.log(`${classType}: ${own.length - unmatched.length}/${own.length} skills matched, ${icons} icons corrected`
    + (unmatched.length ? ` – not found: ${unmatched.join(', ')}` : ''));
  await sleep(300);
}
if (!Object.keys(result).length) throw new Error('no skills matched – page layout changed?');
await mkdir(join(process.cwd(), 'public', 'data'), { recursive: true });
// one skill per line keeps the diff of a data update readable
const lines = Object.entries(result).map(([id, v]) => `  ${JSON.stringify(id)}: ${JSON.stringify(v)}`);
const text = [
  '{',
  ' "source": "https://endgametools.com",',
  ` "fetchedAt": ${JSON.stringify(new Date().toISOString())},`,
  ' "skills": {',
  lines.join(',\n'),
  ' }',
  '}',
  '',
].join('\n');
const wrote = await writeIfChanged(OUT, text);
console.log(wrote ? 'written' : 'unchanged', OUT);
