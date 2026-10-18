import type { Guide } from '../types';

/**
 * Levelling 1 → 45 fast on the global client. Rests on the owner's own test run (5 h 14 min), the EXP figures of the
 * global client's data tables as published by MetaBot (checked 2026-10-15; All Things How prints the same totals),
 * route and Ascension Gauge guides (sources) and the skill-point data of this planner (public/data/en/skill-points.json).
 * There are no public level-by-time splits, so the guide shows no level-over-time curve.
 */
export const speedrun45: Guide = {
  id: 'speedrun-45',
  icon: 'speed',
  tone: 'gold',
  category: 'world',
  title: {
    de: 'Speedrun: in rund 5 Stunden auf Stufe 45',
    en: 'Speedrun: level 45 in about 5 hours',
  },
  summary: {
    de: 'Nur die goldenen Story-Missionen plus die wenigen Nebenmissionen, die die Sperren auf Stufe 22 und 32 verlangen – alles andere erst ab Stufe 45. Mit Route, EP-Kurve, Zeiten und dem, was du danach nachholst.',
    en: 'Only the golden story missions plus the few side missions the gates at level 22 and 32 ask for – everything else waits until level 45. With the route, the EXP curve, times and what to catch up on afterwards.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Leveln', en: 'Levelling' },
    { de: 'Route', en: 'Route' },
    { de: 'Einsteiger', en: 'Beginner' },
    { de: 'Stufe 1–45', en: 'Level 1–45' },
  ],
  basis: {
    de: 'Eigener Testlauf auf dem globalen Server (5 Std. 14 Min.), dazu die EP-Zahlen aus den Daten des globalen Clients (MetaBot), Routen- und Aufstiegs-Guides und die Skillpunkt-Daten dieses Planers (Quellen unten)',
    en: 'Own test run on the global server (5 h 14 min), plus the EXP figures from the global client’s data (MetaBot), route and Ascension guides and the skill-point data of this planner (sources below)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: { de: '5 Std. 14 Min.', en: '5 h 14 min' }, label: { de: 'Referenzlauf', en: 'reference run' }, note: { de: 'eigener Testlauf, globaler Server', en: 'own test run, global server' }, tone: 'gold' },
            { value: { de: '754,8 Mio.', en: '754.8M' }, label: { de: 'EP von Stufe 1 bis 45', en: 'EXP from level 1 to 45' }, note: { de: '70 % davon allein für die Stufen 40–45', en: '70% of it for levels 40–45 alone' }, tone: 'blue' },
            { value: '97–99 %', label: { de: 'davon aus Story-Quests', en: 'of it from story quests' }, note: { de: 'Elyos 97 %, Asmodier 99 %', en: 'Elyos 97%, Asmodians 99%' }, tone: 'teal' },
            { value: '2', label: { de: 'Sperren', en: 'gates' }, note: { de: 'Stufe 22 und 32: Aufstiegsleiste füllen', en: 'level 22 and 32: fill the Ascension Gauge' }, tone: 'violet' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die eine Regel', en: 'The one rule' },
          text: {
            de: 'Solange du levelst, zählen die **goldenen (gelben) Story-Missionen**. Grüne Nebenmissionen machst du nur, wenn die Story dich auf Stufe 22 und 32 anhält. Alles andere läuft dir nicht weg und wartet, bis du Stufe 45 bist.',
            en: 'While you level, the **golden (yellow) story missions** count. You only do green side missions when the story stops you at level 22 and 32. Everything else will still be there when you reach level 45.',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Ziel', en: 'Goal' }, value: { de: 'Charakterstufe 45 – die Höchststufe im globalen Client (Korea ist mit einer späteren Version schon bei 50)', en: 'Character level 45 – the cap in the global client (Korea is already at 50 with a later version)' } },
            { label: { de: 'Missionen', en: 'Missions' }, value: { de: 'Goldene Story-Missionen + die grünen, die die zwei Sperren brauchen (Referenzlauf: 3–4)', en: 'Golden story missions + the green ones the two gates need (reference run: 3–4)' } },
            { label: { de: 'Unterwegs', en: 'On the way' }, value: { de: 'Versiegelte Dungeons nur, wenn sie direkt am Weg liegen', en: 'Sealed dungeons only if they lie right on your way' } },
            { label: { de: 'Später', en: 'Later' }, value: { de: 'Gruppen-Dungeons, restliche Nebenmissionen, Shops', en: 'Group dungeons, the remaining side missions, shops' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Warum nur die Story?', en: 'Why only the story?' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Weil sie fast alle EP bringt. Bis Stufe 45 brauchst du 754,8 Mio. EP. Die Story-Quests (im Spiel „Episode“) zahlen davon 731,6 Mio. bei den Elyos und 748,8 Mio. bei den Asmodiern. **Alle** grünen Regional-Quests unter Stufe 45 zusammen bringen nur rund 10–11 Mio. – weniger als 2 %. Eine einzelne Story-Quest ist oft ein großes Stück einer Stufe (englische Quest-Namen): „Kaisinel’s Seal“ auf Stufe 21 bringt 70 % dieser Stufe, „Where the Drana Flows“ auf Stufe 40 rund 40 %.',
            en: 'Because it pays almost all the EXP. To reach level 45 you need 754.8M EXP. The story quests (“Episode” in game) pay 731.6M of it for Elyos and 748.8M for Asmodians. **All** green regional quests below level 45 together pay only about 10–11M – less than 2%. A single story quest is often a big part of a level: “Kaisinel’s Seal” at level 21 pays 70% of that level, “Where the Drana Flows” at level 40 about 40%.',
          },
        },
        {
          type: 'shares',
          title: { de: 'Woher die EP bis Stufe 45 kommen (Elyos)', en: 'Where the EXP to level 45 comes from (Elyos)' },
          caption: {
            de: 'Daten des globalen Clients laut MetaBot (15.10.2026). Der Rest ist ausgerechnet: was Story und grüne Quests nicht abdecken – Monster am Weg, versiegelte Dungeons. Bei den Asmodiern deckt die Story allein 99 %.',
            en: 'Global client data according to MetaBot (2026-10-15). The rest is computed: what story and green quests do not cover – monsters on the way, sealed dungeons. For Asmodians the story alone covers 99%.',
          },
          unit: { de: 'Mio. EP', en: 'M EXP' },
          items: [
            { label: { de: 'Story-Quests (gold)', en: 'Story quests (gold)' }, value: 731.6, tone: 'gold' },
            { label: { de: 'Grüne Regional-Quests', en: 'Green regional quests' }, value: 10, tone: 'teal' },
            { label: { de: 'Der Rest', en: 'The rest' }, note: { de: 'Monster, versiegelte Dungeons', en: 'monsters, sealed dungeons' }, value: 13.2, tone: 'slate' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Du verpasst nichts', en: 'You miss nothing' },
          text: {
            de: 'Nebenmissionen, versiegelte Dungeons und Strongholds bleiben, und ihre Belohnungen auch: 58 grüne Quests geben je 1 Skillpunkt, jeder versiegelte Dungeon deiner Fraktion beim ersten Abschluss 2 Skillpunkte und 2 Daevanion-Kristalle. Die Gegner in alten Gebieten wachsen mit deiner Stufe mit – leichter wird es dadurch nicht, aber mit Stufe 45 hast du alle Skills und Stigma-Plätze.',
            en: 'Side missions, sealed dungeons and strongholds stay, and so do their rewards: 58 green quests give 1 skill point each, every sealed dungeon of your faction gives 2 skill points and 2 Daevanion crystals on its first clear. Enemies in old zones grow with your level – that does not make them easier, but at level 45 you have all your skills and stigma slots.',
          },
        },
      ],
    },
    {
      title: { de: 'Die Route nach Stufen', en: 'The route by level' },
      blocks: [
        {
          type: 'flow',
          title: { de: 'Von Stufe 1 bis 45', en: 'From level 1 to 45' },
          caption: {
            de: 'Freischaltungen laut den Spieldaten dieses Planers (Daevanion-Tafeln, Stigma-Plätze) und MetaBot; Sperren laut All Things How und Gaming Pro Max. Die Route ist für jede Klasse gleich.',
            en: 'Unlocks from this planner’s game data (Daevanion boards, stigma slots) and MetaBot; gates from All Things How and Gaming Pro Max. The route is the same for every class.',
          },
          items: [
            {
              title: { de: 'Startgebiet', en: 'Starting zone' },
              text: { de: 'Poeta (Elyos) oder Ishalgen (Asmodier). Nur Story – sie bringt genau die EP bis Stufe 10. Flügel ab Stufe 5 (Asmodier 6).', en: 'Poeta (Elyos) or Ishalgen (Asmodians). Story only – it pays exactly the EXP to level 10. Wings from level 5 (Asmodians 6).' },
              tag: '1–9',
              tone: 'teal',
            },
            {
              title: { de: 'Verteron / Altgard', en: 'Verteron / Altgard' },
              text: { de: 'Story; versiegelte Dungeons nur am Weg. Erste Daevanion-Tafel ab 12, zweite ab 20.', en: 'Story; sealed dungeons only on your way. First Daevanion board from 12, second from 20.' },
              tag: '10–21',
              tone: 'blue',
            },
            {
              title: { de: 'Sperre 1: Aufstieg', en: 'Gate 1: Ascension' },
              text: { de: 'Aufstiegsleiste auf 100 % (3–5 grüne Quests), dann die Aufstiegs-Quest: bessere Flügel und Stigmen.', en: 'Ascension Gauge to 100% (3–5 green quests), then the Ascension quest: better wings and stigmas.' },
              tag: '22',
              tone: 'violet',
            },
            {
              title: { de: 'Weiter der Story nach', en: 'On along the story' },
              text: { de: 'Zweiter Stigma-Platz ab 27, dritte Tafel ab 30. Ab Stufe 30 wird es spürbar langsamer.', en: 'Second stigma slot from 27, third board from 30. From level 30 it gets noticeably slower.' },
              tag: '23–31',
              tone: 'blue',
            },
            {
              title: { de: 'Sperre 2: Aufstieg', en: 'Gate 2: Ascension' },
              text: { de: 'Wieder 100 % (2–4 grüne Quests), dann die Aufstiegs-Quest: bessere Flügel, mehr Daevanion-Knoten. Dritter Stigma-Platz.', en: '100% again (2–4 green quests), then the Ascension quest: better wings, more Daevanion nodes. Third stigma slot.' },
              tag: '32',
              tone: 'violet',
            },
            {
              title: { de: 'Der lange Anstieg', en: 'The long climb' },
              text: { de: 'Stufe 30 bis 45 kostet 97 % aller EP. Nur Story; vierter Stigma-Platz ab 37, vierte Tafel ab 40.', en: 'Levels 30 to 45 cost 97% of all EXP. Story only; fourth stigma slot from 37, fourth board from 40.' },
              tag: '33–44',
              tone: 'blue',
            },
            {
              title: { de: 'Finale', en: 'Finale' },
              text: { de: 'Ende der Story: Klassenwaffe, Ascension Bracelet, beste Flügel, Azphel-Tafel. Jetzt holst du alles nach.', en: 'End of the story: class weapon, Ascension Bracelet, best wings, Azphel board. Now you catch up on everything.' },
              tag: '45',
              tone: 'gold',
            },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Gebiete nach Stufe (Namen aus dem englischen Client, laut MetaBot)', en: 'Zones by level (according to MetaBot)' },
          head: ['Elyos', { de: 'Asmodier', en: 'Asmodians' }],
          rows: [
            ['**1–9** · Poeta', '**1–9** · Ishalgen'],
            ['**10–13** · Western / Eastern Cantas Valley', '**10–14** · Dredgion Crash Site, Calderon Canyon, Nameless Cemetery'],
            ["**14–18** · Ellun River Marsh, Spirit's Rest, Anguish Hill", '**15–21** · Silent Hill, Sanctum Outpost, Tranein Highland, Moslan Forest'],
            ['**19–22** · Verteron Fortress Ruins, Destroyed Abyss Gate', '**22–28** · Uruthumheim, Purifying Forest'],
            ["**23–31** · Tolbas Forest, Pilgrim's Ridge, Forest of Exiles, Aullaeu Village", '**29–32** · Dranactus'],
            ['**32–38** · Altamia Canyon / Highlands, Rock Tomb Hill, Destroyed Temple Site', '**32–35** · Battlescar Mound, Basfelt Ruins'],
            [{ de: '**39–42** · Kraka Footpath, Drana-Gebiete, Scarlet Forest', en: '**39–42** · Kraka Footpath, Drana areas, Scarlet Forest' },"**35–40** · Fafnite Deposit, Gribade Highland, Idun's Lake"],
            ['**43–45** · Nahid Brigade Fortress, Garden of the Illusion God', '**41–45** · Black Claw Village, Lagta Fortress, Impetusium Square'],
          ],
        },
      ],
    },
    {
      title: { de: 'Schritt für Schritt', en: 'Step by step' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Nur die goldenen Story-Missionen machen', en: 'Only do the golden story missions' },
              text: {
                de: 'Folge ausschließlich der Hauptgeschichte – das sind die goldenen Missionen. Sie führen dich ohne Umwege durch alle Gebiete. Mit **Alt + Nummer** der verfolgten Quest läufst du automatisch hin (laut Daeva Guides).',
                en: 'Follow the main story only – these are the golden missions. They lead you through every zone without detours. With **Alt + the number** of the tracked quest you run there automatically (according to Daeva Guides).',
              },
            },
            {
              title: { de: 'Grüne Missionen nur für die Sperren', en: 'Green missions only for the gates' },
              text: {
                de: 'Auf Stufe 22 und 32 hält die Story an, bis die Aufstiegsleiste voll ist (nächster Abschnitt). Nimm dafür grüne Missionen, die ohnehin am Weg liegen. Unser Referenzlauf kam mit **3–4** aus; die Route von All Things How nimmt 3 auf Stufe 22 und 2 auf Stufe 32. Ist eine Story-Quest einmal deutlich über deiner Stufe, hilft am schnellsten ein versiegelter Dungeon in der Nähe.',
                en: 'At level 22 and 32 the story stops until the Ascension Gauge is full (next section). Use green missions that are on your way anyway. Our reference run got by with **3–4**; the All Things How route takes 3 at level 22 and 2 at level 32. If a story quest is ever well above your level, a sealed dungeon nearby helps fastest.',
              },
            },
            {
              title: { de: 'Dungeons: nur die versiegelten am Weg', en: 'Dungeons: only the sealed ones on your way' },
              text: {
                de: '**Versiegelte Dungeons** sind kurze Solo-Instanzen: Liegt einer direkt am Weg, nimm ihn mit (2 Skillpunkte, 2 Daevanion-Kristalle, etwas Aufstiegsleiste) – aber lauf nicht quer über die Karte. Für die zähe Strecke 30–39 empfiehlt All Things How die „Höhle der Besiegten“ (Stufe 35, Elyos). **Gruppen-Dungeons** warten bis Stufe 45 – sie kosten mehr Zeit, als sie beim Leveln bringen.',
                en: '**Sealed dungeons** are short solo instances: if one lies right on your way, take it (2 skill points, 2 Daevanion crystals, a bit of Ascension Gauge) – but do not cross the map for one. For the slow 30–39 stretch All Things How recommends the “Cave of the Defeated” (level 35, Elyos). **Group dungeons** wait until level 45 – they cost more time than they give while levelling.',
              },
            },
            {
              title: { de: 'Punkte sofort verteilen, Ausrüstung schlank halten', en: 'Spend points at once, keep gear lean' },
              text: {
                de: 'Skill- und Daevanion-Punkte gleich ausgeben und ab Stufe 22 die Stigmen einsetzen – ein stärkerer Charakter tötet Story-Bosse schneller. Die Waffe zuerst verbessern. Amulett und Gürtel bis +10 – bis dahin gelingt jede Stufe. Nichts über +10 und keine teuren Manasteine in Ausrüstung, die du ein paar Quests später ersetzt.',
                en: 'Spend skill and Daevanion points right away and equip stigmas from level 22 – a stronger character kills story bosses faster. Upgrade your weapon first. Amulet and belt to +10 – every step succeeds up to there. Nothing past +10 and no expensive manastones in gear you replace a few quests later.',
              },
            },
            {
              title: { de: 'Ab Stufe 45: nachholen', en: 'From level 45: catch up' },
              text: {
                de: 'Erst mit Stufe 45 gehst du die Dungeons und die übrigen Nebenmissionen an – in der Reihenfolge aus „Nach dem Speedrun“.',
                en: 'Only at level 45 do you tackle the dungeons and the remaining side missions – in the order from “After the speedrun”.',
              },
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Die zwei Sperren: Stufe 22 und 32', en: 'The two gates: level 22 and 32' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Nach dem ersten Aufstieg (Stufe 5/6) zeigt das Spiel eine **Aufstiegsleiste** (Ascension Gauge). Auf Stufe 22 und 32 geht die Story erst weiter, wenn sie bei 100 % steht – dann machst du die Aufstiegs-Quest. Die Leiste füllen Story-Quests, grüne Regional-Quests (je rund **5 %**), versiegelte Dungeons und Strongholds. **Monster füllen sie gar nicht.** Wer der Story gefolgt ist, kommt mit 70–90 % an.',
            en: 'After the first Ascension (level 5/6) the game shows an **Ascension Gauge**. At level 22 and 32 the story only continues once it is at 100% – then you do the Ascension quest. The gauge is filled by story quests, green regional quests (about **5%** each), sealed dungeons and strongholds. **Monsters do not fill it at all.** If you followed the story, you arrive with 70–90%.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Was die Sperren verlangen', en: 'What the gates ask for' },
          head: [
            { de: 'Sperre', en: 'Gate' },
            { de: 'Beim Ankommen meist', en: 'Usually on arrival' },
            { de: 'Grüne Quests nötig', en: 'Green quests needed' },
            { de: 'Beispiele (Elyos)', en: 'Examples (Elyos)' },
            { de: 'Danach', en: 'Then' },
          ],
          rows: [
            [
              { de: '**Stufe 22**', en: '**Level 22**' },
              '70–90 %',
              '3–5',
              { de: '„Die Vereitelung des Plans der Drakan“, „Halskette des Abschlusses“, „Auf den Spuren der entflohenen Fossa“', en: '“Sneaky Drakan”, “Closure”, “Searching for an Escaped Fossa”' },
              { de: 'Aufstiegs-Quest: bessere Flügel, Stigmen', en: 'Ascension quest: better wings, stigmas' },
            ],
            [
              { de: '**Stufe 32**', en: '**Level 32**' },
              '80–90 %',
              '2–4',
              { de: '„Unwiederbringliche Tage“, „Der Zweck des verbotenen Experiments“', en: '“Too Far Gone”, “Questionable Methods”' },
              { de: 'Aufstiegs-Quest: bessere Flügel, mehr Daevanion-Knoten', en: 'Ascension quest: better wings, more Daevanion nodes' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'So kostet eine Sperre nur Minuten', en: 'How a gate costs only minutes' },
          text: {
            de: 'Nimm grüne Quests mit, die auf dem Weg zur Sperre liegen – laut Gaming Pro Max kostet eine Sperre dann 15–30 Minuten, wer vorher alles ausgelassen hat, braucht an der ersten 45–60. Jede grüne Quest füllt die Leiste gleich stark; nimm also die nahen und die mit Skillpunkt oder Schmuck als Belohnung. Alle fünf Beispiele oben geben einen Skillpunkt. Ist die Leiste voll, starte die Aufstiegs-Quest selbst – die Story geht nicht von allein weiter.',
            en: 'Pick up green quests that lie on the way to the gate – according to Gaming Pro Max a gate then costs 15–30 minutes, while someone who skipped everything needs 45–60 at the first one. Every green quest fills the gauge by the same amount, so take the nearby ones and those with a skill point or jewellery as reward. All five examples above give a skill point. Once the gauge is full, start the Ascension quest yourself – the story does not continue on its own.',
          },
        },
      ],
    },
    {
      title: { de: 'Warum es ab Stufe 30 zäh wird', en: 'Why it gets slow from level 30' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die EP-Kurve steigt steil an: Für die Stufen 1–29 brauchst du zusammen nur 2,7 % aller EP – Stufe 44 allein kostet 160,8 Mio. und damit mehr als ein Fünftel. Darum fliegen die ersten Stunden vorbei, und die letzten 15 Stufen fühlen sich lang an. Das ist kein Fehler deiner Route.',
            en: 'The EXP curve rises steeply: levels 1–29 together need only 2.7% of all EXP – level 44 alone costs 160.8M, more than a fifth. That is why the first hours fly by and the last 15 levels feel long. It is not a mistake in your route.',
          },
        },
        {
          type: 'bars',
          title: { de: 'EP, die jeder Stufenbereich kostet', en: 'EXP each level range costs' },
          caption: {
            de: 'Daten des globalen Clients laut MetaBot (15.10.2026); 40–44 heißt: bis Stufe 45. Unter jedem Balken: Anteil an allen 754,8 Mio. EP und wie viel davon die Story der Elyos deckt.',
            en: 'Global client data according to MetaBot (2026-10-15); 40–44 means: up to level 45. Under each bar: share of all 754.8M EXP and how much of it the Elyos story covers.',
          },
          unit: { de: 'Mio. EP', en: 'M EXP' },
          items: [
            { label: { de: 'Stufe 1–9', en: 'Level 1–9' }, value: 0.09, display: { de: '0,09 Mio.', en: '0.09M' }, note: { de: 'unter 0,1 % · Story 100 %', en: 'below 0.1% · story 100%' }, tone: 'teal' },
            { label: { de: 'Stufe 10–19', en: 'Level 10–19' }, value: 1.72, display: { de: '1,7 Mio.', en: '1.7M' }, note: { de: '0,2 % · Story 71 %', en: '0.2% · story 71%' }, tone: 'teal' },
            { label: { de: 'Stufe 20–29', en: 'Level 20–29' }, value: 18.89, display: { de: '18,9 Mio.', en: '18.9M' }, note: { de: '2,5 % · Story 88 %', en: '2.5% · story 88%' }, tone: 'blue' },
            { label: { de: 'Stufe 30–39', en: 'Level 30–39' }, value: 207.18, display: { de: '207,2 Mio.', en: '207.2M' }, note: { de: '27,4 % · Story 70 %', en: '27.4% · story 70%' }, tone: 'violet' },
            { label: { de: 'Stufe 40–44', en: 'Level 40–44' }, value: 526.94, display: { de: '526,9 Mio.', en: '526.9M' }, note: { de: '69,8 % · Story 108 %', en: '69.8% · story 108%' }, tone: 'gold' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Die Lücke bei 30–39 schließt sich von selbst', en: 'The gap at 30–39 closes by itself' },
          text: {
            de: 'Zwischen 30 und 39 deckt die Story nur rund 70 % der EP, die diese Stufen kosten – ab 40 dagegen mehr als 100 %. In den hohen 30ern liegst du deshalb oft etwas unter der empfohlenen Stufe der Story-Quests. Das ist normal: Ab 40 holt die Story den Rückstand wieder auf. Wird es zu knapp, ist ein versiegelter Dungeon am Weg die schnellste Hilfe – einer auf Stufe 35 bringt 1,4–2,8 Mio. EP, eine grüne Quest auf Stufe 30 nur rund 0,3 Mio. Grinden lohnt sich nicht.',
            en: 'Between 30 and 39 the story only covers about 70% of the EXP these levels cost – from 40 on more than 100%. So in your late 30s you are often a little below the recommended level of the story quests. That is normal: from 40 the story makes up the gap again. If it gets too tight, a sealed dungeon on your way is the fastest help – a level 35 one pays 1.4–2.8M EXP, a green quest at level 30 only about 0.3M. Grinding is not worth it.',
          },
        },
      ],
    },
    {
      title: { de: 'Wie lange es dauert – und wie du Zeit sparst', en: 'How long it takes – and how to save time' },
      blocks: [
        {
          type: 'bars',
          title: { de: 'Stufe 1–45: so lange brauchen Spieler', en: 'Level 1–45: how long players take' },
          caption: {
            de: 'Schätzungen der Guides, keine Messung: Daeva Guides (nach Skycoach und All Things How), Gameplay Tips („3+ Std.“), All Things How, MeinMMO und NielsonTv (über Daeva Guides). Der Referenzlauf ist unser eigener Testlauf auf dem globalen Server.',
            en: 'Estimates from the guides, not measurements: Daeva Guides (after Skycoach and All Things How), Gameplay Tips (“3+ h”), All Things How, MeinMMO and NielsonTv (via Daeva Guides). The reference run is our own test run on the global server.',
          },
          unit: { de: 'Std.', en: 'h' },
          items: [
            { label: { de: 'Geübte Route', en: 'Practised route' }, note: { de: 'mit Routen-Wissen', en: 'knowing the route' }, value: 3.5, display: { de: '3–4 Std.', en: '3–4 h' }, tone: 'teal' },
            { label: { de: 'Unser Referenzlauf', en: 'Our reference run' }, note: { de: 'diese Anleitung', en: 'this guide' }, value: 5.23, display: { de: '5 Std. 14 Min.', en: '5 h 14 min' }, tone: 'gold' },
            { label: { de: 'Erster Charakter, nur Story', en: 'First character, story only' }, value: 5.5, display: { de: '5–6 Std.', en: '5–6 h' }, tone: 'blue' },
            { label: { de: 'Story mit Lesen und Erkunden', en: 'Story with reading and exploring' }, value: 12.5, display: { de: '10–15 Std.', en: '10–15 h' }, tone: 'violet' },
            { label: { de: 'Mit viel Nebeninhalt', en: 'With lots of side content' }, value: 16, display: { de: '15+ Std.', en: '15+ h' }, tone: 'rose' },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Teleport-Statuen aktivieren:** Jede, an der du vorbeikommst – Rückkehr-Schriftrollen brauchen sie als Ziel.', en: '**Activate teleport statues:** every one you pass – return scrolls need them as a destination.' },
            { de: '**Aus fertigen Instanzen teleportieren** statt zurückzulaufen.', en: '**Teleport out of finished instances** instead of walking back.' },
            { de: '**Fliegen, wo es abkürzt** – die Flugenergie ist begrenzt, also nur für echte Abkürzungen.', en: '**Fly where it cuts the way short** – flight energy is limited, so only for real shortcuts.' },
            { de: '**Nur töten, was im Weg steht:** Monster bringen wenig EP und füllen die Aufstiegsleiste gar nicht.', en: '**Only kill what is in your way:** monsters give little EXP and do not fill the Ascension Gauge at all.' },
            { de: '**Kampf schneller statt länger:** Hängst du an einem Story-Boss, erst Punkte verteilen und die Waffe verbessern – nicht grinden.', en: '**Make fights shorter, not longer:** if a story boss stops you, spend your points and upgrade your weapon first – do not grind.' },
            { de: '**Makro einrichten:** Mit Makro und gehaltener linker Maustaste kämpfst du mit weniger Aufwand – siehe Makro-Guide.', en: '**Set up the macro:** with the macro and the left mouse button held you fight with less effort – see the macro guide.' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/macros', label: { de: 'Makro-Guide lesen', en: 'Read the macro guide' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Nebenmissionen auf Vorrat:** Alle grünen Quests unter Stufe 45 bringen zusammen unter 2 % der EP. Mach nur die, die eine Sperre braucht.', en: '**Side missions in advance:** all green quests below level 45 together pay less than 2% of the EXP. Only do the ones a gate needs.' },
            { de: '**Grinden:** Monster bringen wenig EP und keinen Fortschritt auf der Aufstiegsleiste.', en: '**Grinding:** monsters give little EXP and no progress on the Ascension Gauge.' },
            { de: '**Die Sperre für einen Fehler halten:** Geht die Story auf 22 oder 32 nicht weiter, ist die Aufstiegsleiste nicht voll – schau im Journal unter „Regional“ nach grünen Quests.', en: '**Taking the gate for a bug:** if the story does not go on at 22 or 32, the Ascension Gauge is not full – check the “Regional” tab of your journal for green quests.' },
            { de: '**Bei 100 % warten:** Die Aufstiegs-Quest startest du selbst.', en: '**Waiting at 100%:** you start the Ascension quest yourself.' },
            { de: '**Truhen am Dungeon-Ende öffnen:** Sie kosten Odyle-Energie (sammelt sich ab Stufe 22) – die ist ab Stufe 45 in Odyle-Würfeln viel mehr wert.', en: '**Opening chests at the end of dungeons:** they cost Odyle Energy (it builds up from level 22) – which is worth much more in Odyle cubes from level 45.' },
            { de: '**Übergangsausrüstung teuer verbessern:** Über +10 kann es schiefgehen, und teure Manasteine verschwinden mit dem Teil. Bis +10 ist jede Stufe sicher.', en: '**Upgrading temporary gear expensively:** past +10 it can fail, and expensive manastones go away with the piece. Up to +10 every step is safe.' },
            { de: '**Punkte liegen lassen:** Unverteilte Skill- und Daevanion-Punkte machen jeden Boss-Kampf länger.', en: '**Leaving points unspent:** unspent skill and Daevanion points make every boss fight longer.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Nach dem Speedrun', en: 'After the speedrun' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Mit Stufe 45 bist du noch lange nicht fertig: Viele Nebenmissionen und alle Dungeons warten noch. Das ist genau der Plan – jetzt erledigst du sie mit voller Stufe und allen Skills. Und es lohnt sich: Mehr als die Hälfte deiner möglichen Skillpunkte steckt in genau diesen Inhalten.',
            en: 'Level 45 is far from the end: many side missions and all dungeons are still waiting. That is exactly the plan – now you do them at full level with all your skills. And it pays off: more than half of your possible skill points sit in exactly this content.',
          },
        },
        {
          type: 'shares',
          title: { de: 'Woher deine Skillpunkte kommen', en: 'Where your skill points come from' },
          caption: {
            de: 'Alle Skillpunkte, die ein Charakter bekommen kann – Spieldaten des globalen Clients in diesem Planer, für beide Fraktionen gleich. Nach einem reinen Speedrun hast du vor allem die 203 aus den Stufen, plus die wenigen Dungeons und Quests am Weg.',
            en: 'All skill points a character can get – global client game data in this planner, the same for both factions. After a pure speedrun you mainly have the 203 from levels, plus the few dungeons and quests on your way.',
          },
          unit: { de: 'Punkte', en: 'points' },
          items: [
            { label: { de: 'Stufen 1–45', en: 'Levels 1–45' }, value: 203, tone: 'gold' },
            { label: { de: 'Versiegelte Dungeons', en: 'Sealed dungeons' }, note: { de: '61 × 2, beim ersten Abschluss', en: '61 × 2, on the first clear' }, value: 122, tone: 'blue' },
            { label: { de: 'Grüne Quests', en: 'Green quests' }, note: { de: '58 × 1', en: '58 × 1' }, value: 58, tone: 'teal' },
            { label: { de: 'Shops', en: 'Shops' }, note: { de: 'Shugo-Festival-Shop 45, Albtraum-Shop 20', en: 'Shugo Festival Shop 45, Nightmare Shop 20' }, value: 65, tone: 'slate' },
          ],
        },
        {
          type: 'checklist',
          items: [
            { de: 'Stufe 45 und das Story-Finale geschafft (Klassenwaffe, Ascension Bracelet, beste Flügel)', en: 'Level 45 and the story finale done (class weapon, Ascension Bracelet, best wings)' },
            { de: 'Build planen: Skillpunkte, Stigmen, Daevanion', en: 'Plan your build: skill points, stigmas, Daevanion' },
            { de: 'Versiegelte Dungeons deiner Fraktions-Karte: 61 Stück, beim ersten Abschluss je 2 Skillpunkte und 2 Daevanion-Kristalle', en: 'Sealed dungeons on your faction’s map: 61 of them, each gives 2 skill points and 2 Daevanion crystals on the first clear' },
            { de: 'Grüne Quests nachholen: 58 geben je 1 Skillpunkt; auf Stufe 45 gibt es 31 weitere Regional-Quests pro Fraktion', en: 'Catch up on green quests: 58 give 1 skill point each; at level 45 there are 31 more regional quests per faction' },
            { de: 'Gruppen-Dungeons nach und nach (Krao Cave, Urugugu Canyon, Fire Temple, Draupnir) – tägliche Dungeons und Expeditionen gibt es ab Stufe 45', en: 'Group dungeons one by one (Krao Cave, Urugugu Canyon, Fire Temple, Draupnir) – daily dungeons and expeditions open at level 45' },
            { de: 'Übrige Nebenmissionen und die Skillpunkte aus den Shops', en: 'The remaining side missions and the skill points from the shops' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/', label: { de: 'Jetzt deinen Stufe-45-Build planen', en: 'Plan your level 45 build now' }, primary: true },
            { href: '#/skills', label: { de: 'Skillpunkte planen', en: 'Plan skill points' } },
            { href: '#/stigma', label: { de: 'Stigmen auswählen (ab Stufe 22)', en: 'Pick stigmas (from level 22)' } },
            { href: '#/daevanion', label: { de: 'Daevanion-Tafeln planen', en: 'Plan Daevanion boards' } },
            { href: '#/guides/combat-power', label: { de: 'Kampfkraft-Guide: was danach zählt', en: 'Combat Power guide: what counts next' } },
            { href: '#/guides/farming-power', label: { de: 'Farming-Guide: Odyle, Kina, Woche', en: 'Farming guide: Odyle, Kina, the week' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Quellen', en: 'Sources' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Referenzzeit stammt aus unserem eigenen Testlauf. Die EP-Zahlen kommen aus den Daten des globalen Clients, wie MetaBot sie veröffentlicht (All Things How nennt dieselben Summen). Route, Sperren und Zeit-Schätzungen fassen die Guides unten zusammen; wo sie sich unterscheiden – etwa wie viele grüne Quests eine Sperre braucht –, nennen wir die Spanne. Skillpunkte, Daevanion-Tafeln und Stigma-Plätze stehen in den Spieldaten dieses Planers. Einen öffentlichen Lauf mit Zeit pro Stufe gibt es nicht, deshalb zeigt der Guide keine Kurve „Stufe über Zeit“.',
            en: 'The reference time is from our own test run. The EXP figures come from the global client’s data as published by MetaBot (All Things How gives the same totals). Route, gates and time estimates sum up the guides below; where they differ – for example how many green quests a gate needs – we give the range. Skill points, Daevanion boards and stigma slots are in this planner’s game data. There is no public run with a time per level, so the guide shows no “level over time” curve.',
          },
        },
        {
          type: 'sources',
          items: [
            { href: 'https://metabot.gg/en/aion-2/guides/leveling-guide', label: 'MetaBot – Levelling guide 1–45 for both factions: zones, EXP per level range, story share (2026-10-15)' },
            { href: 'https://allthings.how/aion-2-how-to-speedrun-to-level-45-in-under-4-hours/', label: 'All Things How – Speedrun to level 45: route, gate quests, sealed dungeons (2026-10-17)' },
            { href: 'https://daevaguides.com/en/guides/leveling-1-45/', label: 'Daeva Guides – Levelling guide 1–45: times, unlocks, mistakes (2026-10-06)' },
            { href: 'https://gamingpromax.com/aion-2-how-to-increase-ascension-gauge/', label: 'Gaming Pro Max – How to fill the Ascension Gauge (2026-10-07)' },
            { href: 'https://gameplay.tips/guides/aion-2-speedrun-guide.html', label: 'Gameplay Tips – Speedrun guide level 1–45 by phases (2026-10-02)' },
            { href: 'https://mein-mmo.de/aion-2-schnell-leveln-guide-fuer-maximale-xp/', label: 'MeinMMO – Schnell leveln bis Stufe 45 (2026-09-02)' },
          ],
        },
      ],
    },
  ],
};
