import type { CuratedCombo } from './types';

/**
 * Gladiator combos, checked by hand against the Global client texts in both languages (public/data/en|de/skills.json;
 * actives at skill level 10, stigmas at stigma level 10). Every link below is written in a skill text or one of its
 * specialisations. Where English and German disagree, the stricter reading is used and named in the combo:
 * Ankle Slice only works after a successful Block ("Fügt bei erfolgreichem Block ... zu"; the English text ties the
 * Block to the Root only; Fextralife calls it a Block follow-up and the KR Inven guide a gap closer "on block"), Rush
 * Strike only after a Dodge or in flight ("Bewegt sich bei Einsatz von [Notausweichen] oder im Flug"), and Focused
 * Block's Parry counts as a Block: the German text calls it a weapon block ("Waffenblock") and pays its refund "bei
 * erfolgreichem Block", the Korean client names the skill a block (집중 막기) and Experienced Counterstrike / Ankle Slice
 * trigger "on block" (막기 시); aion2vault, Fextralife and the KR Inven guide all say the parry triggers Experienced
 * Counterstrike. That it also opens Ankle Slice is inferred from the same wording, no guide shows it. The English
 * "Critical Hit on hit" (Overhead Slam Lv 12, Rage Burst Lv 15) is a guaranteed crit in German ("Trifft garantiert").
 * Knockdown and Airborne do not land on bosses (Incapacitated Immunity), so the Knockdown combo leaves out `boss`;
 * the boss routes are Rage Burst and the 7% / 5% triggers against immune targets. Destructive Impulse is only paired
 * with Stagger: the texts do not say whether Knockdown counts as an Impact-type status.
 * Shares: aion2vault (public Global builds and 3,169 public macros on questlog.gg, read 2026-10-11 and 2026-10-14),
 * MetaBot (151 top Gladiators, 2026-10-03) and aion2-meta (top Korean players and the top 89 Global Gladiators).
 * Play advice from Grobs and Ulfhednar (via aion2vault), aion2-guides.info, Fextralife and the Korean Inven guides,
 * paraphrased.
 * Left out on purpose: plain damage buffs and debuffs (Prepare for Battle, Zikel's Blessing's Attack, Blade Toss's
 * Defense cut, Wounded), Status Effect Chance boosters paired with Knockdown skills, Crushing Wave's reset on its own
 * crits, Sword Aura Rampage's cut to all cooldowns as a combo of its own, and Rending Blow's "+200 Block while using
 * skill", which only raises the Block chance instead of producing a Block. The two other common macro steps,
 * Lunge Stance → Zikel's Blessing (23% of public Gladiator macros) and Ruinous Blow → Lifestealing Blade (21%), are no
 * combos: no skill text links the two skills, they only share a key. They are named in the usage of the Lunge Stance
 * and Keen Strike combos. Destructive Impulse on knocked-down targets stays out too: aion2-guides counts Knockdown as an
 * Impact-type status, other wikis list Knockdown apart from it, and no skill text settles it.
 */

