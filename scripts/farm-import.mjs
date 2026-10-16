// Adds the farm spots of an approved GitHub issue to public/data/farm/spots.json.
// Players note spots on the farm map page and send them as an issue (form .github/ISSUE_TEMPLATE/farm-spot.yml, label
// farm-spot). When the maintainer adds the label farm-approved, .github/workflows/farm-spots.yml runs this script:
// - the issue comes from the event file, never through the shell; its body is untrusted and capped at MAX_BODY,
// - the whole issue is refused when the "own observation" box is not ticked, no spot list is readable, or the list is
//   empty or longer than LIMITS.perIssue,
// - every spot is checked with checkSpot (src/features/farm/farmRules.ts, the same rules as the page); duplicates are
//   skipped: the same cid, or the same region, category and name with a position within POS_NEAR or the same place text,
// - new spots get the id "<issue>-<n>" (n continues after the issue's ids already in the file), the UTC date and the
//   issue number; the file stays sorted by region, category and name with one spot per line, so commits stay small,
// - the markdown summary for the issue comment (EN + DE) quotes player text only inside code spans, cut short and with
//   < > ` @ . : replaced by look-alikes: no HTML, links, mentions or issue references reach the comment.
//
// Usage: node --experimental-strip-types scripts/farm-import.mjs [--event <file>] [--spots <file>] [--summary <file>]
//   --event    the issues event JSON (default: $GITHUB_EVENT_PATH)
//   --spots    the spots file to update (default: public/data/farm/spots.json)
//   --summary  where the summary goes (default: $SUMMARY_FILE, else farm-summary.md in the repository root; never commit it)
// Exit codes: 0 spots added (commit the spots file), 3 nothing to add (the summary says why), 1 broken event or spots file.
import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES, LIMITS, REGIONS, checkSpot, cleanText, readIssuePayload } from '../src/features/farm/farmRules.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const USAGE = 'usage: node --experimental-strip-types scripts/farm-import.mjs [--event <file>] [--spots <file>] [--summary <file>]';
const ADDED = 0;
const NOTHING = 3;
const BROKEN = 1;
/** GitHub's own limit for an issue body: a longer text did not come from the form, and the cap bounds the work */
const MAX_BODY = 65536;
/** two spots with the same name closer than this (in fractions of the map picture) are the same spot */
const POS_NEAR = 0.003;
/**
 * The ticked option of the checkbox field `own` in .github/ISSUE_TEMPLATE/farm-spot.yml as GitHub writes it into the
 * issue body ("- [X] I saw these spots myself ..."); keep it in step with the option's label there.
 */
const OWN_TICKED = /^[ \t]*[-*][ \t]+\[[xX]\][ \t]+I saw these spots myself/m;

/** A problem with the event or the spots file (exit code 1), as opposed to a problem with the issue (exit code 3). */
class Broken extends Error {}

const isObj = (x) => !!x && typeof x === 'object' && !Array.isArray(x);

// ------------------------------------------------------------------------------------------------ files

const OPTIONS = new Map([['--event', 'event'], ['--spots', 'spots'], ['--summary', 'summary']]);

function parseArgs(argv) {
  const opt = {
    event: process.env.GITHUB_EVENT_PATH || '',
    spots: join(ROOT, 'public', 'data', 'farm', 'spots.json'),
    summary: process.env.SUMMARY_FILE || join(ROOT, 'farm-summary.md'),
  };
  for (let i = 0; i < argv.length; i++) {
    const key = OPTIONS.get(argv[i]);
    if (!key) throw new Broken(`unknown option ${argv[i]}\n${USAGE}`);
    if (argv[i + 1] == null) throw new Broken(`${argv[i]} needs a file\n${USAGE}`);
    opt[key] = argv[++i];
  }
  if (!opt.event) throw new Broken(`no event file: pass --event <file> or set GITHUB_EVENT_PATH\n${USAGE}`);
  return { event: resolve(opt.event), spots: resolve(opt.spots), summary: resolve(opt.summary) };
}

async function readJson(path, what) {
  let text;
  try {
    text = await readFile(path, 'utf8');
  } catch (e) {
    throw new Broken(`cannot read the ${what} ${path} (${e.code ?? e.message})`);
  }
  // an editor on Windows may have put a byte order mark in front
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Broken(`the ${what} ${path} is not valid JSON (${e.message})`);
  }
}

async function write(path, text) {
  try {
    await writeFile(path, text);
  } catch (e) {
    throw new Broken(`cannot write ${path} (${e.code ?? e.message})`);
  }
}

