import type { Board, BoardNode, GameData, Skill } from '../../data/types';
import { BAR_KEYS, BAR_ROWS, BASIC_COL, DEFAULT_DELAY, emptyBuild, normalizeBuild, slotKey, type Build } from '../../state/build';
import { boardCost, cheapestPath, decodeLearned, encodeLearned, nodeKey } from '../../lib/daevanionGraph';
import { shardBudget, shardsSpent, skillPointBudget, skillPointsSpent } from '../../lib/buildCalc';
import { isSpaceSkill } from '../../lib/classInfo';
import { parseFacts } from '../../lib/skillFacts';
import { maxStigmaLevel, skillPointStep } from '../../lib/skillCosts';
import { CLASS_MECHANICS } from '../../data/mechanics';
import { isCharged } from '../hotbar/keyStacks';
import { median, type StigmaStat, type TopStats } from './topStats';
import type { TopPlayer } from './types';

/*
 * One recommended build from the top players of a class: what most of them chose, put on the keys by the rules the
 * class guides and the planner use. Pure (no React); the page passes the class guide's key layout.
 *
 * - skill bar: the actives at least half of the players keep on a skill bar
 * - stigmas: the four slotted most often (in the order of the stigma statistics), each at the median level of the
 *   players who slot it
 * - skill levels: per skill the median bought level, lowered where the levels together cost more than the median
 *   points the players spent (the steps the fewest of them took go first), and the median level from gear
 *   (Daevanion levels follow from the boards)
 * - Daevanion: per board the nodes most players learned first (the cheaper one on a tie), each with the cheapest
 *   connection to the start through nodes they learned, until the board holds the median points the players spent
 *   on it – so the set stays connected
 * - keys and macro: the source shows no key positions, so the class guide's layout decides where a skill goes. Its
 *   keys keep only the skills above; a skill the guide does not place goes to a free key (stigmas to 5–8 first), and
 *   the macro presses it when it is an attack with a cooldown that is neither charged, a switch nor a move (dashes and
 *   the like stay by hand, as in every guide). The macro presses the guide's macro keys in the guide's order and the
 *   filler key T last; Defiance stays on Space.
 */

/** "Most players": at least this share of them. */
export const MAJORITY = 0.5;

/** One key of a class guide's layout: a key label of BAR_KEYS ('R' or 'LMB' = basic attack), its stack bottom first. */
export interface LayoutKey { key: string; ids: number[]; macro?: boolean }

/** A key of the recommended bar: column, stack bottom first, pressed by the macro or by hand. */
export interface RecKey { col: number; ids: number[]; macro: boolean }

export interface RecBoard {
  id: number;
  board: Board;
  /** recommended nodes */
  learned: Set<string>;
  spent: number;
  /** median points the players spent on this board */
  budget: number;
}

export interface RecStigma { id: number; lv: number; stat: StigmaStat }

export interface Recommendation {
  /** the whole build, through normalizeBuild – ready for the planner */
  build: Build;
  /** keys: the macro's keys in step order, then the keys pressed by hand */
  keys: RecKey[];
  /** columns the macro presses, in order */
  macro: number[];
  /** Defiance (Space), when the class has it */
  space: Skill | null;
  stigmas: RecStigma[];
  boards: RecBoard[];
  /** false: no key layout for this class, so no keys and no macro */
  hasLayout: boolean;
}

const isMajority = (n: number, of: number) => of > 0 && n >= of * MAJORITY;

/**
 * The recommended nodes of one board: the nodes most players learned first (on a tie the cheaper one, then board
 * order), each together with the cheapest connection to the start through nodes players learned, while it fits into
 * `budget` points. A node far from the start is not lost because the nodes leading to it were learned by fewer
 * players. Nodes nobody learned are never taken.
 */
export function consensusBoard(board: Board, heat: Map<string, number>, budget: number): Set<string> {
  const learned = new Set<string>();
  if (!board.nodes.some((n) => n.kind === 'S')) return learned;
  const count = (n: BoardNode) => heat.get(nodeKey(n)) ?? 0;
  const learnedBySome = (n: BoardNode) => count(n) > 0;
  const order = board.nodes.filter((n) => n.kind !== 'S' && learnedBySome(n)).sort((a, b) => count(b) - count(a) || a.cost - b.cost);
  let spent = 0;
  for (const n of order) {
    if (learned.has(nodeKey(n)) || spent + n.cost > budget) continue;
    const path = cheapestPath(board, learned, n, learnedBySome);
    if (!path) continue;
    const cost = path.reduce((sum, x) => sum + x.cost, 0);
    if (spent + cost > budget) continue;
    for (const x of path) learned.add(nodeKey(x));
    spent += cost;
  }
  return learned;
}

