import type { Guide, L10n } from '../types';

/**
 * Several characters (alts) on the global client. Rests on NC's global notices (patch notes 7 and 14 Oct 2026, server
 * transfer Q&A and products), client-data guides (aion2maps, Fextralife), community guides (Raid Relay, AION2TIERLIST,
 * SPACE4GAMES, games.gg, AllThings.How, MetaBot) – all read 2026-10-19.
 *
 * The time and income charts are a model (see the captions):
 * - Kina: every character at Tier 2 claims 21 cubes a week, 14 × 300,000 + 7 × 200,000 = 5.6M tradeable Kina (farming-power.ts
 *   follows Raid Relay with 21 × 300,000 = 6.3M; the line chart caption says so). Server cut per week on Conquest runs: 1–84 full, 85–105 80%, 106–126 60%, 127–147 40%,
 *   148+ 20%. Free: 21 runs per character; Membership: 2 claims per run, 10.5 runs per character.
 * - Time: Conquest run 10 min (measured by Raid Relay), the rest estimated: an alt ≈360 min a week free, ≈245 min with
 *   Membership; the main ≈570 / ≈455 min (alt content + Duties, Daily Dungeon, Shugo Festa and Invasion).
 */

/** A number text in both languages: German swaps the separators ("1,400" → "1.400") and spells out M and h. */
const num = (en: string): L10n => ({
  en,
  de: en
    .replace(/(?<=\d)[.,](?=\d)/g, (c) => (c === '.' ? ',' : '.'))
    .replace(/(\d)M\b/g, '$1 Mio.')
    .replace(/(\d) h\b/g, '$1 Std.'),
});

const YES = '✔';
const NO = '✘';

