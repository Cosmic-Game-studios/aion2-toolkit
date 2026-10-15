import { useEffect, useMemo, useState } from 'react';
import { ArrowRightLeft, Check, Gem, Info, Lock, Minus, Plus, Sparkles, TriangleAlert, X } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Skill } from '../../data/types';
import { useBuild } from '../../state/BuildContext';
import type { StigmaSlot } from '../../state/build';
import { SkillTile, PlainIcon } from '../../components/SkillTile';
import { CdChip, EmptyState, NumberField, PageHeader, Segmented } from '../../components/ui';
import { Modal } from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { MQ, useMediaQuery } from '../../components/hooks';
import { maxStigmaLevel, stigmaShardStep, stigmaShardsTo } from '../../lib/skillCosts';
import { STIGMA_SLOT_LEVELS, STIGMA_SPEC_LEVELS } from '../../lib/stigmaRules';
import { buildCd, classSkills, shardBudget, shardsSpent, unlockedSlots } from '../../lib/buildCalc';
import { applyCdr, cdAt, fmtCdShort } from '../../lib/cooldown';
import { richText } from '../../lib/format';
import { BudgetCard } from '../skills/BudgetCard';
import { LevelBar } from '../skills/LevelBar';
import { StigmaPanel, type StigmaTab } from './StigmaPanel';

type Sort = 'name' | 'cd';

/** Stigma shards: summary line; level budget, correction and the rules behind "Shard sources". */
function ShardsCard() {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const budget = shardBudget(data, build);
  return (
    <BudgetCard
      label={t('stigmaShards')}
      icon={<Gem size={14} aria-hidden />}
      spent={shardsSpent(data, build)}
      max={budget.total}
      toggleLabel={t('shardSources')}
      added={budget.manual}
      storageKey="stigma:sourcesOpen"
    >
      <p className="pc-sum">
        {t('shardsBreakdown', { lvl: build.l, base: budget.base, manual: budget.manual > 0 ? `+${budget.manual}` : budget.manual })}
        {' = '}<b>{budget.total}</b>
      </p>
      <div className="pc-fields">
        <label className="field-block">
          <span>{t('extraShards')}</span>
          <NumberField value={build.se} min={-999} max={999} onChange={(se) => setBuild({ se })} className="pc-number" />
        </label>
      </div>
      <p className="field-hint">{t('stigmaBudgetHint')}</p>
      <p className="field-hint">{t('stigmaNote')}</p>
    </BudgetCard>
  );
}

const plain = (s: string) => s.replace(/\*\*/g, '');

