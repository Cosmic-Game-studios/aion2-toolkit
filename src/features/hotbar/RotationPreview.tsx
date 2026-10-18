import { memo, useMemo, useState, type CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import type { GameData, Skill } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { keyStack, type Build, type MacroStep } from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { activeSpecs, shownLevel } from '../../lib/buildCalc';
import { CLASS_MECHANICS } from '../../data/mechanics';
import { Segmented } from '../../components/ui';
import { applyCdr, cdAt } from '../../lib/cooldown';
import { keyLabel } from '../../lib/keyLabel';
import { BOSS_FIGHT, simulateMacro } from '../../lib/rotation';

const DURATION = 30;
const ORDER_LEN = 12;

/**
 * Timeline of a simulated macro run (keys in turn, each key's stack bottom first), grouped by key in step order,
 * with the first casts as a strip. With the class mechanics it respects conditions – a payoff only fires after its
 * setup, crowd control does not land on a boss, reactive skills wait for a block or dodge.
 * Memoised: the simulation only runs again when the build, the steps or the target change.
 */
export const RotationPreview = memo(function RotationPreview({ data, build, steps }: { data: GameData; build: Build; steps: MacroStep[] }) {
  const { t } = useLoadedGame();
  const [target, setTarget] = useState<'boss' | 'mob'>('boss');
  const mech = CLASS_MECHANICS[build.c];

  const sim = useMemo(() => {
    const keys = steps.map((step) => ({
      delay: step.delay,
      key: step.k,
      stack: keyStack(build, step.k)
        .map((id) => data.skillById.get(id))
        .filter((skill): skill is Skill => !!skill)
        .map((skill) => ({ id: skill.id, skill, cd: applyCdr(cdAt(skill, shownLevel(data, build, skill)), build.cdr) })),
    }));
    const rot = keys.flatMap((k) => k.stack);
    if (!rot.length) return null;
    const parts = new Set(rot.flatMap((r) => activeSpecs(data, build, r.skill)));
    const events = simulateMacro(keys, DURATION, 1, mech ? { mech, parts, ...(target === 'boss' ? BOSS_FIGHT(DURATION) : { target: 'mob', reactEvery: 12 }) } : {});
    // one group per key, in the order the macro first presses it
    const seen = new Set<number>();
    const groups: typeof keys = [];
    for (const k of keys) {
      if (!k.stack.length || seen.has(k.key)) continue;
      seen.add(k.key);
      groups.push(k);
    }
    return { groups, events };
  }, [data, build, steps, mech, target]);

  if (!sim) return null;
  const pct = (v: number) => `${Math.min(100, (v / DURATION) * 100)}%`;
  const order = sim.events.slice(0, ORDER_LEN);

  return (
    <section className="rotation" aria-label={t('rotationPreview', { s: DURATION })}>
      <div className="rot-title">
        <strong>{t('rotationPreview', { s: DURATION })}</strong>
        {mech && (
          <Segmented<'boss' | 'mob'>
            label={t('rotTarget')}
            value={target}
            onChange={setTarget}
            options={[{ value: 'boss', label: t('rotTargetBoss') }, { value: 'mob', label: t('rotTargetMob') }]}
          />
        )}
      </div>
      <p className="rot-intro">{t('rotationShort')}</p>
      <details className="hb-details">
        <summary>{t('rotationMore')} <ChevronDown size={15} className="hb-details-chev" aria-hidden /></summary>
        <p>{t(mech ? 'rotationHintMech' : 'rotationHint')}</p>
      </details>

      {order.length > 0 && (
        <div className="rot-order-wrap">
          <h4 className="rot-sub">{t('rotCastOrder', { n: order.length })}</h4>
          <ol className="rot-order">
            {order.map((e, i) => {
              const skill = data.skillById.get(e.id);
              if (!skill) return null;
              return (
                <li key={i} className="rot-cast">
                  <SkillTile skill={skill} level={shownLevel(data, build, skill)} size={28} showCd={false} />
                  {e.key != null && <span className="rot-cast-key" aria-hidden>{keyLabel(e.key, t)}</span>}
                  <span className="rot-cast-t">{Math.round(e.t)}s</span>
                  <span className="sr-only">{skill.name}{e.key != null ? ` (${t('column', { n: keyLabel(e.key, t) })})` : ''}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="rot-legend" aria-hidden>
        <span><i className="lg-hit" /> {t('rotLegendCast')}</span>
        <span><i className="lg-cd" /> {t('rotLegendCd')}</span>
      </div>

      <div className="rot-grid">
        <div className="rot-axis" aria-hidden>
          <span />
          <div className="rot-ticks">
            {Array.from({ length: DURATION / 5 + 1 }, (_, i) => i * 5).map((s) => (
              <span key={s} style={{ left: pct(s) }}>{s}s</span>
            ))}
          </div>
        </div>
        {sim.groups.map((g) => (
          <div key={g.key} className="rot-group">
            <div className="rot-keyhead"><kbd>{keyLabel(g.key, t)}</kbd></div>
            {g.stack.map((r, i) => {
              const mine = sim.events.filter((e) => e.id === r.id && e.key === g.key);
              return (
                <div key={r.id} className="rot-lane">
                  <span className="rot-label">
                    {g.stack.length > 1 && <span className="rot-ord">{i + 1}.</span>}
                    <SkillTile skill={r.skill} level={shownLevel(data, build, r.skill)} size={24} showCd={false} />
                    <span className="rot-name">{r.skill.name}</span>
                    <span className={`rot-count ${mine.length ? '' : 'zero'}`}>{mine.length ? t('uses', { n: mine.length }) : t('rotNever')}</span>
                  </span>
                  <div className="rot-track" aria-hidden>
                    {mine.map((e, j) => (
                      <span key={j}>
                        {r.cd > 0 && <span className="rot-cd" style={{ left: pct(e.t), width: pct(Math.min(r.cd, DURATION - e.t)) } as CSSProperties} />}
                        <span className="rot-hit" style={{ left: pct(e.t) }} />
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
});