export const multiCharacters: Guide = {
  id: 'multi-characters',
  icon: 'users',
  tone: 'teal',
  category: 'basics',
  title: {
    de: 'Mehrere Charaktere (Twinks): lohnt sich das – und wie viele?',
    en: 'Playing several characters (alts): is it worth it – and how many?',
  },
  summary: {
    de: 'Was ein Twink wirklich bringt und kostet: was der Server teilt und was nicht, Zeit pro Woche, Kina-Ertrag mit der Server-Kürzung, die richtige Zahl an Charakteren für deinen Spielstil, worin du investierst – und ein Wochenplan für 2–3 Charaktere.',
    en: 'What an alt really earns and costs: what the server shares and what it does not, time per week, Kina income with the server cut, the right number of characters for your play style, what to invest in – and a week plan for 2–3 characters.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Twinks', en: 'Alts' },
    { de: 'Kina', en: 'Kina' },
    { de: 'Zeitplanung', en: 'Time planning' },
    { de: 'Membership', en: 'Membership' },
  ],
  basis: {
    de: 'Offizielle Patch-Notes und Server-Transfer-Hinweise von NC (Oktober 2026), Guides auf Basis der Client-Daten und Community-Guides zum globalen Server, gemessene Laufzeiten aus einem Guide. Zeit und Ertrag sind ein Modell mit genannten Annahmen.',
    en: 'NC’s official patch notes and server transfer notices (October 2026), guides based on the client data and community guides for the global server, run times measured by one guide. Time and income are a model with stated assumptions.',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein **Twink** (englisch „alt“) ist ein weiterer Charakter auf deinem Account, der **Main** dein Hauptcharakter. In AION 2 hat jeder Charakter seine **eigene Odyle-Energie** – die Energie, mit der du am Ende eines Dungeons den Beute-Würfel öffnest. Darum bringt jeder Twink zusätzliche Beute und Kina. Viele Grenzen gelten aber **pro Server**, also für alle deine Charaktere zusammen. Dieser Guide rechnet durch, wann sich das lohnt, wie viele Charaktere sinnvoll sind und wie du sie spielst, ohne auszubrennen.',
            en: 'An **alt** is another character on your account; your **main** is your primary character. In AION 2 every character has its **own Odyle Energy** – the energy you spend to open the loot cube at the end of a dungeon. That is why every alt brings extra loot and Kina. Many limits, though, count **per server**, i.e. for all your characters together. This guide works out when it pays, how many characters make sense and how to run them without burning out.',
          },
        },
        {
          type: 'stats',
          items: [
            {
              value: '4 + 4',
              label: { de: 'Charakterplätze pro Server', en: 'Character slots per server' },
              note: { de: '4 gratis, jeder weitere 1.000 Quna (die Echtgeld-Währung)', en: '4 free, each further one 1,000 Quna (the paid currency)' },
              tone: 'teal',
            },
            {
              value: '21',
              label: { de: 'Beute-Würfel pro Charakter und Woche', en: 'Loot claims per character per week' },
              note: { de: '840 Odyle-Energie ÷ 40 pro Würfel', en: '840 Odyle Energy ÷ 40 per claim' },
              tone: 'gold',
            },
            {
              value: '84',
              label: { de: 'Conquest-Läufe pro Server mit vollem Kina', en: 'Full-Kina Conquest runs per server' },
              note: { de: 'pro Woche, danach 80 % → 20 % · Transcendence: 56', en: 'per week, then 80% → 20% · Transcendence: 56' },
              tone: 'rose',
            },
            {
              value: { de: '≈6 / ≈4 Std.', en: '≈6 / ≈4 h' },
              label: { de: 'Zeit pro Twink und Woche', en: 'Time per alt per week' },
              note: { de: 'ohne / mit Membership – Schätzung', en: 'without / with Membership – estimate' },
              tone: 'slate',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die Kurzfassung', en: 'The short version' },
          text: {
            de: 'Ohne Membership lohnen sich **bis zu 4 Charaktere auf einem Server** (Main + 3 Twinks) – ab dem 5. zahlt der Server weniger Kina. Mit Membership greift die Kürzung erst nach 8 Charakteren, dann ist **deine Zeit** die Grenze. Gelegenheitsspieler: 1, normale Spieler: 2, Vielspieler: 4 (gratis) bzw. 4–6 (Membership). Twinks immer **auf demselben Server** wie der Main – und als Farm-Charaktere, nicht als zweite Mains.',
            en: 'Without Membership, **up to 4 characters on one server** pay off (main + 3 alts) – from the 5th the server pays less Kina. With Membership the cut only starts after 8 characters, and then **your time** is the limit. Casual players: 1, regular players: 2, hardcore players: 4 (free) or 4–6 (Membership). Always make alts **on the same server** as your main – and run them as farm characters, not as second mains.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Inhalte und Gegenstände stehen hier so, wie sie im englischen Client heißen. Die Währung heißt im globalen Client „Kina“ (in AION 1 und im koreanischen Client „Kinah“). Stand: 19.10.2026, Season 1. Zeiten und Erträge sind ein Modell mit den genannten Annahmen und ändern sich mit Patches.',
            en: 'Content and items are named as in the English client. The global client calls the currency “Kina” (“Kinah” in AION 1 and the Korean client). As of 19 Oct 2026, Season 1. Times and income are a model with the stated assumptions and change with patches.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/farming-power', label: { de: 'Farming & Power: Routen und Wochenplan', en: 'Farming & power: routes and week plan' }, primary: true },
            { href: '#/guides/combat-power', label: { de: 'Höchste Kampfkraft', en: 'Highest Combat Power' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Warum Twinks – und was dagegen spricht', en: 'Why alts – and what speaks against them' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein Twink lohnt sich für das, was **jeder Charakter einzeln** bekommt – Odyle-Energie, Nightmare, Ascension Trial –, nicht für die Inhalte, die sich alle Charaktere eines Servers teilen.',
            en: 'An alt pays for what **every character gets on its own** – Odyle Energy, Nightmare, Ascension Trial – not for the content all characters of a server share.',
          },
        },
        {
          type: 'compare',
          title: { de: 'Was für und was gegen Twinks spricht', en: 'What speaks for and against alts' },
          caption: {
            de: 'Kina-Werte für Tier 2 (Gegenstandsstufe 1.400), Stand Oktober 2026. Die Quellen stehen im Abschnitt „Quellen“.',
            en: 'Kina values for Tier 2 (item level 1,400), as of October 2026. The sources are in the “Sources” section.',
          },
          items: [
            {
              title: { de: 'Dafür', en: 'For' },
              tag: { de: 'was ein Twink bringt', en: 'what an alt adds' },
              tone: 'green',
              points: [
                { kind: 'pro', text: { de: '**Eigene Odyle-Energie:** 21 Beute-Würfel mehr pro Woche, auf Tier 2 ≈5,6 Mio. handelbares Kina – über das Server-Lager zum Main.', en: '**Own Odyle Energy:** 21 more loot claims a week, ≈5.6M tradeable Kina at Tier 2 – sent to the main via Server Storage.' } },
                { kind: 'pro', text: { de: '**Eigene Wochenbelohnungen:** Nightmare (14 Eintritte), Ascension Trial (3), Battleground-Siege (3), 7 Std. Abyss-Zeit pro Ebene, eigene Odyle-Morphs.', en: '**Own weekly rewards:** Nightmare (14 entries), Ascension Trial (3), battleground wins (3), 7 h of Abyss time per layer, own Odyle morphs.' } },
                { kind: 'pro', text: { de: '**Füttert den gemeinsamen Fortschritt:** Haustiere, Pet Genus, Closet-Skins und Server-Titel gelten für alle Charaktere – was der Twink sammelt, hat auch der Main.', en: '**Feeds shared progress:** pets, Pet Genus, Closet skins and server titles count for every character – what the alt collects, the main has too.' } },
                { kind: 'pro', text: { de: '**Eine zweite Rolle:** Ein Heiler oder Tank als Twink findet schneller Gruppen und füllt Lücken in deiner Legion.', en: '**A second role:** a healer or tank alt finds groups faster and fills gaps in your Legion.' } },
                { kind: 'pro', text: { de: '**Einmal-Belohnungen pro Charakter:** Bezirks-Quests, versiegelte Dungeons, Strongholds – ≈+240 Gegenstandsstufe ohne Kina.', en: '**One-time rewards per character:** district quests, sealed dungeons, Strongholds – ≈+240 item level for no Kina.' } },
              ],
              verdict: { de: 'Lohnt sich, sobald der Main seine Woche schafft – als Farm für den Main.', en: 'Worth it once your main’s week is under control – as a farm for the main.' },
            },
            {
              title: { de: 'Dagegen', en: 'Against' },
              tag: { de: 'was ein Twink kostet', en: 'what an alt costs' },
              tone: 'rose',
              points: [
                { kind: 'con', text: { de: '**Zeit:** ≈6 Std. pro Woche und Twink ohne Membership, ≈4 Std. mit (Schätzung) – zusätzlich zum Main.', en: '**Time:** ≈6 h per alt per week without Membership, ≈4 h with it (estimate) – on top of the main.' } },
                { kind: 'con', text: { de: '**Server-Grenzen wachsen nicht mit:** Duty Missions, Daily Dungeon, Shugo-Schlüssel, Dimensional Invasion, Commands, 10 nicht abgeholte Würfel.', en: '**Server limits don’t grow:** Duty Missions, Daily Dungeon, Shugo keys, Dimensional Invasion, Commands, 10 unclaimed cubes.' } },
                { kind: 'con', text: { de: '**Die Server-Kürzung:** Ab dem 85. Conquest-Lauf der Woche zahlen die Würfel nur noch 80 % Kina, dann 60, 40 und 20 %.', en: '**The server cut:** from the 85th Conquest run of the week the cubes pay only 80% Kina, then 60, 40 and 20%.' } },
                { kind: 'con', text: { de: '**Gebundenes bleibt, wo es ist:** gebundenes Kina, angelegte Ausrüstung, Enhance Stones, Daevanion Crystals und Odyle-Energie lassen sich nicht verschicken.', en: '**Bound stays where it is:** bound Kina, equipped gear, Enhance Stones, Daevanion Crystals and Odyle Energy can’t be sent.' } },
                { kind: 'con', text: { de: '**Verteilte Investition:** Jeder Charakter braucht eigene Ausrüstung, Stigmen und Daevanion. Laut koreanischen Testern erreicht selbst ein gut geführter Twink nur ≈70–80 % der Stärke des Mains.', en: '**Spread-thin investment:** every character needs its own gear, Stigmas and Daevanion. According to Korean testers even a well-run alt only reaches ≈70–80% of the main’s power.' } },
                { kind: 'con', text: { de: '**Ausbrennen:** Mit 4 Charakteren läufst du dieselben Dungeons über 80-mal pro Woche.', en: '**Burnout:** with 4 characters you run the same dungeons more than 80 times a week.' } },
              ],
              verdict: { de: 'Jeder Twink kostet feste Zeit – und ab der Server-Kürzung bringt er weniger.', en: 'Every alt costs a fixed amount of time – and past the server cut it earns less.' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Farm-Twink oder zweiter Main?', en: 'Farm alt or second main?' },
          text: {
            de: 'Ein **Farm-Twink** macht nur, was pro Charakter zählt, und bleibt auf dem Stand, den seine Dungeons brauchen (700 oder 1.400). Ein **zweiter Main** bekommt dieselbe Investition wie der Main – das verdoppelt die Kosten für Verzauberung und Daeva Pass und lohnt sich nur, wenn du die zweite Klasse wirklich spielen willst.',
            en: 'A **farm alt** only does what counts per character and stays at the level its dungeons need (700 or 1,400). A **second main** gets the same investment as the main – that doubles the cost of enhancement and Daeva Pass and only pays if you really want to play the second class.',
          },
        },
      ],
    },
    {
      title: { de: 'Was geteilt wird – und was nicht', en: 'What is shared – and what is not' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Es gibt drei Ebenen: den **Account** (nur Dinge, die du „einmal pro Account“ bekommst), den **Server** (alle deine Charaktere auf einem Server) und den **Charakter**. Fast alles, was Twinks interessant macht, hängt am Server.',
            en: 'There are three levels: the **account** (only things you get “once per account”), the **server** (all your characters on one server) and the **character**. Almost everything that makes alts interesting hangs on the server.',
          },
        },
        { type: 'heading', text: { de: 'Geteilt von allen Charakteren eines Servers', en: 'Shared by all characters of a server' } },
        {
          type: 'table',
          head: [{ de: 'Was', en: 'What' }, { de: 'Gilt für', en: 'Applies to' }, { de: 'Was das für Twinks heißt', en: 'What it means for alts' }],
          rows: [
            [
              { de: '**Server-Lager** (Server Storage)', en: '**Server Storage**' },
              { de: 'alle Charaktere des Servers', en: 'all characters of the server' },
              { de: 'Der einzige Weg, Kina und Gegenstände zwischen deinen Charakteren zu verschieben.', en: 'The only way to move Kina and items between your characters.' },
            ],
            [
              { de: '**Membership** (Special Quai Membership, 14,99 US-$ pro 30 Tage)', en: '**Membership** (Special Quai Membership, $14.99 per 30 days)' },
              { de: 'alle Charaktere des Servers, auf dem du sie aktivierst', en: 'all characters of the server where you activate it' },
              { de: 'Eine Membership deckt den ganzen Kader ab – ein Charakter auf einem anderen Server braucht eine eigene.', en: 'One Membership covers the whole roster – a character on another server needs its own.' },
            ],
            [
              { de: '**Closet** (Skins) und sein Sammel-Bonus', en: '**Closet** (skins) and its collection bonus' },
              'Server',
              { de: 'Jeder Skin gibt dauerhaft Werte – egal, welcher Charakter ihn freischaltet.', en: 'Every skin gives permanent stats – no matter which character unlocks it.' },
            ],
            [
              { de: '**Haustiere, Genus Crystals, Genus Insight**', en: '**Pets, Genus Crystals, Genus Insight**' },
              'Server',
              { de: 'Twinks sammeln Haustiere mit; ihre Soul Crystals fließen in den gemeinsamen Pet-Genus-Fortschritt.', en: 'Alts collect pets too; their Soul Crystals feed the shared Pet Genus progress.' },
            ],
            [
              { de: '**Monolith** (Empyrean Traces)', en: '**Monolith** (Empyrean Traces)' },
              { de: 'Server (Sync)', en: 'server (sync)' },
              { de: 'Einmal sammeln, auf den Twinks mit „Sync Empyrean Traces“ übernehmen.', en: 'Collect once, take it over on the alts with “Sync Empyrean Traces”.' },
            ],
            [
              { de: '**Charakterplätze**', en: '**Character slots**' },
              'Server',
              { de: '4 gratis, jeder weitere 1.000 Quna. Gekaufte Plätze bleiben bei einem Server-Transfer zurück.', en: '4 free, each further one 1,000 Quna. Bought slots stay behind on a server transfer.' },
            ],
            [
              { de: '**Server-Titel und Server-Erfolge**', en: '**Server titles and server achievements**' },
              'Server',
              { de: 'NC unterscheidet Charakter- und Server-Titel; welche welche sind, nennt die Ankündigung nicht.', en: 'NC separates character and server titles; the notice does not say which are which.' },
            ],
            [
              { de: '**Tages- und Wochengrenzen:** Duty Missions (5 pro Tag), Daily Dungeon (14 pro Woche), Shugo-Schlüssel (3 pro Tag, bis 12, mit Membership 21), Dimensional Invasion (1 Schlüssel pro Tag, bis 7), Commands (12 + 20), 20 Potential Stones', en: '**Daily and weekly limits:** Duty Missions (5 a day), Daily Dungeon (14 a week), Shugo keys (3 a day, up to 12, 21 with Membership), Dimensional Invasion (1 key a day, up to 7), Commands (12 + 20), 20 Potential Stones' },
              'Server',
              { de: 'Was ein Twink davon nutzt, fehlt dem Main – immer auf dem Main machen.', en: 'Whatever an alt uses of these is missing on the main – always do them on the main.' },
            ],
            [
              { de: '**Würfel-Zähler:** 10 nicht abgeholte Würfel pro Woche, 84 Conquest- und 56 Transcendence-Läufe mit vollem Kina', en: '**Cube counters:** 10 unclaimed cubes a week, 84 Conquest and 56 Transcendence runs at full Kina' },
              'Server',
              { de: 'Bei 0 nicht abgeholten Würfeln kommt kein Charakter des Servers mehr in Conquest oder Transcendence.', en: 'At 0 unclaimed cubes no character of the server can enter Conquest or Transcendence.' },
            ],
            [
              { de: '**Extra-Odyle:** 16 Substance Morphs pro Woche (zusätzlich zu 4 pro Charakter)', en: '**Extra Odyle:** 16 Substance Morphs a week (on top of 4 per character)' },
              'Server',
              { de: 'Die 16 auf dem Main verbrauchen, die eigenen 4 auf jedem Charakter.', en: 'Use the 16 on the main and the own 4 on every character.' },
            ],
            [
              { de: 'Founder’s Pack, Gutscheincodes, Account-Post', en: 'Founder’s Pack, coupon codes, account mail' },
              { de: 'Account – einmal', en: 'account – once' },
              { de: 'Auf dem Charakter abholen, den du behältst. Titel, Skins und andere Pack-Gegenstände gelten seit dem Patch vom 7.10. auch auf anderen Charakteren und Servern.', en: 'Claim it on the character you keep. Since the 7 Oct patch the pack’s titles, skins and other items also work on other characters and servers.' },
            ],
          ],
        },
        { type: 'heading', text: { de: 'Pro Charakter', en: 'Per character' } },
        {
          type: 'table',
          head: [{ de: 'Was', en: 'What' }, { de: 'Was das für Twinks heißt', en: 'What it means for alts' }],
          rows: [
            [{ de: 'Stufe, Skills, Stigmen, Daevanion, Arcana, Pantheon', en: 'Level, skills, Stigmas, Daevanion, Arcana, Pantheon' }, { de: 'Jeder Twink beginnt bei null.', en: 'Every alt starts from zero.' }],
            [{ de: '**Odyle-Energie:** +15 alle 3 Std. (120 pro Tag, 840 pro Woche), Grenze 560 (Membership 840)', en: '**Odyle Energy:** +15 every 3 h (120 a day, 840 a week), cap 560 (Membership 840)' }, { de: 'Der Grund, warum Twinks Kina bringen. Dazu hat jeder Charakter 4 eigene Odyle-Morphs pro Woche.', en: 'The reason alts bring Kina. On top, every character has 4 own Odyle morphs a week.' }],
            [{ de: 'Nightmare (2 pro Tag, bis 14), Ascension Trial (3 pro Woche), Battleground (3 Siege), Arena', en: 'Nightmare (2 a day, up to 14), Ascension Trial (3 a week), battlegrounds (3 wins), Arena' }, { de: 'Bekommt jeder Charakter einzeln.', en: 'Every character gets these on its own.' }],
            [{ de: 'Abyss-Zeit (7 Std. pro Ebene und Woche), Abyss Corridor, Abyss-Punkte (AP), Season-Ranglistenpunkte', en: 'Abyss time (7 h per layer a week), Abyss Corridor, Abyss Points (AP), season rank points' }, { de: 'Jeder Twink farmt und gibt seine eigenen AP aus.', en: 'Every alt farms and spends its own AP.' }],
            [{ de: 'Ausrüstung', en: 'Gear' }, { de: 'Bindet beim Anlegen, Dungeon-Beute schon beim Aufheben; hochgestufte Handwerks-Ausrüstung bindet an den Hersteller.', en: 'Binds when equipped, dungeon loot already on pickup; upcrafted gear binds to the crafter.' }],
            [{ de: 'Gebundenes Kina, Quna, Daeva Pass', en: 'Bound Kina, Quna, Daeva Pass' }, { de: 'Der Daeva Pass gilt nur für den Charakter, der ihn kauft.', en: 'The Daeva Pass only pays the character that buys it.' }],
            [{ de: 'Flügel, Charakter-Titel und Charakter-Erfolge', en: 'Wings, character titles and character achievements' }, { de: 'Muss jeder Charakter selbst verdienen.', en: 'Every character has to earn them itself.' }],
            [{ de: 'Sammel- und Handwerks-Meisterschaft, Sammel-Spezialisierungen', en: 'Gathering and crafting proficiency, gathering specialties' }, { de: 'Jeder Charakter baut 2 der 6 Sammel-Materialien voll aus.', en: 'Every character maxes 2 of the 6 gathering materials.' }],
            [{ de: 'Tagesgrenze von 1 Mio. handelbarem Kina aus Monstern', en: 'Daily cap of 1M tradeable Kina from monsters' }, { de: 'Jeder Charakter hat seine eigene.', en: 'Every character has its own.' }],
            [{ de: 'Einmal-Belohnungen: Bezirks-Quests, versiegelte Dungeons, Strongholds', en: 'One-time rewards: district quests, sealed dungeons, Strongholds' }, { de: 'Gratis-Stärke für jeden neuen Twink.', en: 'Free power for every new alt.' }],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Ein Server = eine Fraktion', en: 'One server, one faction' },
          text: {
            de: 'Elyos und Asmodier spielen immer auf verschiedenen Servern. Ein Twink der anderen Fraktion steht also auf einem anderen Server und teilt **nichts** mit deinem Main: kein Server-Lager, keine Membership, kein Closet, keine Haustiere, keine Charakterplätze. Zusammen kommen die beiden nur über die Gruppensuche für Dungeons, die über Server hinweg (und im PvE sogar über die Fraktionen hinweg) sucht.',
            en: 'Elyos and Asmodians always play on different servers. An alt of the other faction therefore sits on another server and shares **nothing** with your main: no Server Storage, no Membership, no Closet, no pets, no character slots. The two only meet through dungeon party matching, which searches across servers (and in PvE even across factions).',
          },
        },
      ],
    },
    {
      title: { de: 'Was zwischen Charakteren wandern kann', en: 'What can move between characters' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Zwischen deinen Charakteren gibt es genau einen Weg: das **Server-Lager** beim Storage Manager in jeder Siedlung – mit Membership auch von überall über „Remote Storage“. Direkter Handel ist für alle abgeschaltet (ein Schutz gegen Bots), kaufen am Market geht nur mit Membership, und Handel mit Spielern anderer Server wertet NC als Echtgeld-Handel.',
            en: 'There is exactly one way between your characters: **Server Storage** at the Storage Manager in every settlement – with Membership also from anywhere via “Remote Storage”. Direct trading is switched off for everyone (an anti-bot measure), buying on the Market needs Membership, and NC treats trading with players on other servers as real-money trading.',
          },
        },
        {
          type: 'table',
          caption: {
            de: 'Im Zweifel den Tooltip lesen: „Can be placed in Server Storage“ oder „Cannot be placed in Server Storage“.',
            en: 'When in doubt, read the tooltip: “Can be placed in Server Storage” or “Cannot be placed in Server Storage”.',
          },
          head: [{ de: 'Was', en: 'What' }, { de: 'Ins Server-Lager?', en: 'Into Server Storage?' }, { de: 'Hinweis', en: 'Note' }],
          rows: [
            [{ de: '**Handelbares Kina**', en: '**Tradeable Kina**' }, YES, { de: 'Aus Conquest-, Transcendence- und Ludra-Würfeln, von Monstern und aus Market-Verkäufen.', en: 'From Conquest, Transcendence and Ludra cubes, from monsters and from Market sales.' }],
            [{ de: '**Gebundenes Kina**', en: '**Bound Kina**' }, NO, { de: 'Aus Quests, Exploration-Würfeln, Duty Missions und NPC-Verkäufen – auf dem Twink selbst ausgeben.', en: 'From quests, Exploration cubes, Duty Missions and NPC sales – spend it on the alt itself.' }],
            [{ de: 'Erz, Odyle, Refining Stones, Manastones, Soulstones', en: 'Ore, Odyle, Refining Stones, Manastones, Soulstones' }, YES, { de: 'Sammel- und Handwerksmaterial wandert frei.', en: 'Gathering and crafting materials move freely.' }],
            [{ de: 'Tränke, Schriftrollen, Power Shards, Kisk-Steine', en: 'Potions, scrolls, Power Shards, Kisk stones' }, YES, { de: 'Auch viele gebundene, z. B. Battle Enhance Scroll (Bound).', en: 'Many bound ones too, e.g. Battle Enhance Scroll (Bound).' }],
            [{ de: 'Ausrüstung, die noch nicht seelengebunden ist', en: 'Gear that is not soul bound yet' }, YES, { de: 'Z. B. frische Basis-Teile aus dem Handwerk. Anlegen bindet; Dungeon-Beute bindet schon beim Aufheben.', en: 'E.g. fresh crafted base pieces. Equipping binds; dungeon loot binds on pickup.' }],
            [{ de: 'Enhance Stones, Hidden-Cube-Schlüssel', en: 'Enhance Stones, Hidden Cube keys' }, NO, { de: 'Bleiben auf dem Charakter, der sie bekommt.', en: 'Stay on the character that gets them.' }],
            [{ de: 'Odyle-Energie (auch gekaufte), Daevanion Crystals, Wisdom Stones, Gear Change Vouchers', en: 'Odyle Energy (bought too), Daevanion Crystals, Wisdom Stones, Gear Change Vouchers' }, NO, { de: 'Bleiben auf dem Charakter.', en: 'Stay on the character.' }],
            [{ de: 'Resurrection Spiritstones, Soul Codex, Empyrean Traces', en: 'Resurrection Spiritstones, Soul Codex, Empyrean Traces' }, NO, '–'],
            [{ de: 'Skins, Flügel, Haustiere und Titel als Gegenstand', en: 'Skins, wings, pets and titles as items' }, NO, { de: 'Closet und Haustiere teilt der Server ohnehin.', en: 'The server shares the Closet and pets anyway.' }],
            [{ de: 'Quest-Ausrüstung, Spiritforged-Waffe und -Guard', en: 'Quest gear, Spiritforged weapon and guard' }, NO, '–'],
          ],
        },
        { type: 'heading', text: { de: 'So schickst du Kina zum Main', en: 'How to send Kina to the main' } },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Auf dem Twink: zum Storage Manager', en: 'On the alt: go to a Storage Manager' },
              text: { de: 'Alt halten, auf das Personen-Symbol neben der Minikarte klicken, Storage Manager wählen – der Charakter läuft hin. Mit Membership: Remote Storage unten rechts im Cube.', en: 'Hold Alt, click the person icon next to the minimap and pick the Storage Manager – your character walks there. With Membership: Remote Storage at the bottom right of the Cube.' },
            },
            {
              title: { de: 'Auf „Server Storage“ umschalten', en: 'Switch to “Server Storage”' },
              text: { de: 'Das Fenster zeigt zuerst das Charakter-Lager. Gegenstände müssen im Cube (Inventar) liegen – direkt vom Charakter-Lager ins Server-Lager geht nicht.', en: 'The window shows Character Storage first. Items must be in your Cube (inventory) – you can’t move them straight from Character Storage to Server Storage.' },
            },
            {
              title: { de: 'Handelbares Kina einzahlen', en: 'Deposit tradeable Kina' },
              text: { de: 'Nur der handelbare Teil geht hinein; der gebundene bleibt auf dem Twink.', en: 'Only the tradeable part goes in; the bound part stays on the alt.' },
            },
            {
              title: { de: 'Auf dem Main abheben und ausgeben', en: 'Withdraw on the main and spend it' },
              text: { de: 'Am besten noch am selben Abend, in der Reihenfolge aus dem Guide „Höchste Kampfkraft“.', en: 'Best the same evening, in the order from the “Highest Combat Power” guide.' },
            },
            {
              title: { de: 'Vor einem Server-Transfer: Server-Lager leeren', en: 'Before a server transfer: empty Server Storage' },
              text: { de: 'Server-Lager und das Kina darin bleiben auf dem alten Server.', en: 'Server Storage and the Kina in it stay on the old server.' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Gebundenes Kina in handelbares verwandeln', en: 'Turn bound Kina into tradeable Kina' },
          text: {
            de: 'NPC-Läden nehmen „Kina (All)“ und ziehen **zuerst das gebundene** ab. Das gebundene Kina eines Twinks bezahlt also seine Verzauberungs-Gebühren, die 50.000 Kina jedes Odyle-Morphs und – mit Membership – Odyle-Energie bei den Wind Breeze Merchants (100.000 Kina pro 40 Energie). 40 Energie sind ein Würfel mehr, auf Tier 2 bis zu 300.000 **handelbares** Kina: Aus 100.000 gebundenem wird bis zu dreimal so viel handelbares.',
            en: 'NPC shops take “Kina (All)” and spend **bound Kina first**. So an alt’s bound Kina pays its enhancement fees, the 50,000 Kina of every Odyle morph and – with Membership – Odyle Energy at the Wind Breeze Merchants (100,000 Kina per 40 energy). 40 energy is one more claim, worth up to 300,000 **tradeable** Kina at Tier 2: 100,000 bound becomes up to three times as much tradeable Kina.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Der umgekehrte Weg', en: 'The reverse route' },
          text: {
            de: 'Ein Guide (Raid Relay) beschreibt, wie ein Twink mit seinem gebundenen Kina und seinen Enhance Stones ein Teil für den Main verzaubert und es zurückschickt. Das geht nur mit Ausrüstung, die noch **nicht seelengebunden** ist – angelegte Teile binden. Prüfe im Tooltip, ob das Teil nach dem Verzaubern noch ins Server-Lager darf, bevor du Material hineinsteckst.',
            en: 'One guide (Raid Relay) describes an alt enhancing a piece for the main with its own bound Kina and Enhance Stones and sending it back. That only works with gear that is **not soul bound** yet – equipped pieces bind. Check in the tooltip that the piece can still go into Server Storage after enhancing before you put materials into it.',
          },
        },
      ],
    },
    {
      title: { de: 'Was ein Twink an Zeit kostet', en: 'What an alt costs in time' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Was ein Twink pro Woche kostet, hängt fast nur an seinen Inhalten pro Charakter. Gemessen ist nur die Dauer eines Conquest-Laufs (Raid Relay: 8 Min. auf Tier 1, 10 Min. auf Tier 2, ohne Warteschlange und Wege). Alles andere sind Schätzungen wie im Guide „Farming & Power“.',
            en: 'What an alt costs per week depends almost only on its per-character content. Only the length of a Conquest run is measured (Raid Relay: 8 min at Tier 1, 10 min at Tier 2, without queues and travel). Everything else is an estimate as in the “Farming & power” guide.',
          },
        },
        {
          type: 'shares',
          title: { de: 'Wohin die Woche eines Twinks geht (ohne Membership)', en: 'Where an alt’s week goes (no Membership)' },
          caption: {
            de: 'Schätzung für einen Twink auf Tier 2 in 2 Sessions pro Woche: zusammen ≈360 Min. = 6 Std. Mit Membership braucht derselbe Twink nur ≈11 statt 21 Conquest-Läufe (2 Würfel pro Lauf) und eine statt zwei Sessions: ≈245 Min. ≈ 4 Std. Conquest-Laufzeit gemessen von Raid Relay, der Rest geschätzt.',
            en: 'Estimate for an alt at Tier 2 in 2 sessions a week: ≈360 min = 6 h in total. With Membership the same alt needs only ≈11 instead of 21 Conquest runs (2 claims per run) and one session instead of two: ≈245 min ≈ 4 h. Conquest run time measured by Raid Relay, the rest estimated.',
          },
          unit: { de: 'Min.', en: 'min' },
          items: [
            { label: { de: 'Conquest-Würfel', en: 'Conquest claims' }, value: 210, note: { de: '21 Läufe × 10 Min. (gemessen)', en: '21 runs × 10 min (measured)' }, tone: 'gold' },
            { label: 'Nightmare', value: 70, note: { de: '14 Eintritte × ≈5 Min.', en: '14 entries × ≈5 min' }, tone: 'violet' },
            { label: 'Ascension Trial', value: 30, note: { de: '3 × ≈10 Min.', en: '3 × ≈10 min' }, tone: 'blue' },
            { label: { de: 'Supply Requests, Quests', en: 'Supply Requests, quests' }, value: 20, note: { de: 'Schätzung', en: 'estimate' }, tone: 'teal' },
            { label: { de: 'Einloggen, Lager, Reparatur, Wege', en: 'Logins, storage, repairs, travel' }, value: 30, note: { de: 'Schätzung', en: 'estimate' }, tone: 'slate' },
          ],
        },
        { type: 'heading', text: { de: 'Zeit pro Woche nach Anzahl der Charaktere', en: 'Time per week by number of characters' } },
        {
          type: 'table',
          caption: {
            de: 'Schätzung. Main: dieselben Inhalte wie ein Twink plus die Server-Inhalte (Duty Missions ≈15 Min. pro Tag, Daily Dungeon ≈10 Min., Shugo Festa und Dimensional Invasion ≈5 Min.) = ≈9,5 bzw. ≈7,6 Std. Jeder Twink +6,0 bzw. +4,1 Std. Abyss, Raids, PvP und Market kommen obendrauf.',
            en: 'Estimate. Main: the same content as an alt plus the server content (Duty Missions ≈15 min a day, Daily Dungeon ≈10 min, Shugo Festa and Dimensional Invasion ≈5 min) = ≈9.5 or ≈7.6 h. Every alt +6.0 or +4.1 h. Abyss, raids, PvP and the Market come on top.',
          },
          head: [{ de: 'Charaktere', en: 'Characters' }, { de: 'Ohne Membership', en: 'Without Membership' }, { de: '≈ pro Tag', en: '≈ per day' }, { de: 'Mit Membership', en: 'With Membership' }, { de: '≈ pro Tag', en: '≈ per day' }],
          rows: [
            [{ de: '1 (nur Main)', en: '1 (main only)' }, num('9.5 h'), num('1.4 h'), num('7.6 h'), num('1.1 h')],
            ['2', num('15.5 h'), num('2.2 h'), num('11.7 h'), num('1.7 h')],
            ['3', num('21.5 h'), num('3.1 h'), num('15.8 h'), num('2.3 h')],
            ['4', num('27.5 h'), num('3.9 h'), num('19.9 h'), num('2.8 h')],
            ['6', num('39.5 h'), num('5.6 h'), num('28.1 h'), num('4.0 h')],
            ['8', num('51.5 h'), num('7.4 h'), num('36.3 h'), num('5.2 h')],
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Zum Vergleich: games.gg schätzt 10–15 Std. für den Main allein, 15–20 mit einem Twink, 20–25 mit zwei und 25+ mit drei. Raid Relay rechnet nur die Kina-Routine (Würfel plus Morphs) und kommt auf 6,8 / 11,0 / 15,2 / 19,3 Std. ohne und 3,5 / 5,7 / 7,8 / 10,0 Std. mit Membership.',
            en: 'For comparison: games.gg estimates 10–15 h for the main alone, 15–20 with one alt, 20–25 with two and 25+ with three. Raid Relay counts only the Kina routine (cubes plus morphs) and gets 6.8 / 11.0 / 15.2 / 19.3 h without and 3.5 / 5.7 / 7.8 / 10.0 h with Membership.',
          },
        },
        { type: 'heading', text: { de: 'Einmalig: der Aufbau eines neuen Twinks', en: 'One-time: setting up a new alt' } },
        {
          type: 'facts',
          items: [
            { label: { de: 'Stufe 1 → 45', en: 'Level 1 → 45' }, value: { de: '≈5 Std. 14 Min. in unserem Speedrun (nur goldene Missionen); ≈10 Std. für die ganze Story laut games.gg (koreanischer Client)', en: '≈5 h 14 min in our speedrun (golden missions only); ≈10 h for the whole story according to games.gg (Korean client)' } },
            { label: { de: 'Einmal-Belohnungen bei 45', en: 'One-time rewards at 45' }, value: { de: '≈+240 Gegenstandsstufe für 0 Kina – rechne mit ≈3–4 Std. (Schätzung)', en: '≈+240 item level for 0 Kina – plan ≈3–4 h (estimate)' } },
            { label: { de: 'Bis Gegenstandsstufe 1.000', en: 'To item level 1,000' }, value: { de: 'unter 2 Mio. Kina: Gürtel und Amulett hoch, alles +5, Waffe +10', en: 'under 2M Kina: belt and amulet up, everything +5, weapon +10' } },
            { label: { de: 'Bis 1.400 (Tier 2)', en: 'To 1,400 (Tier 2)' }, value: { de: '+≈3,2 Mio. Kina für Gürtel und Amulett auf Unique, dazu Teile aus Draupnir und dem Handwerk', en: '+≈3.2M Kina for belt and amulet to Unique, plus pieces from Draupnir and crafting' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Seltener einloggen', en: 'Log in less often' },
          text: {
            de: 'Odyle-Energie läuft bei 560 voll (nach 4 Tagen 16 Std.), mit Membership erst bei 840 (nach genau 7 Tagen). Nightmare spart bis zu 14 Eintritte an. Ein Twink braucht also nur **2 Sessions pro Woche** – mit Membership **eine**. Die Expedition-Quest (empfohlen ab Stufe 22) startet die Energie: früh machen, dann wartet bei Stufe 45 schon ein voller Tank.',
            en: 'Odyle Energy caps at 560 (after 4 days 16 h), with Membership only at 840 (after exactly 7 days). Nightmare banks up to 14 entries. So an alt needs only **2 sessions a week** – with Membership **one**. The Expedition quest (recommended from level 22) starts the energy: do it early, and a full tank is waiting at level 45.',
          },
        },
      ],
    },
    {
      title: { de: 'Der Ertrag: Kina pro Charakter', en: 'The return: Kina per character' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der Server zählt die Conquest-Läufe **aller** deiner Charaktere pro Woche. Die ersten **84** zahlen das volle Würfel-Kina, Lauf 85–105 nur 80 %, 106–126 60 %, 127–147 40 %, danach 20 %. Transcendence zählt getrennt: 56 voll, dann 80 % bis Lauf 70, 60 % bis 84, 40 % bis 98, danach 20 %. Gekürzt wird nur das Kina, nicht Ausrüstung oder Material. Wichtig: Gezählt werden **Läufe, nicht Würfel** – mit Membership öffnest du in einem Lauf zwei Würfel (80 Energie), also braucht jeder Charakter nur ≈10,5 statt 21 Läufe.',
            en: 'The server counts the Conquest runs of **all** your characters per week. The first **84** pay full cube Kina, runs 85–105 only 80%, 106–126 60%, 127–147 40%, after that 20%. Transcendence counts separately: 56 full, then 80% up to run 70, 60% up to 84, 40% up to 98, then 20%. Only the Kina is cut, not gear or materials. Important: it counts **runs, not claims** – with Membership you open two cubes in one run (80 energy), so every character needs only ≈10.5 instead of 21 runs.',
          },
        },
        {
          type: 'line',
          title: { de: 'Würfel-Kina pro Woche nach Anzahl der Charaktere', en: 'Cube Kina per week by number of characters' },
          caption: {
            de: 'Modell: Jeder Charakter steht auf Tier 2 (Gegenstandsstufe 1.400) und öffnet 21 Würfel pro Woche – 14 × 300.000 + 7 × 200.000 = 5,6 Mio. handelbares Kina (Würfelwerte: Fextralife, aion2maps; 14 Würfel auf dem höchsten Tier: AION2TIERLIST). Kürzung pro Server: aion2maps, Raid Relay. Ohne Morphs und gekaufte Energie – sie bringen mehr Würfel, erreichen die Kürzung aber auch früher. Gestrichelt: Schätzung, wenn Twinks ab Gegenstandsstufe 1.600 genug Würfel in Transcendence holen (eigener Topf von 56 Läufen). Der Guide „Farming & Power“ rechnet nach Raid Relay alle 21 Würfel zu 300.000 (≈6,3 Mio.) – stimmt das, liegen alle Werte hier rund 12 % höher.',
            en: 'Model: every character is at Tier 2 (item level 1,400) and opens 21 cubes a week – 14 × 300,000 + 7 × 200,000 = 5.6M tradeable Kina (cube values: Fextralife, aion2maps; 14 claims at the top tier: AION2TIERLIST). Cut per server: aion2maps, Raid Relay. Without morphs and bought energy – they add claims but also reach the cut sooner. Dashed: estimate if alts at item level 1,600+ take enough claims in Transcendence (its own pool of 56 runs). The “Farming & power” guide follows Raid Relay and counts all 21 claims at 300,000 (≈6.3M) – if that holds, every value here is about 12% higher.',
          },
          x: { label: { de: 'Charaktere auf dem Server', en: 'Characters on the server' }, ticks: ['1', '2', '3', '4', '5', '6', '7', '8'] },
          y: { label: { de: 'Handelbares Kina pro Woche (Mio.)', en: 'Tradeable Kina per week (millions)' }, min: 0 },
          series: [
            { label: { de: 'Mit Membership', en: 'With Membership' }, values: [5.6, 11.2, 16.8, 22.4, 28, 33.6, 39.2, 44.8], tone: 'gold' },
            { label: { de: 'Ohne Membership', en: 'Without Membership' }, values: [5.6, 11.2, 16.8, 22.4, 26.9, 30.2, 32.5, 33.6], tone: 'blue' },
            { label: { de: 'Ohne, mit Transcendence (Schätzung)', en: 'Without, with Transcendence (estimate)' }, values: [5.6, 11.2, 16.8, 22.4, 28, 33.6, 38.8, 43.3], tone: 'teal', dashed: true },
          ],
        },
        {
          type: 'line',
          title: { de: 'Was der hinzugefügte Charakter pro Stunde bringt', en: 'What the added character earns per hour' },
          caption: {
            de: 'Handelbares Würfel-Kina des hinzugefügten Charakters geteilt durch seine Zeit (≈6,0 Std. ohne, ≈4,1 Std. mit Membership – siehe „Was ein Twink an Zeit kostet“). Der Main fehlt, weil seine Stunden auch die Server-Inhalte kaufen. Ohne Membership bringt jeder Charakter ab dem 5. weniger für dieselbe Zeit; mit Membership bleibt die Linie bis 8 flach – dort ist deine Zeit die Grenze. Modell, Annahmen wie oben.',
            en: 'Tradeable cube Kina of the added character divided by its time (≈6.0 h without, ≈4.1 h with Membership – see “What an alt costs in time”). The main is left out because its hours also buy the server content. Without Membership every character from the 5th earns less for the same time; with Membership the line stays flat up to 8 – there your time is the limit. Model, assumptions as above.',
          },
          x: {
            label: { de: 'Hinzugefügter Charakter', en: 'Added character' },
            ticks: [
              { de: '2.', en: '2nd' }, { de: '3.', en: '3rd' }, { de: '4.', en: '4th' }, { de: '5.', en: '5th' },
              { de: '6.', en: '6th' }, { de: '7.', en: '7th' }, { de: '8.', en: '8th' },
            ],
          },
          y: { label: { de: 'Tausend Kina pro Stunde', en: 'Thousand Kina per hour' }, min: 0 },
          series: [
            { label: { de: 'Mit Membership', en: 'With Membership' }, values: [1371, 1371, 1371, 1371, 1371, 1371, 1371], tone: 'gold' },
            { label: { de: 'Ohne Membership', en: 'Without Membership' }, values: [933, 933, 933, 747, 560, 373, 187], tone: 'blue' },
          ],
        },
        {
          type: 'stats',
          items: [
            { value: '4', label: { de: 'Charaktere ohne Membership', en: 'characters without Membership' }, note: { de: '4 × 21 = 84 Läufe – der 5. bekommt nur noch 80 %', en: '4 × 21 = 84 runs – the 5th gets only 80%' }, tone: 'blue' },
            { value: '8', label: { de: 'Charaktere mit Membership', en: 'characters with Membership' }, note: { de: '8 × 10,5 = 84 Läufe – alle mit vollem Kina', en: '8 × 10.5 = 84 runs – all at full Kina' }, tone: 'gold' },
            { value: '≈6–7', label: { de: 'ohne Membership, mit Transcendence', en: 'without Membership, with Transcendence' }, note: { de: 'wenn Twinks ab 1.600 einen Teil der Würfel in Transcendence holen (Schätzung)', en: 'if alts at 1,600+ take part of their claims in Transcendence (estimate)' }, tone: 'teal' },
          ],
        },
        {
          type: 'text',
          text: {
            de: '**Mehr Würfel pro Charakter:** Substance Morph macht Odyle-Energie (25 Odyle, 5 Fine Odyle, 1 Pure Odyle und 50.000 Kina für 40 Energie; 4 pro Charakter plus 16 pro Server und Woche). Mit Membership verkaufen die Wind Breeze Merchants 40 Energie für 100.000 Kina – normal 4 pro Charakter plus 16 pro Server, **während der Transfer-Phase bis zum 28.10. 20 pro Charakter ohne Server-Grenze**. Jeder Zusatz-Würfel ist auf Tier 2 bis zu 300.000 Kina wert, zählt aber ohne Membership auch als Lauf für die Kürzung.',
            en: '**More claims per character:** Substance Morph makes Odyle Energy (25 Odyle, 5 Fine Odyle, 1 Pure Odyle and 50,000 Kina for 40 energy; 4 per character plus 16 per server a week). With Membership the Wind Breeze Merchants sell 40 energy for 100,000 Kina – normally 4 per character plus 16 per server, **during the transfer period until 28 Oct 20 per character with no server limit**. Every extra claim is worth up to 300,000 Kina at Tier 2, but without Membership it also counts as a run toward the cut.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Tagesgrenze für handelbares Kina', en: 'Daily cap on tradeable Kina' },
          text: {
            de: 'Laut aion2maps hat jeder Charakter auf Global eine Grenze von 1 Mio. handelbarem Kina pro Tag; danach lassen normale Monster nichts mehr fallen. Auf dem asiatischen Client stoppt diese Grenze auch das Kina aus Expeditionen. Ob sie auf Global auch für Würfel gilt, ist nicht belegt – steigt dein handelbares Kina nach ein paar Würfeln am selben Tag nicht mehr, verteile die Würfel auf mehr Tage.',
            en: 'According to aion2maps every character on Global has a cap of 1M tradeable Kina a day; past it, normal monsters stop dropping loot. On the Asian client the same cap also stops Expedition Kina. Whether it covers cube Kina on Global is not confirmed – if your tradeable Kina stops rising after a few claims on one day, spread the claims over more days.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'Würfelwerte und Odyle-Plan im Guide „Farming & Power“', en: 'Cube values and Odyle plan in “Farming & power”' } }] },
      ],
    },
    {
      title: { de: 'Wie viele Charaktere sich lohnen', en: 'How many characters are worth it' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Drei Dinge begrenzen die Zahl deiner Charaktere: **deine Zeit** (≈6 bzw. ≈4 Std. pro Twink und Woche), **die Server-Kürzung** (84 Läufe) und **deine Lust** – derselbe Dungeon 80-mal pro Woche brennt aus. Je nach Spielertyp ergibt das:',
            en: 'Three things limit the number of your characters: **your time** (≈6 or ≈4 h per alt per week), **the server cut** (84 runs) and **your motivation** – the same dungeon 80 times a week burns you out. Depending on your player type this gives:',
          },
        },
        {
          type: 'compare',
          title: { de: 'Wie viele Charaktere für welchen Spielertyp', en: 'How many characters for which player type' },
          caption: {
            de: 'Stunden aus dem Zeitmodell, Kina aus dem Ertragsmodell oben (Tier 2, nur Würfel). Spielzeit pro Woche ist eine grobe Einordnung.',
            en: 'Hours from the time model, Kina from the income model above (Tier 2, cubes only). Playtime per week is a rough guide.',
          },
          items: [
            {
              title: { de: 'Gelegenheitsspieler', en: 'Casual' },
              tag: { de: '≈5–8 Std./Woche', en: '≈5–8 h/week' },
              tone: 'slate',
              points: [
                { kind: 'pro', text: { de: 'Der Main allein öffnet auf Tier 2 schon 21 Würfel (≈5,6 Mio.) und macht alle Server-Inhalte.', en: 'The main alone already opens 21 cubes at Tier 2 (≈5.6M) and does all the server content.' } },
                { kind: 'con', text: { de: 'Ein Twink kostet ≈6 Std. pro Woche – fast deine ganze Spielzeit noch einmal.', en: 'One alt costs ≈6 h a week – almost your whole playtime again.' } },
                { text: { de: 'Neugierig auf eine zweite Klasse? Auf 45 bringen, Einmal-Belohnungen holen, nur spielen, wenn der Main fertig ist.', en: 'Curious about a second class? Take it to 45, collect the one-time rewards, play it only when the main is done.' } },
              ],
              verdict: { de: '**1 Charakter.** Ein zweiter erst, wenn die Woche des Mains deutlich weniger Zeit braucht, als du hast.', en: '**1 character.** A second one only when the main’s week takes clearly less time than you have.' },
            },
            {
              title: { de: 'Normaler Spieler', en: 'Regular' },
              tag: { de: '≈10–15 Std./Woche', en: '≈10–15 h/week' },
              tone: 'blue',
              points: [
                { kind: 'pro', text: { de: 'Main + 1 Twink: ≈15,5 Std. ohne, ≈11,7 Std. mit Membership – das passt.', en: 'Main + 1 alt: ≈15.5 h without, ≈11.7 h with Membership – that fits.' } },
                { kind: 'pro', text: { de: 'Verdoppelt das Würfel-Kina auf ≈11,2 Mio. – der Main kommt schneller voran.', en: 'Doubles the cube Kina to ≈11.2M – the main progresses faster.' } },
                { kind: 'con', text: { de: 'Ein dritter Charakter bringt dich ohne Membership auf ≈21,5 Std.', en: 'A third character takes you to ≈21.5 h without Membership.' } },
              ],
              verdict: { de: '**2 Charaktere** (Main + 1). Mit Membership passen 3 in ≈16 Std.', en: '**2 characters** (main + 1). With Membership 3 fit into ≈16 h.' },
            },
            {
              title: { de: 'Vielspieler', en: 'Hardcore' },
              tag: { de: '20+ Std./Woche', en: '20+ h/week' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Ohne Membership halten 4 Charaktere das volle Kina (4 × 21 = 84 Läufe): ≈22,4 Mio. pro Woche.', en: 'Without Membership 4 characters keep full Kina (4 × 21 = 84 runs): ≈22.4M a week.' } },
                { kind: 'pro', text: { de: 'Mit Membership bis zu 8 mit vollem Kina (≈44,8 Mio.) – aber ≈36 Std. pro Woche.', en: 'With Membership up to 8 at full Kina (≈44.8M) – but ≈36 h a week.' } },
                { kind: 'con', text: { de: 'Plätze 5–8 kosten je 1.000 Quna; ohne Membership bringen sie nur noch 80 % bis 20 %.', en: 'Slots 5–8 cost 1,000 Quna each; without Membership they earn only 80% down to 20%.' } },
                { kind: 'con', text: { de: 'Ausbrennen: dieselben Dungeons 80- bis 90-mal pro Woche.', en: 'Burnout: the same dungeons 80 to 90 times a week.' } },
              ],
              verdict: { de: '**4 Charaktere** ohne Membership; mit Membership **4–6**, 8 nur, wenn du wirklich 35+ Std. spielst.', en: '**4 characters** without Membership; with Membership **4–6**, 8 only if you really play 35+ h.' },
            },
            {
              title: { de: 'Handwerker und Market-Spieler', en: 'Crafter and market player' },
              tag: 'Membership',
              tone: 'green',
              points: [
                { kind: 'pro', text: { de: 'Jeder Charakter baut 2 der 6 Sammel-Spezialisierungen aus – 3 Charaktere decken alle sechs ab.', en: 'Every character maxes 2 of the 6 gathering specialties – 3 characters cover all six.' } },
                { kind: 'pro', text: { de: 'Das handelbare Kina der Twinks kauft Material am Market; Material wandert frei über das Server-Lager.', en: 'The alts’ tradeable Kina buys materials on the Market; materials move freely through Server Storage.' } },
                { kind: 'con', text: { de: 'Kaufen am Market nur mit Membership; Verkaufen kostet 12 % (2 % Einstellgebühr + 10 % Steuer).', en: 'Buying on the Market needs Membership; selling costs 12% (2% listing fee + 10% tax).' } },
                { kind: 'con', text: { de: 'Hochgestufte Ausrüstung bindet an den Hersteller – der Main muss seine Dragon-Lord-Kette selbst herstellen.', en: 'Upcrafted gear binds to the crafter – the main has to craft its own Dragon Lord chain.' } },
              ],
              verdict: { de: '**3 Charaktere + Membership.** Der Main stellt seine eigene Kette her, die Twinks sammeln und farmen Kina.', en: '**3 characters + Membership.** The main crafts its own chain, the alts gather and farm Kina.' },
            },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Membership ändert die Rechnung am stärksten:** 14,99 US-$ pro 30 Tage und Server, gilt für alle Charaktere dort, halbiert die Läufe (zwei Würfel pro Lauf) und schiebt die Kürzung von 4 auf 8 Charaktere. Wer Twinks spielt, spart damit ≈2 Std. pro Twink und Woche.',
              en: '**Membership changes the math the most:** $14.99 per 30 days and server, covers every character there, halves the runs (two claims per run) and moves the cut from 4 to 8 characters. If you play alts, it saves ≈2 h per alt per week.',
            },
            {
              de: '**Plätze 5–8 nur mit Membership kaufen:** Jeder kostet 1.000 Quna; ohne Membership zahlt der 5. Charakter nur noch 80 % Kina, der 8. nur 20 %.',
              en: '**Buy slots 5–8 only with Membership:** each costs 1,000 Quna; without Membership the 5th character earns only 80% Kina, the 8th only 20%.',
            },
            {
              de: '**Einen Twink nach dem anderen:** erst, wenn der vorige auf Tier 2 (1.400) steht und deine Woche noch Luft hat. Alle Plätze auf einmal füllen heißt: vier halbe Charaktere statt zwei fertige.',
              en: '**One alt at a time:** only when the previous one is at Tier 2 (1,400) and your week still has room. Filling every slot at once means four half-built characters instead of two finished ones.',
            },
            {
              de: '**Die Rolle zählt mehr als die Zahl:** Ist dein Main ein Schadensverursacher, ist ein Heiler oder Tank als erster Twink die bessere Wahl – solche Klassen finden laut games.gg leichter eine Gruppe, und ein zweiter Schadensverursacher bringt deiner Legion wenig Neues.',
              en: '**The role matters more than the number:** if your main is a damage dealer, a healer or tank is the better first alt – according to games.gg those classes find groups more easily, and a second damage dealer adds little that is new to your Legion.',
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Worin du investierst – und worin nie', en: 'What to invest in – and what never' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein Twink hat eine Aufgabe: die **Tore** so billig wie möglich erreichen – 700 (Conquest Tier 1), 1.000 (Abyss und Ascension Trial), 1.400 (Conquest Tier 2), 1.600 (Transcendence). Die Tore prüfen die Gegenstandsstufe, also kaufst du die **billigste Gegenstandsstufe zuerst**. Die Gegenstandsstufe ist eine Summe: die Stufe jedes Teils, +1 pro Verzauberungsstufe, +1 pro ausgegebenem Daevanion Crystal, +1 bis +4 pro Manastone-Zeile und die Arcana. Flügel, Haustiere und Titel zählen nicht.',
            en: 'An alt has one job: reach the **gates** as cheaply as possible – 700 (Conquest Tier 1), 1,000 (Abyss and Ascension Trial), 1,400 (Conquest Tier 2), 1,600 (Transcendence). The gates check item level, so you buy the **cheapest item level first**. Item level is a sum: each piece’s own level, +1 per enhancement level, +1 per Daevanion Crystal spent, +1 to +4 per manastone line and the Arcana. Wings, pets and titles don’t count.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Gegenstandsstufe pro 1 Mio. Kina', en: 'Item level per 1M Kina' },
          caption: {
            de: 'Wie viel Gegenstandsstufe jeder Schritt für 1 Mio. Kina bringt, billigster zuerst (aion2maps, aus den Client-Daten). Gratis und darum ganz vorne: Daevanion Crystals aus Quests (+1 pro Crystal) und zwei Clash Runes auf +1 (+80). Gold: auf jedem Twink; Blau: für den Schritt auf 1.400; Türkis: nur für einen Twink, der Tier 3 farmen soll; Rot: nie auf einem Twink.',
            en: 'How much item level each step gives for 1M Kina, cheapest first (aion2maps, from the client data). Free and therefore first of all: Daevanion Crystals from quests (+1 per crystal) and two Clash Runes to +1 (+80). Gold: on every alt; blue: for the step to 1,400; teal: only for an alt meant to farm Tier 3; rose: never on an alt.',
          },
          items: [
            { label: { de: 'Noble Belt (Rare) auf +10, dann Epic', en: 'Noble Belt (Rare) to +10, then Epic' }, value: 100, display: '≈100', note: { de: '232.000 Kina + 10 Schriftrollen', en: '232,000 Kina + 10 scrolls' }, tone: 'gold' },
            { label: { de: 'Epic-Teil (Stufe 38) +0 → +5', en: 'Epic piece (level 38) +0 → +5' }, value: 70, display: '≈70', note: { de: '69.850 Kina für +5', en: '69,850 Kina for +5' }, tone: 'gold' },
            { label: { de: 'Unique-Teil (Stufe 54) +0 → +5', en: 'Unique piece (level 54) +0 → +5' }, value: 50, display: '≈50', note: { de: '99.150 Kina für +5', en: '99,150 Kina for +5' }, tone: 'gold' },
            { label: { de: 'Epic-Teil (Stufe 38) +5 → +10', en: 'Epic piece (level 38) +5 → +10' }, value: 18, display: '≈18', note: { de: '274.000 Kina für +5', en: '274,000 Kina for +5' }, tone: 'blue' },
            { label: { de: 'Gürtel/Amulett Epic +10, dann Unique', en: 'Belt/amulet Epic +10, then Unique' }, value: 18, display: '≈18', note: { de: '1.579.000 Kina für +10, dann +19', en: '1,579,000 Kina for +10, then +19' }, tone: 'blue' },
            { label: { de: 'Unique-Teil (Stufe 86) +0 → +10', en: 'Unique piece (level 86) +0 → +10' }, value: 13, display: '≈13', note: { de: '775.100 Kina für +10', en: '775,100 Kina for +10' }, tone: 'teal' },
            { label: { de: 'Amp Stufe 1 (Unique auf +15)', en: 'Amp stage 1 (Unique at +15)' }, value: 6, display: '≈6', note: { de: '≈880.000 Kina für +5', en: '≈880,000 Kina for +5' }, tone: 'rose' },
            { label: { de: 'Gürtel/Amulett Unique +0 → +10', en: 'Belt/amulet Unique +0 → +10' }, value: 2, display: '≈2', note: { de: '5.026.000 Kina für +10', en: '5,026,000 Kina for +10' }, tone: 'rose' },
            { label: { de: 'Amp Stufen 2 und 3', en: 'Amp stages 2 and 3' }, value: 2, display: '≈2', note: { de: '≈5,4 Mio. Kina für +10', en: '≈5.4M Kina for +10' }, tone: 'rose' },
            { label: { de: 'Unique-Teil (Stufe 86) +10 → +15', en: 'Unique piece (level 86) +10 → +15' }, value: 0.4, display: '< 0,5', note: { de: '≈11,9 Mio. Kina für +5', en: '≈11.9M Kina for +5' }, tone: 'rose' },
          ],
        },
        {
          type: 'table',
          head: ['', { de: 'Rein in den Twink', en: 'Put into the alt' }, { de: 'Nie in den Twink', en: 'Never into the alt' }],
          rows: [
            [
              { de: '**Ausrüstung**', en: '**Gear**' },
              { de: 'Was droppt, die Picks aus Conquest (auf Tier 2 alle 21 Würfel), Gürtel und Amulett die Ränge hoch', en: 'What drops, the Conquest picks (every 21 claims at Tier 2), belt and amulet up the grades' },
              { de: 'Die Dragon-Lord-Kette aus dem Handwerk – Meisterschaft und Material lohnen nur auf dem Charakter, der sie trägt', en: 'The crafted Dragon Lord chain – proficiency and materials only pay on the character who wears it' },
            ],
            [
              { de: '**Verzaubern**', en: '**Enhancement**' },
              { de: 'Alles auf +5, Waffe und Guard auf +10 – bis +10 gelingt jede Stufe', en: 'Everything to +5, weapon and guard to +10 – every step up to +10 succeeds' },
              { de: '+11 bis +15 und Amp: unter 0,5 bis 6 Gegenstandsstufen pro Mio. Kina', en: '+11 to +15 and Amp: below 0.5 to 6 item levels per million Kina' },
            ],
            [
              { de: '**Arcana**', en: '**Arcana**' },
              { de: 'Nur, was in Transcendence droppt (ab 1.600); verzaubern kann nicht scheitern', en: 'Only what drops in Transcendence (from 1,600); enhancing can’t fail' },
              { de: 'Arcana kaufen oder hochtreiben, solange der Twink Tier 2 farmt', en: 'Buying Arcana or pushing them while the alt farms Tier 2' },
            ],
            [
              'Daevanion',
              { de: 'Alle Crystals aus Quests und versiegelten Dungeons sofort ausgeben (+1 pro Crystal); Umskillen ist fast gratis', en: 'Spend every crystal from quests and sealed dungeons right away (+1 per crystal); respecs are nearly free' },
              '–',
            ],
            [
              { de: '**Stigmen**', en: '**Stigmas**' },
              { de: 'Die Stigmen, die der Twink zum Farmen braucht – mit eigenen Shards aus Nightmare, Shugo Festa und Abyss-Shop', en: 'The Stigmas the alt needs to farm – with its own shards from Nightmare, Shugo Festa and the Abyss shop' },
              { de: 'Shards für Stigmen, die nur im Endgame zählen', en: 'Shards for Stigmas that only matter in the endgame' },
            ],
            [
              { de: '**Steine**', en: '**Stones**' },
              { de: 'Billige Manastones und Soulstones aus dem Abyss-Shop (1.000 bzw. 2.000 AP)', en: 'Cheap manastones and soulstones from the Abyss shop (1,000 or 2,000 AP)' },
              { de: 'Gute Rollen auf Teile, die du ersetzt – Steine überleben keinen Transfer', en: 'Good rolls on pieces you will replace – stones don’t survive a transfer' },
            ],
            [
              { de: '**Runen**', en: '**Runes**' },
              { de: 'Zwei Clash Runes aus den Bezirks-Quests auf +1 (gelingt immer)', en: 'Two Clash Runes from the district quests to +1 (always succeeds)' },
              { de: 'Clash Runes über +1: Ab dem Versuch auf +2 zerstört ein Fehlschlag die Rune', en: 'Clash Runes past +1: from the attempt at +2 a failure destroys the rune' },
            ],
            [
              { de: '**Geld**', en: '**Money**' },
              { de: 'Das gebundene Kina des Twinks – NPC-Kosten nehmen es zuerst', en: 'The alt’s bound Kina – NPC costs take it first' },
              { de: 'Daeva Pass Premium für jeden Twink; Plätze 5–8 ohne Membership', en: 'Premium Daeva Pass for every alt; slots 5–8 without Membership' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Tier 3 auf einem Twink?', en: 'Tier 3 on an alt?' },
          text: {
            de: 'Auf Tier 3 (2.100) bringt ein Twink ≈7,7 statt ≈5,6 Mio. pro Woche, also ≈2,1 Mio. mehr. Die 700 Gegenstandsstufen dorthin kommen vor allem aus Drops und Arcana (Transcendence ab 1.600). Mit Verzaubern gekauft (Unique-Teil der Stufe 86 auf +10: ≈13 pro Mio.) kosteten sie grob geschätzt 50 Mio. Kina – rund 25 Wochen Mehrertrag. Lass den Twink also nur über Drops dorthin wachsen.',
            en: 'At Tier 3 (2,100) an alt earns ≈7.7M instead of ≈5.6M a week, i.e. ≈2.1M more. The 700 item levels to get there come mostly from drops and Arcana (Transcendence from 1,600). Bought through enhancement (Unique level-86 piece to +10: ≈13 per million) they would cost roughly 50M Kina – about 25 weeks of the extra income. So let the alt grow there through drops only.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/combat-power', label: { de: 'Verzauberungs-Chancen und Kosten im Guide „Höchste Kampfkraft“', en: 'Enhancement odds and costs in “Highest Combat Power”' } }] },
      ],
    },
    {
      title: { de: 'Ein neuer Twink Schritt für Schritt', en: 'A new alt step by step' },
      blocks: [
        {
          type: 'flow',
          title: { de: 'Vom neuen Charakter zum Tier-2-Farmer', en: 'From new character to Tier 2 farmer' },
          caption: {
            de: 'Reihenfolge und Werte nach aion2maps („What to do at 45“, „Item level“); Zeiten geschätzt, Stufe 1–45 aus unserem Speedrun. Kina pro Woche: nur handelbares Würfel-Kina.',
            en: 'Order and values after aion2maps (“What to do at 45”, “Item level”); times estimated, level 1–45 from our speedrun. Kina per week: tradeable cube Kina only.',
          },
          items: [
            {
              tag: { de: 'vorher', en: 'before' },
              title: { de: 'Server, Klasse, Rolle', en: 'Server, class, role' },
              text: { de: 'Derselbe Server wie der Main. Eine Rolle wählen, die dir fehlt (Heiler, Tank).', en: 'The same server as the main. Pick a role you lack (healer, tank).' },
              tone: 'slate',
            },
            {
              tag: { de: 'Stufe 1–22', en: 'level 1–22' },
              title: { de: 'Expedition-Quest früh', en: 'Expedition quest early' },
              text: { de: 'Ab ≈22 füllt sich die Odyle-Energie. Beim Leveln nur Krao Cave Exploration (20 Energie) öffnen, wenn sie sonst überläuft.', en: 'From ≈22 Odyle Energy fills. While levelling only claim Krao Cave Exploration (20 energy) when it would otherwise cap.' },
              tone: 'blue',
            },
            {
              tag: { de: '≈5 Std.', en: '≈5 h' },
              title: { de: 'Auf 45: nur goldene Missionen', en: 'To 45: golden missions only' },
              text: { de: 'Wie im Speedrun-Guide. Mit 45 hat der Twink ≈780 Gegenstandsstufe – Conquest Tier 1 (700) ist sofort offen.', en: 'As in the speedrun guide. At 45 the alt has ≈780 item level – Conquest Tier 1 (700) opens at once.' },
              tone: 'blue',
            },
            {
              tag: { de: '0 Kina', en: '0 Kina' },
              title: { de: 'Einmal-Belohnungen holen', en: 'Collect the one-time rewards' },
              text: { de: 'Bezirks-Quests, 61 versiegelte Dungeons, 15 Strongholds, 2 Clash Runes auf +1, Monolith synchronisieren, alle Daevanion Crystals und Wisdom Stones ausgeben: ≈+240.', en: 'District quests, 61 sealed dungeons, 15 Strongholds, 2 Clash Runes to +1, sync the Monolith, spend every Daevanion Crystal and Wisdom Stone: ≈+240.' },
              tone: 'gold',
            },
            {
              tag: { de: '< 2 Mio. Kina', en: '< 2M Kina' },
              title: { de: 'Billig auf 1.000', en: 'Cheaply to 1,000' },
              text: { de: 'Gürtel und Amulett auf +10 und eine Stufe hoch, alles +5, Waffe +10, billige Steine. Das gebundene Quest-Kina bezahlt es.', en: 'Belt and amulet to +10 and up a grade, everything +5, weapon +10, cheap stones. The bound quest Kina pays for it.' },
              tone: 'gold',
            },
            {
              tag: { de: '≈2,8 Mio./Woche', en: '≈2.8M/week' },
              title: { de: 'Tier 1 farmen, Abyss öffnen', en: 'Farm Tier 1, open the Abyss' },
              text: { de: 'Krao Cave und Draupnir Conquest. Bei 1.000 die Guard-Quest im Abyss abgeben (Spiritforged Guard) und das Ascension Trial beginnen.', en: 'Krao Cave and Draupnir Conquest. At 1,000 hand in the guard quest in the Abyss (Spiritforged Guard) and start the Ascension Trial.' },
              tone: 'teal',
            },
            {
              tag: { de: '≈5,6 Mio./Woche', en: '≈5.6M/week' },
              title: { de: 'Auf 1.400 – und stoppen', en: 'To 1,400 – and stop' },
              text: { de: 'Gürtel und Amulett auf Unique (je ≈1,58 Mio.), Picks aus Draupnir, Teile der Stufe 70 auf +5. Ab hier farmt der Twink Tier 2 für den Main.', en: 'Belt and amulet to Unique (≈1.58M each), Draupnir picks, level-70 pieces to +5. From here the alt farms Tier 2 for the main.' },
              tone: 'gold',
            },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Kurz vor 1.400 Odyle ansparen** (nie über die Grenze): Ein Tier-2-Würfel ist 1,5-mal so viel wert wie ein Tier-1-Würfel.', en: '**Bank Odyle just before 1,400** (never past the cap): a Tier 2 cube is worth 1.5 times a Tier 1 cube.' },
            { de: '**Monolith nicht neu sammeln:** „Sync Empyrean Traces“ übernimmt die Stufen deiner anderen Charaktere.', en: '**Don’t collect the Monolith again:** “Sync Empyrean Traces” takes over the levels of your other characters.' },
            { de: '**Hidden-Cube-Schlüssel des Twinks auf dem Twink öffnen:** Sie sind gebunden, aber jeder Würfel gibt 1.000 Soul Crystals – und der Pet-Genus-Fortschritt gilt für den ganzen Server.', en: '**Open the alt’s Hidden Cube keys on the alt:** they are bound, but every cube gives 1,000 Soul Crystals – and Pet Genus progress counts for the whole server.' },
            { de: '**Daevanion-Weg** aus dem Guide deiner Klasse nehmen; Umskillen kostet fast nichts.', en: '**Daevanion path:** take the route from your class guide; respecs cost almost nothing.' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/speedrun-45', label: { de: 'Speedrun: in ≈5 Std. auf 45', en: 'Speedrun: level 45 in ≈5 h' }, primary: true },
            { href: '#/guides/combat-power', label: { de: 'Die Reihenfolge für mehr Kampfkraft', en: 'The order for more Combat Power' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Berufe und Sammeln auf Twinks', en: 'Professions and gathering on alts' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Sammeln und Handwerk kosten keine Energie und haben keine Tagesgrenze – nur Zeit. Twinks helfen hier auf zwei Arten: mehr Sammel-Spezialisierungen und mehr Hände für Material. Ausrüstung für den Main herstellen können sie dagegen kaum.',
            en: 'Gathering and crafting cost no energy and have no daily cap – only time. Alts help in two ways here: more gathering specialties and more hands for materials. Making gear for the main, on the other hand, they mostly can’t.',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: '**2 Spezialisierungen pro Charakter:** Die Sammel-Meisterschaft (bis 100) gibt 14 Spezialisierungs-Punkte, jedes Material (Erz, Edelsteine, Holz, Kräuter, Kochzutaten, Odyle) braucht 7 zum Ausbauen. Ein Charakter baut also 2 von 6 aus – **3 Charaktere decken alle sechs ab**.',
              en: '**2 specialties per character:** gathering proficiency (up to 100) gives 14 specialty points, and every material (ore, gems, logs, herbs, cooking ingredients, Odyle) needs 7 to max. So one character maxes 2 of 6 – **3 characters cover all six**.',
            },
            {
              de: '**Material wandert frei:** Erz, Odyle, Refining Stones und die meisten Zwischenstufen aus dem Handwerk sind handelbar und gehen über das Server-Lager zum Main.',
              en: '**Materials move freely:** ore, Odyle, Refining Stones and most crafted intermediates are tradeable and go to the main through Server Storage.',
            },
            {
              de: '**Ausrüstung am Träger herstellen:** Hochgestufte Dragon-Lord-Teile binden an den Hersteller, und das Hochstufen verlangt die Meisterschaft des Rezepts. Der Main levelt das Handwerk für seine eigene Kette also selbst. Handelbar bleiben nur Basis-Teile wie Artisan’s Splendent Orichalcum und True Dragon Lord (Stufe 62) – bis jemand sie anlegt.',
              en: '**Craft gear on the wearer:** upcrafted Dragon Lord pieces bind to the crafter, and upcrafting asks for the recipe’s proficiency. So the main levels the craft for its own chain itself. Only base pieces such as Artisan’s Splendent Orichalcum and True Dragon Lord (level 62) stay tradeable – until someone equips them.',
            },
            {
              de: '**Substance Morph** wandelt 1 Odyle in 1 gebundenes Erz, Edelstein, Holz oder Kraut gleicher Qualität – braucht aber Meisterschaft im passenden Handwerk (1–10 für einfache, 30 für Fine und besser), und das Ergebnis ist gebunden.',
              en: '**Substance Morph** turns 1 Odyle into 1 bound ore, gem, log or herb of the same grade – but it needs proficiency in the matching craft (1–10 for plain grades, 30 for Fine and up), and the result is bound.',
            },
            {
              de: '**Market:** Kaufen geht nur mit Membership; Verkaufen kostet 12 % (2 % Einstellgebühr + 10 % Steuer). Seit dem Patch vom 14.10. kann NC das Einstellen von Sammelmaterial nach deiner Spielhistorie einschränken – ein frischer Twink darf eventuell weniger einstellen (genaue Regeln nennt NC nicht).',
              en: '**Market:** buying needs Membership; selling costs 12% (2% listing fee + 10% tax). Since the 14 Oct patch NC can restrict listing gathered materials based on your play history – a fresh alt may be allowed to list less (NC gives no exact rules).',
            },
            {
              de: '**Die Vertrauensstufe** neben der Kina-Anzeige gilt für den Account und begrenzt, wie viel Kina dir der Market pro Tag auszahlt und wie viel du an der Quna-Börse kaufen kannst.',
              en: '**The trust status** next to the Kina display belongs to the account and limits how much Kina the Market settles to you per day and how much you can buy on the Quna Exchange.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'In Kina pro Stunde rechnen', en: 'Count Kina per hour' },
          text: {
            de: 'Eine Stunde Odyle-Sammeln in Lower Reshanta brachte Raid Relay ≈2,8 Mio. Kina nach Market-Gebühren (mit Membership zum Verkaufen) – mehr als die ≈0,9 Mio. pro Stunde eines Würfel-Twinks. Sie kostet aber Abyss-Zeit (7 Std. pro Ebene, Charakter und Woche) und hängt an den Preisen. Für Market-Spieler ist Sammeln darum oft die bessere Twink-Stunde, solange die Preise halten.',
            en: 'One hour of Odyle gathering in Lower Reshanta earned Raid Relay ≈2.8M Kina after Market fees (with Membership to sell) – more than the ≈0.9M per hour of a cube alt. It costs Abyss time, though (7 h per layer, character and week), and depends on prices. For market players gathering is therefore often the better alt hour, as long as prices hold.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/gathering-crafting', label: { de: 'Sammeln & Handwerk leveln', en: 'Level gathering & crafting' } },
            { href: '#/guides/crafting-gear', label: { de: 'Ausrüstung bis Dragon Lord herstellen', en: 'Craft gear up to Dragon Lord' } },
          ],
        },
      ],
    },
    {
      title: { de: 'PvP, Abyss und Fraktionen', en: 'PvP, Abyss and factions' },
      blocks: [
        {
          type: 'list',
          items: [
            {
              de: '**Eine Fraktion pro Server:** Alle Twinks auf deinem Server haben die Fraktion deines Mains. Die andere Seite spielen heißt: anderer Server, eigenes Lager, eigene Membership, nichts geteilt.',
              en: '**One faction per server:** every alt on your server has your main’s faction. Playing the other side means another server, its own storage, its own Membership, nothing shared.',
            },
            {
              de: '**Abyss ab Stufe 45 und Gegenstandsstufe 1.000.** Jeder Charakter hat 7 Std. Abyss-Zeit pro Ebene und Woche (mit Membership 14 in Lower und Middle); beim Reset füllt sie sich wieder auf, Reste verfallen.',
              en: '**Abyss from level 45 and item level 1,000.** Every character has 7 h of Abyss time per layer a week (14 in Lower and Middle with Membership); at reset it fills up again, leftovers are lost.',
            },
            {
              de: '**AP bleiben auf dem Charakter:** Jeder Twink kauft seine Stigma Shards (im Abyss-Shop die ersten 50 für je 10.000 AP) und Manastones selbst.',
              en: '**AP stays on the character:** every alt buys its own Stigma Shards (in the Abyss shop the first 50 at 10,000 AP each) and manastones.',
            },
            {
              de: '**Battlegrounds (10 gegen 10) gleichen Ausrüstung und Skills an:** Ein Twink bekommt dieselben 3 Match-Belohnungen (je 1.000 AP + 1 Medaille) und 3 Sieg-Belohnungen (je 3.000 AP + 2 Medaillen) pro Woche wie der Main – das beste PvP für einen schwachen Twink. Arenen (1 gegen 1, 5 gegen 5) gleichen nicht an.',
              en: '**Battlegrounds (10 vs 10) equalise gear and skills:** an alt gets the same 3 match rewards (1,000 AP + 1 medal each) and 3 win rewards (3,000 AP + 2 medals each) a week as the main – the best PvP for a weak alt. Arenas (1v1, 5v5) are not equalised.',
            },
            {
              de: '**Abyss Corridor:** solo, ab 1.000, 5 Minuten pro Lauf, nach jeder Artifact Siege an den Artefakten deiner Fraktion – schnelle AP für jeden Charakter einzeln.',
              en: '**Abyss Corridor:** solo, from 1,000, 5 minutes per run, after every Artifact Siege at the artifacts your faction holds – quick AP for every character on its own.',
            },
            {
              de: '**Feste Termine gehören dem Main:** Artifact Siege (Mo, Do, Sa 21:00 Serverzeit) und die Abyss-Bosse spielst du nur mit einem Charakter gleichzeitig.',
              en: '**Fixed events belong to the main:** Artifact Siege (Mon, Thu, Sat 21:00 server time) and the Abyss bosses can only be played on one character at a time.',
            },
            {
              de: '**Abyss-Rang pro Charakter:** Abyss-Rang und Arena-Grade geben denselben Buff – es zählt nur der höchste. PvP-Zeit auf Twinks bremst den Rang deines Mains.',
              en: '**Abyss rank per character:** the Abyss rank and the arena grades give the same buff – only the highest counts. PvP time on alts slows your main’s rank.',
            },
            {
              de: '**Gruppen über Server hinweg:** Die Dungeon-Gruppensuche sucht in deiner Region über alle Server und im PvE auch über die Fraktionen (mit Option „nur meine Fraktion“). Ein Heiler-Twink kommt so schnell in Gruppen.',
              en: '**Groups across servers:** dungeon party matching searches all servers of your region and in PvE across factions too (with a “my faction only” option). A healer alt gets into groups quickly that way.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Server-Transfer', en: 'Server transfer' },
          text: {
            de: 'Der kostenlose Transfer (bis zum 28.10.) geht einmal pro Account, nur in derselben Fraktion und Region, mit beliebig vielen Charakteren. Server-Lager, Post, Market-Angebote und gekaufte Charakterplätze bleiben zurück; fehlen am Ziel Plätze, kostet jeder 1.000 Quna. Closet (samt Sammel-Bonus) und Haustiere verschmelzen mit denen des Ziel-Servers.',
            en: 'The free transfer (until 28 Oct) works once per account, only within the same faction and region, with any number of characters. Server Storage, mail, Market listings and bought character slots stay behind; if the destination lacks slots, each costs 1,000 Quna. The Closet (with its collection bonus) and pets merge into the destination server’s.',
          },
        },
      ],
    },
    {
      title: { de: 'Wochenplan für 2–3 Charaktere', en: 'Week plan for 2–3 characters' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Der Plan verteilt die Twinks auf verschiedene Tage, damit kein Abend länger als ≈3 Std. wird, und hält die Odyle-Energie jedes Charakters unter 480 – unter der Grenze von 560. Die Woche beginnt mit dem Reset am Mittwoch um 07:00 UTC (09:00 MESZ, ab 25.10. 08:00 MEZ).',
            en: 'The plan spreads the alts over different days so that no evening runs longer than ≈3 h, and keeps every character’s Odyle Energy below 480 – under the 560 cap. The week starts with the reset on Wednesday at 07:00 UTC (09:00 CEST, from 25 Oct 08:00 CET).',
          },
        },
        {
          type: 'flow',
          title: { de: 'Eine Woche mit Main und 2 Twinks (ohne Membership)', en: 'A week with main and 2 alts (no Membership)' },
          caption: {
            de: 'Schätzung: eine Twink-Session ≈2–3 Std. (≈10–12 Würfel, angesparte Nightmare-Eintritte, einmal pro Woche Ascension). Mit Membership reicht eine Session pro Twink und Woche, immer am selben Tag – die Grenze von 840 hält genau 7 Tage.',
            en: 'Estimate: one alt session ≈2–3 h (≈10–12 claims, banked Nightmare entries, Ascension once a week). With Membership one session per alt per week is enough, always on the same day – the 840 cap holds exactly 7 days.',
          },
          items: [
            {
              tag: { de: 'jeden Tag', en: 'every day' },
              title: { de: 'Main: Server-Inhalte', en: 'Main: server content' },
              text: { de: 'Duty Missions ×5, Shugo-Schlüssel, Dimensional Invasion, Daily Dungeon ×2, Nightmare ×2, Supply Requests (≈45 Min.).', en: 'Duty Missions ×5, Shugo keys, Dimensional Invasion, Daily Dungeon ×2, Nightmare ×2, Supply Requests (≈45 min).' },
              tone: 'gold',
            },
            {
              tag: { de: 'Sa + Di', en: 'Sat + Tue' },
              title: { de: 'Twink 1', en: 'Alt 1' },
              text: { de: 'Odyle leeren (≈480, dann ≈360), Nightmare, am Samstag Ascension ×3. Handelbares Kina ins Server-Lager.', en: 'Empty Odyle (≈480, then ≈360), Nightmare, Ascension ×3 on Saturday. Tradeable Kina into Server Storage.' },
              tone: 'blue',
            },
            {
              tag: { de: 'So + Mi', en: 'Sun + Wed' },
              title: { de: 'Twink 2', en: 'Alt 2' },
              text: { de: 'Dasselbe um einen Tag versetzt, Ascension am Sonntag. Kina ins Server-Lager.', en: 'The same shifted by one day, Ascension on Sunday. Kina into Server Storage.' },
              tone: 'teal',
            },
            {
              tag: { de: 'Sa + Di', en: 'Sat + Tue' },
              title: { de: 'Main: Odyle', en: 'Main: Odyle' },
              text: { de: 'Die eigenen 21 Würfel plus die Morphs (16 + 4) auf dem höchsten Tier.', en: 'Its own 21 claims plus the morphs (16 + 4) at the highest tier.' },
              tone: 'gold',
            },
            {
              tag: { de: 'So + Di', en: 'Sun + Tue' },
              title: { de: 'Main gibt das Kina aus', en: 'Main spends the Kina' },
              text: { de: 'Abheben, schwächster Platz → sicheres +10 → … – nichts liegt beim Reset herum.', en: 'Withdraw, weakest slot → safe +10 → … – nothing lies around at reset.' },
              tone: 'violet',
            },
          ],
        },
        {
          type: 'table',
          grid: true,
          caption: { de: 'Wochenplan (Mittwoch = Reset-Tag), ● = an diesem Tag', en: 'Week plan (Wednesday = reset day), ● = on that day' },
          head: [{ de: 'Aufgabe', en: 'Task' }, { de: 'Mi', en: 'Wed' }, { de: 'Do', en: 'Thu' }, { de: 'Fr', en: 'Fri' }, { de: 'Sa', en: 'Sat' }, { de: 'So', en: 'Sun' }, { de: 'Mo', en: 'Mon' }, { de: 'Di', en: 'Tue' }],
          rows: [
            [{ de: 'Main: Duty ×5, Shugo, Invasion, Daily Dungeon', en: 'Main: Duty ×5, Shugo, Invasion, Daily Dungeon' }, '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Main: Nightmare ×2, Supply Requests', en: 'Main: Nightmare ×2, Supply Requests' }, '●', '●', '●', '●', '●', '●', '●'],
            [{ de: 'Main: Wochenkäufe (Commands, Wind Breeze)', en: 'Main: weekly buys (Commands, Wind Breeze)' }, '●', '', '', '', '', '', ''],
            [{ de: 'Main: Odyle-Würfel', en: 'Main: Odyle claims' }, '', '', '', '●', '', '', '●'],
            [{ de: 'Twink 1: Odyle + Nightmare', en: 'Alt 1: Odyle + Nightmare' }, '', '', '', '●', '', '', '●'],
            [{ de: 'Twink 2: Odyle + Nightmare', en: 'Alt 2: Odyle + Nightmare' }, '●', '', '', '', '●', '', ''],
            [{ de: 'Ascension ×3 (Twink 1 / 2)', en: 'Ascension ×3 (alt 1 / 2)' }, '', '', '', '1', '2', '', ''],
            [{ de: 'Main: Kina abheben und ausgeben', en: 'Main: withdraw and spend Kina' }, '', '', '', '', '●', '', '●'],
          ],
        },
        {
          type: 'checklist',
          items: [
            { de: '**Main:** Duty Missions, Shugo-Schlüssel, Dimensional Invasion und Daily Dungeon jeden Tag – Server-Inhalte, nie auf den Twinks', en: '**Main:** Duty Missions, Shugo keys, Dimensional Invasion and Daily Dungeon every day – server content, never on the alts' },
            { de: '**Twink 1:** Odyle am Samstag und Dienstag geleert (unter 480) – 21 Würfel', en: '**Alt 1:** Odyle emptied on Saturday and Tuesday (below 480) – 21 claims' },
            { de: '**Twink 2:** Odyle am Sonntag und Mittwoch geleert (unter 480) – 21 Würfel', en: '**Alt 2:** Odyle emptied on Sunday and Wednesday (below 480) – 21 claims' },
            { de: '**Jeder Twink:** Nightmare-Eintritte verbraucht (bis 14 ansparbar) und Ascension ×3 vor dem Reset', en: '**Every alt:** Nightmare entries used (bank up to 14) and Ascension ×3 before the reset' },
            { de: '**Jeder Lauf:** Würfel abgeholt, bevor du gehst – 10 nicht abgeholte pro Woche und Server', en: '**Every run:** cube claimed before you leave – 10 unclaimed per week and server' },
            { de: '**Jeder Twink:** gebundenes Kina für Verzaubern, Morphs oder Wind-Breeze-Odyle ausgegeben', en: '**Every alt:** bound Kina spent on enhancement, morphs or Wind Breeze Odyle' },
            { de: '**Server-Lager:** das handelbare Kina aller Twinks liegt drin – der Main hat es abgehoben', en: '**Server Storage:** the tradeable Kina of every alt is in it – the main has withdrawn it' },
            { de: '**Main:** Kina vor dem Reset ausgegeben (schwächster Platz → +10 → …)', en: '**Main:** Kina spent before the reset (weakest slot → +10 → …)' },
            { de: '**Läufe gezählt:** ohne Membership höchstens 4 × 21 = 84 Conquest-Läufe pro Woche auf dem Server', en: '**Runs counted:** without Membership at most 4 × 21 = 84 Conquest runs a week on the server' },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/farming-power', label: { de: 'Tages- und Wochenrouten des Mains', en: 'The main’s daily and weekly routes' } }] },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'table',
          head: [{ de: 'Fehler', en: 'Mistake' }, { de: 'Stattdessen', en: 'Do this instead' }, { de: 'Kostet dich', en: 'Costs you' }],
          rows: [
            [{ de: 'Twink auf einem anderen Server oder in der anderen Fraktion', en: 'Alt on another server or in the other faction' }, { de: 'Derselbe Server – jeder Server hat nur eine Fraktion', en: 'The same server – every server has only one faction' }, { de: 'alles: Lager, Membership, Closet, Haustiere', en: 'everything: storage, Membership, Closet, pets' }],
            [{ de: 'Duty Missions, Daily Dungeon, Shugo oder Invasion auf dem Twink', en: 'Duty Missions, Daily Dungeon, Shugo or Invasion on the alt' }, { de: 'Server-weit – immer auf dem Main', en: 'Server-wide – always on the main' }, { de: 'die Belohnungen des Mains', en: 'the main’s rewards' }],
            [{ de: 'Conquest oder Transcendence verlassen, ohne den Würfel zu nehmen', en: 'Leaving Conquest or Transcendence without taking the cube' }, { de: 'Immer abholen – 10 pro Woche und Server, bei 0 kommt keiner mehr hinein', en: 'Always claim – 10 per week and server, at 0 nobody gets in any more' }, { de: 'den Zugang aller Charaktere', en: 'access for every character' }],
            [{ de: 'Odyle-Energie eines Twinks an der Grenze', en: 'An alt’s Odyle Energy at the cap' }, { de: 'Ohne Membership spätestens alle 4 Tage, mit spätestens alle 7', en: 'Without Membership at least every 4 days, with it at least every 7' }, 'Kina'],
            [{ de: '5+ Farm-Charaktere ohne Membership', en: '5+ farm characters without Membership' }, { de: 'Gratis bei 4 aufhören; Plätze 5–8 nur mit Membership', en: 'Stop at 4 when free; slots 5–8 only with Membership' }, { de: '20–80 % des Würfel-Kinas', en: '20–80% of the cube Kina' }],
            [{ de: 'Twinks wie Mains ausbauen (+15, Amp, Unique-Gürtel +10)', en: 'Building alts like mains (+15, Amp, Unique belt +10)' }, { de: 'Alles +5, Waffe +10, dann stoppen', en: 'Everything +5, weapon +10, then stop' }, 'Kina'],
            [{ de: 'Daeva Pass Premium für jeden Twink', en: 'Premium Daeva Pass for every alt' }, { de: 'Gilt pro Charakter – nur für den Main oder einen echten zweiten Main', en: 'It is per character – only for the main or a real second main' }, 'Quna'],
            [{ de: 'Gebundenes Kina auf dem Twink liegen lassen', en: 'Leaving bound Kina unused on the alt' }, { de: 'Für Verzaubern, Morphs und Wind-Breeze-Odyle ausgeben', en: 'Spend it on enhancement, morphs and Wind Breeze Odyle' }, 'Kina'],
            [{ de: 'Ausrüstung auf dem Twink für den Main hochstufen', en: 'Upcrafting gear on the alt for the main' }, { de: 'Hochgestufte Teile binden an den Hersteller – am Träger herstellen', en: 'Upcrafted pieces bind to the crafter – craft on the wearer' }, { de: 'Material', en: 'materials' }],
            [{ de: 'Alle Plätze auf einmal füllen', en: 'Filling every slot at once' }, { de: 'Einen Twink nach dem anderen auf 1.400', en: 'One alt after another to 1,400' }, { de: 'Zeit, Motivation', en: 'time, motivation' }],
            [{ de: 'Kina vor einem Transfer im Server-Lager lassen', en: 'Leaving Kina in Server Storage before a transfer' }, { de: 'Vorher abheben – das Lager bleibt auf dem alten Server', en: 'Withdraw it first – the storage stays on the old server' }, 'Kina'],
          ],
        },
      ],
    },
    {
      title: { de: 'Noch nicht sicher', en: 'Not confirmed yet' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Höchstens 8 Plätze:** Dass Plätze 1.000 Quna kosten, steht in NCs Transfer-Hinweis; die Grenze von 8 pro Server stammt aus NCs Livestream, wie Guides ihn wiedergeben.', en: '**At most 8 slots:** that slots cost 1,000 Quna is in NC’s transfer notice; the limit of 8 per server comes from NC’s livestream as guides report it.' },
            { de: '**Würfel pro Tier:** Guides nennen 2 Würfel pro Tag (bis 14 angespart) auf dem höchsten Tier; NCs Transfer-Q&A bestätigt Würfel-Zähler pro Charakter, nennt aber keine Zahlen. Gehen alle 21 auf Tier 2, bringt ein Charakter 6,3 statt 5,6 Mio.', en: '**Claims per tier:** guides name 2 claims a day (banking up to 14) at the top tier; NC’s transfer Q&A confirms per-character claim counters but gives no numbers. If all 21 can be Tier 2, a character earns 6.3M instead of 5.6M.' },
            { de: '**Tagesgrenze von 1 Mio. handelbarem Kina:** ob sie auf Global auch das Würfel-Kina stoppt.', en: '**Daily cap of 1M tradeable Kina:** whether it also stops cube Kina on Global.' },
            { de: '**Wind-Breeze-Odyle:** 20 pro Charakter gilt laut NC während der Transfer-Phase (bis 28.10.); ob danach wieder 4 pro Charakter + 16 pro Server gelten.', en: '**Wind Breeze Odyle:** 20 per character applies during the transfer period according to NC (until 28 Oct); whether 4 per character + 16 per server return afterwards.' },
            { de: '**Odyle-Nachladung mit Membership:** games.gg schreibt +50 %, die Guides auf Basis der Client-Daten (aion2maps, Fextralife) 15 alle 3 Std. für alle – dieser Guide nimmt Letzteres.', en: '**Odyle refill with Membership:** games.gg writes +50%, the guides based on the client data (aion2maps, Fextralife) 15 every 3 h for everyone – this guide uses the latter.' },
            { de: '**Odyle-Energie am Season-Ende:** Auf dem asiatischen Client verfällt sie mit dem Kapitel; Season 1 auf Global endet am 16.12.2026.', en: '**Odyle Energy at season end:** on the Asian client it expires with the chapter; Season 1 on Global ends on 16 Dec 2026.' },
            { de: '**Titel:** NC unterscheidet Charakter- und Server-Titel, nennt aber nicht, welche welche sind.', en: '**Titles:** NC separates character and server titles but does not say which are which.' },
            { de: '**Zeiten:** Gemessen ist nur die Dauer der Conquest-Läufe; alle anderen Zeiten sind Schätzungen.', en: '**Times:** only the length of Conquest runs is measured; every other time is an estimate.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Wenn du etwas davon im Spiel prüfst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'If you check any of this in game, let us know and the guide gets updated.',
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
            { href: 'https://aion2.plaync.com/en-us/board/update/view?articleId=6acf20d007b77e214688a7ac', label: 'NCSOFT – Global patch notes 13/14 Oct 2026' },
            { href: 'https://aion2.plaync.com/en-us/board/update/view?articleId=6ac5e6e8d97eae18cc40e34e', label: 'NCSOFT – Global patch notes 6/7 Oct 2026' },
            { href: 'https://aion2.plaync.com/en-us/board/notice/view?articleId=6ac7e128d97eae18cc40e3b7&isNotice=1', label: 'NCSOFT – Server Transfer Q&A' },
            { href: 'https://aion2.plaync.com/en-us/board/notice/view?articleId=6ac932a8fa34c1011d627bc9&isNotice=1', label: 'NCSOFT – Server Transfer products info' },
            { href: 'https://aion2maps.com/guides/whats-bound/', label: 'aion2maps – What’s tied to your character, server or account' },
            { href: 'https://aion2maps.com/guides/daily-and-weekly/', label: 'aion2maps – Daily and weekly' },
            { href: 'https://aion2maps.com/guides/expeditions-and-odyle/', label: 'aion2maps – Expeditions and Odyle Energy' },
            { href: 'https://aion2maps.com/guides/membership-and-shop/', label: 'aion2maps – Membership, Founder’s Packs and the shop' },
            { href: 'https://aion2maps.com/guides/storage/', label: 'aion2maps – Storage' },
            { href: 'https://aion2maps.com/guides/what-to-do-at-45/', label: 'aion2maps – What to do at 45' },
            { href: 'https://aion2maps.com/guides/item-level/', label: 'aion2maps – Item level' },
            { href: 'https://aion2maps.com/guides/progression-path/', label: 'aion2maps – Progression path' },
            { href: 'https://aion2maps.com/guides/crafting/', label: 'aion2maps – Crafting' },
            { href: 'https://aion2maps.com/guides/abyss/', label: 'aion2maps – The Abyss and rifts' },
            { href: 'https://aion2maps.com/guides/arenas-and-battlegrounds/', label: 'aion2maps – Arenas and battlegrounds' },
            { href: 'https://aion2maps.com/guides/dungeons-and-raids/', label: 'aion2maps – Dungeons and raids' },
            { href: 'https://aion2maps.com/guides/hidden-cubes/', label: 'aion2maps – Hidden Cubes' },
            { href: 'https://aion2maps.com/guides/pet-genus/', label: 'aion2maps – Pet Genus' },
            { href: 'https://aion2maps.com/guides/rules-and-policies/', label: 'aion2maps – Rules and policies' },
            { href: 'https://aion2.wiki.fextralife.com/Expeditions', label: 'Fextralife wiki – Expeditions' },
            { href: 'https://raidrelay.com/aion-2-kina-guide', label: 'Raid Relay – Kina guide (main + alts, timed runs)' },
            { href: 'https://aion2tierlist.com/guides/aion-2-alt-guide', label: 'AION2TIERLIST – Alt guide' },
            { href: 'https://space4games.com/en/games-en/aion-2-kina-farming-guide/', label: 'SPACE4GAMES – Kina farming and weekly reward adjustment' },
            { href: 'https://games.gg/aion-2/guides/alts-explained-should-you-make-an-alt-in-aion-2/', label: 'games.gg – Alts explained' },
            { href: 'https://allthings.how/?p=234805', label: 'AllThings.How – Class change and how alts work' },
            { href: 'https://metabot.gg/en/aion-2/guides/kinah-farming-guide', label: 'MetaBot – Kina farming: bound vs unbound' },
          ],
        },
      ],
    },
  ],
};
