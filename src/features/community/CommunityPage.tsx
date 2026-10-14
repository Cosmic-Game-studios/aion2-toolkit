import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft, ChevronLeft, ChevronRight, Download, Eye, Flag, Hexagon, Heart, Keyboard, Link2, Pencil,
  RefreshCw, ScrollText, Search, ServerOff, Sparkles, Swords, Trash2, Upload, Users, X,
} from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { ClassType } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import type { Build } from '../../state/build';
import { Card, CdChip, EmptyState, PageHeader, Segmented } from '../../components/ui';
import { SkillTile } from '../../components/SkillTile';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { useToast } from '../../components/Toast';
import {
  ApiError, deleteBuild, getBuild, isMine, listBuilds, reportBuild, toggleLike,
  type BuildEntry, type BuildList,
} from '../../lib/communityApi';
import { classSkills, skillLevel } from '../../lib/buildCalc';
import { applyCdr, cdAt } from '../../lib/cooldown';
import { copyText } from '../../lib/shareLink';
import { richText } from '../../lib/format';
import { HotbarGrid } from '../hotbar/HotbarGrid';
import { CooldownOverview } from '../hotbar/CooldownOverview';
import { MacroView } from '../hotbar/Macros';
import { DaevanionSummaryView } from '../daevanion/DaevanionSummaryView';
import { BuildCard, fmtDate } from './BuildCard';
import { UploadDialog } from './UploadDialog';

export function CommunityPage({ param }: { param: string | null }) {
  return param ? <BuildDetail id={param} /> : <BuildListView />;
}

/* ---------------------------------------------------------------- list */

type Sort = 'new' | 'top';

function OfflineState({ onRetry }: { onRetry: () => void }) {
  const { t } = useLoadedGame();
  return (
    <Card>
      <EmptyState
        icon={<ServerOff size={32} />}
        text={t('serverOffline')}
        action={
          <>
            <p className="muted small">{t('serverOfflineHint')}</p>
            <button type="button" className="btn" onClick={onRetry}><RefreshCw size={15} /> {t('tryAgain')}</button>
          </>
        }
      />
    </Card>
  );
}

