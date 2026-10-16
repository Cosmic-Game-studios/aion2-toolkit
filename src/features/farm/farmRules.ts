/*
 * The farm map's rules, shared by the page and by scripts/farm-import.mjs (Node runs this file with type stripping,
 * so it uses plain, erasable TypeScript only and imports nothing).
 *
 * Two sources:
 * - spots players saw in the game: the page lets players note spots and send them as a GitHub issue; once the
 *   maintainer adds the label `farm-approved`, the import action checks them with `checkSpot` and adds them to
 *   public/data/farm/spots.json,
 * - hidden cubes, Empyrean traces, Kibelisks, villages, dungeon entrances and strongholds from the AION2 Interactive
 *   Map data (CC BY-NC 4.0), converted by scripts/farm-tcimba.mjs into public/data/farm/tcimba.json, with the area
 *   outlines as the region pictures.
 */

export type Lang = 'en' | 'de';
export type L10n = Record<Lang, string>;

export const FACTIONS = ['elyos', 'asmo', 'abyss'] as const;
export type FactionId = (typeof FACTIONS)[number];

export const FACTION_NAMES: Record<FactionId, L10n> = {
  elyos: { en: 'Elyos', de: 'Elyos' },
  asmo: { en: 'Asmodians', de: 'Asmodier' },
  abyss: { en: 'Abyss', de: 'Abyss' },
};

export interface Region {
  id: string;
  faction: FactionId;
  name: L10n;
  /**
   * A picture of the region's in-game world map, if there is one yet. Spot positions are fractions (0–1) of this
   * picture, so a new picture must show the same part of the map.
   */
  image?: { src: string; w: number; h: number };
  /**
   * Where the region lies on the AION2 Interactive Map: its map and the part of that map's pixel grid the picture shows
   * ([left, top, right, bottom]). The picture is half the box in size. Never change a box once spots are placed: every
   * position is a fraction of it.
   */
  world?: { map: string; box: [number, number, number, number] };
}

/** The regions of the global client, per faction in the order players reach them. */
export const REGIONS: Region[] = [
  { id: 'poeta', faction: 'elyos', name: { en: 'Poeta', de: 'Poeta' } },
  {
    id: 'verteron', faction: 'elyos', name: { en: 'Verteron', de: 'Verteron' },
    image: { src: 'maps/verteron.svg', w: 2816, h: 3040 }, world: { map: 'World_L_A', box: [1024, 768, 6656, 6848] },
  },
  { id: 'eltnen', faction: 'elyos', name: { en: 'Eltnen', de: 'Eltnen' } },
  { id: 'ishalgen', faction: 'asmo', name: { en: 'Ishalgen', de: 'Ishalgen' } },
  {
    id: 'altgard', faction: 'asmo', name: { en: 'Altgard', de: 'Altgard' },
    image: { src: 'maps/altgard.svg', w: 2960, h: 3120 }, world: { map: 'World_D_A', box: [1216, 864, 7136, 7104] },
  },
  { id: 'morheim', faction: 'asmo', name: { en: 'Morheim', de: 'Morheim' } },
  {
    id: 'reshanta-lower', faction: 'abyss', name: { en: 'Lower Reshanta', de: 'Unteres Reshanta' },
    image: { src: 'maps/reshanta-lower.svg', w: 960, h: 832 }, world: { map: 'Abyss_Reshanta_A', box: [1152, 1152, 3072, 2816] },
  },
  { id: 'reshanta-mid', faction: 'abyss', name: { en: 'Middle Reshanta', de: 'Mittleres Reshanta' } },
  { id: 'reshanta-upper', faction: 'abyss', name: { en: 'Upper Reshanta', de: 'Oberes Reshanta' } },
];

export const regionById = (id: string): Region | undefined => REGIONS.find((r) => r.id === id);

export const CATEGORY_GROUPS = ['gather', 'mob', 'collect', 'place'] as const;
export type CategoryGroup = (typeof CATEGORY_GROUPS)[number];

export const GROUP_NAMES: Record<CategoryGroup, L10n> = {
  gather: { en: 'Gathering', de: 'Sammeln' },
  mob: { en: 'Monsters', de: 'Monster' },
  collect: { en: 'Collectibles', de: 'Fundstücke' },
  place: { en: 'Places', de: 'Orte' },
};

export interface Category { id: string; group: CategoryGroup; name: L10n }

