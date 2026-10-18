import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUp, BookOpen, CalendarDays, CheckCircle2, Clock, Download, ExternalLink, Gauge, Hammer, Info, Keyboard,
  LayoutGrid, Leaf, Lightbulb, PawPrint, RotateCcw, ScrollText, Timer, TrendingUp, TriangleAlert,
} from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Lang, Skill } from '../../data/types';
import type { StringKey } from '../../i18n/strings';
import { useBuild } from '../../state/BuildContext';
import { Card, EmptyState, PageHeader } from '../../components/ui';
import { PlainIcon, SkillTile } from '../../components/SkillTile';
import { SkillText as GText, tipLevel } from '../../components/SkillText';
import { useSkillTip } from '../../components/SkillTooltip';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { useToast } from '../../components/Toast';
import { MQ, matches, useDocumentTitle } from '../../components/hooks';
import { richText, fmtDate } from '../../lib/format';
import { readHash } from '../../lib/shareLink';
import { storage } from '../../lib/storage';
import type { Guide, GuideBlock, GuideCategory, GuideCell, GuideIcon, L10n } from './types';
import { GUIDES } from './content';
import { guideHref } from './guideLinks';

const ICONS: Record<GuideIcon, typeof Timer> = { speed: Timer, craft: Hammer, gather: Leaf, book: BookOpen, macro: Keyboard, power: TrendingUp, pet: PawPrint, score: Gauge };

const CATEGORIES: { id: GuideCategory; key: StringKey }[] = [
  { id: 'basics', key: 'guideCatBasics' },
  { id: 'class', key: 'guideCatClass' },
  { id: 'world', key: 'guideCatWorld' },
];

const pick = (x: L10n, lang: Lang) => x[lang] ?? x.en;
const cell = (x: GuideCell, lang: Lang) => (typeof x === 'string' ? x : pick(x, lang));
const smooth = (): ScrollBehavior => (matches(MQ.reducedMotion) ? 'auto' : 'smooth');

/* ---------------------------------------------------------------- reading time and position */

/** Everything a reader reads in a block (skill tiles count a few words each for looking at them). */
function blockWords(b: GuideBlock, lang: Lang): { texts: string[]; tiles: number } {
  const tx = (x?: L10n) => (x ? pick(x, lang) : '');
  switch (b.type) {
    case 'text': case 'heading': return { texts: [tx(b.text)], tiles: 0 };
    case 'steps': return { texts: b.items.flatMap((s) => [tx(s.title), tx(s.text)]), tiles: 0 };
    case 'list': case 'checklist': return { texts: b.items.map((x) => tx(x)), tiles: 0 };
    case 'callout': return { texts: [tx(b.title), tx(b.text)], tiles: 0 };
    case 'facts': return { texts: b.items.flatMap((f) => [tx(f.label), tx(f.value)]), tiles: 0 };
    case 'table': return { texts: [tx(b.caption), ...b.head.map((c) => cell(c, lang)), ...b.rows.flat().map((c) => cell(c, lang))], tiles: 0 };
    case 'links': return { texts: b.items.map((l) => tx(l.label)), tiles: 0 };
    case 'sources': return { texts: b.items.map((s) => s.label), tiles: 0 };
    case 'skills': return { texts: b.items.map((i) => tx(i.note)), tiles: b.items.length };
    case 'keys': return { texts: b.items.map((k) => tx(k.note)), tiles: b.items.length };
    case 'rotation': return { texts: [tx(b.title), ...b.steps.map((s) => tx(s.note))], tiles: b.steps.length };
    case 'specs': return { texts: b.items.map((i) => tx(i.note)), tiles: b.items.reduce((a, i) => a + 1 + i.parts.length * 2, 0) };
  }
}

const minutesCache = new Map<string, number>();
/** Reading time in minutes (about 200 words a minute). */
function readingMinutes(g: Guide, lang: Lang): number {
  const key = `${g.id}:${lang}`;
  const hit = minutesCache.get(key);
  if (hit != null) return hit;
  let words = 0;
  const count = (s: string) => { words += s.replace(/\[\[\d+(?:\|([^\]]*))?\]\]/g, ' $1 ').split(/\s+/).filter(Boolean).length; };
  count(pick(g.title, lang));
  count(pick(g.summary, lang));
  for (const s of g.sections) {
    count(pick(s.title, lang));
    for (const b of s.blocks) {
      const { texts, tiles } = blockWords(b, lang);
      texts.forEach(count);
      words += tiles * 6;
    }
  }
  const m = Math.max(1, Math.round(words / 200));
  minutesCache.set(key, m);
  return m;
}

