import type { CSSProperties } from 'react';
import type { GameData } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Build, MacroStep } from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { skillLevel } from '../../lib/buildCalc';
import { applyCdr, cdAt } from '../../lib/cooldown';
import { simulateRotation } from '../../lib/rotation';

const DURATION = 30;

/** Timeline of a simplified macro run: one lane per skill, a mark per use and the cooldown after it. */
export function RotationPreview({ data, build, steps }: { data: GameData; build: Build; steps: MacroStep[] }) {
  const { t } = useLoadedGame();
  const resolved = steps
    .map((s) => ({ step: s, skill: data.skillById.get(s.id) }))
    .filter((x): x is { step: MacroStep; skill: NonNullable<typeof x.skill> } => !!x.skill);
  if (!resolved.length) return null;

  const rot = resolved.map(({ step, skill }) => ({
    id: skill.id,
    delay: step.delay,
    cd: applyCdr(cdAt(skill, skillLevel(data, build, skill)), build.cdr),
  }));
  const events = simulateRotation(rot, DURATION);
  const lanes = [...new Map(resolved.map((r) => [r.skill.id, r.skill])).values()];
  const pct = (v: number) => `${Math.min(100, (v / DURATION) * 100)}%`;

  return (
    <div className="rotation">
      <div className="rot-title">
        <strong>{t('rotationPreview', { s: DURATION })}</strong>
        <span className="muted small">{t('rotationHint')}</span>
      </div>
      <div className="rot-grid">
        <div className="rot-axis">
          <span />
          <div className="rot-ticks">
            {Array.from({ length: DURATION / 5 + 1 }, (_, i) => i * 5).map((s) => (
              <span key={s} style={{ left: pct(s) }}>{s}s</span>
            ))}
          </div>
        </div>
        {lanes.map((skill) => {
          const mine = events.filter((e) => e.id === skill.id);
          const cd = rot.find((r) => r.id === skill.id)?.cd ?? 0;
          return (
            <div key={skill.id} className="rot-lane">
              <span className="rot-label">
                <SkillTile skill={skill} level={skillLevel(data, build, skill)} size={24} showCd={false} />
                <span className="rot-name">{skill.name}</span>
                <span className={`rot-count ${mine.length ? '' : 'zero'}`}>{t('uses', { n: mine.length })}</span>
              </span>
              <div className="rot-track">
                {mine.map((e, i) => (
                  <span key={i}>
                    {cd > 0 && <span className="rot-cd" style={{ left: pct(e.t), width: pct(Math.min(cd, DURATION - e.t)) } as CSSProperties} />}
                    <span className="rot-hit" style={{ left: pct(e.t) }} />
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
