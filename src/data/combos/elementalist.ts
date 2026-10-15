import type { CuratedCombo } from './types';

/**
 * Elementalist (Spiritmaster in the global client): hand-checked combos. Every link is written in the skill texts of the
 * global client in both languages (`evidence`, checked by scripts/check-curated.mjs against all skill levels). Where EN and
 * DE differ, the stricter or more precise text was used: Jointstrike: Corrode raises the damage taken "durch Naturgeister"
 * (all your spirits, EN says "the Spirit"); the spirits' Lv8 option is "+10 %" on the skill chance (DE), so 15% becomes 25%;
 * Spirit's Benediction buffs "den beschworenen Naturgeist", so only a spirit that is already out is sure to get it.
 * Dimensional Control ("triggered briefly") was read as a short castable window, as aion2vault describes it and as 96% of
 * public bars and the 52% macro chain use it. Spirits: creators summon the Fire Spirit last so that it is the one that stays
 * out (aLuckyRO, game8, Sha2co); several guides say a new normal spirit replaces the previous one while the Ancient Spirit
 * comes on top. The skill texts do not say how many spirits can be out, so no combo here depends on it.
 * Usage and play order: public global builds and macros on questlog.gg as counted by aion2vault (2026-10-11 to 2026-10-14),
 * the creators aion2vault quotes (init.rb, Grobs, aLuckyRO, Hemi, Tsuruf, OneTimeACraft), aion2-meta, metabot, game8's
 * Fire Spirit build and Sha2co's Korean inven guide (all read 2026-10-15).
 * Left out on purpose: status-chance boosters paired with crowd control (Kaisinel's Power, Mental Focus, the Earth Spirit's
 * Curse hit and Cursed Cloud lowering Status Effect Resist before Fear or Seal: PvP only, no usage data), generic damage buffs
 * (Earth Tremor stacks, Element Unification, Flame Blessing) and guaranteed crits feeding the passive Corrode.
 * Open questions: which spirit joins a Jointstrike when the Ancient Spirit and another spirit are out (game8 plays as if the
 * Ancient one does); whether a spirit keeps the buffs it had when summoned (OneTimeACraft says so, the texts do not).
 */

const VAULT = { label: 'aion2vault – Spiritmaster overview', href: 'https://aion2vault.com/builds/spiritmaster/' };
const VAULT_PVE = { label: 'aion2vault – Spiritmaster PvE build', href: 'https://aion2vault.com/builds/spiritmaster/pve/' };
const VAULT_BEST = { label: 'aion2vault – best Spiritmaster builds', href: 'https://aion2vault.com/builds/spiritmaster/best/' };
const VAULT_MACRO = { label: 'aion2vault – macro guide (public questlog.gg macros)', href: 'https://aion2vault.com/builds/macros/' };
const META = { label: 'aion2-meta – Spiritmaster guide', href: 'https://aion2-meta.com/guides/spiritmaster/' };
const METABOT_GUIDE = { label: 'metabot.gg – class builds guide', href: 'https://metabot.gg/en/aion-2/guides/class-builds-guide' };
const METABOT_BUILD = { label: 'metabot.gg – top Spiritmaster players', href: 'https://metabot.gg/en/aion-2/classes/spiritmaster/build' };
const SHA2CO = { label: 'inven.co.kr – Sha2co: Spiritmaster macro and damage cycle (KR)', href: 'https://www.inven.co.kr/board/aion2/6454/9216' };
const GAME8 = { label: 'game8 – Fire Spirit Spiritmaster build', href: 'https://game8.co/games/Aion-2/archives/626151' };

