import type { ClassType } from '../../../data/types';
import type { Guide, GuideCell, L10n } from '../types';
import { CLASS_GUIDE_SECTION, classGuideHref } from '../guideLinks';

/**
 * Highest Combat Power, the general part; each class guide has its own section (classGuide.ts, `power`).
 * The formula is not public, so this rests on: metabot.gg's statistics and client data (correlations, CP bands,
 * enhancement, gear ladder, Arcana, stigmas, Daevanion, titles – checked 2026-10-19), the Korean Inven measurement of
 * 2026-03-18 (another scale, ratios only), the AION2 Index ranking (rank cut-offs, read 2026-10-19) and our own top-10
 * data (public/data/top, AION2 Index, 2026-10-17/18): 80 players, medians per class below.
 * Wise / White Dragon Lord are the Elyos names, Ebony / Dark Dragon Lord the Asmodian names of the same items.
 */

type Lang = keyof L10n;
const both = (s: string): L10n => ({ de: s, en: s });
/** "1,400" → "1.400" and "0.5" → "0,5" in German. */
const num = (en: string): L10n => ({ en, de: en.replace(/(?<=\d)[.,](?=\d)/g, (c) => (c === '.' ? ',' : '.')).replace(/(\d)M\b/g, '$1 Mio.') });
const pct = (n: number): GuideCell => ({ de: `${n} %`, en: `${n}%` });
/** 3420 → "3,420" / "3.420" */
const nf = (n: number, lang: Lang, digits = 0) =>
  new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: digits }).format(n);
const per = (f: (lang: Lang) => string): L10n => ({ de: f('de'), en: f('en') });
const kilo = (n: number) => `${Math.round(n / 1000)}K`;

/**
 * Top 10 of each class on 2026-10-18 (public/data/top): median Combat Power, median item level, median Combat Power
 * per item level and the median gain of the last 7 days – players without a 7-day value left out (`weekOf` had one).
 */
const CLASS_ROWS: { cls: ClassType; de: string; en: string; cp: number; ilv: number; per: number; week: number; weekOf: number }[] = [
  { cls: 'Ranger', de: 'Waldläufer', en: 'Ranger', cp: 249552, ilv: 3420, per: 73, week: 68050, weekOf: 9 },
  { cls: 'Gladiator', de: 'Gladiator', en: 'Gladiator', cp: 240364, ilv: 3432, per: 70, week: 48821, weekOf: 9 },
  { cls: 'Sorcerer', de: 'Magier', en: 'Sorcerer', cp: 232539, ilv: 3327, per: 71, week: 63681, weekOf: 8 },
  { cls: 'Assassin', de: 'Assassine', en: 'Assassin', cp: 228455, ilv: 3355, per: 70, week: 46892, weekOf: 10 },
  { cls: 'Chanter', de: 'Kantor', en: 'Chanter', cp: 217343, ilv: 3233, per: 67, week: 37803, weekOf: 8 },
  { cls: 'Elementalist', de: 'Beschwörer', en: 'Spiritmaster', cp: 216902, ilv: 3403, per: 67, week: 50609, weekOf: 9 },
  { cls: 'Templar', de: 'Templer', en: 'Templar', cp: 213711, ilv: 3176, per: 66, week: 52967, weekOf: 8 },
  { cls: 'Cleric', de: 'Kleriker', en: 'Cleric', cp: 210389, ilv: 3182, per: 66, week: 54832, weekOf: 10 },
];

/** AION2 Index ranking, all classes and regions, read 2026-10-19: rank, Combat Power, item level note. */
const RANKS: { rank: number; cp: number; note: L10n; tone: 'gold' | 'blue' | 'slate' }[] = [
  { rank: 1, cp: 264616, note: per((l) => `iLv ${nf(3446, l)}`), tone: 'gold' },
  { rank: 50, cp: 228673, note: { de: 'Top 50: iLv 3.140–3.471', en: 'top 50: iLv 3,140–3,471' }, tone: 'gold' },
  { rank: 100, cp: 219156, note: { de: 'Median-iLv der Plätze 51–100: 3.322', en: 'median iLv of ranks 51–100: 3,322' }, tone: 'gold' },
  { rank: 1000, cp: 175965, note: { de: 'Median-iLv der Plätze 951–1.000: 2.828', en: 'median iLv of ranks 951–1,000: 2,828' }, tone: 'blue' },
  { rank: 10000, cp: 143107, note: { de: 'Median-iLv der Plätze 9.951–10.000: 2.655', en: 'median iLv of ranks 9,951–10,000: 2,655' }, tone: 'blue' },
];

/** Unique item level 102, metabot.gg enhancement guide (client data): expected tries with the failure bonus × cost per try. */
const STEPS: { step: GuideCell; chance: number; bonus: number; tries: number; cost: L10n; avg: number; amp: boolean }[] = [
  { step: '+10 → +11', chance: 65, bonus: 5, tries: 1.49, cost: num('360K + 9,310'), avg: 0.54, amp: false },
  { step: '+11 → +12', chance: 50, bonus: 5, tries: 1.86, cost: num('540K + 10,610'), avg: 1.0, amp: false },
  { step: '+12 → +13', chance: 35, bonus: 5, tries: 2.44, cost: num('860K + 11,960'), avg: 2.1, amp: false },
  { step: '+13 → +14', chance: 25, bonus: 5, tries: 3.03, cost: num('1.34M + 13,360'), avg: 4.06, amp: false },
  { step: '+14 → +15', chance: 20, bonus: 5, tries: 3.42, cost: num('1.86M + 14,820'), avg: 6.37, amp: false },
  { step: 'Amplified +1', chance: 66, bonus: 5, tries: 1.47, cost: num('600K + 6 Amplify'), avg: 0.88, amp: true },
  { step: 'Amplified +2', chance: 50, bonus: 4, tries: 1.88, cost: num('900K + 9 Amplify'), avg: 1.69, amp: true },
  { step: 'Amplified +3', chance: 33, bonus: 3, tries: 2.68, cost: num('1.4M + 12 Amplify'), avg: 3.75, amp: true },
  { step: 'Amplified +4', chance: 25, bonus: 2, tries: 3.43, cost: num('2M + 15 Amplify'), avg: 6.86, amp: true },
  { step: 'Amplified +5', chance: 20, bonus: 1, tries: 4.36, cost: num('3M + 20 Amplify'), avg: 13.07, amp: true },
];

