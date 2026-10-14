import { useMemo, useState } from 'react';
import { CheckCheck, Eraser, Hexagon, Info, Lock, Route, Trash2 } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Board, BoardNode, PointType } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import { Card, Meter, PageHeader } from '../../components/ui';
import { SkillTile } from '../../components/SkillTile';
import {
  allNodeKeys, boardCost, canLearn, cheapestPath, decodeLearned, encodeLearned, learn, nodeKey, unlearn,
} from '../../lib/daevanionGraph';
import { BoardGrid } from './BoardGrid';
import { DaevanionSummaryView } from './DaevanionSummaryView';

const GRADES = ['Common', 'Rare', 'Legend', 'Unique'] as const;

export function DaevanionCalculator() {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const [boardId, setBoardId] = useState<number | null>(null);
  const [hover, setHover] = useState<BoardNode | null>(null);

  const dv = data.daevanion;
  const boards = dv.classes[build.c]?.boards ?? [];
  const board = boards.find((b) => b.id === boardId) ?? boards[0];

  const learnedFor = (b: Board) => decodeLearned(b, build.dv[b.id] ?? '');
  const learned = useMemo(() => (board ? learnedFor(board) : new Set<string>()), [board, build.dv]);

  if (!board) return null;

  const setLearned = (b: Board, set: Set<string>) =>
    setBuild((p) => ({ ...p, dv: { ...p.dv, [b.id]: encodeLearned(b, set) } }));

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

  const totals: Partial<Record<PointType, { spent: number; max: number }>> = {};
  for (const b of boards) {
    const cur = (totals[b.pointType] ??= { spent: 0, max: 0 });
    cur.spent += boardCost(b, learnedFor(b));
    cur.max += b.nodes.reduce((a, n) => a + n.cost, 0);
  }
  const hoverSkill = hover?.kind === 'K' ? data.skillById.get(Number(hover.key)) : undefined;
  const boardSpent = boardCost(board, learned);
  const boardMax = board.nodes.reduce((a, n) => a + n.cost, 0);

  return (
    <div className="page">
      <PageHeader
        icon={<Hexagon size={22} />}
        title={t('navDaevanion')}
        subtitle={t('homeDaevanionText')}
        actions={
          <button type="button" className="btn ghost" onClick={() => { if (confirm(t('resetConfirm'))) setBuild({ dv: {} }); }}>
            <Trash2 size={16} /> {t('resetAll')}
          </button>
        }
      />

      <Card>
        <div className="meters">
          {(Object.keys(totals) as PointType[]).map((pt) => (
            <Meter
              key={pt}
              label={`${dv.points[pt]?.name ?? pt}${pt === 'DaevanionCrystal' ? ` (${t('shared')})` : ''}`}
              spent={totals[pt]!.spent}
              max={Math.min(totals[pt]!.max, dv.points[pt]?.max ?? totals[pt]!.max)}
            />
          ))}
        </div>
      </Card>

      <div className="board-tabs" role="tablist">
        {boards.map((b) => {
          const set = learnedFor(b);
          const spent = boardCost(b, set);
          const max = b.nodes.reduce((a, n) => a + n.cost, 0);
          const locked = build.l < b.needLevel;
          return (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={b.id === board.id}
              className={`board-tab ${b.id === board.id ? 'active' : ''} ${locked ? 'locked' : ''} pt-${b.pointType}`}
              onClick={() => setBoardId(b.id)}
            >
              <span className="bt-name">{locked && <Lock size={13} />}{b.name}</span>
              <span className="bt-meta">{t('unlocksAt', { lvl: b.needLevel })} · {spent}/{max}</span>
              <span className="bt-track"><span style={{ width: `${max ? (spent / max) * 100 : 0}%` }} /></span>
            </button>
          );
        })}
      </div>

      <div className="split">
        <Card
          className="board-card"
          title={<>{board.name} <span className="count">{boardSpent} / {boardMax} {t('pts')}</span></>}
          extra={
            <>
              <button type="button" className="btn sm" onClick={() => setLearned(board, allNodeKeys(board))}><CheckCheck size={14} /> {t('learnAll')}</button>
              <button type="button" className="btn sm ghost" onClick={() => setLearned(board, new Set())}><Eraser size={14} /> {t('resetBoard')}</button>
            </>
          }
        >
          {build.l < board.needLevel && <p className="hint-box warn"><Lock size={15} /> {t('lockedUntil', { lvl: board.needLevel })}</p>}
          <div className="board-wrap">
            <BoardGrid
              board={board}
              learned={learned}
              routeKeys={routeKeys}
              hoverKey={hover ? nodeKey(hover) : null}
              skillById={data.skillById}
              onClick={onNodeClick}
              onHover={setHover}
            />
          </div>
          <div className="node-info" aria-live="polite">
            {hover ? (
              <>
                <div className="ni-main">
                  {hoverSkill && <SkillTile skill={hoverSkill} size={32} />}
                  <span className={`grade-dot ${hover.grade}`} />
                  <strong>{hover.label}{hover.value != null && hover.kind !== 'S' ? ` +${hover.value}` : ''}</strong>
                </div>
                <div className="ni-meta">
                  {hover.kind === 'S' ? t('start') : `${t(`grade_${hover.grade}` as 'grade_Common')} · ${hover.kind === 'T' ? t('statNode') : t('skillNode')} · ${hover.cost} ${t('pts')}`}
                  {learned.has(nodeKey(hover)) ? ` · ${t('learned')}` : ''}
                </div>
                {route && route.length > 0 && <div className="ni-route"><Route size={14} /> {t('routeCost', { n: routeCost })}</div>}
                {hover.kind !== 'S' && !learned.has(nodeKey(hover)) && route === null && <div className="ni-route">{t('notReachable')}</div>}
              </>
            ) : (
              <span className="muted small"><Info size={14} /> {t('pathHint')}</span>
            )}
          </div>
          <div className="legend">
            {GRADES.map((g) => (
              <span key={g} className="legend-item"><span className={`grade-dot ${g}`} />{t(`grade_${g}`)}</span>
            ))}
            <span className="legend-item"><span className="legend-shape round" />{t('skillNode')}</span>
          </div>
        </Card>

        <aside className="side sticky">
          <Card title={t('stats')}>
            <DaevanionSummaryView data={data} build={build} />
          </Card>
        </aside>
      </div>
    </div>
  );
}
