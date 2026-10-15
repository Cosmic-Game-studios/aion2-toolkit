import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ExternalLink, Info, RefreshCw, Trophy, TriangleAlert } from 'lucide-react';
import type { ClassType } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { CLASS_TYPES } from '../../state/build';
import { unreleasedClasses } from '../../lib/classInfo';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { EmptyState, PageHeader } from '../../components/ui';
import { useTopFile, useTopIndex } from './topData';
import { topStats } from './topStats';
import { fmtInt, ISSUES_URL, METABOT_BOARDS, METABOT_SLUG, metabotClassUrl, SOURCE_FALLBACK } from './topFormat';
import { TopStatsView } from './TopStatsView';
import { PlayerList } from './PlayerList';
import { Ago } from './parts';

/** "#/top/elementalist"; MetaBot's slugs work too ("#/top/spiritmaster") */
const fromParam = (p: string | null): ClassType | null => {
  const s = p?.toLowerCase();
  return s ? CLASS_TYPES.find((c) => c.toLowerCase() === s || METABOT_SLUG[c] === s) ?? null : null;
};

/** The class picker of this page only (the planner's class stays as it is). Arrow keys move along the row. */
function ClassPicker({ options, value, onPick, hasData, idBase }: {
  options: { classType: ClassType; name: string }[]; value: ClassType; onPick: (c: ClassType) => void; hasData: (c: ClassType) => boolean | null;
  /** button ids are `${idBase}-${classType}`, so the page can move the focus to a class */
  idBase: string;
}) {
  const { t } = useLoadedGame();
  const ref = useRef<HTMLDivElement>(null);

  // phones: the row scrolls sideways, keep the chosen class in view
  useEffect(() => {
    const row = ref.current;
    const on = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!row || !on || row.scrollWidth <= row.clientWidth + 1) return;
    row.scrollTo({ left: on.offsetLeft - (row.clientWidth - on.offsetWidth) / 2 });
  }, [value]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('button')];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    items[Math.max(0, Math.min(items.length - 1, i + step))]?.focus();
  };

  return (
    <div className="top-classes focus-inset" ref={ref} role="group" aria-label={t('chooseClass')} onKeyDown={onKey}>
      {options.map((c) => {
        const on = c.classType === value;
        const none = hasData(c.classType) === false;
        return (
          <button key={c.classType} id={`${idBase}-${c.classType}`} type="button" className={`top-class ${on ? 'on' : ''} ${none ? 'nodata' : ''}`} aria-pressed={on} onClick={() => onPick(c.classType)}>
            <ClassEmblem cls={c.classType} size={24} />
            <span>{c.name}</span>
            {none && <span className="sr-only"> ({t('topNoDataShort')})</span>}
          </button>
        );
      })}
    </div>
  );
}

/** Placeholder with roughly the size of the loaded page, so nothing jumps when the file arrives. */
function Skeleton() {
  const { t } = useLoadedGame();
  return (
    <div className="top-skeleton" aria-busy="true">
      <div className="loading" role="status"><span className="spinner" aria-hidden />{t('topLoading')}</div>
      <div className="top-stats" aria-hidden>
        <span className="sk top-sk-card" />
        <span className="sk top-sk-card" />
      </div>
      <div className="top-sk-rows" aria-hidden>{Array.from({ length: 10 }, (_, i) => <span key={i} className="sk top-sk-row" />)}</div>
    </div>
  );
}

