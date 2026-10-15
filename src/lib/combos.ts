import type { GameData, Lang } from '../data/types';
import { CURATED_COMBOS, type ComboKind, type ComboSkill, type CuratedCombo } from '../data/combos';
import type { Build } from '../state/build';
import { activeSpecs, skillInBuild } from './buildCalc';

/** In-game names of the status effects and marks the combos mention (EN key -> EN/DE label as the game data spells them). */
const STATUS_NAMES: Record<string, { en: string; de: string }> = {
  'Knock Back': { en: 'Knock Back', de: 'Rückstoß' },
  Knockdown: { en: 'Knockdown', de: 'Niederschlag' },
  Airborne: { en: 'Airborne', de: 'Luftbann' },
  Stun: { en: 'Stun', de: 'Betäubung' },
  Root: { en: 'Root', de: 'Bann' },
  Slow: { en: 'Slow', de: 'Trägheit' },
  Seal: { en: 'Seal', de: 'Siegel' },
  Blind: { en: 'Blind', de: 'Blindheit' },
  Frost: { en: 'Frost', de: 'Einfrieren' },
  Fear: { en: 'Fear', de: 'Furcht' },
  Poison: { en: 'Poison', de: 'Vergiftung' },
  Curse: { en: 'Curse', de: 'Fluch' },
  Bleed: { en: 'Bleed', de: 'Blutung' },
  'Fire Mark': { en: 'Fire Mark', de: 'Feuerzeichen' },
  Embers: { en: 'Embers', de: 'Glut' },
  'Debilitating Mark': { en: 'Debilitating Mark', de: 'Mal der Schwächung' },
  'Crimson Flames': { en: 'Crimson Flames', de: 'Rotglut' },
  Insignia: { en: 'Insignia', de: 'Glyphe' },
  Stagger: { en: 'Stagger', de: 'Benommenheit' },
  Block: { en: 'Block', de: 'Block' },
  Dodge: { en: 'Dodge', de: 'Notausweichen' },
};

export const statusName = (key: string, lang: Lang) => STATUS_NAMES[key]?.[lang] ?? key;

export type { ComboKind };
export const COMBO_KINDS: ComboKind[] = ['enable', 'status', 'stack', 'cooldown', 'proc', 'buff', 'debuff'];
export const COMBO_RATINGS: CuratedCombo['rating'][] = ['core', 'strong', 'situational'];
export const COMBO_CONTENT: CuratedCombo['content'][number][] = ['boss', 'aoe', 'pvp'];

export const classCombos = (_data: GameData, build: Build): CuratedCombo[] => CURATED_COMBOS[build.c] ?? [];

/** Every skill id a combo mentions (setup first). */
export const comboSkillIds = (c: CuratedCombo): number[] => [...new Set([...c.setup, ...c.payoff].map((r) => r.id))];

const inBuild = (data: GameData, build: Build, id: number) => {
  const s = data.skillById.get(id);
  return !!s && skillInBuild(build, s);
};

/** true when the skill is usable in the build and, if the combo needs a specialisation, that one is chosen. */
export function refReady(data: GameData, build: Build, r: ComboSkill): boolean {
  const s = data.skillById.get(r.id);
  if (!s || !skillInBuild(build, s)) return false;
  return !r.part || activeSpecs(data, build, s).includes(r.part);
}

/** A combo is ready when at least one setup and one payoff work in the build as it is now. */
export const comboReady = (data: GameData, build: Build, c: CuratedCombo) =>
  c.setup.some((r) => refReady(data, build, r)) && c.payoff.some((r) => refReady(data, build, r));

/** true when the build has a setup and a payoff skill (specialisations aside) – the "only mine" filter. */
export const comboTouchesBuild = (data: GameData, build: Build, c: CuratedCombo) =>
  c.setup.some((r) => inBuild(data, build, r.id)) && c.payoff.some((r) => inBuild(data, build, r.id));

const RATING_ORDER: Record<CuratedCombo['rating'], number> = { core: 0, strong: 1, situational: 2 };

/** Ready combos first, then core before strong before situational, otherwise in the curated order. */
export function sortCombos(data: GameData, build: Build, list: CuratedCombo[]): CuratedCombo[] {
  return list
    .map((c, i) => ({ c, i, ready: comboReady(data, build, c) ? 0 : 1 }))
    .sort((a, b) => a.ready - b.ready || RATING_ORDER[a.c.rating] - RATING_ORDER[b.c.rating] || a.i - b.i)
    .map((x) => x.c);
}
