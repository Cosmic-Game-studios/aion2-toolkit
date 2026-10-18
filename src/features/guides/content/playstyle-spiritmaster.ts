import type { GuideBlock } from '../types';

/**
 * Playstyles of the Spiritmaster: Fire Spirit burst in a group (the main build), solo with the Earth or Wind Spirit,
 * PvP control, and which spirit fits which job (sources: games.gg, MetaBot, Space4Games, AION2 Builds – skill data of
 * the global client – AION2 Index top 10 of 2026-10-18)
 */
export const spiritmasterPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Beim Beschwörer entscheidet vor allem, **welcher Geist draußen bleibt** – der letzte auf Taste 4. In der Gruppe ist das der Feuergeist (Haupt-Build), allein der Erd- oder Windgeist, im PvP der Erdgeist mit zwei Kontroll-Stigmen. Die Buffs [[16190000|Enhance: Spirit\'s Benediction]] und [[16250000|Summon: Ancient Spirit]] bleiben in jedem Stil.',
      en: 'For the Spiritmaster the main choice is **which spirit stays out** – the last one on key 4. In a group that is the Fire Spirit (main build), alone the Earth or Wind Spirit, in PvP the Earth Spirit plus two control stigmas. The buffs [[16190000|Enhance: Spirit\'s Benediction]] and [[16250000|Summon: Ancient Spirit]] stay in every style.',
    },
  },
  {
    type: 'compare',
    title: { de: 'Vier Spielstile im Vergleich', en: 'Four playstyles compared' },
    caption: {
      de: 'Zahlen der Top 10: AION2 Index, 18.10.2026. „Aktiv“ = im Stigma-Set, das die Seite beim Lesen zeigte; „bereit“ = in einem anderen Preset oder auf einer Leiste (ohne sichtbare Stufe).',
      en: 'Top 10 numbers: AION2 Index, 18 Oct 2026. “Active” = in the stigma set the site showed when it was read; “ready” = on another preset or a skill bar (no level visible).',
    },
    items: [
      {
        title: { de: 'Feuergeist-Burst (Haupt-Build)', en: 'Fire Spirit burst (main build)' },
        tag: { de: 'PvE · Gruppe', en: 'PvE · group' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: 'Alle zehn haben [[16190000|Enhance: Spirit\'s Benediction]] und [[16250000|Summon: Ancient Spirit]] aktiv, je 8 dazu [[16370000|Flame Blessing]] und [[16150000|Jointstrike: Corrode]].', en: 'All ten have [[16190000|Enhance: Spirit\'s Benediction]] and [[16250000|Summon: Ancient Spirit]] active, 8 each add [[16370000|Flame Blessing]] and [[16150000|Jointstrike: Corrode]].' } },
          { kind: 'pro', text: { de: 'Der Feuergeist trifft bis zu 4 Gegner und nutzt seinen Skill bei 15 % seiner Treffer – das bringt die meisten Elemente für [[16300000|Elemental Fusion]].', en: 'The Fire Spirit hits up to 4 enemies and uses its skill on 15% of its hits – that brings the most elements for [[16300000|Elemental Fusion]].' } },
          { kind: 'con', text: { de: 'Kein Schutz-Stigma: Allein oder ohne Heiler wird es eng.', en: 'No protective stigma: alone or without a healer it gets tight.' } },
        ],
        verdict: { de: 'Deine Standardwahl für Dungeons und Bosse – der Build dieses Guides.', en: 'Your default for dungeons and bosses – the build of this guide.' },
      },
      {
        title: { de: 'Allein: Erd- oder Windgeist', en: 'Solo: Earth or Wind Spirit' },
        tag: { de: 'Solo · offene Welt', en: 'Solo · open world' },
        tone: 'teal',
        points: [
          { kind: 'pro', text: { de: 'Der Erdgeist zieht die Monster auf sich (+3.750 Aggro pro Skill), der Windgeist heilt dich (633–696 LP pro Skill, 1,5 % LP pro Treffer).', en: 'The Earth Spirit draws monsters onto itself (+3,750 enmity per skill), the Wind Spirit heals you (633–696 HP per skill, 1.5% HP per hit).' } },
          { kind: 'pro', text: { de: '[[16060000|Siphon]] statt [[16370000|Flame Blessing]]: alle 30 s 10 % LP und 300 MP zurück.', en: '[[16060000|Siphon]] instead of [[16370000|Flame Blessing]]: 10% HP and 300 MP back every 30 s.' } },
          { kind: 'con', text: { de: 'Weniger Elemente: Erd- und Windgeist nutzen ihren Skill nur bei 10 % ihrer Treffer, der Feuergeist bei 15 %.', en: 'Fewer elements: the Earth and Wind Spirits use their skill on only 10% of their hits, the Fire Spirit on 15%.' } },
        ],
        verdict: { de: 'Für Quests, offene Welt und Farmen. 3 der Top 10 haben [[16060000|Siphon]] bereit, keiner aktiv.', en: 'For quests, the open world and farming. 3 of the top 10 keep [[16060000|Siphon]] ready, none active.' },
      },
      {
        title: { de: 'PvP-Kontrolle', en: 'PvP control' },
        tag: 'PvP',
        tone: 'violet',
        points: [
          { kind: 'pro', text: { de: 'Der Erdgeist verspottet Spieler (30 % Chance, 2 s), [[16070000|Soul\'s Cry]] lässt sie fliehen (Furcht, 70 % Chance, 5 s).', en: 'The Earth Spirit taunts players (30% chance, 2 s), [[16070000|Soul\'s Cry]] makes them flee (Fear, 70% chance, 5 s).' } },
          { kind: 'pro', text: { de: '[[16230000|Seize Magic]] nimmt Buffs weg, [[16170000|Command: Proxy]] lässt deinen Geist einen Teil deines Schadens tragen.', en: '[[16230000|Seize Magic]] strips buffs, [[16170000|Command: Proxy]] makes your spirit carry part of your damage.' } },
          { kind: 'con', text: { de: 'Stirbt der Geist oder ist er weiter als 25 m weg, teilt [[16170000|Command: Proxy]] nichts mehr.', en: 'If the spirit dies or is more than 25 m away, [[16170000|Command: Proxy]] shares nothing.' } },
        ],
        verdict: { de: 'Für Arena und Abyss, auf einem zweiten Preset. 5 der Top 10 haben PvP-Stigmen aktiv oder bereit; Nr. 5 spielt genau das PvP-Set des Guides.', en: 'For the Arena and the Abyss, on a second preset. 5 of the top 10 have PvP stigmas active or ready; No. 5 runs exactly the PvP set of the guide.' },
      },
      {
        title: { de: 'Tank- oder Heil-Geist in der Gruppe', en: 'Tank or heal spirit in a group' },
        tag: 'PvE',
        tone: 'rose',
        points: [
          { kind: 'con', text: { de: 'Der Erdgeist sammelt Aggro und kann deinem Tank Monster wegnehmen.', en: 'The Earth Spirit builds enmity and can pull monsters off your tank.' } },
          { kind: 'con', text: { de: 'Erd- und Windgeist liefern weniger Elemente – weniger [[16300000|Elemental Fusion]], weniger Schaden.', en: 'The Earth and Wind Spirits give fewer elements – less [[16300000|Elemental Fusion]], less damage.' } },
          { kind: 'con', text: { de: 'Heilen ist der Job deines Klerikers; 5 der Top 10 lassen den Windgeist auf Stufe 1.', en: 'Healing is your Cleric\'s job; 5 of the top 10 leave the Wind Spirit at level 1.' } },
        ],
        verdict: { de: 'Lohnt sich in der Gruppe nicht – allein ist er dagegen gut.', en: 'Not worth it in a group – alone, on the other hand, it works well.' },
      },
    ],
  },
  {
    type: 'table',
    caption: { de: 'Welcher Geist für welchen Job (Skillstufe 10, Spieldaten des globalen Clients)', en: 'Which spirit for which job (skill level 10, game data of the global client)' },
    head: [{ de: 'Geist', en: 'Spirit' }, { de: 'Sein Skill', en: 'Its skill' }, { de: 'Skill-Chance pro Treffer', en: 'Skill chance per hit' }, { de: 'Job', en: 'Job' }],
    rows: [
      ['[[16100000|Summon: Fire Spirit]]', { de: '781 Schaden an bis zu 4 Gegnern, stürmt zum Ziel', en: '781 damage to up to 4 enemies, rushes to the target' }, '15 %', { de: '**Schaden** – in der Gruppe immer', en: '**damage** – always in a group' }],
      ['[[16110000|Summon: Water Spirit]]', { de: '1.057 Schaden an einem Ziel; +20 MP für dich pro Treffer', en: '1,057 damage to one target; +20 MP for you per hit' }, '15 %', { de: '**MP** – wenn sie dir ausgehen', en: '**MP** – when you run out' }],
      ['[[16130000|Summon: Earth Spirit]]', { de: '1.215 Schaden, +3.750 Aggro; verspottet Spieler mit 30 % Chance für 2 s', en: '1,215 damage, +3,750 enmity; taunts players with a 30% chance for 2 s' }, '10 %', { de: '**Tank** allein, **Kontrolle** im PvP', en: '**tank** alone, **control** in PvP' }],
      ['[[16120000|Summon: Wind Spirit]]', { de: '1.062 Schaden an bis zu 4 Gegnern, heilt dich 633–696 LP; +1,5 % LP pro Treffer', en: '1,062 damage to up to 4 enemies, heals you 633–696 HP; +1.5% HP per hit' }, '10 %', { de: '**Heilung** allein', en: '**healing** alone' }],
    ],
  },
  {
    type: 'callout',
    tone: 'info',
    title: { de: 'Stil wechseln: Presets', en: 'Switching styles: presets' },
    text: {
      de: 'Welcher Geist draußen bleibt, stellst du jederzeit um: Leg ihn ans Ende von Taste 4. Für Stigmen nimm ein eigenes **Skill-Preset** – der globale Client hat 3, und jedes hat eigene Stigmen. Der Wechsel kostet nichts, geht aber nicht beim Aufladen oder Wirken und nicht, solange ein Stigma abklingt; Stigmen tauschen geht im Kampf gar nicht. **Skillpunkte** setzt du kostenlos zurück (nur die des aktuellen Presets). Ein Spieler-Guide berichtet, dass jedes Preset deine Stigma Shards für sich neu verteilt – dann kostet ein zweites Set keine zusätzlichen Shards; sonst braucht ein Stigma 15 Shards bis Stufe 10, 35 bis 15 und 75 bis 20. Was ein Stigma-Reset im globalen Client kostet, ist nicht bestätigt.',
      en: 'Which spirit stays out you can change at any time: put it last on key 4. For stigmas use a **skill preset** of its own – the global client has 3, and each has its own stigmas. Switching costs nothing, but not while you charge or cast or while a stigma is on cooldown, and stigmas cannot be swapped in combat at all. **Skill points** reset for free (only those of the current preset). A player guide reports that every preset spreads your Stigma Shards on its own – then a second set costs no extra shards; otherwise a stigma takes 15 shards to level 10, 35 to 15 and 75 to 20. What a stigma reset costs on the global client is not confirmed.',
    },
  },
  { type: 'heading', text: { de: 'Allein: Erd- oder Windgeist und Siphon', en: 'Solo: Earth or Wind Spirit and Siphon' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Haupt-Build ändert', en: 'What changes compared with the main build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Haupt-Build', en: 'Main build' }, { de: 'Allein', en: 'Solo' }],
    rows: [
      [
        { de: 'Letzter Geist auf Taste 4', en: 'Last spirit on key 4' },
        { de: 'Feuergeist', en: 'Fire Spirit' },
        { de: 'Erdgeist, wenn dich viele Monster treffen; Windgeist, wenn du LP brauchst; Wassergeist, wenn die MP knapp werden', en: 'Earth Spirit when many monsters hit you; Wind Spirit when you need HP; Water Spirit when MP runs short' },
      ],
      [
        { de: 'Stigma', en: 'Stigma' },
        '[[16370000|Flame Blessing]]',
        { de: '[[16060000|Siphon]]: 2.410 Schaden, saugt 10 % LP ab und gibt 300 MP, alle 30 s. Ab Stigma-Stufe 15 dazu ein Schild mit 30 % deiner max. LP für 30 s', en: '[[16060000|Siphon]]: 2,410 damage, absorbs 10% HP and restores 300 MP, every 30 s. From stigma level 15 also a shield worth 30% of your max HP for 30 s' },
      ],
      [
        { de: 'Skills', en: 'Skills' },
        { de: '[[16120000|Summon: Wind Spirit]] oft auf 1', en: '[[16120000|Summon: Wind Spirit]] often at 1' },
        { de: 'den Geist, den du draußen lässt, auf 10 – jede Stufe gibt ihm 2 % mehr Werte. Der Windgeist von 1 auf 10 kostet 21 Skillpunkte', en: 'the spirit you keep out to 10 – every level gives it 2% more stats. The Wind Spirit from 1 to 10 costs 21 skill points' },
      ],
      [
        { de: 'Optionen für Gruppen von Monstern', en: 'Options for packs' },
        { de: 'Schaden am Einzelziel', en: 'single-target damage' },
        { de: '[[16300000|Elemental Fusion]] als Flächen-Skill, [[16330000|Dimensional Control]] zieht Gegner heran (siehe unten)', en: '[[16300000|Elemental Fusion]] as an area skill, [[16330000|Dimensional Control]] pulls enemies in (see below)' },
      ],
      [
        { de: 'Passive', en: 'Passives' },
        { de: 'gleich', en: 'the same' },
        { de: '[[16720000|Spirit Protection]] (+20 % Verteidigung für dich und den Geist) und [[16750000|Spirit Revitalization]] (heilt den Geist um 30 %, wenn er unter 50 % fällt) – die meisten der Top 10 haben beide schon auf 10', en: '[[16720000|Spirit Protection]] (+20% Defense for you and the spirit) and [[16750000|Spirit Revitalization]] (heals the spirit by 30% when it drops below 50%) – most of the top 10 already have both at 10' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 16130000 /* Summon: Earth Spirit */,
        parts: [16130030 /* 10% chance to activate skill when Earth Spirit lands attack */, 16130020 /* +20% PvE / +10 PvP Damage Tolerance to Earth Spirit */],
        note: {
          de: 'Häufiger sein Skill (mehr Aggro, mehr Elemente) und er hält mehr aus. Ab Skillstufe 16 +20 % Werte (dritter Platz ab 20).',
          en: 'Its skill more often (more enmity, more elements) and it takes more hits. From skill level 16 +20% stats (third slot from 20).',
        },
      },
      {
        id: 16120000 /* Summon: Wind Spirit */,
        parts: [16120030 /* 10% chance to activate skill when Wind Spirit lands attack */, 16120050 /* +20% Wind Spirit Stats */],
        note: {
          de: 'Mehr Skills heißt mehr Heilung für dich. +20 % Werte ab Skillstufe 16.',
          en: 'More skills mean more healing for you. +20% stats from skill level 16.',
        },
      },
      {
        id: 16300000 /* Elemental Fusion */,
        parts: [16300010 /* Changes to AoE Skill */, 16300030 /* +10 all Element Boost on hit */, 16300050 /* 25% chance to regain Four Elements */],
        note: {
          de: 'Für Gruppen von Monstern: Flächen-Skill statt „Extraschaden nach 3 s“. Am Boss wieder zurück.',
          en: 'For packs: area skill instead of “extra damage after 3 s”. Switch back for a boss.',
        },
      },
      {
        id: 16330000 /* Dimensional Control */,
        parts: [16330020 /* Extra damage after 3s on hit */, 16330040 /* Pull in nearby targets */],
        note: {
          de: 'Zieht Gegner in der Nähe zusammen (ab Skillstufe 12) – statt der Mehrfachtreffer-Option.',
          en: 'Pulls nearby enemies together (from skill level 12) – instead of the Multi-Hit option.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Allein unterwegs: Geist am Ende von Taste 4 tauschen, [[16060000|Siphon]] statt [[16370000|Flame Blessing]]. In der Gruppe zurück zum Feuergeist. **Kosten:** [[16060000|Siphon]] braucht 15 Stigma Shards bis Stufe 10 und 35 bis 15 (für den Schild), wenn dein Preset sie nicht für sich verteilt. Skillpunkte und Optionen stellst du kostenlos um, die Ausrüstung bleibt gleich. Die Top 10 sind beim Windgeist gespalten: 5 lassen ihn auf 1, 3 kaufen ihn auf 10.',
      en: 'Out on your own: change the spirit at the end of key 4, [[16060000|Siphon]] instead of [[16370000|Flame Blessing]]. Back to the Fire Spirit in a group. **Costs:** [[16060000|Siphon]] takes 15 Stigma Shards to level 10 and 35 to 15 (for the shield) unless your preset spreads them on its own. You change skill points and options for free, your gear stays the same. The top 10 are split on the Wind Spirit: 5 leave it at 1, 3 buy it to 10.',
    },
  },
  { type: 'heading', text: { de: 'PvP-Kontrolle: Erdgeist, Buffs wegnehmen, Schaden teilen', en: 'PvP control: Earth Spirit, strip buffs, share damage' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Haupt-Build ändert', en: 'What changes compared with the main build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Haupt-Build', en: 'Main build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        '[[16190000|Enhance: Spirit\'s Benediction]], [[16250000|Summon: Ancient Spirit]], [[16370000|Flame Blessing]], [[16150000|Jointstrike: Corrode]]',
        { de: 'Die beiden Buffs bleiben; dazu [[16230000|Seize Magic]] (nimmt bis zu 2 Buffs weg, ab Stufe 5 bis zu 3; ab Stufe 10 Siegel für 5 s, wenn es 3 oder mehr erwischt) und [[16170000|Command: Proxy]] (4 s lang, ab Stufe 5 6 s: Von jedem Treffer bekommst du nur 41 %, auf Stufe 20 31 %). Statt einem davon: [[16260000|Magic Block]] (Siegel mit 75 % Chance) oder [[16080000|Cry of Terror]] (Furcht auf bis zu 4 Ziele, 50 % Chance)', en: 'The two buffs stay; add [[16230000|Seize Magic]] (strips up to 2 buffs, up to 3 from level 5; from level 10 Seal for 5 s when it catches 3 or more) and [[16170000|Command: Proxy]] (for 4 s, 6 s from level 5: you take only 41% of each hit, 31% at level 20). Instead of one of them: [[16260000|Magic Block]] (Seal with a 75% chance) or [[16080000|Cry of Terror]] (Fear on up to 4 targets, 50% chance)' },
      ],
      [
        { de: 'Letzter Geist auf Taste 4', en: 'Last spirit on key 4' },
        { de: 'Feuergeist', en: 'Fire Spirit' },
        { de: 'Erdgeist: Spott zwingt Spieler, auf ihn zu gehen, und [[16200000|Defiance]] löst Spott nicht', en: 'Earth Spirit: Taunt forces players to go for it, and [[16200000|Defiance]] does not remove taunt' },
      ],
      [
        { de: 'Skills höher', en: 'Skills higher' },
        '–',
        { de: '[[16070000|Soul\'s Cry]] auf 10 (Furcht 5 s) – 6 der Top 10 haben ihn auf 9–10 gekauft, 3 lassen ihn auf 1. [[16790000|Revitalization Contract]] (+35 % Widerstand gegen Statuseffekte, heilt 44 % LP bei 10 % LP) auf 10', en: '[[16070000|Soul\'s Cry]] to 10 (Fear for 5 s) – 6 of the top 10 bought it to 9–10, 3 leave it at 1. [[16790000|Revitalization Contract]] (+35% Status Effect Resist, heals 44% HP at 10% HP) to 10' },
      ],
      [
        { de: 'Daevanion', en: 'Daevanion' },
        { de: 'Nezekan bis Triniel', en: 'Nezekan to Triniel' },
        { de: 'dazu **Azphel**: bezahlt mit Kampfkristallen aus dem PvP, Werte zählen nur gegen Spieler. Die Top 10 haben dort 21–42 von 152 Knoten offen (Median 35)', en: 'plus **Azphel**: paid with Battle Crystals from PvP, its stats only count against players. The top 10 have 21–42 of its 152 nodes open (median 35)' },
      ],
      [
        { de: 'Ausrüstung', en: 'Gear' },
        { de: 'Schaden', en: 'damage' },
        { de: 'gleich – dieser Stil tauscht keine Ausrüstung', en: 'the same – this style swaps no gear' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 16070000 /* Soul's Cry */,
        parts: [16070030 /* Changes to mobile skill */, 16070040 /* -10s cooldown */],
        note: {
          de: 'Im Laufen wirken und 10 s weniger Abklingzeit (45 → 35 s). +2 s Furcht gibt es erst ab Skillstufe 16.',
          en: 'Cast while moving and 10 s less cooldown (45 → 35 s). +2 s of Fear only comes from skill level 16.',
        },
      },
    ],
  },
  {
    type: 'table',
    caption: { de: 'PvP-Stigmen: Die Quellen sind sich uneins', en: 'PvP stigmas: the sources disagree' },
    head: [{ de: 'Quelle', en: 'Source' }, { de: 'Stigmen', en: 'Stigmas' }],
    rows: [
      [{ de: 'Dieser Guide', en: 'This guide' }, '[[16190000|Enhance: Spirit\'s Benediction]], [[16250000|Summon: Ancient Spirit]], [[16230000|Seize Magic]], [[16170000|Command: Proxy]]'],
      [{ de: 'Top 10 Nr. 5 (aktiv)', en: 'Top 10 No. 5 (active)' }, { de: 'dasselbe Set: [[16230000|Seize Magic]] 20, [[16170000|Command: Proxy]] 14', en: 'the same set: [[16230000|Seize Magic]] 20, [[16170000|Command: Proxy]] 14' }],
      [{ de: 'games.gg (Arena)', en: 'games.gg (Arena)' }, '[[16080000|Cry of Terror]], [[16230000|Seize Magic]], [[16260000|Magic Block]], [[16170000|Command: Proxy]]'],
      [{ de: 'games.gg (Abyss)', en: 'games.gg (Abyss)' }, { de: '[[16220000|Cursed Cloud]], [[16080000|Cry of Terror]], [[16260000|Magic Block]] und ein viertes', en: '[[16220000|Cursed Cloud]], [[16080000|Cry of Terror]], [[16260000|Magic Block]] and a fourth' }],
      ['MetaBot', { de: '[[16250000|Summon: Ancient Spirit]], [[16190000|Enhance: Spirit\'s Benediction]], [[16150000|Jointstrike: Corrode]], [[16080000|Cry of Terror]] – dazu der Windgeist und [[16070000|Soul\'s Cry]] auf voller Stufe', en: '[[16250000|Summon: Ancient Spirit]], [[16190000|Enhance: Spirit\'s Benediction]], [[16150000|Jointstrike: Corrode]], [[16080000|Cry of Terror]] – plus the Wind Spirit and [[16070000|Soul\'s Cry]] at full level' }],
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Arena, Abyss und PvP in der offenen Welt – vor dem Kampf. [[16170000|Command: Proxy]] ist nicht nur PvP: Nr. 2 der Top 10 spielt es aktiv in einem sonst normalen PvE-Set statt [[16150000|Jointstrike: Corrode]]. [[16220000|Cursed Cloud]] (Schaden über Zeit) hat keiner der Top 10 gelernt. **Kosten:** [[16230000|Seize Magic]] und [[16170000|Command: Proxy]] auf Stufe 10 sind je 15 Stigma Shards, auf 20 je 75, wenn dein Preset sie nicht für sich verteilt. [[16070000|Soul\'s Cry]] von 1 auf 10 kostet 21 Skillpunkte, kostenlos umzuverteilen.',
      en: 'For the Arena, the Abyss and open-world PvP – before the fight. [[16170000|Command: Proxy]] is not only for PvP: No. 2 of the top 10 runs it active in an otherwise normal PvE set instead of [[16150000|Jointstrike: Corrode]]. None of the top 10 has learned [[16220000|Cursed Cloud]] (damage over time). **Costs:** [[16230000|Seize Magic]] and [[16170000|Command: Proxy]] at level 10 are 15 Stigma Shards each, 75 each at 20, unless your preset spreads them on its own. [[16070000|Soul\'s Cry]] from 1 to 10 costs 21 skill points, free to move.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Wie hoch die Top 10 ihre Geister bringen', en: 'How high the top 10 take their spirits' },
    caption: {
      de: 'Median der Skillstufe (mit Stufen aus Ausrüstung und Daevanion); darunter, wie viele die Stufen mit Skillpunkten auf 10 gekauft haben. Feuer-, Wasser- und Erdgeist bringen fast alle hoch, beim Windgeist ist die Gruppe gespalten. [[16070000|Soul\'s Cry]] (Furcht) zum Vergleich. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'Median skill level (including levels from gear and Daevanion); below it, how many bought the levels to 10 with skill points. Almost all take the Fire, Water and Earth Spirits high; on the Wind Spirit the group is split. [[16070000|Soul\'s Cry]] (Fear) for comparison. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    items: [
      { label: '[[16100000|Summon: Fire Spirit]]', value: 17.5, note: { de: '8 von 10 auf 10 gekauft', en: '8 of 10 bought to 10' }, tone: 'gold' },
      { label: '[[16110000|Summon: Water Spirit]]', value: 15.5, note: { de: '9 von 10 auf 10 gekauft', en: '9 of 10 bought to 10' }, tone: 'blue' },
      { label: '[[16130000|Summon: Earth Spirit]]', value: 14.5, note: { de: '8 von 10 auf 10 gekauft', en: '8 of 10 bought to 10' }, tone: 'teal' },
      { label: '[[16120000|Summon: Wind Spirit]]', value: 6.5, note: { de: '5 auf 1 · 3 auf 10 gekauft', en: '5 at 1 · 3 bought to 10' }, tone: 'teal' },
      { label: '[[16070000|Soul\'s Cry]]', value: 11, note: { de: '3 auf 1 · 6 auf 9–10 gekauft', en: '3 at 1 · 6 bought to 9–10' }, tone: 'violet' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://games.gg/aion-2/guides/aion-2-spiritmaster-guide/', label: 'games.gg – Spiritmaster guide (stigma sets for farming, Arena and Abyss)' },
      { href: 'https://metabot.gg/en/aion-2/classes/spiritmaster/build', label: 'MetaBot – Spiritmaster build (PvP set, Wind Spirit, Soul\'s Cry)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (no swaps in combat)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, stigma reset cost unconfirmed)' },
    ],
  },
];
