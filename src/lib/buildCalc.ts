import type { GameData, Skill } from '../data/types';
import type { Build } from '../state/build';
import { maxBuyableLevel, pointsAtLevel, skillPointsTo, stigmaShardsTo } from './skillCosts';
import { STIGMA_SLOT_LEVELS } from './stigmaRules';
import { boardCost, decodeLearned } from './daevanionGraph';
import { applyCdr, cdAt } from './cooldown';

export const classSkills = (data: GameData, build: Build) => data.skills.filter((s) => s.classType === build.c);

/** Level a skill has in this build (normal skills from the skill calculator, stigmas from their slot). */
export function skillLevel(data: GameData, build: Build, skill: Skill): number {
  if (skill.isStigma) return build.st.find((x) => x.id === skill.id)?.lv ?? 1;
  return Math.max(1, Math.min(maxBuyableLevel(data.costs, skill.id), build.lv[skill.id] ?? 1));
}

export const isUnlocked = (build: Build, skill: Skill) => skill.acquireLevel <= build.l;

/** Effective cooldown of a skill in this build (level + manual reduction). */
export const buildCd = (data: GameData, build: Build, skill: Skill) =>
  applyCdr(cdAt(skill, skillLevel(data, build, skill)), build.cdr);

export function skillPointBudget(data: GameData, build: Build) {
  const base = pointsAtLevel(data.points, build.l).skill;
  const groups = data.points[build.f] ?? [];
  const extra = groups.filter((g, i) => build.x.includes(`${g.kind}-${i}`)).reduce((a, g) => a + g.points, 0);
  return { base, extra, manual: build.e, total: base + extra + build.e };
}

export function skillPointsSpent(data: GameData, build: Build) {
  let total = 0;
  for (const s of classSkills(data, build)) {
    if (s.isStigma || !isUnlocked(build, s)) continue;
    total += skillPointsTo(data.costs, s.id, skillLevel(data, build, s));
  }
  return total;
}

export const unlockedSlots = (build: Build) => STIGMA_SLOT_LEVELS.map((l) => build.l >= l);

export function shardBudget(data: GameData, build: Build) {
  const base = pointsAtLevel(data.points, build.l).stigma;
  return { base, manual: build.se, total: base + build.se };
}

export function shardsSpent(data: GameData, build: Build) {
  const open = unlockedSlots(build);
  return build.st.reduce((sum, s, i) => (s.id != null && open[i] ? sum + stigmaShardsTo(data.costs, s.id, s.lv) : sum), 0);
}

export function daevanionTotals(data: GameData, build: Build) {
  const boards = data.daevanion.classes[build.c]?.boards ?? [];
  const byType: Record<string, { spent: number; max: number }> = {};
  for (const b of boards) {
    const set = decodeLearned(b, build.dv[b.id] ?? '');
    const t = (byType[b.pointType] ??= { spent: 0, max: 0 });
    t.spent += boardCost(b, set);
    t.max += b.nodes.reduce((a, n) => a + n.cost, 0);
  }
  return byType;
}

/** Skills that can be placed on the hotbar: unlocked actives + equipped stigmas. */
export function usableSkills(data: GameData, build: Build): Skill[] {
  const equipped = new Set(build.st.map((s) => s.id).filter(Boolean));
  return classSkills(data, build).filter((s) =>
    s.isStigma ? equipped.has(s.id) : s.type === 'active',
  );
}
