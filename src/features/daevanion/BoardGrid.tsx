import type { Board, BoardNode, Skill } from '../../data/types';
import { canLearn, nodeKey } from '../../lib/daevanionGraph';
import { iconUrl } from '../../data/loadData';

interface Props {
  board: Board;
  learned: Set<string>;
  routeKeys: Set<string>;
  skillById: Map<number, Skill>;
  hoverKey?: string | null;
  readOnly?: boolean;
  onClick?: (node: BoardNode, shift: boolean) => void;
  onHover?: (node: BoardNode | null) => void;
}

const SIZE = 15;

export function BoardGrid({ board, learned, routeKeys, skillById, hoverKey, readOnly, onClick, onHover }: Props) {
  return (
    <div className={`board-grid ${readOnly ? 'readonly' : ''}`} onMouseLeave={() => onHover?.(null)}>
      {board.nodes.map((n) => {
        const k = nodeKey(n);
        const isLearned = n.kind === 'S' || learned.has(k);
        const learnable = !readOnly && !isLearned && canLearn(board, learned, n);
        const skill = n.kind === 'K' ? skillById.get(Number(n.key)) : undefined;
        const cls = [
          'node',
          `kind-${n.kind}`,
          `grade-${n.grade}`,
          isLearned ? 'learned' : '',
          learnable ? 'learnable' : '',
          routeKeys.has(k) ? 'route' : '',
          hoverKey === k ? 'hover' : '',
        ].filter(Boolean).join(' ');
        return (
          <button
            key={k}
            type="button"
            className={cls}
            style={{ gridColumn: n.x, gridRow: n.y }}
            disabled={readOnly}
            onClick={(e) => onClick?.(n, e.shiftKey)}
            onMouseEnter={() => onHover?.(n)}
            onFocus={() => onHover?.(n)}
            aria-pressed={n.kind === 'S' ? undefined : isLearned}
            aria-label={`${n.label}${n.value != null && n.kind === 'T' ? ` +${n.value}` : ''} (${n.cost})`}
          >
            {skill ? <img src={iconUrl(skill.icon)} alt="" draggable={false} /> : n.kind === 'S' ? <span className="start-dot" /> : <span className="node-val">{abbr(n)}</span>}
          </button>
        );
      })}
    </div>
  );
}

export const BOARD_SIZE = SIZE;

function abbr(n: BoardNode): string {
  if (n.value == null) return '';
  return n.value >= 1000 ? `${Math.round(n.value / 100) / 10}k` : String(n.value);
}
