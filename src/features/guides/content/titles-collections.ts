import type { Guide, L10n } from '../types';

/**
 * Titles, the Closet and the Pantheon on the global server: which titles to wear and how to get them, the skin
 * collection with its combine odds and the two stat skins, and the Pantheon pieces worth placing (October 2026).
 * Numbers and facts from the sources at the end, paraphrased; titles and skins mostly from MetaBot's guides (Global
 * client data and its sample of top characters), checked against AllThings.How, aion2.blog, aion2.tools, showgamer and
 * aion2data. How titles feed Combat Power and their totals are in combat-power.ts; wings in wings.ts, pets in pets.ts.
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });

export const titlesCollections: Guide = {
  id: 'titles-collections',
  icon: 'award',
  tone: 'gold',
  category: 'world',
  title: {
    de: 'Titel, Kleiderschrank & Pantheon: dauerhafte Boni',
    en: 'Titles, Closet & Pantheon: permanent bonuses',
  },
  summary: {
    de: 'Welche Titel die Spitze trägt und wie du an die besten kommst, schnelle Titel zum Abhaken, der Sammel-Bonus des Kleiderschranks mit Kombinier-Chancen und den zwei Skins mit Werten, und welche Stücke ins Pantheon gehören.',
    en: 'Which titles the top players wear and how to get the best ones, quick titles to tick off, the Closet’s collection bonus with combine odds and the two skins with stats, and which pieces belong in the Pantheon.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Titel', en: 'Titles' },
    { de: 'Kleiderschrank', en: 'Closet' },
    { de: 'Pantheon', en: 'Pantheon' },
    { de: 'Sammlung', en: 'Collection' },
  ],
  basis: {
    de: 'Recherche in Community-Guides zum globalen Server (Oktober 2026); Titel und Skins vor allem aus MetaBots Client-Daten und seiner Stichprobe von Top-Charakteren',
    en: 'Research in community guides for the global server (October 2026); titles and skins mostly from MetaBot’s client data and its sample of top characters',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '3', label: { de: 'Titel-Plätze', en: 'title slots' }, note: { de: 'Angriff, Verteidigung, Sonstiges', en: 'attack, defence, other' }, tone: 'gold' },
            { value: '448', label: { de: 'Titel mit Werten', en: 'titles with stats' }, note: { de: 'von 528; 377 pro Fraktion', en: 'of 528; 377 per faction' }, tone: 'violet' },
            { value: { de: '+50 %', en: '+50%' }, label: { de: 'höchster Bonus pro Skin-Reihe', en: 'top bonus per skin track' }, note: { de: '18 Reihen im Kleiderschrank', en: '18 tracks in the Closet' }, tone: 'teal' },
            { value: '17', label: { de: 'Plätze im Pantheon', en: 'Pantheon slots' }, note: { de: '1 Koloss, 4 Statuen, 12 Kunstwerke', en: '1 Colossus, 4 Statues, 12 Artworks' }, tone: 'blue' },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Alle drei Systeme geben Werte ohne Ausrüstung. Bei Titeln gilt der große Bonus nur angelegt, der kleine **Sammel-Bonus** immer; beim Kleiderschrank zählt jeder Skin, den du besitzt; im Pantheon nur, was du aufstellst. Wie viel Kampfkraft Titel bringen, steht im Kampfkraft-Guide.',
            en: 'All three systems give stats without gear. For titles the big bonus only counts while worn, the small **collection bonus** always; in the Closet every skin you own counts; in the Pantheon only what you place. How much Combat Power titles bring is in the Combat Power guide.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/combat-power', label: { de: 'Titel und Kampfkraft', en: 'Titles and Combat Power' } }] },
      ],
    },
    {
      title: { de: 'Was die Spitze trägt', en: 'What the top players wear' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Die meistgetragenen Titel in MetaBots Stichprobe von rund 12.600 Top-Charakteren. Namen mit Schrägstrich: Elyos / Asmodier.', en: 'The most worn titles in MetaBot’s sample of about 12,600 top characters. Names with a slash: Elyos / Asmodians.' },
          head: [{ de: 'Titel', en: 'Title' }, { de: 'Platz', en: 'Slot' }, { de: 'Getragen', en: 'Worn' }, { de: 'Angelegt', en: 'Equipped' }, { de: 'So bekommst du ihn', en: 'How to get it' }],
          rows: [
            [both('**Saint of Verteron / Altgard**'), { de: 'Verteidigung', en: 'Defence' }, { de: '59 %', en: '59%' }, { de: 'Verteidigung +300, Schadensresistenz +3 %, Block +100', en: 'Defence +300, Damage Tolerance +3%, Block +100' }, { de: 'Monolith Stufe 30', en: 'Monolith level 30' }],
            [both('**Guardian of Verteron / Altgard**'), { de: 'Angriff', en: 'Attack' }, { de: '45 %', en: '45%' }, { de: 'PvE-Schaden +3 %, Durchschlag +210', en: 'PvE Damage Boost +3%, Penetration +210' }, { de: 'Monolith Stufe 20', en: 'Monolith level 20' }],
            [both('**Through Hell and Back**'), { de: 'Sonstiges', en: 'Other' }, { de: '24 %', en: '24%' }, { de: 'Abklingzeit −3 %, HP +900, Ausdauer +225', en: 'Cooldown Reduction +3%, HP +900, Stamina +225' }, { de: 'Versiegelter Dungeon Ruins of the Ancient City of Roah', en: 'Sealed dungeon Ruins of the Ancient City of Roah' }],
            [both('**Encountering Kaisinel’s / Zikel’s Core**'), { de: 'Sonstiges', en: 'Other' }, { de: '24 %', en: '24%' }, { de: 'HP-Tränke +400, Laufgeschwindigkeit +3 %, HP +900', en: 'HP potion recovery +400, Move Speed +3%, HP +900' }, { de: 'Episode 6', en: 'Episode 6' }],
            [both('**Failed Entrepreneur / Lifeguard**'), { de: 'Angriff', en: 'Attack' }, { de: '14 %', en: '14%' }, { de: 'PvE-Angriff +25, Angriff +20', en: 'PvE Attack +25, Attack +20' }, '–'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Die zwei Monolith-Titel tragen über die Hälfte der Spitze. Die Spuren (Empyrean Traces) für den Monolithen findest du in Verteron bzw. Altgard – fliegend und gleitend erreichst du auch die versteckten.',
            en: 'The two Monolith titles are worn by more than half of the top players. You find the traces (Empyrean Traces) for the Monolith in Verteron or Altgard – flying and gliding also gets you to the hidden ones.',
          },
        },
      ],
    },
    {
      title: { de: 'Titel für später', en: 'Titles for later' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Starke Titel mit längerem Weg (MetaBot, AllThings.How)', en: 'Strong titles with a longer road (MetaBot, AllThings.How)' },
          head: [{ de: 'Titel', en: 'Title' }, { de: 'Angelegt', en: 'Equipped' }, { de: 'So bekommst du ihn', en: 'How to get it' }],
          rows: [
            [both('**Unbound by Genus**'), { de: 'PvE-Schaden +4,5 %, Angriff +34, Krit +68', en: 'PvE Damage Boost +4.5%, Attack +34, Crit +68' }, { de: 'Alle Genus-Einsichten der Haustiere auf 10', en: 'Every pet Genus Insight at 10' }],
            [both('**Genuine Masterpiece**'), { de: 'Perfekt +2,5 %, Krit-Angriff +48, Krit-Schaden +3 %', en: 'Perfect +2.5%, Crit Attack +48, Crit Damage Boost +3%' }, { de: '13 Unique-Kunstwerke von Feldbossen', en: '13 Unique Artworks from field bosses' }],
            [both('**Golden Glow**'), { de: 'Genauigkeit +60, Krit-Angriff +45, Krit-Schaden +3 %', en: 'Accuracy +60, Crit Attack +45, Crit Damage Boost +3%' }, { de: 'Ein Unique-Teil ganz verstärkt', en: 'One Unique piece fully enhanced' }],
            [both('**Click**'), { de: 'HP +1.000, Schadensresistenz +3,5 %, Krit-Schaden-Verteidigung +510', en: 'HP +1,000, Damage Tolerance +3.5%, Crit Damage Defence +510' }, { de: 'Alle 10 Kunstwerke des Shugo-Festivals (Centuryroot Tokens)', en: 'All 10 Shugo Festival Artworks (Centuryroot Tokens)' }],
            [both('**Journey’s Path**'), { de: 'HP +900, Kampfgeschwindigkeit +3 %, Ausdauer-Regeneration +28', en: 'HP +900, Combat Speed +3%, Stamina regen +28' }, { de: '6 Kunstwerke der Expeditionen', en: '6 Expedition Artworks' }],
            [both('**Empty Closet**'), { de: 'Kampfgeschwindigkeit +3,5 %, Abklingzeit −3,5 %, HP-Regeneration +42', en: 'Combat Speed +3.5%, Cooldown Reduction +3.5%, HP regen +42' }, { de: '700 Skins im Kleiderschrank', en: '700 skins in the Closet' }],
            [both('**Dominator of Dimensions**'), { de: 'HP +1.000, Verteidigung +340, PvE-Schadensresistenz +4,5 %', en: 'HP +1,000, Defence +340, PvE Damage Tolerance +4.5%' }, { de: '25 verschiedene Flügel', en: '25 different wings' }],
          ],
        },
        { type: 'links', items: [{ href: '#/pets', label: { de: 'Haustiere: Genus-Einsicht ausrechnen', en: 'Pets: work out Genus Insight' } }, { href: '#/guides/wings', label: { de: 'Flügel sammeln', en: 'Collecting wings' } }] },
      ],
    },
    {
      title: { de: 'Schnelle Titel zum Abhaken', en: 'Quick titles to tick off' },
      blocks: [
        {
          type: 'checklist',
          items: [
            { de: '**Episoden:** jede Episode der Story gibt einen Titel – 1–3 Common, 4 Rare, 5 Epic, 6 Unique.', en: '**Episodes:** every story episode gives a title – 1–3 Common, 4 Rare, 5 Epic, 6 Unique.' },
            { de: '**Spacetime Rift:** 3 Nutzungen geben „Hello There“ (PvE-Schadensresistenz +1,9 %), 50 Nutzungen „Nice to Meet You“ (PvE-Schaden +2,9 %).', en: '**Spacetime Rift:** 3 uses give “Hello There” (PvE Damage Tolerance +1.9%), 50 uses “Nice to Meet You” (PvE Damage Boost +2.9%).' },
            { de: '**Teleportation Specialist:** alle 61 Kibelisks deines Heimatgebiets (PvE-Schaden +3,1 %).', en: '**Teleportation Specialist:** all 61 Kibelisks of your home zone (PvE Damage Boost +3.1%).' },
            { de: '**Scenery Collector:** PvE-Schaden +3,3 %.', en: '**Scenery Collector:** PvE Damage Boost +3.3%.' },
            { de: '**Ferocious Horn Den Sightseer:** PvE-Schadensresistenz +2,6 %.', en: '**Ferocious Horn Den Sightseer:** PvE Damage Tolerance +2.6%.' },
            { de: '**Kromede Will Remember That:** im Bossraum von Fire Temple Conquest hinlegen (Krit-Schaden +1,2 %).', en: '**Kromede Will Remember That:** lie down in the Fire Temple Conquest boss room (Crit Damage Boost +1.2%).' },
            { de: '**Legion beitreten:** „There’s No ‘I’ in Team“ (HP +270).', en: '**Join a Legion:** “There’s No ‘I’ in Team” (HP +270).' },
            { de: '**Shugo-Festival:** 9 Minispiele, je 3 Mal gespielt, geben je einen Rare-Titel – etwa Laufgeschwindigkeit +1,8 %.', en: '**Shugo Festival:** 9 mini-games, each played 3 times, give one Rare title each – such as Move Speed +1.8%.' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Fluggeschwindigkeit', en: 'Flight Speed' }, value: { de: 'Eagle Eye (9 Unique-Kunstwerke von Feldbossen) gibt angelegt Lauf- und Fluggeschwindigkeit je +2,5 %. Die Henker-Titel von Bloodfang Pnyn und Blue Wave Kelpina geben angelegt +1,9 %, im Besitz +0,5 %.', en: 'Eagle Eye (9 Unique field-boss Artworks) gives Move and Flight Speed +2.5% each while equipped. The executioner titles of Bloodfang Pnyn and Blue Wave Kelpina give +1.9% equipped, +0.5% owned.' } },
            { label: both('PvP'), value: { de: 'Treading on Black / White Wings (300 Spieler besiegt): PvP-Schaden +4 %, PvP-Angriff +40, PvP-Genauigkeit +80. Saint of Ereshkigal (Ereshkigal-Monolith Stufe 20): PvP-Schaden +4 %. Executioner of High Commander Lagta: Kampf- und Laufgeschwindigkeit je +2,5 %.', en: 'Treading on Black / White Wings (300 players defeated): PvP Damage Boost +4%, PvP Attack +40, PvP Accuracy +80. Saint of Ereshkigal (Ereshkigal Monolith level 20): PvP Damage Boost +4%. Executioner of High Commander Lagta: Combat and Move Speed +2.5% each.' } },
            { label: { de: 'Ranglisten-Titel', en: 'Ranking titles' }, value: { de: 'Die Titel für die Ränge in Nightmare und Transcendence haben in Saison 1 auf Global keine Werte (Platz 1–10 Heroic bis 1.001–10.000 Common).', en: 'The rank titles for Nightmare and Transcendence have no stats on Global in Season 1 (places 1–10 Heroic down to 1,001–10,000 Common).' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Der Kleiderschrank', en: 'The Closet' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**18 Reihen:** 9 für Waffen, 7 für Rüstung, 2 für Schmuck. Jede Reihe sammelt 0–500 Punkte, jeder Punkt gibt +0,1 % – bis +50 %.', en: '**18 tracks:** 9 for weapons, 7 for armour, 2 for accessories. Each track collects 0–500 points, every point gives +0.1% – up to +50%.' },
            { de: '**Was es gibt:** Waffen-Reihen erhöhen den Angriff mit diesem Waffentyp, Rüstungs-Reihen die Verteidigung dieses Teils, die Schmuck-Reihen Halskette und Ohrringe.', en: '**What it gives:** weapon tracks raise Attack with that weapon type, armour tracks the Defence of that slot, the accessory tracks the necklace and earrings.' },
            { de: '**Besitz reicht:** du musst den Skin nicht tragen; doppelte bringen nichts. Laut einer Quelle zählt ein Skin je nach Qualität 1–4 Punkte, und Waffen-Skins, die deine Klasse nicht tragen kann, zählen nicht.', en: '**Owning is enough:** you don’t have to wear the skin; duplicates add nothing. According to one source a skin counts 1–4 points by grade, and weapon skins your class can’t use don’t count.' },
            { de: '**Shop-Skins zählen nicht:** Premium-Skins aus dem Shop geben keine Sammel-Punkte.', en: '**Shop skins don’t count:** premium skins from the shop give no collection points.' },
            { de: '**Pro Server:** Kleiderschrank und Bonus gelten für alle deine Charaktere auf dem Server.', en: '**Per server:** the Closet and its bonus apply to all your characters on that server.' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Doppelte Skins kombinieren: was dabei herauskommt (MetaBot, aion2.blog)', en: 'Combining duplicate skins: what comes out (MetaBot, aion2.blog)' },
          head: [{ de: 'Qualität', en: 'Grade' }, 'Kina', { de: 'Gleiche Qualität', en: 'Same grade' }, { de: 'Eine Stufe höher', en: 'One grade up' }],
          rows: [
            ['Common', '600', { de: '75 %', en: '75%' }, { de: '25 %', en: '25%' }],
            ['Rare', { de: '1.000', en: '1,000' }, { de: '80 %', en: '80%' }, { de: '20 %', en: '20%' }],
            ['Epic', { de: '6.000', en: '6,000' }, { de: '85 %', en: '85%' }, { de: '15 %', en: '15%' }],
            ['Unique', { de: '30.000', en: '30,000' }, { de: '100 % (neu gewürfelt)', en: '100% (reroll)' }, '–'],
          ],
        },
        {
          type: 'facts',
          items: [
            { label: both('Lucky Aura'), value: { de: '+10 % auf die höhere Stufe beim Kombinieren von Common, Rare oder Epic. Im Saison-Shop für 2.550, 10.100 und 40.200 Oath Coins (5, 3 und 1 pro Konto und Server), außerdem aus Erfolgen und versteckten Würfeln. Die Unique-Aura (+5 %) nur aus Würfeln.', en: '+10% on the higher grade when combining Common, Rare or Epic. In the Season Shop for 2,550, 10,100 and 40,200 Oath Coins (5, 3 and 1 per account and server), also from achievements and hidden cubes. The Unique aura (+5%) only from cubes.' } },
            { label: { de: 'Skins mit Werten', en: 'Skins with stats' }, value: { de: 'Decanus und Centurion haben dieselben Werte: jedes Rüstungsteil PvP-Schadensresistenz +1 %, Ohrringe und Halskette je PvP-Schaden +2 %. Decanus kostet 317.100 AP fürs Set, Centurion 1.029.700 AP und 280 Silver Medals of Merit.', en: 'Decanus and Centurion have the same stats: every armour piece PvP Damage Tolerance +1%, earrings and necklace PvP Damage Boost +2% each. Decanus costs 317,100 AP for the set, Centurion 1,029,700 AP and 280 Silver Medals of Merit.' } },
            { label: { de: 'Skin-Titel', en: 'Skin titles' }, value: { de: 'Fashionista (100 Skins): Kampfgeschwindigkeit +1,9 %. Fashion Forward (300): Ausweichen +42. Empty Closet (700): siehe oben – andere Guides nennen dafür leicht andere Werte.', en: 'Fashionista (100 skins): Combat Speed +1.9%. Fashion Forward (300): Evasion +42. Empty Closet (700): see above – other guides give slightly different numbers for it.' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Das Pantheon', en: 'The Pantheon' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Im Pantheon stellst du Kolosse, Statuen und Kunstwerke auf; jedes gibt Punkte für Götter-Werte, und jeder Götter-Wert stärkt zwei Kampfwerte. Nur aufgestellte Stücke zählen. Die meisten Quellen beschreiben es als persönlich (jedes Stück einmal pro Charakter); eine führt dieselben Plätze unter der Legions-Halle.',
            en: 'In the Pantheon you place Colossi, Statues and Artworks; each gives points for deity stats, and every deity stat strengthens two combat stats. Only placed pieces count. Most sources describe it as personal (each piece once per character); one lists the same slots under the Legion Hall.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Sechs der zehn Götter-Werte und was sie stärken (aion2.tools). Pro Punkt +0,1 % auf jeden der beiden – eine ältere Quelle mit koreanischen Werten nennt 0,2 %.', en: 'Six of the ten deity stats and what they strengthen (aion2.tools). Per point +0.1% to each of the two – an older source with Korean values says 0.2%.' },
          head: [{ de: 'Götter-Wert', en: 'Deity stat' }, { de: 'Stärkt', en: 'Strengthens' }],
          rows: [
            [both('Destruction'), { de: 'Angriff und Perfekt-Resistenz', en: 'Attack and Perfect Resist' }],
            [both('Justice'), { de: 'Verteidigung und Perfekt-Chance', en: 'Defence and Perfect Chance' }],
            [both('Time'), { de: 'Kampfgeschwindigkeit und Doppel-Resistenz', en: 'Combat Speed and Double Resist' }],
            [both('Wisdom'), { de: 'MP-Kosten und Doppel-Chance', en: 'MP cost and Double Chance' }],
            [both('Illusion'), { de: 'Abklingzeit und Ausdauer-Durchschlag', en: 'Cooldown and Endurance Penetration' }],
            [both('Destiny'), { de: 'MP und Ausdauer', en: 'MP and Endurance' }],
          ],
        },
        {
          type: 'table',
          caption: { de: 'Stücke, die sich lohnen (aion2.tools, showgamer, MetaBot)', en: 'Pieces worth placing (aion2.tools, showgamer, MetaBot)' },
          head: [{ de: 'Platz', en: 'Slot' }, { de: 'Stück', en: 'Piece' }, { de: 'Gibt', en: 'Gives' }, { de: 'Woher', en: 'Where from' }],
          rows: [
            [{ de: 'Koloss', en: 'Colossus' }, both('**Guardian Lord Nahma**'), { de: 'Justice, Time, Destruction je +55', en: 'Justice, Time, Destruction +55 each' }, { de: 'Drop von Nahma in Chaotic Lower Reshanta', en: 'drop from Nahma in Chaotic Lower Reshanta' }],
            [{ de: 'Koloss', en: 'Colossus' }, both('**Zikel’s Apparition**'), { de: 'dieselben drei je +45', en: 'the same three +45 each' }, { de: '14.000 Phantasmal Fragments', en: '14,000 Phantasmal Fragments' }],
            [{ de: 'Koloss', en: 'Colossus' }, both('Incarnated Warding Feather / Warden Santras'), { de: 'Justice und Time je +35', en: 'Justice and Time +35 each' }, { de: 'Quest (Elyos / Asmodier)', en: 'quest (Elyos / Asmodians)' }],
            [{ de: 'Statue', en: 'Statue' }, both('**Transcendent Bakarma**'), { de: 'Freedom, Death, Space je +12', en: 'Freedom, Death, Space +12 each' }, { de: 'Erfolg für Draupnir-Conquest-Abschlüsse', en: 'achievement for Draupnir Conquest clears' }],
            [{ de: 'Statue', en: 'Statue' }, both('Notun, Gerod'), { de: 'je +10 auf zwei Werte', en: '+10 to two stats each' }, { de: 'je 8.000 Phantasmal Fragments', en: '8,000 Phantasmal Fragments each' }],
            [{ de: 'Kunstwerk', en: 'Artwork' }, both('Immortal / Eternal Gartua'), { de: 'Illusion, Life, Wisdom, Destiny je +5', en: 'Illusion, Life, Wisdom, Destiny +5 each' }, { de: 'Immortal Isle (Altgard) / Eternal Isle (Verteron) oder 20.000 Artwork Scrap per Substance Morph', en: 'Immortal Isle (Altgard) / Eternal Isle (Verteron) or 20,000 Artwork Scrap via Substance Morph' }],
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Auch die Aufstiegs-Quests geben Statuen, und der Festival-Shop verkauft Kunstwerke für 2.000–10.000 Centuryroot Tokens. Stücke aus den Saison-Ranglisten wirken nur bis zum Ende der folgenden Saison – die aus Saison 1 tun im Moment nichts.',
            en: 'The Ascension quests give Statues too, and the Festival shop sells Artworks for 2,000–10,000 Centuryroot Tokens. Pieces from the season rankings only work until the end of the following season – the Season 1 ones do nothing right now.',
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
            { de: '**Titel-Plätze leer gelassen** – drei Plätze, drei angelegte Boni.', en: '**Leaving title slots empty** – three slots, three equipped bonuses.' },
            { de: '**Den Monolithen ausgelassen** – er gibt die zwei meistgetragenen Titel.', en: '**Skipping the Monolith** – it gives the two most worn titles.' },
            { de: '**Centurion statt Decanus gekauft** – gleiche Werte, über dreimal so teuer.', en: '**Buying Centurion instead of Decanus** – same stats, more than three times the price.' },
            { de: '**Shop-Skins für den Sammel-Bonus gekauft** – sie zählen nicht.', en: '**Buying shop skins for the collection bonus** – they don’t count.' },
            { de: '**Pantheon-Stücke nur gesammelt** – sie wirken erst aufgestellt.', en: '**Only collecting Pantheon pieces** – they only work once placed.' },
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
            de: 'Offen sind: ob einzelne Titel für den ganzen Server gelten (die Client-Daten führen jeden Titel pro Charakter; Titel aus dem Founder’s Pack gelten seit dem 7. Oktober auf allen Charakteren); wann sich die Titel-Plätze öffnen; wie viele Punkte ein Skin je Qualität bringt; die genauen Werte von Empty Closet; ob das Pantheon persönlich ist oder zur Legions-Halle gehört; ob ein Götter-Punkt 0,1 % oder 0,2 % gibt; und ob Kleiderschrank und Pantheon in die Kampfkraft eingehen. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open are: whether some titles apply to the whole server (the client data lists every title per character; Founder’s Pack titles work on all characters since 7 October); when the title slots open; how many points a skin gives per grade; the exact stats of Empty Closet; whether the Pantheon is personal or part of the Legion Hall; whether a deity point gives 0.1% or 0.2%; and whether the Closet and the Pantheon count towards Combat Power. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/titles-guide', label: 'metabot.gg – Titles guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/costumes-skins-guide', label: 'metabot.gg – Costumes & skins guide' },
            { href: 'https://metabot.gg/en/aion-2/legion-hall', label: 'metabot.gg – Legion Hall (decorations)' },
            { href: 'https://metabot.gg/en/aion-2/guides/legion-guide', label: 'metabot.gg – Legion guide' },
            { href: 'https://allthings.how/aion-2-best-gold-titles-and-how-to-get-them/', label: 'AllThings.How – Best gold titles' },
            { href: 'https://allthings.how/aion-2-how-to-increase-flight-power-and-stay-airborne-longer/', label: 'AllThings.How – Flight Power (Flight Speed titles)' },
            { href: 'https://aion2.blog/skins/', label: 'aion2.blog – Skins' },
            { href: 'https://aion2.tools/guides/pantheon', label: 'aion2.tools – Pantheon' },
            { href: 'https://showgamer.com/en/guides/6362-kak-rabotaet-panteon-v-aion-2-kak-otkryt-gde-brat-statui-i-kakie-harakteristiki-povyshat', label: 'showgamer – Pantheon' },
            { href: 'https://aion2data.com/monoliths', label: 'aion2data – Monoliths' },
            { href: 'https://aion2data.com/alts', label: 'aion2data – What is per character' },
            { href: 'https://daevaguides.com/en/news/2026-10-07-patch-notes/', label: 'daevaguides – Patch notes 7 Oct (Founder’s Pack titles)' },
            { href: 'https://aion2.vi.ki/cash-shop-and-cosmetics', label: 'aion2.vi.ki – Cash shop and cosmetics' },
          ],
        },
      ],
    },
  ],
};