/** The section the player read last (the list offers "Continue at …"). */
const posKey = (id: string) => `guide:pos:${id}`;
function readPos(g: Guide): number | null {
  const n = storage.get<number | null>(posKey(g.id), null);
  return typeof n === 'number' && Number.isInteger(n) && n >= 0 && n < g.sections.length ? n : null;
}

// the list's scroll position when a guide was opened (Back returns to the same place)
let listY: number | null = null;
const rememberList = () => { listY = window.scrollY; };

/* ---------------------------------------------------------------- skill references */

/** A skill icon that shows its tooltip on hover, keyboard focus and tap. */
function TipTile({ skill, size }: { skill: Skill; size: number }) {
  const lv = tipLevel(skill);
  const tip = useSkillTip(skill, lv, { tap: true });
  return (
    <button type="button" className="g-tip" aria-label={skill.name} {...tip}>
      <SkillTile skill={skill} level={lv} size={size} tip={false} />
    </button>
  );
}

/* ---------------------------------------------------------------- blocks */

function Block({ b, guideId, index }: { b: GuideBlock; guideId: string; index: string }) {
  const { t, lang, data } = useLoadedGame();
  const { setClass } = useBuild();
  const tx = (x: L10n) => pick(x, lang);
  switch (b.type) {
    case 'text':
      return <p className="g-text"><GText text={tx(b.text)} /></p>;
    case 'heading':
      return <h3 className="g-h3">{tx(b.text)}</h3>;
    case 'steps':
      return (
        <ol className="g-steps">
          {b.items.map((s, i) => (
            <li key={i}>
              <span className="g-step-no" aria-hidden>{i + 1}</span>
              <div>
                <strong><GText text={tx(s.title)} /></strong>
                {s.text && <p><GText text={tx(s.text)} /></p>}
              </div>
            </li>
          ))}
        </ol>
      );
    case 'list':
      return <ul className="g-list">{b.items.map((x, i) => <li key={i}><GText text={tx(x)} /></li>)}</ul>;
    case 'checklist':
      return <Checklist items={b.items.map(tx)} storageKey={`guidecheck:${guideId}:${index}`} />;
    case 'callout': {
      const Icon = b.tone === 'warn' ? TriangleAlert : b.tone === 'info' ? Info : Lightbulb;
      return (
        <div className={`g-callout ${b.tone}`}>
          <Icon size={18} aria-hidden />
          <div>
            {b.title && <strong>{tx(b.title)}</strong>}
            <p><GText text={tx(b.text)} /></p>
          </div>
        </div>
      );
    }
    case 'facts':
      return (
        <dl className="g-facts">
          {b.items.map((f, i) => (
            <div key={i}><dt>{tx(f.label)}</dt><dd><GText text={tx(f.value)} /></dd></div>
          ))}
        </dl>
      );
    case 'table':
      return (
        <figure className={`g-table ${b.grid ? 'is-grid' : ''}`}>
          {b.caption && <figcaption>{tx(b.caption)}</figcaption>}
          {/* scrolls sideways on phones: focusable so the keyboard can scroll it too */}
          <div className="table-wrap flat" tabIndex={0} role="region" aria-label={b.caption ? tx(b.caption) : cell(b.head[0] ?? '', lang)}>
            <table className="table">
              <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{cell(h, lang)}</th>)}</tr></thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => <td key={j}><GText text={cell(c, lang)} /></td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    case 'links':
      return (
        <div className="g-links">
          {b.items.map((l) => {
            const href = cell(l.href, lang);
            const ext = /^https?:\/\//.test(href);
            return (
              <a
                key={href}
                className={`btn ${l.primary ? 'primary' : 'ghost'}`}
                href={href}
                target={ext ? '_blank' : undefined}
                rel={ext ? 'noreferrer noopener' : undefined}
                download={l.download || undefined}
                onClick={l.cls ? () => setClass(l.cls!) : undefined}
              >
                {l.download && <Download size={15} aria-hidden />}
                {tx(l.label)}
                {ext ? <ExternalLink size={15} aria-hidden /> : !l.download && <ArrowRight size={15} aria-hidden />}
                {ext && <span className="sr-only"> ({t('gdNewTab')})</span>}
              </a>
            );
          })}
        </div>
      );
    case 'sources':
      return (
        <ul className="g-sources">
          {b.items.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer noopener">
                <ExternalLink size={14} aria-hidden /> <span>{s.label}</span><span className="sr-only"> ({t('gdNewTab')})</span>
              </a>
            </li>
          ))}
        </ul>
      );
    case 'skills':
      return (
        <ul className="g-skills">
          {b.items.map((it) => {
            const s = data.skillById.get(it.id);
            return s && (
              <li key={it.id}>
                <TipTile skill={s} size={40} />
                <div>
                  <strong>{s.name}</strong>
                  <p><GText text={tx(it.note)} /></p>
                </div>
              </li>
            );
          })}
        </ul>
      );
    case 'keys':
      return (
        <ol className="g-keys">
          {b.items.map((k, i) => {
            const stack = k.ids.map((id) => data.skillById.get(id)).filter((s): s is Skill => !!s);
            return (
              <li key={i}>
                <kbd>{k.key === 'LMB' || k.key === 'R' ? t('keyLmb') : k.key === 'Space' ? t('keySpace') : k.key}</kbd>
                <span className="g-key-tiles">{stack.map((s) => <TipTile key={s.id} skill={s} size={36} />)}</span>
                <span className="g-key-text">
                  <span className="g-key-names">{stack.map((s) => s.name).join(' › ')}{k.macro && <span className="chip accent">{t('inMacro')}</span>}</span>
                  {k.note && <span className="g-key-note"><GText text={tx(k.note)} /></span>}
                </span>
              </li>
            );
          })}
        </ol>
      );
    case 'rotation':
      return (
        <figure className="g-rotation">
          {b.title && <figcaption className="g-rot-title">{tx(b.title)}</figcaption>}
          <ol className="g-rot-steps">
            {b.steps.map((st, i) => {
              const s = data.skillById.get(st.id);
              return s && (
                <li key={i}>
                  <span className="g-rot-no" aria-hidden>{i + 1}</span>
                  <TipTile skill={s} size={40} />
                  <span className="g-rot-text">
                    <span className="g-rot-name">{s.name}</span>
                    {st.note && <span className="g-rot-note"><GText text={tx(st.note)} /></span>}
                  </span>
                </li>
              );
            })}
          </ol>
        </figure>
      );
    case 'specs':
      return (
        <ul className="g-specs">
          {b.items.map((it) => {
            const s = data.skillById.get(it.id);
            if (!s) return null;
            return (
              <li key={it.id}>
                <div className="g-spec-head">
                  <TipTile skill={s} size={36} />
                  <strong>{s.name}</strong>
                </div>
                <ul>
                  {it.parts.map((pid) => {
                    const p = s.parts?.find((x) => x.id === pid);
                    return p && (
                      <li key={pid}>
                        <PlainIcon icon={p.icon} size={24} />
                        <span className="lv-tag">{t('lv')} {p.level}</span>
                        <span>{richText(p.desc)}</span>
                      </li>
                    );
                  })}
                </ul>
                {it.note && <p className="g-spec-note"><GText text={tx(it.note)} /></p>}
              </li>
            );
          })}
        </ul>
      );
  }
}

