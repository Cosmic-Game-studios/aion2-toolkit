import type { ClassMechanics } from './types';

/**
 * Sorcerer skill mechanics for the rotation simulator, hand-made on 2026-10-15 from the checked mechanics sheet and
 * the English AND German texts in public/data/{en,de}/skills.json (every level and every specialisation). No chance or
 * duration used below changes with the level (actives 1-40, stigmas 1-20), so they also hold at the levels players run
 * (Frost and Frost Burst 12, the other actives 16-20, stigmas 10-20).
 * Both languages state the same use conditions: Flame Scattershot "afflicted with Stagger" = "benommenen Ziel",
 * Blaze "afflicted with Fire Mark" = "mit Feuerzeichen", Frost Burst "afflicted with Frost" = "von Einfrieren
 * betroffen" (its 7% Incapacitated Immunity clause is in both). DE "Einfrieren" = Frost, "Trägheit" = Slow,
 * "Bann" = Root, "Siegel" = Seal, "Luftbann" = Airborne, "Betäubung" = Stun.
 * Fire Mark: the passive Fire Mark (15710000) has "a 20% chance to inflict Fire Mark for 5s on landing a Fire attack",
 * so every skill that deals Fire damage gives it with chance 20 (one roll per cast, even for Firestorm's fireballs).
 * The live tooltips (metabot, aion2vault) mark on every Fire hit and read Flame Arrow's level 12 option as
 * "+5% Fire Damage Boost"; our data says "20% chance" and "Inflicts Fire Mark for 5s on landing [Pyroclasm]", and that
 * is what is modelled here.
 * Chain steps are not separate casts in the simulator: an effect "on landing [Pyroclasm]" (3rd hit of Flame Arrow) or
 * "on landing [Cold Wave]" (2nd hit of Ice Chain) is spread over the presses of the key as an expected value.
 * NPC targets: the "100% chance ... on NPC targets" crowd control lands every time (no chance set); the lower chance
 * against players is not modelled. Crowd control (Frost, Root, Seal, Airborne, Stun) never lands on a boss.
 * Own "-Xs cooldown" specialisations are written as a reset of the skill itself by X seconds, because the simulator
 * takes the cooldown from the skill level only.
 * Left out: Curse: Tree (Polymorph breaks on any attack), Arctic Armor's Frost and Robe of Cold's Slow on attackers
 * (no "being hit" event), Hibernation and its auto trigger, Defiance, the self buffs (Wish of Concentration,
 * Element Enhancement, Steel Barrier's shield, the Winter's Shackles damage buff) and every passive besides Fire Mark:
 * none of them changes which skill a key fires.
 */
