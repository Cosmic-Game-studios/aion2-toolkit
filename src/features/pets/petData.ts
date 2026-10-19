/*
 * Pets on Global (level 3 is the max there, Korea 5): what the collection gives.
 *
 * Per-pet values, pet counts, souls, genus experience, the Analyze cost and the collection rewards as in the pets guide
 * (src/features/guides/content/pets.ts: daevaguides and aion2builds, re-checked 2026-10-19); the titles from metabot.gg
 * (as of 2026-10-15). Numbers only, the texts are our own. Totals on the page are worked out (value × pets), not
 * measured in game. Which of the three Owned Effects a pet opens at level 1 and 2 no source says, so the page only
 * counts pets at level 3.
 */

export type L = { en: string; de: string };
const n = (en: string, de = en): L => ({ en, de });

export type Genus = 'cogni' | 'fera' | 'natura' | 'varian' | 'special';
/** one Owned Effect of a pet at level 3; riding ones only work while you ride */
export interface PetStat { stat: L; v: number; unit?: '%'; riding?: boolean }

export const PET_GENERA: { id: Genus; name: string; pets: number; perPet: PetStat[] }[] = [
  { id: 'cogni', name: 'Cogni', pets: 41, perPet: [{ stat: n('HP'), v: 30 }, { stat: n('Critical Hit'), v: 2 }, { stat: n('Might'), v: 1 }] },
  { id: 'fera', name: 'Fera', pets: 65, perPet: [{ stat: n('Accuracy'), v: 2 }, { stat: n('Dexterity'), v: 1 }, { stat: n('Mount ground speed', 'Bodentempo beim Reiten'), v: 3, riding: true }] },
  { id: 'natura', name: 'Natura', pets: 48, perPet: [{ stat: n('Critical Hit Resist'), v: 2 }, { stat: n('Precision'), v: 1 }, { stat: n('Stamina'), v: 9, riding: true }] },
  { id: 'varian', name: 'Varian', pets: 46, perPet: [{ stat: n('Evasion'), v: 2 }, { stat: n('Constitution'), v: 1 }, { stat: n('Sprint cost when riding', 'Sprint-Kosten beim Reiten'), v: -0.3, unit: '%', riding: true }] },
  { id: 'special', name: 'Special', pets: 7, perPet: [] },
];

/** the three levels: souls for the step, genus experience it gives, what it opens */
export const PET_LEVELS: { level: number; souls: number; exp: number; gives: L }[] = [
  { level: 1, souls: 5, exp: 500, gives: n('Unlocked and rideable, first Owned Effect', 'Freigeschaltet und reitbar, erster Owned Effect') },
  { level: 2, souls: 25, exp: 250, gives: n('Gliding on the pet, second Owned Effect', 'Gleiten mit dem Haustier, zweiter Owned Effect') },
  { level: 3, souls: 75, exp: 250, gives: n('All Owned Effects, transformation with Empathy Candy (5 minutes), its monster drops crystals', 'Alle Owned Effects, Verwandlung mit Empathy Candy (5 Minuten), sein Monster lässt Kristalle fallen') },
];

/** one Analyze roll in Genus Insight: crystals of the genus (or rainbow), Kina, genus experience per open line */
export const ANALYZE = { crystals: 4, kina: 1000, expPerLine: 100 };

/** collection rewards with all 207 pets: mostly 100 Soul Crystals, every 50th 10 Empathy Candy instead */
export const COLLECTION = { crystals: 1700, candy: 40 };

export const PET_TITLES: { name: string; need: L; equipped: L[]; owned: L }[] = [
  {
    name: 'Unbound by Genus',
    need: n('All 5 genera at level 10', 'Alle 5 Gattungen auf Stufe 10'),
    equipped: [n('PvE Damage Boost +4.5%', 'PvE Damage Boost +4,5 %'), n('Attack Bonus +34'), n('Critical Hit +68')],
    owned: n('PvE Damage Boost +1%', 'PvE Damage Boost +1 %'),
  },
  {
    name: 'Rule All Creation',
    need: n('200 pets, any level', '200 Haustiere, egal welche Stufe'),
    equipped: [n('Defense Bonus +320'), n('Boss Damage Tolerance +4%', 'Boss Damage Tolerance +4 %'), n('Back Attack Damage Tolerance +3%', 'Back Attack Damage Tolerance +3 %')],
    owned: n('Move Speed +1%', 'Move Speed +1 %'),
  },
];

export const SOURCES = [
  { href: 'https://daevaguides.com/en/guides/pets-genus-insight/', label: 'daevaguides – Pets & Genus Insight' },
  { href: 'https://aion2builds.org/guides/pets/', label: 'aion2builds – Pets & Genus Insight' },
  { href: 'https://metabot.gg/en/aion-2/guides/mounts-wings-guide', label: 'metabot.gg – Mounts, pets & wings guide' },
];
