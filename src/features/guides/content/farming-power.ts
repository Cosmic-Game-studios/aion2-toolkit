import type { Guide, L10n } from '../types';

/*
 * Farming & power. Numbers checked on 2026-10-19 against: Raid Relay's Kina guide for the global client (Kina per claim,
 * run times, the server-wide run counter, hours and Kina per week, 16 Oct), metabot.gg (entry caps and refills, dungeon
 * gates, Combat Power statistics, Abyss), daevaguides.com (Odyle Energy, Wind Breeze limits from NC's 14 Oct notes) and
 * the AION2 Index ranking (19 Oct). The Kina-per-week figures are cubes only: 21 claims of 40 Odyle per character and week.
 * The printable PDF is the version of 18 Oct and still has the older figures.
 */

/** A name that is the same in both languages (content and places as the English client calls them). */
const both = (s: string): L10n => ({ de: s, en: s });

/** A number text in both languages: German swaps the separators ("1,400" → "1.400") and spells out M and h. */
const num = (en: string): L10n => ({
  en,
  de: en
    .replace(/(?<=\d)[.,](?=\d)/g, (c) => (c === '.' ? ',' : '.'))
    .replace(/(\d)M\b/g, '$1 Mio.')
    .replace(/(\d) h\b/g, '$1 Std.'),
});

/** The same guide as a printable PDF (with the charts and the weekly tracker), served from public/guides/. */
const PDF = `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}guides/aion2-farming-power-guide.pdf`;

const pdfLink = {
  type: 'links' as const,
  items: [{ href: PDF, download: true, primary: true, label: { de: 'PDF herunterladen (22 Seiten, englisch)', en: 'Download the PDF (22 pages)' } }],
};

/** Kina per claim (40 Odyle) and its gate, Raid Relay (global client, 16 Oct 2026); run times timed by the author or estimated (≈). */
const CLAIMS: { label: string; kina: number; ilv: string; time: string; transcendence: boolean }[] = [
  { label: 'Conquest 1★ · Krao Cave, Draupnir', kina: 200, ilv: '700', time: '8', transcendence: false },
  { label: 'Conquest 2★ · Urugugu Canyon, Vakron', kina: 300, ilv: '1,400', time: '10', transcendence: false },
  { label: 'Transcendence 1', kina: 300, ilv: '1,600', time: '10', transcendence: true },
  { label: 'Transcendence 2', kina: 360, ilv: '1,900', time: '≈12', transcendence: true },
  { label: 'Conquest 3★ · Fire Temple, Horn Den', kina: 400, ilv: '2,100', time: '≈12', transcendence: false },
  { label: 'Transcendence 3', kina: 420, ilv: '2,200', time: '≈12', transcendence: true },
  { label: 'Transcendence 4', kina: 480, ilv: '2,500', time: '≈12', transcendence: true },
];

/**
 * Kina per week from Conquest 2★ cubes (300K per claim, 21 claims per character) for 1–8 characters on one server.
 * Free: one claim per run, runs past 84 on the server pay 80 → 60 → 40 → 20%. Membership: two claims per run, so
 * 8 characters stay inside the 84 full runs.
 */
const RATES = [1, 0.8, 0.6, 0.4, 0.2];
const freeKina = (chars: number) => {
  let runs = 0;
  let kina = 0;
  for (let c = 0; c < chars; c++) {
    for (let r = 0; r < 21; r++, runs++) kina += 0.3 * RATES[Math.min(4, runs < 84 ? 0 : Math.floor((runs - 84) / 21) + 1)];
  }
  return Math.round(kina * 100) / 100;
};
const CHARS = [1, 2, 3, 4, 5, 6, 7, 8];

