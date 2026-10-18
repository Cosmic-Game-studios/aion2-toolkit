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
  updated: '2026-10-19',
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
        de: '**Schaden an Gruppen:** Viele deiner Angriffe treffen bis zu 4 Gegner. Ideal für die normalen Gegner zwischen den Bossen.',
        en: '**Damage on packs:** many of your attacks hit up to 4 enemies. Ideal for the normal enemies between the bosses.',
      },
      {
        de: "**Taumel-Leiste füllen:** Bosse haben eine Taumel-Leiste. Ist sie voll, **taumeln** sie kurz (im Spiel „benommen“) – dann gehen besondere Skills wie [[11280000|Sword Aura Rampage]]. Mit [[11250000|Zikel's Blessing]] ab Stigma-Stufe 5 füllst du die Leiste 50 % schneller.",
        en: "**Fill the stagger gauge:** bosses have a stagger gauge. When it is full, they **stagger** for a short time – then special skills like [[11280000|Sword Aura Rampage]] work. With [[11250000|Zikel's Blessing]] from stigma level 5 you fill the gauge 50% faster.",
      },
      {
        de: '**Blocken hilft allen:** Blockst du einen Angriff, macht die ganze Gruppe 20 s lang mehr Schaden ([[11780000|Experienced Counterstrike]], +9 % PvE-Schaden auf Skillstufe 10). Mit dem Stigma [[11110000|Focused Block]] blockst du sicher. Das wirkt nicht zusätzlich zum Templer-Passiv „Kampfrausch“.',
        en: '**Blocking helps everyone:** when you block an attack, the whole group deals more damage for 20 s ([[11780000|Experienced Counterstrike]], +9% PvE damage at skill level 10). With the stigma [[11110000|Focused Block]] you block for sure. It does not stack with the Templar passive “Fury”.',
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
      de: 'Du bist ein **Jäger**: Mit [[11190000|Leaping Slam]] (20 m) und – direkt nach einem Ausweichen – [[11360000|Rush Strike]] (10 m) bist du schnell am Gegner. [[11290000|Mocking Blade]] wirft ihn nieder, dann folgen [[11170000|Overhead Slam]] und zuletzt [[11300000|Aerial Snare]]. Nach einem Block hält [[11200000|Ankle Slice]] ihn mit 50 % Chance fest. [[11080000|Blade Toss]] (20 m) halbiert die Heilung des Ziels und senkt seine Verteidigung um 30 %. Schwer wird es gegen Gegner, die dich auf Abstand halten („Kiten“).',
      en: 'You are a **hunter**: with [[11190000|Leaping Slam]] (20 m) and – right after a dodge – [[11360000|Rush Strike]] (10 m) you reach enemies fast. [[11290000|Mocking Blade]] knocks them down, then [[11170000|Overhead Slam]] and finally [[11300000|Aerial Snare]] follow. After a Block, [[11200000|Ankle Slice]] roots them with a 50% chance. [[11080000|Blade Toss]] (20 m) halves the healing of the target and lowers its Defense by 30%. It gets hard against enemies who keep you at a distance (“kiting”).',
    },
    solo: {
      de: 'Allein ist der Gladiator stark: Du heilst dich beim Zuschlagen, und fällst du unter 50 % Leben, heilt dich [[11730000|Blood Absorption]] sofort um 35 % (Skillstufe 10, einmal pro Minute). Für noch mehr Heilung: das Stigma [[11340000|Lifestealing Blade]] und die Lebensraub-Spezialisierung auf [[11290000|Mocking Blade]].',
      en: 'Solo the Gladiator is strong: you heal while you hit, and when you drop below 50% health, [[11730000|Blood Absorption]] heals you 35% right away (skill level 10, once a minute). For even more healing: the stigma [[11340000|Lifestealing Blade]] and the lifesteal specialisation on [[11290000|Mocking Blade]].',
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
      id: 11360000 /* Rush Strike */,
      note: {
        de: 'Geht nur **direkt nach einem Ausweichen** (Notausweichen) oder im Flug: Du stürmst bis 10 m zum Ziel, normale Gegner fallen dabei immer um – danach geht [[11170000|Overhead Slam]]. Fast alle Top 10 bringen ihn auf Stufe 10. Ab Stufe 10.',
        en: 'Only works **right after a dodge** or while flying: you rush up to 10 m to the target, and normal enemies always fall down – after that [[11170000|Overhead Slam]] works. Almost all of the top 10 take it to level 10. From level 10.',
      },
    },
    {
      id: 11260000 /* Defiance */,
      note: {
        de: 'Befreit dich aus Betäubung, Niederwerfen und Ähnlichem und macht dich 5 s lang immun dagegen. Abklingzeit 60 s, mit jeder Skillstufe 1 s weniger (51 s auf Stufe 10) – Abklingzeitverringerung wirkt hier nicht. Ab Stufe 16. Liegt auf der Leertaste – immer von Hand, nie im Makro.',
        en: 'Frees you from Stun, Knockdown and similar effects and makes you immune to them for 5 s. Cooldown 60 s, 1 s less with every skill level (51 s at level 10) – Cooldown Reduction does not work on it. From level 16. It sits on Space – always by hand, never in the macro.',
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
          { id: 11190000 /* Leaping Slam */, note: { de: 'Taste E: Sprung zum Boss (bis 20 m)', en: 'Key E: leap to the boss (up to 20 m)' } },
          { id: 11100000 /* Ruinous Blow */, note: { de: 'Taste Q: Buff für 20 s', en: 'Key Q: buff for 20 s' } },
          { id: 11390000 /* Rage Burst */, note: { de: 'Taste 8: 10 s Burst-Fenster', en: 'Key 8: 10 s burst window' } },
          { id: 11110000 /* Focused Block */, note: { de: 'Taste 4: den ersten Boss-Angriff blocken', en: 'Key 4: block the first boss attack' } },
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
        de: '**Gegnergruppen:** Mit [[11190000|Leaping Slam]] hinein, dann [[11050000|Crushing Wave]] – die Folge-Attacke erscheint auf derselben Taste. Danach Gegner niederwerfen ([[11290000|Mocking Blade]], [[11360000|Rush Strike]] direkt nach einem Ausweichen oder das Stigma [[11240000|Wrath Wave]]) und mit [[11170000|Overhead Slam]] nachsetzen.',
        en: '**Packs of enemies:** jump in with [[11190000|Leaping Slam]], then [[11050000|Crushing Wave]] – its follow-up appears on the same key. Then knock enemies down ([[11290000|Mocking Blade]], [[11360000|Rush Strike]] right after a dodge or the stigma [[11240000|Wrath Wave]]) and follow up with [[11170000|Overhead Slam]].',
      },
      {
        de: '**Verteidigung von Hand:** [[11260000|Defiance]] auf der Leertaste befreit dich aus Betäubung und Niederwerfen. Mit dem Stigma [[11110000|Focused Block]] parierst du sicher, [[11380000|Tenaciousness]] macht dich 3 s lang unverwundbar. Unter 50 % Leben heilt dich [[11730000|Blood Absorption]] von selbst.',
        en: '**Defence by hand:** [[11260000|Defiance]] on Space frees you from Stun and Knockdown. With the stigma [[11110000|Focused Block]] you parry for sure, [[11380000|Tenaciousness]] makes you invulnerable for 3 s. Below 50% health [[11730000|Blood Absorption]] heals you by itself.',
      },
    ],
  },
  build: {
    intro: {
      de: 'Skillpunkte machen deine Skills stärker – damit kommst du bis Skillstufe 10, höhere Stufen geben Daevanion-Knoten und Ausrüstung. Bei Skillstufe 8, 12 und 20 bekommt jeder aktive Skill einen Platz für eine **Spezialisierung** (eine Zusatz-Wirkung, die du selbst auswählst). **Stigmen** sind Extra-Skills für deine 4 Stigma-Plätze – die Plätze öffnen sich auf Stufe 22, 27, 32 und 37.',
      en: 'Skill points make your skills stronger – they take you up to skill level 10, higher levels come from Daevanion nodes and gear. At skill level 8, 12 and 20 every active skill gets a slot for a **specialisation** (an extra effect you choose yourself). **Stigmas** are extra skills for your 4 stigma slots – the slots open at level 22, 27, 32 and 37.',
    },
    points: [
      {
        de: '[[11170000|Overhead Slam]], [[11010000|Rending Blow]] und [[11100000|Ruinous Blow]] zuerst auf 10 – das haben alle Top 10. Mehr als Stufe 10 geht mit Skillpunkten nicht, den Rest bringen Daevanion-Knoten und Ausrüstung. So ist das Ziel für [[11170000|Overhead Slam]] Skillstufe 16 – dort gibt es „Abklingzeit entfernt“.',
        en: '[[11170000|Overhead Slam]], [[11010000|Rending Blow]] and [[11100000|Ruinous Blow]] to 10 first – all of the top 10 have that. Skill points cannot go past level 10, the rest comes from Daevanion nodes and gear. That way the goal for [[11170000|Overhead Slam]] is skill level 16 – that is where “Remove cooldown” unlocks.',
      },
      {
        de: 'Dann [[11020000|Keen Strike]] (deine Grundattacke) und die passiven Schadens-Skills (passiv = wirken immer, ohne Drücken), sobald du sie lernst: [[11750000|Attack Preparation]] (ab Stufe 13, +10 % PvE-Schaden auf Skillstufe 10), [[11780000|Experienced Counterstrike]] (ab Stufe 21, mehr Schaden von vorne und beim Blocken) und [[11800000|Murderous Burst]] (ab Stufe 25, ein Flächenschlag nach je 5 Treffern). Fast alle Top 10 haben sie auf 10.',
        en: 'Then [[11020000|Keen Strike]] (your basic attack) and the passive damage skills (passive = always active, no key needed) as soon as you learn them: [[11750000|Attack Preparation]] (from level 13, +10% PvE damage at skill level 10), [[11780000|Experienced Counterstrike]] (from level 21, more damage from the front and on Block) and [[11800000|Murderous Burst]] (from level 25, an area hit after every 5 hits). Almost all of the top 10 have them at 10.',
      },
      {
        de: '[[11360000|Rush Strike]] und [[11190000|Leaping Slam]] auf 10 – fast alle Top 10 tun das. Dazu die Passiven [[11760000|Impact Hit]] (mehr „Wucht“: öfter ein Treffer mit stark erhöhtem Schaden) und [[11740000|Identify Weakness]] (mehr Krit.-Treffer).',
        en: '[[11360000|Rush Strike]] and [[11190000|Leaping Slam]] to 10 – almost all of the top 10 do that. Plus the passives [[11760000|Impact Hit]] (more “Double Chance”: more often a hit with greatly increased damage) and [[11740000|Identify Weakness]] (more Critical Hit).',
      },
      {
        de: 'Danach [[11050000|Crushing Wave]] (für Gruppen) und [[11290000|Mocking Blade]], dann [[11260000|Defiance]] (jede Stufe 1 s weniger Abklingzeit) und [[11200000|Ankle Slice]]. Hier gehen die Top 10 auseinander – einige lassen einzelne dieser Skills auf Stufe 1.',
        en: 'After that [[11050000|Crushing Wave]] (for packs) and [[11290000|Mocking Blade]], then [[11260000|Defiance]] (1 s less cooldown per level) and [[11200000|Ankle Slice]]. The top 10 differ here – some leave single ones of these skills at level 1.',
      },
      {
        de: 'Für mehr Überleben: [[11710000|Survival Stance]] (mehr Lebenspunkte) und [[11730000|Blood Absorption]] (Heilung beim Zuschlagen) helfen schon beim Leveln, [[11790000|Survival Willpower]] (Widerstand gegen Statuseffekte, ab Stufe 23) vor allem im PvP. Die meisten Top 10 haben alle drei auf 10.',
        en: 'For survival: [[11710000|Survival Stance]] (more HP) and [[11730000|Blood Absorption]] (heals you while you hit) already help while levelling, [[11790000|Survival Willpower]] (Status Effect Resist, from level 23) mostly in PvP. Most of the top 10 have all three at 10.',
      },
      {
        de: 'Zuletzt die Skills, bei denen die Top 10 sparen: [[11300000|Aerial Snare]] (im Median Stufe 7–8), [[11770000|Destructive Impulse]], [[11720000|Protection Armor]] und [[11280000|Sword Aura Rampage]]. Den letzten – er trifft nur taumelnde Ziele – lässt die Hälfte der Top 10 ganz ohne Punkte, die andere Hälfte bringt ihn auf 10. Seine Spezialisierung „-1 s auf alle Abklingzeiten bei jedem Treffer“ gibt es erst auf Skillstufe 16.',
        en: 'Last, the skills the top 10 save on: [[11300000|Aerial Snare]] (median level 7–8), [[11770000|Destructive Impulse]], [[11720000|Protection Armor]] and [[11280000|Sword Aura Rampage]]. The last one only hits staggered targets – half of the top 10 give it no points at all, the other half take it to 10. Its specialisation “-1 s on all cooldowns with every hit” only unlocks at skill level 16.',
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
        parts: [11100040 /* Ruinous Blow: Extra damage on hit */, 11100050 /* Ruinous Blow: Ignores Block and Evasion and lands as Multi-Hit */, 11100010 /* Ruinous Blow: +20% Skill Speed */],
        note: {
          de: 'Bis Skillstufe 15: Zusatzschaden und +20 % Fähigkeitstempo. Ab 16 tauschst du das Tempo gegen „ignoriert Block und Ausweichen, trifft als Mehrfachtreffer“, ab 20 passen alle drei. Statt des Tempos nehmen einige Guides +30 % Krit.-Chance des Skills.',
          en: 'Up to skill level 15: extra damage and +20% Skill Speed. From 16 swap the speed for “ignores Block and Evasion, lands as Multi-Hit”, from 20 all three fit. Instead of the speed some guides take +30% skill Critical Hit.',
        },
      },
      {
        id: 11010000 /* Rending Blow */,
        parts: [11010030 /* Rending Blow: Changes to mobile skill */, 11010050 /* Rending Blow: Restores 50 MP on landing a Critical Hit */, 11010040 /* Rending Blow: Deals up to 12% more damage when less targets are hit */],
        note: {
          de: 'Im Laufen nutzbar und MP bei kritischen Treffern – das hilft gegen MP-Mangel. Auf Skillstufe 20 dazu bis zu 12 % mehr Schaden, wenn du wenige Ziele triffst (gut am Boss).',
          en: 'Usable while moving and MP on critical hits – this helps against running out of MP. At skill level 20 add up to 12% more damage when you hit few targets (good on bosses).',
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
        id: 11360000 /* Rush Strike */,
        parts: [11360010 /* Rush Strike: Restores 300 Stamina on hit */, 11360040 /* Rush Strike: -10s cooldown */],
        note: {
          de: 'Ausdauer zurück für das nächste Ausweichen und 10 s weniger Abklingzeit (10 statt 20 s). Dritter Platz: +10 m Reichweite – im PvP lieber +25 % Chance auf Niederwerfen.',
          en: 'Stamina back for your next dodge and 10 s less cooldown (10 instead of 20 s). Third slot: +10 m range – in PvP rather +25% Knockdown chance.',
        },
      },
      {
        id: 11190000 /* Leaping Slam */,
        parts: [11190030 /* Leaping Slam: Resets cooldown on defeating an enemy */, 11190010 /* Leaping Slam: Prepare for Battle effect on the caster for 3s */],
        note: {
          de: 'Abklingzeit zurück, wenn ein Gegner stirbt (stark beim Farmen), und 3 s „Kampfbereitschaft“. Gegen einen einzelnen Boss tauschen manche das Zurücksetzen gegen 50 % Chance, [[11200000|Ankle Slice]] freizuschalten.',
          en: 'Cooldown reset when an enemy dies (strong for farming) and 3 s of “Prepare for Battle”. Against a single boss some swap the reset for a 50% chance to unlock [[11200000|Ankle Slice]].',
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
      {
        id: 11280000 /* Sword Aura Rampage */,
        parts: [11280040 /* Sword Aura Rampage: Multi-Hit on hit */, 11280050 /* Sword Aura Rampage: -1s all skill cooldowns on hit */],
        note: {
          de: 'Nur, wenn du dem Skill Punkte gibst: Mehrfachtreffer, und ab Skillstufe 16 verkürzt jeder Treffer alle Abklingzeiten um 1 s.',
          en: 'Only if you give this skill points: Multi-Hit, and from skill level 16 every hit cuts all cooldowns by 1 s.',
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          {
            id: 11400000 /* Lunge Stance */,
            note: {
              de: 'Kampftempo +20 % (14,5 s auf Stufe 10, 20 s auf Stufe 20). Dieses Stigma wertest du zuerst auf: Auf Stufe 20 senkt während der Wirkung jeder kritische Treffer mit 50 % Chance alle Abklingzeiten um 1 s. Fast alle Top 10 haben es auf 20.',
              en: 'Combat Speed +20% (14.5 s at level 10, 20 s at level 20). Level this stigma first: at level 20, every critical hit during the effect has a 50% chance to cut all cooldowns by 1 s. Almost all of the top 10 have it at 20.',
            },
          },
          {
            id: 11250000 /* Zikel's Blessing */,
            note: {
              de: 'Angriff +20 % (14,5 s auf Stufe 10, 20 s auf Stufe 20). Ab Stufe 5 füllst du die Taumel-Leiste 50 % schneller, ab Stufe 10 gibt es +10 % PvE-Schaden, auf Stufe 15 +50 % Mehrfachtreffer-Chance.',
              en: 'Attack +20% (14.5 s at level 10, 20 s at level 20). From level 5 you fill the stagger gauge 50% faster, from level 10 you get +10% PvE damage, at level 15 +50% Multi-Hit chance.',
            },
          },
          {
            id: 11390000 /* Rage Burst */,
            note: {
              de: 'Dein Boss-Burst. Früh auf Stufe 5 bringen: -15 s Abklingzeit (30 statt 45 s). Ab Stufe 15 trifft er immer kritisch, auf Stufe 20 gibt er noch mehr PvE-Schaden.',
              en: 'Your boss burst. Bring it to level 5 early: -15 s cooldown (30 instead of 45 s). From level 15 it always crits, at level 20 it gives even more PvE damage.',
            },
          },
          {
            id: 11110000 /* Focused Block */,
            note: {
              de: 'Der übliche vierte Platz (die meisten Guides, 4 der Top 10). Laut Skilltext parierst du damit kurz garantiert, und deine Block-Schadensreduktion steigt um 100 %. Blocke damit einen Boss-Angriff, am besten gleich den ersten: Der Block löst [[11780000|Experienced Counterstrike]] aus (20 s mehr Schaden für die ganze Gruppe). Ab Stufe 5 zweimal hintereinander nutzbar.',
              en: 'The usual fourth slot (most guides, 4 of the top 10). The skill text says it guarantees a parry for a short time and raises your Block Damage Reduction by 100%. Block a boss attack with it, ideally the very first one: the Block triggers [[11780000|Experienced Counterstrike]] (20 s more damage for the whole group). From level 5 you can use it twice in a row.',
            },
          },
          {
            id: 11410000 /* Wave Armor */,
            note: {
              de: 'Alternative für den vierten Platz (3 der Top 10), aber nur ohne Templer in der Gruppe: Eine Schadensaura um dich (bis zu 4 Gegner, 3 m). Solange sie läuft, wirkt ab Stufe 10 [[11780000|Experienced Counterstrike]] 1,5-mal so stark, ab Stufe 15 auch [[11800000|Murderous Burst]]. Abklingzeit 60 s.',
              en: 'Alternative for the fourth slot (3 of the top 10), but only without a Templar in the group: a damage aura around you (up to 4 enemies, 3 m). While it runs, [[11780000|Experienced Counterstrike]] works 1.5 times as strong from level 10, and [[11800000|Murderous Burst]] too from level 15. Cooldown 60 s.',
            },
          },
          {
            id: 11340000 /* Lifestealing Blade */,
            note: {
              de: 'Alternative für den vierten Platz (3 der Top 10), vor allem allein: Flächenschaden, der dich heilt. Ab Stufe 15 nur noch 60 s Abklingzeit statt 90 s.',
              en: 'Alternative for the fourth slot (3 of the top 10), above all solo: area damage that heals you. From level 15 its cooldown drops from 90 s to 60 s.',
            },
          },
        ],
      },
      {
        title: { de: 'Stigmen für PvP', en: 'Stigmas for PvP' },
        items: [
          {
            id: 11080000 /* Blade Toss */,
            note: {
              de: 'Halbiert 10 s lang die Heilung des Ziels und senkt seine Verteidigung um 30 % – sehr stark gegen Heiler. Reichweite 20 m, gut zum Eröffnen.',
              en: 'Halves the healing of the target for 10 s and lowers its Defense by 30% – very strong against healers. Range 20 m, good for opening.',
            },
          },
          {
            id: 11380000 /* Tenaciousness */,
            note: {
              de: '3 s unverwundbar und immun gegen Kontrolle – dein Notfall-Knopf. Dazu bleibt [[11400000|Lunge Stance]] auf Stufe 20 im PvP gesetzt.',
              en: '3 s invulnerable and immune to control effects – your emergency button. [[11400000|Lunge Stance]] at level 20 stays in your PvP set as well.',
            },
          },
          {
            id: 11130000 /* Armor of Balance */,
            note: {
              de: 'Der vierte PvP-Platz: +50 % Widerstand gegen Schock-Effekte (14,5 s auf Stufe 10, Abklingzeit 90 s), ab Stufe 5 auch +20 % gegen Körper- und Mental-Effekte, ab Stufe 10 heilt [[11730000|Blood Absorption]] dabei 1,5-mal so stark. Wirk es, bevor du in eine Gruppe springst. In der Arena nehmen manche [[11110000|Focused Block]] statt [[11080000|Blade Toss]].',
              en: 'The fourth PvP slot: +50% Impact-type Resist (14.5 s at level 10, cooldown 90 s), from level 5 also +20% Ailment-type and Mental-type Resist, from level 10 [[11730000|Blood Absorption]] heals 1.5 times as much during it. Cast it before you dive into a group. In the Arena some take [[11110000|Focused Block]] instead of [[11080000|Blade Toss]].',
            },
          },
        ],
      },
    ],
    daevanion: [
      {
        de: 'Daevanion-Tafeln geben dir Werte und Extra-Skillstufen (jede der vier Tafeln Nezekan bis Triniel +1 für jeden aktiven Skill). Nimm zuerst die Skill-Knoten für [[11170000|Overhead Slam]], [[11100000|Ruinous Blow]] und [[11010000|Rending Blow]], dann [[11360000|Rush Strike]] und [[11190000|Leaping Slam]] – die Top 10 nehmen sie auf jeder Tafel.',
        en: 'Daevanion boards give you stats and extra skill levels (each of the four boards Nezekan to Triniel +1 for every active skill). Take the skill nodes for [[11170000|Overhead Slam]], [[11100000|Ruinous Blow]] and [[11010000|Rending Blow]] first, then [[11360000|Rush Strike]] and [[11190000|Leaping Slam]] – the top 10 take them on every board.',
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
      de: 'Reihenfolge auf den Tafeln: **Mehrfachtreffer** > Krit.-Schadensverstärkung > Schadensverstärkung > Angriffskraft > Kampftempo > Krit.-Treffer > Abklingzeitverringerung. Die besonderen Knoten (Mehrfachtreffer, Krit.-Schadensverstärkung, Schadensverstärkung, Kampftempo, Abklingzeitverringerung) haben alle Top 10 offen – dort zählt die Reihenfolge also nur, solange dir Punkte fehlen. Bei den übrigen Werten nennen die globalen Guides **Wucht** (englisch „Double Chance“, ein eigener Wert, nicht dasselbe wie Mehrfachtreffer) und Kampftempo zuerst, dann Krit.-Treffer, Schadensverstärkung und genug Präzision, damit du Bosse sicher triffst. Auf der Ausrüstung lohnt sich außerdem Schadensverstärkung (Frontal), weil du von vorne angreifst. Für Krit. nennen globale Guides eine Grenze von 50 %.',
      en: 'Order on the boards: **Multi-Hit Chance** > Critical Damage Boost > Damage Boost > Attack > Combat Speed > Critical Hit > Cooldown Reduction. All of the top 10 have the special nodes open (Multi-Hit Chance, Critical Damage Boost, Damage Boost, Combat Speed, Cooldown Reduction) – so there the order only matters while you are short of points. For your other stats the global guides name **Double Chance** (a stat of its own, not the same as Multi-Hit) and Combat Speed first, then Critical Hit, Damage Boost and enough Accuracy to hit bosses reliably. On gear, Front Attack Damage Boost is also worth it, because you attack from the front. Global guides name a cap of 50% for crit.',
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
        note: {
          de: 'Geht nur nach einem **erfolgreichen Block** – [[11110000|Focused Block]] auf Taste 4 sorgt für einen. Bis dahin überspringt das Makro die Taste. Dann trifft der Skill bis zu 4 Gegner und hält normale Gegner 3 s fest.',
          en: 'Only works after a **successful Block** – [[11110000|Focused Block]] on key 4 gives you one. Until then the macro skips the key. Then it hits up to 4 enemies and roots normal enemies for 3 s.',
        },
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
        ids: [11100000 /* Ruinous Blow */],
        note: {
          de: 'Von Hand, sobald der Skill bereit ist: [[11100000|Ruinous Blow]] stürmt dich zum Ziel (7,5 m), deshalb nicht ins Makro. Er hat eine eigene Taste, damit ein Druck immer den Buff bringt.',
          en: 'By hand as soon as it is ready: [[11100000|Ruinous Blow]] rushes you to the target (7.5 m), so it stays out of the macro. It has a key of its own, so one press always gives you the buff.',
        },
      },
      {
        key: 'E',
        ids: [11360000 /* Rush Strike */, 11190000 /* Leaping Slam */],
        note: {
          de: 'Ansturm und Sprung – von Hand, sonst trägt dich das Makro mitten in eine Gruppe oder einen Boss-Angriff. Direkt nach einem Ausweichen nimmt die Taste [[11360000|Rush Strike]] (10 m, geht nur dann oder im Flug), sonst [[11190000|Leaping Slam]] (Sprung bis 20 m).',
          en: 'Charge and leap – by hand, otherwise the macro carries you right into a pack or a boss attack. Right after a dodge the key uses [[11360000|Rush Strike]] (10 m, only works then or while flying), otherwise [[11190000|Leaping Slam]] (leap of up to 20 m).',
        },
      },
      {
        key: '4',
        ids: [11110000 /* Focused Block */],
        note: {
          de: 'Vierter Stigma-Platz, von Hand gegen einen Boss-Angriff. Laut Skilltext parierst du kurz garantiert, deine Block-Schadensreduktion steigt um 100 %, und beim Parieren bekommst du einmal MP und Ausdauer zurück. Der Block löst [[11780000|Experienced Counterstrike]] aus und schaltet [[11200000|Ankle Slice]] auf Taste 2 frei. Spielst du allein, nimm für diesen Platz [[11340000|Lifestealing Blade]].',
          en: 'Fourth stigma slot, by hand against a boss attack. The skill text says you are guaranteed to parry for a short time, your Block Damage Reduction rises by 100%, and you get MP and Stamina back once on a parry. The Block triggers [[11780000|Experienced Counterstrike]] and unlocks [[11200000|Ankle Slice]] on key 2. If you play solo, take [[11340000|Lifestealing Blade]] for this slot.',
        },
      },
    ],
    note: {
      de: 'Das Makro drückt 1, 2, 8, 3 und zuletzt T – jeweils mit 10 ms. Halte dazu die Makro-Taste und die linke Maustaste. 5, 6, Q, E und 4 drückst du selbst: Was du drückst, hat immer Vorrang. [[11260000|Defiance]] liegt auf der Leertaste. Prüf die Stapel nach jeder Änderung an deinen Spezialisierungen.',
      en: 'The macro presses 1, 2, 8, 3 and T last – each with 10 ms. Hold the macro key and the left mouse button. You press 5, 6, Q, E and 4 yourself: whatever you press always comes first. [[11260000|Defiance]] sits on Space. Check the stacks after every change to your specialisations.',
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
    {
      de: '**„[[11360000|Rush Strike]] oder [[11200000|Ankle Slice]] geht nicht“:** Das ist kein Fehler – [[11360000|Rush Strike]] geht nur direkt nach einem Ausweichen (oder im Flug), [[11200000|Ankle Slice]] nur nach einem erfolgreichen Block.',
      en: '**“[[11360000|Rush Strike]] or [[11200000|Ankle Slice]] does not work”:** that is not a bug – [[11360000|Rush Strike]] only works right after a dodge (or while flying), [[11200000|Ankle Slice]] only after a successful Block.',
    },
  ],
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Gladiatoren haben im Median **240K** Kampfkraft bei Gegenstandsstufe **3.432** (Spanne 226–254K) – Platz 2 der acht Klassen, ≈70 Kampfkraft pro Gegenstandsstufe. Kein anderer Top-10-Kreis ist so gleichmäßig ausgebaut: Alle zehn tragen das komplette Set auf Gegenstandsstufe 102.",
      en: "The top 10 Gladiators have a median **240K** Combat Power at item level **3,432** (range 226–254K) – 2nd of the eight classes, ≈70 Combat Power per item level. No other top 10 is built up as evenly: all ten wear the full item level 102 set.",
    },
    gear: [
      {
        de: "**Waffe und Guard:** Splendent Ebony / Wise Dragon Lord Greatsword und Guard – alle zehn auf +15 mit Amplified +5.",
        en: "**Weapon and guard:** Splendent Ebony / Wise Dragon Lord Greatsword and Guard – all ten at +15 with Amplified +5.",
      },
      {
        de: "**Rüstung und Schmuck:** das ganze Splendent-Set – 68 von 70 Rüstungsteilen und alle 50 Schmuckstücke auf +15 mit Amplified +5.",
        en: "**Armour and jewellery:** the full Splendent set – 68 of 70 armour pieces and all 50 pieces of jewellery at +15 with Amplified +5.",
      },
      {
        de: "**Armreifen:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80), meist +15, dazu ein Liberator oder Pilgrim Bracelet +10.",
        en: "**Bracelets:** exactly one Ascension Bracelet (none of the top 80 wears more), mostly +15, plus a Liberator or Pilgrim Bracelet +10.",
      },
      {
        de: "**Rest:** Noble Belt +10 (9 von 10), Revelation Amulet +10 (6 von 10, drei tragen noch ein Fierce Battle Amulet), zwei Clash Runes +3 bis +5. Flügel: Dark Veil (6) oder Talisra (4).",
        en: "**The rest:** Noble Belt +10 (9 of 10), Revelation Amulet +10 (6 of 10, three still wear a Fierce Battle Amulet), two Clash Runes +3 to +5. Wings: Dark Veil (6) or Talisra (4).",
      },
    ],
    arcana: {
      de: "**Chalice, Parchment und Compass of Vigor** (9, 8 und 7 von 10), dazu **Bell of Magic** (9) und **Mirror of Magic** (7). 41 von 50 Karten sind auf +5.",
      en: "**Chalice, Parchment and Compass of Vigor** (9, 8 and 7 of 10), plus **Bell of Magic** (9) and **Mirror of Magic** (7). 41 of 50 cards are at +5.",
    },
    stigmas: [
      { id: 11400000, note: { de: '10 von 10 · Median Stufe 20', en: '10 of 10 · median level 20' } },
      { id: 11250000, note: { de: '9 von 10 · Median Stufe 20', en: '9 of 10 · median level 20' } },
      { id: 11390000, note: { de: '10 von 10 · Median Stufe 18', en: '10 of 10 · median level 18' } },
      { id: 11110000, note: { de: '4 von 10 · Median Stufe 15', en: '4 of 10 · median level 15' } },
    ],
    tips: [
      {
        de: "**Das Set ist fertig:** Die Top-Gladiatoren legen im Median „nur“ +40K pro Woche zu, weniger als die meisten Klassen. Was noch dazukommt, kommt vor allem aus Daevanion-Knoten, Titeln und den letzten Arcana-Stufen.",
        en: "**The set is done:** the top Gladiators gain a median of “only” +40K per week, less than most classes. What still comes on top comes mostly from Daevanion nodes, titles and the last Arcana levels.",
      },
      {
        de: "**Amulett und Gürtel:** Beide gelingen bis +10 immer (eine Schriftrolle pro Stufe) – bring sie hoch, bevor du über +10 hinaus verzauberst.",
        en: "**Amulet and belt:** both always succeed up to +10 (one scroll per step) – take them up before you enhance past +10.",
      },
      {
        de: "**Daevanion:** Im Median sind 62, 57 und 60 von 88 Knoten auf den ersten drei Tafeln offen, 75 von 116 auf der vierten und 37 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 62, 57 and 60 of 88 nodes are open on the first three boards, 75 of 116 on the fourth and 37 of 152 on the fifth.",
      },
    ],
  },
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/gladiator', label: 'MetaBot – Gladiator class guide' },
    { href: 'https://dbaion2.ru/en/guides/gayd-gladiator/', label: 'dbaion2 – Gladiator guide' },
    { href: 'https://allthings.how/aion-2-gladiator-pve-build-skills-stigmas-and-the-level-16-overhead-slam-rotation/', label: 'AllThings.How – Gladiator PvE build and rotation' },
    { href: 'https://www.inven.co.kr/board/aion2/6448/16354', label: 'Inven (KR) – Gladiator build post 1' },
    { href: 'https://www.inven.co.kr/board/aion2/6448/31551', label: 'Inven (KR) – Gladiator build post 2' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-08-12', label: 'AION2Hub – KR update 2026-08-12 (Gladiator)' },
    { href: 'https://metabot.gg/en/aion-2/guides/class-builds-guide', label: 'MetaBot – Class builds guide' },
    { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide' },
    { href: 'https://metabot.gg/en/aion-2/stats', label: 'MetaBot – Stats explained (Double Chance and Multi-Hit)' },
    { href: 'https://aion2vault.com/builds/gladiator/pve/', label: 'AION2 Vault – Gladiator PvE build' },
    { href: 'https://aion2-guides.info/en/gladiator/', label: 'AION 2 Guides – Gladiator (PvE and PvP)' },
    { href: 'https://aion2-meta.com/guides/gladiator/', label: 'Aion 2 Meta – Gladiator guide' },
    { href: 'https://aion2.wiki.fextralife.com/Gladiator', label: 'Fextralife – Gladiator' },
    { href: 'https://aion2.wiki.fextralife.com/Gladiator_Builds', label: 'Fextralife – Gladiator builds' },
  ],
  caveat: {
    de: "Der globale Client entspricht etwa dem koreanischen Stand von Anfang September 2026. Guides von vor dem 12. August (Änderungen an [[11100000|Ruinous Blow]]) sind teils veraltet. Bei den Stigma-Stufen sind sich die Quellen nicht einig: Viele Guides nennen [[11390000|Rage Burst]] Stufe 5 und [[11250000|Zikel's Blessing]] Stufe 10, die Top 10 haben beide meist auf 15–20. Auch bei [[11280000|Sword Aura Rampage]] und der Spezialisierung von [[11020000|Keen Strike]] gehen die Meinungen auseinander. Dass [[11360000|Rush Strike]] nur nach einem Ausweichen und [[11200000|Ankle Slice]] nur nach einem Block geht, steht so im deutschen Skilltext und bei Fextralife – der englische Text ist an der Stelle unklar. Im Zweifel gilt, was im Spiel bei dir funktioniert.",
    en: "The global client is roughly at the Korean state of early September 2026. Guides from before 12 August (changes to [[11100000|Ruinous Blow]]) are partly outdated. Sources disagree on stigma levels: many guides name [[11390000|Rage Burst]] level 5 and [[11250000|Zikel's Blessing]] level 10, while the top 10 mostly have both at 15–20. Opinions also differ on [[11280000|Sword Aura Rampage]] and on the specialisation of [[11020000|Keen Strike]]. That [[11360000|Rush Strike]] only works after a dodge and [[11200000|Ankle Slice]] only after a Block is what the German skill text and Fextralife say – the English text is unclear there. When in doubt, what works for you in game wins.",
  },
});
