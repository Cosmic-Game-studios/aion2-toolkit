import type { Board } from '../../data/types';
import type { Faction } from '../../state/build';
import { decodeLearned } from '../../lib/daevanionGraph';
import type { TopGear, TopPlayer, TopRegion } from './types';

/*
 * Statistics across the players of one class file. Pure (no React, no game texts): the page passes the class's
 * Daevanion boards so the heat map can decode each build's learned nodes the same way the planner does.
 */

export interface Count<K> { key: K; n: number }

export interface StigmaStat {
  id: number;
  /** players with this stigma in one of their 4 slots */
  slotted: number;
  /** players who levelled it at all (slotted or not) */
  learned: number;
  /** average level of the slotted ones (null when nobody slots it) */
  avgLv: number | null;
}

export interface SkillStat {
  id: number;
  /** players who learned it */
  learned: number;
  /** players with it on a skill bar */
  bar: number;
  /** level the game shows: average, lowest and highest over the players who learned it */
  avgLv: number;
  minLv: number;
  maxLv: number;
  /** average part of the shown level from Daevanion nodes and from gear */
  avgDv: number;
  avgGear: number;
}

export interface BoardStat {
  id: number;
  /** our board data (null when the source lists a board we do not know) */
  board: Board | null;
  /** players with a value for this board */
  players: number;
  avgOpen: number;
  total: number;
  /** node key -> players who learned that node */
  heat: Map<string, number>;
  /** players the heat map counts: all but those whose board the source lists with open nodes but the fetch could not read */
  heatOf: number;
}

export interface GearSlotStat {
  slot: string;
  /** players with an item in this slot */
  players: number;
  /** the most common item (ties: the one of the higher ranked player) */
  top: { name: string; grade: string; n: number };
  avgEnchant: number;
  avgExceed: number;
}

export interface TopStats {
  players: number;
  /** combat power of the first and the last player in the file (with their ranks) and the median */
  cp: { first: number; last: number; median: number; firstRank: number; lastRank: number } | null;
  avgItemLevel: number | null;
  regions: Count<TopRegion>[];
  factions: Count<Faction | null>[];
  stigmas: StigmaStat[];
  /** most common combination of slotted stigmas (ids sorted); null unless at least two players share one */
  stigmaSet: { ids: number[]; n: number } | null;
  skills: SkillStat[];
  boards: BoardStat[];
  gear: GearSlotStat[];
  arcana: GearSlotStat[];
}

export const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

