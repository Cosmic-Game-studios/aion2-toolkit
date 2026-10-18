import { useCallback, useEffect, useState } from 'react';
import type { ClassType } from '../../data/types';
import type { TopFile, TopIndex } from './types';

/** A file of public/data/top: still loading, there, not there (no data yet) or failed (try again). */
export type Loaded<T> =
  | { state: 'loading' }
  | { state: 'ok'; value: T }
  | { state: 'missing' }
  | { state: 'error'; error: string };

const base = () => import.meta.env.BASE_URL.replace(/\/?$/, '/');
const pending = new Map<string, Promise<unknown>>();
/** loaded files by name (null = no such file), read during render so a class seen before shows without a loading frame */
const done = new Map<string, unknown>();

/** null = the file does not exist. GitHub Pages answers 404, the dev server answers with the app page (HTML). */
function getJson<T>(name: string, valid: (x: unknown) => x is T): Promise<T | null> {
  let p = pending.get(name) as Promise<T | null> | undefined;
  if (!p) {
    p = (async () => {
      const res = await fetch(`${base()}data/top/${name}.json`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`${name}.json: HTTP ${res.status}`);
      if (!(res.headers.get('content-type') ?? '').includes('json')) return null;
      const json: unknown = await res.json();
      if (!valid(json)) throw new Error(`${name}.json: unexpected format`);
      return json;
    })();
    pending.set(name, p);
    // a failed load is fetched again on the next try
    p.then((v) => done.set(name, v), () => pending.delete(name));
  }
  return p;
}

const isObj = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);
const isIndex = (x: unknown): x is TopIndex => isObj(x) && x.v === 1 && Array.isArray(x.classes);
const isFile = (x: unknown): x is TopFile => isObj(x) && x.v === 1 && Array.isArray(x.players) && isObj(x.source);

function useJson<T>(name: string | null, valid: (x: unknown) => x is T): [Loaded<T>, () => void] {
  // only errors live in state; files that loaded come from `done`
  const [failed, setFailed] = useState<{ name: string; attempt: number; error: string } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!name || done.has(name)) return;
    let alive = true;
    getJson(name, valid).then(
      () => { if (alive) setTick((n) => n + 1); },
      (e: unknown) => { if (alive) setFailed({ name, attempt, error: e instanceof Error ? e.message : String(e) }); },
    );
    return () => { alive = false; };
  }, [name, valid, attempt]);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  let state: Loaded<T>;
  if (!name) state = { state: 'missing' };
  else if (done.has(name)) {
    const v = done.get(name) as T | null;
    state = v ? { state: 'ok', value: v } : { state: 'missing' };
  } else if (failed && failed.name === name && failed.attempt === attempt) state = { state: 'error', error: failed.error };
  else state = { state: 'loading' };
  return [state, retry];
}

/** Which classes have a file (public/data/top/index.json). */
export const useTopIndex = () => useJson('index', isIndex);

/** One class file; `null` skips the request (the index says there is none). */
export const useTopFile = (cls: ClassType | null) => useJson(cls, isFile);

/** One class file outside React (null = none); it shows at once when the Top 10 page opens later. */
export const loadTopFile = (cls: ClassType) => getJson(cls, isFile);
