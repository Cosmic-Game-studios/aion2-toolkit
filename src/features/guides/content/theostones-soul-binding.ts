import type { Guide, L10n } from '../types';

/**
 * Theostones and Soul Binding on the global server: the weapon slot, all 17 effects in three grades, where the stones
 * come from, chest odds and combining; then how Soul Binding lines are bound, synced and reset (October 2026). Numbers
 * and facts from the sources at the end, paraphrased; the Theostone tables come from MetaBot's reading of the Global
 * client, checked against AllThings.How and showgamer. The Soul Binding part rests on two guides (games.gg,
 * AllThings.How) that don't name their region, so it is marked as such. Average damage per hit is worked out from
 * chance × damage, not measured. Manastones have their own guide (manastones.ts).
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });

export const theostonesSoulBinding: Guide = {
  id: 'theostones-soul-binding',
  icon: 'zap',
  tone: 'violet',
  category: 'world',
  title: {
    de: 'Theostones & Seelenbindung: Extras für deine Ausrüstung',
    en: 'Theostones & Soul Binding: extras for your gear',
  },
  summary: {
    de: 'Alle 17 Theostone-Effekte in drei Qualitäten, woher die Steine kommen, was in der Truhe steckt und wie oft das Kombinieren klappt – dazu, wie Seelenbindungs-Zeilen gebunden, neu gewürfelt und erweitert werden.',
    en: 'All 17 Theostone effects in three grades, where the stones come from, what’s in the chest and how often combining works – plus how Soul Binding lines are bound, rerolled and extended.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Theostones', en: 'Theostones' },
    { de: 'Seelenbindung', en: 'Soul Binding' },
    { de: 'Waffe', en: 'Weapon' },
    { de: 'Ausrüstung', en: 'Gear' },
  ],
  basis: {
    de: 'Recherche in Community-Guides zum globalen Server (Oktober 2026); Theostone-Tabellen aus den Client-Daten, wie MetaBot sie ausliest',
    en: 'Research in community guides for the global server (October 2026); Theostone tables from the client data as MetaBot reads it',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '17', label: { de: 'Theostone-Effekte', en: 'Theostone effects' }, note: { de: 'je Rare, Epic und Unique – 51 Steine', en: 'each Rare, Epic and Unique – 51 stones' }, tone: 'violet' },
            { value: '1', label: { de: 'Slot pro Waffe', en: 'slot per weapon' }, note: { de: 'nur Epic- und Unique-Waffen', en: 'Epic and Unique weapons only' }, tone: 'blue' },
            { value: { de: '11,1 %', en: '11.1%' }, label: { de: 'Rare → Epic beim Kombinieren', en: 'Rare → Epic when combining' }, note: { de: 'Epic → Unique 9,1 %', en: 'Epic → Unique 9.1%' }, tone: 'gold' },
            { value: '3–5', label: { de: 'Seelenbindungs-Zeilen auf Unique', en: 'Soul Binding lines on Unique' }, note: { de: '+1 mit Philosopher’s Stones', en: '+1 with Philosopher’s Stones' }, tone: 'teal' },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Ein **Theostone** sitzt in der Waffe und löst mit einer festen Chance einen Effekt aus – Kontrolle, Schaden über Zeit oder einen Schadensstoß. Die **Seelenbindung** gibt jedem Teil zufällige Zusatz-Zeilen, die du festigst, neu würfelst und auf Unique-Teilen um eine Zeile erweiterst. Manasteine sind ein drittes System mit eigenem Guide.',
            en: 'A **Theostone** sits in your weapon and triggers an effect at a fixed chance – control, damage over time or a burst of damage. **Soul Binding** gives every piece random extra lines that you firm up, reroll and on Unique pieces extend by one line. Manastones are a third system with their own guide.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/manastones', label: { de: 'Manasteine', en: 'Manastones' } }] },
      ],
    },
    {
      title: { de: 'Theostones: so funktionieren sie', en: 'Theostones: how they work' },
      blocks: [
        {
          type: 'steps',
          items: [
            { title: { de: 'Fenster öffnen', en: 'Open the window' }, text: { de: 'N drücken und den Reiter Theostone wählen.', en: 'Press N and pick the Theostone tab.' } },
            { title: { de: 'Waffe und Stein wählen', en: 'Choose weapon and stone' }, text: { de: 'Nur Epic- und Unique-Waffen haben einen Slot; ein gesperrtes Teil lässt sich nicht gravieren.', en: 'Only Epic and Unique weapons have a slot; a locked item can’t be engraved.' } },
            { title: { de: 'Gravieren', en: 'Engrave' }, text: { de: 'Laut einer Quelle kostet das 10.000 Kina.', en: 'According to one source it costs 10,000 Kina.' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Kein Stapeln:** Zwei gleiche Steine wirken nicht doppelt.', en: '**No stacking:** two identical stones don’t work twice.' },
            { de: '**Upgrade behält den Stein:** Ein Upgrade im Verbesserungsfenster nimmt ihn mit; ein Gear Transfer nicht.', en: '**An Upgrade keeps the stone:** an Upgrade in the Enhancement window carries it over; a Gear Transfer doesn’t.' },
            { de: '**Ersetzen und Zerlegen:** Wer die Waffe zerlegt, verliert den Stein. Ob Herausnehmen oder Ersetzen ihn zerstört, ist umstritten – das Spiel zeigt vorher ein Fenster, das es sagt.', en: '**Replacing and salvaging:** salvaging the weapon destroys the stone. Whether removing or replacing it destroys it is disputed – the game shows a popup that tells you first.' },
            { de: '**Fester Schaden:** Der Schaden der Steine wächst nicht mit deinem Angriff.', en: '**Flat damage:** the stones’ damage doesn’t scale with your Attack.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Alle 17 Effekte', en: 'All 17 effects' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Laut den Client-Daten (MetaBot); AllThings.How bestätigt die Kontroll-Steine. Die Chance ist in jeder Qualität gleich, nur Dauer oder Schaden steigt.', en: 'According to the client data (MetaBot); AllThings.How confirms the control stones. The chance is the same in every grade, only duration or damage rises.' },
          head: [{ de: 'Effekt', en: 'Effect' }, { de: 'Chance', en: 'Chance' }, 'Rare / Epic / Unique', { de: 'Abklingzeit', en: 'Cooldown' }],
          rows: [
            [{ de: '**Blind**', en: '**Blind**' }, { de: '3 %', en: '3%' }, '5 / 6 / 7 s', '5 s'],
            [{ de: '**Versiegeln**', en: '**Seal**' }, { de: '3 %', en: '3%' }, '3 / 4 / 5 s', '5 s'],
            [{ de: '**Festhalten**', en: '**Root**' }, { de: '2 %', en: '2%' }, '3 / 4 / 5 s', '5 s'],
            [{ de: '**Betäuben**', en: '**Stun**' }, { de: '3 %', en: '3%' }, '1 / 2 / 3 s', '5 s'],
            [{ de: '**Lähmen**', en: '**Paralyze**' }, { de: '2 %', en: '2%' }, '2 / 3 / 4 s', '5 s'],
            [{ de: '**Laufgeschwindigkeit −50 %**', en: '**Move Speed −50%**' }, { de: '3 %', en: '3%' }, '5 / 6 / 7 s', '5 s'],
            [{ de: '**Kampfgeschwindigkeit −50 %**', en: '**Combat Speed −50%**' }, { de: '3 %', en: '3%' }, '5 / 6 / 7 s', '5 s'],
            [{ de: '**Gift**', en: '**Poison**' }, { de: '5 %', en: '5%' }, { de: '300 / 450 / 600 alle 2 s für 20 s', en: '300 / 450 / 600 every 2 s for 20 s' }, '1 s'],
            [{ de: '**Blutung**', en: '**Bleed**' }, { de: '3 %', en: '3%' }, { de: '400 / 600 / 800 alle 2 s für 10 s', en: '400 / 600 / 800 every 2 s for 10 s' }, '1 s'],
            [{ de: '**Feuer**, ein Ziel', en: '**Fire**, one target' }, { de: '1 %', en: '1%' }, { de: '5.000 / 10.000 / 15.000', en: '5,000 / 10,000 / 15,000' }, '–'],
            [{ de: '**Wasser**, ein Ziel', en: '**Water**, one target' }, { de: '2 %', en: '2%' }, { de: '2.500 / 5.000 / 7.500', en: '2,500 / 5,000 / 7,500' }, '–'],
            [{ de: '**Erde**, ein Ziel', en: '**Earth**, one target' }, { de: '5 %', en: '5%' }, { de: '1.000 / 2.000 / 3.000', en: '1,000 / 2,000 / 3,000' }, '–'],
            [{ de: '**Wind**, ein Ziel', en: '**Wind**, one target' }, { de: '10 %', en: '10%' }, { de: '500 / 1.000 / 1.500', en: '500 / 1,000 / 1,500' }, '–'],
            [{ de: '**Feuer**, Fläche', en: '**Fire**, area' }, { de: '2 %', en: '2%' }, { de: '1.250 / 2.500 / 3.750', en: '1,250 / 2,500 / 3,750' }, '–'],
            [{ de: '**Wasser**, Fläche', en: '**Water**, area' }, { de: '4 %', en: '4%' }, { de: '625 / 1.250 / 1.875', en: '625 / 1,250 / 1,875' }, '–'],
            [{ de: '**Erde**, Fläche', en: '**Earth**, area' }, { de: '10 %', en: '10%' }, '250 / 500 / 750', '–'],
            [{ de: '**Wind**, Fläche', en: '**Wind**, area' }, { de: '20 %', en: '20%' }, '125 / 250 / 375', { de: '5 s (Rare)', en: '5 s (Rare)' }],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Nachgerechnet', en: 'Worked out' },
          text: {
            de: 'Chance × Schaden: Jeder Ein-Ziel-Stein bringt im Schnitt 50 / 100 / 150 Schaden pro Treffer (Rare / Epic / Unique) – egal welches Element. Jeder Flächen-Stein bringt 25 / 50 / 75 pro Ziel und trifft bis zu 4 Ziele. Der Unterschied liegt also nur darin, wie oft und wie hoch es einschlägt. Gerechnet, nicht gemessen.',
            en: 'Chance × damage: every single-target stone averages 50 / 100 / 150 damage per hit (Rare / Epic / Unique) – whatever the element. Every area stone averages 25 / 50 / 75 per target and hits up to 4 targets. The only difference is how often and how hard it lands. Worked out, not measured.',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Unique-Namen', en: 'Unique names' }, value: { de: 'Zum Beispiel Tiamat’s Rage (Feuer), Yustiel’s Compassion (Erde, Fläche), Zikel’s Arrogance (Gift), Meslamtaeda’s Greed (Betäuben), Beritra’s Conspiracy (Versiegeln), Lumiel’s Interference (Kampfgeschwindigkeit), Ereshkigal’s Honor (Lähmen)', en: 'For example Tiamat’s Rage (Fire), Yustiel’s Compassion (Earth, area), Zikel’s Arrogance (Poison), Meslamtaeda’s Greed (Stun), Beritra’s Conspiracy (Seal), Lumiel’s Interference (Combat Speed), Ereshkigal’s Honor (Paralyze)' } },
            { label: { de: 'MetaBots Vorschläge', en: 'MetaBot’s picks' }, value: { de: 'Flächen-Schadensklassen: Yustiel’s Compassion oder Tiamat’s Counterstrike im PvE, Meslamtaeda’s Greed im PvP. Assassin: Tiamat’s Rage oder Ereshkigal’s Honor. Spiritmaster: Zikel’s Arrogance oder Beritra’s Conspiracy. Tanks: Lumiel’s Interference oder Nezekan’s March. Heiler: Beritra’s Selfishness oder Beritra’s Conspiracy. Das ist MetaBots eigene Einschätzung, keine Auswertung, was Spieler tragen.', en: 'Area damage classes: Yustiel’s Compassion or Tiamat’s Counterstrike in PvE, Meslamtaeda’s Greed in PvP. Assassin: Tiamat’s Rage or Ereshkigal’s Honor. Spiritmaster: Zikel’s Arrogance or Beritra’s Conspiracy. Tanks: Lumiel’s Interference or Nezekan’s March. Healers: Beritra’s Selfishness or Beritra’s Conspiracy. That is MetaBot’s own assessment, not data on what players wear.' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Woher die Steine kommen', en: 'Where the stones come from' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Laut MetaBot, AllThings.How und showgamer. Auf dem Markt sind nur Rare-Steine handelbar.', en: 'According to MetaBot, AllThings.How and showgamer. Only Rare stones can be traded on the Market.' },
          head: [{ de: 'Quelle', en: 'Source' }, { de: 'Was', en: 'What' }, { de: 'Grenze', en: 'Limit' }],
          rows: [
            [{ de: 'Gebietsquests ab 45', en: 'Regional quests from 45' }, { de: 'je 100.000 gebundenes Kina und eine Rare-Theostone-Truhe (z. B. „A Traitor Within“, „Regular Altar Maintenance“)', en: '100,000 bound Kina and a Rare Theostone Chest each (e.g. “A Traitor Within”, “Regular Altar Maintenance”)' }, { de: '3 pro Fraktion, einmal', en: '3 per faction, once' }],
            [{ de: 'Abyss-Shop', en: 'Abyss shop' }, { de: 'Rare-Truhe für 35.000 AP – auswählbar oder zufällig, darüber streiten die Quellen', en: 'Rare chest for 35,000 AP – selectable or random, the sources disagree' }, '–'],
            [{ de: 'Saison-Shop', en: 'Season Shop' }, { de: 'Truhe für 17.500 Oath Coins', en: 'chest for 17,500 Oath Coins' }, { de: '10 pro Konto und Server, bis 16. Dezember', en: '10 per account and server, until 16 December' }],
            [{ de: 'Arena-Shop', en: 'Arena shop' }, { de: 'für 1 Arena Token', en: 'for 1 Arena Token' }, { de: '5 pro Charakter und Woche', en: '5 per character a week' }],
            [both('Daeva Pass'), { de: '2 Truhen', en: '2 chests' }, '–'],
            [{ de: 'Black Cloud Merchants', en: 'Black Cloud Merchants' }, { de: 'Rare und Epic', en: 'Rare and Epic' }, '–'],
          ],
        },
        {
          type: 'shares',
          title: { de: 'Was in der Rare-Truhe steckt', en: 'What’s in the Rare chest' },
          caption: { de: 'Chancen pro Gruppe laut den Client-Daten (MetaBot). Jeder Ein-Ziel-Stein hat 9,92 %, jeder Flächen-Stein 6,61 %.', en: 'Odds per group according to the client data (MetaBot). Each single-target stone has 9.92%, each area stone 6.61%.' },
          unit: '%',
          items: [
            { label: { de: 'Ein-Ziel-Schaden (4)', en: 'Single-target damage (4)' }, value: 39.7, tone: 'rose' },
            { label: { de: 'Flächen-Schaden (4)', en: 'Area damage (4)' }, value: 26.4, tone: 'gold' },
            { label: { de: 'Tempo, Gift, Blutung (4)', en: 'Speed, Poison, Bleed (4)' }, note: { de: 'je 4,96 %', en: '4.96% each' }, value: 19.8, tone: 'green' },
            { label: { de: 'Blind, Betäuben, Lähmen (3)', en: 'Blind, Stun, Paralyze (3)' }, note: { de: 'je 2,48 %', en: '2.48% each' }, value: 7.4, tone: 'violet' },
            { label: { de: 'Versiegeln, Festhalten (2)', en: 'Seal, Root (2)' }, note: { de: 'je 3,31 %', en: '3.31% each' }, value: 6.6, tone: 'blue' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Kombinieren', en: 'Combining' }, value: { de: 'Rare → Epic 11,1 %, Epic → Unique 9,1 %; Unique → ein anderer Unique 100 %. Laut einer Quelle braucht es mindestens 4 Steine; die Kina-Kosten nennt keine.', en: 'Rare → Epic 11.1%, Epic → Unique 9.1%; Unique → another Unique 100%. According to one source it takes at least 4 stones; none gives the Kina cost.' } },
            { label: { de: 'Erfolge', en: 'Achievements' }, value: { de: 'Die Erfolge fürs Kombinieren und Gravieren zahlen zusammen 182.000 gebundenes Kina.', en: 'The achievements for combining and engraving pay 182,000 bound Kina in total.' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Seelenbindung', en: 'Soul Binding' },
      blocks: [
        {
          type: 'callout',
          tone: 'warn',
          text: {
            de: 'Diesen Teil beschreiben zwei Guides (games.gg, AllThings.How), die keine Region nennen und heroische Ausrüstung erwähnen – die gibt es auf Global noch nicht. Die Abläufe stimmen bei beiden überein; einzelne Preise können aus Korea stammen.',
            en: 'This part is described by two guides (games.gg, AllThings.How) that name no region and mention Heroic gear – which Global doesn’t have yet. The steps match in both; single prices may come from Korea.',
          },
        },
        {
          type: 'table',
          caption: { de: 'Zeilen pro Qualität. Etwa jede fünfte Zeile ist +1 auf einen Skill deiner Klasse: Waffen, Schilde und Ringe würfeln aktive Skills, Rüstung, Ohrringe und Halsketten passive.', en: 'Lines per grade. About one line in five is +1 to one of your class skills: weapons, guards and rings roll active skills, armour, earrings and necklaces passive ones.' },
          head: [{ de: 'Qualität', en: 'Grade' }, { de: 'Zeilen', en: 'Lines' }],
          rows: [
            ['Common', '1'],
            ['Rare', '2'],
            ['Epic', '3'],
            ['Unique', { de: '3–5 (hergestellte Dragon-Lord-Teile 5)', en: '3–5 (crafted Dragon Lord pieces 5)' }],
          ],
        },
        {
          type: 'flow',
          title: { de: 'Die Reihenfolge', en: 'The order' },
          caption: { de: 'Beide Guides raten: nicht vor Stufe 45 investieren, erst die Zeilen würfeln, zuletzt binden.', en: 'Both guides advise: don’t invest before level 45, roll the lines first, bind last.' },
          items: [
            { title: { de: 'Neu würfeln (Reset)', en: 'Reroll (Reset)' }, text: { de: 'Soul Codex: Reset und Kina – würfelt alle Zeilen neu, der Bindungs-Fortschritt fällt auf 0', en: 'Soul Codex: Reset and Kina – rerolls every line, binding progress drops to 0' }, tone: 'slate' },
            { title: { de: 'Eine Zeile tauschen (Sync)', en: 'Swap one line (Sync)' }, text: { de: 'Opfert ein Teil derselben Qualität und Art – oder ein Sync-Stone-Fragment', en: 'Sacrifices a piece of the same grade and type – or a Sync Stone Fragment' }, tone: 'blue' },
            { title: { de: 'Binden', en: 'Bind' }, tag: { de: '30.000 Kina', en: '30,000 Kina' }, text: { de: 'Plus mindestens 1 Soul Codex pro Versuch; jeder Versuch hebt die Zeilen, nahe am Ende weniger', en: 'Plus at least 1 Soul Codex per try; every try raises the lines, less near the end' }, tone: 'violet' },
            { title: { de: 'Zusatz-Zeile', en: 'Extra line' }, tag: { de: '100 %', en: '100%' }, text: { de: 'Auf Unique-Teilen: 2 Philosopher’s Stones und 1 Mio. Kina, gelingt immer', en: 'On Unique pieces: 2 Philosopher’s Stones and 1M Kina, always succeeds' }, tone: 'gold' },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Bei 100 % ist Schluss:** Die Werte sind dann für immer fest. Das gebundene Teil ist nicht mehr handelbar.', en: '**At 100% it’s final:** the stats are then fixed for good. The bound piece can no longer be traded.' },
            { de: '**Sync:** Das Opfer ist in jedem Fall weg. Ein Teil derselben Qualität klappt sicher, ein Sync Stone niedrigerer Qualität nur mit 10 % – darum goldene Teile nicht zerlegen.', en: '**Sync:** the sacrifice is gone either way. A piece of the same grade works for sure, a lower-grade Sync Stone only at 10% – so don’t salvage gold pieces.' },
            { de: '**Philosopher’s Stones:** Etwa vier von fünf Teilen brauchen „Revelation“-Steine, der Rest „Power“. Beide Guides nennen Conquest-Dungeons als Quelle.', en: '**Philosopher’s Stones:** about four in five pieces need “Revelation” stones, the rest “Power”. Both guides name Conquest dungeons as the source.' },
            { de: '**Übertragen:** Laut den Guides gehen die normalen Zeilen mit, wenn du sie auf ein neues Teil überträgst – die Zusatz-Zeile nicht.', en: '**Carrying over:** according to the guides the normal lines move along when you carry them to a new piece – the extra line doesn’t.' },
            { de: '**Welche Teile was würfeln:** Nur der Brustpanzer kann bei der Rüstung Damage Boost haben, nur die Schultern Critical Damage Boost, nur die Handschuhe Kampfgeschwindigkeit, nur Helm und Umhang Smite. Schmuck kann Flugkraft würfeln.', en: '**Which pieces roll what:** among armour only the chest can roll Damage Boost, only the shoulders Critical Damage Boost, only the gloves Combat Speed, only helm and cape Smite. Accessories can roll Flight Power.' },
            { de: '**Material (eine Quelle):** Soul Codex für 400 Phantasmal Fragments im Nightmare-Shop oder 50 Shugo-Münzen; Soul Codex: Reset für 9.000 Phantasmal Fragments (3 pro Charakter und Woche) oder 60.000 im Wachstums-Shop der Saison (5 insgesamt). Ein Reset soll 300.000 Kina kosten.', en: '**Materials (one source):** Soul Codex for 400 Phantasmal Fragments in the Nightmare shop or 50 Shugo coins; Soul Codex: Reset for 9,000 Phantasmal Fragments (3 per character a week) or 60,000 in the season’s Growth shop (5 in total). A reset is said to cost 300,000 Kina.' },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/crafting-gear', label: { de: 'Hergestellte Ausrüstung mit 5 Zeilen', en: 'Crafted gear with 5 lines' } }, { href: '#/guides/combat-power', label: { de: 'Was Upgrades mitnehmen', en: 'What upgrades carry over' } }] },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Eine Waffe mit Stein zerlegt** – der Stein ist weg.', en: '**Salvaging a weapon with a stone** – the stone is gone.' },
            { de: '**Einen Epic-Stein für Kombinier-Versuche verheizt**, den du lieber getragen hättest – 9,1 % ist wenig.', en: '**Burning an Epic stone on combine attempts** you would rather have worn – 9.1% is low.' },
            { de: '**Seelenbindung vor 45** – die Ausrüstung ist bald ersetzt.', en: '**Soul Binding before 45** – the gear gets replaced soon.' },
            { de: '**Zuerst gebunden, dann gewürfelt** – ein Reset setzt den Bindungs-Fortschritt auf 0.', en: '**Binding first, rolling later** – a reset drops binding progress to 0.' },
            { de: '**Goldene Teile zerlegt** – sie sind das sichere Futter für Sync.', en: '**Salvaging gold pieces** – they are the sure-fire fodder for Sync.' },
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
            de: 'In Korea heißen die Steine Godstones. Dort fallen sie auch aus den versteckten Würfeln (auf Global nicht), und ihre Dauer wurde im Februar 2026 gekürzt – einzelne Steine von 12–15 auf 7 Sekunden. Koreanische Werte passen deshalb nicht zu Global.',
            en: 'In Korea the stones are called Godstones. There they also drop from the hidden cubes (not on Global), and their durations were cut in February 2026 – some stones from 12–15 to 7 seconds. Korean numbers therefore don’t fit Global.',
          },
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
            de: 'Offen sind: ob auch Schilde einen Theostone-Slot haben; was Gravieren und Kombinieren kosten und wie viele Steine ein Kombinieren braucht; ob Herausnehmen den Stein zurückgibt; ob die Abyss-Truhe auswählbar ist; ob Transcendence-Dungeons Steine geben; woher Philosopher’s Stones sicher kommen; was Sync an Kina kostet; und wie viel der Seelenbindungs-Angaben aus Korea stammt. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open are: whether guards have a Theostone slot too; what engraving and combining cost and how many stones a combine takes; whether removing a stone returns it; whether the Abyss chest lets you choose; whether Transcendence dungeons drop stones; where Philosopher’s Stones reliably come from; what Sync costs in Kina; and how much of the Soul Binding details comes from Korea. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/theostone-guide', label: 'metabot.gg – Theostone guide' },
            { href: 'https://metabot.gg/en/aion-2/godstones', label: 'metabot.gg – Theostone list' },
            { href: 'https://allthings.how/aion-2-how-to-get-and-use-theostones/', label: 'AllThings.How – Theostones' },
            { href: 'https://showgamer.com/en/guides/6367-teokamni-v-aion-2-gde-nayti-kak-ispolzovat-i-uluchshat', label: 'showgamer – Theostones' },
            { href: 'https://games.gg/aion-2/guides/aion-2-soul-binding-guide/', label: 'games.gg – Soul Binding guide' },
            { href: 'https://allthings.how/aion-2-soul-binding-guide-how-bind-sync-and-reset-work/', label: 'AllThings.How – Soul Binding: bind, sync and reset' },
            { href: 'https://daevaguides.com/en/guides/things-the-game-doesnt-tell-you/', label: 'daevaguides – Things the game doesn’t tell you' },
            { href: 'https://aion2hub.com/updates/aion-2-update-2026-02-04', label: 'AION2Hub – Korean patch notes 4 Feb 2026 (Godstone durations)' },
          ],
        },
      ],
    },
  ],
};
