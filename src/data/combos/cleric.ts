import type { CuratedCombo } from './types';

/**
 * Cleric combos, checked by hand. Every link below is written in the skill texts of the Global client (English and
 * German data, see `evidence`); both languages were read for every skill. Where they differ, the reading was settled
 * like this: Noble Aura's level 10 option says "+20 damage" in English and "+20 %" in German – we use +20 % (German
 * text and aion2vault agree). Prayer of Amplification's level 15 option names "[Segen der Erde]" in German, a name the
 * German data also uses for Earth Punishment's party buff (English "Earth's Blessing"); the English text says Earth's
 * Grace and aion2vault reads it the same way, so it is the passive. The Root stigma's level 20 option doubles "Damage
 * over Time" on rooted targets without naming the skills; MetaBot and the Korean sources we could reach repeat only the
 * label, so that combo says so. Discharge is a chain skill of Thunder and Lightning, itself the chain skill of Earth's
 * Retribution, and has no page of its own; its link is proved by Earth's Retribution's own specialisations.
 * Usage numbers: aion2vault (public Global builds and macros on questlog.gg, read 2026-10-11 to 2026-10-14),
 * aion2-meta (top 39 Global Clerics, 2026-10-12; Korean PvP sample, which has more stigma slots). How-to notes follow
 * the published setups of Th3Ruthless, MrRosaPony, whelps, Lucia and aLuckyRO as summarised by aion2vault, in our
 * own words. Key chains run priority (bottom of the stack) first; the macro casts the first skill of a chain that
 * can be cast right now. Reviewed 2026-10-15: every combo re-read against both languages, the specialisations and the
 * chain skills; the common Cleric macro chains of aion2vault's macro guide are cited where they carry a combo.
 */
