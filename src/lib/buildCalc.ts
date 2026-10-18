import type { GameData, Skill } from '../data/types';
import type { Build } from '../state/build';
import { maxBuyableLevel, pointsAtLevel, skillPointsTo, stigmaShardsTo } from './skillCosts';
import { STIGMA_SLOT_LEVELS } from './stigmaRules';
import { boardCost, decodeLearned, nodeKey } from './daevanionGraph';
import { applyCdr, cdAt } from './cooldown';
import { skillCap } from './levelCap';

export const classSkills = (data: GameData, build: Build) => data.skills.filter((s) => s.classType === build.c);

/** Level a skill has in this build (normal skills from the skill calculator, stigmas from their slot). */
export function skillLevel(data: GameData, build: Build, skill: Skill): number {
  if (skill.isStigma) return build.st.find((x) => x.id === skill.id)?.lv ?? 1;
  return Math.max(1, Math.min(maxBuyableLevel(data.costs, skill.id), build.lv[skill.id] ?? 1));
}

export const isUnlocked = (build: Build, skill: Skill) => skill.acquireLevel <= build.l;

/** Effective cooldown of a skill in this build (level the game shows + manual reduction). */
export const buildCd = (data: GameData, build: Build, skill: Skill) =>
  applyCdr(cdAt(skill, shownLevel(data, build, skill)), build.cdr);

export function skillPointBudget(data: GameData, build: Build) {
  const base = pointsAtLevel(data.points, build.l).skill;
  const groups = data.points[build.f] ?? [];
  const extra = groups.filter((g, i) => build.x.includes(`${g.kind}-${i}`)).reduce((a, g) => a + g.points, 0);
  return { base, extra, manual: build.e, total: Math.max(0, base + extra + build.e) };
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
  return { base, manual: build.se, total: Math.max(0, base + build.se) };
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

// ---------- skill level bonuses & specialisations ----------

const dvBonusCache = new WeakMap<Build['dv'], { c: Build['c']; map: Map<number, number> }>();

/** Extra skill levels from learned Daevanion skill nodes, by skill id. */
export function daevanionSkillBonus(data: GameData, build: Build): Map<number, number> {
  const hit = dvBonusCache.get(build.dv);
  if (hit && hit.c === build.c) return hit.map;
  const map = new Map<number, number>();
  for (const b of data.daevanion.classes[build.c]?.boards ?? []) {
    const set = decodeLearned(b, build.dv[b.id] ?? '');
    for (const n of b.nodes) {
      if (n.kind !== 'K' || !set.has(nodeKey(n))) continue;
      const id = Number(n.key);
      map.set(id, (map.get(id) ?? 0) + (n.value ?? 0));
    }
  }
  dvBonusCache.set(build.dv, { c: build.c, map });
  return map;
}

/** Skill level including Daevanion and manual gear bonuses (what the game shows), capped at the current in-game max level. */
export function effectiveLevel(data: GameData, build: Build, skill: Skill) {
  const base = skillLevel(data, build, skill);
  if (skill.isStigma) return { base, dv: 0, gear: 0, cap: skillCap(skill), total: base };
  const dv = daevanionSkillBonus(data, build).get(skill.id) ?? 0;
  const gear = build.gx?.[skill.id] ?? 0;
  const cap = skillCap(skill);
  return { base, dv, gear, cap, total: Math.min(cap, base + dv + gear) };
}

/**
 * Level the game shows for a skill of this build: bought + Daevanion + gear and Arcana (stigmas: their stigma level).
 * Texts, cooldowns and tiles use it; skill point costs use the bought level (`skillLevel`).
 */
export const shownLevel = (data: GameData, build: Build, skill: Skill) => effectiveLevel(data, build, skill).total;

/** Number of specialisation slots open at this effective level (normal skills: Lv. 8 / 12 / 20). */
export const specSlotCount = (skill: Skill, level: number) => (skill.specSlots ?? []).filter((l) => level >= l).length;

/**
 * Specialisations that are active in this build.
 * Stigmas unlock theirs automatically by stigma level; normal skills use the chosen parts that fit the open slots.
 */
export function activeSpecs(data: GameData, build: Build, skill: Skill): number[] {
  const parts = skill.parts ?? [];
  if (skill.partsAuto) {
    const lv = skillLevel(data, build, skill);
    return parts.filter((p) => lv >= p.level).map((p) => p.id);
  }
  const lv = effectiveLevel(data, build, skill).total;
  const valid = (build.sp?.[skill.id] ?? []).filter((id) => parts.some((p) => p.id === id && lv >= p.level));
  return valid.slice(0, specSlotCount(skill, lv));
}

/** Whether a skill can be used in this build: learned by level, and for stigmas equipped in an open slot. */
export function skillInBuild(build: Build, skill: Skill): boolean {
  if (!skill.isStigma) return isUnlocked(build, skill);
  const open = unlockedSlots(build);
  return build.st.some((s, i) => s.id === skill.id && open[i]);
}
