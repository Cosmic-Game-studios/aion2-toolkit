import { useId } from 'react';
import { ArrowRight, Check, Info, Lock, RotateCcw, Sparkles } from 'lucide-react';
import type { Skill } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { MAX_SPECS } from '../../state/build';
import { specSlotCount } from '../../lib/buildCalc';
import { applyCdr, cdAt, fmtCdShort } from '../../lib/cooldown';
import { richText } from '../../lib/format';
import { hasDelta, specDelta, type SpecDelta } from '../../lib/specEffects';
import { PlainIcon } from '../../components/SkillTile';

interface Props {
  skill: Skill;
  /** English version of the skill (texts for the numbers); undefined while loading */
  en?: Skill;
  level: number;
  chosen: number[];
  working: number[];
  delta: SpecDelta;
  onChange: (ids: number[]) => void;
  /** the skill planner page for this skill (only when it belongs to the build's class) */
  plannerHref?: string;
}

/**
 * Try specialisations in the skill database: pick up to three (as many as the level opens) and see
 * what changes – cooldown, cast time, MP, range, uses – and which new effects the skill gets.
 * "What changes" stays at the bottom of the panel while the list scrolls, so the result is next to the choice.
 */
export function SpecSandbox({ skill, en, level, chosen, working, delta, onChange, plannerHref }: Props) {
  const { t } = useLoadedGame();
  const uid = useId().replace(/:/g, '');
  const parts = skill.parts ?? [];
  if (!parts.length) return <p className="muted small">{t('noSpecs')}</p>;
  const on = new Set(working);
  const open = skill.partsAuto ? parts.length : specSlotCount(skill, level);
  const toggle = (id: number) => onChange(chosen.includes(id) ? chosen.filter((x) => x !== id) : [...chosen, id].slice(0, MAX_SPECS));
  const cd = applyCdr(cdAt(skill, level), 0);
  const textOnly = working.filter((id) => {
    const p = en?.parts?.find((x) => x.id === id);
    return !p || !hasDelta(specDelta(p.desc));
  });
  // every open slot is taken: say so once, visibly, instead of a tooltip on each greyed-out option
  const slotsFull = !skill.partsAuto && open > 0 && (on.size >= open || chosen.length >= MAX_SPECS)
    && parts.some((p) => !chosen.includes(p.id) && level >= p.level);
  const fullId = `${uid}-full`;

  return (
    <div className="spec-sandbox">
      {skill.partsAuto ? (
        <p className="field-hint">{t('specAuto')}</p>
      ) : (
        <>
          <p className="field-hint">
            {t('specSandboxHint')}
            {plannerHref && <> <a className="link" href={plannerHref}>{t('specOpenPlanner')} <ArrowRight size={13} aria-hidden /></a></>}
          </p>
          <div className="slot-row" role="group" aria-label={t('specSlots')}>
            {(skill.specSlots ?? []).map((l, i) => (
              <span key={l} className={`slot-pill ${level >= l ? 'open' : ''} ${i < on.size ? 'used' : ''}`}>
                {level >= l ? (i < on.size ? <Check size={12} aria-hidden /> : null) : <Lock size={12} aria-hidden />} {t('lv')} {l}
              </span>
            ))}
            {chosen.length > 0 && (
              <button type="button" className="btn ghost sm push-right" onClick={() => onChange([])}><RotateCcw size={13} aria-hidden /> {t('reset')}</button>
            )}
          </div>
          {slotsFull && <p className="pick-state warn spec-full" id={fullId}><Info size={14} aria-hidden /> {t('specFull')}</p>}
        </>
      )}

      <ul className={`parts ${skill.partsAuto ? '' : 'pick'}`}>
        {parts.map((p) => {
          if (skill.partsAuto) {
            return (
              <li key={p.id} className={on.has(p.id) ? 'on' : ''}>
                <PlainIcon icon={p.icon} size={28} />
                <span>
                  <span className="lv-tag">{t('lv')} {p.level}</span>{richText(p.desc)}
                  {!on.has(p.id) && <small className="pick-state"><Lock size={12} aria-hidden /> {t('specLocked', { lvl: p.level })}</small>}
                </span>
              </li>
            );
          }
          const isChosen = chosen.includes(p.id);
          const reachable = level >= p.level;
          const full = on.size >= open || chosen.length >= MAX_SPECS;
          const disabled = !isChosen && (!reachable || full);
          return (
            <li key={p.id} className={on.has(p.id) ? 'on chosen' : isChosen ? 'chosen inactive' : reachable ? 'avail' : 'locked'}>
              <button
                type="button"
                aria-pressed={isChosen}
                // stays focusable (aria-disabled), the reason is written next to it or above the list
                aria-disabled={disabled || undefined}
                aria-describedby={disabled && reachable && slotsFull ? fullId : undefined}
                onClick={() => { if (!disabled) toggle(p.id); }}
              >
                <PlainIcon icon={p.icon} size={30} />
                <span className="pick-text">
                  <span className="lv-tag">{t('lv')} {p.level}</span>{richText(p.desc)}
                  {isChosen && !on.has(p.id) && <small className="pick-state warn">{t('specInactive')}</small>}
                  {!reachable && !isChosen && <small className="pick-state"><Lock size={12} aria-hidden /> {t('specLocked', { lvl: p.level })}</small>}
                </span>
                <span className="pick-box" aria-hidden>{isChosen && <Check size={14} />}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="spec-changes" aria-live="polite">
        <h4><Sparkles size={14} aria-hidden /> {t('specChanges')}</h4>
        {working.length === 0 ? <p className="muted small">{t('specNone')}</p> : (
          <ul>
            {(delta.cd > 0 || delta.noCd) && cd > 0 && (
              <li><span>{t('cooldown')}</span><b>{fmtCdShort(cd)} → {delta.noCd ? t('noCooldown') : fmtCdShort(Math.max(0, cd - delta.cd))}</b></li>
            )}
            {delta.speed > 0 && <li><span>{t('specSpeed')}</span><b>+{delta.speed} %</b></li>}
            {delta.mp > 0 && <li><span>{t('mpCost')}</span><b>−{delta.mp} %</b></li>}
            {delta.range > 0 && <li><span>{t('specRange')}</span><b>+{delta.range} m</b></li>}
            {delta.uses > 0 && <li><span>{t('specUses')}</span><b>+{delta.uses}</b></li>}
            {textOnly.map((id) => {
              const p = parts.find((x) => x.id === id);
              return p ? <li key={id} className="effect"><PlainIcon icon={p.icon} size={20} /><span>{richText(p.desc)}</span></li> : null;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
