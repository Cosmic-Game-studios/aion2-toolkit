// Small helpers for the data scripts: they only touch files whose content really changed,
// so the scheduled update job does not create a commit when nothing was patched.
import { readFile, writeFile, access } from 'node:fs/promises';

export const exists = (p) => access(p).then(() => true, () => false);

export async function readJson(path) {
  try { return JSON.parse(await readFile(path, 'utf8')); } catch { return null; }
}

/** Timestamps that change on every run and do not count as a change. */
const VOLATILE = ['fetchedAt'];
const strip = (o) => (o && typeof o === 'object' && !Array.isArray(o)
  ? Object.fromEntries(Object.entries(o).filter(([k]) => !VOLATILE.includes(k)))
  : o);

/** Writes `text` to `path` unless the file already holds the same JSON (ignoring volatile timestamps). */
export async function writeIfChanged(path, text) {
  const before = await readFile(path, 'utf8').catch(() => null);
  if (before !== null) {
    if (before === text) return false;
    try {
      if (JSON.stringify(strip(JSON.parse(before))) === JSON.stringify(strip(JSON.parse(text)))) return false;
    } catch { /* not JSON: compare as text only */ }
  }
  await writeFile(path, text);
  return true;
}
