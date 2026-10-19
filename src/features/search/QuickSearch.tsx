import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
import { ChevronDown, CornerDownLeft, History, ListTree, Search, Trophy, X, type LucideIcon } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { loadGameData } from '../../data/loadData';
import type { ClassType, GameData, Lang, Skill } from '../../data/types';
import { STRINGS, type StringKey } from '../../i18n/strings';
import { Modal } from '../../components/Modal';
import { SkillTile } from '../../components/SkillTile';
import { ClassEmblem } from '../../components/ClassSelect';
import { unreleasedClasses } from '../../lib/classInfo';
import { storage } from '../../lib/storage';
import { useBuild } from '../../state/BuildContext';
import type { Guide, L10n } from '../guides/types';
import { guideHref } from '../guides/guideLinks';
import { GUIDE_ICONS } from '../guides/guideIcons';
import { matchRanges, norm, queryTokens, scoreFields, type Field } from './searchIndex';

/**
 * Quick search (command palette): Ctrl+K / Cmd+K from anywhere, "/" where no field has the focus and the page has no
 * search of its own (database, map). Finds the skills of every class, the pages and the guides with their sections.
 * A combobox with a listbox: the focus stays in the field, the arrow keys move the gold selection, Enter opens it.
 */

/* ---------------------------------------------------------------- shortcut */

const IS_MAC = typeof navigator !== 'undefined'
  && /mac|iphone|ipad|ipod/i.test((navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform ?? '');
/** The shortcut as the keyboard shows it. */
const SEARCH_SHORTCUT = IS_MAC ? '⌘K' : 'Ctrl K';
const ARIA_SHORTCUTS = 'Control+K Meta+K';

/** Open state of the quick search and its keys (used once, by the app shell). */
export function useQuickSearch() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.repeat) return;
      const ours = !!document.querySelector('.qs-modal');
      // another dialog is open: its content stays in front, the search waits
      if (!ours && document.querySelector('.modal-backdrop')) return;
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key !== '/' || ours || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      // a page with its own search keeps "/" for it (the field says so with aria-keyshortcuts)
      if (document.querySelector('main [aria-keyshortcuts~="/"]')) return;
      e.preventDefault();
      setOpen(true);
    };
    // Back / Forward while the search is open: the new page is what the player wants to see
    const onHash = () => setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('hashchange', onHash); };
  }, []);
  return useMemo(() => ({ open, show: () => setOpen(true), hide: () => setOpen(false) }), [open]);
}

/* ---------------------------------------------------------------- guides (load on demand, like the guides page) */

let guidesPromise: Promise<Guide[]> | null = null;
let guidesLoaded: Guide[] | null = null;
/** Starts loading the guide texts (hover or focus on a search button, opening the search). */
function preloadGuides(): Promise<Guide[]> {
  guidesPromise ??= import('../guides/content').then(
    (m) => (guidesLoaded = m.GUIDES),
    (e: unknown) => { guidesPromise = null; throw e; },
  );
  return guidesPromise;
}

/* ---------------------------------------------------------------- the index */

/** A page of the app, as the shell lists it. */
export interface SearchPage { path: string; key: StringKey; Icon: LucideIcon; group: StringKey | null }

type GroupId = 'recent' | 'pages' | 'guides' | 'skills';
type Kind = 'page' | 'top' | 'guide' | 'section' | 'skill';

interface Entry {
  /** stable across languages and visits (recent list): page:/skills, top:Cleric, guide:macros, section:macros:3, skill:123 */
  id: string;
  kind: Kind;
  group: Exclude<GroupId, 'recent'>;
  href: string;
  label: string;
  sub?: string;
  fields: Field[];
  /** small lead when scores tie: pages before guides before skills; the player's class first */
  rank: number;
  Icon?: LucideIcon;
  skill?: Skill;
  cls?: ClassType;
  tone?: string;
}

