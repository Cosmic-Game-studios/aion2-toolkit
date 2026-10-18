import type { GuideBlock } from '../types';

/**
 * Playstyles of the Cleric: damage healer (the main build), safety healer for new or hard fights, PvP, and why a
 * pure healer does not pay off (sources: aion2-guides.info, games.gg, MetaBot, Space4Games, AION2 Builds – skill and
 * Daevanion data of the global client – AION2 Index top 10 of 2026-10-18)
 */
export const clericPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Der Kleriker heilt in jedem Stil – die Frage ist, wie viel er dabei angreift. Der Haupt-Build ist ein **Schadens-Heiler**: Er greift fast die ganze Zeit an und heilt nebenbei. Für neue oder schwere Kämpfe tauschst du ein Schadens-Stigma gegen ein Schutz-Stigma (**Sicherheits-Heiler**), im **PvP** zwei Stigmen gegen Immunität und Heilungs-Bremse. Ein reiner Heiler lohnt sich nicht.',
      en: 'The Cleric heals in every style – the question is how much it attacks on top. The main build is a **damage healer**: it attacks almost all the time and heals on the side. For new or hard fights you swap one damage stigma for a protective one (**safety healer**), in **PvP** two stigmas for immunity and a healing cut. A pure healer does not pay off.',
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
        title: { de: 'Schadens-Heiler (Haupt-Build)', en: 'Damage healer (main build)' },
        tag: { de: 'PvE · Gruppe', en: 'PvE · group' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: 'Alle zehn haben [[17400000|Earth Punishment]] aktiv, 9 [[17410000|Light of Protection]] und [[17430000|Prayer of Amplification]], 8 [[17440000|Noble Aura]].', en: 'All ten have [[17400000|Earth Punishment]] active, 9 [[17410000|Light of Protection]] and [[17430000|Prayer of Amplification]], 8 [[17440000|Noble Aura]].' } },
          { kind: 'pro', text: { de: 'Deine Heilung wächst mit deiner Angriffskraft – Schaden und Heilung kommen aus denselben Werten.', en: 'Your healing grows with your Attack – damage and healing come from the same stats.' } },
          { kind: 'con', text: { de: 'Kein Wiederbeleben und kein Gruppen-Schutz auf Knopfdruck.', en: 'No revive and no group protection on a key.' } },
        ],
        verdict: { de: 'Deine Standardwahl für Dungeons und Bosse, die die Gruppe kennt – der Build dieses Guides.', en: 'Your default for dungeons and bosses the group knows – the build of this guide.' },
      },
      {
        title: { de: 'Sicherheits-Heiler', en: 'Safety healer' },
        tag: { de: 'PvE · neu oder schwer', en: 'PvE · new or hard' },
        tone: 'blue',
        points: [
          { kind: 'pro', text: { de: '[[17390000|Summon Resurrection]] holt Gefallene im Kampf zurück, [[17420000|Yustiel\'s Power]] senkt den Schaden der ganzen Gruppe um 20 %.', en: '[[17390000|Summon Resurrection]] brings the fallen back mid-fight, [[17420000|Yustiel\'s Power]] cuts the damage of the whole group by 20%.' } },
          { kind: 'pro', text: { de: 'Nur ein Stigma ändert sich – meist [[17440000|Noble Aura]].', en: 'Only one stigma changes – usually [[17440000|Noble Aura]].' } },
          { kind: 'con', text: { de: 'Weniger Schaden, und dein Beitrag zählt bei der Dungeon-Belohnung.', en: 'Less damage, and your contribution counts for the dungeon reward.' } },
        ],
        verdict: { de: 'Für neue Bosse, schwere Stufen und unsichere Gruppen. 9 der Top 10 haben mindestens ein solches Stigma aktiv oder bereit.', en: 'For new bosses, hard tiers and shaky groups. 9 of the top 10 have at least one such stigma active or ready.' },
      },
      {
        title: { de: 'PvP-Kleriker', en: 'PvP Cleric' },
        tag: 'PvP',
        tone: 'violet',
        points: [
          { kind: 'pro', text: { de: '[[17270000|Salvation]]: 3 s immun gegen Schaden und Statuseffekte – dein Notknopf, wenn alle auf dich gehen.', en: '[[17270000|Salvation]]: 3 s immune to damage and status effects – your emergency button when everyone goes for you.' } },
          { kind: 'pro', text: { de: '[[17300000|Voice of Doom]] senkt Heilung und Tränke des Gegners 20 s lang um 60 %.', en: '[[17300000|Voice of Doom]] cuts the enemy\'s healing and potions by 60% for 20 s.' } },
          { kind: 'con', text: { de: 'Du bist meist das erste Ziel; [[17440000|Noble Aura]] und [[17430000|Prayer of Amplification]] fallen weg.', en: 'You are usually the first target; [[17440000|Noble Aura]] and [[17430000|Prayer of Amplification]] go.' } },
        ],
        verdict: { de: 'Für Arena, Abyss und PvP in der offenen Welt, auf einem zweiten Preset. 4 der Top 10 haben [[17270000|Salvation]] aktiv oder bereit.', en: 'For the Arena, the Abyss and open-world PvP, on a second preset. 4 of the top 10 have [[17270000|Salvation]] active or ready.' },
      },
      {
        title: { de: 'Reiner Heiler', en: 'Pure healer' },
        tag: 'PvE',
        tone: 'rose',
        points: [
          { kind: 'con', text: { de: 'Mehr Heilung gibt es kaum zu holen: [[17740000|Healing Enhancement]] macht 26 % deiner Angriffskraft zu Heilkraft, und keine Daevanion-Tafel hat Knoten für Heilkraft – dafür 45 Angriffs-Knoten.', en: 'There is little extra healing to get: [[17740000|Healing Enhancement]] turns 26% of your Attack into Heal Boost, and no Daevanion board has Heal Boost nodes – but 45 Attack nodes.' } },
          { kind: 'con', text: { de: 'Die Dungeon-Belohnung hängt vom Beitrag ab – wer nur heilt, kann laut aion2-guides.info leer ausgehen.', en: 'The dungeon reward depends on contribution – according to aion2-guides.info, a Cleric who only heals can end up with nothing.' } },
          { text: { de: '[[17090000|Light of Regeneration]] und [[17120000|Radiant Recovery]] heilen die Gruppe ohnehin, während du angreifst.', en: '[[17090000|Light of Regeneration]] and [[17120000|Radiant Recovery]] heal the group anyway while you attack.' } },
        ],
        verdict: { de: 'Lohnt sich nicht: Der Haupt-Build heilt schon – er trifft nur zusätzlich.', en: 'Not worth it: the main build already heals – it just hits as well.' },
      },
    ],
  },
  {
    type: 'callout',
    tone: 'info',
    title: { de: 'Stil wechseln: Presets', en: 'Switching styles: presets' },
    text: {
      de: 'Leg jeden Stil auf ein eigenes **Skill-Preset** – der globale Client hat 3, und jedes hat eigene Stigmen. Der Wechsel kostet nichts, geht aber nicht beim Aufladen oder Wirken und nicht, solange ein Stigma abklingt; Stigmen tauschen geht im Kampf gar nicht. **Skillpunkte** setzt du kostenlos zurück (nur die des aktuellen Presets); danach wählst du die Spezialisierungen neu. Ein Spieler-Guide berichtet, dass jedes Preset deine Stigma Shards für sich neu verteilt – dann kostet ein zweites Set keine zusätzlichen Shards; sonst braucht ein Stigma 15 Shards bis Stufe 10, 35 bis 15 und 75 bis 20. Was ein Stigma-Reset im globalen Client kostet, ist nicht bestätigt.',
      en: 'Put each style on a **skill preset** of its own – the global client has 3, and each has its own stigmas. Switching costs nothing, but not while you charge or cast or while a stigma is on cooldown, and stigmas cannot be swapped in combat at all. **Skill points** reset for free (only those of the current preset); afterwards you pick your specialisations again. A player guide reports that every preset spreads your Stigma Shards on its own – then a second set costs no extra shards; otherwise a stigma takes 15 shards to level 10, 35 to 15 and 75 to 20. What a stigma reset costs on the global client is not confirmed.',
    },
  },
  { type: 'heading', text: { de: 'Sicherheits-Heiler: ein Schutz-Stigma statt Noble Aura', en: 'Safety healer: a protective stigma instead of Noble Aura' } },
  {
    type: 'table',
    caption: { de: 'Welches Schutz-Stigma für welchen Kampf (Stigma-Stufe 10, Spieldaten des globalen Clients)', en: 'Which protective stigma for which fight (stigma level 10, game data of the global client)' },
    head: [{ de: 'Stigma', en: 'Stigma' }, { de: 'Was es tut', en: 'What it does' }, { de: 'Nimm es, wenn …', en: 'Take it when …' }, { de: 'Top 10', en: 'Top 10' }],
    rows: [
      [
        '[[17390000|Summon Resurrection]]',
        { de: 'belebt einen Gefallenen in 40 m wieder; 102 s Abklingzeit (82 s auf Stufe 20). Ab Stufe 10 danach 3 s unverwundbar, ab 15 mit 20 % LP', en: 'revives a fallen party member within 40 m; 102 s cooldown (82 s at level 20). From level 10 they are invincible for 3 s afterwards, from 15 they rise with 20% HP' },
        { de: 'ein Boss neu ist und Leute sterben', en: 'a boss is new and people die' },
        { de: '1 aktiv · 3 bereit', en: '1 active · 3 ready' },
      ],
      [
        "[[17420000|Yustiel's Power]]",
        { de: 'die Gruppe in 40 m nimmt 14,5 s lang 20 % weniger Schaden von Monstern (20 s auf Stufe 20), alle 60 s; ab Stufe 5 dazu ein Schild mit 10 % der max. LP', en: 'the group within 40 m takes 20% less damage from monsters for 14.5 s (20 s at level 20), every 60 s; from level 5 also a shield worth 10% of max HP' },
        { de: 'du weißt, wann der große Treffer kommt', en: 'you know when the big hit comes' },
        { de: '2 aktiv · 4 bereit', en: '2 active · 4 ready' },
      ],
      [
        '[[17290000|Absolution]]',
        { de: 'heilt die Gruppe um 2.484–2.732 LP und entfernt 2 Schwächungen (ab Stufe 10 alle); 90 s, ab Stufe 5 60 s', en: 'heals the group for 2,484–2,732 HP and removes 2 debuffs (all from level 10); 90 s, 60 s from level 5' },
        { de: 'der Boss viele Schwächungen verteilt', en: 'the boss spreads many debuffs' },
        { de: '0 aktiv · 2 bereit', en: '0 active · 2 ready' },
      ],
      [
        '[[17160000|Benevolence]]',
        { de: 'heilt die Gruppe alle 2 s um 270–297 LP für 20 s (ab Stufe 5 10 s länger) – rund ein Zehntel von [[17090000|Light of Regeneration]] pro Tick; ab Stufe 20 reinigt es alle 5 s', en: 'heals the group for 270–297 HP every 2 s for 20 s (10 s longer from level 5) – about a tenth of [[17090000|Light of Regeneration]] per tick; from level 20 it cleanses every 5 s' },
        { de: 'selten – erst auf Stufe 20 interessant', en: 'rarely – only interesting at level 20' },
        { de: '0 aktiv · 3 bereit', en: '0 active · 3 ready' },
      ],
    ],
  },
  {
    type: 'list',
    items: [
      { de: '**Was rausgeht:** [[17440000|Noble Aura]] – so raten es die Guides für eine Stütz-Rolle. Ist ein Kantor dabei, geht stattdessen [[17410000|Light of Protection]] raus (es wirkt nicht zusammen mit seinem Mantra, siehe oben im Guide).', en: '**What goes out:** [[17440000|Noble Aura]] – that is what the guides advise for a support role. With a Chanter in the group, [[17410000|Light of Protection]] goes out instead (it does not stack with the Chanter\'s mantra, see above in the guide).' },
      { de: '**Skills und Werte:** gleich. Alle Top 10 haben [[17090000|Light of Regeneration]], [[17100000|Healing Light]] und [[17120000|Radiant Recovery]] schon mit Skillpunkten auf 10.', en: '**Skills and stats:** the same. All of the top 10 already bought [[17090000|Light of Regeneration]], [[17100000|Healing Light]] and [[17120000|Radiant Recovery]] to 10.' },
      { de: '**Spielweise:** Heil nach großen Treffern auf und greif den Rest der Zeit an – die Gruppe hat eigene Ausweich- und Schutz-Skills.', en: '**How you play:** top up after big hits and attack the rest of the time – the group has its own dodges and protection skills.' },
      { de: '**Weitere Quellen:** MetaBot findet [[17390000|Summon Resurrection]] in 64 % von 151 Top-Kleriker-Builds; games.gg nennt als Heiler-Set [[17410000|Light of Protection]], [[17290000|Absolution]], [[17270000|Salvation]] und [[17420000|Yustiel\'s Power]].', en: '**Other sources:** MetaBot finds [[17390000|Summon Resurrection]] in 64% of 151 top Cleric builds; games.gg names [[17410000|Light of Protection]], [[17290000|Absolution]], [[17270000|Salvation]] and [[17420000|Yustiel\'s Power]] as a healer set.' },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Wechsle für den ersten Abend an einem neuen Boss, für schwere Stufen und wenn deine Gruppe oft stirbt. Sitzt der Kampf, zurück zu [[17440000|Noble Aura]] – dein Schaden zählt auch für deine Belohnung. **Kosten:** [[17390000|Summon Resurrection]] braucht 15 Stigma Shards bis Stufe 10 (3 s unverwundbar) und 35 bis 15 (20 % LP), wenn dein Preset sie nicht für sich verteilt. Skills und Ausrüstung bleiben gleich.',
      en: 'Switch for the first evening on a new boss, for hard tiers and when your group dies a lot. Once the fight works, go back to [[17440000|Noble Aura]] – your damage also counts for your reward. **Costs:** [[17390000|Summon Resurrection]] takes 15 Stigma Shards to level 10 (3 s invincible) and 35 to 15 (20% HP) unless your preset spreads them on its own. Skills and gear stay the same.',
    },
  },
  { type: 'heading', text: { de: 'PvP-Kleriker: Immunität und Heilungs-Bremse', en: 'PvP Cleric: immunity and a healing cut' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Haupt-Build ändert', en: 'What changes compared with the main build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Haupt-Build', en: 'Main build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        '[[17400000|Earth Punishment]], [[17410000|Light of Protection]], [[17430000|Prayer of Amplification]], [[17440000|Noble Aura]]',
        { de: '[[17400000|Earth Punishment]] und [[17410000|Light of Protection]] bleiben; dazu [[17270000|Salvation]] (3 s immun, 132 s Abklingzeit auf Stufe 10, 112 s auf 20; ab Stufe 15 schützt es auch das Gruppenmitglied mit den wenigsten LP) und [[17300000|Voice of Doom]] (−60 % Heilung und Tränke für 20 s; ab Stufe 10 entfernt es Schilde)', en: '[[17400000|Earth Punishment]] and [[17410000|Light of Protection]] stay; add [[17270000|Salvation]] (3 s immune, 132 s cooldown at level 10, 112 s at 20; from level 15 it also protects the party member with the lowest HP) and [[17300000|Voice of Doom]] (−60% healing and potions for 20 s; from level 10 it removes shields)' },
      ],
      [
        { de: 'Optionen', en: 'Options' },
        { de: 'Schaden', en: 'damage' },
        { de: 'Kontrolle auf [[17070000|Chain of Torment]] und [[17080000|Debilitating Mark]], Präzision auf [[17060000|Bolt]] (siehe unten). Ab Skillstufe 20 auf [[17010000|Earth\'s Retribution]] „Ignoriert Block und Ausweichen“', en: 'control on [[17070000|Chain of Torment]] and [[17080000|Debilitating Mark]], accuracy on [[17060000|Bolt]] (see below). From skill level 20 “Ignores Block and Evasion” on [[17010000|Earth\'s Retribution]]' },
      ],
      [
        { de: 'Passive höher', en: 'Passives higher' },
        { de: 'nach Bedarf', en: 'as needed' },
        { de: '[[17790000|Survival Willpower]] auf 10 (+35 % Widerstand gegen Statuseffekte; wirst du betäubt, niedergeworfen oder in Furcht versetzt, 5 s lang 15 % weniger Schaden von Spielern, alle 60 s) – 5 der Top 10 haben ihn schon dort. [[17760000|Heal Block]] (7 % Chance: −50 % Heilung beim Ziel für 5 s) nur fürs PvP – 9 der Top 10 lassen ihn auf 1–2', en: '[[17790000|Survival Willpower]] to 10 (+35% Status Effect Resist; when you are stunned, knocked down or feared, 15% less damage from players for 5 s, every 60 s) – 5 of the top 10 already have it there. [[17760000|Heal Block]] (7% chance: −50% healing on the target for 5 s) only for PvP – 9 of the top 10 leave it at 1–2' },
      ],
      [
        { de: 'Daevanion', en: 'Daevanion' },
        { de: 'Nezekan bis Triniel', en: 'Nezekan to Triniel' },
        { de: 'dazu **Azphel**: bezahlt mit Kampfkristallen aus dem PvP, Werte zählen nur gegen Spieler. Die Top 10 haben dort 23–51 von 152 Knoten offen (Median 31)', en: 'plus **Azphel**: paid with Battle Crystals from PvP, its stats only count against players. The top 10 have 23–51 of its 152 nodes open (median 31)' },
      ],
      [
        { de: 'Spielweise', en: 'How you play' },
        { de: 'angreifen, nebenbei heilen', en: 'attack, heal on the side' },
        { de: 'Zuerst die schwächeren Schwächungen, damit der Gegner seine Reinigung verbraucht – dann [[17400000|Earth Punishment]] und [[17300000|Voice of Doom]]. [[17270000|Salvation]] bei wenig LP, [[17240000|Defiance]] auf der Leertaste gegen Betäubung', en: 'Weaker debuffs first so the enemy spends their cleanse – then [[17400000|Earth Punishment]] and [[17300000|Voice of Doom]]. [[17270000|Salvation]] at low HP, [[17240000|Defiance]] on Space against stuns' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 17070000 /* Chain of Torment */,
        parts: [17070030 /* 20% chance to inflict Knockdown for 3s */, 17070040 /* +10% PvE / +5% PvP Damage Tolerance reduction */],
        note: {
          de: '20 % Chance, das Ziel 3 s niederzuwerfen, statt +3 s Schaden über Zeit. Die Option der Stufe 12 bleibt.',
          en: 'A 20% chance to knock the target down for 3 s instead of +3 s damage over time. The level 12 option stays.',
        },
      },
      {
        id: 17080000 /* Debilitating Mark */,
        parts: [17080030 /* 20% chance to inflict Stun for 3s */, 17080020 /* -15% target Defense */],
        note: {
          de: '20 % Chance auf 3 s Betäubung neben −15 % Verteidigung – statt der Option der Stufe 12.',
          en: 'A 20% chance of a 3 s stun next to −15% Defense – instead of the level 12 option.',
        },
      },
      {
        id: 17060000 /* Bolt */,
        parts: [17060020 /* +300 Skill Accuracy */, 17060040 /* Up to +20% damage when less targets hit */, 17060050 /* Critical Hit on hit */],
        note: {
          de: '+300 Präzision statt +30 % Fähigkeitstempo – Spieler weichen öfter aus als Monster.',
          en: '+300 Accuracy instead of +30% Skill Speed – players evade more often than monsters.',
        },
      },
    ],
  },
  {
    type: 'table',
    caption: { de: 'PvP-Stigmen: Die Quellen sind sich uneins', en: 'PvP stigmas: the sources disagree' },
    head: [{ de: 'Quelle', en: 'Source' }, { de: 'Stigmen', en: 'Stigmas' }],
    rows: [
      [{ de: 'Dieser Guide', en: 'This guide' }, '[[17400000|Earth Punishment]], [[17410000|Light of Protection]], [[17270000|Salvation]], [[17300000|Voice of Doom]]'],
      [{ de: 'Top 10 Nr. 8 (aktiv)', en: 'Top 10 No. 8 (active)' }, { de: '[[17400000|Earth Punishment]] 20, [[17270000|Salvation]] 20, [[17410000|Light of Protection]] 16, [[17430000|Prayer of Amplification]] 15', en: '[[17400000|Earth Punishment]] 20, [[17270000|Salvation]] 20, [[17410000|Light of Protection]] 16, [[17430000|Prayer of Amplification]] 15' }],
      [{ de: 'Top 10 Nr. 1', en: 'Top 10 No. 1' }, { de: 'PvE-Set aktiv, [[17270000|Salvation]] und [[17300000|Voice of Doom]] bereit', en: 'PvE set active, [[17270000|Salvation]] and [[17300000|Voice of Doom]] ready' }],
      [{ de: 'aion2-guides.info (Duelle)', en: 'aion2-guides.info (duels)' }, { de: "[[17430000|Prayer of Amplification]], [[17410000|Light of Protection]], [[17420000|Yustiel's Power]], [[17300000|Voice of Doom]] – in Gruppen [[17290000|Absolution]] statt [[17300000|Voice of Doom]], im Abyss manchmal [[17390000|Summon Resurrection]]", en: "[[17430000|Prayer of Amplification]], [[17410000|Light of Protection]], [[17420000|Yustiel's Power]], [[17300000|Voice of Doom]] – in groups [[17290000|Absolution]] instead of [[17300000|Voice of Doom]], in the Abyss sometimes [[17390000|Summon Resurrection]]" }],
      ['MetaBot', '[[17410000|Light of Protection]], [[17290000|Absolution]], [[17270000|Salvation]], [[17400000|Earth Punishment]]'],
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Arena, Abyss und PvP in der offenen Welt – vor dem Kampf. Im PvE zurück zum Haupt-Build. **Kosten:** [[17270000|Salvation]] und [[17300000|Voice of Doom]] auf Stufe 10 sind je 15 Stigma Shards, auf 20 je 75, wenn dein Preset sie nicht für sich verteilt. Passive und Optionen stellst du kostenlos um, die Ausrüstung bleibt gleich.',
      en: 'For the Arena, the Abyss and open-world PvP – before the fight. Back to the main build for PvE. **Costs:** [[17270000|Salvation]] and [[17300000|Voice of Doom]] at level 10 are 15 Stigma Shards each, 75 each at 20, unless your preset spreads them on its own. You change passives and options for free, your gear stays the same.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Welche Stigmen die Top 10 aktiv haben oder bereithalten', en: 'Which stigmas the top 10 have active or keep ready' },
    caption: {
      de: 'Wie viele der Top 10 das Stigma aktiv haben oder bereithalten („bereit“ = in einem anderen Preset oder auf einer Leiste; AION2 Index zeigt es als ausgerüstet, aber ohne Stufe). Gold: Haupt-Build, Blau: Sicherheits-Heiler, Violett: PvP. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'How many of the top 10 have the stigma active or keep it ready (“ready” = on another preset or a skill bar; AION2 Index shows it as equipped but without a level). Gold: main build, blue: safety healer, violet: PvP. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    max: 10,
    items: [
      { label: '[[17400000|Earth Punishment]]', value: 10, display: { de: '10 von 10', en: '10 of 10' }, note: { de: '10 aktiv', en: '10 active' }, tone: 'gold' },
      { label: '[[17410000|Light of Protection]]', value: 10, display: { de: '10 von 10', en: '10 of 10' }, note: { de: '9 aktiv · 1 bereit', en: '9 active · 1 ready' }, tone: 'gold' },
      { label: '[[17430000|Prayer of Amplification]]', value: 9, display: { de: '9 von 10', en: '9 of 10' }, note: { de: '9 aktiv', en: '9 active' }, tone: 'gold' },
      { label: '[[17440000|Noble Aura]]', value: 9, display: { de: '9 von 10', en: '9 of 10' }, note: { de: '8 aktiv · 1 bereit', en: '8 active · 1 ready' }, tone: 'gold' },
      { label: "[[17420000|Yustiel's Power]]", value: 6, display: { de: '6 von 10', en: '6 of 10' }, note: { de: '2 aktiv · 4 bereit', en: '2 active · 4 ready' }, tone: 'blue' },
      { label: '[[17390000|Summon Resurrection]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '1 aktiv · 3 bereit', en: '1 active · 3 ready' }, tone: 'blue' },
      { label: '[[17160000|Benevolence]]', value: 3, display: { de: '3 von 10', en: '3 of 10' }, note: { de: '0 aktiv · 3 bereit', en: '0 active · 3 ready' }, tone: 'blue' },
      { label: '[[17290000|Absolution]]', value: 2, display: { de: '2 von 10', en: '2 of 10' }, note: { de: '0 aktiv · 2 bereit', en: '0 active · 2 ready' }, tone: 'blue' },
      { label: '[[17270000|Salvation]]', value: 4, display: { de: '4 von 10', en: '4 of 10' }, note: { de: '1 aktiv · 3 bereit', en: '1 active · 3 ready' }, tone: 'violet' },
      { label: '[[17300000|Voice of Doom]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '0 aktiv · 1 bereit', en: '0 active · 1 ready' }, tone: 'violet' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://aion2-guides.info/en/cleric/', label: 'AION 2 Guides – Cleric (PvE and PvP sets, PvP specialisations, rewards by contribution)' },
      { href: 'https://games.gg/aion-2/guides/aion-2-cleric-guide/', label: 'games.gg – Cleric guide (healer set)' },
      { href: 'https://metabot.gg/en/aion-2/classes/cleric/build', label: 'MetaBot – Cleric build (stigma use, PvP set)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (no swaps in combat)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, stigma reset cost unconfirmed)' },
    ],
  },
];
