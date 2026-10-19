import type { Guide } from '../types';
import { speedrun45 } from './speedrun45';
import { gatheringCrafting } from './gathering-crafting';
import { craftingGear } from './crafting-gear';
import { farmingPower } from './farming-power';
import { combatPower } from './combat-power';
import { powerSprint } from './power-sprint';
import { multiCharacters } from './multi-characters';
import { manastones } from './manastones';
import { pets } from './pets';
import { macros } from './macros';
import { gladiatorGuide } from './class-gladiator';
import { templarGuide } from './class-templar';
import { assassinGuide } from './class-assassin';
import { rangerGuide } from './class-ranger';
import { sorcererGuide } from './class-sorcerer';
import { spiritmasterGuide } from './class-spiritmaster';
import { clericGuide } from './class-cleric';
import { chanterGuide } from './class-chanter';
import { abyssPvp } from './abyss-pvp';
import { daevanionStigmaArcana } from './daevanion-stigma-arcana';
import { beginner } from './beginner';
import { dungeons } from './dungeons';
import { wings } from './wings';
import { titlesCollections } from './titles-collections';
import { theostonesSoulBinding } from './theostones-soul-binding';

/**
 * All guides. The overview groups them by category (basics, classes, endgame & PvP, world)
 * and keeps this order inside a group. Add a new guide as its own file and list it here.
 */
export const GUIDES: Guide[] = [
  beginner,
  macros,
  daevanionStigmaArcana,
  combatPower,
  powerSprint,
  multiCharacters,
  gladiatorGuide,
  templarGuide,
  assassinGuide,
  rangerGuide,
  sorcererGuide,
  spiritmasterGuide,
  clericGuide,
  chanterGuide,
  dungeons,
  abyssPvp,
  gatheringCrafting,
  craftingGear,
  farmingPower,
  manastones,
  theostonesSoulBinding,
  pets,
  wings,
  titlesCollections,
  speedrun45,
];
