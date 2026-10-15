import type { ClassType, Lang } from '../../data/types';

/*
 * Numbers, times and names for the top-10 page. Everything is formatted for the UI language
 * (1,234,567 / 1.234.567; "3 hours ago" / "vor 3 Stunden").
 */

const locale = (lang: Lang) => (lang === 'de' ? 'de-DE' : 'en-GB');

const intFmt = new Map<string, Intl.NumberFormat>();
const fmt = (lang: Lang, digits: number) => {
  const k = `${lang}:${digits}`;
  let f = intFmt.get(k);
  if (!f) {
    f = new Intl.NumberFormat(locale(lang), { minimumFractionDigits: 0, maximumFractionDigits: digits });
    intFmt.set(k, f);
  }
  return f;
};

/** Whole number with grouping: 213,131 / 213.131 */
export const fmtInt = (n: number, lang: Lang) => fmt(lang, 0).format(Math.round(n));
/** Average with at most one decimal: 12.4 / 12,4 (12 stays 12) */
export const fmtAvg = (n: number, lang: Lang) => fmt(lang, 1).format(Math.round(n * 10) / 10);
/** Signed change: +1,234 / −567 */
export const fmtDelta = (n: number, lang: Lang) => `${n > 0 ? '+' : n < 0 ? '−' : '±'}${fmtInt(Math.abs(n), lang)}`;

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 86400], ['month', 30 * 86400], ['day', 86400], ['hour', 3600], ['minute', 60],
];

/** "3 hours ago" / "vor 3 Stunden"; `short`: "3 hr. ago" / "vor 3 Std.". */
export function fmtAgo(iso: string, lang: Lang, short = false, now = Date.now()): string {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return '–';
  const rtf = new Intl.RelativeTimeFormat(locale(lang), { numeric: 'auto', style: short ? 'short' : 'long' });
  const sec = (t - now) / 1000;
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(0, 'second');
}

/** Date and time for a title attribute: "15 Oct 2026, 14:05" / "15.10.2026, 14:05" */
export function fmtWhen(iso: string, lang: Lang): string {
  const d = new Date(iso);
  return Number.isFinite(d.getTime()) ? d.toLocaleString(locale(lang), { dateStyle: 'medium', timeStyle: 'short' }) : '';
}

/* ---------------------------------------------------------------- gear */

export type GearGroup = 'weapon' | 'armour' | 'accessory' | 'rune';

/** Group of a slot as AION2 Index names it (MainHand, SubHand, Helmet … Bracelet2, Rune1). */
export function gearGroup(slot: string): GearGroup {
  const s = slot.toLowerCase();
  if (s.startsWith('rune')) return 'rune';
  if (/hand|weapon|shield/.test(s)) return 'weapon';
  if (/neck|amulet|ear|ring|brace|belt/.test(s)) return 'accessory';
  return 'armour';
}

const SLOT_NAMES: Record<string, [string, string]> = {
  mainhand: ['Main hand', 'Haupthand'],
  subhand: ['Off hand', 'Nebenhand'],
  helmet: ['Helmet', 'Helm'],
  shoulder: ['Shoulders', 'Schultern'],
  torso: ['Torso', 'Oberkörper'],
  pants: ['Pants', 'Hose'],
  gloves: ['Gloves', 'Handschuhe'],
  boots: ['Boots', 'Stiefel'],
  cape: ['Cape', 'Umhang'],
  belt: ['Belt', 'Gürtel'],
  necklace: ['Necklace', 'Halskette'],
  amulet: ['Amulet', 'Amulett'],
  earring: ['Earring', 'Ohrring'],
  ring: ['Ring', 'Ring'],
  bracelet: ['Bracelet', 'Armband'],
  rune: ['Rune', 'Rune'],
  arcana: ['Arcana', 'Arkana'],
};

/** "Earring 2" / "Ohrring 2"; unknown slots are split at capitals ("SomeSlot3" -> "Some slot 3"). */
export function slotName(slot: string, lang: Lang): string {
  const m = /^(.*?)(\d*)$/.exec(slot)!;
  const known = SLOT_NAMES[m[1].toLowerCase()];
  const name = known ? known[lang === 'de' ? 1 : 0] : m[1].replace(/([a-z])([A-Z])/g, '$1 $2').replace(/ (\w)/g, (_, c: string) => ` ${c.toLowerCase()}`);
  return m[2] ? `${name} ${m[2]}` : name;
}

/** CSS class for an item grade (colour); unknown grades stay neutral. */
export const gradeClass = (grade: string) => `gr-${/^[A-Za-z]+$/.test(grade) ? grade.toLowerCase() : 'none'}`;

/* ---------------------------------------------------------------- links */

/** MetaBot's class slugs (their class build pages); classes it does not list have none. */
export const METABOT_SLUG: Partial<Record<ClassType, string>> = {
  Gladiator: 'gladiator', Templar: 'templar', Assassin: 'assassin', Ranger: 'ranger', Sorcerer: 'sorcerer',
  Elementalist: 'spiritmaster', Cleric: 'cleric', Chanter: 'chanter',
};
export const METABOT_BOARDS = 'https://metabot.gg/en/aion-2/leaderboards';
export const metabotClassUrl = (slug: string) => `https://metabot.gg/en/aion-2/classes/${slug}/build`;
export const ISSUES_URL = 'https://github.com/Cosmic-Game-studios/aion2-toolkit/issues';
/** where the footer links before a class file (with its own source URL) has loaded */
export const SOURCE_FALLBACK = { name: 'AION2 Index', url: 'https://aion2index.com/rankings' };
