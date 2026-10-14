import { useMemo, useState } from 'react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { ClassType, Skill } from '../../data/types';
import { ClassPicker } from '../../components/ClassPicker';
import { SkillIcon } from '../../components/SkillIcon';
import { LevelStepper } from '../../components/LevelStepper';
import { PointBar } from '../../components/PointBar';
import { CopyLinkButton } from '../../components/CopyLinkButton';
import { maxStigmaLevel, pointsAtLevel, stigmaShardStep, stigmaShardsTo } from '../../lib/skillCosts';
import { STIGMA_SLOT_LEVELS, STIGMA_SLOTS } from '../../lib/stigmaRules';
import { decodeState, readHash } from '../../lib/shareLink';
import { usePersistedState } from '../../lib/usePersistedState';
import { richText, fmtSec } from '../../lib/format';
import { SkillDetail } from '../skills/SkillCalculator';

interface Slot { id: number | null; lv: number }
interface StigmaState { c: ClassType; l: number; e: number; slots: Slot[] }

const DEFAULT: StigmaState = {
  c: 'Gladiator', l: 45, e: 0,
  slots: Array.from({ length: STIGMA_SLOTS }, () => ({ id: null, lv: 1 })),
};

export function StigmaCalculator() {
  const { data, t } = useLoadedGame();
  const shared = useMemo(() => decodeState<StigmaState>(readHash().params.get('s')), []);
  const [st, setSt] = usePersistedState<StigmaState>('stigmaCalc', DEFAULT, shared);
  const [selected, setSelected] = useState<number | null>(null);

  const { costs, points } = data;

  const stigmas = useMemo(
    () => data.skills.filter((s) => s.classType === st.c && s.isStigma).sort((a, b) => a.id - b.id),
    [data, st.c],
  );

  const update = (patch: Partial<StigmaState>) => setSt((p) => ({ ...p, ...patch }));
  const setSlot = (i: number, slot: Slot) => setSt((p) => ({ ...p, slots: p.slots.map((s, j) => (j === i ? slot : s)) }));
  const changeClass = (c: ClassType) => { update({ c, slots: DEFAULT.slots }); setSelected(null); };

  const unlocked = STIGMA_SLOT_LEVELS.map((lvl) => st.l >= lvl);
  const slotCost = (s: Slot, i: number) => (s.id != null && unlocked[i] ? stigmaShardsTo(costs, s.id, s.lv) : 0);
  const spent = st.slots.reduce((sum, s, i) => sum + slotCost(s, i), 0);
  const base = pointsAtLevel(points, st.l).stigma;
  const budget = base + (Number(st.e) || 0);
  const equippedIds = new Set(st.slots.map((s) => s.id).filter((x): x is number => x != null));

  const sel = selected != null ? data.skillById.get(selected) ?? null : null;
  const selSlot = st.slots.find((s) => s.id === selected);

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
            <span>{t('extraManual')}</span>
            <input type="number" min={0} value={st.e} onChange={(e) => update({ e: Math.max(0, Number(e.target.value) || 0) })} />
          </label>
          <div className="actions">
            <CopyLinkButton route="/stigma" state={st} />
            <button type="button" className="btn ghost" onClick={() => update({ slots: DEFAULT.slots })}>{t('reset')}</button>
          </div>
        </div>
        <PointBar label={t('stigmaShards')} spent={spent} max={budget} hint={`${t('fromLevel')} ${st.l}: ${base}`} />
        <p className="muted small">{t('stigmaBudgetHint')}</p>
      </section>

      <div className="columns">
        <section className="panel">
          <h2>{t('stigmaEquipped')}</h2>
          <div className="stigma-slots">
            {st.slots.map((slot, i) => {
              const s = slot.id != null ? data.skillById.get(slot.id) : undefined;
              const max = s ? maxStigmaLevel(costs, s.id) : 20;
              const open = unlocked[i];
              return (
                <div key={i} className={`stigma-slot ${open ? '' : 'locked'} ${s && selected === s.id ? 'selected' : ''}`}>
                  <div className="slot-head">
                    <strong>{open ? t('slot', { n: i + 1 }) : t('slotLocked', { n: i + 1, lvl: STIGMA_SLOT_LEVELS[i] })}</strong>
                    {s && <button type="button" className="btn small ghost" onClick={() => setSlot(i, { id: null, lv: 1 })}>{t('removeStigma')}</button>}
                  </div>
                  {s ? (
                    <div className="slot-body" onClick={() => setSelected(s.id)}>
                      <SkillIcon icon={s.icon} size={48} />
                      <div className="skill-meta">
                        <div className="skill-name">{s.name}</div>
                        <div className="muted small">
                          {t('shardsForLevel', { lvl: slot.lv })}: <b>{stigmaShardsTo(costs, s.id, slot.lv)}</b>
                          {slot.lv < max ? ` · ${t('nextLevel')}: +${stigmaShardStep(costs, s.id, slot.lv + 1)}` : ''}
                          {s.cooldownSec ? ` · ${t('cooldown')} ${fmtSec(s.levels[slot.lv - 1]?.cooldownSec ?? s.cooldownSec)}` : ''}
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <LevelStepper value={slot.lv} min={1} max={max} disabled={!open} onChange={(v) => setSlot(i, { ...slot, lv: v })} label={s.name} />
                      </div>
                    </div>
                  ) : (
                    <select
                      className="stigma-select"
                      disabled={!open}
                      value=""
                      onChange={(e) => { const id = Number(e.target.value); if (id) setSlot(i, { id, lv: 1 }); }}
                    >
                      <option value="">{t('chooseStigma')}</option>
                      {stigmas.filter((x) => !equippedIds.has(x.id)).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                    </select>
                  )}
                </div>
              );
            })}
          </div>
          <p className="muted small">{t('stigmaNote')}</p>

          <h2>{t('stigma')} <span className="muted">({stigmas.length} {t('perClass')})</span></h2>
          <div className="db-grid compact">
            {stigmas.map((s) => (
              <StigmaCard
                key={s.id}
                skill={s}
                equipped={equippedIds.has(s.id)}
                selected={selected === s.id}
                onSelect={() => setSelected(s.id)}
                onEquip={() => {
                  const free = st.slots.findIndex((x, i) => x.id == null && unlocked[i]);
                  if (free >= 0 && !equippedIds.has(s.id)) setSlot(free, { id: s.id, lv: 1 });
                }}
              />
            ))}
          </div>
        </section>

        <aside className="panel side sticky">
          <h2>{t('details')}</h2>
          {sel ? <SkillDetail skill={sel} level={selSlot?.lv ?? 0} /> : <p className="muted small">{t('selectSkillHint')}</p>}
          {sel && (
            <>
              <h3>{t('cost')}</h3>
              <div className="table-wrap">
                <table className="level-table">
                  <thead><tr><th>{t('lv')}</th><th>{t('cost')}</th><th>{t('total')}</th></tr></thead>
                  <tbody>
                    {Array.from({ length: maxStigmaLevel(costs, sel.id) }, (_, i) => i + 1).map((lv) => (
                      <tr key={lv} className={selSlot && selSlot.lv >= lv ? 'on' : ''}>
                        <td>{lv}</td>
                        <td>{stigmaShardStep(costs, sel.id, lv)}</td>
                        <td>{stigmaShardsTo(costs, sel.id, lv)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function StigmaCard({ skill, equipped, selected, onSelect, onEquip }: { skill: Skill; equipped: boolean; selected: boolean; onSelect: () => void; onEquip: () => void }) {
  return (
    <div
      className={`db-card stigma ${selected ? 'selected' : ''} ${equipped ? 'equipped' : ''}`}
      onClick={onSelect}
      onDoubleClick={onEquip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onEquip(); }}
    >
      <SkillIcon icon={skill.icon} size={44} />
      <div className="db-card-body">
        <div className="skill-name">{skill.name}</div>
        <div className="small desc-clamp">{richText(skill.description)}</div>
      </div>
    </div>
  );
}
