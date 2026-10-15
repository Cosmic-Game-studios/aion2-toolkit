import type { ClassType } from '../data/types';
import { GAME_LEVEL_CAP } from '../lib/levelCap';

export type Faction = 'Light' | 'Dark';
export interface StigmaSlot { id: number | null; lv: number }
/** one macro step presses one hotbar key (column 0-11); the key uses the lowest ready skill of its stack */
export interface MacroStep { k: number; delay: number }
export interface Macro { id: string; name: string; key: string; steps: MacroStep[] }

/** skills stacked on one key (the bottom one has priority) */
export const BAR_ROWS = 4;
export const BAR_COLS = 12;
/** default keys of the 12 quick slots (Quick Use 1-12); the last four are the stigma slots */
export const BAR_KEYS = ['R', 'T', '1', '2', '3', '4', 'Q', 'E', '5', '6', '7', '8'];
export const NORMAL_COLS = [0, 1, 2, 3, 4, 5, 6, 7];
/** quick slot 1 holds the basic attack – in game it is the left mouse button */
export const BASIC_COL = 0;
export const STIGMA_COLS = [8, 9, 10, 11];
/**
 * Order of the keys as the in-game skill window shows them: 1–4 | 5–8 | Q, E, basic attack, T.
 * Only the display order – the column indices above stay, so saved builds and links keep working.
 * Stigmas can go on any key in game; 5–8 is just where most players put them.
 */
export const BAR_GROUPS: number[][] = [[2, 3, 4, 5], [8, 9, 10, 11], [6, 7, 0, 1]];
export const BAR_ORDER = BAR_GROUPS.flat();
/** the game has one skill macro with one key */
export const MAX_MACROS = 1;
/** our own cap: the game does not document one, and twelve keys rarely need more */
export const MAX_MACRO_STEPS = 12;
export const DEFAULT_DELAY = 10;
/** specialisation slots per skill */
export const MAX_SPECS = 3;
export const MAX_DELAY = 9900;

export const CLASS_TYPES: ClassType[] = [
  'Assassin', 'Chanter', 'Cleric', 'Elementalist', 'Fighter', 'Gladiator', 'Ranger', 'Sorcerer', 'Templar',
];

/**
 * One complete character build. Shared by every calculator, the hotbar editor and the community upload.
 * Kept compact because it travels in share links and API payloads.
 */
export interface Build {
  v: 1;
  /** class */
  c: ClassType;
  /** character level */
  l: number;
  /** faction (extra point sources differ) */
  f: Faction;
  /** enabled extra skill point source groups */
  x: string[];
  /** manual extra skill points (negative: the player has fewer than level and sources give) */
  e: number;
  /** manual extra stigma shards */
  se: number;
  /** cooldown reduction in percent (manual) */
  cdr: number;
  /** skill levels by skill id (normal skills) */
  lv: Record<string, number>;
  /** chosen specialisations by skill id (part ids, in slot order, at most 3) */
  sp: Record<string, number[]>;
  /** extra skill levels from gear and other sources by skill id (manual) */
  gx: Record<string, number>;
  /** 4 stigma slots */
  st: StigmaSlot[];
  /** Daevanion: learned nodes per board id, hex bitmask */
  dv: Record<string, string>;
  /** hotbar: "row:col" -> skill id; row 0 is the main (bottom) row */
  bar: Record<string, number>;
  /** skill ids with auto-use enabled */
  auto: number[];
  macros: Macro[];
}

export const emptyBuild = (c: ClassType, level = 45): Build => ({
  v: 1, c, l: level, f: 'Light', x: [], e: 0, se: 0, cdr: 0,
  lv: {}, sp: {}, gx: {}, st: [0, 1, 2, 3].map(() => ({ id: null, lv: 1 })), dv: {}, bar: {}, auto: [], macros: [],
});

export const slotKey = (row: number, col: number) => `${row}:${col}`;

/** skills on one key, bottom (priority) first */
export const keyStack = (b: Build, col: number): number[] =>
  Array.from({ length: BAR_ROWS }, (_, row) => b.bar[slotKey(row, col)]).filter((id): id is number => !!id);

/** the key a skill sits on (-1 when it is not on the bar); turns old skill-based macro steps into keys */
const keyOf = (b: Build, id: number) => {
  for (const [k, v] of Object.entries(b.bar)) if (v === id) return Number(k.split(':')[1]);
  return -1;
};

