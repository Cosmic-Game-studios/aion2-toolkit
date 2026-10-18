import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowLeft, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Download, Eye, Flag, FolderOpen, Hexagon, Heart, Keyboard,
  LayoutGrid, Pencil, RefreshCw, ScrollText, Search, ServerOff, Share2, Sparkles, Swords, Trash2, TriangleAlert, Upload, Users, X,
} from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { ClassType, Skill } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import { isEmptyBuild, type Build } from '../../state/build';
import { lastTab } from '../../state/plannerFlow';
import { Card, CdChip, EmptyState, PageHeader, Segmented } from '../../components/ui';
import { SkillTile } from '../../components/SkillTile';
import { useSkillTip } from '../../components/SkillTooltip';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { useToast } from '../../components/Toast';
import { useConfirm } from '../../components/ConfirmDialog';
import { useBuildActions } from '../../components/BuildActions';
import { useLoadBuild } from '../../components/SavedBuildsDialog';
import { MQ, matches } from '../../components/hooks';
import {
  ApiError, COMMUNITY_ENABLED, deleteBuild, getBuild, isMine, listBuilds, reportBuild, toggleLike,
  type BuildEntry, type BuildList,
} from '../../lib/communityApi';
import { classSkills, shownLevel } from '../../lib/buildCalc';
import { applyCdr, cdAt } from '../../lib/cooldown';
import { readHash, shareOrCopy } from '../../lib/shareLink';
import { fmtDate, richText } from '../../lib/format';
import { HotbarGrid } from '../hotbar/HotbarGrid';
import { CooldownOverview } from '../hotbar/CooldownOverview';
import { MacroView } from '../hotbar/Macros';
import { DaevanionSummaryView } from '../daevanion/DaevanionSummaryView';
import { BuildCard } from './BuildCard';
import { UploadDialog } from './UploadDialog';

export function CommunityPage({ param }: { param: string | null }) {
  if (!COMMUNITY_ENABLED) return <CommunityDisabled />;
  return param ? <BuildDetail key={param} id={param} /> : <BuildListView />;
}

const smooth = (): ScrollBehavior => (matches(MQ.reducedMotion) ? 'auto' : 'smooth');

/** The live site has no community server: offer what works instead (share link, My builds, planner). */
function CommunityDisabled() {
  const { t } = useLoadedGame();
  const { build } = useBuild();
  const actions = useBuildActions();
  // an empty build is not worth a link: then the planner comes first
  const empty = isEmptyBuild(build);
  const planner = <a className={`btn ${empty ? 'primary' : 'ghost'}`} href={`#${lastTab()}`}><LayoutGrid size={16} aria-hidden /> {t('cmOpenPlanner')}</a>;
  return (
    <div className="page">
      <PageHeader icon={<Users size={22} />} title={t('communityTitle')} subtitle={t('communityText')} />
      <Card className="cm-state">
        <Users size={32} aria-hidden className="cm-state-icon" />
        <h2>{t('cmOffTitle')}</h2>
        <p>{t('communityDisabled')}</p>
        <div className="cm-state-actions">
          {empty ? planner : <button type="button" className="btn primary" onClick={() => actions.share()}><Share2 size={16} aria-hidden /> {t('cmShareMine')}</button>}
          <button type="button" className="btn" onClick={actions.openSavedBuilds}><FolderOpen size={16} aria-hidden /> {t('myBuilds')}</button>
          {!empty && planner}
        </div>
      </Card>
    </div>
  );
}

/** A skill icon that shows its tooltip on hover, keyboard focus and tap (a plain tile only on mouse hover). */
function TipTile({ skill, level, size, cdr }: { skill: Skill; level: number; size: number; cdr: number }) {
  const tip = useSkillTip(skill, level, { tap: true });
  return (
    <button type="button" className="cm-tip" aria-label={skill.name} {...tip}>
      <SkillTile skill={skill} level={level} size={size} showLevel cdr={cdr} tip={false} />
    </button>
  );
}

/* ---------------------------------------------------------------- list */

type Sort = 'new' | 'top';
interface Query { cls: ClassType | ''; q: string; tag: string; sort: Sort; page: number }

/** The list filters live in the URL (#/community?class=…&q=…&tag=…&sort=top&page=2), so Back returns to them. */
function readQuery(classes: ClassType[]): Query {
  const p = readHash().params;
  const cls = p.get('class') as ClassType | null;
  const page = Number(p.get('page'));
  return {
    cls: cls && classes.includes(cls) ? cls : '',
    q: (p.get('q') ?? '').slice(0, 80),
    tag: (p.get('tag') ?? '').slice(0, 40),
    sort: p.get('sort') === 'top' ? 'top' : 'new',
    page: Number.isInteger(page) && page > 1 ? page : 1,
  };
}

