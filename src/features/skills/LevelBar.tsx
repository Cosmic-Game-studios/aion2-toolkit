import { useState, type KeyboardEvent } from 'react';

interface Props {
  value: number;
  max: number;
  onChange: (v: number) => void;
  /** accessible name, e.g. "Level of Shield Bash" */
  label: string;
  /** read out instead of the bare number, e.g. "Lv. 5 of 10" */
  valueText?: string;
  disabled?: boolean;
  /** groups the boxes, e.g. 5 for the stigma cost bands (each group stays together when the row wraps) */
  bands?: number;
  /** levels with a gold frame (stigma specialisation levels) */
  marks?: readonly number[];
  /** mouse tooltip per box, e.g. "Lv. 7 · 12 pts in total" */
  pipTitle?: (lv: number) => string;
  className?: string;
}

/**
 * Level boxes 1..max that work as one slider: a click or tap sets exactly that level (no toggling), the keyboard
 * uses arrows, Page Up / Page Down (one band) and Home / End. With a mouse, hovering previews what a click changes.
 * Visual base: the foundation `.pips` / `.pip` classes.
 */
export function LevelBar({ value, max, onChange, label, valueText, disabled, bands, marks, pipTitle, className = '' }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const set = (v: number) => {
    const n = Math.max(1, Math.min(max, v));
    if (n !== value) onChange(n);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = bands ?? 5;
    const to: Record<string, number> = {
      ArrowRight: value + 1, ArrowUp: value + 1, ArrowLeft: value - 1, ArrowDown: value - 1,
      PageUp: value + step, PageDown: value - step, Home: 1, End: max,
    };
    if (e.key in to) { e.preventDefault(); set(to[e.key]); }
  };

  const pip = (lv: number) => {
    let preview = '';
    if (hover != null && !disabled) {
      if (hover > value && lv > value && lv <= hover) preview = 'add';
      else if (hover < value && lv > hover && lv <= value) preview = 'drop';
    }
    return (
      <span
        key={lv}
        aria-hidden
        className={`pip ${lv <= value ? 'on' : ''} ${marks?.includes(lv) ? 'mark' : ''} ${preview}`}
        title={disabled ? undefined : pipTitle?.(lv)}
        onClick={() => { if (!disabled) set(lv); }}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHover(lv); }}
      />
    );
  };

  const levels = Array.from({ length: Math.max(0, max) }, (_, i) => i + 1);
  const groups: number[][] = [];
  if (bands) for (let i = 0; i < levels.length; i += bands) groups.push(levels.slice(i, i + bands));

  return (
    <div
      className={`pips level-bar ${bands ? 'banded' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      role="slider"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={max}
      aria-valuenow={Math.max(0, value)}
      aria-valuetext={valueText}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKey}
      onPointerLeave={() => setHover(null)}
    >
      {bands ? groups.map((g, i) => <span key={i} className="pip-band">{g.map(pip)}</span>) : levels.map(pip)}
    </div>
  );
}
