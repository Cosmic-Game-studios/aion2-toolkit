import type { ClassType } from '../../../data/types';
import type { ChartTone, Guide, GuideBlock, GuideCell, GuideSection, L10n } from '../types';
import { GUIDE_IDS, guideHref } from '../guideLinks';

/** a phase of the opener in the rotation diagram (a flow block); texts may use [[id|name]] */
export interface ClassFlowStep {
  title: L10n;
  text?: L10n;
  /** e.g. the key, as a string for both languages or { de, en } */
  tag?: GuideCell;
  /** blue = buff, violet = debuff, slate = movement / setup, gold = burst, teal = filler or heal */
  tone?: ChartTone;
}

/**
 * Key numbers of the top 10 of the class (public/data/top/<Class>.json, read on `power.asOf`). All values are medians
 * over the players; `rank` is the place of the class among the eight classes (1 = highest) for the same median.
 */
export interface ClassTopStats {
  cp: number;
  cpMin: number;
  cpMax: number;
  itemLevel: number;
  /** median of Combat Power ÷ item level per player */
  cpPerLevel: number;
  /** median of the Combat Power gained in the last 7 days (`cp7d`), over the players that have a value */
  weekly: number;
  /** how many of the 10 have a 7-day value */
  weeklyOf: number;
  rank: { cp: number; itemLevel: number; cpPerLevel: number; weekly: number };
}

/**
 * Shared layout of the class guides: every class guide has the same sections in the same order,
 * so players find things quickly. Texts may use [[id|name]] skill references (see ../types.ts).
 */
export interface ClassGuideInput {
  id: string;
  cls: ClassType;
  tone: Guide['tone'];
  title: L10n;
  summary: L10n;
  tags: L10n[];
  updated: string;
  /** role, difficulty, range, strengths, weaknesses … */
  glance: { label: L10n; value: L10n }[];
  forWhom: L10n;
  party: { dungeon: L10n[]; boss?: L10n; pvp: L10n; solo?: L10n };
  skills: { id: number; note: L10n }[];
  rotation: {
    intro?: L10n;
    /** the opener in a few phases (buffs → debuff → burst → filler), shown above the rotation blocks; keep it to 3–6 */
    flow?: { title?: L10n; caption?: L10n; items: ClassFlowStep[] };
    blocks: { title: L10n; steps: { id: number; note?: L10n }[] }[];
    tips: L10n[];
  };
  build: {
    intro?: L10n;
    points: L10n[];
    /**
     * how high the top 10 take their most important skills (public/data/top, `power.asOf`), shown after the skill point
     * steps: medians over the players of the shown skill level and of its parts (bought with skill points, from
     * Daevanion nodes, from gear). At most 10, highest first.
     */
    levels?: { id: number; level: number; bought: number; dv: number; gear: number; passive?: boolean }[];
    specs: { id: number; parts: number[]; note?: L10n }[];
    stigmas: { title: L10n; items: { id: number; note: L10n }[] }[];
    daevanion: L10n[];
    stats?: L10n;
  };
  /**
   * Hotbar keys in macro order first (macro: true), then the keys pressed by hand. ids in chain order:
   * the key uses the first skill that works right now.
   */
  macro: { keys: { key: string; ids: number[]; note?: L10n; macro?: boolean }[]; note: L10n };
  mistakes: L10n[];
  /**
   * The class part of "Highest Combat Power" (the general part is the combat-power guide): what the top 10 of the
   * class wear and level (public/data/top, read on the date in `asOf`) and what to do first.
   */
  power: {
    asOf: string;
    intro: L10n;
    /** key number tiles under the intro; must match the medians the intro quotes */
    stats?: ClassTopStats;
    gear: L10n[];
    arcana: L10n;
    /** stigmas to take to level 20 first, most important first */
    stigmas: { id: number; note: L10n }[];
    /**
     * every stigma the top 10 have in a slot: how many of the 10 (`n`) and the median level of those players, most
     * slotted first. Shown as a bar chart after `stigmas`; the stigmas of that list are gold, the others grey.
     */
    slotted?: { id: number; n: number; level: number }[];
    tips: L10n[];
  };
  /**
   * the section "Playstyles" after the core build: the other sensible ways to play the class (role, content, PvP),
   * each with what changes and when to switch, and the styles that do not work (playstyle-<class>.ts)
   */
  playstyles: GuideBlock[];
  sources: { href: string; label: string }[];
  /** extra note in the sources section, e.g. where sources disagree */
  caveat?: L10n;
}

