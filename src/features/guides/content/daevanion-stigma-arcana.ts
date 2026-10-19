import type { Guide, L10n } from '../types';

/**
 * Daevanion, Stigmas and Arcana on the global server: how the three systems work, what they cost and where the
 * materials come from (October 2026). Numbers and facts from the sources at the end, paraphrased; most come from
 * MetaBot's guides (Global client data), checked against daevaguides, aion2builds, AllThings.How, gameplay.tips and
 * timesaver. No Global patch since launch touched these systems. The point budget (≈416 of 570) is the sum of the
 * one-time sources below. Combat Power per step and what the top 80 do are in combat-power.ts and power-sprint.ts;
 * class builds are in the class guides – this guide only links them.
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });

export const daevanionStigmaArcana: Guide = {
  id: 'daevanion-stigma-arcana',
  icon: 'board',
  tone: 'violet',
  category: 'basics',
  title: {
    de: 'Daevanion, Stigmen & Arkana: wie sie funktionieren',
    en: 'Daevanion, Stigmas & Arcana: how they work',
  },
  summary: {
    de: 'Die drei Systeme, die deine Skills stärker machen: Bretter, Knoten und woher die Kristalle kommen, Stigma-Kosten und Splitter-Quellen, Arkana-Slots, Erfahrung und Umwandeln – mit dem, was auf Global anders ist als in Korea.',
    en: 'The three systems that make your skills stronger: boards, nodes and where the crystals come from, stigma costs and shard sources, Arcana slots, experience and transmuting – with what differs on Global from Korea.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Daevanion', en: 'Daevanion' },
    { de: 'Stigmen', en: 'Stigmas' },
    { de: 'Arkana', en: 'Arcana' },
    { de: 'Skill-Stufen', en: 'Skill levels' },
  ],
  basis: {
    de: 'Recherche in Community-Guides zum globalen Server (Oktober 2026); die meisten Zahlen stammen aus den Client-Daten, wie MetaBot sie ausliest',
    en: 'Research in community guides for the global server (October 2026); most numbers come from the client data as MetaBot reads it',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '5', label: { de: 'Daevanion-Bretter auf Global', en: 'Daevanion boards on Global' }, note: { de: 'Korea hat mehr', en: 'Korea has more' }, tone: 'violet' },
            { value: { de: '≈ 73 %', en: '≈ 73%' }, label: { de: 'der vier PvE-Bretter erreichbar', en: 'of the four PvE boards reachable' }, note: { de: '≈ 416 von 570 Punkten', en: '≈ 416 of 570 points' }, tone: 'gold' },
            { value: '4 × 20', label: { de: 'Stigma-Slots und Höchststufe', en: 'stigma slots and max level' }, note: { de: 'Korea: 6 × 25', en: 'Korea: 6 × 25' }, tone: 'blue' },
            { value: '5', label: { de: 'Arkana-Slots', en: 'Arcana slots' }, note: { de: 'ab Stufe 45', en: 'from level 45' }, tone: 'teal' },
          ],
        },
        {
          type: 'flow',
          title: { de: 'So kommt ein Skill auf Stufe 20', en: 'How a skill gets to level 20' },
          caption: { de: 'Die Leiter der Skill-Stufen auf Global (aion2builds, daevaguides). Stigmen steigen nur mit Stigma-Splittern – Daevanion hebt sie nicht.', en: 'The skill-level ladder on Global (aion2builds, daevaguides). Stigmas only rise with Stigma Shards – Daevanion does not raise them.' },
          items: [
            { title: { de: 'Skill-Punkte', en: 'Skill points' }, tag: { de: 'bis 10', en: 'up to 10' }, text: { de: 'Aus dem Leveln und aus versiegelten Dungeons', en: 'From levelling and sealed dungeons' }, tone: 'slate' },
            { title: both('Daevanion'), tag: '+4 → 14', text: { de: 'Ein Knoten pro aktivem Skill auf jedem der vier PvE-Bretter', en: 'One node per active skill on each of the four PvE boards' }, tone: 'violet' },
            { title: { de: 'Ringe', en: 'Rings' }, tag: '+2 → 16', text: { de: 'Je +1 auf bis zu zwei Skills', en: '+1 each to up to two skills' }, tone: 'blue' },
            { title: { de: 'Arkana', en: 'Arcana' }, tag: { de: 'bis 20', en: 'up to 20' }, text: { de: 'Die Skill-Zeilen der Karten', en: 'The skill lines of the cards' }, tone: 'teal' },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Vorsicht bei koreanischen Videos', en: 'Careful with Korean videos' },
          text: {
            de: 'Korea ist ein Jahr weiter: dort gibt es mehr Bretter, sechs Stigma-Slots mit Stufe 25 und mehr Arkana-Slots. Wer solche Pläne kopiert, plant Dinge, die es auf Global nicht gibt.',
            en: 'Korea is a year ahead: it has more boards, six stigma slots up to level 25 and more Arcana slots. Copying those plans means planning for things Global doesn’t have.',
          },
        },
      ],
    },
    {
      title: { de: 'Daevanion: die Bretter', en: 'Daevanion: the boards' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Die fünf Bretter auf Global (MetaBot, daevaguides); „voll“ = alle Knoten eines Bretts', en: 'The five boards on Global (MetaBot, daevaguides); “full” = every node of a board' },
          head: [{ de: 'Brett', en: 'Board' }, { de: 'Ab Stufe', en: 'From level' }, { de: 'Knoten', en: 'Nodes' }, { de: 'Punkte voll', en: 'Points full' }, { de: 'Ecken', en: 'Corners' }],
          rows: [
            ['**Nezekan**', '12', '88', '134', { de: '2× Combat Speed, 2× Cooldown Reduction (voll je +3 %)', en: '2× Combat Speed, 2× Cooldown Reduction (+3% each when full)' }],
            ['**Zikel**', '20', '88', '134', both('Damage Boost, Damage Tolerance')],
            ['**Vaizel**', '30', '88', '134', both('Critical Damage Boost, Critical Damage Tolerance')],
            ['**Triniel**', '40', '116', '168', { de: '3× Multi-hit Chance, 3× Multi-hit Resist (je +4,5 %)', en: '3× Multi-hit Chance, 3× Multi-hit Resist (+4.5% each)' }],
            ['**Azphel**', '45', '152', '232', { de: 'PvP: 4× Damage Boost, 4× Damage Tolerance (je +6 %), Status Effect Chance und Resist +8 %', en: 'PvP: 4× Damage Boost, 4× Damage Tolerance (+6% each), Status Effect Chance and Resist +8%' }],
          ],
        },
        {
          type: 'table',
          caption: { de: 'Was ein Knoten kostet', en: 'What a node costs' },
          head: [{ de: 'Knoten', en: 'Node' }, { de: 'Punkte', en: 'Points' }, { de: 'Was er gibt', en: 'What it gives' }],
          rows: [
            [{ de: 'Grau', en: 'Grey' }, '1', { de: 'einen festen Wert', en: 'a flat stat' }],
            [{ de: 'Grün', en: 'Green' }, '2', { de: '+1 auf einen passiven Skill', en: '+1 to a passive skill' }],
            [{ de: 'Blau', en: 'Blue' }, '3', { de: '+1 auf einen aktiven Skill', en: '+1 to an active skill' }],
            [{ de: 'Orange (Ecke)', en: 'Orange (corner)' }, '4', { de: '+1,5 % des Hauptwerts des Bretts', en: '+1.5% of the board’s headline stat' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Wege:** Du startest am freien Mittelpunkt und kaufst nur Knoten, die an deine anschließen.', en: '**Paths:** you start at the free centre node and can only buy nodes connected to ones you own.' },
            { de: '**Zwei Töpfe:** Die vier PvE-Bretter teilen sich einen Topf aus Daevanion-Kristallen. Azphel hat einen eigenen Kristall (Daevanion Crystal: Azphel).', en: '**Two pools:** the four PvE boards share one pool of Daevanion Crystals. Azphel has a crystal of its own (Daevanion Crystal: Azphel).' },
            { de: '**Skills:** Jeder aktive Skill hat auf jedem PvE-Brett einen Knoten – zusammen +4.', en: '**Skills:** every active skill has one node on each PvE board – +4 in total.' },
            { de: '**Gegenstandsstufe:** Jeder ausgegebene Kristall gibt +1 Gegenstandsstufe.', en: '**Item level:** every crystal you spend gives +1 item level.' },
          ],
        },
        { type: 'links', items: [{ href: '#/daevanion', label: { de: 'Im Daevanion-Planer ausprobieren', en: 'Try it in the Daevanion planner' }, primary: true }] },
      ],
    },
    {
      title: { de: 'Daevanion: woher die Kristalle kommen', en: 'Daevanion: where the crystals come from' },
      blocks: [
        {
          type: 'bars',
          title: { de: 'Daevanion-Kristalle für die PvE-Bretter', en: 'Daevanion Crystals for the PvE boards' },
          caption: {
            de: 'Alle Quellen gibt es nur einmal (AllThings.How, MetaBot, daevaguides). Zusammen ≈ 416 Punkte – die vier PvE-Bretter kosten 570, du kannst also nicht alle füllen. Halten kannst du bis 840.',
            en: 'Every source is one-time only (AllThings.How, MetaBot, daevaguides). Together ≈ 416 points – the four PvE boards cost 570, so you can’t fill them all. You can hold up to 840.',
          },
          items: [
            { label: { de: 'Leveln 12 → 45', en: 'Levelling 12 → 45' }, value: 136, note: { de: '4 pro Stufe', en: '4 per level' }, tone: 'violet' },
            { label: { de: 'Versiegelte Dungeons', en: 'Sealed dungeons' }, value: 122, note: { de: '61 × 2, nur auf deiner eigenen Karte, nur der erste Abschluss', en: '61 × 2, only on your own faction’s map, first clear only' }, tone: 'violet' },
            { label: { de: 'Gebietsquests', en: 'Regional quests' }, value: 58, note: { de: '58 × 1, ein paar Ketten geben 2 oder 0', en: '58 × 1, a few chains give 2 or 0' }, tone: 'blue' },
            { label: { de: 'Shugo-Festival-Shop', en: 'Shugo Festival shop' }, value: 50, note: { de: '10.500 Centuryroot Tokens für alle 50, pro Charakter', en: '10,500 Centuryroot Tokens for all 50, per character' }, tone: 'gold' },
            { label: { de: 'Nightmare-Shop', en: 'Nightmare shop' }, value: 50, note: { de: 'je 300 Phantasmal Fragments, pro Charakter', en: '300 Phantasmal Fragments each, per character' }, tone: 'gold' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Shugo-Preise', en: 'Shugo prices' }, value: { de: '10 zu 50, 10 zu 100, 15 zu 200 und 15 zu 400 Tokens', en: '10 at 50, 10 at 100, 15 at 200 and 15 at 400 tokens' } },
            { label: { de: 'Gegnerische Dungeons', en: 'Enemy dungeons' }, value: { de: 'Versiegelte Dungeons auf der Karte der Gegner geben auf Global keine Kristalle mehr, nur AP und Steine', en: 'Sealed dungeons on the enemy map give no crystals on Global any more, only AP and stones' } },
            { label: { de: 'Gebunden', en: 'Bound' }, value: { de: 'Kristalle lassen sich nicht verschicken – jeder Twink sammelt selbst', en: 'Crystals can’t be mailed – every alt collects its own' } },
            { label: both('Azphel'), value: { de: 'Der Abyss-Shop verkauft 110 Azphel-Kristalle pro Charakter: 20 zu 10.000, 30 zu 20.000, 30 zu 40.000 und 30 zu 80.000 AP – zusammen 4,4 Mio. AP. Den Rest gibt es über den Monolithen. Azphel ist nur für PvP.', en: 'The Abyss shop sells 110 Azphel crystals per character: 20 at 10,000, 30 at 20,000, 30 at 40,000 and 30 at 80,000 AP – 4.4M AP in total. The rest comes from the Monolith. Azphel is PvP only.' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Daevanion: was zuerst', en: 'Daevanion: what first' },
      blocks: [
        {
          type: 'steps',
          items: [
            { title: { de: 'Die Skills deiner Rotation', en: 'The skills of your rotation' }, text: { de: 'Erst die blauen Knoten der aktiven Skills, die du wirklich drückst – auf dem billigsten Weg dorthin. Darin sind sich alle Quellen einig.', en: 'First the blue nodes of the active skills you actually press – on the cheapest route there. All sources agree on that.' } },
            { title: { de: 'Die Ecken', en: 'The corners' }, text: { de: 'Combat Speed und Cooldown Reduction auf Nezekan, Damage Boost auf Zikel, Critical Damage auf Vaizel. Magier und Kleriker nehmen Nezekans Ecken oft schon vor den Skill-Knoten.', en: 'Combat Speed and Cooldown Reduction on Nezekan, Damage Boost on Zikel, Critical Damage on Vaizel. Sorcerers and Clerics often take Nezekan’s corners before the skill nodes.' } },
            { title: { de: 'Passive, dann Grau', en: 'Passives, then grey' }, text: { de: 'Danach die grünen Knoten der passiven Skills, die grauen zuletzt.', en: 'Then the green nodes of passive skills, the grey ones last.' } },
            { title: { de: 'Was du für PvE auslässt', en: 'What to skip for PvE' }, text: { de: 'Die Ecken Multi-hit Resist und Critical Damage Tolerance; Verteidigung nur, wenn du zu oft stirbst. Azphel erst für PvP.', en: 'The Multi-hit Resist and Critical Damage Tolerance corners; defence only if you die too often. Azphel only for PvP.' } },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: '„Alle Knoten lernen“ vor 45', en: '“Learn all nodes” before 45' },
          text: {
            de: 'Der Knopf kauft das ganze Brett. Nezekan kostet voll 134 Punkte – ein Weg zu den wichtigen Knoten eines Templers etwa 67. Bei einem Budget, das nie für alles reicht, verschenkst du damit die Hälfte.',
            en: 'The button buys the whole board. Nezekan costs 134 points in full – a route to a Templar’s key nodes about 67. With a budget that never covers everything, that throws half of it away.',
          },
        },
        {
          type: 'text',
          text: {
            de: '**Umbauen:** Knoten lassen sich zurückgeben, die äußeren zuerst. Auf Global kostet das laut einer Quelle 500 Kina pro Knoten, egal wie groß – andere nennen den Preis unbestätigt. Welche Knoten deine Klasse nimmt, steht im Klassen-Guide.',
            en: '**Rebuilding:** nodes can be refunded, the outer ones first. On Global one source puts it at 500 Kina per node, whatever its size – others call the price unconfirmed. Which nodes your class takes is in its class guide.',
          },
        },
      ],
    },
    {
      title: { de: 'Stigmen', en: 'Stigmas' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Freischalten', en: 'Unlock' }, value: { de: 'Stufe 22 und die dritte Aufstiegs-Quest „The One Who Hears the Voice“ – sie gibt auch den ersten Splitter', en: 'Level 22 and the third Ascension quest “The One Who Hears the Voice” – it also gives the first shard' } },
            { label: both('Slots'), value: { de: '4, ab Stufe 22, 27, 32 und 37', en: '4, from level 22, 27, 32 and 37' } },
            { label: { de: 'Auswahl', en: 'Choice' }, value: { de: '13 Stigmen pro Klasse, im Skill-Fenster im Reiter Stigma; Stufe 1 kostet 1 Splitter', en: '13 stigmas per class, in the skill window on the Stigma tab; level 1 costs 1 shard' } },
            { label: { de: 'Höchststufe', en: 'Max level' }, value: { de: '20 auf Global. Darüber braucht es Superior Stigma Shards – die gibt es erst ab Stufe 46, also noch nicht.', en: '20 on Global. Beyond that it takes Superior Stigma Shards – they only come from level 46, so not yet.' } },
            { label: { de: 'Spezialisierungen', en: 'Specialisations' }, value: { de: 'Öffnen sich von selbst auf Stufe 5, 10, 15 und 20', en: 'Open by themselves at level 5, 10, 15 and 20' } },
            { label: { de: 'Wechseln', en: 'Swapping' }, value: { de: 'Nicht im Kampf, und kein Preset-Wechsel, solange ein Stigma abklingt', en: 'Not in combat, and no preset change while a stigma is on cooldown' } },
          ],
        },
        {
          type: 'line',
          title: { de: 'Splitter für ein Stigma', en: 'Shards for one stigma' },
          caption: { de: 'Jede Stufe kostet 1, 2, 4 oder 8 Splitter in Fünferstufen (MetaBot, daevaguides, aion2builds). Ein Stigma auf 20 kostet 75, alle vier 300 – die Stufen 16–20 sind mehr als die Hälfte davon.', en: 'Each level costs 1, 2, 4 or 8 shards in steps of five (MetaBot, daevaguides, aion2builds). One stigma at 20 costs 75, all four 300 – levels 16–20 are more than half of that.' },
          x: { label: { de: 'Stigma-Stufe', en: 'Stigma level' }, ticks: ['5', '10', '15', '20'] },
          y: { label: { de: 'Splitter gesamt', en: 'Shards in total' }, min: 0 },
          series: [{ label: { de: 'Splitter bis zu dieser Stufe', en: 'Shards up to this level' }, values: [5, 15, 35, 75], tone: 'blue' }],
        },
        {
          type: 'table',
          caption: { de: 'Woher die Splitter kommen (pro Charakter)', en: 'Where the shards come from (per character)' },
          head: [{ de: 'Quelle', en: 'Source' }, { de: 'Splitter', en: 'Shards' }, { de: 'Preis', en: 'Price' }],
          rows: [
            [{ de: 'Leveln 23–45 und Aufstiegs-Quest', en: 'Levelling 23–45 and Ascension quest' }, '≈ 30', { de: '1 pro Stufe ab 23, auf den letzten Stufen 2 pro Stufe (ab 39 oder 40 – die Quellen zählen verschieden)', en: '1 per level from 23, 2 per level on the last levels (from 39 or 40 – the sources count differently)' }],
            [{ de: 'Nightmare-Shop', en: 'Nightmare shop' }, '35', { de: 'je 1.500 Phantasmal Fragments', en: '1,500 Phantasmal Fragments each' }],
            [{ de: 'Shugo-Festival-Shop', en: 'Shugo Festival shop' }, '35', { de: 'je 300 Centuryroot Tokens', en: '300 Centuryroot Tokens each' }],
            [{ de: 'Abyss-Shop (ab 45)', en: 'Abyss shop (from 45)' }, '200', { de: '4 Stufen à 50 zu 10.000 / 15.000 / 20.000 / 25.000 AP', en: '4 steps of 50 at 10,000 / 15,000 / 20,000 / 25,000 AP' }],
            [{ de: 'Kleinkram', en: 'Small sources' }, '–', { de: 'Erfolge (2 pro Stufe), Daeva Pass, Arena- und Schlachtfeld-Shop', en: 'achievements (2 per step), Daeva Pass, Arena and Battlefield shops' }],
            [{ de: 'Unstable Stigma Shards', en: 'Unstable Stigma Shards' }, '–', { de: 'aus Gruppen-Dungeons und Kisten; per Substance Morph umwandeln (seit 7.10. höchstens 20 pro Server und Woche, die billige Variante kann scheitern)', en: 'from party dungeons and boxes; convert with Substance Morph (since 7 Oct at most 20 per server and week, the cheap option can fail)' }],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Erst die kostenlosen Splitter', en: 'Free shards first' },
          text: {
            de: 'Hol die Splitter aus dem Nightmare- und dem Shugo-Shop, bevor du AP ausgibst. Hast du einen **Special Growth Voucher: Stigma Shard**, lös ihn vorher ein: Er hebt deine gesamten Splitter auf 180 und bringt über 180 nichts.',
            en: 'Get the shards from the Nightmare and Shugo shops before you spend AP. If you have a **Special Growth Voucher: Stigma Shard**, use it first: it raises your total shards to 180 and does nothing above 180.',
          },
        },
        {
          type: 'compare',
          title: { de: 'Breit oder tief?', en: 'Wide or deep?' },
          caption: { de: 'Die Quellen empfehlen beides. Einig sind sie sich nur darin: nur ausgerüstete Stigmen steigern, nicht alle 13 anfangen, und die Stufen 16–20 sind teuer.', en: 'The sources recommend both. They only agree that you level equipped stigmas only, don’t start all 13, and that levels 16–20 are expensive.' },
          items: [
            {
              title: { de: 'Erst breit', en: 'Wide first' },
              tag: { de: 'Stufen-Grenzen', en: 'breakpoints' },
              tone: 'blue',
              points: [
                { kind: 'pro', text: { de: 'Alle vier auf 5, dann 10, dann 15 – jede Grenze öffnet eine Spezialisierung', en: 'All four to 5, then 10, then 15 – every breakpoint opens a specialisation' } },
                { kind: 'pro', text: { de: 'Billige Stufen zuerst: mehr Wirkung pro Splitter', en: 'Cheap levels first: more effect per shard' } },
                { kind: 'con', text: { de: 'Das wichtigste Stigma kommt spät auf 20', en: 'Your most important stigma reaches 20 late' } },
              ],
              verdict: { de: 'So macht es der Guide „Power-Sprint“', en: 'This is what the “Power sprint” guide does' },
            },
            {
              title: { de: 'Erst tief', en: 'Deep first' },
              tag: { de: 'Kern-Stigma', en: 'core stigma' },
              tone: 'violet',
              points: [
                { kind: 'pro', text: { de: 'Ein oder zwei Stigmen, die den Build tragen, früh auf 20', en: 'One or two stigmas that carry the build reach 20 early' } },
                { kind: 'con', text: { de: 'Die anderen bleiben lange bei 1–10', en: 'The others stay at 1–10 for a long time' } },
                { kind: 'con', text: { de: 'Die teuren Stufen 16–20 kommen früh', en: 'The expensive levels 16–20 come early' } },
              ],
              verdict: { de: 'Sinnvoll, wenn dein Build an einem Stigma hängt', en: 'Makes sense if your build hinges on one stigma' },
            },
          ],
        },
        {
          type: 'text',
          text: {
            de: '**Zurücksetzen:** gibt die Splitter zurück. Was es auf Global an Kina kostet, steht nirgends. Welche Stigmen deine Klasse nimmt und auf welche Stufe, steht im Klassen-Guide.',
            en: '**Resetting:** refunds the shards. What it costs in Kina on Global isn’t published. Which stigmas your class takes and to which level is in its class guide.',
          },
        },
        { type: 'links', items: [{ href: '#/stigma', label: { de: 'Im Stigma-Planer ausprobieren', en: 'Try it in the Stigma planner' }, primary: true }, { href: '#/guides/power-sprint', label: { de: 'Power-Sprint: Stigmen in der Reihenfolge', en: 'Power sprint: stigmas in order' } }] },
      ],
    },
    {
      title: { de: 'Arkana: die Karten', en: 'Arcana: the cards' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Arkana sind Karten, die du ab Stufe 45 neben der Ausrüstung trägst. Jede gibt einen Wert eines Empyrean Lords, Skill-Stufen und zählt zu einem Set. Es gibt fünf Slots, jeden in einer Vigor- und einer Magic-Version.',
            en: 'Arcana are cards you wear next to your gear from level 45. Each gives an Empyrean Lord stat, skill levels and counts towards a set. There are five slots, each in a Vigor and a Magic version.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Was jeder Slot würfeln kann (MetaBot, AllThings.How, gameplay.tips). Die Skills einer Karte stehen fest, wenn du sie bekommst; Stigmen kommen auf keine Karte.', en: 'What each slot can roll (MetaBot, AllThings.How, gameplay.tips). A card’s skills are fixed when you get it; no card carries a stigma.' },
          head: ['Slot', { de: 'Wert Vigor / Magic', en: 'Stat Vigor / Magic' }, { de: 'Skills', en: 'Skills' }],
          rows: [
            ['**Chalice**', both('Combat Speed / Move Speed'), { de: 'jeder der 22 Skills', en: 'any of the 22 skills' }],
            ['**Parchment**', both('HP / MP'), { de: '6 der 12 aktiven', en: '6 of the 12 actives' }],
            ['**Compass**', both('Accuracy / Critical Hit'), { de: 'die anderen 6 aktiven', en: 'the other 6 actives' }],
            ['**Bell**', both('Defense / Attack'), { de: '5 der 10 passiven', en: '5 of the 10 passives' }],
            ['**Mirror**', both('Cooldown Reduction / MP cost and Double Chance'), { de: 'die anderen 5 passiven', en: 'the other 5 passives' }],
          ],
        },
        {
          type: 'table',
          caption: { de: 'Die vier Qualitäten', en: 'The four grades' },
          head: [{ de: 'Qualität', en: 'Grade' }, { de: 'Lord-Wert', en: 'Lord stat' }, { de: 'Gegenstandsstufe', en: 'Item level' }, { de: 'Skill-Zeilen', en: 'Skill lines' }, { de: 'Höchstens', en: 'Max' }, { de: 'Erfahrung bis dahin', en: 'Experience to max' }],
          rows: [
            ['Common', '8', '20', '1', '+2', '900'],
            ['Rare', '12', '40', '2', '+3', { de: '4.200', en: '4,200' }],
            ['Epic', '16', '60', '3', '+4', { de: '18.000', en: '18,000' }],
            ['Unique', '20', '80', '4', '+5', { de: '93.000', en: '93,000' }],
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Woher', en: 'Where from' }, value: { de: 'Die Transcendence-Dungeons (1–5 Spieler, ab Gegenstandsstufe 1.600): Deus Research Base gibt Chalice, Compass und Bell, Shattered Arkanis Chalice, Parchment und Mirror. Stufen ab 1.600, 1.900, 2.200 und 2.500; Unique ab der dritten, die Unique-Chalice erst in der vierten.', en: 'The Transcendence dungeons (1–5 players, from item level 1,600): Deus Research Base gives Chalice, Compass and Bell, Shattered Arkanis Chalice, Parchment and Mirror. Tiers from 1,600, 1,900, 2,200 and 2,500; Unique from the third, the Unique Chalice only in the fourth.' } },
            { label: { de: 'Beute', en: 'Loot' }, value: { de: 'Kommt aus dem Odyle Energy Cube am Ende, geöffnet mit einem Unobtained Cube Coupon: 10 pro Woche, geteilt mit Conquest, Reset am Mittwoch, ohne Übertrag. Auch der Daeva Pass hat Karten.', en: 'Comes from the Odyle Energy Cube at the end, opened with an Unobtained Cube Coupon: 10 a week, shared with Conquest, reset on Wednesday, no carry-over. The Daeva Pass has cards too.' } },
            { label: { de: 'Verstärken', en: 'Enhancing' }, value: { de: 'Füllt eine Erfahrungsleiste, scheitert nie. Jede Stufe gibt +1 Gegenstandsstufe und +1 auf eine zufällige vorhandene Skill-Zeile – neue Zeilen kommen nicht dazu.', en: 'Fills an experience bar and never fails. Each level gives +1 item level and +1 to a random existing skill line – no new lines are added.' } },
            { label: both('Training Arcana'), value: { de: 'Lesser 200, Intermediate 600, Superior 1.500, Ultimate 3.000, Exalted 5.000 Erfahrung. Eine Unique-Karte als Futter gibt 2.000 (auf +0) bis 47.000 (auf +4).', en: 'Lesser 200, Intermediate 600, Superior 1,500, Ultimate 3,000, Exalted 5,000 experience. A Unique card as fodder gives 2,000 (at +0) to 47,000 (at +4).' } },
            { label: { de: 'Umwandeln', en: 'Transmuting' }, value: { de: 'Set, Slot und Qualität wählen: 5 Mysterious Crystals und 2 Mio. Kina; jede gesperrte Neben-Zeile (höchstens zwei) +10 Kristalle und 3 Mio. Kina. Doppelte Karten zerlegst du in Mysterious Crystals. Das Umwandeln ändert sich mit jeder Saison.', en: 'Choose set, slot and grade: 5 Mysterious Crystals and 2M Kina; each locked sub-line (two at most) +10 crystals and 3M Kina. You break duplicate cards down into Mysterious Crystals. Transmuting changes every season.' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'So gehst du vor', en: 'How to go about it' },
          text: {
            de: 'Füll zuerst alle fünf Slots – eine leere Karte gibt nichts. Die **Chalice** ist der flexibelste Slot und der erste zum Umwandeln. Bewerte eine Karte nach ihren Skill-Zeilen, nicht nach der Farbe, und heb Oath Coins für Training Arcana auf, bis du eine Karte hast, die sich lohnt. Beim Ersetzen zeigt dir die Vorschau, wie viel Erfahrung mitgeht.',
            en: 'Fill all five slots first – an empty slot gives nothing. The **Chalice** is the most flexible slot and the first to transmute. Judge a card by its skill lines, not its colour, and keep Oath Coins for Training Arcana until you have a card worth it. When you replace a card, the preview shows how much experience carries over.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/combat-power', label: { de: 'Arkana-Sets und was die Top 80 tragen', en: 'Arcana sets and what the top 80 wear' } }] },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Kristalle liegen lassen** – jeder ausgegebene Kristall ist +1 Gegenstandsstufe und meist ein Stück Skill.', en: '**Leaving crystals unspent** – every crystal spent is +1 item level and usually part of a skill.' },
            { de: '**Azphel- und normale Kristalle verwechseln** – Azphel-Kristalle gehen nur ins PvP-Brett.', en: '**Mixing up Azphel and regular crystals** – Azphel crystals only go into the PvP board.' },
            { de: '**Splitter auf viele Stigmen verteilen** – nur die vier ausgerüsteten zählen.', en: '**Spreading shards over many stigmas** – only the four equipped ones count.' },
            { de: '**Stigmen ohne die Aufstiegs-Quest erwarten** – ohne „The One Who Hears the Voice“ öffnet sich nichts.', en: '**Expecting stigmas without the Ascension quest** – nothing opens without “The One Who Hears the Voice”.' },
            { de: '**Den Growth Voucher verschwenden** – über 180 Splitter bringt er nichts.', en: '**Wasting the Growth Voucher** – above 180 shards it does nothing.' },
            { de: '**Epic und Unique verwechseln** – die Karten tragen dieselben Namen; schau auf die Farbe.', en: '**Confusing Epic and Unique** – the cards share names; check the colour.' },
            { de: '**Eine Karte ersetzen, ohne die Vorschau zu prüfen** – nicht alle Erfahrung geht mit.', en: '**Replacing a card without checking the preview** – not all experience carries over.' },
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
            [{ de: 'Daevanion-Bretter', en: 'Daevanion boards' }, '5', { de: 'mehr (Ariel, Marchutan, Yustiel kamen dazu)', en: 'more (Ariel, Marchutan, Yustiel were added)' }],
            [{ de: 'Stigma-Slots / Höchststufe', en: 'Stigma slots / max level' }, '4 / 20', '6 / 25'],
            [{ de: 'Stigmen zurücksetzen', en: 'Stigma reset' }, { de: 'Preis unbekannt', en: 'price unknown' }, { de: 'seit Juli 2026 kostenlos', en: 'free since July 2026' }],
            [{ de: 'Arkana-Slots', en: 'Arcana slots' }, '5', { de: 'mehr (Scale, Key, Hourglass, Dice, Lantern)', en: 'more (Scale, Key, Hourglass, Dice, Lantern)' }],
            [{ de: 'Transcendence-Dungeons', en: 'Transcendence dungeons' }, '2', { de: 'mehr, mit höheren Stufen', en: 'more, with higher tiers' }],
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
            de: 'Offen sind: was Zurücksetzen und Umbauen auf Global wirklich kostet; ob sich die Grenzen im Nightmare- und Shugo-Shop wöchentlich, monatlich oder gar nicht erneuern (eine Quelle widerspricht sich selbst – 35 pro Woche wäre etwas ganz anderes als 35 einmal); ob AP auch normale Daevanion-Kristalle kaufen oder nur Azphel; ob es irgendwann laufend Kristalle gibt; ob die Stigma-Splitter im Abyss-Shop pro Stück oder pro 50 kosten; was Superior-Splitter auf Global bringen; welche Arkana-Qualität in welcher Stufe fällt; und wie viel Erfahrung beim Ersetzen einer Karte mitgeht. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open are: what resetting and rebuilding really cost on Global; whether the limits in the Nightmare and Shugo shops renew weekly, monthly or never (one source contradicts itself – 35 a week would be very different from 35 once); whether AP also buy regular Daevanion Crystals or only Azphel; whether there will ever be a steady crystal income; whether the Stigma Shards in the Abyss shop cost per piece or per 50; what Superior shards do on Global; which Arcana grade drops at which tier; and how much experience carries over when you replace a card. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/daevanion-guide', label: 'metabot.gg – Daevanion guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'metabot.gg – Stigma guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/arcana-guide', label: 'metabot.gg – Arcana guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/abyss-pvp-guide', label: 'metabot.gg – Abyss & PvP guide (Azphel and shard prices)' },
            { href: 'https://daevaguides.com/en/guides/daevanion-guide/', label: 'daevaguides – Daevanion guide' },
            { href: 'https://daevaguides.com/en/guides/stigmas-guide/', label: 'daevaguides – Stigmas guide' },
            { href: 'https://daevaguides.com/en/guides/global-vs-korea/', label: 'daevaguides – Global vs Korea' },
            { href: 'https://aion2builds.org/guides/daevanion/', label: 'aion2builds – Daevanion' },
            { href: 'https://aion2builds.org/guides/stigma/', label: 'aion2builds – Stigmas' },
            { href: 'https://aion2builds.org/guides/arcana/', label: 'aion2builds – Arcana' },
            { href: 'https://aion2builds.org/guides/respec/', label: 'aion2builds – Respec' },
            { href: 'https://allthings.how/?p=251849', label: 'AllThings.How – Daevanion Crystals: every source' },
            { href: 'https://allthings.how/?p=244997', label: 'AllThings.How – Stigma guide' },
            { href: 'https://allthings.how/?p=265101', label: 'AllThings.How – Arcana guide' },
            { href: 'https://allthings.how/?p=283585', label: 'AllThings.How – Training Arcana' },
            { href: 'https://gameplay.tips/guides/aion-2-global-progression-guide.html', label: 'gameplay.tips – Global progression guide' },
            { href: 'https://timesaver.gg/blog/aion-2-stigma-guide', label: 'timesaver – Stigma guide' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-07', label: 'AION2Hub – Global patch notes 7 Oct 2026 (Substance Morph limit)' },
          ],
        },
      ],
    },
  ],
};