export const farmingPower: Guide = {
  id: 'farming-power',
  icon: 'power',
  tone: 'violet',
  category: 'world',
  title: {
    de: 'Farming & Power: Kina, Gegenstandsstufe, Kampfkraft und AP',
    en: 'Farming & power: Kina, item level, Combat Power and AP',
  },
  summary: {
    de: 'Wie du die vier Zahlen des Fortschritts so schnell wie möglich hochtreibst – solo oder mit Twinks, gratis oder mit Membership, für Elyos und Asmodier: Kina pro Lauf und Stunde, Routen für jeden Tag, Wochenplan, Checklisten und die Obergrenzen pro Woche.',
    en: 'How to push the four numbers of progress as fast as possible – solo or with alts, free or with Membership, for Elyos and Asmodians: Kina per run and per hour, routes for every day, a week plan, checklists and the weekly ceilings.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Farming', en: 'Farming' },
    { de: 'Kina', en: 'Kina' },
    { de: 'Gegenstandsstufe', en: 'Item level' },
    { de: 'Kampfkraft', en: 'Combat Power' },
    { de: 'Abyss-Punkte', en: 'Abyss Points' },
  ],
  basis: {
    de: 'Recherche zum globalen Server, PvE (Stand 19.10.2026): Kina-Werte und Zeiten aus einem gemessenen Spieler-Guide, Obergrenzen und Freischaltungen aus den Client-Daten, die Rangliste von AION2 Index. Die AP-Mengen und die Zeiten der Routen sind Schätzungen zum Planen; Werte können sich mit Patches ändern.',
    en: 'Research for the global server, PvE (as of 19 Oct 2026): Kina values and times from a measured player guide, caps and unlocks from the client data, the AION2 Index ranking. The AP amounts and the route times are estimates for planning; values can change with patches.',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Vier Zahlen entscheiden über deinen Fortschritt in AION 2: **Kina** (die Währung), **Gegenstandsstufe (iLv)** (die Summe deiner Ausrüstung), **Kampfkraft (CP)** (der Stärkewert) und **Abyss-Punkte (AP)** (die Währung für Stigmen und Daevanion). Dieser Guide zeigt, wie du alle vier so schnell wie möglich hochtreibst – solo oder mit mehreren Charakteren, als Elyos oder Asmodier.',
            en: 'Four numbers decide your progress in AION 2: **Kina** (the currency), **item level (iLv)** (the total of your gear), **Combat Power (CP)** (the strength score) and **Abyss Points (AP)** (the currency for stigmas and Daevanion). This guide shows how to push all four as fast as possible – solo or with several characters, as Elyos or Asmodian.',
          },
        },
        pdfLink,
        { type: 'heading', text: { de: 'Die 7 wichtigsten Regeln', en: 'The 7 rules that matter most' } },
        {
          type: 'table',
          head: ['#', { de: 'Regel', en: 'Rule' }, { de: 'Warum', en: 'Why' }, { de: 'Bringt', en: 'Feeds' }],
          rows: [
            ['1', { de: '**Odyle-Energie nie voll laufen lassen**', en: '**Never let Odyle Energy cap**' }, { de: 'Deine größte Kina-Quelle – sie speichert gratis nur 4 Tage 16 Std. (Membership 7 Tage).', en: 'Your biggest Kina source – free it only banks 4 days 16 h (Membership 7 days).' }, 'Kina'],
            ['2', { de: '**5 Duty Missions täglich auf dem Main**', en: '**5 Duty Missions every day on your main**' }, { de: 'Serverweites Limit: je ≥50.000 gebundenes Kina, dazu Steine, Odyle, Schlüssel.', en: 'Server-wide limit: ≥50,000 bound Kina each, plus stones, Odyle, keys.' }, 'Kina · iLv'],
            ['3', { de: '**Jeden Wochenzähler vor Mittwoch leeren**', en: '**Clear every weekly counter before Wednesday**' }, { de: 'Ungenutzte Versuche, Eintritte und Tickets verfallen beim Reset.', en: 'Unused tries, entries and tickets are lost at the reset.' }, 'Kina · iLv · AP'],
            ['4', { de: '**Erst alles Epic/Unique sicher auf +10**', en: '**Safe +10 on all Epic/Unique gear first**' }, { de: 'Bis +10 gelingt es immer – Stärke ohne Risiko.', en: 'Always succeeds up to +10 – risk-free power.' }, 'iLv · CP'],
            ['5', { de: '**Den schwächsten Platz verbessern, nicht den besten**', en: '**Upgrade your weakest slot, not your best**' }, { de: 'Die Gegenstandsstufe treibt die Kampfkraft (bis etwa Stufe 2.000 ≈45 CP pro Punkt, an der Spitze ≈69).', en: 'Item level drives Combat Power (≈45 CP per point up to about item level 2,000, ≈69 at the top).' }, 'iLv · CP'],
            ['6', { de: '**Zuerst AP ohne Obergrenze farmen**', en: '**Farm uncapped AP first**' }, { de: 'Quest-AP und Supply Requests zählen nicht in die Wochengrenze.', en: 'Quest AP and Supply Requests don’t count towards the weekly cap.' }, 'AP'],
            ['7', { de: '**Twinks: gleicher Server + gleiche Fraktion**', en: '**Alts: same server + faction**' }, { de: 'Nur dort teilen sie das Server Storage. Gratis lohnen 4 Charaktere, mit Membership bis 8.', en: 'Only there they share Server Storage. Free, 4 characters pay; with Membership up to 8.' }, 'Kina'],
          ],
        },
        { type: 'heading', text: { de: 'Deine Wochenziele', en: 'Your weekly targets' } },
        {
          type: 'stats',
          items: [
            { value: '21', label: { de: 'Würfel-Abholungen pro Charakter', en: 'cube claims per character' }, note: { de: '840 Odyle pro Woche ÷ 40 pro Abholung', en: '840 Odyle a week ÷ 40 per claim' }, tone: 'gold' },
            { value: num('1,400'), label: { de: 'Gegenstandsstufe für Conquest 2★', en: 'item level for Conquest 2★' }, note: { de: '+50 % Kina pro Würfel', en: '+50% Kina per cube' }, tone: 'blue' },
            { value: '100K', label: { de: 'Kampfkraft als erstes großes Ziel', en: 'Combat Power as the first big goal' }, note: { de: 'Median bei iLv 2.000+', en: 'median at iLv 2,000+' }, tone: 'teal' },
            { value: '200K+', label: { de: 'Abyss-Punkte pro Charakter', en: 'Abyss Points per character' }, note: { de: 'Schätzung, ohne PvP', en: 'estimate, without PvP' }, tone: 'violet' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Inhalte, Dungeons und Gegenstände stehen hier so, wie sie im englischen Client heißen. Im deutschen Client können sie anders lauten. Den schnellsten Weg Woche für Woche zeigt der **Power-Sprint**, was jeder Schritt an der Spitze wert ist, der Guide **Höchste Kampfkraft**.',
            en: 'Content, dungeons and items are named as in the English client. The fastest path week by week is in the **Power sprint**, what every step is worth at the top in the **Highest Combat Power** guide.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/power-sprint', label: { de: 'Power-Sprint', en: 'Power sprint' } },
            { href: '#/guides/combat-power', label: { de: 'Höchste Kampfkraft', en: 'Highest Combat Power' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Die vier Säulen des Fortschritts', en: 'The four pillars of progress' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der ganze Fortschritt in AION 2 läuft auf vier Zahlen hinaus, und sie treiben sich gegenseitig an: Kina kauft Gegenstandsstufe, Gegenstandsstufe öffnet bessere Dungeons, bessere Dungeons zahlen mehr Kina. Jede Aufgabe in diesem Guide trägt die Säule, auf die sie einzahlt: **Kina**, **iLv**, **CP** oder **AP**.',
            en: 'Everything in AION 2 progression comes down to four numbers, and they push each other: Kina buys item level, item level opens better dungeons, better dungeons pay more Kina. Every task in this guide is tagged with the pillar it feeds: **Kina**, **iLv**, **CP** or **AP**.',
          },
        },
        {
          type: 'flow',
          title: { de: 'Der Fortschritts-Kreislauf', en: 'The progress loop' },
          caption: {
            de: 'So hängen die Säulen zusammen. Schritt 3 schließt den Kreis: Jeder Meilenstein der Gegenstandsstufe erhöht das Kina pro Würfel (700 → 1.400 → 2.100, Transcendence ab 1.600).',
            en: 'How the pillars connect. Step 3 closes the loop: every item level milestone raises the Kina per cube (700 → 1,400 → 2,100, Transcendence from 1,600).',
          },
          items: [
            { title: { de: 'Odyle-Würfel + Duties', en: 'Odyle cubes + Duties' }, text: { de: 'Conquest, Transcendence, 5 Duties am Tag', en: 'Conquest, Transcendence, 5 Duties a day' }, tag: 'Kina', tone: 'gold' },
            { title: { de: 'Kina ausgeben', en: 'Spend Kina' }, text: { de: 'schwächster Platz → sicheres +10 → Arcana', en: 'weakest slot → safe +10 → Arcana' }, tag: 'iLv', tone: 'blue' },
            { title: { de: 'Nächster Meilenstein', en: 'Next milestone' }, text: { de: 'höheres Dungeon-Tier = mehr Kina pro Würfel', en: 'higher dungeon tier = more Kina per cube' }, tag: 'iLv → Kina', tone: 'gold' },
            { title: { de: 'Abyss, Quests, Lieferungen', en: 'Abyss, quests, deliveries' }, text: { de: 'AP → Stigma Shards, Daevanion', en: 'AP → Stigma Shards, Daevanion' }, tag: 'AP', tone: 'violet' },
            { title: { de: 'Kampfkraft', en: 'Combat Power' }, text: { de: 'Gegenstandsstufe + Stigmen + Daevanion + Titel', en: 'item level + stigmas + Daevanion + titles' }, tag: 'CP', tone: 'teal' },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Säule', en: 'Pillar' }, { de: 'Was es ist', en: 'What it is' }, { de: 'Hauptquellen', en: 'Main sources' }, { de: 'Ziel mit diesem Guide', en: 'Goal with this guide' }],
          rows: [
            ['**Kina**', { de: 'Währung – kauft Ausrüstung, Verbesserungen und (mit Membership) Market-Waren', en: 'Currency – buys gear, upgrades and (with Membership) Market items' }, { de: 'Odyle-Würfel, Duties, Market', en: 'Odyle cubes, Duties, Market' }, { de: '≈6,3 Mio./Woche solo · ≈25–50 Mio. mit Twinks', en: '≈6.3M/week solo · ≈25–50M with alts' }],
            ['**iLv**', { de: 'Summe des Charakters aus Ausrüstung, Verzauberung und Arcana', en: 'Character total of gear, enhancement and Arcana' }, { de: 'Ausrüstungswechsel, sicheres +10, Arcana', en: 'Gear swaps, safe +10, Arcana' }, num('700 → 1,400 → 2,100 → 2,500')],
            ['**CP**', { de: 'Der Stärkewert des Spiels – bis etwa Gegenstandsstufe 2.000 ≈45 pro Punkt, an der Spitze ≈69', en: "The game's strength score – ≈45 per item level point up to about 2,000, ≈69 at the top" }, { de: 'Gegenstandsstufe, Stigmen, Daevanion, Titel, Flügel', en: 'Item level, stigmas, Daevanion, titles, wings' }, '≈50K → ≈100K+'],
            ['**AP**', { de: 'Abyss-Währung – Stigma Shards, Daevanion Crystals, Potential Stones', en: 'Abyss currency – Stigma Shards, Daevanion Crystals, Potential Stones' }, { de: 'Supply Requests, Quests, Corridor, Abyss-Monster', en: 'Supply Requests, quests, Corridor, Abyss mobs' }, { de: '≈110–380K pro Woche und Charakter (Schätzung)', en: '≈110–380K per week per character (estimate)' }],
          ],
        },
      ],
    },
    {
      title: { de: 'Obergrenze und Ertrag', en: 'The ceiling and the payoff' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Dieser Guide zielt auf das **Maximum**, nicht nur auf „besser“. So weit reichen die Systeme pro Woche – und so weit sind die Besten auf dem globalen Server zwei Wochen nach dem Start schon gekommen:',
            en: "This guide aims at the **maximum**, not just 'better'. This is how far the systems reach per week – and how far the best on the global server have already come two weeks after launch:",
          },
        },
        {
          type: 'stats',
          items: [
            { value: num('≈67M'), label: { de: 'Kina pro Woche aus Würfeln', en: 'Kina per week from cubes' }, note: { de: '8 Charaktere, Membership, Conquest 3★ – mit Transcendence 4 noch mehr', en: '8 characters, Membership, Conquest 3★ – more with Transcendence 4' }, tone: 'gold' },
            { value: num('3,471'), label: { de: 'höchste Gegenstandsstufe der Top 50', en: 'highest item level of the top 50' }, note: { de: 'AION2 Index, 19.10.', en: 'AION2 Index, 19 Oct' }, tone: 'blue' },
            { value: '265K', label: { de: 'höchste Kampfkraft', en: 'highest Combat Power' }, note: { de: 'Platz 10.000: 143K', en: 'rank 10,000: 143K' }, tone: 'teal' },
            { value: '?', label: { de: 'AP-Wochengrenze auf Global', en: 'weekly AP cap on Global' }, note: { de: 'nicht veröffentlicht – Korea: 400K für Monster + PvP zusammen', en: 'not published – Korea: 400K for mobs + PvP together' }, tone: 'violet' },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Säule', en: 'Pillar' }, { de: 'Mit dem Guide', en: 'Guide level' }, { de: 'Obergrenze', en: 'Ceiling' }, { de: 'Was es braucht', en: 'What it takes' }],
          rows: [
            ['**Kina**', { de: '≈25,2 Mio. (4 Charaktere, Conquest 2★)', en: '≈25.2M (4 chars, Conquest 2★)' }, { de: '≈67 Mio. (8 Charaktere, Conquest 3★)', en: '≈67M (8 chars, Conquest 3★)' }, { de: 'Membership · Plätze 5–8 · jeder Charakter auf 2.100', en: 'Membership · slots 5–8 · every character at 2,100' }],
            ['**AP**', { de: '≈110–380K pro Charakter (Schätzung)', en: '≈110–380K per char (estimate)' }, { de: 'Wochengrenze für Monster + PvP, dazu alle AP ohne Grenze', en: 'weekly cap for mobs + PvP, plus all uncapped AP' }, { de: 'Beide gedeckelten Quellen voll + Quest-AP und Supply Requests', en: 'Both capped sources full + quest AP and Supply Requests' }],
            ['**iLv**', num('1,400 → 2,100'), { de: '≈3.470 (die Besten, 19.10.)', en: '≈3,470 (the best, 19 Oct)' }, { de: 'Splendent Wise/Ebony 102 auf +15 mit Amplified +5, fünf Unique-Arcana', en: 'Splendent Wise/Ebony 102 at +15 with Amplified +5, five Unique Arcana' }],
            ['**CP**', '≈66K → ≈100K', '≈265K', { de: 'Dazu Stigmen auf 20, ≈290 von 532 Daevanion-Knoten, viele Titel', en: 'Plus stigmas at 20, ≈290 of 532 Daevanion nodes, many titles' }],
          ],
        },
        { type: 'heading', text: { de: 'Die 10 Gesetze für maximalen Fortschritt', en: 'The 10 laws of max progress' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Nichts verschwenden', en: 'Zero waste' }, text: { de: 'Odyle, Abyss-Zeit, Wochenzähler, offene Würfel.', en: 'Odyle, Abyss time, weekly counters, unclaimed cubes.' } },
            { title: { de: 'Immer das höchste Tier', en: 'Highest tier' }, text: { de: 'das du schaffst – ab 1.600 auch Transcendence.', en: 'you can clear, always – from 1,600 Transcendence too.' } },
            { title: { de: 'Doppelt abholen mit Membership', en: 'Double-claim with Membership' }, text: { de: '80 Odyle = 2 Abholungen aus einem Würfel.', en: '80 Odyle = 2 claims from one cube.' } },
            { title: { de: 'Voller Kader', en: 'Full roster' }, text: { de: 'auf einem Server und in einer Fraktion.', en: 'on one server and faction.' } },
            { title: { de: 'Zuerst AP ohne Obergrenze', en: 'Uncapped AP first' }, text: { de: 'Quests, Supply Requests.', en: 'Quests, Supply Requests.' } },
            { title: { de: 'Die gedeckelten AP-Quellen', en: 'Cap the capped' }, text: { de: 'jede Woche voll machen.', en: 'AP sources every week.' } },
            { title: { de: 'Überschuss verwerten', en: 'Use the surplus' }, text: { de: 'Mit Membership am Market verkaufen, gratis per Morph in Odyle-Energie.', en: 'With Membership sell it on the Market, free morph it into Odyle Energy.' } },
            { title: { de: 'Kina → Gegenstandsstufe', en: 'Kina → item level' }, text: { de: 'schwächster Platz → +10 → Arcana.', en: 'weakest slot → +10 → Arcana.' } },
            { title: { de: 'AP → Kampfkraft', en: 'AP → Combat Power' }, text: { de: 'Stigma Shards, Daevanion.', en: 'Stigma Shards, Daevanion.' } },
            { title: { de: 'In Blöcken spielen', en: 'Batch sessions' }, text: { de: '2 Odyle-Tage, 3 Abyss-Blöcke.', en: '2 Odyle days, 3 Abyss blocks.' } },
          ],
        },
        { type: 'heading', text: { de: 'Was dir dieser Guide bringt', en: 'What this guide earns you' } },
        {
          type: 'bars',
          title: { de: 'Kina pro Woche aus Odyle-Würfeln', en: 'Kina per week from Odyle cubes' },
          caption: {
            de: 'Nur Würfel, 21 Abholungen pro Charakter und Woche: Conquest 2★ zahlt 300.000, Conquest 3★ 400.000 Kina pro Abholung (Raid Relay, 16.10.2026). Gratis zahlt jeder Lauf über 84 auf dem Server weniger (siehe Säule I). „Normal“ ist eine Annahme zum Vergleich: Tier 1, die Hälfte der Odyle verschwendet.',
            en: 'Cubes only, 21 claims per character and week: Conquest 2★ pays 300,000, Conquest 3★ 400,000 Kina per claim (Raid Relay, 16 Oct 2026). Free, every run past 84 on the server pays less (see Pillar I). “Casual” is an assumption for comparison: Tier 1, half the Odyle wasted.',
          },
          items: [
            { label: { de: 'Normal: 1 Charakter', en: 'Casual: 1 character' }, note: { de: 'Tier 1, halbe Odyle verschwendet', en: 'Tier 1, half the Odyle wasted' }, value: 2.0, display: num('≈2.0M'), tone: 'slate' },
            { label: { de: 'Guide solo', en: 'Guide solo' }, note: 'Conquest 2★', value: 6.3, display: num('6.3M'), tone: 'blue' },
            { label: { de: 'Main + 3 Twinks', en: 'Main + 3 alts' }, note: { de: 'Conquest 2★, gratis', en: 'Conquest 2★, free' }, value: 25.2, display: num('25.2M'), tone: 'gold' },
            { label: { de: '8 Charaktere gratis', en: '8 characters free' }, note: { de: 'ab Lauf 85 nur 80 → 20 %', en: 'from run 85 only 80 → 20%' }, value: freeKina(8), display: num(`${freeKina(8)}M`), tone: 'rose' },
            { label: { de: '8 Charaktere, Membership', en: '8 characters, Membership' }, note: 'Conquest 2★', value: 50.4, display: num('≈50M'), tone: 'gold' },
            { label: { de: '8 Charaktere, Membership', en: '8 characters, Membership' }, note: 'Conquest 3★', value: 67.2, display: num('≈67M'), tone: 'gold' },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Säule', en: 'Pillar' }, { de: 'Normale Woche', en: 'Casual week' }, { de: 'Mit diesem Guide', en: 'Following this guide' }, { de: 'Warum', en: 'Why' }],
          rows: [
            ['**Kina**', { de: '≈2,0 Mio. (Tier 1, halbe Odyle verschwendet)', en: '≈2.0M (Tier 1, half the Odyle wasted)' }, { de: '≈6,3 Mio. solo (×3) · ≈25 Mio. mit 3 Twinks (×12) · ≈50 Mio. mit 7 (Membership)', en: '≈6.3M solo (×3) · ≈25M with 3 alts (×12) · ≈50M with 7 (Member)' }, { de: 'Keine verschwendete Energie, Conquest 2★, Twinks auf demselben Server', en: 'No wasted energy, Conquest 2★, alts on the same server' }],
            ['**iLv**', { de: 'langsame, zufällige Verbesserungen', en: 'slow, random upgrades' }, { de: 'Meilensteine 1.000 → 1.400 → 2.100', en: 'milestones 1,000 → 1,400 → 2,100' }, { de: 'Kina in der richtigen Reihenfolge ausgegeben', en: 'Kina spent in the right order' }],
            ['**CP**', { de: '≈50K bei iLv 1.000', en: '≈50K at iLv 1,000' }, { de: '≈66K bei 1.400 · ≈100K bei 2.000+ (+50K)', en: '≈66K at 1,400 · ≈100K at 2,000+ (+50K)' }, { de: 'Gegenstandsstufe, Stigmen und Daevanion zusammen', en: 'Item level, stigmas and Daevanion together' }],
            ['**AP**', '≈30–60K', { de: '≈110–380K ohne PvP (×3–6, Schätzung)', en: '≈110–380K without PvP (×3–6, estimate)' }, { de: 'Quellen ohne Obergrenze zuerst, Corridor-Schübe', en: 'Uncapped sources first, Corridor bursts' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'So liest du die Zahlen', en: 'How to read these numbers' },
          text: {
            de: 'Würfelwerte, Obergrenzen und das Verhältnis von Kampfkraft zu Gegenstandsstufe können sich mit Patches ändern. Die AP-Grenzen des globalen Servers sind nicht veröffentlicht – Korea hatte erst 200K für Monster und 200K für PvP, seit Dezember 2025 400K zusammen; schau auf den Zähler im Abyss-Fenster. Die „normale Woche“ ist eine Annahme zum Vergleich.',
            en: 'Cube values, caps and the ratio of Combat Power to item level can change with patches. The global AP caps are not published – Korea first had 200K for mobs and 200K for PvP, since December 2025 400K together; check the counter in the Abyss window. The casual week is an assumption for comparison.',
          },
        },
      ],
    },
    {
      title: { de: 'Zeitbudget: wo sich Membership lohnt', en: 'Time budget: where Membership pays' },
      blocks: [
        {
          type: 'compare',
          title: { de: 'Gratis oder Membership', en: 'Free or Membership' },
          caption: {
            de: 'Membership (≈15 $ im Monat) gilt für alle Charaktere des Accounts. Grenzen aus den Client-Daten (metabot.gg) und NCs Patch-Notes vom 14.10. (über daevaguides.com).',
            en: 'Membership (≈$15 a month) covers every character of the account. Limits from the client data (metabot.gg) and NC’s patch notes of 14 Oct (via daevaguides.com).',
          },
          items: [
            {
              title: { de: 'Gratis', en: 'Free' },
              tag: { de: '≈1,7 Mio. Kina/Std.', en: '≈1.7M Kina/h' },
              tone: 'slate',
              points: [
                { kind: 'con', text: { de: 'Odyle-Grenze 560 – spätestens alle 4 Tage einloggen', en: 'Odyle cap 560 – log in at least every 4 days' } },
                { kind: 'con', text: { de: 'Eine Abholung pro Lauf: doppelt so viele Läufe für dasselbe Kina', en: 'One claim per run: twice the runs for the same Kina' } },
                { kind: 'con', text: { de: 'Kein Market, kein Kina-↔-Quna-Tausch, keine Odyle beim Wind Breeze Merchant', en: 'No Market, no Kina ↔ Quna exchange, no Odyle from the Wind Breeze Merchant' } },
                { kind: 'pro', text: { de: 'Substance Morph: 4 × 40 Odyle pro Charakter und Woche', en: 'Substance Morph: 4 × 40 Odyle per character a week' } },
              ],
              verdict: { de: 'Main + bis zu 3 Twinks – danach zahlt jeder Lauf weniger.', en: 'Main + up to 3 alts – past that every run pays less.' },
            },
            {
              title: both('Membership'),
              tag: { de: '≈3 Mio. Kina/Std.', en: '≈3M Kina/h' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Odyle-Grenze 840 – voll erst nach 7 Tagen', en: 'Odyle cap 840 – full only after 7 days' } },
                { kind: 'pro', text: { de: 'Zwei Abholungen pro Lauf: dasselbe Kina in der halben Zeit, der Server zählt halb so viele Läufe', en: 'Two claims per run: the same Kina in half the time, the server counts half the runs' } },
                { kind: 'pro', text: { de: 'Market und Kina-↔-Quna-Tausch; Odyle beim Wind Breeze Merchant (100.000 Kina pro 40, 4 pro Charakter, 16 pro Server)', en: 'Market and Kina ↔ Quna exchange; Odyle from the Wind Breeze Merchant (100,000 Kina per 40, 4 per character, 16 per server)' } },
                { kind: 'pro', text: { de: '14 statt 7 Std. in Lower und Middle Reshanta, 21 statt 12 Shugo-Schlüssel', en: '14 instead of 7 h in Lower and Middle Reshanta, 21 instead of 12 Shugo keys' } },
                { kind: 'con', text: { de: 'Kostet echtes Geld', en: 'Costs real money' } },
              ],
              verdict: { de: 'Lohnt sich für alle mit Twinks oder wenig Zeit.', en: 'Pays for anyone with alts or little time.' },
            },
          ],
        },
        {
          type: 'line',
          title: { de: 'Stunden pro Woche für die volle Kina-Routine', en: 'Hours per week for the full Kina routine' },
          caption: {
            de: 'Von Raid Relay gemessen und hochgerechnet (globaler Client, 16.10.2026): alle Kina-Quellen eines Accounts, Dungeon-Zeit und Wege. Kina pro Woche gratis 11,3 / 18,6 / 25,5 / 30,6 Mio., mit Membership 10,3 / 17,4 / 24,5 / 31,6 Mio. – fast gleich viel Kina in halb so viel Zeit.',
            en: 'Measured and extrapolated by Raid Relay (global client, 16 Oct 2026): all Kina sources of an account, dungeon time and travel. Kina per week free 11.3 / 18.6 / 25.5 / 30.6M, with Membership 10.3 / 17.4 / 24.5 / 31.6M – almost the same Kina in half the time.',
          },
          x: { label: { de: 'Aufbau', en: 'Setup' }, ticks: ['Main', 'Main + 1', 'Main + 2', 'Main + 3'] },
          y: { label: { de: 'Stunden pro Woche', en: 'hours per week' }, unit: 'h', min: 0 },
          series: [
            { label: { de: 'Gratis', en: 'Free' }, values: [6.8, 11.0, 15.2, 19.3], tone: 'slate' },
            { label: both('Membership'), values: [3.5, 5.7, 7.8, 10.0], tone: 'gold' },
          ],
        },
        { type: 'heading', text: { de: 'Wähle deinen Aufbau nach deiner Zeit', en: 'Pick your setup by available time' } },
        {
          type: 'table',
          head: [{ de: 'Zeit pro Woche', en: 'Time per week' }, { de: 'Aufbau', en: 'Setup' }, { de: 'Kina/Woche', en: 'Kina/week' }, { de: 'Kina/Std.', en: 'Kina/hour' }, { de: 'Hinweis', en: 'Note' }],
          rows: [
            [num('≈3.5 h'), { de: 'Nur Main + Membership', en: 'Main only + Membership' }, num('≈10.3M'), num('≈2.9M'), { de: 'Höchster Wert pro Stunde', en: 'Highest value per hour' }],
            [num('≈7 h'), { de: 'Nur Main, gratis', en: 'Main only, free' }, num('≈11.3M'), num('≈1.7M'), { de: 'Solide ohne Kosten', en: 'Solid at no cost' }],
            [num('≈8 h'), { de: 'Main + 2 Twinks + Membership', en: 'Main + 2 alts + Membership' }, num('≈24.5M'), num('≈3.1M'), { de: 'Die Empfehlung von Raid Relay', en: 'Raid Relay’s recommendation' }],
            [num('≈10 h'), { de: 'Main + 3 Twinks + Membership', en: 'Main + 3 alts + Membership' }, num('≈31.6M'), num('≈3.2M'), { de: 'Gratis wären es 19 Std.', en: 'Free it would take 19 h' }],
            [num('20 h+'), { de: 'Alle 8 Charaktere + Membership', en: 'All 8 characters + Membership' }, { de: '≈50 Mio. nur aus Würfeln', en: '≈50M from cubes alone' }, '–', { de: 'Die Obergrenze – hochgerechnet', en: 'The ceiling – extrapolated' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Raid Relays eigene Zahlen gehen nicht ganz auf (z. B. 6,3 Mio. aus 21 Abholungen in 3,5 Std. gegenüber 10,3 Mio. in der Tabelle) – lies sie als Größenordnung. Belastbar ist das Verhältnis: Membership halbiert die Zeit fast, Twinks erhöhen das Kina, nicht das Tempo.',
            en: 'Raid Relay’s own figures don’t quite add up (e.g. 6.3M from 21 claims in 3.5 h against 10.3M in the table) – read them as an order of magnitude. The ratio is solid: Membership almost halves the time, alts raise the Kina, not the speed.',
          },
        },
      ],
    },
    {
      title: { de: 'Routen für jeden Tag', en: 'Optimized routes: every day' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Arbeite die Stationen von oben nach unten ab. Die Reihenfolge ist so gewählt, dass zuerst kommt, was voll läuft oder verfällt, und nichts doppelt gemacht wird. Die Zeiten sind Schätzungen.',
            en: 'Follow the stations top to bottom. The order is chosen so that things that cap or expire come first and nothing is done twice. Times are estimates.',
          },
        },
        { type: 'heading', text: { de: 'Tägliche Route · Main (≈45 Min.)', en: 'Daily route · main (≈45 min)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Attendance + Shugo-Schlüssel · 2 Min.', en: 'Attendance + Shugo keys · 2 min' }, text: { de: 'Zuerst abholen – sie laufen voll.', en: 'Claim first – they cap.' } },
            { title: { de: 'Duty Missions ×5 · 15 Min.', en: 'Duty Missions ×5 · 15 min' }, text: { de: 'Schwache Belohnungen neu würfeln – aber sparsam: Das 6. Würfeln kostet schon 85.000 Kina, mehr als die 50.000 einer Duty.', en: 'Reroll weak rewards – but sparingly: the 6th reroll already costs 85,000 Kina, more than the 50,000 a Duty pays.' } },
            { title: { de: 'Dimensional Invasion · 5 Min.', en: 'Dimensional Invasion · 5 min' }, text: { de: '1 Belohnungs-Schlüssel pro Tag, bis 7 ansparbar (pro Server).', en: '1 reward key per day, banks up to 7 (per server).' } },
            { title: { de: 'Daily Dungeon ×2 · 10 Min.', en: 'Daily Dungeon ×2 · 10 min' }, text: { de: 'Enhance Stones.', en: 'Enhance Stones.' } },
            { title: { de: 'Nightmare ×2 · 10 Min.', en: 'Nightmare ×2 · 10 min' }, text: { de: 'Oder bis zu 14 ansparen.', en: 'Or bank up to 14.' } },
            { title: { de: 'Supply Requests · 3 Min.', en: 'Supply Requests · 3 min' }, text: { de: 'AP ohne Obergrenze.', en: 'Uncapped AP.' } },
          ],
        },
        {
          type: 'shares',
          title: { de: 'Wohin die 45 Minuten des Mains gehen', en: 'Where the main’s 45 minutes go' },
          caption: {
            de: 'Unsere Zeitschätzung pro Station (nicht gemessen). Ein Drittel ist Duty-Zeit – die serverweiten Duties sind die einzige Station, die nur der Main machen sollte und die sich nicht unbegrenzt ansparen lässt.',
            en: 'Our time estimate per station (not measured). A third is Duty time – the server-wide Duties are the one station only the main should do and that does not bank forever.',
          },
          unit: { de: 'Min.', en: 'min' },
          items: [
            { label: 'Duty Missions ×5', value: 15, tone: 'gold' },
            { label: 'Daily Dungeon ×2', value: 10, tone: 'blue' },
            { label: 'Nightmare ×2', value: 10, tone: 'violet' },
            { label: 'Dimensional Invasion', value: 5, tone: 'teal' },
            { label: 'Supply Requests', value: 3, tone: 'green' },
            { label: { de: 'Attendance + Schlüssel', en: 'Attendance + keys' }, value: 2, tone: 'slate' },
          ],
        },
        { type: 'heading', text: { de: 'Tägliche Route · jeder Twink (≈15 Min.)', en: 'Daily route · each alt (≈15 min)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Nightmare ×2 · 10 Min.', en: 'Nightmare ×2 · 10 min' }, text: { de: 'Oder ansparen und gesammelt machen.', en: 'Or bank and batch.' } },
            { title: { de: 'Supply Requests · 3 Min.', en: 'Supply Requests · 3 min' }, text: { de: 'Eigene AP für die eigenen Stigmen.', en: 'Own AP for own Stigmas.' } },
            { title: { de: 'Odyle prüfen · 1 Min.', en: 'Odyle check · 1 min' }, text: { de: 'Nur an den Session-Tagen leeren.', en: 'Only empty on session days.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Was voll läuft, zuerst abholen** (Shugo-Schlüssel, Attendance) – kostet nichts und geht am Limit verloren.', en: '**Claim capping things first** (Shugo keys, Attendance) – they cost nothing and are lost at cap.' },
            { de: '**Duties vor Dungeons:** Die Duty-Belohnungen enthalten Odyle und Schlüssel, die der Rest der Route braucht.', en: '**Duties before dungeons:** Duty rewards include Odyle and keys that the rest of the route uses.' },
            { de: '**Twinks bleiben kurz:** nur Inhalte pro Charakter; Odyle wartet auf die Session-Tage.', en: '**Alts stay short:** only per-character content; Odyle waits for the session days.' },
            { de: '**Wenig Zeit?** Die Stationen 1, 2 und 6 auf dem Main sind das Minimum – Nightmare, Daily Dungeon und Invasion-Schlüssel lassen sich ansparen.', en: '**Busy day?** Stations 1, 2 and 6 on the main are the minimum – Nightmare, Daily Dungeon and Invasion keys bank.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Schlüsseltage: Mittwoch und Samstag', en: 'Key days: Wednesday and Saturday' },
      blocks: [
        { type: 'heading', text: { de: 'Mittwoch · Reset-Tag (≈1,5 Std.)', en: 'Wednesday · reset day (≈1.5 h)' } },
        {
          type: 'text',
          text: {
            de: 'Der Wochen-Reset ist mittwochs um 16:00 Serverzeit; die genaue Ortszeit zeigt der Countdown „Weekly recharge in“ im Spiel.',
            en: 'The weekly reset is on Wednesday at 16:00 server time; the in-game “Weekly recharge in” countdown shows your local time.',
          },
        },
        {
          type: 'steps',
          items: [
            { title: { de: 'Command Scrolls ×12 kaufen · 5 Min.', en: 'Buy Command Scrolls ×12 · 5 min' }, text: { de: 'Werden nicht übertragen.', en: 'Do not roll over.' } },
            { title: { de: 'Morph + Wind-Breeze-Odyle · 5 Min.', en: 'Morph + Wind Breeze Odyle · 5 min' }, text: { de: 'Je 4 pro Charakter, je 16 pro Server; der Laden braucht Membership.', en: '4 each per character, 16 each per server; the shop needs Membership.' } },
            { title: { de: 'Wind Breeze Merchant · 2 Min.', en: 'Wind Breeze Merchant · 2 min' }, text: { de: 'Wochenangebot prüfen.', en: 'Check weekly stock.' } },
            { title: { de: 'Ascension Trial ×3 · 30 Min.', en: 'Ascension Trial ×3 · 30 min' }, text: { de: 'Auf jedem Charakter ab Gegenstandsstufe 1.000.', en: 'Every character from item level 1,000.' } },
            { title: { de: 'Tägliche Route · 45 Min.', en: 'Daily route · 45 min' }, text: { de: 'Wie jeden Tag.', en: 'As every day.' } },
          ],
        },
        { type: 'heading', text: { de: 'Samstag · Power-Tag (Hauptsession)', en: 'Saturday · power day (main event)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Main: Odyle-Würfel · ≈1–2 Std.', en: 'Main: Odyle cubes · ≈1–2 h' }, text: { de: 'Höchstes Tier · ≈480 Odyle = 12 Abholungen (Membership ≈1 Std.).', en: 'Highest tier · ≈480 Odyle = 12 claims (Membership ≈1 h).' } },
            { title: { de: 'Twinks 1–3 (oder 1–7) · je ≈1–2 Std.', en: 'Alts 1–3 (or 1–7) · ≈1–2 h each' }, text: { de: 'Einer nach dem anderen · Odyle leeren.', en: 'One by one · empty Odyle.' } },
            { title: { de: 'Kina zum Main schicken · 2 Min.', en: 'Send Kina to main · 2 min' }, text: { de: 'Handelbares Kina über das Server Storage.', en: 'Tradeable Kina via Server Storage.' } },
            { title: { de: 'Kina ausgeben · 15 Min.', en: 'Spend Kina · 15 min' }, text: { de: 'Schwächster Platz → +10 → Arcana.', en: 'Weakest slot → +10 → Arcana.' } },
            { title: { de: 'Abyss-Block · ≈2 Std.', en: 'Abyss block · ≈2 h' }, text: { de: 'Belagerung um 21:00 Serverzeit, danach Corridor + Monster.', en: 'Siege at 21:00 server time, then Corridor + mobs.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Mittwoch:** Alles mit Wochen-Kauflimit direkt nach dem Reset kaufen – es wird nie übertragen.', en: '**Wednesday:** buy everything with a weekly purchase limit right after reset – it never rolls over.' },
            { de: '**Ascension früh in der Woche** – Eintritte lassen sich nicht ansparen, ein vergessenes Trial ist weg.', en: '**Ascension early in the week** – entries do not bank, and a forgotten Trial is gone.' },
            { de: '**Samstag:** Odyle auf jedem Charakter bei ≈480 leeren und das Kina noch am selben Abend in Gegenstandsstufe verwandeln.', en: '**Saturday:** empty Odyle on every character at ≈480, then turn the Kina into item level the same evening.' },
            { de: '**Gebundenes Kina der Twinks nutzen:** Ein Ausrüstungsteil des Mains ins Server Storage legen, auf dem Twink mit dessen gebundenem Kina und Enhance Stones verzaubern, zurückschicken (Quest-Ausrüstung und die Spiritforged-Waffe gehen nicht ins Storage).', en: '**Use the alts’ bound Kina:** put a gear piece of the main into Server Storage, enhance it on the alt with the alt’s bound Kina and Enhance Stones, send it back (quest gear and the Spiritforged weapon can’t go into storage).' },
            { de: '**Ausgeben, solange du stark bist:** erst verbessern, dann mit der neuen Ausrüstung in den Abyss-Block.', en: '**Spend while you are strong:** upgrade first, then go into the Abyss block with the new gear.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Dienstag-Aufräumen und Abyss-Sessions', en: 'Tuesday clean-up and Abyss sessions' },
      blocks: [
        { type: 'heading', text: { de: 'Dienstag · Aufräumen (vor dem Reset)', en: 'Tuesday · clean-up (before reset)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Odyle-Session 2 · je ≈1 Std.', en: 'Odyle session 2 · ≈1 h each' }, text: { de: 'Alle Charaktere · 360 Odyle.', en: 'All characters · 360 Odyle.' } },
            { title: { de: 'Restliche Daily Dungeons', en: 'Daily Dungeon leftovers' }, text: { de: '14 pro Woche und Server.', en: '14 per week per server.' } },
            { title: { de: 'Ascension · Subjugation', en: 'Ascension · Subjugation' }, text: { de: 'Alles, was übrig ist.', en: 'Anything left.' } },
            { title: { de: 'Exploration + Corridors · 10 Min.', en: 'Exploration + Corridors · 10 min' }, text: { de: 'Die Würfel abholen.', en: 'Claim the cubes.' } },
            { title: { de: 'Restliche Abyss-Zeit', en: 'Abyss time leftover' }, text: { de: '7 Std. pro Ebene (Membership: 14 in Lower und Middle).', en: '7 h per layer (Membership: 14 in Lower and Middle).' } },
            { title: { de: 'Daeva Pass + Season · 15 Min.', en: 'Daeva Pass + Season · 15 min' }, text: { de: 'Wöchentliche EXP auffüllen.', en: 'Top up weekly EXP.' } },
          ],
        },
        { type: 'heading', text: { de: 'Abyss-Session · AP (≈2,5 Std., 3× pro Woche)', en: 'Abyss session · AP (≈2.5 h, 3× a week)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Zuerst Quest-AP · 20 Min.', en: 'Quest AP first · 20 min' }, text: { de: 'Command Scrolls (Lower 1.000, Middle 2.000 AP) · Season-Reiter.', en: 'Command Scrolls (Lower 1,000, Middle 2,000 AP) · Season tab.' } },
            { title: { de: 'Supply-Lieferungen · 5 Min.', en: 'Supply deliveries · 5 min' }, text: { de: 'AP ohne Obergrenze.', en: 'Uncapped AP.' } },
            { title: { de: 'Abyss Corridor · 5 Min.', en: 'Abyss Corridor · 5 min' }, text: { de: 'Wenn deine Fraktion die Belagerung gewonnen hat.', en: 'If your faction won the siege.' } },
            { title: { de: 'Abyss-Monster · 60–90 Min.', en: 'Abyss mobs · 60–90 min' }, text: { de: 'Lila markierte zuerst · bis zur Obergrenze.', en: 'Purple-marked first · to cap.' } },
            { title: { de: 'Spacetime Rift · 20 Min.', en: 'Spacetime Rift · 20 min' }, text: { de: 'Wenn sich ein Portal öffnet.', en: 'When a portal opens.' } },
            { title: { de: 'AP ausgeben · 5 Min.', en: 'Spend AP · 5 min' }, text: { de: 'Stigma Shards · Daevanion.', en: 'Stigma Shards · Daevanion.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Das Dienstag-Aufräumen ist das Sicherheitsnetz:** zweite Odyle-Session plus jeder Wochenrest.', en: '**Tuesday clean-up is the safety net:** second Odyle session plus every weekly leftover.' },
            { de: '**Abyss: ohne Obergrenze vor gedeckelt.** Erst Quest-AP und Lieferungen, dann Corridor-Schübe, dann Monster bis zur Grenze.', en: '**Abyss: uncapped before capped.** Quest AP and deliveries first, then Corridor bursts, then mobs to the cap.' },
            { de: '**Drei Abyss-Blöcke an den Belagerungs-Abenden** (Montag, Donnerstag, Samstag um 21:00 Serverzeit in Lower Reshanta): Die Siegerfraktion bekommt AP und den Corridor, und 30 Minuten danach erscheinen die Executors. So teilst du die 7 Std. pro Ebene auf, ohne Zeit verfallen zu lassen.', en: '**Three Abyss blocks on the siege nights** (Monday, Thursday, Saturday at 21:00 server time in Lower Reshanta): the winning faction gets AP and the Corridor, and the Executors spawn 30 minutes later. That splits the 7 h per layer without ever leaving time unused.' },
            { de: '**AP sofort ausgeben** für Stigma Shards und Daevanion Crystals – AP im Geldbeutel bringen keine Stärke.', en: '**Spend AP right away** on Stigma Shards and Daevanion Crystals – AP sitting in the wallet adds no power.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Der Wochenplan', en: 'The weekly master plan' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Eine Woche von Reset zu Reset. ● = an diesem Tag erledigen. Zwei Odyle-Sessions (Samstag, Dienstag) holen alle 21 Würfel, ohne je an die Grenze zu stoßen; die Abyss-Blöcke liegen auf den Belagerungs-Abenden; der Dienstag ist das Sicherheitsnetz für alles Wöchentliche.',
            en: 'One week from reset to reset. ● = do it that day. Two Odyle sessions (Saturday, Tuesday) collect all 21 cubes without ever touching the cap; the Abyss blocks sit on the siege nights; Tuesday is the safety net for everything weekly.',
          },
        },
        {
          type: 'table',
          grid: true,
          caption: { de: 'Wochenplan (Mittwoch = Reset-Tag)', en: 'Week plan (Wednesday = reset day)' },
          head: [{ de: 'Aufgabe', en: 'Task' }, { de: 'Mi', en: 'Wed' }, { de: 'Do', en: 'Thu' }, { de: 'Fr', en: 'Fri' }, { de: 'Sa', en: 'Sat' }, { de: 'So', en: 'Sun' }, { de: 'Mo', en: 'Mon' }, { de: 'Di', en: 'Tue' }],
          rows: [
            [{ de: 'Duty Missions ×5 (Main)', en: 'Duty Missions ×5 (main)' }, '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Daily Dungeon ×2 (Main)', en: 'Daily Dungeon ×2 (main)' }, '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Nightmare ×2 (alle)', en: 'Nightmare ×2 (all)' }, '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Shugo-Schlüssel · Invasion', en: 'Shugo keys · Invasion' }, '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Odyle-Würfel-Session (alle)', en: 'Odyle cube session (all)' }, '', '', '', '●', '', '', '●'],
            [{ de: 'Morph + Wind-Breeze-Odyle', en: 'Morph + Wind Breeze Odyle' }, '●', '', '', '', '', '', ''],
            ['Command Scrolls', '●', '', '', '', '', '', ''],
            [{ de: 'Ascension Trial ×3 (alle ab 1.000)', en: 'Ascension Trial ×3 (all 1,000+)' }, '', '●', '', '', '', '', ''],
            [{ de: 'Abyss-Zeit + Corridor (Belagerung)', en: 'Abyss time + Corridor (siege)' }, '', '●', '', '●', '', '●', ''],
            ['Arena · Battlefield ×3', '', '', '●', '', '●', '', ''],
            ['Supply Requests', '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Dienstag-Aufräumen', en: 'Tuesday clean-up' }, '', '', '', '', '', '', '●'],
          ],
        },
        {
          type: 'stats',
          items: [
            { value: '2', label: { de: 'Odyle-Sessions pro Woche', en: 'Odyle sessions per week' }, note: { de: '480 + 360 = 840 Odyle', en: '480 + 360 = 840 Odyle' }, tone: 'gold' },
            { value: '21', label: { de: 'Würfel pro Charakter', en: 'cubes per character' }, tone: 'gold' },
            { value: num('7 h'), label: { de: 'Abyss-Zeit pro Ebene', en: 'Abyss time per layer' }, note: { de: 'Membership: 14 in Lower und Middle', en: 'Membership: 14 in Lower and Middle' }, tone: 'violet' },
            { value: { de: 'Di', en: 'Tue' }, label: { de: 'Aufräumen vor dem Reset', en: 'clean-up before the reset' }, tone: 'teal' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Wenig Zeit? Der 15-Minuten-Tag', en: 'Short on time? The 15-minute day' },
          text: {
            de: 'Duty Missions auf dem Main → Shugo-Schlüssel abholen → Supply Requests. Nightmare, Daily Dungeon und Invasion-Schlüssel lassen sich ansparen und später in der Woche nachholen. Odyle nur am Samstag und Dienstag.',
            en: 'Duty Missions on the main → claim Shugo keys → Supply Requests. Nightmare, Daily Dungeon and Invasion keys bank, so they can be caught up later in the week. Odyle only on Saturday and Tuesday.',
          },
        },
      ],
    },
    {
      title: { de: 'Tägliche Checkliste', en: 'Daily checklist' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Sortiert nach Fortschritt. **Main** = nur der Main (serverweites Limit), **alle** = jeder Charakter. Deine Haken bleiben in diesem Browser gespeichert.',
            en: 'Sorted by progress. **Main** = main only (server-wide limit), **all** = every character. Your ticks stay saved in this browser.',
          },
        },
        {
          type: 'checklist',
          items: [
            { de: '**Odyle-Energie in Würfel stecken** (alle · Pflicht · Kina) – +15 alle 3 Std. = 120 pro Tag, Grenze 560 (Membership 840). 40 pro Abholung (Membership: 80 = 2 Abholungen aus einem Würfel). Gratis spätestens alle 4 Tage ausgeben.', en: '**Spend Odyle Energy on cubes** (all · must · Kina) – +15 every 3 h = 120/day, cap 560 (Membership 840). 40 per claim (Membership: 80 = 2 claims from one cube). Free, spend every ≤4 days.' },
            { de: '**Duty Missions ×5** (Main · Pflicht · Kina, iLv) – pro Server geteilt, auf Twinks verschwendet. Je ≥50.000 gebundenes Kina und 1.000 AP.', en: '**Duty Missions ×5** (main · must · Kina, iLv) – shared per server, wasted on alts. ≥50,000 bound Kina and 1,000 AP each.' },
            { de: '**Daily Dungeon ×2** (Main · Pflicht · iLv) – Wochentopf von 14 pro Server. Hauptbelohnung: Enhance Stones.', en: '**Daily Dungeon ×2** (main · must · iLv) – weekly pool of 14 per server. Main reward: Enhance Stones.' },
            { de: '**Nightmare ×2** (alle ab 45 · Pflicht · iLv, CP) – Phantasmal Fragments für den Shop (35 Stigma Shards zu je 1.500). Lässt sich bis 14 ansparen.', en: '**Nightmare ×2** (all 45+ · must · iLv, CP) – Phantasmal Fragments for the shop (35 Stigma Shards at 1,500 each). Banks up to 14.' },
            { de: '**Supply Requests** (alle · hoch · AP, iLv) – AP ohne Obergrenze + Enhance Stones (z. B. 5 Silentium → 980 AP + 250 Steine).', en: '**Supply Requests** (all · high · AP, iLv) – uncapped AP + Enhance Stones (e.g. 5 Silentium → 980 AP + 250 stones).' },
            { de: '**Shugo-Festival-Schlüssel** (Server · hoch · Kina) – +3 pro Tag, Grenze 12 (21 mit Membership).', en: '**Shugo Festival keys** (server · high · Kina) – +3/day, cap 12 (21 with Membership).' },
            { de: '**Dimensional Invasion** (Main · hoch · Kina, iLv) – 1 Belohnungs-Schlüssel pro Tag, bis 7 ansparbar.', en: '**Dimensional Invasion** (main · high · Kina, iLv) – 1 reward key per day, banks up to 7.' },
            { de: '**Attendance-Belohnungen** (Account · schnell · Kina) – einloggen und abholen.', en: '**Attendance rewards** (account · quick · Kina) – log in and claim.' },
            { de: '**Spacetime Rifts** (beliebig · optional · AP) – Portale alle 3 Std., AP auch nach deiner Wochengrenze.', en: '**Spacetime Rifts** (any · optional · AP) – portals every 3 h, AP even after your weekly cap.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Main oder Twink?', en: 'Main vs alts' },
          text: {
            de: 'Duties, Daily Dungeon, Shugo- und Invasion-Schlüssel sind pro Server geteilt – immer auf dem Main. Odyle, Nightmare, Supply Requests, Ascension und Subjugation zählen pro Charakter – auf jedem Charakter machen.',
            en: 'Duties, Daily Dungeon, Shugo and Invasion keys are shared per server – always on the main. Odyle, Nightmare, Supply Requests, Ascension and Subjugation count per character – do them on every character.',
          },
        },
      ],
    },
    {
      title: { de: 'Wöchentliche Checkliste', en: 'Weekly checklist' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Vor dem Reset am Mittwoch (16:00 Serverzeit). Wochenzähler laufen nur bis zu ihrer Auffüllmenge voll – was beim Reset übrig ist, ist weg.',
            en: 'Before the Wednesday reset (16:00 server time). Weekly counters cap at their refill amount – anything unused at reset is gone.',
          },
        },
        {
          type: 'checklist',
          items: [
            { de: '**Ascension Trial ×3** (alle ab iLv 1.000 · Pflicht · iLv, CP) – solo, drei Räume + Boss. Schwierigkeit nach Gegenstandsstufe.', en: '**Ascension Trial ×3** (all from iLv 1,000 · must · iLv, CP) – solo, three rooms + boss. Difficulty by item level.' },
            { de: '**Sanctuary-Raid-Versuche** (alle berechtigten · Pflicht · iLv, CP) – 4 pro Raid und Woche; der Ludra-Raid ist auf Global gerade entfernt.', en: '**Sanctuary raid attempts** (all eligible · must · iLv, CP) – 4 per raid and week; the Ludra raid is currently removed on Global.' },
            { de: '**Substance Morph + Wind-Breeze-Odyle** (alle · Pflicht · Kina) – je 4 pro Charakter (je 16 pro Server) = bis zu 8 zusätzliche Abholungen. Der Laden braucht Membership.', en: '**Substance Morph + Wind Breeze Odyle** (all · must · Kina) – 4 each per character (16 each per server) = up to 8 extra claims. The shop needs Membership.' },
            { de: '**Season Missions** (alle · hoch · Kina) – je 40 Odyle bei 4.500, 6.000 und 8.000 Punkten: drei Abholungen extra.', en: '**Season Missions** (all · high · Kina) – 40 Odyle each at 4,500, 6,000 and 8,000 points: three extra claims.' },
            { de: '**Abyss-Zeit + Corridor** (Main, Twinks ab 1.000 · Pflicht · AP) – 7 Std. pro Ebene (Membership 14 in Lower und Middle). Corridor: 10–30K AP in 5 Min.', en: '**Abyss time + Corridor** (main, alts 1,000+ · must · AP) – 7 h per layer (Membership 14 in Lower and Middle). Corridor: 10–30K AP in 5 min.' },
            { de: '**Command Scrolls (Hauptstadt + Abyss)** (Main · hoch · AP, iLv) – 12 aus der Hauptstadt pro Woche: Quest-AP und Materialien.', en: '**Command Scrolls (capital + Abyss)** (main · high · AP, iLv) – 12 capital per week: quest AP and materials.' },
            { de: '**Battlefield ×3 Siege** (alle · hoch · AP) – zählt pro Charakter.', en: '**Battlefield ×3 wins** (all · high · AP) – counted per character.' },
            { de: '**Subjugation-Tickets ×3** (alle ab 45 · hoch · iLv) – pro Charakter, verfallen beim Reset.', en: '**Subjugation tickets ×3** (all 45+ · high · iLv) – per character, expire at reset.' },
            { de: '**Abyss Corridors · Exploration** (alle · hoch · AP, iLv) – Gratis-Belohnungen, abholen. Exploration: 7 pro Dungeon.', en: '**Abyss Corridors · Exploration** (all · high · AP, iLv) – free rewards, claim them. Exploration: 7 per dungeon.' },
            { de: '**Daeva Pass** (Main · mittel · Kina, AP) – wöchentliche EXP-Grenze (50.000 im Season-1-Pass); der Abyss-Reiter gibt AP.', en: '**Daeva Pass** (main · medium · Kina, AP) – weekly EXP cap (50,000 on the Season 1 pass); the Abyss tab gives AP.' },
            { de: '**Wöchentliche Supply Requests** (alle · niedrig · AP) – z. B. bis zu 50 Silentium → 9.980 AP + 2.560 Enhance Stones.', en: '**Weekly Supply Requests** (all · low · AP) – e.g. up to 50 Silentium → 9,980 AP + 2,560 Enhance Stones.' },
            { de: '**Arena-Belohnungen · Wind Breeze Merchant** (Main · niedrig · AP, Kina) – wenn Zeit ist.', en: '**Arena rewards · Wind Breeze Merchant** (main · low · AP, Kina) – when there is time.' },
            { de: '**PvE-/PvP-Wochenquests kaufen** (Main · niedrig · AP, iLv) – lassen sich für später aufheben.', en: '**Buy PvE / PvP weekly quests** (main · low · AP, iLv) – can be stored for later.' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Dienstag-Aufräumen', en: 'Tuesday clean-up' },
          text: {
            de: 'Den Rest verbrauchen: Daily-Dungeon-Eintritte, Ascension Trials, Subjugation, Exploration, Abyss-Zeit, Daeva Pass – und die zweite Odyle-Session spielen. Diese eine Gewohnheit bringt mehr als die meisten Tipps.',
            en: 'Burn the rest: Daily Dungeon entries, Ascension Trials, Subjugation, Exploration, Abyss time, Daeva Pass – and run your second Odyle session. This habit alone is worth more than most tips.',
          },
        },
      ],
    },
    {
      title: { de: 'Säule I: Kina', en: 'Pillar I: Kina' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der Motor – jede andere Säule wird damit gekauft. Das meiste Kina kommt aus **Odyle-Energie-Würfeln** in Conquest und Transcendence: Nach einem Lauf steckst du 40 Odyle in den Würfel am Ende und holst die Belohnung ab. Jeder Charakter regeneriert 840 Odyle pro Woche = **21 Abholungen**. Conquest und Transcendence zahlen **handelbares** Kina; Duties und Verkäufe an NPCs zahlen gebundenes (bleibt auf dem Charakter). Töte alle drei Bosse – jeder erhöht den Würfel.',
            en: 'The engine – every other pillar is bought with it. Most Kina comes from **Odyle Energy cubes** in Conquest and Transcendence: after a run you put 40 Odyle into the cube at the end and claim the reward. Every character regenerates 840 Odyle per week = **21 claims**. Conquest and Transcendence pay **tradeable** Kina; Duties and NPC sales pay bound Kina (it stays on the character). Kill all three bosses – each one raises the cube.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kina pro Abholung (40 Odyle)', en: 'Kina per claim (40 Odyle)' },
          caption: {
            de: 'Raid Relay, globaler Client, 16.10.2026; Laufzeit nur im Dungeon, vom Autor gestoppt oder geschätzt (≈). Mal 21 ergibt das Kina pro Woche und Charakter: 4,2 Mio. (1★) bis ≈10 Mio. (Transcendence 4). Blau: Conquest, violett: Transcendence.',
            en: 'Raid Relay, global client, 16 Oct 2026; run time inside the dungeon only, timed by the author or estimated (≈). Times 21 gives the Kina per week and character: 4.2M (1★) to ≈10M (Transcendence 4). Blue: Conquest, violet: Transcendence.',
          },
          items: CLAIMS.map((c) => ({
            label: c.label,
            value: c.kina,
            display: `${c.kina}K`,
            note: num(`iLv ${c.ilv} · ${c.time} min`),
            tone: c.transcendence ? 'violet' : 'blue',
          })),
        },
        {
          type: 'text',
          text: {
            de: 'Der Server zählt die Läufe **aller deiner Charaktere zusammen** (Mittwoch 16:00 bis Mittwoch). Bis zu einer Grenze gibt es volles Kina, danach weniger – Conquest und Transcendence haben getrennte Zähler:',
            en: 'The server counts the runs of **all your characters together** (Wednesday 16:00 to Wednesday). Up to a limit you get full Kina, after that less – Conquest and Transcendence have separate counters:',
          },
        },
        {
          type: 'table',
          caption: { de: 'Läufe pro Woche und Server (alle Charaktere)', en: 'Runs per week per server (all characters)' },
          head: [{ de: 'Kina', en: 'Kina paid' }, 'Conquest', 'Transcendence'],
          rows: [
            [{ de: '100 %', en: '100%' }, { de: 'Lauf 1–84', en: 'runs 1–84' }, { de: 'Lauf 1–56', en: 'runs 1–56' }],
            [{ de: '80 %', en: '80%' }, '85–105', '57–70'],
            [{ de: '60 %', en: '60%' }, '106–126', '71–84'],
            [{ de: '40 %', en: '40%' }, '127–147', '85–98'],
            [{ de: '20 %', en: '20%' }, '148+', '99+'],
          ],
          grid: true,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Der Membership-Trick', en: 'Membership trick' },
          text: {
            de: 'Mitglieder geben 80 Odyle für einen Würfel aus und holen ihn zweimal ab. Gleiches Kina pro Odyle – aber halb so viele Läufe, halb so viel Zeit, und der Server zählt Läufe, nicht Abholungen. Darum passen mit Membership 8 Charaktere in die 84 vollen Conquest-Läufe, gratis nur 4.',
            en: 'Members spend 80 Odyle on one cube and claim it twice. Same Kina per Odyle – but half the runs, half the time, and the server counts runs, not claims. That is why 8 characters fit into the 84 full Conquest runs with Membership, only 4 free.',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Offene Würfel abholen:** Wer einen geschafften Dungeon verlässt, ohne abzuholen, verbraucht einen der **10 offenen Würfel pro Server und Woche**. Sind sie weg, kommt bis zum Reset niemand vom Server mehr in Conquest oder Transcendence.', en: '**Claim every cube:** leaving a cleared dungeon without claiming uses one of the **10 unclaimed cubes per server and week**. Once they are gone nobody on the server enters Conquest or Transcendence until the reset.' },
            { de: '**Pro Charakter füllt sich Conquest alle 8 Std. um eine Belohnung auf (bis 21), Transcendence alle 12 Std. (bis 14).** Ein Charakter ab 2.500 holt also höchstens 14-mal Transcendence 4 und den Rest in Conquest.', en: '**Per character, Conquest refills one reward every 8 h (up to 21), Transcendence every 12 h (up to 14).** So a character at 2,500+ claims Transcendence 4 at most 14 times and the rest in Conquest.' },
            { de: '**Läufe über der Grenze nach Transcendence schicken** – der Zähler ist getrennt. Odyle kaufen lohnt nur, solange eine Abholung mehr zahlt als der Kauf (100.000 Kina pro 40 Odyle).', en: '**Send runs past the limit to Transcendence** – the counter is separate. Buying Odyle only pays while a claim pays more than the purchase (100,000 Kina per 40 Odyle).' },
          ],
        },
        { type: 'heading', text: { de: 'Wann du Odyle ausgibst', en: 'When to spend Odyle' } },
        {
          type: 'text',
          text: {
            de: '**Ansparen ja, voll laufen lassen nie.** Kina pro Würfel ist heute dasselbe wie in drei Tagen. Verloren geht nur Energie über der Grenze: **5 Odyle pro Stunde = eine Abholung alle 8 Stunden.**',
            en: '**Bank it, but never let it cap.** Kina per cube is the same today or in three days. Only energy above the cap is lost: **5 Odyle per hour = one claim every 8 hours.**',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Auffüllen', en: 'Refill' }, value: { de: '+15 alle 3 Std. = 120 pro Tag, auch offline', en: '+15 every 3 h = 120 per day, offline too' } },
            { label: { de: 'Grenze', en: 'Cap' }, value: { de: '560 – voll nach 4 Tagen 16 Std. · Membership 840 – voll nach 7 Tagen', en: '560 – full after 4 days 16 h · Membership 840 – full after 7 days' } },
            { label: { de: 'Idealpunkt', en: 'Sweet spot' }, value: { de: 'bei ≈480 spielen (4 Tage, 12 Abholungen)', en: 'play at ≈480 (4 days, 12 claims)' } },
            { label: { de: 'Extras', en: 'Extras' }, value: { de: '4 Morphs + 4 Wind-Breeze-Käufe (Membership) + 3 aus den Season Missions = bis zu 11 Abholungen mehr', en: '4 Morphs + 4 Wind Breeze buys (Membership) + 3 from Season Missions = up to 11 more claims' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Zwei Sessions pro Woche**, z. B. Samstag- und Dienstagabend: 480 + 360 = 840 Odyle = alle 21 Abholungen.', en: '**Two sessions per week**, e.g. Saturday + Tuesday evening: 480 + 360 = 840 Odyle = all 21 claims.' },
            { de: '**Bei etwa 480 spielen**, nicht bei 560 – ein verspätetes Einloggen, und die Energie ist verschwendet.', en: '**Play at about 480**, not at 560 – one late login and you waste energy.' },
            { de: '**Vor einem Meilenstein ansparen:** Kurz vor Gegenstandsstufe 1.400? Odyle für Conquest 2★ aufheben (+50 % pro Abholung).', en: '**Bank before a milestone:** about to hit item level 1,400? Save Odyle for Conquest 2★ (+50% per claim).' },
          ],
        },
        { type: 'heading', text: { de: 'Solo oder mit Twinks', en: 'Solo or with alts' } },
        {
          type: 'table',
          head: ['', { de: 'Solo (1 Charakter)', en: 'Solo (1 character)' }, { de: 'Mit Twinks (gleicher Server + Fraktion)', en: 'With alts (same server + faction)' }],
          rows: [
            [{ de: 'Kina pro Woche', en: 'Kina / week' }, { de: '≈6,3 Mio. aus Würfeln (Conquest 2★); ≈10–11 Mio. mit allen Quellen', en: '≈6.3M from cubes (Conquest 2★); ≈10–11M with all sources' }, { de: '+4,2 Mio. (1★) bis +8,4 Mio. (3★) pro Twink', en: '+4.2M (1★) to +8.4M (3★) per alt' }],
            [{ de: 'Wichtigster Schritt', en: 'Key move' }, { de: 'Gegenstandsstufe 1.400 erreichen – Conquest 2★ zahlt 1,5× so viel wie 1★', en: 'Reach item level 1,400 – Conquest 2★ pays 1.5× as much as 1★' }, { de: 'Einen Twink nach dem anderen auf 700, dann 1.400 bringen', en: 'Push one alt at a time to 700, then 1,400' }],
            [{ de: 'Odyle-Extras', en: 'Odyle extras' }, { de: '4 Morphs + 4 Wind-Breeze-Käufe (Membership) + 3 Season-Belohnungen', en: '4 Morphs + 4 Wind Breeze buys (Membership) + 3 Season rewards' }, { de: 'Je Charakter dasselbe, Morph und Laden höchstens 16 pro Server', en: 'The same per character, Morph and shop at most 16 per server' }],
            [{ de: 'Kina-Fluss', en: 'Kina flow' }, { de: 'Gratis: gesammeltes Odyle morphen. Membership: Odyle und Materialien am Market verkaufen (2 % Gebühr + 10 % Steuer)', en: 'Free: morph gathered Odyle. Membership: sell Odyle and materials on the Market (2% fee + 10% tax)' }, { de: 'Handelbares Kina über das Server Storage zum Main; gebundenes über Ausrüstung, die der Twink verzaubert', en: 'Tradeable Kina to the main via Server Storage; bound Kina via gear the alt enhances' }],
            ['Membership', { de: 'Market + Exchange, 2 Abholungen pro Würfel, Odyle-Grenze 840', en: 'Market + Exchange, 2 claims per cube, Odyle cap 840' }, { de: 'Gilt für jeden Charakter des Accounts', en: 'Covers every character of the account' }],
          ],
        },
        {
          type: 'text',
          text: {
            de: '**Wie viele Twinks farmen mit vollem Kina?** Gratis macht jeder Charakter 21 Conquest-Läufe – nach 4 Charakteren sind die 84 vollen Läufe erreicht. Mit Membership sind es ≈11 Läufe (80 Odyle = 2 Abholungen), so passen alle 8 hinein.',
            en: '**How many alts can farm at full Kina?** Free, every character runs Conquest 21 times – the 84 full runs are reached after 4 characters. With Membership it is ≈11 runs (80 Odyle = 2 claims), so all 8 fit.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Was Twinks machen – und was sie auslassen', en: 'What alts do – and what they skip' },
          head: [{ de: 'Auf jedem Twink', en: 'Do on every alt' }, { de: 'Nur auf dem Main (pro Server geteilt)', en: 'Main only (shared per server)' }],
          rows: [
            [{ de: 'Odyle-Würfel · 4 Morphs + 4 Wind-Breeze-Odyle', en: 'Odyle cubes · 4 Morphs + 4 Wind Breeze Odyle' }, { de: 'Duty Missions ×5 pro Tag', en: 'Duty Missions ×5 per day' }],
            [{ de: 'Nightmare ×2 pro Tag · Supply Requests', en: 'Nightmare ×2 per day · Supply Requests' }, { de: 'Daily Dungeon (14 pro Woche)', en: 'Daily Dungeon (14 per week)' }],
            [{ de: 'Ascension Trial ×3 (ab 1.000) · Battlefield ×3 · Subjugation ×3', en: 'Ascension Trial ×3 (from 1,000) · Battlefield ×3 · Subjugation ×3' }, { de: 'Command Scrolls der Hauptstadt · Shugo- und Invasion-Schlüssel', en: 'Capital Command Scrolls · Shugo and Invasion keys' }],
            [{ de: 'Abyss Corridors · eigene AP für die eigenen Stigmen', en: 'Abyss Corridors · own AP for own Stigmas' }, { de: 'Daeva Pass (wird pro Charakter verkauft)', en: 'Daeva Pass (sold per character)' }],
          ],
        },
        { type: 'heading', text: { de: 'Alle 8 Charaktere spielen', en: 'Running all 8 characters' } },
        {
          type: 'text',
          text: {
            de: 'Jeder Server hat 4 Charakter-Plätze, erweiterbar auf 8. Die Plätze 5–8 kosten Quna (ein Guide zum Server-Wechsel nennt 1.000 Quna pro Platz) – Membership gibt sie nicht. So wächst das Kina mit jedem Charakter:',
            en: 'Each server has 4 character slots, expandable to 8. Slots 5–8 cost Quna (a server-transfer guide names 1,000 Quna per slot) – Membership does not give them. This is how Kina grows with every character:',
          },
        },
        {
          type: 'line',
          title: { de: 'Kina pro Woche nach Zahl der Charaktere', en: 'Kina per week by number of characters' },
          caption: {
            de: 'Modell: nur Conquest 2★ (300.000 Kina pro Abholung, Raid Relay), 21 Abholungen pro Charakter und Woche, gratis eine Abholung pro Lauf und ab Lauf 85 auf dem Server 80 → 60 → 40 → 20 %, mit Membership zwei pro Lauf. Wer Läufe über der Grenze nach Transcendence schickt (ab 1.600), verliert gratis weniger.',
            en: 'Model: Conquest 2★ only (300,000 Kina per claim, Raid Relay), 21 claims per character and week, free one claim per run and from the server’s 85th run 80 → 60 → 40 → 20%, with Membership two per run. Sending runs past the limit to Transcendence (from 1,600) loses less when free.',
          },
          x: { label: { de: 'Charaktere auf dem Server', en: 'characters on the server' }, ticks: CHARS.map(String) },
          y: { label: { de: 'Kina pro Woche', en: 'Kina per week' }, unit: 'M', min: 0 },
          series: [
            { label: both('Membership'), values: CHARS.map((c) => Math.round(c * 6.3 * 10) / 10), tone: 'gold' },
            { label: { de: 'Gratis', en: 'Free' }, values: CHARS.map(freeKina), tone: 'slate' },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Gratis lohnen die Charaktere 5–8 kaum:** Twink 4 bringt noch 80 % (≈5 Mio.), Twink 7 nur 20 % (≈1,3 Mio.) – zusammen ≈37,8 Mio. statt ≈50 Mio. mit Membership.', en: '**Free, characters 5–8 barely pay:** alt 4 still brings 80% (≈5M), alt 7 only 20% (≈1.3M) – ≈37.8M together instead of ≈50M with Membership.' },
            { de: 'Belohnungen pro Charakter (Nightmare, Ascension, Battlefield, Corridors, Morphs, AP) bekommst du 8-mal.', en: 'Per-character rewards (Nightmare, Ascension, Battlefield, Corridors, Morphs, AP) are collected 8 times.' },
            { de: 'Serverweite Inhalte (Duties, Daily Dungeon, Shugo-Schlüssel) und die Grenzen von Morph und Wind-Breeze-Laden (je 16) wachsen nicht mit.', en: 'Server-wide content (Duties, Daily Dungeon, Shugo keys) and the Morph and Wind Breeze limits (16 each) do not grow.' },
            { de: 'Transcendence hat einen eigenen Zähler von 56 vollen Läufen – heb ihn für den Main und die stärksten Twinks auf.', en: 'Transcendence has its own counter of 56 full runs – keep it for the main and strongest alts.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Säule II: Gegenstandsstufe', en: 'Pillar II: Item level' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Summe deines Charakters aus Ausrüstung, Verzauberung und Arcana. Die Gegenstandsstufe schaltet Inhalte frei und treibt die Kampfkraft. Plane deine Verbesserungen um diese Meilensteine:',
            en: 'Your character total of gear, enhancement and Arcana. Item level unlocks content and drives Combat Power. Plan your upgrades around these milestones:',
          },
        },
        {
          type: 'flow',
          title: { de: 'Was du in welcher Reihenfolge brauchst', en: 'What you need, in order' },
          caption: {
            de: 'Freischaltungen aus der Dungeon-Liste von metabot.gg (Client-Daten, 15.10.2026), Kina pro Abholung von Raid Relay (16.10.2026). Gold: die Schritte, die das Kina am stärksten erhöhen.',
            en: 'Unlocks from metabot.gg’s dungeon list (client data, 15 Oct 2026), Kina per claim from Raid Relay (16 Oct 2026). Gold: the steps that raise Kina the most.',
          },
          items: [
            { title: { de: 'iLv 700', en: 'iLv 700' }, text: { de: 'Conquest 1★ (Krao Cave, Draupnir): 200.000 Kina pro Abholung, Ausrüstung der Stufe 54.', en: 'Conquest 1★ (Krao Cave, Draupnir): 200,000 Kina per claim, level-54 gear.' }, tag: 'Kina', tone: 'blue' },
            { title: num('iLv 1,000'), text: { de: 'Abyss-Basen in Lower Reshanta (AP) und das Ascension Trial.', en: 'Abyss bases in Lower Reshanta (AP) and the Ascension Trial.' }, tag: 'AP · iLv', tone: 'teal' },
            { title: num('iLv 1,400'), text: { de: 'Conquest 2★ (Urugugu Canyon, Vakron Sky Island): 300.000 pro Abholung, +50 %.', en: 'Conquest 2★ (Urugugu Canyon, Vakron Sky Island): 300,000 per claim, +50%.' }, tag: 'Kina', tone: 'gold' },
            { title: num('iLv 1,600'), text: { de: 'Transcendence: Arcana, 300.000 pro Abholung und ein eigener Lauf-Zähler.', en: 'Transcendence: Arcana, 300,000 per claim and a run counter of its own.' }, tag: 'iLv · Kina', tone: 'violet' },
            { title: num('iLv 2,100'), text: { de: 'Conquest 3★ (Fire Temple, Ferocious Horn Den): 400.000 pro Abholung, Ausrüstung der Stufe 86.', en: 'Conquest 3★ (Fire Temple, Ferocious Horn Den): 400,000 per claim, level-86 gear.' }, tag: 'Kina · iLv', tone: 'blue' },
            { title: num('iLv 2,500'), text: { de: 'Transcendence Stufe 4: 480.000 pro Abholung – die beste Auszahlung im Spiel.', en: 'Transcendence stage 4: 480,000 per claim – the best payout in the game.' }, tag: 'Kina', tone: 'gold' },
            { title: num('iLv 2,800'), text: { de: 'Sanctuary-Raid Ludra – auf Global entfernt, bis er überarbeitet zurückkommt.', en: 'Sanctuary raid Ludra – removed on Global until it returns reworked.' }, tag: 'Raid', tone: 'slate' },
          ],
        },
        { type: 'heading', text: { de: 'Kina für Gegenstandsstufe ausgeben – in dieser Reihenfolge', en: 'How to spend Kina for item level – in this order' } },
        {
          type: 'table',
          head: [{ de: 'Schritt', en: 'Step' }, { de: 'Verbesserung', en: 'Upgrade' }, { de: 'Warum', en: 'Why' }, { de: 'Bringt', en: 'Feeds' }],
          rows: [
            ['1', { de: 'Den Platz mit der niedrigsten Gegenstandsstufe ersetzen', en: 'Replace your lowest item level slot' }, { de: 'Ein großer Sprung am schwächsten Platz schlägt das Polieren des besten.', en: 'A big jump on the weakest slot beats polishing the best one.' }, 'iLv · CP'],
            ['2', { de: 'Epic-/Unique-Ausrüstung auf +10 verzaubern', en: 'Enhance Epic/Unique gear to +10' }, { de: 'Bis +10 gelingt es immer – kostet nur Kina und Enhance Stones (Stufe 102: ≈0,92 Mio. pro Teil).', en: 'Always succeeds up to +10 – only Kina and Enhance Stones (level 102: ≈0.92M per piece).' }, 'iLv · CP'],
            ['3', { de: 'Jeden Arcana-Platz füllen', en: 'Fill every Arcana slot' }, { de: 'Arcana zählen zur Gegenstandsstufe (Unique: 80 pro Karte).', en: 'Arcana count toward item level (Unique: 80 per card).' }, 'iLv · CP'],
            ['4', { de: 'Zum nächsten Meilenstein', en: 'Push to the next milestone' }, { de: '1.000 öffnet den Abyss, 1.400, 1.600, 2.100 und 2.500 erhöhen das Kina pro Abholung.', en: '1,000 opens the Abyss, 1,400, 1,600, 2,100 and 2,500 raise the Kina per claim.' }, 'iLv · CP · Kina · AP'],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Schwächster Platz zuerst** – schau in dein Ausrüstungsfenster und hol dir den günstigsten großen Sprung (Drop, Handwerk oder mit Membership vom Market).', en: '**Weakest slot first** – check your gear window and get the cheapest big jump (drop, crafting or, with Membership, the Market).' },
            { de: '**Keinen Platz überverzaubern, den du bald ersetzt.** Sicheres +10 reicht, bis der Platz fertig ist – nur Handwerks-Upgrades nehmen die Verzauberung mit.', en: '**Do not over-enhance a slot you will replace soon.** Safe +10 is enough until the slot is final – only crafting upgrades carry the enhancement over.' },
            { de: '**Meilensteine timen:** Odyle kurz vor 1.400 ansparen, damit schon die erste große Session Conquest 2★ zahlt.', en: '**Time your milestones:** bank Odyle just before 1,400 so the first big session already pays Conquest 2★.' },
            { de: '**Twinks:** zuerst 700 (Conquest), dann 1.000 (Abyss-AP, Ascension), dann 1.400 (Conquest 2★).', en: '**Alts:** 700 first (Conquest), then 1,000 (Abyss AP, Ascension), then 1,400 (Conquest 2★).' },
          ],
        },
        { type: 'heading', text: { de: 'Checkliste Gegenstandsstufe (jede Woche)', en: 'Item level checklist (every week)' } },
        {
          type: 'checklist',
          items: [
            { de: 'Schwächsten Platz gefunden – Verbesserung mit dem Kina dieser Woche gekauft oder geplant', en: "Weakest slot identified – upgrade bought or planned with this week's Kina" },
            { de: 'Jedes Epic-/Unique-Teil auf dem sicheren +10', en: 'Every Epic/Unique piece at the safe +10' },
            { de: 'Alle Arcana-Plätze gefüllt', en: 'All Arcana slots filled' },
            { de: 'Odyle angespart, wenn der nächste Meilenstein (1.000 / 1.400 / 1.600 / 2.100) nah ist', en: 'Odyle banked if the next milestone (1,000 / 1,400 / 1,600 / 2,100) is close' },
            { de: 'Jeden Twink mit seinem nächsten Meilenstein verglichen (700 → 1.000 → 1.400)', en: 'Each alt checked against its next milestone (700 → 1,000 → 1,400)' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/power-sprint', label: { de: 'Power-Sprint: der schnellste Weg', en: 'Power sprint: the fastest path' } },
            { href: '#/guides/crafting-gear', label: { de: 'Handwerks-Ausrüstung', en: 'Crafted gear' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Säule III: Kampfkraft', en: 'Pillar III: Combat Power' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der Stärkewert des Spiels – auf den alle schauen. Bis etwa Gegenstandsstufe 2.000 bringt ein Punkt **≈45 Kampfkraft**; danach wird es mehr, weil Stigmen, Daevanion-Knoten, Titel und hohe Verzauberung dazukommen – um Platz 10.000 sind es ≈54 (143K bei ≈2.655), bei den Top 80 ≈69 (Median pro Spieler, Spanne 63–77). Die Klasse spielt bei normalen Spielern kaum eine Rolle: Anfang Oktober lagen alle Klassen im Median innerhalb von ≈2.500 CP.',
            en: "The game's strength score – what everyone looks at. Up to about item level 2,000 one point comes with **≈45 Combat Power**; past that it becomes more, because stigmas, Daevanion nodes, titles and high enhancement join in – around rank 10,000 it is ≈54 (143K at ≈2,655), for the top 80 ≈69 (median per player, range 63–77). Class barely matters for ordinary players: in early October all classes sat within ≈2,500 CP at the median.",
          },
        },
        {
          type: 'line',
          title: { de: 'Kampfkraft nach Gegenstandsstufe (Median)', en: 'Combat Power by item level (median)' },
          caption: {
            de: 'metabot.gg, ≈13.000 Profile auf Stufe 45, gelesen bis 8.10.2026. Jeder Punkt ist der Median einer Spanne ab dieser Stufe (1.300–1.499 und 1.500–1.999 sind breiter). Zum Vergleich am 18./19.10.: Platz 10.000 hatte 143K bei iLv ≈2.655, die Top 80 225K bei 3.352.',
            en: 'metabot.gg, ≈13,000 level-45 profiles, read up to 8 Oct 2026. Every point is the median of a bracket starting at that level (1,300–1,499 and 1,500–1,999 are wider). For comparison on 18/19 Oct: rank 10,000 had 143K at iLv ≈2,655, the top 80 225K at 3,352.',
          },
          x: { label: { de: 'Gegenstandsstufe (ab)', en: 'item level (from)' }, ticks: [{ de: '<1.000', en: '<1,000' }, num('1,000'), num('1,100'), num('1,200'), num('1,300'), num('1,500'), num('2,000+')] },
          y: { label: { de: 'Kampfkraft', en: 'Combat Power' }, min: 0 },
          series: [{ label: { de: 'Median-Kampfkraft', en: 'median Combat Power' }, values: [40547, 49881, 56248, 61098, 66459, 77807, 100769], tone: 'teal' }],
        },
        { type: 'heading', text: { de: 'Der Weg zu mehr Kampfkraft', en: 'The upgrade path' } },
        {
          type: 'table',
          head: [{ de: 'Schritt', en: 'Step' }, { de: 'Verbesserung', en: 'Upgrade' }, { de: 'Warum / Tipp', en: 'Why / tip' }],
          rows: [
            ['1–3', { de: 'Schwächster Platz · sicheres +10 · Arcana', en: 'Weakest slot · safe +10 · Arcana' }, { de: 'Die größten Sprünge bei der Gegenstandsstufe (Säule II).', en: 'The biggest item level gains (Pillar II).' }],
            ['4', { de: 'Stigmen Richtung Stufe 20', en: 'Stigmas towards level 20' }, { de: '≈100 CP pro Stigma Shard; alle Stigmen sind ≈ein Fünftel eines entwickelten Charakters.', en: '≈100 CP per Stigma Shard; all stigmas are ≈a fifth of a developed character.' }],
            ['5', { de: 'Daevanion-Knoten öffnen', en: 'Open Daevanion nodes' }, { de: 'Das obere Fünftel hat ≈2,6× so viele Knoten wie das untere. Den Weg vorher planen.', en: 'The top fifth has ≈2.6× the nodes of the bottom fifth. Plan the path first.' }],
            ['6', { de: 'Titel und Flügel sammeln', en: 'Collect titles and wings' }, { de: 'Der Sammel-Bonus gilt dauerhaft – auch nicht ausgerüstet.', en: 'The collection bonus is permanent – even unequipped.' }],
            ['7', { de: 'Amplified Enhancement (über +15)', en: 'Amplified Enhancement (past +15)' }, { de: 'Zuletzt: ≈26 Mio. Kina pro Teil. Unter ≈90K CP macht es niemand.', en: 'Last: ≈26M Kina per piece. Nobody below ≈90K CP does it.' }],
          ],
        },
        {
          type: 'links',
          items: [{ href: '#/daevanion', label: { de: 'Daevanion-Weg im Planer planen', en: 'Plan your Daevanion path in the planner' } }],
        },
        { type: 'heading', text: { de: 'Wo stehst du?', en: 'Where do you stand?' } },
        {
          type: 'text',
          text: {
            de: 'Die Rangliste wächst schnell: Am 19.10. brauchte Platz 10.000 von über 2 Millionen Charakteren 143K Kampfkraft, Platz 1.000 176K. Die Rang-Grenzen, Kosten jeder Verzauberungs-Stufe und was die Top 10 jeder Klasse tragen, stehen im Guide **Höchste Kampfkraft**.',
            en: 'The ranking grows fast: on 19 Oct rank 10,000 of over 2 million characters took 143K Combat Power, rank 1,000 176K. The rank cut-offs, the cost of every enhancement step and what the top 10 of each class wear are in the **Highest Combat Power** guide.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Was Charaktere jeder Kampfkraft-Stufe haben (metabot.gg, 3.017 Charaktere, Anfang Oktober – „110K+“ war damals die Spitze; am 18.10. lag der Median der Top 80 bei 225K)', en: 'What characters of each Combat Power band have (metabot.gg, 3,017 characters, early October – “110K+” was the top then; on 18 Oct the top 80 median was 225K)' },
          head: [{ de: 'Kampfkraft', en: 'Combat Power band' }, { de: 'Ø Verzauberung', en: 'Avg. enhancement' }, { de: 'Arcana angelegt', en: 'Arcana equipped' }, { de: 'mit Amplified', en: 'with Amplified' }],
          rows: [
            [{ de: 'unter 60K', en: 'below 60K' }, num('+1.7'), '0', '0%'],
            ['60–70K', num('+3.6'), '0', '0%'],
            ['70–80K', num('+4.8'), num('0.6'), '0%'],
            ['80–90K', num('+6.5'), num('3.3'), '0%'],
            ['90–110K', num('+7.8'), num('4.8'), '11%'],
            ['110K+', num('+9.0'), '5', '74%'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Der schnellste Weg zu mehr Stärke', en: 'Fastest path to power' },
          text: {
            de: 'Kina mit Würfeln farmen → Verbesserung für den schwächsten Platz kaufen → sicheres +10 → Arcana → AP für Stigma Shards und Daevanion Crystals ausgeben. Wiederholen. Nie hoch verzaubern, bevor deine Ausrüstung komplett ist.',
            en: 'Farm Kina with cubes → buy the weakest slot upgrade → safe +10 → Arcana → spend AP on Stigma Shards and Daevanion Crystals. Repeat. Never gamble high enhancement before your gear is complete.',
          },
        },
        {
          type: 'links',
          items: [{ href: '#/guides/combat-power', label: { de: 'Guide „Höchste Kampfkraft“', en: 'Highest Combat Power guide' }, primary: true }],
        },
        { type: 'heading', text: { de: 'Checkliste Kampfkraft (jede Woche)', en: 'Combat Power checklist (every week)' } },
        {
          type: 'checklist',
          items: [
            { de: 'Checkliste Gegenstandsstufe erledigt (Säule II)', en: 'Item level checklist done (Pillar II)' },
            { de: 'Alle AP für Stigma Shards und Daevanion Crystals ausgegeben', en: 'All AP spent on Stigma Shards and Daevanion Crystals' },
            { de: 'Stigma Shards aus Nightmare- und Shugo-Shop geholt (je bis 35)', en: 'Stigma Shards from the Nightmare and Shugo shops taken (up to 35 each)' },
            { de: 'Neue Daevanion-Knoten entlang des geplanten Wegs geöffnet', en: 'New Daevanion nodes opened along your planned path' },
            { de: 'Neue Titel und Flügel gesammelt – der Sammel-Bonus zählt auch nicht ausgerüstet', en: 'New titles and wings collected – the collection bonus counts even unequipped' },
            { de: 'Ab ≈90K CP: Amplified Enhancement auf Ausrüstung, die schon auf +15 ist', en: 'Above ≈90K CP: Amplified Enhancement on gear already at +15' },
          ],
        },
      ],
    },
    {
      title: { de: 'Säule IV: Abyss-Punkte', en: 'Pillar IV: Abyss Points' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die zweite Währung – für Stigmen, Daevanion und Potential. AP bleiben auf dem Charakter, der sie verdient: Jeder Charakter farmt und gibt seine eigenen aus. AP aus Monstern und gegnerischen Spielern im Abyss haben eine Wochengrenze (auf Global nicht veröffentlicht; Korea: 400K zusammen); AP aus Quests und Supply Requests zählen nicht hinein.',
            en: 'The second currency – Stigmas, Daevanion and Potential. AP stays on the character that earns it – every character farms and spends its own. AP from monsters and enemy players in the Abyss has a weekly cap (not published for Global; Korea: 400K together); AP from quests and Supply Requests does not count towards it.',
          },
        },
        {
          type: 'stats',
          items: [
            { value: num('3.5M'), label: { de: 'AP für die 200 Stigma Shards des Abyss-Shops', en: 'AP for the 200 Stigma Shards of the Abyss shop' }, note: { de: '50 je zu 10.000, 15.000, 20.000 und 25.000 AP', en: '50 each at 10,000, 15,000, 20,000 and 25,000 AP' }, tone: 'gold' },
            { value: '400K', label: { de: 'AP für Potential +4 auf einem Teil', en: 'AP for Potential +4 on one piece' }, note: { de: 'dazu 10 Potential Stones – PvP-Werte', en: 'plus 10 Potential Stones – PvP stats' }, tone: 'violet' },
            { value: '14K', label: { de: 'AP aus der Rift-Questreihe', en: 'AP from the Rift quest chain' }, note: { de: '7 Quests × 2.000, einmalig', en: '7 quests × 2,000, one-time' }, tone: 'teal' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Woher Abyss-Punkte kommen (pro Woche und Charakter, Schätzung)', en: 'Where Abyss Points come from (per week, per character, estimate)' },
          head: [{ de: 'Quelle', en: 'Source' }, 'AP', { de: 'Grenze', en: 'Cap' }, { de: 'Fester Wert', en: 'Fixed value' }],
          rows: [
            [{ de: 'Abyss-Monster (PvE)', en: 'Abyss monsters (PvE)' }, '100–200K', { de: 'ja', en: 'yes' }, '–'],
            ['Supply Requests', '100–190K', { de: 'keine', en: 'none' }, { de: '5 Silentium → 980 · 50 → 9.980', en: '5 Silentium → 980 · 50 → 9,980' }],
            [{ de: 'Duties und Command Scrolls', en: 'Duties and Command Scrolls' }, { de: 'je nach Anzahl', en: 'by count' }, { de: 'keine', en: 'none' }, { de: 'Duty 1.000 · Lower 1.000 · Middle 2.000', en: 'Duty 1,000 · Lower 1,000 · Middle 2,000' }],
            [{ de: 'Abyss Corridor (pro 5-Min.-Lauf)', en: 'Abyss Corridor (per 5-min run)' }, '10–30K', '–', '–'],
            [{ de: 'Arena (alle Modi)', en: 'Arena (all modes)' }, '8–24K', '–', { de: 'Tactics: 1.000 pro Match, 3.000 pro Sieg', en: 'Tactics: 1,000 per match, 3,000 per win' }],
            [{ de: 'Rift-Questreihe (einmalig)', en: 'Rift quest chain (one-time)' }, '14K', '–', '7 × 2,000'],
            [{ de: 'Gegnerische Spieler (PvP)', en: 'Enemy players (PvP)' }, '0–200K', { de: 'ja', en: 'yes' }, '–'],
          ],
        },
        { type: 'heading', text: { de: 'Die AP-Reihenfolge', en: 'The AP priority order' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Quest-AP (Command Scrolls · Rift · Season)', en: 'Quest AP (Command · Rift · Season)' }, text: { de: 'Ohne Grenze.', en: 'No cap.' } },
            { title: both('Supply Requests'), text: { de: 'Ohne Grenze.', en: 'No cap.' } },
            { title: both('Abyss Corridor'), text: { de: '10–30K in 5 Min.', en: '10–30K in 5 min.' } },
            { title: { de: 'Abyss-Monster bis zur Grenze', en: 'Abyss mobs to the cap' }, text: { de: 'Zähler im Abyss-Fenster.', en: 'Counter in the Abyss window.' } },
            { title: both('Arena & Battlefield'), text: { de: 'Wochenbelohnungen.', en: 'Weekly rewards.' } },
            { title: { de: 'Gegnerische Spieler', en: 'Enemy players' }, text: { de: 'Optional · gedeckelt.', en: 'Optional · capped.' } },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Aufbau', en: 'Setup' }, { de: 'Quellen', en: 'Sources' }, { de: 'AP pro Woche und Charakter (Schätzung)', en: 'AP / week / character (estimate)' }],
          rows: [
            [{ de: 'Normal', en: 'Casual' }, { de: 'Duties + ein paar Supply Requests', en: 'Duties + a few Supply Requests' }, '≈30–60K'],
            [{ de: 'Guide, ohne PvP', en: 'Guide, no PvP' }, { de: 'Quest-AP, Supply Requests, Corridor, Abyss-Monster, Rift-Reihe', en: 'Quest AP, Supply Requests, Corridor, Abyss mobs, Rift chain' }, '≈110–380K'],
            [{ de: 'Guide + PvP', en: 'Guide + PvP' }, { de: 'Alles oben + Arena + gegnerische Spieler', en: 'All of the above + Arena + enemy players' }, { de: 'bis ≈580K', en: 'up to ≈580K' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Stigma Shards zuerst:** Die ersten 50 kosten 10.000 AP, die letzten 25.000 – bei ≈200K AP pro Woche dauert der ganze Abyss-Shop Monate. Hol vorher die je 35 Shards aus Nightmare- und Shugo-Shop, die kosten keine AP.', en: '**Stigma Shards first:** the first 50 cost 10,000 AP, the last 25,000 – at ≈200K AP a week the whole Abyss shop takes months. First take the 35 shards each from the Nightmare and Shugo shops, they cost no AP.' },
            { de: '**Corridor = AP-Schub:** 10–30K in 5 Minuten – Flächenschaden, zwischen den Gruppen nie stehen bleiben.', en: '**Corridor = burst AP:** 10–30K in 5 minutes – AoE, never stand still between pulls.' },
            { de: '**Abyss-Zeit ist begrenzt:** 7 Std. pro Ebene und Woche (Membership 14 in Lower und Middle), sie läuft nur, solange du drin bist. Behandle sie wie Odyle – beim Reset nie ungenutzt.', en: '**Abyss time is limited:** 7 h per layer per week (Membership 14 in Lower and Middle), and it only runs while you are inside. Treat it like Odyle – never unused at reset.' },
            { de: '**Twinks brauchen Gegenstandsstufe 1.000** für die Basen in Lower Reshanta; darunter nur Quests, Supply Requests und Arena.', en: '**Alts need item level 1,000** for the Lower Reshanta bases; below that only quests, Supply Requests and Arena.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Elyos oder Asmodier: wo du farmst', en: 'Elyos vs Asmodian: where to farm' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Gleiche Klassen, gespiegelte Ausrüstung und identische Belohnungstabellen – die Stärke ist gleich. Was sich ändert, ist, **wo** du farmst.',
            en: 'Same classes, mirrored gear and identical reward tables – power is equal. What changes is **where** you farm.',
          },
        },
        {
          type: 'table',
          head: ['', 'Elyos', { de: 'Asmodier', en: 'Asmodian' }],
          rows: [
            [{ de: 'Karten', en: 'Maps' }, 'Poeta → Verteron → Eltnen', 'Ishalgen → Altgard → Morheim'],
            [{ de: 'Gruppen versteckter Würfel (Hauptkarte)', en: 'Hidden Cube groups (main map)' }, { de: '95 – deutlich mehr (121 insgesamt)', en: '95 – far more (121 in total)' }, { de: '59 (85 insgesamt)', en: '59 (85 in total)' }],
            [{ de: 'Monster-Spawns (Hauptkarte)', en: 'Monster spawns (main map)' }, num('≈10,400'), { de: '≈12.400 – dichter', en: '≈12,400 – denser' }],
            [{ de: 'Frühes Orichalcum', en: 'Early Orichalcum' }, 'Ellun River Midstream', 'Basfelt Ruins'],
            [{ de: 'Frühe Reittier-Seelen', en: 'Early mount souls' }, 'Ellun River Midstream (Lv 18)', 'Purifying Forest (Lv 26–32)'],
            [{ de: 'Rift-Reihe (7 × 2.000 AP)', en: 'Rift chain (7 × 2,000 AP)' }, { de: 'Mino → nach Altgard', en: 'Mino → into Altgard' }, { de: 'Uru → nach Verteron', en: 'Uru → into Verteron' }],
            [{ de: 'Abyss-Basen', en: 'Abyss bases' }, 'Latesran Western Root · Dukysas Fortress', 'Latesran Eastern Root · Krotan Fortress'],
          ],
        },
        { type: 'heading', text: { de: 'Route Elyos', en: 'Elyos route' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Versteckte Würfel in Verteron', en: 'Verteron Hidden Cubes' }, text: { de: 'Auf dem Flug zu den Duties mitnehmen.', en: 'Loot while flying to Duties.' } },
            { title: both('Ellun River Midstream'), text: { de: 'Orichalcum + Sammeln.', en: 'Orichalcum + gathering.' } },
            { title: { de: 'Mino → Rift nach Altgard', en: 'Mino → Rift into Altgard' }, text: { de: '7 Quests × 2.000 AP.', en: '7 quests × 2,000 AP.' } },
            { title: both('Latesran Western Root'), text: { de: 'Basis in Lower Reshanta.', en: 'Lower Reshanta base.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Versteckte Würfel in Verteron jagen** – ≈60 % mehr als bei den Asmodiern. Jeder gibt 10–12 Silentium (für Supply Requests) und mit 50 % Chance Small Odyle Energy (+10 Odyle).', en: '**Hunt Hidden Cubes in Verteron** – ≈60% more than Asmodians. Each gives 10–12 Silentium (for Supply Requests) and a 50% chance of Small Odyle Energy (+10 Odyle).' },
            { de: '**Ellun River Midstream:** Orichalcum, Sammeln und Reittier-Seelen auf einer Route.', en: '**Ellun River Midstream:** Orichalcum, gathering and mount souls in one route.' },
            { de: 'Vollere Server: stabiler Market, mehr Konkurrenz an den Sammelpunkten – abseits der Stoßzeiten farmen.', en: 'Busier servers: stable Market, more node competition – farm off-peak.' },
          ],
        },
        { type: 'heading', text: { de: 'Route Asmodier', en: 'Asmodian route' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Jagdgebiete in Altgard', en: 'Altgard hunting grounds' }, text: { de: 'Dichte Monster · Kina-Tageslimit der Monster.', en: 'Dense mobs · daily monster-Kina limit.' } },
            { title: both('Basfelt Ruins'), text: { de: 'Orichalcum-Runde.', en: 'Orichalcum loop.' } },
            { title: { de: 'Uru → Rift nach Verteron', en: 'Uru → Rift into Verteron' }, text: { de: '7 Quests × 2.000 AP.', en: '7 quests × 2,000 AP.' } },
            { title: both('Latesran Eastern Root'), text: { de: 'Basis in Lower Reshanta.', en: 'Lower Reshanta base.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Altgard hat die dichtesten Jagdgebiete** – das Tageslimit für Kina aus Monstern (ein paar hundert pro Monster; Korea: 1 Mio. pro Tag, für Global nicht bestätigt) ist schneller voll.', en: '**Altgard has the densest hunting grounds** – the daily limit for Kina from monsters (a few hundred per kill; Korea: 1M per day, not confirmed for Global) fills faster.' },
            { de: '**Basfelt Ruins** für Orichalcum, **Purifying Forest** für Reittier-Seelen.', en: '**Basfelt Ruins** for Orichalcum, **Purifying Forest** for mount souls.' },
            { de: 'Weniger versteckte Würfel – nutz die Zeit für Monster und Sammeln.', en: 'Fewer Hidden Cubes – spend that time on mobs and gathering.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Für beide Fraktionen', en: 'Both factions' },
          text: {
            de: 'Mach die 7-teilige Spacetime-Rift-Reihe (2.000 AP pro Schritt). Ein Rift gibt dir 1 Stunde im gegnerischen Gebiet. Alle Artefakte einer Ebene verloren? Deine Fraktion bekommt einen eigenen Abyss Corridor – abholen.',
            en: 'Do the 7-step Spacetime Rift chain (2,000 AP per step). A rift gives 1 hour in enemy territory. Lost every Artifact on a layer? Your faction gets its own Abyss Corridor – claim it.',
          },
        },
        {
          type: 'links',
          items: [{ href: '#/farm', label: { de: 'Versteckte Würfel und Spots auf der Karte', en: 'Hidden Cubes and spots on the map' } }],
        },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'table',
          head: [{ de: 'Fehler', en: 'Mistake' }, { de: 'Stattdessen', en: 'Do this instead' }, { de: 'Kostet dich', en: 'Costs you' }],
          rows: [
            [{ de: 'Odyle-Energie steht an der Grenze', en: 'Odyle Energy sitting at cap' }, { de: 'Gratis spätestens alle 4 Tage auf jedem Charakter ausgeben', en: 'Free, spend it at least every 4 days on every character' }, 'Kina'],
            [{ de: 'Geschafften Dungeon ohne Abholen verlassen', en: 'Leaving a cleared dungeon without claiming' }, { de: 'Immer abholen – der Server hat nur 10 offene Würfel pro Woche', en: 'Always claim – the server only has 10 unclaimed cubes a week' }, { de: 'Kina · Zugang', en: 'Kina · access' }],
            [{ de: 'Duty Missions auf Twinks', en: 'Duty Missions on alts' }, { de: 'Serverweit – nur auf dem Main', en: 'Server-wide – main only' }, 'Kina · iLv'],
            [{ de: 'Twinks auf anderem Server oder in anderer Fraktion', en: 'Alts on another server or faction' }, { de: 'Gleicher Server + Fraktion, sonst wird nichts geteilt', en: 'Same server + faction, or nothing is shared' }, 'Kina'],
            [{ de: '5+ Farm-Charaktere ohne Membership', en: '5+ farming characters without Membership' }, { de: 'Gratis ab Lauf 85 nur 80 → 20 % – bei 4 aufhören oder Membership', en: 'Free, from run 85 only 80 → 20% – stop at 4 or get Membership' }, 'Kina'],
            [{ de: 'Odyle teurer kaufen, als eine Abholung zahlt', en: 'Buying Odyle for more than a claim pays' }, { de: '100.000 Kina pro 40 Odyle lohnen nur bei vollem Kina pro Lauf', en: '100,000 Kina per 40 Odyle only pays at full Kina per run' }, 'Kina'],
            [{ de: 'Daeva Pass für jeden Twink', en: 'Daeva Pass for every alt' }, { de: 'Gilt pro Charakter – nur für den Main kaufen', en: 'Per character – buy it for the main' }, 'Kina'],
            [{ de: 'Früh auf +11 und höher zocken', en: 'Gambling +11 and higher early' }, { de: 'Sicheres +10 auf alles, dann Arcana', en: 'Safe +10 on all gear, then Arcana' }, 'iLv · CP'],
            [{ de: 'Den besten Platz polieren', en: 'Polishing your best slot' }, { de: 'Zuerst den schwächsten Platz verbessern', en: 'Upgrade the weakest slot first' }, 'iLv · CP'],
            [{ de: 'Zuerst gedeckelte AP farmen', en: 'Grinding capped AP first' }, { de: 'Quest-AP + Supply Requests vor Abyss-Monstern', en: 'Quest AP + Supply Requests before Abyss mobs' }, 'AP'],
            [{ de: 'Abyss-Zeit verfallen lassen', en: 'Leaving Abyss time unused' }, { de: '7 Std. pro Ebene – plane sie wie Odyle', en: '7 h per layer – plan it like Odyle' }, 'AP'],
            [{ de: 'Wochenzähler vergessen', en: 'Forgetting weekly counters' }, { de: 'Dienstag-Aufräumen – jede Woche', en: 'Tuesday clean-up – every week' }, 'Kina · iLv · AP'],
          ],
        },
      ],
    },
    {
      title: { de: 'Wochen-Tracker und PDF', en: 'Weekly tracker and PDF' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die PDF enthält die Diagramme dieses Guides und einen **Wochen-Tracker** zum Ausdrucken: Tagesaufgaben von Mittwoch bis Dienstag, Wochenaufgaben für Main und drei Twinks und Felder für Kina, Gegenstandsstufe, Kampfkraft und AP der Woche. Ausdrucken oder auf einem zweiten Bildschirm offen lassen – ein Blatt pro Woche. Die PDF ist der Stand vom 18.10.: Kina pro Woche, Zeiten, Odyle-Extras und Charakter-Plätze sind auf dieser Seite neuer.',
            en: 'The PDF has the charts of this guide and a printable **weekly tracker**: daily tasks from Wednesday to Tuesday, weekly tasks for the main and three alts, and fields for the week’s Kina, item level, Combat Power and AP. Print it or keep it open on a second screen – one sheet per week. The PDF is the version of 18 Oct: Kina per week, times, Odyle extras and character slots are newer on this page.',
          },
        },
        pdfLink,
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Lieber am Bildschirm? Die Checklisten oben merken sich deine Haken in diesem Browser. Mit „Haken entfernen“ beginnst du die neue Woche.',
            en: 'Rather on screen? The checklists above remember your ticks in this browser. "Clear ticks" starts the new week.',
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
            { href: 'https://raidrelay.com/aion-2-kina-guide', label: 'Raid Relay – Kina guide for the global client (Kina per claim, run limits, hours)' },
            { href: 'https://metabot.gg/en/aion-2/guides/daily-weekly-checklist', label: 'metabot.gg – Daily & weekly checklist (entry caps and refills)' },
            { href: 'https://metabot.gg/en/aion-2/guides/dungeon-guide', label: 'metabot.gg – Dungeon list and item level gates' },
            { href: 'https://metabot.gg/en/aion-2/guides/kinah-farming-guide', label: 'metabot.gg – Kina farming (bound vs unbound, Duty rerolls)' },
            { href: 'https://metabot.gg/en/aion-2/guides/combat-power-guide', label: 'metabot.gg – Combat Power statistics' },
            { href: 'https://metabot.gg/en/aion-2/guides/abyss-pvp-guide', label: 'metabot.gg – Abyss guide (time, sieges, AP)' },
            { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'metabot.gg – Stigmas (shard prices)' },
            { href: 'https://metabot.gg/en/aion-2/guides/elyos-vs-asmodian', label: 'metabot.gg – Elyos vs Asmodian' },
            { href: 'https://daevaguides.com/en/guides/odyle-energy/', label: 'Daeva Guides – Odyle Energy (caps, Wind Breeze limits)' },
            { href: 'https://timesaver.gg/blog/aion-2-character-slots-alts', label: 'timesaver.gg – Character slots and alts' },
            { href: 'https://aion2hub.com/updates/aion-2-update-2025-12-24', label: 'AION2Hub – KR update 2025-12-24 (AP cap 400K)' },
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings' },
          ],
        },
      ],
    },
  ],
};
