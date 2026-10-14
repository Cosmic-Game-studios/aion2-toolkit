export interface RotationStep { id: number; cd: number; delay: number }
export interface RotationEvent { t: number; id: number }

/**
 * Simplified macro simulation: at each moment the first step (in priority order) whose skill is
 * off cooldown is used. Every use takes `actionTime` seconds plus the step's delay.
 * The cooldown starts when the skill is used. Not a damage or animation model.
 */
export function simulateRotation(steps: RotationStep[], duration = 30, actionTime = 1): RotationEvent[] {
  if (!steps.length) return [];
  const ready = new Map<number, number>();
  const events: RotationEvent[] = [];
  let t = 0;
  let guard = 0;
  while (t < duration && guard++ < 2000) {
    const next = steps.find((s) => (ready.get(s.id) ?? 0) <= t + 1e-9);
    if (!next) {
      const nt = Math.min(...steps.map((s) => ready.get(s.id) ?? 0));
      if (!Number.isFinite(nt) || nt <= t) break;
      t = nt;
      continue;
    }
    events.push({ t, id: next.id });
    ready.set(next.id, t + Math.max(0, next.cd));
    t += actionTime + next.delay / 1000;
  }
  return events;
}
