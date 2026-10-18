import type { Lang } from '../../data/types';
import type { GuideBlock, GuideCell, L10n } from './types';

export const pick = (x: L10n, lang: Lang) => x[lang] ?? x.en;
export const cell = (x: GuideCell, lang: Lang) => (typeof x === 'string' ? x : pick(x, lang));

/**
 * Everything a reader reads in a block, as raw guide text (with **bold** and [[id|name]] still in it), and the skill
 * tiles it shows (they count a few words each for looking at them). Reading time and the guide search use it;
 * `skillIds` are the skills whose names the block shows next to their icons.
 */
export function blockText(b: GuideBlock, lang: Lang): { texts: string[]; tiles: number; skillIds: number[] } {
  const tx = (x?: L10n) => (x ? pick(x, lang) : '');
  const cx = (x?: GuideCell) => (x == null ? '' : cell(x, lang));
  const none = { tiles: 0, skillIds: [] as number[] };
  switch (b.type) {
    case 'text': case 'heading': return { texts: [tx(b.text)], ...none };
    case 'steps': return { texts: b.items.flatMap((s) => [tx(s.title), tx(s.text)]), ...none };
    case 'list': case 'checklist': return { texts: b.items.map((x) => tx(x)), ...none };
    case 'callout': return { texts: [tx(b.title), tx(b.text)], ...none };
    case 'facts': return { texts: b.items.flatMap((f) => [tx(f.label), tx(f.value)]), ...none };
    case 'table': return { texts: [tx(b.caption), ...b.head.map(cx), ...b.rows.flat().map(cx)], ...none };
    case 'links': return { texts: b.items.map((l) => tx(l.label)), ...none };
    case 'sources': return { texts: b.items.map((s) => s.label), ...none };
    case 'skills': return { texts: b.items.map((i) => tx(i.note)), tiles: b.items.length, skillIds: b.items.map((i) => i.id) };
    case 'keys': return { texts: b.items.map((k) => tx(k.note)), tiles: b.items.length, skillIds: b.items.flatMap((k) => k.ids) };
    case 'rotation': return { texts: [tx(b.title), ...b.steps.map((s) => tx(s.note))], tiles: b.steps.length, skillIds: b.steps.map((s) => s.id) };
    case 'specs': return { texts: b.items.map((i) => tx(i.note)), tiles: b.items.reduce((a, i) => a + 1 + i.parts.length * 2, 0), skillIds: b.items.map((i) => i.id) };
    case 'bars': case 'shares':
      return { texts: [tx(b.title), tx(b.caption), ...b.items.flatMap((i) => [cx(i.label), cx(i.note)])], tiles: b.items.length, skillIds: [] };
    case 'line':
      return { texts: [tx(b.title), tx(b.caption), tx(b.x.label), tx(b.y.label), ...b.series.map((s) => tx(s.label))], tiles: 4, skillIds: [] };
    case 'flow': return { texts: [tx(b.title), tx(b.caption), ...b.items.flatMap((i) => [tx(i.title), tx(i.text), cx(i.tag)])], ...none };
    case 'compare':
      return { texts: [tx(b.title), tx(b.caption), ...b.items.flatMap((i) => [tx(i.title), cx(i.tag), ...i.points.map((p) => tx(p.text)), tx(i.verdict)])], ...none };
    case 'stats': return { texts: b.items.flatMap((i) => [cx(i.value), tx(i.label), tx(i.note)]), ...none };
  }
}
