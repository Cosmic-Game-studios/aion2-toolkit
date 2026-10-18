import type { ClassType } from '../../../data/types';
import type { Guide, GuideBlock, GuideSection, L10n } from '../types';

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
  rotation: { intro?: L10n; blocks: { title: L10n; steps: { id: number; note?: L10n }[] }[]; tips: L10n[] };
  build: {
    intro?: L10n;
    points: L10n[];
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
  sources: { href: string; label: string }[];
  /** extra note in the sources section, e.g. where sources disagree */
  caveat?: L10n;
}

const sec = (de: string, en: string, blocks: GuideBlock[]): GuideSection => ({ title: { de, en }, blocks });

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
  for (const b of g.rotation.blocks) rotation.push({ type: 'rotation', title: b.title, steps: b.steps });
  rotation.push({ type: 'list', items: g.rotation.tips });

  const build: GuideBlock[] = [];
  if (g.build.intro) build.push({ type: 'text', text: g.build.intro });
  build.push(
    { type: 'heading', text: { de: 'Skillpunkte – in dieser Reihenfolge', en: 'Skill points – in this order' } },
    { type: 'steps', items: g.build.points.map((title) => ({ title })) },
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
      sec('Community-Builds', 'Community builds', communityBuilds(g.cls)),
      sec('Quellen', 'Sources', sources),
    ],
  };
}
