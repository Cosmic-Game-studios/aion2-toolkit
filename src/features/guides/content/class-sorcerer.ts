import { classGuide } from './classGuide';

/** Beginner guide for the Sorcerer: ranged fire and ice damage, burst windows and MP. */
export const sorcererGuide = classGuide({
  id: 'sorcerer',
  cls: 'Sorcerer',
  tone: 'blue',
  title: { de: 'Magier-Guide', en: 'Sorcerer guide' },
  summary: {
    de: 'Der Magier macht aus der Ferne großen Feuer- und Eisschaden. Hier lernst du, welche Skills zählen, wie die Rotation läuft und wie du Leiste und Makro belegst.',
    en: 'The Sorcerer deals big fire and ice damage from range. Learn which skills matter, how the rotation works and how to set up your hotbar and macro.',
  },
  tags: [
    { de: 'Fernkampf-Schaden', en: 'Ranged damage' },
    { de: 'Flächenschaden', en: 'Area damage' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-15',
  glance: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: 'Schaden aus der Ferne – starke Einzeltreffer und Flächenschaden', en: 'Damage from range – big single hits and area damage' } },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: 'Mittel – du achtest auf deine MP und lädst [[15060000|Hellfire]] auf', en: 'Medium – you watch your MP and charge [[15060000|Hellfire]]' } },
    { label: { de: 'Reichweite', en: 'Range' }, value: { de: '20 m', en: '20 m' } },
    { label: { de: 'Stärken', en: 'Strengths' }, value: { de: 'Sehr viel Schaden in kurzer Zeit, viele Skills treffen bis zu 4 Gegner, bremst Gegner und hält sie fest', en: 'A lot of damage in a short time, many skills hit up to 4 enemies, slows enemies and holds them in place' } },
    { label: { de: 'Schwächen', en: 'Weaknesses' }, value: { de: 'Hält wenig aus, braucht viel **MP** (Mana für Skills), der stärkste Skill muss aufgeladen werden', en: 'Fragile, needs a lot of **MP** (mana for skills), the strongest skill has to be charged' } },
  ],
  forWhom: {
    de: 'Du stehst gern weit hinten und teilst große Treffer aus. Es stört dich nicht, auf deine MP und deinen Platz zu achten – denn viel aushalten kannst du nicht.',
    en: 'You like to stand far back and land big hits. You do not mind watching your MP and where you stand – because you cannot take many hits.',
  },
  party: {
    dungeon: [
      { de: 'Bleib auf Abstand (bis 20 m) hinter dem Tank und lass ihn die Gegner zuerst an sich binden.', en: 'Stay at range (up to 20 m) behind the tank and let the tank grab the enemies first.' },
      { de: 'Gegnergruppen: [[15060000|Hellfire]], [[15390000|Fire Wall]] und [[15200000|Cold Storm]] treffen bis zu 4 Gegner. Die beiden Stigmen machen danach noch Schaden über Zeit.', en: 'Packs: [[15060000|Hellfire]], [[15390000|Fire Wall]] and [[15200000|Cold Storm]] hit up to 4 enemies. The two stigmas also leave damage over time.' },
      { de: '[[15280000|Bittercold Wind]] hält Monster 3 s lang fest (Root, bei Monstern immer). Gut, wenn Gegner zum Heiler laufen.', en: '[[15280000|Bittercold Wind]] holds monsters in place for 3 s (Root, always works on monsters). Handy when enemies run at the healer.' },
      { de: 'Halte deine MP über 50 %: [[15210000|Flame Arrow]] und [[15050000|Blaze]] geben dir MP zurück.', en: 'Keep your MP above 50%: [[15210000|Flame Arrow]] and [[15050000|Blaze]] give you MP back.' },
    ],
    boss: {
      de: 'Spar [[15310000|Wish of Concentration]] und [[15400000|Element Enhancement]] für den Boss. Beide halten 14,5 s. In diesem Fenster: erst [[15320000|Delayed Explosion]], dann deine starken Skills und [[15060000|Hellfire]] mit voller Ladung. Ist der Boss **benommen** (Stagger: seine Benommen-Leiste ist voll und er taumelt kurz), nimmt Taste T im Makro von selbst [[15010000|Flame Scattershot]].',
      en: 'Save [[15310000|Wish of Concentration]] and [[15400000|Element Enhancement]] for the boss. Both last 14.5 s. In that window: first [[15320000|Delayed Explosion]], then your strong skills and [[15060000|Hellfire]] at full charge. When the boss is **staggered** (its stagger bar is full and it reels for a moment), key T in the macro uses [[15010000|Flame Scattershot]] by itself.',
    },
    pvp: {
      de: "Halte Abstand. [[15280000|Bittercold Wind]] und [[15110000|Winter's Shackles]] bremsen Spieler oder halten sie fest, [[15150000|Frost]] friert sie mit 50 % Chance ein. Fürs PvP tauschst du ein Stigma gegen [[15130000|Soul Freeze]] (siehe Stigmen unten). Bist du betäubt oder eingefroren, befreit dich [[15240000|Defiance]] auf der Leertaste.",
      en: "Keep your distance. [[15280000|Bittercold Wind]] and [[15110000|Winter's Shackles]] slow players or hold them in place, [[15150000|Frost]] freezes them with a 50% chance. For PvP you swap one stigma for [[15130000|Soul Freeze]] (see the stigmas below). If you are stunned or frozen, [[15240000|Defiance]] on Space frees you.",
    },
    solo: {
      de: 'Allein hältst du Monster mit [[15280000|Bittercold Wind]] fest und triffst sie aus der Ferne. [[15090000|Ice Chain]] bremst bis zu 4 Gegner. Stirbst du oft, tausch ein Stigma gegen [[15160000|Steel Barrier]] (ein Schild mit 25 % deiner max. LP).',
      en: 'Alone, hold monsters in place with [[15280000|Bittercold Wind]] and hit them from range. [[15090000|Ice Chain]] slows up to 4 enemies. If you die a lot, swap a stigma for [[15160000|Steel Barrier]] (a shield worth 25% of your max HP).',
    },
  },
  skills: [
    { id: 15060000 /* Hellfire */, note: { de: 'Dein stärkster Skill, trifft bis zu 4 Gegner. **Aufladen** heißt: Taste gedrückt halten, bis alle 3 Ladestufen voll sind. 45 s **Abklingzeit** (so lange wartest du, bis er wieder geht). Ab Stufe 14.', en: 'Your strongest skill, hits up to 4 enemies. **Charging** means holding the key until all 3 charge levels are full. 45 s **cooldown** (the wait until you can use it again). From level 14.' } },
    { id: 15040000 /* Firestorm */, note: { de: 'Dein Hauptangriff, alle 5 s. Mit der passenden Spezialisierung verkürzt jeder Feuerball die Abklingzeit von [[15060000|Hellfire]] um 2 s.', en: 'Your main attack, every 5 s. With the right specialisation every fireball cuts the cooldown of [[15060000|Hellfire]] by 2 s.' } },
    { id: 15050000 /* Blaze */, note: { de: 'Starker Treffer, gibt 100 MP zurück – geht aber nur, wenn das Ziel ein [[15710000|Fire Mark]] trägt. Das Zeichen setzen deine Feuerangriffe mit 20 % Chance.', en: 'Strong hit that gives back 100 MP – but it only works when the target carries a [[15710000|Fire Mark]]. Your fire attacks apply the mark with a 20% chance.' } },
    { id: 15210000 /* Flame Arrow */, note: { de: 'Deine Grundattacke: Du hältst sie mit der linken Maustaste. Jeder Treffer gibt MP zurück. Der dritte Treffer der Kette heißt Pyroklasmus – Spezialisierungen bauen darauf auf.', en: 'Your basic attack: you hold it with the left mouse button. Every hit gives MP back. The third hit of the chain is called Pyroclasm – specialisations build on it.' } },
    { id: 15280000 /* Bittercold Wind */, note: { de: 'Wasserschaden auf bis zu 4 Gegner und hält Monster 3 s lang fest (Root). 15 s Abklingzeit.', en: 'Water damage on up to 4 enemies and holds monsters in place for 3 s (Root). 15 s cooldown.' } },
    { id: 15310000 /* Wish of Concentration */, note: { de: '**Buff** (macht dich stärker): +10 % Angriffskraft und +100 Präzision für 14,5 s, alle 60 s. Ab Stufe 12.', en: '**Buff** (makes you stronger): +10% Attack and +100 Accuracy for 14.5 s, every 60 s. From level 12.' } },
    { id: 15400000 /* Element Enhancement */, note: { de: 'Stigma-Buff: +20 % Feuer- und Wasser-Angriff für 14,5 s. Zusammen mit [[15310000|Wish of Concentration]] dein **Burst-Fenster** (kurze Zeit, in der du alles auf einmal einsetzt).', en: 'Stigma buff: +20% Fire and Water Attack for 14.5 s. Together with [[15310000|Wish of Concentration]] it is your **burst window** (a short time in which you use everything at once).' } },
    { id: 15010000 /* Flame Scattershot */, note: { de: 'Geht nur gegen **benommene** Ziele. Keine Abklingzeit – auf T unter dem Füller kommt er, solange der Boss taumelt, bei jedem Durchlauf des Makros.', en: 'Only works on **staggered** targets. No cooldown – on T below the filler it comes on every pass of the macro while the boss reels.' } },
  ],
  rotation: {
    intro: {
      de: 'Kurz gesagt: Feuer-Skills machen den Schaden, Eis- und Wasser-Skills bremsen Gegner und halten sie fest. Achte auf deine **MP**: Ab 50 % MP gibt dir [[15720000|Robe of Earth]] mehr Krit.-Treffer, ab 25 % gibt dir [[15780000|Grace of Enhancement]] mehr Schaden.',
      en: 'In short: fire skills do the damage, ice and water skills slow enemies and hold them in place. Watch your **MP**: at 50% MP or more [[15720000|Robe of Earth]] gives you more Critical Hit, at 25% or more [[15780000|Grace of Enhancement]] gives you more damage.',
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 15310000 /* Wish of Concentration */, note: { de: 'Buff', en: 'Buff' } },
          { id: 15400000 /* Element Enhancement */, note: { de: 'Buff', en: 'Buff' } },
          { id: 15320000 /* Delayed Explosion */, note: { de: '+15 % Schaden für 4 s', en: '+15% damage for 4 s' } },
          { id: 15390000 /* Fire Wall */ },
          { id: 15200000 /* Cold Storm */ },
          { id: 15280000 /* Bittercold Wind */, note: { de: 'hält fest', en: 'holds in place' } },
          { id: 15110000 /* Winter's Shackles */ },
          { id: 15060000 /* Hellfire */, note: { de: 'voll aufladen', en: 'charge fully' } },
        ],
      },
      {
        title: { de: 'Danach: Makro + linke Maustaste – das kommt zuerst', en: 'Then: macro + left mouse – this comes first' },
        steps: [
          { id: 15060000 /* Hellfire */, note: { de: 'von Hand, sobald bereit', en: 'by hand, whenever ready' } },
          { id: 15050000 /* Blaze */, note: { de: 'wenn das Ziel markiert ist', en: 'when the target is marked' } },
          { id: 15220000 /* Frost Burst */, note: { de: 'auf eingefrorene Ziele', en: 'on frozen targets' } },
          { id: 15040000 /* Firestorm */, note: { de: 'alle 5 s', en: 'every 5 s' } },
          { id: 15280000 /* Bittercold Wind */, note: { de: 'alle 15 s', en: 'every 15 s' } },
          { id: 15010000 /* Flame Scattershot */, note: { de: 'wenn der Boss taumelt', en: 'while the boss reels' } },
          { id: 15210000 /* Flame Arrow */, note: { de: 'immer gedrückt halten', en: 'hold all the time' } },
        ],
      },
    ],
    tips: [
      { de: 'Lade [[15060000|Hellfire]] immer voll auf (3 Stufen) und setz den Skill ein, sobald er bereit ist. Voll aufgeladen füllt er auch die Benommen-Leiste des Bosses stark.', en: 'Always charge [[15060000|Hellfire]] fully (3 levels) and use it as soon as it is ready. Fully charged it also fills the stagger bar of the boss a lot.' },
      { de: 'Spar [[15310000|Wish of Concentration]] und [[15400000|Element Enhancement]] für Bosse. Beide halten 14,5 s – pack deine stärksten Skills in dieses Fenster.', en: 'Save [[15310000|Wish of Concentration]] and [[15400000|Element Enhancement]] for bosses. Both last 14.5 s – put your strongest skills into that window.' },
      { de: 'Ist der Boss benommen, nimmt Taste T von selbst [[15010000|Flame Scattershot]]: Er hat keine Abklingzeit und kommt bei jedem Durchlauf des Makros.', en: 'When the boss is staggered, key T uses [[15010000|Flame Scattershot]] by itself: it has no cooldown and comes on every pass of the macro.' },
      { de: 'Die Grundattacke hältst du die ganze Zeit – sie füllt jede Lücke und bringt MP.', en: 'You hold the basic attack all the time – it fills every gap and brings MP.' },
    ],
  },
  build: {
    intro: {
      de: 'Skillpunkte bringen einen Skill bis Stufe 10. Höhere Stufen kommen von Daevanion-Knoten und Ausrüstung. Bei Skillstufe 8, 12 und 20 öffnet sich je ein Platz für eine **Spezialisierung** (eine Zusatzoption für den Skill). **Stigmen** sind Extra-Skills: Plätze gibt es ab Stufe 22, 27, 32 und 37.',
      en: 'Skill points take a skill up to level 10. Higher levels come from Daevanion nodes and gear. At skill level 8, 12 and 20 a slot opens for a **specialisation** (an extra option for the skill). **Stigmas** are extra skills: you get slots at level 22, 27, 32 and 37.',
    },
    points: [
      { de: 'Zuerst [[15040000|Firestorm]] und [[15210000|Flame Arrow]] auf 8 – das öffnet ihre erste Spezialisierung.', en: 'First [[15040000|Firestorm]] and [[15210000|Flame Arrow]] to 8 – that opens their first specialisation.' },
      { de: '[[15060000|Hellfire]] (ab Stufe 14) auf 8, sobald du den Skill hast – dein stärkster Skill.', en: '[[15060000|Hellfire]] (from level 14) to 8 as soon as you have it – your strongest skill.' },
      { de: '[[15050000|Blaze]] (ab Stufe 4) und [[15280000|Bittercold Wind]] (ab Stufe 3) auf 8.', en: '[[15050000|Blaze]] (from level 4) and [[15280000|Bittercold Wind]] (from level 3) to 8.' },
      { de: 'Diese fünf auf 10: [[15060000|Hellfire]], [[15040000|Firestorm]], [[15050000|Blaze]], [[15210000|Flame Arrow]], [[15280000|Bittercold Wind]].', en: 'These five to 10: [[15060000|Hellfire]], [[15040000|Firestorm]], [[15050000|Blaze]], [[15210000|Flame Arrow]], [[15280000|Bittercold Wind]].' },
      { de: '[[15310000|Wish of Concentration]] auf 8 (für die Spezialisierung), dann [[15220000|Frost Burst]], [[15090000|Ice Chain]], [[15010000|Flame Scattershot]] und das Passiv [[15740000|Robe of Flame]] auf 10.', en: '[[15310000|Wish of Concentration]] to 8 (for its specialisation), then [[15220000|Frost Burst]], [[15090000|Ice Chain]], [[15010000|Flame Scattershot]] and the passive [[15740000|Robe of Flame]] to 10.' },
      { de: "Was übrig bleibt: [[15110000|Winter's Shackles]], [[15150000|Frost]] und [[15730000|Cold Snap]].", en: "Whatever is left: [[15110000|Winter's Shackles]], [[15150000|Frost]] and [[15730000|Cold Snap]]." },
    ],
    specs: [
      { id: 15060000 /* Hellfire */, parts: [15060010 /* Hellfire: +30% Skill Speed */, 15060050 /* Hellfire: -15s cooldown */], note: { de: 'Schneller aufladen und öfter einsetzen. −15 s gibt es erst ab Skillstufe 16 – bis dahin nimm die Option der Stufe 12 (ignoriert Block und Ausweichen).', en: 'Charge faster and use it more often. −15 s needs skill level 16 – until then take the level-12 option (ignores Block and Evasion).' } },
      { id: 15040000 /* Firestorm */, parts: [15040040 /* Firestorm: -2s [Hellfire] cooldown per fireball */, 15040050 /* Firestorm: +15% damage per fireball, up to +75% */], note: { de: 'Jeder Feuerball verkürzt die Abklingzeit von [[15060000|Hellfire]] um 2 s – so kommt dein stärkster Skill viel öfter. Der Schaden pro Feuerball kommt ab Skillstufe 16 dazu.', en: 'Every fireball cuts the cooldown of [[15060000|Hellfire]] by 2 s – so your strongest skill comes much more often. The damage per fireball follows at skill level 16.' } },
      { id: 15050000 /* Blaze */, parts: [15050030 /* Blaze: Delayed Damage after 3s */, 15050040 /* Blaze: Multi-Hit on hit */, 15050050 /* Blaze: -3s [Wish of Concentration] cooldown on hit */], note: { de: 'Verzögerter Zusatzschaden und Mehrfachtreffer bringen mehr Schaden. Später verkürzt jeder Treffer die Abklingzeit von [[15310000|Wish of Concentration]].', en: 'Delayed extra damage and Multi-Hit bring more damage. Later every hit shortens the cooldown of [[15310000|Wish of Concentration]].' } },
      { id: 15310000 /* Wish of Concentration */, parts: [15310020 /* Wish of Concentration: +10% additional Attack */, 15310040 /* Wish of Concentration: +10% Combat Speed */, 15310050 /* Wish of Concentration: -10s all skill cooldowns */], note: { de: 'Mehr Angriffskraft, schnellere Animationen und −10 s Abklingzeit für alle Skills – dein Buff wird noch stärker.', en: 'More Attack, faster animations and −10 s cooldown for all skills – your buff gets even stronger.' } },
      { id: 15280000 /* Bittercold Wind */, parts: [15280010 /* Bittercold Wind: +1s [Bittercold Wind] summon duration */, 15280040 /* Bittercold Wind: Ignores Block and Evasion and lands as a Critical Hit */], note: { de: 'Hält 1 s länger und trifft immer kritisch.', en: 'Lasts 1 s longer and always lands as a Critical Hit.' } },
      { id: 15210000 /* Flame Arrow */, parts: [15210010 /* Flame Arrow: +20% MP restored */, 15210040 /* Flame Arrow: Inflicts Fire Mark for 5s on landing [Pyroclasm] */, 15210050 /* Flame Arrow: Reset [Blaze] cooldown on landing [Pyroclasm] */], note: { de: 'Am Anfang mehr MP. Später setzt der Pyroklasmus-Treffer das [[15710000|Fire Mark]] und macht [[15050000|Blaze]] sofort wieder bereit. Andere Guides beschreiben die Option der Stufe 12 anders – prüf den Text im Spiel.', en: 'More MP early on. Later the Pyroclasm hit applies the [[15710000|Fire Mark]] and makes [[15050000|Blaze]] ready again at once. Other guides describe the level-12 option differently – check the text in game.' } },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen – PvE', en: 'Stigmas – PvE' },
        items: [
          { id: 15400000 /* Element Enhancement */, note: { de: 'Buff: +20 % Feuer- und Wasser-Angriff für 14,5 s.', en: 'Buff: +20% Fire and Water Attack for 14.5 s.' } },
          { id: 15320000 /* Delayed Explosion */, note: { de: 'Explodiert nach 4 s. Bis dahin nimmt das Ziel 15 % mehr Schaden von dir – also zuerst einsetzen.', en: 'Explodes after 4 s. Until then the target takes 15% more damage from you – so use it first.' } },
          { id: 15390000 /* Fire Wall */, note: { de: 'Großer Treffer auf bis zu 4 Gegner plus 10 s Brandschaden.', en: 'Big hit on up to 4 enemies plus 10 s of burn damage.' } },
          { id: 15200000 /* Cold Storm */, note: { de: 'Bremst bis zu 4 Gegner und macht 10 s Schaden über Zeit (mehr, wenn sie sich bewegen). Zum Tauschen: [[15120000|Glacial Smite]], [[15360000|Divine Burst]] oder [[15160000|Steel Barrier]].', en: 'Slows up to 4 enemies and deals damage over time for 10 s (more when they move). To swap in: [[15120000|Glacial Smite]], [[15360000|Divine Burst]] or [[15160000|Steel Barrier]].' } },
        ],
      },
      {
        title: { de: 'Stigmen – PvP', en: 'Stigmas – PvP' },
        items: [
          { id: 15130000 /* Soul Freeze */, note: { de: 'Belegt den Gegner mit 75 % Chance mit Siegel. Kommt statt [[15320000|Delayed Explosion]].', en: 'Seals the enemy with a 75% chance. Replaces [[15320000|Delayed Explosion]].' } },
          { id: 15390000 /* Fire Wall */, note: { de: 'Bleibt: großer Treffer plus Brandschaden.', en: 'Stays: big hit plus burn damage.' } },
          { id: 15200000 /* Cold Storm */, note: { de: 'Bleibt: bremst Spieler, und laufen sie, nehmen sie mehr Schaden.', en: 'Stays: slows players, and if they run they take more damage.' } },
          { id: 15400000 /* Element Enhancement */, note: { de: 'Bleibt: dein Buff für den Burst.', en: 'Stays: your buff for the burst.' } },
        ],
      },
    ],
    daevanion: [
      { de: '**Skill-Knoten zuerst:** +1 Stufe für [[15060000|Hellfire]], [[15050000|Blaze]], [[15040000|Firestorm]], [[15210000|Flame Arrow]] und [[15310000|Wish of Concentration]].', en: '**Skill nodes first:** +1 level for [[15060000|Hellfire]], [[15050000|Blaze]], [[15040000|Firestorm]], [[15210000|Flame Arrow]] and [[15310000|Wish of Concentration]].' },
      { de: '**Nezekan** (ab Stufe 12): Kampftempo und Abklingzeitverringerung – deine wichtigsten Werte.', en: '**Nezekan** (from level 12): Combat Speed and Cooldown Reduction – your most important stats.' },
      { de: '**Zikel** (ab Stufe 20): Schadensverstärkung.', en: '**Zikel** (from level 20): Damage Boost.' },
      { de: '**Vaizel** (ab Stufe 30): Krit.-Schadensverstärkung.', en: '**Vaizel** (from level 30): Critical Damage Boost.' },
      { de: '**Azphel** (ab Stufe 45) ist die PvP-Tafel. Du bezahlst sie mit **Kampfkristallen** aus dem PvP, und ihre Werte zählen nur gegen Spieler.', en: '**Azphel** (from level 45) is the PvP board. You pay for it with **Battle Crystals** from PvP, and its stats only count against players.' },
    ],
    stats: {
      de: 'Reihenfolge für die Tafeln: Kampftempo > Abklingzeitverringerung > Schadensverstärkung > Krit.-Schadensverstärkung > Angriffskraft > Krit.-Treffer > Max. MP. Kampftempo macht deine Animationen schneller, Abklingzeitverringerung bringt Skills öfter.',
      en: 'Order for the boards: Combat Speed > Cooldown Reduction > Damage Boost > Critical Damage Boost > Attack > Critical Hit > Max MP. Combat Speed makes your animations faster, Cooldown Reduction brings skills back sooner.',
    },
  },
  macro: {
    keys: [
      { key: '1', ids: [15220000 /* Frost Burst */, 15150000 /* Frost */], macro: true, note: { de: 'Kombo: [[15150000|Frost]] friert das Ziel ein (bei Monstern immer) – erst dann geht [[15220000|Frost Burst]]. Die Taste nimmt erst [[15150000|Frost]] und beim nächsten Durchlauf [[15220000|Frost Burst]].', en: 'Combo: [[15150000|Frost]] freezes the target (always on monsters) – only then does [[15220000|Frost Burst]] work. The key uses [[15150000|Frost]] first and [[15220000|Frost Burst]] on the next pass.' } },
      { key: '2', ids: [15280000 /* Bittercold Wind */, 15040000 /* Firestorm */], macro: true, note: { de: '[[15280000|Bittercold Wind]] hat die längere Abklingzeit und kommt deshalb zuerst, sobald er bereit ist. In der Wartezeit kommt [[15040000|Firestorm]].', en: '[[15280000|Bittercold Wind]] has the longer cooldown, so it comes first whenever it is ready. While it recharges, [[15040000|Firestorm]] comes.' } },
      { key: '6', ids: [15390000 /* Fire Wall */], macro: true },
      { key: '7', ids: [15200000 /* Cold Storm */], macro: true },
      { key: '3', ids: [15050000 /* Blaze */, 15110000 /* Winter's Shackles */], macro: true, note: { de: "[[15050000|Blaze]] geht nur auf Ziele mit [[15710000|Fire Mark]] – deshalb unten: Die Taste nimmt den Skill, sobald das Zeichen da ist. Sonst kommt [[15110000|Winter's Shackles]].", en: "[[15050000|Blaze]] only works on targets with [[15710000|Fire Mark]] – so it sits at the bottom: the key uses it as soon as the mark is there. Otherwise [[15110000|Winter's Shackles]] comes." } },
      { key: '8', ids: [15320000 /* Delayed Explosion */], macro: true, note: { de: 'Im Makro kommt [[15320000|Delayed Explosion]] nach deinen anderen Angriffen, kurz vor T. Im Burst drückst du sie besser zuerst von Hand: 4 s lang nimmt das Ziel 15 % mehr Schaden von dir.', en: 'In the macro [[15320000|Delayed Explosion]] comes after your other attacks, just before T. In a burst, better press it first by hand: for 4 s the target takes 15% more damage from you.' } },
      { key: 'T', ids: [15010000 /* Flame Scattershot */, 15090000 /* Ice Chain */], macro: true, note: { de: 'Letzter Schritt im Makro. [[15010000|Flame Scattershot]] geht nur gegen benommene Ziele – deshalb unten: Ist der Boss benommen, nimmt die Taste ihn von selbst. Oben [[15090000|Ice Chain]] ohne Abklingzeit als **Füller**.', en: 'Last step of the macro. [[15010000|Flame Scattershot]] only works on staggered targets – so it sits at the bottom: when the boss is staggered, the key uses it by itself. On top, [[15090000|Ice Chain]] has no cooldown and is your **filler**.' } },
      { key: 'R', ids: [15210000 /* Flame Arrow */], note: { de: 'Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Gibt MP zurück.', en: 'Basic attack: hold the left mouse button, **not** in the macro. Gives MP back.' } },
      { key: '4', ids: [15310000 /* Wish of Concentration */], note: { de: 'Buff – von Hand in der Eröffnung und im Burst.', en: 'Buff – by hand in the opener and in a burst.' } },
      { key: '5', ids: [15400000 /* Element Enhancement */], note: { de: 'Stigma-Buff – zusammen mit 4.', en: 'Stigma buff – together with 4.' } },
      { key: 'E', ids: [15060000 /* Hellfire */], note: { de: 'Aufladen von Hand – das Makro lädt nicht richtig auf. Immer voll aufladen.', en: 'Charge by hand – the macro does not charge it properly. Always charge it fully.' } },
    ],
    note: {
      de: 'Eröffnung von Hand: 4 und 5 (Buffs), dann 8, 6, 7, 2 und 3 – das sind genau die Skills der Eröffnung oben. Dann E voll aufladen. Danach Makro-Taste und linke Maustaste gedrückt halten: Das Makro drückt 1, 2, 6, 7, 3, 8 und zuletzt T. [[15280000|Bittercold Wind]], [[15390000|Fire Wall]] und [[15200000|Cold Storm]] stehen nur ein paar Sekunden am Ziel und machen Schaden – Angriffe, keine Begleiter, darum gehören sie ins Makro. E drückst du immer, sobald [[15060000|Hellfire]] wieder bereit ist.',
      en: 'Opener by hand: 4 and 5 (buffs), then 8, 6, 7, 2 and 3 – these are exactly the opener skills above. Then charge E fully. After that, hold the macro key and the left mouse button: the macro presses 1, 2, 6, 7, 3, 8 and T last. [[15280000|Bittercold Wind]], [[15390000|Fire Wall]] and [[15200000|Cold Storm]] only stay at the target for a few seconds and deal damage – attacks, not companions, so they belong in the macro. Press E whenever [[15060000|Hellfire]] is ready again.',
    },
  },
  mistakes: [
    { de: '**MP zu niedrig:** Unter 50 % verlierst du den Krit.-Bonus von [[15720000|Robe of Earth]], unter 25 % den Schadensbonus von [[15780000|Grace of Enhancement]]. Halte die Grundattacke gedrückt – sie gibt MP zurück.', en: '**MP too low:** below 50% you lose the Critical Hit bonus of [[15720000|Robe of Earth]], below 25% the damage bonus of [[15780000|Grace of Enhancement]]. Keep holding the basic attack – it gives MP back.' },
    { de: '**Aufladeskill im Makro:** Das Makro lädt [[15060000|Hellfire]] nicht richtig auf. Leg den Skill auf eine eigene Taste und lade ihn immer voll auf.', en: '**Charged skill in the macro:** the macro does not charge [[15060000|Hellfire]] properly. Put it on a key of its own and always charge it fully.' },
    { de: '**Kein Feuerzeichen:** [[15050000|Blaze]] geht nur auf Ziele mit [[15710000|Fire Mark]]. Drück den Skill nicht ständig von Hand – Taste 3 im Makro setzt ihn ein, sobald das Zeichen da ist.', en: '**No mark on the target:** [[15050000|Blaze]] only works on targets with [[15710000|Fire Mark]]. Do not keep pressing it by hand – key 3 in the macro uses it as soon as the mark is there.' },
    { de: '**Buffs an schwachen Gegnern:** [[15310000|Wish of Concentration]] und [[15400000|Element Enhancement]] haben 60 s Abklingzeit – spar sie für den Boss.', en: '**Buffs on weak mobs:** [[15310000|Wish of Concentration]] and [[15400000|Element Enhancement]] have a 60 s cooldown – save them for the boss.' },
    { de: '**Explosion zu spät:** Im Makro kommt [[15320000|Delayed Explosion]] erst nach deinen anderen Angriffen. Im Burst drückst du sie zuerst – dann treffen deine Skills 4 s lang 15 % härter.', en: '**Explosion too late:** in the macro [[15320000|Delayed Explosion]] only comes after your other attacks. In a burst press it first – then your skills hit 15% harder for 4 s.' },
    { de: '**Zu nah dran:** Du hältst wenig aus. Bleib auf Abstand und lauf aus Flächenangriffen heraus.', en: '**Too close:** you cannot take many hits. Keep your distance and walk out of area attacks.' },
  ],
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Magier haben im Median **233K** Kampfkraft bei Gegenstandsstufe **3.327** (Spanne 222–250K) – Platz 3 der acht Klassen und mit ≈71 Kampfkraft pro Gegenstandsstufe Platz 2. Offen sind vor allem Arcana, Gürtel und die fünfte Daevanion-Tafel.",
      en: "The top 10 Sorcerers have a median **233K** Combat Power at item level **3,327** (range 222–250K) – 3rd of the eight classes and 2nd at ≈71 Combat Power per item level. What is still open is mainly Arcana, the belt and the fifth Daevanion board.",
    },
    gear: [
      {
        de: "**Waffe und Guard:** Splendent Ebony / Wise Dragon Lord Spellbook – alle zehn auf +15 mit Amplified +5; der Guard ebenso (einer noch Nuakum).",
        en: "**Weapon and guard:** Splendent Ebony / Wise Dragon Lord Spellbook – all ten at +15 with Amplified +5; the guard as well (one still Nuakum).",
      },
      {
        de: "**Rüstung:** 50 von 70 Teilen Splendent (Gegenstandsstufe 102), 12 Nuakum, 8 Splendent White / Dark Dragon Lord (86); 6 der 10 tragen das ganze Set, 55 Teile auf Amplified +5.",
        en: "**Armour:** 50 of 70 pieces Splendent (item level 102), 12 Nuakum, 8 Splendent White / Dark Dragon Lord (86); 6 of the 10 wear the full set, 55 pieces at Amplified +5.",
      },
      {
        de: "**Schmuck:** 44 von 50 Teilen Splendent 102, alle auf +15, 46 mit Amplified +5.",
        en: "**Jewellery:** 44 of 50 pieces Splendent 102, all at +15, 46 with Amplified +5.",
      },
      {
        de: "**Armreifen und Rest:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80), meist +15, plus meist ein Liberator Bracelet +10; Revelation Amulet +10 (9 von 10), Noble Belt +10 nur bei 6 von 10. Flügel gemischt: Talisra (4), Dark Veil und Kromede (je 2).",
        en: "**Bracelets and the rest:** exactly one Ascension Bracelet (none of the top 80 wears more), mostly +15, plus mostly a Liberator Bracelet +10; Revelation Amulet +10 (9 of 10), Noble Belt +10 only for 6 of 10. Wings mixed: Talisra (4), Dark Veil and Kromede (2 each).",
      },
    ],
    arcana: {
      de: "Bei den Magiern gehen die Karten am weitesten auseinander. Am häufigsten: **Chalice of Vigor** (8 von 10), **Mirror of Vigor** (7), **Parchment und Compass of Vigor** (je 6) und **Bell of Magic** (8). Nur 33 von 50 Karten sind auf +5, zwei tragen die Bell of Magic noch auf +0.",
      en: "The Sorcerers’ cards differ the most. Most common: **Chalice of Vigor** (8 of 10), **Mirror of Vigor** (7), **Parchment and Compass of Vigor** (6 each) and **Bell of Magic** (8). Only 33 of 50 cards are at +5, two still wear the Bell of Magic at +0.",
    },
    stigmas: [
      { id: 15400000, note: { de: '9 von 10 · Median Stufe 20', en: '9 of 10 · median level 20' } },
      { id: 15390000, note: { de: '9 von 10 · Median Stufe 20', en: '9 of 10 · median level 20' } },
      { id: 15320000, note: { de: '7 von 10 · Median Stufe 20', en: '7 of 10 · median level 20' } },
      { id: 15200000, note: { de: '8 von 10 · Median Stufe 15', en: '8 of 10 · median level 15' } },
    ],
    tips: [
      {
        de: "**Arcana auf +5:** 17 von 50 Karten der Top 10 sind noch darunter – Arcana-Verzauberung kann nicht scheitern.",
        en: "**Arcana to +5:** 17 of 50 cards of the top 10 are still below – Arcana enhancement can’t fail.",
      },
      {
        de: "**Gürtel:** 4 der Top 10 haben den Noble Belt noch unter +10, zwei auf +0. Er gelingt bis +10 immer (eine Schriftrolle pro Stufe).",
        en: "**Belt:** 4 of the top 10 still have the Noble Belt below +10, two at +0. It always succeeds up to +10 (one scroll per step).",
      },
      {
        de: "**Daevanion:** Im Median sind 60, 55 und 62 von 88 Knoten auf den ersten drei Tafeln offen, 71 von 116 auf der vierten und 26 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 60, 55 and 62 of 88 nodes are open on the first three boards, 71 of 116 on the fourth and 26 of 152 on the fifth.",
      },
    ],
  },
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/sorcerer/build', label: 'Metabot – Sorcerer build' },
    { href: 'https://aion2-guides.info/en/sorcerer/', label: 'AION 2 Guides – Sorcerer' },
    { href: 'https://metaroad.gg/aion2/build-guides/sorcerer-pve-dps-build', label: 'MetaRoad – Sorcerer PvE DPS build' },
    { href: 'https://games.gg/aion-2/guides/aion-2-sorcerer-guide/', label: 'games.gg – Sorcerer guide' },
    { href: 'https://gamerblurb.com/guides/aion-2-sorcerer-build-guide-pve-pvp-and-leveling-global', label: 'GamerBlurb – Sorcerer build (PvE, PvP, levelling)' },
    { href: 'https://www.inven.co.kr/board/aion2/6453/13273', label: 'Inven (KR) – Sorcerer forum' },
  ],
  caveat: {
    de: 'Der globale Client hat 4 Stigma-Plätze und Stufe 45 als Grenze – koreanische Builds mit 6 Stigmen passen nicht 1:1. Die Quellen beschreiben die Option der Stufe 12 von [[15210000|Flame Arrow]] anders als die Spieldaten. Builds ändern sich mit Patches – was bei dir im Spiel funktioniert, zählt.',
    en: 'The global client has 4 stigma slots and a level cap of 45 – Korean builds with 6 stigmas do not fit 1:1. The sources describe the level-12 option of [[15210000|Flame Arrow]] differently from the game data. Builds change with patches – what works for you in game wins.',
  },
});
