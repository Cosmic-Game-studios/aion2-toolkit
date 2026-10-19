import type { Guide, L10n } from '../types';

/**
 * Dungeons on the global server: what is live, entry gates, counters and cubes, what each dungeon drops, the
 * guarantees, Transcendence, Nightmare, Ascension Trial, Daily Dungeon, finding a group, field bosses and the Ludra raid
 * (October 2026). Numbers and facts from the sources at the end, paraphrased; most hard numbers come from MetaBot's
 * reading of the Global client, checked against daevaguides, games.gg, mein-mmo, AllThings.How and NC's own notices.
 * The client also holds content that isn't released – this guide only lists what sources show as live. Clear times
 * are left out: no allowed source has measured them for Global.
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });

export const dungeons: Guide = {
  id: 'dungeons',
  icon: 'dungeon',
  tone: 'teal',
  category: 'endgame',
  title: {
    de: 'Dungeons: was es gibt, was sie geben, wie oft',
    en: 'Dungeons: what there is, what they give, how often',
  },
  summary: {
    de: 'Alle Dungeons auf Global mit Eintritts-Grenzen, Gruppengröße und Beute, die Zähler und Würfel, die garantierten Belohnungen, Transcendence, Nightmare, Aufstiegs-Prüfung, täglicher Dungeon, Feldbosse und was mit dem Raid Ludra los ist.',
    en: 'Every dungeon on Global with entry gates, party size and loot, the counters and cubes, the guaranteed rewards, Transcendence, Nightmare, Ascension Trial, Daily Dungeon, field bosses and what is going on with the Ludra raid.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Dungeons', en: 'Dungeons' },
    { de: 'Conquest', en: 'Conquest' },
    { de: 'Transcendence', en: 'Transcendence' },
    { de: 'Odyle', en: 'Odyle' },
  ],
  basis: {
    de: 'Recherche in Community-Guides und NCs Ankündigungen zum globalen Server (Oktober 2026); viele Zahlen stammen aus den Client-Daten, wie MetaBot sie ausliest',
    en: 'Research in community guides and NC’s notices for the global server (October 2026); many numbers come from the client data as MetaBot reads it',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '6', label: { de: 'Expeditions-Dungeons', en: 'Expedition dungeons' }, note: { de: 'je Exploration und Conquest', en: 'each with Exploration and Conquest' }, tone: 'teal' },
            { value: '2', label: { de: 'Transcendence-Dungeons', en: 'Transcendence dungeons' }, note: { de: 'ab Gegenstandsstufe 1.600', en: 'from item level 1,600' }, tone: 'violet' },
            { value: '10', label: { de: 'ungeöffnete Würfel pro Woche', en: 'unclaimed cubes a week' }, note: { de: 'für den ganzen Server', en: 'for the whole server' }, tone: 'rose' },
            { value: '40', label: { de: 'Odyle pro Conquest-Würfel', en: 'Odyle per Conquest cube' }, note: { de: 'der Abschluss selbst kostet nichts', en: 'the clear itself costs nothing' }, tone: 'gold' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Was es gibt', en: 'What there is' }, value: { de: 'Sechs Expeditions-Dungeons (Exploration und Conquest), zwei Transcendence-Dungeons, Nightmare, die Aufstiegs-Prüfung, der tägliche Dungeon und 161 versiegelte Solo-Dungeons. Der Raid Ludra ist vorerst entfernt.', en: 'Six Expedition dungeons (Exploration and Conquest), two Transcendence dungeons, Nightmare, the Ascension Trial, the Daily Dungeon and 161 solo sealed dungeons. The Ludra raid is removed for now.' } },
            { label: { de: 'Ausrüstungs-Prüfung', en: 'Gear check' }, value: { de: 'Die einzige feste Prüfung ist die Gegenstandsstufe beim Betreten – die Summe der Stufen deiner angelegten Ausrüstung. Viele Gruppen verlangen zusätzlich eine Mindest-Kampfkraft.', en: 'The only hard check is your item level at entry – the sum of the levels of your equipped gear. Many groups also ask for a minimum Combat Power.' } },
            { label: { de: 'Wochen-Reset', en: 'Weekly reset' }, value: { de: 'Mittwoch, 07:00 UTC', en: 'Wednesday, 07:00 UTC' } },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Werte aus Korea passen nicht', en: 'Korean numbers don’t fit' },
          text: {
            de: 'Korea hat mehr Dungeons, schwere Modi und höhere Grenzen. Der Global-Client enthält schon einiges davon – live ist es nicht. Wer Gegenstandsstufen aus koreanischen Guides abschreibt, plant falsch.',
            en: 'Korea has more dungeons, hard modes and higher gates. The Global client already contains some of it – it isn’t live. Copying item levels from Korean guides means planning wrong.',
          },
        },
      ],
    },
    {
      title: { de: 'Die Expeditions-Dungeons', en: 'The Expedition dungeons' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Jeder der sechs hat zwei Modi: **Exploration** zum Leveln (Epic-Ausrüstung, gebundenes Kina) und **Conquest** ab Stufe 45 zum Farmen (Unique-Ausrüstung, handelbares Kina). Die Dungeons kommen in Paaren: einer gibt Waffen und Schmuck, sein Partner die Rüstung derselben Stufe.',
            en: 'Each of the six has two modes: **Exploration** for levelling (Epic gear, bound Kina) and **Conquest** from level 45 for farming (Unique gear, tradeable Kina). The dungeons come in pairs: one gives weapons and accessories, its partner the armour of the same level.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Eintritt laut MetaBot und daevaguides. Exploration: Stufe / Gegenstandsstufe; Conquest immer ab Stufe 45. Eine Quelle nennt für Vakron Conquest 1.600.', en: 'Entry according to MetaBot and daevaguides. Exploration: level / item level; Conquest always from level 45. One source has Vakron Conquest at 1,600.' },
          head: ['Dungeon', { de: 'Sterne', en: 'Stars' }, 'Exploration', 'Conquest', { de: 'Spieler', en: 'Players' }, { de: 'Conquest-Beute', en: 'Conquest loot' }],
          rows: [
            ['**Krao Cave**', '★', '20 / 200', '700', '1–5', { de: 'Waffen (Rupture) und Schmuck (Berk), Stufe 54', en: 'weapons (Rupture) and accessories (Berk), level 54' }],
            ['**Draupnir**', '★', { de: '45 / 700', en: '45 / 700' }, '700', '1–5', { de: 'Rüstung (Bakarma), Stufe 54', en: 'armour (Bakarma), level 54' }],
            ['**Urugugu Canyon**', '★★', '28 / 300', { de: '1.400', en: '1,400' }, '2–5', { de: 'Waffen und Schmuck (Aulamus), Stufe 70', en: 'weapons and accessories (Aulamus), level 70' }],
            ['**Vakron Sky Island**', '★★', { de: '45 / 1.400', en: '45 / 1,400' }, { de: '1.400', en: '1,400' }, '2–5', { de: 'Rüstung (Vakron), Stufe 70', en: 'armour (Vakron), level 70' }],
            ['**Fire Temple**', '★★★', '35 / 500', { de: '2.100', en: '2,100' }, '1–5', { de: 'Waffen und Schmuck (Enraged Kromede), Stufe 86', en: 'weapons and accessories (Enraged Kromede), level 86' }],
            ['**Ferocious Horn Den**', '★★★', { de: '45 / 2.100', en: '45 / 2,100' }, { de: '2.100', en: '2,100' }, '1–5', { de: 'Rüstung (Nuakum), Stufe 86', en: 'armour (Nuakum), level 86' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**In jedem Conquest-Würfel:** Amplify Stone Fragment (Unique), Wrathful Mind, ein Kunstwerk (Artwork) und versiegelte Flügel – Material für Substance Morph.', en: '**In every Conquest cube:** Amplify Stone Fragment (Unique), Wrathful Mind, an Artwork and sealed wings – material for Substance Morph.' },
            { de: '**Nur in Fire Temple und Ferocious Horn Den:** Wrathful Ego. Vakron gibt Wrathful Will.', en: '**Only in Fire Temple and Ferocious Horn Den:** Wrathful Ego. Vakron gives Wrathful Will.' },
            { de: '**Exploration:** Epic-Ausrüstung der Stufen 25–38; Fire Temple gibt dort auch Unique-Kromede-Waffen der Stufe 43.', en: '**Exploration:** Epic gear of levels 25–38; Fire Temple also drops Unique Kromede weapons of level 43 there.' },
            { de: '**Vakron-Exploration:** Die Truhe lässt dich ein Teil der Stufe 70 auswählen – heb sie für das letzte fehlende Teil auf.', en: '**Vakron Exploration:** the chest lets you pick one level-70 piece – keep it for your last missing piece.' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Farm einen Waffen-Dungeon zusammen mit seinem Rüstungs-Partner: Krao und Draupnir, Urugugu und Vakron, Fire Temple und Ferocious Horn Den. Welche Stufe du wann angehst, steht im Power-Sprint.',
            en: 'Farm a weapon dungeon together with its armour partner: Krao and Draupnir, Urugugu and Vakron, Fire Temple and Ferocious Horn Den. Which tier to tackle when is in the Power sprint.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/power-sprint', label: { de: 'Power-Sprint: welche Stufe wann', en: 'Power sprint: which tier when' } }] },
      ],
    },
    {
      title: { de: 'Würfel, Odyle und Zähler', en: 'Cubes, Odyle and counters' },
      blocks: [
        {
          type: 'flow',
          title: { de: 'Was ein Durchgang kostet', en: 'What a run costs' },
          items: [
            { title: { de: 'Abschließen', en: 'Clear' }, text: { de: 'Kostet nichts', en: 'Costs nothing' }, tone: 'slate' },
            { title: { de: 'Würfel öffnen', en: 'Open the cube' }, tag: { de: '20–40 Odyle', en: '20–40 Odyle' }, text: { de: 'Erst hier wird Energie verbraucht – und ein Zähler', en: 'Only here is energy spent – and a counter' }, tone: 'gold' },
            { title: { de: 'Beute', en: 'Loot' }, text: { de: 'Mit Membership darfst du denselben Würfel ein zweites Mal öffnen', en: 'With Membership you may open the same cube a second time' }, tone: 'teal' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Odyle pro Würfel (MetaBot, daevaguides)', en: 'Odyle per cube (MetaBot, daevaguides)' },
          head: [{ de: 'Würfel', en: 'Cube' }, 'Odyle'],
          rows: [
            [{ de: 'Exploration Krao und Urugugu', en: 'Exploration Krao and Urugugu' }, '20'],
            [{ de: 'Exploration Fire Temple', en: 'Exploration Fire Temple' }, '30'],
            [{ de: 'Conquest, Transcendence, Raid', en: 'Conquest, Transcendence, raid' }, '40'],
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Odyle-Energie', en: 'Odyle Energy' }, value: { de: '+15 alle 3 Stunden, also 120 am Tag; höchstens 560, mit Membership 840. Lädt sich ab Stufe 22 auf.', en: '+15 every 3 hours, so 120 a day; at most 560, with Membership 840. Starts charging at level 22.' } },
            { label: { de: 'Wind-Breeze-Händler', en: 'Wind Breeze merchants' }, value: { de: 'Verkaufen gebundene Odyle-Energie (etwa 100.000 Kina pro 40), sonst 4 pro Charakter und 16 pro Server und Woche. Bis zur Wartung am 28. Oktober: 20 pro Charakter, ohne Server-Grenze. Membership nötig.', en: 'Sell bound Odyle Energy (about 100,000 Kina per 40), normally 4 per character and 16 per server a week. Until the maintenance on 28 October: 20 per character, no server limit. Membership required.' } },
            { label: { de: 'Herausforderungs-Tickets', en: 'Challenge tickets' }, value: { de: 'Geben +1 Versuch für Conquest oder Transcendence. Zuerst werden die normalen Versuche verbraucht.', en: 'Give +1 attempt for Conquest or Transcendence. The normal attempts are used first.' } },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Die Zähler (MetaBot, daevaguides, games.gg, mein-mmo). Bei Exploration und täglichem Dungeon nennen einzelne Quellen andere Zahlen.', en: 'The counters (MetaBot, daevaguides, games.gg, mein-mmo). For Exploration and the Daily Dungeon single sources give other numbers.' },
          head: [{ de: 'Was', en: 'What' }, { de: 'Wie viel', en: 'How much' }, { de: 'Gilt für', en: 'Counts for' }, { de: 'Verbraucht', en: 'Used' }],
          rows: [
            ['Conquest', { de: '+1 alle 8 Stunden, bis 21 – ein Topf für alle sechs', en: '+1 every 8 hours, up to 21 – one pool for all six' }, { de: 'Charakter', en: 'character' }, { de: 'beim Würfel', en: 'at the cube' }],
            ['Transcendence', { de: '+1 alle 12 Stunden, bis 14', en: '+1 every 12 hours, up to 14' }, { de: 'Charakter', en: 'character' }, { de: 'beim Würfel', en: 'at the cube' }],
            ['Exploration', { de: '7 pro Dungeon und Woche', en: '7 per dungeon a week' }, { de: 'Charakter', en: 'character' }, { de: 'beim Würfel', en: 'at the cube' }],
            [{ de: 'Ungeöffnete Würfel', en: 'Unclaimed cubes' }, { de: '10 pro Woche', en: '10 a week' }, { de: '**Server**', en: '**server**' }, { de: 'beim Verlassen ohne Öffnen', en: 'when leaving without opening' }],
            ['Nightmare', { de: '+2 pro Tag, bis 14 sammelbar', en: '+2 a day, banks up to 14' }, { de: 'Charakter', en: 'character' }, { de: 'nur beim Sieg', en: 'only on a win' }],
            [{ de: 'Aufstiegs-Prüfung', en: 'Ascension Trial' }, { de: '3 pro Woche', en: '3 a week' }, { de: 'Charakter', en: 'character' }, { de: 'beim Betreten', en: 'on entry' }],
            [{ de: 'Täglicher Dungeon', en: 'Daily Dungeon' }, { de: '14 pro Woche', en: '14 a week' }, { de: '**Server**', en: '**server**' }, { de: 'beim Betreten', en: 'on entry' }],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Würfel immer öffnen', en: 'Always open the cube' },
          text: {
            de: 'Wer einen abgeschlossenen Conquest- oder Transcendence-Durchgang verlässt, ohne den Würfel zu öffnen, verbraucht einen der 10 ungeöffneten Würfel des Servers. Stehen sie auf 0, kann niemand auf dem Server bis Mittwoch Conquest oder Transcendence betreten – auch deine Twinks nicht.',
            en: 'Leaving a cleared Conquest or Transcendence run without opening the cube uses up one of the server’s 10 unclaimed cubes. At 0, nobody on the server can enter Conquest or Transcendence until Wednesday – your alts included.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'Odyle im Wochenplan', en: 'Odyle in the week plan' } }, { href: '#/guides/multi-characters', label: { de: 'Was der Server teilt', en: 'What the server shares' } }] },
      ],
    },
    {
      title: { de: 'Garantierte Belohnungen und Glück', en: 'Guaranteed rewards and luck' },
      blocks: [
        {
          type: 'bars',
          title: { de: 'Durchgänge bis zum garantierten Gear Change Voucher', en: 'Runs until the guaranteed Gear Change Voucher' },
          caption: { de: 'Laut MetaBot und games.gg. Ein Sync Stone (Unique) ist nach 28 Durchgängen garantiert. Eine Quelle nennt für Draupnir mit Membership 7 statt 14 Öffnungen.', en: 'According to MetaBot and games.gg. A Sync Stone (Unique) is guaranteed after 28 runs. One source has Draupnir at 7 instead of 14 openings with Membership.' },
          items: [
            { label: 'Draupnir', value: 14, tone: 'teal' },
            { label: 'Vakron Sky Island', value: 21, tone: 'blue' },
            { label: 'Fire Temple', value: 28, tone: 'gold' },
            { label: 'Ferocious Horn Den', value: 28, tone: 'gold' },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Fire-Temple-Würfel: einige Chancen', en: 'Fire Temple cube: a few odds' },
          caption: { de: 'Aus den Client-Daten (MetaBot); die Beute würfelt der Server, die echten Chancen können abweichen. Der Endboss im Ferocious Horn Den hat für Unique-Teile 7,5 % auf Global, 10 % in Korea.', en: 'From the client data (MetaBot); the server rolls the loot, the real odds may differ. The Ferocious Horn Den final boss has 7.5% for Unique pieces on Global, 10% in Korea.' },
          unit: '%',
          max: 50,
          items: [
            { label: 'Amplify Stone Fragment', value: 48.8, display: { de: '48,8 %', en: '48.8%' }, tone: 'teal' },
            { label: 'Wrathful Ego', value: 5.9, display: { de: '5,9 %', en: '5.9%' }, tone: 'violet' },
            { label: 'Enraged Kromede Ring', value: 3.41, display: { de: '3,41 %', en: '3.41%' }, tone: 'gold' },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Auf Global gibt jeder Conquest-Dungeon einen Voucher als garantierte Belohnung, und das Umwandeln einer Waffe kostet 1 Voucher statt 2 wie in Korea. Pech gehört trotzdem dazu – Berichte über 60 Durchgänge ohne das gewünschte Teil sind keine Seltenheit.',
            en: 'On Global every Conquest dungeon gives a voucher as its guaranteed reward, and converting a weapon costs 1 voucher instead of 2 as in Korea. Bad luck is still part of it – reports of 60 runs without the piece you want are not rare.',
          },
        },
      ],
    },
    {
      title: both('Transcendence'),
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die zwei Transcendence-Dungeons sind auf Zeit und Punkte ausgelegt: wie schnell du bist und wie oft ihr sterbt, entscheidet das Ergebnis, und die Rangpunkte entscheiden über die Saison-Belohnungen. Punkte von Gegnern und Bossen öffnen den Weg zum Endboss. Gespielt wird mit 2–5 Spielern.',
            en: 'The two Transcendence dungeons are built around time and score: how fast you are and how often you die decide the result, and Rank Points decide the season rewards. Points from mobs and bosses open the way to the final boss. They are played with 2–5 players.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Stufen und Effekte laut MetaBot. Jede Stufe öffnet sich mit der Gegenstandsstufe; ob auch die Punkte der vorigen Stufe zählen, ist offen.', en: 'Tiers and effects according to MetaBot. Each tier opens with item level; whether the score of the previous tier counts too is open.' },
          head: [{ de: 'Stufe', en: 'Tier' }, { de: 'Ab', en: 'From' }, 'Deus Research Base', 'Shattered Arkanis'],
          rows: [
            ['1', { de: '1.600', en: '1,600' }, '–', '–'],
            ['2', { de: '1.900', en: '1,900' }, both('Balance'), both('Poison Blood')],
            ['3', { de: '2.200', en: '2,200' }, { de: '+ Wrath', en: '+ Wrath' }, { de: '+ Elevation', en: '+ Elevation' }],
            ['4', { de: '2.500', en: '2,500' }, { de: '+ Judgment', en: '+ Judgment' }, { de: '+ Tolerance', en: '+ Tolerance' }],
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Bosse', en: 'Bosses' }, value: { de: 'Deus Research Base: Atiel, Gelcos, Nazmun (Stufe 56 in Stufe 1 bis 68 in Stufe 4). Shattered Arkanis: Talisra, Siliator, Ruthilis.', en: 'Deus Research Base: Atiel, Gelcos, Nazmun (level 56 in tier 1 up to 68 in tier 4). Shattered Arkanis: Talisra, Siliator, Ruthilis.' } },
            { label: { de: 'Beute', en: 'Loot' }, value: { de: 'Arkana-Karten – 24 pro Dungeon, 6 pro Qualität – und Manasteine; in Stufe 4 auch Seelensteine und ein Amplify Stone Fragment. Welcher Dungeon welche Arkana-Slots gibt, steht im Arkana-Guide.', en: 'Arcana cards – 24 per dungeon, 6 per grade – and Manastones; in tier 4 also Soulstones and an Amplify Stone Fragment. Which dungeon gives which Arcana slots is in the Arcana guide.' } },
            { label: { de: 'Ranglisten-Event', en: 'Leaderboard event' }, value: { de: 'Bis 2. November gibt es Belohnungen für die besten 10 pro Server und Klasse, darunter 35.000 Enhance Stones und 30 Amplify Stones (Unique). Ergebnisse am 9. November.', en: 'Until 2 November the top 10 per server and class get rewards, among them 35,000 Enhance Stones and 30 Amplify Stones (Unique). Results on 9 November.' } },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/daevanion-stigma-arcana', label: { de: 'Arkana: Slots, Qualitäten, Verstärken', en: 'Arcana: slots, grades, enhancing' } }] },
      ],
    },
    {
      title: { de: 'Nightmare', en: 'Nightmare' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Aufbau', en: 'Layout' }, value: { de: 'Eine Solo-Leiter aus 26 Bossen mit je 10 Stufen in 4 Ebenen', en: 'A solo ladder of 26 bosses with 10 tiers each in 4 layers' } },
            { label: { de: 'Weiterkommen', en: 'Progress' }, value: { de: 'Ein Boss der zweiten Reihe braucht seine beiden Vorgänger auf Stufe 10; der letzte Boss einer Ebene beide Bosse der zweiten Reihe. Wer ihn auf Stufe 1 besiegt, öffnet die nächste Ebene.', en: 'A second-row boss needs its two openers at tier 10; a layer’s last boss needs both second-row bosses. Beating it at tier 1 opens the next layer.' } },
            { label: { de: 'Versuche', en: 'Attempts' }, value: { de: '+2 pro Tag, bis 14 sammelbar. Ein Versuch zählt nur, wenn du gewinnst – Niederlagen kosten nichts. Gegenstände geben bis zu 30 Versuche zusätzlich.', en: '+2 a day, banks up to 14. An attempt only counts when you win – losses are free. Items give up to 30 extra attempts.' } },
            { label: { de: 'Beute', en: 'Loot' }, value: { de: 'Phantasmal Fragments für den Nightmare-Shop: beim ersten Sieg 500 (erster Boss, Stufe 1) bis 3.950 (letzter Boss, Stufe 10), danach 100–1.010', en: 'Phantasmal Fragments for the Nightmare shop: on the first win 500 (first boss, tier 1) up to 3,950 (last boss, tier 10), then 100–1,010' } },
            { label: { de: 'Sofort-Abschluss', en: 'Instant Clear' }, value: { de: 'Nach dem ersten Sieg holen Instant Clear Tickets dieselbe Belohnung noch einmal, bis zu 50 auf einmal; jedes kostet einen Versuch. Aus der Nightmare-Lobby geben sie keine Rangpunkte.', en: 'After the first win, Instant Clear Tickets claim the same reward again, up to 50 at once; each one uses an attempt. Used from the Nightmare lobby they give no Rank Points.' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Weil Niederlagen nichts kosten, versuch dich immer an der nächsten Stufe, die du noch nicht geschafft hast – und lass die Versuche nicht auf 14 stehen, sonst verfallen neue.',
            en: 'Since losses are free, always try the next tier you haven’t beaten yet – and don’t let the attempts sit at 14, or new ones are lost.',
          },
        },
      ],
    },
    {
      title: { de: 'Aufstiegs-Prüfung und täglicher Dungeon', en: 'Ascension Trial and Daily Dungeon' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Aufstiegs-Prüfung: solo, 3 Versuche pro Woche, beim Betreten verbraucht (MetaBot, games.gg). Die vierte Stufe heißt je nach Quelle „Challenge“ oder „Extreme“.', en: 'Ascension Trial: solo, 3 attempts a week, used on entry (MetaBot, games.gg). The fourth tier is called “Challenge” or “Extreme” depending on the source.' },
          head: [{ de: 'Stufe', en: 'Tier' }, { de: 'Ab Gegenstandsstufe', en: 'From item level' }, { de: 'Erlaubte Tode', en: 'Deaths allowed' }],
          rows: [
            ['Easy', { de: '1.000', en: '1,000' }, '5'],
            ['Normal', { de: '1.500', en: '1,500' }, '3'],
            ['Hard', { de: '2.000', en: '2,000' }, '2'],
            ['Challenge', { de: '2.500', en: '2,500' }, '2'],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Aufstiegs-Prüfung gibt:** Enhance Stones, ein Amplify Stone Fragment (Unique), eine Haustier-Truhe und eine Truhe mit Manastein oder Seelenstein. Nimm die höchste Stufe, die du mit den erlaubten Toden schaffst.', en: '**Ascension Trial gives:** Enhance Stones, an Amplify Stone Fragment (Unique), a pet chest and a chest with a Manastone or Soulstone. Take the highest tier you can finish within the death limit.' },
            { de: '**Täglicher Dungeon „Unknown Fissure“:** ab Stufe 30, solo, Wellen mit Punkten; gibt Enhance Stones. 14 Betritte pro Woche – für den ganzen Server.', en: '**Daily Dungeon “Unknown Fissure”:** from level 30, solo, scored waves; gives Enhance Stones. 14 entries a week – for the whole server.' },
            { de: '**Spät in der Woche:** Beide lohnen sich kurz vor dem Reset am meisten, wenn deine Gegenstandsstufe am höchsten ist.', en: '**Late in the week:** both pay most just before the reset, when your item level is highest.' },
            { de: '**Sofort-Tickets:** Das Instant Clear Ticket für den täglichen Dungeon liegt seit dem 14. Oktober unter Substance Morph → Special → Wind Breeze Merchants.', en: '**Instant tickets:** since 14 October the Daily Dungeon Instant Clear Ticket sits under Substance Morph → Special → Wind Breeze Merchants.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Eine Gruppe finden', en: 'Finding a group' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Lobby:** Erstell einen Raum mit den Rollen, die du suchst, oder nutz Quick Join. „Challenge again“ schickt dieselbe Gruppe direkt wieder hinein.', en: '**Lobby:** create a room with the roles you want, or use Quick Join. “Challenge again” sends the same party straight back in.' },
            { de: '**Serverübergreifend:** Gruppen mischen Spieler aller Server einer Region, im PvE auch beide Fraktionen – außer du setzt den Haken „nur meine Fraktion“.', en: '**Cross-server:** groups mix players from every server of a region, in PvE both factions too – unless you tick “my faction only”.' },
            { de: '**Endboss-Wut:** Die Conquest-Endbosse werden nach 5 Minuten wütend. Wartet mit dem Pull, bis die ganze Gruppe da ist.', en: '**Final-boss enrage:** the Conquest final bosses enrage after 5 minutes. Wait with the pull until the whole party is there.' },
            { de: '**Zwischenbosse:** Jeder Conquest-Boss würfelt seine eigene Beute – Gruppen spielen deshalb entweder alles oder nur den Endboss. In Draupnir Conquest kann man die Zwischenbosse auslassen, in Exploration nicht.', en: '**Mid-bosses:** every Conquest boss rolls its own loot – so groups either clear everything or only the final boss. In Draupnir Conquest you can skip the mid-bosses, in Exploration you can’t.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Feldbosse', en: 'Field bosses' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Wo', en: 'Where' }, value: { de: '24 Bosse in Verteron (Elyos) und 24 in Altgard (Asmodier). Die meisten haben Stufe 45; Dartan, Kashapa und Lagta 48, Gartua 51. Die Bosse der Gegner erreichst du über den Spacetime Rift.', en: '24 bosses in Verteron (Elyos) and 24 in Altgard (Asmodians). Most are level 45; Dartan, Kashapa and Lagta 48, Gartua 51. You reach the enemy faction’s bosses through the Spacetime Rift.' } },
            { label: { de: 'Wann', en: 'When' }, value: { de: 'Kein fester Zeitplan: der Timer startet beim Tod, und jeder Server hat seine eigenen. Im Spiel: Karte → Reiter Exploration → Field Boss zeigt „Spawned“ oder einen Countdown.', en: 'No fixed schedule: the timer starts on death, and every server has its own. In game: Map → Exploration tab → Field Boss shows “Spawned” or a countdown.' } },
            { label: { de: 'Abstände', en: 'Intervals' }, value: { de: 'Umstritten: Dartan und Kashapa 6 Stunden, Lagta und Gartua 12 – eine andere Quelle nennt kürzere Zeiten. Die übrigen Bosse brauchen 30 Minuten bis 6 Stunden.', en: 'Disputed: Dartan and Kashapa 6 hours, Lagta and Gartua 12 – another source gives shorter times. The other bosses take 30 minutes to 6 hours.' } },
            { label: { de: 'Beute', en: 'Loot' }, value: { de: 'Eine sichere Beutetruhe, eine Chance auf Set-Teile und Verfeinerungssteine; die Kommandanten der Stufe 48 geben mit 25 % ein Kunstwerk (Artwork). Laut einer Quelle bekommt jeder Beteiligte seine eigene Beute, ohne Odyle-Kosten.', en: 'A guaranteed loot chest, a chance at set pieces and refining stones; the level-48 commanders give an Artwork at 25%. According to one source everyone who fought gets their own loot, at no Odyle cost.' } },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/abyss-pvp', label: { de: 'Die Abyss-Bosse und ihre Zeiten', en: 'The Abyss bosses and their times' } }] },
      ],
    },
    {
      title: { de: 'Der Raid Ludra', en: 'The Ludra raid' },
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Vorerst entfernt', en: 'Removed for now' },
          text: {
            de: 'NC hat den Sanctuary-Raid Ludra am 5. Oktober aus dem Spiel genommen, weil Early-Access-Spieler ihn mit weniger Ausrüstung geschafft hatten als geplant. Er kommt mit neuen und geänderten Mechaniken zurück, mit einem neuen First-Clear-Event und einer zurückgesetzten Ruhmeshalle. Die Ausrüstung aus dem Early Access wurde entfernt und soll samt Material zurückgegeben werden. Einen Termin gibt es bis heute nicht.',
            en: 'NC took the Sanctuary raid Ludra out of the game on 5 October because Early Access players had cleared it with less gear than intended. It returns with new and adjusted mechanics, a new First Clear event and a reset Hall of Fame. The Early Access gear was removed and is to be returned along with the materials. There is no date yet.',
          },
        },
        {
          type: 'text',
          text: {
            de: 'Vor dem Umbau galt: 10 Spieler, Stufe 45, etwa Gegenstandsstufe 2.800, 4 Versuche pro Woche und 1 Endboss-Kill pro Woche. Ob das nach der Rückkehr so bleibt, ist offen.',
            en: 'Before the rework it was: 10 players, level 45, about item level 2,800, 4 attempts a week and 1 final-boss kill a week. Whether that stays after the return is open.',
          },
        },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Würfel nicht geöffnet** – kostet einen der 10 ungeöffneten Würfel des Servers.', en: '**Not opening the cube** – costs one of the server’s 10 unclaimed cubes.' },
            { de: '**Odyle beim Leveln für Exploration-Würfel ausgegeben** – heb sie für 45 auf.', en: '**Spending Odyle on Exploration cubes while levelling** – save it for 45.' },
            { de: '**Odyle an der Grenze** – was darüber käme, verfällt.', en: '**Odyle at the cap** – anything above it is lost.' },
            { de: '**Nightmare-Versuche auf 14 stehen lassen** – neue verfallen.', en: '**Letting Nightmare attempts sit at 14** – new ones are lost.' },
            { de: '**Server-Inhalte auf dem Twink** – täglicher Dungeon und ungeöffnete Würfel zählen für den ganzen Server; nutz sie auf dem Hauptcharakter.', en: '**Server-wide content on an alt** – Daily Dungeon and unclaimed cubes count for the whole server; use them on your main.' },
            { de: '**Werte aus Korea übernommen** – Grenzen und Dungeons sind dort anders.', en: '**Copying numbers from Korea** – gates and dungeons are different there.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Korea oder Global?', en: 'Korea or Global?' },
      blocks: [
        {
          type: 'table',
          head: ['', 'Global', { de: 'Korea', en: 'Korea' }],
          rows: [
            [{ de: 'Expeditions-Dungeons', en: 'Expedition dungeons' }, '6', { de: 'mehr (Dying Dramata’s Nest, Cradle of Nihility, Citadel of the Fallen Daeva …)', en: 'more (Dying Dramata’s Nest, Cradle of Nihility, Citadel of the Fallen Daeva …)' }],
            [{ de: 'Schwere Modi', en: 'Hard modes' }, { de: 'keine', en: 'none' }, { de: 'Hard seit Dezember 2025, dazu Ordeal', en: 'Hard since December 2025, plus Ordeal' }],
            [{ de: 'Transcendence-Dungeons', en: 'Transcendence dungeons' }, '2', { de: 'mehr', en: 'more' }],
            [{ de: 'Raids', en: 'Raids' }, { de: 'Ludra entfernt', en: 'Ludra removed' }, { de: 'mehrere', en: 'several' }],
            [{ de: 'Conquest-Grenzen', en: 'Conquest gates' }, { de: '700 / 1.400 / 2.100', en: '700 / 1,400 / 2,100' }, { de: 'höher', en: 'higher' }],
            [{ de: 'Reset', en: 'Reset' }, { de: 'Mittwoch 07:00 UTC', en: 'Wednesday 07:00 UTC' }, { de: 'Mittwoch 05:00 Ortszeit', en: 'Wednesday 05:00 local time' }],
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
            de: 'Offen sind: wann Ludra zurückkommt und mit welcher Gegenstandsstufe; ob der Conquest-Zähler ein gemeinsamer Topf ist oder pro Dungeon-Paar zählt (der Client kennt beides); ob es ein 60-Minuten-Limit pro Durchgang gibt; wie lange ein Durchgang auf Global dauert; die echten Abstände der Feldbosse; ob Nightmare ab Stufe 45 oder ab Gegenstandsstufe 1.000 offen ist; und die echten Drop-Chancen. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open are: when Ludra returns and at what item level; whether the Conquest counter is one shared pool or counts per dungeon pair (the client has both); whether there is a 60-minute limit per run; how long a run takes on Global; the real field-boss intervals; whether Nightmare opens at level 45 or at item level 1,000; and the real drop rates. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://lounge.plaync.com/feed/83070', label: 'NC PURPLE Lounge – Sanctuary raid Ludra (official)' },
            { href: 'https://store.steampowered.com/news/app/3393110', label: 'Steam – AION 2 news (official patch notes)' },
            { href: 'https://metabot.gg/en/aion-2/guides/dungeon-guide', label: 'metabot.gg – Dungeon guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/endgame-guide', label: 'metabot.gg – Endgame guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/daily-weekly-checklist', label: 'metabot.gg – Daily & weekly checklist' },
            { href: 'https://metabot.gg/en/aion-2/transcendence', label: 'metabot.gg – Transcendence' },
            { href: 'https://metabot.gg/en/aion-2/dungeons/fire-temple', label: 'metabot.gg – Fire Temple' },
            { href: 'https://metabot.gg/en/aion-2/dungeons/draupnir', label: 'metabot.gg – Draupnir' },
            { href: 'https://daevaguides.com/en/guides/dungeons-list/', label: 'daevaguides – Dungeons list' },
            { href: 'https://daevaguides.com/en/guides/odyle-energy/', label: 'daevaguides – Odyle Energy' },
            { href: 'https://daevaguides.com/en/guides/field-bosses/', label: 'daevaguides – Field bosses' },
            { href: 'https://daevaguides.com/en/guides/reset-times/', label: 'daevaguides – Reset times' },
            { href: 'https://daevaguides.com/en/guides/global-vs-korea/', label: 'daevaguides – Global vs Korea' },
            { href: 'https://games.gg/aion-2/guides/aion-2-ferocious-horn-den-guide/', label: 'games.gg – Ferocious Horn Den guide' },
            { href: 'https://games.gg/aion-2/guides/aion-2-draupnir-guide/', label: 'games.gg – Draupnir guide' },
            { href: 'https://allthings.how/aion-2-world-boss-timers-every-field-and-abyss-boss-spawn-schedule/', label: 'AllThings.How – Field and Abyss boss timers' },
            { href: 'https://mein-mmo.de/aion-2-sanctuary-weihestaette-ludra-wo-ist-der-raid/', label: 'Mein-MMO – Where is the Ludra raid?' },
            { href: 'https://mein-mmo.de/aion-2-loot-glueck-feuertempel/', label: 'Mein-MMO – Fire Temple loot' },
            { href: 'https://aion2hub.com/news/aion-2-sanctuary-raid-ludra-removed-at-launch', label: 'AION2Hub – Ludra removed at launch' },
            { href: 'https://aion2hub.com/news/aion-2-producers-letter-welcome-to-atreia', label: 'AION2Hub – Producer’s Letter' },
            { href: 'https://aion2hub.com/news/aion-2-community-launch-events-daeva-makeover', label: 'AION2Hub – Launch events (Transcendence leaderboard)' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-14', label: 'AION2Hub – Global patch notes 14 Oct 2026' },
            { href: 'https://aion2.vi.ki/expeditions', label: 'aion2.vi.ki – Expeditions' },
          ],
        },
      ],
    },
  ],
};
