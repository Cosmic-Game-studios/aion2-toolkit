import type { Skill } from '../data/types';

/** Highest character level of the global game right now. Raise it (e.g. to 50) when a patch lifts the cap. */
export const GAME_LEVEL_CAP = 45;

/**
 * Highest skill level the game allows (gear and Daevanion bonuses included): the 40 levels the client data lists
 * for every active and passive skill. Only the bought part stops at 10; Daevanion skill nodes add up to 4, gear and
 * Arcana the rest (+1 per item line, up to +4 per Arcana card). Official data of top global players (AION2 Index,
 * October 2026) shows actives up to 23 and passives up to 31 (10 + 4 Daevanion + 17 gear and Arcana).
 * Stigmas keep their own maxLevel (20).
 */
export const GAME_SKILL_CAP = 40;

/** Max level of a skill in the game as it is now. */
export const skillCap = (skill: Skill): number => Math.min(skill.maxLevel || GAME_SKILL_CAP, GAME_SKILL_CAP);

/** Levels of a skill that exist in the game right now. */
export const capLevels = (skill: Skill) => skill.levels.slice(0, skillCap(skill));
