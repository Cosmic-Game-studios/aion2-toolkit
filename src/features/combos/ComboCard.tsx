import { Fragment, useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Check, ChevronDown, CircleSlash, ExternalLink, Layers, Quote, Users } from 'lucide-react';
import type { ComboSkill, CuratedCombo } from '../../data/combos';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { SkillTile } from '../../components/SkillTile';
import { SkillText, skillTextPlain, tipLevel } from '../../components/SkillText';
import { useSkillTip } from '../../components/SkillTooltip';
import { InfoTip } from '../../components/InfoTip';
import { matches, MQ } from '../../components/hooks';
import { activeSpecs, isUnlocked, skillInBuild } from '../../lib/buildCalc';
import { statusName } from '../../lib/combos';
import { richText } from '../../lib/format';
import type { StringKey } from '../../i18n/strings';
import { comboState, type ComboState } from './comboState';

/**
 * Skill icon + name (hover, keyboard focus or a tap shows the skill card), a badge when the combo needs one of its
 * specialisations, and – when something is missing in the build – a link to the page where the player adds it.
 * `neutral`: the combo belongs to another class than the build (skill database), so no build state is shown.
 */
function ComboSkillTile({ r, focus, neutral }: { r: ComboSkill; focus?: number | null; neutral?: boolean }) {
  const { t, data } = useLoadedGame();
  const { build } = useBuild();
  const s = data.skillById.get(r.id);
  const tip = useSkillTip(s, s ? tipLevel(s) : 1, { tap: true });
  if (!s) return null;
  const usable = neutral || skillInBuild(build, s);
  const unlocked = neutral || isUnlocked(build, s);
  const part = r.part ? s.parts?.find((p) => p.id === r.part) : undefined;
  const partOn = neutral || !part || activeSpecs(data, build, s).includes(part.id);

  // the way out when the combo does not work yet
  let fix: { href: string; label: string } | null = null;
  if (!neutral && unlocked) {
    if (!usable && s.isStigma) fix = { href: `#/stigma/${s.id}`, label: t('comboEquipStigma') };
    else if (usable && !partOn) {
      fix = s.partsAuto
        ? { href: `#/stigma/${s.id}`, label: t('comboRaiseStigma') }
        : { href: `#/skills/${s.id}`, label: t('comboChooseSpec') };
    }
  }

  return (
    <span className={`combo-skill ${usable ? '' : 'missing'} ${focus === r.id ? 'focus' : ''}`}>
      <span className="cs-main" tabIndex={0} {...tip}>
        <SkillTile skill={s} size={34} dim={!usable} tip={false} />
        <span className="cs-text">
          <span className="cs-name">{s.name}</span>
          {part && (
            <span className={`mini ${neutral ? '' : partOn ? 'ok' : 'warn'}`} title={part.desc}>
              {t(s.partsAuto ? 'viaStigmaSpec' : 'viaSpec', { lvl: part.level })}
              {!neutral && partOn && <><Check size={12} aria-hidden /><span className="sr-only">{t('specActive')}</span></>}
              {!neutral && !partOn && !s.partsAuto && ` · ${t('specNotChosen')}`}
            </span>
          )}
          {!unlocked && <span className="mini">{t('lockedUntil', { lvl: s.acquireLevel })}</span>}
        </span>
      </span>
      {fix && (
        <a className="cs-fix" href={fix.href} onClick={(e) => e.stopPropagation()}>
          {fix.label} <ArrowRight size={14} aria-hidden />
        </a>
      )}
    </span>
  );
}

const STATE_ICON = { ready: Check, spec: Layers, missing: CircleSlash } as const;
const STATE_LABEL: Record<ComboState, StringKey> = { ready: 'comboReady', spec: 'comboNeedsSpec', missing: 'notInBuild' };
const STATE_CLASS: Record<ComboState, string> = { ready: 'ok', spec: 'warn', missing: '' };

/** Ready / needs a specialisation / not in the build: icon + text (icon only with a hidden label in compact cards). */
function StatePill({ state, iconOnly }: { state: ComboState; iconOnly?: boolean }) {
  const { t } = useLoadedGame();
  const Icon = STATE_ICON[state];
  const label = t(STATE_LABEL[state]);
  return (
    <span className={`combo-state ${STATE_CLASS[state]} ${iconOnly ? 'icon-only' : ''}`} title={iconOnly ? label : undefined}>
      <Icon size={14} aria-hidden />
      <span className={iconOnly ? 'sr-only' : undefined}>{label}</span>
    </span>
  );
}

interface Props {
  combo: CuratedCombo;
  /** skill to highlight (detail panels list the combos of one skill) */
  focus?: number | null;
  /** short card for detail panels: no tags, no "how to play it" */
  compact?: boolean;
  /** "how to play it" starts open (the combos page's "Show all details") */
  defaultOpen?: boolean;
  /** the combo is of another class than the build: no build state, no links into the planner */
  neutral?: boolean;
}

/**
 * One hand-checked combo. Collapsed it shows tags, title, state, setup (any of them) → payoff and why it works;
 * "How to play it" opens the keys, macro order, usage and the proof from the skill texts.
 */
