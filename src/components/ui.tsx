import { useEffect, useId, useState, type InputHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { Timer, TriangleAlert } from 'lucide-react';
import { cdTier, fmtCdLong, fmtCdShort } from '../lib/cooldown';
import { useGame } from '../data/GameDataContext';
import { GuidePanel, GuideToggle, useGuideOpen, type GuideDef } from './PageGuide';

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

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  /** one line; on phones it is hidden on planner pages (the "How it works" toggle explains the page) */
  subtitle?: string;
  actions?: ReactNode;
  /** "How it works": a toggle in the header, the steps open under it (by themselves only on the first visit) */
  guide?: GuideDef;
  /** extra help slot at the end of the actions (e.g. a link to the class guide) */
  help?: ReactNode;
}

export function PageHeader({ icon, title, subtitle, actions, guide, help }: PageHeaderProps) {
  return (
    <div className={`page-header ${guide ? 'has-guide' : ''}`}>
      {icon && <div className="page-icon" aria-hidden>{icon}</div>}
      <div className="page-titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {(actions || help) && <div className="page-actions">{actions}{help}</div>}
      {guide && <HeaderGuide guide={guide} />}
    </div>
  );
}

function HeaderGuide({ guide }: { guide: GuideDef }) {
  const [open, setOpen] = useGuideOpen(guide.id);
  const panelId = `guide-${useId().replace(/:/g, '')}`;
  return (
    <>
      <div className="page-help">
        <GuideToggle open={open} onToggle={() => setOpen(!open)} controls={panelId} count={guide.steps.length} />
      </div>
      {open && <GuidePanel id={panelId} steps={guide.steps} onClose={() => setOpen(false)} />}
    </>
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

/** Radio group as one row of buttons. One tab stop; arrow keys move the choice, Home / End jump to the ends.
 *  onChange only fires for a different option (clicking the chosen one again changes nothing). */
export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; label?: string }) {
  const pick = (v: T) => { if (v !== value) onChange(v); };
  const i = options.findIndex((o) => o.value === value);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = options.length;
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % n
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (Math.max(i, 0) - 1 + n) % n
        : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0 || !n || e.altKey || e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    pick(options[next].value);
    (e.currentTarget.children[next] as HTMLElement | undefined)?.focus();
  };
  return (
    <div className="segmented" role="radiogroup" aria-label={label} onKeyDown={onKey}>
      {options.map((o, k) => (
        <button
          key={o.value} type="button" role="radio" aria-checked={o.value === value} tabIndex={k === Math.max(i, 0) ? 0 : -1}
          className={o.value === value ? 'on' : ''} onClick={() => pick(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Budget bar. `showLeft` adds "12 left" / "over by 3" (with a warning icon when over), so the state is not colour only.
 * `short`: a shorter label that narrow layouts may show instead (.meter-label / .meter-short); screen readers keep the long one.
 */
export function Meter({ label, short, spent, max, hint, icon, showLeft }: { label: string; short?: string; spent: number; max: number; hint?: string; icon?: ReactNode; showLeft?: boolean }) {
  const { t } = useGame();
  const pct = max > 0 ? Math.min(100, (spent / max) * 100) : 0;
  const over = spent > max;
  return (
    <div className={`meter ${over ? 'over' : ''}`} title={hint}>
      <div className="meter-head">
        <span>{icon}{short ? <><span className="meter-label">{label}</span><span className="meter-short" aria-hidden>{short}</span></> : label}</span>
        <strong>{spent}<span className="meter-max"> / {max}</span></strong>
      </div>
      <div className="meter-track"><span style={{ width: `${pct}%` }} /></div>
      {showLeft && (
        <span className="meter-left">
          {over && <TriangleAlert size={12} aria-hidden />}
          {over ? t('overBy', { n: spent - max }) : t('pointsLeft', { n: max - spent })}
        </span>
      )}
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

type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'min' | 'max' | 'size' | 'step'>;

/**
 * Whole-number field that can be cleared and retyped: it keeps a draft while typing ("", "-"), commits valid numbers
 * in range live (or only on blur / Enter with commit="blur") and clamps on blur. `suffix` draws e.g. "%" inside.
 * Arrow up / down change the value by `step`.
 */
export function NumberField({ value, onChange, min, max, step = 1, commit = 'live', suffix, className = '', ...rest }: NumberInputProps & {
  value: number; onChange: (v: number) => void; min: number; max: number; step?: number; commit?: 'live' | 'blur'; suffix?: ReactNode;
}) {
  const [draft, setDraft] = useState(String(value));
  const [editing, setEditing] = useState(false);
  // follow outside changes (stepper buttons, class switch) while the player is not typing
  useEffect(() => { if (!editing) setDraft(String(value)); }, [value, editing]);

  const parse = (s: string) => (/^-?\d+$/.test(s.trim()) ? Number(s.trim()) : null);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const finish = () => {
    const n = parse(draft);
    const v = n == null ? value : clamp(n);
    setEditing(false);
    setDraft(String(v));
    if (v !== value) onChange(v);
  };

  const input = (
    <input
      {...rest}
      type="text"
      inputMode={min < 0 ? 'text' : 'numeric'}
      pattern={min < 0 ? '-?[0-9]*' : '[0-9]*'}
      autoComplete="off"
      className={suffix ? '' : className}
      value={draft}
      onFocus={(e) => { setEditing(true); rest.onFocus?.(e); }}
      onChange={(e) => {
        const s = e.target.value;
        if (!/^-?\d*$/.test(s.trim())) return;
        setDraft(s);
        const n = parse(s);
        if (commit === 'live' && n != null && n >= min && n <= max && n !== value) onChange(n);
      }}
      onBlur={(e) => { finish(); rest.onBlur?.(e); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') finish();
        else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          const v = clamp((parse(draft) ?? value) + (e.key === 'ArrowUp' ? step : -step));
          setDraft(String(v));
          if (v !== value) onChange(v);
        }
        rest.onKeyDown?.(e);
      }}
    />
  );
  if (!suffix) return input;
  return <span className={`suffix-input ${className}`}>{input}<span aria-hidden>{suffix}</span></span>;
}
