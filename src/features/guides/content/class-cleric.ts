import { classGuide } from './classGuide';

export const clericGuide = classGuide({
  id: 'cleric',
  cls: 'Cleric',
  tone: 'gold',
  title: { de: 'Kleriker-Guide', en: 'Cleric guide' },
  summary: {
    de: "Der Kleriker hält die Gruppe am Leben und macht nebenbei guten Schaden. Hier lernst du Schritt für Schritt Heilung, Debuffs, Rotation, Build und Makro.",
    en: "The Cleric keeps the group alive and deals good damage on the side. Learn heals, debuffs, rotation, build and macro step by step.",
  },
  tags: [
    { de: 'Heiler', en: 'Healer' },
    { de: 'Fernkampf', en: 'Ranged' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-15',
  glance: [
    {
      label: { de: 'Rolle', en: 'Role' },
      value: {
        de: "**Heiler**, der auch Schaden macht – Heilung, Debuffs und Wiederbelebung",
        en: "**Healer** who also deals damage – heals, debuffs and resurrection",
      },
    },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: 'Mittel', en: 'Medium' } },
    {
      label: { de: 'Reichweite', en: 'Range' },
      value: { de: "Fernkampf – Angriffe bis 20 m, Heilungen bis 40 m", en: "Ranged – attacks up to 20 m, heals up to 40 m" },
    },
    {
      label: { de: 'Stärken', en: 'Strengths' },
      value: {
        de: "Hält die Gruppe am Leben, entfernt Debuffs, einzige Wiederbelebung im Kampf, starke Debuffs, sichere Reichweite",
        en: "Keeps the group alive, removes debuffs, the only resurrection during a fight, strong debuffs, safe range",
      },
    },
    {
      label: { de: 'Schwächen', en: 'Weaknesses' },
      value: {
        de: "Der Schaden braucht Vorbereitung ([[17070000|Chain of Torment]] vor [[17350000|Condemnation]]), kaum Bewegungs-Skills",
        en: "Your damage needs setup ([[17070000|Chain of Torment]] before [[17350000|Condemnation]]), almost no movement skills",
      },
    },
  ],
  forWhom: {
    de: "du gern ein Auge auf deine Gruppe hast, einen Kampf auch mal in letzter Sekunde rettest und trotzdem selbst angreifen willst. Als einziger echter Heiler bist du in Gruppen gern gesehen.",
    en: "you like to keep an eye on your group, enjoy saving a fight at the last second and still want to attack yourself. As the only real healer, you are welcome in any group.",
  },
  party: {
    dungeon: [
      {
        de: "**Die Gruppe am Leben halten:** [[17090000|Light of Regeneration]] ist eine **Heilung über Zeit** – sie heilt die ganze Gruppe 30 Sekunden lang alle 2 Sekunden ein Stück. Nutze sie, sobald sie bereit ist. [[17120000|Radiant Recovery]], wenn die ganze Gruppe Schaden bekommt, [[17100000|Healing Light]], wenn ein Spieler wenig LP hat.",
        en: "**Keep the group alive:** [[17090000|Light of Regeneration]] is a **heal over time** – it heals the whole group a little every 2 seconds for 30 seconds. Use it whenever it is ready. [[17120000|Radiant Recovery]] when the whole group takes damage, [[17100000|Healing Light]] when one player is low on HP.",
      },
      {
        de: "**Debuffs (Schwächungen für den Gegner):** Mit [[17070000|Chain of Torment]] bekommt der Gegner mehr Schaden, mit [[17080000|Debilitating Mark]] macht er weniger. Halte beide den ganzen Kampf auf dem Boss – davon hat die ganze Gruppe etwas.",
        en: "**Debuffs (effects that weaken the enemy):** [[17070000|Chain of Torment]] makes the enemy take more damage, [[17080000|Debilitating Mark]] makes it deal less. Keep both on the boss the whole fight – the whole group profits.",
      },
      {
        de: "**Wiederbelebung:** [[17390000|Summon Resurrection]] holt einen gefallenen Mitspieler mitten im Kampf zurück – das kann sonst keine Klasse. Heb es für genau diesen Moment auf.",
        en: "**Resurrection:** [[17390000|Summon Resurrection]] brings a fallen player back in the middle of a fight – no other class can do that. Save it for exactly that moment.",
      },
      {
        de: "**Gruppen-Buff (Verstärkung):** [[17410000|Light of Protection]] gibt allen mehr Schaden und weniger erlittenen Schaden. Es wirkt nicht zusammen mit [[18190000|Undefeated Mantra]] vom Kantor – ist ein Kantor dabei, nimm ein anderes Stigma.",
        en: "**Group buff (an effect that makes you stronger):** [[17410000|Light of Protection]] gives everyone more damage and less damage taken. It does not stack with the Chanter's [[18190000|Undefeated Mantra]] – with a Chanter in the group, take another stigma.",
      },
      {
        de: "**Zwischendurch angreifen:** Braucht gerade niemand Heilung, machst du Schaden. Dein Passiv [[17800000|Radiant Benediction]] heilt dabei die Gruppe ein wenig, wenn du triffst.",
        en: "**Attack in between:** when nobody needs healing, you deal damage. Your passive [[17800000|Radiant Benediction]] heals the group a little whenever you hit.",
      },
    ],
    boss: {
      de: "Halte [[17070000|Chain of Torment]] und [[17080000|Debilitating Mark]] auf dem Boss. Spielst du einen schweren Dungeon mit [[17420000|Yustiel's Power]] statt [[17440000|Noble Aura]] auf Taste 8, drück es kurz vor einem großen Angriff: Die Gruppe nimmt dann eine Zeit lang weniger Schaden. Viele Skills füllen die Taumel-Leiste des Bosses – ist sie voll, **taumelt** er kurz. Nur dann wirkt [[17370000|Lightning Strike Scattershot]].",
      en: "Keep [[17070000|Chain of Torment]] and [[17080000|Debilitating Mark]] on the boss. If you run a hard dungeon with [[17420000|Yustiel's Power]] instead of [[17440000|Noble Aura]] on key 8, press it just before a big attack: the group takes less damage for a while. Many skills fill the boss's stagger bar – when it is full, the boss **staggers** for a moment. Only then does [[17370000|Lightning Strike Scattershot]] work.",
    },
    pvp: {
      de: "Einen festen PvP-Build gibt es noch nicht. Viele nehmen [[17430000|Prayer of Amplification]], [[17410000|Light of Protection]], [[17420000|Yustiel's Power]] und [[17300000|Voice of Doom]] – dieser Skill senkt die Heilung des Gegners 20 Sekunden lang stark. [[17240000|Defiance]] auf der Leertaste befreit dich aus Betäubungen. Für PvP gibt es die Tafel Azphel, die du mit Kampfkristallen bezahlst.",
      en: "There is no agreed PvP build yet. Many players take [[17430000|Prayer of Amplification]], [[17410000|Light of Protection]], [[17420000|Yustiel's Power]] and [[17300000|Voice of Doom]] – it cuts the enemy's healing hard for 20 seconds. [[17240000|Defiance]] on Space frees you from stuns. For PvP there is the Azphel board, which you pay with Battle Crystals.",
    },
    solo: {
      de: "Du kämpfst aus der Ferne und levelst, indem du angreifst. Halte die linke Maustaste gedrückt: [[17010000|Earth's Retribution]] gibt dir dabei MP zurück. [[17100000|Healing Light]] heilt immer auch dich selbst. Du hast kaum Bewegungs-Skills – halte also Abstand.",
      en: "You fight from range and level up by attacking. Hold the left mouse button: [[17010000|Earth's Retribution]] also gives you MP back. [[17100000|Healing Light]] always heals you as well. You have almost no movement skills – so keep your distance.",
    },
  },
  skills: [
    {
      id: 17350000 /* Condemnation */,
      note: {
        de: "Dein Hauptschaden mit nur 3 s **Abklingzeit** (die Wartezeit, bis ein Skill wieder geht). Trifft nur Gegner, auf denen [[17070000|Chain of Torment]] liegt. Ab Stufe 8.",
        en: "Your main damage with only a 3 s **cooldown** (the wait until a skill works again). Only hits enemies that have [[17070000|Chain of Torment]] on them. From level 8.",
      },
    },
    {
      id: 17070000 /* Chain of Torment */,
      note: {
        de: "Debuff: Der Gegner bekommt mehr Schaden und verliert über Zeit LP. Ohne diesen Debuff geht [[17350000|Condemnation]] nicht. Ab Stufe 4.",
        en: "Debuff: the enemy takes more damage and loses HP over time. Without it [[17350000|Condemnation]] does not work. From level 4.",
      },
    },
    {
      id: 17080000 /* Debilitating Mark */,
      note: {
        de: "Debuff: Der Gegner macht weniger Schaden und verliert über Zeit LP. 10 s Abklingzeit – immer auf dem Ziel halten. Ab Stufe 1.",
        en: "Debuff: the enemy deals less damage and loses HP over time. 10 s cooldown – keep it up all the time. From level 1.",
      },
    },
    {
      id: 17090000 /* Light of Regeneration */,
      note: {
        de: "Heilung über Zeit für die Gruppe: heilt 30 Sekunden lang und hat 30 s Abklingzeit – sie kann also immer laufen. Ab Stufe 7.",
        en: "Heal over time for the group: it heals for 30 seconds and has a 30 s cooldown – so it can always be running. From level 7.",
      },
    },
    {
      id: 17120000 /* Radiant Recovery */,
      note: {
        de: "Heilt die ganze Gruppe auf einmal und entfernt bei jedem einen Debuff. Ab Stufe 12.",
        en: "Heals the whole group at once and removes one debuff from everyone. From level 12.",
      },
    },
    {
      id: 17100000 /* Healing Light */,
      note: {
        de: "Schnelle Heilung für dich und das Gruppenmitglied mit den wenigsten LP. 6 s Abklingzeit. Ab Stufe 10.",
        en: "Quick heal for you and the group member with the lowest HP. 6 s cooldown. From level 10.",
      },
    },
    {
      id: 17010000 /* Earth's Retribution */,
      note: {
        de: "Deine Grundattacke: linke Maustaste gedrückt halten. Jeder Treffer gibt dir MP zurück. Ab Stufe 1.",
        en: "Your basic attack: hold the left mouse button. Every hit gives you MP back. From level 1.",
      },
    },
    {
      id: 17390000 /* Summon Resurrection */,
      note: {
        de: "Stigma: holt einen gefallenen Mitspieler im Kampf zurück. Stigmen gibt es ab Stufe 22.",
        en: "Stigma: brings a fallen group member back during the fight. Stigmas unlock at level 22.",
      },
    },
  ],
  rotation: {
    intro: {
      de: "Als Kleriker machst du immer zwei Dinge: heilen und angreifen. Heilung geht vor – aber nur, wenn jemand sie wirklich braucht. Den Rest der Zeit greifst du an.",
      en: "As a Cleric you always do two things: heal and attack. Healing comes first – but only when someone really needs it. The rest of the time you attack.",
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 17440000 /* Noble Aura */, note: { de: 'Stigma – vor dem Kampf, kämpft 5 Minuten mit', en: 'Stigma – before the pull, fights with you for 5 minutes' } },
          { id: 17410000 /* Light of Protection */, note: { de: 'Einmal anschalten – weglassen, wenn ein Kantor dabei ist', en: 'Switch it on once – skip it with a Chanter in the group' } },
          { id: 17090000 /* Light of Regeneration */, note: { de: 'Zum Kampfbeginn – heilt die Gruppe 30 Sekunden lang', en: 'At the pull – heals the group for 30 seconds' } },
          { id: 17430000 /* Prayer of Amplification */, note: { de: 'Mehr Angriffskraft für kurze Zeit', en: 'More Attack for a short time' } },
          { id: 17070000 /* Chain of Torment */, note: { de: 'Den Boss markieren', en: 'Mark the boss' } },
          { id: 17080000 /* Debilitating Mark */, note: { de: 'Zweiter Debuff', en: 'Second debuff' } },
          { id: 17400000 /* Earth Punishment */, note: { de: 'Stigma – ab Stufe 5 trifft dein Hauptangriff hier immer kritisch', en: 'Stigma – from level 5 your main attack always crits here' } },
          { id: 17060000 /* Bolt */, note: { de: 'Von Hand voll aufladen', en: 'Charge it fully by hand' } },
        ],
      },
      {
        title: { de: 'Im Kampf: erst heilen, dann Schaden', en: 'In the fight: heal first, then damage' },
        steps: [
          { id: 17090000 /* Light of Regeneration */, note: { de: 'Immer, wenn bereit', en: 'Whenever it is ready' } },
          { id: 17120000 /* Radiant Recovery */, note: { de: 'Nach Gruppenschaden oder einem Debuff', en: 'After group damage or a debuff' } },
          { id: 17100000 /* Healing Light */, note: { de: 'Wenn ein Spieler wenig LP hat', en: 'When one player is low on HP' } },
          { id: 17070000 /* Chain of Torment */, note: { de: 'Auf dem Ziel halten', en: 'Keep it on the target' } },
          { id: 17080000 /* Debilitating Mark */, note: { de: 'Auf dem Ziel halten', en: 'Keep it on the target' } },
          { id: 17350000 /* Condemnation */, note: { de: 'Hauptschaden – immer wieder', en: 'Main damage – again and again' } },
          { id: 17150000 /* Divine Aura */, note: { de: 'Immer, wenn bereit', en: 'Whenever it is ready' } },
          { id: 17060000 /* Bolt */, note: { de: 'Aufladen, wenn bereit', en: 'Charge it whenever it is ready' } },
          { id: 17040000 /* Judgment Thunder */, note: { de: 'Füller auf Taste T', en: 'Filler on key T' } },
          { id: 17370000 /* Lightning Strike Scattershot */, note: { de: 'Nur, wenn der Boss taumelt', en: 'Only while the boss staggers' } },
        ],
      },
    ],
    tips: [
      {
        de: "**Nicht auf Vorrat heilen.** Heile, wenn Schaden da ist – kleine Treffer fängt [[17090000|Light of Regeneration]] sowieso ab.",
        en: "**Do not heal in advance.** Heal when damage has happened – [[17090000|Light of Regeneration]] takes care of small hits anyway.",
      },
      {
        de: "**Schadens-Ausrüstung ist Heil-Ausrüstung:** Deine Heilung wächst mit deiner Angriffskraft ([[17740000|Healing Enhancement]]). Angreifen macht dich also nie zum schlechteren Heiler.",
        en: "**Damage gear is healing gear:** your heals grow with your Attack ([[17740000|Healing Enhancement]]). So attacking never makes you a worse healer.",
      },
      {
        de: "**Zahlen prüfen:** Schau in die Schadensanzeige des Spiels (Combat Analysis). Macht [[17350000|Condemnation]] weniger Schaden als [[17040000|Judgment Thunder]], fehlt [[17070000|Chain of Torment]] auf dem Ziel – oder dir fehlt [[17400000|Earth Punishment]].",
        en: "**Check your numbers:** look at the game's own damage meter (Combat Analysis). If [[17350000|Condemnation]] does less damage than [[17040000|Judgment Thunder]], [[17070000|Chain of Torment]] is missing on the target – or you are missing [[17400000|Earth Punishment]].",
      },
      {
        de: "**Jemand ist gestorben?** [[17390000|Summon Resurrection]] holt ihn im Kampf zurück. Danach ein paar Sekunden gut auf ihn aufpassen und heilen.",
        en: "**Someone died?** [[17390000|Summon Resurrection]] brings them back during the fight. Afterwards, watch them closely for a few seconds and heal them.",
      },
    ],
  },
  build: {
    intro: {
      de: "Mit Skillpunkten bringst du einen Skill bis Stufe 10. Höhere Stufen kommen von den Daevanion-Tafeln und der Ausrüstung. **Stigmen** sind besondere Skills für deine 4 Stigma-Plätze; du bekommst sie ab Stufe 22.",
      en: "Skill points take a skill up to level 10. Higher levels come from the Daevanion boards and your gear. **Stigmas** are special skills for your 4 stigma slots; you get them from level 22.",
    },
    points: [
      { de: "Beim Leveln zuerst [[17010000|Earth's Retribution]] und [[17040000|Judgment Thunder]] – deine Angriffe ab Stufe 1", en: "While levelling, first [[17010000|Earth's Retribution]] and [[17040000|Judgment Thunder]] – your attacks from level 1" },
      { de: "Dann [[17070000|Chain of Torment]] (ab Stufe 4) und [[17350000|Condemnation]] (ab Stufe 8) – dein Schadens-Paar", en: "Then [[17070000|Chain of Torment]] (level 4) and [[17350000|Condemnation]] (level 8) – your damage pair" },
      { de: "Dann [[17100000|Healing Light]] (ab Stufe 10) und [[17060000|Bolt]] (ab Stufe 14)", en: "Then [[17100000|Healing Light]] (level 10) and [[17060000|Bolt]] (level 14)" },
      { de: "Ab Stufe 21: das Passiv [[17780000|Earth's Grace]] auf Stufe 10", en: "From level 21: the passive [[17780000|Earth's Grace]] to level 10" },
      {
        de: "Endgame: [[17350000|Condemnation]] am höchsten (bis 20), dann [[17040000|Judgment Thunder]], [[17120000|Radiant Recovery]], [[17090000|Light of Regeneration]] und [[17100000|Healing Light]] auf 16",
        en: "Endgame: [[17350000|Condemnation]] highest (up to 20), then [[17040000|Judgment Thunder]], [[17120000|Radiant Recovery]], [[17090000|Light of Regeneration]] and [[17100000|Healing Light]] to 16",
      },
      { de: "Später: [[17060000|Bolt]], [[17010000|Earth's Retribution]] und [[17150000|Divine Aura]] bis 20", en: "Later: [[17060000|Bolt]], [[17010000|Earth's Retribution]] and [[17150000|Divine Aura]] up to 20" },
    ],
    specs: [
      {
        id: 17350000 /* Condemnation */,
        parts: [17350010 /* Condemnation: Restores 100 MP on hit */, 17350040 /* Condemnation: Resets cooldown on landing a Critical Hit with [Condemnation] */, 17350050 /* Condemnation: Multi-Hit on hit */],
        note: {
          de: "Die Stufe-12-Option ist der wichtigste Schritt: Ein kritischer Treffer setzt die Abklingzeit zurück. Liegt [[17400000|Earth Punishment]] (ab Stigma-Stufe 5) auf dem Ziel, trifft jeder Schlag kritisch – so kannst du [[17350000|Condemnation]] immer wieder einsetzen. Die MP-Option hilft beim Leveln.",
          en: "The level 12 option is the key step: a critical hit resets the cooldown. With [[17400000|Earth Punishment]] (stigma level 5 or higher) on the target, every hit crits – so you can use [[17350000|Condemnation]] again and again. The MP option helps while levelling.",
        },
      },
      {
        id: 17070000 /* Chain of Torment */,
        parts: [17070020 /* Chain of Torment: +3s Damage over Time */, 17070040 /* Chain of Torment: +10% PvE Damage Tolerance reduction and +5% PvP Damage Tolerance reduction */, 17070050 /* Chain of Torment: Ignores Block and Evasion and reduces Damage over Time interval by 50% */],
        note: {
          de: "Längerer Schaden über Zeit und ein noch schwächerer Gegner – davon hat die ganze Gruppe etwas.",
          en: "Longer damage over time and an even weaker enemy – the whole group profits.",
        },
      },
      {
        id: 17080000 /* Debilitating Mark */,
        parts: [17080020 /* Debilitating Mark: --15% target Defense for duration of Damage over Time */, 17080040 /* Debilitating Mark: +10% PvE Damage Boost reduction and +5% PvP Damage Boost reduction */],
        note: {
          de: "Der Gegner verliert Verteidigung und macht noch weniger Schaden.",
          en: "The enemy loses Defense and deals even less damage.",
        },
      },
      {
        id: 17090000 /* Light of Regeneration */,
        parts: [17090020 /* Light of Regeneration: +20% amount healed when HP is 50% or less */, 17090040 /* Light of Regeneration: +5% Move Speed during healing */, 17090050 /* Light of Regeneration: +5% PvE Damage Tolerance and +2.5% PvP Damage Tolerance during healing */],
        note: {
          de: "Heilt Spieler mit wenig LP stärker; solange die Heilung läuft, ist die Gruppe schneller und nimmt weniger Schaden.",
          en: "Heals low players more; while it runs, the group moves faster and takes less damage.",
        },
      },
      {
        id: 17120000 /* Radiant Recovery */,
        parts: [17120010 /* Radiant Recovery: Removes up to 2 debuffs */, 17120030 /* Radiant Recovery: -3s cooldown */, 17120040 /* Radiant Recovery: +10% Incoming Heal for 10s */],
        note: {
          de: "Entfernt 2 Debuffs, ist 3 s früher wieder da, und danach wirkt jede Heilung auf die Gruppe 10 Sekunden lang stärker.",
          en: "Removes 2 debuffs, comes back 3 s sooner, and afterwards every heal on the group is stronger for 10 seconds.",
        },
      },
      {
        id: 17100000 /* Healing Light */,
        parts: [17100010 /* Healing Light: +2 consecutive uses */, 17100040 /* Healing Light: +2% HP restored */, 17100050 /* Healing Light: -2s cooldown */],
        note: {
          de: "Zweimal hintereinander nutzbar, etwas mehr Heilung und eine kürzere Abklingzeit.",
          en: "Two uses in a row, a bit more healing and a shorter cooldown.",
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          {
            id: 17410000 /* Light of Protection */,
            note: {
              de: "Gruppen-Buff: mehr Schaden, weniger erlittener Schaden. Ein Schalter – einmal an, bleibt an. Mit einem Kantor in der Gruppe tauschen.",
              en: "Group buff: more damage, less damage taken. A switch – turn it on once and it stays on. Swap it out with a Chanter in the group.",
            },
          },
          {
            id: 17400000 /* Earth Punishment */,
            note: {
              de: "Ab Stigma-Stufe 5 trifft [[17350000|Condemnation]] dieses Ziel immer kritisch. Ab Stufe 10 bekommt auch die Gruppe einen Buff.",
              en: "From stigma level 5, [[17350000|Condemnation]] always crits this target. From level 10 the group gets a buff as well.",
            },
          },
          {
            id: 17430000 /* Prayer of Amplification */,
            note: {
              de: "Kurz mehr Angriffskraft – für Burst-Phasen. Weil deine Heilung mit der Angriffskraft wächst, heilst du dann auch stärker.",
              en: "More Attack for a short time – for burst phases. Since your heals grow with Attack, you also heal more then.",
            },
          },
          {
            id: 17440000 /* Noble Aura */,
            note: {
              de: "Eine **Aura** beschwörst du neben dir. Diese folgt dir 5 Minuten lang und greift dein Ziel mit an. Vor dem Kampf beschwören.",
              en: "You summon an **aura** next to you. This one follows you for 5 minutes and attacks your target with you. Summon it before the pull.",
            },
          },
          {
            id: 17390000 /* Summon Resurrection */,
            note: {
              de: "Zum Tauschen: für schwere oder neue Dungeons – oder statt [[17410000|Light of Protection]], wenn ein Kantor dabei ist. [[17290000|Absolution]] (große Gruppenheilung) geht dafür auch.",
              en: "To swap in: for hard or new dungeons – or instead of [[17410000|Light of Protection]] when a Chanter is with you. [[17290000|Absolution]] (a big group heal) works there too.",
            },
          },
          {
            id: 17420000 /* Yustiel's Power */,
            note: {
              de: "Zum Tauschen für schwere Dungeons: kurz vor einem großen Boss-Angriff drücken – die Gruppe nimmt dann weniger Schaden.",
              en: "To swap in for hard dungeons: press it just before a big boss attack – the group then takes less damage.",
            },
          },
        ],
      },
      {
        title: { de: 'Stigmen für PvP', en: 'Stigmas for PvP' },
        items: [
          { id: 17430000 /* Prayer of Amplification */, note: { de: "Mehr Angriffskraft für deinen Burst.", en: "More Attack for your burst." } },
          { id: 17410000 /* Light of Protection */, note: { de: "Mehr Schaden und weniger erlittener Schaden – auch gegen Spieler.", en: "More damage and less damage taken – against players too." } },
          { id: 17420000 /* Yustiel's Power */, note: { de: "Weniger Schaden für dich und die Gruppe, wenn der Gegner angreift.", en: "Less damage for you and your group when the enemy attacks." } },
          { id: 17300000 /* Voice of Doom */, note: { de: "Schaden über Zeit und viel weniger Heilung für den Gegner.", en: "Damage over time and much less healing for the enemy." } },
        ],
      },
    ],
    daevanion: [
      {
        de: "**Nezekan zuerst** (ab Stufe 12): Kampftempo und Abklingzeitverringerung, dann die Knoten für [[17350000|Condemnation]], [[17150000|Divine Aura]], [[17060000|Bolt]] und [[17070000|Chain of Torment]].",
        en: "**Nezekan first** (from level 12): Combat Speed and Cooldown Reduction, then the nodes for [[17350000|Condemnation]], [[17150000|Divine Aura]], [[17060000|Bolt]] and [[17070000|Chain of Torment]].",
      },
      { de: "**Zikel** (ab Stufe 20): Schadensverstärkung.", en: "**Zikel** (from level 20): Damage Boost." },
      { de: "**Vaizel** (ab Stufe 30): Krit.-Schadensverstärkung.", en: "**Vaizel** (from level 30): Critical Damage Boost." },
      { de: "**Triniel** (ab Stufe 40): erst später, wenn die anderen Tafeln gut stehen.", en: "**Triniel** (from level 40): later, once the other boards are in good shape." },
      {
        de: "**Azphel** (ab Stufe 45) ist die PvP-Tafel: Du bezahlst sie mit Kampfkristallen aus dem PvP, und ihre Werte zählen nur gegen Spieler.",
        en: "**Azphel** (from level 45) is the PvP board: you pay it with Battle Crystals from PvP, and its stats only count against players.",
      },
      {
        de: "Kauf nicht einfach alle Knoten auf einmal – wähle sie selbst aus, damit deine Punkte dort landen, wo sie helfen.",
        en: "Do not just buy all nodes at once (“Acquire All”) – pick them yourself so your points go where they help.",
      },
    ],
    stats: {
      de: "Reihenfolge der Werte auf den Tafeln: **Kampftempo > Abklingzeitverringerung > Angriffskraft > Krit.-Treffer > Schadensverstärkung > Präzision > Max. MP**. Angriffskraft macht auch deine Heilung stärker. Rüste deine Waffe vor der Höchststufe nicht über +10 auf.",
      en: "Stat order for the boards: **Combat Speed > Cooldown Reduction > Attack > Critical Hit > Damage Boost > Accuracy > Max MP**. Attack also makes your heals stronger. Do not upgrade your weapon past +10 before you reach the level cap.",
    },
  },
  macro: {
    keys: [
      {
        key: '1',
        ids: [17350000 /* Condemnation */, 17070000 /* Chain of Torment */],
        macro: true,
        note: {
          de: "Kombo: [[17350000|Condemnation]] liegt unten, geht aber nur auf Zielen mit [[17070000|Chain of Torment]]. Der erste Druck setzt also die Kette, danach nimmt die Taste immer wieder [[17350000|Condemnation]].",
          en: "Combo: [[17350000|Condemnation]] sits at the bottom but only works on targets with [[17070000|Chain of Torment]]. So the first press puts on the chain, after that the key keeps using [[17350000|Condemnation]].",
        },
      },
      {
        key: '6',
        ids: [17400000 /* Earth Punishment */],
        macro: true,
        note: {
          de: "Stigma: Schaden über Zeit. Ab Stigma-Stufe 5 trifft [[17350000|Condemnation]] dieses Ziel immer kritisch – das Makro setzt es neu, sobald es bereit ist.",
          en: "Stigma: damage over time. From stigma level 5, [[17350000|Condemnation]] always crits this target – the macro renews it as soon as it is ready.",
        },
      },
      {
        key: '2',
        ids: [17080000 /* Debilitating Mark */],
        macro: true,
        note: { de: "Debuff – kommt früh im Makro, damit er immer auf dem Ziel liegt.", en: "Debuff – early in the macro so it is always on the target." },
      },
      {
        key: '3',
        ids: [17150000 /* Divine Aura */],
        macro: true,
        note: {
          de: "Freier Schaden alle 30 Sekunden. Die Aura bleibt 5 s lang neben dir stehen und macht nur Schaden – ein Angriff, kein Begleiter, darum gehört sie ins Makro. Viele legen [[17040000|Judgment Thunder]] oben auf diese Taste – hier liegt der Füller auf T, dem letzten Schritt im Makro.",
          en: "Free damage every 30 seconds. The aura stays next to you for 5 s and only deals damage – an attack, not a companion, so it belongs in the macro. Many players put [[17040000|Judgment Thunder]] on top of this key – here the filler sits on T, the last step of the macro.",
        },
      },
      {
        key: 'T',
        ids: [17370000 /* Lightning Strike Scattershot */, 17040000 /* Judgment Thunder */],
        macro: true,
        note: {
          de: "Letzter Schritt im Makro. Füller oben, darunter ein Taumel-Skill: Er kommt nur, wenn der Boss taumelt – dann nimmt die Taste ihn von selbst.",
          en: "Last step of the macro. Filler on top, a Stagger skill below: it only comes while the boss staggers – then the key uses it by itself.",
        },
      },
      {
        key: 'R',
        ids: [17010000 /* Earth's Retribution */],
        note: { de: "Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Gibt dir MP zurück.", en: "Basic attack: hold the left mouse button, **not** in the macro. Gives you MP back." },
      },
      {
        key: '4',
        ids: [17090000 /* Light of Regeneration */, 17100000 /* Healing Light */, 17120000 /* Radiant Recovery */],
        note: {
          de: "Deine Heilungen – immer von Hand, nie ins Makro: Nur du siehst, wann die Gruppe sie braucht. Die Taste nimmt zuerst [[17090000|Light of Regeneration]] (soll immer laufen), dann [[17100000|Healing Light]], dann [[17120000|Radiant Recovery]]. Willst du jede Heilung selbst wählen, gib jeder eine eigene Taste.",
          en: "Your heals – always by hand, never in the macro: only you can see when the group needs them. The key uses [[17090000|Light of Regeneration]] first (it should always be running), then [[17100000|Healing Light]], then [[17120000|Radiant Recovery]]. If you want to pick each heal yourself, give each one its own key.",
        },
      },
      {
        key: 'E',
        ids: [17060000 /* Bolt */],
        note: { de: "Aufladeskill: von Hand aufladen. Im Makro würde er nicht richtig aufgeladen.", en: "Charged skill: charge it by hand. The macro would not charge it properly." },
      },
      {
        key: '5',
        ids: [17430000 /* Prayer of Amplification */],
        note: {
          de: "Buff – von Hand in der Eröffnung und in Burst-Phasen, nicht ins Makro: Dort würde er auch an schwachen Gegnern verpuffen.",
          en: "Buff – by hand in the opener and in burst phases, not in the macro: there it would also be wasted on weak mobs.",
        },
      },
      {
        key: '7',
        ids: [17410000 /* Light of Protection */],
        note: {
          de: "Ein Schalter: Ein zweiter Druck schaltet ihn wieder aus – darum nie ins Makro. Einmal anschalten und fertig.",
          en: "A switch: a second press turns it off again – so never in the macro. Turn it on once and you are done.",
        },
      },
      {
        key: '8',
        ids: [17440000 /* Noble Aura */],
        note: {
          de: "Stigma: vor dem Kampf beschwören – die Aura folgt dir 5 Minuten lang und greift dein Ziel mit an. Für schwere Dungeons tauschst du sie gegen [[17420000|Yustiel's Power]] und drückst die Taste kurz vor einem großen Boss-Angriff.",
          en: "Stigma: summon it before the pull – the aura follows you for 5 minutes and attacks your target with you. For hard dungeons, swap it for [[17420000|Yustiel's Power]] and press the key just before a big boss attack.",
        },
      },
    ],
    note: {
      de: "Das Makro drückt 1, 6, 2, 3 und zuletzt T. Heilungen kommen nie hinein – nur du siehst, wann die Gruppe sie braucht. Halte Makro-Taste und linke Maustaste gedrückt und drück 4, sobald LP-Balken sinken: Was du selbst drückst, hat immer Vorrang. [[17410000|Light of Protection]] (Schalter), [[17060000|Bolt]] (aufladen), der Buff auf 5 und [[17440000|Noble Aura]] auf 8 bleiben ebenfalls draußen: Diese Aura rufst du vor dem Kampf, dann folgt sie dir 5 Minuten lang.",
      en: "The macro presses 1, 6, 2, 3 and T last. Heals never go into it – only you can see when the group needs them. Hold the macro key and the left mouse button and press 4 as soon as HP bars drop: whatever you press yourself always comes first. [[17410000|Light of Protection]] (a switch), [[17060000|Bolt]] (charged), the buff on 5 and [[17440000|Noble Aura]] on 8 stay out as well: you call that aura before the pull, and then it follows you for 5 minutes.",
    },
  },
  mistakes: [
    {
      de: "**Nur heilen.** Du machst auch Schaden – wer nur auf niedrige LP wartet, verschenkt die halbe Klasse.",
      en: "**Only healing.** You also deal damage – if you only wait for low HP, you waste half the class.",
    },
    {
      de: "**[[17350000|Condemnation]] ohne [[17070000|Chain of Torment]].** Sie trifft nur markierte Ziele – erst markieren, dann zuschlagen.",
      en: "**[[17350000|Condemnation]] without [[17070000|Chain of Torment]].** It only hits marked targets – mark first, then strike.",
    },
    {
      de: "**Auf Vorrat heilen** und Abklingzeiten verschwenden, obwohl niemand verletzt ist.",
      en: "**Healing in advance** and wasting cooldowns while nobody is hurt.",
    },
    {
      de: "**[[17410000|Light of Protection]] neben dem [[18190000|Undefeated Mantra]] eines Kantors.** Es wirkt nur eins von beiden – nimm stattdessen [[17390000|Summon Resurrection]] oder [[17290000|Absolution]].",
      en: "**[[17410000|Light of Protection]] next to a Chanter's [[18190000|Undefeated Mantra]].** Only one of them works – take [[17390000|Summon Resurrection]] or [[17290000|Absolution]] instead.",
    },
    {
      de: "**Schalter oder Aufladeskills im Makro:** [[17410000|Light of Protection]] geht aus, [[17060000|Bolt]] kommt ohne Aufladung.",
      en: "**Switches or charged skills in the macro:** [[17410000|Light of Protection]] turns off, [[17060000|Bolt]] fires without a charge.",
    },
    {
      de: "**Keine Spezialisierungen** – oder die zwei ähnlichen Passive verwechseln: [[17730000|Empyrean Lord's Grace]] ist stark, [[17720000|Empyrean Lords' Benediction]] lohnt sich kaum.",
      en: "**No specialisations** – or mixing up the two similar passives: [[17730000|Empyrean Lord's Grace]] is strong, [[17720000|Empyrean Lords' Benediction]] is hardly worth it.",
    },
  ],
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Kleriker haben im Median **210K** Kampfkraft bei Gegenstandsstufe **3.182** (Spanne 204–222K) – Platz 8 der acht Klassen, ≈66 Kampfkraft pro Gegenstandsstufe. Heiler zeigen weniger Kampfkraft als Schadensklassen; vergleiche dich darum mit anderen Klerikern. Dafür legen die Top-Kleriker mit +55K pro Woche am zweitschnellsten zu.",
      en: "The top 10 Clerics have a median **210K** Combat Power at item level **3,182** (range 204–222K) – 8th of the eight classes, ≈66 Combat Power per item level. Healers show less Combat Power than damage classes, so compare yourself with other Clerics. In return the top Clerics grow second fastest at +55K per week.",
    },
    gear: [
      {
        de: "**Waffe und Guard:** Splendent Ebony / Wise Dragon Lord Mace auf +15 mit Amplified +5 (9 von 10); der Guard ebenfalls +15 (8 Splendent, 2 Nuakum).",
        en: "**Weapon and guard:** Splendent Ebony / Wise Dragon Lord Mace at +15 with Amplified +5 (9 of 10); the guard at +15 too (8 Splendent, 2 Nuakum).",
      },
      {
        de: "**Rüstung:** Nuakum ist hier die Regel – 35 von 70 Teilen, dazu 21 Splendent 102 und 13 Splendent White / Dark Dragon Lord (86). Nur 3 der 10 tragen das ganze 102er-Set; Amplified Enhancement im Median +3.",
        en: "**Armour:** Nuakum is the rule here – 35 of 70 pieces, plus 21 Splendent 102 and 13 Splendent White / Dark Dragon Lord (86). Only 3 of the 10 wear the full 102 set; Amplified Enhancement +3 at the median.",
      },
      {
        de: "**Schmuck:** 40 von 50 Teilen Splendent 102, der Rest Splendent 86, Enraged Kromede oder Aulamus – alle auf +15, 30 mit Amplified +5.",
        en: "**Jewellery:** 40 of 50 pieces Splendent 102, the rest Splendent 86, Enraged Kromede or Aulamus – all at +15, 30 with Amplified +5.",
      },
      {
        de: "**Armreifen und Rest:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80) plus fast immer ein Liberator Bracelet +10. Revelation Amulet und Noble Belt sind oft noch offen: nur 3 von 10 haben sie auf +10. Flügel meist Dark Veil (8).",
        en: "**Bracelets and the rest:** exactly one Ascension Bracelet (none of the top 80 wears more) plus nearly always a Liberator Bracelet +10. Revelation Amulet and Noble Belt are often still open: only 3 of 10 have them at +10. Wings mostly Dark Veil (8).",
      },
    ],
    arcana: {
      de: "Wie Assassinen nehmen Kleriker den **Mirror of Vigor** (9 von 10); dazu **Chalice und Parchment of Vigor** (je 8), **Compass of Magic** (6) und **Bell of Magic** (7). 30 von 50 Karten sind auf +5.",
      en: "Like Assassins, Clerics take the **Mirror of Vigor** (9 of 10); plus **Chalice and Parchment of Vigor** (8 each), **Compass of Magic** (6) and **Bell of Magic** (7). 30 of 50 cards are at +5.",
    },
    stigmas: [
      { id: 17400000, note: { de: '10 von 10 · Median Stufe 20', en: '10 of 10 · median level 20' } },
      { id: 17430000, note: { de: '9 von 10 · Median Stufe 18', en: '9 of 10 · median level 18' } },
      { id: 17440000, note: { de: '8 von 10 · Median Stufe 18', en: '8 of 10 · median level 18' } },
      { id: 17410000, note: { de: '9 von 10 · Median Stufe 16', en: '9 of 10 · median level 16' } },
    ],
    tips: [
      {
        de: "**Gürtel und Amulett zuerst:** 5 der Top 10 haben den Noble Belt noch auf +0, 4 das Revelation Amulet. Beides gelingt bis +10 immer (eine Schriftrolle pro Stufe) – sichere Kampfkraft ohne Risiko.",
        en: "**Belt and amulet first:** 5 of the top 10 still have the Noble Belt at +0, 4 the Revelation Amulet. Both always succeed up to +10 (one scroll per step) – safe Combat Power without risk.",
      },
      {
        de: "**Nuakum reicht lange:** Die Hälfte der Rüstung der Top-Kleriker ist Nuakum auf +15. Du musst nicht sofort aufs Splendent-Set wechseln – Waffe, Schmuck und Arcana zuerst.",
        en: "**Nuakum lasts a long time:** half the armour of the top Clerics is Nuakum at +15. You don’t have to switch to the Splendent set right away – weapon, jewellery and Arcana first.",
      },
      {
        de: "**Daevanion:** Im Median sind 60, 57 und 60 von 88 Knoten auf den ersten drei Tafeln offen, 71 von 116 auf der vierten und 31 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 60, 57 and 60 of 88 nodes are open on the first three boards, 71 of 116 on the fourth and 31 of 152 on the fifth.",
      },
    ],
  },
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/cleric/build', label: 'Metabot – Cleric build' },
    { href: 'https://daevaguides.com/en/cleric/', label: 'Daeva Guides – Cleric guide' },
    { href: 'https://couga54.github.io/aion2-guides/en/cleric/', label: 'AION 2 Guides – Cleric' },
    { href: 'https://aion2-guides.info/en/cleric/', label: 'AION2-Guides.info – Cleric' },
    { href: 'https://www.inven.co.kr/board/aion2/6452/16524', label: 'Inven (KR) – Cleric guide' },
    { href: 'https://www.inven.co.kr/board/aion2/6452/19538', label: 'Inven (KR) – Cleric build tips' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-08-12', label: 'AION2Hub – Update 2026-08-12 (heal rework)' },
  ],
  caveat: {
    de: "Builds ändern sich mit Patches. Die Skilldaten hier entsprechen dem koreanischen Stand bis Anfang September 2026 – spätere Änderungen können fehlen. Koreanische Guides rechnen mit 5 Stigma-Plätzen, der globale Client hat 4: Wähl also 4 aus der Liste. Im PvP gibt es noch keinen festen Build, und wie viel ein Kleriker heilen oder angreifen soll, wird noch diskutiert.",
    en: "Builds change with patches. The skill data here matches the Korean version up to early September 2026 – later changes may be missing. Korean guides plan with 5 stigma slots, the global client has 4: so pick 4 from the list. There is no agreed PvP build yet, and how much a Cleric should heal or attack is still debated.",
  },
});