/** The spots already on the map. The file may have been edited by hand, so only what the import relies on is checked. */
function existingSpots(file, path) {
  if (!isObj(file) || file.v !== 1 || !Array.isArray(file.spots)) throw new Broken(`${path} is not a spots file ({"v":1,"spots":[...]})`);
  const ids = new Set();
  file.spots.forEach((s, i) => {
    if (!isObj(s) || typeof s.id !== 'string' || !s.id) throw new Broken(`${path}: spot ${i + 1} has no id`);
    // report links name a spot by its id, so two spots must never share one
    if (ids.has(s.id)) throw new Broken(`${path}: the id ${s.id} is used twice`);
    ids.add(s.id);
  });
  return file.spots;
}

const REGION_ORDER = new Map(REGIONS.map((r, i) => [r.id, i]));
const CATEGORY_ORDER = new Map(CATEGORIES.map((c, i) => [c.id, i]));
const byName = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
const byId = new Intl.Collator('en', { numeric: true });
const rank = (order, key) => order.get(key) ?? order.size;

/** region order, category order, name; the id keeps the order fixed for spots with the same name */
function compareSpots(a, b) {
  return rank(REGION_ORDER, a.region) - rank(REGION_ORDER, b.region)
    || rank(CATEGORY_ORDER, a.cat) - rank(CATEGORY_ORDER, b.cat)
    || byName.compare(String(a.name ?? ''), String(b.name ?? ''))
    || byId.compare(a.id, b.id)
    || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

/** One spot per line, so a commit shows exactly the spots it adds. */
function spotsText(spots) {
  if (!spots.length) return '{"v":1,"spots":[]}\n';
  return `{"v":1,"spots":[\n${spots.map((s) => JSON.stringify(s)).join(',\n')}\n]}\n`;
}

// ------------------------------------------------------------------------------------------------ the issue

/** The spots an issue carries, or the reasons (EN, DE) to refuse the whole issue. */
function readSpotList(body) {
  if (body.length > MAX_BODY) {
    return { reasons: [[`The issue text is longer than ${MAX_BODY} characters.`, `Der Issue-Text ist länger als ${MAX_BODY} Zeichen.`]] };
  }
  const reasons = [];
  if (!OWN_TICKED.test(body)) {
    reasons.push([
      'The box "I saw these spots myself in the game ..." is not ticked: only spots you saw yourself go on the map.',
      'Das Kästchen „I saw these spots myself in the game ...“ ist nicht angehakt: Auf die Karte kommen nur Spots, die du selbst gesehen hast.',
    ]);
  }
  const list = readIssuePayload(body);
  if (!list) {
    reasons.push([
      'No spot list found: the field "Spots" must hold the list the farm map page fills in, `{"v":1,"spots":[...]}`.',
      'Keine Spot-Liste gefunden: Das Feld „Spots“ muss die Liste enthalten, die die Farmkarten-Seite einträgt, `{"v":1,"spots":[...]}`.',
    ]);
  } else if (!list.length) {
    reasons.push(['The spot list is empty.', 'Die Spot-Liste ist leer.']);
  } else if (list.length > LIMITS.perIssue) {
    reasons.push([
      `The issue holds ${list.length} spots, one issue takes at most ${LIMITS.perIssue}. The farm map page splits bigger lists into several issues.`,
      `Das Issue enthält ${list.length} Spots, eines darf höchstens ${LIMITS.perIssue} haben. Die Farmkarten-Seite teilt größere Listen auf mehrere Issues auf.`,
    ]);
  }
  return reasons.length ? { reasons } : { list };
}

const same = (x) => cleanText(x).toLowerCase();
const near = (a, b) => Array.isArray(a) && Array.isArray(b) && Math.hypot(a[0] - b[0], a[1] - b[1]) <= POS_NEAR + 1e-9;

/** The spot on the map (or added just before from this issue) that `spot` repeats, and why. */
function duplicateOf(spot, known) {
  const sent = known.find((s) => s.cid === spot.cid);
  if (sent) return { of: sent, why: 'cid' };
  const name = same(spot.name);
  for (const s of known) {
    if (s.region !== spot.region || s.cat !== spot.cat || same(s.name) !== name) continue;
    if (spot.pos && near(s.pos, spot.pos)) return { of: s, why: 'pos' };
    if (spot.area && same(s.area) === same(spot.area)) return { of: s, why: 'area' };
  }
  return null;
}

/** Checks the spots of issue `number`; the valid, new ones come back with id, date and issue number. */
function importSpots(number, list, existing, date) {
  const prefix = `${number}-`;
  // ids are never reused within an issue, so n continues after the highest one already in the file
  let n = existing.reduce((max, s) => {
    const rest = s.id.startsWith(prefix) ? s.id.slice(prefix.length) : '';
    return /^[0-9]+$/.test(rest) ? Math.max(max, Number(rest)) : max;
  }, 0);
  const known = [...existing];
  const result = { added: [], refused: [], duplicates: [] };
  list.forEach((raw, i) => {
    const checked = checkSpot(raw);
    if (!checked.ok) {
      result.refused.push({ index: i + 1, name: isObj(raw) ? raw.name : undefined, errors: checked.errors });
      return;
    }
    const dup = duplicateOf(checked.spot, known);
    if (dup) {
      result.duplicates.push({ index: i + 1, name: checked.spot.name, of: dup.of.id, why: dup.why });
      return;
    }
    const spot = { id: `${prefix}${++n}`, ...checked.spot, added: date, issue: number };
    result.added.push(spot);
    known.push(spot);
  });
  return result;
}

// ------------------------------------------------------------------------------------------------ summary

/** SpotError codes in words: English, then a short German version */
const ERROR_TEXT = {
  format: ['not a spot', 'kein Spot'],
  cid: ['no valid draft id', 'keine gültige Entwurfs-ID'],
  region: ['unknown region', 'unbekannte Region'],
  cat: ['unknown category', 'unbekannte Kategorie'],
  name: [`name missing or over ${LIMITS.name} characters`, `Name fehlt oder über ${LIMITS.name} Zeichen`],
  pos: ['invalid position', 'ungültige Position'],
  area: [`place over ${LIMITS.area} characters`, `Ortsangabe über ${LIMITS.area} Zeichen`],
  where: ['neither a position nor a place', 'weder Position noch Ortsangabe'],
  level: [`invalid level range (${LIMITS.level[0]}–${LIMITS.level[1]})`, `ungültiger Levelbereich (${LIMITS.level[0]}–${LIMITS.level[1]})`],
  drops: [`invalid drops (at most ${LIMITS.drops}, ${LIMITS.drop} characters each)`, `ungültige Drops (höchstens ${LIMITS.drops}, je ${LIMITS.drop} Zeichen)`],
  note: [`note over ${LIMITS.note} characters`, `Notiz über ${LIMITS.note} Zeichen`],
  by: [`nickname over ${LIMITS.by} characters`, `Spitzname über ${LIMITS.by} Zeichen`],
  link: ['contains a link or web address', 'enthält einen Link oder eine Webadresse'],
  mobOnly: ['level and drops are for monsters only', 'Level und Drops gibt es nur bei Monstern'],
};
const errorWords = (code) => {
  const [en, de] = Object.hasOwn(ERROR_TEXT, code) ? ERROR_TEXT[code] : [code, code];
  return `${en} (${de})`;
};

const DUPLICATE_TEXT = {
  cid: (id) => `sent before, already on the map as ${id} (schon einmal geschickt, schon auf der Karte als ${id})`,
  pos: (id) => `same name at nearly the same position as ${id} (gleicher Name an fast gleicher Position wie ${id})`,
  area: (id) => `same name and place as ${id} (gleicher Name und Ort wie ${id})`,
};

const REGION_NAME = new Map(REGIONS.map((r) => [r.id, r.name.en]));
const CATEGORY_NAME = new Map(CATEGORIES.map((c) => [c.id, c.name.en]));

const LOOK_ALIKE = new Map([
  ['<', String.fromCharCode(0x2039)],
  ['>', String.fromCharCode(0x203a)],
  ['`', "'"],
  ['@', String.fromCharCode(0xff20)],
  ['.', String.fromCharCode(0x2024)],
  [':', String.fromCharCode(0x2236)],
]);

/**
 * Player text for the comment: cleaned like the stored text (so the maintainer sees what is stored, without invisible
 * characters), cut to `max` characters and put in a code span, where GitHub renders no HTML, links, mentions or issue
 * references. < > ` @ . : become look-alikes too, so the text can neither close the span nor turn into markup, a
 * mention or a web or mail address anywhere the summary is shown (notification mails carry the raw markdown, and mail
 * programs link addresses in plain text).
 */
function quote(raw, max = LIMITS.name) {
  const chars = Array.from(cleanText(raw));
  if (!chars.length) return '';
  const cut = chars.length > max ? [...chars.slice(0, max - 1), '…'] : chars;
  return '`' + cut.join('').replace(/[<>`@.:]/g, (c) => LOOK_ALIKE.get(c)) + '`';
}

const label = (index, name) => {
  const q = quote(name);
  return q ? `Spot ${index} · ${q}` : `Spot ${index}`;
};
const count = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** The markdown comment for the issue: what was added, and why the rest was not. */
function summary({ reasons, added, refused, duplicates }) {
  const lines = ['### Farm map import / Import in die Farmkarte', ''];
  if (added.length) {
    lines.push(
      `**Added ${count(added.length, 'spot', 'spots')}.** They appear on the farm map with the next deploy, usually within a few minutes.`,
      `**${count(added.length, 'Spot', 'Spots')} hinzugefügt.** Sie erscheinen mit dem nächsten Deploy auf der Farmkarte, meist in ein paar Minuten.`,
      '',
      ...added.map((s) => `- ${s.id} · ${REGION_NAME.get(s.region)} · ${CATEGORY_NAME.get(s.cat)} · ${quote(s.name)}`),
      '',
    );
  } else {
    lines.push('**Nothing was added.** / **Es wurde nichts hinzugefügt.**', '');
  }
  if (reasons) {
    for (const [en, de] of reasons) lines.push(`- ${en}`, `  ${de}`);
    lines.push('');
  }
  if (refused.length) {
    lines.push(
      `**Refused: ${count(refused.length, 'spot', 'spots')}** / **Abgelehnt: ${count(refused.length, 'Spot', 'Spots')}**`,
      '',
      ...refused.map((r) => `- ${label(r.index, r.name)}: ${r.errors.map(errorWords).join('; ')}`),
      '',
    );
  }
  if (duplicates.length) {
    lines.push(
      `**Skipped as duplicates: ${count(duplicates.length, 'spot', 'spots')}** / **Als doppelt übersprungen: ${count(duplicates.length, 'Spot', 'Spots')}**`,
      '',
      ...duplicates.map((d) => `- ${label(d.index, d.name)}: ${DUPLICATE_TEXT[d.why](d.of)}`),
      '',
    );
  }
  if (reasons || refused.length) {
    lines.push(
      'Spots that were not added stay in your browser on the farm map page: fix them there and send them again.',
      'Spots, die nicht hinzugefügt wurden, bleiben in deinem Browser auf der Farmkarten-Seite: Korrigiere sie dort und schick sie noch einmal.',
    );
  }
  if (duplicates.length) {
    lines.push(
      'Duplicates are on the map already; you can delete their drafts.',
      'Doppelte Spots sind schon auf der Karte; ihre Entwürfe kannst du löschen.',
    );
  }
  while (lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n') + '\n';
}

// ------------------------------------------------------------------------------------------------ main

async function main() {
  const opt = parseArgs(process.argv.slice(2));
  const event = await readJson(opt.event, 'event file');
  const issue = isObj(event) ? event.issue : null;
  if (!isObj(issue) || !Number.isSafeInteger(issue.number) || issue.number < 1) {
    throw new Broken(`${opt.event} is not an issues event (no issue number)`);
  }
  if (issue.body != null && typeof issue.body !== 'string') throw new Broken(`${opt.event}: the issue body is not text`);
  const number = issue.number;
  // GitHub stores an empty body as null; an edited body may have CRLF line ends
  const body = (issue.body ?? '').replace(/\r\n?/g, '\n');
  const existing = existingSpots(await readJson(opt.spots, 'spots file'), opt.spots);

  const read = readSpotList(body);
  const today = new Date().toISOString().slice(0, 10);
  const result = read.reasons
    ? { reasons: read.reasons, added: [], refused: [], duplicates: [] }
    : importSpots(number, read.list, existing, today);

  const text = summary(result);
  // the summary first: if it cannot be written, the spots file stays as it was
  await write(opt.summary, text);
  if (result.added.length) await write(opt.spots, spotsText([...existing, ...result.added].sort(compareSpots)));

  console.log(text);
  console.log(`Issue #${number}: ${result.added.length} added, ${result.refused.length} refused, ${result.duplicates.length} duplicate(s)${read.reasons ? ', issue refused' : ''}.`);
  return result.added.length ? ADDED : NOTHING;
}

try {
  process.exitCode = await main();
} catch (e) {
  console.error(`farm-import: ${e instanceof Broken ? e.message : (e?.stack ?? e)}`);
  process.exitCode = BROKEN;
}
