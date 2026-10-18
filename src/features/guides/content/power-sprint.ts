import type { Guide, GuideCell, L10n } from '../types';

/**
 * Power sprint: the fastest order from a fresh level 45 to the top item level and Combat Power on the global client.
 *
 * Numbers:
 * - our top data (public/data/top, AION2 Index, 18 Oct 2026, the top 10 of all 8 classes = 80 characters): medians,
 *   distributions, cp7d (Combat Power gained in 7 days) and a least-squares fit of item level on what they wear
 *   (≈1 per base item level, ≈0.9 per enhancement level, ≈4.9 per Amplified level, ≈1.15 per Daevanion node;
 *   root-mean-square error ≈27 item level on 78 characters). The fit of Combat Power on item level and stigma levels gives ≈600–730 per
 *   stigma level (90% interval ≈380–1,340), used only as a labelled estimate.
 * - metabot.gg (client data and statistics of 8 Oct): enhancement chances and costs per try, Arcana grades and
 *   Transcendence gates, weekly limits, stigma shard costs, Daevanion boards, Combat Power per item level band.
 *   Kina per item level point = expected tries (with the bonus after every failure) × cost per try; the sums match
 *   metabot.gg's own averages (+10 → +15 ≈14.1M, Amplified +5 ≈26.2M).
 * - games.gg, MeinMMO, KeenGamer, AllThings.How: content gates, one-time content, belt/amulet, advice.
 * Times per phase are estimates; the real clocks are the 8 Oct statistics and the top 80 (early access 30 Sep).
 */

/** "1,400" → "1.400" and "0.5" → "0,5" in German, "M" → "Mio." */
const num = (en: string): L10n => ({
  en,
  de: en.replace(/(?<=\d)[.,](?=\d)/g, (c) => (c === '.' ? ',' : '.')).replace(/(\d)M\b/g, '$1 Mio.'),
});
const pct = (n: number): GuideCell => ({ de: `${n} %`, en: `${n}%` });

