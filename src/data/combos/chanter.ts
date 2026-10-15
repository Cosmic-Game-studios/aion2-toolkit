import type { CuratedCombo } from './types';

/**
 * Chanter combos, checked by hand on 2026-10-15 and reviewed a second time the same day against the skill texts.
 * Every link below is written in the skill texts of the Global client (EN and DE data, all levels and the
 * specialisations); both languages were read for every skill. Where they differ we took the stricter reading and settled
 * it with Korean sources:
 * - Heat Wave Blow: the English text reads as if only its Seal needs a Block, the German one makes the whole skill a Block
 *   follow-up ("Fügt bei erfolgreichem Block ..."). The Inven 호법성 skill list ("막기 성공 시") and Hagoo's Inven guide
 *   ("usable when your Block triggers") agree with the German text.
 * - Rushing Smash's Heat Wave Blow option: EN says "trigger", DE says "Aktivierung", Hagoo says it lets you use Heat Wave
 *   Blow with a 50% chance (열파격 활성화) – so it unlocks the skill like a Block does, it does not cast it for you.
 * - Tremor Crush: EN puts "after using [Dodge] or while flying" at the end, DE makes the whole move conditional; the
 *   Korean list ("긴급 회피 사용 후") and aion2vault agree with DE.
 * - Spinning Strike's German window sentence says "Bei Einsatz einer Fähigkeit" (when a skill is used); we read it like
 *   the same sentence on Impactful Crush and the two stigmas, as aion2vault and fextralife do.
 * - "Impact-type status" means Stun, Knockdown and Airborne: Hagoo names exactly these three (기절, 넘어짐, 공중 속박),
 *   and the Korean Defiance (충격 해제, German "Schockaufhebung") lifts exactly those three.
 * - Focused Defense: both Global texts say it guarantees a Block (the Korean launch list says weapon block, and Hagoo
 *   counts weapon blocks as Block), so it counts as the Block that Heat Wave Blow and Crossguard ask for.
 * - Guardian Blessing: our data gives 300s duration on a 300s cooldown, metabot and aion2vault show 120s; either way the
 *   buff lasts as long as its cooldown, so it can be kept up all the time.
 * Bosses mostly have Incapacitated Immunity, so the Stun and Knockdown combos are marked for groups and PvP only; Wave
 * Blow's own 7% chance against immune targets is its boss route and needs no setup.
 * Usage numbers: aion2vault (public Global builds and macros on questlog.gg, read 2026-10-11 to 2026-10-14), metabot.gg
 * (top Global Chanters), aion2-meta.com (KR rankers), couga54's guide and Hagoo's guide on the Inven Chanter board (KR).
 * How-to notes follow Grobs, WallyJTV, notXeon, aLuckyRO, kazecaelum, dimach and Arthars Gaming as those sites summarise
 * them, in our own words. Key chains run priority (bottom of the stack) first.
 * Left out on purpose: Power of the Storm and Gust Rampage's level 16 option cut every cooldown alike; Spinning Strike's
 * Critical Damage Boost, the mantras, Attack Preparation and Earth's Promise raise every hit; Impact Hit only raises a
 * chance for every stun (Impactful Crush, Tremor Crush and Assault Shock already stun NPCs 100%); nothing in the kit pays
 * off Seal, Root, Exposed or the Defense, Accuracy and Damage Boost debuffs; Defiance's Crushing Strike chain (a stun in
 * Korea) has no text in the Global data.
 */
