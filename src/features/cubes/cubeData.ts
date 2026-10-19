/*
 * Hidden cubes: what one opening gives and how often.
 *
 * The odds are NCSOFT's official probability list for the Korean service (probability.plaync.com, "히든 큐브 확률",
 * Elyos and Asmodian pages, both updated 13 Oct 2026 22:06:17 KST). All 20 cube types there (1–10 Elyos maps,
 * 11–20 Asmodian maps) share the same two tables, one without and one with a key; types 3–5 and 13–15 have only the
 * key table. Numbers are copied as published (six decimals), item names are the Global ones where Global has the
 * item, otherwise translated from the Korean list.
 *
 * NCSOFT publishes no such list for Global (NA/EU). What is known about Global comes from the Global client data as
 * MetaBot reads it (metabot.gg hidden cube page and guide, client build 0.0.4387.0): the map counts, which cubes need
 * a key, the key sources, the 36 reward entries and a few quantities that differ from Korea. Numbers only, no text.
 *
 * How a table works (NCSOFT's explanation, paraphrased):
 * - every group rolls on its own; a group chance over 100% pays once per full 100% and then rolls the rest
 * - a group pays ONE item of its list, picked by the shares (they add up to 100% within the group)
 * - the "single" lines (Silentium, Small Odyle Energy) roll each on their own
 */

export type L = { en: string; de: string };
export type Mode = 'normal' | 'key';

/** one item of a group: share within the group in %, quantity (fixed or a range of equally likely steps) */
export interface Pick {
  name: L;
  /** in % of the group; several quantities of one item are already added up */
  share: number;
  /** smallest and largest quantity */
  lo: number;
  hi: number;
  /** average quantity when this item is picked */
  avg: number;
  /** also in the Global reward list */
  global?: boolean;
}

export interface Roll {
  /** group chance in % (can exceed 100) */
  chance: number;
  picks: Pick[];
}

export type Cat = 'growth' | 'combat' | 'material' | 'look';
export type GlobalHas = 'yes' | 'part' | 'no';

export interface Reward {
  id: string;
  name: L;
  cat: Cat;
  normal?: Roll;
  key?: Roll;
  /** whether Global's reward list has it too */
  global: GlobalHas;
  /** what differs on Global (from the Global client data) */
  globalNote?: L;
  /** short note shown under the name */
  note?: L;
}

export const SOURCE = {
  date: '2026-10-13',
  ncUrl: 'https://probability.plaync.com/aion2/index',
  metabotPage: 'https://metabot.gg/en/aion-2/hidden-cubes',
  metabotGuide: 'https://metabot.gg/en/aion-2/guides/hidden-cubes-guide',
} as const;

const n = (en: string, de = en): L => ({ en, de });
/** an item with several quantity steps: [qty, share][] → one pick */
const steps = (name: L, rows: [number, number][], global = true): Pick => {
  const share = rows.reduce((s, [, p]) => s + p, 0);
  const qs = rows.map(([q]) => q);
  const lo = Math.min(...qs);
  const hi = Math.max(...qs);
  return { name, share, lo, hi, avg: rows.reduce((s, [q, p]) => s + q * p, 0) / share, global };
};
const one = (name: L, share: number, qty = 1, global = true): Pick => ({ name, share, lo: qty, hi: qty, avg: qty, global });

// shares that both tables use
const powerShards = (lo: number, step: number): Pick[] => {
  const q = (i: number) => lo + i * step;
  return [
    steps(n('Power Shard'), [[q(0), 15.767246], [q(1), 13.139372], [q(2), 11.262319], [q(3), 9.854529], [q(4), 8.759581], [q(5), 7.883622]]),
    steps(n('Superior Power Shard'), [[q(0), 7.883622], [q(1), 6.569685], [q(2), 5.631159], [q(3), 4.927264], [q(4), 4.379790], [q(5), 3.941811]]),
  ];
};
const scrolls: Pick[] = [
  one(n('Status Effect Resist Scroll', 'Status Effect Resist Scroll'), 28.662421),
  one(n('Critical Strike Scroll', 'Critical Strike Scroll'), 45.859872, 1, false),
  one(n('Gale Scroll', 'Gale Scroll'), 25.477707, 1, false),
];
const luckyAura: Pick[] = [
  one(n('Lucky Aura: Unique'), 1.176471),
  one(n('Lucky Aura: Epic'), 4.705883),
  one(n('Lucky Aura: Rare'), 18.823529),
  one(n('Lucky Aura'), 75.294117),
];
const candy = (q: number): Pick[] => [one(n('Shugo Transformation Candy'), 50, q), one(n('Festival Shugo Transformation Candy'), 50, q)];
const manastones: Pick[] = [
  steps(n('Lesser Manastone'), [[1, 50.724638], [2, 25.362319]], false),
  steps(n('Intermediate Manastone'), [[1, 10.144928], [2, 5.072464]], false),
  steps(n('Superior Manastone'), [[1, 5.797101], [2, 2.898550]], false),
];
const soulstones: Pick[] = [
  steps(n('Lesser Soulstone'), [[1, 51.282052], [2, 25.641026]], false),
  steps(n('Intermediate Soulstone'), [[1, 10.256410], [2, 5.128205]], false),
  steps(n('Superior Soulstone'), [[1, 5.128205], [2, 2.564102]], false),
];
const pouch: Pick[] = [steps(n('Lucky Gathering Material Pouch', 'Glücks-Sammelmaterial-Beutel'), [[5, 16.666667], [6, 16.666667], [7, 16.666667], [8, 16.666667], [9, 16.666666], [10, 16.666666]], false)];
const wings: Pick[] = [one(n('Radiant Love Wings'), 50), one(n('Golden Pattern Wings', 'Goldmuster-Flügel'), 50, 1, false)];

