import { ArrowRight, CheckCircle2, FolderOpen, Share2 } from 'lucide-react';
import { useLoadedGame } from '../data/GameDataContext';
import type { StringKey } from '../i18n/strings';
import { PLANNER_FLOW, isPlannerPath, type PlannerPath } from '../state/plannerFlow';
import { useBuildActions } from './BuildActions';

const STEP: Record<PlannerPath, { nav: StringKey; text: StringKey }> = {
  '/skills': { nav: 'navSkills', text: 'flowSkills' },
  '/stigma': { nav: 'navStigma', text: 'flowStigma' },
  '/daevanion': { nav: 'navDaevanion', text: 'flowDaevanion' },
  '/hotbar': { nav: 'navHotbar', text: 'flowHotbar' },
  '/combos': { nav: 'navCombos', text: 'flowCombos' },
};

/** Card at the end of every planner page: the next page of the flow, or Save / Share on the last one. */
export function NextStep({ page }: { page: string }) {
  const { t } = useLoadedGame();
  const actions = useBuildActions();
  if (!isPlannerPath(page)) return null;
  const i = PLANNER_FLOW.indexOf(page);
  const next = PLANNER_FLOW[i + 1];

  if (!next) {
    return (
      <section className="next-step done" aria-label={t('flowDone')}>
        <CheckCircle2 size={22} className="next-step-icon" aria-hidden />
        <div className="next-step-text">
          <strong>{t('flowDone')}</strong>
          <span>{t('flowDoneText')}</span>
        </div>
        <div className="next-step-actions">
          <button type="button" className="btn ghost" onClick={actions.openSavedBuilds}><FolderOpen size={16} aria-hidden /> {t('myBuilds')}</button>
          <button type="button" className="btn primary" onClick={() => { void actions.share(); }}><Share2 size={16} aria-hidden /> {t('share')}</button>
        </div>
      </section>
    );
  }

  const s = STEP[next];
  return (
    <a className="next-step" href={`#${next}`}>
      <span className="next-step-no" aria-hidden>{i + 2}</span>
      <span className="next-step-text">
        <span className="next-step-kicker">{t('nextStep')} · {t('stepOf', { n: i + 2, m: PLANNER_FLOW.length })}</span>
        <strong>{t(s.nav)}</strong>
        <span>{t(s.text)}</span>
      </span>
      <span className="next-step-go" aria-hidden><span className="hide-sm">{t('goToPage', { page: t(s.nav) })}</span><ArrowRight size={18} /></span>
    </a>
  );
}
