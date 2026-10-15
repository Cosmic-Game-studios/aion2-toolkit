import type { ClassMechanics } from './types';

/**
 * Gladiator skill mechanics for the rotation simulator, hand-made from the Global client texts in both languages
 * (public/data/en|de/skills.json) and the checked mechanics sheet. Every duration, chance and cooldown used here is
 * the same at every skill level (actives 1-40, stigmas 1-20), so the level players run does not
 * change anything. Only what changes which skill a macro key fires is modelled; damage stays in the texts.
 * Where English and German disagree, the stricter reading is used: Ankle Slice only works after a successful Block
 * (German "Fügt bei erfolgreichem Block ... zu"; the English text ties the Block to the Root only), and Rush Strike
 * only after a Dodge or in flight (German "Bewegt sich bei Einsatz von [Notausweichen] oder im Flug"). Rage Burst opens
 * Overhead Slam on the target it hit (English "on the target"; the German text does not say on whom).
 * Knockdown, Airborne, Root and Seal are crowd control and do not land on bosses (Incapacitated Immunity), so the
 * boss routes to Overhead Slam / Aerial Snare are Rage Burst and the 7% / 5% triggers against immune targets.
 * The "X% chance … 100% chance on NPC targets" crowd control is modelled with the NPC value (the default), the
 * player chance only matters in PvP. Static cuts of a skill's own cooldown from a specialisation (Remove cooldown,
 * -15s, -50% …) are self-resets, because the simulator takes cooldowns from the level data without specialisations.
 * Crushing Wave's reset "on landing a Critical Hit" is rolled at the simulator's own crit rate (40%, CRIT_RATE in
 * lib/rotation.ts), as the Cleric and Assassin files do.
 * Left out (not expressible or not in the texts): Lunge Stance's 50% cut to all cooldowns on every crit during the
 * stance, Ankle Slice's 25% reset on Block, Leaping Slam's reset on a kill, Focused Block's second charge, Rush Strike's
 * charge option, Defiance being "Unaffected by cooldown reduction effects", and own buffs no skill asks for (Prepare for
 * Battle from Ruinous Blow and Leaping Slam, Tenacity from Defiance: a later 3s Prepare for Battle would also cut the
 * 20s one short here). Target statuses nothing asks for (Slow, Wounded, Root, Seal, Airborne) are kept: they are what
 * the texts inflict and cannot change a cast.
 */
