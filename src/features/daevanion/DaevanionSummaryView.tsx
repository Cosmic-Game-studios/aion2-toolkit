import type { GameData } from '../../data/types';
import type { Build } from '../../state/build';
import { useLoadedGame } from '../../data/GameDataContext';
import { SkillTile } from '../../components/SkillTile';
import { daevanionSummary } from './summary';

const GRADES = ['Common', 'Rare', 'Legend', 'Unique'] as const;

/** Stat totals, skill-level bonuses and node counts of a build's Daevanion boards. */
export function DaevanionSummaryView({ data, build, compact }: { data: GameData; build: Build; compact?: boolean }) {
  const { t } = useLoadedGame();
  const sum = daevanionSummary(data, build);
  return (
    <div className={`dv-summary ${compact ? 'compact' : ''}`}>
      <div className="dv-block">
        <h4>{t('perBoard')}</h4>
        <ul className="board-progress">
          {sum.perBoard.map(({ b, spent, max, set }) => (
            <li key={b.id}>
              <div className="bp-head"><span>{b.name}</span><span className="muted small">{set.size} {t('nodes')} · <b>{spent}</b>/{max}</span></div>
              <div className="bp-track"><span style={{ width: `${max ? (spent / max) * 100 : 0}%` }} /></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="dv-block">
        <h4>{t('stats')}</h4>
        {sum.stats.length === 0 ? <p className="muted small">{t('none')}</p> : (
          <ul className="kv">
            {sum.stats.map((s) => <li key={s.label}><span>{s.label}</span><strong>+{s.value}</strong></li>)}
          </ul>
        )}
      </div>

      <div className="dv-block">
        <h4>{t('skillLevels')}</h4>
        {sum.skills.length === 0 ? <p className="muted small">{t('none')}</p> : (
          <ul className="kv">
            {sum.skills.map(({ id, value }) => {
              const s = data.skillById.get(id);
              return (
                <li key={id}>
                  <span className="with-icon">{s && <SkillTile skill={s} size={24} showCd={false} />}{s?.name ?? id}</span>
                  <strong>+{value}</strong>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="dv-block">
        <h4>{t('byGrade')}</h4>
        <div className="grade-row">
          {GRADES.map((g) => (
            <span key={g} className={`grade-pill ${g}`}><i />{t(`grade_${g}`)} <b>{sum.grades[g] ?? 0}</b></span>
          ))}
        </div>
      </div>
    </div>
  );
}
