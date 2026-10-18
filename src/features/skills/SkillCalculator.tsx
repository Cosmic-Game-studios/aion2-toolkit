import { useEffect, useId, useMemo, useState } from 'react';
import { Check, Coins, Lock, Minus, Plus, Swords, TriangleAlert } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Skill } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import type { Faction } from '../../state/build';
import { SkillTile, PlainIcon } from '../../components/SkillTile';
import { Bump, CdChip, EmptyState, NumberField, PageHeader, Segmented } from '../../components/ui';
import { ClassGuideLink } from '../../components/ClassGuideLink';
import { Modal } from '../../components/Modal';
import { MQ, useMediaQuery } from '../../components/hooks';
import { maxBuyableLevel, skillPointStep, skillPointsTo } from '../../lib/skillCosts';
import { activeSpecs, buildCd, classSkills, effectiveLevel, isUnlocked, skillLevel, skillPointBudget, skillPointsSpent } from '../../lib/buildCalc';
import { applyCdr, cdAt } from '../../lib/cooldown';
import { BudgetCard } from './BudgetCard';
import { LevelBar } from './LevelBar';
import { SkillPanel, type SkillTab } from './SkillPanel';

type Filter = 'all' | 'active' | 'passive';
type Sort = 'level' | 'cd' | 'name';

const SOURCES_KEY = 'skills:sourcesOpen';