export const powerSprint: Guide = {
  id: 'power-sprint',
  icon: 'rocket',
  tone: 'gold',
  category: 'basics',
  title: {
    de: 'Power-Sprint: von der frischen 45 an die Spitze',
    en: 'Power sprint: from a fresh 45 to the top',
  },
  summary: {
    de: 'Die schnellste Reihenfolge von der frischen Stufe 45 bis Gegenstandsstufe 3.400+ und über 225K Kampfkraft – Phase für Phase, mit den Stufen-Toren, den Wochenlimits, Kina pro Gegenstandsstufe und dem echten Tempo der Top 80.',
    en: 'The fastest order from a fresh level 45 to item level 3,400+ and over 225K Combat Power – phase by phase, with the item level gates, the weekly limits, Kina per item level and the real pace of the top 80.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Gegenstandsstufe', en: 'Item level' },
    { de: 'Kampfkraft', en: 'Combat Power' },
    { de: 'Endgame', en: 'Endgame' },
    { de: 'Wochenlimits', en: 'Weekly limits' },
  ],
  basis: {
    de: 'Eigene Auswertung der Top 10 aller acht Klassen (AION2 Index, 18.10.2026, 80 Charaktere), Client-Daten und Statistik von metabot.gg (Oktober 2026) und Community-Guides zum globalen Server. Die Zeiten pro Phase sind Schätzungen.',
    en: 'Our own analysis of the top 10 of all eight classes (AION2 Index, 2026-10-18, 80 characters), client data and statistics from metabot.gg (October 2026) and community guides for the global server. The times per phase are estimates.',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: num('≈1,000'), label: { de: 'Gegenstandsstufe einer frischen 45', en: 'Item level of a fresh 45' }, note: { de: '≈46K Kampfkraft', en: '≈46K Combat Power' }, tone: 'slate' },
            { value: num('3,352'), label: { de: 'Median der Top 80 (18.10.)', en: 'Median of the top 80 (18 Oct)' }, note: { de: '≈225,5K Kampfkraft', en: '≈225.5K Combat Power' }, tone: 'gold' },
            { value: num('+50.6K'), label: { de: 'Kampfkraft pro Woche an der Spitze', en: 'Combat Power per week at the top' }, note: { de: 'Median – +30 % in einer Woche', en: 'median – +30% in one week' }, tone: 'teal' },
            { value: { de: '18 Tage', en: '18 days' }, label: { de: 'vom Early Access bis an die Spitze', en: 'from early access to the top' }, note: { de: 'die Schnellsten: 30.9. → 18.10.', en: 'the fastest: 30 Sep → 18 Oct' }, tone: 'violet' },
            { value: num('≈577M'), label: { de: 'Kina für die Verzauberung eines Top-Sets', en: 'Kina to enhance a top set' }, note: { de: '14 Teile auf +15 und Amplified +5 (Erwartungswert)', en: '14 pieces at +15 and Amplified +5 (expected)' }, tone: 'rose' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: 'Erst die Einmal-Inhalte und jeden Daevanion-Kristall, dann alles, was du trägst, auf das sichere +10. Die Stufen-Tore der Reihe nach nehmen (1.400 → 1.600 → 2.100 → 2.200 → 2.500 → 2.800), **keinen Wochenzähler voll stehen lassen** und die hergestellte Dragon-Lord-Linie Platz für Platz auf 102 bringen. Das große Kina (+11 bis +15, Amplified) nur in Teile stecken, die bleiben.',
            en: 'First the one-time content and every Daevanion Crystal, then everything you wear to the safe +10. Take the item level gates in order (1,400 → 1,600 → 2,100 → 2,200 → 2,500 → 2,800), **never let a weekly counter sit full** and build the crafted Dragon Lord line slot by slot to 102. Put the big Kina (+11 to +15, Amplified) only into pieces that stay.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Wie dieser Guide zu den anderen passt', en: 'How this guide fits the others' },
          text: {
            de: '**Höchste Kampfkraft** erklärt, was die Kampfkraft treibt und was jeder Schritt kostet. **Farming & Power** zeigt, wie du Kina, Odyle und Abyss-Punkte verdienst – mit Tagesrouten. **Handwerk: Waffen & Rüstung** erklärt die Dragon-Lord-Kette. Dieser Guide ist die **Reihenfolge und das Timing** von Stufe 45 bis an die Spitze. Von Stufe 1 bis 45 hilft der Speedrun-Guide.',
            en: '**Highest Combat Power** explains what drives Combat Power and what each step costs. **Farming & power** shows how to earn Kina, Odyle and Abyss Points – with daily routes. **Crafting gear** explains the Dragon Lord chain. This guide is the **order and timing** from level 45 to the top. For level 1 to 45 see the speedrun guide.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/combat-power', label: { de: 'Höchste Kampfkraft', en: 'Highest Combat Power' }, primary: true },
            { href: '#/guides/farming-power', label: { de: 'Farming & Power', en: 'Farming & power' } },
            { href: '#/guides/crafting-gear', label: { de: 'Handwerk: Waffen & Rüstung', en: 'Crafting gear' } },
            { href: '#/guides/speedrun-45', label: { de: 'Speedrun auf 45', en: 'Speedrun to 45' } },
            { href: '#/top', label: { de: 'Top 10 ansehen', en: 'See the top 10' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Der Fahrplan', en: 'The road map' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der Weg nach Stufe 45 läuft über **Tore der Gegenstandsstufe**: Jedes öffnet den Inhalt, der die nächste Ausrüstung bringt. Wer die Tore schnell nimmt, farmt jede Woche die bessere Stufe. Fünf Phasen:',
            en: 'The road after level 45 runs through **item level gates**: each one opens the content that drops the next gear. Take the gates fast and you farm the better tier every week. Five phases:',
          },
        },
        {
          type: 'flow',
          title: { de: 'Fünf Phasen von 45 bis an die Spitze', en: 'Five phases from 45 to the top' },
          caption: {
            de: 'Ziele: Gegenstandsstufe → Kampfkraft. Kampfkraft aus metabot.gg (13.076 Charaktere, 8.10.) und den Top 80 (AION2 Index, 18.10.). Die Zeiten sind Schätzungen für jemanden, der jeden Tag spielt; Phase 4 und 5 hängen vor allem am Kina.',
            en: 'Targets: item level → Combat Power. Combat Power from metabot.gg (13,076 characters, 8 Oct) and the top 80 (AION2 Index, 18 Oct). The times are estimates for someone who plays every day; phases 4 and 5 depend mostly on Kina.',
          },
          items: [
            {
              title: { de: 'Erstes Set', en: 'First gear set' },
              tag: num('1,000 → 1,400'),
              tone: 'slate',
              text: { de: 'Einmal-Inhalte, Gürtel und Amulett, Ausrüstung 54, alles auf +10. ≈46K → ≈66K · 2–3 Tage', en: 'One-time content, belt and amulet, gear 54, everything to +10. ≈46K → ≈66K · 2–3 days' },
            },
            {
              title: { de: '70er-Ausrüstung, erste Arcana', en: '70 gear, first Arcana' },
              tag: num('1,400 → 2,100'),
              tone: 'blue',
              text: { de: 'Urugugu und Vakron, Transcendence Stufe 1–2, Nightmare, Ascension. ≈66K → ≈100K · 4–6 Tage', en: 'Urugugu and Vakron, Transcendence stage 1–2, Nightmare, Ascension. ≈66K → ≈100K · 4–6 days' },
            },
            {
              title: { de: '86er-Ausrüstung, Unique-Arcana', en: '86 gear, Unique Arcana' },
              tag: num('2,100 → 2,800'),
              tone: 'teal',
              text: { de: 'Fire Temple, Ferocious Horn Den, Transcendence Stufe 3–4, White/Dark Dragon Lord. · 1–2 Wochen', en: 'Fire Temple, Ferocious Horn Den, Transcendence stage 3–4, White/Dark Dragon Lord. · 1–2 weeks' },
            },
            {
              title: { de: 'Endgame-Ausrüstung 102', en: 'Endgame gear 102' },
              tag: num('2,800 → 3,050'),
              tone: 'gold',
              text: { de: 'Ludra jede Woche, Splendent Wise/Ebony Platz für Platz, +15 auf Endteilen. → ≈200K+ · 4–6 Wochen mit Twinks', en: 'Ludra every week, Splendent Wise/Ebony slot by slot, +15 on final pieces. → ≈200K+ · 4–6 weeks with alts' },
            },
            {
              title: { de: 'Die letzten 10 %', en: 'The last 10%' },
              tag: num('3,050 → 3,450+'),
              tone: 'rose',
              text: { de: 'Amplified +1 bis +5, Azphel-Tafel, Stigmen, Titel. → 225–265K · Monate solo', en: 'Amplified +1 to +5, Azphel board, stigmas, titles. → 225–265K · months solo' },
            },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Die Phasen im Detail', en: 'The phases in detail' },
          head: [
            { de: 'Phase', en: 'Phase' },
            { de: 'Gegenstandsstufe', en: 'Item level' },
            { de: 'Kampfkraft', en: 'Combat Power' },
            { de: 'Öffnet unterwegs', en: 'Opens on the way' },
            { de: 'Zeit (Schätzung)', en: 'Time (estimate)' },
          ],
          rows: [
            ['1', num('1,000 → 1,400'), '≈46K → ≈66K', { de: 'Abyss (1.000) · Ascension Easy (1.000) · Conquest Stufe 2 (1.400)', en: 'Abyss (1,000) · Ascension Easy (1,000) · Conquest tier 2 (1,400)' }, { de: '2–3 Tage', en: '2–3 days' }],
            ['2', num('1,400 → 2,100'), '≈66K → ≈100K', { de: 'Ascension Normal (1.500) · Transcendence 1 (1.600) und 2 (1.900) · Conquest Stufe 3 (2.100)', en: 'Ascension Normal (1,500) · Transcendence 1 (1,600) and 2 (1,900) · Conquest tier 3 (2,100)' }, { de: '4–6 Tage', en: '4–6 days' }],
            ['3', num('2,100 → 2,800'), { de: 'keine Daten (zwischen ≈100K und ≈200K)', en: 'no data (between ≈100K and ≈200K)' }, { de: 'Ascension Hard (2.000) · Transcendence 3 (2.200) und 4 (2.500) · Ludra (≈2.800)', en: 'Ascension Hard (2,000) · Transcendence 3 (2,200) and 4 (2,500) · Ludra (≈2,800)' }, { de: '1–2 Wochen', en: '1–2 weeks' }],
            ['4', num('2,800 → 3,050'), { de: '≈200K+ (Top 80 bei 2.950–3.299: 214K)', en: '≈200K+ (top 80 at 2,950–3,299: 214K)' }, { de: 'Ludra jede Woche', en: 'Ludra every week' }, { de: '4–6 Wochen mit Twinks · ≈3 Monate solo', en: '4–6 weeks with alts · ≈3 months solo' }],
            ['5', num('3,050 → 3,450+'), '225–265K', '–', { de: '≈2 Monate mit 7 Twinks · ≈6 Monate solo', en: '≈2 months with 7 alts · ≈6 months solo' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Woher die Zeiten kommen', en: 'Where the times come from' },
          text: {
            de: 'Gemessene Zeiten pro Phase gibt es für den globalen Server nicht – die Spalte ist eine Schätzung. Zwei echte Uhren: Am 8.10., acht Tage nach dem Early Access, hatten **9 % von 13.076** gelisteten Charakteren schon Gegenstandsstufe 2.000+ (metabot.gg). Am 18.10., nach 18 Tagen, standen die Top 80 bei 2.950–3.479. Phase 4 und 5 sind aus dem Kina gerechnet: +15 auf 14 Teilen kostet ≈197 Mio., Amplified +5 ≈367 Mio. – bei ≈15 Mio. pro Woche solo oder ≈45–60 Mio. mit 8 Charakteren (Einkommen aus Farming & Power).',
            en: 'There are no measured times per phase for the global server – the column is an estimate. Two real clocks: on 8 Oct, eight days after early access, **9% of 13,076** ranked characters already had item level 2,000+ (metabot.gg). On 18 Oct, after 18 days, the top 80 were at 2,950–3,479. Phases 4 and 5 are worked out from Kina: +15 on 14 pieces costs ≈197M, Amplified +5 ≈367M – at ≈15M a week solo or ≈45–60M with 8 characters (income from Farming & power).',
          },
        },
      ],
    },
    {
      title: { de: 'Wie schnell ist realistisch?', en: 'How fast is realistic?' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die beste Uhr ist die Spitze selbst. Der Early Access begann am 30.9., der kostenlose Start folgte am 5.10. Am 18.10., 18 Tage nach dem Early Access, steht der Median der Top 80 bei Gegenstandsstufe 3.352 – und sie legen immer noch rund **50K Kampfkraft pro Woche** zu:',
            en: 'The best clock is the top itself. Early access began on 30 Sep, the free launch followed on 5 Oct. On 18 Oct, 18 days after early access, the median of the top 80 is at item level 3,352 – and they still gain about **50K Combat Power per week**:',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kampfkraft-Zuwachs in 7 Tagen – Top 10 jeder Klasse', en: 'Combat Power gained in 7 days – top 10 of each class' },
          caption: {
            de: 'AION2 Index, 18.10.2026: 71 der 80 Charaktere mit Wert. Median +50,6K (gold), mittlere Hälfte +39,7K bis +64,9K. Rot: zwei Ausreißer mit ≈+200K.',
            en: 'AION2 Index, 2026-10-18: 71 of the 80 characters with a value. Median +50.6K (gold), middle half +39.7K to +64.9K. Red: two outliers with ≈+200K.',
          },
          unit: { de: 'Spieler', en: 'players' },
          items: [
            { label: { de: 'unter 30K', en: 'under 30K' }, value: 10, tone: 'teal' },
            { label: '30–40K', value: 8, tone: 'teal' },
            { label: '40–50K', value: 17, tone: 'teal' },
            { label: '50–60K', value: 10, tone: 'gold', note: { de: 'Median', en: 'median' } },
            { label: '60–70K', value: 13, tone: 'teal' },
            { label: '70–80K', value: 8, tone: 'teal' },
            { label: '80–100K', value: 3, tone: 'teal' },
            { label: { de: 'über 100K', en: 'over 100K' }, value: 2, tone: 'rose' },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Auch oben geht es schnell weiter:** Der Median stieg in einer Woche von ≈175K auf ≈225,5K (+30 %). Vergleiche dich deshalb immer mit Werten vom selben Tag.',
              en: '**Even at the top it keeps moving fast:** the median rose from ≈175K to ≈225.5K in one week (+30%). So always compare yourself with values from the same day.',
            },
            {
              de: '**Zwei der 80 legten ≈200K in sieben Tagen zu** – eine Woche vorher hatten sie 10K und 24K. Die schnellsten Aufsteiger auf der Startseite von AION2 Index zeigen +160K bis +203K pro Woche (19.10.). Ob das neue Charaktere mit großem Kina-Budget sind oder Lücken im Verlauf der Quelle, verraten die Daten nicht.',
              en: '**Two of the 80 gained ≈200K in seven days** – a week earlier they had 10K and 24K. The fastest climbers on the AION2 Index home page show +160K to +203K a week (19 Oct). Whether these are new characters with a big Kina budget or gaps in the source’s history, the data does not say.',
            },
            {
              de: '**Am Ende bestimmt das Kina das Tempo:** Die Verzauberung eines Top-Sets kostet im Schnitt ≈577 Mio. Kina (Abschnitt „Am meisten Gegenstandsstufe pro Kina“). Das ist mehr, als jede Farm-Route in drei Wochen einbringt – rechne in Phase 4 und 5 also mit mehr Zeit als die Spitze.',
              en: '**In the end Kina sets the pace:** enhancing a top set costs ≈577M Kina on average (section “Most item level per Kina”). That is more than any farming route earns in three weeks – so expect phases 4 and 5 to take you longer than the top.',
            },
          ],
        },
        { type: 'links', items: [{ href: '#/top', label: { de: 'Top 10 deiner Klasse ansehen', en: 'See the top 10 of your class' } }] },
      ],
    },
    {
      title: { de: 'Gegenstandsstufe und Kampfkraft', en: 'Item level and Combat Power' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Kampfkraft rechnet der Server, die Formel ist nicht öffentlich. Am engsten hängt sie an der **Gegenstandsstufe** (Zusammenhang 0,97 bei 13.076 Charakteren, metabot.gg). Das Verhältnis ist aber nicht fest:',
            en: 'The server computes Combat Power and the formula is not public. It tracks **item level** most closely (correlation 0.97 across 13,076 characters, metabot.gg). But the ratio is not fixed:',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kampfkraft nach Gegenstandsstufe (Median)', en: 'Combat Power by item level (median)' },
          caption: {
            de: 'Grau: 13.076 gelistete Charaktere am 8.10. (metabot.gg). Gold: die Top 80 am 18.10. (AION2 Index) – sie sind die Stärksten nach Kampfkraft, ihre Balken sind also der beste Fall für diese Gegenstandsstufe.',
            en: 'Grey: 13,076 ranked characters on 8 Oct (metabot.gg). Gold: the top 80 on 18 Oct (AION2 Index) – they are the strongest by Combat Power, so their bars are the best case for that item level.',
          },
          items: [
            { label: { de: 'unter 1.000', en: 'under 1,000' }, value: 40547, display: num('40.5K'), note: { de: '3.665 Charaktere', en: '3,665 characters' }, tone: 'slate' },
            { label: num('1,000–1,099'), value: 49881, display: num('49.9K'), note: num('1,649'), tone: 'slate' },
            { label: num('1,100–1,199'), value: 56248, display: num('56.2K'), note: num('1,664'), tone: 'slate' },
            { label: num('1,200–1,299'), value: 61098, display: num('61.1K'), note: num('1,561'), tone: 'slate' },
            { label: num('1,300–1,499'), value: 66459, display: num('66.5K'), note: num('1,953'), tone: 'slate' },
            { label: num('1,500–1,999'), value: 77807, display: num('77.8K'), note: num('1,410'), tone: 'slate' },
            { label: num('2,000+'), value: 100769, display: num('100.8K'), note: num('1,174'), tone: 'slate' },
            { label: num('2,950–3,299'), value: 213627, display: num('213.6K'), note: { de: 'Top 80: 31', en: 'top 80: 31' }, tone: 'gold' },
            { label: num('3,300–3,399'), value: 225741, display: num('225.7K'), note: '22', tone: 'gold' },
            { label: num('3,400+'), value: 243039, display: num('243.0K'), note: '27', tone: 'gold' },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Bis ≈2.000 ist jeder Punkt Gegenstandsstufe rund **45 Kampfkraft** wert (Anpassung von metabot.gg). An der Spitze sind es **68–71 pro Punkt** (Median der Top 80: 69). Warum, sagt das Spiel nicht. Wahrscheinlich sind es die Teile, die Kampfkraft, aber kaum Gegenstandsstufe bringen: Stigma-Stufen, Skillstufen (jede Unique-Arcana-Karte gibt 4), Titel und Statuen. Darum lohnen sie sich oben mehr als unten.',
            en: 'Up to ≈2,000 every item level point is worth about **45 Combat Power** (metabot.gg’s fit). At the top it is **68–71 per point** (median of the top 80: 69). The game does not say why. Most likely it is the parts that add Combat Power but little item level: stigma levels, skill levels (every Unique Arcana card gives 4), titles and statues. That is why they pay more at the top than at the bottom.',
          },
        },
        { type: 'heading', text: { de: 'Stigmen: billig – in der richtigen Reihenfolge', en: 'Stigmas: cheap – in the right order' } },
        {
          type: 'bars',
          title: { de: 'Kampfkraft pro 10 Stigma Shards', en: 'Combat Power per 10 Stigma Shards' },
          caption: {
            de: 'Schätzung. Shard-Kosten pro Stufe aus den Client-Daten (metabot.gg). Annahme: Jede Stigma-Stufe bringt etwa gleich viel, ≈600 Kampfkraft – unsere Anpassung über die Top 80 (mit Klasse herausgerechnet), passend zur koreanischen Messung von 10–15K für ein Stigma von 1 auf 20.',
            en: 'Estimate. Shard costs per level from the client data (metabot.gg). Assumption: every stigma level gives about the same, ≈600 Combat Power – our fit across the top 80 (with class taken out), in line with the Korean measurement of 10–15K for one stigma from 1 to 20.',
          },
          items: [
            { label: { de: 'Stufe 1–5', en: 'Level 1–5' }, value: 6000, display: num('≈6,000'), note: { de: '1 Shard pro Stufe', en: '1 shard per level' }, tone: 'green' },
            { label: { de: 'Stufe 6–10', en: 'Level 6–10' }, value: 3000, display: num('≈3,000'), note: { de: '2 Shards pro Stufe', en: '2 shards per level' }, tone: 'teal' },
            { label: { de: 'Stufe 11–15', en: 'Level 11–15' }, value: 1500, display: num('≈1,500'), note: { de: '4 Shards pro Stufe', en: '4 shards per level' }, tone: 'blue' },
            { label: { de: 'Stufe 16–20', en: 'Level 16–20' }, value: 750, display: '≈750', note: { de: '8 Shards pro Stufe', en: '8 shards per level' }, tone: 'rose' },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Alle vier Stigmen erst auf 10, dann auf 15, erst dann auf 20.** Stufe 16–20 kostet 8 Shards pro Stufe – achtmal so viel wie Stufe 1–5.',
              en: '**All four stigmas to 10 first, then to 15, only then to 20.** Level 16–20 costs 8 shards per level – eight times as much as level 1–5.',
            },
            {
              de: '**Die Spitze macht es genauso:** Nur 1 der 80 hat alle vier Stigmen auf 20. Die meisten haben zwei oder drei auf 20 und den Rest auf 10–15 (am häufigsten 20/20/20/15 und 20/20/15/15).',
              en: '**The top do the same:** only 1 of the 80 has all four stigmas at 20. Most have two or three at 20 and the rest at 10–15 (most common: 20/20/20/15 and 20/20/15/15).',
            },
            {
              de: '**Woher die Shards kommen:** ≈29 aus dem Leveln (Stufe 23–45), 200 aus dem Abyss-Shop in vier Schritten zu je 50 für 10K, 15K, 20K und 25K Abyss-Punkte, bis zu 35 aus dem Nightmare-Shop (je 1.500 Phantasmal Fragments) und bis zu 35 aus dem Shugo-Festa-Shop (je 300 Centuryroot Tokens).',
              en: '**Where the shards come from:** ≈29 from levelling (levels 23–45), 200 from the Abyss Shop in four steps of 50 for 10K, 15K, 20K and 25K Abyss Points, up to 35 from the Nightmare shop (1,500 Phantasmal Fragments each) and up to 35 from the Shugo Festa shop (300 Centuryroot Tokens each).',
            },
            {
              de: '**Titel und Statuen:** Das oberste Fünftel hatte am 8.10. im Median 191 Titel (metabot.gg) – Titel zählen auch, wenn du sie nicht trägst. Die Statue Transcendent Bakarma gibt ≈1K für 10 Draupnir-Conquest-Abschlüsse auf Normal.',
              en: '**Titles and statues:** the top fifth had a median of 191 titles on 8 Oct (metabot.gg) – titles count even when you don’t wear them. The Transcendent Bakarma statue gives ≈1K for 10 Draupnir Conquest clears on Normal.',
            },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/stigma', label: { de: 'Stigmen planen', en: 'Plan stigmas' } },
            { href: '#/guides/combat-power', label: { de: 'Was jeder Schritt an Kampfkraft bringt', en: 'What each step gives in Combat Power' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Woraus die Gegenstandsstufe besteht', en: 'What item level is made of' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Gegenstandsstufe ist eine Summe. Das Spiel zeigt nur das Ergebnis, aber die Ausrüstung der Top 80 erklärt es fast genau: Unsere Anpassung liegt bei 78 Charakteren im Mittel nur ≈27 Stufen daneben (von ≈3.350). Es zählen:',
            en: 'Item level is a sum. The game only shows the total, but the gear of the top 80 explains it almost exactly: our fit is off by only ≈27 levels on average (out of ≈3,350) for 78 characters. What counts:',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Jedes Ausrüstungsteil** mit seiner eigenen Stufe – z. B. 86 für Nuakum, 102 für Splendent Wise/Ebony Dragon Lord. Auf Global ist bei 102 Schluss.', en: '**Every gear piece** with its own level – e.g. 86 for Nuakum, 102 for Splendent Wise/Ebony Dragon Lord. On Global it stops at 102.' },
            { de: '**+1 pro Verzauberungsstufe** (+0 bis +15).', en: '**+1 per enhancement level** (+0 to +15).' },
            { de: '**≈+5 pro Amplified-Stufe** – eine Amplified-Stufe zählt wie fünf normale (unsere Anpassung: 4,9).', en: '**≈+5 per Amplified level** – one Amplified level counts like five normal ones (our fit: 4.9).' },
            { de: '**≈+1 pro Daevanion-Knoten**, den du öffnest (unsere Anpassung; games.gg nennt +1 pro ausgegebenem Kristall).', en: '**≈+1 per Daevanion node** you open (our fit; games.gg says +1 per crystal spent).' },
            { de: '**Arcana:** 20 (Common), 40 (Rare), 60 (Epic) oder 80 (Unique) pro Karte, +1 pro Kartenstufe.', en: '**Arcana:** 20 (Common), 40 (Rare), 60 (Epic) or 80 (Unique) per card, +1 per card level.' },
            { de: '**Manasteine:** etwa +1 bis +4 pro Stein (games.gg) – jeden Sockel füllen, auch mit billigen Steinen.', en: '**Manastones:** about +1 to +4 per stone (games.gg) – fill every socket, even with cheap stones.' },
          ],
        },
        {
          type: 'shares',
          title: { de: 'Woher ≈3.400 Gegenstandsstufe kommen', en: 'Where ≈3,400 item level come from' },
          caption: {
            de: 'Median der 46 Spieler aus den Top 80, die alle 14 Hauptplätze auf 102 haben (Gegenstandsstufe 3.404; AION2 Index, 18.10.), nach den Regeln oben aufgeteilt. „Der Rest“ ist, was übrig bleibt: Gürtel, Amulett, zwei Armreifen, zwei Runen und Manasteine.',
            en: 'Median of the 46 players in the top 80 with all 14 main slots at 102 (item level 3,404; AION2 Index, 18 Oct), split by the rules above. “The rest” is what is left: belt, amulet, two bracelets, two runes and manastones.',
          },
          unit: 'iLv',
          items: [
            { label: { de: 'Ausrüstung (14 Teile)', en: 'Gear (14 pieces)' }, value: 1428, note: '14 × 102', tone: 'gold' },
            { label: { de: 'Der Rest', en: 'The rest' }, value: 722, note: { de: 'Gürtel, Amulett, Armreifen, Runen, Manasteine', en: 'belt, amulet, bracelets, runes, manastones' }, tone: 'slate' },
            { label: 'Arcana', value: 424, note: { de: '5 × 80 + Kartenstufen', en: '5 × 80 + card levels' }, tone: 'violet' },
            { label: 'Amplified', value: 350, note: '14 × +5 × 5', tone: 'rose' },
            { label: { de: 'Daevanion-Knoten', en: 'Daevanion nodes' }, value: 281, note: { de: '281 von 532', en: '281 of 532' }, tone: 'teal' },
            { label: { de: 'Verzauberung', en: 'Enhancement' }, value: 210, note: '14 × +15', tone: 'blue' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Was daraus folgt', en: 'What follows from it' },
          text: {
            de: '**Die Ausrüstungsstufe ist der größte Hebel:** 86 → 102 sind +16 pro Platz, +224 für alle 14. **Amplified bringt mehr als alle Verzauberungen von +1 bis +15 zusammen** (350 gegen 210) – kommt aber zuletzt, weil es +15 voraussetzt. **Den Rest (≈720) vergessen viele:** Gürtel und Amulett (einmal pro Charakter, Rare → Epic → Unique), Armreifen, Runen und Manasteine sind frühe, billige Gegenstandsstufe.',
            en: '**The gear tier is the biggest lever:** 86 → 102 is +16 per slot, +224 for all 14. **Amplified gives more than all enhancement from +1 to +15 together** (350 vs 210) – but it comes last because it needs +15 first. **Many forget the rest (≈720):** belt and amulet (once per character, Rare → Epic → Unique), bracelets, runes and manastones are early, cheap item level.',
          },
        },
      ],
    },
    {
      title: { de: 'Am meisten Gegenstandsstufe pro Kina', en: 'Most item level per Kina' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Jeder Schritt kostet Kina und Steine. So viel kostet **ein Punkt Gegenstandsstufe** an einem Teil der Stufe 102 im Schnitt – gerechnet aus den Chancen (mit dem Bonus nach jedem Fehlschlag) und den Kosten pro Versuch aus den Client-Daten. Die Summen treffen die Durchschnitte von metabot.gg (+10 → +15 ≈14,1 Mio., Amplified +5 ≈26,2 Mio.).',
            en: 'Every step costs Kina and stones. This is what **one item level point** costs on average on an item level 102 piece – worked out from the chances (with the bonus after every failure) and the costs per try in the client data. The sums match metabot.gg’s averages (+10 → +15 ≈14.1M, Amplified +5 ≈26.2M).',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kina pro Punkt Gegenstandsstufe (Teil der Stufe 102)', en: 'Kina per item level point (item level 102 piece)' },
          caption: {
            de: 'Erwartungswert in Kina, ohne Enhance Stones und Amplify Stones. Amplified zählt mit 5 Stufen pro Stufe. Gold = immer lohnend, blau/violett = gutes Verhältnis, rot = teuer. Chancen und Kosten pro Versuch: Client-Daten (metabot.gg); Rechnung: Daevaforge.',
            en: 'Expected Kina, not counting Enhance Stones and Amplify Stones. Amplified counts 5 item levels per level. Gold = always worth it, blue/violet = good value, red = expensive. Chances and costs per try: client data (metabot.gg); calculation: Daevaforge.',
          },
          items: [
            { label: { de: '+1 bis +10 (sicher)', en: '+1 to +10 (safe)' }, value: 0.092, display: '92K', note: { de: 'gelingt immer', en: 'always succeeds' }, tone: 'gold' },
            { label: '+10 → +11', value: 0.54, display: num('0.54M'), note: pct(65), tone: 'blue' },
            { label: '+11 → +12', value: 1.0, display: num('1.00M'), note: pct(50), tone: 'blue' },
            { label: '+12 → +13', value: 2.1, display: num('2.10M'), note: pct(35), tone: 'rose' },
            { label: '+13 → +14', value: 4.06, display: num('4.06M'), note: pct(25), tone: 'rose' },
            { label: '+14 → +15', value: 6.37, display: num('6.37M'), note: pct(20), tone: 'rose' },
            { label: 'Amplified +1', value: 0.18, display: num('0.18M'), note: pct(66), tone: 'violet' },
            { label: 'Amplified +2', value: 0.34, display: num('0.34M'), note: pct(50), tone: 'violet' },
            { label: 'Amplified +3', value: 0.75, display: num('0.75M'), note: pct(33), tone: 'violet' },
            { label: 'Amplified +4', value: 1.37, display: num('1.37M'), note: pct(25), tone: 'rose' },
            { label: 'Amplified +5', value: 2.61, display: num('2.61M'), note: pct(20), tone: 'rose' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Sicheres +10 auf 14 Teilen (102)', en: 'Safe +10 on 14 pieces (102)' }, value: { de: '≈12,9 Mio. Kina + ≈514.000 Enhance Stones', en: '≈12.9M Kina + ≈514,000 Enhance Stones' } },
            { label: { de: '+10 → +15 auf 14 Teilen', en: '+10 → +15 on 14 pieces' }, value: { de: '≈197 Mio. Kina im Schnitt', en: '≈197M Kina on average' } },
            { label: { de: 'Amplified +5 auf 14 Teilen', en: 'Amplified +5 on 14 pieces' }, value: { de: '≈367 Mio. Kina + ≈2.700 Amplify Stones im Schnitt', en: '≈367M Kina + ≈2,700 Amplify Stones on average' } },
            { label: { de: 'Dein Einkommen (Farming & Power)', en: 'Your income (Farming & power)' }, value: { de: '≈11–15 Mio. pro Woche solo · ≈45–60 Mio. mit 8 Charakteren und Membership', en: '≈11–15M per week solo · ≈45–60M with 8 characters and Membership' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Reihenfolge an einem Teil, das bleibt', en: 'The order on a piece that stays' },
          text: {
            de: 'Zuerst sicheres +10 auf **allem**. Dann +11 und +12 (bis 1 Mio. pro Punkt). Wenn du ein Teil auf +15 bringst, mach **direkt mit Amplified +1 und +2 weiter**: Mit ≈0,2–0,3 Mio. pro Punkt sind sie nach dem sicheren +10 die billigste Gegenstandsstufe. Von +12 bis Amplified +2 sind es im Schnitt ≈15 Mio. für 13 Punkte (≈1,2 Mio. pro Punkt) – +13 bis +15 an einem zweiten Teil kostet ≈4,2 Mio. pro Punkt. Amplified +3 bis +5 kommt zuletzt.',
            en: 'First the safe +10 on **everything**. Then +11 and +12 (up to 1M per point). When you take a piece to +15, **go straight on to Amplified +1 and +2**: at ≈0.2–0.3M per point they are the cheapest item level after the safe +10. From +12 to Amplified +2 averages ≈15M for 13 points (≈1.2M per point) – +13 to +15 on a second piece costs ≈4.2M per point. Amplified +3 to +5 comes last.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Das echte Tor ist Kina', en: 'The real gate is Kina' },
          text: {
            de: 'Ein Top-Set (14 Teile auf +15 und Amplified +5) kostet im Schnitt **≈577 Mio. Kina**. Bei ≈15 Mio. pro Woche sind das solo ≈38 Wochen, mit 8 Charakteren (≈45–60 Mio.) immer noch ≈10–13 Wochen. Bis ≈2.800 bestimmt deine Spielzeit das Tempo, danach dein Kina. Scheitern kostet übrigens nur Material: Bei Waffe, Rüstung und Schmuck geht keine Stufe verloren.',
            en: 'A top set (14 pieces at +15 and Amplified +5) costs **≈577M Kina** on average. At ≈15M a week that is ≈38 weeks solo, and with 8 characters (≈45–60M) still ≈10–13 weeks. Up to ≈2,800 your play time sets the pace, after that your Kina. Failing only costs materials, by the way: weapons, armour and jewellery never lose a level.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/farming-power', label: { de: 'Mehr Kina: Farming & Power', en: 'More Kina: Farming & power' } },
            { href: '#/guides/combat-power', label: { de: 'Chancen und Kosten im Detail', en: 'Chances and costs in detail' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Phase 1: frische 45 bis 1.400', en: 'Phase 1: fresh 45 to 1,400' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ziel: **1.400** – Conquest Stufe 2 (Urugugu Canyon, Vakron Sky Island) mit ≈1,5× Kina pro Würfel. Fast alles hier ist einmalig oder billig. Mach es, bevor du irgendetwas Großes ausgibst.',
            en: 'Goal: **1,400** – Conquest tier 2 (Urugugu Canyon, Vakron Sky Island) with ≈1.5× the Kina per cube. Nearly everything here is one-time or cheap. Do it before you spend anything big.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Zuerst die Einmal-Inhalte', en: 'One-time content first' },
              text: {
                de: 'Regional Quests (58 pro Fraktion, je 1 Daevanion-Kristall), Sealed Dungeons (61, je 2 Kristalle) und Strongholds: ≈180 Kristalle plus Ausrüstung für deine schwächsten Plätze. Die Story abschließen – sie braucht Gegenstandsstufe 1.000 und einen Besuch im Abyss.',
                en: 'Regional Quests (58 per faction, 1 Daevanion Crystal each), Sealed Dungeons (61, 2 crystals each) and Strongholds: ≈180 crystals plus gear for your weakest slots. Finish the story – it needs item level 1,000 and a visit to the Abyss.',
              },
            },
            {
              title: { de: 'Jeden Kristall sofort ausgeben', en: 'Spend every crystal right away' },
              text: {
                de: 'Ein Kristall im Inventar bringt nichts, ein offener Knoten Gegenstandsstufe. Plane den Weg vorher im Daevanion-Planer – die Skill-Knoten der ersten vier Tafeln geben auch Skillstufen.',
                en: 'A crystal in your bag gives nothing, an open node gives item level. Plan the path in the Daevanion planner first – the skill nodes of the first four boards also give skill levels.',
              },
            },
            {
              title: { de: 'Gürtel und Amulett hochziehen', en: 'Upgrade belt and amulet' },
              text: {
                de: 'Rare +10 → Epic +10 → Unique (Stufe 65), jeweils per Substance Morph und nur einmal pro Charakter. Alle 80 Top-Spieler tragen den Noble Belt (53 auf +10), 74 das Revelation Amulet (55 auf +10).',
                en: 'Rare +10 → Epic +10 → Unique (level 65), each step by Substance Morph and only once per character. All 80 top players wear the Noble Belt (53 at +10), 74 the Revelation Amulet (55 at +10).',
              },
            },
            {
              title: { de: 'Krao Cave und Draupnir (54)', en: 'Krao Cave and Draupnir (54)' },
              text: {
                de: 'Conquest-Ausrüstung 54 für die schwächsten Plätze; Gear Change Vouchers werden zu dem Platz, der dir fehlt. 10 Abschlüsse von Draupnir Conquest auf Normal schalten die Statue Transcendent Bakarma frei (≈1K Kampfkraft).',
                en: 'Conquest gear 54 for your weakest slots; Gear Change Vouchers turn into the slot you are missing. 10 Draupnir Conquest clears on Normal unlock the Transcendent Bakarma statue (≈1K Combat Power).',
              },
            },
            {
              title: { de: 'Sicheres +10 auf alles Epic und Unique', en: 'Safe +10 on everything Epic and Unique' },
              text: {
                de: 'Gelingt immer und kostet unter 0,1 Mio. Kina pro Punkt Gegenstandsstufe. Jeden Manastein-Sockel füllen.',
                en: 'Always succeeds and costs under 0.1M Kina per item level point. Fill every manastone socket.',
              },
            },
            {
              title: { de: 'Den Handwerksberuf jetzt anfangen', en: 'Start your crafting profession now' },
              text: {
                de: 'Dragon Lord braucht Meisterschaft 55 (Waffen, Ring, Brust, Hose, Helm, Schulter) bzw. 60 (der Rest) – ≈11.300 bzw. ≈14.950 Erfahrung –, und jeder Platz braucht später drei Artisan’s-Splendent-Teile. Das läuft neben allem anderen her, also ab Tag eins.',
                en: 'Dragon Lord needs mastery 55 (weapons, ring, chest, legs, helm, pauldrons) or 60 (the rest) – ≈11,300 or ≈14,950 experience – and every slot later needs three Artisan’s Splendent pieces. It runs alongside everything else, so start on day one.',
              },
            },
            {
              title: { de: 'Alle vier Stigmen auf 10', en: 'All four stigmas to 10' },
              text: {
                de: 'Die Shards aus dem Leveln zuerst bis Stufe 5, dann bis 10 verteilen – die billigste Kampfkraft pro Shard.',
                en: 'Spread the shards from levelling up to level 5 first, then to 10 – the cheapest Combat Power per shard.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'In dieser Phase auslassen', en: 'Skip in this phase' },
          text: {
            de: '+11 und höher auf irgendetwas · Clash Runes über +1 (ein Fehlschlag kostet eine Stufe, ohne Bonus) · einen kompletten Abyss-Shop-Satz kaufen (KeenGamer) · beim Shugo Festival mitmachen, bevor du Reward Keys hast – ohne sie gibt es keine Belohnung (MeinMMO).',
            en: '+11 and higher on anything · Clash Runes past +1 (a failure costs a level, with no bonus) · buying a full Abyss shop set (KeenGamer) · joining the Shugo Festival before you have Reward Keys – without them there is no reward (MeinMMO).',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/daevanion', label: { de: 'Daevanion-Weg planen', en: 'Plan your Daevanion path' } },
            { href: '#/guides/crafting-gear', label: { de: 'Der schnellste Weg auf Meisterschaft 55', en: 'The fastest way to mastery 55' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Phase 2: 1.400 bis 2.100', en: 'Phase 2: 1,400 to 2,100' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ziel: **2.100** – Conquest Stufe 3 (Fire Temple, Ferocious Horn Den). Unterwegs öffnen Ascension Normal (1.500) und Transcendence (1.600 und 1.900) – die erste Quelle für Arcana.',
            en: 'Goal: **2,100** – Conquest tier 3 (Fire Temple, Ferocious Horn Den). On the way Ascension Normal (1,500) and Transcendence (1,600 and 1,900) open – the first source of Arcana.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Urugugu Canyon und Vakron Sky Island (70)', en: 'Urugugu Canyon and Vakron Sky Island (70)' },
              text: {
                de: 'Conquest-Ausrüstung 70 für jeden Platz darunter. Vakron Exploration dreimal abholen: Mit zwei Gear Change Vouchers und Kina wird daraus ein sicherer Vakron Guard (70).',
                en: 'Conquest gear 70 for every slot below it. Claim Vakron Exploration three times: with two Gear Change Vouchers and Kina that becomes a guaranteed Vakron Guard (70).',
              },
            },
            {
              title: { de: 'Alle fünf Arcana-Plätze füllen', en: 'Fill all five Arcana slots' },
              text: {
                de: 'Transcendence Stufe 1 (1.600) gibt Rare-Karten (40), Stufe 2 (1.900) Epic (60). Ein leerer Platz ist 0 – schon eine Common-Karte bringt 20. Deus Research Base gibt Chalice, Compass und Bell, Shattered Arkanis Chalice, Parchment und Mirror: Du brauchst beide.',
                en: 'Transcendence stage 1 (1,600) gives Rare cards (40), stage 2 (1,900) Epic (60). An empty slot is 0 – even a Common card gives 20. Deus Research Base drops Chalice, Compass and Bell, Shattered Arkanis Chalice, Parchment and Mirror: you need both.',
              },
            },
            {
              title: { de: 'Ascension und Nightmare', en: 'Ascension and Nightmare' },
              text: {
                de: 'Ascension Normal ab 1.500: 3 Eintritte pro Woche, verbraucht beim Betreten – auf Punkte spielen. Nightmare zweimal am Tag: Phantasmal Fragments kaufen Daevanion-Kristalle und Stigma Shards.',
                en: 'Ascension Normal from 1,500: 3 entries a week, used up on entry – play for score. Nightmare twice a day: Phantasmal Fragments buy Daevanion Crystals and Stigma Shards.',
              },
            },
            {
              title: { de: 'Abyss für Stigma Shards', en: 'Abyss for Stigma Shards' },
              text: {
                de: 'Lower Reshanta ab 1.000: Abyss-Punkte kaufen im Abyss-Shop 50 Shards pro Schritt (10K, 15K, 20K, 25K). Alle vier Stigmen auf 15 bringen.',
                en: 'Lower Reshanta from 1,000: Abyss Points buy 50 shards per step in the Abyss Shop (10K, 15K, 20K, 25K). Take all four stigmas to 15.',
              },
            },
            {
              title: { de: 'Das erste Dragon-Lord-Teil', en: 'The first Dragon Lord piece' },
              text: {
                de: 'True/Star Dragon Lord (62) ab Meisterschaft 55 für einen Platz, der dir nicht droppt; normal → Splendent (70) ist ein Transfer-Rezept. Dieses Teil zu verzaubern ist nie verschwendet – die Transfer-Rezepte nehmen Verzauberung und Amplified mit.',
                en: 'True/Star Dragon Lord (62) from mastery 55 for a slot that doesn’t drop for you; normal → Splendent (70) is a transfer recipe. Enhancing this piece is never wasted – the transfer recipes keep enhancement and Amplified levels.',
              },
            },
            {
              title: { de: 'Jedes neue Teil sofort auf +10', en: 'Every new piece straight to +10' },
              text: {
                de: 'Vor allem anderen. Arcana-Karten, die du behältst, mit Training Arcana aufwerten.',
                en: 'Before anything else. Level the Arcana cards you keep with Training Arcana.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'In dieser Phase auslassen', en: 'Skip in this phase' },
          text: {
            de: 'Dein 70er-Teil zur Wahl schon in Vakron Exploration nehmen – die Conquest-Version lässt dich den Platz wählen, der dir fehlt (MeinMMO) · +11 auf 70er-Drops, die bald gehen · länger als nötig auf Transcendence Stufe 1–2 bleiben: Unique-Karten gibt es erst ab Stufe 3.',
            en: 'Taking your 70 pick already in Vakron Exploration – the Conquest version lets you choose the slot you are missing (MeinMMO) · +11 on 70 drops that will soon go · staying on Transcendence stage 1–2 longer than needed: Unique cards only come from stage 3.',
          },
        },
      ],
    },
    {
      title: { de: 'Phase 3: 2.100 bis 2.800', en: 'Phase 3: 2,100 to 2,800' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ziel: **≈2.800** – der Ludra-Raid (10 Spieler). Tore unterwegs: Transcendence Stufe 3 (2.200) und 4 (2.500), Ascension Hard (2.000) und die höchste Stufe (2.500).',
            en: 'Goal: **≈2,800** – the Ludra raid (10 players). Gates on the way: Transcendence stage 3 (2,200) and 4 (2,500), Ascension Hard (2,000) and the top tier (2,500).',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Fire Temple und Ferocious Horn Den (86)', en: 'Fire Temple and Ferocious Horn Den (86)' },
              text: {
                de: 'Nuakum-Ausrüstung und die Guard. Gear Change Vouchers zuerst für Guards (metabot.gg). Hier fallen auch Wrathful Mind, Will und Ego – die Zutaten der höheren Dragon-Lord-Stufen.',
                en: 'Nuakum gear and the guard. Spend Gear Change Vouchers on guards first (metabot.gg). These dungeons also drop Wrathful Mind, Will and Ego – the materials of the higher Dragon Lord tiers.',
              },
            },
            {
              title: { de: 'Vier Unique-Arcana auf Stufe 3, die Chalice auf Stufe 4', en: 'Four Unique Arcana at stage 3, the Chalice at stage 4' },
              text: {
                de: 'Stufe 3 (2.200) gibt Unique Compass, Bell, Parchment und Mirror; die Unique Chalice nur Stufe 4 (2.500). Jede Unique-Karte bringt 80 Gegenstandsstufe und 4 Skillstufen. Auf +5 braucht sie 93.000 Erfahrung – 19 Exalted Training Arcana.',
                en: 'Stage 3 (2,200) drops Unique Compass, Bell, Parchment and Mirror; the Unique Chalice only stage 4 (2,500). Every Unique card gives 80 item level and 4 skill levels. To +5 it needs 93,000 experience – 19 Exalted Training Arcana.',
              },
            },
            {
              title: { de: 'White/Dark Dragon Lord (78 → Splendent 86)', en: 'White/Dark Dragon Lord (78 → Splendent 86)' },
              text: {
                de: 'Per Transfer: dein Splendent-True-Teil + ein weiteres Artisan’s-Splendent-Teil desselben Platzes + Wrathful Mind und Will. Die Waffe zuerst.',
                en: 'By transfer: your Splendent True piece + another Artisan’s Splendent piece of the same slot + Wrathful Mind and Will. The weapon first.',
              },
            },
            {
              title: { de: 'Die vier Daevanion-Tafeln auf ≈60–70 %', en: 'The four Daevanion boards to ≈60–70%' },
              text: {
                de: 'Da stehen die Top 80 (Median 62, 60 und 60 von 88, 73 von 116). Azphel kommt später.',
                en: 'That is where the top 80 are (median 62, 60 and 60 of 88, 73 of 116). Azphel comes later.',
              },
            },
            {
              title: { de: '+11 und +12 auf Teilen, die bleiben', en: '+11 and +12 on pieces that stay' },
              text: {
                de: 'Bis ≈1 Mio. Kina pro Punkt. Nuakum ist bei vielen Top-Spielern Endausrüstung (23 % ihrer Rüstungsplätze, meist +15) – über +10 aber nur, wenn du diesen Platz nicht bald auf 102 herstellst.',
                en: 'Up to ≈1M Kina per point. Nuakum is end gear for many top players (23% of their armour slots, mostly +15) – but only go past +10 if you won’t craft that slot to 102 soon.',
              },
            },
            {
              title: { de: 'Höhere Ascension- und Nightmare-Stufen', en: 'Higher Ascension and Nightmare tiers' },
              text: {
                de: 'Ascension Hard ab 2.000, die höchste Stufe ab 2.500. Jeder Nightmare-Boss hat 10 Stufen.',
                en: 'Ascension Hard from 2,000, the top tier from 2,500. Every Nightmare boss has 10 tiers.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'In dieser Phase auslassen', en: 'Skip in this phase' },
          text: {
            de: 'Transcendence Stufe 1–2 farmen, sobald du Stufe 3 schaffst · Nebenwerte von Unique-Arcana umwandeln (2 Mio. Gebühr pro Karte), bevor alle fünf Unique sind · +13 bis +15 auf allem, was du ersetzt.',
            en: 'Farming Transcendence stage 1–2 once you can clear stage 3 · transmuting Unique Arcana sub-stats (2M fee per card) before all five are Unique · +13 to +15 on anything you will replace.',
          },
        },
      ],
    },
    {
      title: { de: 'Phase 4: 2.800 bis 3.050', en: 'Phase 4: 2,800 to 3,050' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ziel: **≈3.050** – jeder Hauptplatz auf 102, +15 auf Teilen, die bleiben. Ab hier bestimmen der eine Ludra-Kill pro Woche, die Handwerkszutaten und das Kina das Tempo.',
            en: 'Goal: **≈3,050** – every main slot at 102, +15 on pieces that stay. From here the one Ludra kill a week, the crafting materials and Kina set the pace.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Ludra jede Woche', en: 'Ludra every week' },
              text: {
                de: 'Ein Endboss-Kill pro Woche (4 Raid-Versuche). Ludra gibt Waffen und Guard der Stufe 102, Will und Ego und Ludra Gear Vouchers: Eine Ludra-Waffe + 2 Vouchers + 10 Mio. Kina werden zur Waffenkiste mit freier Wahl, 3 Vouchers + 5 Mio. zum Abyssal Bracelet. Hinweis: Die Top 80 tragen keine Ludra-Waffe, sondern hergestellte – Ludra lohnt sich vor allem für Zutaten und Vouchers.',
                en: 'One final-boss kill a week (4 raid attempts). Ludra drops weapons and the guard at 102, Will and Ego and Ludra Gear Vouchers: a Ludra weapon + 2 vouchers + 10M Kina become a weapon chest of your choice, 3 vouchers + 5M the Abyssal Bracelet. Note: the top 80 wear no Ludra weapon but crafted ones – Ludra pays mostly for materials and vouchers.',
              },
            },
            {
              title: { de: 'Wise/Ebony (94) → Splendent (102), Platz für Platz', en: 'Wise/Ebony (94) → Splendent (102), slot by slot' },
              text: {
                de: 'Per Transfer wie die Stufen davor: Splendent White/Dark + ein drittes Artisan’s-Splendent-Teil + Wrathful Mind, Will und Ego. Rüstung und Schmuck auf 102 gibt es nur aus dem Handwerk.',
                en: 'By transfer like the tiers before: Splendent White/Dark + a third Artisan’s Splendent piece + Wrathful Mind, Will and Ego. Armour and jewellery at 102 only come from crafting.',
              },
            },
            {
              title: { de: 'Waffe und Schmuck zuerst, Rüstung zuletzt', en: 'Weapon and jewellery first, armour last' },
              text: {
                de: 'So sind die Top 80 vorgegangen (Diagramm unten). In einer koreanischen Messung (siehe „Höchste Kampfkraft“) brachte ein Schmuckstück ≈20K und ein Armreif ≈30K, ein Rüstungsteil nur ≈3–12K.',
                en: 'That is the order the top 80 went (chart below). In a Korean measurement (see “Highest Combat Power”) an accessory gave ≈20K and a bracelet ≈30K, an armour piece only ≈3–12K.',
              },
            },
            {
              title: { de: '+15 auf jedes 102er-Teil', en: '+15 on every 102 piece' },
              text: {
                de: 'Im Schnitt ≈14,1 Mio. Kina pro Teil ab +10. Danach gleich Amplified +1 und +2 (Abschnitt „Am meisten Gegenstandsstufe pro Kina“).',
                en: 'About 14.1M Kina per piece from +10 on average. Then straight on to Amplified +1 and +2 (section “Most item level per Kina”).',
              },
            },
            {
              title: { de: 'Armreifen, Amulett, Gürtel wie die Spitze', en: 'Bracelets, amulet, belt like the top' },
              text: {
                de: 'Ein Ascension Bracelet +15 plus ein Liberator oder Pilgrim Bracelet +10, Revelation Amulet +10, Noble Belt +10.',
                en: 'One Ascension Bracelet +15 plus a Liberator or Pilgrim Bracelet +10, Revelation Amulet +10, Noble Belt +10.',
              },
            },
            {
              title: { de: 'Zwei bis drei Stigmen auf 20', en: 'Two to three stigmas to 20' },
              text: {
                de: 'Das Muster der Spitze ist 20/20/20/15 – die letzten fünf Stufen des vierten Stigmas kosten noch einmal 40 Shards.',
                en: 'The pattern at the top is 20/20/20/15 – the last five levels of the fourth stigma cost another 40 shards.',
              },
            },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Anteil der Plätze auf Stufe 102 bei den Top 80', en: 'Share of slots at level 102 in the top 80' },
          caption: {
            de: 'Splendent Wise/Ebony Dragon Lord, AION2 Index, 18.10.2026. Schmuck = Halskette, zwei Ohrringe, zwei Ringe. Der Rest ist fast nur 86 (Nuakum oder Splendent White/Dark). Gladiatoren haben 100 % auf 102, Kleriker 56 %.',
            en: 'Splendent Wise/Ebony Dragon Lord, AION2 Index, 2026-10-18. Jewellery = necklace, two earrings, two rings. The rest is almost all 86 (Nuakum or Splendent White/Dark). Gladiators have 100% at 102, Clerics 56%.',
          },
          unit: '%',
          max: 100,
          items: [
            { label: { de: 'Waffe und Guard', en: 'Weapon and guard' }, value: 92.5, display: pct(93), note: { de: '148 von 160 Plätzen', en: '148 of 160 slots' }, tone: 'gold' },
            { label: { de: 'Schmuck', en: 'Jewellery' }, value: 88.5, display: pct(89), note: { de: '354 von 400', en: '354 of 400' }, tone: 'gold' },
            { label: { de: 'Rüstung', en: 'Armour' }, value: 67.9, display: pct(68), note: { de: '380 von 560', en: '380 of 560' }, tone: 'slate' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Season 2 verschiebt das Ziel', en: 'Season 2 moves the goal' },
          text: {
            de: 'Laut metabot.gg endet Season 1 am 16.12.2026. Season 2 bringt Submerged Life Temple, einen Transcendence-Dungeon mit den Toren 2.400 / 2.800 / 3.200 / 3.500 – die nächste Arcana-Quelle. Termine können sich mit Patches verschieben; schau im Spiel nach.',
            en: 'According to metabot.gg, Season 1 ends on 16 Dec 2026. Season 2 brings Submerged Life Temple, a Transcendence dungeon with the gates 2,400 / 2,800 / 3,200 / 3,500 – the next Arcana source. Dates can move with patches; check in game.',
          },
        },
      ],
    },
    {
      title: { de: 'Phase 5: die letzten 10 %', en: 'Phase 5: the last 10%' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ziel: **3.400+** und 225–265K Kampfkraft – da stehen die Top 80. Das sind noch ≈350 Gegenstandsstufe, fast alles aus Amplified Enhancement, und es kostet von allem am meisten Kina. So sieht das Ziel aus:',
            en: 'Goal: **3,400+** and 225–265K Combat Power – where the top 80 are. That is ≈350 more item level, nearly all from Amplified Enhancement, and it costs the most Kina of all. This is what the goal looks like:',
          },
        },
        {
          type: 'stats',
          items: [
            { value: pct(93), label: { de: 'der 1.120 Hauptteile auf +15', en: 'of the 1,120 main pieces at +15' }, tone: 'gold' },
            { value: pct(74), label: { de: 'auf Amplified +5', en: 'at Amplified +5' }, note: { de: '90 % auf +3 oder mehr', en: '90% at +3 or more' }, tone: 'rose' },
            { value: pct(70), label: { de: 'der Arcana-Karten auf +5', en: 'of the Arcana cards at +5' }, note: { de: 'alle 399 Karten Unique', en: 'all 399 cards Unique' }, tone: 'violet' },
            { value: '≈285', label: { de: 'Daevanion-Knoten offen (Median)', en: 'Daevanion nodes open (median)' }, note: { de: 'von 532', en: 'of 532' }, tone: 'teal' },
          ],
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Amplified +1 und +2 auf jedem 102er-Teil', en: 'Amplified +1 and +2 on every 102 piece' },
              text: {
                de: 'Die billigste Gegenstandsstufe, die noch übrig ist (≈0,2–0,3 Mio. Kina pro Punkt), jede Stufe ≈+5. Nur Unique auf +15; bei Stufe 86 ist bei +5 Schluss, bei Splendent-86-Handwerk bei +3. Jeder Amplify Stone braucht 4 Fragmente + 2.500 Enhance Stones.',
                en: 'The cheapest item level left (≈0.2–0.3M Kina per point), each level ≈+5. Unique at +15 only; level 86 stops at +5, Splendent 86 crafts at +3. Every Amplify Stone needs 4 fragments + 2,500 Enhance Stones.',
              },
            },
            {
              title: { de: 'Dann +3, +4, +5 – die Waffe zuerst', en: 'Then +3, +4, +5 – the weapon first' },
              text: {
                de: '+5 allein kostet im Schnitt ≈13 Mio. Kina. 79 der Top 80 haben ihre Waffe auf +15 mit Amplified +5.',
                en: '+5 alone averages ≈13M Kina. 79 of the top 80 have their weapon at +15 with Amplified +5.',
              },
            },
            {
              title: { de: 'Die Azphel-Tafel', en: 'The Azphel board' },
              text: {
                de: '152 Knoten, die Top 80 haben erst 23 % offen (Median 35). Azphel-Punkte gibt es in den Shops von Abyss, Arena und Battlefield und als Monolith-Belohnung – pro Knoten ≈+1 Gegenstandsstufe.',
                en: '152 nodes, the top 80 have only 23% open (median 35). Azphel points come from the Abyss, arena and battlefield shops and as Monolith rewards – ≈+1 item level per node.',
              },
            },
            {
              title: { de: 'Das letzte Stigma auf 20, Clash Runes auf +4', en: 'The last stigma to 20, Clash Runes to +4' },
              text: {
                de: 'Clash Runes verlieren bei einem Fehlschlag eine Stufe und haben keinen Bonus – die Spitze steht bei +3 bis +5, meist +4.',
                en: 'Clash Runes lose a level on a failure and have no bonus – the top sit at +3 to +5, mostly +4.',
              },
            },
            {
              title: { de: 'Titel und Sammlungen', en: 'Titles and collections' },
              text: {
                de: 'Jeder Titel zählt, auch wenn du ihn nicht trägst. Doppelte Skins im Closet kombinieren gibt etwas dauerhafte, accountweite Kampfkraft.',
                en: 'Every title counts, even when you don’t wear it. Combining duplicate skins in the closet gives a little permanent, account-wide Combat Power.',
              },
            },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Offene Daevanion-Knoten der Top 80', en: 'Daevanion nodes the top 80 have open' },
          caption: {
            de: 'Median pro Tafel, AION2 Index, 18.10.2026. Die Balkenlänge ist der Anteil der Tafel. Die Azphel-Tafel öffnet mit Stufe 45 und läuft über Azphel-Punkte statt Daevanion-Kristalle.',
            en: 'Median per board, AION2 Index, 2026-10-18. The bar length is the share of the board. The Azphel board opens at level 45 and runs on Azphel points instead of Daevanion Crystals.',
          },
          unit: '%',
          max: 100,
          items: [
            { label: 'Nezekan', value: 70.5, display: { de: '62 von 88', en: '62 of 88' }, note: pct(70), tone: 'teal' },
            { label: 'Zikel', value: 67.6, display: { de: '60 von 88', en: '60 of 88' }, note: pct(68), tone: 'teal' },
            { label: 'Vaizel', value: 68.2, display: { de: '60 von 88', en: '60 of 88' }, note: pct(68), tone: 'teal' },
            { label: 'Triniel', value: 62.9, display: { de: '73 von 116', en: '73 of 116' }, note: pct(63), tone: 'teal' },
            { label: 'Azphel', value: 22.7, display: { de: '35 von 152', en: '35 of 152' }, note: pct(23), tone: 'violet' },
          ],
        },
      ],
    },
    {
      title: { de: 'Zeit-Tore: keinen Reset verschenken', en: 'Time gates: never waste a reset' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der größte Teil der Stärke nach Stufe 45 steckt hinter **Wochenzählern**. Ein voller Zähler wächst nicht weiter – das ist verlorener Fortschritt, den kein Kina zurückholt. Die Woche startet am Mittwoch neu (metabot.gg: 16:00 Uhr Serverzeit; prüf es im Spiel).',
            en: 'Most of the power after level 45 sits behind **weekly counters**. A full counter stops growing – that is lost progress no Kina can buy back. The week resets on Wednesday (metabot.gg: 16:00 server time; check it in game).',
          },
        },
        {
          type: 'table',
          caption: { de: 'Wochenlimits auf dem globalen Server (Client-Daten, metabot.gg)', en: 'Weekly limits on the global server (client data, metabot.gg)' },
          head: [{ de: 'Inhalt', en: 'Content' }, { de: 'Limit', en: 'Limit' }, { de: 'Auffüllen', en: 'Refill' }, { de: 'Bringt', en: 'Gives' }],
          rows: [
            ['Conquest', { de: '21 Belohnungen, 35 Endboss-Kills pro Woche', en: '21 rewards, 35 final-boss kills per week' }, { de: '+1 alle 8 Std.', en: '+1 every 8 h' }, { de: 'Ausrüstung 54/70/86, Vouchers, Wrathful Mind, Will, Ego', en: 'Gear 54/70/86, vouchers, Wrathful Mind, Will, Ego' }],
            ['Exploration', { de: '7 Belohnungen pro Dungeon und Woche', en: '7 rewards per dungeon per week' }, { de: 'wöchentlich', en: 'weekly' }, { de: 'Materialien, Vakron Guard, Twinks', en: 'Materials, Vakron Guard, alts' }],
            ['Transcendence', { de: '14 Belohnungen, 28 Endboss-Kills pro Woche', en: '14 rewards, 28 final-boss kills per week' }, { de: '+1 alle 12 Std.', en: '+1 every 12 h' }, 'Arcana'],
            ['Ludra', { de: '1 Endboss-Kill pro Woche (4 Versuche)', en: '1 final-boss kill per week (4 attempts)' }, { de: 'wöchentlich', en: 'weekly' }, { de: 'Waffe/Guard 102, Ludra-Vouchers, Will, Ego', en: 'Weapon/guard 102, Ludra vouchers, Will, Ego' }],
            ['Ascension Trial', { de: '3 Eintritte (beim Betreten verbraucht)', en: '3 entries (used on entry)' }, { de: 'wöchentlich', en: 'weekly' }, { de: 'Ausrüstung, Enhance Stones', en: 'Gear, Enhance Stones' }],
            ['Nightmare', { de: '2 pro Tag, bis 14 ansparen (nur ein Abschluss zählt)', en: '2 a day, banks up to 14 (only a clear counts)' }, { de: 'täglich', en: 'daily' }, { de: 'Daevanion-Kristalle, Stigma Shards', en: 'Daevanion Crystals, Stigma Shards' }],
            ['Daily Dungeon', { de: '14 pro Woche und Server', en: '14 per week per server' }, '–', 'Enhance Stones'],
            ['Subjugation', { de: '3 Tickets', en: '3 tickets' }, { de: 'wöchentlich', en: 'weekly' }, { de: 'Materialien', en: 'Materials' }],
            ['Abyss', { de: '7 Std. pro Ebene', en: '7 h per layer' }, { de: 'wöchentlich', en: 'weekly' }, { de: 'Abyss-Punkte → Stigma Shards, Azphel', en: 'Abyss Points → Stigma Shards, Azphel' }],
          ],
        },
        { type: 'heading', text: { de: 'Wochen-Checkliste (Stärke)', en: 'Weekly checklist (power)' } },
        {
          type: 'checklist',
          items: [
            { de: 'Conquest-Zähler nie auf 21 – alle 8 Stunden kommt einer zurück', en: 'Conquest counter never at 21 – one comes back every 8 hours' },
            { de: 'Transcendence-Zähler nie auf 14 – alle 12 Stunden kommt einer zurück; immer die höchste Stufe, die du schaffst', en: 'Transcendence counter never at 14 – one comes back every 12 hours; always the highest stage you clear' },
            { de: 'Ludra-Endboss getötet (einmal pro Woche, ab ≈2.800)', en: 'Ludra final boss killed (once a week, from ≈2,800)' },
            { de: 'Ascension Trial ×3 auf der höchsten Stufe, auf der du gut punktest', en: 'Ascension Trial ×3 on the highest tier you score well on' },
            { de: 'Nightmare: 2 am Tag, nie 14 angespart', en: 'Nightmare: 2 a day, never 14 banked' },
            { de: 'Daily Dungeon 14× auf dem Main – Enhance Stones', en: 'Daily Dungeon 14× on the main – Enhance Stones' },
            { de: 'Abyss-Zeit genutzt, Abyss-Punkte in Stigma Shards (billigste Stufen zuerst)', en: 'Abyss time used, Abyss Points spent on Stigma Shards (cheapest levels first)' },
            { de: 'Jeder Daevanion-Kristall und Azphel-Punkt ausgegeben', en: 'Every Daevanion Crystal and Azphel point spent' },
            { de: 'Neue Teile auf dem sicheren +10, bevor irgendwo +11 kommt', en: 'New pieces at the safe +10 before any +11' },
            { de: 'Mit deiner Klasse auf der Top-10-Seite verglichen', en: 'Compared with your class on the top 10 page' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Jeden Tag', en: 'Every day' },
          text: {
            de: 'Conquest- und Transcendence-Zähler ausgeben, Nightmare ×2, Odyle vor der Grenze in Würfel stecken, Duty Missions auf dem Main. Die genauen Tages- und Wochenrouten für Kina, Odyle und Abyss-Punkte – mit Zeiten – stehen in **Farming & Power**; diese Liste hält nur die Stärke-Seite fest.',
            en: 'Spend the Conquest and Transcendence counters, Nightmare ×2, turn Odyle into cubes before it caps, Duty Missions on the main. The exact daily and weekly routes for Kina, Odyle and Abyss Points – with times – are in **Farming & power**; this list only keeps the power side.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'Tages- und Wochenrouten', en: 'Daily and weekly routes' } }] },
      ],
    },
    {
      title: { de: 'Herstellen, farmen oder kaufen – und wann verzaubern', en: 'Craft, farm or buy – and when to enhance' },
      blocks: [
        {
          type: 'compare',
          title: { de: 'Woher das nächste Teil kommt', en: 'Where the next piece comes from' },
          caption: {
            de: 'Fakten aus dem Guide „Handwerk: Waffen & Rüstung“ und metabot.gg; Marktpreise vom 5.10. – sie ändern sich schnell.',
            en: 'Facts from the “Crafting gear” guide and metabot.gg; market prices from 5 Oct – they change quickly.',
          },
          items: [
            {
              title: { de: 'Farmen', en: 'Farm' },
              tag: { de: 'kostenlos', en: 'free' },
              tone: 'blue',
              points: [
                { kind: 'pro', text: { de: 'Kein Kina – Drops und Gear Change Vouchers wählen den Platz', en: 'No Kina – drops and Gear Change Vouchers pick the slot' } },
                { kind: 'pro', text: { de: 'Der schnellste Weg auf 54, 70 und 86', en: 'The fastest way to 54, 70 and 86' } },
                { kind: 'con', text: { de: 'Wochenzähler (21 Conquest, 1 Ludra-Kill) bremsen das Tempo', en: 'Weekly counters (21 Conquest, 1 Ludra kill) cap the pace' } },
                { kind: 'con', text: { de: 'Rüstung und Schmuck enden bei 86', en: 'Armour and jewellery stop at 86' } },
              ],
              verdict: { de: 'Bis 86 und für Waffe und Guard.', en: 'Up to 86 and for weapon and guard.' },
            },
            {
              title: { de: 'Herstellen', en: 'Craft' },
              tag: { de: 'bis 102', en: 'up to 102' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Der einzige Weg zu Rüstung und Schmuck auf 102', en: 'The only way to armour and jewellery at 102' } },
                { kind: 'pro', text: { de: 'Transfer-Rezepte nehmen Verzauberung und Amplified mit – nichts geht verloren', en: 'Transfer recipes keep enhancement and Amplified – nothing is lost' } },
                { kind: 'pro', text: { de: '5 zufällige Nebenwerte; hergestellte Waffen +5 % PvE-Schaden', en: '5 random sub-stats; crafted weapons +5% PvE damage' } },
                { kind: 'con', text: { de: 'Erst Meisterschaft 55/60, drei Artisan’s-Splendent-Teile pro Platz', en: 'Mastery 55/60 first, three Artisan’s Splendent pieces per slot' } },
                { kind: 'con', text: { de: 'Das erste True-Rezept gelingt an der Rezeptstufe nur zu 67,5 % – ein Fehlschlag kostet alles', en: 'The first True recipe only succeeds 67.5% of the time at recipe level – a failure costs everything' } },
              ],
              verdict: { de: 'Dein Hauptweg ab 2.100 – den Beruf ab Tag eins leveln.', en: 'Your main path from 2,100 – level the profession from day one.' },
            },
            {
              title: { de: 'Kaufen', en: 'Buy' },
              tag: 'Kina',
              tone: 'slate',
              points: [
                { kind: 'pro', text: { de: 'Spart Zeit: Splendent-Zwischenstufen waren gekauft billiger als hergestellt (≈100.000 statt ≈223.000)', en: 'Saves time: Splendent intermediates were cheaper bought than crafted (≈100,000 vs ≈223,000)' } },
                { kind: 'pro', text: { de: 'Zutaten wie Wrathful Mind gibt es am Markt (≈350.000 pro Stück)', en: 'Materials like Wrathful Mind are on the market (≈350,000 each)' } },
                { kind: 'con', text: { de: 'Transfer-Ergebnisse sind seelengebunden – ein fertiges White/Dark- oder Wise/Ebony-Teil kannst du nicht kaufen', en: 'Transfer results are soul bound – a finished White/Dark or Wise/Ebony piece can’t be bought' } },
                { kind: 'con', text: { de: 'Jedes Kina hier fehlt bei +10 → +15 und Amplified', en: 'Every Kina here is missing for +10 → +15 and Amplified' } },
              ],
              verdict: { de: 'Zwischenstufen und fehlende Zutaten kaufen, keine fertige Ausrüstung.', en: 'Buy intermediates and missing materials, not finished gear.' },
            },
          ],
        },
        {
          type: 'compare',
          title: { de: 'Jetzt verzaubern oder später?', en: 'Enhance now or later?' },
          caption: {
            de: 'Kina pro Punkt an einem Teil der Stufe 102 (Abschnitt „Am meisten Gegenstandsstufe pro Kina“).',
            en: 'Kina per point on an item level 102 piece (section “Most item level per Kina”).',
          },
          items: [
            {
              title: { de: 'Sicheres +10 jetzt', en: 'Safe +10 now' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Gelingt immer, unter 0,1 Mio. pro Punkt', en: 'Always succeeds, under 0.1M per point' } },
                { kind: 'pro', text: { de: 'Laut einem Guide gibt Zerlegen die Enhance Stones zurück (das Kina nicht)', en: 'According to one guide, dismantling returns the Enhance Stones (not the Kina)' } },
              ],
              verdict: { de: 'Immer, auf jedem Teil, das du trägst.', en: 'Always, on every piece you wear.' },
            },
            {
              title: { de: '+11 bis +15 jetzt', en: '+11 to +15 now' },
              tone: 'blue',
              points: [
                { kind: 'pro', text: { de: '+11 und +12 bis 1 Mio. pro Punkt', en: '+11 and +12 up to 1M per point' } },
                { kind: 'con', text: { de: '+13 bis +15 kosten 2–6 Mio. pro Punkt', en: '+13 to +15 cost 2–6M per point' } },
                { kind: 'con', text: { de: 'Weg, wenn du ein Drop-Teil ersetzt', en: 'Gone when you replace a dropped piece' } },
              ],
              verdict: { de: 'Nur auf Teilen, die bleiben: die Handwerkslinie oder dein 102er-Endteil.', en: 'Only on pieces that stay: the crafted line or your final 102 piece.' },
            },
            {
              title: { de: 'Amplified jetzt', en: 'Amplified now' },
              tone: 'rose',
              points: [
                { kind: 'pro', text: { de: '≈5 Gegenstandsstufe pro Stufe; +1 und +2 billig pro Punkt', en: '≈5 item level per level; +1 and +2 cheap per point' } },
                { kind: 'con', text: { de: 'Braucht +15; im Schnitt ≈26 Mio. Kina + ≈196 Amplify Stones pro Teil', en: 'Needs +15; on average ≈26M Kina + ≈196 Amplify Stones per piece' } },
              ],
              verdict: { de: 'Zuletzt – auf 102ern oder Nuakum, das bleibt.', en: 'Last – on 102s or Nuakum that stays.' },
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Twinks: was anders ist', en: 'Alts: what is different' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein zweiter Charakter muss nicht an die Spitze – er braucht die Tore, die ihn nützlich machen. Wie du mehrere Charaktere aufstellst und farmst, steht im Guide zu mehreren Charakteren.',
            en: 'A second character doesn’t need to reach the top – it needs the gates that make it useful. How to set up and farm several characters is in the multi-character guide.',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: '**Ziel 1.400, dann 2.100:** Conquest-Würfel der Stufe 2 und 3 (Farming & Power). 1.000 öffnet den Abyss, 1.600 Transcendence für eigene Arcana.',
              en: '**Goal 1,400, then 2,100:** Conquest cubes of tier 2 and 3 (Farming & power). 1,000 opens the Abyss, 1,600 Transcendence for its own Arcana.',
            },
            {
              de: '**Gleiche Reihenfolge, kleineres Budget:** Einmal-Inhalte, Gürtel und Amulett, sicheres +10, Arcana. Kein +11 und kein Amplified auf Twinks – das Kina geht an den Main.',
              en: '**Same order, smaller budget:** one-time content, belt and amulet, safe +10, Arcana. No +11 and no Amplified on alts – that Kina goes to the main.',
            },
            {
              de: '**Nur Inhalte pro Charakter:** Odyle-Würfel, Nightmare, Ascension, Transcendence, Abyss-Zeit und Supply Requests. Duty Missions, Daily Dungeon und Shugo-Schlüssel sind pro Server geteilt – die bleiben beim Main.',
              en: '**Only per-character content:** Odyle cubes, Nightmare, Ascension, Transcendence, Abyss time and Supply Requests. Duty Missions, Daily Dungeon and Shugo keys are shared per server – they stay with the main.',
            },
            {
              de: '**Ein Handwerker reicht:** Level einen Beruf auf einem Charakter. Ob seine Dragon-Lord-Teile an einen anderen Charakter gehen können, ist nicht belegt – Transfer-Ergebnisse sind seelengebunden.',
              en: '**One crafter is enough:** level one profession on one character. Whether its Dragon Lord pieces can go to another character is not confirmed – transfer results are soul bound.',
            },
            {
              de: '**Kina fließt zum Main** über das Server Storage – nur auf demselben Server und in derselben Fraktion.',
              en: '**Kina flows to the main** through Server Storage – only on the same server and faction.',
            },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/multi-characters', label: { de: 'Mehrere Charaktere spielen', en: 'Playing several characters' }, primary: true },
            { href: '#/guides/farming-power', label: { de: 'Twinks im Farming-Guide', en: 'Alts in the farming guide' } },
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
            { de: '**Einen Belohnungszähler voll stehen lassen** – Conquest füllt alle 8 Std. auf (Grenze 21), Transcendence alle 12 Std. (Grenze 14). Ein voller Zähler ist verlorene Zeit.', en: '**Letting a reward counter sit full** – Conquest refills every 8 h (cap 21), Transcendence every 12 h (cap 14). A full counter is lost time.' },
            { de: '**Die falsche Transcendence-Stufe farmen** – Unique-Karten erst ab Stufe 3 (2.200), die Unique Chalice erst ab Stufe 4 (2.500). Lieber die Gegenstandsstufe ans Tor bringen.', en: '**Farming the wrong Transcendence stage** – Unique cards only from stage 3 (2,200), the Unique Chalice only from stage 4 (2,500). Push your item level to the gate instead.' },
            { de: '**Die Einmal-Inhalte überspringen** – ≈180 Daevanion-Kristalle aus Regional Quests und Sealed Dungeons sind geschenkte Gegenstandsstufe.', en: '**Skipping the one-time content** – ≈180 Daevanion Crystals from Regional Quests and Sealed Dungeons are free item level.' },
            { de: '**+13 bis +15, bevor alles auf +12 ist** – 2–6 Mio. Kina pro Punkt statt unter 1 Mio.', en: '**+13 to +15 before everything is at +12** – 2–6M Kina per point instead of under 1M.' },
            { de: '**Bei +15 aufhören, obwohl das Teil bleibt** – Amplified +1 und +2 sind die billigsten Punkte, die noch übrig sind (≈0,2–0,3 Mio.).', en: '**Stopping at +15 on a piece that stays** – Amplified +1 and +2 are the cheapest points left (≈0.2–0.3M).' },
            { de: '**Spät mit dem Handwerk anfangen** – die 102er-Phase wartet auf Meisterschaft 55/60 und drei Artisan’s-Splendent-Teile pro Platz.', en: '**Starting crafting late** – the 102 phase waits for mastery 55/60 and three Artisan’s Splendent pieces per slot.' },
            { de: '**Ein Stigma auf 20, bevor alle vier auf 15 sind** – Stufe 16–20 kostet 8 Shards pro Stufe.', en: '**One stigma to 20 before all four are at 15** – level 16–20 costs 8 shards per level.' },
            { de: '**Gürtel und Amulett vergessen** – einmal pro Charakter; alle Top 80 tragen den Noble Belt, 74 das Revelation Amulet.', en: '**Forgetting belt and amulet** – once per character; all of the top 80 wear the Noble Belt, 74 the Revelation Amulet.' },
            { de: '**Sich am Kina der Spitze messen** – ihre Verzauberung kostet ≈577 Mio. Vergleiche lieber die Gegenstandsstufe mit deiner Klasse am selben Tag.', en: '**Measuring yourself against the top’s Kina** – their enhancement costs ≈577M. Compare item level with your class on the same day instead.' },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/combat-power', label: { de: 'Weitere Fehler im Kampfkraft-Guide', en: 'More mistakes in the Combat Power guide' } }] },
      ],
    },
    {
      title: { de: 'Noch nicht sicher', en: 'Not confirmed yet' },
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Für Global noch nicht belegt: die Startwerte einer frischen 45 (≈1.000 und ≈46K nennt MeinMMO, ohne den Client zu nennen; metabot.gg zeigt für unter 1.000 im Median 40,5K), die genauen Regeln der Gegenstandsstufe (unsere stammen aus einer Anpassung an die Ausrüstung der Top 80 und passen zu games.gg; der „Rest“ von ≈720 ist nicht weiter aufgeteilt), wie viel Kampfkraft jede Stigma-Stufe bringt (wir nehmen für jede Stufe gleich viel an), die Kampfkraft zwischen Gegenstandsstufe 2.100 und 2.950 (keine öffentlichen Daten), die Zeiten pro Phase (Schätzungen), das Ludra-Tor von 2.800 (aus Guides, nicht offiziell), ob sich Verzauberung und Amplified von einem Drop-Teil auf ein neues übertragen lassen (ein Guide sagt: bis zu sechsmal; Handwerks-Transfers nehmen sie laut Fextralife mit) und die Termine von Season 2. Wenn du etwas im Spiel misst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Not confirmed for Global yet: the start values of a fresh 45 (≈1,000 and ≈46K are from MeinMMO, which does not name the client; metabot.gg shows a median of 40.5K below 1,000), the exact item level rules (ours come from a fit to the gear of the top 80 and agree with games.gg; the “rest” of ≈720 is not split further), how much Combat Power each stigma level gives (we assume the same for every level), Combat Power between item level 2,100 and 2,950 (no public data), the times per phase (estimates), the Ludra gate of 2,800 (from guides, not official), whether enhancement and Amplified levels can be moved from a dropped piece to a new one (one guide says up to six times; crafting transfers keep them according to Fextralife) and the Season 2 dates. If you measure something in game, let us know and the guide gets updated.',
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
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings (top 10 per class, 7-day gains)' },
            { href: 'https://aion2index.com/', label: 'AION2 Index – Biggest climbers' },
            { href: 'https://metabot.gg/en/aion-2/guides/combat-power-guide', label: 'metabot.gg – Combat Power statistics (8 Oct)' },
            { href: 'https://metabot.gg/en/aion-2/guides/gear-enhancement-guide', label: 'metabot.gg – Gear enhancement (chances and costs)' },
            { href: 'https://metabot.gg/en/aion-2/guides/gear-progression-guide', label: 'metabot.gg – Gear progression' },
            { href: 'https://metabot.gg/en/aion-2/guides/endgame-guide', label: 'metabot.gg – Endgame (weekly limits)' },
            { href: 'https://metabot.gg/en/aion-2/transcendence', label: 'metabot.gg – Transcendence (gates and seasons)' },
            { href: 'https://metabot.gg/en/aion-2/guides/arcana-guide', label: 'metabot.gg – Arcana' },
            { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'metabot.gg – Stigmas (shard costs)' },
            { href: 'https://metabot.gg/en/aion-2/guides/daevanion-guide', label: 'metabot.gg – Daevanion boards' },
            { href: 'https://games.gg/aion-2/guides/aion-2-item-level-guide/', label: 'games.gg – Item level guide' },
            { href: 'https://mein-mmo.de/en/aion-2-itemlevel-guide-how-to-quickly-obtain-the-best-gear-in-pve,1586095/', label: 'MeinMMO – Item level guide' },
            { href: 'https://www.keengamer.com/articles/guides/aion-2-leveling-progression-guide-level-1-to-endgame/', label: 'KeenGamer – Progression to endgame' },
            { href: 'https://allthings.how/?p=250380', label: 'AllThings.How – Raising Combat Power' },
            { href: 'https://aion2hub.com/guides/aion-2-release-date', label: 'AION2Hub – Global launch and early access dates' },
          ],
        },
      ],
    },
  ],
};
