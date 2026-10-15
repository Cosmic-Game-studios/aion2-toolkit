import type { CuratedCombo } from './types';

/**
 * Sorcerer combos, checked by hand on 2026-10-15 (adversarial second pass the same day).
 * Every link below is written in the skill texts (EN and DE data, level 10 and the specialisations); both languages
 * were read for every skill and agree on all conditions used here (DE "benommen" = Stagger, "Einfrieren" = Frost,
 * "Trägheit" = Slow, "Bann" = Root, "Siegel" = Seal). Usage numbers come from aion2vault (questlog.gg public Global builds
 * and macros, 2026-10-11/14), metabot.gg (top 150 Global characters and its editorial builds), aion2-meta.com (Korean
 * rankers) and couga54's guide.
 * Our data and the live tooltips differ in two places, both around Fire Mark: our data gives the Fire Mark passive a 20%
 * chance per Fire hit and Flame Arrow's level 12 option "Fire Mark on Pyroclasm", while metabot (global client build
 * 0.0.4387.0, read 2026-10-15), aion2vault and couga54 show the passive marking on every Fire hit and "+5% Fire Damage
 * Boost" on Flame Arrow's level 12 option. So the Fire Mark for Blaze is planned from the passive only, and the texts
 * name both versions.
 * Left out on purpose: Delayed Explosion, Element Enhancement's Attack part, Wish of Concentration's buff and its
 * level 16 "−10s all skill cooldowns", Flame Scattershot's level 16 cut and the Winter's Shackles damage option are
 * plain damage or cooldown effects that help every skill alike, so they are no combo even though every opener stacks
 * them around Hellfire (the Wish timing is a tip inside blaze-feeds-wish).
 * Bosses mostly have Incapacitated Immunity: the Frost, Seal/Root/Stun and Polymorph combos are marked for groups and
 * PvP only.
 */
