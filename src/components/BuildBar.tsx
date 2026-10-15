import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { FolderOpen, MoreHorizontal, RotateCcw, Share2, Timer, TriangleAlert, Upload } from 'lucide-react';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { daevanionTotals, shardBudget, shardsSpent, skillPointBudget, skillPointsSpent } from '../lib/buildCalc';
import { COMMUNITY_ENABLED } from '../lib/communityApi';
import { useSavedBuilds } from '../state/savedBuilds';
import { ClassSelect } from './ClassSelect';
import { LevelControl } from './LevelControl';
import { Meter, NumberField } from './ui';
import { useBuildActions } from './BuildActions';

/** Spent / max of the three budgets of the active build. */
function useBudgets() {
  const { data } = useLoadedGame();
  const { build } = useBuild();
  const dv = daevanionTotals(data, build).DaevanionCrystal;
  return {
    sp: { spent: skillPointsSpent(data, build), max: skillPointBudget(data, build).total },
    shards: { spent: shardsSpent(data, build), max: shardBudget(data, build).total },
    dv: dv ? { spent: dv.spent, max: dv.max } : null,
  };
}

/**
 * Strip on every planner page: class, level, the three budgets (with points left) and the build actions.
 * Its real height feeds --buildbar-h, so sticky side panels never slide under it.
 */
export function BuildBar({ page }: { page: string }) {
  const { t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const actions = useBuildActions();
  const [more, setMore] = useState(false);
  const savedCount = useSavedBuilds().length;
  const bar = useRef<HTMLDivElement>(null);
  const moreBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, '');
  const levelId = `lvl-${uid}`;
  const cdrId = `cdr-${uid}`;
  const panelId = `bbmore-${uid}`;
  const b = useBudgets();

  // publish the measured height (the bar wraps on narrow laptops and when the German labels are long)
  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    const root = document.documentElement;
    const set = () => root.style.setProperty('--bb-measured', `${Math.ceil(el.getBoundingClientRect().height)}px`);
    set();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(set) : null;
    ro?.observe(el);
    return () => { ro?.disconnect(); root.style.removeProperty('--bb-measured'); };
  }, []);

  // the "More" panel closes on Escape and on a tap outside
  useEffect(() => {
    if (!more) return;
    const onDown = (e: PointerEvent) => {
      const el = e.target as Node;
      if (!panel.current?.contains(el) && !moreBtn.current?.contains(el)) setMore(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMore(false); moreBtn.current?.focus(); } };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [more]);

  // the panel's buttons vanish with it: keep the focus on "More" (a dialog opened next returns it there)
  const closeMore = () => { moreBtn.current?.focus({ preventScroll: true }); setMore(false); };

  // phones show the short label (three meters side by side); the long one stays the link's name
  const meterLink = (path: string, label: string, v: { spent: number; max: number }, short?: string) => (
    <a href={`#${path}`} className={page === path ? 'on' : ''} aria-current={page === path ? 'page' : undefined}>
      <Meter label={label} short={short} spent={v.spent} max={v.max} showLeft />
    </a>
  );

  return (
    <div className={`buildbar ${more ? 'more' : ''}`} ref={bar}>
      <div className="buildbar-inner">
        <ClassSelect />

        <div className="bb-field level-field">
          <label className="bb-label" htmlFor={levelId}>{t('level')}</label>
          <LevelControl slider={false} id={levelId} />
        </div>

        <nav className="bb-meters" aria-label={t('budgets')}>
          {meterLink('/skills', t('skillPoints'), b.sp)}
          {meterLink('/stigma', t('stigmaShards'), b.shards, t('shardsShort'))}
          {b.dv && meterLink('/daevanion', t('daevanionPoints'), b.dv, t('dvShort'))}
        </nav>

        <div className="bb-actions">
          <button type="button" className="btn ghost bb-saved" onClick={actions.openSavedBuilds}>
            <FolderOpen size={16} aria-hidden />
            <span className="bb-action-label"><span className="bb-long">{t('myBuilds')}</span><span className="bb-short" aria-hidden>{t('myBuildsShort')}</span></span>
            {savedCount > 0 && <span className="count">{savedCount}</span>}
          </button>
          <button type="button" className="btn ghost bb-share" onClick={() => { void actions.share(); }}>
            <Share2 size={16} aria-hidden /> <span className="bb-action-label">{t('share')}</span>
          </button>
          <button
            ref={moreBtn}
            type="button"
            className={`btn ghost bb-more ${more ? 'on' : ''} ${build.cdr > 0 ? 'has-cdr' : ''}`}
            aria-expanded={more}
            aria-controls={panelId}
            aria-label={`${t('more')}${build.cdr ? ` · ${t('cdrShort')} ${build.cdr} %` : ''}`}
            title={t('moreOptions')}
            onClick={() => setMore((m) => !m)}
          >
            <MoreHorizontal size={16} aria-hidden /> <span className="bb-action-label">{t('more')}</span>
            {build.cdr > 0 && <span className="bb-cdr-badge" aria-hidden><Timer size={12} />−{build.cdr} %</span>}
          </button>
        </div>

        {more && (
          <div className="bb-more-panel" id={panelId} ref={panel} role="group" aria-label={t('moreOptions')}>
            <div className="bb-cdr">
              <label className="bb-label" htmlFor={cdrId}><Timer size={14} aria-hidden /> {t('cdr')}</label>
              <NumberField id={cdrId} value={build.cdr} min={0} max={90} suffix="%" onChange={(cdr) => setBuild({ cdr })} />
              <p className="field-hint">{t('cdrHint')}</p>
            </div>
            <div className="bb-more-actions">
              {COMMUNITY_ENABLED && (
                <button type="button" className="btn ghost" onClick={() => { closeMore(); actions.openUpload(); }}>
                  <Upload size={16} aria-hidden /> {t('uploadBuild')}
                </button>
              )}
              <button type="button" className="btn ghost danger" onClick={() => { closeMore(); actions.resetBuild(); }}>
                <RotateCcw size={16} aria-hidden /> {t('resetBuild')}
              </button>
              <p className="field-hint">{t('resetBuildHint')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Phones and tablets: the budget of the current page stays visible in the sticky top bar. */
export function BudgetPill({ page }: { page: string }) {
  const { t } = useLoadedGame();
  const b = useBudgets();
  const pick = page === '/stigma'
    ? { path: '/stigma', short: t('shardsShort'), label: t('stigmaShards'), v: b.shards }
    : page === '/daevanion' && b.dv
      ? { path: '/daevanion', short: t('dvShort'), label: t('daevanionPoints'), v: b.dv }
      : { path: '/skills', short: t('spShort'), label: t('skillPoints'), v: b.sp };
  const left = pick.v.max - pick.v.spent;
  const text = left < 0 ? t('overBy', { n: -left }) : t('pointsLeft', { n: left });
  return (
    <a href={`#${pick.path}`} className={`tb-budget ${left < 0 ? 'over' : ''}`} aria-label={`${pick.label}: ${text}`}>
      {left < 0 && <TriangleAlert size={13} aria-hidden />}
      <span className="tb-budget-name">{pick.short}</span>
      <strong className="tabular">{text}</strong>
    </a>
  );
}
