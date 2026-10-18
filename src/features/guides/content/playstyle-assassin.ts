import type { GuideBlock } from '../types';

/**
 * Playstyles of the Assassin: boss burst (the core build), PvP hunter, open world with evasion
 * (sources: GamerBlurb, aion2-guides.info, MetaBot, OSLink, Daeva Guides, Game8, AION2 Builds, Space4Games – skill data
 * of the global client – AION2 Index top 10 of 2026-10-18)
 */
export const assassinPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Der Assassine hat drei Spielstile, die sich lohnen: den **Boss-Burst** des Kern-Builds, den **PvP-Jäger** aus der Tarnung und einen sicheren Stil für die **offene Welt** mit Ausweichen. Alle drei behalten [[13310000|Illusive Clone]]; sie unterscheiden sich in zwei Stigmen und darin, ob deine Skillpunkte in Boss-Skills oder in Kontrolle stecken.',
      en: 'The Assassin has three playstyles worth playing: the **boss burst** of the core build, the **PvP hunter** out of stealth and a safe style for the **open world** built on evasion. All three keep [[13310000|Illusive Clone]]; they differ in two stigmas and in whether your skill points go into boss skills or into control.',
    },
  },
  {
    type: 'compare',
    title: { de: 'Drei Spielstile im Vergleich', en: 'Three playstyles compared' },
    caption: {
      de: 'Zahlen der Top 10: AION2 Index, 18.10.2026. „Aktiv“ = im Stigma-Set, das die Seite beim Lesen zeigte; „bereit“ = in einem anderen Preset oder auf einer Leiste.',
      en: 'Top 10 numbers: AION2 Index, 18 Oct 2026. “Active” = in the stigma set the site showed when it was read; “ready” = on another preset or a skill bar.',
    },
    items: [
      {
        title: { de: 'Boss-Burst (Kern-Build)', en: 'Boss burst (core build)' },
        tag: { de: 'PvE · Boss', en: 'PvE · boss' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: '[[13310000|Illusive Clone]] nimmt [[13350000|Heart Gore]] die Abklingzeit und gibt 20 % Extra-Schaden – 10 s lang, 14,5 s auf Stigma-Stufe 10.', en: '[[13310000|Illusive Clone]] removes the cooldown of [[13350000|Heart Gore]] and adds 20% extra damage – for 10 s, 14.5 s at stigma level 10.' } },
          { kind: 'pro', text: { de: '[[13270000|Savage Fang]] setzt 5 Insignien auf einmal und füllt die Taumel-Leiste stark; [[13390000|Swift Contract]] gibt +20 % Kampftempo.', en: '[[13270000|Savage Fang]] puts 5 Insignias on at once and fills the stagger gauge a lot; [[13390000|Swift Contract]] gives +20% Combat Speed.' } },
          { kind: 'con', text: { de: 'Dein Schaden hängt an einem Fenster alle 90 s und an Angriffen von hinten.', en: 'Your damage hangs on one window every 90 s and on attacks from behind.' } },
        ],
        verdict: { de: 'Standard für Dungeons und Bosse. 6 der Top 10 spielen genau diese vier Stigmen.', en: 'The default for dungeons and bosses. 6 of the top 10 run exactly these four stigmas.' },
      },
      {
        title: { de: 'PvP-Jäger', en: 'PvP hunter' },
        tag: 'PvP',
        tone: 'rose',
        points: [
          { kind: 'pro', text: { de: '[[13180000|Shadow Walk]]: 20 s getarnt (Tarnung = für Gegner unsichtbar), du bestimmst den Start. Ab Stigma-Stufe 5 ist der erste Angriff aus der Tarnung sicher kritisch, ab 15 geht es auch im Kampf.', en: '[[13180000|Shadow Walk]]: 20 s of Stealth (invisible to enemies), you pick the start. From stigma level 5 the first attack out of stealth is a sure crit, from 15 it also works in combat.' } },
          { kind: 'pro', text: { de: 'Eine Kontroll-Kette: [[13070000|Shadowstrike]] betäubt 3 s, [[13220000|Shadow Fall]] wirft das betäubte Ziel 3 s nieder.', en: 'A control chain: [[13070000|Shadowstrike]] stuns for 3 s, [[13220000|Shadow Fall]] knocks the stunned target down for 3 s.' } },
          { kind: 'con', text: { de: '[[13390000|Swift Contract]] und [[13270000|Savage Fang]] fallen weg (bei MetaBot nur [[13270000|Savage Fang]]) – am Boss fehlt dir Schaden.', en: '[[13390000|Swift Contract]] and [[13270000|Savage Fang]] go (with MetaBot only [[13270000|Savage Fang]]) – you lack damage on a boss.' } },
        ],
        verdict: { de: 'Auf ein zweites Preset. Einer der Top 10 spielt genau das PvP-Set des Guides aktiv, 6 haben [[13180000|Shadow Walk]] aktiv oder bereit.', en: 'On a second preset. One of the top 10 runs exactly the guide\'s PvP set active, 6 have [[13180000|Shadow Walk]] active or ready.' },
      },
      {
        title: { de: 'Offene Welt mit Ausweichen', en: 'Open world with evasion' },
        tag: { de: 'Solo · Farmen', en: 'Solo · farming' },
        tone: 'teal',
        points: [
          { kind: 'pro', text: { de: '[[13020000|Throw Shadowblade]] trifft aus 20 m, ist ab Stigma-Stufe 10 nach jedem Kill sofort wieder bereit und trifft ab 20 mehrere Gegner.', en: '[[13020000|Throw Shadowblade]] hits from 20 m, is ready again right after every kill from stigma level 10 and hits several enemies from 20.' } },
          { kind: 'pro', text: { de: '[[13080000|Evasion Stance]] weicht allem sicher aus; danach betäubt [[13210000|Whirlwind Slice]] Monster sicher, und [[13710000|Heightened Sixth Sense]] heilt dich bei jedem Ausweichen.', en: '[[13080000|Evasion Stance]] evades everything for sure; after that [[13210000|Whirlwind Slice]] stuns monsters for sure, and [[13710000|Heightened Sixth Sense]] heals you on every evasion.' } },
          { kind: 'con', text: { de: '[[13300000|Triniel\'s Dagger]] und [[13270000|Savage Fang]] fallen weg – weniger Burst.', en: '[[13300000|Triniel\'s Dagger]] and [[13270000|Savage Fang]] go – less burst.' } },
        ],
        verdict: { de: 'Für Farmen, Quests und das Leveln. 2 der Top 10 spielen [[13080000|Evasion Stance]] aktiv, 8 haben [[13020000|Throw Shadowblade]] aktiv oder bereit.', en: 'For farming, quests and levelling. 2 of the top 10 run [[13080000|Evasion Stance]] active, 8 have [[13020000|Throw Shadowblade]] active or ready.' },
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
  { type: 'heading', text: { de: 'PvP-Jäger: aus der Tarnung zuschlagen', en: 'PvP hunter: strike out of stealth' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        { de: '[[13310000|Illusive Clone]], [[13390000|Swift Contract]], [[13300000|Triniel\'s Dagger]], [[13270000|Savage Fang]]', en: '[[13310000|Illusive Clone]], [[13390000|Swift Contract]], [[13300000|Triniel\'s Dagger]], [[13270000|Savage Fang]]' },
        { de: '[[13310000|Illusive Clone]], [[13180000|Shadow Walk]], [[13020000|Throw Shadowblade]], [[13300000|Triniel\'s Dagger]] – das PvP-Set des Guides. Ein Top-10-Spieler spielt es aktiv: [[13310000|Illusive Clone]] 20, [[13300000|Triniel\'s Dagger]] 20, [[13020000|Throw Shadowblade]] 17, [[13180000|Shadow Walk]] 15', en: '[[13310000|Illusive Clone]], [[13180000|Shadow Walk]], [[13020000|Throw Shadowblade]], [[13300000|Triniel\'s Dagger]] – the guide\'s PvP set. One top 10 player runs it active: [[13310000|Illusive Clone]] 20, [[13300000|Triniel\'s Dagger]] 20, [[13020000|Throw Shadowblade]] 17, [[13180000|Shadow Walk]] 15' },
      ],
      [
        { de: 'Andere Wahl', en: 'Other choices' },
        '–',
        { de: '[[13230000|Aerial Bind]] (Luftbann, sicher bei 5 Insignien) und [[13370000|Evasion Contract]] (löst Trägheit und Bann) nennen GamerBlurb und aion2-guides.info. In Duellen [[13250000|Smoke Bomb]] (Blind) statt [[13180000|Shadow Walk]], gegen gebuffte Gegner [[13280000|Spiral Slice]] (entfernt Buffs)', en: '[[13230000|Aerial Bind]] (Airborne, for sure at 5 Insignias) and [[13370000|Evasion Contract]] (removes Slow and Root) are named by GamerBlurb and aion2-guides.info. In duels [[13250000|Smoke Bomb]] (Blind) instead of [[13180000|Shadow Walk]], against buffed enemies [[13280000|Spiral Slice]] (removes buffs)' },
      ],
      [
        { de: 'Skills höher', en: 'Skills higher' },
        '–',
        { de: '[[13220000|Shadow Fall]] (Niederwerfen nach der Betäubung), [[13210000|Whirlwind Slice]] (40 % Betäubung gegen Spieler) und [[13260000|Defiance]] (jede Stufe 1 s weniger Abklingzeit)', en: '[[13220000|Shadow Fall]] (knockdown after the stun), [[13210000|Whirlwind Slice]] (a 40% stun against players) and [[13260000|Defiance]] (1 s less cooldown per level)' },
      ],
      [
        { de: 'Skills niedriger', en: 'Skills lower' },
        '–',
        { de: '[[13340000|Storm Rampage]]: trifft nur benommene Ziele (Bosse nach voller Taumel-Leiste). Genau die drei Top-10-Spieler ohne Boss-Set lassen ihn auf Stufe 1, alle anderen haben ihn auf 10', en: '[[13340000|Storm Rampage]]: only hits staggered targets (bosses after a full stagger gauge). Exactly the three top 10 players without a boss set leave it at level 1, all others have it at 10' },
      ],
      [
        { de: 'Passive', en: 'Passives' },
        { de: 'Schaden', en: 'damage' },
        { de: '[[13730000|Apply Poison]] für weniger Heilung beim Ziel (-30 % auf Skillstufe 10, 15 % Chance pro Treffer) – nur im PvP sinnvoll. [[13790000|Revitalization Contract]] auf 10: +35 % Widerstand gegen Statuseffekte und 44 % LP zurück, wenn du unter 10 % fällst', en: '[[13730000|Apply Poison]] for less healing on the target (-30% at skill level 10, 15% chance per hit) – only worth it in PvP. [[13790000|Revitalization Contract]] to 10: +35% Status Effect Resist and 44% HP back when you drop below 10%' },
      ],
      [
        { de: 'Werte', en: 'Stats' },
        { de: 'Krit. > Krit.-Schadensverstärkung > Angriff …', en: 'Critical Hit > Critical Damage Boost > Attack …' },
        { de: 'Präzision zuerst, dann LP und PvP-Schadensresistenz, dann Widerstand gegen Statuseffekte, danach Krit., Krit.-Schaden und Kampftempo (GamerBlurb). Ausrüstung: deine PvE-Ausrüstung reicht', en: 'Accuracy first, then HP and PvP Damage Tolerance, then Status Effect Resist, then crit, crit damage and Combat Speed (GamerBlurb). Gear: your PvE gear will do' },
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
        id: 13070000 /* Shadowstrike */,
        parts: [13070010 /* +1s Stun duration */, 13070030 /* 50% chance to inflict Seal for 5s on hit */, 13070040 /* 50% chance to inflict Root for 5s on hit */],
        note: {
          de: 'Länger betäubt, dazu mit 50 % Chance Siegel (5 s keine Skills) oder ab Skillstufe 12 Bann (5 s festgehalten). [[13260000|Defiance]] löst beides nicht. Der dritte Platz kommt mit Skillstufe 20.',
          en: 'A longer stun, plus a 50% chance of Seal (no skills for 5 s) or, from skill level 12, Root (held in place for 5 s). [[13260000|Defiance]] removes neither. The third slot comes at skill level 20.',
        },
      },
      {
        id: 13220000 /* Shadow Fall */,
        parts: [13220020 /* Engraves 3 Insignias for 10s on hit */, 13220040 /* +1s Knockdown duration */, 13220050 /* Can be used on targets afflicted with Blind */],
        note: {
          de: '3 Insignien bringen dich schneller zu den 5 für [[13230000|Aerial Bind]], ab Skillstufe 12 liegt das Ziel 1 s länger. Ab 16 geht der Skill auch nach [[13250000|Smoke Bomb]] (Blind).',
          en: '3 Insignias get you to the 5 for [[13230000|Aerial Bind]] faster, from skill level 12 the target stays down 1 s longer. From 16 the skill also works after [[13250000|Smoke Bomb]] (Blind).',
        },
      },
      {
        id: 13260000 /* Defiance */,
        parts: [13260030 /* Restores 20% HP on using [Defiance] */, 13260040 /* +2s Tenacity duration */, 13260050 /* +50% PvE / +25% PvP Damage Tolerance for Tenacity duration */],
        note: {
          de: '20 % LP beim Befreien und 2 s länger immun gegen Kontrolle; ab Skillstufe 16 nimmst du währenddessen auch weniger Schaden.',
          en: '20% HP when you break free and 2 s longer immune to control; from skill level 16 you also take less damage during it.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Abyss, Arena und PvP in der offenen Welt – vor dem Kampf, denn im Kampf lässt sich das Preset nicht wechseln. **Kosten:** [[13180000|Shadow Walk]] auf Stufe 15 (im Kampf nutzbar) braucht 35 Stigma Shards, [[13020000|Throw Shadowblade]] auf 10 braucht 15. Die Skillpunkte von [[13340000|Storm Rampage]] (21 von Stufe 1 bis 10) reichen genau für [[13220000|Shadow Fall]] oder [[13210000|Whirlwind Slice]] auf 10 – kostenlos umverteilt. Eigene PvP-Ausrüstung brauchst du laut aion2-guides.info nicht.',
      en: 'For the Abyss, the Arena and open-world PvP – before the fight, because the preset cannot be switched in combat. **Costs:** [[13180000|Shadow Walk]] at level 15 (usable in combat) takes 35 Stigma Shards, [[13020000|Throw Shadowblade]] at 10 takes 15. The skill points from [[13340000|Storm Rampage]] (21 from level 1 to 10) pay exactly for [[13220000|Shadow Fall]] or [[13210000|Whirlwind Slice]] at 10 – moved for free. According to aion2-guides.info you do not need separate PvP gear.',
    },
  },
  { type: 'heading', text: { de: 'Offene Welt: werfen, ausweichen, weiter', en: 'Open world: throw, evade, move on' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, { de: 'Offene Welt', en: 'Open world' }],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        { de: '[[13310000|Illusive Clone]], [[13390000|Swift Contract]], [[13300000|Triniel\'s Dagger]], [[13270000|Savage Fang]]', en: '[[13310000|Illusive Clone]], [[13390000|Swift Contract]], [[13300000|Triniel\'s Dagger]], [[13270000|Savage Fang]]' },
        { de: '[[13310000|Illusive Clone]] und [[13390000|Swift Contract]] bleiben, dazu [[13020000|Throw Shadowblade]] (mindestens Stufe 10) und [[13080000|Evasion Stance]]. So spielt es ein Top-10-Spieler: [[13020000|Throw Shadowblade]] 20, [[13080000|Evasion Stance]] 10', en: '[[13310000|Illusive Clone]] and [[13390000|Swift Contract]] stay, plus [[13020000|Throw Shadowblade]] (at least level 10) and [[13080000|Evasion Stance]]. One top 10 player runs it like this: [[13020000|Throw Shadowblade]] 20, [[13080000|Evasion Stance]] 10' },
      ],
      [
        { de: 'Wichtige Stigma-Stufen', en: 'Key stigma levels' },
        '–',
        { de: '[[13020000|Throw Shadowblade]] 10: nach einem Kill sofort wieder bereit · 20: trifft mehrere Gegner · [[13080000|Evasion Stance]] 5: zweimal hintereinander · 10: im Laufen nutzbar', en: '[[13020000|Throw Shadowblade]] 10: ready again right after a kill · 20: hits several enemies · [[13080000|Evasion Stance]] 5: twice in a row · 10: usable while moving' },
      ],
      [
        { de: 'Skills', en: 'Skills' },
        { de: '[[13340000|Storm Rampage]] auf 10, [[13210000|Whirlwind Slice]] meist auf 1', en: '[[13340000|Storm Rampage]] at 10, [[13210000|Whirlwind Slice]] mostly at 1' },
        { de: 'umgekehrt: [[13210000|Whirlwind Slice]] auf 10, [[13340000|Storm Rampage]] auf 1 – genau so haben es die beiden Top-10-Spieler mit [[13080000|Evasion Stance]]. [[13710000|Heightened Sixth Sense]] auf 10: etwa 560–670 LP bei jedem Ausweichen (höchstens alle 3 s)', en: 'the other way round: [[13210000|Whirlwind Slice]] at 10, [[13340000|Storm Rampage]] at 1 – exactly what the two top 10 players with [[13080000|Evasion Stance]] do. [[13710000|Heightened Sixth Sense]] at 10: about 560–670 HP on every evasion (at most every 3 s)' },
      ],
      [
        { de: 'Gegen Trägheit und Bann', en: 'Against Slow and Root' },
        '–',
        { de: '[[13370000|Evasion Contract]] statt [[13080000|Evasion Stance]], wenn dich Monster oft festhalten – der Tausch, den GamerBlurb fürs Leveln nennt', en: '[[13370000|Evasion Contract]] instead of [[13080000|Evasion Stance]] when monsters often hold you in place – the swap GamerBlurb names for levelling' },
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
        id: 13210000 /* Whirlwind Slice */,
        parts: [13210020 /* Changes to AoE damage */, 13210050 /* 25% chance to reset [Whirlwind Slice] cooldown on Evasion */],
        note: {
          de: 'Trifft alle Gegner um dich herum, und ab Skillstufe 16 ist der Skill nach einem Ausweichen mit 25 % Chance gleich wieder bereit.',
          en: 'Hits every enemy around you, and from skill level 16 the skill has a 25% chance to be ready again right after an evasion.',
        },
      },
      {
        id: 13220000 /* Shadow Fall */,
        parts: [13220010 /* Absorbs 10% HP */],
        note: {
          de: 'Nach der Betäubung durch [[13210000|Whirlwind Slice]] springst du hin und holst dir 10 % LP zurück.',
          en: 'After the stun from [[13210000|Whirlwind Slice]] you jump in and take 10% HP back.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Farmen, Quests und das Leveln, vor allem wenn dir Gegner von vorne oft zu viel Schaden machen. Für Bosse zurück zum Kern-Build: [[13020000|Throw Shadowblade]] ist laut aion2-guides.info zum Farmen da, nicht für Bosse. **Kosten:** [[13020000|Throw Shadowblade]] auf 10 braucht 15 Stigma Shards, [[13080000|Evasion Stance]] auf 10 ebenfalls 15. Die 21 Skillpunkte für [[13210000|Whirlwind Slice]] kommen kostenlos aus [[13340000|Storm Rampage]]. Die Ausrüstung bleibt gleich.',
      en: 'For farming, quests and levelling, above all when enemies hit you too hard from the front. Go back to the core build for bosses: according to aion2-guides.info, [[13020000|Throw Shadowblade]] is for farming, not for bosses. **Costs:** [[13020000|Throw Shadowblade]] at 10 takes 15 Stigma Shards, [[13080000|Evasion Stance]] at 10 also 15. The 21 skill points for [[13210000|Whirlwind Slice]] come from [[13340000|Storm Rampage]] for free. Your gear stays the same.',
    },
  },
  {
    type: 'callout',
    tone: 'warn',
    title: { de: 'Lohnt sich nicht: Flächen- und Gift-Assassine', en: 'Not worth it: AoE and poison Assassin' },
    text: {
      de: '**Flächen-Build:** Dein Schaden kommt von einem Ziel und von hinten. Es gibt einzelne Flächen-Spezialisierungen (z. B. auf [[13210000|Whirlwind Slice]]), aber keinen Guide und keinen Top-10-Spieler, der darauf baut. **Gift-Build:** [[13730000|Apply Poison]] wirkt nur mit 15 % Chance pro Treffer; aion2-guides.info sieht es im PvE bei unter 1 % deines Schadens. Nimm es nur im PvP, wegen der geringeren Heilung beim Ziel.',
      en: '**AoE build:** your damage comes from one target and from behind. There are single AoE specialisations (e.g. on [[13210000|Whirlwind Slice]]), but no guide and no top 10 player builds on them. **Poison build:** [[13730000|Apply Poison]] only works with a 15% chance per hit; aion2-guides.info puts it below 1% of your damage in PvE. Take it only in PvP, for the reduced healing on the target.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Stigmen der Top 10 neben Illusion und Pakt der Flinkheit', en: 'Top 10 stigmas besides Illusive Clone and Swift Contract' },
    caption: {
      de: 'Wie viele der Top 10 das Stigma aktiv haben oder bereithalten. „Bereit“ heißt: Es liegt in einem anderen Preset oder auf einer Leiste – AION2 Index zeigt es als ausgerüstet, aber ohne Stufe. Gold: Kern-Build, Rot: PvP, Türkis: offene Welt, Grau: in beiden Stilen. [[13310000|Illusive Clone]] und [[13390000|Swift Contract]] haben alle zehn. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'How many of the top 10 have the stigma active or keep it ready. “Ready” means: it sits on another preset or a skill bar – AION2 Index shows it as equipped but without a level. Gold: core build, red: PvP, teal: open world, grey: in both styles. All ten have [[13310000|Illusive Clone]] and [[13390000|Swift Contract]]. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    max: 10,
    items: [
      { label: '[[13300000|Triniel\'s Dagger]]', value: 9, display: { de: '9 von 10', en: '9 of 10' }, note: { de: '7 aktiv · 2 bereit', en: '7 active · 2 ready' }, tone: 'gold' },
      { label: '[[13270000|Savage Fang]]', value: 9, display: { de: '9 von 10', en: '9 of 10' }, note: { de: '7 aktiv · 2 bereit', en: '7 active · 2 ready' }, tone: 'gold' },
      { label: '[[13020000|Throw Shadowblade]]', value: 8, display: { de: '8 von 10', en: '8 of 10' }, note: { de: '2 aktiv · 6 bereit', en: '2 active · 6 ready' }, tone: 'slate' },
      { label: '[[13180000|Shadow Walk]]', value: 6, display: { de: '6 von 10', en: '6 of 10' }, note: { de: '2 aktiv · 4 bereit', en: '2 active · 4 ready' }, tone: 'rose' },
      { label: '[[13080000|Evasion Stance]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '2 aktiv · 2 bereit', en: '2 active · 2 ready' }, tone: 'teal' },
      { label: '[[13230000|Aerial Bind]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '1 aktiv · 0 bereit', en: '1 active · 0 ready' }, tone: 'rose' },
      { label: '[[13370000|Evasion Contract]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '0 aktiv · 1 bereit', en: '0 active · 1 ready' }, tone: 'slate' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://gamerblurb.com/guides/aion-2-assassin-build-guide-pve-pvp-leveling-global', label: 'GamerBlurb – Assassin build guide: PvE, PvP and levelling (global)' },
      { href: 'https://aion2-guides.info/en/assassin/', label: 'AION 2 Guides – Assassin (boss build, farming, PvP, traps)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (PvP swaps)' },
      { href: 'https://www.oslink.io/blog/guide/aion-2-class-guide-and-tier-list.html', label: 'OSLink – Class guide and tier list (roles)' },
      { href: 'https://daevaguides.com/en/guides/stigmas-guide/', label: 'Daeva Guides – Stigma guide (shard costs, reset cost)' },
      { href: 'https://game8.co/games/Aion-2/archives/629160', label: 'Game8 – How to respec skills and Daevanion' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, Daevanion refund)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
    ],
  },
];