const sec = (de: string, en: string, blocks: GuideBlock[]): GuideSection => ({ title: { de, en }, blocks });

type Lang = keyof L10n;
/** 1.234,5 / 1,234.5 */
const num = (n: number, lang: Lang, digits = 1) =>
  new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: digits }).format(n);
const both = (f: (lang: Lang) => string): L10n => ({ de: f('de'), en: f('en') });
/** 240364 → 240K (the way the class texts quote Combat Power) */
const kilo = (n: number) => `${Math.round(n / 1000)}K`;
const ordinal = (n: number) => {
  const t = n % 100;
  return `${n}${t >= 11 && t <= 13 ? 'th' : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th'}`;
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** 2026-10-18 → 18.10.2026 / 18 Oct 2026 */
const date = (iso: string): L10n => {
  const [y, m, d] = iso.split('-');
  return { de: `${d}.${m}.${y}`, en: `${+d} ${MONTHS[+m - 1]} ${y}` };
};
const topSource = (asOf: string): L10n => {
  const d = date(asOf);
  return { de: `AION2 Index, Top 10 der Klasse, ${d.de}.`, en: `AION2 Index, top 10 of the class, ${d.en}.` };
};
/**
 * Median weekly gain of the top 10 of each class on 2026-10-18 (lowest and highest class, players without a 7-day
 * value left out). Update together with the class files' `power.stats`.
 */
const WEEKLY_RANGE = '38–68K';

/** "Highest Combat Power": the key numbers of the top 10 as tiles */
function statTiles(s: ClassTopStats): GuideBlock {
  const place = (r: number): L10n => ({ de: `Platz ${r} von 8 Klassen`, en: `${ordinal(r)} of 8 classes` });
  return {
    type: 'stats',
    items: [
      {
        value: kilo(s.cp),
        label: { de: 'Kampfkraft (Median)', en: 'Combat Power (median)' },
        note: both((l) => `${l === 'de' ? 'Spanne' : 'range'} ${Math.round(s.cpMin / 1000)}–${kilo(s.cpMax)} · ${place(s.rank.cp)[l]}`),
        tone: 'gold',
      },
      {
        value: both((l) => num(Math.round(s.itemLevel), l, 0)),
        label: { de: 'Gegenstandsstufe (Median)', en: 'Item level (median)' },
        note: place(s.rank.itemLevel),
        tone: 'blue',
      },
      {
        value: `≈${Math.round(s.cpPerLevel)}`,
        label: { de: 'Kampfkraft pro Gegenstandsstufe', en: 'Combat Power per item level' },
        note: { de: `Median der 10 Spieler · Platz ${s.rank.cpPerLevel} von 8`, en: `median of the 10 players · ${ordinal(s.rank.cpPerLevel)} of 8` },
        tone: 'teal',
      },
      {
        value: `+${kilo(s.weekly)}`,
        label: { de: 'Zuwachs pro Woche (Median)', en: 'Gain per week (median)' },
        note: {
          de: `in den letzten 7 Tagen, ${s.weeklyOf} von 10 mit Wert · Platz ${s.rank.weekly} von 8`,
          en: `in the last 7 days, ${s.weeklyOf} of 10 have a value · ${ordinal(s.rank.weekly)} of 8`,
        },
        tone: 'green',
      },
    ],
  };
}

/** "Core build": how high the top 10 take their skills */
function levelsChart(items: NonNullable<ClassGuideInput['build']['levels']>, asOf: string): GuideBlock {
  const src = topSource(asOf);
  return {
    type: 'bars',
    title: { de: 'So hoch bringen die Top 10 ihre wichtigsten Skills', en: 'How high the top 10 take their key skills' },
    caption: {
      de: `Median der angezeigten Skillstufe, darunter die Mediane der Teile: mit Skillpunkten gekauft (höchstens 10), von Daevanion-Knoten, von der Ausrüstung – Mediane ergeben zusammen nicht immer genau die Gesamtstufe. Über 10 lohnt es sich weiter: Aktive Skills bekommen auf Skillstufe 12 und 20 je einen weiteren Spezialisierungs-Platz und auf 12 und 16 neue Optionen. Gold: aktive Skills, Türkis: passive. ${src.de}`,
      en: `Median shown skill level, with the medians of its parts underneath: bought with skill points (10 at most), from Daevanion nodes, from gear – medians do not always add up to the total exactly. Going past 10 still pays: active skills get another specialisation slot at skill levels 12 and 20 and new options at 12 and 16. Gold: active skills, teal: passives. ${src.en}`,
    },
    items: items.map((s) => ({
      label: `[[${s.id}]]`,
      value: s.level,
      note: {
        de: `${num(s.bought, 'de')} gekauft · +${num(s.dv, 'de')} Daevanion · +${num(s.gear, 'de')} Ausrüstung`,
        en: `${num(s.bought, 'en')} bought · +${num(s.dv, 'en')} Daevanion · +${num(s.gear, 'en')} gear`,
      },
      tone: (s.passive ? 'teal' : 'gold') as ChartTone,
    })),
  };
}

/** "Highest Combat Power": which stigmas the top 10 slot (gold: the "level 20 first" list) */
function slottedChart(items: NonNullable<ClassGuideInput['power']['slotted']>, first: Set<number>, asOf: string): GuideBlock {
  const src = topSource(asOf);
  return {
    type: 'bars',
    title: { de: 'Welche Stigmen die Top 10 einsetzen', en: 'Which stigmas the top 10 slot' },
    caption: {
      de: `Wie viele der Top 10 das Stigma in einem ihrer 4 Stigma-Plätze haben, darunter die Median-Stufe dieser Spieler (auf ganze Stufen gerundet). Gold: die Stigmen aus der Liste oben, grau: die Alternativen. ${src.de}`,
      en: `How many of the top 10 have the stigma in one of their 4 stigma slots, with the median level of those players underneath (rounded to whole levels). Gold: the stigmas of the list above, grey: the alternatives. ${src.en}`,
    },
    max: 10,
    items: items.map((s) => ({
      label: `[[${s.id}]]`,
      value: s.n,
      display: { de: `${s.n} von 10`, en: `${s.n} of 10` },
      note: { de: `Median Stufe ${Math.round(s.level)}`, en: `median level ${Math.round(s.level)}` },
      tone: (first.has(s.id) ? 'gold' : 'slate') as ChartTone,
    })),
  };
}

/**
 * questlog.gg class slugs. Its terms (version of 2026-09-29) forbid taking over its data or showing its pages
 * inside another site, so the guides only link there: the class guide and the build lists, which sort by likes.
 */
const QUESTLOG: Record<ClassType, string> = {
  Gladiator: 'gladiator', Templar: 'templar', Assassin: 'assassin', Ranger: 'ranger', Sorcerer: 'sorcerer',
  Elementalist: 'elementalist', Cleric: 'cleric', Chanter: 'chanter', Fighter: 'fighter',
};
const questlog = (path: string) => ({ de: `https://questlog.gg/aion-2/de/${path}`, en: `https://questlog.gg/aion-2/en/${path}` });

function communityBuilds(cls: ClassType): GuideBlock[] {
  const slug = QUESTLOG[cls];
  return [
    {
      type: 'text',
      text: {
        de: 'Auf **questlog.gg** gibt es einen eigenen Guide für diese Klasse. Er zeigt, welche Ausrüstung, Stigmen und Skills in den öffentlichen Builds der Spieler am häufigsten vorkommen; die Erklärtexte dort gibt es nur auf Englisch. Dazu kommen die Builds selbst: Charakter-Builds (Ausrüstung) und Skill-Builds (Skillpunkte und Stigmen), die meistgelikten stehen oben.',
        en: '**questlog.gg** has its own guide for this class. It shows which gear, stigmas and skills come up most in the players’ public builds. Then there are the builds themselves: character builds (gear) and skill builds (skill points and stigmas), with the most-liked at the top.',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { de: 'So findest du gute Builds', en: 'How to spot a good build' },
      text: {
        de: 'Likes zeigen, was beliebt ist, nicht ob ein Build noch aktuell ist. Stell oben die Region auf **Global**, achte auf das Datum und die Tags (PvE, PvP, Budget, Endgame) und vergleiche den Build mit dem Kern-Build oben. Ein Build mit vielen Likes von vor Monaten passt nach einem Patch oft nicht mehr.',
        en: 'Likes show what is popular, not whether a build is still current. Set the region at the top to **Global**, check the date and the tags (PvE, PvP, budget, endgame), and compare the build with the core build above. A build with many likes from months ago often no longer fits after a patch.',
      },
    },
    {
      type: 'links',
      items: [
        { href: questlog(`classes/${slug}`), label: { de: 'Klassen-Guide auf Questlog', en: 'Class guide on Questlog' }, primary: true },
        { href: questlog(`character-builder?class=${slug}`), label: { de: 'Charakter-Builds', en: 'Character builds' } },
        { href: questlog(`skill-builder?class=${slug}`), label: { de: 'Skill-Builds', en: 'Skill builds' } },
      ],
    },
  ];
}

export function classGuide(g: ClassGuideInput): Guide {
  const party: GuideBlock[] = [
    { type: 'heading', text: { de: 'In Dungeons', en: 'In dungeons' } },
    { type: 'list', items: g.party.dungeon },
  ];
  if (g.party.boss) party.push({ type: 'callout', tone: 'tip', title: { de: 'Beim Boss', en: 'At the boss' }, text: g.party.boss });
  party.push({ type: 'callout', tone: 'info', title: { de: 'Im PvP', en: 'In PvP' }, text: g.party.pvp });
  if (g.party.solo) party.push({ type: 'callout', tone: 'info', title: { de: 'Allein unterwegs', en: 'Playing solo' }, text: g.party.solo });

  const rotation: GuideBlock[] = [
    {
      type: 'text',
      text: {
        de: 'Eine **Rotation** ist die Reihenfolge, in der du deine Skills einsetzt. Die Grundidee: erst stärker machen (Buffs), dann den Gegner schwächen (Debuffs), dann die stärksten Skills – und in den Lücken Skills ohne Abklingzeit („Füller“). Tippe auf ein Symbol oder zeig mit der Maus darauf, um den Skill zu sehen.',
        en: 'A **rotation** is the order in which you use your skills. The basic idea: first make yourself stronger (buffs), then weaken the enemy (debuffs), then your strongest skills – and in the gaps skills without a cooldown (“fillers”). Tap or hover over an icon to see the skill.',
      },
    },
  ];
  if (g.rotation.intro) rotation.push({ type: 'text', text: g.rotation.intro });
  if (g.rotation.flow?.items.length) {
    rotation.push({
      type: 'flow',
      title: g.rotation.flow.title ?? { de: 'Die Eröffnung auf einen Blick', en: 'The opener at a glance' },
      caption: g.rotation.flow.caption ?? {
        de: 'Kurzfassung der Eröffnung von unten, in Phasen. Die einzelnen Skills folgen darunter, die Tasten bei „Leiste & Makro“.',
        en: 'The opener below in short, as phases. The single skills follow underneath, the keys under “Hotbar & macro”.',
      },
      items: g.rotation.flow.items,
    });
  }
  for (const b of g.rotation.blocks) rotation.push({ type: 'rotation', title: b.title, steps: b.steps });
  rotation.push({ type: 'list', items: g.rotation.tips });

  const build: GuideBlock[] = [];
  if (g.build.intro) build.push({ type: 'text', text: g.build.intro });
  build.push(
    { type: 'heading', text: { de: 'Skillpunkte – in dieser Reihenfolge', en: 'Skill points – in this order' } },
    { type: 'steps', items: g.build.points.map((title) => ({ title })) },
  );
  if (g.build.levels?.length) build.push(levelsChart(g.build.levels, g.power.asOf));
  build.push(
    { type: 'heading', text: { de: 'Spezialisierungen', en: 'Specialisations' } },
    { type: 'specs', items: g.build.specs },
  );
  for (const s of g.build.stigmas) build.push({ type: 'heading', text: s.title }, { type: 'skills', items: s.items });
  build.push({ type: 'heading', text: { de: 'Daevanion-Tafeln', en: 'Daevanion boards' } }, { type: 'list', items: g.build.daevanion });
  if (g.build.stats) build.push({ type: 'callout', tone: 'info', title: { de: 'Werte', en: 'Stats' }, text: g.build.stats });
  build.push({
    type: 'links',
    items: [
      { href: '#/skills', label: { de: 'Skillpunkte planen', en: 'Plan skill points' }, cls: g.cls },
      { href: '#/stigma', label: { de: 'Stigmen planen', en: 'Plan stigmas' }, cls: g.cls },
      { href: '#/daevanion', label: { de: 'Daevanion-Tafeln planen', en: 'Plan Daevanion boards' }, cls: g.cls },
    ],
  });

  const asOf = date(g.power.asOf);
  const charts = g.power.stats || g.power.slotted?.length;
  const power: GuideBlock[] = [{ type: 'text', text: g.power.intro }];
  if (g.power.stats) power.push(statTiles(g.power.stats));
  power.push(
    { type: 'heading', text: { de: 'Ausrüstung der Top 10', en: 'Gear of the top 10' } },
    { type: 'list', items: g.power.gear },
    { type: 'heading', text: { de: 'Arcana', en: 'Arcana' } },
    { type: 'text', text: g.power.arcana },
    { type: 'heading', text: { de: 'Diese Stigmen zuerst auf Stufe 20', en: 'Take these stigmas to level 20 first' } },
    { type: 'skills', items: g.power.stigmas },
  );
  if (g.power.slotted?.length) power.push(slottedChart(g.power.slotted, new Set(g.power.stigmas.map((s) => s.id)), g.power.asOf));
  power.push(
    { type: 'list', items: g.power.tips },
    {
      type: 'callout',
      tone: 'info',
      title: { de: 'Stand', en: 'As of' },
      text: {
        de: `Die Zahlen zu den Top 10 in diesem Abschnitt${charts ? ' (Text, Kacheln und Diagramm)' : ''} stammen vom ${asOf.de} (AION2 Index). **Median** heißt: der mittlere Wert – die Hälfte der zehn Spieler liegt darüber, die Hälfte darunter. Die Top 10 der acht Klassen legen im Median ${WEEKLY_RANGE} Kampfkraft pro Woche zu – die aktuellen Werte zeigt die Top-10-Seite.`,
        en: `The top 10 numbers in this section${charts ? ' (text, tiles and chart)' : ''} are from ${asOf.en} (AION2 Index). **Median** means the middle value – half of the ten players are above it, half below. The top 10 of the eight classes gain a median ${WEEKLY_RANGE} Combat Power per week – the top 10 page shows the current values.`,
      },
    },
    {
      type: 'links',
      items: [
        { href: guideHref(GUIDE_IDS.combatPower), label: { de: 'Kampfkraft-Guide: was wie viel bringt', en: 'Combat Power guide: what gives how much' }, primary: true },
        { href: `#/top/${g.cls.toLowerCase()}`, label: { de: 'Top 10 der Klasse (aktuell)', en: 'Top 10 of the class (current)' } },
        { href: '#/stigma', label: { de: 'Stigmen planen', en: 'Plan stigmas' }, cls: g.cls },
      ],
    },
  );

  const sources: GuideBlock[] = [
    {
      type: 'callout',
      tone: 'warn',
      title: { de: 'Stand der Infos', en: 'How current this is' },
      text: g.caveat ?? {
        de: 'Builds ändern sich mit Patches und Balancing. Dieser Guide fasst zusammen, was erfahrene Spieler empfehlen, und prüft es gegen die Skilldaten – bei Widersprüchen gilt, was im Spiel bei dir funktioniert.',
        en: 'Builds change with patches and balancing. This guide sums up what experienced players recommend and checks it against the skill data – where things disagree, what works for you in game wins.',
      },
    },
    { type: 'sources', items: g.sources },
  ];

  return {
    id: g.id,
    icon: 'book',
    tone: g.tone,
    category: 'class',
    cls: g.cls,
    title: g.title,
    summary: g.summary,
    updated: g.updated,
    tags: g.tags,
    basis: {
      de: 'Community-Guides und Spielerberichte (Quellen unten), abgeglichen mit den Skilldaten des globalen Clients',
      en: 'Community guides and player reports (sources below), checked against the skill data of the global client',
    },
    sections: [
      sec('Auf einen Blick', 'At a glance', [
        { type: 'facts', items: g.glance },
        { type: 'callout', tone: 'tip', title: { de: 'Passt zu dir, wenn …', en: 'Right for you if …' }, text: g.forWhom },
      ]),
      sec('Deine Aufgabe in der Gruppe', 'Your job in the group', party),
      sec('Die wichtigsten Skills', 'The most important skills', [{ type: 'skills', items: g.skills }]),
      sec('Rotation', 'Rotation', rotation),
      sec('Kern-Build', 'Core build', build),
      sec('Spielstile', 'Playstyles', g.playstyles),
      sec('Leiste & Makro', 'Hotbar & macro', [
        {
          type: 'text',
          text: {
            de: 'So belegst du deine Tasten. Auf einer Taste liegt eine Kette aus bis zu 4 Skills – die Taste nimmt den **ersten Skill der Kette, der gerade geht**. Das Makro drückt die Tasten mit „im Makro“ der Reihe nach, die Füller-Taste T als letzten Schritt. Die Grundattacke hältst du mit der linken Maustaste gedrückt, Schockaufhebung liegt auf der Leertaste, alles andere drückst du von Hand. Wie das genau funktioniert, erklärt der Makro-Guide.',
            en: 'This is how to set up your keys. A key holds a chain of up to 4 skills – it uses the **first skill of the chain that works right now**. The macro presses the keys marked “in the macro” one after another, the filler key T as its last step. You hold the basic attack with the left mouse button, Defiance sits on Space, and you press everything else by hand. The macro guide explains how it works.',
          },
        },
        { type: 'keys', items: g.macro.keys },
        { type: 'callout', tone: 'tip', text: g.macro.note },
        { type: 'links', items: [{ href: '#/guides/macros', label: { de: 'Makro-Guide lesen', en: 'Read the macro guide' } }, { href: '#/hotbar', label: { de: 'Makro im Planer bauen', en: 'Build the macro in the planner' }, cls: g.cls }] },
      ]),
      sec('Häufige Fehler', 'Common mistakes', [{ type: 'list', items: g.mistakes }]),
      sec('Höchste Kampfkraft', 'Highest Combat Power', power),
      sec('Community-Builds', 'Community builds', communityBuilds(g.cls)),
      sec('Quellen', 'Sources', sources),
    ],
  };
}
