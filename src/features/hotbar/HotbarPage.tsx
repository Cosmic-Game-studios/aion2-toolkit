import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Eraser, Keyboard, Move, Pencil, Play, RotateCcw, ScrollText, X, Zap } from 'lucide-react';
import type { GameData, Skill } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { BAR_KEYS, BAR_ROWS, slotKey, type Build } from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { Card, EmptyState, PageHeader, Segmented } from '../../components/ui';
import { ClassGuideLink } from '../../components/ClassGuideLink';
import { useToast } from '../../components/Toast';
import { useIsTouch } from '../../components/hooks';
import { buildCd, shownLevel, usableSkills } from '../../lib/buildCalc';
import { isSpaceSkill } from '../../lib/classInfo';
import { keyLabel } from '../../lib/keyLabel';
import { HotbarGrid, type FiredKey } from './HotbarGrid';
import { CooldownOverview } from './CooldownOverview';
import { MacroEditor } from './Macros';
import { SlotMenu } from './SlotMenu';
import { timerState, useCooldownTimers } from './useCooldownTimers';
import { blockedSlots, isSlotDrag, placedKeys, readDrag, startDrag } from './keyStacks';

/** "3/12" with a full sentence for screen readers */
function PlacedCount({ n, m }: { n: number; m: number }) {
  const { t } = useLoadedGame();
  return (
    <span className="count">
      <span aria-hidden>{n}/{m}</span>
      <span className="sr-only">{t('placedOf', { n, m })}</span>
    </span>
  );
}

interface PaletteProps {
  data: GameData;
  build: Build;
  actives: Skill[];
  stigmas: Skill[];
  space?: Skill;
  pick: number | null;
  placedOn: Map<number, number>;
  onPick: (id: number | null) => void;
  onToggleAuto: (id: number) => void;
  /** a slot dragged back onto the list is removed from the bar */
  onDropSlot: (key: string) => void;
}

/** The skills that can go on the bar, right above the grid. Placed skills show their key; the order never changes. */
const Palette = memo(function Palette({ data, build, actives, stigmas, space, pick, placedOn, onPick, onToggleAuto, onDropSlot }: PaletteProps) {
  const { t } = useLoadedGame();
  const touch = useIsTouch();
  const [over, setOver] = useState(false);
  const auto = new Set(build.auto);
  const placedCount = (list: Skill[]) => list.filter((s) => placedOn.has(s.id)).length;

  const tile = (s: Skill) => {
    const on = placedOn.get(s.id);
    const key = on != null ? keyLabel(on, t) : null;
    return (
      <button
        key={s.id}
        type="button"
        className={`palette-item ${pick === s.id ? 'picked' : ''} ${key ? 'placed' : ''}`}
        draggable
        onDragStart={(e) => startDrag(e, { kind: 'skill', id: s.id })}
        onClick={() => onPick(pick === s.id ? null : s.id)}
        onContextMenu={(e) => { e.preventDefault(); onToggleAuto(s.id); }}
        aria-pressed={pick === s.id}
        aria-label={key ? t('paletteOnKey', { skill: s.name, key }) : s.name}
      >
        <SkillTile skill={s} level={shownLevel(data, build, s)} size={44} />
        {auto.has(s.id) && <span className="slot-auto" aria-hidden><Zap size={11} strokeWidth={2.5} /></span>}
        {key && <span className="pal-key" aria-hidden>{key}</span>}
      </button>
    );
  };

  return (
    <div
      className={`hb-palette ${over ? 'drop-over' : ''}`}
      onDragOver={(e) => { if (isSlotDrag(e)) e.preventDefault(); }}
      onDragEnter={(e) => { if (isSlotDrag(e)) setOver(true); }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver(false); }}
      onDrop={(e) => {
        setOver(false);
        const p = readDrag(e);
        if (p?.kind === 'slot') { e.preventDefault(); onDropSlot(p.key); }
      }}
    >
      <div className="hb-pal-group actives">
        <h3 className="hb-pal-title">{t('active')} <PlacedCount n={placedCount(actives)} m={actives.length} /></h3>
        {actives.length
          ? <div className="palette">{actives.map(tile)}</div>
          : <p className="field-hint">{t('paletteEmpty')} <a href="#/skills">{t('navSkills')}</a></p>}
      </div>
      <div className="hb-pal-group stigmas">
        <h3 className="hb-pal-title stigma">{t('stigma')} <PlacedCount n={placedCount(stigmas)} m={stigmas.length} /></h3>
        {stigmas.length
          ? <div className="palette">{stigmas.map(tile)}</div>
          : <a className="btn ghost sm" href="#/stigma">{t('chooseStigma')}</a>}
      </div>
      <div className="hb-pal-notes">
        <p className="field-hint">{touch ? t('paletteHintTouch') : t('paletteHint')}</p>
        {space && <p className="field-hint">{t('paletteSpaceHint', { skill: space.name })}</p>}
      </div>
    </div>
  );
});

