import type { Guide } from '../types';

/**
 * Gathering (Essence Extraction) and the five crafting professions on the global client (October 2026).
 * - Gathering experience, skill points and skills: metabot.gg (read from the global client) and Fextralife (2026-10-09).
 * - Crafting experience per level and per recipe: Inven (KR, 2026-01-20 and 2026-04-09); the Novice total (8,809)
 *   matches metabot's global number, the Professional total (82,734) is within 0.1 % of it (82,680).
 * - Gathering points per material and area: counted from public/data/farm/gathering.json (Aion 2 – Map Overlay,
 *   CC BY-NC 4.0, 2026-10-12) – mapped spawn points, not nodes that are up at the same time.
 * - Market: NC's membership notice (via AION2Hub, 2026-07-08), games.gg (2026-10-08) and the 14 Oct patch.
 */

export const gatheringCrafting: Guide = {
  id: 'gathering-crafting',
  icon: 'craft',
  tone: 'green',
  category: 'world',
  title: {
    de: 'Sammeln & Handwerk: schnell leveln, gut sammeln',
    en: 'Gathering & crafting: level fast, gather well',
  },
  summary: {
    de: 'Wie Sammeln und die fünf Handwerksberufe zusammenhängen, wie du beide am schnellsten levelst, wohin deine Sammelpunkte gehören, wo die Rubine für den Aufstieg liegen und welche Fehler dich Zeit und Kinah kosten.',
    en: 'How gathering and the five crafting professions fit together, how to level both fastest, where your gathering points belong, where the rubies for the advancement are and which mistakes cost you time and Kinah.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Sammeln', en: 'Gathering' },
    { de: 'Handwerk', en: 'Crafting' },
    { de: 'Kinah', en: 'Kinah' },
  ],
  basis: {
    de: 'Client-Daten-Seiten und Community-Guides zum globalen Server (Oktober 2026), Erfahrungstabellen aus Korea (Inven) und die Sammelpunkte der Karten-Daten (Map Overlay, 12.10.2026)',
    en: 'Client-data pages and community guides for the global server (October 2026), experience tables from Korea (Inven) and the gathering points of the map data (Map Overlay, 2026-10-12)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '5', label: { de: 'Handwerksberufe', en: 'crafting professions' }, note: { de: 'ein Charakter kann alle lernen', en: 'one character can learn them all' }, tone: 'green' },
            { value: '27', label: { de: 'Arten von Vorkommen', en: 'kinds of gathering nodes' }, note: { de: 'eine einzige Fertigkeit für alle', en: 'one single skill for all of them' }, tone: 'teal' },
            { value: '100', label: { de: 'Höchste Meisterschaft (Global)', en: 'highest mastery (Global)' }, note: { de: 'Novice 1–50, Professional 51–100', en: 'Novice 1–50, Professional 51–100' }, tone: 'gold' },
            { value: { de: '0 Kinah', en: '0 Kinah' }, label: { de: 'Herstellungsgebühr', en: 'crafting fee' }, note: { de: 'du zahlst nur die Reagenzien beim Händler', en: 'you only pay for vendor reagents' }, tone: 'blue' },
          ],
        },
        {
          type: 'facts',
          items: [
            {
              label: { de: 'Sammeln', en: 'Gathering' },
              value: { de: 'Eine einzige Fertigkeit (**Essence Extraction**) für Erz, Edelsteine, Holz, Kräuter, Kochzutaten und Odyle', en: 'One single skill (**Essence Extraction**) for ore, gems, wood, herbs, cooking ingredients and Odyle' },
            },
            {
              label: { de: 'Handwerk', en: 'Crafting' },
              value: { de: '5 Berufe – Schmieden, Rüstungsschmieden, Handwerk, Alchemie, Kochen – jeder mit eigener Meisterschaft', en: '5 professions – blacksmithing, armorsmithing, handicrafting, alchemy, cooking – each with its own mastery' },
            },
            {
              label: { de: 'Meisterschaft', en: 'Mastery' },
              value: { de: 'Stufe 1–50 „Novice“, 51–100 „Professional“ – der Aufstieg bei 50 braucht eine Quest, sonst bleibt die Erfahrung stehen', en: 'Level 1–50 "Novice", 51–100 "Professional" – moving up at 50 needs a quest, otherwise experience stops' },
            },
            {
              label: { de: 'Limits', en: 'Limits' },
              value: { de: 'Keine Tages- oder Wochenlimits und keine Energie für Sammeln und Handwerk', en: 'No daily or weekly limits and no energy for gathering and crafting' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Das Wichtigste zuerst', en: 'Most important first' },
          text: {
            de: 'Auch **fehlgeschlagene Sammelversuche geben Erfahrung**. Sammle beim Questen also alles mit, was am Weg liegt – auch schwierige Vorkommen. Beim Handwerk gilt das Gegenteil: Ein Fehlschlag gibt nur 30 % der Erfahrung und frisst das Material.',
            en: '**Failed gathering attempts still give experience.** So pick up everything on your way while questing – even difficult nodes. Crafting is the opposite: a failure only gives 30% of the experience and eats the material.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Die Namen von Fertigkeiten, Skills und Quests stehen hier so, wie sie im englischen Client heißen. Im deutschen Client können sie anders lauten.',
            en: 'Skill, talent and quest names are given as they appear in the English client.',
          },
        },
      ],
    },
    {
      title: { de: 'Wie alles zusammenhängt', en: 'How it all fits together' },
      blocks: [
        {
          type: 'flow',
          title: { de: 'Vom Vorkommen zum fertigen Teil', en: 'From the node to the finished piece' },
          caption: {
            de: 'Jeder Schritt gibt Erfahrung im jeweiligen Beruf. Die Splendent-Chance von 25 % gilt für die meisten Ausrüstungs- und Trankrezepte (Essen 30 %, manche Manasteine 20 %).',
            en: 'Every step gives experience in its profession. The 25% Splendent chance applies to most gear and potion recipes (food 30%, some manastones 20%).',
          },
          items: [
            { title: { de: 'Sammeln', en: 'Gather' }, tag: 'Essence Extraction', text: { de: 'Erz, Edelsteine, Holz, Kräuter, Essen und Odyle – eine Fertigkeit', en: 'Ore, gems, wood, herbs, food and Odyle – one skill' }, tone: 'green' },
            { title: { de: 'Verarbeiten', en: 'Refine' }, text: { de: 'Erz → Ingot, Leder → Strong Leather, Kristall → Pulver: billig und gut zum Leveln', en: 'Ore → ingot, leather → Strong Leather, crystal → powder: cheap and good for levelling' }, tone: 'teal' },
            { title: { de: 'Herstellen', en: 'Craft' }, tag: 'Alt+G', text: { de: 'Ausrüstung, Tränke, Essen an der Werkbank', en: 'Gear, potions, food at the workbench' }, tone: 'blue' },
            { title: { de: 'Großer Erfolg', en: 'Great success' }, tag: '25 %', text: { de: 'Die **Splendent**-Version – Pflichtzutat für die nächste Stufe', en: 'The **Splendent** version – required for the next tier' }, tone: 'gold' },
            { title: { de: 'Nutzen oder abgeben', en: 'Use or turn in' }, text: { de: 'Tragen, nächste Sprosse, Supply Requests oder Markt', en: 'Wear it, next rung, Supply Requests or market' }, tone: 'slate' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Die Berufe: was sie machen, womit du levelst und das Testitem bei 50', en: 'The professions: what they make, what to level with and the test item at 50' },
          head: [{ de: 'Beruf', en: 'Profession' }, { de: 'Macht', en: 'Makes' }, { de: 'Leveln mit', en: 'Level with' }, { de: 'Testitem bei 50', en: 'Test item at 50' }],
          rows: [
            [
              { de: '**Schmieden**', en: '**Blacksmithing**' },
              { de: 'Großschwert, Langschwert, Dolch, Streitkolben, Guard, Ingots, Balaur-Hörner', en: 'Greatsword, longsword, dagger, mace, guard, ingots, Balaur horns' },
              { de: 'Orichalcum Ingot (2 Erz + Lösungsmittel für 400 Kinah)', en: 'Orichalcum Ingot (2 ore + solvent for 400 Kinah)' },
              { de: 'Hammer: 6 Ingots + 3 Odyle', en: 'Hammer: 6 ingots + 3 Odyle' },
            ],
            [
              { de: '**Rüstungsschmieden**', en: '**Armorsmithing**' },
              { de: 'Alle 7 Rüstungsteile, Balaur-Leder', en: 'All 7 armor pieces, Balaur leather' },
              { de: 'Ingot und Strong Leather (2 Raw Leather, ohne Reagenz)', en: 'Ingot and Strong Leather (2 Raw Leather, no reagent)' },
              { de: 'Stoff: 6 Ingots + 3 Odyle', en: 'Fabric: 6 ingots + 3 Odyle' },
            ],
            [
              { de: '**Handwerk**', en: '**Handicrafting**' },
              { de: 'Bogen, Stab, Ringe, Ohrringe, Halsketten, Armbänder', en: 'Bow, staff, rings, earrings, necklaces, bracelets' },
              { de: 'Sapphire Decoration und Yggdrasil Wood (je 400 Kinah Reagenz)', en: 'Sapphire Decoration and Yggdrasil Wood (400 Kinah reagent each)' },
              { de: 'Lupe: 4 Yggdrasil Wood + 2 Sapphire Decoration + 3 Odyle', en: 'Magnifying glass: 4 Yggdrasil Wood + 2 Sapphire Decoration + 3 Odyle' },
            ],
            [
              { de: '**Alchemie**', en: '**Alchemy**' },
              { de: 'Zauberbuch, Orb, Manasteine, Seelensteine, Tränke, Schriftrollen', en: 'Spellbook, orb, manastones, soulstones, potions, scrolls' },
              { de: 'Stufe 1–4 Magic Crystal, ab 5 Spiritstone Powder und Yggdrasil Paper (ohne Reagenz)', en: 'Level 1–4 Magic Crystal, from 5 Spiritstone Powder and Yggdrasil Paper (no reagent)' },
              { de: 'Waage: 6 Magic Crystal + 2 Spiritstone Powder + 3 Odyle', en: 'Scale: 6 Magic Crystal + 2 Spiritstone Powder + 3 Odyle' },
            ],
            [
              { de: '**Kochen**', en: '**Cooking**' },
              { de: 'Essen mit Werten für ein paar Minuten, White-Dragon-Gerichte ab 60, 75 und 90', en: 'Food with stats for a few minutes, White Dragon dishes from 60, 75 and 90' },
              { de: 'Teurer: ≈ 880–1.320 Kinah Reagenzien pro Herstellung', en: 'More expensive: ≈ 880–1,320 Kinah in reagents per craft' },
              '–',
            ],
            [
              { de: '**Sammeln**', en: '**Gathering**' },
              { de: 'Alle Rohstoffe', en: 'All raw materials' },
              { de: 'Alles mitnehmen, was am Weg liegt', en: 'Everything on your way' },
              { de: 'Splendent Ruby (Bound)', en: 'Splendent Ruby (Bound)' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Konzentrier dich am Anfang auf **einen** Beruf – am meisten bringt der, der die Waffe deiner Klasse herstellt. Das Testitem für den Aufstieg legst du vor Meisterschaft 50 zur Seite, dann geht es ohne Pause weiter.',
            en: 'Focus on **one** profession at the start – the one that makes your class weapon pays off most. Put the test item for the advancement aside before mastery 50 so there is no break.',
          },
        },
      ],
    },
    {
      title: { de: 'So funktioniert Sammeln', en: 'How gathering works' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: 'Am Vorkommen mit **F** interagieren. Es startet ein kleines Minispiel: Abwechselnd füllen sich eine **Erfolgs-** und eine **Fehlschlagleiste** – die Leiste, die zuerst voll ist, entscheidet.', en: 'Interact with a node using **F**. A small mini-game starts: a **success** and a **failure** bar fill in turns – whichever fills first decides.' },
            { de: 'Ein Vorkommen hält **2–4 Versuche**, dann ist es leer – Fehlschläge zählen mit. Brich einen schlechten Versuch nicht ab: Abbrechen kann den Versuch ohne Belohnung kosten.', en: 'A node lasts **2–4 attempts**, then it is used up – failures count too. Don’t cancel a bad attempt: cancelling can cost the attempt with no reward.' },
            { de: 'Wirst du von einem Monster getroffen, bricht das Sammeln ab und der Versuch ist weg. **Räum die Gegend vorher frei.**', en: 'Getting hit by a monster interrupts gathering and the attempt is lost. **Clear the area first.**' },
            { de: 'Vorkommen gehören allen Spielern gemeinsam und erscheinen nach einigen Minuten wieder.', en: 'Nodes are shared by all players and respawn after a few minutes.' },
            { de: '**Odyle** schwebt in der Luft und wird im Flug gesammelt. In den Einstellungen gibt es dafür automatisches Fliegen. Achte auf deine Flugkraft – geht sie aus, bricht der Versuch ab oder du stürzt.', en: '**Odyle** floats in the air and is gathered while flying. The settings have an automatic flight option for it. Watch your flight power – if it runs out, the attempt fails or you fall.' },
            { de: '**Qualitäten:** Erz, Edelsteine, Holz und Odyle gibt es als Standard, Fine, Pure und Radiant, Kräuter normal und Fresh. Radiant ist das, was Dragon Lord braucht.', en: '**Grades:** ore, gems, wood and Odyle come as standard, Fine, Pure and Radiant, herbs as normal and Fresh. Radiant is what Dragon Lord needs.' },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Sammelpunkte in Verteron und Altgard', en: 'Gathering points in Verteron and Altgard' },
          caption: {
            de: 'Gezählt aus den Karten-Daten der Seite (Map Overlay, CC BY-NC 4.0, 12.10.2026): Orte, an denen ein Vorkommen erscheinen kann – nicht alle sind gleichzeitig da. Holz ist am seltensten: Handwerker brauchen früh **Seeker** für Holz.',
            en: 'Counted from the site’s map data (Map Overlay, CC BY-NC 4.0, 12 Oct 2026): places where a node can spawn – not all are up at the same time. Wood is the rarest: handicrafters need **Seeker** for wood early.',
          },
          unit: { de: 'Punkte', en: 'points' },
          items: [
            { label: 'Odyle', value: 1356, note: { de: 'Verteron 706 · Altgard 650', en: 'Verteron 706 · Altgard 650' }, tone: 'violet' },
            { label: { de: 'Edelsteine', en: 'Gems' }, value: 1170, note: { de: 'Diamant, Rubin, Saphir · 580 · 590', en: 'Diamond, ruby, sapphire · 580 · 590' }, tone: 'rose' },
            { label: { de: 'Erz', en: 'Ore' }, value: 1076, note: 'Orichalcum · 546 · 530', tone: 'slate' },
            { label: { de: 'Kochzutaten', en: 'Cooking ingredients' }, value: 1006, note: '500 · 506', tone: 'gold' },
            { label: { de: 'Kräuter', en: 'Herbs' }, value: 534, note: '276 · 258', tone: 'green' },
            { label: { de: 'Holz', en: 'Wood' }, value: 283, note: { de: 'Yggdrasil 125 · Asvata 158', en: 'Yggdrasil 125 · Asvata 158' }, tone: 'teal' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/farm/verteron', label: { de: 'Sammelkarte Verteron', en: 'Gathering map Verteron' } },
            { href: '#/farm/altgard', label: { de: 'Sammelkarte Altgard', en: 'Gathering map Altgard' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Sammeln schnell leveln', en: 'Level gathering fast' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Beim Questen alles mitnehmen', en: 'Gather everything while questing' },
              text: { de: 'Sammeln geht früh, spätestens ab Charakterstufe 10. Nimm jedes Vorkommen auf deinem Weg mit. Weil auch Fehlschläge Erfahrung geben, lohnen sich auch schwere Vorkommen. Bis Novice 50 brauchst du nur 2.127 Erfahrung – das schaffst du nebenbei.', en: 'Gathering opens early, at the latest from character level 10. Take every node on your way. Since failures give experience too, difficult nodes are worth it as well. Novice 50 only needs 2,127 experience – you get there on the side.' },
            },
            {
              title: { de: 'Allgemeine Punkte: Erfolg, dann weniger Fehlschlag, dann Glück', en: 'Common points: success, then less failure, then luck' },
              text: { de: '**Proficient Handling** füllt die Erfolgsleiste schneller (+5 pro Stufe, +50 auf Stufe 10), **Delicate Touch** bremst die Fehlschlagleiste (−8 pro Stufe, −80). **Lady Luck** (Chance, die Erfolgsleiste ×2,5 bzw. ab Stufe 6 ×4 zu füllen) kommt zuletzt: Sie greift nur, wenn die Fehlschlagleiste schon halb voll ist. Stufe 6–10 brauchen „Professional“.', en: '**Proficient Handling** fills the success bar faster (+5 per level, +50 at level 10), **Delicate Touch** slows the failure bar (−8 per level, −80). **Lady Luck** (a chance to boost the success bar ×2.5, or ×4 from level 6) comes last: it only triggers once the failure bar is half full. Levels 6–10 need "Professional".' },
            },
            {
              title: { de: 'Spezialpunkte: Seeker zuerst, dann höchstens zwei Familien', en: 'Special points: Seeker first, then two families at most' },
              text: { de: '**Seeker** (1 Punkt) zeigt die Vorkommen einer Familie auf der Minikarte – nimm ihn früh für dein Hauptmaterial und für Edelsteine (Rubin-Aufstieg). **Plentiful Harvest** (10/20/30 % doppelte Ausbeute) und **Appraiser** (10/20/30 % Chance, die Qualität neu zu würfeln) kosten je 3. Mit 14 Punkten reicht es für zwei volle Familien – nicht verteilen. Zurücksetzen kostet 50.000 Kinah.', en: '**Seeker** (1 point) shows a family’s nodes on the minimap – take it early for your main material and for gems (ruby advancement). **Plentiful Harvest** (10/20/30% double yield) and **Appraiser** (10/20/30% chance to reroll the grade) cost 3 each. 14 points are enough for two full families – don’t spread them. A reset costs 50,000 Kinah.' },
            },
            {
              title: { de: 'Feste Runden laufen', en: 'Run fixed loops' },
              text: { de: 'Die meisten Sammelpunkte haben **Verteron** (Elyos) und **Altgard** (Asmodier), Odyle gibt es auch in Chaotic Lower Reshanta. Lauf Kreisrouten zwischen dichten Gruppen und wechsle in Kanäle mit wenig Betrieb. Die Sammelkarte zeigt jeden Punkt.', en: '**Verteron** (Elyos) and **Altgard** (Asmodians) have the most gathering spots, Odyle is also in Chaotic Lower Reshanta. Run loops between dense clusters and switch to quiet channels. The gathering map shows every point.' },
            },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Sammelpunkte: was du bekommst und was alles kosten würde', en: 'Gathering points: what you get and what maxing everything would cost' },
          caption: {
            de: 'Globaler Client (metabot.gg, Fextralife): bis Stufe 100 gibt es 95 allgemeine (45 als Novice, 50 als Professional) und 14 Spezialpunkte (6 + 8). Alles voll geht nicht – zwei allgemeine Skills auf 10 (80 Punkte), der Rest in den dritten.',
            en: 'Global client (metabot.gg, Fextralife): up to level 100 you get 95 common (45 as Novice, 50 as Professional) and 14 special points (6 + 8). Maxing everything is impossible – two common skills to 10 (80 points), the rest into the third.',
          },
          unit: { de: 'Punkte', en: 'points' },
          items: [
            { label: { de: 'Allgemein: bekommst du', en: 'Common: you get' }, value: 95, tone: 'blue' },
            { label: { de: 'Allgemein: alles auf 10', en: 'Common: all to 10' }, value: 120, note: { de: '3 Skills × 40', en: '3 skills × 40' }, tone: 'rose' },
            { label: { de: 'Spezial: bekommst du', en: 'Special: you get' }, value: 14, tone: 'teal' },
            { label: { de: 'Spezial: alle Familien voll', en: 'Special: every family full' }, value: 42, note: { de: '6 Familien × 7', en: '6 families × 7' }, tone: 'rose' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Erfahrung', en: 'Experience' }, value: { de: 'Novice 2.127 · Professional 5.077 · zusammen 7.204 – fast 13-mal weniger als ein Handwerksberuf', en: 'Novice 2,127 · Professional 5,077 · together 7,204 – almost 13 times less than one crafting profession' } },
            { label: { de: 'Ab „Professional“', en: 'From "Professional"' }, value: { de: 'Allgemeine Skills ab Stufe 6 und Spezialskills ab Stufe 2', en: 'General skills from level 6 and special skills from level 2' } },
            { label: { de: 'Sperre', en: 'Restriction' }, value: { de: 'Wer lange stur an einer Stelle sammelt, bekommt „Essence Extraction has been restricted due to repetitive behavior“', en: 'Gathering stubbornly in one spot for long gives "Essence Extraction has been restricted due to repetitive behavior"' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Aufstieg zum Professional: der Splendent Ruby', en: 'Advancing to Professional: the Splendent Ruby' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Den Quest-NPC zuerst ansprechen', en: 'Talk to the quest NPC first' },
              text: { de: 'Bei Novice 50 öffnet sich **„[Upgrade] Essence Extraction Specialty Skill“**: **Korius** in der Dawn Legion Base (Elyos, Verteron) bzw. **Alzirr** im Graverobber Campsite (Asmodier, Altgard). Empfohlen ist Charakterstufe 45, blockiert wird aber nicht. In Korea ließ sich der Rubin erst nach dem Gespräch sammeln.', en: 'At Novice 50 **"[Upgrade] Essence Extraction Specialty Skill"** opens: **Korius** in the Dawn Legion Base (Elyos, Verteron) or **Alzirr** at the Graverobber Campsite (Asmodians, Altgard). Character level 45 is recommended but nothing blocks you. In Korea the ruby could only be gathered after talking to them.' },
            },
            {
              title: { de: 'Seeker für Edelsteine nehmen', en: 'Take Seeker for gems' },
              text: { de: '1 Spezialpunkt – dann siehst du die Rubin-Vorkommen auf der Minikarte.', en: '1 special point – then you see the ruby nodes on the minimap.' },
            },
            {
              title: { de: 'Rubine sammeln, bis der Splendent Ruby fällt', en: 'Gather rubies until the Splendent Ruby drops' },
              text: { de: 'Jedes Rubin-Vorkommen kann ihn als seltenes Extra geben. Ein **Radiant Ruby** zählt nicht – du brauchst den **Splendent Ruby (Bound)**.', en: 'Any ruby node can give it as a rare extra. A **Radiant Ruby** does not count – you need the **Splendent Ruby (Bound)**.' },
            },
            {
              title: { de: 'Abgeben', en: 'Hand it in' },
              text: { de: 'Du bekommst „Professional“ und die Pantheon-Deko Artisan Essence Extractor (Wisdom +2, Destiny +2). Die Punkte laufen weiter.', en: 'You get "Professional" and the Pantheon decoration Artisan Essence Extractor (Wisdom +2, Destiny +2). Points start coming again.' },
            },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Wo die Rubine liegen', en: 'Where the rubies are' },
          caption: {
            de: 'Rubin-Punkte der drei dichtesten Gebiete je Fraktion, von 196 in Verteron und 190 in Altgard (Karten-Daten, Map Overlay, 12.10.2026). Bei den Asmodiern liegt gut die Hälfte in den Basfelt Ruins – der oft genannte Calderon Canyon hat nur 18.',
            en: 'Ruby points of the three densest areas per faction, of 196 in Verteron and 190 in Altgard (map data, Map Overlay, 12 Oct 2026). For Asmodians about half are in the Basfelt Ruins – the often named Calderon Canyon has only 18.',
          },
          unit: { de: 'Punkte', en: 'points' },
          items: [
            { label: 'Garden of the Illusion God', value: 66, note: 'Elyos · Verteron', tone: 'blue' },
            { label: 'Verteron Fortress Ruins', value: 42, note: 'Elyos · Verteron', tone: 'blue' },
            { label: 'Southern Altamia Highland', value: 39, note: 'Elyos · Verteron', tone: 'blue' },
            { label: 'Basfelt Ruins', value: 97, note: { de: 'Asmodier · Altgard', en: 'Asmodians · Altgard' }, tone: 'rose' },
            { label: 'Dredgion Crash Site', value: 24, note: { de: 'Asmodier · Altgard', en: 'Asmodians · Altgard' }, tone: 'rose' },
            { label: 'Tranein Highland', value: 24, note: { de: 'Asmodier · Altgard', en: 'Asmodians · Altgard' }, tone: 'rose' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/farm/verteron', label: { de: 'Rubine auf der Karte: Verteron', en: 'Rubies on the map: Verteron' } },
            { href: '#/farm/altgard', label: { de: 'Rubine auf der Karte: Altgard', en: 'Rubies on the map: Altgard' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Handwerk schnell leveln', en: 'Level crafting fast' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Handwerk wird ab **Charakterstufe 10** freigeschaltet. Die Werkbänke stehen bei den Elyos in der Dawn Legion Base und in Zumion Village (Verteron), bei den Asmodiern in Safe Haven und in der Nornir Assembly (Altgard). Öffnen mit **Alt+G**. Herstellen kostet keine Gebühr – nur die Reagenzien beim Berufshändler.',
            en: 'Crafting unlocks at **character level 10**. Workbenches: Elyos in the Dawn Legion Base and Zumion Village (Verteron), Asmodians in Safe Haven and the Nornir Assembly (Altgard). Open with **Alt+G**. Crafting has no fee – you only pay for reagents at the profession vendor.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Einen Beruf wählen – Waffe deiner Klasse zuerst', en: 'Pick one profession – your class weapon first' },
              text: { de: 'Die seltenen Zutaten reichen nicht für alle Berufe gleichzeitig. Der zweite Beruf ist meist Handwerk für den Schmuck.', en: 'The rare ingredients don’t stretch to every profession at once. The second profession is usually handicrafting for the jewelry.' },
            },
            {
              title: { de: 'Einzeln herstellen, nicht im x10-Paket', en: 'Craft one at a time, not in x10 batches' },
              text: { de: '10 einzelne Ingots geben **200** Erfahrung, ein x10-Rezept nur **112**; 10 Herstellungen Spiritstone Powder (je 3 Stück) geben 240, ein x30-Rezept 112. Die Pakete sparen nur Zeit.', en: '10 single ingots give **200** experience, one x10 recipe only **112**; 10 crafts of Spiritstone Powder (3 each) give 240, one x30 recipe 112. Batches only save time.' },
            },
            {
              title: { de: 'Billige Zwischenmaterialien bis 50', en: 'Cheap intermediates up to 50' },
              text: { de: 'Bis Meisterschaft 50 gibt ein niedriges Rezept weiter die volle Erfahrung: Von 5 auf 50 sind es ≈ 363 Herstellungen Spiritstone Powder. Ab Stufe 21 braucht jede Stufe deutlich mehr (113 statt 72 Erfahrung) – plane das Material ein.', en: 'Up to mastery 50 a low recipe still gives full experience: 5 to 50 takes about 363 Spiritstone Powder crafts. From level 21 each level needs much more (113 instead of 72 experience) – plan the material for it.' },
            },
            {
              title: { de: 'Bei Meisterschaft 50 aufsteigen', en: 'Advance at mastery 50' },
              text: { de: 'Bei 50 stoppt die Erfahrung. Die Aufstiegsquest startet von selbst: Du stellst das Testitem her (Tabelle oben). Danach wird es teuer: 51–100 braucht 82.734 Erfahrung, über neunmal so viel wie 1–50.', en: 'At 50 experience stops. The advancement quest starts by itself: you craft the test item (table above). After that it gets expensive: 51–100 needs 82,734 experience, more than nine times as much as 1–50.' },
            },
            {
              title: { de: 'Splendent-Teile behalten', en: 'Keep Splendent items' },
              text: { de: 'Ein großer Erfolg ergibt die **Splendent**-Version eines Gegenstands. Die brauchst du als Pflichtzutat für die nächste Stufe – nicht verkaufen oder zerlegen.', en: 'A great success gives the **Splendent** version of an item. You need it as a required ingredient for the next tier – do not sell or dismantle it.' },
            },
          ],
        },
        {
          type: 'line',
          title: { de: 'Wie viel Erfahrung bis zu jeder Stufe', en: 'How much experience to each level' },
          caption: {
            de: 'Handwerk: koreanische Tabelle (Inven, 20.1.2026), die Summen passen zu den globalen Client-Daten (metabot). Sammeln: globaler Client (metabot). Bis 50 ist beides schnell – danach zieht das Handwerk davon. Fahr mit der Maus oder den Pfeiltasten über die Linien.',
            en: 'Crafting: Korean table (Inven, 20 Jan 2026), its totals match the global client data (metabot). Gathering: global client (metabot). Both are quick up to 50 – after that crafting runs away. Hover or use the arrow keys on the lines.',
          },
          x: { label: { de: 'Meisterschaft', en: 'Mastery' }, ticks: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'] },
          y: { label: { de: 'Erfahrung insgesamt', en: 'Total experience' } },
          series: [
            { label: { de: 'Ein Handwerksberuf', en: 'One crafting profession' }, values: [294, 824, 2144, 4487, 8809, 14947, 24284, 38187, 59319, 91543], tone: 'gold' },
            { label: { de: 'Sammeln', en: 'Gathering' }, values: [210, 529, 935, 1457, 2127, 2869, 3796, 4821, 5953, 7204], tone: 'green', dashed: true },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Erfahrung pro gelungener Herstellung', en: 'Experience per successful craft' },
          caption: {
            de: 'Koreanische Werte (Inven, April 2026). Ein Fehlschlag gibt 30 %, ein Combo-Erfolg 130 %. Die Balaur-Hörner ab Meisterschaft 51 geben 383–868. Darum: billige Rezepte zum Leveln, die Ausrüstungs-Stufen für die Splendent-Kette.',
            en: 'Korean values (Inven, April 2026). A failure gives 30%, a combo success 130%. The Balaur horns from mastery 51 give 383–868. So: cheap recipes for levelling, the gear tiers for the Splendent chain.',
          },
          unit: { de: 'Erfahrung', en: 'experience' },
          items: [
            { label: 'Orichalcum Ingot · Magic Crystal', value: 20, note: { de: 'ab Meisterschaft 1', en: 'from mastery 1' }, tone: 'slate' },
            { label: 'Spiritstone Powder', value: 24, note: { de: 'Alchemie, ab 5', en: 'alchemy, from 5' }, tone: 'slate' },
            { label: 'Intermediate Manastone', value: 60, note: { de: 'Alchemie, ab 20', en: 'alchemy, from 20' }, tone: 'teal' },
            { label: 'Intermediate Soulstone', value: 74, note: { de: 'Alchemie', en: 'alchemy' }, tone: 'teal' },
            { label: 'Orichalcum Guard', value: 84, note: { de: 'Orichalcum-Stufe', en: 'Orichalcum tier' }, tone: 'blue' },
            { label: 'Expert’s Orichalcum Guard', value: 240, note: { de: 'ab 15', en: 'from 15' }, tone: 'blue' },
            { label: 'Artisan’s Orichalcum Guard', value: 600, note: { de: 'ab 30', en: 'from 30' }, tone: 'gold' },
          ],
        },
        {
          type: 'list',
          items: [
            { de: 'Die **Erfolgschance** liegt an der Rezeptstufe bei 67,5 % (Dragon Lord) bis 79,6 % (Artisan’s) und steigt mit höherer Meisterschaft bis 93–97 %. Ein Fehlschlag verbraucht die Materialien.', en: 'The **success chance** is 67.5% (Dragon Lord) to 79.6% (Artisan’s) at recipe level and rises with higher mastery up to 93–97%. A failure uses up the materials.' },
            { de: 'Ein Treffer während des Herstellens zählt als Fehlschlag – **stell nur an sicheren Orten her**.', en: 'Getting hit while crafting counts as a failure – **only craft in safe places**.' },
            { de: 'Reagenzien gibt es beim Berufshändler in den großen Städten, mit Special-Quai-Abo auch im Wind-Breeze-Shop. Sie sind immer gebunden.', en: 'Reagents are sold by the profession vendors in the big cities, with the Special Quai membership also in the Wind Breeze shop. They are always bound.' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/crafting-gear', label: { de: 'Waffen & Rüstung bis Dragon Lord herstellen', en: 'Craft weapons & armor up to Dragon Lord' }, primary: true },
          ],
        },
      ],
    },
    {
      title: { de: 'Twinks und Berufe', en: 'Alts and professions' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Mehrere Charaktere auf einem Server ändern beim Handwerk weniger, als man denkt. Was bekannt ist:',
            en: 'Several characters on one server change less about crafting than you might think. What is known:',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Meisterschaft zählt pro Charakter** – keine Quelle sagt, dass sie geteilt wird. Ein Twink fängt bei 1 an. Alle Berufe auf **einem** Charakter zu leveln spart doppelte Reagenzien und doppelte Wege.', en: '**Mastery counts per character** – no source says it is shared. An alt starts at 1. Levelling every profession on **one** character saves double reagents and double trips.' },
            { de: '**Sammeln auf Twinks** lohnt nebenbei: Jeder Charakter hat seine eigene Essence Extraction. Handelbare Materialien schickst du über das Server-Lager zum Main.', en: '**Gathering on alts** pays on the side: every character has its own Essence Extraction. Send tradeable materials to the main through server storage.' },
            { de: '**Supply Requests zählen pro Charakter** – Twinks können normale Herstellungen abgeben.', en: '**Supply Requests count per character** – alts can turn in normal crafts.' },
            { de: '**Transfer-Ergebnisse sind an den Hersteller gebunden:** Die Dragon-Lord-Transfers macht immer der Charakter, der das Teil trägt.', en: '**Transfer results are bound to the crafter:** the Dragon Lord transfers are always done by the character who wears the piece.' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/multi-characters', label: { de: 'Mehrere Charaktere spielen', en: 'Playing several characters' }, primary: true },
          ],
        },
      ],
    },
    {
      title: { de: 'Kinah & Markt', en: 'Kinah & market' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: 'Den **Markt** gibt es ab Charakterstufe 45 und laut NC nur mit **Special-Quai-Abo** (14,99 $ für 30 Tage). Kaufen geht sicher nur mit Abo; ob du ohne Abo einstellen kannst, sagen die Guides unterschiedlich. Die Gebühr nennen Guides mit ≈ 10 %.', en: 'The **market** opens at character level 45 and according to NC only with the **Special Quai membership** ($14.99 for 30 days). Buying definitely needs it; guides disagree on whether you can list without it. Guides name a fee of about 10%.' },
            { de: 'Direkter Handel zwischen Spielern ist auf Global abgeschaltet – der Markt ist der einzige Weg zu handelbaren Kinah aus Materialien.', en: 'Direct trading between players is switched off on Global – the market is the only way to turn materials into tradeable Kinah.' },
            { de: 'Verkäufe an Händler bringen nur **gebundene** Kinah.', en: 'Selling to vendors only gives **bound** Kinah.' },
            { de: 'Odyle ist beim Händler etwa viermal so viel wert wie andere Materialien und lässt sich 1:1 in gebundenes Erz, Edelsteine oder Holz gleicher Qualität umwandeln.', en: 'Odyle sells for about four times as much as other materials at vendors and converts 1:1 into bound ore, gems or wood of the same quality.' },
            { de: 'Alchemie-Verarbeitung (Pulver, Papier) verdreifacht etwa den Händlerpreis der Rohstoffe.', en: 'Alchemy processing (powder, paper) roughly triples the vendor price of the raw materials.' },
            { de: '**Seit dem Patch vom 14.10.:** Das Einstellen von Sammelmaterialien auf dem Markt wird abhängig von deiner Spielhistorie eingeschränkt (gegen Bots). Genaue Regeln nennt der Patch nicht.', en: '**Since the 14 Oct patch:** listing gathered materials on the market is restricted based on your play history (against bots). The patch does not give exact rules.' },
          ],
        },
        {
          type: 'compare',
          title: { de: 'Wohin mit deinen Materialien?', en: 'Where do your materials go?' },
          caption: {
            de: 'Händlerwerte und Markt-Regeln aus Community-Guides und dem Patch vom 14.10.2026; Preisbeispiel vom 5.10.2026.',
            en: 'Vendor values and market rules from community guides and the 14 Oct 2026 patch; price example from 5 Oct 2026.',
          },
          items: [
            {
              title: { de: 'An den Händler', en: 'To the vendor' },
              tag: { de: 'immer möglich', en: 'always possible' },
              tone: 'slate',
              points: [
                { kind: 'pro', text: { de: 'Ohne Abo, ohne Gebühr, ohne Wartezeit', en: 'No membership, no fee, no waiting' } },
                { kind: 'pro', text: { de: 'Odyle ×4 wert, Alchemie-Verarbeitung ×3', en: 'Odyle worth ×4, alchemy processing ×3' } },
                { kind: 'con', text: { de: 'Nur gebundene Kinah', en: 'Bound Kinah only' } },
              ],
              verdict: { de: 'Für Reste und alles, was gebundene Kinah bezahlen können.', en: 'For leftovers and anything bound Kinah can pay for.' },
            },
            {
              title: { de: 'Auf den Markt', en: 'On the market' },
              tag: { de: 'handelbare Kinah', en: 'tradeable Kinah' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Handelbare Kinah – damit kaufst du Ausrüstung und Zwischenstufen', en: 'Tradeable Kinah – that buys gear and intermediates' } },
                { kind: 'pro', text: { de: 'Radiant-Material ist gefragt: Radiant Odyle steckt in 190 Rezepten', en: 'Radiant material is in demand: Radiant Odyle is in 190 recipes' } },
                { kind: 'con', text: { de: 'Ab Stufe 45, Abo nötig, Gebühr, Sammelmaterial seit 14.10. eingeschränkt', en: 'Level 45+, membership, fee, gathered materials restricted since 14 Oct' } },
              ],
              verdict: { de: 'Für Überschuss an gefragtem Material, wenn du das Abo hast.', en: 'For surplus of sought-after material if you have the membership.' },
            },
            {
              title: { de: 'Selbst verarbeiten', en: 'Craft it yourself' },
              tag: { de: 'Erfahrung + Ausrüstung', en: 'experience + gear' },
              tone: 'green',
              points: [
                { kind: 'pro', text: { de: 'Meisterschaft und deine eigene Splendent-Kette', en: 'Mastery and your own Splendent chain' } },
                { kind: 'pro', text: { de: 'Normale Ergebnisse gehen in die Supply Requests', en: 'Normal results go into Supply Requests' } },
                { kind: 'con', text: { de: 'Nicht gratis: Ein Splendent Orichalcum Longsword kostete selbst gemacht ≈ 223.000, gekauft ≈ 100.000 Kinah', en: 'Not free: a Splendent Orichalcum Longsword cost ≈ 223,000 Kinah to craft, ≈ 100,000 to buy' } },
              ],
              verdict: { de: 'Für deine eigene Kette – aber vorher die Marktpreise prüfen.', en: 'For your own chain – but check market prices first.' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Erst rechnen, dann herstellen', en: 'Calculate first, craft second' },
          text: {
            de: 'Selbst gesammeltes Material ist nicht „gratis“ – du könntest es auch verkaufen. Rechne mit dem, was es auf dem Markt bringt, nicht mit null.',
            en: 'Material you gathered yourself is not "free" – you could sell it instead. Count it at what it fetches on the market, not at zero.',
          },
        },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'checklist',
          items: [
            { de: 'Splendent-Teile nicht verkaufen oder zerlegen', en: 'Do not sell or dismantle Splendent items' },
            { de: 'Sammelpunkte nicht wahllos verteilen – Spezialpunkte reichen für zwei Familien', en: 'Do not spend gathering points at random – special points cover two families' },
            { de: 'Lady Luck nicht zuerst nehmen – sie greift erst bei halb voller Fehlschlagleiste', en: 'Do not take Lady Luck first – it only triggers with a half-full failure bar' },
            { de: 'Einen schlechten Sammelversuch nicht abbrechen', en: 'Do not cancel a bad gathering attempt' },
            { de: 'Zum Leveln keine x10-Pakete herstellen', en: 'Do not level with x10 batches' },
            { de: 'Bei Novice 50 nicht weiter herstellen, ohne aufzusteigen – die Erfahrung verfällt', en: 'Do not keep crafting at Novice 50 without advancing – the experience is lost' },
            { de: 'Odyle (Material) nicht mit Odyle-Energie (Dungeon-System) verwechseln', en: 'Do not confuse Odyle (material) with Odyle energy (dungeon system)' },
            { de: 'Beim Odyle-Sammeln genug Flugkraft für den Rückweg lassen', en: 'Keep enough flight power for the way back when gathering Odyle' },
            { de: 'Keine Bots oder Makros zum Sammeln – es gibt Prüfungen bei langem Sammeln an einer Stelle', en: 'No bots or macros for gathering – there are checks when gathering in one spot for long' },
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
            de: 'Diese Punkte sind für den globalen Server noch nicht eindeutig belegt: wie lange Vorkommen zum Wiedererscheinen brauchen, wie viel Erfahrung ein Vorkommen gibt, wie oft der Splendent Ruby fällt, ob die Handwerks-Erfahrung pro Rezept genau der koreanischen entspricht (die Kurve passt), ob Rezepte weit unter deiner Meisterschaft noch Erfahrung geben (ein Guide nennt 40 Stufen), ob du ohne Abo auf dem Markt einstellen kannst und wie hoch die Gebühr ist. Geklärt: Sammeln ist früh offen – die oft genannte Stufe 45 ist nur die Empfehlung für den Aufstieg. Wenn du es im Spiel herausfindest, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'These points are not clearly confirmed for the global server yet: node respawn times, experience per node, the drop rate of the Splendent Ruby, whether crafting experience per recipe is exactly the Korean one (the curve matches), whether recipes far below your mastery still give experience (one guide names 40 levels), whether you can list on the market without the membership and how high the fee is. Settled: gathering opens early – the often quoted level 45 is only the recommendation for the advancement. If you find out in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/crafting-guide', label: 'metabot.gg – Crafting guide (global client data)' },
            { href: 'https://metabot.gg/en/aion-2/gathering', label: 'metabot.gg – Gathering (skills, experience, points)' },
            { href: 'https://metabot.gg/en/aion-2/guides/kinah-farming-guide', label: 'metabot.gg – Kinah farming' },
            { href: 'https://aion2.gaming.tools/guides/crafting', label: 'aion2.gaming.tools – Crafting (global)' },
            { href: 'https://aion2.wiki.fextralife.com/Gathering', label: 'Fextralife wiki – Gathering' },
            { href: 'https://aion2.wiki.fextralife.com/Crafting', label: 'Fextralife wiki – Crafting' },
            { href: 'https://allthings.how/aion-2-how-to-upgrade-essence-extraction-to-professional/', label: 'allthings.how – Essence Extraction to Professional' },
            { href: 'https://aion2atlas.app/guides/essence-extraction/', label: 'aion2atlas – Essence Extraction' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1161', label: 'Inven (KR) – Crafting experience per level' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1624', label: 'Inven (KR) – Experience per recipe (April 2026)' },
            { href: 'https://github.com/problem-xyz/aion2-map-overlay', label: 'Aion 2 – Map Overlay (gathering points, CC BY-NC 4.0)' },
            { href: 'https://games.gg/aion-2/guides/aion-2-market-guide/', label: 'games.gg – Market guide' },
            { href: 'https://aion2hub.com/news/aion-2-monetization-plan-revealed', label: 'AION2Hub – NC’s membership and market notice' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-14', label: 'AION2Hub – Global patch notes 14 Oct 2026' },
            { href: 'https://aion2.plaync.com/en-us/board/update/view?articleId=6acf20d007b77e214688a7ac', label: 'NCSOFT – Global patch notes 13/14 Oct 2026' },
          ],
        },
      ],
    },
  ],
};
