import type { Guide, L10n } from '../types';

/**
 * Wings and flight on the global server: flying and gliding, the 9 Oct Flight Power buff, every wing with its source,
 * equipped and owned effects, enhancement odds and costs, the wings title and what players wear (October 2026).
 * Numbers and facts from the sources at the end, paraphrased; the wing list, odds and costs come from MetaBot's
 * reading of the Global client, checked against games.gg, AllThings.How, aion2.blog and the patch notes as daevaguides,
 * aion2hub and mein-mmo relay them. What Flight Power means in seconds is published nowhere, so it isn't here.
 */

/** A name that is the same in both languages (as the English client calls it). */
const both = (s: string): L10n => ({ de: s, en: s });

export const wings: Guide = {
  id: 'wings',
  icon: 'wings',
  tone: 'blue',
  category: 'world',
  title: {
    de: 'Flügel & Fliegen: Sammlung, Verstärken, Flugkraft',
    en: 'Wings & flight: collection, enhancing, Flight Power',
  },
  summary: {
    de: 'Wie Fliegen und Gleiten funktionieren, woher jedes Flügelpaar kommt, was es angelegt und im Besitz gibt, was Verstärken kostet und wie oft es klappt, der Titel für 25 Flügel – und welche Flügel die Spieler wirklich tragen.',
    en: 'How flying and gliding work, where every pair of wings comes from, what it gives equipped and owned, what enhancing costs and how often it works, the title for 25 wings – and which wings players actually wear.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Flügel', en: 'Wings' },
    { de: 'Flugkraft', en: 'Flight Power' },
    { de: 'Sammlung', en: 'Collection' },
    { de: 'Verstärken', en: 'Enhancing' },
  ],
  basis: {
    de: 'Recherche in Community-Guides und Patch-Notizen zum globalen Server (Oktober 2026); Flügel-Liste, Chancen und Kosten aus den Client-Daten, wie MetaBot sie ausliest',
    en: 'Research in community guides and patch notes for the global server (October 2026); wing list, odds and costs from the client data as MetaBot reads it',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '28', label: { de: 'Flügelpaare auf Global', en: 'pairs of wings on Global' }, note: { de: 'je eine Elyos- und eine Asmodier-Version', en: 'each in an Elyos and an Asmodian version' }, tone: 'blue' },
            { value: '+10', label: { de: 'höchste Verstärkung', en: 'highest enhancement' }, note: { de: 'Unique ab +4 mit Risiko', en: 'Unique risky from +4' }, tone: 'gold' },
            { value: '25', label: { de: 'Flügel für einen Titel', en: 'wings for a title' }, note: both('Dominator of Dimensions'), tone: 'violet' },
            { value: { de: '1 + alle', en: '1 + all' }, label: { de: 'eins angelegt, alle im Besitz', en: 'one equipped, all owned' }, note: { de: 'die Sammlung zählt immer', en: 'the collection always counts' }, tone: 'teal' },
          ],
        },
        {
          type: 'compare',
          title: { de: 'Angelegt oder im Besitz', en: 'Equipped or owned' },
          caption: { de: 'Jedes Flügelpaar hat zwei Wirkungen (MetaBot, games.gg, daevaguides).', en: 'Every pair of wings has two effects (MetaBot, games.gg, daevaguides).' },
          items: [
            {
              title: { de: 'Angelegt', en: 'Equipped' },
              tag: { de: 'ein Paar', en: 'one pair' },
              tone: 'blue',
              points: [
                { text: { de: 'Die großen Werte – etwa Boss-Schaden, Angriff, Abklingzeit', en: 'The big stats – such as boss damage, Attack, cooldown' } },
                { text: { de: 'Gilt nur, solange du das Paar trägst', en: 'Only while you wear the pair' } },
                { kind: 'con', text: { de: 'Verstärken hebt diese Werte nicht', en: 'Enhancing doesn’t raise these stats' } },
              ],
            },
            {
              title: { de: 'Im Besitz', en: 'Owned' },
              tag: { de: 'alle Paare', en: 'every pair' },
              tone: 'teal',
              points: [
                { kind: 'pro', text: { de: 'Jedes Paar gibt Flugkraft und oft einen kleinen Wert – getragen oder nicht', en: 'Every pair gives Flight Power and often a small stat – worn or not' } },
                { kind: 'pro', text: { de: 'Verstärken hebt genau diese Wirkung', en: 'Enhancing raises exactly this effect' } },
                { text: { de: 'Doppelte Flügel zählen nicht', en: 'Duplicate wings don’t count' } },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Shop-Flügel sind nur Aussehen', en: 'Shop wings are looks only' },
          text: {
            de: 'Flügel aus dem Shop – die Blazing Sun Wings des Founder’s Pack, die Launch-Flügel und die Spinnen-Flügel zu Halloween – haben keine Werte und keine Flugkraft. Sie zählen nur fürs Aussehen.',
            en: 'Wings from the shop – the Founder’s Pack Blazing Sun Wings, the launch wings and the Halloween spider wings – have no stats and no Flight Power. They only count for looks.',
          },
        },
      ],
    },
    {
      title: { de: 'Fliegen und Gleiten', en: 'Flying and gliding' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Die Standard-Tasten laut mehreren Guides; im Spiel lassen sie sich ändern.', en: 'The default keys according to several guides; you can change them in game.' },
          head: [{ de: 'Taste', en: 'Key' }, { de: 'Was sie tut', en: 'What it does' }],
          rows: [
            ['V', { de: 'Abheben – und in der Luft die Flügel einklappen', en: 'Take off – and fold the wings in mid-air' }],
            [{ de: 'Umschalt', en: 'Shift' }, { de: 'Schneller fliegen (Boost)', en: 'Fly faster (boost)' }],
            [{ de: 'Leertaste', en: 'Space' }, { de: 'Gleiten', en: 'Glide' }],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Flugkraft:** Fliegen leert eine Leiste, so groß wie dein Wert Flugkraft (Flight Power). Nach der Landung füllt sie sich langsam; ist sie leer, stürzt du. Jedes Flügelpaar im Besitz macht sie größer.', en: '**Flight Power:** flying drains a gauge as large as your Flight Power stat. After landing it refills slowly; when it runs out, you fall. Every pair of wings you own makes it larger.' },
            { de: '**Fluggeschwindigkeit** ist ein eigener Wert – wie schnell, nicht wie lange. Sie kommt vor allem von Titeln.', en: '**Flight Speed** is a separate stat – how fast, not how long. It comes mostly from titles.' },
            { de: '**Gleiten** hält dich in Bewegung, während du sinkst, und kostet weniger als Fliegen. Aufwinde und Windströme tragen dich oder heben dich an.', en: '**Gliding** keeps you moving while you sink and costs less than flying. Updrafts and windstreams carry or lift you.' },
            { de: '**Unterwegs auffüllen:** Flugkreise (Lower Reshanta 49, Upper Reshanta 32, Middle Reshanta keine), Erholungsringe in der offenen Welt, Wind Brew (2.000 Flugkraft für 500 AP) und Wind Serum aus der Alchemie.', en: '**Refilling on the way:** Flight Circles (Lower Reshanta 49, Upper Reshanta 32, Middle Reshanta none), recovery rings in the open world, Wind Brew (2,000 Flight Power for 500 AP) and Wind Serum from Alchemy.' },
            { de: '**Abyss:** In Lower und Upper Reshanta darfst du fliegen; in (Chaotic) Middle Reshanta nur gleiten und laufen.', en: '**Abyss:** in Lower and Upper Reshanta you may fly; in (Chaotic) Middle Reshanta only glide and walk.' },
            { de: '**Erste Flügel:** Lesser Daeva Wings aus der Quest „The Power in the Lake“ (Elyos) bzw. „The Being Beneath the Lake“ (Asmodier), etwa ab Stufe 5.', en: '**First wings:** Lesser Daeva Wings from the quest “The Power in the Lake” (Elyos) or “The Being Beneath the Lake” (Asmodians), from about level 5.' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Flugkraft der Quest-Flügel seit der Wartung am 9. Oktober (laut NCs Notiz, wie daevaguides, aion2hub und mein-mmo sie wiedergeben). Manche Listen zeigen noch die alten Werte.', en: 'Flight Power of the quest wings since the maintenance on 9 October (per NC’s notice, as daevaguides, aion2hub and mein-mmo relay it). Some lists still show the old values.' },
          head: [{ de: 'Flügel', en: 'Wings' }, { de: 'Vorher', en: 'Before' }, { de: 'Jetzt', en: 'Now' }],
          rows: [
            ['Lesser Daeva Wings', { de: '2.000', en: '2,000' }, { de: '**2.500**', en: '**2,500**' }],
            ['Intermediate Daeva Wings', '500', { de: '**1.000**', en: '**1,000**' }],
            ['Superior Daeva Wings', '500', { de: '**1.000**', en: '**1,000**' }],
            ['Ultimate Daeva Wings', '500', { de: '**1.000**', en: '**1,000**' }],
          ],
        },
      ],
    },
    {
      title: { de: 'Woher die Flügel kommen', en: 'Where the wings come from' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Alle Flügel mit Werten (MetaBot, games.gg, AllThings.How). U = Unique, E = Epic, R = Rare. Preise in den Shops hat keine Quelle.', en: 'Every wing with stats (MetaBot, games.gg, AllThings.How). U = Unique, E = Epic, R = Rare. No source has the shop prices.' },
          head: [{ de: 'Quelle', en: 'Source' }, { de: 'Flügel', en: 'Wings' }],
          rows: [
            [{ de: 'Story- und Aufstiegs-Quests', en: 'Story and Ascension quests' }, { de: 'Lesser Daeva (Stufe 5), Intermediate Daeva R (22), Superior Daeva E (32), Ultimate Daeva U (45), Aullaeu R (30)', en: 'Lesser Daeva (level 5), Intermediate Daeva R (22), Superior Daeva E (32), Ultimate Daeva U (45), Aullaeu R (30)' }],
            [{ de: 'Expeditions-Dungeons (versiegelt)', en: 'Expedition dungeons (sealed)' }, { de: 'U: Black Fragment (Krao), Blue Wave (Draupnir), Ancient Aullaeu (Urugugu), Forest Spirit (Vakron), Kromede (Fire Temple), Dark Veil (Ferocious Horn Den)', en: 'U: Black Fragment (Krao), Blue Wave (Draupnir), Ancient Aullaeu (Urugugu), Forest Spirit (Vakron), Kromede (Fire Temple), Dark Veil (Ferocious Horn Den)' }],
            [{ de: 'Versiegelte Solo-Dungeons', en: 'Solo sealed dungeons' }, { de: 'E: Sealing und Glorious – je 70 Sealed Wing Featherdown und 10 Pure Odyle; 2 Federn pro Abschluss', en: 'E: Sealing and Glorious – 70 Sealed Wing Featherdown and 10 Pure Odyle each; 2 feathers per clear' }],
            [{ de: 'Nightmare-Shop', en: 'Nightmare shop' }, { de: 'Nightmare U, Conqueror E', en: 'Nightmare U, Conqueror E' }],
            [{ de: 'Abyss-, Arena- und Schlachtfeld-Shop', en: 'Abyss, Arena and Battlefield shops' }, { de: 'Brawler U, Warrior E', en: 'Brawler U, Warrior E' }],
            [{ de: 'Saison-Shop', en: 'Season shop' }, 'Talisra U'],
            [{ de: 'Shugo-Festival-Shop', en: 'Shugo Festival shop' }, { de: 'Springflower Butterfly U, Spirit E, Violet Butterfly R', en: 'Springflower Butterfly U, Spirit E, Violet Butterfly R' }],
            [{ de: 'Poko’s Skin Bundle', en: 'Poko’s Skin Bundle' }, { de: 'Blue Butterfly U, Odyle E, Fairy’s Dream R', en: 'Blue Butterfly U, Odyle E, Fairy’s Dream R' }],
            [{ de: 'Versteckte Würfel', en: 'Hidden cubes' }, 'Radiant Love U'],
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Die Dungeon-Flügel fallen versiegelt und werden per Substance Morph geöffnet – laut den meisten Quellen mit 10 Radiant Odyle, laut einer mit 50 passenden Federn und 10 Radiant Odyle. Daneben gibt es 3 Flügel nur fürs Aussehen.',
            en: 'The dungeon wings drop sealed and are opened through Substance Morph – with 10 Radiant Odyle according to most sources, with 50 matching feathers and 10 Radiant Odyle according to one. There are also 3 wings for looks only.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/dungeons', label: { de: 'Die Dungeons und ihre Zähler', en: 'The dungeons and their counters' } }, { href: '#/cubes', label: { de: 'Versteckte Würfel', en: 'Hidden cubes' } }] },
      ],
    },
    {
      title: { de: 'Was die besten Flügel angelegt geben', en: 'What the best wings give equipped' },
      blocks: [
        {
          type: 'table',
          caption: { de: 'Angelegte Werte der wichtigsten Unique-Flügel (MetaBot, games.gg)', en: 'Equipped stats of the main Unique wings (MetaBot, games.gg)' },
          head: [{ de: 'Flügel', en: 'Wings' }, { de: 'Angelegt', en: 'Equipped' }],
          rows: [
            ['**Nightmare**', { de: 'Boss-Schaden +3,5 %, Angriff +60, Krit +35, Genauigkeit +35', en: 'Boss Damage Boost +3.5%, Attack +60, Crit +35, Accuracy +35' }],
            ['**Dark Veil**', { de: 'Schaden +2,5 %, Angriff +60, Boss-Verteidigung +500, Boss-Schadensresistenz +3,5 %', en: 'Damage Boost +2.5%, Attack +60, Boss Defence +500, Boss Damage Tolerance +3.5%' }],
            ['**Talisra**', { de: 'Abklingzeit −4 %, Angriff +60, Genauigkeit +35, Verteidigung +400', en: 'Cooldown Reduction +4%, Attack +60, Accuracy +35, Defence +400' }],
            ['**Forest Spirit**', { de: 'Schadensresistenz +2,5 %, Verteidigung +400, Boss-Angriff +95, Boss-Schaden +3,5 %', en: 'Damage Tolerance +2.5%, Defence +400, Boss Attack +95, Boss Damage Boost +3.5%' }],
            ['**Kromede**', { de: 'Angriff +60, Krit +35, HP +500, HP-Regeneration +250', en: 'Attack +60, Crit +35, HP +500, HP regen +250' }],
            ['**Springflower Butterfly**', { de: 'Durchschlag +500, Block-Durchschlag +60, Angriff +60, Genauigkeit +35', en: 'Penetration +500, Block Penetration +60, Attack +60, Accuracy +35' }],
            ['**Brawler**', { de: 'Statuseffekt-Resistenz +3 %, Statuseffekt-Chance +3 %, HP +500, Verteidigung +400', en: 'Status Effect Resist +3%, Status Effect Chance +3%, HP +500, Defence +400' }],
            [{ de: '**Ultimate Daeva** (Quest mit 45)', en: '**Ultimate Daeva** (quest at 45)' }, { de: 'HP +500, MP +250, Durchschlag +500, Krit +35', en: 'HP +500, MP +250, Penetration +500, Crit +35' }],
          ],
        },
        {
          type: 'shares',
          title: { de: 'Was die Spieler tragen', en: 'What players wear' },
          caption: { de: 'MetaBots Stichprobe von 3.016 Charakteren der Stufe 45 (8. Oktober). Auf den offiziellen Profilen tragen alle ihre Flügel auf +0. Was die Top 80 tragen, steht im Kampfkraft-Guide.', en: 'MetaBot’s sample of 3,016 level-45 characters (8 October). On the official profiles everyone wears their wings at +0. What the top 80 wear is in the Combat Power guide.' },
          unit: '%',
          items: [
            { label: 'Ultimate Daeva', value: 71, tone: 'slate' },
            { label: 'Forest Spirit', value: 11.5, tone: 'green' },
            { label: 'Superior Daeva', value: 3.3, tone: 'blue' },
            { label: 'Ancient Aullaeu', value: 3.1, tone: 'teal' },
            { label: 'Black Fragment', value: 2.6, tone: 'violet' },
            { label: 'Dark Veil', value: 2.2, tone: 'rose' },
            { label: { de: 'Andere', en: 'Others' }, value: 6.3, tone: 'gold' },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/combat-power', label: { de: 'Was die Top 80 tragen', en: 'What the top 80 wear' } }] },
      ],
    },
    {
      title: { de: 'Verstärken', en: 'Enhancing' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Flügel gehen von +0 bis +10. Jeder Versuch kostet Kina (gebundenes zuerst), Sync Stones (Unique) und Enhance Stones. Verstärken hebt nur die Wirkung **im Besitz**: +10 Flugkraft pro Stufe (bei den meisten Flügeln von 200 auf 300) und bei neun Epic- und Rare-Flügeln einen zusätzlichen Wert, etwa HP +50 → +500 bei Intermediate Daeva. Die angelegten Werte bleiben gleich.',
            en: 'Wings go from +0 to +10. Each attempt costs Kina (bound first), Sync Stones (Unique) and Enhance Stones. Enhancing only raises the **owned** effect: +10 Flight Power per level (200 to 300 on most wings) and on nine Epic and Rare wings an extra stat, such as HP +50 → +500 on Intermediate Daeva. The equipped stats stay the same.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Erfolgschance bei Unique-Flügeln', en: 'Success chance on Unique wings' },
          caption: { de: 'Laut den Client-Daten (MetaBot, aion2.blog). Rare und Epic gelingen immer. Jeder Fehlschlag gibt +10 % auf den nächsten Versuch derselben Stufe; eine Stufe geht nie verloren, das Material schon. Zwei Guides nennen 100 % für alle Stufen – die Client-Daten sagen etwas anderes.', en: 'According to the client data (MetaBot, aion2.blog). Rare and Epic always succeed. Each failure adds +10% to the next try at that level; you never lose a level, but the materials are gone. Two guides say 100% at every level – the client data says otherwise.' },
          unit: '%',
          max: 100,
          items: [
            { label: '+1 … +3', value: 100, display: { de: '100 %', en: '100%' }, tone: 'green' },
            { label: '+4', value: 90, display: { de: '90 %', en: '90%' }, tone: 'teal' },
            { label: '+5', value: 80, display: { de: '80 %', en: '80%' }, tone: 'teal' },
            { label: '+6 … +8', value: 50, display: { de: '50 %', en: '50%' }, tone: 'gold' },
            { label: '+9', value: 40, display: { de: '40 %', en: '40%' }, tone: 'rose' },
            { label: '+10', value: 30, display: { de: '30 %', en: '30%' }, tone: 'rose' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Was ein Paar bis +10 kostet (MetaBot). Pro Unique-Versuch steigt der Preis von 240.000 Kina, 2 Sync und 800 Enhance Stones (+1) bis 1,5 Mio. Kina, 12 Sync und 6.000 Enhance Stones (+10).', en: 'What one pair costs to +10 (MetaBot). Per Unique attempt the price rises from 240,000 Kina, 2 Sync and 800 Enhance Stones (+1) to 1.5M Kina, 12 Sync and 6,000 Enhance Stones (+10).' },
          head: [{ de: 'Qualität', en: 'Grade' }, 'Kina', 'Sync Stones', 'Enhance Stones'],
          rows: [
            ['Rare', { de: '3,49 Mio.', en: '3.49M' }, '34', { de: '13.440', en: '13,440' }],
            ['Epic', { de: '5,96 Mio.', en: '5.96M' }, '53', { de: '23.040', en: '23,040' }],
            [{ de: 'Unique, im Schnitt', en: 'Unique, on average' }, { de: '≈ 16,7 Mio.', en: '≈ 16.7M' }, '≈ 137', { de: '≈ 66.000', en: '≈ 66,000' }],
            [{ de: 'Unique, schlimmster Fall', en: 'Unique, worst case' }, { de: '50,3 Mio.', en: '50.3M' }, '410', { de: '199.600', en: '199,600' }],
          ],
        },
        {
          type: 'steps',
          items: [
            { title: { de: 'Epic-Flügel mit nützlichem Wert', en: 'Epic wings with a useful stat' }, text: { de: 'Gelingt immer, und der zusätzliche Wert wächst mit.', en: 'Always succeeds, and the extra stat grows with it.' } },
            { title: both('Intermediate Daeva'), text: { de: 'Rare, also sicher – und HP bis +500 im Besitz.', en: 'Rare, so safe – and up to HP +500 owned.' } },
            { title: { de: 'Unique-Flügel bis +3', en: 'Unique wings to +3' }, text: { de: 'Sicher: 1,44 Mio. Kina, 12 Sync und 4.800 Enhance Stones pro Paar für +30 Flugkraft.', en: 'Safe: 1.44M Kina, 12 Sync and 4,800 Enhance Stones per pair for +30 Flight Power.' } },
            { title: { de: 'Unique +4 bis +10 zuletzt', en: 'Unique +4 to +10 last' }, text: { de: 'Im Schnitt ≈ 15,3 Mio. Kina und 125 Sync für +70 Flugkraft – viel Kina für wenig.', en: 'On average ≈ 15.3M Kina and 125 Sync for +70 Flight Power – a lot of Kina for little.' } },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Sync Stones (Unique) kommen aus den Expeditions-Dungeons, aus dem Umwandeln und aus dem Daeva Pass; sie sind gebunden und werden auch im Soul Binding gebraucht. Versiegelte Flügel in Enhance Stones umzuwandeln ist seit dem 7. Oktober auf 20 pro Woche begrenzt – für den ganzen Server.',
            en: 'Sync Stones (Unique) come from the Expedition dungeons, from conversion and from the Daeva Pass; they are bound and also needed for Soul Binding. Turning sealed wings into Enhance Stones is limited to 20 a week since 7 October – for the whole server.',
          },
        },
      ],
    },
    {
      title: { de: 'Der Flügel-Titel', en: 'The wings title' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: both('Dominator of Dimensions'), value: { de: 'Für 25 verschiedene Flügel (doppelte zählen nicht). Angelegt: HP +1.000, Verteidigung +340, PvE-Schadensresistenz +4,5 %. Im Besitz: PvE-Schadensresistenz +1 %.', en: 'For 25 different wings (duplicates don’t count). Equipped: HP +1,000, Defence +340, PvE Damage Tolerance +4.5%. Owned: PvE Damage Tolerance +1%.' } },
            { label: { de: 'Erreichbar?', en: 'Reachable?' }, value: { de: 'Es gibt genau 25 Paare mit Werten – du bräuchtest also alle, auch die aus dem Skin-Bundle und den versteckten Würfeln. Ob Shop- oder Aussehens-Flügel mitzählen, sagt keine Quelle.', en: 'There are exactly 25 pairs with stats – so you’d need all of them, including those from the skin bundle and the hidden cubes. Whether shop or looks-only wings count, no source says.' } },
          ],
        },
        { type: 'links', items: [{ href: '#/guides/titles-collections', label: { de: 'Titel, Kleiderschrank und Pantheon', en: 'Titles, Closet and Pantheon' } }] },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Für Werte im Shop gekauft** – Shop-Flügel haben keine.', en: '**Buying wings in the shop for stats** – shop wings have none.' },
            { de: '**Den getragenen Flügel verstärkt, um stärker zu werden** – Verstärken hebt nur die Wirkung im Besitz.', en: '**Enhancing your worn wings to get stronger** – enhancing only raises the owned effect.' },
            { de: '**Unique-Flügel früh über +3** – die teuren Versuche bringen nur ein wenig Flugkraft.', en: '**Taking Unique wings past +3 early** – the expensive attempts only add a little Flight Power.' },
            { de: '**Sync Stones für Flügel verbraucht, die du im Soul Binding brauchst** – erst die Ausrüstung.', en: '**Using Sync Stones on wings you need for Soul Binding** – gear first.' },
            { de: '**In Middle Reshanta abheben wollen** – dort geht nur Gleiten.', en: '**Trying to take off in Middle Reshanta** – only gliding works there.' },
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
            de: 'Korea hat weitere Flügel (etwa Eroded, Illusory Echo, Azure Flash), Flügel-Presets und neue Flügel aus den versteckten Würfeln; das Verstärken kam dort erst im Mai 2026. Videos aus Korea zeigen deshalb oft Flügel, die es auf Global nicht gibt.',
            en: 'Korea has more wings (such as Eroded, Illusory Echo, Azure Flash), wing presets and new wings from the hidden cubes; enhancing only arrived there in May 2026. Korean videos therefore often show wings that Global doesn’t have.',
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
            de: 'Offen sind: was Flugkraft in Sekunden oder Strecke bedeutet; wie viel Gleiten verbraucht und ob der Abyss weniger verbraucht; wo außer dem Abyss das Fliegen gesperrt ist; ob die Quest-Flügel nach dem Patch weiter +10 pro Stufe bekommen; das genaue Rezept der Dungeon-Flügel und ihre Drop-Chancen; die Shop-Preise; ob Extrahieren das Material zurückgibt; und ob Flügel-Stufen in die Kampfkraft eingehen. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Open are: what Flight Power means in seconds or distance; how much gliding uses and whether the Abyss uses less; where flying is blocked outside the Abyss; whether the quest wings still gain +10 per level after the patch; the exact recipe of the dungeon wings and their drop rates; the shop prices; whether extracting returns the materials; and whether wing levels count towards Combat Power. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/mounts-wings-guide', label: 'metabot.gg – Mounts & wings guide' },
            { href: 'https://metabot.gg/en/aion-2/wings', label: 'metabot.gg – Wing list' },
            { href: 'https://metabot.gg/en/aion-2/guides/wing-enhancement-guide', label: 'metabot.gg – Wing enhancement guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/abyss-pvp-guide', label: 'metabot.gg – Abyss & PvP guide (flight in the Abyss)' },
            { href: 'https://metabot.gg/en/aion-2/guides/titles-guide', label: 'metabot.gg – Titles guide' },
            { href: 'https://games.gg/aion-2/guides/aion-2-wings-list/', label: 'games.gg – Wings list' },
            { href: 'https://allthings.how/aion-2-how-to-increase-flight-power-and-stay-airborne-longer/', label: 'AllThings.How – Flight Power' },
            { href: 'https://allthings.how/aion-2-how-to-unlock-wings-and-find-their-sources/', label: 'AllThings.How – Wing sources' },
            { href: 'https://aion2.blog/wings/', label: 'aion2.blog – Wings' },
            { href: 'https://daevaguides.com/en/news/2026-10-09-maintenance-wing-flight-power/', label: 'daevaguides – Maintenance 9 Oct: wing Flight Power' },
            { href: 'https://daevaguides.com/en/news/2026-10-07-patch-notes/', label: 'daevaguides – Patch notes 7 Oct' },
            { href: 'https://daevaguides.com/en/news/2026-10-14-patch-notes-halloween/', label: 'daevaguides – Patch notes 14 Oct (Halloween)' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-09', label: 'AION2Hub – Global patch notes 9 Oct 2026' },
            { href: 'https://aion2.vi.ki/cash-shop-and-cosmetics', label: 'aion2.vi.ki – Cash shop and cosmetics' },
            { href: 'https://gameplay.tips/guides/aion-2-wings-guide.html', label: 'gameplay.tips – Wings guide (Korean data)' },
          ],
        },
      ],
    },
  ],
};
