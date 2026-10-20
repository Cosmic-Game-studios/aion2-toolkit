/*
 * Crit chance on Global: a community estimate, worked out, not measured.
 *
 * NCSOFT publishes no formula. MMO Herald's damage guide (Global client, updated 2026-10-08; the model is by kanonxo
 * and Aion Research Lab, tested mostly on Korean endgame characters) says Critical Hit against the target's Critical
 * Hit Resist follows the same curve as Accuracy against Block: point for point, about 6–7 % per 100 points of gap,
 * 80 % at a gap of 1,200. Global stops crit at 50 % (the Global client's own tooltip, as MetaBot's stats page reads
 * it), Korea at 80 %. So the chance is gap × 80 / 1,200, at most 50 %, reached at a gap of 750.
 * No source names a base chance at a gap of 0 or any effect of the level; 0 % at a gap of 0 is what the two numbers
 * give. Numbers only, the texts are our own (as of 2026-10-20).
 */

import type { ClassType } from '../../data/types';

export type L = { en: string; de: string };

/** the curve: this chance at this gap (Critical Hit minus the target's Critical Hit Resist) */
export const CURVE = { pct: 80, gap: 1200 };
/** % crit chance per point of gap (6.67 per 100) */
export const SLOPE = CURVE.pct / CURVE.gap;
export const CAP = { global: 50, korea: 80 };
export type Region = keyof typeof CAP;

export const MAX_STAT = 9999;

/** crit chance in % for a Critical Hit value against a target's Critical Hit Resist */
export function critChance(crit: number, resist: number, region: Region = 'global') {
  return Math.min(CAP[region], Math.max(0, (crit - resist) * SLOPE));
}

/** the gap at which the chance stops rising: 750 on Global, 1,200 in Korea */
export const capGap = (region: Region = 'global') => Math.round(CAP[region] / SLOPE);

/** MMO Herald's guess for the Ludra raid on Global, not confirmed yet */
export const LUDRA_GLOBAL = { lo: 1200, hi: 1400 };

/** a buff that raises Critical Hit for a few seconds (this site's skill data; the names come from the game data) */
export const CRIT_BUFF: { id: number; cls: ClassType; plus: number; sec: number } = { id: 14090000, cls: 'Ranger', plus: 300, sec: 10 };

/** a skill that always crits from this skill level on, so crit chance adds nothing to it */
export const ALWAYS_CRITS: { id: number; cls: ClassType; from: number } = { id: 11170000, cls: 'Gladiator', from: 12 };

export const SOURCES = {
  damage: 'https://www.mmoherald.com/aion-2/guides/damage-calculation',
  weights: 'https://www.mmoherald.com/aion-2/guides/stat-weights',
  metabot: 'https://metabot.gg/en/aion-2/stats',
  date: '2026-10-20',
};