export const combos: CuratedCombo[] = [
  {
    id: 'chain-of-torment-condemnation',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 17070000 }],
    payoff: [{ id: 17350000 }],
    window: 10,
    title: {
      de: '[[17070000]] schaltet [[17350000]] frei',
      en: '[[17070000]] unlocks [[17350000]]',
    },
    text: {
      de: '[[17350000]] kannst du nur auf ein Ziel wirken, das von [[17070000]] betroffen ist. [[17070000]] hält 10 s bei 20 s Abklingzeit. Ohne Abklingzeit-Verringerung ist [[17350000]] also bis zur Hälfte der Zeit gesperrt.',
      en: '[[17350000]] can only target an enemy afflicted with [[17070000]]. [[17070000]] lasts 10s on a 20s cooldown, so without cooldown reduction [[17350000]] is locked for up to half of the time.',
    },
    how: {
      de: 'Leg beide auf eine Taste: [[17070000]] unten (Vorrang), [[17350000]] darüber. Die Taste wirkt [[17070000]], sobald es bereit ist, und sonst [[17350000]]. whelps stapelt sie umgekehrt – das klappt auch, denn ohne die Schwächung lässt sich [[17350000]] nicht wirken, und die Taste greift zu [[17070000]]. Die Taste kommt ins Makro, und du hältst sie zusammen mit [[17010000]] auf der linken Maustaste.',
      en: 'Put both on one key: [[17070000]] at the bottom (priority), [[17350000]] above it. The key casts [[17070000]] whenever it is ready and [[17350000]] otherwise. whelps stacks them the other way round; that works too, because without the debuff [[17350000]] cannot be cast and the key falls through to [[17070000]]. Put the key in the macro and hold it together with [[17010000]] on left click.',
    },
    stack: [17070000, 17350000],
    usage: {
      de: '40 % der öffentlichen Kleriker-Makros nutzen genau die Kette Kette des Schmerzes → Verdammnis; alle Creator-Makros haben beide auf einer Taste',
      en: '40% of public Cleric macros use exactly the chain Chain of Torment → Condemnation; every creator macro keeps both on one key',
    },
    evidence: [
      { id: 17350000, en: 'Selects a target within 20m afflicted with Chain of Torment', de: 'das von [Kette des Schmerzes] betroffen ist' },
      { id: 17070000, en: 'Damage over Time every 1s for 10s', de: 'Verringert bei den getroffenen Gegnern für 10s' },
    ],
    sources: [
      { label: 'aion2vault – Cleric overview', href: 'https://aion2vault.com/builds/cleric/' },
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2-meta – Cleric guide', href: 'https://aion2-meta.com/guides/cleric/' },
      { label: 'MetaBot – Condemnation', href: 'https://metabot.gg/en/aion-2/skills/condemnation' },
    ],
  },
  {
    id: 'earth-punishment-condemnation-reset',
    kind: 'cooldown',
    rating: 'core',
    content: ['boss', 'pvp'],
    setup: [{ id: 17400000, part: 17400010 }],
    payoff: [{ id: 17350000, part: 17350040 }],
    window: 10,
    title: {
      de: '[[17400000]] lässt [[17350000]] sich selbst zurücksetzen',
      en: '[[17400000]] makes [[17350000]] reset itself',
    },
    text: {
      de: 'Ab Stigma-Stufe 5 trifft [[17350000]] Ziele mit [[17400000]] immer kritisch. Mit der Stufe-12-Spezialisierung von [[17350000]] setzt jeder kritische Treffer dessen Abklingzeit zurück. Solange [[17400000]] auf dem Ziel liegt (10 s, ab Stigma-Stufe 20 20 s), ist [[17350000]] nach jedem Wirken sofort wieder bereit.',
      en: 'From stigma level 5, [[17350000]] always crits on targets carrying [[17400000]]. With the level 12 specialisation of [[17350000]], every crit resets its cooldown. So while [[17400000]] is on the target (10s, 20s from stigma level 20), [[17350000]] is ready again after every cast.',
    },
    how: {
      de: 'Setz [[17400000]] in dieselbe Kette, unter (vor) [[17070000]] und [[17350000]]: [[17430000]] → [[17400000]] → [[17070000]] → [[17350000]] (Lucia, von unten nach oben; whelps genauso). MrRosaPony legt [[17400000]] stattdessen in seine Buff-Kette [[17440000]] → [[17430000]] → [[17400000]] → [[17090000]] (27 % der öffentlichen Kleriker-Makros) neben eine Kette [[17070000]] → [[17350000]]. Th3Ruthless gibt seiner Kette mit [[17070000]] und [[17350000]] 8 von 10 Makro-Schritten, damit [[17350000]] unter [[17400000]] so oft wie möglich feuert. Bring [[17400000]] zuerst auf Stigma-Stufe 20. Im PvP setzt du es erst, wenn der Gegner seine Reinigung verbraucht hat (MrRosaPony).',
      en: 'Put [[17400000]] in the same chain, below (ahead of) [[17070000]] and [[17350000]]: [[17430000]] → [[17400000]] → [[17070000]] → [[17350000]] (Lucia, bottom first; whelps the same). MrRosaPony instead keeps [[17400000]] in his buff chain [[17440000]] → [[17430000]] → [[17400000]] → [[17090000]] (27% of public Cleric macros) next to a [[17070000]] → [[17350000]] chain. Th3Ruthless gives his chain with [[17070000]] and [[17350000]] 8 of his 10 macro steps so [[17350000]] fires as often as possible while [[17400000]] is up. Take [[17400000]] to stigma level 20 first. In PvP, land it only after the enemy has used their cleanse (MrRosaPony).',
    },
    stack: [17430000, 17400000, 17070000, 17350000],
    usage: {
      de: 'Strafe der Erde steht auf 81 % der öffentlichen Kleriker-Leisten mit Stigma und bei allen 39 besten globalen Klerikern',
      en: 'Earth Punishment is on 81% of public Cleric bars with a stigma and on all of the top 39 Global Clerics',
    },
    evidence: [
      { id: 17400000, part: 17400010, en: '[Condemnation] lands as a Critical Hit on targets afflicted with [Earth Punishment]', de: '[Verdammnis] trifft Ziele mit [Strafe der Erde] garantiert als Kritischer Treffer' },
      { id: 17350000, part: 17350040, en: 'Resets cooldown on landing a Critical Hit with [Condemnation]', de: 'Setzt bei Kritischer Treffer mit [Verdammnis] die Abklingzeit von [Verdammnis] zurück' },
      { id: 17400000, part: 17400040, en: '+10s [Earth Punishment] and [Earth\'s Blessing] duration', de: 'Verlängert die Dauer von [Strafe der Erde] und [Segen der Erde] um 10 Sek.' },
    ],
    sources: [
      { label: 'aion2vault – Cleric PvE build', href: 'https://aion2vault.com/builds/cleric/pve/' },
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2vault – best Cleric builds (PvP)', href: 'https://aion2vault.com/builds/cleric/best/' },
      { label: 'aion2-meta – Cleric guide', href: 'https://aion2-meta.com/guides/cleric/' },
      { label: 'Inven – 치유성 guide (KR)', href: 'https://www.inven.co.kr/board/aion2/6452/657' },
    ],
  },
  {
    id: 'debilitating-mark-noble-aura',
    kind: 'debuff',
    rating: 'strong',
    content: ['boss'],
    setup: [{ id: 17080000 }],
    payoff: [{ id: 17440000, part: 17440020 }],
    window: 10,
    status: 'Debilitating Mark',
    title: {
      de: '[[17080000]] verstärkt [[17440000]]',
      en: '[[17080000]] boosts [[17440000]]',
    },
    text: {
      de: 'Ab Stigma-Stufe 10 macht [[17440000]] mehr Schaden an Zielen mit [[17080000]]: +20 % laut deutschem Text, im englischen fehlt das %-Zeichen. Das Mal hält 10 s bei 10 s Abklingzeit, du kannst es also dauerhaft halten.',
      en: 'From stigma level 10, [[17440000]] deals more damage to targets with [[17080000]]: +20% in the German text, the English one drops the % sign. The mark lasts 10s on a 10s cooldown, so you can keep it up all the time.',
    },
    how: {
      de: 'Gib [[17080000]] einen eigenen Makro-Schritt oder setz es ganz unten (Vorrang) in eine Kette, z. B. [[17080000]] → [[17070000]] → [[17350000]] → [[17040000]] (aion2-meta, von unten nach oben). [[17440000]] wirkst du vor dem Kampf; sie bleibt 300 s und greift dein Ziel an. Halte das Mal also auf diesem Ziel.',
      en: 'Give [[17080000]] its own macro step or put it at the bottom (priority) of a chain, e.g. [[17080000]] → [[17070000]] → [[17350000]] → [[17040000]] (aion2-meta, bottom first). Cast [[17440000]] before the pull; it stays for 300s and attacks your target, so keep the mark on that target.',
    },
    stack: [17080000, 17070000, 17350000, 17040000],
    usage: {
      de: 'Edle Aura auf 63 % der öffentlichen Kleriker-Leisten mit Stigma; Mal der Schwächung als eigener Schritt in 37 % der Kleriker-Makros',
      en: 'Noble Aura on 63% of public Cleric bars with a stigma; Debilitating Mark as its own step in 37% of Cleric macros',
    },
    evidence: [
      { id: 17440000, part: 17440020, en: '+20 damage to targets afflicted with Debilitating Mark', de: 'Schaden (Ziel mit [Mal der Schwächung]) +20 %' },
      { id: 17440000, en: 'The Aura follows the caster and attacks their target together.', de: 'Die Aura begleitet den Wirker und greift das Ziel gemeinsam an.' },
      { id: 17080000, en: 'Damage over Time every 1s for 10s', de: 'Verringert bei den getroffenen Gegnern für 10s die PvE-Schadensverstärkung' },
    ],
    sources: [
      { label: 'aion2vault – Cleric PvE build', href: 'https://aion2vault.com/builds/cleric/pve/' },
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2-meta – Cleric guide', href: 'https://aion2-meta.com/guides/cleric/' },
    ],
  },
  {
    id: 'prayer-amplifies-graces',
    kind: 'buff',
    rating: 'strong',
    content: ['boss', 'aoe'],
    setup: [
      { id: 17430000, part: 17430020 },
      { id: 17430000, part: 17430030 },
    ],
    payoff: [{ id: 17730000 }, { id: 17780000 }],
    window: 14.5,
    title: {
      de: '[[17430000]] verstärkt [[17730000]] und [[17780000]]',
      en: '[[17430000]] amplifies [[17730000]] and [[17780000]]',
    },
    text: {
      de: 'Solange [[17430000]] wirkt (14,5 s auf Stigma-Stufe 10, 17 s auf 15), zählen die Passiven [[17730000]] (ab Stigma-Stufe 10) und [[17780000]] (ab Stigma-Stufe 15) 1,5-fach. [[17780000]] gibt Krit.-Schadensverstärkung – die greift bei jedem garantierten kritischen Treffer von [[17350000]] unter [[17400000]]. [[17730000]] gibt Kritischen Treffer: Damit trifft [[17350000]] auch auf Zielen ohne [[17400000]] öfter kritisch und setzt sich öfter zurück.',
      en: 'While [[17430000]] runs (14.5s at stigma level 10, 17s at 15), the passives [[17730000]] (from stigma level 10) and [[17780000]] (from stigma level 15) count 1.5 times. [[17780000]] adds Critical Damage Boost, which applies to every guaranteed crit of [[17350000]] under [[17400000]]. [[17730000]] adds Critical Hit, so [[17350000]] also crits, and resets, more often on targets without [[17400000]].',
    },
    how: {
      de: 'Setz [[17430000]] direkt unter [[17400000]] in dieselbe Kette: [[17430000]] → [[17400000]] → [[17070000]] → [[17350000]] (whelps, Lucia) oder [[17440000]] → [[17430000]] → [[17400000]] → [[17090000]] (MrRosaPony). So fällt der Buff in die Krit-Phase von [[17350000]]. Bring die beiden Passiven früh hoch: Lucia, whelps und BoredAF setzen sie an die Spitze; aLuckyRO nimmt zuerst Heilungsverstärkung, solange deine Ausrüstung wenig Krit hat.',
      en: 'Put [[17430000]] directly below [[17400000]] in the same chain: [[17430000]] → [[17400000]] → [[17070000]] → [[17350000]] (whelps, Lucia) or [[17440000]] → [[17430000]] → [[17400000]] → [[17090000]] (MrRosaPony), so the buff lines up with the crit phase of [[17350000]]. Level both passives early: Lucia, whelps and BoredAF rank them first; aLuckyRO takes Healing Enhancement first while your gear has little crit.',
    },
    stack: [17430000, 17400000, 17070000, 17350000],
    usage: {
      de: 'Gebet der Verstärkung auf 63 % der öffentlichen Kleriker-Leisten mit Stigma und bei 97 % der 39 besten globalen Kleriker; die Kette Edle Aura → Gebet der Verstärkung → Strafe der Erde → Licht der Regeneration steht in 27 % der Kleriker-Makros',
      en: 'Prayer of Amplification on 63% of public Cleric bars with a stigma and on 97% of the top 39 Global Clerics; the chain Noble Aura → Prayer of Amplification → Earth Punishment → Light of Regeneration is in 27% of Cleric macros',
    },
    evidence: [
      { id: 17430000, part: 17430020, en: 'x1.5 [Empyrean Lord\'s Grace] effect for the duration', de: 'Erhöht den Effekt von [Segen des Gebieters] während der Wirkungsdauer auf das 1,5-Fache' },
      { id: 17430000, part: 17430030, en: 'x1.5 [Earth\'s Grace] effect for the duration', de: 'Erhöht den Effekt von [Segen der Erde] während der Wirkungsdauer auf das 1,5-Fache' },
      { id: 17780000, en: 'Increases the caster\'s Critical Damage Boost by', de: 'Erhöht Krit.-Schadensverstärkung um' },
      { id: 17730000, en: 'Increases the caster\'s Critical Hit by', de: 'Erhöht beim Wirker Kritischer Treffer um' },
      { id: 17350000, part: 17350040, en: 'Resets cooldown on landing a Critical Hit with [Condemnation]', de: 'Setzt bei Kritischer Treffer mit [Verdammnis] die Abklingzeit von [Verdammnis] zurück' },
    ],
    sources: [
      { label: 'aion2vault – Cleric PvE build', href: 'https://aion2vault.com/builds/cleric/pve/' },
      { label: 'aion2vault – Cleric overview', href: 'https://aion2vault.com/builds/cleric/' },
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
    ],
  },
  {
    id: 'discharge-cuts-bolt',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss', 'aoe'],
    setup: [{ id: 17010000, part: 17010040 }],
    payoff: [{ id: 17060000 }],
    title: {
      de: '[[17010000]] verkürzt die Abklingzeit von [[17060000]]',
      en: '[[17010000]] shortens the cooldown of [[17060000]]',
    },
    text: {
      de: 'Auf [[17010000]] folgt immer [[17020000|Blitz und Donner]] und darauf mit 30 % Chance [[17030000|Entladung]]. Mit der Stufe-12-Spezialisierung von [[17010000]] senkt jeder Treffer von [[17030000|Entladung]] die Abklingzeit von [[17060000]] um 7 s. Die Stufe-8-Spezialisierung erhöht die Chance auf [[17030000|Entladung]] um 20 %.',
      en: '[[17010000]] always chains into [[17020000|Thunder and Lightning]], which chains into [[17030000|Discharge]] with a 30% chance. With the level 12 specialisation of [[17010000]], every [[17030000|Discharge]] hit cuts the cooldown of [[17060000]] by 7s. The level 8 specialisation adds +20% [[17030000|Discharge]] chance.',
    },
    how: {
      de: 'Halte [[17010000]] auf der linken Maustaste zusammen mit der Makro-Taste, dann läuft die Kette nebenher. [[17060000]] lädst du von Hand voll auf, sobald es bereit ist – nie im Makro. MrRosaPony lässt [[17060000]] aus seiner Rotation und nimmt stattdessen MP und Mehrfachtreffer.',
      en: 'Hold [[17010000]] on left click together with the macro key so the chain runs alongside. Charge [[17060000]] fully by hand whenever it is ready, never in the macro. MrRosaPony keeps [[17060000]] out of his rotation and takes MP and Multi-Hit instead.',
    },
    usage: {
      de: 'Gespielt von Th3Ruthless, whelps, Lucia und aLuckyRO; Donnerschlag steht auf 95 % der öffentlichen Kleriker-Leisten',
      en: 'Run by Th3Ruthless, whelps, Lucia and aLuckyRO; Bolt is on 95% of public Cleric bars',
    },
    evidence: [
      { id: 17010000, part: 17010040, en: '-7s [Bolt] cooldown on landing [Discharge]', de: '[Donnerschlag]-Abklingzeit −7s: Bei [Entladung]-Treffer' },
      { id: 17010000, part: 17010020, en: '+20% [Discharge] Chain Skill trigger chance', de: '[Entladung]-Folge: Aktivierungschance +20 %' },
      { id: 17060000, en: 'Max 3 Charge Levels', de: 'Maximal 3 Ladestufen' },
    ],
    sources: [
      { label: 'aion2vault – Cleric PvE build', href: 'https://aion2vault.com/builds/cleric/pve/' },
      { label: 'aion2vault – Cleric overview', href: 'https://aion2vault.com/builds/cleric/' },
    ],
  },
  {
    id: 'salvation-incoming-heal',
    kind: 'buff',
    rating: 'strong',
    content: ['pvp'],
    setup: [{ id: 17270000, part: 17270010 }],
    payoff: [{ id: 17100000 }, { id: 17120000 }],
    window: 3,
    title: {
      de: '[[17270000]] verdoppelt die Heilung, die du erhältst',
      en: '[[17270000]] doubles the healing you receive',
    },
    text: {
      de: '[[17270000]] macht dich 3 s immun gegen Schaden und Statuseffekte. Ab Stigma-Stufe 5 bekommst du dazu +100 % erhaltene Heilung. [[17100000]] und [[17120000]] heilen auch dich selbst und wirken in diesem Fenster doppelt.',
      en: '[[17270000]] makes you immune to damage and status effects for 3s. From stigma level 5 you also get +100% Incoming Heal. [[17100000]] and [[17120000]] heal you as well, so they count double in that window.',
    },
    how: {
      de: 'Drück [[17270000]] bei wenig LP und heil dich sofort mit [[17100000]] (mit der Stufe-8-Spezialisierung bis zu dreimal hintereinander) und [[17120000]]. Ab Stigma-Stufe 10 bekommst du am Ende noch 20 % deiner Max. LP. Danach greifst du wieder an (MrRosaPony).',
      en: 'Press [[17270000]] at low HP and heal yourself right away with [[17100000]] (up to three times in a row with its level 8 specialisation) and [[17120000]]. From stigma level 10 you also get 20% of your Max HP when it ends. Then go back on the attack (MrRosaPony).',
    },
    usage: {
      de: 'Erlösung auf 61 von 75 öffentlichen Kleriker-PvP-Leisten (81 %)',
      en: 'Salvation on 61 of 75 public Cleric PvP bars (81%)',
    },
    evidence: [
      { id: 17270000, part: 17270010, en: '+100% Incoming Heal', de: 'Heilung (Erhalten) +100 %' },
      { id: 17270000, en: 'The caster is immune to damage and status effects for 3s', de: 'Der Wirker ist für 3s immun gegen Schaden und Statuseffekte' },
      { id: 17100000, en: 'HP to the caster and the party member with the lowest HP', de: 'Regeneriert beim Wirker und beim Gruppenmitglied mit den niedrigsten LP' },
      { id: 17120000, en: 'removes 1 debuff for the caster and party members within 40m', de: 'Regeneriert beim Wirker und bei Gruppenmitgliedern innerhalb von 40 m' },
      { id: 17100000, part: 17100010, en: '+2 consecutive uses', de: '+2 aufeinanderfolgende Anwendungen' },
      { id: 17270000, part: 17270020, en: 'Restores 20% of Max HP at the end of [Salvation]', de: 'Regeneriert bei Ende von [Erlösung] 20 % der Max. LP' },
    ],
    sources: [
      { label: 'aion2vault – best Cleric builds (PvP)', href: 'https://aion2vault.com/builds/cleric/best/' },
    ],
  },
  {
    id: 'stagger-scattershot',
    kind: 'enable',
    rating: 'situational',
    content: ['boss'],
    setup: [{ id: 17280000 }, { id: 17060000 }],
    payoff: [{ id: 17370000 }],
    status: 'Stagger',
    title: {
      de: '[[17280000]] und [[17060000]] öffnen [[17370000]]',
      en: '[[17280000]] and [[17060000]] open up [[17370000]]',
    },
    text: {
      de: '[[17370000]] trifft nur benommene Ziele. Benommen wird ein Boss, wenn seine Benommen-Leiste voll ist. Am meisten füllen sie [[17280000]] (50) und ein voll geladenes [[17060000]] (bis 35). Ab Stufe 16 senkt jeder Treffer von [[17370000]] alle deine Abklingzeiten um 1 s.',
      en: '[[17370000]] only hits staggered targets. A boss becomes staggered when its Stagger Gauge is full. Your biggest Stagger Gauge hits are [[17280000]] (50) and a fully charged [[17060000]] (up to 35). From level 16, every hit of [[17370000]] cuts all your cooldowns by 1s.',
    },
    how: {
      de: 'Heb [[17060000]] (voll geladen, von Hand) für die Phase auf, in der deine Gruppe die Leiste füllen muss (MrRosaPony); [[17280000]] hilft, falls du es trägst – auf öffentlichen Leisten ist es selten (3 %). Leg [[17370000]] auf eine eigene Taste außerhalb des Makros, wie es fast alle mit Benommen-Skills machen, und streu es ein, solange der Boss benommen ist. Es lohnt sich vor allem auf Stufe 16 (Lucia), weil dann jeder Treffer alle Abklingzeiten senkt. Ersetz damit nicht dein Makro: MrRosaPony fand es schwächer und lässt es weg.',
      en: 'Save [[17060000]] (fully charged, by hand) for the phase in which your group has to fill the gauge (MrRosaPony); [[17280000]] helps if you slot it, but it is rare on public bars (3%). Put [[17370000]] on a key of its own outside the macro, as almost everyone does with stagger skills, and weave it in while the boss is staggered. It pays off mainly at level 16 (Lucia), when every hit cuts all cooldowns. Do not swap your macro for it: MrRosaPony found it weaker and leaves it off his bar.',
    },
    usage: {
      de: 'Blitzfeuer auf 53 % der öffentlichen Kleriker-Leisten; 56 % der 39 besten globalen Kleriker lassen es unter Stufe 8',
      en: 'Lightning Strike Scattershot on 53% of public Cleric bars; 56% of the top 39 Global Clerics leave it below level 8',
    },
    evidence: [
      { id: 17370000, en: 'damage to a target afflicted with Stagger within 20m', de: 'Fügt einem benommenen Ziel innerhalb von 20 m' },
      { id: 17280000, en: '50 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 50' },
      { id: 17060000, en: '20-35 Stagger Gauge Damage', de: 'Benommen-Leiste (Schaden) 20–35' },
      { id: 17370000, part: 17370050, en: '-1s all skill cooldowns on hit', de: 'Abklingzeit (Alle Fäh.) −1s: Bei Treffer' },
    ],
    sources: [
      { label: 'aion2vault – Cleric PvE build', href: 'https://aion2vault.com/builds/cleric/pve/' },
      { label: 'aion2vault – Cleric overview', href: 'https://aion2vault.com/builds/cleric/' },
      { label: 'aion2vault – macro guide', href: 'https://aion2vault.com/builds/macros/' },
      { label: 'aion2-meta – Cleric guide', href: 'https://aion2-meta.com/guides/cleric/' },
    ],
  },
  {
    id: 'root-doubles-dots',
    kind: 'status',
    rating: 'situational',
    content: ['aoe', 'pvp'],
    setup: [{ id: 17190000, part: 17190040 }],
    payoff: [{ id: 17070000 }, { id: 17080000 }, { id: 17300000 }],
    window: 12,
    status: 'Root',
    title: {
      de: '[[17190000]] verdoppelt deinen Schaden über Zeit',
      en: '[[17190000]] doubles your damage over time',
    },
    text: {
      de: 'Ab Stigma-Stufe 20 verdoppelt [[17190000]] den Schaden über Zeit an Zielen in Bann. [[17190000]] selbst macht keinen Schaden über Zeit; gemeint sind also deine Skills mit Schaden über Zeit wie [[17070000]], [[17080000]] und [[17300000]]. Welche genau zählen, sagt der Text nicht. Die meisten Bosse kannst du wegen ihrer Handlungsunfähigkeits-Immunität nicht bannen.',
      en: 'From stigma level 20, [[17190000]] doubles Damage over Time on rooted targets. [[17190000]] deals no damage over time itself, so this means your DoT skills such as [[17070000]], [[17080000]] and [[17300000]]; the text does not say exactly which ones count. Most bosses cannot be rooted because of Incapacitated Immunity.',
    },
    how: {
      de: 'Zuerst [[17190000]] auf die Gruppe: NPCs bannt es immer, Spieler zu 75 % (ab Stigma-Stufe 15 +25 %). Dann [[17070000]] und [[17080000]] auf dieselben Ziele, im PvP auch [[17300000]]. Bann hält 10 s, ab Stigma-Stufe 10 12 s. Das lohnt sich nur mit [[17190000]] auf Stufe 20.',
      en: 'Open with [[17190000]] on the group: it always roots NPCs and has a 75% chance against players (+25% from stigma level 15). Then put [[17070000]] and [[17080000]] on the same targets, and in PvP [[17300000]] too. Root lasts 10s, 12s from stigma level 10. Only worth it with [[17190000]] at level 20.',
    },
    usage: {
      de: 'Bann auf 1 % der öffentlichen globalen Kleriker-Leisten; 41,6 % der koreanischen PvP-Spitze (mehr Stigma-Plätze)',
      en: 'Root on 1% of public Global Cleric bars; 41.6% of Korean top PvP players (more stigma slots)',
    },
    evidence: [
      { id: 17190000, part: 17190040, en: 'x2 Damage over Time on Root targets', de: 'Schaden über Zeit x2: Bei Bann' },
      { id: 17190000, en: 'Has a 75% chance to inflict Root for 10s', de: 'versetzt sie mit 75 % Chance für 10s in Bann' },
      { id: 17190000, en: '100% chance to inflict Root on NPC targets', de: 'Gegen NPCs beträgt die Trefferchance von Bann 100 %' },
      { id: 17190000, part: 17190030, en: '+25% Root chance', de: 'Bannchance +25 %' },
      { id: 17190000, part: 17190020, en: '+2s Root duration', de: 'Banndauer +2 Sek.' },
      { id: 17070000, en: 'Damage over Time every 1s for 10s', de: 'Schaden über Zeit zu' },
      { id: 17080000, en: 'Damage over Time every 1s for 10s', de: 'Schaden über Zeit zu' },
      { id: 17300000, en: 'damage every 1s and reduces enemy Incoming Heal', de: 'Schaden über Zeit zu und verringert gegnerische Heilung' },
    ],
    sources: [
      { label: 'MetaBot – Root', href: 'https://metabot.gg/en/aion-2/skills/root' },
      { label: 'aion2-meta – Cleric guide', href: 'https://aion2-meta.com/guides/cleric/' },
    ],
  },
];