/**
 * Hotbar & Macro: one full-width card with the skill list right above the grid (pick a skill, then a slot – or
 * choose a slot first), the macro below it and the cooldown overview beside it (last on phones).
 * Deep links: #/hotbar/macro scrolls to the macro, #/hotbar/test starts the cooldown test.
 */
export function HotbarPage({ param }: { param?: string | null }) {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const toast = useToast();
  const touch = useIsTouch();
  const [pick, setPick] = useState<number | null>(null);
  const [moving, setMoving] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ row: number; col: number } | null>(null);
  const [test, setTest] = useState(false);
  const [fired, setFired] = useState<FiredKey | null>(null);
  const fireCount = useRef(0);
  const { timers, now, trigger, reset } = useCooldownTimers();
  const macroRef = useRef<HTMLDivElement>(null);

  const usable = useMemo(
    () => usableSkills(data, build).filter((s) => s.isStigma || s.acquireLevel <= build.l),
    [data, build],
  );
  const { space, actives, stigmas, choices } = useMemo(() => {
    // Defiance stays on the Space bar in game
    const sp = usable.find(isSpaceSkill);
    const act = usable.filter((s) => !s.isStigma && !isSpaceSkill(s));
    const sti = usable.filter((s) => s.isStigma);
    return { space: sp, actives: act, stigmas: sti, choices: [...act, ...sti] };
  }, [usable]);
  const placedOn = useMemo(() => placedKeys(build), [build]);
  const filled = Object.keys(build.bar).length > 0;
  const movingKey = moving && build.bar[moving] ? moving : null;

  // ---- editing ----
  const assign = useCallback((row: number, col: number, id: number) => {
    setBuild((b) => ({ ...b, bar: { ...b.bar, [slotKey(row, col)]: id } }));
    setPick(null);
  }, [setBuild]);
  const moveSlot = useCallback((from: string, to: string) => setBuild((b) => {
    if (from === to) return b;
    const bar = { ...b.bar };
    const a = bar[from];
    const c = bar[to];
    if (c) bar[from] = c; else delete bar[from];
    if (a) bar[to] = a; else delete bar[to];
    return { ...b, bar };
  }), [setBuild]);
  const toggleAuto = useCallback((id: number) => setBuild((b) => ({
    ...b, auto: b.auto.includes(id) ? b.auto.filter((x) => x !== id) : [...b.auto, id],
  })), [setBuild]);
  /** picking a skill ends a move that is still waiting for its target */
  const pickFromPalette = useCallback((id: number | null) => {
    setPick(id);
    setMoving(null);
  }, []);

  /** puts the bar back as it was – only into the same class (the player may have switched meanwhile) */
  const restoreBar = (prev: Pick<Build, 'c' | 'bar' | 'auto'>) =>
    setBuild((b) => (b.c === prev.c ? { ...b, bar: prev.bar, auto: prev.auto } : b));

  const removeSlot = (row: number, col: number) => {
    const k = slotKey(row, col);
    const id = build.bar[k];
    if (!id) return;
    const prev = { c: build.c, bar: build.bar, auto: build.auto };
    setBuild((b) => {
      const bar = { ...b.bar };
      delete bar[k];
      return { ...b, bar };
    });
    if (moving === k) setMoving(null);
    toast(t('slotRemoved', { skill: data.skillById.get(id)?.name ?? '', key: keyLabel(col, t) }), 'ok', {
      action: { label: t('undo'), onClick: () => restoreBar(prev) },
    });
  };
  const removeRef = useRef(removeSlot);
  removeRef.current = removeSlot;
  const dropSlotOnPalette = useCallback((key: string) => {
    const [row, col] = key.split(':').map(Number);
    if (Number.isFinite(row) && Number.isFinite(col)) removeRef.current(row, col);
  }, []);

  const clearBar = () => {
    const prev = { c: build.c, bar: build.bar, auto: build.auto };
    setBuild({ bar: {}, auto: [] });
    setPick(null);
    setMoving(null);
    toast(t('barCleared'), 'ok', { action: { label: t('undo'), onClick: () => restoreBar(prev) } });
  };

  // ---- cooldown test: a key fires its first ready skill, like in game ----
  const setMode = (on: boolean) => {
    setTest(on);
    reset();
    setPick(null);
    setMoving(null);
    setFired(null);
  };
  const fireKey = (col: number, onlyRow?: number) => {
    const n = performance.now();
    const rows = onlyRow != null ? [onlyRow] : Array.from({ length: BAR_ROWS }, (_, i) => i);
    for (const row of rows) {
      const k = slotKey(row, col);
      const id = build.bar[k];
      const s = id ? data.skillById.get(id) : undefined;
      if (!s) continue;
      const st = timerState(timers[s.id], n);
      if (st && !st.zero) continue;
      trigger(s.id, buildCd(data, build, s));
      setFired({ col, slot: k, n: ++fireCount.current });
      return;
    }
    setFired({ col, slot: null, n: ++fireCount.current });
  };
  const fireRef = useRef(fireKey);
  fireRef.current = fireKey;

  useEffect(() => {
    if (!fired) return;
    const id = window.setTimeout(() => setFired(null), 450);
    return () => window.clearTimeout(id);
  }, [fired]);

  // keyboard while the test runs: the default keys of the bar (R = basic attack)
  useEffect(() => {
    if (!test) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target;
      if ((el instanceof Element && el.closest('input, textarea, select, [role="dialog"]')) || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const col = BAR_KEYS.indexOf(e.key.toUpperCase());
      if (col < 0) return;
      e.preventDefault();
      fireRef.current(col);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [test]);

  // Escape ends picking or moving
  useEffect(() => {
    if (pick == null && !moving) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || document.querySelector('[role="dialog"]')) return;
      setPick(null);
      setMoving(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pick, moving]);

  // deep links
  useEffect(() => {
    if (param === 'test') setTest(true);
    if (param !== 'macro') return;
    const id = requestAnimationFrame(() => macroRef.current?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(id);
  }, [param]);

  const activate = (row: number, col: number, { shift }: { shift: boolean }) => {
    if (test) { fireKey(col, shift ? row : undefined); return; }
    const k = slotKey(row, col);
    if (movingKey) {
      if (movingKey !== k) moveSlot(movingKey, k);
      setMoving(null);
      return;
    }
    if (pick != null) { assign(row, col, pick); return; }
    setMenu({ row, col });
  };

  const pickSkill = !test && pick != null ? data.skillById.get(pick) : undefined;
  const movingSkill = !test && movingKey ? data.skillById.get(build.bar[movingKey]) : undefined;
  const barText = pickSkill
    ? t(touch ? 'pickPlaceTouch' : 'pickPlace', { skill: pickSkill.name })
    : movingSkill ? t('slotMoveHint', { skill: movingSkill.name }) : '';
  const cancelTarget = () => { setPick(null); setMoving(null); };

  return (
    <div className="page hotbar-page">
      <PageHeader
        icon={<Keyboard size={22} />}
        title={t('navHotbar')}
        subtitle={t('homeHotbarText')}
        guide={{
          id: 'hotbar',
          steps: [
            { mouse: t('guideHotbar1'), touch: t('guideHotbar1Touch') },
            { mouse: t('guideHotbar2'), touch: t('guideHotbar2Touch') },
            { mouse: t('guideHotbar3'), touch: t('guideHotbar3Touch') },
          ],
        }}
        help={<ClassGuideLink section="hotbar" />}
      />

      <Card
        title={t('skillBar')}
        icon={<Keyboard size={16} />}
        className={`hb-card ${test ? 'testing' : ''}`}
        extra={
          <>
            <Segmented<'edit' | 'test'>
              label={t('hbMode')}
              value={test ? 'test' : 'edit'}
              onChange={(v) => { if ((v === 'test') !== test) setMode(v === 'test'); }}
              options={[
                { value: 'edit', label: <><Pencil size={14} aria-hidden /> {t('edit')}</> },
                { value: 'test', label: <><Play size={14} aria-hidden /> {t('testMode')}</> },
              ]}
            />
            {test ? (
              <button type="button" className="btn ghost sm" onClick={reset}><RotateCcw size={14} aria-hidden /> {t('testReset')}</button>
            ) : (
              <button type="button" className="btn ghost sm danger" disabled={!filled} onClick={clearBar}><Eraser size={14} aria-hidden /> {t('clearBar')}</button>
            )}
          </>
        }
      >
        {test ? (
          <p className="hb-test-hint"><Play size={15} aria-hidden /> <span>{touch ? t('testModeHintTouch') : t('testModeHint')}</span></p>
        ) : (
          <Palette
            data={data}
            build={build}
            actives={actives}
            stigmas={stigmas}
            space={space}
            pick={pick}
            placedOn={placedOn}
            onPick={pickFromPalette}
            onToggleAuto={toggleAuto}
            onDropSlot={dropSlotOnPalette}
          />
        )}

        {!filled && !test && (
          <p className="hint-box hb-empty">
            <Keyboard size={16} aria-hidden />
            <span>{t('hbEmpty')}</span>
            <a className="hb-empty-top" href="#/top">{t('hbEmptyTop')} <ArrowRight size={14} aria-hidden /></a>
          </p>
        )}

        <HotbarGrid
          data={data}
          build={build}
          pick={test ? null : pick}
          moving={test ? null : movingKey}
          testing={test}
          timers={test ? timers : undefined}
          now={now}
          fired={test ? fired : null}
          onActivate={activate}
          onDropSkill={assign}
          onMove={moveSlot}
          onClear={removeSlot}
          onToggleAuto={toggleAuto}
        />

        {barText && (
          <div className="hb-pickbar">
            {pickSkill ? <SkillTile skill={pickSkill} size={28} tip={false} showCd={false} /> : <Move size={18} aria-hidden />}
            <span className="hb-pickbar-text">{barText}</span>
            <button type="button" className="btn sm" onClick={cancelTarget}><X size={14} aria-hidden /> {t('cancel')}</button>
          </div>
        )}
        <p className="sr-only" aria-live="polite">{barText}</p>
        <p className="field-hint hb-chain-note">{t('chainNote')} {t('defaultKeysNote')}</p>
      </Card>

      <div className="hb-lower">
        <div ref={macroRef} className="hb-macro">
          <Card title={t('macros')} icon={<ScrollText size={16} />}>
            {usable.length
              ? <MacroEditor data={data} build={build} setBuild={setBuild} />
              : <EmptyState text={t('macroNoSkills')} action={<a className="btn ghost sm" href="#/skills">{t('navSkills')}</a>} />}
          </Card>
        </div>
        <CooldownOverview data={data} build={build} timers={test ? timers : undefined} now={now} />
      </div>

      {menu && (
        <SlotMenu
          data={data}
          build={build}
          row={menu.row}
          col={menu.col}
          usable={choices}
          placedOn={placedOn}
          blocker={blockedSlots(data, build).get(slotKey(menu.row, menu.col))}
          onClose={() => setMenu(null)}
          onAssign={(id) => { assign(menu.row, menu.col, id); setMenu(null); }}
          onToggleAuto={toggleAuto}
          onMove={() => { setMoving(slotKey(menu.row, menu.col)); setMenu(null); }}
          onRemove={() => { removeSlot(menu.row, menu.col); setMenu(null); }}
        />
      )}
    </div>
  );
}
