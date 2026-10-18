import type { GuideBlock } from '../types';

/**
 * Playstyles of the Ranger: boss crit (the core build), solo and packs, PvP with distance and defence
 * (sources: aion2-guides.info, MetaBot, OSLink, Daeva Guides, Game8, AION2 Builds, Space4Games – skill data of the global
 * client – AION2 Index top 10 of 2026-10-18)
 */
export const rangerPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Beim Ranger bleiben drei Stigmen fast immer gleich: [[14310000|Vaizel\'s Authority]], [[14220000|Bow of Blessing]] und [[14380000|Supporting Fire]]. Die Spielstile unterscheiden sich im vierten Platz und in ein paar Skills: **Boss-Schaden** mit [[14060000|Griffon Arrow]] oder [[14360000|Explosive Arrow]], **allein und gegen Gruppen** mit Betäubung oder Rückstoß, **PvP** mit einem Schutz-Stigma. Ein Fallen- oder Tarnungs-Build lohnt sich nicht (unten).',
      en: 'For the Ranger three stigmas almost always stay the same: [[14310000|Vaizel\'s Authority]], [[14220000|Bow of Blessing]] and [[14380000|Supporting Fire]]. The playstyles differ in the fourth slot and a few skills: **boss damage** with [[14060000|Griffon Arrow]] or [[14360000|Explosive Arrow]], **solo and against packs** with a stun or a knock back, **PvP** with a protective stigma. A trap or stealth build is not worth it (below).',
    },
  },
  {
    type: 'compare',
    title: { de: 'Drei Spielstile im Vergleich', en: 'Three playstyles compared' },
    caption: {
      de: 'Zahlen der Top 10: AION2 Index, 18.10.2026. „Aktiv“ = im Stigma-Set, das die Seite beim Lesen zeigte; „bereit“ = in einem anderen Preset oder auf einer Leiste.',
      en: 'Top 10 numbers: AION2 Index, 18 Oct 2026. “Active” = in the stigma set the site showed when it was read; “ready” = on another preset or a skill bar.',
    },
    items: [
      {
        title: { de: 'Boss-Krit (Kern-Build)', en: 'Boss crit (core build)' },
        tag: { de: 'PvE · Boss', en: 'PvE · boss' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: '[[14310000|Vaizel\'s Authority]] gibt +20 % Angriff, [[14220000|Bow of Blessing]] +200 Krit. und +100 Präzision, [[14380000|Supporting Fire]] schießt mit und heilt dich ein wenig.', en: '[[14310000|Vaizel\'s Authority]] gives +20% Attack, [[14220000|Bow of Blessing]] +200 crit and +100 Accuracy, [[14380000|Supporting Fire]] shoots along and heals you a little.' } },
          { kind: 'pro', text: { de: 'Im vierten Platz [[14060000|Griffon Arrow]] (5 der Top 10 aktiv) oder [[14360000|Explosive Arrow]] (3 aktiv).', en: 'In the fourth slot [[14060000|Griffon Arrow]] (5 of the top 10 active) or [[14360000|Explosive Arrow]] (3 active).' } },
          { kind: 'con', text: { de: 'Kein Schutz-Stigma: Kommt dir ein Gegner nah, hast du nur Ausweichen und Laufen.', en: 'No protective stigma: when an enemy gets close, you only have dodging and running.' } },
        ],
        verdict: { de: 'Standard für Dungeons und Bosse. [[14310000|Vaizel\'s Authority]] und [[14380000|Supporting Fire]] haben alle zehn aktiv, [[14220000|Bow of Blessing]] neun.', en: 'The default for dungeons and bosses. All ten have [[14310000|Vaizel\'s Authority]] and [[14380000|Supporting Fire]] active, nine [[14220000|Bow of Blessing]].' },
      },
      {
        title: { de: 'Allein und gegen Gruppen', en: 'Solo and against packs' },
        tag: { de: 'Solo · Farmen', en: 'Solo · farming' },
        tone: 'teal',
        points: [
          { kind: 'pro', text: { de: '[[14270000|Arrow Storm]] trifft bis zu 4 Gegner und betäubt Monster sicher 3 s; ab Stigma-Stufe 10 verlangsamt er sie 10 s lang – dann trifft [[14080000|Burst Arrow]].', en: '[[14270000|Arrow Storm]] hits up to 4 enemies and stuns monsters for sure for 3 s; from stigma level 10 it slows them for 10 s – then [[14080000|Burst Arrow]] can hit.' } },
          { kind: 'pro', text: { de: '[[14120000|Ambush Kick]] stößt einen nahen Gegner zurück und bringt dich auf Abstand; ab Stigma-Stufe 10 mit einem Schutzschild von 10 % deiner max. LP.', en: '[[14120000|Ambush Kick]] knocks a close enemy back and puts distance between you; from stigma level 10 with a shield of 10% of your max HP.' } },
          { kind: 'con', text: { de: 'Am Boss fehlt dir der Schaden von [[14060000|Griffon Arrow]] oder [[14360000|Explosive Arrow]].', en: 'On a boss you lack the damage of [[14060000|Griffon Arrow]] or [[14360000|Explosive Arrow]].' } },
        ],
        verdict: { de: 'Für Farmen, Quests und das Leveln. 3 der Top 10 halten [[14270000|Arrow Storm]] bereit, einer spielt [[14120000|Ambush Kick]] im vierten Platz.', en: 'For farming, quests and levelling. 3 of the top 10 keep [[14270000|Arrow Storm]] ready, one runs [[14120000|Ambush Kick]] in the fourth slot.' },
      },
      {
        title: { de: 'PvP: Abstand und Schutz', en: 'PvP: distance and defence' },
        tag: 'PvP',
        tone: 'rose',
        points: [
          { kind: 'pro', text: { de: '[[14350000|Mother Nature\'s Breath]]: 6 s lang +10 % PvP-Schadensresistenz und +200 Widerstand gegen Krit.; mit 50 % Chance holst du dir 25 % des Schadens als LP zurück. Ab Stigma-Stufe 5 entfernt es Schaden über Zeit.', en: '[[14350000|Mother Nature\'s Breath]]: +10% PvP Damage Tolerance and +200 Critical Hit Resist for 6 s; with a 50% chance you get 25% of the damage back as HP. From stigma level 5 it removes damage over time.' } },
          { kind: 'pro', text: { de: '[[14120000|Ambush Kick]] gegen Nahkämpfer – ab Stigma-Stufe 15 betäubt er mit 50 % Chance.', en: '[[14120000|Ambush Kick]] against melee classes – from stigma level 15 it stuns with a 50% chance.' } },
          { kind: 'con', text: { de: 'Wenig Daten: Die Guides nennen nur einzelne PvP-Tausche, keinen ganzen Build, und nur einer der Top 10 spielt so ein Set aktiv.', en: 'Little data: the guides only name single PvP swaps, no full build, and only one of the top 10 runs such a set active.' } },
        ],
        verdict: { de: 'Auf ein zweites Preset. OSLink sieht den Ranger am stärksten in großen Kämpfen und verwundbar aus der Nähe – gegen die Nähe hilft dieses Set.', en: 'On a second preset. OSLink sees the Ranger as strongest in large fights and vulnerable up close – this set helps against the close range.' },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'info',
    title: { de: 'Stil wechseln: Presets', en: 'Switching styles: presets' },
    text: {
      de: 'Leg jeden Stil auf ein eigenes **Skill-Preset** – der globale Client hat 3. Jedes Preset hat seine eigenen Stigmen. Der Wechsel kostet nichts, geht aber nicht im Kampf und nicht, solange ein Stigma abklingt oder du einen Skill auflädst. **Skillpunkte** setzt du kostenlos und ohne Wartezeit zurück; danach wählst du die Spezialisierungen neu. Einen Daevanion-Knoten zurückzugeben kostet etwa 500 Kina. Offen ist, was ein neues Stigma kostet: Ein Spieler im globalen Client berichtet, dass jedes Preset die Stigma-Punkte für sich verteilt – dann kostet ein zweites Preset nichts. Sonst brauchst du für ein neues Stigma 5 Stigma Shards bis Stufe 5, 15 bis 10, 35 bis 15 und 75 bis 20. Schau im zweiten Preset nach, wie viele Stigma-Punkte frei sind.',
      en: 'Put each style on a **skill preset** of its own – the global client has 3. Every preset has its own stigmas. Switching costs nothing, but it does not work in combat, while a stigma is on cooldown or while you charge a skill. **Skill points** reset for free with no cooldown; afterwards you pick your specialisations again. Refunding a Daevanion node costs about 500 Kina. What a new stigma costs is still open: a player on the global client reports that every preset spreads the stigma points on its own – then a second preset costs nothing. Otherwise a new stigma takes 5 Stigma Shards to level 5, 15 to 10, 35 to 15 and 75 to 20. Check how many stigma points are free in your second preset.',
    },
  },
  { type: 'heading', text: { de: 'Allein und gegen Gruppen: betäuben und Abstand halten', en: 'Solo and against packs: stun and keep your distance' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, { de: 'Allein und gegen Gruppen', en: 'Solo and against packs' }],
    rows: [
      [
        { de: '4. Stigma', en: '4th stigma' },
        { de: '[[14060000|Griffon Arrow]] oder [[14360000|Explosive Arrow]]', en: '[[14060000|Griffon Arrow]] or [[14360000|Explosive Arrow]]' },
        { de: '[[14270000|Arrow Storm]] gegen Gruppen – die Wahl, die aion2-guides.info fürs Farmen nennt – oder [[14120000|Ambush Kick]], wenn dich Nahkämpfer erreichen. Ein Top-10-Spieler spielt: [[14220000|Bow of Blessing]], [[14310000|Vaizel\'s Authority]], [[14380000|Supporting Fire]], [[14120000|Ambush Kick]] 12', en: '[[14270000|Arrow Storm]] against packs – the pick aion2-guides.info names for farming – or [[14120000|Ambush Kick]] when melee enemies reach you. One top 10 player runs: [[14220000|Bow of Blessing]], [[14310000|Vaizel\'s Authority]], [[14380000|Supporting Fire]], [[14120000|Ambush Kick]] 12' },
      ],
      [
        '[[14380000|Supporting Fire]]',
        { de: 'bleibt', en: 'stays' },
        { de: 'bleibt auch allein: Jeder Schuss der Kugel heilt dich um 1,5 % LP. Alle zehn Top-Ranger behalten es – die beiden mit [[14120000|Ambush Kick]] aktiv geben dafür den vierten Platz ab, einer von ihnen auch [[14220000|Bow of Blessing]]', en: 'stays solo too: every shot of the orb heals you by 1.5% HP. All ten top Rangers keep it – the two with [[14120000|Ambush Kick]] active give up the fourth slot for it instead, one of them also [[14220000|Bow of Blessing]]' },
      ],
      [
        { de: 'So ziehst du Gruppen', en: 'How you pull packs' },
        '–',
        { de: 'Mit [[14020000|Snipe]] mehrere Gegner anlocken, mit [[14090000|Marking Shot]] Abstand nehmen (der Skill bewegt dich in die Richtung, die du drückst), [[14170000|Explosion Trap]] legen, dann das Makro (aion2-guides.info). [[14130000|Snare Shot]] verlangsamt bis zu 4 Gegner – darauf trifft [[14080000|Burst Arrow]], und [[14360000|Explosive Arrow]] macht 20 % mehr Schaden', en: 'Draw several enemies with [[14020000|Snipe]], step away with [[14090000|Marking Shot]] (the skill moves you in the direction you press), lay [[14170000|Explosion Trap]], then the macro (aion2-guides.info). [[14130000|Snare Shot]] slows up to 4 enemies – [[14080000|Burst Arrow]] hits those, and [[14360000|Explosive Arrow]] deals 20% more damage to them' },
      ],
      [
        { de: 'Spezialisierungen', en: 'Specialisations' },
        { de: 'auf Bosse ausgelegt', en: 'made for bosses' },
        { de: 'siehe unten: [[14170000|Explosion Trap]] zieht Gegner zusammen, [[14080000|Burst Arrow]] heilt dich', en: 'see below: [[14170000|Explosion Trap]] pulls enemies together, [[14080000|Burst Arrow]] heals you' },
      ],
      [
        { de: 'Werte und Ausrüstung', en: 'Stats and gear' },
        { de: 'Schaden', en: 'damage' },
        { de: 'gleich – nichts zu tauschen', en: 'the same – nothing to swap' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 14170000 /* Explosion Trap */,
        parts: [14170010 /* Pulls enemies on explosion */, 14170020 /* +1s Stun duration */, 14170050 /* +1 consecutive use */],
        note: {
          de: 'Die Falle zieht die Gegner zusammen, sodass deine Flächen-Skills alle treffen, und betäubt sie 1 s länger (Monster betäubt sie ohnehin sicher). Ab Skillstufe 16 legst du zwei Fallen hintereinander (dritter Platz ab 20).',
          en: 'The trap pulls the enemies together, so your area skills hit them all, and stuns them 1 s longer (it stuns monsters for sure anyway). From skill level 16 you lay two traps in a row (third slot from 20).',
        },
      },
      {
        id: 14080000 /* Burst Arrow */,
        parts: [14080010 /* Absorbs 10% HP */],
        note: {
          de: 'Trifft verlangsamte oder festgehaltene Gegner und holt dir dabei 10 % LP zurück.',
          en: 'Hits slowed or rooted enemies and takes 10% HP back for you.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Farmen, Quests und das Leveln. Für Bosse zurück zum Kern-Build – laut aion2-guides.info sind [[14170000|Explosion Trap]] und [[14070000|Suppressing Arrow]] nichts für Endgame-Bosse. **Kosten:** [[14270000|Arrow Storm]] auf Stufe 10 (Trägheit) braucht 15 Stigma Shards; [[14120000|Ambush Kick]] auf 10 (Schutzschild) ebenfalls 15. Die Spezialisierungen wählst du kostenlos um; die Ausrüstung bleibt gleich.',
      en: 'For farming, quests and levelling. Go back to the core build for bosses – according to aion2-guides.info, [[14170000|Explosion Trap]] and [[14070000|Suppressing Arrow]] are not for endgame bosses. **Costs:** [[14270000|Arrow Storm]] at level 10 (Slow) takes 15 Stigma Shards; [[14120000|Ambush Kick]] at 10 (shield) also 15. You change the specialisations for free; your gear stays the same.',
    },
  },
  { type: 'heading', text: { de: 'PvP: Abstand halten und überleben', en: 'PvP: keep your distance and survive' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Kern-Build ändert', en: 'What changes compared with the core build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Kern-Build', en: 'Core build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        { de: '[[14310000|Vaizel\'s Authority]], [[14220000|Bow of Blessing]], [[14380000|Supporting Fire]] + [[14060000|Griffon Arrow]] / [[14360000|Explosive Arrow]]', en: '[[14310000|Vaizel\'s Authority]], [[14220000|Bow of Blessing]], [[14380000|Supporting Fire]] + [[14060000|Griffon Arrow]] / [[14360000|Explosive Arrow]]' },
        { de: '[[14350000|Mother Nature\'s Breath]] und [[14120000|Ambush Kick]] statt [[14220000|Bow of Blessing]] und dem vierten Platz. So spielt es ein Top-10-Spieler aktiv: [[14380000|Supporting Fire]] 20, [[14310000|Vaizel\'s Authority]] 20, [[14350000|Mother Nature\'s Breath]] 19, [[14120000|Ambush Kick]] 15', en: '[[14350000|Mother Nature\'s Breath]] and [[14120000|Ambush Kick]] instead of [[14220000|Bow of Blessing]] and the fourth slot. One top 10 player runs it active: [[14380000|Supporting Fire]] 20, [[14310000|Vaizel\'s Authority]] 20, [[14350000|Mother Nature\'s Breath]] 19, [[14120000|Ambush Kick]] 15' },
      ],
      [
        { de: 'Andere Wahl', en: 'Other choice' },
        '–',
        { de: 'MetaBot tauscht [[14380000|Supporting Fire]] und [[14060000|Griffon Arrow]] gegen [[14270000|Arrow Storm]] (Betäubung auf 4 Ziele) und [[14360000|Explosive Arrow]] – mehr Schaden und Kontrolle, aber kein Schutz', en: 'MetaBot swaps [[14380000|Supporting Fire]] and [[14060000|Griffon Arrow]] for [[14270000|Arrow Storm]] (a stun on 4 targets) and [[14360000|Explosive Arrow]] – more damage and control, but no defence' },
      ],
      [
        { de: 'Wichtige Stigma-Stufen', en: 'Key stigma levels' },
        '–',
        { de: '[[14350000|Mother Nature\'s Breath]] 5: entfernt Schaden über Zeit und macht 6 s immun dagegen · 10: Abklingzeit 72 statt 90 s · 20: 52 s. [[14120000|Ambush Kick]] 15: 50 % Betäubung · 20: +50 %', en: '[[14350000|Mother Nature\'s Breath]] 5: removes damage over time and makes you immune to it for 6 s · 10: cooldown 72 instead of 90 s · 20: 52 s. [[14120000|Ambush Kick]] 15: 50% stun · 20: +50%' },
      ],
      [
        { de: 'Skills höher', en: 'Skills higher' },
        '–',
        { de: '[[14760000|Unyielding Resolve]] auf 10 (+22 % Widerstand gegen Schwächungs- und Schock-Effekte) – 3 der Top 10 haben das, darunter beide mit [[14120000|Ambush Kick]] aktiv. Dazu [[14260000|Defiance]], [[14170000|Explosion Trap]] und [[14070000|Suppressing Arrow]] (betäubt Spieler mit 40 % Chance, solange „Präzision“ aktiv ist) – beide laut aion2-guides.info für PvP gedacht', en: '[[14760000|Unyielding Resolve]] to 10 (+22% Ailment-type and Impact-type Resist) – 3 of the top 10 have that, among them both with [[14120000|Ambush Kick]] active. Plus [[14260000|Defiance]], [[14170000|Explosion Trap]] and [[14070000|Suppressing Arrow]] (stuns players with a 40% chance while “Precision” is active) – aion2-guides.info sees both as PvP skills' },
      ],
      [
        { de: 'Bleibt wichtig', en: 'Stays important' },
        { de: 'wie im Kern-Build', en: 'as in the core build' },
        { de: '[[14050000|Drill Dart]] (60 % weniger Heilung beim Ziel), [[14130000|Snare Shot]] (-40 % Laufgeschwindigkeit) und [[14010000|Deadshot]] im Laufen – das hast du schon', en: '[[14050000|Drill Dart]] (60% less healing on the target), [[14130000|Snare Shot]] (-40% Move Speed) and [[14010000|Deadshot]] while moving – you already have those' },
      ],
      [
        { de: 'Ausrüstung und Daevanion', en: 'Gear and Daevanion' },
        { de: 'PvE-Ausrüstung, Nezekan bis Triniel', en: 'PvE gear, Nezekan to Triniel' },
        { de: 'Ausrüstung gleich; dazu **Azphel**: bezahlt mit Kampfkristallen aus dem PvP, die Werte zählen nur gegen Spieler', en: 'gear the same; plus **Azphel**: paid with Battle Crystals from PvP, its stats only count against players' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 14130000 /* Snare Shot */,
        parts: [14130010 /* +20% Move Speed reduction */, 14130050 /* +2s Slow and Root duration */],
        note: {
          de: 'Unsere Wahl aus den Skilltexten: stärker und ab Skillstufe 16 auch 2 s länger verlangsamt – Nahkämpfer kommen schwerer an dich heran.',
          en: 'Our pick from the skill texts: a stronger slow, and from skill level 16 one that lasts 2 s longer – melee classes have a harder time reaching you.',
        },
      },
      {
        id: 14260000 /* Defiance */,
        parts: [14260030 /* Restores 20% HP on using [Defiance] */, 14260040 /* +2s Tenacity duration */, 14260050 /* +50% PvE / +25% PvP Damage Tolerance for Tenacity duration */],
        note: {
          de: '20 % LP beim Befreien und 2 s länger immun gegen Kontrolle; ab Skillstufe 16 nimmst du währenddessen auch weniger Schaden – das nennt auch aion2-guides.info.',
          en: '20% HP when you break free and 2 s longer immune to control; from skill level 16 you also take less damage during it – aion2-guides.info names that too.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Abyss, Arena und PvP in der offenen Welt – vor dem Kampf, denn im Kampf lässt sich das Preset nicht wechseln. **Kosten:** [[14350000|Mother Nature\'s Breath]] auf Stufe 5 braucht 5 Stigma Shards, auf 10 15; [[14120000|Ambush Kick]] auf 15 (Betäubung) 35. [[14760000|Unyielding Resolve]] von 1 auf 10 kostet 21 Skillpunkte, die du kostenlos umverteilst. Die Ausrüstung bleibt gleich. Weil es für den Ranger noch keinen ganzen PvP-Build gibt, ist dieses Set ein Startpunkt, kein fertiger Build.',
      en: 'For the Abyss, the Arena and open-world PvP – before the fight, because the preset cannot be switched in combat. **Costs:** [[14350000|Mother Nature\'s Breath]] at level 5 takes 5 Stigma Shards, at 10 15; [[14120000|Ambush Kick]] at 15 (stun) 35. [[14760000|Unyielding Resolve]] from 1 to 10 costs 21 skill points, which you move for free. Your gear stays the same. Because there is no full PvP build for the Ranger yet, this set is a starting point, not a finished build.',
    },
  },
  {
    type: 'callout',
    tone: 'warn',
    title: { de: 'Lohnt sich nicht: Fallen- und Tarnungs-Ranger', en: 'Not worth it: trap and stealth Ranger' },
    text: {
      de: 'Die Stigmen [[14190000|Stealth]] (10 s Tarnung, nur außerhalb des Kampfes), [[14180000|Ensnaring Trap]], [[14160000|Sealing Arrow]] und [[14150000|Illusory Arrow]] spielt keiner der Top 10 – weder aktiv noch bereit –, und kein Guide baut einen Fallen- oder Tarnungs-Build. Deine Falle für Gruppen ist der normale Skill [[14170000|Explosion Trap]]. Auch [[14330000|Arrow Scattershot]] hoch zu spielen ist nur am Anfang eine Hilfe: Laut aion2-guides.info ist er im Endgame der erste Skill, den du wieder aufgibst.',
      en: 'None of the top 10 runs the stigmas [[14190000|Stealth]] (10 s of stealth, only out of combat), [[14180000|Ensnaring Trap]], [[14160000|Sealing Arrow]] or [[14150000|Illusory Arrow]] – neither active nor ready – and no guide builds a trap or stealth build. Your trap for packs is the normal skill [[14170000|Explosion Trap]]. Playing [[14330000|Arrow Scattershot]] high only helps early on, too: according to aion2-guides.info it is the first skill you give up again in the endgame.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Der vierte Platz der Top 10 und die Schutz-Stigmen', en: 'The fourth slot of the top 10 and the protective stigmas' },
    caption: {
      de: 'Wie viele der Top 10 das Stigma aktiv haben oder bereithalten. „Bereit“ heißt: Es liegt in einem anderen Preset oder auf einer Leiste – AION2 Index zeigt es als ausgerüstet, aber ohne Stufe. Gold: Kern-Build, Türkis: allein und gegen Gruppen, Rot: PvP, Grau: in beiden Stilen oder von niemandem gespielt. Vaizels Hoheit, Segensbogen und Unterstützungsfeuer haben alle zehn. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'How many of the top 10 have the stigma active or keep it ready. “Ready” means: it sits on another preset or a skill bar – AION2 Index shows it as equipped but without a level. Gold: core build, teal: solo and against packs, red: PvP, grey: in both styles or played by no one. All ten have Vaizel\'s Authority, Bow of Blessing and Supporting Fire. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    max: 10,
    items: [
      { label: '[[14060000|Griffon Arrow]]', value: 7, display: { de: '7 von 10', en: '7 of 10' }, note: { de: '5 aktiv · 2 bereit', en: '5 active · 2 ready' }, tone: 'gold' },
      { label: '[[14360000|Explosive Arrow]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '3 aktiv · 1 bereit', en: '3 active · 1 ready' }, tone: 'gold' },
      { label: '[[14120000|Ambush Kick]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '2 aktiv · 2 bereit', en: '2 active · 2 ready' }, tone: 'slate' },
      { label: '[[14270000|Arrow Storm]]', value: 3, display: { de: '3 von 10', en: '3 of 10' }, note: { de: '0 aktiv · 3 bereit', en: '0 active · 3 ready' }, tone: 'teal' },
      { label: '[[14350000|Mother Nature\'s Breath]]', value: 3, display: { de: '3 von 10', en: '3 of 10' }, note: { de: '1 aktiv · 2 bereit', en: '1 active · 2 ready' }, tone: 'rose' },
      { label: '[[14190000|Stealth]]', value: 0, display: { de: '0 von 10', en: '0 of 10' }, note: { de: 'wie die Stigmen für Falle, Siegel und Blind', en: 'like the trap, seal and blind stigmas' }, tone: 'slate' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://aion2-guides.info/en/ranger/', label: 'AION 2 Guides – Ranger (boss builds, pack farming, PvP notes, traps)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (PvP swaps)' },
      { href: 'https://www.oslink.io/blog/guide/aion-2-class-guide-and-tier-list.html', label: 'OSLink – Class guide and tier list (Ranger in large fights and up close)' },
      { href: 'https://daevaguides.com/en/guides/stigmas-guide/', label: 'Daeva Guides – Stigma guide (shard costs, reset cost)' },
      { href: 'https://game8.co/games/Aion-2/archives/629160', label: 'Game8 – How to respec skills and Daevanion' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, Daevanion refund)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
    ],
  },
];