/** Ticks are remembered per browser so a player can keep track while playing. */
function Checklist({ items, storageKey }: { items: string[]; storageKey: string }) {
  const { t } = useLoadedGame();
  const toast = useToast();
  const [done, setDone] = useState<number[]>(() => storage.get<number[]>(storageKey, []));
  const set = (next: number[]) => { storage.set(storageKey, next); setDone(next); };
  const toggle = (i: number) => set(done.includes(i) ? done.filter((x) => x !== i) : [...done, i]);
  const count = done.filter((i) => i < items.length).length;
  const reset = () => {
    const snap = done;
    set([]);
    toast(t('gdChecklistCleared'), 'ok', { action: { label: t('undo'), onClick: () => set(snap) } });
  };
  return (
    <div className="g-check">
      <div className="g-check-head">
        <span className="g-check-count" role="status">{t('gdChecklistCount', { n: count, total: items.length })}</span>
        <span className="g-check-bar" aria-hidden><span style={{ width: `${items.length ? (count / items.length) * 100 : 0}%` }} /></span>
        {count > 0 && <button type="button" className="btn ghost sm" onClick={reset}><RotateCcw size={14} aria-hidden /> {t('gdChecklistReset')}</button>}
      </div>
      <ul>
        {items.map((x, i) => {
          const on = done.includes(i);
          return (
            <li key={i}>
              {/* a tap on a skill name shows its tooltip and does not tick the box */}
              <label className={`g-check-item ${on ? 'on' : ''}`} onClick={(e) => { if ((e.target as Element).closest('.skill-chip')) e.preventDefault(); }}>
                <input type="checkbox" checked={on} onChange={() => toggle(i)} />
                <span><GText text={x} /></span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GuideMark({ g, size }: { g: Guide; size: number }) {
  const Icon = ICONS[g.icon];
  return g.cls
    ? <span className="g-mark is-emblem" aria-hidden><ClassEmblem cls={g.cls} size={size + 14} /></span>
    : <span className="g-mark" aria-hidden><Icon size={size} /></span>;
}

/* ---------------------------------------------------------------- one guide */

/** Contents: a sticky list beside the text on wide screens, a sideways row of chips under the top bar elsewhere. */
function GuideToc({ g, titles, onTop }: { g: Guide; titles: string[]; onTop: () => void }) {
  const { t } = useLoadedGame();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const scrolled = useRef(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h')) || 0;
      const line = top + 110; // just below the sticky contents row
      let idx = 0;
      for (let i = 0; i < titles.length; i++) {
        const el = document.getElementById(`g-${i}`);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      }
      const doc = document.documentElement;
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) idx = titles.length - 1;
      setActive(idx);
    };
    // the jump to the top or to a linked section right after opening is not reading
    const armed = performance.now() + 800;
    const onScroll = () => { if (performance.now() > armed) scrolled.current = true; if (!raf) raf = requestAnimationFrame(measure); };
    const onResize = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [g.id, titles.length]);

  // remember the position (only after the player scrolled, so opening a guide does not reset it)
  useEffect(() => { if (scrolled.current) storage.set(posKey(g.id), active); }, [active, g.id]);

  // the sideways row (phones, tablets): keep the current chip in view
  useEffect(() => {
    const list = listRef.current;
    const a = list?.querySelector<HTMLElement>('[aria-current]');
    if (!list || !a || list.scrollWidth <= list.clientWidth + 1) return;
    list.scrollTo({ left: a.offsetLeft - (list.clientWidth - a.offsetWidth) / 2, behavior: smooth() });
  }, [active]);

  const go = (i: number) => (e: MouseEvent) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // open in a new tab or window
    e.preventDefault();
    const h = document.getElementById(`g-${i}`);
    if (!h) return;
    h.scrollIntoView({ behavior: smooth(), block: 'start' });
    h.focus({ preventScroll: true });
    // a link to this section can be shared and survives a reload
    history.replaceState(history.state, '', guideHref(g.id, i));
  };

  return (
    <nav className="g-toc" aria-label={t('contents')}>
      <p className="g-toc-head">{t('contents')}</p>
      <ol className="g-toc-list focus-inset" ref={listRef}>
        {titles.map((title, i) => (
          <li key={i}>
            <a href={guideHref(g.id, i)} className={i === active ? 'on' : ''} aria-current={i === active ? 'location' : undefined} onClick={go(i)}>
              <span className="g-toc-no" aria-hidden>{i + 1}</span>
              <span className="g-toc-label">{title}</span>
            </a>
          </li>
        ))}
      </ol>
      <button type="button" className="btn ghost sm g-toc-top" onClick={onTop} aria-label={t('gdTop')}><ArrowUp size={15} aria-hidden /> <span className="g-toc-top-label">{t('gdTop')}</span></button>
    </nav>
  );
}

function related(g: Guide, mine: Guide | undefined): Guide[] {
  const out: Guide[] = [];
  const add = (x: Guide | undefined) => { if (x && x.id !== g.id && !out.includes(x)) out.push(x); };
  if (g.category === 'class') GUIDES.filter((x) => x.category === 'basics').forEach(add);
  else {
    add(mine);
    GUIDES.filter((x) => x.category === g.category).forEach(add);
    GUIDES.filter((x) => x.category === 'basics').forEach(add);
  }
  return out.slice(0, 3);
}

function GuideView({ g }: { g: Guide }) {
  const { t, lang } = useLoadedGame();
  const { build, picked, setClass } = useBuild();
  const className = useClassName();
  const tx = (x: L10n) => pick(x, lang);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titles = g.sections.map((s) => tx(s.title));
  const hasToc = g.sections.length > 2;
  const mine = picked ? GUIDES.find((x) => x.cls === build.c) : undefined;
  const cat = CATEGORIES.find((c) => c.id === g.category);
  useDocumentTitle(tx(g.title));

  // start at the top, or at the section of a deep link (#/guides/<id>?s=3); after the app's own scroll on page change
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const s = Number(readHash().params.get('s'));
      const el = s > 0 ? document.getElementById(`g-${s}`) : null;
      if (el) el.scrollIntoView({ block: 'start' });
      else window.scrollTo({ top: 0 });
    });
    return () => cancelAnimationFrame(raf);
  }, [g.id]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: smooth() });
    titleRef.current?.focus({ preventScroll: true });
    history.replaceState(history.state, '', guideHref(g.id));
  };
  const plan = (cls: NonNullable<Guide['cls']>) => { setClass(cls); location.hash = '#/skills'; };
  const more = related(g, mine);

  return (
    <article className={`guide-article ${hasToc ? 'has-toc' : ''}`}>
      <a className="back-link" href="#/guides"><ArrowLeft size={16} aria-hidden /> {t('allGuides')}</a>
      <header className={`guide-hero tone-${g.tone}`}>
        <GuideMark g={g} size={26} />
        <div className="gh-text">
          {cat && <p className="eyebrow">{t(cat.key)}</p>}
          <h1 ref={titleRef} tabIndex={-1}>{tx(g.title)}</h1>
          <p className="gh-summary">{tx(g.summary)}</p>
          <ul className="gh-meta">
            <li><Clock size={14} aria-hidden /> {t('gdMinutes', { n: readingMinutes(g, lang) })}</li>
            <li><CalendarDays size={14} aria-hidden /> {t('guideUpdated', { date: fmtDate(g.updated, lang) })}</li>
            {g.tags.map((tag) => <li key={tag.en} className="tag">{tx(tag)}</li>)}
          </ul>
        </div>
      </header>

      <div className="guide-layout">
        {hasToc && <GuideToc g={g} titles={titles} onTop={toTop} />}
        <div className="guide-body">
          {g.sections.map((s, i) => (
            <section key={i} className="card guide-section" aria-labelledby={`g-${i}`}>
              <h2 id={`g-${i}`} tabIndex={-1}>
                {hasToc && <span className="g-sec-no" aria-hidden>{i + 1}</span>}
                <span>{tx(s.title)}</span>
              </h2>
              {s.blocks.map((b, j) => <Block key={j} b={b} guideId={g.id} index={`${i}-${j}`} />)}
            </section>
          ))}

          <footer className="guide-end">
            <p className="ge-basis"><Info size={16} aria-hidden /><span><strong>{t('guideBasis')}:</strong> {tx(g.basis)}</span></p>
            {more.length > 0 && (
              <section className="ge-related" aria-labelledby={`ge-${g.id}`}>
                <h2 className="ge-title" id={`ge-${g.id}`}>{t('gdRelated')}</h2>
                <div className="guide-grid related">
                  {more.map((x) => <GuideTile key={x.id} g={x} compact />)}
                </div>
              </section>
            )}
            <div className="ge-nav">
              <a className="btn ghost" href="#/guides"><ArrowLeft size={16} aria-hidden /> {t('allGuides')}</a>
              <button type="button" className="btn ghost" onClick={toTop}><ArrowUp size={16} aria-hidden /> {t('gdTop')}</button>
              {g.cls && (
                <button type="button" className="btn primary" onClick={() => plan(g.cls!)}>
                  <LayoutGrid size={16} aria-hidden /> {t('gdPlanCls', { cls: className(g.cls) })}
                </button>
              )}
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- overview */

function GuideTile({ g, mine, compact }: { g: Guide; mine?: boolean; compact?: boolean }) {
  const { t, lang } = useLoadedGame();
  const tx = (x: L10n) => pick(x, lang);
  const pos = readPos(g);
  const read = pos != null && pos === g.sections.length - 1;
  const started = pos != null && pos > 0 && !read;
  return (
    <a
      href={guideHref(g.id)}
      className={`guide-tile tone-${g.tone} ${g.cls ? 'is-class' : ''} ${compact ? 'compact' : ''}`}
      onClick={compact ? undefined : rememberList}
    >
      <GuideMark g={g} size={22} />
      <span className="gt-body">
        <strong className="gt-title">{tx(g.title)}</strong>
        {!compact && <span className="gt-summary">{tx(g.summary)}</span>}
        {!compact && g.tags.length > 0 && <span className="gt-tags">{g.tags.map((tag) => <span key={tag.en} className="tag">{tx(tag)}</span>)}</span>}
        <span className="gt-meta">
          <span className="gt-time"><Clock size={13} aria-hidden /> {t('gdMinutes', { n: readingMinutes(g, lang) })}</span>
          {read && <span className="gt-read"><CheckCircle2 size={13} aria-hidden /> {t('gdRead')}</span>}
          {started && <span className="gt-started">{t('gdStarted')}</span>}
          {mine && <span className="chip accent">{t('gdYourClass')}</span>}
        </span>
      </span>
    </a>
  );
}

/** "Guide for your class" at the top of the overview, with "Continue at …" when the player has started it. */
function FeaturedGuide({ g }: { g: Guide }) {
  const { t, lang } = useLoadedGame();
  const tx = (x: L10n) => pick(x, lang);
  const pos = readPos(g);
  const resume = pos != null && pos > 0 && pos < g.sections.length - 1 ? pos : null;
  return (
    <a className={`guide-feature tone-${g.tone}`} href={guideHref(g.id, resume ?? undefined)} onClick={rememberList}>
      <GuideMark g={g} size={30} />
      <span className="gf-text">
        <span className="eyebrow">{t('gdForYourClass')}</span>
        <strong className="gf-title">{tx(g.title)}</strong>
        <span className="gf-summary">{tx(g.summary)}</span>
        <span className="gf-meta">
          <span><Clock size={14} aria-hidden /> {t('gdMinutes', { n: readingMinutes(g, lang) })}</span>
          {resume != null && <span>{t('gdContinueAt', { section: tx(g.sections[resume].title) })}</span>}
        </span>
      </span>
      <span className="btn primary gf-cta" aria-hidden>
        {resume != null ? t('gdContinue') : t('readGuide')} <ArrowRight size={16} />
      </span>
    </a>
  );
}

function GuideList({ notFound }: { notFound: boolean }) {
  const { t } = useLoadedGame();
  const { build, picked } = useBuild();
  const mine = picked ? GUIDES.find((g) => g.cls === build.c) : undefined;

  // back from a guide: the same place in the list; otherwise the top (the app does not scroll when only the guide changes)
  useLayoutEffect(() => {
    window.scrollTo({ top: listY ?? 0 });
    listY = null;
  }, []);

  return (
    <div className="page guides-page">
      <PageHeader icon={<ScrollText size={22} />} title={t('navGuides')} subtitle={t('guidesText')} />
      {notFound && <p className="hint-box warn" role="status"><Info size={15} aria-hidden /> {t('guideNotFound')}</p>}
      {GUIDES.length === 0 ? <Card><EmptyState icon={<ScrollText size={28} aria-hidden />} text={t('noGuides')} /></Card> : (
        <>
          {mine && <FeaturedGuide g={mine} />}
          {CATEGORIES.map(({ id, key }) => {
            const list = GUIDES.filter((g) => g.category === id);
            return list.length > 0 && (
              <section key={id} className="guide-group" aria-labelledby={`gc-${id}`}>
                <h2 className="guide-group-title" id={`gc-${id}`}>{t(key)} <span className="count">{list.length}</span></h2>
                <div className={`guide-grid ${id}`}>
                  {list.map((g) => <GuideTile key={g.id} g={g} mine={g === mine} />)}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}

export function GuidesPage({ param }: { param: string | null }) {
  const open = param ? GUIDES.find((g) => g.id === param) : null;
  if (open) return <div className="page"><GuideView key={open.id} g={open} /></div>;
  return <GuideList notFound={!!param} />;
}
