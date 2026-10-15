import type { CuratedCombo } from './types';

/**
 * Templar combos, checked by hand against the Global client texts in both languages (public/data/en|de/skills.json;
 * actives at skill level 10, stigmas at stigma level 10). Every link below is written in a skill text or one of its
 * specialisations. Where English and German disagree, the stricter German reading is used and named in the combo:
 * Judgment only works when a shield skill is cast ("beim Wirken einer Schildfähigkeit"; aion2vault says the same, and
 * the KR patch of 2026-08-26 changed its condition to shield attack skills), and Debilitating Smash only after a
 * successful Block ("bei erfolgreichem Block"; aion2vault: triggered by a block or by Shield Smite). Stun and Knockdown
 * do not land on bosses (Incapacitated Immunity), so combos built on them leave out `boss` unless the text gives a
 * boss route (Annihilate's 5% trigger against immune targets). Only Stun is used as an Impact-type status (aion2vault
 * reads Executing Blade's bonus as stunned or knocked-down targets; the texts never list the Impact-type statuses).
 * Against players Stun and Knockdown only land by chance, which is what Poach's Status Effect Resist cut helps with.
 * Shares: aion2vault (public Global builds and 3,169 public macros on questlog.gg, read 2026-10-11 and 2026-10-14),
 * MetaBot (153 top Templars, 2026-10-03) and aion2-meta (top Korean players and the top 29 Global Templars). Play advice
 * from Leonis, Xia and NoBS Game Guides (via aion2vault) and from the Korean Inven guides, paraphrased.
 * Left out on purpose: plain damage buffs and debuffs (Executor, Battlefield Banner, Debilitate / Executing Blade
 * Defense cuts, Taunt's Shrink), Flash Rampage's cut to all cooldowns, and specialisations that only raise the Block
 * chance (Warding Strike, Doom Shield, Second Skin) instead of guaranteeing a Block.
 */