export const newMacroId = () => `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const clampInt = (v: unknown, min: number, max: number, def: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def;
};
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const ID_MAX = 999_999_999;

/** Validates and normalises an unknown value (share link, storage, API) into a Build. */
export function normalizeBuild(raw: unknown): Build | null {
  if (!isObj(raw)) return null;
  const c = raw.c as ClassType;
  if (!CLASS_TYPES.includes(c)) return null;
  const b = emptyBuild(c);
  b.l = clampInt(raw.l, 1, GAME_LEVEL_CAP, GAME_LEVEL_CAP);
  b.f = raw.f === 'Dark' ? 'Dark' : 'Light';
  b.x = Array.isArray(raw.x) ? raw.x.filter((s): s is string => typeof s === 'string' && s.length < 40).slice(0, 10) : [];
  b.e = clampInt(raw.e, -9999, 9999, 0);
  b.se = clampInt(raw.se, -9999, 9999, 0);
  b.cdr = clampInt(raw.cdr, 0, 90, 0);
  if (isObj(raw.lv)) {
    for (const [k, v] of Object.entries(raw.lv)) if (/^\d{1,9}$/.test(k)) b.lv[k] = clampInt(v, 1, 40, 1);
  }
  if (isObj(raw.sp)) {
    for (const [k, v] of Object.entries(raw.sp)) {
      if (!/^\d{1,9}$/.test(k) || !Array.isArray(v)) continue;
      const ids = [...new Set(v.map((x) => clampInt(x, 0, ID_MAX, 0)).filter(Boolean))].slice(0, MAX_SPECS);
      if (ids.length) b.sp[k] = ids;
    }
  }
  if (isObj(raw.gx)) {
    for (const [k, v] of Object.entries(raw.gx)) {
      const n = clampInt(v, 0, 30, 0);
      if (/^\d{1,9}$/.test(k) && n) b.gx[k] = n;
    }
  }
  if (Array.isArray(raw.st)) {
    const st = raw.st as unknown[];
    b.st = b.st.map((_, i) => {
      const s = st[i];
      if (!isObj(s)) return { id: null, lv: 1 };
      const id = s.id == null ? null : clampInt(s.id, 0, ID_MAX, 0) || null;
      return { id, lv: clampInt(s.lv, 1, 25, 1) };
    });
  }
  if (isObj(raw.dv)) {
    for (const [k, v] of Object.entries(raw.dv)) {
      if (/^\d{1,6}$/.test(k) && typeof v === 'string' && /^[0-9a-f]{0,80}$/.test(v)) b.dv[k] = v;
    }
  }
  if (isObj(raw.bar)) {
    for (const [k, v] of Object.entries(raw.bar)) {
      const m = /^(\d):(\d{1,2})$/.exec(k);
      if (m && +m[1] < BAR_ROWS && +m[2] < BAR_COLS) {
        const id = clampInt(v, 0, ID_MAX, 0);
        if (id) b.bar[k] = id;
      }
    }
  }
  if (Array.isArray(raw.auto)) {
    b.auto = [...new Set(raw.auto.map((v) => clampInt(v, 0, ID_MAX, 0)).filter(Boolean))].slice(0, 60);
  }
  if (Array.isArray(raw.macros)) {
    b.macros = raw.macros.filter(isObj).slice(0, MAX_MACROS).map((m) => ({
      id: typeof m.id === 'string' && /^[\w-]{1,24}$/.test(m.id) ? m.id : newMacroId(),
      name: String(m.name ?? '').slice(0, 30),
      key: String(m.key ?? '').slice(0, 12),
      steps: Array.isArray(m.steps)
        ? m.steps.filter(isObj)
          .map((s) => ({ k: 'k' in s ? clampInt(s.k, -1, BAR_COLS - 1, -1) : keyOf(b, clampInt(s.id, 0, ID_MAX, 0)), delay: clampInt(s.delay, 0, MAX_DELAY, DEFAULT_DELAY), old: !('k' in s) }))
          // old macros listed each skill of a stack: one step per key is enough
          .filter((s, i, all) => s.k >= 0 && !(s.old && i > 0 && all[i - 1].k === s.k))
          .map(({ k, delay }) => ({ k, delay }))
          .slice(0, MAX_MACRO_STEPS)
        : [],
    }));
  }
  return b;
}

/** true when nothing was planned yet (only class, level and settings). */
export const isEmptyBuild = (b: Build) =>
  Object.values(b.lv).every((v) => v <= 1)
  && Object.values(b.sp).every((v) => v.length === 0)
  && b.st.every((s) => !s.id)
  && Object.values(b.dv).every((v) => !/[1-9a-f]/.test(v))
  && Object.keys(b.bar).length === 0
  && b.macros.length === 0;

const stable = (v: unknown): unknown => {
  if (Array.isArray(v)) return v.map(stable);
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([k, x]) => [k, stable(x)]));
  }
  return v;
};

/** Same planned content, regardless of key order. */
export const sameBuild = (a: Build, b: Build) => JSON.stringify(stable(a)) === JSON.stringify(stable(b));
