import type { Guide, L10n } from '../types';

/**
 * Manastones: what they are and how to get many of them fast on the global client (October 2026).
 *
 * Facts (all read 2026-10-19, global client unless marked):
 * - Client-data pages: metabot.gg (manastone guide of 15 Oct, item pages: Lesser Manastone, Lesser Abyssal Manastone
 *   (Bound), Superior Manastone, Superior Manastone (Bound)) and AllThings.How (Lesser, Intermediate, Superior,
 *   Superior Abyssal Manastone, Lesser Abyssal Soulstone, 13 Oct): roll grades and odds, slots and engrave fees, drop
 *   chances, recipes, achievements, Abyss Trade Shop prices and the weekly limit.
 * - Community guides: Raid Relay (alts, 14 Oct: alts send the shop stones through Server Storage), Corpus (stop rules,
 *   item level per line colour), ExpCarry, Daevahelper, Odealo (stats per class), Timesaver (gear transfer), ShowGamer,
 *   Codex, games.gg (item level), endgametools / NeonSect (Daeva Pass), aion2wiki.date (storage).
 * - Inven (KR, Nov 2025, marked as Korean): one stone per engrave, +1 to +4 per line by colour, sources.
 * - Repo: AION2 Index top 80 (public/data/top, 18 Oct): 1,119 of 1,120 main slots are Unique; each wears one Legend
 *   and one Unique bracelet.
 *
 * Models (captions say so):
 * - Item level per piece = lines × Σ(chance of colour × 1–4); the colour steps come from Inven (KR), Corpus and ExpCarry.
 * - Engraves for a target = 1 / (1 − (1 − p)^4): every engrave rolls all 4 lines of a Unique piece.
 * - Alchemy: Superior per attempt = success × 20% × success (the rule the crafting guide uses); success 72.9% at recipe
 *   level (AllThings), ≈93% at the cap (normal recipes, Fextralife via crafting-gear.ts).
 * - Alts: every character empties both Abyss shop offers (150,000 AP a week).
 * No source publishes manastones per hour, and no global market prices were found – the guide says so.
 */

/** "1,400" → "1.400" and "0.5" → "0,5" in German, "M" → "Mio." */
const num = (en: string): L10n => ({
  en,
  de: en.replace(/(?<=\d)[.,](?=\d)/g, (c) => (c === '.' ? ',' : '.')).replace(/(\d)M\b/g, '$1 Mio.'),
});