/** the 34 godstones, as share tiers (count × share): Global has none, so names are left out */
export const GODSTONE_TIERS: [number, number][] = [
  [4, 8.265027], [4, 5.510018], [4, 4.132514], [2, 2.755009], [3, 2.066257],
  [4, 1.653005], [4, 1.100297], [4, 0.826502], [2, 0.551002], [3, 0.413252],
];
const godstones: Pick[] = [{ name: n('Godstone (one of 34)', 'Godstone (einer von 34)'), share: 100, lo: 1, hi: 1, avg: 1, global: false }];

/** the 30 skins: the 14 Global has by name, the 16 Korea-only ones summed per slot */
const skins: Pick[] = [
  one(n('Apple Candy (helm)', 'Apple Candy (Helm)'), 13.715267),
  one(n('Saam Laurel (helm)', 'Saam Laurel (Helm)'), 2.765787),
  one(n('Windmancer Mask (helm)', 'Windmancer Mask (Helm)'), 2.765787),
  one(n('Water Spirit Mask (helm)', 'Water Spirit Mask (Helm)'), 2.765787),
  one(n('Guardian Token (helm)', 'Guardian Token (Helm)'), 2.765786),
  one(n('Saendukal Mask (helm)', 'Saendukal Mask (Helm)'), 2.765786),
  one(n('White Petal Sigh (earrings)', 'White Petal Sigh (Ohrringe)'), 3.525403),
  one(n('Sweet Whisper (earrings)', 'Sweet Whisper (Ohrringe)'), 3.525403),
  one(n('Moonlight Blossom (earrings)', 'Moonlight Blossom (Ohrringe)'), 3.525403),
  one(n('Spring Blossom Whisper (earrings)', 'Spring Blossom Whisper (Ohrringe)'), 3.525403),
  one(n('White Petal Sigh (necklace)', 'White Petal Sigh (Halskette)'), 2.765786),
  one(n('Sweet Whisper (necklace)', 'Sweet Whisper (Halskette)'), 2.765786),
  one(n('Moonlight Blossom (necklace)', 'Moonlight Blossom (Halskette)'), 2.765786),
  one(n('Spring Blossom Whisper (necklace)', 'Spring Blossom Whisper (Halskette)'), 2.765786),
  // Korea only: 8 helms, 4 earrings, 4 necklaces
  { name: n('8 more helms (Korea only)', '8 weitere Helme (nur Korea)'), share: 8 * 2.765786, lo: 1, hi: 1, avg: 1, global: false },
  { name: n('4 more earrings (Korea only)', '4 weitere Ohrringe (nur Korea)'), share: 4 * 3.525403, lo: 1, hi: 1, avg: 1, global: false },
  { name: n('4 more necklaces (Korea only)', '4 weitere Halsketten (nur Korea)'), share: 4 * 2.765786, lo: 1, hi: 1, avg: 1, global: false },
];

