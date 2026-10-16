import type { Guide } from '../types';

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
    de: 'Welcher Beruf welche Waffe und Rüstung herstellt, der schnellste Weg auf Meisterschaft 55/60 und die ganze Kette vom Orichalcum-Schwert bis zum Dragon-Lord-Teil auf Stufe 102.',
    en: 'Which profession makes which weapon and armor, the fastest way to mastery 55/60 and the whole chain from the Orichalcum sword to the item level 102 Dragon Lord piece.',
  },
  updated: '2026-10-16',
  tags: [
    { de: 'Handwerk', en: 'Crafting' },
    { de: 'Waffen', en: 'Weapons' },
    { de: 'Rüstung', en: 'Armor' },
    { de: 'Dragon Lord', en: 'Dragon Lord' },
  ],
  basis: {
    de: 'Recherche in Community-Guides, Datenbanken und koreanischen Tests zum globalen Server (Stand 16.10.2026)',
    en: 'Research in community guides, databases and Korean tests for the global server (as of 16 Oct 2026)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
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
                de: 'Novice 1–50: 8.809 · bis 55 insgesamt ≈ 11.300 · bis 60 ≈ 14.950',
                en: 'Novice 1–50: 8,809 · up to 55 about 11,300 in total · up to 60 about 14,950',
              },
            },
            {
              label: { de: 'Pflichtzutat', en: 'Required input' },
              value: {
                de: 'Jede Stufe braucht die **Splendent**-Version der Stufe davor. Das erste Dragon-Lord-Teil braucht ein Artisan’s-Splendent-Teil desselben Typs.',
                en: 'Every tier needs the **Splendent** version of the tier below. The first Dragon Lord piece needs an Artisan’s Splendent piece of the same type.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Kurz gesagt', en: 'In short' },
          text: {
            de: 'Beruf nach deinem Zielteil wählen, bis 50 nur **einzeln** herstellen und dabei die Kette Orichalcum → Expert’s → Artisan’s bis zum Splendent-Teil hochziehen. Bei 50 **sofort** aufsteigen. Ab 51 stellst du die Balaur-Zutaten für dein Rezept her – die bringen nebenbei viel Erfahrung für 55.',
            en: 'Pick the profession of your target piece, craft **one at a time** up to 50 and climb the chain Orichalcum → Expert’s → Artisan’s up to the Splendent piece on the way. Advance **right away** at 50. From 51 you craft the Balaur ingredients for your recipe – they give a lot of experience towards 55 on the side.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          text: {
            de: 'Gegenstände, Berufe und Dungeons stehen hier so, wie sie im englischen Client heißen. Im deutschen Client können sie anders lauten.',
            en: 'Items, professions and dungeons are named as in the English client.',
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
              de: '**Rüstungsschmieden (Armorsmithing):** alle 7 Rüstungsteile – Helm, Schulter, Brust, Hose, Handschuhe, Stiefel, Umhang. Es gibt **keine Rüstungsklassen** wie Stoff, Leder oder Platte: Jede Klasse trägt dieselben Teile.',
              en: '**Armorsmithing:** all 7 armor pieces – helm, pauldrons, chest, legs, gloves, boots, cloak. There are **no armor weight classes** like cloth, leather or plate: every class wears the same pieces.',
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
              de: '**Kochen (Cooking):** Essen, keine Ausrüstung.',
              en: '**Cooking:** food, no gear.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: {
            de: 'Ein Charakter kann alle fünf Berufe lernen. Konzentrier dich trotzdem zuerst auf **einen** – die seltenen Zutaten reichen sonst nirgends.',
            en: 'One character can learn all five professions. Still, focus on **one** first – otherwise the rare ingredients run short everywhere.',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: '**Nicht herstellbar:** Gürtel, Outfits und Skins (die gibt es im Atelier-Shop und bei Events). Armbänder gehen nur bis zum Pilgrim Bracelet (Epic, Stufe 43) und haben keine Splendent-Version.',
              en: '**Not craftable:** belts, outfits and skins (those come from the Atelier shop and events). Bracelets only go up to the Pilgrim Bracelet (Epic, level 43) and have no Splendent version.',
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Die Leiter: von Orichalcum bis Dragon Lord', en: 'The ladder: from Orichalcum to Dragon Lord' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Herstellbare Ausrüstung ist eine Leiter. Jede Sprosse braucht als Zutat die **Splendent**-Version der Sprosse darunter. Gegenstandsstufen am Beispiel Langschwert:',
            en: 'Craftable gear is a ladder. Every rung needs the **Splendent** version of the rung below as an ingredient. Item levels, using the longsword as the example:',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Orichalcum', en: 'Orichalcum' }, value: { de: 'ab Meisterschaft 3 · Stufe 18, Splendent 22', en: 'from mastery 3 · level 18, Splendent 22' } },
            { label: { de: 'Expert’s', en: 'Expert’s' }, value: { de: 'ab 15 · Stufe 28, Splendent 35', en: 'from 15 · level 28, Splendent 35' } },
            { label: { de: 'Artisan’s', en: 'Artisan’s' }, value: { de: 'ab 30 · Stufe 39, Splendent 44', en: 'from 30 · level 39, Splendent 44' } },
            { label: { de: 'True/Star Dragon Lord', en: 'True/Star Dragon Lord' }, value: { de: 'ab 55 bzw. 60 · Stufe 62, Splendent 70', en: 'from 55 or 60 · level 62, Splendent 70' } },
            { label: { de: 'White/Dark Dragon Lord', en: 'White/Dark Dragon Lord' }, value: { de: 'per Transfer · Stufe 78, Splendent 86', en: 'by transfer · level 78, Splendent 86' } },
            { label: { de: 'Wise/Ebony Dragon Lord', en: 'Wise/Ebony Dragon Lord' }, value: { de: 'per Transfer · Stufe 94, Splendent 102', en: 'by transfer · level 94, Splendent 102' } },
          ],
        },
        {
          type: 'list',
          items: [
            {
              de: '**Combo:** Nach einem Erfolg gibt es eine feste Chance von **25 %** auf die Splendent-Version (Essen 30 %, manche Manasteine 20 %, Ingots und Armbänder gar nicht). Die Combo würfelt aber noch einmal auf Erfolg – rechne an der Rezeptstufe mit etwa **einem Splendent-Teil pro 6–7 Versuche**.',
              en: '**Combo:** after a success there is a fixed **25 %** chance for the Splendent version (food 30 %, some manastones 20 %, ingots and bracelets none). The combo rolls for success once more though – at recipe level expect about **one Splendent piece per 6–7 attempts**.',
            },
            {
              de: '**Erfolgschance** an der Rezeptstufe: normale Rezepte ≈ 74 %, Expert’s ≈ 77 %, Artisan’s ≈ 80 %, Dragon Lord nur **67,5 %**. Sie steigt mit jeder Meisterschaftsstufe über dem Rezept, bis etwa 93–97 % rund 42–50 Stufen darüber.',
              en: '**Success chance** at recipe level: normal recipes about 74 %, Expert’s about 77 %, Artisan’s about 80 %, Dragon Lord only **67.5 %**. It rises with every mastery level above the recipe, up to about 93–97 % some 42–50 levels above it.',
            },
            {
              de: '**Fehlschlag** heißt: Materialien weg. Du bekommst aber 30 % der Erfahrung. Ein Treffer während des Herstellens zählt als Fehlschlag.',
              en: 'A **failure** means the materials are gone. You still get 30 % of the experience. Getting hit while crafting counts as a failure.',
            },
            {
              de: '**Transfer-Herstellung** (White/Dark, Wise/Ebony und bei Dragon Lord auch normal → Splendent): gelingt laut Fextralife **immer** und behält Verstärkung, Amplify und Seelenbindung. Das Ergebnis ist seelengebunden.',
              en: '**Transfer crafting** (White/Dark, Wise/Ebony and, for Dragon Lord, also normal → Splendent): according to Fextralife it **always succeeds** and keeps enhancement, amplification and Soul Binding. The result is soul bound.',
            },
          ],
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
                de: 'Schwert, Dolch, Streitkolben: Schmieden. Brust, Hose, Helm: Rüstungsschmieden. Ring: Handwerk. Fang mit der Waffe und den 55er-Teilen an – die 60er-Teile kommen später.',
                en: 'Sword, dagger, mace: blacksmithing. Chest, legs, helm: armorsmithing. Ring: handicrafting. Start with the weapon and the mastery-55 pieces – the 60 pieces come later.',
              },
            },
            {
              title: { de: 'Novice 1–50 mit billigen Einzelherstellungen', en: 'Novice 1–50 with cheap single crafts' },
              text: {
                de: 'Schmieden und Rüstungsschmieden: **Orichalcum Ingot** (2 Erz + Lösungsmittel für 400 Kinah) – 10 Ingots brachten einen Tester von Meisterschaft 1 auf 6. Handwerk: Sapphire Decoration und Yggdrasil Wood. Alchemie: ab 5 **Spiritstone Powder**, danach Wind Serum – Alchemie gilt als der leichteste Beruf zum Leveln.',
                en: 'Blacksmithing and armorsmithing: **Orichalcum Ingot** (2 ore + solvent for 400 Kinah) – 10 ingots took a tester from mastery 1 to 6. Handicrafting: Sapphire Decoration and Yggdrasil Wood. Alchemy: from 5 **Spiritstone Powder**, then Wind Serum – alchemy is said to be the easiest profession to level.',
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
                de: 'Ab 3 Orichalcum-, ab 15 Expert’s- und ab 30 Artisan’s-Versionen deines Zielteils herstellen. Die geben deutlich mehr Erfahrung (koreanische Werte: Ingot 20, Orichalcum Guard 84, Expert’s Guard 240, Artisan’s Guard 600), und am Ende brauchst du ohnehin **ein Artisan’s-Splendent-Teil**. Normale Ergebnisse gehen in die Supply Requests oder auf den Markt.',
                en: 'From 3 craft the Orichalcum, from 15 the Expert’s and from 30 the Artisan’s version of your target piece. They give much more experience (Korean values: ingot 20, Orichalcum Guard 84, Expert’s Guard 240, Artisan’s Guard 600), and in the end you need **one Artisan’s Splendent piece** anyway. Normal results go into Supply Requests or onto the market.',
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
              title: { de: '51–55: Balaur-Zutaten selbst herstellen', en: '51–55: craft the Balaur ingredients yourself' },
              text: {
                de: 'Ab 51 stellst du die Balaur-Zutaten für dein Rezept her: fürs Langschwert 22 **Fine Thick Balaur Horn** (je 2 Balaur’s Essence + 1 Zircon Hammer vom Händler), für Rüstung **Tanned Thick Balaur Leather** (2 Balaur’s Essence + 1 Lesser Dragon Leather Softener). Laut koreanischen Werten gibt jedes Horn mehrere hundert Erfahrung – schon wenige reichen für 51 → 55 (≈ 2.500 Erfahrung). Alchemisten nehmen Intermediate Manastones und Soulstones (≈ 35–42 Herstellungen bis 55).',
                en: 'From 51 you craft the Balaur ingredients for your recipe: for the longsword 22 **Fine Thick Balaur Horn** (2 Balaur’s Essence + 1 Zircon Hammer from the vendor each), for armor **Tanned Thick Balaur Leather** (2 Balaur’s Essence + 1 Lesser Dragon Leather Softener). According to Korean values each horn gives several hundred experience – a few are enough for 51 → 55 (about 2,500 experience). Alchemists use Intermediate Manastones and Soulstones (about 35–42 crafts to 55).',
              },
            },
            {
              title: { de: 'Dragon Lord herstellen – oder noch ein paar Stufen warten', en: 'Craft Dragon Lord – or wait a few more levels' },
              text: {
                de: 'An der Rezeptstufe gelingt Dragon Lord nur zu **67,5 %**. Bei Meisterschaft 62 sind es ≈ 76 %, ganz oben ≈ 94,6 %. Ein Fehlschlag kostet das ganze Material samt 10 Wrathful Mind. Wenn du das Material nur einmal zusammenbekommst, level vorher noch ein paar Stufen.',
                en: 'At recipe level Dragon Lord only succeeds **67.5 %** of the time. At mastery 62 it is about 76 %, at the top about 94.6 %. A failure costs all the material including 10 Wrathful Mind. If you can only gather the material once, level a few more steps first.',
              },
            },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Erfahrung bis 55', en: 'Experience to 55' }, value: { de: '≈ 11.300 (8.809 Novice + ≈ 2.522 Professional)', en: 'about 11,300 (8,809 Novice + about 2,522 Professional)' } },
            { label: { de: 'Erfahrung bis 60', en: 'Experience to 60' }, value: { de: '≈ 14.950 (Professional 1–10: 6.138)', en: 'about 14,950 (Professional 1–10: 6,138)' } },
            { label: { de: 'Versuche pro Splendent', en: 'Attempts per Splendent' }, value: { de: '≈ 6–7 an der Rezeptstufe – für ein Artisan’s-Splendent-Teil über drei Stufen grob 60–250 Orichalcum-Herstellungen', en: 'about 6–7 at recipe level – for one Artisan’s Splendent piece across three tiers roughly 60–250 Orichalcum crafts' } },
            { label: { de: 'Abkürzung', en: 'Shortcut' }, value: { de: 'Splendent-Zwischenstufen kaufen, wenn sie billiger sind: am 5.10. kostete ein Splendent Orichalcum Longsword selbst gemacht ≈ 223.000, gekauft ≈ 100.000 Kinah', en: 'Buy Splendent intermediates when they are cheaper: on 5 Oct a Splendent Orichalcum Longsword cost about 223,000 to craft and about 100,000 Kinah to buy' } },
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
              text: { de: 'Splendent Orichalcum Longsword + Expert’s Refining Stones, Fine Orichalcum Ore und Fine Odyle → Stufe 28, Splendent 35', en: 'Splendent Orichalcum Longsword + Expert’s Refining Stones, Fine Orichalcum Ore and Fine Odyle → level 28, Splendent 35' },
            },
            {
              title: { de: 'Artisan’s Longsword (30)', en: 'Artisan’s Longsword (30)' },
              text: { de: 'Expert’s Splendent + 5 Artisan’s Refining Stones + 8 Pure Ore + 4 Pure Odyle → Stufe 39, Splendent 44', en: 'Expert’s Splendent + 5 Artisan’s Refining Stones + 8 Pure Ore + 4 Pure Odyle → level 39, Splendent 44' },
            },
            {
              title: { de: 'True Dragon Lord Longsword (55)', en: 'True Dragon Lord Longsword (55)' },
              text: { de: 'Artisan’s Splendent Orichalcum Longsword + 4 Artisan’s Ultimate Refining Stone + 22 Fine Thick Balaur Horn + 10 Wrathful Mind + 9 Radiant Orichalcum Ore + 5 Radiant Odyle → Unique, Stufe 62', en: 'Artisan’s Splendent Orichalcum Longsword + 4 Artisan’s Ultimate Refining Stone + 22 Fine Thick Balaur Horn + 10 Wrathful Mind + 9 Radiant Orichalcum Ore + 5 Radiant Odyle → Unique, level 62' },
            },
            {
              title: { de: 'Splendent True Dragon Lord (Transfer)', en: 'Splendent True Dragon Lord (transfer)' },
              text: { de: 'Kein Combo-Glück nötig: True Dragon Lord + 11 Fine Thick Balaur Horn + 4 Wrathful Mind → Splendent, Stufe 70', en: 'No combo luck needed: True Dragon Lord + 11 Fine Thick Balaur Horn + 4 Wrathful Mind → Splendent, level 70' },
            },
            {
              title: { de: 'White/Dark Dragon Lord (Transfer)', en: 'White/Dark Dragon Lord (transfer)' },
              text: { de: 'Splendent True + ein weiteres Artisan’s-Splendent-Langschwert + 5 Ultimate Refining Stones + 29 Fine Hard Balaur Horn + 3 Wrathful Mind + 15 Will + 12 Radiant Ore + 7 Radiant Odyle → Stufe 78, Splendent 86', en: 'Splendent True + another Artisan’s Splendent longsword + 5 Ultimate Refining Stones + 29 Fine Hard Balaur Horn + 3 Wrathful Mind + 15 Will + 12 Radiant Ore + 7 Radiant Odyle → level 78, Splendent 86' },
            },
            {
              title: { de: 'Wise/Ebony Dragon Lord (Transfer)', en: 'Wise/Ebony Dragon Lord (transfer)' },
              text: { de: 'Splendent White + noch ein Artisan’s-Splendent-Langschwert + 6 Ultimate Refining Stones + 41 Fine Durable Balaur Horn + 3 Wrathful Mind + 3 Will + 20 Ego + 15 Radiant Ore + 9 Radiant Odyle → Stufe 94, Splendent 102', en: 'Splendent White + one more Artisan’s Splendent longsword + 6 Ultimate Refining Stones + 41 Fine Durable Balaur Horn + 3 Wrathful Mind + 3 Will + 20 Ego + 15 Radiant Ore + 9 Radiant Odyle → level 94, Splendent 102' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Für die ganze Kette', en: 'For the whole chain' },
          text: {
            de: 'Bis Splendent Wise/Ebony brauchst du **drei** Artisan’s-Splendent-Teile derselben Waffe und grob 20 Wrathful Mind, 23 Will, 27 Ego und 17 Ultimate Refining Stones (aus den Rezepten zusammengerechnet). Fine Hard Balaur Horn lässt sich ab Meisterschaft 65 herstellen, Fine Durable ab 80 – oder du kaufst sie.',
            en: 'Up to Splendent Wise/Ebony you need **three** Artisan’s Splendent pieces of the same weapon and roughly 20 Wrathful Mind, 23 Will, 27 Ego and 17 Ultimate Refining Stones (added up from the recipes). Fine Hard Balaur Horn can be crafted from mastery 65, Fine Durable from 80 – or you buy them.',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Artisan’s Ultimate Refining Stone', en: 'Artisan’s Ultimate Refining Stone' }, value: { de: 'Expeditionen, Shugo Festa, Bosse in Draupnir (≈ 9–10 %), Season Shop', en: 'Expeditions, Shugo Festa, Draupnir bosses (about 9–10 %), Season Shop' } },
            { label: { de: 'Wrathful Mind', en: 'Wrathful Mind' }, value: { de: 'Eroberungs-Dungeons (Krao Cave, Draupnir, Urugugu, Vakron, Fire Temple, Ferocious Horn Den), Ludra, Season Shop · Markt am 5.10. ≈ 350.000 Kinah pro Stück', en: 'Conquest dungeons (Krao Cave, Draupnir, Urugugu, Vakron, Fire Temple, Ferocious Horn Den), Ludra, Season Shop · market on 5 Oct about 350,000 Kinah each' } },
            { label: { de: 'Will / Ego', en: 'Will / Ego' }, value: { de: 'Will: Urugugu, Vakron, Fire Temple, Ferocious Horn Den, Ludra · Ego: Fire Temple, Ferocious Horn Den, Ludra', en: 'Will: Urugugu, Vakron, Fire Temple, Ferocious Horn Den, Ludra · Ego: Fire Temple, Ferocious Horn Den, Ludra' } },
            { label: { de: 'Balaur’s Essence', en: 'Balaur’s Essence' }, value: { de: 'Benannte Elite-Monster in Verteron und Altgard, Kaira-Bosse in Lower Reshanta, Eroberungs-Dungeons, Ludra – nicht verkaufbar', en: 'Named elites in Verteron and Altgard, Kaira bosses in Lower Reshanta, Conquest dungeons, Ludra – not sellable' } },
            { label: { de: 'Erz, Holz, Odyle', en: 'Ore, wood, Odyle' }, value: { de: 'Sammeln – die Radiant-Qualität für Dragon Lord', en: 'Gathering – the Radiant quality for Dragon Lord' } },
            { label: { de: 'Händler-Reagenzien', en: 'Vendor reagents' }, value: { de: 'Lösungsmittel 400 Kinah, Hämmer 4.650–6.550 Kinah – immer gebunden', en: 'Solvent 400 Kinah, hammers 4,650–6,550 Kinah – always bound' } },
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
              text: { de: 'Wie bei Waffen: die Splendent-Version der Stufe davor + ein weiteres Artisan’s-Splendent-Teil desselben Slots + Wrathful Mind, Will und Ego', en: 'Like weapons: the Splendent version of the tier below + another Artisan’s Splendent piece of the same slot + Wrathful Mind, Will and Ego' },
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
              de: '**Schmuck** macht der Handwerker: Orichalcum-Ringe ab 3, Ohrringe ab 5, Halsketten ab 10. Der Dragon-Lord-Ring kommt ab 55, Halskette und Ohrringe ab 60.',
              en: '**Jewelry** comes from handicrafting: Orichalcum rings from 3, earrings from 5, necklaces from 10. The Dragon Lord ring comes at 55, necklace and earrings at 60.',
            },
            {
              de: '**Keine Setboni** bei hergestellter Rüstung. Dafür hat ein hergestelltes Unique-Teil 5 zufällige Nebenwerte und mehr Seelenbindungs-Zeilen als Dungeon-Ausrüstung.',
              en: '**No set bonuses** on crafted armor. In return a crafted Unique piece has 5 random sub-stats and more Soul Binding lines than dungeon gear.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Welche Teile du herstellen solltest', en: 'Which pieces to craft' },
          text: {
            de: 'Der Weg auf Global ab Stufe 45 laut MetaBot: Elite-Sets (46) → Krao Cave und Draupnir (54) → True Dragon Lord **nur für Slots, die dir nicht droppen** → Fire Temple und Ferocious Horn Den (86). Rüstung und Schmuck auf Stufe 102 gibt es **nur** als Splendent Wise/Ebony aus dem Handwerk – Ludra lässt nur Waffe und Guard fallen.',
            en: 'The path on Global from level 45 according to MetaBot: elite sets (46) → Krao Cave and Draupnir (54) → True Dragon Lord **only for slots that do not drop for you** → Fire Temple and Ferocious Horn Den (86). Level 102 armor and jewelry **only** come as crafted Splendent Wise/Ebony – Ludra only drops the weapon and guard.',
          },
        },
      ],
    },
    {
      title: { de: 'Lohnt sich das?', en: 'Is it worth it?' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Stufe 1–34:** Ausrüstung nur als Zutat und für Meisterschaft herstellen – Quest-Belohnungen sind genauso gut.', en: '**Level 1–34:** craft gear only as an ingredient and for mastery – quest rewards are just as good.' },
            { de: '**Stufe 34–44:** Das Artisan’s-Splendent-Teil ist vor allem die Zutat für Dragon Lord.', en: '**Level 34–44:** the Artisan’s Splendent piece is mainly the ingredient for Dragon Lord.' },
            { de: '**Stufe 45:** True/Star (62/70) schlägt die ersten Eroberungs-Drops (Krao Cave/Draupnir 54) und hält mit Urugugu/Vakron (70) mit.', en: '**Level 45:** True/Star (62/70) beats the first Conquest drops (Krao Cave/Draupnir 54) and keeps up with Urugugu/Vakron (70).' },
            { de: '**Fire Temple/Ferocious Horn Den** droppen Stufe 86 – dagegen brauchst du mindestens Splendent White/Dark.', en: '**Fire Temple/Ferocious Horn Den** drop level 86 – to beat that you need at least Splendent White/Dark.' },
            { de: '**Endgame:** Ludra-Waffe 102 gegen Splendent Wise/Ebony 102. Hergestellte Waffen haben dazu 5 % PvE-Schadensbonus und mehr Seelenbindungs-Zeilen. Nachteil: Auf den Zwischenstufen geht Amplify nur bis +1 (70) bzw. +3 (86).', en: '**Endgame:** Ludra weapon 102 against Splendent Wise/Ebony 102. Crafted weapons also have a 5 % PvE damage boost and more Soul Binding lines. Downside: on the middle tiers amplification only goes to +1 (70) or +3 (86).' },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Erst rechnen', en: 'Calculate first' },
          text: {
            de: 'Allein die 10 Wrathful Mind für ein True-Dragon-Lord-Langschwert kosteten am 5.10. rund 3,5 Mio. Kinah. Vergleiche vorher: Was kostet das fertige Teil auf dem Markt, was kosten die Zutaten, und wie oft kann es scheitern (an der Rezeptstufe jedes dritte Mal)?',
            en: 'The 10 Wrathful Mind for one True Dragon Lord longsword alone cost about 3.5 million Kinah on 5 Oct. Compare first: what does the finished piece cost on the market, what do the ingredients cost, and how often can it fail (one in three at recipe level)?',
          },
        },
        {
          type: 'heading',
          text: { de: 'Wohin mit Resten', en: 'Where leftovers go' },
        },
        {
          type: 'list',
          items: [
            { de: '**Supply Requests** (ab Stufe 25, Esc → Abyss Supply Request): normale Herstellungen gegen Abyss-Punkte und Enhance Stones abgeben. Refining Stones, Balaur-Schuppen und Radiant Odyle **nicht** abgeben.', en: '**Supply Requests** (from level 25, Esc → Abyss Supply Request): turn in normal crafts for Abyss Points and Enhance Stones. Do **not** turn in Refining Stones, Balaur scales or Radiant Odyle.' },
            { de: '**Zerlegen:** Ein True-Dragon-Lord-Teil gibt 320 Enhance Stones.', en: '**Dismantle:** a True Dragon Lord piece gives 320 Enhance Stones.' },
            { de: '**Verkaufen:** frische, nicht gebundene Herstellungen über den Markt (ab Stufe 45, ≈ 10 % Steuer). Ergebnisse aus Transfer-Rezepten sind seelengebunden.', en: '**Sell:** fresh, unbound crafts on the market (from level 45, about 10 % tax). Results of transfer recipes are soul bound.' },
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
            { label: { de: 'Meisterschaft', en: 'Mastery' }, value: { de: 'Korea hat die Grenze im April 2026 angehoben, Global nicht. Die Erfahrungskurve ist gleich.', en: 'Korea raised the cap in April 2026, Global did not. The experience curve is the same.' } },
            { label: { de: 'Stufen', en: 'Tiers' }, value: { de: 'Korea hat zusätzliche Heroic-Stufen ab 108 – Global endet bei Wise/Ebony 102', en: 'Korea has extra Heroic tiers from 108 – Global ends at Wise/Ebony 102' } },
            { label: { de: 'Wise/Ebony', en: 'Wise/Ebony' }, value: { de: 'Korea: direkt herstellbar ab Meisterschaft 85/90 · Global: nur per Transfer', en: 'Korea: craftable directly from mastery 85/90 · Global: only by transfer' } },
            { label: { de: 'Normal → Splendent', en: 'Normal → Splendent' }, value: { de: 'Korea: nur Kinah · Global: Zutaten (z. B. 11 Hörner + 4 Wrathful Mind)', en: 'Korea: Kinah only · Global: ingredients (e.g. 11 horns + 4 Wrathful Mind)' } },
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
            de: 'Für Global noch nicht eindeutig belegt: die Erfahrung pro Rezept (hier stehen koreanische Werte), ob Transfer wirklich nie scheitert (Fextralife sagt garantiert, eine Quelle meint, bei Fehlschlag sind die Zutaten weg), wie viele Seelenbindungs-Zeilen hergestellte Teile haben (4 oder 5), die genauen Mengen einiger Dragon-Lord-Rezepte und ob normale Herstellungen gebunden sind. Wenn du es im Spiel siehst, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'Not clearly confirmed for Global yet: the experience per recipe (Korean values are given here), whether transfers really never fail (Fextralife says guaranteed, one source says the ingredients are lost on failure), how many Soul Binding lines crafted pieces have (4 or 5), the exact amounts of some Dragon Lord recipes and whether normal crafts are bound. If you see it in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/guides/crafting-guide', label: 'metabot.gg – Crafting guide' },
            { href: 'https://metabot.gg/en/aion-2/guides/gear-progression-guide', label: 'metabot.gg – Gear progression guide' },
            { href: 'https://aion2.wiki.fextralife.com/Crafting', label: 'Fextralife wiki – Crafting' },
            { href: 'https://aion2.wiki.fextralife.com/True_Dragon_Lord_Longsword', label: 'Fextralife wiki – True Dragon Lord Longsword' },
            { href: 'https://www.keengamer.com/articles/guides/aion-2-crafting-guide-professions-gear-materials/', label: 'KeenGamer – Crafting guide' },
            { href: 'https://space4games.com/en/games-en/aion-2-crafting-guide/', label: 'Space4Games – Crafting guide' },
            { href: 'https://corpus.gg/blog/aion-2/crafting-guide', label: 'corpus.gg – Crafting guide' },
            { href: 'https://timesaver.gg/blog/aion-2-crafting-guide', label: 'timesaver.gg – Crafting guide' },
            { href: 'https://wikily.gg/aion-2/crafting', label: 'wikily.gg – Crafting' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1161', label: 'Inven (KR) – crafting experience per recipe' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/917', label: 'Inven (KR) – combo test' },
            { href: 'https://www.inven.co.kr/board/aion2/6444/1624', label: 'Inven (KR) – mastery cap raised (April 2026)' },
            { href: 'https://aion2.plaync.com/en-us/board/update/view?articleId=6ac5e6e8d97eae18cc40e34e', label: 'NCSOFT – Global patch notes 6/7 Oct 2026' },
            { href: 'https://aion2.plaync.com/en-us/board/update/view?articleId=6acf20d007b77e214688a7ac', label: 'NCSOFT – Global patch notes 13/14 Oct 2026' },
          ],
        },
      ],
    },
  ],
};
