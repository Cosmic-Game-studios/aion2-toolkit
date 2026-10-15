import type { ClassMechanics, MechCond, SkillMech } from '../data/mechanics';

export interface RotationEvent { t: number; id: number; key?: number }

export interface MacroKey { stack: { id: number; cd: number }[]; delay: number; key?: number }

export interface SimOptions {
  /** skill mechanics of the class: conditions and what each cast leaves behind */
  mech?: ClassMechanics;
  /** boss: crowd control (Stun, Knockdown, Airborne, Root, Fear, Frost) does not land, the boss staggers now and then */
  target?: 'boss' | 'mob';
  /** chosen specialisations (part ids) */
  parts?: Set<number>;
  /** a block / parry / evade / dodge of the player every n seconds (reactive skills open for 3 s); 0 = never */
  reactEvery?: number;
  /** stagger windows of the boss, [from, to] in seconds */
  stagger?: [number, number][];
  /** skills pressed by hand before the macro runs (opener), in order */
  opener?: { id: number; cd: number }[];
}

const REACT_WINDOW = 3;
/** a hit is a critical hit about this often – for "after a Critical Hit" windows */
const CRIT_RATE = 0.4;

/**
 * State of one simulated fight: statuses and marks on the target, own states, cooldowns, and the
 * expected-value counters that turn chances (a 30% Knockdown, a 7% trigger) into whole events.
 */
class Fight {
  ready = new Map<number, number>();
  last = new Map<number, number>();
  target = new Map<string, { until: number; stacks: number }>();
  self = new Map<string, { until: number; stacks: number }>();
  luck = new Map<string, number>();
  /** skills a chance trigger made usable, until when */
  procs = new Map<number, number>();
  critUntil = -1;
  casts = 0;
  private mech: Map<number, SkillMech>;

  constructor(private o: SimOptions) {
    this.mech = new Map((o.mech ?? []).map((m) => [m.id, m]));
  }

  /** expected-value roll: true once the accumulated chance reaches 1 */
  private roll(key: string, p: number): boolean {
    if (p >= 1) return true;
    const v = (this.luck.get(key) ?? 0) + p;
    if (v >= 1) { this.luck.set(key, v - 1); return true; }
    this.luck.set(key, v);
    return false;
  }

  private has(map: Map<string, { until: number; stacks: number }>, s: string, t: number, n = 1) {
    const x = map.get(s);
    return !!x && x.until > t && x.stacks >= n;
  }

  private cond(c: MechCond, id: number, t: number): boolean {
    const o = this.o;
    switch (c.t) {
      case 'status': return c.s.some((s) => this.has(this.target, s, t) || this.has(this.self, s, t));
      case 'stagger': return o.target === 'boss' && (o.stagger ?? []).some(([a, b]) => t >= a && t < b);
      case 'block': case 'parry': case 'evade': case 'dodge': {
        const every = o.reactEvery ?? 0;
        return every > 0 && t >= every && (t % every) < REACT_WINDOW;
      }
      case 'after': return c.ids.some((x) => { const l = this.last.get(x); return l != null && t - l <= c.window; });
      case 'self': return this.has(this.self, c.s, t);
      case 'stacks': return this.has(c.self ? this.self : this.target, c.s, t, c.n);
      case 'crit': return t <= this.critUntil;
      case 'chance': return (this.procs.get(id) ?? -1) >= t;
      case 'ooc': return false;
    }
  }

  usable(id: number, t: number): boolean {
    if ((this.ready.get(id) ?? 0) > t + 1e-9) return false;
    const m = this.mech.get(id);
    if (!m) return true;
    if (m.toggle && this.last.has(id)) return false;
    const vias = (m.useVia ?? []).filter((v) => this.o.parts?.has(v.part));
    if (vias.some((v) => v.free)) return true;
    if (!m.use?.length) return true;
    return [...m.use, ...vias.flatMap((v) => v.use ?? [])].some((c) => this.cond(c, id, t));
  }

