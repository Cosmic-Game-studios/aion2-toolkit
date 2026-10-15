import { useSyncExternalStore } from 'react';
import type { ClassType } from '../data/types';
import { storage } from '../lib/storage';
import { normalizeBuild, type Build } from './build';

/** A build the player saved under a name, kept in this browser only. */
export interface SavedBuild { id: string; name: string; savedAt: number; build: Build }

const KEY = 'saved:v1';
/** per class: the saved build the planner's current build was loaded from (or last saved as) */
const FROM_KEY = 'saved:from:v1';
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

type FromMap = Partial<Record<ClassType, string>>;

// Small external store so the build bar dialog and the home page always show the same list.
let cache: SavedBuild[] | null = null;
let fromCache: FromMap | null = null;
const listeners = new Set<() => void>();
const read = () => (cache ??= parseSaved(storage.get<unknown>(KEY, [])));
const readFrom = (): FromMap => {
  if (!fromCache) {
    const raw = storage.get<unknown>(FROM_KEY, {});
    fromCache = raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as FromMap) : {};
  }
  return fromCache;
};
const emit = () => listeners.forEach((l) => l());
const write = (next: SavedBuild[]) => { cache = next; storage.set(KEY, next); emit(); };
const writeFrom = (next: FromMap) => { fromCache = next; storage.set(FROM_KEY, next); emit(); };
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

if (typeof window !== 'undefined') {
  // another tab changed the list
  window.addEventListener('storage', (e) => {
    if (e.key == null || e.key.endsWith(KEY) || e.key.endsWith(FROM_KEY)) { cache = null; fromCache = null; emit(); }
  });
}

const copy = (b: Build): Build => JSON.parse(JSON.stringify(b)) as Build;

export const savedBuilds = {
  /** Adds the build at the top of the list. Returns false when the list is full. */
  save(name: string, build: Build): boolean {
    return savedBuilds.saveNew(name, build) != null;
  },
  /** Like save(), but returns the new entry's id (null when the list is full). */
  saveNew(name: string, build: Build): string | null {
    const list = read();
    if (list.length >= MAX_SAVED) return null;
    const id = newId();
    write([{ id, name: name.trim().slice(0, 60) || build.c, savedAt: Date.now(), build: copy(build) }, ...list]);
    return id;
  },
  overwrite(id: string, build: Build) {
    write(read().map((e) => (e.id === id ? { ...e, build: copy(build), savedAt: Date.now() } : e)));
  },
  /** Replaces an entry as given (used to undo an overwrite or a rename). */
  put(entry: SavedBuild) {
    write(read().map((e) => (e.id === entry.id ? { ...entry, build: copy(entry.build) } : e)));
  },
  rename(id: string, name: string) {
    const n = name.trim().slice(0, 60);
    if (n) write(read().map((e) => (e.id === id ? { ...e, name: n } : e)));
  },
  /** Removes an entry and returns it with its position, so the removal can be undone with restore(). */
  remove(id: string): { entry: SavedBuild; index: number } | null {
    const list = read();
    const index = list.findIndex((e) => e.id === id);
    if (index < 0) return null;
    const entry = list[index];
    write(list.filter((e) => e.id !== id));
    return { entry, index };
  },
  /** Puts a removed entry back at its old position. Returns false when the list is full or it exists again. */
  restore(entry: SavedBuild, index: number): boolean {
    const list = read();
    if (list.length >= MAX_SAVED || list.some((e) => e.id === entry.id)) return false;
    const next = [...list];
    next.splice(Math.max(0, Math.min(index, next.length)), 0, entry);
    write(next);
    return true;
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
  /** The saved entry the planner's build of this class came from (loaded or last saved), if it still exists. */
  loadedFrom(cls: ClassType): string | null {
    const id = readFrom()[cls];
    return id && read().some((e) => e.id === id) ? id : null;
  },
  /** Remembers (or forgets, with null) which saved entry the build of this class came from. */
  markLoaded(cls: ClassType, id: string | null) {
    const cur = readFrom();
    if ((cur[cls] ?? null) === id) return;
    const next = { ...cur };
    if (id) next[cls] = id;
    else delete next[cls];
    writeFrom(next);
  },
};

export const useSavedBuilds = () => useSyncExternalStore(subscribe, read, read);

/** Id of the saved entry the planner's build of `cls` came from (see savedBuilds.loadedFrom). */
export const useLoadedFrom = (cls: ClassType): string | null =>
  useSyncExternalStore(subscribe, () => savedBuilds.loadedFrom(cls), () => null);
