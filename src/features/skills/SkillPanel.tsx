import { useId } from 'react';
import { ArrowRight, Layers, Lock, Minus, Plus, TriangleAlert } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Skill } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import { DetailTabs, SkillCombos, SkillDetail, SkillHead, useSkillCombos, type DetailTab } from '../../components/SkillDetail';
import { EffLevel, SpecPicker } from '../../components/SpecPicker';
import { PlainIcon } from '../../components/SkillTile';
import { maxBuyableLevel, skillPointStep } from '../../lib/skillCosts';
import { activeSpecs, effectiveLevel, isUnlocked, skillLevel, skillPointBudget, skillPointsSpent, specSlotCount } from '../../lib/buildCalc';

export type SkillTab = 'effect' | 'specs' | 'combos';

/**
 * Everything about one skill of the build: level control (bought level, effective level with gear and Arcana), then tabs
 * Effect | Specialisations | Combos. Used in the side panel (wide screens) and in the bottom sheet (phones, tablets).
 */
export function SkillPanel({ skill, tab, onTab, inSheet }: { skill: Skill; tab: SkillTab; onTab: (t: SkillTab) => void; inSheet?: boolean }) {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const idBase = `sp-${useId().replace(/:/g, '')}`;
  const combos = useSkillCombos(skill.id);

  const unlocked = isUnlocked(build, skill);
  const lvl = skillLevel(data, build, skill);
  const max = maxBuyableLevel(data.costs, skill.id);
  const next = unlocked && lvl < max ? skillPointStep(data.costs, skill.id, lvl + 1) : 0;
  const left = skillPointBudget(data, build).total - skillPointsSpent(data, build);
  const short = next > 0 && next > left;
  const setLevel = (v: number) => setBuild((b) => ({ ...b, lv: { ...b.lv, [skill.id]: Math.max(1, Math.min(max, v)) } }));

  const parts = skill.parts ?? [];
  const pickable = parts.length > 0 && !skill.partsAuto;
  const eff = effectiveLevel(data, build, skill);
  const slots = specSlotCount(skill, eff.total);
  const active = activeSpecs(data, build, skill);
  const firstSlot = skill.specSlots?.[0];

  const tabs: DetailTab<SkillTab>[] = [{ id: 'effect', label: t('tabEffect') }];
  if (parts.length) tabs.push({ id: 'specs', label: t('specialisations'), count: pickable ? `${active.length}/${slots}` : parts.length });
  if (combos.length) tabs.push({ id: 'combos', label: t('navCombos'), count: combos.length });
  const shown: SkillTab = tabs.some((x) => x.id === tab) ? tab : 'effect';

  return (
    <div className="skill-panel">
      <SkillHead skill={skill} level={eff.total} locked={!unlocked} hideName={inSheet} noLevel />

      <div className="sp-level">
        <div className="sp-row">
          <span className="sp-label" id={`${idBase}-lvl`}>{t('levelFromPoints')}</span>
          <div className="sp-stepper" role="group" aria-labelledby={`${idBase}-lvl`}>
            <button type="button" className="icon-btn sm" disabled={!unlocked || lvl <= 1} onClick={() => setLevel(lvl - 1)} aria-label={t('levelDown')}>
              <Minus size={15} aria-hidden />
            </button>
            <span className="sp-value" aria-live="polite">
              {unlocked ? lvl : '–'}<small> / {max}</small>
            </span>
            <button type="button" className="icon-btn sm" disabled={!unlocked || lvl >= max} onClick={() => setLevel(lvl + 1)} aria-label={t('levelUp')}>
              <Plus size={15} aria-hidden />
            </button>
          </div>
          {unlocked ? (
            <span className={`sr-next ${short ? 'warn' : ''}`}>
              {next
                ? <>{short && <TriangleAlert size={12} aria-hidden />}{t('nextLevelCost', { n: next })}{short && <span className="sr-only"> – {t('notEnoughPoints')}</span>}</>
                : t('levelMaxed')}
            </span>
          ) : (
            <span className="sr-next warn"><Lock size={12} aria-hidden /> {t('lockedUntil', { lvl: skill.acquireLevel })}</span>
          )}
        </div>
        {!skill.isStigma && <EffLevel skill={skill} />}
      </div>

      {tabs.length > 1 && <DetailTabs tabs={tabs} value={shown} onChange={onTab} label={t('detailTabs')} idBase={idBase} className="sp-tabs" autoFocus={inSheet} />}

      <div role={tabs.length > 1 ? 'tabpanel' : undefined} id={`${idBase}-panel`} aria-labelledby={tabs.length > 1 ? `${idBase}-tab-${shown}` : undefined} className="sp-panel">
        {shown === 'effect' && (
          <>
            <SkillDetail skill={skill} level={eff.total} locked={!unlocked} head={false} hideSpecs={parts.length > 0} />
            {pickable && (
              <button
                type="button"
                className="sp-teaser"
                onClick={() => {
                  onTab('specs');
                  // the teaser goes away with the tab change: keep the focus on the new tab, not on the page body
                  requestAnimationFrame(() => document.getElementById(`${idBase}-tab-specs`)?.focus());
                }}
              >
                <Layers size={16} aria-hidden />
                <span>
                  {slots > 0
                    ? t('specTeaserOpen', { n: active.length, m: slots })
                    : t('specTeaserLocked', { lvl: firstSlot ?? 8 })}
                </span>
                <span className="sp-teaser-icons">
                  {active.map((id) => {
                    const p = parts.find((x) => x.id === id);
                    return p ? <PlainIcon key={id} icon={p.icon} size={22} /> : null;
                  })}
                </span>
                <ArrowRight size={15} aria-hidden />
              </button>
            )}
          </>
        )}
        {shown === 'specs' && <SpecPicker skill={skill} inTab />}
        {shown === 'combos' && <SkillCombos skillId={skill.id} inTab />}
      </div>
    </div>
  );
}
