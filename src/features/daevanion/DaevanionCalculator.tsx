import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { CheckCheck, Eraser, Hexagon, Info, Lock, Route, Trash2, Undo2, X, ZoomIn } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Board, BoardNode, ClassType, PointType } from '../../data/types';
import type { Build } from '../../state/build';
import { useBuild } from '../../state/BuildContext';
import { Card, PageHeader } from '../../components/ui';
import { SkillTile } from '../../components/SkillTile';
import { InfoTip } from '../../components/InfoTip';
import { useToast } from '../../components/Toast';
import { MQ, useIsTouch, useMediaQuery } from '../../components/hooks';
import { useClassName } from '../../components/ClassSelect';
import { useEnglishData } from '../../data/useEnglishData';
import { storage } from '../../lib/storage';
import { readHash } from '../../lib/shareLink';
import {
  allNodeKeys, boardCost, cheapestPath, decodeLearned, encodeLearned, nodeKey, unlearn,
} from '../../lib/daevanionGraph';
import { BoardGrid, type NodeClickInfo } from './BoardGrid';
import { DaevanionSummaryView } from './DaevanionSummaryView';
import { boardBox, buildSkillIds, nodeGains, nodeText, nodesCost, statFocusList } from './dvModel';

const GRADES = ['Common', 'Rare', 'Legend', 'Unique'] as const;
const UNDO_MAX = 30;
const BOARD_PREF = 'dv:board';
const NONE = new Set<string>();

interface UndoEntry { c: ClassType; dv: Build['dv']; boardId: number }
interface Pool { pt: PointType; name: string; spent: number; max: number; shared: boolean }

/** Board from a deep link: `#/daevanion/<board id>` or `#/daevanion/<board name>`. */
const boardFromParam = (boards: Board[], param?: string | null) => {
  if (!param) return undefined;
  const p = param.toLowerCase();
  return boards.find((b) => String(b.id) === p || b.name.toLowerCase() === p);
};

