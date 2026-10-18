import type { Lang } from '../../data/types';
import { skillTextPlain } from '../../components/SkillText';
import { matchRanges, norm, queryTokens, scoreFields, type Field } from '../search/searchIndex';
import { blockText, pick } from './blockText';
import type { Guide } from './types';

/*
 * Full-text search of the guides page: every block of every guide in the page language is one entry, so a hit leads to
 * the paragraph, table or chart that holds the words (#/guides/<id>?s=<section>&b=<block>&q=<query>). Skill references
 * count with the skill's name in the page language. Pure (no React); matching and ranking as in the quick search.
 */

interface Entry {
  guide: Guide;
  section: number;
  block: number;
  sectionTitle: string;
  /** the block as plain text: what the snippet shows */
  text: string;
  fields: Field[];
}

export interface GuideIndex { blocks: Entry[]; guides: { guide: Guide; fields: Field[] }[] }

export interface BlockHit { section: number; block: number; sectionTitle: string; snippet: string; ranges: [number, number][]; score: number }
export interface GuideResult { guide: Guide; titleHit: boolean; score: number; hits: BlockHit[] }

const f = (text: string, w: number, key?: boolean): Field => ({ text: norm(text), w, key });

export function buildGuideIndex(guides: Guide[], lang: Lang, skillName: (id: number) => string | undefined): GuideIndex {
  const blocks: Entry[] = [];
  for (const g of guides) {
    const title = pick(g.title, lang);
    g.sections.forEach((s, i) => {
      const sectionTitle = pick(s.title, lang);
      s.blocks.forEach((b, j) => {
        const { texts, skillIds } = blockText(b, lang);
        const plain = texts.filter(Boolean).map((x) => skillTextPlain(x, skillName));
        const names = [...new Set(skillIds.map(skillName).filter((x): x is string => !!x))];
        const text = [...plain, names.join(', ')].filter(Boolean).join(' · ').replace(/\s+/g, ' ').trim();
        if (!text) return;
        // the block has to match by its own words; the section and guide titles only lift it
        blocks.push({ guide: g, section: i, block: j, sectionTitle, text, fields: [f(text, 1, true), f(sectionTitle, 0.5), f(title, 0.35)] });
      });
    });
  }
  const heads = guides.map((g) => ({
    guide: g,
    fields: [f(pick(g.title, lang), 1, true), f(pick(g.summary, lang), 0.5), ...g.tags.map((t) => f(pick(t, lang), 0.6))],
  }));
  return { blocks, guides: heads };
}

/** about 220 characters around the first match, cut at spaces */
function snippetOf(text: string, tokens: string[]): { snippet: string; ranges: [number, number][] } {
  const all = matchRanges(text, tokens);
  const first = all[0]?.[0] ?? 0;
  const LEN = 220;
  if (text.length <= LEN) return { snippet: text, ranges: all };
  let start = Math.max(0, first - 70);
  if (start > 0) { const sp = text.lastIndexOf(' ', start); start = sp > first - 110 && sp >= 0 ? sp + 1 : start; }
  let end = Math.min(text.length, start + LEN);
  if (end < text.length) { const sp = text.indexOf(' ', end - 20); end = sp > 0 && sp < end + 25 ? sp : end; }
  const snippet = `${start > 0 ? '… ' : ''}${text.slice(start, end)}${end < text.length ? ' …' : ''}`;
  return { snippet, ranges: matchRanges(snippet, tokens) };
}

/** Guides that match, best first; inside a guide its matching blocks, best first (in reading order on a tie). */
export function searchGuides(index: GuideIndex, q: string): GuideResult[] | null {
  const tokens = queryTokens(q);
  if (!tokens.length) return null;
  const byGuide = new Map<Guide, GuideResult>();
  const result = (g: Guide) => {
    let r = byGuide.get(g);
    if (!r) byGuide.set(g, (r = { guide: g, titleHit: false, score: 0, hits: [] }));
    return r;
  };
  for (const h of index.guides) {
    const s = scoreFields(h.fields, tokens, pick(h.guide.title, 'en'));
    if (s > 0) { const r = result(h.guide); r.titleHit = true; r.score += s * 1.5; }
  }
  for (const e of index.blocks) {
    const s = scoreFields(e.fields, tokens, e.sectionTitle);
    if (s <= 0) continue;
    const { snippet, ranges } = snippetOf(e.text, tokens);
    result(e.guide).hits.push({ section: e.section, block: e.block, sectionTitle: e.sectionTitle, snippet, ranges, score: s });
  }
  const out = [...byGuide.values()];
  for (const r of out) {
    r.hits.sort((a, b) => b.score - a.score || a.section - b.section || a.block - b.block);
    // the best hit counts in full, every further hit a little (a guide all about the topic before one that names it once)
    r.score += (r.hits[0]?.score ?? 0) + Math.min(60, r.hits.slice(1).reduce((a, h) => a + h.score * 0.08, 0));
  }
  return out.sort((a, b) => b.score - a.score);
}

/** link to one block of a guide, with the query so the guide can mark the words */
export const hitHref = (guideId: string, h: { section: number; block: number }, q: string) =>
  `#/guides/${guideId}?s=${h.section}&b=${h.block}&q=${encodeURIComponent(q.trim())}`;
