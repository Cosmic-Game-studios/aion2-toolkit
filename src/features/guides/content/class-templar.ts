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
  updated: '2026-10-15',
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
        de: '**Blocken hilft allen:** Blockst du einen Angriff, macht die ganze Gruppe 20 s lang 10 % mehr Schaden ([[12780000|Fury]]).',
        en: '**Blocking helps everyone:** when you block an attack, the whole group deals 10% more damage for 20 s ([[12780000|Fury]]).',
      },
      {
        de: "**Sammeln und schützen:** Mit [[12130000|Poach]] oder dem Stigma [[12220000|Grapple]] ziehst du Gegner zu dir. Die Stigmen [[12320000|Nezekan's Shield]] und [[12250000|Comrade in Arms]] schützen die Gruppe bei großen Treffern.",
        en: "**Gather and protect:** with [[12130000|Poach]] or the stigma [[12220000|Grapple]] you pull enemies to you. The stigmas [[12320000|Nezekan's Shield]] and [[12250000|Comrade in Arms]] protect the group from big hits.",
      },
      {
        de: "**Taumeln auslösen:** Bosse haben eine Taumel-Leiste. Ist sie voll, **taumeln** sie kurz (im Spiel „benommen“). [[12310000|Empyrean Lord's Punishment]] füllt die Leiste stark.",
        en: "**Cause a stagger:** bosses have a stagger gauge. When it is full, they **stagger** for a short time. [[12310000|Empyrean Lord's Punishment]] fills the gauge a lot.",
      },
    ],
    boss: {
      de: 'Zuerst [[12120000|Taunt]] – ab Stigma-Stufe 5 hält der Boss dadurch auch weniger aus, und die ganze Gruppe macht mehr Schaden. Halte [[12090000|Punishment]] am Laufen: Der Buff „Vollstrecker“ gibt dir 20 s lang 20 % mehr Schaden. Hast du statt [[12450000|Battlefield Banner]] das Stigma [[12110000|Shield of Protection]] auf Taste 8, halte es für große Angriffe bereit, die du kommen siehst.',
      en: 'First [[12120000|Taunt]] – from stigma level 5 the boss also takes more damage, so the whole group deals more. Keep [[12090000|Punishment]] going: its buff “Executor” gives you 20% more damage for 20 s. If you have the stigma [[12110000|Shield of Protection]] on key 8 instead of [[12450000|Battlefield Banner]], keep it ready for big attacks you see coming.',
    },
    pvp: {
      de: 'Im PvP kontrollierst und schützt du: [[12100000|Shield Smite]] betäubt, [[12130000|Poach]] zieht heran, und [[12120000|Taunt]] zwingt Spieler mit 50 % Chance 3 s lang, dich anzugreifen. Mit [[12070000|Doom Shield]] bist du aus 20 m sofort am Gegner.',
      en: 'In PvP you control and protect: [[12100000|Shield Smite]] stuns, [[12130000|Poach]] pulls in, and [[12120000|Taunt]] forces players with a 50% chance to attack you for 3 s. With [[12070000|Doom Shield]] you reach an enemy from 20 m right away.',
    },
    solo: {
      de: 'Allein spielst du sehr sicher: [[12350000|Warding Strike]] heilt dich und senkt den Schaden, den du nimmst. Gegnergruppen ziehst du mit [[12130000|Poach]] heran und betäubst sie mit [[12100000|Shield Smite]].',
      en: 'Solo you play very safely: [[12350000|Warding Strike]] heals you and lowers the damage you take. You pull packs of enemies in with [[12130000|Poach]] and stun them with [[12100000|Shield Smite]].',
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
        de: 'Dein Hauptschaden. Geht nur kurz (2–3 s) nach einem **Schild-Angriff**: [[12100000|Shield Smite]], [[12350000|Warding Strike]], [[12430000|Shield Rush]] oder [[12070000|Doom Shield]]. Ab Skillstufe 16 kannst du per Spezialisierung die Abklingzeit entfernen. Ab Stufe 4.',
        en: 'Your main damage. Only works for a short time (2–3 s) after a **shield attack**: [[12100000|Shield Smite]], [[12350000|Warding Strike]], [[12430000|Shield Rush]] or [[12070000|Doom Shield]]. From skill level 16 a specialisation removes its cooldown. From level 4.',
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
        de: 'Stigma: Du blockst den nächsten Angriff sicher. Solange deine Ausrüstung noch schwach ist, nimmst du es statt [[12450000|Battlefield Banner]] (Taste 8). Heb diesen Skill für große Treffer auf, die du kommen siehst. Achtung: Ein Block schützt nicht vor Betäubung.',
        en: 'Stigma: you block the next attack for sure. While your gear is still weak, take it instead of [[12450000|Battlefield Banner]] (key 8). Save it for big hits you see coming. Careful: a block does not protect you from a stun.',
      },
    },
  ],
  rotation: {
    intro: {
      de: 'Die Grundregel beim Templer: **erst ein Schild-Angriff, dann** [[12240000|Judgment]]. Jeder Schild-Angriff öffnet ein kurzes Fenster (2–3 s), in dem [[12240000|Judgment]] geht. Erst danach kommt der nächste Schild-Angriff.',
      en: 'The basic rule for the Templar: **first a shield attack, then** [[12240000|Judgment]]. Every shield attack opens a short window (2–3 s) in which [[12240000|Judgment]] works. Only after that comes the next shield attack.',
    },
    blocks: [
      {
        title: { de: 'Eröffnung am Boss', en: 'Opener at the boss' },
        steps: [
          { id: 12090000 /* Punishment */, note: { de: 'Taste 4: aus der Entfernung voll aufladen', en: 'Key 4: fully charge from range' } },
          { id: 12430000 /* Shield Rush */, note: { de: 'Taste Q: hin zum Boss, das Fenster geht auf', en: 'Key Q: rush to the boss, the window opens' } },
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
          { id: 12100000 /* Shield Smite */, note: { de: 'Nächster Schild-Angriff', en: 'Next shield attack' } },
          { id: 12300000 /* Annihilate */, note: { de: 'Wenn der Gegner betäubt ist oder am Boden liegt', en: 'When the enemy is stunned or on the ground' } },
          { id: 12350000 /* Warding Strike */, note: { de: 'Schild-Angriff, heilt dich nebenbei', en: 'Shield attack that also heals you' } },
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
        de: "**Gegnergruppen:** Mit [[12130000|Poach]] oder dem Stigma [[12220000|Grapple]] heranziehen, dann [[12100000|Shield Smite]], [[12240000|Judgment]], [[12350000|Warding Strike]] und [[12310000|Empyrean Lord's Punishment]]. Auf betäubte Gegner [[12300000|Annihilate]]. [[12070000|Doom Shield]] ist ab Stigma-Stufe 15 sofort wieder bereit, wenn ein Gegner stirbt.",
        en: "**Packs of enemies:** pull them in with [[12130000|Poach]] or the stigma [[12220000|Grapple]], then [[12100000|Shield Smite]], [[12240000|Judgment]], [[12350000|Warding Strike]] and [[12310000|Empyrean Lord's Punishment]]. On stunned enemies [[12300000|Annihilate]]. From stigma level 15 [[12070000|Doom Shield]] is ready again right away when an enemy dies.",
      },
      {
        de: "**Verteidigung von Hand:** Ist deine Ausrüstung noch schwach, liegt auf Taste 8 statt [[12450000|Battlefield Banner]] ein Schutz-Stigma: [[12110000|Shield of Protection]] für große Treffer, die du kommen siehst, oder [[12320000|Nezekan's Shield]] – es schützt die ganze Gruppe 3 s lang vor einem großen Treffer. Mit dem Stigma [[12250000|Comrade in Arms]] übernimmst du Schaden von anderen.",
        en: "**Defence by hand:** while your gear is still weak, key 8 holds a protective stigma instead of [[12450000|Battlefield Banner]]: [[12110000|Shield of Protection]] for big hits you see coming, or [[12320000|Nezekan's Shield]] – it protects the whole group from one big hit for 3 s. With the stigma [[12250000|Comrade in Arms]] you take over damage from others.",
      },
      {
        de: '**Mit Stigma-Buffs:** Hast du [[12450000|Battlefield Banner]] oder [[12230000|Noble Armor]], setz sie vor [[12090000|Punishment]] ein. [[12070000|Doom Shield]] statt [[12430000|Shield Rush]] öffnet ein längeres Fenster (3 s).',
        en: '**With stigma buffs:** if you have [[12450000|Battlefield Banner]] or [[12230000|Noble Armor]], use them before [[12090000|Punishment]]. [[12070000|Doom Shield]] instead of [[12430000|Shield Rush]] opens a longer window (3 s).',
      },
      {
        de: '**MP im Blick:** Halte immer die linke Maustaste – [[12010000|Vicious Strike]] bringt MP zurück. Die MP-Spezialisierung auf [[12100000|Shield Smite]] hilft zusätzlich.',
        en: '**Watch your MP:** always hold the left mouse button – [[12010000|Vicious Strike]] gives MP back. The MP specialisation on [[12100000|Shield Smite]] helps as well.',
      },
    ],
  },
  build: {
    intro: {
      de: 'Skillpunkte machen deine Skills stärker. Bei Skillstufe 8, 12 und 20 bekommt jeder Skill einen Platz für eine **Spezialisierung** (eine Zusatz-Wirkung, die du selbst auswählst). **Stigmen** sind Extra-Skills für deine 4 Stigma-Plätze – du bekommst sie ab Stufe 22. Auch [[12120000|Taunt]] ist ein Stigma.',
      en: 'Skill points make your skills stronger. At skill level 8, 12 and 20 every skill gets a slot for a **specialisation** (an extra effect you choose yourself). **Stigmas** are extra skills for your 4 stigma slots – you get them from level 22. [[12120000|Taunt]] is a stigma too.',
    },
    points: [
      {
        de: '[[12240000|Judgment]] zuerst – dein Hauptschaden. Ziel: Skillstufe 16 für „Abklingzeit entfernt“.',
        en: '[[12240000|Judgment]] first – your main damage. Goal: skill level 16 for “Remove cooldown”.',
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
        de: 'Dann [[12100000|Shield Smite]] und [[12300000|Annihilate]].',
        en: 'Then [[12100000|Shield Smite]] and [[12300000|Annihilate]].',
      },
      {
        de: 'Passive Skills (wirken immer, ohne Drücken): [[12780000|Fury]], [[12770000|Insulting Roar]] und [[12760000|Impact Hit]] zuerst, dann [[12730000|Punishing Benediction]], [[12740000|Ironclad Defense]] und [[12710000|Enhance Health]].',
        en: 'Passive skills (always active, no key needed): [[12780000|Fury]], [[12770000|Insulting Roar]] and [[12760000|Impact Hit]] first, then [[12730000|Punishing Benediction]], [[12740000|Ironclad Defense]] and [[12710000|Enhance Health]].',
      },
    ],
    specs: [
      {
        id: 12240000 /* Judgment */,
        parts: [12240030 /* Judgment: Extra damage on hit */, 12240050 /* Judgment: Remove cooldown */, 12240040 /* Judgment: Critical Hit on hit */],
        note: {
          de: 'Extra-Schaden, ab Skillstufe 16 keine Abklingzeit mehr – dann geht [[12240000|Judgment]] in jedem Fenster. Auf Skillstufe 20 kommt der sichere kritische Treffer dazu.',
          en: 'Extra damage, from skill level 16 no more cooldown – then [[12240000|Judgment]] works in every window. At skill level 20 add the guaranteed critical hit.',
        },
      },
      {
        id: 12010000 /* Vicious Strike */,
        parts: [12010030 /* Vicious Strike: +50% Multi-Hit on hit */, 12010040 /* Vicious Strike: -2s [Warding Strike] cooldown on hit */, 12010050 /* Vicious Strike: Adds [Threatening Blow] Chain Skill */],
        note: {
          de: 'Mehrfachtreffer (oder Lebensraub, wenn du mehr Heilung brauchst). Jeder Treffer verkürzt die Abklingzeit von [[12350000|Warding Strike]], und ab Skillstufe 16 kommt die Folge-Attacke Einschüchternder Schlag dazu.',
          en: 'Multi-Hit (or lifesteal if you need more healing). Every hit cuts the cooldown of [[12350000|Warding Strike]], and from skill level 16 you get the Threatening Blow follow-up.',
        },
      },
      {
        id: 12090000 /* Punishment */,
        parts: [12090030 /* Punishment: +30% Skill Speed */, 12090040 /* Punishment: Changes to mobile skill */, 12090050 /* Punishment: Ignores Block and Evasion and lands as a Critical Hit */],
        note: {
          de: 'Schneller aufladen und im Laufen nutzbar. Auf Skillstufe 20 trifft der Skill immer kritisch.',
          en: 'Charges faster and works while moving. At skill level 20 it always lands as a critical hit.',
        },
      },
      {
        id: 12100000 /* Shield Smite */,
        parts: [12100020 /* Shield Smite: Removes MP Cost and restores 200 MP on hit */, 12100040 /* Shield Smite: -2s cooldown */],
        note: {
          de: 'Keine MP-Kosten und 200 MP zurück; 2 s weniger Abklingzeit bedeuten mehr Fenster für [[12240000|Judgment]].',
          en: 'No MP cost and 200 MP back; 2 s less cooldown means more windows for [[12240000|Judgment]].',
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
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          {
            id: 12120000 /* Taunt */,
            note: {
              de: 'Dein wichtigstes Stigma. Zuerst auf Stufe 20 bringen: ab Stufe 5 hält der Boss weniger aus, ab Stufe 15 hat der Skill 5 s weniger Abklingzeit.',
              en: 'Your most important stigma. Bring it to level 20 first: from level 5 the boss takes more damage, from level 15 it has 5 s less cooldown.',
            },
          },
          {
            id: 12070000 /* Doom Shield */,
            note: {
              de: 'Ansturm und langes Fenster für [[12240000|Judgment]]. Für Bosse reicht Stufe 1, zum Farmen Stufe 15 (sofort wieder bereit, wenn ein Gegner stirbt).',
              en: 'A charge and a long window for [[12240000|Judgment]]. Level 1 is enough for bosses, level 15 for farming (ready again right away when an enemy dies).',
            },
          },
          {
            id: 12450000 /* Battlefield Banner */,
            note: {
              de: 'Mehr Angriff, je nach deiner Verteidigung, für 14,5 s. Auf Stufe 20: 30 s weniger Abklingzeit.',
              en: 'More Attack, based on your Defense, for 14.5 s. At level 20: 30 s less cooldown.',
            },
          },
          {
            id: 12310000 /* Empyrean Lord's Punishment */,
            note: {
              de: 'Vierter Platz: betäubt bis zu 4 Gegner und füllt die Taumel-Leiste stark. Stufe 10 bis 15.',
              en: 'Fourth slot: stuns up to 4 enemies and fills the stagger gauge a lot. Level 10 to 15.',
            },
          },
          {
            id: 12230000 /* Noble Armor */,
            note: {
              de: 'Andere Wahl für den vierten Platz: 5 Minuten lang +9 % maximale Lebenspunkte. Stufe 15.',
              en: 'Other choice for the fourth slot: +9% max HP for 5 minutes. Level 15.',
            },
          },
          {
            id: 12110000 /* Shield of Protection */,
            note: {
              de: "Ist deine Ausrüstung noch schwach, nimm dieses Stigma oder [[12320000|Nezekan's Shield]] statt [[12450000|Battlefield Banner]].",
              en: "If your gear is still weak, take this stigma or [[12320000|Nezekan's Shield]] instead of [[12450000|Battlefield Banner]].",
            },
          },
        ],
      },
    ],
    daevanion: [
      {
        de: 'Daevanion-Tafeln geben dir Werte und Extra-Skillstufen. Auf **Nezekan** zuerst die Skill-Knoten für [[12710000|Enhance Health]], [[12740000|Ironclad Defense]] und [[12750000|Guarding Seal]] – mehr Leben und Verteidigung.',
        en: 'Daevanion boards give you stats and extra skill levels. On **Nezekan** take the skill nodes for [[12710000|Enhance Health]], [[12740000|Ironclad Defense]] and [[12750000|Guarding Seal]] first – more health and defence.',
      },
      {
        de: 'Auf **Zikel** die Knoten für [[12780000|Fury]] und [[12770000|Insulting Roar]].',
        en: 'On **Zikel** the nodes for [[12780000|Fury]] and [[12770000|Insulting Roar]].',
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
      de: 'Reihenfolge auf den Tafeln: **Max. LP** > Verteidigung > Schadensresistenz > Krit.-Widerstand > Angriffskraft > Schadensverstärkung > Krit.-Schadensresistenz. Auf der Ausrüstung zählt außerdem **Block**: Guides nennen etwa 2.400 bis 2.500 als Ziel.',
      en: 'Order on the boards: **Max HP** > Defense > Damage Tolerance > Critical Hit Resist > Attack > Damage Boost > Critical Damage Tolerance. On gear, **Block** also counts: guides name about 2,400 to 2,500 as a goal.',
    },
  },
  macro: {
    keys: [
      {
        key: '1',
        ids: [12240000 /* Judgment */, 12300000 /* Annihilate */, 12100000 /* Shield Smite */, 12350000 /* Warding Strike */],
        macro: true,
        note: {
          de: 'Kombo: [[12100000|Shield Smite]] und [[12350000|Warding Strike]] öffnen das Fenster für [[12240000|Judgment]]. Deshalb liegt [[12240000|Judgment]] ganz unten und kommt sofort, wenn das Fenster offen ist. [[12300000|Annihilate]] trifft betäubte Gegner. [[12350000|Warding Strike]] bleibt im Makro, obwohl er dich heilt: Er ist ein Schild-Angriff für [[12240000|Judgment]], die Heilung kommt nebenbei.',
          en: 'Combo: [[12100000|Shield Smite]] and [[12350000|Warding Strike]] open the window for [[12240000|Judgment]]. That is why [[12240000|Judgment]] sits at the bottom and comes right away when the window is open. [[12300000|Annihilate]] hits stunned enemies. [[12350000|Warding Strike]] stays in the macro although it heals you: it is a shield attack for [[12240000|Judgment]], and the heal comes on the side.',
        },
      },
      {
        key: '2',
        ids: [12270000 /* Debilitating Smash */],
        macro: true,
        note: { de: 'Trifft bis zu 4 Gegner.', en: 'Hits up to 4 enemies.' },
      },
      {
        key: '6',
        ids: [12310000 /* Empyrean Lord's Punishment */],
        macro: true,
        note: { de: 'Betäubt bis zu 4 Gegner und füllt die Taumel-Leiste stark.', en: 'Stuns up to 4 enemies and fills the stagger gauge a lot.' },
      },
      {
        key: '7',
        ids: [12120000 /* Taunt */],
        macro: true,
        note: {
          de: 'Im Makro kommt [[12120000|Taunt]] alle 30 s von selbst – so bleibt die Aggro bei dir. In der Eröffnung drückst du die Taste von Hand.',
          en: 'In the macro [[12120000|Taunt]] comes by itself every 30 s – so enmity stays with you. In the opener you press the key by hand.',
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
          de: 'Ansturm und Heranziehen – von Hand. Unten liegt [[12430000|Shield Rush]]: Der Skill öffnet auch das Fenster für [[12240000|Judgment]]. Darüber [[12130000|Poach]].',
          en: 'Charge and pull – by hand. [[12430000|Shield Rush]] sits at the bottom: it also opens the window for [[12240000|Judgment]]. Above it [[12130000|Poach]].',
        },
      },
      {
        key: '5',
        ids: [12070000 /* Doom Shield */],
        note: {
          de: 'Stigma, Ansturm von Hand: bringt dich aus 20 m an den Gegner. Statt [[12430000|Shield Rush]] öffnet es ein längeres Fenster (3 s) für [[12240000|Judgment]].',
          en: 'Stigma, a charge by hand: takes you to the enemy from 20 m. Instead of [[12430000|Shield Rush]] it opens a longer window (3 s) for [[12240000|Judgment]].',
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
      de: 'Das Makro drückt 1, 2, 6, 7 und zuletzt T – jeweils mit 10 ms. Halte dazu die Makro-Taste und die linke Maustaste. 4, Q, 5 und 8 drückst du selbst: Was du drückst, hat immer Vorrang. So setzt du Ansturm und Buff genau im richtigen Moment ein. [[12260000|Defiance]] liegt auf der Leertaste – drück sie, sobald du betäubt oder niedergeworfen bist.',
      en: 'The macro presses 1, 2, 6, 7 and T last – each with 10 ms. Hold the macro key and the left mouse button. You press 4, Q, 5 and 8 yourself: whatever you press always comes first. This way you use your charge and buff at exactly the right moment. [[12260000|Defiance]] sits on Space – press it as soon as you are stunned or knocked down.',
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
      de: '**Den sicheren Block dauernd nutzen:** Liegt [[12110000|Shield of Protection]] auf deiner Leiste, heb es für große Treffer auf. Und ein Block schützt nicht vor Betäubung.',
      en: '**Using the sure block all the time:** if [[12110000|Shield of Protection]] is on your bar, save it for big hits. And a block does not protect you from a stun.',
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
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/templar', label: 'MetaBot – Templar class guide' },
    { href: 'https://aion2.run/en/classes/templier', label: 'aion2.run – Templar class page' },
    { href: 'https://www.inven.co.kr/board/aion2/6438/25862', label: 'Inven (KR) – Templar build post 1' },
    { href: 'https://www.inven.co.kr/board/aion2/6438/24397', label: 'Inven (KR) – Templar build post 2' },
    { href: 'https://gall.dcinside.com/mgallery/board/view/?id=aion2&no=2648507', label: 'DCInside (KR) – AION 2 gallery: Templar post' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-08-26', label: 'AION2Hub – KR update 2026-08-26 (Templar)' },
    { href: 'https://metabot.gg/en/aion-2/guides/class-builds-guide', label: 'MetaBot – Class builds guide' },
    { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide' },
  ],
  caveat: {
    de: 'Der globale Client entspricht etwa dem koreanischen Stand von Anfang September 2026. Wie viel Schaden ein Templer macht, ist umstritten: Manche Guides sehen ihn ganz unten, in Korea spielen viele nach ihren Buffs einen Tank mit gutem Schaden. Die Guides behandeln fast nur PvE – der PvP-Teil oben bleibt deshalb knapp. Im Zweifel gilt, was im Spiel bei dir funktioniert.',
    en: 'The global client is roughly at the Korean state of early September 2026. How much damage a Templar deals is disputed: some guides rank it at the very bottom, in Korea many play a tank with good damage after their buffs. The guides cover almost only PvE – so the PvP part above stays short. When in doubt, what works for you in game wins.',
  },
});
