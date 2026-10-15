import { useRef, useState, type CSSProperties, type DragEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { TriangleAlert, X, Zap } from 'lucide-react';
import type { GameData } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { BAR_GROUPS, BAR_KEYS, BAR_ROWS, BASIC_COL, STIGMA_COLS, slotKey, type Build } from '../../state/build';
import { keyLabel } from '../../lib/keyLabel';
import { SkillTile } from '../../components/SkillTile';
import { skillLevel } from '../../lib/buildCalc';
import { timerState, type Timers } from './useCooldownTimers';
import { blockedSlots, isHotbarDrag, readDrag, startDrag } from './keyStacks';

/** The last key press of the cooldown test: the slot that fired, or none (every skill of the key was on cooldown). */
export interface FiredKey { col: number; slot: string | null; n: number }

interface Props {
  data: GameData;
  build: Build;
  /** read-only view (community): no buttons, no editing */
  readOnly?: boolean;
  /** tile size in px; without it the grid picks its size from the space it has */
  size?: number;
  /** a skill is picked in the palette: every slot is a target */
  pick?: number | null;
  /** a slot ("row:col") is being moved: every other slot is a target */
  moving?: string | null;
  /** cooldown test: keys show what to press, no tooltips, no editing */
  testing?: boolean;
  timers?: Timers;
  now?: number;
  fired?: FiredKey | null;
  /** click, tap, Enter or Space on a slot */
  onActivate?: (row: number, col: number, opts: { shift: boolean }) => void;
  onDropSkill?: (row: number, col: number, id: number) => void;
  onMove?: (from: string, to: string) => void;
  onClear?: (row: number, col: number) => void;
  onToggleAuto?: (id: number) => void;
}

const fmtRem = (s: number) => (s >= 10 ? String(Math.ceil(s)) : s.toFixed(1));
const ARROWS: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
const ROWS = Array.from({ length: BAR_ROWS }, (_, i) => i);

/**
 * The hotbar like the skill window in game: groups 1–4 | 5–8 | Q, E, basic attack, T; every key holds a stack of
 * four slots and fires the first ready one (0 first). Wide: keys are columns with slot 0 at the bottom above the key cap.
 * Narrow (phones): one line per key, "[key] 0 1 2 3" – the order in which the key tries its skills.
 * Editable: a grid with one tab stop (arrow keys move, Enter places or opens the slot menu, Delete clears, A = auto-use).
 */
export function HotbarGrid({
  data, build, readOnly, size, pick, moving, testing, timers, now = 0, fired,
  onActivate, onDropSkill, onMove, onClear, onToggleAuto,
}: Props) {
  const { t } = useLoadedGame();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() => slotKey(0, BAR_GROUPS[0][0]));
  const [over, setOver] = useState<string | null>(null);
  const editable = !readOnly && !testing;
  const targeting = editable && (pick != null || !!moving);
  const groupNames = [t('barGroup1'), t('barGroup2'), t('barGroup3')];
  const auto = new Set(build.auto);
  const blocked = blockedSlots(data, build);
  const style = size ? ({ '--slot-pref': `${size}px` } as CSSProperties) : undefined;

  const keyName = (col: number) => (testing ? BAR_KEYS[col] : keyLabel(col, t));

  /** arrow keys: focus the nearest slot in that direction (works for both layouts) */
  const navigate = (e: KeyboardEvent<HTMLButtonElement>, [dx, dy]: [number, number]) => {
    const from = e.currentTarget.getBoundingClientRect();
    const cx = from.left + from.width / 2;
    const cy = from.top + from.height / 2;
    let best: HTMLElement | null = null;
    let bestScore = Infinity;
    for (const el of Array.from(root.current?.querySelectorAll<HTMLElement>('.slot-hit') ?? [])) {
      if (el === e.currentTarget) continue;
      const r = el.getBoundingClientRect();
      const ddx = r.left + r.width / 2 - cx;
      const ddy = r.top + r.height / 2 - cy;
      const along = dx ? ddx * dx : ddy * dy;
      if (along < 2) continue;
      const score = along + (dx ? Math.abs(ddy) : Math.abs(ddx)) * 3;
      if (score < bestScore) { bestScore = score; best = el; }
    }
    e.preventDefault();
    best?.focus();
  };

  const onDrop = (e: DragEvent, row: number, col: number) => {
    setOver(null);
    const p = readDrag(e);
    if (!p) return;
    e.preventDefault();
    if (p.kind === 'slot') onMove?.(p.key, slotKey(row, col));
    else onDropSkill?.(row, col, p.id);
  };

  return (
    <div className="hotbar-wrap">
      <div
        ref={root}
        className={`hotbar ${readOnly ? 'readonly' : 'editable'} ${testing ? 'testing' : ''} ${targeting ? 'targeting' : ''}`}
        style={style}
        role={readOnly ? 'table' : 'grid'}
        aria-label={t('skillBar')}
      >
        {/* wide layout: the stack positions next to the first group (3 at the top, 0 at the bottom) */}
        <div className="hb-legend" aria-hidden>
          {[...ROWS].reverse().map((row) => (
            <span key={row} className={`hb-pos ${row === 0 ? 'first' : ''}`}>
              <b>{row}</b>{row === 0 && <small>{t('stackFirst')}</small>}
            </span>
          ))}
        </div>

        {BAR_GROUPS.map((cols, gi) => (
          <div key={gi} className={`hb-group ${gi === 1 ? 'stigma' : ''}`}>
            <div className="hb-group-title" aria-hidden title={groupNames[gi]}>{groupNames[gi]}</div>
            <div className="hb-keys">
              {cols.map((col) => {
                const miss = fired && fired.slot === null && fired.col === col;
                return (
                  <div key={col} className="hb-key" role="row" aria-label={t('column', { n: keyLabel(col, t) })}>
                    <kbd
                      key={miss ? `miss-${fired.n}` : 'kbd'}
                      className={`hb-kbd ${miss ? 'miss' : ''}`}
                      role="rowheader"
                      title={col === BASIC_COL ? t('keyLmbTitle') : undefined}
                    >
                      {keyName(col)}
                    </kbd>
                    {ROWS.map((row) => {
                      const k = slotKey(row, col);
                      const id = build.bar[k];
                      const skill = id ? data.skillById.get(id) : undefined;
                      const st = skill && timers ? timerState(timers[skill.id], now) : null;
                      const isAuto = !!skill && auto.has(skill.id);
                      const blocker = skill ? blocked.get(k) : undefined;
                      const key = keyLabel(col, t);
                      let label = skill ? t('slotLabel', { key, row, skill: skill.name }) : t('slotEmptyLabel', { key, row });
                      if (isAuto) label += `, ${t('slotAutoOn')}`;
                      if (blocker) label += `. ${t('slotBlocked', { skill: blocker.name })}`;
                      const cls = [
                        'slot', `r${row}`,
                        STIGMA_COLS.includes(col) ? 'stigma-col' : '',
                        skill ? 'filled' : '',
                        isAuto ? 'auto' : '',
                        blocker ? 'blocked' : '',
                        moving === k ? 'moving' : '',
                        over === k ? 'drop-over' : '',
                      ].filter(Boolean).join(' ');
                      const tile = skill && (
                        <SkillTile skill={skill} level={skillLevel(data, build, skill)} size={size ?? 46} cdr={build.cdr} tip={!testing} />
                      );
                      return (
                        <div
                          key={row}
                          className={cls}
                          role={readOnly ? 'cell' : 'gridcell'}
                          aria-label={readOnly ? label : undefined}
                          onDragOver={editable ? (e) => { if (isHotbarDrag(e)) e.preventDefault(); } : undefined}
                          onDragEnter={editable ? (e) => { if (isHotbarDrag(e)) setOver(k); } : undefined}
                          onDragLeave={editable ? (e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver((o) => (o === k ? null : o)); } : undefined}
                          onDrop={editable ? (e) => onDrop(e, row, col) : undefined}
                        >
                          {readOnly ? (tile || <span className="slot-pos" aria-hidden>{row}</span>) : (
                            <button
                              type="button"
                              className="slot-hit"
                              data-slot={k}
                              tabIndex={active === k ? 0 : -1}
                              aria-label={label}
                              draggable={editable && !!skill}
                              onDragStart={(e) => startDrag(e, { kind: 'slot', key: k })}
                              onDragEnd={() => setOver(null)}
                              onFocus={() => setActive(k)}
                              onClick={(e: MouseEvent) => onActivate?.(row, col, { shift: e.shiftKey })}
                              onContextMenu={(e) => {
                                if (!editable || !skill) return;
                                e.preventDefault();
                                onToggleAuto?.(skill.id);
                              }}
                              onKeyDown={(e) => {
                                const dir = ARROWS[e.key];
                                if (dir) { navigate(e, dir); return; }
                                if (!editable || !skill || e.ctrlKey || e.metaKey || e.altKey) return;
                                if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); onClear?.(row, col); }
                                else if (e.key === 'a' || e.key === 'A') { e.preventDefault(); onToggleAuto?.(skill.id); }
                              }}
                            >
                              {tile || <span className="slot-pos" aria-hidden>{row}</span>}
                            </button>
                          )}
                          {isAuto && <span className="slot-auto" aria-hidden title={t('autoUseHint')}><Zap size={11} strokeWidth={2.5} /></span>}
                          {blocker && <span className="slot-warn" aria-hidden title={t('slotBlocked', { skill: blocker.name })}><TriangleAlert size={11} strokeWidth={2.5} /></span>}
                          {st && !st.zero && (
                            <span className="sweep" style={{ '--p': st.frac } as CSSProperties}><b>{fmtRem(st.sec)}</b></span>
                          )}
                          {fired && fired.slot === k && <span key={fired.n} className="slot-flash" aria-hidden />}
                          {skill && editable && (
                            <span className="slot-tools">
                              <button type="button" tabIndex={-1} title={t('autoUse')} aria-label={t('autoUse')} aria-pressed={isAuto} className={isAuto ? 'on' : ''}
                                onClick={(e) => { e.stopPropagation(); onToggleAuto?.(skill.id); }}><Zap size={13} /></button>
                              <button type="button" tabIndex={-1} title={t('slotRemove')} aria-label={t('slotRemove')}
                                onClick={(e) => { e.stopPropagation(); onClear?.(row, col); }}><X size={13} /></button>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
