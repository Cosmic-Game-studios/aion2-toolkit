import type { GuideBlock } from '../types';

/**
 * Playstyles of the Chanter: support damage (the main build), healer stand-in without a Cleric, PvP control, and why
 * an off-tank Chanter does not work (sources: aion2-guides.info, games.gg, MetaBot, Space4Games, AION2 Builds – skill
 * data of the global client – AION2 Index top 10 of 2026-10-18)
 */
export const chanterPlaystyles: GuideBlock[] = [
  {
    type: 'text',
    text: {
      de: 'Der Kantor ist immer beides: Kämpfer und Stütze der Gruppe. Der Haupt-Build ist **Stütz-Schaden** mit Mantras und Burst. Ohne Kleriker kannst du ein bis zwei Stigmen gegen Gruppenheilung und Schilde tauschen (**Heiler-Ersatz**), im **PvP** gegen Betäubung und Ansturm. Die Mantras wegzulassen, um mehr Schaden zu machen, klappt nicht: [[18190000|Undefeated Mantra]] ist auch dein eigener größter Schadens-Buff. Und als Tank fehlt dir jeder Aggro-Skill.',
      en: 'The Chanter is always both: a fighter and the backbone of the group. The main build is **support damage** with mantras and burst. Without a Cleric you can swap one or two stigmas for group heals and shields (**healer stand-in**), in **PvP** for stuns and a charge. Dropping the mantras for more damage does not work: [[18190000|Undefeated Mantra]] is your own biggest damage buff too. And as a tank you lack any enmity skill.',
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
        title: { de: 'Stütz-Schaden (Haupt-Build)', en: 'Support damage (main build)' },
        tag: { de: 'PvE · Gruppe', en: 'PvE · group' },
        tone: 'gold',
        points: [
          { kind: 'pro', text: { de: 'Alle zehn haben [[18190000|Undefeated Mantra]] auf Stufe 20 aktiv, 8 [[18250000|Power of the Storm]] und 8 [[18330000|Marchutan\'s Wrath]].', en: 'All ten have [[18190000|Undefeated Mantra]] active at level 20, 8 [[18250000|Power of the Storm]] and 8 [[18330000|Marchutan\'s Wrath]].' } },
          { kind: 'pro', text: { de: '[[18190000|Undefeated Mantra]] wirkt auch auf dich: +20 % Schaden und 20 % weniger Schaden von Monstern auf Stufe 20.', en: '[[18190000|Undefeated Mantra]] works on you too: +20% damage and 20% less damage from monsters at level 20.' } },
          { kind: 'con', text: { de: 'Deine Heilung reicht für schwere Inhalte nicht – die Gruppe braucht einen Kleriker.', en: 'Your healing is not enough for hard content – the group needs a Cleric.' } },
        ],
        verdict: { de: 'Deine Standardwahl für Dungeons und Bosse – der Build dieses Guides.', en: 'Your default for dungeons and bosses – the build of this guide.' },
      },
      {
        title: { de: 'Heiler-Ersatz ohne Kleriker', en: 'Healer stand-in without a Cleric' },
        tag: { de: 'PvE · leicht', en: 'PvE · easy' },
        tone: 'teal',
        points: [
          { kind: 'pro', text: { de: '[[18170000|Healing Touch]] heilt die ganze Gruppe, [[18240000|Impeding Authority]] gibt allen einen Schild mit 25 % ihrer max. LP.', en: '[[18170000|Healing Touch]] heals the whole group, [[18240000|Impeding Authority]] gives everyone a shield worth 25% of their max HP.' } },
          { kind: 'pro', text: { de: '[[18120000|Recuperation]] und [[18190000|Undefeated Mantra]] hast du ohnehin.', en: 'You already have [[18120000|Recuperation]] and [[18190000|Undefeated Mantra]].' } },
          { kind: 'con', text: { de: 'Viel weniger Heilung als ein Kleriker – grob ein Fünftel einer einzigen Kleriker-Heilung über Zeit (siehe Diagramm unten).', en: 'Far less healing than a Cleric – roughly a fifth of a single Cleric heal over time (see the chart below).' } },
          { kind: 'con', text: { de: 'Keiner der Top 10 nutzt diese Stigmen.', en: 'None of the top 10 uses these stigmas.' } },
        ],
        verdict: { de: 'Nur ohne Kleriker: offene Welt, leichte Dungeons. Für schwere Inhalte kein Ersatz.', en: 'Only without a Cleric: the open world, easy dungeons. No replacement in hard content.' },
      },
      {
        title: { de: 'PvP-Kontrolle', en: 'PvP control' },
        tag: 'PvP',
        tone: 'violet',
        points: [
          { kind: 'pro', text: { de: 'Betäubungs-Ketten: [[18210000|Tremor Crush]] und [[18060000|Impactful Crush]] betäuben, [[18080000|Wave Blow]] wirft Betäubte nieder. [[18330000|Marchutan\'s Wrath]] betäubt mit 50 % Chance und senkt ab Stufe 15 Heilung und Tränke um 70 %.', en: 'Stun chains: [[18210000|Tremor Crush]] and [[18060000|Impactful Crush]] stun, [[18080000|Wave Blow]] knocks stunned targets down. [[18330000|Marchutan\'s Wrath]] stuns with a 50% chance and from level 15 cuts healing and potions by 70%.' } },
          { kind: 'pro', text: { de: '[[18130000|Fracturing Blow]] stürmt bis 20 m ans Ziel und senkt seine Verteidigung 5 s lang um 30 %.', en: '[[18130000|Fracturing Blow]] charges up to 20 m to the target and lowers its Defense by 30% for 5 s.' } },
          { kind: 'con', text: { de: '[[18250000|Power of the Storm]] und [[18160000|Sprint Mantra]] fallen weg – weniger Schaden für die Gruppe.', en: '[[18250000|Power of the Storm]] and [[18160000|Sprint Mantra]] go – less damage for the group.' } },
        ],
        verdict: { de: 'Für Arena und Abyss, auf einem zweiten Preset. Bei den Top 10 selten: 3 Einträge mit PvP-Stigmen, davon zwei derselbe Spieler.', en: 'For the Arena and the Abyss, on a second preset. Rare in the top 10: 3 entries with PvP stigmas, two of them the same player.' },
      },
      {
        title: { de: 'Off-Tank', en: 'Off-tank' },
        tag: 'PvE',
        tone: 'rose',
        points: [
          { kind: 'con', text: { de: 'Kein Skill des Kantors erzeugt Aggro oder verspottet – der Templer hat sechs davon.', en: 'No Chanter skill builds enmity or taunts – the Templar has six of them.' } },
          { kind: 'con', text: { de: '[[18140000|Focused Defense]] blockt sicher und [[18420000|Guardian Blessing]] gibt bis zu 13 % max. LP – das hält dich am Leben, aber nicht den Boss bei dir.', en: '[[18140000|Focused Defense]] blocks for sure and [[18420000|Guardian Blessing]] gives up to 13% max HP – that keeps you alive, but does not keep the boss on you.' } },
        ],
        verdict: { de: 'Lohnt sich nicht. Wenn der Tank fällt, hältst du kurz durch – mehr nicht.', en: 'Not worth it. When the tank falls you can hold out for a moment – no more.' },
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
  { type: 'heading', text: { de: 'Heiler-Ersatz: Healing Touch und Impeding Authority', en: 'Healer stand-in: Healing Touch and Impeding Authority' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Haupt-Build ändert', en: 'What changes compared with the main build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Haupt-Build', en: 'Main build' }, { de: 'Heiler-Ersatz', en: 'Healer stand-in' }],
    rows: [
      [
        { de: '4. Stigma', en: '4th stigma' },
        '[[18420000|Guardian Blessing]] / [[18160000|Sprint Mantra]]',
        { de: '[[18170000|Healing Touch]]: heilt dich und die Gruppe in 40 m um 1.422–1.564 LP (Stufe 10; 1.978–2.176 auf 20), alle 30 s. Ab Stufe 5 +20 % bei Zielen unter 50 % LP, ab 15 entfernt es 5 Schwächungen', en: '[[18170000|Healing Touch]]: heals you and the group within 40 m for 1,422–1,564 HP (level 10; 1,978–2,176 at 20), every 30 s. From level 5 +20% on targets below 50% HP, from 15 it removes 5 debuffs' },
      ],
      [
        { de: 'Für schwerere Kämpfe', en: 'For harder fights' },
        '[[18330000|Marchutan\'s Wrath]]',
        { de: '[[18240000|Impeding Authority]]: Schild mit 25 % der max. LP für alle in 40 m, 20 s lang (35 % auf Stufe 20), alle 90 s; ab Stufe 15 dazu 10 % weniger Schaden von Monstern', en: '[[18240000|Impeding Authority]]: a shield worth 25% of max HP for everyone within 40 m for 20 s (35% at level 20), every 90 s; from level 15 also 10% less damage from monsters' },
      ],
      [
        { de: 'Bleibt', en: 'Stays' },
        '[[18190000|Undefeated Mantra]], [[18250000|Power of the Storm]]',
        { de: 'beide – das Mantra senkt auch den Schaden, den die Gruppe nimmt (20 % auf Stufe 20)', en: 'both – the mantra also lowers the damage the group takes (20% at level 20)' },
      ],
      [
        { de: 'Notknopf', en: 'Emergency button' },
        '–',
        { de: '[[18440000|Barrier Spell]]: 3 s lang fällt niemand in 40 m unter 10 % LP, 162 s Abklingzeit. aion2-guides.info rät ab – nur für einzelne tödliche Treffer', en: '[[18440000|Barrier Spell]]: for 3 s nobody within 40 m drops below 10% HP, 162 s cooldown. aion2-guides.info advises against it – only for single deadly hits' },
      ],
      [
        { de: 'Spielweise', en: 'How you play' },
        { de: 'angreifen, Burst', en: 'attack, burst' },
        { de: '[[18120000|Recuperation]] früh drücken, damit die Heilung über Zeit läuft; [[18170000|Healing Touch]] von Hand, wenn es eng wird; Schild vor dem großen Treffer', en: 'press [[18120000|Recuperation]] early so its heal over time runs; [[18170000|Healing Touch]] by hand when things get tight; shield before the big hit' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 18120000 /* Recuperation */,
        parts: [18120010 /* +1 consecutive use, Heal over Time stacks up to 2 times */, 18120050 /* -3s cooldown */],
        note: {
          de: 'Zweimal hintereinander drücken, die Heilung über Zeit stapelt sich doppelt – statt +5 % Heilung. −3 s Abklingzeit ab Skillstufe 16 bleibt.',
          en: 'Press it twice in a row and the heal over time stacks twice – instead of +5% healing. −3 s cooldown from skill level 16 stays.',
        },
      },
    ],
  },
  {
    type: 'bars',
    title: { de: 'Heilung pro Ziel in 30 Sekunden: Kantor gegen Kleriker', en: 'Healing per target in 30 seconds: Chanter vs. Cleric' },
    caption: {
      de: 'Gerechnet aus den Skilltexten des globalen Clients, Skill- und Stigma-Stufe 10, ohne Heilkraft und ohne Spezialisierungen: [[18120000|Recuperation]] zweimal (15 s Abklingzeit, sofort plus 4 Ticks), [[18170000|Healing Touch]] einmal (30 s), beim Kleriker nur seine Heilung über Zeit „Light of Regeneration“ (alle 2 s für 30 s = 15 Ticks). Der Kleriker hat dazu noch weitere Heilungen. Der Balken zeigt die Mitte der Spanne.',
      en: 'Worked out from the skill texts of the global client, skill and stigma level 10, without Heal Boost and without specialisations: [[18120000|Recuperation]] twice (15 s cooldown, instant plus 4 ticks), [[18170000|Healing Touch]] once (30 s), for the Cleric only the heal over time “Light of Regeneration” (every 2 s for 30 s = 15 ticks). The Cleric has more heals on top. The bar shows the middle of the range.',
    },
    unit: { de: 'LP', en: 'HP' },
    items: [
      { label: { de: 'Kleriker: Light of Regeneration', en: 'Cleric: Light of Regeneration' }, value: 39120, display: { de: '35.565–42.675 LP', en: '35,565–42,675 HP' }, tone: 'slate' },
      { label: '[[18120000|Recuperation]] ×2', value: 6848, display: { de: '6.780–6.916 LP', en: '6,780–6,916 HP' }, tone: 'teal' },
      { label: '[[18170000|Healing Touch]] ×1', value: 1493, display: { de: '1.422–1.564 LP', en: '1,422–1,564 HP' }, tone: 'teal' },
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Nur wenn kein Kleriker dabei ist – in der offenen Welt und in leichten Dungeons. games.gg nennt den Kantor ausdrücklich keinen vollen Kleriker-Ersatz für schwere Inhalte, und keiner der Top 10 hat [[18170000|Healing Touch]], [[18240000|Impeding Authority]] oder [[18440000|Barrier Spell]] aktiv oder bereit (gelernt haben sie 1, 3 und 5). Mit Kleriker zurück zum Haupt-Build. **Kosten:** [[18170000|Healing Touch]] braucht 15 Stigma Shards bis Stufe 10 und 35 bis 15 (Reinigung), [[18240000|Impeding Authority]] 15 bis Stufe 10, wenn dein Preset sie nicht für sich verteilt. Die Optionen stellst du kostenlos um.',
      en: 'Only when there is no Cleric – in the open world and in easy dungeons. games.gg says plainly that the Chanter is no full Cleric replacement for hard content, and none of the top 10 has [[18170000|Healing Touch]], [[18240000|Impeding Authority]] or [[18440000|Barrier Spell]] active or ready (1, 3 and 5 have learned them). With a Cleric go back to the main build. **Costs:** [[18170000|Healing Touch]] takes 15 Stigma Shards to level 10 and 35 to 15 (cleanse), [[18240000|Impeding Authority]] 15 to level 10, unless your preset spreads them on its own. You change the options for free.',
    },
  },
  { type: 'heading', text: { de: 'PvP-Kontrolle: Betäuben, Ansturm, Heilungs-Bremse', en: 'PvP control: stun, charge, healing cut' } },
  {
    type: 'table',
    caption: { de: 'Was sich gegenüber dem Haupt-Build ändert', en: 'What changes compared with the main build' },
    head: [{ de: 'Teil', en: 'Part' }, { de: 'Haupt-Build', en: 'Main build' }, 'PvP'],
    rows: [
      [
        { de: 'Stigmen', en: 'Stigmas' },
        '[[18190000|Undefeated Mantra]], [[18250000|Power of the Storm]], [[18330000|Marchutan\'s Wrath]], [[18420000|Guardian Blessing]] / [[18160000|Sprint Mantra]]',
        { de: '[[18190000|Undefeated Mantra]], [[18330000|Marchutan\'s Wrath]] (auf Stufe 15+ für −70 % Heilung), [[18130000|Fracturing Blow]], [[18420000|Guardian Blessing]]. Alternativen: [[18230000|Ensnaring Mark]] (Siegel mit 50 % Chance auf bis zu 4 Ziele, 5 s), [[18700000|Assault Shock]] (Betäubung mit 30 % Chance auf bis zu 4 Ziele, bis +20 % Verteidigung)', en: '[[18190000|Undefeated Mantra]], [[18330000|Marchutan\'s Wrath]] (at level 15+ for −70% healing), [[18130000|Fracturing Blow]], [[18420000|Guardian Blessing]]. Alternatives: [[18230000|Ensnaring Mark]] (Seal with a 50% chance on up to 4 targets, 5 s), [[18700000|Assault Shock]] (Stun with a 30% chance on up to 4 targets, up to +20% Defense)' },
      ],
      [
        { de: 'Optionen', en: 'Options' },
        { de: 'Tempo, Schaden', en: 'speed, damage' },
        { de: 'längere Betäubung und längeres Niederwerfen (siehe unten); [[18210000|Tremor Crush]] mit +10 m Reichweite', en: 'longer stun and longer knockdown (see below); [[18210000|Tremor Crush]] with +10 m range' },
      ],
      [
        { de: 'Skills höher', en: 'Skills higher' },
        { de: 'oft niedrig', en: 'often low' },
        { de: '[[18080000|Wave Blow]] auf 10 – bei den Top 10 gespalten: 3 lassen ihn auf 1–2, 5 haben ihn auf 10. [[18790000|Survival Willpower]] (+35 % Widerstand gegen Statuseffekte) haben 7 der Top 10 schon auf 10', en: '[[18080000|Wave Blow]] to 10 – split in the top 10: 3 leave it at 1–2, 5 have it at 10. 7 of the top 10 already have [[18790000|Survival Willpower]] (+35% Status Effect Resist) at 10' },
      ],
      [
        { de: 'Daevanion', en: 'Daevanion' },
        { de: 'Nezekan bis Triniel', en: 'Nezekan to Triniel' },
        { de: 'dazu **Azphel**: bezahlt mit Kampfkristallen aus dem PvP, Werte zählen nur gegen Spieler. Die Top 10 haben dort 21–51 von 152 Knoten offen (Median 35) – am meisten die beiden Eshin-Charaktere mit PvP-Stigmen (50 und 51)', en: 'plus **Azphel**: paid with Battle Crystals from PvP, its stats only count against players. The top 10 have 21–51 of its 152 nodes open (median 35) – the most are the two Eshin characters with PvP stigmas (50 and 51)' },
      ],
      [
        { de: 'Spielweise', en: 'How you play' },
        { de: 'Burst am Boss', en: 'burst on the boss' },
        { de: 'Nach einem Ausweichen bringt dich [[18210000|Tremor Crush]] zurück und betäubt (50 % Chance), dann wirft [[18080000|Wave Blow]] nieder. [[18130000|Fracturing Blow]] holt Fliehende ein, [[18200000|Defiance]] auf der Leertaste befreit dich', en: 'After a dodge, [[18210000|Tremor Crush]] takes you back and stuns (50% chance), then [[18080000|Wave Blow]] knocks down. [[18130000|Fracturing Blow]] catches runners, [[18200000|Defiance]] on Space frees you' },
      ],
    ],
  },
  {
    type: 'specs',
    items: [
      {
        id: 18060000 /* Impactful Crush */,
        parts: [18060020 /* +1s Stun duration */, 18060040 /* +30% Skill Speed */],
        note: {
          de: '1 s längere Betäubung statt „im Laufen wirken“. Ab Skillstufe 16 gibt es +20 % Betäubungs-Chance (dritter Platz ab 20).',
          en: '1 s longer stun instead of “cast while moving”. From skill level 16 there is +20% stun chance (third slot from 20).',
        },
      },
      {
        id: 18080000 /* Wave Blow */,
        parts: [18080030 /* +1s Knockdown duration */, 18080040 /* -15% PvE / -7.5% PvP Damage Boost for 10s */],
        note: {
          de: '1 s länger am Boden statt Mehrfachtreffer. Ab Skillstufe 16 gibt es −5 s Abklingzeit.',
          en: '1 s longer on the ground instead of Multi-Hit. From skill level 16 there is −5 s cooldown.',
        },
      },
      {
        id: 18090000 /* Rushing Smash */,
        parts: [18090010 /* -20% target Impact-type Resist for 5s */, 18090040 /* Resets cooldown on defeating an enemy */],
        note: {
          de: '5 s lang −20 % Widerstand gegen Schock-Effekte beim Ziel – deine Betäubungen und das Niederwerfen sitzen öfter.',
          en: '−20% Impact-type Resist on the target for 5 s – your stuns and knockdowns land more often.',
        },
      },
    ],
  },
  {
    type: 'table',
    caption: { de: 'PvP-Stigmen: Die Quellen sind sich uneins', en: 'PvP stigmas: the sources disagree' },
    head: [{ de: 'Quelle', en: 'Source' }, { de: 'Stigmen', en: 'Stigmas' }],
    rows: [
      [{ de: 'Dieser Guide und aion2-guides.info (1 gegen 1)', en: 'This guide and aion2-guides.info (1 vs 1)' }, '[[18190000|Undefeated Mantra]], [[18330000|Marchutan\'s Wrath]], [[18130000|Fracturing Blow]], [[18420000|Guardian Blessing]]'],
      [{ de: 'Top 10 Nr. 3 und 6 (Eshin, aktiv)', en: 'Top 10 Nos. 3 and 6 (Eshin, active)' }, { de: '[[18420000|Guardian Blessing]] 20, [[18190000|Undefeated Mantra]] 20, [[18330000|Marchutan\'s Wrath]] 11, [[18140000|Focused Defense]] 10 – [[18230000|Ensnaring Mark]] bereit', en: '[[18420000|Guardian Blessing]] 20, [[18190000|Undefeated Mantra]] 20, [[18330000|Marchutan\'s Wrath]] 11, [[18140000|Focused Defense]] 10 – [[18230000|Ensnaring Mark]] ready' }],
      [{ de: 'Top 10 Nr. 1', en: 'Top 10 No. 1' }, { de: '[[18700000|Assault Shock]] 20 aktiv, [[18130000|Fracturing Blow]] bereit', en: '[[18700000|Assault Shock]] 20 active, [[18130000|Fracturing Blow]] ready' }],
      [{ de: 'games.gg (Arena)', en: 'games.gg (Arena)' }, '[[18140000|Focused Defense]], [[18230000|Ensnaring Mark]], [[18420000|Guardian Blessing]], [[18700000|Assault Shock]]'],
      [{ de: 'games.gg (Abyss)', en: 'games.gg (Abyss)' }, '[[18190000|Undefeated Mantra]], [[18160000|Sprint Mantra]], [[18240000|Impeding Authority]], [[18440000|Barrier Spell]]'],
      ['MetaBot', '[[18190000|Undefeated Mantra]], [[18160000|Sprint Mantra]], [[18250000|Power of the Storm]], [[18220000|Obliterate]]'],
    ],
  },
  {
    type: 'callout',
    tone: 'tip',
    title: { de: 'Wann wechseln – und was es kostet', en: 'When to switch – and what it costs' },
    text: {
      de: 'Für Arena, Abyss und PvP in der offenen Welt – vor dem Kampf. Im Abyss mit vielen Spielern passt eher ein Gruppen-Set mit Mantras und Schild (games.gg), im Duell das Set oben. **Kosten:** [[18130000|Fracturing Blow]] auf Stufe 10 sind 15 Stigma Shards, [[18330000|Marchutan\'s Wrath]] von 10 auf 15 weitere 20, wenn dein Preset sie nicht für sich verteilt. Skillpunkte und Optionen stellst du kostenlos um, die Ausrüstung bleibt gleich.',
      en: 'For the Arena, the Abyss and open-world PvP – before the fight. In the Abyss with many players a group set with mantras and a shield fits better (games.gg), in a duel the set above. **Costs:** [[18130000|Fracturing Blow]] at level 10 is 15 Stigma Shards, [[18330000|Marchutan\'s Wrath]] from 10 to 15 another 20, unless your preset spreads them on its own. You change skill points and options for free, your gear stays the same.',
    },
  },
  {
    type: 'bars',
    title: { de: 'Welche Stigmen die Top 10 aktiv haben oder bereithalten', en: 'Which stigmas the top 10 have active or keep ready' },
    caption: {
      de: 'Wie viele der Top 10 das Stigma aktiv haben oder bereithalten („bereit“ = in einem anderen Preset oder auf einer Leiste; AION2 Index zeigt es als ausgerüstet, aber ohne Stufe). Gold: Haupt-Build, Grau: Option für den 4. Platz, Violett: PvP, Türkis: Heiler-Ersatz. Nr. 3 und 6 sind zwei Charaktere namens Eshin auf zwei Servern mit demselben Set – wohl ein Spieler. [[18700000|Assault Shock]] hat Nr. 1 aktiv. AION2 Index, Top 10 der Klasse, 18.10.2026 – die Spieler mit der höchsten Kampfkraft, fast alle mit PvE-Ausrüstung.',
      en: 'How many of the top 10 have the stigma active or keep it ready (“ready” = on another preset or a skill bar; AION2 Index shows it as equipped but without a level). Gold: main build, grey: option for the 4th slot, violet: PvP, teal: healer stand-in. Nos. 3 and 6 are two characters named Eshin on two servers with the same set – probably one player. No. 1 has [[18700000|Assault Shock]] active. AION2 Index, top 10 of the class, 18 Oct 2026 – the players with the highest Combat Power, nearly all in PvE gear.',
    },
    max: 10,
    items: [
      { label: '[[18190000|Undefeated Mantra]]', value: 10, display: { de: '10 von 10', en: '10 of 10' }, note: { de: '10 aktiv', en: '10 active' }, tone: 'gold' },
      { label: '[[18330000|Marchutan\'s Wrath]]', value: 9, display: { de: '9 von 10', en: '9 of 10' }, note: { de: '8 aktiv · 1 bereit', en: '8 active · 1 ready' }, tone: 'gold' },
      { label: '[[18160000|Sprint Mantra]]', value: 9, display: { de: '9 von 10', en: '9 of 10' }, note: { de: '5 aktiv · 4 bereit', en: '5 active · 4 ready' }, tone: 'gold' },
      { label: '[[18250000|Power of the Storm]]', value: 8, display: { de: '8 von 10', en: '8 of 10' }, note: { de: '8 aktiv', en: '8 active' }, tone: 'gold' },
      { label: '[[18420000|Guardian Blessing]]', value: 7, display: { de: '7 von 10', en: '7 of 10' }, note: { de: '6 aktiv · 1 bereit', en: '6 active · 1 ready' }, tone: 'gold' },
      { label: '[[18140000|Focused Defense]]', value: 3, display: { de: '3 von 10', en: '3 of 10' }, note: { de: '2 aktiv · 1 bereit', en: '2 active · 1 ready' }, tone: 'slate' },
      { label: '[[18230000|Ensnaring Mark]]', value: 2, display: { de: '2 von 10', en: '2 of 10' }, note: { de: '0 aktiv · 2 bereit', en: '0 active · 2 ready' }, tone: 'violet' },
      { label: '[[18130000|Fracturing Blow]]', value: 1, display: { de: '1 von 10', en: '1 of 10' }, note: { de: '0 aktiv · 1 bereit', en: '0 active · 1 ready' }, tone: 'violet' },
      { label: '[[18170000|Healing Touch]]', value: 0, display: { de: '0 von 10', en: '0 of 10' }, note: { de: 'von 1 gelernt', en: 'learned by 1' }, tone: 'teal' },
      { label: '[[18240000|Impeding Authority]]', value: 0, display: { de: '0 von 10', en: '0 of 10' }, note: { de: 'von 3 gelernt', en: 'learned by 3' }, tone: 'teal' },
    ],
  },
  {
    type: 'sources',
    items: [
      { href: 'https://aion2-guides.info/en/chanter/', label: 'AION 2 Guides – Chanter (1v1 and support sets, Barrier Spell)' },
      { href: 'https://games.gg/aion-2/guides/aion-2-chanter-guide/', label: 'games.gg – Chanter guide (support, Arena and Abyss sets)' },
      { href: 'https://metabot.gg/en/aion-2/classes/chanter/build', label: 'MetaBot – Chanter build (stigma use, PvP set)' },
      { href: 'https://metabot.gg/en/aion-2/guides/stigma-guide', label: 'MetaBot – Stigma guide (no swaps in combat)' },
      { href: 'https://space4games.com/en/games-en/aion-2-stigma-guide/', label: 'Space4Games – Stigma guide (presets on the global client)' },
      { href: 'https://aion2builds.org/guides/respec/', label: 'AION2 Builds – Respec guide (free skill reset, stigma reset cost unconfirmed)' },
    ],
  },
];