export function StigmaCalculator({ param, visit }: { param?: string | null; visit?: number }) {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const toast = useToast();
  const narrow = useMediaQuery(MQ.narrow);
  const { costs } = data;
  const [selected, setSelected] = useState<number | null>(null);
  const [sheet, setSheet] = useState(false);
  const [tab, setTab] = useState<StigmaTab>('effect');
  const [sort, setSort] = useState<Sort>('cd');

  const stigmas = useMemo(() => {
    const list = classSkills(data, build).filter((s) => s.isStigma);
    return list.sort((a, b) => (sort === 'cd' ? buildCd(data, build, a) - buildCd(data, build, b) : 0) || a.name.localeCompare(b.name));
  }, [data, build, sort]);

  const open = unlockedSlots(build);
  const openCount = open.filter(Boolean).length;
  const budget = shardBudget(data, build);
  const left = budget.total - shardsSpent(data, build);
  const slotOf = (id: number) => build.st.findIndex((x) => x.id === id);
  const freeIdx = build.st.findIndex((x, i) => x.id == null && open[i]);
  const usedOpen = build.st.filter((x, i) => x.id != null && open[i]).length;
  const firstSlotLvl = STIGMA_SLOT_LEVELS[0];

  // only stigmas of the current class (after a class switch the old selection must not stay in the panel)
  const sel = stigmas.find((s) => s.id === selected) ?? (narrow ? undefined : stigmas[0]);

  const showDetail = (s: Skill) => {
    setSelected(s.id);
    if (narrow) setSheet(true);
  };

  /** Into the given slot or the first free open one; a stigma from a locked slot moves and keeps its level. */
  const equip = (s: Skill, target?: number) => {
    const cur = slotOf(s.id);
    if (cur >= 0 && open[cur] && target == null) return;
    const to = target ?? freeIdx;
    if (to < 0) {
      toast(openCount ? t('slotsFullHint') : t('noSlotYet', { lvl: firstSlotLvl }), 'warn');
      return;
    }
    const lv = cur >= 0 ? build.st[cur].lv : 1;
    setBuild((b) => ({ ...b, st: b.st.map((x, j) => (j === to ? { id: s.id, lv } : j === cur ? { id: null, lv: 1 } : x)) }));
    setSelected(s.id);
    toast(t(cur >= 0 ? 'movedToSlot' : 'equippedInSlot', { name: s.name, n: to + 1 }));
  };

  /** Empties a slot; the toast offers Undo (level included). */
  const removeAt = (i: number) => {
    const prev: StigmaSlot = build.st[i];
    if (prev.id == null) return;
    const name = data.skillById.get(prev.id)?.name ?? '';
    setBuild((b) => ({ ...b, st: b.st.map((x, j) => (j === i ? { id: null, lv: 1 } : x)) }));
    toast(t('removedFromSlot', { name, n: i + 1 }), 'ok', {
      action: {
        label: t('undo'),
        onClick: () => setBuild((b) => {
          // keep what the player did in the meantime: only restore into the still empty slot
          if (b.st.some((x) => x.id === prev.id) || b.st[i].id != null) return b;
          return { ...b, st: b.st.map((x, j) => (j === i ? prev : x)) };
        }),
      },
    });
  };

  // a sheet opened on a narrow screen must not pop up again after the window was wide in between (tablet rotation)
  useEffect(() => { if (!narrow) setSheet(false); }, [narrow]);

  const setLevelAt = (i: number, lv: number) => setBuild((b) => ({
    ...b,
    st: b.st.map((x, j) => (j === i && x.id != null ? { ...x, lv: Math.max(1, Math.min(maxStigmaLevel(costs, x.id), lv)) } : x)),
  }));

  // deep link: #/stigma/<skillId> selects the stigma (and opens the sheet on narrow screens), again on every visit of the link
  useEffect(() => {
    const id = Number(param);
    if (!param || !Number.isFinite(id)) return;
    const s = data.skillById.get(id);
    if (!s || !s.isStigma || s.classType !== build.c) return;
    setSelected(id);
    if (narrow) setSheet(true);
    else requestAnimationFrame(() => document.getElementById(`stigma-card-${id}`)?.scrollIntoView({ block: 'center' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, visit]);

  const selectProps = (s: Skill) => ({
    onClick: () => showDetail(s),
    'aria-pressed': narrow ? undefined : sel?.id === s.id,
    'aria-haspopup': narrow ? ('dialog' as const) : undefined,
  });

  const renderSlot = (slot: StigmaSlot, i: number) => {
    const s = slot.id != null ? data.skillById.get(slot.id) : undefined;
    const lockLvl = STIGMA_SLOT_LEVELS[i];
    const title = <span className="ss-slot">{t('slot', { n: i + 1 })}</span>;

    if (!s && !open[i]) {
      return (
        <article key={i} className="stigma-slot locked" aria-label={t('slot', { n: i + 1 })}>
          <div className="ss-top">{title}</div>
          <p className="ss-locked"><Lock size={16} aria-hidden /> {t('slotLocked', { lvl: lockLvl })}</p>
        </article>
      );
    }

    if (!s) {
      const options = stigmas.filter((x) => { const j = slotOf(x.id); return j < 0 || !open[j]; });
      return (
        <article key={i} className="stigma-slot empty" aria-label={t('slot', { n: i + 1 })}>
          <div className="ss-top">{title}<span className="chip subtle">{t('slotEmpty')}</span></div>
          <select
            id={`stigma-choose-${i}`}
            className="ss-choose"
            value=""
            aria-label={t('chooseStigmaFor', { n: i + 1 })}
            onChange={(e) => {
              const x = data.skillById.get(Number(e.target.value));
              if (!x) return;
              equip(x, i);
              // the select is replaced by the filled slot: keep the focus in this slot
              requestAnimationFrame(() => document.getElementById(`stigma-slot-main-${i}`)?.focus({ preventScroll: true }));
            }}
          >
            <option value="">{t('chooseStigma')}</option>
            {options.map((x) => {
              const j = slotOf(x.id);
              const cd = buildCd(data, build, x);
              return (
                <option key={x.id} value={x.id}>
                  {x.name}{cd > 0 ? ` · ${fmtCdShort(cd)}` : ''}{j >= 0 ? ` ${t('fromLockedSlot', { n: j + 1 })}` : ''}
                </option>
              );
            })}
          </select>
          <p className="field-hint">{t('slotEmptyHint')}</p>
        </article>
      );
    }

    const isSel = sel?.id === s.id;

    if (!open[i]) {
      return (
        <article key={i} className={`stigma-slot locked has-stigma ${isSel ? 'selected' : ''}`} aria-label={t('slot', { n: i + 1 })}>
          <div className="ss-top">{title}<span className="chip warn"><Lock size={12} aria-hidden /> {t('slotLocked', { lvl: lockLvl })}</span></div>
          <button type="button" className="ss-main" {...selectProps(s)}>
            <SkillTile skill={s} level={slot.lv} size={44} showLevel dim />
            <span className="ss-text">
              <span className="ss-name">{s.name}</span>
              <span className="ss-inactive">{t('slotInactive', { lvl: lockLvl })}</span>
            </span>
          </button>
          <div className="ss-actions">
            {freeIdx >= 0 && <button type="button" className="btn sm" onClick={() => equip(s)}><ArrowRightLeft size={14} aria-hidden /> {t('moveToFreeSlot')}</button>}
            <button type="button" className="btn ghost sm" onClick={() => removeAt(i)}><X size={14} aria-hidden /> {t('removeStigma')}</button>
          </div>
        </article>
      );
    }

    const max = maxStigmaLevel(costs, s.id);
    const base = cdAt(s, slot.lv);
    return (
      <article key={i} className={`stigma-slot filled ${isSel ? 'selected' : ''}`} aria-label={t('slot', { n: i + 1 })}>
        <div className="ss-top">
          {title}
          <button
            type="button"
            className="icon-btn sm ss-remove"
            aria-label={t('removeNamed', { name: s.name })}
            title={t('removeStigma')}
            onClick={(e) => {
              const keyboard = e.currentTarget.matches(':focus-visible');
              removeAt(i);
              // keyboard users continue in the now empty slot (its select) instead of at the top of the page
              if (keyboard) requestAnimationFrame(() => document.getElementById(`stigma-choose-${i}`)?.focus());
            }}
          >
            <X size={16} aria-hidden />
          </button>
        </div>
        <button type="button" id={`stigma-slot-main-${i}`} className="ss-main" {...selectProps(s)}>
          <SkillTile skill={s} level={slot.lv} size={52} showLevel />
          <span className="ss-text">
            <span className="ss-name">{s.name}</span>
            <span className="ss-meta">
              <CdChip cd={applyCdr(base, build.cdr)} base={base} short />
              <span className="ss-lv">{t('lv')} {slot.lv} / {max}</span>
            </span>
          </span>
        </button>
        <div className="ss-level">
          <button type="button" className="icon-btn sm" disabled={slot.lv <= 1} onClick={() => setLevelAt(i, slot.lv - 1)} aria-label={`${t('levelDown')}: ${s.name}`}>
            <Minus size={15} aria-hidden />
          </button>
          <LevelBar
            value={slot.lv}
            max={max}
            bands={5}
            marks={STIGMA_SPEC_LEVELS}
            onChange={(v) => setLevelAt(i, v)}
            label={t('levelOf', { name: s.name })}
            valueText={t('levelValueText', { n: slot.lv, max })}
            pipTitle={(v) => t('pipTitleShards', { lvl: v, n: stigmaShardsTo(costs, s.id, v) })}
          />
          <button type="button" className="icon-btn sm" disabled={slot.lv >= max} onClick={() => setLevelAt(i, slot.lv + 1)} aria-label={`${t('levelUp')}: ${s.name}`}>
            <Plus size={15} aria-hidden />
          </button>
        </div>
        <div className="ss-cost">
          <span>{t('shardsForLevel', { lvl: slot.lv })}: <b>{stigmaShardsTo(costs, s.id, slot.lv)}</b></span>
          <span className="muted">{slot.lv < max ? `${t('nextLevel')}: +${stigmaShardStep(costs, s.id, slot.lv + 1)}` : t('levelMaxed')}</span>
        </div>
        {s.parts && s.parts.length > 0 && (
          <ul className="ss-specs" aria-label={t('specialisations')}>
            {s.parts.map((p) => {
              const on = slot.lv >= p.level;
              return (
                <li key={p.id} className={on ? 'on' : ''} title={`${t('lv')} ${p.level}: ${plain(p.desc)}`}>
                  <PlainIcon icon={p.icon} size={20} />
                  {on ? <Check size={12} aria-hidden /> : <Lock size={12} aria-hidden />}
                  <span>{t('lv')} {p.level}</span>
                  <span className="sr-only"> – {on ? t('specActive') : t('specLocked', { lvl: p.level })}</span>
                </li>
              );
            })}
          </ul>
        )}
      </article>
    );
  };

  const renderCard = (s: Skill) => {
    const j = slotOf(s.id);
    const inOpen = j >= 0 && open[j];
    const lv = j >= 0 ? build.st[j].lv : 1;
    const base = cdAt(s, lv);
    const isSel = sel?.id === s.id;
    return (
      <div key={s.id} id={`stigma-card-${s.id}`} className={`skill-card stigma ${isSel ? 'selected' : ''} ${inOpen ? 'equipped' : ''}`}>
        <button type="button" className="sc-select" {...selectProps(s)}>
          <SkillTile skill={s} level={lv} size={48} />
          <span className="sc-body">
            <span className="sc-name">{s.name}</span>
            <span className="chips"><CdChip cd={applyCdr(base, build.cdr)} base={base} short /></span>
            <span className="sc-desc">{richText(s.description)}</span>
          </span>
        </button>
        {/* one button element in a fixed place: Equip -> Remove keeps the keyboard focus on it */}
        <div className="sc-action">
          {inOpen && <span className="chip slot-chip"><Check size={13} aria-hidden /> {t('slot', { n: j + 1 })}</span>}
          {!inOpen && j >= 0 && <span className="chip warn"><Lock size={12} aria-hidden /> {t('inLockedSlot', { n: j + 1 })}</span>}
          {inOpen ? (
            <button type="button" className="btn ghost sm" onClick={() => removeAt(j)}><X size={14} aria-hidden /> {t('removeStigma')}</button>
          ) : freeIdx >= 0 ? (
            <button type="button" className={`btn sm ${j >= 0 ? '' : 'sc-equip'}`} onClick={() => equip(s)}>
              {j >= 0 ? <><ArrowRightLeft size={14} aria-hidden /> {t('moveToFreeSlot')}</> : <><Plus size={14} aria-hidden /> {t('equip')}</>}
            </button>
          ) : j < 0 && (
            <button type="button" className="btn sm" disabled>{openCount ? t('slotsFull') : t('slotLocked', { lvl: firstSlotLvl })}</button>
          )}
        </div>
      </div>
    );
  };

  const panel = (inSheet: boolean) => sel && (
    <StigmaPanel skill={sel} tab={tab} onTab={setTab} inSheet={inSheet} onEquip={(s) => equip(s)} onRemove={removeAt} onLevel={setLevelAt} />
  );

  return (
    <div className="page stigma-page">
      <PageHeader
        icon={<Sparkles size={22} />}
        title={t('navStigma')}
        subtitle={t('homeStigmaText')}
        guide={{ id: 'stigma', steps: [t('guideStigma1'), t('guideStigma2'), t('guideStigma3')] }}
      />

      <ShardsCard />

      <section className="stigma-loadout" aria-labelledby="stigma-loadout-title">
        <div className="loadout-head">
          <h2 className="section-title" id="stigma-loadout-title">{t('stigmaEquipped')}</h2>
          <span className="chip">{t('slotsUsed', { n: usedOpen, m: openCount })}</span>
          <span className={`chip budget-chip ${left < 0 ? 'over' : ''}`}>
            {left < 0 ? <TriangleAlert size={13} aria-hidden /> : <Gem size={13} aria-hidden />}
            {left < 0 ? t('shardsOver', { n: -left }) : t('shardsLeft', { n: left })}
          </span>
        </div>
        <div className="stigma-slots">{build.st.map(renderSlot)}</div>
      </section>

      <div className="split">
        <section className="card list-card stigma-list" aria-labelledby="stigma-list-title">
          <header className="card-head">
            <h2 id="stigma-list-title">{t('stigmaList')} <span className="count">{stigmas.length}</span></h2>
            <div className="card-extra">
              <Segmented<Sort> label={t('sortBy')} value={sort} onChange={setSort} options={[{ value: 'cd', label: t('sortCd') }, { value: 'name', label: t('sortName') }]} />
            </div>
          </header>
          {freeIdx < 0 && (
            <p className="list-note"><Info size={14} aria-hidden /> {openCount ? t('slotsFullHint') : t('noSlotYet', { lvl: firstSlotLvl })}</p>
          )}
          <div className="card-grid">{stigmas.map(renderCard)}</div>
        </section>

        {!narrow && (
          <aside className="side sticky stigma-aside">
            <section className="card" aria-label={t('details')}>
              {sel ? panel(false) : <EmptyState icon={<Sparkles size={28} />} text={t('selectSkillHint')} />}
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
