import type { CuratedCombo } from './types';

/**
 * Assassin (살성) combos, hand-checked 2026-10-15 and reviewed adversarially the same day.
 * Every link was read in both the English and the German skill text of the global client (level-10 text, all
 * specialisations); a combo is listed only if the setup really creates the condition the payoff names (Insignia stacks,
 * a Critical Hit, Stun, Blind, an Evasion, a position behind the target, a named cooldown cut or a named passive).
 * Where EN and DE disagree it was settled with Korean and global sources:
 * - Whirlwind Slice: EN ties "on Evasion" only to the Stun, DE ("Fügt bei erfolgreichem Ausweichen … zu") to the whole
 *   skill. The Korean skill list on Inven (회피 성공 시 대상에게 피해를 주고), aion2vault and game8 ("Cast Condition: On
 *   Evasion, On landing Ambush") confirm the DE reading: the skill is usable only after an Evasion or an Ambush proc.
 * - Infiltrate: EN puts "after using [Dodge] or while flying" after the Blind clause, DE ties it to the teleport; the
 *   Korean text (긴급 회피 사용 후 대상의 뒤편으로 이동) and aion2vault confirm the whole skill needs a Dodge.
 * - Defense Break: EN "Stagger or an Impact-type status", DE only "Schockstatus". Here the broader reading is the real
 *   one: the Korean text says 그로기 또는 충격계 상태 (Stagger or Impact-type) and a Korean PvE guide uses it in stagger windows.
 * - Triniel's Dagger level 10 ("-10% all skill cooldowns on hit"): the text does not say of what. Lainer's Korean Inven
 *   guide: 10% of the remaining cooldown per hit (남은 쿨 기준), applied twice while Illusive Clone runs.
 * - Heart Gore level 16 ("Resets … on landing a Critical Hit"): read as Heart Gore's own crit, as game8 words it
 *   ("on landing as Critical Hit"); with any crit, an always-crit Quick Slice would make Illusive Clone's main effect moot.
 * Bosses usually have Incapacitated Immunity, so Stun / Knockdown / Airborne combos are marked without `boss`. Shadow
 * Fall's 5% trigger against immune targets comes from any attack, not from a setup, so it is only a note. Whether bosses
 * take Blind is not stated anywhere we could check, so the Blind combos carry no `boss` tag either.
 * Usage numbers: aion2vault.com counts of public questlog.gg builds (global, read 2026-10-11 / 2026-10-14), metabot.gg
 * top players, aion2-meta.com Korean rankers. Play advice: Grobs, Nellan97, delcatta (via aion2vault), fextralife,
 * game8 and Korean Inven board guides (secondary: Korean client, other patch).
 */