export const mechanics: ClassMechanics = [
  // Keen Strike: "-1s [Ruinous Blow] cooldown on hit" (Lv 12)
  { id: 11020000, resets: [{ id: 11100000, by: 1, part: 11020040 }] },
  // Crushing Wave: "Resets cooldown on landing a Critical Hit" (Lv 12; DE "Abklingzeit zurücksetzen: Bei Kritischer Treffer"), rolled at the simulator's 40% crit rate
  { id: 11050000, resets: [{ id: 11050000, chance: 40, part: 11050040 }] },
  // Blade Toss: "[Blade Toss] inflicts Slow for 5s" (stigma Lv 10); "[Blade Dance] has 30% chance to inflict Knockdown for 3s" (Lv 20, no NPC clause; Blade Dance is its chain step, counted at the Blade Toss cast)
  {
    id: 11080000,
    gives: [
      { s: 'Slow', dur: 5, boss: true, part: 11080020 },
      { s: 'Knockdown', dur: 3, chance: 30, part: 11080040 },
    ],
  },
  // Overhead Slam: "to a target afflicted with Knockdown"; Rage Burst "Triggers [Overhead Slam] on the target for 10s on hit"; "Has a 7% chance to trigger when attacking a target with Incapacitated Immunity"; "Remove cooldown" (Lv 16)
  {
    id: 11170000,
    use: [
      { t: 'status', s: ['Knockdown'] },
      { t: 'after', ids: [11390000], window: 10 },
      { t: 'chance', p: 7 },
    ],
    resets: [{ id: 11170000, part: 11170050 }],
  },
  // Leaping Slam: "50% chance to trigger [Ankle Slice] on hit" (Lv 8; DE "[Knöchelschnitt]-Aktivierung (50 % Chance)"; window not stated: 5 s like the simulator's other triggers)
  { id: 11190000, gives: [{ s: 'Ankle Slice', dur: 5, self: true, chance: 50, part: 11190020 }] },
  // Ankle Slice: "with a 50% chance to inflict Root for 3s on Block" + DE "Fügt bei erfolgreichem Block ... zu" (whole skill after a Block); "100% chance to inflict Root on NPC targets"; "30% chance to inflict Knockdown for 3s on landing [Ankle Slice]" (Lv 8)
  {
    id: 11200000,
    use: [{ t: 'block' }, { t: 'self', s: 'Ankle Slice' }],
    gives: [
      { s: 'Root', dur: 3 },
      { s: 'Knockdown', dur: 3, chance: 30, part: 11200010 },
    ],
  },
  // Wrath Wave: "has a 50% chance to inflict Knockdown for 3s"; "100% chance to inflict Knockdown on NPC targets"
  { id: 11240000, gives: [{ s: 'Knockdown', dur: 3 }] },
  // Sword Aura Rampage: "to a target afflicted with Stagger"; "-1s all skill cooldowns on hit" (Lv 16)
  { id: 11280000, use: [{ t: 'stagger' }], resets: [{ id: 'all', by: 1, part: 11280050 }] },
  // Mocking Blade: "inflicts Knockdown for 3s" (no chance stated); "Changes skill motion when attacking targets with Incapacitated Immunity"; "+1s Knockdown duration" (Lv 12)
  {
    id: 11290000,
    gives: [
      { s: 'Knockdown', dur: 3 },
      { s: 'Knockdown', dur: 4, part: 11290040 },
    ],
  },
  // Aerial Snare: "to a target afflicted with Knockdown"; "100% chance to inflict Airborne on NPC targets"; "Has a 5% chance to trigger on attacking a target with Incapacitated Immunity"; "-50% [Aerial Snare] cooldown" (Lv 16, 45 s -> 22.5 s)
  {
    id: 11300000,
    use: [
      { t: 'status', s: ['Knockdown'] },
      { t: 'chance', p: 5 },
    ],
    gives: [{ s: 'Airborne', dur: 3 }],
    resets: [{ id: 11300000, by: 22.5, part: 11300050 }],
  },
  // Lifestealing Blade: "-30s cooldown" (stigma Lv 15)
  { id: 11340000, resets: [{ id: 11340000, by: 30, part: 11340030 }] },
  // Rush Strike: "after using [Dodge] or while flying" + DE "Bewegt sich bei Einsatz von [Notausweichen] oder im Flug" (whole skill); "100% chance to inflict Knockdown on NPC targets"; "-10s cooldown" (Lv 12)
  {
    id: 11360000,
    use: [{ t: 'dodge' }],
    gives: [{ s: 'Knockdown', dur: 3 }],
    resets: [{ id: 11360000, by: 10, part: 11360040 }],
  },
  // Rage Burst: "Inflicts Wounded for 10s on hit, reducing the enemy's Attack"; "-15s [Rage Burst] cooldown" (stigma Lv 5)
  {
    id: 11390000,
    gives: [{ s: 'Wounded', dur: 10, boss: true }],
    resets: [{ id: 11390000, by: 15, part: 11390010 }],
  },
  // Forced Restraint: "with a 75% chance to inflict Seal for 5s"; "100% chance to inflict Seal on NPC targets"; "+2s Seal duration" (Lv 15); "50% chance to inflict Root for 5s" (Lv 5, no NPC clause)
  {
    id: 11430000,
    gives: [
      { s: 'Seal', dur: 5 },
      { s: 'Seal', dur: 7, part: 11430030 },
      { s: 'Root', dur: 5, chance: 50, part: 11430010 },
    ],
  },
  // Fracturing Rush: "with a 60% chance to inflict Root for 3s"; "100% chance to inflict Root on NPC targets"; "50% chance to inflict Airborne for 3s" (Lv 20, no NPC clause)
  {
    id: 11450000,
    gives: [
      { s: 'Root', dur: 3 },
      { s: 'Airborne', dur: 3, chance: 50, part: 11450040 },
    ],
  },
  // Assault Strike: "with a 30% chance to inflict Knockdown for 3s"; "100% chance to inflict Knockdown on NPC targets"
  { id: 11700000, gives: [{ s: 'Knockdown', dur: 3 }] },
];