function BuildListView() {
  const { data, t } = useLoadedGame();
  const [cls, setCls] = useState<ClassType | ''>('');
  const [input, setInput] = useState('');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<Sort>('new');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<BuildList | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'offline' | 'error'>('loading');
  const [upload, setUpload] = useState(false);
  const [nonce, setNonce] = useState(0);

  // debounce the search box
  useEffect(() => {
    const id = setTimeout(() => { setQ(input.trim()); setPage(1); }, 300);
    return () => clearTimeout(id);
  }, [input]);

  useEffect(() => {
    let alive = true;
    setState('loading');
    listBuilds({ cls: cls || undefined, q: q || undefined, sort, page, limit: 12 })
      .then((r) => { if (alive) { setList(r); setState('ok'); } })
      .catch((e) => { if (alive) setState(e instanceof ApiError && e.status === 0 ? 'offline' : 'error'); });
    return () => { alive = false; };
  }, [cls, q, sort, page, nonce]);

  return (
    <div className="page">
      <PageHeader
        icon={<Users size={22} />}
        title={t('communityTitle')}
        subtitle={t('communityText')}
        actions={<button type="button" className="btn primary" onClick={() => setUpload(true)}><Upload size={16} /> {t('uploadBuild')}</button>}
      />

      <Card className="filters">
        <div className="class-chips" role="radiogroup" aria-label={t('class')}>
          <button type="button" role="radio" aria-checked={cls === ''} className={`class-chip ${cls === '' ? 'on' : ''}`} onClick={() => { setCls(''); setPage(1); }}>
            {t('allClasses')}
          </button>
          {data.classes.map((c) => (
            <button key={c.classType} type="button" role="radio" aria-checked={cls === c.classType}
              className={`class-chip ${cls === c.classType ? 'on' : ''}`} onClick={() => { setCls(c.classType); setPage(1); }}>
              <ClassEmblem cls={c.classType} size={20} /> {c.name}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="search-field">
            <Search size={16} />
            <input type="search" value={input} placeholder={t('searchBuilds')} onChange={(e) => setInput(e.target.value)} aria-label={t('searchBuilds')} />
            {input && <button type="button" className="icon-btn sm" onClick={() => setInput('')} aria-label={t('clear')}><X size={14} /></button>}
          </label>
          <Segmented<Sort>
            value={sort}
            onChange={(v) => { setSort(v); setPage(1); }}
            options={[{ value: 'new', label: t('sortNew') }, { value: 'top', label: t('sortTop') }]}
          />
          {list && state === 'ok' && <span className="muted small push">{t('buildsCount', { n: list.total })}</span>}
        </div>
      </Card>

      {state === 'offline' || state === 'error' ? <OfflineState onRetry={() => setNonce((n) => n + 1)} /> : (
        <>
          {state === 'loading' && !list ? (
            <div className="build-grid">{Array.from({ length: 6 }, (_, i) => <div key={i} className="build-card skeleton" />)}</div>
          ) : list && list.items.length === 0 ? (
            <Card>
              <EmptyState
                icon={<Users size={32} />}
                text={t('noBuilds')}
                action={<button type="button" className="btn primary" onClick={() => setUpload(true)}><Upload size={16} /> {t('uploadBuild')}</button>}
              />
            </Card>
          ) : (
            <div className={`build-grid ${state === 'loading' ? 'refreshing' : ''}`}>
              {list?.items.map((b) => <BuildCard key={b.id} b={b} />)}
            </div>
          )}

          {list && list.pages > 1 && (
            <div className="pager">
              <button type="button" className="btn ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}><ChevronLeft size={16} /> {t('prev')}</button>
              <span className="muted small">{t('pageOf', { p: list.page, n: list.pages })}</span>
              <button type="button" className="btn ghost" disabled={page >= list.pages} onClick={() => setPage(page + 1)}>{t('next')} <ChevronRight size={16} /></button>
            </div>
          )}
        </>
      )}

      {upload && <UploadDialog onClose={() => setUpload(false)} />}
    </div>
  );
}

/* ---------------------------------------------------------------- detail */

function SkillLevels({ build }: { build: Build }) {
  const { data, t } = useLoadedGame();
  const skills = classSkills(data, build).filter((s) => !s.isStigma && s.acquireLevel <= build.l);
  const actives = skills.filter((s) => s.type === 'active');
  const passives = skills.filter((s) => s.type === 'passive');
  const row = (list: typeof skills) => (
    <div className="lv-grid">
      {list.map((s) => {
        const lv = skillLevel(data, build, s);
        return (
          <div key={s.id} className={`lv-item ${lv > 1 ? 'up' : ''}`}>
            <SkillTile skill={s} level={lv} size={40} showLevel cdr={build.cdr} />
            <span className="lv-name">{s.name}</span>
          </div>
        );
      })}
    </div>
  );
  return (
    <>
      <h4 className="group-title">{t('active')}</h4>
      {row(actives)}
      <h4 className="group-title">{t('passive')}</h4>
      {row(passives)}
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
            <SkillTile skill={s} level={slot.lv} size={44} showLevel cdr={build.cdr} />
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
  const { importBuild } = useBuild();
  const toast = useToast();
  const className = useClassName();
  const [entry, setEntry] = useState<BuildEntry | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'offline' | 'missing'>('loading');
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    setState('loading');
    getBuild(id)
      .then((e) => { setEntry(e); setState('ok'); })
      .catch((e) => setState(e instanceof ApiError && e.status === 0 ? 'offline' : 'missing'));
  }, [id]);
  useEffect(load, [load]);

  const back = <a className="back-link" href="#/community"><ArrowLeft size={16} /> {t('back')}</a>;

  if (state === 'loading') return <div className="page">{back}<div className="loading"><span className="spinner" />{t('loading')}</div></div>;
  if (state === 'offline') return <div className="page">{back}<OfflineState onRetry={load} /></div>;
  if (state === 'missing' || !entry) return <div className="page">{back}<Card><EmptyState icon={<Users size={32} />} text={t('noBuilds')} /></Card></div>;

  const b = entry.build;
  const mine = isMine(entry.id);
  const slotsUsed = Object.keys(b.bar).length;

  const like = async () => {
    try {
      const r = await toggleLike(entry.id);
      setEntry({ ...entry, likes: r.likes, liked: r.liked });
    } catch { toast(t('serverOffline'), 'error'); }
  };
  const loadIntoCalc = () => {
    if (!confirm(t('loadConfirm'))) return;
    importBuild(b);
    toast(t('loadedIntoCalc'), 'ok');
    location.hash = '#/skills';
  };
  const share = async () => {
    const url = `${location.origin}${location.pathname}#/community/${entry.id}`;
    toast((await copyText(url)) ? t('linkCopied') : t('copyFailed'), 'ok');
  };
  const remove = async () => {
    if (!confirm(t('deleteConfirm'))) return;
    setBusy(true);
    try {
      await deleteBuild(entry.id);
      toast(t('deleted'), 'ok');
      location.hash = '#/community';
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally { setBusy(false); }
  };
  const report = async () => {
    if (!confirm(t('reportConfirm'))) return;
    try { await reportBuild(entry.id, 'user report'); toast(t('reported'), 'ok'); } catch { toast(t('serverOffline'), 'error'); }
  };

  return (
    <div className="page">
      {back}

      <section className="build-hero">
        <ClassEmblem cls={b.c} size={64} />
        <div className="bh-main">
          <h1>{entry.title}</h1>
          <div className="bh-meta">
            <span>{className(b.c)} · {t('lv')} {b.l}</span>
            <span>{t('by', { name: entry.author })}</span>
            <span>{fmtDate(entry.updatedAt || entry.createdAt, lang)}</span>
            <span><Eye size={14} /> {entry.views}</span>
            {b.cdr > 0 && <span className="chip subtle">{t('cdr')}: {b.cdr}%</span>}
            {mine && <span className="chip accent">{t('yours')}</span>}
          </div>
          {entry.tags.length > 0 && <div className="tags">{entry.tags.map((tag) => <span key={tag} className="tag">#{tag}</span>)}</div>}
        </div>
        <div className="bh-actions">
          <button type="button" className={`btn like ${entry.liked ? 'on' : ''}`} onClick={like} aria-pressed={entry.liked}>
            <Heart size={16} fill={entry.liked ? 'currentColor' : 'none'} /> {entry.likes}
          </button>
          <button type="button" className="btn primary" onClick={loadIntoCalc}><Download size={16} /> {t('loadIntoCalc')}</button>
          <button type="button" className="btn ghost" onClick={share}><Link2 size={16} /> {t('copyLink')}</button>
          {mine && <button type="button" className="btn ghost" onClick={() => setEditing(true)}><Pencil size={16} /> {t('edit')}</button>}
          {mine && <button type="button" className="btn ghost danger" disabled={busy} onClick={remove}><Trash2 size={16} /></button>}
          {!mine && <button type="button" className="btn ghost" onClick={report} title={t('report')} aria-label={t('report')}><Flag size={16} /></button>}
        </div>
      </section>

      {entry.description && <Card><div className="build-desc">{richText(entry.description)}</div></Card>}

      <div className="detail-grid">
        <Card title={t('skillsSummary')} icon={<Swords size={16} />}>
          <SkillLevels build={b} />
        </Card>
        <Card title={t('stigmaEquipped')} icon={<Sparkles size={16} />}>
          <StigmaList build={b} />
        </Card>
      </div>

      <Card title={<>{t('skillBar')} <span className="count">{slotsUsed}</span></>} icon={<Keyboard size={16} />}>
        {slotsUsed === 0 ? <p className="muted">{t('none')}</p> : (
          <div className="hotbar-scroll"><HotbarGrid data={data} build={b} readOnly size={42} /></div>
        )}
      </Card>

      <div className="detail-grid">
        <Card title={<>{t('macros')} <span className="count">{b.macros.length}</span></>} icon={<ScrollText size={16} />}>
          <MacroView data={data} build={b} />
        </Card>
        <CooldownOverview data={data} build={b} />
      </div>

      <Card title={t('daevanionSummary')} icon={<Hexagon size={16} />}>
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

