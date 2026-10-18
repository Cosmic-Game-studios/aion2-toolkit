import { Check, Info, Lock, Minus, Plus } from 'lucide-react';
import type { Skill } from '../data/types';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { MAX_SPECS } from '../state/build';
import { activeSpecs, effectiveLevel, specSlotCount } from '../lib/buildCalc';
import { GAME_SKILL_CAP } from '../lib/levelCap';
import { richText } from '../lib/format';
import { PlainIcon } from './SkillTile';
import { NumberField } from './ui';
import { InfoTip } from './InfoTip';

/**
 * Effective skill level of a normal skill: bought level + Daevanion skill nodes + gear and Arcana (editable), capped
 * at the in-game maximum (40). Specialisation slots, texts and cooldowns follow it.
 */
export function EffLevel({ skill }: { skill: Skill }) {
  const { t, data } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const eff = effectiveLevel(data, build, skill);
  const atCap = eff.base + eff.dv + eff.gear >= eff.cap;
  // what gear and Arcana still have to add to reach the cap with the bought and Daevanion levels
  const toCap = Math.max(0, eff.cap - eff.base - eff.dv);
  const setGear = (n: number) => setBuild((b) => {
    const gx = { ...b.gx };
    const v = Math.min(GAME_SKILL_CAP, Math.max(0, Math.round(n) || 0));
    if (v) gx[skill.id] = v; else delete gx[skill.id];
    return { ...b, gx };
  });
  return (
    <div className="eff-level">
      <div className="eff-head">
        <span className="eff-label">{t('effLevel')}</span>
        <span className="eff-total">
          <b>{eff.total}</b><span className="muted"> / {eff.cap}</span>
          {atCap && <span className="chip accent">{t('levelMax')}</span>}
        </span>
      </div>
      <div className="eff-sum">
        <span>= <b>{eff.base}</b> {t('fromPointsShort')}</span>
        <span>+ <b>{eff.dv}</b> {t('navDaevanion')}</span>
        <span className="eff-gear" role="group" aria-label={t('gearLevels')}>
          <span aria-hidden>+</span>
          <button type="button" className="icon-btn sm" disabled={eff.gear <= 0} onClick={() => setGear(eff.gear - 1)} aria-label={t('gearDown')}>
            <Minus size={14} aria-hidden />
          </button>
          <NumberField value={eff.gear} min={0} max={GAME_SKILL_CAP} onChange={setGear} aria-label={t('gearLevels')} />
          <button type="button" className="icon-btn sm" disabled={atCap} onClick={() => setGear(eff.gear + 1)} aria-label={t('gearUp')}>
            <Plus size={14} aria-hidden />
          </button>
          <span>{t('gearLevels')}</span>
        </span>
        {!atCap && (
          <button type="button" className="btn ghost sm eff-max" onClick={() => setGear(toCap)} title={t('gearToCapHint', { n: eff.cap })}>
            {t('gearToCap', { n: eff.cap })}
          </button>
        )}
        <InfoTip text={<>{t('gearHint')} {t('levelCapHint', { n: eff.cap })}</>} label={t('gearLevels')} />
      </div>
    </div>
  );
}

/**
 * Specialisation slots of a normal skill: open slots follow the effective skill level (Lv. 8 / 12 / 20),
 * each option has its own level requirement. Stigma specialisations unlock by themselves and are only listed.
 * `inTab`: shown under a "Specialisations" tab next to an EffLevel box, so no heading and no level box of its own.
 */
