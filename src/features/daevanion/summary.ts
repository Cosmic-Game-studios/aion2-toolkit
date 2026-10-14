import type { Board, GameData } from '../../data/types';
import type { Build } from '../../state/build';
import { boardCost, decodeLearned, nodeKey } from '../../lib/daevanionGraph';

export interface DvSummary {
  perBoard: { b: Board; set: Set<string>; spent: number; max: number }[];
  stats: { label: string; value: number }[];
  skills: { id: number; value: number }[];
  grades: Record<string, number>;
  nodes: number;
}

/** Totals over all boards of the build's class. */
export function daevanionSummary(data: GameData, build: Build): DvSummary {
  const boards = data.daevanion.classes[build.c]?.boards ?? [];
  const perBoard = boards.map((b) => {
    const set = decodeLearned(b, build.dv[b.id] ?? '');
    return { b, set, spent: boardCost(b, set), max: b.nodes.reduce((a, n) => a + n.cost, 0) };
  });
  const stats = new Map<string, number>();
  const skills = new Map<number, number>();
  const grades: Record<string, number> = {};
  let nodes = 0;
  for (const { b, set } of perBoard) {
    for (const n of b.nodes) {
      if (n.kind === 'S' || !set.has(nodeKey(n))) continue;
      nodes++;
      grades[n.grade] = (grades[n.grade] ?? 0) + 1;
      if (n.kind === 'T') stats.set(n.label, (stats.get(n.label) ?? 0) + (n.value ?? 0));
      else if (n.kind === 'K') skills.set(Number(n.key), (skills.get(Number(n.key)) ?? 0) + (n.value ?? 0));
    }
  }
  return {
    perBoard,
    stats: [...stats].map(([label, value]) => ({ label, value })).sort((a, b) => a.label.localeCompare(b.label)),
    skills: [...skills].map(([id, value]) => ({ id, value })).sort((a, b) => b.value - a.value),
    grades,
    nodes,
  };
}
