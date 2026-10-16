import { useSyncExternalStore } from 'react';
import { storage } from '../../lib/storage';
import { regionById } from './farmRules';

/*
 * The spots a player has found, per region. Kept in this browser (storage key KEY: { [region]: id[] }), a Set per
 * region in memory, shared by the page, the map and the cards through a tiny external store (as the drafts are). The
 * ids are the spots' own ids, which the data keeps stable across updates (scripts/farm-tcimba.mjs carries an id over
 * when upstream renames a spot), so progress survives a data update.
 *
 * There is no account: progress moves to another browser as a code or a JSON file, made and read in the browser.
 * Both carry { v: 1, found: { [region]: id[] } } and are checked strictly when read back: only known regions, only
 * ids that look like spot ids, size limits before anything is unpacked or parsed.
 */

const KEY = 'farm:found:v1';

/** found ids per region; a new Map (and a new Set for the region that changed) on every change, so React sees it */
export type Found = ReadonlyMap<string, ReadonlySet<string>>;
/** the stored and exported form */
export type FoundData = Record<string, string[]>;

/** spot ids: "tc-1a2b3c4d" (up to "tc-" and a whole uuid) and "<issue>-<n>"; nothing the data makes is longer */
const ID = /^[A-Za-z0-9_-]{1,64}$/;
/** per region: far more than any region has spots (Verteron would have about 3,500 with gathering nodes) */
const MAX_PER_REGION = 20_000;
const EMPTY: ReadonlySet<string> = new Set();

/** Whether a string looks like a spot id (a link's spot, a found list's entries); a draft's key ("draft:…") does not. */
export const isSpotId = (id: string) => ID.test(id);

/**
 * A found list from storage, a code or a file. strict (code, file): null when anything is off, so a damaged or foreign
 * code changes nothing. Not strict (storage): bad entries are dropped and the rest is kept, so one stray value does not
 * wipe the player's progress.
 */
function parseFound(raw: unknown, strict: boolean): FoundData | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out: FoundData = {};
  for (const [region, ids] of Object.entries(raw)) {
    const ok = !!regionById(region) && Array.isArray(ids) && ids.length <= MAX_PER_REGION;
    if (!ok) {
      if (strict) return null;
      continue;
    }
    const good = (ids as unknown[]).filter((id): id is string => typeof id === 'string' && ID.test(id));
    if (strict && good.length !== ids.length) return null;
    if (good.length) out[region] = [...new Set(good)];
  }
  return out;
}

/* ---------- the store ---------- */