/** every reward line of the two tables, most likely first */
export const REWARDS: Reward[] = [
  {
    id: 'silentium', name: n('Silentium'), cat: 'material', global: 'yes',
    normal: { chance: 100, picks: [one(n('Silentium'), 100, 2)] },
    key: { chance: 100, picks: [one(n('Silentium'), 100, 12)] },
    note: n('Rolls on its own, besides the groups', 'Würfelt für sich, neben den Gruppen'),
    globalNote: n('Global: 1 plus a 50% chance of 1 more; with a key 10 plus two 50% chances of 1 more', 'Global: 1 und mit 50 % einer mehr; mit Schlüssel 10 und zweimal mit 50 % einer mehr'),
  },
  {
    id: 'codex', name: n('Soul Codex'), cat: 'growth', global: 'yes',
    normal: { chance: 250, picks: [one(n('Soul Codex'), 100, 1)] },
    key: { chance: 100, picks: [one(n('Soul Codex'), 100, 50)] },
    globalNote: n('Global: 1 without a key, 5 with a key', 'Global: 1 ohne, 5 mit Schlüssel'),
  },
  {
    id: 'crystal', name: n('Soul Crystal'), cat: 'growth', global: 'yes',
    normal: { chance: 150, picks: [one(n('Soul Crystal'), 100, 5)] },
    key: { chance: 120, picks: [one(n('Soul Crystal'), 100, 1000)] },
    note: n('For pets (Pet Genus)', 'Für Pets (Pet Genus)'),
    globalNote: n('Global: 100 without a key, 1,000 with a key', 'Global: 100 ohne, 1.000 mit Schlüssel'),
  },
  {
    id: 'shards', name: n('Power Shards'), cat: 'combat', global: 'yes',
    normal: { chance: 100, picks: powerShards(50, 10) },
    key: { chance: 100, picks: powerShards(100, 20) },
  },
  {
    id: 'potions', name: n('Mana Potion or Life Crystal', 'Mana Potion oder Life Crystal'), cat: 'combat', global: 'yes',
    normal: { chance: 50, picks: [steps(n('Mana Potion'), [[1, 64.285715], [2, 32.142857]]), one(n('Life Crystal'), 3.571428)] },
    key: { chance: 100, picks: [steps(n('Mana Potion'), [[3, 40.178572], [4, 30.133929], [5, 24.107143]]), steps(n('Life Crystal'), [[2, 3.348214], [3, 2.232142]])] },
  },
  {
    id: 'resurrection', name: n('Resurrection Spiritstone'), cat: 'combat', global: 'yes',
    normal: { chance: 20, picks: [one(n('Resurrection Spiritstone'), 100)] },
    key: { chance: 100, picks: [one(n('Resurrection Spiritstone'), 100)] },
  },
  {
    id: 'scrolls', name: n('Battle scroll', 'Kampfrolle'), cat: 'combat', global: 'part',
    normal: { chance: 20, picks: scrolls },
    key: { chance: 100, picks: scrolls },
    globalNote: n('Global: only the Status Effect Resist Scroll', 'Global: nur die Status Effect Resist Scroll'),
  },
  {
    id: 'stigma', name: n('Unstable Stigma Shard'), cat: 'growth', global: 'no',
    key: { chance: 100, picks: [steps(n('Unstable Stigma Shard'), [[10, 16.666667], [12, 16.666667], [14, 16.666667], [16, 16.666667], [18, 16.666666], [20, 16.666666]], false)] },
  },
  {
    id: 'seed', name: n('Seed of Detection'), cat: 'combat', global: 'yes',
    key: { chance: 100, picks: [steps(n('Seed of Detection'), [[2, 60], [3, 40]])] },
    globalNote: n('Global: also only with a key', 'Global: auch nur mit Schlüssel'),
  },
  {
    id: 'pouch', name: n('Lucky Gathering Material Pouch', 'Glücks-Sammelmaterial-Beutel'), cat: 'material', global: 'no',
    normal: { chance: 5, picks: pouch },
    key: { chance: 100, picks: pouch },
  },
  {
    id: 'manastone', name: n('Manastone'), cat: 'growth', global: 'no',
    normal: { chance: 5, picks: manastones },
    key: { chance: 100, picks: manastones },
  },
  {
    id: 'soulstone', name: n('Soulstone'), cat: 'growth', global: 'no',
    normal: { chance: 5, picks: soulstones },
    key: { chance: 100, picks: soulstones },
  },
  {
    id: 'odyle', name: n('Small Odyle Energy'), cat: 'material', global: 'yes',
    normal: { chance: 20, picks: [one(n('Small Odyle Energy'), 100)] },
    key: { chance: 50, picks: [one(n('Small Odyle Energy'), 100)] },
    note: n('+10 Odyle Energy; rolls on its own', '+10 Odyle-Energie; würfelt für sich'),
  },
  {
    id: 'kina', name: n('Lucky Kina Box', 'Glücks-Kina-Kiste'), cat: 'material', global: 'no',
    key: { chance: 50, picks: [one(n('Lucky Kina Box', 'Glücks-Kina-Kiste'), 100, 1, false)] },
  },
  {
    id: 'godstone', name: n('Godstone'), cat: 'combat', global: 'no',
    normal: { chance: 15, picks: godstones },
    key: { chance: 30, picks: godstones },
    note: n('One of 34; the common ones are 20 times likelier than the rarest', 'Einer von 34; die häufigen sind 20-mal wahrscheinlicher als die seltensten'),
  },
  {
    id: 'aura', name: n('Lucky Aura'), cat: 'look', global: 'yes',
    normal: { chance: 10, picks: luckyAura },
    key: { chance: 20, picks: luckyAura },
    note: n('Raises the odds of combining skins', 'Erhöht die Chance beim Kombinieren von Skins'),
  },
  {
    id: 'candy', name: n('Shugo Transformation Candy'), cat: 'look', global: 'yes',
    normal: { chance: 10, picks: candy(1) },
    key: { chance: 20, picks: candy(2) },
  },
  {
    id: 'reset', name: n('Soul Codex: Reset'), cat: 'growth', global: 'yes',
    normal: { chance: 2, picks: [one(n('Soul Codex: Reset'), 100)] },
    key: { chance: 20, picks: [one(n('Soul Codex: Reset'), 100)] },
  },
  {
    id: 'wings', name: n('Wings', 'Flügel'), cat: 'look', global: 'part',
    normal: { chance: 0.5, picks: wings },
    key: { chance: 1, picks: wings },
    globalNote: n('Global: only the Radiant Love Wings (Unique)', 'Global: nur die Radiant Love Wings (Unique)'),
  },
  {
    id: 'skins', name: n('Skin: helm, earrings or necklace', 'Skin: Helm, Ohrringe oder Halskette'), cat: 'look', global: 'part',
    normal: { chance: 0.5, picks: skins },
    key: { chance: 1, picks: skins },
    note: n('One of 30', 'Einer von 30'),
    globalNote: n('Global: 14 of the 30, the ones named here', 'Global: 14 der 30, die hier mit Namen'),
  },
  {
    id: 'emote', name: n('Emote: Kurukuru'), cat: 'look', global: 'yes',
    normal: { chance: 0.05, picks: [one(n('Emote: Kurukuru'), 100)] },
    key: { chance: 0.1, picks: [one(n('Emote: Kurukuru'), 100)] },
  },
];

