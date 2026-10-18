import type { GuideBlock } from '../types';

/**
 * Playstyles of the Gladiator: boss damage (the core build), solo farming, a group without a Templar, PvP
 * (sources: GamerBlurb, aion2-guides.info, MetaBot, Daeva Guides, oslink, Game8, AION2 Builds, Space4Games – skill data
 * of the global client – AION2 Index top 10 of 2026-10-18)
 */
export const gladiatorPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Neben dem Kern-Build für Bosse gibt es drei Spielstile, die sich lohnen: **allein farmen**, **in einer Gruppe ohne Templer** vorne stehen und **PvP**. Die drei PvE-Stile teilen sich [[11400000|Lunge Stance]], [[11390000|Rage Burst]] und [[11250000|Zikel\'s Blessing]] und unterscheiden sich im vierten Stigma-Platz und in ein paar Skillstufen. Im PvP tauschst du zwei bis drei Stigmen. Ein echter Haupt-Tank ist der Gladiator in keinem Stil.',
      en: 'Besides the core build for bosses there are three playstyles worth playing: **solo farming**, **standing in front in a group without a Templar** and **PvP**. The three PvE styles share [[11400000|Lunge Stance]], [[11390000|Rage Burst]] and [[11250000|Zikel\'s Blessing]] and differ in the fourth stigma slot and a few skill levels. In PvP you swap two to three stigmas. In no style is the Gladiator a real main tank.',
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
        title: { de: 'Boss-Schaden (Kern-Build)', en: 'Boss damage (core build)' },
        tag: { de: 'PvE · Boss', en: 'PvE · boss' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: 'Der meiste Schaden am Boss: [[11390000|Rage Burst]] schaltet [[11170000|Overhead Slam]] 10 s lang frei, [[11110000|Focused Block]] blockt sicher und startet [[11780000|Experienced Counterstrike]].', en: 'The most damage on a boss: [[11390000|Rage Burst]] unlocks [[11170000|Overhead Slam]] for 10 s, [[11110000|Focused Block]] blocks for sure and starts [[11780000|Experienced Counterstrike]].' } },
          { kind: 'pro', text: { de: 'Das spielen die Top 10: [[11400000|Lunge Stance]] und [[11390000|Rage Burst]] 10 von 10, [[11250000|Zikel\'s Blessing]] 9 von 10 aktiv.', en: 'What the top 10 play: [[11400000|Lunge Stance]] and [[11390000|Rage Burst]] 10 of 10, [[11250000|Zikel\'s Blessing]] 9 of 10 active.' } },
          { kind: 'con', text: { de: 'Keine Selbstheilung auf Knopfdruck – allein merkst du das.', en: 'No self-heal on a key – you notice that when you play alone.' } },
        ],
        verdict: { de: 'Deine Standardwahl für Dungeons und Bosse.', en: 'Your default for dungeons and bosses.' },
      },
      {
        title: { de: 'Allein farmen', en: 'Solo farming' },
        tag: { de: 'Solo · offene Welt', en: 'Solo · open world' },
        tone: 'teal',
        points: [
          { kind: 'pro', text: { de: '[[11340000|Lifestealing Blade]] trifft bis zu 4 Gegner und heilt dich dabei (absorbiert 10 % LP). Abklingzeit 90 s, ab Stigma-Stufe 15 nur 60 s.', en: '[[11340000|Lifestealing Blade]] hits up to 4 enemies and heals you (absorbs 10% HP). Cooldown 90 s, only 60 s from stigma level 15.' } },
          { kind: 'pro', text: { de: 'Mit [[11050000|Crushing Wave]] und dem Zurücksetzen von [[11190000|Leaping Slam]] bei jedem Kill räumst du Gruppen schnell ab.', en: 'With [[11050000|Crushing Wave]] and the cooldown reset of [[11190000|Leaping Slam]] on every kill you clear packs fast.' } },
          { kind: 'con', text: { de: 'Ohne [[11110000|Focused Block]] blockst du große Treffer nicht mehr sicher.', en: 'Without [[11110000|Focused Block]] you no longer block big hits for sure.' } },
        ],
        verdict: { de: 'Für Quests, offene Welt und Farmen. 3 der Top 10 spielen ihn aktiv.', en: 'For quests, the open world and farming. 3 of the top 10 run it active.' },
      },
      {
        title: { de: 'Gruppe ohne Templer', en: 'Group without a Templar' },
        tag: { de: 'PvE · Halb-Tank', en: 'PvE · semi-tank' },
        tone: 'blue',
        points: [
          { kind: 'pro', text: { de: '[[11410000|Wave Armor]]: Schadensaura auf bis zu 4 Gegner. Ab Stigma-Stufe 10 wirkt [[11780000|Experienced Counterstrike]] 1,5-mal so stark, ab 15 auch [[11800000|Murderous Burst]].', en: '[[11410000|Wave Armor]]: a damage aura on up to 4 enemies. From stigma level 10 [[11780000|Experienced Counterstrike]] works 1.5 times as strong, from 15 [[11800000|Murderous Burst]] too.' } },
          { kind: 'pro', text: { de: 'Ohne Templer zählt dein Block-Buff voll: Laut Skilltext wirkt [[11780000|Experienced Counterstrike]] nicht zusätzlich zum Templer-Passiv „Kampfrausch“.', en: 'Without a Templar your block buff counts in full: the skill text says [[11780000|Experienced Counterstrike]] does not stack with the Templar passive “Fury”.' } },
          { kind: 'con', text: { de: 'Kein Spott-Skill: Du hältst den Boss nur mit der Aggro von [[11020000|Keen Strike]], [[11010000|Rending Blow]] und [[11170000|Overhead Slam]].', en: 'No taunt: you hold the boss only with the enmity from [[11020000|Keen Strike]], [[11010000|Rending Blow]] and [[11170000|Overhead Slam]].' } },
          { kind: 'con', text: { de: 'Neben einem Templer verschenkt.', en: 'Wasted next to a Templar.' } },
        ],
        verdict: { de: 'Nur ohne Templer in der Gruppe. 3 der Top 10 aktiv, 2 weitere haben ihn bereit.', en: 'Only without a Templar in the group. 3 of the top 10 active, 2 more have it ready.' },
      },
      {
        title: { de: 'PvP', en: 'PvP' },
        tag: 'PvP',
        tone: 'rose',
        points: [
          { kind: 'pro', text: { de: '[[11080000|Blade Toss]] aus 20 m: 10 s lang -30 % Verteidigung und halbe Heilung beim Ziel – stark gegen Heiler.', en: '[[11080000|Blade Toss]] from 20 m: -30% Defense and half the healing on the target for 10 s – strong against healers.' } },
          { kind: 'pro', text: { de: '[[11380000|Tenaciousness]] (3 s immun gegen Schaden und Statuseffekte) und [[11130000|Armor of Balance]] (+50 % Widerstand gegen Schock-Effekte) halten dich im Getümmel am Leben.', en: '[[11380000|Tenaciousness]] (3 s immune to damage and status effects) and [[11130000|Armor of Balance]] (+50% Impact-type Resist) keep you alive in the thick of it.' } },
          { kind: 'con', text: { de: 'Schwer gegen Gegner, die auf Abstand bleiben (Kiten).', en: 'Hard against enemies who keep their distance (kiting).' } },
          { kind: 'con', text: { de: '[[11390000|Rage Burst]] und [[11250000|Zikel\'s Blessing]] fallen weg – dein Boss-Schaden.', en: '[[11390000|Rage Burst]] and [[11250000|Zikel\'s Blessing]] go – your boss damage.' } },
        ],
        verdict: { de: 'Auf ein zweites Preset. 4 der Top 10 halten PvP-Stigmen bereit, keiner spielt ein PvP-Set aktiv – sie sind zuerst PvE-Spieler.', en: 'On a second preset. 4 of the top 10 keep PvP stigmas ready, none runs a PvP set active – they are PvE players first.' },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'info',
    title: { de: 'Stil wechseln: Presets', en: 'Switching styles: presets' },
    text: {
      de: 'Leg jeden Stil auf ein eigenes **Skill-Preset** – der globale Client hat 3. Jedes Preset hat seine eigenen Stigmen. Der Wechsel kostet nichts, geht aber nicht im Kampf und nicht, solange ein Stigma abklingt. **Skillpunkte** setzt du kostenlos und ohne Wartezeit zurück; danach wählst du die Spezialisierungen neu. Einen Daevanion-Knoten zurückzugeben kostet etwa 500 Kina. Offen ist, was ein neues Stigma kostet: Ein Spieler im globalen Client berichtet, dass jedes Preset die Stigma-Punkte für sich verteilt – dann kostet ein zweites Preset nichts. Sonst brauchst du für ein neues Stigma 15 Stigma Shards bis Stufe 10, 35 bis 15 und 75 bis 20. Schau im zweiten Preset nach, wie viele Stigma-Punkte frei sind.',
      en: 'Put each style on a **skill preset** of its own – the global client has 3. Every preset has its own stigmas. Switching costs nothing, but it does not work in combat or while a stigma is on cooldown. **Skill points** reset for free with no cooldown; afterwards you pick your specialisations again. Refunding a Daevanion node costs about 500 Kina. What a new stigma costs is still open: a player on the global client reports that every preset spreads the stigma points on its own – then a second preset costs nothing. Otherwise a new stigma takes 15 Stigma Shards to level 10, 35 to 15 and 75 to 20. Check how many stigma points are free in your second preset.',
    },
  },
  { type: 'heading', text: { de: 'Allein farmen: Lebensraub statt Block', en: 'Solo farming: lifesteal instead of block' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, { de: 'Allein farmen', en: 'Solo farming' }],
    rows: [
      [
        { de: '4. Stigma', en: '4th stigma' },
        '[[11110000|Focused Block]]',
        { de: '[[11340000|Lifestealing Blade]] – mindestens Stufe 15 (60 statt 90 s Abklingzeit). Die drei Top-10-Spieler damit: Stufe 5, 11 und 15', en: '[[11340000|Lifestealing Blade]] – at least level 15 (60 instead of 90 s cooldown). The three top 10 players with it: level 5, 11 and 15' },
      ],
      [
        '[[11050000|Crushing Wave]]',
        { de: 'nach Bedarf – 3 der Top 10 lassen ihn auf Stufe 1', en: 'as needed – 3 of the top 10 leave it at level 1' },
        { de: 'auf 10 – alle drei mit [[11340000|Lifestealing Blade]] haben ihn mit Skillpunkten auf 6–10', en: 'to 10 – all three with [[11340000|Lifestealing Blade]] bought it to 6–10' },
      ],
      [
        { de: 'Spezialisierungen', en: 'Specialisations' },
        { de: 'wie im Kern-Build', en: 'as in the core build' },
        { de: 'Lebensraub auf [[11290000|Mocking Blade]] bleibt Pflicht, [[11190000|Leaping Slam]] behält „Abklingzeit zurück bei Kill“. Für [[11050000|Crushing Wave]] siehe unten.', en: 'Lifesteal on [[11290000|Mocking Blade]] stays a must, [[11190000|Leaping Slam]] keeps “cooldown reset on a kill”. For [[11050000|Crushing Wave]] see below.' },
      ],
      [
        { de: 'Woher die Punkte kommen', en: 'Where the points come from' },
        '–',
        { de: 'aus Skills, die du allein kaum brauchst, z. B. [[11280000|Sword Aura Rampage]] (trifft nur benommene Ziele) oder [[11300000|Aerial Snare]]', en: 'from skills you hardly need alone, e.g. [[11280000|Sword Aura Rampage]] (only hits staggered targets) or [[11300000|Aerial Snare]]' },
      ],
      [
        { de: 'Werte und Ausrüstung', en: 'Stats and gear' },
        { de: 'Schaden', en: 'damage' },
        { de: 'gleich – nichts zu tauschen', en: 'the same – nothing to swap' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 11050000 /* Crushing Wave */,
        parts: [11050030 /* Up to +20% damage when more targets hit */, 11050040 /* Resets cooldown on landing a Critical Hit */, 11050050 /* 50% chance to pull */],
        note: {
          de: 'Mehr Schaden, je mehr Gegner du triffst, und ab Skillstufe 12 ist der Skill nach einem kritischen Treffer sofort wieder bereit. Ab 16 zieht er Gegner mit 50 % Chance heran (dritter Platz ab Skillstufe 20). Brauchst du mehr Heilung, nimm statt des Schadens „Absorbiert 2 % LP“.',
          en: 'More damage the more enemies you hit, and from skill level 12 the skill is ready again right after a critical hit. From 16 it pulls enemies in with a 50% chance (third slot from skill level 20). If you need more healing, take “Absorbs 2% HP” instead of the damage.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Wechsle, sobald du allein unterwegs bist: Quests, offene Welt, Farmen. Für Bosse in der Gruppe wieder zurück zum Kern-Build. **Kosten:** [[11340000|Lifestealing Blade]] auf Stufe 15 braucht 35 Stigma Shards, wenn dein Preset sie nicht frei verteilt; [[11050000|Crushing Wave]] von 1 auf 10 kostet 21 Skillpunkte, die du kostenlos umverteilen kannst. Die Ausrüstung bleibt gleich.',
      en: 'Switch as soon as you play alone: quests, open world, farming. Go back to the core build for bosses in a group. **Costs:** [[11340000|Lifestealing Blade]] at level 15 takes 35 Stigma Shards unless your preset spreads them freely; [[11050000|Crushing Wave]] from 1 to 10 costs 21 skill points, which you can move around for free. Your gear stays the same.',
    },
  },
  { type: 'heading', text: { de: 'Gruppe ohne Templer: Wellenrüstung', en: 'Group without a Templar: Wave Armor' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, { de: 'Gruppe ohne Templer', en: 'Group without a Templar' }],
    rows: [
      [
        { de: '4. Stigma', en: '4th stigma' },
        '[[11110000|Focused Block]]',
        { de: '[[11410000|Wave Armor]], bei den Top 10 im Median Stufe 16 – zwei der drei behalten [[11250000|Zikel\'s Blessing]]', en: '[[11410000|Wave Armor]], median level 16 in the top 10 – two of the three keep [[11250000|Zikel\'s Blessing]]' },
      ],
      [
        { de: 'Du hältst den Boss', en: 'You hold the boss' },
        '–',
        { de: '[[11110000|Focused Block]] behalten und dafür [[11250000|Zikel\'s Blessing]] abgeben – so macht es einer der drei: [[11400000|Lunge Stance]], [[11410000|Wave Armor]], [[11110000|Focused Block]], [[11390000|Rage Burst]]', en: 'keep [[11110000|Focused Block]] and give up [[11250000|Zikel\'s Blessing]] instead – one of the three does that: [[11400000|Lunge Stance]], [[11410000|Wave Armor]], [[11110000|Focused Block]], [[11390000|Rage Burst]]' },
      ],
      [
        { de: 'Wichtige Stigma-Stufen', en: 'Key stigma levels' },
        '–',
        { de: '10: [[11780000|Experienced Counterstrike]] ×1,5 · 15: [[11800000|Murderous Burst]] ×1,5 · 20: wirft 10 % des erlittenen Schadens zurück', en: '10: [[11780000|Experienced Counterstrike]] ×1.5 · 15: [[11800000|Murderous Burst]] ×1.5 · 20: reflects 10% of the damage you take' },
      ],
      [
        { de: 'Skills', en: 'Skills' },
        { de: 'wie im Kern-Build', en: 'as in the core build' },
        { de: 'gleich: [[11780000|Experienced Counterstrike]], [[11800000|Murderous Burst]] und [[11710000|Survival Stance]] (+25 % max. LP auf Skillstufe 10) haben fast alle Top 10 schon auf 10', en: 'the same: almost all of the top 10 already have [[11780000|Experienced Counterstrike]], [[11800000|Murderous Burst]] and [[11710000|Survival Stance]] (+25% max HP at skill level 10) at 10' },
      ],
      [
        { de: 'Aggro', en: 'Enmity' },
        '–',
        { de: 'Greif zuerst an und halte die linke Maustaste – [[11020000|Keen Strike]], [[11010000|Rending Blow]] und [[11170000|Overhead Slam]] erhöhen deine Aggro', en: 'Attack first and keep holding the left mouse button – [[11020000|Keen Strike]], [[11010000|Rending Blow]] and [[11170000|Overhead Slam]] raise your enmity' },
      ],
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Nur wenn kein Templer dabei ist: Mit Templer überschreibt sein „Kampfrausch“ deinen Block-Buff, und [[11410000|Wave Armor]] verliert ihren Hauptnutzen. Für normale Dungeons reicht das; bei schweren Bosses ist ein Templer besser – Guides sehen den Gladiator als Off-Tank, nicht als Haupt-Tank. **Kosten:** [[11410000|Wave Armor]] auf Stufe 15 braucht 35 Stigma Shards, auf 20 75. Skillpunkte und Ausrüstung bleiben gleich.',
      en: 'Only when there is no Templar: with one, its “Fury” overrides your block buff and [[11410000|Wave Armor]] loses its main use. That is enough for normal dungeons; for hard bosses a Templar is better – guides see the Gladiator as an off-tank, not a main tank. **Costs:** [[11410000|Wave Armor]] at level 15 takes 35 Stigma Shards, at 20 75. Skill points and gear stay the same.',
    },
  },
  { type: 'heading', text: { de: 'PvP: ran an den Gegner und überleben', en: 'PvP: reach the enemy and survive' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        { de: '[[11400000|Lunge Stance]], [[11250000|Zikel\'s Blessing]], [[11390000|Rage Burst]], [[11110000|Focused Block]]', en: '[[11400000|Lunge Stance]], [[11250000|Zikel\'s Blessing]], [[11390000|Rage Burst]], [[11110000|Focused Block]]' },
        { de: '[[11400000|Lunge Stance]] (Stufe 20), [[11130000|Armor of Balance]], [[11380000|Tenaciousness]] – dazu im Abyss und in der offenen Welt [[11080000|Blade Toss]], in der Arena [[11110000|Focused Block]] gegen große Skills', en: '[[11400000|Lunge Stance]] (level 20), [[11130000|Armor of Balance]], [[11380000|Tenaciousness]] – plus [[11080000|Blade Toss]] in the Abyss and open world, [[11110000|Focused Block]] in the Arena against big skills' },
      ],
      [
        { de: 'Skills höher', en: 'Skills higher' },
        '–',
        { de: '[[11290000|Mocking Blade]] (niederwerfen), [[11300000|Aerial Snare]] (Luftbann), [[11260000|Defiance]] (jede Stufe 1 s weniger Abklingzeit), [[11790000|Survival Willpower]] (+35 % Widerstand gegen Statuseffekte auf Skillstufe 10 – 6 der Top 10 haben ihn schon auf 10)', en: '[[11290000|Mocking Blade]] (knockdown), [[11300000|Aerial Snare]] (Airborne), [[11260000|Defiance]] (1 s less cooldown per level), [[11790000|Survival Willpower]] (+35% Status Effect Resist at skill level 10 – 6 of the top 10 already have it at 10)' },
      ],
      [
        { de: 'Skills niedriger', en: 'Skills lower' },
        '–',
        { de: '[[11280000|Sword Aura Rampage]] und [[11050000|Crushing Wave]]', en: '[[11280000|Sword Aura Rampage]] and [[11050000|Crushing Wave]]' },
      ],
      [
        { de: 'Werte', en: 'Stats' },
        { de: 'Wucht, Kampftempo, Krit.', en: 'Double Chance, Combat Speed, crit' },
        { de: 'Präzision zuerst, dann Chance auf Statuseffekte, PvP-Schaden, Krit. und Kampftempo; zum Überleben LP, PvP-Schadensresistenz und Widerstand gegen Statuseffekte', en: 'Accuracy first, then Status Effect Chance, PvP damage, crit and Combat Speed; for survival HP, PvP Damage Tolerance and Status Effect Resist' },
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
        id: 11290000 /* Mocking Blade */,
        parts: [11290030 /* Adds 2 additional strikes */, 11290040 /* +1s Knockdown duration */, 11290050 /* Ignores Block and Evasion and lands as Multi-Hit */],
        note: {
          de: 'Zwei Extra-Schläge, ab Skillstufe 12 eine Sekunde länger am Boden – Zeit für [[11170000|Overhead Slam]] und [[11300000|Aerial Snare]]. Ab 16 ignoriert der Skill Block und Ausweichen (dritter Platz ab 20). Im PvE nimmst du hier den Lebensraub.',
          en: 'Two extra strikes, from skill level 12 one second longer on the ground – time for [[11170000|Overhead Slam]] and [[11300000|Aerial Snare]]. From 16 the skill ignores Block and Evasion (third slot from 20). In PvE you take the lifesteal here.',
        },
      },
      {
        id: 11360000 /* Rush Strike */,
        parts: [11360020 /* +10m Range */, 11360040 /* -10s cooldown */, 11360050 /* +25% Knockdown Chance */],
        note: {
          de: 'Mehr Reichweite und 10 s weniger Abklingzeit; ab Skillstufe 16 +25 % Chance, Spieler niederzuwerfen.',
          en: 'More range and 10 s less cooldown; from skill level 16 +25% chance to knock players down.',
        },
      },
      {
        id: 11260000 /* Defiance */,
        parts: [11260030 /* Restores 20% HP on using [Defiance] */, 11260040 /* +2s Tenacity duration */, 11260050 /* +50% PvE / +25% PvP Damage Tolerance for Tenacity duration */],
        note: {
          de: '20 % LP beim Befreien und 2 s länger immun gegen Kontrolle. Ab Skillstufe 16 nimmst du währenddessen auch weniger Schaden (dritter Platz ab 20).',
          en: '20% HP when you break free and 2 s longer immune to control. From skill level 16 you also take less damage during it (third slot from 20).',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Abyss, Arena und PvP in der offenen Welt – vor dem Kampf, denn im Kampf lässt sich das Preset nicht wechseln. [[11130000|Armor of Balance]] wirkst du, bevor du in eine Gruppe springst, nicht danach. **Kosten:** [[11130000|Armor of Balance]] und [[11380000|Tenaciousness]] auf Stufe 10 brauchen je 15 Stigma Shards ([[11380000|Tenaciousness]] hat dann 132 statt 150 s Abklingzeit, auf Stufe 20 112 s). Die Skillpunkte verteilst du kostenlos um. Eine eigene PvP-Ausrüstung raten die Guides für Season 1 nicht – behalte deine PvE-Ausrüstung.',
      en: 'For the Abyss, the Arena and open-world PvP – before the fight, because the preset cannot be switched in combat. Cast [[11130000|Armor of Balance]] before you jump into a group, not after. **Costs:** [[11130000|Armor of Balance]] and [[11380000|Tenaciousness]] at level 10 take 15 Stigma Shards each ([[11380000|Tenaciousness]] then has a 132 s cooldown instead of 150 s, 112 s at level 20). You move the skill points for free. Guides do not advise separate PvP gear for Season 1 – keep your PvE gear.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Was die Top 10 neben den drei Kern-Stigmen bereithalten', en: 'What the top 10 keep ready besides the three core stigmas' },
    caption: {
      de: 'Wie viele der Top 10 das Stigma aktiv haben oder bereithalten. „Bereit“ heißt: Es liegt in einem anderen Preset oder auf einer Leiste – AION2 Index zeigt es als ausgerüstet, aber ohne Stufe. Gold: Kern-Build, Türkis: allein farmen, Blau: Gruppe ohne Templer, Rot: PvP. [[11080000|Blade Toss]] spielt der eine Spieler mit aktivem Stigma in einem PvE-Set (die -30 % Verteidigung helfen auch am Boss). Die drei Kern-Stigmen haben alle zehn. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'How many of the top 10 have the stigma active or keep it ready. “Ready” means: it sits on another preset or a skill bar – AION2 Index shows it as equipped but without a level. Gold: core build, teal: solo farming, blue: group without a Templar, red: PvP. The one player with [[11080000|Blade Toss]] active runs it in a PvE set (the -30% Defense helps on a boss too). All ten have the three core stigmas. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    max: 10,
    items: [
      { label: '[[11110000|Focused Block]]', value: 6, display: { de: '6 von 10', en: '6 of 10' }, note: { de: '4 aktiv · 2 bereit', en: '4 active · 2 ready' }, tone: 'gold' },
      { label: '[[11410000|Wave Armor]]', value: 5, display: { de: '5 von 10', en: '5 of 10' }, note: { de: '3 aktiv · 2 bereit', en: '3 active · 2 ready' }, tone: 'blue' },
      { label: '[[11340000|Lifestealing Blade]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '3 aktiv · 1 bereit', en: '3 active · 1 ready' }, tone: 'teal' },
      { label: '[[11080000|Blade Toss]]', value: 3, display: { de: '3 von 10', en: '3 of 10' }, note: { de: '1 aktiv · 2 bereit', en: '1 active · 2 ready' }, tone: 'rose' },
      { label: '[[11380000|Tenaciousness]]', value: 2, display: { de: '2 von 10', en: '2 of 10' }, note: { de: '0 aktiv · 2 bereit', en: '0 active · 2 ready' }, tone: 'rose' },
      { label: '[[11130000|Armor of Balance]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '0 aktiv · 1 bereit', en: '0 active · 1 ready' }, tone: 'rose' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://gamerblurb.com/guides/aion-2-gladiator-build-guide-pve-and-pvp', label: 'GamerBlurb – Gladiator build guide: PvE and PvP' },
      { href: 'https://aion2-guides.info/en/gladiator/', label: 'AION 2 Guides – Gladiator (PvE, Arena, Abyss, group variants)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (PvP swaps, off-tank note)' },
      { href: 'https://daevaguides.com/en/guides/stigmas-guide/', label: 'Daeva Guides – Stigma guide (shard costs, reset cost)' },
      { href: 'https://www.oslink.io/blog/guide/aion-2-class-guide-and-tier-list.html', label: 'OSLink – Class guide and tier list (roles)' },
      { href: 'https://game8.co/games/Aion-2/archives/629160', label: 'Game8 – How to respec skills and Daevanion' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, Daevanion refund)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
    ],
  },
];
