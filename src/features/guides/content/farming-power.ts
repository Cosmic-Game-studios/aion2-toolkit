import type { Guide, L10n } from '../types';

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
    de: 'Wie du die vier Zahlen des Fortschritts so schnell wie möglich hochtreibst – solo oder mit Twinks, für Elyos und Asmodier: Routen für jeden Tag, Wochenplan, Checklisten und die Obergrenzen pro Woche.',
    en: 'How to push the four numbers of progress as fast as possible – solo or with alts, for Elyos and Asmodians: routes for every day, a week plan, checklists and the weekly ceilings.',
  },
  updated: '2026-10-18',
  tags: [
    { de: 'Farming', en: 'Farming' },
    { de: 'Kina', en: 'Kina' },
    { de: 'Gegenstandsstufe', en: 'Item level' },
    { de: 'Kampfkraft', en: 'Combat Power' },
    { de: 'Abyss-Punkte', en: 'Abyss Points' },
  ],
  basis: {
    de: 'Eigene Recherche zum globalen Server, PvE (Stand Oktober 2026). Alle Werte sind Schätzungen zum Planen und können sich mit Patches ändern.',
    en: 'Own research for the global server, PvE (as of October 2026). All values are estimates for planning and can change with patches.',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Vier Zahlen entscheiden über deinen Fortschritt in AION 2: **Kina**, **Gegenstandsstufe (iLv)**, **Kampfkraft (CP)** und **Abyss-Punkte (AP)**. Dieser Guide zeigt, wie du alle vier so schnell wie möglich hochtreibst – solo oder mit mehreren Charakteren, als Elyos oder Asmodier.',
            en: 'Four numbers decide your progress in AION 2: **Kina**, **item level (iLv)**, **Combat Power (CP)** and **Abyss Points (AP)**. This guide shows how to push all four as fast as possible – solo or with several characters, as Elyos or Asmodian.',
          },
        },
        pdfLink,
        { type: 'heading', text: { de: 'Die 7 wichtigsten Regeln', en: 'The 7 rules that matter most' } },
        {
          type: 'table',
          head: ['#', { de: 'Regel', en: 'Rule' }, { de: 'Warum', en: 'Why' }, { de: 'Bringt', en: 'Feeds' }],
          rows: [
            ['1', { de: '**Odyle-Energie nie voll laufen lassen**', en: '**Never let Odyle Energy cap**' }, { de: 'Deine größte Kina-Quelle – sie speichert nur 4 Tage 16 Std.', en: 'Your biggest Kina source – it only banks 4 days 16 h.' }, 'Kina'],
            ['2', { de: '**5 Duty Missions täglich auf dem Main**', en: '**5 Duty Missions every day on your main**' }, { de: 'Serverweites Limit: Kina, Steine, Odyle, Schlüssel.', en: 'Server-wide limit: Kina, stones, Odyle, keys.' }, 'Kina · iLv'],
            ['3', { de: '**Jeden Wochenzähler vor Mittwoch leeren**', en: '**Clear every weekly counter before Wednesday**' }, { de: 'Ungenutzte Versuche, Eintritte und Tickets verfallen.', en: 'Unused tries, entries and tickets are lost.' }, 'Kina · iLv · AP'],
            ['4', { de: '**Erst alles Epic/Unique sicher auf +10**', en: '**Safe +10 on all Epic/Unique gear first**' }, { de: 'Bis +10 gelingt es immer – Stärke ohne Risiko.', en: 'Always succeeds up to +10 – risk-free power.' }, 'iLv · CP'],
            ['5', { de: '**Den schwächsten Platz verbessern, nicht den besten**', en: '**Upgrade your weakest slot, not your best**' }, { de: 'Die Gegenstandsstufe treibt die Kampfkraft (≈45 CP pro Punkt).', en: 'Item level drives Combat Power (≈45 CP per point).' }, 'iLv · CP'],
            ['6', { de: '**Zuerst AP ohne Obergrenze farmen**', en: '**Farm uncapped AP first**' }, { de: 'Quests und Supply Requests vor den gedeckelten Abyss-Monstern.', en: 'Quests and Supply Requests before capped Abyss mobs.' }, 'AP'],
            ['7', { de: '**Twinks: gleicher Server + gleiche Fraktion** – 4 gratis, 8 mit Membership', en: '**Alts: same server + faction** – 4 free, 8 with Membership' }, { de: 'Mitglieder bekommen 2 Würfel pro Lauf für 80 Odyle und zählen nur halb so viele Läufe.', en: 'Members get 2 cubes per 80-Odyle run and count half the runs.' }, 'Kina'],
          ],
        },
        { type: 'heading', text: { de: 'Deine Wochenziele', en: 'Your weekly targets' } },
        {
          type: 'facts',
          items: [
            { label: { de: 'Odyle-Würfel', en: 'Odyle cubes' }, value: { de: '**21** pro Charakter', en: '**21** per character' } },
            { label: { de: 'Gegenstandsstufe', en: 'Item level' }, value: { de: '**1.400** für Tier 2', en: '**1,400** for Tier 2' } },
            { label: { de: 'Kampfkraft', en: 'Combat Power' }, value: { de: 'Ziel **100K**', en: 'goal **100K**' } },
            { label: { de: 'Abyss-Punkte', en: 'Abyss Points' }, value: { de: '**200K+** pro Charakter', en: '**200K+** per character' } },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Inhalte, Dungeons und Gegenstände stehen hier so, wie sie im englischen Client heißen. Im deutschen Client können sie anders lauten. Alle Zahlen sind Schätzungen zum Planen.',
            en: 'Content, dungeons and items are named as in the English client. All numbers are estimates for planning.',
          },
        },
      ],
    },
    {
      title: { de: 'Die vier Säulen des Fortschritts', en: 'The four pillars of progress' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der ganze Fortschritt in AION 2 läuft auf vier Zahlen hinaus. Jede Aufgabe in diesem Guide trägt die Säule, auf die sie einzahlt: **Kina**, **iLv**, **CP** oder **AP**.',
            en: 'Everything in AION 2 progression comes down to four numbers. Every task in this guide is tagged with the pillar it feeds: **Kina**, **iLv**, **CP** or **AP**.',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Odyle-Würfel** (Conquest, Transcendence), **Duties** und **Verkäufe am Market** → **Kina** → Ausrüstungswechsel, sicheres +10, Arcana → **Gegenstandsstufe**', en: '**Odyle cubes** (Conquest, Transcendence), **Duties** and **Market sales** → **Kina** → gear swaps, safe +10, Arcana → **item level**' },
            { de: '**Daily Dungeon**, **Ascension**, **Nightmare** → **Materialien** (Steine, Ausrüstung) → **Gegenstandsstufe**', en: '**Daily Dungeon**, **Ascension**, **Nightmare** → **materials** (stones, gear) → **item level**' },
            { de: '**Supply Requests**, **Corridor**, **Abyss-Monster**, **Arena**, **Battlefield**, **PvP** → **Abyss-Punkte** → Stigma Shards, Daevanion Crystals, Potential Stones', en: '**Supply Requests**, **Corridor**, **Abyss mobs**, **Arena**, **Battlefield**, **PvP** → **Abyss Points** → Stigma Shards, Daevanion Crystals, Potential Stones' },
            { de: 'Gegenstandsstufe + Daevanion-Knoten, Titel und Flügel → **Kampfkraft**', en: 'Item level + Daevanion nodes, titles and wings → **Combat Power**' },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Säule', en: 'Pillar' }, { de: 'Was es ist', en: 'What it is' }, { de: 'Hauptquellen', en: 'Main sources' }, { de: 'Ziel mit diesem Guide', en: 'Goal with this guide' }],
          rows: [
            ['**Kina**', { de: 'Handelbare Währung – kauft Ausrüstung, Verbesserungen und Market-Waren', en: 'Tradeable currency – buys gear, upgrades and Market items' }, { de: 'Odyle-Würfel, Duties, Market', en: 'Odyle cubes, Duties, Market' }, { de: '≈5,6 Mio./Woche solo · ≈22–45 Mio. mit Twinks', en: '≈5.6M/week solo · ≈22–45M with alts' }],
            ['**iLv**', { de: 'Summe des Charakters aus Ausrüstung, Verzauberung und Arcana', en: 'Character total of gear, enhancement and Arcana' }, { de: 'Ausrüstungswechsel, sicheres +10, Arcana', en: 'Gear swaps, safe +10, Arcana' }, num('700 → 1,000 → 1,400 → 2,100')],
            ['**CP**', { de: 'Der Stärkewert des Spiels – steigt um ≈45 pro Punkt Gegenstandsstufe', en: "The game's strength score – rises ≈45 per item level point" }, { de: 'Gegenstandsstufe, Daevanion, Titel, Flügel', en: 'Item level, Daevanion, titles, wings' }, '≈50K → ≈100K'],
            ['**AP**', { de: 'Abyss-Währung – Stigma Shards, Daevanion Crystals, Potential Stones', en: 'Abyss currency – Stigma Shards, Daevanion Crystals, Potential Stones' }, { de: 'Supply Requests, Corridor, Abyss-Monster', en: 'Supply Requests, Corridor, Abyss mobs' }, { de: '≈110–380K pro Woche und Charakter', en: '≈110–380K per week per character' }],
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
            de: 'Dieser Guide zielt auf das **Maximum**, nicht nur auf „besser“. Das sind die höchsten Werte, die die Systeme pro Woche hergeben – und was es dafür braucht.',
            en: "This guide aims at the **maximum**, not just 'better'. These are the highest values the systems allow per week – and what it takes to reach them.",
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Kina pro Woche', en: 'Kina per week' }, value: { de: '**61,6 Mio.** – 8 Charaktere, Tier 3, Membership', en: '**61.6M** – 8 characters, Tier 3, Membership' } },
            { label: { de: 'Gegenstandsstufe', en: 'Item level' }, value: { de: '**2.100+** – Tier 3, danach Amplified', en: '**2,100+** – Tier 3, then Amplified' } },
            { label: { de: 'Kampfkraft', en: 'Combat Power' }, value: { de: '**110K+** – Spitzenklasse', en: '**110K+** – top tier' } },
            { label: { de: 'AP pro Woche', en: 'AP per week' }, value: { de: '**≈580K** pro Charakter', en: '**≈580K** per character' } },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Säule', en: 'Pillar' }, { de: 'Mit dem Guide', en: 'Guide level' }, { de: 'Obergrenze', en: 'Ceiling' }, { de: 'Was es braucht', en: 'What it takes' }],
          rows: [
            ['**Kina**', { de: '≈22,4 Mio. (4 Charaktere, Tier 2)', en: '≈22.4M (4 chars, Tier 2)' }, { de: '≈61,6 Mio. (8 Charaktere, Tier 3)', en: '≈61.6M (8 chars, Tier 3)' }, { de: 'Membership · Plätze 5–8 · jeder Charakter auf 2.100', en: 'Membership · slots 5–8 · every character at 2,100' }],
            ['**AP**', { de: '≈110–380K pro Charakter', en: '≈110–380K per char' }, { de: '≈580K pro Charakter', en: '≈580K per char' }, { de: 'Beide gedeckelten Töpfe voll (≈200K Monster + ≈200K PvP) + alle AP ohne Obergrenze', en: 'Both capped pools full (≈200K mobs + ≈200K PvP) + all uncapped AP' }],
            ['**iLv**', num('1,400 (Tier 2)'), num('2,100+ (Tier 3)'), { de: 'Unique-Ausrüstung auf +10, alle Arcana, dann +15 und Amplified', en: 'Unique gear at +10, full Arcana, then +15 and Amplified' }],
            ['**CP**', '≈66K', '110K+', { de: '≈255+ Daevanion-Knoten, ≈190 Titel, Amplified Enhancement', en: '≈255+ Daevanion nodes, ≈190 titles, Amplified Enhancement' }],
          ],
        },
        { type: 'heading', text: { de: 'Die 10 Gesetze für maximalen Fortschritt', en: 'The 10 laws of max progress' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Nichts verschwenden', en: 'Zero waste' }, text: { de: 'Odyle, Abyss-Zeit, Wochenzähler.', en: 'Odyle, Abyss time, weekly counters.' } },
            { title: { de: 'Immer das höchste Tier', en: 'Highest tier' }, text: { de: 'das du schaffst.', en: 'you can clear, always.' } },
            { title: { de: 'Doppelt abholen mit Membership', en: 'Double-claim with Membership' }, text: { de: '80 Odyle = 2 Würfel.', en: '80 Odyle = 2 cubes.' } },
            { title: { de: 'Voller Kader', en: 'Full roster' }, text: { de: 'auf einem Server und in einer Fraktion.', en: 'on one server and faction.' } },
            { title: { de: 'Zuerst AP ohne Obergrenze', en: 'Uncapped AP first' }, text: { de: 'Quests, Supply Requests.', en: 'Quests, Supply Requests.' } },
            { title: { de: 'Die gedeckelten AP-Töpfe', en: 'Cap the capped' }, text: { de: 'jede Woche voll machen.', en: 'AP pools every week.' } },
            { title: { de: 'Überschuss verkaufen', en: 'Sell surplus' }, text: { de: 'Odyle und Materialien am Market.', en: 'Odyle and materials on the Market.' } },
            { title: { de: 'Kina → Gegenstandsstufe', en: 'Kina → item level' }, text: { de: 'schwächster Platz → +10 → Arcana.', en: 'weakest slot → +10 → Arcana.' } },
            { title: { de: 'AP → Kampfkraft', en: 'AP → Combat Power' }, text: { de: 'Stigma Shards, Daevanion.', en: 'Stigma Shards, Daevanion.' } },
            { title: { de: 'In Blöcken spielen', en: 'Batch sessions' }, text: { de: '2 Odyle-Tage, 3 Abyss-Blöcke.', en: '2 Odyle days, 3 Abyss blocks.' } },
          ],
        },
        { type: 'heading', text: { de: 'Was dir dieser Guide bringt', en: 'What this guide earns you' } },
        {
          type: 'facts',
          items: [
            { label: { de: 'Kina solo', en: 'Kina solo' }, value: num('**×2.8**') },
            { label: { de: 'Kina Main + 3 Twinks', en: 'Kina main + 3 alts' }, value: both('**×11**') },
            { label: { de: 'Kampfkraft', en: 'Combat Power' }, value: { de: '**+50K** (iLv 1.000 → 2.100)', en: '**+50K** (iLv 1,000 → 2,100)' } },
            { label: { de: 'AP pro Charakter', en: 'AP per character' }, value: both('**×3–6**') },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Säule', en: 'Pillar' }, { de: 'Normale Woche', en: 'Casual week' }, { de: 'Mit diesem Guide', en: 'Following this guide' }, { de: 'Warum', en: 'Why' }],
          rows: [
            ['**Kina**', { de: '≈2,0 Mio. (Tier 1, halbe Odyle verschwendet)', en: '≈2.0M (Tier 1, half the Odyle wasted)' }, { de: '≈5,6 Mio. solo · ≈22,4 Mio. mit 3 Twinks · ≈44,8 Mio. mit 7 (Membership)', en: '≈5.6M solo · ≈22.4M with 3 alts · ≈44.8M with 7 (Member)' }, { de: 'Keine verschwendete Energie, Tier-2-Würfel, Twinks auf demselben Server', en: 'No wasted energy, Tier 2 cubes, alts on the same server' }],
            ['**iLv**', { de: 'langsame, zufällige Verbesserungen', en: 'slow, random upgrades' }, { de: 'Meilensteine 1.000 → 1.400 → 2.100', en: 'milestones 1,000 → 1,400 → 2,100' }, { de: 'Kina in der richtigen Reihenfolge ausgegeben', en: 'Kina spent in the right order' }],
            ['**CP**', { de: '≈50K bei iLv 1.000', en: '≈50K at iLv 1,000' }, { de: '≈66K bei 1.400 · ≈100K bei 2.100', en: '≈66K at 1,400 · ≈100K at 2,100' }, { de: '≈45 CP pro Punkt Gegenstandsstufe', en: '≈45 CP per item level point' }],
            ['**AP**', '≈30–60K', { de: '≈110–380K ohne PvP · bis ≈580K mit PvP', en: '≈110–380K without PvP · up to ≈580K with PvP' }, { de: 'Quellen ohne Obergrenze zuerst, Corridor-Schübe', en: 'Uncapped sources first, Corridor bursts' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'So liest du die Zahlen', en: 'How to read these numbers' },
          text: {
            de: 'Würfelwerte, Obergrenzen und das Verhältnis CP pro Gegenstandsstufe können sich mit Patches ändern. Die AP-Obergrenzen des globalen Servers sind nicht veröffentlicht – schau auf den Zähler im Abyss-Fenster. Die „normale Woche“ ist eine Annahme zum Vergleich.',
            en: 'Cube values, caps and the CP-per-item-level ratio can change with patches. Global AP caps are not published – check the live counter in the Abyss UI. The casual baseline is an assumption for comparison.',
          },
        },
      ],
    },
    {
      title: { de: 'Zeitbudget: wo sich Membership lohnt', en: 'Time budget: where Membership pays' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Gemessene Farmzeit pro Woche für die volle Kina-Routine (alle Quellen). Kostenlose Twinks bringen mehr Kina, aber nicht mehr Tempo – **Membership verdoppelt fast das Kina pro Stunde.**',
            en: 'Measured farming time per week for the full Kina routine (all sources). Free alts add Kina but not speed – **Membership almost doubles Kina per hour.**',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Aufbau', en: 'Setup' }, { de: 'Stunden/Woche gratis', en: 'Hours/week free' }, { de: 'Stunden/Woche Member', en: 'Hours/week Member' }, { de: 'Kina/Std. gratis', en: 'Kina/hour free' }, { de: 'Kina/Std. Member', en: 'Kina/hour Member' }],
          rows: [
            ['Main', num('6.8 h'), num('5.2 h'), num('1.7M'), num('2.9M')],
            [{ de: 'Main + 1', en: 'Main + 1' }, num('11 h'), num('7.7 h'), num('1.7M'), num('3.0M')],
            [{ de: 'Main + 2', en: 'Main + 2' }, num('15.2 h'), '–', num('1.7M'), '–'],
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Kina/Std. gratis', en: 'Kina/hour free' }, value: { de: '**1,7 Mio.**', en: '**1.7M**' } },
            { label: { de: 'Kina/Std. Member', en: 'Kina/hour Member' }, value: { de: '**≈3,0 Mio.**', en: '**≈3.0M**' } },
            { label: { de: 'Zeit nur Main', en: 'Time, main only' }, value: both('**−24%**') },
            { label: { de: 'Zeit Main + 1 Twink', en: 'Time, main + 1 alt' }, value: both('**−30%**') },
          ],
        },
        { type: 'heading', text: { de: 'Wähle deinen Aufbau nach deiner Zeit', en: 'Pick your setup by available time' } },
        {
          type: 'table',
          head: [{ de: 'Zeit pro Woche', en: 'Time per week' }, { de: 'Aufbau', en: 'Setup' }, { de: 'Erwartetes Kina/Woche', en: 'Expected Kina/week' }, { de: 'Hinweis', en: 'Note' }],
          rows: [
            ['≈5 h', { de: 'Nur Main + Membership', en: 'Main only + Membership' }, { de: '≈15 Mio. (alle Quellen)', en: '≈15M (all sources)' }, { de: 'Höchster Wert pro Stunde', en: 'Highest value per hour' }],
            ['≈8 h', { de: 'Main + 1 Twink + Membership', en: 'Main + 1 alt + Membership' }, { de: '≈23 Mio.', en: '≈23M' }, { de: 'Bester Start für die meisten', en: 'Best start for most players' }],
            ['≈12–14 h', { de: 'Main + 3 Twinks + Membership', en: 'Main + 3 alts + Membership' }, { de: '≈30 Mio.+', en: '≈30M+' }, { de: 'Hier ist für Gratis-Spieler ohnehin Schluss', en: 'Free players stop here anyway' }],
            ['20 h+', { de: 'Alle 8 Charaktere + Membership', en: 'All 8 characters + Membership' }, { de: '≈45–60 Mio. aus Würfeln', en: '≈45–60M from cubes' }, { de: 'Die Obergrenze – nur mit Membership', en: 'The ceiling – only with Membership' }],
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Alles über Main + 1 Twink ist aus den gemessenen Werten hochgerechnet.',
            en: 'Setups above main + 1 alt are extrapolated from the measured values.',
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
            { title: { de: 'Duty Missions ×5 · 15 Min.', en: 'Duty Missions ×5 · 15 min' }, text: { de: 'Schwache Belohnungen neu würfeln.', en: 'Reroll weak rewards.' } },
            { title: { de: 'Dimensional Invasion · 5 Min.', en: 'Dimensional Invasion · 5 min' }, text: { de: 'Beide Tagesbelohnungen.', en: 'Both daily rewards.' } },
            { title: { de: 'Daily Dungeon ×2 · 10 Min.', en: 'Daily Dungeon ×2 · 10 min' }, text: { de: 'Enhance Stones.', en: 'Enhance Stones.' } },
            { title: { de: 'Nightmare ×2 · 10 Min.', en: 'Nightmare ×2 · 10 min' }, text: { de: 'Oder bis zu 14 ansparen.', en: 'Or bank up to 14.' } },
            { title: { de: 'Supply Requests · 3 Min.', en: 'Supply Requests · 3 min' }, text: { de: 'AP ohne Obergrenze.', en: 'Uncapped AP.' } },
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
            { de: '**Wenig Zeit?** Die Stationen 1, 2 und 6 auf dem Main sind das Minimum – Nightmare und Daily Dungeon lassen sich ansparen.', en: '**Busy day?** Stations 1, 2 and 6 on the main are the minimum – Nightmare and Daily Dungeon bank.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Schlüsseltage: Mittwoch und Samstag', en: 'Key days: Wednesday and Saturday' },
      blocks: [
        { type: 'heading', text: { de: 'Mittwoch · Reset-Tag (≈1,5 Std.)', en: 'Wednesday · reset day (≈1.5 h)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Command Scrolls ×12 kaufen · 5 Min.', en: 'Buy Command Scrolls ×12 · 5 min' }, text: { de: 'Werden nicht übertragen.', en: 'Do not roll over.' } },
            { title: { de: 'Morph + Abo-Odyle · 5 Min.', en: 'Morph + subscriber Odyle · 5 min' }, text: { de: 'Main 20 · Twinks 4.', en: 'Main 20 · alts 4.' } },
            { title: { de: 'Wind Breeze Merchant · 2 Min.', en: 'Wind Breeze Merchant · 2 min' }, text: { de: 'Wochenangebot prüfen.', en: 'Check weekly stock.' } },
            { title: { de: 'Ascension Trial ×3 · 30 Min.', en: 'Ascension Trial ×3 · 30 min' }, text: { de: 'Auf jedem Charakter.', en: 'Every character.' } },
            { title: { de: 'Tägliche Route · 45 Min.', en: 'Daily route · 45 min' }, text: { de: 'Wie jeden Tag.', en: 'As every day.' } },
          ],
        },
        { type: 'heading', text: { de: 'Samstag · Power-Tag (Hauptsession)', en: 'Saturday · power day (main event)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Main: Odyle-Würfel · ≈1,5 Std.', en: 'Main: Odyle cubes · ≈1.5 h' }, text: { de: 'Höchstes Tier · ≈480 Odyle.', en: 'Highest tier · ≈480 Odyle.' } },
            { title: { de: 'Twinks 1–3 (oder 1–7) · je ≈1,5 Std.', en: 'Alts 1–3 (or 1–7) · ≈1.5 h each' }, text: { de: 'Einer nach dem anderen · Odyle leeren.', en: 'One by one · empty Odyle.' } },
            { title: { de: 'Kina zum Main schicken · 2 Min.', en: 'Send Kina to main · 2 min' }, text: { de: 'Über das Server Storage.', en: 'Server Storage.' } },
            { title: { de: 'Kina ausgeben · 15 Min.', en: 'Spend Kina · 15 min' }, text: { de: 'Schwächster Platz → +10 → Arcana.', en: 'Weakest slot → +10 → Arcana.' } },
            { title: { de: 'Abyss-Block · ≈2 Std.', en: 'Abyss block · ≈2 h' }, text: { de: 'Corridor + Monster.', en: 'Corridor + mobs.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Mittwoch:** Alles mit Wochen-Kauflimit direkt nach dem Reset kaufen – es wird nie übertragen.', en: '**Wednesday:** buy everything with a weekly purchase limit right after reset – it never rolls over.' },
            { de: '**Ascension früh in der Woche** – Eintritte lassen sich nicht ansparen, ein vergessenes Trial ist weg.', en: '**Ascension early in the week** – entries do not bank, and a forgotten Trial is gone.' },
            { de: '**Samstag:** Odyle auf jedem Charakter bei ≈480 leeren und das Kina noch am selben Abend in Gegenstandsstufe verwandeln.', en: '**Saturday:** empty Odyle on every character at ≈480, then turn the Kina into item level the same evening.' },
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
            { title: { de: 'Restliche Daily Dungeons', en: 'Daily Dungeon leftovers' }, text: { de: '14 pro Woche.', en: '14 per week.' } },
            { title: { de: 'Ascension · Subjugation', en: 'Ascension · Subjugation' }, text: { de: 'Alles, was übrig ist.', en: 'Anything left.' } },
            { title: { de: 'Exploration + Corridors · 10 Min.', en: 'Exploration + Corridors · 10 min' }, text: { de: 'Die Würfel abholen.', en: 'Claim the cubes.' } },
            { title: { de: 'Restliche Abyss-Zeit', en: 'Abyss time leftover' }, text: { de: '7 Std. pro Ebene.', en: '7 h per layer.' } },
            { title: { de: 'Daeva Pass + Season · 15 Min.', en: 'Daeva Pass + Season · 15 min' }, text: { de: 'Wöchentliche EXP auffüllen.', en: 'Top up weekly EXP.' } },
          ],
        },
        { type: 'heading', text: { de: 'Abyss-Session · AP (≈2,5 Std., 3× pro Woche)', en: 'Abyss session · AP (≈2.5 h, 3× a week)' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Zuerst Quest-AP · 20 Min.', en: 'Quest AP first · 20 min' }, text: { de: 'Command Scrolls · Season-Reiter.', en: 'Command Scrolls · Season tab.' } },
            { title: { de: 'Supply-Lieferungen · 5 Min.', en: 'Supply deliveries · 5 min' }, text: { de: 'AP ohne Obergrenze.', en: 'Uncapped AP.' } },
            { title: { de: 'Abyss Corridor · 5 Min.', en: 'Abyss Corridor · 5 min' }, text: { de: 'Wenn deine Fraktion ihn hält.', en: 'If your faction holds it.' } },
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
            { de: '**Drei Abyss-Blöcke** (z. B. Donnerstag, Sonntag, Montag) teilen die 7 Std. pro Ebene auf, ohne Zeit verfallen zu lassen.', en: '**Three Abyss blocks** (e.g. Thursday, Sunday, Monday) split the 7 h per layer without ever leaving time unused.' },
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
            de: 'Eine Woche von Reset zu Reset. ● = an diesem Tag erledigen. Zwei Odyle-Sessions (Samstag, Dienstag) holen alle 21 Würfel, ohne je an die Grenze zu stoßen; der Dienstag ist das Sicherheitsnetz für alles Wöchentliche.',
            en: 'One week from reset to reset. ● = do it that day. Two Odyle sessions (Saturday, Tuesday) collect all 21 cubes without ever touching the cap; Tuesday is the safety net for everything weekly.',
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
            [{ de: 'Morph + Abo-Odyle', en: 'Morph + subscriber Odyle' }, '●', '', '', '', '', '', ''],
            ['Command Scrolls', '●', '', '', '', '', '', ''],
            [{ de: 'Ascension Trial ×3 (alle)', en: 'Ascension Trial ×3 (all)' }, '', '●', '', '', '', '', ''],
            [{ de: 'Abyss-Zeit + Corridor', en: 'Abyss time + Corridor' }, '', '●', '', '', '●', '●', ''],
            ['Arena · Battlefield ×3', '', '', '●', '', '●', '', ''],
            ['Supply Requests', '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Dienstag-Aufräumen', en: 'Tuesday clean-up' }, '', '', '', '', '', '', '●'],
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Odyle-Sessions', en: 'Odyle sessions' }, value: { de: '**2** pro Woche', en: '**2** per week' } },
            { label: { de: 'Würfel', en: 'Cubes' }, value: { de: '**21** pro Charakter', en: '**21** per character' } },
            { label: { de: 'Abyss-Zeit', en: 'Abyss time' }, value: { de: '**7 Std.** pro Ebene', en: '**7 h** per layer' } },
            { label: { de: 'Aufräumen', en: 'Clean-up' }, value: { de: '**Dienstag**, vor dem Reset', en: '**Tuesday**, before reset' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Wenig Zeit? Der 15-Minuten-Tag', en: 'Short on time? The 15-minute day' },
          text: {
            de: 'Duty Missions auf dem Main → Shugo-Schlüssel abholen → Supply Requests. Nightmare und Daily Dungeon lassen sich ansparen und später in der Woche nachholen. Odyle nur am Samstag und Dienstag.',
            en: 'Duty Missions on the main → claim Shugo keys → Supply Requests. Nightmare and Daily Dungeon bank, so they can be caught up later in the week. Odyle only on Saturday and Tuesday.',
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
            { de: '**Odyle-Energie in Würfel stecken** (alle · Pflicht · Kina) – +15 alle 3 Std. = 120 pro Tag, Grenze 560. 40 pro Würfel (Member: 80 = 2 Würfel). Spätestens alle 4 Tage ausgeben.', en: '**Spend Odyle Energy on cubes** (all · must · Kina) – +15 every 3 h = 120/day, cap 560. 40 per cube (Member: 80 = 2 cubes). Spend every ≤4 days.' },
            { de: '**Duty Missions ×5** (Main · Pflicht · Kina, iLv) – pro Server geteilt, auf Twinks verschwendet.', en: '**Duty Missions ×5** (main · must · Kina, iLv) – shared per server, wasted on alts.' },
            { de: '**Daily Dungeon ×2** (Main · Pflicht · iLv) – Wochentopf von 14 pro Server. Hauptbelohnung: Enhance Stones.', en: '**Daily Dungeon ×2** (main · must · iLv) – weekly pool of 14 per server. Main reward: Enhance Stones.' },
            { de: '**Nightmare ×2** (alle ab 45 · Pflicht · iLv, CP) – Phantasmal Fragments + Shop. Lässt sich bis 14 ansparen.', en: '**Nightmare ×2** (all 45+ · must · iLv, CP) – Phantasmal Fragments + shop. Banks up to 14.' },
            { de: '**Supply Requests (emergency)** (alle · hoch · AP, iLv) – AP ohne Obergrenze + Enhance Stones.', en: '**Supply Requests (emergency)** (all · high · AP, iLv) – uncapped AP + Enhance Stones.' },
            { de: '**Shugo-Festival-Schlüssel** (Server · hoch · Kina) – +3 pro Tag, Grenze 12 (21 mit Membership).', en: '**Shugo Festival keys** (server · high · Kina) – +3/day, cap 12 (21 with Membership).' },
            { de: '**Dimensional Invasion** (Main · hoch · Kina, iLv) – Belohnungen 2× pro Tag.', en: '**Dimensional Invasion** (main · high · Kina, iLv) – rewards 2× per day.' },
            { de: '**Attendance-Belohnungen** (Account · schnell · Kina) – einloggen und abholen.', en: '**Attendance rewards** (account · quick · Kina) – log in and claim.' },
            { de: '**Spacetime Rifts** (beliebig · optional · AP) – Portale alle 3 Std., AP auch nach deiner Wochengrenze.', en: '**Spacetime Rifts** (any · optional · AP) – portals every 3 h, AP even after your weekly cap.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Main oder Twink?', en: 'Main vs alts' },
          text: {
            de: 'Duties, Daily Dungeon und Shugo-Schlüssel sind pro Server geteilt – immer auf dem Main. Odyle, Nightmare und Supply Requests zählen pro Charakter – auf jedem Charakter machen.',
            en: 'Duties, Daily Dungeon and Shugo keys are shared per server – always on the main. Odyle, Nightmare and Supply Requests count per character – do them on every character.',
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
            de: 'Vor dem Reset am Mittwoch. Wochenzähler laufen nur bis zu ihrer Auffüllmenge voll – was beim Reset übrig ist, ist weg. Die genaue Reset-Zeit steht im Spiel.',
            en: 'Before the Wednesday reset. Weekly counters cap at their refill amount – anything unused at reset is gone. Check the exact reset time in-game.',
          },
        },
        {
          type: 'checklist',
          items: [
            { de: '**Ascension Trial ×3** (alle · Pflicht · iLv, CP) – solo, drei Räume + Boss. Schwierigkeit nach Gegenstandsstufe.', en: '**Ascension Trial ×3** (all · must · iLv, CP) – solo, three rooms + boss. Difficulty by item level.' },
            { de: '**Sanctuary-Raid-Versuche** (alle berechtigten · Pflicht · iLv, CP) – Versuche nicht verfallen lassen.', en: '**Sanctuary raid attempts** (all eligible · must · iLv, CP) – do not let attempts expire.' },
            { de: '**Substance Morph + Abo-Odyle** (alle · Pflicht · Kina) – Main je 20, Twinks je 4 = zusätzliche Würfel.', en: '**Substance Morph + Subscriber Odyle** (all · must · Kina) – main 20 each, alts 4 each = extra cubes.' },
            { de: '**Abyss-Zeit + Corridor** (Main, Twinks ab 1.000 · Pflicht · AP) – bis 7 Std. pro Ebene. Corridor: 10–30K AP in 5 Min.', en: '**Abyss time + Corridor** (main, alts 1,000+ · must · AP) – up to 7 h per layer. Corridor: 10–30K AP in 5 min.' },
            { de: '**Command Scrolls (Hauptstadt + Abyss)** (Main · hoch · AP, iLv) – 12 aus der Hauptstadt pro Woche: Quest-AP und Materialien.', en: '**Command Scrolls (capital + Abyss)** (main · high · AP, iLv) – 12 capital per week: quest AP and materials.' },
            { de: '**Battlefield ×3 Siege** (alle · hoch · AP) – zählt pro Charakter.', en: '**Battlefield ×3 wins** (all · high · AP) – counted per character.' },
            { de: '**Subjugation-Tickets ×3** (Main · hoch · iLv) – verfallen beim Reset.', en: '**Subjugation tickets ×3** (main · high · iLv) – expire at reset.' },
            { de: '**Abyss Corridors · Exploration** (alle · hoch · AP, iLv) – Gratis-Belohnungen, abholen.', en: '**Abyss Corridors · Exploration** (all · high · AP, iLv) – free rewards, claim them.' },
            { de: '**Daeva Pass + Season Missions** (Main · mittel · Kina, AP) – wöchentliche EXP-Grenze; der Abyss-Reiter gibt AP.', en: '**Daeva Pass + Season Missions** (main · medium · Kina, AP) – weekly EXP cap; the Abyss tab gives AP.' },
            { de: '**Wöchentliche / Season Supply Requests** (alle · niedrig · AP) – 30–50K AP pro Woche.', en: '**Weekly / Season Supply Requests** (all · low · AP) – 30–50K AP per week.' },
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
            de: 'Der Motor – jede andere Säule wird damit gekauft. Das meiste Kina kommt aus **Odyle-Energie-Würfeln** in Conquest und Transcendence. Jeder Charakter regeneriert 840 Odyle pro Woche = 21 Würfel. Der Server zählt die Läufe **aller deiner Charaktere zusammen**:',
            en: 'The engine – every other pillar is bought with it. Most Kina comes from **Odyle Energy cubes** in Conquest and Transcendence. Every character regenerates 840 Odyle per week = 21 cubes. The server tracks the runs of **all your characters together**:',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Inhalt', en: 'Content' }, { de: 'Volles Kina bis', en: 'Full Kina up to' }, { de: 'Danach', en: 'After that' }],
          rows: [
            ['Conquest', { de: '84 Läufe pro Woche und Server', en: '84 runs per week per server' }, '80% → 60% → 40% → 20%'],
            ['Transcendence', { de: '55 Läufe pro Woche und Server', en: '55 runs per week per server' }, '80% → 60% → 40% → 20%'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Der Membership-Trick', en: 'Membership trick' },
          text: {
            de: 'Mitglieder geben 80 Odyle pro Lauf aus und bekommen 2 Würfel aus einem Abschluss. Gleiches Kina pro Odyle – aber halb so viele Läufe, halb so viel Zeit, und der Server zählt Läufe, nicht Würfel.',
            en: 'Members spend 80 Odyle per run and get 2 cubes from one clear. Same Kina per Odyle – but half the runs, half the time, and the server counts runs, not cubes.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Würfelwert nach Tier (ein Charakter)', en: 'Cube value by tier (one character)' },
          head: ['Tier', 'iLv', { de: 'Dungeons', en: 'Dungeons' }, { de: 'Kina pro Würfel', en: 'Kina per cube' }, { de: 'Kina pro Woche', en: 'Kina per week' }],
          rows: [
            ['Tier 1', '700', 'Krao Cave, Draupnir', '≈200K', { de: '2,8 Mio.', en: '2.8M' }],
            ['Tier 2', num('1,400'), 'Urugugu Canyon, Vakron Sky Island', '≈300K', { de: '5,6 Mio.', en: '5.6M' }],
            ['Tier 3', num('2,100'), 'Fire Temple, Ferocious Horn Den', '≈400K', { de: '7,7 Mio.', en: '7.7M' }],
          ],
        },
        {
          type: 'table',
          caption: { de: 'Kina pro Woche (handelbar, nur Würfel) – dieselben 840 Odyle pro Charakter; der Unterschied sind Tier, Verschwendung und Twinks', en: 'Kina per week (tradeable, cubes only) – same 840 Odyle per character; the difference is tier, waste and alts' },
          head: [{ de: 'Aufbau', en: 'Setup' }, { de: 'Kina pro Woche', en: 'Kina per week' }],
          rows: [
            [{ de: 'Normal (1 Charakter, gratis)', en: 'Casual (1 char, free)' }, { de: '2,0 Mio.', en: '2.0M' }],
            [{ de: 'Guide – solo (gratis)', en: 'Guide – solo (free)' }, { de: '5,6 Mio.', en: '5.6M' }],
            [{ de: 'Guide – solo (Member)', en: 'Guide – solo (Member)' }, { de: '5,6 Mio.', en: '5.6M' }],
            [{ de: 'Main + 3 Twinks, Tier 2', en: 'Main + 3 alts, Tier 2' }, { de: '22,4 Mio.', en: '22.4M' }],
            [{ de: 'Main + 3 Twinks, Tier 3', en: 'Main + 3 alts, Tier 3' }, { de: '30,8 Mio.', en: '30.8M' }],
            [{ de: 'Main + 7 Twinks, Tier 2 (Member)', en: 'Main + 7 alts, Tier 2 (Member)' }, { de: '44,8 Mio.', en: '44.8M' }],
          ],
        },
        { type: 'heading', text: { de: 'Wann du Odyle ausgibst', en: 'When to spend Odyle' } },
        {
          type: 'text',
          text: {
            de: '**Ansparen ja, voll laufen lassen nie.** Kina pro Würfel ist heute dasselbe wie in drei Tagen, und Würfel lassen sich eine Woche lang abholen. Verloren geht nur Energie über 560: **5 Odyle pro Stunde = ein Würfel alle 8 Stunden.**',
            en: '**Bank it, but never let it cap.** Kina per cube is the same today or in three days, and cube claims bank for a week. Only energy above 560 is lost: **5 Odyle per hour = one cube every 8 hours.**',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Auffüllen', en: 'Refill' }, value: { de: '+15 alle 3 Std. = 120 pro Tag', en: '+15 every 3 h = 120 per day' } },
            { label: { de: 'Grenze', en: 'Cap' }, value: { de: '560 – voll nach 4 Tagen 16 Std.', en: '560 – full after 4 days 16 h' } },
            { label: { de: 'Idealpunkt', en: 'Sweet spot' }, value: { de: 'bei ≈480 spielen (4 Tage, 12 Würfel)', en: 'play at ≈480 (4 days, 12 cubes)' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Zwei Sessions pro Woche**, z. B. Samstag- und Dienstagabend: 480 + 360 = 840 Odyle = alle 21 Würfel.', en: '**Two sessions per week**, e.g. Saturday + Tuesday evening: 480 + 360 = 840 Odyle = all 21 cubes.' },
            { de: '**Bei etwa 480 spielen**, nicht bei 560 – ein verspätetes Einloggen, und die Energie ist verschwendet.', en: '**Play at about 480**, not at 560 – one late login and you waste energy.' },
            { de: '**Vor einem Upgrade ansparen:** Kurz vor Gegenstandsstufe 1.400? Odyle für Tier-2-Würfel aufheben (+50% pro Würfel).', en: '**Bank before an upgrade:** about to hit item level 1,400? Save Odyle for Tier 2 cubes (+50% per cube).' },
          ],
        },
        { type: 'heading', text: { de: 'Solo oder mit Twinks', en: 'Solo or with alts' } },
        {
          type: 'table',
          head: ['', { de: 'Solo (1 Charakter)', en: 'Solo (1 character)' }, { de: 'Mit Twinks (gleicher Server + Fraktion)', en: 'With alts (same server + faction)' }],
          rows: [
            [{ de: 'Kina pro Woche', en: 'Kina / week' }, { de: '≈5,6 Mio. aus Würfeln (≈11 Mio. gratis / ≈15 Mio. Member mit anderen Quellen)', en: '≈5.6M from cubes (≈11M free / ≈15M Member incl. other sources)' }, { de: '+2,8 Mio. (Tier 1) bis +7,7 Mio. (Tier 3) pro Twink', en: '+2.8M (Tier 1) to +7.7M (Tier 3) per alt' }],
            [{ de: 'Wichtigster Schritt', en: 'Key move' }, { de: 'Gegenstandsstufe 1.400 erreichen – Tier 2 ist 1,5× Tier 1 wert', en: 'Reach item level 1,400 – Tier 2 is worth 1.5× Tier 1' }, { de: 'Einen Twink nach dem anderen auf 700, dann 1.400 bringen', en: 'Push one alt at a time to 700, then 1,400' }],
            [{ de: 'Odyle-Extras', en: 'Odyle extras' }, { de: '20 Morphs + 20 Abo-Käufe', en: '20 Morphs + 20 subscriber purchases' }, { de: '4 + 4 pro Twink', en: '4 + 4 per alt' }],
            [{ de: 'Kina-Fluss', en: 'Kina flow' }, { de: 'Gesammelte Odyle und Materialien am Market verkaufen', en: 'Sell gathered Odyle and materials on the Market' }, { de: 'Handelbares Kina über das Server Storage zum Main schicken', en: 'Send tradeable Kina to the main via Server Storage' }],
            ['Membership', { de: 'Zugang zu Market + Exchange, 2 Würfel pro Lauf', en: 'Market + Exchange access, 2 cubes per run' }, { de: 'Gilt für jeden Charakter auf dem Server', en: 'Covers every character on the server' }],
          ],
        },
        {
          type: 'text',
          text: {
            de: '**Wie viele Twinks farmen mit vollem Kina?** Gratis macht jeder Charakter 21 Conquest-Läufe – nach 4 Charakteren ist die Grenze von 84 Läufen erreicht. Mit Membership sind es ≈11 Läufe (80 Odyle = 2 Würfel), so passen alle 8 hinein.',
            en: '**How many alts can farm at full Kina?** Free, every character runs Conquest 21 times – the 84-run limit is reached after 4 characters. With Membership it is ≈11 runs (80 Odyle = 2 cubes), so all 8 fit.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Was Twinks machen – und was sie auslassen', en: 'What alts do – and what they skip' },
          head: [{ de: 'Auf jedem Twink', en: 'Do on every alt' }, { de: 'Nur auf dem Main (pro Server geteilt)', en: 'Main only (shared per server)' }],
          rows: [
            [{ de: 'Odyle-Würfel · 4 Morphs + 4 Abo-Odyle', en: 'Odyle cubes · 4 Morphs + 4 subscriber Odyle' }, { de: 'Duty Missions ×5 pro Tag', en: 'Duty Missions ×5 per day' }],
            [{ de: 'Nightmare ×2 pro Tag · Supply Requests', en: 'Nightmare ×2 per day · Supply Requests' }, { de: 'Daily Dungeon (14 pro Woche)', en: 'Daily Dungeon (14 per week)' }],
            ['Ascension Trial ×3 · Battlefield ×3', { de: 'Command Scrolls der Hauptstadt · Subjugation', en: 'Capital Command Scrolls · Subjugation' }],
            [{ de: 'Abyss Corridors · eigene AP für die eigenen Stigmen', en: 'Abyss Corridors · own AP for own Stigmas' }, { de: 'Daeva Pass (wird pro Charakter verkauft)', en: 'Daeva Pass (sold per character)' }],
          ],
        },
        { type: 'heading', text: { de: 'Alle 8 Charaktere spielen', en: 'Running all 8 characters' } },
        {
          type: 'text',
          text: {
            de: 'Jeder Server hat 4 Plätze, erweiterbar auf 8 (die Plätze 5–8 müssen freigeschaltet werden). Bei Tier 2 mit 21 Würfeln pro Charakter:',
            en: 'Each server gives 4 slots, expandable to 8 (slots 5–8 must be unlocked). At Tier 2, 21 cubes per character:',
          },
        },
        {
          type: 'table',
          head: ['', { de: 'Gratis (ohne Membership)', en: 'Free (no Membership)' }, 'Membership'],
          rows: [
            [{ de: 'Conquest-Läufe pro Woche', en: 'Conquest runs per week' }, '8 × 21 = 168', '8 × ≈11 = ≈84'],
            [{ de: 'Läufe mit vollem Kina', en: 'Full-Kina runs' }, { de: '84 von 168 (Rest bei 80% → 20%)', en: '84 of 168 (rest at 80% → 20%)' }, { de: 'alle ≈84', en: 'all ≈84' }],
            [{ de: 'Kina pro Woche (Tier 2)', en: 'Kina per week (Tier 2)' }, { de: '≈33,6 Mio.', en: '≈33.6M' }, { de: '≈44,8 Mio.', en: '≈44.8M' }],
            [{ de: 'Fazit', en: 'Verdict' }, { de: 'Bei 4 Charakteren aufhören', en: 'Stop at 4 characters' }, { de: 'Lohnt sich, wenn du die Zeit hast', en: 'Worth it if you have the time' }],
          ],
        },
        {
          type: 'table',
          caption: { de: 'Was jeder Charakter dazu bringt (Tier 2, 21 Würfel pro Woche)', en: 'What each character adds (Tier 2, 21 cubes per week)' },
          head: [{ de: 'Charakter', en: 'Character' }, { de: 'Gratis', en: 'Free' }, 'Member'],
          rows: [
            [{ de: 'Main, Twink 1–3', en: 'Main, alts 1–3' }, { de: 'je 5,6 Mio.', en: '5.6M each' }, { de: 'je 5,6 Mio.', en: '5.6M each' }],
            [{ de: 'Twink 4', en: 'Alt 4' }, { de: '≈4,5 Mio. (80%)', en: '≈4.5M (80%)' }, { de: '5,6 Mio.', en: '5.6M' }],
            [{ de: 'Twink 5', en: 'Alt 5' }, { de: '≈3,4 Mio. (60%)', en: '≈3.4M (60%)' }, { de: '5,6 Mio.', en: '5.6M' }],
            [{ de: 'Twink 6', en: 'Alt 6' }, { de: '≈2,2 Mio. (40%)', en: '≈2.2M (40%)' }, { de: '5,6 Mio.', en: '5.6M' }],
            [{ de: 'Twink 7', en: 'Alt 7' }, { de: '≈1,1 Mio. (20%)', en: '≈1.1M (20%)' }, { de: '5,6 Mio.', en: '5.6M' }],
            [{ de: '**Summe**', en: '**Total**' }, { de: '**≈33,6 Mio.**', en: '**≈33.6M**' }, { de: '**≈44,8 Mio.**', en: '**≈44.8M**' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: 'Belohnungen pro Charakter (Nightmare, Ascension, Battlefield, Corridors, Morphs, AP) bekommst du 8-mal.', en: 'Per-character rewards (Nightmare, Ascension, Battlefield, Corridors, Morphs, AP) are collected 8 times.' },
            { de: 'Serverweite Inhalte (Duties, Daily Dungeon, Shugo-Schlüssel) wachsen nicht mit.', en: 'Server-wide content (Duties, Daily Dungeon, Shugo keys) does not grow.' },
            { de: 'Transcendence hat ein eigenes Limit von 55 Läufen – heb es für den Main und die stärksten Twinks auf.', en: 'Transcendence has its own limit of 55 runs – keep it for the main and strongest alts.' },
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
            de: 'Die Summe deines Charakters aus Ausrüstung, Verzauberung und Arcana. Die Gegenstandsstufe schaltet Inhalte frei und treibt die Kampfkraft. Plane deine Verbesserungen um vier Meilensteine:',
            en: 'Your character total of gear, enhancement and Arcana. Item level unlocks content and drives Combat Power. Plan your upgrades around four milestones:',
          },
        },
        {
          type: 'steps',
          items: [
            { title: { de: 'iLv 700', en: 'iLv 700' }, text: { de: 'Conquest öffnet sich, Tier-1-Würfel ≈200K.', en: 'Conquest opens, Tier 1 cubes ≈200K.' } },
            { title: { de: 'iLv 1.000 · ≈50K CP', en: 'iLv 1,000 · ≈50K CP' }, text: { de: 'Abyss: Lower Reshanta öffnet sich.', en: 'Abyss: Lower Reshanta opens.' } },
            { title: { de: 'iLv 1.400 · ≈66K CP', en: 'iLv 1,400 · ≈66K CP' }, text: { de: 'Tier-2-Würfel ≈300K, +50% Kina pro Würfel.', en: 'Tier 2 cubes ≈300K, +50% Kina per cube.' } },
            { title: { de: 'iLv 2.100 · ≈100K CP', en: 'iLv 2,100 · ≈100K CP' }, text: { de: 'Tier-3-Würfel ≈400K, Fire Temple.', en: 'Tier 3 cubes ≈400K, Fire Temple.' } },
          ],
        },
        { type: 'heading', text: { de: 'Kina für Gegenstandsstufe ausgeben – in dieser Reihenfolge', en: 'How to spend Kina for item level – in this order' } },
        {
          type: 'table',
          head: [{ de: 'Schritt', en: 'Step' }, { de: 'Verbesserung', en: 'Upgrade' }, { de: 'Warum', en: 'Why' }, { de: 'Bringt', en: 'Feeds' }],
          rows: [
            ['1', { de: 'Den Platz mit der niedrigsten Gegenstandsstufe ersetzen', en: 'Replace your lowest item level slot' }, { de: 'Ein großer Sprung am schwächsten Platz schlägt das Polieren des besten.', en: 'A big jump on the weakest slot beats polishing the best one.' }, 'iLv · CP'],
            ['2', { de: 'Epic-/Unique-Ausrüstung auf +10 verzaubern', en: 'Enhance Epic/Unique gear to +10' }, { de: 'Bis +10 gelingt es immer – kostet nur Kina und Enhance Stones.', en: 'Always succeeds up to +10 – only Kina and Enhance Stones.' }, 'iLv · CP'],
            ['3', { de: 'Jeden Arcana-Platz füllen', en: 'Fill every Arcana slot' }, { de: 'Arcana zählt zur Gegenstandsstufe.', en: 'Arcana counts toward item level.' }, 'iLv · CP'],
            ['4', { de: 'Zum nächsten Meilenstein', en: 'Push to the next milestone' }, { de: '1.000 öffnet den Abyss, 1.400 und 2.100 erhöhen den Würfelwert.', en: '1,000 opens the Abyss, 1,400 and 2,100 raise cube value.' }, 'iLv · CP · Kina · AP'],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Schwächster Platz zuerst** – schau in dein Ausrüstungsfenster und kauf am Market den günstigsten großen Sprung.', en: '**Weakest slot first** – check your gear window and buy the cheapest big jump on the Market.' },
            { de: '**Keinen Platz überverzaubern, den du bald ersetzt.** Sicheres +10 reicht, bis der Platz fertig ist.', en: '**Do not over-enhance a slot you will replace soon.** Safe +10 is enough until the slot is final.' },
            { de: '**Meilensteine timen:** Odyle kurz vor 1.400 ansparen, damit schon die erste große Session Tier 2 bringt.', en: '**Time your milestones:** bank Odyle just before 1,400 so the first big session already pays Tier 2.' },
            { de: '**Twinks:** zuerst 700 (Conquest), dann 1.000 (Abyss-AP), dann 1.400 (Tier 2).', en: '**Alts:** 700 first (Conquest), then 1,000 (Abyss AP), then 1,400 (Tier 2).' },
          ],
        },
        { type: 'heading', text: { de: 'Checkliste Gegenstandsstufe (jede Woche)', en: 'Item level checklist (every week)' } },
        {
          type: 'checklist',
          items: [
            { de: 'Schwächsten Platz gefunden – Verbesserung mit dem Kina dieser Woche gekauft oder geplant', en: "Weakest slot identified – upgrade bought or planned with this week's Kina" },
            { de: 'Jedes Epic-/Unique-Teil auf dem sicheren +10', en: 'Every Epic/Unique piece at the safe +10' },
            { de: 'Alle Arcana-Plätze gefüllt', en: 'All Arcana slots filled' },
            { de: 'Odyle angespart, wenn der nächste Meilenstein (1.000 / 1.400 / 2.100) nah ist', en: 'Odyle banked if the next milestone (1,000 / 1,400 / 2,100) is close' },
            { de: 'Jeden Twink mit seinem nächsten Meilenstein verglichen (700 → 1.000 → 1.400)', en: 'Each alt checked against its next milestone (700 → 1,000 → 1,400)' },
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
            de: 'Der Stärkewert des Spiels – auf den alle schauen. Die Kampfkraft folgt der Gegenstandsstufe fast eins zu eins: **≈45 CP pro Punkt Gegenstandsstufe**. Die Klasse spielt kaum eine Rolle – im Median liegen alle Klassen innerhalb von ≈2.500 CP.',
            en: "The game's strength score – what everyone looks at. Combat Power follows item level almost one-to-one: **≈45 CP per item level point**. Class barely matters – all classes sit within ≈2,500 CP at the median.",
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'iLv 1.000', en: 'iLv 1,000' }, value: { de: '≈50K CP', en: '≈50K CP' } },
            { label: { de: 'iLv 1.400 (Tier 2)', en: 'iLv 1,400 (Tier 2)' }, value: { de: '≈66,5K CP', en: '≈66.5K CP' } },
            { label: { de: 'iLv 2.100 (Tier 3)', en: 'iLv 2,100 (Tier 3)' }, value: { de: '≈100,8K CP', en: '≈100.8K CP' } },
          ],
        },
        { type: 'heading', text: { de: 'Der Weg zu mehr Kampfkraft', en: 'The upgrade path' } },
        {
          type: 'table',
          head: [{ de: 'Schritt', en: 'Step' }, { de: 'Verbesserung', en: 'Upgrade' }, { de: 'Warum / Tipp', en: 'Why / tip' }],
          rows: [
            ['1–3', { de: 'Schwächster Platz · sicheres +10 · Arcana', en: 'Weakest slot · safe +10 · Arcana' }, { de: 'Die größten Sprünge bei der Gegenstandsstufe (Säule II).', en: 'The biggest item level gains (Pillar II).' }],
            ['4', { de: 'Daevanion-Knoten öffnen', en: 'Open Daevanion nodes' }, { de: 'Top-Spieler haben ≈2,5× mehr Knoten. Den Weg vorher planen.', en: 'Top players have ≈2.5× more nodes. Plan the path first.' }],
            ['5', { de: 'Titel und Flügel sammeln', en: 'Collect titles and wings' }, { de: 'Besessene Effekte sind dauerhafte Werte – auch nicht ausgerüstet.', en: 'Owned effects are permanent stats – even unequipped.' }],
            ['6', { de: 'Amplified Enhancement (über +15)', en: 'Amplified Enhancement (past +15)' }, { de: 'Zuletzt. Erst ab ≈90K CP wichtig.', en: 'Last. Only relevant above ≈90K CP.' }],
          ],
        },
        {
          type: 'links',
          items: [{ href: '#/daevanion', label: { de: 'Daevanion-Weg im Planer planen', en: 'Plan your Daevanion path in the planner' } }],
        },
        { type: 'heading', text: { de: 'Wo stehst du?', en: 'Where do you stand?' } },
        {
          type: 'table',
          caption: { de: 'Kampfkraft auf Stufe 45', en: 'Combat Power at level 45' },
          head: [{ de: 'Vergleichswert', en: 'Benchmark' }, { de: 'Kampfkraft', en: 'Combat Power' }],
          rows: [
            [{ de: 'iLv unter 1.000, Median', en: 'iLv below 1,000, median' }, '≈40K'],
            [{ de: 'Median einer Klasse', en: 'Class median' }, '56–58K'],
            [{ de: 'EU Top 1.000', en: 'EU top 1,000' }, '≈64K'],
            [{ de: 'Top 10%', en: 'Top 10%' }, '≈70K'],
            [{ de: 'iLv 2.000+, Median', en: 'iLv 2,000+, median' }, '≈101K'],
            [{ de: 'EU Top 100', en: 'EU top 100' }, '≈106K'],
          ],
        },
        {
          type: 'table',
          caption: { de: 'Was starke Charaktere haben', en: 'What strong characters have' },
          head: [{ de: 'Kampfkraft', en: 'Combat Power band' }, { de: 'Ø Verzauberung', en: 'Avg. enhancement' }, { de: 'Arcana ausgerüstet', en: 'Arcana equipped' }],
          rows: [
            [{ de: 'unter 60K', en: 'below 60K' }, num('+1.7'), '0'],
            ['70–80K', num('+4.8'), num('0.6')],
            ['80–90K', num('+6.5'), num('3.3')],
            ['90–110K', num('+7.8'), num('4.8')],
            ['110K+', num('+9.0'), '5'],
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
        { type: 'heading', text: { de: 'Checkliste Kampfkraft (jede Woche)', en: 'Combat Power checklist (every week)' } },
        {
          type: 'checklist',
          items: [
            { de: 'Checkliste Gegenstandsstufe erledigt (Säule II)', en: 'Item level checklist done (Pillar II)' },
            { de: 'Alle AP für Stigma Shards und Daevanion Crystals ausgegeben', en: 'All AP spent on Stigma Shards and Daevanion Crystals' },
            { de: 'Neue Daevanion-Knoten entlang des geplanten Wegs geöffnet', en: 'New Daevanion nodes opened along your planned path' },
            { de: 'Neue Titel und Flügel gesammelt – besessene Effekte zählen auch nicht ausgerüstet', en: 'New titles and wings collected – owned effects count even unequipped' },
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
            de: 'Die zweite Währung – für Stigmen, Daevanion und Potential. AP bleiben auf dem Charakter, der sie verdient: Jeder Charakter farmt und gibt seine eigenen aus. Zwei Töpfe sind gedeckelt (Abyss-Monster und gegnerische Spieler, je ≈200K pro Woche); Quest-AP und Supply Requests meist nicht.',
            en: 'The second currency – Stigmas, Daevanion and Potential. AP stays on the character that earns it – every character farms and spends its own. Two pools are capped (Abyss monsters and enemy players, ≈200K each per week); quest AP and Supply Requests mostly are not.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Woher Abyss-Punkte kommen (pro Woche und Charakter)', en: 'Where Abyss Points come from (per week, per character)' },
          head: [{ de: 'Quelle', en: 'Source' }, 'AP', { de: 'Grenze', en: 'Cap' }],
          rows: [
            [{ de: 'Abyss-Monster (PvE)', en: 'Abyss monsters (PvE)' }, '100–200K', { de: '≈200K pro Woche', en: '≈200K per week' }],
            ['Supply Requests', '100–190K', { de: 'keine', en: 'none' }],
            [{ de: 'Abyss Corridor (pro 5-Min.-Lauf)', en: 'Abyss Corridor (per 5-min run)' }, '10–30K', '–'],
            [{ de: 'Arena (alle Modi)', en: 'Arena (all modes)' }, '8–24K', '–'],
            [{ de: 'Rift-Questreihe (einmalig)', en: 'Rift quest chain (one-time)' }, '14K', '–'],
            [{ de: 'Gegnerische Spieler (PvP)', en: 'Enemy players (PvP)' }, '0–200K', { de: '≈200K pro Woche', en: '≈200K per week' }],
          ],
        },
        { type: 'heading', text: { de: 'Die AP-Reihenfolge', en: 'The AP priority order' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Quest-AP (Command Scrolls · Rift · Season)', en: 'Quest AP (Command · Rift · Season)' }, text: { de: 'Ohne Grenze.', en: 'No cap.' } },
            { title: both('Supply Requests'), text: { de: 'Ohne Grenze.', en: 'No cap.' } },
            { title: both('Abyss Corridor'), text: { de: '10–30K in 5 Min.', en: '10–30K in 5 min.' } },
            { title: { de: 'Abyss-Monster bis zur Grenze', en: 'Abyss mobs to the cap' }, text: { de: 'Grenze ≈200K.', en: '≈200K cap.' } },
            { title: both('Arena & Battlefield'), text: { de: 'Wochenbelohnungen.', en: 'Weekly rewards.' } },
            { title: { de: 'Gegnerische Spieler', en: 'Enemy players' }, text: { de: 'Optional · Grenze ≈200K.', en: 'Optional · ≈200K cap.' } },
          ],
        },
        {
          type: 'table',
          head: [{ de: 'Aufbau', en: 'Setup' }, { de: 'Quellen', en: 'Sources' }, { de: 'AP pro Woche und Charakter', en: 'AP / week / character' }],
          rows: [
            [{ de: 'Normal', en: 'Casual' }, { de: 'Duties + ein paar Supply Requests', en: 'Duties + a few Supply Requests' }, '≈30–60K'],
            [{ de: 'Guide, ohne PvP', en: 'Guide, no PvP' }, { de: 'Quest-AP, Supply Requests, Corridor, Abyss-Monster, Rift-Reihe', en: 'Quest AP, Supply Requests, Corridor, Abyss mobs, Rift chain' }, '≈110–380K'],
            [{ de: 'Guide + PvP', en: 'Guide + PvP' }, { de: 'Alles oben + Arena + gegnerische Spieler', en: 'All of the above + Arena + enemy players' }, { de: 'bis ≈580K', en: 'up to ≈580K' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Corridor = AP-Schub:** 10–30K in 5 Minuten – Flächenschaden, zwischen den Gruppen nie stehen bleiben.', en: '**Corridor = burst AP:** 10–30K in 5 minutes – AoE, never stand still between pulls.' },
            { de: '**Abyss-Zeit ist begrenzt:** 7 Std. pro Ebene und Woche. Behandle sie wie Odyle – beim Reset nie ungenutzt.', en: '**Abyss time is limited:** 7 h per layer per week. Treat it like Odyle – never unused at reset.' },
            { de: '**Twinks brauchen Gegenstandsstufe 1.000** für Lower Reshanta; darunter nur Quests, Supply Requests und Arena.', en: '**Alts need item level 1,000** for Lower Reshanta; below that only quests, Supply Requests and Arena.' },
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
            [{ de: 'Gruppen versteckter Würfel (Hauptkarte)', en: 'Hidden Cube groups (main map)' }, { de: '95 – deutlich mehr', en: '95 – far more' }, '59'],
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
            { de: '**Versteckte Würfel in Verteron jagen** – ≈60% mehr als bei den Asmodiern.', en: '**Hunt Hidden Cubes in Verteron** – ≈60% more than Asmodians.' },
            { de: '**Ellun River Midstream:** Orichalcum, Sammeln und Reittier-Seelen auf einer Route.', en: '**Ellun River Midstream:** Orichalcum, gathering and mount souls in one route.' },
            { de: 'Vollere Server: stabiler Market, mehr Konkurrenz an den Sammelpunkten – abseits der Stoßzeiten farmen.', en: 'Busier servers: stable Market, more node competition – farm off-peak.' },
          ],
        },
        { type: 'heading', text: { de: 'Route Asmodier', en: 'Asmodian route' } },
        {
          type: 'steps',
          items: [
            { title: { de: 'Jagdgebiete in Altgard', en: 'Altgard hunting grounds' }, text: { de: 'Dichte Monster · Feldgrenze.', en: 'Dense mobs · field cap.' } },
            { title: both('Basfelt Ruins'), text: { de: 'Orichalcum-Runde.', en: 'Orichalcum loop.' } },
            { title: { de: 'Uru → Rift nach Verteron', en: 'Uru → Rift into Verteron' }, text: { de: '7 Quests × 2.000 AP.', en: '7 quests × 2,000 AP.' } },
            { title: both('Latesran Eastern Root'), text: { de: 'Basis in Lower Reshanta.', en: 'Lower Reshanta base.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Altgard hat die dichtesten Jagdgebiete** – füllt die tägliche Feldgrenze von ≈1 Mio. schneller.', en: '**Altgard has the densest hunting grounds** – fills the ≈1M daily field cap faster.' },
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
            [{ de: 'Odyle-Energie steht an der Grenze', en: 'Odyle Energy sitting at cap' }, { de: 'Spätestens alle 4 Tage auf jedem Charakter ausgeben', en: 'Spend it at least every 4 days on every character' }, 'Kina'],
            [{ de: 'Duty Missions auf Twinks', en: 'Duty Missions on alts' }, { de: 'Serverweit – nur auf dem Main', en: 'Server-wide – main only' }, 'Kina · iLv'],
            [{ de: 'Twinks auf anderem Server oder in anderer Fraktion', en: 'Alts on another server or faction' }, { de: 'Gleicher Server + Fraktion, sonst wird nichts geteilt', en: 'Same server + faction, or nothing is shared' }, 'Kina'],
            [{ de: '5+ Farm-Charaktere ohne Membership', en: '5+ farming characters without Membership' }, { de: 'Gratis: 4 pro Server. Member: bis zu 8', en: 'Free: 4 per server. Member: up to 8' }, 'Kina'],
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
            de: 'Die PDF enthält alle Diagramme dieses Guides und einen **Wochen-Tracker** zum Ausdrucken: Tagesaufgaben von Mittwoch bis Dienstag, Wochenaufgaben für Main und drei Twinks und Felder für Kina, Gegenstandsstufe, Kampfkraft und AP der Woche. Ausdrucken oder auf einem zweiten Bildschirm offen lassen – ein Blatt pro Woche.',
            en: 'The PDF has every chart of this guide and a printable **weekly tracker**: daily tasks from Wednesday to Tuesday, weekly tasks for the main and three alts, and fields for the week’s Kina, item level, Combat Power and AP. Print it or keep it open on a second screen – one sheet per week.',
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
  ],
};