export function ComboCard({ combo: c, focus = null, compact, defaultOpen = false, neutral }: Props) {
  const { t, data, lang } = useLoadedGame();
  const { build } = useBuild();
  const state = neutral ? null : comboState(data, build, c);
  const [open, setOpen] = useState(defaultOpen);
  const moreRef = useRef<HTMLButtonElement>(null);
  const toggled = useRef(false);
  const bodyId = `combo-${useId().replace(/:/g, '')}`;
  const tx = (x: { de: string; en: string }) => x[lang] ?? x.en;
  const name = (id: number) => data.skillById.get(id)?.name;
  const stack = (c.stack ?? []).map((id) => data.skillById.get(id)).filter((s) => !!s);
  const meta = [
    ...c.content.map((x) => t(`comboContent_${x}` as StringKey)),
    ...(c.status ? [statusName(c.status, lang)] : []),
    ...(c.window ? [t('comboWindow', { s: c.window })] : []),
  ].join(' · ');

  // an opened card spans the whole row on wide screens: keep the button the player pressed in view
  useEffect(() => {
    if (!toggled.current) return;
    toggled.current = false;
    moreRef.current?.scrollIntoView({ block: 'nearest', behavior: matches(MQ.reducedMotion) ? 'auto' : 'smooth' });
  }, [open]);

  const skills = (list: ComboSkill[], or: boolean) => list.map((r, i) => (
    <Fragment key={`${r.id}-${r.part ?? 0}`}>
      {or && i > 0 && <span className="combo-or">{t('comboOr')}</span>}
      <ComboSkillTile r={r} focus={focus} neutral={neutral} />
    </Fragment>
  ));

  return (
    <article className={`combo-card kind-${c.kind} rating-${c.rating} ${state ? `is-${state}` : ''} ${compact ? 'compact' : ''} ${open && !compact ? 'open' : ''}`}>
      <header className="combo-head">
        {!compact && (
          <div className="combo-tags">
            <span className={`combo-rating r-${c.rating}`}>{t(`comboRating_${c.rating}` as StringKey)}</span>
            <span className="combo-kind">{t(`comboKind_${c.kind}` as StringKey)}</span>
            {meta && <span className="combo-meta">{meta}</span>}
            {state && <StatePill state={state} />}
          </div>
        )}
        <div className="combo-title">
          <h3>{skillTextPlain(tx(c.title), name)}</h3>
          {compact && state && <StatePill state={state} iconOnly />}
        </div>
      </header>

      <div className="combo-flow">
        <div className="combo-col">
          <span className="eyebrow">{t('comboSetup')}</span>
          <div className="combo-skills">{skills(c.setup, true)}</div>
        </div>
        <ArrowRight className="combo-arrow" size={18} aria-hidden />
        <div className="combo-col">
          <span className="eyebrow">{t('comboPayoff')}</span>
          <div className="combo-skills">{skills(c.payoff, false)}</div>
        </div>
      </div>

      <p className="combo-text"><SkillText text={tx(c.text)} /></p>

      {!compact && (
        <>
          <button
            ref={moreRef}
            type="button"
            className="combo-more"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => { toggled.current = true; setOpen((v) => !v); }}
          >
            <BookOpen size={16} aria-hidden />
            <span className="combo-more-label">{t('comboHow')}</span>
            {!open && stack.length > 1 && (
              <span className="combo-more-stack" aria-hidden>
                {stack.map((s) => <SkillTile key={s.id} skill={s} size={22} showCd={false} tip={false} />)}
              </span>
            )}
            <ChevronDown size={16} className="chev" aria-hidden />
          </button>

          <div id={bodyId} className="combo-more-body" hidden={!open}>
            <div className="combo-how">
              <p><SkillText text={tx(c.how)} /></p>
              {stack.length > 1 && (
                <div className="combo-stack">
                  <span className="combo-stack-label">{t('comboStack')}</span>
                  {stack.map((s, i) => (
                    <span key={s.id} className="combo-stack-item">
                      {i > 0 && <ArrowRight size={12} aria-hidden />}
                      <SkillTile skill={s} size={30} showCd={false} />
                    </span>
                  ))}
                  <InfoTip text={t('comboStackHint')} />
                </div>
              )}
            </div>
            <div className="combo-side">
              {c.usage && <p className="combo-usage"><Users size={14} aria-hidden /> <span>{tx(c.usage)}</span></p>}
              <details className="combo-proof">
                <summary><Quote size={14} aria-hidden /> {t('comboEvidence')} <ChevronDown size={14} className="chev" aria-hidden /></summary>
                <ul>
                  {c.evidence.map((e, i) => {
                    const s = data.skillById.get(e.id);
                    const part = e.part ? s?.parts?.find((p) => p.id === e.part) : undefined;
                    return (
                      <li key={i}>
                        <b>{s?.name ?? e.id}</b>
                        {part && <span className="muted"> · {t('viaSpec', { lvl: part.level })}</span>}
                        {e.chain && <span className="muted"> · {t('viaChain', { name: e.chain })}</span>}
                        : {lang === 'de' ? '„' : '“'}{richText(e[lang] ?? e.en)}{lang === 'de' ? '“' : '”'}
                      </li>
                    );
                  })}
                </ul>
                {!!c.sources?.length && (
                  <p className="combo-sources">
                    {c.sources.map((x) => (
                      <a key={x.href} href={x.href} target="_blank" rel="noreferrer noopener">{x.label} <ExternalLink size={12} aria-hidden /></a>
                    ))}
                  </p>
                )}
              </details>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
