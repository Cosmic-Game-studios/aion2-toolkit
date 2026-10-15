import type { ClassMechanics } from './types';

/**
 * Elementalist (Spiritmaster in the global client): what decides which skill a macro key fires. Read from the English and
 * German skill texts (public/data/{en,de}/skills.json) and the checked mechanics sheet of the class (2026-10-15).
 * Elements: "The Spiritmaster receives an element each time a Spirit uses its skill"; 4 of them give Four Elements, the only
 * state in which Elemental Fusion can be cast, and casting it removes the state. A summon counts once: the spirit uses its
 * skill as it appears (the German texts say so: "Nach Einsatz der Fähigkeit kämpft er mit Standardangriffen fort"). The
 * Ancient Spirit grants Four Elements outright. Neither language gives Elements or Four Elements a duration, so they last
 * until Fusion spends them. `consumes` only clears marks on the target, so Fusion ends its own states with dur-0 entries
 * (they expire the moment it is cast); Fusion clears the Elements too, which the texts imply but do not spell out.
 * "Cannot receive additional elements while in Four Elements status" cannot be written (gives have no condition): the
 * simulator keeps counting Elements in that state, which changes nothing, because Fusion clears both.
 * Dimensional Control is castable "briefly" after a spirit skill; no text gives the length, 3 s is an assumption. A cast
 * does not use the window up, so a key pressed twice inside it fires it twice; neither text says one cast per spirit skill.
 * Specialisation cooldown cuts ("-2s cooldown") are written as the skill shortening its own cooldown on every cast.
 * Not simulated, because they are not casts: the spirits' own skill procs (15% or 10% per landed spirit attack, 3 s spirit
 * skill cooldown), the Ancient Spirit's skill after 7 (5) basic attacks (more Four Elements in its 30 s) and Spirit
 * Revitalization's chance of -1 s on the summons (11% at passive level 1, 20% at 10, 50% at 40; passives have no part to
 * hang it on). So a simulated fight fires Fusion and Dimensional Control only after summons, far less often than the game.
 * Left out because no castable skill of the class needs them: Fear, Root, Stun, Seal, Knockdown, Slow, Taunt, Curse,
 * Corrode and the other damage over time. Jointstrike hits are not counted as spirit skills; neither language says so.
 */

/** Elements and Four Elements have no duration in either text: they stay until Elemental Fusion spends them */
const UNTIL_SPENT = 3600;
/** "triggered briefly" / "für kurze Zeit aktiviert": the length is in no text, assumed */
const DIMENSIONAL_WINDOW = 3;
/** Fire, Water, Wind, Earth and Ancient Spirit: each uses its skill as it is summoned */
const SPIRIT_SUMMONS = [16100000, 16110000, 16120000, 16130000, 16250000];

export const mechanics: ClassMechanics = [
  // Soul's Cry – Lv12 "-10s cooldown"
  { id: 16070000, resets: [{ id: 16070000, by: 10, part: 16070040 }] },
  // Summon: Fire Spirit – "rushes towards a target within 20m and uses a skill"; Fusion: "receives an element each time a Spirit uses its skill"
  { id: 16100000, gives: [{ s: 'Element', dur: UNTIL_SPENT, self: true, stacks: 1 }] },
  // Summon: Water Spirit – "The Water Spirit uses a skill that deals" (DE: "Nach Einsatz der Fähigkeit kämpft er mit Standardangriffen fort")
  { id: 16110000, gives: [{ s: 'Element', dur: UNTIL_SPENT, self: true, stacks: 1 }] },
  // Summon: Wind Spirit – "selects a target within 20m and uses a skill" (DE: "Nach Einsatz der Fähigkeit kämpft er mit Standardangriffen fort")
  { id: 16120000, gives: [{ s: 'Element', dur: UNTIL_SPENT, self: true, stacks: 1 }] },
  // Summon: Earth Spirit – "The Earth Spirit uses a skill that deals" (DE: "Nach Einsatz der Fähigkeit kämpft er mit Standardangriffen fort")
  { id: 16130000, gives: [{ s: 'Element', dur: UNTIL_SPENT, self: true, stacks: 1 }] },
  // Jointstrike: Curse – Lv12 "-2s cooldown"
  { id: 16140000, resets: [{ id: 16140000, by: 2, part: 16140040 }] },
  // Seize Magic – stigma Lv20 "-30s cooldown"
  { id: 16230000, resets: [{ id: 16230000, by: 30, part: 16230040 }] },
  // Jointstrike: Destructive Attack – stigma Lv5 "Changes to Charge Skill" (stigma options unlock by themselves); Lv20 "Reset [Jointstrike: Curse] and [Jointstrike: Corrode] cooldown"
  { id: 16240000, charged: true, resets: [{ id: 16140000, part: 16240040 }, { id: 16150000, part: 16240040 }] },
  // Summon: Ancient Spirit – "grants Four Elements status each time the Ancient Spirit uses its skill"
  { id: 16250000, gives: [{ s: 'Four Elements', dur: UNTIL_SPENT, self: true }] },
  // Elemental Fusion – "upon reaching 4 stacks", "can only be used when granted Four Elements", "will immediately remove Four Elements"; Lv16 "25% chance to regain Four Elements"
  {
    id: 16300000,
    use: [{ t: 'stacks', s: 'Element', n: 4, self: true }, { t: 'self', s: 'Four Elements' }],
    consumes: 'Four Elements',
    gives: [
      { s: 'Element', dur: 0, self: true },
      { s: 'Four Elements', dur: 0, self: true },
      { s: 'Four Elements', dur: UNTIL_SPENT, self: true, chance: 25, part: 16300050 }, // after the dur-0 entries, so it outlives them
    ],
  },
  // Dimensional Control – "triggered briefly each time a Spirit uses its skill"
  { id: 16330000, use: [{ t: 'after', ids: SPIRIT_SUMMONS, window: DIMENSIONAL_WINDOW }] },
  // Rapid Scattershot – "to a target afflicted with Stagger"; Lv16 "-1s all skill cooldowns on hit"
  { id: 16340000, use: [{ t: 'stagger' }], resets: [{ id: 'all', by: 1, part: 16340050 }] },
];