/** chance in % that one opening pays at least one of the picked items (a group pays one item per full 100%) */
export function chanceOf(roll: Roll | undefined, pick?: (p: Pick) => boolean): number {
  if (!roll) return 0;
  const share = (pick ? roll.picks.filter(pick) : roll.picks).reduce((s, p) => s + p.share, 0) / 100;
  const whole = Math.floor(roll.chance / 100);
  const rest = roll.chance / 100 - whole;
  return (1 - (1 - share) ** whole * (1 - rest * share)) * 100;
}

/** average quantity per opening (all items of the group added up, as if they were the same thing) */
export function avgPerOpening(roll: Roll | undefined): number {
  if (!roll) return 0;
  const perPick = roll.picks.reduce((s, p) => s + (p.share / 100) * p.avg, 0);
  return (roll.chance / 100) * perPick;
}

/** chance in % to get it at least once in `opens` openings */
export const atLeastOnce = (p: number, opens: number) => (1 - (1 - p / 100) ** opens) * 100;
/** openings needed for a `target` % chance */
export const opensFor = (p: number, target: number) => (p >= 100 ? 1 : p <= 0 ? Infinity : Math.ceil(Math.log(1 - target / 100) / Math.log(1 - p / 100)));

/** what the odds calculator offers */
export interface Target { id: string; name: L; reward: string; pick?: (p: Pick) => boolean; global: boolean }
export const TARGETS: Target[] = [
  { id: 'radiant', name: n('Radiant Love Wings'), reward: 'wings', pick: (p) => p.name.en === 'Radiant Love Wings', global: true },
  { id: 'wings', name: n('Any wings', 'Irgendwelche Flügel'), reward: 'wings', global: false },
  { id: 'skin', name: n('Any skin', 'Irgendein Skin'), reward: 'skins', global: true },
  { id: 'apple', name: n('Apple Candy (helm skin)', 'Apple Candy (Helm-Skin)'), reward: 'skins', pick: (p) => p.name.en.startsWith('Apple Candy'), global: true },
  { id: 'emote', name: n('Emote: Kurukuru'), reward: 'emote', global: true },
  { id: 'aura', name: n('Lucky Aura: Unique'), reward: 'aura', pick: (p) => p.name.en === 'Lucky Aura: Unique', global: true },
  { id: 'reset', name: n('Soul Codex: Reset'), reward: 'reset', global: true },
  { id: 'manastone', name: n('Superior Manastone'), reward: 'manastone', pick: (p) => p.name.en === 'Superior Manastone', global: false },
];

