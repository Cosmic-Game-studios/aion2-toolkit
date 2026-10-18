import type { Guide } from '../types';

/**
 * Crafted gear on the global client (October 2026).
 * - Recipes, item levels, success chances: Fextralife (2026-10-09) and metabot.gg (global client data, updated
 *   2026-10-15); the transfer recipes from aion2hub's crafting calculator and wikily (Splendent Wise: the mace recipe –
 *   the weapon recipes of one tier list the same inputs).
 * - Experience per mastery level and per recipe: Inven (KR, 2026-01-20 and 2026-04-09). The Novice total (8,809) is the
 *   same as metabot's global number, the Professional total (82,734) is within 0.1 % of it (82,680).
 * - The Splendent model ("crafts behind one Splendent piece") is worked out, not measured: chance per attempt =
 *   success × 25 % × success again (Fextralife: the combo rolls for success once more), with Fextralife's chances at
 *   recipe level (74 / 76.8 / 79.6 %) and at the cap (93.1 / 94.6 / 96.8 %). Inven's 4,000-craft test fits that rule.
 * - The top-80 numbers are counted from public/data/top (AION2 Index, 2026-10-18).
 * Wise / White Dragon Lord are the Elyos names, Ebony / Dark Dragon Lord the Asmodian names of the same items.
 */

