/**
 * Skill mechanics the rotation simulator needs, per class: when a skill can be cast and what it leaves behind.
 * Hand-made from the English AND German skill texts (the English ones sometimes drop a condition).
 * Only what changes which skill a key fires is modelled – damage numbers come from the texts.
 */

/** One way to make a skill castable; `use` lists alternatives (any one is enough). */
export type MechCond =
  /** the target has one of these statuses / marks (Knockdown, Stun, Slow, Root, Frost, Fire Mark, …) */
  | { t: 'status'; s: string[] }
  /** the target is staggered (stagger gauge full) */
  | { t: 'stagger' }
  /** reactive: only right after the player blocked / parried / evaded / dodged (or while flying) */
  | { t: 'block' }
  | { t: 'parry' }
  | { t: 'evade' }
  | { t: 'dodge' }
  /** within `window` seconds after one of these skills */
  | { t: 'after'; ids: number[]; window: number }
  /** an own state is active (Four Elements, Precision, …) */
  | { t: 'self'; s: string }
  /** at least `n` stacks of `s` (on the target, or on yourself with self) */
  | { t: 'stacks'; s: string; n: number; self?: boolean }
  /** within `window` seconds after landing a critical hit */
  | { t: 'crit'; window: number }
  /** a chance to become usable anyway, e.g. "7% chance to trigger when attacking a target with Incapacitated Immunity" */
  | { t: 'chance'; p: number }
  /** only out of combat */
  | { t: 'ooc' };

/** What a cast leaves behind. */
export interface MechEffect {
  /** status / mark / state name, English as in the texts (Knockdown, Fire Mark, Precision, Four Elements, Insignia, …) */
  s: string;
  /** seconds */
  dur: number;
  /** on yourself instead of the target */
  self?: boolean;
  /** lands on bosses too (marks, debuffs, Slow) – crowd control (Stun, Knockdown, Airborne, Root, Fear, Frost) does not */
  boss?: boolean;
  /** chance on normal monsters in percent (default 100) */
  npc?: number;
  /** chance in percent on every target and for own states (procs such as "50% chance to trigger [Ankle Slice]") */
  chance?: number;
  /** adds this many stacks (stacking marks such as Insignia) */
  stacks?: number;
  /** only with this specialisation */
  part?: number;
}

export interface SkillMech {
  id: number;
  /** alternatives that make the skill castable; missing = always castable */
  use?: MechCond[];
  /** a specialisation that adds another way to cast it (or lifts the condition with `free`) */
  useVia?: { part: number; use?: MechCond[]; free?: boolean }[];
  gives?: MechEffect[];
  /** consumes all stacks of this mark when cast */
  consumes?: string;
  /** resets (or shortens by `by` seconds) another skill's cooldown – or every skill's with 'all' – maybe by chance */
  resets?: { id: number | 'all'; by?: number; chance?: number; part?: number }[];
  /** charged: the macro releases it at the first charge level; toggle: a second press switches it off */
  charged?: boolean;
  toggle?: boolean;
}

export type ClassMechanics = SkillMech[];
