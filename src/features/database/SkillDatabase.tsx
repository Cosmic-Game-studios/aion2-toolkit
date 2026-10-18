import { memo, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowRight, BookOpen, ChevronDown, Layers, Link2, Minus, Plus, RotateCcw, Search, SlidersHorizontal, Timer, X } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { ClassType, GameData, Skill } from '../../data/types';
import { CURATED_COMBOS } from '../../data/combos';
import { PlainIcon, SkillTile } from '../../components/SkillTile';
import { SkillDetail, SkillHead } from '../../components/SkillDetail';
import { useEnglishData } from '../../data/useEnglishData';
import { sumDeltas, workingSpecs } from '../../lib/specEffects';
import { SpecSandbox } from './SpecSandbox';
import { ClassEmblem } from '../../components/ClassSelect';
import { Card, CdChip, EmptyState, PageHeader, Segmented } from '../../components/ui';
import { Modal } from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { MQ, useMediaQuery } from '../../components/hooks';
import { richText } from '../../lib/format';
import { cdAt, fmtCdShort } from '../../lib/cooldown';
import { comboSkillIds } from '../../lib/combos';
import { skillCap } from '../../lib/levelCap';
import { readHash, shareOrCopy } from '../../lib/shareLink';
import { storage } from '../../lib/storage';
import { useBuild } from '../../state/BuildContext';
import { ComboCard } from '../combos/ComboCard';

type TypeFilter = 'all' | 'active' | 'passive' | 'stigma';
type Kind = Exclude<TypeFilter, 'all'>;
type Sort = 'level' | 'name' | 'cd';
type Tab = 'overview' | 'specs' | 'levels' | 'combos';

const typeOf = (s: Skill): Kind => (s.isStigma ? 'stigma' : s.type);
const KINDS: Kind[] = ['active', 'passive', 'stigma'];
const TYPES: TypeFilter[] = ['all', ...KINDS];
const SORTS: Sort[] = ['level', 'name', 'cd'];

// search, type, sort and the cooldown filter live for the browser session (back from another page = same list);
// the class is remembered for good, but only once the player picked one
const FILTER_KEY = 'aion2tk:db:filters';
const CLASS_KEY = 'db:cls';
interface Filters { type: TypeFilter; q: string; sort: Sort; onlyCd: boolean }
const DEFAULT_FILTERS: Filters = { type: 'all', q: '', sort: 'level', onlyCd: false };

function readFilters(): Filters {
  try {
    const raw = JSON.parse(sessionStorage.getItem(FILTER_KEY) ?? 'null') as Partial<Filters> | null;
    if (!raw) return DEFAULT_FILTERS;
    return {
      type: TYPES.includes(raw.type as TypeFilter) ? raw.type as TypeFilter : 'all',
      q: typeof raw.q === 'string' ? raw.q : '',
      sort: SORTS.includes(raw.sort as Sort) ? raw.sort as Sort : 'level',
      onlyCd: raw.onlyCd === true,
    };
  } catch {
    return DEFAULT_FILTERS;
  }
}
function writeFilters(f: Filters) {
  try { sessionStorage.setItem(FILTER_KEY, JSON.stringify(f)); } catch { /* private mode */ }
}

const skillFromParam = (data: GameData, param: string | null): Skill | null => {
  if (!param || !/^\d+$/.test(param)) return null;
  return data.skillById.get(Number(param)) ?? null;
};

/** The URL names the open skill (#/database/<id>), so it can be shared and survives a reload. */
const setUrl = (id: number | null, push: boolean) => {
  const hash = id == null ? '#/database' : `#/database/${id}`;
  if (location.hash === hash) return;
  if (push) history.pushState(history.state, '', hash);
  else history.replaceState(history.state, '', hash);
};