export function median(xs: number[]): number {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Counts per key, most first; ties keep the order of first appearance. */
function countBy<K>(keys: K[]): Count<K>[] {
  const map = new Map<K, number>();
  for (const k of keys) map.set(k, (map.get(k) ?? 0) + 1);
  return [...map].map(([key, n]) => ({ key, n })).sort((a, b) => b.n - a.n);
}

const byRank = (players: TopPlayer[]) => [...players].sort((a, b) => a.rank - b.rank);

function stigmaStats(players: TopPlayer[]): Pick<TopStats, 'stigmas' | 'stigmaSet'> {
  const map = new Map<number, { slotted: number[]; learned: number }>();
  const sets: string[] = [];
  for (const p of players) {
    const slotted: number[] = [];
    for (const s of p.stigmas) {
      const e = map.get(s.id) ?? { slotted: [], learned: 0 };
      if (s.lv > 0) e.learned++;
      if (s.slot) { e.slotted.push(s.lv); slotted.push(s.id); }
      if (s.lv > 0 || s.slot) map.set(s.id, e);
    }
    if (slotted.length) sets.push([...new Set(slotted)].sort((a, b) => a - b).join(','));
  }
  const stigmas = [...map].map(([id, e]) => ({
    id, slotted: e.slotted.length, learned: e.learned, avgLv: e.slotted.length ? avg(e.slotted) : null,
  })).sort((a, b) => b.slotted - a.slotted || b.learned - a.learned || (b.avgLv ?? 0) - (a.avgLv ?? 0) || a.id - b.id);
  // a full set beats a smaller one with the same count (a player with an empty slot is the exception)
  const top = countBy(sets).sort((a, b) => b.n - a.n || b.key.split(',').length - a.key.split(',').length)[0];
  // a set only one player uses is not "common" (the list per stigma covers that case)
  return { stigmas, stigmaSet: top && top.n >= 2 ? { ids: top.key.split(',').map(Number), n: top.n } : null };
}

function skillStats(players: TopPlayer[]): SkillStat[] {
  const map = new Map<number, { lv: number[]; dv: number[]; gear: number[]; bar: number }>();
  for (const p of players) {
    for (const s of p.skills) {
      const e = map.get(s.id) ?? { lv: [], dv: [], gear: [], bar: 0 };
      e.lv.push(s.lv);
      e.dv.push(s.dv);
      e.gear.push(s.gear);
      if (s.bar) e.bar++;
      map.set(s.id, e);
    }
  }
  return [...map].map(([id, e]) => ({
    id, learned: e.lv.length, bar: e.bar, avgLv: avg(e.lv), minLv: Math.min(...e.lv), maxLv: Math.max(...e.lv),
    avgDv: avg(e.dv), avgGear: avg(e.gear),
  })).sort((a, b) => b.bar - a.bar || b.learned - a.learned || b.avgLv - a.avgLv || a.id - b.id);
}

/** Boards in our order (then any the source has and we do not), with the open nodes and a heat map each. */
function boardStats(players: TopPlayer[], boards: Board[]): BoardStat[] {
  const ids = boards.map((b) => b.id);
  for (const p of players) for (const b of p.boards) if (!ids.includes(b.id)) ids.push(b.id);
  return ids.map((id) => {
    const board = boards.find((b) => b.id === id) ?? null;
    const heat = new Map<string, number>();
    const open: number[] = [];
    let heatOf = 0;
    let total = board ? board.nodes.filter((n) => n.kind !== 'S').length : 0;
    for (const p of players) {
      const src = p.boards.find((b) => b.id === id);
      const hex = p.build.dv[String(id)];
      const learned = board && hex ? decodeLearned(board, hex) : null;
      if (learned) for (const k of learned) heat.set(k, (heat.get(k) ?? 0) + 1);
      // open nodes at the source but no build: the board page could not be read (see the player's import notes)
      if (!(src && src.open > 0 && !hex)) heatOf++;
      // the source's own count first; our decoded build where the source has no entry for the board
      if (src) { open.push(src.open); if (src.total) total = src.total; }
      else if (learned) open.push(learned.size);
    }
    return { id, board, players: open.length, avgOpen: avg(open), total, heat, heatOf };
  });
}

/** Per slot (in the order the source lists them): the most common item, how many use it, the average enchantment. */
export function gearStats(players: TopPlayer[], pick: (p: TopPlayer) => TopGear[]): GearSlotStat[] {
  const slots = new Map<string, TopGear[]>();
  for (const p of byRank(players)) {
    for (const g of pick(p)) {
      const list = slots.get(g.slot) ?? [];
      list.push(g);
      slots.set(g.slot, list);
    }
  }
  return [...slots].map(([slot, items]) => {
    const best = countBy(items.map((g) => g.name))[0];
    const grade = items.find((g) => g.name === best.key)?.grade ?? '';
    return {
      slot, players: items.length, top: { name: best.key, grade, n: best.n },
      avgEnchant: avg(items.map((g) => g.enchant)), avgExceed: avg(items.map((g) => g.exceed)),
    };
  });
}

export function topStats(players: TopPlayer[], boards: Board[]): TopStats {
  const ranked = byRank(players);
  const cps = ranked.map((p) => p.cp);
  return {
    players: ranked.length,
    cp: ranked.length
      ? { first: cps[0], last: cps[cps.length - 1], median: median(cps), firstRank: ranked[0].rank, lastRank: ranked[ranked.length - 1].rank }
      : null,
    avgItemLevel: ranked.length ? avg(ranked.map((p) => p.itemLevel)) : null,
    regions: countBy(ranked.map((p) => p.region)),
    factions: countBy(ranked.map((p) => p.faction)),
    ...stigmaStats(ranked),
    skills: skillStats(ranked),
    boards: boardStats(ranked, boards),
    gear: gearStats(ranked, (p) => p.gear),
    arcana: gearStats(ranked, (p) => p.arcana),
  };
}
