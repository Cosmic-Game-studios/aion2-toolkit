import type { CuratedCombo } from './types';

/**
 * Ranger (KR: 궁성) combos, checked by hand against the English and German skill texts of the global client.
 * A link only counts when a text states it: the payoff needs a status the setup inflicts (Slow / Root, Stagger,
 * Crimson Flames, a Critical Hit, damage over time), a self buff names the payoff (Precision, Vaizel's Authority,
 * Mother Nature's Breath), or a specialisation cuts the payoff's cooldown. Where EN and DE differ, the stricter text
 * was taken: Drill Dart (DE "Bei einem Kritischen Treffer:" in front of the whole effect, EN only ties the MP to the
 * crit) was settled as "only after a Critical Hit" with the Korean skill list on inven.co.kr ("치명타 적중 시 ..."
 * in front of the damage as well); English wikis found by search say the same, while aion2vault reads it as MP on
 * crit only. Arrow Scattershot's "Stagger" is the broken Stagger Gauge, not a Stun (DE "benommen" /
 * Benommen-Leiste, KR "그로기 상태"). Shares come from aion2vault's count of public global questlog.gg builds and
 * macros (2026-10-11 / 2026-10-14), metabot.gg's top-player loadouts and cielui.com's KR rankers; key chains from
 * whelps, J0EI, Fubgun and the KR player 빵호빵. Stun, Root and other control effects rarely land on bosses
 * (Incapacitated Immunity), so those combos leave out boss content; Slow is not one of them, and the global
 * creators' boss rotations rely on it. Texts are short paraphrases, not quotes from the guides.
 */