export function SpecPicker({ skill, inTab }: { skill: Skill; inTab?: boolean }) {
  const { t, data } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const parts = skill.parts ?? [];
  if (!parts.length) return null;

  if (skill.partsAuto) {
    const on = new Set(activeSpecs(data, build, skill));
    return (
      <div className="spec-picker">
        {!inTab && <h4 className="spec-head">{t('specialisations')}</h4>}
        <p className="field-hint">{t('specAuto')}</p>
        <ul className="parts">
          {parts.map((p) => (
            <li key={p.id} className={on.has(p.id) ? 'on' : ''}>
              <PlainIcon icon={p.icon} size={28} />
              <span><span className="lv-tag">{!on.has(p.id) && <Lock size={11} aria-hidden />} {t('lv')} {p.level}</span>{richText(p.desc)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const eff = effectiveLevel(data, build, skill);
  const slots = specSlotCount(skill, eff.total);
  const slotLevels = skill.specSlots ?? [];
  const chosen = build.sp?.[skill.id] ?? [];
  const active = new Set(activeSpecs(data, build, skill));
  const full = active.size >= slots || chosen.length >= MAX_SPECS;
  const nextSlot = slotLevels.find((l) => eff.total < l);

  const toggle = (id: number) => setBuild((b) => {
    const cur = b.sp?.[skill.id] ?? [];
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id].slice(0, MAX_SPECS);
    const sp = { ...b.sp };
    if (next.length) sp[skill.id] = next; else delete sp[skill.id];
    return { ...b, sp };
  });

  // why options cannot be picked right now – visible, not only in a tooltip
  const hint = slots === 0 && nextSlot != null
    ? t('specTeaserLocked', { lvl: nextSlot })
    : full
      ? [t('specFull'), nextSlot != null ? t('specNextSlot', { lvl: nextSlot, now: eff.total }) : ''].filter(Boolean).join(' ')
      : '';

  return (
    <div className="spec-picker">
      {!inTab && (
        <h4 className="spec-head">
          {t('specialisations')}
          <span className="count">{t('specSlotsUsed', { n: active.size, max: slots })}</span>
        </h4>
      )}
      {!inTab && <EffLevel skill={skill} />}
      <div className="spec-status">
        <ul className="slot-row" aria-label={t('specSlots')}>
          {slotLevels.map((l, i) => {
            const open = eff.total >= l;
            const used = open && i < active.size;
            return (
              <li key={l} className={`slot-pill ${open ? 'open' : ''} ${used ? 'used' : ''}`}>
                {used ? <Check size={12} aria-hidden /> : !open ? <Lock size={12} aria-hidden /> : null}
                {t('lv')} {l}
                <span className="sr-only"> – {used ? t('specActive') : open ? t('slotEmpty') : t('specLocked', { lvl: l })}</span>
              </li>
            );
          })}
        </ul>
        {inTab && <span className="spec-used">{t('specSlotsUsed', { n: active.size, max: slots })}</span>}
      </div>
      {hint && <p className="spec-hint" role="note"><Info size={14} aria-hidden /> {hint}</p>}
      <ul className="parts pick">
        {parts.map((p) => {
          const isChosen = chosen.includes(p.id);
          const isActive = active.has(p.id);
          const reachable = eff.total >= p.level;
          const canAdd = reachable && !full;
          const disabled = !isChosen && !canAdd;
          return (
            <li key={p.id} className={`${isActive ? 'on chosen' : isChosen ? 'chosen inactive' : reachable ? 'avail' : 'locked'}`}>
              <button type="button" aria-pressed={isChosen} disabled={disabled} onClick={() => toggle(p.id)}>
                <PlainIcon icon={p.icon} size={30} />
                <span className="pick-text">
                  <span className="lv-tag">{t('lv')} {p.level}</span>{richText(p.desc)}
                  {isChosen && <small className={isActive ? 'pick-state ok' : 'pick-state warn'}>{isActive ? t('specActive') : t('specInactive')}</small>}
                  {!reachable && !isChosen && <small className="pick-state"><Lock size={12} aria-hidden /> {t('specLocked', { lvl: p.level })}</small>}
                </span>
                <span className="pick-box" aria-hidden>{isChosen && <Check size={14} />}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="field-hint spec-note">{t('specItemHint')}</p>
    </div>
  );
}
