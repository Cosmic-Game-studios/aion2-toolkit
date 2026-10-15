import type { ClassType, GameData, Skill } from '../data/types';

export type ClassRole = 'tank' | 'melee' | 'ranged' | 'magic' | 'summoner' | 'healer' | 'support';

/** Rough role of each class, shown as a hint when picking a class. */
export const CLASS_ROLE: Record<ClassType, ClassRole> = {
  Gladiator: 'melee', Templar: 'tank', Assassin: 'melee', Ranger: 'ranged', Sorcerer: 'magic',
  Elementalist: 'summoner', Cleric: 'healer', Chanter: 'support', Fighter: 'melee',
};

const cache = new WeakMap<GameData, Set<ClassType>>();

/**
 * Classes that are not playable in the global game yet: the global client already ships their skills,
 * but the texts are still placeholders ("???"). Clears itself once a patch adds the texts.
 */
export function unreleasedClasses(data: GameData): Set<ClassType> {
  let set = cache.get(data);
  if (!set) {
    const count = new Map<ClassType, [number, number]>();
    for (const s of data.skills) {
      const c = count.get(s.classType) ?? [0, 0];
      c[0]++;
      if (/^\?+$/.test((s.description ?? '').trim())) c[1]++;
      count.set(s.classType, c);
    }
    set = new Set([...count].filter(([, [all, missing]]) => missing / all > 0.8).map(([cls]) => cls));
    cache.set(data, set);
  }
  return set;
}

/**
 * Defiance (every class has it, shared icon): the game keeps it on the Space bar,
 * so it can not be placed on the hotbar or in the macro.
 */
export const isSpaceSkill = (s: Skill) => s.icon === 'ICON_CO_SKILL_002';
