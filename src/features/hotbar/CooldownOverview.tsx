import { Timer } from 'lucide-react';
import type { GameData } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Build } from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { Card, EmptyState } from '../../components/ui';
import { buildCd, skillLevel } from '../../lib/buildCalc';
import { cdTier, fmtCdLong } from '../../lib/cooldown';
import { timerState, type Timers } from './useCooldownTimers';

/** All skills on the hotbar plus equipped stigmas, sorted by cooldown, with proportional bars. */
export function CooldownOverview({ data, build, timers, now = 0 }: { data: GameData; build: Build; timers?: Timers; now?: number }) {
  const { t } = useLoadedGame();
  const ids = new Set<number>([...Object.values(build.bar), ...build.st.map((s) => s.id).filter((x): x is number => !!x)]);
  const auto = new Set(build.auto);
  const items = [...ids]
    .map((id) => data.skillById.get(id))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .map((s) => ({ s, cd: buildCd(data, build, s) }))
    .sort((a, b) => b.cd - a.cd || a.s.name.localeCompare(b.s.name));
  const max = Math.max(1, ...items.map((i) => i.cd));

  return (
    <Card title={t('cdOverview')} icon={<Timer size={16} />}>
      <p className="muted small">{t('cdOverviewHint')}</p>
      {items.length === 0 ? <EmptyState text={t('cdEmpty')} /> : (
        <ul className="cd-list">
          {items.map(({ s, cd }) => {
            const st = timers ? timerState(timers[s.id], now) : null;
            return (
              <li key={s.id}>
                <SkillTile skill={s} level={skillLevel(data, build, s)} size={32} showCd={false} />
                <div className="cd-main">
                  <div className="cd-name">
                    <span>{s.name}</span>
                    {auto.has(s.id) && <span className="mini-tag auto">A</span>}
                    {s.isStigma && <span className="mini-tag stigma">S</span>}
                  </div>
                  <div className={`cd-bar cd-${cdTier(cd)}`}>
                    <span style={{ width: `${(cd / max) * 100}%` }}>
                      {st && !st.zero && <i style={{ width: `${st.frac * 100}%` }} />}
                    </span>
                  </div>
                </div>
                <strong className={`cd-val cd-text-${cdTier(cd)}`}>{st && !st.zero ? `${st.sec.toFixed(1)} s` : cd > 0 ? fmtCdLong(cd) : '–'}</strong>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