let cache: Map<string, ReadonlySet<string>> | null = null;
const listeners = new Set<() => void>();
const read = (): Found => (cache ??= new Map(Object.entries(parseFound(storage.get<unknown>(KEY, null), false) ?? {}).map(([r, ids]) => [r, new Set(ids)])));
const emit = () => listeners.forEach((l) => l());
const write = (next: Map<string, ReadonlySet<string>>) => {
  cache = next;
  const data = foundData(next);
  if (Object.keys(data).length) storage.set(KEY, data);
  else storage.remove(KEY);
  emit();
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

if (typeof window !== 'undefined') {
  // another tab changed the progress (storage.ts prefixes the key; null = storage cleared)
  window.addEventListener('storage', (e) => {
    if (e.key == null || e.key.endsWith(`:${KEY}`)) { cache = null; emit(); }
  });
}

/** The region's found ids (an empty set when there are none). */
export const foundIn = (found: Found, region: string): ReadonlySet<string> => found.get(region) ?? EMPTY;

/** At most MAX_PER_REGION ids: the oldest go first (a Set keeps the order they were added in). */
const capped = (ids: Iterable<string>) => {
  const list = [...new Set(ids)];
  return new Set(list.length > MAX_PER_REGION ? list.slice(list.length - MAX_PER_REGION) : list);
};

/** Marks a spot found or not found; returns whether it is found now. */
export function toggleFound(region: string, id: string): boolean {
  if (!regionById(region) || !ID.test(id)) return false;
  const all = new Map(read());
  const set = new Set(foundIn(all, region));
  const on = !set.delete(id);
  if (on) set.add(id);
  all.set(region, capped(set));
  write(all);
  return on;
}

/** Forgets the region's found spots; returns them, so a toast can undo it. */
export function resetRegion(region: string): string[] {
  const all = new Map(read());
  const was = [...foundIn(all, region)];
  if (!was.length) return was;
  all.delete(region);
  write(all);
  return was;
}

/** Puts a region's found spots back (Undo of a reset), keeping any found since. */
export function restoreRegion(region: string, ids: string[]) {
  const all = new Map(read());
  all.set(region, capped([...ids, ...foundIn(all, region)]));
  write(all);
}

/** Takes progress from a code or a file: added to the player's own (merge), or instead of it in every region (replace). */
export function importFound(data: FoundData, mode: 'merge' | 'replace') {
  const all = new Map(mode === 'merge' ? read() : []);
  for (const [region, ids] of Object.entries(data)) all.set(region, capped([...foundIn(all, region), ...ids]));
  write(all);
}

/**
 * Undoes an import, given the progress before and after it: what it added goes, what it removed (replace) comes back.
 * Spots the player marked or unmarked since the import keep that change.
 */
export function revertImport(before: FoundData, after: FoundData) {
  const all = new Map(read());
  for (const region of new Set([...Object.keys(before), ...Object.keys(after)])) {
    const was = new Set(before[region] ?? []);
    const got = new Set(after[region] ?? []);
    const set = new Set(foundIn(all, region));
    for (const id of got) if (!was.has(id)) set.delete(id);
    for (const id of was) if (!got.has(id)) set.add(id);
    all.set(region, capped(set));
  }
  write(all);
}

/** Everything found, for an export: of a snapshot of useFound, or of the store as it is now. */
export function foundData(found: Found = read()): FoundData {
  const data: FoundData = {};
  for (const [r, set] of found) if (set.size) data[r] = [...set];
  return data;
}

/** The number of found ids and the regions they are in. */
export function foundSize(data: FoundData): { n: number; regions: number } {
  const lists = Object.values(data).filter((l) => l.length);
  return { n: lists.reduce((s, l) => s + l.length, 0), regions: lists.length };
}

/** The found spots of every region; re-renders on every change (also from another tab). */
export function useFound(): Found {
  return useSyncExternalStore(subscribe, read, read);
}

/* ---------- code and file ---------- */

/**
 * The code: a version tag, then base64url. "DF1Z." holds deflate-raw compressed JSON, "DF1J." plain JSON (browsers
 * without CompressionStream make that one; every browser reads it). A later format gets a new tag, so old codes
 * keep working.
 */
const TAG_ZIP = 'DF1Z.';
const TAG_JSON = 'DF1J.';
/** characters of a pasted code, bytes of a file, and bytes a code may unpack to (a tiny code must not inflate into
 *  gigabytes): far above what 9 full regions need (about 60 kB of JSON) */
const MAX_CODE = 500_000;
export const MAX_FILE = 2_000_000;
const MAX_JSON = 2_000_000;
/** the file's own marks, so a builds export or another file is told apart */
const FILE_KIND = 'farm-progress';
const APP = 'aion2-toolkit';

/** Why progress could not be read: damaged or not ours, from a newer version, too large, or a compressed code in a
 *  browser that cannot unpack it. */
export type FoundError = 'invalid' | 'version' | 'size' | 'unzip';
export class FoundReadError extends Error {
  constructor(readonly kind: FoundError) { super(kind); }
}

function toBase64url(bytes: Uint8Array): string {
  let bin = '';
  // in slices: one call with every byte as an argument would overflow the stack
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64url(s: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]+$/.test(s)) throw new FoundReadError('invalid');
  try {
    return Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  } catch {
    throw new FoundReadError('invalid');
  }
}

