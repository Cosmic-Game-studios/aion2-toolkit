import { Check, Lock } from 'lucide-react';
import type { Skill } from '../data/types';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { MAX_SPECS } from '../state/build';
import { activeSpecs, effectiveLevel, specSlotCount } from '../lib/buildCalc';
import { richText } from '../lib/format';
import { PlainIcon } from './SkillTile';

/**
 * Specialisation slots of a normal skill: open slots follow the effective skill level (Lv. 8 / 12 / 20),
 * each option has its own level requirement. Stigma specialisations unlock by themselves and are only listed.
 */
export function SpecPicker({ skill }: { skill: Skill }) {
  const { t, data } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const parts = skill.parts ?? [];
  if (!parts.length) return null;

  if (skill.partsAuto) {
    const on = new Set(activeSpecs(data, build, skill));
    return (
      <>
        <h4>{t('specialisations')}</h4>
        <p className="muted small spec-note">{t('specAuto')}</p>
        <ul className="parts">
          {parts.map((p) => (
            <li key={p.id} className={on.has(p.id) ? 'on' : ''}>
              <PlainIcon icon={p.icon} size={28} />
              <span><span className="lv-tag">{t('lv')} {p.level}</span>{richText(p.desc)}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  const eff = effectiveLevel(data, build, skill);
  const slots = specSlotCount(skill, eff.total);
  const slotLevels = skill.specSlots ?? [];
  const chosen = build.sp?.[skill.id] ?? [];
  const active = new Set(activeSpecs(data, build, skill));

  const toggle = (id: number) => setBuild((b) => {
    const cur = b.sp?.[skill.id] ?? [];
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id].slice(0, MAX_SPECS);
    const sp = { ...b.sp };
    if (next.length) sp[skill.id] = next; else delete sp[skill.id];
    return { ...b, sp };
  });
  const setGear = (n: number) => setBuild((b) => {
    const gx = { ...b.gx };
    const v = Math.min(30, Math.max(0, Math.round(n) || 0));
    if (v) gx[skill.id] = v; else delete gx[skill.id];
    return { ...b, gx };
  });

  return (
    <>
      <h4 className="spec-head">
        {t('specialisations')}
        <span className="count">{t('specSlotsUsed', { n: active.size, max: slots })}</span>
      </h4>
      <div className="eff-level">
        <span className="eyebrow">{t('effLevel')}</span>
        <div className="eff-sum">
          <span><b>{eff.base}</b> {t('fromPointsShort')}</span>
          <span>+ <b>{eff.dv}</b> {t('navDaevanion')}</span>
          <label title={t('gearHint')}>
            + <input type="number" min={0} max={30} value={eff.gear} onChange={(e) => setGear(Number(e.target.value))} aria-label={t('gearLevels')} /> {t('gearLevels')}
          </label>
          <span className="eff-total">= <b>{eff.total}</b></span>
        </div>
        <div className="slot-row" aria-label={t('specSlots')}>
          {slotLevels.map((l, i) => (
            <span key={l} className={`slot-pill ${eff.total >= l ? 'open' : ''} ${i < active.size ? 'used' : ''}`}>
              {eff.total >= l ? (i < active.size ? <Check size={12} /> : null) : <Lock size={11} />} {t('lv')} {l}
            </span>
          ))}
        </div>
      </div>
      <ul className="parts pick">
        {parts.map((p) => {
          const isChosen = chosen.includes(p.id);
          const isActive = active.has(p.id);
          const reachable = eff.total >= p.level;
          const canAdd = reachable && active.size < slots && chosen.length < MAX_SPECS;
          const disabled = !isChosen && !canAdd;
          return (
            <li key={p.id} className={`${isActive ? 'on chosen' : isChosen ? 'chosen inactive' : reachable ? 'avail' : 'locked'}`}>
              <button
                type="button"
                aria-pressed={isChosen}
                disabled={disabled}
                title={!reachable ? t('specLocked', { lvl: p.level }) : disabled ? t('specFull') : undefined}
                onClick={() => toggle(p.id)}
              >
                <PlainIcon icon={p.icon} size={30} />
                <span className="pick-text">
                  <span className="lv-tag">{t('lv')} {p.level}</span>{richText(p.desc)}
                  {isChosen && <small className={isActive ? 'pick-state ok' : 'pick-state warn'}>{isActive ? t('specActive') : t('specInactive')}</small>}
                  {!reachable && !isChosen && <small className="pick-state"><Lock size={11} /> {t('specLocked', { lvl: p.level })}</small>}
                </span>
                <span className="pick-box" aria-hidden>{isChosen && <Check size={14} />}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="muted small spec-note">{t('specPickHint')} {t('specItemHint')}</p>
    </>
  );
}