export const combos: CuratedCombo[] = [
  // ───────────────────────────── core ─────────────────────────────
  {
    id: 'insignia-build-explosion',
    kind: 'stack',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [
      { id: 13100000 },
      { id: 13350000, part: 13350020 },
      { id: 13060000, part: 13060010 },
      { id: 13720000 },
      { id: 13220000, part: 13220020 },
    ],
    payoff: [{ id: 13130000 }],
    window: 10,
    status: 'Insignia',
    title: {
      de: 'Glyphen binden, mit [[13130000]] zünden',
      en: 'Engrave Insignias, detonate them with [[13130000]]',
    },
    text: {
      de: 'Jeder Treffer von [[13100000]] und seiner Folge bindet 1 Glyphe (10 s, bis zu 5 Stapel). [[13130000]] verbraucht die Stapel: Schaden und Betäubungschance steigen mit jedem Stapel, gegen NPCs ist die Chance doppelt. Weitere Glyphen kommen von [[13350000]] (Stufe 8), [[13060000]] von hinten (Stufe 8), [[13220000]] (Stufe 8, 3 Glyphen) und den Trugbildern von [[13720000]].',
      en: 'Every hit of [[13100000]] and its chain engraves 1 Insignia (10 s, up to 5 stacks). [[13130000]] consumes them: its damage and Stun chance rise with every stack, and the chance doubles against NPCs. [[13350000]] (level 8), [[13060000]] from behind (level 8), [[13220000]] (level 8, 3 Insignias) and the clones of [[13720000]] add more.',
    },
    how: {
      de: 'Setz [[13130000]] an die erste Stelle der Makro-Kette und [[13100000]] an die letzte: Die Explosion geht, sobald sie bereit ist, und dazwischen füllt [[13100000]] (0 s Abklingzeit) die Stapel wieder auf. Halte dazu [[13010000]] auf der linken Maustaste. Die häufigste Version (27 %) setzt [[13060000]] und [[13340000]] dazwischen: [[13060000]] bindet nur mit seiner Stufe-8-Option und nur von hinten Glyphen, [[13340000]] geht nur in der Benommenheit und wird sonst übersprungen. Grobs’ Version (21 %) nimmt stattdessen [[13350000]]. Mit Stufe 8 von [[13130000]] bleiben 2 Stapel nach der Explosion liegen (Grobs); Nellan97 und delcatta nehmen dort lieber Mehrfachtreffer, weil ihre Explosion ohnehin auf 5 Stapel trifft.',
      en: 'Put [[13130000]] first in the macro chain and [[13100000]] last: the Explosion fires as soon as it is ready, and in between [[13100000]] (0 s cooldown) rebuilds the stacks. Hold [[13010000]] on the left mouse button at the same time. The most common version (27%) puts [[13060000]] and [[13340000]] in between: [[13060000]] engraves Insignias only with its level-8 option and only from behind, and [[13340000]] works only during a stagger and is skipped otherwise. Grobs’ version (21%) has [[13350000]] there instead. With level 8 of [[13130000]] two stacks stay after the Explosion (Grobs); Nellan97 and delcatta take Multi-Hit there instead, because their Explosion already lands on 5 stacks.',
    },
    stack: [13130000, 13060000, 13340000, 13100000],
    usage: {
      de: '68 % der öffentlichen Assassinen-Makros nutzen eine der drei Versionen dieser Kette: mit Hinterhalt und Sturmwirbel 27 %, mit Herzstoß 21 %, mit Reißzahn der Bestie davor 20 %',
      en: '68% of public Assassin macros use one of three versions of this chain: with Ambush and Storm Rampage 27%, with Heart Gore 21%, with Savage Fang in front 20%',
    },
    evidence: [
      { id: 13100000, en: 'engraves 1 Insignia for 10s', de: 'bindet 1 Glyphe für 10s' },
      { id: 13100000, chain: 'Savage Back Kick', en: 'engraves 1 Insignia for 10s', de: 'bindet 1 Glyphe für 10s' },
      { id: 13130000, en: 'Damage and Stun chance increase based on Insignia stacks', de: 'Schaden und Betäubungschance erhöhen sich pro Glyphenstapel' },
      { id: 13130000, en: 'Stun chance is doubled on NPC targets', de: 'Gegen NPCs verdoppelt sich die Betäubungschance' },
      { id: 13130000, part: 13130030, en: 'Keep 2 stacks of Insignias after [Insignia Explosion]', de: '2 Glyphenstapel bleiben nach [Glyphenexplosion] erhalten' },
      { id: 13350000, part: 13350020, en: 'Engraves 1 Insignia for 10s on hit', de: '1 Glyphe für 10s binden: Bei Treffer' },
      { id: 13060000, part: 13060010, en: 'Engraves 2 Insignias for 10s on landing as a Back attack', de: '2 Glyphen für 10s binden: Bei Treffer (Rückseitig)' },
      { id: 13220000, part: 13220020, en: 'Engraves 3 Insignias for 10s on hit', de: '3 Glyphen für 10s binden: Bei Treffer' },
      { id: 13720000, en: 'inflicts Insignia that lasts for 10s (up to 5 Insignia stacks)', de: 'für 10s eine Glyphe binden (Max. 5 Glyphenstapel)' },
      { id: 13340000, en: 'to a target afflicted with Stagger within 4m', de: 'einem benommenen Ziel innerhalb von 4 m' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (Grobs, Nellan97, delcatta)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2vault.com – macro guide (public questlog.gg macros)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'Fextralife – Assassin', href: 'https://aion2.wiki.fextralife.com/Assassin' },
    ],
  },
  {
    id: 'savage-fang-full-stack',
    kind: 'stack',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 13270000 }, { id: 13140000, part: 13140020 }],
    payoff: [{ id: 13130000 }],
    window: 10,
    status: 'Insignia',
    title: {
      de: '[[13270000]]: 5 Glyphen auf einen Schlag',
      en: '[[13270000]]: five Insignias in one hit',
    },
    text: {
      de: '[[13270000]] bindet sofort 5 Glyphen auf bis zu 4 Gegnern. Die nächste [[13130000]] trifft damit mit vollem Schaden und (auf Stufe 10) 50 % Betäubungschance, gegen NPCs mit 100 %. Bosse sind gegen Betäubung meist immun, der höhere Schaden zählt trotzdem. [[13140000]] bindet ab Stufe 10 ebenfalls 5 Glyphen.',
      en: '[[13270000]] engraves 5 Insignias on up to 4 enemies at once. The next [[13130000]] then hits with full damage and (at level 10) a 50% Stun chance, 100% against NPCs. Bosses are usually immune to Stun, but the extra damage still counts. From level 10, [[13140000]] engraves 5 Insignias as well.',
    },
    how: {
      de: 'Setz [[13270000]] an die erste Stelle der Kette, vor [[13130000]], [[13350000]] und [[13100000]] (Grobs’ Makro auf Stufe 45). So trifft schon die erste Explosion eines Kampfes 5 Stapel, und [[13270000]] geht danach jedes Mal von selbst, wenn er wieder bereit ist.',
      en: 'Put [[13270000]] first in the chain, ahead of [[13130000]], [[13350000]] and [[13100000]] (Grobs’ level-45 macro). The first Explosion of a fight already hits 5 stacks, and [[13270000]] fires again by itself whenever it is ready.',
    },
    stack: [13270000, 13130000, 13350000, 13100000],
    usage: {
      de: '20 % der öffentlichen Assassinen-Makros; der Stigma steht auf 67 % der öffentlichen Leisten (513 Builds)',
      en: '20% of public Assassin macros; the stigma is on 67% of public skill bars (513 builds)',
    },
    evidence: [
      { id: 13270000, en: 'engraves 5 Insignias for 10s', de: 'bindet 5 Glyphen für 10s' },
      { id: 13130000, en: 'Damage and Stun chance increase based on Insignia stacks', de: 'Schaden und Betäubungschance erhöhen sich pro Glyphenstapel' },
      { id: 13130000, en: 'Stun chance is doubled on NPC targets', de: 'Gegen NPCs verdoppelt sich die Betäubungschance' },
      { id: 13140000, part: 13140020, en: 'Engraves 5 Insignias for 10s on hit', de: '5 Glyphen für 10s binden: Bei Treffer' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (Grobs’ opener and macro)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2vault.com – best Assassin builds', href: 'https://aion2vault.com/builds/assassin/best/' },
      { label: 'Fextralife – Assassin', href: 'https://aion2.wiki.fextralife.com/Assassin' },
    ],
  },
  {
    id: 'crit-heart-gore',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [
      { id: 13010000, part: 13010050 },
      { id: 13270000, part: 13270040 },
      { id: 13020000, part: 13020030 },
      { id: 13180000, part: 13180010 },
    ],
    payoff: [{ id: 13350000 }],
    status: 'Critical Hit',
    title: {
      de: 'Kritische Treffer schalten [[13350000]] frei',
      en: 'Critical Hits unlock [[13350000]]',
    },
    text: {
      de: '[[13350000]] wird erst durch einen Kritischen Treffer aktiviert. Ab Stufe 16 trifft [[13010000]] immer kritisch, also macht jeder Linksklick [[13350000]] bereit. Sichere Krits geben auch [[13270000]] (Stigma-Stufe 20), [[13020000]] (Stufe 15) und [[13180000]] (Stufe 5, Angriff aus der Tarnung). Mit Stufe 16 setzt sich [[13350000]] zurück, wenn er kritisch trifft.',
      en: '[[13350000]] is activated only by a Critical Hit. From level 16, [[13010000]] always crits, so every left click readies [[13350000]]. [[13270000]] (stigma level 20), [[13020000]] (level 15) and [[13180000]] (level 5, attacking from Stealth) give guaranteed crits too. At level 16, [[13350000]] resets itself when it lands as a crit.',
    },
    how: {
      de: 'Halte [[13010000]] auf der linken Maustaste und gleichzeitig das Makro mit [[13130000]] → [[13350000]] → [[13100000]]. Die Kette überspringt [[13350000]], bis ein Krit es freischaltet, und feuert es dann sofort. Stufe 16 von [[13010000]] und von [[13350000]] sind die beiden wichtigsten Ziele beim Leveln.',
      en: 'Hold [[13010000]] on the left mouse button together with the macro [[13130000]] → [[13350000]] → [[13100000]]. The chain skips [[13350000]] until a crit unlocks it, then fires it at once. Level 16 of [[13010000]] and of [[13350000]] are the two key levelling goals.',
    },
    stack: [13130000, 13350000, 13100000],
    usage: {
      de: '41 % der öffentlichen Assassinen-Makros (die beiden Ketten von Grobs, 21 % + 20 %); Stufe 16 mit Dauerkrit nehmen Grobs, Nellan97 und delcatta',
      en: '41% of public Assassin macros (Grobs’ two chains, 21% + 20%); Grobs, Nellan97 and delcatta take the level-16 guaranteed crit',
    },
    evidence: [
      { id: 13350000, en: 'Triggers on landing a Critical Hit', de: 'Wird bei Kritischer Treffer aktiviert' },
      { id: 13010000, part: 13010050, en: 'Ignores Block and Evasion and lands as a Critical Hit', de: 'Block/Ausweichen ignorieren, Kritischer Treffer' },
      { id: 13270000, part: 13270040, en: 'Critical Hit on hit', de: 'Trifft garantiert als Kritischer Treffer' },
      { id: 13020000, part: 13020030, en: 'Critical Hit on hit', de: 'Trifft garantiert als Kritischer Treffer' },
      { id: 13180000, part: 13180010, en: 'Critical Hit on attack during Stealth', de: 'Kritischer Treffer (Garantiert): Bei Angriff (Tarnung)' },
      { id: 13350000, part: 13350050, en: 'Resets [Heart Gore] cooldown on landing a Critical Hit', de: '[Herzstoß]-Abklingzeit zurücksetzen: Bei Kritischer Treffer' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (specialisations)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2vault.com – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'game8 – Heart Gore Assassin build', href: 'https://game8.co/games/Aion-2/archives/616882' },
    ],
  },
  {
    id: 'illusive-clone-heart-gore',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 13310000 }],
    payoff: [{ id: 13350000 }],
    window: 14.5,
    title: {
      de: '[[13310000]]: [[13350000]] ohne Abklingzeit',
      en: '[[13310000]]: [[13350000]] without a cooldown',
    },
    text: {
      de: 'Solange [[13310000]] läuft (14,5 s auf Stufe 10, 20 s auf Stufe 20), hat [[13350000]] keine Abklingzeit. Es braucht aber weiter einen Kritischen Treffer: Mit [[13010000]] auf Stufe 16 (immer kritisch) ist [[13350000]] nach jedem Linksklick wieder bereit. Ab Stufe 15 verstärkt [[13310000]] außerdem den Effekt von [[13720000]] um das 1,5-Fache.',
      en: 'While [[13310000]] runs (14.5 s at level 10, 20 s at level 20), [[13350000]] has no cooldown. It still needs a Critical Hit: with [[13010000]] at level 16 (always a crit), [[13350000]] is ready again after every left click. From level 15, [[13310000]] also multiplies the effect of [[13720000]] by 1.5.',
    },
    how: {
      de: 'Spar [[13310000]] für Boss-Opener und wichtige Phasen, nicht für Trash. Wirk zuerst [[13390000]] und dann [[13310000]] (unter [[13390000]] ist die Animation kürzer), spring mit [[13070000]] hinter den Boss und halte Makro und [[13010000]].',
      en: 'Save [[13310000]] for boss openers and key phases, not for trash. Cast [[13390000]] first and then [[13310000]] (its animation is shorter under [[13390000]]), jump behind the boss with [[13070000]] and hold the macro and [[13010000]].',
    },
    stack: [13390000, 13310000],
    usage: {
      de: 'auf 96 % der öffentlichen Leisten (513 Builds) und bei 95 % von metabots Top-Spielern',
      en: 'on 96% of public skill bars (513 builds) and with 95% of metabot’s top players',
    },
    evidence: [
      { id: 13310000, en: 'Removes [Heart Gore] cooldown', de: 'Die Abklingzeit von [Herzstoß] entfällt' },
      { id: 13310000, part: 13310030, en: 'x1.5 [Exploit Weakness] effect for the duration', de: '[Schwachstellenfokus]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 13350000, en: 'Triggers on landing a Critical Hit', de: 'Wird bei Kritischer Treffer aktiviert' },
      { id: 13010000, part: 13010050, en: 'Ignores Block and Evasion and lands as a Critical Hit', de: 'Block/Ausweichen ignorieren, Kritischer Treffer' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (burst opener)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2-meta.com – Assassin guide (buff key)', href: 'https://aion2-meta.com/guides/assassin/' },
      { label: 'Fextralife – Assassin', href: 'https://aion2.wiki.fextralife.com/Assassin' },
    ],
  },
  {
    id: 'quick-slice-explosion-cooldown',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 13010000, part: 13010040 }],
    payoff: [{ id: 13130000 }],
    title: {
      de: '[[13010000]] verkürzt [[13130000]]',
      en: '[[13010000]] shortens [[13130000]]',
    },
    text: {
      de: 'Mit Stufe 12 nimmt jeder Treffer von [[13010000]] 1 s von der Abklingzeit von [[13130000]]. Zusammen mit Stufe 16 von [[13130000]] (−3 s, also 7 s statt 10 s) kommt die Explosion deutlich öfter.',
      en: 'At level 12, every hit of [[13010000]] takes 1 s off the cooldown of [[13130000]]. Together with level 16 of [[13130000]] (−3 s, so 7 s instead of 10 s) the Explosion comes back much more often.',
    },
    how: {
      de: 'Halte [[13010000]] auf der linken Maustaste, während du das Makro hältst. [[13130000]] steht an erster Stelle der Kette und nutzt jede gewonnene Sekunde sofort.',
      en: 'Hold [[13010000]] on the left mouse button while you hold the macro. [[13130000]] sits first in the chain and uses every second you win right away.',
    },
    usage: {
      de: 'Grobs, delcatta und die koreanischen Top-Spieler (aion2-meta, PvE) nehmen die Stufe-12-Option; Nellan97 nicht',
      en: 'Grobs, delcatta and the Korean top players (aion2-meta, PvE) take the level-12 option; Nellan97 does not',
    },
    evidence: [
      { id: 13010000, part: 13010040, en: '-1s [Insignia Explosion] cooldown on hit', de: '[Glyphenexplosion]-Abklingzeit −1s: Bei Treffer' },
      { id: 13130000, part: 13130050, en: '-3s cooldown', de: 'Abklingzeit −3 Sek.' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (specialisations)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2-meta.com – Assassin guide (Korean picks)', href: 'https://aion2-meta.com/guides/assassin/' },
    ],
  },
  {
    id: 'triniel-after-buffs',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 13300000, part: 13300020 }],
    payoff: [{ id: 13310000 }, { id: 13390000 }],
    title: {
      de: '[[13300000]] direkt nach den Buffs',
      en: '[[13300000]] right after your buffs',
    },
    text: {
      de: 'Ab Stufe 10 senkt jeder Treffer von [[13300000]] alle deine laufenden Abklingzeiten um 10 %. Laut einem koreanischen Inven-Guide sind das 10 % der Rest-Abklingzeit, darum spart er am meisten direkt nach [[13310000]] und [[13390000]]; bei laufender [[13310000]] zählt er doppelt, weil das Trugbild als zweiter Treffer gilt. Ab Stufe 15 setzt er sich zurück, wenn er einen Gegner erledigt.',
      en: 'From level 10, every hit of [[13300000]] cuts all your running cooldowns by 10%. A Korean Inven guide explains that this is 10% of the remaining cooldown, so it saves the most right after [[13310000]] and [[13390000]]; while [[13310000]] runs it applies twice, because the clone counts as a second hit. From level 15 it resets when it finishes off an enemy.',
    },
    how: {
      de: 'Lege [[13390000]], [[13310000]] und [[13300000]] in dieser Reihenfolge auf eine Taste und tipp sie dreimal (delcatta). Grobs wirkt beide Buffs, springt mit [[13070000]] hinter den Boss und setzt dann sofort [[13300000]]. Ein koreanischer PvP-Guide erledigt in Pausen schwache Gegner mit [[13300000]], um [[13310000]] schneller zurückzuholen.',
      en: 'Put [[13390000]], [[13310000]] and [[13300000]] on one key in that order and tap it three times (delcatta). Grobs casts both buffs, jumps behind the boss with [[13070000]] and then uses [[13300000]] at once. A Korean PvP guide finishes off weak mobs with [[13300000]] between fights to bring [[13310000]] back sooner.',
    },
    stack: [13390000, 13310000, 13300000],
    usage: {
      de: 'auf 83 % der öffentlichen Leisten; Grobs bringt diesen Stigma als ersten auf Stufe 10',
      en: 'on 83% of public skill bars; Grobs takes this stigma to level 10 first',
    },
    evidence: [
      { id: 13300000, part: 13300020, en: '-10% all skill cooldowns on hit', de: 'Abklingzeit (Alle Fäh.) −10 %: Bei Treffer' },
      { id: 13300000, part: 13300030, en: "Resets cooldown on defeating an enemy with [Triniel's Dagger]", de: 'Abklingzeit zurücksetzen: Bei Eliminierung eines Gegners mit [Triniels Dolch]' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (Grobs’ opener, delcatta’s buff key)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'Inven 살성 board – PvE guide with cooldown maths (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/113' },
      { label: 'Inven 살성 board – PvP guide (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/5174' },
    ],
  },
  {
    id: 'back-attack-teleports',
    kind: 'status',
    rating: 'core',
    content: ['boss', 'pvp'],
    setup: [{ id: 13070000 }, { id: 13360000 }, { id: 13050000 }],
    payoff: [{ id: 13060000 }, { id: 13300000 }, { id: 13740000 }],
    status: 'Back Attack',
    title: {
      de: 'Hinter das Ziel teleportieren, dann von hinten zuschlagen',
      en: 'Teleport behind the target, then strike from behind',
    },
    text: {
      de: '[[13070000]] und [[13360000]] setzen dich hinter das Ziel, [[13050000]] auf seine andere Seite. Von hinten macht [[13060000]] 30 % mehr Schaden (ab Stufe 8 bindet er dann 2 Glyphen), [[13300000]] ebenfalls 30 %, und [[13740000]] verstärkt jeden Rückenangriff. Unter [[13390000]] wirkt [[13740000]] ab Stufe 10 1,5-fach.',
      en: '[[13070000]] and [[13360000]] put you behind the target, [[13050000]] on its other side. From behind, [[13060000]] deals 30% more damage (and engraves 2 Insignias from level 8), [[13300000]] also 30%, and [[13740000]] boosts every back attack. Under [[13390000]] (level 10) [[13740000]] works 1.5 times as strong.',
    },
    how: {
      de: 'Grobs legt [[13070000]] und [[13360000]] auf eine Taste, damit einer die Abklingzeit des anderen abdeckt. Setz [[13360000]] dabei an die erste Stelle: Es geht nur nach Notausweichen oder im Flug, sonst springt die Taste mit [[13070000]]. Ist beides nicht bereit, nimm [[13050000]]. Nach dem Sprung sofort [[13300000]] oder [[13060000]]. Stell die Boss-Ausrichtungsanzeige auf Rücken.',
      en: 'Grobs puts [[13070000]] and [[13360000]] on one key so one covers the other’s cooldown. Put [[13360000]] first: it works only after a Dodge or while flying, otherwise the key jumps with [[13070000]]. If neither is ready, use [[13050000]]. Right after the jump, use [[13300000]] or [[13060000]]. Set the boss orientation indicator to Back.',
    },
    stack: [13360000, 13070000],
    usage: {
      de: 'der Teleport hinter das Ziel steht auf 98 % der öffentlichen Leisten; Nellan97 will 85–90 % seines Schadens von hinten machen',
      en: 'the teleport behind the target is on 98% of public skill bars; Nellan97 aims to deal 85–90% of his damage from behind',
    },
    evidence: [
      { id: 13070000, en: 'Moves behind a target within 20m', de: 'Bewegt sich hinter ein Ziel innerhalb von 20 m' },
      { id: 13360000, en: 'after using [Dodge] or while flying', de: 'Bewegt sich bei Einsatz von [Notausweichen] oder im Flug hinter ein Ziel' },
      { id: 13050000, en: 'Moves to the opposite side of a target within 4m', de: 'Bewegt sich auf die gegenüberliegende Seite des Ziels' },
      { id: 13060000, en: 'Increases damage by 30% on landing as a Back attack', de: 'Erhöht bei Angriffen (Rückseitig) den Schaden um 30 %' },
      { id: 13300000, en: 'Increases damage by 30% if attacking from behind the target', de: 'Erhöht bei Angriffen (Rückseitig) den Schaden um 30 %' },
      { id: 13740000, en: "Increases the caster's Back Attack Damage Boost by", de: 'Erhöht die Schadensverstärkung bei Angriffen (Rückseitig) um' },
      { id: 13390000, part: 13390020, en: 'x1.5 [Rear Smite] effect for the duration', de: '[Rückhieb]-Effekt x1,5: Während der Wirkungsdauer' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (staying behind the boss)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2vault.com – Assassin overview', href: 'https://aion2vault.com/builds/assassin/' },
      { label: 'Fextralife – Assassin (opener)', href: 'https://aion2.wiki.fextralife.com/Assassin' },
      { label: 'Inven 살성 board – PvP guide (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/5174' },
    ],
  },
  // ───────────────────────────── strong ─────────────────────────────
  {
    id: 'swift-contract-passives',
    kind: 'buff',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 13390000, part: 13390020 }, { id: 13390000, part: 13390030 }],
    payoff: [{ id: 13740000 }, { id: 13750000 }],
    window: 14.5,
    title: {
      de: '[[13390000]] verstärkt [[13740000]] und [[13750000]]',
      en: '[[13390000]] amplifies [[13740000]] and [[13750000]]',
    },
    text: {
      de: 'Solange [[13390000]] läuft, wirkt [[13740000]] ab Stigma-Stufe 10 1,5-fach, [[13750000]] ab Stigma-Stufe 15 ebenso. Das sind deine Schadensverstärkung bei Rückenangriffen (plus PvE- und PvP-Schaden) und deine Krit.-Schadensverstärkung, die mit [[13010000]] auf Stufe 16 (immer kritisch) bei jedem Linksklick greift. Der Pakt läuft auf Stufe 10 14,5 s, auf 15 dann 17 s, auf 20 dann 20 s.',
      en: 'While [[13390000]] runs, [[13740000]] works 1.5 times as strong from stigma level 10, and [[13750000]] does too from stigma level 15. That is your Back Attack Damage Boost (plus PvE and PvP Damage Boost) and your Critical Damage Boost, which applies to every left click once [[13010000]] always crits at level 16. The contract lasts 14.5 s at level 10, 17 s at 15 and 20 s at 20.',
    },
    how: {
      de: 'Wirk [[13390000]] zusammen mit [[13310000]] (erst [[13390000]], dann [[13310000]]) und spring dann mit [[13070000]] hinter den Boss: Die verstärkten Passiven zahlen sich von hinten und mit Krits am meisten aus.',
      en: 'Cast [[13390000]] together with [[13310000]] ([[13390000]] first, then [[13310000]]) and jump behind the boss with [[13070000]]: the amplified passives pay off most from behind and on crits.',
    },
    stack: [13390000, 13310000],
    usage: {
      de: 'Pakt der Flinkheit: 89 % der öffentlichen Leisten, 90 % von metabots Top-Spielern, 98 % der koreanischen PvE-Ranker; Grobs und delcatta bringen ihn auf 15 und dann 20; Rückhieb und Sturmhaltung sind bei aion2-meta und metabot die Passiv-Prioritäten 1 und 2',
      en: 'Swift Contract: 89% of public skill bars, 90% of metabot’s top players, 98% of Korean PvE rankers; Grobs and delcatta take it to 15, then 20; Rear Smite and Assault Stance are passive priorities 1 and 2 at aion2-meta and metabot',
    },
    evidence: [
      { id: 13390000, part: 13390020, en: 'x1.5 [Rear Smite] effect for the duration', de: '[Rückhieb]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 13390000, part: 13390030, en: 'x1.5 [Assault Stance] effect for the duration', de: '[Sturmhaltung]-Effekt x1,5: Während der Wirkungsdauer' },
      { id: 13740000, en: "Increases the caster's Back Attack Damage Boost by", de: 'Erhöht die Schadensverstärkung bei Angriffen (Rückseitig) um' },
      { id: 13750000, en: "Increases the caster's Critical Damage Boost by", de: 'Erhöht Krit.-Schadensverstärkung um' },
      { id: 13010000, part: 13010050, en: 'Ignores Block and Evasion and lands as a Critical Hit', de: 'Block/Ausweichen ignorieren, Kritischer Treffer' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (stigma levels, passives)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2-meta.com – Assassin guide (stigmas, passives, buff key)', href: 'https://aion2-meta.com/guides/assassin/' },
      { label: 'metabot.gg – Assassin build', href: 'https://metabot.gg/en/aion-2/classes/assassin/build' },
    ],
  },
  {
    id: 'storm-rampage-buff-cooldowns',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss'],
    setup: [{ id: 13340000, part: 13340050 }],
    payoff: [{ id: 13310000 }, { id: 13390000 }],
    status: 'Stagger',
    title: {
      de: '[[13340000]] in der Benommenheit holt die Buffs zurück',
      en: '[[13340000]] in stagger windows brings your buffs back',
    },
    text: {
      de: '[[13340000]] geht nur gegen ein benommenes Ziel und hat 0 s Abklingzeit. Ab Stufe 16 senkt jeder Treffer alle Abklingzeiten um 1 s, auch die von [[13310000]] und [[13390000]]; nur [[13260000]] ist davon ausgenommen.',
      en: '[[13340000]] works only on a Staggered target and has a 0 s cooldown. From level 16, every hit cuts all cooldowns by 1 s, [[13310000]] and [[13390000]] included; only [[13260000]] is exempt.',
    },
    how: {
      de: 'Spam [[13340000]] in der Benommenheit, wenn [[13310000]] und [[13390000]] auf Abklingzeit sind; laufen die Buffs, bleib bei deinem Makro (Grobs). Die häufigste öffentliche Kette (27 %) hat [[13340000]] fest im Makro, hinter [[13130000]] und [[13060000]], vor [[13100000]]; außerhalb der Benommenheit überspringt die Taste ihn. Nellan97 sah sein Makro in der Benommenheit an [[13340000]] hängen, obwohl [[13130000]] bereit war, und legt [[13130000]] darum zusätzlich auf eine eigene Taste.',
      en: 'Spam [[13340000]] in a stagger window while [[13310000]] and [[13390000]] are on cooldown; while the buffs run, stay on your macro (Grobs). The most common public chain (27%) keeps [[13340000]] in the macro, after [[13130000]] and [[13060000]] and before [[13100000]]; outside a stagger the key skips it. Nellan97 saw his macro stick on [[13340000]] during a stagger although [[13130000]] was ready, so he also binds [[13130000]] to a key of its own.',
    },
    usage: {
      de: '41 % der öffentlichen Assassinen-Makros enthalten diese Fähigkeit; Grobs, Nellan97 und delcatta nehmen Stufe 16',
      en: '41% of public Assassin macros include it; Grobs, Nellan97 and delcatta take level 16',
    },
    evidence: [
      { id: 13340000, en: 'to a target afflicted with Stagger within 4m', de: 'einem benommenen Ziel innerhalb von 4 m' },
      { id: 13340000, part: 13340050, en: '-1s all skill cooldowns on hit', de: 'Abklingzeit (Alle Fäh.) −1s: Bei Treffer' },
      { id: 13260000, en: 'Unaffected by cooldown reduction effects', de: 'Wird nicht von Effekten zur Verringerung der Abklingzeit beeinflusst' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (Storm Rampage)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2vault.com – macro guide', href: 'https://aion2vault.com/builds/macros/' },
    ],
  },
  {
    id: 'savage-roar-shadowstrike-cooldown',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss', 'pvp'],
    setup: [{ id: 13100000, part: 13100040 }],
    payoff: [{ id: 13070000 }],
    title: {
      de: '[[13100000]] verkürzt [[13070000]]',
      en: '[[13100000]] shortens [[13070000]]',
    },
    text: {
      de: 'Mit Stufe 12 nimmt jeder Treffer von [[13100000]] 1 s von der Abklingzeit von [[13070000]]. So kommst du öfter hinter das Ziel und holst dir öfter die +20 % Krit.-Schadensverstärkung von [[13070000]] (Stufe 8).',
      en: 'At level 12, every hit of [[13100000]] takes 1 s off the cooldown of [[13070000]]. You get behind the target more often and refresh the +20% Critical Damage Boost of [[13070000]] (level 8) more often.',
    },
    how: {
      de: '[[13100000]] ist der Füller am Ende der gängigen Makro-Ketten und trifft ständig. [[13070000]] selbst bleibt außerhalb des Makros (Grobs legt ihn mit [[13360000]] auf eine Taste); nutz ihn, sobald du nicht mehr hinter dem Boss stehst oder der Krit-Buff ausläuft. Ein koreanischer Inven-Guide drückt [[13100000]] sogar von Hand, um [[13070000]] schneller zurückzuholen, und hält den Krit-Buff unter [[13310000]] so fast durchgehend.',
      en: '[[13100000]] is the filler at the end of the usual macro chains and hits all the time. [[13070000]] itself stays out of the macro (Grobs puts it on one key with [[13360000]]); use it whenever you lose the boss’s back or the crit buff runs out. A Korean Inven guide even presses [[13100000]] by hand to bring [[13070000]] back faster, and under [[13310000]] keeps the crit buff up almost all the time.',
    },
    usage: {
      de: 'Grobs und delcatta nehmen die Stufe-12-Option; 98 % der Makro-Nutzer lassen Schattenschlag aus dem Makro',
      en: 'Grobs and delcatta take the level-12 option; 98% of macro users keep Shadowstrike out of the macro',
    },
    evidence: [
      { id: 13100000, part: 13100040, en: '-1s [Shadowstrike] cooldown on hit', de: '[Schattenschlag]-Abklingzeit −1s: Bei Treffer' },
      { id: 13070000, part: 13070020, en: '+20% caster Critical Damage Boost for 5s on hit', de: 'Krit.-Schadensverstärkung für 5s +20 %: Bei Treffer' },
    ],
    sources: [
      { label: 'aion2vault.com – Assassin PvE build (specialisations)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'aion2vault.com – macro guide (skills kept out)', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'Inven 살성 board – PvE guide 2026-01 (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/3856' },
    ],
  },
  {
    id: 'stun-shadow-fall',
    kind: 'enable',
    rating: 'strong',
    content: ['pvp', 'aoe'],
    setup: [
      { id: 13070000 },
      { id: 13130000 },
      { id: 13210000 },
      { id: 13050000, part: 13050050 },
      { id: 13280000, part: 13280020 },
      { id: 13140000, part: 13140010 },
    ],
    payoff: [{ id: 13220000 }],
    window: 3,
    status: 'Stun',
    title: {
      de: 'Betäubung → [[13220000]]',
      en: 'Stun → [[13220000]]',
    },
    text: {
      de: '[[13220000]] springt nur zu einem betäubten Ziel und wirft es für 3 s in Niederschlag. [[13070000]] betäubt laut Text ohne Zufallswurf, [[13130000]] je nach Glyphen (gegen NPCs doppelt), [[13210000]] nach einem Ausweichen (NPCs immer), [[13050000]] ab Stufe 16 ein geblendetes Ziel mit 50 % Chance; dazu [[13280000]] (Stufe 10, wenn er 2 Buffs entfernt) und [[13140000]] (Stufe 5, 40 %). Bosse sind gegen Betäubung meist immun, dort läuft diese Kombo nicht.',
      en: '[[13220000]] jumps only to a Stunned target and knocks it down for 3 s. By its text [[13070000]] stuns without a chance roll, [[13130000]] by Insignia stacks (doubled against NPCs), [[13210000]] after an Evasion (always against NPCs), [[13050000]] from level 16 a Blinded target with a 50% chance; add [[13280000]] (level 10, when it removes 2 buffs) and [[13140000]] (level 5, 40%). Bosses are usually immune to Stun, so this combo does not work on them.',
    },
    how: {
      de: 'Setz [[13220000]] an die erste Stelle der Taste, auf der schon [[13360000]] und [[13070000]] liegen: Ohne Notausweichen springt der erste Druck mit [[13070000]] hinter das Ziel und betäubt, der nächste setzt mit [[13220000]] nach. Am Boss wird [[13220000]] laut Text nur mit 5 % Chance bei deinen Angriffen aktiv; ein koreanischer Inven-Guide setzt ihn dann zusammen mit [[13070000]] ein.',
      en: 'Put [[13220000]] first on the key that already holds [[13360000]] and [[13070000]]: without a Dodge, the first press jumps behind the target with [[13070000]] and stuns, the next follows up with [[13220000]]. On a boss, the text only gives [[13220000]] a 5% chance to activate on your attacks; a Korean Inven guide then uses it together with [[13070000]].',
    },
    stack: [13220000, 13360000, 13070000],
    usage: {
      de: 'metabot nennt es den PvP-Kombo-Baustein, und Fextralifes PvP-Build eröffnet so; Schattenfall steht aber nur auf 32 % der öffentlichen Leisten, und Top-Spieler lassen ihn bei Stufe 8 (global Ø 8,1)',
      en: 'metabot calls it the PvP combo piece and Fextralife’s PvP build opens with it; Shadow Fall is on only 32% of public skill bars, though, and top players leave it at level 8 (global avg. 8.1)',
    },
    evidence: [
      { id: 13220000, en: 'Moves to a target afflicted with Stun within 10m', de: 'Bewegt sich zu einem Ziel mit Betäubung innerhalb von 10 m' },
      { id: 13220000, en: 'Has a 5% chance to trigger on attacking a target with Incapacitated Immunity', de: 'Wird mit 5 % Chance bei Angriffen auf ein Ziel mit Handlungsunfähigkeits-Immunität aktiviert' },
      { id: 13070000, en: 'rotates, and inflicts Stun for 3s', de: 'Wirbelt das Ziel für 3s umher und verursacht Betäubung' },
      { id: 13130000, en: 'Stun chance is doubled on NPC targets', de: 'Gegen NPCs verdoppelt sich die Betäubungschance' },
      { id: 13210000, en: '100% to inflict Stun on NPC targets', de: 'Gegen NPCs beträgt die Trefferchance von Betäubung 100 %' },
      { id: 13210000, en: 'inflict Stun for 3s on Evasion', de: 'Fügt bei erfolgreichem Ausweichen einem Ziel innerhalb von 4 m' },
      { id: 13050000, part: 13050050, en: '50% chance to rotate and inflict Stun for 3s on hitting a target afflicted with Blind', de: 'Wirbel, Betäubung für 3s (Ziel mit Blindheit) (50 % Chance): Bei Treffer' },
      { id: 13280000, part: 13280020, en: 'Rotates and inflicts Stun for 3s when removing 2 or more buffs', de: 'Wirbel, Betäubung für 3s: Bei Entfernung von 2 oder mehr Verstärkungszaubern' },
      { id: 13140000, part: 13140010, en: '40% chance to rotate and inflict Stun for 3s on hit', de: 'Wirbel, Betäubung für 3s (40 % Chance): Bei Treffer' },
    ],
    sources: [
      { label: 'metabot.gg – Assassin build (PvP)', href: 'https://metabot.gg/en/aion-2/classes/assassin/build' },
      { label: 'Fextralife – Assassin (PvP lockdown)', href: 'https://aion2.wiki.fextralife.com/Assassin' },
      { label: 'aion2-meta.com – Assassin guide (skill levels)', href: 'https://aion2-meta.com/guides/assassin/' },
      { label: 'Inven 살성 board – PvE guide 2026-01 (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/3856' },
    ],
  },
  {
    id: 'evasion-stance-whirlwind',
    kind: 'enable',
    rating: 'strong',
    content: ['pvp', 'boss'],
    setup: [{ id: 13080000 }, { id: 13370000 }, { id: 13140000, part: 13140030 }],
    payoff: [{ id: 13210000 }],
    status: 'Evasion',
    title: {
      de: 'Ausweichen schaltet [[13210000]] frei',
      en: 'Evasion unlocks [[13210000]]',
    },
    text: {
      de: '[[13210000]] ist nur nach einem erfolgreichen Ausweichen einsetzbar (oder nach einer Aktivierung durch [[13060000]]). Der englische Text hängt die Bedingung nur an die Betäubung, der deutsche und der koreanische an die ganze Fähigkeit. [[13080000]] weicht kurz jedem Schaden garantiert aus; [[13370000]] (+200 Ausweichen) und [[13140000]] (Stufe 15, +200 für 10 s) erhöhen nur die Chance. Ab Stufe 16 setzt jedes Ausweichen [[13210000]] mit 25 % Chance zurück.',
      en: '[[13210000]] is usable only after a successful Evasion (or after [[13060000]] activates it). The English text attaches the condition to the Stun only, the German and Korean texts to the whole skill. [[13080000]] evades all damage for a brief moment; [[13370000]] (+200 Evasion) and [[13140000]] (level 15, +200 for 10 s) only raise the chance. From level 16, each Evasion has a 25% chance to reset [[13210000]].',
    },
    how: {
      de: 'Wirk [[13080000]] kurz vor einem Angriff, der dich treffen würde, und drück danach [[13210000]]. Setz [[13210000]] an die erste Stelle einer Kette: Solange er nicht bereit ist, überspringt die Taste ihn. Am Boss zählt nur der Schaden, im PvP auch die Betäubung.',
      en: 'Cast [[13080000]] just before an attack that would hit you, then press [[13210000]]. Put [[13210000]] first in a chain: until it is ready, the key skips it. On bosses only the damage counts; in PvP the Stun does too.',
    },
    usage: {
      de: 'Ausweichhaltung: 32 % der öffentlichen Leisten, 86 % der koreanischen PvE- und 95 % der PvP-Ranker; Wirbelschnitt: 65 % der Leisten; Pakt des Ausweichens ist ein koreanischer PvP-Stigma (64 %)',
      en: 'Evasion Stance: 32% of public skill bars, 86% of Korean PvE and 95% of PvP rankers; Whirlwind Slice: 65% of bars; Evasion Contract is a Korean PvP stigma (64%)',
    },
    evidence: [
      { id: 13080000, en: 'Grants guaranteed evasion of all damage for a brief duration', de: 'Weicht vorübergehend garantiert sämtlichem Schaden aus' },
      { id: 13210000, en: 'inflict Stun for 3s on Evasion', de: 'Fügt bei erfolgreichem Ausweichen einem Ziel innerhalb von 4 m' },
      { id: 13210000, part: 13210050, en: '25% chance to reset [Whirlwind Slice] cooldown on Evasion', de: '[Wirbelschnitt]-Abklingzeit zurücksetzen (25 % Chance): Bei erfolgreichem Ausweichen' },
      { id: 13370000, en: "increases the caster's Evasion by 200", de: 'erhöht Ausweichen um 200' },
      { id: 13140000, part: 13140030, en: '+200 Evasion for 10s on use', de: 'Ausweichen +200 für 10s: Bei Nutzung' },
    ],
    sources: [
      { label: 'Inven 살성 board – Korean skill list (회피 성공 시)', href: 'https://www.inven.co.kr/board/aion2/6449/32' },
      { label: 'game8 – Whirlwind Slice (cast condition)', href: 'https://game8.co/games/Aion-2/archives/628320' },
      { label: 'aion2vault.com – Assassin overview', href: 'https://aion2vault.com/builds/assassin/' },
      { label: 'aion2-meta.com – Assassin guide (Korean stigmas)', href: 'https://aion2-meta.com/guides/assassin/' },
    ],
  },
  {
    id: 'ambush-whirlwind-proc',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe'],
    setup: [{ id: 13060000, part: 13060040 }],
    payoff: [{ id: 13210000 }],
    title: {
      de: '[[13060000]] aktiviert [[13210000]]',
      en: '[[13060000]] activates [[13210000]]',
    },
    text: {
      de: 'Mit Stufe 12 aktiviert jeder Treffer von [[13060000]] mit 50 % Chance [[13210000]], auch ohne Ausweichen. Mit Stufe 16 hat [[13060000]] 2 Folge-Einsätze mehr und würfelt damit öfter.',
      en: 'At level 12, every hit of [[13060000]] has a 50% chance to activate [[13210000]], no Evasion needed. At level 16, [[13060000]] gets 2 more consecutive uses and so rolls more often.',
    },
    how: {
      de: 'Setz [[13210000]] an die erste Stelle der Kette, in der auch [[13060000]] steht: Solange er nicht aktiv ist, überspringt die Taste ihn, und nach einem Treffer kommt er sofort. Ein koreanischer Inven-Guide stellt seine Tasten genau so ein, dass [[13210000]] beim Aktivieren Vorrang hat.',
      en: 'Put [[13210000]] first in the chain that also holds [[13060000]]: until it is active the key skips it, and after a proc it fires at once. A Korean Inven guide sets up his keys exactly so that [[13210000]] takes priority when it activates.',
    },
    usage: {
      de: 'die koreanischen Top-Spieler (aion2-meta, PvE) nehmen diese Stufe-12-Option; Grobs und Nellan97 fanden Hinterhalt dagegen kaum lohnend',
      en: 'the Korean top players (aion2-meta, PvE) take this level-12 option; Grobs and Nellan97, on the other hand, found Ambush barely worth it',
    },
    evidence: [
      { id: 13060000, part: 13060040, en: '50% chance to trigger [Whirlwind Slice] on hit', de: 'Aktiviert bei Treffer mit 50 % Chance [Wirbelschnitt]' },
      { id: 13060000, part: 13060050, en: '+2 consecutive uses', de: 'Folge-Einsätze +2' },
      { id: 13210000, en: '100% to inflict Stun on NPC targets', de: 'Gegen NPCs beträgt die Trefferchance von Betäubung 100 %' },
    ],
    sources: [
      { label: 'aion2-meta.com – Assassin guide (Korean picks)', href: 'https://aion2-meta.com/guides/assassin/' },
      { label: 'game8 – Whirlwind Slice (cast condition)', href: 'https://game8.co/games/Aion-2/archives/628320' },
      { label: 'Inven 살성 board – beginner skill setup (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/144' },
      { label: 'Inven 살성 board – PvE guide 2026-01 (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/3856' },
    ],
  },
  {
    id: 'movement-ambush-stance',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 13070000 }, { id: 13360000 }, { id: 13050000 }, { id: 13220000 }, { id: 13280000 }],
    payoff: [{ id: 13770000 }],
    window: 10,
    status: 'Ambush Stance',
    title: {
      de: 'Ansturm und Teleports aktivieren [[13770000]]',
      en: 'Rushes and teleports activate [[13770000]]',
    },
    text: {
      de: 'Jede Ansturm- oder Bewegungsfähigkeit gibt dir 10 s [[13770000]]: Dann macht jeder Treffer mit 50 % Chance Zusatzschaden (1 s Abklingzeit). Dazu zählen [[13070000]], [[13360000]], [[13050000]], [[13220000]] und [[13280000]]. [[13230000]] verstärkt den Effekt ab Stufe 15 für 10 s um das 1,5-Fache.',
      en: 'Every rush or movement skill gives you 10 s of [[13770000]]: each hit then has a 50% chance to deal extra damage (1 s cooldown). That covers [[13070000]], [[13360000]], [[13050000]], [[13220000]] and [[13280000]]. From level 15, [[13230000]] raises the effect 1.5 times for 10 s.',
    },
    how: {
      de: 'Du nutzt die Teleports ohnehin, um hinter dem Boss zu bleiben; jeder frischt [[13770000]] auf. Verteil sie so, dass möglichst selten mehr als 10 s ohne Teleport vergehen.',
      en: 'You use the teleports anyway to stay behind the boss, and each one refreshes [[13770000]]. Spread them so that you rarely go more than 10 s without one.',
    },
    usage: {
      de: 'metabots Top-Spieler: Ø Stufe 11,9; Nellan97, Fextralife und game8 zählen es zu den Kern-Passiven; koreanische Ranker suchen es kaum auf ihrer Ausrüstung (9 % PvE)',
      en: 'metabot’s top players: avg. level 11.9; Nellan97, Fextralife and game8 list it among the core passives; Korean rankers rarely look for it on gear (9% PvE)',
    },
    evidence: [
      { id: 13770000, en: 'Grants Ambush Stance for 10s when using skills that rush or involve movement', de: 'wenn der Wirker Ansturm- oder Bewegungsfähigkeiten einsetzt' },
      { id: 13070000, en: 'Moves behind a target within 20m', de: 'Bewegt sich hinter ein Ziel innerhalb von 20 m' },
      { id: 13360000, en: 'Moves behind a target within 10m', de: 'hinter ein Ziel innerhalb von 10 m' },
      { id: 13050000, en: 'Moves to the opposite side of a target within 4m', de: 'Bewegt sich auf die gegenüberliegende Seite des Ziels' },
      { id: 13220000, en: 'Moves to a target afflicted with Stun within 10m', de: 'Bewegt sich zu einem Ziel mit Betäubung innerhalb von 10 m' },
      { id: 13280000, en: 'Rushes to a target within 20m', de: 'Stürmt auf ein Ziel innerhalb von 20 m zu' },
      { id: 13230000, part: 13230030, en: 'x1.5 [Ambush Stance] effect for 10s on first strike of [Aerial Bind]', de: 'Effekt [Lauerhaltung] x1,5 für 10s: Bei [Luftfessel]-Treffer (1. Schlag)' },
    ],
    sources: [
      { label: 'Fextralife – Assassin', href: 'https://aion2.wiki.fextralife.com/Assassin' },
      { label: 'aion2vault.com – Assassin PvE build (passives)', href: 'https://aion2vault.com/builds/assassin/pve/' },
      { label: 'metabot.gg – Assassin build', href: 'https://metabot.gg/en/aion-2/classes/assassin/build' },
      { label: 'aion2-meta.com – Assassin guide (passives on gear)', href: 'https://aion2-meta.com/guides/assassin/' },
    ],
  },
  {
    id: 'impact-defense-break',
    kind: 'proc',
    rating: 'strong',
    content: ['pvp', 'aoe'],
    setup: [{ id: 13070000 }, { id: 13130000 }, { id: 13220000 }, { id: 13230000 }],
    payoff: [{ id: 13780000 }],
    window: 10,
    status: 'Impact-type',
    title: {
      de: 'Betäubung, Niederschlag, Luftbann → [[13780000]]',
      en: 'Stun, Knockdown, Airborne → [[13780000]]',
    },
    text: {
      de: 'Triffst du ein Ziel mit Schockstatus, senkt [[13780000]] 10 s lang seine Verteidigung um 30 % und seinen Widerstand gegen Statuseffekte um 20 % (20 s Abklingzeit). Schockstatus setzen [[13070000]] und [[13130000]] (Betäubung), [[13220000]] (Niederschlag) und [[13230000]] (Luftbann). Der englische und der koreanische Text zählen auch Benommenheit dazu, der deutsche nicht; so greift es am Boss in der Benommenheit, ohne eigenes Setup.',
      en: 'When you hit a target under an Impact-type status, [[13780000]] lowers its Defense by 30% and its Status Effect Resist by 20% for 10 s (20 s cooldown). [[13070000]] and [[13130000]] (Stun), [[13220000]] (Knockdown) and [[13230000]] (Airborne) apply such a status. The English and Korean texts also count Stagger, the German one does not; that is how it triggers on bosses in stagger windows, without a setup of yours.',
    },
    how: {
      de: 'Im PvP erst betäuben, dann den Burst setzen: In den 10 s mit weniger Verteidigung sitzen [[13300000]] und [[13130000]], und die nächste Kontrolle landet leichter.',
      en: 'In PvP, stun first and burst second: [[13300000]] and [[13130000]] land inside the 10 s of lower Defense, and your next control lands more easily.',
    },
    usage: {
      de: 'metabots Top-Spieler: Ø Stufe 11,1; metabot und aion2-meta nehmen seinen Daevanion-Knoten auf Zikel; ein koreanischer PvE-Guide empfiehlt es für die Benommenheit',
      en: 'metabot’s top players: avg. level 11.1; metabot and aion2-meta take its Daevanion node on Zikel; a Korean PvE guide recommends it for stagger windows',
    },
    evidence: [
      { id: 13780000, en: 'when landing an attack on a target afflicted with Stagger or an Impact-type status', de: 'gegen ein Ziel mit Schockstatus' },
      { id: 13070000, en: 'rotates, and inflicts Stun for 3s', de: 'Wirbelt das Ziel für 3s umher und verursacht Betäubung' },
      { id: 13130000, en: 'inflicting Stun for 3s', de: 'verursacht Betäubung für 3s' },
      { id: 13220000, en: 'and inflicts Knockdown for 3s', de: 'versetzt es für 3s in Niederschlag' },
      { id: 13230000, en: 'with a 50% chance to inflict Airborne for 3s', de: 'versetzt es mit 50 % Chance für 3s in Luftbann' },
    ],
    sources: [
      { label: 'Inven 살성 board – Korean skill list (그로기 또는 충격계)', href: 'https://www.inven.co.kr/board/aion2/6449/32' },
      { label: 'Inven 살성 board – PvE guide 2026-01 (KR)', href: 'https://www.inven.co.kr/board/aion2/6449/3856' },
      { label: 'metabot.gg – Assassin build', href: 'https://metabot.gg/en/aion-2/classes/assassin/build' },
    ],
  },
  // ───────────────────────────── situational ─────────────────────────────
  {
    id: 'blind-shadow-fall',
    kind: 'enable',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [{ id: 13050000 }, { id: 13360000 }, { id: 13250000 }, { id: 13700000 }],
    payoff: [{ id: 13220000, part: 13220050 }],
    window: 3,
    status: 'Blind',
    title: {
      de: 'Blindheit → [[13220000]] (Stufe 16)',
      en: 'Blind → [[13220000]] (level 16)',
    },
    text: {
      de: 'Ab Stufe 16 geht [[13220000]] auch gegen ein Ziel mit Blindheit. [[13050000]], [[13360000]] und [[13700000]] blenden NPCs laut Text zu 100 %, Spieler nur mit 40 %, 50 % und 30 % Chance; [[13250000]] blendet jedes Ziel für 5 s. So hast du einen zweiten Weg zu [[13220000]], wenn die Betäubung nicht sitzt. Ob Bosse Blindheit annehmen, sagt der Text nicht.',
      en: 'From level 16, [[13220000]] also works on a Blinded target. By their text, [[13050000]], [[13360000]] and [[13700000]] blind NPCs 100% of the time but players only with a 40%, 50% and 30% chance; [[13250000]] blinds any target for 5 s. That gives you a second route to [[13220000]] when the Stun does not land. The text does not say whether bosses take Blind.',
    },
    how: {
      de: 'Lege [[13220000]] an die erste Stelle und [[13050000]] dahinter auf eine Taste: erst blenden, dann nachspringen. Die Blindheit von [[13050000]] hält nur 3 s (Stufe 8: +2 s). Stufe 16 ist teuer: Top-Spieler lassen [[13220000]] meist bei Stufe 8.',
      en: 'Put [[13220000]] first and [[13050000]] behind it on one key: blind first, then jump in. The Blind of [[13050000]] lasts only 3 s (level 8: +2 s). Level 16 is expensive: top players mostly leave [[13220000]] at level 8.',
    },
    stack: [13220000, 13050000],
    usage: {
      de: 'Fextralifes PvP-Build nutzt es, wenn die Betäubung nicht sitzt; global steht Schattenfall bei Top-Spielern im Schnitt auf Stufe 8,1',
      en: 'Fextralife’s PvP build uses it when the Stun fails; among global top players Shadow Fall averages level 8.1',
    },
    evidence: [
      { id: 13220000, part: 13220050, en: 'Can be used on targets afflicted with Blind', de: 'Verfügbar gegen Ziele mit Blindheit' },
      { id: 13050000, en: 'with a 40% chance to inflict Blind for 3s', de: 'Versetzt die Ziele mit 40 % Chance für 3s in Blindheit' },
      { id: 13050000, en: '100% chance to inflict Blind on NPC targets', de: 'Gegen NPCs beträgt die Trefferchance von Blindheit 100 %' },
      { id: 13360000, en: '100% chance to inflict Blind on NPC targets', de: 'Gegen NPCs beträgt die Trefferchance von Blindheit 100 %' },
      { id: 13250000, en: 'inflicts Blind for 5s', de: 'versetzt es für 5s in Blindheit' },
      { id: 13050000, part: 13050010, en: '+2s Blind duration', de: 'Blindheitsdauer +2 Sek.' },
    ],
    sources: [
      { label: 'Fextralife – Assassin (PvP: blind follow-up)', href: 'https://aion2.wiki.fextralife.com/Assassin' },
      { label: 'metabot.gg – Assassin build (specialisations)', href: 'https://metabot.gg/en/aion-2/classes/assassin/build' },
      { label: 'aion2-meta.com – Assassin guide (skill levels)', href: 'https://aion2-meta.com/guides/assassin/' },
    ],
  },
  {
    id: 'blind-flash-slice-stun',
    kind: 'status',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [{ id: 13050000, part: 13050040 }, { id: 13360000 }, { id: 13250000 }, { id: 13700000 }],
    payoff: [{ id: 13050000, part: 13050050 }],
    window: 3,
    status: 'Blind',
    title: {
      de: 'Blindheit → [[13050000]] betäubt (Stufe 16)',
      en: 'Blind → [[13050000]] stuns (level 16)',
    },
    text: {
      de: 'Ab Stufe 16 betäubt [[13050000]] ein Ziel mit Blindheit mit 50 % Chance für 3 s. Mit der Stufe-12-Option hast du einen zweiten Einsatz: Der erste blendet (NPCs immer), der zweite kann betäuben. Dafür brauchst du beide Spezialisierungs-Plätze von Stufe 16. [[13360000]], [[13250000]] und [[13700000]] blenden ebenfalls.',
      en: 'From level 16, [[13050000]] has a 50% chance to stun a Blinded target for 3 s. The level-12 option gives you a second use: the first blinds (NPCs always), the second can stun. That takes both specialisation slots of level 16. [[13360000]], [[13250000]] and [[13700000]] blind as well.',
    },
    how: {
      de: 'Nutz [[13050000]] zweimal hintereinander. Landet die Betäubung, spring mit [[13220000]] nach. Gegen Bosse greift die Betäubung nicht.',
      en: 'Use [[13050000]] twice in a row. If the Stun lands, follow with [[13220000]]. It does not stun bosses.',
    },
    evidence: [
      { id: 13050000, part: 13050050, en: '50% chance to rotate and inflict Stun for 3s on hitting a target afflicted with Blind', de: 'Wirbel, Betäubung für 3s (Ziel mit Blindheit) (50 % Chance): Bei Treffer' },
      { id: 13050000, part: 13050040, en: '+1 consecutive use', de: 'Folge-Einsatz +1' },
      { id: 13050000, en: '100% chance to inflict Blind on NPC targets', de: 'Gegen NPCs beträgt die Trefferchance von Blindheit 100 %' },
      { id: 13250000, en: 'inflicts Blind for 5s', de: 'versetzt es für 5s in Blindheit' },
    ],
    sources: [
      { label: 'metabot.gg – Assassin build (specialisations)', href: 'https://metabot.gg/en/aion-2/classes/assassin/build' },
      { label: 'aion2-meta.com – Assassin guide (specialisation slots)', href: 'https://aion2-meta.com/guides/assassin/' },
    ],
  },
  {
    id: 'five-insignias-aerial-bind',
    kind: 'status',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 13270000 }, { id: 13140000, part: 13140020 }, { id: 13100000 }, { id: 13060000, part: 13060010 }],
    payoff: [{ id: 13230000 }],
    window: 10,
    status: 'Insignia',
    title: {
      de: '5 Glyphen → sicherer Luftbann mit [[13230000]]',
      en: '5 Insignias → guaranteed Airborne with [[13230000]]',
    },
    text: {
      de: '[[13230000]] versetzt ein Ziel mit 5 Glyphenstapeln sicher in Luftbann, sonst nur mit 50 % Chance. Gegen NPCs sind es ohnehin 100 %, die Glyphen zählen also im PvP. [[13270000]] bindet 5 auf einmal, [[13140000]] ab Stufe 10 auch; [[13100000]] bindet 1 pro Treffer, [[13060000]] von hinten 2 (Stufe 8).',
      en: '[[13230000]] launches a target with 5 Insignia stacks Airborne for sure, otherwise only with a 50% chance. Against NPCs it is 100% anyway, so the Insignias matter in PvP. [[13270000]] engraves 5 at once, and so does [[13140000]] from level 10; [[13100000]] adds 1 per hit, [[13060000]] 2 from behind (level 8).',
    },
    how: {
      de: 'Bau die 5 Stapel auf, wirk dann [[13230000]] und zünde die Glyphen erst danach mit [[13130000]], denn die Explosion verbraucht sie.',
      en: 'Build the 5 stacks, cast [[13230000]], and only then detonate the Insignias with [[13130000]], since the Explosion consumes them.',
    },
    usage: {
      de: 'Fextralifes PvP-Build; Luftfessel steht auf höchstens 6 % der öffentlichen Leisten',
      en: 'Fextralife’s PvP build; Aerial Bind is on 6% of public skill bars or fewer',
    },
    evidence: [
      { id: 13230000, en: 'Has a 100% chance to inflict Airborne for 3s on targets with 5 stacks of Insignia', de: 'Bei einem Ziel mit 5 Glyphenstapeln: 100 % Chance, es für 3s in Luftbann zu versetzen' },
      { id: 13270000, en: 'engraves 5 Insignias for 10s', de: 'bindet 5 Glyphen für 10s' },
      { id: 13140000, part: 13140020, en: 'Engraves 5 Insignias for 10s on hit', de: '5 Glyphen für 10s binden: Bei Treffer' },
      { id: 13100000, en: 'engraves 1 Insignia for 10s', de: 'bindet 1 Glyphe für 10s' },
      { id: 13060000, part: 13060010, en: 'Engraves 2 Insignias for 10s on landing as a Back attack', de: '2 Glyphen für 10s binden: Bei Treffer (Rückseitig)' },
    ],
    sources: [
      { label: 'Fextralife – Assassin (PvP: guaranteed Airborne)', href: 'https://aion2.wiki.fextralife.com/Assassin' },
      { label: 'aion2vault.com – Assassin overview (stigma shares)', href: 'https://aion2vault.com/builds/assassin/' },
    ],
  },
];