function queryHash(q: Query): string {
  const p = new URLSearchParams();
  if (q.cls) p.set('class', q.cls);
  if (q.q) p.set('q', q.q);
  if (q.tag) p.set('tag', q.tag);
  if (q.sort !== 'new') p.set('sort', q.sort);
  if (q.page > 1) p.set('page', String(q.page));
  const s = p.toString();
  return `#/community${s ? `?${s}` : ''}`;
}

// where the list was when a build was opened: the detail's back link returns there, the list restores the scroll position
let listReturn: { hash: string; y: number; id: string } | null = null;

function OfflineState({ kind, onRetry }: { kind: 'offline' | 'error'; onRetry: () => void }) {
  const { t } = useLoadedGame();
  const { build } = useBuild();
  const actions = useBuildActions();
  return (
    <Card className="cm-state" >
      {kind === 'offline' ? <ServerOff size={32} aria-hidden className="cm-state-icon" /> : <TriangleAlert size={32} aria-hidden className="cm-state-icon warn" />}
      <h2>{kind === 'offline' ? t('serverOffline') : t('cmLoadError')}</h2>
      <p>{t('serverOfflineHint')}</p>
      <div className="cm-state-actions">
        <button type="button" className="btn primary" onClick={onRetry}><RefreshCw size={16} aria-hidden /> {t('tryAgain')}</button>
        {!isEmptyBuild(build) && <button type="button" className="btn ghost" onClick={() => actions.share()}><Share2 size={16} aria-hidden /> {t('cmShareMine')}</button>}
      </div>
    </Card>
  );
}

