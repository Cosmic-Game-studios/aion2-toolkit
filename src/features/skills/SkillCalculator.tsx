import { useMemo, useState } from 'react';
import { Coins, Keyboard, Lock, Swords } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Skill } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import { SkillTile } from '../../components/SkillTile';
import { SkillDetail } from '../../components/SkillDetail';
import { Card, CdChip, LevelPips, Meter, PageHeader, Segmented } from '../../components/ui';
import { maxBuyableLevel, skillPointStep, skillPointsTo } from '../../lib/skillCosts';
import { buildCd, classSkills, isUnlocked, skillLevel, skillPointBudget, skillPointsSpent } from '../../lib/buildCalc';
import { applyCdr, cdAt } from '../../lib/cooldown';
import type { Faction } from '../../state/build';

type Filter = 'all' | 'active' | 'passive';
type Sort = 'level' | 'cd' | 'name';

export function SkillCalculator() {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('level');
  const [selected, setSelected] = useState<number | null>(null);
  const { costs, points } = data;

  const skills = useMemo(() => {
    const list = classSkills(data, build).filter((s) => !s.isStigma && (filter === 'all' || s.type === filter));
    return list.sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name)
        : sort === 'cd' ? buildCd(data, build, b) - buildCd(data, build, a) || a.acquireLevel - b.acquireLevel
          : a.acquireLevel - b.acquireLevel || a.id - b.id);
  }, [data, build, filter, sort]);

  const budget = skillPointBudget(data, build);
  const spent = skillPointsSpent(data, build);
  const groups = points[build.f] ?? [];
  const sel = (selected != null ? data.skillById.get(selected) : undefined) ?? skills[0];

  const setLevel = (s: Skill, lvl: number) => setBuild((b) => ({ ...b, lv: { ...b.lv, [s.id]: lvl } }));

  const actives = skills.filter((s) => s.type === 'active');
  const passives = skills.filter((s) => s.type === 'passive');

  const renderRow = (s: Skill) => {
    const unlocked = isUnlocked(build, s);
    const lvl = skillLevel(data, build, s);
    const max = maxBuyableLevel(costs, s.id);
    const cum = skillPointsTo(costs, s.id, lvl);
    const next = lvl < max ? skillPointStep(costs, s.id, lvl + 1) : 0;
    const base = cdAt(s, lvl);
    return (
      <div
        key={s.id}
        className={`skill-row ${unlocked ? '' : 'locked'} ${sel?.id === s.id ? 'selected' : ''}`}
        onClick={() => setSelected(s.id)}
      >
        <SkillTile skill={s} level={lvl} size={48} showLevel={unlocked} dim={!unlocked} />
        <div className="sr-main">
          <div className="sr-name">{s.name}</div>
          <div className="sr-meta">
            {base > 0 ? <CdChip cd={applyCdr(base, build.cdr)} base={base} short /> : <span className="chip subtle">{t('noCooldown')}</span>}
            {s.cost?.mp ? <span className="chip subtle">{s.cost.mp} {t('mpCost')}</span> : null}
            {unlocked
              ? <span className="chip subtle"><Coins size={12} /> {cum}{next ? ` · +${next}` : ''}</span>
              : <span className="chip warn"><Lock size={12} /> {t('lockedUntil', { lvl: s.acquireLevel })}</span>}
          </div>
        </div>
        <div className="sr-level" onClick={(e) => e.stopPropagation()}>
          <LevelPips value={unlocked ? lvl : 0} max={max} disabled={!unlocked} onChange={(v) => setLevel(s, v)} />
          <span className="sr-lvnum">{unlocked ? lvl : '–'}<small>/{max}</small></span>
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <PageHeader
        icon={<Swords size={22} />}
        title={t('navSkills')}
        subtitle={t('homeSkillsText')}
        actions={<a className="btn ghost" href="#/hotbar"><Keyboard size={16} /> {t('navHotbar')}</a>}
      />

      <Card title={t('skillPoints')} icon={<Coins size={16} />} className="points-card">
        <div className="points-grid">
          <Meter label={`${t('skillPoints')} (${t('fromLevel')} ${build.l}: ${budget.base})`} spent={spent} max={budget.total} />
          <div className="field-inline">
            <span className="eyebrow">{t('faction')}</span>
            <Segmented<Faction>
              value={build.f}
              onChange={(f) => setBuild({ f })}
              options={[{ value: 'Light', label: t('elyos') }, { value: 'Dark', label: t('asmodian') }]}
            />
          </div>
          <label className="field-inline">
            <span className="eyebrow">{t('extraManual')}</span>
            <input type="number" min={0} value={build.e} onChange={(e) => setBuild({ e: Math.max(0, Math.round(Number(e.target.value)) || 0) })} />
          </label>
        </div>
        <div className="chips source-chips">
          <span className="eyebrow">{t('extraSources')}</span>
          {groups.map((g, i) => {
            const gid = `${g.kind}-${i}`;
            const on = build.x.includes(gid);
            return (
              <button
                key={gid}
                type="button"
                className={`chip toggle ${on ? 'on' : ''}`}
                aria-pressed={on}
                onClick={() => setBuild({ x: on ? build.x.filter((k) => k !== gid) : [...build.x, gid] })}
              >
                {g.name} <b>+{g.points}</b>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="split">
        <Card
          className="list-card"
          extra={
            <div className="toolbar">
              <Segmented<Filter>
                value={filter}
                onChange={setFilter}
                options={[{ value: 'all', label: t('all') }, { value: 'active', label: t('active') }, { value: 'passive', label: t('passive') }]}
              />
              <label className="select-inline">
                <span>{t('sortBy')}</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  <option value="level">{t('sortLevel')}</option>
                  <option value="cd">{t('sortCd')}</option>
                  <option value="name">{t('sortName')}</option>
                </select>
              </label>
            </div>
          }
        >
          {actives.length > 0 && <h3 className="group-title">{t('active')} <span className="count">{actives.length}</span></h3>}
          <div className="skill-list">{actives.map(renderRow)}</div>
          {passives.length > 0 && <h3 className="group-title">{t('passive')} <span className="count">{passives.length}</span></h3>}
          <div className="skill-list">{passives.map(renderRow)}</div>
        </Card>

        <aside className="side sticky">
          <Card title={t('details')}>
            {sel ? <SkillDetail skill={sel} level={skillLevel(data, build, sel)} locked={!isUnlocked(build, sel)} /> : <p className="muted">{t('selectSkillHint')}</p>}
          </Card>
        </aside>
      </div>
    </div>
  );
}