export const combos: CuratedCombo[] = [
  {
    id: 'shield-skills-judgment',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12100000 }, { id: 12350000 }, { id: 12430000 }],
    payoff: [{ id: 12240000 }],
    window: 2,
    title: {
      de: 'Schildfähigkeit öffnet [[12240000]]',
      en: 'A shield skill opens [[12240000]]',
    },
    text: {
      de: '[[12240000]] geht nur beim Wirken einer Schildfähigkeit. Das steht im deutschen Text, dem englischen fehlt die Bedingung. [[12100000]], [[12350000]] und [[12430000]] aktivieren [[12240000]] beim Wirken für 2 s. Xia schätzt [[12240000]] auf etwa 60 % ihres Schadens.',
      en: '[[12240000]] only works when you cast a shield skill. The German text says so; the English one drops the condition. [[12100000]], [[12350000]] and [[12430000]] activate [[12240000]] for 2 s when cast. Xia estimates [[12240000]] at about 60% of her damage.',
    },
    how: {
      de: 'Leg [[12240000]] ganz unten in eine Kette, darüber [[12100000]] und [[12350000]], die das Fenster öffnen, und ganz oben [[12040000]] als Füller. Dann feuert das Makro [[12240000]], sobald ein Fenster offen ist. Ab Stufe 16 hat [[12240000]] keine Abklingzeit und passt mehrmals in jedes Fenster; weil es dann immer Vorrang hat, kommt die nächste Schildfähigkeit erst, wenn das Fenster zu ist. [[12430000]] geht nur nach Notausweichen oder im Flug: Nutz ihn, wenn du sowieso ausweichst.',
      en: 'Put [[12240000]] at the bottom of one chain, above it [[12100000]] and [[12350000]], which open the window, and [[12040000]] at the top as filler. The macro then fires [[12240000]] as soon as a window is open. From level 16 [[12240000]] has no cooldown and fits into each window several times; as it then always comes first, the next shield skill only goes once the window has closed. [[12430000]] only works after a Dodge or in flight: use it when you dodge anyway.',
    },
    stack: [12240000, 12100000, 12350000, 12040000],
    usage: {
      de: 'Urteil, Schildhieb und Behütender Schlag stehen in 96–97 % der öffentlichen Templer-Builds; diese Kette spielen Xia, Leonis (Midgame) und NoBS (mit getauschter Mitte).',
      en: 'Judgment, Shield Smite and Warding Strike are in 96–97% of public Templar builds; Xia, Leonis (midgame) and NoBS Game Guides (middle two swapped) run this chain.',
    },
    evidence: [
      { id: 12240000, en: 'damage to a target within 4m and increases Enmity', de: 'Fügt beim Wirken einer Schildfähigkeit einem Ziel innerhalb von 4 m' },
      { id: 12100000, en: 'Triggers [Judgment] for 2s.', de: 'Aktiviert beim Wirken für 2s [Urteil] auf dem Ziel.' },
      { id: 12350000, en: 'Triggers [Judgment] for 2s.', de: 'Aktiviert beim Wirken für 2s [Urteil] auf dem Ziel.' },
      { id: 12430000, en: 'Triggers [Judgment] for 2s.', de: 'Aktiviert beim Wirken für 2s [Urteil] auf dem Ziel.' },
      { id: 12430000, en: 'after using [Dodge] or while flying', de: 'Stürmt bei Einsatz von [Notausweichen] oder im Flug' },
    ],
    sources: [
      { label: 'aion2vault – Templar overview', href: 'https://aion2vault.com/builds/templar/' },
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
    ],
  },
  {
    id: 'doom-shield-judgment',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12070000 }],
    payoff: [{ id: 12240000 }],
    window: 3,
    title: {
      de: '[[12070000]] öffnet [[12240000]] für 3 s',
      en: '[[12070000]] opens [[12240000]] for 3 s',
    },
    text: {
      de: '[[12070000]] aktiviert [[12240000]] beim Wirken für 3 s, länger als jede andere Schildfähigkeit. Xia nimmt es genau dafür: Ohne viel Abklingzeit-Verringerung öffnen die anderen Schildfähigkeiten [[12240000]] nicht oft genug.',
      en: "[[12070000]] activates [[12240000]] for 3 s when cast, longer than any other shield skill. That is Xia's reason to run it: without much cooldown reduction the other shield skills do not open [[12240000]] often enough.",
    },
    how: {
      de: 'Leonis legt [[12070000]] ganz unten in die [[12240000]]-Kette, damit es bei jeder Abklingzeit ein Fenster öffnet. Xia und NoBS lassen es auf einer eigenen Taste: Der Sprung über 20 m kann dich mitten in eine Boss-Mechanik werfen. Xia eröffnet mit [[12090000]], [[12450000]] und dann [[12070000]].',
      en: 'Leonis puts [[12070000]] at the bottom of the [[12240000]] chain so it opens a window on every cooldown. Xia and NoBS Game Guides keep it on a key of its own: the 20 m dash can throw you into a boss mechanic. Xia opens with [[12090000]], [[12450000]] and then [[12070000]].',
    },
    stack: [12070000, 12240000, 12100000, 12350000],
    usage: {
      de: 'Genau diese Kette: 41 % der öffentlichen Templer-Makros; Schild des Verderbens steckt in 54 % der Templer-Makros und 83 % der Builds.',
      en: 'This exact chain: 41% of public Templar macros; Doom Shield is in 54% of Templar macros and 83% of builds.',
    },
    evidence: [
      { id: 12070000, en: 'Triggers [Judgment] for 3s.', de: 'Aktiviert beim Wirken für 3s [Urteil] auf dem Ziel.' },
      { id: 12070000, en: 'Rushes to a target within 20m', de: 'Stürmt auf ein Ziel innerhalb von 20 m zu' },
      { id: 12240000, en: 'damage to a target within 4m and increases Enmity', de: 'Fügt beim Wirken einer Schildfähigkeit einem Ziel innerhalb von 4 m' },
    ],
    sources: [
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'aion2vault – best Templar builds', href: 'https://aion2vault.com/builds/templar/best/' },
    ],
  },
  {
    id: 'vicious-strike-warding-strike',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12010000, part: 12010040 }],
    payoff: [{ id: 12350000 }],
    title: {
      de: '[[12010000]] holt [[12350000]] schneller zurück',
      en: '[[12010000]] brings [[12350000]] back sooner',
    },
    text: {
      de: 'Mit der Stufe-12-Spezialisierung kürzt jeder Treffer von [[12010000]] die Abklingzeit von [[12350000]] um 2 s. [[12350000]] aktiviert [[12240000]] für 2 s und gibt dir Behütung (mehr PvE-Schadensresistenz). Mehr [[12350000]] heißt mehr [[12240000]]-Fenster und mehr Schutz.',
      en: "With its level 12 specialisation every hit of [[12010000]] cuts [[12350000]]'s cooldown by 2 s. [[12350000]] activates [[12240000]] for 2 s and grants Warding (more PvE Damage Tolerance). More [[12350000]] means more [[12240000]] windows and more protection.",
    },
    how: {
      de: 'Halt [[12010000]] auf der linken Maustaste, während du das Makro hältst. [[12350000]] gehört in die [[12240000]]-Kette. Nimm dort auch die Spezialisierung −5 s Abklingzeit, wie alle Vorbilder.',
      en: 'Hold [[12010000]] on the left mouse button while you hold the macro. [[12350000]] belongs in the [[12240000]] chain; take its −5 s cooldown specialisation too, as every creator does.',
    },
    usage: {
      de: 'Spezialisierung von Leonis, Xia, NoBS und den koreanischen Top-Spielern (PvE und PvP); Brutaler Schlag steht in 96 % der Builds.',
      en: 'Specialisation of Leonis, Xia, NoBS Game Guides and top Korean players (PvE and PvP); Vicious Strike is in 96% of builds.',
    },
    evidence: [
      { id: 12010000, part: 12010040, en: '-2s [Warding Strike] cooldown on hit', de: '[Behütender Schlag]-Abklingzeit −2s: Bei Treffer' },
      { id: 12350000, en: 'Triggers [Judgment] for 2s.', de: 'Aktiviert beim Wirken für 2s [Urteil] auf dem Ziel.' },
      { id: 12350000, en: 'grants Warding to the caster for 10s', de: 'gewährt dem Wirker [Behütung] für 10s' },
    ],
    sources: [
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'pummel-punishment-executor',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12040000, part: 12040040 }],
    payoff: [{ id: 12090000 }],
    title: {
      de: '[[12040000]] hält Vollstrecker oben',
      en: '[[12040000]] keeps Executor up',
    },
    text: {
      de: 'Mit der Stufe-12-Spezialisierung kürzt jeder Treffer der zweiten Folge von [[12040000]] (Vergeltungsschlag) die Abklingzeit von [[12090000]] um 1 s; ab Stufe 16 kommt Vergeltungsschlag ein weiteres Mal. [[12090000]] gibt dir 20 s Vollstrecker (mehr Präzision und Schadensverstärkung). Liegt die Abklingzeit so unter 20 s, fällt der Buff nie ab.',
      en: "With its level 12 specialisation every hit of [[12040000]]'s second step (Punishing Strike) cuts [[12090000]]'s cooldown by 1 s; from level 16 Punishing Strike comes one extra time. [[12090000]] grants Executor for 20 s (more Accuracy and Damage Boost). Once the cooldown drops below 20 s, the buff never falls off.",
    },
    how: {
      de: 'Lass [[12040000]] im Makro laufen und lade [[12090000]] von Hand. Leonis hat gemerkt, dass Vollstrecker nie mehr abfällt, sobald [[12040000]] die Abklingzeit unter 20 s drückt; seit er [[12040000]] wieder spielt, macht er etwa 4k mehr Schaden pro Sekunde. NoBS legt [[12040000]] oben in die [[12240000]]-Kette. Der koreanische Inven-Guide gibt ihm eine eigene Kette: Dann kommt [[12090000]] schneller zurück und der Schaden hängt weniger an [[12240000]].',
      en: 'Keep [[12040000]] in the macro and charge [[12090000]] by hand. Leonis found that Executor never drops once [[12040000]] pushes the cooldown under 20 s; putting [[12040000]] back into his rotation gained him about 4k damage per second. NoBS Game Guides puts [[12040000]] at the top of the [[12240000]] chain. The Korean Inven guide gives it a chain of its own, which brings [[12090000]] back faster and leans less on [[12240000]].',
    },
    usage: {
      de: 'Spezialisierung von Leonis, NoBS und den koreanischen Top-Spielern (PvE und PvP); Tobende Hiebe steht in 89 % der Builds.',
      en: 'Specialisation of Leonis, NoBS Game Guides and top Korean players (PvE and PvP); Pummel is in 89% of builds.',
    },
    evidence: [
      { id: 12040000, part: 12040040, en: '-1s [Punishment] cooldown on landing [Punishing Strike]', de: '[Bestrafung]-Abklingzeit −1s: Bei [Vergeltungsschlag]-Treffer' },
      { id: 12040000, part: 12040050, en: 'Activates [Punishing Strike] 1 extra time', de: 'Aktiviert [Vergeltungsschlag] 1 weiteres Mal' },
      { id: 12090000, en: 'grants the Executor effect to the caster for 20s', de: 'Gewährt dem Wirker für 20s [Vollstrecker].' },
    ],
    sources: [
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'Inven KR – Templar guide (빵호빵)', href: 'https://www.inven.co.kr/board/aion2/6438/25862' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'shield-of-protection-fury',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12110000 }],
    payoff: [{ id: 12780000 }, { id: 12720000 }],
    window: 20,
    status: 'Block',
    title: {
      de: '[[12110000]] löst [[12780000]] für die Gruppe aus',
      en: '[[12110000]] triggers [[12780000]] for the party',
    },
    text: {
      de: '[[12110000]] gewährt kurz garantierten Block: Was dich in diesem Moment trifft, wird geblockt. Bei jedem erfolgreichen Block gibt [[12780000]] dir und deiner Gruppe 20 s lang mehr PvE-Schadensverstärkung, und [[12720000]] heilt dich. Ein sicherer Block alle 20 s hält den Gruppenbuff oben.',
      en: '[[12110000]] guarantees Block for a moment: whatever hits you then is blocked. On every successful Block [[12780000]] gives you and your party more PvE Damage Boost for 20 s, and [[12720000]] heals you. One sure Block every 20 s keeps the party buff up.',
    },
    how: {
      de: 'Drück [[12110000]] von Hand wie eine Parade, kurz bevor ein großer Treffer kommt, oder halt es etwa 3 s, um mehrere Angriffe zu blocken (NoBS). Ohne eingehenden Treffer gibt es keinen Block und kein [[12780000]]. Ab Stigma-Stufe 5 kannst du es zweimal hintereinander wirken. Xia nimmt es in jeden Dungeon mit, weil nur so [[12780000]] sicher kommt; Leonis tauscht es ein, wenn ein Kampf riskant ist.',
      en: 'Press [[12110000]] by hand like a parry, right before a big hit lands, or hold it for about 3 s to block several attacks (NoBS Game Guides). Without an incoming hit there is no Block and no [[12780000]]. From stigma level 5 you can cast it twice in a row. Xia brings it to every dungeon because it is the only sure way to trigger [[12780000]]; Leonis swaps it in when a fight feels risky.',
    },
    usage: {
      de: 'Wachtschild: 37 % der öffentlichen Builds, 61 % der 153 Top-Templer (MetaBot), 52 % der Top-29 auf Global, 96,7 % der koreanischen Top-Spieler im PvE; Kampfrausch ist bei allen Quellen das erste Passiv.',
      en: 'Shield of Protection: 37% of public builds, 61% of the 153 top Templars (MetaBot), 52% of the top 29 Global Templars, 96.7% of top Korean players in PvE; every source levels Fury first.',
    },
    evidence: [
      { id: 12110000, en: 'Temporarily increases Block Damage Reduction by 100% and guarantees Block.', de: 'Erhöht für kurze Zeit die Block-Schadensreduktion um 100 % und gewährt garantierten Block.' },
      { id: 12110000, part: 12110010, en: '+1 consecutive use', de: 'Kann 1-mal zusätzlich hintereinander wirken' },
      { id: 12780000, en: 'for 20s for the caster and party members on Block', de: 'Erhöht bei erfolgreichem Block für 20s die PvE-Schadensverstärkung des Wirkers und der Gruppenmitglieder' },
      { id: 12720000, en: 'restores 351-421 HP on Block', de: 'stellt beim Blocken 351–421 LP wieder her' },
    ],
    sources: [
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
      { label: 'MetaBot.gg – top Templar players', href: 'https://metabot.gg/en/aion-2/classes/templar/build' },
    ],
  },
  {
    id: 'noble-armor-fury-roar',
    kind: 'buff',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12230000, part: 12230030 }],
    payoff: [{ id: 12780000 }, { id: 12770000 }],
    window: 300,
    title: {
      de: '[[12230000]] verstärkt [[12780000]] und [[12770000]]',
      en: '[[12230000]] boosts [[12780000]] and [[12770000]]',
    },
    text: {
      de: 'Solange [[12230000]] wirkt, sind [[12770000]] (ab Stigma-Stufe 10) und [[12780000]] (ab Stufe 15) 1,5-mal so stark. Der Buff hält 300 s, so lange wie die Abklingzeit, also praktisch immer.',
      en: 'While [[12230000]] lasts, [[12770000]] (from stigma level 10) and [[12780000]] (from level 15) are 1.5 times as strong. The buff lasts 300 s, as long as its cooldown, so it is up all the time.',
    },
    how: {
      de: 'Wirk [[12230000]] von Hand vor dem Pull. Bring es als erstes Stigma auf 15, wie Leonis, Xia und NoBS. Xia legt es in ihre zweite Kette, damit es nie ausläuft.',
      en: 'Cast [[12230000]] by hand before the pull. Make it your first stigma to reach 15, as Leonis, Xia and NoBS Game Guides do. Xia keeps it in her second chain so it never runs out.',
    },
    usage: {
      de: 'Edle Rüstung: 71 % der öffentlichen Builds, 93 % der Top-29 auf Global (aion2-meta); erstes Stigma auf 15 bei Leonis, Xia und NoBS.',
      en: 'Noble Armor: 71% of public builds, 93% of the top 29 Global Templars (aion2-meta); first stigma to 15 for Leonis, Xia and NoBS Game Guides.',
    },
    evidence: [
      { id: 12230000, part: 12230020, en: 'x1.5 [Insulting Roar] effect for the duration', de: '[Gebrüll der Verachtung]-Effekt ×1,5: Während Wirkungsdauer' },
      { id: 12230000, part: 12230030, en: 'x1.5 [Fury] effect for the duration', de: '[Kampfrausch]-Effekt ×1,5: Während Wirkungsdauer' },
      { id: 12230000, en: 'Increases Max HP by 9% for 300s', de: 'Erhöht für 300s die Max. LP des Wirkers um 9 %' },
    ],
    sources: [
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'aion2vault – best Templar builds', href: 'https://aion2vault.com/builds/templar/best/' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'doom-shield-annihilate-reset',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12070000, part: 12070010 }],
    payoff: [{ id: 12300000 }],
    status: 'Knockdown',
    title: {
      de: '[[12070000]] setzt [[12300000]] zurück',
      en: '[[12070000]] resets [[12300000]]',
    },
    text: {
      de: 'Ab Stigma-Stufe 5 setzt ein Treffer von [[12070000]] die Abklingzeit von [[12300000]] zurück. Zugleich wirft er NPCs ohne Handlungsunfähigkeits-Immunität sicher in Niederschlag (im Text „K. o.“), und genau den braucht [[12300000]]. So kommt ein zweiter [[12300000]] direkt nach dem ersten.',
      en: 'From stigma level 5 a hit of [[12070000]] resets the cooldown of [[12300000]]. It also always knocks down NPCs without Incapacitated Immunity, which is exactly what [[12300000]] needs. That gives you a second [[12300000]] right after the first.',
    },
    how: {
      de: 'Wirk erst [[12300000]], dann [[12070000]], dann sofort wieder [[12300000]]. Der koreanische Inven-Guide nennt das die stärkste Reihenfolge, im echten Kampf aber schwer zu timen. Bei Bossen landet der Niederschlag nicht: Dort macht der Reset [[12300000]] nur für seine nächste 5-%-Auslösung frei.',
      en: 'Cast [[12300000]] first, then [[12070000]], then [[12300000]] again right away. The Korean Inven guide calls this the strongest order but hard to time in a real fight. On bosses the Knockdown does not land: there the reset only frees [[12300000]] for its next 5% trigger.',
    },
    usage: {
      de: 'Schild des Verderbens: 83 % der öffentlichen Builds, 100 % der Top-29 auf Global (aion2-meta); Leonis, Xia und NoBS bringen ihn für diesen Reset auf Stufe 5.',
      en: 'Doom Shield: 83% of public builds, 100% of the top 29 Global Templars (aion2-meta); Leonis, Xia and NoBS Game Guides take it to level 5 for this reset.',
    },
    evidence: [
      { id: 12070000, part: 12070010, en: 'Resets [Annihilate] cooldown on hit', de: 'Abklingzeit von [Vernichtung] zurücksetzen: Bei Treffer' },
      { id: 12070000, en: '100% chance to inflict Knockdown on NPC targets.', de: 'Gegen NPCs beträgt die Trefferchance von K. o. 100 %.' },
      { id: 12070000, part: 12070040, en: '+25% Knockdown Chance', de: 'Niederschlagschance +25 %' },
      { id: 12300000, en: 'damage to a target afflicted with Stun or Knockdown within 4m', de: 'Fügt einem Ziel mit Betäubung oder Niederschlag innerhalb von 4 m' },
      { id: 12300000, en: 'Has a 5% chance to trigger when attacking a target with Incapacitated Immunity.', de: 'Wird bei Angriffen auf Ziele mit Handlungsunfähigkeits-Immunität mit 5 % Chance aktiviert.' },
    ],
    sources: [
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'Inven KR – Templar guide (빵호빵)', href: 'https://www.inven.co.kr/board/aion2/6438/25862' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'stun-annihilate',
    kind: 'enable',
    rating: 'strong',
    content: ['aoe', 'pvp'],
    setup: [
      { id: 12100000 },
      { id: 12070000 },
      { id: 12430000 },
      { id: 12310000 },
      { id: 12700000 },
      { id: 12130000, part: 12130050 },
      { id: 12220000, part: 12220010 },
      { id: 12270000, part: 12270010 },
    ],
    payoff: [{ id: 12300000 }],
    window: 3,
    status: 'Stun',
    title: {
      de: 'Betäubung oder Niederschlag öffnet [[12300000]]',
      en: 'Stun or Knockdown opens [[12300000]]',
    },
    text: {
      de: '[[12300000]] trifft nur Ziele mit Betäubung oder Niederschlag. [[12100000]], [[12430000]], [[12310000]] und [[12700000]] betäuben NPCs sicher, [[12070000]] wirft sie nieder. Bosse haben Handlungsunfähigkeits-Immunität: Dort kommt [[12300000]] nur über seine 5-%-Auslösung, nicht über diese Combo.',
      en: '[[12300000]] only hits targets with Stun or Knockdown. [[12100000]], [[12430000]], [[12310000]] and [[12700000]] always stun NPCs, and [[12070000]] knocks them down. Bosses have Incapacitated Immunity: there [[12300000]] only comes from its 5% trigger, not from this combo.',
    },
    how: {
      de: 'Leg [[12300000]] in eine zweite Kette, getrennt von [[12240000]]: Dann feuert das Makro es, sobald ein Ziel betäubt oder niedergeworfen ist. Die häufigste zweite Kette ist (von unten) [[12270000]], [[12300000]], [[12040000]]. Im PvP betäuben die Fähigkeiten nur mit Chance; koreanische PvP-Spieler nehmen dafür die 30-%-Betäubung von [[12270000]] und mehr Niederschlagschance für [[12300000]].',
      en: 'Put [[12300000]] in a second chain, apart from [[12240000]], so the macro fires it as soon as a target is stunned or knocked down. The most common second chain is (bottom first) [[12270000]], [[12300000]], [[12040000]]. In PvP the stuns only land by chance; Korean PvP players take the 30% Stun of [[12270000]] and more Knockdown Chance for [[12300000]].',
    },
    stack: [12270000, 12300000, 12040000],
    usage: {
      de: 'Genau diese Kette: 38 % der öffentlichen Templer-Makros; Vernichtung steht in 94 % der Builds.',
      en: 'This exact chain: 38% of public Templar macros; Annihilate is in 94% of builds.',
    },
    evidence: [
      { id: 12300000, en: 'damage to a target afflicted with Stun or Knockdown within 4m', de: 'Fügt einem Ziel mit Betäubung oder Niederschlag innerhalb von 4 m' },
      { id: 12100000, en: '100% chance to inflict Stun on NPC targets.', de: 'Gegen NPCs beträgt die Trefferchance von Betäubung 100 %.' },
      { id: 12310000, en: '100% chance to inflict Stun on NPC targets.', de: 'Gegen NPCs beträgt die Trefferchance von Betäubung 100 %.' },
      { id: 12070000, en: '100% chance to inflict Knockdown on NPC targets.', de: 'Gegen NPCs beträgt die Trefferchance von K. o. 100 %.' },
      { id: 12270000, part: 12270010, en: '30% chance to inflict Stun for 3s', de: 'Betäubung für 3s (30 % Chance)' },
      { id: 12300000, en: 'Has a 5% chance to trigger when attacking a target with Incapacitated Immunity.', de: 'Wird bei Angriffen auf Ziele mit Handlungsunfähigkeits-Immunität mit 5 % Chance aktiviert.' },
    ],
    sources: [
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2vault – Templar overview', href: 'https://aion2vault.com/builds/templar/' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'block-debilitating-smash',
    kind: 'enable',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 12110000 }, { id: 12100000, part: 12100030 }],
    payoff: [{ id: 12270000 }],
    status: 'Block',
    title: {
      de: 'Block öffnet [[12270000]]',
      en: 'A Block opens [[12270000]]',
    },
    text: {
      de: '[[12270000]] geht nur nach einem erfolgreichen Block. Das steht im deutschen Text, der englische bindet nur Gebrechlichkeit an den Block. [[12110000]] gewährt garantierten Block, wenn du währenddessen getroffen wirst, und [[12100000]] löst [[12270000]] mit seiner Stufe-8-Spezialisierung zu 50 % aus. Gebrechlichkeit senkt die Verteidigung um 25 %.',
      en: "[[12270000]] only works after a successful Block. The German text says so; the English one ties only Debilitate to the Block. [[12110000]] guarantees Block when you are hit while it is up, and [[12100000]]'s level 8 specialisation triggers [[12270000]] with a 50% chance. Debilitate lowers Defense by 25%.",
    },
    how: {
      de: 'Leg [[12270000]] ganz unten in die zweite Kette, darüber [[12300000]] und [[12040000]]: Dann feuert das Makro es, sobald ein Block es freigeschaltet hat. Mit der Stufe-16-Spezialisierung setzt jeder Block seine Abklingzeit zu 25 % zurück. Ob Bosse Verteidigung haben, ist umstritten: Leonis rechnet mit dem Debuff, Xia hat im Test keinen Unterschied gemessen.',
      en: 'Put [[12270000]] at the bottom of the second chain, with [[12300000]] and [[12040000]] above it, so the macro fires it whenever a Block has opened it. With its level 16 specialisation every Block has a 25% chance to reset its cooldown. Whether bosses have Defense is disputed: Leonis counts on the debuff, Xia measured no difference.',
    },
    stack: [12270000, 12300000, 12040000],
    usage: {
      de: 'Lähmender Schlag: 88 % der Builds, unten in der Kette von 38 % der Templer-Makros; die 50-%-Spezialisierung von Schildhieb empfehlen aion2vault und die koreanischen Top-Spieler.',
      en: "Debilitating Smash: 88% of builds, bottom of the chain in 38% of Templar macros; aion2vault and top Korean players pick Shield Smite's 50% specialisation.",
    },
    evidence: [
      { id: 12270000, en: 'inflicts Debilitate for 5s on Block', de: 'Fügt bei erfolgreichem Block bis zu 4 Gegnern innerhalb von 4 m' },
      { id: 12110000, en: 'and guarantees Block.', de: 'und gewährt garantierten Block.' },
      { id: 12100000, part: 12100030, en: '50% chance to trigger [Debilitating Smash] on hit', de: '[Lähmender Schlag]-Aktivierung (50 % Chance): Bei Treffer' },
      { id: 12270000, part: 12270050, en: '25% chance to reset cooldown on Block', de: 'Abklingzeit zurücksetzen (25 % Chance): Bei erfolgreichem Block' },
    ],
    sources: [
      { label: 'aion2vault – Templar overview', href: 'https://aion2vault.com/builds/templar/' },
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'stagger-flash-rampage',
    kind: 'enable',
    rating: 'situational',
    content: ['boss'],
    setup: [{ id: 12310000 }, { id: 12090000 }],
    payoff: [{ id: 12340000 }],
    status: 'Stagger',
    title: {
      de: 'Benommenheit öffnet [[12340000]]',
      en: 'Stagger opens [[12340000]]',
    },
    text: {
      de: '[[12340000]] trifft nur benommene Ziele. Benommen wird ein Gegner, wenn seine Benommen-Leiste voll ist. [[12310000]] füllt sie um 50 (ab Stigma-Stufe 10 um 100), [[12090000]] je nach Ladestufe um 20 bis 35.',
      en: '[[12340000]] only hits staggered targets. A target is staggered once its Stagger Gauge is full. [[12310000]] deals 50 Stagger Gauge Damage (100 from stigma level 10), [[12090000]] 20 to 35 depending on the charge level.',
    },
    how: {
      de: 'Leonis wirkt [[12090000]] und [[12310000]] zusammen und hat den Boss so fast sofort benommen. Der koreanische Inven-Guide legt [[12340000]] unter [[12040000]] auf dessen eigene Taste: Während der Benommenheit kommt es statt [[12040000]], sonst feuert [[12040000]] wie gewohnt. Leg es nicht unter [[12240000]]: Es hat keine Abklingzeit und würde dort während der Benommenheit jeden Druck nehmen. Koreanische Top-Spieler heben es für die Benommenheit des Bosses auf und nehmen −1 s auf alle Abklingzeiten pro Treffer.',
      en: 'Leonis casts [[12090000]] and [[12310000]] together and so has the boss staggered almost at once. The Korean Inven guide stacks [[12340000]] below [[12040000]] on its own key: during a stagger it fires instead of [[12040000]], otherwise [[12040000]] fires as usual. Do not put it below [[12240000]]: it has no cooldown and would take every press there during the stagger. Korean top players save it for the boss stagger and take −1 s on all cooldowns per hit.',
    },
    stack: [12340000, 12040000],
    usage: {
      de: 'Lichtraserei: 53 % der öffentlichen Builds, 88 % der 153 Top-Templer (MetaBot); 62 % der Top-Templer auf Global lassen sie unter Stufe 8, Leonis hat sie gestrichen.',
      en: 'Flash Rampage: 53% of public builds, 88% of the 153 top Templars (MetaBot); 62% of the top Global Templars leave it below level 8, and Leonis dropped it.',
    },
    evidence: [
      { id: 12340000, en: 'damage to a target afflicted with Stagger within 4m', de: 'Fügt einem benommenen Ziel innerhalb von 4 m' },
      { id: 12310000, en: '50 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 50' },
      { id: 12310000, part: 12310020, en: '+50 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) +50' },
      { id: 12090000, en: '20-35 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 20–35' },
      { id: 12340000, part: 12340050, en: '-1s all cooldowns on hit', de: 'Abklingzeit (Alle Fäh.) −1s: Bei Treffer' },
    ],
    sources: [
      { label: 'aion2vault – Templar PvE build', href: 'https://aion2vault.com/builds/templar/pve/' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
      { label: 'Inven KR – Templar guide (빵호빵)', href: 'https://www.inven.co.kr/board/aion2/6438/25862' },
    ],
  },
  {
    id: 'stun-executing-blade',
    kind: 'status',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [{ id: 12100000 }, { id: 12310000 }, { id: 12430000 }, { id: 12700000 }],
    payoff: [{ id: 12410000 }, { id: 12240000, part: 12240020 }],
    window: 3,
    status: 'Stun',
    title: {
      de: 'Betäubung verstärkt [[12410000]]',
      en: 'Stun boosts [[12410000]]',
    },
    text: {
      de: '[[12410000]] macht 20 % mehr Schaden gegen Ziele mit Schock, ab Stigma-Stufe 20 noch 30 % mehr. Betäubung zählt dazu (aion2vault: betäubte oder niedergeworfene Ziele). Auch [[12240000]] macht mit seiner Stufe-8-Spezialisierung Zusatzschaden gegen solche Ziele. [[12100000]] betäubt NPCs sicher und öffnet zugleich [[12240000]].',
      en: '[[12410000]] deals 20% more damage to targets with an Impact-type status, and 30% more from stigma level 20. Stun counts as one (aion2vault: stunned or knocked-down targets). With its level 8 specialisation [[12240000]] also deals extra damage to such targets. [[12100000]] always stuns NPCs and opens [[12240000]] at the same time.',
    },
    how: {
      de: 'Wirk [[12410000]] von Hand in die 3 s Betäubung nach [[12100000]] oder [[12310000]]; auch Leonis hält es aus dem Makro. Gegen Bosse greift der Bonus nicht, weil sie nicht betäubt werden. Bei [[12240000]] nehmen fast alle trotzdem den einfachen Zusatzschaden.',
      en: 'Cast [[12410000]] by hand into the 3 s Stun after [[12100000]] or [[12310000]]; Leonis keeps it out of the macro too. Against bosses the bonus does not apply because they cannot be stunned. On [[12240000]] almost everyone still takes the plain extra damage.',
    },
    usage: {
      de: 'Schwert der Hinrichtung: 15 % der öffentlichen Builds (Leonis im Midgame), 53 % der koreanischen Top-Spieler im PvP.',
      en: "Executing Blade: 15% of public builds (Leonis' midgame build), 53% of top Korean players in PvP.",
    },
    evidence: [
      { id: 12410000, en: 'Deals 20% more damage on attacking a target inflicted with Impact-type status.', de: 'Erhöht den Schaden bei Angriffen auf Ziele mit Schock um 20 %.' },
      { id: 12410000, part: 12410040, en: '+30% damage on attacking a target inflicted with Impact-type status', de: '+30 % Schaden beim Angriff auf ein Ziel mit Schock' },
      { id: 12240000, part: 12240020, en: 'Deals extra damage on attacking a target afflicted with Impact-type status', de: 'Zusatzschaden bei Angriffen auf Ziele mit Schock' },
      { id: 12100000, en: 'Has a 60% chance to inflict Stun on the target for 3s.', de: 'Versetzt das Ziel mit 60 % Chance für 3s in Betäubung.' },
    ],
    sources: [
      { label: 'aion2vault – best Templar builds', href: 'https://aion2vault.com/builds/templar/best/' },
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'second-skin-ironclad',
    kind: 'buff',
    rating: 'situational',
    content: ['boss', 'pvp'],
    setup: [{ id: 12190000, part: 12190030 }],
    payoff: [{ id: 12740000 }],
    title: {
      de: '[[12190000]] verstärkt [[12740000]]',
      en: '[[12190000]] boosts [[12740000]]',
    },
    text: {
      de: 'Ab Stigma-Stufe 15 ist [[12740000]] während [[12190000]] 1,5-mal so stark: mehr Verteidigung und Eisenwall, zusätzlich zur Schadensresistenz von [[12190000]].',
      en: "From stigma level 15 [[12740000]] is 1.5 times as strong while [[12190000]] lasts: more Defense and Endurance on top of [[12190000]]'s Damage Tolerance.",
    },
    how: {
      de: 'Wirk [[12190000]] von Hand vor einer harten Phase oder einem großen Treffer. Effekte, die Abklingzeiten erhöhen, wirken nicht darauf.',
      en: 'Cast [[12190000]] by hand before a hard phase or a big hit. Effects that increase cooldowns do not touch it.',
    },
    usage: {
      de: 'Doppelpanzer: 5 % der öffentlichen Builds, 79 % der koreanischen Top-Spieler im PvP.',
      en: 'Second Skin: 5% of public builds, 79% of top Korean players in PvP.',
    },
    evidence: [
      { id: 12190000, part: 12190030, en: 'x1.5 [Ironclad Defense] effect for the duration', de: '[Eiserne Verteidigung]-Effekt ×1,5: Während Wirkungsdauer' },
      { id: 12740000, en: 'Defense by 25% and Endurance by 10%', de: 'die Verteidigung um 25 % und den Eisenwall um 10 %' },
    ],
    sources: [
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
      { label: 'aion2vault – Templar overview', href: 'https://aion2vault.com/builds/templar/' },
    ],
  },
  {
    id: 'armor-of-balance-warding-shield',
    kind: 'buff',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 12200000, part: 12200030 }],
    payoff: [{ id: 12720000 }],
    title: {
      de: '[[12200000]] verstärkt [[12720000]]',
      en: '[[12200000]] boosts [[12720000]]',
    },
    text: {
      de: 'Ab Stigma-Stufe 15 ist [[12720000]] während [[12200000]] 1,5-mal so stark: mehr Block und mehr Heilung bei jedem Block. Dazu kommt der höhere Widerstand gegen Schock.',
      en: 'From stigma level 15 [[12720000]] is 1.5 times as strong while [[12200000]] lasts: more Block and more healing on every Block, on top of the higher Impact-type Resist.',
    },
    how: {
      de: 'Wirk [[12200000]] von Hand, wenn viele Betäubungen auf dich zukommen, vor allem im PvP. Mehr Block heißt auch öfter [[12780000]] für die Gruppe.',
      en: 'Cast [[12200000]] by hand when a lot of stuns are coming your way, above all in PvP. More Block also means more [[12780000]] for the party.',
    },
    usage: {
      de: 'Rüstung des Gleichgewichts: 1 % der öffentlichen Builds, 72 % der koreanischen Top-Spieler im PvP.',
      en: 'Armor of Balance: 1% of public builds, 72% of top Korean players in PvP.',
    },
    evidence: [
      { id: 12200000, part: 12200030, en: 'x1.5 [Warding Shield] effect for the duration', de: '[Behütungsschild]-Effekt x1,5 für die Dauer' },
      { id: 12720000, en: 'Block by 200 and restores', de: 'Erhöht Block des Wirkers um 200' },
    ],
    sources: [
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
  {
    id: 'comrade-in-arms-seal-block-pain',
    kind: 'buff',
    rating: 'situational',
    content: ['boss', 'pvp'],
    setup: [{ id: 12250000, part: 12250020 }],
    payoff: [{ id: 12750000 }, { id: 12800000 }],
    window: 6,
    title: {
      de: '[[12250000]] verstärkt [[12750000]] und [[12800000]]',
      en: '[[12250000]] boosts [[12750000]] and [[12800000]]',
    },
    text: {
      de: 'Während [[12250000]] übernimmst du einen Teil des Schadens deiner Gruppe. In diesen 6 s sind der Schild von [[12750000]] (ab Stigma-Stufe 10) und [[12800000]] (ab Stufe 15) 1,5-mal so stark. [[12750000]] springt an, sobald deine LP auf 50 % fallen.',
      en: "While [[12250000]] lasts you take part of your party's damage. For those 6 s the shield of [[12750000]] (from stigma level 10) and [[12800000]] (from level 15) are 1.5 times as strong. [[12750000]] kicks in once your HP drop to 50%.",
    },
    how: {
      de: 'Heb [[12250000]] für einen gruppenweiten Treffer auf und wirk es von Hand. Weil du mehr Schaden nimmst, kann [[12750000]] genau in diesem Fenster anspringen.',
      en: 'Save [[12250000]] for a party-wide hit and cast it by hand. Because you take more damage, [[12750000]] may kick in right inside this window.',
    },
    usage: {
      de: 'Kameradenschutz: 4 % der öffentlichen Builds, 88 % der koreanischen Top-Spieler im PvP; Teil von Xias 5v5-Build.',
      en: "Comrade in Arms: 4% of public builds, 88% of top Korean players in PvP; part of Xia's 5v5 build.",
    },
    evidence: [
      { id: 12250000, part: 12250020, en: 'x1.5 [Guarding Seal] Protective Shield effect for the duration', de: '[Schutzsiegel]-Schutzschild-Effekt ×1,5: Während Wirkungsdauer' },
      { id: 12250000, part: 12250030, en: 'x1.5 [Block Pain] effect for the duration', de: '[Schmerzblockade]-Effekt ×1,5: Während Wirkungsdauer' },
      { id: 12750000, en: 'when HP is 50% or less', de: 'bei 50 % LP oder weniger' },
    ],
    sources: [
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
      { label: 'aion2vault – best Templar builds', href: 'https://aion2vault.com/builds/templar/best/' },
    ],
  },
  {
    id: 'poach-status-resist-cut',
    kind: 'debuff',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 12130000, part: 12130020 }],
    payoff: [{ id: 12100000 }, { id: 12070000 }, { id: 12310000 }],
    window: 5,
    title: {
      de: '[[12130000]] senkt den Widerstand gegen deine Betäubung',
      en: '[[12130000]] lowers resistance to your stuns',
    },
    text: {
      de: 'Mit seiner Stufe-8-Spezialisierung senkt ein Treffer von [[12130000]] den Widerstand des Ziels gegen Statuseffekte 5 s lang um 20 %. Gegen Spieler betäubt [[12100000]] nur mit 60 % Chance, [[12310000]] mit 50 %, und [[12070000]] wirft mit 75 % nieder. Mit weniger Widerstand landen sie öfter, und damit öffnen sie öfter [[12300000]].',
      en: "With its level 8 specialisation a hit of [[12130000]] lowers the target's Status Effect Resist by 20% for 5 s. Against players [[12100000]] stuns only with a 60% chance, [[12310000]] with 50%, and [[12070000]] knocks down with 75%. With less resist they land more often, and so open [[12300000]] more often.",
    },
    how: {
      de: 'Eröffne gegen einen Spieler mit [[12130000]], das ihn vor dich zieht. Setz in den 5 s sofort [[12100000]] oder [[12070000]] nach und dann [[12300000]]. Gegen NPCs bringt die Spezialisierung nichts: Dort betäuben deine Fähigkeiten ohnehin sicher.',
      en: 'Open on a player with [[12130000]], which pulls them in front of you. Follow at once with [[12100000]] or [[12070000]] inside the 5 s, then [[12300000]]. Against NPCs the specialisation adds nothing: your skills stun them for sure anyway.',
    },
    usage: {
      de: 'PvP-Spezialisierung der koreanischen Top-Spieler (aion2-meta, 950 Templer), zusammen mit dem Reset beim Besiegen eines Gegners; im PvE nehmen sie stattdessen die Annäherung an immune Ziele.',
      en: 'PvP specialisation of top Korean Templars (aion2-meta, 950 players), together with the reset on a kill; in PvE they take the move to immune targets instead.',
    },
    evidence: [
      { id: 12130000, part: 12130020, en: 'Status Effect Resist for 5s on hit', de: 'Widerstand gegen Statuseffekte für 5s' },
      { id: 12130000, en: 'pulls them in front of the caster', de: 'zieht es vor den Wirker' },
      { id: 12100000, en: 'Has a 60% chance to inflict Stun on the target for 3s.', de: 'Versetzt das Ziel mit 60 % Chance für 3s in Betäubung.' },
      { id: 12310000, en: 'Has a 50% chance to inflict Stun for 3s.', de: 'versetzt sie mit 50 % Chance für 3s in Betäubung' },
      { id: 12070000, en: 'Has a 75% chance to inflict Knockdown for 3s.', de: 'versetzt es mit 75 % Chance für 3s in K. o.' },
    ],
    sources: [
      { label: 'aion2-meta – Templar', href: 'https://aion2-meta.com/guides/templar/' },
    ],
  },
];
