import { classGuide } from './classGuide';

/** Beginner guide for the Assassin: melee burst from behind. Hotbar and macro are set up for bosses. */
export const assassinGuide = classGuide({
  id: 'assassin',
  cls: 'Assassin',
  tone: 'violet',
  title: { de: 'Assassine-Guide', en: 'Assassin guide' },
  summary: {
    de: 'Der Assassine schleicht sich hinter den Gegner und macht dort in kurzer Zeit sehr viel Schaden. Hier lernst du Skills, Rotation, Build und Makro Schritt für Schritt.',
    en: 'The Assassin sneaks behind the enemy and deals a lot of damage there in a short time. Here you learn skills, rotation, build and macro step by step.',
  },
  tags: [
    { de: 'Nahkampf-DPS', en: 'Melee DPS' },
    { de: 'Burst', en: 'Burst' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-15',
  glance: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: '**Nahkampf-Schaden** auf ein Ziel – viel Schaden in kurzer Zeit (Burst)', en: '**Melee damage** on one target – lots of damage in a short time (burst)' } },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: '**Schwer** – du musst hinter dem Gegner stehen und gut auf dich aufpassen', en: '**Hard** – you have to stand behind the enemy and look after yourself' } },
    { label: { de: 'Reichweite', en: 'Range' }, value: { de: 'Nahkampf (4 m); mit [[13070000|Shadowstrike]] springst du aus 20 m heran', en: 'Melee (4 m); [[13070000|Shadowstrike]] jumps you in from 20 m' } },
    { label: { de: 'Stärken', en: 'Strengths' }, value: { de: 'Sehr hoher Schaden von hinten, schnell am Ziel, viele Betäubungen (der Gegner kann dann kurz nichts tun)', en: 'Very high damage from behind, quick to reach a target, many stuns (the enemy cannot act for a moment)' } },
    { label: { de: 'Schwächen', en: 'Weaknesses' }, value: { de: 'Hält wenig aus, kein Buff (Stärkung auf Zeit) für die Gruppe, trifft höchstens 4 Gegner', en: 'Fragile, no buff (a temporary boost) for the group, hits at most 4 enemies' } },
  ],
  forWhom: {
    de: 'Du schleichst dich gern an, schlägst von hinten hart zu und bist schnell wieder weg. Du achtest gern auf deine Position und hast flinke Finger – und es stört dich nicht, dass du nicht viel aushältst.',
    en: 'You like to sneak up, hit hard from behind and be gone again quickly. You enjoy watching your position and have quick fingers – and you do not mind that you cannot take many hits.',
  },
  party: {
    dungeon: [
      {
        de: '**Deine Aufgabe ist Schaden.** Du hast keinen Buff für die Gruppe – du hilfst, indem der Boss schnell fällt.',
        en: '**Your job is damage.** You have no buff for the group – you help by making the boss fall fast.',
      },
      {
        de: "**Greif von hinten an.** Ein **Rückenangriff** ist ein Treffer in den Rücken des Gegners. [[13060000|Ambush]] und [[13300000|Triniel's Dagger]] machen dann 30 % mehr Schaden, und [[13740000|Rear Smite]] erhöht deinen Schaden von hinten noch weiter.",
        en: "**Attack from behind.** A **back attack** is a hit into the enemy's back. [[13060000|Ambush]] and [[13300000|Triniel's Dagger]] then deal 30% more damage, and [[13740000|Rear Smite]] raises your damage from behind even more.",
      },
      {
        de: '**Deine Stärke ist der Boss, nicht die große Gruppe.** Deine Flächen-Skills treffen höchstens 4 Gegner.',
        en: '**Your strength is the boss, not the big pack.** Your area skills hit at most 4 enemies.',
      },
      {
        de: '**Pass auf dich auf.** Du hältst wenig aus – lauf nie vor dem Tank hinein. Wirst du betäubt oder umgeworfen, befreit dich [[13260000|Defiance]] auf der Leertaste.',
        en: '**Look after yourself.** You cannot take many hits – never run in before the tank. If you are stunned or knocked down, [[13260000|Defiance]] on Space frees you.',
      },
    ],
    boss: {
      de: 'Stell dich **hinter** den Boss und hebe [[13390000|Swift Contract]] und [[13310000|Illusive Clone]] für ihn auf. Jeder Treffer füllt die Benommen-Leiste des Bosses. Ist sie voll, **taumelt** er (Stagger): Dann geht [[13340000|Storm Rampage]], und [[13780000|Defense Break]] senkt seine Verteidigung um 30 %.',
      en: 'Stand **behind** the boss and save [[13390000|Swift Contract]] and [[13310000|Illusive Clone]] for it. Every hit fills the boss’s Stagger bar. When it is full, the boss **staggers**: now [[13340000|Storm Rampage]] works, and [[13780000|Defense Break]] lowers its Defense by 30%.',
    },
    pvp: {
      de: 'Im PvP bist du der Jäger. Mit [[13180000|Shadow Walk]] (Stigma) bist du getarnt, bis der Kampf beginnt. Eröffne mit [[13070000|Shadowstrike]] – er betäubt – und setz dann deine stärksten Skills ein. [[13020000|Throw Shadowblade]] bremst Gegner, die fliehen. Wichtig: [[13260000|Defiance]] löst kein Siegel und keinen Bann.',
      en: 'In PvP you are the hunter. [[13180000|Shadow Walk]] (stigma) keeps you hidden until the fight starts. Open with [[13070000|Shadowstrike]] – it stuns – and then use your strongest skills. [[13020000|Throw Shadowblade]] slows enemies who run away. Important: [[13260000|Defiance]] does not remove Seal or Root.',
    },
    solo: {
      de: 'Allein kommst du gut voran, wenn du Gegner einzeln nimmst. Gegen normale Gegner (NPCs) wirken deine Betäubungen besonders zuverlässig, und [[13710000|Heightened Sixth Sense]] heilt dich, wenn du einem Angriff ausweichst.',
      en: 'Solo you do well when you take enemies one at a time. Against normal enemies (NPCs) your stuns work especially reliably, and [[13710000|Heightened Sixth Sense]] heals you when you evade an attack.',
    },
  },
  skills: [
    {
      id: 13350000 /* Heart Gore */,
      note: {
        de: 'Laut Guides deine größte Schadensquelle. Geht nur nach einem **kritischen Treffer** (Krit) und hat nur 5 s **Abklingzeit** – so heißt die Wartezeit, bis ein Skill wieder bereit ist. Ab Stufe 4.',
        en: 'Guides call it your biggest source of damage. Works only after a **critical hit** (crit) and has only a 5 s **cooldown** – the wait until a skill is ready again. From level 4.',
      },
    },
    {
      id: 13130000 /* Insignia Explosion */,
      note: {
        de: 'Dein großer Schlag ab Stufe 14. Viele deiner Skills setzen **Glyphen** auf den Gegner, bis zu 5. Je mehr Glyphen, desto mehr Schaden – und desto eher betäubt der Schlag.',
        en: 'Your big hit from level 14. Many of your skills put **Insignias** on the enemy, up to 5. The more Insignias, the more damage – and the higher the chance to stun.',
      },
    },
    {
      id: 13010000 /* Quick Slice */,
      note: {
        de: 'Deine Grundattacke: Du hältst sie mit der linken Maustaste. Bringt MP zurück. Mit Spezialisierung macht jeder Treffer [[13130000|Insignia Explosion]] schneller bereit; später trifft die Grundattacke sogar immer kritisch – das löst [[13350000|Heart Gore]] aus.',
        en: 'Your basic attack: you hold it with the left mouse button. Restores MP. With specialisations every hit makes [[13130000|Insignia Explosion]] ready sooner; later the basic attack even always lands a crit – which triggers [[13350000|Heart Gore]].',
      },
    },
    {
      id: 13100000 /* Savage Roar */,
      note: {
        de: 'Ein **Füller** – ein Skill ohne Abklingzeit für die Lücken. Setzt bei jedem Treffer 1 Glyphe. Danach erscheint kurz ein zweiter Schlag auf derselben Taste (Kettenskill), der noch eine setzt.',
        en: 'A **filler** – a skill without a cooldown for the gaps. Puts 1 Insignia on the enemy with every hit. Then a second strike briefly appears on the same key (chain skill) and adds one more.',
      },
    },
    {
      id: 13060000 /* Ambush */,
      note: {
        de: '+30 % Schaden als Rückenangriff, 10 s Abklingzeit. Mit Spezialisierung setzt er von hinten 2 Glyphen und kann [[13210000|Whirlwind Slice]] auslösen.',
        en: '+30% damage as a back attack, 10 s cooldown. With specialisations it puts 2 Insignias on the enemy from behind and can trigger [[13210000|Whirlwind Slice]].',
      },
    },
    {
      id: 13070000 /* Shadowstrike */,
      note: {
        de: 'Dein Ansprung: Er bringt dich aus bis zu 20 m **hinter** das Ziel und betäubt es. Damit eröffnest du fast jeden Kampf.',
        en: 'Your gap closer: it takes you from up to 20 m **behind** the target and stuns it. You open almost every fight with it.',
      },
    },
    {
      id: 13390000 /* Swift Contract */,
      note: {
        de: 'Stigma (ab Stufe 22): ein Buff mit +20 % Kampftempo – du schlägst schneller zu. 60 s Abklingzeit.',
        en: 'Stigma (from level 22): a buff with +20% Combat Speed – you attack faster. 60 s cooldown.',
      },
    },
    {
      id: 13310000 /* Illusive Clone */,
      note: {
        de: 'Stigma: Solange es wirkt, hat [[13350000|Heart Gore]] keine Abklingzeit, und du machst 20 % Zusatzschaden. Dein größter Burst-Buff (90 s Abklingzeit).',
        en: 'Stigma: while it lasts, [[13350000|Heart Gore]] has no cooldown and you deal 20% extra damage. Your biggest burst buff (90 s cooldown).',
      },
    },
  ],
  rotation: {
    intro: {
      de: 'Vor Stufe 22 hast du noch keine Stigmen: Lass diese Schritte weg und eröffne direkt mit [[13070000|Shadowstrike]]. Vor Stufe 14 fehlt dir auch [[13130000|Insignia Explosion]].',
      en: 'Before level 22 you have no stigmas yet: skip those steps and open right away with [[13070000|Shadowstrike]]. Before level 14 you also do not have [[13130000|Insignia Explosion]].',
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 13390000 /* Swift Contract */, note: { de: '+20 % Kampftempo', en: '+20% Combat Speed' } },
          { id: 13310000 /* Illusive Clone */, note: { de: '+20 % Zusatzschaden', en: '+20% extra damage' } },
          { id: 13070000 /* Shadowstrike */, note: { de: 'Hinter den Boss springen, betäuben', en: 'Jump behind the boss, stun it' } },
          { id: 13300000 /* Triniel's Dagger */, note: { de: 'Von hinten: +30 % Schaden', en: 'From behind: +30% damage' } },
          { id: 13270000 /* Savage Fang */, note: { de: '5 Glyphen auf einmal', en: '5 Insignias at once' } },
          { id: 13130000 /* Insignia Explosion */, note: { de: 'Volle Glyphen, voller Schaden', en: 'Full Insignias, full damage' } },
          { id: 13010000 /* Quick Slice */, note: { de: 'Jetzt Makro + linke Maustaste halten', en: 'Now hold macro + left mouse button' } },
        ],
      },
      {
        title: { de: 'Danach: Reihenfolge im Kampf', en: 'Then: priority in the fight' },
        steps: [
          { id: 13350000 /* Heart Gore */, note: { de: 'Immer, wenn bereit (nach einem Krit)', en: 'Whenever ready (after a crit)' } },
          { id: 13130000 /* Insignia Explosion */, note: { de: 'Am besten bei 5 Glyphen', en: 'Best at 5 Insignias' } },
          { id: 13060000 /* Ambush */, note: { de: 'Von hinten', en: 'From behind' } },
          { id: 13300000 /* Triniel's Dagger */, note: { de: 'Wenn bereit, von hinten', en: 'When ready, from behind' } },
          { id: 13340000 /* Storm Rampage */, note: { de: 'Nur wenn der Boss taumelt', en: 'Only while the boss staggers' } },
          { id: 13100000 /* Savage Roar */, note: { de: 'Füller, setzt Glyphen', en: 'Filler, adds Insignias' } },
          { id: 13010000 /* Quick Slice */, note: { de: 'Grundattacke dazwischen', en: 'Basic attack in between' } },
        ],
      },
    ],
    tips: [
      {
        de: '**Bleib im Rücken des Gegners.** Dreht er sich zu dir, lauf wieder hinter ihn – [[13070000|Shadowstrike]] bringt dich direkt dorthin.',
        en: '**Stay behind the enemy.** If it turns to you, move behind it again – [[13070000|Shadowstrike]] takes you straight there.',
      },
      {
        de: '**Glyphen halten nur 10 s.** Zünde [[13130000|Insignia Explosion]], bevor sie ablaufen – am besten bei 5.',
        en: '**Insignias last only 10 s.** Use [[13130000|Insignia Explosion]] before they run out – best at 5.',
      },
      {
        de: '**Buffs zusammen drücken:** [[13390000|Swift Contract]] und [[13310000|Illusive Clone]] wirken gleich lang. Drück sie direkt nacheinander und setz danach deine stärksten Skills ein.',
        en: '**Press the buffs together:** [[13390000|Swift Contract]] and [[13310000|Illusive Clone]] last equally long. Press them right after each other, then use your strongest skills.',
      },
      {
        de: '**[[13340000|Storm Rampage]] liegt auf T unter dem Füller.** Taumelt der Boss, nimmt die Taste ihn von selbst – das Makro drückt T als letzten Schritt.',
        en: '**[[13340000|Storm Rampage]] sits on T below the filler.** When the boss staggers, the key uses it by itself – the macro presses T as its last step.',
      },
    ],
  },
  build: {
    intro: {
      de: 'Im globalen Spiel ist die Höchststufe 45, und du hast **4 Stigma-Plätze** (ab Stufe 22, 27, 32 und 37). Koreanische Builds haben mehr Plätze – übernimm sie nicht eins zu eins. **Spezialisierungen:** Ein Skill bekommt ab Skillstufe 8 den ersten Platz, ab 12 den zweiten und ab 20 den dritten.',
      en: 'In the global game the level cap is 45, and you have **4 stigma slots** (from level 22, 27, 32 and 37). Korean builds have more slots – do not copy them one to one. **Specialisations:** a skill gets its first slot at skill level 8, the second at 12 and the third at 20.',
    },
    points: [
      { de: '**[[13350000|Heart Gore]]** (ab Stufe 4) und **[[13060000|Ambush]]** (ab Stufe 3) zuerst – deine wichtigsten Treffer.', en: '**[[13350000|Heart Gore]]** (from level 4) and **[[13060000|Ambush]]** (from level 3) first – your key hits.' },
      { de: '**[[13010000|Quick Slice]]** auf Stufe 8 – dann bekommt deine Grundattacke ihre erste Spezialisierung. Daneben Punkte in **[[13100000|Savage Roar]]**, deinen Füller.', en: '**[[13010000|Quick Slice]]** to level 8 – then your basic attack gets its first specialisation. Alongside, put points into **[[13100000|Savage Roar]]**, your filler.' },
      { de: '**[[13130000|Insignia Explosion]]**, sobald du sie mit Stufe 14 lernst.', en: '**[[13130000|Insignia Explosion]]** as soon as you learn it at level 14.' },
      { de: 'Dann **[[13210000|Whirlwind Slice]]**, **[[13340000|Storm Rampage]]** und **[[13050000|Flash Slice]]** nach und nach auf Stufe 10.', en: 'Then **[[13210000|Whirlwind Slice]]**, **[[13340000|Storm Rampage]]** and **[[13050000|Flash Slice]]** step by step to level 10.' },
      { de: '**[[13070000|Shadowstrike]]** auf Stufe 8 – für die Spezialisierung mit mehr Krit-Schaden.', en: '**[[13070000|Shadowstrike]]** to level 8 – for the specialisation with more crit damage.' },
      { de: 'Passive: **[[13740000|Rear Smite]]** vor **[[13750000|Assault Stance]]** vor **[[13720000|Exploit Weakness]]** vor **[[13760000|Impact Hit]]**.', en: 'Passives: **[[13740000|Rear Smite]]** before **[[13750000|Assault Stance]]** before **[[13720000|Exploit Weakness]]** before **[[13760000|Impact Hit]]**.' },
    ],
    specs: [
      {
        id: 13010000 /* Quick Slice */,
        parts: [13010030 /* Quick Slice: +50% Multi-Hit on hit */, 13010040 /* Quick Slice: -1s [Insignia Explosion] cooldown on hit */, 13010050 /* Quick Slice: Ignores Block and Evasion and lands as a Critical Hit */],
        note: {
          de: 'Zuerst mehr Mehrfachtreffer. Ab Stufe 12 macht jeder Treffer [[13130000|Insignia Explosion]] 1 s früher bereit. Mit der Stufe-16-Option trifft die Grundattacke immer kritisch und löst so [[13350000|Heart Gore]] aus – Guides nehmen sie, sobald der dritte Platz frei ist.',
          en: 'First more Multi-Hit. From level 12 every hit makes [[13130000|Insignia Explosion]] ready 1 s sooner. With the level 16 option the basic attack always lands a crit and so triggers [[13350000|Heart Gore]] – guides take it as soon as the third slot is open.',
        },
      },
      {
        id: 13350000 /* Heart Gore */,
        parts: [13350020 /* Heart Gore: Engraves 1 Insignia for 10s on hit */, 13350040 /* Heart Gore: Multi-Hit on hit */, 13350050 /* Heart Gore: Resets [Heart Gore] cooldown on landing a Critical Hit */],
        note: {
          de: 'Mehr Glyphen für [[13130000|Insignia Explosion]] und sichere Mehrfachtreffer. Die Stufe-16-Option macht den Skill nach jedem Krit sofort wieder bereit – die Guides empfehlen sie.',
          en: 'More Insignias for [[13130000|Insignia Explosion]] and sure Multi-Hits. The level 16 option makes the skill ready again after every crit – guides recommend it.',
        },
      },
      {
        id: 13130000 /* Insignia Explosion */,
        parts: [13130030 /* Insignia Explosion: Keep 2 stacks of Insignias after [Insignia Explosion] */, 13130020 /* Insignia Explosion: +50% Multi-Hit on hit */, 13130050 /* Insignia Explosion: -3s cooldown */],
        note: {
          de: '2 Glyphen bleiben nach der Explosion liegen – so ist die nächste schneller wieder voll. Dazu +50 % Mehrfachtreffer, später −3 s Abklingzeit.',
          en: '2 Insignias stay after the explosion – so the next one is full again sooner. Plus +50% Multi-Hit, later −3 s cooldown.',
        },
      },
      {
        id: 13060000 /* Ambush */,
        parts: [13060010 /* Ambush: Engraves 2 Insignias for 10s on landing as a Back attack */, 13060040 /* Ambush: 50% chance to trigger [Whirlwind Slice] on hit */],
        note: {
          de: 'Von hinten setzt er 2 Glyphen. Die zweite Option löst mit 50 % Chance [[13210000|Whirlwind Slice]] aus – das betäubt normale Gegner und macht [[13220000|Shadow Fall]] möglich.',
          en: 'From behind it puts 2 Insignias on the enemy. The second option has a 50% chance to trigger [[13210000|Whirlwind Slice]] – it stuns normal enemies and makes [[13220000|Shadow Fall]] possible.',
        },
      },
      {
        id: 13070000 /* Shadowstrike */,
        parts: [13070020 /* Shadowstrike: +20% caster Critical Damage Boost for 5s on hit */],
        note: {
          de: 'Guides nehmen +20 % Krit-Schaden für 5 s nach dem Ansprung – genau dann kommt dein Burst. Dafür braucht der Skill Stufe 8.',
          en: 'Guides take +20% crit damage for 5 s after the jump – exactly when your burst comes. The skill needs level 8 for this.',
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          { id: 13310000 /* Illusive Clone */, note: { de: 'Dein großer Burst: [[13350000|Heart Gore]] ohne Abklingzeit plus 20 % Zusatzschaden.', en: 'Your big burst: [[13350000|Heart Gore]] without a cooldown plus 20% extra damage.' } },
          { id: 13390000 /* Swift Contract */, note: { de: '+20 % Kampftempo. Ab Stigma-Stufe 10 wirkt dabei auch [[13740000|Rear Smite]] 1,5-mal so stark.', en: '+20% Combat Speed. From stigma level 10 it also makes [[13740000|Rear Smite]] 1.5 times as strong.' } },
          { id: 13300000 /* Triniel's Dagger */, note: { de: 'Starker Treffer, von hinten +30 % Schaden.', en: 'Strong hit, +30% damage from behind.' } },
          { id: 13270000 /* Savage Fang */, note: { de: 'Setzt 5 Glyphen auf einmal und füllt die Benommen-Leiste stark – direkt vor [[13130000|Insignia Explosion]].', en: 'Puts 5 Insignias on the enemy at once and fills the Stagger bar a lot – right before [[13130000|Insignia Explosion]].' } },
        ],
      },
      {
        title: { de: 'Stigmen für PvP', en: 'Stigmas for PvP' },
        items: [
          { id: 13180000 /* Shadow Walk */, note: { de: '20 s getarnt vor dem Kampf – du entscheidest, wann es losgeht.', en: '20 s hidden before the fight – you decide when it starts.' } },
          { id: 13020000 /* Throw Shadowblade */, note: { de: 'Wurf aus 20 m, verlangsamt um 40 % – gegen Gegner, die fliehen.', en: 'Throw from 20 m, slows by 40% – against enemies who run away.' } },
          { id: 13300000 /* Triniel's Dagger */, note: { de: 'Hoher Schaden, und die Abklingzeiten des Gegners werden länger.', en: 'High damage, and the enemy’s cooldowns get longer.' } },
          { id: 13310000 /* Illusive Clone */, note: { de: 'Dein Burst, um einen Spieler schnell zu besiegen.', en: 'Your burst to take a player down fast.' } },
        ],
      },
    ],
    daevanion: [
      {
        de: '**Nezekan** (ab Stufe 12): Krit.-Treffer und Angriffskraft. Die großen Knoten geben Kampftempo und Abklingzeitverringerung.',
        en: '**Nezekan** (from level 12): Critical Hit and Attack. The big nodes give Combat Speed and Cooldown Reduction.',
      },
      {
        de: '**Zikel** (Stufe 20): Schadensverstärkung. **Vaizel** (Stufe 30): Krit.-Schadensverstärkung – sehr wertvoll für dich. **Triniel** (Stufe 40): Mehrfachtreffer.',
        en: '**Zikel** (level 20): Damage Boost. **Vaizel** (level 30): Critical Damage Boost – very valuable for you. **Triniel** (level 40): Multi-Hit Chance.',
      },
      {
        de: 'Skillstufen-Knoten geben deinen Skills Extra-Stufen. Jede Stufe zählt auch für die Plätze der Spezialisierungen.',
        en: 'Skill level nodes give your skills extra levels. Every level also counts for the specialisation slots.',
      },
      {
        de: '**Azphel** (Stufe 45) ist die PvP-Tafel. Du bezahlst sie mit **Kampfkristallen** aus dem PvP, nicht mit Daevanion-Kristallen. Ihre Werte zählen nur gegen Spieler.',
        en: '**Azphel** (level 45) is the PvP board. You pay for it with **Battle Crystals** from PvP, not with Daevanion Crystals. Its stats only count against players.',
      },
    ],
    stats: {
      de: 'Diese Werte zählen für dich, das wichtigste zuerst: **Krit.-Treffer** > **Krit.-Schadensverstärkung** > **Angriffskraft** > **Schadensverstärkung** > **Kampftempo** > **Mehrfachtreffer** > **Abklingzeitverringerung**. Krit steht vorn, weil [[13350000|Heart Gore]] nur nach Krits kommt.',
      en: 'These stats matter for you, most important first: **Critical Hit** > **Critical Damage Boost** > **Attack** > **Damage Boost** > **Combat Speed** > **Multi-Hit Chance** (Double Chance) > **Cooldown Reduction**. Crit comes first because [[13350000|Heart Gore]] only comes after crits.',
    },
  },
  macro: {
    keys: [
      {
        key: '2',
        ids: [13350000 /* Heart Gore */, 13130000 /* Insignia Explosion */, 13060000 /* Ambush */],
        macro: true,
        note: {
          de: '[[13350000|Heart Gore]] geht nur nach einem Krit – deshalb probiert die Taste ihn zuerst. Sonst kommt [[13130000|Insignia Explosion]], dann [[13060000|Ambush]]. Manche Guides legen [[13130000|Insignia Explosion]] ganz nach unten, damit sie nie auf [[13350000|Heart Gore]] wartet.',
          en: '[[13350000|Heart Gore]] only works after a crit – that is why the key tries it first. Otherwise [[13130000|Insignia Explosion]] comes, then [[13060000|Ambush]]. Some guides put [[13130000|Insignia Explosion]] at the very bottom so it never waits for [[13350000|Heart Gore]].',
        },
      },
      {
        key: '7',
        ids: [13300000 /* Triniel's Dagger */],
        macro: true,
        note: { de: 'Stigma: starker Treffer, von hinten +30 %.', en: 'Stigma: strong hit, +30% from behind.' },
      },
      {
        key: 'T',
        ids: [13340000 /* Storm Rampage */, 13100000 /* Savage Roar */],
        macro: true,
        note: {
          de: 'Letzter Schritt im Makro. Füller oben: [[13100000|Savage Roar]] setzt Glyphen. Darunter [[13340000|Storm Rampage]]: Er kommt nur, wenn der Gegner taumelt – dann nimmt die Taste ihn von selbst.',
          en: 'Last step of the macro. Filler on top: [[13100000|Savage Roar]] adds Insignias. Below it [[13340000|Storm Rampage]]: it only comes while the enemy staggers – then the key uses it by itself.',
        },
      },
      {
        key: 'R',
        ids: [13010000 /* Quick Slice */],
        note: { de: 'Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Bringt MP zurück.', en: 'Basic attack: hold the left mouse button, **not** in the macro. Restores MP.' },
      },
      {
        key: '1',
        ids: [13220000 /* Shadow Fall */, 13210000 /* Whirlwind Slice */],
        note: {
          de: 'Von Hand, nicht im Makro: [[13220000|Shadow Fall]] bringt dich zum Ziel (bis 10 m). Kombo: Er geht nur gegen ein betäubtes Ziel, und [[13210000|Whirlwind Slice]] darüber betäubt normale Gegner sicher. Drück die Taste gegen normale Gegner zweimal: erst kommt [[13210000|Whirlwind Slice]], beim nächsten Druck [[13220000|Shadow Fall]].',
          en: 'By hand, not in the macro: [[13220000|Shadow Fall]] takes you to the target (up to 10 m). Combo: it only works on a stunned target, and [[13210000|Whirlwind Slice]] above it surely stuns normal enemies. Against normal enemies press the key twice: first [[13210000|Whirlwind Slice]] comes, on the next press [[13220000|Shadow Fall]].',
        },
      },
      {
        key: '5',
        ids: [13390000 /* Swift Contract */],
        note: { de: 'Buff – von Hand in der Eröffnung, nicht an schwachen Gegnern verschwenden.', en: 'Buff – by hand in the opener, do not waste it on weak mobs.' },
      },
      {
        key: '4',
        ids: [13070000 /* Shadowstrike */, 13050000 /* Flash Slice */, 13360000 /* Infiltrate */],
        note: {
          de: 'Ansprünge, von Hand: Zuerst [[13070000|Shadowstrike]] (20 m, landet hinter dem Ziel). Läuft seine Abklingzeit, nimmt die Taste [[13050000|Flash Slice]], dann [[13360000|Infiltrate]] (nur nach Notausweichen oder im Flug).',
          en: 'Gap closers, by hand: first [[13070000|Shadowstrike]] (20 m, lands behind the target). While it is on cooldown the key uses [[13050000|Flash Slice]], then [[13360000|Infiltrate]] (only after a dodge or while flying).',
        },
      },
      {
        key: '6',
        ids: [13310000 /* Illusive Clone */],
        note: {
          de: 'Stigma, dein großer Burst: Drück es in der Eröffnung direkt nach [[13390000|Swift Contract]]. Solange es wirkt, hat [[13350000|Heart Gore]] keine Abklingzeit.',
          en: 'Stigma, your big burst: press it in the opener right after [[13390000|Swift Contract]]. While it lasts, [[13350000|Heart Gore]] has no cooldown.',
        },
      },
      {
        key: '8',
        ids: [13270000 /* Savage Fang */],
        note: {
          de: 'Stigma: setzt 5 Glyphen auf einmal. Drück es von Hand direkt vor [[13130000|Insignia Explosion]] – in der Eröffnung und immer, wenn es wieder bereit ist (60 s).',
          en: 'Stigma: puts 5 Insignias on the enemy at once. Press it by hand right before [[13130000|Insignia Explosion]] – in the opener and whenever it is ready again (60 s).',
        },
      },
    ],
    note: {
      de: 'Makro: **2 → 7 → T**, je 10 ms. Halte die Makro-Taste und die linke Maustaste zusammen gedrückt. [[13220000|Shadow Fall]] (1), [[13390000|Swift Contract]] (5), [[13310000|Illusive Clone]] (6), [[13270000|Savage Fang]] (8) und die Ansprünge (4) drückst du selbst, und hinter den Gegner laufen musst du auch selbst. [[13260000|Defiance]] liegt auf der Leertaste.',
      en: 'Macro: **2 → 7 → T**, 10 ms each. Hold the macro key and the left mouse button together. You press [[13220000|Shadow Fall]] (1), [[13390000|Swift Contract]] (5), [[13310000|Illusive Clone]] (6), [[13270000|Savage Fang]] (8) and the gap closers (4) yourself, and you have to move behind the enemy yourself too. [[13260000|Defiance]] sits on Space.',
    },
  },
  mistakes: [
    {
      de: "**Von vorn angreifen.** [[13060000|Ambush]], [[13300000|Triniel's Dagger]] und [[13740000|Rear Smite]] geben dir nur von hinten Extra-Schaden. Lass den Tank den Boss halten und stell dich in seinen Rücken.",
      en: "**Attacking from the front.** [[13060000|Ambush]], [[13300000|Triniel's Dagger]] and [[13740000|Rear Smite]] only give you extra damage from behind. Let the tank hold the boss and stand at its back.",
    },
    {
      de: '**Buffs an schwachen Gegnern verschwenden.** [[13390000|Swift Contract]] (60 s) und [[13310000|Illusive Clone]] (90 s) brauchen lange, bis sie wieder bereit sind – heb sie für Bosse auf.',
      en: '**Wasting buffs on weak mobs.** [[13390000|Swift Contract]] (60 s) and [[13310000|Illusive Clone]] (90 s) take a long time to come back – save them for bosses.',
    },
    {
      de: '**[[13340000|Storm Rampage]] ohne Taumeln drücken.** Er geht nur, wenn der Gegner taumelt. Lass ihn auf T unter dem Füller – dort kommt er von selbst im richtigen Moment.',
      en: '**Pressing [[13340000|Storm Rampage]] without a stagger.** It only works while the enemy staggers. Leave it on T below the filler – there it comes by itself at the right moment.',
    },
    {
      de: '**Glauben, dass [[13260000|Defiance]] alles löst.** Er hebt Betäubung, Umwerfen, Luftbann, Greifen, Einfrieren und Furcht auf – aber nicht Siegel oder Bann. Gegen Trägheit (Verlangsamung) und Bann hilft [[13370000|Evasion Contract]].',
      en: '**Thinking [[13260000|Defiance]] removes everything.** It removes Stun, Knockdown, Airborne, Grab, Frost and Fear – but not Seal or Root. Against Slow and Root, [[13370000|Evasion Contract]] helps.',
    },
    {
      de: '**[[13130000|Insignia Explosion]] mit wenigen Glyphen zünden.** Schaden und Betäubungschance steigen mit jeder Glyphe bis 5. Bau sie vorher mit [[13100000|Savage Roar]] und [[13270000|Savage Fang]] auf.',
      en: '**Using [[13130000|Insignia Explosion]] with few Insignias.** Damage and stun chance grow with every Insignia up to 5. Build them up first with [[13100000|Savage Roar]] and [[13270000|Savage Fang]].',
    },
  ],
  sources: [
    { href: 'https://game8.co/games/Aion-2/archives/616882', label: 'Game8 – Assassin build' },
    { href: 'https://daevaguides.com/en/assassin/', label: 'Daeva Guides – Assassin' },
    { href: 'https://aion2.run/en/classes/assassin', label: 'AION2.run – Assassin class' },
    { href: 'https://couga54.github.io/aion2-guides/en/assassin/', label: 'AION 2 Guides – Assassin' },
    { href: 'https://metabot.gg/en/aion-2/guides/class-builds-guide', label: 'Metabot – Class builds' },
    { href: 'https://www.inven.co.kr/board/aion2/6449/24247', label: 'Inven – Assassin board (KR)' },
  ],
});
