import type { ClassType } from '../types';
import type { ClassMechanics } from './types';
import { mechanics as assassin } from './assassin';
import { mechanics as chanter } from './chanter';
import { mechanics as cleric } from './cleric';
import { mechanics as elementalist } from './elementalist';
import { mechanics as gladiator } from './gladiator';
import { mechanics as ranger } from './ranger';
import { mechanics as sorcerer } from './sorcerer';
import { mechanics as templar } from './templar';

/** Skill mechanics per class for the rotation simulator (see ./types.ts); an empty list means "not modelled yet". */
const ALL: Partial<Record<ClassType, ClassMechanics>> = {
  Gladiator: gladiator,
  Templar: templar,
  Assassin: assassin,
  Ranger: ranger,
  Sorcerer: sorcerer,
  Elementalist: elementalist,
  Cleric: cleric,
  Chanter: chanter,
};
export const CLASS_MECHANICS: Partial<Record<ClassType, ClassMechanics>> = Object.fromEntries(Object.entries(ALL).filter(([, m]) => m && m.length));

export type { ClassMechanics, MechCond, MechEffect, SkillMech } from './types';
