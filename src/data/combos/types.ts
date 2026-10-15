/**
 * Hand-checked skill combinations per class. Every combo is backed by verbatim quotes from the skill texts
 * (English and German data, see `evidence`) and, where possible, by what top players actually run (`usage`, `sources`).
 * `npm run check:curated` verifies ids, specialisation ids and every quote against public/data/{en,de}/skills.json.
 */
export interface Txt { de: string; en: string }

/**
 * enable   – the setup makes the payoff usable at all ("usable only on …", "only after …", "is enabled for 10 s")
 * status   – the setup inflicts a status the payoff deals more damage to, or extends
 * stack    – the setup builds stacks / marks the payoff consumes (Insignia, Fire Mark, Four Elements …)
 * cooldown – the setup resets or shortens the payoff's cooldown
 * proc     – the setup triggers the payoff automatically or by chance
 * buff     – a self buff whose effect is tied to particular skills (not just "more damage for everything")
 * debuff   – a target debuff that the payoff profits from in particular
 */
export type ComboKind = 'enable' | 'status' | 'stack' | 'cooldown' | 'proc' | 'buff' | 'debuff';

/** a skill in a combo; `part` = the specialisation (part id) it needs, if any */
export interface ComboSkill { id: number; part?: number }

/** verbatim text from the data: the skill's description at any level, one of its specialisations (`part`) or chain skills (`chain`) */
export interface ComboEvidence { id: number; part?: number; chain?: string; en: string; de: string }

export interface CuratedCombo {
  /** unique within the class, kebab-case */
  id: string;
  kind: ComboKind;
  /** core: the class plays around it; strong: worth setting up; situational: only in some content or with a spec */
  rating: 'core' | 'strong' | 'situational';
  content: ('boss' | 'aoe' | 'pvp')[];
  /** any of these creates the condition */
  setup: ComboSkill[];
  /** these use it */
  payoff: ComboSkill[];
  /** seconds the payoff stays usable / boosted after the setup */
  window?: number;
  /** English status / mark name, e.g. 'Knockdown', 'Fire Mark' */
  status?: string;
  title: Txt;
  /** why it works – the mechanic in 1–3 sentences */
  text: Txt;
  /** how to play it: which key stack, order in the macro, timing */
  how: Txt;
  /** suggested chain on one key, priority (bottom) first */
  stack?: number[];
  /** what players run, e.g. "56 % of public Gladiator macros" */
  usage?: Txt;
  evidence: ComboEvidence[];
  sources?: { label: string; href: string }[];
}
