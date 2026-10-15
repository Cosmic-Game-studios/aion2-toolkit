import type { ClassMechanics } from './types';

/**
 * Assassin (살성) skill mechanics for the rotation simulator, hand-made 2026-10-15 from the English AND German texts of the
 * global client (public/data/{en,de}/skills.json, every level and specialisation) and the checked research sheet.
 * Only what changes which skill a macro key fires is modelled; damage numbers stay in the texts.
 * Names, each spelled the same where it is given and where it is required:
 * - Insignia (mark on the target, 10 s, stacks, lands on bosses): Savage Roar, Savage Fang, Ambush Lv8 (from behind),
 *   Shadowstep Lv10, Shadow Fall Lv8, Heart Gore Lv8 → consumed by Insignia Explosion (Lv8 keeps 2).
 * - Stun (crowd control, not on bosses): Shadowstrike, Insignia Explosion, Whirlwind Slice, Shadowstep Lv5, Flash Slice
 *   Lv16 → Shadow Fall.
 * - Blind: Flash Slice, Infiltrate, Smoke Bomb, Assault Ambush → Shadow Fall Lv16. "100% … on NPC targets", but no source
 *   confirms that bosses take it, so it stays off bosses (as in combos/assassin.ts).
 * - Critical Hit (own state, 3 s = the simulator's crit window): the guaranteed crits of Quick Slice Lv16, Throw
 *   Shadowblade Lv15, Shadow Walk Lv5 and Savage Fang Lv20 → Heart Gore (which also opens on the simulator's random crits).
 * - Whirlwind Slice Trigger (own state, 5 s; the text gives no window): Ambush Lv12 → Whirlwind Slice (also after an Evasion).
 * EN/DE conflicts, settled by the stricter text (Korean cross-checks in combos/assassin.ts):
 * - Whirlwind Slice: EN ties "on Evasion" only to the Stun, DE "Fügt bei erfolgreichem Ausweichen … zu" to the whole skill.
 * - Infiltrate: EN puts "after using [Dodge] or while flying" after the Blind, DE ties it to the teleport (whole skill).
 * Left out: statuses no Assassin skill asks for (Knockdown, Airborne, Slow, Root, Seal, Defense Break's debuff, Ambush
 * Stance), passives (never cast, so Exploit Weakness clone Insignias are missing), kill resets, consecutive uses, the
 * percentage cooldown cut of Triniel's Dagger Lv10. Permanent "-Xs cooldown" specialisations are written as the skill
 * shortening its own cooldown on every cast, because the simulator takes the level cooldown without specialisations.
 */
