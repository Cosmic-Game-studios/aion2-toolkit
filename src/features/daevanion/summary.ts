import type { Board, GameData } from '../../data/types';
import type { Build } from '../../state/build';
import { boardCost, decodeLearned, nodeKey } from '../../lib/daevanionGraph';

export interface DvStat {
  /** stat key of the nodes (the same in every language) */
  key: string;
  label: string;
  value: number;
  /** PvP-only stat (Azphel) */
  pvp: boolean;
}

export interface DvSummary {
  perBoard: { b: Board; set: Set<string>; spent: number; max: number }[];
  stats: DvStat[];
  skills: { id: number; value: number }[];
  grades: Record<string, number>;
  nodes: number;
}

/**
 * Totals over all boards of the build's class. Stats are summed per stat key; with `ranks` (stat key -> place in
 * the class priority) the class's stats come first in priority order, the rest alphabetically.
 */
export function daevanionSummary(data: GameData, build: Build, ranks?: Map<string, number>): DvSummary {
  const boards = data.daevanion.classes[build.c]?.boards ?? [];
  const perBoard = boards.map((b) => {
    const set = decodeLearned(b, build.dv[b.id] ?? '');
    return { b, set, spent: boardCost(b, set), max: b.nodes.reduce((a, n) => a + n.cost, 0) };
  });
  const stats = new Map<string, DvStat>();
  const skills = new Map<number, number>();
  const grades: Record<string, number> = {};
  let nodes = 0;
  for (const { b, set } of perBoard) {
    for (const n of b.nodes) {
      if (n.kind === 'S' || !set.has(nodeKey(n))) continue;
      nodes++;
      grades[n.grade] = (grades[n.grade] ?? 0) + 1;
      if (n.kind === 'T') {
        const key = String(n.key);
        const cur = stats.get(key);
        if (cur) cur.value += n.value ?? 0;
        else stats.set(key, { key, label: n.label, value: n.value ?? 0, pvp: key.startsWith('PvP') });
      } else if (n.kind === 'K') skills.set(Number(n.key), (skills.get(Number(n.key)) ?? 0) + (n.value ?? 0));
    }
  }
  const rank = (s: DvStat) => ranks?.get(s.key) ?? Infinity;
  return {
    perBoard,
    stats: [...stats.values()].sort((a, b) => rank(a) - rank(b) || a.label.localeCompare(b.label)),
    skills: [...skills].map(([id, value]) => ({ id, value })).sort((a, b) => b.value - a.value),
    grades,
    nodes,
  };
}
