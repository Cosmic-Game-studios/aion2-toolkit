import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ZoomIn } from 'lucide-react';
import type { Board, BoardNode } from '../../data/types';
import type { StringKey } from '../../i18n/strings';
import { useLoadedGame } from '../../data/GameDataContext';
import { iconUrl } from '../../data/loadData';
import { MQ, useMediaQuery } from '../../components/hooks';
import { nodeKey } from '../../lib/daevanionGraph';
import { boardBox, nodeText, nodeValueShort } from '../daevanion/dvModel';

/*
 * A Daevanion board drawn read-only with the planner's nodes (.board-grid, .node: skill icons, values, grade colours).
 * The chosen nodes (one player's, or the recommended ones) look like learned nodes in the planner; with `heat` a badge
 * on each node says how many of the top players learned it. One tab stop for the board; arrow keys move between
 * nodes; the line under the board names the node in focus. Phones: "Zoom" shows the board with touch-sized nodes in a
 * box that pans with one finger.
 */

/** [dx, dy] per arrow key: x is the row, y the column (see boardBox) */
const ARROWS: Record<string, [number, number]> = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] };
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

export function BoardMap({ board, learned, heat, labels = ['topLearned', 'topNotLearned'], mine, mineLabel = 'topLegendUsed' }: {
  board: Board;
  /** the chosen nodes (drawn like learned nodes in the planner) */
  learned: Set<string>;
  /** node key -> players who learned it, out of `of` (a count badge on each node) */
  heat?: { map: Map<string, number>; of: number };
  /** names of the two states: chosen, not chosen */
  labels?: [StringKey, StringKey];
  /** skill ids the build uses: their skill nodes get the planner's green dot */
  mine?: Set<string>;
  /** legend text of the green dot */
  mineLabel?: StringKey;
}) {
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
  const hasMine = !!mine && board.nodes.some((n) => n.kind === 'K' && mine.has(String(n.key)));

  // zooming in starts at the selected node or the start node in the middle of the box
  useEffect(() => {
    const w = scrollRef.current;
    if (!zoomed || !w) return;
    const el = w.querySelector<HTMLElement>('.node.selected') ?? w.querySelector<HTMLElement>('.node.kind-S');
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
    const state = t(learned.has(k) ? labels[0] : labels[1]);
    const count = heat ? `, ${t('topLearnedBy', { n: heat.map.get(k) ?? 0, m: heat.of })}` : '';
    const used = n.kind === 'K' && mine?.has(String(n.key)) ? `, ${t(mineLabel)}` : '';
    return `${what}: ${state}${count}${used}`;
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
          className={`board-grid top-grid size-${size}`}
          style={{ '--cols': box.cols, '--rows': box.rows } as CSSProperties}
          role="group"
          aria-label={board.name}
          aria-describedby={legendId}
        >
          {board.nodes.map((n) => {
            const k = nodeKey(n);
            const count = heat && n.kind !== 'S' ? heat.map.get(k) ?? 0 : 0;
            const on = n.kind !== 'S' && learned.has(k);
            const skill = n.kind === 'K' ? data.skillById.get(Number(n.key)) : undefined;
            const isMine = n.kind === 'K' && !!mine?.has(String(n.key));
            const cls = [
              'node', `kind-${n.kind}`, `grade-${n.grade}`,
              on ? 'learned' : '',
              count > 0 ? 'counted' : '',
              isMine ? 'mine' : '',
              sel === k ? 'selected' : '',
            ].filter(Boolean).join(' ');
            return (
              <button
                key={k}
                type="button"
                data-k={k}
                className={cls}
                style={{ gridColumn: n.y - box.minY + 1, gridRow: n.x - box.minX + 1 }}
                tabIndex={k === tabKey ? 0 : -1}
                aria-label={describe(n)}
                onClick={() => setSel(k)}
                onFocus={() => setSel(k)}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') setSel(k); }}
                onKeyDown={(e) => onKey(e, n)}
              >
                {skill
                  ? <img src={iconUrl(skill.icon)} alt="" draggable={false} loading="lazy" decoding="async" />
                  : n.kind === 'S' ? <span className="start-dot" /> : <span className="node-val" aria-hidden>{nodeValueShort(n)}</span>}
                {count > 0 && <span className="node-heat" aria-hidden>{count}</span>}
                {isMine && <span className="node-mine" aria-hidden />}
              </button>
            );
          })}
        </div>
      </div>
      {/* the node in focus (keyboard, tap or mouse); the same text is the button's name for screen readers */}
      <p className="top-board-info" aria-hidden>{selNode ? describe(selNode) : t('topBoardHint')}</p>
      <ul className="top-legend" id={legendId}>
        <li><span className="lg-node learned" aria-hidden />{t(labels[0])}</li>
        <li><span className="lg-node" aria-hidden />{t(labels[1])}</li>
        {heat && <li><span className="lg-count" aria-hidden>{heat.of}</span>{t(phone && !zoomed ? 'topHeatLegendZoom' : 'topHeatLegend', { m: heat.of })}</li>}
        {hasMine && <li><span className="lg-node round mine" aria-hidden />{t(mineLabel)}</li>}
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