export const craftingGear: Guide = {
  id: 'crafting-gear',
  icon: 'craft',
  tone: 'gold',
  category: 'world',
  title: {
    de: 'Handwerk: Waffen & Rüstung bis Dragon Lord',
    en: 'Crafting gear: weapons & armor up to Dragon Lord',
  },
  summary: {
    de: 'Welcher Beruf welche Waffe und Rüstung herstellt, warum die Splendent-Kette so teuer wird, der schnellste Weg auf Meisterschaft 55/60/80 und die ganze Kette vom Orichalcum-Schwert bis zum Dragon-Lord-Teil auf Stufe 102 – mit Rechenmodell, Materiallisten und dem, was die Top 80 tragen.',
    en: 'Which profession makes which weapon and armor, why the Splendent chain gets so expensive, the fastest way to mastery 55/60/80 and the whole chain from the Orichalcum sword to the item level 102 Dragon Lord piece – with a cost model, material lists and what the top 80 wear.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Handwerk', en: 'Crafting' },
    { de: 'Waffen', en: 'Weapons' },
    { de: 'Rüstung', en: 'Armor' },
    { de: 'Dragon Lord', en: 'Dragon Lord' },
  ],
  basis: {
    de: 'Rezepte und Chancen aus Client-Daten-Seiten und Community-Guides zum globalen Server (Oktober 2026), Erfahrungswerte aus koreanischen Tests (Inven), ein eigenes Rechenmodell für die Splendent-Kette und die Ausrüstung der Top 10 aller acht Klassen (AION2 Index, 18.10.2026)',
    en: 'Recipes and odds from client-data pages and community guides for the global server (October 2026), experience values from Korean tests (Inven), our own cost model for the Splendent chain and the gear of the top 10 of all eight classes (AION2 Index, 2026-10-18)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '102', label: { de: 'Höchste Gegenstandsstufe', en: 'Highest item level' }, note: { de: 'Splendent Wise/Ebony Dragon Lord, pro Teil', en: 'Splendent Wise/Ebony Dragon Lord, per piece' }, tone: 'gold' },
            { value: { de: '67,5 %', en: '67.5%' }, label: { de: 'Erfolg an der Rezeptstufe', en: 'Success at recipe level' }, note: { de: 'das erste Dragon-Lord-Teil – ein Fehlschlag frisst alles Material', en: 'the first Dragon Lord piece – a failure eats all the material' }, tone: 'rose' },
            { value: '3', label: { de: 'Artisan’s-Splendent-Teile pro Platz', en: 'Artisan’s Splendent pieces per slot' }, note: { de: 'für die ganze Kette bis Stufe 102', en: 'for the whole chain up to level 102' }, tone: 'violet' },
            { value: { de: '76 von 80', en: '76 of 80' }, label: { de: 'Top-Spieler mit Splendent-Wise/Ebony-Waffe', en: 'top players with a Splendent Wise/Ebony weapon' }, note: { de: 'hergestellt, Stufe 102 · 18.10.2026', en: 'crafted, level 102 · 18 Oct 2026' }, tone: 'green' },
          ],
        },
        {
          type: 'facts',
          items: [
            {
              label: { de: '„Dragon Lord“', en: '"Dragon Lord"' },
              value: {
                de: 'Keine Berufsstufe, sondern die beste **hergestellte Ausrüstung** (Unique): True/Star Dragon Lord (Gegenstandsstufe 62, Splendent 70) → White/Dark (78/86) → Wise/Ebony (94/102)',
                en: 'Not a profession rank but the best **crafted gear** (Unique): True/Star Dragon Lord (item level 62, Splendent 70) → White/Dark (78/86) → Wise/Ebony (94/102)',
              },
            },
            {
              label: { de: 'Freischaltung', en: 'Unlock' },
              value: {
                de: 'Meisterschaft **55**: Waffen, Ring, Brust, Hose, Helm, Schulter · Meisterschaft **60**: Guard, Halskette, Ohrringe, Handschuhe, Stiefel, Umhang',
                en: 'Mastery **55**: weapons, ring, chest, legs, helm, pauldrons · mastery **60**: guard, necklace, earrings, gloves, boots, cloak',
              },
            },
            {
              label: { de: 'Erfahrung', en: 'Experience' },
              value: {
                de: 'Novice 1–50: 8.809 · bis 55 insgesamt 11.331 · bis 60: 14.947 · bis 80: 38.187',
                en: 'Novice 1–50: 8,809 · up to 55: 11,331 in total · up to 60: 14,947 · up to 80: 38,187',
              },
            },
            {
              label: { de: 'Pflichtzutat', en: 'Required input' },
              value: {
                de: 'Jede Stufe braucht die **Splendent**-Version der Stufe davor. Das erste Dragon-Lord-Teil braucht ein Artisan’s-Splendent-Teil desselben Typs, White und Wise je ein weiteres.',
                en: 'Every tier needs the **Splendent** version of the tier below. The first Dragon Lord piece needs an Artisan’s Splendent piece of the same type, White and Wise one more each.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Kurz gesagt', en: 'In short' },
          text: {
            de: 'Beruf nach deinem Zielteil wählen, bis 50 nur **einzeln** herstellen und dabei die Kette Orichalcum → Expert’s → Artisan’s bis zum Splendent-Teil hochziehen – Splendent-Zwischenstufen kaufen, wenn sie billiger sind. Bei 50 **sofort** aufsteigen. Ab 51 erst die Balaur-Hörner herstellen (die bringen dich auf ≈ 62), dann das Dragon-Lord-Teil. Ab 65 und 80 kommen die Hörner für White und Wise.',
            en: 'Pick the profession of your target piece, craft **one at a time** up to 50 and climb the chain Orichalcum → Expert’s → Artisan’s up to the Splendent piece on the way – buy Splendent intermediates when they are cheaper. Advance **right away** at 50. From 51 craft the Balaur horns first (they take you to about 62), then the Dragon Lord piece. From 65 and 80 come the horns for White and Wise.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Gegenstände, Berufe und Dungeons stehen hier so, wie sie im englischen Client heißen. Im deutschen Client können sie anders lauten. „Gegenstandsstufe“ meint hier immer die Stufe **eines Teils** – nicht die Summe im Charakterfenster (an der Spitze ≈ 3.400).',
            en: 'Items, professions and dungeons are named as in the English client. "Item level" here always means the level of **one piece** – not the total in the character window (≈ 3,400 at the top).',
          },
        },
      ],
    },
    {
      title: { de: 'Welcher Beruf macht was', en: 'Which profession makes what' },
      blocks: [
        {
          type: 'list',
          items: [
            {
              de: '**Schmieden (Blacksmithing):** Großschwert (Gladiator), Langschwert (Templer), Dolch (Assassine), Streitkolben (Kleriker) und die **Guard** – die Nebenhand für alle Klassen. Dazu Ingots und Balaur-Hörner.',
              en: '**Blacksmithing:** greatsword (Gladiator), longsword (Templar), dagger (Assassin), mace (Cleric) and the **guard** – the off-hand for every class. Also ingots and Balaur horns.',
            },
            {
              de: '**Rüstungsschmieden (Armorsmithing):** alle 7 Rüstungsteile – Helm, Schulter, Brust, Hose, Handschuhe, Stiefel, Umhang – und Balaur-Leder. Es gibt **keine Rüstungsklassen** wie Stoff, Leder oder Platte: Jede Klasse trägt dieselben Teile.',
              en: '**Armorsmithing:** all 7 armor pieces – helm, pauldrons, chest, legs, gloves, boots, cloak – and Balaur leather. There are **no armor weight classes** like cloth, leather or plate: every class wears the same pieces.',
            },
            {
              de: '**Handwerk (Handicrafting):** Bogen (Waldläufer), Stab (Kantor) sowie Ringe, Ohrringe, Halsketten und Armbänder.',
              en: '**Handicrafting:** bow (Ranger), staff (Chanter) as well as rings, earrings, necklaces and bracelets.',
            },
            {
              de: '**Alchemie (Alchemy):** Zauberbuch und Orb (Magier, Beschwörer), dazu Manasteine, Seelensteine, Tränke und Schriftrollen.',
              en: '**Alchemy:** spellbook and orb (Sorcerer, Spiritmaster), plus manastones, soulstones, potions and scrolls.',
            },
            {
              de: '**Kochen (Cooking):** Essen mit Werten für ein paar Minuten, keine Ausrüstung.',
              en: '**Cooking:** food with stats for a few minutes, no gear.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Ein Charakter kann alle fünf Berufe lernen. Konzentrier dich trotzdem zuerst auf **einen** – die seltenen Zutaten (Balaur’s Essence, Wrathful Mind) reichen sonst nirgends. Der zweite Beruf ist meist Handwerk für Ringe, Ohrringe und Halskette.',
            en: 'One character can learn all five professions. Still, focus on **one** first – otherwise the rare ingredients (Balaur’s Essence, Wrathful Mind) run short everywhere. The second profession is usually handicrafting for rings, earrings and the necklace.',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: '**Nicht herstellbar:** Gürtel, Amulett, Runen, Outfits und Skins. Armbänder gehen nur bis zum **Pilgrim Bracelet** (Stufe 43) und haben keine Splendent-Version – trotzdem tragen es 29 der Top 80 noch im zweiten Armband-Platz.',
              en: '**Not craftable:** belts, amulets, runes, outfits and skins. Bracelets only go up to the **Pilgrim Bracelet** (level 43) and have no Splendent version – still, 29 of the top 80 wear it in their second bracelet slot.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Mit Twinks', en: 'With alts' },
          text: {
            de: 'Nach allem, was bekannt ist, gehört die Meisterschaft dem Charakter, der herstellt. Transfer-Rezepte (alles ab Splendent True/Star) brauchen keine Meisterschaft, ihr Ergebnis ist aber an den **Hersteller seelengebunden** – den Transfer macht also der Charakter, der das Teil tragen soll. Ob ein Twink das erste True/Star-Teil herstellen und über das Server-Lager weitergeben kann, hängt davon ab, ob normale Herstellungen gebunden sind – das ist noch nicht belegt.',
            en: 'As far as is known, mastery belongs to the character who crafts. Transfer recipes (everything from Splendent True/Star on) need no mastery, but their result is **soul bound to the crafter** – so the character who will wear the piece does the transfer. Whether an alt can craft the first True/Star piece and pass it on through server storage depends on whether normal crafts are bound – that is not confirmed yet.',
          },
        },
        { type: 'links', items: [{ href: '#/guides/multi-characters', label: { de: 'Mehrere Charaktere spielen', en: 'Playing several characters' } }] },
      ],
    },
    {
      title: { de: 'Die Leiter: von Orichalcum bis Dragon Lord', en: 'The ladder: from Orichalcum to Dragon Lord' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Herstellbare Ausrüstung ist eine Leiter. Jede Sprosse braucht als Zutat die **Splendent**-Version der Sprosse darunter – ein normales Teil reicht nicht. Am Beispiel Langschwert:',
            en: 'Craftable gear is a ladder. Every rung needs the **Splendent** version of the rung below as an ingredient – a normal piece won’t do. Using the longsword as the example:',
          },
        },
        {
          type: 'flow',
          title: { de: 'Die Kette eines Platzes', en: 'The chain of one slot' },
          caption: {
            de: 'Gegenstandsstufen am Langschwert (Fextralife, metabot.gg). Bis Artisan’s braucht jeder Schritt einen Combo-Treffer, ab Dragon Lord geht Normal → Splendent per Transfer.',
            en: 'Item levels of the longsword (Fextralife, metabot.gg). Up to Artisan’s each step needs a combo hit, from Dragon Lord normal → Splendent works by transfer.',
          },
          items: [
            { title: { de: 'Orichalcum', en: 'Orichalcum' }, tag: { de: 'Meisterschaft 3', en: 'Mastery 3' }, text: { de: '3 Ingots + 5 Refining Stones + 2 Odyle → Stufe 18, Splendent 22', en: '3 ingots + 5 Refining Stones + 2 Odyle → level 18, Splendent 22' }, tone: 'slate' },
            { title: { de: 'Expert’s', en: 'Expert’s' }, tag: { de: 'Meisterschaft 15', en: 'Mastery 15' }, text: { de: 'Splendent Orichalcum + Fine-Material → 28, Splendent 35', en: 'Splendent Orichalcum + Fine materials → 28, Splendent 35' }, tone: 'slate' },
            { title: { de: 'Artisan’s', en: 'Artisan’s' }, tag: { de: 'Meisterschaft 30', en: 'Mastery 30' }, text: { de: 'Splendent Expert’s + Pure-Material → 39, Splendent 44 – die Zutat für Dragon Lord', en: 'Splendent Expert’s + Pure materials → 39, Splendent 44 – the ingredient for Dragon Lord' }, tone: 'blue' },
            { title: { de: 'True/Star Dragon Lord', en: 'True/Star Dragon Lord' }, tag: { de: 'Meisterschaft 55/60', en: 'Mastery 55/60' }, text: { de: 'Artisan’s Splendent + Balaur-Hörner + 10 Wrathful Mind → Unique 62, per Transfer Splendent 70', en: 'Artisan’s Splendent + Balaur horns + 10 Wrathful Mind → Unique 62, by transfer Splendent 70' }, tone: 'gold' },
            { title: { de: 'White/Dark Dragon Lord', en: 'White/Dark Dragon Lord' }, tag: 'Transfer', text: { de: 'Splendent True + **zweites** Artisan’s-Splendent-Teil + Will → 78, Splendent 86', en: 'Splendent True + a **second** Artisan’s Splendent piece + Will → 78, Splendent 86' }, tone: 'gold' },
            { title: { de: 'Wise/Ebony Dragon Lord', en: 'Wise/Ebony Dragon Lord' }, tag: 'Transfer', text: { de: 'Splendent White + **drittes** Artisan’s-Splendent-Teil + Ego → 94, Splendent **102**', en: 'Splendent White + a **third** Artisan’s Splendent piece + Ego → 94, Splendent **102**' }, tone: 'gold' },
          ],
        },
        {
          type: 'line',
          title: { de: 'Gegenstandsstufe pro Sprosse', en: 'Item level per rung' },
          caption: {
            de: 'Langschwert, globaler Client (Fextralife, metabot.gg). Der große Sprung kommt mit Dragon Lord: von 44 auf 62. Zum Vergleich: Dungeons lassen Stufe 54 (Krao Cave, Draupnir), 70 (Urugugu, Vakron), 86 (Fire Temple, Ferocious Horn Den) und 102 (Ludra – auf Global seit 5.10. offline) fallen.',
            en: 'Longsword, global client (Fextralife, metabot.gg). The big jump comes with Dragon Lord: from 44 to 62. For comparison: dungeons drop level 54 (Krao Cave, Draupnir), 70 (Urugugu, Vakron), 86 (Fire Temple, Ferocious Horn Den) and 102 (Ludra – offline on Global since 5 Oct).',
          },
          x: { label: { de: 'Sprosse', en: 'Rung' }, ticks: ['Orichalcum', 'Expert’s', 'Artisan’s', 'True/Star', 'White/Dark', 'Wise/Ebony'] },
          y: { label: { de: 'Gegenstandsstufe', en: 'Item level' }, min: 0 },
          series: [
            { label: { de: 'Normal', en: 'Normal' }, values: [18, 28, 39, 62, 78, 94], tone: 'blue' },
            { label: { de: 'Splendent', en: 'Splendent' }, values: [22, 35, 44, 70, 86, 102], tone: 'gold' },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Combo:** Nach einem Erfolg gibt es eine feste Chance von **25 %** auf die Splendent-Version (Essen 30 %, manche Manasteine 20 %, Ingots und Armbänder gar nicht). Die Combo würfelt aber noch einmal auf Erfolg – an der Rezeptstufe ist das etwa **ein Splendent-Teil pro 6–7 Versuche** (mehr dazu im nächsten Abschnitt).',
              en: '**Combo:** after a success there is a fixed **25%** chance for the Splendent version (food 30%, some manastones 20%, ingots and bracelets none). The combo rolls for success once more though – at recipe level that is about **one Splendent piece per 6–7 attempts** (more on that in the next section).',
            },
            {
              de: '**Erfolgschance** an der Rezeptstufe: normale Rezepte ≈ 74 %, Expert’s 76,8 %, Artisan’s 79,6 %, Dragon Lord nur **67,5 %**. Sie steigt mit jeder Meisterschaftsstufe über dem Rezept, bis 93,1 % (normal), 94,6 % (Expert’s, Dragon Lord) bzw. 96,8 % (Artisan’s) rund 42–50 Stufen darüber. Sicher ist nichts – im Spiel zeigt der Knopf **Probability Info** deine Chance.',
              en: '**Success chance** at recipe level: normal recipes about 74%, Expert’s 76.8%, Artisan’s 79.6%, Dragon Lord only **67.5%**. It rises with every mastery level above the recipe, up to 93.1% (normal), 94.6% (Expert’s, Dragon Lord) or 96.8% (Artisan’s) some 42–50 levels above it. Nothing is guaranteed – in game the **Probability Info** button shows your chance.',
            },
            {
              de: '**Fehlschlag** heißt: Materialien weg. Du bekommst aber 30 % der Erfahrung. Ein Treffer während des Herstellens zählt als Fehlschlag.',
              en: 'A **failure** means the materials are gone. You still get 30% of the experience. Getting hit while crafting counts as a failure.',
            },
            {
              de: '**Transfer-Herstellung** (Normal → Splendent bei Dragon Lord, White/Dark, Wise/Ebony): gelingt laut Fextralife **immer**, braucht keine Meisterschaft und behält Verzauberung, Amplify und Seelenbindung. Das Ergebnis ist an dich seelengebunden. Auch beim Transfer kann die Combo direkt die Splendent-Version der nächsten Stufe geben.',
              en: '**Transfer crafting** (normal → Splendent for Dragon Lord, White/Dark, Wise/Ebony): according to Fextralife it **always succeeds**, needs no mastery and keeps enhancement, amplification and Soul Binding. The result is soul bound to you. A transfer can also combo straight into the Splendent version of the next tier.',
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Splendent-Rechnung: warum die Kette teuer wird', en: 'Splendent maths: why the chain gets expensive' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein Splendent-Teil gibt es nur über die Combo: erst muss die Herstellung gelingen, dann die 25-%-Combo auslösen, dann die Combo selbst noch einmal gelingen. An der Rezeptstufe sind das 13,7 % (Orichalcum) bis 15,8 % (Artisan’s) pro Versuch. Das Gemeine: **Jeder Versuch der nächsten Stufe verbraucht ein Splendent-Teil der Stufe davor** – auch wenn er scheitert oder nur ein normales Teil ergibt. Die Chancen multiplizieren sich.',
            en: 'A Splendent piece only comes from the combo: first the craft must succeed, then the 25% combo must trigger, then the combo itself must succeed once more. At recipe level that is 13.7% (Orichalcum) to 15.8% (Artisan’s) per attempt. The nasty part: **every attempt at the next tier uses up a Splendent piece of the tier below** – even when it fails or only gives a normal piece. The odds multiply.',
          },
        },
        {
          type: 'bars',
          title: { de: 'Orichalcum-Herstellungen hinter einem Splendent-Teil', en: 'Orichalcum crafts behind one Splendent piece' },
          caption: {
            de: 'Gerechnet, nicht gemessen: Erfolg × 25 % × Erfolg mit den Chancen von Fextralife (an der Rezeptstufe 74 / 76,8 / 79,6 %, an der Obergrenze 93,1 / 94,6 / 96,8 %). Ein Test mit 4.000 Herstellungen (Inven) passt zu dieser Regel. In echt liegst du dazwischen, weil deine Meisterschaft beim Herstellen steigt.',
            en: 'Worked out, not measured: success × 25% × success with Fextralife’s chances (at recipe level 74 / 76.8 / 79.6%, at the cap 93.1 / 94.6 / 96.8%). A 4,000-craft test (Inven) fits this rule. In practice you land in between, because your mastery rises while you craft.',
          },
          items: [
            { label: 'Splendent Orichalcum', value: 7.3, display: '≈ 7', note: { de: 'an der Rezeptstufe', en: 'at recipe level' }, tone: 'slate' },
            { label: 'Splendent Expert’s', value: 49.5, display: '≈ 50', note: { de: '+ ≈ 7 Expert’s-Versuche', en: '+ ≈ 7 Expert’s attempts' }, tone: 'blue' },
            { label: 'Splendent Artisan’s', value: 313, display: '≈ 313', note: { de: '+ ≈ 43 Expert’s- und ≈ 6 Artisan’s-Versuche', en: '+ ≈ 43 Expert’s and ≈ 6 Artisan’s attempts' }, tone: 'rose' },
            { label: { de: 'Splendent Artisan’s an der Obergrenze', en: 'Splendent Artisan’s at the cap' }, value: 88, display: '≈ 88', note: { de: '+ ≈ 19 Expert’s- und ≈ 4 Artisan’s-Versuche', en: '+ ≈ 19 Expert’s and ≈ 4 Artisan’s attempts' }, tone: 'teal' },
          ],
        },
        {
          type: 'facts',
          items: [
            {
              label: { de: 'Material für ein Artisan’s-Splendent-Langschwert', en: 'Material for one Artisan’s Splendent longsword' },
              value: {
                de: 'An der Rezeptstufe gerechnet: ≈ 940 Ingots (1.880 Erz + 940 Lösungsmittel ≈ 375.000 Kinah) + 1.560 Refining Stones + 625 Odyle, dazu ≈ 215 Expert’s Refining Stones, 255 Fine Ore, 130 Fine Odyle und ≈ 32 Artisan’s Refining Stones, 51 Pure Ore, 25 Pure Odyle',
                en: 'Worked out at recipe level: ≈ 940 ingots (1,880 ore + 940 solvent ≈ 375,000 Kinah) + 1,560 Refining Stones + 625 Odyle, plus ≈ 215 Expert’s Refining Stones, 255 Fine Ore, 130 Fine Odyle and ≈ 32 Artisan’s Refining Stones, 51 Pure Ore, 25 Pure Odyle',
              },
            },
            {
              label: { de: 'An der Obergrenze', en: 'At the cap' },
              value: { de: 'Rund 30 % davon: ≈ 265 Ingots, 440 Refining Stones, 175 Odyle', en: 'About 30% of that: ≈ 265 ingots, 440 Refining Stones, 175 Odyle' },
            },
            {
              label: { de: 'Für die ganze Kette', en: 'For the whole chain' },
              value: { de: 'Drei solche Teile pro Platz – eins für True/Star, eins für White/Dark, eins für Wise/Ebony', en: 'Three such pieces per slot – one for True/Star, one for White/Dark, one for Wise/Ebony' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Was daraus folgt', en: 'What follows from it' },
          text: {
            de: '**1.** Splendent-Zwischenstufen kaufen, wenn sie billiger sind: Am 5.10. kostete ein Splendent Orichalcum Longsword selbst gemacht ≈ 223.000, gekauft ≈ 100.000 Kinah. **2.** Das zweite und dritte Artisan’s-Splendent-Teil erst mit hoher Meisterschaft herstellen – die niedrigen Rezepte sind dann nahe an ihrer Obergrenze, und die Kette kostet bis zu 3,5-mal weniger Versuche. **3.** Normale Ergebnisse sind kein Abfall: Sie gehen in die Supply Requests oder auf den Markt.',
            en: '**1.** Buy Splendent intermediates when they are cheaper: on 5 Oct a Splendent Orichalcum Longsword cost about 223,000 Kinah to craft and about 100,000 to buy. **2.** Craft the second and third Artisan’s Splendent piece only at high mastery – the low recipes are near their cap by then, and the chain takes up to 3.5 times fewer attempts. **3.** Normal results are not waste: they go into Supply Requests or onto the market.',
          },
        },
      ],
    },
    {
      title: { de: 'Der schnellste Weg auf Dragon-Lord-Meisterschaft', en: 'The fastest way to Dragon Lord mastery' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Beruf nach deinem Zielteil wählen', en: 'Pick the profession of your target piece' },
              text: {
                de: 'Schwert, Dolch, Streitkolben: Schmieden. Brust, Hose, Helm: Rüstungsschmieden. Ring, Bogen, Stab: Handwerk. Zauberbuch, Orb: Alchemie. Fang mit der Waffe und den 55er-Teilen an – die 60er-Teile kommen später.',
                en: 'Sword, dagger, mace: blacksmithing. Chest, legs, helm: armorsmithing. Ring, bow, staff: handicrafting. Spellbook, orb: alchemy. Start with the weapon and the mastery-55 pieces – the 60 pieces come later.',
              },
            },
            {
              title: { de: 'Novice 1–50 mit billigen Einzelherstellungen', en: 'Novice 1–50 with cheap single crafts' },
              text: {
                de: 'Schmieden und Rüstungsschmieden: **Orichalcum Ingot** (2 Erz + Lösungsmittel für 400 Kinah, 20 Erfahrung) – 10 Ingots brachten einen Tester von Meisterschaft 1 auf 6. Handwerk: Sapphire Decoration und Yggdrasil Wood. Alchemie: ab 5 **Spiritstone Powder** (24 Erfahrung pro Herstellung, ≈ 363 Herstellungen von 5 auf 50) – Alchemie gilt als der leichteste Beruf zum Leveln.',
                en: 'Blacksmithing and armorsmithing: **Orichalcum Ingot** (2 ore + solvent for 400 Kinah, 20 experience) – 10 ingots took a tester from mastery 1 to 6. Handicrafting: Sapphire Decoration and Yggdrasil Wood. Alchemy: from 5 **Spiritstone Powder** (24 experience per craft, about 363 crafts from 5 to 50) – alchemy is said to be the easiest profession to level.',
              },
            },
            {
              title: { de: 'Immer einzeln, nie im x10-Paket', en: 'Always one at a time, never x10 batches' },
              text: {
                de: '10 einzelne Ingots geben **200** Erfahrung, ein x10-Rezept nur **112**. Pakete sparen nur Zeit.',
                en: '10 single ingots give **200** experience, one x10 recipe only **112**. Batches only save time.',
              },
            },
            {
              title: { de: 'Nebenbei die Leiter hochziehen', en: 'Climb the ladder on the way' },
              text: {
                de: 'Ab 3 Orichalcum-, ab 15 Expert’s- und ab 30 Artisan’s-Versionen deines Zielteils herstellen. Die geben viel mehr Erfahrung (koreanische Werte: Ingot 20, Orichalcum Guard 84, Expert’s Guard 240, Artisan’s Guard 600), und am Ende brauchst du ohnehin **ein Artisan’s-Splendent-Teil**. Tipp: Was über 8.809 Erfahrung hinausgeht, verfällt bei Novice 50 – heb die teuren Artisan’s-Versuche für die Zeit nach dem Aufstieg auf.',
                en: 'From 3 craft the Orichalcum, from 15 the Expert’s and from 30 the Artisan’s version of your target piece. They give much more experience (Korean values: ingot 20, Orichalcum Guard 84, Expert’s Guard 240, Artisan’s Guard 600), and in the end you need **one Artisan’s Splendent piece** anyway. Tip: experience beyond 8,809 is lost at Novice 50 – keep the expensive Artisan’s attempts for after the advancement.',
              },
            },
            {
              title: { de: 'Bei 50 sofort aufsteigen', en: 'Advance at 50 right away' },
              text: {
                de: 'Bei Novice 50 stoppt die Erfahrung, bis du die Aufstiegsquest erledigt hast. Schmieden: Novice Blacksmith’s Hammer aus 6 Ingots + 3 Odyle, Abgabe bei Sindri (Elyos, Verteron). Leg das Material vorher zur Seite. Die Testitems der anderen Berufe stehen im Guide „Sammeln & Handwerk“.',
                en: 'At Novice 50 experience stops until you finish the advancement quest. Blacksmithing: Novice Blacksmith’s Hammer from 6 ingots + 3 Odyle, handed in to Sindri (Elyos, Verteron). Put the material aside beforehand. The test items of the other professions are in the "Gathering & crafting" guide.',
              },
            },
            {
              title: { de: '51–62: erst die Hörner, dann Dragon Lord', en: '51–62: horns first, then Dragon Lord' },
              text: {
                de: 'Ab 51 stellst du die Balaur-Zutaten für dein Rezept her: fürs Langschwert 22 **Fine Thick Balaur Horn** (je 2 Balaur’s Essence + 1 Zircon Hammer vom Händler), für Rüstung **Tanned Thick Balaur Leather** (2 Balaur’s Essence + 1 Lesser Dragon Leather Softener). Ein Horn gibt nach koreanischen Werten einige hundert Erfahrung (383–868 je nach Sorte) – die 22 Hörner allein bringen dich von 51 auf **≈ 62**. Alchemisten nehmen Intermediate Manastones (60) und Soulstones (74): ≈ 35–42 Herstellungen bis 55.',
                en: 'From 51 you craft the Balaur ingredients for your recipe: for the longsword 22 **Fine Thick Balaur Horn** (2 Balaur’s Essence + 1 Zircon Hammer from the vendor each), for armor **Tanned Thick Balaur Leather** (2 Balaur’s Essence + 1 Lesser Dragon Leather Softener). By Korean values a horn gives a few hundred experience (383–868 depending on the kind) – the 22 horns alone take you from 51 to **about 62**. Alchemists use Intermediate Manastones (60) and Soulstones (74): about 35–42 crafts to 55.',
              },
            },
            {
              title: { de: 'Dragon Lord herstellen – mit Abstand zur Rezeptstufe', en: 'Craft Dragon Lord – with some distance to the recipe level' },
              text: {
                de: 'An der Rezeptstufe gelingt Dragon Lord nur zu **67,5 %**. Bei Meisterschaft 62 sind es ≈ 76 %, ganz oben 94,6 %. Ein Fehlschlag kostet das ganze Material samt 10 Wrathful Mind. Darum erst die Hörner, dann das Teil. Mit Glück gibt schon dieser Versuch die Splendent-Version (≈ 13 % an der Rezeptstufe) – dann sparst du den Transfer.',
                en: 'At recipe level Dragon Lord only succeeds **67.5%** of the time. At mastery 62 it is about 76%, at the top 94.6%. A failure costs all the material including 10 Wrathful Mind. So horns first, then the piece. With luck this very attempt gives the Splendent version (about 13% at recipe level) – then you save the transfer.',
              },
            },
            {
              title: { de: '60–80: die Hörner für White und Wise', en: '60–80: the horns for White and Wise' },
              text: {
                de: 'Die Transfers selbst brauchen keine Meisterschaft, ihre Hörner schon: **Fine Hard Balaur Horn** ab 65 (White/Dark), **Fine Durable** ab 80 (Wise/Ebony). Darum nennt metabot **80** als sinnvolles Ziel. 65 → 80 kostet allein 18.984 Erfahrung – die Hörner, die du ohnehin brauchst, bringen davon einen großen Teil. Oder du kaufst die Hörner.',
                en: 'The transfers themselves need no mastery, but their horns do: **Fine Hard Balaur Horn** from 65 (White/Dark), **Fine Durable** from 80 (Wise/Ebony). That is why metabot names **80** as the sensible target. 65 → 80 alone costs 18,984 experience – the horns you need anyway give a large part of it. Or you buy the horns.',
              },
            },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Erfahrung für jeden Abschnitt der Meisterschaft', en: 'Experience for each stretch of mastery' },
          caption: {
            de: 'Koreanische Erfahrungstabelle (Inven, 20.1.2026). Die Summen passen zu den Client-Daten des globalen Servers (metabot: 8.809 für 1–50, 82.680 für 51–100). Insgesamt: 55 = 11.331, 60 = 14.947, 80 = 38.187, 100 = 91.543.',
            en: 'Korean experience table (Inven, 20 Jan 2026). The totals match the global client data (metabot: 8,809 for 1–50, 82,680 for 51–100). In total: 55 = 11,331, 60 = 14,947, 80 = 38,187, 100 = 91,543.',
          },
          unit: { de: 'Erfahrung', en: 'experience' },
          items: [
            { label: '1 → 15', value: 514, note: 'Orichalcum', tone: 'slate' },
            { label: '15 → 30', value: 1630, note: 'Expert’s', tone: 'slate' },
            { label: '30 → 50', value: 6665, note: { de: 'Artisan’s, dann Aufstiegsquest', en: 'Artisan’s, then the advancement quest' }, tone: 'blue' },
            { label: '50 → 55', value: 2522, note: { de: 'erste Dragon-Lord-Teile', en: 'first Dragon Lord pieces' }, tone: 'gold' },
            { label: '55 → 60', value: 3616, note: { de: 'restliche Dragon-Lord-Teile', en: 'the other Dragon Lord pieces' }, tone: 'gold' },
            { label: '60 → 65', value: 4256, note: { de: 'Fine Hard Balaur Horn (White/Dark)', en: 'Fine Hard Balaur Horn (White/Dark)' }, tone: 'violet' },
            { label: '65 → 80', value: 18984, note: { de: 'Fine Durable Balaur Horn (Wise/Ebony)', en: 'Fine Durable Balaur Horn (Wise/Ebony)' }, tone: 'violet' },
            { label: '80 → 100', value: 53356, note: { de: 'nur noch für höhere Erfolgschancen', en: 'only for higher success chances' }, tone: 'slate' },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Erfahrung bis 55', en: 'Experience to 55' }, value: { de: '11.331 (8.809 Novice + 2.522 Professional)', en: '11,331 (8,809 Novice + 2,522 Professional)' } },
            { label: { de: 'Erfahrung bis 60', en: 'Experience to 60' }, value: { de: '14.947 (Professional 1–10: 6.138)', en: '14,947 (Professional 1–10: 6,138)' } },
            { label: { de: 'Erfahrung bis 80', en: 'Experience to 80' }, value: { de: '38.187 – gut viermal so viel wie bis 50', en: '38,187 – more than four times as much as to 50' } },
            { label: { de: 'Fehlschlag und Combo', en: 'Failure and combo' }, value: { de: 'Fehlschlag: 30 % der Erfahrung · Combo-Erfolg: 130 %', en: 'Failure: 30% of the experience · combo success: 130%' } },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/guides/gathering-crafting', label: { de: 'Sammeln & Handwerk: Grundlagen und Testitems', en: 'Gathering & crafting: basics and test items' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Waffen: Beispiel Langschwert', en: 'Weapons: the longsword example' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Großschwert, Dolch, Streitkolben und Guard sind genauso aufgebaut. Bogen und Stab nutzen statt Erz Yggdrasil-Holz (Elyos) bzw. Asvata-Holz (Asmodier) und Enhanced Thick Balaur Scale, Zauberbuch und Orb Radiant Ruby bzw. Radiant Sapphire.',
            en: 'Greatsword, dagger, mace and guard work the same way. Bow and staff use Yggdrasil wood (Elyos) or Asvata wood (Asmodians) and Enhanced Thick Balaur Scale instead of ore, spellbook and orb use Radiant Ruby or Radiant Sapphire.',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Orichalcum Ingot (Meisterschaft 1)', en: 'Orichalcum Ingot (mastery 1)' },
              text: { de: '2 Orichalcum-Erz + Lösungsmittel (400 Kinah)', en: '2 Orichalcum ore + solvent (400 Kinah)' },
            },
            {
              title: { de: 'Orichalcum Longsword (3)', en: 'Orichalcum Longsword (3)' },
              text: { de: '3 Ingots, 5 Refining Stones, 2 Odyle → Stufe 18, Splendent 22', en: '3 ingots, 5 Refining Stones, 2 Odyle → level 18, Splendent 22' },
            },
            {
              title: { de: 'Expert’s Longsword (15)', en: 'Expert’s Longsword (15)' },
              text: { de: 'Splendent Orichalcum Longsword + 5 Expert’s Refining Stones + 6 Fine Orichalcum Ore + 3 Fine Odyle → Stufe 28, Splendent 35', en: 'Splendent Orichalcum Longsword + 5 Expert’s Refining Stones + 6 Fine Orichalcum Ore + 3 Fine Odyle → level 28, Splendent 35' },
            },
            {
              title: { de: 'Artisan’s Longsword (30)', en: 'Artisan’s Longsword (30)' },
              text: { de: 'Expert’s Splendent + 5 Artisan’s Refining Stones + 8 Pure Ore + 4 Pure Odyle → Stufe 39, Splendent 44', en: 'Expert’s Splendent + 5 Artisan’s Refining Stones + 8 Pure Ore + 4 Pure Odyle → level 39, Splendent 44' },
            },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Die Dragon-Lord-Schritte am Langschwert (globaler Client)', en: 'The Dragon Lord steps of the longsword (global client)' },
          head: [
            { de: 'Schritt', en: 'Step' },
            { de: 'Ausgangsteil', en: 'Input piece' },
            { de: 'Balaur-Hörner', en: 'Balaur horns' },
            'Wrathful Mind · Will · Ego',
            { de: 'Außerdem', en: 'Also' },
            { de: 'Stufe', en: 'Level' },
          ],
          rows: [
            [
              { de: '**True Dragon Lord** (55)', en: '**True Dragon Lord** (55)' },
              'Artisan’s Splendent',
              '22 Fine Thick',
              '10 · – · –',
              { de: '4 Ultimate Refining Stones, 9 Radiant Ore, 5 Radiant Odyle', en: '4 Ultimate Refining Stones, 9 Radiant Ore, 5 Radiant Odyle' },
              '62',
            ],
            [
              { de: '→ Splendent (Transfer)', en: '→ Splendent (transfer)' },
              'True Dragon Lord',
              '11 Fine Thick',
              '4 · – · –',
              '',
              '70',
            ],
            [
              { de: '**White Dragon Lord** (Transfer)', en: '**White Dragon Lord** (transfer)' },
              { de: 'Splendent True + 2. Artisan’s Splendent', en: 'Splendent True + 2nd Artisan’s Splendent' },
              '29 Fine Hard',
              '3 · 15 · –',
              { de: '5 Ultimate Refining Stones, 12 Radiant Ore, 7 Radiant Odyle', en: '5 Ultimate Refining Stones, 12 Radiant Ore, 7 Radiant Odyle' },
              '78',
            ],
            [
              { de: '→ Splendent (Transfer)', en: '→ Splendent (transfer)' },
              'White Dragon Lord',
              '15 Fine Hard',
              '– · 5 · –',
              { de: '1 Radiant Ore, 2 Radiant Odyle', en: '1 Radiant Ore, 2 Radiant Odyle' },
              '86',
            ],
            [
              { de: '**Wise Dragon Lord** (Transfer)', en: '**Wise Dragon Lord** (transfer)' },
              { de: 'Splendent White + 3. Artisan’s Splendent', en: 'Splendent White + 3rd Artisan’s Splendent' },
              '41 Fine Durable',
              '3 · 3 · 20',
              { de: '6 Ultimate Refining Stones, 15 Radiant Ore, 9 Radiant Odyle', en: '6 Ultimate Refining Stones, 15 Radiant Ore, 9 Radiant Odyle' },
              '94',
            ],
            [
              { de: '→ Splendent (Transfer)', en: '→ Splendent (transfer)' },
              'Wise Dragon Lord',
              '21 Fine Durable',
              '– · – · 7',
              { de: '2 Ultimate Refining Stones, 2 Radiant Ore, 3 Radiant Odyle', en: '2 Ultimate Refining Stones, 2 Radiant Ore, 3 Radiant Odyle' },
              '**102**',
            ],
            [
              { de: '**Zusammen**', en: '**Total**' },
              { de: '3 Artisan’s Splendent', en: '3 Artisan’s Splendent' },
              '**139**',
              '**20 · 23 · 27**',
              { de: '17 Ultimate Refining Stones', en: '17 Ultimate Refining Stones' },
              '',
            ],
          ],
        },
        {
          type: 'bars',
          title: { de: 'Balaur’s Essence für eine Waffe, Schritt für Schritt', en: 'Balaur’s Essence for one weapon, step by step' },
          caption: {
            de: 'Gerechnet aus den Rezepten oben: 2 Balaur’s Essence pro Horn (+ 1 Hammer vom Händler). Gilt, wenn du die Hörner selbst herstellst. Balaur’s Essence ist nicht verkäuflich – sie ist die Grind-Bremse der Kette. Zusammen: 278.',
            en: 'Worked out from the recipes above: 2 Balaur’s Essence per horn (+ 1 hammer from the vendor). Applies if you craft the horns yourself. Balaur’s Essence can’t be sold – it is the grind brake of the chain. In total: 278.',
          },
          unit: 'Essence',
          items: [
            { label: 'True Dragon Lord', value: 44, note: { de: '22 Fine Thick Horn', en: '22 Fine Thick Horn' }, tone: 'gold' },
            { label: { de: '→ Splendent True', en: '→ Splendent True' }, value: 22, note: { de: '11 Hörner', en: '11 horns' }, tone: 'gold' },
            { label: 'White Dragon Lord', value: 58, note: { de: '29 Fine Hard Horn, ab Meisterschaft 65', en: '29 Fine Hard Horn, from mastery 65' }, tone: 'violet' },
            { label: { de: '→ Splendent White', en: '→ Splendent White' }, value: 30, note: { de: '15 Hörner', en: '15 horns' }, tone: 'violet' },
            { label: 'Wise Dragon Lord', value: 82, note: { de: '41 Fine Durable Horn, ab Meisterschaft 80', en: '41 Fine Durable Horn, from mastery 80' }, tone: 'rose' },
            { label: { de: '→ Splendent Wise', en: '→ Splendent Wise' }, value: 42, note: { de: '21 Hörner', en: '21 horns' }, tone: 'rose' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Für die ganze Kette', en: 'For the whole chain' },
          text: {
            de: 'Bis Splendent Wise/Ebony brauchst du **drei** Artisan’s-Splendent-Teile derselben Waffe, 139 Balaur-Hörner (278 Balaur’s Essence), 20 Wrathful Mind, 23 Will, 27 Ego und 17 Ultimate Refining Stones. Die Mengen für Splendent Wise stammen aus dem Streitkolben-Rezept – die Waffen-Rezepte einer Stufe nennen dieselben Zutaten.',
            en: 'Up to Splendent Wise/Ebony you need **three** Artisan’s Splendent pieces of the same weapon, 139 Balaur horns (278 Balaur’s Essence), 20 Wrathful Mind, 23 Will, 27 Ego and 17 Ultimate Refining Stones. The amounts for Splendent Wise come from the mace recipe – the weapon recipes of one tier list the same ingredients.',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Artisan’s Ultimate Refining Stone', en: 'Artisan’s Ultimate Refining Stone' }, value: { de: 'Expeditionen, Shugo Festa, Bosse in Draupnir (≈ 9–10 %), Season Shop', en: 'Expeditions, Shugo Festa, Draupnir bosses (about 9–10%), Season Shop' } },
            { label: { de: 'Wrathful Mind', en: 'Wrathful Mind' }, value: { de: 'Eroberungs-Dungeons (Krao Cave, Draupnir, Urugugu, Vakron, Fire Temple, Ferocious Horn Den), Ludra (zurzeit offline), Season Shop · Markt am 5.10. ≈ 350.000 Kinah pro Stück', en: 'Conquest dungeons (Krao Cave, Draupnir, Urugugu, Vakron, Fire Temple, Ferocious Horn Den), Ludra (offline for now), Season Shop · market on 5 Oct about 350,000 Kinah each' } },
            { label: { de: 'Will / Ego', en: 'Will / Ego' }, value: { de: 'Will: Urugugu, Vakron, Fire Temple, Ferocious Horn Den, Ludra (zurzeit offline) · Ego: Fire Temple, Ferocious Horn Den, Ludra (zurzeit offline)', en: 'Will: Urugugu, Vakron, Fire Temple, Ferocious Horn Den, Ludra (offline for now) · Ego: Fire Temple, Ferocious Horn Den, Ludra (offline for now)' } },
            { label: { de: 'Balaur’s Essence', en: 'Balaur’s Essence' }, value: { de: 'Benannte Elite-Monster in Verteron und Altgard, Kaira-Bosse in Lower Reshanta, Eroberungs-Dungeons, Ludra (zurzeit offline) – nicht verkaufbar', en: 'Named elites in Verteron and Altgard, Kaira bosses in Lower Reshanta, Conquest dungeons, Ludra (offline for now) – not sellable' } },
            { label: { de: 'Erz, Holz, Odyle', en: 'Ore, wood, Odyle' }, value: { de: 'Sammeln – die Radiant-Qualität für Dragon Lord. Radiant Odyle ist die meistgenutzte Sammelzutat (190 Rezepte).', en: 'Gathering – the Radiant quality for Dragon Lord. Radiant Odyle is the most used gathered ingredient (190 recipes).' } },
            { label: { de: 'Händler-Reagenzien', en: 'Vendor reagents' }, value: { de: 'Lösungsmittel 400 Kinah, Hämmer 4.650–6.550 Kinah – immer gebunden. Mit Special-Quai-Abo auch im Wind-Breeze-Shop.', en: 'Solvent 400 Kinah, hammers 4,650–6,550 Kinah – always bound. With the Special Quai membership also in the Wind Breeze shop.' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Rüstung (Klamotten) und Schmuck', en: 'Armor and jewelry' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Rüstung macht der **Rüstungsschmied**, für alle Klassen dieselben 7 Teile. Die Kette ist wie bei Waffen – Beispiel Brustpanzer:',
            en: 'Armor comes from **armorsmithing**, the same 7 pieces for every class. The chain works like weapons – the breastplate as the example:',
          },
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Orichalcum Breastplate (3)', en: 'Orichalcum Breastplate (3)' },
              text: { de: '2 Ingots, 4 Strong Leather, 3 Refining Stones, 1 Odyle → Stufe 16', en: '2 ingots, 4 Strong Leather, 3 Refining Stones, 1 Odyle → level 16' },
            },
            {
              title: { de: 'Expert’s Breastplate (15)', en: 'Expert’s Breastplate (15)' },
              text: { de: 'Splendent Orichalcum Breastplate + 3 Expert’s Refining Stones + 4 Fine Orichalcum Ore + 2 Fine Odyle → Stufe 28', en: 'Splendent Orichalcum Breastplate + 3 Expert’s Refining Stones + 4 Fine Orichalcum Ore + 2 Fine Odyle → level 28' },
            },
            {
              title: { de: 'Artisan’s Breastplate (30)', en: 'Artisan’s Breastplate (30)' },
              text: { de: 'Expert’s Splendent + 3 Artisan’s Refining Stones + 5 Pure Ore + 3 Pure Odyle → Stufe 39', en: 'Expert’s Splendent + 3 Artisan’s Refining Stones + 5 Pure Ore + 3 Pure Odyle → level 39' },
            },
            {
              title: { de: 'True Dragon Lord Breastplate (55)', en: 'True Dragon Lord Breastplate (55)' },
              text: { de: 'Artisan’s Splendent + 3 Artisan’s Ultimate Refining Stones + 15 Tanned Thick Balaur Leather + 7 Wrathful Mind + 6 Radiant Ore + 3 Radiant Odyle → Unique, Stufe 62', en: 'Artisan’s Splendent + 3 Artisan’s Ultimate Refining Stones + 15 Tanned Thick Balaur Leather + 7 Wrathful Mind + 6 Radiant Ore + 3 Radiant Odyle → Unique, level 62' },
            },
            {
              title: { de: 'White/Dark und Wise/Ebony (Transfer)', en: 'White/Dark and Wise/Ebony (transfer)' },
              text: { de: 'Wie bei Waffen: die Splendent-Version der Stufe davor + ein weiteres Artisan’s-Splendent-Teil desselben Platzes + Wrathful Mind, Will und Ego', en: 'Like weapons: the Splendent version of the tier below + another Artisan’s Splendent piece of the same slot + Wrathful Mind, Will and Ego' },
            },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Strong Leather** = 2 Raw Leather (von Tieren in Verteron, Altgard und Chaotic Lower Reshanta). **Tanned Thick Balaur Leather** = 2 Balaur’s Essence + 1 Lesser Dragon Leather Softener (4.650 Kinah), ab Meisterschaft 51.',
              en: '**Strong Leather** = 2 Raw Leather (from animals in Verteron, Altgard and Chaotic Lower Reshanta). **Tanned Thick Balaur Leather** = 2 Balaur’s Essence + 1 Lesser Dragon Leather Softener (4,650 Kinah), from mastery 51.',
            },
            {
              de: '**Schmuck** macht der Handwerker: Orichalcum-Ringe ab 3, Ohrringe ab 5, Halsketten ab 10. Der Dragon-Lord-Ring kommt ab 55, Halskette und Ohrringe ab 60. Ringe und Ohrringe brauchst du **doppelt** – also auch die Kette zweimal.',
              en: '**Jewelry** comes from handicrafting: Orichalcum rings from 3, earrings from 5, necklaces from 10. The Dragon Lord ring comes at 55, necklace and earrings at 60. You need rings and earrings **twice** – so the chain twice as well.',
            },
            {
              de: '**Keine Setboni** bei hergestellter Rüstung. Dafür hat ein Dragon-Lord-Teil **5 Seelenbindungs-Zeilen** (5 zufällige Werte aus 17, z. B. Angriffstempo, Damage Boost, Critical Hit), Dungeon-Ausrüstung nur 3–4.',
              en: '**No set bonuses** on crafted armor. In return a Dragon Lord piece has **5 Soul Binding lines** (5 random stats out of 17, e.g. attack speed, Damage Boost, Critical Hit), dungeon gear only 3–4.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Welche Teile du herstellen solltest', en: 'Which pieces to craft' },
          text: {
            de: 'Der Weg auf Global ab Stufe 45 laut MetaBot: Elite-Sets (46) → Krao Cave und Draupnir (54) → True Dragon Lord **nur für Plätze, die dir nicht droppen** → Fire Temple und Ferocious Horn Den (86). Rüstung und Schmuck auf Stufe 102 gibt es **nur** als Splendent Wise/Ebony aus dem Handwerk – Ludra lässt nur Waffe und Guard fallen und ist auf Global seit dem 5.10. offline (Rückkehr noch ohne Termin). Zurzeit ist das Handwerk also der einzige Weg zu Stufe 102.',
            en: 'The path on Global from level 45 according to MetaBot: elite sets (46) → Krao Cave and Draupnir (54) → True Dragon Lord **only for slots that do not drop for you** → Fire Temple and Ferocious Horn Den (86). Level 102 armor and jewelry **only** come as crafted Splendent Wise/Ebony – Ludra only drops the weapon and guard and has been offline on Global since 5 Oct (no return date yet). So for now crafting is the only way to level 102 at all.',
          },
        },
      ],
    },
    {
      title: { de: 'Lohnt sich das?', en: 'Is it worth it?' },
      blocks: [
        {
          type: 'compare',
          title: { de: 'Drei Wege zu guter Ausrüstung', en: 'Three ways to good gear' },
          caption: {
            de: 'Preise vom 5.10.2026 (Community), Chancen von Fextralife, Top-80-Zahlen vom 18.10.2026 (AION2 Index). Für den Markt brauchst du das Special-Quai-Abo.',
            en: 'Prices from 5 Oct 2026 (community), odds from Fextralife, top-80 numbers from 18 Oct 2026 (AION2 Index). The market needs the Special Quai membership.',
          },
          items: [
            {
              title: { de: 'Alles selbst herstellen', en: 'Craft the whole chain' },
              tag: { de: 'Endgame', en: 'Endgame' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Der einzige Weg zu Rüstung und Schmuck auf Stufe 102', en: 'The only way to level 102 armor and jewelry' } },
                { kind: 'pro', text: { de: 'Verzauberung, Amplify und Seelenbindung wandern bei jedem Transfer mit', en: 'Enhancement, amplification and Soul Binding move along with every transfer' } },
                { kind: 'pro', text: { de: '5 Seelenbindungs-Zeilen, Waffen mit +5 % PvE Damage Boost', en: '5 Soul Binding lines, weapons with +5% PvE Damage Boost' } },
                { kind: 'con', text: { de: '≈ 90–310 Orichalcum-Versuche pro Artisan’s-Splendent-Teil – und drei pro Platz', en: '≈ 90–310 Orichalcum attempts per Artisan’s Splendent piece – and three per slot' } },
                { kind: 'con', text: { de: '278 Balaur’s Essence pro Waffe, Meisterschaft 80 für die letzten Hörner', en: '278 Balaur’s Essence per weapon, mastery 80 for the last horns' } },
              ],
              verdict: { de: 'Für die Waffe deines Mains und alle Plätze, die du bis zum Ende behältst.', en: 'For your main’s weapon and every slot you keep until the end.' },
            },
            {
              title: { de: 'Zwischenstufen kaufen, oben selbst herstellen', en: 'Buy intermediates, craft the top' },
              tag: { de: 'Kinah statt Zeit', en: 'Kinah instead of time' },
              tone: 'blue',
              points: [
                { kind: 'pro', text: { de: 'Splendent Orichalcum Longsword: gekauft ≈ 100.000, selbst gemacht ≈ 223.000 Kinah', en: 'Splendent Orichalcum Longsword: bought ≈ 100,000, crafted ≈ 223,000 Kinah' } },
                { kind: 'pro', text: { de: 'Hörner lassen sich kaufen, Transfers brauchen keine Meisterschaft', en: 'Horns can be bought, transfers need no mastery' } },
                { kind: 'con', text: { de: 'Nur mit Abo, Preise schwanken, Wrathful Mind ≈ 350.000 pro Stück', en: 'Membership only, prices move, Wrathful Mind ≈ 350,000 each' } },
                { kind: 'con', text: { de: 'Transfer-Ergebnisse sind seelengebunden – kauf vor dem Transfer', en: 'Transfer results are soul bound – buy before the transfer' } },
              ],
              verdict: { de: 'Für die meisten der beste Wert: Zeit sparen, wo der Markt billiger ist.', en: 'Best value for most: save time wherever the market is cheaper.' },
            },
            {
              title: { de: 'Dungeon-Ausrüstung tragen', en: 'Wear dungeon drops' },
              tag: { de: 'Brücke', en: 'Bridge' },
              tone: 'slate',
              points: [
                { kind: 'pro', text: { de: 'Nuakum (86) aus Fire Temple und Ferocious Horn Den – ohne Fehlschlag-Risiko', en: 'Nuakum (86) from Fire Temple and Ferocious Horn Den – no risk of failure' } },
                { kind: 'pro', text: { de: 'Amplify bis +5 auf Stufe 86 (Splendent White/Dark nur +3)', en: 'Amplify up to +5 at level 86 (Splendent White/Dark only +3)' } },
                { kind: 'con', text: { de: 'Rüstung endet bei 86, die Verzauberung geht beim Wechsel verloren', en: 'Armor ends at 86, the enhancement is lost when you swap' } },
              ],
              verdict: { de: 'Gut für Plätze, die du später ersetzt – 23 % der Rüstung der Top 80 ist noch Nuakum.', en: 'Fine for slots you replace later – 23% of the top 80’s armor is still Nuakum.' },
            },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Hergestelltes Splendent Wise/Ebony bei den Top 80', en: 'Crafted Splendent Wise/Ebony among the top 80' },
          caption: {
            de: 'Top 10 jeder Klasse, AION2 Index, 18.10.2026. Der Rest der Rüstung ist meist Nuakum (130 von 560) und Splendent White/Dark (45). Eine Ludra-Waffe trägt keiner – der Raid ist auf Global offline. Hergestellte Rüstung je Klasse: von 34 von 70 Teilen (Kleriker) bis 70 von 70 (Gladiator).',
            en: 'Top 10 of each class, AION2 Index, 18 Oct 2026. The rest of the armor is mostly Nuakum (130 of 560) and Splendent White/Dark (45). Nobody wears a Ludra weapon – the raid is offline on Global. Crafted armor per class: from 34 of 70 pieces (Cleric) to 70 of 70 (Gladiator).',
          },
          unit: '%',
          max: 100,
          items: [
            { label: { de: 'Waffe', en: 'Weapon' }, value: 95, note: { de: '76 von 80', en: '76 of 80' }, tone: 'gold' },
            { label: 'Guard', value: 90, note: { de: '72 von 80', en: '72 of 80' }, tone: 'gold' },
            { label: { de: 'Ringe', en: 'Rings' }, value: 91, note: { de: '146 von 160', en: '146 of 160' }, tone: 'gold' },
            { label: { de: 'Halskette', en: 'Necklace' }, value: 91, note: { de: '73 von 80', en: '73 of 80' }, tone: 'gold' },
            { label: { de: 'Ohrringe', en: 'Earrings' }, value: 84, note: { de: '135 von 160', en: '135 of 160' }, tone: 'gold' },
            { label: { de: 'Rüstung (7 Plätze)', en: 'Armor (7 slots)' }, value: 68, note: { de: '380 von 560', en: '380 of 560' }, tone: 'blue' },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Stufe 1–34:** Ausrüstung nur als Zutat und für Meisterschaft herstellen – Quest-Belohnungen sind genauso gut.', en: '**Level 1–34:** craft gear only as an ingredient and for mastery – quest rewards are just as good.' },
            { de: '**Stufe 34–44:** Das Artisan’s-Splendent-Teil ist vor allem die Zutat für Dragon Lord.', en: '**Level 34–44:** the Artisan’s Splendent piece is mainly the ingredient for Dragon Lord.' },
            { de: '**Stufe 45:** True/Star (62/70) schlägt die ersten Eroberungs-Drops (Krao Cave/Draupnir 54) und hält mit Urugugu/Vakron (70) mit.', en: '**Level 45:** True/Star (62/70) beats the first Conquest drops (Krao Cave/Draupnir 54) and keeps up with Urugugu/Vakron (70).' },
            { de: '**Fire Temple/Ferocious Horn Den** droppen Stufe 86 – dagegen brauchst du mindestens Splendent White/Dark.', en: '**Fire Temple/Ferocious Horn Den** drop level 86 – to beat that you need at least Splendent White/Dark.' },
            { de: '**Endgame:** Splendent Wise/Ebony ist zurzeit die einzige Ausrüstung auf Stufe 102 – NC hat den Ludra-Raid am 5.10. herausgenommen, Ludra-Ausrüstung ist bis zu seiner Rückkehr entfernt. Auch danach hat die hergestellte Waffe 5 % PvE Damage Boost und mehr Seelenbindungs-Zeilen. Nachteil: Auf den Zwischenstufen geht Amplify nur bis +1 (70) bzw. +3 (86).', en: '**Endgame:** Splendent Wise/Ebony is currently the only gear at level 102 – NC took the Ludra raid out on 5 Oct and Ludra gear is removed until it returns. Even then the crafted weapon has 5% PvE Damage Boost and more Soul Binding lines. Downside: on the middle tiers amplification only goes to +1 (70) or +3 (86).' },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Erst rechnen', en: 'Calculate first' },
          text: {
            de: 'Allein die 10 Wrathful Mind für ein True-Dragon-Lord-Langschwert kosteten am 5.10. rund 3,5 Mio. Kinah. An der Rezeptstufe scheitert jeder dritte Versuch – im Schnitt verlierst du so ≈ 1,1 Mio. Kinah pro Versuch, bei Meisterschaft 62 ≈ 0,8 Mio. Vergleiche vorher: Was kostet das fertige Teil, was kosten die Zutaten, wie hoch ist deine Chance?',
            en: 'The 10 Wrathful Mind for one True Dragon Lord longsword alone cost about 3.5 million Kinah on 5 Oct. At recipe level one attempt in three fails – on average that is ≈ 1.1 million Kinah lost per attempt, at mastery 62 ≈ 0.8 million. Compare first: what does the finished piece cost, what do the ingredients cost, how high is your chance?',
          },
        },
        {
          type: 'heading',
          text: { de: 'Wohin mit Resten', en: 'Where leftovers go' },
        },
        {
          type: 'list',
          items: [
            { de: '**Supply Requests** (ab Stufe 25, Esc → Abyss Supply Request): normale Herstellungen gegen Abyss-Punkte und Enhance Stones abgeben – sie zählen pro Charakter, also auch auf Twinks. Refining Stones, Balaur-Schuppen und Radiant Odyle **nicht** abgeben.', en: '**Supply Requests** (from level 25, Esc → Abyss Supply Request): turn in normal crafts for Abyss Points and Enhance Stones – they count per character, so on alts too. Do **not** turn in Refining Stones, Balaur scales or Radiant Odyle.' },
            { de: '**Zerlegen:** Ein True-Dragon-Lord-Teil gibt 320 Enhance Stones.', en: '**Dismantle:** a True Dragon Lord piece gives 320 Enhance Stones.' },
            { de: '**Verkaufen:** frische, nicht gebundene Herstellungen über den Markt (ab Stufe 45, nur mit Special-Quai-Abo, Gebühr laut Guides ≈ 10 %). Ergebnisse aus Transfer-Rezepten sind seelengebunden.', en: '**Sell:** fresh, unbound crafts on the market (from level 45, Special Quai membership only, guides name a fee of about 10%). Results of transfer recipes are soul bound.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'checklist',
          items: [
            { de: 'Nicht im x10-Paket leveln – einzeln gibt fast doppelt so viel Erfahrung', en: 'Do not level with x10 batches – single crafts give almost twice the experience' },
            { de: 'Nur an sicheren Orten herstellen – ein Treffer ist ein Fehlschlag', en: 'Only craft in safe places – getting hit is a failure' },
            { de: 'Nicht bei Novice 50 stehen bleiben – dort gibt es keine Erfahrung mehr', en: 'Do not sit at Novice 50 – there is no more experience there' },
            { de: 'Splendent-Teile nicht verkaufen oder zerlegen – sie sind die Zutat für die nächste Stufe', en: 'Do not sell or dismantle Splendent pieces – they are the ingredient for the next tier' },
            { de: 'Dragon Lord nicht direkt bei 55 versuchen, wenn du das Material nur einmal hast – erst die Hörner (≈ 62)', en: 'Do not try Dragon Lord right at 55 if you only have the material once – horns first (≈ 62)' },
            { de: 'Das zweite und dritte Artisan’s-Splendent-Teil nicht an der Rezeptstufe herstellen – mit hoher Meisterschaft kostet es rund ein Drittel', en: 'Do not craft the second and third Artisan’s Splendent piece at recipe level – at high mastery it costs about a third' },
            { de: 'Balaur’s Essence und Wrathful Mind nicht für Erfahrung verbrennen', en: 'Do not burn Balaur’s Essence and Wrathful Mind for experience' },
            { de: 'Bogen und Stab sind Handwerk, Zauberbuch und Orb Alchemie – nicht Schmieden', en: 'Bow and staff are handicrafting, spellbook and orb alchemy – not blacksmithing' },
            { de: 'Dein True-Teil ruhig verstärken – Verstärkung und Seelenbindung gehen beim Transfer mit', en: 'Feel free to enhance your True piece – enhancement and Soul Binding carry over in the transfer' },
            { de: 'Koreanische Videos nicht 1:1 übernehmen (siehe unten)', en: 'Do not copy Korean videos one to one (see below)' },
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
            de: 'Viele Videos und Tabellen kommen aus Korea. Dort ist das Spiel weiter, und einige Regeln sind anders:',
            en: 'Many videos and tables come from Korea. The game is further along there and some rules differ:',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Meisterschaft', en: 'Mastery' }, value: { de: 'Global endet bei 100 (Professional 50). Korea hat am 8.4.2026 bis Professional 70 angehoben. Bis 100 ist die Erfahrungskurve gleich.', en: 'Global ends at 100 (Professional 50). Korea raised it to Professional 70 on 8 Apr 2026. Up to 100 the experience curve is the same.' } },
            { label: { de: 'Stufen', en: 'Tiers' }, value: { de: 'Korea hat zusätzliche Heroic-Stufen ab 108 – Global endet bei Wise/Ebony 102', en: 'Korea has extra Heroic tiers from 108 – Global ends at Wise/Ebony 102' } },
            { label: { de: 'Wise/Ebony', en: 'Wise/Ebony' }, value: { de: 'Korea: direkt herstellbar ab Meisterschaft 85/90 · Global: nur per Transfer', en: 'Korea: craftable directly from mastery 85/90 · Global: only by transfer' } },
            { label: { de: 'Normal → Splendent', en: 'Normal → Splendent' }, value: { de: 'Korea: nur Kinah · Global: Zutaten (z. B. 11 Hörner + 4 Wrathful Mind)', en: 'Korea: Kinah only · Global: ingredients (e.g. 11 horns + 4 Wrathful Mind)' } },
            { label: { de: 'Dragon Lord Core', en: 'Dragon Lord Core' }, value: { de: 'Koreanische und taiwanische Rezepte nehmen einen „Dragon Lord Core“ statt des Artisan’s-Splendent-Teils – siehst du ihn in einem Video, gilt es nicht für Global', en: 'Korean and Taiwanese recipes take a "Dragon Lord Core" instead of the Artisan’s Splendent piece – if you see it in a video, it does not apply to Global' } },
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
            de: 'Für Global noch nicht eindeutig belegt: die Erfahrung pro Rezept (hier stehen koreanische Werte – die Erfahrungskurve passt aber genau zu den globalen Client-Daten), ob Transfer wirklich nie scheitert (Fextralife und metabot sagen garantiert, eine Quelle meint, bei Fehlschlag sind die Zutaten weg), ob normale Herstellungen gebunden sind, ob Rezepte weit unter deiner Meisterschaft noch Erfahrung geben (ein Guide nennt eine Grenze von 40 Stufen), die Marktgebühr, ob man ohne Abo verkaufen kann, und wann der Ludra-Raid zurückkommt. Das Splendent-Rechenmodell ist gerechnet, nicht gemessen. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Not clearly confirmed for Global yet: the experience per recipe (Korean values are given here – the experience curve matches the global client data exactly though), whether transfers really never fail (Fextralife and metabot say guaranteed, one source says the ingredients are lost on failure), whether normal crafts are bound, whether recipes far below your mastery still give experience (one guide names a limit of 40 levels), the market fee, whether you can sell without the membership, and when the Ludra raid returns. The Splendent cost model is worked out, not measured. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/gear-progression-guide', label: 'metabot.gg – Gear progression guide' },
            { href: 'https://aion2.wiki.fextralife.com/Crafting', label: 'Fextralife wiki – Crafting (success and combo rates)' },
            { href: 'https://aion2.wiki.fextralife.com/True_Dragon_Lord_Longsword', label: 'Fextralife wiki – True Dragon Lord Longsword' },
            { href: 'https://aion2hub.com/tools/crafting-calculator/wise-dragon-lord-longsword-110230102', label: 'AION2Hub – Crafting calculator: Wise Dragon Lord Longsword' },
            { href: 'https://aion2hub.com/tools/crafting-calculator/splendent-wise-dragon-lord-mace-110730104', label: 'AION2Hub – Crafting calculator: Splendent Wise Dragon Lord Mace' },
            { href: 'https://aion2hub.com/tools/crafting-calculator/star-dragon-lord-longsword-110230098', label: 'AION2Hub – Star Dragon Lord Longsword (KR/TW recipe with core)' },
            { href: 'https://www.keengamer.com/articles/guides/aion-2-crafting-guide-professions-gear-materials/', label: 'KeenGamer – Crafting guide' },
            { href: 'https://space4games.com/en/games-en/aion-2-crafting-guide/', label: 'Space4Games – Crafting guide' },
            { href: 'https://corpus.gg/blog/aion-2/crafting-guide', label: 'corpus.gg – Crafting guide' },
            { href: 'https://timesaver.gg/blog/aion-2-crafting-guide', label: 'timesaver.gg – Crafting guide' },
            { href: 'https://wikily.gg/aion-2/crafting', label: 'wikily.gg – Crafting' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1161', label: 'Inven (KR) – Crafting experience per level' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1624', label: 'Inven (KR) – Experience per recipe, mastery cap raised (April 2026)' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/917', label: 'Inven (KR) – 4,000-craft combo test' },
            { href: 'https://games.gg/aion-2/guides/aion-2-market-guide/', label: 'games.gg – Market guide (membership)' },
            { href: 'https://mein-mmo.de/aion-2-sanctuary-weihestaette-ludra-wo-ist-der-raid/', label: 'Mein-MMO – Ludra raid taken offline (7 Oct 2026, DE)' },
            { href: 'https://aion2.plaync.com/en-us/board/update/view?articleId=6ac5e6e8d97eae18cc40e34e', label: 'NCSOFT – Global patch notes 6/7 Oct 2026' },
            { href: 'https://aion2.plaync.com/en-us/board/update/view?articleId=6acf20d007b77e214688a7ac', label: 'NCSOFT – Global patch notes 13/14 Oct 2026' },
            { href: 'https://aion2index.com/rankings', label: 'AION2 Index – Rankings (gear of the top 10)' },
          ],
        },
      ],
    },
  ],
};
