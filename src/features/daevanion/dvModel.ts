import type { Board, BoardNode, ClassType, GameData, Skill } from '../../data/types';
import type { Build } from '../../state/build';
import { nodeKey, nodeMap } from '../../lib/daevanionGraph';
import { CLASS_STATS } from '../../lib/statPriority';

/**
 * The part of the 15 × 15 grid a board really uses (11 × 11, 13 × 13 or 15 × 15).
 * A node's x is its ROW and y its column, as the game lays the board out (node id = (x - 1) * 15 + y, row by row;
 * dbaion2 and AION2 Index draw it the same way): grid row = x - minX + 1, grid column = y - minY + 1.
 */
export interface BoardBox { minX: number; minY: number; cols: number; rows: number }

const boxes = new WeakMap<Board, BoardBox>();

export function boardBox(board: Board): BoardBox {
  const hit = boxes.get(board);
  if (hit) return hit;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of board.nodes) {
    if (n.x < minX) minX = n.x;
    if (n.x > maxX) maxX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.y > maxY) maxY = n.y;
  }
  const box = board.nodes.length
    ? { minX, minY, cols: maxY - minY + 1, rows: maxX - minX + 1 }
    : { minX: 1, minY: 1, cols: 15, rows: 15 };
  boxes.set(board, box);
  return box;
}

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]] as const;

/** Nodes that can be learned next: next to the start or a learned node and not learned yet (one pass over the board). */
export function frontier(board: Board, learned: Set<string>): Set<string> {
  const map = nodeMap(board);
  const out = new Set<string>();
  for (const n of board.nodes) {
    if (n.kind !== 'S' && !learned.has(nodeKey(n))) continue;
    for (const [dx, dy] of DIRS) {
      const m = map.get(`${n.x + dx},${n.y + dy}`);
      if (m && m.kind !== 'S' && !learned.has(nodeKey(m))) out.add(nodeKey(m));
    }
  }
  return out;
}

export const nodesCost = (nodes: Iterable<BoardNode>) => {
  let sum = 0;
  for (const n of nodes) sum += n.cost;
  return sum;
};

/** What a group of nodes gives, summed per stat and per skill, in route order. */
export function nodeGains(nodes: BoardNode[], skillById: Map<number, Skill>): string[] {
  const sums = new Map<string, { label: string; value: number }>();
  for (const n of nodes) {
    if (n.kind === 'S' || n.value == null) continue;
    const id = `${n.kind}:${n.key}`;
    const label = n.kind === 'K' ? skillById.get(Number(n.key))?.name ?? n.label : n.label;
    const cur = sums.get(id);
    if (cur) cur.value += n.value;
    else sums.set(id, { label, value: n.value });
  }
  return [...sums.values()].map((g) => `${g.label} +${g.value}`);
}

/** Display text of a node: "Attack +3", a skill node with the skill's name. */
export function nodeText(n: BoardNode, skillById: Map<number, Skill>): string {
  if (n.kind === 'S') return n.label;
  const skill = n.kind === 'K' ? skillById.get(Number(n.key)) : undefined;
  const value = n.value != null ? ` +${n.value}` : '';
  return skill ? `${skill.name}${value}` : `${n.label}${value}`;
}

/** One stat of the class priority with the board stat keys that carry it (PvE and PvP variants). */
export interface StatFocus { name: string; keys: Set<string> }

const partName = (x: string) => x.replace(/^PvP /, '');

/**
 * The class's stat priority (order of CLASS_STATS, names in the UI language) plus the stat keys of the nodes that
 * give each stat, so a chip can highlight its nodes. Stats only the PvP board carries are listed for PvP only.
 */
export function statFocusList(en: GameData, data: GameData, cls: ClassType, pvp: boolean): StatFocus[] {
  const list = CLASS_STATS[cls] ?? [];
  const local = new Map<string, string>();
  for (const b of data.daevanion.classes[cls]?.boards ?? []) for (const nd of b.nodes) if (nd.kind === 'T') local.set(String(nd.key), nd.label);
  const names = new Map<string, string>();
  const keys = new Map<string, Set<string>>();
  const pve = new Set<string>();
  for (const b of en.daevanion.classes[cls]?.boards ?? []) {
    for (const nd of b.nodes) {
      if (nd.kind !== 'T') continue;
      const own = nd.label.split(', ');
      const theirs = (local.get(String(nd.key)) ?? nd.label).split(', ');
      own.forEach((x, i) => {
        const name = partName(x);
        const isPvp = x.startsWith('PvP ');
        if (!isPvp) pve.add(name);
        if (!names.has(name) || !isPvp) names.set(name, theirs[i] ?? x);
        let set = keys.get(name);
        if (!set) keys.set(name, (set = new Set()));
        set.add(String(nd.key));
      });
    }
  }
  return list
    .filter((x) => (pvp || pve.has(x)) && names.has(x))
    .map((x) => ({ name: names.get(x)!, keys: keys.get(x) ?? new Set<string>() }));
}

/** Stat key -> position in the class priority (0 = most wanted). */
export function statRanks(list: StatFocus[]): Map<string, number> {
  const out = new Map<string, number>();
  list.forEach((f, i) => { for (const k of f.keys) if (!out.has(k)) out.set(k, i); });
  return out;
}

/** Skill ids the player uses: on the hotbar, in a stigma slot or levelled above 1. */
export function buildSkillIds(build: Build): Set<string> {
  const out = new Set<string>();
  for (const id of Object.values(build.bar ?? {})) out.add(String(id));
  for (const s of build.st ?? []) if (s.id != null) out.add(String(s.id));
  for (const [id, lv] of Object.entries(build.lv ?? {})) if (lv > 1) out.add(String(id));
  return out;
}
