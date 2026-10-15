import type { ClassMechanics } from './types';

/**
 * Chanter skill mechanics for the rotation simulator, written 2026-10-15 from the checked mechanics sheet and the Global
 * client texts in both languages (public/data/en|de/skills.json; actives at skill level 10, stigmas at stigma level 10;
 * the windows, durations and chances below are the same at every level). Only what changes which skill a macro key
 * fires is here; damage, heals and plain buffs stay in the texts.
 * The core loop: Dark Crush has no condition in its own text, it is unlocked by its openers ("[Dark Crush] becomes
 * available for 2s / 3s on skill use" on Impactful Crush, Spinning Strike, Marchutan's Wrath and Ensnaring Mark – on
 * cast, not on hit). Spinning Strike's German sentence says "Bei Einsatz einer Fähigkeit" (when a skill is used); read
 * like the same sentence on the other three openers, as aion2vault and Fextralife do.
 * Stricter German readings: Heat Wave Blow needs a Block for the whole skill ("Fügt bei erfolgreichem Block ... zu"; the
 * English text ties the Block to the Seal only), Tremor Crush only moves and hits after a Dodge or in flight ("Bewegt
 * sich bei Einsatz von [Notausweichen] oder im Flug"; the English text puts the condition after the Stun). Both are
 * confirmed by the Korean Inven skill list. Flight is not simulated, so Tremor Crush waits for a dodge.
 * Rushing Smash's "trigger [Heat Wave Blow]" (DE "Aktivierung") unlocks Heat Wave Blow, it does not cast it; neither
 * text says for how long, so the own state lasts 5s like the simulator's other chance triggers.
 * Specialisations that shorten or remove a skill's own cooldown ("-5s cooldown", "Removes [Dark Crush] cooldown") are
 * written as resets of the skill itself: the simulator takes cooldowns from the skill level only.
 * Statuses: Stun (Wave Blow needs it) and Knockdown (the Impact-type bonus of Fracturing Blow, Dark Crush 18100020 and
 * Raging Spell; nothing needs it to cast). Both are crowd control and do not land on bosses (Incapacitated Immunity);
 * the "100% chance ... on NPC targets" clauses are the npc default, the lower player chances only matter in PvP.
 * The specialisation stuns that name no NPC chance (Heat Wave Blow 18150010, Marchutan's Wrath 18330020 / 18330040)
 * are written as `chance` (every target), as in the other class files. Wave Blow's 7% route ("on attacking a target
 * with Incapacitated Immunity") is rolled on every cast against any target – the simulator cannot limit it to immune
 * targets, so against normal monsters Wave Blow also fires without a Stun now and then.
 * Left out on purpose: Seal, Root, Exposed, Max Stamina and the Defense, Accuracy, Damage Boost, Impact-type Resist and
 * healing debuffs (nothing in the kit pays them off), Spinning Strike's Critical Damage stacks and Protection Circle
 * stacks (no skill waits for them), Obliterate's Knockdown (no duration in either text), Focused Defense's guaranteed
 * Block (the simulator's Block comes from the player), Power of the Storm's -20% cooldowns for 14.5s, Rushing Smash's
 * reset on a kill and charge option, and Heat Wave Blow's 25% reset on Block (resets only happen on cast here).
 */