  cast(id: number, cd: number, t: number) {
    this.casts++;
    this.ready.set(id, t + Math.max(0, cd));
    this.last.set(id, t);
    if (this.roll('crit', CRIT_RATE)) this.critUntil = t + 3;
    this.procs.delete(id);
    // every hit may trigger skills with a chance condition ("7% chance to trigger when attacking …")
    for (const x of this.mech.values()) {
      const p = x.use?.find((c): c is Extract<MechCond, { t: 'chance' }> => c.t === 'chance')?.p;
      if (p && this.roll(`chance:${x.id}`, p / 100)) this.procs.set(x.id, t + 5);
    }
    const m = this.mech.get(id);
    if (!m) return;
    if (m.consumes) this.target.delete(m.consumes);
    for (const e of m.gives ?? []) {
      if (e.part && !this.o.parts?.has(e.part)) continue;
      if (!e.self && this.o.target === 'boss' && !e.boss) continue;
      if (!e.self && e.npc != null && e.npc < 100 && !this.roll(`npc:${id}:${e.s}`, e.npc / 100)) continue;
      if (e.chance != null && e.chance < 100 && !this.roll(`chance:${id}:${e.s}`, e.chance / 100)) continue;
      const map = e.self ? this.self : this.target;
      const cur = map.get(e.s);
      const stacks = (cur && cur.until > t ? cur.stacks : 0) + (e.stacks ?? 1);
      map.set(e.s, { until: t + e.dur, stacks });
    }
    for (const r of m.resets ?? []) {
      if (r.part && !this.o.parts?.has(r.part)) continue;
      if (r.chance != null && !this.roll(`reset:${id}:${r.id}`, r.chance / 100)) continue;
      for (const target of r.id === 'all' ? [...this.ready.keys()].filter((x) => x !== id) : [r.id]) {
        const at = this.ready.get(target);
        if (at == null) continue;
        this.ready.set(target, r.by ? Math.max(t, at - r.by) : t);
      }
    }
  }
}

/**
 * The in-game macro: it presses its keys one after another and starts over. A key fires the lowest
 * skill of its stack that can be cast now – off cooldown and, with mechanics, its condition met
 * (target knocked down, shortly after another skill, Four Elements, …); otherwise the macro goes on.
 * Every cast takes `actionTime` seconds plus the step delay. Not a damage or animation model.
 */
export function simulateMacro(keys: MacroKey[], duration = 30, actionTime = 1, opts: SimOptions = {}): RotationEvent[] {
  const steps = keys.filter((k) => k.stack.length);
  if (!steps.length) return [];
  const f = new Fight(opts);
  const events: RotationEvent[] = [];
  let t = 0;
  for (const o of opts.opener ?? []) {
    if (!f.usable(o.id, t)) continue;
    events.push({ t, id: o.id });
    f.cast(o.id, o.cd, t);
    t += actionTime;
  }
  let i = 0;
  let idle = 0;
  let guard = 0;
  while (t < duration && guard++ < 8000) {
    const step = steps[i++ % steps.length];
    const skill = step.stack.find((s) => f.usable(s.id, t));
    if (skill) {
      events.push({ t, id: skill.id, key: step.key });
      f.cast(skill.id, skill.cd, t);
      t += actionTime + step.delay / 1000;
      idle = 0;
    } else if (++idle >= steps.length) {
      // nothing can be cast on any key: wait a moment (cooldowns run out, windows open)
      t += 0.25;
      idle = 0;
    }
  }
  return events;
}

/** Casts per skill id in a simulated run. */
export function countCasts(events: RotationEvent[]): Map<number, number> {
  const m = new Map<number, number>();
  for (const e of events) m.set(e.id, (m.get(e.id) ?? 0) + 1);
  return m;
}

/** Default boss fight for previews: stagger once for 8 s after 40 s, a block / dodge every 12 s. */
export const BOSS_FIGHT = (duration: number): Pick<SimOptions, 'target' | 'stagger' | 'reactEvery'> => ({
  target: 'boss',
  stagger: duration > 40 ? [[40, 48]] : [[Math.max(0, duration - 10), duration - 2]],
  reactEvery: 12,
});
