import type { Skill } from '../data/types';
import { specSlotCount } from './buildCalc';

/** What a specialisation changes in numbers, read from its English text. Everything else stays text. */
export interface SpecDelta {
  /** seconds off the skill's own cooldown */
  cd: number;
  /** cooldown removed */
  noCd: boolean;
  /** skill speed in percent */
  speed: number;
  /** MP cost reduction in percent */
  mp: number;
  /** extra range in metres */
  range: number;
  /** extra consecutive uses */
  uses: number;
}

export const NO_DELTA: SpecDelta = { cd: 0, noCd: false, speed: 0, mp: 0, range: 0, uses: 0 };

export function specDelta(enDesc: string): SpecDelta {
  const t = (enDesc ?? '').replace(/\*\*/g, '').trim();
  const d = { ...NO_DELTA };
  const num = (re: RegExp) => { const m = re.exec(t); return m ? Number(m[1]) : 0; };
  d.cd = num(/^-([\d.]+)s cooldown$/);
  d.noCd = /^Remove cooldown$/.test(t);
  d.speed = num(/\+([\d.]+)% Skill Speed/);
  d.mp = num(/-([\d.]+)% MP (?:consumed|Cost)/);
  d.range = num(/^\+([\d.]+)m Range$/i);
  d.uses = num(/\+(\d+) consecutive uses?/);
  return d;
}

/** Sum of the given specialisations (ids) of a skill; `en` is the same skill from the English data. */
export function sumDeltas(en: Skill | undefined, ids: number[]): SpecDelta {
  const out = { ...NO_DELTA };
  for (const id of ids) {
    const p = en?.parts?.find((x) => x.id === id);
    if (!p) continue;
    const d = specDelta(p.desc);
    out.cd += d.cd;
    out.noCd = out.noCd || d.noCd;
    out.speed += d.speed;
    out.mp += d.mp;
    out.range += d.range;
    out.uses += d.uses;
  }
  return out;
}

export const hasDelta = (d: SpecDelta) => d.cd > 0 || d.noCd || d.speed > 0 || d.mp > 0 || d.range > 0 || d.uses > 0;

/**
 * Specialisations that work at this skill level: stigmas unlock theirs by level, normal skills use the
 * chosen ones whose level is reached, as many as slots are open (Lv. 8 / 12 / 20).
 */
export function workingSpecs(skill: Skill, level: number, chosen: number[]): number[] {
  const parts = skill.parts ?? [];
  if (skill.partsAuto) return parts.filter((p) => level >= p.level).map((p) => p.id);
  const ok = chosen.filter((id) => (parts.find((p) => p.id === id)?.level ?? Infinity) <= level);
  return ok.slice(0, specSlotCount(skill, level));
}