const GROUP_KEY: Record<GroupId, StringKey> = { recent: 'qsRecent', pages: 'qsPages', guides: 'navGuides', skills: 'qsSkills' };
const GROUP_ORDER: GroupId[] = ['recent', 'pages', 'guides', 'skills'];
/** rows a group shows before "Show all" */
const LIMIT: Record<GroupId, number> = { recent: 5, pages: 6, guides: 6, skills: 8 };

// extra words per page; both languages are searched, so "map" works in the German UI and "Karte" in the English one
const PAGE_WORDS: Record<string, StringKey> = {
  '/': 'qsWordsHome', '/skills': 'qsWordsSkills', '/stigma': 'qsWordsStigma', '/daevanion': 'qsWordsDaevanion',
  '/hotbar': 'qsWordsHotbar', '/combos': 'qsWordsCombos', '/database': 'qsWordsDatabase', '/guides': 'qsWordsGuides',
  '/top': 'qsWordsTop', '/farm': 'qsWordsFarm', '/community': 'qsWordsCommunity',
};

const RECENT_KEY = 'qs:recent';
const readRecent = (): string[] => {
  const v = storage.get<unknown>(RECENT_KEY, []);
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, LIMIT.recent) : [];
};
const remember = (id: string) => storage.set(RECENT_KEY, [id, ...readRecent().filter((x) => x !== id)].slice(0, LIMIT.recent));

const other = (lang: Lang): Lang => (lang === 'en' ? 'de' : 'en');
const f = (text: string | undefined, w: number, key?: boolean): Field[] => (text ? [{ text: norm(text), w, key }] : []);

function buildIndex(
  pages: SearchPage[], data: GameData | null, en: GameData | null, guides: Guide[] | null,
  lang: Lang, t: (k: StringKey, v?: Record<string, string | number>) => string, mine: ClassType | null,
): Entry[] {
  const alt = other(lang);
  const out: Entry[] = [];
  const own = (cls: ClassType | undefined) => (cls && cls === mine ? 5 : 0);

  for (const p of pages) {
    const words = PAGE_WORDS[p.path];
    out.push({
      id: `page:${p.path}`, kind: 'page', group: 'pages', href: `#${p.path}`, rank: 4,
      label: t(p.key), sub: p.group && p.group !== p.key ? t(p.group) : undefined, Icon: p.Icon,
      fields: [
        ...f(t(p.key), 1), ...f(STRINGS[alt][p.key], 0.8),
        ...(words ? [...f(STRINGS[lang][words], 0.6), ...f(STRINGS[alt][words], 0.5)] : []),
        ...(p.group ? f(t(p.group), 0.4) : []),
      ],
    });
  }

  const className = (c: ClassType) => data?.classes.find((x) => x.classType === c)?.name ?? c;
  const enClassName = (c: ClassType) => en?.classes.find((x) => x.classType === c)?.name ?? c;
  const topPage = pages.find((p) => p.path === '/top');
  if (data && topPage) {
    // the Top 10 of one class: only when the query names the class ("top cleric", "kleriker")
    const unreleased = unreleasedClasses(data);
    for (const c of data.classes) {
      if (unreleased.has(c.classType)) continue;
      out.push({
        id: `top:${c.classType}`, kind: 'top', group: 'pages', href: `#/top/${c.classType.toLowerCase()}`, rank: 2 + own(c.classType),
        label: `${t('navTop')} · ${c.name}`, sub: topPage.group ? t(topPage.group) : undefined, cls: c.classType,
        fields: [
          ...f(c.name, 1, true), ...f(enClassName(c.classType), 0.9, true), ...f(c.classType, 0.8, true),
          ...f(t('navTop'), 0.8), ...f(STRINGS[lang].qsWordsTop, 0.5), ...f(STRINGS[alt].qsWordsTop, 0.4),
        ],
      });
    }
  }

  if (guides) {
    const tx = (x: L10n) => x[lang] ?? x.en;
    const cat = (g: Guide) => t(g.category === 'basics' ? 'guideCatBasics' : g.category === 'class' ? 'guideCatClass' : g.category === 'endgame' ? 'guideCatEndgame' : 'guideCatWorld');
    for (const g of guides) {
      const title = tx(g.title);
      out.push({
        id: `guide:${g.id}`, kind: 'guide', group: 'guides', href: guideHref(g.id), rank: 3 + own(g.cls),
        label: title, sub: cat(g), Icon: GUIDE_ICONS[g.icon], cls: g.cls, tone: g.tone,
        fields: [
          ...f(title, 1), ...f(g.title[alt], 0.7),
          ...g.tags.flatMap((tag) => [...f(tx(tag), 0.6), ...f(tag[alt], 0.5)]),
          ...f(tx(g.summary), 0.35), ...f(cat(g), 0.4),
        ],
      });
      g.sections.forEach((s, i) => {
        out.push({
          id: `section:${g.id}:${i}`, kind: 'section', group: 'guides', href: guideHref(g.id, i > 0 ? i : undefined), rank: 1 + own(g.cls),
          label: tx(s.title), sub: `${title} · ${t('qsSection', { n: i + 1 })}`, cls: g.cls, tone: g.tone,
          // the section has to match by its own title: "rotation", "gladiator rotation" – not every section of "gladiator"
          fields: [...f(tx(s.title), 1, true), ...f(title, 0.5), ...f(g.title[alt], 0.4)],
        });
      });
    }
  }

  if (data) {
    const typeKey = (s: Skill): StringKey => (s.isStigma ? 'stigma' : s.type);
    for (const s of data.skills) {
      const enName = en?.skillById.get(s.id)?.name;
      const type = typeKey(s);
      out.push({
        id: `skill:${s.id}`, kind: 'skill', group: 'skills', href: `#/database/${s.id}`, rank: own(s.classType),
        label: s.name, sub: className(s.classType), skill: s, cls: s.classType,
        fields: [
          ...f(s.name, 1), ...(enName && enName !== s.name ? f(enName, 0.9) : []),
          ...f(className(s.classType), 0.5), ...f(enClassName(s.classType), 0.45),
          ...f(STRINGS[lang][type], 0.5), ...f(STRINGS[alt][type], 0.4),
        ],
      });
    }
  }
  return out;
}

