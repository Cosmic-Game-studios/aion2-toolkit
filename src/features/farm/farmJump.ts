import { CATEGORIES, REGIONS, regionById, type Lang, type SpotInput } from './farmRules';
import type { MapArea } from './farmData';

/*
 * The farm map's jump search: an index per language over the area names of every region, the spots' names and drops
 * (both sources and the player's drafts) and the categories. The filters' search box still filters the list as
 * before; this index gives it the places to jump to, grouped by region. A plain folded substring search: a few
 * thousand entries take well under a millisecond per key stroke, so no search library.
 */

// combining accents after NFD; built from char codes because escapes in a regex literal are easy to mangle
const MARKS = new RegExp(`[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`, 'g');
// apostrophes: ' ’ ʼ ` and ´; the map data writes possessives without one ("Konutins Cave"), players often with one
const APOSTROPHES = new RegExp(`[${["'", '’', 'ʼ', '`', '´'].join('')}]`, 'g');
/** lower case without accents and apostrophes, so "eisenerz" finds "Eisenérz", "strasse" finds "Straße" and
 *  "konutin's" finds "Konutins Cave" */
export const fold = (s: string) => s.normalize('NFD').replace(MARKS, '').replace(APOSTROPHES, '').toLowerCase().replace(/ß/g, 'ss');

export type JumpKind = 'cat' | 'area' | 'spot';

export interface JumpEntry {
  kind: JumpKind;
  /** the category id, `<region>|<area name>`, or the spot's marker id (its id, or the draft key) */
  id: string;
  /** the region of an area or a spot; a category has none (it applies to the region on screen) */
  region: string | null;
  name: string;
  /** a spot's category (its icon and second line) */
  cat?: string;
  /** a spot's area, so "Hidden cube #1" of one area can be told from that of another */
  area?: string;
  /** a spot of the player's own, not on the map yet */
  draft?: boolean;
  pos?: [number, number];
  /** the folded name, for the ranking */
  key: string;
  /** the folded text the search looks at */
  hay: string;
}

/** A spot as the index takes it: the marker id next to the spot's fields; `draft` for the player's own. */
export type JumpSpot = SpotInput & { id: string; draft?: boolean };

/**
 * The index of one language. Spots are found by name, drops and area: many spots share a name ("Hidden cube #1" in
 * every area), so "kibelisk basfelt" must narrow them down to one, as it does in the list. The ranking looks at the
 * name only, so the area itself and the spots named like the search still come first. Categories are also found by
 * their id ("teleport" finds the Kibelisks).
 */
export function buildJumpIndex(spots: JumpSpot[], areas: Record<string, MapArea[]>, lang: Lang): JumpEntry[] {
  const list: JumpEntry[] = CATEGORIES.map((c) => {
    const key = fold(c.name[lang]);
    return { kind: 'cat', id: c.id, region: null, name: c.name[lang], key, hay: `${key} ${c.id}` };
  });
  for (const [region, items] of Object.entries(areas)) {
    if (!regionById(region)) continue;
    for (const a of items) {
      const key = fold(a.name);
      list.push({ kind: 'area', id: `${region}|${a.name}`, region, name: a.name, pos: a.pos, key, hay: key });
    }
  }
  for (const s of spots) {
    if (!regionById(s.region)) continue;
    const key = fold(s.name);
    list.push({
      kind: 'spot', id: s.id, region: s.region, name: s.name, cat: s.cat, area: s.area, pos: s.pos, draft: s.draft,
      key, hay: [key, ...(s.drops ?? []).map(fold), s.area ? fold(s.area) : ''].filter(Boolean).join(' '),
    });
  }
  return list;
}

/** One group of results: the categories, or one region's areas and spots. */
export interface JumpGroup {
  /** 'cat', or the region id */
  key: string;
  hits: JumpEntry[];
  /** all matches of the group; more than the hits when the group is cut */
  total: number;
}

/** The matches of a search; `best` is the place Enter takes without an option chosen (see searchJump). */
export interface JumpResult {
  groups: JumpGroup[];
  best: JumpEntry | null;
}

/** below this many letters a search matches too much to be worth a list */
const MIN_CHARS = 2;
/** the most results a group shows: the region on screen gets more room than the others */
const CAP = { cat: 4, here: 8, other: 5 };
const KIND_ORDER: Record<JumpKind, number> = { cat: 0, area: 1, spot: 2 };

const collators = new Map<Lang, Intl.Collator>();
const collator = (lang: Lang) => {
  let c = collators.get(lang);
  if (!c) {
    // numeric: "Empyrean trace 2" before "Empyrean trace 10"
    c = new Intl.Collator(lang, { numeric: true });
    collators.set(lang, c);
  }
  return c;
};

const NONE: JumpResult = { groups: [], best: null };

/**
 * The matches of a search, grouped: the categories first, then the region on screen, then the others in the order of
 * the region chips. Every word of the search must appear (in any order); a name that is the search, then one that
 * starts with its first word, then one with a word that does, then one that holds every word come first; a match by
 * drops or area alone comes last.
 *
 * `best`, for Enter without an option chosen: the one area or spot the search clearly means, i.e. the only one whose
 * name is the search, else the only one whose name starts with it, else the only match at all. Never a category: that
 * pick switches the other categories off and drops the typed text, so it takes a deliberate choice. Many spots share
 * a name ("Kibelisk #1"), so a search that fits several of them alike has no best.
 */
export function searchJump(index: readonly JumpEntry[], q: string, here: string, lang: Lang): JumpResult {
  const terms = fold(q).split(/\s+/).filter(Boolean);
  if (terms.join('').length < MIN_CHARS) return NONE;
  const whole = terms.join(' ');
  const first = terms[0];
  const rank = (e: JumpEntry) => (e.key === whole ? 0 : e.key.startsWith(first) ? 1 : e.key.includes(` ${first}`) ? 2
    : terms.every((w) => e.key.includes(w)) ? 3 : 4);
  const byGroup = new Map<string, { e: JumpEntry; r: number }[]>();
  // the places (no categories) per rank 0 and 1, and all of them, for `best`
  const exact: JumpEntry[] = [];
  const starts: JumpEntry[] = [];
  const places: JumpEntry[] = [];
  for (const e of index) {
    if (!terms.every((w) => e.hay.includes(w))) continue;
    const g = e.region ?? 'cat';
    let arr = byGroup.get(g);
    if (!arr) byGroup.set(g, (arr = []));
    const r = rank(e);
    arr.push({ e, r });
    if (e.kind === 'cat') continue;
    places.push(e);
    if (r === 0) exact.push(e);
    else if (r === 1) starts.push(e);
  }
  const one = (list: JumpEntry[]) => (list.length === 1 ? list[0] : null);
  const best = exact.length ? one(exact) : starts.length ? one(starts) : one(places);
  const col = collator(lang);
  const order = ['cat', here, ...REGIONS.map((r) => r.id).filter((id) => id !== here)];
  const groups: JumpGroup[] = [];
  for (const key of order) {
    const arr = byGroup.get(key);
    if (!arr?.length) continue;
    arr.sort((a, b) => a.r - b.r || KIND_ORDER[a.e.kind] - KIND_ORDER[b.e.kind]
      || col.compare(a.e.name, b.e.name) || col.compare(a.e.area ?? '', b.e.area ?? ''));
    const cap = key === 'cat' ? CAP.cat : key === here ? CAP.here : CAP.other;
    groups.push({ key, hits: arr.slice(0, cap).map((x) => x.e), total: arr.length });
  }
  return { groups, best };
}