export const combos: CuratedCombo[] = [
  {
    id: 'dark-crush-window',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 18290000 }, { id: 18060000 }],
    payoff: [{ id: 18100000 }],
    window: 2,
    title: {
      de: '[[18290000]] und [[18060000]] öffnen [[18100000]]',
      en: '[[18290000]] and [[18060000]] open [[18100000]]',
    },
    text: {
      de: '[[18100000]] ist dein Hauptschaden, aber du kannst ihn nur kurz wirken: 2 s nach [[18290000]] oder [[18060000]]. Das Fenster geht beim Wirken auf, nicht erst beim Treffer. Unter Stufe 16 hat [[18100000]] 5 s Abklingzeit, also passt ein Einsatz in ein Fenster. Ab Stufe 16 fällt die Abklingzeit weg, dann wirkst du ihn, solange das Fenster offen ist.',
      en: '[[18100000]] is your main damage, but you can only cast it briefly: for 2s after [[18290000]] or [[18060000]]. The window opens on cast, not on hit. Below level 16 [[18100000]] has a 5s cooldown, so one cast fits in a window. From level 16 the cooldown is gone and you cast it for as long as the window is open.',
    },
    how: {
      de: 'Leg alles auf eine Taste: [[18100000]] unten (Vorrang), darüber [[18290000]], [[18060000]] und [[18040000]] als Füller. Die Taste wirkt [[18100000]], solange ein Fenster offen ist, sonst den nächsten bereiten Auslöser. Halte die Makro-Taste zusammen mit [[18010000]] auf der linken Maustaste. Diese Kette ist für [[18100000]] ab Stufe 16: Darunter nimmst du [[18060000]] heraus und drückst ihn selbst, sobald [[18100000]] wieder bereit ist, sonst verpufft das zweite Fenster (notXeon, Grobs).',
      en: 'Put everything on one key: [[18100000]] at the bottom (priority), above it [[18290000]], [[18060000]] and [[18040000]] as the filler. The key casts [[18100000]] while a window is open and the next ready trigger otherwise. Hold the macro key together with [[18010000]] on left click. This chain is for [[18100000]] at level 16: below that, take [[18060000]] out and press it yourself the moment [[18100000]] is ready again, or the second window goes to waste (notXeon, Grobs).',
    },
    stack: [18100000, 18290000, 18060000, 18040000],
    usage: {
      de: '64 % der öffentlichen Kantor-Makros nutzen genau diese Kette, auch die beiden meistgelikten (dimach, mourasb)',
      en: '64% of public Chanter macros use exactly this chain, including the two most-liked ones (dimach, mourasb)',
    },
    evidence: [
      { id: 18290000, en: '[Dark Crush] becomes available for 2s on skill use', de: 'Bei Einsatz einer Fähigkeit kann 2s lang die Fähigkeit [Finsterbruch] eingesetzt werden' },
      { id: 18060000, en: '[Dark Crush] becomes available for 2s on skill use', de: 'Bei Verwendung der Fähigkeit kann [Finsterbruch] für 2s verwendet werden' },
      { id: 18100000, part: 18100050, en: 'Removes [Dark Crush] cooldown', de: '[Finsterbruch]: Abklingzeit entfernt' },
    ],
    sources: [
      { label: 'aion2vault – Chanter overview', href: 'https://aion2vault.com/builds/chanter/' },
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'Fextralife – Chanter', href: 'https://aion2.wiki.fextralife.com/Chanter' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
    ],
  },
  {
    id: 'marchutans-wrath-dark-crush',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 18330000 }],
    payoff: [{ id: 18100000 }],
    window: 3,
    title: {
      de: '[[18330000]] öffnet [[18100000]] für 3 s',
      en: '[[18330000]] opens [[18100000]] for 3s',
    },
    text: {
      de: 'Auch [[18330000]] schaltet [[18100000]] beim Wirken frei, und zwar für 3 s – das längste Fenster der üblichen Auslöser. Mit 30 s Abklingzeit ist es ein dritter Auslöser neben [[18290000]] und [[18060000]], so fehlt seltener ein Fenster. Während du es wirkst, kannst du dich nicht bewegen (notXeon).',
      en: '[[18330000]] also unlocks [[18100000]] on cast, for 3s – the longest window of the usual triggers. On a 30s cooldown it is a third trigger next to [[18290000]] and [[18060000]], so a window is missing less often. You cannot move while you cast it (notXeon).',
    },
    how: {
      de: 'Grobs und WallyJTV legen es in die Hauptkette: [[18100000]] → [[18290000]] → [[18330000]] → [[18060000]]; [[18040000]] bekommt einen eigenen Makro-Schritt. Das gilt ab [[18100000]] Stufe 16. Davor drückst du [[18330000]] selbst, sobald [[18100000]] wieder bereit ist, sonst verpufft sein Fenster (aLuckyRO). kazecaelum und Arthars Gaming lassen es auch danach auf einer eigenen Taste, als Reserve für den Moment, in dem kein anderer Auslöser bereit ist. Im PvE reicht Stigma-Stufe 5 (Grobs).',
      en: 'Grobs and WallyJTV put it in the main chain: [[18100000]] → [[18290000]] → [[18330000]] → [[18060000]]; [[18040000]] gets a macro step of its own. That is for [[18100000]] at level 16. Before that, press [[18330000]] yourself the moment [[18100000]] is ready again, or its window goes to waste (aLuckyRO). kazecaelum and Arthars Gaming keep it on a key of its own even then, as a reserve for when no other trigger is ready. In PvE stigma level 5 is enough (Grobs).',
    },
    stack: [18100000, 18290000, 18330000, 18060000],
    usage: {
      de: 'Marchutans Zorn steht auf 78 % der öffentlichen Kantor-Leisten mit Stigma und in 17 von 19 PvP-Builds',
      en: 'Marchutan’s Wrath is on 78% of public Chanter bars with a stigma and in 17 of 19 PvP builds',
    },
    evidence: [
      { id: 18330000, en: '[Dark Crush] becomes available for 3s on skill use', de: 'Bei Verwendung der Fähigkeit kann [Finsterbruch] für 3s verwendet werden' },
      { id: 18100000, part: 18100050, en: 'Removes [Dark Crush] cooldown', de: '[Finsterbruch]: Abklingzeit entfernt' },
    ],
    sources: [
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'aion2vault – best Chanter builds', href: 'https://aion2vault.com/builds/chanter/best/' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
    ],
  },
  {
    id: 'onslaught-shortens-spinning-strike',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 18010000, part: 18010040 }],
    payoff: [{ id: 18290000 }],
    title: {
      de: '[[18010000]] verkürzt [[18290000]]',
      en: '[[18010000]] shortens [[18290000]]',
    },
    text: {
      de: 'Ab Stufe 12 bekommt [[18010000]] eine Option, mit der jeder Treffer 1 s von der Abklingzeit von [[18290000]] (30 s) abzieht. Weil du [[18010000]] die ganze Zeit hältst, kommt [[18290000]] viel früher zurück: mehr Fenster für [[18100000]]. Erst so bleiben auch beide Krit.-Schaden-Stapel von [[18290000]] oben: Ohne Verkürzung dauern Abklingzeit und Buff je 30 s, der Buff läuft also ab, sobald du [[18290000]] auch nur kurz zu spät wirkst.',
      en: 'From level 12 [[18010000]] gets an option that takes 1s off the cooldown of [[18290000]] (30s) on every hit. Since you hold [[18010000]] all the time, [[18290000]] comes back much sooner: more windows for [[18100000]]. It is also what keeps both Critical Damage stacks of [[18290000]] up: without a cut, cooldown and buff both last 30s, so the buff runs out as soon as you cast [[18290000]] even slightly late.',
    },
    how: {
      de: 'Wähl die Option, sobald [[18010000]] Stufe 12 hat, und halte [[18010000]] auf der linken Maustaste zusammen mit der Makro-Taste. Zwischen den Makro-Schritten bricht [[18010000]] Animationen ab und füllt das MP auf, das [[18040000]] kostet. Mit der Option −5 s auf [[18290000]] kommt es noch schneller zurück. Hagoo (KR) lässt die Option weg, ihm reichen die −5 s von [[18290000]] selbst.',
      en: 'Pick the option once [[18010000]] reaches level 12 and hold [[18010000]] on left click together with the macro key. Between macro steps [[18010000]] cancels animations and refills the MP that [[18040000]] costs. With the −5s option on [[18290000]] it comes back even faster. Hagoo (KR) skips the option; the −5s on [[18290000]] itself is enough for him.',
    },
    usage: {
      de: 'Grobs (Stufe 45), Arthars Gaming und die koreanischen Ranker bei aion2-meta nehmen diese Option, Hagoo nicht; 97 % der Kantoren haben Zerschmetterungsschlag auf der Leiste',
      en: 'Grobs (level 45), Arthars Gaming and the Korean rankers on aion2-meta take this option, Hagoo does not; 97% of Chanters have Onslaught on the bar',
    },
    evidence: [
      { id: 18010000, part: 18010040, en: '-1s [Spinning Strike] cooldown on hit', de: '[Wirbelschlag]-Abklingzeit −1s: Bei Treffer' },
      { id: 18290000, en: "Increases the caster's Critical Damage Boost by 15% for 30s on hit. Stacks up to 2 times.", de: 'Erhöht beim Treffer für 30s die eigene Krit.-Schadensverstärkung um 15 %. Maximal 2 Stapel.' },
      { id: 18290000, part: 18290010, en: '-5s cooldown', de: 'Abklingzeit −5 Sek.' },
    ],
    sources: [
      { label: 'aion2vault – Chanter overview', href: 'https://aion2vault.com/builds/chanter/' },
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
      { label: 'Fextralife – Chanter', href: 'https://aion2.wiki.fextralife.com/Chanter' },
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
    ],
  },
  {
    id: 'guaranteed-crit-winds-promise',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [
      { id: 18100000, part: 18100030 },
      { id: 18290000, part: 18290050 },
    ],
    payoff: [{ id: 18800000 }],
    status: 'Critical Hit',
    title: {
      de: 'Sichere Krits lösen [[18800000]] aus',
      en: 'Guaranteed crits trigger [[18800000]]',
    },
    text: {
      de: '[[18800000]] macht bei einem kritischen Treffer mit 50 % Chance Zusatzschaden, höchstens einmal pro Sekunde, und erhöht deine Krit.-Schadensverstärkung. Mit seiner Stufe-8-Option trifft [[18100000]] immer kritisch, jeder Einsatz im Fenster ist also eine Chance für [[18800000]]. Weil der Zusatzschaden 1 s Abklingzeit hat und du ohnehin oft kritisch triffst, kommen so nur wenige Procs dazu. Der größere Gewinn: Jeder [[18100000]] bekommt den vollen Krit.-Schaden-Bonus von [[18800000]] und den Stapeln von [[18290000]]. Die Stufe-16-Option von [[18290000]] macht auch seinen eigenen Treffer sicher kritisch.',
      en: '[[18800000]] deals extra damage with a 50% chance on a Critical Hit, at most once per second, and raises your Critical Damage Boost. With its level 8 option [[18100000]] always crits, so every cast inside the window is a chance for [[18800000]]. Because the extra damage has a 1s cooldown and you crit often anyway, this adds only a few procs. The bigger gain: every [[18100000]] gets the full Critical Damage bonus of [[18800000]] and of the [[18290000]] stacks. The level 16 option of [[18290000]] makes its own hit a sure crit as well.',
    },
    how: {
      de: 'Nimm bei [[18100000]] auf Stufe 8 die Krit-Option und behalte sie ab Stufe 16 neben „keine Abklingzeit“ (Grobs); WallyJTV nimmt stattdessen die Folge-Option. Bring [[18800000]] früh hoch, es hat keine Stufen-Sperre (couga54). Laut Hagoo (KR) ist die Krit-Chance bei 80 % gedeckelt, die sichere Krit-Option bringt [[18100000]] so rund 10 % mehr Schaden.',
      en: 'Take the crit option on [[18100000]] at level 8 and keep it next to "no cooldown" from level 16 (Grobs); WallyJTV takes the follow-up chain option instead. Raise [[18800000]] early, it has no level gate (couga54). According to Hagoo (KR) the crit chance is capped at 80%, so the guaranteed crit adds about 10% to [[18100000]].',
    },
    usage: {
      de: 'Gelübde des Windes hat bei metabots Top-Spielern die zweithöchste Durchschnittsstufe aller Passiven (13,6); die Krit-Option von Finsterbruch nehmen Grobs, aLuckyRO, Arthars Gaming und die koreanischen Ranker, aLuckyRO und WallyJTV nennen Gelübde des Windes als Grund',
      en: 'Wind’s Promise has the second-highest average level of all passives among metabot’s top players (13.6); Grobs, aLuckyRO, Arthars Gaming and the Korean rankers take Dark Crush’s crit option, and aLuckyRO and WallyJTV name Wind’s Promise as the reason',
    },
    evidence: [
      { id: 18100000, part: 18100030, en: 'Critical Hit on hit', de: 'Trifft garantiert als Kritischer Treffer' },
      { id: 18290000, part: 18290050, en: 'Ignores Block and Evasion and lands as a Critical Hit', de: 'Block/Ausweichen ignorieren, Kritischer Treffer' },
      { id: 18800000, en: 'extra damage to the target on landing a Critical Hit. Extra Damage Cooldown: 1s', de: 'Fügt einem Ziel bei Kritischer Treffer mit 50 % Chance zusätzlichen' },
    ],
    sources: [
      { label: 'aion2vault – Chanter overview', href: 'https://aion2vault.com/builds/chanter/' },
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
      { label: 'MetaBot – Chanter build planner (top players)', href: 'https://metabot.gg/en/aion-2/classes/chanter/build' },
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
    ],
  },
  {
    id: 'guardian-blessing-winds-promise',
    kind: 'buff',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 18420000, part: 18420030 }],
    payoff: [{ id: 18800000 }],
    window: 300,
    title: {
      de: '[[18420000]] verstärkt [[18800000]]',
      en: '[[18420000]] boosts [[18800000]]',
    },
    text: {
      de: 'Ab Stigma-Stufe 15 wirkt [[18800000]] ×1,5, solange [[18420000]] läuft: mehr Krit.-Schadensverstärkung und mehr Zusatzschaden. Der Segen hält so lange, wie seine Abklingzeit dauert (300 s in unseren Daten, 120 s bei metabot und aion2vault), du kannst ihn also immer oben halten. Er lässt sich nicht entfernen.',
      en: 'From stigma level 15, [[18800000]] works ×1.5 while [[18420000]] is up: more Critical Damage Boost and more extra damage. The blessing lasts as long as its cooldown (300s in our data, 120s on metabot and aion2vault), so you can keep it up all the time. It cannot be dispelled.',
    },
    how: {
      de: 'Wirk [[18420000]] vor dem Kampf und erneuere es, sobald es ausläuft. Es braucht Stigma-Stufe 15 und kostet den vierten Platz, meist den von [[18330000]] – dann fehlt dir ein Auslöser für [[18100000]]. dimach bringt dazu [[18800000]] auf 20. couga54 hält den Gewinn für echt, sieht bei vier Plätzen aber keinen Platz dafür.',
      en: 'Cast [[18420000]] before the pull and renew it when it runs out. It needs stigma level 15 and costs the fourth slot, usually the one of [[18330000]] – then you lose a trigger for [[18100000]]. dimach takes [[18800000]] to 20 alongside it. couga54 calls the gain real but sees no room for it with four slots.',
    },
    usage: {
      de: '14 % der öffentlichen Kantor-Builds; 9 % der Builds mit vier Stigmen tauschen Marchutans Zorn dagegen, darunter dimachs „PvE“, der meistgelikte Kantor-Build; 7 % der Top-Spieler bei metabot',
      en: '14% of public Chanter builds; 9% of four-stigma builds swap Marchutan’s Wrath for it, among them dimach’s "PvE", the most-liked Chanter build; 7% of metabot’s top players',
    },
    evidence: [
      { id: 18420000, part: 18420030, en: "x1.5 [Wind's Promise] effect for the duration", de: '[Gelübde des Windes]-Effekt ×1,5 während der Wirkungsdauer' },
      { id: 18420000, en: 'for 300s and immediately restores', de: 'für 300s die Max. LP des Wirkers' },
    ],
    sources: [
      { label: 'aion2vault – best Chanter builds', href: 'https://aion2vault.com/builds/chanter/best/' },
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
    ],
  },
  {
    id: 'stun-wave-blow',
    kind: 'enable',
    rating: 'strong',
    content: ['aoe', 'pvp'],
    setup: [
      { id: 18060000 },
      { id: 18210000 },
      { id: 18330000, part: 18330020 },
      { id: 18150000, part: 18150010 },
      { id: 18700000 },
    ],
    payoff: [{ id: 18080000 }],
    window: 3,
    status: 'Stun',
    title: {
      de: 'Betäubung öffnet [[18080000]]',
      en: 'Stun opens [[18080000]]',
    },
    text: {
      de: '[[18080000]] trifft nur ein betäubtes Ziel und wirft es 3 s in Niederschlag. [[18060000]] betäubt 3 s (60 %, gegen NPCs 100 %) und öffnet dabei auch [[18100000]]. Ebenso betäuben [[18210000]] (nur nach dem Ausweichen oder im Flug), [[18700000]], [[18330000]] ab Stigma-Stufe 10 und [[18150000]] mit seiner Stufe-8-Option. Bosse sind meist immun gegen Handlungsunfähigkeit, dort landet die Betäubung nicht. Gegen sie hat [[18080000]] nur eine eigene 7-%-Chance, die keine Vorbereitung braucht.',
      en: '[[18080000]] only hits a stunned target and knocks it down for 3s. [[18060000]] stuns for 3s (60%, 100% on NPCs) and opens [[18100000]] at the same time. [[18210000]] (only after a dodge or while flying), [[18700000]], [[18330000]] from stigma level 10 and [[18150000]] with its level 8 option stun too. Bosses mostly have Incapacitated Immunity, so the stun does not land there. Against them [[18080000]] only has its own 7% chance, which needs no setup.',
    },
    how: {
      de: 'Gegen Elite-Gegner: [[18060000]] → [[18100000]] → [[18080000]] → [[18290000]] → [[18100000]] (couga54). Die Betäubung hält 3 s: Wirk [[18100000]] im 2-s-Fenster und dann [[18080000]], bevor sie endet. Spammst du [[18100000]] ab Stufe 16 das ganze Fenster lang, bleibt dafür nur die letzte Sekunde; die Stufe-8-Option von [[18060000]] (+1 s Betäubung) gibt mehr Luft. Im PvP: nach dem Ausweichen [[18210000]], dann [[18080000]] auf das betäubte Ziel (metabot). [[18080000]] drückst du selbst, sobald er aufleuchtet.',
      en: 'Against elites: [[18060000]] → [[18100000]] → [[18080000]] → [[18290000]] → [[18100000]] (couga54). The stun lasts 3s: cast [[18100000]] in its 2s window and then [[18080000]] before the stun ends. If you spam [[18100000]] at level 16 for the whole window, only the last second is left for it; the level 8 option of [[18060000]] (+1s stun) gives more room. In PvP: [[18210000]] after a dodge, then [[18080000]] on the stunned target (metabot). Press [[18080000]] yourself when it lights up.',
    },
    usage: {
      de: 'Wellenschlag: 77 % der öffentlichen Leisten, 94 % der Top-Spieler bei metabot; 48 % der Top 48 auf Global lassen ihn aber unter Stufe 8',
      en: 'Wave Blow: 77% of public bars, 94% of metabot’s top players; but 48% of the Global top 48 leave it below level 8',
    },
    evidence: [
      { id: 18080000, en: 'to a target afflicted with Stun within 4m', de: 'Fügt einem Ziel mit Betäubung innerhalb von 4 m' },
      { id: 18060000, en: 'Has a 60% chance to inflict Stun for 3s. 100% chance to inflict Stun on NPC targets.', de: 'versetzt es mit 60 % Chance für 3s in Betäubung. Gegen NPCs beträgt die Trefferchance von Betäubung 100 %.' },
      { id: 18210000, en: 'with a 50% chance to inflict Stun for 3s after using [Dodge] or while flying', de: 'Versetzt es mit 50 % Chance für 3s in Betäubung' },
      { id: 18210000, en: 'after using [Dodge] or while flying', de: 'Bewegt sich bei Einsatz von [Notausweichen] oder im Flug' },
      { id: 18330000, part: 18330020, en: '50% chance to inflict Stun for 3s', de: 'Betäubung für 3s (50 % Chance)' },
      { id: 18150000, part: 18150010, en: '40% chance to inflict Stun for 3s', de: 'Betäubung für 3s (40 % Chance)' },
      { id: 18700000, en: 'with a 30% chance to inflict Stun for 3s', de: 'versetzt sie mit 30 % Chance für 3s in Betäubung' },
      { id: 18080000, en: 'Has a 7% chance to trigger on attacking a target with Incapacitated Immunity', de: 'Wird mit 7 % Chance bei Angriffen auf ein Ziel mit Handlungsunfähigkeits-Immunität aktiviert' },
      { id: 18060000, part: 18060020, en: '+1s [Impactful Crush] Stun duration', de: '[Wuchtschlag]: Betäubungsdauer +1 Sek.' },
    ],
    sources: [
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
      { label: 'MetaBot – Chanter build planner (top players)', href: 'https://metabot.gg/en/aion-2/classes/chanter/build' },
      { label: 'aion2vault – Chanter overview', href: 'https://aion2vault.com/builds/chanter/' },
      { label: 'Inven – 호법성 skill list (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/31' },
    ],
  },
  {
    id: 'rushing-smash-lowers-impact-resist',
    kind: 'debuff',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 18090000, part: 18090010 }],
    payoff: [{ id: 18060000 }, { id: 18210000 }, { id: 18330000, part: 18330020 }],
    window: 5,
    title: {
      de: '[[18090000]] senkt den Schock-Widerstand für [[18060000]]',
      en: '[[18090000]] lowers Impact Resist for [[18060000]]',
    },
    text: {
      de: 'Mit seiner Stufe-8-Option senkt jeder Treffer von [[18090000]] 5 s lang den Schock-Widerstand des Ziels um 20 %. Gegen NPCs bringt das nichts, dort betäuben [[18060000]] und [[18210000]] ohnehin zu 100 %. Gegen Spieler landen sie nur mit 60 % und 50 %, [[18330000]] ab Stigma-Stufe 10 mit 50 % – dort hilft der niedrigere Widerstand, und jede gelandete Betäubung öffnet [[18080000]]. Um wie viel die Chance steigt, steht nicht im Text.',
      en: 'With its level 8 option every hit of [[18090000]] lowers the target’s Impact-type Resist by 20% for 5s. Against NPCs that does nothing, [[18060000]] and [[18210000]] stun them 100% anyway. Against players they only land 60% and 50% of the time, [[18330000]] from stigma level 10 also 50% – that is where the lower resist helps, and every stun that lands opens [[18080000]]. The text does not say how much the chance rises.',
    },
    how: {
      de: 'Stürm mit [[18090000]] hinein und setz innerhalb von 5 s [[18060000]] nach, dann [[18100000]] im Fenster und [[18080000]] auf das betäubte Ziel. Die Option belegt einen Platz, den sonst die Option für [[18150000]] nimmt. Hagoo (KR) empfiehlt sie für PvP; keiner der Global-Creator, deren Builds wir gelesen haben, nimmt sie.',
      en: 'Dash in with [[18090000]] and follow up with [[18060000]] within 5s, then [[18100000]] in the window and [[18080000]] on the stunned target. The option takes a slot that the [[18150000]] option would otherwise use. Hagoo (KR) recommends it for PvP; none of the Global creators whose builds we read takes it.',
    },
    usage: {
      de: 'Hagoo (KR) nennt sie die PvP-Option von Sturmschlag; Grobs, WallyJTV, aLuckyRO und Arthars Gaming nehmen andere Optionen',
      en: 'Hagoo (KR) calls it Rushing Smash’s PvP option; Grobs, WallyJTV, aLuckyRO and Arthars Gaming take other options',
    },
    evidence: [
      { id: 18090000, part: 18090010, en: "target's Impact-type Resist for 5s", de: 'Widerstand (Schock) des Ziels für 5s' },
      { id: 18060000, en: 'Has a 60% chance to inflict Stun for 3s. 100% chance to inflict Stun on NPC targets.', de: 'versetzt es mit 60 % Chance für 3s in Betäubung. Gegen NPCs beträgt die Trefferchance von Betäubung 100 %.' },
      { id: 18210000, en: 'with a 50% chance to inflict Stun for 3s after using [Dodge] or while flying', de: 'Versetzt es mit 50 % Chance für 3s in Betäubung' },
      { id: 18330000, part: 18330020, en: '50% chance to inflict Stun for 3s', de: 'Betäubung für 3s (50 % Chance)' },
      { id: 18080000, en: 'to a target afflicted with Stun within 4m', de: 'Fügt einem Ziel mit Betäubung innerhalb von 4 m' },
    ],
    sources: [
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
    ],
  },
  {
    id: 'rushing-smash-heat-wave-blow',
    kind: 'enable',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [{ id: 18090000, part: 18090030 }],
    payoff: [{ id: 18150000 }],
    title: {
      de: '[[18090000]] schaltet [[18150000]] frei',
      en: '[[18090000]] unlocks [[18150000]]',
    },
    text: {
      de: '[[18150000]] kannst du sonst nur nach einem erfolgreichen Block wirken. Mit der Stufe-8-Option von [[18090000]] schaltet jeder Treffer [[18150000]] mit 50 % Chance frei, ganz ohne Block. Wie lange es dann bereit bleibt, steht nicht im Text. Das lohnt, wenn du oft stürmst: in Gegnergruppen, wo [[18090000]] mit der Stufe-12-Option bei jedem Kill zurückgesetzt wird, und im PvP. Am Boss ist [[18090000]] nur dein Weg hinein.',
      en: 'Otherwise you can only cast [[18150000]] after a successful Block. With the level 8 option of [[18090000]] every hit unlocks [[18150000]] with a 50% chance, no Block needed. How long it then stays ready is not stated. It pays off when you dash often: in packs, where the level 12 option resets [[18090000]] on every kill, and in PvP. On a boss [[18090000]] is only your way in.',
    },
    how: {
      de: 'Nimm die Option zusammen mit „Abklingzeit beim Besiegen zurücksetzen“, sobald [[18090000]] Stufe 12 hat (WallyJTV, Arthars Gaming). Hagoo (KR) nimmt sie auch, nennt sie aber schwach, weil [[18150000]] im PvE kaum zählt. Nach dem Ansturm drückst du [[18150000]], wenn es aufleuchtet. Oder leg [[18150000]] unten auf die Taste von [[18040000]]: Dann feuert es, sobald es frei ist, sonst kommt [[18040000]]. Auch Hagoo legt [[18150000]] auf seine Rechtsklick-Taste.',
      en: 'Take the option together with "reset on defeating an enemy" once [[18090000]] reaches level 12 (WallyJTV, Arthars Gaming). Hagoo (KR) takes it too but calls it weak, because [[18150000]] hardly matters in PvE. After the dash press [[18150000]] when it lights up. Or put [[18150000]] at the bottom of the [[18040000]] key: it fires whenever it is unlocked, and [[18040000]] comes otherwise. Hagoo also puts [[18150000]] on his right-click key.',
    },
    stack: [18150000, 18040000],
    usage: {
      de: 'WallyJTV, Arthars Gaming und Hagoo (KR) nehmen die Option, Grobs und aLuckyRO nicht; Hitzewellenschlag steht auf 75 % der öffentlichen Leisten',
      en: 'WallyJTV, Arthars Gaming and Hagoo (KR) take the option, Grobs and aLuckyRO do not; Heat Wave Blow is on 75% of public bars',
    },
    evidence: [
      { id: 18090000, part: 18090030, en: '50% chance to trigger [Heat Wave Blow] on hit', de: '[Hitzewellenschlag]-Aktivierung (50 % Chance): Bei [Sturmschlag]-Treffer' },
      { id: 18150000, en: 'with a 40% chance to inflict Seal for 3s on Block', de: 'Fügt bei erfolgreichem Block bis zu 4 Gegnern' },
      { id: 18090000, part: 18090040, en: 'Resets cooldown on defeating an enemy', de: 'Setzt beim Besiegen eines Gegners die Abklingzeit zurück.' },
    ],
    sources: [
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
    ],
  },
  {
    id: 'ensnaring-mark-dark-crush',
    kind: 'enable',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 18230000 }],
    payoff: [{ id: 18100000 }],
    window: 3,
    title: {
      de: '[[18230000]] öffnet [[18100000]] für 3 s',
      en: '[[18230000]] opens [[18100000]] for 3s',
    },
    text: {
      de: 'Auch [[18230000]] öffnet beim Wirken ein 3-s-Fenster für [[18100000]]. Dazu versiegelt es bis zu 4 Gegner (50 %, gegen NPCs 100 %), ab Stigma-Stufe 5 mit 50 % Chance zusätzlich mit Bann. Mit 60 s Abklingzeit ist es ein seltener Zusatz-Auslöser, auch am Boss; die Kontrolle lohnt vor allem gegen Gruppen und Spieler.',
      en: '[[18230000]] also opens a 3s window for [[18100000]] on cast. It seals up to 4 enemies as well (50%, 100% on NPCs), and from stigma level 5 it roots them with a 50% chance too. On a 60s cooldown it is a rare extra trigger, on bosses as well; the crowd control pays off mostly against groups and players.',
    },
    how: {
      de: 'Drück es selbst, wenn die Gruppe zusammensteht oder am Boss gerade kein anderer Auslöser bereit ist, und spam danach [[18100000]]. In einer Makro-Kette würde das Makro die 60-s-Kontrolle auch an Einzelgegner verschwenden. aLuckyRO spielt es am Anfang statt [[18250000]]; die koreanischen Ranker, die mehr Stigma-Plätze haben, drücken es laut aion2-meta neben [[18330000]] von Hand.',
      en: 'Press it yourself when the pack is together or when no other trigger is ready on a boss, then spam [[18100000]]. In a macro chain the macro would also spend the 60s crowd control on single enemies. aLuckyRO runs it instead of [[18250000]] early on; the Korean rankers, who have more stigma slots, press it by hand next to [[18330000]] according to aion2-meta.',
    },
    usage: {
      de: '5 % der öffentlichen Kantor-Builds, 4 von 19 PvP-Builds; aLuckyROs Stigmen für den Anfang; 21 % der koreanischen PvE-Ranker',
      en: '5% of public Chanter builds, 4 of 19 PvP builds; aLuckyRO’s early-game stigmas; 21% of Korean PvE rankers',
    },
    evidence: [
      { id: 18230000, en: '[Dark Crush] becomes available for 3s on skill use', de: 'Bei Verwendung der Fähigkeit kann [Finsterbruch] für 3s verwendet werden' },
      { id: 18230000, en: 'with a 50% chance to inflict Seal for 5s', de: 'versetzt sie mit 50 % Chance für 5s in Siegel' },
      { id: 18230000, part: 18230010, en: '50% chance to inflict Root', de: 'Bann (50 % Chance)' },
    ],
    sources: [
      { label: 'aion2vault – Chanter overview', href: 'https://aion2vault.com/builds/chanter/' },
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'aion2vault – best Chanter builds', href: 'https://aion2vault.com/builds/chanter/best/' },
      { label: 'aion2-meta – Chanter guide (KR rankers)', href: 'https://aion2-meta.com/guides/chanter/' },
    ],
  },
  {
    id: 'block-heat-wave-blow',
    kind: 'enable',
    rating: 'situational',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 18140000 }, { id: 18040000, part: 18040020 }, { id: 18720000 }],
    payoff: [{ id: 18150000 }],
    status: 'Block',
    title: {
      de: 'Ein Block schaltet [[18150000]] frei',
      en: 'A Block unlocks [[18150000]]',
    },
    text: {
      de: '[[18150000]] ist eine Antwort auf einen erfolgreichen Block. So steht es im deutschen Text und in der koreanischen Skill-Liste; der englische klingt, als bräuchte nur das Siegel den Block. [[18140000]] garantiert dir kurz den Block, die Stufe-8-Option von [[18040000]] (+200 Block beim Wirken) und die Passive [[18720000]] (+200 Block) erhöhen die Chance nebenbei. Ab Stufe 16 kann jeder Block [[18150000]] mit 25 % Chance zurücksetzen.',
      en: '[[18150000]] answers a successful Block. That is what the German text and the Korean skill list say; the English one reads as if only the Seal needs the Block. [[18140000]] guarantees the Block for a short time, while the level 8 option of [[18040000]] (+200 Block while casting) and the passive [[18720000]] (+200 Block) raise the chance on the side. From level 16 every Block can reset [[18150000]] with a 25% chance.',
    },
    how: {
      de: 'Ein Block braucht einen Treffer, der dich wirklich erreicht. Wirk [[18140000]] kurz vor einem Schlag, den du ohnehin abbekommst, und antworte mit [[18150000]]. WallyJTV baut auf Block und drückt [[18150000]] nach jedem Block selbst; Hagoo rät im PvE davon ab, weil du dafür getroffen werden musst. Du kannst [[18150000]] auch unten auf die Taste von [[18040000]] legen.',
      en: 'A Block needs a hit that actually reaches you. Cast [[18140000]] just before a blow you would take anyway and answer with [[18150000]]. WallyJTV builds Block and presses [[18150000]] himself after each Block; Hagoo advises against it in PvE because you have to get hit for it. You can also put [[18150000]] at the bottom of the [[18040000]] key.',
    },
    stack: [18150000, 18040000],
    usage: {
      de: 'Hitzewellenschlag: 75 % der öffentlichen Leisten; Fokussierte Verteidigung: 9 % der Builds (metabot 37 %), 5 von 19 PvP-Builds; +200 Block auf Gleißschlag nehmen Grobs und WallyJTV',
      en: 'Heat Wave Blow: 75% of public bars; Focused Defense: 9% of builds (metabot 37%), 5 of 19 PvP builds; Grobs and WallyJTV take +200 Block on Incandescent Blow',
    },
    evidence: [
      { id: 18150000, en: 'with a 40% chance to inflict Seal for 3s on Block', de: 'Fügt bei erfolgreichem Block bis zu 4 Gegnern' },
      { id: 18140000, en: 'Temporarily increases Block Damage Reduction by 100% and guarantees Block.', de: 'Erhöht vorübergehend die Block-Schadensreduktion um 100 % und garantiert Block.' },
      { id: 18040000, part: 18040020, en: '+200 Block while using skill', de: 'Block +200: Während Fäh.-Ausführung' },
      { id: 18720000, en: "Increases the caster's Block by 200", de: 'Erhöht den eigenen Block um 200' },
      { id: 18150000, part: 18150050, en: '25% chance to reset [Heat Wave Blow] cooldown on Block', de: '[Hitzewellenschlag]-Abklingzeit zurücksetzen (25 % Chance): Bei erfolgreichem Block' },
    ],
    sources: [
      { label: 'aion2vault – Chanter overview', href: 'https://aion2vault.com/builds/chanter/' },
      { label: 'aion2vault – best Chanter builds', href: 'https://aion2vault.com/builds/chanter/best/' },
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
      { label: 'Inven – 호법성 skill list (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/31' },
    ],
  },
  {
    id: 'focused-defense-crossguard',
    kind: 'proc',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 18140000 }],
    payoff: [{ id: 18720000 }],
    status: 'Block',
    title: {
      de: '[[18140000]] löst [[18720000]] aus',
      en: '[[18140000]] triggers [[18720000]]',
    },
    text: {
      de: '[[18720000]] heilt dich bei jedem erfolgreichen Block, höchstens einmal pro Sekunde. [[18140000]] garantiert den Block und erhöht die Block-Schadensreduktion um 100 %, jeder geblockte Schlag heilt dich also zusätzlich. Mit [[18420000]] ab Stigma-Stufe 10 wirkt [[18720000]] ×1,5.',
      en: '[[18720000]] heals you on every successful Block, at most once per second. [[18140000]] guarantees the Block and raises Block Damage Reduction by 100%, so every blocked hit also heals you. With [[18420000]] from stigma level 10, [[18720000]] works ×1.5.',
    },
    how: {
      de: 'Im PvP wirkst du [[18140000]], wenn der Gegner seinen Burst startet. Ab Stigma-Stufe 5 hast du zwei Einsätze nacheinander, ab Stufe 10 geht es in der Bewegung. dimach spielt im PvP [[18140000]] statt [[18250000]] und bringt [[18720000]] auf 20. Im PvE halten notXeon und aLuckyRO die Heilung von [[18720000]] für zu klein.',
      en: 'In PvP cast [[18140000]] when the enemy starts their burst. From stigma level 5 you get two uses in a row, from level 10 it works while moving. dimach runs [[18140000]] instead of [[18250000]] in PvP and takes [[18720000]] to 20. In PvE notXeon and aLuckyRO find the heal of [[18720000]] too small.',
    },
    usage: {
      de: 'Fokussierte Verteidigung: 5 von 19 öffentlichen PvP-Builds (auch dimachs „PvP“), 37 % der Top-Spieler bei metabot',
      en: 'Focused Defense: 5 of 19 public PvP builds (dimach’s "PvP" too), 37% of metabot’s top players',
    },
    evidence: [
      { id: 18140000, en: 'Temporarily increases Block Damage Reduction by 100% and guarantees Block.', de: 'Erhöht vorübergehend die Block-Schadensreduktion um 100 % und garantiert Block.' },
      { id: 18720000, en: 'HP on Block. Cooldown: 1s', de: 'und regeneriert bei erfolgreichem Block' },
      { id: 18420000, part: 18420020, en: 'x1.5 [Crossguard] effect for the duration', de: '[Kreuzverteidigung]-Effekt ×1,5 während der Wirkungsdauer' },
      { id: 18140000, part: 18140010, en: '+1 consecutive use', de: 'Folge-Einsatz +1' },
    ],
    sources: [
      { label: 'aion2vault – best Chanter builds', href: 'https://aion2vault.com/builds/chanter/best/' },
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
    ],
  },
  {
    id: 'impact-status-bonus',
    kind: 'status',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [
      { id: 18060000 },
      { id: 18210000 },
      { id: 18080000 },
      { id: 18220000 },
      { id: 18330000, part: 18330020 },
      { id: 18700000 },
    ],
    payoff: [{ id: 18130000 }, { id: 18100000, part: 18100020 }, { id: 18770000 }],
    window: 3,
    status: 'Stun / Knockdown',
    title: {
      de: 'Betäubung und Niederschlag verstärken [[18130000]]',
      en: 'Stun and Knockdown boost [[18130000]]',
    },
    text: {
      de: 'Schock-Status heißt Betäubung, Niederschlag oder Luftbann. [[18130000]] macht gegen solche Ziele 20 % mehr Schaden, ab Stigma-Stufe 20 noch einmal 30 % mehr. Die Stufe-8-Option von [[18100000]] gibt Zusatzschaden, und die Passive [[18770000]] trifft mit Extraschaden (1 s Abklingzeit). Den Status setzen [[18060000]], [[18210000]], [[18700000]] und [[18330000]] ab Stigma-Stufe 10 (Betäubung) sowie [[18080000]] und [[18220000]] (Niederschlag). Bosse sind meist immun, also nur gegen Gruppen und Spieler.',
      en: 'Impact-type status means Stun, Knockdown or Airborne. [[18130000]] deals 20% more damage to such targets, another 30% from stigma level 20. The level 8 option of [[18100000]] adds extra damage, and the passive [[18770000]] adds a bonus hit (1s cooldown). [[18060000]], [[18210000]], [[18700000]] and [[18330000]] from stigma level 10 apply it (Stun), [[18080000]] and [[18220000]] too (Knockdown). Bosses are mostly immune, so this is for groups and players only.',
    },
    how: {
      de: 'Betäube zuerst ([[18060000]] oder [[18210000]]), setz mit [[18080000]] 3 s Niederschlag nach und stürm dann mit [[18130000]] hinein. Die Option von [[18100000]] konkurriert mit der Krit-Option und wird kaum genommen; [[18770000]] ist laut notXeon und couga54 die Punkte nicht wert.',
      en: 'Stun first ([[18060000]] or [[18210000]]), follow with 3s of Knockdown from [[18080000]], then rush in with [[18130000]]. The option of [[18100000]] competes with the crit option and is hardly taken; notXeon and couga54 rate [[18770000]] not worth the points.',
    },
    usage: {
      de: 'Schmetterschlag: 7 % der öffentlichen Kantor-Builds, 11 % der Top-Spieler bei metabot',
      en: 'Fracturing Blow: 7% of public Chanter builds, 11% of metabot’s top players',
    },
    evidence: [
      { id: 18130000, en: 'Increases damage by 20% to targets afflicted with an Impact-type status.', de: 'Erhöht den Schaden gegen Ziele mit einem Status vom Typ Schock um 20 %.' },
      { id: 18130000, part: 18130040, en: '+30% additional Impact-type Status target damage', de: 'Schaden gegen Ziele mit Schock +30 %' },
      { id: 18100000, part: 18100020, en: 'Deals extra damage on attacking a target afflicted with Impact-type status', de: 'Zusatzschaden bei Angriff auf Ziele mit Schock-Statuseffekt' },
      { id: 18770000, en: 'extra damage to targets afflicted with Stagger or an Impact-type status', de: 'einem Ziel mit Schockstatus zusätzlichen' },
      { id: 18080000, en: 'inflicts Knockdown for 3s', de: 'versetzt es für 3s in Niederschlag' },
      { id: 18220000, en: 'with a 50% chance to inflict Knockdown', de: 'versetzt sie mit 50 % Chance in Niederschlag' },
      { id: 18060000, en: 'Has a 60% chance to inflict Stun for 3s', de: 'versetzt es mit 60 % Chance für 3s in Betäubung' },
      { id: 18700000, en: 'with a 30% chance to inflict Stun for 3s', de: 'versetzt sie mit 30 % Chance für 3s in Betäubung' },
      { id: 18330000, part: 18330020, en: '50% chance to inflict Stun for 3s', de: 'Betäubung für 3s (50 % Chance)' },
    ],
    sources: [
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
      { label: 'Inven – 호법성 skill list (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/31' },
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
    ],
  },
  {
    id: 'obliterate-stagger-gust-rampage',
    kind: 'enable',
    rating: 'situational',
    content: ['boss'],
    setup: [{ id: 18220000 }],
    payoff: [{ id: 18300000 }, { id: 18770000 }],
    status: 'Stagger',
    title: {
      de: 'Benommenheit öffnet [[18300000]]',
      en: 'Stagger opens [[18300000]]',
    },
    text: {
      de: '[[18300000]] trifft nur ein benommenes Ziel, und benommen wird ein Boss erst, wenn seine Benommen-Leiste voll ist. [[18220000]] füllt sie mit einem Einsatz um 50 – mehr als jede andere Kantor-Fähigkeit pro Einsatz ([[18130000]] 20, [[18290000]] 15). Solange der Boss benommen ist, spammst du [[18300000]], er hat keine Abklingzeit; mit der Stufe-16-Option nimmt jeder Treffer 1 s von allen Abklingzeiten. Die Passive [[18770000]] trifft benommene Ziele zusätzlich, höchstens einmal pro Sekunde.',
      en: '[[18300000]] only hits a staggered target, and a boss is only staggered once its Stagger Gauge is full. [[18220000]] adds 50 in one cast – more per cast than any other Chanter skill ([[18130000]] 20, [[18290000]] 15). While the boss is staggered you spam [[18300000]], it has no cooldown; with its level 16 option every hit takes 1s off all cooldowns. The passive [[18770000]] adds a bonus hit on staggered targets, at most once per second.',
    },
    how: {
      de: 'WallyJTV nimmt [[18220000]] für Bosse mit Benommen-Mechanik statt [[18250000]] und hebt es für diesen Moment auf. Im Fenster spammst du [[18300000]] selbst. Leg es nicht mit Vorrang in eine Makro-Kette, sonst blockiert es die Taste, solange der Boss benommen ist. Wer [[18250000]] behält, zündet es laut Hagoo (KR) kurz vor der Benommenheit: Mit mehr Kampftempo trifft [[18300000]] öfter und zieht mehr Abklingzeit ab. notXeon lässt [[18300000]] weg, sobald [[18100000]] Stufe 16 hat; [[18770000]] halten notXeon und couga54 für die Punkte nicht wert.',
      en: 'WallyJTV runs [[18220000]] instead of [[18250000]] for bosses with a stagger check and saves it for that moment. Inside the window spam [[18300000]] yourself. Do not give it priority in a macro chain, or it hogs the key for as long as the boss is staggered. If you keep [[18250000]], Hagoo (KR) fires it just before the stagger: with more Combat Speed [[18300000]] hits more often and cuts more cooldown. notXeon drops [[18300000]] once [[18100000]] reaches level 16; notXeon and couga54 rate [[18770000]] not worth the points.',
    },
    usage: {
      de: 'Flammenauslöschung: 1 % der öffentlichen Builds, 29 % der Top-Spieler bei metabot; Sturmraserei: 72 % der Leisten',
      en: 'Obliterate: 1% of public builds, 29% of metabot’s top players; Gust Rampage: 72% of bars',
    },
    evidence: [
      { id: 18300000, en: 'damage to a target afflicted with Stagger within 4m', de: 'Fügt einem benommenen Ziel innerhalb von 4 m' },
      { id: 18220000, en: '50 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 50' },
      { id: 18300000, part: 18300050, en: '-1s all skill cooldowns on hit', de: 'Abklingzeit (Alle Fäh.) −1s: Bei Treffer' },
      { id: 18770000, en: 'extra damage to targets afflicted with Stagger or an Impact-type status', de: 'Fügt einem benommenen Ziel oder einem Ziel mit Schockstatus zusätzlichen' },
    ],
    sources: [
      { label: 'aion2vault – Chanter PvE build', href: 'https://aion2vault.com/builds/chanter/pve/' },
      { label: 'couga54 – Chanter guide', href: 'https://couga54.github.io/aion2-guides/en/chanter/' },
      { label: 'MetaBot – Chanter build planner (top players)', href: 'https://metabot.gg/en/aion-2/classes/chanter/build' },
      { label: 'Inven – 호법성 guide by Hagoo (KR)', href: 'https://www.inven.co.kr/board/aion2/6451/116' },
    ],
  },
];