export const combos: CuratedCombo[] = [
  {
    id: 'snare-shot-burst-arrow',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14130000 }],
    payoff: [{ id: 14080000 }],
    window: 5,
    status: 'Slow',
    title: {
      de: '[[14130000]] öffnet [[14080000]]',
      en: '[[14130000]] opens [[14080000]]',
    },
    text: {
      de: '[[14080000]] kannst du nur auf ein Ziel mit Trägheit oder Bann wirken. [[14130000]] versetzt bis zu 4 Gegner für 5 s in Trägheit und schaltet ihn damit frei. Trägheit ist keine Kampfunfähigkeit; whelps und J0EI spielen die Kette auch in ihrer Boss-Rotation.',
      en: '[[14080000]] can only be cast on a target with Slow or Root. [[14130000]] slows up to 4 enemies for 5 s and so unlocks it. Slow is not an incapacitating effect; whelps and J0EI run this chain in their boss rotation too.',
    },
    how: {
      de: 'Leg [[14060000]] → [[14130000]] → [[14080000]] auf eine Taste und nimm sie ins Makro. Die Taste überspringt [[14080000]], bis die Trägheit sitzt, und feuert ihn dann. [[14130000]] kommt alle 15 s, [[14080000]] alle 20 s: Ohne Abklingzeit-Verringerung wird [[14080000]] oft erst kurz nach dem Ende der 5 s Trägheit bereit und wartet dann auf den nächsten [[14130000]]. Die Spezialisierung Stufe 16 von [[14130000]] (Trägheit 7 s) verkürzt diese Wartezeiten.',
      en: 'Put [[14060000]] → [[14130000]] → [[14080000]] on one key and add it to the macro. The key skips [[14080000]] until the Slow is on, then fires it. [[14130000]] comes back every 15 s, [[14080000]] every 20 s: without Cooldown Reduction, [[14080000]] is often ready just after the 5 s Slow has run out and then waits for the next [[14130000]]. The level 16 specialisation of [[14130000]] (7 s Slow) shortens those waits.',
    },
    stack: [14060000, 14130000, 14080000],
    usage: {
      de: '26 % der öffentlichen Waldläufer-Makros nutzen Greifenpfeil → Schlingenpfeil → Sprengpfeil, 25 % Schlingenpfeil → Explosionspfeil → Sprengpfeil; Sprengpfeil steht in 98 % der Builds',
      en: '26% of public Ranger macros run Griffon Arrow → Snare Shot → Burst Arrow, 25% Snare Shot → Explosive Arrow → Burst Arrow; Burst Arrow is in 98% of builds',
    },
    evidence: [
      { id: 14130000, en: 'Inflicts Slow, reducing Move Speed', de: 'versetzt sie für 5s in Trägheit' },
      { id: 14080000, en: 'Selects a target afflicted with Slow or Root within 20m', de: 'um ein Ziel mit Trägheit oder Bann innerhalb von 20 m' },
      { id: 14130000, part: 14130050, en: '+2s Slow and Root duration', de: 'Trägheits-/Banndauer +2 Sek.' },
    ],
    sources: [
      { label: 'aion2vault – Macro guide (public global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'couga54 – Ranger guide', href: 'https://couga54.github.io/aion2-guides/en/ranger/' },
    ],
  },
  {
    id: 'marking-shot-deadshot',
    kind: 'buff',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14090000 }],
    payoff: [{ id: 14010000 }],
    window: 10,
    title: {
      de: 'Letalität von [[14090000]] verstärkt [[14010000]]',
      en: 'Precision from [[14090000]] boosts [[14010000]]',
    },
    text: {
      de: '[[14090000]] gibt dir 10 s lang Letalität (Kritischer Treffer +300). Solange du Letalität hast, macht [[14010000]] 35 % mehr Schaden. Mit der Spezialisierung „Wirkungsdauer +5 Sek.“, die whelps und J0EI wählen, hält Letalität 15 s.',
      en: '[[14090000]] grants you Precision for 10 s (Critical Hit +300). While you have Precision, [[14010000]] deals 35% more damage. With the "+5s duration" specialisation, which whelps and J0EI take, Precision lasts 15 s.',
    },
    how: {
      de: 'Beide Skills drückst du von Hand. Wirk [[14090000]] am besten im Stehen (er bewegt dich in die gedrückte Richtung), dann lade [[14010000]] auf Stufe 3 auf, solange Letalität läuft. Setz [[14010000]] ab, bevor du [[14090000]] erneuerst, und erneuere ihn erst, wenn nur noch 2–3 s übrig sind.',
      en: 'Press both by hand. Cast [[14090000]] standing still if you can (it moves you in the direction you hold), then charge [[14010000]] to level 3 while Precision lasts. Release [[14010000]] before you refresh [[14090000]], and refresh it only when 2–3 s are left.',
    },
    usage: {
      de: '98 % der öffentlichen Waldläufer-Makros lassen Zielpfeil draußen, 96 % Markierungsschuss: beide kommen von Hand',
      en: '98% of public Ranger macros keep Deadshot out and 96% keep Marking Shot out: both are pressed by hand',
    },
    evidence: [
      { id: 14090000, en: 'grants Precision for 10s', de: 'erhält für 10s [Letalität]' },
      { id: 14010000, en: 'Increases damage by 35% if the caster has Precision.', de: 'Befindet sich der Wirker im Zustand [Letalität], erhöht sich der Schaden um 35 %' },
      { id: 14090000, part: 14090030, en: '+5s duration', de: 'Wirkungsdauer +5 Sek.' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'aion2vault – Macro guide (public global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'couga54 – Ranger guide', href: 'https://couga54.github.io/aion2-guides/en/ranger/' },
      { label: 'inven.co.kr – 궁성 guide by 빵호빵', href: 'https://www.inven.co.kr/board/aion2/6450/19498' },
    ],
  },
  {
    id: 'snipe-deadshot-cooldown',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14020000, part: 14020040 }],
    payoff: [{ id: 14010000 }],
    title: {
      de: '[[14020000]] verkürzt die Abklingzeit von [[14010000]]',
      en: '[[14020000]] shortens the cooldown of [[14010000]]',
    },
    text: {
      de: 'Mit der Spezialisierung Stufe 12 senkt jeder Treffer von [[14020000]] die Abklingzeit von [[14010000]] um 1 s. Da [[14020000]] keine Abklingzeit hat, ist dein stärkster Schuss viel öfter bereit als alle 20 s.',
      en: 'With the level 12 specialisation every hit of [[14020000]] takes 1 s off the cooldown of [[14010000]]. As [[14020000]] has no cooldown, your strongest shot is ready far more often than every 20 s.',
    },
    how: {
      de: 'Halte [[14020000]] auf der linken Maustaste, zusammen mit der Makrotaste. Lade [[14010000]] auf einer eigenen Taste voll auf, sobald er bereit ist, am besten unter Letalität.',
      en: 'Hold [[14020000]] on the left mouse button together with the macro key. Charge [[14010000]] fully on its own key as soon as it is ready, ideally under Precision.',
    },
    usage: {
      de: 'whelps, J0EI, Moxsy und die koreanischen Top-Spieler (aion2-meta) wählen diese Spezialisierung; Scharfschuss steht in 98 % der öffentlichen Builds',
      en: 'whelps, J0EI, Moxsy and the top Korean players (aion2-meta) pick this specialisation; Snipe is in 98% of public builds',
    },
    evidence: [
      { id: 14020000, part: 14020040, en: '-1s [Deadshot] cooldown on hit', de: '[Zielpfeil]-Abklingzeit −1s: Bei Treffer' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'aion2-meta – Ranger guide', href: 'https://aion2-meta.com/guides/ranger/' },
    ],
  },
  {
    id: 'snare-shot-explosive-arrow',
    kind: 'status',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14130000 }],
    payoff: [{ id: 14360000 }],
    window: 5,
    status: 'Slow',
    title: {
      de: '[[14360000]] trifft verlangsamte Ziele härter',
      en: '[[14360000]] hits slowed targets harder',
    },
    text: {
      de: '[[14360000]] macht 20 % mehr Schaden an Zielen mit Trägheit oder Bann. Stigma-Stufe 10 und 20 legen noch einmal +10 % und +20 % drauf. [[14130000]] liefert die Trägheit für bis zu 4 Ziele.',
      en: '[[14360000]] deals 20% more damage to targets with Slow or Root. Stigma levels 10 and 20 add another +10% and +20%. [[14130000]] supplies the Slow for up to 4 targets.',
    },
    how: {
      de: 'Leg [[14130000]] → [[14360000]] → [[14080000]] auf eine Taste im Makro: erst die Trägheit, dann der verstärkte [[14360000]], danach [[14080000]]. So spielt es whelps, bis [[14060000]] Stigma-Stufe 15 erreicht.',
      en: 'Put [[14130000]] → [[14360000]] → [[14080000]] on one macro key: Slow first, then the boosted [[14360000]], then [[14080000]]. whelps plays it this way until [[14060000]] reaches stigma level 15.',
    },
    stack: [14130000, 14360000, 14080000],
    usage: {
      de: '25 % der öffentlichen Waldläufer-Makros, darunter whelps’ meistgelikter Build; Explosionspfeil steht in 38 % der Builds',
      en: '25% of public Ranger macros, including whelps’ most-liked build; Explosive Arrow is in 38% of builds',
    },
    evidence: [
      { id: 14360000, en: 'Increases damage by 20% to targets afflicted with Slow or Root.', de: 'Der Schaden erhöht sich um 20 % bei Zielen mit Trägheit oder Bann.' },
      { id: 14360000, part: 14360020, en: '+10% additional damage to targets afflicted with Slow or Root', de: '+10 % zusätzlicher Schaden auf Ziele mit Trägheit oder Bann' },
      { id: 14360000, part: 14360040, en: '+20% additional damage to targets afflicted with Slow or Root', de: '+20 % zusätzlicher Schaden auf Ziele mit Trägheit oder Bann' },
      { id: 14130000, en: 'Inflicts Slow, reducing Move Speed', de: 'versetzt sie für 5s in Trägheit' },
    ],
    sources: [
      { label: 'aion2vault – Macro guide (public global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'aion2vault – Best Ranger builds', href: 'https://aion2vault.com/builds/ranger/best/' },
    ],
  },
  {
    id: 'slow-rooting-eye',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14130000 }],
    payoff: [{ id: 14770000 }],
    window: 5,
    status: 'Slow',
    title: {
      de: 'Trägheit löst [[14770000]] aus',
      en: 'Slow triggers [[14770000]]',
    },
    text: {
      de: '[[14770000]] verursacht bei jedem Treffer gegen ein Ziel mit Trägheit oder Bann mit 50 % Chance Zusatzschaden, höchstens einmal pro Sekunde. Ohne Trägheit oder Bann löst es nie aus. [[14130000]] hält die Trägheit 5 von 15 s aufrecht.',
      en: '[[14770000]] has a 50% chance to deal extra damage on every hit against a target with Slow or Root, at most once per second. Without Slow or Root it never triggers. [[14130000]] keeps the Slow up for 5 of every 15 s.',
    },
    how: {
      de: 'Lass [[14130000]] im Makro auf Abklingzeit laufen, auch wenn [[14080000]] gerade nicht bereit ist. Deine schnellen Treffer mit [[14020000]] und [[14340000]] lösen [[14770000]] in dieser Zeit fast jede Sekunde aus.',
      en: 'Let the macro fire [[14130000]] on cooldown, even when [[14080000]] is not ready. Your fast hits with [[14020000]] and [[14340000]] then trigger [[14770000]] almost every second during the Slow.',
    },
    usage: {
      de: 'Schlingenpfeil steht in 96 % der öffentlichen Builds; Fesselndes Auge ist bei aion2vault und couga54 die fünfte Passive',
      en: 'Snare Shot is in 96% of public builds; Rooting Eye is the fifth passive at aion2vault and couga54',
    },
    evidence: [
      { id: 14770000, en: 'when landing an attack on a target afflicted with Slow or Root', de: 'bei jedem Treffer gegen ein Ziel, das von Trägheit oder Bann betroffen ist' },
      { id: 14130000, en: 'Inflicts Slow, reducing Move Speed', de: 'versetzt sie für 5s in Trägheit' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'couga54 – Ranger guide', href: 'https://couga54.github.io/aion2-guides/en/ranger/' },
    ],
  },
  {
    id: 'dot-concentrated-fire',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14050000 }, { id: 14060000 }],
    payoff: [{ id: 14720000 }],
    title: {
      de: 'Blutung und Rotglut lösen [[14720000]] aus',
      en: 'Bleed and Crimson Flames trigger [[14720000]]',
    },
    text: {
      de: '[[14720000]] verursacht mit 50 % Chance Zusatzschaden an einem Ziel, das Schaden über Zeit erleidet, höchstens einmal pro Sekunde. [[14050000]] hinterlässt 6 s Blutung, [[14060000]] 10 s Rotglut (15 s ab Stigma-Stufe 10) auf bis zu 4 Zielen.',
      en: '[[14720000]] has a 50% chance to deal extra damage to a target taking damage over time, at most once per second. [[14050000]] leaves a 6 s Bleed, [[14060000]] 10 s of Crimson Flames (15 s from stigma level 10) on up to 4 targets.',
    },
    how: {
      de: 'Lass [[14050000]] im Makro feuern, sobald er bereit ist: 5 s Abklingzeit gegen 6 s Blutung, so bleibt die Blutung lückenlos. [[14050000]] braucht vorher einen Kritischen Treffer; mit Letalität und [[14220000]] wartest du darauf selten. [[14060000]] legt die Rotglut auf die ganze Gruppe.',
      en: 'Let the macro fire [[14050000]] whenever it is ready: a 5 s cooldown against a 6 s Bleed keeps the Bleed up without gaps. [[14050000]] first needs a Critical Hit; with Precision and [[14220000]] up you rarely wait for one. [[14060000]] puts Crimson Flames on the whole pack.',
    },
    stack: [14110000, 14050000, 14340000],
    usage: {
      de: '53 % der öffentlichen Waldläufer-Makros nutzen Orkanpfeil → Bohrpfeil → Schnellschuss; Greifenpfeil steht in 60 % der Builds; Fokussiertes Feuer ist die vierte Passive bei aion2vault und couga54',
      en: '53% of public Ranger macros run Gale Arrow → Drill Dart → Tempest Shot; Griffon Arrow is in 60% of builds; Concentrated Fire is the fourth passive at aion2vault and couga54',
    },
    evidence: [
      { id: 14720000, en: 'to a target taking Damage over Time', de: 'bei einem Ziel, das von Schaden über Zeit betroffen ist' },
      { id: 14050000, en: 'Inflicts Bleed on targets', de: 'Verursacht bei den Zielen Blutung' },
      { id: 14060000, en: 'Fire Damage over Time every 1s', de: 'Feuerschaden über Zeit' },
      { id: 14060000, part: 14060020, en: '+5s Damage over Time duration', de: 'Dauer des Schadens über Zeit +5 Sek.' },
    ],
    sources: [
      { label: 'aion2vault – Macro guide (public global macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'aion2vault – Ranger overview', href: 'https://aion2vault.com/builds/ranger/' },
    ],
  },
  {
    id: 'enhanced-crimson-flames-fast-hits',
    kind: 'debuff',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14060000, part: 14060030 }],
    payoff: [{ id: 14020000 }, { id: 14340000 }],
    window: 15,
    status: 'Crimson Flames',
    title: {
      de: 'Verstärkte Rotglut von [[14060000]] belohnt schnelle Treffer',
      en: 'Enhanced Crimson Flames from [[14060000]] reward fast hits',
    },
    text: {
      de: 'Ab Stigma-Stufe 15 erleidet ein Ziel mit Rotglut bei jedem Treffer Zusatzschaden. Ab Stufe 10 brennt es 15 s; am meisten holen in dieser Zeit die Skills heraus, die am häufigsten treffen: [[14020000]] und [[14340000]], beide ohne Abklingzeit, [[14340000]] auf bis zu 4 Ziele.',
      en: 'From stigma level 15, a target burning with Crimson Flames takes extra damage every time it is hit. From level 10 the burn lasts 15 s; the skills that hit most often in that time gain most: [[14020000]] and [[14340000]], both without a cooldown, [[14340000]] on up to 4 targets.',
    },
    how: {
      de: 'Leg [[14060000]] ganz unten auf seine Taste ([[14060000]] → [[14130000]] → [[14080000]]), dann feuert das Makro ihn auf Abklingzeit, und halte [[14020000]] mit dem Makro gedrückt. Vor Stufe 15 ist [[14360000]] das stärkere vierte Stigma; whelps tauscht [[14060000]] erst auf Stufe 15 ein.',
      en: 'Put [[14060000]] at the bottom of its key ([[14060000]] → [[14130000]] → [[14080000]]) so the macro fires it on cooldown, and keep holding [[14020000]] with the macro. Below level 15, [[14360000]] is the stronger fourth stigma; whelps swaps [[14060000]] in only once it reaches 15.',
    },
    stack: [14060000, 14130000, 14080000],
    usage: {
      de: 'Greifenpfeil ist das häufigste vierte Stigma (60 % der öffentlichen Builds und von metabots Top-Spielern); whelps bringt ihn erst auf 15, Fubgun nennt Explosionspfeil bis dahin stärker; 81 % der KR-Ranker haben ihn auf 20 (cielui)',
      en: 'Griffon Arrow is the most common fourth stigma (60% of public builds and of metabot’s top players); whelps raises it to 15 before swapping it in, Fubgun rates Explosive Arrow stronger until then; 81% of KR rankers run it at 20 (cielui)',
    },
    evidence: [
      { id: 14060000, part: 14060030, en: 'Extra damage when hit while afflicted with Crimson Flames', de: 'Zusatzschaden (Ziel mit Rotglut): Bei erlittenem Treffer' },
      { id: 14060000, part: 14060020, en: '+5s Damage over Time duration', de: 'Dauer des Schadens über Zeit +5 Sek.' },
      { id: 14060000, en: 'Inflicts Crimson Flames for 10s', de: 'für 10s in [Rotglut]' },
    ],
    sources: [
      { label: 'aion2vault – Best Ranger builds', href: 'https://aion2vault.com/builds/ranger/best/' },
      { label: 'couga54 – Ranger guide', href: 'https://couga54.github.io/aion2-guides/en/ranger/' },
      { label: 'cielui.com – 궁성 ranker adoption', href: 'https://cielui.com/guide/%EA%B6%81%EC%84%B1' },
    ],
  },
  {
    id: 'vaizels-authority-passives',
    kind: 'buff',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14310000, part: 14310020 }, { id: 14310000, part: 14310030 }],
    payoff: [{ id: 14740000 }, { id: 14800000 }],
    title: {
      de: '[[14310000]] verstärkt [[14740000]] und [[14800000]]',
      en: '[[14310000]] boosts [[14740000]] and [[14800000]]',
    },
    text: {
      de: 'Solange [[14310000]] wirkt, ist [[14740000]] ab Stigma-Stufe 10 und [[14800000]] ab Stufe 15 1,5-mal so stark. Beide stehen auf der Passiv-Liste der Creator weit oben: [[14740000]] auf Platz 1, [[14800000]] auf Platz 3.',
      en: 'While [[14310000]] lasts, [[14740000]] (from stigma level 10) and [[14800000]] (from level 15) are 1.5 times as strong. Both rank high on the creators’ passive list: [[14740000]] first, [[14800000]] third.',
    },
    how: {
      de: 'Wirk [[14310000]] zu Kampfbeginn und dann auf Abklingzeit (60 s; Dauer 17 s auf Stufe 15, 20 s auf Stufe 20). Leg es mit den anderen Buffs auf eine eigene Taste, die du von Hand drückst.',
      en: 'Cast [[14310000]] at the start of the fight and then on cooldown (60 s; it lasts 17 s at level 15, 20 s at level 20). Put it with your other buffs on a key of its own that you press by hand.',
    },
    usage: {
      de: 'Vaizels Hoheit steht in 96 % der öffentlichen Builds und alle Creator bringen sie zuerst auf 20; Fokussiertes Auge und Jägerseele sind Passive Nr. 1 und 3',
      en: 'Vaizel’s Authority is in 96% of public builds and every creator takes it to 20 first; Focused Eye and Hunter’s Soul are passives no. 1 and 3',
    },
    evidence: [
      { id: 14310000, part: 14310020, en: 'x1.5 [Focused Eye] effect for the duration', de: '[Fokussiertes Auge]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 14310000, part: 14310030, en: "x1.5 [Hunter's Soul] effect for the duration", de: '[Jägerseele]-Effekt x1,5: Während der Wirkungsdauer' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'couga54 – Ranger guide', href: 'https://couga54.github.io/aion2-guides/en/ranger/' },
    ],
  },
  {
    id: 'crits-vaizels-authority-cooldowns',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14090000 }, { id: 14220000 }],
    payoff: [{ id: 14310000, part: 14310040 }],
    window: 20,
    status: 'Critical Hit',
    title: {
      de: 'Krits aus [[14090000]] und [[14220000]] treiben [[14310000]] an',
      en: 'Crits from [[14090000]] and [[14220000]] drive [[14310000]]',
    },
    text: {
      de: 'Ab Stigma-Stufe 20 hat jeder Kritische Treffer, den du während [[14310000]] (20 s) landest, 50 % Chance, alle Abklingzeiten um 1 s zu senken; nur [[14260000]] ist ausgenommen. Letalität aus [[14090000]] gibt Kritischer Treffer +300, [[14220000]] +200: So kommen die Krits oft, und die Senkungen summieren sich.',
      en: 'At stigma level 20, every Critical Hit you land while [[14310000]] lasts (20 s) has a 50% chance to take 1 s off all your cooldowns; only [[14260000]] is exempt. Precision from [[14090000]] adds 300 Critical Hit and [[14220000]] 200, so crits come often and the cuts add up.',
    },
    how: {
      de: 'Starte wie J0EI und whelps mit [[14310000]], [[14220000]] und [[14090000]], dann halte Makro und [[14020000]]: Die vielen schnellen Treffer von [[14020000]] und [[14340000]] würfeln die Chance am häufigsten. Laut Fubgun lohnt sich Stufe 20 erst mit genug Kritischem Treffer; teste es an der Trainingspuppe.',
      en: 'Open with [[14310000]], [[14220000]] and [[14090000]] as J0EI and whelps do, then hold the macro and [[14020000]]: the many quick hits of [[14020000]] and [[14340000]] roll the chance most often. Fubgun says level 20 only pays off with enough Critical Hit; test it on a training dummy.',
    },
    usage: {
      de: 'Alle verglichenen Creator bringen Vaizels Hoheit zuerst auf 20 (Moxsy: der größte Kraftsprung des Waldläufers); 92 % der KR-Ranker haben sie auf 20 (cielui), metabots globale Top-Spieler lagen am 03.10.2026 im Schnitt erst bei Stufe 8,7',
      en: 'Every compared creator takes Vaizel’s Authority to 20 first (Moxsy: the Ranger’s biggest power spike); 92% of KR rankers run it at 20 (cielui), while metabot’s global top players averaged level 8.7 on 2026-10-03',
    },
    evidence: [
      { id: 14310000, part: 14310040, en: '50% chance to reduce all skill cooldowns by 1s on Critical Hit for the duration', de: '(50 % Chance): Bei Kritischer Treffer (Während der Wirkungsdauer)' },
      { id: 14090000, en: 'Precision: Increases Critical Hit by 300', de: 'Letalität: Kritischer Treffer +300' },
      { id: 14220000, en: "Increases the caster's Critical Hit by 200", de: 'den Kritischer Treffer um 200' },
      { id: 14260000, en: 'Unaffected by cooldown reduction effects.', de: 'Wird nicht von Effekten zur Verringerung der Abklingzeit beeinflusst.' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'aion2vault – Best Ranger builds', href: 'https://aion2vault.com/builds/ranger/best/' },
      { label: 'couga54 – Ranger guide', href: 'https://couga54.github.io/aion2-guides/en/ranger/' },
    ],
  },
  {
    id: 'stagger-arrow-scattershot',
    kind: 'enable',
    rating: 'situational',
    content: ['boss'],
    setup: [{ id: 14270000 }, { id: 14060000 }, { id: 14360000 }],
    payoff: [{ id: 14330000 }],
    status: 'Stagger',
    title: {
      de: 'Gebrochene Benommen-Leiste öffnet [[14330000]]',
      en: 'A broken Stagger Gauge opens [[14330000]]',
    },
    text: {
      de: '[[14330000]] trifft nur ein benommenes Ziel, also eines, dessen Benommen-Leiste gebrochen ist. Jeder Treffer füllt die Leiste: [[14270000]] mit 50, [[14060000]] und [[14360000]] mit je 20. Mit der Spezialisierung Stufe 16 senkt jeder Treffer von [[14330000]] alle Abklingzeiten um 1 s.',
      en: '[[14330000]] only hits a Staggered target, one whose Stagger Gauge is broken. Every hit fills the gauge: [[14270000]] by 50, [[14060000]] and [[14360000]] by 20 each. With the level 16 specialisation every hit of [[14330000]] takes 1 s off all cooldowns.',
    },
    how: {
      de: 'Leg [[14330000]] mit Vorrang unter [[14340000]] auf eine Makro-Taste. Dann feuert die Taste im Benommen-Fenster [[14330000]] und sonst wie gewohnt [[14340000]]. 빵호빵 (KR) zählt so 12–30 Treffer pro Benommen-Phase. Viele Creator lassen ihn später weg, weil die normale Rotation dann mehr Schaden macht.',
      en: 'Stack [[14330000]] with priority under [[14340000]] on a macro key. The key then fires [[14330000]] while the target is Staggered and [[14340000]] as usual otherwise. 빵호빵 (KR) counts 12–30 hits per Stagger window this way. Many creators drop it later, when the normal rotation deals more.',
    },
    stack: [14330000, 14340000],
    usage: {
      de: 'Pfeilhagel steht in 33 % der öffentlichen Builds und bei 75 % von metabots Top-Spielern; whelps, Moxsy und J0EI lassen ihn im Endgame weg',
      en: 'Arrow Scattershot is in 33% of public builds and with 75% of metabot’s top players; whelps, Moxsy and J0EI drop it in the endgame',
    },
    evidence: [
      { id: 14330000, en: 'to a target afflicted with Stagger within 20m', de: 'Fügt einem benommenen Ziel innerhalb von 20 m' },
      { id: 14270000, en: '50 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 50' },
      { id: 14060000, en: '20 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 20' },
      { id: 14360000, en: '20 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 20' },
      { id: 14330000, part: 14330050, en: '-1s all cooldowns on hit', de: 'Abklingzeit (Alle Fäh.) −1s: Bei Treffer' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'inven.co.kr – 궁성 guide by 빵호빵', href: 'https://www.inven.co.kr/board/aion2/6450/19498' },
      { label: 'inven.co.kr – 궁성 skill list (KR tooltips)', href: 'https://www.inven.co.kr/board/aion2/6450/33' },
    ],
  },
  {
    id: 'stigma-slows-burst-arrow',
    kind: 'enable',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14270000, part: 14270020 }, { id: 14150000, part: 14150030 }, { id: 14160000, part: 14160010 }],
    payoff: [{ id: 14080000 }],
    title: {
      de: 'Stigma-Trägheit und Bann öffnen [[14080000]] auch',
      en: 'Stigma Slows and Roots open [[14080000]] too',
    },
    text: {
      de: '[[14080000]] braucht nur irgendeine Trägheit oder einen Bann. [[14270000]] verlangsamt ab Stigma-Stufe 10 für 10 s, [[14150000]] ab Stufe 15 für 5 s, [[14160000]] bannt ab Stufe 5 mit 50 % Chance für 5 s. [[14360000]] und [[14770000]] profitieren gleich mit.',
      en: '[[14080000]] only needs some Slow or Root. [[14270000]] slows for 10 s from stigma level 10, [[14150000]] for 5 s from level 15, and [[14160000]] roots with a 50% chance for 5 s from level 5. [[14360000]] and [[14770000]] profit as well.',
    },
    how: {
      de: 'Nimm [[14270000]] für Bosse, deren Benommen-Leiste schnell brechen muss (Allyria): Seine 10 s Trägheit sind doppelt so lang wie die von [[14130000]] und geben [[14080000]] einmal pro Minute ein langes Fenster. [[14150000]] und [[14160000]] sind PvP-Werkzeuge; Bann sitzt an den meisten Bossen nicht (Handlungsunfähigkeits-Immunität).',
      en: 'Take [[14270000]] for bosses whose Stagger Gauge must break fast (Allyria): its 10 s Slow is twice as long as that of [[14130000]] and gives [[14080000]] a long window once a minute. [[14150000]] and [[14160000]] are PvP tools; Root does not land on most bosses (Incapacitated Immunity).',
    },
    usage: {
      de: 'Pfeilsturm, Illusionspfeil und Siegelpfeil stehen in höchstens 2 % der öffentlichen globalen Builds; Pfeilsturm bei 26 % von metabots Top-Spielern',
      en: 'Arrow Storm, Illusory Arrow and Sealing Arrow are in 2% or fewer of public global builds; Arrow Storm with 26% of metabot’s top players',
    },
    evidence: [
      { id: 14270000, part: 14270020, en: 'Inflicts Slow for 10s on hit', de: 'Trägheit für 10s: Bei Treffer' },
      { id: 14150000, part: 14150030, en: 'Inflicts Slow for 5s on hit', de: 'Trägheit für 5s: Bei Treffer' },
      { id: 14160000, part: 14160010, en: '50% chance to inflict Root for 5s on hit', de: 'Bann für 5s (50 % Chance): Bei Treffer' },
      { id: 14080000, en: 'Selects a target afflicted with Slow or Root within 20m', de: 'um ein Ziel mit Trägheit oder Bann innerhalb von 20 m' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'aion2vault – Best Ranger builds', href: 'https://aion2vault.com/builds/ranger/best/' },
      { label: 'metabot.gg – Ranger top-player meta', href: 'https://metabot.gg/en/aion-2/classes/ranger/build' },
    ],
  },
  {
    id: 'precision-suppressing-arrow-stun',
    kind: 'buff',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 14090000 }],
    payoff: [{ id: 14070000 }],
    window: 10,
    status: 'Stun',
    title: {
      de: 'Letalität lässt [[14070000]] betäuben',
      en: 'Precision lets [[14070000]] stun',
    },
    text: {
      de: '[[14070000]] kann nur betäuben, solange du Letalität von [[14090000]] hast: mit 40 % Chance gegen Spieler, gegen NPCs sicher. Der Schaden selbst braucht keine Letalität.',
      en: '[[14070000]] can only stun while you have Precision from [[14090000]]: a 40% chance against players, certain against NPCs. The damage itself needs no Precision.',
    },
    how: {
      de: 'Wirk [[14070000]] in den 10–15 s nach [[14090000]]. Im PvP verlängert die Spezialisierung Stufe 8 die Betäubung um 1 s, Stufe 12 hebt die Chance um 20 %. Die meisten Bosse sind gegen Betäubung immun; beim Leveln stoppt sie einzelne Gegner.',
      en: 'Cast [[14070000]] in the 10–15 s after [[14090000]]. In PvP the level 8 specialisation adds 1 s of Stun and level 12 adds 20% chance. Most bosses are immune to Stun; while leveling it stops single mobs.',
    },
    usage: {
      de: 'Unterdrückungspfeil steht in 86 % der öffentlichen Builds, im Endgame-PvE nutzen ihn die Creator kaum (couga54)',
      en: 'Suppressing Arrow is in 86% of public builds, but creators hardly use it in endgame PvE (couga54)',
    },
    evidence: [
      { id: 14070000, en: 'chance to inflict Stun for 3s while Precision is active', de: 'wenn sich der Wirker in [Letalität] befindet' },
      { id: 14090000, en: 'grants Precision for 10s', de: 'erhält für 10s [Letalität]' },
      { id: 14070000, part: 14070020, en: '+1s Stun duration', de: 'Betäubungsdauer +1 Sek.' },
      { id: 14070000, part: 14070040, en: '+20% Stun Chance', de: 'Betäubungschance +20 %' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'couga54 – Ranger guide', href: 'https://couga54.github.io/aion2-guides/en/ranger/' },
    ],
  },
  {
    id: 'sure-crit-drill-dart',
    kind: 'enable',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 14360000, part: 14360030 }, { id: 14090000, part: 14090050 }, { id: 14190000, part: 14190010 }],
    payoff: [{ id: 14050000 }],
    status: 'Critical Hit',
    title: {
      de: 'Sichere Krits schalten [[14050000]] frei',
      en: 'Guaranteed crits unlock [[14050000]]',
    },
    text: {
      de: '[[14050000]] wirkt nur nach einem Kritischen Treffer, so steht es im deutschen und im koreanischen Text. Sichere Krits liefern [[14360000]] ab Stigma-Stufe 15, [[14090000]] mit der Spezialisierung Stufe 16 und der erste Angriff aus [[14190000]] ab Stufe 5.',
      en: '[[14050000]] only works after a Critical Hit (the German and Korean texts say so; the English one ties only the MP to the crit). Guaranteed crits come from [[14360000]] from stigma level 15, [[14090000]] with its level 16 specialisation and the first attack out of [[14190000]] from level 5.',
    },
    how: {
      de: 'Meist schalten deine normalen Krits [[14050000]] von selbst frei, denn Letalität (+300) und [[14220000]] (+200) heben den Kritischen Treffer stark. Die sicheren Krits helfen vor allem beim ersten Schuss eines Kampfs. Wie lange [[14050000]] danach bereit bleibt, nennt keine Quelle.',
      en: 'Usually your normal crits unlock [[14050000]] on their own, since Precision (+300) and [[14220000]] (+200) raise Critical Hit a lot. The guaranteed crits matter mostly for the first shot of a fight. No source says how long [[14050000]] stays ready afterwards.',
    },
    usage: {
      de: 'Explosionspfeil steht in 38 % der öffentlichen Builds; die Stufe-16-Spezialisierung von Markierungsschuss wählt keiner der verglichenen Creator, Tarnung steht in höchstens 2 % der Builds',
      en: 'Explosive Arrow is in 38% of public builds; none of the compared creators picks Marking Shot’s level 16 specialisation, and Stealth is in 2% or fewer of builds',
    },
    evidence: [
      { id: 14050000, en: 'on landing a Critical Hit', de: 'Bei einem Kritischen Treffer:' },
      { id: 14360000, part: 14360030, en: 'Critical Hit on hit', de: 'Trifft garantiert als Kritischer Treffer' },
      { id: 14090000, part: 14090050, en: 'lands as a Critical Hit', de: 'Block/Ausweichen ignorieren, Kritischer Treffer' },
      { id: 14190000, part: 14190010, en: 'Critical Hit on attack during Stealth', de: 'Kritischer Treffer: Bei Angriff (Tarnung)' },
    ],
    sources: [
      { label: 'inven.co.kr – 궁성 skill list (KR tooltips)', href: 'https://www.inven.co.kr/board/aion2/6450/33' },
      { label: 'aion2vault – Best Ranger builds', href: 'https://aion2vault.com/builds/ranger/best/' },
    ],
  },
  {
    id: 'mother-natures-breath-passives',
    kind: 'buff',
    rating: 'situational',
    content: ['boss', 'pvp'],
    setup: [{ id: 14350000, part: 14350020 }, { id: 14350000, part: 14350030 }],
    payoff: [{ id: 14710000 }, { id: 14760000 }],
    window: 6,
    title: {
      de: '[[14350000]] verstärkt [[14710000]] und [[14760000]]',
      en: '[[14350000]] boosts [[14710000]] and [[14760000]]',
    },
    text: {
      de: 'Für 6 s macht [[14350000]] [[14710000]] (ab Stigma-Stufe 10) und [[14760000]] (ab Stufe 15) 1,5-mal so stark: mehr Ausweichen, Max. LP und Heilung bei erfolgreichem Ausweichen, dazu mehr Widerstand (Körper) und Widerstand (Schock).',
      en: 'For 6 s [[14350000]] makes [[14710000]] (from stigma level 10) and [[14760000]] (from level 15) 1.5 times as strong: more Evasion, Max HP and healing on a successful Evasion, plus more Ailment and Impact Resist.',
    },
    how: {
      de: 'Zünde [[14350000]] von Hand kurz vor einem großen Boss-Treffer oder wenn dich im PvP jemand angreift. Der Gewinn durch die Passiven ist klein; der Hauptnutzen bleibt die Schadensresistenz.',
      en: 'Fire [[14350000]] by hand just before a big boss hit or when you are burst in PvP. The passive bonus is small; the damage tolerance stays the main reason to use it.',
    },
    usage: {
      de: 'Atem der Natur steht in 14 % der öffentlichen globalen Builds, als einziger defensiver Stigma-Skill; bei den KR-PvP-Rankern sind es 92,9 % (aion2-meta)',
      en: 'Mother Nature’s Breath is in 14% of public global builds, as the only defensive stigma; 92.9% of KR PvP rankers run it (aion2-meta)',
    },
    evidence: [
      { id: 14350000, part: 14350020, en: 'x1.5 [Vigilant Eye] effect for the duration', de: '[Achtsames Auge]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 14350000, part: 14350030, en: 'x1.5 [Unyielding Resolve] effect for the duration', de: '[Entschlossenheit des Widerstands]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 14710000, en: 'HP on Evasion', de: 'bei erfolgreichem Ausweichen sofort' },
    ],
    sources: [
      { label: 'aion2vault – Ranger PvE build', href: 'https://aion2vault.com/builds/ranger/pve/' },
      { label: 'aion2vault – Best Ranger builds', href: 'https://aion2vault.com/builds/ranger/best/' },
      { label: 'aion2-meta – Ranger guide', href: 'https://aion2-meta.com/guides/ranger/' },
    ],
  },
];
