import { useId } from 'react';
import { ArrowRightLeft, Lock, Minus, Plus, Star, X } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Skill } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import { DetailTabs, SkillCombos, SkillDetail, SkillHead, useSkillCombos, type DetailTab } from '../../components/SkillDetail';
import { maxStigmaLevel, stigmaShardStep, stigmaShardsTo } from '../../lib/skillCosts';
import { STIGMA_SLOT_LEVELS, STIGMA_SPEC_LEVELS } from '../../lib/stigmaRules';
import { unlockedSlots } from '../../lib/buildCalc';
import { applyCdr, cdAt, fmtCdShort } from '../../lib/cooldown';

export type StigmaTab = 'effect' | 'costs' | 'combos';

interface Props {
  skill: Skill;
  tab: StigmaTab;
  onTab: (t: StigmaTab) => void;
  inSheet?: boolean;
  /** equip into the first free open slot (moves it out of a locked slot) */
  onEquip: (s: Skill) => void;
  onRemove: (slot: number) => void;
  onLevel: (slot: number, lv: number) => void;
}

const isSpecLevel = (lv: number) => (STIGMA_SPEC_LEVELS as readonly number[]).includes(lv);

/**
 * One stigma: where it sits (slot, level, shards) with the matching actions, then tabs Effect | Shard costs | Combos.
 * Side panel on wide screens, bottom sheet on phones and tablets.
 */
export function StigmaPanel({ skill, tab, onTab, inSheet, onEquip, onRemove, onLevel }: Props) {
  const { data, t } = useLoadedGame();
  const { build } = useBuild();
  const idBase = `st-${useId().replace(/:/g, '')}`;
  const combos = useSkillCombos(skill.id);
  const { costs } = data;

  const open = unlockedSlots(build);
  const idx = build.st.findIndex((x) => x.id === skill.id);
  const inOpen = idx >= 0 && open[idx];
  const lv = idx >= 0 ? build.st[idx].lv : 1;
  const max = maxStigmaLevel(costs, skill.id);
  const freeIdx = build.st.findIndex((x, i) => x.id == null && open[i]);
  const anyOpen = open.some(Boolean);

  const tabs: DetailTab<StigmaTab>[] = [{ id: 'effect', label: t('tabEffect') }, { id: 'costs', label: t('shardCosts') }];
  if (combos.length) tabs.push({ id: 'combos', label: t('navCombos'), count: combos.length });
  const shown: StigmaTab = tabs.some((x) => x.id === tab) ? tab : 'effect';
  // Equip and Remove replace each other: the focus moves to the new button instead of being lost
  const focusSoon = (id: string) => requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  const equip = () => { onEquip(skill); focusSoon(`${idBase}-remove`); };
  const remove = () => { onRemove(idx); focusSoon(`${idBase}-equip`); };

  return (
    <div className="skill-panel stigma-panel">
      <SkillHead skill={skill} level={lv} hideName={inSheet} noLevel />

      <div className="sp-level">
        {inOpen ? (
          <>
            <div className="sp-row">
              <span className="sp-label" id={`${idBase}-lvl`}>{t('slot', { n: idx + 1 })} · {t('stigmaLevel')}</span>
              <div className="sp-stepper" role="group" aria-labelledby={`${idBase}-lvl`}>
                <button type="button" className="icon-btn sm" disabled={lv <= 1} onClick={() => onLevel(idx, lv - 1)} aria-label={t('levelDown')}><Minus size={15} aria-hidden /></button>
                <span className="sp-value" aria-live="polite">{lv}<small> / {max}</small></span>
                <button type="button" className="icon-btn sm" disabled={lv >= max} onClick={() => onLevel(idx, lv + 1)} aria-label={t('levelUp')}><Plus size={15} aria-hidden /></button>
              </div>
              <button type="button" id={`${idBase}-remove`} className="btn ghost sm" onClick={remove}><X size={14} aria-hidden /> {t('removeStigma')}</button>
            </div>
            <p className="sp-cost">
              {t('shardsForLevel', { lvl: lv })}: <b>{stigmaShardsTo(costs, skill.id, lv)}</b>
              <span className="muted"> · {lv < max ? `${t('nextLevel')}: +${stigmaShardStep(costs, skill.id, lv + 1)}` : t('levelMaxed')}</span>
            </p>
          </>
        ) : idx >= 0 ? (
          <>
            <p className="sp-warn"><Lock size={14} aria-hidden /> {t('slotInactive', { lvl: STIGMA_SLOT_LEVELS[idx] })}</p>
            <div className="sp-actions">
              {freeIdx >= 0 && <button type="button" className="btn sm" onClick={equip}><ArrowRightLeft size={14} aria-hidden /> {t('moveToFreeSlot')}</button>}
              <button type="button" className="btn ghost sm" onClick={remove}><X size={14} aria-hidden /> {t('removeStigma')}</button>
            </div>
          </>
        ) : (
          <div className="sp-row">
            <span className="sp-label">{t('notEquipped')}</span>
            {freeIdx >= 0
              ? <button type="button" id={`${idBase}-equip`} className="btn sm stigma-equip" onClick={equip}><Plus size={14} aria-hidden /> {t('equipInSlot', { n: freeIdx + 1 })}</button>
              : <span className="field-hint">{anyOpen ? t('slotsFullHint') : t('noSlotYet', { lvl: STIGMA_SLOT_LEVELS[0] })}</span>}
          </div>
        )}
      </div>

      <DetailTabs tabs={tabs} value={shown} onChange={onTab} label={t('detailTabs')} idBase={idBase} className="sp-tabs" autoFocus={inSheet} />

      <div role="tabpanel" id={`${idBase}-panel`} aria-labelledby={`${idBase}-tab-${shown}`} className="sp-panel">
        {shown === 'effect' && <SkillDetail skill={skill} level={lv} head={false} />}
        {shown === 'costs' && (
          <>
            <div className="table-wrap flat">
              <table className="table cost-table">
                <caption className="sr-only">{t('shardCosts')}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t('lv')}</th>
                    <th scope="col">{t('cost')}</th>
                    <th scope="col">{t('total')}</th>
                    <th scope="col">{t('cooldown')}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: max }, (_, i) => i + 1).map((l) => {
                    const mark = isSpecLevel(l);
                    const star = mark && <Star size={12} className="cost-star" role="img" aria-label={t('specMilestone')} />;
                    const cd = applyCdr(cdAt(skill, l), build.cdr);
                    return (
                      <tr key={l} className={`${inOpen && l <= lv ? 'on' : ''} ${inOpen && l === lv ? 'current' : ''}`}>
                        <td>
                          {inOpen ? (
                            <button
                              type="button"
                              className="lv-set"
                              aria-pressed={l === lv}
                              aria-label={mark ? `${t('setLevelTo', { n: l })} – ${t('specMilestone')}` : t('setLevelTo', { n: l })}
                              onClick={() => onLevel(idx, l)}
                            >
                              {l}{star}
                            </button>
                          ) : <span className="lv-cell">{l}{star}</span>}
                        </td>
                        <td>{stigmaShardStep(costs, skill.id, l)}</td>
                        <td>{stigmaShardsTo(costs, skill.id, l)}</td>
                        <td>{cd > 0 ? fmtCdShort(cd) : '–'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="field-hint sp-legend">
              <Star size={12} className="cost-star" aria-hidden /> {t('specUnlockMark')}
              {inOpen && <> {t('costTableTip')}</>}
            </p>
          </>
        )}
        {shown === 'combos' && <SkillCombos skillId={skill.id} inTab />}
      </div>
    </div>
  );
}
