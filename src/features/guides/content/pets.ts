import type { Guide, L10n } from '../types';

/**
 * Pets on the global server (October 2026). Facts and numbers from the community guides in the sources, paraphrased;
 * where they disagree the guide says so in "Not confirmed yet". The pets of the top players are counted from our own
 * top-10 data (public/data/top, AION2 Index, 2026-10-18): 80 players, 61 on a shop, pass or event pet.
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });
/** A share: "90 %" in German, "90%" in English; 0 shows a dash. */
const pct = (n: number): L10n | string => (n ? { de: `${n} %`, en: `${n}%` } : '–');

export const pets: Guide = {
  id: 'pets',
  icon: 'pet',
  tone: 'teal',
  category: 'world',
  title: {
    de: 'Haustiere: wie wichtig sie sind und was zuerst',
    en: 'Pets: how much they matter and what to do first',
  },
  summary: {
    de: 'Welches Haustier du reitest, ist fast egal – stärker machen dich die Sammlung und die Genus Insight. Seelen, Stufen, Kristalle, Verwandlung und eine Reihenfolge, die nichts verschwendet.',
    en: 'Which pet you ride hardly matters – the collection and Genus Insight are what make you stronger. Souls, levels, crystals, transformation and an order that wastes nothing.',
  },
  updated: '2026-10-18',
  tags: [
    { de: 'Haustiere', en: 'Pets' },
    { de: 'Sammlung', en: 'Collection' },
    { de: 'Kampfkraft', en: 'Combat Power' },
  ],
  basis: {
    de: 'Recherche in Community-Guides und Datenbanken zum globalen Server (Oktober 2026) und die Haustiere der Top 10 jeder Klasse (AION2 Index, 18.10.2026)',
    en: 'Research in community guides and databases for the global server (October 2026) and the pets of the top 10 of every class (AION2 Index, 2026-10-18)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'facts',
          items: [
            {
              label: { de: 'Wie wichtig?', en: 'How important?' },
              value: {
                de: 'Das Haustier, das du reitest: kaum, es ist vor allem Optik. Die **Sammlung**: ja – sie gibt Dauerwerte, und im Endgame ist die **Genus Insight** eine echte Stärke-Quelle.',
                en: 'The pet you ride: hardly, it is mostly looks. The **collection**: yes – it gives permanent stats, and in the endgame **Genus Insight** is a real source of power.',
              },
            },
            {
              label: { de: 'Anzahl', en: 'Count' },
              value: { de: '207 Haustiere in 5 Gattungen: Fera 65, Natura 48, Varian 46, Cogni 41, Special 7', en: '207 pets in 5 genera: Fera 65, Natura 48, Varian 46, Cogni 41, Special 7' },
            },
            {
              label: { de: 'Freischalten', en: 'Unlock' },
              value: { de: '**5 Seelen** eines Monsters – sie fallen, wenn du es besiegst', en: '**5 souls** of a monster – they drop when you defeat it' },
            },
            {
              label: { de: 'Höchststufe', en: 'Max level' },
              value: { de: 'Stufe 3 auf dem globalen Server (105 Seelen pro Haustier), in Korea und Taiwan schon Stufe 5', en: 'Level 3 on the global server (105 souls per pet), already level 5 in Korea and Taiwan' },
            },
            {
              label: { de: 'Gilt für', en: 'Applies to' },
              value: { de: 'Alle Charaktere auf demselben Server – Twinks sammeln mit', en: 'All characters on the same server – alts collect too' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: 'Nimm beim Questen und Farmen jede Seele mit, schalte **viele verschiedene** Haustiere frei statt weniger teurer, und gib Kristalle für die Genus Insight erst gezielt aus, wenn die Gattung hoch steht. Ausrüstung und Daevanion bleiben wichtiger – Haustiere laufen nebenher.',
            en: 'Pick up every soul while questing and farming, unlock **many different** pets rather than a few expensive ones, and only spend crystals on Genus Insight with a plan once the genus is high. Gear and Daevanion still matter more – pets run alongside.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Namen im Spiel', en: 'Names in game' },
          text: {
            de: 'Begriffe wie Insight, Genus Insight, Owned Effects, Soul Crystal und Empathy Candy stehen hier so, wie sie im englischen Client heißen. Im deutschen Client können sie anders lauten. Werte und Chancen können sich mit Patches ändern.',
            en: 'Terms like Insight, Genus Insight, Owned Effects, Soul Crystal and Empathy Candy are named as in the English client. Values and odds can change with patches.',
          },
        },
      ],
    },
    {
      title: { de: 'Wie wichtig sind Haustiere?', en: 'How much do pets matter?' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Haustiere machen dich auf vier Wegen stärker – unterschiedlich viel:',
            en: 'Pets make you stronger in four ways – by very different amounts:',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Teil', en: 'Part' }, { de: 'Was es bringt', en: 'What it gives' }, { de: 'Wie wichtig', en: 'How important' }],
          rows: [
            [
              { de: '**Aktives Haustier**', en: '**Active pet**' },
              { de: 'Reittier und Optik. Alle Reittiere sind gleich schnell (laufen 900, sprinten 1.200, gleiten 500).', en: 'Mount and looks. All mounts have the same speed (run 900, sprint 1,200, glide 500).' },
              { de: 'Gering', en: 'Low' },
            ],
            [
              { de: '**Owned Effects**', en: '**Owned Effects**' },
              { de: 'Kleine Dauerwerte pro Haustier und Stufe. Sie gelten immer, egal welches du reitest, und addieren sich über alle Haustiere.', en: 'Small permanent stats per pet and level. They always apply, whichever pet you ride, and add up over all your pets.' },
              { de: 'Mittel – viele kleine Werte', en: 'Medium – many small stats' },
            ],
            [
              { de: '**Genus Insight**', en: '**Genus Insight**' },
              { de: 'Bis zu 9 gewürfelte Werte pro Gattung (Angriff, kritischer Schaden, Waffenschaden, HP %, Schadenstoleranz …). Zählt in die Kampfkraft, nicht in die Gegenstandsstufe.', en: 'Up to 9 rolled stats per genus (attack, critical damage, weapon damage, HP %, damage tolerance …). Counts towards Combat Power, not item level.' },
              { de: '**Groß** im Endgame', en: '**High** in the endgame' },
            ],
            [
              { de: '**Titel**', en: '**Titles**' },
              { de: 'Alle 5 Gattungen auf Stufe 10: **+4,5 % PvE Damage Boost**. 200 Haustiere: Defense Bonus +320 und Boss Damage Tolerance +4 %.', en: 'All 5 genera at level 10: **+4.5% PvE Damage Boost**. 200 pets: Defense Bonus +320 and Boss Damage Tolerance +4%.' },
              { de: 'Langes Ziel', en: 'Long-term goal' },
            ],
          ],
        },
        { type: 'heading', text: { de: 'Was die Top-Spieler reiten', en: 'What the top players ride' } },
        {
          type: 'text',
          text: {
            de: 'Von den 80 Spielern in den Top 10 aller acht Klassen (AION2 Index, 18.10.2026) reiten **61** ein Haustier aus Shop, Pass oder Event: 32 eines der beiden Halloween-Haustiere aus dem Shop (Little Ghost 25, Pumpkin Carriage 7) und 29 ein Special-Haustier (Black Dragon 9, White Bunny 7, Chonky Hamster 7, Swift Lugi 4, Pagati 2). Nur 19 reiten ein Haustier aus Monster-Seelen. Special-Haustiere haben keinen Gattungs-Bonus – die Stärke steckt in der Sammlung, nicht im Haustier unter dir.',
            en: 'Of the 80 players in the top 10 of all eight classes (AION2 Index, 2026-10-18), **61** ride a pet from the shop, a pass or an event: 32 one of the two Halloween shop pets (Little Ghost 25, Pumpkin Carriage 7) and 29 a Special pet (Black Dragon 9, White Bunny 7, Chonky Hamster 7, Swift Lugi 4, Pagati 2). Only 19 ride a pet from monster souls. Special pets have no genus bonus – the power is in the collection, not in the pet you sit on.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Für Stärke kein Geld ausgeben', en: 'Don’t pay for power' },
          text: {
            de: 'Die beiden Halloween-Haustiere kosten je 2.900 Mileage (19,99 $), einmal pro Server. Kauf so etwas fürs Aussehen: Die Werte der Sammlung kommen aus den vielen normalen Haustieren.',
            en: 'The two Halloween pets cost 2,900 Mileage ($19.99) each, once per server. Buy that kind of pet for its looks: the stats of the collection come from the many ordinary pets.',
          },
        },
        { type: 'links', items: [{ href: '#/top', label: { de: 'Top 10 ansehen', en: 'See the top 10' } }] },
      ],
    },
    {
      title: { de: 'So bekommst du Haustiere', en: 'How to get pets' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Das erste Haustier (Stufe 10)', en: 'Your first pet (level 10)' },
              text: {
                de: 'Die Episoden-Quest **All Geared Up** (Elyos) bzw. **Gathering Essentials** (Asmodier) lässt dich zwischen Fossa, Armadon und Tog wählen. Damit ist das System offen – welches du nimmst, ist fast egal.',
                en: 'The episode quest **All Geared Up** (Elyos) or **Gathering Essentials** (Asmodians) lets you choose between Fossa, Armadon and Tog. That opens the system – which one you take hardly matters.',
              },
            },
            {
              title: { de: 'Seelen von Monstern', en: 'Souls from monsters' },
              text: {
                de: 'Die meisten Haustiere (158) lassen Seelen fallen, wenn du ihr Monster besiegst. Mit **5 Seelen** ist das Haustier freigeschaltet. Wo ein Monster lebt, steht im Haustier-Fenster im Reiter **Source**.',
                en: 'Most pets (158) drop souls when you defeat their monster. With **5 souls** the pet is unlocked. Where a monster lives is shown in the pet window on the **Source** tab.',
              },
            },
            {
              title: { de: 'Truhen und Händler', en: 'Chests and merchants' },
              text: {
                de: 'Seelen und Haustiere gibt es auch aus Truhen (zum Beispiel Pet Soul Chests und Growth Chests) und beim **Black Cloud Merchant** mit wechselndem Angebot. Ein doppeltes Haustier-Item wird zu einer Seele.',
                en: 'Souls and pets also come from chests (Pet Soul Chests and Growth Chests, for example) and from the **Black Cloud Merchant**, whose stock rotates. A duplicate pet item turns into a soul.',
              },
            },
            {
              title: { de: 'Special-Haustiere', en: 'Special pets' },
              text: {
                de: 'Die 7 Special-Haustiere findest du nicht im Freien: Black Dragon (Daeva’s Chest of Might), Swift Lugi (Daeva Pass), Wandering Merchant Lugi (Festival-Shop), Pagati (Tsenka-Händler oder Pet Chest), White Bunny und Chonky Hamster (Atelier-Shop) und Two. Sie lassen sich nicht verwandeln und haben keinen Gattungs-Bonus.',
                en: 'You won’t find the 7 Special pets in the open world: Black Dragon (Daeva’s Chest of Might), Swift Lugi (Daeva Pass), Wandering Merchant Lugi (festival shop), Pagati (Tsenka merchants or Pet Chest), White Bunny and Chonky Hamster (Atelier shop) and Two. They can’t be used for transformation and have no genus bonus.',
              },
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Stufen und Seelen', en: 'Levels and souls' },
      blocks: [
        {
          type: 'table',
          head: [{ de: 'Stufe', en: 'Level' }, { de: 'Seelen', en: 'Souls' }, { de: 'Gesamt', en: 'Total' }, { de: 'Was es bringt', en: 'What it gives' }],
          rows: [
            ['1', '5', '5', { de: 'Freigeschaltet und reitbar, erster Owned Effect', en: 'Unlocked and rideable, first Owned Effect' }],
            ['2', '+25', '30', { de: 'Gleiten mit dem Haustier, zweiter Owned Effect', en: 'Gliding on the pet, second Owned Effect' }],
            ['3', '+75', '105', { de: 'Verwandlung möglich, alle Owned Effects – auf dem globalen Server die Höchststufe', en: 'Transformation unlocked, all Owned Effects – the max level on the global server' }],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Erst breit, dann tief', en: 'Wide first, then deep' },
          text: {
            de: 'Ein neues Haustier kostet 5 Seelen, die Stufen 2 und 3 zusammen 100. Für die Stufe der Gattung zählt aber vor allem, **wie viele** Haustiere du hast (laut einer Quelle 500 Erfahrung pro neuem Haustier, 250 pro Stufe 2 oder 3). Schalte also erst viele frei und zieh dann die hoch, deren Monster du sowieso oft triffst.',
            en: 'A new pet costs 5 souls, levels 2 and 3 together cost 100. But the genus level mostly counts **how many** pets you have (one source says 500 experience per new pet, 250 per level 2 or 3). So unlock many first, then level the ones whose monsters you meet often anyway.',
          },
        },
      ],
    },
    {
      title: { de: 'Owned Effects nach Gattung', en: 'Owned Effects by genus' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Jedes Haustier gibt Werte seiner Gattung – dauerhaft, egal welches du reitest. Die Tabelle zeigt ein Haustier auf Stufe 3 und, gerechnet, alle Haustiere der Gattung auf Stufe 3.',
            en: 'Every pet gives stats of its genus – permanently, whichever pet you ride. The table shows one pet at level 3 and, worked out, all pets of the genus at level 3.',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Gattung', en: 'Genus' }, { de: 'Haustiere', en: 'Pets' }, { de: 'Ein Haustier auf Stufe 3', en: 'One pet at level 3' }, { de: 'Alle auf Stufe 3 (gerechnet)', en: 'All at level 3 (worked out)' }],
          rows: [
            ['**Cogni**', '41', both('HP +30 · Critical Hit +2 · Might +1'), { de: 'HP +1.230 · Critical Hit +82 · Might +41', en: 'HP +1,230 · Critical Hit +82 · Might +41' }],
            ['**Fera**', '65', both('Mount Ground Speed +3 · Accuracy +2 · Dexterity +1'), both('Accuracy +130 · Dexterity +65')],
            ['**Natura**', '48', both('Stamina +9 · Critical Hit Resist +2 · Precision +1'), both('Critical Hit Resist +96 · Precision +48')],
            ['**Varian**', '46', { de: 'Weniger Sprint-Kosten beim Reiten · Evasion +2 · Constitution +1', en: 'Lower sprint cost when riding · Evasion +2 · Constitution +1' }, both('Evasion +92 · Constitution +46')],
            ['**Special**', '7', { de: 'Keine Gattungs-Werte', en: 'No genus stats' }, '–'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'So liest du die Tabelle', en: 'How to read the table' },
          text: {
            de: 'Die rechte Spalte ist gerechnet, nicht im Spiel gemessen – sie zeigt nur, warum viele kleine Werte zählen. Für Schaden bringt **Cogni** am meisten (Critical Hit und Might), **Fera** hilft bei der Treffsicherheit und macht Reiten schneller. In der Praxis sammelst du, was dir unterwegs begegnet: Jedes neue Haustier zählt.',
            en: 'The right column is worked out, not measured in game – it only shows why many small stats add up. For damage **Cogni** gives the most (Critical Hit and Might), **Fera** helps accuracy and makes riding faster. In practice you collect what you meet on the way: every new pet counts.',
          },
        },
      ],
    },
    {
      title: { de: 'Genus Insight', en: 'Genus Insight' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die **Genus Insight** ist der zweite Reiter im Haustier-Fenster. Jede der fünf Gattungen hat eine eigene Stufe von 1 bis 10, und jede Stufe öffnet eine weitere Werte-Zeile – bis zu 9 pro Gattung. Mit **Analyze** würfelst du die Werte aller offenen Zeilen einer Gattung neu.',
            en: '**Genus Insight** is the second tab in the pet window. Each of the five genera has its own level from 1 to 10, and every level opens one more stat line – up to 9 per genus. **Analyze** rerolls the stats of all open lines of a genus.',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Ein Wurf kostet', en: 'One roll costs' }, value: { de: '4 Soul Crystals der Gattung (oder Regenbogen-Kristalle) + 1.000 Kinah', en: '4 Soul Crystals of the genus (or rainbow crystals) + 1,000 Kinah' } },
            { label: { de: 'Sperren', en: 'Locking' }, value: { de: 'Gute Zeilen kannst du sperren – jede gesperrte Zeile macht den nächsten Wurf deutlich teurer', en: 'You can lock good lines – every locked line makes the next roll a lot more expensive' } },
            { label: { de: 'Presets', en: 'Presets' }, value: { de: 'Bis zu 3', en: 'Up to 3' } },
            { label: { de: 'Ziel', en: 'Goal' }, value: { de: 'Alle 5 Gattungen auf 10: Titel **Unbound by Genus** mit +4,5 % PvE Damage Boost', en: 'All 5 genera at 10: the title **Unbound by Genus** with +4.5% PvE Damage Boost' } },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Welche Qualität du auf welcher Stufe würfeln kannst', en: 'Which quality you can roll at which level' },
          head: [{ de: 'Stufe', en: 'Level' }, 'Common', 'Rare', 'Epic', 'Unique', 'Heroic'],
          rows: [
            ['1', pct(90), pct(10), pct(0), pct(0), pct(0)],
            ['4', pct(50), pct(45), pct(5), pct(0), pct(0)],
            ['7', pct(35), pct(34), pct(30), pct(1), pct(0)],
            ['9', pct(25), pct(25), pct(39), pct(10), pct(1)],
            ['10', pct(20), pct(30), pct(30), pct(15), pct(5)],
          ],
          grid: true,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Erst hochleveln, dann sperren', en: 'Level up first, lock later' },
          text: {
            de: 'Unter Stufe 7 gibt es kein Unique, unter Stufe 9 kein Heroic. Sperre deshalb erst ab Stufe 9–10 und würfle vorher nur, um die Zeilen zu füllen. Ausnahme: ein sehr guter Wurf auf Zeile 4.',
            en: 'Below level 7 there is no Unique, below level 9 no Heroic. So only lock from level 9–10 and roll before that just to fill the lines. The exception: a very good roll on line 4.',
          },
        },
        { type: 'heading', text: { de: 'Worauf du würfelst (globaler Server)', en: 'What to roll for (global server)' } },
        {
          type: 'table',
          head: [{ de: 'Zeile', en: 'Line' }, { de: 'Ziel', en: 'Target' }],
          rows: [
            ['1, 5', both('Max Attack > Attack Bonus')],
            ['2, 8', both('HP Increase %')],
            ['3, 6, 9', { de: 'Power Shard Bonus – oder Critical Hit bzw. Accuracy, solange du deren Grenze nicht erreichst', en: 'Power Shard Bonus – or Critical Hit or Accuracy while you are below their cap' }],
            ['4', both('Cogni: Critical Damage Boost · Fera: Weapon Damage Boost · Natura: Multi Hit / Perfect Chance · Varian: Front/Back Damage Boost · Special: Double Chance')],
            ['7', both('Damage Tolerance / PvE Damage Tolerance > Endurance')],
          ],
        },
      ],
    },
    {
      title: { de: 'Kristalle und Verwandlung', en: 'Crystals and transformation' },
      blocks: [
        { type: 'heading', text: { de: 'Woher die Kristalle kommen', en: 'Where crystals come from' } },
        {
          type: 'list',
          items: [
            {
              de: '**Sammel-Belohnungen:** bei 5 Haustieren, danach alle 10 – meist 100 Soul Crystals (Bound), jede 50. stattdessen 10 Empathy Candy. Mit allen 207 Haustieren sind das rund 1.700 Soul Crystals und 40 Candy.',
              en: '**Collection rewards:** at 5 pets, then every 10 – mostly 100 Soul Crystals (Bound), every 50th 10 Empathy Candy instead. With all 207 pets that is about 1,700 Soul Crystals and 40 candy.',
            },
            {
              de: '**Monster:** Steht ein Haustier auf Höchststufe, lässt sein Monster Kristalle seiner Gattung fallen.',
              en: '**Monsters:** once a pet is at max level, its monster drops crystals of its genus.',
            },
            {
              de: '**Duty Quests und versteckte Würfel:** Kristalle aller Farben, auch die seltenen hellblauen für Special.',
              en: '**Duty quests and hidden cubes:** crystals of every colour, including the rare light-blue ones for Special.',
            },
            {
              de: '**Farben:** Cogni blau, Fera rot, Natura grün, Varian gelb, Special hellblau. **Regenbogen-Kristalle** zählen für jede Gattung – heb sie für Special auf, die anderen Farben farmst du leicht.',
              en: '**Colours:** Cogni blue, Fera red, Natura green, Varian yellow, Special light blue. **Rainbow crystals** count for any genus – save them for Special, the other colours are easy to farm.',
            },
          ],
        },
        { type: 'heading', text: { de: 'Verwandlung', en: 'Transformation' } },
        {
          type: 'text',
          text: {
            de: 'Ab Stufe 3 verwandelt dich **Empathy Candy** für 5 Minuten in dein aktives Haustier (nicht in Special-Haustiere). Skills gehen weiter, Reiten nicht. Candy gibt es aus den Sammel-Belohnungen und im Festival-Shop (20 Centuryroot Tokens). Werte für die Verwandlung nennen die Quellen nicht.',
            en: 'From level 3, **Empathy Candy** turns you into your active pet for 5 minutes (not into Special pets). You can still use skills, but not ride. Candy comes from the collection rewards and the festival shop (20 Centuryroot Tokens). The sources name no stats for the transformation.',
          },
        },
      ],
    },
    {
      title: { de: 'So gehst du vor', en: 'What to do, in order' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Ab Stufe 10: erstes Haustier holen', en: 'From level 10: get your first pet' },
              text: { de: 'Quest machen, eins von dreien wählen – fertig.', en: 'Do the quest, pick one of three – done.' },
            },
            {
              title: { de: 'Beim Leveln: jede Seele mitnehmen', en: 'While levelling: pick up every soul' },
              text: {
                de: 'Monster, die du ohnehin besiegst, geben Seelen. Jedes neue Haustier zählt für die Gattungs-Stufe und die Sammel-Belohnungen.',
                en: 'Monsters you defeat anyway give souls. Every new pet counts for the genus level and the collection rewards.',
              },
            },
            {
              title: { de: 'Mit Twinks: zusammen sammeln', en: 'With alts: collect together' },
              text: {
                de: 'Die Sammlung gilt für alle Charaktere auf dem Server. Twinks, die durch andere Gebiete leveln, füllen sie mit.',
                en: 'The collection counts for every character on the server. Alts levelling through other areas fill it too.',
              },
            },
            {
              title: { de: 'Im Endgame: Stufe 3 und Genus Insight', en: 'In the endgame: level 3 and Genus Insight' },
              text: {
                de: 'Zieh Haustiere auf Stufe 3 (danach fallen Kristalle), lass die Gattungen steigen und würfle erst ab Stufe 9–10 gezielt.',
                en: 'Take pets to level 3 (then crystals drop), let the genera rise and only roll with a plan from level 9–10.',
              },
            },
            {
              title: { de: 'Langes Ziel: die Titel', en: 'Long-term: the titles' },
              text: {
                de: 'Alle fünf Gattungen auf 10 gibt **Unbound by Genus** (+4,5 % PvE Damage Boost). 200 Haustiere geben **Rule All Creation**: besessen Move Speed +1 %, ausgerüstet Defense Bonus +320, Back Attack Damage Tolerance +3 % und Boss Damage Tolerance +4 %.',
                en: 'All five genera at 10 give **Unbound by Genus** (+4.5% PvE Damage Boost). 200 pets give **Rule All Creation**: owned Move Speed +1%, equipped Defense Bonus +320, Back Attack Damage Tolerance +3% and Boss Damage Tolerance +4%.',
              },
            },
          ],
        },
        { type: 'heading', text: { de: 'Haustier-Routine', en: 'Pet routine' } },
        {
          type: 'checklist',
          items: [
            { de: 'Duty Quests für Kristalle gemacht', en: 'Duty quests done for crystals' },
            { de: 'Sammel-Belohnungen im Haustier-Fenster abgeholt', en: 'Collection rewards claimed in the pet window' },
            { de: 'Im Source-Reiter nachgesehen, welchen Haustieren nur noch wenige Seelen fehlen', en: 'Checked on the Source tab which pets are only a few souls short' },
            { de: 'Kristalle nur in Gattungen ab Stufe 9 gezielt ausgegeben', en: 'Spent crystals with a plan only on genera at level 9 or higher' },
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
            {
              de: '**Ein Shop-Haustier für Stärke kaufen** – das Haustier unter dir ist Optik, die Werte kommen aus der Sammlung.',
              en: '**Buying a shop pet for power** – the pet you ride is looks, the stats come from the collection.',
            },
            {
              de: '**Wenige Haustiere hochziehen statt viele freischalten** – ein neues Haustier kostet 5 Seelen, zwei Stufen 100, und für die Gattung zählt vor allem die Zahl der Haustiere.',
              en: '**Levelling a few pets instead of unlocking many** – a new pet costs 5 souls, two levels cost 100, and the genus mostly counts the number of pets.',
            },
            {
              de: '**Früh sperren** – unter Stufe 7 gibt es kein Unique, und gesperrte schwache Zeilen machen jeden Wurf teurer.',
              en: '**Locking early** – below level 7 there is no Unique, and locked weak lines make every roll more expensive.',
            },
            {
              de: '**Regenbogen-Kristalle für die leichten Farben ausgeben** – Special-Kristalle sind selten, die anderen farmst du.',
              en: '**Spending rainbow crystals on the easy colours** – Special crystals are rare, the others you can farm.',
            },
            {
              de: '**Haustiere vor die Ausrüstung stellen** – Gegenstandsstufe und Daevanion bringen mehr. Haustiere sammelst du nebenher.',
              en: '**Putting pets before gear** – item level and Daevanion give more. You collect pets on the side.',
            },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'Farming & Power lesen', en: 'Read Farming & power' } }] },
      ],
    },
    {
      title: { de: 'Noch nicht sicher', en: 'Not confirmed yet' },
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Die Quellen sind sich nicht in allem einig: ob die Genus Insight 9 oder 10 Zeilen hat, ob die Gattungs-Stufe nach der Zahl der Haustiere oder nach Erfahrung steigt, was der Titel Unbound by Genus außer +4,5 % PvE noch gibt, wie die Special-Gattung steigt und ob die Halloween-Haustiere eigene Werte haben. Die Summen in der Owned-Effects-Tabelle sind gerechnet, nicht gemessen. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'The sources don’t agree on everything: whether Genus Insight has 9 or 10 lines, whether the genus level rises with the number of pets or with experience, what the Unbound by Genus title gives besides +4.5% PvE, how the Special genus levels and whether the Halloween pets have stats of their own. The totals in the Owned Effects table are worked out, not measured. If you see it in game, let us know and the guide gets updated.',
          },
        },
      ],
    },
    {
      title: { de: 'Quellen', en: 'Sources' },
      blocks: [
        {
          type: 'sources',
          items: [
            { href: 'https://metabot.gg/en/aion-2/guides/mounts-wings-guide', label: 'metabot.gg – Mounts, pets & wings guide' },
            { href: 'https://gameplay.tips/guides/aion-2-pet-genus-system-guide.html', label: 'gameplay.tips – Pet genus system guide' },
            { href: 'https://www.iggm.com/news/aion-2-pet-system-deep-dive-hidden-stat-pool-more-than-mounts', label: 'IGGM – Pet system deep dive' },
            { href: 'https://mein-mmo.de/aion-2-arkana-pet-daevanion/3/', label: 'Mein-MMO – Pets (DE)' },
            { href: 'https://aion2.wiki.fextralife.com/Pets', label: 'Fextralife wiki – Pets' },
            { href: 'https://www.keengamer.com/articles/guides/all-pets-and-how-to-get-them-in-aion-2/', label: 'KeenGamer – All pets and how to get them' },
            { href: 'https://www.tribality.com/articles/how-to-boost-endgame-combat-power-in-aion-2-iggm-reveals-hidden-bonuses-you-may-be-missing/', label: 'Tribality – Hidden Combat Power bonuses' },
            { href: 'https://leprestore.com/guides/aion2/gear-score-combat-power/', label: 'leprestore – Gear score vs Combat Power' },
            { href: 'https://howtovideogame.com/aion-2-combat-power/', label: 'howtovideogame – How to increase Combat Power' },
            { href: 'https://aion2hub.com/news/aion-2-halloween-skins-pets-wings-shop-oct-14', label: 'AION2Hub – Halloween shop (14 Oct 2026)' },
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings (pets of the top 10)' },
          ],
        },
      ],
    },
  ],
};