/** Points each player spent on a board; players whose board the source lists but the fetch could not read are left out. */
function boardSpend(players: TopPlayer[], board: Board): number[] {
  const out: number[] = [];
  for (const p of players) {
    const hex = p.build.dv[String(board.id)];
    if (hex) { out.push(boardCost(board, decodeLearned(board, hex))); continue; }
    const src = p.boards.find((b) => b.id === board.id);
    if (!(src && src.open > 0)) out.push(0);
  }
  return out;
}

const skillText = (s: Skill) => s.levels[0]?.description ?? s.description ?? '';

/** A skill that moves the caster (dashes, leaps, steps behind or back): always pressed by hand. English text. */
const MOVES = /(?:^|[.!]\s+)(?:\*\*)?(?:Rush(?:es)?|Leaps?|Jumps?|Teleports?|Dashes|Moves? (?:to|behind|forward|back))\b|\b(?:the caster moves|moves the caster)\b/i;

/**
 * An attack with a cooldown that is neither charged, a switch nor a move: the macro may press it (read from the
 * English text).
 */
function macroSkill(s: Skill, en: GameData): boolean {
  const e = en.skillById.get(s.id) ?? s;
  const mech = CLASS_MECHANICS[s.classType]?.find((m) => m.id === s.id);
  if (s.cooldownSec <= 0 || isCharged(e) || mech?.charged || mech?.toggle) return false;
  const text = skillText(e);
  if (MOVES.test(text)) return false;
  const f = parseFacts(text);
  return f.dmg > 0 || f.dot > 0 || f.defDown > 0;
}

const colOf = (key: string) => BAR_KEYS.indexOf(key === 'LMB' ? 'R' : key);
const T_COL = colOf('T');
const ACTIVE_COLS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
/** free keys for a stigma, 5–8 first (the hotbar page puts the player's own stigmas there too) */
export const STIGMA_FIRST = [8, 9, 10, 11, 2, 3, 4, 5, 6, 7];

/**
 * The guide's keys with only the recommended skills on them, the recommended skills the guide does not place on free
 * keys, and the macro's steps. `keep` = recommended actives and stigmas, in the order they should get a free key.
 */
function recommendKeys(layout: LayoutKey[], keep: number[], data: GameData, en: GameData): { keys: RecKey[]; macro: number[] } {
  const wanted = new Set(keep);
  const placed = new Set<number>();
  const keys: RecKey[] = [];
  for (const k of layout) {
    const col = colOf(k.key);
    if (col < 0 || keys.some((x) => x.col === col)) continue;
    // the basic attack stays on its key whatever the bar counts say (players hold it on the left mouse button)
    const ids = k.ids.filter((id) => (col === BASIC_COL || wanted.has(id)) && !placed.has(id) && data.skillById.has(id)).slice(0, BAR_ROWS);
    if (!ids.length) continue;
    ids.forEach((id) => placed.add(id));
    keys.push({ col, ids, macro: !!k.macro && col !== BASIC_COL });
  }
  const added: RecKey[] = [];
  for (const id of keep) {
    const s = data.skillById.get(id);
    if (!s || placed.has(id) || isSpaceSkill(s)) continue;
    const col = (s.isStigma ? STIGMA_FIRST : ACTIVE_COLS).find((c) => !keys.some((x) => x.col === c));
    if (col == null) continue;
    const key = { col, ids: [id], macro: macroSkill(s, en) };
    keys.push(key);
    added.push(key);
    placed.add(id);
  }
  // the guide's macro keys in its order, new attack keys after them, the filler key T always last
  const guideMacro = keys.filter((k) => k.macro && !added.includes(k)).map((k) => k.col);
  const macro = [
    ...guideMacro.filter((c) => c !== T_COL),
    ...added.filter((k) => k.macro).map((k) => k.col),
    ...guideMacro.filter((c) => c === T_COL),
  ];
  const ordered = [...macro.map((c) => keys.find((k) => k.col === c)!), ...keys.filter((k) => !k.macro)];
  return { keys: ordered, macro };
}

/**
 * The recommended build of a class from its top players. `en`: the English game data (the attack check reads the
 * English skill texts); `layout`: the class guide's keys (null = none, then the build has no bar and no macro);
 * `macroName`: the macro's name in the planner.
 */