const VAULT_MACROS = { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' };
const VAULT_PVE = { label: 'aion2vault – Gladiator PvE build', href: 'https://aion2vault.com/builds/gladiator/pve/' };
const VAULT_BEST = { label: 'aion2vault – best Gladiator builds', href: 'https://aion2vault.com/builds/gladiator/best/' };
const FEXTRA = { label: 'Fextralife – Gladiator', href: 'https://aion2.wiki.fextralife.com/Gladiator' };
const FEXTRA_BUILDS = { label: 'Fextralife – Gladiator builds', href: 'https://aion2.wiki.fextralife.com/Gladiator_Builds' };
const META = { label: 'aion2-meta – Gladiator guide', href: 'https://aion2-meta.com/guides/gladiator/' };
const GUIDES = { label: 'aion2-guides.info – Gladiator', href: 'https://couga54.github.io/aion2-guides/en/gladiator/' };
const METABOT = { label: 'MetaBot – Gladiator', href: 'https://metabot.gg/en/aion-2/classes/gladiator' };
const INVEN_GUIDE = { label: 'Inven KR – 검성 PvE guide (전쟁속의고아)', href: 'https://www.inven.co.kr/board/aion2/6448/16354' };
const INVEN_MACRO = { label: 'Inven KR – 검성 macro post (빵호빵)', href: 'https://www.inven.co.kr/board/aion2/6448/31551' };

export const combos: CuratedCombo[] = [
  {
    id: 'rage-burst-overhead-slam',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 11390000 }],
    payoff: [{ id: 11170000 }],
    window: 10,
    title: {
      de: '[[11390000]] öffnet [[11170000]] für 10 s',
      en: '[[11390000]] opens [[11170000]] for 10 s',
    },
    text: {
      de: '[[11170000]] braucht sonst ein Ziel mit Niederschlag oder einen zufälligen Auslöser am Boss. [[11390000]] aktiviert ihn bei Treffer für 10 s, laut englischem Text auf dem getroffenen Ziel. Das klappt auch bei Bossen, die nie umfallen. Dazu bekommst du für dieselben 10 s +10 % PvE-Schadensverstärkung.',
      en: '[[11170000]] otherwise needs a knocked-down target or a lucky trigger on a boss. [[11390000]] activates it for 10 s on hit, on the target it hit according to the English text. That works on bosses too, which never fall. You also get +10% PvE Damage Boost for the same 10 s.',
    },
    how: {
      de: 'Leg [[11390000]] ganz unten in eine Kette, darüber [[11170000]] und oben [[11010000]] als Füller. Das Makro wirkt [[11390000]], sobald es bereit ist, dann [[11170000]], solange das Fenster offen ist, sonst [[11010000]]. Steht [[11390000]] über [[11170000]], kommt es kaum noch dran: [[11170000]] ist fast immer bereit, und der untere Platz gewinnt (aion2-guides). [[11010000]] muss nach oben, sonst feuert es als Füller ohne Abklingzeit jedes Mal zuerst. Ab Stufe 16 nimmst du [[11170000]] die Abklingzeit, dann passt er viele Male ins Fenster. Stigma-Stufe 5 senkt die Abklingzeit von [[11390000]] von 45 auf 30 s.',
      en: 'Put [[11390000]] at the bottom of one chain, [[11170000]] above it and [[11010000]] on top as filler. The macro casts [[11390000]] whenever it is ready, [[11170000]] while the window is open and [[11010000]] otherwise. With [[11390000]] above [[11170000]] it hardly ever fires: [[11170000]] is usable most of the time, and the lower slot always wins (aion2-guides). [[11010000]] has to go on top, because a no-cooldown filler lower down fires first every time. The level-16 specialisation removes the cooldown of [[11170000]], so it fits into the window many times. Stigma level 5 cuts the cooldown of [[11390000]] from 45 to 30 s.',
    },
    stack: [11390000, 11170000, 11010000],
    usage: {
      de: 'Genau diese Kette (Furorausbruch → Abwärtsschlag → Zerreißender Schlag) steht in 56 % der öffentlichen Gladiator-Makros, Furorausbruch allein in 94 %. Es ist auch Grobs’ Makro, das meistgelikte Gladiator-Makro auf questlog.gg.',
      en: 'This exact chain (Rage Burst → Overhead Slam → Rending Blow) is in 56% of public Gladiator macros, Rage Burst alone in 94%. It is also Grobs’ macro, the most-liked Gladiator macro on questlog.gg.',
    },
    evidence: [
      { id: 11390000, en: 'Triggers [Overhead Slam] on the target for 10s on hit', de: 'Aktiviert bei Treffer [Abwärtsschlag] für 10s' },
      { id: 11390000, en: "increases the caster's PvE Damage Boost by 10%", de: 'erhöht die PvE-Schadensverstärkung des Wirkers um 10 %' },
      { id: 11170000, en: 'to a target afflicted with Knockdown within 4m', de: 'einem Ziel mit Niederschlag innerhalb von 4 m' },
      { id: 11170000, part: 11170050, en: 'Remove cooldown', de: 'Abklingzeit entfernt' },
      { id: 11390000, part: 11390010, en: '-15s [Rage Burst] cooldown', de: '[Furorausbruch]-Abklingzeit −15 Sek.' },
    ],
    sources: [VAULT_MACROS, VAULT_PVE, GUIDES, FEXTRA],
  },
  {
    id: 'lunge-stance-crits-rage-burst',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 11400000, part: 11400040 }],
    payoff: [{ id: 11390000 }],
    window: 20,
    title: {
      de: 'Krits unter [[11400000]] holen [[11390000]] zurück',
      en: 'Crits under [[11400000]] bring [[11390000]] back',
    },
    text: {
      de: 'Ab Stigma-Stufe 20 senkt jeder Kritische Treffer während [[11400000]] mit 50 % Chance alle Abklingzeiten um 1 s. [[11170000]] (Spezialisierung Stufe 12) und [[11390000]] (Stigma-Stufe 15) treffen garantiert kritisch. So kommt [[11390000]] schneller zurück und hält [[11170000]] fast dauerhaft offen. Ab Stigma-Stufe 15 macht [[11400000]] außerdem [[11740000]] 1,5-mal so stark: noch mehr Krits.',
      en: 'From stigma level 20, every Critical Hit during [[11400000]] has a 50% chance to cut all cooldowns by 1 s. [[11170000]] (level-12 specialisation) and [[11390000]] (stigma level 15) always crit. That brings [[11390000]] back sooner and keeps [[11170000]] open almost all the time. From stigma level 15 [[11400000]] also makes [[11740000]] 1.5 times as strong: even more crits.',
    },
    how: {
      de: 'Bring [[11400000]] zuerst auf Stigma-Stufe 20 (Grobs). Gib [[11170000]] die Spezialisierung mit dem garantierten Kritischen Treffer. Wirk [[11400000]] vor dem Burst von Hand (Grobs’ Rat für Season 1) oder leg [[11400000]] → [[11250000]] als eigenen Schritt ins Makro. Halt dann das Makro mit [[11390000]] → [[11170000]] → [[11010000]]: Jeder Krit kann die Abklingzeit von [[11390000]] verkürzen. [[11260000]] ist davon ausgenommen.',
      en: 'Take [[11400000]] to stigma level 20 first (Grobs). Give [[11170000]] the specialisation that always crits. Cast [[11400000]] by hand before the burst (Grobs’ advice for Season 1) or give [[11400000]] → [[11250000]] a macro step of its own. Then hold the macro with [[11390000]] → [[11170000]] → [[11010000]]: every crit can shorten the cooldown of [[11390000]]. [[11260000]] is not affected.',
    },
    stack: [11390000, 11170000, 11010000],
    usage: {
      de: 'Angriffsstellung steht in 93 % der öffentlichen Skillleisten und bei 91 % der Top-Spieler (MetaBot). Grobs bringt sie auf 20 und meldet danach fast dauerhaftes Furorausbruch; Anfang Oktober lagen die globalen Top-Spieler im Schnitt erst bei Stufe 7,5, in Korea haben sie 92 % der Ranker auf 20 (cielui). Der KR-Guide auf Inven nennt genau dieses Zusammenspiel den Kern des Gladiator-Schadens. 23 % der öffentlichen Makros haben Angriffsstellung → Zikels Segen als eigenen Schritt.',
      en: 'Lunge Stance is on 93% of public skill bars and with 91% of top players (MetaBot). Grobs takes it to 20 and reports near-permanent Rage Burst after that; in early October global top players averaged only level 7.5, while 92% of KR rankers have it at 20 (cielui). The KR Inven guide calls exactly this interplay the core of Gladiator damage. 23% of public macros have Lunge Stance → Zikel’s Blessing as a step of its own.',
    },
    evidence: [
      { id: 11400000, part: 11400040, en: '50% chance to reduce all skill cooldowns by 1s on Critical Hit for the duration', de: 'Abklingzeit (Alle Fäh.) −1 Sek. (50 % Chance): Bei Kritischer Treffer (Während der Wirkungsdauer)' },
      { id: 11170000, part: 11170040, en: 'Critical Hit on hit', de: 'Trifft garantiert als Kritischer Treffer' },
      { id: 11390000, part: 11390030, en: 'Critical Hit on hit', de: 'Trifft garantiert als Kritischer Treffer' },
      { id: 11400000, part: 11400030, en: 'x1.5 [Identify Weakness] effect for the duration', de: '[Schwächenanalyse]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 11260000, en: 'Unaffected by cooldown reduction effects', de: 'Wird nicht von Effekten zur Verringerung der Abklingzeit beeinflusst' },
    ],
    sources: [VAULT_BEST, VAULT_PVE, VAULT_MACROS, GUIDES, INVEN_GUIDE],
  },
  {
    id: 'immune-boss-overhead-slam',
    kind: 'proc',
    rating: 'core',
    content: ['boss'],
    setup: [{ id: 11010000 }, { id: 11020000 }],
    payoff: [{ id: 11170000 }, { id: 11300000 }],
    title: {
      de: 'Treffer auf Bosse lösen [[11170000]] aus',
      en: 'Hits on bosses trigger [[11170000]]',
    },
    text: {
      de: 'Die meisten Bosse haben Handlungsunfähigkeits-Immunität und fallen nicht um. Dafür wird [[11170000]] bei jedem Angriff auf so ein Ziel mit 7 % Chance aktiviert, [[11300000]] mit 5 %. Je öfter du triffst, desto öfter kommt [[11170000]]. Die meisten Treffer liefern [[11010000]] und [[11020000]], beide ohne Abklingzeit.',
      en: 'Most bosses have Incapacitated Immunity and never fall. Instead, every attack on such a target has a 7% chance to activate [[11170000]] and a 5% chance for [[11300000]]. The more often you hit, the more often [[11170000]] comes up. [[11010000]] and [[11020000]] deliver the most hits, both without a cooldown.',
    },
    how: {
      de: 'Leg [[11170000]] unter [[11010000]] auf eine Taste und mach sie zur Makro-Zeile. Halt dazu [[11020000]] auf der linken Maustaste. Dann feuert [[11170000]], sobald ein Treffer ihn freischaltet; in der Standardkette [[11390000]] → [[11170000]] → [[11010000]] passiert das von selbst. Mit der Spezialisierung ohne Abklingzeit (Stufe 16) kann jeder Auslöser sofort zu einem [[11170000]] werden. aLuckyRO nimmt [[11300000]] am Boss mit +100 % Schaden gegen immune Ziele (Spezialisierung Stufe 8), Grobs und Arthars lassen ihn weg. Wenn du ihn nimmst, gib ihm eine eigene Taste, nicht die Hauptkette (aion2-guides).',
      en: 'Stack [[11170000]] below [[11010000]] on one key and make it the macro line; hold [[11020000]] on left click at the same time. [[11170000]] then fires the moment a hit activates it; the standard chain [[11390000]] → [[11170000]] → [[11010000]] does this on its own. With the no-cooldown specialisation (level 16) every trigger can turn into an [[11170000]] at once. aLuckyRO takes [[11300000]] on bosses with +100% damage against immune targets (level-8 specialisation), Grobs and Arthars leave it out. If you take it, give it a key of its own, not the main chain (aion2-guides).',
    },
    stack: [11170000, 11010000],
    usage: {
      de: 'Abwärtsschlag und Zerreißender Schlag stehen in 97 % der öffentlichen Skillleisten. aion2-meta baut das KR-Makro genau so: Abwärtsschlag unter Zerreißender Schlag, Scharfer Schlag auf Linksklick.',
      en: 'Overhead Slam and Rending Blow are on 97% of public skill bars. aion2-meta builds the KR macro exactly like this: Overhead Slam below Rending Blow, Keen Strike on left click.',
    },
    evidence: [
      { id: 11170000, en: 'Has a 7% chance to trigger when attacking a target with Incapacitated Immunity', de: 'Wird mit 7 % Chance bei Angriffen auf ein Ziel mit Handlungsunfähigkeits-Immunität aktiviert' },
      { id: 11300000, en: 'Has a 5% chance to trigger on attacking a target with Incapacitated Immunity', de: 'Wird mit 5 % Chance bei Angriffen auf ein Ziel mit Handlungsunfähigkeits-Immunität aktiviert' },
      { id: 11300000, part: 11300030, en: '+100% damage to targets with Incapacitated Immunity', de: 'Schaden (Ziel mit Handlungsunfähigkeits-Immunität) +100 %: Bei Angriff' },
      { id: 11170000, part: 11170050, en: 'Remove cooldown', de: 'Abklingzeit entfernt' },
    ],
    sources: [META, GUIDES, FEXTRA, FEXTRA_BUILDS],
  },
  {
    id: 'focused-block-counterstrike',
    kind: 'proc',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 11110000 }],
    payoff: [{ id: 11780000 }, { id: 11720000 }],
    window: 20,
    status: 'Block',
    title: {
      de: '[[11110000]] löst [[11780000]] aus',
      en: '[[11110000]] triggers [[11780000]]',
    },
    text: {
      de: '[[11110000]] führt garantiert einen Waffenblock aus, und der deutsche Text zählt ihn als erfolgreichen Block. Bei erfolgreichem Block gibt [[11780000]] dir und deiner Gruppe 20 s lang +9 % PvE-Schadensverstärkung, und [[11720000]] heilt dich. Der englische Text sagt hier „Parry“, gemeint ist derselbe Block.',
      en: '[[11110000]] guarantees a Parry, which the German text calls a weapon block and counts as a successful Block. On Block, [[11780000]] gives you and your party +9% PvE Damage Boost for 20 s, and [[11720000]] heals you. The English text says "Parry" here and "Block" on the passives; it is the same event.',
    },
    how: {
      de: 'Lass [[11110000]] aus dem Makro. Wirk es von Hand gegen einen angekündigten Boss-Treffer, am besten gleich gegen den ersten (Grobs). Stigma-Stufe 5 gibt dir eine zweite Ladung. Bleib vor dem Boss, denn [[11780000]] verstärkt auch Frontalangriffe. Mit einem Templer in der Gruppe stapelt der Gruppenbuff nicht mit dessen Kampfrausch.',
      en: 'Keep [[11110000]] out of the macro. Cast it by hand against a telegraphed boss hit, ideally the very first one (Grobs). Stigma level 5 adds a second charge. Stay in front of the boss, because [[11780000]] also boosts front attacks. With a Templar in the group the party buff does not stack with his Fury.',
    },
    usage: {
      de: 'Fokussierter Block: 55 % der öffentlichen Builds, 62 % der Top-Spieler (MetaBot), 84 % der globalen Top 89 (aion2-meta); fast alle lassen ihn aus dem Makro. Erfahrener Konterangriff ist der Passiv-Skill, den KR-Ranker am häufigsten auf ihrer Ausrüstung suchen (73 % der Teile).',
      en: 'Focused Block: 55% of public builds, 62% of top players (MetaBot), 84% of the global top 89 (aion2-meta); almost everyone keeps it out of the macro. Experienced Counterstrike is the passive KR rankers look for most on their gear (73% of pieces).',
    },
    evidence: [
      { id: 11110000, en: 'Temporarily increases Block Damage Reduction by 100% and guarantees Parry', de: 'führt garantiert einen Waffenblock aus. Regeneriert bei erfolgreichem Block' },
      { id: 11780000, en: 'for 20s for the caster and party members on Block', de: 'Erhöht bei erfolgreichem Block für 20s beim Wirker und bei Gruppenmitgliedern' },
      { id: 11780000, en: "does not stack with Templar's [Fury] effect", de: 'nicht mit dem Effekt [Kampfrausch] des Templers stapelbar' },
      { id: 11720000, en: 'HP on Block. Cooldown: 1s', de: 'regeneriert bei erfolgreichem Block' },
      { id: 11110000, part: 11110010, en: '+1 consecutive use', de: 'Folge-Einsatz +1' },
    ],
    sources: [VAULT_PVE, FEXTRA, FEXTRA_BUILDS, INVEN_GUIDE],
  },
  {
    id: 'keen-strike-ruinous-blow',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 11020000, part: 11020040 }],
    payoff: [{ id: 11100000 }],
    title: {
      de: '[[11020000]] verkürzt [[11100000]]',
      en: '[[11020000]] shortens [[11100000]]',
    },
    text: {
      de: 'Mit der Spezialisierung auf Stufe 12 senkt jeder Treffer von [[11020000]] die Abklingzeit von [[11100000]] um 1 s. [[11100000]] versetzt dich 20 s in Kampfbereitschaft: +20 % PvE-Schadensverstärkung und +100 Kritischer Treffer. Je öfter [[11020000]] trifft, desto früher ist [[11100000]] wieder bereit und desto mehr vom Kampf deckt der Buff ab.',
      en: 'With its level-12 specialisation, every hit of [[11020000]] cuts the cooldown of [[11100000]] by 1 s. [[11100000]] grants Prepare for Battle for 20 s: +20% PvE Damage Boost and +100 Critical Hit. The more often [[11020000]] hits, the sooner [[11100000]] is back and the more of the fight that buff covers.',
    },
    how: {
      de: 'Halt [[11020000]] auf der linken Maustaste, während du die Makro-Taste hältst; es gibt dabei auch MP zurück. Wirk [[11100000]] von Hand, sobald es bereit ist (aion2-meta). Grobs hört mit [[11020000]] auf, sobald [[11170000]] und [[11010000]] Stufe 16 haben; dann fällt diese Verkürzung weg.',
      en: 'Hold [[11020000]] on left click while you hold the macro key; it also restores MP. Cast [[11100000]] by hand whenever it is ready (aion2-meta). Grobs stops using [[11020000]] once [[11170000]] and [[11010000]] reach 16; then this reduction is gone too.',
    },
    usage: {
      de: 'Ulfhednar, aLuckyRO, Sen und die KR-Ranker (aion2-meta, PvE und PvP) nehmen diese Spezialisierung; Grobs nicht. Bei Ulfhednar sitzt Verheerender Schlag oben auf seiner Buff-Kette im Makro, und 21 % der öffentlichen Makros stapeln ihn mit Klinge des Lebensraubs auf einen Schritt.',
      en: 'Ulfhednar, aLuckyRO, Sen and the KR rankers (aion2-meta, PvE and PvP) take this specialisation; Grobs does not. Ulfhednar puts Ruinous Blow on top of his buff chain in the macro, and 21% of public macros stack it with Lifestealing Blade on one step.',
    },
    evidence: [
      { id: 11020000, part: 11020040, en: '[Ruinous Blow] cooldown on hit', de: '[Verheerender Schlag]-Abklingzeit −1s: Bei Treffer' },
      { id: 11100000, en: 'grants Prepare for Battle for 20s', de: 'Versetzt den Wirker für 20s in Kampfbereitschaft' },
      { id: 11100000, en: 'Prepare for Battle: Increases PvE Damage Boost by 20%', de: 'Kampfbereitschaft: Schadensverstärkung (PvE) +20 %' },
    ],
    sources: [VAULT_PVE, VAULT_MACROS, META, GUIDES],
  },
  {
    id: 'stagger-sword-aura-rampage',
    kind: 'enable',
    rating: 'strong',
    content: ['boss'],
    setup: [{ id: 11250000, part: 11250010 }],
    payoff: [{ id: 11280000 }, { id: 11770000 }],
    status: 'Stagger',
    title: {
      de: 'Benommenheit: Zeit für [[11280000]]',
      en: 'Stagger: time for [[11280000]]',
    },
    text: {
      de: '[[11280000]] trifft nur benommene Ziele, hat aber keine Abklingzeit. [[11770000]] fügt benommenen Zielen bei jedem Treffer Zusatzschaden zu. Die Benommen-Leiste des Bosses füllst du mit Benommen-Leisten-Schaden, und [[11250000]] erhöht ihn ab Stigma-Stufe 5 um 50 %.',
      en: '[[11280000]] only hits a Staggered target but has no cooldown. [[11770000]] adds extra damage to every hit on a Staggered target. You fill the boss’s Stagger gauge with Stagger Gauge Damage, and from stigma level 5 [[11250000]] raises it by 50%.',
    },
    how: {
      de: 'Leg [[11280000]] unter [[11010000]] auf eine Taste (Ulfhednar): Während der Benommenheit feuert [[11280000]], sonst [[11010000]]. Grobs spammt [[11280000]] stattdessen von Hand. Mit der Spezialisierung auf Stufe 16 senkt jeder Treffer alle Abklingzeiten um 1 s; so kommen [[11250000]], [[11400000]] und [[11390000]] im Fenster schneller zurück. Außerhalb der Benommenheit bringt [[11280000]] nichts.',
      en: 'Stack [[11280000]] below [[11010000]] on one key (Ulfhednar): during the Stagger it fires [[11280000]], otherwise [[11010000]]. Grobs spams [[11280000]] by hand instead. With the level-16 specialisation each hit cuts all cooldowns by 1 s, so [[11250000]], [[11400000]] and [[11390000]] come back sooner in the window. Outside a Stagger [[11280000]] does nothing.',
    },
    stack: [11280000, 11010000],
    usage: {
      de: 'Klingenraserei steht in 79 % der öffentlichen Skillleisten und bei 95 % der Top-Spieler (MetaBot); Ulfhednar macht diese Kette zu einer Makro-Zeile. aion2-meta hält die Skillpunkte dafür für verschwendet, aLuckyRO und Sen steigern Zerstörungsdrang genau für dieses Fenster.',
      en: 'Sword Aura Rampage is on 79% of public skill bars and with 95% of top players (MetaBot); Ulfhednar makes this chain a macro line. aion2-meta calls it not worth skill points, while aLuckyRO and Sen level Destructive Impulse for exactly this window.',
    },
    evidence: [
      { id: 11280000, en: 'damage to a target afflicted with Stagger within 4m', de: 'Fügt einem benommenen Ziel innerhalb von 4 m' },
      { id: 11770000, en: 'extra damage to targets afflicted with Stagger or an Impact-type status', de: 'Fügt einem Ziel mit Schock oder Benommenheit' },
      { id: 11250000, part: 11250010, en: '+50% Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) +50 %' },
      { id: 11280000, part: 11280050, en: 'all skill cooldowns on hit', de: 'Abklingzeit (Alle Fäh.) −1s: Bei Treffer' },
    ],
    sources: [VAULT_PVE, VAULT_MACROS, GUIDES, INVEN_MACRO],
  },
  {
    id: 'knockdown-overhead-slam',
    kind: 'enable',
    rating: 'strong',
    content: ['aoe', 'pvp'],
    setup: [
      { id: 11290000 },
      { id: 11360000 },
      { id: 11240000 },
      { id: 11700000 },
      { id: 11200000, part: 11200010 },
      { id: 11080000, part: 11080040 },
    ],
    payoff: [{ id: 11170000 }, { id: 11300000 }],
    window: 3,
    status: 'Knockdown',
    title: {
      de: 'Niederschlag öffnet [[11170000]] und [[11300000]]',
      en: 'Knockdown opens [[11170000]] and [[11300000]]',
    },
    text: {
      de: '[[11170000]] und [[11300000]] treffen nur Ziele mit Niederschlag. [[11290000]] schlägt sicher für 3 s nieder. [[11360000]], [[11240000]] und [[11700000]] tun es per Chance, gegen NPCs immer. [[11200000]] (nur nach einem Block oder über [[11190000]]) und der Folgeskill von [[11080000]] können es mit Spezialisierung. Bosse mit Handlungsunfähigkeits-Immunität fallen nicht um; bei ihnen spielt [[11290000]] nur eine andere Animation ab und schlägt nichts nieder.',
      en: '[[11170000]] and [[11300000]] only hit a knocked-down target. [[11290000]] knocks down for 3 s every time. [[11360000]], [[11240000]] and [[11700000]] do it by chance, always against NPCs. [[11200000]] (only after a Block or through [[11190000]]) and the chain skill of [[11080000]] can do it with a specialisation. Bosses with Incapacitated Immunity never fall; against them [[11290000]] just plays another animation and knocks nothing down.',
    },
    how: {
      de: 'Eröffne mit [[11290000]], dann [[11170000]], zuletzt [[11300000]]. So bauen es beide PvP-Guides, vermutlich weil sein Luftbann den Niederschlag ablöst. [[11360000]] geht nur nach Notausweichen oder im Flug. Die Spezialisierung auf Stufe 12 verlängert den Niederschlag von [[11290000]] auf 4 s. Gegen Gruppen schlägt [[11240000]] bis zu 4 NPCs nieder; mit der Flächen-Spezialisierung trifft [[11170000]] mehrere davon.',
      en: 'Open with [[11290000]], then [[11170000]], and [[11300000]] last. Both PvP guides use this order, probably because its Airborne replaces the Knockdown. [[11360000]] only works after a Dodge or in flight. The level-12 specialisation of [[11290000]] stretches the Knockdown to 4 s. Against packs [[11240000]] knocks down up to 4 NPCs, and with its AoE specialisation [[11170000]] hits several of them.',
    },
    usage: {
      de: 'Spottklinge steht in 61 % der öffentlichen Skillleisten und bei 96 % der Top-Spieler (MetaBot), Luftfesselung in 60 % und bei 89 %. Die PvP-Guides von aion2-guides und Fextralife bauen ihre Kette genau so.',
      en: 'Mocking Blade is on 61% of public skill bars and with 96% of top players (MetaBot), Aerial Snare on 60% and with 89%. The PvP guides of aion2-guides and Fextralife build their chain exactly like this.',
    },
    evidence: [
      { id: 11290000, en: 'and inflicts Knockdown for 3s', de: 'und versetzt es für 3s in Niederschlag' },
      { id: 11290000, en: 'Changes skill motion when attacking targets with Incapacitated Immunity', de: 'Bei Zielen, die Handlungsunfähigkeits-Immunität besitzen, ändert sich die Animation' },
      { id: 11170000, en: 'to a target afflicted with Knockdown within 4m', de: 'einem Ziel mit Niederschlag innerhalb von 4 m' },
      { id: 11300000, en: 'to a target afflicted with Knockdown within 4m with a 50% chance to inflict Airborne', de: 'einem Ziel mit Niederschlag innerhalb von 4 m' },
      { id: 11360000, en: 'chance to inflict Knockdown for 3s after using [Dodge] or while flying', de: 'Bewegt sich bei Einsatz von [Notausweichen] oder im Flug zu einem Ziel' },
      { id: 11360000, en: '100% chance to inflict Knockdown on NPC targets', de: 'Gegen NPCs beträgt die Trefferchance von Niederschlag 100 %' },
      { id: 11240000, en: 'has a 50% chance to inflict Knockdown for 3s', de: 'versetzt sie mit 50 % Chance für 3s in Niederschlag' },
      { id: 11700000, en: 'with a 30% chance to inflict Knockdown for 3s', de: 'versetzt sie mit 30 % Chance für 3s in Niederschlag' },
      { id: 11200000, part: 11200010, en: '30% chance to inflict Knockdown for 3s on landing [Ankle Slice]', de: '[Knöchelschnitt]: 30 % Chance auf Niederschlag für 3 Sek. bei Treffer' },
      { id: 11080000, part: 11080040, en: '[Blade Dance] has 30% chance to inflict Knockdown for 3s', de: '[Klingentanz]: 30 % Chance auf Niederschlag für 3 Sek.' },
      { id: 11290000, part: 11290040, en: '+1s Knockdown duration', de: 'Niederschlagsdauer +1 Sek.' },
      { id: 11170000, part: 11170020, en: 'Changes to AoE Skill', de: 'Änderung zur Flächenfähigkeit' },
    ],
    sources: [GUIDES, FEXTRA_BUILDS, METABOT],
  },
  {
    id: 'focused-block-ankle-slice',
    kind: 'enable',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 11110000 }],
    payoff: [{ id: 11200000 }],
    status: 'Block',
    title: {
      de: 'Ein Block öffnet [[11200000]]',
      en: 'A Block opens [[11200000]]',
    },
    text: {
      de: '[[11200000]] geht nur nach einem erfolgreichen Block. Das steht im deutschen Text; der englische nennt den Block nur beim Bann. Weil der deutsche Text den Waffenblock von [[11110000]] als erfolgreichen Block zählt, öffnet er wohl auch [[11200000]]. Bei Bossen zählt vor allem der Schaden.',
      en: '[[11200000]] only works after a successful Block. The German text says so; the English one ties the Block to the Root only. Since the German text counts the Parry of [[11110000]] as a successful Block, it should open [[11200000]] too. On bosses it is mostly about the damage.',
    },
    how: {
      de: 'Leg [[11200000]] auf eine eigene Taste oder ganz unten in eine Nebenkette: Solange kein Block da ist, überspringt das Makro ihn. Mit der Spezialisierung auf Stufe 16 setzt jeder Block seine Abklingzeit mit 25 % Chance zurück. Der KR-Guide auf Inven lobt ihn bei Bossen, die oft Blocks erlauben.',
      en: 'Give [[11200000]] a key of its own or the bottom of a side chain: while there is no Block the macro skips it. With the level-16 specialisation every Block has a 25% chance to reset its cooldown. The KR Inven guide praises it against bosses that allow many Blocks.',
    },
    usage: {
      de: 'Knöchelschnitt steht in 61 % der öffentlichen Skillleisten und bei 94 % der Top-Spieler (MetaBot), aber 21 % der globalen Top 89 lassen ihn unter Stufe 8 (aion2-meta).',
      en: 'Ankle Slice is on 61% of public skill bars and with 94% of top players (MetaBot), but 21% of the global top 89 keep it below level 8 (aion2-meta).',
    },
    evidence: [
      { id: 11200000, en: 'with a 50% chance to inflict Root for 3s on Block', de: 'Fügt bei erfolgreichem Block bis zu 4 Gegnern' },
      { id: 11110000, en: 'and guarantees Parry', de: 'führt garantiert einen Waffenblock aus. Regeneriert bei erfolgreichem Block' },
      { id: 11200000, part: 11200050, en: '25% chance to reset [Ankle Slice] cooldown on Block', de: '[Knöchelschnitt]-Abklingzeit zurücksetzen (25 % Chance): Bei erfolgreichem Block' },
    ],
    sources: [FEXTRA, FEXTRA_BUILDS, INVEN_GUIDE, META],
  },
  {
    id: 'leaping-slam-ankle-slice',
    kind: 'proc',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 11190000, part: 11190020 }],
    payoff: [{ id: 11200000 }],
    title: {
      de: '[[11190000]] löst [[11200000]] aus',
      en: '[[11190000]] triggers [[11200000]]',
    },
    text: {
      de: 'Mit der Spezialisierung auf Stufe 8 aktiviert jeder Treffer von [[11190000]] mit 50 % Chance [[11200000]], ganz ohne Block. Das ist der zweite Weg zu [[11200000]].',
      en: 'With its level-8 specialisation every hit of [[11190000]] has a 50% chance to activate [[11200000]], no Block needed. It is the second way to [[11200000]].',
    },
    how: {
      de: 'Spring mit [[11190000]] rein und drück gleich danach [[11200000]], wenn es aktiv ist. Auf Stufe 8 hast du nur einen Spezialisierungsplatz: diese Option oder das Zurücksetzen bei Eliminierung, das du zum Farmen willst. Ab Stufe 12 passen beide, dann tritt sie gegen die kurze Kampfbereitschaft an. Fextralife tauscht für Kämpfe gegen einen einzelnen Boss das Zurücksetzen gegen diese Option. Im PvP kann [[11200000]] mit seiner Niederschlag-Spezialisierung danach [[11170000]] öffnen (Fextralife).',
      en: 'Leap in with [[11190000]] and press [[11200000]] right after if it is active. At level 8 you have only one specialisation slot: this one or the reset on kill you want for farming. From level 12 both fit, and it competes with the short Prepare for Battle instead. Fextralife swaps the reset for this option in single-boss fights. In PvP, [[11200000]] with its Knockdown specialisation can then open [[11170000]] (Fextralife).',
    },
    usage: {
      de: 'aion2-meta führt sie als Alternative der KR-Ranker zur Kampfbereitschafts-Option. 98 % der öffentlichen Gladiator-Builds mit Makro lassen Sprungangriff draußen, du drückst ihn also von Hand.',
      en: 'aion2-meta lists it as the KR rankers’ alternative to the Prepare for Battle option. 98% of public Gladiator builds with a macro leave Leaping Slam out, so you press it by hand.',
    },
    evidence: [
      { id: 11190000, part: 11190020, en: '50% chance to trigger [Ankle Slice] on hit', de: '[Knöchelschnitt]-Aktivierung (50 % Chance): Bei [Sprungangriff]-Treffer' },
      { id: 11200000, en: 'with a 50% chance to inflict Root for 3s on Block', de: 'Fügt bei erfolgreichem Block bis zu 4 Gegnern' },
    ],
    sources: [FEXTRA_BUILDS, META],
  },
  {
    id: 'wave-armor-passives',
    kind: 'buff',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 11410000, part: 11410020 }, { id: 11410000, part: 11410030 }],
    payoff: [{ id: 11780000 }, { id: 11800000 }],
    window: 14.5,
    title: {
      de: '[[11410000]] verstärkt [[11780000]] und [[11800000]]',
      en: '[[11410000]] amplifies [[11780000]] and [[11800000]]',
    },
    text: {
      de: 'Solange [[11410000]] läuft, ist der Effekt von [[11780000]] ab Stigma-Stufe 10 1,5-mal so stark, der von [[11800000]] ab Stigma-Stufe 15 ebenso. Das sind dein Frontalschaden und der Gruppenbuff bei Block sowie der Flächenschlag nach 5 Stapeln Mordlust. Auf Stigma-Stufe 10 läuft die Aura 14,5 s, auf Stufe 15 sind es 17 s, auf Stufe 20 dann 20 s.',
      en: 'While [[11410000]] runs, the effect of [[11780000]] is 1.5 times as strong from stigma level 10, and that of [[11800000]] from stigma level 15. That is your front damage and party buff on Block, and the area hit after 5 Menace stacks. At stigma level 10 the aura lasts 14.5 s, at 15 it lasts 17 s and at 20 it lasts 20 s.',
    },
    how: {
      de: 'Wirk [[11410000]], wenn du lange vor dem Boss stehst und viel triffst; es ist eine Aura um dich, du brauchst kein Ziel. aion2-guides nimmt es nur ohne Templer in der Gruppe, vermutlich weil dessen Kampfrausch nicht mit dem Gruppenbuff von [[11780000]] stapelt. Der KR-Guide auf Inven tauscht es gegen [[11110000]], wenn der Boss kaum Blocks erlaubt.',
      en: 'Cast [[11410000]] when you stand in front of the boss for a while and hit a lot; it is an aura around you and needs no target. aion2-guides takes it only without a Templar in the group, probably because his Fury does not stack with the party buff of [[11780000]]. The KR Inven guide swaps it in for [[11110000]] when the boss allows few Blocks.',
    },
    usage: {
      de: 'Rüstung der Welle: 11 % der öffentlichen globalen Builds, 24 % der globalen Top 89, aber 75 % der KR-PvE- und 85 % der KR-PvP-Ranker (aion2-meta; KR hat mehr Stigma-Plätze).',
      en: 'Wave Armor: 11% of public global builds, 24% of the global top 89, but 75% of KR PvE and 85% of KR PvP rankers (aion2-meta; KR has more stigma slots).',
    },
    evidence: [
      { id: 11410000, part: 11410020, en: 'x1.5 [Experienced Counterstrike] effect for the duration', de: '[Erfahrener Konterangriff]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 11410000, part: 11410030, en: 'x1.5 [Murderous Burst] effect for the duration', de: '[Tödliche Eruption]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 11780000, en: 'Increases Front Attack Damage Boost by', de: 'Erhöht die Schadensverstärkung (Frontal) des Wirkers um' },
      { id: 11800000, en: 'Grants a stack of Menace for 3s when landing an attack', de: 'Gewährt bei jedem Angriffstreffer für 3s einen Stapel Mordlust' },
    ],
    sources: [META, GUIDES, INVEN_GUIDE],
  },
  {
    id: 'armor-of-balance-sustain',
    kind: 'buff',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 11130000, part: 11130020 }, { id: 11130000, part: 11130030 }],
    payoff: [{ id: 11730000 }, { id: 11720000 }],
    window: 14.5,
    title: {
      de: '[[11130000]] verstärkt deine Heil-Passiven',
      en: '[[11130000]] amplifies your healing passives',
    },
    text: {
      de: '[[11130000]] erhöht deinen Widerstand (Schock). Ab Stigma-Stufe 10 macht es dabei [[11730000]] 1,5-mal so stark, ab Stigma-Stufe 15 auch [[11720000]]. So heilst du dich mehr, während dich der Gegner schwerer kontrolliert.',
      en: '[[11130000]] raises your Impact-type Resist. From stigma level 10 it also makes [[11730000]] 1.5 times as strong for the duration, from stigma level 15 [[11720000]] too. You heal more while the enemy has a harder time controlling you.',
    },
    how: {
      de: 'Wirk [[11130000]], bevor du in eine Gruppe mit viel Kontrolle springst. [[11730000]] heilt bei Angriffstreffern, [[11720000]] bei Blocks; beide laufen von selbst. aion2-guides spielt es im Abyss und in der Arena zusammen mit [[11400000]] und [[11380000]], aber wie Fextralife nur auf Stigma-Stufe 5, also noch ohne diese Verstärkung.',
      en: 'Cast [[11130000]] before you dive into a group with a lot of control. [[11730000]] heals on landed attacks, [[11720000]] on Blocks; both run on their own. aion2-guides plays it in the Abyss and the Arena together with [[11400000]] and [[11380000]], but like Fextralife only at stigma level 5, below this link.',
    },
    usage: {
      de: 'Rüstung des Gleichgewichts: 91 % der KR-PvP-Ranker, 61 % der KR-PvE-Ranker, 14 % der globalen Top 89 (aion2-meta).',
      en: 'Armor of Balance: 91% of KR PvP rankers, 61% of KR PvE rankers, 14% of the global top 89 (aion2-meta).',
    },
    evidence: [
      { id: 11130000, part: 11130020, en: 'x1.5 [Blood Absorption] effect for the duration', de: '[Blutabsorption]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 11130000, part: 11130030, en: 'x1.5 [Protection Armor] effect for the duration', de: '[Schutzrüstung]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 11730000, en: 'Max HP on landing an attack', de: 'Regeneriert bei jedem erfolgreichen Angriff' },
      { id: 11720000, en: 'HP on Block. Cooldown: 1s', de: 'regeneriert bei erfolgreichem Block' },
    ],
    sources: [META, GUIDES, FEXTRA_BUILDS],
  },
];