export const mechanics: ClassMechanics = [
  // Quick Slice – Lv12 "-1s [Insignia Explosion] cooldown on hit"; Lv16 "Ignores Block and Evasion and lands as a Critical Hit"
  {
    id: 13010000,
    gives: [{ s: 'Critical Hit', dur: 3, self: true, part: 13010050 }],
    resets: [{ id: 13130000, by: 1, part: 13010040 }],
  },
  // Throw Shadowblade – Lv15 "Critical Hit on hit"
  { id: 13020000, gives: [{ s: 'Critical Hit', dur: 3, self: true, part: 13020030 }] },
  // Flash Slice – "inflict Blind for 3s. 100% chance to inflict Blind on NPC targets"; Lv8 "+2s Blind duration"; Lv16 "50% chance to rotate and inflict Stun for 3s on hitting a target afflicted with Blind"
  {
    id: 13050000,
    gives: [
      { s: 'Blind', dur: 3 }, // 40% on players, 100% on NPCs
      { s: 'Blind', dur: 5, part: 13050010 },
      { s: 'Stun', dur: 3, chance: 50, part: 13050050 }, // needs a Blinded target; a give cannot check that, and on NPCs the Blind above lands first
    ],
  },
  // Ambush – Lv8 "Engraves 2 Insignias for 10s on landing as a Back attack"; Lv12 "50% chance to trigger [Whirlwind Slice] on hit"
  {
    id: 13060000,
    gives: [
      { s: 'Insignia', dur: 10, stacks: 2, boss: true, part: 13060010 }, // assumes the Assassin hits from behind
      { s: 'Whirlwind Slice Trigger', dur: 5, self: true, chance: 50, part: 13060040 },
    ],
  },
  // Shadowstrike – "rotates, and inflicts Stun for 3s"; Lv8 "+1s Stun duration"
  {
    id: 13070000,
    gives: [
      { s: 'Stun', dur: 3 },
      { s: 'Stun', dur: 4, part: 13070010 },
    ],
  },
  // Savage Roar – "engraves 1 Insignia for 10s" (its chain hits Savage Back Kick and Savage Smash too: one per press); Lv12 "-1s [Shadowstrike] cooldown on hit"
  {
    id: 13100000,
    gives: [{ s: 'Insignia', dur: 10, stacks: 1, boss: true }],
    resets: [{ id: 13070000, by: 1, part: 13100040 }],
  },
  // Insignia Explosion – "inflicting Stun for 3s. Stun chance is doubled on NPC targets"; Lv8 "Keep 2 stacks of Insignias after [Insignia Explosion]"; Lv12 "+1s Stun duration"; Lv16 "-3s cooldown"
  {
    id: 13130000,
    consumes: 'Insignia',
    gives: [
      { s: 'Stun', dur: 3 }, // 10% per Insignia stack, doubled on NPCs: 100% at 5 stacks (the chance cannot follow the stacks)
      { s: 'Stun', dur: 4, part: 13130040 },
      { s: 'Insignia', dur: 10, stacks: 2, boss: true, part: 13130030 }, // the 2 kept stacks, written back after the consume
    ],
    resets: [{ id: 13130000, by: 3, part: 13130050 }],
  },
  // Shadowstep – Lv5 "40% chance to rotate and inflict Stun for 3s on hit"; Lv10 "Engraves 5 Insignias for 10s on hit"; Lv20 "-15s cooldown"
  {
    id: 13140000,
    gives: [
      { s: 'Stun', dur: 3, chance: 40, part: 13140010 },
      { s: 'Insignia', dur: 10, stacks: 5, boss: true, part: 13140020 },
    ],
    resets: [{ id: 13140000, by: 15, part: 13140040 }],
  },
  // Shadow Walk – "Cannot be used in combat"; Lv15 "Available in combat"; Lv5 "Critical Hit on attack during Stealth"
  {
    id: 13180000,
    use: [{ t: 'ooc' }],
    useVia: [{ part: 13180030, free: true }],
    gives: [{ s: 'Critical Hit', dur: 3, self: true, part: 13180010 }], // the first attack out of Stealth
  },
  // Whirlwind Slice – EN "inflict Stun for 3s on Evasion", DE stricter "Fügt bei erfolgreichem Ausweichen einem Ziel … Schaden zu" (whole skill); "100% to inflict Stun on NPC targets"; Lv16 "25% chance to reset [Whirlwind Slice] cooldown on Evasion"
  {
    id: 13210000,
    use: [{ t: 'evade' }, { t: 'self', s: 'Whirlwind Slice Trigger' }],
    gives: [{ s: 'Stun', dur: 3 }], // 40% on players, 100% on NPCs
    resets: [{ id: 13210000, chance: 25, part: 13210050 }], // rolled at the cast, standing in for the next Evasion (the Ambush trigger is not used up, so a reset can fire it twice on one trigger)
  },
  // Shadow Fall – "Moves to a target afflicted with Stun"; "5% chance to trigger on attacking a target with Incapacitated Immunity"; Lv16 "Can be used on targets afflicted with Blind"; Lv8 "Engraves 3 Insignias for 10s on hit"; Lv8 "-5s cooldown"
  {
    id: 13220000,
    use: [{ t: 'status', s: ['Stun'] }, { t: 'chance', p: 5 }],
    useVia: [{ part: 13220050, use: [{ t: 'status', s: ['Blind'] }] }],
    gives: [{ s: 'Insignia', dur: 10, stacks: 3, boss: true, part: 13220020 }],
    resets: [{ id: 13220000, by: 5, part: 13220030 }],
  },
  // Aerial Bind – Lv20 "-30s cooldown"
  { id: 13230000, resets: [{ id: 13230000, by: 30, part: 13230040 }] },
  // Smoke Bomb – "inflicts Blind for 5s"
  { id: 13250000, gives: [{ s: 'Blind', dur: 5 }] },
  // Savage Fang – "engraves 5 Insignias for 10s"; Lv20 "Critical Hit on hit"
  {
    id: 13270000,
    gives: [
      { s: 'Insignia', dur: 10, stacks: 5, boss: true },
      { s: 'Critical Hit', dur: 3, self: true, part: 13270040 },
    ],
  },
  // Spiral Slice – Lv20 "-30s cooldown" (its Lv10 Stun needs 2 removed buffs, which the simulator cannot see)
  { id: 13280000, resets: [{ id: 13280000, by: 30, part: 13280040 }] },
  // Illusive Clone – "Removes [Heart Gore] cooldown … for 20s" at Lv20, the level players take it to (only the reset at the cast can be written)
  { id: 13310000, resets: [{ id: 13350000 }] },
  // Storm Rampage – "to a target afflicted with Stagger"; Lv16 "-1s all skill cooldowns on hit"
  {
    id: 13340000,
    use: [{ t: 'stagger' }],
    resets: [{ id: 'all', by: 1, part: 13340050 }],
  },
  // Heart Gore – "Triggers on landing a Critical Hit" (window not stated); Lv8 "Engraves 1 Insignia for 10s on hit"; Lv16 "Resets [Heart Gore] cooldown on landing a Critical Hit"
  {
    id: 13350000,
    use: [{ t: 'crit', window: 3 }, { t: 'self', s: 'Critical Hit' }],
    gives: [{ s: 'Insignia', dur: 10, stacks: 1, boss: true, part: 13350020 }],
    resets: [{ id: 13350000, chance: 40, part: 13350050 }], // when Heart Gore itself crits: 40% = the simulator's crit rate
  },
  // Infiltrate – EN "after using [Dodge] or while flying", DE stricter "Bewegt sich bei Einsatz von [Notausweichen] oder im Flug hinter ein Ziel" (whole skill); "100% chance to inflict Blind on NPC targets"
  {
    id: 13360000,
    use: [{ t: 'dodge' }],
    gives: [{ s: 'Blind', dur: 3 }], // 50% on players, 100% on NPCs
  },
  // Assault Ambush – "inflict Blind for 5s. 100% chance to inflict Blind on NPC targets"
  { id: 13700000, gives: [{ s: 'Blind', dur: 5 }] },
];
