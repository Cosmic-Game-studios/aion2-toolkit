import type { ReactNode } from 'react';
import { Timer } from 'lucide-react';
import { cdTier, fmtCdLong, fmtCdShort } from '../lib/cooldown';

/** Coloured cooldown chip. `base` shows the value before reduction. */
export function CdChip({ cd, base, short, label }: { cd: number; base?: number; short?: boolean; label?: string }) {
  const fmt = short ? fmtCdShort : fmtCdLong;
  return (
    <span className={`cd-chip cd-${cdTier(cd)}`} title={label}>
      <Timer size={13} aria-hidden />
      {cd > 0 ? fmt(cd) : '–'}
      {base != null && base > 0 && base !== cd && <s>{fmt(base)}</s>}
    </span>
  );
}

export function PageHeader({ icon, title, subtitle, actions }: { icon?: ReactNode; title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="page-header">
      {icon && <div className="page-icon">{icon}</div>}
      <div className="page-titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

export function Card({ title, icon, extra, children, className = '' }: { title?: ReactNode; icon?: ReactNode; extra?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`card ${className}`}>
      {(title || extra) && (
        <header className="card-head">
          <h2>{icon}{title}</h2>
          {extra && <div className="card-extra">{extra}</div>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; label?: string }) {
  return (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={o.value === value} className={o.value === value ? 'on' : ''} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Meter({ label, spent, max, hint, icon }: { label: string; spent: number; max: number; hint?: string; icon?: ReactNode }) {
  const pct = max > 0 ? Math.min(100, (spent / max) * 100) : 0;
  const over = spent > max;
  return (
    <div className={`meter ${over ? 'over' : ''}`} title={hint}>
      <div className="meter-head">
        <span>{icon}{label}</span>
        <strong>{spent}<span className="meter-max"> / {max}</span></strong>
      </div>
      <div className="meter-track"><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

/** Clickable pips for levels 1..max; `bands` groups pips visually (e.g. 5 for stigma cost bands). */
export function LevelPips({ value, max, onChange, disabled, bands, marks }: { value: number; max: number; onChange: (v: number) => void; disabled?: boolean; bands?: number; marks?: number[] }) {
  return (
    <div className={`pips ${disabled ? 'disabled' : ''}`} role="slider" aria-valuemin={1} aria-valuemax={max} aria-valuenow={value} tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); onChange(Math.min(max, value + 1)); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); onChange(Math.max(1, value - 1)); }
      }}>
      {Array.from({ length: max }, (_, i) => i + 1).map((lv) => (
        <button
          key={lv}
          type="button"
          tabIndex={-1}
          disabled={disabled}
          className={`pip ${lv <= value ? 'on' : ''} ${bands && lv % bands === 0 && lv < max ? 'band-end' : ''} ${marks?.includes(lv) ? 'mark' : ''}`}
          onClick={() => onChange(lv === value && lv > 1 ? lv - 1 : lv)}
          aria-label={String(lv)}
          title={String(lv)}
        />
      ))}
    </div>
  );
}

export function EmptyState({ icon, text, action }: { icon?: ReactNode; text: string; action?: ReactNode }) {
  return (
    <div className="empty">
      {icon}
      <p>{text}</p>
      {action}
    </div>
  );
}
