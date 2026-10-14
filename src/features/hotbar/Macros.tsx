import { useState } from 'react';
import { ArrowDown, ArrowUp, Info, Keyboard, Plus, ScrollText, Trash2, TriangleAlert, X, Columns3 } from 'lucide-react';
import type { GameData } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import {
  BAR_COLS, BAR_ROWS, DEFAULT_DELAY, MAX_DELAY, MAX_MACROS, MAX_MACRO_STEPS, newMacroId, slotKey,
  type Build, type Macro, type MacroStep,
} from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { CdChip, EmptyState } from '../../components/ui';
import { buildCd, skillLevel, usableSkills } from '../../lib/buildCalc';
import { fmtCdShort } from '../../lib/cooldown';
import { RotationPreview } from './RotationPreview';

function warnings(data: GameData, build: Build, m: Macro) {
  const noCd = m.steps.filter((s) => {
    const sk = data.skillById.get(s.id);
    return sk && buildCd(data, build, sk) <= 0;
  });
  return { filler: new Set(noCd.map((s) => s.id)).size > 1, full: m.steps.length >= MAX_MACRO_STEPS };
}

interface EditorProps { data: GameData; build: Build; setBuild: (fn: (b: Build) => Build) => void }

export function MacroEditor({ data, build, setBuild }: EditorProps) {
  const { t } = useLoadedGame();
  const [openId, setOpenId] = useState<string | null>(build.macros[0]?.id ?? null);
  const usable = usableSkills(data, build);
  const onBar = new Set(Object.values(build.bar));

  const setMacros = (fn: (list: Macro[]) => Macro[]) => setBuild((b) => ({ ...b, macros: fn(b.macros) }));
  const update = (id: string, fn: (m: Macro) => Macro) => setMacros((l) => l.map((m) => (m.id === id ? fn(m) : m)));

  const add = (steps: MacroStep[] = []) => {
    if (build.macros.length >= MAX_MACROS) return;
    const m: Macro = { id: newMacroId(), name: t('macroDefaultName', { n: build.macros.length + 1 }), key: '', steps };
    setMacros((l) => [...l, m]);
    setOpenId(m.id);
  };

  const fromColumn = (col: number) => {
    // the bottom row has the highest priority in the game, so it becomes step 1
    const steps: MacroStep[] = [];
    for (let row = 0; row < BAR_ROWS; row++) {
      const id = build.bar[slotKey(row, col)];
      if (id) steps.push({ id, delay: DEFAULT_DELAY });
    }
    add(steps);
  };

  const move = (id: string, i: number, dir: -1 | 1) =>
    update(id, (m) => {
      const steps = [...m.steps];
      const j = i + dir;
      if (j < 0 || j >= steps.length) return m;
      [steps[i], steps[j]] = [steps[j], steps[i]];
      return { ...m, steps };
    });

  const columnsWithSkills = Array.from({ length: BAR_COLS }, (_, c) => c)
    .filter((c) => Array.from({ length: BAR_ROWS }, (_, r) => build.bar[slotKey(r, c)]).some(Boolean));

  return (
    <div className="macros">
      <p className="hint-box"><Info size={15} /> {t('macrosHint')}</p>

      <div className="toolbar">
        <button type="button" className="btn primary" disabled={build.macros.length >= MAX_MACROS} onClick={() => add()}>
          <Plus size={16} /> {t('newMacro')}
        </button>
        <label className="select-inline">
          <Columns3 size={15} />
          <select
            value=""
            disabled={!columnsWithSkills.length || build.macros.length >= MAX_MACROS}
            onChange={(e) => { if (e.target.value !== '') fromColumn(Number(e.target.value)); }}
          >
            <option value="">{t('macroFromColumn')}…</option>
            {columnsWithSkills.map((c) => <option key={c} value={c}>{t('column', { n: c + 1 })}</option>)}
          </select>
        </label>
        <span className="muted small">{build.macros.length} / {MAX_MACROS}</span>
      </div>

      {build.macros.length === 0 && <EmptyState icon={<ScrollText size={28} />} text={t('noMacros')} />}

      {build.macros.map((m) => {
        const open = openId === m.id;
        const w = warnings(data, build, m);
        return (
          <div key={m.id} className={`macro ${open ? 'open' : ''}`}>
            <div className="macro-head" onClick={() => setOpenId(open ? null : m.id)}>
              <ScrollText size={16} />
              <strong>{m.name || '—'}</strong>
              {m.key && <kbd>{m.key}</kbd>}
              <div className="macro-mini">
                {m.steps.slice(0, 8).map((s, i) => {
                  const sk = data.skillById.get(s.id);
                  return sk ? <SkillTile key={i} skill={sk} level={skillLevel(data, build, sk)} size={24} showCd={false} tip={false} /> : null;
                })}
              </div>
              <span className="muted small">{m.steps.length} {t('steps')}</span>
            </div>

            {open && (
              <div className="macro-body">
                <div className="form-row">
                  <label className="field-block">
                    <span>{t('macroName')}</span>
                    <input value={m.name} maxLength={30} onChange={(e) => update(m.id, (x) => ({ ...x, name: e.target.value }))} />
                  </label>
                  <label className="field-block narrow">
                    <span><Keyboard size={13} /> {t('macroKey')}</span>
                    <input value={m.key} maxLength={12} placeholder={t('macroKeyHint')} onChange={(e) => update(m.id, (x) => ({ ...x, key: e.target.value }))} />
                  </label>
                  <button type="button" className="btn danger ghost self-end" onClick={() => { setMacros((l) => l.filter((x) => x.id !== m.id)); setOpenId(null); }}>
                    <Trash2 size={15} /> {t('deleteMacro')}
                  </button>
                </div>

                <ol className="steps">
                  {m.steps.map((s, i) => {
                    const sk = data.skillById.get(s.id);
                    if (!sk) return null;
                    const cd = buildCd(data, build, sk);
                    return (
                      <li key={`${s.id}-${i}`} className="step">
                        <span className="step-prio" title={t('priority')}>{i + 1}</span>
                        <SkillTile skill={sk} level={skillLevel(data, build, sk)} size={36} />
                        <div className="step-main">
                          <span className="step-name">{sk.name}</span>
                          <span className="step-meta">
                            <CdChip cd={cd} short />
                            {!onBar.has(sk.id) && <span className="chip subtle" title={t('notInBarInfo')}><Info size={12} /> {t('notInBarInfo')}</span>}
                          </span>
                        </div>
                        <label className="step-delay">
                          <span className="eyebrow">{t('delayMs')}</span>
                          <input type="number" min={0} max={MAX_DELAY} step={10} value={s.delay}
                            onChange={(e) => update(m.id, (x) => ({ ...x, steps: x.steps.map((y, j) => (j === i ? { ...y, delay: Math.min(MAX_DELAY, Math.max(0, Math.round(Number(e.target.value)) || 0)) } : y)) }))} />
                        </label>
                        <div className="step-tools">
                          <button type="button" className="icon-btn sm" title={t('moveUp')} aria-label={t('moveUp')} disabled={i === 0} onClick={() => move(m.id, i, -1)}><ArrowUp size={14} /></button>
                          <button type="button" className="icon-btn sm" title={t('moveDown')} aria-label={t('moveDown')} disabled={i === m.steps.length - 1} onClick={() => move(m.id, i, 1)}><ArrowDown size={14} /></button>
                          <button type="button" className="icon-btn sm" title={t('removeStep')} aria-label={t('removeStep')} onClick={() => update(m.id, (x) => ({ ...x, steps: x.steps.filter((_, j) => j !== i) }))}><X size={14} /></button>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <label className="select-inline add-step">
                  <Plus size={15} />
                  <select
                    value=""
                    disabled={w.full}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      if (id) update(m.id, (x) => ({ ...x, steps: [...x.steps, { id, delay: DEFAULT_DELAY }].slice(0, MAX_MACRO_STEPS) }));
                    }}
                  >
                    <option value="">{t('addStep')}</option>
                    {usable.map((s) => {
                      const cd = buildCd(data, build, s);
                      return <option key={s.id} value={s.id}>{s.name}{cd > 0 ? ` (${fmtCdShort(cd)})` : ''}</option>;
                    })}
                  </select>
                </label>

                {w.full && <p className="warn-line"><TriangleAlert size={14} /> {t('maxStepsWarn', { n: MAX_MACRO_STEPS })}</p>}
                {w.filler && <p className="warn-line"><TriangleAlert size={14} /> {t('fillerWarn')}</p>}

                <RotationPreview data={data} build={build} steps={m.steps} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Read-only macro list (community build view). */
export function MacroView({ data, build }: { data: GameData; build: Build }) {
  const { t } = useLoadedGame();
  if (!build.macros.length) return <p className="muted">{t('noMacros')}</p>;
  return (
    <div className="macros">
      {build.macros.map((m) => (
        <div key={m.id} className="macro open">
          <div className="macro-head static">
            <ScrollText size={16} />
            <strong>{m.name || '—'}</strong>
            {m.key && <kbd>{m.key}</kbd>}
            <span className="muted small">{m.steps.length} {t('steps')}</span>
          </div>
          <div className="macro-body">
            <ol className="steps compact">
              {m.steps.map((s, i) => {
                const sk = data.skillById.get(s.id);
                if (!sk) return null;
                return (
                  <li key={i} className="step">
                    <span className="step-prio">{i + 1}</span>
                    <SkillTile skill={sk} level={skillLevel(data, build, sk)} size={32} cdr={build.cdr} />
                    <div className="step-main">
                      <span className="step-name">{sk.name}</span>
                      <span className="step-meta"><CdChip cd={buildCd(data, build, sk)} short /><span className="chip subtle">{s.delay} ms</span></span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <RotationPreview data={data} build={build} steps={m.steps} />
          </div>
        </div>
      ))}
    </div>
  );
}
