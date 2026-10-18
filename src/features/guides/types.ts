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
   * `cls`: the link switches the planner to this class first (planner links in a class guide);
   * `download`: a file of the site (e.g. a PDF) that the browser saves instead of opening
   */
  | { type: 'links'; items: { href: string; label: L10n; primary?: boolean; cls?: ClassType; download?: boolean }[] }
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
  | { type: 'specs'; items: { id: number; parts: number[]; note?: L10n }[] };

export interface GuideSection {
  title: L10n;
  blocks: GuideBlock[];
}

export type GuideIcon = 'speed' | 'craft' | 'gather' | 'book' | 'macro' | 'power';

/** where a guide is listed on the overview */
export type GuideCategory = 'basics' | 'class' | 'world';

export interface Guide {
  /** used in the URL: #/guides/<id> */
  id: string;
  icon: GuideIcon;
  tone: 'blue' | 'teal' | 'violet' | 'gold' | 'green' | 'rose' | 'slate';
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