export const mechanics: ClassMechanics = [
  // Onslaught: 18010040 "-1s [Spinning Strike] cooldown on hit"
  { id: 18010000, resets: [{ id: 18290000, by: 1, part: 18010040 }] },
  // Impactful Crush: "inflict Stun for 3s. 100% chance to inflict Stun on NPC targets"; 18060020 "+1s [Impactful Crush] Stun duration"
  {
    id: 18060000,
    gives: [
      { s: 'Stun', dur: 3 },
      { s: 'Stun', dur: 4, part: 18060020 },
    ],
  },
  // Wave Blow: "to a target afflicted with Stun within 4m and inflicts Knockdown for 3s. Has a 7% chance to trigger on attacking a target with Incapacitated Immunity"; 18080030 "+1s Knockdown duration"; 18080050 "-5s cooldown"
  {
    id: 18080000,
    use: [{ t: 'status', s: ['Stun'] }, { t: 'chance', p: 7 }],
    gives: [
      { s: 'Knockdown', dur: 3 },
      { s: 'Knockdown', dur: 4, part: 18080030 },
    ],
    resets: [{ id: 18080000, by: 5, part: 18080050 }],
  },
  // Rushing Smash: 18090030 "50% chance to trigger [Heat Wave Blow] on hit" (DE "[Hitzewellenschlag]-Aktivierung (50 % Chance)"; duration not stated, 5s assumed)
  { id: 18090000, gives: [{ s: 'Heat Wave Blow Trigger', dur: 5, self: true, chance: 50, part: 18090030 }] },
  // Dark Crush: "[Dark Crush] becomes available for 2s on skill use" (Impactful Crush, Spinning Strike) / "for 3s" (Marchutan's Wrath, Ensnaring Mark); 18100050 "Removes [Dark Crush] cooldown"
  {
    id: 18100000,
    use: [
      { t: 'after', ids: [18060000, 18290000], window: 2 },
      { t: 'after', ids: [18330000, 18230000], window: 3 },
    ],
    resets: [{ id: 18100000, part: 18100050 }],
  },
  // Recuperation: 18120050 "-3s cooldown"
  { id: 18120000, resets: [{ id: 18120000, by: 3, part: 18120050 }] },
  // Fracturing Blow: 18130010 "-15s cooldown"
  { id: 18130000, resets: [{ id: 18130000, by: 15, part: 18130010 }] },
  // Heat Wave Blow: EN "inflict Seal for 3s on Block", DE stricter "Fügt bei erfolgreichem Block bis zu 4 Gegnern ... zu" (whole skill); 18150010 "40% chance to inflict Stun for 3s" (no NPC clause: 40% on every target)
  {
    id: 18150000,
    use: [{ t: 'block' }, { t: 'self', s: 'Heat Wave Blow Trigger' }],
    gives: [{ s: 'Stun', dur: 3, chance: 40, part: 18150010 }],
  },
  // Sprint Mantra: "Increases Move Speed by 15%" with no duration on a 5s cooldown – an on/off mantra (toggle per the KR list)
  { id: 18160000, toggle: true },
  // Undefeated Mantra: "Increases PvE Damage Boost and PvE Damage Tolerance by 15%" with no duration on a 5s cooldown – an on/off mantra
  { id: 18190000, toggle: true },
  // Tremor Crush: EN "inflict Stun for 3s after using [Dodge] or while flying", DE stricter "Bewegt sich bei Einsatz von [Notausweichen] oder im Flug" (move and hit); "100% chance to inflict Stun on NPC targets"
  { id: 18210000, use: [{ t: 'dodge' }], gives: [{ s: 'Stun', dur: 3 }] },
  // Power of the Storm: 18250010 "-30s cooldown"
  { id: 18250000, resets: [{ id: 18250000, by: 30, part: 18250010 }] },
  // Spinning Strike: 18290010 "-5s cooldown" (its 2s Dark Crush window is on Dark Crush)
  { id: 18290000, resets: [{ id: 18290000, by: 5, part: 18290010 }] },
  // Gust Rampage: "to a target afflicted with Stagger within 4m" (DE "einem benommenen Ziel"); 18300050 "-1s all skill cooldowns on hit"
  { id: 18300000, use: [{ t: 'stagger' }], resets: [{ id: 'all', by: 1, part: 18300050 }] },
  // Marchutan's Wrath: 18330020 "50% chance to inflict Stun for 3s" (no NPC clause: every target); 18330040 "+25% additional Stun Chance" (DE "(Zusätzlich)": 50 + 25 = 75%)
  {
    id: 18330000,
    gives: [
      { s: 'Stun', dur: 3, chance: 50, part: 18330020 },
      // both entries roll on the same expected-value key (chance:18330000:Stun), so with both parts 3 casts in 4 stun
      { s: 'Stun', dur: 3, chance: 25, part: 18330040 },
    ],
  },
  // Assault Shock: "30% chance to inflict Stun for 3s. 100% chance to inflict Stun on NPC targets" (the KR glide-only limit is not in the Global text)
  { id: 18700000, gives: [{ s: 'Stun', dur: 3 }] },
];