export function recommend(
  players: TopPlayer[], stats: TopStats, data: GameData, en: GameData, layout: LayoutKey[] | null, macroName: string,
): Recommendation | null {
  if (!players.length) return null;
  const cls = players[0].build.c;
  const of = players.length;
  const build = emptyBuild(cls, Math.round(median(players.map((p) => p.build.l))));
  build.f = stats.factions.find((f) => f.key)?.key ?? 'Light';

  // skill levels: median bought level and median gear level per skill
  const classSkills = data.skills.filter((s) => s.classType === cls && !s.isStigma);
  for (const s of classSkills) {
    const lv = Math.round(median(players.map((p) => p.build.lv[String(s.id)] ?? 1)));
    const gx = Math.round(median(players.map((p) => p.build.gx[String(s.id)] ?? 0)));
    if (lv > 1) build.lv[String(s.id)] = lv;
    if (gx > 0) build.gx[String(s.id)] = gx;
  }
  // the medians of single skills add up to more points than the players have: drop the level steps the fewest of
  // them took until the build spends the median points they spent
  const pointBudget = Math.floor(median(players.map((p) => skillPointsSpent(data, p.build))));
  const took = (id: string, k: number) => players.filter((p) => (p.build.lv[id] ?? 1) >= k).length;
  const unlocked = new Set(classSkills.filter((s) => s.acquireLevel <= build.l).map((s) => String(s.id)));
  while (skillPointsSpent(data, build) > pointBudget) {
    let drop: { id: string; k: number; n: number; cost: number } | null = null;
    for (const [id, k] of Object.entries(build.lv)) {
      const cost = skillPointStep(data.costs, Number(id), k);
      if (k <= 1 || cost <= 0 || !unlocked.has(id)) continue;
      const n = took(id, k);
      if (!drop || n < drop.n || (n === drop.n && (k > drop.k || (k === drop.k && cost > drop.cost)))) drop = { id, k, n, cost };
    }
    if (!drop) break;
    if (drop.k > 2) build.lv[drop.id] = drop.k - 1;
    else delete build.lv[drop.id];
  }

  // stigmas: the four slotted most often, at the median level of their players
  const stigmas: RecStigma[] = stats.stigmas.filter((x) => x.slotted > 0).slice(0, build.st.length).map((stat) => {
    const lvs = players.flatMap((p) => p.stigmas.filter((s) => s.id === stat.id && s.slot).map((s) => s.lv));
    const max = maxStigmaLevel(data.costs, stat.id);
    return { id: stat.id, lv: Math.min(max, Math.max(1, Math.round(median(lvs)))), stat };
  });
  build.st = build.st.map((slot, i) => (stigmas[i] ? { id: stigmas[i].id, lv: stigmas[i].lv } : slot));

  // Daevanion: one connected node set per board
  const boards: RecBoard[] = [];
  for (const b of stats.boards) {
    if (!b.board || b.heatOf === 0) continue;
    const budget = Math.floor(median(boardSpend(players, b.board)));
    const learned = consensusBoard(b.board, b.heat, budget);
    if (learned.size) build.dv[String(b.id)] = encodeLearned(b.board, learned);
    boards.push({ id: b.id, board: b.board, learned, spent: boardCost(b.board, learned), budget });
  }

  // keys and macro: actives most players keep on a bar (most kept first), then the stigmas
  const actives = stats.skills.filter((x) => isMajority(x.bar, of)).map((x) => x.id)
    .filter((id) => { const s = data.skillById.get(id); return !!s && !s.isStigma && s.type === 'active'; });
  const { keys, macro } = layout ? recommendKeys(layout, [...actives, ...stigmas.map((s) => s.id)], data, en) : { keys: [], macro: [] };
  for (const k of keys) k.ids.forEach((id, row) => { build.bar[slotKey(row, k.col)] = id; });
  if (macro.length) build.macros = [{ id: 'top10', name: macroName, key: '', steps: macro.map((k) => ({ k, delay: DEFAULT_DELAY })) }];

  // extra skill points and shards beyond the level's base, so the planner does not show the build over budget
  build.e = Math.max(0, skillPointsSpent(data, build) - skillPointBudget(data, { ...build, e: 0 }).total);
  build.se = Math.max(0, shardsSpent(data, build) - shardBudget(data, { ...build, se: 0 }).total);

  const space = data.skills.find((s) => s.classType === cls && isSpaceSkill(s)) ?? null;
  const normal = normalizeBuild(build);
  return normal && { build: normal, keys, macro, space, stigmas, boards, hasLayout: !!layout };
}
