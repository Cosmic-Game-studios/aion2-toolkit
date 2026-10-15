import type { ClassMechanics } from './types';

/**
 * Templar skill mechanics for the rotation simulator, checked by hand against the Global client texts in both languages
 * (public/data/en|de/skills.json; actives at skill level 10, stigmas at stigma level 10 – the conditions, durations and
 * chances below read the same at every level). Only what changes which skill a macro key fires is here: the shield-skill
 * window of Judgment, the Block of Debilitating Smash, the Stun / Knockdown of Annihilate, the Stagger of Flash Rampage,
 * the Dodge of Shield Rush and the cooldown links between skills.
 * Where English and German disagree, the stricter German reading is used and named in the comment: Judgment only works
 * when a shield skill is cast ("beim Wirken einer Schildfähigkeit"), Debilitating Smash only after a successful Block
 * ("bei erfolgreichem Block"). German "K. o." (Doom Shield) is the same status as "Niederschlag" / Knockdown.
 * Stun and Knockdown land on every NPC without Incapacitated Immunity ("100% chance … on NPC targets") and never on
 * bosses, so they carry no `boss` flag; the lower chances in the texts are for players, whom the simulator does not
 * fight. Left out on purpose (nothing reads them): Root (Poach, Grapple), Debilitate, Shrink, Taunt, Exposed, the
 * Defense cut of Executing Blade, and own buffs such as Executor, Warding, Second Skin or Noble Armor.
 * Specialisations that shorten or remove a skill's own cooldown ("-2s cooldown", "Remove cooldown") are written as
 * resets of the skill itself, as in the other classes: the simulator takes cooldowns from the skill level only.
 * Chain steps are not separate casts here: Pummel's cut on "landing [Punishing Strike]" (its 2nd chain step) counts on
 * every other press. Shield Smite's "trigger [Debilitating Smash]" states no window; it lasts 5 s like the triggers
 * of the other classes. Not expressible: resets on a kill (Poach, Doom Shield) or on a Block (Debilitating Smash),
 * Stagger Gauge Damage, Pummel's second Punishing Strike (needs two specialisations at once), Shield of Protection's
 * second use, and Shield Rush turning into a charge skill only with its specialisation 12430030.
 */
