import type { CSSProperties, DragEvent, MouseEvent } from 'react';
import { X, Zap } from 'lucide-react';
import type { GameData } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { BAR_COLS, BAR_KEYS, BAR_ROWS, slotKey, type Build } from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { skillLevel } from '../../lib/buildCalc';
import { timerState, type Timers } from './useCooldownTimers';

interface Props {
  data: GameData;
  build: Build;
  readOnly?: boolean;
  size?: number;
  /** skill currently picked in the palette */
  pick?: number | null;
  timers?: Timers;
  now?: number;
  onSlotClick?: (row: number, col: number, id: number | undefined) => void;
  onDropSkill?: (row: number, col: number, id: number) => void;
  onMove?: (from: string, to: string) => void;
  onClear?: (row: number, col: number) => void;
  onToggleAuto?: (id: number) => void;
}

const fmtRem = (s: number) => (s >= 10 ? String(Math.ceil(s)) : s.toFixed(1));

export function HotbarGrid({ data, build, readOnly, size = 46, pick, timers, now = 0, onSlotClick, onDropSkill, onMove, onClear, onToggleAuto }: Props) {
  const { t } = useLoadedGame();
  const rows = Array.from({ length: BAR_ROWS }, (_, i) => BAR_ROWS - 1 - i); // top row first, main row last
  const auto = new Set(build.auto);

  const onDrop = (e: DragEvent, row: number, col: number) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('text/plain');
    if (raw.startsWith('slot:')) onMove?.(raw.slice(5), slotKey(row, col));
    else if (raw.startsWith('skill:')) onDropSkill?.(row, col, Number(raw.slice(6)));
  };

  return (
    <div className={`hotbar ${readOnly ? 'readonly' : ''}`} style={{ '--slot': `${size}px` } as CSSProperties}>
      {rows.map((row) => (
        <div key={row} className={`hb-row ${row === 0 ? 'main' : ''}`}>
          <span className="hb-label">{row === 0 ? t('mainBar') : t('stackRow', { n: row + 1 })}</span>
          <div className="hb-slots">
            {Array.from({ length: BAR_COLS }, (_, col) => {
              const id = build.bar[slotKey(row, col)];
              const skill = id ? data.skillById.get(id) : undefined;
              const st = skill && timers ? timerState(timers[skill.id], now) : null;
              const isAuto = !!skill && auto.has(skill.id);
              return (
                <div
                  key={col}
                  className={`slot ${skill ? 'filled' : ''} ${isAuto ? 'auto' : ''} ${pick ? 'target' : ''} ${st?.zero ? 'pulse' : ''}`}
                  onClick={() => onSlotClick?.(row, col, skill?.id)}
                  onContextMenu={(e: MouseEvent) => { if (readOnly || !skill) return; e.preventDefault(); onToggleAuto?.(skill.id); }}
                  onDragOver={readOnly ? undefined : (e) => e.preventDefault()}
                  onDrop={readOnly ? undefined : (e) => onDrop(e, row, col)}
                  draggable={!readOnly && !!skill}
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', `slot:${slotKey(row, col)}`)}
                >
                  {skill && <SkillTile skill={skill} level={skillLevel(data, build, skill)} size={size} cdr={build.cdr} />}
                  {isAuto && <span className="slot-auto" title={t('autoUseHint')}>A</span>}
                  {st && !st.zero && (
                    <span className="sweep" style={{ '--p': st.frac } as CSSProperties}><b>{fmtRem(st.sec)}</b></span>
                  )}
                  {row === 0 && <span className="slot-key">{BAR_KEYS[col]}</span>}
                  {skill && !readOnly && (
                    <span className="slot-tools">
                      <button type="button" title={t('autoUse')} aria-label={t('autoUse')} className={isAuto ? 'on' : ''}
                        onClick={(e) => { e.stopPropagation(); onToggleAuto?.(skill.id); }}><Zap size={11} /></button>
                      <button type="button" title={t('clear')} aria-label={t('clear')}
                        onClick={(e) => { e.stopPropagation(); onClear?.(row, col); }}><X size={11} /></button>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
