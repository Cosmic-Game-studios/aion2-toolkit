import type { ClassMechanics } from './types';

/**
 * Ranger (KR: 궁성) skill mechanics for the rotation simulator, checked by hand against the English and German skill
 * texts of the global client (all 35 skills). Only what changes which skill a macro key fires is modelled: Burst Arrow
 * needs Slow or Root on the target, Arrow Scattershot a Staggered target (the broken Stagger Gauge, DE "benommen",
 * not a Stun), Drill Dart a Critical Hit, and Stealth works out of combat only until its level 15 option. Where EN and
 * DE differ the stricter text was taken: Drill Dart (DE "Bei einem Kritischen Treffer:" in front of the whole effect,
 * EN ties only the MP to the crit; the Korean tooltip agrees with DE). No text says how long Drill Dart stays usable
 * after a crit; 3 s is the simulator's own crit window, and the guaranteed crits (Marking Shot Lv16, Explosive Arrow
 * Lv15, the attack out of Stealth Lv5) give the own state "Critical Hit" for the same 3 s. Slow and damage over time
 * land on bosses, Root (crowd control) does not. Flat cooldown cuts of specialisations ("-10s cooldown") are written as
 * a cut of the skill's own cooldown on every cast, because the simulator takes cooldowns without specialisations.
 * Precision, Bleed and Crimson Flames are kept because the curated combos name them; crowd control and self buffs that
 * no Ranger skill reads (Stun, Airborne, Blind, Seal, Knock Back, Gale, Vaizel's Authority, Bow of Blessing, Tenacity)
 * are left out. Suppressing Arrow's Stun needs Precision on the caster and Vaizel's Authority Lv20 cuts cooldowns on
 * later crits; neither can be written with these types. Also left out: whether the always-critical orb shots of
 * Supporting Fire Lv20 count as the caster's Critical Hit for Drill Dart (not stated), Drill Dart Lv16's extra activation,
 * the consecutive uses, and Defiance's exemption from cooldown reduction (the 'all' cut of Arrow Scattershot Lv16 would
 * still shorten it; Defiance is never in a macro).
 */
export const mechanics: ClassMechanics = [
  // Deadshot – "Max 3 Charge Levels" (DE "Maximal 3 Ladestufen"); its +35% under Precision is damage only
  { id: 14010000, charged: true },
  // Snipe – part 14020040 "-1s [Deadshot] cooldown on hit" (one hit per press; the chain hits Rapid Fire, Spiral Arrow and the Lv16 Tempest Arrow are not counted)
  { id: 14020000, resets: [{ id: 14010000, by: 1, part: 14020040 }] },
  // Drill Dart – EN "restores 100 MP on landing a Critical Hit", DE "Bei einem Kritischen Treffer:" before the whole skill (stricter DE taken); "Inflicts Bleed on targets" "for 6s", part 14050020 "+2s Bleed duration"
  {
    id: 14050000,
    use: [{ t: 'crit', window: 3 }, { t: 'self', s: 'Critical Hit' }],
    gives: [
      { s: 'Bleed', dur: 6, boss: true },
      { s: 'Bleed', dur: 8, boss: true, part: 14050020 },
    ],
  },
  // Griffon Arrow – "Inflicts Crimson Flames for 10s" (Fire Damage over Time), part 14060020 "+5s Damage over Time duration"
  {
    id: 14060000,
    gives: [
      { s: 'Crimson Flames', dur: 10, boss: true },
      { s: 'Crimson Flames', dur: 15, boss: true, part: 14060020 },
    ],
  },
  // Suppressing Arrow – part 14070050 "25% chance to reset cooldown on hit" (its Stun "while Precision is active" cannot be written as a gives)
  { id: 14070000, resets: [{ id: 14070000, chance: 25, part: 14070050 }] },
  // Burst Arrow – "Selects a target afflicted with Slow or Root" (DE "Ziel mit Trägheit oder Bann"), part 14080050 "25% chance to reset cooldown on hit"
  {
    id: 14080000,
    use: [{ t: 'status', s: ['Slow', 'Root'] }],
    resets: [{ id: 14080000, chance: 25, part: 14080050 }],
  },
  // Marking Shot – "grants Precision for 10s", part 14090030 "+5s duration", part 14090050 "lands as a Critical Hit" (opens Drill Dart)
  {
    id: 14090000,
    gives: [
      { s: 'Precision', dur: 10, self: true },
      { s: 'Precision', dur: 15, self: true, part: 14090030 },
      { s: 'Critical Hit', dur: 3, self: true, part: 14090050 },
    ],
  },
  // Gale Arrow – part 14110050 "-10s cooldown"
  { id: 14110000, resets: [{ id: 14110000, by: 10, part: 14110050 }] },
  // Snare Shot – "Inflicts Slow, reducing Move Speed by -40% for 5s", part 14130050 "+2s Slow and Root duration"
  {
    id: 14130000,
    gives: [
      { s: 'Slow', dur: 5, boss: true },
      { s: 'Slow', dur: 7, boss: true, part: 14130050 },
    ],
  },
  // Illusory Arrow – part 14150030 "Inflicts Slow for 5s on hit"
  { id: 14150000, gives: [{ s: 'Slow', dur: 5, boss: true, part: 14150030 }] },
  // Sealing Arrow – part 14160010 "50% chance to inflict Root for 5s on hit" (Root is crowd control: not on bosses)
  { id: 14160000, gives: [{ s: 'Root', dur: 5, chance: 50, part: 14160010 }] },
  // Ensnaring Trap – part 14180040 "-30s cooldown"
  { id: 14180000, resets: [{ id: 14180000, by: 30, part: 14180040 }] },
  // Stealth – "Cannot be used in combat" until part 14190030 "Available in combat"; part 14190010 "Critical Hit on attack during Stealth" (crit window given at the cast)
  {
    id: 14190000,
    use: [{ t: 'ooc' }],
    useVia: [{ part: 14190030, free: true }],
    gives: [{ s: 'Critical Hit', dur: 3, self: true, part: 14190010 }],
  },
  // Arrow Storm – part 14270020 "Inflicts Slow for 10s on hit"
  { id: 14270000, gives: [{ s: 'Slow', dur: 10, boss: true, part: 14270020 }] },
  // Arrow Scattershot – "to a target afflicted with Stagger" (DE "einem benommenen Ziel": broken Stagger Gauge), part 14330050 "-1s all cooldowns on hit"
  {
    id: 14330000,
    use: [{ t: 'stagger' }],
    resets: [{ id: 'all', by: 1, part: 14330050 }],
  },
  // Explosive Arrow – part 14360010 "-15s cooldown", part 14360030 "Critical Hit on hit" (opens Drill Dart)
  {
    id: 14360000,
    gives: [{ s: 'Critical Hit', dur: 3, self: true, part: 14360030 }],
    resets: [{ id: 14360000, by: 15, part: 14360010 }],
  },
  // Supporting Fire – part 14380030 "-30s cooldown"
  { id: 14380000, resets: [{ id: 14380000, by: 30, part: 14380030 }] },
];
