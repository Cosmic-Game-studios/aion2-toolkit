import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Move, Replace, Trash2, TriangleAlert, Zap } from 'lucide-react';
import type { GameData, Skill } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { slotKey, type Build } from '../../state/build';
import { Modal } from '../../components/Modal';
import { SkillTile } from '../../components/SkillTile';
import { CdChip, EmptyState } from '../../components/ui';
import { buildCd, shownLevel } from '../../lib/buildCalc';
import { keyLabel } from '../../lib/keyLabel';

interface Props {
  data: GameData;
  build: Build;
  row: number;
  col: number;
  /** skills that can go on the bar (palette order) */
  usable: Skill[];
  /** first key of every skill already on the bar */
  placedOn: Map<number, number>;
  blocker?: Skill;
  onClose: () => void;
  onAssign: (id: number) => void;
  onToggleAuto: (id: number) => void;
  onMove: () => void;
  onRemove: () => void;
}

/**
 * What a click or tap on a slot does when no skill is picked: a small menu (a bottom sheet on phones).
 * Empty slot: choose its skill. Filled slot: auto-use, replace, move, remove.
 */
export function SlotMenu({ data, build, row, col, usable, placedOn, blocker, onClose, onAssign, onToggleAuto, onMove, onRemove }: Props) {
  const { t } = useLoadedGame();
  const id = build.bar[slotKey(row, col)];
  const skill = id ? data.skillById.get(id) : undefined;
  const [choosing, setChoosing] = useState(!skill);
  // switching views inside the open dialog: move the focus to the new view (the clicked button is gone)
  const box = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    box.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
  }, [choosing]);
  const isAuto = !!skill && build.auto.includes(skill.id);
  const title = t('slotMenuTitle', { key: keyLabel(col, t), row });

  const free = usable.filter((s) => !placedOn.has(s.id));
  const placed = usable.filter((s) => placedOn.has(s.id));
  const firstId = (free[0] ?? placed[0])?.id;

  const choice = (s: Skill) => {
    const on = placedOn.get(s.id);
    return (
      <li key={s.id}>
        <button
          type="button"
          className={`sm-choice ${s.id === id ? 'current' : ''}`}
          data-autofocus={s.id === firstId ? true : undefined}
          aria-current={s.id === id ? 'true' : undefined}
          onClick={() => onAssign(s.id)}
        >
          <SkillTile skill={s} level={shownLevel(data, build, s)} size={36} tip={false} />
          <span className="sm-name">{s.name}</span>
          {s.isStigma && <span className="mini-tag stigma" role="img" aria-label={t('stigma')} title={t('stigma')}>S</span>}
          {on != null && <kbd className="sm-key" aria-hidden>{keyLabel(on, t)}</kbd>}
          {on != null && <span className="sr-only">{t('column', { n: keyLabel(on, t) })}</span>}
        </button>
      </li>
    );
  };

  return (
    <Modal open sheet size="sm" title={title} onClose={onClose} description={choosing ? t('slotChoose') : undefined} bodyClassName="slot-menu">
      <div ref={box} className="sm-box">
      {skill && !choosing ? (
        <>
          <div className="sm-skill">
            <SkillTile skill={skill} level={shownLevel(data, build, skill)} size={44} tip={false} />
            <div className="sm-skill-text">
              <strong>{skill.name}</strong>
              <CdChip cd={buildCd(data, build, skill)} />
            </div>
          </div>
          {blocker && <p className="hint-box warn sm-warn"><TriangleAlert size={15} aria-hidden /> {t('slotBlocked', { skill: blocker.name })}</p>}
          <label className="toggle sm-auto">
            <input type="checkbox" checked={isAuto} onChange={() => onToggleAuto(skill.id)} />
            <span className="toggle-ui" />
            <span className="with-icon"><Zap size={15} aria-hidden /> {t('autoUse')}</span>
          </label>
          <p className="field-hint">{t('autoUseHint')}</p>
          <div className="sm-actions">
            <button type="button" className="btn" data-autofocus onClick={() => setChoosing(true)}><Replace size={16} aria-hidden /> {t('slotReplace')}</button>
            <button type="button" className="btn" onClick={onMove}><Move size={16} aria-hidden /> {t('slotMove')}</button>
            <button type="button" className="btn danger" onClick={onRemove}><Trash2 size={16} aria-hidden /> {t('slotRemove')}</button>
          </div>
        </>
      ) : (
        <>
          {skill && (
            <button type="button" className="btn ghost sm sm-back" onClick={() => setChoosing(false)}><ArrowLeft size={15} aria-hidden /> {t('back')}</button>
          )}
          {usable.length === 0 ? (
            <EmptyState text={t('paletteEmpty')} action={<a className="btn ghost sm" href="#/skills" onClick={onClose}>{t('navSkills')}</a>} />
          ) : (
            <div className="sm-lists">
              {free.length > 0 && (
                <section>
                  <h3 className="sm-group">{t('notOnBar')} <span className="count">{free.length}</span></h3>
                  <ul className="sm-list">{free.map(choice)}</ul>
                </section>
              )}
              {placed.length > 0 && (
                <section>
                  <h3 className="sm-group">{t('alreadyOnBar')} <span className="count">{placed.length}</span></h3>
                  <ul className="sm-list">{placed.map(choice)}</ul>
                </section>
              )}
            </div>
          )}
        </>
      )}
      </div>
    </Modal>
  );
}