function BuildListView() {
  const { data, t } = useLoadedGame();
  const actions = useBuildActions();
  const classes = data.classes.map((c) => c.classType);
  const [query, setQuery] = useState<Query>(() => readQuery(classes));
  const [input, setInput] = useState(query.q);
  const [list, setList] = useState<BuildList | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'offline' | 'error'>('loading');
  const [nonce, setNonce] = useState(0);
  const topRef = useRef<HTMLElement>(null);
  const restore = useRef(listReturn);

  const update = (patch: Partial<Query>, scroll = false) => {
    setQuery((q) => ({ ...q, page: 1, ...patch }));
    if (scroll) topRef.current?.scrollIntoView({ block: 'start', behavior: smooth() });
  };

  // debounce the search box
  useEffect(() => {
    const id = setTimeout(() => setQuery((q) => (q.q === input.trim() ? q : { ...q, q: input.trim(), page: 1 })), 300);
    return () => clearTimeout(id);
  }, [input]);

  // keep the URL in step (replace: filtering is not a new history entry)
  useEffect(() => {
    const next = queryHash(query);
    if (location.hash !== next) history.replaceState(history.state, '', next);
  }, [query]);

  useEffect(() => {
    let alive = true;
    setState('loading');
    listBuilds({ cls: query.cls || undefined, q: query.q || undefined, tag: query.tag || undefined, sort: query.sort, page: query.page, limit: 12 })
      .then((r) => { if (alive) { setList(r); setState('ok'); } })
      .catch((e) => { if (alive) setState(e instanceof ApiError && e.status === 0 ? 'offline' : 'error'); });
    return () => { alive = false; };
  }, [query, nonce]);

  // the app does not scroll when only the page parameter changes: start at the top unless coming back to these filters
  useLayoutEffect(() => {
    const r = restore.current;
    if (!r || r.hash !== queryHash(query)) window.scrollTo({ top: 0 });
  }, []);

  // back from a build: the same scroll position as before
  useLayoutEffect(() => {
    const r = restore.current;
    if (state !== 'ok' || !r) return;
    restore.current = null;
    listReturn = null;
    if (r.hash === queryHash(query)) window.scrollTo({ top: r.y });
  }, [state, query]);

  const filtered = !!(query.cls || query.q || query.tag);
  const resetFilters = () => { setInput(''); setQuery({ cls: '', q: '', tag: '', sort: query.sort, page: 1 }); };
  const remember = (id: string) => { listReturn = { hash: queryHash(query), y: window.scrollY, id }; };
  const goPage = (page: number) => update({ page }, true);

  return (
    <div className="page">
      <PageHeader
        icon={<Users size={22} />}
        title={t('communityTitle')}
        subtitle={t('communityText')}
        actions={
          <button type="button" className={`btn ${state === 'offline' || state === 'error' ? '' : 'primary'}`} onClick={actions.openUpload}>
            <Upload size={16} aria-hidden /> {t('uploadBuild')}
          </button>
        }
      />

      <section className="card cm-filters" ref={topRef} aria-label={t('cmFilters')}>
        <div className="cm-classes focus-inset" role="radiogroup" aria-label={t('class')}>
          <button type="button" role="radio" aria-checked={query.cls === ''} className={`chip cm-class ${query.cls === '' ? 'on' : ''}`} onClick={() => update({ cls: '' })}>
            {t('allClasses')}
          </button>
          {data.classes.map((c) => (
            <button
              key={c.classType}
              type="button"
              role="radio"
              aria-checked={query.cls === c.classType}
              className={`chip cm-class ${query.cls === c.classType ? 'on' : ''}`}
              onClick={() => update({ cls: c.classType })}
            >
              <ClassEmblem cls={c.classType} size={20} /> {c.name}
            </button>
          ))}
        </div>
        <div className="cm-filter-row">
          <label className="search-field">
            <Search size={16} aria-hidden />
            <input type="search" value={input} placeholder={t('searchBuilds')} onChange={(e) => setInput(e.target.value)} aria-label={t('searchBuilds')} enterKeyHint="search" />
            {input && <button type="button" className="icon-btn sm" onClick={() => setInput('')} aria-label={t('clear')}><X size={16} /></button>}
          </label>
          <Segmented<Sort>
            value={query.sort}
            label={t('cmSort')}
            onChange={(v) => update({ sort: v })}
            options={[{ value: 'new', label: t('sortNew') }, { value: 'top', label: t('sortTop') }]}
          />
          {query.tag && (
            <button type="button" className="chip on cm-tag-filter" onClick={() => update({ tag: '' })} aria-label={t('cmRemoveTag', { tag: query.tag })}>
              #{query.tag} <X size={14} aria-hidden />
            </button>
          )}
          <span className="cm-count" role="status">
            {state === 'ok' && list ? t(list.total === 1 ? 'cmCountOne' : 'buildsCount', { n: list.total }) : ''}
          </span>
        </div>
      </section>

      {state === 'offline' || state === 'error' ? <OfflineState kind={state} onRetry={() => setNonce((n) => n + 1)} /> : (
        <>
          {state === 'loading' && !list ? (
            <div className="build-grid" aria-busy="true">{Array.from({ length: 6 }, (_, i) => <div key={i} className="build-card skeleton" />)}</div>
          ) : list && list.items.length === 0 ? (
            <Card>
              <EmptyState
                icon={<Users size={32} aria-hidden />}
                text={filtered ? t('cmNoMatch') : t('cmNoBuildsYet')}
                action={
                  <div className="cm-state-actions">
                    {filtered && <button type="button" className="btn" onClick={resetFilters}><X size={16} aria-hidden /> {t('cmResetFilters')}</button>}
                    {!filtered && <button type="button" className="btn" onClick={actions.openUpload}><Upload size={16} aria-hidden /> {t('uploadBuild')}</button>}
                  </div>
                }
              />
            </Card>
          ) : (
            <div className={`build-grid ${state === 'loading' ? 'refreshing' : ''}`} aria-busy={state === 'loading' || undefined}>
              {list?.items.map((b) => <BuildCard key={b.id} b={b} onOpen={() => remember(b.id)} onTag={(tag) => update({ tag }, true)} />)}
            </div>
          )}

          {list && list.pages > 1 && (
            <nav className="pager" aria-label={t('cmPages')}>
              <button type="button" className="btn ghost" disabled={query.page <= 1} onClick={() => goPage(query.page - 1)}><ChevronLeft size={16} aria-hidden /> {t('prev')}</button>
              <span className="pager-pos">{t('pageOf', { p: list.page, n: list.pages })}</span>
              <button type="button" className="btn ghost" disabled={query.page >= list.pages} onClick={() => goPage(query.page + 1)}>{t('next')} <ChevronRight size={16} aria-hidden /></button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- detail */

function SkillLevels({ build }: { build: Build }) {
  const { data, t } = useLoadedGame();
  const [all, setAll] = useState(false);
  const skills = classSkills(data, build).filter((s) => !s.isStigma && s.acquireLevel <= build.l);
  const levels = new Map(skills.map((s) => [s.id, shownLevel(data, build, s)]));
  const base = skills.filter((s) => (levels.get(s.id) ?? 1) <= 1);
  const group = (type: 'active' | 'passive') => {
    const list = skills.filter((s) => s.type === type && (all || (levels.get(s.id) ?? 1) > 1));
    if (!list.length) return null;
    return (
      <>
        <h3 className="group-title">{t(type)}</h3>
        <ul className="lv-grid">
          {list.map((s) => {
            const lv = levels.get(s.id) ?? 1;
            return (
              <li key={s.id} className={`lv-item ${lv > 1 ? 'up' : ''}`}>
                <TipTile skill={s} level={lv} size={40} cdr={build.cdr} />
                <span className="lv-name">{s.name}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  };
  const levelled = skills.length - base.length;
  return (
    <>
      {levelled === 0 && !all && <p className="muted">{t('cmNoLevels')}</p>}
      {group('active')}
      {group('passive')}
      {base.length > 0 && (
        <button type="button" className="btn ghost sm cm-more" aria-expanded={all} onClick={() => setAll(!all)}>
          <ChevronDown size={15} aria-hidden className={all ? 'flip' : ''} />
          {all ? t('cmHideBase') : t('cmShowBase', { n: base.length })}
        </button>
      )}
    </>
  );
}

function StigmaList({ build }: { build: Build }) {
  const { data, t } = useLoadedGame();
  const slots = build.st.filter((s) => s.id != null);
  if (!slots.length) return <p className="muted">{t('none')}</p>;
  return (
    <ul className="stigma-mini">
      {slots.map((slot) => {
        const s = data.skillById.get(slot.id!);
        if (!s) return null;
        const base = cdAt(s, slot.lv);
        return (
          <li key={s.id}>
            <TipTile skill={s} level={slot.lv} size={44} cdr={build.cdr} />
            <div>
              <strong>{s.name}</strong>
              <div className="chips"><CdChip cd={applyCdr(base, build.cdr)} base={base} short /><span className="chip subtle">{t('lv')} {slot.lv}</span></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function BuildDetail({ id }: { id: string }) {
  const { data, t, lang } = useLoadedGame();
  const toast = useToast();
  const confirm = useConfirm();
  const loadBuild = useLoadBuild();
  const className = useClassName();
  const [entry, setEntry] = useState<BuildEntry | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'offline' | 'error' | 'missing'>('loading');
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  // opened from the list in this visit: Back returns to the same filters and scroll position
  const [fromList] = useState(() => (listReturn?.id === id ? listReturn : null));
  const back = fromList?.hash ?? '#/community';

  const load = useCallback(() => {
    setState('loading');
    getBuild(id)
      .then((e) => { setEntry(e); setState('ok'); })
      // only a 404 means the build is gone; a server error can be tried again
      .catch((e) => setState(!(e instanceof ApiError) ? 'error' : e.status === 0 ? 'offline' : e.status === 404 ? 'missing' : 'error'));
  }, [id]);
  useEffect(load, [load]);
  // only the page parameter changed, so the app does not scroll: start at the top
  useEffect(() => { window.scrollTo({ top: 0 }); }, [id]);

  const backLink = (
    <a
      className="back-link"
      href={back}
      onClick={(e) => { if (fromList && listReturn === fromList) { e.preventDefault(); history.back(); } }}
    >
      <ArrowLeft size={16} aria-hidden /> {t('cmAllBuilds')}
    </a>
  );

  if (state === 'loading') return <div className="page">{backLink}<div className="loading" role="status"><span className="spinner" aria-hidden />{t('cmLoadingBuild')}</div></div>;
  if (state === 'offline' || state === 'error') return <div className="page">{backLink}<OfflineState kind={state} onRetry={load} /></div>;
  if (state === 'missing' || !entry) {
    return (
      <div className="page">
        {backLink}
        <Card className="cm-state">
          <Users size={32} aria-hidden className="cm-state-icon" />
          <h2>{t('cmMissing')}</h2>
          <div className="cm-state-actions"><a className="btn primary" href="#/community">{t('cmAllBuilds')}</a></div>
        </Card>
      </div>
    );
  }

  const b = entry.build;
  const mine = isMine(entry.id);
  const slotsUsed = Object.keys(b.bar).length;

  const like = async () => {
    try {
      const r = await toggleLike(entry.id);
      setEntry({ ...entry, likes: r.likes, liked: r.liked });
    } catch { toast(t('serverOffline'), 'error'); }
  };
  const loadIntoPlanner = () => {
    loadBuild(b, { message: t('loadedIntoCalc') });
    location.hash = '#/skills';
  };
  const share = async () => {
    const url = `${location.origin}${location.pathname}#/community/${entry.id}`;
    const r = await shareOrCopy(url, `${entry.title} – Daevaforge`);
    if (r === 'copied') toast(t('linkCopied'), 'ok');
    else if (r === 'failed') toast(t('copyFailed'), 'error');
  };
  const remove = async () => {
    const ok = await confirm({ title: t('deleteConfirm'), message: t('cmDeleteText', { title: entry.title }), confirmLabel: t('remove'), danger: true });
    if (!ok) return;
    setBusy(true);
    try {
      await deleteBuild(entry.id);
      toast(t('deleted'), 'ok');
      listReturn = null;
      location.hash = '#/community';
    } catch (e) {
      toast(e instanceof ApiError && e.status === 0 ? t('serverOffline') : e instanceof Error ? e.message : String(e), 'error');
    } finally { setBusy(false); }
  };
  const report = async () => {
    if (!(await confirm({ title: t('reportConfirm'), message: t('cmReportText'), confirmLabel: t('report') }))) return;
    try { await reportBuild(entry.id, 'user report'); toast(t('reported'), 'ok'); } catch { toast(t('serverOffline'), 'error'); }
  };

  return (
    <div className="page cm-detail">
      {backLink}

      <section className="build-hero">
        <ClassEmblem cls={b.c} size={64} />
        <div className="bh-main">
          <h1>{entry.title}</h1>
          <p className="bh-by">
            {className(b.c)} · {t('lv')} {b.l} · {t('by', { name: entry.author || t('cmAnonymous') })}
            {mine && <span className="chip accent">{t('yours')}</span>}
          </p>
        </div>
        <div className="bh-actions">
          <button type="button" className="btn primary bh-load" onClick={loadIntoPlanner}><Download size={16} aria-hidden /> {t('loadIntoCalc')}</button>
          <button type="button" className="btn" onClick={share}><Share2 size={16} aria-hidden /> {t('share')}</button>
          <button
            type="button"
            className={`btn like ${entry.liked ? 'on' : ''}`}
            onClick={like}
            aria-pressed={entry.liked}
            aria-label={t('cmLikeLabel', { n: entry.likes })}
          >
            <Heart size={16} aria-hidden fill={entry.liked ? 'currentColor' : 'none'} /> {entry.likes}
          </button>
          {mine && <button type="button" className="btn ghost" onClick={() => setEditing(true)}><Pencil size={16} aria-hidden /> {t('edit')}</button>}
          {mine && <button type="button" className="btn ghost danger" disabled={busy} onClick={remove}><Trash2 size={16} aria-hidden /> {t('remove')}</button>}
          {!mine && <button type="button" className="btn ghost" onClick={report}><Flag size={16} aria-hidden /> {t('report')}</button>}
        </div>
        <div className="bh-meta">
          <span><CalendarDays size={14} aria-hidden /> <time dateTime={entry.updatedAt || entry.createdAt}>{fmtDate(entry.updatedAt || entry.createdAt, lang)}</time></span>
          <span><Eye size={14} aria-hidden /> {entry.views}<span className="sr-only"> {t('views')}</span></span>
          {b.cdr > 0 && <span className="chip subtle">{t('cdr')}: {b.cdr}%</span>}
          {entry.tags.map((tag) => (
            <a key={tag} className="tag" href={queryHash({ cls: '', q: '', tag, sort: 'new', page: 1 })} aria-label={t('cmFilterTag', { tag })}>#{tag}</a>
          ))}
        </div>
      </section>

      {entry.description && <Card><div className="build-desc">{richText(entry.description)}</div></Card>}

      <div className="detail-grid">
        <Card title={t('skillsSummary')} icon={<Swords size={16} aria-hidden />}>
          <SkillLevels build={b} />
        </Card>
        <Card title={t('stigmaEquipped')} icon={<Sparkles size={16} aria-hidden />}>
          <StigmaList build={b} />
        </Card>
      </div>

      <Card title={<>{t('skillBar')} <span className="count">{slotsUsed}</span></>} icon={<Keyboard size={16} aria-hidden />}>
        {slotsUsed === 0 ? <p className="muted">{t('none')}</p> : (
          <div className="hotbar-scroll"><HotbarGrid data={data} build={b} readOnly size={42} /></div>
        )}
      </Card>

      <div className="detail-grid">
        <Card title={<>{t('macros')} <span className="count">{b.macros.length}</span></>} icon={<ScrollText size={16} aria-hidden />}>
          <MacroView data={data} build={b} />
        </Card>
        <CooldownOverview data={data} build={b} />
      </div>

      <Card title={t('daevanionSummary')} icon={<Hexagon size={16} aria-hidden />}>
        <DaevanionSummaryView data={data} build={b} compact />
      </Card>

      {editing && (
        <UploadDialog
          editing={entry}
          onClose={() => setEditing(false)}
          onSaved={(e) => { if (e) setEntry(e); setEditing(false); }}
        />
      )}
    </div>
  );
}
