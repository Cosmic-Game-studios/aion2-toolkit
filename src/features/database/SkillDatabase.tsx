import { useMemo, useState } from 'react';
import { useGame, useLoadedGame } from '../../data/GameDataContext';
import type { ClassType, Skill } from '../../data/types';
import { SkillIcon } from '../../components/SkillIcon';
import { richText, fmtSec } from '../../lib/format';
import { usePersistedState } from '../../lib/usePersistedState';

type TypeFilter = 'all' | 'active' | 'passive' | 'stigma';

export function SkillDatabase() {
  const { data, t } = useLoadedGame();
  const [cls, setCls] = usePersistedState<ClassType | 'all'>('dbClass', 'all');
  const [type, setType] = useState<TypeFilter>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'level' | 'name'>('level');
  const [selected, setSelected] = useState<number | null>(null);


  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.skills
      .filter((s) => cls === 'all' || s.classType === cls)
      .filter((s) => type === 'all' || (type === 'stigma' ? s.isStigma : !s.isStigma && s.type === type))
      .filter((s) => !needle || s.name.toLowerCase().includes(needle) || s.description.toLowerCase().includes(needle))
      .sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : a.classType.localeCompare(b.classType) || Number(a.isStigma) - Number(b.isStigma) || a.acquireLevel - b.acquireLevel || a.id - b.id));
  }, [data, cls, type, q, sort]);

  const sel = selected != null ? data.skillById.get(selected) ?? null : null;
  const className = (c: ClassType) => data.classes.find((x) => x.classType === c)?.name ?? c;

  return (
    <div className="page">
      <section className="panel controls">
        <div className="controls-row">
          <label className="field">
            <span>{t('class')}</span>
            <select value={cls} onChange={(e) => setCls(e.target.value as ClassType | 'all')}>
              <option value="all">{t('all')}</option>
              {data.classes.map((c) => <option key={c.classType} value={c.classType}>{c.name}</option>)}
            </select>
          </label>
          <label className="field">
            <span>{t('type')}</span>
            <select value={type} onChange={(e) => setType(e.target.value as TypeFilter)}>
              <option value="all">{t('all')}</option>
              <option value="active">{t('active')}</option>
              <option value="passive">{t('passive')}</option>
              <option value="stigma">{t('stigma')}</option>
            </select>
          </label>
          <label className="field grow">
            <span>{t('search')}</span>
            <input type="search" value={q} placeholder={t('search')} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label className="field">
            <span>&nbsp;</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as 'level' | 'name')}>
              <option value="level">{t('sortLevel')}</option>
              <option value="name">{t('sortName')}</option>
            </select>
          </label>
        </div>
        <p className="muted small">{t('showing', { n: list.length })}</p>
      </section>

      <div className="columns">
        <section className="panel">
          {list.length === 0 && <p className="muted">{t('noResults')}</p>}
          <div className="db-grid">
            {list.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`db-card ${selected === s.id ? 'selected' : ''} ${s.isStigma ? 'stigma' : s.type}`}
                onClick={() => setSelected(s.id)}
              >
                <SkillIcon icon={s.icon} size={48} />
                <div className="db-card-body">
                  <div className="skill-name">{s.name}</div>
                  <div className="muted small">
                    {className(s.classType)} · {s.isStigma ? t('stigma') : t(s.type)} · {t('lv')} {s.acquireLevel}
                  </div>
                  <div className="small desc-clamp">{richText(s.description)}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
        <aside className="panel side sticky">
          {sel ? <DatabaseDetail skill={sel} className={className(sel.classType)} /> : <p className="muted small">{t('selectSkillHint')}</p>}
        </aside>
      </div>
    </div>
  );
}

function DatabaseDetail({ skill, className }: { skill: Skill; className: string }) {
  const { t } = useGame();
  return (
    <div className="skill-detail">
      <div className="detail-head">
        <SkillIcon icon={skill.icon} size={56} />
        <div>
          <div className="skill-name big">{skill.name}</div>
          <div className="muted small">{className} · {skill.isStigma ? t('stigma') : t(skill.type)}</div>
          <div className="muted small">{t('acquireLevel')} {skill.acquireLevel} · {t('maxLevel')} {skill.maxLevel}</div>
          <div className="muted small">{t('cooldown')}: {fmtSec(skill.cooldownSec)} · {t('castTime')}: {fmtSec(skill.castTimeSec)}</div>
        </div>
      </div>
      <p className="desc">{richText(skill.description)}</p>

      {skill.parts && skill.parts.length > 0 && (
        <>
          <h3>{t('specialisations')}</h3>
          <ul className="parts">
            {skill.parts.map((p) => (
              <li key={p.id}>
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
                <span><b>{c.name}</b> <span className="muted">({c.rate}% {t('chainRate')}, {c.time}s {t('chainTime')})</span><br />{richText(c.desc[0] ?? '')}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <h3>{t('perLevel')}</h3>
      <div className="table-wrap">
        <table className="level-table">
          <thead>
            <tr><th>{t('lv')}</th><th>{t('description')}</th><th>{t('cooldown')}</th></tr>
          </thead>
          <tbody>
            {skill.levels.map((l) => (
              <tr key={l.level}>
                <td>{l.level}</td>
                <td>{richText(l.description)}</td>
                <td>{fmtSec(l.cooldownSec)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
