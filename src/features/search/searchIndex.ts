/**
 * Matching and ranking of the quick search (QuickSearch.tsx). Pure functions, no React.
 *
 * Every entry has a few fields (name, English name, class, type, keywords …) with a weight. Each word of the query has
 * to match one field; the best field counts. Whole field > start of the field > start of a word > inside a word
 * (German compounds: "schlag" finds "Wirbelschlag"). Case, accents and ß do not matter.
 */

/** Text in the form the search compares: lower case, no accents, ß = ss; `map` points back to the original index. */
export function fold(s: string): { text: string; map: number[] } {
  let text = '';
  const map: number[] = [];
  for (let i = 0; i < s.length; i++) {
    const f = s[i].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ß/g, 'ss');
    for (const c of f) { text += c; map.push(i); }
  }
  return { text, map };
}

export const norm = (s: string) => fold(s).text;

/** The words of a query (spaces and punctuation separate them). */
export const queryTokens = (q: string): string[] => norm(q).split(/[^\p{L}\p{N}]+/u).filter(Boolean);

const isWordChar = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c);

/** How well one query word matches one field (0 = not at all). */
function fieldScore(text: string, token: string): number {
  let i = text.indexOf(token);
  if (i < 0) return 0;
  if (text === token) return 100;
  if (i === 0) return 80;
  let inside = true;
  while (i >= 0) {
    if (!isWordChar(text[i - 1])) { inside = false; break; }
    i = text.indexOf(token, i + 1);
  }
  if (!inside) return 60;
  // inside a word only from three letters on ("ab" would hit half of all names)
  return token.length >= 3 ? 30 : 0;
}

export interface Field {
  /** folded text (norm()) */
  text: string;
  /** 1 = the name; lower for class, type, keywords … */
  w: number;
  /** an entry with key fields only matches when one query word hits one of them (guide sections, Top 10 per class) */
  key?: boolean;
}

/** Score of an entry for the query words, or 0 when one word matches nothing. */
export function scoreFields(fields: Field[], tokens: string[], label: string): number {
  if (!tokens.length) return 0;
  const needKey = fields.some((f) => f.key);
  let total = 0;
  let keyHit = false;
  for (const token of tokens) {
    let best = 0;
    let sum = 0;
    let bestKey = false;
    for (const f of fields) {
      const s = fieldScore(f.text, token) * f.w;
      sum += s;
      if (s > best || (s === best && s > 0 && f.key)) { best = s; bestKey = !!f.key; }
    }
    if (best <= 0) return 0;
    // the best field counts; more fields that match (a tag, the summary) lift an entry a little:
    // the Combat Power guide before a guide that only names Combat Power in its title
    total += best + Math.min(20, (sum - best) * 0.15);
    if (bestKey) keyHit = true;
  }
  if (needKey && !keyHit) return 0;
  // the whole query as typed: at the start of the visible name, or the whole name
  const q = tokens.join(' ');
  const l = norm(label);
  if (l === q) total += 40;
  else if (l.startsWith(q)) total += 20;
  return total;
}

/** Ranges [from, to) of the original label that match a query word, merged and sorted (for <mark>). */
export function matchRanges(label: string, tokens: string[]): [number, number][] {
  if (!tokens.length) return [];
  const { text, map } = fold(label);
  const out: [number, number][] = [];
  for (const token of tokens) {
    let i = text.indexOf(token);
    // prefer the start of a word, like the scoring does
    let j = i;
    while (j >= 0 && isWordChar(text[j - 1])) j = text.indexOf(token, j + 1);
    if (j >= 0) i = j;
    if (i < 0) continue;
    out.push([map[i], map[i + token.length - 1] + 1]);
  }
  out.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const r of out) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }
  return merged;
}
