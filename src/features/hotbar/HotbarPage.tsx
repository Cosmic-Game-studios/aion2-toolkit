import { useEffect, useState } from 'react';
import { Eraser, Keyboard, MousePointerClick, Play, RotateCcw, ScrollText } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { BAR_KEYS, slotKey } from '../../state/build';
import { SkillTile } from '../../components/SkillTile';
import { Card, EmptyState, PageHeader } from '../../components/ui';
import { buildCd, skillLevel, usableSkills } from '../../lib/buildCalc';
import { HotbarGrid } from './HotbarGrid';
import { CooldownOverview } from './CooldownOverview';
import { MacroEditor } from './Macros';
import { useCooldownTimers } from './useCooldownTimers';

export function HotbarPage() {
  const { data, t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const [pick, setPick] = useState<number | null>(null);
  const [test, setTest] = useState(false);
  const { timers, now, trigger, reset } = useCooldownTimers();

  const usable = usableSkills(data, build).filter((s) => s.isStigma || s.acquireLevel <= build.l);
  const actives = usable.filter((s) => !s.isStigma);
  const stigmas = usable.filter((s) => s.isStigma);

  const assign = (row: number, col: number, id: number) => {
    setBuild((b) => ({ ...b, bar: { ...b.bar, [slotKey(row, col)]: id } }));
    setPick(null);
  };
  const clear = (row: number, col: number) => setBuild((b) => {
    const bar = { ...b.bar };
    delete bar[slotKey(row, col)];
    return { ...b, bar };
  });
  const moveSlot = (from: string, to: string) => setBuild((b) => {
    if (from === to) return b;
    const bar = { ...b.bar };
    const a = bar[from];
    const c = bar[to];
    if (c) bar[from] = c; else delete bar[from];
    if (a) bar[to] = a; else delete bar[to];
    return { ...b, bar };
  });
  const toggleAuto = (id: number) => setBuild((b) => ({ ...b, auto: b.auto.includes(id) ? b.auto.filter((x) => x !== id) : [...b.auto, id] }));

  const fire = (id: number | undefined) => {
    if (!id) return;
    const s = data.skillById.get(id);
    if (s) trigger(id, buildCd(data, build, s));
  };

  // keyboard: main bar keys while the cooldown test is on
  useEffect(() => {
    if (!test) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target;
      if ((el instanceof Element && el.closest('input, textarea, select')) || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const col = BAR_KEYS.indexOf(e.key);
      if (col < 0) return;
      e.preventDefault();
      fire(build.bar[slotKey(0, col)]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const paletteTile = (s: typeof usable[number]) => (
    <button
      key={s.id}
      type="button"
      className={`palette-item ${pick === s.id ? 'picked' : ''}`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', `skill:${s.id}`)}
      onClick={() => setPick(pick === s.id ? null : s.id)}
      onContextMenu={(e) => { e.preventDefault(); toggleAuto(s.id); }}
      aria-pressed={pick === s.id}
    >
      <SkillTile skill={s} level={skillLevel(data, build, s)} size={46} />
      {build.auto.includes(s.id) && <span className="slot-auto">A</span>}
    </button>
  );

  return (
    <div className="page">
      <PageHeader
        icon={<Keyboard size={22} />}
        title={t('navHotbar')}
        subtitle={t('homeHotbarText')}
        actions={
          <>
            <button type="button" className={`btn ${test ? 'primary' : 'ghost'}`} aria-pressed={test} onClick={() => { setTest(!test); reset(); setPick(null); }}>
              <Play size={16} /> {t('testMode')}
            </button>
            <button type="button" className="btn ghost" onClick={() => { if (confirm(`${t('clearBar')}?`)) setBuild({ bar: {}, auto: [] }); }}>
              <Eraser size={16} /> {t('clearBar')}
            </button>
          </>
        }
      />

      <div className="split left">
        <aside className="side">
          <Card title={t('palette')} icon={<MousePointerClick size={16} />}>
            <p className="muted small">{t('paletteHint')}</p>
            {actives.length > 0 && <h3 className="group-title">{t('active')} <span className="count">{actives.length}</span></h3>}
            <div className="palette">{actives.map(paletteTile)}</div>
            <h3 className="group-title">{t('stigma')} <span className="count">{stigmas.length}</span></h3>
            {stigmas.length ? <div className="palette">{stigmas.map(paletteTile)}</div> : (
              <a className="link small" href="#/stigma">{t('chooseStigma')}</a>
            )}
            {pick != null && <p className="pick-hint"><MousePointerClick size={14} /> {data.skillById.get(pick)?.name}</p>}
          </Card>
          <CooldownOverview data={data} build={build} timers={test ? timers : undefined} now={now} />
        </aside>

        <div className="stack">
          <Card
            title={t('skillBar')}
            icon={<Keyboard size={16} />}
            extra={test && <button type="button" className="btn ghost sm" onClick={reset}><RotateCcw size={14} /> {t('testReset')}</button>}
            className={test ? 'testing' : ''}
          >
            <p className="muted small">{test ? t('testModeHint') : t('skillBarHint')}</p>
            <div className="hotbar-scroll">
              <HotbarGrid
                data={data}
                build={build}
                pick={test ? null : pick}
                timers={test ? timers : undefined}
                now={now}
                onSlotClick={(row, col, id) => {
                  if (test) fire(id);
                  else if (pick != null) assign(row, col, pick);
                }}
                onDropSkill={assign}
                onMove={moveSlot}
                onClear={clear}
                onToggleAuto={toggleAuto}
              />
            </div>
          </Card>

          <Card title={t('macros')} icon={<ScrollText size={16} />}>
            {usable.length ? <MacroEditor data={data} build={build} setBuild={setBuild} /> : <EmptyState text={t('cdEmpty')} />}
          </Card>
        </div>
      </div>
    </div>
  );
}
