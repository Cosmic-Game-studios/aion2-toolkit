import { useMemo, useRef, useState } from 'react';
import { BookOpen, Search, Timer, X } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { ClassType, Skill } from '../../data/types';
import { SkillTile } from '../../components/SkillTile';
import { SkillDetail } from '../../components/SkillDetail';
import { ClassEmblem } from '../../components/ClassSelect';
import { Card, CdChip, EmptyState, PageHeader, Segmented } from '../../components/ui';
import { richText } from '../../lib/format';
import { cdAt, fmtCdShort } from '../../lib/cooldown';

type TypeFilter = 'all' | 'active' | 'passive' | 'stigma';
type Sort = 'level' | 'name' | 'cd';

const typeOf = (s: Skill): Exclude<TypeFilter, 'all'> => (s.isStigma ? 'stigma' : s.type);

export function SkillDatabase() {
  const { data, t } = useLoadedGame();
  const [cls, setCls] = useState<ClassType | 'all'>('all');
  const [type, setType] = useState<TypeFilter>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<Sort>('level');
  const [onlyCd, setOnlyCd] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [lv, setLv] = useState(1);
  const detailRef = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.skills
      .filter((s) => cls === 'all' || s.classType === cls)
      .filter((s) => type === 'all' || typeOf(s) === type)
      .filter((s) => !onlyCd || s.cooldownSec > 0)
      .filter((s) => !needle || s.name.toLowerCase().includes(needle) || s.description.toLowerCase().includes(needle))
      .sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name);
        if (sort === 'cd') return b.cooldownSec - a.cooldownSec || a.name.localeCompare(b.name);
        return a.classType.localeCompare(b.classType) || Number(a.isStigma) - Number(b.isStigma) || a.acquireLevel - b.acquireLevel || a.id - b.id;
      });
  }, [data, cls, type, q, sort, onlyCd]);

  const sel = selected != null ? data.skillById.get(selected) ?? null : null;
  const className = (c: ClassType) => data.classes.find((x) => x.classType === c)?.name ?? c;

  const pick = (s: Skill) => {
    setSelected(s.id);
    setLv(1);
    if (window.matchMedia('(max-width: 980px)').matches) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  return (
    <div className="page">
      <PageHeader icon={<BookOpen size={22} />} title={t('navDatabase')} subtitle={t('homeDatabaseText')} />

      <Card className="filters">
        <div className="class-chips" role="radiogroup" aria-label={t('class')}>
          <button type="button" role="radio" aria-checked={cls === 'all'} className={`class-chip ${cls === 'all' ? 'on' : ''}`} onClick={() => setCls('all')}>
            {t('allClasses')}
          </button>
          {data.classes.map((c) => (
            <button key={c.classType} type="button" role="radio" aria-checked={cls === c.classType}
              className={`class-chip ${cls === c.classType ? 'on' : ''}`} onClick={() => setCls(c.classType)}>
              <ClassEmblem cls={c.classType} size={20} /> {c.name}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="search-field">
            <Search size={16} />
            <input type="search" value={q} placeholder={t('search')} onChange={(e) => setQ(e.target.value)} aria-label={t('search')} />
            {q && <button type="button" className="icon-btn sm" onClick={() => setQ('')} aria-label={t('clear')}><X size={14} /></button>}
          </label>
          <Segmented<TypeFilter>
            value={type}
            onChange={setType}
            label={t('type')}
            options={[
              { value: 'all', label: t('all') },
              { value: 'active', label: t('active') },
              { value: 'passive', label: t('passive') },
              { value: 'stigma', label: t('stigma') },
            ]}
          />
          <Segmented<Sort>
            value={sort}
            onChange={setSort}
            label={t('sortBy')}
            options={[
              { value: 'level', label: t('sortLevel') },
              { value: 'name', label: t('sortName') },
              { value: 'cd', label: t('sortCd') },
            ]}
          />
          <label className="toggle">
            <input type="checkbox" checked={onlyCd} onChange={(e) => setOnlyCd(e.target.checked)} />
            <span className="toggle-ui" />
            <Timer size={14} /> {t('onlyWithCd')}
          </label>
          <span className="muted small push">{t('showing', { n: list.length })}</span>
        </div>
      </Card>

      <div className="split">
        <div>
          {list.length === 0 ? <Card><EmptyState icon={<Search size={28} />} text={t('noResults')} /></Card> : (
            <div className="card-grid db">
              {list.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`skill-card ${typeOf(s)} ${selected === s.id ? 'selected' : ''}`}
                  onClick={() => pick(s)}
                >
                  <SkillTile skill={s} size={52} tip={false} />
                  <div className="sc-body">
                    <div className="sc-name">{s.name}</div>
                    <div className="sc-meta">
                      <ClassEmblem cls={s.classType} size={14} /> {className(s.classType)}
                      <span className={`type-tag ${typeOf(s)}`}>{t(typeOf(s))}</span>
                      <span>{t('lv')} {s.acquireLevel}</span>
                    </div>
                    <div className="chips">
                      <CdChip cd={s.cooldownSec} short />
                      {s.castTimeSec > 0 && <span className="chip subtle">{t('castTime')} {s.castTimeSec}s</span>}
                    </div>
                    <div className="sc-desc">{richText(s.description)}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="side sticky" ref={detailRef}>
          <Card title={t('details')}>
            {sel ? (
              <>
                <div className="db-class-line">
                  <ClassEmblem cls={sel.classType} size={18} /> {className(sel.classType)} · {t('acquireLevel')} {sel.acquireLevel} · {t('maxLevel')} {sel.maxLevel}
                </div>
                {sel.levels.length > 1 && (
                  <label className="range-field">
                    <span>{t('level')} <b>{lv}</b></span>
                    <input type="range" min={1} max={sel.levels.length} value={lv} onChange={(e) => setLv(Number(e.target.value))} />
                  </label>
                )}
                <SkillDetail skill={sel} level={lv} cdr={0} />
                <h4>{t('perLevel')}</h4>
                <div className="table-wrap">
                  <table className="table level-table">
                    <thead>
                      <tr><th>{t('lv')}</th><th>{t('cooldown')}</th><th>{t('description')}</th></tr>
                    </thead>
                    <tbody>
                      {sel.levels.map((l) => (
                        <tr key={l.level} className={l.level === lv ? 'on' : ''} onClick={() => setLv(l.level)}>
                          <td>{l.level}</td>
                          <td className="nowrap">{cdAt(sel, l.level) > 0 ? fmtCdShort(cdAt(sel, l.level)) : '–'}</td>
                          <td>{richText(l.description)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : <EmptyState icon={<BookOpen size={28} />} text={t('selectSkillHint')} />}
          </Card>
        </aside>
      </div>
    </div>
  );
}