export const mechanics: ClassMechanics = [
  // Flame Scattershot: "Deals ... Fire damage to a target afflicted with Stagger" (DE "einem benommenen Ziel")
  {
    id: 15010000,
    use: [{ t: 'stagger' }],
    gives: [{ s: 'Fire Mark', dur: 5, boss: true, chance: 20 }], // passive Fire Mark: 20% on a Fire attack
    resets: [{ id: 'all', by: 1, part: 15010050 }], // "-1s all skill cooldowns on hit"
  },
  // Firestorm: "Deals ... Fire damage to a target within 20m" (Fire hit for the Fire Mark passive)
  {
    id: 15040000,
    gives: [{ s: 'Fire Mark', dur: 5, boss: true, chance: 20 }],
    resets: [{ id: 15060000, by: 2, part: 15040040 }], // "-2s [Hellfire] cooldown per fireball" (one fireball counted)
  },
  // Blaze: "Deals ... Fire damage to a target afflicted with Fire Mark" (DE "einem Ziel mit Feuerzeichen")
  {
    id: 15050000,
    use: [{ t: 'status', s: ['Fire Mark'] }],
    gives: [{ s: 'Fire Mark', dur: 5, boss: true, chance: 20 }],
    resets: [{ id: 15310000, by: 3, part: 15050050 }], // "-3s [Wish of Concentration] cooldown on hit"
  },
  // Hellfire: "Max 3 Charge Levels" (DE "Maximal 3 Ladestufen"); Fire hit for the Fire Mark passive
  {
    id: 15060000,
    charged: true,
    gives: [{ s: 'Fire Mark', dur: 5, boss: true, chance: 20 }],
    resets: [{ id: 15060000, by: 15, part: 15060050 }], // "-15s cooldown"
  },
  // Ice Chain: "inflicts Slow, reducing Move Speed by 40% for 5s"
  {
    id: 15090000,
    gives: [
      { s: 'Slow', dur: 5, boss: true },
      // "5% chance to inflict Frost for 2s on landing [Cold Wave]" – Cold Wave is the 2nd chain hit, so 5% on every other press
      { s: 'Frost', dur: 2, chance: 2.5, part: 15090050 },
    ],
    resets: [{ id: 15110000, by: 1, part: 15090040 }], // "-1s [Winter's Shackles] cooldown on hit"
  },
  // Winter's Shackles: "Inflicts Slow for 3s."
  {
    id: 15110000,
    gives: [
      { s: 'Slow', dur: 3, boss: true },
      { s: 'Frost', dur: 3, chance: 30, part: 15110020 }, // "30% chance to inflict Frost for 3s on landing [Winter's Shackles]"
    ],
    resets: [{ id: 15110000, by: 15, part: 15110050 }], // "-15s [Winter's Shackles] cooldown"
  },
  // Glacial Smite: "50% chance to inflict Frost for 3s" (stigma level 15)
  {
    id: 15120000,
    gives: [{ s: 'Frost', dur: 3, chance: 50, part: 15120030 }],
    resets: [{ id: 15120000, by: 30, part: 15120020 }], // "-30s cooldown"
  },
  // Soul Freeze: "75% chance to inflict Seal for 5s. 100% chance to inflict Seal on NPC targets."
  {
    id: 15130000,
    gives: [
      { s: 'Seal', dur: 5 },
      { s: 'Seal', dur: 7, part: 15130030 }, // "+2s Seal duration"
      { s: 'Root', dur: 5, chance: 50, part: 15130010 }, // "50% chance to inflict Root for 5s"
    ],
  },
  // Frost: "50% chance to inflict Frost on the target for 3s. 100% chance to inflict Frost on NPC targets."
  {
    id: 15150000,
    gives: [
      { s: 'Frost', dur: 3 },
      { s: 'Frost', dur: 4, part: 15150050 }, // "+1s Frost duration"
    ],
    resets: [
      { id: 15220000, part: 15150030 }, // "Reset [Frost Burst] cooldown on landing Frost"
      { id: 15150000, by: 5, part: 15150020 }, // "-5s cooldown"
    ],
  },
  // Steel Barrier: "-15s cooldown" (stigma level 20)
  {
    id: 15160000,
    resets: [{ id: 15160000, by: 15, part: 15160040 }],
  },
  // Cold Storm: "30% chance to inflict Root for 2s" (stigma level 10); its Slow has no stated duration, so it is left out
  {
    id: 15200000,
    gives: [{ s: 'Root', dur: 2, chance: 30, part: 15200020 }],
  },
  // Flame Arrow: "Deals ... Fire damage to a target within 20m" – chain Flame Arrow > Burst > Pyroclasm, all Fire hits
  {
    id: 15210000,
    gives: [
      { s: 'Fire Mark', dur: 5, boss: true, chance: 20 },
      // "Inflicts Fire Mark for 5s on landing [Pyroclasm]" – Pyroclasm is the 3rd chain hit, so every third press; it shares
      // the simulator's expected-value roll with the 20% above (same skill and mark), about 0.53 marks per press in all
      { s: 'Fire Mark', dur: 5, boss: true, chance: 33.4, part: 15210040 },
    ],
    resets: [{ id: 15050000, chance: 33.4, part: 15210050 }], // "Reset [Blaze] cooldown on landing [Pyroclasm]" – every third press
  },
  // Frost Burst: "a target afflicted with Frost" (DE "von Einfrieren betroffenes Ziel"); "7% chance to trigger on attacking a target with Incapacitated Immunity"
  {
    id: 15220000,
    use: [{ t: 'status', s: ['Frost'] }, { t: 'chance', p: 7 }],
    resets: [{ id: 15220000, chance: 50, part: 15220050 }], // "50% chance to reset cooldown"
  },
  // Bittercold Wind: "60% chance to inflict Root for 3s. 100% chance to inflict Root on NPC targets."
  {
    id: 15280000,
    gives: [{ s: 'Root', dur: 3 }],
    resets: [{ id: 15150000, by: 1, part: 15280050 }], // "-1s [Frost] cooldown on hit"
  },
  // Lumiel's Space: "75% chance to inflict Airborne for 3s. 100% chance to inflict Airborne on NPC targets."
  {
    id: 15300000,
    gives: [{ s: 'Airborne', dur: 3 }],
    resets: [{ id: 15300000, by: 30, part: 15300040 }], // "-30s [Lumiel's Space] cooldown"
  },
  // Wish of Concentration: "-10s all skill cooldowns" (level 16 specialisation)
  {
    id: 15310000,
    resets: [{ id: 'all', by: 10, part: 15310050 }],
  },
  // Delayed Explosion: "Deals ... Fire damage to a target within 20m after 4s" (Fire hit for the Fire Mark passive)
  {
    id: 15320000,
    gives: [{ s: 'Fire Mark', dur: 5, boss: true, chance: 20 }],
    resets: [{ id: 15320000, by: 10, part: 15320020 }], // "-10s [Delayed Explosion] cooldown"
  },
  // Divine Burst: "Deals ... Fire damage to a target within 20m" (Fire hit for the Fire Mark passive)
  {
    id: 15360000,
    gives: [
      { s: 'Fire Mark', dur: 5, boss: true, chance: 20 },
      // "Inflict Stun for 3s after Knock Back" (stigma level 20) after "75% chance to inflict Knock Back" (level 15)
      { s: 'Stun', dur: 3, chance: 75, part: 15360040 },
    ],
  },
  // Fire Wall: "Deals ... Fire damage and inflicts Embers" (Fire hit for the Fire Mark passive)
  {
    id: 15390000,
    gives: [{ s: 'Fire Mark', dur: 5, boss: true, chance: 20 }],
  },
  // Assault Bombardment: "30% chance to inflict Frost for 3s. 100% chance to land Frost on NPC targets."
  {
    id: 15700000,
    gives: [{ s: 'Frost', dur: 3 }],
  },
];
