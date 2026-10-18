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
  updated: '2026-10-19',
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
        de: '**Verlangsamen lohnt sich:** [[14130000|Snare Shot]] bremst Gegner (Trägheit), und erst dann geht [[14080000|Burst Arrow]]. Die Passive [[14770000|Rooting Eye]] macht gegen verlangsamte Ziele außerdem Zusatzschaden.',
        en: '**Slowing pays off:** [[14130000|Snare Shot]] slows enemies, and only then does [[14080000|Burst Arrow]] work. The passive [[14770000|Rooting Eye]] also deals extra damage to slowed targets.',
      },
      {
        de: '**Achte auf deine MP.** [[14340000|Tempest Shot]] kostet viel MP, deine Grundattacke [[14020000|Snipe]] bringt MP zurück.',
        en: '**Watch your MP.** [[14340000|Tempest Shot]] costs a lot of MP, your basic attack [[14020000|Snipe]] brings MP back.',
      },
    ],
    boss: {
      de: 'Am Boss zählt **Letalität**: [[14090000|Marking Shot]] gibt dir +300 Krit.-Treffer, und [[14010000|Deadshot]] macht damit 35 % mehr Schaden. Fast jeder Skill füllt die Benommen-Leiste des Bosses. Ist sie voll, **taumelt** er (Stagger) – dann geht [[14330000|Arrow Scattershot]]. Ein voll aufgeladener [[14010000|Deadshot]] füllt die Leiste stärker.',
      en: 'At the boss, **Precision** is what counts: [[14090000|Marking Shot]] gives you +300 Critical Hit, and with it [[14010000|Deadshot]] deals 35% more damage. Almost every skill fills the boss’s Stagger bar. When it is full, the boss **staggers** – now [[14330000|Arrow Scattershot]] works. A fully charged [[14010000|Deadshot]] fills the bar more.',
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
    flow: {
      items: [
        {
          title: { de: 'Markieren', en: 'Mark' },
          text: { de: '[[14090000|Marking Shot]] gibt dir **Letalität**: +300 Krit.-Treffer', en: '[[14090000|Marking Shot]] gives you **Precision**: +300 Critical Hit' },
          tag: { de: 'Taste E', en: 'Key E' },
          tone: 'violet',
        },
        {
          title: { de: 'Wirbelwind', en: 'Gale' },
          text: { de: '[[14110000|Gale Arrow]]: 10 s lang +7 % Kampftempo und +7 % PvE-Schaden', en: '[[14110000|Gale Arrow]]: +7% Combat Speed and +7% PvE damage for 10 s' },
          tag: { de: 'Taste 1', en: 'Key 1' },
          tone: 'blue',
        },
        {
          title: { de: 'Buffs', en: 'Buffs' },
          text: { de: "[[14310000|Vaizel's Authority]] (+20 % Angriffskraft) und [[14220000|Bow of Blessing]] (+200 Krit.-Treffer, +100 Präzision)", en: "[[14310000|Vaizel's Authority]] (+20% Attack) and [[14220000|Bow of Blessing]] (+200 Critical Hit, +100 Accuracy)" },
          tag: { de: 'Tasten 5 · 6', en: 'Keys 5 · 6' },
          tone: 'blue',
        },
        {
          title: { de: 'Feuerkugel', en: 'Orb' },
          text: { de: '[[14380000|Supporting Fire]] schießt 15 s lang mit (30 s ab Stigma-Stufe 10)', en: '[[14380000|Supporting Fire]] shoots along for 15 s (30 s from stigma level 10)' },
          tag: { de: 'Taste 7', en: 'Key 7' },
          tone: 'teal',
        },
        {
          title: { de: 'Burst, dann Makro', en: 'Burst, then macro' },
          text: { de: '[[14010000|Deadshot]] voll aufladen, danach Makro und linke Maustaste', en: '[[14010000|Deadshot]] fully charged, then the macro and the left mouse button' },
          tag: { de: 'Taste Q', en: 'Key Q' },
          tone: 'gold',
        },
      ],
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 14090000 /* Marking Shot */, note: { de: 'Letalität: +300 Krit.-Treffer', en: 'Precision: +300 Critical Hit' } },
          { id: 14110000 /* Gale Arrow */, note: { de: 'Wirbelwind: mehr Tempo und Schaden', en: 'Gale: more speed and damage' } },
          { id: 14310000 /* Vaizel's Authority */, note: { de: '+20 % Angriffskraft', en: '+20% Attack' } },
          { id: 14220000 /* Bow of Blessing */, note: { de: '+200 Krit.-Treffer, +100 Präzision', en: '+200 Critical Hit, +100 Accuracy' } },
          { id: 14380000 /* Supporting Fire */, note: { de: 'Kugel schießt 15 s mit (30 s ab Stigma-Stufe 10)', en: 'Orb shoots along for 15 s (30 s from stigma level 10)' } },
          { id: 14010000 /* Deadshot */, note: { de: 'Voll aufladen, dann Makro + linke Maustaste halten', en: 'Charge fully, then hold macro + left mouse button' } },
        ],
      },
      {
        title: { de: 'Danach: Reihenfolge im Kampf', en: 'Then: priority in the fight' },
        steps: [
          { id: 14090000 /* Marking Shot */, note: { de: 'Jedes Mal, wenn bereit', en: 'Every time it is ready' } },
          { id: 14010000 /* Deadshot */, note: { de: 'Wenn bereit – nur mit Letalität', en: 'When ready – only with Precision' } },
          { id: 14110000 /* Gale Arrow */, note: { de: 'Wirbelwind aktiv halten', en: 'Keep Gale up' } },
          { id: 14060000 /* Griffon Arrow */, note: { de: 'Stigma: wenn bereit, brennt 10 s nach', en: 'Stigma: when ready, burns for 10 s' } },
          { id: 14130000 /* Snare Shot */, note: { de: 'Ziel verlangsamen', en: 'Slow the target' } },
          { id: 14080000 /* Burst Arrow */, note: { de: 'Auf das verlangsamte Ziel', en: 'On the slowed target' } },
          { id: 14070000 /* Suppressing Arrow */, note: { de: 'Einzelziel-Treffer, alle 20 s', en: 'Single-target hit, every 20 s' } },
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
      de: 'Im globalen Spiel ist die Höchststufe 45, und du hast **4 Stigma-Plätze** (ab Stufe 22, 27, 32 und 37). Koreanische Builds haben mehr Plätze – übernimm sie nicht eins zu eins. **Spezialisierungen:** Ein Skill bekommt ab Skillstufe 8 den ersten Platz, ab 12 den zweiten und ab 20 den dritten. Mit Skillpunkten bringst du einen Skill nur bis Stufe 10 – höhere Stufen kommen von den Daevanion-Tafeln (bis +4) und von Ausrüstung und Arcana. Für alle Skills reichen die Punkte nie, darum zählt die Reihenfolge.',
      en: 'In the global game the level cap is 45, and you have **4 stigma slots** (from level 22, 27, 32 and 37). Korean builds have more slots – do not copy them one to one. **Specialisations:** a skill gets its first slot at skill level 8, the second at 12 and the third at 20. Skill points only take a skill up to level 10 – higher levels come from the Daevanion boards (up to +4) and from gear and Arcana. There are never enough points for every skill, so the order matters.',
    },
    points: [
      { de: '**[[14020000|Snipe]]** und **[[14340000|Tempest Shot]]** zuerst – deine Grundattacke und dein Füller laufen die ganze Zeit, so bringt jeder Punkt sofort mehr Schaden. Danach **[[14050000|Drill Dart]]** (ab Stufe 4) und **[[14110000|Gale Arrow]]** (ab Stufe 7).', en: '**[[14020000|Snipe]]** and **[[14340000|Tempest Shot]]** first – your basic attack and your filler run all the time, so every point adds damage right away. Then **[[14050000|Drill Dart]]** (from level 4) and **[[14110000|Gale Arrow]]** (from level 7).' },
      { de: '**[[14080000|Burst Arrow]]** (ab Stufe 10) und **[[14010000|Deadshot]]**, sobald du ihn mit Stufe 14 lernst – er wird dein stärkster Schuss. Fast alle Top 10 haben diese sechs Angriffe auf Stufe 10.', en: '**[[14080000|Burst Arrow]]** (from level 10) and **[[14010000|Deadshot]]** as soon as you learn it at level 14 – it becomes your strongest shot. Almost all of the top 10 have these six attacks at level 10.' },
      { de: "Passive (sie wirken immer, ganz ohne Taste): **[[14740000|Focused Eye]]** (ab Stufe 11: +1 % PvE-Schadensverstärkung pro Stufe und +100 Präzision) und **[[14750000|Hunter's Resolve]]** (ab Stufe 13: mehr Krit.-Schaden, +15 % auf Stufe 10). Die Top 10 bringen beide auf 10 (Median).", en: "Passives (they work all the time, no key needed): **[[14740000|Focused Eye]]** (from level 11: +1% PvE Damage Boost per level and +100 Accuracy) and **[[14750000|Hunter's Resolve]]** (from level 13: more Critical Damage, +15% at level 10). The top 10 take both to 10 (median)." },
      { de: '**[[14090000|Marking Shot]]** (ab Stufe 3) mindestens auf Skillstufe 8 – dort bekommt er seinen ersten Spezialisierungsplatz für +5 s Letalität. Die +300 Krit.-Treffer von Letalität sind auf jeder Skillstufe gleich, weitere Punkte erhöhen nur den Schaden des Schusses. Dazu **[[14130000|Snare Shot]]** – erst er macht [[14080000|Burst Arrow]] möglich. Die Top 10 haben beide im Median auf 9–10.', en: '**[[14090000|Marking Shot]]** (from level 3) to at least skill level 8 – that is where it gets its first specialisation slot for +5 s Precision. Precision’s +300 Critical Hit is the same at every skill level, more points only raise the shot’s own damage. Add **[[14130000|Snare Shot]]** – it is what makes [[14080000|Burst Arrow]] possible. The top 10 have both at 9–10 (median).' },
      { de: "Passive, die von selbst Zusatztreffer auslösen (jede höchstens einmal pro Sekunde): **[[14800000|Hunter's Soul]]** (ab Stufe 25: bei Krits), **[[14720000|Concentrated Fire]]** (ab Stufe 6: gegen Ziele mit Schaden über Zeit, z. B. der Blutung von [[14050000|Drill Dart]]), **[[14770000|Rooting Eye]]** (ab Stufe 17: gegen verlangsamte Ziele) und **[[14780000|Melee Fire]]** (ab Stufe 21: bei jedem Treffer). Die Top 10 bringen alle vier im Median auf 10.", en: "Passives that add extra hits by themselves (each at most once per second): **[[14800000|Hunter's Soul]]** (from level 25: on crits), **[[14720000|Concentrated Fire]]** (from level 6: on targets taking damage over time, e.g. the bleed from [[14050000|Drill Dart]]), **[[14770000|Rooting Eye]]** (from level 17: on slowed targets) and **[[14780000|Melee Fire]]** (from level 21: on any hit). The top 10 take all four to 10 (median)." },
      { de: 'Zum Überleben **[[14710000|Vigilant Eye]]** (ab Stufe 1: +200 Ausweichen, +15 % max. LP auf Stufe 10) und **[[14790000|Revitalization Contract]]** (ab Stufe 23: Widerstand gegen Statuseffekte; fallen deine LP auf 10 %, heilt er dich sofort, auf Stufe 10 um 44 %, einmal pro 60 s) – auch die bringen die Top 10 im Median auf 10. Dazu **[[14070000|Suppressing Arrow]]** (ab Stufe 12) und **[[14170000|Explosion Trap]]** (ab Stufe 8): Top 10 im Median 9, manche lassen sie auf 1.', en: 'For survival **[[14710000|Vigilant Eye]]** (from level 1: +200 Evasion, +15% Max HP at level 10) and **[[14790000|Revitalization Contract]]** (from level 23: Status Effect Resist; when your HP drops to 10% it heals you at once, by 44% at level 10, once every 60 s) – the top 10 take these to 10 as well (median). Plus **[[14070000|Suppressing Arrow]]** (from level 12) and **[[14170000|Explosion Trap]]** (from level 8): top 10 median 9, some leave them at 1.' },
      { de: "Zuletzt **[[14330000|Arrow Scattershot]]**: Er geht nur gegen taumelnde Gegner, und 6 der Top 10 lassen ihn auf Stufe 1–3 (4 bringen ihn auf 10). Restpunkte gehen in [[14260000|Defiance]] (kürzere Abklingzeit: 60 s auf Stufe 1, 51 s auf Stufe 10), [[14730000|Wind Vigor]] und [[14760000|Unyielding Resolve]].", en: "Last **[[14330000|Arrow Scattershot]]**: it only works on staggered enemies, and 6 of the top 10 keep it at level 1–3 (4 take it to 10). Leftover points go into [[14260000|Defiance]] (shorter cooldown: 60 s at level 1, 51 s at level 10), [[14730000|Wind Vigor]] and [[14760000|Unyielding Resolve]]." },
    ],
    levels: [
      { id: 14740000 /* Focused Eye */, level: 26, bought: 10, dv: 4, gear: 12, passive: true },
      { id: 14750000 /* Hunter's Resolve */, level: 24.5, bought: 10, dv: 4, gear: 9.5, passive: true },
      { id: 14010000 /* Deadshot */, level: 20, bought: 10, dv: 4, gear: 6 },
      { id: 14340000 /* Tempest Shot */, level: 19.5, bought: 10, dv: 4, gear: 5.5 },
      { id: 14050000 /* Drill Dart */, level: 19, bought: 10, dv: 4, gear: 5 },
      { id: 14110000 /* Gale Arrow */, level: 17.5, bought: 10, dv: 4, gear: 4 },
      { id: 14020000 /* Snipe */, level: 16.5, bought: 10, dv: 4, gear: 2.5 },
      { id: 14080000 /* Burst Arrow */, level: 16.5, bought: 10, dv: 4, gear: 2 },
      { id: 14090000 /* Marking Shot */, level: 14, bought: 10, dv: 3, gear: 1.5 },
      { id: 14130000 /* Snare Shot */, level: 14, bought: 9.5, dv: 4, gear: 0.5 },
    ],
    specs: [
      {
        id: 14010000 /* Deadshot */,
        parts: [14010020 /* Deadshot: +30% Skill Speed */, 14010030 /* Deadshot: Changes to mobile skill */, 14010050 /* Deadshot: [Deadshot] grants extra damage on hit */],
        note: {
          de: 'Schneller aufladen, im Laufen schießen und später Zusatzschaden – so empfehlen es die Guides. Den dritten Platz gibt es ab Skillstufe 20; 7 der Top 10 haben [[14010000|Deadshot]] so hoch.',
          en: 'Charge faster, shoot while moving and later extra damage – that is what guides recommend. The third slot comes at skill level 20; 7 of the top 10 have [[14010000|Deadshot]] that high.',
        },
      },
      {
        id: 14020000 /* Snipe */,
        parts: [14020040 /* Snipe: -1s [Deadshot] cooldown on hit */, 14020050 /* Snipe: Adds [Tempest Arrow] Chain Skill */, 14020030 /* Snipe: +50% Multi-Hit on hit */],
        note: {
          de: 'Jeder Treffer macht [[14010000|Deadshot]] 1 s früher bereit (ab Skillstufe 12), ab 16 kommt ein weiterer Folgeschuss dazu – diese zwei zuerst, denn die meisten Top 10 haben [[14020000|Snipe]] auf 16–19, also zwei Plätze. Der dritte Platz (ab 20): mehr Mehrfachtreffer, oder +20 % MP, wenn dir oft die MP ausgehen.',
          en: 'Every hit makes [[14010000|Deadshot]] ready 1 s sooner (from skill level 12), and from 16 an extra follow-up shot joins – take these two first, because most of the top 10 have [[14020000|Snipe]] at 16–19, so two slots. The third slot (from 20): more Multi-Hit, or +20% MP if you often run out of MP.',
        },
      },
      {
        id: 14090000 /* Marking Shot */,
        parts: [14090030 /* Marking Shot: +5s duration */, 14090010 /* Marking Shot: +5% Perfect Chance for the duration */],
        note: {
          de: 'Laut Skilltext hält Letalität 10 s, die Abklingzeit beträgt ebenfalls 10 s. Mit +5 s hält Letalität 15 s – so bleiben dir 5 s Puffer, um den Skill neu zu setzen, bevor sie ausläuft. Ab Skillstufe 12 dazu +5 % Perfektion (Chance auf einen Treffer mit dem Höchstwert deiner Waffe), solange Letalität wirkt. Die Top 10 haben [[14090000|Marking Shot]] auf 12–17, also zwei Plätze.',
          en: 'The skill text says Precision lasts 10 s, and the cooldown is 10 s as well. With +5 s Precision lasts 15 s – a 5 s buffer to recast the skill before it runs out. From skill level 12 add +5% Perfect Chance (the chance for a hit at the top of your weapon’s damage range) while Precision lasts. The top 10 have [[14090000|Marking Shot]] at 12–17, so two slots.',
        },
      },
      {
        id: 14110000 /* Gale Arrow */,
        parts: [14110030 /* Gale Arrow: Changes to mobile skill */, 14110040 /* Gale Arrow: more Combat Speed and damage boost when less targets hit */, 14110050 /* Gale Arrow: -10s cooldown */],
        note: {
          de: 'Im Laufen schießen; ab Skillstufe 12 mehr Kampftempo und Schaden, je weniger Ziele du triffst (am Boss also am meisten); ab Skillstufe 16 ist der Skill mit −10 s Abklingzeit alle 10 s bereit – genauso lange hält Wirbelwind. Hast du erst zwei Plätze, nimm ab 16 die −10 s auf jeden Fall.',
          en: 'Shoot while moving; from skill level 12 more Combat Speed and damage the fewer targets you hit (so the most at a boss); from skill level 16, with −10 s cooldown the skill is ready every 10 s – exactly as long as Gale lasts. If you only have two slots, take the −10 s from 16 in any case.',
        },
      },
      {
        id: 14050000 /* Drill Dart */,
        parts: [14050040 /* Drill Dart: Multi-Hit on hit */, 14050050 /* Drill Dart: Activates [Drill Dart] 1 extra time */, 14050030 /* Drill Dart: +20% Skill Speed */],
        note: {
          de: 'Jeder Treffer wird ein Mehrfachtreffer (ab Skillstufe 12), ab 16 feuert der Skill ein zweites Mal – diese zwei zuerst. +20 % Fähigkeitstempo füllt den Platz, solange die beiden noch fehlen, und ab Skillstufe 20 den dritten.',
          en: 'Every hit becomes a Multi-Hit (from skill level 12), and from 16 the skill fires a second time – take these two first. +20% Skill Speed fills a slot while those two are not unlocked yet, and the third slot from skill level 20.',
        },
      },
      {
        id: 14340000 /* Tempest Shot */,
        parts: [14340030 /* Tempest Shot: up to 12% more damage when less targets hit */, 14340050 /* Tempest Shot: +20% Skill Speed */, 14340010 /* Tempest Shot: -20% MP consumed */],
        note: {
          de: 'Bis zu 12 % mehr Schaden, je weniger Ziele du triffst, und ab Skillstufe 16 +20 % Fähigkeitstempo – so schießt dein Füller öfter. −20 % MP-Kosten nimmst du für den zweiten Platz, bis du Skillstufe 16 hast, und ab 20 für den dritten – der Füller frisst viel MP.',
          en: 'Up to 12% more damage the fewer targets you hit, and from skill level 16 +20% Skill Speed – so your filler shoots more often. Take −20% MP cost for the second slot until you reach skill level 16, and for the third from 20 – the filler eats a lot of MP.',
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          { id: 14310000 /* Vaizel's Authority */, note: { de: '+20 % Angriffskraft – dein wichtigster Buff. Hält 10 s, auf Stigma-Stufe 20 dann 20 s. Auf Stufe 20 senkt außerdem jeder Krit mit 50 % Chance alle Abklingzeiten um 1 s, solange er wirkt – bring ihn zuerst auf 20.', en: '+20% Attack – your most important buff. Lasts 10 s, 20 s at stigma level 20. At level 20 every crit also has a 50% chance to cut all cooldowns by 1 s while it lasts – take it to 20 first.' } },
          { id: 14220000 /* Bow of Blessing */, note: { de: "+200 Krit.-Treffer und +100 Präzision. Zusammen mit [[14310000|Vaizel's Authority]] drücken.", en: "+200 Critical Hit and +100 Accuracy. Press it together with [[14310000|Vaizel's Authority]]." } },
          { id: 14380000 /* Supporting Fire */, note: { de: 'Eine Kugel schießt 15 s lang mit (ab Stigma-Stufe 10: 30 s) und heilt dich dabei ein wenig.', en: 'An orb shoots along for 15 s (from stigma level 10: 30 s) and heals you a little.' } },
          { id: 14060000 /* Griffon Arrow */, note: { de: 'Trifft bis zu 4 Gegner und brennt 10 s nach. Bewegen sich die Gegner, brennt es stärker. Hier sind sich die Guides nicht einig: 5 der Top 10 nehmen ihn, 3 stattdessen [[14360000|Explosive Arrow]] – ein großer Treffer auf bis zu 4 Gegner mit +20 % Schaden gegen verlangsamte Ziele.', en: 'Hits up to 4 enemies and burns for 10 s. If the enemies move, it burns more. Guides disagree on this slot: 5 of the top 10 take it, 3 take [[14360000|Explosive Arrow]] instead – a big hit on up to 4 enemies with +20% damage against slowed targets.' } },
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
        de: 'Skillstufen-Knoten geben deinen Skills Extra-Stufen (bis +4 pro Skill). Nimm zuerst die von [[14010000|Deadshot]], [[14110000|Gale Arrow]], [[14340000|Tempest Shot]], [[14050000|Drill Dart]], [[14020000|Snipe]] und [[14080000|Burst Arrow]] – alle Top 10 haben bei diesen sechs die vollen +4. Jede Stufe zählt auch für die Plätze der Spezialisierungen.',
        en: 'Skill level nodes give your skills extra levels (up to +4 per skill). Take the ones for [[14010000|Deadshot]], [[14110000|Gale Arrow]], [[14340000|Tempest Shot]], [[14050000|Drill Dart]], [[14020000|Snipe]] and [[14080000|Burst Arrow]] first – all of the top 10 have the full +4 on these six. Every level also counts for the specialisation slots.',
      },
      {
        de: '**Azphel** (Stufe 45) ist die PvP-Tafel. Du bezahlst sie mit **Kampfkristallen** aus dem PvP, nicht mit Daevanion-Kristallen. Ihre Werte zählen nur gegen Spieler – und nur hier gibt es Präzision.',
        en: '**Azphel** (level 45) is the PvP board. You pay for it with **Battle Crystals** from PvP, not with Daevanion Crystals. Its stats only count against players – and only this board has Accuracy.',
      },
    ],
    stats: {
      de: 'Zuerst **Präzision**, bis du etwa 1.100–1.200 hast – diesen Wert nennen zwei globale Guides; darunter gehen Schüsse daneben. [[14740000|Focused Eye]] und [[14220000|Bow of Blessing]] geben je +100. Danach: **Angriffskraft** und **Schadensverstärkung**, dann **Krit.-Treffer** und **Krit.-Schadensverstärkung**, dann **Kampftempo** und **Abklingzeitverringerung**. Krit.-Treffer bekommst du ohnehin viel von Letalität (+300) und [[14220000|Bow of Blessing]] (+200). Auf den Daevanion-Tafeln gibt es Präzision nur auf Azphel (PvP).',
      en: 'First **Accuracy**, until you have about 1,100–1,200 – the value two global guides name; below that, shots miss. [[14740000|Focused Eye]] and [[14220000|Bow of Blessing]] give +100 each. After that: **Attack** and **Damage Boost**, then **Critical Hit** and **Critical Damage Boost**, then **Combat Speed** and **Cooldown Reduction**. You already get a lot of Critical Hit from Precision (+300) and [[14220000|Bow of Blessing]] (+200). On the Daevanion boards, Accuracy only exists on Azphel (PvP).',
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
        ids: [14130000 /* Snare Shot */, 14070000 /* Suppressing Arrow */],
        macro: true,
        note: {
          de: '[[14130000|Snare Shot]] kommt zuerst: Er verlangsamt und macht so [[14080000|Burst Arrow]] auf Taste 3 möglich – und Zusatzschaden von [[14770000|Rooting Eye]]. Ist er nicht bereit, kommt [[14070000|Suppressing Arrow]], ein starker Einzeltreffer; mit Letalität kann er betäuben (normale Gegner immer).',
          en: '[[14130000|Snare Shot]] comes first: it slows and so makes [[14080000|Burst Arrow]] on key 3 possible – plus extra damage from [[14770000|Rooting Eye]]. When it is not ready, [[14070000|Suppressing Arrow]] comes, a strong single-target hit; with Precision it can stun (normal enemies always).',
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
        note: { de: 'Stigma: trifft bis zu 4 Gegner und brennt 10 s nach. Nimmst du stattdessen [[14360000|Explosive Arrow]], kommt er auf diese Taste.', en: 'Stigma: hits up to 4 enemies and burns for 10 s. If you take [[14360000|Explosive Arrow]] instead, it goes on this key.' },
      },
      {
        key: 'T',
        ids: [14330000 /* Arrow Scattershot */, 14340000 /* Tempest Shot */],
        macro: true,
        note: {
          de: 'Letzter Schritt im Makro. Füller oben: [[14340000|Tempest Shot]]. Darunter [[14330000|Arrow Scattershot]]: Er kommt nur, wenn der Gegner taumelt – dann nimmt die Taste ihn von selbst. Er lohnt sich erst, wenn du ihn gelevelt hast: Laut Skilltext macht er auf Stufe 1 nur 96 Schaden, [[14340000|Tempest Shot]] auf Stufe 16 schon 614. Lässt du ihn wie die meisten Top 10 auf Stufe 1–3, nimm ihn aus der Kette. [[14340000|Tempest Shot]] kostet viel MP – halte die linke Maustaste, sie bringt MP zurück.',
          en: 'Last step of the macro. Filler on top: [[14340000|Tempest Shot]]. Below it [[14330000|Arrow Scattershot]]: it only comes while the enemy staggers – then the key uses it by itself. It only pays off once you have levelled it: the skill text gives it just 96 damage at level 1, while [[14340000|Tempest Shot]] at level 16 deals 614. If you keep it at level 1–3 like most of the top 10, take it out of the chain. [[14340000|Tempest Shot]] costs a lot of MP – keep holding the left mouse button, it brings MP back.',
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
          de: 'Stigma: Eine Kugel schießt 15 s lang mit (ab Stigma-Stufe 10: 30 s). Von Hand in der Eröffnung, direkt nach den Buffs.',
          en: 'Stigma: an orb shoots along for 15 s (from stigma level 10: 30 s). By hand in the opener, right after the buffs.',
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
    {
      de: '**Skillpunkte zu früh in [[14330000|Arrow Scattershot]] und die Passiven vergessen.** [[14330000|Arrow Scattershot]] geht nur, solange der Gegner taumelt – 6 der Top 10 lassen ihn auf Stufe 1–3. Dafür haben fast alle Top 10 [[14080000|Burst Arrow]] und Passive wie [[14740000|Focused Eye]] und [[14750000|Hunter\'s Resolve]] auf 10.',
      en: '**Putting skill points into [[14330000|Arrow Scattershot]] too early and forgetting the passives.** [[14330000|Arrow Scattershot]] only works while the enemy staggers – 6 of the top 10 keep it at level 1–3. Instead, almost all of the top 10 have [[14080000|Burst Arrow]] and passives like [[14740000|Focused Eye]] and [[14750000|Hunter\'s Resolve]] at 10.',
    },
  ],
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Waldläufer haben im Median **250K** Kampfkraft bei Gegenstandsstufe **3.420** (Spanne 244–257K) – Platz 1 der acht Klassen und mit ≈73 Kampfkraft pro Gegenstandsstufe auch der höchste Wert. Sie legen im Median +68K pro Woche zu, mehr als jede andere Klasse.",
      en: "The top 10 Rangers have a median **250K** Combat Power at item level **3,420** (range 244–257K) – 1st of the eight classes and, at ≈73 Combat Power per item level, also the highest value. They gain a median +68K per week, more than any other class.",
    },
    stats: { cp: 249551.5, cpMin: 244263, cpMax: 256545, itemLevel: 3420, cpPerLevel: 73.28, weekly: 68050, weeklyOf: 9, rank: { cp: 1, itemLevel: 2, cpPerLevel: 1, weekly: 1 } },
    gear: [
      {
        de: "**Waffe und Guard:** Splendent Ebony / Wise Dragon Lord Bow und Guard – alle zehn auf +15 mit Amplified +5.",
        en: "**Weapon and guard:** Splendent Ebony / Wise Dragon Lord Bow and Guard – all ten at +15 with Amplified +5.",
      },
      {
        de: "**Rüstung:** 64 von 70 Teilen Splendent (Gegenstandsstufe 102), der Rest Nuakum auf +15; 8 der 10 tragen das ganze Set, 59 Teile auf Amplified +5.",
        en: "**Armour:** 64 of 70 pieces Splendent (item level 102), the rest Nuakum at +15; 8 of the 10 wear the full set, 59 pieces at Amplified +5.",
      },
      {
        de: "**Schmuck:** alle 50 Teile Splendent auf +15 mit Amplified +5.",
        en: "**Jewellery:** all 50 pieces Splendent at +15 with Amplified +5.",
      },
      {
        de: "**Armreifen und Rest:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80), fast immer +15, plus meist ein Pilgrim Bracelet +10; Revelation Amulet +10 (9 von 10), Noble Belt +10 (8 von 10), Clash Runes im Median +5 – so hoch wie bei keiner anderen Klasse. Flügel meist Dark Veil (8).",
        en: "**Bracelets and the rest:** exactly one Ascension Bracelet (none of the top 80 wears more), nearly always +15, plus mostly a Pilgrim Bracelet +10; Revelation Amulet +10 (9 of 10), Noble Belt +10 (8 of 10), Clash Runes +5 at the median – higher than any other class. Wings mostly Dark Veil (8).",
      },
    ],
    arcana: {
      de: "**Chalice of Vigor** bei allen zehn, **Parchment of Vigor** (8), **Bell of Magic** (9) und **Mirror of Magic** (7); beim Compass ist es halb und halb. 39 von 50 Karten sind auf +5.",
      en: "**Chalice of Vigor** for all ten, **Parchment of Vigor** (8), **Bell of Magic** (9) and **Mirror of Magic** (7); the Compass is half and half. 39 of 50 cards are at +5.",
    },
    stigmas: [
      { id: 14310000, note: { de: '10 von 10 · Median Stufe 20', en: '10 of 10 · median level 20' } },
      { id: 14220000, note: { de: '9 von 10 · Median Stufe 20', en: '9 of 10 · median level 20' } },
      { id: 14380000, note: { de: '10 von 10 · Median Stufe 18', en: '10 of 10 · median level 18' } },
      { id: 14060000, note: { de: '5 von 10 · Median Stufe 15', en: '5 of 10 · median level 15' } },
    ],
    slotted: [
      { id: 14310000 /* Vaizel's Authority */, n: 10, level: 20 },
      { id: 14380000 /* Supporting Fire */, n: 10, level: 18 },
      { id: 14220000 /* Bow of Blessing */, n: 9, level: 20 },
      { id: 14060000 /* Griffon Arrow */, n: 5, level: 15 },
      { id: 14360000 /* Explosive Arrow */, n: 3, level: 10 },
      { id: 14120000 /* Ambush Kick */, n: 2, level: 13.5 },
      { id: 14350000 /* Mother Nature's Breath */, n: 1, level: 19 },
    ],
    tips: [
      {
        de: "**Eng an der Spitze:** Platz 1 und Platz 10 trennen nur 12K. Wer aufholen will, braucht die letzten Amplified-Stufen und die Nuakum-Teile auf Splendent.",
        en: "**Tight at the top:** only 12K separate 1st and 10th place. To catch up you need the last Amplified levels and the Nuakum pieces swapped for Splendent.",
      },
      {
        de: "**Clash Runes zuletzt:** Die Rune fällt bei einem Fehlschlag eine Stufe und hat keinen Bonus pro Fehlschlag – versuch +5 erst, wenn alles andere steht.",
        en: "**Clash Runes last:** the rune drops a level on a failure and has no bonus per failure – try +5 only when everything else is done.",
      },
      {
        de: "**Daevanion:** Im Median sind 65, 58 und 61 von 88 Knoten auf den ersten drei Tafeln offen, 72 von 116 auf der vierten und 36 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 65, 58 and 61 of 88 nodes are open on the first three boards, 72 of 116 on the fourth and 36 of 152 on the fifth.",
      },
    ],
  },
  sources: [
    { href: 'https://game8.co/games/Aion-2/archives/626143', label: 'Game8 – Ranger build' },
    { href: 'https://daevaguides.com/en/ranger/', label: 'Daeva Guides – Ranger' },
    { href: 'https://aion2.run/en/classes/rodeur', label: 'AION2.run – Ranger class' },
    { href: 'https://mobalytics.gg/gamebase/guides/aion-2-ranger-pve-build', label: 'Mobalytics – Ranger PvE build' },
    { href: 'https://www.inven.co.kr/board/aion2/6450/19498', label: 'Inven – Ranger board (KR)' },
    { href: 'https://gameplay.tips/guides/aion-2-ranger-rotation-and-macro-guide-pve.html', label: 'Gameplay.tips – Ranger rotation and macro (PvE)' },
    { href: 'https://aion2vault.com/builds/ranger/pve/', label: 'AION2 Vault – Ranger PvE build' },
    { href: 'https://couga54.github.io/aion2-guides/en/ranger/', label: 'AION 2 Guides – Ranger (PvE, levelling)' },
    { href: 'https://aion2-meta.com/guides/ranger/', label: 'aion2-meta – Ranger guide (Korean top players)' },
    { href: 'https://expcarry.com/aion-2-ranger-guide', label: 'Expcarry – Ranger guide' },
  ],
  caveat: {
    de: 'Builds ändern sich mit Patches. Laut Expcarry hat der globale Patch vom 14.10.2026 den Waldläufer nicht verändert. Die Skillstufen der Top 10 stammen von AION2 Index (18.10.2026); Spezialisierungen zeigt die Seite nicht, die stammen aus den Guides. Uneinig sind sich die Quellen bei [[14330000|Arrow Scattershot]] (4 der Top 10 bringen ihn auf 10, 6 lassen ihn auf 1–3), beim vierten Stigma ([[14060000|Griffon Arrow]] oder [[14360000|Explosive Arrow]]) und beim Präzisions-Ziel – eine feste Grenze für den globalen Client kennt noch niemand.',
    en: 'Builds change with patches. According to Expcarry, the global patch of 2026-10-14 did not change the Ranger. The skill levels of the top 10 come from AION2 Index (2026-10-18); that site does not show specialisations, so those follow the guides. Sources disagree on [[14330000|Arrow Scattershot]] (4 of the top 10 take it to 10, 6 keep it at 1–3), on the fourth stigma ([[14060000|Griffon Arrow]] or [[14360000|Explosive Arrow]]) and on the Accuracy target – nobody knows a fixed cap for the global client yet.',
  },
});