/** Global facts from the Global client data (MetaBot) */
export const MAPS: { name: L; faction: L; cubes: number; spots: number; key: 'only' | 'free' }[] = [
  { name: n('Verteron'), faction: n('Elyos'), cubes: 95, spots: 1440, key: 'only' },
  { name: n('Eltnen'), faction: n('Elyos'), cubes: 26, spots: 456, key: 'free' },
  { name: n('Altgard'), faction: n('Asmodians', 'Asmodier'), cubes: 59, spots: 1371, key: 'only' },
  { name: n('Morheim'), faction: n('Asmodians', 'Asmodier'), cubes: 26, spots: 455, key: 'free' },
];

export const KEY_SOURCES: { what: L; keys: L }[] = [
  { what: n('Season Shop (3,000 Oath Coin each, until 16 Dec 2026)', 'Saison-Shop (je 3.000 Oath Coin, bis 16. Dez. 2026)'), keys: n('up to 10 per account', 'bis 10 pro Account') },
  { what: n('Achievement “Who Brought the Chest?”, 7 tiers (3 to 200 cubes opened)', 'Erfolg „Who Brought the Chest?“, 7 Stufen (3 bis 200 Würfel geöffnet)'), keys: n('1 per tier, 7 in all', '1 pro Stufe, 7 insgesamt') },
  { what: n('Hero quest around level 11', 'Heldenquest um Stufe 11'), keys: n('1') },
  { what: n('District quest “Nine Wonders”, 2nd leg', 'Gebietsquest „Nine Wonders“, 2. Etappe'), keys: n('1') },
  { what: n('Duty quests from level 45', 'Duty-Quests ab Stufe 45'), keys: n('sometimes, as a bonus', 'manchmal, als Bonus') },
];

export const ACHIEVEMENT_TIERS = [3, 10, 30, 50, 100, 150, 200];

/*
 * Pets at level 3, the max on Global: what all of them give together. Per-pet values, pet counts, souls and genus
 * experience as in the pets guide (src/features/guides/content/pets.ts: daevaguides and aion2builds, re-checked
 * 2026-10-19), the titles from MetaBot's titles guide. The totals are worked out (value × pets), not measured in game.
 * Soul Crystals from the cubes pay for Analyze in Genus Insight; pet levels come from souls.
 */
export type Genus = 'cogni' | 'fera' | 'natura' | 'varian' | 'special';
export interface PetStat { stat: L; v: number; unit?: '%'; riding?: boolean }
export const PET_GENERA: { id: Genus; name: string; pets: number; perPet: PetStat[] }[] = [
  { id: 'cogni', name: 'Cogni', pets: 41, perPet: [{ stat: n('HP'), v: 30 }, { stat: n('Critical Hit'), v: 2 }, { stat: n('Might'), v: 1 }] },
  { id: 'fera', name: 'Fera', pets: 65, perPet: [{ stat: n('Accuracy'), v: 2 }, { stat: n('Dexterity'), v: 1 }, { stat: n('Mount ground speed', 'Bodentempo beim Reiten'), v: 3, riding: true }] },
  { id: 'natura', name: 'Natura', pets: 48, perPet: [{ stat: n('Critical Hit Resist'), v: 2 }, { stat: n('Precision'), v: 1 }, { stat: n('Stamina'), v: 9, riding: true }] },
  { id: 'varian', name: 'Varian', pets: 46, perPet: [{ stat: n('Evasion'), v: 2 }, { stat: n('Constitution'), v: 1 }, { stat: n('Sprint cost when riding', 'Sprint-Kosten beim Reiten'), v: -0.3, unit: '%', riding: true }] },
  { id: 'special', name: 'Special', pets: 7, perPet: [] },
];
/** souls per pet up to level 3 (5 to unlock, +25, +75) and the genus experience they give (500, +250, +250) */
export const PET_SOULS = [5, 25, 75];
export const PET_GENUS_EXP = [500, 250, 250];
/** one Analyze roll in Genus Insight */
export const ANALYZE = { crystals: 4, kina: 1000 };
export const PET_TITLE = {
  name: 'Rule All Creation', pets: 200,
  equipped: [n('Defense Bonus +320'), n('Boss Damage Tolerance +4%', 'Boss Damage Tolerance +4 %'), n('Back Attack Damage Tolerance +3%', 'Back Attack Damage Tolerance +3 %')],
  owned: n('Move Speed +1%', 'Move Speed +1 %'),
};
