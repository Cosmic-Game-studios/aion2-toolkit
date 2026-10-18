import { Fragment, memo } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Eraser, Keyboard, ListPlus, Plus, ScrollText, TriangleAlert, X } from 'lucide-react';
import type { GameData } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import type { StringKey } from '../../i18n/strings';
import {
  BAR_ORDER, BASIC_COL, DEFAULT_DELAY, MAX_DELAY, MAX_MACRO_STEPS, keyStack, newMacroId,
  type Build, type Macro, type MacroStep,
} from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { EmptyState, NumberField } from '../../components/ui';
import { InfoTip } from '../../components/InfoTip';
import { useToast } from '../../components/Toast';
import { shownLevel } from '../../lib/buildCalc';
import { RotationPreview } from './RotationPreview';
import { keyLabel } from '../../lib/keyLabel';
import { attackKeys, isCharged, keyBlocker, stackSkills, stepIssues, type StepIssue } from './keyStacks';

// older imports keep working
export { attackKeys, stackSkills } from './keyStacks';

const ISSUE_LABEL: Record<StepIssue, StringKey> = {
  empty: 'stepWarnEmpty',
  basic: 'stepWarnBasic',
  blocked: 'stepWarnBlocked',
  charged: 'stepWarnCharged',
};

/** The summary under the steps (the rows themselves are marked too). */
function warnings(data: GameData, build: Build, m: Macro, t: (key: StringKey) => string) {
  const out: { key: StringKey; params?: Record<string, string | number> }[] = [];
  const cols = [...new Set(m.steps.map((s) => s.k))];
  const label = (list: number[]) => list.map((c) => keyLabel(c, t)).join(', ');
  if (cols.includes(BASIC_COL)) out.push({ key: 'macroBasicWarn', params: { key: keyLabel(BASIC_COL, t) } });
  const empty = cols.filter((c) => !keyStack(build, c).length);
  if (empty.length) out.push({ key: 'macroEmptyKeyWarn', params: { keys: label(empty) } });
  const blocked = cols.filter((c) => keyBlocker(data, build, c));
  if (blocked.length) out.push({ key: 'macroBlockedWarn', params: { keys: label(blocked) } });
  const charged = [...new Set(cols.flatMap((c) => stackSkills(data, build, c)).filter(isCharged).map((s) => s.name))];
  if (charged.length) out.push({ key: 'macroChargeWarn', params: { skills: charged.join(', ') } });
  if (m.steps.length >= MAX_MACRO_STEPS) out.push({ key: 'maxStepsWarn', params: { n: MAX_MACRO_STEPS } });
  return out;
}

/** One key as the macro sees it: the key cap and its stack in the order the key tries it, plus what is wrong with it. */
function KeyStack({ data, build, col, size, issues }: { data: GameData; build: Build; col: number; size: number; issues?: StepIssue[] }) {
  const { t } = useLoadedGame();
  const stack = stackSkills(data, build, col);
  return (
    <div className="mk-key">
      <kbd>{keyLabel(col, t)}</kbd>
      {stack.length === 0 ? <span className="muted small">{t('keyEmpty')}</span> : (
        <span className="mk-stack">
          <span className="mk-tiles">
            {stack.map((s, i) => (
              <Fragment key={s.id}>
                {i > 0 && <ChevronRight size={12} className="mk-sep" aria-hidden />}
                <SkillTile skill={s} level={shownLevel(data, build, s)} size={size} cdr={build.cdr} />
              </Fragment>
            ))}
          </span>
          <span className="mk-names">{stack.map((s) => s.name).join(' › ')}</span>
        </span>
      )}
      {issues && issues.filter((x) => x !== 'empty').map((x) => (
        <span key={x} className="chip warn mk-issue"><TriangleAlert size={12} aria-hidden /> {t(ISSUE_LABEL[x])}</span>
      ))}
    </div>
  );
}

interface EditorProps { data: GameData; build: Build; setBuild: (fn: (b: Build) => Build) => void }

/**
 * The one skill macro of the game: name, key and its steps – each step presses one hotbar key.
 * Memoised: the cooldown test re-renders the page every frame, the macro (and its simulation) only when the build changes.
 */