export const manastones: Guide = {
  id: 'manastones',
  icon: 'gem',
  tone: 'blue',
  category: 'world',
  title: {
    de: 'Manasteine: schnell viele farmen',
    en: 'Manastones: farm many, fast',
  },
  summary: {
    de: 'Wie Manasteine und Seelensteine funktionieren, jede Quelle mit Menge und Tempo, die Alchemie-Rechnung von Lesser zu Superior, der schnellste Plan pro Phase mit Twinks – und welcher Stein in welches Teil gehört.',
    en: 'How manastones and soulstones work, every source with amount and pace, the alchemy maths from Lesser to Superior, the fastest plan per phase with alts – and which stone belongs in which piece.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Manastein', en: 'Manastone' },
    { de: 'Manastone & Soulstone', en: 'Manastone & Soulstone' },
    { de: 'farmen', en: 'farm' },
    { de: 'Kina', en: 'Kina' },
    { de: 'AP', en: 'AP' },
    { de: 'Alchemie', en: 'Alchemy' },
    { de: 'Twinks', en: 'Alts' },
  ],
  basis: {
    de: 'Recherche zum globalen Client (Stand 19.10.2026): Client-Daten-Seiten (metabot.gg, AllThings.How), Community-Guides (Raid Relay, Corpus, Daevahelper, Odealo u. a.) und koreanische Werte von Inven (als solche markiert). Gravuren pro Ziel, Alchemie-Ausbeute und Steine pro Woche mit Twinks sind Rechnungen mit genannten Annahmen. Ertrag pro Stunde und Marktpreise sind nicht veröffentlicht.',
    en: 'Research for the global client (as of 19 Oct 2026): client-data pages (metabot.gg, AllThings.How), community guides (Raid Relay, Corpus, Daevahelper, Odealo and others) and Korean values from Inven (marked as such). Engraves per target, alchemy yield and stones per week with alts are calculations with stated assumptions. Yield per hour and market prices are not published.',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '4', label: { de: 'Sockel pro Unique-Teil', en: 'sockets per Unique piece' }, note: { de: 'Common 1 · Rare 2 · Epic 3', en: 'Common 1 · Rare 2 · Epic 3' }, tone: 'blue' },
            { value: { de: '+1 bis +4', en: '+1 to +4' }, label: { de: 'Gegenstandsstufe pro Sockel', en: 'item level per socket' }, note: { de: 'weiß · grün · blau · gold', en: 'white · green · blue · gold' }, tone: 'teal' },
            { value: '100', label: { de: 'Abyss-Steine pro Woche und Charakter', en: 'Abyss stones per week and character' }, note: num('50 × 1,000 AP + 50 × 2,000 AP'), tone: 'gold' },
            { value: '≈17', label: { de: 'Gravuren für eine goldene Angriffs-Zeile', en: 'engraves for one gold Attack line' }, note: { de: 'Superior-Steine, im Schnitt', en: 'Superior stones, on average' }, tone: 'rose' },
            { value: '≈29–47', label: { de: 'Lesser pro Superior über die Combo', en: 'Lesser per Superior via the combo' }, note: { de: 'Alchemie, Rechnung', en: 'alchemy, calculated' }, tone: 'violet' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: '**Erst jeden Sockel füllen** – mit billigen Steinen ist das die billigste Gegenstandsstufe im Spiel. Dann jede Woche auf **jedem Charakter** den Abyss-Shop leeren (50 Manasteine + 50 Seelensteine) und die Steine der Twinks über das Server-Lager zum Main schicken. Ein Alchemist macht aus 5 Lesser ein Intermediate – und mit 20 % Combo direkt ein Superior. **Superior-Steine nur in Teile, die bleiben:** dein 102er-Endteil oder ein Nuakum-Teil, das du nicht mehr tauschst. Monster gezielt nach Steinen zu farmen lohnt sich nicht.',
            en: '**Fill every socket first** – with cheap stones that is the cheapest item level in the game. Then empty the Abyss shop on **every character** every week (50 manastones + 50 soulstones) and send the alts’ stones to the main through Server Storage. An alchemist turns 5 Lesser into an Intermediate – and with the 20% combo straight into a Superior. **Superior stones only go into pieces that stay:** your final 102 piece or a Nuakum piece you won’t swap again. Farming monsters for stones does not pay.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Wie dieser Guide zu den anderen passt', en: 'How this guide fits the others' },
          text: {
            de: '**Farming & Power** zeigt die Tages- und Wochenrouten für Kina und Abyss-Punkte (AP), **Power-Sprint** die Reihenfolge von 45 bis an die Spitze, **Sammeln & Handwerk** den Weg zur Alchemie-Meisterschaft und **Mehrere Charaktere** das Server-Lager. Dieser Guide nimmt sich nur die Manasteine vor.',
            en: '**Farming & power** has the daily and weekly routes for Kina and Abyss Points (AP), **Power sprint** the order from 45 to the top, **Gathering & crafting** the way to alchemy mastery and **Several characters** the Server Storage. This guide only covers manastones.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/farming-power', label: { de: 'Farming & Power', en: 'Farming & power' }, primary: true },
            { href: '#/guides/power-sprint', label: { de: 'Power-Sprint', en: 'Power sprint' } },
            { href: '#/guides/gathering-crafting', label: { de: 'Sammeln & Handwerk', en: 'Gathering & crafting' } },
            { href: '#/guides/multi-characters', label: { de: 'Mehrere Charaktere', en: 'Several characters' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Was Manasteine sind', en: 'What manastones are' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein Manastein gibt einem Ausrüstungsteil **einen zufälligen Zusatzwert** pro Sockel – Angriff, Krit.-Treffer, Präzision, HP und so weiter. Jeder gefüllte Sockel zählt außerdem zur **Gegenstandsstufe** (die Summe, die die Dungeon-Tore prüfen). Du gravierst sie im Verbesserungsfenster (Taste N) im Reiter „Manastone“ mit dem Knopf „Engrave“. Wo welcher Stein hinpasst:',
            en: 'A manastone gives a gear piece **one random extra stat** per socket – Attack, Critical Hit, Accuracy, HP and so on. Every filled socket also counts towards **item level** (the total the dungeon gates check). You engrave them in the Enhancement window (key N) on the “Manastone” tab with the “Engrave” button. Which stone fits where:',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Manasteine (Manastones):** Waffe, Guard und die 7 Rüstungsteile (Helm, Schulter, Brust, Hose, Handschuhe, Schuhe, Umhang) – 9 Teile.', en: '**Manastones:** weapon, guard and the 7 armour pieces (helm, pauldrons, chest, legs, gloves, boots, cloak) – 9 pieces.' },
            { de: '**Seelensteine (Soulstones):** Halskette, 2 Ohrringe, 2 Ringe, 2 Armreifen – 7 Teile. Gleiche Werte und gleiche Chancen wie der passende Manastein.', en: '**Soulstones:** necklace, 2 earrings, 2 rings, 2 bracelets – 7 pieces. Same stats and same odds as the matching manastone.' },
            { de: '**Keine Sockel:** Gürtel, Amulett und Runen. Zusammen sind es also **16 Teile** mit Sockeln.', en: '**No sockets:** belt, amulet and runes. So **16 pieces** have sockets in total.' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Sockel und Gebühr pro Gravur nach Grad des Teils (Client-Daten, metabot.gg und AllThings)', en: 'Sockets and fee per engrave by the grade of the piece (client data, metabot.gg and AllThings)' },
          head: [{ de: 'Grad des Teils', en: 'Grade of the piece' }, { de: 'Sockel', en: 'Sockets' }, { de: 'Kina pro Gravur', en: 'Kina per engrave' }],
          rows: [
            ['Common', '1', '500'],
            ['Rare', '2', num('1,000')],
            ['Epic', '3', num('1,500')],
            ['Unique', '4', num('2,000')],
          ],
        },
        {
          type: 'table',
          caption: {
            de: 'Die Steine. Jede Zeile würfelt erst den Wert, dann die Farbe. Client-Daten (metabot.gg, AllThings). Seelensteine haben dieselben Zeilen.',
            en: 'The stones. Each line rolls the stat first, then the colour. Client data (metabot.gg, AllThings). Soulstones have the same lines.',
          },
          head: [{ de: 'Stein', en: 'Stone' }, { de: 'Farben der Zeile (Chance)', en: 'Line colours (chance)' }, { de: 'Bester Angriff', en: 'Best Attack' }, { de: 'Besonderheit', en: 'Special' }],
          rows: [
            ['Lesser Manastone', { de: 'weiß 70 % · grün 30 %', en: 'white 70% · green 30%' }, '+3', { de: '9 Grundwerte: HP und MP je 15 %, die anderen 7 je 10 %', en: '9 basic stats: HP and MP 15% each, the other 7 10% each' }],
            ['Intermediate Manastone', { de: 'weiß 50 % · grün 35 % · blau 15 %', en: 'white 50% · green 35% · blue 15%' }, '+8', { de: 'dieselben 9 Grundwerte', en: 'the same 9 basic stats' }],
            ['Superior Manastone', { de: 'grün 50 % · blau 35 % · gold 15 %', en: 'green 50% · blue 35% · gold 15%' }, '+10', { de: 'dazu 5 Schadens-Boosts (je 0,5 %): +0,1 / +0,3 / +1 %', en: 'plus 5 damage boosts (0.5% each): +0.1 / +0.3 / +1%' }],
            ['Lesser Abyssal Manastone (Bound)', { de: 'weiß 50 % · grün 35 % · blau 15 %', en: 'white 50% · green 35% · blue 15%' }, '+5', { de: '35 % PvP-Werte; Grundwerte wie Angriff nur je 6 %', en: '35% PvP stats; basic stats such as Attack only 6% each' }],
            ['Superior Abyssal Manastone', { de: 'grün 50 % · blau 35 % · gold 15 %', en: 'green 50% · blue 35% · gold 15%' }, '+10', { de: '≈33 % PvP-Werte; die 5 Schadens-Boosts so oft wie bei Superior', en: '≈33% PvP stats; the 5 damage boosts as often as on Superior' }],
          ],
        },
        {
          type: 'bars',
          title: { de: 'Gegenstandsstufe aus einem Unique-Teil nach einer Gravur', en: 'Item level from one Unique piece after one engrave' },
          caption: {
            de: 'Erwartungswert, gerechnet: 4 Sockel × (Chance jeder Farbe × ihre Stufe). Stufen pro Farbe: weiß +1, grün +2, blau +3, gold +4 (Inven KR, Corpus, ExpCarry; games.gg und Odealo nennen +1 bis +4 für Global). Für alle 16 Teile mal 16: ≈83 (Lesser), ≈106 (Lesser Abyssal oder Intermediate), ≈170 (Superior), höchstens 256.',
            en: 'Expected value, worked out: 4 sockets × (chance of each colour × its step). Steps per colour: white +1, green +2, blue +3, gold +4 (Inven KR, Corpus, ExpCarry; games.gg and Odealo give +1 to +4 for Global). For all 16 pieces times 16: ≈83 (Lesser), ≈106 (Lesser Abyssal or Intermediate), ≈170 (Superior), at most 256.',
          },
          items: [
            { label: 'Lesser', value: 5.2, display: num('≈5.2'), note: { de: 'höchstens 8', en: 'at most 8' }, tone: 'slate' },
            { label: 'Lesser Abyssal', value: 6.6, display: num('≈6.6'), note: { de: 'höchstens 12 – aus dem Abyss-Shop', en: 'at most 12 – from the Abyss shop' }, tone: 'violet' },
            { label: 'Intermediate', value: 6.6, display: num('≈6.6'), note: { de: 'höchstens 12', en: 'at most 12' }, tone: 'teal' },
            { label: 'Superior', value: 10.6, display: num('≈10.6'), note: { de: 'höchstens 16', en: 'at most 16' }, tone: 'gold' },
          ],
        },
        { type: 'heading', text: { de: 'Die Regeln beim Gravieren', en: 'The engraving rules' } },
        {
          type: 'list',
          items: [
            {
              de: '**Ein Stein pro Gravur:** Eine Gravur verbraucht einen Stein plus die Kina-Gebühr und würfelt die Sockel des Teils – auf einem frischen Teil alle auf einmal (Inven KR, ShowGamer, AllThings). Die Kina sind Kleingeld: 2.000 pro Gravur auf Unique. Der Engpass sind die Steine.',
              en: '**One stone per engrave:** an engrave uses one stone plus the Kina fee and rolls the piece’s sockets – on a fresh piece all of them at once (Inven KR, ShowGamer, AllThings). The Kina is small change: 2,000 per engrave on Unique. The bottleneck is the stones.',
            },
            {
              de: '**Ein Fehlschlag ist nicht beschrieben:** Die Guides mit Client-Daten kennen kein Scheitern – jede Gravur gibt Werte. Das Risiko ist ein anderes: Eine neue Gravur **überschreibt** die alte Zeile, ohne Rückgängig, und der alte Stein ist weg. (Timesaver erwähnt nebenbei einen Fehlschlag, ohne Details – unbestätigt.)',
              en: '**A failure is not described:** the guides with client data know no failure – every engrave gives stats. The risk is a different one: a new engrave **overwrites** the old line, with no undo, and the old stone is gone. (Timesaver mentions a failure in passing, without details – unconfirmed.)',
            },
            {
              de: '**Gute Zeilen behalten:** Die neueren Guides (metabot.gg 15.10., AllThings 13.10.) beschreiben Haken pro Sockel – nur angehakte Sockel werden neu gewürfelt. Ältere (Corpus 4.10., ShowGamer 6.10., ExpCarry 7.10.) sagen: immer alle. Schau vor dem Bestätigen, welche Haken gesetzt sind. „Auto Engrave“ würfelt weiter, bis dein Ziel (Wert, Mindestfarbe, Anzahl) steht oder Steine bzw. Kina ausgehen.',
              en: '**Keeping good lines:** the newer guides (metabot.gg 15 Oct, AllThings 13 Oct) describe a tick box per socket – only ticked sockets are rerolled. Older ones (Corpus 4 Oct, ShowGamer 6 Oct, ExpCarry 7 Oct) say: always all of them. Check which boxes are ticked before you confirm. “Auto Engrave” keeps rolling until your goal (stat, minimum colour, count) is met or you run out of stones or Kina.',
            },
            {
              de: '**Ausbauen geht nicht:** Steine kommen nie zurück – nicht beim Überschreiben, nicht beim Zerlegen (das gibt nur die Enhance Stones zurück) und nicht beim Löschen des Teils.',
              en: '**No removal:** stones never come back – not when overwritten, not when you dismantle the piece (that only returns the Enhance Stones) and not when you delete it.',
            },
            {
              de: '**Transfer:** Ein **Upgrade** im Verbesserungsfenster nimmt sie mit – laut metabot.gg sagt der Spieltext, dass Verzauberung, Manasteine, Theostones und Seelenbindung übertragen werden. Ein **Gear Transfer** und ein neues Teil nehmen sie **nicht** mit (Timesaver, AllThings, Corpus, Daevahelper, Odealo). Für die Transfer-Rezepte der Dragon-Lord-Kette sagt keine Quelle, dass die Steine bleiben – rechne damit, dass sie weg sind.',
              en: '**Transfer:** an **Upgrade** in the Enhancement window keeps them – according to metabot.gg the game text says enhancement, manastones, Theostones and Soul Binding carry over. A **Gear Transfer** and a new piece do **not** keep them (Timesaver, AllThings, Corpus, Daevahelper, Odealo). For the transfer recipes of the Dragon Lord chain no source says the stones stay – plan as if they are gone.',
            },
            {
              de: '**Gebunden oder handelbar:** Gedropte Lesser und alles Hergestellte ist handelbar. Steine mit „(Bound)“ – aus Quests, Pass, Shop, Dungeons und Erfolgen – nicht. Die gebundenen Abyss-Shop-Steine dürfen laut Raid Relay, AllThings und aion2wiki aber ins Server-Lager.',
              en: '**Bound or tradeable:** dropped Lesser stones and everything crafted is tradeable. Stones marked “(Bound)” – from quests, the pass, the shop, dungeons and achievements – are not. According to Raid Relay, AllThings and aion2wiki the bound Abyss shop stones may still go into Server Storage.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Wie viele Steine du brauchst', en: 'How many stones you need' },
          text: {
            de: 'Alle 16 Teile einmal füllen: **16 Steine** – und das bei jedem Ausrüstungswechsel neu. Ein Endset mit einer goldenen Angriffs-Zeile pro Teil braucht im Schnitt ≈17 Superior-Gravuren pro Teil, also **≈270 Superior-Steine** (Manasteine und Seelensteine zusammen). Über die Alchemie-Combo stecken darin ≈8.000–13.000 Lesser. Darum: billige Steine für die Gegenstandsstufe, die Masse aus dem Abyss-Shop, Superior nur für Endteile. (Rechnung aus den Chancen, kein Messwert. Die Top 80 von AION2 Index tragen in 1.119 von 1.120 Hauptplätzen Unique – also fast überall 4 Sockel.)',
            en: 'Filling all 16 pieces once: **16 stones** – and again with every gear swap. An end set with one gold Attack line per piece takes ≈17 Superior engraves per piece on average, so **≈270 Superior stones** (manastones and soulstones together). Through the alchemy combo that is ≈8,000–13,000 Lesser. Hence: cheap stones for item level, the bulk from the Abyss shop, Superior only for final pieces. (Worked out from the odds, not measured. The AION2 Index top 80 wear Unique in 1,119 of 1,120 main slots – so 4 sockets almost everywhere.)',
          },
        },
      ],
    },
    {
      title: { de: 'Alle Quellen', en: 'Every source' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Manasteine kommen aus vielen Ecken, aber nur zwei Quellen sind **planbar und wiederholbar:** der Abyss-Shop (garantiert, jede Woche) und die Alchemie (so viel, wie du Material hast). Alles andere sind Zufalls-Drops und Einmal-Belohnungen – mitnehmen, aber nicht darauf bauen.',
            en: 'Manastones come from many corners, but only two sources are **plannable and repeatable:** the Abyss shop (guaranteed, every week) and alchemy (as much as you have material for). Everything else is random drops and one-time rewards – take them, but don’t build on them.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Wiederkehrende Quellen (globaler Client, Client-Daten und Guides – Stand Oktober 2026)', en: 'Recurring sources (global client, client data and guides – as of October 2026)' },
          head: [{ de: 'Quelle', en: 'Source' }, { de: 'Was', en: 'What' }, { de: 'Menge / Chance', en: 'Amount / chance' }, { de: 'Wie oft', en: 'How often' }, { de: 'Handel', en: 'Trade' }],
          rows: [
            [{ de: '**Abyss Trade Shop**', en: '**Abyss Trade Shop**' }, 'Lesser Abyssal Manastone · Lesser Abyssal Soulstone', { de: '1.000 bzw. 2.000 AP pro Stück', en: '1,000 or 2,000 AP each' }, { de: 'je 50 pro Charakter und Woche', en: '50 each per character and week' }, { de: 'gebunden, Server-Lager ✔', en: 'bound, Server Storage ✔' }],
            [{ de: 'Transcendence: Deus Research Base, Shattered Arkanis', en: 'Transcendence: Deus Research Base, Shattered Arkanis' }, 'Lesser, Intermediate', { de: 'Atiel, Talisra: 30 % Lesser, 6 % Intermediate; Nazmun, Gelcos, Siliator, Ruthilis: 2 % Intermediate', en: 'Atiel, Talisra: 30% Lesser, 6% Intermediate; Nazmun, Gelcos, Siliator, Ruthilis: 2% Intermediate' }, { de: '14 Belohnungen pro Woche', en: '14 rewards per week' }, { de: 'gebunden', en: 'bound' }],
            ['Ascension Binding Chest', { de: '1 Stein pro Kiste', en: '1 stone per chest' }, { de: '45 % Lesser Manastone, 45 % Lesser Soulstone, je 5 % Intermediate', en: '45% Lesser Manastone, 45% Lesser Soulstone, 5% each Intermediate' }, { de: 'Ascension Trial (3 pro Woche), Nightmare Altar', en: 'Ascension Trial (3 a week), Nightmare Altar' }, { de: 'gebunden; Kiste ins Server-Lager (Raid Relay)', en: 'bound; chest into Server Storage (Raid Relay)' }],
            ['Ludra (Abyssal Forge)', 'Lesser (Bound)', { de: 'keine Zahl veröffentlicht', en: 'no number published' }, { de: '1 Kill pro Woche', en: '1 kill a week' }, { de: 'gebunden', en: 'bound' }],
            [{ de: 'Elite-Monster in Chaotic Middle Reshanta', en: 'Elite monsters in Chaotic Middle Reshanta' }, 'Lesser Manastone', { de: 'bis 1,96 % pro Kill', en: 'up to 1.96% per kill' }, { de: 'mit deiner Abyss-Zeit (7 Std. pro Woche)', en: 'with your Abyss time (7 h a week)' }, { de: 'handelbar', en: 'tradeable' }],
            [{ de: 'Benannte Monster ab 45 in Verteron und Altgard, Chaotic Lower Reshanta', en: 'Named monsters 45+ in Verteron and Altgard, Chaotic Lower Reshanta' }, 'Lesser Manastone', { de: 'meist ≈0,6 % oder weniger', en: 'mostly ≈0.6% or less' }, '–', { de: 'handelbar', en: 'tradeable' }],
            [{ de: 'Daeva Pass (Dawn Legion / Ishalgen Mercenary)', en: 'Daeva Pass (Dawn Legion / Ishalgen Mercenary)' }, 'Lesser Manastone · Lesser Soulstone (Bound)', { de: 'je 30 frei, 60 mit Premium', en: '30 each free, 60 with Premium' }, { de: 'Saison bis 15.12.', en: 'season until 15 Dec' }, { de: 'gebunden', en: 'bound' }],
            [{ de: 'Event-Shops: Growth Manastone Chest', en: 'Event shops: Growth Manastone Chest' }, { de: '1 Stein pro Kiste', en: '1 stone per chest' }, { de: '50 % Lesser, 40 % Intermediate, 10 % Superior', en: '50% Lesser, 40% Intermediate, 10% Superior' }, { de: 'wenn ein Event sie anbietet (15 Event-Währung laut AllThings)', en: 'when an event sells it (15 event currency according to AllThings)' }, { de: 'gebunden', en: 'bound' }],
            [{ de: '**Alchemie**', en: '**Alchemy**' }, 'Intermediate, Superior, Abyssal', { de: 'siehe nächster Abschnitt', en: 'see next section' }, { de: 'so viel Material da ist', en: 'as much as you have material for' }, { de: 'handelbar', en: 'tradeable' }],
            ['Market', { de: 'alle ungebundenen Steine', en: 'every unbound stone' }, { de: 'keine Preise veröffentlicht', en: 'no prices published' }, { de: 'kaufen nur mit Membership', en: 'buying needs Membership' }, { de: 'handelbar', en: 'tradeable' }],
          ],
        },
        {
          type: 'table',
          caption: { de: 'Einmalige Belohnungen (Client-Daten, metabot.gg und AllThings)', en: 'One-time rewards (client data, metabot.gg and AllThings)' },
          head: [{ de: 'Was', en: 'What' }, { de: 'Bedingung', en: 'Condition' }, { de: 'Belohnung (gebunden)', en: 'Reward (bound)' }],
          rows: [
            [{ de: 'Episoden-Quests', en: 'Episode quests' }, { de: 'zwei pro Fraktion (empfohlen Stufe 37 und 45)', en: 'two per faction (recommended level 37 and 45)' }, { de: 'je 5 Lesser', en: '5 Lesser each' }],
            ['Filled with Manastone', { de: '5 / 30 / 60 / 100 / 150 / 300 / 500 Gravuren (Mana- und Seelensteine zählen)', en: '5 / 30 / 60 / 100 / 150 / 300 / 500 engraves (manastones and soulstones count)' }, { de: 'zusammen 6 Lesser, 5 Intermediate, 3 Superior, 46.000 Kina', en: '6 Lesser, 5 Intermediate, 3 Superior, 46,000 Kina in total' }],
            ['Benediction of Freedom', { de: '20 / 40 / 60 / 80 Knoten auf der Vaizel-Tafel', en: '20 / 40 / 60 / 80 nodes on the Vaizel board' }, { de: '4 Superior, 20.000 Kina', en: '4 Superior, 20,000 Kina' }],
            [{ de: 'Feldbosse Silent Dartan, Soul Ruler Kashapa, High Commander Lagta', en: 'Field bosses Silent Dartan, Soul Ruler Kashapa, High Commander Lagta' }, { de: 'je ein Kill', en: 'one kill each' }, { de: 'je 1 Superior + 7.000 Kina', en: '1 Superior + 7,000 Kina each' }],
            ['Filled with Abyssal Manastone', { de: '5 bis 300 Gravuren mit Steinen der Stufe „Ultimate“ oder höher (genaue Bedingung unklar)', en: '5 to 300 engraves with stones of grade “Ultimate” or higher (exact condition unclear)' }, { de: 'u. a. 6 Superior Abyssal, 2 Intermediate Abyssal, 4 Lesser Abyssal, 67.000 Kina', en: 'among others 6 Superior Abyssal, 2 Intermediate Abyssal, 4 Lesser Abyssal, 67,000 Kina' }],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: '≈10 Superior-Steine liegen einfach herum', en: '≈10 Superior stones are just lying around' },
          text: {
            de: '3 aus „Filled with Manastone“, 4 aus der Vaizel-Tafel, die du ohnehin öffnest, und 3 von den Feldbossen. Jede Gravur zählt für „Filled with Manastone“ – auch die billigen auf Übergangsausrüstung. Inven (KR) nennt außerdem Shugo Festa und den Saison-Shop als Quelle für Lesser; für Global nicht geprüft.',
            en: '3 from “Filled with Manastone”, 4 from the Vaizel board you open anyway and 3 from the field bosses. Every engrave counts towards “Filled with Manastone” – even the cheap ones on temporary gear. Inven (KR) also names Shugo Festa and the season shop as Lesser sources; not checked for Global.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Kills für einen handelbaren Lesser Manastone', en: 'Kills for one tradeable Lesser Manastone' },
          caption: {
            de: 'Gerechnet aus den Drop-Chancen der Client-Daten (metabot.gg, AllThings). „Schnitt“ = 1 ÷ Chance, „90 %“ = Kills, nach denen du mit 90 % Sicherheit mindestens einen hast. Bester Spot laut metabot.gg: Abyssal Mutated Ancient Destroyer im Contaminated Marsh (Chaotic Middle Reshanta, 41 Spawns).',
            en: 'Worked out from the drop chances in the client data (metabot.gg, AllThings). “Average” = 1 ÷ chance, “90%” = kills after which you have at least one with 90% certainty. Best spot according to metabot.gg: Abyssal Mutated Ancient Destroyer in the Contaminated Marsh (Chaotic Middle Reshanta, 41 spawns).',
          },
          unit: { de: 'Kills', en: 'kills' },
          items: [
            { label: { de: '1,96 % · Schnitt', en: '1.96% · average' }, value: 51, note: { de: 'beste Elite-Monster', en: 'best elite monsters' }, tone: 'teal' },
            { label: { de: '1,96 % · 90 %', en: '1.96% · 90%' }, value: 117, tone: 'rose' },
            { label: { de: '1,31 % · Schnitt', en: '1.31% · average' }, value: 76, note: { de: 'z. B. Abyss Nagarant Brawler', en: 'e.g. Abyss Nagarant Brawler' }, tone: 'teal' },
            { label: { de: '1,31 % · 90 %', en: '1.31% · 90%' }, value: 175, tone: 'rose' },
            { label: { de: '≈0,6 % · Schnitt', en: '≈0.6% · average' }, value: 167, note: { de: 'viele normale Monster', en: 'many normal monsters' }, tone: 'teal' },
            { label: { de: '≈0,6 % · 90 %', en: '≈0.6% · 90%' }, value: 383, tone: 'rose' },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Monster sind keine Manastein-Farm', en: 'Monsters are not a manastone farm' },
          text: {
            de: 'Selbst am besten Spot sind es ≈51 Kills pro Stein – eine Woche Abyss-Shop sind 50 Steine für 50.000 AP. Farme Abyss-Monster für die **AP** und nimm die Steine als Bonus mit. Die Elite-Monster in Middle Reshanta stehen im Abyss und kosten Abyss-Zeit.',
            en: 'Even at the best spot it is ≈51 kills per stone – one week of Abyss shop is 50 stones for 50,000 AP. Farm Abyss monsters for the **AP** and take the stones as a bonus. The elite monsters in Middle Reshanta stand in the Abyss and use up Abyss time.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Supply Requests: Abfluss, keine Quelle', en: 'Supply Requests: a drain, not a source' },
          text: {
            de: '5 Lesser Manastone geben 500 AP + 70 Enhance Stones, 5 Lesser Abyssal Manastone 3.210 AP + 820 Enhance Stones (Client-Daten, metabot.gg). Das ist ein Ventil für Überschuss – Intermediate und Superior gibst du dort nicht ab (Rat aus Corpus).',
            en: '5 Lesser Manastones give 500 AP + 70 Enhance Stones, 5 Lesser Abyssal Manastones 3,210 AP + 820 Enhance Stones (client data, metabot.gg). That is an outlet for surplus – don’t turn in Intermediate or Superior stones there (advice from Corpus).',
          },
        },
      ],
    },
    {
      title: { de: 'Alchemie: von Lesser zu Superior', en: 'Alchemy: from Lesser to Superior' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Alchemie ist der einzige Weg zu **Superior-Steinen in Menge** – und ihre Ergebnisse sind handelbar. Die Meisterschaft gehört dem Charakter, der herstellt; ein Alchemist für den ganzen Account reicht (Sammeln & Handwerk).',
            en: 'Alchemy is the only way to **Superior stones in volume** – and its results are tradeable. Mastery belongs to the character that crafts; one alchemist for the whole account is enough (Gathering & crafting).',
          },
        },
        {
          type: 'flow',
          title: { de: 'Der Weg zum Superior-Stein', en: 'The road to a Superior stone' },
          caption: {
            de: 'Rezepte aus den Client-Daten (metabot.gg, AllThings). 72,9 % ist die Grundchance an der Rezeptstufe; sie steigt mit deiner Meisterschaft.',
            en: 'Recipes from the client data (metabot.gg, AllThings). 72.9% is the base chance at recipe level; it rises with your mastery.',
          },
          items: [
            { title: { de: 'Lesser sammeln', en: 'Collect Lesser' }, text: { de: 'Drops, Market, Twinks – handelbare Lesser Manastones', en: 'Drops, market, alts – tradeable Lesser Manastones' }, tag: '×5', tone: 'slate' },
            { title: { de: 'Intermediate herstellen', en: 'Craft Intermediate' }, text: { de: '+ 3 Spiritstone Powder + 2 Professional Ink · 72,9 %', en: '+ 3 Spiritstone Powder + 2 Professional Ink · 72.9%' }, tag: { de: 'ab Meisterschaft 20', en: 'from mastery 20' }, tone: 'teal' },
            { title: { de: 'Combo: Superior', en: 'Combo: Superior' }, text: { de: '20 % Combo-Chance → Superior Manastone statt Intermediate', en: '20% combo chance → Superior Manastone instead of Intermediate' }, tag: '20 %', tone: 'gold' },
            { title: { de: 'Den Rest verwerten', en: 'Use the rest' }, text: { de: 'Intermediates gravieren – oder ab 85: 30 Intermediate → 1 Superior', en: 'Engrave the Intermediates – or from 85: 30 Intermediate → 1 Superior' }, tag: { de: 'ab 85', en: 'from 85' }, tone: 'blue' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Alle Stein-Rezepte der Alchemie (gleich für Elyos und Asmodier; Alchemy Table in Verteron bzw. Altgard)', en: 'Every stone recipe of alchemy (the same for Elyos and Asmodians; Alchemy Table in Verteron or Altgard)' },
          head: [{ de: 'Ergebnis', en: 'Result' }, { de: 'Meisterschaft', en: 'Mastery' }, { de: 'Zutaten', en: 'Materials' }, 'Combo'],
          rows: [
            ['Intermediate Manastone', '20', { de: '5 Lesser Manastone, 3 Spiritstone Powder, 2 Professional Ink (Bound)', en: '5 Lesser Manastone, 3 Spiritstone Powder, 2 Professional Ink (Bound)' }, { de: '20 % → Superior Manastone', en: '20% → Superior Manastone' }],
            [{ de: 'Intermediate Manastone ×10', en: 'Intermediate Manastone ×10' }, '40', { de: '50 Lesser, 30 Powder, 20 Ink', en: '50 Lesser, 30 Powder, 20 Ink' }, { de: 'nicht angegeben; Paket-Rezepte geben weniger Erfahrung', en: 'not stated; batch recipes give less experience' }],
            ['Intermediate Soulstone', '25', { de: '5 Lesser Soulstone, 3 Powder, 2 Professional Ink', en: '5 Lesser Soulstone, 3 Powder, 2 Professional Ink' }, { de: '20 % → Superior Soulstone', en: '20% → Superior Soulstone' }],
            ['Superior Manastone', '85', { de: '30 Intermediate Manastone, 10 Powder, 2 Exceptional Ink (Bound)', en: '30 Intermediate Manastone, 10 Powder, 2 Exceptional Ink (Bound)' }, { de: 'keine', en: 'none' }],
            ['Superior Soulstone', '90', { de: '30 Intermediate Soulstone, 10 Powder, 2 Exceptional Ink', en: '30 Intermediate Soulstone, 10 Powder, 2 Exceptional Ink' }, { de: 'keine', en: 'none' }],
            ['Intermediate Abyssal Manastone', '85', { de: '5 Lesser Abyssal Manastone, 5 Powder, 3 Professional Ink', en: '5 Lesser Abyssal Manastone, 5 Powder, 3 Professional Ink' }, { de: '20 % → Superior Abyssal (einziger Herstellungsweg)', en: '20% → Superior Abyssal (the only crafting route)' }],
            ['Intermediate Abyssal Soulstone', '90', { de: '5 Lesser Abyssal Soulstone, 5 Powder, 3 Professional Ink', en: '5 Lesser Abyssal Soulstone, 5 Powder, 3 Professional Ink' }, { de: '20 % → Superior Abyssal Soulstone', en: '20% → Superior Abyssal Soulstone' }],
          ],
        },
        {
          type: 'bars',
          title: { de: 'Lesser Manastones hinter einem Superior Manastone', en: 'Lesser Manastones behind one Superior Manastone' },
          caption: {
            de: 'Gerechnet, nicht gemessen – mit der Regel aus „Handwerk: Waffen & Rüstung“: Superior pro Versuch = Erfolg × 20 % × Erfolg. Erfolg 72,9 % an der Rezeptstufe (AllThings), ≈93 % an der Obergrenze (normale Rezepte, Fextralife). Die Intermediates, die dabei nebenher entstehen (≈4,5–6 pro Superior), sind nicht abgezogen. Direktrezept: 30 Intermediates zu je ≈5,4 Lesser (ab Meisterschaft 85 läuft das Intermediate-Rezept an der Obergrenze), 72,9–93 % Erfolg.',
            en: 'Worked out, not measured – with the rule from “Crafting gear”: Superior per attempt = success × 20% × success. Success 72.9% at recipe level (AllThings), ≈93% at the cap (normal recipes, Fextralife). The Intermediates you get along the way (≈4.5–6 per Superior) are not subtracted. Direct recipe: 30 Intermediates at ≈5.4 Lesser each (from mastery 85 the Intermediate recipe runs at the cap), 72.9–93% success.',
          },
          unit: 'Lesser',
          items: [
            { label: { de: 'Combo, an der Obergrenze', en: 'Combo, at the cap' }, value: 29, display: '≈29', note: { de: '≈3,5 Superior pro 100 Lesser', en: '≈3.5 Superior per 100 Lesser' }, tone: 'gold' },
            { label: { de: 'Combo, an der Rezeptstufe', en: 'Combo, at recipe level' }, value: 47, display: '≈47', note: { de: '≈2,1 Superior pro 100 Lesser', en: '≈2.1 Superior per 100 Lesser' }, tone: 'teal' },
            { label: { de: 'Direktrezept (30 Intermediate)', en: 'Direct recipe (30 Intermediate)' }, value: 221, display: '≈175–220', note: { de: 'erst ab Meisterschaft 85', en: 'only from mastery 85' }, tone: 'rose' },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Die Combo ist der Weg, nicht das Direktrezept:** Pro Superior brauchst du über die Combo 6- bis 8-mal weniger Lesser. Das Direktrezept ist nur gut, um übrige Intermediates loszuwerden.',
              en: '**The combo is the way, not the direct recipe:** per Superior the combo needs 6 to 8 times fewer Lesser. The direct recipe is only good for using up spare Intermediates.',
            },
            {
              de: '**Erst Meisterschaft, dann Masse:** Ein Intermediate gibt 60 Erfahrung (koreanische Werte). Je höher deine Alchemie über 20 steht, desto öfter gelingt der Versuch – und auch die Combo, weil sie noch einmal auf Erfolg würfelt: ≈3,5 statt ≈2,1 Superior pro 100 Lesser. Spar große Stapel also auf, bis die Meisterschaft hoch ist.',
              en: '**Mastery first, then volume:** an Intermediate gives 60 experience (Korean values). The higher your alchemy is above 20, the more often the attempt succeeds – and the combo too, because it rolls for success once more: ≈3.5 instead of ≈2.1 Superior per 100 Lesser. So save big stacks until your mastery is high.',
            },
            {
              de: '**Ein Fehlschlag kostet die Zutaten** (du bekommst 30 % der Erfahrung). Lass dich beim Herstellen nicht treffen – das zählt als Fehlschlag.',
              en: '**A failure costs the materials** (you get 30% of the experience). Don’t get hit while crafting – that counts as a failure.',
            },
            {
              de: '**Zutaten:** Spiritstone Powder stellst du ab Alchemie 5 aus Sammelmaterial her; Exceptional Ink (Bound) verkaufen Händler (metabot.gg). Für Professional Ink nennt keine Quelle den Händler – schau ins Rezeptfenster.',
              en: '**Materials:** you craft Spiritstone Powder from gathered materials from alchemy 5; vendors sell Exceptional Ink (Bound) (metabot.gg). No source names the vendor for Professional Ink – check the recipe window.',
            },
            {
              de: '**Gebundene Steine im Rezept?** Das Rezept nennt den handelbaren Lesser Manastone. Ob gebundene Lesser aus Quests und Pass oder die gebundenen Abyss-Shop-Steine hineinpassen, ist nicht veröffentlicht – das Rezeptfenster zeigt es dir.',
              en: '**Bound stones in the recipe?** The recipe lists the tradeable Lesser Manastone. Whether bound Lesser from quests and the pass or the bound Abyss shop stones fit is not published – the recipe window shows you.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Herstellen oder kaufen?', en: 'Craft or buy?' },
          text: {
            de: 'Ein Superior „kostet“ über die Combo ≈29–47 Lesser plus Powder und Ink für 6–9 Versuche. Kostet ein Superior am Market weniger als so viele Lesser zum Marktpreis, kauf ihn. Für Global gibt es keine veröffentlichten Marktpreise – schau in die Preis-Historie am Market. Und nie an Händler verkaufen: Sie zahlen 3 Kina (Lesser), 17 (Intermediate) und 34 (Superior).',
            en: 'Through the combo a Superior “costs” ≈29–47 Lesser plus Powder and Ink for 6–9 attempts. If a Superior on the market costs less than that many Lesser at market price, buy it. There are no published market prices for Global – check the price history on the market. And never sell to vendors: they pay 3 Kina (Lesser), 17 (Intermediate) and 34 (Superior).',
          },
        },
        { type: 'links', items: [{ href: '#/guides/gathering-crafting', label: { de: 'Alchemie leveln: Sammeln & Handwerk', en: 'Level alchemy: Gathering & crafting' } }] },
      ],
    },
    {
      title: { de: 'Der schnellste Plan', en: 'The fastest plan' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Wie viele Manasteine pro Stunde eine Route bringt, misst niemand öffentlich – hier steht deshalb keine erfundene Zahl. Was feststeht: Der Abyss-Shop ist der einzige große, garantierte Strom; alles andere ist Zufall oder einmalig. Der schnellste Plan ruht darum auf drei Säulen: **jeden Sockel mit dem füllen, was ohnehin kommt**, **jede Woche auf jedem Charakter den Shop leeren** und **Lesser per Alchemie in Superior verwandeln**.',
            en: 'Nobody publicly measures how many manastones a route gives per hour – so there is no made-up number here. What is certain: the Abyss shop is the only big guaranteed stream; everything else is chance or one-time. So the fastest plan rests on three pillars: **fill every socket with what comes anyway**, **empty the shop on every character every week** and **turn Lesser into Superior with alchemy**.',
          },
        },
        {
          type: 'compare',
          title: { de: 'Vier Wege zu Steinen', en: 'Four ways to stones' },
          caption: {
            de: 'Fakten aus den Abschnitten oben. Preise am Market sind für Global nicht veröffentlicht.',
            en: 'Facts from the sections above. Market prices are not published for Global.',
          },
          items: [
            {
              title: { de: 'Abyss-Shop', en: 'Abyss shop' },
              tag: { de: '50 + 50 pro Woche', en: '50 + 50 a week' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Garantiert, 1.000 AP pro Manastein', en: 'Guaranteed, 1,000 AP per manastone' } },
                { kind: 'pro', text: { de: 'Würfelt bis Blau – so viel Gegenstandsstufe wie ein Intermediate', en: 'Rolls up to blue – as much item level as an Intermediate' } },
                { kind: 'pro', text: { de: 'Jeder Twink kauft mit, das Server-Lager bringt die Steine zum Main', en: 'Every alt buys too, Server Storage takes the stones to the main' } },
                { kind: 'con', text: { de: '35 % PvP-Zeilen, Angriff nur 6 % pro Zeile', en: '35% PvP lines, Attack only 6% per line' } },
                { kind: 'con', text: { de: 'Konkurriert beim Main mit Stigma Shards um die AP', en: 'Competes with Stigma Shards for the main’s AP' } },
              ],
              verdict: { de: 'Jede Woche, auf jedem Charakter.', en: 'Every week, on every character.' },
            },
            {
              title: { de: 'Drops & Inhalte', en: 'Drops & content' },
              tag: { de: 'nebenbei', en: 'on the side' },
              tone: 'blue',
              points: [
                { kind: 'pro', text: { de: 'Kommt mit Transcendence, Ascension, Ludra, Pass und Erfolgen von selbst', en: 'Comes by itself with Transcendence, Ascension, Ludra, the pass and achievements' } },
                { kind: 'pro', text: { de: '≈10 Superior einmalig aus Erfolgen und Feldbossen', en: '≈10 Superior one-time from achievements and field bosses' } },
                { kind: 'con', text: { de: 'Zufällig und klein; Monster ≈51 Kills pro Stein', en: 'Random and small; monsters ≈51 kills per stone' } },
              ],
              verdict: { de: 'Mitnehmen, nie dafür farmen.', en: 'Take it, never farm for it.' },
            },
            {
              title: { de: 'Alchemie', en: 'Alchemy' },
              tag: { de: 'ab Meisterschaft 20', en: 'from mastery 20' },
              tone: 'teal',
              points: [
                { kind: 'pro', text: { de: 'Der einzige Weg zu Superior in Menge – und handelbar', en: 'The only way to Superior in volume – and tradeable' } },
                { kind: 'pro', text: { de: '≈29–47 Lesser pro Superior über die Combo', en: '≈29–47 Lesser per Superior via the combo' } },
                { kind: 'con', text: { de: 'Braucht handelbare Lesser als Futter und Meisterschaft', en: 'Needs tradeable Lesser as feed and mastery' } },
                { kind: 'con', text: { de: 'Fehlschlag = Zutaten weg', en: 'Failure = materials gone' } },
              ],
              verdict: { de: 'Ab 20 jeden handelbaren Lesser durchschicken – die großen Stapel mit hoher Meisterschaft.', en: 'From 20 run every tradeable Lesser through it – the big stacks at high mastery.' },
            },
            {
              title: { de: 'Market', en: 'Market' },
              tag: 'Kina',
              tone: 'slate',
              points: [
                { kind: 'pro', text: { de: 'Der schnellste Weg zu einem guten Stein', en: 'The fastest way to one good stone' } },
                { kind: 'con', text: { de: 'Kaufen nur mit Membership; keine veröffentlichten Preise', en: 'Buying needs Membership; no published prices' } },
                { kind: 'con', text: { de: 'Jedes Kina fehlt bei +15 und Amplified', en: 'Every Kina is missing for +15 and Amplified' } },
              ],
              verdict: { de: 'Superior für Endteile, wenn er billiger ist als die Combo.', en: 'Superior for final pieces when it is cheaper than the combo.' },
            },
          ],
        },
        { type: 'heading', text: { de: 'Phase für Phase', en: 'Phase by phase' } },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Bis Stufe 45: nur was kommt', en: 'Up to level 45: only what comes' },
              text: {
                de: 'Gebundene Lesser aus den Episoden-Quests (je 5) und dem Daeva Pass in Teile, die du eine Weile trägst – einmal gravieren, nicht neu würfeln. Jede Gravur zählt für „Filled with Manastone“: Bei 5, 30, 60 und 100 Gravuren gibt es Lesser, Intermediate und Kina. Keine teuren Steine in Ausrüstung, die du ein paar Quests später ersetzt (Speedrun-Guide).',
                en: 'Bound Lesser from the episode quests (5 each) and the Daeva Pass go into pieces you wear for a while – engrave once, don’t reroll. Every engrave counts towards “Filled with Manastone”: at 5, 30, 60 and 100 engraves you get Lesser, Intermediate and Kina. No expensive stones in gear you replace a few quests later (speedrun guide).',
              },
            },
            {
              title: { de: 'Frische 45 bis 1.400: jeden Sockel füllen', en: 'Fresh 45 to 1,400: fill every socket' },
              text: {
                de: 'Jedes Teil, das du trägst, bekommt eine Gravur – mit Lesser oder Lesser Abyssal. Fehlen dir ein paar Punkte zu einem Tor: Eine Gravur auf einem leeren Unique-Teil bringt im Schnitt ≈5–7 Gegenstandsstufe. Ab Gegenstandsstufe 1.000 öffnet der Abyss – ab dann jede Woche den Shop leeren.',
                en: 'Every piece you wear gets one engrave – with Lesser or Lesser Abyssal. A few points short of a gate: one engrave on an empty Unique piece gives ≈5–7 item level on average. From item level 1,000 the Abyss opens – from then on empty the shop every week.',
              },
            },
            {
              title: { de: '1.400 bis 2.800: sammeln, nicht verbrennen', en: '1,400 to 2,800: collect, don’t burn' },
              text: {
                de: 'Ab 1.600 droppt Transcendence Lesser und Intermediate. Der Alchemist verwandelt ab Meisterschaft 20 alle handelbaren Lesser; Superiors kommen **ins Lager**. Hol dir die ≈10 einmaligen Superior (Vaizel-Knoten, Feldbosse, 150+ Gravuren). Die Zwischenstufen der Dragon-Lord-Kette (True/Star, White/Dark) bekommen nur billige Steine – beim Transfer sind sie weg. Ein Nuakum-Teil, das bei dir Endausrüstung bleibt, darf Superior bekommen.',
                en: 'From 1,600 Transcendence drops Lesser and Intermediate. From mastery 20 the alchemist converts every tradeable Lesser; Superiors go **into storage**. Collect the ≈10 one-time Superiors (Vaizel nodes, field bosses, 150+ engraves). The intermediate tiers of the Dragon Lord chain (True/Star, White/Dark) only get cheap stones – they are gone at the transfer. A Nuakum piece that stays your end gear may get Superior.',
              },
            },
            {
              title: { de: 'Ab 2.800: Superior auf die Endteile', en: 'From 2,800: Superior on the final pieces' },
              text: {
                de: 'Jedes fertige 102er-Teil (Splendent Wise/Ebony) bekommt Superior und wird bis zur Stopp-Regel gewürfelt (nächster Abschnitt). Reihenfolge wie die Ausrüstung im Power-Sprint: Waffe und Schmuck zuerst, Rüstung zuletzt. Für ein PvP-Set nimmst du Superior Abyssal.',
                en: 'Every finished 102 piece (Splendent Wise/Ebony) gets Superior and is rolled to the stop rule (next section). Same order as the gear in the power sprint: weapon and jewellery first, armour last. For a PvP set use Superior Abyssal.',
              },
            },
          ],
        },
        {
          type: 'flow',
          title: { de: 'Die Wochenroutine für Steine', en: 'The weekly routine for stones' },
          caption: {
            de: 'Die Woche startet am Mittwoch neu (Power-Sprint). Kina- und AP-Routen mit Zeiten stehen in „Farming & Power“.',
            en: 'The week resets on Wednesday (Power sprint). Kina and AP routes with times are in “Farming & power”.',
          },
          items: [
            { title: { de: 'Abyss-Shop leeren', en: 'Empty the Abyss shop' }, text: { de: 'Auf jedem Charakter 50 + 50', en: '50 + 50 on every character' }, tag: 'AP', tone: 'gold' },
            { title: { de: 'Ins Server-Lager', en: 'Into Server Storage' }, text: { de: 'Steine und Kisten der Twinks zum Main', en: 'The alts’ stones and chests to the main' }, tag: { de: 'Twinks', en: 'Alts' }, tone: 'violet' },
            { title: { de: 'Wochenzähler', en: 'Weekly counters' }, text: { de: 'Transcendence ×14, Ascension ×3, Ludra', en: 'Transcendence ×14, Ascension ×3, Ludra' }, tag: 'Drops', tone: 'blue' },
            { title: { de: 'Alchemie', en: 'Alchemy' }, text: { de: '5 Lesser → Intermediate, Combo → Superior', en: '5 Lesser → Intermediate, combo → Superior' }, tag: { de: 'Handwerk', en: 'Craft' }, tone: 'teal' },
            { title: { de: 'Gravieren', en: 'Engrave' }, text: { de: 'Erst leere Sockel, dann das schwächste Endteil', en: 'Empty sockets first, then the weakest final piece' }, tag: 'iLv', tone: 'green' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'AP des Mains: Steine oder Stigma Shards?', en: 'The main’s AP: stones or Stigma Shards?' },
          text: {
            de: '50 Abyss-Manasteine kosten 50.000 AP – so viel wie 5 Stigma Shards (die ersten 50 kosten je 10.000 AP). Solange du **leere Sockel** hast, bringt ein Stein ≈5–7 Gegenstandsstufe pro 1.000 AP – sehr viel für wenig AP. Sind alle Sockel voll, bringt Neuwürfeln viel weniger pro Stein: Dann zuerst die Stigmen auf 10 und 15 (Power-Sprint), die Steine mit dem Rest. Die Twinks kaufen ohnehin Steine für den Main.',
            en: '50 Abyss manastones cost 50,000 AP – as much as 5 Stigma Shards (the first 50 cost 10,000 AP each). As long as you have **empty sockets**, a stone gives ≈5–7 item level per 1,000 AP – a lot for little AP. Once all sockets are full, rerolling gives far less per stone: then stigmas to 10 and 15 first (Power sprint), stones with the rest. The alts buy stones for the main anyway.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/farming-power', label: { de: 'AP und Kina: Farming & Power', en: 'AP and Kina: Farming & power' } },
            { href: '#/guides/power-sprint', label: { de: 'Die Reihenfolge: Power-Sprint', en: 'The order: Power sprint' } },
            { href: '#/guides/crafting-gear', label: { de: 'Die Dragon-Lord-Kette', en: 'The Dragon Lord chain' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Mit Twinks: bis zu 800 Steine pro Woche', en: 'With alts: up to 800 stones a week' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Abyss-Punkte bleiben auf dem Charakter, der sie verdient. Die Steine, die er damit kauft, aber nicht: Laut Raid Relay (globaler Client, 14.10.) gehen die gebundenen Lesser Abyssal Manastones und Soulstones eines Twinks über das **Server-Lager** zum Main. Damit wird jeder Twink zur Steinquelle.',
            en: 'Abyss Points stay on the character that earns them. The stones it buys with them don’t: according to Raid Relay (global client, 14 Oct) an alt’s bound Lesser Abyssal Manastones and Soulstones go to the main through **Server Storage**. That turns every alt into a source of stones.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Abyss-Steine pro Woche, die beim Main ankommen', en: 'Abyss stones a week that reach the main' },
          caption: {
            de: 'Rechnung: Jeder Charakter leert beide Angebote – 50 × 1.000 AP + 50 × 2.000 AP = 150.000 AP pro Woche. „Farming & Power“ schätzt ≈110–380K AP pro Woche und Charakter. Nur auf demselben Server und in derselben Fraktion.',
            en: 'Calculation: every character empties both offers – 50 × 1,000 AP + 50 × 2,000 AP = 150,000 AP a week. “Farming & power” estimates ≈110–380K AP a week per character. Only on the same server and faction.',
          },
          unit: { de: 'Steine', en: 'stones' },
          items: [
            { label: { de: 'Nur der Main', en: 'Main only' }, value: 100, note: num('150K AP'), tone: 'slate' },
            { label: { de: '2 Charaktere', en: '2 characters' }, value: 200, note: num('300K AP'), tone: 'blue' },
            { label: { de: '4 Charaktere', en: '4 characters' }, value: 400, note: num('600K AP'), tone: 'blue' },
            { label: { de: '6 Charaktere', en: '6 characters' }, value: 600, note: num('900K AP'), tone: 'blue' },
            { label: { de: '8 Charaktere', en: '8 characters' }, value: 800, note: num('1.2M AP'), tone: 'gold' },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Der Twink braucht Gegenstandsstufe 1.000** für den Abyss. Billige Steine in jedem Sockel sind auch für ihn die billigste Gegenstandsstufe zum Tor.',
              en: '**The alt needs item level 1,000** for the Abyss. Cheap stones in every socket are its cheapest item level to the gate too.',
            },
            {
              de: '**Woher der Twink 150.000 AP nimmt:** Ascension Trials (3 pro Woche), Abyss Corridor (ab 1.000, 5 Minuten pro Lauf), Battlegrounds (3 Match- und 3 Sieg-Belohnungen = 12.000 AP) und Supply Requests ohne Obergrenze – Details in „Mehrere Charaktere“ und „Farming & Power“.',
              en: '**Where the alt gets 150,000 AP:** Ascension Trials (3 a week), Abyss Corridor (from 1,000, 5 minutes a run), Battlegrounds (3 match and 3 win rewards = 12,000 AP) and uncapped Supply Requests – details in “Several characters” and “Farming & power”.',
            },
            {
              de: '**Was der Twink nicht kaufen soll:** Stigma Shards, Azphel-Kristalle und Flügel bleiben auf ihm. Seine AP sind beim Main als Steine am meisten wert (Raid Relay).',
              en: '**What the alt should not buy:** Stigma Shards, Azphel crystals and wings stay on it. Its AP is worth the most to the main as stones (Raid Relay).',
            },
            {
              de: '**Ascension-Kisten** der Twinks gehen ebenfalls über das Server-Lager (Raid Relay). Handelbare Drops und Hergestelltes wandern ohnehin frei; gebundenes Kina nicht.',
              en: '**Ascension chests** of the alts also go through Server Storage (Raid Relay). Tradeable drops and crafted stones move freely anyway; bound Kina does not.',
            },
            {
              de: '**Ein Alchemist für alle:** Die Meisterschaft zählt pro Charakter – schick alle handelbaren Lesser zu einem Charakter und verwandle sie dort.',
              en: '**One alchemist for everyone:** mastery counts per character – send every tradeable Lesser to one character and convert them there.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Vorher im Spiel prüfen', en: 'Check in game first' },
          text: {
            de: 'Ob ein Gegenstand ins Server-Lager darf, steht im Tooltip („Can be placed in Server Storage“). Raid Relay, AllThings und aion2wiki sagen Ja für die Abyss-Shop-Steine, eine Tabelle bei Game8 widerspricht sich selbst. Leg zuerst einen Stein hinein, bevor du einen Twink-Plan darauf baust.',
            en: 'Whether an item may go into Server Storage is in its tooltip (“Can be placed in Server Storage”). Raid Relay, AllThings and aion2wiki say yes for the Abyss shop stones, a table at Game8 contradicts itself. Put one stone in first before you build an alt plan on it.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/multi-characters', label: { de: 'Mehrere Charaktere spielen', en: 'Playing several characters' }, primary: true },
            { href: '#/guides/farming-power', label: { de: 'AP pro Woche', en: 'AP per week' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Welcher Stein wohin – und wann aufhören', en: 'Which stone where – and when to stop' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Faustregel: Der Stein ist so viel wert wie die Zeit, die das Teil bleibt.', en: 'Rule of thumb: the stone is worth as much as the time the piece stays.' },
          head: [{ de: 'Teil', en: 'Piece' }, { de: 'Stein', en: 'Stone' }, { de: 'Aufhören, wenn …', en: 'Stop when …' }],
          rows: [
            [{ de: 'Quest- und Levelausrüstung', en: 'Quest and levelling gear' }, { de: 'gebundene Lesser, die du ohnehin hast', en: 'bound Lesser you have anyway' }, { de: 'nach einer Gravur', en: 'after one engrave' }],
            [{ de: 'Drops 54 / 70 (Übergang)', en: 'Drops 54 / 70 (temporary)' }, 'Lesser · Lesser Abyssal', { de: 'nach einer Gravur; neu würfeln nur kurz vor einem Tor', en: 'after one engrave; reroll only just before a gate' }],
            [{ de: 'Dragon Lord True/Star, White/Dark', en: 'Dragon Lord True/Star, White/Dark' }, 'Lesser · Lesser Abyssal · Intermediate', { de: 'nach einer Gravur – der Transfer nimmt die Steine', en: 'after one engrave – the transfer takes the stones' }],
            [{ de: 'Nuakum 86, das bleibt · Endteil 102', en: 'Nuakum 86 that stays · final 102 piece' }, 'Superior', { de: 'eine goldene Angriffs-Zeile oder ein Schadens-Boost (Stopp-Regeln unten)', en: 'one gold Attack line or one damage boost (stop rules below)' }],
            [{ de: 'PvP- / Abyss-Set', en: 'PvP / Abyss set' }, 'Superior Abyssal', { de: 'PvP Attack auf der Waffe, PvP Defense auf der Rüstung', en: 'PvP Attack on the weapon, PvP Defense on the armour' }],
          ],
        },
        {
          type: 'line',
          title: { de: 'Chance auf das Ziel nach so vielen Gravuren (Superior, Unique-Teil)', en: 'Chance of the goal after this many engraves (Superior, Unique piece)' },
          caption: {
            de: 'Gerechnet aus den Chancen der Client-Daten (metabot.gg): pro Zeile goldener Angriff 1,5 %, irgendein Schadens-Boost 2,5 %, goldener Schadens-Boost 0,375 % (2,5 % × 15 % Gold). Annahme: Jede Gravur würfelt alle 4 Zeilen. Behältst du gute Zeilen per Haken, würfeln weniger Zeilen – die Chance pro Gravur sinkt.',
            en: 'Worked out from the odds in the client data (metabot.gg): per line gold Attack 1.5%, any damage boost 2.5%, gold damage boost 0.375% (2.5% × 15% gold). Assumption: every engrave rolls all 4 lines. If you keep good lines with the tick boxes, fewer lines roll – the chance per engrave drops.',
          },
          x: { label: { de: 'Gravuren', en: 'Engraves' }, ticks: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50'] },
          y: { label: { de: 'Chance', en: 'Chance' }, unit: '%', min: 0, max: 100 },
          series: [
            { label: { de: 'Irgendein Schadens-Boost', en: 'Any damage boost' }, values: [0, 40, 64, 78, 87, 92, 95, 97, 98, 99, 99], tone: 'teal' },
            { label: { de: 'Goldener Angriff (+10)', en: 'Gold Attack (+10)' }, values: [0, 26, 45, 60, 70, 78, 84, 88, 91, 93, 95], tone: 'gold' },
            { label: { de: 'Goldener Schadens-Boost (+1 %)', en: 'Gold damage boost (+1%)' }, values: [0, 7, 14, 20, 26, 31, 36, 41, 45, 49, 53], tone: 'rose' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Irgendein Schadens-Boost', en: 'Any damage boost' }, value: { de: '≈10 Gravuren im Schnitt, 23 für 90 %', en: '≈10 engraves on average, 23 for 90%' } },
            { label: { de: 'Goldener Angriff (+10)', en: 'Gold Attack (+10)' }, value: { de: '≈17 im Schnitt, 39 für 90 %', en: '≈17 on average, 39 for 90%' } },
            { label: { de: 'Ein goldener Schadens-Boost', en: 'One gold damage boost' }, value: { de: '≈67 im Schnitt, 154 für 90 %', en: '≈67 on average, 154 for 90%' } },
            { label: { de: 'Ein bestimmter goldener Boost (z. B. Back Attack +1 %)', en: 'One specific gold boost (e.g. Back Attack +1%)' }, value: { de: '≈334 im Schnitt – nicht jagen', en: '≈334 on average – don’t chase it' } },
            { label: { de: 'Kina dafür', en: 'Kina for it' }, value: { de: '2.000 pro Gravur auf Unique – 17 Gravuren = 34.000 Kina', en: '2,000 per engrave on Unique – 17 engraves = 34,000 Kina' } },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Stopp-Regeln aus der Community** (Corpus fasst drei Content-Creator zusammen): eine goldene Angriffs-Zeile (+10) pro Teil reicht; ein goldener Schadens-Boost zählt etwa wie zwei goldene Angriffs-Zeilen; über 15 Angriff auf einem Teil ist etwa so gut wie ein goldener Boost.',
              en: '**Stop rules from the community** (Corpus sums up three content creators): one gold Attack line (+10) per piece is enough; one gold damage boost counts about as much as two gold Attack lines; more than 15 Attack on a piece is about as good as one gold boost.',
            },
            {
              de: '**Front und Back Attack Damage Boost** wirken nur aus dieser Richtung. Entscheide dich für eine Richtung im ganzen Set – Back passt am besten zum Assassinen.',
              en: '**Front and Back Attack Damage Boost** only work from that direction. Pick one direction for the whole set – Back fits the Assassin best.',
            },
            {
              de: '**Für PvE ist Superior besser als Superior Abyssal**, wenn du Angriff willst: goldener Angriff 1,5 % statt 0,9 % pro Zeile. Für Schadens-Boosts sind beide gleich (je 0,5 %).',
              en: '**For PvE Superior beats Superior Abyssal** when you want Attack: gold Attack 1.5% instead of 0.9% per line. For damage boosts both are equal (0.5% each).',
            },
            {
              de: '**Nicht in Steinen:** Kampftempo, Abklingzeit und Wucht (Double Chance) gibt es auf keinem Stein. Krit.-Treffer endet bei 50 % auf dem Charakterbogen, Ausweichen bei 30 % (metabot.gg, Odealo).',
              en: '**Not on stones:** Combat Speed, Cooldown Reduction and Double Chance are on no stone. Critical Hit stops at 50% on the character sheet, Evasion at 30% (metabot.gg, Odealo).',
            },
          ],
        },
        { type: 'heading', text: { de: 'Welche Werte für deine Rolle', en: 'Which stats for your role' } },
        {
          type: 'table',
          caption: {
            de: 'Superior-Zeilen nach Odealo (Global, 7.10.); Grundwerte nach metabot.gg, Daevahelper und unseren Klassen-Guides. Tanks: Block erhöht Parieren und Schildblock (metabot.gg) – beim Templer stärkt jeder Block die ganze Gruppe (Klassen-Guide).',
            en: 'Superior lines from Odealo (Global, 7 Oct); basic stats from metabot.gg, Daevahelper and our class guides. Tanks: Block raises parry and shield block (metabot.gg) – for the Templar every block buffs the whole group (class guide).',
          },
          head: [{ de: 'Klasse', en: 'Class' }, { de: 'Superior: Boosts zuerst', en: 'Superior: boosts first' }, { de: 'Grundwerte (Lesser bis Superior)', en: 'Basic stats (Lesser to Superior)' }],
          rows: [
            [{ de: 'Gladiator', en: 'Gladiator' }, { de: 'Front Attack, dann Weapon, Critical oder Damage Boost', en: 'Front Attack, then Weapon, Critical or Damage Boost' }, { de: 'Angriff, Krit.-Treffer', en: 'Attack, Critical Hit' }],
            [{ de: 'Templer', en: 'Templar' }, { de: 'Front Attack, dann Weapon oder Critical Damage Boost', en: 'Front Attack, then Weapon or Critical Damage Boost' }, { de: 'Block, Verteidigung, HP; Präzision, wenn du verfehlst', en: 'Block, Defense, HP; Accuracy if you miss' }],
            [{ de: 'Assassine', en: 'Assassin' }, { de: 'Back Attack, dann Weapon, Critical oder Damage Boost', en: 'Back Attack, then Weapon, Critical or Damage Boost' }, { de: 'Krit.-Treffer, Angriff, genug Präzision', en: 'Critical Hit, Attack, enough Accuracy' }],
            [{ de: 'Jäger', en: 'Ranger' }, { de: 'Front Attack, Weapon, dann Critical oder Damage Boost', en: 'Front Attack, Weapon, then Critical or Damage Boost' }, { de: 'Präzision, Angriff, Krit.-Treffer', en: 'Accuracy, Attack, Critical Hit' }],
            [{ de: 'Zauberer', en: 'Sorcerer' }, { de: 'Weapon, dann Front Attack oder Critical Damage Boost', en: 'Weapon, then Front Attack or Critical Damage Boost' }, { de: 'Angriff, Krit.-Treffer', en: 'Attack, Critical Hit' }],
            [{ de: 'Beschwörer', en: 'Spiritmaster' }, { de: 'Damage, Weapon, Critical oder Front Attack – ohne feste Reihenfolge', en: 'Damage, Weapon, Critical or Front Attack – no fixed order' }, { de: 'Präzision zuerst, dann Krit.-Treffer', en: 'Accuracy first, then Critical Hit' }],
            [{ de: 'Kleriker', en: 'Cleric' }, { de: 'Weapon oder Critical, dann Damage oder Front Attack', en: 'Weapon or Critical, then Damage or Front Attack' }, { de: 'Angriff (stärkt auch Heilung), HP, Verteidigung', en: 'Attack (also raises heals), HP, Defense' }],
            [{ de: 'Kantor', en: 'Chanter' }, { de: 'Front oder Back Attack (je nach Boss), dann Weapon', en: 'Front or Back Attack (depends on the boss), then Weapon' }, { de: 'Angriff, Krit.-Treffer oder Präzision', en: 'Attack, Critical Hit or Accuracy' }],
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/gladiator?s=4', label: { de: 'Gladiator', en: 'Gladiator' } },
            { href: '#/guides/templar?s=4', label: { de: 'Templer', en: 'Templar' } },
            { href: '#/guides/assassin?s=4', label: { de: 'Assassine', en: 'Assassin' } },
            { href: '#/guides/ranger?s=4', label: { de: 'Jäger', en: 'Ranger' } },
            { href: '#/guides/sorcerer?s=4', label: { de: 'Zauberer', en: 'Sorcerer' } },
            { href: '#/guides/spiritmaster?s=4', label: { de: 'Beschwörer', en: 'Spiritmaster' } },
            { href: '#/guides/cleric?s=4', label: { de: 'Kleriker', en: 'Cleric' } },
            { href: '#/guides/chanter?s=4', label: { de: 'Kantor', en: 'Chanter' } },
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
            { de: '**Leere Sockel lassen** – eine Gravur auf einem leeren Unique-Teil bringt im Schnitt ≈5–7 Gegenstandsstufe für einen billigen Stein.', en: '**Leaving sockets empty** – one engrave on an empty Unique piece gives ≈5–7 item level on average for a cheap stone.' },
            { de: '**Superior in Übergangsteile** – in Drops, die du ersetzt, und in Dragon-Lord-Zwischenstufen sind sie beim nächsten Teil oder Transfer weg.', en: '**Superior in temporary pieces** – in drops you will replace and in Dragon Lord intermediate tiers they are gone with the next piece or transfer.' },
            { de: '**Die Seelensteine vergessen** – Halskette, Ohrringe, Ringe und Armreifen haben auch Sockel: 7 der 16 Teile.', en: '**Forgetting soulstones** – necklace, earrings, rings and bracelets have sockets too: 7 of the 16 pieces.' },
            { de: '**Den Abyss-Shop auf Twinks liegen lassen** – 50 + 50 Steine pro Woche und Charakter verfallen nicht als Steine, sondern als Gelegenheit: Das Limit gilt pro Woche.', en: '**Leaving the Abyss shop on alts** – 50 + 50 stones per week and character are not lost as stones but as a chance: the limit is per week.' },
            { de: '**Monster nach Steinen farmen** – selbst bei 1,96 % sind es ≈51 Kills pro Stein.', en: '**Farming monsters for stones** – even at 1.96% it is ≈51 kills per stone.' },
            { de: '**Das Direktrezept statt der Combo** – 30 Intermediates für einen Superior kosten 6- bis 8-mal mehr Lesser als die 20-%-Combo.', en: '**The direct recipe instead of the combo** – 30 Intermediates for one Superior cost 6 to 8 times more Lesser than the 20% combo.' },
            { de: '**Einen bestimmten goldenen Boost jagen** – im Schnitt ≈334 Superior-Gravuren. Nimm, was die Stopp-Regel erlaubt.', en: '**Chasing one specific gold boost** – ≈334 Superior engraves on average. Take what the stop rule allows.' },
            { de: '**Eine gute Zeile überschreiben** – vor dem Bestätigen prüfen, welche Sockel angehakt sind. Es gibt kein Zurück.', en: '**Overwriting a good line** – check which sockets are ticked before you confirm. There is no undo.' },
            { de: '**Steine an Händler verkaufen oder als Supply Request abgeben** – Händler zahlen 3–34 Kina; Intermediate und Superior gehören in Ausrüstung.', en: '**Selling stones to vendors or turning them in as Supply Requests** – vendors pay 3–34 Kina; Intermediate and Superior belong in gear.' },
            { de: '**Abyssal-Steine auf reine PvE-Endteile, wenn du Angriff willst** – ein Drittel der Zeilen sind PvP-Werte.', en: '**Abyssal stones on pure PvE final pieces when you want Attack** – a third of the lines are PvP stats.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Checkliste', en: 'Checklist' },
      blocks: [
        { type: 'heading', text: { de: 'Jede Woche', en: 'Every week' } },
        {
          type: 'checklist',
          items: [
            { de: 'Abyss-Shop auf jedem Charakter: 50 Lesser Abyssal Manastones (je 1.000 AP) und 50 Soulstones (je 2.000 AP)', en: 'Abyss shop on every character: 50 Lesser Abyssal Manastones (1,000 AP each) and 50 Soulstones (2,000 AP each)' },
            { de: 'Steine und Ascension-Kisten der Twinks über das Server-Lager zum Main', en: 'The alts’ stones and Ascension chests to the main through Server Storage' },
            { de: 'Transcendence-Zähler (14), Ascension ×3 und Ludra genutzt', en: 'Transcendence counter (14), Ascension ×3 and Ludra used' },
            { de: 'Alle handelbaren Lesser beim Alchemisten: 5 → Intermediate, Combo → Superior', en: 'Every tradeable Lesser to the alchemist: 5 → Intermediate, combo → Superior' },
            { de: 'Kein leerer Sockel an einem Teil, das du trägst', en: 'No empty socket on any piece you wear' },
            { de: 'Superior nur auf Teilen, die bleiben – der Rest liegt im Lager', en: 'Superior only on pieces that stay – the rest waits in storage' },
          ],
        },
        { type: 'heading', text: { de: 'Einmal', en: 'Once' } },
        {
          type: 'checklist',
          items: [
            { de: 'Episoden-Quests mit Manastein-Belohnung (je 5 Lesser)', en: 'Episode quests with manastone rewards (5 Lesser each)' },
            { de: '„Filled with Manastone“ bis 500 Gravuren (3 Superior, 5 Intermediate, 46.000 Kina)', en: '“Filled with Manastone” up to 500 engraves (3 Superior, 5 Intermediate, 46,000 Kina)' },
            { de: '„Benediction of Freedom“: 80 Vaizel-Knoten (4 Superior)', en: '“Benediction of Freedom”: 80 Vaizel nodes (4 Superior)' },
            { de: 'Feldbosse Silent Dartan, Soul Ruler Kashapa und High Commander Lagta (je 1 Superior)', en: 'Field bosses Silent Dartan, Soul Ruler Kashapa and High Commander Lagta (1 Superior each)' },
            { de: 'Daeva-Pass-Belohnungen abgeholt (bis 15.12.)', en: 'Daeva Pass rewards claimed (until 15 Dec)' },
            { de: 'Event-Shops auf Growth Manastone Chests geprüft', en: 'Event shops checked for Growth Manastone Chests' },
            { de: 'Server-Lager-Tooltip eines Abyss-Steins geprüft, bevor die Twinks kaufen', en: 'Server Storage tooltip of an Abyss stone checked before the alts buy' },
          ],
        },
      ],
    },
    {
      title: { de: 'Noch nicht sicher', en: 'Not confirmed yet' },
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Für Global nicht offiziell belegt: dass eine Gravur genau einen Stein verbraucht (Inven KR, ShowGamer und AllThings sagen es; die Rechnungen hier nehmen es an) · ob sich gute Zeilen per Haken behalten lassen (neuere Guides ja, ältere nein) · die Gegenstandsstufe pro Farbe (+1 bis +4 laut Inven KR, Corpus und ExpCarry; games.gg sagt, sie hänge vom Wert ab) · ob 100 % Seelenbindung einen fünften Sockel gibt (Corpus, ExpCarry) · wie viele Sockel Armreifen der Stufe Legend haben (jeder der Top 80 trägt einen) · ob gebundene Steine in die Alchemie-Rezepte passen · ob die Transfer-Rezepte der Dragon-Lord-Kette Steine mitnehmen · ob der Daeva Pass auf Global Seelensteine gibt (endgametools ja, NeonSect nennt gar keine Steine) · die Menge pro Drop bei Transcendence und Ludra · Steine pro Stunde für jede Route und Marktpreise (nirgends veröffentlicht). Wenn du etwas im Spiel prüfst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Not officially confirmed for Global: that an engrave uses exactly one stone (Inven KR, ShowGamer and AllThings say so; the calculations here assume it) · whether good lines can be kept with tick boxes (newer guides yes, older ones no) · the item level per colour (+1 to +4 according to Inven KR, Corpus and ExpCarry; games.gg says it depends on the stat) · whether 100% Soul Binding adds a fifth socket (Corpus, ExpCarry) · how many sockets Legend bracelets have (each of the top 80 wears one) · whether bound stones fit the alchemy recipes · whether the transfer recipes of the Dragon Lord chain keep stones · whether the Daeva Pass gives soulstones on Global (endgametools yes, NeonSect lists no stones at all) · the amount per drop in Transcendence and Ludra · stones per hour for any route and market prices (published nowhere). If you check something in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/manastone-guide', label: 'metabot.gg – Manastone guide (odds, slots, sources, recipes; 15 Oct)' },
            { href: 'https://metabot.gg/en/aion-2/items/lesser-manastone', label: 'metabot.gg – Lesser Manastone (drop chances, Supply Request)' },
            { href: 'https://metabot.gg/en/aion-2/items/lesser-abyssal-manastone-bound', label: 'metabot.gg – Lesser Abyssal Manastone (Bound) (Abyss shop, Supply Request)' },
            { href: 'https://metabot.gg/en/aion-2/items/superior-manastone', label: 'metabot.gg – Superior Manastone (recipe)' },
            { href: 'https://metabot.gg/en/aion-2/items/superior-manastone-bound', label: 'metabot.gg – Superior Manastone (Bound) (achievements, chest)' },
            { href: 'https://allthings.how/aion-2-lesser-manastone-effects-and-how-to-get-it/', label: 'AllThings.How – Lesser Manastone' },
            { href: 'https://allthings.how/aion-2-intermediate-manastone-effects-and-how-to-get-it/', label: 'AllThings.How – Intermediate Manastone (recipe, success, combo)' },
            { href: 'https://allthings.how/aion-2-superior-manastone-effects-and-how-to-get-it/', label: 'AllThings.How – Superior Manastone' },
            { href: 'https://allthings.how/aion-2-superior-abyssal-manastone-effects-and-how-to-get/', label: 'AllThings.How – Superior Abyssal Manastone' },
            { href: 'https://allthings.how/aion-2-how-to-get-the-lesser-abyssal-soulstone-and-its-effects/', label: 'AllThings.How – Lesser Abyssal Soulstone' },
            { href: 'https://raidrelay.com/aion-2-alts-guide', label: 'Raid Relay – Alts guide (Abyss shop stones through Server Storage)' },
            { href: 'https://aion2wiki.date/items/531351001', label: 'aion2wiki – Lesser Abyssal Manastone (Bound) (storage)' },
            { href: 'https://corpus.gg/blog/aion-2/manastones-guide', label: 'Corpus – Manastones: which stones and when to stop rolling' },
            { href: 'https://expcarry.com/aion-2-manastone-guide', label: 'ExpCarry – Manastone guide (item level per line grade)' },
            { href: 'https://daevahelper.com/gear', label: 'Daevahelper – Gear guide (sockets, transfer)' },
            { href: 'https://odealo.com/articles/best-stats-manastones-for-every-class-aion-2-guide', label: 'Odealo – Best stats and manastones for every class' },
            { href: 'https://timesaver.gg/blog/aion-2-gear-transfer-guide', label: 'Timesaver – Gear transfer (what carries over)' },
            { href: 'https://showgamer.com/en/guides/6352-kak-poluchit-kamni-many-v-aion-2-i-kak-imi-polzovatsya', label: 'ShowGamer – How to get and use manastones' },
            { href: 'https://codexgames.net/aion-2/guides/manastones', label: 'Codex – Manastones, Soulstones and Theostones' },
            { href: 'https://games.gg/aion-2/guides/aion-2-item-level-guide/', label: 'games.gg – Item level guide' },
            { href: 'https://endgametools.com/en/aion-2/news/aion-2-daeva-pass', label: 'endgametools – Daeva Pass rewards' },
            { href: 'https://neonsect.com/aion-2/aion-2-daeva-pass-guide/', label: 'NeonSect – Daeva Pass guide' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/325', label: 'Inven (KR) – Manastones and soulstones: effects and sources' },
            { href: 'https://www.inven.co.kr/webzine/news/?news=311565&site=aion2', label: 'Inven (KR) – Combat power after the level cap (engraving)' },
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings (gear grades of the top 80)' },
          ],
        },
      ],
    },
  ],
};
