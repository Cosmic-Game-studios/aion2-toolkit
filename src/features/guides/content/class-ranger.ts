import { classGuide } from './classGuide';

/** Beginner guide for the Ranger: ranged crit damage from 20 m. Hotbar and macro are set up for bosses. */
export const rangerGuide = classGuide({
  id: 'ranger',
  cls: 'Ranger',
  tone: 'green',
  title: { de: 'Waldläufer-Guide', en: 'Ranger guide' },
  summary: {
    de: 'Der Waldläufer schießt aus 20 m Entfernung und lebt von kritischen Treffern. Hier lernst du Skills, Rotation, Build und Makro Schritt für Schritt.',
    en: 'The Ranger shoots from 20 m away and lives on critical hits. Here you learn skills, rotation, build and macro step by step.',
  },
  tags: [
    { de: 'Fernkampf-DPS', en: 'Ranged DPS' },
    { de: 'Krit', en: 'Crit' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-15',
  glance: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: '**Fernkampf-Schaden** mit vielen kritischen Treffern (Krits)', en: '**Ranged damage** with lots of critical hits (crits)' } },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: '**Mittel** – die Grundidee ist einfach, aber [[14090000|Marking Shot]] und der aufgeladene [[14010000|Deadshot]] brauchen gutes Timing', en: '**Medium** – the basic idea is simple, but [[14090000|Marking Shot]] and the charged [[14010000|Deadshot]] need good timing' } },
    { label: { de: 'Reichweite', en: 'Range' }, value: { de: '20 m – fast alle deine Skills', en: '20 m – almost all of your skills' } },
    { label: { de: 'Stärken', en: 'Strengths' }, value: { de: 'Sicherer Abstand, hohe Krits dank **Letalität** (Buff von [[14090000|Marking Shot]]), viele Skills treffen bis zu 4 Gegner', en: 'Safe distance, big crits thanks to **Precision** (the buff from [[14090000|Marking Shot]]), many skills hit up to 4 enemies' } },
    { label: { de: 'Schwächen', en: 'Weaknesses' }, value: { de: 'Dein stärkster Schuss muss aufgeladen werden, der Füller kostet viel MP, mit zu wenig Präzision gehen Schüsse daneben', en: 'Your strongest shot has to be charged, the filler costs a lot of MP, with too little Accuracy shots miss' } },
  ],
  forWhom: {
    de: 'Du kämpfst gern aus sicherem Abstand, planst deinen großen Schuss und freust dich über hohe kritische Treffer. Es stört dich nicht, einen Buff (eine Stärkung auf Zeit) immer im Blick zu behalten.',
    en: 'You like to fight from a safe distance, plan your big shot and enjoy big critical hits. You do not mind keeping an eye on one buff (a temporary boost) all the time.',
  },
  party: {
    dungeon: [
      {
        de: '**Deine Aufgabe ist Schaden aus der Ferne.** Fast alle deine Skills reichen 20 m weit – bleib auf Abstand zum Boss und schieß von dort.',
        en: '**Your job is damage from range.** Almost all of your skills reach 20 m – keep your distance from the boss and shoot from there.',
      },
      {
        de: '**Bei Gegnergruppen** treffen [[14110000|Gale Arrow]], [[14050000|Drill Dart]] und [[14340000|Tempest Shot]] bis zu 4 Gegner. [[14170000|Explosion Trap]] legst du dir vor die Füße, wenn die Gruppe zu dir kommt.',
        en: '**Against packs**, [[14110000|Gale Arrow]], [[14050000|Drill Dart]] and [[14340000|Tempest Shot]] hit up to 4 enemies. Place [[14170000|Explosion Trap]] at your feet when the pack comes to you.',
      },
      {
        de: '**Verlangsamen lohnt sich:** [[14130000|Snare Shot]] bremst Gegner (Trägheit), und erst dann geht [[14080000|Burst Arrow]].',
        en: '**Slowing pays off:** [[14130000|Snare Shot]] slows enemies, and only then does [[14080000|Burst Arrow]] work.',
      },
      {
        de: '**Achte auf deine MP.** [[14340000|Tempest Shot]] kostet viel MP, deine Grundattacke [[14020000|Snipe]] bringt MP zurück.',
        en: '**Watch your MP.** [[14340000|Tempest Shot]] costs a lot of MP, your basic attack [[14020000|Snipe]] brings MP back.',
      },
    ],
    boss: {
      de: 'Am Boss zählt **Letalität**: [[14090000|Marking Shot]] gibt dir +300 Krit.-Treffer, und [[14010000|Deadshot]] macht damit 35 % mehr Schaden. Jeder Treffer füllt die Benommen-Leiste des Bosses. Ist sie voll, **taumelt** er (Stagger) – dann geht [[14330000|Arrow Scattershot]]. Ein voll aufgeladener [[14010000|Deadshot]] füllt die Leiste stärker.',
      en: 'At the boss, **Precision** is what counts: [[14090000|Marking Shot]] gives you +300 Critical Hit, and with it [[14010000|Deadshot]] deals 35% more damage. Every hit fills the boss’s Stagger bar. When it is full, the boss **staggers** – now [[14330000|Arrow Scattershot]] works. A fully charged [[14010000|Deadshot]] fills the bar more.',
    },
    pvp: {
      de: "Im PvP hältst du Abstand: [[14130000|Snare Shot]] verlangsamt, [[14050000|Drill Dart]] senkt die Heilung, die der Gegner bekommt, um 60 %, und mit der passenden Spezialisierung schießt du [[14010000|Deadshot]] auch im Laufen. Wirst du betäubt (du kannst dann kurz nichts tun), befreit dich [[14260000|Defiance]] auf der Leertaste. [[14350000|Mother Nature's Breath]] (Stigma) senkt den Schaden, den du nimmst.",
      en: "In PvP you keep your distance: [[14130000|Snare Shot]] slows, [[14050000|Drill Dart]] cuts the healing the enemy receives by 60%, and with the right specialisation you can shoot [[14010000|Deadshot]] while moving. If you are stunned (you cannot act for a moment), [[14260000|Defiance]] on Space frees you. [[14350000|Mother Nature's Breath]] (stigma) lowers the damage you take.",
    },
    solo: {
      de: 'Allein hilft dir der Abstand: Verlangsame Gegner mit [[14130000|Snare Shot]] und schieß, während sie zu dir laufen. Kommen dir Gegner oft zu nah, tausch das Stigma [[14380000|Supporting Fire]] (Taste 7) gegen [[14120000|Ambush Kick]]: Der Skill stößt einen nahen Gegner zurück und bringt dich auf Abstand.',
      en: 'Solo, distance is your friend: slow enemies with [[14130000|Snare Shot]] and shoot while they walk towards you. If enemies often get too close, swap the stigma [[14380000|Supporting Fire]] (key 7) for [[14120000|Ambush Kick]]: it knocks a close enemy back and puts distance between you.',
    },
  },
  skills: [
    {
      id: 14090000 /* Marking Shot */,
      note: {
        de: 'Gibt dir 10 s **Letalität**: +300 Krit.-Treffer. Dabei springst du in die Richtung, die du gerade drückst. Die **Abklingzeit** (Wartezeit, bis ein Skill wieder bereit ist) beträgt 10 s – halte Letalität immer aktiv. Ab Stufe 3.',
        en: 'Gives you **Precision** for 10 s: +300 Critical Hit. You also jump in the direction you are pressing. The **cooldown** (the wait until a skill is ready again) is 10 s – keep Precision up all the time. From level 3.',
      },
    },
    {
      id: 14010000 /* Deadshot */,
      note: {
        de: 'Dein stärkster Schuss (ab Stufe 14). **Aufladen** heißt: Taste gedrückt halten (bis zu 3 Stufen), dann loslassen, um zu schießen. Mit Letalität macht er 35 % mehr Schaden.',
        en: 'Your strongest shot (from level 14). **Charging** means: hold the key (up to 3 levels), then let go to shoot. With Precision it deals 35% more damage.',
      },
    },
    {
      id: 14110000 /* Gale Arrow */,
      note: {
        de: 'Trifft bis zu 4 Gegner und gibt dir 10 s **Wirbelwind**: +7 % Kampftempo und +7 % Schaden im PvE. Ab Stufe 7.',
        en: 'Hits up to 4 enemies and gives you **Gale** for 10 s: +7% Combat Speed and +7% PvE damage. From level 7.',
      },
    },
    {
      id: 14020000 /* Snipe */,
      note: {
        de: 'Deine Grundattacke (linke Maustaste): bringt MP zurück. Mit Spezialisierung macht jeder Treffer [[14010000|Deadshot]] 1 s früher bereit.',
        en: 'Your basic attack (left mouse button): restores MP. With a specialisation every hit makes [[14010000|Deadshot]] ready 1 s sooner.',
      },
    },
    {
      id: 14130000 /* Snare Shot */,
      note: {
        de: 'Trifft bis zu 4 Gegner und **verlangsamt** sie (Trägheit). Danach geht [[14080000|Burst Arrow]] – er braucht ein verlangsamtes oder festgehaltenes Ziel.',
        en: 'Hits up to 4 enemies and **slows** them. After that [[14080000|Burst Arrow]] works – it needs a slowed or rooted target.',
      },
    },
    {
      id: 14050000 /* Drill Dart */,
      note: {
        de: 'Nur 5 s Abklingzeit, trifft bis zu 4 Gegner und verursacht **Blutung** (Schaden über Zeit). Senkt die Heilung, die das Ziel bekommt, um 60 %.',
        en: 'Only a 5 s cooldown, hits up to 4 enemies and causes **Bleed** (damage over time). Cuts the healing the target receives by 60%.',
      },
    },
    {
      id: 14340000 /* Tempest Shot */,
      note: {
        de: 'Ein **Füller** – ein Skill ohne Abklingzeit für die Lücken. Trifft bis zu 4 Gegner, kostet aber viel MP.',
        en: 'A **filler** – a skill without a cooldown for the gaps. Hits up to 4 enemies but costs a lot of MP.',
      },
    },
    {
      id: 14310000 /* Vaizel's Authority */,
      note: {
        de: 'Stigma (ab Stufe 22): Buff mit +20 % Angriffskraft. Drück ihn in der Eröffnung und in Burst-Phasen (Momente, in denen du alles auf einmal einsetzt).',
        en: 'Stigma (from level 22): a buff with +20% Attack. Press it in the opener and in burst phases (moments when you use everything at once).',
      },
    },
  ],
  rotation: {
    intro: {
      de: 'Vor Stufe 14 fehlt dir [[14010000|Deadshot]], vor Stufe 22 hast du keine Stigmen – lass diese Schritte einfach weg.',
      en: 'Before level 14 you do not have [[14010000|Deadshot]], before level 22 you have no stigmas – simply skip those steps.',
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 14090000 /* Marking Shot */, note: { de: 'Letalität: +300 Krit.-Treffer', en: 'Precision: +300 Critical Hit' } },
          { id: 14110000 /* Gale Arrow */, note: { de: 'Wirbelwind: mehr Tempo und Schaden', en: 'Gale: more speed and damage' } },
          { id: 14310000 /* Vaizel's Authority */, note: { de: '+20 % Angriffskraft', en: '+20% Attack' } },
          { id: 14220000 /* Bow of Blessing */, note: { de: '+200 Krit.-Treffer, +100 Präzision', en: '+200 Critical Hit, +100 Accuracy' } },
          { id: 14380000 /* Supporting Fire */, note: { de: 'Kugel schießt 15 s mit', en: 'Orb shoots along for 15 s' } },
          { id: 14010000 /* Deadshot */, note: { de: 'Voll aufladen, dann Makro + linke Maustaste halten', en: 'Charge fully, then hold macro + left mouse button' } },
        ],
      },
      {
        title: { de: 'Danach: Reihenfolge im Kampf', en: 'Then: priority in the fight' },
        steps: [
          { id: 14090000 /* Marking Shot */, note: { de: 'Jedes Mal, wenn bereit', en: 'Every time it is ready' } },
          { id: 14010000 /* Deadshot */, note: { de: 'Wenn bereit – nur mit Letalität', en: 'When ready – only with Precision' } },
          { id: 14110000 /* Gale Arrow */, note: { de: 'Wirbelwind aktiv halten', en: 'Keep Gale up' } },
          { id: 14130000 /* Snare Shot */, note: { de: 'Ziel verlangsamen', en: 'Slow the target' } },
          { id: 14080000 /* Burst Arrow */, note: { de: 'Auf das verlangsamte Ziel', en: 'On the slowed target' } },
          { id: 14050000 /* Drill Dart */, note: { de: 'Blutung, alle 5 s', en: 'Bleed, every 5 s' } },
          { id: 14330000 /* Arrow Scattershot */, note: { de: 'Nur wenn der Gegner taumelt', en: 'Only while the enemy staggers' } },
          { id: 14340000 /* Tempest Shot */, note: { de: 'Füller, kostet viel MP', en: 'Filler, costs a lot of MP' } },
        ],
      },
    ],
    tips: [
      {
        de: '**Länger aufladen lohnt sich:** [[14010000|Deadshot]] hat 3 Ladestufen. Jede Stufe macht mehr Schaden und füllt die Benommen-Leiste stärker.',
        en: '**Charging longer pays off:** [[14010000|Deadshot]] has 3 charge levels. Each level deals more damage and fills the Stagger bar more.',
      },
      {
        de: '**Halte die Grundattacke wirklich die ganze Zeit.** Mit der Spezialisierung von [[14020000|Snipe]] wird [[14010000|Deadshot]] mit jedem Treffer 1 s früher bereit.',
        en: '**Really hold the basic attack all the time.** With the [[14020000|Snipe]] specialisation every hit makes [[14010000|Deadshot]] ready 1 s sooner.',
      },
      {
        de: '**Letalität ohne Lücke:** Laut Skilltext hält Letalität 10 s – genauso lange wie die Abklingzeit von [[14090000|Marking Shot]]. Mit der Spezialisierung „+5 s Wirkungsdauer“ hält sie länger, so bleibt sie immer aktiv.',
        en: '**Precision without gaps:** the skill text says Precision lasts 10 s – exactly as long as the cooldown of [[14090000|Marking Shot]]. With the “+5 s duration” specialisation it lasts longer, so it is always up.',
      },
      {
        de: '**Bei Gruppen:** Leg [[14170000|Explosion Trap]] an deine Füße, wenn die Gegner zu dir kommen, und nutze die Skills, die bis zu 4 Gegner treffen.',
        en: '**Against packs:** place [[14170000|Explosion Trap]] at your feet when the enemies come to you, and use the skills that hit up to 4 enemies.',
      },
    ],
  },
  build: {
    intro: {
      de: 'Im globalen Spiel ist die Höchststufe 45, und du hast **4 Stigma-Plätze** (ab Stufe 22, 27, 32 und 37). Koreanische Builds haben mehr Plätze – übernimm sie nicht eins zu eins. **Spezialisierungen:** Ein Skill bekommt ab Skillstufe 8 den ersten Platz, ab 12 den zweiten und ab 20 den dritten.',
      en: 'In the global game the level cap is 45, and you have **4 stigma slots** (from level 22, 27, 32 and 37). Korean builds have more slots – do not copy them one to one. **Specialisations:** a skill gets its first slot at skill level 8, the second at 12 and the third at 20.',
    },
    points: [
      { de: '**[[14090000|Marking Shot]]** (ab Stufe 3) und **[[14050000|Drill Dart]]** (ab Stufe 4) zuerst – Letalität bringt dir mehr Krits mit allen Skills.', en: '**[[14090000|Marking Shot]]** (from level 3) and **[[14050000|Drill Dart]]** (from level 4) first – Precision gives you more crits with every skill.' },
      { de: '**[[14110000|Gale Arrow]]** (ab Stufe 7) und **[[14340000|Tempest Shot]]**: dein Angriff mit Wirbelwind-Buff und dein Füller.', en: '**[[14110000|Gale Arrow]]** (from level 7) and **[[14340000|Tempest Shot]]**: your attack with the Gale buff and your filler.' },
      { de: '**[[14010000|Deadshot]]**, sobald du ihn mit Stufe 14 lernst – er wird dein stärkster Schuss.', en: '**[[14010000|Deadshot]]** as soon as you learn it at level 14 – it becomes your strongest shot.' },
      { de: 'Dann **[[14330000|Arrow Scattershot]]**, **[[14070000|Suppressing Arrow]]** und **[[14170000|Explosion Trap]]**. **[[14020000|Snipe]]** und **[[14130000|Snare Shot]]** mindestens auf Stufe 8 – dort bekommt deine Grundattacke [[14020000|Snipe]] ihre erste Spezialisierung.', en: 'Then **[[14330000|Arrow Scattershot]]**, **[[14070000|Suppressing Arrow]]** and **[[14170000|Explosion Trap]]**. **[[14020000|Snipe]]** and **[[14130000|Snare Shot]]** to at least level 8 – that is where your basic attack [[14020000|Snipe]] gets its first specialisation.' },
      { de: "Passive: **[[14740000|Focused Eye]]** vor **[[14750000|Hunter's Resolve]]** vor **[[14800000|Hunter's Soul]]**.", en: "Passives: **[[14740000|Focused Eye]]** before **[[14750000|Hunter's Resolve]]** before **[[14800000|Hunter's Soul]]**." },
    ],
    specs: [
      {
        id: 14010000 /* Deadshot */,
        parts: [14010020 /* Deadshot: +30% Skill Speed */, 14010030 /* Deadshot: Changes to mobile skill */, 14010050 /* Deadshot: [Deadshot] grants extra damage on hit */],
        note: {
          de: 'Schneller aufladen, im Laufen schießen und später Zusatzschaden – so empfehlen es die Guides.',
          en: 'Charge faster, shoot while moving and later extra damage – that is what guides recommend.',
        },
      },
      {
        id: 14020000 /* Snipe */,
        parts: [14020030 /* Snipe: +50% Multi-Hit on hit */, 14020040 /* Snipe: -1s [Deadshot] cooldown on hit */, 14020050 /* Snipe: Adds [Tempest Arrow] Chain Skill */],
        note: {
          de: 'Mehr Mehrfachtreffer, jeder Treffer macht [[14010000|Deadshot]] 1 s früher bereit, und später kommt ein weiterer Folgeschuss dazu.',
          en: 'More Multi-Hit, every hit makes [[14010000|Deadshot]] ready 1 s sooner, and later an extra follow-up shot joins.',
        },
      },
      {
        id: 14090000 /* Marking Shot */,
        parts: [14090030 /* Marking Shot: +5s duration */],
        note: {
          de: 'Laut Skilltext hält Letalität 10 s, die Abklingzeit beträgt ebenfalls 10 s. Mit dieser Option hält Letalität 15 s – so bleiben dir 5 s Puffer, um den Skill neu zu setzen, bevor sie ausläuft.',
          en: 'The skill text says Precision lasts 10 s, and the cooldown is 10 s as well. With this option Precision lasts 15 s – a 5 s buffer to recast the skill before it runs out.',
        },
      },
      {
        id: 14110000 /* Gale Arrow */,
        parts: [14110030 /* Gale Arrow: Changes to mobile skill */, 14110050 /* Gale Arrow: -10s cooldown */],
        note: {
          de: 'Im Laufen schießen; ab Skillstufe 16 ist der Skill mit −10 s Abklingzeit alle 10 s bereit – genauso lange hält Wirbelwind.',
          en: 'Shoot while moving; from skill level 16, with −10 s cooldown the skill is ready every 10 s – exactly as long as Gale lasts.',
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          { id: 14310000 /* Vaizel's Authority */, note: { de: '+20 % Angriffskraft – dein wichtigster Buff.', en: '+20% Attack – your most important buff.' } },
          { id: 14220000 /* Bow of Blessing */, note: { de: "+200 Krit.-Treffer und +100 Präzision. Zusammen mit [[14310000|Vaizel's Authority]] drücken.", en: "+200 Critical Hit and +100 Accuracy. Press it together with [[14310000|Vaizel's Authority]]." } },
          { id: 14380000 /* Supporting Fire */, note: { de: 'Eine Kugel schießt 15 s lang mit und heilt dich dabei ein wenig.', en: 'An orb shoots along for 15 s and heals you a little.' } },
          { id: 14060000 /* Griffon Arrow */, note: { de: 'Trifft bis zu 4 Gegner und brennt 10 s nach. Bewegen sich die Gegner, brennt es stärker.', en: 'Hits up to 4 enemies and burns for 10 s. If the enemies move, it burns more.' } },
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
        de: '**Azphel** (Stufe 45) ist die PvP-Tafel. Du bezahlst sie mit **Kampfkristallen** aus dem PvP, nicht mit Daevanion-Kristallen. Ihre Werte zählen nur gegen Spieler – und nur hier gibt es Präzision.',
        en: '**Azphel** (level 45) is the PvP board. You pay for it with **Battle Crystals** from PvP, not with Daevanion Crystals. Its stats only count against players – and only this board has Accuracy.',
      },
    ],
    stats: {
      de: 'Diese Werte zählen für dich, das wichtigste zuerst: **Krit.-Treffer** > **Krit.-Schadensverstärkung** > **Angriffskraft** > **Präzision** (nur auf Azphel) > **Schadensverstärkung** > **Kampftempo** > **Abklingzeitverringerung**.',
      en: 'These stats matter for you, most important first: **Critical Hit** > **Critical Damage Boost** > **Attack** > **Accuracy** (only on Azphel) > **Damage Boost** > **Combat Speed** > **Cooldown Reduction**.',
    },
  },
  macro: {
    keys: [
      {
        key: '1',
        ids: [14110000 /* Gale Arrow */],
        macro: true,
        note: {
          de: '[[14110000|Gale Arrow]] trifft bis zu 4 Gegner und gibt dir Wirbelwind – ein Angriff mit eingebautem Buff, darum bleibt er im Makro.',
          en: '[[14110000|Gale Arrow]] hits up to 4 enemies and gives you Gale – an attack with a buff built in, so it stays in the macro.',
        },
      },
      {
        key: '2',
        ids: [14070000 /* Suppressing Arrow */, 14130000 /* Snare Shot */],
        macro: true,
        note: {
          de: '[[14070000|Suppressing Arrow]] ist der stärkere Treffer und kommt zuerst; mit Letalität kann er betäuben (normale Gegner immer). Sonst kommt [[14130000|Snare Shot]] – er verlangsamt und macht so [[14080000|Burst Arrow]] auf Taste 3 möglich.',
          en: '[[14070000|Suppressing Arrow]] is the stronger hit and comes first; with Precision it can stun (normal enemies always). Otherwise [[14130000|Snare Shot]] comes – it slows and so makes [[14080000|Burst Arrow]] on key 3 possible.',
        },
      },
      {
        key: '3',
        ids: [14080000 /* Burst Arrow */, 14050000 /* Drill Dart */],
        macro: true,
        note: {
          de: 'Kombo: [[14080000|Burst Arrow]] geht nur gegen ein verlangsamtes oder festgehaltenes Ziel. Sobald [[14130000|Snare Shot]] das Ziel verlangsamt hat, nimmt die Taste ihn von selbst – sonst [[14050000|Drill Dart]].',
          en: 'Combo: [[14080000|Burst Arrow]] only works on a slowed or rooted target. As soon as [[14130000|Snare Shot]] has slowed the target, the key uses it by itself – otherwise [[14050000|Drill Dart]].',
        },
      },
      {
        key: '8',
        ids: [14060000 /* Griffon Arrow */],
        macro: true,
        note: { de: 'Stigma: trifft bis zu 4 Gegner und brennt 10 s nach.', en: 'Stigma: hits up to 4 enemies and burns for 10 s.' },
      },
      {
        key: 'T',
        ids: [14330000 /* Arrow Scattershot */, 14340000 /* Tempest Shot */],
        macro: true,
        note: {
          de: 'Letzter Schritt im Makro. Füller oben: [[14340000|Tempest Shot]]. Darunter [[14330000|Arrow Scattershot]]: Er kommt nur, wenn der Gegner taumelt – dann nimmt die Taste ihn von selbst. [[14340000|Tempest Shot]] kostet viel MP – halte die linke Maustaste, sie bringt MP zurück.',
          en: 'Last step of the macro. Filler on top: [[14340000|Tempest Shot]]. Below it [[14330000|Arrow Scattershot]]: it only comes while the enemy staggers – then the key uses it by itself. [[14340000|Tempest Shot]] costs a lot of MP – keep holding the left mouse button, it brings MP back.',
        },
      },
      {
        key: 'R',
        ids: [14020000 /* Snipe */],
        note: { de: 'Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Bringt MP zurück.', en: 'Basic attack: hold the left mouse button, **not** in the macro. Restores MP.' },
      },
      {
        key: '5',
        ids: [14310000 /* Vaizel's Authority */],
        note: { de: 'Buff – von Hand in der Eröffnung und in Burst-Phasen.', en: 'Buff – by hand in the opener and in burst phases.' },
      },
      {
        key: '6',
        ids: [14220000 /* Bow of Blessing */],
        note: {
          de: "Stigma, Buff: +200 Krit.-Treffer und +100 Präzision. Von Hand, direkt nach [[14310000|Vaizel's Authority]] (5).",
          en: "Stigma, buff: +200 Critical Hit and +100 Accuracy. By hand, right after [[14310000|Vaizel's Authority]] (5).",
        },
      },
      {
        key: '7',
        ids: [14380000 /* Supporting Fire */],
        note: {
          de: 'Stigma: Eine Kugel schießt 15 s lang mit. Von Hand in der Eröffnung, direkt nach den Buffs.',
          en: 'Stigma: an orb shoots along for 15 s. By hand in the opener, right after the buffs.',
        },
      },
      {
        key: 'Q',
        ids: [14010000 /* Deadshot */],
        note: {
          de: 'Aufladeskill: Taste halten, loslassen zum Schießen. Nicht ins Makro – das Makro lädt ihn nicht richtig auf. Nur mit Letalität einsetzen.',
          en: 'Charged skill: hold the key, let go to shoot. Not in the macro – the macro does not charge it properly. Only use it with Precision.',
        },
      },
      {
        key: 'E',
        ids: [14090000 /* Marking Shot */],
        note: {
          de: 'Von Hand: Er bewegt dich in die Richtung, die du drückst. Drück ihn jedes Mal, wenn er bereit ist, damit Letalität aktiv bleibt.',
          en: 'By hand: it moves you in the direction you are pressing. Press it every time it is ready so Precision stays up.',
        },
      },
      {
        key: '4',
        ids: [14170000 /* Explosion Trap */],
        note: {
          de: 'Von Hand an deine Füße legen, wenn eine Gruppe zu dir kommt – die Falle explodiert erst, wenn ein Gegner hineintritt.',
          en: 'Place it at your feet by hand when a pack comes to you – the trap only explodes when an enemy steps on it.',
        },
      },
    ],
    note: {
      de: 'Makro: **1 → 2 → 3 → 8 → T**, je 10 ms. Guides legen die Makro-Taste auf die rechte Maustaste. Halte sie zusammen mit der linken Maustaste ([[14020000|Snipe]]) gedrückt. [[14090000|Marking Shot]] (E) und [[14010000|Deadshot]] (Q) drückst du selbst – sie sind deine wichtigsten Skills. Die Buffs (5, 6) und [[14380000|Supporting Fire]] (7) drückst du in der Eröffnung, die Falle (4) bei Gegnergruppen.',
      en: 'Macro: **1 → 2 → 3 → 8 → T**, 10 ms each. Guides put the macro key on the right mouse button. Hold it together with the left mouse button ([[14020000|Snipe]]). You press [[14090000|Marking Shot]] (E) and [[14010000|Deadshot]] (Q) yourself – they are your most important skills. You press the buffs (5, 6) and [[14380000|Supporting Fire]] (7) in the opener, and the trap (4) against packs.',
    },
  },
  mistakes: [
    {
      de: '**[[14010000|Deadshot]] ohne Letalität.** Mit Letalität macht er 35 % mehr Schaden. Erst [[14090000|Marking Shot]], dann schießen.',
      en: '**[[14010000|Deadshot]] without Precision.** With Precision it deals 35% more damage. First [[14090000|Marking Shot]], then shoot.',
    },
    {
      de: '**[[14090000|Marking Shot]] im Laufen.** Er bewegt dich in die Richtung, die du drückst – so springst du leicht aus deiner Position. Steh still oder wähl die Richtung mit Absicht.',
      en: '**[[14090000|Marking Shot]] while moving.** It moves you in the direction you are pressing – so you easily jump out of position. Stand still or pick the direction on purpose.',
    },
    {
      de: '**[[14010000|Deadshot]] oder [[14090000|Marking Shot]] im Makro.** Das Makro lädt [[14010000|Deadshot]] nicht richtig auf, und [[14090000|Marking Shot]] würde dich herumspringen lassen. Beide gehören auf eigene Tasten.',
      en: '**[[14010000|Deadshot]] or [[14090000|Marking Shot]] in the macro.** The macro does not charge [[14010000|Deadshot]] properly, and [[14090000|Marking Shot]] would make you jump around. Both belong on keys of their own.',
    },
    {
      de: '**Zu wenig Präzision.** Guides nennen das als häufigen Fehler – Schüsse gehen daneben. [[14740000|Focused Eye]] und [[14220000|Bow of Blessing]] erhöhen deine Präzision.',
      en: '**Too little Accuracy.** Guides name this as a common mistake – shots miss. [[14740000|Focused Eye]] and [[14220000|Bow of Blessing]] raise your Accuracy.',
    },
    {
      de: '**Keine MP mehr.** [[14340000|Tempest Shot]] kostet viel MP. Halte [[14020000|Snipe]] gedrückt – die Grundattacke bringt MP zurück.',
      en: '**Running out of MP.** [[14340000|Tempest Shot]] costs a lot of MP. Keep holding [[14020000|Snipe]] – the basic attack brings MP back.',
    },
  ],
  sources: [
    { href: 'https://game8.co/games/Aion-2/archives/626143', label: 'Game8 – Ranger build' },
    { href: 'https://daevaguides.com/en/ranger/', label: 'Daeva Guides – Ranger' },
    { href: 'https://aion2.run/en/classes/rodeur', label: 'AION2.run – Ranger class' },
    { href: 'https://mobalytics.gg/gamebase/guides/aion-2-ranger-pve-build', label: 'Mobalytics – Ranger PvE build' },
    { href: 'https://www.inven.co.kr/board/aion2/6450/19498', label: 'Inven – Ranger board (KR)' },
    { href: 'https://gameplay.tips/guides/aion-2-ranger-rotation-and-macro-guide-pve.html', label: 'Gameplay.tips – Ranger rotation and macro (PvE)' },
  ],
});
