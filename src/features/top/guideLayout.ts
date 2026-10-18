import { useEffect, useState } from 'react';
import type { ClassType } from '../../data/types';
import type { Guide } from '../guides/types';
import type { LayoutKey } from './topConsensus';

/*
 * The key layout of a class guide (section "Hotbar & macro"): which key holds which skills and which keys the macro
 * presses. The recommended build puts its skills on these keys, so it follows the same macro rules as the guide.
 * Each guide loads on its own when the Top 10 page needs it.
 */

const GUIDES: Partial<Record<ClassType, () => Promise<Guide>>> = {
  Gladiator: () => import('../guides/content/class-gladiator').then((m) => m.gladiatorGuide),
  Templar: () => import('../guides/content/class-templar').then((m) => m.templarGuide),
  Assassin: () => import('../guides/content/class-assassin').then((m) => m.assassinGuide),
  Ranger: () => import('../guides/content/class-ranger').then((m) => m.rangerGuide),
  Sorcerer: () => import('../guides/content/class-sorcerer').then((m) => m.sorcererGuide),
  Elementalist: () => import('../guides/content/class-spiritmaster').then((m) => m.spiritmasterGuide),
  Cleric: () => import('../guides/content/class-cleric').then((m) => m.clericGuide),
  Chanter: () => import('../guides/content/class-chanter').then((m) => m.chanterGuide),
};

/** The first 'keys' block of the guide, without the notes (they explain the guide's own picks). */
export function layoutOf(guide: Guide): LayoutKey[] | null {
  for (const sec of guide.sections) {
    for (const b of sec.blocks) if (b.type === 'keys') return b.items.map(({ key, ids, macro }) => ({ key, ids, macro }));
  }
  return null;
}

const cache = new Map<ClassType, LayoutKey[] | null>();

/** whether the class has a guide whose layout can be loaded */
export const hasGuideLayout = (cls: ClassType) => !!GUIDES[cls];

/** The class's key layout outside React (null = no guide); shares the cache with the hook. */
export async function loadGuideLayout(cls: ClassType): Promise<LayoutKey[] | null> {
  if (cache.has(cls)) return cache.get(cls)!;
  const load = GUIDES[cls];
  if (!load) return null;
  const layout = layoutOf(await load());
  cache.set(cls, layout);
  return layout;
}

export type LayoutState = { state: 'loading' } | { state: 'done'; layout: LayoutKey[] | null } | { state: 'error'; error: unknown };

/** The class's key layout; `null` when the class has no guide. A guide that fails to load gives `error`. */
export function useGuideLayout(cls: ClassType): LayoutState {
  const [state, setState] = useState<LayoutState>(() => (cache.has(cls) ? { state: 'done', layout: cache.get(cls)! } : { state: 'loading' }));
  useEffect(() => {
    if (cache.has(cls)) { setState({ state: 'done', layout: cache.get(cls)! }); return; }
    if (!GUIDES[cls]) { setState({ state: 'done', layout: null }); return; }
    let alive = true;
    setState({ state: 'loading' });
    loadGuideLayout(cls).then(
      (layout) => { if (alive) setState({ state: 'done', layout }); },
      // a failed chunk (offline, new deploy) is not cached: the next visit tries again
      (error) => { if (alive) setState({ state: 'error', error }); },
    );
    return () => { alive = false; };
  }, [cls]);
  return state;
}
