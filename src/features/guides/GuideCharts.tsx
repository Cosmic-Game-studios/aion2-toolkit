import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { Check, Minus, X } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Lang } from '../../data/types';
import { SkillText as GText } from '../../components/SkillText';
import { cell, pick } from './blockText';
import type { ChartTone, GuideBlock, GuideCell } from './types';

/*
 * Charts and diagrams of the guides: bars, shares, line, flow, compare and stats blocks (types.ts). Plain HTML and SVG
 * in the site's look (charts.css), no chart library. The numbers are always readable as text: bars and shares print
 * them next to the bar, the line chart has a table for screen readers. Bars grow and lines draw while they scroll into
 * view (charts.css, only without reduced motion).
 */

type Of<T extends GuideBlock['type']> = Extract<GuideBlock, { type: T }>;

/** the tones in the order a chart uses them when the guide does not set one */
const CYCLE: ChartTone[] = ['gold', 'blue', 'teal', 'violet', 'rose', 'green', 'slate'];
const toneOf = (t: ChartTone | undefined, i: number) => t ?? CYCLE[i % CYCLE.length];

const nf = new Map<string, Intl.NumberFormat>();
/** 1,234.5 / 1.234,5 – at most one decimal unless the number needs more to say anything */
export function fmtNum(n: number, lang: Lang, digits = 1): string {
  const key = `${lang}:${digits}`;
  let f = nf.get(key);
  if (!f) nf.set(key, (f = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: digits })));
  return f.format(n);
}

function withUnit(n: string, unit: string): string {
  if (!unit) return n;
  return unit === '%' ? `${n} %`.replace(' %', ' %') : `${n} ${unit}`;
}

/**
 * A chart plays its entrance once, when it comes into view (bars grow, lines draw, boxes rise – charts.css), and then
 * stands at its real values wherever the reader stops scrolling. With reduced motion it simply shows.
 */
function useEntrance<T extends Element>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState('');
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined' || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    setState('gc-armed');
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      setState('gc-armed gc-in');
      io.disconnect();
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, state] as const;
}

/** title above, caption below; `className` styles the body */
function Frame({ title, caption, className, children }: { title?: string; caption?: string; className: string; children: ReactNode }) {
  const [ref, entrance] = useEntrance<HTMLElement>();
  return (
    <figure ref={ref} className={`gc ${className} ${entrance}`}>
      {title && <figcaption className="gc-title">{title}</figcaption>}
      {children}
      {caption && <p className="gc-caption"><GText text={caption} /></p>}
    </figure>
  );
}

/* ---------------------------------------------------------------- bars */

