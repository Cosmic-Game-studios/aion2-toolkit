import type { ClassType, GameData, Skill } from '../../data/types';
import { loadGameData } from '../../data/loadData';
import { slotKey, type Build, type Macro } from '../../state/build';
import { usableSkills } from '../../lib/buildCalc';
import { recommend, STIGMA_FIRST, type Recommendation } from '../top/topConsensus';
import { topStats } from '../top/topStats';
import { loadTopFile } from '../top/topData';
import { loadGuideLayout } from '../top/guideLayout';

/*
 * "Use the Top 10 hotbar": the keys and macro of the recommended build (topConsensus.ts, the same the Top 10 page
 * shows), fitted to the player's build. Only the bar, auto-use and the macro change; skill levels, stigmas and
 * Daevanion stay as they are. A skill the build cannot use (a stigma it has not equipped, an active above its level)
 * is skipped rather than learned: learning it would change the stigmas or cannot happen at this level.
 */

/** The skills the bar can hold: actives up to the build's level and the equipped stigmas. */
export const barSkills = (data: GameData, build: Build) =>
  usableSkills(data, build).filter((s) => s.isStigma || s.acquireLevel <= build.l);

const recs = new WeakMap<GameData, Map<ClassType, Promise<Recommendation | null>>>();

/**
 * The recommended build of the class from its Top 10 file, or null when the class has no file or no key layout.
 * Rejects when a file fails to load; the next call tries again.
 */
export function loadTopBar(cls: ClassType, data: GameData, macroName: string): Promise<Recommendation | null> {
  const byClass = recs.get(data) ?? new Map<ClassType, Promise<Recommendation | null>>();
  recs.set(data, byClass);
  let p = byClass.get(cls);
  if (!p) {
    p = (async () => {
      const [file, layout, en] = await Promise.all([
        loadTopFile(cls),
        loadGuideLayout(cls),
        // the attack check of the macro reads the English texts; without them the UI language's (as on the Top 10 page)
        data.lang === 'en' ? data : loadGameData('en').catch(() => data),
      ]);
      if (!file?.players.length || !layout) return null;
      const stats = topStats(file.players, data.daevanion.classes[cls]?.boards ?? []);
      const rec = recommend(file.players, stats, data, en, layout, macroName);
      return rec?.hasLayout && rec.keys.length ? rec : null;
    })();
    byClass.set(cls, p);
    p.catch(() => byClass.delete(cls));
  }
  return p;
}

export type SkipReason = 'stigma' | 'level' | 'other';
export interface Skipped { skill: Skill; reason: SkipReason }

export interface TopBarFit {
  bar: Build['bar'];
  auto: number[];
  macros: Macro[];
  /** skills of the Top 10 bar that went on the bar */
  placed: number;
  /** steps of the macro (0 = no macro) */
  steps: number;
  skipped: Skipped[];
  /** the player's own stigmas the Top 10 bar does not hold, put on free keys */
  own: Skill[];
}

/**
 * The Top 10 bar for this build: each key keeps the skills the build can use, in their order (a stack closes up
 * when one is skipped). The build's own equipped stigmas go to keys left free (5–8 first, pressed by hand). The
 * macro keeps the steps whose key still holds a Top 10 skill; it takes over the key the player gave their macro.
 */
export function fitTopBar(rec: Recommendation, data: GameData, build: Build): TopBarFit {
  const usable = new Set(barSkills(data, build).map((s) => s.id));
  const bar: Build['bar'] = {};
  const skipped: Skipped[] = [];
  const cols = new Set<number>();
  let placed = 0;
  for (const k of rec.keys) {
    let row = 0;
    for (const id of k.ids) {
      const s = data.skillById.get(id);
      if (!s) continue;
      if (!usable.has(id)) {
        skipped.push({ skill: s, reason: s.isStigma ? 'stigma' : s.acquireLevel > build.l ? 'level' : 'other' });
        continue;
      }
      bar[slotKey(row++, k.col)] = id;
      cols.add(k.col);
      placed++;
    }
  }

  const top = rec.build.macros[0];
  const steps = top ? top.steps.filter((st) => cols.has(st.k)) : [];
  const mine = build.macros[0];
  const macros = top && steps.length ? [{ ...top, key: mine?.key || top.key, steps }] : [];

  const own: Skill[] = [];
  const onBar = new Set(Object.values(bar));
  for (const slot of build.st) {
    const s = slot.id != null ? data.skillById.get(slot.id) : undefined;
    if (!s || onBar.has(s.id) || !usable.has(s.id)) continue;
    const col = STIGMA_FIRST.find((c) => !cols.has(c));
    if (col == null) break;
    bar[slotKey(0, col)] = s.id;
    cols.add(col);
    onBar.add(s.id);
    own.push(s);
  }

  return { bar, auto: build.auto.filter((id) => onBar.has(id)), macros, placed, steps: steps.length, skipped, own };
}
