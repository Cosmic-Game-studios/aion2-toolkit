import type { ClassType, Lang } from '../../data/types';

/** A text in both app languages. */
export type L10n = Record<Lang, string>;

/** A table cell: a text in both languages, or one string for both (numbers, names, tags). */
export type GuideCell = L10n | string;

/**
 * Building blocks of a guide section. Texts may use **bold** like the skill texts and
 * [[skill id|English name]] for a skill: it shows with icon, tooltip and its name in the page language.
 */
export type GuideBlock =
  | { type: 'text'; text: L10n }
  | { type: 'heading'; text: L10n }
  | { type: 'steps'; items: { title: L10n; text?: L10n }[] }
  | { type: 'list'; items: L10n[] }
  | { type: 'checklist'; items: L10n[] }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'info'; title?: L10n; text: L10n }
  | { type: 'facts'; items: { label: L10n; value: L10n }[] }
  /**
   * a table that scrolls sideways on narrow screens; `grid`: a plan of marks, every column after the first is centred
   */
  | { type: 'table'; caption?: L10n; head: GuideCell[]; rows: GuideCell[][]; grid?: boolean }
  /**
   * `href`: one address, or one per language (a site with its own German pages);
   * http(s) addresses open in a new tab;
   * `cls`: the link switches the planner to this class first (planner links in a class guide);
   * `download`: a file of the site (e.g. a PDF) that the browser saves instead of opening
   */
  | { type: 'links'; items: { href: GuideCell; label: L10n; primary?: boolean; cls?: ClassType; download?: boolean }[] }
  | { type: 'sources'; items: { href: string; label: string }[] }
  /** skills with icon, name and a short note */
  | { type: 'skills'; items: { id: number; note: L10n }[] }
  /**
   * hotbar keys the way the macro presses them: a key with its skill stack, bottom first (the key uses the
   * lowest skill that is ready). `macro` marks keys that belong in the macro.
   */
  | { type: 'keys'; items: { key: string; ids: number[]; note?: L10n; macro?: boolean }[] }
  /** skills in the order they are used */
  | { type: 'rotation'; title?: L10n; steps: { id: number; note?: L10n }[] }
  /** specialisations: the skill and the chosen option ids (texts come from the game data) */
  | { type: 'specs'; items: { id: number; parts: number[]; note?: L10n }[] }
  /*
   * Charts and diagrams (GuideCharts.tsx). Each has a title (shown above it) and a caption (below it: the source or
   * how to read it); screen readers get the numbers as a table.
   */
  /**
   * a bar chart: one horizontal bar per item, the longest is `max` (default: the largest value). `display` replaces the
   * printed number (e.g. "35–65K"), `note` is a short line under the label, `unit` follows every number.
   */
  | { type: 'bars'; title?: L10n; caption?: L10n; unit?: GuideCell; max?: number; items: { label: GuideCell; value: number; display?: GuideCell; note?: GuideCell; tone?: ChartTone }[] }
  /** parts of a whole: one stacked bar plus a legend with the share of each part in % (of the sum of the values) */
  | { type: 'shares'; title?: L10n; caption?: L10n; unit?: GuideCell; items: { label: GuideCell; value: number; note?: GuideCell; tone?: ChartTone }[] }
  /**
   * a line chart: one or more series over the same steps of the x axis (`ticks`, one per value; null = no value at that
   * step). `y.min` / `y.max` fix the axis (default: from 0, or from the data when it does not start near 0).
   */
  | { type: 'line'; title?: L10n; caption?: L10n; x: { label: L10n; ticks: GuideCell[] }; y: { label: L10n; unit?: string; min?: number; max?: number }; series: { label: L10n; values: (number | null)[]; tone?: ChartTone; dashed?: boolean }[] }
  /** a process: numbered boxes joined by arrows, left to right on wide screens (up to 5 boxes), top to bottom otherwise */
  | { type: 'flow'; title?: L10n; caption?: L10n; items: { title: L10n; text?: L10n; tag?: GuideCell; tone?: ChartTone }[] }
  /** options side by side: a card per option with its points (pro, con or neutral) and an optional verdict */
  | { type: 'compare'; title?: L10n; caption?: L10n; items: { title: L10n; tag?: GuideCell; tone?: ChartTone; points: { kind?: 'pro' | 'con'; text: L10n }[]; verdict?: L10n }[] }
  /** key numbers as large tiles */
  | { type: 'stats'; items: { value: GuideCell; label: L10n; note?: L10n; tone?: ChartTone }[] };

/** colour of a bar, share, line, box or tile (the tones of the guide tiles) */
export type ChartTone = 'blue' | 'teal' | 'violet' | 'gold' | 'green' | 'rose' | 'slate';

export interface GuideSection {
  title: L10n;
  blocks: GuideBlock[];
}

export type GuideIcon = 'speed' | 'craft' | 'gather' | 'book' | 'macro' | 'power' | 'pet' | 'score' | 'users' | 'rocket' | 'gem';

/** where a guide is listed on the overview */
export type GuideCategory = 'basics' | 'class' | 'world';

export interface Guide {
  /** used in the URL: #/guides/<id> */
  id: string;
  icon: GuideIcon;
  tone: ChartTone;
  category: GuideCategory;
  /** class guides show the class emblem instead of the icon */
  cls?: ClassType;
  title: L10n;
  summary: L10n;
  /** ISO date of the last content change */
  updated: string;
  tags: L10n[];
  /** where the content comes from, e.g. a player's own run or research */
  basis: L10n;
  sections: GuideSection[];
}
