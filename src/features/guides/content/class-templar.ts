import { classGuide } from './classGuide';

/** Beginner guide for the Templar. Hotbar and macro are set up for tanking. */
export const templarGuide = classGuide({
  id: 'templar',
  cls: 'Templar',
  tone: 'slate',
  title: { de: 'Templer-Guide', en: 'Templar guide' },
  summary: {
    de: 'Als Templer bist du der Tank: Du ziehst die Gegner auf dich, schützt die Gruppe und hältst Bosse in Schach. Hier lernst du Schritt für Schritt Rotation, Build und Makro.',
    en: 'As a Templar you are the tank: you draw enemies to you, protect the group and keep bosses in check. Here you learn rotation, build and macro step by step.',
  },
  tags: [
    { de: 'Tank', en: 'Tank' },
    { de: 'Gruppenschutz', en: 'Group protection' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-19',
  glance: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: '**Haupt-Tank** – der einzige reine Tank im Spiel', en: '**Main tank** – the only pure tank in the game' } },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: '**Mittel** – Aggro, Timing und Verteidigung gleichzeitig', en: '**Medium** – enmity, timing and defence at the same time' } },
    { label: { de: 'Reichweite', en: 'Range' }, value: { de: 'Nahkampf (4–5 m); [[12120000|Taunt]], [[12090000|Punishment]] und [[12130000|Poach]] bis 20 m', en: 'Melee (4–5 m); [[12120000|Taunt]], [[12090000|Punishment]] and [[12130000|Poach]] up to 20 m' } },
    { label: { de: 'Stärken', en: 'Strengths' }, value: { de: 'Hält Bosse fest, schwächt ihren Angriff, schützt die Gruppe und stärkt sie beim Blocken', en: 'Holds bosses, weakens their Attack, protects the group and makes it stronger when blocking' } },
    { label: { de: 'Schwächen', en: 'Weaknesses' }, value: { de: 'Eher wenig Schaden (darüber streiten sich die Guides), MP oft knapp, [[12240000|Judgment]] braucht gutes Timing', en: 'Rather low damage (guides argue about it), often short on MP, [[12240000|Judgment]] needs good timing' } },
  ],
  forWhom: {
    de: 'Du willst vorne stehen, den Boss im Griff haben und die Gruppe beschützen. Du denkst gern ein wenig voraus: Wann kommt der große Angriff, wann blockst du? Dann passt der Templer zu dir.',
    en: 'You want to stand in front, keep the boss under control and protect the group. You like to think ahead a little: when does the big attack come, when do you block? Then the Templar is right for you.',
  },
  party: {
    dungeon: [
      {
        de: '**Aggro halten:** [[12120000|Taunt]] zieht den Gegner sofort auf dich (Aggro = wen der Gegner angreift) und schwächt ihn: -10 % Angriff, weniger Präzision. [[12770000|Insulting Roar]] erhöht deine Aggro stark (+100 %).',
        en: '**Hold enmity:** [[12120000|Taunt]] pulls the enemy onto you right away (enmity = who the enemy attacks) and weakens it: -10% Attack, less Accuracy. [[12770000|Insulting Roar]] raises your enmity a lot (+100%).',
      },
      {
        de: '**Boss wegdrehen:** Dreh den Boss von der Gruppe weg, damit seine Angriffe nur dich treffen.',
        en: '**Turn the boss away:** turn the boss away from the group so its attacks only hit you.',
      },
      {
        de: '**Blocken hilft allen:** Blockst du einen Angriff, machen du und deine Gruppe 20 s lang 10 % mehr PvE-Schaden ([[12780000|Fury]] auf Skillstufe 10). Mit dem Stigma [[12230000|Noble Armor]] (ab Stigma-Stufe 15) ist der Bonus 1,5-mal so hoch.',
        en: '**Blocking helps everyone:** when you block an attack, you and your group deal 10% more PvE damage for 20 s ([[12780000|Fury]] at skill level 10). With the stigma [[12230000|Noble Armor]] (from stigma level 15) the bonus is 1.5 times as high.',
      },
      {
        de: "**Sammeln und schützen:** Mit [[12130000|Poach]] ziehst du einen Gegner zu dir, mit dem Stigma [[12220000|Grapple]] bis zu 4. Die Stigmen [[12320000|Nezekan's Shield]] und [[12250000|Comrade in Arms]] schützen die Gruppe bei großen Treffern.",
        en: "**Gather and protect:** with [[12130000|Poach]] you pull one enemy to you, with the stigma [[12220000|Grapple]] up to 4. The stigmas [[12320000|Nezekan's Shield]] and [[12250000|Comrade in Arms]] protect the group from big hits.",
      },
      {
        de: "**Taumeln auslösen:** Bosse haben eine Taumel-Leiste. Ist sie voll, **taumeln** sie kurz (im Spiel „benommen“). [[12090000|Punishment]] und [[12120000|Taunt]] füllen die Leiste, das Stigma [[12310000|Empyrean Lord's Punishment]] füllt sie stark.",
        en: "**Cause a stagger:** bosses have a stagger gauge. When it is full, they **stagger** for a short time. [[12090000|Punishment]] and [[12120000|Taunt]] fill the gauge, the stigma [[12310000|Empyrean Lord's Punishment]] fills it a lot.",
      },
    ],
    boss: {
      de: 'Zuerst [[12120000|Taunt]] – ab Stigma-Stufe 5 hält der Boss dadurch auch weniger aus, und die ganze Gruppe macht mehr Schaden. Halte [[12090000|Punishment]] am Laufen: Der Buff „Vollstrecker“ gibt dir 20 s lang 20 % mehr Schaden, und jede Folge-Attacke von [[12040000|Pummel]] verkürzt mit ihrer Spezialisierung die Abklingzeit um 1 s. Spielst du das Stigma [[12110000|Shield of Protection]], halte es für große Angriffe bereit, die du kommen siehst – der sichere Block startet nebenbei [[12780000|Fury]] für die ganze Gruppe.',
      en: 'First [[12120000|Taunt]] – from stigma level 5 the boss also takes more damage, so the whole group deals more. Keep [[12090000|Punishment]] going: its buff “Executor” gives you 20% more damage for 20 s, and with its specialisation every follow-up of [[12040000|Pummel]] cuts the cooldown by 1 s. If you run the stigma [[12110000|Shield of Protection]], keep it ready for big attacks you see coming – the sure block also starts [[12780000|Fury]] for the whole group.',
    },
    pvp: {
      de: "Im PvP kontrollierst und schützt du: [[12100000|Shield Smite]] betäubt (gegen Spieler mit 60 % Chance), [[12130000|Poach]] zieht heran, und [[12120000|Taunt]] zwingt Spieler mit 50 % Chance 3 s lang, dich anzugreifen. Mit [[12070000|Doom Shield]] bist du aus 20 m sofort am Gegner. Gegen Betäubungen helfen [[12260000|Defiance]] und [[12790000|Survival Willpower]] (+35 % Widerstand gegen Statuseffekte auf Skillstufe 10). Beliebte Stigmen für 1 gegen 1: [[12070000|Doom Shield]], [[12410000|Executing Blade]] (-30 % Verteidigung beim Ziel), [[12190000|Second Skin]] (+15 % PvP-Schadensresistenz) und [[12230000|Noble Armor]]; in Gruppen eher [[12320000|Nezekan's Shield]], [[12250000|Comrade in Arms]], [[12220000|Grapple]] und [[12110000|Shield of Protection]]. Beide Sets sind noch umstritten.",
      en: "In PvP you control and protect: [[12100000|Shield Smite]] stuns (a 60% chance against players), [[12130000|Poach]] pulls in, and [[12120000|Taunt]] forces players with a 50% chance to attack you for 3 s. With [[12070000|Doom Shield]] you reach an enemy from 20 m right away. Against stuns, [[12260000|Defiance]] and [[12790000|Survival Willpower]] help (+35% Status Effect Resist at skill level 10). Popular stigmas for 1 vs 1: [[12070000|Doom Shield]], [[12410000|Executing Blade]] (-30% Defense on the target), [[12190000|Second Skin]] (+15% PvP Damage Tolerance) and [[12230000|Noble Armor]]; in groups rather [[12320000|Nezekan's Shield]], [[12250000|Comrade in Arms]], [[12220000|Grapple]] and [[12110000|Shield of Protection]]. Both sets are still disputed.",
    },
    solo: {
      de: 'Allein spielst du sehr sicher: [[12350000|Warding Strike]] heilt dich und senkt den Schaden, den du nimmst. Einzelne Gegner ziehst du mit [[12130000|Poach]] heran, Gruppen mit dem Stigma [[12220000|Grapple]], und [[12100000|Shield Smite]] betäubt bis zu 4 von ihnen.',
      en: 'Solo you play very safely: [[12350000|Warding Strike]] heals you and lowers the damage you take. You pull single enemies in with [[12130000|Poach]] and packs with the stigma [[12220000|Grapple]], and [[12100000|Shield Smite]] stuns up to 4 of them.',
    },
  },
  skills: [
    {
      id: 12120000 /* Taunt */,
      note: {
        de: 'Stigma, ab Stufe 22: Zieht den Gegner auf dich (+20.000 Aggro) und schwächt ihn 15 s lang (-10 % Angriff, -200 Präzision). **Abklingzeit** (Wartezeit bis zum nächsten Einsatz) 30 s. Bis Stufe 22 hältst du die Aggro mit [[12240000|Judgment]], [[12040000|Pummel]] und [[12010000|Vicious Strike]] – auch sie erhöhen die Aggro.',
        en: 'Stigma, from level 22: pulls the enemy onto you (+20,000 enmity) and weakens it for 15 s (-10% Attack, -200 Accuracy). **Cooldown** (waiting time until the next use) 30 s. Until level 22 you hold enmity with [[12240000|Judgment]], [[12040000|Pummel]] and [[12010000|Vicious Strike]] – they raise enmity too.',
      },
    },
    {
      id: 12240000 /* Judgment */,
      note: {
        de: 'Dein Hauptschaden. Geht nur kurz (2–3 s) nach einem **Schild-Angriff**: [[12100000|Shield Smite]], [[12350000|Warding Strike]], [[12430000|Shield Rush]] (nur nach einem Ausweichen) oder [[12070000|Doom Shield]]. Abklingzeit 5 s – ab Skillstufe 16 kannst du sie per Spezialisierung entfernen. Ab Stufe 4.',
        en: 'Your main damage. Only works for a short time (2–3 s) after a **shield attack**: [[12100000|Shield Smite]], [[12350000|Warding Strike]], [[12430000|Shield Rush]] (only after a dodge) or [[12070000|Doom Shield]]. Cooldown 5 s – from skill level 16 a specialisation removes it. From level 4.',
      },
    },
    {
      id: 12100000 /* Shield Smite */,
      note: {
        de: 'Schild-Angriff mit 10 s Abklingzeit: Betäubt normale Gegner sicher 3 s lang (sie können nichts tun) und öffnet das Fenster für [[12240000|Judgment]]. Auf betäubte Gegner folgt [[12300000|Annihilate]] – ein großer Treffer.',
        en: 'Shield attack with a 10 s cooldown: stuns normal enemies for sure for 3 s (they cannot act) and opens the window for [[12240000|Judgment]]. On stunned enemies [[12300000|Annihilate]] follows – a big hit.',
      },
    },
    {
      id: 12350000 /* Warding Strike */,
      note: {
        de: 'Schild-Angriff mit 30 s Abklingzeit: Heilt dich, gibt dir 10 s lang +20 % Schadensresistenz (du nimmst weniger Schaden) und öffnet das Fenster für [[12240000|Judgment]]. Ab Stufe 8.',
        en: 'Shield attack with a 30 s cooldown: heals you, gives you +20% Damage Tolerance for 10 s (you take less damage) and opens the window for [[12240000|Judgment]]. From level 8.',
      },
    },
    {
      id: 12090000 /* Punishment */,
      note: {
        de: "Lädt bis zu 3 Stufen auf und trifft aus bis zu 20 m. Gibt dir „Vollstrecker“: 20 s lang 20 % mehr Schaden. Nicht verwechseln mit dem Stigma [[12310000|Empyrean Lord's Punishment]]. Ab Stufe 14.",
        en: "Charges up to 3 levels and hits from up to 20 m. Gives you “Executor”: 20% more damage for 20 s. Do not mix it up with the stigma [[12310000|Empyrean Lord's Punishment]]. From level 14.",
      },
    },
    {
      id: 12070000 /* Doom Shield */,
      note: {
        de: 'Stigma: Ansturm aus bis zu 20 m. Wirft normale Gegner nieder, gibt dir einen kleinen Schutzschild und öffnet das Fenster für [[12240000|Judgment]] sogar 3 s lang.',
        en: 'Stigma: a charge from up to 20 m. Knocks normal enemies down, gives you a small protective shield and opens the window for [[12240000|Judgment]] for as long as 3 s.',
      },
    },
    {
      id: 12010000 /* Vicious Strike */,
      note: {
        de: 'Deine Grundattacke (linke Maustaste): Trifft bis zu 4 Gegner, erhöht die Aggro und **bringt dir 100 MP zurück**.',
        en: 'Your basic attack (left mouse button): hits up to 4 enemies, raises enmity and **gives you 100 MP back**.',
      },
    },
    {
      id: 12110000 /* Shield of Protection */,
      note: {
        de: 'Stigma: Kurz blockst du sicher (+100 % Block-Schadensreduktion) und bekommst beim Block einmal MP zurück. Jeder sichere Block startet [[12780000|Fury]] und schaltet [[12270000|Debilitating Smash]] frei. Heb den Skill für große Treffer auf, die du kommen siehst – solange du blockst, greifst du nicht an. Die Hälfte der Top 10 spielt ihn. Achtung: Dein normaler Block (die Chance aus deinem Block-Wert) schützt nicht vor Betäubung – er ersetzt diesen Skill nicht.',
        en: 'Stigma: for a short time you block for sure (+100% Block Damage Reduction) and get MP back once on the block. Every sure block starts [[12780000|Fury]] and unlocks [[12270000|Debilitating Smash]]. Save it for big hits you see coming – while you block, you do not attack. Half of the top 10 run it. Careful: your normal Block (the chance from your Block stat) does not protect you from a stun – it does not replace this skill.',
      },
    },
  ],
  rotation: {
    intro: {
      de: 'Die Grundregel beim Templer: **erst ein Schild-Angriff, dann** [[12240000|Judgment]]. Jeder Schild-Angriff öffnet ein kurzes Fenster (2–3 s), in dem [[12240000|Judgment]] geht. Erst danach kommt der nächste Schild-Angriff. Bis Skillstufe 16 („Abklingzeit entfernt“) hat [[12240000|Judgment]] selbst 5 s Abklingzeit – dann geht noch nicht jedes Fenster.',
      en: 'The basic rule for the Templar: **first a shield attack, then** [[12240000|Judgment]]. Every shield attack opens a short window (2–3 s) in which [[12240000|Judgment]] works. Only after that comes the next shield attack. Until skill level 16 (“Remove cooldown”), [[12240000|Judgment]] itself has a 5 s cooldown – so not every window can be used yet.',
    },
    flow: {
      items: [
        {
          title: { de: 'Buffs', en: 'Buffs' },
          text: { de: '[[12230000|Noble Armor]] vor dem Kampf (5 Minuten mehr max. LP), [[12450000|Battlefield Banner]] für mehr Angriff', en: '[[12230000|Noble Armor]] before the fight (more max HP for 5 minutes), [[12450000|Battlefield Banner]] for more Attack' },
          tag: { de: 'Tasten 6 · 8', en: 'Keys 6 · 8' },
          tone: 'blue',
        },
        {
          title: { de: 'Aus der Entfernung', en: 'From range' },
          text: { de: '[[12090000|Punishment]] voll aufladen, solange noch kein Fenster offen ist', en: '[[12090000|Punishment]] fully charged while no window is open yet' },
          tag: { de: 'Taste 4', en: 'Key 4' },
          tone: 'slate',
        },
        {
          title: { de: 'Erstes Fenster', en: 'First window' },
          text: { de: '[[12070000|Doom Shield]] bringt dich aus bis zu 20 m an den Boss und öffnet 3 s – sofort [[12240000|Judgment]]', en: '[[12070000|Doom Shield]] takes you to the boss from up to 20 m and opens 3 s – [[12240000|Judgment]] right away' },
          tag: { de: 'Tasten 5 · 1', en: 'Keys 5 · 1' },
          tone: 'gold',
        },
        {
          title: { de: 'Aggro und Schwächung', en: 'Enmity and weakening' },
          text: { de: '[[12120000|Taunt]] zieht den Boss auf dich: -10 % Angriff, weniger Präzision', en: '[[12120000|Taunt]] pulls the boss onto you: -10% Attack, less Accuracy' },
          tag: { de: 'Taste 7', en: 'Key 7' },
          tone: 'violet',
        },
        {
          title: { de: 'Schild-Angriff → Urteil', en: 'Shield attack → Judgment' },
          text: { de: '[[12100000|Shield Smite]], [[12350000|Warding Strike]] – nach jedem [[12240000|Judgment]], dann das Makro', en: '[[12100000|Shield Smite]], [[12350000|Warding Strike]] – each followed by [[12240000|Judgment]], then the macro' },
          tag: { de: 'Taste 1', en: 'Key 1' },
          tone: 'gold',
        },
      ],
    },
    blocks: [
      {
        title: { de: 'Eröffnung am Boss', en: 'Opener at the boss' },
        steps: [
          { id: 12230000 /* Noble Armor */, note: { de: 'Taste 6, vor dem Kampf: 5 Minuten lang mehr max. LP', en: 'Key 6, before the fight: more max HP for 5 minutes' } },
          { id: 12450000 /* Battlefield Banner */, note: { de: 'Taste 8: mehr Angriff für den Start', en: 'Key 8: more Attack for the start' } },
          { id: 12090000 /* Punishment */, note: { de: 'Taste 4: aus der Entfernung voll aufladen', en: 'Key 4: fully charge from range' } },
          { id: 12070000 /* Doom Shield */, note: { de: 'Taste 5: aus bis zu 20 m hin zum Boss, das Fenster geht 3 s lang auf', en: 'Key 5: rush to the boss from up to 20 m, the window opens for 3 s' } },
          { id: 12240000 /* Judgment */, note: { de: 'Taste 1', en: 'Key 1' } },
          { id: 12120000 /* Taunt */, note: { de: 'Taste 7: Aggro sichern', en: 'Key 7: secure enmity' } },
          { id: 12100000 /* Shield Smite */, note: { de: 'Taste 1: nächster Schild-Angriff', en: 'Key 1: next shield attack' } },
          { id: 12240000 /* Judgment */, note: { de: 'Taste 1', en: 'Key 1' } },
          { id: 12350000 /* Warding Strike */, note: { de: 'Taste 1: Schild-Angriff, heilt dich nebenbei', en: 'Key 1: shield attack that also heals you' } },
          { id: 12240000 /* Judgment */, note: { de: 'Taste 1, dann das Makro', en: 'Key 1, then the macro' } },
        ],
      },
      {
        title: { de: 'Danach: Priorität (Wichtigstes zuerst)', en: 'After that: priority (most important first)' },
        steps: [
          { id: 12240000 /* Judgment */, note: { de: 'Immer, wenn ein Fenster offen ist', en: 'Whenever a window is open' } },
          { id: 12120000 /* Taunt */, note: { de: 'Sobald bereit – Aggro und Schwächung erneuern', en: 'As soon as it is ready – renew enmity and the weakening' } },
          { id: 12270000 /* Debilitating Smash */, note: { de: 'Nur nach einem Block – senkt die Verteidigung von bis zu 4 Gegnern 5 s lang um 25 %', en: 'Only after a block – lowers the Defense of up to 4 enemies by 25% for 5 s' } },
          { id: 12100000 /* Shield Smite */, note: { de: 'Nächster Schild-Angriff', en: 'Next shield attack' } },
          { id: 12300000 /* Annihilate */, note: { de: 'Wenn der Gegner betäubt ist oder am Boden liegt – bei Bossen ab und zu per Zufall (5 % pro Angriff)', en: 'When the enemy is stunned or on the ground – on bosses now and then by chance (5% per attack)' } },
          { id: 12350000 /* Warding Strike */, note: { de: 'Schild-Angriff, heilt dich nebenbei', en: 'Shield attack that also heals you' } },
          { id: 12070000 /* Doom Shield */, note: { de: 'Von Hand, sobald bereit: Schild-Angriff mit dem längsten Fenster (3 s)', en: 'By hand as soon as it is ready: the shield attack with the longest window (3 s)' } },
          { id: 12430000 /* Shield Rush */, note: { de: 'Nur direkt nach einem Ausweichen: zurück zum Boss, das Fenster geht auf', en: 'Only right after a dodge: back to the boss, the window opens' } },
          { id: 12090000 /* Punishment */, note: { de: 'Außerhalb der Fenster – in einem offenen Fenster nicht voll aufladen', en: 'Outside the windows – do not fully charge while a window is open' } },
          { id: 12340000 /* Flash Rampage */, note: { de: 'Nur wenn der Boss taumelt', en: 'Only while the boss staggers' } },
          { id: 12040000 /* Pummel */, note: { de: 'Füller auf Taste T', en: 'Filler on key T' } },
          { id: 12010000 /* Vicious Strike */, note: { de: 'Linke Maustaste – bringt MP zurück', en: 'Left mouse button – gives MP back' } },
        ],
      },
    ],
    tips: [
      {
        de: '**Taumel-Phase:** Taumelt der Boss, nimmt Taste T von selbst [[12340000|Flash Rampage]] – das Makro drückt T als letzten Schritt bei jedem Durchlauf.',
        en: '**Stagger phase:** while the boss staggers, key T uses [[12340000|Flash Rampage]] by itself – the macro presses T as its last step on every pass.',
      },
      {
        de: "**Gegnergruppen:** Mit dem Stigma [[12220000|Grapple]] (bis zu 4 Gegner) oder einzeln mit [[12130000|Poach]] heranziehen, dann [[12100000|Shield Smite]], [[12240000|Judgment]], [[12350000|Warding Strike]] und – wenn du es spielst – [[12310000|Empyrean Lord's Punishment]]. Auf betäubte Gegner [[12300000|Annihilate]]. [[12070000|Doom Shield]] ist ab Stigma-Stufe 15 sofort wieder bereit, wenn ein Gegner stirbt.",
        en: "**Packs of enemies:** pull them in with the stigma [[12220000|Grapple]] (up to 4 enemies) or one by one with [[12130000|Poach]], then [[12100000|Shield Smite]], [[12240000|Judgment]], [[12350000|Warding Strike]] and – if you run it – [[12310000|Empyrean Lord's Punishment]]. On stunned enemies [[12300000|Annihilate]]. From stigma level 15 [[12070000|Doom Shield]] is ready again right away when an enemy dies.",
      },
      {
        de: "**Verteidigung von Hand:** Ist deine Ausrüstung noch schwach, liegt auf Taste 8 statt [[12450000|Battlefield Banner]] ein Schutz-Stigma: [[12110000|Shield of Protection]] für große Treffer, die du kommen siehst, oder [[12320000|Nezekan's Shield]] – es schützt die ganze Gruppe 3 s lang vor einem großen Treffer. Mit dem Stigma [[12250000|Comrade in Arms]] übernimmst du Schaden von anderen.",
        en: "**Defence by hand:** while your gear is still weak, key 8 holds a protective stigma instead of [[12450000|Battlefield Banner]]: [[12110000|Shield of Protection]] for big hits you see coming, or [[12320000|Nezekan's Shield]] – it protects the whole group from one big hit for 3 s. With the stigma [[12250000|Comrade in Arms]] you take over damage from others.",
      },
      {
        de: '**Schildsturm nach dem Ausweichen:** [[12430000|Shield Rush]] geht nur direkt nach einem Ausweichen (im Spiel „Notausweichen“) oder im Flug. Weich einem großen Boss-Angriff aus und drück dann Q: Du stürmst zurück, und das Fenster für [[12240000|Judgment]] geht auf (2 s). Ohne Ausweichen nimmt Q [[12130000|Poach]]. Hast du [[12070000|Doom Shield]] noch nicht, eröffnest du so: zum Boss hin ausweichen, dann Q.',
        en: '**Shield Rush after a dodge:** [[12430000|Shield Rush]] only works right after a dodge or while flying. Dodge out of a big boss attack, then press Q: you rush back in and the window for [[12240000|Judgment]] opens (2 s). Without a dodge, Q uses [[12130000|Poach]]. If you do not have [[12070000|Doom Shield]] yet, this is your opener: dodge towards the boss, then Q.',
      },
      {
        de: '**MP im Blick:** Halte immer die linke Maustaste – [[12010000|Vicious Strike]] bringt MP zurück. Reicht das nicht, nimm auf [[12100000|Shield Smite]] die MP-Spezialisierung („keine MP-Kosten, 200 MP zurück“).',
        en: '**Watch your MP:** always hold the left mouse button – [[12010000|Vicious Strike]] gives MP back. If that is not enough, take the MP specialisation on [[12100000|Shield Smite]] (“no MP cost, 200 MP back”).',
      },
    ],
  },
  build: {
    intro: {
      de: 'Skillpunkte machen deine Skills stärker – mit ihnen bringst du einen Skill höchstens auf Stufe 10, alles darüber kommt von Daevanion-Tafeln, Ausrüstung und Arcana. Bei Skillstufe 8, 12 und 20 bekommt jeder aktive Skill einen Platz für eine **Spezialisierung** (eine Zusatz-Wirkung, die du selbst auswählst). **Stigmen** sind Extra-Skills für deine 4 Stigma-Plätze – die Plätze gehen auf Stufe 22, 27, 32 und 37 auf. Auch [[12120000|Taunt]] ist ein Stigma.',
      en: 'Skill points make your skills stronger – with them you take a skill to level 10 at most; everything above comes from Daevanion boards, gear and Arcana. At skill level 8, 12 and 20 every active skill gets a slot for a **specialisation** (an extra effect you choose yourself). **Stigmas** are extra skills for your 4 stigma slots – the slots open at level 22, 27, 32 and 37. [[12120000|Taunt]] is a stigma too.',
    },
    points: [
      {
        de: '[[12240000|Judgment]] zuerst – dein Hauptschaden. Ziel: Skillstufe 16 für „Abklingzeit entfernt“ (die Stufen über 10 kommen von Tafeln und Ausrüstung) – dort sind alle Top 10.',
        en: '[[12240000|Judgment]] first – your main damage. Goal: skill level 16 for “Remove cooldown” (the levels above 10 come from boards and gear) – all of the top 10 are there.',
      },
      {
        de: 'Dann [[12010000|Vicious Strike]] und [[12040000|Pummel]] – Grundattacke und Füller.',
        en: 'Then [[12010000|Vicious Strike]] and [[12040000|Pummel]] – basic attack and filler.',
      },
      {
        de: 'Danach [[12090000|Punishment]] und [[12350000|Warding Strike]].',
        en: 'After that [[12090000|Punishment]] and [[12350000|Warding Strike]].',
      },
      {
        de: 'Passive Skills (wirken immer, ohne Drücken), sobald du sie bekommst: [[12770000|Insulting Roar]] ab Stufe 17 (+100 % Aggro und auf Skillstufe 10 5 s lang +10 % Angriff, wenn du von vorne triffst) und [[12780000|Fury]] ab Stufe 21 (siehe „Blocken hilft allen“). Dann [[12760000|Impact Hit]]: mehr Wucht (Chance auf doppelten Schaden). Auf diese drei legen die Top 10 die meisten Extra-Stufen von ihrer Ausrüstung.',
        en: 'Passive skills (always active, no key needed), as soon as you get them: [[12770000|Insulting Roar]] from level 17 (+100% enmity, and at skill level 10 +10% Attack for 5 s when you hit from the front) and [[12780000|Fury]] from level 21 (see “Blocking helps everyone”). Then [[12760000|Impact Hit]]: more Double Chance (a chance to deal double damage). The top 10 put the most extra levels from their gear on these three.',
      },
      {
        de: 'Dann [[12100000|Shield Smite]] und [[12300000|Annihilate]], [[12430000|Shield Rush]] und [[12130000|Poach]] sowie [[12270000|Debilitating Smash]] – die Top 10 haben sie auf der Leiste und mit Skillpunkten etwa auf Stufe 10 (Median).',
        en: 'Then [[12100000|Shield Smite]] and [[12300000|Annihilate]], [[12430000|Shield Rush]] and [[12130000|Poach]], and [[12270000|Debilitating Smash]] – the top 10 keep them on their bar, at about level 10 from skill points (median).',
      },
      {
        de: 'Dann die übrigen Passiven: [[12730000|Punishing Benediction]] (mehr kritische Treffer und Zusatzschaden bei Treffern), [[12710000|Enhance Health]] (+30 % max. LP auf Skillstufe 10), [[12740000|Ironclad Defense]] (+25 % Verteidigung) und [[12800000|Block Pain]] ab Stufe 25 (nach einem Treffer 10 s lang +20 % PvE-Schadensresistenz, alle 20 s). Die Top 10 haben alle vier auf 10 (Median).',
        en: 'Then the other passives: [[12730000|Punishing Benediction]] (more Critical Hit and extra damage on hits), [[12710000|Enhance Health]] (+30% max HP at skill level 10), [[12740000|Ironclad Defense]] (+25% Defense) and [[12800000|Block Pain]] from level 25 (after a hit +20% PvE Damage Tolerance for 10 s, every 20 s). The top 10 have all four at 10 (median).',
      },
      {
        de: 'Der Rest zum Schluss: [[12260000|Defiance]] (jede Stufe kürzt die Abklingzeit um 1 s), [[12790000|Survival Willpower]] (+35 % Widerstand gegen Statuseffekte auf Skillstufe 10 – stark im PvP) und [[12750000|Guarding Seal]]. [[12720000|Warding Shield]] gibt seine +200 Block schon auf Stufe 1. Lass [[12340000|Flash Rampage]] auf Stufe 1: Der Skill trifft nur taumelnde Ziele, und die Top 10 lassen ihn auf 1 (Median).',
        en: 'The rest at the end: [[12260000|Defiance]] (every level takes 1 s off its cooldown), [[12790000|Survival Willpower]] (+35% Status Effect Resist at skill level 10 – strong in PvP) and [[12750000|Guarding Seal]]. [[12720000|Warding Shield]] gives its +200 Block already at level 1. Leave [[12340000|Flash Rampage]] at level 1: it only hits staggered targets, and the top 10 keep it at 1 (median).',
      },
    ],
    levels: [
      { id: 12780000 /* Fury */, level: 22, bought: 10, dv: 4, gear: 7.5, passive: true },
      { id: 12760000 /* Impact Hit */, level: 20.5, bought: 10, dv: 4, gear: 6.5, passive: true },
      { id: 12240000 /* Judgment */, level: 20, bought: 10, dv: 4, gear: 6 },
      { id: 12770000 /* Insulting Roar */, level: 19.5, bought: 10, dv: 4, gear: 6, passive: true },
      { id: 12040000 /* Pummel */, level: 18.5, bought: 10, dv: 4, gear: 4.5 },
      { id: 12010000 /* Vicious Strike */, level: 17.5, bought: 10, dv: 4, gear: 3.5 },
      { id: 12090000 /* Punishment */, level: 16.5, bought: 10, dv: 4, gear: 2.5 },
      { id: 12350000 /* Warding Strike */, level: 16, bought: 10, dv: 4, gear: 2 },
      { id: 12430000 /* Shield Rush */, level: 15, bought: 10, dv: 4, gear: 2 },
      { id: 12100000 /* Shield Smite */, level: 14, bought: 10, dv: 3, gear: 1 },
    ],
    specs: [
      {
        id: 12240000 /* Judgment */,
        parts: [12240030 /* Judgment: Extra damage on hit */, 12240050 /* Judgment: Remove cooldown */, 12240040 /* Judgment: Critical Hit on hit */],
        note: {
          de: 'Extra-Schaden, ab Skillstufe 16 keine Abklingzeit mehr – dann geht [[12240000|Judgment]] in jedem Fenster, sogar mehrmals. Bis Stufe 16 belegt der sichere kritische Treffer den zweiten Platz, auf Skillstufe 20 kommt er als dritter zurück.',
          en: 'Extra damage, from skill level 16 no more cooldown – then [[12240000|Judgment]] works in every window, even several times. Until level 16 the guaranteed critical hit takes the second slot; at skill level 20 it comes back as the third.',
        },
      },
      {
        id: 12010000 /* Vicious Strike */,
        parts: [12010030 /* Vicious Strike: +50% Multi-Hit on hit */, 12010040 /* Vicious Strike: -2s [Warding Strike] cooldown on hit */, 12010050 /* Vicious Strike: Adds [Threatening Blow] Chain Skill */],
        note: {
          de: 'Mehrfachtreffer (oder Lebensraub, wenn du mehr Heilung brauchst). Jeder Treffer verkürzt die Abklingzeit von [[12350000|Warding Strike]]. Die Folge-Attacke Einschüchternder Schlag gibt es ab Skillstufe 16 – für sie ist der dritte Platz da (Skillstufe 20), vorher tauschen manche den Mehrfachtreffer dafür.',
          en: 'Multi-Hit (or lifesteal if you need more healing). Every hit cuts the cooldown of [[12350000|Warding Strike]]. The Threatening Blow follow-up comes at skill level 16 – it gets the third slot (skill level 20); before that some swap out the Multi-Hit for it.',
        },
      },
      {
        id: 12090000 /* Punishment */,
        parts: [12090030 /* Punishment: +30% Skill Speed */, 12090050 /* Punishment: Ignores Block and Evasion and lands as a Critical Hit */, 12090020 /* Punishment: Inflicts Damage over Time to target on hit */],
        note: {
          de: 'Schneller aufladen. Ab Skillstufe 16 ignoriert der Skill Block und Ausweichen und trifft immer kritisch; der dritte Platz (Skillstufe 20) bringt Schaden über Zeit – vor Stufe 16 nimmst du den Schaden über Zeit als zweite Wahl. Zum Farmen ist „im Laufen nutzbar“ praktisch.',
          en: 'Charges faster. From skill level 16 it ignores Block and Evasion and always lands as a critical hit; the third slot (skill level 20) adds damage over time – before level 16 take the damage over time as the second pick. For farming, “works while moving” is handy.',
        },
      },
      {
        id: 12100000 /* Shield Smite */,
        parts: [12100040 /* Shield Smite: -2s cooldown */, 12100030 /* Shield Smite: 50% chance to trigger [Debilitating Smash] on hit */],
        note: {
          de: '2 s weniger Abklingzeit bedeuten mehr Fenster für [[12240000|Judgment]], und jeder Treffer schaltet mit 50 % Chance [[12270000|Debilitating Smash]] frei – auch ohne Block. Fehlen dir MP, nimm statt der Freischaltung „keine MP-Kosten, 200 MP zurück“.',
          en: '2 s less cooldown means more windows for [[12240000|Judgment]], and every hit has a 50% chance to unlock [[12270000|Debilitating Smash]] – even without a block. If you are short on MP, take “no MP cost, 200 MP back” instead of the unlock.',
        },
      },
      {
        id: 12350000 /* Warding Strike */,
        parts: [12350010 /* Warding Strike: -5s cooldown */, 12350050 /* Warding Strike: +10% PvE Damage Tolerance and +5% PvP Damage Tolerance to party members on skill use */],
        note: {
          de: '5 s weniger Abklingzeit. Ab Skillstufe 16 nimmt auch deine Gruppe weniger Schaden, wenn du den Skill einsetzt.',
          en: '5 s less cooldown. From skill level 16 your group also takes less damage when you use it.',
        },
      },
      {
        id: 12040000 /* Pummel */,
        parts: [12040040 /* Pummel: -1s [Punishment] cooldown on landing [Punishing Strike] */, 12040030 /* Pummel: Deals up to 12% more damage when less targets are hit */],
        note: {
          de: 'Jede Folge-Attacke verkürzt die Abklingzeit von [[12090000|Punishment]] um 1 s. Brauchst du mehr Heilung, nimm statt der 12 % Schaden den Lebensraub.',
          en: 'Every follow-up cuts the cooldown of [[12090000|Punishment]] by 1 s. If you need more healing, take the lifesteal instead of the 12% damage.',
        },
      },
      {
        id: 12300000 /* Annihilate */,
        parts: [12300030 /* Annihilate: +100% damage to targets with Incapacitated Immunity */, 12300040 /* Annihilate: -10s cooldown */, 12300010 /* Annihilate: +50% Multi-Hit on hit */],
        note: {
          de: '+100 % Schaden gegen Ziele mit Handlungsunfähigkeits-Immunität – also Bosse, die man nicht betäuben kann –, ab Skillstufe 12 dazu 10 s weniger Abklingzeit. Dritter Platz: Mehrfachtreffer.',
          en: '+100% damage against targets with Incapacitated Immunity – that means bosses, which cannot be stunned – and from skill level 12 10 s less cooldown. Third slot: Multi-Hit.',
        },
      },
      {
        id: 12430000 /* Shield Rush */,
        parts: [12430020 /* Shield Rush: +10m Range */, 12430040 /* Shield Rush: -10s cooldown */],
        note: {
          de: 'Reicht 20 statt 10 m weit, und ab Skillstufe 12 ist der Skill schon nach 10 statt 20 s wieder bereit – du kannst ihn nach dem Ausweichen doppelt so oft nutzen.',
          en: 'Reaches 20 m instead of 10 m, and from skill level 12 it is ready again after 10 s instead of 20 s – you can use it after a dodge twice as often.',
        },
      },
      {
        id: 12130000 /* Poach */,
        parts: [12130010 /* Poach: Moves to the target if target has Incapacitated Immunity */],
        note: {
          de: 'Gegen Ziele mit Handlungsunfähigkeits-Immunität (Bosse) bringt dich [[12130000|Poach]] damit zum Ziel – ein zweiter Weg, schnell wieder am Boss zu sein.',
          en: 'Against targets with Incapacitated Immunity (bosses), [[12130000|Poach]] then takes you to the target – a second way to get back to the boss quickly.',
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          {
            id: 12120000 /* Taunt */,
            note: {
              de: 'Dein Aggro-Stigma und der sicherste Weg, einen Boss zurückzuholen. Bring es auf Stufe 20: ab Stufe 5 hält der Boss weniger aus, ab Stufe 15 hat der Skill 5 s weniger Abklingzeit, auf Stufe 20 hält die Schwächung 5 s länger. 5 der Top 10 spielen es, im Median auf Stufe 20.',
              en: 'Your enmity stigma and the surest way to take a boss back. Bring it to level 20: from level 5 the boss takes more damage, from level 15 it has 5 s less cooldown, at level 20 the weakening lasts 5 s longer. 5 of the top 10 run it, at a median level of 20.',
            },
          },
          {
            id: 12070000 /* Doom Shield */,
            note: {
              de: 'Ansturm und das längste Fenster für [[12240000|Judgment]] (3 s) – das kann schon Stufe 1. Höhere Stufen treffen härter: Ab Stufe 5 setzt ein Treffer die Abklingzeit von [[12300000|Annihilate]] zurück, ab 10 gibt es 5 s lang +200 Block, ab 15 ist der Skill sofort wieder bereit, wenn ein Gegner stirbt (Farmen). 8 der Top 10 spielen es, im Median auf Stufe 15.',
              en: 'A charge and the longest window for [[12240000|Judgment]] (3 s) – level 1 already does that. Higher levels hit harder: from level 5 a hit resets the cooldown of [[12300000|Annihilate]], from 10 you get +200 Block for 5 s, from 15 it is ready again right away when an enemy dies (farming). 8 of the top 10 run it, at a median level of 15.',
            },
          },
          {
            id: 12230000 /* Noble Armor */,
            note: {
              de: 'Fast jeder starke Templer spielt es (8 der Top 10): auf Stufe 15 5 Minuten lang +11 % max. LP – so lange wie die Abklingzeit, also immer aktiv. Der eigentliche Wert: Ab Stufe 10 wirkt [[12770000|Insulting Roar]] 1,5-mal so stark, ab 15 auch [[12780000|Fury]]. Bring es zuerst auf 15.',
              en: 'Almost every strong Templar runs it (8 of the top 10): at level 15 +11% max HP for 5 minutes – as long as its cooldown, so it is always up. Its real worth: from level 10 [[12770000|Insulting Roar]] is 1.5 times as strong, from 15 [[12780000|Fury]] too. Take it to 15 first.',
            },
          },
          {
            id: 12450000 /* Battlefield Banner */,
            note: {
              de: 'Mehr Angriff, je nach deiner Verteidigung: 14,5 s lang auf Stufe 10, 20 s auf Stufe 20. Auf Stufe 20 sinkt die Abklingzeit außerdem von 90 auf 60 s.',
              en: 'More Attack, based on your Defense: for 14.5 s at level 10, 20 s at level 20. At level 20 its cooldown also drops from 90 to 60 s.',
            },
          },
          {
            id: 12110000 /* Shield of Protection */,
            note: {
              de: "5 der Top 10 spielen es, meist statt [[12070000|Doom Shield]] oder [[12120000|Taunt]]: sicherer Block für große Treffer, und jeder sichere Block startet [[12780000|Fury]]. Ab Stufe 5 zweimal hintereinander nutzbar. Ist deine Ausrüstung noch schwach, nimm es oder [[12320000|Nezekan's Shield]] statt [[12450000|Battlefield Banner]].",
              en: "5 of the top 10 run it, mostly instead of [[12070000|Doom Shield]] or [[12120000|Taunt]]: a sure block for big hits, and every sure block starts [[12780000|Fury]]. From level 5 you can use it twice in a row. If your gear is still weak, take it or [[12320000|Nezekan's Shield]] instead of [[12450000|Battlefield Banner]].",
            },
          },
          {
            id: 12310000 /* Empyrean Lord's Punishment */,
            note: {
              de: 'Andere Wahl für Gegnergruppen und das Taumeln: betäubt bis zu 4 Gegner (Monster sicher) und füllt die Taumel-Leiste stark (50, ab Stufe 10 100). Stufe 10 bis 15. Ältere Listen zeigen es in den meisten Builds, heute spielt es nur noch 1 der Top 10.',
              en: 'Other choice for packs and the stagger: stuns up to 4 enemies (monsters for sure) and fills the stagger gauge a lot (50, from level 10 100). Level 10 to 15. Older lists show it in most builds; today only 1 of the top 10 runs it.',
            },
          },
        ],
      },
    ],
    daevanion: [
      {
        de: 'Daevanion-Tafeln geben dir Werte und Extra-Skillstufen. Auf **Nezekan** zuerst die Skill-Knoten für [[12710000|Enhance Health]] und [[12740000|Ironclad Defense]] – mehr Leben und Verteidigung. MetaBot nennt auch [[12750000|Guarding Seal]]; die meisten der Top 10 nehmen davon nur einen Teil der Knoten.',
        en: 'Daevanion boards give you stats and extra skill levels. On **Nezekan** take the skill nodes for [[12710000|Enhance Health]] and [[12740000|Ironclad Defense]] first – more health and defence. MetaBot also names [[12750000|Guarding Seal]]; most of the top 10 take only some of its nodes.',
      },
      {
        de: 'Auf **Zikel** die Knoten für [[12780000|Fury]], [[12770000|Insulting Roar]] und [[12760000|Impact Hit]] – fast alle der Top 10 haben sie komplett.',
        en: 'On **Zikel** the nodes for [[12780000|Fury]], [[12770000|Insulting Roar]] and [[12760000|Impact Hit]] – nearly all of the top 10 have all of them.',
      },
      {
        de: 'Auf den normalen Knoten: Max. LP und Verteidigung. Koreanische Guides nehmen zuerst Angriffskraft, für mehr Schaden.',
        en: 'On the normal nodes: Max HP and Defense. Korean guides take Attack first, for more damage.',
      },
      {
        de: '**Azphel** ist die PvP-Tafel: Du bezahlst sie mit Kampfkristallen aus dem PvP, und ihre Werte zählen nur gegen Spieler.',
        en: '**Azphel** is the PvP board: you pay for it with Battle Crystals from PvP, and its stats only count against players.',
      },
    ],
    stats: {
      de: 'Reihenfolge auf den Tafeln: **Max. LP** > Verteidigung > Schadensresistenz > Krit.-Widerstand > Angriffskraft > Schadensverstärkung > Krit.-Schadensresistenz. Auf der Ausrüstung zählt außerdem **Block**: Guides nennen etwa 2.400 bis 2.500 als Ziel. Skillstufen von Ausrüstung und Arcana legen die Top 10 vor allem auf [[12780000|Fury]] (im Median +7,5), [[12760000|Impact Hit]], [[12240000|Judgment]] und [[12770000|Insulting Roar]] (je etwa +6).',
      en: 'Order on the boards: **Max HP** > Defense > Damage Tolerance > Critical Hit Resist > Attack > Damage Boost > Critical Damage Tolerance. On gear, **Block** also counts: guides name about 2,400 to 2,500 as a goal. The top 10 put the skill levels from gear and Arcana mostly on [[12780000|Fury]] (median +7.5), [[12760000|Impact Hit]], [[12240000|Judgment]] and [[12770000|Insulting Roar]] (about +6 each).',
    },
  },
  macro: {
    keys: [
      {
        key: '1',
        ids: [12240000 /* Judgment */, 12300000 /* Annihilate */, 12100000 /* Shield Smite */, 12350000 /* Warding Strike */],
        macro: true,
        note: {
          de: 'Kombo: [[12100000|Shield Smite]] und [[12350000|Warding Strike]] öffnen das Fenster für [[12240000|Judgment]]. Deshalb liegt [[12240000|Judgment]] ganz unten und kommt sofort, wenn das Fenster offen ist. [[12300000|Annihilate]] trifft betäubte Gegner – bei Bossen kommt er ab und zu per Zufall (5 % pro Angriff). [[12350000|Warding Strike]] bleibt im Makro, obwohl er dich heilt: Er ist ein Schild-Angriff für [[12240000|Judgment]], die Heilung kommt nebenbei.',
          en: 'Combo: [[12100000|Shield Smite]] and [[12350000|Warding Strike]] open the window for [[12240000|Judgment]]. That is why [[12240000|Judgment]] sits at the bottom and comes right away when the window is open. [[12300000|Annihilate]] hits stunned enemies – on bosses it comes now and then by chance (5% per attack). [[12350000|Warding Strike]] stays in the macro although it heals you: it is a shield attack for [[12240000|Judgment]], and the heal comes on the side.',
        },
      },
      {
        key: '2',
        ids: [12270000 /* Debilitating Smash */],
        macro: true,
        note: {
          de: 'Geht nur nach einem Block – dann trifft der Skill bis zu 4 Gegner und senkt ihre Verteidigung 5 s lang um 25 %. Die Spezialisierung auf [[12100000|Shield Smite]] schaltet ihn ebenfalls frei. Sonst überspringt das Makro die Taste. Ob die Schwächung bei Bossen viel bringt, ist umstritten – auf der Leiste haben ihn alle Top 10.',
          en: 'Only works after a block – then it hits up to 4 enemies and lowers their Defense by 25% for 5 s. The specialisation on [[12100000|Shield Smite]] unlocks it too. Otherwise the macro skips this key. Whether the weakening does much on bosses is disputed – all of the top 10 have it on their bar.',
        },
      },
      {
        key: '7',
        ids: [12120000 /* Taunt */],
        macro: true,
        note: {
          de: 'Im Makro kommt [[12120000|Taunt]] alle 30 s von selbst (ab Stigma-Stufe 15 alle 25 s) – so bleibt die Aggro bei dir. In der Eröffnung drückst du die Taste von Hand.',
          en: 'In the macro [[12120000|Taunt]] comes by itself every 30 s (every 25 s from stigma level 15) – so enmity stays with you. In the opener you press the key by hand.',
        },
      },
      {
        key: 'T',
        ids: [12340000 /* Flash Rampage */, 12040000 /* Pummel */],
        macro: true,
        note: {
          de: 'Letzter Schritt im Makro. Füller oben, darunter [[12340000|Flash Rampage]]: Dieser Skill geht nur, wenn der Boss taumelt – dann nimmt die Taste ihn von selbst, bei jedem Durchlauf des Makros.',
          en: 'Last step of the macro. Filler on top, [[12340000|Flash Rampage]] below: it only works while the boss staggers – then the key uses it by itself, on every pass of the macro.',
        },
      },
      {
        key: 'R',
        ids: [12010000 /* Vicious Strike */],
        note: {
          de: 'Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Jeder Treffer bringt MP zurück.',
          en: 'Basic attack: hold the left mouse button, **not** in the macro. Every hit gives MP back.',
        },
      },
      {
        key: '4',
        ids: [12090000 /* Punishment */],
        note: { de: 'Aufladen – immer von Hand, denn das Makro lädt nicht richtig auf.', en: 'Charge it – always by hand, because the macro does not charge properly.' },
      },
      {
        key: 'Q',
        ids: [12430000 /* Shield Rush */, 12130000 /* Poach */],
        note: {
          de: 'Ansturm und Heranziehen – von Hand. Unten liegt [[12430000|Shield Rush]]: Der Skill geht nur direkt nach einem Ausweichen oder im Flug – dann bringt Q dich zum Ziel und öffnet das Fenster für [[12240000|Judgment]]. Sonst nimmt Q [[12130000|Poach]]: zieht einen Gegner heran, mit der Spezialisierung bringt es dich zum Boss.',
          en: 'Charge and pull – by hand. [[12430000|Shield Rush]] sits at the bottom: it only works right after a dodge or while flying – then Q takes you to the target and opens the window for [[12240000|Judgment]]. Otherwise Q uses [[12130000|Poach]]: it pulls one enemy in, and with its specialisation it takes you to a boss.',
        },
      },
      {
        key: '5',
        ids: [12070000 /* Doom Shield */],
        note: {
          de: 'Stigma, Ansturm von Hand: bringt dich aus 20 m an den Gegner und öffnet das längste Fenster (3 s) für [[12240000|Judgment]]. In der Eröffnung und danach jedes Mal, wenn es bereit ist.',
          en: 'Stigma, a charge by hand: takes you to the enemy from 20 m and opens the longest window (3 s) for [[12240000|Judgment]]. Use it in the opener and again whenever it is ready.',
        },
      },
      {
        key: '6',
        ids: [12230000 /* Noble Armor */],
        note: {
          de: 'Stigma, Buff von Hand: vor dem Kampf drücken. Er hält 5 Minuten, genau so lange wie seine Abklingzeit – drück ihn wieder, wenn er ausläuft.',
          en: 'Stigma, a buff by hand: press it before the fight. It lasts 5 minutes, exactly as long as its cooldown – press it again when it runs out.',
        },
      },
      {
        key: '8',
        ids: [12450000 /* Battlefield Banner */],
        note: {
          de: "Stigma, Buff von Hand: mehr Angriff je nach deiner Verteidigung – setz ihn vor [[12090000|Punishment]] ein. Ist deine Ausrüstung noch schwach, leg hier [[12110000|Shield of Protection]] oder [[12320000|Nezekan's Shield]] hin.",
          en: "Stigma, a buff by hand: more Attack based on your Defense – use it before [[12090000|Punishment]]. If your gear is still weak, put [[12110000|Shield of Protection]] or [[12320000|Nezekan's Shield]] here instead.",
        },
      },
    ],
    note: {
      de: 'Das Makro drückt 1, 2, 7 und zuletzt T – jeweils mit 10 ms. Halte dazu die Makro-Taste und die linke Maustaste. 4, Q, 5, 6 und 8 drückst du selbst: Was du drückst, hat immer Vorrang. So setzt du Ansturm und Buff genau im richtigen Moment ein. [[12260000|Defiance]] liegt auf der Leertaste – drück sie, sobald du betäubt oder niedergeworfen bist.',
      en: 'The macro presses 1, 2, 7 and T last – each with 10 ms. Hold the macro key and the left mouse button. You press 4, Q, 5, 6 and 8 yourself: whatever you press always comes first. This way you use your charge and buff at exactly the right moment. [[12260000|Defiance]] sits on Space – press it as soon as you are stunned or knocked down.',
    },
  },
  mistakes: [
    {
      de: '**Alten Guides folgen:** Seit dem koreanischen Patch vom 26. August geht [[12240000|Judgment]] nur nach Schild-Angriffen. Ältere Guides und koreanische Builds mit mehr als 4 Stigma-Plätzen passen nicht mehr.',
      en: '**Following old guides:** since the Korean patch of 26 August, [[12240000|Judgment]] only works after shield attacks. Older guides and Korean builds with more than 4 stigma slots no longer fit.',
    },
    {
      de: "**Zwei Skills verwechseln:** [[12090000|Punishment]] ist dein aufladbarer Angriff mit Buff, [[12310000|Empyrean Lord's Punishment]] ein Stigma, das betäubt.",
      en: "**Mixing up two skills:** [[12090000|Punishment]] is your charged attack with a buff, [[12310000|Empyrean Lord's Punishment]] a stigma that stuns.",
    },
    {
      de: '**Zwei Schild-Angriffe direkt hintereinander:** Dazwischen fehlt [[12240000|Judgment]] – das kostet viel Schaden.',
      en: '**Two shield attacks in a row:** [[12240000|Judgment]] is missing in between – that costs a lot of damage.',
    },
    {
      de: '**Den sicheren Block dauernd nutzen:** Liegt [[12110000|Shield of Protection]] auf deiner Leiste, heb es für große Treffer auf – solange du blockst, greifst du nicht an. Und dein normaler Block (aus deinem Block-Wert) schützt nicht vor Betäubung.',
      en: '**Using the sure block all the time:** if [[12110000|Shield of Protection]] is on your bar, save it for big hits – while you block, you do not attack. And your normal Block (from your Block stat) does not protect you from a stun.',
    },
    {
      de: '**Schildsturm ohne Ausweichen:** [[12430000|Shield Rush]] geht nur direkt nach einem Ausweichen oder im Flug. Erst ausweichen, dann Q.',
      en: '**Shield Rush without a dodge:** [[12430000|Shield Rush]] only works right after a dodge or while flying. Dodge first, then press Q.',
    },
    {
      de: '**Im Fenster voll aufladen:** Lädst du [[12090000|Punishment]] voll auf, während ein Fenster offen ist, läuft das Fenster für [[12240000|Judgment]] ab.',
      en: '**Fully charging inside a window:** if you fully charge [[12090000|Punishment]] while a window is open, the window for [[12240000|Judgment]] runs out.',
    },
    {
      de: '**Nicht üben:** Probier die Fenster an der Trainingspuppe aus, bis [[12240000|Judgment]] sicher sitzt.',
      en: '**Not practising:** try the windows on the training scarecrow until [[12240000|Judgment]] lands every time.',
    },
  ],
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Templer haben im Median **214K** Kampfkraft bei Gegenstandsstufe **3.176** (Spanne 201–239K) – Platz 7 der acht Klassen. Mit ≈66 Kampfkraft pro Gegenstandsstufe zeigt der Templer weniger als die Schadensklassen; vergleiche dich darum mit anderen Templern, nicht mit der Gesamtliste.",
      en: "The top 10 Templars have a median **214K** Combat Power at item level **3,176** (range 201–239K) – 7th of the eight classes. At ≈66 Combat Power per item level the Templar shows less than the damage classes, so compare yourself with other Templars, not with the overall list.",
    },
    stats: { cp: 213710.5, cpMin: 200585, cpMax: 239461, itemLevel: 3175.5, cpPerLevel: 66.31, weekly: 52966.5, weeklyOf: 8, rank: { cp: 7, itemLevel: 8, cpPerLevel: 7, weekly: 4 } },
    gear: [
      {
        de: "**Waffe:** Splendent Ebony / Wise Dragon Lord Longsword – alle zehn auf +15 mit Amplified +5. Die Waffe ist das Erste, was bei den Top-Templern fertig ist.",
        en: "**Weapon:** Splendent Ebony / Wise Dragon Lord Longsword – all ten at +15 with Amplified +5. The weapon is the first thing the top Templars finish.",
      },
      {
        de: "**Rüstung:** gemischt – 32 von 70 Teilen Splendent (Gegenstandsstufe 102), 15 Splendent White / Dark Dragon Lord (86), 21 Nuakum. Fast alles auf +15, Amplified Enhancement im Median erst +3. Nur 3 der 10 tragen das ganze 102er-Set.",
        en: "**Armour:** mixed – 32 of 70 pieces Splendent (item level 102), 15 Splendent White / Dark Dragon Lord (86), 21 Nuakum. Nearly all at +15, Amplified Enhancement only +3 at the median. Only 3 of the 10 wear the full 102 set.",
      },
      {
        de: "**Schmuck:** 33 von 50 Teilen Splendent 102, der Rest Splendent 86, Enraged Kromede oder Gartua – fast alle auf +15.",
        en: "**Jewellery:** 33 of 50 pieces Splendent 102, the rest Splendent 86, Enraged Kromede or Gartua – nearly all at +15.",
      },
      {
        de: "**Armreifen und Rest:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80) plus meist ein Liberator Bracelet +10; Revelation Amulet +10 (8 von 10), Noble Belt +10 (7 von 10). Flügel meist Dark Veil (6).",
        en: "**Bracelets and the rest:** exactly one Ascension Bracelet (none of the top 80 wears more) plus mostly a Liberator Bracelet +10; Revelation Amulet +10 (8 of 10), Noble Belt +10 (7 of 10). Wings mostly Dark Veil (6).",
      },
    ],
    arcana: {
      de: "**Chalice und Parchment of Vigor** (9 und 8 von 10) wie fast alle Klassen; bei Compass, Bell und Mirror ist es nahezu halb und halb. Manche Guides raten Tanks zu vier Magic-Karten – das macht nur einer der Top 10. 36 von 50 Karten sind auf +5.",
      en: "**Chalice and Parchment of Vigor** (9 and 8 of 10) like nearly every class; on Compass, Bell and Mirror it is close to half and half. Some guides advise tanks to take four Magic cards – only one of the top 10 does. 36 of 50 cards are at +5.",
    },
    stigmas: [
      { id: 12450000, note: { de: '7 von 10 · Median Stufe 20', en: '7 of 10 · median level 20' } },
      { id: 12120000, note: { de: '5 von 10 · Median Stufe 20', en: '5 of 10 · median level 20' } },
      { id: 12070000, note: { de: '8 von 10 · Median Stufe 15', en: '8 of 10 · median level 15' } },
      { id: 12230000, note: { de: '8 von 10 · Median Stufe 15', en: '8 of 10 · median level 15' } },
    ],
    slotted: [
      { id: 12070000 /* Doom Shield */, n: 8, level: 15 },
      { id: 12230000 /* Noble Armor */, n: 8, level: 15 },
      { id: 12450000 /* Battlefield Banner */, n: 7, level: 20 },
      { id: 12120000 /* Taunt */, n: 5, level: 20 },
      { id: 12110000 /* Shield of Protection */, n: 5, level: 15 },
      { id: 12220000 /* Grapple */, n: 3, level: 15 },
      { id: 12320000 /* Nezekan's Shield */, n: 1, level: 20 },
      { id: 12410000 /* Executing Blade */, n: 1, level: 20 },
      { id: 12310000 /* Empyrean Lord's Punishment */, n: 1, level: 15 },
      { id: 12190000 /* Second Skin */, n: 1, level: 15 },
    ],
    tips: [
      {
        de: "**Amplified ist der Abstand:** Die Top-Templer haben im Median 4 von 20 Plätzen auf Amplified +5, Gladiatoren 14. Dort liegt der größte Teil des Unterschieds zu den Schadensklassen.",
        en: "**Amplified is the gap:** the top Templars have a median 4 of 20 slots at Amplified +5, Gladiators 14. That is where most of the gap to the damage classes lies.",
      },
      {
        de: "**Nuakum reicht lange:** 21 von 70 Rüstungsteilen der Top 10 sind noch Nuakum (Gegenstandsstufe 86) auf +15. Der Wechsel aufs Splendent-Set kommt bei Templern zuletzt – Waffe zuerst.",
        en: "**Nuakum lasts a long time:** 21 of 70 armour pieces of the top 10 are still Nuakum (item level 86) at +15. Templars switch to the Splendent set last – weapon first.",
      },
      {
        de: "**Daevanion:** Im Median sind 59, 61 und 57 von 88 Knoten auf den ersten drei Tafeln offen, 73 von 116 auf der vierten und 36 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 59, 61 and 57 of 88 nodes are open on the first three boards, 73 of 116 on the fourth and 36 of 152 on the fifth.",
      },
    ],
  },
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/templar', label: 'MetaBot – Templar class guide' },
    { href: 'https://aion2.run/en/classes/templier', label: 'aion2.run – Templar class page' },
    { href: 'https://www.inven.co.kr/board/aion2/6438/25862', label: 'Inven (KR) – Templar build post 1' },
    { href: 'https://www.inven.co.kr/board/aion2/6438/24397', label: 'Inven (KR) – Templar build post 2' },
    { href: 'https://gall.dcinside.com/mgallery/board/view/?id=aion2&no=2648507', label: 'DCInside (KR) – AION 2 gallery: Templar post' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-08-26', label: 'AION2Hub – KR update 2026-08-26 (Templar)' },
    { href: 'https://metabot.gg/en/aion-2/guides/class-builds-guide', label: 'MetaBot – Class builds guide' },
    { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide' },
    { href: 'https://aion2-meta.com/guides/templar/', label: 'aion2-meta – Templar guide (global top players, specialisations)' },
    { href: 'https://aion2vault.com/builds/templar/pve/', label: 'AION2 Vault – Templar PvE build (Leonis, Xia, NoBS Game Guides)' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-09-04', label: 'AION2Hub – KR update 2026-09-04 (Templar class care)' },
  ],
  caveat: {
    de: "Der globale Client entspricht etwa dem koreanischen Stand von Anfang September 2026. Wie viel Schaden ein Templer macht, ist umstritten: Manche Guides sehen ihn ganz unten, in Korea spielen viele nach ihren Buffs einen Tank mit gutem Schaden. Die Guides behandeln fast nur PvE – der PvP-Teil oben bleibt deshalb knapp. Bei den Stigmen hat sich viel getan: Ältere Listen (MetaBot) zeigen [[12310000|Empyrean Lord's Punishment]] noch in den meisten Builds, die Top 10 vom 18. Oktober und die globalen Top-Spieler bei aion2-meta spielen fast alle [[12230000|Noble Armor]] und [[12070000|Doom Shield]] – dieser Guide folgt ihnen. Im Zweifel gilt, was im Spiel bei dir funktioniert.",
    en: "The global client is roughly at the Korean state of early September 2026. How much damage a Templar deals is disputed: some guides rank it at the very bottom, in Korea many play a tank with good damage after their buffs. The guides cover almost only PvE – so the PvP part above stays short. The stigmas have changed a lot: older lists (MetaBot) still show [[12310000|Empyrean Lord's Punishment]] in most builds, while the top 10 of 18 October and aion2-meta's global top players nearly all run [[12230000|Noble Armor]] and [[12070000|Doom Shield]] – this guide follows them. When in doubt, what works for you in game wins.",
  },
});
