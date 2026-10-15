import { memo, useMemo, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type MouseEvent } from 'react';
import type { Board, BoardNode, Skill } from '../../data/types';
import { nodeKey } from '../../lib/daevanionGraph';
import { iconUrl } from '../../data/loadData';
import { useGame } from '../../data/GameDataContext';
import { boardBox, frontier, nodeValueShort } from './dvModel';

/** How a node was activated: `touch` = finger or pen (select first, learn on the second tap). */
export interface NodeClickInfo { shift: boolean; touch: boolean }

interface Props {
  board: Board;
  learned: Set<string>;
  /** nodes outlined as the route preview */
  routeKeys: Set<string>;
  skillById: Map<number, Skill>;
  /** node under the mouse or the keyboard focus (drawn a little bigger) */
  hoverKey?: string | null;
  /** node picked by a tap – ring until it is learned or the selection is cleared */
  selectedKey?: string | null;
  /** learned nodes that a removal would drop (red preview) */
  dropKeys?: Set<string>;
  /** stat focus: stat nodes whose key is in the set are highlighted, the rest of the board steps back */
  highlight?: Set<string> | null;
  /** skill ids of the player's build: their skill nodes get a green dot */
  mine?: Set<string>;
  onClick: (node: BoardNode, info: NodeClickInfo) => void;
  onHover?: (node: BoardNode | null) => void;
  /** id of the element that describes the board (legend, hint) */
  describedBy?: string;
}

const SIZE = 15;
/** [dx, dy] per arrow key: x is the row, y the column (see boardBox) */
const ARROWS: Record<string, [number, number]> = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] };

/** The nearest node in a direction (straight line first, then the closest diagonal neighbour). */
function step(board: Board, from: BoardNode, dx: number, dy: number): BoardNode | null {
  let best: BoardNode | null = null;
  let score = Infinity;
  for (const n of board.nodes) {
    const along = (n.x - from.x) * dx + (n.y - from.y) * dy;
    if (along <= 0) continue;
    const off = Math.abs(dx ? n.y - from.y : n.x - from.x);
    const s = along + off * 2.5;
    if (s < score) { score = s; best = n; }
  }
  return best;
}

/** True for keyboard focus, false for focus that came with a tap or click. */
const keyboardFocus = (el: Element) => {
  try { return el.matches(':focus-visible'); } catch { return true; }
};

function BoardGridView({
  board, learned, routeKeys, skillById, hoverKey, selectedKey, dropKeys, highlight, mine, onClick, onHover, describedBy,
}: Props) {
  const { t } = useGame();
  const box = boardBox(board);
  const open = useMemo(() => frontier(board, learned), [board, learned]);
  const startKey = useMemo(() => nodeKey(board.nodes.find((n) => n.kind === 'S') ?? board.nodes[0]), [board]);
  // one tab stop for the whole board (roving tabindex); arrow keys move between nodes
  const [active, setActive] = useState<{ b: number; k: string } | null>(null);
  const tabKey = active?.b === board.id ? active.k : selectedKey ?? startKey;
  const pointer = useRef('mouse');
  const ref = useRef<HTMLDivElement>(null);
  const focusing = !!highlight;
  const size = box.cols >= 14 ? 'l' : box.cols >= 12 ? 'm' : 's';

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, n: BoardNode) => {
    // Alt+← (back) and other shortcuts stay with the browser
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    let next: BoardNode | null | undefined;
    const dir = ARROWS[e.key];
    if (dir) next = step(board, n, dir[0], dir[1]);
    else if (e.key === 'Home') next = board.nodes.find((x) => nodeKey(x) === startKey);
    else return;
    e.preventDefault();
    if (!next) return;
    const k = nodeKey(next);
    setActive({ b: board.id, k });
    ref.current?.querySelector<HTMLButtonElement>(`[data-k="${k}"]`)?.focus();
  };

  const onNodeClick = (e: MouseEvent<HTMLButtonElement>, n: BoardNode) => {
    // detail 0 = Enter / Space; a tap reports its pointer type in pointerdown first
    const touch = e.detail > 0 && pointer.current !== 'mouse';
    onClick(n, { shift: e.shiftKey, touch });
  };

  const onNodeFocus = (e: FocusEvent<HTMLButtonElement>, n: BoardNode) => {
    setActive({ b: board.id, k: nodeKey(n) });
    if (keyboardFocus(e.currentTarget)) onHover?.(n);
  };

  return (
    <div
      ref={ref}
      className={`board-grid size-${size} ${focusing ? 'focusing' : ''}`}
      style={{ '--cols': box.cols, '--rows': box.rows } as CSSProperties}
      role="group"
      aria-label={board.name}
      aria-describedby={describedBy}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') onHover?.(null); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onHover?.(null); }}
    >
      {board.nodes.map((n) => {
        const k = nodeKey(n);
        const isLearned = n.kind === 'S' || learned.has(k);
        const learnable = open.has(k);
        const skill = n.kind === 'K' ? skillById.get(Number(n.key)) : undefined;
        const isMine = n.kind === 'K' && !!mine?.has(String(n.key));
        const match = focusing && n.kind === 'T' && highlight!.has(String(n.key));
        const cls = [
          'node',
          `kind-${n.kind}`,
          `grade-${n.grade}`,
          isLearned ? 'learned' : '',
          learnable ? 'learnable' : '',
          routeKeys.has(k) ? 'route' : '',
          hoverKey === k ? 'hover' : '',
          selectedKey === k ? 'selected' : '',
          dropKeys?.has(k) ? 'drop' : '',
          match ? 'match' : '',
          isMine ? 'mine' : '',
        ].filter(Boolean).join(' ');
        const value = n.value != null && n.kind !== 'S' ? ` +${n.value}` : '';
        const state = n.kind === 'S' ? '' : isLearned ? t('learned') : learnable ? t('dvCanLearn') : '';
        const label = n.kind === 'S'
          ? t('start')
          : [`${skill?.name ?? n.label}${value}`, `${n.cost} ${t('pts')}`, state, isMine ? t('dvLegendMine') : '']
            .filter(Boolean).join(', ');
        return (
          <button
            key={k}
            type="button"
            data-k={k}
            className={cls}
            style={{ gridColumn: n.y - box.minY + 1, gridRow: n.x - box.minX + 1 }}
            tabIndex={k === tabKey ? 0 : -1}
            aria-disabled={n.kind === 'S' || undefined}
            aria-current={selectedKey === k || undefined}
            aria-label={label}
            onPointerDown={(e) => { pointer.current = e.pointerType; }}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover?.(n); }}
            onClick={(e) => onNodeClick(e, n)}
            onFocus={(e) => onNodeFocus(e, n)}
            onKeyDown={(e) => onKey(e, n)}
          >
            {skill
              ? <img src={iconUrl(skill.icon)} alt="" draggable={false} loading="lazy" decoding="async" />
              : n.kind === 'S' ? <span className="start-dot" /> : <span className="node-val" aria-hidden>{nodeValueShort(n)}</span>}
            {isMine && <span className="node-mine" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}

/** A Daevanion board, cropped to the rows and columns it uses. */
export const BoardGrid = memo(BoardGridView);

export const BOARD_SIZE = SIZE;