export function DaevanionCalculator({ param }: { param?: string | null }) {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const toast = useToast();
  const en = useEnglishData();
  const className = useClassName();
  const touch = useIsTouch();
  const canHover = useMediaQuery('(hover: hover)');
  const narrow = useMediaQuery(MQ.narrow);
  const phone = useMediaQuery(MQ.phone);
  const ids = useId().replace(/:/g, '');

  const dv = data.daevanion;
  const boards = useMemo(() => dv.classes[build.c]?.boards ?? [], [dv, build.c]);
  const [boardId, setBoardId] = useState<number | null>(
    () => boardFromParam(boards, param)?.id ?? storage.get<Record<string, number>>(BOARD_PREF, {})[build.c] ?? null,
  );
  const board: Board | undefined = boards.find((b) => b.id === boardId)
    ?? boards.find((b) => b.id === storage.get<Record<string, number>>(BOARD_PREF, {})[build.c])
    ?? boards[0];

  // the node under the mouse / keyboard focus, the node picked by a tap, and the last node looked at
  const [hover, setHover] = useState<BoardNode | null>(null);
  const [selected, setSelected] = useState<BoardNode | null>(null);
  const [last, setLast] = useState<BoardNode | null>(null);
  // right after a click the node stays under the mouse: no removal preview until the pointer moves on
  const [quiet, setQuiet] = useState<string | null>(null);
  const [focusStat, setFocusStat] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);
  const [undo, setUndo] = useState<UndoEntry[]>([]);
  const [said, setSaid] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef(build);
  buildRef.current = build;
  const ownDv = useRef<Build['dv'] | null>(null);

  const learnedAll = useMemo(
    () => new Map(boards.map((b) => [b.id, decodeLearned(b, build.dv[b.id] ?? '')])),
    [boards, build.dv],
  );
  const learned = (board && learnedAll.get(board.id)) || NONE;

  // ---------- deep link, remembered board, class switch ----------
  const onHover = useCallback((n: BoardNode | null) => {
    setHover(n);
    if (n) {
      setLast(n);
      setQuiet((q) => (q && q !== nodeKey(n) ? null : q));
    }
  }, []);

  const clearFocus = useCallback(() => { setSelected(null); setLast(null); setHover(null); setQuiet(null); }, []);
  useEffect(() => { clearFocus(); setFocusStat(null); }, [build.c, clearFocus]);
  // switching the language loads new node objects for the same board: keep the same nodes shown and picked
  const prevBoard = useRef(board);
  useEffect(() => {
    const prev = prevBoard.current;
    prevBoard.current = board;
    if (!board || !prev || prev === board || prev.id !== board.id) return;
    const same = (n: BoardNode | null) =>
      (n && prev.nodes.includes(n) ? board.nodes.find((x) => nodeKey(x) === nodeKey(n)) ?? null : n);
    setHover(same);
    setSelected(same);
    setLast(same);
  }, [board]);
  // anything that changed the boards outside this page (build bar reset, class switch, import) ends the undo history
  useEffect(() => { if (build.dv !== ownDv.current) setUndo((u) => (u.length ? [] : u)); }, [build.dv]);

  const pickBoard = useCallback((id: number) => {
    setBoardId(id);
    clearFocus();
    setZoom(false);
    const prefs = storage.get<Record<string, number>>(BOARD_PREF, {});
    storage.set(BOARD_PREF, { ...prefs, [buildRef.current.c]: id });
    // keep the address in step, so a reload or a copied address opens the same board
    const h = readHash();
    if (h.base === '/daevanion' && ![...h.params.keys()].length) history.replaceState(null, '', `#/daevanion/${id}`);
  }, [clearFocus]);

  // a new #/daevanion/<board> link while the page is open (the first one is read in useState above); read from the
  // address itself, because pickBoard rewrites it without a hashchange and the param prop can be stale
  useEffect(() => {
    const onHash = () => {
      const h = readHash();
      const b = h.base === '/daevanion' ? boardFromParam(boards, h.param) : undefined;
      if (b) pickBoard(b.id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [boards, pickBoard]);

  // Ctrl/Cmd+Z anywhere on the page, also when a click left the focus on the page itself (Safari and Firefox on macOS
  // do not focus buttons on click) – not in fields or dialogs
  const pageRef = useRef<HTMLDivElement>(null);
  const undoRef = useRef<() => void>(() => {});
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey || e.key.toLowerCase() !== 'z' || e.defaultPrevented) return;
      const el = e.target as Element;
      const page = pageRef.current;
      if (!page || !(page.contains(el) || el.contains(page))) return;
      if (el.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return;
      e.preventDefault();
      undoRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // the active tab stays visible in the scrolling tab row (phones) – horizontally only, the page does not jump
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [board?.id]);

  const zoomed = phone && zoom;
  // zooming in starts at the selected node or the start node in the middle of the board
  useEffect(() => {
    const w = wrapRef.current;
    if (!zoomed || !w) return;
    const el = w.querySelector<HTMLElement>('.node.selected') ?? w.querySelector<HTMLElement>('.node.kind-S');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const wr = w.getBoundingClientRect();
    w.scrollLeft += r.left + r.width / 2 - (wr.left + wr.width / 2);
    w.scrollTop += r.top + r.height / 2 - (wr.top + wr.height / 2);
  }, [zoomed, board?.id]);

  // ---------- derived ----------
  const focus = board && [hover, selected, last].find((n): n is BoardNode => !!n && board.nodes.includes(n)) || null;
  const focusKey = focus ? nodeKey(focus) : null;
  const focusLearned = !!focusKey && focus!.kind !== 'S' && learned.has(focusKey);
  const route = useMemo(
    () => (board && focus && focus.kind !== 'S' && !focusLearned ? cheapestPath(board, learned, focus) : null),
    [board, learned, focus, focusLearned],
  );
  const routeKeys = useMemo(() => (route ? new Set(route.map(nodeKey)) : NONE), [route]);
  const drop = useMemo(() => {
    if (!board || !focus || !focusLearned) return null;
    const next = unlearn(board, learned, focus);
    return board.nodes.filter((n) => learned.has(nodeKey(n)) && !next.has(nodeKey(n)));
  }, [board, learned, focus, focusLearned]);
  const dropKeys = useMemo(
    () => (drop && quiet !== focusKey ? new Set(drop.map(nodeKey)) : NONE),
    [drop, quiet, focusKey],
  );

  const pvp = board?.pointType === 'BattleCrystal';
  const focusList = useMemo(() => (en ? statFocusList(en, data, build.c, pvp) : []), [en, data, build.c, pvp]);
  const activeFocus = focusList.find((f) => f.name === focusStat) ?? null;
  const highlight = activeFocus?.keys ?? null;
  const mine = useMemo(() => buildSkillIds(build), [build.bar, build.st, build.lv]);

  const pools = useMemo(() => {
    const out = new Map<PointType, Pool>();
    for (const b of boards) {
      const cur = out.get(b.pointType) ?? { pt: b.pointType, name: dv.points[b.pointType]?.name ?? b.pointType, spent: 0, max: 0, shared: false };
      cur.spent += boardCost(b, learnedAll.get(b.id) ?? NONE);
      cur.max += nodesCost(b.nodes);
      out.set(b.pointType, cur);
    }
    const perType = new Map<PointType, number>();
    for (const b of boards) perType.set(b.pointType, (perType.get(b.pointType) ?? 0) + 1);
    return [...out.values()].map((p) => ({
      ...p,
      max: Math.min(p.max, dv.points[p.pt]?.max ?? p.max),
      shared: (perType.get(p.pt) ?? 0) > 1,
    }));
  }, [boards, learnedAll, dv.points]);

  if (!board) return null;

  const boardSpent = boardCost(board, learned);
  const boardMax = nodesCost(board.nodes);
  const allLearned = learned.size >= board.nodes.length - 1;
  const anyLearned = [...learnedAll.values()].some((s) => s.size > 0);
  const locked = build.l < board.needLevel;
  // the same message twice in a row still gets announced
  const say = (msg: string) => setSaid((s) => (s === msg ? `${msg}\u200b` : msg));

  // ---------- changes (all undoable) ----------
  const pushUndo = (entry: UndoEntry) => setUndo((u) => [...u.slice(-(UNDO_MAX - 1)), entry]);
  const writeDv = (next: Build['dv'], forBoard: number) => {
    const cur = buildRef.current;
    pushUndo({ c: cur.c, dv: cur.dv, boardId: forBoard });
    ownDv.current = next;
    setBuild({ dv: next });
  };
  const apply = (next: Set<string>, b: Board = board) =>
    writeDv({ ...buildRef.current.dv, [b.id]: encodeLearned(b, next) }, b.id);

  /** Toast "Undo": puts back the boards as they were before a bulk action (itself undoable). */
  const restore = (c: ClassType, snap: Build['dv'], id: number) => {
    if (buildRef.current.c !== c) return;
    writeDv(snap, id);
    pickBoard(id);
    say(t('dvUndone'));
  };

  const doUndo = () => {
    const entry = undo[undo.length - 1];
    if (!entry || entry.c !== build.c) return;
    setUndo(undo.slice(0, -1));
    ownDv.current = entry.dv;
    setBuild({ dv: entry.dv });
    if (entry.boardId !== board.id) pickBoard(entry.boardId);
    else clearFocus();
    say(t('dvUndone'));
  };
  undoRef.current = doUndo;

  const commit = (node: BoardNode) => {
    if (node.kind === 'S') return;
    const k = nodeKey(node);
    if (learned.has(k)) {
      const next = unlearn(board, learned, node);
      const n = learned.size - next.size;
      const p = boardCost(board, learned) - boardCost(board, next);
      const snap = build.dv;
      apply(next);
      // a removal that takes more than the node itself with it gets an Undo right where the player looks
      if (n > 1) toast(t('dvRemoved', { n, p }), 'ok', { action: { label: t('undo'), onClick: () => restore(build.c, snap, board.id) } });
      else say(t('dvRemovedOne', { p }));
    } else {
      const path = cheapestPath(board, learned, node);
      if (!path || !path.length) return;
      const next = new Set(learned);
      for (const x of path) next.add(nodeKey(x));
      apply(next);
      const p = nodesCost(path);
      say(path.length > 1 ? t('dvLearned', { n: path.length, p }) : t('dvLearnedOne', { p }));
    }
    setQuiet(k);
  };
  /** second tap or the inspector's button: the node stays shown but is no longer picked (a further tap selects again) */
  const commitPicked = (node: BoardNode) => {
    commit(node);
    setSelected(null);
    setLast(node);
  };

  const onNodeClick = (node: BoardNode, info: NodeClickInfo) => {
    if (node.kind === 'S') { setSelected(null); return; }
    if (info.touch) {
      // touch: the first tap shows the node (route, gains, cost), a second tap on it learns or removes
      if (selected && nodeKey(selected) === nodeKey(node)) {
        commitPicked(node);
      } else {
        setSelected(node);
      }
      return;
    }
    commit(node);
  };

  // the bulk buttons use aria-disabled (not disabled), so the focus stays on them after use
  const learnAll = () => {
    if (allLearned) return;
    const snap = build.dv;
    apply(allNodeKeys(board));
    toast(t('dvBoardFilled', { board: board.name }), 'ok', { action: { label: t('undo'), onClick: () => restore(build.c, snap, board.id) } });
  };
  const resetBoard = () => {
    if (!learned.size) return;
    const snap = build.dv;
    apply(new Set());
    clearFocus();
    toast(t('dvBoardReset', { board: board.name }), 'ok', { action: { label: t('undo'), onClick: () => restore(build.c, snap, board.id) } });
  };
  const resetAll = () => {
    if (!anyLearned) return;
    const snap = build.dv;
    writeDv({}, board.id);
    clearFocus();
    toast(t('dvAllReset'), 'ok', { action: { label: t('undo'), onClick: () => restore(build.c, snap, board.id) } });
  };

  // Ctrl/Cmd+Z: see the page-wide listener above
  const onCardKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' && (selected || last)) clearFocus();
  };

  const onTabsKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = boards.findIndex((b) => b.id === board.id);
    const to = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? boards.length - 1 : null;
    if (to == null) return;
    e.preventDefault();
    const b = boards[(to + boards.length) % boards.length];
    pickBoard(b.id);
    tabsRef.current?.querySelector<HTMLElement>(`#dv-tab-${b.id}`)?.focus();
  };

  /** "By board" in the summary: switch, and on one-column layouts bring the board into view. */
  const pickFromSummary = (id: number) => {
    pickBoard(id);
    if (narrow) tabsRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  // ---------- pieces ----------
  const matchInfo = (keys: Set<string>) => {
    let n = 0, l = 0;
    for (const x of board.nodes) if (x.kind === 'T' && keys.has(String(x.key))) { n++; if (learned.has(nodeKey(x))) l++; }
    return { n, l };
  };

  const poolsView = (
    <div className="dv-pools" role="group" aria-label={t('dvPools')}>
      {pools.map((p) => {
        const over = p.spent > p.max;
        return (
          <div key={p.pt} className={`dv-pool pt-${p.pt} ${over ? 'over' : ''}`}>
            <div className="dv-pool-head">
              <span className="dv-pool-name">{p.name}</span>
              {p.shared && <InfoTip text={t('shared')} size={14} />}
              <strong className="dv-pool-val">{p.spent}<span> / {p.max}</span></strong>
            </div>
            <div className="dv-pool-track" aria-hidden><span style={{ width: `${p.max ? Math.min(100, (p.spent / p.max) * 100) : 0}%` }} /></div>
            <span className="dv-pool-left">{over ? t('overBy', { n: p.spent - p.max }) : t('pointsLeft', { n: p.max - p.spent })}</span>
          </div>
        );
      })}
    </div>
  );

  const focusView = focusList.length > 0 && (
    <div className="dv-focus">
      <div className="dv-focus-head">
        <span className="eyebrow">{t('dvStatPrio', { cls: className(build.c) })}</span>
        <InfoTip text={t('dvPrioHint')} size={14} />
      </div>
      <div className="dv-focus-chips focus-inset" role="group" aria-label={t('dvFocusHint')}>
        {focusList.map((f, i) => {
          const on = activeFocus?.name === f.name;
          const m = on ? matchInfo(f.keys) : null;
          return (
            <button
              key={f.name}
              type="button"
              className={`chip dv-chip ${on ? 'on' : ''} ${i < 3 ? 'top' : ''}`}
              aria-pressed={on}
              onClick={() => setFocusStat(on ? null : f.name)}
            >
              <b aria-hidden>{i + 1}</b>
              <span className="sr-only">{i + 1}. </span>
              {f.name}
              {m && <span className="dv-chip-n">{m.n ? t('dvMatchCount', { n: m.n, l: m.l }) : t('dvNoMatch')}</span>}
            </button>
          );
        })}
      </div>
      <p className="field-hint dv-focus-hint">{t('dvFocusHint')}</p>
    </div>
  );

  const inspector = (
    <NodeInspector
      docked={narrow}
      node={focus}
      learned={focusLearned}
      route={route}
      drop={drop}
      selected={!!selected && focus === selected}
      touch={touch}
      onCommit={commitPicked}
      onClose={clearFocus}
      undo={narrow ? { can: undo.length > 0, run: doUndo } : null}
    />
  );

  // small tip next to the node under the mouse (the full details are in the inspector)
  const box = boardBox(board);
  const tip = canHover && hover && board.nodes.includes(hover) && !zoomed ? (() => {
    const col = hover.x - box.minX;
    const row = hover.y - box.minY;
    const fx = (col + 0.5) / box.cols;
    const below = row < 2;
    const fy = (below ? row + 1 : row) / box.rows;
    const side = fx < 0.25 ? 'start' : fx > 0.75 ? 'end' : 'mid';
    const isLearned = hover.kind !== 'S' && learned.has(nodeKey(hover));
    const sameAsFocus = focus === hover;
    let line = '';
    if (hover.kind === 'S') line = t('start');
    else if (isLearned) line = sameAsFocus && drop && drop.length > 1 ? t('dvTipRemove', { n: drop.length }) : t('dvTipRemoveOne');
    else if (sameAsFocus && route) line = route.length > 1 ? t('dvTipLearn', { n: route.length, p: nodesCost(route) }) : t('dvTipLearnOne', { p: hover.cost });
    else if (sameAsFocus && !route) line = t('notReachable');
    return (
      <div className={`node-tip ${side} ${below ? 'below' : ''}`} style={{ '--fx': fx, '--fy': fy } as CSSProperties} aria-hidden>
        <strong>{nodeText(hover, data.skillById)}</strong>
        {hover.kind !== 'S' && <span className="node-tip-cost">{hover.cost} {t('pts')}</span>}
        {line && <span className="node-tip-line">{line}</span>}
      </div>
    );
  })() : null;

  return (
    <div className="page dv-page" ref={pageRef}>
      <PageHeader
        icon={<Hexagon size={22} />}
        title={t('navDaevanion')}
        subtitle={t('homeDaevanionText')}
        guide={{
          id: 'daevanion',
          steps: [
            t('guideDaevanion1'),
            { mouse: t('guideDaevanion2'), touch: t('guideDaevanion2Touch') },
            { mouse: t('guideDaevanion3'), touch: t('guideDaevanion3Touch') },
          ],
        }}
      />

      {narrow && poolsView}

      <div className="board-tabs" role="tablist" aria-label={t('dvBoardsLabel')} ref={tabsRef} onKeyDown={onTabsKey}>
        {boards.map((b) => {
          const set = learnedAll.get(b.id) ?? NONE;
          const spent = boardCost(b, set);
          const max = nodesCost(b.nodes);
          const isLocked = build.l < b.needLevel;
          const on = b.id === board.id;
          return (
            <button
              key={b.id}
              id={`dv-tab-${b.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="dv-board-panel"
              tabIndex={on ? 0 : -1}
              className={`board-tab pt-${b.pointType} ${on ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
              onClick={() => pickBoard(b.id)}
            >
              <span className="bt-name">
                {isLocked && <Lock size={14} aria-hidden />}
                <span className="bt-title">{b.name}</span>
                {b.pointType === 'BattleCrystal' && <em className="dv-pvp-tag">{t('dvPvpTag')}</em>}
              </span>
              <span className="bt-meta">{t('unlocksAt', { lvl: b.needLevel })} · <b>{spent}</b>/{max}</span>
              <span className="bt-track" aria-hidden><span style={{ width: `${max ? (spent / max) * 100 : 0}%` }} /></span>
            </button>
          );
        })}
      </div>

      <div className="split dv-split">
        <section
          id="dv-board-panel"
          role="tabpanel"
          aria-labelledby={`dv-tab-${board.id}`}
          className={`card board-card pt-${board.pointType}`}
          onKeyDown={onCardKey}
        >
          <header className="card-head dv-board-head">
            <h2>
              <span className="dv-board-name">{board.name}</span>
              <span className="count">{boardSpent} / {boardMax} {t('pts')}</span>
            </h2>
            <div className="card-extra dv-board-actions">
              {!narrow && (
                <button
                  type="button"
                  className="btn sm ghost"
                  onClick={doUndo}
                  aria-disabled={!undo.length || undefined}
                  aria-keyshortcuts="Control+Z Meta+Z"
                >
                  <Undo2 size={15} aria-hidden /> {t('undo')}
                </button>
              )}
              <button type="button" className="btn sm" onClick={learnAll} aria-disabled={allLearned || undefined}>
                <CheckCheck size={15} aria-hidden /> {t('learnAll')}
              </button>
              <button type="button" className="btn sm ghost" onClick={resetBoard} aria-disabled={!learned.size || undefined}>
                <Eraser size={15} aria-hidden />
                <span className="hide-sm">{t('resetBoard')}</span>
                <span className="show-sm">{t('dvResetShort')}</span>
              </button>
              {phone && (
                <button type="button" className="btn sm ghost dv-zoom" aria-pressed={zoom} onClick={() => setZoom((z) => !z)} title={t('dvZoomLabel')}>
                  <ZoomIn size={15} aria-hidden /> {t('dvZoom')}
                </button>
              )}
            </div>
          </header>

          {locked && <p className="hint-box warn dv-locked"><Lock size={15} aria-hidden /> {t('dvLockedHint', { lvl: board.needLevel })}</p>}

          {focusView}

          <div ref={wrapRef} className={`board-wrap ${zoomed ? 'zoomed' : ''}`}>
            <div className="dv-board-frame" style={{ '--cols': box.cols, '--rows': box.rows } as CSSProperties}>
              <BoardGrid
                board={board}
                learned={learned}
                routeKeys={routeKeys}
                hoverKey={hover && board.nodes.includes(hover) ? nodeKey(hover) : null}
                selectedKey={selected && board.nodes.includes(selected) ? nodeKey(selected) : null}
                dropKeys={dropKeys}
                highlight={highlight}
                mine={mine}
                skillById={data.skillById}
                onClick={onNodeClick}
                onHover={onHover}
                describedBy={`${ids}-legend`}
              />
              {tip}
            </div>
          </div>

          <ul className="dv-legend" id={`${ids}-legend`}>
            <li><span className="lg-node learnable" aria-hidden />{t('dvLegendLearnable')}</li>
            <li><span className="lg-node learned" aria-hidden />{t('dvLegendLearned')}</li>
            <li><span className="lg-node route" aria-hidden />{t('dvLegendRoute')}</li>
            <li><span className="lg-node round mine" aria-hidden />{t('dvLegendMine')}</li>
            <li className="lg-break" aria-hidden />
            {GRADES.map((g) => (
              <li key={g}><span className={`grade-dot ${g}`} aria-hidden />{t(`grade_${g}`)}</li>
            ))}
            <li><span className="legend-shape round" aria-hidden />{t('skillNode')}</li>
          </ul>

          {narrow && inspector}
          <span className="sr-only" role="status" aria-live="polite">{said}</span>
        </section>

        <aside className="side sticky dv-side">
          {!narrow && inspector}
          <Card
            className="dv-totals"
            title={t('dvTotals')}
            extra={
              <button type="button" className="btn sm ghost danger" onClick={resetAll} aria-disabled={!anyLearned || undefined}>
                <Trash2 size={15} aria-hidden /> {t('dvResetAll')}
              </button>
            }
          >
            {!narrow && poolsView}
            <DaevanionSummaryView data={data} build={build} onPick={pickFromSummary} activeId={board.id} />
          </Card>
        </aside>
      </div>
    </div>
  );
}

interface InspectorProps {
  /** on one-column layouts the inspector sits under the board and sticks to the bottom of the screen */
  docked: boolean;
  node: BoardNode | null;
  learned: boolean;
  route: BoardNode[] | null;
  drop: BoardNode[] | null;
  /** the node was picked by a tap: a second tap learns / removes it */
  selected: boolean;
  touch: boolean;
  onCommit: (node: BoardNode) => void;
  onClose: () => void;
  undo: { can: boolean; run: () => void } | null;
}

/** What the inspected node gives, the route to it or what a removal drops – with the matching action. */
function NodeInspector({ docked, node, learned, route, drop, selected, touch, onCommit, onClose, undo }: InspectorProps) {
  const { data, t } = useLoadedGame();
  const skill = node?.kind === 'K' ? data.skillById.get(Number(node.key)) : undefined;
  const routeCost = route ? nodesCost(route) : 0;
  const dropCost = drop ? nodesCost(drop) : 0;
  const gains = route && route.length > 1 ? nodeGains(route, data.skillById) : [];

  const undoBtn = undo && (
    <button type="button" className="btn sm ghost ni-undo" onClick={undo.run} aria-disabled={!undo.can || undefined} aria-keyshortcuts="Control+Z Meta+Z">
      <Undo2 size={15} aria-hidden /> {t('undo')}
    </button>
  );

  return (
    <section className={`dv-inspector ${docked ? 'docked' : 'card'} ${node ? 'has-node' : ''}`} aria-label={t('dvInspector')}>
      {!node ? (
        <div className="ni-empty">
          <Info size={16} aria-hidden />
          <p>{touch ? t('dvTapHint') : t('pathHint')}</p>
          {undoBtn}
        </div>
      ) : (
        <>
          <div className="ni-main">
            {skill
              ? <SkillTile skill={skill} size={36} showCd={false} tip={false} />
              : <span className={`ni-swatch grade-${node.grade} ${node.kind === 'S' ? 'start' : ''}`} aria-hidden />}
            <div className="ni-title">
              <strong>{nodeText(node, data.skillById)}</strong>
              <span className="ni-meta">
                {node.kind === 'S'
                  ? t('start')
                  : `${t(`grade_${node.grade}` as 'grade_Common')} · ${node.kind === 'T' ? t('statNode') : t('skillNode')} · ${node.cost} ${t('pts')}`}
                {learned && <span className="ni-state ok"> · {t('learned')}</span>}
              </span>
            </div>
            <button type="button" className="icon-btn sm ni-close" onClick={onClose} aria-label={t('close')}>
              <X size={15} aria-hidden />
            </button>
          </div>

          {node.kind !== 'S' && !learned && route && (
            <p className="ni-route"><Route size={14} aria-hidden /> {t('dvRouteInfo', { n: route.length, p: routeCost })}</p>
          )}
          {gains.length > 0 && (
            <p className="ni-gains">
              <span className="muted">{t('dvGives')}:</span> {gains.slice(0, 5).join(' · ')}
              {gains.length > 5 && <span className="muted"> · {t('dvMore', { n: gains.length - 5 })}</span>}
            </p>
          )}
          {node.kind !== 'S' && !learned && !route && <p className="ni-route muted">{t('notReachable')}</p>}
          {learned && drop && (
            <p className={`ni-drop ${drop.length > 1 ? 'many' : ''}`}>
              {drop.length > 1 ? t('dvDropMany', { n: drop.length, p: dropCost }) : t('dvDropOne', { p: dropCost })}
            </p>
          )}

          {(node.kind !== 'S' && ((!learned && route) || (learned && drop))) || undoBtn ? (
            <div className="ni-actions">
              {node.kind !== 'S' && !learned && route && route.length > 0 && (
                <button type="button" className="btn primary" onClick={() => onCommit(node)}>
                  {route.length > 1 ? t('dvLearnRoute', { n: route.length, p: routeCost }) : t('dvLearnNode', { p: routeCost })}
                </button>
              )}
              {learned && drop && drop.length > 0 && (
                <button type="button" className="btn danger" onClick={() => onCommit(node)}>
                  {drop.length > 1 ? t('dvRemoveNodes', { n: drop.length, p: dropCost }) : t('dvRemoveNode', { p: dropCost })}
                </button>
              )}
              {undoBtn}
            </div>
          ) : null}
          {selected && touch && node.kind !== 'S' && (route || learned) && (
            <p className="field-hint">{learned ? t('dvTapAgainRemove') : t('dvTapAgainLearn')}</p>
          )}
        </>
      )}
    </section>
  );
}