export const mechanics: ClassMechanics = [
  // Vicious Strike – spec Lv12: "-2s [Warding Strike] cooldown on hit"
  { id: 12010000, resets: [{ id: 12350000, by: 2, part: 12010040 }] },
  // Pummel – spec Lv12: "-1s [Punishment] cooldown on landing [Punishing Strike]" (its 2nd chain step: every other press)
  { id: 12040000, resets: [{ id: 12090000, by: 1, chance: 50, part: 12040040 }] },
  // Doom Shield – "Has a 75% chance to inflict Knockdown for 3s" + "100% chance to inflict Knockdown on NPC targets" (DE "K. o." = Niederschlag)
  {
    id: 12070000,
    gives: [{ s: 'Knockdown', dur: 3 }],
    resets: [{ id: 12300000, part: 12070010 }], // stigma Lv5: "Resets [Annihilate] cooldown on hit"
  },
  // Punishment – "Max 3 Charge Levels"
  { id: 12090000, charged: true },
  // Shield Smite – "Has a 60% chance to inflict Stun on the target for 3s" + "100% chance to inflict Stun on NPC targets"
  {
    id: 12100000,
    gives: [
      { s: 'Stun', dur: 3 },
      { s: 'Stun', dur: 4, part: 12100010 }, // spec Lv8: "+1s Stun duration"
      // spec Lv8: "50% chance to trigger [Debilitating Smash] on hit" – window not stated in either language: 5 s
      { s: 'Debilitating Smash', dur: 5, self: true, chance: 50, part: 12100030 },
    ],
    resets: [{ id: 12100000, by: 2, part: 12100040 }], // spec Lv12: "-2s cooldown"
  },
  // Taunt – stigma Lv15: "-5s cooldown"
  { id: 12120000, resets: [{ id: 12120000, by: 5, part: 12120030 }] },
  // Poach – spec Lv16: "50% chance to Stun for 3s" (no NPC guarantee, so 50% on monsters too)
  { id: 12130000, gives: [{ s: 'Stun', dur: 3, chance: 50, part: 12130050 }] },
  // Grapple – stigma Lv5: "50% chance to inflict Stun for 3s on hit"
  {
    id: 12220000,
    gives: [{ s: 'Stun', dur: 3, chance: 50, part: 12220010 }],
    resets: [{ id: 12220000, by: 30, part: 12220030 }], // stigma Lv15: "-30s cooldown"
  },
  // Judgment – DE "Fügt beim Wirken einer Schildfähigkeit …" (EN drops it): only in the window "Triggers [Judgment] for 2s" / "for 3s" opens
  {
    id: 12240000,
    use: [
      { t: 'after', ids: [12100000, 12350000, 12430000], window: 2 }, // Shield Smite, Warding Strike, Shield Rush: "Triggers [Judgment] for 2s."
      { t: 'after', ids: [12070000], window: 3 }, // Doom Shield: "Triggers [Judgment] for 3s."
    ],
    resets: [{ id: 12240000, part: 12240050 }], // spec Lv16: "Remove cooldown"
  },
  // Debilitating Smash – DE "Fügt bei erfolgreichem Block …" (EN ties only Debilitate to it: "inflicts Debilitate for 5s on Block")
  {
    id: 12270000,
    use: [
      { t: 'block' },
      { t: 'after', ids: [12110000], window: 3 }, // Shield of Protection: "guarantees Block" (when hit; duration only "Temporarily")
      { t: 'self', s: 'Debilitating Smash' }, // triggered by Shield Smite spec 12100030
    ],
    gives: [{ s: 'Stun', dur: 3, chance: 30, part: 12270010 }], // spec Lv8: "30% chance to inflict Stun for 3s"
  },
  // Annihilate – "to a target afflicted with Stun or Knockdown" / "Has a 5% chance to trigger when attacking a target with Incapacitated Immunity"
  {
    id: 12300000,
    use: [{ t: 'status', s: ['Stun', 'Knockdown'] }, { t: 'chance', p: 5 }],
    gives: [{ s: 'Knockdown', dur: 3 }], // "30% chance to inflict Knockdown for 3s" + "100% chance to inflict Knockdown on NPC targets"
    resets: [{ id: 12300000, by: 10, part: 12300040 }], // spec Lv12: "-10s cooldown"
  },
  // Empyrean Lord's Punishment – "Has a 50% chance to inflict Stun for 3s" + "100% chance to inflict Stun on NPC targets"
  { id: 12310000, gives: [{ s: 'Stun', dur: 3 }] },
  // Flash Rampage – "to a target afflicted with Stagger" (DE "einem benommenen Ziel")
  {
    id: 12340000,
    use: [{ t: 'stagger' }],
    resets: [{ id: 'all', by: 1, part: 12340050 }], // spec Lv16: "-1s all cooldowns on hit"
  },
  // Warding Strike – spec Lv8: "-5s cooldown"
  { id: 12350000, resets: [{ id: 12350000, by: 5, part: 12350010 }] },
  // Executing Blade – stigma Lv5: "-15s cooldown"
  { id: 12410000, resets: [{ id: 12410000, by: 15, part: 12410010 }] },
  // Shield Rush – "after using [Dodge] or while flying" (DE "bei Einsatz von [Notausweichen] oder im Flug")
  {
    id: 12430000,
    use: [{ t: 'dodge' }],
    gives: [{ s: 'Stun', dur: 3 }], // "Has a 30% chance to inflict Stun for 3s" + "100% chance to inflict Stun on NPC targets"
    resets: [{ id: 12430000, by: 10, part: 12430040 }], // spec Lv12: "-10s cooldown"
  },
  // Battlefield Banner – stigma Lv20: "-30s cooldown"
  { id: 12450000, resets: [{ id: 12450000, by: 30, part: 12450040 }] },
  // Assault Fury – "with a 30% chance to inflict Stun for 3s" + "100% chance to inflict Stun on NPC targets"
  { id: 12700000, gives: [{ s: 'Stun', dur: 3 }] },
];