export function TopPage({ param, visit }: { param: string | null; visit: number }) {
  const { t, data, lang } = useLoadedGame();
  const { build } = useBuild();
  const className = useClassName();
  const [index, retryIndex] = useTopIndex();
  const statsId = useId();
  const playersId = useId();
  const pickerId = useId();

  const indexValue = index.state === 'ok' ? index.value : null;
  const indexed = useMemo(() => (indexValue ? new Map(indexValue.classes.map((c) => [c.cls, c])) : null), [indexValue]);
  // classes with a file, and every released class (it says "no data yet"); a class not on Global yet only with a file
  const unreleased = unreleasedClasses(data);
  const options = data.classes
    .filter((c) => indexed?.has(c.classType) || !unreleased.has(c.classType))
    .sort((a, b) => Number(unreleased.has(a.classType)) - Number(unreleased.has(b.classType)));
  const offered = (c: ClassType | null): c is ClassType => !!c && options.some((o) => o.classType === c);

  // a link (#/top/cleric) picks the class; without one the page starts on the class of the active build. Every visit
  // follows the address, so "Top 10" in the navigation (#/top) shows what a reload of #/top would show.
  const [picked, setPicked] = useState<ClassType | null>(() => fromParam(param));
  useEffect(() => { setPicked(fromParam(param)); }, [param, visit]);
  const cls = [picked, build.c].find(offered)
    ?? options.find((o) => indexed?.has(o.classType))?.classType
    ?? options[0]?.classType
    ?? build.c;

  const pick = (c: ClassType) => {
    setPicked(c);
    // a link to this class can be shared; the app does not re-render for it (no hashchange)
    history.replaceState(history.state, '', `#/top/${c.toLowerCase()}`);
  };
  // the chips of the empty state and "Try again" disappear with the new content: the focus moves on to the class
  // in the picker (it stays on the page in every state) instead of falling back to the page body
  const focusClass = (c: ClassType) => requestAnimationFrame(() => document.getElementById(`${pickerId}-${c}`)?.focus({ preventScroll: true }));

  // the file of the class: skipped when the index says there is none; tried anyway when the index itself is missing
  const [file, retryFile] = useTopFile(indexed && !indexed.has(cls) ? null : cls);
  const boards = useMemo(() => data.daevanion.classes[cls]?.boards ?? [], [data, cls]);
  const loaded = file.state === 'ok' && file.value.players.length > 0 ? file.value : null;
  const stats = useMemo(() => (loaded ? topStats(loaded.players, boards) : null), [loaded, boards]);
  const name = className(cls);
  // browser tab title; again after a language switch, where App sets its own title first ("Top 10: Gladiator" reads
  // the same in both languages, so a title-only dependency would not run again)
  const title = `${t('navTop')}: ${name}`;
  useEffect(() => { document.title = `${title} – Daevaforge`; }, [title, lang]);

  const source = loaded?.source ?? SOURCE_FALLBACK;
  const fetchedAt = loaded?.fetchedAt ?? indexed?.get(cls)?.fetchedAt ?? null;
  const slug = METABOT_SLUG[cls];
  const withData = options.filter((o) => indexed?.has(o.classType) && o.classType !== cls);
  const failed = file.state === 'error' ? file.error : index.state === 'error' && file.state !== 'ok' ? index.error : null;
  const retry = () => { retryIndex(); retryFile(); };
  const newTab = <span className="sr-only"> ({t('gdNewTab')})</span>;

  return (
    <div className="page top-page">
      <PageHeader icon={<Trophy size={22} />} title={t('topTitle')} subtitle={t('topIntro')} />
      <div className="top-intro">
        <p className="top-meta">
          <span>{t('topSource')} <a href={source.url} target="_blank" rel="noopener">{source.name}{newTab}</a></span>
          <span>{fetchedAt ? <Ago iso={fetchedAt}>{(ago) => t('topUpdated', { time: ago })}</Ago> : t('topUpdated', { time: '–' })}</span>
          {loaded?.total != null && <span>{t('topOfTotal', { n: fmtInt(loaded.total, lang), cls: name })}</span>}
        </p>
        <p className="top-caveat"><Info size={15} aria-hidden /> <span>{t('topCaveat')}</span></p>
      </div>

      <ClassPicker options={options} value={cls} onPick={pick} hasData={(c) => (indexed ? indexed.has(c) : null)} idBase={pickerId} />

      {failed ? (
        <div className="state-card inline error" role="alert">
          <TriangleAlert size={28} aria-hidden />
          <h2>{t('topErrorTitle')}</h2>
          <p>{t('topErrorText')}</p>
          <div className="state-actions">
            <button type="button" className="btn primary" onClick={() => { retry(); focusClass(cls); }}><RefreshCw size={16} aria-hidden /> {t('tryAgain')}</button>
          </div>
          <details className="state-details"><summary>{t('errorDetails')}</summary><code>{failed}</code></details>
        </div>
      ) : file.state === 'loading' || (index.state === 'loading' && !loaded) ? (
        <Skeleton />
      ) : !loaded || !stats ? (
        <div className="card top-empty">
          <EmptyState
            icon={<Trophy size={28} aria-hidden />}
            text={t('topNoData', { cls: name })}
            action={withData.length > 0 && (
              <div className="top-empty-actions">
                <span className="field-hint">{t('topNoDataHint')}</span>
                <div className="chips">
                  {withData.map((o) => <button key={o.classType} type="button" className="chip" onClick={() => { pick(o.classType); focusClass(o.classType); }}>{o.name}</button>)}
                </div>
              </div>
            )}
          />
        </div>
      ) : (
        <>
          <TopStatsView key={`s-${cls}`} s={stats} headingId={statsId} />
          <PlayerList key={`p-${cls}`} players={loaded.players} boards={boards} headingId={playersId} />
        </>
      )}

      <footer className="top-foot">
        <p>
          <span className="top-foot-label">{t('topFootData')}</span>{' '}
          <a href={source.url} target="_blank" rel="noopener">{source.name}{newTab}</a>
          {' · '}{t('topFootFan')}
        </p>
        <p>
          <span className="top-foot-label">{t('topFootMore')}</span>{' '}
          <a href={METABOT_BOARDS} target="_blank" rel="noopener">{t('topFootBoards')}<ExternalLink size={12} aria-hidden />{newTab}</a>
          {slug && <>{' · '}<a href={metabotClassUrl(slug)} target="_blank" rel="noopener">{t('topFootClassBuilds', { cls: name })}<ExternalLink size={12} aria-hidden />{newTab}</a></>}
        </p>
        <p>
          {t('topFootRemove')}{' '}
          <a href={ISSUES_URL} target="_blank" rel="noopener">{t('topFootIssue')}<ExternalLink size={12} aria-hidden />{newTab}</a>
        </p>
      </footer>
    </div>
  );
}