export const combos: CuratedCombo[] = [
  {
    id: 'fire-mark-blaze',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 15710000 }, { id: 15040000 }, { id: 15210000 }],
    payoff: [{ id: 15050000 }],
    window: 5,
    status: 'Fire Mark',
    title: { de: 'Feuerzeichen schaltet [[15050000]] frei', en: 'Fire Mark unlocks [[15050000]]' },
    text: {
      de: '[[15050000]] kannst du nur auf ein Ziel mit Feuerzeichen wirken, und das Zeichen setzt die Passive [[15710000]] für 5 s. In unseren Daten markiert ein Feuertreffer nur mit 20 % Chance, laut den Live-Tooltips auf metabot und aion2vault jeder Feuertreffer. So oder so liefern [[15210000]] und [[15040000]] mit ihren ständigen Feuertreffern neue Zeichen.',
      en: '[[15050000]] can only be cast on a target with Fire Mark, and the passive [[15710000]] puts the mark on for 5s. In our data a Fire hit marks with a 20% chance only, in the live tooltips on metabot and aion2vault every Fire hit does. Either way the steady Fire hits of [[15210000]] and [[15040000]] keep new marks coming.',
    },
    how: {
      de: 'Leg [[15050000]] unten auf eine Taste und [[15220000]] darüber, wie in shr1kns Standard-Makro. Das Makro überspringt [[15050000]], solange kein Zeichen da ist, und wirkt sie, sobald eines sitzt. Halte [[15210000]] auf der anderen Maustaste, dann kommen ständig neue Feuertreffer.',
      en: "Put [[15050000]] at the bottom of a key with [[15220000]] above it, as in shr1kn's standard macro. The macro skips [[15050000]] while there is no mark and casts it as soon as one lands. Hold [[15210000]] on the other mouse button so new Fire hits keep coming.",
    },
    stack: [15050000, 15220000],
    usage: {
      de: 'Die Taste Flammenexplosion → Eisexplosion steht in 57–60 % der öffentlichen Magier-Makros; 95 % der Builds haben Flammenexplosion auf der Leiste.',
      en: 'The Blaze → Frost Burst key is in 57–60% of public Sorcerer macros; 95% of builds slot Blaze.',
    },
    evidence: [
      { id: 15050000, en: 'to a target afflicted with Fire Mark within 20m', de: 'einem Ziel mit Feuerzeichen innerhalb von 20 m' },
      {
        id: 15710000,
        en: 'Has a 20% chance to inflict Fire Mark for 5s on landing a Fire attack.',
        de: 'Versetzt das Ziel bei jedem Treffer mit einem Feuerangriff mit 20 % Chance für 5s in Feuerzeichen.',
      },
      { id: 15040000, en: 'Fire damage to a target within 20m. 5 Stagger Gauge Damage', de: 'Feuerschaden zu. Benommen-Leiste (Schaden) 5' },
      { id: 15210000, en: 'Fire damage to a target within 20m and restores 100 MP.', de: 'Feuerschaden zu und regeneriert 100 MP.' },
    ],
    sources: [
      { label: 'aion2vault: macro guide (public Global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: 'metabot.gg: Fire Mark (live tooltip)', href: 'https://metabot.gg/en/aion-2/skills/fire-mark' },
      { label: 'aion2-meta.com: Sorcerer guide', href: 'https://aion2-meta.com/guides/sorcerer/' },
    ],
  },
  {
    id: 'pyroclasm-resets-blaze',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 15210000, part: 15210050 }],
    payoff: [{ id: 15050000 }],
    title: { de: 'Der dritte [[15210000]]-Treffer setzt [[15050000]] zurück', en: 'The third [[15210000]] hit resets [[15050000]]' },
    text: {
      de: '[[15210000]] ist eine Kette aus drei Treffern, der dritte heißt Pyroklasmus. Mit der Stufe-16-Option setzt dieser Treffer die Abklingzeit von [[15050000]] zurück. So wirkst du [[15050000]] öfter, als ihre 5 s Abklingzeit erlaubt – solange das Ziel Feuerzeichen trägt.',
      en: '[[15210000]] is a chain of three hits, the third one is Pyroclasm. With the level 16 option that hit resets the cooldown of [[15050000]]. So you cast [[15050000]] more often than its 5s cooldown allows – as long as the target carries Fire Mark.',
    },
    how: {
      de: 'Halte [[15210000]] gedrückt, damit die Kette bis Pyroklasmus läuft, und leg [[15050000]] auf eine zweite gehaltene Taste. Koreanische Top-Spieler stapeln dort von unten [[15310000]], [[15050000]] und [[15010000]]. In unseren Daten setzt die Stufe-12-Option von [[15210000]] mit Pyroklasmus auch Feuerzeichen; die Live-Tooltips auf metabot und aion2vault zeigen dort +5 % Feuer-Schadensverstärkung, das Zeichen kommt dann von [[15710000]].',
      en: 'Hold [[15210000]] so the chain runs to Pyroclasm, and put [[15050000]] on a second held key. Korean top players stack [[15310000]], [[15050000]] and [[15010000]] there, from the bottom. In our data the level 12 option of [[15210000]] also puts Fire Mark on with Pyroclasm; the live tooltips on metabot and aion2vault show +5% Fire Damage Boost there, and the mark then comes from [[15710000]].',
    },
    stack: [15310000, 15050000, 15010000],
    usage: {
      de: 'Gewählt von shr1kn (Stufe 16) und von koreanischen Top-Spielern in PvE und PvP.',
      en: 'Picked by shr1kn (level 16) and by Korean top players in PvE and PvP.',
    },
    evidence: [
      {
        id: 15210000,
        part: 15210050,
        en: 'Reset [Blaze] cooldown on landing [Pyroclasm]',
        de: '[Flammenexplosion]-Abklingzeit zurücksetzen: Bei [Pyroklasmus]-Treffer',
      },
      { id: 15050000, en: 'to a target afflicted with Fire Mark within 20m', de: 'einem Ziel mit Feuerzeichen innerhalb von 20 m' },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
      { label: 'metabot.gg: Flame Arrow', href: 'https://metabot.gg/en/aion-2/skills/flame-arrow' },
    ],
  },
  {
    id: 'firestorm-hellfire-cooldown',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 15040000, part: 15040040 }],
    payoff: [{ id: 15060000 }],
    title: { de: '[[15040000]] verkürzt [[15060000]]', en: '[[15040000]] shortens [[15060000]]' },
    text: {
      de: 'Mit der Stufe-12-Option nimmt jeder Feuerball von [[15040000]] 2 s von der Abklingzeit von [[15060000]]. Da [[15040000]] nur 5 s Abklingzeit hat, kommt dein stärkster Treffer so deutlich früher zurück. Der ganze PvE-Magier baut darauf auf.',
      en: 'With its level 12 option every fireball of [[15040000]] takes 2s off the cooldown of [[15060000]]. Since [[15040000]] has only a 5s cooldown, your biggest hit comes back much sooner. The whole PvE Sorcerer is built around it.',
    },
    how: {
      de: 'Lass [[15040000]] im Makro, als letzte Fähigkeit der Kette [[15110000]] → [[15280000]] → [[15150000]] → [[15040000]]: Sie kommt, sobald die drei davor abklingen, also fast immer. [[15060000]] lädst du von Hand voll auf, sobald die Abklingzeit um ist: Das Makro würde sie auf Ladestufe 1 loslassen.',
      en: 'Keep [[15040000]] in the macro as the last skill of the chain [[15110000]] → [[15280000]] → [[15150000]] → [[15040000]]: it fires whenever the three before it are on cooldown, which is most of the time. Charge [[15060000]] fully by hand as soon as it is ready: the macro would release it at charge level 1.',
    },
    stack: [15110000, 15280000, 15150000, 15040000],
    usage: {
      de: 'Alle geprüften Creator (EUTOPIA, shr1kn, FrozenCloud, aLuckyRO) und die koreanischen Top-Spieler nehmen diese Option; 98 % lassen Höllenflamme aus dem Makro.',
      en: 'Every creator checked (EUTOPIA, shr1kn, FrozenCloud, aLuckyRO) and the Korean top players take this option; 98% keep Hellfire out of the macro.',
    },
    evidence: [
      { id: 15040000, part: 15040040, en: '-2s [Hellfire] cooldown per fireball', de: '[Höllenflamme]-Abklingzeit −2 Sek. (Pro Projektil)' },
      { id: 15060000, en: 'Max 3 Charge Levels 20-35 Stagger Gauge Damage', de: 'Maximal 3 Ladestufen Benommen-Leiste (Schaden) 20–35' },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: 'aion2vault: macro guide (public Global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
    ],
  },
  {
    id: 'element-enhancement-robes',
    kind: 'buff',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [
      { id: 15400000, part: 15400020 },
      { id: 15400000, part: 15400030 },
    ],
    payoff: [{ id: 15740000 }, { id: 15780000 }],
    title: { de: '[[15400000]] verstärkt [[15740000]] und [[15780000]]', en: '[[15400000]] boosts [[15740000]] and [[15780000]]' },
    text: {
      de: 'Ab Stigma-Stufe 10 multipliziert [[15400000]] die Wirkung von [[15740000]] mit 1,5, ab Stufe 15 auch die von [[15780000]]. Beide Optionen schalten sich mit der Stigma-Stufe von selbst frei. [[15780000]] gibt +20 % PvE-Schaden nur, solange du mindestens 25 % MP hast.',
      en: 'From stigma level 10 [[15400000]] multiplies the effect of [[15740000]] by 1.5, from level 15 also that of [[15780000]]. Both options unlock on their own with the stigma level. [[15780000]] only gives its +20% PvE damage while you have at least 25% MP.',
    },
    how: {
      de: 'Bring [[15400000]] als erstes Stigma auf 10 und dann auf 15. Im Standard-Makro steht es unten in der Kette [[15400000]] → [[15390000]] → [[15200000]] → [[15320000]]; vor deinem Burst wirkst du es am besten von Hand. Halte mit [[15210000]] und [[15050000]] deine MP über 25 %.',
      en: 'Raise [[15400000]] first among your stigmas, to 10 and then 15. In the standard macro it sits at the bottom of the chain [[15400000]] → [[15390000]] → [[15200000]] → [[15320000]]; before your burst, cast it by hand. Keep your MP above 25% with [[15210000]] and [[15050000]].',
    },
    stack: [15400000, 15390000, 15200000, 15320000],
    usage: {
      de: '95 % der öffentlichen Builds und 93 % der Top-150 bei metabot slotten Elementarverstärkung; alle geprüften Creator steigern es zuerst.',
      en: "95% of public builds and 93% of metabot's top 150 slot Element Enhancement; every creator checked raises it first.",
    },
    evidence: [
      { id: 15400000, part: 15400020, en: 'x1.5 [Robe of Flame] effect', de: 'Effekt [Robe der Flamme] (Passiv) x1,5' },
      { id: 15400000, part: 15400030, en: 'x1.5 [Grace of Enhancement] effect', de: 'Effekt [Gnade der Verstärkung] x1,5' },
      { id: 15780000, en: "when the caster's MP is 25% or more", de: 'wenn seine MP mindestens 25 % betragen' },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: 'aion2vault: best Sorcerer builds', href: 'https://aion2vault.com/builds/sorcerer/best/' },
      { label: 'metabot.gg: Sorcerer build planner (top players)', href: 'https://metabot.gg/en/aion-2/classes/sorcerer/build' },
    ],
  },
  {
    id: 'mp-keeps-grace-on',
    kind: 'enable',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 15210000 }, { id: 15050000 }, { id: 15320000, part: 15320010 }, { id: 15760000 }],
    payoff: [{ id: 15780000 }, { id: 15720000 }],
    title: {
      de: 'MP aus [[15210000]] halten [[15780000]] und [[15720000]] an',
      en: 'MP from [[15210000]] keeps [[15780000]] and [[15720000]] on',
    },
    text: {
      de: '[[15780000]] gibt +20 % PvE-Schaden nur, solange du mindestens 25 % MP hast, und [[15720000]] Kritischer Treffer erst ab 50 % MP. Jeder Treffer der [[15210000]]-Kette bringt 100–120 MP, [[15050000]] 100 MP; [[15320000]] gibt ab Stigma-Stufe 5 weitere 200 MP und [[15760000]] 70 MP pro Treffer (höchstens einmal pro Sekunde).',
      en: '[[15780000]] gives its +20% PvE damage only while you have at least 25% MP, and [[15720000]] its Critical Hit only at 50% MP or more. Each hit of the [[15210000]] chain restores 100–120 MP and [[15050000]] 100 MP; [[15320000]] adds 200 MP from stigma level 5 and [[15760000]] 70 MP per hit (at most once a second).',
    },
    how: {
      de: 'Halte [[15210000]] auf der anderen Maustaste, während das Makro läuft, wie shr1kn und aLuckyRO. Reichen die MP trotzdem nicht, nimm aLuckyROs MP-Optionen: MP-Kosten −50 % auf [[15040000]] und MP-Regeneration +20 % auf [[15210000]].',
      en: "Hold [[15210000]] on the other mouse button while the macro runs, as shr1kn and aLuckyRO do. If your MP still runs dry, take aLuckyRO's MP options: −50% MP cost on [[15040000]] and +20% MP restored on [[15210000]].",
    },
    usage: {
      de: '98 % der öffentlichen Builds haben Flammenpfeil auf der Leiste, 80 % der Magier-Makros lassen ihn aber draußen: shr1kn hält ihn auf einer eigenen Maustaste. aLuckyRO wählt seine frühen Spezialisierungen nach MP.',
      en: '98% of public builds slot Flame Arrow, but 80% of Sorcerer macros leave it out: shr1kn holds it on a mouse button of its own. aLuckyRO picks his early specialisations for MP.',
    },
    evidence: [
      { id: 15780000, en: "when the caster's MP is 25% or more", de: 'wenn seine MP mindestens 25 % betragen' },
      {
        id: 15720000,
        en: 'Increases Critical Hit by 150 when MP is 50% or more.',
        de: 'Erhöht Kritischer Treffer um 150, wenn die MP 50 % oder mehr betragen.',
      },
      { id: 15210000, en: 'Fire damage to a target within 20m and restores 100 MP.', de: 'Feuerschaden zu und regeneriert 100 MP.' },
      { id: 15320000, part: 15320010, en: 'Restores 200 MP', de: '200 MP-Regeneration' },
      { id: 15760000, en: 'restores 70 MP on landing an attack', de: 'regeneriert bei jedem Angriffstreffer 70 MP' },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer overview (why MP is damage)', href: 'https://aion2vault.com/builds/sorcerer/' },
      { label: 'aion2vault: macro guide (public Global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'couga54: Sorcerer guide', href: 'https://couga54.github.io/aion2-guides/en/sorcerer/' },
    ],
  },
  {
    id: 'frost-frost-burst',
    kind: 'enable',
    rating: 'core',
    content: ['aoe', 'pvp'],
    setup: [
      { id: 15150000 },
      { id: 15120000, part: 15120030 },
      { id: 15110000, part: 15110020 },
      { id: 15700000 },
      { id: 15090000, part: 15090050 },
      { id: 15230000 },
    ],
    payoff: [{ id: 15220000 }],
    window: 3,
    status: 'Frost',
    title: { de: '[[15150000]] öffnet [[15220000]]', en: '[[15150000]] opens [[15220000]]' },
    text: {
      de: '[[15220000]] wirkt nur um ein eingefrorenes Ziel. [[15150000]] friert das Hauptziel 3 s lang ein: gegen NPCs immer, gegen Spieler mit 50 % Chance. [[15700000]], [[15120000]] (ab Stigma-Stufe 15) und [[15110000]] (mit Stufe-8-Option) frieren ebenfalls mit Chance ein, [[15090000]] (Stufe-16-Option) und [[15230000]] (bei Angreifern im Umkreis von 7 m) nur mit 5 %.',
      en: '[[15220000]] only works around a frozen target. [[15150000]] freezes the main target for 3s: always against NPCs, with a 50% chance against players. [[15700000]], [[15120000]] (from stigma level 15) and [[15110000]] (with its level 8 option) freeze by chance too, [[15090000]] (level 16 option) and [[15230000]] (on attackers within 7m) only with 5%.',
    },
    how: {
      de: 'Im Standard-Makro steht [[15150000]] in der Kette [[15110000]] → [[15280000]] → [[15150000]] → [[15040000]], und [[15220000]] liegt auf der nächsten Taste über [[15050000]]: Das Makro überspringt [[15220000]], bis ein Ziel eingefroren ist. Die meisten Bosse haben Handlungsunfähigkeits-Immunität, dort hält kein Einfrieren; stattdessen wird [[15220000]] bei jedem deiner Angriffe mit 7 % Chance frei, lass sie also im Makro. metabot nennt [[15150000]] → [[15220000]] die Kill-Kombo im PvP.',
      en: 'In the standard macro [[15150000]] sits in the chain [[15110000]] → [[15280000]] → [[15150000]] → [[15040000]], and [[15220000]] is stacked above [[15050000]] on the next key: the macro skips [[15220000]] until a target is frozen. Most bosses have Incapacitated Immunity, so Frost does not hold there; instead [[15220000]] unlocks with a 7% chance on each of your attacks, so leave it in the macro. metabot calls [[15150000]] → [[15220000]] the PvP kill combo.',
    },
    stack: [15050000, 15220000],
    usage: {
      de: 'Beide Tasten stehen in 57–60 % der öffentlichen Magier-Makros; 91 % der öffentlichen Builds und 97 % der Top-150 bei metabot haben Eisexplosion auf der Leiste. EUTOPIA lässt Einfrieren und Eisexplosion im PvE weg.',
      en: "Both keys are in 57–60% of public Sorcerer macros; 91% of public builds and 97% of metabot's top 150 slot Frost Burst. EUTOPIA drops Frost and Frost Burst in PvE.",
    },
    evidence: [
      { id: 15220000, en: 'Selects a target afflicted with Frost within 20m', de: 'um ein von Einfrieren betroffenes Ziel' },
      {
        id: 15150000,
        en: 'with a 50% chance to inflict Frost on the target for 3s. 100% chance to inflict Frost on NPC targets.',
        de: 'versetzt das Ziel mit 50 % Chance für 3s in Einfrieren. Gegen NPCs beträgt die Trefferchance von Einfrieren 100 %.',
      },
      { id: 15120000, part: 15120030, en: '50% chance to inflict Frost for 3s', de: 'Einfrieren für 3 Sek. (50 % Chance)' },
      {
        id: 15110000,
        part: 15110020,
        en: "30% chance to inflict Frost for 3s on landing [Winter's Shackles]",
        de: 'Einfrieren für 3 Sek. (30 % Chance): Bei [Winterbann]-Treffer',
      },
      {
        id: 15700000,
        en: 'with a 30% chance to inflict Frost for 3s. 100% chance to land Frost on NPC targets.',
        de: 'versetzt sie mit 30 % Chance für 3s in Einfrieren. Gegen NPCs beträgt die Trefferchance von Einfrieren 100 %.',
      },
      {
        id: 15090000,
        part: 15090050,
        en: '5% chance to inflict Frost for 2s on landing [Cold Wave]',
        de: 'Einfrieren für 2 Sek. (5 % Chance): Bei [Kältewelle]-Treffer',
      },
      {
        id: 15230000,
        en: 'grants a 5% chance to inflict Frost for 3s on enemies that attack the caster from within 7m',
        de: 'versetzt Gegner innerhalb von 7 m, die den Wirker angreifen, mit 5 % Chance für 3s in Einfrieren',
      },
      {
        id: 15220000,
        en: 'Has a 7% chance to trigger on attacking a target with Incapacitated Immunity.',
        de: 'Wird mit 7 % Chance beim Angriff auf ein Ziel mit Handlungsunfähigkeits-Immunität aktiviert.',
      },
    ],
    sources: [
      { label: 'aion2vault: macro guide (public Global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'metabot.gg: Sorcerer build planner (PvP build)', href: 'https://metabot.gg/en/aion-2/classes/sorcerer/build' },
      { label: 'aion2vault: best Sorcerer builds (shr1kn PvP)', href: 'https://aion2vault.com/builds/sorcerer/best/' },
      { label: 'couga54: Sorcerer guide (EUTOPIA drops Frost)', href: 'https://couga54.github.io/aion2-guides/en/sorcerer/' },
    ],
  },
  {
    id: 'blaze-feeds-wish',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 15050000, part: 15050050 }],
    payoff: [{ id: 15310000 }],
    title: { de: '[[15050000]] verkürzt [[15310000]]', en: '[[15050000]] shortens [[15310000]]' },
    text: {
      de: 'Mit der Stufe-16-Option nimmt jeder Treffer von [[15050000]] 3 s von der Abklingzeit von [[15310000]]. [[15050000]] kommt alle paar Sekunden, also wirkst du den Angriffsbuff viel öfter – und mit dessen eigener Stufe-16-Option auch die −10 s auf alle Abklingzeiten.',
      en: 'With its level 16 option every hit of [[15050000]] takes 3s off the cooldown of [[15310000]]. [[15050000]] comes every few seconds, so you cast the Attack buff much more often – and, with its own level 16 option, its −10s on all cooldowns too.',
    },
    how: {
      de: 'Koreanische Top-Spieler legen [[15310000]] unten und [[15050000]] darüber auf eine gehaltene Taste: [[15310000]] kommt, sobald sie bereit ist, sonst [[15050000]]. Mit der Stufe-16-Option von [[15310000]] wirken EUTOPIA und shr1kn sie stattdessen von Hand direkt nach [[15060000]] und den anderen großen Fähigkeiten, damit die −10 s Fähigkeiten treffen, die gerade abklingen.',
      en: 'Korean top players put [[15310000]] at the bottom and [[15050000]] above it on a held key: [[15310000]] fires as soon as it is ready, otherwise [[15050000]]. With the level 16 option of [[15310000]], EUTOPIA and shr1kn cast it by hand right after [[15060000]] and the other big skills instead, so the −10s land on skills that are on cooldown.',
    },
    stack: [15310000, 15050000, 15010000],
    usage: {
      de: 'Gewählt von shr1kn (Stufe 16) und von koreanischen Top-Spielern in PvE und PvP.',
      en: 'Picked by shr1kn (level 16) and by Korean top players in PvE and PvP.',
    },
    evidence: [
      {
        id: 15050000,
        part: 15050050,
        en: '-3s [Wish of Concentration] cooldown on hit',
        de: '[Andacht der Konzentration]-Abklingzeit −3 Sek.: Bei Treffer',
      },
      { id: 15310000, part: 15310050, en: '-10s all skill cooldowns', de: 'Abklingzeit (Alle Fäh.) −10 Sek.' },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
    ],
  },
  {
    id: 'frost-resets-frost-burst',
    kind: 'cooldown',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [{ id: 15150000, part: 15150030 }],
    payoff: [{ id: 15220000 }],
    status: 'Frost',
    title: { de: '[[15150000]] setzt [[15220000]] zurück', en: '[[15150000]] resets [[15220000]]' },
    text: {
      de: 'Mit der Stufe-8-Option setzt jedes gelandete Einfrieren von [[15150000]] die Abklingzeit von [[15220000]] zurück. So ist [[15220000]] bereit, sobald das Ziel eingefroren ist, auch wenn du sie gerade erst benutzt hast.',
      en: 'With its level 8 option every Frost that [[15150000]] lands resets the cooldown of [[15220000]]. So [[15220000]] is ready as soon as the target is frozen, even if you just used it.',
    },
    how: {
      de: 'Leg [[15220000]] auf die Taste, die im Makro direkt nach der Kette mit [[15150000]] kommt, wie shr1kns Taste [[15050000]] → [[15220000]]. Gegen Bosse mit Handlungsunfähigkeits-Immunität landet kein Einfrieren, dort bringt die Option nichts; nimm sie für Gruppen und PvP.',
      en: "Put [[15220000]] on the key that comes right after the chain with [[15150000]] in the macro, like shr1kn's [[15050000]] → [[15220000]] key. Against bosses with Incapacitated Immunity no Frost lands, so the option does nothing there; take it for packs and PvP.",
    },
    stack: [15050000, 15220000],
    usage: {
      de: 'shr1kn nimmt diese Option; koreanische PvP-Top-Spieler wählen bei Einfrieren stattdessen mehr Chance und Dauer.',
      en: 'shr1kn takes this option; Korean PvP top players pick more Frost chance and duration on Frost instead.',
    },
    evidence: [
      {
        id: 15150000,
        part: 15150030,
        en: 'Reset [Frost Burst] cooldown on landing Frost',
        de: '[Eisexplosion]-Abklingzeit zurücksetzen: Bei Einfrieren-Treffer',
      },
      { id: 15220000, en: 'Selects a target afflicted with Frost within 20m', de: 'um ein von Einfrieren betroffenes Ziel' },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean PvP rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
    ],
  },
  {
    id: 'stagger-flame-scattershot',
    kind: 'enable',
    rating: 'situational',
    content: ['boss'],
    setup: [{ id: 15360000 }, { id: 15060000 }],
    payoff: [{ id: 15010000 }],
    status: 'Stagger',
    title: { de: 'Benommenheit öffnet [[15010000]]', en: 'Stagger opens [[15010000]]' },
    text: {
      de: '[[15010000]] trifft nur ein benommenes Ziel, und ein Boss wird erst benommen, wenn die Gruppe seine Benommen-Leiste bricht. [[15360000]] macht 50 Schaden an der Leiste – mehr als jede andere Magier-Fähigkeit –, [[15060000]] je nach Ladestufe 20–35.',
      en: '[[15010000]] only hits a staggered target, and a boss is only staggered once the group breaks its Stagger Gauge. [[15360000]] deals 50 Stagger Gauge damage – more than any other Sorcerer skill – and [[15060000]] 20–35 depending on the charge.',
    },
    how: {
      de: 'Drück [[15360000]] von Hand, um die Leiste zu brechen, aber nie in eine Unverwundbarkeit oder wenn der Boss schon benommen ist (shr1kn). Im Fenster spammst du [[15010000]] (0 s Abklingzeit); mit der Stufe-16-Option nimmt jeder Treffer 1 s von allen Abklingzeiten. Da sie sonst nichts trifft, setzt aLuckyRO sie als letzten Makro-Schritt und die koreanische gehaltene Taste oben auf [[15310000]] und [[15050000]].',
      en: 'Press [[15360000]] by hand to break the gauge, but never into invulnerability or when the boss is already staggered (shr1kn). Inside the window, spam [[15010000]] (0s cooldown); with its level 16 option each hit takes 1s off all cooldowns. As it hits nothing else, aLuckyRO makes it his last macro step and the Korean held key puts it on top of [[15310000]] and [[15050000]].',
    },
    stack: [15310000, 15050000, 15010000],
    usage: {
      de: 'Göttliche Explosion: 14 % der öffentlichen Builds, 34 % der Top-150 bei metabot; Flammenfeuer haben 84 % auf der Leiste.',
      en: "Divine Burst: 14% of public builds, 34% of metabot's top 150; 84% slot Flame Scattershot.",
    },
    evidence: [
      { id: 15010000, en: 'to a target afflicted with Stagger within 20m', de: 'Fügt einem benommenen Ziel' },
      { id: 15360000, en: '50 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 50' },
      { id: 15060000, en: 'Max 3 Charge Levels 20-35 Stagger Gauge Damage', de: 'Maximal 3 Ladestufen Benommen-Leiste (Schaden) 20–35' },
      { id: 15010000, part: 15010050, en: '-1s all skill cooldowns on hit', de: 'Abklingzeit (Alle Fähigkeiten) −1s: Bei Treffer' },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: 'metabot.gg: Sorcerer build planner (top players)', href: 'https://metabot.gg/en/aion-2/classes/sorcerer/build' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean macro)', href: 'https://aion2-meta.com/guides/sorcerer/' },
    ],
  },
  {
    id: 'lock-then-hellfire',
    kind: 'status',
    rating: 'strong',
    content: ['aoe', 'pvp'],
    setup: [{ id: 15130000 }, { id: 15130000, part: 15130010 }, { id: 15280000 }, { id: 15360000, part: 15360040 }],
    payoff: [{ id: 15060000 }],
    title: { de: 'Erst festsetzen, dann volle [[15060000]]', en: 'Lock the target, then a full [[15060000]]' },
    text: {
      de: '[[15060000]] braucht Zeit bis Ladestufe 3, und ohne ihre Bewegungs-Option stehst du beim Laden still. Also sollen die Ziele bleiben, wo sie sind: [[15130000]] versiegelt 5 s lang (gegen Spieler 75 %, ab Stigma-Stufe 5 dazu 50 % Chance auf Bann), [[15280000]] bannt bis zu 4 Gegner 3 s lang (gegen Spieler 60 %, gegen NPCs immer), und [[15360000]] betäubt ab Stigma-Stufe 20 nach ihrem Rückstoß 3 s lang.',
      en: '[[15060000]] takes time to charge to level 3, and without its mobile option you stand still while charging. So you want the targets to stay put: [[15130000]] seals for 5s (75% against players, plus a 50% Root chance from stigma level 5), [[15280000]] roots up to 4 enemies for 3s (60% against players, always against NPCs), and [[15360000]] stuns for 3s after its knock back from stigma level 20.',
    },
    how: {
      de: 'shr1kns PvP-Regel: Lass eine voll geladene [[15060000]] nur auf einen Gegner los, der betäubt, versiegelt, gebannt ist oder sonst nicht entkommen kann, und lade nie ungeschützt auf. Gegen Spieler liegen die Chancen unter 100 %: Prüf, ob der Status sitzt, und fang dann sofort an zu laden. Bei Gruppen kombiniert couga54 die geladene [[15060000]] mit [[15280000]], der sie an Ort und Stelle bannt.',
      en: "shr1kn's PvP rule: release a fully charged [[15060000]] only on an enemy that is stunned, sealed, rooted or otherwise cannot escape, and never charge while exposed. Against players the chances are below 100%: check that the status landed, then start charging at once. On packs, couga54 pairs the charged [[15060000]] with [[15280000]], which roots them in place.",
    },
    usage: {
      de: 'shr1kns PvP-Notizen; 74 % der öffentlichen globalen PvP-Builds und 71 % der koreanischen PvP-Top-Spieler slotten Seelenfrost.',
      en: "shr1kn's PvP notes; 74% of public Global PvP builds and 71% of Korean PvP top players slot Soul Freeze.",
    },
    evidence: [
      { id: 15130000, en: 'with a 75% chance to inflict Seal for 5s', de: 'versetzt es mit 75 % Chance für 5s in Siegel' },
      { id: 15130000, part: 15130010, en: '50% chance to inflict Root for 5s', de: '50 % Chance auf Bann für 5 Sek.' },
      {
        id: 15280000,
        en: 'with a 60% chance to inflict Root for 3s. 100% chance to inflict Root on NPC targets.',
        de: 'versetzt sie mit 60 % Chance für 3s in Bann. Gegen NPCs beträgt die Trefferchance von Bann 100 %.',
      },
      { id: 15360000, part: 15360040, en: 'Inflict Stun for 3s after Knock Back', de: '3 Sek. Betäubung: Nach Rückstoß' },
      { id: 15060000, part: 15060030, en: 'Changes to mobile skill', de: 'Fähigkeit während der Bewegung einsetzbar' },
      { id: 15060000, en: 'Max 3 Charge Levels', de: 'Maximal 3 Ladestufen' },
    ],
    sources: [
      { label: 'aion2vault: best Sorcerer builds (shr1kn PvP notes)', href: 'https://aion2vault.com/builds/sorcerer/best/' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean PvP rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
      { label: 'couga54: Sorcerer guide (leveling)', href: 'https://couga54.github.io/aion2-guides/en/sorcerer/' },
    ],
  },
  {
    id: 'ice-chain-winters-shackles',
    kind: 'cooldown',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 15090000, part: 15090040 }],
    payoff: [{ id: 15110000 }],
    title: { de: '[[15090000]] verkürzt [[15110000]]', en: '[[15090000]] shortens [[15110000]]' },
    text: {
      de: 'Mit der Stufe-12-Option nimmt jeder Treffer von [[15090000]] 1 s von der Abklingzeit von [[15110000]]. [[15090000]] hat keine Abklingzeit, also kommt [[15110000]] samt +20 %-PvE-Schadensbuff (Stufe-8-Option, 5 s) viel öfter.',
      en: 'With its level 12 option every hit of [[15090000]] takes 1s off the cooldown of [[15110000]]. [[15090000]] has no cooldown, so [[15110000]] – with its +20% PvE damage buff from the level 8 option (5s) – comes back much sooner.',
    },
    how: {
      de: 'aLuckyRO legt [[15110000]] unten und [[15090000]] darüber auf eine Taste: [[15110000]] kommt, sobald er bereit ist, sonst füllt [[15090000]] die Lücke. Die Creator sind sich uneinig: EUTOPIA und shr1kn lassen [[15090000]] im PvE niedrig, shr1kn hebt sie nur im PvP auf 12.',
      en: 'aLuckyRO puts [[15110000]] at the bottom and [[15090000]] above it on one key: [[15110000]] fires as soon as it is ready, otherwise [[15090000]] fills the gap. Creators disagree: EUTOPIA and shr1kn keep [[15090000]] low in PvE, shr1kn raises it to 12 only for PvP.',
    },
    stack: [15110000, 15090000],
    usage: {
      de: 'aLuckyRO und shr1kns PvP-Builds heben Eiskette auf 12; aion2-meta hält sie für keine Skillpunkte wert.',
      en: "aLuckyRO and shr1kn's PvP builds raise Ice Chain to 12; aion2-meta rates it not worth skill points.",
    },
    evidence: [
      { id: 15090000, part: 15090040, en: "-1s [Winter's Shackles] cooldown on hit", de: '[Winterbann]-Abklingzeit −1 Sek.: Bei Treffer' },
      {
        id: 15110000,
        part: 15110030,
        en: "+20% PvE Damage Boost and +10% PvP Damage Boost for 5s on landing [Winter's Shackles]",
        de: 'Bei [Winterbann]-Treffer: Schadensverstärkung (PvE) +20 %, Schadensverstärkung (PvP) +10 % für 5s',
      },
    ],
    sources: [
      { label: 'aion2vault: Sorcerer PvE build', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
      { label: "couga54: Sorcerer guide (aLuckyRO's macro)", href: 'https://couga54.github.io/aion2-guides/en/sorcerer/' },
      { label: 'aion2vault: best Sorcerer builds (shr1kn PvP)', href: 'https://aion2vault.com/builds/sorcerer/best/' },
    ],
  },
  {
    id: 'bittercold-wind-frost-cooldown',
    kind: 'cooldown',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [{ id: 15280000, part: 15280050 }],
    payoff: [{ id: 15150000 }],
    title: { de: '[[15280000]] verkürzt [[15150000]]', en: '[[15280000]] shortens [[15150000]]' },
    text: {
      de: 'Mit der Stufe-16-Option nimmt jeder Treffer von [[15280000]] 1 s von der Abklingzeit von [[15150000]]. So friert [[15150000]] öfter ein und gibt [[15220000]] öfter ein Ziel.',
      en: 'With its level 16 option every hit of [[15280000]] takes 1s off the cooldown of [[15150000]]. So [[15150000]] freezes more often and gives [[15220000]] a target more often.',
    },
    how: {
      de: 'Leg beide in eine Kette, [[15280000]] unter [[15150000]], wie in shr1kns Standard-Makro. Gegen Bosse mit Handlungsunfähigkeits-Immunität friert [[15150000]] nicht ein, dort lohnt die Option kaum; koreanische Spieler nehmen sie fürs PvP.',
      en: "Put both in one chain, [[15280000]] below [[15150000]], as in shr1kn's standard macro. Against bosses with Incapacitated Immunity [[15150000]] does not freeze, so the option is worth little there; Korean players take it for PvP.",
    },
    stack: [15110000, 15280000, 15150000, 15040000],
    usage: { de: 'Koreanische Top-Spieler im PvP nehmen diese Option.', en: 'Korean top players take this option for PvP.' },
    evidence: [
      { id: 15280000, part: 15280050, en: '-1s [Frost] cooldown on hit', de: 'Abklingzeit von [Einfrieren] bei Treffer −1 Sek.' },
      {
        id: 15150000,
        en: 'with a 50% chance to inflict Frost on the target for 3s. 100% chance to inflict Frost on NPC targets.',
        de: 'versetzt das Ziel mit 50 % Chance für 3s in Einfrieren. Gegen NPCs beträgt die Trefferchance von Einfrieren 100 %.',
      },
    ],
    sources: [
      { label: 'aion2-meta.com: Sorcerer guide (Korean PvP rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
      { label: 'aion2vault: macro guide (public Global macros)', href: 'https://aion2vault.com/builds/macros/' },
    ],
  },
  {
    id: 'slow-cold-snap',
    kind: 'status',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 15090000 }, { id: 15110000 }, { id: 15200000 }, { id: 15750000 }],
    payoff: [{ id: 15730000 }],
    status: 'Slow',
    title: { de: 'Trägheit füttert [[15730000]]', en: 'Slow feeds [[15730000]]' },
    text: {
      de: 'Die Passive [[15730000]] gibt jedem deiner Treffer gegen ein Ziel in Trägheit 50 % Chance auf Zusatzschaden (Abklingzeit 1 s). Trägheit setzen [[15090000]] (5 s), [[15110000]] (3 s), [[15200000]] und [[15750000]] bei Angreifern (4 s, Abklingzeit 10 s).',
      en: 'The passive [[15730000]] gives each of your hits on a Slowed target a 50% chance of extra damage (1s cooldown). [[15090000]] (5s), [[15110000]] (3s), [[15200000]] and [[15750000]] on attackers (4s, 10s cooldown) inflict Slow.',
    },
    how: {
      de: 'Du musst nichts extra drücken: Halte einfach eine Trägheit am Ziel. [[15090000]] hat die längste angegebene Trägheit und keine Abklingzeit; aLuckyRO und das koreanische Makro auf aion2-meta nutzen sie als Füller.',
      en: 'Nothing extra to press: just keep a Slow on the target. [[15090000]] has the longest stated Slow and no cooldown; aLuckyRO and the Korean macro on aion2-meta use it as a filler.',
    },
    usage: {
      de: 'metabots Leveling-Build und couga54 halten Gruppen mit Eiskette für diese Passive in Trägheit; EUTOPIA lässt Eiskette weg, weil seine anderen Fähigkeiten das Ziel schon verlangsamen.',
      en: "metabot's leveling build and couga54 keep packs slowed with Ice Chain for this passive; EUTOPIA skips Ice Chain because his other skills already keep the target slowed.",
    },
    evidence: [
      {
        id: 15730000,
        en: 'extra damage when landing an attack on a target afflicted with Slow',
        de: 'gegen ein von Trägheit betroffenes Ziel',
      },
      {
        id: 15090000,
        en: 'inflicts Slow, reducing Move Speed by 40% for 5s',
        de: 'versetzt sie für 5s in Trägheit, welche das Bewegungstempo um 40 % verringert',
      },
      { id: 15110000, en: 'Inflicts Slow for 3s.', de: 'und versetzt sie für 3s in Trägheit.' },
      { id: 15200000, en: 'inflicting Slow on up to 4 enemies within 5m', de: 'Wasserschaden zu und versetzt sie in Trägheit' },
      {
        id: 15750000,
        en: 'inflicts Slow on an enemy when struck by them',
        de: 'Versetzt den Angreifer bei jedem erlittenen Treffer für 4s in Trägheit',
      },
    ],
    sources: [
      { label: 'metabot.gg: Sorcerer build planner (leveling build)', href: 'https://metabot.gg/en/aion-2/classes/sorcerer/build' },
      { label: "couga54: Sorcerer guide (aLuckyRO's macro)", href: 'https://couga54.github.io/aion2-guides/en/sorcerer/' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean macro)', href: 'https://aion2-meta.com/guides/sorcerer/' },
      { label: 'aion2vault: Sorcerer PvE build (EUTOPIA on Ice Chain)', href: 'https://aion2vault.com/builds/sorcerer/pve/' },
    ],
  },
  {
    id: 'curse-tree-hellfire',
    kind: 'debuff',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 15140000 }],
    payoff: [{ id: 15060000 }],
    window: 10,
    title: { de: '[[15140000]], dann volle [[15060000]]', en: '[[15140000]], then a full [[15060000]]' },
    text: {
      de: '[[15140000]] verwandelt ein Ziel für 10 s in einen Baum und senkt währenddessen seine Resistenz gegen Feuer um 20 %. Angriffe heben die Verwandlung auf, ab Stigma-Stufe 5 braucht es dafür mehr Treffer. Du hast also Zeit, [[15060000]] voll aufzuladen, und der Treffer, der den Baum bricht, ist ein großer Feuertreffer.',
      en: '[[15140000]] turns a target into a tree for 10s and lowers its Fire Tolerance by 20% meanwhile. Attacks break the polymorph; from stigma level 5 it takes more hits. So you have time to fully charge [[15060000]], and the hit that breaks the tree is a big Fire hit.',
    },
    how: {
      de: 'Wirk [[15140000]] auf dein Ziel, lade [[15060000]] auf Stufe 3 und lass sie los, bevor die 10 s um sind. Alles, was den Baum vorher trifft, kann die Verwandlung früher beenden, auch Schaden über Zeit von [[15390000]] oder [[15200000]]. Gegen Bosse mit Handlungsunfähigkeits-Immunität taugt das nicht.',
      en: 'Cast [[15140000]] on your target, charge [[15060000]] to level 3 and release it before the 10s are up. Anything that hits the tree first can end the polymorph early, damage over time from [[15390000]] or [[15200000]] too. It does not work on bosses with Incapacitated Immunity.',
    },
    usage: {
      de: 'metabots PvP-Build nimmt Fluch: Baum, um einen Gegner aus dem Kampf zu nehmen; 42 % der koreanischen PvP-Top-Spieler, global 3 % der Builds. Keine der gelesenen Quellen nennt die Höllenflamme danach ausdrücklich.',
      en: "metabot's PvP build slots Curse: Tree to take one enemy out of a fight; 42% of Korean PvP top players, 3% of Global builds. None of the sources read names the Hellfire follow-up.",
    },
    evidence: [
      {
        id: 15140000,
        en: 'reducing their Fire Tolerance by -20%',
        de: 'wobei dessen Resistenz gegen Feuer um -20 % verringert ist',
      },
      {
        id: 15140000,
        en: 'Polymorph is canceled if the target is attacked.',
        de: 'Der Effekt wird aufgehoben, wenn das Ziel angegriffen wird.',
      },
      {
        id: 15140000,
        part: 15140010,
        en: 'Increases number of hits required to remove Polymorph',
        de: 'Zum Aufheben der Verwandlung erforderliche Trefferzahl erhöht',
      },
      { id: 15060000, en: 'Max 3 Charge Levels', de: 'Maximal 3 Ladestufen' },
    ],
    sources: [
      { label: 'metabot.gg: Sorcerer build planner (PvP build)', href: 'https://metabot.gg/en/aion-2/classes/sorcerer/build' },
      { label: 'aion2-meta.com: Sorcerer guide (Korean PvP rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
      { label: 'aion2vault: best Sorcerer builds (shr1kn PvP notes)', href: 'https://aion2vault.com/builds/sorcerer/best/' },
    ],
  },
  {
    id: 'arctic-armor-passives',
    kind: 'buff',
    rating: 'situational',
    content: ['pvp'],
    setup: [
      { id: 15230000, part: 15230020 },
      { id: 15230000, part: 15230030 },
    ],
    payoff: [{ id: 15760000 }, { id: 15750000 }],
    title: { de: '[[15230000]] verstärkt [[15760000]] und [[15750000]]', en: '[[15230000]] boosts [[15760000]] and [[15750000]]' },
    text: {
      de: 'Ab Stigma-Stufe 10 multipliziert [[15230000]] die Wirkung von [[15760000]] mit 1,5 (Treffer Körper/Mental, MP pro Treffer), ab Stufe 15 die von [[15750000]] (Verteidigung, Trägheit auf Angreifer).',
      en: 'From stigma level 10 [[15230000]] multiplies the effect of [[15760000]] by 1.5 (Ailment- and Mental-type Chance, MP per hit), from level 15 that of [[15750000]] (Defense, Slow on attackers).',
    },
    how: {
      de: 'Ein PvP-Werkzeug: shr1kn wirkt [[15230000]] bei etwa 50 % LP oder vor einem erwarteten Burst. Die Magische Verschiebung teilt den Schaden nur auf LP und MP auf, solange du mindestens 50 % MP hast, und die zusätzlichen MP aus [[15760000]] helfen dir, dort zu bleiben.',
      en: 'A PvP tool: shr1kn casts [[15230000]] at about 50% HP or before a burst he expects. Magic Displacement only splits damage between HP and MP while you have at least 50% MP, and the extra MP from [[15760000]] helps you stay there.',
    },
    usage: {
      de: '96 % der koreanischen PvP-Top-Spieler, global 7 % der Builds.',
      en: '96% of Korean PvP top players, 7% of Global builds.',
    },
    evidence: [
      { id: 15230000, part: 15230020, en: 'x1.5 [Absorb Essence] effect', de: 'Effekt [Essenzabsorption] x1,5' },
      { id: 15230000, part: 15230030, en: 'x1.5 [Robe of Cold] effect', de: 'Effekt [Robe der Kälte] x1,5' },
      {
        id: 15230000,
        en: 'Grants Magic Displacement while MP is 50% or more for the duration.',
        de: 'Gewährt dem Wirker während dieser Dauer [Magische Verschiebung], wenn seine MP mindestens 50 % betragen.',
      },
    ],
    sources: [
      { label: 'aion2-meta.com: Sorcerer guide (Korean PvP rankers)', href: 'https://aion2-meta.com/guides/sorcerer/' },
      { label: 'aion2vault: best Sorcerer builds (shr1kn PvP notes)', href: 'https://aion2vault.com/builds/sorcerer/best/' },
    ],
  },
];
