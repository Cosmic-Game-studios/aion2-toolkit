import type { Board, BoardNode } from '../data/types';

export const nodeKey = (n: { x: number; y: number }) => `${n.x},${n.y}`;
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]] as const;

function startNode(board: Board): BoardNode {
  return board.nodes.find((n) => n.kind === 'S') ?? board.nodes[0];
}

export function nodeMap(board: Board): Map<string, BoardNode> {
  return new Map(board.nodes.map((n) => [nodeKey(n), n]));
}

function neighbours(n: BoardNode, map: Map<string, BoardNode>): BoardNode[] {
  const out: BoardNode[] = [];
  for (const [dx, dy] of DIRS) {
    const m = map.get(`${n.x + dx},${n.y + dy}`);
    if (m) out.push(m);
  }
  return out;
}

/** Keys reachable from the start node walking only through learned nodes. */
export function connectedSet(board: Board, learned: Set<string>): Set<string> {
  const map = nodeMap(board);
  const start = startNode(board);
  const seen = new Set<string>([nodeKey(start)]);
  const stack = [start];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const nb of neighbours(cur, map)) {
      const k = nodeKey(nb);
      if (!seen.has(k) && learned.has(k)) { seen.add(k); stack.push(nb); }
    }
  }
  return seen;
}

export function canLearn(board: Board, learned: Set<string>, node: BoardNode): boolean {
  if (node.kind === 'S') return false;
  if (learned.has(nodeKey(node))) return false;
  const map = nodeMap(board);
  return neighbours(node, map).some((nb) => nb.kind === 'S' || learned.has(nodeKey(nb)));
}

/** Learn one node (only if adjacent to the connected tree). Returns a new set. */
export function learn(board: Board, learned: Set<string>, node: BoardNode): Set<string> {
  if (!canLearn(board, learned, node)) return learned;
  const next = new Set(learned);
  next.add(nodeKey(node));
  return next;
}

/** Unlearn a node and everything that only hung off it. */
export function unlearn(board: Board, learned: Set<string>, node: BoardNode): Set<string> {
  const next = new Set(learned);
  next.delete(nodeKey(node));
  const reach = connectedSet(board, next);
  for (const k of next) if (!reach.has(k)) next.delete(k);
  return next;
}

/** Cheapest set of additional nodes connecting the learned tree to `target` (Dijkstra on node cost). */
export function cheapestPath(board: Board, learned: Set<string>, target: BoardNode): BoardNode[] | null {
  const map = nodeMap(board);
  const start = startNode(board);
  const tree = new Set(learned);
  tree.add(nodeKey(start));
  const tKey = nodeKey(target);
  if (tree.has(tKey)) return [];

  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const open: { k: string; d: number }[] = [];
  for (const k of tree) { dist.set(k, 0); prev.set(k, null); open.push({ k, d: 0 }); }

  while (open.length) {
    open.sort((a, b) => a.d - b.d);
    const { k, d } = open.shift()!;
    if (d > (dist.get(k) ?? Infinity)) continue;
    if (k === tKey) break;
    const cur = map.get(k)!;
    for (const nb of neighbours(cur, map)) {
      if (nb.kind === 'S') continue;
      const nk = nodeKey(nb);
      const nd = d + (tree.has(nk) ? 0 : nb.cost);
      if (nd < (dist.get(nk) ?? Infinity)) {
        dist.set(nk, nd);
        prev.set(nk, k);
        open.push({ k: nk, d: nd });
      }
    }
  }
  if (!dist.has(tKey)) return null;
  const path: BoardNode[] = [];
  let k: string | null = tKey;
  while (k && !tree.has(k)) { path.push(map.get(k)!); k = prev.get(k) ?? null; }
  return path.reverse();
}

export function boardCost(board: Board, learned: Set<string>): number {
  let total = 0;
  for (const n of board.nodes) if (n.kind !== 'S' && learned.has(nodeKey(n))) total += n.cost;
  return total;
}

export function allNodeKeys(board: Board): Set<string> {
  return new Set(board.nodes.filter((n) => n.kind !== 'S').map(nodeKey));
}

/** Compact encoding: hex bitmask over the board's node order. */
export function encodeLearned(board: Board, learned: Set<string>): string {
  const bits: number[] = [];
  board.nodes.forEach((n, i) => { if (learned.has(nodeKey(n))) bits[i] = 1; });
  let hex = '';
  for (let i = 0; i < board.nodes.length; i += 4) {
    const v = (bits[i] ? 8 : 0) | (bits[i + 1] ? 4 : 0) | (bits[i + 2] ? 2 : 0) | (bits[i + 3] ? 1 : 0);
    hex += v.toString(16);
  }
  return hex.replace(/0+$/, '');
}

export function decodeLearned(board: Board, hex: string): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i < hex.length; i++) {
    const v = parseInt(hex[i], 16);
    if (Number.isNaN(v)) continue;
    for (let b = 0; b < 4; b++) {
      if (v & (8 >> b)) {
        const n = board.nodes[i * 4 + b];
        if (n && n.kind !== 'S') out.add(nodeKey(n));
      }
    }
  }
  // drop anything not connected (e.g. after a data update)
  const reach = connectedSet(board, out);
  for (const k of out) if (!reach.has(k)) out.delete(k);
  return out;
}
