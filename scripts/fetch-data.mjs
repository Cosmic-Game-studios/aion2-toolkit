// Downloads the game data JSON (EN + DE) from dbaion2.ru into public/data/<lang>/.
// Source: https://dbaion2.ru (fan database, data read from the game client). AION 2 © NCSOFT.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'https://dbaion2.ru';
const LANGS = { en: '/data-en', de: '/data-de' };
const FILES = ['classes', 'skills', 'skill-costs', 'skill-points', 'daevanion'];
const OUT = join(process.cwd(), 'public', 'data');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The per-level effect id lists are not used by the app and make up over a third of skills.json.
const slim = {
  skills: (list) => list.map((s) => ({ ...s, levels: s.levels.map(({ effects, ...l }) => l) })),
};

for (const [lang, prefix] of Object.entries(LANGS)) {
  const dir = join(OUT, lang);
  await mkdir(dir, { recursive: true });
  for (const f of FILES) {
    const url = `${BASE}${prefix}/${f}.json`;
    const res = await fetch(url, { headers: { 'user-agent': 'aion2-toolkit data fetch (fan project)' } });
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
    let text = await res.text();
    const json = JSON.parse(text); // validate
    if (slim[f]) text = JSON.stringify(slim[f](json));
    await writeFile(join(dir, `${f}.json`), text);
    console.log(`${lang}/${f}.json  ${(text.length / 1024).toFixed(0)} KB`);
    await sleep(300);
  }
  await writeFile(
    join(dir, 'index.json'),
    JSON.stringify({ source: BASE, fetchedAt: new Date().toISOString(), files: FILES }, null, 2),
  );
}
console.log('done');
