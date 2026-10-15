import type { Skill } from '../data/types';

/** Highest character level of the global game right now. Raise it (e.g. to 50) when a patch lifts the cap. */
export const GAME_LEVEL_CAP = 45;

/**
 * Highest skill level the game currently allows (gear and Daevanion bonuses included).
 * The client data already lists levels up to 40 for later patches; raise this when the cap goes up.
 */
export const GAME_SKILL_CAP = 20;

/** Max level of a skill in the game as it is now. */
export const skillCap = (skill: Skill): number => Math.min(skill.maxLevel || GAME_SKILL_CAP, GAME_SKILL_CAP);

/** Levels of a skill that exist in the game right now. */
export const capLevels = (skill: Skill) => skill.levels.slice(0, skillCap(skill));