export const CATEGORIES: Category[] = [
  { id: 'ore', group: 'gather', name: { en: 'Ore', de: 'Erz' } },
  { id: 'gem', group: 'gather', name: { en: 'Gems', de: 'Edelsteine' } },
  { id: 'plant', group: 'gather', name: { en: 'Plants', de: 'Pflanzen' } },
  { id: 'wood', group: 'gather', name: { en: 'Wood', de: 'Holz' } },
  { id: 'odyle', group: 'gather', name: { en: 'Odyle', de: 'Odyle' } },
  { id: 'mob', group: 'mob', name: { en: 'Monsters', de: 'Monster' } },
  { id: 'elite', group: 'mob', name: { en: 'Elite monsters', de: 'Elite-Monster' } },
  { id: 'boss', group: 'mob', name: { en: 'Heroic monsters & bosses', de: 'Helden-Monster & Bosse' } },
  { id: 'cube', group: 'collect', name: { en: 'Hidden cubes', de: 'Versteckte Würfel' } },
  { id: 'trace', group: 'collect', name: { en: 'Empyrean traces', de: 'Empyreische Spuren' } },
  { id: 'chest', group: 'collect', name: { en: 'Chests', de: 'Truhen' } },
  { id: 'village', group: 'place', name: { en: 'Villages & bases', de: 'Dörfer & Stützpunkte' } },
  // the id stays 'teleport' (player spots and issues store it); the game calls them Kibelisks
  { id: 'teleport', group: 'place', name: { en: 'Kibelisks', de: 'Kibelisken' } },
  { id: 'dungeon', group: 'place', name: { en: 'Dungeon entrances', de: 'Dungeon-Eingänge' } },
  { id: 'stronghold', group: 'place', name: { en: 'Strongholds', de: 'Feindlager & Außenposten' } },
  { id: 'other', group: 'place', name: { en: 'Other', de: 'Sonstiges' } },
];

export const categoryById = (id: string): Category | undefined => CATEGORIES.find((c) => c.id === id);

/** Monsters have a level range and drops; the other categories have neither. */
export const isMobCategory = (id: string) => categoryById(id)?.group === 'mob';

export const LIMITS = {
  name: 60,
  area: 120,
  note: 280,
  by: 32,
  drop: 60,
  drops: 8,
  level: [1, 100] as [number, number],
  /** spots in one GitHub issue (the prefilled issue address must stay short) */
  perIssue: 20,
};

/** What a player sends: one spot as noted on the page. */
export interface SpotInput {
  /** client id: lets the page tell its own spots once they are on the map */
  cid: string;
  region: string;
  cat: string;
  name: string;
  /** position as fractions (0–1) of the region picture */
  pos?: [number, number];
  /** where it is, in words (needed when there is no position) */
  area?: string;
  /** monsters only */
  level?: [number, number];
  /** monsters only */
  drops?: string[];
  note?: string;
  /** nickname, optional */
  by?: string;
}

/** A spot on the map (public/data/farm/spots.json). */
export interface FarmSpot extends SpotInput {
  /** "<issue>-<n>" */
  id: string;
  /** YYYY-MM-DD the spot was approved */
  added: string;
  /** the GitHub issue it came in with (0 for a spot from another source) */
  issue: number;
  /** a spot from the AION2 Interactive Map data (public/data/farm/tcimba.json) instead of a player */
  src?: 'tcimba';
}

export interface SpotsFile { v: 1; spots: FarmSpot[] }

/** Why a spot was refused; the page shows a text per code, the import action lists them in its comment. */
export type SpotError =
  | 'format' | 'cid' | 'region' | 'cat' | 'name' | 'pos' | 'area' | 'where' | 'level' | 'drops' | 'note' | 'by' | 'link'
  | 'mobOnly';

const LINK = /https?:|www\.|\b[a-z0-9-]+\.(?:com|net|org|ru|gg|io|app|de|xyz|ly)\b/i;

/**
 * Characters that show nothing: format characters and default-ignorables (zero-width spaces and joiners, bidi marks,
 * soft hyphen, Hangul fillers, variation selectors, tag characters). Format characters also take the few visible
 * Arabic number signs, which no spot text needs.
 */
const INVISIBLE = /[\p{Cf}\p{Default_Ignorable_Code_Point}]/gu;
/** control characters (tabs, line breaks, escape sequences) */
const CONTROL = /\p{Cc}/gu;
/** a letter or digit in any script */
const MEANINGFUL = /[\p{L}\p{N}]/u;

/** Trim, drop invisible characters, turn control characters into spaces, collapse white space. */
export function cleanText(x: unknown): string {
  if (typeof x !== 'string') return '';
  // removed, not spaced: "Eisen<word joiner>ader" must match "Eisenader", and a name of fillers only must be empty
  return x.replace(INVISIBLE, '').normalize('NFC').replace(CONTROL, ' ').replace(/\s+/g, ' ').trim();
}

