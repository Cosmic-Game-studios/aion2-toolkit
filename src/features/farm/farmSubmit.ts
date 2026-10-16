import { LIMITS, REGIONS, REPO_URL, REPORT_TEMPLATE, SPOT_TEMPLATE, regionById, type FarmSpot, type Lang, type SpotInput } from './farmRules';

/*
 * Addresses of prefilled GitHub issues: the issue forms in .github/ISSUE_TEMPLATE take their fields from the query
 * (field id = parameter name). Spots go as `{"v":1,"spots":[...]}` in the field `spots`; too many for one address are
 * split into several issues.
 */

/**
 * The longest issue address we hand out, counted as encodeURIComponent(address).length. A player who is not signed in
 * is sent to /login?return_to=<the address encoded once more>, and GitHub drops return_to from about 7,500 of those
 * characters, so the prefilled form would be gone after signing in. The address itself is always shorter than this
 * count, so it also stays well below the lengths where GitHub answers 500 (about 7,000, signed out) or 414 (about 8,200).
 */
export const ISSUE_URL_BUDGET = 6500;

/** an address's length as the login redirect sees it (every %XX becomes %25XX) */
const addressLength = (url: string) => encodeURIComponent(url).length;

/** Only the fields of SpotInput, in a fixed order: draft fields (status, savedAt, sentAt) stay in the browser. */
function payloadSpot(d: SpotInput): SpotInput {
  const s: SpotInput = { cid: d.cid, region: d.region, cat: d.cat, name: d.name };
  if (d.pos) s.pos = d.pos;
  if (d.area) s.area = d.area;
  if (d.level) s.level = d.level;
  if (d.drops?.length) s.drops = d.drops;
  if (d.note) s.note = d.note;
  if (d.by) s.by = d.by;
  return s;
}

const regionName = (id: string, lang: Lang) => regionById(id)?.name[lang] ?? id;

function issueTitle(spots: SpotInput[], lang: Lang): string {
  const regions = [...new Set(spots.map((s) => s.region))];
  const where = regionName(regions[0], lang) + (regions.length > 1 ? ` +${regions.length - 1}` : '');
  const more = spots.length - 1;
  return `[Farm] ${where} – ${spots[0].name}${more ? ` (+${more})` : ''}`;
}

function issueUrl(spots: SpotInput[], lang: Lang): string {
  const query = new URLSearchParams({
    template: SPOT_TEMPLATE,
    title: issueTitle(spots, lang),
    spots: JSON.stringify({ v: 1, spots }),
  });
  return `${REPO_URL}/issues/new?${query}`;
}

export interface IssueLink { url: string; cids: string[] }

/**
 * One prefilled issue address per chunk of drafts, with the cids it carries, and the cids of the spots that are too
 * long for an address even on their own (the player has to shorten them; they get no link that could not work).
 * A chunk holds at most LIMITS.perIssue spots and its address stays within ISSUE_URL_BUDGET; the address is measured
 * as built, because encoding makes it 1.4 to 2 times the JSON (umlauts and CJK far more). Spots are ordered by region;
 * a region starts a new chunk unless it fits completely into the current one, so most titles name a single region.
 */
export function issueParts(drafts: SpotInput[], lang: Lang): { links: IssueLink[]; tooLong: string[] } {
  const fits = (spots: SpotInput[]) => spots.length <= LIMITS.perIssue && addressLength(issueUrl(spots, lang)) <= ISSUE_URL_BUDGET;

  const order = new Map(REGIONS.map((r, i) => [r.id, i]));
  const byRegion = new Map<string, SpotInput[]>();
  const tooLong: string[] = [];
  for (const d of drafts) {
    const s = payloadSpot(d);
    // alone in an issue is the shortest address a spot can get
    if (!fits([s])) { tooLong.push(s.cid); continue; }
    const list = byRegion.get(s.region);
    if (list) list.push(s);
    else byRegion.set(s.region, [s]);
  }
  const groups = [...byRegion.entries()]
    .sort(([a], [b]) => (order.get(a) ?? REGIONS.length) - (order.get(b) ?? REGIONS.length))
    .map(([, spots]) => spots);

  const chunks: SpotInput[][] = [];
  let cur: SpotInput[] = [];
  const close = () => { if (cur.length) chunks.push(cur); cur = []; };

  for (const spots of groups) {
    // does the whole region fit into what is left of the current chunk? (adding spots never shortens the address)
    if (cur.length && !fits([...cur, ...spots])) close();
    for (const s of spots) {
      if (cur.length && !fits([...cur, s])) close();
      cur.push(s);
    }
  }
  close();

  return {
    links: chunks.map((spots) => ({ url: issueUrl(spots, lang), cids: spots.map((s) => s.cid) })),
    tooLong,
  };
}

/** The links of issueParts alone (spots too long for any address are left out). */
export function issueLinks(drafts: SpotInput[], lang: Lang): IssueLink[] {
  return issueParts(drafts, lang).links;
}

/**
 * "Report a problem" with a spot on the map: the report form, prefilled with the spot id and, if given, the details.
 * The form itself is in English and German, so the address is the same in both languages. Details that would make
 * the address too long are left out; the player can still type them on GitHub.
 */
export function reportUrl(spot: FarmSpot, _lang: Lang, details?: string): string {
  const params: Record<string, string> = {
    template: REPORT_TEMPLATE,
    title: `[Farm report] ${spot.id} ${spot.name}`,
    spot: spot.id,
  };
  const plain = `${REPO_URL}/issues/new?${new URLSearchParams(params)}`;
  if (!details) return plain;
  const full = `${REPO_URL}/issues/new?${new URLSearchParams({ ...params, details })}`;
  return addressLength(full) <= ISSUE_URL_BUDGET ? full : plain;
}

const CHANGE_FIELDS = ['region', 'cat', 'name', 'pos', 'area', 'level', 'drops', 'note', 'by'] as const;

/**
 * A report of the change a player made to their spot after sending it, when the version on the map is the earlier
 * one: the details list the changed fields with their new values (null = removed), for the maintainer to apply.
 */
export function changeReportUrl(spot: FarmSpot, draft: SpotInput, lang: Lang, intro: string): string {
  const changed: Record<string, unknown> = {};
  for (const k of CHANGE_FIELDS) {
    const now = draft[k] ?? null;
    if (JSON.stringify(spot[k] ?? null) !== JSON.stringify(now)) changed[k] = now;
  }
  return reportUrl(spot, lang, `${intro}${String.fromCharCode(10)}${JSON.stringify(changed)}`);
}
