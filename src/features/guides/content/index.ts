import type { Guide } from '../types';
import { speedrun45 } from './speedrun45';
import { gatheringCrafting } from './gathering-crafting';
import { craftingGear } from './crafting-gear';
import { farmingPower } from './farming-power';
import { macros } from './macros';
import { gladiatorGuide } from './class-gladiator';
import { templarGuide } from './class-templar';
import { assassinGuide } from './class-assassin';
import { rangerGuide } from './class-ranger';
import { sorcererGuide } from './class-sorcerer';
import { spiritmasterGuide } from './class-spiritmaster';
import { clericGuide } from './class-cleric';
import { chanterGuide } from './class-chanter';

/**
 * All guides. The overview groups them by category (basics, classes, levelling & professions)
 * and keeps this order inside a group. Add a new guide as its own file and list it here.
 */
export const GUIDES: Guide[] = [
  macros,
  gladiatorGuide,
  templarGuide,
  assassinGuide,
  rangerGuide,
  sorcererGuide,
  spiritmasterGuide,
  clericGuide,
  chanterGuide,
  gatheringCrafting,
  craftingGear,
  farmingPower,
  speedrun45,
];