type Row =
  | { type: 'entry'; entry: Entry; group: GroupId }
  | { type: 'more'; group: GroupId; hidden: number };

interface Group { id: GroupId; rows: Row[]; total: number }

function search(entries: Entry[], byId: Map<string, Entry>, tokens: string[], recent: string[], expanded: Set<GroupId>): Group[] {
  const make = (id: GroupId, list: Entry[], limit = expanded.has(id) ? Infinity : LIMIT[id]): Group => {
    const rows: Row[] = list.slice(0, limit).map((entry) => ({ type: 'entry', entry, group: id }));
    if (list.length > limit) rows.push({ type: 'more', group: id, hidden: list.length - limit });
    return { id, rows, total: list.length };
  };

  // nothing typed: what the player opened last, then every page
  if (!tokens.length) {
    const last = recent.map((id) => byId.get(id)).filter((e): e is Entry => !!e);
    return [make('recent', last), make('pages', entries.filter((e) => e.kind === 'page'), Infinity)].filter((g) => g.total > 0);
  }

  const hits = new Map<GroupId, { e: Entry; s: number }[]>();
  for (const e of entries) {
    const s = scoreFields(e.fields, tokens, e.label);
    if (s <= 0) continue;
    const list = hits.get(e.group) ?? [];
    list.push({ e, s: s + e.rank });
    hits.set(e.group, list);
  }
  // equal scores: skills in learning order like the database (stigmas last), the rest by name
  const learn = (e: Entry) => (e.skill ? Number(e.skill.isStigma) * 1000 + e.skill.acquireLevel : 0);
  const groups = [...hits].map(([id, list]) => {
    list.sort((a, b) => b.s - a.s || learn(a.e) - learn(b.e) || a.e.label.localeCompare(b.e.label));
    return { id, best: list[0].s, list: list.map((x) => x.e) };
  });
  // the group with the best hit comes first, so Enter right away opens the best match
  groups.sort((a, b) => b.best - a.best || GROUP_ORDER.indexOf(a.id) - GROUP_ORDER.indexOf(b.id));
  return groups.map((g) => make(g.id, g.list));
}

