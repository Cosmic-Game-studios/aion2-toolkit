import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ClassType } from '../data/types';
import { storage } from '../lib/storage';
import { decodeState, readHash } from '../lib/shareLink';
import { CLASS_TYPES, emptyBuild, isEmptyBuild, normalizeBuild, sameBuild, type Build } from './build';
import { savedBuilds } from './savedBuilds';

interface Store {
  active: ClassType;
  builds: Partial<Record<ClassType, Build>>;
  /** the player chose a class or changed something (new visitors start on a default class) */
  picked?: boolean;
}

type Patch = Partial<Build> | ((b: Build) => Build);

/** A share link opened on this page load. */
export interface LinkImport {
  build: Build;
  /** the recipient's own build of that class, replaced by the link (null when it was empty or identical) */
  backup: Build | null;
  /** the saved entry that replaced build came from (see savedBuilds.loadedFrom), so restoring it can link it again */
  backupFrom: string | null;
  /** the link holds exactly the build the recipient already had */
  same: boolean;
}

interface Ctx {
  build: Build;
  /** the planner's current build of every class touched so far */
  builds: Partial<Record<ClassType, Build>>;
  setBuild: (patch: Patch) => void;
  setClass: (c: ClassType) => void;
  /** Replace the build of its class and make it active (share link, saved build, community import).
   *  `from` is the saved entry it comes from (default: none), e.g. when an Undo brings back a loaded build. */
  importBuild: (b: Build, from?: string | null) => void;
  resetBuild: () => void;
  /** false until the player chose a class or changed anything – new visitors see the default class */
  picked: boolean;
  /** set while the banner about an opened share link is shown */
  linkImport: LinkImport | null;
  dismissLinkImport: () => void;
}

const STORE_KEY = 'build:v1';
const BuildCtx = createContext<Ctx | null>(null);

/** Reads the saved planner and an optional share link. Pure: React may call it twice. */
function loadStore(): { store: Store; link: LinkImport | null } {
  const saved = storage.get<Store | null>(STORE_KEY, null);
  const store: Store = { active: 'Gladiator', builds: {} };
  if (saved && CLASS_TYPES.includes(saved.active)) store.active = saved.active;
  if (saved?.builds) {
    for (const [c, raw] of Object.entries(saved.builds)) {
      const b = normalizeBuild(raw);
      if (b && b.c === c) store.builds[b.c] = b;
    }
  }
  store.picked = saved?.picked ?? Object.keys(store.builds).length > 0;
  const shared = normalizeBuild(decodeState(readHash().params.get('b')));
  if (!shared) return { store, link: null };
  const cur = store.builds[shared.c];
  const backup = cur && !isEmptyBuild(cur) && !sameBuild(cur, shared) ? cur : null;
  store.active = shared.c;
  store.builds[shared.c] = shared;
  store.picked = true;
  const same = !!cur && sameBuild(cur, shared);
  return { store, link: { build: shared, backup, backupFrom: backup ? savedBuilds.loadedFrom(shared.c) : null, same } };
}

export function BuildProvider({ children }: { children: ReactNode }) {
  const [{ store: initialStore, link }] = useState(loadStore);
  const [store, setStore] = useState<Store>(initialStore);
  const [linkImport, setLinkImport] = useState<LinkImport | null>(link);

  useEffect(() => { storage.set(STORE_KEY, store); }, [store]);

  // drop the ?b= share parameter once imported, so later edits are not overwritten on reload;
  // the shared build does not come from a saved build (My builds must not offer to update one with it)
  useEffect(() => {
    if (!link) return;
    savedBuilds.markLoaded(link.build.c, null);
    const { route } = readHash();
    history.replaceState(null, '', `${location.pathname}${location.search}#${route}`);
  }, [link]);

  const build = store.builds[store.active] ?? emptyBuild(store.active);

  const setBuild = useCallback((patch: Patch) => {
    setStore((s) => {
      const cur = s.builds[s.active] ?? emptyBuild(s.active);
      const next = typeof patch === 'function' ? patch(cur) : { ...cur, ...patch };
      // a level change alone does not count as choosing the default class (setClass keeps the level)
      const levelOnly = (Object.keys(next) as (keyof Build)[]).every((k) => k === 'l' || next[k] === cur[k]);
      return { ...s, picked: s.picked || !levelOnly, builds: { ...s.builds, [s.active]: next } };
    });
  }, []);

  const setClass = useCallback((c: ClassType) => {
    setStore((s) => {
      const level = (s.builds[s.active] ?? emptyBuild(s.active)).l;
      return { active: c, picked: true, builds: { ...s.builds, [c]: s.builds[c] ?? emptyBuild(c, level) } };
    });
  }, []);

  // an imported or reset build no longer comes from a saved build: forget the link (loading a saved build sets it again)
  const importBuild = useCallback((b: Build, from: string | null = null) => {
    savedBuilds.markLoaded(b.c, from);
    setStore((s) => ({ active: b.c, picked: true, builds: { ...s.builds, [b.c]: b } }));
  }, []);

  const resetBuild = useCallback(() => {
    savedBuilds.markLoaded(store.active, null);
    setStore((s) => {
      const cur = s.builds[s.active] ?? emptyBuild(s.active);
      return { ...s, builds: { ...s.builds, [s.active]: emptyBuild(s.active, cur.l) } };
    });
  }, [store.active]);

  const dismissLinkImport = useCallback(() => setLinkImport(null), []);

  const value = useMemo<Ctx>(
    () => ({
      build, builds: store.builds, setBuild, setClass, importBuild, resetBuild,
      picked: !!store.picked, linkImport, dismissLinkImport,
    }),
    [build, store.builds, store.picked, setBuild, setClass, importBuild, resetBuild, linkImport, dismissLinkImport],
  );
  return <BuildCtx.Provider value={value}>{children}</BuildCtx.Provider>;
}

export function useBuild(): Ctx {
  const ctx = useContext(BuildCtx);
  if (!ctx) throw new Error('useBuild outside BuildProvider');
  return ctx;
}
