import type { Guide } from '../types';

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
    de: 'Wie Sammeln und die fünf Handwerksberufe funktionieren, wie du sie am schnellsten levelst und welche Fehler dich Zeit und Kinah kosten.',
    en: 'How gathering and the five crafting professions work, how to level them fastest and which mistakes cost you time and Kinah.',
  },
  updated: '2026-10-14',
  tags: [
    { de: 'Sammeln', en: 'Gathering' },
    { de: 'Handwerk', en: 'Crafting' },
    { de: 'Kinah', en: 'Kinah' },
  ],
  basis: {
    de: 'Recherche in Community-Guides und Datenbanken zum globalen Server',
    en: 'Research in community guides and databases for the global server',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'facts',
          items: [
            {
              label: { de: 'Sammeln', en: 'Gathering' },
              value: { de: 'Eine einzige Fertigkeit (**Essence Extraction**) für Erz, Edelsteine, Holz, Kräuter, Kochzutaten und Odyle', en: 'One single skill (**Essence Extraction**) for ore, gems, wood, herbs, cooking ingredients and Odyle' },
            },
            {
              label: { de: 'Handwerk', en: 'Crafting' },
              value: { de: '5 Berufe – Schmieden, Rüstungsschmieden, Handwerk, Alchemie, Kochen. Ein Charakter kann alle fünf lernen.', en: '5 professions – blacksmithing, armorsmithing, handicrafting, alchemy, cooking. One character can learn all five.' },
            },
            {
              label: { de: 'Meisterschaft', en: 'Mastery' },
              value: { de: 'Stufe 1–50 „Novice“, 51–100 „Professional“ – der Aufstieg bei 50 braucht eine Quest', en: 'Level 1–50 "Novice", 51–100 "Professional" – moving up at 50 needs a quest' },
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
            de: 'Auch **fehlgeschlagene Sammelversuche geben Erfahrung**. Sammle beim Questen also alles mit, was am Weg liegt – auch schwierige Vorkommen.',
            en: '**Failed gathering attempts still give experience.** So pick up everything on your way while questing – even difficult nodes.',
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
      title: { de: 'So funktioniert Sammeln', en: 'How gathering works' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: 'Am Vorkommen mit **F** interagieren. Es startet ein kleines Minispiel mit einer **Erfolgs-** und einer **Fehlschlagleiste** – die Leiste, die zuerst voll ist, entscheidet.', en: 'Interact with a node using **F**. A small mini-game starts with a **success** and a **failure** bar – whichever fills first decides.' },
            { de: 'Pro Vorkommen hast du nur wenige Versuche, und **jeder Versuch kostet Haltbarkeit** – auch ein Fehlschlag.', en: 'Each node only allows a few attempts, and **every attempt costs durability** – failures too.' },
            { de: 'Wirst du von einem Monster getroffen, bricht das Sammeln ab. **Räum die Gegend vorher frei.**', en: 'Getting hit by a monster interrupts gathering. **Clear the area first.**' },
            { de: 'Vorkommen gehören allen Spielern gemeinsam und erscheinen nach einigen Minuten wieder.', en: 'Nodes are shared by all players and respawn after a few minutes.' },
            { de: '**Odyle** schwebt in der Luft und wird im Flug gesammelt. Achte auf deine Flugkraft – geht sie aus, bricht der Versuch ab oder du stürzt.', en: '**Odyle** floats in the air and is gathered while flying. Watch your flight power – if it runs out, the attempt fails or you fall.' },
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
              title: { de: 'Ab Charakterstufe 10 alles mitnehmen', en: 'From character level 10, gather everything' },
              text: { de: 'Sammle beim Questen jedes Vorkommen auf deinem Weg. Weil auch Fehlschläge Erfahrung geben, lohnen sich auch schwere Vorkommen.', en: 'Gather every node on your way while questing. Since failures give experience too, difficult nodes are worth it as well.' },
            },
            {
              title: { de: 'Sammelpunkte richtig verteilen', en: 'Spend gathering points the right way' },
              text: { de: 'Zuerst **Proficient Handling** (mehr Erfolg pro Schritt) und **Delicate Touch** (weniger Fehlschlag pro Schritt), **Lady Luck** (Chance auf mehrfache Ausbeute) zuletzt. Nimm früh **Seeker** für dein Hauptmaterial – er zeigt Vorkommen auf der Minikarte. **Plentiful Harvest** nicht auf viele Materialien verteilen. Zurücksetzen kostet 50.000 Kinah.', en: 'First **Proficient Handling** (more success per step) and **Delicate Touch** (less failure per step), **Lady Luck** (chance for multiple yield) last. Take **Seeker** for your main material early – it shows nodes on the minimap. Do not spread **Plentiful Harvest** over many materials. A reset costs 50,000 Kinah.' },
            },
            {
              title: { de: 'Feste Runden laufen', en: 'Run fixed loops' },
              text: { de: 'Die meisten Sammelpunkte haben **Verteron** (Elyos) und **Altgard** (Asmodier). Lauf Kreisrouten zwischen dichten Gruppen von Vorkommen und wechsle in Kanäle mit wenig Betrieb.', en: '**Verteron** (Elyos) and **Altgard** (Asmodians) have the most gathering spots. Run loops between dense clusters of nodes and switch to quiet channels.' },
            },
            {
              title: { de: 'Vor Meisterschaft 50 den Aufstieg vorbereiten', en: 'Prepare the advancement before mastery 50' },
              text: { de: 'Für den Aufstieg zu „Professional“ brauchst du die Quest **„[Upgrade] Essence Extraction Specialty Skill“** und einen **Splendent Ruby (Bound)**. Er fällt zufällig beim normalen Rubin-Sammeln. Abgabe bei **Korius** (Elyos, Verteron) bzw. **Alzirr** (Asmodier, Altgard). Ein Radiant Ruby zählt nicht. Sprich den Quest-NPC am besten zuerst an – in Korea lässt sich der Rubin erst danach sammeln.', en: 'To advance to "Professional" you need the quest **"[Upgrade] Essence Extraction Specialty Skill"** and a **Splendent Ruby (Bound)**. It drops randomly while gathering normal rubies. Hand it in to **Korius** (Elyos, Verteron) or **Alzirr** (Asmodians, Altgard). A Radiant Ruby does not count. Best talk to the quest NPC first – in Korea the ruby can only be gathered after that.' },
            },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Sammelpunkte bis 100', en: 'Gathering points up to 100' }, value: { de: '95 allgemeine + 14 Spezialpunkte', en: '95 general + 14 special points' } },
            { label: { de: 'Ab „Professional“', en: 'From "Professional"' }, value: { de: 'Allgemeine Skills ab Stufe 6 und Spezialskills ab Stufe 2', en: 'General skills from level 6 and special skills from level 2' } },
            { label: { de: 'Rubin-Fundorte', en: 'Ruby spots' }, value: { de: 'Elyos: rund um die Verteron Fortress Ruins · Asmodier: Calderon Canyon', en: 'Elyos: around the Verteron Fortress Ruins · Asmodians: Calderon Canyon' } },
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
              text: { de: 'Konzentrier dich am Anfang auf einen Beruf. Am meisten bringt der, der die Waffe deiner Klasse herstellt.', en: 'Focus on one profession at the start. The one that makes your class weapon pays off most.' },
            },
            {
              title: { de: 'Einzeln herstellen, nicht im x10-Paket', en: 'Craft one at a time, not in x10 batches' },
              text: { de: 'Einzelne Herstellungen geben **deutlich mehr Erfahrung pro Material** als x10- oder x30-Rezepte. Die Pakete sparen nur Zeit.', en: 'Single crafts give **much more experience per material** than x10 or x30 recipes. Batches only save time.' },
            },
            {
              title: { de: 'Billige Zwischenmaterialien herstellen', en: 'Craft cheap intermediate materials' },
              text: { de: 'Bis mindestens Meisterschaft 50 gibt ein niedriges Rezept weiter die volle Erfahrung. Ab Stufe 21 brauchst du pro Stufe deutlich mehr Material – plane das ein.', en: 'Up to at least mastery 50 a low recipe still gives full experience. From level 21 each level needs much more material – plan for it.' },
            },
            {
              title: { de: 'Bei Meisterschaft 50 aufsteigen', en: 'Advance at mastery 50' },
              text: { de: 'Bei 50 stoppt die Erfahrung. Die Aufstiegsquest startet von selbst: Du stellst ein Testitem her. Leg die Materialien vorher zur Seite, dann geht es ohne Pause weiter.', en: 'At 50 experience stops. The advancement quest starts by itself: you craft a test item. Put the materials aside beforehand so there is no break.' },
            },
            {
              title: { de: 'Splendent-Teile behalten', en: 'Keep Splendent items' },
              text: { de: 'Ein großer Erfolg ergibt die **Splendent**-Version eines Gegenstands. Die brauchst du als Pflichtzutat für die nächste Stufe – nicht verkaufen oder zerlegen.', en: 'A great success gives the **Splendent** version of an item. You need it as a required ingredient for the next tier – do not sell or dismantle it.' },
            },
          ],
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Schmieden & Rüstungsschmieden', en: 'Blacksmithing & armorsmithing' }, value: { de: 'Orichalcum Ingot (2 Erz + Lösungsmittel für 400 Kinah); Rüstungsschmiede zusätzlich Strong Leather (2 Raw Leather, ohne Reagenz)', en: 'Orichalcum Ingot (2 ore + solvent for 400 Kinah); armorsmiths also Strong Leather (2 Raw Leather, no reagent)' } },
            { label: { de: 'Handwerk', en: 'Handicrafting' }, value: { de: 'Sapphire Decoration und Yggdrasil Wood (je 400 Kinah Reagenz)', en: 'Sapphire Decoration and Yggdrasil Wood (400 Kinah reagent each)' } },
            { label: { de: 'Alchemie', en: 'Alchemy' }, value: { de: 'Stufe 1–4 Magic Crystal, ab 5 Spiritstone Powder und Yggdrasil Paper (ohne Reagenz)', en: 'Level 1–4 Magic Crystal, from 5 Spiritstone Powder and Yggdrasil Paper (no reagent)' } },
            { label: { de: 'Kochen', en: 'Cooking' }, value: { de: 'Teurer: etwa 880–1.320 Kinah Reagenzien pro Herstellung', en: 'More expensive: about 880–1,320 Kinah in reagents per craft' } },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Testitems für den Aufstieg bei 50:** Schmieden – Hammer aus 6 Ingots + 3 Odyle · Rüstungsschmieden – Stoff aus 6 Ingots + 3 Odyle · Handwerk – Lupe aus 4 Yggdrasil Wood + 2 Sapphire Decoration + 3 Odyle · Alchemie – Waage aus 6 Magic Crystal + 2 Spiritstone Powder + 3 Odyle.', en: '**Test items for the advancement at 50:** blacksmithing – hammer from 6 ingots + 3 Odyle · armorsmithing – fabric from 6 ingots + 3 Odyle · handicrafting – magnifying glass from 4 Yggdrasil Wood + 2 Sapphire Decoration + 3 Odyle · alchemy – scale from 6 Magic Crystal + 2 Spiritstone Powder + 3 Odyle.' },
            { de: 'Die **Erfolgschance** liegt auf Rezeptstufe bei etwa 68–95 % und steigt mit höherer Meisterschaft. Ein Fehlschlag verbraucht die Materialien.', en: 'The **success chance** is about 68–95 % at recipe level and rises with higher mastery. A failure uses up the materials.' },
            { de: 'Ein Treffer während des Herstellens zählt als Fehlschlag – **stell nur an sicheren Orten her**.', en: 'Getting hit while crafting counts as a failure – **only craft in safe places**.' },
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
            { de: 'Den **Markt** gibt es ab Charakterstufe 45. Laut offiziellem NC-Datenblatt kannst du ohne Abo verkaufen, Kaufen geht nur mit Abo. Rechne mit rund 10 % Steuer plus Einstellgebühr.', en: 'The **market** opens at character level 45. According to the official NC fact sheet you can sell without a subscription, but buying needs one. Expect about 10 % tax plus a listing fee.' },
            { de: 'Verkäufe an Händler bringen nur **gebundene** Kinah. Handelbare Kinah gibt es über den Markt.', en: 'Selling to vendors only gives **bound** Kinah. Tradeable Kinah comes from the market.' },
            { de: 'Odyle ist beim Händler etwa viermal so viel wert wie andere Materialien und lässt sich 1:1 in gebundenes Erz, Edelsteine oder Holz gleicher Qualität umwandeln.', en: 'Odyle sells for about four times as much as other materials at vendors and converts 1:1 into bound ore, gems or wood of the same quality.' },
            { de: 'Alchemie-Verarbeitung (Pulver, Papier) verdreifacht etwa den Händlerpreis der Rohstoffe.', en: 'Alchemy processing (powder, paper) roughly triples the vendor price of the raw materials.' },
            { de: '**Neu seit dem Patch vom 14.10.:** Das Einstellen von Sammelmaterialien auf dem Markt wird abhängig von deiner Spielhistorie eingeschränkt. Genaue Regeln nennt der Patch nicht.', en: '**New since the 14 Oct patch:** listing gathered materials on the market is restricted based on your play history. The patch does not give exact rules.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Erst rechnen, dann herstellen', en: 'Calculate first, craft second' },
          text: {
            de: 'Selbst gesammeltes Material ist nicht „gratis“ – du könntest es auch verkaufen. Beispiel aus der Community (5.10.): Ein Splendent Orichalcum Longsword kostete in der Herstellung rund 223.000 Kinah, gekauft rund 100.000.',
            en: 'Material you gathered yourself is not "free" – you could sell it instead. Community example (5 Oct): a Splendent Orichalcum Longsword cost about 223,000 Kinah to craft but about 100,000 to buy.',
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
            { de: 'Sammelpunkte nicht wahllos verteilen', en: 'Do not spend gathering points at random' },
            { de: 'Zum Leveln keine x10-Pakete herstellen', en: 'Do not level with x10 batches' },
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
            de: 'Diese Punkte sind für den globalen Server noch nicht eindeutig belegt: ab welcher Charakterstufe Sammeln genau freigeschaltet ist (Quellen nennen 10 oder 45), wie lange Vorkommen zum Wiedererscheinen brauchen, wie viel Erfahrung ein Vorkommen gibt und wie oft der Splendent Ruby fällt. Wenn du es im Spiel herausfindest, sag Bescheid – dann wird der Guide ergänzt.',
            en: 'These points are not clearly confirmed for the global server yet: the exact character level at which gathering unlocks (sources say 10 or 45), node respawn times, experience per node and the drop rate of the Splendent Ruby. If you find out in game, let us know and the guide gets updated.',
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
            { href: 'https://metabot.gg/en/aion-2/gathering', label: 'metabot.gg – Gathering' },
            { href: 'https://metabot.gg/en/aion-2/guides/kinah-farming-guide', label: 'metabot.gg – Kinah farming' },
            { href: 'https://aion2.gaming.tools/guides/crafting', label: 'aion2.gaming.tools – Crafting (global)' },
            { href: 'https://aion2.wiki.fextralife.com/Gathering', label: 'Fextralife wiki – Gathering' },
            { href: 'https://aion2.wiki.fextralife.com/Crafting', label: 'Fextralife wiki – Crafting' },
            { href: 'https://allthings.how/aion-2-how-to-upgrade-essence-extraction-to-professional/', label: 'allthings.how – Essence Extraction to Professional' },
            { href: 'https://aion2atlas.app/guides/essence-extraction/', label: 'aion2atlas – Essence Extraction' },
            { href: 'https://games.gg/aion-2/guides/aion-2-market-guide/', label: 'games.gg – Market guide' },
            { href: 'https://aion2hub.com/updates/aion-2-global-update-2026-10-14', label: 'aion2hub – Global update 14 Oct 2026' },
          ],
        },
      ],
    },
  ],
};
