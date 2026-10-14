import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ClassType } from '../data/types';
import { storage } from '../lib/storage';
import { decodeState, readHash } from '../lib/shareLink';
import { CLASS_TYPES, emptyBuild, normalizeBuild, type Build } from './build';

interface Store { active: ClassType; builds: Partial<Record<ClassType, Build>> }

type Patch = Partial<Build> | ((b: Build) => Build);

interface Ctx {
  build: Build;
  /** the planner's current build of every class touched so far */
  builds: Partial<Record<ClassType, Build>>;
  setBuild: (patch: Patch) => void;
  setClass: (c: ClassType) => void;
  /** Replace the build of its class and make it active (share link, community import). */
  importBuild: (b: Build) => void;
  resetBuild: () => void;
  /** true when the build came from a share link on this page load */
  importedFromLink: boolean;
}

const STORE_KEY = 'build:v1';
const BuildCtx = createContext<Ctx | null>(null);

function loadStore(): { store: Store; imported: boolean } {
  const saved = storage.get<Store | null>(STORE_KEY, null);
  const store: Store = { active: 'Gladiator', builds: {} };
  if (saved && CLASS_TYPES.includes(saved.active)) store.active = saved.active;
  if (saved?.builds) {
    for (const [c, raw] of Object.entries(saved.builds)) {
      const b = normalizeBuild(raw);
      if (b && b.c === c) store.builds[b.c] = b;
    }
  }
  const shared = normalizeBuild(decodeState(readHash().params.get('b')));
  if (shared) {
    store.active = shared.c;
    store.builds[shared.c] = shared;
  }
  return { store, imported: !!shared };
}

export function BuildProvider({ children }: { children: ReactNode }) {
  const [{ store: initialStore, imported }] = useState(loadStore);
  const [store, setStore] = useState<Store>(initialStore);

  useEffect(() => { storage.set(STORE_KEY, store); }, [store]);

  // drop the ?b= share parameter once imported, so later edits are not overwritten on reload
  useEffect(() => {
    if (!imported) return;
    const { route } = readHash();
    history.replaceState(null, '', `${location.pathname}${location.search}#${route}`);
  }, [imported]);

  const build = store.builds[store.active] ?? emptyBuild(store.active);

  const setBuild = useCallback((patch: Patch) => {
    setStore((s) => {
      const cur = s.builds[s.active] ?? emptyBuild(s.active);
      const next = typeof patch === 'function' ? patch(cur) : { ...cur, ...patch };
      return { ...s, builds: { ...s.builds, [s.active]: next } };
    });
  }, []);

  const setClass = useCallback((c: ClassType) => {
    setStore((s) => {
      const level = (s.builds[s.active] ?? emptyBuild(s.active)).l;
      return { active: c, builds: { ...s.builds, [c]: s.builds[c] ?? emptyBuild(c, level) } };
    });
  }, []);

  const importBuild = useCallback((b: Build) => {
    setStore((s) => ({ active: b.c, builds: { ...s.builds, [b.c]: b } }));
  }, []);

  const resetBuild = useCallback(() => {
    setStore((s) => {
      const cur = s.builds[s.active] ?? emptyBuild(s.active);
      return { ...s, builds: { ...s.builds, [s.active]: emptyBuild(s.active, cur.l) } };
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ build, builds: store.builds, setBuild, setClass, importBuild, resetBuild, importedFromLink: imported }),
    [build, store.builds, setBuild, setClass, importBuild, resetBuild, imported],
  );
  return <BuildCtx.Provider value={value}>{children}</BuildCtx.Provider>;
}

export function useBuild(): Ctx {
  const ctx = useContext(BuildCtx);
  if (!ctx) throw new Error('useBuild outside BuildProvider');
  return ctx;
}
