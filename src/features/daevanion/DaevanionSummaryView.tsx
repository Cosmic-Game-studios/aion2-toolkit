import { useMemo } from 'react';
import { Hexagon, Lock } from 'lucide-react';
import type { GameData } from '../../data/types';
import type { Build } from '../../state/build';
import { useLoadedGame } from '../../data/GameDataContext';
import { useEnglishData } from '../../data/useEnglishData';
import { SkillTile } from '../../components/SkillTile';
import { EmptyState } from '../../components/ui';
import { daevanionSummary, type DvStat } from './summary';
import { statFocusList, statRanks } from './dvModel';

const GRADES = ['Common', 'Rare', 'Legend', 'Unique'] as const;

interface Props {
  data: GameData;
  build: Build;
  /** community cards: two columns, no board buttons */
  compact?: boolean;
  /** the board rows become buttons that open that board */
  onPick?: (boardId: number) => void;
  /** board shown next to the summary (marked in the list) */
  activeId?: number;
}

/** Stat totals, skill-level bonuses and node counts of a build's Daevanion boards. */
export function DaevanionSummaryView({ data, build, compact, onPick, activeId }: Props) {
  const { t } = useLoadedGame();
  const en = useEnglishData();
  // the class's stat priority (as on the stat chips): PvE stats by the PvE list, PvP stats by the PvP list
  const ranks = useMemo(() => {
    if (!en) return { pve: undefined, pvp: undefined };
    return {
      pve: statRanks(statFocusList(en, data, build.c, false)),
      pvp: statRanks(statFocusList(en, data, build.c, true)),
    };
  }, [en, data, build.c]);
  const sum = useMemo(() => {
    const merged = new Map<string, number>();
    for (const [k, v] of ranks.pvp ?? []) merged.set(k, v);
    for (const [k, v] of ranks.pve ?? []) if (!k.startsWith('PvP')) merged.set(k, v);
    return daevanionSummary(data, build, ranks.pve ? merged : undefined);
  }, [data, build, ranks]);

  if (sum.nodes === 0) {
    return (
      <div className={`dv-summary empty-summary ${compact ? 'compact' : ''}`}>
        <EmptyState icon={<Hexagon size={26} aria-hidden />} text={t(compact ? 'dvEmptyBuild' : 'dvEmpty')} />
      </div>
    );
  }

  const pve = sum.stats.filter((s) => !s.pvp);
  const pvp = sum.stats.filter((s) => s.pvp);
  const statRow = (s: DvStat, rank: number | undefined) => (
    <li key={s.key}>
      <span className="dv-stat-name">
        {rank != null && <b className={`dv-rank ${rank < 3 ? 'top' : ''}`}>{rank + 1}</b>}
        {s.label}
      </span>
      <strong>+{s.value}</strong>
    </li>
  );

  return (
    <div className={`dv-summary ${compact ? 'compact' : ''}`}>
      <div className="dv-block">
        <h4>{t('perBoard')}</h4>
        <ul className="board-progress">
          {sum.perBoard.map(({ b, spent, max, set }) => {
            const locked = build.l < b.needLevel;
            const body = (
              <>
                <span className="bp-head">
                  <span className="bp-name">
                    {locked && <Lock size={13} aria-hidden />}
                    {b.name}
                    {locked && <span className="bp-lock">{t('unlocksAt', { lvl: b.needLevel })}</span>}
                  </span>
                  <span className="bp-meta">{set.size} {t('nodes')} · <b>{spent}</b>/{max}</span>
                </span>
                <span className="bp-track" aria-hidden><span style={{ width: `${max ? (spent / max) * 100 : 0}%` }} /></span>
              </>
            );
            return (
              <li key={b.id} className={`pt-${b.pointType}`}>
                {onPick ? (
                  <button
                    type="button"
                    className={`bp-row ${b.id === activeId ? 'on' : ''}`}
                    aria-current={b.id === activeId || undefined}
                    onClick={() => onPick(b.id)}
                  >
                    {body}
                  </button>
                ) : <div className="bp-row">{body}</div>}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="dv-block">
        <h4>{t('stats')}</h4>
        {pve.length === 0 ? <p className="muted small">{t('none')}</p> : (
          <ul className="kv dv-kv">{pve.map((s) => statRow(s, ranks.pve?.get(s.key)))}</ul>
        )}
      </div>

      {pvp.length > 0 && (
        <div className="dv-block">
          <h4>{t('dvPvpStats')}</h4>
          <ul className="kv dv-kv">{pvp.map((s) => statRow(s, ranks.pvp?.get(s.key)))}</ul>
        </div>
      )}

      {sum.skills.length > 0 && (
        <div className="dv-block">
          <h4>{t('skillLevels')}</h4>
          <ul className="kv dv-kv">
            {sum.skills.map(({ id, value }) => {
              const s = data.skillById.get(id);
              return (
                <li key={id}>
                  <span className="with-icon">{s && <SkillTile skill={s} size={24} showCd={false} />}<span className="break">{s?.name ?? id}</span></span>
                  <strong>+{value}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="dv-block">
        <h4>{t('byGrade')}</h4>
        <div className="grade-row">
          {GRADES.map((g) => (
            <span key={g} className={`grade-pill ${g}`}><i aria-hidden />{t(`grade_${g}`)} <b>{sum.grades[g] ?? 0}</b></span>
          ))}
        </div>
      </div>
    </div>
  );
}
