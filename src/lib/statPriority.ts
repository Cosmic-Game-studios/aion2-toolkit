import type { ClassType } from '../data/types';

/**
 * The stats each class wants most from the Daevanion boards, best first. Condensed from the class
 * guides (metabot.gg, game8, daevaguides, Inven) and limited to stats the boards carry. Multi-Hit
 * Chance is what guides call Double Chance. The PvP board (Azphel) follows the same order for its
 * PvP stats, so Accuracy only shows up there.
 */
export const CLASS_STATS: Partial<Record<ClassType, string[]>> = {
  Gladiator: ['Multi-Hit Chance', 'Critical Damage Boost', 'Damage Boost', 'Attack', 'Combat Speed', 'Critical Hit', 'Accuracy', 'Cooldown Reduction'],
  Templar: ['Max HP', 'Defense', 'Damage Tolerance', 'Critical Hit Resist', 'Attack', 'Damage Boost', 'Critical Damage Tolerance'],
  Assassin: ['Critical Hit', 'Critical Damage Boost', 'Attack', 'Damage Boost', 'Combat Speed', 'Multi-Hit Chance', 'Cooldown Reduction'],
  Ranger: ['Critical Hit', 'Critical Damage Boost', 'Attack', 'Accuracy', 'Damage Boost', 'Combat Speed', 'Cooldown Reduction'],
  Sorcerer: ['Combat Speed', 'Cooldown Reduction', 'Damage Boost', 'Critical Damage Boost', 'Attack', 'Critical Hit', 'Max MP'],
  Elementalist: ['Attack', 'Damage Boost', 'Combat Speed', 'Cooldown Reduction', 'Critical Hit', 'Critical Damage Boost', 'Max MP'],
  Cleric: ['Combat Speed', 'Cooldown Reduction', 'Attack', 'Critical Hit', 'Damage Boost', 'Accuracy', 'Max MP'],
  Chanter: ['Attack', 'Combat Speed', 'Cooldown Reduction', 'Damage Boost', 'Accuracy', 'Multi-Hit Chance', 'Critical Hit'],
};
