import type { ClassType } from '../../data/types';
import type { Build, Faction } from '../../state/build';

/**
 * Top players of one class with their complete builds, read from AION2 Index (aion2index.com) by
 * scripts/fetch-top-builds.mjs and written to public/data/top/<ClassType>.json. The page computes all
 * statistics from these files, so the files only hold what the source shows.
 */
export interface TopFile {
  v: 1;
  cls: ClassType;
  /**
   * when our script last wrote this file (ISO): the run that changed the data, or a run that found it unchanged and
   * confirmed it (unchanged data is rewritten at most once a week, so this is at most a week behind the last read)
   */
  fetchedAt: string;
  source: { name: string; url: string };
  /** ranked characters of this class on the source, all regions */
  total: number | null;
  players: TopPlayer[];
}

/** region codes of the global client as the source uses them */
export type TopRegion = 'nae' | 'naw' | 'eu' | 'la' | 'as';

export interface TopSkill {
  id: number;
  /** level the game shows: bought levels + Daevanion + gear */
  lv: number;
  /** part of lv from Daevanion skill nodes */
  dv: number;
  /** part of lv from gear and Arcana */
  gear: number;
  /** on one of the player's skill bars (the source does not say which key) */
  bar: boolean;
}

export interface TopStigma {
  id: number;
  /** stigma level, 0 = learned but never levelled */
  lv: number;
  /** slotted: one of the (at most 4) levelled stigmas with the source's "equipped" mark */
  slot: boolean;
  /** has the "equipped" mark but no level (another preset or bar); shown as a note */
  marked: boolean;
}

export interface TopBoard {
  id: number;
  open: number;
  total: number;
}

export interface TopGear {
  /** slot key as the source names it (MainHand, SubHand, Helmet, ..., Rune2) */
  slot: string;
  name: string;
  /** Common | Rare | Legend | Unique | Epic | Special ... as the source names it */
  grade: string;
  enchant: number;
  /** exceed (over-enchant) level, 0 if none */
  exceed: number;
}

export interface TopPlayer {
  /** rank in the all-regions class ranking by combat power */
  rank: number;
  name: string;
  /** the player's page on the source */
  url: string;
  region: TopRegion;
  server: string;
  faction: Faction | null;
  level: number;
  itemLevel: number;
  cp: number;
  /** combat power change over 7 days, null if the source has none */
  cp7d: number | null;
  /** when the source last read this character (ISO) */
  updatedAt: string;
  /** learned active and passive skills */
  skills: TopSkill[];
  /** all learned stigmas */
  stigmas: TopStigma[];
  boards: TopBoard[];
  gear: TopGear[];
  arcana: TopGear[];
  wings: string | null;
  pet: string | null;
  /**
   * The same build in our planner format (already through normalizeBuild): c, l, f, lv, gx, st, dv, plus e and se
   * (extra skill points / stigma shards beyond the planner's base budget, so the build is not shown over budget).
   * sp (specialisations) and bar stay empty: the source does not show which parts were picked or which key holds a skill.
   */
  build: Build;
  /** things the import had to leave out, in English, for the tooltip */
  notes: string[];
}

/** public/data/top/index.json: which classes have a file and when they were read */
export interface TopIndex {
  v: 1;
  /** the newest fetchedAt of the class files */
  fetchedAt: string;
  classes: { cls: ClassType; players: number; fetchedAt: string }[];
}
