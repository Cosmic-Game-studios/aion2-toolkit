import { useMemo, useState } from 'react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Board, BoardNode, ClassType, PointType } from '../../data/types';
import { ClassPicker } from '../../components/ClassPicker';
import { SkillIcon } from '../../components/SkillIcon';
import { PointBar } from '../../components/PointBar';
import { CopyLinkButton } from '../../components/CopyLinkButton';
import {
  allNodeKeys, boardCost, canLearn, cheapestPath, decodeLearned, encodeLearned, learn, nodeKey, unlearn,
} from '../../lib/daevanionGraph';
import { decodeState, readHash } from '../../lib/shareLink';
import { usePersistedState } from '../../lib/usePersistedState';
import { BoardGrid } from './BoardGrid';

/** learned nodes per board id, hex encoded */
interface DvState { c: ClassType; b: number | null; n: Record<string, string> }
const DEFAULT: DvState = { c: 'Gladiator', b: null, n: {} };

export function DaevanionCalculator() {
  const { data, t } = useLoadedGame();
  const shared = useMemo(() => decodeState<DvState>(readHash().params.get('s')), []);
  const [st, setSt] = usePersistedState<DvState>('daevanion', DEFAULT, shared);
  const [hover, setHover] = useState<BoardNode | null>(null);

  const dv = data.daevanion;
  const cls = dv.classes[st.c];
  const boards = cls.boards;
  const board = boards.find((b) => b.id === st.b) ?? boards[0];

  const learnedFor = (b: Board) => decodeLearned(b, st.n[b.id] ?? '');
  const learned = useMemo(() => learnedFor(board), [board, st.n]);

  const setLearned = (b: Board, set: Set<string>) =>
    setSt((p) => ({ ...p, n: { ...p.n, [b.id]: encodeLearned(b, set) } }));

  const onNodeClick = (node: BoardNode, shift: boolean) => {
    if (node.kind === 'S') return;
    const k = nodeKey(node);
    if (learned.has(k)) { setLearned(board, unlearn(board, learned, node)); return; }
    if (shift || !canLearn(board, learned, node)) {
      const path = cheapestPath(board, learned, node);
      if (!path) return;
      const next = new Set(learned);
      for (const n of path) next.add(nodeKey(n));
      setLearned(board, next);
      return;
    }
    setLearned(board, learn(board, learned, node));
  };

  const route = hover && !learned.has(nodeKey(hover)) && hover.kind !== 'S' ? cheapestPath(board, learned, hover) : null;
  const routeKeys = new Set(route?.map(nodeKey) ?? []);
  const routeCost = route?.reduce((a, n) => a + n.cost, 0) ?? 0;

  // totals across all boards
  const perBoard = boards.map((b) => ({ b, set: learnedFor(b) }));
  const spentByType: Record<string, number> = {};
  const maxByType: Record<string, number> = {};
  for (const { b, set } of perBoard) {
    spentByType[b.pointType] = (spentByType[b.pointType] ?? 0) + boardCost(b, set);
    maxByType[b.pointType] = (maxByType[b.pointType] ?? 0) + b.nodes.reduce((a, n) => a + n.cost, 0);
  }
  const statTotals = new Map<string, { label: string; value: number }>();
  const skillTotals = new Map<string, number>();
  const gradeCount: Record<string, number> = {};
  for (const { b, set } of perBoard) {
    for (const n of b.nodes) {
      if (n.kind === 'S' || !set.has(nodeKey(n))) continue;
      gradeCount[n.grade] = (gradeCount[n.grade] ?? 0) + 1;
      if (n.kind === 'T') {
        const cur = statTotals.get(n.label) ?? { label: n.label, value: 0 };
        cur.value += n.value ?? 0;
        statTotals.set(n.label, cur);
      } else if (n.kind === 'K') {
        skillTotals.set(n.key, (skillTotals.get(n.key) ?? 0) + (n.value ?? 0));
      }
    }
  }

  const changeClass = (c: ClassType) => setSt((p) => ({ ...p, c, n: {} }));
  const pointName = (pt: PointType) => dv.points[pt]?.name ?? pt;

  return (
    <div className="page">
      <section className="panel controls">
        <ClassPicker value={st.c} onChange={changeClass} />
        <div className="controls-row">
          <div className="board-tabs" role="tablist">
            {boards.map((b) => {
              const set = perBoard.find((x) => x.b.id === b.id)!.set;
              return (
                <button
                  key={b.id}
                  type="button"
                  role="tab"
                  aria-selected={b.id === board.id}
                  className={`tab ${b.id === board.id ? 'active' : ''}`}
                  onClick={() => setSt((p) => ({ ...p, b: b.id }))}
                >
                  <span>{b.name}</span>
                  <span className="muted small">{t('unlocksAt', { lvl: b.needLevel })} · {boardCost(b, set)} / {b.nodes.reduce((a, n) => a + n.cost, 0)}</span>
                </button>
              );
            })}
          </div>
          <div className="actions">
            <button type="button" className="btn" onClick={() => setLearned(board, allNodeKeys(board))}>{t('learnAll')}</button>
            <button type="button" className="btn ghost" onClick={() => setLearned(board, new Set())}>{t('resetBoard')}</button>
            <button type="button" className="btn ghost" onClick={() => setSt((p) => ({ ...p, n: {} }))}>{t('resetAll')}</button>
            <CopyLinkButton route="/daevanion" state={st} />
          </div>
        </div>
        <div className="pointbars">
          {(Object.keys(maxByType) as PointType[]).map((pt) => (
            <PointBar
              key={pt}
              label={`${pointName(pt)}${pt === 'DaevanionCrystal' ? ` (${t('shared')})` : ''}`}
              spent={spentByType[pt] ?? 0}
              max={maxByType[pt]}
            />
          ))}
        </div>
      </section>

      <div className="columns board-columns">
        <section className="panel board-panel">
          <p className="muted small">{t('pathHint')}</p>
          <BoardGrid
            board={board}
            learned={learned}
            routeKeys={routeKeys}
            skillById={data.skillById}
            onClick={onNodeClick}
            onHover={setHover}
          />
          <div className="node-info">
            {hover ? (
              <>
                <div className="skill-name">
                  {hover.kind === 'K' && data.skillById.get(Number(hover.key)) && (
                    <SkillIcon icon={data.skillById.get(Number(hover.key))!.icon} size={28} />
                  )}
                  {hover.label}{hover.value != null && hover.kind === 'T' ? ` +${hover.value}` : ''}
                </div>
                <div className="muted small">
                  {hover.kind === 'S' ? t('start') : `${t(`grade_${hover.grade}` as 'grade_Common')} · ${hover.kind === 'T' ? t('statNode') : t('skillNode')} · ${hover.cost} ${t('pts')}`}
                  {learned.has(nodeKey(hover)) ? ` · ${t('learned')}` : ''}
                </div>
                {route && route.length > 0 && <div className="small">{t('routeCost', { n: routeCost })}</div>}
                {hover.kind !== 'S' && !learned.has(nodeKey(hover)) && route === null && <div className="small">{t('notReachable')}</div>}
              </>
            ) : (
              <span className="muted small">{board.name} · {learned.size} {t('nodes')} · {boardCost(board, learned)} {t('pts')}</span>
            )}
          </div>
        </section>

        <aside className="panel side sticky">
          <h2>{t('perBoard')}</h2>
          <ul className="kv">
            {perBoard.map(({ b, set }) => (
              <li key={b.id}><span>{b.name}</span><strong>{boardCost(b, set)} {t('pts')} · {set.size} {t('nodes')}</strong></li>
            ))}
          </ul>
          <h2>{t('stats')}</h2>
          {statTotals.size === 0 ? <p className="muted small">{t('none')}</p> : (
            <ul className="kv">
              {[...statTotals.values()].sort((a, b) => a.label.localeCompare(b.label)).map((s) => (
                <li key={s.label}><span>{s.label}</span><strong>+{s.value}</strong></li>
              ))}
            </ul>
          )}
          <h2>{t('skillLevels')}</h2>
          {skillTotals.size === 0 ? <p className="muted small">{t('none')}</p> : (
            <ul className="kv">
              {[...skillTotals.entries()].map(([id, v]) => {
                const s = data.skillById.get(Number(id));
                return (
                  <li key={id}>
                    <span className="with-icon">{s && <SkillIcon icon={s.icon} size={24} />}{s?.name ?? id}</span>
                    <strong>+{v}</strong>
                  </li>
                );
              })}
            </ul>
          )}
          <h2>{t('byGrade')}</h2>
          <ul className="kv">
            {(['Common', 'Rare', 'Legend', 'Unique'] as const).map((g) => (
              <li key={g}><span className={`grade-dot ${g}`}>{t(`grade_${g}`)}</span><strong>{gradeCount[g] ?? 0}</strong></li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