export const combos: CuratedCombo[] = [
  // ───────────── core ─────────────
  {
    id: 'spirit-skills-four-elements',
    kind: 'stack',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 16100000 }, { id: 16110000 }, { id: 16130000 }, { id: 16120000 }],
    payoff: [{ id: 16300000 }],
    status: 'Four Elements',
    title: {
      de: "Geister-Fähigkeiten laden [[16300000]] auf",
      en: "Spirit skills charge up [[16300000]]",
    },
    text: {
      de: "Jedes Mal, wenn ein Naturgeist seine Fähigkeit einsetzt, bekommst du ein Element. Bei 4 Elementen erhältst du **4 Elemente**, und nur in diesem Zustand kannst du [[16300000]] wirken. Jeder Geist setzt seine Fähigkeit direkt beim Beschwören ein, danach mit etwas Glück bei seinen Treffern, höchstens alle 3 Sekunden.",
      en: "Each time a spirit uses its skill you gain an element. At 4 elements you get **Four Elements**, the only state in which [[16300000]] can be cast. Every spirit uses its skill the moment it is summoned, and after that by chance when its attacks land, at most once every 3 seconds.",
    },
    how: {
      de: "Leg [[16300000]] unten auf eine Taste, darüber [[16110000]], [[16130000]] und [[16100000]]: Ist die Fusion bereit, geht sie zuerst raus, sonst die nächste Beschwörung. So kommt [[16100000]] als Letzter und bleibt draußen; er greift am schnellsten an (aLuckyRO, game8). Wirf die Fusion sofort, denn solange **4 Elemente** aktiv ist, sammelst du keine Elemente. Die Lv8-Spezialisierung für +10 % Fähigkeitschance hebt Feuer- und Wassergeist von 15 % auf 25 %. Beim Leveln macht [[16120000]] als vierte Beschwörung eine Fusion sicher.",
      en: "Put [[16300000]] at the bottom of a key with [[16110000]], [[16130000]] and [[16100000]] above it: the Fusion goes out first when it is ready, otherwise the next summon. That way [[16100000]] comes last and stays out; it attacks fastest (aLuckyRO, game8). Cast the Fusion at once, because you gain no elements while **Four Elements** is active. The Lv8 option for +10% skill chance raises the Fire and Water Spirit from 15% to 25%. While leveling, [[16120000]] as a fourth summon makes one Fusion certain.",
    },
    stack: [16300000, 16110000, 16130000, 16100000],
    usage: {
      de: "Geister in etwa 3 von 4 öffentlichen Spiritmaster-Makros; Grobs und Hemi spielen genau diese Kette",
      en: "Spirits are in about 3 of 4 public Spiritmaster macros; Grobs and Hemi run exactly this chain",
    },
    evidence: [
      { id: 16300000, en: "The Spiritmaster receives an element each time a Spirit uses its skill.", de: "Jedes Mal, wenn der Naturgeist eine Fähigkeit einsetzt, erhält der Beschwörer ein Element." },
      { id: 16300000, en: "[Elemental Fusion] can only be used when granted Four Elements", de: "[Elementarfusion] kann nur während dieses Zustands verwendet werden" },
      { id: 16300000, en: "Cannot receive additional elements while in Four Elements status.", de: "Während [4 Elemente] aktiv ist, können keine weiteren Elemente erhalten werden." },
      { id: 16100000, en: "The Fire Spirit rushes towards a target within 20m and uses a skill", de: "Der Feuergeist stürmt auf ein Ziel innerhalb von 20 m zu und verwendet eine Fähigkeit" },
      { id: 16100000, en: "with a 15% chance to use its skill each time an attack lands", de: "Jeder Treffer löst mit 15 % Chance seine Fähigkeit erneut aus" },
      { id: 16100000, en: "Spirit Skill Cooldown: 3s", de: "Abklingzeit (Naturgeist-Fäh.): 3 Sek." },
      { id: 16100000, part: 16100030, en: "10% chance to activate skill when Fire Spirit lands attack", de: "Fäh.-Aktivierungschance +10 %: Bei Treffer (Feuergeist)" },
    ],
    sources: [VAULT_PVE, VAULT_MACRO, GAME8, SHA2CO],
  },
  {
    id: 'ancient-spirit-four-elements',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 16250000 }],
    payoff: [{ id: 16300000 }],
    window: 30,
    status: 'Four Elements',
    title: {
      de: "[[16250000]] schaltet [[16300000]] frei",
      en: "[[16250000]] unlocks [[16300000]]",
    },
    text: {
      de: "Jedes Mal, wenn der Uralte Naturgeist seine Fähigkeit einsetzt, bekommst du sofort **4 Elemente**, ohne Elemente zu sammeln. Er setzt sie beim Erscheinen ein und dann nach 7 Standardangriffen, ab Stigma-Stufe 15 schon nach 5. In seinen 30 Sekunden kannst du [[16300000]] also mehrmals wirken.",
      en: "Each time the Ancient Spirit uses its skill you get **Four Elements** at once, with no elements to collect. It uses the skill as it appears and then after 7 basic attacks, after 5 from stigma level 15. During its 30 seconds you can cast [[16300000]] several times.",
    },
    how: {
      de: "Ruf [[16250000]] von Hand und wirf [[16300000]], sobald sie leuchtet. Ist **4 Elemente** noch offen, wenn er wieder zuschlägt, bringt dieser Schlag dir nichts – darum gehört die Fusion unten auf ihre Taste. Bring den Uralten Naturgeist als erste Stigma auf Stufe 15.",
      en: "Summon [[16250000]] by hand and cast [[16300000]] the moment it lights up. If **Four Elements** is still unspent when it strikes again, that strike gives you nothing, so keep the Fusion at the bottom of its key. Take the Ancient Spirit to stigma level 15 first.",
    },
    usage: {
      de: "Uralter Naturgeist auf 94 % der öffentlichen Spiritmaster-Leisten; fast 9 von 10 Makros lassen ihn draußen",
      en: "Ancient Spirit on 94% of public Spiritmaster bars; nearly 9 in 10 macros leave it out",
    },
    evidence: [
      { id: 16250000, en: "grants Four Elements status each time the Ancient Spirit uses its skill", de: "Jedes Mal, wenn der Uralte Naturgeist eine Fähigkeit einsetzt, erhält der Wirker [4 Elemente]" },
      { id: 16250000, en: "reuses its skill after 7 basic attacks", de: "verwendet nach 7 Standardangriffen erneut seine Fähigkeit" },
      { id: 16250000, part: 16250030, en: "Ancient Spirit uses skill after 5 basic attacks", de: "Uralter Naturgeist: Fäh.-Einsatz nach 5 Standardangriffen" },
      { id: 16300000, en: "[Elemental Fusion] can only be used when granted Four Elements", de: "[Elementarfusion] kann nur während dieses Zustands verwendet werden" },
    ],
    sources: [VAULT_PVE, VAULT_BEST, VAULT_MACRO],
  },
  {
    id: 'spirit-skills-dimensional-control',
    kind: 'enable',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 16100000 }, { id: 16110000 }, { id: 16130000 }, { id: 16120000 }, { id: 16250000 }],
    payoff: [{ id: 16330000 }],
    title: {
      de: "Geister-Fähigkeiten öffnen [[16330000]]",
      en: "Spirit skills open [[16330000]]",
    },
    text: {
      de: "[[16330000]] ist nur kurz nach jeder Fähigkeit eines Naturgeists einsetzbar. Sie trifft bis zu 4 Gegner, verlangsamt sie und gibt dir 100 MP. Jede Beschwörung und jede spätere Geister-Fähigkeit öffnet sie neu.",
      en: "[[16330000]] can only be cast for a short moment after each spirit skill. It hits up to 4 enemies, slows them and gives you 100 MP. Every summon and every later spirit skill opens it again.",
    },
    how: {
      de: "Leg sie in die häufigste Kette [[16140000]] → [[16300000]] → [[16330000]] → [[16040000]]. Ist sie gerade nicht offen, nimmt die Kette einfach die nächste Fähigkeit, meist [[16040000]]; sie kostet dich also nichts. Wie lange das Fenster offen bleibt, sagt der Text nicht – im Makro verpasst du es nicht.",
      en: "Put it in the most common chain [[16140000]] → [[16300000]] → [[16330000]] → [[16040000]]. While it is not open, the chain simply takes the next skill, usually [[16040000]], so it costs you nothing. The text does not say how long the window stays open; in the macro you do not miss it.",
    },
    stack: [16140000, 16300000, 16330000, 16040000],
    usage: {
      de: "Diese Kette steckt in 52 % der öffentlichen Spiritmaster-Makros",
      en: "This chain is in 52% of public Spiritmaster macros",
    },
    evidence: [
      { id: 16330000, en: "A skill that is triggered briefly each time a Spirit uses its skill.", de: "Wird jedes Mal für kurze Zeit aktiviert, wenn der Naturgeist eine Fähigkeit einsetzt." },
      { id: 16110000, en: "The Water Spirit uses a skill that deals", de: "Der Wassergeist verwendet eine Fähigkeit, die einem Ziel" },
      { id: 16100000, en: "The Fire Spirit rushes towards a target within 20m and uses a skill", de: "Der Feuergeist stürmt auf ein Ziel innerhalb von 20 m zu und verwendet eine Fähigkeit" },
    ],
    sources: [VAULT_MACRO, VAULT_PVE, METABOT_GUIDE],
  },
  {
    id: 'corrode-spirit-damage',
    kind: 'debuff',
    rating: 'core',
    content: ['boss', 'aoe'],
    setup: [{ id: 16150000 }],
    payoff: [{ id: 16100000 }, { id: 16110000 }, { id: 16130000 }, { id: 16120000 }, { id: 16250000 }],
    window: 20,
    status: 'Corrode',
    title: {
      de: "[[16150000]] verstärkt deine Geister",
      en: "[[16150000]] boosts your spirits",
    },
    text: {
      de: "[[16150000]] belegt bis zu 4 Gegner 20 Sekunden lang mit **Korrosion**: Sie nehmen 10 % mehr Schaden durch deine Naturgeister und erleiden Schaden über Zeit. Ab Stigma-Stufe 5 kommen 15 % dazu, also 25 %. Das gilt für alle deine Geister, auch für [[16250000]].",
      en: "[[16150000]] puts **Corrode** on up to 4 enemies for 20 seconds: they take 10% more damage from your spirits and take damage over time. From stigma level 5 another 15% is added, 25% in total. It counts for all your spirits, [[16250000]] included; the German text names the spirits in the plural.",
    },
    how: {
      de: "Wirf [[16150000]] vor dem Burst der Geister, vor allem vor [[16250000]]; ab Stigma-Stufe 20 hält sie 30 Sekunden, so lange wie er. Grobs und Hemi legen sie unten in die Kette [[16150000]] → [[16140000]] → [[16330000]] → [[16040000]]. Sha2co lässt sie aus dem Makro, damit sie nicht an Trash verfliegt und beim Boss fehlt.",
      en: "Cast [[16150000]] before your spirits’ burst, above all before [[16250000]]; from stigma level 20 it lasts 30 seconds, as long as he does. Grobs and Hemi put it at the bottom of the chain [[16150000]] → [[16140000]] → [[16330000]] → [[16040000]]. Sha2co keeps it out of the macro so it is not spent on trash and on cooldown when the boss comes.",
    },
    stack: [16150000, 16140000, 16330000, 16040000],
    usage: {
      de: "Korrosion auf 81 % der öffentlichen Spiritmaster-Leisten",
      en: "Corrode on 81% of public Spiritmaster bars",
    },
    evidence: [
      { id: 16150000, en: "Increases damage taken from the Spirit by 10%", de: "Erhöht den durch Naturgeister erlittenen Schaden um 10 %" },
      { id: 16150000, en: "inflicting Corrode for 20s", de: "versetzt sie für 20s in [Korrosion]" },
      { id: 16150000, part: 16150010, en: "+15% extra damage taken from Spirit during Corrode", de: "Schaden durch Naturgeist +15 % (Zusätzlich): Während [Korrosion]" },
      { id: 16150000, part: 16150040, en: "+10s Corrode effect duration", de: "Effekt [Korrosion]: Wirkungsdauer +10 Sek." },
      { id: 16250000, en: "Summons an Ancient Spirit for 30s", de: "Beschwört einen Uralten Naturgeist, der 30 Sek. lang bestehen bleibt" },
    ],
    sources: [VAULT_PVE, VAULT, SHA2CO],
  },
  {
    id: 'benediction-buffs-spirits',
    kind: 'buff',
    rating: 'core',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 16190000 }],
    payoff: [{ id: 16250000 }, { id: 16100000 }, { id: 16110000 }, { id: 16130000 }],
    window: 10,
    title: {
      de: "[[16190000]] stärkt auch deinen Geist",
      en: "[[16190000]] powers up your spirit too",
    },
    text: {
      de: "[[16190000]] gibt dir und deinem beschworenen Naturgeist 10 Sekunden lang 20 % PvE-Schadensverstärkung, 20 % PvE-Schadensresistenz und Heilung jede Sekunde. Laut Text bekommt nur ein Geist, der schon draußen ist, den Buff sicher. Am meisten bringt er in den 30 Sekunden von [[16250000]].",
      en: "[[16190000]] gives you and your summoned spirit 10 seconds of +20% PvE Damage Boost, +20% PvE Damage Tolerance and healing every second. By the text, only a spirit that is already out is sure to get it. It pays most during the 30 seconds of [[16250000]].",
    },
    how: {
      de: "Leg die Gnade und [[16250000]] in dieselben paar Sekunden. Die Reihenfolge ist umstritten: aLuckyRO und metabot rufen erst die Geister und buffen dann, wie es der Text nahelegt. Sha2co und aion2-meta drücken die Gnade direkt vor [[16250000]], und OneTimeACraft bufft vor dem Beschwören, weil Geister die Werte vom Moment der Beschwörung behalten sollen – im Skilltext steht das nicht.",
      en: "Put Benediction and [[16250000]] into the same few seconds. The order is disputed: aLuckyRO and metabot summon first and buff afterwards, as the text suggests. Sha2co and aion2-meta press Benediction right before [[16250000]], and OneTimeACraft buffs before summoning, saying spirits keep the stats they had when summoned; the skill text does not say so.",
    },
    usage: {
      de: "Gnade auf 95 %, Uralter Naturgeist auf 94 % der öffentlichen Leisten; aLuckyRO, OneTimeACraft, Sha2co, aion2-meta und metabot setzen beide in der Eröffnung kurz nacheinander",
      en: "Benediction on 95% and the Ancient Spirit on 94% of public bars; aLuckyRO, OneTimeACraft, Sha2co, aion2-meta and metabot cast both within a few skills of each other in their openers",
    },
    evidence: [
      { id: 16190000, en: "for 10s to the caster and Spirit", de: "Erhöht beim Wirker und beim beschworenen Naturgeist für 10s" },
      { id: 16190000, en: "Increases PvE Damage Boost by 20%", de: "die PvE-Schadensverstärkung um 20 %" },
      { id: 16250000, en: "Summons an Ancient Spirit for 30s", de: "Beschwört einen Uralten Naturgeist, der 30 Sek. lang bestehen bleibt" },
    ],
    sources: [VAULT_PVE, META, SHA2CO, METABOT_GUIDE],
  },

  // ───────────── strong ─────────────
  {
    id: 'fusion-regains-four-elements',
    kind: 'proc',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 16300000, part: 16300050 }],
    payoff: [{ id: 16300000 }],
    status: 'Four Elements',
    title: {
      de: "[[16300000]] holt sich **4 Elemente** zurück",
      en: "[[16300000]] wins back **Four Elements**",
    },
    text: {
      de: "Normal entfernt [[16300000]] beim Wirken **4 Elemente**. Mit der Lv16-Spezialisierung bekommst du den Zustand mit 25 % Chance zurück und kannst die Fusion gleich noch einmal wirken, denn sie hat keine Abklingzeit.",
      en: "Casting [[16300000]] normally removes **Four Elements**. With the Lv16 option you get the state back 25% of the time and can cast the Fusion again right away, since it has no cooldown.",
    },
    how: {
      de: "Ohne die Lv12-Aufladung kann [[16300000]] ganz unten auf der Geister-Taste bleiben: Kommt **4 Elemente** zurück, feuert das Makro sie beim nächsten Durchlauf. Laut Sha2co bestimmt nichts deinen Schaden so stark wie die Frage, wie oft die Fusion so neu startet.",
      en: "Without the Lv12 charge option [[16300000]] can stay at the bottom of the spirit key: when **Four Elements** comes back, the macro fires it on the next pass. Sha2co counts these resets as the biggest swing in Spiritmaster damage.",
    },
    stack: [16300000, 16110000, 16130000, 16100000],
    usage: {
      de: "Grobs (Stufe 45) und die koreanischen Top-Spieler laut aion2-meta nehmen diese Spezialisierung",
      en: "Grobs (level 45) and the Korean top players per aion2-meta take this option",
    },
    evidence: [
      { id: 16300000, part: 16300050, en: "25% chance to regain Four Elements", de: "[4 Elemente] zurückerhalten (25 % Chance)" },
      { id: 16300000, en: "using [Elemental Fusion] will immediately remove Four Elements", de: "Bei Aktivierung wird [4 Elemente] sofort entfernt." },
      { id: 16300000, part: 16300040, en: "Changes to Charge Skill, dealing up to 200% more damage", de: "Änderung zur aufladbaren Fähigkeit, Schaden bis zu +200 %" },
    ],
    sources: [VAULT_PVE, META, SHA2CO],
  },
  {
    id: 'destructive-attack-resets-jointstrikes',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss', 'aoe'],
    setup: [{ id: 16240000, part: 16240040 }],
    payoff: [{ id: 16140000 }, { id: 16150000 }],
    title: {
      de: "[[16240000]] setzt [[16140000]] und [[16150000]] zurück",
      en: "[[16240000]] resets [[16140000]] and [[16150000]]",
    },
    text: {
      de: "Ab Stigma-Stufe 20 setzt der erste Treffer von [[16240000]] die Abklingzeiten beider Koordinationsangriffe zurück. Du kannst [[16140000]] und [[16150000]] also direkt noch einmal wirken.",
      en: "From stigma level 20 the first hit of [[16240000]] resets the cooldowns of both Jointstrikes, so you can cast [[16140000]] and [[16150000]] again right away.",
    },
    how: {
      de: "Wirf zuerst [[16140000]] und [[16150000]]. Lade dann [[16240000]] von Hand auf: Ab Stigma-Stufe 5 ist sie aufladbar, und das Makro würde sie ungeladen loslassen. Danach wirfst du beide sofort neu. Sha2co spielt: [[16150000]], Buffs, [[16250000]], [[16300000]], [[16240000]], wieder [[16150000]].",
      en: "Cast [[16140000]] and [[16150000]] first. Then charge [[16240000]] by hand: it becomes a charge skill at stigma level 5, and a macro would release it uncharged. Recast both straight after. Sha2co’s order: [[16150000]], buffs, [[16250000]], [[16300000]], [[16240000]], [[16150000]] again.",
    },
    usage: {
      de: "Offensive der Vernichtung in 66 von 172 öffentlichen Builds mit vier Stigmen; 97 % der Makros lassen sie draußen",
      en: "Destructive Attack in 66 of 172 public four-stigma builds; 97% of macros leave it out",
    },
    evidence: [
      { id: 16240000, part: 16240040, en: "Reset [Jointstrike: Curse] and [Jointstrike: Corrode] cooldown on landing [Jointstrike: Destructive Attack] first hit", de: "Abklingzeit von [Koordinationsangriff: Fluch], [Koordinationsangriff: Korrosion] zurücksetzen: Bei erstem Treffer mit [Koordinationsangriff: Offensive der Vernichtung]" },
      { id: 16240000, part: 16240010, en: "Changes to Charge Skill, dealing up to 200% more", de: "Änderung zur aufladbaren Fähigkeit" },
    ],
    sources: [VAULT_BEST, VAULT_MACRO, SHA2CO],
  },
  {
    id: 'revitalization-summon-cooldowns',
    kind: 'cooldown',
    rating: 'strong',
    content: ['boss', 'aoe'],
    setup: [{ id: 16750000 }],
    payoff: [{ id: 16100000 }, { id: 16110000 }, { id: 16130000 }],
    title: {
      de: "[[16750000]] holt die Geister schneller zurück",
      en: "[[16750000]] brings the spirits back sooner",
    },
    text: {
      de: "Jeder deiner Treffer verkürzt mit 20 % Chance die Abklingzeit der Geister-Beschwörungen um 1 Sekunde, höchstens einmal pro Sekunde. Jede neue Beschwörung setzt sofort ihre Fähigkeit ein: ein Element mehr für [[16300000]] und ein neues Fenster für [[16330000]].",
      en: "Each of your hits has a 20% chance to cut the cooldown of the spirit summons by 1 second, at most once per second. Every new summon uses its skill at once: one more element for [[16300000]] and a new window for [[16330000]].",
    },
    how: {
      de: "Bleib am Treffen: Halte [[16010000]] als Standardangriff zusammen mit dem Makro gedrückt und weiche nur aus, wenn es sein muss. Die Beschwörungen gehören ins Makro, damit sie rausgehen, sobald sie bereit sind.",
      en: "Keep hitting: hold [[16010000]] as your basic attack together with the macro and dodge only when you must. Keep the summons in the macro so they go out as soon as they are ready.",
    },
    usage: {
      de: "Hemi, Tsuruf und OneTimeACraft leveln die Passive früh; Sha2co nennt sie zusammen mit der Fusion den Kern des Schadens",
      en: "Hemi, Tsuruf and OneTimeACraft level the passive early; Sha2co names it, with Fusion, as the core of the damage",
    },
    evidence: [
      { id: 16750000, en: "Has a 20% chance to reduce the cooldown of Spirit summon skills by 1s on hit.", de: "Verringert bei einem Treffer mit 20 % Chance die Abklingzeiten von Naturgeist-Beschwörungsfähigkeiten um 1s" },
      { id: 16100000, en: "The Fire Spirit rushes towards a target within 20m and uses a skill", de: "Der Feuergeist stürmt auf ein Ziel innerhalb von 20 m zu und verwendet eine Fähigkeit" },
    ],
    sources: [VAULT_PVE, SHA2CO],
  },
  {
    id: 'benediction-spirit-strike',
    kind: 'buff',
    rating: 'strong',
    content: ['boss', 'aoe', 'pvp'],
    setup: [{ id: 16190000, part: 16190020 }],
    payoff: [{ id: 16710000 }],
    title: {
      de: "[[16190000]] verstärkt [[16710000]]",
      en: "[[16190000]] amplifies [[16710000]]",
    },
    text: {
      de: "Ab Stigma-Stufe 10 macht [[16190000]] die Schadensverstärkung der Passiven [[16710000]] 1,5-mal so stark, für dich und deinen Geist. Je höher die Passive, desto mehr bringt das. Ab Stufe 15 löst auch [[16770000]] 1,5-mal so oft aus und heilt 1,5-mal so viel.",
      en: "From stigma level 10, [[16190000]] makes the Damage Boost of the passive [[16710000]] 1.5 times as strong, for you and your spirit, so the higher the passive, the more it gives. From level 15, [[16770000]] also procs 1.5 times as often and heals 1.5 times as much.",
    },
    how: {
      de: "Level [[16710000]] als erste Passive, wie alle geprüften Creator, und bring [[16190000]] auf Stigma-Stufe 10. Wirf die Gnade in deinen Burst, wenn die Geister draußen sind.",
      en: "Level [[16710000]] as your first passive, as every creator checked does, and take [[16190000]] to stigma level 10. Use it in your burst while the spirits are out.",
    },
    usage: {
      de: "Gnade auf 95 % der öffentlichen Leisten; Geisterschlag ist bei allen geprüften Creatorn die erste Passive",
      en: "Benediction on 95% of public bars; Spirit Strike is the first passive of every creator checked",
    },
    evidence: [
      { id: 16190000, part: 16190020, en: "x1.5 [Spirit Strike] Damage Boost effect", de: "[Geisterschlag] (Passiv): Schadensverstärkung x1,5" },
      { id: 16710000, en: "Increases the Spirit's PvE Damage Boost by 15%", de: "die PvE-Schadensverstärkung des Naturgeists um 15 %" },
      { id: 16190000, part: 16190030, en: "x1.5 activation chance and amount healed from [Spirit Communion]", de: "[Geisterbindung]: Aktivierungschance, Regeneration x1,5" },
    ],
    sources: [VAULT_PVE, VAULT],
  },

  // ───────────── situational ─────────────
  {
    id: 'dot-consecutive-countercurrent',
    kind: 'proc',
    rating: 'situational',
    content: ['boss', 'aoe'],
    setup: [{ id: 16140000 }, { id: 16150000 }, { id: 16220000 }],
    payoff: [{ id: 16800000 }],
    status: 'Damage over Time',
    title: {
      de: "Schaden über Zeit schaltet [[16800000]] ein",
      en: "Damage over time switches on [[16800000]]",
    },
    text: {
      de: "Die Passive [[16800000]] gibt deinen Treffern 50 % Chance auf Zusatzschaden, einmal pro Sekunde, aber nur gegen ein Ziel, das gerade Schaden über Zeit erleidet. [[16140000]], [[16150000]] und [[16220000]] liefern genau das.",
      en: "The passive [[16800000]] gives your hits a 50% chance of extra damage, once per second, but only against a target that is taking damage over time. [[16140000]], [[16150000]] and [[16220000]] provide exactly that.",
    },
    how: {
      de: "Halte immer einen davon auf dem Ziel: [[16150000]] hält 20 Sekunden, [[16140000]] kommt alle 8 bis 10 Sekunden wieder; im Makro passiert das von selbst. metabot nimmt dafür zusätzlich einen Gift-Theostein, die Top-Spieler suchen die Passive aber kaum.",
      en: "Keep one of them on the target at all times: [[16150000]] lasts 20 seconds and [[16140000]] comes back every 8 to 10 seconds, which the macro does by itself. metabot adds a Poison Theostone for it, but top players hardly chase the passive.",
    },
    usage: {
      de: "Von metabot empfohlen; koreanische Top-Spieler suchen die Passive auf 1 % ihrer Ausrüstung, bei den globalen Top-Spielern gehört sie zu den niedrigsten Passiven",
      en: "Recommended by metabot; Korean top players look for it on 1% of their gear, and it is among the lowest passives of top global players",
    },
    evidence: [
      { id: 16800000, en: "on landing an attack on a target that is taking Damage over Time", de: "gegen ein von Schaden über Zeit betroffenes Ziel" },
      { id: 16140000, en: "Damage over Time every 1s and reduces damage dealt", de: "Schaden über Zeit zu und verringert den Schaden" },
      { id: 16150000, en: "Damage over Time every 1s", de: "Schaden über Zeit zu" },
      { id: 16220000, en: "Damage over Time every 1s for 10s", de: "Verursacht für 10s alle 1 Sek." },
    ],
    sources: [METABOT_GUIDE, METABOT_BUILD, META],
  },
  {
    id: 'summon-spirits-descent',
    kind: 'proc',
    rating: 'situational',
    content: ['boss', 'aoe'],
    setup: [{ id: 16250000 }, { id: 16100000 }, { id: 16110000 }, { id: 16130000 }],
    payoff: [{ id: 16730000 }],
    window: 10,
    title: {
      de: "Beschwören öffnet [[16730000]]",
      en: "Summoning opens [[16730000]]",
    },
    text: {
      de: "Nach jeder Beschwörung haben deine Treffer 10 Sekunden lang 50 % Chance auf Zusatzschaden, einmal pro Sekunde. Nach [[16250000]] sind es 30 Sekunden, und ab Stigma-Stufe 10 steigen Chance und Schaden in dieser Zeit auf das 1,5-Fache.",
      en: "After each summon your hits have a 50% chance of extra damage for 10 seconds, once per second. After [[16250000]] it lasts 30 seconds, and from stigma level 10 its chance and damage are 1.5 times higher during that time.",
    },
    how: {
      de: "Das Makro ruft die Geister alle 15 Sekunden neu, das 10-Sekunden-Fenster ist also meist offen. Leg deinen Burst in die 30 Sekunden nach [[16250000]].",
      en: "The macro resummons the spirits every 15 seconds, so the 10-second window is open most of the time. Put your burst into the 30 seconds after [[16250000]].",
    },
    evidence: [
      { id: 16730000, en: "whenever the Spiritmaster's attacks land within 10 seconds of summoning a Spirit", de: "innerhalb von 10 Sek. nach der Beschwörung eines Naturgeists" },
      { id: 16730000, en: "Duration is increased to 30s when an Ancient Spirit is summoned.", de: "erhöht sich auf 30 Sek., wenn ein Uralter Naturgeist beschworen wird" },
      { id: 16250000, part: 16250020, en: "x1.5 [Spirit's Descent] activation chance and damage for 30s", de: "[Herabkunft des Naturgeists]: Aktivierungschance, Schaden x1,5 für 30s" },
    ],
    sources: [VAULT_PVE, METABOT_BUILD],
  },
  {
    id: 'ancient-spirit-jointstrikes',
    kind: 'enable',
    rating: 'situational',
    content: ['boss', 'aoe'],
    setup: [{ id: 16250000 }],
    payoff: [{ id: 16150000 }, { id: 16140000 }, { id: 16240000 }],
    window: 30,
    title: {
      de: "[[16250000]] schlägt bei den Koordinationsangriffen mit",
      en: "[[16250000]] joins the Jointstrikes",
    },
    text: {
      de: "Bei jedem Koordinationsangriff schlägt ein beschworener Naturgeist mit, und je nach Geist fällt der Zusatztreffer anders aus. Der des Uralten Naturgeists ist bei [[16140000]], [[16150000]] und [[16240000]] der stärkste und trifft als Flächenschaden. Welcher Geist mitmacht, wenn [[16250000]] und ein zweiter Geist draußen sind, sagt der Text nicht.",
      en: "Every Jointstrike brings in a summoned spirit, and the extra hit depends on which one. The Ancient Spirit’s is the strongest for [[16140000]], [[16150000]] and [[16240000]], and it is area damage. The text does not say which spirit joins when [[16250000]] and a second spirit are out.",
    },
    how: {
      de: "game8 baut den Burst darauf, dass [[16250000]] bei [[16150000]] und [[16140000]] mitmacht, und Sha2co legt [[16240000]] und das zurückgesetzte [[16150000]] in dessen 30 Sekunden. Sicher ist der Uralt-Treffer nur, wenn [[16250000]] gerade dein einziger Geist ist, etwa wenn du wie aLuckyRO mit ihm eröffnest. Der Niederschlag aus dem Uralt-Treffer von [[16150000]] wirkt bei den meisten Bossen nicht.",
      en: "game8 builds its burst on [[16250000]] joining [[16150000]] and [[16140000]], and Sha2co puts [[16240000]] and the reset [[16150000]] into its 30 seconds. The Ancient hit is only certain while [[16250000]] is your only spirit, for example when you open the fight with it as aLuckyRO does. The Knockdown from the Ancient hit of [[16150000]] does not land on most bosses.",
    },
    evidence: [
      { id: 16140000, en: "The Spirit joins for a coordinated assault.", de: "Führt einen Koordinationsangriff mit einem Naturgeist aus." },
      { id: 16140000, en: "Ancient: 1257-1257 AoE damage", de: "Uralt: 1257–1257 Flächenschaden" },
      { id: 16150000, en: "Ancient: 1889-1889 AoE damage and Knockdown", de: "Uralter Naturgeist: 1889–1889 Flächenschaden, Niederschlag" },
      { id: 16240000, en: "Ancient: 2171-2171 AoE damage", de: "Uralter Naturgeist: 2171–2171 Flächenschaden" },
    ],
    sources: [GAME8, SHA2CO, VAULT_PVE],
  },
  {
    id: 'stagger-rapid-scattershot',
    kind: 'enable',
    rating: 'situational',
    content: ['boss'],
    setup: [{ id: 16240000 }, { id: 16250000 }],
    payoff: [{ id: 16340000 }],
    status: 'Stagger',
    title: {
      de: "Benommenheit öffnet [[16340000]]",
      en: "Stagger opens [[16340000]]",
    },
    text: {
      de: "[[16340000]] trifft nur ein benommenes Ziel. Benommen wird ein Boss, wenn seine Benommen-Leiste voll ist, und die füllt deine ganze Gruppe mit ihren Treffern. Deine größten Beiträge sind [[16240000]] mit 50, so viel wie keine andere Fähigkeit der Klasse, und [[16250000]] mit 20.",
      en: "[[16340000]] only hits a staggered target. A boss is staggered when its Stagger Gauge is full, and your whole group fills it with its hits. Your biggest shares are [[16240000]] with 50, more than any other skill of the class, and [[16250000]] with 20.",
    },
    how: {
      de: "Leg [[16340000]] auf eine eigene Taste, nicht ins Makro, und drück sie immer wieder, solange der Boss benommen ist. Mit der Lv16-Spezialisierung kürzt dabei jeder Treffer auch deine Abklingzeiten.",
      en: "Put [[16340000]] on a key of its own, not in the macro, and press it again and again while the boss is staggered. With the Lv16 option each hit also cuts your cooldowns.",
    },
    usage: {
      de: "Schnellfeuer auf 71 % der öffentlichen Leisten; 100 % der Makros lassen es draußen",
      en: "Rapid Scattershot on 71% of public bars; 100% of macros leave it out",
    },
    evidence: [
      { id: 16340000, en: "to a target afflicted with Stagger within 20m", de: "Fügt einem benommenen Ziel innerhalb von 20 m" },
      { id: 16240000, en: "50 Stagger Gauge Damage", de: "Benommen-Leiste (Schaden) 50" },
      { id: 16250000, en: "20 Stagger Gauge Damage", de: "Benommen-Leiste (Schaden) 20" },
    ],
    sources: [VAULT, VAULT_MACRO, VAULT_BEST],
  },
  {
    id: 'scattershot-cuts-cooldowns',
    kind: 'cooldown',
    rating: 'situational',
    content: ['boss'],
    setup: [{ id: 16340000, part: 16340050 }],
    payoff: [{ id: 16250000 }, { id: 16240000 }, { id: 16190000 }, { id: 16150000 }],
    status: 'Stagger',
    title: {
      de: "[[16340000]] holt im Benommen-Fenster deine Stigmen zurück",
      en: "[[16340000]] brings your stigmas back in stagger windows",
    },
    text: {
      de: "Mit der Lv16-Spezialisierung nimmt jeder Treffer von [[16340000]] 1 Sekunde von allen Abklingzeiten. Die Fähigkeit selbst hat keine Abklingzeit, also kürzt jeder Druck während der Benommenheit die langen Abklingzeiten von [[16250000]] (90 s), [[16240000]] und [[16190000]] (je 60 s) und [[16150000]] (45 s).",
      en: "With the Lv16 option every hit of [[16340000]] takes 1 second off all cooldowns. The skill has no cooldown itself, so every press during a stagger shortens the long cooldowns of [[16250000]] (90 s), [[16240000]] and [[16190000]] (60 s each) and [[16150000]] (45 s).",
    },
    how: {
      de: "Nimm die Spezialisierung, sobald [[16340000]] Stufe 16 erreicht, wie init.rbs Variant 1, das meistgelikte öffentliche PvE-Build. Spam [[16340000]] auf seiner eigenen Taste, solange der Boss benommen ist. Nur [[16200000]] wird davon nicht verkürzt.",
      en: "Take the option once [[16340000]] reaches level 16, as init.rb’s Variant 1, the most-liked public PvE build, does. Spam [[16340000]] on its own key while the boss is staggered. Only [[16200000]] is not shortened.",
    },
    usage: {
      de: "init.rb (Variant 1) nimmt diese Spezialisierung; Schnellfeuer auf 71 % der öffentlichen Leisten",
      en: "init.rb (Variant 1) takes this option; Rapid Scattershot is on 71% of public bars",
    },
    evidence: [
      { id: 16340000, part: 16340050, en: "-1s all skill cooldowns on hit", de: "Abklingzeit (Alle Fäh.) −1s: Bei Treffer" },
      { id: 16340000, en: "to a target afflicted with Stagger within 20m", de: "Fügt einem benommenen Ziel innerhalb von 20 m" },
      { id: 16200000, en: "Unaffected by cooldown reduction effects.", de: "Wird nicht von Effekten zur Verringerung der Abklingzeit beeinflusst." },
    ],
    sources: [VAULT_PVE, VAULT_MACRO],
  },
  {
    id: 'spirit-command-proxy',
    kind: 'enable',
    rating: 'situational',
    content: ['pvp'],
    setup: [{ id: 16130000 }, { id: 16100000 }, { id: 16110000 }],
    payoff: [{ id: 16170000 }],
    title: {
      de: "[[16170000]] braucht einen Geist in der Nähe",
      en: "[[16170000]] needs a spirit nearby",
    },
    text: {
      de: "[[16170000]] teilt 4 Sekunden lang den Schaden, den du nimmst: 41 % trägst du, 41 % der beschworene Naturgeist mit den meisten LP. Das klappt nur, wenn er höchstens 25 m entfernt steht. Ab Stigma-Stufe 15 wirkt [[16720000]] in dieser Zeit 1,5-fach.",
      en: "For 4 seconds [[16170000]] splits the damage you take: 41% goes to you and 41% to the summoned spirit with the most HP. It only works while that spirit is within 25 m. From stigma level 15, [[16720000]] is 1.5 times as strong during that time.",
    },
    how: {
      de: "Im PvP spielt init.rb meist mit [[16130000]], dessen LP pro Fähigkeitsstufe steigen, und holt Wasser- und Feuergeist erst, wenn der Erdgeist in Massenkämpfen fällt. Halte ihn nah bei dir; init.rb nimmt erst die Gnade und drückt [[16170000]], wenn der Kampf kippt.",
      en: "In PvP init.rb mostly plays with [[16130000]], whose HP rises with its skill level, and brings out the Water and Fire Spirit only when the Earth Spirit dies in mass fights. Keep it close; init.rb uses Benediction first and presses [[16170000]] when the fight turns.",
    },
    usage: {
      de: "Befehl: Stellvertretung in 12 von 17 öffentlichen PvP-Builds (sehr kleine Stichprobe)",
      en: "Command: Proxy in 12 of 17 public PvP builds (very small sample)",
    },
    evidence: [
      { id: 16170000, en: "This effect is applied to the summoned Spirit with the highest HP.", de: "Dieser Effekt wird auf den beschworenen Naturgeist mit den meisten LP angewendet." },
      { id: 16170000, en: "Damage is only shared if the Spirit is within 25m.", de: "Der Schaden wird nur geteilt, wenn sich der Naturgeist innerhalb von 25 m befindet." },
      { id: 16170000, part: 16170030, en: "x1.5 [Spirit Protection] effect during Command: Proxy", de: "Effekt [Naturgeistschutz] x1,5: Während [Befehl: Stellvertretung]" },
      { id: 16130000, en: "increases the Earth Spirit's Defense and HP by 2%", de: "steigen Verteidigung und LP des Erdgeists jeweils um 2 %" },
    ],
    sources: [VAULT_BEST],
  },
];
