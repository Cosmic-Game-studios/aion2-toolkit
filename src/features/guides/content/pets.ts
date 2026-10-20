import type { Guide, L10n } from '../types';

/**
 * Pets on the global server (October 2026). Facts and numbers from the community guides in the sources, paraphrased;
 * where they disagree the guide says so in "Not confirmed yet". The pets of the top players are counted from our own
 * top-10 data (public/data/top, AION2 Index, 2026-10-18): 80 players, 61 on a shop, pass or event pet.
 * Combat Power: no source measures it for the global server; the only measurement is Korean (Inven, 2026-03-18,
 * per Genus Insight line), and the 5–35K for all 45 lines is worked out from it. Which genus helps most in combat:
 * daevaguides (Cogni and Fera). Genus experience per soul is worked out from the
 * genus experience per pet and level (daevaguides, aion2builds). Titles: metabot.gg (updated 2026-10-15). The class
 * table joins the class stat priorities of the planner (src/lib/statPriority.ts) with the genus lines; tank and healer
 * lines use the survival targets of the line table (gameplay.tips).
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
    de: 'Welches Haustier du reitest, ist fast egal – stärker machen dich die Sammlung und die Genus Insight. Seelen, Stufen, Kristalle, Würfel-Chancen, Verwandlung und eine Reihenfolge, die nichts verschwendet – mit dem, was die Top 80 reiten.',
    en: 'Which pet you ride hardly matters – the collection and Genus Insight are what make you stronger. Souls, levels, crystals, roll odds, transformation and an order that wastes nothing – with what the top 80 ride.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Haustiere', en: 'Pets' },
    { de: 'Sammlung', en: 'Collection' },
    { de: 'Kampfkraft', en: 'Combat Power' },
  ],
  basis: {
    de: 'Recherche in Community-Guides und Datenbanken zum globalen Server (Oktober 2026), eine koreanische Messung der Kampfkraft und die Haustiere der Top 10 jeder Klasse (AION2 Index, 18.10.2026)',
    en: 'Research in community guides and databases for the global server (October 2026), a Korean Combat Power measurement and the pets of the top 10 of every class (AION2 Index, 2026-10-18)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '207', label: { de: 'Haustiere', en: 'pets' }, note: { de: 'Fera 65 · Natura 48 · Varian 46 · Cogni 41 · Special 7', en: 'Fera 65 · Natura 48 · Varian 46 · Cogni 41 · Special 7' }, tone: 'teal' },
            { value: '105', label: { de: 'Seelen für ein volles Haustier', en: 'souls for a maxed pet' }, note: { de: 'Stufe 3, die Höchststufe auf Global (Korea: 5)', en: 'level 3, the max on Global (Korea: 5)' }, tone: 'blue' },
            { value: '4', label: { de: 'Cogni-Stufe als erstes Ziel', en: 'Cogni level as the first goal' }, note: { de: 'öffnet Zeile 4 mit den Schadenswerten', en: 'opens line 4 with the damage stats' }, tone: 'gold' },
            { value: { de: '+4,5 %', en: '+4.5%' }, label: { de: 'PvE Damage Boost als Titel', en: 'PvE Damage Boost as a title' }, note: { de: 'alle 5 Gattungen auf Stufe 10', en: 'all 5 genera at level 10' }, tone: 'violet' },
          ],
        },
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
              label: { de: 'Kampfkraft', en: 'Combat Power' },
              value: { de: 'Auf Global nicht gemessen; in Korea bis etwa 35K mit voller Genus Insight', en: 'Not measured on Global; up to about 35K with full Genus Insight in Korea' },
            },
            {
              label: { de: 'Freischalten', en: 'Unlock' },
              value: { de: '**5 Seelen** eines Monsters – sie fallen, wenn du es besiegst', en: '**5 souls** of a monster – they drop when you defeat it' },
            },
            {
              label: { de: 'Gilt für', en: 'Applies to' },
              value: { de: 'Laut den Guides alle Charaktere auf demselben Server – Twinks sammeln mit', en: 'According to the guides all characters on the same server – alts collect too' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: 'Nimm beim Questen und Farmen jede Seele mit, schalte **viele verschiedene** Haustiere frei statt weniger teurer, setz in der Genus Insight auf **Cogni** und gib Kristalle erst gezielt aus, wenn die Gattung hoch steht. Ausrüstung und Daevanion bleiben wichtiger – Haustiere laufen nebenher.',
            en: 'Pick up every soul while questing and farming, unlock **many different** pets rather than a few expensive ones, focus Genus Insight on **Cogni** and only spend crystals with a plan once the genus is high. Gear and Daevanion still matter more – pets run alongside.',
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
              { de: 'Reittier und Optik. Alle Reittiere sind gleich schnell (laufen 900, sprinten 1.200, gleiten 500, mit Schub 800).', en: 'Mount and looks. All mounts have the same speed (run 900, sprint 1,200, glide 500, boosted glide 800).' },
              { de: 'Gering', en: 'Low' },
            ],
            [
              { de: '**Owned Effects**', en: '**Owned Effects**' },
              { de: 'Kleine Dauerwerte pro Haustier und Stufe. Sie gelten immer, egal welches du reitest, und addieren sich über alle Haustiere.', en: 'Small permanent stats per pet and level. They always apply, whichever pet you ride, and add up over all your pets.' },
              { de: 'Mittel – viele kleine Werte', en: 'Medium – many small stats' },
            ],
            [
              { de: '**Genus Insight**', en: '**Genus Insight**' },
              { de: 'Bis zu 9 gewürfelte Werte pro Gattung (Angriff, kritischer Schaden, HP %, Schadenstoleranz …), Gattungs-Werte nur gegen Monster dieser Gattung. Zählt in die Kampfkraft, nicht in die Gegenstandsstufe.', en: 'Up to 9 rolled stats per genus (attack, critical damage, HP %, damage tolerance …), genus stats only against monsters of that genus. Counts towards Combat Power, not item level.' },
              { de: '**Groß** im Endgame', en: '**High** in the endgame' },
            ],
            [
              { de: '**Titel**', en: '**Titles**' },
              { de: 'Alle 5 Gattungen auf Stufe 10: **+4,5 % PvE Damage Boost** (ausgerüstet). 200 Haustiere: Defense Bonus +320 und Boss Damage Tolerance +4 %.', en: 'All 5 genera at level 10: **+4.5% PvE Damage Boost** (equipped). 200 pets: Defense Bonus +320 and Boss Damage Tolerance +4%.' },
              { de: 'Langes Ziel', en: 'Long-term goal' },
            ],
          ],
        },
        { type: 'heading', text: { de: 'Was die Top-Spieler reiten', en: 'What the top players ride' } },
        {
          type: 'shares',
          title: { de: 'Das Haustier unter den Top 80', en: 'The pet under the top 80' },
          caption: {
            de: 'Top 10 aller acht Klassen, AION2 Index, 18.10.2026. Drei von vier reiten ein Haustier aus Shop, Pass oder Event – Special-Haustiere haben keinen Gattungs-Bonus. Die Stärke steckt in der Sammlung, nicht im Haustier unter dir.',
            en: 'Top 10 of all eight classes, AION2 Index, 2026-10-18. Three in four ride a pet from the shop, a pass or an event – Special pets have no genus bonus. The power is in the collection, not in the pet you sit on.',
          },
          unit: { de: 'Spieler', en: 'players' },
          items: [
            { label: { de: 'Halloween-Haustiere aus dem Shop', en: 'Halloween shop pets' }, value: 32, note: 'Little Ghost 25 · Pumpkin Carriage 7', tone: 'rose' },
            { label: { de: 'Special-Haustiere', en: 'Special pets' }, value: 29, note: 'Black Dragon 9 · White Bunny 7 · Chonky Hamster 7 · Swift Lugi 4 · Pagati 2', tone: 'violet' },
            { label: { de: 'Haustiere aus Monster-Seelen', en: 'Pets from monster souls' }, value: 19, note: { de: '13 verschiedene, z. B. Silver Blade Rotan 3', en: '13 different ones, e.g. Silver Blade Rotan 3' }, tone: 'teal' },
          ],
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
      title: { de: 'Wie viel Kampfkraft bringen Haustiere?', en: 'How much Combat Power do pets give?' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Eine gemessene Zahl für den globalen Server gibt es nicht: Das Spiel rechnet die Kampfkraft auf dem Server, die Formel ist nicht öffentlich. Die einzige Messung stammt aus Korea (Inven, März 2026, als die Kampfkraft dort eingeführt wurde). Sie zählt pro Zeile der Genus Insight – hier neben anderen Schritten:',
            en: 'There is no measured number for the global server: the game computes Combat Power on the server and the formula is not public. The only measurement comes from Korea (Inven, March 2026, when Combat Power was introduced there). It counts per Genus Insight line – here next to other steps:',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kampfkraft pro Schritt (Korea)', en: 'Combat Power per step (Korea)' },
          caption: {
            de: 'Gemessen in Korea (Inven, 18.3.2026), andere Skala als auf Global – lies es als Verhältnis. Der Balken zeigt das obere Ende der Spanne. „Alle 45 Zeilen“ (9 × 5 Gattungen) ist aus den Einzelzeilen gerechnet, nicht gemessen.',
            en: 'Measured in Korea (Inven, 18 Mar 2026), on another scale than Global – read it as a ratio. The bar shows the upper end of the range. "All 45 lines" (9 × 5 genera) is worked out from the single lines, not measured.',
          },
          unit: 'K',
          items: [
            { label: { de: 'Alle 45 Genus-Insight-Zeilen', en: 'All 45 Genus Insight lines' }, value: 35, display: '≈ 5–35K', note: { de: 'gerechnet', en: 'worked out' }, tone: 'teal' },
            { label: { de: '1 Zeile, starker Wert', en: '1 line, strong stat' }, value: 0.8, display: { de: '≈ 0,5–0,8K', en: '≈ 0.5–0.8K' }, note: 'Damage Boost, Critical Damage Boost', tone: 'teal' },
            { label: { de: '1 Zeile, schwacher Wert', en: '1 line, weak stat' }, value: 0.2, display: { de: '≈ 0,1–0,2K', en: '≈ 0.1–0.2K' }, tone: 'teal' },
            { label: { de: 'Ein Armreif', en: 'One bracelet' }, value: 30, display: '≈ 30K', tone: 'slate' },
            { label: { de: 'Ein Stigma von 1 auf 20', en: 'One stigma from 1 to 20' }, value: 15, display: '≈ 10–15K', tone: 'slate' },
            { label: { de: 'Ein Rüstungsteil', en: 'One armour piece' }, value: 12, display: '≈ 3–12K', tone: 'slate' },
            { label: { de: 'Ein Skill von 1 auf 10', en: 'One skill from 1 to 10' }, value: 3, display: '≈ 1–3K', tone: 'slate' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Auf dem globalen Server eher weniger', en: 'Probably less on the global server' },
          text: {
            de: 'Global hat Haustiere nur bis Stufe 3 (Korea 5), und das Genus-Insight-Fenster ist hier defensiver gebaut – laut koreanischen Spielern zählt die Kampfkraft Angriff deutlich stärker als Verteidigung. Nimm die Zahlen deshalb als Obergrenze. Die Owned Effects (+1 bis +2 pro Haustier) hat niemand gemessen; sie sind klein.',
            en: 'Global only has pets up to level 3 (Korea 5), and its Genus Insight panel is built more defensively – Korean players say Combat Power weighs attack far more than defence. So take these numbers as a ceiling. Nobody has measured the Owned Effects (+1 to +2 per pet); they are small.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'So misst du es selbst', en: 'Measure it yourself' },
          text: {
            de: 'Schreib deine Kampfkraft im Charakterfenster auf, schalte ein paar Haustiere frei oder würfle einmal und vergleich danach – ohne dazwischen Ausrüstung, Preset oder Titel zu wechseln.',
            en: 'Note your Combat Power in the character window, unlock a few pets or roll once, then compare – without changing gear, preset or title in between.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/combat-power', label: { de: 'Was sonst wie viel Kampfkraft bringt', en: 'What else gives how much Combat Power' } }] },
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
                de: 'Die Episoden-Quest **All Geared Up** (Elyos) bzw. **Gathering Essentials** (Asmodier) lässt dich zwischen den Fera-Haustieren Fossa, Armadon und Tog wählen. Damit ist das System offen – welches du nimmst, ist fast egal.',
                en: 'The episode quest **All Geared Up** (Elyos) or **Gathering Essentials** (Asmodians) lets you choose between the Fera pets Fossa, Armadon and Tog. That opens the system – which one you take hardly matters.',
              },
            },
            {
              title: { de: 'Seelen von Monstern', en: 'Souls from monsters' },
              text: {
                de: 'Die meisten Haustiere (158) lassen Seelen fallen, wenn du ihr Monster besiegst – laut den Client-Tabellen (metabot) bei jedem Kill. Mit **5 Seelen** ist das Haustier freigeschaltet, Stufe 3 sind also rund 105 Kills desselben Monsters. Wo ein Monster lebt, steht im Haustier-Fenster im Reiter **Source**.',
                en: 'Most pets (158) drop souls when you defeat their monster – according to the client tables (metabot) on every kill. With **5 souls** the pet is unlocked, so level 3 is about 105 kills of the same monster. Where a monster lives is shown in the pet window on the **Source** tab.',
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
                de: 'Die 7 Special-Haustiere findest du nicht im Freien: Black Dragon (Daeva’s Chest of Might), Swift Lugi (Daeva Pass), Wandering Merchant Lugi (Festival-Shop), Pagati (Tsenka-Händler oder Pet Chest), White Bunny und Chonky Hamster (Atelier-Shop) und Two. Sie lassen sich nicht verwandeln, lassen keine Seelen fallen und haben keinen Gattungs-Bonus.',
                en: 'You won’t find the 7 Special pets in the open world: Black Dragon (Daeva’s Chest of Might), Swift Lugi (Daeva Pass), Wandering Merchant Lugi (festival shop), Pagati (Tsenka merchants or Pet Chest), White Bunny and Chonky Hamster (Atelier shop) and Two. They can’t be used for transformation, drop no souls and have no genus bonus.',
              },
            },
          ],
        },
        { type: 'heading', text: { de: 'Leicht zu farmen', en: 'Easy to farm' } },
        {
          type: 'text',
          text: {
            de: 'Alle Haustiere einer Gattung geben dieselben Werte – Seltenheit bringt nichts. Nimm also die, deren Monster niedrig sind und oft vorkommen:',
            en: 'All pets of a genus give the same stats – rarity adds nothing. So take the ones whose monsters are low level and common:',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Gattung', en: 'Genus' }, 'Elyos (Verteron)', { de: 'Asmodier (Altgard)', en: 'Asmodians (Altgard)' }],
          rows: [
            ['**Cogni**', { de: 'Wandering Klaw (≈ St. 19), Krall Laborer', en: 'Wandering Klaw (≈ Lv 19), Krall Laborer' }, { de: 'Decomposed Lupyllini (St. 10)', en: 'Decomposed Lupyllini (Lv 10)' }],
            ['**Natura**', both('Fungie, Agrint'), both('Rafflesia')],
            ['**Fera**', { de: 'Skyray (mehrere Varianten geben dieselbe Seele), Sparkie, Crestlich', en: 'Skyray (several variants drop the same soul), Sparkie, Crestlich' }, both('Papis')],
            ['**Varian**', both('Kalgolem, Contaminated Slime'), { de: 'Contaminated Swarm (St. 11)', en: 'Contaminated Swarm (Lv 11)' }],
          ],
        },
      ],
    },
    {
      title: { de: 'Stufen und Seelen', en: 'Levels and souls' },
      blocks: [
        {
          type: 'table',
          head: [{ de: 'Stufe', en: 'Level' }, { de: 'Seelen', en: 'Souls' }, { de: 'Gesamt', en: 'Total' }, { de: 'Gattungs-Erfahrung', en: 'Genus experience' }, { de: 'Was es bringt', en: 'What it gives' }],
          rows: [
            ['1', '5', '5', '+500', { de: 'Freigeschaltet und reitbar, erster Owned Effect', en: 'Unlocked and rideable, first Owned Effect' }],
            ['2', '+25', '30', '+250', { de: 'Gleiten mit dem Haustier, zweiter Owned Effect', en: 'Gliding on the pet, second Owned Effect' }],
            ['3', '+75', '105', '+250', { de: 'Verwandlung möglich, alle Owned Effects, sein Monster lässt jetzt Kristalle fallen – auf dem globalen Server die Höchststufe', en: 'Transformation unlocked, all Owned Effects, its monster now drops crystals – the max level on the global server' }],
          ],
        },
        {
          type: 'bars',
          title: { de: 'Gattungs-Erfahrung pro Seele', en: 'Genus experience per soul' },
          caption: {
            de: 'Gerechnet aus der Gattungs-Erfahrung pro Haustier und Stufe (daevaguides, aion2builds). Eine Seele für ein neues Haustier bringt der Gattung 30-mal so viel wie eine Seele für Stufe 3. Dazu gibt jeder Analyze-Wurf 100 Erfahrung pro offener Zeile.',
            en: 'Worked out from the genus experience per pet and level (daevaguides, aion2builds). A soul for a new pet gives the genus 30 times as much as a soul for level 3. On top, every Analyze roll gives 100 experience per open line.',
          },
          items: [
            { label: { de: 'Neues Haustier', en: 'New pet' }, value: 100, display: '100', note: { de: '500 für 5 Seelen', en: '500 for 5 souls' }, tone: 'gold' },
            { label: { de: 'Stufe 2', en: 'Level 2' }, value: 10, display: '10', note: { de: '250 für 25 Seelen', en: '250 for 25 souls' }, tone: 'blue' },
            { label: { de: 'Stufe 3', en: 'Level 3' }, value: 3.3, display: { de: '3,3', en: '3.3' }, note: { de: '250 für 75 Seelen – dafür fallen danach Kristalle', en: '250 for 75 souls – but crystals drop afterwards' }, tone: 'slate' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Erst breit, dann tief', en: 'Wide first, then deep' },
          text: {
            de: 'Für die Gattung zählt vor allem, **wie viele** Haustiere du hast: Stufe 4 in Cogni (5.000 Erfahrung) sind 10 neue Cogni-Haustiere (50 Seelen) – oder 5 Haustiere ganz auf Stufe 3 (525 Seelen). Schalte erst viele frei und zieh dann die hoch, deren Monster du sowieso oft triffst. Stufe 3 lohnt sich trotzdem: Erst dann lässt das Monster Kristalle für die Genus Insight fallen.',
            en: 'The genus mostly counts **how many** pets you have: level 4 in Cogni (5,000 experience) is 10 new Cogni pets (50 souls) – or 5 pets taken all the way to level 3 (525 souls). Unlock many first, then level the ones whose monsters you meet often anyway. Level 3 still pays off: only then does the monster drop crystals for Genus Insight.',
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
            ['**Varian**', '46', { de: 'Sprint-Kosten beim Reiten −0,3 % · Evasion +2 · Constitution +1', en: 'Sprint cost when riding −0.3% · Evasion +2 · Constitution +1' }, both('Evasion +92 · Constitution +46')],
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
        { type: 'links', items: [{ href: '#/pets', label: { de: 'Deine eigene Sammlung durchrechnen', en: 'Work out your own collection' } }] },
      ],
    },
    {
      title: { de: 'Genus Insight: welche Gattung', en: 'Genus Insight: which genus' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die **Genus Insight** ist der zweite Reiter im Haustier-Fenster. Jede der fünf Gattungen hat eine eigene Stufe von 1 bis 10, und die Stufen 1–9 öffnen je eine Werte-Zeile – bis zu 9 pro Gattung. Die Stufe steigt durch neue Haustiere, deren Stufen und durch Analyze.',
            en: '**Genus Insight** is the second tab in the pet window. Each of the five genera has its own level from 1 to 10, and levels 1–9 open one stat line each – up to 9 per genus. The level rises with new pets, their levels and with Analyze.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Gattungs-Werte wirken nur gegen die eigene Gattung', en: 'Genus stats only work against their own genus' },
          text: {
            de: 'Trägt ein Wert den Namen einer Gattung (zum Beispiel „Cogni Attack“), wirkt er nur gegen Monster dieser Gattung – Cogni Damage Boost macht gegen einen Fera-Boss nichts. Allgemeine Werte wie Attack Bonus, Boss Attack oder PvE Attack wirken immer. **Special** hat nur allgemeine Werte, darum gehören die Regenbogen-Kristalle dorthin.',
            en: 'When a stat carries the name of a genus (“Cogni Attack”, for example), it only works against monsters of that genus – Cogni Damage Boost does nothing against a Fera boss. General stats like Attack Bonus, Boss Attack or PvE Attack always work. **Special** only has general stats, which is why rainbow crystals belong there.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Welche Gattung zuerst?', en: 'Which genus first?' },
          text: {
            de: 'Laut daevaguides helfen Cogni- und Fera-Werte im Kampf am meisten. Gattungs-Werte behältst du dort, wo du die passenden Monster bekämpfst; sonst würfelst du sie weg und behältst nur allgemeine.',
            en: 'According to daevaguides, Cogni and Fera stats help most in combat. Keep genus stats where you fight the matching monsters; otherwise reroll them away and keep only general ones.',
          },
        },
      ],
    },
    {
      title: { de: 'Genus Insight: würfeln und sperren', en: 'Genus Insight: rolling and locking' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Ein Wurf kostet', en: 'One roll costs' }, value: { de: '4 Soul Crystals der Gattung (oder Regenbogen-Kristalle) + 1.000 Kina – und würfelt alle offenen Zeilen neu', en: '4 Soul Crystals of the genus (or rainbow crystals) + 1,000 Kina – and rerolls all open lines' } },
            { label: { de: 'Ein Wurf bringt', en: 'One roll gives' }, value: { de: '100 Gattungs-Erfahrung pro offener Zeile – Würfeln levelt die Gattung also mit', en: '100 genus experience per open line – so rolling levels the genus too' } },
            { label: { de: 'Sperren', en: 'Locking' }, value: { de: 'Gute Zeilen kannst du sperren – jede gesperrte Zeile macht den nächsten Wurf deutlich teurer', en: 'You can lock good lines – every locked line makes the next roll a lot more expensive' } },
            { label: { de: 'Presets', en: 'Presets' }, value: { de: 'Bis zu 3', en: 'Up to 3' } },
            { label: { de: 'Erstes Ziel', en: 'First goal' }, value: { de: 'Stufe 4 in Cogni (5.000 Erfahrung, etwa 10 Haustiere) – sie öffnet Zeile 4 mit den Schadenswerten', en: 'Level 4 in Cogni (5,000 experience, about 10 pets) – it opens line 4 with the damage stats' } },
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
          type: 'bars',
          title: { de: 'Chance auf Unique oder Heroic pro Zeile', en: 'Chance of Unique or Heroic per line' },
          caption: {
            de: 'Aus der Tabelle oben (daevaguides, metabot.gg). Zwischen Stufe 7 und 10 steigt die Chance von 1 % auf 20 % – auf das Zwanzigfache. Darunter steht, wie oft eine Zeile mindestens Epic wird.',
            en: 'From the table above (daevaguides, metabot.gg). Between level 7 and 10 the chance rises from 1% to 20% – twenty times as much. Below each bar: how often a line is at least Epic.',
          },
          unit: '%',
          items: [
            { label: { de: 'Stufe 1', en: 'Level 1' }, value: 0, note: { de: 'mindestens Epic: 0 %', en: 'Epic or better: 0%' }, tone: 'slate' },
            { label: { de: 'Stufe 4', en: 'Level 4' }, value: 0, note: { de: 'mindestens Epic: 5 %', en: 'Epic or better: 5%' }, tone: 'slate' },
            { label: { de: 'Stufe 7', en: 'Level 7' }, value: 1, note: { de: 'mindestens Epic: 31 %', en: 'Epic or better: 31%' }, tone: 'blue' },
            { label: { de: 'Stufe 9', en: 'Level 9' }, value: 11, note: { de: 'mindestens Epic: 50 %', en: 'Epic or better: 50%' }, tone: 'gold' },
            { label: { de: 'Stufe 10', en: 'Level 10' }, value: 20, note: { de: 'mindestens Epic: 50 %', en: 'Epic or better: 50%' }, tone: 'gold' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Erst hochleveln, dann sperren', en: 'Level up first, lock later' },
          text: {
            de: 'Unter Stufe 7 gibt es kein Unique, unter Stufe 9 kein Heroic. Sperre deshalb erst ab Stufe 9–10. Vorher würfelst du nur, um die Zeilen zu füllen – das ist nicht verschwendet, denn jeder Wurf gibt Gattungs-Erfahrung. Ausnahme: ein sehr guter Wurf auf Zeile 4.',
            en: 'Below level 7 there is no Unique, below level 9 no Heroic. So only lock from level 9–10. Before that you roll just to fill the lines – that is not wasted, since every roll gives genus experience. The exception: a very good roll on line 4.',
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
        {
          type: 'text',
          text: {
            de: 'Die Ziele pro Zeile stammen aus einem Guide (gameplay.tips). Bekommst du auf einer Zeile einen Gattungs-Wert, gilt die Regel oben: behalten, wenn du gegen diese Gattung kämpfst, sonst weg.',
            en: 'The targets per line come from one guide (gameplay.tips). If a line rolls a genus stat, the rule above applies: keep it if you fight that genus, otherwise reroll it.',
          },
        },
      ],
    },
    {
      title: { de: 'Haustiere für deine Klasse', en: 'Pets for your class' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein bestimmtes Haustier braucht keine Klasse – alle Haustiere einer Gattung geben dieselben Werte. Was sich unterscheidet, sind die Zeilen, die du in der Genus Insight behältst. Die Tabelle verbindet die Werte, die jede Klasse laut Planer am meisten braucht, mit den passenden Gattungen.',
            en: 'No class needs a particular pet – all pets of a genus give the same stats. What differs are the lines you keep in Genus Insight. The table joins the stats each class needs most according to the planner with the genera that give them.',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Klasse', en: 'Class' }, { de: 'Zeilen behalten', en: 'Lines to keep' }, { de: 'Passende Owned Effects', en: 'Matching Owned Effects' }],
          rows: [
            ['**Gladiator**', both('Cogni: Attack, Critical Hit, Damage Boost · Special: Double Chance'), both('Cogni (Might, Critical Hit)')],
            [{ de: '**Templer**', en: '**Templar**' }, both('Cogni: Damage Tolerance, Defense, Block · HP Increase %'), both('Cogni (HP), Natura (Critical Hit Resist), Varian (Evasion, Constitution)')],
            [{ de: '**Assassine**', en: '**Assassin**' }, both('Cogni: Critical Hit, Attack, Damage Boost'), both('Cogni (Critical Hit, Might)')],
            [{ de: '**Waldläufer**', en: '**Ranger**' }, both('Cogni: Accuracy, Attack, Damage Boost'), both('Cogni, Fera (Accuracy)')],
            [{ de: '**Magier**', en: '**Sorcerer**' }, both('Cogni: Damage Boost, Attack, Critical Hit'), both('Cogni')],
            [{ de: '**Beschwörer**', en: '**Spiritmaster**' }, both('Cogni: Attack, Damage Boost'), both('Cogni')],
            [{ de: '**Kleriker**', en: '**Cleric**' }, { de: 'Erst Überleben: Damage Tolerance, HP Increase % – dann Cogni: Attack', en: 'Survival first: Damage Tolerance, HP Increase % – then Cogni: Attack' }, both('Cogni (HP), Varian')],
            [{ de: '**Kantor**', en: '**Chanter**' }, both('Cogni: Attack, Accuracy · Special: Double Chance'), both('Cogni, Fera (Accuracy)')],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Für alle gleich', en: 'The same for everyone' },
          text: {
            de: 'Allgemeine Werte (Attack Bonus, Boss Attack, PvE Attack) wirken gegen jedes Monster – die behältst du in jeder Gattung. **Double Chance** ist der Mehrfachtreffer, den Gladiator und Kantor besonders brauchen. Combat Speed und Cooldown Reduction, die Magier und Kleriker am meisten wollen, nennen die Quellen bei Haustieren nicht – die holst du über Daevanion und Ausrüstung.',
            en: 'General stats (Attack Bonus, Boss Attack, PvE Attack) work against every monster – keep them on every genus. **Double Chance** is the multi-hit that Gladiators and Chanters need most. Combat Speed and Cooldown Reduction, which Sorcerers and Clerics want most, aren’t named for pets in the sources – get them from Daevanion and gear.',
          },
        },
        { type: 'links', items: [{ href: '#/daevanion', label: { de: 'Werte-Reihenfolge deiner Klasse ansehen', en: 'See your class’s stat priority' } }] },
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
              de: '**Sammel-Belohnungen:** bei 5 Haustieren, danach alle 10 – meist 100 Soul Crystals (Bound), jede 50. stattdessen 10 Empathy Candy. Mit allen 207 Haustieren sind das 1.700 Soul Crystals und 40 Candy – genug für rund **425 Würfe** ohne Sperren.',
              en: '**Collection rewards:** at 5 pets, then every 10 – mostly 100 Soul Crystals (Bound), every 50th 10 Empathy Candy instead. With all 207 pets that is 1,700 Soul Crystals and 40 candy – enough for about **425 rolls** without locks.',
            },
            {
              de: '**Monster:** Steht ein Haustier auf Höchststufe, lässt sein Monster Kristalle seiner Gattung fallen.',
              en: '**Monsters:** once a pet is at max level, its monster drops crystals of its genus.',
            },
            {
              de: '**Duty Quests, versteckte Würfel und der Shugo-Festival-Shop:** Kristalle aller Farben, auch die seltenen hellblauen für Special.',
              en: '**Duty quests, hidden cubes and the Shugo Festival shop:** crystals of every colour, including the rare light-blue ones for Special.',
            },
            {
              de: '**Halloween-Event (Oktober 2026):** Die Special Halloween Chest (250 Münzen, einmal pro Server) enthält 10.000 Pet Soul Crystals – mehr als alle Sammel-Belohnungen zusammen. Wenn du das Event spielst, ist sie die beste Kristall-Quelle.',
              en: '**Halloween event (October 2026):** the Special Halloween Chest (250 coins, once per server) holds 10,000 Pet Soul Crystals – more than all collection rewards together. If you play the event, it is the best crystal source.',
            },
            {
              de: '**Farben:** Cogni blau, Fera rot, Natura grün, Varian gelb, Special hellblau. **Regenbogen-Kristalle** zählen für jede Gattung – heb sie für Special auf: Die anderen Farben farmst du leicht, und Special steigt ohne Seelen nur durch Analyze.',
              en: '**Colours:** Cogni blue, Fera red, Natura green, Varian yellow, Special light blue. **Rainbow crystals** count for any genus – save them for Special: the other colours are easy to farm, and Special, having no souls, only levels through Analyze.',
            },
          ],
        },
        { type: 'heading', text: { de: 'Verwandlung', en: 'Transformation' } },
        {
          type: 'text',
          text: {
            de: 'Ab Stufe 3 verwandelt dich **Empathy Candy** für 5 Minuten in dein aktives Haustier (nicht in Special-Haustiere). Skills gehen weiter, Reiten nicht; vor einem Haustier-Wechsel musst du die Verwandlung beenden. Candy gibt es aus den Sammel-Belohnungen und im Festival-Shop (20 Centuryroot Tokens). Werte für die Verwandlung nennen die Quellen nicht.',
            en: 'From level 3, **Empathy Candy** turns you into your active pet for 5 minutes (not into Special pets). You can still use skills, but not ride; you have to end the transformation before switching pets. Candy comes from the collection rewards and the festival shop (20 Centuryroot Tokens). The sources name no stats for the transformation.',
          },
        },
      ],
    },
    {
      title: { de: 'So gehst du vor', en: 'What to do, in order' },
      blocks: [
        {
          type: 'flow',
          title: { de: 'Der Weg durch das Haustier-System', en: 'The path through the pet system' },
          caption: {
            de: 'Haustiere laufen neben Ausrüstung und Daevanion her – keiner dieser Schritte braucht eigene Spielzeit, außer gezieltem Seelen-Farmen im Endgame.',
            en: 'Pets run alongside gear and Daevanion – none of these steps needs its own play time, except targeted soul farming in the endgame.',
          },
          items: [
            { title: { de: 'Erstes Haustier', en: 'First pet' }, tag: { de: 'Stufe 10', en: 'Level 10' }, text: { de: 'Quest machen, eins von dreien wählen – fertig', en: 'Do the quest, pick one of three – done' }, tone: 'teal' },
            { title: { de: 'Jede Seele mitnehmen', en: 'Pick up every soul' }, tag: { de: 'beim Leveln', en: 'while levelling' }, text: { de: 'Neue Haustiere bringen am meisten: 500 Gattungs-Erfahrung für 5 Seelen', en: 'New pets give the most: 500 genus experience for 5 souls' }, tone: 'teal' },
            { title: { de: 'Mit Twinks sammeln', en: 'Collect with alts' }, tag: { de: 'gleicher Server', en: 'same server' }, text: { de: 'Twinks, die durch andere Gebiete leveln, füllen die Sammlung mit', en: 'Alts levelling through other areas fill the collection too' }, tone: 'blue' },
            { title: { de: 'Stufe 3 und Cogni 4', en: 'Level 3 and Cogni 4' }, tag: 'Endgame', text: { de: 'Stufe 3 lässt Kristalle fallen, Cogni 4 öffnet die Schadens-Zeile; ab Gattungs-Stufe 9–10 gezielt würfeln', en: 'Level 3 makes crystals drop, Cogni 4 opens the damage line; roll with a plan from genus level 9–10' }, tone: 'gold' },
            { title: { de: 'Die Titel', en: 'The titles' }, tag: { de: 'langes Ziel', en: 'long-term' }, text: { de: 'Alle Gattungen auf 10 und 200 Haustiere', en: 'All genera at 10 and 200 pets' }, tone: 'violet' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Die beiden Haustier-Titel (metabot.gg, Stand 15.10.2026)', en: 'The two pet titles (metabot.gg, as of 15 Oct 2026)' },
          head: [{ de: 'Titel', en: 'Title' }, { de: 'Bedingung', en: 'Condition' }, { de: 'Ausgerüstet', en: 'Equipped' }, { de: 'Nur besessen', en: 'Owned only' }],
          rows: [
            ['**Unbound by Genus**', { de: 'Alle 5 Gattungen auf Stufe 10', en: 'All 5 genera at level 10' }, both('PvE Damage Boost +4.5% · Attack Bonus +34 · Critical Hit +68'), both('PvE Damage Boost +1%')],
            ['**Rule All Creation**', { de: '200 Haustiere', en: '200 pets' }, both('Defense Bonus +320 · Back Attack Damage Tolerance +3% · Boss Damage Tolerance +4%'), both('Move Speed +1%')],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Twinks und die Sammlung', en: 'Alts and the collection' },
          text: {
            de: 'Laut den Guides teilen sich alle Charaktere eines Servers die Sammlung. NC hat die Details für Global nicht bestätigt. Wie du mehrere Charaktere sonst sinnvoll einsetzt, steht im Twink-Guide.',
            en: 'According to the guides all characters on a server share the collection. NC has not confirmed the details for Global. How to use several characters well otherwise is in the alts guide.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/multi-characters', label: { de: 'Mehrere Charaktere spielen', en: 'Playing several characters' } }] },
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
              de: '**Wenige Haustiere hochziehen statt viele freischalten** – eine Seele für ein neues Haustier bringt der Gattung 30-mal so viel wie eine für Stufe 3.',
              en: '**Levelling a few pets instead of unlocking many** – a soul for a new pet gives the genus 30 times as much as one for level 3.',
            },
            {
              de: '**Gattungs-Werte behalten, ohne zu prüfen, wogegen du kämpfst** – „Fera Damage Boost“ wirkt nur gegen Fera-Monster.',
              en: '**Keeping genus stats without checking what you fight** – “Fera Damage Boost” only works against Fera monsters.',
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
            de: 'Die Quellen sind sich nicht in allem einig: ob die Genus Insight 9 oder 10 Zeilen hat, welche Werte genau an eine Gattung gebunden sind, wie viel Erfahrung die Gattungs-Stufen 5–10 brauchen, ob Seelen wirklich bei jedem Kill fallen, ob die Halloween-Haustiere eigene Werte haben und wie genau die Sammlung auf Global zwischen Charakteren geteilt wird. Die Kampfkraft-Zahlen stammen aus Korea (Stufe 5, anderes Genus-Insight-Fenster), die Summen in der Owned-Effects-Tabelle und die 5–35K sind gerechnet, nicht gemessen. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'The sources don’t agree on everything: whether Genus Insight has 9 or 10 lines, which stats exactly are tied to a genus, how much experience genus levels 5–10 need, whether souls really drop on every kill, whether the Halloween pets have stats of their own and how exactly the collection is shared between characters on Global. The Combat Power numbers come from Korea (level 5, a different Genus Insight panel); the totals in the Owned Effects table and the 5–35K are worked out, not measured. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/mounts-wings-guide', label: 'metabot.gg – Mounts, pets & wings guide (titles, collection rewards)' },
            { href: 'https://daevaguides.com/en/guides/pets-genus-insight/', label: 'daevaguides – Pets & Genus Insight' },
            { href: 'https://aion2builds.org/guides/pets/', label: 'aion2builds – Pets & Genus Insight' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1529', label: 'Inven (KR) – Measured Combat Power changes' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/636', label: 'Inven (KR) – Why invest in Special' },
            { href: 'https://metabot.gg/en/aion-2/guides/combat-power-guide', label: 'metabot.gg – Combat Power guide' },
            { href: 'https://gameplay.tips/guides/aion-2-pet-genus-system-guide.html', label: 'gameplay.tips – Pet genus system guide' },
            { href: 'https://www.iggm.com/news/aion-2-pet-system-deep-dive-hidden-stat-pool-more-than-mounts', label: 'IGGM – Pet system deep dive' },
            { href: 'https://mein-mmo.de/aion-2-arkana-pet-daevanion/3/', label: 'Mein-MMO – Pets (DE)' },
            { href: 'https://www.tribality.com/articles/how-to-boost-endgame-combat-power-in-aion-2-iggm-reveals-hidden-bonuses-you-may-be-missing/', label: 'Tribality – Hidden Combat Power bonuses' },
            { href: 'https://leprestore.com/guides/aion2/gear-score-combat-power/', label: 'leprestore – Gear score vs Combat Power' },
            { href: 'https://howtovideogame.com/aion-2-combat-power/', label: 'howtovideogame – How to increase Combat Power' },
            { href: 'https://aion2hub.com/news/aion-2-halloween-skins-pets-wings-shop-oct-14', label: 'AION2Hub – Halloween shop (14 Oct 2026)' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-14', label: 'AION2Hub – Global patch notes 14 Oct 2026 (Halloween chest)' },
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings (pets of the top 10)' },
          ],
        },
      ],
    },
  ],
};
