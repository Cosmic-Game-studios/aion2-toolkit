import type { GuideBlock } from '../types';

/**
 * Playstyles of the Sorcerer: fire burst (the main build), PvP control, solo / safe play, and why a frost build does not
 * pay off in PvE (sources: games.gg, GamerBlurb, MetaBot, Space4Games, AION2 Builds – skill data of the global client –
 * AION2 Index top 10 of 2026-10-18)
 */
export const sorcererPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Der Magier hat einen Schadens-Build und zwei Varianten, die Schaden gegen Sicherheit tauschen: **PvP-Kontrolle** und **allein / sicher spielen**. Alle drei behalten dieselbe Feuer-Rotation – es ändern sich die Stigmen, ein paar Spezialisierungen und Passive. Einen Frost-Magier fürs PvE gibt es nicht wirklich: Frost ist bei dir ein Kontroll-Werkzeug, kein Schaden.',
      en: 'The Sorcerer has one damage build and two variants that trade damage for safety: **PvP control** and **solo / safe play**. All three keep the same fire rotation – what changes are the stigmas, a few specialisations and passives. A frost Sorcerer for PvE does not really exist: for you, frost is a control tool, not damage.',
    },
  },
  {
    type: 'compare',
    title: { de: 'Vier Spielstile im Vergleich', en: 'Four playstyles compared' },
    caption: {
      de: 'Zahlen der Top 10: AION2 Index, 18.10.2026. „Aktiv“ = im Stigma-Set, das die Seite beim Lesen zeigte; „bereit“ = in einem anderen Preset oder auf einer Leiste (ohne sichtbare Stufe).',
      en: 'Top 10 numbers: AION2 Index, 18 Oct 2026. “Active” = in the stigma set the site showed when it was read; “ready” = on another preset or a skill bar (no level visible).',
    },
    items: [
      {
        title: { de: 'Feuer-Burst (Haupt-Build)', en: 'Fire burst (main build)' },
        tag: { de: 'PvE · Gruppe', en: 'PvE · group' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: '7 der Top 10 spielen genau dieses Set aktiv: [[15400000|Element Enhancement]], [[15320000|Delayed Explosion]], [[15390000|Fire Wall]] und [[15200000|Cold Storm]].', en: '7 of the top 10 run exactly this set active: [[15400000|Element Enhancement]], [[15320000|Delayed Explosion]], [[15390000|Fire Wall]] and [[15200000|Cold Storm]].' } },
          { kind: 'pro', text: { de: 'Der meiste Schaden an Bossen und Gruppen – alle zehn haben [[15060000|Hellfire]] auf Stufe 19–21.', en: 'The most damage on bosses and packs – all ten have [[15060000|Hellfire]] at level 19–21.' } },
          { kind: 'con', text: { de: 'Kein Schutz-Stigma: Ein Fehler kostet dich viele LP.', en: 'No protective stigma: one mistake costs you a lot of HP.' } },
        ],
        verdict: { de: 'Deine Standardwahl für Dungeons, Raids und Bosse – der Build dieses Guides.', en: 'Your default for dungeons, raids and bosses – the build of this guide.' },
      },
      {
        title: { de: 'PvP-Kontrolle', en: 'PvP control' },
        tag: 'PvP',
        tone: 'violet',
        points: [
          { kind: 'pro', text: { de: 'Drei Schutz-Stigmen: ein Schild ([[15160000|Steel Barrier]]), 5 s Immunität ([[15410000|Hibernation]]) und weniger Schaden ([[15230000|Arctic Armor]]).', en: 'Three protective stigmas: a shield ([[15160000|Steel Barrier]]), 5 s of immunity ([[15410000|Hibernation]]) and less damage taken ([[15230000|Arctic Armor]]).' } },
          { kind: 'pro', text: { de: '[[15150000|Frost]], [[15280000|Bittercold Wind]] und [[15110000|Winter\'s Shackles]] halten Spieler auf Abstand fest.', en: '[[15150000|Frost]], [[15280000|Bittercold Wind]] and [[15110000|Winter\'s Shackles]] hold players in place at range.' } },
          { kind: 'con', text: { de: 'Weniger Schaden – im PvE lohnt das Set nicht.', en: 'Less damage – the set does not pay off in PvE.' } },
        ],
        verdict: { de: 'Für Arena, Abyss und PvP in der offenen Welt, auf einem zweiten Preset. 7 der Top 10 haben mindestens eins der drei Schutz-Stigmen aktiv oder bereit, 2 spielen gerade ein Schutz-Set.', en: 'For the Arena, the Abyss and open-world PvP, on a second preset. 7 of the top 10 have at least one of the three protective stigmas active or ready, 2 are in a protective set right now.' },
      },
      {
        title: { de: 'Allein und sicher', en: 'Solo and safe' },
        tag: { de: 'Solo · neue Dungeons', en: 'Solo · new dungeons' },
        tone: 'teal',
        points: [
          { kind: 'pro', text: { de: 'Nur ein Stigma ändert sich: [[15160000|Steel Barrier]], ein Schild mit 25 % deiner max. LP (35 % auf Stigma-Stufe 20) für 60 s.', en: 'Only one stigma changes: [[15160000|Steel Barrier]], a shield worth 25% of your max HP (35% at stigma level 20) for 60 s.' } },
          { kind: 'pro', text: { de: 'Weniger Tode beim Farmen allein und beim ersten Lauf durch einen neuen Dungeon.', en: 'Fewer deaths when you farm alone and on your first run through a new dungeon.' } },
          { kind: 'con', text: { de: 'Der Schaden des Stigmas, das rausgeht, fehlt dir.', en: 'You lose the damage of the stigma that goes out.' } },
        ],
        verdict: { de: 'Für Farmen allein und erste Läufe. 4 der Top 10 haben [[15160000|Steel Barrier]] bereit, einer aktiv.', en: 'For solo farming and first runs. 4 of the top 10 keep [[15160000|Steel Barrier]] ready, one runs it active.' },
      },
      {
        title: { de: 'Frost-Schaden', en: 'Frost damage' },
        tag: 'PvE',
        tone: 'rose',
        points: [
          { kind: 'con', text: { de: 'Dein Schaden kommt aus Feuer: [[15060000|Hellfire]], [[15040000|Firestorm]], [[15050000|Blaze]] und [[15390000|Fire Wall]].', en: 'Your damage comes from fire: [[15060000|Hellfire]], [[15040000|Firestorm]], [[15050000|Blaze]] and [[15390000|Fire Wall]].' } },
          { kind: 'con', text: { de: '[[15220000|Frost Burst]] braucht ein eingefrorenes Ziel. Bosse lassen sich nicht einfrieren (Incapacitated Immunity) – dort löst er nur mit 7 % Chance aus.', en: '[[15220000|Frost Burst]] needs a frozen target. Bosses cannot be frozen (Incapacitated Immunity) – there it only triggers with a 7% chance.' } },
          { kind: 'con', text: { de: '[[15120000|Glacial Smite]] hat nur 1 der Top 10 aktiv.', en: 'Only 1 of the top 10 has [[15120000|Glacial Smite]] active.' } },
          { kind: 'pro', text: { de: '[[15400000|Element Enhancement]] stärkt auch den Wasser-Angriff – deine Frost-Skills bekommen den Bonus ohnehin.', en: '[[15400000|Element Enhancement]] also raises Water Attack – your frost skills get the bonus anyway.' } },
        ],
        verdict: { de: 'Lohnt sich im PvE nicht. Frost ist dein Kontroll-Werkzeug fürs PvP.', en: 'Not worth it in PvE. Frost is your control tool for PvP.' },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'info',
    title: { de: 'Stil wechseln: Presets', en: 'Switching styles: presets' },
    text: {
      de: 'Leg jeden Stil auf ein eigenes **Skill-Preset** – der globale Client hat 3, und jedes hat eigene Stigmen. Der Wechsel kostet nichts, geht aber nicht beim Aufladen oder Wirken und nicht, solange ein Stigma abklingt; Stigmen tauschen geht im Kampf gar nicht. **Skillpunkte** setzt du im globalen Client kostenlos zurück (nur die des aktuellen Presets); danach wählst du die Spezialisierungen neu. Ein Spieler-Guide berichtet, dass jedes Preset deine Stigma Shards für sich neu verteilt – dann kostet ein zweites Set keine zusätzlichen Shards. Was ein Stigma-Reset kostet, ist für den globalen Client nicht bestätigt; schau ins Bestätigungsfenster. Zur Einordnung: Ein Stigma braucht 15 Stigma Shards bis Stufe 10, 35 bis 15 und 75 bis 20.',
      en: 'Put each style on a **skill preset** of its own – the global client has 3, and each has its own stigmas. Switching costs nothing, but not while you charge or cast or while a stigma is on cooldown, and stigmas cannot be swapped in combat at all. **Skill points** reset for free on the global client (only those of the current preset); afterwards you pick your specialisations again. A player guide reports that every preset spreads your Stigma Shards on its own – then a second set costs no extra shards. What a stigma reset costs is not confirmed for the global client; check the confirmation window. For scale: a stigma takes 15 Stigma Shards to level 10, 35 to 15 and 75 to 20.',
    },
  },
  { type: 'heading', text: { de: 'PvP-Kontrolle: Schild, Immunität, Einfrieren', en: 'PvP control: shield, immunity, freeze' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Haupt-Build ändert', en: 'What changes compared with the main build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Haupt-Build', en: 'Main build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        '[[15400000|Element Enhancement]], [[15320000|Delayed Explosion]], [[15390000|Fire Wall]], [[15200000|Cold Storm]]',
        { de: '[[15400000|Element Enhancement]] bleibt; dazu [[15160000|Steel Barrier]], [[15410000|Hibernation]] (5 s immun gegen Schaden und Statuseffekte, 162 s Abklingzeit auf Stufe 10) und [[15230000|Arctic Armor]] (−10 % Schaden von Spielern). Mehr Kontrolle statt [[15230000|Arctic Armor]]: [[15130000|Soul Freeze]] (Siegel mit 75 % Chance, 5 s – das Ziel kann keine Skills nutzen) oder [[15140000|Curse: Tree]] (10 s Verwandlung)', en: '[[15400000|Element Enhancement]] stays; add [[15160000|Steel Barrier]], [[15410000|Hibernation]] (5 s immune to damage and status effects, 162 s cooldown at level 10) and [[15230000|Arctic Armor]] (−10% damage from players). More control instead of [[15230000|Arctic Armor]]: [[15130000|Soul Freeze]] (Seal with a 75% chance for 5 s – the target cannot use skills) or [[15140000|Curse: Tree]] (10 s polymorph)' },
      ],
      [
        { de: 'Passive höher', en: 'Passives higher' },
        { de: 'nach Bedarf', en: 'as needed' },
        { de: '[[15790000|Revitalization Contract]] (+35 % Widerstand gegen Statuseffekte, heilt 44 % LP bei 10 % LP) und [[15770000|Grace of Resistance]] (+22 % Widerstand gegen Mental- und Schock-Effekte) auf 10. Die beiden Top-10-Spieler im Schutz-Set haben beide auf 9–10 gekauft – der Median aller zehn liegt bei 8 und 5,5', en: '[[15790000|Revitalization Contract]] (+35% Status Effect Resist, heals 44% HP at 10% HP) and [[15770000|Grace of Resistance]] (+22% Mental- and Impact-type Resist) to 10. Both top 10 players in a protective set bought them to 9–10 – the median of all ten is 8 and 5.5' },
      ],
      [
        { de: 'Spielweise', en: 'How you play' },
        { de: 'Burst-Rotation am Boss', en: 'burst rotation on the boss' },
        { de: 'Erst festhalten ([[15280000|Bittercold Wind]], [[15110000|Winter\'s Shackles]]), dann [[15150000|Frost]] → [[15220000|Frost Burst]], [[15060000|Hellfire]] aufladen, solange das Ziel steht. [[15410000|Hibernation]], wenn alle auf dich gehen; [[15240000|Defiance]] auf der Leertaste befreit dich', en: 'Hold them first ([[15280000|Bittercold Wind]], [[15110000|Winter\'s Shackles]]), then [[15150000|Frost]] → [[15220000|Frost Burst]], charge [[15060000|Hellfire]] while the target cannot move. [[15410000|Hibernation]] when everyone goes for you; [[15240000|Defiance]] on Space frees you' },
      ],
      [
        { de: 'Optionen', en: 'Options' },
        { de: 'wie im Haupt-Build', en: 'as in the main build' },
        { de: '[[15060000|Hellfire]] „im Laufen wirken“ statt +30 % Fähigkeitstempo; [[15040000|Firestorm]] „−60 % erhaltene Heilung für 5 s“ gegen Heiler – kostet eine Schadens-Option', en: '[[15060000|Hellfire]] “cast while moving” instead of +30% Skill Speed; [[15040000|Firestorm]] “−60% incoming heal for 5 s” against healers – costs a damage option' },
      ],
      [
        { de: 'Daevanion', en: 'Daevanion' },
        { de: 'Nezekan bis Triniel', en: 'Nezekan to Triniel' },
        { de: 'dazu **Azphel**: bezahlt mit Kampfkristallen aus dem PvP, Werte zählen nur gegen Spieler (auch Chance auf und Widerstand gegen Statuseffekte). Die Top 10 haben dort 23–43 von 152 Knoten offen', en: 'plus **Azphel**: paid with Battle Crystals from PvP, its stats only count against players (including Status Effect Chance and Resist). The top 10 have 23–43 of its 152 nodes open' },
      ],
      [
        { de: 'Ausrüstung', en: 'Gear' },
        { de: 'Schaden', en: 'damage' },
        { de: 'gleich – dieser Stil tauscht keine Ausrüstung', en: 'the same – this style swaps no gear' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 15150000 /* Frost */,
        parts: [15150030 /* Reset [Frost Burst] cooldown on landing Frost */, 15150040 /* +25% PC target Frost Chance */, 15150050 /* +1s Frost duration */],
        note: {
          de: 'Friert [[15150000|Frost]] ein, ist [[15220000|Frost Burst]] sofort wieder bereit; ab Skillstufe 12 +25 % Chance, Spieler einzufrieren. +1 s Frost ab Stufe 16 braucht den dritten Platz (Skillstufe 20). Im PvE brauchst du diese Optionen nicht.',
          en: 'When [[15150000|Frost]] freezes, [[15220000|Frost Burst]] is ready again at once; from skill level 12 +25% chance to freeze players. +1 s of Frost from level 16 needs the third slot (skill level 20). You do not need these options in PvE.',
        },
      },
      {
        id: 15240000 /* Defiance */,
        parts: [15240030 /* Restores 20% HP on using [Defiance] */, 15240040 /* +2s Tenacity duration */],
        note: {
          de: '20 % LP beim Befreien und 2 s länger immun gegen Kontrolle (Tenacity). Die Top 10 haben [[15240000|Defiance]] auf Stufe 7–14 – also zwei Plätze.',
          en: '20% HP when you break free and 2 s longer immune to control (Tenacity). The top 10 have [[15240000|Defiance]] at level 7–14 – so two slots.',
        },
      },
    ],
  },
  {
    type: 'table',
    caption: { de: 'PvP-Stigmen neben Element Enhancement: Die Quellen sind sich uneins', en: 'PvP stigmas besides Element Enhancement: the sources disagree' },
    head: [{ de: 'Quelle', en: 'Source' }, { de: 'Drei weitere Stigmen', en: 'Three more stigmas' }],
    rows: [
      [{ de: 'Dieser Guide', en: 'This guide' }, '[[15160000|Steel Barrier]], [[15410000|Hibernation]], [[15230000|Arctic Armor]]'],
      [{ de: 'Top 10 Nr. 10 (aktiv)', en: 'Top 10 No. 10 (active)' }, { de: '[[15160000|Steel Barrier]] 20, [[15410000|Hibernation]] 15, [[15230000|Arctic Armor]] 10', en: '[[15160000|Steel Barrier]] 20, [[15410000|Hibernation]] 15, [[15230000|Arctic Armor]] 10' }],
      [{ de: 'Top 10 Nr. 1 (aktiv)', en: 'Top 10 No. 1 (active)' }, { de: '[[15230000|Arctic Armor]] 20, [[15410000|Hibernation]] 10, [[15390000|Fire Wall]] 20 – [[15130000|Soul Freeze]] bereit', en: '[[15230000|Arctic Armor]] 20, [[15410000|Hibernation]] 10, [[15390000|Fire Wall]] 20 – [[15130000|Soul Freeze]] ready' }],
      [{ de: 'games.gg (Arena)', en: 'games.gg (Arena)' }, { de: '[[15160000|Steel Barrier]], [[15130000|Soul Freeze]], [[15410000|Hibernation]] – [[15230000|Arctic Armor]] für lange Kämpfe', en: '[[15160000|Steel Barrier]], [[15130000|Soul Freeze]], [[15410000|Hibernation]] – [[15230000|Arctic Armor]] for long fights' }],
      [{ de: 'games.gg (Abyss)', en: 'games.gg (Abyss)' }, '[[15390000|Fire Wall]], [[15200000|Cold Storm]], [[15160000|Steel Barrier]]'],
      ['GamerBlurb', '[[15230000|Arctic Armor]], [[15410000|Hibernation]], [[15140000|Curse: Tree]]'],
      ['MetaBot', '[[15160000|Steel Barrier]], [[15320000|Delayed Explosion]], [[15140000|Curse: Tree]]'],
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Nur fürs PvP – vor dem Kampf, denn im Kampf lässt sich nichts tauschen. Die Schutz-Stigmen steigen einzeln: [[15160000|Steel Barrier]], [[15410000|Hibernation]] und [[15230000|Arctic Armor]] auf Stufe 10 sind 45 Stigma Shards, alle drei auf 20 225 – es sei denn, dein zweites Preset verteilt die Shards für sich (siehe oben). Die Passive kosten Skillpunkte, die du kostenlos umverteilst. Ausrüstung bleibt gleich. Im PvE zurück zum Haupt-Build: Die beiden Top-10-Spieler, die gerade ein Schutz-Set tragen, haben ihr Feuer-Set bereit.',
      en: 'Only for PvP – before the fight, because nothing can be swapped in combat. The protective stigmas level one by one: [[15160000|Steel Barrier]], [[15410000|Hibernation]] and [[15230000|Arctic Armor]] at level 10 are 45 Stigma Shards, all three at 20 are 225 – unless your second preset spreads the shards on its own (see above). The passives cost skill points, which you move for free. Gear stays the same. Back to the main build for PvE: the two top 10 players in a protective set right now keep their fire set ready.',
    },
  },
  { type: 'heading', text: { de: 'Allein und sicher: Steel Barrier rein', en: 'Solo and safe: Steel Barrier in' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Haupt-Build ändert', en: 'What changes compared with the main build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Änderung', en: 'Change' }, { de: 'Warum', en: 'Why' }],
    rows: [
      [
        { de: 'Stigma rein', en: 'Stigma in' },
        '[[15160000|Steel Barrier]]',
        { de: 'Schild mit 25 % deiner max. LP für 60 s (35 % auf Stufe 20), solange er hält +10 % Schadensresistenz gegen Monster. 60 s Abklingzeit (45 s ab Stufe 20) – bricht er nicht, ist er immer oben', en: 'a shield worth 25% of your max HP for 60 s (35% at level 20), +10% Damage Tolerance against monsters while it holds. 60 s cooldown (45 s from level 20) – unless it breaks, it is up all the time' },
      ],
      [
        { de: 'Stigma raus', en: 'Stigma out' },
        { de: 'am Boss: [[15200000|Cold Storm]]; beim Farmen von Gruppen: [[15320000|Delayed Explosion]], solange es unter Stigma-Stufe 15 ist', en: 'on a boss: [[15200000|Cold Storm]]; farming packs: [[15320000|Delayed Explosion]] while it is below stigma level 15' },
        { de: '[[15200000|Cold Storm]] ist der Tauschplatz des Guides. [[15320000|Delayed Explosion]] trifft erst ab Stufe 15 mehrere Gegner, [[15200000|Cold Storm]] bremst und verbrennt bis zu 4', en: '[[15200000|Cold Storm]] is the swap slot of the guide. [[15320000|Delayed Explosion]] only hits several enemies from level 15, [[15200000|Cold Storm]] slows and burns up to 4' },
      ],
      [
        { de: 'Optionen', en: 'Options' },
        { de: '[[15040000|Firestorm]] −50 % MP-Kosten, [[15150000|Frost]] +200 MP', en: '[[15040000|Firestorm]] −50% MP cost, [[15150000|Frost]] +200 MP' },
        { de: 'allein füllt dir niemand die MP auf; [[15040000|Firestorm]] kostet 250 MP alle 5 s', en: 'alone nobody refills your MP; [[15040000|Firestorm]] costs 250 MP every 5 s' },
      ],
      [
        '[[15280000|Bittercold Wind]]',
        { de: 'Option „Heranziehen“ statt +1 s Dauer', en: 'the pull option instead of +1 s duration' },
        { de: 'zieht eine Gruppe auf einen Punkt – dann treffen [[15390000|Fire Wall]] und [[15060000|Hellfire]] alle', en: 'pulls a pack onto one spot – then [[15390000|Fire Wall]] and [[15060000|Hellfire]] hit them all' },
      ],
      [
        { de: 'Spielweise', en: 'How you play' },
        { de: 'auf Abstand bleiben', en: 'keep your distance' },
        { de: '[[15090000|Ice Chain]] (eigene Taste) bremst bis zu 4 Gegner 5 s lang um 40 % – du läufst rückwärts weg und triffst weiter', en: '[[15090000|Ice Chain]] (its own key) slows up to 4 enemies by 40% for 5 s – you back away and keep hitting' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 15040000 /* Firestorm */,
        parts: [15040010 /* -50% MP Cost */, 15040040 /* -2s [Hellfire] cooldown per fireball */],
        note: {
          de: 'Halbe MP-Kosten und weiter −2 s für [[15060000|Hellfire]] pro Feuerball. Sobald deine MP reichen, zurück zu +15 % Schaden pro Feuerball (ab Skillstufe 16).',
          en: 'Half the MP cost and still −2 s off [[15060000|Hellfire]] per fireball. Once your MP is enough, go back to +15% damage per fireball (from skill level 16).',
        },
      },
      {
        id: 15280000 /* Bittercold Wind */,
        parts: [15280030 /* Pull effect */, 15280040 /* Ignores Block and Evasion and lands as a Critical Hit */],
        note: {
          de: 'Zieht die Gruppe zusammen und trifft weiter immer kritisch. Am Boss nimm wieder +1 s Dauer.',
          en: 'Pulls the pack together and still always lands as a Critical Hit. On a boss take +1 s duration again.',
        },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Wechsle, wenn du allein farmst oder einen Dungeon zum ersten Mal läufst. In einer eingespielten Gruppe mit Heiler zurück zum Haupt-Build – der Schild macht keinen Schaden. **Kosten:** [[15160000|Steel Barrier]] braucht 15 Stigma Shards bis Stufe 10 und 75 bis 20; die Optionen stellst du kostenlos um. Ein Top-10-Spieler (Nr. 9) trägt gerade ein reines Flächen-Set ohne [[15400000|Element Enhancement]]: [[15200000|Cold Storm]], [[15390000|Fire Wall]], [[15120000|Glacial Smite]] und [[15300000|Lumiel\'s Space]] – das sieht nach einem Set für Gruppen von Monstern aus.',
      en: 'Switch when you farm alone or run a dungeon for the first time. In a practised group with a healer go back to the main build – the shield does no damage. **Costs:** [[15160000|Steel Barrier]] takes 15 Stigma Shards to level 10 and 75 to 20; you change the options for free. One top 10 player (No. 9) is in a pure area set right now without [[15400000|Element Enhancement]]: [[15200000|Cold Storm]], [[15390000|Fire Wall]], [[15120000|Glacial Smite]] and [[15300000|Lumiel\'s Space]] – that looks like a set for packs of monsters.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Welche Stigmen die Top 10 aktiv haben oder bereithalten', en: 'Which stigmas the top 10 have active or keep ready' },
    caption: {
      de: 'Wie viele der Top 10 das Stigma aktiv haben oder bereithalten („bereit“ = in einem anderen Preset oder auf einer Leiste; AION2 Index zeigt es als ausgerüstet, aber ohne Stufe). Gold: Haupt-Build, Violett: PvP-Schutz, Grau: andere. Die vier Feuer-Stigmen haben alle zehn irgendwo. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'How many of the top 10 have the stigma active or keep it ready (“ready” = on another preset or a skill bar; AION2 Index shows it as equipped but without a level). Gold: main build, violet: PvP protection, grey: others. All ten have the four fire-set stigmas somewhere. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    max: 10,
    items: [
      { label: '[[15400000|Element Enhancement]]', value: 10, display: { de: '10 von 10', en: '10 of 10' }, note: { de: '9 aktiv · 1 bereit', en: '9 active · 1 ready' }, tone: 'gold' },
      { label: '[[15390000|Fire Wall]]', value: 10, display: { de: '10 von 10', en: '10 of 10' }, note: { de: '9 aktiv · 1 bereit', en: '9 active · 1 ready' }, tone: 'gold' },
      { label: '[[15200000|Cold Storm]]', value: 10, display: { de: '10 von 10', en: '10 of 10' }, note: { de: '8 aktiv · 2 bereit', en: '8 active · 2 ready' }, tone: 'gold' },
      { label: '[[15320000|Delayed Explosion]]', value: 10, display: { de: '10 von 10', en: '10 of 10' }, note: { de: '7 aktiv · 3 bereit', en: '7 active · 3 ready' }, tone: 'gold' },
      { label: '[[15160000|Steel Barrier]]', value: 5, display: { de: '5 von 10', en: '5 of 10' }, note: { de: '1 aktiv · 4 bereit', en: '1 active · 4 ready' }, tone: 'violet' },
      { label: '[[15230000|Arctic Armor]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '2 aktiv · 2 bereit', en: '2 active · 2 ready' }, tone: 'violet' },
      { label: '[[15410000|Hibernation]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '2 aktiv · 2 bereit', en: '2 active · 2 ready' }, tone: 'violet' },
      { label: '[[15120000|Glacial Smite]]', value: 3, display: { de: '3 von 10', en: '3 of 10' }, note: { de: '1 aktiv · 2 bereit', en: '1 active · 2 ready' }, tone: 'slate' },
      { label: '[[15130000|Soul Freeze]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '0 aktiv · 1 bereit', en: '0 active · 1 ready' }, tone: 'slate' },
      { label: '[[15300000|Lumiel\'s Space]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '1 aktiv · 0 bereit', en: '1 active · 0 ready' }, tone: 'slate' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://games.gg/aion-2/guides/aion-2-sorcerer-guide/', label: 'games.gg – Sorcerer guide (stigma sets for Arena, Abyss and farming)' },
      { href: 'https://gamerblurb.com/guides/aion-2-sorcerer-build-guide-pve-pvp-and-leveling-global', label: 'GamerBlurb – Sorcerer build (PvE, PvP, levelling)' },
      { href: 'https://metabot.gg/en/aion-2/classes/sorcerer/build', label: 'MetaBot – Sorcerer build (PvP set, Frost into Frost Burst)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (no swaps in combat)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, stigma reset cost unconfirmed)' },
    ],
  },
];
