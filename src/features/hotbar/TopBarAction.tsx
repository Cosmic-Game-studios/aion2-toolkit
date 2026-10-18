import { useRef, useState } from 'react';
import { ArrowRight, RefreshCw, Trophy, TriangleAlert } from 'lucide-react';
import type { ClassType } from '../../data/types';
import type { StringKey } from '../../i18n/strings';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { useToast } from '../../components/Toast';
import { useConfirm } from '../../components/ConfirmDialog';
import { useClassName } from '../../components/ClassSelect';
import { useTopIndex } from '../top/topData';
import { hasGuideLayout } from '../top/guideLayout';
import { fitTopBar, loadTopBar, type SkipReason, type Skipped, type TopBarFit } from './topBar';

/*
 * "Use the Top 10 hotbar" on the hotbar page: a button in the empty bar's hint and a quiet one in the card's toolbar
 * (that one asks before it replaces a bar). The Top 10 files load on the first click (a hover starts them early).
 */

type Phase = 'idle' | 'loading' | 'error' | 'none';

export interface TopBar {
  /** false: no Top 10 file or no key layout for the class – no button */
  shown: boolean;
  phase: Phase;
  cls: ClassType;
  /** `quiet`: the toolbar button – an error shows as a toast, not in the hint */
  apply: (quiet: boolean) => void;
  prefetch: () => void;
}

const SKIPS: [SkipReason, StringKey, StringKey][] = [
  ['stigma', 'hbTopSkipStigma', 'hbTopSkipStigmaOne'],
  ['level', 'hbTopSkipLevel', 'hbTopSkipLevelOne'],
  ['other', 'hbTopSkipOther', 'hbTopSkipOtherOne'],
];

export function useTopBar(onApplied: () => void): TopBar {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const toast = useToast();
  const confirm = useConfirm();
  const className = useClassName();
  const [index] = useTopIndex();
  const [state, setState] = useState<{ cls: ClassType; phase: Phase } | null>(null);
  // the build as it is when a load finishes (the player may edit or switch the class meanwhile)
  const latest = useRef(build);
  latest.current = build;

  const cls = build.c;
  const phase = state?.cls === cls ? state.phase : 'idle';
  // only an index without the class hides the button: while it loads (every class with a guide has a file, so the
  // hint does not jump) or when it is missing or failed, a click tries the class file itself
  const listed = index.state !== 'ok' || index.value.classes.some((c) => c.cls === cls);
  const shown = hasGuideLayout(cls) && listed && phase !== 'none';
  const macroName = t('topRecMacroName');

  const names = (list: Skipped[]) => {
    const cut = list.length > 4 ? 3 : 4;
    const shownNames = list.slice(0, cut).map(({ skill, reason }) => (reason === 'level' ? `${skill.name} (${t('lv')} ${skill.acquireLevel})` : skill.name));
    return shownNames.join(', ') + (list.length > cut ? ` ${t('hbTopMore', { n: list.length - cut })}` : '');
  };
  const message = (fit: TopBarFit) => {
    const parts = [t(fit.steps ? 'hbTopApplied' : 'hbTopAppliedNoMacro')];
    for (const [reason, many, one] of SKIPS) {
      const list = fit.skipped.filter((x) => x.reason === reason).sort((a, b) => a.skill.acquireLevel - b.skill.acquireLevel);
      if (list.length) parts.push(list.length === 1 ? t(one, { names: names(list) }) : t(many, { n: list.length, names: names(list) }));
    }
    if (fit.own.length) parts.push(t('hbTopOwn'));
    return parts.join(' ');
  };

  const apply = async (quiet: boolean) => {
    if (phase === 'loading') return;
    const c = cls;
    const name = className(c);
    setState({ cls: c, phase: 'loading' });
    let rec;
    try {
      rec = await loadTopBar(c, data, macroName);
    } catch {
      setState({ cls: c, phase: quiet ? 'idle' : 'error' });
      if (quiet) toast(`${t('hbTopError')} ${t('topErrorText')}`, 'error', { action: { label: t('tryAgain'), onClick: () => apply(true) } });
      return;
    }
    if (!rec) {
      setState({ cls: c, phase: 'none' });
      toast(t('hbTopNone', { cls: name }), 'info');
      return;
    }
    setState(null);
    let cur = latest.current;
    if (cur.c !== c) return;
    let fit = fitTopBar(rec, data, cur);
    if (!fit.placed) { toast(t('hbTopNothing'), 'warn'); return; }
    if (Object.keys(cur.bar).length) {
      const skips = fit.skipped.length;
      const ok = await confirm({
        title: t('hbTopConfirmTitle'),
        icon: <Trophy size={18} aria-hidden />,
        message: [
          t('hbTopConfirmText', { cls: name }),
          skips === 1 ? t('hbTopConfirmSkipOne') : skips > 1 ? t('hbTopConfirmSkip', { n: skips }) : '',
        ].filter(Boolean).join('\n\n'),
        confirmLabel: t('hbTopConfirmOk'),
      });
      if (!ok) return;
      cur = latest.current;
      if (cur.c !== c) return;
      fit = fitTopBar(rec, data, cur);
    }
    const prev = { bar: cur.bar, auto: cur.auto, macros: cur.macros };
    setBuild((b) => (b.c === c ? { ...b, bar: fit.bar, auto: fit.auto, macros: fit.macros } : b));
    onApplied();
    const undo = { label: t('undo'), onClick: () => setBuild((b) => (b.c === c ? { ...b, ...prev } : b)) };
    if (fit.skipped.length || fit.own.length) toast(message(fit), 'info', { action: undo, duration: 12000 });
    else toast(message(fit), 'ok', { action: undo });
  };

  const prefetch = () => {
    if (shown && phase === 'idle') loadTopBar(cls, data, macroName).catch(() => {});
  };

  return { shown, phase, cls, apply: (quiet) => { void apply(quiet); }, prefetch };
}