/** Whether the browser compresses and unpacks deflate-raw (older Safari and Firefox do not). */
function canZip(): boolean {
  try {
    new CompressionStream('deflate-raw');
    new DecompressionStream('deflate-raw');
    return true;
  } catch {
    return false;
  }
}

/** The bytes through a (de)compression stream; stops once the output passes max bytes. */
async function through(bytes: Uint8Array<ArrayBuffer>, stream: CompressionStream | DecompressionStream, max: number): Promise<Uint8Array<ArrayBuffer>> {
  const reader = (new Blob([bytes]).stream().pipeThrough(stream) as ReadableStream<Uint8Array>).getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > max) {
      await reader.cancel().catch(() => {});
      throw new FoundReadError('size');
    }
    parts.push(value);
  }
  const out = new Uint8Array(size);
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}

/** { v: 1, found } of a code or a file, checked; anything else throws. */
function readPayload(json: unknown): FoundData {
  if (!json || typeof json !== 'object' || Array.isArray(json)) throw new FoundReadError('invalid');
  const p = json as Record<string, unknown>;
  if (p.kind !== undefined && p.kind !== FILE_KIND) throw new FoundReadError('invalid');
  if (typeof p.v === 'number' && p.v > 1) throw new FoundReadError('version');
  if (p.v !== 1) throw new FoundReadError('invalid');
  const found = parseFound(p.found, true);
  if (!found) throw new FoundReadError('invalid');
  return found;
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    throw new FoundReadError('invalid');
  }
}

/** The code for this progress: compressed where the browser can, else plain. */
export async function encodeFound(data: FoundData): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify({ v: 1, found: data }));
  if (canZip()) {
    try {
      return TAG_ZIP + toBase64url(await through(bytes, new CompressionStream('deflate-raw'), Infinity));
    } catch { /* fall back to the plain code */ }
  }
  return TAG_JSON + toBase64url(bytes);
}

/** Reads a code (white space, as a line break from a chat app, is ignored); throws a FoundReadError. */
export async function decodeFound(code: string): Promise<FoundData> {
  const s = code.replace(/\s+/g, '');
  if (s.length > MAX_CODE) throw new FoundReadError('size');
  const tag = s.slice(0, TAG_ZIP.length).toUpperCase();
  let bytes: Uint8Array<ArrayBuffer>;
  if (tag === TAG_ZIP) {
    if (!canZip()) throw new FoundReadError('unzip');
    const packed = fromBase64url(s.slice(TAG_ZIP.length));
    try {
      bytes = await through(packed, new DecompressionStream('deflate-raw'), MAX_JSON);
    } catch (e) {
      throw e instanceof FoundReadError ? e : new FoundReadError('invalid');
    }
  } else if (tag === TAG_JSON) {
    bytes = fromBase64url(s.slice(TAG_JSON.length));
    if (bytes.length > MAX_JSON) throw new FoundReadError('size');
  } else {
    // "DF2…" and later: a newer site made it
    throw new FoundReadError(/^DF\d+[A-Z]\./.test(tag) ? 'version' : 'invalid');
  }
  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new FoundReadError('invalid');
  }
  return readPayload(parseJson(text));
}

/** The JSON file of this progress. */
export function foundFile(data: FoundData): Blob {
  const payload = { app: APP, kind: FILE_KIND, v: 1, exportedAt: new Date().toISOString(), found: data };
  return new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
}

/** Reads a file made by foundFile; throws a FoundReadError. */
export async function readFoundFile(file: File): Promise<FoundData> {
  if (file.size > MAX_FILE) throw new FoundReadError('size');
  let text: string;
  try {
    text = await file.text();
  } catch {
    throw new FoundReadError('invalid');
  }
  return readPayload(parseJson(text));
}