export function BarsChart({ b }: { b: Of<'bars'> }) {
  const { lang } = useLoadedGame();
  const unit = b.unit != null ? cell(b.unit, lang) : '';
  const max = b.max ?? Math.max(0, ...b.items.map((i) => i.value));
  return (
    <Frame title={b.title && pick(b.title, lang)} caption={b.caption && pick(b.caption, lang)} className="gc-bars-chart">
      <ul className="gc-bars">
        {b.items.map((it, i) => {
          const pct = max > 0 ? Math.max(0, Math.min(100, (it.value / max) * 100)) : 0;
          return (
            <li key={i} className={`tone-${toneOf(it.tone, 0)}`} style={{ '--i': i } as CSSProperties}>
              <span className="gc-bar-label">
                <GText text={cell(it.label, lang)} />
                {it.note && <small><GText text={cell(it.note, lang)} /></small>}
              </span>
              <span className="gc-bar-track" aria-hidden><span className="gc-bar-fill" style={{ width: `${pct}%` }} /></span>
              <span className="gc-bar-value">{it.display ? cell(it.display, lang) : withUnit(fmtNum(it.value, lang), unit)}</span>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

/* ---------------------------------------------------------------- shares */

export function SharesChart({ b }: { b: Of<'shares'> }) {
  const { lang } = useLoadedGame();
  const unit = b.unit != null ? cell(b.unit, lang) : '';
  const sum = b.items.reduce((a, i) => a + Math.max(0, i.value), 0) || 1;
  return (
    <Frame title={b.title && pick(b.title, lang)} caption={b.caption && pick(b.caption, lang)} className="gc-shares-chart">
      <div className="gc-stack" aria-hidden>
        {b.items.map((it, i) => (
          <span key={i} className={`tone-${toneOf(it.tone, i)}`} style={{ flexGrow: Math.max(0, it.value) }} />
        ))}
      </div>
      <ul className="gc-legend">
        {b.items.map((it, i) => (
          <li key={i} className={`tone-${toneOf(it.tone, i)}`}>
            <span className="gc-swatch" aria-hidden />
            <span className="gc-legend-label">
              <GText text={cell(it.label, lang)} />
              {it.note && <small><GText text={cell(it.note, lang)} /></small>}
            </span>
            <span className="gc-legend-value">
              <strong>{withUnit(fmtNum((Math.max(0, it.value) / sum) * 100, lang, 0), '%')}</strong>
              {unit && <span>{withUnit(fmtNum(it.value, lang), unit)}</span>}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------------------------------------------------------------- line */

/** width of an element, kept up to date (the SVG draws in real pixels, so its text stays readable on phones) */
function useWidth<T extends HTMLElement = HTMLDivElement>(fallback: number) {
  const ref = useRef<T>(null);
  const [w, setW] = useState(fallback);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    setW(Math.round(el.getBoundingClientRect().width) || fallback);
    return () => ro.disconnect();
  }, [fallback]);
  return [ref, w] as const;
}

/** about `count` round steps between lo and hi; fixed ends stay where the guide put them */
function niceScale(lo: number, hi: number, count: number, fixedMin?: number, fixedMax?: number) {
  const range = (fixedMax ?? hi) - (fixedMin ?? lo) || Math.abs(hi) || 1;
  const raw = range / count;
  const p = 10 ** Math.floor(Math.log10(raw));
  const f = raw / p;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
  const min = fixedMin ?? Math.floor(lo / step) * step;
  let max = fixedMax ?? Math.ceil(hi / step) * step;
  if (max <= min) max = min + step;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-6; v += step) ticks.push(Math.round(v / step) * step);
  return { min, max, ticks };
}

export function LineChart({ b }: { b: Of<'line'> }) {
  const { t, lang } = useLoadedGame();
  const [ref, w] = useWidth(640);
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const n = b.x.ticks.length;
  const H = w < 480 ? 210 : 250;
  const unit = b.y.unit ?? '';
  const vals = b.series.flatMap((s) => s.values.filter((v): v is number => v != null));
  const dMin = vals.length ? Math.min(...vals) : 0;
  const dMax = vals.length ? Math.max(...vals) : 1;
  const lo = b.y.min ?? (dMin >= 0 && dMin <= dMax * 0.45 ? 0 : dMin);
  const { min, max, ticks } = niceScale(lo, dMax, w < 480 ? 3 : 4, b.y.min, b.y.max);
  const fmtTick = (v: number) => fmtNum(v, lang, Math.abs(max - min) < 5 ? 1 : 0);
  const padL = Math.max(28, ...ticks.map((v) => fmtTick(v).length * 7.2)) + 10;
  const padR = 16;
  const padT = 12;
  const padB = 30;
  const plotW = Math.max(40, w - padL - padR);
  const xAt = (i: number) => padL + (n <= 1 ? plotW / 2 : (i * plotW) / (n - 1));
  const yAt = (v: number) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  // label every k-th step so the labels do not collide
  const longest = Math.max(1, ...b.x.ticks.map((x) => cell(x, lang).length));
  const every = Math.max(1, Math.ceil((longest * 7 + 12) / (n > 1 ? plotW / (n - 1) : plotW)));

  const path = (values: (number | null)[]) => {
    let d = '';
    let pen = false;
    values.forEach((v, i) => {
      if (v == null) { pen = false; return; }
      d += `${pen ? 'L' : 'M'}${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`;
      pen = true;
    });
    return d;
  };

  const pickAt = (clientX: number, el: Element) => {
    const x = clientX - el.getBoundingClientRect().left;
    const i = n <= 1 ? 0 : Math.round(((x - padL) / plotW) * (n - 1));
    setActive(Math.max(0, Math.min(n - 1, i)));
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    setActive((a) => {
      if (e.key === 'Home') return 0;
      if (e.key === 'End') return n - 1;
      const cur = a ?? (e.key === 'ArrowLeft' ? n : -1);
      return Math.max(0, Math.min(n - 1, cur + (e.key === 'ArrowLeft' ? -1 : 1)));
    });
  };
  const title = b.title ? pick(b.title, lang) : pick(b.y.label, lang);
  const tipLeft = active != null ? Math.max(70, Math.min(w - 70, xAt(active))) : 0;

  return (
    <Frame title={b.title && pick(b.title, lang)} caption={b.caption && pick(b.caption, lang)} className="gc-line-chart">
      {b.series.length > 1 && (
        <ul className="gc-series" aria-hidden>
          {b.series.map((s, i) => (
            <li key={i} className={`tone-${toneOf(s.tone, i)} ${s.dashed ? 'dashed' : ''}`}><span className="gc-line-swatch" />{pick(s.label, lang)}</li>
          ))}
        </ul>
      )}
      <p className="gc-axis-y" aria-hidden>{pick(b.y.label, lang)}{unit && ` (${unit})`}</p>
      <div
        ref={ref}
        className="gc-plot"
        tabIndex={0}
        aria-label={`${title} – ${t('gcKeysHint')}`}
        aria-describedby={`${id}-data`}
        onPointerMove={(e: PointerEvent) => pickAt(e.clientX, e.currentTarget)}
        onPointerDown={(e: PointerEvent) => pickAt(e.clientX, e.currentTarget)}
        onPointerLeave={(e: PointerEvent) => { if (e.pointerType === 'mouse') setActive(null); }}
        onKeyDown={onKey}
        onBlur={() => setActive(null)}
      >
        <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} aria-hidden focusable="false">
          {ticks.map((v) => (
            <g key={v} className="gc-grid">
              <line x1={padL} x2={w - padR} y1={yAt(v)} y2={yAt(v)} />
              <text x={padL - 8} y={yAt(v)} dy="0.32em" textAnchor="end">{fmtTick(v)}</text>
            </g>
          ))}
          {/* every k-th label and the last one; a label too close before the last one makes room for it */}
          {b.x.ticks.map((x, i) => (i === n - 1 || (i % every === 0 && n - 1 - i >= every * 0.6)) && (
            <text key={i} className="gc-xtick" x={xAt(i)} y={H - 8} textAnchor={i === 0 && n > 1 ? 'start' : i === n - 1 && n > 1 ? 'end' : 'middle'}>
              {cell(x, lang)}
            </text>
          ))}
          {active != null && <line className="gc-cursor" x1={xAt(active)} x2={xAt(active)} y1={padT} y2={H - padB} />}
          {b.series.map((s, si) => (
            <g key={si} className={`gc-series-g tone-${toneOf(s.tone, si)} ${s.dashed ? 'dashed' : ''}`}>
              <path className="gc-line-path" d={path(s.values)} pathLength={s.dashed ? undefined : 1} />
              {s.values.map((v, i) => v != null && (
                <circle key={i} className={i === active ? 'on' : ''} cx={xAt(i)} cy={yAt(v)} r={i === active ? 5 : n > 24 ? 0 : 3} />
              ))}
            </g>
          ))}
        </svg>
        {active != null && (
          <div className="gc-tip" style={{ left: tipLeft }} aria-hidden>
            <strong>{cell(b.x.ticks[active], lang)}</strong>
            {b.series.map((s, si) => {
              const v = s.values[active];
              return v != null && (
                <span key={si} className={`tone-${toneOf(s.tone, si)}`}>
                  <span className="gc-swatch" />{b.series.length > 1 && `${pick(s.label, lang)}: `}<b>{withUnit(fmtNum(v, lang), unit)}</b>
                </span>
              );
            })}
          </div>
        )}
      </div>
      <p className="gc-axis-x" aria-hidden>{pick(b.x.label, lang)}</p>
      <table className="sr-only" id={`${id}-data`}>
        <caption>{t('gcData')}: {title}</caption>
        <thead><tr><th scope="col">{pick(b.x.label, lang)}</th>{b.series.map((s, i) => <th key={i} scope="col">{pick(s.label, lang)}</th>)}</tr></thead>
        <tbody>
          {b.x.ticks.map((x, i) => (
            <tr key={i}><th scope="row">{cell(x, lang)}</th>{b.series.map((s, si) => <td key={si}>{s.values[i] != null ? withUnit(fmtNum(s.values[i]!, lang), unit) : '–'}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

/* ---------------------------------------------------------------- flow */

/** narrowest box of a flow that runs left to right (px) */
const FLOW_BOX_MIN = 170;

export function FlowChart({ b }: { b: Of<'flow'> }) {
  const { lang } = useLoadedGame();
  // side by side only while every box keeps room for its text and skill names, else top to bottom
  const [ref, w] = useWidth<HTMLOListElement>(0);
  const n = b.items.length;
  const row = n <= 5 && w >= n * FLOW_BOX_MIN + (n - 1) * 24;
  return (
    <Frame title={b.title && pick(b.title, lang)} caption={b.caption && pick(b.caption, lang)} className="gc-flow-chart">
      <ol ref={ref} className={`gc-flow ${row ? 'is-row' : ''}`}>
        {b.items.map((it, i) => (
          <li key={i} className={`gc-flow-step tone-${toneOf(it.tone, 0)}`} style={{ '--i': i } as CSSProperties}>
            <span className="gc-flow-no" aria-hidden>{i + 1}</span>
            <span className="gc-flow-body">
              {it.tag && <span className="gc-flow-tag">{cell(it.tag, lang)}</span>}
              <strong><GText text={pick(it.title, lang)} /></strong>
              {it.text && <span className="gc-flow-text"><GText text={pick(it.text, lang)} /></span>}
            </span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------------------------------------------------------------- compare */

export function CompareChart({ b }: { b: Of<'compare'> }) {
  const { t, lang } = useLoadedGame();
  return (
    <Frame title={b.title && pick(b.title, lang)} caption={b.caption && pick(b.caption, lang)} className="gc-compare-chart">
      <ul className="gc-compare">
        {b.items.map((it, i) => (
          <li key={i} className={`gc-option tone-${toneOf(it.tone, i)}`} style={{ '--i': i } as CSSProperties}>
            <span className="gc-option-head">
              <strong>{pick(it.title, lang)}</strong>
              {it.tag && <span className="gc-flow-tag">{cell(it.tag, lang)}</span>}
            </span>
            <ul className="gc-points">
              {it.points.map((p, j) => {
                const Icon = p.kind === 'pro' ? Check : p.kind === 'con' ? X : Minus;
                return (
                  <li key={j} className={p.kind ?? 'plain'}>
                    <Icon size={15} aria-hidden />
                    {p.kind && <span className="sr-only">{t(p.kind === 'pro' ? 'gcPro' : 'gcCon')}: </span>}
                    <span><GText text={pick(p.text, lang)} /></span>
                  </li>
                );
              })}
            </ul>
            {it.verdict && <p className="gc-verdict"><GText text={pick(it.verdict, lang)} /></p>}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------------------------------------------------------------- stats */

export function StatsTiles({ b }: { b: Of<'stats'> }) {
  const { lang } = useLoadedGame();
  const [ref, entrance] = useEntrance<HTMLDListElement>();
  return (
    <dl ref={ref} className={`gc-stats ${entrance}`}>
      {b.items.map((it, i) => (
        <div key={i} className={`gc-stat tone-${toneOf(it.tone, 0)}`} style={{ '--i': i } as CSSProperties}>
          <dt><GText text={pick(it.label, lang)} /></dt>
          <dd>
            <span className="gc-stat-value">{cell(it.value as GuideCell, lang)}</span>
            {it.note && <span className="gc-stat-note"><GText text={pick(it.note, lang)} /></span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
