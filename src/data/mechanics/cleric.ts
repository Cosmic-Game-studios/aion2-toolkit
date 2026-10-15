import type { ClassMechanics } from './types';

/**
 * Cleric skill mechanics for the rotation simulator, read from the English and German skill texts of the Global
 * client (public/data/{en,de}/skills.json, every level and specialisation; durations and chances are the same at every
 * level) and the checked mechanics sheet of 2026-10-15. Both languages agree on every use condition: Condemnation
 * needs Chain of Torment on the target ("das von [Kette des Schmerzes] betroffen ist"), Lightning Strike Scattershot
 * a staggered target ("einem benommenen Ziel"). Readings settled here:
 * - Chain of Torment stays 10s with its "+3s Damage over Time" option: the German text gives the debuff itself
 *   "für 10s" and the option names only the damage over time, so the stricter 10s is what Condemnation checks.
 * - Condemnation's level 12 option resets it on a critical hit; with Earth Punishment's stigma option (17400010)
 *   every hit on an Earth Punishment target is one. A reset cannot depend on a target status here, so it fires at
 *   the simulator's own crit rate (40%, CRIT_RATE in lib/rotation.ts), not at 100% while Earth Punishment is up.
 * - Discharge (chain skill of Thunder and Lightning, itself the chain skill of Earth's Retribution) has no id of its
 *   own, so its Bolt cooldown cut sits on Earth's Retribution at Discharge's 30% chain rate (chain data).
 * - Light of Protection has no duration in either language and a 5s cooldown, like the Chanter's Undefeated Mantra
 *   it does not stack with: an on/off aura.
 * - Specialisations that shorten a skill's own cooldown ("-10s cooldown") are written as the skill shortening its
 *   own cooldown on every cast, because the simulator takes the level cooldown without specialisations.
 * Crowd control (Stun, Knockdown, Root) does not land on bosses; marks, damage over time and Slow do. Own buffs
 * (Tenacity, Salvation, Benevolence, Earth's Blessing, Prayer of Amplification, …) are left out: no Cleric skill
 * depends on them. Damage numbers stay in the texts.
 */
export const mechanics: ClassMechanics = [
  // Earth's Retribution: "-7s [Bolt] cooldown on landing [Discharge]" (Discharge: chain rate 30, +20 with 17010020)
  { id: 17010000, resets: [{ id: 17060000, by: 7, chance: 30, part: 17010040 }] },
  // Judgment Thunder: "10% chance to inflict Root for 2s on landing [Divine Punishment]" (its chain skill)
  { id: 17040000, gives: [{ s: 'Root', dur: 2, chance: 10, part: 17040040 }] },
  // Bolt: "Max 3 Charge Levels"; "30% chance to inflict Stun for 3s when fully charged" (by hand; DE "Bei voller Aufladung")
  { id: 17060000, charged: true, gives: [{ s: 'Stun', dur: 3, chance: 30, part: 17060010 }] },
  // Chain of Torment: "Damage over Time every 1s for 10s" (DE "für 10s"); "Slows target for 5s"; "20% chance to inflict Knockdown on the target for 3s"
  {
    id: 17070000,
    gives: [
      { s: 'Chain of Torment', dur: 10, boss: true },
      { s: 'Slow', dur: 5, boss: true, part: 17070010 },
      { s: 'Knockdown', dur: 3, chance: 20, part: 17070030 },
    ],
  },
  // Debilitating Mark: "Damage over Time every 1s for 10s"; "20% chance to inflict Stun on the target for 3s"
  {
    id: 17080000,
    gives: [
      { s: 'Debilitating Mark', dur: 10, boss: true },
      { s: 'Stun', dur: 3, chance: 20, part: 17080030 },
    ],
  },
  // Healing Light: "-2s cooldown" (DE "Abklingzeit −2 Sek.")
  { id: 17100000, resets: [{ id: 17100000, by: 2, part: 17100050 }] },
  // Radiant Recovery: "-3s cooldown" (DE "Abklingzeit −3 Sek.")
  { id: 17120000, resets: [{ id: 17120000, by: 3, part: 17120030 }] },
  // Divine Aura: "-10s cooldown" (DE "Abklingzeit −10 Sek.")
  { id: 17150000, resets: [{ id: 17150000, by: 10, part: 17150050 }] },
  // Root: "75% chance to inflict Root for 10s. 100% chance to inflict Root on NPC targets."; "+2s Root duration"
  {
    id: 17190000,
    gives: [
      { s: 'Root', dur: 10 },
      { s: 'Root', dur: 12, part: 17190020 },
    ],
  },
  // Power Burst: "75% chance to inflict Stun for 3s"
  { id: 17280000, gives: [{ s: 'Stun', dur: 3, chance: 75, part: 17280040 }] },
  // Absolution: "-30s cooldown" (DE "Abklingzeit −30 Sek.")
  { id: 17290000, resets: [{ id: 17290000, by: 30, part: 17290010 }] },
  // Voice of Doom: "reduces enemy Incoming Heal and HP Potion Recovery by 60% for 20s"
  { id: 17300000, gives: [{ s: 'Voice of Doom', dur: 20, boss: true }] },
  // Condemnation: "a target within 20m afflicted with Chain of Torment"; "20% chance to inflict Root for 3s"; "Resets cooldown on landing a Critical Hit with [Condemnation]"
  {
    id: 17350000,
    use: [{ t: 'status', s: ['Chain of Torment'] }],
    gives: [{ s: 'Root', dur: 3, chance: 20, part: 17350030 }],
    resets: [{ id: 17350000, chance: 40, part: 17350040 }],
  },
  // Lightning Strike Scattershot: "a target afflicted with Stagger" (DE "einem benommenen Ziel"); "-1s all skill cooldowns on hit"
  { id: 17370000, use: [{ t: 'stagger' }], resets: [{ id: 'all', by: 1, part: 17370050 }] },
  // Earth Punishment: "damage every 1s for 10s"; "+10s [Earth Punishment] and [Earth's Blessing] duration"
  {
    id: 17400000,
    gives: [
      { s: 'Earth Punishment', dur: 10, boss: true },
      { s: 'Earth Punishment', dur: 20, boss: true, part: 17400040 },
    ],
  },
  // Light of Protection: "for the caster and nearby party members" – no duration in EN or DE, 5s cooldown, does not stack with the toggle "[Undefeated Mantra]": on/off aura
  { id: 17410000, toggle: true },
];