export const MacroEditor = memo(function MacroEditor({ data, build, setBuild }: EditorProps) {
  const { t } = useLoadedGame();
  const toast = useToast();
  const m: Macro = build.macros[0] ?? { id: '', name: t('macroRotation'), key: '', steps: [] };
  const warn = warnings(data, build, m, t);
  const full = m.steps.length >= MAX_MACRO_STEPS;
  const suggested = attackKeys(data, build);
  const usedKeys = BAR_ORDER.filter((c) => keyStack(build, c).length);

  const update = (fn: (m: Macro) => Macro) => setBuild((b) => {
    const cur = b.macros[0] ?? { id: newMacroId(), name: t('macroRotation'), key: '', steps: [] };
    return { ...b, macros: [fn(cur)] };
  });
  const setSteps = (fn: (steps: MacroStep[]) => MacroStep[]) => update((x) => ({ ...x, steps: fn(x.steps).slice(0, MAX_MACRO_STEPS) }));
  const move = (i: number, dir: -1 | 1) => setSteps((list) => {
    const steps = [...list];
    const j = i + dir;
    if (j < 0 || j >= steps.length) return list;
    [steps[i], steps[j]] = [steps[j], steps[i]];
    return steps;
  });
  /** replaces the steps and offers to put the old ones back (only into the same class) */
  const replaceSteps = (next: MacroStep[], message: string) => {
    const prev = m.steps;
    const c = build.c;
    setSteps(() => next);
    if (prev.length) {
      toast(message, 'ok', { action: { label: t('undo'), onClick: () => setBuild((b) => (b.c === c && b.macros[0] ? { ...b, macros: [{ ...b.macros[0], steps: prev }] } : b)) } });
    }
  };

  return (
    <div className="macros single">
      <p className="mk-intro">{t('macroIntro')}</p>
      <details className="hb-details">
        <summary><Keyboard size={15} aria-hidden /> {t('macroSetupTitle')} <ChevronDown size={15} className="hb-details-chev" aria-hidden /></summary>
        <ol>
          <li>{t('macroSetup1')}</li>
          <li>{t('macroSetup2')}</li>
          <li>{t('macroSetup3')}</li>
        </ol>
      </details>

      <div className="form-row macro-settings">
        <label className="field-block">
          <span>{t('macroName')}</span>
          <input value={m.name} maxLength={30} onChange={(e) => update((x) => ({ ...x, name: e.target.value }))} />
        </label>
        <label className="field-block">
          <span><Keyboard size={13} aria-hidden /> {t('macroKey')}</span>
          <input value={m.key} maxLength={24} placeholder={t('macroKeyDefault')} onChange={(e) => update((x) => ({ ...x, key: e.target.value }))} />
        </label>
      </div>

      <div className="mk-toolbar">
        <span className="mk-take">
          <button
            type="button"
            className="btn ghost sm"
            disabled={!suggested.length}
            onClick={() => replaceSteps(suggested.map((k) => ({ k, delay: DEFAULT_DELAY })), t('macroStepsReplaced', { n: m.steps.length }))}
          >
            <ListPlus size={14} aria-hidden /> {t('macroFromBar')}
          </button>
          <InfoTip text={t('macroFromBarHint')} />
        </span>
        <span className="muted small tabular">{m.steps.length} / {MAX_MACRO_STEPS} {t('steps')}</span>
        <button type="button" className="btn ghost sm danger push" disabled={!m.steps.length} onClick={() => replaceSteps([], t('macroCleared'))}>
          <Eraser size={14} aria-hidden /> {t('clearMacro')}
        </button>
      </div>

      {m.steps.length === 0 ? <EmptyState icon={<ScrollText size={28} />} text={t('macroEmpty')} /> : (
        <ol className="mk-steps">
          <li className="mk-head" aria-hidden>
            <span>#</span>
            <span>{t('macroKeyCol')}</span>
            <span>{t('delay')}</span>
            <span />
          </li>
          {m.steps.map((s, i) => {
            const issues = stepIssues(data, build, s.k);
            return (
              <li key={`${s.k}-${i}`} className={`mk-step ${issues.length ? 'warn' : ''}`}>
                <span className="step-prio">{i + 1}</span>
                <KeyStack data={data} build={build} col={s.k} size={32} issues={issues} />
                <label className="step-delay">
                  <span className="step-delay-label" aria-hidden>{t('delay')}</span>
                  <NumberField
                    value={s.delay}
                    min={0}
                    max={MAX_DELAY}
                    step={10}
                    commit="blur"
                    suffix="ms"
                    aria-label={`${t('delayMs')} · ${t('stepOrder')} ${i + 1}`}
                    onChange={(v) => setSteps((list) => list.map((y, j) => (j === i ? { ...y, delay: v } : y)))}
                  />
                </label>
                <div className="step-tools">
                  <button type="button" className="icon-btn sm" title={t('moveUp')} aria-label={t('moveUp')} disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={15} /></button>
                  <button type="button" className="icon-btn sm" title={t('moveDown')} aria-label={t('moveDown')} disabled={i === m.steps.length - 1} onClick={() => move(i, 1)}><ArrowDown size={15} /></button>
                  <button type="button" className="icon-btn sm" title={t('removeStep')} aria-label={t('removeStep')} onClick={() => setSteps((list) => list.filter((_, j) => j !== i))}><X size={15} /></button>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <div className="mk-add" role="group" aria-label={t('addKeyLabel')}>
        <span className="mk-add-label" aria-hidden><Plus size={14} /> {t('addKeyLabel')}</span>
        {usedKeys.length === 0 ? <span className="field-hint">{t('addKeyNone')}</span> : usedKeys.map((c) => {
          const st = stackSkills(data, build, c);
          return (
            <button
              key={c}
              type="button"
              className="btn mk-add-key"
              disabled={full}
              aria-label={`${t('column', { n: keyLabel(c, t) })}: ${st.map((s) => s.name).join(' › ')}`}
              onClick={() => setSteps((list) => [...list, { k: c, delay: DEFAULT_DELAY }])}
            >
              <kbd>{keyLabel(c, t)}</kbd>
              {st[0] && <SkillTile skill={st[0]} level={shownLevel(data, build, st[0])} size={24} showCd={false} tip={false} />}
              {st.length > 1 && <span className="mk-add-more">+{st.length - 1}</span>}
            </button>
          );
        })}
      </div>

      {warn.length > 0 && (
        <div className="mk-warnings">
          {warn.map((w) => <p key={w.key} className="warn-line"><TriangleAlert size={14} aria-hidden /> <span>{t(w.key, w.params)}</span></p>)}
        </div>
      )}

      {m.steps.length > 0 && <RotationPreview data={data} build={build} steps={m.steps} />}
    </div>
  );
});

/** Read-only list of macro steps (community build view). */
function MacroSteps({ data, build, steps }: { data: GameData; build: Build; steps: MacroStep[] }) {
  return (
    <ol className="mk-steps compact">
      {steps.map((s, i) => (
        <li key={i} className="mk-step">
          <span className="step-prio">{i + 1}</span>
          <KeyStack data={data} build={build} col={s.k} size={30} />
          <span className="chip subtle">{s.delay} ms</span>
        </li>
      ))}
    </ol>
  );
}

/** Read-only macro (community build view). */
export function MacroView({ data, build }: { data: GameData; build: Build }) {
  const { t } = useLoadedGame();
  const m = build.macros[0];
  if (!m || !m.steps.length) return <p className="muted">{t('macroEmpty')}</p>;
  return (
    <div className="macros">
      <div className="macro open">
        <div className="macro-head static">
          <ScrollText size={16} aria-hidden />
          <strong>{m.name || '—'}</strong>
          <kbd>{m.key || t('macroKeyDefault')}</kbd>
          <span className="muted small">{m.steps.length} {t('steps')}</span>
        </div>
        <div className="macro-body">
          <MacroSteps data={data} build={build} steps={m.steps} />
          <RotationPreview data={data} build={build} steps={m.steps} />
        </div>
      </div>
    </div>
  );
}
