import type { Guide, L10n } from '../types';

/**
 * First steps on the global server: account, region and server, faction and class, what opens when, the resets, the
 * currencies, Membership and the pass, the Market, Legions, settings and the usual beginner mistakes (October 2026).
 * Numbers and facts from the sources at the end, paraphrased: the Steam page, NC's notices as aion2hub mirrors them,
 * and the community guides of daevaguides, MetaBot, aion2builds, games.gg, mein-mmo and others. Levelling, Combat Power,
 * alts and the class builds have guides of their own – this one links them instead of repeating them.
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });

export const beginner: Guide = {
  id: 'beginner',
  icon: 'compass',
  tone: 'blue',
  category: 'basics',
  title: {
    de: 'Einstieg in AION 2: was du am Anfang wissen musst',
    en: 'Getting started in AION 2: what you need to know first',
  },
  summary: {
    de: 'Konto, Region, Server und Fraktion, die acht Klassen, was sich wann öffnet, die Resets, alle Währungen, Membership und Daeva Pass, der Markt, Legionen, gute Einstellungen und die Fehler, die fast jeder am Anfang macht.',
    en: 'Account, region, server and faction, the eight classes, what opens when, the resets, every currency, Membership and the Daeva Pass, the Market, Legions, good settings and the mistakes almost everyone makes at the start.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Anfänger', en: 'Beginners' },
    { de: 'Server & Fraktion', en: 'Server & faction' },
    { de: 'Währungen', en: 'Currencies' },
    { de: 'Resets', en: 'Resets' },
  ],
  basis: {
    de: 'Recherche: Steam-Seite, NCs Ankündigungen und Community-Guides zum globalen Server (Oktober 2026)',
    en: 'Research: the Steam page, NC’s notices and community guides for the global server (October 2026)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '45', label: { de: 'Höchststufe auf Global', en: 'Level cap on Global' }, note: { de: 'Korea: 50', en: 'Korea: 50' }, tone: 'gold' },
            { value: '8', label: { de: 'Klassen', en: 'classes' }, note: { de: 'kein Klassenwechsel', en: 'no class change' }, tone: 'blue' },
            { value: '07:00 UTC', label: { de: 'Täglicher Reset', en: 'Daily reset' }, note: { de: 'wöchentlich am Mittwoch', en: 'weekly on Wednesday' }, tone: 'teal' },
            { value: '4', label: { de: 'Charaktere pro Server frei', en: 'free characters per server' }, note: { de: 'mehr für Quna', en: 'more for Quna' }, tone: 'violet' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Was es ist', en: 'What it is' }, value: { de: 'Ein MMORPG von NCSOFT, kostenlos spielbar, nur für Windows-PC. Steam und der PURPLE-Launcher teilen sich dieselben Server.', en: 'An MMORPG by NCSOFT, free to play, Windows PC only. Steam and the PURPLE launcher share the same servers.' } },
            { label: { de: 'Start', en: 'Launch' }, value: { de: 'Early Access am 30. September 2026, kostenloser Start am 5. Oktober 2026. In Korea läuft das Spiel seit dem 19. November 2025 – davon wird nichts übernommen.', en: 'Early Access on 30 September 2026, free launch on 5 October 2026. Korea has been running since 19 November 2025 – nothing carries over from there.' } },
            { label: { de: 'Herausgeber', en: 'Publisher' }, value: { de: 'NC betreibt das Spiel überall selbst, ohne Partner-Verlag', en: 'NC runs the game everywhere itself, without a partner publisher' } },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Vor dem ersten Start: Konten verbinden', en: 'Before the first start: link your accounts' },
          text: {
            de: 'Wer über Steam spielt und schon ein NC-Konto hat, verbindet Steam vor dem ersten Start mit diesem Konto. Käufe wie das Founder’s Pack hängen am NC-Konto – mit einem zweiten, neuen Konto sind sie nicht da.',
            en: 'If you play through Steam and already have an NC account, link Steam to that account before the first start. Purchases such as the Founder’s Pack belong to the NC account – a second, new account won’t have them.',
          },
        },
      ],
    },
    {
      title: { de: 'Läuft es auf deinem PC?', en: 'Will it run on your PC?' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Laut Steam-Seite. Eine SSD wird empfohlen.', en: 'According to the Steam page. An SSD is recommended.' },
          head: ['', { de: 'Mindestens', en: 'Minimum' }, { de: 'Empfohlen', en: 'Recommended' }],
          rows: [
            ['CPU', 'Ryzen 5 2600 / Core i5-10500', 'Ryzen 7 3700X / Core i7-11700'],
            [{ de: 'Arbeitsspeicher', en: 'Memory' }, '8 GB', '16 GB'],
            [{ de: 'Grafik', en: 'Graphics' }, 'GeForce GTX 1050 Ti', 'GeForce RTX 2070'],
            [{ de: 'Speicherplatz', en: 'Storage' }, '100 GB', '100 GB'],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Kein Kina kaufen:** Kina oder Quna von Drittanbietern kann das Konto kosten. NC hat am 11. Oktober 4.996 Konten deswegen gesperrt.', en: '**Don’t buy Kina:** Kina or Quna from third-party sellers can cost you the account. NC banned 4,996 accounts for it on 11 October.' },
            { de: '**Löschen dauert:** Ein Charakter ist erst nach 24 Stunden wirklich gelöscht.', en: '**Deleting takes time:** a character is only really gone after 24 hours.' },
            { de: '**Keine Zusatz-Tools:** Programme von Dritten, die ins Spiel eingreifen, sind ein Risiko für das Konto.', en: '**No add-on tools:** third-party programs that hook into the game put the account at risk.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Region, Server und Fraktion', en: 'Region, server and faction' },
      blocks: [
        {
          type: 'flow',
          title: { de: 'Die Reihenfolge beim Einloggen', en: 'The order at login' },
          items: [
            { title: { de: 'Region', en: 'Region' }, text: { de: 'Europa, NA Ost, NA West, Lateinamerika oder Asien', en: 'Europe, NA East, NA West, Latin America or Asia' }, tone: 'blue' },
            { title: { de: 'Fraktion', en: 'Faction' }, text: { de: 'Elyos oder Asmodier', en: 'Elyos or Asmodians' }, tone: 'violet' },
            { title: both('Server'), text: { de: 'Jeder Server gehört einer Fraktion und hat einen gegnerischen Partner-Server', en: 'Every server belongs to one faction and is paired with an enemy server' }, tone: 'teal' },
          ],
        },
        {
          type: 'steps',
          items: [
            { title: { de: 'Zuerst: wo deine Freunde sind', en: 'First: where your friends are' }, text: { de: 'Region, Fraktion und Server lassen sich nicht frei wechseln. Spielst du mit anderen, nimm ihren Server.', en: 'Region, faction and server can’t be changed freely. If you play with others, take their server.' } },
            { title: { de: 'Dann: der Ping', en: 'Then: the ping' }, text: { de: 'Nimm die Region, die dir am nächsten ist.', en: 'Take the region closest to you.' } },
            { title: { de: 'Sonst: ein empfohlener Server', en: 'Otherwise: a recommended server' }, text: { de: 'Ohne Freunde nimm einen Server, den das Spiel empfiehlt – volle Server haben Warteschlangen.', en: 'Without friends, take a server the game recommends – full servers have queues.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Partner-Server:** Im offenen Gebiet und im Abyss triffst du die Gegner des Partner-Servers. NC teilt die Paare von Zeit zu Zeit neu ein.', en: '**Paired servers:** in the open world and the Abyss you meet the enemies of the paired server. NC re-pairs the servers from time to time.' },
            { de: '**Dungeons sind serverübergreifend:** Gruppen-Inhalte mischen Spieler mehrerer Server, auch beider Fraktionen.', en: '**Dungeons are cross-server:** group content mixes players from several servers, even from both factions.' },
            { de: '**Charakter-Slots:** 4 pro Server frei, weitere für je 1.000 Quna. Beide Fraktionen gehen nur auf verschiedenen Servern; einen Fraktionswechsel gibt es nicht.', en: '**Character slots:** 4 per server for free, more for 1,000 Quna each. Both factions are only possible on different servers; there is no faction change.' },
            { de: '**Umzug:** Die kostenlosen Server-Umzüge laufen bis zur Wartung am 28. Oktober. Wer umzieht, muss vorher seine Legion verlassen.', en: '**Moving:** the free server transfers run until the maintenance on 28 October. To move, you have to leave your Legion first.' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Beide Fraktionen sind gleich stark; die Ausrüstung ist gespiegelt. Sie unterscheiden sich in Aussehen und Startgebieten.', en: 'Both factions are equally strong; the gear is mirrored. They differ in looks and starting zones.' },
          head: [{ de: 'Fraktion', en: 'Faction' }, { de: 'Gebiete beim Leveln', en: 'Zones while levelling' }],
          rows: [
            ['**Elyos**', 'Poeta → Verteron → Eltnen'],
            [{ de: '**Asmodier**', en: '**Asmodians**' }, 'Ishalgen → Altgard → Morheim'],
          ],
        },
        { type: 'links', items: [{ href: '#/guides/multi-characters', label: { de: 'Twinks: was geteilt wird und was sich lohnt', en: 'Alts: what is shared and what pays' } }] },
      ],
    },
    {
      title: { de: 'Welche Klasse?', en: 'Which class?' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Wie die Einsteiger-Guides die Klassen einschätzen (daevaguides, MetaBot). Bei Jäger und Beschwörer sind sie sich nicht einig.', en: 'How the beginner guides rate the classes (daevaguides, MetaBot). They disagree on the Ranger and the Spiritmaster.' },
          head: [{ de: 'Klasse', en: 'Class' }, { de: 'Waffe', en: 'Weapon' }, { de: 'Rolle', en: 'Role' }, { de: 'Für den Einstieg', en: 'For a first character' }],
          rows: [
            [both('**Gladiator**'), { de: 'Großschwert', en: 'Greatsword' }, { de: 'Nahkampf, Neben-Tank', en: 'Melee, off-tank' }, { de: 'leicht', en: 'easy' }],
            [both('**Templar**'), { de: 'Langschwert und Schild', en: 'Longsword and shield' }, 'Tank', { de: 'leicht', en: 'easy' }],
            [both('**Assassin**'), { de: 'Dolche', en: 'Daggers' }, { de: 'Burst-Schaden', en: 'Burst damage' }, { de: 'schwer', en: 'hard' }],
            [both('**Ranger**'), { de: 'Bogen', en: 'Bow' }, { de: 'Fernkampf', en: 'Ranged' }, { de: 'mittel (umstritten)', en: 'medium (disputed)' }],
            [both('**Sorcerer**'), { de: 'Zauberbuch', en: 'Spellbook' }, { de: 'Flächenschaden', en: 'Area damage' }, { de: 'zerbrechlich – Abstand halten', en: 'fragile – keep your distance' }],
            [both('**Spiritmaster**'), { de: 'Orb', en: 'Orb' }, { de: 'Beschwörer', en: 'Summoner' }, { de: 'umstritten', en: 'disputed' }],
            [both('**Cleric**'), { de: 'Streitkolben', en: 'Mace' }, { de: 'Heiler', en: 'Healer' }, { de: 'leicht', en: 'easy' }],
            [both('**Chanter**'), { de: 'Stab', en: 'Staff' }, { de: 'Unterstützer', en: 'Support' }, { de: 'mittel', en: 'medium' }],
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Die Klasse lässt sich später nicht wechseln. Den Brawler gibt es bisher nur in Korea. Jede Klasse hat hier einen eigenen Guide mit Build, Makro und Rotation.',
            en: 'You can’t change class later. The Brawler is Korea-only so far. Every class has its own guide here with build, macro and rotation.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/gladiator', label: both('Gladiator') },
            { href: '#/guides/templar', label: both('Templar') },
            { href: '#/guides/assassin', label: both('Assassin') },
            { href: '#/guides/ranger', label: both('Ranger') },
            { href: '#/guides/sorcerer', label: both('Sorcerer') },
            { href: '#/guides/spiritmaster', label: both('Spiritmaster') },
            { href: '#/guides/cleric', label: both('Cleric') },
            { href: '#/guides/chanter', label: both('Chanter') },
          ],
        },
      ],
    },
    {
      title: { de: 'Was sich wann öffnet', en: 'What opens when' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Story trägt dich fast allein auf 45 – sie bringt rund 97–99 % der Erfahrung. Bei Stufe 22 und 32 musst du jeweils eine Aufstiegs-Quest abschließen, bevor es weitergeht.',
            en: 'The story carries you to 45 almost on its own – it gives about 97–99% of the experience. At level 22 and 32 you have to finish an Ascension quest before you can go on.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Laut MetaBot, daevaguides und aion2builds. Ab 45 zählt die Gegenstandsstufe – die Summe der Stufen deiner Ausrüstung.', en: 'According to MetaBot, daevaguides and aion2builds. From 45 the item level counts – the sum of your gear’s levels.' },
          head: [{ de: 'Ab', en: 'From' }, { de: 'Was sich öffnet', en: 'What opens' }],
          rows: [
            [{ de: 'Stufe 10', en: 'Level 10' }, { de: 'Herstellen', en: 'Crafting' }],
            [{ de: 'Stufe 12', en: 'Level 12' }, { de: 'Das erste Daevanion-Brett (weitere bei 20, 30, 40, 45)', en: 'The first Daevanion board (more at 20, 30, 40, 45)' }],
            [{ de: 'Stufe 16', en: 'Level 16' }, { de: 'Legionen (über eine Helden-Quest)', en: 'Legions (through a Hero quest)' }],
            [{ de: 'Stufe 22', en: 'Level 22' }, { de: 'Stigmen (weitere Slots bei 27, 32, 37); Odyle-Energie lädt sich auf', en: 'Stigmas (more slots at 27, 32, 37); Odyle Energy starts charging' }],
            [{ de: 'Stufe 30', en: 'Level 30' }, { de: 'Der tägliche Dungeon', en: 'The Daily Dungeon' }],
            [{ de: 'Stufe 45', en: 'Level 45' }, { de: 'Markt, Nightmare, Abyss, Arkana, Conquest; Transcendence ab Gegenstandsstufe 1.600', en: 'Market, Nightmare, Abyss, Arcana, Conquest; Transcendence from item level 1,600' }],
            [{ de: 'Gegenstandsstufe 1.000', en: 'Item level 1,000' }, { de: 'Die Quests nach 45 und der Abyss', en: 'The post-45 quests and the Abyss' }],
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/speedrun-45', label: { de: 'Speedrun auf 45', en: 'Speedrun to 45' }, primary: true },
            { href: '#/guides/daevanion-stigma-arcana', label: { de: 'Daevanion, Stigmen & Arkana', en: 'Daevanion, Stigmas & Arcana' } },
            { href: '#/guides/power-sprint', label: { de: 'Nach 45: Power-Sprint', en: 'After 45: Power sprint' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Täglich und wöchentlich', en: 'Daily and weekly' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Täglicher Reset', en: 'Daily reset' }, value: { de: '07:00 UTC (09:00 deutsche Sommerzeit, 08:00 Winterzeit). Die Server-Uhr zeigt dann 16:00 – sie läuft auf GMT+9.', en: '07:00 UTC. The server clock shows 16:00 at that moment – it runs on GMT+9.' } },
            { label: { de: 'Wöchentlicher Reset', en: 'Weekly reset' }, value: { de: 'Mittwoch, 07:00 UTC', en: 'Wednesday, 07:00 UTC' } },
            { label: { de: 'Wartung', en: 'Maintenance' }, value: { de: 'Bisher mittwochs ab 06:30 UTC', en: 'So far on Wednesdays from 06:30 UTC' } },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Die Reset-Zeit hat NC nicht veröffentlicht; die Community hat sie bestätigt. Ob sie nach der Zeitumstellung (Europa 25. Oktober, USA 1. November) bei 07:00 UTC bleibt, ist offen – im Zweifel gilt der Countdown im Spiel.',
            en: 'NC hasn’t published the reset time; the community has confirmed it. Whether it stays at 07:00 UTC after the clock change (Europe 25 October, US 1 November) is open – when in doubt, trust the in-game countdown.',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Was', en: 'What' }, { de: 'Wie oft', en: 'How often' }, { de: 'Gilt für', en: 'Counts for' }],
          rows: [
            [{ de: 'Duty-Missionen', en: 'Duty Missions' }, { de: '5 pro Tag', en: '5 a day' }, { de: 'den ganzen Server', en: 'the whole server' }],
            [{ de: 'Nightmare-Versuche', en: 'Nightmare attempts' }, { de: '+2 pro Tag, bis 14 sammelbar', en: '+2 a day, banks up to 14' }, { de: 'jeden Charakter', en: 'each character' }],
            [{ de: 'Odyle-Energie', en: 'Odyle Energy' }, { de: '+15 alle 3 Stunden, bis 560 (840 mit Membership)', en: '+15 every 3 hours, up to 560 (840 with Membership)' }, { de: 'jeden Charakter', en: 'each character' }],
            [{ de: 'Aufstiegs-Prüfung', en: 'Ascension Trial' }, { de: '3 pro Woche', en: '3 a week' }, { de: 'jeden Charakter', en: 'each character' }],
            [{ de: 'Belohnungen im Exploration-Modus', en: 'Exploration rewards' }, { de: '7 pro Dungeon und Woche', en: '7 per dungeon a week' }, { de: 'jeden Charakter', en: 'each character' }],
            [{ de: 'Abyss-Zeit und AP-Grenzen', en: 'Abyss time and AP limits' }, { de: 'pro Woche', en: 'per week' }, { de: 'jeden Charakter', en: 'each character' }],
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/dungeons', label: { de: 'Alle Dungeon-Zähler', en: 'Every dungeon counter' } },
            { href: '#/guides/farming-power', label: { de: 'Tages- und Wochen-Checkliste', en: 'Daily and weekly checklist' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Die Währungen', en: 'The currencies' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Laut MetaBot und daevaguides', en: 'According to MetaBot and daevaguides' },
          head: [{ de: 'Währung', en: 'Currency' }, { de: 'Woher', en: 'Where from' }, { de: 'Wofür', en: 'What for' }],
          rows: [
            [both('**Kina**'), { de: 'Quests, Dungeons, Verkäufe', en: 'quests, dungeons, sales' }, { de: 'fast alles. Gebundenes Kina wird zuerst ausgegeben; nur handelbares geht auf den Markt und ins Lager', en: 'almost everything. Bound Kina is spent first; only tradeable Kina goes to the Market and to storage' }],
            [both('**Quna**'), { de: 'Echtgeld, oder über die Börse (mit Membership)', en: 'real money, or on the Exchange (with Membership)' }, { de: 'Kostüme, Premium-Pass, Charakter-Slots, Schlüssel für versteckte Würfel (50 Quna, 3 pro Tag und Charakter)', en: 'costumes, Premium pass, character slots, keys for hidden cubes (50 Quna, 3 a day per character)' }],
            [{ de: '**Abyss-Punkte (AP)**', en: '**Abyss Points (AP)**' }, { de: 'Abyss und PvP', en: 'the Abyss and PvP' }, { de: 'den Abyss-Shop', en: 'the Abyss shop' }],
            [both('**Oath Coin**'), { de: 'Saison-Missionen', en: 'season missions' }, { de: 'den Saison-Shop', en: 'the Season Shop' }],
            [both('**Centuryroot Token**'), { de: 'Shugo-Festival (volle Belohnung ab 45)', en: 'the Shugo Festival (full rewards from 45)' }, { de: 'den Festival-Shop', en: 'the Festival shop' }],
            [both('**Phantasmal Fragment**'), 'Nightmare', { de: 'den Nightmare-Shop', en: 'the Nightmare shop' }],
            [both('**Mileage**'), { de: 'Quna-Käufe und Membership', en: 'Quna purchases and Membership' }, { de: 'den Mileage-Shop', en: 'the Mileage shop' }],
            [{ de: '**Daeva-Pass-Münzen**', en: '**Daeva Pass Shop Coin**' }, { de: 'Premium-Pass (45.000 pro Saison)', en: 'the Premium pass (45,000 a season)' }, { de: 'den Pass-Shop', en: 'the pass shop' }],
            [{ de: '**Weitere**', en: '**Others**' }, { de: 'PvP, Legion, Events', en: 'PvP, Legion, events' }, { de: 'Silver Medal, Soul Crystal, Legion Coin, Arena Token – und bis 3./4. November die Kürbis-Münzen des Halloween-Events', en: 'Silver Medal, Soul Crystal, Legion Coin, Arena Token – and until 3/4 November the Pumpkin Coins of the Halloween event' }],
          ],
        },
      ],
    },
    {
      title: { de: 'Membership, Daeva Pass und Shop', en: 'Membership, Daeva Pass and shop' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: both('Membership'), value: { de: '„Special Quai Membership“, etwa 12,75 € für 30 Tage, gilt nur auf einem Server. Sie öffnet das Kaufen auf dem Markt (ob auch das Verkaufen, ist umstritten), die Quna-Börse und die Wind-Breeze-Händler, gibt einen zweiten Griff in den Dungeon-Würfel, 840 statt 560 Odyle, Lager aus der Ferne, bis zu 21 Shugo-Schlüssel und 2.150 Mileage.', en: '“Special Quai Membership”, about €12.75 for 30 days, valid on one server only. It opens buying on the Market (whether selling too is disputed), the Quna Exchange and the Wind Breeze merchants, and gives a second pick from the dungeon cube, 840 instead of 560 Odyle, remote storage, up to 21 Shugo keys and 2,150 Mileage.' } },
            { label: both('Daeva Pass'), value: { de: 'Pro Charakter. Saison 1 läuft vom 30. September bis 16. Dezember. Premium kostet 1.500 Quna, jede zugekaufte Stufe 50 Quna; pro Woche gibt es höchstens 50.000 Pass-Erfahrung. Dazu läuft bis 28. Oktober der Event-Pass „Planet’s Call“ für 1.000 Quna.', en: 'Per character. Season 1 runs from 30 September to 16 December. Premium costs 1,500 Quna, each bought level 50 Quna; you get at most 50,000 pass experience a week. On top, the event pass “Planet’s Call” runs until 28 October for 1,000 Quna.' } },
            { label: { de: 'Quna-Pakete', en: 'Quna packs' }, value: { de: '400, 1.000, 2.000 und 4.000 Quna für 5,09 €, 12,75 €, 25,49 € und 50,99 €', en: '400, 1,000, 2,000 and 4,000 Quna for €5.09, €12.75, €25.49 and €50.99' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Membership lohnt sich vor allem für den Markt und die Odyle-Grenze – wer täglich spielt, lässt sonst Energie verfallen. Wie viel sie im Wochenplan bringt, rechnet der Farm-Guide durch.',
            en: 'Membership pays mainly for the Market and the Odyle cap – if you play daily, energy goes to waste without it. How much it adds to a week is worked out in the farming guide.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'Wo sich Membership lohnt', en: 'Where Membership pays' } }, { href: '#/cubes', label: { de: 'Versteckte Würfel und Schlüssel', en: 'Hidden cubes and keys' } }] },
      ],
    },
    {
      title: { de: 'Markt und Handel', en: 'Market and trading' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Kein direkter Handel:** Auf Global gibt es keinen Handel von Spieler zu Spieler. Alles läuft über den Markt.', en: '**No direct trade:** Global has no player-to-player trading. Everything goes through the Market.' },
            { de: '**Ab 45 und pro Server:** Der Markt öffnet sich mit Stufe 45 und gilt nur auf deinem Server. Ein serverübergreifender Markt ist angekündigt.', en: '**From 45 and per server:** the Market opens at level 45 and only covers your server. A cross-server market has been announced.' },
            { de: '**Kosten:** 10 % Steuer auf den Verkauf und etwa 2 % Gebühr fürs Einstellen. Höchstens 10 Angebote gleichzeitig.', en: '**Costs:** 10% tax on the sale and about 2% fee for listing. At most 10 listings at once.' },
            { de: '**Erlös abholen:** Das Geld landet im Reiter Settlement – dort musst du es abholen.', en: '**Collecting:** the money lands on the Settlement tab – you have to collect it there.' },
            { de: '**Gesammelte Materialien:** Seit dem 14. Oktober kann NC das Einstellen gesammelter Materialien einschränken (gegen Bots).', en: '**Gathered materials:** since 14 October NC can restrict listing gathered materials (against bots).' },
          ],
        },
      ],
    },
    {
      title: { de: 'Legionen', en: 'Legions' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Freischalten', en: 'Unlock' }, value: { de: 'Helden-Quest „Renewed Resolve“ (Elyos) oder „Buried Atrocities“ (Asmodier), empfohlen ab Stufe 16', en: 'Hero quest “Renewed Resolve” (Elyos) or “Buried Atrocities” (Asmodians), recommended from level 16' } },
            { label: { de: 'Größe', en: 'Size' }, value: { de: '128 Mitglieder, 4 Offiziere; Ränge High Commander, Elite Officer und Soldier', en: '128 members, 4 officers; ranks High Commander, Elite Officer and Soldier' } },
            { label: { de: 'Beitritt', en: 'Joining' }, value: { de: 'Gibt 3.000 Kina und den Titel „There’s No ‘I’ in Team“ (ausgerüstet HP +270, im Besitz PvE-Angriff +2)', en: 'Gives 3,000 Kina and the title “There’s No ‘I’ in Team” (equipped HP +270, owned PvE Attack +2)' } },
            { label: { de: 'Boni', en: 'Perks' }, value: { de: 'Klein: auf Legionsstufe 20 bekommt jedes Mitglied +3 % Erfahrung, HP +80, MP +70 und je +4–5 Angriff, Verteidigung, Genauigkeit und Ausweichen', en: 'Small: at Legion level 20 every member gets +3% experience, HP +80, MP +70 and +4–5 each of Attack, Defence, Accuracy and Evasion' } },
            { label: { de: 'Halle', en: 'Hall' }, value: { de: '1 Mio. Kina Miete pro 30 Tage; mit Werkbänken, Händlern und Lager', en: '1M Kina rent per 30 days; with crafting stations, merchants and storage' } },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Legions-Inhalte wie eigene Dungeons oder Belagerungen gibt es auf Global noch nicht – die Belagerungen im Abyss laufen pro Fraktion, und Gruppen findest du serverübergreifend auch ohne Legion. Eine aktive Legion lohnt sich trotzdem: für den Titel, für Fragen und für feste Gruppen.',
            en: 'Legion content such as Legion dungeons or sieges doesn’t exist on Global yet – the Abyss sieges run per faction, and you find groups across servers without a Legion. An active Legion is still worth it: for the title, for questions and for regular groups.',
          },
        },
      ],
    },
    {
      title: { de: 'Einstellungen, die helfen', en: 'Settings that help' },
      blocks: [
        {
          type: 'checklist',
          items: [
            { de: '**Makro-Taste belegen** – das Spiel hat ein eigenes Makro-System; wie es arbeitet, steht im Makro-Guide.', en: '**Bind the macro key** – the game has its own macro system; how it works is in the macro guide.' },
            { de: '**Hoch- und Runterfliegen neu belegen** – weg von Strg+R und Strg+F, die man im Kampf leicht trifft.', en: '**Rebind Fly Up and Fly Down** – away from Ctrl+R and Ctrl+F, which are easy to hit in combat.' },
            { de: '**Dunkler Teleport-Effekt** – schont die Augen bei jedem Teleport.', en: '**Dark teleport effect** – easier on the eyes at every teleport.' },
            { de: '**Kleinere Oberfläche** und **weniger Schadenszahlen** – mehr Blick aufs Geschehen.', en: '**Smaller UI scale** and **fewer damage numbers** – more view of the fight.' },
            { de: '**Effekte niedrig, Partikel nur für dich und die Gruppe**, **Haustiere anderer ausblenden** – mehr Übersicht und mehr Bilder pro Sekunde in vollen Gebieten.', en: '**Low effects, particles for you and your party only**, **hide other players’ pets** – a clearer view and more frames per second in busy zones.' },
            { de: '**Zielauswahl einstellen** – und als Assassin die Anzeige für den Rücken des Gegners einschalten.', en: '**Set up targeting** – and as an Assassin turn on the indicator for the enemy’s back.' },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/macros', label: { de: 'Makros einrichten', en: 'Set up macros' } }] },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Server oder Fraktion ohne Freunde gewählt** – wechseln lässt sich das kaum.', en: '**Server or faction picked without friends** – it’s hard to change later.' },
            { de: '**Konten nicht verbunden** – und dann fehlt das Founder’s Pack.', en: '**Accounts not linked** – and then the Founder’s Pack is missing.' },
            { de: '**Goldene Gegenstände zerlegt** – Unique-Teile sind später das sichere Futter, um Soul-Binding-Zeilen neu zu würfeln. Vor dem Schnell-Zerlegen Gold abwählen und die Filter der automatischen Extraktion prüfen.', en: '**Salvaging gold items** – Unique pieces are the sure-fire fodder for rerolling Soul Binding lines later. Untick gold before quick salvage and check the auto-extraction filters.' },
            { de: '**Levelausrüstung hochverzaubert** – sie ist bald ersetzt.', en: '**Over-enhancing levelling gear** – it gets replaced soon.' },
            { de: '**Substance Morph nimmt ein Teil nicht** – es darf in keinem Ausrüstungs-Preset mehr stecken; erst überall herausnehmen.', en: '**Substance Morph refuses an item** – it must not be in any gear preset; take it out of every preset first.' },
            { de: '**Odyle an der Grenze** – was über 560 käme, verfällt.', en: '**Odyle at the cap** – anything above 560 is lost.' },
            { de: '**Shugo-Schlüssel vor 45 benutzt** – die volle Belohnung gibt es erst ab 45.', en: '**Using Shugo keys before 45** – the full rewards only come from 45.' },
            { de: '**Spezialisierungen nicht vergeben** – sie wirken erst, wenn du sie auswählst.', en: '**Specialisations left unassigned** – they only work once you pick them.' },
            { de: '**Aufstiegs-Prüfung zu früh in der Woche** – es gibt nur 3 Versuche; geh spät vor dem Reset mit deiner höchsten Gegenstandsstufe rein.', en: '**Ascension Trial too early in the week** – there are only 3 attempts; go in late before the reset, at your highest item level.' },
            { de: '**AP für frühe PvP-Ausrüstung ausgegeben** – Stigma-Splitter zuerst.', en: '**AP spent on early PvP gear** – Stigma Shards first.' },
            { de: '**Eigene versiegelte Dungeons und Kibelisk-Wegpunkte ausgelassen** – sie geben Daevanion-Kristalle, Skill-Punkte und einen Titel.', en: '**Skipping your own sealed dungeons and Kibelisk waypoints** – they give Daevanion Crystals, skill points and a title.' },
            { de: '**Duty-Reiter vor 45 geöffnet** – ein früher Fehler im Spiel: dann erscheinen die Duty-Missionen erst am nächsten Tag. NC hat ihn am 4. Oktober bestätigt; ob er behoben ist, steht nicht fest.', en: '**Opening the Duty tab before 45** – an early bug: the Duty Missions then only show up the next day. NC confirmed it on 4 October; whether it’s fixed isn’t clear.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Korea oder Global?', en: 'Korea or Global?' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Korea ist ein Jahr voraus. Viele Videos und Guides stammen von dort – diese Unterschiede machen sie für Global oft falsch:',
            en: 'Korea is a year ahead. Many videos and guides come from there – these differences often make them wrong for Global:',
          },
        },
        {
          type: 'table',
          head: ['', 'Global', { de: 'Korea', en: 'Korea' }],
          rows: [
            [{ de: 'Höchststufe', en: 'Level cap' }, '45', '50'],
            [{ de: 'Klassen', en: 'Classes' }, '8', { de: '9 (mit Brawler)', en: '9 (with Brawler)' }],
            [{ de: 'Stigma-Slots / Höchststufe', en: 'Stigma slots / max level' }, '4 / 20', '6 / 25'],
            [{ de: 'Daevanion-Bretter', en: 'Daevanion boards' }, '5', { de: 'mehr', en: 'more' }],
            [{ de: 'Haustier-Höchststufe', en: 'Pet level cap' }, '3', '5'],
            [{ de: 'Heroische Ausrüstung', en: 'Heroic gear' }, { de: 'nicht in Saison 1', en: 'not in Season 1' }, { de: 'ja', en: 'yes' }],
            [{ de: 'Direkter Handel', en: 'Direct trade' }, { de: 'aus', en: 'off' }, { de: 'an', en: 'on' }],
            [both('Membership'), { de: '1 Stufe', en: '1 tier' }, { de: '2 Stufen', en: '2 tiers' }],
            [{ de: 'Reset', en: 'Reset' }, '07:00 UTC', '05:00 KST'],
            [{ de: 'Plattform', en: 'Platform' }, 'PC', { de: 'PC und Handy', en: 'PC and mobile' }],
            [{ de: 'Conquest-Grenzen', en: 'Conquest gates' }, { de: 'niedriger', en: 'lower' }, { de: 'höher', en: 'higher' }],
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
            de: 'Offen sind: ob der Reset nach der Zeitumstellung bei 07:00 UTC bleibt; ob Membership auch das Verkaufen auf dem Markt öffnet; die Dollar-Preise der Quna-Pakete; und wann der serverübergreifende Markt kommt. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open are: whether the reset stays at 07:00 UTC after the clock change; whether Membership also opens selling on the Market; the dollar prices of the Quna packs; and when the cross-server market arrives. If you see it in game, let us know and the guide gets updated.',
          },
        },
      ],
    },
    {
      title: { de: 'Wie es weitergeht', en: 'Where to go next' },
      blocks: [
        {
          type: 'links',
          items: [
            { href: '#/guides/speedrun-45', label: { de: 'Schnell auf 45', en: 'Fast to 45' }, primary: true },
            { href: '#/guides/macros', label: { de: 'Makros', en: 'Macros' } },
            { href: '#/guides/daevanion-stigma-arcana', label: { de: 'Daevanion, Stigmen & Arkana', en: 'Daevanion, Stigmas & Arcana' } },
            { href: '#/guides/dungeons', label: { de: 'Dungeons', en: 'Dungeons' } },
            { href: '#/guides/abyss-pvp', label: { de: 'Abyss & PvP', en: 'Abyss & PvP' } },
            { href: '#/guides/combat-power', label: { de: 'Kampfkraft', en: 'Combat Power' } },
            { href: '#/guides/farming-power', label: { de: 'Farmen & Wochenplan', en: 'Farming & week plan' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Quellen', en: 'Sources' },
      blocks: [
        {
          type: 'sources',
          items: [
            { href: 'https://store.steampowered.com/app/3393110/AION_2/', label: 'Steam – AION 2 (system requirements)' },
            { href: 'https://en.wikipedia.org/wiki/Aion_2', label: 'Wikipedia – Aion 2' },
            { href: 'https://aion2hub.com/news/aion-2-monetization-plan-revealed', label: 'AION2Hub – monetisation plan' },
            { href: 'https://aion2hub.com/news/aion-2-launch-scale-test-global-vs-korea-changes', label: 'AION2Hub – Global vs Korea changes' },
            { href: 'https://aion2hub.com/news/aion-2-illicit-currency-warning-kinah-quna', label: 'AION2Hub – illicit currency warning' },
            { href: 'https://aion2hub.com/news/aion-2-early-access-fixes-twitch-drops-account-linking', label: 'AION2Hub – account linking' },
            { href: 'https://aion2hub.com/news/aion-2-launch-rewards-gift-code-server-transfer', label: 'AION2Hub – server transfer' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-14', label: 'AION2Hub – Global patch notes 14 Oct 2026' },
            { href: 'https://daevaguides.com/en/guides/reset-times/', label: 'daevaguides – Reset times' },
            { href: 'https://daevaguides.com/en/guides/which-server/', label: 'daevaguides – Which server' },
            { href: 'https://daevaguides.com/en/guides/elyos-or-asmodian/', label: 'daevaguides – Elyos or Asmodian' },
            { href: 'https://daevaguides.com/en/guides/best-class-beginners/', label: 'daevaguides – Best class for beginners' },
            { href: 'https://daevaguides.com/en/guides/first-week/', label: 'daevaguides – Your first week' },
            { href: 'https://daevaguides.com/en/guides/things-the-game-doesnt-tell-you/', label: 'daevaguides – Things the game doesn’t tell you' },
            { href: 'https://daevaguides.com/en/guides/best-settings/', label: 'daevaguides – Best settings' },
            { href: 'https://daevaguides.com/en/guides/global-vs-korea/', label: 'daevaguides – Global vs Korea' },
            { href: 'https://metabot.gg/en/aion-2/guides/beginners-guide', label: 'metabot.gg – Beginner’s guide' },
            { href: 'https://metabot.gg/en/aion-2/content-unlocks', label: 'metabot.gg – Content unlocks' },
            { href: 'https://metabot.gg/en/aion-2/currencies', label: 'metabot.gg – Currencies' },
            { href: 'https://metabot.gg/en/aion-2/daeva-pass', label: 'metabot.gg – Daeva Pass' },
            { href: 'https://metabot.gg/en/aion-2/guides/daily-weekly-checklist', label: 'metabot.gg – Daily & weekly checklist' },
            { href: 'https://metabot.gg/en/aion-2/guides/legion-guide', label: 'metabot.gg – Legion guide' },
            { href: 'https://aion2builds.org/guides/beginner/', label: 'aion2builds – Beginner guide' },
            { href: 'https://aion2builds.org/guides/membership/', label: 'aion2builds – Membership' },
            { href: 'https://games.gg/aion-2/guides/aion-2-market-guide/', label: 'games.gg – Market guide' },
            { href: 'https://space4games.com/en/games-en/aion-2-marketplace-guide/', label: 'space4games – Marketplace guide' },
          ],
        },
      ],
    },
  ],
};
