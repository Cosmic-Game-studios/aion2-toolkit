import type { CostEntry, SkillCosts, SkillPoints } from '../data/types';

const sp = (e: CostEntry | undefined) => (e == null ? 0 : Array.isArray(e) ? e[0] : e);
const shards = (e: CostEntry | undefined) => (e == null ? 0 : Array.isArray(e) ? e[1] : 0);

/** Skill points needed to bring a (non-stigma) skill from level 1 to `level`. Entry i = cost of level i+1. */
export function skillPointsTo(costs: SkillCosts, skillId: number, level: number): number {
  const arr = costs[String(skillId)] ?? [];
  let total = 0;
  for (let lv = 2; lv <= level; lv++) total += sp(arr[lv - 1]);
  return total;
}

/** Cost of the single step from `level-1` to `level` in skill points. */
export function skillPointStep(costs: SkillCosts, skillId: number, level: number): number {
  return sp((costs[String(skillId)] ?? [])[level - 1]);
}

/** Highest level that can still be bought with skill points (entries after it are 0). */
export function maxBuyableLevel(costs: SkillCosts, skillId: number, fallback = 10): number {
  const arr = costs[String(skillId)] ?? [];
  let max = 1;
  arr.forEach((e, i) => { if (sp(e) > 0) max = i + 1; });
  return arr.length ? max : fallback;
}

/** Stigma shards needed to bring a stigma from level 0 (unlearned) to `level`. */
export function stigmaShardsTo(costs: SkillCosts, skillId: number, level: number): number {
  const arr = costs[String(skillId)] ?? [];
  let total = 0;
  for (let lv = 1; lv <= level; lv++) total += shards(arr[lv - 1]);
  return total;
}

export function stigmaShardStep(costs: SkillCosts, skillId: number, level: number): number {
  return shards((costs[String(skillId)] ?? [])[level - 1]);
}

/** Highest stigma level with a shard price in the table (currently 20). */
export function maxStigmaLevel(costs: SkillCosts, skillId: number, fallback = 20): number {
  const arr = costs[String(skillId)] ?? [];
  let max = 0;
  arr.forEach((e, i) => { if (shards(e) > 0) max = i + 1; });
  return max || fallback;
}

/** Base skill points and stigma points granted by character level. */
export function pointsAtLevel(points: SkillPoints, level: number): { skill: number; stigma: number } {
  const row = points.level.find((r) => r[0] === level) ?? points.level[points.level.length - 1];
  return { skill: row[1], stigma: row[2] };
}
