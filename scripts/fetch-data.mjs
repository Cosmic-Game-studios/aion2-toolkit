// Downloads the game data JSON (EN + DE) from dbaion2.ru into public/data/<lang>/.
// Source: https://dbaion2.ru – fan database whose EN/DE files are read from the AION 2 *global* client
// (the Korean client has no German texts). AION 2 © NCSOFT.
//
// Runs on a schedule in GitHub Actions (.github/workflows/update-data.yml):
// - conditional requests (ETag / Last-Modified) so unchanged files are not downloaded again,
// - plausibility checks before anything is written, so a broken upstream file never reaches the site,
// - public/data/meta.json records the client, source and the newest upstream change ("data as of").
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { exists, readJson, writeIfChanged } from './lib/files.mjs';

const BASE = 'https://dbaion2.ru';
const LANGS = { en: '/data-en', de: '/data-de' };
const FILES = ['classes', 'skills', 'skill-costs', 'skill-points', 'daevanion'];
const OUT = join(process.cwd(), 'public', 'data');
const META = join(OUT, 'meta.json');
const UA = 'aion2-toolkit data fetch (fan project; github.com/Cosmic-Game-studios/aion2-toolkit)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The per-level effect id lists are not used by the app and make up over a third of skills.json.
const slim = {
  skills: (list) => list.map((s) => ({ ...s, levels: s.levels.map(({ effects, ...l }) => l) })),
};

const fail = (msg) => { throw new Error(`implausible data: ${msg}`); };
const check = {
  classes: (j) => { if (!Array.isArray(j) || j.length < 8) fail('classes.json has fewer than 8 classes'); },
  skills: (j) => {
    if (!Array.isArray(j) || j.length < 250) fail(`skills.json has ${j?.length ?? 0} skills`);
    const bad = j.find((s) => !s.id || !s.classType || !Array.isArray(s.levels) || !s.levels.length);
    if (bad) fail(`skill without id/class/levels: ${JSON.stringify(bad).slice(0, 120)}`);
    if (new Set(j.map((s) => s.classType)).size < 8) fail('skills.json covers fewer than 8 classes');
  },
  'skill-costs': (j) => { if (!j || typeof j !== 'object' || Object.keys(j).length < 250) fail('skill-costs.json is too small'); },
  'skill-points': (j) => { if (!Array.isArray(j?.level) || j.level.length < 45) fail('skill-points.json has no level table'); },
  daevanion: (j) => { if (!j?.classes || Object.keys(j.classes).length < 8) fail('daevanion.json has fewer than 8 classes'); },
};

const old = (await readJson(META)) ?? { files: {} };
const files = { ...old.files };
let changed = 0;

for (const [lang, prefix] of Object.entries(LANGS)) {
  const dir = join(OUT, lang);
  await mkdir(dir, { recursive: true });
  for (const f of FILES) {
    const key = `${lang}/${f}`;
    const url = `${BASE}${prefix}/${f}.json`;
    const dest = join(dir, `${f}.json`);
    const prev = files[key];
    const headers = { 'user-agent': UA };
    if (prev && (await exists(dest))) {
      if (prev.etag) headers['if-none-match'] = prev.etag;
      if (prev.lastModified) headers['if-modified-since'] = prev.lastModified;
    }
    const res = await fetch(url, { headers });
    if (res.status === 304) { console.log(`${key.padEnd(18)} unchanged`); await sleep(200); continue; }
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
    let text = await res.text();
    const json = JSON.parse(text);
    check[f]?.(json);
    if (slim[f]) text = JSON.stringify(slim[f](json));
    files[key] = { etag: res.headers.get('etag'), lastModified: res.headers.get('last-modified') };
    const wrote = await writeIfChanged(dest, text);
    if (wrote) changed++;
    console.log(`${key.padEnd(18)} ${wrote ? 'UPDATED' : 'same content'}  ${(text.length / 1024).toFixed(0)} KB`);
    await sleep(300);
  }
}

const newest = Object.values(files).map((x) => Date.parse(x?.lastModified ?? '')).filter(Number.isFinite);
const meta = {
  client: 'global',
  source: BASE,
  updatedAt: newest.length ? new Date(Math.max(...newest)).toISOString() : old.updatedAt ?? null,
  files: Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b))),
};
await writeIfChanged(META, JSON.stringify(meta, null, 2) + '\n');
console.log(changed ? `${changed} file(s) updated` : 'no changes');
