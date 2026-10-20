import { classGuide } from './classGuide';
import { assassinPlaystyles } from './playstyle-assassin';

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
  updated: '2026-10-19',
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
      de: 'Stell dich **hinter** den Boss und hebe [[13390000|Swift Contract]] und [[13310000|Illusive Clone]] für ihn auf. Jeder Treffer füllt die Benommen-Leiste des Bosses. Ist sie voll, **taumelt** er (Stagger): Dann geht [[13340000|Storm Rampage]] – mit seiner Spezialisierung ab Skillstufe 16 nimmt jeder seiner Treffer 1 s von allen deinen Abklingzeiten.',
      en: 'Stand **behind** the boss and save [[13390000|Swift Contract]] and [[13310000|Illusive Clone]] for it. Every hit fills the boss’s Stagger bar. When it is full, the boss **staggers**: now [[13340000|Storm Rampage]] works – with its specialisation from skill level 16 every one of its hits takes 1 s off all your cooldowns.',
    },
    pvp: {
      de: 'Im PvP bist du der Jäger. Mit [[13180000|Shadow Walk]] (Stigma) bist du getarnt, bis der Kampf beginnt – ab Stigma-Stufe 5 trifft dein erster Angriff aus der Tarnung sicher kritisch. Eröffne mit [[13070000|Shadowstrike]] – er betäubt 3 s –, setz sofort [[13220000|Shadow Fall]] nach (geht nur gegen betäubte Ziele und wirft sie 3 s nieder) und dann deine stärksten Skills. [[13020000|Throw Shadowblade]] bremst Gegner, die fliehen. Wichtig: [[13260000|Defiance]] löst kein Siegel und keinen Bann.',
      en: 'In PvP you are the hunter. [[13180000|Shadow Walk]] (stigma) keeps you hidden until the fight starts – from stigma level 5 your first attack out of stealth is a sure crit. Open with [[13070000|Shadowstrike]] – it stuns for 3 s –, follow up right away with [[13220000|Shadow Fall]] (only works on stunned targets and knocks them down for 3 s) and then your strongest skills. [[13020000|Throw Shadowblade]] slows enemies who run away. Important: [[13260000|Defiance]] does not remove Seal or Root.',
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
        de: 'Ein **Füller** – ein Skill ohne Abklingzeit für die Lücken. Setzt bei jedem Treffer 1 Glyphe. Danach erscheinen nacheinander zwei weitere Schläge kurz auf derselben Taste (Kettenskills), die je noch eine setzen – 3 Glyphen pro ganzer Kette.',
        en: 'A **filler** – a skill without a cooldown for the gaps. Puts 1 Insignia on the enemy with every hit. Then two more strikes briefly appear one after the other on the same key (chain skills), each adding one more – 3 Insignias per full chain.',
      },
    },
    {
      id: 13060000 /* Ambush */,
      note: {
        de: '+30 % Schaden als Rückenangriff, 10 s Abklingzeit. Mit Spezialisierung setzt er von hinten 2 Glyphen und heilt dich ein wenig.',
        en: '+30% damage as a back attack, 10 s cooldown. With specialisations it puts 2 Insignias on the enemy from behind and heals you a little.',
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
    flow: {
      items: [
        {
          title: { de: 'Buffs', en: 'Buffs' },
          text: { de: '[[13390000|Swift Contract]] (+20 % Kampftempo) und [[13310000|Illusive Clone]] (+20 % Zusatzschaden)', en: '[[13390000|Swift Contract]] (+20% Combat Speed) and [[13310000|Illusive Clone]] (+20% extra damage)' },
          tag: { de: 'Tasten 5 · 6', en: 'Keys 5 · 6' },
          tone: 'blue',
        },
        {
          title: { de: 'Hinter den Boss', en: 'Behind the boss' },
          text: { de: '[[13070000|Shadowstrike]] springt hinter den Boss und betäubt ihn', en: '[[13070000|Shadowstrike]] jumps behind the boss and stuns it' },
          tag: { de: 'Taste 4', en: 'Key 4' },
          tone: 'slate',
        },
        {
          title: { de: 'Von hinten', en: 'From behind' },
          text: { de: '[[13300000|Triniel\'s Dagger]]: +30 % von hinten, ab Stigma-Stufe 10 kürzt er deine Abklingzeiten', en: '[[13300000|Triniel\'s Dagger]]: +30% from behind, from stigma level 10 it cuts your cooldowns' },
          tag: { de: 'Taste 7', en: 'Key 7' },
          tone: 'gold',
        },
        {
          title: { de: 'Glyphen setzen', en: 'Stack Insignias' },
          text: { de: '[[13270000|Savage Fang]] setzt 5 Glyphen auf einmal', en: '[[13270000|Savage Fang]] puts 5 Insignias on the boss at once' },
          tag: { de: 'Taste 8', en: 'Key 8' },
          tone: 'violet',
        },
        {
          title: { de: 'Explosion, dann Makro', en: 'Explosion, then macro' },
          text: { de: '[[13130000|Insignia Explosion]] mit vollen Glyphen, danach Makro und linke Maustaste ([[13010000|Quick Slice]])', en: '[[13130000|Insignia Explosion]] with full Insignias, then the macro and the left mouse button ([[13010000|Quick Slice]])' },
          tag: { de: 'Taste 2', en: 'Key 2' },
          tone: 'gold',
        },
      ],
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 13390000 /* Swift Contract */, note: { de: '+20 % Kampftempo', en: '+20% Combat Speed' } },
          { id: 13310000 /* Illusive Clone */, note: { de: '+20 % Zusatzschaden', en: '+20% extra damage' } },
          { id: 13070000 /* Shadowstrike */, note: { de: 'Hinter den Boss springen, betäuben', en: 'Jump behind the boss, stun it' } },
          { id: 13300000 /* Triniel's Dagger */, note: { de: 'Von hinten +30 %; ab Stigma-Stufe 10 kürzt er deine Abklingzeiten', en: 'From behind +30%; from stigma level 10 it cuts your cooldowns' } },
          { id: 13270000 /* Savage Fang */, note: { de: '5 Glyphen auf einmal', en: '5 Insignias at once' } },
          { id: 13130000 /* Insignia Explosion */, note: { de: 'Volle Glyphen, voller Schaden', en: 'Full Insignias, full damage' } },
          { id: 13010000 /* Quick Slice */, note: { de: 'Jetzt Makro + linke Maustaste halten', en: 'Now hold macro + left mouse button' } },
        ],
      },
      {
        title: { de: 'Danach: Reihenfolge im Kampf', en: 'Then: priority in the fight' },
        steps: [
          { id: 13130000 /* Insignia Explosion */, note: { de: 'Sobald bereit – am besten bei 5 Glyphen', en: 'As soon as ready – best at 5 Insignias' } },
          { id: 13350000 /* Heart Gore */, note: { de: 'Nach jedem Krit', en: 'After every crit' } },
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
        de: '**Bleib im Rücken des Gegners.** Dreht er sich zu dir, lauf wieder hinter ihn – [[13050000|Flash Slice]] oder [[13070000|Shadowstrike]] bringen dich direkt dorthin. Jeder dieser Sprünge startet auch [[13770000|Ambush Stance]] (10 s lang Chance auf Zusatztreffer).',
        en: '**Stay behind the enemy.** If it turns to you, move behind it again – [[13050000|Flash Slice]] or [[13070000|Shadowstrike]] take you straight there. Each of these jumps also starts [[13770000|Ambush Stance]] (10 s of chances for extra hits).',
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
      { de: '**[[13130000|Insignia Explosion]]**, sobald du sie mit Stufe 14 lernst. Bring dann **[[13350000|Heart Gore]]**, **[[13130000|Insignia Explosion]]** und **[[13010000|Quick Slice]]** als Erste auf Stufe 10 – sie machen den Großteil deines Schadens.', en: '**[[13130000|Insignia Explosion]]** as soon as you learn it at level 14. Then take **[[13350000|Heart Gore]]**, **[[13130000|Insignia Explosion]]** and **[[13010000|Quick Slice]]** to level 10 first – they deal most of your damage.' },
      { de: 'Passive für Schaden, sobald du sie lernst, alle auf 10 (so haben es alle Top 10): **[[13740000|Rear Smite]]** (ab Stufe 11; auf Stufe 10 +7,5 % Schaden von hinten und +7,5 % PvE-Schaden) vor **[[13750000|Assault Stance]]** (ab 13; +15 % Krit.-Schaden) vor **[[13720000|Exploit Weakness]]** (ab 6; +190 Krit.-Treffer, also öfter [[13350000|Heart Gore]]) vor **[[13760000|Impact Hit]]** (ab 15) und **[[13800000|Determination]]** (ab 25; Zusatzschaden gegen Gegner mit 39 % LP oder weniger).', en: 'Damage passives as soon as you learn them, all to 10 (all of the top 10 do this): **[[13740000|Rear Smite]]** (from level 11; at level 10 +7.5% damage from behind and +7.5% PvE damage) before **[[13750000|Assault Stance]]** (from 13; +15% crit damage) before **[[13720000|Exploit Weakness]]** (from 6; +190 Critical Hit, so more [[13350000|Heart Gore]]) before **[[13760000|Impact Hit]]** (from 15) and **[[13800000|Determination]]** (from 25; extra damage on enemies at 39% HP or less).' },
      { de: 'Dann **[[13070000|Shadowstrike]]** (zuerst auf 8, für die Spezialisierung mit mehr Krit-Schaden), **[[13340000|Storm Rampage]]**, **[[13050000|Flash Slice]]** und **[[13360000|Infiltrate]]** nach und nach auf Stufe 10.', en: 'Then **[[13070000|Shadowstrike]]** (to 8 first, for the specialisation with more crit damage), **[[13340000|Storm Rampage]]**, **[[13050000|Flash Slice]]** and **[[13360000|Infiltrate]]** step by step to level 10.' },
      { de: 'Dann die übrigen Passiven auf 10, wie die meisten der Top 10: **[[13770000|Ambush Stance]]** (ab 17; nach jedem Skill, der dich bewegt, 10 s lang 50 % Chance auf einen Zusatztreffer), **[[13710000|Heightened Sixth Sense]]** (auf Stufe 10 +1.500 LP und +15 % max. LP, heilt dich beim Ausweichen), **[[13780000|Defense Break]]** (ab 21; Treffer auf ein betäubtes oder niedergeworfenes Ziel senken 10 s lang seine Verteidigung um 30 %) und **[[13790000|Revitalization Contract]]** (ab 23; mehr Widerstand gegen Statuseffekte, und fällst du auf 10 % LP, heilt er dich einmal pro Minute um 44 %).', en: 'Then the other passives to 10, like most of the top 10: **[[13770000|Ambush Stance]]** (from 17; after every skill that moves you, 10 s with a 50% chance for an extra hit), **[[13710000|Heightened Sixth Sense]]** (at level 10 +1,500 HP and +15% max HP, heals you when you evade), **[[13780000|Defense Break]]** (from 21; hits on a stunned or knocked-down target lower its Defense by 30% for 10 s) and **[[13790000|Revitalization Contract]]** (from 23; more Status Effect Resist, and if you drop to 10% HP it heals you for 44% once a minute).' },
      { de: 'Zuletzt – diese lassen die Top 10 niedriger, weil die Punkte nicht für alles auf 10 reichen: **[[13210000|Whirlwind Slice]]** (Median 2,5; geht nur nach dem Ausweichen), **[[13220000|Shadow Fall]]** (5,5; vor allem fürs PvP), **[[13730000|Apply Poison]]** (7) und **[[13260000|Defiance]]** (7,5).', en: 'Last – the top 10 keep these lower because the points do not stretch to everything at 10: **[[13210000|Whirlwind Slice]]** (median 2.5; only works after you evade), **[[13220000|Shadow Fall]]** (5.5; mostly for PvP), **[[13730000|Apply Poison]]** (7) and **[[13260000|Defiance]]** (7.5).' },
    ],
    levels: [
      { id: 13740000 /* Rear Smite */, level: 24.5, bought: 10, dv: 4, gear: 10, passive: true },
      { id: 13750000 /* Assault Stance */, level: 23, bought: 10, dv: 4, gear: 8.5, passive: true },
      { id: 13350000 /* Heart Gore */, level: 20.5, bought: 10, dv: 4, gear: 6.5 },
      { id: 13130000 /* Insignia Explosion */, level: 19.5, bought: 10, dv: 4, gear: 5.5 },
      { id: 13720000 /* Exploit Weakness */, level: 19, bought: 10, dv: 4, gear: 5.5, passive: true },
      { id: 13760000 /* Impact Hit */, level: 19, bought: 10, dv: 4, gear: 5, passive: true },
      { id: 13010000 /* Quick Slice */, level: 17.5, bought: 10, dv: 4, gear: 3.5 },
      { id: 13100000 /* Savage Roar */, level: 15, bought: 10, dv: 4, gear: 2 },
      { id: 13060000 /* Ambush */, level: 14, bought: 10, dv: 4, gear: 1.5 },
      { id: 13070000 /* Shadowstrike */, level: 14, bought: 10, dv: 3.5, gear: 0.5 },
    ],
    specs: [
      {
        id: 13010000 /* Quick Slice */,
        parts: [13010030 /* Quick Slice: +50% Multi-Hit on hit */, 13010040 /* Quick Slice: -1s [Insignia Explosion] cooldown on hit */, 13010050 /* Quick Slice: Ignores Block and Evasion and lands as a Critical Hit */],
        note: {
          de: 'Zuerst mehr Mehrfachtreffer. Ab Stufe 12 macht jeder Treffer [[13130000|Insignia Explosion]] 1 s früher bereit. Mit der Stufe-16-Option trifft die Grundattacke immer kritisch und löst so [[13350000|Heart Gore]] aus – Guides nehmen sie, sobald der Skill Stufe 16 hat; bis der dritte Platz mit Stufe 20 frei wird, ersetzt sie die Mehrfachtreffer.',
          en: 'First more Multi-Hit. From level 12 every hit makes [[13130000|Insignia Explosion]] ready 1 s sooner. With the level 16 option the basic attack always lands a crit and so triggers [[13350000|Heart Gore]] – guides take it as soon as the skill reaches level 16; until the third slot opens at level 20 it replaces the Multi-Hit.',
        },
      },
      {
        id: 13350000 /* Heart Gore */,
        parts: [13350010 /* Heart Gore: Absorbs 0.7% HP */, 13350040 /* Heart Gore: Multi-Hit on hit */, 13350050 /* Heart Gore: Resets [Heart Gore] cooldown on landing a Critical Hit */],
        note: {
          de: 'Zuerst „Absorbiert 0,7 % LP“: Heart Gore trifft so oft, dass er dich ständig ein wenig heilt – das nehmen die meisten Guides (wer mehr Glyphen für [[13130000|Insignia Explosion]] will, nimmt stattdessen „1 Glyphe binden“). Ab Stufe 12 sichere Mehrfachtreffer. Die Stufe-16-Option macht den Skill nach jedem Krit sofort wieder bereit – das Ziel des ganzen Builds: Nimm sie, sobald der Skill Stufe 16 hat (bis Stufe 20 anstelle einer der beiden anderen).',
          en: 'First “Absorbs 0.7% HP”: Heart Gore hits so often that it keeps healing you a little – most guides take it (for more Insignias for [[13130000|Insignia Explosion]] take “Engraves 1 Insignia” instead). From level 12 sure Multi-Hits. The level 16 option makes the skill ready again after every crit – the goal of the whole build: take it as soon as the skill reaches level 16 (until level 20 in place of one of the other two).',
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
        parts: [13060010 /* Ambush: Engraves 2 Insignias for 10s on landing as a Back attack */, 13060020 /* Ambush: Absorbs 3% HP */],
        note: {
          de: 'Von hinten setzt er 2 Glyphen. Der zweite Platz heilt dich bei jedem Treffer („Absorbiert 3 % LP“). Die Stufe-16-Option (+2 Einsätze hintereinander) ist umstritten: Manche Guides nehmen sie, andere sagen, die längere Animation kostet Schaden – teste sie an der Trainingspuppe.',
          en: 'From behind it puts 2 Insignias on the enemy. The second slot heals you on every hit (“Absorbs 3% HP”). The level 16 option (+2 uses in a row) is disputed: some guides take it, others say the longer animation costs damage – test it on the training dummy.',
        },
      },
      {
        id: 13070000 /* Shadowstrike */,
        parts: [13070020 /* Shadowstrike: +20% caster Critical Damage Boost for 5s on hit */],
        note: {
          de: 'Guides nehmen +20 % Krit-Schaden für 5 s nach dem Ansprung – genau dann kommt dein Burst. Dafür braucht der Skill Stufe 8. Fürs PvP kommt in den zweiten Platz oft die 50-%-Chance auf Siegel oder Bann (5 s).',
          en: 'Guides take +20% crit damage for 5 s after the jump – exactly when your burst comes. The skill needs level 8 for this. For PvP the second slot often takes the 50% chance to Seal or Root (5 s).',
        },
      },
      {
        id: 13340000 /* Storm Rampage */,
        parts: [13340050 /* Storm Rampage: -1s all skill cooldowns on hit */, 13340040 /* Storm Rampage: Multi-Hit on hit */, 13340010 /* Storm Rampage: Absorbs 5% HP */],
        note: {
          de: 'Der Grund, ihn zu steigern, ist die Stufe-16-Option: Jeder Treffer auf den taumelnden Boss nimmt 1 s von allen deinen Abklingzeiten – deine Buffs kommen früher wieder. Dazu Mehrfachtreffer (ab Stufe 12); der dritte Platz (ab 20) kann 5 % LP absorbieren.',
          en: 'The reason to level it is the level 16 option: every hit on the staggered boss takes 1 s off all your cooldowns – your buffs come back sooner. Plus Multi-Hit (from level 12); the third slot (from 20) can take the 5% HP absorb.',
        },
      },
      {
        id: 13050000 /* Flash Slice */,
        parts: [13050020 /* Flash Slice: +6m Range */, 13050040 /* Flash Slice: +1 consecutive use */],
        note: {
          de: '+6 m Reichweite – so kommst du aus 10 m auf die andere Seite des Ziels. Ab Stufe 12 kannst du ihn zweimal hintereinander einsetzen.',
          en: '+6 m range – so you get to the other side of the target from 10 m. From level 12 you can use it twice in a row.',
        },
      },
      {
        id: 13360000 /* Infiltrate */,
        parts: [13360010 /* Infiltrate: Restores 300 Stamina on landing [Infiltrate] */, 13360020 /* Infiltrate: +10m [Infiltrate] range */],
        note: {
          de: '300 Ausdauer zurück für das nächste Notausweichen und +10 m Reichweite (dann 20 m). Vom Kettenskill „Finsterschlag“ ab Stufe 12 raten die Guides ab.',
          en: '300 Stamina back for the next Dodge and +10 m range (20 m then). Guides advise against the Dark Strike chain skill at level 12.',
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          { id: 13310000 /* Illusive Clone */, note: { de: 'Dein großer Burst: [[13350000|Heart Gore]] ohne Abklingzeit plus 20 % Zusatzschaden. Ab Stigma-Stufe 10 dazu +20 % Krit.-Schaden.', en: 'Your big burst: [[13350000|Heart Gore]] without a cooldown plus 20% extra damage. From stigma level 10 also +20% crit damage.' } },
          { id: 13390000 /* Swift Contract */, note: { de: '+20 % Kampftempo. Ab Stigma-Stufe 10 wirkt dabei auch [[13740000|Rear Smite]] 1,5-mal so stark, ab 15 auch [[13750000|Assault Stance]].', en: '+20% Combat Speed. From stigma level 10 it also makes [[13740000|Rear Smite]] 1.5 times as strong, from 15 [[13750000|Assault Stance]] too.' } },
          { id: 13300000 /* Triniel's Dagger */, note: { de: 'Starker Treffer, von hinten +30 % Schaden. Ab Stigma-Stufe 10 verkürzt jeder Treffer deine Abklingzeiten um 10 % – drück ihn nach den Buffs.', en: 'Strong hit, +30% damage from behind. From stigma level 10 every hit also cuts your cooldowns by 10% – press it after the buffs.' } },
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
        de: 'Skillstufen-Knoten geben deinen Skills Extra-Stufen. Jede Stufe zählt auch für die Plätze der Spezialisierungen. Nimm zuerst die Knoten von [[13350000|Heart Gore]], [[13130000|Insignia Explosion]] und [[13010000|Quick Slice]].',
        en: 'Skill level nodes give your skills extra levels. Every level also counts for the specialisation slots. Take the nodes of [[13350000|Heart Gore]], [[13130000|Insignia Explosion]] and [[13010000|Quick Slice]] first.',
      },
      {
        de: '**Azphel** (Stufe 45) ist die PvP-Tafel. Du bezahlst sie mit **Kampfkristallen** aus dem PvP, nicht mit Daevanion-Kristallen. Ihre Werte zählen nur gegen Spieler.',
        en: '**Azphel** (level 45) is the PvP board. You pay for it with **Battle Crystals** from PvP, not with Daevanion Crystals. Its stats only count against players.',
      },
    ],
    stats: {
      de: 'Diese Werte zählen für dich, das wichtigste zuerst: **Krit.-Treffer** > **Krit.-Schadensverstärkung** > **Angriffskraft** > **Schadensverstärkung** > **Kampftempo** > **Mehrfachtreffer** > **Abklingzeitverringerung**. Krit steht vorn, weil [[13350000|Heart Gore]] nur nach Krits kommt. Dazu so viel **Präzision**, dass deine Treffer sitzen – ein verfehlter Schlag ist auch kein Krit.',
      en: 'These stats matter for you, most important first: **Critical Hit** > **Critical Damage Boost** > **Attack** > **Damage Boost** > **Combat Speed** > **Multi-Hit Chance** > **Cooldown Reduction**. Crit comes first because [[13350000|Heart Gore]] only comes after crits. Plus enough **Accuracy** that your hits land – a missed hit is no crit either.',
    },
  },
  macro: {
    keys: [
      {
        key: '2',
        ids: [13130000 /* Insignia Explosion */, 13350000 /* Heart Gore */, 13060000 /* Ambush */],
        macro: true,
        note: {
          de: '[[13130000|Insignia Explosion]] liegt unten: Sie kommt, sobald sie bereit ist. Sonst [[13350000|Heart Gore]] nach jedem Krit, dann [[13060000|Ambush]]. So machen es alle Guides und die meisten öffentlichen Makros: Läge [[13350000|Heart Gore]] unten, nähme die Taste während [[13310000|Illusive Clone]] (dann ohne Abklingzeit) fast nur noch ihn und kaum je [[13130000|Insignia Explosion]].',
          en: '[[13130000|Insignia Explosion]] sits at the bottom: it comes as soon as it is ready. Otherwise [[13350000|Heart Gore]] after every crit, then [[13060000|Ambush]]. All guides and most public macros do it this way: with [[13350000|Heart Gore]] at the bottom, the key would use almost only it during [[13310000|Illusive Clone]] (no cooldown then) and hardly ever [[13130000|Insignia Explosion]].',
        },
      },
      {
        key: '7',
        ids: [13300000 /* Triniel's Dagger */],
        macro: true,
        note: { de: 'Stigma: starker Treffer, von hinten +30 %. Ab Stigma-Stufe 10 verkürzt er deine Abklingzeiten um 10 %.', en: 'Stigma: strong hit, +30% from behind. From stigma level 10 it cuts your cooldowns by 10%.' },
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
          de: 'Von Hand, nicht im Makro – beide gehen nur unter einer Bedingung. [[13220000|Shadow Fall]] bringt dich zu einem **betäubten** Ziel (bis 10 m), z. B. direkt nach den 3 s Betäubung von [[13070000|Shadowstrike]]. Gegen Bosse, die man nicht betäuben kann, leuchtet er manchmal von selbst auf (5 % pro Treffer). [[13210000|Whirlwind Slice]] darüber geht nur direkt, nachdem du einem Angriff ausgewichen bist, und betäubt dann normale Gegner sicher – beim nächsten Druck kommt [[13220000|Shadow Fall]].',
          en: 'By hand, not in the macro – both only work under a condition. [[13220000|Shadow Fall]] takes you to a **stunned** target (up to 10 m), e.g. right after the 3 s stun of [[13070000|Shadowstrike]]. Against bosses that cannot be stunned it sometimes lights up by itself (5% per hit). [[13210000|Whirlwind Slice]] above it only works right after you evade an attack, and then it surely stuns normal enemies – on the next press [[13220000|Shadow Fall]] comes.',
        },
      },
      {
        key: '5',
        ids: [13390000 /* Swift Contract */],
        note: { de: 'Buff – von Hand in der Eröffnung, nicht an schwachen Gegnern verschwenden.', en: 'Buff – by hand in the opener, do not waste it on weak mobs.' },
      },
      {
        key: '4',
        ids: [13360000 /* Infiltrate */, 13070000 /* Shadowstrike */, 13050000 /* Flash Slice */],
        note: {
          de: 'Ansprünge, von Hand. Unten [[13360000|Infiltrate]]: Er geht nur direkt nach einem Notausweichen (oder im Flug) und bringt dich hinter das Ziel (10 m) – so bleibt [[13070000|Shadowstrike]] frei. Sonst [[13070000|Shadowstrike]] (20 m, landet hinter dem Ziel und betäubt), und läuft seine Abklingzeit, [[13050000|Flash Slice]] (auf die andere Seite des Ziels). Jeder davon startet auch [[13770000|Ambush Stance]].',
          en: 'Gap closers, by hand. At the bottom [[13360000|Infiltrate]]: it only works right after a Dodge (or while flying) and takes you behind the target (10 m) – so [[13070000|Shadowstrike]] stays ready. Otherwise [[13070000|Shadowstrike]] (20 m, lands behind the target and stuns), and while it is on cooldown [[13050000|Flash Slice]] (to the other side of the target). Each of them also starts [[13770000|Ambush Stance]].',
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
      de: "**Von vorn angreifen.** [[13060000|Ambush]] und [[13300000|Triniel's Dagger]] machen nur von hinten 30 % mehr Schaden, und auch der Rückenangriffs-Bonus von [[13740000|Rear Smite]] zählt nur dort. Lass den Tank den Boss halten und stell dich in seinen Rücken.",
      en: "**Attacking from the front.** [[13060000|Ambush]] and [[13300000|Triniel's Dagger]] deal their 30% extra only from behind, and the back-attack bonus of [[13740000|Rear Smite]] only counts there too. Let the tank hold the boss and stand at its back.",
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
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Assassinen haben im Median **228K** Kampfkraft bei Gegenstandsstufe **3.355** (Spanne 220–254K) – Platz 4 der acht Klassen, ≈70 Kampfkraft pro Gegenstandsstufe. Die Ausrüstung ist fast fertig; der Unterschied liegt bei den Arcana und der fünften Daevanion-Tafel.",
      en: "The top 10 Assassins have a median **228K** Combat Power at item level **3,355** (range 220–254K) – 4th of the eight classes, ≈70 Combat Power per item level. The gear is nearly done; the difference lies in the Arcana and the fifth Daevanion board.",
    },
    stats: { cp: 228454.5, cpMin: 220400, cpMax: 254328, itemLevel: 3354.5, cpPerLevel: 69.56, weekly: 46892, weeklyOf: 10, rank: { cp: 4, itemLevel: 4, cpPerLevel: 4, weekly: 7 } },
    gear: [
      {
        de: "**Waffe und Guard:** Splendent Ebony / Wise Dragon Lord Dagger und Guard – alle zehn auf +15 mit Amplified +5.",
        en: "**Weapon and guard:** Splendent Ebony / Wise Dragon Lord Dagger and Guard – all ten at +15 with Amplified +5.",
      },
      {
        de: "**Rüstung:** 63 von 70 Teilen Splendent (Gegenstandsstufe 102), 8 der 10 tragen das ganze Set; 52 Teile auf Amplified +5.",
        en: "**Armour:** 63 of 70 pieces Splendent (item level 102), 8 of the 10 wear the full set; 52 pieces at Amplified +5.",
      },
      {
        de: "**Schmuck:** alle 50 Teile Splendent auf +15 mit Amplified +5.",
        en: "**Jewellery:** all 50 pieces Splendent at +15 with Amplified +5.",
      },
      {
        de: "**Armreifen und Rest:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80), meist +15, plus Liberator oder Pilgrim Bracelet +10; Revelation Amulet +10 und Noble Belt +10 (je 7 von 10). Flügel: Talisra (6) oder Dark Veil (4).",
        en: "**Bracelets and the rest:** exactly one Ascension Bracelet (none of the top 80 wears more), mostly +15, plus a Liberator or Pilgrim Bracelet +10; Revelation Amulet +10 and Noble Belt +10 (7 of 10 each). Wings: Talisra (6) or Dark Veil (4).",
      },
    ],
    arcana: {
      de: "Anders als die meisten Klassen nehmen Assassinen den **Mirror of Vigor** (9 von 10) und dafür den **Compass of Magic** (7). Dazu **Chalice und Parchment of Vigor** (9 und 7) und **Bell of Magic** (8). Nur 36 von 50 Karten sind auf +5.",
      en: "Unlike most classes, Assassins take the **Mirror of Vigor** (9 of 10) and the **Compass of Magic** instead (7). Plus **Chalice and Parchment of Vigor** (9 and 7) and **Bell of Magic** (8). Only 36 of 50 cards are at +5.",
    },
    stigmas: [
      { id: 13310000, note: { de: '10 von 10 · Median Stufe 20', en: '10 of 10 · median level 20' } },
      { id: 13390000, note: { de: '9 von 10 · Median Stufe 20', en: '9 of 10 · median level 20' } },
      { id: 13300000, note: { de: '7 von 10 · Median Stufe 17', en: '7 of 10 · median level 17' } },
      { id: 13270000, note: { de: '7 von 10 · Median Stufe 15', en: '7 of 10 · median level 15' } },
    ],
    slotted: [
      { id: 13310000 /* Illusive Clone */, n: 10, level: 20 },
      { id: 13390000 /* Swift Contract */, n: 9, level: 20 },
      { id: 13300000 /* Triniel's Dagger */, n: 7, level: 17 },
      { id: 13270000 /* Savage Fang */, n: 7, level: 15 },
      { id: 13020000 /* Throw Shadowblade */, n: 2, level: 18.5 },
      { id: 13180000 /* Shadow Walk */, n: 2, level: 17.5 },
      { id: 13080000 /* Evasion Stance */, n: 2, level: 10 },
      { id: 13230000 /* Aerial Bind */, n: 1, level: 19 },
    ],
    tips: [
      {
        de: "**Arcana auf +5:** 14 von 50 Karten der Top 10 sind noch darunter – und Arcana-Verzauberung kann nicht scheitern.",
        en: "**Arcana to +5:** 14 of 50 cards of the top 10 are still below – and Arcana enhancement can’t fail.",
      },
      {
        de: "**Fünfte Daevanion-Tafel:** Assassinen haben dort im Median nur 22 von 152 Knoten offen, die wenigsten aller Klassen (die anderen 26–37). Jeder Knoten zählt zur Gegenstandsstufe.",
        en: "**Fifth Daevanion board:** Assassins have a median of only 22 of 152 nodes open there, the fewest of all classes (the others 26–37). Every node counts towards item level.",
      },
      {
        de: "**Daevanion:** Im Median sind 66, 61 und 60 von 88 Knoten auf den ersten drei Tafeln offen, 71 von 116 auf der vierten und 22 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 66, 61 and 60 of 88 nodes are open on the first three boards, 71 of 116 on the fourth and 22 of 152 on the fifth.",
      },
    ],
  },
  playstyles: assassinPlaystyles,
  sources: [
    { href: 'https://daevaguides.com/en/assassin/', label: 'Daeva Guides – Assassin' },
    { href: 'https://aion2.run/en/classes/assassin', label: 'AION2.run – Assassin class' },
    { href: 'https://couga54.github.io/aion2-guides/en/assassin/', label: 'AION 2 Guides – Assassin' },
    { href: 'https://aion2-guides.info/en/assassin/', label: 'AION 2 Guides (new address) – Assassin' },
    { href: 'https://metabot.gg/en/aion-2/guides/class-builds-guide', label: 'Metabot – Class builds' },
    { href: 'https://www.inven.co.kr/board/aion2/6449/24247', label: 'Inven – Assassin board (KR)' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-06-17', label: 'AION2Hub – Korean patch notes, 17 June 2026' },
  ],
  caveat: {
    de: "Builds ändern sich mit Patches. Dieser Guide folgt den Skilldaten des globalen Clients und dem, was die Top 10 spielen; wo Guides sich widersprechen, steht es dabei. Umstritten sind vor allem die Stufe-16-Option von [[13060000|Ambush]] und ob [[13300000|Triniel's Dagger]] vor oder nach [[13270000|Savage Fang]] kommt. Bei [[13780000|Defense Break]] nennt der englische Skilltext noch das Taumeln als Auslöser, der deutsche Text und der koreanische Patch vom 17. Juni 2026 nicht mehr – schau am taumelnden Boss, ob die Verteidigungssenkung erscheint. Im Zweifel gilt, was im Spiel bei dir funktioniert.",
    en: "Builds change with patches. This guide follows the skill data of the global client and what the top 10 run; where guides disagree, it says so. Disputed above all: the level 16 option of [[13060000|Ambush]] and whether [[13300000|Triniel's Dagger]] goes before or after [[13270000|Savage Fang]]. For [[13780000|Defense Break]] the English skill text still names Stagger as a trigger, the German text and the Korean patch of 17 June 2026 no longer do – watch on a staggered boss whether the Defense debuff appears. When in doubt, what works for you in game wins.",
  },
});
