import { useMemo, useState } from 'react';
import { useGame, useLoadedGame } from '../../data/GameDataContext';
import type { ClassType, Skill } from '../../data/types';
import { ClassPicker } from '../../components/ClassPicker';
import { SkillIcon } from '../../components/SkillIcon';
import { LevelStepper } from '../../components/LevelStepper';
import { PointBar } from '../../components/PointBar';
import { CopyLinkButton } from '../../components/CopyLinkButton';
import { maxBuyableLevel, pointsAtLevel, skillPointStep, skillPointsTo } from '../../lib/skillCosts';
import { decodeState, readHash } from '../../lib/shareLink';
import { usePersistedState } from '../../lib/usePersistedState';
import { richText, fmtSec } from '../../lib/format';

type Faction = 'Light' | 'Dark';
interface BuildState {
  c: ClassType;
  l: number;
  f: Faction;
  x: string[];            // enabled extra point source groups (kind)
  e: number;              // manual extra points
  lv: Record<string, number>;
  bar: Record<string, number>; // slot index -> skill id
}
interface SavedBuild { name: string; state: BuildState }

const BAR_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const DEFAULT: BuildState = { c: 'Gladiator', l: 45, f: 'Light', x: [], e: 0, lv: {}, bar: {} };

export function SkillCalculator() {
  const { data, t } = useLoadedGame();
  const shared = useMemo(() => decodeState<BuildState>(readHash().params.get('s')), []);
  const [st, setSt] = usePersistedState<BuildState>('skillCalc', DEFAULT, shared);
  const [selected, setSelected] = useState<number | null>(null);
  const [pick, setPick] = useState<number | null>(null); // skill waiting for a bar slot
  const [saved, setSaved] = usePersistedState<SavedBuild[]>('skillCalcSaved', []);
  const [buildName, setBuildName] = useState('');

  const { skills, costs, points } = data;

  const classSkills = useMemo(
    () => skills.filter((s) => s.classType === st.c && !s.isStigma).sort((a, b) => a.acquireLevel - b.acquireLevel || a.id - b.id),
    [skills, st.c],
  );
  const actives = classSkills.filter((s) => s.type === 'active');
  const passives = classSkills.filter((s) => s.type === 'passive');

  const levelOf = (s: Skill) => Math.max(1, Math.min(maxBuyableLevel(costs, s.id), st.lv[s.id] ?? 1));
  const isLearned = (s: Skill) => s.acquireLevel <= st.l;

  const spent = classSkills.reduce((sum, s) => (isLearned(s) ? sum + skillPointsTo(costs, s.id, levelOf(s)) : sum), 0);
  const base = pointsAtLevel(points, st.l).skill;
  const groups = points[st.f] ?? [];
  const extraFromGroups = groups.filter((g, i) => st.x.includes(`${g.kind}-${i}`)).reduce((a, g) => a + g.points, 0);
  const budget = base + extraFromGroups + (Number(st.e) || 0);

  const update = (patch: Partial<BuildState>) => setSt((p) => ({ ...p, ...patch }));
  const setLevel = (s: Skill, lvl: number) => setSt((p) => ({ ...p, lv: { ...p.lv, [s.id]: lvl } }));
  const changeClass = (c: ClassType) => { setSt((p) => ({ ...p, c, lv: {}, bar: {} })); setSelected(null); setPick(null); };

  const assignSlot = (slot: number, skillId: number) => {
    setSt((p) => {
      const bar = { ...p.bar };
      for (const k of Object.keys(bar)) if (bar[k] === skillId) delete bar[k];
      bar[slot] = skillId;
      return { ...p, bar };
    });
    setPick(null);
  };
  const clearSlot = (slot: number) => setSt((p) => { const bar = { ...p.bar }; delete bar[slot]; return { ...p, bar }; });

  const sel = selected != null ? data.skillById.get(selected) ?? null : null;

  const renderSkill = (s: Skill) => {
    const learned = isLearned(s);
    const lvl = levelOf(s);
    const max = maxBuyableLevel(costs, s.id);
    const cum = skillPointsTo(costs, s.id, lvl);
    const next = lvl < max ? skillPointStep(costs, s.id, lvl + 1) : 0;
    return (
      <div
        key={s.id}
        className={`skill-row ${learned ? '' : 'locked'} ${selected === s.id ? 'selected' : ''} ${pick === s.id ? 'picking' : ''}`}
        onClick={() => { setSelected(s.id); if (s.type === 'active' && learned) setPick(pick === s.id ? null : s.id); }}
        draggable={s.type === 'active' && learned}
        onDragStart={(e) => e.dataTransfer.setData('text/plain', String(s.id))}
      >
        <SkillIcon icon={s.icon} size={44} title={s.name} />
        <div className="skill-meta">
          <div className="skill-name">
            {s.name}
            <span className="muted"> · {t('lv')} {s.acquireLevel}</span>
          </div>
          {learned ? (
            <div className="muted small">
              {t('spent')}: {cum} {t('pts')}{next ? ` · ${t('nextLevel')}: +${next}` : ''}
              {s.cooldownSec ? ` · ${t('cooldown')} ${fmtSec(s.levels[lvl - 1]?.cooldownSec ?? s.cooldownSec)}` : ''}
            </div>
          ) : (
            <div className="muted small">{t('lockedUntil', { lvl: s.acquireLevel })}</div>
          )}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <LevelStepper value={learned ? lvl : 0} min={1} max={max} disabled={!learned} onChange={(v) => setLevel(s, v)} label={s.name} />
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <section className="panel controls">
        <ClassPicker value={st.c} onChange={changeClass} />
        <div className="controls-row">
          <label className="field">
            <span>{t('charLevel')}</span>
            <input type="range" min={1} max={100} value={st.l} onChange={(e) => update({ l: Number(e.target.value) })} />
            <input type="number" min={1} max={100} value={st.l} onChange={(e) => update({ l: Math.min(100, Math.max(1, Number(e.target.value) || 1)) })} />
          </label>
          <label className="field">
            <span>{t('faction')}</span>
            <select value={st.f} onChange={(e) => update({ f: e.target.value as Faction })}>
              <option value="Light">{t('elyos')}</option>
              <option value="Dark">{t('asmodian')}</option>
            </select>
          </label>
          <label className="field">
            <span>{t('extraManual')}</span>
            <input type="number" min={0} value={st.e} onChange={(e) => update({ e: Math.max(0, Number(e.target.value) || 0) })} />
          </label>
          <div className="actions">
            <CopyLinkButton route="/skills" state={st} />
            <button type="button" className="btn ghost" onClick={() => update({ lv: {}, bar: {} })}>{t('reset')}</button>
          </div>
        </div>
        <details className="extra-sources">
          <summary>{t('extraSources')} (+{extraFromGroups})</summary>
          <div className="chips">
            {groups.map((g, i) => {
              const gid = `${g.kind}-${i}`;
              return (
                <label key={gid} className={`chip ${st.x.includes(gid) ? 'on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={st.x.includes(gid)}
                    onChange={(e) => update({ x: e.target.checked ? [...st.x, gid] : st.x.filter((k) => k !== gid) })}
                  />
                  {g.name} +{g.points}
                </label>
              );
            })}
          </div>
        </details>
        <PointBar label={t('skillPoints')} spent={spent} max={budget} hint={`${t('fromLevel')} ${st.l}: ${base}`} />
      </section>

      <div className="columns">
        <section className="panel">
          <h2>{t('active')} <span className="muted">({actives.length})</span></h2>
          <div className="skill-list">{actives.map(renderSkill)}</div>
          <h2>{t('passive')} <span className="muted">({passives.length})</span></h2>
          <div className="skill-list">{passives.map(renderSkill)}</div>
        </section>

        <aside className="panel side">
          <h2>{t('skillBar')}</h2>
          <p className="muted small">{t('skillBarHint')}</p>
          <div className="skill-bar">
            {BAR_KEYS.map((k, i) => {
              const sid = st.bar[i];
              const s = sid != null ? data.skillById.get(sid) : undefined;
              return (
                <div
                  key={k}
                  className={`bar-slot ${pick != null ? 'target' : ''}`}
                  onClick={() => { if (pick != null) assignSlot(i, pick); else if (s) clearSlot(i); }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const id = Number(e.dataTransfer.getData('text/plain')); if (id) assignSlot(i, id); }}
                  title={s ? s.name : ''}
                >
                  {s ? <SkillIcon icon={s.icon} size={40} /> : null}
                  <span className="bar-key">{k}</span>
                </div>
              );
            })}
          </div>

          <h2>{t('details')}</h2>
          {sel ? <SkillDetail skill={sel} level={isLearned(sel) ? levelOf(sel) : 0} /> : <p className="muted small">{t('selectSkillHint')}</p>}

          <h2>{t('savedBuilds')}</h2>
          <div className="save-row">
            <input placeholder={t('buildName')} value={buildName} onChange={(e) => setBuildName(e.target.value)} />
            <button
              type="button"
              className="btn"
              disabled={!buildName.trim()}
              onClick={() => { setSaved([...saved.filter((b) => b.name !== buildName.trim()), { name: buildName.trim(), state: st }]); setBuildName(''); }}
            >
              {t('saveBuild')}
            </button>
          </div>
          <ul className="saved-list">
            {saved.map((b) => (
              <li key={b.name}>
                <span>{b.name} <span className="muted small">({data.classes.find((c) => c.classType === b.state.c)?.name}, {t('lv')} {b.state.l})</span></span>
                <span>
                  <button type="button" className="btn small" onClick={() => setSt(b.state)}>{t('load')}</button>
                  <button type="button" className="btn small ghost" onClick={() => setSaved(saved.filter((x) => x.name !== b.name))}>{t('delete')}</button>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export function SkillDetail({ skill, level }: { skill: Skill; level: number }) {
  const { t } = useGame();
  const lv = Math.max(1, level);
  const cur = skill.levels[lv - 1] ?? skill.levels[0];
  const next = skill.levels[lv];
  return (
    <div className="skill-detail">
      <div className="detail-head">
        <SkillIcon icon={skill.icon} size={48} />
        <div>
          <div className="skill-name">{skill.name}</div>
          <div className="muted small">
            {skill.isStigma ? t('stigma') : t(skill.type)} · {t('acquireLevel')} {skill.acquireLevel} · {t('maxLevel')} {skill.maxLevel}
          </div>
          <div className="muted small">
            {t('cooldown')}: {fmtSec(cur?.cooldownSec ?? skill.cooldownSec)} · {t('castTime')}: {fmtSec(cur?.castTimeSec ?? skill.castTimeSec)}
          </div>
        </div>
      </div>
      <p className="desc"><b>{t('lv')} {lv}:</b> {richText(cur?.description ?? skill.description)}</p>
      {next && level > 0 && <p className="desc muted"><b>{t('lv')} {lv + 1}:</b> {richText(next.description)}</p>}
      {skill.parts && skill.parts.length > 0 && (
        <>
          <h3>{t('specialisations')}</h3>
          <ul className="parts">
            {skill.parts.map((p) => (
              <li key={p.id} className={level >= p.level ? 'on' : ''}>
                <SkillIcon icon={p.icon} size={28} />
                <span><span className="muted">{t('lv')} {p.level}:</span> {richText(p.desc)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {skill.chain && skill.chain.length > 0 && (
        <>
          <h3>{t('chainSkills')}</h3>
          <ul className="parts">
            {skill.chain.map((c) => (
              <li key={c.id}>
                <SkillIcon icon={c.icon} size={28} />
                <span>
                  <b>{c.name}</b> <span className="muted">({c.rate}% {t('chainRate')}, {c.time}s {t('chainTime')})</span>
                  <br />{richText(c.desc[Math.min(c.desc.length - 1, lv - 1)] ?? c.desc[0] ?? '')}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
