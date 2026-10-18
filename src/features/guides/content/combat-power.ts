import type { ClassType } from '../../../data/types';
import type { Guide, GuideCell, L10n } from '../types';
import { CLASS_GUIDE_SECTION, classGuideHref } from '../guideLinks';

/**
 * Highest Combat Power, the general part; each class guide has its own section (classGuide.ts, `power`).
 * The formula is not public, so this rests on: metabot.gg's statistics and client data (correlations, enhancement,
 * gear ladder, Arcana – checked 2026-10-18), the Korean Inven measurement of 2026-03-18 (another scale, ratios only)
 * and our own top-10 data (public/data/top, AION2 Index, 2026-10-17/18): 80 players, medians per class below.
 * Wise / White Dragon Lord are the Elyos names, Ebony / Dark Dragon Lord the Asmodian names of the same items.
 */

const both = (s: string): L10n => ({ de: s, en: s });
/** "1,400" → "1.400" and "0.5" → "0,5" in German. */
const num = (en: string): L10n => ({ en, de: en.replace(/(?<=\d)[.,](?=\d)/g, (c) => (c === '.' ? ',' : '.')).replace(/(\d)M\b/g, '$1 Mio.') });
const pct = (n: number): GuideCell => ({ de: `${n} %`, en: `${n}%` });

/** Top 10 of each class on 2026-10-18: median Combat Power, median item level, median Combat Power per item level. */
const CLASS_ROWS: { cls: ClassType; de: string; en: string; cp: string; ilv: string; per: string }[] = [
  { cls: 'Ranger', de: 'Waldläufer', en: 'Ranger', cp: '≈250K', ilv: '3,420', per: '73' },
  { cls: 'Gladiator', de: 'Gladiator', en: 'Gladiator', cp: '≈240K', ilv: '3,432', per: '70' },
  { cls: 'Sorcerer', de: 'Magier', en: 'Sorcerer', cp: '≈233K', ilv: '3,327', per: '71' },
  { cls: 'Assassin', de: 'Assassine', en: 'Assassin', cp: '≈228K', ilv: '3,355', per: '70' },
  { cls: 'Chanter', de: 'Kantor', en: 'Chanter', cp: '≈217K', ilv: '3,233', per: '67' },
  { cls: 'Elementalist', de: 'Beschwörer', en: 'Spiritmaster', cp: '≈217K', ilv: '3,403', per: '67' },
  { cls: 'Templar', de: 'Templer', en: 'Templar', cp: '≈214K', ilv: '3,176', per: '66' },
  { cls: 'Cleric', de: 'Kleriker', en: 'Cleric', cp: '≈210K', ilv: '3,182', per: '66' },
];

