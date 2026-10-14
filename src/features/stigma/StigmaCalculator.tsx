import { useMemo, useState } from 'react';
import { Gem, Lock, Plus, Sparkles, X, Check } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Skill } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import type { StigmaSlot } from '../../state/build';
import { SkillTile, PlainIcon } from '../../components/SkillTile';
import { SkillDetail } from '../../components/SkillDetail';
import { Card, CdChip, LevelPips, Meter, PageHeader, Segmented } from '../../components/ui';
import { useToast } from '../../components/Toast';
import { maxStigmaLevel, stigmaShardStep, stigmaShardsTo } from '../../lib/skillCosts';
import { STIGMA_SLOT_LEVELS, STIGMA_SPEC_LEVELS } from '../../lib/stigmaRules';
import { buildCd, classSkills, shardBudget, shardsSpent, unlockedSlots } from '../../lib/buildCalc';
import { applyCdr, cdAt } from '../../lib/cooldown';
import { richText } from '../../lib/format';

type Sort = 'name' | 'cd';

export function StigmaCalculator() {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const toast = useToast();
  const { costs } = data;
  const [selected, setSelected] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>('cd');

  const stigmas = useMemo(() => {
    const list = classSkills(data, build).filter((s) => s.isStigma);
    return list.sort((a, b) => (sort === 'cd' ? buildCd(data, build, a) - buildCd(data, build, b) : 0) || a.name.localeCompare(b.name));
  }, [data, build, sort]);

  const open = unlockedSlots(build);
  const budget = shardBudget(data, build);
  const spent = shardsSpent(data, build);
  const equipped = new Set(build.st.map((s) => s.id).filter((x): x is number => x != null));

  const setSlot = (i: number, slot: StigmaSlot) => setBuild((b) => ({ ...b, st: b.st.map((s, j) => (j === i ? slot : s)) }));
  const equip = (s: Skill) => {
    if (equipped.has(s.id)) return;
    const free = build.st.findIndex((x, i) => x.id == null && open[i]);
    if (free < 0) { toast(t('noFreeSlot'), 'error'); return; }
    setSlot(free, { id: s.id, lv: 1 });
    setSelected(s.id);
  };

  const sel = (selected != null ? data.skillById.get(selected) : undefined) ?? stigmas[0];
  const selSlot = sel ? build.st.find((x) => x.id === sel.id) : undefined;

  return (
    <div className="page">
      <PageHeader icon={<Sparkles size={22} />} title={t('navStigma')} subtitle={t('homeStigmaText')} />

      <Card title={t('stigmaShards')} icon={<Gem size={16} />}>
        <div className="points-grid">
          <Meter label={`${t('stigmaShards')} (${t('fromLevel')} ${build.l}: ${budget.base})`} spent={spent} max={budget.total} />
          <label className="field-inline">
            <span className="eyebrow">{t('extraShards')}</span>
            <input type="number" min={0} value={build.se} onChange={(e) => setBuild({ se: Math.max(0, Math.round(Number(e.target.value)) || 0) })} />
          </label>
        </div>
        <p className="muted small">{t('stigmaBudgetHint')}</p>
      </Card>

      <section>
        <h2 className="section-title">{t('stigmaEquipped')}</h2>
        <div className="stigma-slots">
          {build.st.map((slot, i) => {
            const s = slot.id != null ? data.skillById.get(slot.id) : undefined;
            if (!open[i]) {
              return (
                <div key={i} className="stigma-slot locked">
                  <Lock size={22} />
                  <strong>{t('slot', { n: i + 1 })}</strong>
                  <span className="muted small">{t('slotLocked', { lvl: STIGMA_SLOT_LEVELS[i] })}</span>
                </div>
              );
            }
            if (!s) {
              return (
                <div key={i} className="stigma-slot empty">
                  <Plus size={22} />
                  <strong>{t('slot', { n: i + 1 })}</strong>
                  <select value="" onChange={(e) => { const id = Number(e.target.value); if (id) { setSlot(i, { id, lv: 1 }); setSelected(id); } }}>
                    <option value="">{t('chooseStigma')}</option>
                    {stigmas.filter((x) => !equipped.has(x.id)).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                  </select>
                </div>
              );
            }
            const max = maxStigmaLevel(costs, s.id);
            const base = cdAt(s, slot.lv);
            return (
              <div key={i} className={`stigma-slot filled ${sel?.id === s.id ? 'selected' : ''}`} onClick={() => setSelected(s.id)}>
                <div className="ss-top">
                  <span className="eyebrow">{t('slot', { n: i + 1 })}</span>
                  <button type="button" className="icon-btn sm" title={t('removeStigma')} aria-label={t('removeStigma')}
                    onClick={(e) => { e.stopPropagation(); setSlot(i, { id: null, lv: 1 }); }}><X size={14} /></button>
                </div>
                <div className="ss-main">
                  <SkillTile skill={s} level={slot.lv} size={60} showLevel />
                  <div>
                    <div className="ss-name">{s.name}</div>
                    <CdChip cd={applyCdr(base, build.cdr)} base={base} />
                  </div>
                </div>
                <div className="ss-level" onClick={(e) => e.stopPropagation()}>
                  <LevelPips value={slot.lv} max={max} bands={5} marks={[...STIGMA_SPEC_LEVELS]} onChange={(v) => setSlot(i, { ...slot, lv: v })} />
                  <div className="ss-cost">
                    <span>{t('shardsForLevel', { lvl: slot.lv })}: <b>{stigmaShardsTo(costs, s.id, slot.lv)}</b></span>
                    {slot.lv < max && <span className="muted">{t('nextLevel')}: +{stigmaShardStep(costs, s.id, slot.lv + 1)}</span>}
                  </div>
                </div>
                {s.parts && s.parts.length > 0 && (
                  <div className="ss-specs">
                    {s.parts.map((p) => (
                      <span key={p.id} className={`spec ${slot.lv >= p.level ? 'on' : ''}`} title={`${t('lv')} ${p.level}: ${p.desc}`}>
                        <PlainIcon icon={p.icon} size={22} />
                        <small>{p.level}</small>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="muted small">{t('stigmaNote')}</p>
      </section>

      <div className="split">
        <Card
          title={<>{t('stigmaList')} <span className="count">{stigmas.length}</span></>}
          extra={<Segmented<Sort> value={sort} onChange={setSort} options={[{ value: 'cd', label: t('sortCd') }, { value: 'name', label: t('sortName') }]} />}
        >
          <div className="card-grid">
            {stigmas.map((s) => {
              const isEq = equipped.has(s.id);
              const lv = build.st.find((x) => x.id === s.id)?.lv ?? 1;
              const base = cdAt(s, lv);
              return (
                <div key={s.id} className={`skill-card stigma ${sel?.id === s.id ? 'selected' : ''} ${isEq ? 'equipped' : ''}`} onClick={() => setSelected(s.id)}>
                  <SkillTile skill={s} level={lv} size={48} />
                  <div className="sc-body">
                    <div className="sc-name">{s.name}</div>
                    <div className="chips"><CdChip cd={applyCdr(base, build.cdr)} base={base} short /></div>
                    <div className="sc-desc">{richText(s.description)}</div>
                  </div>
                  <button
                    type="button"
                    className={`btn sm ${isEq ? 'ghost' : 'primary'}`}
                    disabled={isEq}
                    onClick={(e) => { e.stopPropagation(); equip(s); }}
                  >
                    {isEq ? <><Check size={14} /> {t('equipped')}</> : <><Plus size={14} /> {t('equip')}</>}
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <aside className="side sticky">
          <Card title={t('details')}>
            {sel ? (
              <>
                <SkillDetail skill={sel} level={selSlot?.lv ?? 1} />
                <h4>{t('cost')}</h4>
                <div className="table-wrap short">
                  <table className="table">
                    <thead><tr><th>{t('lv')}</th><th>{t('cost')}</th><th>{t('total')}</th><th>{t('cooldown')}</th></tr></thead>
                    <tbody>
                      {Array.from({ length: maxStigmaLevel(costs, sel.id) }, (_, i) => i + 1).map((lv) => (
                        <tr key={lv} className={selSlot && selSlot.lv >= lv ? 'on' : ''}>
                          <td>{lv}{STIGMA_SPEC_LEVELS.includes(lv as 5) ? ' ★' : ''}</td>
                          <td>{stigmaShardStep(costs, sel.id, lv)}</td>
                          <td>{stigmaShardsTo(costs, sel.id, lv)}</td>
                          <td>{applyCdr(cdAt(sel, lv), build.cdr)} s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : <p className="muted">{t('selectSkillHint')}</p>}
          </Card>
        </aside>
      </div>
    </div>
  );
}
