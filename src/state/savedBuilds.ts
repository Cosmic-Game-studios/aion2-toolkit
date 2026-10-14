import { useSyncExternalStore } from 'react';
import { storage } from '../lib/storage';
import { normalizeBuild, type Build } from './build';

/** A build the player saved under a name, kept in this browser only. */
export interface SavedBuild { id: string; name: string; savedAt: number; build: Build }

const KEY = 'saved:v1';
export const MAX_SAVED = 50;

const newId = () => `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

/** Validates saved builds from storage or an imported file (array or { builds: [...] }). */
export function parseSaved(raw: unknown): SavedBuild[] {
  const arr = Array.isArray(raw) ? raw : raw && typeof raw === 'object' ? (raw as { builds?: unknown }).builds : null;
  if (!Array.isArray(arr)) return [];
  const out: SavedBuild[] = [];
  for (const e of arr) {
    if (!e || typeof e !== 'object') continue;
    const r = e as Record<string, unknown>;
    const build = normalizeBuild(r.build);
    if (!build) continue;
    const savedAt = Number(r.savedAt);
    out.push({
      id: typeof r.id === 'string' && /^[\w-]{1,24}$/.test(r.id) ? r.id : newId(),
      name: String(r.name ?? '').trim().slice(0, 60) || build.c,
      savedAt: Number.isFinite(savedAt) && savedAt > 0 ? savedAt : Date.now(),
      build,
    });
  }
  return out.slice(0, MAX_SAVED);
}

// Small external store so the build bar dialog and the home page always show the same list.
let cache: SavedBuild[] | null = null;
const listeners = new Set<() => void>();
const read = () => (cache ??= parseSaved(storage.get<unknown>(KEY, [])));
const emit = () => listeners.forEach((l) => l());
const write = (next: SavedBuild[]) => { cache = next; storage.set(KEY, next); emit(); };
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

if (typeof window !== 'undefined') {
  // another tab changed the list
  window.addEventListener('storage', (e) => { if (e.key == null || e.key.endsWith(KEY)) { cache = null; emit(); } });
}

const copy = (b: Build): Build => JSON.parse(JSON.stringify(b)) as Build;

export const savedBuilds = {
  /** Adds the build at the top of the list. Returns false when the list is full. */
  save(name: string, build: Build): boolean {
    const list = read();
    if (list.length >= MAX_SAVED) return false;
    write([{ id: newId(), name: name.trim().slice(0, 60) || build.c, savedAt: Date.now(), build: copy(build) }, ...list]);
    return true;
  },
  overwrite(id: string, build: Build) {
    write(read().map((e) => (e.id === id ? { ...e, build: copy(build), savedAt: Date.now() } : e)));
  },
  rename(id: string, name: string) {
    const n = name.trim().slice(0, 60);
    if (n) write(read().map((e) => (e.id === id ? { ...e, name: n } : e)));
  },
  remove(id: string) {
    write(read().filter((e) => e.id !== id));
  },
  /** Adds imported builds after the existing ones; ids that already exist get a new one. Returns the number added. */
  importMany(entries: SavedBuild[]): number {
    const list = read();
    const ids = new Set(list.map((e) => e.id));
    const room = Math.max(0, MAX_SAVED - list.length);
    const added = entries.slice(0, room).map((e) => (ids.has(e.id) ? { ...e, id: newId() } : e));
    if (added.length) write([...list, ...added]);
    return added.length;
  },
};

export const useSavedBuilds = () => useSyncExternalStore(subscribe, read, read);