/** Skill points: one summary line; level, faction sources and the manual correction behind "Point sources". */
function PointsCard() {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const srcId = `src-${useId().replace(/:/g, '')}`;
  const budget = skillPointBudget(data, build);
  const spent = skillPointsSpent(data, build);
  const groups = data.points[build.f] ?? [];

  return (
    <BudgetCard
      label={t('skillPoints')}
      icon={<Coins size={14} aria-hidden />}
      spent={spent}
      max={budget.total}
      toggleLabel={t('pointSources')}
      added={budget.extra + budget.manual}
      storageKey={SOURCES_KEY}
    >
      <p className="pc-sum">
        {t('pointsBreakdown', { lvl: build.l, base: budget.base, extra: budget.extra, manual: budget.manual > 0 ? `+${budget.manual}` : budget.manual })}
        {' = '}<b>{budget.total}</b>
      </p>
      <div className="pc-fields">
        <div className="field-block">
          <span>{t('faction')}</span>
          <Segmented<Faction>
            label={t('faction')}
            value={build.f}
            onChange={(f) => setBuild({ f })}
            options={[{ value: 'Light', label: t('elyos') }, { value: 'Dark', label: t('asmodian') }]}
          />
        </div>
        <label className="field-block">
          <span>{t('extraManual')}</span>
          <NumberField value={build.e} min={-999} max={999} onChange={(e) => setBuild({ e })} className="pc-number" />
        </label>
      </div>
      {groups.length > 0 && (
        <div className="source-chips" role="group" aria-labelledby={srcId}>
          <span className="pc-label" id={srcId}>{t('extraSources')}</span>
          <div className="chips">
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
                  {on ? <Check size={14} aria-hidden /> : <Plus size={14} aria-hidden />}
                  {g.name} <b>+{g.points}</b>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </BudgetCard>
  );
}

export function SkillCalculator({ param, visit }: { param?: string | null; visit?: number }) {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const narrow = useMediaQuery(MQ.narrow);
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('level');
  const [selected, setSelected] = useState<number | null>(null);
  const [sheet, setSheet] = useState(false);
  const [tab, setTab] = useState<SkillTab>('effect');
  const { costs } = data;

  const all = useMemo(() => classSkills(data, build).filter((s) => !s.isStigma), [data, build]);
  const skills = useMemo(() => {
    const list = all.filter((s) => filter === 'all' || s.type === filter);
    return list.sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name)
        : sort === 'cd' ? buildCd(data, build, b) - buildCd(data, build, a) || a.acquireLevel - b.acquireLevel
          : a.acquireLevel - b.acquireLevel || a.id - b.id);
  }, [all, data, build, filter, sort]);

  const left = skillPointBudget(data, build).total - skillPointsSpent(data, build);
  // only skills of the current class (a class switch must not keep the old class's skill in the panel)
  const sel = all.find((s) => s.id === selected) ?? (narrow ? undefined : skills[0]);

  const open = (s: Skill) => {
    setSelected(s.id);
    if (narrow) setSheet(true);
  };

  // deep link: #/skills/<skillId> selects the skill (and opens the sheet on narrow screens), again on every visit of the link
  useEffect(() => {
    const id = Number(param);
    if (!param || !Number.isFinite(id)) return;
    const s = data.skillById.get(id);
    if (!s || s.classType !== build.c) return;
    if (s.isStigma) { window.location.hash = `#/stigma/${id}`; return; }
    setSelected(id);
    if (filter !== 'all' && s.type !== filter) setFilter('all');
    // links from combos and the database come to choose a specialisation: open that tab where there is one
    if (s.parts?.length && !s.partsAuto) setTab('specs');
    if (narrow) setSheet(true);
    else requestAnimationFrame(() => document.getElementById(`skill-row-${id}`)?.scrollIntoView({ block: 'center' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, visit]);

  // a sheet opened on a narrow screen must not pop up again after the window was wide in between (tablet rotation)
  useEffect(() => { if (!narrow) setSheet(false); }, [narrow]);

  const setLevel = (s: Skill, lvl: number) => setBuild((b) => ({ ...b, lv: { ...b.lv, [s.id]: lvl } }));

  const actives = skills.filter((s) => s.type === 'active');
  const passives = skills.filter((s) => s.type === 'passive');

  const renderRow = (s: Skill) => {
    const unlocked = isUnlocked(build, s);
    const lvl = skillLevel(data, build, s);
    const max = maxBuyableLevel(costs, s.id);
    const next = unlocked && lvl < max ? skillPointStep(costs, s.id, lvl + 1) : 0;
    const short = next > 0 && next > left;
    const eff = effectiveLevel(data, build, s).total;
    const base = cdAt(s, eff);
    const specs = activeSpecs(data, build, s).map((id) => s.parts?.find((p) => p.id === id)).filter((p) => !!p);
    const isSel = sel?.id === s.id;
    return (
      <div key={s.id} id={`skill-row-${s.id}`} className={`skill-row ${unlocked ? '' : 'locked'} ${isSel ? 'selected' : ''}`}>
        <button
          type="button"
          className="sr-select"
          onClick={() => open(s)}
          aria-pressed={narrow ? undefined : isSel}
          aria-haspopup={narrow ? 'dialog' : undefined}
        >
          <SkillTile skill={s} level={eff} size={44} showLevel={unlocked} dim={!unlocked} />
          <span className="sr-main">
            <span className="sr-name">{s.name}</span>
            <span className="sr-meta">
              {s.type === 'active' && (base > 0 ? <CdChip cd={applyCdr(base, build.cdr)} base={base} short /> : <span className="chip subtle">{t('noCooldown')}</span>)}
              {s.cost?.mp ? <span className="chip subtle">{s.cost.mp} {t('mpCost')}</span> : null}
              {!unlocked && <span className="chip warn"><Lock size={12} aria-hidden /> {t('lockedUntil', { lvl: s.acquireLevel })}</span>}
              {unlocked && eff > lvl && <span className="chip subtle">{t('effLevelChip', { n: eff })}</span>}
              {specs.length > 0 && (
                <span className="sr-specs" title={specs.map((p) => p.desc.replace(/\*\*/g, '')).join(' · ')}>
                  {specs.map((p) => <PlainIcon key={p.id} icon={p.icon} size={20} />)}
                  <span className="sr-only">{t('specialisations')}: {specs.length}</span>
                </span>
              )}
            </span>
          </span>
        </button>
        <div className="sr-level">
          <button type="button" className="icon-btn sm" disabled={!unlocked || lvl <= 1} onClick={() => setLevel(s, lvl - 1)} aria-label={`${t('levelDown')}: ${s.name}`}>
            <Minus size={15} aria-hidden />
          </button>
          <LevelBar
            value={unlocked ? lvl : 0}
            max={max}
            disabled={!unlocked}
            onChange={(v) => setLevel(s, v)}
            label={t('levelOf', { name: s.name })}
            valueText={unlocked ? t('levelValueText', { n: lvl, max }) : t('lockedUntil', { lvl: s.acquireLevel })}
            pipTitle={(v) => t('pipTitlePts', { lvl: v, n: skillPointsTo(costs, s.id, v) })}
          />
          <button type="button" className="icon-btn sm" disabled={!unlocked || lvl >= max} onClick={() => setLevel(s, lvl + 1)} aria-label={`${t('levelUp')}: ${s.name}`}>
            <Plus size={15} aria-hidden />
          </button>
        </div>
        <div className="sr-lvnum">
          <span className="sr-lv"><b><Bump value={unlocked ? lvl : '–'} /></b>/{max}</span>
          {unlocked && (
            <small className={`sr-next ${short ? 'warn' : ''} ${next ? '' : 'max'}`} title={next ? t('nextLevelCost', { n: next }) : undefined}>
              {next
                ? <>{short && <TriangleAlert size={12} aria-hidden />}<span className="sr-only">{t('nextLevel')}: </span>{t('nextCostShort', { n: next })}{short && <span className="sr-only"> – {t('notEnoughPoints')}</span>}</>
                : t('levelMax')}
            </small>
          )}
        </div>
      </div>
    );
  };

  const panel = (inSheet: boolean) => sel && <SkillPanel skill={sel} tab={tab} onTab={setTab} inSheet={inSheet} />;

  return (
    <div className="page skills-page">
      <PageHeader
        icon={<Swords size={22} />}
        title={t('navSkills')}
        subtitle={t('homeSkillsText')}
        guide={{
          id: 'skills',
          // where the details open follows the width (side panel or sheet), the verb follows the input (click or tap)
          steps: [
            { mouse: t(narrow ? 'guideSkills1Sheet' : 'guideSkills1'), touch: t(narrow ? 'guideSkills1Touch' : 'guideSkills1TouchSide') },
            t('guideSkills2'),
            t('guideSkills3'),
          ],
        }}
        help={<ClassGuideLink section="skills" />}
      />

      <PointsCard />

      <div className="split">
        <section className="card list-card" aria-label={t('navSkills')}>
          <div className="list-head">
            <Segmented<Filter>
              label={t('filterType')}
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
            <span className={`chip budget-chip ${left < 0 ? 'over' : ''}`}>
              {left < 0 ? <TriangleAlert size={13} aria-hidden /> : <Coins size={13} aria-hidden />}
              <span className="sr-only">{t('skillPoints')}: </span>
              {left < 0 ? t('overBy', { n: -left }) : t('pointsLeft', { n: left })}
            </span>
          </div>
          {actives.length > 0 && <h3 className="group-title">{t('active')} <span className="count">{actives.length}</span></h3>}
          <div className="skill-list">{actives.map(renderRow)}</div>
          {passives.length > 0 && <h3 className="group-title">{t('passive')} <span className="count">{passives.length}</span></h3>}
          <div className="skill-list">{passives.map(renderRow)}</div>
        </section>

        {!narrow && (
          <aside className="side sticky skill-aside">
            <section className="card" aria-label={t('details')}>
              {sel ? panel(false) : <EmptyState icon={<Swords size={28} />} text={t('selectSkillHint')} />}
            </section>
          </aside>
        )}
      </div>

      {narrow && sel && (
        <Modal open={sheet} sheet title={sel.name} onClose={() => setSheet(false)} className="skill-sheet">
          {panel(true)}
        </Modal>
      )}
    </div>
  );
}
