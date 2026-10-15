import type { ClassType } from '../types';
import type { CuratedCombo } from './types';
import { combos as gladiator } from './gladiator';
import { combos as templar } from './templar';
import { combos as assassin } from './assassin';
import { combos as ranger } from './ranger';
import { combos as sorcerer } from './sorcerer';
import { combos as elementalist } from './elementalist';
import { combos as cleric } from './cleric';
import { combos as chanter } from './chanter';

/** Hand-checked combos per class (see ./types.ts; checked by scripts/check-curated.mjs). */
export const CURATED_COMBOS: Partial<Record<ClassType, CuratedCombo[]>> = {
  Gladiator: gladiator,
  Templar: templar,
  Assassin: assassin,
  Ranger: ranger,
  Sorcerer: sorcerer,
  Elementalist: elementalist,
  Cleric: cleric,
  Chanter: chanter,
};

export type { ComboEvidence, ComboKind, ComboSkill, CuratedCombo, Txt } from './types';