/** English game data next to the UI language (English skill names are searched too, like in the database). */
function useEnglish(data: GameData | null): GameData | null {
  const [en, setEn] = useState<GameData | null>(data?.lang === 'en' ? data : null);
  useEffect(() => {
    if (!data) return;
    if (data.lang === 'en') { setEn(data); return; }
    let alive = true;
    loadGameData('en').then((d) => { if (alive) setEn(d); }, () => { /* German names only */ });
    return () => { alive = false; };
  }, [data]);
  return en;
}

/* ---------------------------------------------------------------- the dialog */

export function QuickSearch({ open, onClose, pages }: { open: boolean; onClose: () => void; pages: SearchPage[] }) {
  const { t } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Modal
      open={open}
      title={t('qsTitle')}
      onClose={onClose}
      className="qs-modal"
      bodyClassName="qs-body"
      initialFocus={inputRef}
      footer={(
        <p className="qs-keys" aria-hidden>
          <span><kbd>↑</kbd><kbd>↓</kbd> {t('qsKeyMove')}</span>
          <span><kbd>↵</kbd> {t('qsKeyOpen')}</span>
          <span><kbd>Esc</kbd> {t('qsKeyClose')}</span>
        </p>
      )}
    >
      <Palette pages={pages} onClose={onClose} inputRef={inputRef} />
    </Modal>
  );
}