export const combatPower: Guide = {
  id: 'combat-power',
  icon: 'score',
  tone: 'rose',
  category: 'basics',
  title: {
    de: 'Höchste Kampfkraft: so kommst du an die Spitze',
    en: 'Highest Combat Power: how to reach the top',
  },
  summary: {
    de: 'Was die Kampfkraft wirklich treibt, wie viel jeder Schritt bringt und in welcher Reihenfolge du vorgehst – mit Verzauberungs-Chancen, Kosten und dem, was die Top 10 jeder Klasse tragen. Der Klassen-Teil steht in jedem Klassen-Guide.',
    en: 'What really drives Combat Power, how much each step gives and the order to do it in – with enhancement odds, costs and what the top 10 of every class wear. The class part is in every class guide.',
  },
  updated: '2026-10-18',
  tags: [
    { de: 'Kampfkraft', en: 'Combat Power' },
    { de: 'Ausrüstung', en: 'Gear' },
    { de: 'Endgame', en: 'Endgame' },
  ],
  basis: {
    de: 'Statistik und Client-Daten aus Community-Guides zum globalen Server (Oktober 2026), eine Messung aus Korea und die Ausrüstung der Top 10 aller acht Klassen (AION2 Index, 18.10.2026)',
    en: 'Statistics and client data from community guides for the global server (October 2026), a measurement from Korea and the gear of the top 10 of all eight classes (AION2 Index, 2026-10-18)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'facts',
          items: [
            {
              label: { de: 'Formel', en: 'Formula' },
              value: { de: 'Nicht öffentlich – das Spiel rechnet die Kampfkraft auf dem Server. Alles hier stützt sich auf Statistik und Messungen.', en: 'Not public – the game computes Combat Power on the server. Everything here rests on statistics and measurements.' },
            },
            {
              label: { de: 'Was am meisten zählt', en: 'What counts most' },
              value: { de: '**Gegenstandsstufe** (Zusammenhang 0,97), Daevanion-Knoten (0,95), Titel (0,95), Verzauberung (0,81)', en: '**Item level** (correlation 0.97), Daevanion nodes (0.95), titles (0.95), enhancement (0.81)' },
            },
            {
              label: { de: 'Die Spitze (18.10.)', en: 'The top (18 Oct)' },
              value: { de: 'Top 10 jeder Klasse: ≈200–264K Kampfkraft bei Gegenstandsstufe ≈2.950–3.480', en: 'Top 10 of each class: ≈200–264K Combat Power at item level ≈2,950–3,480' },
            },
            {
              label: { de: 'Tempo an der Spitze', en: 'Pace at the top' },
              value: { de: '+36K bis +63K Kampfkraft pro Woche (Median je Klasse)', en: '+36K to +63K Combat Power per week (median per class)' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: 'Alles gleichmäßig auf +10, die vier Stigmen auf 20, Daevanion-Knoten öffnen, alle fünf Arcana füllen und Titel sammeln. Dann das Endgame-Set aus dem Handwerk (Gegenstandsstufe 102) auf +15 bringen – und ganz zuletzt **Amplified Enhancement** bis +5.',
            en: 'Everything evenly to +10, the four stigmas to 20, open Daevanion nodes, fill all five Arcana and collect titles. Then take the crafted endgame set (item level 102) to +15 – and only at the very end **Amplified Enhancement** up to +5.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Wo dieser Guide anfängt', en: 'Where this guide starts' },
          text: {
            de: 'Der Weg bis ≈100K Kampfkraft – Kinah, Routen, Wochenplan – steht im Guide **Farming & Power**. Dieser Guide geht von dort bis an die Spitze. Was deine Klasse anders macht, steht im Abschnitt „Höchste Kampfkraft“ ihres Klassen-Guides.',
            en: 'The way to ≈100K Combat Power – Kinah, routes, a week plan – is in the **Farming & power** guide. This guide goes from there to the top. What your class does differently is in the “Highest Combat Power” section of its class guide.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'Farming & Power lesen', en: 'Read Farming & power' } }] },
      ],
    },
    {
      title: { de: 'Wo du stehst', en: 'Where you stand' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Kampfkraft auf Stufe 45 (globaler Server)', en: 'Combat Power at level 45 (global server)' },
          head: [{ de: 'Vergleichswert', en: 'Benchmark' }, { de: 'Kampfkraft', en: 'Combat Power' }, { de: 'Stand', en: 'As of' }],
          rows: [
            [{ de: 'Median einer Klasse', en: 'Class median' }, '56–58K', { de: '3.10.', en: '3 Oct' }],
            ['Top 10 %', '≈70K', { de: '3.10.', en: '3 Oct' }],
            [{ de: 'Top 100 einer Region', en: 'Top 100 of a region' }, '≈98–107K', { de: '8.10.', en: '8 Oct' }],
            [{ de: '**Top 10 einer Klasse**', en: '**Top 10 of a class**' }, '**≈200–264K**', { de: '18.10.', en: '18 Oct' }],
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Die Zahlen steigen jede Woche: Die Top 10 legen im Median 36K bis 63K pro Woche zu. Vergleiche dich deshalb mit Werten vom selben Tag – die Top-10-Seite zeigt sie täglich neu.',
            en: 'The numbers rise every week: the top 10 gain a median 36K to 63K per week. So compare yourself with values from the same day – the top 10 page shows them fresh every day.',
          },
        },
        { type: 'links', items: [{ href: '#/top', label: { de: 'Top 10 ansehen', en: 'See the top 10' } }] },
      ],
    },
    {
      title: { de: 'Was wie viel bringt', en: 'What gives how much' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Gemessene Werte gibt es kaum. Die meisten stammen aus Korea (Inven, März 2026), wo die Kampfkraft auf einer anderen Skala läuft – lies sie als Verhältnis, nicht als feste Zahl.',
            en: 'Measured values are rare. Most come from Korea (Inven, March 2026), where Combat Power runs on another scale – read them as ratios, not fixed numbers.',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Schritt', en: 'Step' }, { de: 'Kampfkraft', en: 'Combat Power' }, { de: 'Gemessen', en: 'Measured' }],
          rows: [
            [{ de: 'Ein Stigma von Stufe 1 auf 20', en: 'One stigma from level 1 to 20' }, '≈10–15K', { de: 'Korea', en: 'Korea' }],
            [{ de: 'Alle Stigmen zurückgesetzt', en: 'All stigmas reset' }, { de: '−24K (116K → 92K)', en: '−24K (116K → 92K)' }, 'Global'],
            [{ de: 'Ein Rüstungsteil anlegen', en: 'Equipping one armour piece' }, '≈3–12K', { de: 'Korea', en: 'Korea' }],
            [{ de: 'Ein Schmuckstück tauschen', en: 'Swapping one accessory' }, '≈20K', { de: 'Korea', en: 'Korea' }],
            [{ de: 'Ein Armreif', en: 'One bracelet' }, '≈30K', { de: 'Korea', en: 'Korea' }],
            [{ de: 'Höhere Waffe', en: 'Higher weapon' }, { de: '≈4K (Global) · ≈25K (Korea)', en: '≈4K (Global) · ≈25K (Korea)' }, { de: 'beide', en: 'both' }],
            ['Clash Rune +6', '≈5K', { de: 'Korea', en: 'Korea' }],
            [{ de: 'Ein Skill von Stufe 1 auf 10', en: 'One skill from level 1 to 10' }, '≈1–3K', { de: 'Korea', en: 'Korea' }],
            [{ de: 'Pantheon-Statue (Transcendent Bakarma)', en: 'Pantheon statue (Transcendent Bakarma)' }, '≈1K', 'Global'],
            [{ de: 'Eine Genus-Insight-Zeile (Haustiere)', en: 'One Genus Insight line (pets)' }, num('0.1–0.8K'), { de: 'Korea', en: 'Korea' }],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Was daraus folgt', en: 'What follows from it' },
          text: {
            de: '**Stigmen sind die günstigste Kampfkraft:** 75 Stigma Shards bringen ein Stigma von 1 auf 20 – das ist so viel wie ein gutes Rüstungsteil. **Schmuck und Armreifen** bringen in der Messung mehr als einzelne Rüstungsteile – verzaubere sie nicht zuletzt.',
            en: '**Stigmas are the cheapest Combat Power:** 75 Stigma Shards take one stigma from 1 to 20 – as much as a good armour piece. **Jewellery and bracelets** gave more than single armour pieces in the measurement – don’t leave them for last.',
          },
        },
      ],
    },
    {
      title: { de: 'Die Reihenfolge', en: 'The order' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Jeden Platz füllen und alles auf +10', en: 'Fill every slot and take everything to +10' },
              text: { de: 'Bis +10 gelingt jede Stufe – Stärke ohne Risiko. Gleichmäßig verzaubern schlägt einen einzelnen Platz auf +15.', en: 'Every step up to +10 succeeds – power without risk. Enhancing evenly beats one slot at +15.' },
            },
            {
              title: { de: 'Die vier Stigmen auf Stufe 20', en: 'The four stigmas to level 20' },
              text: { de: '75 Stigma Shards pro Stigma, 300 für alle vier. Die Shards gibt es im Abyss-Shop für Abyss-Punkte.', en: '75 Stigma Shards per stigma, 300 for all four. The shards are in the Abyss shop for Abyss Points.' },
            },
            {
              title: { de: 'Daevanion-Knoten öffnen', en: 'Open Daevanion nodes' },
              text: { de: 'Jeder Kristall zählt zur Gegenstandsstufe. Die Top 10 haben im Median 55–66 von 88 Knoten auf den ersten drei Tafeln offen, 71–75 von 116 auf der vierten und erst 22–37 von 152 auf der fünften.', en: 'Every crystal counts towards item level. At the median the top 10 have 55–66 of 88 nodes open on the first three boards, 71–75 of 116 on the fourth and only 22–37 of 152 on the fifth.' },
            },
            {
              title: { de: 'Alle fünf Arcana füllen', en: 'Fill all five Arcana' },
              text: { de: 'Arcana zählen zur Gegenstandsstufe (Unique: 80 pro Karte) und geben Skillstufen. Verzaubern kann nicht scheitern.', en: 'Arcana count towards item level (Unique: 80 per card) and give skill levels. Enhancing them can’t fail.' },
            },
            {
              title: { de: 'Titel und Flügel sammeln', en: 'Collect titles and wings' },
              text: { de: 'Jeder Titel und jedes Flügelpaar gibt dauerhaft Werte, auch wenn du es nicht trägst. Titel hängen so eng mit der Kampfkraft zusammen wie die Daevanion-Knoten.', en: 'Every title and pair of wings gives permanent stats, even when you don’t wear it. Titles track Combat Power as closely as Daevanion nodes.' },
            },
            {
              title: { de: 'Endgame-Set aus dem Handwerk auf +15', en: 'Crafted endgame set to +15' },
              text: { de: 'Splendent Wise bzw. Ebony Dragon Lord (Gegenstandsstufe 102). Über +10 nur bei Teilen, die du behältst – Handwerks-Upgrades nehmen die Verzauberung mit.', en: 'Splendent Wise or Ebony Dragon Lord (item level 102). Go past +10 only on pieces you keep – crafting upgrades carry the enhancement over.' },
            },
            {
              title: { de: 'Ganz zuletzt: Amplified Enhancement bis +5', en: 'At the very end: Amplified Enhancement up to +5' },
              text: { de: 'Nur Unique auf +15. Teuer, aber jede Stufe zählt laut einer Quelle so viel wie fünf normale Verzauberungsstufen.', en: 'Unique at +15 only. Expensive, but one source says each level counts as much as five normal enhancement levels.' },
            },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/daevanion', label: { de: 'Daevanion-Weg planen', en: 'Plan your Daevanion path' } },
            { href: '#/stigma', label: { de: 'Stigmen planen', en: 'Plan stigmas' } },
            { href: '#/guides/crafting-gear', label: { de: 'Handwerks-Ausrüstung', en: 'Crafted gear' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Ausrüstung bis Gegenstandsstufe 102', en: 'Gear up to item level 102' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Unique ist der höchste Rang auf dem globalen Server, mit 20 Plätzen: Waffe, Guard, 7 Rüstungsteile, Halskette, 2 Ohrringe, 2 Ringe, 2 Armreifen, Amulett, Gürtel und 2 Runen. So geht es nach Stufe 45 weiter (Gegenstandsstufe pro Teil):',
            en: 'Unique is the top grade on the global server, with 20 slots: weapon, guard, 7 armour pieces, necklace, 2 earrings, 2 rings, 2 bracelets, amulet, belt and 2 runes. This is how it goes on after level 45 (item level per piece):',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Stufe', en: 'Level' }, { de: 'Ausrüstung', en: 'Gear' }, { de: 'Woher', en: 'Where from' }],
          rows: [
            ['54', both('Rupture, Bakarma'), both('Krao Cave, Draupnir Conquest')],
            ['62', both('True Dragon Lord · Kaira'), { de: 'Handwerk (Meisterschaft 55) · Abyss', en: 'Crafting (Mastery 55) · Abyss' }],
            ['70', both('Aulamus, Vakron · Splendent True Dragon Lord'), { de: 'Urugugu Canyon, Vakron Sky Island Conquest · Handwerk', en: 'Urugugu Canyon, Vakron Sky Island Conquest · crafting' }],
            ['78', both('White / Dark Dragon Lord'), { de: 'Handwerk', en: 'Crafting' }],
            ['86', both('Nuakum, Enraged Kromede · Splendent White / Dark Dragon Lord'), { de: 'Fire Temple, Ferocious Horn Den Conquest, Ludra-Raid · Handwerk', en: 'Fire Temple, Ferocious Horn Den Conquest, Ludra raid · crafting' }],
            ['94', both('Wise / Ebony Dragon Lord'), { de: 'Handwerk', en: 'Crafting' }],
            ['**102**', both('**Splendent Wise / Ebony Dragon Lord** · Ludra’s Blade of Extinction'), { de: 'Handwerk · Ludra-Raid (Waffen und Guard)', en: 'Crafting · Ludra raid (weapons and guard)' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Elyos- und Asmodier-Namen', en: 'Elyos and Asmodian names' },
          text: {
            de: 'Wise und White Dragon Lord heißen bei den Asmodiern Ebony und Dark Dragon Lord – es sind dieselben Teile. Jedes Handwerk hat 25 % Chance auf die Splendent-Version (eine Stufe höher). Ab Gegenstandsstufe 102 gibt es Rüstung und Schmuck nur noch aus dem Handwerk.',
            en: 'Wise and White Dragon Lord are called Ebony and Dark Dragon Lord by the Asmodians – they are the same pieces. Every craft has a 25% chance of the Splendent version (one tier higher). From item level 102, armour and jewellery only come from crafting.',
          },
        },
        { type: 'heading', text: { de: 'Was die Top 80 tragen (18.10.)', en: 'What the top 80 wear (18 Oct)' } },
        {
          type: 'list',
          items: [
            { de: '**Waffe:** Splendent Wise / Ebony Dragon Lord (76 von 80) – 79 von 80 auf +15 mit Amplified +5.', en: '**Weapon:** Splendent Wise / Ebony Dragon Lord (76 of 80) – 79 of 80 at +15 with Amplified +5.' },
            { de: '**Rüstung:** Splendent Wise / Ebony Dragon Lord; bei Kleriker und Kantor ist fast die Hälfte noch Nuakum, bei Templer und Beschwörer knapp ein Drittel – fast alles +15, Amplified +2 bis +5.', en: '**Armour:** Splendent Wise / Ebony Dragon Lord; for Clerics and Chanters nearly half is still Nuakum, for Templars and Spiritmasters almost a third – nearly all +15, Amplified +2 to +5.' },
            { de: '**Schmuck:** Halskette, Ohrringe und Ringe aus dem Splendent-Dragon-Lord-Set auf +15.', en: '**Jewellery:** necklace, earrings and rings from the Splendent Dragon Lord set at +15.' },
            { de: '**Armreifen:** jeder genau ein Ascension Bracelet (meist +15), dazu ein Liberator oder Pilgrim Bracelet +10.', en: '**Bracelets:** each exactly one Ascension Bracelet (mostly +15), plus a Liberator or Pilgrim Bracelet +10.' },
            { de: '**Rest:** Revelation Amulet +10, Noble Belt +10, zwei Clash Runes (+3 bis +5).', en: '**The rest:** Revelation Amulet +10, Noble Belt +10, two Clash Runes (+3 to +5).' },
            { de: '**Arcana:** alle fünf Unique, 70 % der Karten auf +5 – Mischung aus Vigor und Magic (siehe unten).', en: '**Arcana:** all five Unique, 70% of the cards at +5 – a mix of Vigor and Magic (see below).' },
            { de: '**Flügel:** Talisra Wings oder Dark Veil Wings.', en: '**Wings:** Talisra Wings or Dark Veil Wings.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Verzaubern und Amplified Enhancement', en: 'Enhancement and Amplified Enhancement' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Unique-Ausrüstung über +10', en: 'Unique gear past +10' },
          head: [{ de: 'Stufe', en: 'Step' }, { de: 'Chance', en: 'Chance' }, { de: 'Plus pro Fehlschlag', en: 'Bonus per failure' }],
          rows: [
            ['+10 → +11', pct(65), '+5'],
            ['+11 → +12', pct(50), '+5'],
            ['+12 → +13', pct(35), '+5'],
            ['+13 → +14', pct(25), '+5'],
            ['+14 → +15', pct(20), '+5'],
          ],
          grid: true,
        },
        {
          type: 'table',
          caption: { de: 'Amplified Enhancement (nur Unique auf +15)', en: 'Amplified Enhancement (Unique at +15 only)' },
          head: [{ de: 'Stufe', en: 'Step' }, { de: 'Chance', en: 'Chance' }, { de: 'Plus pro Fehlschlag', en: 'Bonus per failure' }],
          rows: [
            ['+1', pct(66), '+5'],
            ['+2', pct(50), '+4'],
            ['+3', pct(33), '+3'],
            ['+4', pct(25), '+2'],
            ['+5', pct(20), '+1'],
          ],
          grid: true,
        },
        {
          type: 'facts',
          items: [
            { label: { de: '+0 → +10 (Stufe 102)', en: '+0 → +10 (level 102)' }, value: { de: '≈0,92 Mio. Kinah + 36.680 Enhance Stones – immer erfolgreich', en: '≈0.92M Kinah + 36,680 Enhance Stones – always succeeds' } },
            { label: { de: '+0 → +15 im Schnitt', en: '+0 → +15 on average' }, value: { de: '≈15 Mio. Kinah + ≈190.700 Enhance Stones', en: '≈15M Kinah + ≈190,700 Enhance Stones' } },
            { label: { de: 'Amplified +5 im Schnitt', en: 'Amplified +5 on average' }, value: { de: '≈26 Mio. Kinah + ≈196 Amplify Stones (je 4 Fragmente + 2.500 Enhance Stones)', en: '≈26M Kinah + ≈196 Amplify Stones (each 4 fragments + 2,500 Enhance Stones)' } },
            { label: { de: 'Höchste Amplified-Stufe', en: 'Highest Amplified level' }, value: { de: 'Gegenstandsstufe 54–62: +1 · 70–78: +3 · 86–102: +5 (Splendent 70 und 86 eine Stufe weniger)', en: 'Item level 54–62: +1 · 70–78: +3 · 86–102: +5 (Splendent 70 and 86 one level less)' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Scheitern kostet nur Material', en: 'Failing only costs materials' },
          text: {
            de: 'Bei Waffe, Rüstung und Schmuck geht bei einem Fehlschlag keine Stufe verloren, und jeder Fehlschlag erhöht die Chance des nächsten Versuchs. Ausnahme: die **Clash Rune** fällt bei Fehlschlag eine Stufe und hat keinen Bonus. Amulett und Gürtel gelingen bis +10 immer, brauchen aber pro Stufe eine Schriftrolle.',
            en: 'On weapons, armour and jewellery a failure loses no level, and every failure raises the chance of the next try. The exception: the **Clash Rune** drops a level on failure and has no bonus. Amulet and belt always succeed up to +10, but need a scroll per step.',
          },
        },
      ],
    },
    {
      title: { de: 'Arcana', en: 'Arcana' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Fünf Plätze – Chalice, Parchment, Compass, Bell, Mirror – je als **Vigor** oder **Magic**. Unique-Karten geben 80 Gegenstandsstufe und 4 Skillstufen und gehen bis +5. Sie fallen in den Transcendence-Dungeons (Deus Research Base, Shattered Arkanis), Unique ab Stufe 3, Unique-Chalice erst auf Stufe 4.',
            en: 'Five slots – Chalice, Parchment, Compass, Bell, Mirror – each as **Vigor** or **Magic**. Unique cards give 80 item level and 4 skill levels and go up to +5. They drop in the Transcendence dungeons (Deus Research Base, Shattered Arkanis), Unique from tier 3, the Unique Chalice only at tier 4.',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Set', en: 'Set' }, { de: '2 Teile', en: '2 pieces' }, { de: '4 Teile', en: '4 pieces' }],
          rows: [
            ['**Primal Vigor**', { de: '+60 PvE Attack ab 70 % HP', en: '+60 PvE Attack at 70%+ HP' }, { de: '+150 PvE Attack ab 70 % HP', en: '+150 PvE Attack at 70%+ HP' }],
            ['**Magic Armor**', { de: '1.500 MP zurück bei 20 % MP', en: '1,500 MP back at 20% MP' }, { de: '+1.000 PvE Defense ab 50 % MP', en: '+1,000 PvE Defense at 50%+ MP' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Was die Top 80 wirklich nehmen', en: 'What the top 80 really use' },
          text: {
            de: 'Am häufigsten: **Chalice of Vigor** (73 von 80), **Bell of Magic** (65) und **Parchment of Vigor** (64); bei Compass und Mirror gehen die Klassen auseinander. Ein Guide empfiehlt Schadensklassen 4 × Vigor + Bell of Magic und Tanks 4 × Magic + Bell of Vigor – von den Top-Templern trägt aber nur einer vier Magic-Karten. Welche Karten deine Klasse trägt, steht in ihrem Klassen-Guide.',
            en: 'Most common: **Chalice of Vigor** (73 of 80), **Bell of Magic** (65) and **Parchment of Vigor** (64); on Compass and Mirror the classes differ. One guide recommends 4 × Vigor + Bell of Magic for damage dealers and 4 × Magic + Bell of Vigor for tanks – but only one of the top Templars wears four Magic cards. Which cards your class wears is in its class guide.',
          },
        },
      ],
    },
    {
      title: { de: 'Klassen-Unterschiede', en: 'Class differences' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Im Median der normalen Spieler liegen alle Klassen nur ≈2.500 Kampfkraft auseinander. An der Spitze zeigen Waldläufer, Magier, Gladiator und Assassine bei gleicher Gegenstandsstufe aber ≈5–10 % mehr Kampfkraft als Beschwörer, Kantor, Templer und Kleriker. Vergleiche dich darum mit deiner eigenen Klasse:',
            en: 'At the median of ordinary players all classes are only ≈2,500 Combat Power apart. At the top, though, Ranger, Sorcerer, Gladiator and Assassin show ≈5–10% more Combat Power at the same item level than Spiritmaster, Chanter, Templar and Cleric. So compare yourself with your own class:',
          },
        },
        {
          type: 'table',
          caption: { de: 'Top 10 je Klasse, Median (18.10.2026)', en: 'Top 10 per class, median (2026-10-18)' },
          head: [{ de: 'Klasse', en: 'Class' }, { de: 'Kampfkraft', en: 'Combat Power' }, { de: 'Gegenstandsstufe', en: 'Item level' }, { de: 'Kampfkraft pro Stufe', en: 'Combat Power per level' }],
          rows: CLASS_ROWS.map((r) => [{ de: `**${r.de}**`, en: `**${r.en}**` }, r.cp, num(r.ilv), r.per]),
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'In Korea hat NC im Juni 2026 die Kampfkraft aus Waffe und passiven Skills für alle Klassen gleich gemacht. Ob der globale Server diese Änderung schon hat, ist nicht belegt – die Tabelle spricht eher dagegen.',
            en: 'In Korea, NC made the Combat Power from weapons and passive skills the same for all classes in June 2026. Whether the global server already has this change is not confirmed – the table rather suggests it doesn’t.',
          },
        },
        {
          type: 'links',
          items: CLASS_ROWS.map((r) => ({
            href: classGuideHref(r.cls, CLASS_GUIDE_SECTION.power) ?? '#/guides',
            label: { de: `${r.de}: höchste Kampfkraft`, en: `${r.en}: highest Combat Power` },
            cls: r.cls,
          })),
        },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Einen Platz auf +15 treiben, während andere unter +10 sind** – bis +10 ist jede Stufe sicher und billig.', en: '**Pushing one slot to +15 while others are below +10** – up to +10 every step is safe and cheap.' },
            { de: '**Stigmen liegen lassen** – sie sind die günstigste Kampfkraft im Spiel.', en: '**Leaving stigmas low** – they are the cheapest Combat Power in the game.' },
            { de: '**Über +10 auf Teilen, die du bald ersetzt** – nur Handwerks-Upgrades nehmen die Verzauberung mit, Drops aus Dungeons nicht.', en: '**Going past +10 on pieces you’ll soon replace** – only crafting upgrades carry the enhancement over, dungeon drops don’t.' },
            { de: '**Arcana-Plätze leer lassen** – jede Karte zählt zur Gegenstandsstufe.', en: '**Leaving Arcana slots empty** – every card counts towards item level.' },
            { de: '**Conquest oder Transcendence verlassen, ohne den Würfel zu öffnen** – der Wochen-Zähler ist trotzdem weg.', en: '**Leaving Conquest or Transcendence without opening the cube** – the weekly count is gone anyway.' },
            { de: '**Nur auf die Zahl schauen** – die Kampfkraft misst Werte, nicht deine Rotation. Ein sauberes Makro zeigt die Anzeige nicht, im Kampf zählt es trotzdem.', en: '**Only watching the number** – Combat Power measures stats, not your rotation. The number doesn’t show a clean macro, but in a fight it still counts.' },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/macros', label: { de: 'Makro-Guide lesen', en: 'Read the macro guide' } }] },
      ],
    },
    {
      title: { de: 'Noch nicht sicher', en: 'Not confirmed yet' },
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Offen oder strittig: ob es auf dem globalen Server schon Heroic-Ausrüstung (+20) gibt (die Client-Daten sagen nein, einige Guides ja), ob Flügel-Stufen, Garderobe und PvP-Werte in die Kampfkraft zählen, wie viel eine Verzauberungsstufe genau bringt und ob der koreanische Klassen-Ausgleich schon auf Global ist. Die koreanischen Zahlen laufen auf einer anderen Skala. Wenn du es im Spiel misst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open or disputed: whether the global server already has Heroic gear (+20) (the client data says no, some guides yes), whether wing levels, wardrobe and PvP stats count towards Combat Power, how much one enhancement level gives exactly and whether the Korean class balance is on Global yet. The Korean numbers run on another scale. If you measure it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/combat-power-guide', label: 'metabot.gg – Combat Power explained (statistics)' },
            { href: 'https://metabot.gg/en/aion-2/guides/gear-progression-guide', label: 'metabot.gg – Gear progression' },
            { href: 'https://metabot.gg/en/aion-2/guides/gear-enhancement-guide', label: 'metabot.gg – Gear enhancement' },
            { href: 'https://metabot.gg/en/aion-2/guides/arcana-guide', label: 'metabot.gg – Arcana' },
            { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'metabot.gg – Stigmas' },
            { href: 'https://metabot.gg/en/aion-2/guides/titles-guide', label: 'metabot.gg – Titles' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1529', label: 'Inven (KR) – Measured Combat Power changes' },
            { href: 'https://allthings.how/?p=250380', label: 'AllThings.How – Raising Combat Power' },
            { href: 'https://aion2hub.com/updates/aion-2-update-2026-06-24', label: 'AION2Hub – KR update 2026-06-24 (class Combat Power)' },
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings (gear of the top 10)' },
          ],
        },
      ],
    },
  ],
};