const isObj = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);
const fraction = (n: unknown) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1;
const round4 = (n: number) => Math.round(n * 10000) / 10000;

/**
 * Checks one spot a player sent and returns it cleaned, or the reasons it was refused. Unknown fields are dropped.
 */
export function checkSpot(x: unknown): { ok: true; spot: SpotInput } | { ok: false; errors: SpotError[] } {
  if (!isObj(x)) return { ok: false, errors: ['format'] };
  const errors: SpotError[] = [];
  const text = (key: string, max: number, code: SpotError, required = false) => {
    // a value without a letter or digit (only dots, dashes or a blank-looking symbol such as U+2800) says nothing
    const raw = cleanText(x[key]);
    const v = MEANINGFUL.test(raw) ? raw : '';
    if (required && !v) errors.push(code);
    if (v.length > max) errors.push(code);
    if (v && LINK.test(v)) errors.push('link');
    return v || undefined;
  };

  const cid = cleanText(x.cid);
  if (!/^[a-z0-9]{6,24}$/i.test(cid)) errors.push('cid');
  const region = cleanText(x.region);
  if (!regionById(region)) errors.push('region');
  const cat = cleanText(x.cat);
  if (!categoryById(cat)) errors.push('cat');
  const name = text('name', LIMITS.name, 'name', true);
  const area = text('area', LIMITS.area, 'area');
  const note = text('note', LIMITS.note, 'note');
  const by = text('by', LIMITS.by, 'by');

  let pos: [number, number] | undefined;
  if (x.pos !== undefined) {
    if (Array.isArray(x.pos) && x.pos.length === 2 && fraction(x.pos[0]) && fraction(x.pos[1])) pos = [round4(x.pos[0]), round4(x.pos[1])];
    else errors.push('pos');
  }
  if (!pos && !area) errors.push('where');

  const mob = isMobCategory(cat);
  let level: [number, number] | undefined;
  const lv = x.level;
  if (lv !== undefined) {
    const [lo, hi] = LIMITS.level;
    const ok = Array.isArray(lv) && lv.length === 2 && lv.every((n) => Number.isInteger(n) && n >= lo && n <= hi) && lv[0] <= lv[1];
    if (!ok) errors.push('level');
    else if (!mob) errors.push('mobOnly');
    else level = [lv[0], lv[1]];
  }
  let drops: string[] | undefined;
  if (x.drops !== undefined) {
    if (!Array.isArray(x.drops) || x.drops.length > LIMITS.drops) errors.push('drops');
    else {
      const list = [...new Set(x.drops.map(cleanText).filter((d) => MEANINGFUL.test(d)))];
      if (list.some((d) => d.length > LIMITS.drop)) errors.push('drops');
      if (list.some((d) => LINK.test(d))) errors.push('link');
      if (list.length && !mob) errors.push('mobOnly');
      else if (list.length) drops = list;
    }
  }

  if (errors.length) return { ok: false, errors: [...new Set(errors)] };
  const spot: SpotInput = { cid, region, cat, name: name! };
  if (pos) spot.pos = pos;
  if (area) spot.area = area;
  if (level) spot.level = level;
  if (drops) spot.drops = drops;
  if (note) spot.note = note;
  if (by) spot.by = by;
  return { ok: true, spot };
}

/** The JSON a GitHub issue carries: `{ "v": 1, "spots": [...] }`. */
export interface IssuePayload { v: 1; spots: SpotInput[] }

const FENCED = /```(?:json)?\s*\n([\s\S]*?)\n\s*```/;

/**
 * The spots of an issue body: the issue form puts the JSON into a fenced json block; a body that is only JSON works
 * too. Returns null when there is no readable payload.
 */
export function readIssuePayload(body: string): unknown[] | null {
  const block = FENCED.exec(body);
  const raw = (block ? block[1] : body).trim();
  try {
    const json: unknown = JSON.parse(raw);
    if (isObj(json) && json.v === 1 && Array.isArray(json.spots)) return json.spots;
  } catch { /* not JSON */ }
  return null;
}

export const REPO_URL = 'https://github.com/Cosmic-Game-studios/aion2-toolkit';
/** Issue form templates in .github/ISSUE_TEMPLATE; the page prefills their fields through the address. */
export const SPOT_TEMPLATE = 'farm-spot.yml';
export const REPORT_TEMPLATE = 'farm-report.yml';
