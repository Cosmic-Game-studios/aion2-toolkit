import type { Guide, L10n } from '../types';

/**
 * The Abyss and PvP on the global server (Season 1, 30 Sep – 16 Dec 2026). Numbers and facts from the sources at the
 * end, paraphrased. Most hard numbers come from MetaBot's guides, which read the Global client data (layers, AP shop,
 * rank and arena tables, boss times); where community guides back them up the text says so, where they disagree it
 * goes to "Not confirmed yet". No official NC rulebook for AP or ranks exists. The weekly AP routine and the AP
 * estimates per source are in farming-power.ts and are only linked here.
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });

export const abyssPvp: Guide = {
  id: 'abyss-pvp',
  icon: 'pvp',
  tone: 'rose',
  category: 'endgame',
  title: {
    de: 'Abyss & PvP: AP, Rang, Belagerung und Arena',
    en: 'Abyss & PvP: AP, rank, siege and arena',
  },
  summary: {
    de: 'Wie der Abyss auf Global funktioniert: drei Ebenen, Abyss-Zeit, woher AP kommen und wofür sie sich lohnen, Ränge und ihr Buff, die Artefakt-Belagerung, Arena und Schlachtfeld, Kriegsmodus und die PvP-Werte.',
    en: 'How the Abyss works on Global: three layers, Abyss time, where AP come from and what is worth buying, ranks and their buff, the Artifact Siege, arena and battlefield, War Mode and the PvP stats.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Abyss', en: 'Abyss' },
    { de: 'PvP', en: 'PvP' },
    { de: 'Abyss-Punkte', en: 'Abyss Points' },
    { de: 'Arena', en: 'Arena' },
  ],
  basis: {
    de: 'Recherche in Community-Guides zum globalen Server und in den offiziellen Patch-Notes (Oktober 2026); die meisten Tabellen stammen aus den Client-Daten, wie MetaBot sie ausliest',
    en: 'Research in community guides for the global server and in the official patch notes (October 2026); most tables come from the client data as MetaBot reads it',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '3', label: { de: 'Ebenen im Abyss', en: 'layers in the Abyss' }, note: { de: 'Lower, Middle, Upper', en: 'Lower, Middle, Upper' }, tone: 'rose' },
            { value: { de: '7 Std.', en: '7 h' }, label: { de: 'Abyss-Zeit pro Ebene und Woche', en: 'Abyss time per layer and week' }, note: { de: 'mit Membership 14 in Lower und Middle', en: '14 in Lower and Middle with Membership' }, tone: 'blue' },
            { value: { de: 'Mo · Do · Sa', en: 'Mon · Thu · Sat' }, label: { de: 'Artefakt-Belagerung', en: 'Artifact Siege' }, note: { de: '21:00 Serverzeit', en: '21:00 server time' }, tone: 'gold' },
            { value: { de: '+7,5 %', en: '+7.5%' }, label: { de: 'mehr AP mit 3 Artefakten', en: 'more AP with 3 Artifacts' }, note: { de: 'für die ganze Fraktion', en: 'for the whole faction' }, tone: 'violet' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Freischalten', en: 'Unlock' }, value: { de: 'Ab Stufe 45; die Basen in Lower Reshanta brauchen Gegenstandsstufe 1.000', en: 'From level 45; the bases in Lower Reshanta need item level 1,000' } },
            { label: { de: 'Saison 1', en: 'Season 1' }, value: { de: '30. September bis 16. Dezember 2026', en: '30 September to 16 December 2026' } },
            { label: { de: 'Wochen-Reset', en: 'Weekly reset' }, value: { de: 'Mittwoch, 07:00 UTC (16:00 Serverzeit)', en: 'Wednesday, 07:00 UTC (16:00 server time)' } },
            { label: { de: 'PvP', en: 'PvP' }, value: { de: 'Im Abyss immer an; in deinen Heimatgebieten nur, wenn du den Kriegsmodus einschaltest', en: 'Always on in the Abyss; in your home maps only if you switch on War Mode' } },
            { label: { de: 'Gegner', en: 'Enemies' }, value: { de: 'Jeder Server hat eine Fraktion und ist mit einem Server der anderen gepaart – die triffst du im Abyss und in den Rissen', en: 'Each server holds one faction and is paired with a server of the other – those are the players you meet in the Abyss and in the Rifts' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: 'Hol zuerst die AP ohne Wochengrenze (Quests, Supply Requests, Riss-Quests), dann die gedeckelten aus Monstern und PvP. Gib AP zuerst für **Stigma-Splitter** aus, dann für **Azphel-Kristalle**. Nutz die Korridor-Einträge vor der nächsten Belagerung, und plan deine Abyss-Zeit: Sie läuft nur, solange du drin bist.',
            en: 'Take the AP without a weekly limit first (quests, Supply Requests, Rift quests), then the capped ones from monsters and PvP. Spend AP on **Stigma Shards** first, then on **Azphel crystals**. Use your Corridor entries before the next siege, and plan your Abyss time: it only runs while you are inside.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Woher die Zahlen kommen', en: 'Where the numbers come from' },
          text: {
            de: 'NC hat für Global kein Regelwerk zu AP und Rängen veröffentlicht. Die Tabellen hier stammen aus den Client-Daten (MetaBot) und sind, wo es geht, mit Community-Guides abgeglichen. Koreanische Videos zeigen oft anderes: Korea ist ein Jahr weiter und hat eigene Regeln.',
            en: 'NC has published no rulebook for AP and ranks on Global. The tables here come from the client data (MetaBot), checked against community guides where possible. Korean videos often show something else: Korea is a year ahead and has its own rules.',
          },
        },
      ],
    },
    {
      title: { de: 'Die drei Ebenen', en: 'The three layers' },
      blocks: [
        {
          type: 'table',
          head: [{ de: 'Ebene', en: 'Layer' }, { de: 'Feldstufen', en: 'Field levels' }, { de: 'Zonen', en: 'Zones' }, { de: 'Artefakte', en: 'Artifacts' }, { de: 'Fliegen', en: 'Flight' }, { de: 'Basis Elyos / Asmodier', en: 'Base Elyos / Asmodians' }],
          rows: [
            ['**Chaotic Lower**', '45–65', '23', '3', { de: '49 Flugkreise', en: '49 Flight Circles' }, both('Latesran Western Root / Eastern Root')],
            ['**Chaotic Middle**', '50–80', '12', '3', { de: 'nein – Kämpfe zu Fuß', en: 'no – fights on foot' }, both('Latesran Western Ridge / Eastern Ridge')],
            ['**Chaotic Upper**', '43–55', '8', '–', { de: '32 Flugkreise', en: '32 Flight Circles' }, both('Dukysas Fortress / Krotan Fortress')],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Hinkommen:** Für Elyos führt die Episoden-Quest **Draupnir** mit 45 in den Abyss; danach gehst du über die Portale deiner Fraktion.', en: '**Getting there:** for Elyos the episode quest **Draupnir** leads into the Abyss at 45; after that you use your faction’s portals.' },
            { de: '**Basen:** Die Basen in Lower und Middle haben je einen **Ereshkigal’s Monolith**. Die „Fortresses“ in Upper sind nur die Basen der Fraktionen – Festungs-Belagerungen gibt es auf Global nicht.', en: '**Bases:** the bases in Lower and Middle each have an **Ereshkigal’s Monolith**. The “Fortresses” in Upper are only the factions’ bases – there are no fortress sieges on Global.' },
            { de: '**Fliegen:** Fliegen kostet Flugkraft. Flugkreise und **Wind Brew** (500 AP, +2.000 Flugkraft) füllen sie auf. In Middle gibt es keine Flugkreise.', en: '**Flight:** flying costs Flight Power. Flight Circles and **Wind Brew** (500 AP, +2,000 Flight Power) refill it. Middle has no Flight Circles.' },
            { de: '**Eigene Server:** Die Abyss-Karten laufen auf eigenen, zusammengelegten Servern – dort triffst du den gepaarten Gegner-Server.', en: '**Own servers:** the Abyss maps run on their own matched servers – that is where you meet the paired enemy server.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Abyss-Zeit', en: 'Abyss time' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Pro Woche', en: 'Per week' }, value: { de: '7 Stunden pro Ebene, Reset am Mittwoch. Nicht genutzte Zeit verfällt.', en: '7 hours per layer, reset on Wednesday. Unused time is lost.' } },
            { label: { de: 'Membership', en: 'Membership' }, value: { de: '14 Stunden in Lower und Middle', en: '14 hours in Lower and Middle' } },
            { label: { de: 'Wann sie läuft', en: 'When it runs' }, value: { de: 'Nur solange du im Abyss bist', en: 'Only while you are in the Abyss' } },
            { label: { de: 'Mehr Zeit', en: 'More time' }, value: { de: 'Lower Abyss Rift Stone +1 Std., die kleine Version +30 Min.; für Middle gibt es einen eigenen Stein', en: 'Lower Abyss Rift Stone +1 h, the lesser one +30 min; Middle has a stone of its own' } },
            { label: { de: 'Steine seit 14.10.', en: 'Stones since 14 Oct' }, value: { de: 'Zwei wöchentliche Saison-Missionen geben Eintritts-Steine: 1 Stunde im Abyss verbringen und einmal Guardian Lord Nahma besiegen', en: 'Two weekly Season Missions give entry stones: spend 1 hour in the Abyss and defeat Guardian Lord Nahma once' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Zeit nicht verschenken', en: 'Don’t waste the time' },
          text: {
            de: 'Erledige Vorbereitung, Händler und Pausen außerhalb des Abyss. Geh mit einem Plan rein – Duty-Schriftrollen, Elite-Gegner, Bosse – und raus, wenn er fertig ist. Mit Twinks gilt die Zeit pro Charakter.',
            en: 'Do preparation, merchants and breaks outside the Abyss. Go in with a plan – Duty scrolls, elites, bosses – and leave when it is done. With alts the time is per character.',
          },
        },
      ],
    },
    {
      title: { de: 'Abyss-Punkte: verdienen', en: 'Abyss Points: earning' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'AP bleiben auf dem Charakter, der sie verdient. Für Monster und PvP gibt es eine **wöchentliche Grenze** (eine für PvE, eine für PvP) – ihre Werte stehen auf Global nirgends, das Spiel zeigt deinen Stand in der Anzeige. Danach gibt es nur noch einen kleinen Teil. AP aus Quests und Supply Requests zählen nicht mit, AP aus Monstern im Abyss-Korridor auch nicht.',
            en: 'AP stay on the character that earns them. Monsters and PvP have a **weekly limit** (one for PvE, one for PvP) – its values aren’t published anywhere for Global, the game shows your progress in the HUD. Above it you only get a small share. AP from quests and Supply Requests don’t count, and neither do AP from monsters in the Abyss Corridor.',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Quelle', en: 'Source' }, 'AP', { de: 'Hinweis', en: 'Note' }],
          rows: [
            [{ de: 'Duty Missions (Heimatkarte)', en: 'Duty Missions (home map)' }, { de: '1.000 je Mission', en: '1,000 each' }, { de: '5 pro Tag, dazu je 50.000 gebundene Kina', en: '5 a day, plus 50,000 bound Kina each' }],
            [{ de: 'Duty-Schriftrollen Lower / Middle', en: 'Duty scrolls Lower / Middle' }, { de: '1.000 / 2.000', en: '1,000 / 2,000' }, { de: 'pro Schriftrolle', en: 'per scroll' }],
            [{ de: 'Spacetime-Rift-Quests', en: 'Spacetime Rift quests' }, { de: '2.000 je Quest', en: '2,000 each' }, { de: 'zählen nicht zur Grenze', en: 'don’t count towards the limit' }],
            [{ de: 'Arena allein / zu fünft', en: 'Arena solo / five-a-side' }, { de: '300 / Sieg 500', en: '300 / win 500' }, { de: 'pro Match', en: 'per match' }],
            [{ de: 'Schlachtfeld (10 gegen 10)', en: 'Battlefield (10 vs 10)' }, { de: '1.000 / Sieg 3.000', en: '1,000 / win 3,000' }, { de: 'plus 1 bzw. 2 Silver Medals', en: 'plus 1 or 2 Silver Medals' }],
            [{ de: 'Abyss-Korridor', en: 'Abyss Corridor' }, { de: '≈ 10.000–30.000', en: '≈ 10,000–30,000' }, { de: 'pro 5-Minuten-Lauf, Schätzung aus einer Quelle', en: 'per 5-minute run, estimate from one source' }],
            [{ de: 'Artefakt-Belagerung', en: 'Artifact Siege' }, { de: 'nach Beitrag', en: 'by contribution' }, { de: 'an eine feste Zahl Spieler der Siegerseite; Menge unbekannt', en: 'to a set number of players on the winning side; amount unknown' }],
            [{ de: 'Saison-Erfolge', en: 'Season achievements' }, { de: 'z. B. 2.500', en: 'e.g. 2,500' }, { de: 'für 50 besiegte Gegner', en: 'for 50 enemy kills' }],
            [{ de: 'Kopfgeld auf Ränge', en: 'Bounties on ranks' }, { de: '5.000–20.000', en: '5,000–20,000' }, { de: 'Commander und höher 2×: 20.000 · General/Marshal 3×: 10.000 · Officer 10×: 5.000', en: 'Commander and up 2×: 20,000 · General/Marshal 3×: 10,000 · Officers 10×: 5,000' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Wie viel pro Woche?', en: 'How much a week?' },
          text: {
            de: 'Den Wochenplan für AP, Schätzungen pro Quelle und eine Reihenfolge findest du im Guide „Farming & Power“ unter „Pfeiler IV“.',
            en: 'The weekly AP plan, estimates per source and an order are in the “Farming & power” guide under “Pillar IV”.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'AP-Wochenplan in „Farming & Power“', en: 'AP week plan in “Farming & power”' } }] },
      ],
    },
    {
      title: { de: 'Abyss-Punkte: ausgeben', en: 'Abyss Points: spending' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der Trade Shop ist derselbe, ob du ihn über den Abyss-, Arena- oder Schlachtfeld-Reiter öffnest. Ausrüstung verkauft er nicht, außer den Flügeln.',
            en: 'The Trade Shop is the same whether you open it from the Abyss, Arena or Battlefield tab. It sells no gear, apart from the wings.',
          },
        },
        {
          type: 'table',
          head: [{ de: 'Ware', en: 'Item' }, { de: 'Preis (AP)', en: 'Price (AP)' }, { de: 'Grenze', en: 'Limit' }, { de: 'Wofür', en: 'What for' }],
          rows: [
            [both('Stigma Shard'), { de: '10.000 / 15.000 / 20.000 / 25.000', en: '10,000 / 15,000 / 20,000 / 25,000' }, { de: '4 Stufen à 50, pro Charakter', en: '4 steps of 50, per character' }, { de: 'Stigma-Stufen – die beste Ausgabe', en: 'stigma levels – the best buy' }],
            [both('Daevanion Crystal: Azphel'), { de: '10.000 steigend bis 80.000', en: '10,000 rising to 80,000' }, { de: '110 insgesamt', en: '110 in total' }, { de: 'das PvP-Brett Azphel', en: 'the Azphel PvP board' }],
            [both('Potential Stone: Abyss'), { de: '25.000 / 50.000 / 75.000 / 100.000', en: '25,000 / 50,000 / 75,000 / 100,000' }, { de: 'pro Woche, pro Account und Server', en: 'per week, per account and server' }, { de: 'Potential auf Abyss-Ausrüstung', en: 'Potential on Abyss gear' }],
            [{ de: 'Lesser Abyssal Manastone / Soulstone', en: 'Lesser Abyssal Manastone / Soulstone' }, { de: '1.000 / 2.000', en: '1,000 / 2,000' }, { de: 'je 50 pro Woche', en: '50 a week each' }, { de: 'Manasteine, Seelensteine', en: 'manastones, soulstones' }],
            [both('Rare Theostone Selection Chest'), { de: '35.000', en: '35,000' }, { de: 'keine', en: 'none' }, '–'],
            [both('Fierce Battle Amulet Enhance Scroll'), { de: '10.000 steigend bis 150.000', en: '10,000 rising to 150,000' }, { de: 'je 5 pro Preisstufe', en: '5 at each price' }, { de: 'Amulett verstärken', en: 'enhance the amulet' }],
            [both('Silver Medal of Merit'), { de: '10.000', en: '10,000' }, { de: '10 pro Woche', en: '10 a week' }, { de: 'Centurion-Optik', en: 'Centurion looks' }],
            [both('Warrior Wings'), { de: '200.000', en: '200,000' }, { de: 'einmal pro Account', en: 'once per account' }, { de: 'besessen: PvP Damage Tolerance +1 %', en: 'owned: PvP Damage Tolerance +1%' }],
            [both('Brawler Wings'), { de: '800.000', en: '800,000' }, { de: 'einmal pro Account', en: 'once per account' }, { de: 'besessen: PvP Damage Boost +1 %, PvP Defense +100', en: 'owned: PvP Damage Boost +1%, PvP Defense +100' }],
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Potential', en: 'Potential' }, value: { de: '4 Stufen auf Unique-Abyss-Ausrüstung, je 100.000 AP und 1–4 Steine, scheitert nie. Voll (+4) kostet 400.000 AP und 10 Steine und gibt auf der Waffe PvP Damage Boost +2 %.', en: '4 steps on Unique Abyss gear, 100,000 AP and 1–4 stones each, never fails. Full (+4) costs 400,000 AP and 10 stones and gives PvP Damage Boost +2% on the weapon.' } },
            { label: { de: 'Optik', en: 'Looks' }, value: { de: 'Decanus-Teile 45.300 AP, Centurion-Teile 147.100 AP und 40 Silver Medals (Ohrringe und Kette das Doppelte)', en: 'Decanus pieces 45,300 AP, Centurion pieces 147,100 AP and 40 Silver Medals (earrings and necklace double)' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Reihenfolge', en: 'The order' },
          text: {
            de: 'Mehrere Guides sind sich einig: **Stigma-Splitter zuerst**, dann Azphel-Kristalle. Hol vorher die je 35 Splitter aus dem Nightmare- und dem Shugo-Shop – die kosten keine AP. Wer vor allem PvP spielt, zieht das Potential auf der Waffe vor.',
            en: 'Several guides agree: **Stigma Shards first**, then Azphel crystals. Before that, get the 35 shards each from the Nightmare and Shugo shops – they cost no AP. If you mainly play PvP, do the Potential on the weapon first.',
          },
        },
      ],
    },
    {
      title: { de: 'Abyss-Ausrüstung', en: 'Abyss gear' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Die Abyss-Sets laut Client-Daten (MetaBot). Unique-Abyss-Ausrüstung hat das Potential und lässt sich bis +15 verstärken.', en: 'The Abyss sets according to the client data (MetaBot). Unique Abyss gear has Potential and enhances to +15.' },
          head: ['Set', { de: 'Qualität', en: 'Grade' }, { de: 'Gegenstandsstufe', en: 'Item level' }, { de: 'Woher', en: 'Where from' }],
          rows: [
            ['Earth', 'Common', '20', { de: 'Monster in Lower', en: 'Lower monsters' }],
            ['Vagabond', 'Rare', '30', { de: 'Monster in Lower', en: 'Lower monsters' }],
            ['Bloodthirsty', 'Epic', '33', { de: 'Monster in Lower', en: 'Lower monsters' }],
            ['Vowed', 'Epic', '38', { de: 'benannte Elite-Gegner', en: 'named elites' }],
            ['Courage', 'Unique', '41', { de: 'Monster in Lower (66 Sorten)', en: 'Lower monsters (66 kinds)' }],
            ['Fallen Ancient God', 'Unique', '46', { de: 'benannte Elite-Gegner in Lower und Middle', en: 'named elites in Lower and Middle' }],
            ['Abyssal', 'Unique', '86', { de: 'Raid Ludra – zum Start entfernt, Rückkehr ohne Datum', en: 'Ludra raid – removed at launch, return without a date' }],
          ],
        },
      ],
    },
    {
      title: { de: 'Abyss-Rang', en: 'Abyss rank' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der Rang zählt **innerhalb deiner Klasse** nach Rangpunkten und wird stündlich neu berechnet. Er gibt einen Buff auf **PvP Damage Boost, PvP Damage Tolerance und PvE-Schaden im Abyss**, aber keine Extra-AP. Rangpunkte kannst du beim Sterben verlieren; wie viel, steht für Global nirgends.',
            en: 'The rank counts **within your class** by Rank Points and is recalculated every hour. It gives a buff to **PvP Damage Boost, PvP Damage Tolerance and PvE damage in the Abyss**, but no extra AP. You can lose Rank Points when you die; how many isn’t published for Global.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Ränge in Saison 1 laut Client-Daten (MetaBot); Rang = Platz innerhalb der Klasse', en: 'Ranks in Season 1 according to the client data (MetaBot); place = place within the class' },
          head: [{ de: 'Rang', en: 'Rank' }, { de: 'Platz', en: 'Place' }, { de: 'Mindest-Rangpunkte', en: 'Min Rank Points' }, 'Buff'],
          rows: [
            ['**Supreme Commander**', '1', { de: '20 Mio.', en: '20M' }, { de: '5,0 %', en: '5.0%' }],
            ['**Commander**', '2', { de: '13 Mio.', en: '13M' }, { de: '4,6 %', en: '4.6%' }],
            ['**Marshal**', '3–4', { de: '9 Mio.', en: '9M' }, { de: '4,4 %', en: '4.4%' }],
            ['**General**', '5–6', { de: '6 Mio.', en: '6M' }, { de: '4,2 %', en: '4.2%' }],
            [{ de: '**Officer** 5★ bis 1★', en: '**Officer** 5★ to 1★' }, '7–150', { de: '4,2 bis 1,5 Mio.', en: '4.2M to 1.5M' }, { de: '4,0 bis 3,2 %', en: '4.0 to 3.2%' }],
            [{ de: 'Soldier 1. bis 3. Klasse', en: 'Soldier 1st to 3rd class' }, '151–300', { de: '1 Mio. bis 550.000', en: '1M to 550,000' }, { de: '3,0 bis 2,6 %', en: '3.0 to 2.6%' }],
            [{ de: 'Soldier 4. bis 6. Klasse', en: 'Soldier 4th to 6th class' }, '301–600', { de: '350.000 bis 75.000', en: '350,000 to 75,000' }, { de: '2,4 bis 2,0 %', en: '2.4 to 2.0%' }],
            [{ de: 'Soldier 7. bis 9. Klasse', en: 'Soldier 7th to 9th class' }, { de: '601–1.000', en: '601–1,000' }, { de: '35.000 bis 3.000', en: '35,000 to 3,000' }, { de: '1,8 bis 1,2 %', en: '1.8 to 1.2%' }],
            ['Trainee', { de: 'alle anderen', en: 'everyone else' }, '–', '–'],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Nur der beste Buff zählt:** Abyss-Rang, Arena-Grad allein und Arena-Grad zu fünft geben denselben Buff – es gilt nur der höchste. Ein starker Platz in einer Liste reicht.', en: '**Only the best buff counts:** Abyss rank, solo arena grade and five-a-side arena grade give the same buff – only the highest applies. One strong place on one ladder is enough.' },
            { de: '**Titel zum Saisonende:** 9. bis 7. Klasse Common, 6. bis 4. Rare, 3. bis 1. Epic, Officers Unique, die ersten vier Heroic.', en: '**Titles at season end:** 9th to 7th class Common, 6th to 4th Rare, 3rd to 1st Epic, Officers Unique, the top four Heroic.' },
            { de: '**Namen:** Elyos heißen Guardian Decanus / Centurion, Asmodier Archon Decanus / Centurion.', en: '**Names:** Elyos are Guardian Decanus / Centurion, Asmodians Archon Decanus / Centurion.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Artefakt-Belagerung, Korridor und Bosse', en: 'Artifact Siege, Corridor and bosses' },
      blocks: [
        {
          type: 'steps',
          items: [
            { title: { de: 'Wann und wo', en: 'When and where' }, text: { de: '**Montag, Donnerstag und Samstag um 21:00 Serverzeit** in Chaotic Lower Reshanta, ab Stufe 45. Middle hat auch Artefakte, aber noch keinen Zeitplan.', en: '**Monday, Thursday and Saturday at 21:00 server time** in Chaotic Lower Reshanta, from level 45. Middle has Artifacts too, but no schedule yet.' } },
            { title: { de: 'Erobern', en: 'Capture' }, text: { de: 'Auf den Artefakten erscheinen **Dimensional Cores** (Stufe 65 in Lower, 80 in Middle). Die Fraktion mit dem letzten Treffer nimmt das Artefakt.', en: '**Dimensional Cores** spawn on the Artifacts (level 65 in Lower, 80 in Middle). The faction that lands the last hit takes the Artifact.' } },
            { title: { de: 'Der Lohn', en: 'The reward' }, text: { de: 'Die ganze Fraktion bekommt mehr AP: **+2,5 / +5 / +7,5 %** für 1 / 2 / 3 gehaltene Artefakte. Dazu AP nach Beitrag für eine feste Zahl Spieler der Siegerseite.', en: 'The whole faction gets more AP: **+2.5 / +5 / +7.5%** for 1 / 2 / 3 Artifacts held. On top, AP by contribution for a set number of players on the winning side.' } },
            { title: { de: 'Der Korridor', en: 'The Corridor' }, text: { de: 'An jedem gehaltenen Artefakt öffnet sich für die haltende Fraktion der **Abyss-Korridor**: 5 Minuten, allein, Kina und AP. Die Einträge gelten nur bis zur nächsten Belagerung – oder bis sich die Server-Paarung ändert.', en: 'At every held Artifact the **Abyss Corridor** opens for the holding faction: 5 minutes, solo, Kina and AP. Entries only last until the next siege – or until the server pairing changes.' } },
            { title: { de: 'Wer alles verliert', en: 'Losing everything' }, text: { de: 'Verliert eine Fraktion alle Artefakte einer Ebene, bekommt sie einen eigenen 5-Minuten-Korridor an ihrer Basis.', en: 'A faction that loses every Artifact of a layer gets its own 5-minute Corridor at its base.' } },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Abyss-Bosse in Serverzeit (MetaBot und weitere Zeitpläne). Die Middle-Bosse stehen im Global-Client, laut zwei Quellen laufen sie bisher aber nur in Korea und Taiwan.', en: 'Abyss bosses in server time (MetaBot and other timetables). The Middle bosses are in the Global client, but according to two sources they only run in Korea and Taiwan so far.' },
          head: ['Boss', { de: 'Ebene', en: 'Layer' }, { de: 'Stufe', en: 'Level' }, { de: 'Wann', en: 'When' }],
          rows: [
            [both('Executors Tamasa, Kaira, Argo'), 'Lower', '65', { de: 'Mo, Do, Sa 21:30', en: 'Mon, Thu, Sat 21:30' }],
            [both('Ducal, Marakha, Dramos'), 'Middle', '80', { de: 'Mo, Do, Sa 21:30', en: 'Mon, Thu, Sat 21:30' }],
            [both('Guardian Lord Nahma'), 'Lower', '–', { de: 'So und Fr 21:00', en: 'Sun and Fri 21:00' }],
            [both('Enraged Nahma'), 'Middle', '–', { de: 'So und Fr 21:00', en: 'Sun and Fri 21:00' }],
            [both('Watcher Kaira'), 'Lower', '65', { de: 'alle 3 Stunden ab 01:00, bleibt 30 Minuten', en: 'every 3 hours from 01:00, stays 30 minutes' }],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Was heißt „Serverzeit“?', en: 'What does “server time” mean?' },
          text: {
            de: 'Darüber sind sich die Quellen nicht einig: Einige rechnen mit einer gemeinsamen Uhr (UTC+9) – dann wäre die Belagerung um **12:00 UTC**, passend zum Reset um 16:00 Serverzeit = 07:00 UTC. Andere rechnen mit der Ortszeit jeder Region – dann wäre sie um **21:00 bei dir**. Schau auf den Timer im Spiel, vor allem nach der Zeitumstellung Ende Oktober.',
            en: 'The sources disagree: some count one shared clock (UTC+9) – then the siege would be at **12:00 UTC**, which fits the reset at 16:00 server time = 07:00 UTC. Others count the local time of each region – then it would be at **21:00 your time**. Check the timer in game, especially after the clock change at the end of October.',
          },
        },
      ],
    },
    {
      title: { de: 'Arena und Schlachtfeld', en: 'Arena and battlefield' },
      blocks: [
        {
          type: 'table',
          head: [{ de: 'Modus', en: 'Mode' }, { de: 'Größe', en: 'Size' }, { de: 'Leben', en: 'Lives' }, { de: 'Wann', en: 'When' }, { de: 'Belohnungen pro Woche', en: 'Rewards a week' }],
          rows: [
            [both('**Arena of Solitude**'), { de: '1 gegen 1', en: '1 vs 1' }, { de: '3, Respawn 5 s', en: '3, respawn 5 s' }, { de: 'jederzeit', en: 'any time' }, { de: '10 für Teilnahme, 30 für Siege', en: '10 for taking part, 30 for wins' }],
            [both('**Arena of Cooperation**'), { de: '5 gegen 5', en: '5 vs 5' }, '1', { de: 'jederzeit', en: 'any time' }, { de: '10 für Teilnahme, 30 für Siege', en: '10 for taking part, 30 for wins' }],
            [{ de: '**Schlachtfeld** (Arena of Tactics)', en: '**Battlefield** (Arena of Tactics)' }, { de: '10 gegen 10', en: '10 vs 10' }, { de: 'Respawn 10 s', en: 'respawn 10 s' }, { de: 'täglich 11–14 und 19–21 Uhr Serverzeit', en: 'daily 11–14 and 19–21 server time' }, { de: '3 für Teilnahme, 3 für Siege', en: '3 for taking part, 3 for wins' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Für alle:** Matches dauern 10 Minuten, alles ab Stufe 45. Aufgeben zählt als Niederlage, und wer oft aufgibt, wird eine Weile gesperrt.', en: '**For all:** matches last 10 minutes, everything from level 45. Leaving counts as a loss, and leaving often locks you out for a while.' },
            { de: '**Schlachtfeld:** eine Eskort-Karte (Odyle Shard Cradle), die Werte werden angeglichen – das ist das PvP, in dem Ausrüstung kaum zählt, gut auch für schwache Twinks.', en: '**Battlefield:** an escort map (Odyle Shard Cradle), stats are equalised – this is the PvP where gear hardly counts, good for weak alts too.' },
            { de: '**Arena-Grade:** Nur die beiden Arenen haben eine Rangliste pro Klasse, von Iron bis Challenger. Der Buff geht von 1,2 % (Bronze, Platz 601–1.000) bis 5 % (Challenger 1, Platz 1) – und zählt nur, wenn er höher ist als dein Abyss-Rang.', en: '**Arena grades:** only the two arenas have a ladder per class, from Iron to Challenger. The buff goes from 1.2% (Bronze, places 601–1,000) to 5% (Challenger 1, place 1) – and only counts if it is higher than your Abyss rank.' },
          ],
        },
      ],
    },
    {
      title: { de: 'PvP in der offenen Welt', en: 'Open-world PvP' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Kriegsmodus', en: 'War Mode' }, value: { de: 'In deinen Heimatgebieten freiwillig; umschalten nur im eigenen Gebiet, danach 70 Minuten Sperre', en: 'Optional in your home maps; switch it only in your own territory, then a 70-minute cooldown' } },
            { label: { de: 'Erzwungenes PvP', en: 'Forced PvP' }, value: { de: 'Wer gegnerische Wachen, Bürger oder Kisks angreift, ist etwa 10 Minuten im PvP', en: 'Attacking enemy guards, citizens or Kisks puts you in PvP for about 10 minutes' } },
            { label: { de: 'Spacetime Rift', en: 'Spacetime Rift' }, value: { de: 'Alle 3 Stunden, Portal 10 Minuten offen, etwa 1 Stunde im Gebiet der Gegner, ab 45. Wer stirbt, landet zu Hause; Kisk-Reisen gehen dort nicht.', en: 'Every 3 hours, portal open 10 minutes, about 1 hour in enemy land, from 45. If you die you are sent home; Kisk travel doesn’t work inside.' } },
            { label: { de: 'Mit der eigenen Fraktion', en: 'With your own faction' }, value: { de: 'Duelle, Handel und Freunde nur innerhalb der Fraktion', en: 'Duels, trade and friends only within your faction' } },
            { label: { de: 'Server-Paarung', en: 'Server pairing' }, value: { de: 'NC mischt die Paarungen ab und zu neu, um die Fraktionen auszugleichen – ohne festen Termin', en: 'NC reshuffles the pairings now and then to balance the factions – without a fixed date' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Vor dem Riss', en: 'Before the Rift' },
          text: {
            de: 'Stell den Kriegsmodus ein, bevor du in einen Riss gehst, und nimm einen Resurrection Spiritstone mit. Die Riss-Quests geben 2.000 AP ohne Wochengrenze – sie lohnen sich auch für PvE-Spieler.',
            en: 'Set War Mode before you enter a Rift and take a Resurrection Spiritstone along. The Rift quests give 2,000 AP without a weekly limit – worth it for PvE players too.',
          },
        },
      ],
    },
    {
      title: { de: 'PvP-Werte', en: 'PvP stats' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Was das PvP-Brett Azphel höchstens gibt (MetaBot); in Klammern die Zahl der Knoten', en: 'What the Azphel PvP board gives at most (MetaBot); the number of nodes in brackets' },
          head: [{ de: 'Wert', en: 'Stat' }, { de: 'Höchstens', en: 'At most' }],
          rows: [
            [both('PvP Damage Boost / PvP Damage Tolerance'), { de: 'je +6 % (4)', en: '+6% each (4)' }],
            [both('PvP Attack'), '+72 (24)'],
            [both('PvP Defense'), '+720 (24)'],
            [both('PvP Accuracy'), '+120 (24)'],
            [both('PvP Evasion'), { de: '+72 (24), Ausweichen höchstens 30 %', en: '+72 (24), evasion capped at 30%' }],
            [both('PvP Critical Hit / Critical Hit Resist'), { de: 'je +120 (24)', en: '+120 each (24)' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Prozent-Werte** kommen außerdem aus dem Rang- oder Arena-Buff, den besessenen PvP-Flügeln, dem Potential und Gruppen-Skills: Light of Protection und Undefeated Mantra geben auf Stufe 1 je 5,25 % PvP Damage Boost und Tolerance, stapeln aber nicht miteinander.', en: '**Percentage stats** also come from the rank or arena buff, the owned PvP wings, Potential and party skills: Light of Protection and Undefeated Mantra give 5.25% PvP Damage Boost and Tolerance each at level 1, but don’t stack with each other.' },
            { de: '**Kontroll-Skills** wirken gegen Spieler oft nur mit 50 % Chance (gegen Monster 100 %).', en: '**Control skills** often only have a 50% chance against players (100% against monsters).' },
            { de: '**Defiance** (ab Stufe 16) löst Betäubung, Niederwerfen, In-die-Luft-Werfen, Greifen, Frost und Furcht, macht 5 Sekunden immun und hat 60 Sekunden Abklingzeit.', en: '**Defiance** (from level 16) clears stun, knockdown, airborne, grab, frost and fear, gives 5 seconds of immunity and has a 60-second cooldown.' },
            { de: '**Abyssal Power Shards** geben aktiviert +10 % Schaden und ignorieren einen Teil der Verteidigung von Spielern.', en: '**Abyssal Power Shards** give +10% damage when activated and ignore part of players’ Defense.' },
          ],
        },
        { type: 'links', items: [{ href: '#/daevanion', label: { de: 'Azphel im Daevanion-Planer', en: 'Azphel in the Daevanion planner' } }] },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Erst die gedeckelten AP farmen** – Quests, Supply Requests und Riss-Quests zählen nicht zur Wochengrenze, die kommen zuerst.', en: '**Farming the capped AP first** – quests, Supply Requests and Rift quests don’t count towards the weekly limit, so they come first.' },
            { de: '**Korridor-Einträge liegen lassen** – sie verfallen mit der nächsten Belagerung.', en: '**Leaving Corridor entries unused** – they expire with the next siege.' },
            { de: '**Im Abyss trödeln** – die Abyss-Zeit läuft nur drinnen, aber dann ohne Pause.', en: '**Idling in the Abyss** – Abyss time only runs inside, but then without a break.' },
            { de: '**Zwei Ranglisten jagen** – nur der höchste Buff aus Rang und Arena gilt.', en: '**Chasing two ladders** – only the highest buff from rank and arena applies.' },
            { de: '**Koreanische Zeiten übernehmen** – Korea hat andere Belagerungstage und Bosszeiten.', en: '**Copying Korean times** – Korea has other siege days and boss times.' },
            { de: '**Matches verlassen** – zählt als Niederlage und führt zu Sperren.', en: '**Leaving matches** – counts as a loss and leads to lockouts.' },
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
            de: 'Korea ist etwa ein Jahr weiter. Vieles, was du in koreanischen Videos siehst, gibt es auf Global (noch) nicht:',
            en: 'Korea is about a year ahead. Much of what you see in Korean videos isn’t on Global (yet):',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Keine Festungs-Belagerungen, kein GvG, kein Dredgion, kein Kamar** – auf Global ersetzen die Artefakte die Festungen, und Legionen spielen bei Belagerung und Abyss keine Rolle.', en: '**No fortress sieges, no GvG, no Dredgion, no Kamar** – on Global the Artifacts replace the fortresses, and Legions play no part in sieges or the Abyss.' },
            { de: '**Nur in Korea:** die Spacetime-Rift-Domination um Verteron und Altgard, die 300-gegen-300-Rift-Zone, die Oberfläche von Reshanta, Gegner aus der eigenen Fraktion im Abyss und ein Buff für die schwächere Fraktion.', en: '**Korea only:** Spacetime Rift Domination over Verteron and Altgard, the 300-vs-300 Rift Zone, the Reshanta surface, same-faction enemies in the Abyss and a buff for the weaker faction.' },
            { de: '**Andere Regeln in Korea:** Belagerung Mittwoch und Samstag, gestaffelt nach Gruppen; der Rang gab dort AP-Bonus; PvP-Schaden und Heilung wurden mehrmals gesenkt. Ob Global das übernimmt, ist offen.', en: '**Other rules in Korea:** sieges on Wednesday and Saturday, staggered by group; the rank gave an AP bonus there; PvP damage and healing were cut several times. Whether Global follows is open.' },
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
            de: 'Offen sind: die Werte der wöchentlichen AP-Grenzen und was danach noch kommt; wie viele Rangpunkte ein Tod kostet; ob die Stigma-Splitter im Shop pro Stück oder pro 50 kosten (die Quellen widersprechen sich – 3,5 Mio. oder 70.000 AP für alle 200); ob die Riss-Kette 4 oder 7 Quests hat; die Namen der drei Artefakte in Lower; ob die Arena zu fünft 5 gegen 5 oder 4 gegen 4 ist und ob die Schlachtfeld-Zeiten stimmen; welche Gegenstandsstufe Middle braucht; wie viele AP die Belagerung gibt; und was die Änderung „höchstens 7 Stunden angesammelte Abyss-Zeit“ vom 14. Oktober genau bedeutet. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open are: the values of the weekly AP limits and what still comes after them; how many Rank Points a death costs; whether the Stigma Shards in the shop cost per piece or per 50 (the sources contradict each other – 3.5M or 70,000 AP for all 200); whether the Rift chain has 4 or 7 quests; the names of the three Artifacts in Lower; whether the five-a-side arena is 5 vs 5 or 4 vs 4 and whether the battlefield hours are right; which item level Middle needs; how much AP the siege gives; and what exactly the 14 October change “at most 7 hours of accumulated Abyss time” means. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/abyss-pvp-guide', label: 'metabot.gg – Abyss & PvP guide (layers, AP, shop, ranks)' },
            { href: 'https://metabot.gg/en/aion-2/events/artifact-siege', label: 'metabot.gg – Artifact Siege' },
            { href: 'https://metabot.gg/en/aion-2/guides/arena-pvp-guide', label: 'metabot.gg – Arena & PvP guide (modes, grades, PvP stats)' },
            { href: 'https://metabot.gg/en/aion-2/guides/daily-weekly-checklist', label: 'metabot.gg – Daily & weekly checklist' },
            { href: 'https://metabot.gg/en/aion-2/guides/elyos-vs-asmodian', label: 'metabot.gg – Elyos vs Asmodian' },
            { href: 'https://metabot.gg/en/aion-2/guides/endgame-guide', label: 'metabot.gg – Endgame guide (Potential, Ludra)' },
            { href: 'https://aion2builds.org/guides/abyss/', label: 'aion2builds – Abyss guide' },
            { href: 'https://daevaguides.com/en/guides/spacetime-rift/', label: 'daevaguides – Spacetime Rift and War Mode' },
            { href: 'https://daevaguides.com/en/guides/timers/', label: 'daevaguides – Timers (siege clock)' },
            { href: 'https://daevaguides.com/en/guides/elyos-or-asmodian/', label: 'daevaguides – Elyos or Asmodian (server pairing)' },
            { href: 'https://daevaguides.com/en/guides/global-vs-korea/', label: 'daevaguides – Global vs Korea' },
            { href: 'https://daevaguides.com/en/guides/daily-weekly-checklist/', label: 'daevaguides – Daily & weekly checklist (reset, Command scrolls)' },
            { href: 'https://timesaver.gg/blog/aion-2-abyss-points-guide', label: 'timesaver – Abyss Points guide' },
            { href: 'https://games.gg/aion-2/guides/aion-2-daily-weekly-checklist/', label: 'games.gg – Daily & weekly checklist' },
            { href: 'https://gameplay.tips/guides/aion-2-global-progression-guide.html', label: 'gameplay.tips – Global progression guide' },
            { href: 'https://expcarry.com/aion-2-timers', label: 'expcarry – Timers in UTC' },
            { href: 'https://allthings.how/aion-2-event-schedule-and-reset-timers-explained/', label: 'AllThings.How – Event schedule and reset timers' },
            { href: 'https://mein-mmo.de/aion2-endgame-tipps/4/', label: 'Mein-MMO – Endgame tips (DE)' },
            { href: 'https://aion2hub.com/news/aion-2-launch-servers-list-matchmaking', label: 'AION2Hub – Launch servers and matchmaking (NC notice of 4 Oct)' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-14', label: 'AION2Hub – Global patch notes 14 Oct 2026 (Abyss time, Rift Stones, Battlefield)' },
          ],
        },
      ],
    },
  ],
};
