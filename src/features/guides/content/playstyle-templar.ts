import type { GuideBlock } from '../types';

/**
 * Playstyles of the Templar: damage-leaning tank (the core build), protection tank, solo farming, PvP
 * (sources: aion2-guides.info, MetaBot, OSLink, Daeva Guides, AION2 Builds, Space4Games – skill data of the global
 * client – AION2 Index top 10 of 2026-10-18)
 */
export const templarPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Der Templer bleibt in jedem Stil der Tank – was sich ändert, ist, wie viel Schaden du gegen wie viel Schutz tauschst. Fast alle Top 10 behalten [[12070000|Doom Shield]], [[12230000|Noble Armor]] und [[12450000|Battlefield Banner]]; der vierte Platz entscheidet: [[12120000|Taunt]] für den Kern-Build, ein Schutz-Stigma für schwere Bosse, ein Stigma gegen Gruppen für das Farmen. Dazu kommt ein PvP-Set auf einem eigenen Preset.',
      en: 'The Templar stays the tank in every style – what changes is how much damage you trade for how much protection. Almost all of the top 10 keep [[12070000|Doom Shield]], [[12230000|Noble Armor]] and [[12450000|Battlefield Banner]]; the fourth slot decides: [[12120000|Taunt]] for the core build, a protective stigma for hard bosses, a stigma against packs for farming. On top comes a PvP set on a preset of its own.',
    },
  },
  {
    type: 'compare',
    title: { de: 'Vier Spielstile im Vergleich', en: 'Four playstyles compared' },
    caption: {
      de: 'Zahlen der Top 10: AION2 Index, 18.10.2026. „Aktiv“ = im Stigma-Set, das die Seite beim Lesen zeigte; „bereit“ = in einem anderen Preset oder auf einer Leiste.',
      en: 'Top 10 numbers: AION2 Index, 18 Oct 2026. “Active” = in the stigma set the site showed when it was read; “ready” = on another preset or a skill bar.',
    },
    items: [
      {
        title: { de: 'Tank mit Schaden (Kern-Build)', en: 'Tank with damage (core build)' },
        tag: { de: 'PvE · Tank', en: 'PvE · tank' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: '[[12450000|Battlefield Banner]] macht aus deiner Verteidigung Angriff, [[12230000|Noble Armor]] verstärkt ab Stigma-Stufe 15 [[12780000|Fury]] um das 1,5-Fache – so tankst du und machst trotzdem ordentlich Schaden.', en: '[[12450000|Battlefield Banner]] turns your Defense into Attack, and from stigma level 15 [[12230000|Noble Armor]] makes [[12780000|Fury]] 1.5 times as strong – so you tank and still deal solid damage.' } },
          { kind: 'pro', text: { de: '[[12120000|Taunt]] zieht den Boss sofort auf dich und schwächt ihn: -10 % Angriff, 200 weniger Präzision.', en: '[[12120000|Taunt]] pulls the boss onto you right away and weakens it: -10% Attack, 200 less Accuracy.' } },
          { kind: 'con', text: { de: 'Kein Schutz-Stigma auf einer Taste – mit schwacher Ausrüstung tun große Treffer weh.', en: 'No protective stigma on a key – with weak gear big hits hurt.' } },
        ],
        verdict: { de: 'Standard für Dungeons und Bosse, sobald deine Ausrüstung hält. Banner, Doom Shield und Noble Armor haben alle zehn aktiv oder bereit.', en: 'The default for dungeons and bosses once your gear holds. All ten have the banner, Doom Shield and Noble Armor active or ready.' },
      },
      {
        title: { de: 'Schutz-Tank', en: 'Protection tank' },
        tag: { de: 'PvE · schwere Bosse', en: 'PvE · hard bosses' },
        tone: 'blue',
        points: [
          { kind: 'pro', text: { de: '[[12110000|Shield of Protection]]: ein sicherer Block mit +100 % Block-Schadensreduktion, ab Stigma-Stufe 5 zweimal hintereinander, ab 10 im Laufen nutzbar. Jeder sichere Block startet [[12780000|Fury]].', en: '[[12110000|Shield of Protection]]: a sure block with +100% Block Damage Reduction, twice in a row from stigma level 5, usable while moving from 10. Every sure block starts [[12780000|Fury]].' } },
          { kind: 'pro', text: { de: '[[12320000|Nezekan\'s Shield]] schützt die ganze Gruppe im Umkreis von 40 m mit einem Schutzschild von 41 % deiner max. LP (60 % auf Stufe 20).', en: '[[12320000|Nezekan\'s Shield]] protects the whole group within 40 m with a shield of 41% of your max HP (60% at level 20).' } },
          { kind: 'con', text: { de: 'Weniger Schaden: Du gibst Banner, [[12120000|Taunt]] oder [[12070000|Doom Shield]] dafür ab. Solange du blockst, greifst du nicht an.', en: 'Less damage: you give up the banner, [[12120000|Taunt]] or [[12070000|Doom Shield]] for it. While you block, you do not attack.' } },
        ],
        verdict: { de: 'Für neue, schwere Bosse und solange deine Ausrüstung schwach ist. 5 der Top 10 spielen [[12110000|Shield of Protection]] aktiv.', en: 'For new, hard bosses and while your gear is weak. 5 of the top 10 run [[12110000|Shield of Protection]] active.' },
      },
      {
        title: { de: 'Allein farmen', en: 'Solo farming' },
        tag: { de: 'Solo · offene Welt', en: 'Solo · open world' },
        tone: 'teal',
        points: [
          { kind: 'pro', text: { de: '[[12220000|Grapple]] zieht bis zu 4 Gegner aus 20 m zu dir und hält sie 3 s fest (Bann). Ab Stigma-Stufe 10 bekommst du dabei einen Schutzschild von 20 % deiner max. LP.', en: '[[12220000|Grapple]] pulls up to 4 enemies to you from 20 m and holds them for 3 s (Root). From stigma level 10 you also get a shield of 20% of your max HP.' } },
          { kind: 'pro', text: { de: '[[12070000|Doom Shield]] ist ab Stigma-Stufe 15 sofort wieder bereit, wenn ein Gegner stirbt – du springst von Gruppe zu Gruppe.', en: 'From stigma level 15 [[12070000|Doom Shield]] is ready again right away when an enemy dies – you jump from pack to pack.' } },
          { kind: 'con', text: { de: 'Ohne [[12120000|Taunt]] fehlt dir in der Gruppe die sichere Aggro – vor dem Dungeon zurückwechseln.', en: 'Without [[12120000|Taunt]] you lack safe enmity in a group – switch back before a dungeon.' } },
        ],
        verdict: { de: 'Das, was einem „Schadens-Templer“ am nächsten kommt – fürs Farmen. Einen eigenen Schadens-Build für Gruppen nennt kein Guide.', en: 'The closest thing to a “damage Templar” – for farming. No guide names a damage build of its own for groups.' },
      },
      {
        title: { de: 'PvP', en: 'PvP' },
        tag: 'PvP',
        tone: 'rose',
        points: [
          { kind: 'pro', text: { de: 'Viel Kontrolle: [[12100000|Shield Smite]] betäubt Spieler mit 60 % Chance, [[12130000|Poach]] zieht sie heran, [[12070000|Doom Shield]] bringt dich aus 20 m zum Ziel.', en: 'Lots of control: [[12100000|Shield Smite]] stuns players with a 60% chance, [[12130000|Poach]] pulls them in, [[12070000|Doom Shield]] takes you to the target from 20 m.' } },
          { kind: 'pro', text: { de: '[[12410000|Executing Blade]] senkt die Verteidigung von bis zu 4 Gegnern 5 s lang um 30 %, [[12190000|Second Skin]] gibt +15 % PvP-Schadensresistenz.', en: '[[12410000|Executing Blade]] lowers the Defense of up to 4 enemies by 30% for 5 s, [[12190000|Second Skin]] gives +15% PvP Damage Tolerance.' } },
          { kind: 'con', text: { de: 'Wenig Daten: Keiner der Top 10 spielt ein PvP-Set aktiv, und die Guides sind sich bei den Stigmen nicht einig.', en: 'Little data: none of the top 10 runs a PvP set active, and the guides do not agree on the stigmas.' } },
        ],
        verdict: { de: 'Auf ein zweites Preset. Für 1 gegen 1 und für Gruppen gibt es je ein eigenes Set.', en: 'On a second preset. There is one set for 1 vs 1 and one for groups.' },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'info',
    title: { de: 'Stil wechseln: Presets', en: 'Switching styles: presets' },
    text: {
      de: 'Leg jeden Stil auf ein eigenes **Skill-Preset** – der globale Client hat 3. Jedes Preset hat seine eigenen Stigmen. Der Wechsel kostet nichts, geht aber nicht im Kampf und nicht, solange ein Stigma abklingt. **Skillpunkte** setzt du kostenlos und ohne Wartezeit zurück; danach wählst du die Spezialisierungen neu. Einen Daevanion-Knoten zurückzugeben kostet etwa 500 Kina. Offen ist, was ein neues Stigma kostet: Ein Spieler im globalen Client berichtet, dass jedes Preset die Stigma-Punkte für sich verteilt – dann kostet ein zweites Preset nichts. Sonst brauchst du für ein neues Stigma 5 Stigma Shards bis Stufe 5, 15 bis 10, 35 bis 15 und 75 bis 20. Schau im zweiten Preset nach, wie viele Stigma-Punkte frei sind.',
      en: 'Put each style on a **skill preset** of its own – the global client has 3. Every preset has its own stigmas. Switching costs nothing, but it does not work in combat or while a stigma is on cooldown. **Skill points** reset for free with no cooldown; afterwards you pick your specialisations again. Refunding a Daevanion node costs about 500 Kina. What a new stigma costs is still open: a player on the global client reports that every preset spreads the stigma points on its own – then a second preset costs nothing. Otherwise a new stigma takes 5 Stigma Shards to level 5, 15 to 10, 35 to 15 and 75 to 20. Check how many stigma points are free in your second preset.',
    },
  },
  { type: 'heading', text: { de: 'Schutz-Tank: sicherer Block statt Banner', en: 'Protection tank: a sure block instead of the banner' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, { de: 'Schutz-Tank', en: 'Protection tank' }],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        { de: '[[12120000|Taunt]], [[12070000|Doom Shield]], [[12230000|Noble Armor]], [[12450000|Battlefield Banner]]', en: '[[12120000|Taunt]], [[12070000|Doom Shield]], [[12230000|Noble Armor]], [[12450000|Battlefield Banner]]' },
        { de: '[[12110000|Shield of Protection]] dazu – bei schwacher Ausrüstung statt [[12450000|Battlefield Banner]]. Die Top 10 lassen dafür meist [[12120000|Taunt]] (3 Spieler) oder [[12070000|Doom Shield]] (2) weg, im Median Stufe 15', en: 'add [[12110000|Shield of Protection]] – with weak gear instead of [[12450000|Battlefield Banner]]. The top 10 mostly drop [[12120000|Taunt]] (3 players) or [[12070000|Doom Shield]] (2) for it, median level 15' },
      ],
      [
        { de: 'Gruppe schützen', en: 'Protect the group' },
        '–',
        { de: '[[12320000|Nezekan\'s Shield]] gegen einen großen Treffer auf alle (ab Stufe 10 hält der Schild 5 statt 3 s) – ein Top-10-Spieler hat es auf 20. [[12250000|Comrade in Arms]] teilt 6 s lang den Schaden eines Gruppenmitglieds mit dir', en: '[[12320000|Nezekan\'s Shield]] against one big hit on everyone (from level 10 the shield lasts 5 instead of 3 s) – one top 10 player has it at 20. [[12250000|Comrade in Arms]] shares a party member\'s damage with you for 6 s' },
      ],
      [
        { de: 'Das vorsichtigste Set der Top 10', en: 'The most careful set in the top 10' },
        '–',
        { de: '[[12070000|Doom Shield]] 20, [[12110000|Shield of Protection]] 20, [[12220000|Grapple]] 15, [[12190000|Second Skin]] 15 (+30 % PvE-Schadensresistenz) – ohne [[12120000|Taunt]] und Banner', en: '[[12070000|Doom Shield]] 20, [[12110000|Shield of Protection]] 20, [[12220000|Grapple]] 15, [[12190000|Second Skin]] 15 (+30% PvE Damage Tolerance) – with no [[12120000|Taunt]] and no banner' },
      ],
      [
        { de: 'Skills', en: 'Skills' },
        { de: '[[12720000|Warding Shield]] meist auf 1–4: die +200 Block gibt es schon auf Stufe 1', en: '[[12720000|Warding Shield]] mostly at 1–4: its +200 Block comes at level 1 already' },
        { de: '[[12720000|Warding Shield]] auf 10: Die Heilung bei jedem Block steigt von etwa 60 auf etwa 390 LP. Genau die zwei vorsichtigsten Sets der Top 10 haben das', en: '[[12720000|Warding Shield]] to 10: the heal on every block rises from about 60 to about 390 HP. Exactly the two most careful sets in the top 10 have that' },
      ],
      [
        { de: 'Werte und Ausrüstung', en: 'Stats and gear' },
        { de: 'max. LP > Verteidigung > Schadensresistenz …', en: 'Max HP > Defense > Damage Tolerance …' },
        { de: 'gleich – nichts zu tauschen', en: 'the same – nothing to swap' },
      ],
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Wechsle, solange deine Ausrüstung schwach ist, bei einem neuen Boss, den die Gruppe noch lernt, oder wenn deine Heiler nicht hinterherkommen. Sitzt der Kampf, zurück zum Kern-Build – das Banner bringt der ganzen Gruppe mehr, weil der Boss schneller fällt. **Kosten:** [[12110000|Shield of Protection]] auf Stufe 10 braucht 15 Stigma Shards, auf 15 35; [[12720000|Warding Shield]] von 1 auf 10 kostet 21 Skillpunkte, die du kostenlos umverteilen kannst. Die Ausrüstung bleibt gleich.',
      en: 'Switch while your gear is weak, on a new boss the group is still learning, or when your healers cannot keep up. Once the fight sits, go back to the core build – the banner gives the whole group more, because the boss goes down faster. **Costs:** [[12110000|Shield of Protection]] at level 10 takes 15 Stigma Shards, at 15 35; [[12720000|Warding Shield]] from 1 to 10 costs 21 skill points, which you can move around for free. Your gear stays the same.',
    },
  },
  { type: 'heading', text: { de: 'Allein farmen: Gruppen ziehen statt spotten', en: 'Solo farming: pull packs instead of taunting' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, { de: 'Allein farmen', en: 'Solo farming' }],
    rows: [
      [
        { de: '4. Stigma', en: '4th stigma' },
        '[[12120000|Taunt]]',
        { de: '[[12220000|Grapple]] – allein brauchst du keine Aggro. Auch der stärkste Templer der Top 10 spielt [[12220000|Grapple]] statt [[12120000|Taunt]]; insgesamt 3 aktiv, 2 weitere haben es bereit', en: '[[12220000|Grapple]] – alone you need no enmity. The strongest Templar of the top 10 also runs [[12220000|Grapple]] instead of [[12120000|Taunt]]; 3 active in all, 2 more have it ready' },
      ],
      [
        { de: 'Andere Wahl', en: 'Other choices' },
        '–',
        { de: '[[12410000|Executing Blade]] (Schaden auf 4 Gegner, -30 % Verteidigung) oder [[12320000|Nezekan\'s Shield]] als Notfall-Schild – beides nennt aion2-guides.info für allein. [[12310000|Empyrean Lord\'s Punishment]] betäubt bis zu 4 Monster sicher', en: '[[12410000|Executing Blade]] (damage on 4 enemies, -30% Defense) or [[12320000|Nezekan\'s Shield]] as an emergency shield – aion2-guides.info names both for solo play. [[12310000|Empyrean Lord\'s Punishment]] stuns up to 4 monsters for sure' },
      ],
      [
        { de: 'Wichtige Stigma-Stufen', en: 'Key stigma levels' },
        '–',
        { de: '[[12070000|Doom Shield]] 15: sofort wieder bereit, wenn ein Gegner stirbt · [[12220000|Grapple]] 10: Schutzschild 20 % max. LP · 15: Abklingzeit 60 statt 90 s', en: '[[12070000|Doom Shield]] 15: ready again right away when an enemy dies · [[12220000|Grapple]] 10: a shield of 20% max HP · 15: 60 instead of 90 s cooldown' },
      ],
      [
        { de: 'Spezialisierungen', en: 'Specialisations' },
        { de: 'auf Bosse ausgelegt', en: 'made for bosses' },
        { de: 'siehe unten: [[12130000|Poach]], [[12090000|Punishment]] und [[12100000|Shield Smite]] für Gruppen von Monstern', en: 'see below: [[12130000|Poach]], [[12090000|Punishment]] and [[12100000|Shield Smite]] for packs of monsters' },
      ],
      [
        { de: 'Werte und Ausrüstung', en: 'Stats and gear' },
        { de: 'Tank-Werte', en: 'tank stats' },
        { de: 'gleich – nichts zu tauschen', en: 'the same – nothing to swap' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 12130000 /* Poach */,
        parts: [12130030 /* Resets cooldown on defeating an enemy */],
        note: {
          de: 'Statt „zum Ziel springen“ (eine Wahl für Bosse): sofort wieder bereit, wenn ein Gegner stirbt – du ziehst den nächsten gleich heran.',
          en: 'Instead of “move to the target” (a pick for bosses): ready again right away when an enemy dies – you pull the next one in at once.',
        },
      },
      {
        id: 12090000 /* Punishment */,
        parts: [12090010 /* Absorbs 10% HP */, 12090040 /* Changes to mobile skill */],
        note: {
          de: 'Heilt dich bei jedem Treffer, und ab Skillstufe 12 lädst du im Laufen auf. Dafür fallen die Boss-Wahlen aus dem Kern-Build weg – gegen Monster, die schnell sterben, fehlen sie kaum.',
          en: 'Heals you on every hit, and from skill level 12 you charge while moving. The boss picks of the core build go for it – against monsters that die fast you hardly miss them.',
        },
      },
      {
        id: 12100000 /* Shield Smite */,
        parts: [12100040 /* -2s cooldown */, 12100050 /* AoE Stun */],
        note: {
          de: 'Ab Skillstufe 16 betäubt der Skill alle getroffenen Gegner statt nur das Ziel.',
          en: 'From skill level 16 the skill stuns every enemy it hits instead of only the target.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Quests, die offene Welt und das Farmen. Vor jedem Dungeon zurück – ohne [[12120000|Taunt]] kann sich der Boss jemand anderen holen. **Kosten:** [[12220000|Grapple]] auf Stufe 15 braucht 35 Stigma Shards, [[12070000|Doom Shield]] auf 15 hast du meist schon. Die Spezialisierungen wählst du kostenlos um; die Ausrüstung bleibt gleich.',
      en: 'For quests, the open world and farming. Switch back before every dungeon – without [[12120000|Taunt]] the boss can go for someone else. **Costs:** [[12220000|Grapple]] at level 15 takes 35 Stigma Shards, and you usually have [[12070000|Doom Shield]] at 15 already. You change the specialisations for free; your gear stays the same.',
    },
  },
  { type: 'heading', text: { de: 'PvP: kontrollieren und durchhalten', en: 'PvP: control and hold out' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen 1 gegen 1', en: 'Stigmas 1 vs 1' },
        { de: '[[12120000|Taunt]], [[12070000|Doom Shield]], [[12230000|Noble Armor]], [[12450000|Battlefield Banner]]', en: '[[12120000|Taunt]], [[12070000|Doom Shield]], [[12230000|Noble Armor]], [[12450000|Battlefield Banner]]' },
        { de: '[[12070000|Doom Shield]], [[12410000|Executing Blade]], [[12190000|Second Skin]], [[12230000|Noble Armor]]. aion2-guides.info nimmt [[12310000|Empyrean Lord\'s Punishment]] und das Banner statt [[12190000|Second Skin]] und [[12230000|Noble Armor]]; [[12190000|Second Skin]] dort gegen Magier', en: '[[12070000|Doom Shield]], [[12410000|Executing Blade]], [[12190000|Second Skin]], [[12230000|Noble Armor]]. aion2-guides.info takes [[12310000|Empyrean Lord\'s Punishment]] and the banner instead of [[12190000|Second Skin]] and [[12230000|Noble Armor]]; [[12190000|Second Skin]] there against casters' },
      ],
      [
        { de: 'Stigmen in der Gruppe', en: 'Stigmas in a group' },
        '–',
        { de: '[[12320000|Nezekan\'s Shield]], [[12250000|Comrade in Arms]], [[12220000|Grapple]], [[12110000|Shield of Protection]]. MetaBot tauscht gegenüber seinem PvE-Set nur [[12120000|Taunt]] und Banner gegen [[12230000|Noble Armor]] und [[12220000|Grapple]]', en: '[[12320000|Nezekan\'s Shield]], [[12250000|Comrade in Arms]], [[12220000|Grapple]], [[12110000|Shield of Protection]]. compared with its PvE set, MetaBot only swaps [[12120000|Taunt]] and the banner for [[12230000|Noble Armor]] and [[12220000|Grapple]]' },
      ],
      [
        { de: 'Skills höher', en: 'Skills higher' },
        '–',
        { de: '[[12790000|Survival Willpower]] auf 10 (+35 % Widerstand gegen Statuseffekte – 5 der Top 10 haben das schon) und [[12260000|Defiance]] (jede Stufe 1 s weniger Abklingzeit)', en: '[[12790000|Survival Willpower]] to 10 (+35% Status Effect Resist – 5 of the top 10 already have that) and [[12260000|Defiance]] (1 s less cooldown per level)' },
      ],
      [
        { de: 'Ausrüstung', en: 'Gear' },
        { de: 'PvE-Ausrüstung', en: 'PvE gear' },
        { de: 'gleich – eigene PvP-Ausrüstung ist für den globalen Client nicht bestätigt (aion2-guides.info)', en: 'the same – separate PvP gear is not confirmed for the global client (aion2-guides.info)' },
      ],
      [
        { de: 'Daevanion', en: 'Daevanion' },
        { de: 'Nezekan bis Triniel', en: 'Nezekan to Triniel' },
        { de: 'dazu **Azphel**: bezahlt mit Kampfkristallen aus dem PvP, die Werte zählen nur gegen Spieler', en: 'plus **Azphel**: paid with Battle Crystals from PvP, its stats only count against players' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 12130000 /* Poach */,
        parts: [12130020 /* -20% Status Effect Resist for 5s on hit */, 12130050 /* 50% chance to Stun for 3s */],
        note: {
          de: 'Unsere Wahl aus den Skilltexten: Das herangezogene Ziel hat 5 s lang 20 % weniger Widerstand gegen Statuseffekte – genau dann kommt [[12100000|Shield Smite]]. Ab Skillstufe 16 betäubt [[12130000|Poach]] selbst mit 50 % Chance.',
          en: 'Our pick from the skill texts: the target you pull has 20% less Status Effect Resist for 5 s – that is when [[12100000|Shield Smite]] comes. From skill level 16 [[12130000|Poach]] itself stuns with a 50% chance.',
        },
      },
      {
        id: 12270000 /* Debilitating Smash */,
        parts: [12270030 /* -60% Incoming Heal during Debilitate */],
        note: {
          de: 'Nach einem Block bekommt das Ziel 5 s lang 60 % weniger Heilung – stark, wenn ein Heiler den Gegner hochhält.',
          en: 'After a block the target gets 60% less healing for 5 s – strong when a healer keeps the enemy up.',
        },
      },
      {
        id: 12260000 /* Defiance */,
        parts: [12260030 /* Restores 20% HP on using [Defiance] */, 12260040 /* +2s Tenacity duration */, 12260050 /* +50% PvE / +25% PvP Damage Tolerance for Tenacity duration */],
        note: {
          de: '20 % LP beim Befreien und 2 s länger immun gegen Kontrolle; ab Skillstufe 16 nimmst du währenddessen auch weniger Schaden (dritter Platz ab 20).',
          en: '20% HP when you break free and 2 s longer immune to control; from skill level 16 you also take less damage during it (third slot from 20).',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Abyss, Arena und PvP in der offenen Welt – vor dem Kampf, denn im Kampf lässt sich das Preset nicht wechseln. **Kosten:** [[12410000|Executing Blade]] auf Stufe 5 (15 s weniger Abklingzeit) braucht 5 Stigma Shards, auf 10 (dazu „Entblößt“) 15; [[12190000|Second Skin]] auf 10 hält 14,5 statt 10 s und braucht ebenfalls 15. Die Skillpunkte und Spezialisierungen verteilst du kostenlos um. Die PvP-Sets sind noch umstritten – teste sie, bevor du Stigmen hochlevelst.',
      en: 'For the Abyss, the Arena and open-world PvP – before the fight, because the preset cannot be switched in combat. **Costs:** [[12410000|Executing Blade]] at level 5 (15 s less cooldown) takes 5 Stigma Shards, at 10 (plus “Exposed”) 15; [[12190000|Second Skin]] at level 10 lasts 14.5 instead of 10 s and also takes 15. You move skill points and specialisations for free. The PvP sets are still disputed – test them before you level stigmas.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Der vierte Platz der Top 10: was sie aktiv haben oder bereithalten', en: 'The fourth slot of the top 10: what they have active or keep ready' },
    caption: {
      de: 'Wie viele der Top 10 das Stigma aktiv haben oder bereithalten. „Bereit“ heißt: Es liegt in einem anderen Preset oder auf einer Leiste – AION2 Index zeigt es als ausgerüstet, aber ohne Stufe. Gold: Kern-Build, Blau: Schutz-Tank, Türkis: allein farmen. Schild des Verderbens, Edle Rüstung und Banner des Schlachtfelds haben alle zehn (je 7–8 aktiv), darum fehlen sie hier. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'How many of the top 10 have the stigma active or keep it ready. “Ready” means: it sits on another preset or a skill bar – AION2 Index shows it as equipped but without a level. Gold: core build, blue: protection tank, teal: solo farming. All ten have Doom Shield, Noble Armor and Battlefield Banner (7–8 active each), so they are left out here. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    max: 10,
    items: [
      { label: '[[12120000|Taunt]]', value: 7, display: { de: '7 von 10', en: '7 of 10' }, note: { de: '5 aktiv · 2 bereit', en: '5 active · 2 ready' }, tone: 'gold' },
      { label: '[[12110000|Shield of Protection]]', value: 6, display: { de: '6 von 10', en: '6 of 10' }, note: { de: '5 aktiv · 1 bereit', en: '5 active · 1 ready' }, tone: 'blue' },
      { label: '[[12220000|Grapple]]', value: 5, display: { de: '5 von 10', en: '5 of 10' }, note: { de: '3 aktiv · 2 bereit', en: '3 active · 2 ready' }, tone: 'teal' },
      { label: '[[12320000|Nezekan\'s Shield]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '1 aktiv · 3 bereit', en: '1 active · 3 ready' }, tone: 'blue' },
      { label: '[[12410000|Executing Blade]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '1 aktiv · 3 bereit', en: '1 active · 3 ready' }, tone: 'teal' },
      { label: '[[12310000|Empyrean Lord\'s Punishment]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '1 aktiv · 3 bereit', en: '1 active · 3 ready' }, tone: 'teal' },
      { label: '[[12190000|Second Skin]]', value: 2, display: { de: '2 von 10', en: '2 of 10' }, note: { de: '1 aktiv · 1 bereit', en: '1 active · 1 ready' }, tone: 'blue' },
      { label: '[[12250000|Comrade in Arms]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '0 aktiv · 1 bereit', en: '0 active · 1 ready' }, tone: 'blue' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://aion2-guides.info/en/templar/', label: 'AION 2 Guides – Templar (main tank, solo swaps, PvP stigmas)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (PvP swaps, party-save stigma)' },
      { href: 'https://www.oslink.io/blog/guide/aion-2-class-guide-and-tier-list.html', label: 'OSLink – Class guide and tier list (roles)' },
      { href: 'https://daevaguides.com/en/guides/stigmas-guide/', label: 'Daeva Guides – Stigma guide (shard costs, reset cost)' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, Daevanion refund)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
    ],
  },
];