/** The Arcana in the slots of the top 80 (public/data/top, 2026-10-18). */
const ARCANA: [string, number, boolean][] = [
  ['Chalice of Vigor', 73, true],
  ['Bell of Magic', 65, false],
  ['Parchment of Vigor', 64, true],
  ['Mirror of Vigor', 47, true],
  ['Compass of Vigor', 44, true],
  ['Compass of Magic', 35, false],
  ['Mirror of Magic', 33, false],
  ['Parchment of Magic', 16, false],
  ['Bell of Vigor', 15, true],
  ['Chalice of Magic', 7, false],
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
    de: 'Was die Kampfkraft wirklich treibt, wie viel jeder Schritt bringt und in welcher Reihenfolge du vorgehst – mit Rang-Grenzen, Verzauberungs-Chancen und -Kosten, Stigmen, Daevanion und dem, was die Top 10 jeder Klasse tragen. Der Klassen-Teil steht in jedem Klassen-Guide.',
    en: 'What really drives Combat Power, how much each step gives and the order to do it in – with rank cut-offs, enhancement odds and costs, stigmas, Daevanion and what the top 10 of every class wear. The class part is in every class guide.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Kampfkraft', en: 'Combat Power' },
    { de: 'Ausrüstung', en: 'Gear' },
    { de: 'Verzauberung', en: 'Enhancement' },
    { de: 'Endgame', en: 'Endgame' },
  ],
  basis: {
    de: 'Statistik und Client-Daten aus Community-Guides zum globalen Server (Oktober 2026), eine Messung aus Korea, die Rangliste von AION2 Index (19.10.2026) und die Ausrüstung der Top 10 aller acht Klassen (AION2 Index, 18.10.2026). Die Formel selbst ist nicht öffentlich.',
    en: 'Statistics and client data from community guides for the global server (October 2026), a measurement from Korea, the AION2 Index ranking (2026-10-19) and the gear of the top 10 of all eight classes (AION2 Index, 2026-10-18). The formula itself is not public.',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die **Kampfkraft** (CP, Combat Power) ist der Stärkewert, den das Spiel auf dem Server aus allen Werten deines Charakters berechnet. Die Formel ist nicht öffentlich – alles hier stützt sich auf Statistik über tausende Profile, auf Messungen und auf die Ausrüstung der Besten. Die wichtigste Zahl daneben ist die **Gegenstandsstufe** (iLv, item level): die Summe aus Ausrüstung, Verzauberung und Arcana, die auch die Dungeons freischaltet.',
            en: '**Combat Power** (CP) is the strength score the game computes on the server from all the stats of your character. The formula is not public – everything here rests on statistics over thousands of profiles, on measurements and on the gear of the best. The most important number next to it is **item level** (iLv): the total of gear, enhancement and Arcana, which also unlocks the dungeons.',
          },
        },
        {
          type: 'stats',
          items: [
            {
              value: '265K',
              label: { de: 'Höchste Kampfkraft auf Global', en: 'Highest Combat Power on Global' },
              note: { de: 'Platz 1 von 2.035.133 Charakteren (AION2 Index, 19.10.)', en: 'rank 1 of 2,035,133 characters (AION2 Index, 19 Oct)' },
              tone: 'gold',
            },
            {
              value: '≈69',
              label: { de: 'Kampfkraft pro Gegenstandsstufe an der Spitze', en: 'Combat Power per item level at the top' },
              note: { de: 'Median der Top 80 – im Schnitt aller Spieler ≈45', en: 'median of the top 80 – across all players ≈45' },
              tone: 'teal',
            },
            {
              value: '+51K',
              label: { de: 'Zuwachs pro Woche an der Spitze', en: 'Gain per week at the top' },
              note: { de: 'Median der Top 80 mit 7-Tage-Wert (71 von 80) – ≈30 % pro Woche', en: 'median of the top 80 with a 7-day value (71 of 80) – ≈30% a week' },
              tone: 'green',
            },
            {
              value: num('≈41M'),
              label: { de: 'Kina für ein Teil von +0 bis Amplified +5', en: 'Kina for one piece from +0 to Amplified +5' },
              note: { de: 'Gegenstandsstufe 102, im Schnitt – nur 2 % davon bis +10', en: 'item level 102, on average – only 2% of it up to +10' },
              tone: 'rose',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: 'Jeden Platz füllen und alles gleichmäßig auf +10, alle fünf Arcana füllen, zwei bis drei Stigmen auf Stufe 20 bringen (das vierte folgt), Daevanion-Knoten öffnen und Titel sammeln. Dann das Endgame-Set aus dem Handwerk (Gegenstandsstufe 102) auf +15 – und ganz zuletzt **Amplified Enhancement** bis +5. Je später der Schritt, desto teurer jeder Punkt Kampfkraft.',
            en: 'Fill every slot and take everything evenly to +10, fill all five Arcana, take two or three stigmas to level 20 (the fourth follows), open Daevanion nodes and collect titles. Then take the crafted endgame set (item level 102) to +15 – and only at the very end **Amplified Enhancement** up to +5. The later the step, the more each point of Combat Power costs.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Wo dieser Guide anfängt', en: 'Where this guide starts' },
          text: {
            de: 'Der Weg bis ≈100K Kampfkraft – Kina, Routen, Wochenplan – steht im Guide **Farming & Power**, der schnellste Weg Woche für Woche im **Power-Sprint**. Dieser Guide erklärt, was jeder Schritt wert ist und kostet, bis an die Spitze. Was deine Klasse anders macht, steht im Abschnitt „Höchste Kampfkraft“ ihres Klassen-Guides.',
            en: 'The way to ≈100K Combat Power – Kina, routes, a week plan – is in the **Farming & power** guide, the fastest path week by week in the **Power sprint**. This guide explains what each step is worth and costs, all the way to the top. What your class does differently is in the “Highest Combat Power” section of its class guide.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/power-sprint', label: { de: 'Power-Sprint lesen', en: 'Read the power sprint' }, primary: true },
            { href: '#/guides/farming-power', label: { de: 'Farming & Power lesen', en: 'Read Farming & power' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Wo du stehst', en: 'Where you stand' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'AION2 Index führt **2.035.133 Charaktere** auf den globalen Servern (NA, EU, Lateinamerika, Asien). So viel Kampfkraft brauchte man am 19. Oktober für einen Platz – über alle Klassen und Regionen:',
            en: 'AION2 Index lists **2,035,133 characters** on the global servers (NA, EU, Latin America, Asia). This is how much Combat Power a rank took on 19 October – across all classes and regions:',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kampfkraft für einen Platz in der Rangliste', en: 'Combat Power needed for a rank' },
          caption: {
            de: 'AION2-Index-Rangliste des globalen Clients, 19.10.2026: Kampfkraft des Charakters auf diesem Platz. Platz 10.000 sind die besten 0,5 % aller Charaktere. Gold: die Top 100.',
            en: 'AION2 Index ranking of the global client, 19 Oct 2026: Combat Power of the character on that rank. Rank 10,000 is the best 0.5% of all characters. Gold: the top 100.',
          },
          items: RANKS.map((r) => ({
            label: per((l) => `${l === 'de' ? 'Platz' : 'Rank'} ${nf(r.rank, l)}`),
            value: r.cp,
            note: r.note,
            tone: r.tone,
          })),
        },
        {
          type: 'text',
          text: {
            de: 'Anfang Oktober hat metabot.gg ≈13.000 öffentliche Profile auf Stufe 45 gelesen: Der Median einer Klasse lag bei **56–58K**, die besten 10 % dieser Stichprobe ab ≈70K (3.10.). Das ist eine Auswahl, nicht der ganze Server, und die Zahlen sind zwei Wochen alt – an der Spitze wächst die Kampfkraft gerade um ≈30 % pro Woche. Vergleiche dich darum immer mit Werten vom selben Tag.',
            en: 'In early October metabot.gg read ≈13,000 public level-45 profiles: the median of a class was **56–58K**, the best 10% of that sample started at ≈70K (3 Oct). That is a sample, not the whole server, and the numbers are two weeks old – at the top Combat Power is growing by ≈30% a week right now. So always compare yourself with values from the same day.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Warum die Kampfkraft schneller wächst als die Gegenstandsstufe', en: 'Why Combat Power grows faster than item level' },
          text: {
            de: 'Über alle Spieler bringt ein Punkt Gegenstandsstufe ≈45 Kampfkraft (metabot.gg). An der Spitze sind es **≈63–77** – weil mit der Gegenstandsstufe auch Verzauberung, Amplified, Stigmen, Daevanion-Knoten und Titel steigen, die eigene Kampfkraft geben. Eine Faustregel wie „×45“ unterschätzt späte Charaktere darum deutlich.',
            en: 'Across all players one point of item level comes with ≈45 Combat Power (metabot.gg). At the top it is **≈63–77** – because enhancement, Amplified, stigmas, Daevanion nodes and titles rise together with item level and give Combat Power of their own. A rule of thumb like “×45” clearly underrates late characters.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/top', label: { de: 'Top 10 je Klasse ansehen', en: 'See the top 10 of each class' } },
            { href: 'https://aion2index.com/rankings', label: { de: 'Rangliste bei AION2 Index', en: 'Ranking on AION2 Index' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Was wie viel bringt', en: 'What gives how much' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'In die Kampfkraft zählen Ausrüstung, Verzauberung, aktive und passive Skills, Stigmen, Arcana, Daevanion-Knoten, die Sammel-Boni von Titeln und Flügeln und die Genus-Werte der Haustiere – nicht aber Kostüme, Tränke und kurze Buffs. Gemessene Werte pro Schritt gibt es kaum. Die beste Messung stammt aus Korea (Inven, 18.3.2026, der Tag, an dem Korea die Kampfkraft einführte); dort läuft die Kampfkraft auf einer anderen Skala – vergleiche die Balken miteinander, nicht mit deiner Zahl.',
            en: 'Combat Power counts gear, enhancement, active and passive skills, stigmas, Arcana, Daevanion nodes, the collection bonuses of titles and wings and the Genus stats of pets – but not costumes, potions and short buffs. Measured values per step are rare. The best measurement comes from Korea (Inven, 18 Mar 2026, the day Korea introduced Combat Power); it runs on another scale there – compare the bars with each other, not with your number.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Was ein Schritt in Korea gebracht hat (gemessen)', en: 'What one step gave in Korea (measured)' },
          caption: {
            de: 'Inven (KR), Messung vom 18.3.2026. Eine Spanne steht als ihre Mitte im Balken. „Amplified“ heißt in Korea Durchbruch. Gold: aus Währungen, die sonst wenig kaufen (AP, Nightmare, Shugo), blau: Ausrüstung, grau: klein.',
            en: 'Inven (KR), measured on 18 Mar 2026. A range is drawn as its middle. “Amplified” is called breakthrough in Korea. Gold: paid with currencies that buy little else (AP, Nightmare, Shugo), blue: gear, grey: small.',
          },
          items: [
            { label: { de: 'Armreif', en: 'Bracelet' }, note: { de: 'leer → Abyssal Bracelet, Amplified 4', en: 'empty → Abyssal Bracelet, Amplified 4' }, value: 30, display: '≈30K', tone: 'blue' },
            { label: { de: 'Waffe eine Stufe höher', en: 'Weapon one tier up' }, note: { de: 'Dragon Lord, Amplified 4 → nächste Stufe, Amplified 5', en: 'Dragon Lord, Amplified 4 → next tier, Amplified 5' }, value: 25, display: '≈25K', tone: 'blue' },
            { label: { de: 'Schmuckstück', en: 'Accessory' }, note: { de: 'Dungeon-Teil +0 → Handwerk, Amplified 5', en: 'dungeon piece +0 → crafted, Amplified 5' }, value: 20, display: '≈20K', tone: 'blue' },
            { label: { de: 'Ein Stigma 1 → 20', en: 'One stigma 1 → 20' }, note: { de: '75 Stigma Shards', en: '75 Stigma Shards' }, value: 12.5, display: '10–15K', tone: 'gold' },
            { label: { de: 'Ein Rüstungsteil', en: 'One armour piece' }, note: { de: 'leer → angelegt; Brust, Handschuhe >10K, Helm, Umhang ≈5K', en: 'empty → equipped; chest, gloves >10K, helm, cloak ≈5K' }, value: 7.5, display: '3–12K', tone: 'blue' },
            { label: 'Clash Rune', note: { de: 'leer → +6', en: 'empty → +6' }, value: 5, display: '≈5K', tone: 'blue' },
            { label: { de: 'Ein Skill 1 → 10', en: 'One skill 1 → 10' }, value: 2, display: '1–3K', tone: 'slate' },
            { label: { de: 'Eine Genus-Zeile (Haustier)', en: 'One Genus line (pet)' }, note: { de: 'nützliche Option 0,5–0,8K', en: 'useful option 0.5–0.8K' }, value: 0.45, display: num('0.1–0.8K'), tone: 'slate' },
          ],
        },
        { type: 'heading', text: { de: 'Auf dem globalen Server gemessen', en: 'Measured on the global server' } },
        {
          type: 'stats',
          items: [
            { value: '−24K', label: { de: 'Alle Stigmen zurückgesetzt', en: 'All stigmas reset' }, note: { de: '116K → 92K: ein Fünftel des Charakters', en: '116K → 92K: a fifth of the character' }, tone: 'gold' },
            { value: '≈100', label: { de: 'pro Stigma Shard', en: 'per Stigma Shard' }, note: { de: 'Schätzung von AllThings.How', en: 'AllThings.How estimate' }, tone: 'gold' },
            { value: '≈4K', label: { de: 'Waffe mit höherer Gegenstandsstufe', en: 'Weapon of a higher item level' }, tone: 'blue' },
            { value: '≈1K', label: { de: 'Pantheon-Statue Transcendent Bakarma', en: 'Pantheon statue Transcendent Bakarma' }, note: { de: 'nach 10 Draupnir-Conquest-Läufen (Normal)', en: 'after 10 Draupnir Conquest clears (Normal)' }, tone: 'slate' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Was daraus folgt', en: 'What follows from it' },
          text: {
            de: '**Stigmen sind die günstigste große Kampfkraft:** Sie kosten AP, Nightmare-Fragmente und Shugo-Tokens – Währungen, die sonst wenig gleich Wertvolles kaufen. **Armreifen und Schmuck** bringen mehr als einzelne Rüstungsteile – lass sie nicht für zuletzt. Bei der Rüstung entscheiden die Werte: Teile mit Angriffstempo oder Schadensbonus brachten doppelt so viel wie Teile mit Krit-Werten.',
            en: '**Stigmas are the cheapest big Combat Power:** they cost AP, Nightmare fragments and Shugo tokens – currencies that buy little else of the same worth. **Bracelets and jewellery** give more than single armour pieces – don’t leave them for last. On armour the stat lines decide: pieces with attack speed or damage bonus gave twice as much as pieces with crit stats.',
          },
        },
      ],
    },
    {
      title: { de: 'Die Reihenfolge', en: 'The order' },
      blocks: [
        {
          type: 'flow',
          title: { de: 'Der Weg zur höchsten Kampfkraft', en: 'The path to the highest Combat Power' },
          caption: {
            de: 'Reihenfolge nach der Statistik von metabot.gg (was Charaktere jeder Kampfkraft-Stufe haben) und den Kosten der Verzauberungs-Tabelle weiter unten. Gold: günstig und sicher, blau: teuer, rot: das teure Ende.',
            en: 'Order from the statistics of metabot.gg (what characters of each Combat Power band have) and the costs of the enhancement table further down. Gold: cheap and safe, blue: expensive, rose: the expensive end.',
          },
          items: [
            {
              title: { de: 'Jeden Platz füllen, alles auf +10', en: 'Fill every slot, everything to +10' },
              text: { de: 'Bis +10 gelingt jede Stufe: ≈0,92 Mio. Kina und 36.680 Enhance Stones für ein Teil auf Stufe 102. Gleichmäßig schlägt einen einzelnen Platz auf +15.', en: 'Every step up to +10 succeeds: ≈0.92M Kina and 36,680 Enhance Stones for a level-102 piece. Even beats one slot at +15.' },
              tag: 'Kina',
              tone: 'gold',
            },
            {
              title: { de: 'Alle fünf Arcana', en: 'All five Arcana' },
              text: { de: 'Gegenstandsstufe und Skillstufen, Verzaubern kann nicht scheitern. Unter 70K hat fast niemand Arcana – genau das trennt 70K von 90K.', en: 'Item level and skill levels, enhancing can’t fail. Below 70K almost nobody has Arcana – that is exactly what separates 70K from 90K.' },
              tag: 'Transcendence',
              tone: 'gold',
            },
            {
              title: { de: 'Zwei bis drei Stigmen auf 20', en: 'Two or three stigmas to 20' },
              text: { de: '≈100 Kampfkraft pro Shard. Die Top 80: meist 20/20/20/15 oder 20/20/15/15.', en: '≈100 Combat Power per shard. The top 80: mostly 20/20/20/15 or 20/20/15/15.' },
              tag: { de: 'AP · Nightmare · Shugo', en: 'AP · Nightmare · Shugo' },
              tone: 'gold',
            },
            {
              title: { de: 'Daevanion-Knoten und Titel', en: 'Daevanion nodes and titles' },
              text: { de: 'Skill-Knoten deiner Rotation zuerst, dann die Unique-Ecken. Jeder Titel gibt einen dauerhaften Sammel-Bonus.', en: 'Skill nodes of your rotation first, then the Unique corners. Every title gives a permanent collection bonus.' },
              tag: { de: 'Kristalle · Quests', en: 'Crystals · quests' },
              tone: 'teal',
            },
            {
              title: { de: 'Endgame-Set aus dem Handwerk auf +15', en: 'Crafted endgame set to +15' },
              text: { de: 'Splendent Wise / Ebony Dragon Lord (102). +10 → +15 kostet im Schnitt ≈14 Mio. Kina pro Teil – nur auf Teilen, die du behältst.', en: 'Splendent Wise / Ebony Dragon Lord (102). +10 → +15 costs ≈14M Kina per piece on average – only on pieces you keep.' },
              tag: { de: 'Kina · Enhance Stones', en: 'Kina · Enhance Stones' },
              tone: 'blue',
            },
            {
              title: { de: 'Zuletzt: Amplified bis +5', en: 'Last: Amplified up to +5' },
              text: { de: 'Nur Unique auf +15. ≈26 Mio. Kina und ≈196 Amplify Stones pro Teil. Erst ab ≈90K Kampfkraft fängt überhaupt jemand damit an.', en: 'Unique at +15 only. ≈26M Kina and ≈196 Amplify Stones per piece. Only above ≈90K Combat Power does anyone start it at all.' },
              tag: { de: '≈26 Mio. pro Teil', en: '≈26M per piece' },
              tone: 'rose',
            },
          ],
        },
        {
          type: 'line',
          title: { de: 'Was Charaktere auf jeder Kampfkraft-Stufe haben', en: 'What characters have at each Combat Power band' },
          caption: {
            de: 'metabot.gg, 3.017 Charaktere auf Stufe 45 mit lesbarer Ausrüstung (Anfang Oktober 2026): durchschnittliche Verzauberung der Ausrüstung und durchschnittliche Zahl angelegter Arcana. Amplified Enhancement hatten bis 90K 0 %, bei 90–110K 11 % und ab 110K 74 % der Charaktere. So sieht die Reihenfolge in echt aus: Verzauberung wächst von Anfang an, Arcana springen ab 80K, Amplified kommt zuletzt.',
            en: 'metabot.gg, 3,017 level-45 characters with readable gear (early October 2026): average enhancement of the gear and average number of Arcana equipped. Amplified Enhancement: 0% of the characters up to 90K, 11% at 90–110K and 74% above 110K. This is the order in real life: enhancement grows from the start, Arcana jump from 80K, Amplified comes last.',
          },
          x: { label: { de: 'Kampfkraft', en: 'Combat Power' }, ticks: ['<60K', '60–70K', '70–80K', '80–90K', '90–110K', '110K+'] },
          y: { label: { de: 'Stufe bzw. Karten', en: 'level or cards' }, min: 0, max: 10 },
          series: [
            { label: { de: 'Ø Verzauberung', en: 'avg. enhancement' }, values: [1.7, 3.6, 4.8, 6.5, 7.8, 9.0], tone: 'gold' },
            { label: { de: 'Ø Arcana angelegt', en: 'avg. Arcana equipped' }, values: [0, 0, 0.6, 3.3, 4.8, 5.0], tone: 'violet' },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Nichts doppelt bezahlen', en: 'Don’t pay twice' },
          text: {
            de: 'Nur **Handwerks-Upgrades** nehmen Verzauberung, Amplified und Soul Binding des alten Teils mit (das neue Teil ist an den Hersteller gebunden). Ein Drop aus einem Dungeon fängt wieder bei +0 an. Treib darum nur Teile über +10, die du behältst oder im Handwerk weiterbaust.',
            en: 'Only **crafting upgrades** carry enhancement, Amplified and Soul Binding of the old piece over (the new piece is bound to the crafter). A dungeon drop starts at +0 again. So only take pieces past +10 that you keep or upgrade by crafting.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/daevanion', label: { de: 'Daevanion-Weg planen', en: 'Plan your Daevanion path' } },
            { href: '#/stigma', label: { de: 'Stigmen planen', en: 'Plan stigmas' } },
            { href: '#/guides/crafting-gear', label: { de: 'Handwerks-Ausrüstung', en: 'Crafted gear' } },
            { href: '#/guides/power-sprint', label: { de: 'Power-Sprint: Woche für Woche', en: 'Power sprint: week by week' } },
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
            de: 'Unique ist der höchste Rang auf dem globalen Server (Heroic und Mythic gibt es laut Client-Daten noch nicht), mit 20 Plätzen: Waffe, Guard, 7 Rüstungsteile, Halskette, 2 Ohrringe, 2 Ringe, 2 Armreifen, Amulett, Gürtel und 2 Runen. So geht es nach Stufe 45 weiter (Gegenstandsstufe pro Teil; die Conquest-Dungeons brauchen 700, 1.400 und 2.100 Gegenstandsstufe des Charakters):',
            en: 'Unique is the top grade on the global server (the client data has no Heroic or Mythic gear yet), with 20 slots: weapon, guard, 7 armour pieces, necklace, 2 earrings, 2 rings, 2 bracelets, amulet, belt and 2 runes. This is how it goes on after level 45 (item level per piece; the Conquest dungeons need a character item level of 700, 1,400 and 2,100):',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Stufe', en: 'Level' }, { de: 'Ausrüstung', en: 'Gear' }, { de: 'Woher', en: 'Where from' }],
          rows: [
            ['46', { de: 'Elite-Sets (Lagta, Dartan, Kashapa), Fallen Ancient God', en: 'Elite sets (Lagta, Dartan, Kashapa), Fallen Ancient God' }, { de: 'Heimatkarten, Chaotic Lower Reshanta – Lückenfüller', en: 'Home maps, Chaotic Lower Reshanta – stopgaps' }],
            ['54', both('Rupture, Bakarma'), { de: 'Krao Cave, Draupnir (Conquest 1★, ab 700)', en: 'Krao Cave, Draupnir (Conquest 1★, from 700)' }],
            ['62', both('True Dragon Lord · Kaira'), { de: 'Handwerk (Meisterschaft 55) · Watcher / Executor Kaira', en: 'Crafting (Mastery 55) · Watcher / Executor Kaira' }],
            ['70', both('Aulamus, Vakron · Splendent True Dragon Lord'), { de: 'Urugugu Canyon, Vakron Sky Island (Conquest 2★, ab 1.400) · Handwerk', en: 'Urugugu Canyon, Vakron Sky Island (Conquest 2★, from 1,400) · crafting' }],
            ['78', both('White / Dark Dragon Lord'), { de: 'Handwerk', en: 'Crafting' }],
            ['86', both('Nuakum, Enraged Kromede · Splendent White / Dark Dragon Lord'), { de: 'Fire Temple, Ferocious Horn Den (Conquest 3★, ab 2.100) · Handwerk', en: 'Fire Temple, Ferocious Horn Den (Conquest 3★, from 2,100) · crafting' }],
            ['94', both('Wise / Ebony Dragon Lord'), { de: 'Handwerk', en: 'Crafting' }],
            ['**102**', both('**Splendent Wise / Ebony Dragon Lord**'), { de: 'Handwerk – auch die Waffe. Die Ludra-Waffe (Raid ab 2.800) gibt es auf Global nicht: Der Raid ist seit dem Start entfernt, keiner der Top 80 trägt ein Ludra-Teil.', en: 'Crafting – the weapon too. The Ludra weapon (raid from 2,800) is not on Global: the raid has been removed since launch, none of the top 80 wears a Ludra piece.' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Namen, Splendent und der Ludra-Raid', en: 'Names, Splendent and the Ludra raid' },
          text: {
            de: 'Wise und White Dragon Lord heißen bei den Asmodiern Ebony und Dark Dragon Lord – es sind dieselben Teile. Nach einem gelungenen Handwerk gibt es 25 % Chance auf die Splendent-Version (eine Stufe höher); weil eine Herstellung auch scheitern kann, ist es pro Versuch weniger – deine Chance zeigt im Spiel der Knopf **Probability Info**. Ab Gegenstandsstufe 102 gibt es Rüstung und Schmuck nur aus dem Handwerk. Den Ludra-Raid hat NC zum globalen Start herausgenommen, weil er im Vorab-Zugang zu früh fiel; er soll mit neuen Mechaniken zurückkommen, ein Termin steht noch aus. Bis dahin ist auch schon erbeutete Ludra-Ausrüstung entfernt – darum trägt keiner der Top 80 eine Ludra-Waffe.',
            en: 'Wise and White Dragon Lord are called Ebony and Dark Dragon Lord by the Asmodians – they are the same pieces. After a successful craft there is a 25% chance of the Splendent version (one tier higher); since a craft can also fail, it is less per attempt – in game the **Probability Info** button shows your chance. From item level 102, armour and jewellery only come from crafting. NC took the Ludra raid out at the global launch because it fell too early in advance access; it is to come back with new mechanics, no date yet. Until then Ludra gear already earned is removed too – that is why none of the top 80 wears a Ludra weapon.',
          },
        },
        { type: 'heading', text: { de: 'Was die Top 80 tragen (18.10.)', en: 'What the top 80 wear (18 Oct)' } },
        {
          type: 'shares',
          title: { de: 'Die 14 Hauptplätze der Top 80', en: 'The 14 main slots of the top 80' },
          caption: {
            de: 'AION2 Index, Top 10 jeder Klasse, 18.10.2026: Waffe, Guard, 7 Rüstungsteile, Halskette, Ohrringe und Ringe – 1.120 Teile. 1.047 davon sind auf +15, 830 auf Amplified +5.',
            en: 'AION2 Index, top 10 of each class, 18 Oct 2026: weapon, guard, 7 armour pieces, necklace, earrings and rings – 1,120 pieces. 1,047 of them are at +15, 830 at Amplified +5.',
          },
          unit: { de: 'Teile', en: 'pieces' },
          items: [
            { label: 'Splendent Wise / Ebony Dragon Lord', note: { de: 'Stufe 102 · Handwerk', en: 'level 102 · crafted' }, value: 882, tone: 'gold' },
            { label: 'Nuakum', note: { de: 'Stufe 86 · Fire Temple, Ferocious Horn Den', en: 'level 86 · Fire Temple, Ferocious Horn Den' }, value: 136, tone: 'teal' },
            { label: 'Splendent White / Dark Dragon Lord', note: { de: 'Stufe 86 · Handwerk, Amplified nur bis +3', en: 'level 86 · crafted, Amplified only to +3' }, value: 85, tone: 'blue' },
            { label: { de: 'Anderes', en: 'Other' }, value: 17, tone: 'slate' },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Waffe:** Splendent Wise / Ebony Dragon Lord (76 von 80) – 79 von 80 auf +15 mit Amplified +5.', en: '**Weapon:** Splendent Wise / Ebony Dragon Lord (76 of 80) – 79 of 80 at +15 with Amplified +5.' },
            { de: '**Rüstung:** Splendent Wise / Ebony Dragon Lord; bei Kleriker und Kantor ist fast die Hälfte noch Nuakum, bei Templer und Beschwörer knapp ein Drittel, beim Gladiator kein Teil – fast alles +15, Amplified +2 bis +5.', en: '**Armour:** Splendent Wise / Ebony Dragon Lord; for Clerics and Chanters nearly half is still Nuakum, for Templars and Spiritmasters almost a third, for Gladiators none – nearly all +15, Amplified +2 to +5.' },
            { de: '**Schmuck:** Halskette, Ohrringe und Ringe aus dem Splendent-Dragon-Lord-Set auf +15.', en: '**Jewellery:** necklace, earrings and rings from the Splendent Dragon Lord set at +15.' },
            { de: '**Armreifen:** jeder genau ein Ascension Bracelet (meist +15), dazu ein Liberator oder Pilgrim Bracelet auf +10, ihrer Höchststufe.', en: '**Bracelets:** each exactly one Ascension Bracelet (mostly +15), plus a Liberator or Pilgrim Bracelet at +10, their cap.' },
            { de: '**Rest:** Revelation Amulet und Noble Belt, meist auf +10 (55 und 53 von 80; 9 und 16 noch auf +0), zwei Clash Runes (Median +4).', en: '**The rest:** Revelation Amulet and Noble Belt, mostly at +10 (55 and 53 of 80; 9 and 16 still at +0), two Clash Runes (median +4).' },
            { de: '**Arcana:** 79 von 80 haben fünf Unique-Karten, 70 % der Karten auf +5 (siehe unten).', en: '**Arcana:** 79 of 80 have five Unique cards, 70% of the cards at +5 (see below).' },
            { de: '**Flügel:** Dark Veil Wings (45) oder Talisra Wings (22).', en: '**Wings:** Dark Veil Wings (45) or Talisra Wings (22).' },
          ],
        },
      ],
    },
    {
      title: { de: 'Verzaubern und Amplified Enhancement', en: 'Enhancement and Amplified Enhancement' },
      blocks: [
        {
          type: 'text',
          text: {
            de: '**Verzaubern** (enhancement) hebt ein Teil mit Kina und Enhance Stones von +0 bis +15 (Unique; Epic, Amulett und Gürtel bis +10). **Amplified Enhancement** (auch „exceed“) geht bei Unique auf +15 noch fünf Stufen weiter und braucht Amplify Stones. Bis +10 gelingt alles. Danach hat jede Stufe eine Grundchance, und jeder Fehlschlag erhöht die Chance des nächsten Versuchs (der Bonus gilt nur für diese Stufe – nach einem Erfolg beginnt die nächste wieder bei ihrer Grundchance).',
            en: '**Enhancement** raises a piece with Kina and Enhance Stones from +0 to +15 (Unique; Epic, amulet and belt to +10). **Amplified Enhancement** (also “exceed”) takes Unique at +15 five steps further and needs Amplify Stones. Everything up to +10 succeeds. After that each step has a base chance, and every failure raises the chance of the next try (the bonus only counts for that step – after a success the next one starts at its base chance again).',
          },
        },
        {
          type: 'table',
          caption: { de: 'Unique-Ausrüstung, Gegenstandsstufe 102', en: 'Unique gear, item level 102' },
          head: [{ de: 'Stufe', en: 'Step' }, { de: 'Chance', en: 'Chance' }, { de: 'Plus pro Fehlschlag', en: 'Bonus per failure' }, { de: 'Ø Versuche', en: 'Avg. tries' }, { de: 'Pro Versuch (Kina + Steine)', en: 'Per try (Kina + stones)' }],
          rows: STEPS.map((s) => [s.step, pct(s.chance), `+${s.bonus}`, num(s.tries.toFixed(2)), s.cost]),
          grid: true,
        },
        {
          type: 'bars',
          title: { de: 'Was jede Stufe im Schnitt kostet', en: 'What each step costs on average' },
          caption: {
            de: 'Kina pro Stufe auf Gegenstandsstufe 102 = durchschnittliche Versuche (mit dem Plus pro Fehlschlag) × Kosten pro Versuch, nach dem Verzauberungs-Guide von metabot.gg (Client-Daten, 15.10.2026). Blau: normale Verzauberung, rot: Amplified. Die letzte Amplified-Stufe allein kostet fast so viel wie +10 → +15 zusammen.',
            en: 'Kina per step at item level 102 = average tries (with the bonus per failure) × cost per try, from the enhancement guide of metabot.gg (client data, 15 Oct 2026). Blue: normal enhancement, rose: Amplified. The last Amplified step alone costs almost as much as +10 → +15 together.',
          },
          items: STEPS.map((s) => ({
            label: s.step,
            value: s.avg,
            display: num(`≈${s.avg >= 10 ? s.avg.toFixed(1) : Number(s.avg.toFixed(2))}M`),
            tone: s.amp ? 'rose' : 'blue',
          })),
        },
        {
          type: 'shares',
          title: { de: 'Wohin das Kina eines voll verbesserten Teils geht', en: 'Where the Kina of one fully upgraded piece goes' },
          caption: {
            de: 'Ein Unique-Teil der Stufe 102 von +0 bis Amplified +5, im Schnitt ≈41 Mio. Kina (metabot.gg, berechnet). Im schlechtesten Fall kostet allein +10 → +15 ≈74 Mio.',
            en: 'One Unique piece of level 102 from +0 to Amplified +5, ≈41M Kina on average (metabot.gg, calculated). In the worst case +10 → +15 alone costs ≈74M.',
          },
          unit: { de: 'Mio. Kina', en: 'M Kina' },
          items: [
            { label: '+0 → +10', note: { de: 'gelingt immer · dazu 36.680 Enhance Stones', en: 'always succeeds · plus 36,680 Enhance Stones' }, value: 0.92, tone: 'gold' },
            { label: '+10 → +15', note: { de: '≈12 Versuche · dazu ≈154.000 Enhance Stones', en: '≈12 tries · plus ≈154,000 Enhance Stones' }, value: 14.07, tone: 'blue' },
            { label: 'Amplified +1 → +5', note: { de: '≈14 Versuche · dazu ≈196 Amplify Stones', en: '≈14 tries · plus ≈196 Amplify Stones' }, value: 26.25, tone: 'rose' },
          ],
        },
        {
          type: 'facts',
          items: [
            {
              label: { de: 'Höchste Amplified-Stufe', en: 'Highest Amplified level' },
              value: { de: 'Gegenstandsstufe 54–62: +1 · 70 und 78: +3 · 86–102: +5. **Splendent-Handwerk der Stufe 70 nur +1, Stufe 86 nur +3** – Nuakum (86, Drop) geht bis +5.', en: 'Item level 54–62: +1 · 70 and 78: +3 · 86–102: +5. **Splendent crafts of level 70 only +1, level 86 only +3** – Nuakum (86, drop) goes to +5.' },
            },
            {
              label: both('Amplify Stones'),
              value: { de: 'Aus Amplify Stone Fragments per Substance Morph. Laut einem Guide braucht ein Stein 4 Fragmente + 2.500 Enhance Stones – dann kostet Amplified +5 zusätzlich ≈784 Fragmente und ≈490.000 Enhance Stones.', en: 'From Amplify Stone Fragments via Substance Morph. One guide says a stone takes 4 fragments + 2,500 Enhance Stones – then Amplified +5 costs another ≈784 fragments and ≈490,000 Enhance Stones.' },
            },
            {
              label: { de: 'Günstigere Stufen', en: 'Lower item levels' },
              value: { de: '+0 → +15 im Schnitt: Stufe 70 ≈10,3 Mio., Stufe 86 ≈12,6 Mio., Stufe 102 ≈15 Mio. Kina', en: '+0 → +15 on average: level 70 ≈10.3M, level 86 ≈12.6M, level 102 ≈15M Kina' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Scheitern kostet nur Material – außer bei der Rune', en: 'Failing only costs materials – except on the rune' },
          text: {
            de: 'Bei Waffe, Rüstung und Schmuck geht bei einem Fehlschlag keine Stufe verloren und nichts zerbricht. Die **Clash Rune** ist anders: Sie gelingt nur bis +1 sicher, danach 80, 66, 50, 33, 25 % … bis 10 % für +10, ohne Bonus pro Fehlschlag, und ein Fehlschlag kostet eine Stufe. Darum stehen die Runen der Top 80 im Median bei +4. Amulett und Gürtel gelingen bis +10 immer, brauchen aber pro Stufe eine Schriftrolle.',
            en: 'On weapons, armour and jewellery a failure loses no level and nothing breaks. The **Clash Rune** is different: it is safe only up to +1, then 80, 66, 50, 33, 25% … down to 10% for +10, with no bonus per failure, and a failure costs a level. That is why the runes of the top 80 sit at a median +4. Amulet and belt always succeed up to +10, but need a scroll per step.',
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
            de: 'Fünf Plätze – Chalice, Parchment, Compass, Bell, Mirror – je als **Vigor** oder **Magic**, ab Stufe 45. Höhere Ränge geben mehr: Common bis Unique bringen 8 bis 20 Punkte eines Werts, 1 bis 4 Skillstufen und gehen bis +2 bis +5. Unique-Karten zählen 80 Gegenstandsstufe. Verzaubert wird mit Erfahrung, ohne Risiko: Eine Unique-Karte braucht 93.000 Erfahrung bis +5. Sie fallen in den Transcendence-Dungeons (Deus Research Base, Shattered Arkanis; ab Gegenstandsstufe 1.600), Unique ab Stufe 3, die Unique-Chalice erst auf Stufe 4.',
            en: 'Five slots – Chalice, Parchment, Compass, Bell, Mirror – each as **Vigor** or **Magic**, from level 45. Higher grades give more: Common to Unique bring 8 to 20 points of a stat, 1 to 4 skill levels and go up to +2 to +5. Unique cards count 80 item level. You enhance them with experience, without risk: a Unique card takes 93,000 experience to +5. They drop in the Transcendence dungeons (Deus Research Base, Shattered Arkanis; from item level 1,600), Unique from tier 3, the Unique Chalice only at tier 4.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Welche Karten die Top 80 tragen', en: 'Which cards the top 80 wear' },
          caption: {
            de: 'AION2 Index, Top 10 jeder Klasse, 18.10.2026: wie viele der 80 Spieler die Karte im Platz haben. Gold: Vigor, blau: Magic. Klar sind nur Chalice (Vigor), Bell (Magic) und Parchment (Vigor) – bei Compass und Mirror gehen die Klassen auseinander.',
            en: 'AION2 Index, top 10 of each class, 18 Oct 2026: how many of the 80 players have the card in its slot. Gold: Vigor, blue: Magic. Only Chalice (Vigor), Bell (Magic) and Parchment (Vigor) are clear – on Compass and Mirror the classes differ.',
          },
          max: 80,
          items: ARCANA.map(([name, n, vigor]) => ({
            label: name,
            value: n,
            display: { de: `${n} von 80`, en: `${n} of 80` },
            tone: vigor ? 'gold' : 'blue',
          })),
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
          title: { de: 'Empfehlung und Wirklichkeit', en: 'Advice and reality' },
          text: {
            de: 'Ein Guide empfiehlt Schadensklassen 4 × Vigor + Bell of Magic und Tanks 4 × Magic + Bell of Vigor. Die Top 80 nehmen fast immer Bell of Magic (65 von 80), aber nur einer der Top-Templer trägt vier Magic-Karten. Welche Karten deine Klasse trägt, steht in ihrem Klassen-Guide. Doppelte Karten lassen sich zu Mysterious Crystals zerlegen (für die Transmutation).',
            en: 'One guide recommends 4 × Vigor + Bell of Magic for damage dealers and 4 × Magic + Bell of Vigor for tanks. The top 80 almost always take Bell of Magic (65 of 80), but only one of the top Templars wears four Magic cards. Which cards your class wears is in its class guide. Duplicate cards can be broken down into Mysterious Crystals (for Transmutation).',
          },
        },
      ],
    },
    {
      title: { de: 'Stigmen, Daevanion und Titel', en: 'Stigmas, Daevanion and titles' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Drei Systeme bringen Kampfkraft ganz ohne Ausrüstung. Sie kosten vor allem Zeit und Nebenwährungen – darum lohnen sie sich früh.',
            en: 'Three systems give Combat Power without any gear. They mostly cost time and side currencies – that is why they pay early.',
          },
        },
        {
          type: 'stats',
          items: [
            { value: '300', label: { de: 'Stigma Shards für vier Stigmen auf 20', en: 'Stigma Shards for four stigmas at 20' }, note: { de: '75 pro Stigma – die Stufen 16–20 allein 40. Nur 1 der Top 80 hat alle vier auf 20.', en: '75 per stigma – levels 16–20 alone take 40. Only 1 of the top 80 has all four at 20.' }, tone: 'gold' },
            { value: '222', label: { de: 'Shards im Median der Top 80', en: 'Shards at the median of the top 80' }, note: { de: '55 % ihrer Stigma-Plätze stehen auf 20', en: '55% of their stigma slots are at 20' }, tone: 'gold' },
            { value: per((l) => `${nf(286, l)} / ${nf(532, l)}`), label: { de: 'Daevanion-Knoten offen', en: 'Daevanion nodes open' }, note: { de: 'Median der Top 80', en: 'median of the top 80' }, tone: 'teal' },
            { value: '528', label: { de: 'Titel im Spiel', en: 'Titles in the game' }, note: { de: '377 pro Fraktion erreichbar, 448 mit Werten', en: '377 reachable per faction, 448 with stats' }, tone: 'violet' },
          ],
        },
        { type: 'heading', text: { de: 'Stigmen', en: 'Stigmas' } },
        {
          type: 'text',
          text: {
            de: 'Vier Stigma-Plätze (ab Stufe 22, 27, 32 und 37). Stufe 1–5 kostet 1 Shard pro Stufe, 6–10 je 2, 11–15 je 4 und 16–20 je 8 – die letzten fünf Stufen sind mehr als die Hälfte. Auf 5, 10, 15 und 20 schaltet jedes Stigma eine Spezialisierung frei. Woher die 300 Shards kommen:',
            en: 'Four stigma slots (from level 22, 27, 32 and 37). Levels 1–5 cost 1 shard per level, 6–10 two, 11–15 four and 16–20 eight each – the last five levels are more than half. At 5, 10, 15 and 20 every stigma unlocks a specialisation. Where the 300 shards come from:',
          },
        },
        {
          type: 'shares',
          title: { de: 'Woher die 300 Stigma Shards kommen', en: 'Where the 300 Stigma Shards come from' },
          caption: {
            de: 'Die festen Quellen pro Charakter laut metabot.gg (Client-Daten, 15.10.2026). Dazu kommen kleinere: Erfolge (je 2), Battle Pass, Arena- und Battlefield-Shop, Unstable Stigma Shards per Substance Morph. Der Abyss-Shop verkauft 4 × 50 Shards zu 10.000, 15.000, 20.000 und 25.000 AP – zusammen 3,5 Mio. AP.',
            en: 'The fixed sources per character according to metabot.gg (client data, 15 Oct 2026). Smaller ones come on top: achievements (2 each), battle pass, Arena and Battlefield shops, Unstable Stigma Shards via Substance Morph. The Abyss shop sells 4 × 50 shards at 10,000, 15,000, 20,000 and 25,000 AP – 3.5M AP in total.',
          },
          unit: 'Shards',
          items: [
            { label: { de: 'Abyss-Shop', en: 'Abyss shop' }, note: { de: '10.000–25.000 AP pro Shard', en: '10,000–25,000 AP per shard' }, value: 200, tone: 'rose' },
            { label: { de: 'Nightmare-Shop', en: 'Nightmare shop' }, note: { de: '1.500 Phantasmal Fragments pro Shard', en: '1,500 Phantasmal Fragments per shard' }, value: 35, tone: 'violet' },
            { label: { de: 'Shugo-Festival-Shop', en: 'Shugo Festival shop' }, note: { de: '300 Centuryroot Tokens pro Shard', en: '300 Centuryroot Tokens per shard' }, value: 35, tone: 'teal' },
            { label: { de: 'Aufstieg 23–45 + Ascension', en: 'Levelling 23–45 + Ascension' }, value: 30, tone: 'gold' },
          ],
        },
        {
          type: 'text',
          text: {
            de: '**Die Reihenfolge der Spitze:** zuerst zwei, dann drei Stigmen auf 20, das letzte auf 15. Die häufigsten Muster der Top 80 sind 20/20/20/15 (260 Shards) und 20/20/15/15 (220 Shards); 41 von 80 haben zwei Stigmen auf 20, 27 drei und nur einer alle vier. Der Grund: Die Stufen 16–20 eines Stigmas kosten 40 Shards, auf einem anderen Stigma bringen schon 35 Shards die Stufen 1–15 mit drei Spezialisierungen.',
            en: '**The order at the top:** first two, then three stigmas to 20, the last one to 15. The most common patterns of the top 80 are 20/20/20/15 (260 shards) and 20/20/15/15 (220 shards); 41 of 80 have two stigmas at 20, 27 three and only one all four. The reason: levels 16–20 of one stigma cost 40 shards, while on another stigma just 35 shards buy levels 1–15 with three specialisations.',
          },
        },
        { type: 'heading', text: { de: 'Daevanion', en: 'Daevanion' } },
        {
          type: 'text',
          text: {
            de: 'Fünf Tafeln pro Klasse: Nezekan, Zikel und Vaizel mit je 88 Knoten, Triniel mit 116 und Azphel mit 152 PvP-Knoten. Die ersten vier füllen 570 Punkte aus Daevanion Crystals (Obergrenze 840), Azphel 232 eigene Punkte aus PvP-Shops und Monolithen. Runde Knoten geben +1 auf einen Skill, eckige Werte; Unique-Knoten kosten 4 Punkte und die Ecken ≈1,5 % eines Hauptwerts. Die Kristalle kommen vor allem aus Sealed Dungeons (2 pro Abschluss) und Regional-Quests (1). Die Top 80 haben im Median 55–66 von 88 Knoten auf den ersten drei Tafeln offen, 71–75 von 116 auf Triniel und erst 22–37 von 152 auf Azphel.',
            en: 'Five boards per class: Nezekan, Zikel and Vaizel with 88 nodes each, Triniel with 116 and Azphel with 152 PvP nodes. The first four take 570 points from Daevanion Crystals (cap 840), Azphel 232 points of its own from PvP shops and Monoliths. Round nodes give +1 to a skill, square ones stats; Unique nodes cost 4 points and the corners give ≈1.5% of a main stat. The crystals mostly come from Sealed Dungeons (2 per clear) and Regional quests (1). At the median the top 80 have 55–66 of 88 nodes open on the first three boards, 71–75 of 116 on Triniel and only 22–37 of 152 on Azphel.',
          },
        },
        { type: 'heading', text: { de: 'Titel und Flügel', en: 'Titles and wings' } },
        {
          type: 'text',
          text: {
            de: 'Jeder Titel hat einen Bonus beim Tragen (drei Plätze: Angriff, Verteidigung, Sonstiges) und einen kleineren **Sammel-Bonus**, der immer gilt. Alle 377 Titel einer Fraktion geben zusammen unter anderem +1.260 HP, +3,5 % PvE-Schaden und +4 % PvE-Schadensresistenz. Das obere Fünftel der Spieler besaß Anfang Oktober im Median 191 Titel, der Median aller 127. Schnelle Titel: Episode-Quests, einer Legion beitreten, Erstabschlüsse der Gruppen-Dungeons, drei Spacetime-Rift-Besuche, die Shugo-Festival-Minispiele und die Monolith-Stufen 10, 20 und 30. Auch Flügel geben einen Sammel-Bonus, wenn du sie besitzt.',
            en: 'Every title has a bonus while worn (three slots: attack, defence, other) and a smaller **collection bonus** that always counts. All 377 titles of one faction together give, among others, +1,260 HP, +3.5% PvE damage and +4% PvE damage tolerance. In early October the top fifth of players owned a median 191 titles, the median of everyone 127. Quick titles: episode quests, joining a Legion, first clears of the party dungeons, three Spacetime Rift visits, the Shugo Festival mini-games and Monolith levels 10, 20 and 30. Wings also give a collection bonus once you own them.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/stigma', label: { de: 'Stigmen planen', en: 'Plan stigmas' } },
            { href: '#/daevanion', label: { de: 'Daevanion-Weg planen', en: 'Plan your Daevanion path' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Klassen-Unterschiede', en: 'Class differences' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Im Median der normalen Spieler lagen alle Klassen Anfang Oktober nur ≈2.500 Kampfkraft auseinander. An der Spitze zeigen Waldläufer, Magier, Gladiator und Assassine bei gleicher Gegenstandsstufe aber ≈5–10 % mehr Kampfkraft als Beschwörer, Kantor, Templer und Kleriker. Vergleiche dich darum mit deiner eigenen Klasse:',
            en: 'At the median of ordinary players all classes were only ≈2,500 Combat Power apart in early October. At the top, though, Ranger, Sorcerer, Gladiator and Assassin show ≈5–10% more Combat Power at the same item level than Spiritmaster, Chanter, Templar and Cleric. So compare yourself with your own class:',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kampfkraft der Top 10 je Klasse (Median)', en: 'Combat Power of the top 10 per class (median)' },
          caption: {
            de: 'AION2 Index, Top 10 jeder Klasse, 18.10.2026. Darunter: Median der Gegenstandsstufe, Kampfkraft pro Gegenstandsstufe und Zuwachs der letzten 7 Tage (nur Spieler mit 7-Tage-Wert; so viele der 10 hatten einen).',
            en: 'AION2 Index, top 10 of each class, 18 Oct 2026. Underneath: median item level, Combat Power per item level and the gain of the last 7 days (only players with a 7-day value; that many of the 10 had one).',
          },
          items: CLASS_ROWS.map((r) => ({
            label: { de: r.de, en: r.en },
            value: r.cp,
            display: kilo(r.cp),
            note: per((l) =>
              l === 'de'
                ? `iLv ${nf(r.ilv, l)} · ${r.per} pro Stufe · +${kilo(r.week)}/Woche (${r.weekOf} von 10)`
                : `iLv ${nf(r.ilv, l)} · ${r.per} per level · +${kilo(r.week)}/week (${r.weekOf} of 10)`,
            ),
            tone: r.per >= 69 ? 'gold' : 'blue',
          })),
        },
        {
          type: 'text',
          text: {
            de: 'Das Tempo ist an der Spitze hoch: Die Top 10 legen im Median **+38K bis +68K pro Woche** zu (Spieler ohne 7-Tage-Wert nicht mitgezählt) – am schnellsten Waldläufer, Magier und Kleriker, am langsamsten der Kantor.',
            en: 'The pace at the top is high: the top 10 gain a median **+38K to +68K per week** (players without a 7-day value left out) – fastest Ranger, Sorcerer and Cleric, slowest the Chanter.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'In Korea hat NC am 24.6.2026 die Kampfkraft aus Waffe und passiven Skills für alle Klassen gleich gemacht. Ob der globale Server diese Änderung schon hat, ist nicht belegt – die Unterschiede pro Gegenstandsstufe sprechen eher dagegen.',
            en: 'In Korea, NC made the Combat Power from weapons and passive skills the same for all classes on 24 June 2026. Whether the global server already has this change is not confirmed – the differences per item level rather suggest it doesn’t.',
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
            { de: '**Einen Platz auf +15 treiben, während andere unter +10 sind** – bis +10 ist jede Stufe sicher und kostet 2 % dessen, was ein voll verbessertes Teil kostet.', en: '**Pushing one slot to +15 while others are below +10** – up to +10 every step is safe and costs 2% of what a fully upgraded piece costs.' },
            { de: '**Über +10 auf Teilen, die du bald ersetzt** – nur Handwerks-Upgrades nehmen Verzauberung und Amplified mit, Drops aus Dungeons nicht.', en: '**Going past +10 on pieces you’ll soon replace** – only crafting upgrades carry enhancement and Amplified over, dungeon drops don’t.' },
            { de: '**Ein Splendent-Teil der Stufe 86 für Amplified +5 einplanen** – es endet bei +3 (Splendent 70 bei +1). Für +5 brauchst du Stufe 94/102 oder den Drop der Stufe 86.', en: '**Planning Amplified +5 on a level-86 Splendent piece** – it stops at +3 (Splendent 70 at +1). For +5 you need level 94/102 or the level-86 drop.' },
            { de: '**Amplified vor den Arcana** – fünf Karten kosten keinen Fehlschlag, Amplified +5 im Schnitt ≈26 Mio. Kina pro Teil.', en: '**Amplified before Arcana** – five cards can’t fail, Amplified +5 costs ≈26M Kina per piece on average.' },
            { de: '**Stigmen liegen lassen** – und die günstigen Shard-Quellen vergessen: je 35 aus dem Nightmare- und dem Shugo-Shop kosten keine AP.', en: '**Leaving stigmas low** – and forgetting the cheap shard sources: 35 each from the Nightmare and Shugo shops cost no AP.' },
            { de: '**Die Clash Rune hoch zocken** – ab +5 gelingt höchstens jeder vierte Versuch, und ein Fehlschlag kostet eine Stufe.', en: '**Gambling the Clash Rune high** – from +5 at most one try in four succeeds, and a failure costs a level.' },
            { de: '**Conquest oder Transcendence verlassen, ohne den Würfel abzuholen** – der Server hat nur 10 offene Würfel pro Woche; sind sie weg, kommt bis zum Reset niemand mehr hinein.', en: '**Leaving Conquest or Transcendence without claiming the cube** – the server only has 10 unclaimed cubes per week; once they are gone nobody gets in until the reset.' },
            { de: '**Nur auf die Zahl schauen** – Azphel-Knoten heben die Kampfkraft, bringen aber keinen PvE-Schaden, und ein sauberes Makro zeigt die Anzeige gar nicht. Im Kampf zählt beides.', en: '**Only watching the number** – Azphel nodes raise Combat Power but add no PvE damage, and a clean macro doesn’t show in the number at all. In a fight both count.' },
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
            de: 'Offen oder strittig: wie viel eine Verzauberungs- oder Amplified-Stufe genau bringt; ob es auf dem globalen Server schon Heroic-Ausrüstung (+20) gibt (die Client-Daten sagen nein, einige Guides ja); ob Flügel-Stufen, Garderobe und PvP-Werte (Potential) in die Kampfkraft zählen; das Rezept der Amplify Stones (nur eine Quelle); wann der Ludra-Raid zurückkommt und ob der koreanische Klassen-Ausgleich schon auf Global ist. Die koreanischen Zahlen laufen auf einer anderen Skala. Wenn du es im Spiel misst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open or disputed: how much one enhancement or Amplified level gives exactly; whether the global server already has Heroic gear (+20) (the client data says no, some guides yes); whether wing levels, wardrobe and PvP stats (Potential) count towards Combat Power; the Amplify Stone recipe (one source only); when the Ludra raid comes back and whether the Korean class balance is on Global yet. The Korean numbers run on another scale. If you measure it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/daevanion-guide', label: 'metabot.gg – Daevanion boards' },
            { href: 'https://metabot.gg/en/aion-2/guides/titles-guide', label: 'metabot.gg – Titles' },
            { href: 'https://metabot.gg/en/aion-2/guides/dungeon-guide', label: 'metabot.gg – Dungeon list and entry limits' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1529', label: 'Inven (KR) – Measured Combat Power changes' },
            { href: 'https://allthings.how/?p=250380', label: 'AllThings.How – Raising Combat Power' },
            { href: 'https://aion2hub.com/updates/aion-2-update-2026-06-24', label: 'AION2Hub – KR update 2026-06-24 (class Combat Power)' },
            { href: 'https://mein-mmo.de/aion-2-sanctuary-weihestaette-ludra-wo-ist-der-raid/', label: 'Mein-MMO – Why the Ludra raid is gone (7 Oct 2026)' },
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings (rank cut-offs, gear of the top 10)' },
          ],
        },
      ],
    },
  ],
};