function Palette({ pages, onClose, inputRef }: { pages: SearchPage[]; onClose: () => void; inputRef: RefObject<HTMLInputElement> }) {
  const { t, lang, data } = useGame();
  const { build, picked } = useBuild();
  const en = useEnglish(data);
  const uid = useId().replace(/:/g, '');
  const listRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Set<GroupId>>(() => new Set());
  const [guides, setGuides] = useState<Guide[] | null>(guidesLoaded);
  const [guidesFailed, setGuidesFailed] = useState(false);
  const [recent] = useState(readRecent);

  useEffect(() => {
    if (guides) return;
    let alive = true;
    preloadGuides().then((g) => { if (alive) setGuides(g); }, () => { if (alive) setGuidesFailed(true); });
    return () => { alive = false; };
  }, [guides]);

  const mine = picked ? build.c : null;
  const entries = useMemo(() => buildIndex(pages, data, en, guides, lang, t, mine), [pages, data, en, guides, lang, t, mine]);
  const byId = useMemo(() => new Map(entries.map((e) => [e.id, e])), [entries]);
  const tokens = useMemo(() => queryTokens(q), [q]);
  const groups = useMemo(() => search(entries, byId, tokens, recent, expanded), [entries, byId, tokens, recent, expanded]);
  const rows = useMemo(() => groups.flatMap((g) => g.rows), [groups]);
  const total = groups.reduce((n, g) => n + (g.id === 'recent' ? 0 : g.total), 0);
  const act = rows.length ? Math.min(active, rows.length - 1) : -1;

  // other query: the best match is chosen again, groups fold back
  const query = (v: string) => { setQ(v); setActive(0); setExpanded(new Set()); };

  // keep the chosen row in view; the first row of a group brings its heading along
  useEffect(() => {
    const list = listRef.current;
    const el = act >= 0 ? document.getElementById(`${uid}-o${act}`) : null;
    if (!list || !el) return;
    if (act === 0) { list.scrollTop = 0; return; }
    const head = el.previousElementSibling?.classList.contains('qs-group-head') ? el.previousElementSibling as HTMLElement : el;
    const box = list.getBoundingClientRect();
    const top = head.getBoundingClientRect().top;
    const bottom = el.getBoundingClientRect().bottom;
    const pad = 8;
    if (top < box.top + pad) list.scrollTop -= box.top + pad - top;
    else if (bottom > box.bottom - pad) list.scrollTop += bottom - (box.bottom - pad);
  }, [act, uid, rows]);

  const choose = (row: Row) => {
    if (row.type === 'more') {
      // the row turns into the first of the hidden results, so Enter again opens it
      setExpanded((s) => new Set(s).add(row.group));
      return;
    }
    const { entry } = row;
    remember(entry.id);
    onClose();
    // the address already shown: tell the page anyway, so it shows the skill or section again (it may have scrolled away)
    if (location.hash === entry.href) window.dispatchEvent(new HashChangeEvent('hashchange'));
    else location.hash = entry.href;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.altKey || e.ctrlKey || e.metaKey) return;
    const n = rows.length;
    if (!n) return;
    const move = (i: number) => { e.preventDefault(); setActive(i); };
    switch (e.key) {
      case 'ArrowDown': return move((act + 1) % n);
      case 'ArrowUp': return move((act - 1 + n) % n);
      case 'PageDown': return move(Math.min(n - 1, act + 5));
      case 'PageUp': return move(Math.max(0, act - 5));
      case 'Enter': e.preventDefault(); choose(rows[act]); return;
    }
  };

  const status = !tokens.length ? '' : total ? t(total === 1 ? 'qsCountOne' : 'qsCount', { n: total }) : t('qsNothing', { q: q.trim() });
  const listId = `${uid}-list`;
  let index = -1;

  return (
    <>
      <label className="qs-field">
        <Search size={20} aria-hidden />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={rows.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={act >= 0 ? `${uid}-o${act}` : undefined}
          aria-label={t('qsLabel')}
          placeholder={t('qsPlaceholder')}
          value={q}
          onChange={(e) => query(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
        />
        {q && (
          <button type="button" className="icon-btn qs-clear" onClick={() => { query(''); inputRef.current?.focus(); }} aria-label={t('clear')}>
            <X size={16} />
          </button>
        )}
      </label>
      <p className="sr-only" role="status">{status}</p>

      <div className="qs-list" ref={listRef}>
        <div id={listId} role="listbox" aria-label={t('qsResults')}>
          {groups.map((g) => (
            <div key={g.id} className="qs-group" role="group" aria-labelledby={`${uid}-g-${g.id}`}>
              <div className="qs-group-head" id={`${uid}-g-${g.id}`} aria-hidden>
                {g.id === 'recent' && <History size={13} aria-hidden />}
                {t(GROUP_KEY[g.id])}
                {tokens.length > 0 && <span className="count">{g.total}</span>}
              </div>
              {g.rows.map((row) => {
                index += 1;
                const i = index;
                const on = i === act;
                return (
                  <div
                    key={row.type === 'entry' ? row.entry.id : `more-${row.group}`}
                    id={`${uid}-o${i}`}
                    role="option"
                    aria-selected={on}
                    className={`qs-row ${row.type === 'more' ? 'qs-more' : ''} ${on ? 'on' : ''}`}
                    // the field keeps the focus (and the phone keyboard stays where it is)
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(row)}
                    onPointerMove={(e) => { if (e.pointerType === 'mouse' && !on) setActive(i); }}
                  >
                    {row.type === 'more' ? (
                      <>
                        <span className="qs-ico" aria-hidden><ChevronDown size={18} /></span>
                        <span className="qs-text"><span className="qs-label">{t('qsShowAll', { n: row.hidden })}</span></span>
                      </>
                    ) : <EntryRow entry={row.entry} tokens={tokens} />}
                    {on && <span className="qs-enter" aria-hidden><CornerDownLeft size={15} /></span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {tokens.length > 0 && !rows.length && (
          <div className="qs-empty">
            <Search size={26} aria-hidden />
            <p><strong>{t('qsNothing', { q: q.trim() })}</strong></p>
            <p>{t('qsNothingHint')}</p>
          </div>
        )}
        {!guides && !guidesFailed && tokens.length > 0 && <p className="qs-note">{t('qsGuidesLoading')}</p>}
      </div>
    </>
  );
}

/** Highlights the parts of a name that match the query. */
function Marked({ text, tokens }: { text: string; tokens: string[] }) {
  const ranges = matchRanges(text, tokens);
  if (!ranges.length) return <>{text}</>;
  const parts: ReactNode[] = [];
  let at = 0;
  ranges.forEach(([a, b], i) => {
    if (a > at) parts.push(text.slice(at, a));
    parts.push(<mark key={i}>{text.slice(a, b)}</mark>);
    at = b;
  });
  if (at < text.length) parts.push(text.slice(at));
  return <>{parts}</>;
}

function EntryRow({ entry: e, tokens }: { entry: Entry; tokens: string[] }) {
  const { t } = useGame();
  let icon: ReactNode;
  if (e.skill) icon = <SkillTile skill={e.skill} size={36} showCd={false} tip={false} />;
  else if (e.kind === 'top') icon = <span className="qs-ico"><Trophy size={18} /></span>;
  else if (e.kind === 'guide' && e.cls) icon = <span className="qs-ico emblem-ico"><ClassEmblem cls={e.cls} size={30} /></span>;
  else if (e.kind === 'section') icon = <span className={`qs-ico tone-${e.tone}`}><ListTree size={18} /></span>;
  else if (e.Icon) icon = <span className={`qs-ico ${e.tone ? `tone-${e.tone}` : ''}`}><e.Icon size={18} /></span>;

  const kind = e.skill ? (e.skill.isStigma ? 'stigma' : e.skill.type) : null;
  return (
    <>
      <span className="qs-lead" aria-hidden>{icon}</span>
      <span className="qs-text">
        <span className="qs-label"><Marked text={e.label} tokens={tokens} /></span>
        {(e.sub || e.skill) && (
          <span className="qs-sub">
            {e.cls && e.kind !== 'guide' && <ClassEmblem cls={e.cls} size={14} />}
            {e.sub && <span className="qs-sub-text">{e.sub}</span>}
            {kind && <span className={`type-tag ${kind}`}>{t(kind)}</span>}
            {e.skill && <span className="qs-lv">{t('lv')} {e.skill.acquireLevel}</span>}
          </span>
        )}
      </span>
    </>
  );
}

/* ---------------------------------------------------------------- buttons in the shell */

const preload = () => { preloadGuides().catch(() => { /* the search tries again when it opens */ }); };

/**
 * Opens the quick search. `field`: the sidebar look (a search field with the shortcut; an icon in the rail);
 * `icon`: a square button for the top bar. Mouse users see the shortcut in the title.
 */
export function SearchButton({ onOpen, look, rail }: { onOpen: () => void; look: 'field' | 'icon'; rail?: boolean }) {
  const { t } = useGame();
  const field = look === 'field';
  return (
    <button
      type="button"
      className={field ? 'qs-open-field' : 'icon-btn qs-open-icon'}
      onClick={onOpen}
      onPointerEnter={preload}
      onFocus={preload}
      // the field shows its name ("Search…"); the icon needs one
      aria-label={field && !rail ? undefined : t('qsOpen')}
      aria-keyshortcuts={ARIA_SHORTCUTS}
      aria-haspopup="dialog"
      title={field && !rail ? undefined : `${t('qsOpen')} (${SEARCH_SHORTCUT})`}
    >
      <Search size={field ? 16 : 18} aria-hidden />
      {field && <span className="qs-open-label">{t('qsOpenField')}</span>}
      {field && <kbd className="qs-open-kbd" aria-hidden>{SEARCH_SHORTCUT}</kbd>}
    </button>
  );
}
