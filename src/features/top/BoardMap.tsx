import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ZoomIn } from 'lucide-react';
import type { Board, BoardNode } from '../../data/types';
import type { StringKey } from '../../i18n/strings';
import { useLoadedGame } from '../../data/GameDataContext';
import { MQ, useMediaQuery } from '../../components/hooks';
import { nodeKey } from '../../lib/daevanionGraph';
import { boardBox, nodeText } from '../daevanion/dvModel';

/*
 * A Daevanion board drawn read-only: either a heat map (how many of the top players learned each node) or one
 * player's learned nodes. Colour = node grade, shape = kind (round = skill level, square = stat), fill = share.
 * One tab stop for the board; arrow keys move between nodes; the line under the board names the node in focus.
 * Phones: "Zoom" shows the board with touch-sized nodes in a box that pans with one finger (like the planner's board).
 */

const ARROWS: Record<string, [number, number]> = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
const GRADES = ['Common', 'Rare', 'Legend', 'Unique'] as const;

/** The nearest node in a direction (straight line first, then the closest diagonal neighbour). */
function step(board: Board, from: BoardNode, dx: number, dy: number): BoardNode | null {
  let best: BoardNode | null = null;
  let score = Infinity;
  for (const n of board.nodes) {
    const along = (n.x - from.x) * dx + (n.y - from.y) * dy;
    if (along <= 0) continue;
    const s = along + Math.abs(dx ? n.y - from.y : n.x - from.x) * 2.5;
    if (s < score) { score = s; best = n; }
  }
  return best;
}

type Mode = { heat: Map<string, number>; of: number } | { learned: Set<string> };

export function BoardMap({ board, mode }: { board: Board; mode: Mode }) {
  const { t, data } = useLoadedGame();
  const box = boardBox(board);
  const legendId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const phone = useMediaQuery(MQ.phone);
  const [zoom, setZoom] = useState(false);
  const zoomed = phone && zoom;
  const start = board.nodes.find((n) => n.kind === 'S') ?? board.nodes[0];
  const [sel, setSel] = useState<string | null>(null);
  const selNode = sel ? board.nodes.find((n) => nodeKey(n) === sel) : undefined;
  const tabKey = selNode ? sel : nodeKey(start);
  const size = box.cols >= 14 ? 'l' : box.cols >= 12 ? 'm' : 's';
  const heat = 'heat' in mode;

  // zooming in starts at the selected node or the start node in the middle of the box
  useEffect(() => {
    const w = scrollRef.current;
    if (!zoomed || !w) return;
    const el = w.querySelector<HTMLElement>('.tn.sel') ?? w.querySelector<HTMLElement>('.tn.k-S');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const wr = w.getBoundingClientRect();
    w.scrollLeft += r.left + r.width / 2 - (wr.left + wr.width / 2);
    w.scrollTop += r.top + r.height / 2 - (wr.top + wr.height / 2);
  }, [zoomed]);

  const describe = (n: BoardNode) => {
    if (n.kind === 'S') return t('start');
    const what = `${nodeText(n, data.skillById)} (${t(`grade_${n.grade}` as StringKey)})`;
    const k = nodeKey(n);
    const state = 'heat' in mode
      ? t('topLearnedBy', { n: mode.heat.get(k) ?? 0, m: mode.of })
      : mode.learned.has(k) ? t('topLearned') : t('topNotLearned');
    return `${what}: ${state}`;
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, n: BoardNode) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const dir = ARROWS[e.key];
    const next = dir ? step(board, n, dir[0], dir[1]) : e.key === 'Home' ? start : undefined;
    if (next === undefined) return;
    e.preventDefault();
    if (!next) return;
    setSel(nodeKey(next));
    ref.current?.querySelector<HTMLButtonElement>(`[data-k="${nodeKey(next)}"]`)?.focus();
  };

  return (
    <div className={`top-board-wrap ${zoomed ? 'zoomed' : ''}`}>
      {phone && (
        <div className="top-board-tools">
          <button type="button" className="btn sm ghost" aria-pressed={zoom} onClick={() => setZoom((z) => !z)} title={t('dvZoomLabel')}>
            <ZoomIn size={15} aria-hidden /> {t('dvZoom')}
          </button>
        </div>
      )}
      <div className="top-board-scroll" ref={scrollRef}>
        <div
          ref={ref}
          className={`top-board size-${size}`}
          style={{ '--cols': box.cols, '--rows': box.rows } as CSSProperties}
          role="group"
          aria-label={board.name}
          aria-describedby={legendId}
        >
          {board.nodes.map((n) => {
            const k = nodeKey(n);
            const count = heat ? mode.heat.get(k) ?? 0 : 0;
            const on = n.kind === 'S' || (heat ? count > 0 : mode.learned.has(k));
            const share = heat ? count / Math.max(1, mode.of) : on ? 1 : 0;
            const cls = ['tn', `k-${n.kind}`, `g-${n.grade}`, on ? 'on' : 'off', sel === k ? 'sel' : '']
              .filter(Boolean).join(' ');
            return (
              <button
                key={k}
                type="button"
                data-k={k}
                className={cls}
                style={{ gridColumn: n.x - box.minX + 1, gridRow: n.y - box.minY + 1, '--p': `${Math.round(14 + share * 66)}%` } as CSSProperties}
                tabIndex={k === tabKey ? 0 : -1}
                aria-label={describe(n)}
                onClick={() => setSel(k)}
                onFocus={() => setSel(k)}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') setSel(k); }}
                onKeyDown={(e) => onKey(e, n)}
              >
                {heat && count > 0 && n.kind !== 'S' && <span className="tn-n" aria-hidden>{count}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {/* the node in focus (keyboard, tap or mouse); the same text is the button's name for screen readers */}
      <p className="top-board-info" aria-hidden>{selNode ? describe(selNode) : t('topBoardHint')}</p>
      <ul className="top-legend" id={legendId}>
        {heat
          ? <li><span className="top-scale" aria-hidden /> {t('topHeatLegend', { m: mode.of })}</li>
          : <li><span className="lg-swatch on" aria-hidden /> {t('dvLegendLearned')}</li>}
        {GRADES.map((g) => <li key={g}><span className={`grade-dot ${g}`} aria-hidden />{t(`grade_${g}`)}</li>)}
        <li><span className="legend-shape round" aria-hidden />{t('skillNode')}</li>
      </ul>
    </div>
  );
}

export interface BoardTab { id: number; name: string; meta: string; label: string }

/** The boards as a row of buttons ("Nezekan · Ø 54 / 88"). */
export function BoardPicker({ boards, value, onChange, label }: { boards: BoardTab[]; value: number; onChange: (id: number) => void; label: string }) {
  return (
    <div className="top-boards" role="group" aria-label={label}>
      {boards.map((b) => (
        <button key={b.id} type="button" className={b.id === value ? 'on' : ''} aria-pressed={b.id === value} aria-label={b.label} onClick={() => onChange(b.id)}>
          <span className="tb-name">{b.name}</span>
          <span className="tb-meta" aria-hidden>{b.meta}</span>
        </button>
      ))}
    </div>
  );
}
