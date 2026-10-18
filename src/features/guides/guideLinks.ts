import type { ClassType } from '../../data/types';

/**
 * Links into the guides without loading the guide texts (they load on demand with the guides page).
 * Use them in page headers (PageHeader `help` slot) and next to planner tools.
 * Keep CLASS_GUIDE in step with the `id` / `cls` of content/class-*.ts.
 */
const CLASS_GUIDE: Partial<Record<ClassType, string>> = {
  Gladiator: 'gladiator',
  Templar: 'templar',
  Assassin: 'assassin',
  Ranger: 'ranger',
  Sorcerer: 'sorcerer',
  Elementalist: 'spiritmaster',
  Cleric: 'cleric',
  Chanter: 'chanter',
};

/** Id of the class guide, or null when there is none yet. */
export const classGuideId = (cls: ClassType): string | null => CLASS_GUIDE[cls] ?? null;

/**
 * "#/guides/<id>" – optionally straight to a section (its index in the guide, e.g. 5 = hotbar & macro of a class guide).
 */
export const guideHref = (id: string, section?: number): string => `#/guides/${id}${section != null ? `?s=${section}` : ''}`;

/** "#/guides/<class guide>" or null. */
export const classGuideHref = (cls: ClassType, section?: number): string | null => {
  const id = classGuideId(cls);
  return id ? guideHref(id, section) : null;
};

/** Sections of every class guide (content/classGuide.ts builds them in this order). */
export const CLASS_GUIDE_SECTION = { glance: 0, group: 1, skills: 2, rotation: 3, build: 4, hotbar: 5, mistakes: 6, power: 7, community: 8, sources: 9 } as const;

/** The general guides that planner pages may point to. */
export const GUIDE_IDS = { macros: 'macros', speedrun: 'speedrun-45', crafting: 'gathering-crafting', craftingGear: 'crafting-gear', combatPower: 'combat-power' } as const;
