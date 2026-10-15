import { classGuide } from './classGuide';

/** Beginner guide for the Gladiator. Hotbar and macro are set up for bosses. */
export const gladiatorGuide = classGuide({
  id: 'gladiator',
  cls: 'Gladiator',
  tone: 'rose',
  title: { de: 'Gladiator-Guide', en: 'Gladiator guide' },
  summary: {
    de: 'Der Gladiator kämpft mit dem Zweihandschwert, trifft bis zu 4 Gegner auf einmal und heilt sich beim Zuschlagen. Hier lernst du Schritt für Schritt Rotation, Build und Makro.',
    en: 'The Gladiator fights with a greatsword, hits up to 4 enemies at once and heals while attacking. Here you learn rotation, build and macro step by step.',
  },
  tags: [
    { de: 'Nahkampf-Schaden', en: 'Melee damage' },
    { de: 'Off-Tank', en: 'Off-tank' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-15',
  glance: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: '**Nahkampf-Schaden** mit dem Zweihandschwert, dazu Off-Tank (kann zur Not Gegner halten)', en: '**Melee damage** with a greatsword, plus off-tank (can hold enemies when needed)' } },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: '**Leicht** zu lernen – aber viel Luft nach oben', en: '**Easy** to learn – but lots of room to get better' } },
    { label: { de: 'Reichweite', en: 'Range' }, value: { de: 'Nahkampf (4–5 m), mit [[11190000|Leaping Slam]] bis 20 m', en: 'Melee (4–5 m), up to 20 m with [[11190000|Leaping Slam]]' } },
    { label: { de: 'Stärken', en: 'Strengths' }, value: { de: 'Trifft bis zu 4 Gegner, heilt sich selbst, füllt die Taumel-Leiste von Bossen', en: 'Hits up to 4 enemies, heals itself, fills the stagger gauge of bosses' } },
    { label: { de: 'Schwächen', en: 'Weaknesses' }, value: { de: 'Am Anfang oft wenig MP; im PvP schwach gegen Gegner, die auf Abstand bleiben', en: 'Often low on MP early on; in PvP weak against enemies who keep their distance' } },
  ],
  forWhom: {
    de: 'Du willst mitten im Getümmel stehen, viele Gegner auf einmal treffen und nicht ständig auf deine Lebenspunkte achten. Der Gladiator ist leicht zu lernen und verzeiht Fehler. Wer mehr will, holt mit gutem Timing deutlich mehr Schaden heraus.',
    en: 'You want to stand in the middle of the fight, hit many enemies at once and not watch your health all the time. The Gladiator is easy to learn and forgives mistakes. If you want more, good timing gets you a lot more damage.',
  },
  party: {
    dungeon: [
      {
        de: '**Schaden an Gruppen:** Fast alle deine Angriffe treffen bis zu 4 Gegner. Ideal für die normalen Gegner zwischen den Bossen.',
        en: '**Damage on packs:** almost all your attacks hit up to 4 enemies. Ideal for the normal enemies between the bosses.',
      },
      {
        de: "**Taumel-Leiste füllen:** Bosse haben eine Taumel-Leiste. Ist sie voll, **taumeln** sie kurz (im Spiel „benommen“) – dann gehen besondere Skills wie [[11280000|Sword Aura Rampage]]. Mit [[11250000|Zikel's Blessing]] ab Stigma-Stufe 5 füllst du die Leiste 50 % schneller.",
        en: "**Fill the stagger gauge:** bosses have a stagger gauge. When it is full, they **stagger** for a short time – then special skills like [[11280000|Sword Aura Rampage]] work. With [[11250000|Zikel's Blessing]] from stigma level 5 you fill the gauge 50% faster.",
      },
      {
        de: '**Blocken hilft allen:** Blockst du einen Angriff, macht die ganze Gruppe 20 s lang mehr Schaden ([[11780000|Experienced Counterstrike]]). Das wirkt nicht zusätzlich zu [[12780000|Fury]] vom Templer.',
        en: '**Blocking helps everyone:** when you block an attack, the whole group deals more damage for 20 s ([[11780000|Experienced Counterstrike]]). It does not stack with the Templar skill [[12780000|Fury]].',
      },
      {
        de: '**Aggro:** Du hast keinen Spott-Skill, aber [[11020000|Keen Strike]], [[11010000|Rending Blow]] und [[11170000|Overhead Slam]] erhöhen deine Aggro (also wen der Gegner angreift). Fehlt ein Tank, kannst du so Gegner halten.',
        en: '**Enmity:** you have no taunt skill, but [[11020000|Keen Strike]], [[11010000|Rending Blow]] and [[11170000|Overhead Slam]] raise your enmity (who the enemy attacks). Without a tank you can hold enemies this way.',
      },
    ],
    boss: {
      de: 'Greif den Boss **von vorne** an – darauf sind deine Boni ausgelegt. Nutze [[11100000|Ruinous Blow]], sobald der Skill bereit ist: Sein Buff „Kampfbereitschaft“ gibt dir 20 s lang 20 % mehr Schaden. Bosse kann man nicht niederwerfen. [[11170000|Overhead Slam]] geht dort nur 10 s lang nach [[11390000|Rage Burst]] – oder ab und zu per Zufall (7 %).',
      en: 'Attack the boss **from the front** – your bonuses are made for that. Use [[11100000|Ruinous Blow]] as soon as it is ready: its buff “Prepare for Battle” gives you 20% more damage for 20 s. Bosses cannot be knocked down. There [[11170000|Overhead Slam]] only works for 10 s after [[11390000|Rage Burst]] – or now and then by chance (7%).',
    },
    pvp: {
      de: 'Du bist ein **Jäger**: Mit [[11190000|Leaping Slam]] (20 m) und [[11360000|Rush Strike]] bist du schnell am Gegner, [[11200000|Ankle Slice]] hält ihn fest. Liegt er am Boden, folgen [[11170000|Overhead Slam]] und [[11300000|Aerial Snare]]. [[11080000|Blade Toss]] halbiert die Heilung des Ziels. Schwer wird es gegen Gegner, die dich auf Abstand halten („Kiten“).',
      en: 'You are a **hunter**: with [[11190000|Leaping Slam]] (20 m) and [[11360000|Rush Strike]] you reach enemies fast, [[11200000|Ankle Slice]] roots them in place. Once they are on the ground, [[11170000|Overhead Slam]] and [[11300000|Aerial Snare]] follow. [[11080000|Blade Toss]] halves the healing of the target. It gets hard against enemies who keep you at a distance (“kiting”).',
    },
    solo: {
      de: 'Allein ist der Gladiator stark: Du heilst dich beim Zuschlagen, und fällst du unter 50 % Leben, heilt dich [[11730000|Blood Absorption]] sofort um 35 % (einmal pro Minute). Für noch mehr Heilung: das Stigma [[11340000|Lifestealing Blade]] und die Lebensraub-Spezialisierung auf [[11290000|Mocking Blade]].',
      en: 'Solo the Gladiator is strong: you heal while you hit, and when you drop below 50% health, [[11730000|Blood Absorption]] heals you 35% right away (once a minute). For even more healing: the stigma [[11340000|Lifestealing Blade]] and the lifesteal specialisation on [[11290000|Mocking Blade]].',
    },
  },
  skills: [
    {
      id: 11100000 /* Ruinous Blow */,
      note: {
        de: 'Dein wichtigster Skill. Stürmt zum Ziel und gibt dir „Kampfbereitschaft“: 20 s lang 20 % mehr Schaden gegen Monster und mehr kritische Treffer. **Abklingzeit** (Wartezeit bis zum nächsten Einsatz) 45 s – nutze den Skill, sobald er bereit ist. Ab Stufe 14.',
        en: 'Your most important skill. Rushes to the target and gives you “Prepare for Battle”: 20% more damage against monsters and more critical hits for 20 s. **Cooldown** (waiting time until the next use) 45 s – use it as soon as it is ready. From level 14.',
      },
    },
    {
      id: 11170000 /* Overhead Slam */,
      note: {
        de: 'Dein Hauptschaden. Trifft nur Gegner, die **am Boden liegen** (niedergeworfen, im Skilltext „Niederschlag“). Bosse kann man nicht niederwerfen – dort geht der Skill nur nach [[11390000|Rage Burst]] oder mit 7 % Chance. Ab Skillstufe 16 kannst du per Spezialisierung die Abklingzeit entfernen.',
        en: 'Your main damage. Only hits enemies that are **lying on the ground** (knocked down). Bosses cannot be knocked down – there it only works after [[11390000|Rage Burst]] or with a 7% chance. From skill level 16 a specialisation removes its cooldown.',
      },
    },
    {
      id: 11390000 /* Rage Burst */,
      note: {
        de: 'Stigma für Bosse: Schwächt den Angriff des Gegners, gibt dir 10 s lang mehr Schaden und schaltet [[11170000|Overhead Slam]] 10 s lang frei – auch bei Bossen. Das ist dein **Burst-Fenster** (eine kurze Phase mit sehr viel Schaden).',
        en: 'Stigma for bosses: weakens the Attack of the enemy, gives you more damage for 10 s and unlocks [[11170000|Overhead Slam]] for 10 s – even on bosses. This is your **burst window** (a short phase with lots of damage).',
      },
    },
    {
      id: 11020000 /* Keen Strike */,
      note: {
        de: 'Deine Grundattacke (linke Maustaste): Trifft bis zu 4 Gegner und **bringt dir 100 MP zurück**. Halte sie im Kampf einfach gedrückt.',
        en: 'Your basic attack (left mouse button): hits up to 4 enemies and **gives you 100 MP back**. Simply hold it down in combat.',
      },
    },
    {
      id: 11010000 /* Rending Blow */,
      note: {
        de: 'Füller ohne Abklingzeit: Trifft bis zu 4 Gegner, erhöht die Aggro und füllt die Taumel-Leiste ein wenig. Kostet MP.',
        en: 'Filler without a cooldown: hits up to 4 enemies, raises enmity and fills the stagger gauge a little. Costs MP.',
      },
    },
    {
      id: 11280000 /* Sword Aura Rampage */,
      note: {
        de: 'Geht nur, wenn das Ziel **taumelt**. Keine Abklingzeit – deshalb liegt der Skill auf Taste T unter [[11010000|Rending Blow]] und kommt von selbst, sobald der Boss taumelt.',
        en: 'Only works while the target **staggers**. No cooldown – so it sits on key T below [[11010000|Rending Blow]] and comes by itself as soon as the boss staggers.',
      },
    },
    {
      id: 11290000 /* Mocking Blade */,
      note: {
        de: 'Wirft normale Gegner 3 s lang nieder – danach geht [[11170000|Overhead Slam]]. Mit der Lebensraub-Spezialisierung auch eine Notfall-Heilung.',
        en: 'Knocks normal enemies down for 3 s – after that [[11170000|Overhead Slam]] works. With the lifesteal specialisation also an emergency heal.',
      },
    },
    {
      id: 11260000 /* Defiance */,
      note: {
        de: 'Befreit dich aus Betäubung, Niederwerfen und Ähnlichem und macht dich 5 s lang immun dagegen. Abklingzeit 60 s, ab Stufe 16. Liegt auf der Leertaste – immer von Hand, nie im Makro.',
        en: 'Frees you from Stun, Knockdown and similar effects and makes you immune to them for 5 s. Cooldown 60 s, from level 16. It sits on Space – always by hand, never in the macro.',
      },
    },
  ],
  rotation: {
    intro: {
      de: 'Jeder Kampf beginnt mit der Eröffnung von Hand. Danach hältst du Makro-Taste und linke Maustaste gedrückt. Welche Taste was macht, steht weiter unten bei „Leiste & Makro“.',
      en: 'Every fight starts with the opener by hand. After that you hold the macro key and the left mouse button. Which key does what is listed further down under “Hotbar & macro”.',
    },
    blocks: [
      {
        title: { de: 'Eröffnung am Boss', en: 'Opener at the boss' },
        steps: [
          { id: 11250000 /* Zikel's Blessing */, note: { de: 'Taste 5: Angriff +20 %', en: 'Key 5: Attack +20%' } },
          { id: 11400000 /* Lunge Stance */, note: { de: 'Taste 6: Kampftempo +20 %', en: 'Key 6: Combat Speed +20%' } },
          { id: 11360000 /* Rush Strike */, note: { de: 'Taste Q: hin zum Boss', en: 'Key Q: rush to the boss' } },
          { id: 11100000 /* Ruinous Blow */, note: { de: 'Taste Q noch einmal: Buff für 20 s', en: 'Key Q again: buff for 20 s' } },
          { id: 11390000 /* Rage Burst */, note: { de: 'Taste 8: 10 s Burst-Fenster', en: 'Key 8: 10 s burst window' } },
          { id: 11170000 /* Overhead Slam */, note: { de: 'Taste 1: so oft es geht, dann das Makro', en: 'Key 1: as often as you can, then the macro' } },
        ],
      },
      {
        title: { de: 'Danach: Priorität (Wichtigstes zuerst)', en: 'After that: priority (most important first)' },
        steps: [
          { id: 11100000 /* Ruinous Blow */, note: { de: 'Sobald bereit – Buff immer erneuern', en: 'As soon as it is ready – always renew the buff' } },
          { id: 11390000 /* Rage Burst */, note: { de: 'Sobald bereit – nicht im Laufen, nicht wenn der Boss immun ist', en: 'As soon as it is ready – not while moving, not while the boss is immune' } },
          { id: 11170000 /* Overhead Slam */, note: { de: 'Immer, wenn er geht', en: 'Whenever it works' } },
          { id: 11050000 /* Crushing Wave */, note: { de: 'Gegen mehrere Gegner', en: 'Against several enemies' } },
          { id: 11290000 /* Mocking Blade */, note: { de: 'Wirft normale Gegner nieder', en: 'Knocks normal enemies down' } },
          { id: 11010000 /* Rending Blow */, note: { de: 'Füller auf Taste T', en: 'Filler on key T' } },
          { id: 11020000 /* Keen Strike */, note: { de: 'Linke Maustaste – bringt MP zurück', en: 'Left mouse button – gives MP back' } },
        ],
      },
    ],
    tips: [
      {
        de: '**Nie stillstehen:** Ist gerade nichts bereit, hältst du trotzdem die linke Maustaste. Jede Sekunde ohne Angriff kostet Schaden.',
        en: '**Never stand still:** if nothing is ready, keep holding the left mouse button anyway. Every second without an attack costs damage.',
      },
      {
        de: '**MP im Blick:** Wird es knapp, hilft [[11020000|Keen Strike]] (linke Maustaste): Jeder Treffer bringt 100 MP. Die Spezialisierung „MP bei kritischem Treffer“ auf [[11010000|Rending Blow]] hilft zusätzlich.',
        en: '**Watch your MP:** when it gets low, [[11020000|Keen Strike]] (left mouse button) helps: every hit gives 100 MP. The specialisation “MP on a critical hit” on [[11010000|Rending Blow]] helps as well.',
      },
      {
        de: '**Gegnergruppen:** Mit [[11190000|Leaping Slam]] hinein, dann [[11050000|Crushing Wave]] – die Folge-Attacke erscheint auf derselben Taste. Danach Gegner niederwerfen ([[11290000|Mocking Blade]], [[11360000|Rush Strike]] oder das Stigma [[11240000|Wrath Wave]]) und mit [[11170000|Overhead Slam]] nachsetzen.',
        en: '**Packs of enemies:** jump in with [[11190000|Leaping Slam]], then [[11050000|Crushing Wave]] – its follow-up appears on the same key. Then knock enemies down ([[11290000|Mocking Blade]], [[11360000|Rush Strike]] or the stigma [[11240000|Wrath Wave]]) and follow up with [[11170000|Overhead Slam]].',
      },
      {
        de: '**Verteidigung von Hand:** [[11260000|Defiance]] auf der Leertaste befreit dich aus Betäubung und Niederwerfen. Mit dem Stigma [[11110000|Focused Block]] parierst du sicher, [[11380000|Tenaciousness]] macht dich 3 s lang unverwundbar. Unter 50 % Leben heilt dich [[11730000|Blood Absorption]] von selbst.',
        en: '**Defence by hand:** [[11260000|Defiance]] on Space frees you from Stun and Knockdown. With the stigma [[11110000|Focused Block]] you parry for sure, [[11380000|Tenaciousness]] makes you invulnerable for 3 s. Below 50% health [[11730000|Blood Absorption]] heals you by itself.',
      },
    ],
  },
  build: {
    intro: {
      de: 'Skillpunkte machen deine Skills stärker. Bei Skillstufe 8, 12 und 20 bekommt jeder Skill einen Platz für eine **Spezialisierung** (eine Zusatz-Wirkung, die du selbst auswählst). **Stigmen** sind Extra-Skills für deine 4 Stigma-Plätze – du bekommst sie ab Stufe 22.',
      en: 'Skill points make your skills stronger. At skill level 8, 12 and 20 every skill gets a slot for a **specialisation** (an extra effect you choose yourself). **Stigmas** are extra skills for your 4 stigma slots – you get them from level 22.',
    },
    points: [
      {
        de: '[[11170000|Overhead Slam]], [[11010000|Rending Blow]] und [[11100000|Ruinous Blow]] zuerst. Ziel für [[11170000|Overhead Slam]]: Skillstufe 16 – dort gibt es „Abklingzeit entfernt“.',
        en: '[[11170000|Overhead Slam]], [[11010000|Rending Blow]] and [[11100000|Ruinous Blow]] first. Goal for [[11170000|Overhead Slam]]: skill level 16 – that is where “Remove cooldown” unlocks.',
      },
      {
        de: 'Dann [[11020000|Keen Strike]] – deine Grundattacke, die du die ganze Zeit benutzt.',
        en: 'Then [[11020000|Keen Strike]] – your basic attack that you use all the time.',
      },
      {
        de: '[[11280000|Sword Aura Rampage]] auf Skillstufe 16 – dort gibt es die Spezialisierung „-1 s auf alle Abklingzeiten bei jedem Treffer“.',
        en: '[[11280000|Sword Aura Rampage]] to skill level 16 – that is where the specialisation “-1 s on all cooldowns with every hit” unlocks.',
      },
      {
        de: 'Danach [[11050000|Crushing Wave]] und [[11290000|Mocking Blade]].',
        en: 'After that [[11050000|Crushing Wave]] and [[11290000|Mocking Blade]].',
      },
      {
        de: 'Passive Skills (wirken immer, ohne Drücken): [[11780000|Experienced Counterstrike]] und [[11800000|Murderous Burst]] zuerst, dann [[11750000|Attack Preparation]], [[11760000|Impact Hit]] und [[11740000|Identify Weakness]]. Beim Leveln helfen [[11710000|Survival Stance]] und [[11730000|Blood Absorption]].',
        en: 'Passive skills (always active, no key needed): [[11780000|Experienced Counterstrike]] and [[11800000|Murderous Burst]] first, then [[11750000|Attack Preparation]], [[11760000|Impact Hit]] and [[11740000|Identify Weakness]]. While levelling, [[11710000|Survival Stance]] and [[11730000|Blood Absorption]] help.',
      },
    ],
    specs: [
      {
        id: 11170000 /* Overhead Slam */,
        parts: [11170050 /* Overhead Slam: Remove cooldown */, 11170030 /* Overhead Slam: Adds [Upward Strike] Chain Skill */, 11170040 /* Overhead Slam: Critical Hit on hit */],
        note: {
          de: 'Ab Skillstufe 16: „Abklingzeit entfernt“ und die Folge-Attacke Aufwärtsschlag. Auf Skillstufe 20 kommt der sichere kritische Treffer dazu. Beim Leveln ist die Flächen-Option gut.',
          en: 'From skill level 16: “Remove cooldown” and the Upward Strike follow-up. At skill level 20 add the guaranteed critical hit. While levelling the AoE option is good.',
        },
      },
      {
        id: 11100000 /* Ruinous Blow */,
        parts: [11100010 /* Ruinous Blow: +20% Skill Speed */, 11100040 /* Ruinous Blow: Extra damage on hit */],
        note: {
          de: 'Schneller und mehr Schaden. Für den dritten Platz: mehr Reichweite oder „ignoriert Block und Ausweichen“.',
          en: 'Faster and more damage. For the third slot: more range or “ignores Block and Evasion”.',
        },
      },
      {
        id: 11010000 /* Rending Blow */,
        parts: [11010030 /* Rending Blow: Changes to mobile skill */, 11010050 /* Rending Blow: Restores 50 MP on landing a Critical Hit */],
        note: {
          de: 'Im Laufen nutzbar und MP bei kritischen Treffern – das hilft gegen MP-Mangel. Dritter Platz: mehr Schaden gegen wenige Ziele oder weniger MP-Kosten.',
          en: 'Usable while moving and MP on critical hits – this helps against running out of MP. Third slot: more damage against few targets or lower MP cost.',
        },
      },
      {
        id: 11020000 /* Keen Strike */,
        parts: [11020010 /* Keen Strike: +20% MP restored */, 11020040 /* Keen Strike: -1s [Ruinous Blow] cooldown on hit */],
        note: {
          de: 'Mehr MP pro Treffer. Ab Skillstufe 12 verkürzt jeder Treffer die Abklingzeit von [[11100000|Ruinous Blow]] um 1 s – hier sind sich die Guides nicht ganz einig.',
          en: 'More MP per hit. From skill level 12 every hit cuts the cooldown of [[11100000|Ruinous Blow]] by 1 s – guides do not fully agree on this one.',
        },
      },
      {
        id: 11280000 /* Sword Aura Rampage */,
        parts: [11280040 /* Sword Aura Rampage: Multi-Hit on hit */, 11280050 /* Sword Aura Rampage: -1s all skill cooldowns on hit */],
        note: {
          de: 'Mehrfachtreffer, und jeder Treffer verkürzt alle Abklingzeiten um 1 s.',
          en: 'Multi-Hit, and every hit cuts all cooldowns by 1 s.',
        },
      },
      {
        id: 11290000 /* Mocking Blade */,
        parts: [11290010 /* Mocking Blade: Absorbs 4% HP, absorbs 15% HP of target with Incapacitated Immunity */, 11290030 /* Mocking Blade: Adds 2 additional strikes */],
        note: {
          de: 'Lebensraub als Notfall-Heilung (an Bossen sogar 15 %) und zwei Extra-Schläge.',
          en: 'Lifesteal as an emergency heal (even 15% on bosses) and two extra strikes.',
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          {
            id: 11400000 /* Lunge Stance */,
            note: { de: 'Kampftempo +20 % für 14,5 s. Dieses Stigma wertest du zuerst auf.', en: 'Combat Speed +20% for 14.5 s. Level this stigma first.' },
          },
          {
            id: 11250000 /* Zikel's Blessing */,
            note: {
              de: 'Angriff +20 % für 14,5 s. Ab Stufe 5 füllst du die Taumel-Leiste 50 % schneller, auf Stufe 15 gibt es +50 % Mehrfachtreffer-Chance.',
              en: 'Attack +20% for 14.5 s. From level 5 you fill the stagger gauge 50% faster, at level 15 you get +50% Multi-Hit chance.',
            },
          },
          {
            id: 11390000 /* Rage Burst */,
            note: { de: 'Dein Boss-Burst. Früh auf Stufe 5 bringen: -15 s Abklingzeit.', en: 'Your boss burst. Bring it to level 5 early: -15 s cooldown.' },
          },
          {
            id: 11110000 /* Focused Block */,
            note: {
              de: 'Für den vierten Platz, wenn du Gegner hältst. Laut Skilltext parierst du damit kurz garantiert, und deine Block-Schadensreduktion steigt um 100 %.',
              en: 'For the fourth slot when you hold enemies. The skill text says it guarantees a parry for a short time and raises your Block Damage Reduction by 100%.',
            },
          },
          {
            id: 11340000 /* Lifestealing Blade */,
            note: { de: 'Für den vierten Platz, wenn du allein spielst: Flächenschaden, der dich heilt.', en: 'For the fourth slot when you play solo: area damage that heals you.' },
          },
        ],
      },
      {
        title: { de: 'Stigmen für PvP', en: 'Stigmas for PvP' },
        items: [
          {
            id: 11080000 /* Blade Toss */,
            note: { de: 'Halbiert 10 s lang die Heilung des Ziels – sehr stark gegen Heiler.', en: 'Halves the healing of the target for 10 s – very strong against healers.' },
          },
          {
            id: 11380000 /* Tenaciousness */,
            note: {
              de: '3 s unverwundbar und immun gegen Kontrolle – dein Notfall-Knopf. Für die übrigen zwei Plätze nennen die Guides nichts Festes.',
              en: '3 s invulnerable and immune to control effects – your emergency button. Guides name nothing fixed for the other two slots.',
            },
          },
        ],
      },
    ],
    daevanion: [
      {
        de: 'Daevanion-Tafeln geben dir Werte und Extra-Skillstufen. Nimm zuerst die Skill-Knoten für [[11170000|Overhead Slam]], [[11100000|Ruinous Blow]] und [[11010000|Rending Blow]].',
        en: 'Daevanion boards give you stats and extra skill levels. Take the skill nodes for [[11170000|Overhead Slam]], [[11100000|Ruinous Blow]] and [[11010000|Rending Blow]] first.',
      },
      {
        de: 'Jede Tafel hat besondere Knoten: **Nezekan** Kampftempo und Abklingzeitverringerung, **Zikel** Schadensverstärkung, **Vaizel** Krit.-Schadensverstärkung, **Triniel** Mehrfachtreffer.',
        en: 'Every board has special nodes: **Nezekan** Combat Speed and Cooldown Reduction, **Zikel** Damage Boost, **Vaizel** Critical Damage Boost, **Triniel** Multi-Hit Chance.',
      },
      {
        de: 'Danach die Knoten deiner passiven Skills, dann Angriffskraft und Krit.-Treffer.',
        en: 'After that the nodes of your passive skills, then Attack and Critical Hit.',
      },
      {
        de: '**Azphel** ist die PvP-Tafel: Du bezahlst sie mit Kampfkristallen aus dem PvP, und ihre Werte zählen nur gegen Spieler.',
        en: '**Azphel** is the PvP board: you pay for it with Battle Crystals from PvP, and its stats only count against players.',
      },
    ],
    stats: {
      de: 'Reihenfolge auf den Tafeln: **Mehrfachtreffer** (in Guides oft „Double Chance“) > Krit.-Schadensverstärkung > Schadensverstärkung > Angriffskraft > Kampftempo > Krit.-Treffer > Präzision > Abklingzeitverringerung. Auf der Ausrüstung lohnt sich außerdem Schadensverstärkung (Frontal), weil du von vorne angreifst. Bring Krit.-Treffer und Präzision auf einen soliden Wert – globale Guides nennen für Krit. eine Grenze von 50 %.',
      en: 'Order on the boards: **Multi-Hit Chance** (guides often call it “Double Chance”) > Critical Damage Boost > Damage Boost > Attack > Combat Speed > Critical Hit > Accuracy > Cooldown Reduction. On gear, Front Attack Damage Boost is also worth it, because you attack from the front. Bring Critical Hit and Accuracy to a solid value – global guides name a cap of 50% for crit.',
    },
  },
  macro: {
    keys: [
      {
        key: '1',
        ids: [11170000 /* Overhead Slam */, 11300000 /* Aerial Snare */, 11290000 /* Mocking Blade */],
        macro: true,
        note: {
          de: 'Kombo: [[11290000|Mocking Blade]] wirft normale Gegner nieder – erst dann gehen [[11170000|Overhead Slam]] und [[11300000|Aerial Snare]], und die Taste nimmt sie von selbst. Bei Bossen kommt [[11170000|Overhead Slam]] nach [[11390000|Rage Burst]].',
          en: 'Combo: [[11290000|Mocking Blade]] knocks normal enemies down – only then do [[11170000|Overhead Slam]] and [[11300000|Aerial Snare]] work, and the key uses them by itself. On bosses [[11170000|Overhead Slam]] comes after [[11390000|Rage Burst]].',
        },
      },
      {
        key: '2',
        ids: [11200000 /* Ankle Slice */],
        macro: true,
        note: { de: 'Trifft bis zu 4 Gegner und hält normale Gegner fest.', en: 'Hits up to 4 enemies and roots normal enemies.' },
      },
      {
        key: '8',
        ids: [11390000 /* Rage Burst */],
        macro: true,
        note: {
          de: 'In der Eröffnung von Hand, danach drückt das Makro diesen Skill. Einige Guides legen [[11390000|Rage Burst]] lieber ganz unten auf Taste 1 – hier hat der Skill eine eigene Taste.',
          en: 'By hand in the opener, after that the macro presses it. Some guides put [[11390000|Rage Burst]] at the bottom of key 1 instead – here it has its own key.',
        },
      },
      {
        key: '3',
        ids: [11050000 /* Crushing Wave */],
        macro: true,
        note: { de: 'Gegen mehrere Gegner. Die Folge-Attacke erscheint auf derselben Taste.', en: 'Against several enemies. Its follow-up appears on the same key.' },
      },
      {
        key: 'T',
        ids: [11280000 /* Sword Aura Rampage */, 11010000 /* Rending Blow */],
        macro: true,
        note: {
          de: 'Letzter Schritt im Makro. Füller oben, darunter [[11280000|Sword Aura Rampage]]: Dieser Skill geht nur, wenn der Boss taumelt – dann nimmt die Taste ihn von selbst.',
          en: 'Last step of the macro. Filler on top, [[11280000|Sword Aura Rampage]] below: it only works while the boss staggers – then the key uses it by itself.',
        },
      },
      {
        key: 'R',
        ids: [11020000 /* Keen Strike */],
        note: {
          de: 'Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Jeder Treffer bringt MP zurück.',
          en: 'Basic attack: hold the left mouse button, **not** in the macro. Every hit gives MP back.',
        },
      },
      {
        key: '5',
        ids: [11250000 /* Zikel's Blessing */],
        note: {
          de: 'Buff von Hand in der Eröffnung – nur bei Bossen und starken Gegnern (Abklingzeit 120 s).',
          en: 'Buff by hand in the opener – only for bosses and strong enemies (cooldown 120 s).',
        },
      },
      {
        key: '6',
        ids: [11400000 /* Lunge Stance */],
        note: { de: 'Buff von Hand, zusammen mit Taste 5.', en: 'Buff by hand, together with key 5.' },
      },
      {
        key: 'Q',
        ids: [11360000 /* Rush Strike */, 11100000 /* Ruinous Blow */, 11190000 /* Leaping Slam */],
        note: {
          de: 'Ansturm und Sprung – von Hand, sonst trägt dich das Makro mitten in eine Gruppe. Die Taste nimmt zuerst [[11360000|Rush Strike]]. Ist dieser Skill nicht bereit, kommt [[11100000|Ruinous Blow]], sonst [[11190000|Leaping Slam]].',
          en: 'Charge and leap – by hand, otherwise the macro carries you right into a pack. The key uses [[11360000|Rush Strike]] first. If that is not ready, [[11100000|Ruinous Blow]] comes, otherwise [[11190000|Leaping Slam]].',
        },
      },
      {
        key: '4',
        ids: [11110000 /* Focused Block */],
        note: {
          de: 'Vierter Stigma-Platz, Verteidigung von Hand. Laut Skilltext parierst du kurz garantiert, deine Block-Schadensreduktion steigt um 100 %, und beim Parieren bekommst du einmal MP und Ausdauer zurück. Die Guides nehmen es, wenn du Gegner hältst. Spielst du allein, nimm für diesen Platz [[11340000|Lifestealing Blade]].',
          en: 'Fourth stigma slot, defence by hand. The skill text says you are guaranteed to parry for a short time, your Block Damage Reduction rises by 100%, and you get MP and Stamina back once on a parry. Guides take it when you hold enemies. If you play solo, take [[11340000|Lifestealing Blade]] for this slot.',
        },
      },
    ],
    note: {
      de: 'Das Makro drückt 1, 2, 8, 3 und zuletzt T – jeweils mit 10 ms. Halte dazu die Makro-Taste und die linke Maustaste. 5, 6, Q und 4 drückst du selbst: Was du drückst, hat immer Vorrang. [[11260000|Defiance]] liegt auf der Leertaste. Prüf die Stapel nach jeder Änderung an deinen Spezialisierungen.',
      en: 'The macro presses 1, 2, 8, 3 and T last – each with 10 ms. Hold the macro key and the left mouse button. You press 5, 6, Q and 4 yourself: whatever you press always comes first. [[11260000|Defiance]] sits on Space. Check the stacks after every change to your specialisations.',
    },
  },
  mistakes: [
    {
      de: '**Spezialisierung freigeschaltet, aber nicht eingesetzt:** „Abklingzeit entfernt“ für [[11170000|Overhead Slam]] gibt es ab Skillstufe 16 – du musst sie aber selbst in einen Platz legen.',
      en: '**Specialisation unlocked but not equipped:** “Remove cooldown” for [[11170000|Overhead Slam]] unlocks at skill level 16 – but you have to put it into a slot yourself.',
    },
    {
      de: '**Kampfbereitschaft auslaufen lassen:** Nutze [[11100000|Ruinous Blow]] sofort, wenn der Skill bereit ist – und steh nie untätig herum.',
      en: '**Letting Prepare for Battle run out:** use [[11100000|Ruinous Blow]] as soon as it is ready – and never stand around doing nothing.',
    },
    {
      de: '**Keine MP mehr:** Ohne die MP-Spezialisierung auf [[11010000|Rending Blow]] und ohne [[11020000|Keen Strike]] gehen dir schnell die MP aus.',
      en: '**Out of MP:** without the MP specialisation on [[11010000|Rending Blow]] and without [[11020000|Keen Strike]] you run out of MP fast.',
    },
    {
      de: '**Den Boss von hinten angreifen:** Deine Boni gelten für Angriffe von vorne.',
      en: '**Attacking the boss from behind:** your bonuses are for attacks from the front.',
    },
    {
      de: "**Den großen Buff an normalen Gegnern verschwenden:** [[11250000|Zikel's Blessing]] hat 120 s Abklingzeit – heb den Buff für Bosse auf.",
      en: "**Wasting the big buff on normal enemies:** [[11250000|Zikel's Blessing]] has a 120 s cooldown – save the buff for bosses.",
    },
    {
      de: '**Koreanische Builds kopieren:** Dort gibt es mehr Stigma-Plätze als die 4 im globalen Client. Plane mit 4.',
      en: '**Copying Korean builds:** they have more stigma slots than the 4 of the global client. Plan with 4.',
    },
  ],
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/gladiator', label: 'MetaBot – Gladiator class guide' },
    { href: 'https://dbaion2.ru/en/guides/gayd-gladiator/', label: 'dbaion2 – Gladiator guide' },
    { href: 'https://allthings.how/aion-2-gladiator-pve-build-skills-stigmas-and-the-level-16-overhead-slam-rotation/', label: 'AllThings.How – Gladiator PvE build and rotation' },
    { href: 'https://www.inven.co.kr/board/aion2/6448/16354', label: 'Inven (KR) – Gladiator build post 1' },
    { href: 'https://www.inven.co.kr/board/aion2/6448/31551', label: 'Inven (KR) – Gladiator build post 2' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-08-12', label: 'AION2Hub – KR update 2026-08-12 (Gladiator)' },
    { href: 'https://metabot.gg/en/aion-2/guides/class-builds-guide', label: 'MetaBot – Class builds guide' },
    { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide' },
  ],
  caveat: {
    de: 'Der globale Client entspricht etwa dem koreanischen Stand von Anfang September 2026. Guides von vor dem 12. August (Änderungen an [[11100000|Ruinous Blow]]) sind teils veraltet. Bei den Stigma-Stufen und der Spezialisierung von [[11020000|Keen Strike]] sind sich die Quellen nicht einig – einige raten, kein Stigma ganz auszubauen. Im Zweifel gilt, was im Spiel bei dir funktioniert.',
    en: 'The global client is roughly at the Korean state of early September 2026. Guides from before 12 August (changes to [[11100000|Ruinous Blow]]) are partly outdated. Sources disagree on stigma levels and on the specialisation of [[11020000|Keen Strike]] – some advise not to max out a single stigma. When in doubt, what works for you in game wins.',
  },
});