/** The button in the empty bar's hint, with a link to the whole build and the error of a failed load. */
export function TopBarCta({ top }: { top: TopBar }) {
  const { t } = useLoadedGame();
  const className = useClassName();
  const busy = top.phase === 'loading';
  return (
    <div className="hb-top">
      <button
        type="button"
        className="btn primary hb-top-btn"
        aria-busy={busy}
        onClick={() => top.apply(false)}
        onPointerEnter={top.prefetch}
        onFocus={top.prefetch}
      >
        {busy ? <span className="spinner" aria-hidden /> : <Trophy size={16} aria-hidden />}
        {busy ? t('hbTopLoading') : t('hbTopApply')}
      </button>
      <a className="hb-empty-top" href={`#/top/${top.cls.toLowerCase()}`}>{t('hbTopView')} <ArrowRight size={14} aria-hidden /></a>
      {top.phase === 'error' && (
        <div className="hb-top-error" role="alert">
          <TriangleAlert size={15} aria-hidden />
          <span>{t('hbTopError')} {t('topErrorText')}</span>
          <button type="button" className="btn ghost sm" onClick={() => top.apply(false)}><RefreshCw size={14} aria-hidden /> {t('tryAgain')}</button>
        </div>
      )}
      <p className="field-hint hb-top-note">{t('hbTopNote', { cls: className(top.cls) })}</p>
    </div>
  );
}

/** The quiet button in the toolbar of a bar that is not empty; it asks before it replaces the bar. */
export function TopBarButton({ top }: { top: TopBar }) {
  const { t } = useLoadedGame();
  const className = useClassName();
  const busy = top.phase === 'loading';
  return (
    <button
      type="button"
      className="btn ghost sm hb-top-btn"
      aria-busy={busy}
      title={t('hbTopApplyTitle', { cls: className(top.cls) })}
      onClick={() => top.apply(true)}
      onPointerEnter={top.prefetch}
      onFocus={top.prefetch}
    >
      {busy ? <span className="spinner" aria-hidden /> : <Trophy size={14} aria-hidden />}
      {busy ? t('hbTopLoading') : t('hbTopApplyShort')}
    </button>
  );
}