export function SkillDatabase({ param, visit = 0 }: { param?: string | null; visit?: number }) {
  const { data, t } = useLoadedGame();
  const { build, picked } = useBuild();
  const en = useEnglishData();
  const narrow = useMediaQuery(MQ.narrow);
  const phone = useMediaQuery(MQ.phone);
  const searchRef = useRef<HTMLInputElement>(null);
  const uid = useId().replace(/:/g, '');

  // a shared link opens its skill with filters that show it
  const [linked] = useState(() => skillFromParam(data, param ?? null));
  const sheetFocus = useRef<HTMLDivElement>(null);
  const [init] = useState(() => {
    if (linked) return { cls: linked.classType as ClassType | 'all', f: DEFAULT_FILTERS };
    const valid = (c: unknown): c is ClassType | 'all' => c === 'all' || data.classes.some((x) => x.classType === c);
    const fromLink = readHash().params.get('cls');
    const stored = storage.get<string | null>(CLASS_KEY, null);
    const cls = valid(fromLink) ? fromLink : valid(stored) ? stored : picked ? build.c : 'all';
    return { cls, f: readFilters() };
  });
  const [cls, setCls] = useState<ClassType | 'all'>(init.cls);
  const [type, setType] = useState<TypeFilter>(init.f.type);
  const [q, setQ] = useState(init.f.q);
  const [sort, setSort] = useState<Sort>(init.f.sort);
  const [onlyCd, setOnlyCd] = useState(init.f.onlyCd);
  const [selected, setSelected] = useState<number | null>(linked?.id ?? null);
  const [tab, setTab] = useState<Tab>('overview');
  const [reveal, setReveal] = useState<number | null>(linked?.id ?? null);
  // the revealed card also takes the focus when a link inside the app opened it (quick search, Back), not on a fresh load
  const revealFocus = useRef(!!linked && visit > 0);
  // a history entry was added for the open sheet (phones): Back closes it, and so does the close button
  const pushed = useRef(false);

  useEffect(() => { writeFilters({ type, q, sort, onlyCd }); }, [type, q, sort, onlyCd]);

  const chooseClass = (c: ClassType | 'all') => { setCls(c); storage.set(CLASS_KEY, c); };

  const matchQ = (s: Skill, needle: string) => !needle
    || s.name.toLowerCase().includes(needle)
    || s.description.toLowerCase().includes(needle)
    // English names work in the German UI too (players often know the English name)
    || (en?.skillById.get(s.id)?.name.toLowerCase().includes(needle) ?? false);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.skills
      .filter((s) => cls === 'all' || s.classType === cls)
      .filter((s) => type === 'all' || typeOf(s) === type)
      .filter((s) => !onlyCd || s.cooldownSec > 0)
      .filter((s) => matchQ(s, needle))
      .sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name);
        if (sort === 'cd') return b.cooldownSec - a.cooldownSec || a.name.localeCompare(b.name);
        return Number(a.isStigma) - Number(b.isStigma) || a.acquireLevel - b.acquireLevel || a.id - b.id;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, en, cls, type, q, sort, onlyCd]);

  // a search inside one class also counts the other classes, so no skill hides behind the class filter
  const elsewhere = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (cls === 'all' || !needle) return 0;
    return data.skills.filter((s) => s.classType !== cls && (type === 'all' || typeOf(s) === type) && (!onlyCd || s.cooldownSec > 0) && matchQ(s, needle)).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, en, cls, type, q, onlyCd]);

  // sorted by learn level: one section per class (sticky heading) and per type; other sorts are one flat list
  const groups = useMemo(() => {
    if (sort !== 'level') return null;
    return data.classes
      .map((c) => {
        const skills = list.filter((s) => s.classType === c.classType);
        return { cls: c.classType, name: c.name, total: skills.length, kinds: KINDS.map((k) => ({ kind: k, skills: skills.filter((s) => typeOf(s) === k) })).filter((x) => x.skills.length) };
      })
      .filter((g) => g.total > 0);
  }, [data, list, sort]);

  const sel = selected != null ? data.skillById.get(selected) ?? null : null;
  const className = (c: ClassType) => data.classes.find((x) => x.classType === c)?.name ?? c;

  // makes sure the opened skill is in the list (a link may point to another class or a filtered-out type)
  const showInList = (s: Skill) => {
    setCls((c) => (c === 'all' || c === s.classType ? c : s.classType));
    setType((x) => (x === 'all' || x === typeOf(s) ? x : 'all'));
    setOnlyCd((v) => (v && s.cooldownSec <= 0 ? false : v));
    setQ((x) => (matchQ(s, x.trim().toLowerCase()) ? x : ''));
  };
  const showInListRef = useRef(showInList);
  showInListRef.current = showInList;

  // Back / Forward and links to #/database/<id> while the page is open
  useEffect(() => {
    const sync = () => {
      const h = readHash();
      if (h.base !== '/database') return;
      const s = skillFromParam(data, h.param);
      pushed.current = false;
      setSelected(s?.id ?? null);
      if (s) { showInListRef.current(s); setReveal(s.id); revealFocus.current = true; }
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, [data]);

  // scroll a linked skill's card into view once the list shows it (the sheet on phones takes the focus by itself)
  useEffect(() => {
    if (reveal == null) return;
    const el = document.getElementById(`db-card-${reveal}`);
    if (!el) return;
    setReveal(null);
    const focus = revealFocus.current && !narrow;
    revealFocus.current = false;
    requestAnimationFrame(() => {
      el.scrollIntoView({ block: 'center', behavior: 'auto' });
      if (focus) el.focus({ preventScroll: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reveal, list]);

  // "/" jumps to the search field (keyboard users)
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest('input, textarea, select, [contenteditable="true"]') || document.querySelector('.modal-backdrop')) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const pick = (s: Skill) => {
    setSelected(s.id);
    if (narrow && !pushed.current) { setUrl(s.id, true); pushed.current = true; }
    else setUrl(s.id, false);
  };
  const pickRef = useRef(pick);
  pickRef.current = pick;
  const onPick = useMemo(() => (s: Skill) => pickRef.current(s), []);

  const closeSheet = () => {
    setSelected(null);
    if (pushed.current) { pushed.current = false; history.back(); }
    else setUrl(null, false);
  };

  const filtersOn = q !== '' || type !== 'all' || onlyCd;
  const resetFilters = () => { setQ(''); setType('all'); setOnlyCd(false); };
  const showClassOnCards = cls === 'all' && !groups;

  // class chips: one radio group, arrow keys move the choice (roving focus)
  const classOptions: (ClassType | 'all')[] = ['all', ...data.classes.map((c) => c.classType)];
  const onClassKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = classOptions.indexOf(cls);
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1
      : e.key === 'Home' ? 0 : e.key === 'End' ? classOptions.length - 1 : null;
    if (next == null) return;
    e.preventDefault();
    const n = (next + classOptions.length) % classOptions.length;
    chooseClass(classOptions[n]);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[n]?.focus();
  };

  const card = (s: Skill) => (
    <DbCard key={s.id} skill={s} selected={selected === s.id} showClass={showClassOnCards} className={className(s.classType)} sheet={narrow} onPick={onPick} />
  );

  const sortControl = (
    <Segmented<Sort>
      value={sort}
      onChange={setSort}
      label={t('sortBy')}
      options={[
        { value: 'level', label: t('sortLevel') },
        { value: 'name', label: t('sortName') },
        { value: 'cd', label: t('sortCd') },
      ]}
    />
  );
  const cdToggle = (
    <label className="toggle">
      <input type="checkbox" checked={onlyCd} onChange={(e) => setOnlyCd(e.target.checked)} />
      <span className="toggle-ui" />
      <Timer size={14} aria-hidden /> {t('onlyWithCd')}
    </label>
  );

  let listView: ReactNode;
  if (list.length === 0) {
    listView = (
      <Card>
        <EmptyState
          icon={<Search size={28} />}
          text={t('noResults')}
          action={(
            <div className="db-empty-actions">
              {filtersOn && <button type="button" className="btn sm" onClick={resetFilters}><RotateCcw size={14} aria-hidden /> {t('dbResetFilters')}</button>}
              {cls !== 'all' && <button type="button" className="btn sm" onClick={() => chooseClass('all')}><Search size={14} aria-hidden /> {t('dbAllClasses')}</button>}
            </div>
          )}
        />
      </Card>
    );
  } else if (groups) {
    const TypeHead = cls === 'all' ? 'h3' : 'h2';
    listView = (
      <div className="db-list">
        {groups.map((g) => (
          <section key={g.cls} className="db-group" aria-labelledby={cls === 'all' ? `${uid}-${g.cls}` : undefined}>
            {cls === 'all' && (
              <h2 className="db-group-head" id={`${uid}-${g.cls}`}>
                <ClassEmblem cls={g.cls} size={22} />
                <span className="gold-text tw:font-heading tw:text-lg tw:font-bold tw:tracking-[.03em]">{g.name}</span>
                <span className="count">{g.total}</span>
              </h2>
            )}
            {g.kinds.map((k) => (
              <div key={k.kind} className="db-type">
                <TypeHead className="db-type-head eyebrow">{t(k.kind)} <span className="count">{k.skills.length}</span></TypeHead>
                <div className="card-grid db">{k.skills.map(card)}</div>
              </div>
            ))}
          </section>
        ))}
      </div>
    );
  } else {
    listView = <div className="card-grid db">{list.map(card)}</div>;
  }
  const elsewhereHint = elsewhere > 0 && list.length > 0 && (
    <button type="button" className="btn ghost sm db-elsewhere" onClick={() => chooseClass('all')}>
      <Search size={14} aria-hidden /> {t('dbMoreElsewhere', { n: elsewhere })}
    </button>
  );

  return (
    <div className="page db-page">
      <PageHeader icon={<BookOpen size={22} />} title={t('navDatabase')} subtitle={t('homeDatabaseText')} />

      {/* search first: stays at the top while the list scrolls */}
      <div className="db-bar">
        <label className="search-field">
          <Search size={16} aria-hidden />
          <input
            ref={searchRef}
            type="search"
            value={q}
            placeholder={t('search')}
            onChange={(e) => setQ(e.target.value)}
            aria-label={t('search')}
            aria-keyshortcuts="/"
            enterKeyHint="search"
          />
          {q ? (
            <button type="button" className="icon-btn sm" onClick={() => { setQ(''); searchRef.current?.focus(); }} aria-label={t('clear')}><X size={14} /></button>
          ) : <kbd className="db-kbd" aria-hidden>/</kbd>}
        </label>
        <span className="db-count" role="status">{t('showing', { n: list.length })}</span>
        {filtersOn && (
          <button type="button" className="btn ghost sm db-reset" onClick={resetFilters} aria-label={t('dbResetFilters')}>
            <RotateCcw size={14} aria-hidden /><span className="hide-sm">{t('dbResetFilters')}</span>
          </button>
        )}
      </div>

      <div className="db-filters">
        <div className="class-chips focus-inset" role="radiogroup" aria-label={t('class')} onKeyDown={onClassKey}>
          {classOptions.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={cls === c}
              tabIndex={cls === c ? 0 : -1}
              className={`class-chip ${cls === c ? 'on' : ''}`}
              onClick={() => chooseClass(c)}
            >
              {c === 'all' ? t('allClasses') : <><ClassEmblem cls={c} size={20} /> {className(c)}</>}
            </button>
          ))}
        </div>
        <div className="db-filter-row">
          <Segmented<TypeFilter>
            value={type}
            onChange={setType}
            label={t('type')}
            options={[
              { value: 'all', label: t('all') },
              { value: 'active', label: t('active') },
              { value: 'passive', label: t('passive') },
              { value: 'stigma', label: t('stigma') },
            ]}
          />
          {phone ? (
            <details className="db-more">
              <summary>
                <SlidersHorizontal size={16} aria-hidden /> {t('dbSortFilter')}
                {(sort !== 'level' || onlyCd) && <span className="db-more-dot" aria-hidden />}
                <ChevronDown size={15} className="chev" aria-hidden />
              </summary>
              <div className="db-more-body">{sortControl}{cdToggle}</div>
            </details>
          ) : <>{sortControl}{cdToggle}</>}
        </div>
      </div>

      {narrow ? (
        <>
          {elsewhereHint}
          {listView}
          <Modal open={!!sel} title={sel?.name ?? ''} onClose={closeSheet} size="wide" sheet bodyClassName="db-sheet" initialFocus={sheetFocus}>
            {/* focus starts on the content, not on the level slider */}
            <div ref={sheetFocus} tabIndex={-1}>
              {sel && <DbDetail key={sel.id} skill={sel} tab={tab} onTab={setTab} />}
            </div>
          </Modal>
        </>
      ) : (
        <div className="split">
          <div className="db-results">{elsewhereHint}{listView}</div>
          <aside className="side sticky" aria-label={t('details')}>
            <Card className="db-detail-card">
              {sel ? <DbDetail key={sel.id} skill={sel} tab={tab} onTab={setTab} /> : <EmptyState icon={<BookOpen size={28} />} text={t('dbSelectHint')} />}
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}

interface CardProps { skill: Skill; selected: boolean; showClass: boolean; className: string; sheet: boolean; onPick: (s: Skill) => void }

/** One result: icon, name, type, learn level, cooldown and the first line of the text (memoised: 300 of them). */
const DbCard = memo(function DbCard({ skill: s, selected, showClass, className, sheet, onPick }: CardProps) {
  const { t } = useLoadedGame();
  const kind = typeOf(s);
  return (
    <button
      id={`db-card-${s.id}`}
      type="button"
      className={`skill-card db-card ${kind} ${selected ? 'selected' : ''}`}
      onClick={() => onPick(s)}
      aria-label={s.name}
      aria-describedby={`db-meta-${s.id} db-desc-${s.id}`}
      aria-pressed={sheet ? undefined : selected}
      aria-haspopup={sheet ? 'dialog' : undefined}
    >
      <SkillTile skill={s} size={44} showCd={false} tip={false} />
      <span className="sc-body">
        <span className="sc-name">{s.name}</span>
        <span className="sc-meta" id={`db-meta-${s.id}`}>
          <span className={`type-tag ${kind}`}>{t(kind)}</span>
          <span className="sc-lv">{t('lv')} {s.acquireLevel}</span>
          {s.cooldownSec > 0 && <CdChip cd={s.cooldownSec} short />}
          {s.castTimeSec > 0 && <span className="sc-cast">{t('castTime')} {s.castTimeSec}s</span>}
          {showClass && <span className="sc-class"><ClassEmblem cls={s.classType} size={14} /> {className}</span>}
        </span>
        <span className="sc-desc" id={`db-desc-${s.id}`}>{richText(s.description)}</span>
      </span>
    </button>
  );
});

/** Everything about one skill: values per level, specialisations to try, all levels, its combos. */
function DbDetail({ skill: sel, tab, onTab }: { skill: Skill; tab: Tab; onTab: (t: Tab) => void }) {
  const { data, t } = useLoadedGame();
  const { build, setClass } = useBuild();
  const en = useEnglishData();
  const toast = useToast();
  const uid = useId().replace(/:/g, '');
  const cap = skillCap(sel);
  // opens at the highest level the game has, where all specialisation slots are open
  const [lv, setLv] = useState(() => Math.min(cap, sel.levels.length || 1));
  const [allLevels, setAllLevels] = useState(false);
  const [chosen, setChosen] = useState<number[]>([]);
  const shownLevels = allLevels ? sel.levels : sel.levels.slice(0, cap);
  const shownLv = Math.max(1, Math.min(shownLevels.length, lv));
  const enSkill = en?.skillById.get(sel.id);
  const working = workingSpecs(sel, shownLv, chosen);
  const delta = sumDeltas(enSkill, working);
  const combos = useMemo(() => (CURATED_COMBOS[sel.classType] ?? []).filter((c) => comboSkillIds(c).includes(sel.id)), [sel]);
  const ownClass = sel.classType === build.c;
  const clsName = data.classes.find((x) => x.classType === sel.classType)?.name ?? sel.classType;
  const planHref = sel.isStigma ? `#/stigma/${sel.id}` : `#/skills/${sel.id}`;

  const tabs: [Tab, string, number | null][] = [
    ['overview', t('tabOverview'), null],
    ...((sel.parts?.length ?? 0) > 0 ? [['specs', t('tabSpecs'), sel.parts!.length] as [Tab, string, number]] : []),
    ...(sel.levels.length > 1 ? [['levels', t('tabLevels'), shownLevels.length] as [Tab, string, number]] : []),
    ...(combos.length ? [['combos', t('navCombos'), combos.length] as [Tab, string, number]] : []),
  ];
  const shownTab: Tab = tabs.some(([id]) => id === tab) ? tab : 'overview';

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex(([id]) => id === shownTab);
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
    if (next == null) return;
    e.preventDefault();
    const n = (next + tabs.length) % tabs.length;
    onTab(tabs[n][0]);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[n]?.focus();
  };

  const shareSkill = async () => {
    const url = new URL(location.href);
    url.hash = `/database/${sel.id}`;
    const res = await shareOrCopy(url.toString(), `${sel.name} – Daevaforge`);
    if (res === 'copied') toast(t('linkCopied'));
    else if (res === 'failed') toast(t('copyFailed'), 'error');
  };

  return (
    <div className="db-detail">
      <SkillHead
        skill={sel}
        level={shownLv}
        extra={(
          <div className="db-class-line">
            <ClassEmblem cls={sel.classType} size={16} /> {clsName}
            {sel.maxLevel > cap && <span className="muted">· {t('maxLevelLater', { n: sel.maxLevel })}</span>}
          </div>
        )}
      />
      <div className="db-actions">
        {ownClass ? (
          <a className="btn sm" href={planHref}><ArrowRight size={14} aria-hidden /> {t('dbPlanSkill')}</a>
        ) : (
          <button type="button" className="btn sm" onClick={() => { setClass(sel.classType); location.hash = planHref; }}>
            <ArrowRight size={14} aria-hidden /> {t('dbPlanAs', { cls: clsName })}
          </button>
        )}
        <button type="button" className="btn ghost sm" onClick={shareSkill}><Link2 size={14} aria-hidden /> {t('dbLinkSkill')}</button>
      </div>

      {shownLevels.length > 1 && (
        <div className="lv-stepper">
          <span className="eyebrow" id={`${uid}-lv`}>{t('level')}</span>
          <button type="button" className="icon-btn sm" aria-label={t('levelDown')} disabled={shownLv <= 1} onClick={() => setLv(shownLv - 1)}><Minus size={14} /></button>
          <b className="lv-value" aria-live="polite">{shownLv}</b>
          <button type="button" className="icon-btn sm" aria-label={t('levelUp')} disabled={shownLv >= shownLevels.length} onClick={() => setLv(shownLv + 1)}><Plus size={14} /></button>
          <input type="range" min={1} max={shownLevels.length} value={shownLv} aria-labelledby={`${uid}-lv`} onChange={(e) => setLv(Number(e.target.value))} />
        </div>
      )}
      {tabs.length > 1 && (
        <div className="detail-tabs" role="tablist" aria-label={sel.name} onKeyDown={onTabKey}>
          {tabs.map(([id, label, n]) => (
            <button
              key={id}
              id={`${uid}-tab-${id}`}
              type="button"
              role="tab"
              aria-selected={shownTab === id}
              aria-controls={`${uid}-panel`}
              tabIndex={shownTab === id ? 0 : -1}
              className={shownTab === id ? 'on' : ''}
              onClick={() => onTab(id)}
            >
              {label}{n != null && <span className="count">{n}</span>}
            </button>
          ))}
        </div>
      )}

      <div id={`${uid}-panel`} role={tabs.length > 1 ? 'tabpanel' : undefined} aria-labelledby={tabs.length > 1 ? `${uid}-tab-${shownTab}` : undefined}>
        {shownTab === 'overview' && (
          <>
            <SkillDetail skill={sel} level={shownLv} cdr={0} uncapped={allLevels} head={false} hideSpecs delta={delta} />
            {(sel.parts?.length ?? 0) > 0 && (
              <button type="button" className="spec-teaser" onClick={() => onTab('specs')}>
                <Layers size={16} aria-hidden />
                <span>{working.length ? t('specWorking', { n: working.length }) : t('specTry', { n: sel.parts!.length })}</span>
                <span className="spec-teaser-icons" aria-hidden>
                  {working.map((id) => {
                    const part = sel.parts!.find((x) => x.id === id);
                    return part ? <PlainIcon key={id} icon={part.icon} size={22} /> : null;
                  })}
                </span>
                <ArrowRight size={15} aria-hidden />
              </button>
            )}
          </>
        )}

        {shownTab === 'specs' && (
          <SpecSandbox
            skill={sel}
            en={enSkill}
            level={shownLv}
            chosen={chosen}
            working={working}
            delta={delta}
            onChange={setChosen}
            plannerHref={ownClass && !sel.isStigma ? planHref : undefined}
          />
        )}

        {shownTab === 'levels' && (
          <>
            <div className="table-wrap">
              <table className="table level-table">
                <thead>
                  <tr><th>{t('lv')}</th><th>{t('cooldown')}</th><th>{t('description')}</th></tr>
                </thead>
                <tbody>
                  {shownLevels.map((l) => (
                    <tr key={l.level} className={`${l.level === shownLv ? 'on' : ''} ${l.level > cap ? 'future' : ''}`} onClick={() => setLv(l.level)}>
                      <td>
                        <button type="button" className="lv-pick" aria-pressed={l.level === shownLv} onClick={(e) => { e.stopPropagation(); setLv(l.level); }}>
                          {l.level}
                        </button>
                      </td>
                      <td className="nowrap">{cdAt(sel, l.level) > 0 ? fmtCdShort(cdAt(sel, l.level)) : '–'}</td>
                      <td>{richText(l.description)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sel.levels.length > cap && (
              <button type="button" className="link small db-future" onClick={() => setAllLevels((v) => !v)}>
                {allLevels ? t('hideFutureLevels', { n: cap }) : t('futureLevels', { from: cap + 1, to: sel.levels.length })}
              </button>
            )}
          </>
        )}

        {shownTab === 'combos' && (
          <div className="db-combos">
            <div className="combo-list">
              {combos.map((c) => <ComboCard key={c.id} combo={c} focus={sel.id} compact neutral={!ownClass} />)}
            </div>
            {ownClass && <a className="link small" href="#/combos">{t('allCombos')} <ArrowRight size={13} aria-hidden /></a>}
          </div>
        )}
      </div>
    </div>
  );
}
