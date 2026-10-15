import { useMemo, useState } from 'react';
import { BookOpen, Hexagon, Keyboard, Sparkles, Swords } from 'lucide-react';
import type { ClassType, Skill } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { useEnglishDataState } from '../../data/useEnglishData';
import { useLoadBuild } from '../../components/SavedBuildsDialog';
import { BAR_KEYS, BASIC_COL } from '../../state/build';
import { effectiveLevel } from '../../lib/buildCalc';
import { CLASS_GUIDE_SECTION, classGuideHref } from '../guides/guideLinks';
import type { TopStats } from './topStats';
import type { TopPlayer } from './types';
import { recommend, type RecKey, type Recommendation } from './topConsensus';
import { useGuideLayout } from './guideLayout';
import { BoardMap, BoardPicker } from './BoardMap';
import { TopCard } from './TopStatsView';
import { Frac, SkillIcon } from './parts';

/*
 * The recommended build of the class: one build from what most of the top players chose (topConsensus.ts), with its
 * skill bar and macro, stigmas, skill levels and Daevanion nodes, and a button that loads it into the planner.
 */

export function TopRecommendation({ cls, players, stats, headingId }: { cls: ClassType; players: TopPlayer[]; stats: TopStats; headingId: string }) {
  const { t, data } = useLoadedGame();
  const { en, failed } = useEnglishDataState();
  // without the English texts the UI language's texts check the attacks (at worst a skill stays out of the macro)
  const textData = en ?? (failed ? data : null);
  const layout = useGuideLayout(cls);
  const macroName = t('topRecMacroName');
  const rec = useMemo(
    () => (textData && layout.state === 'done' ? recommend(players, stats, data, textData, layout.layout, macroName) : null),
    [players, stats, data, textData, layout, macroName],
  );
  const loadBuild = useLoadBuild();
  // a guide that could not be loaded goes to the error boundary (reload), not to "no key layout"
  if (layout.state === 'error') throw layout.error;
  const n = stats.players;

  const open = () => {
    if (!rec) return;
    loadBuild(rec.build, { message: t('topRecLoaded') });
    location.hash = '#/hotbar';
  };

  return (
    <section className="top-section top-rec" aria-labelledby={headingId} aria-busy={!rec}>
      <h2 className="top-h2" id={headingId}>{t('topRecTitle', { n })}</h2>
      <p className="top-note">{t('topRecIntro', { n })}</p>
      {!rec ? (
        <p className="top-rec-loading" role="status">{t('topRecLoading')}</p>
      ) : (
        <>
          <div className="top-rec-actions">
            <button type="button" className="btn primary" onClick={open}>{t('topRecOpen')}</button>
            <span className="top-note">{t('topRecImportNote')}</span>
          </div>
          <div className="top-stats top-rec-grid">
            <KeysCard rec={rec} stats={stats} />
            <div className="top-rec-side">
              <StigmaCard rec={rec} of={n} />
              <LevelsCard rec={rec} of={n} />
            </div>
            <BoardsCard rec={rec} stats={stats} />
          </div>
        </>
      )}
    </section>
  );
}

/** "1", "LMB", "Space" – the label of a key column. */
function useKeyLabel() {
  const { t } = useLoadedGame();
  return (col: number) => (col === BASIC_COL ? t('keyLmb') : BAR_KEYS[col]);
}

function KeysCard({ rec, stats }: { rec: Recommendation; stats: TopStats }) {
  const { t, data } = useLoadedGame();
  const label = useKeyLabel();
  const cls = rec.build.c;
  const guide = classGuideHref(cls, CLASS_GUIDE_SECTION.hotbar);
  const onBar = (id: number) => stats.skills.find((x) => x.id === id)?.bar ?? 0;
  const slotted = (id: number) => rec.stigmas.find((x) => x.id === id)?.stat.slotted ?? 0;
  const skill = (id: number) => data.skillById.get(id);
  const level = (s: Skill) => effectiveLevel(data, rec.build, s).total;

  const tile = (s: Skill) => {
    const n = s.isStigma ? slotted(s.id) : onBar(s.id);
    return (
      <span key={s.id} className="top-rec-tile">
        <SkillIcon skill={s} level={level(s)} size={36} />
        <span className="top-rec-count" aria-hidden>{n}/{stats.players}</span>
        <span className="sr-only">{s.isStigma ? t('topSlottedBy', { n, m: stats.players }) : t('topOnBarOf', { n, m: stats.players })}</span>
      </span>
    );
  };

  const row = (k: RecKey) => {
    const stack = k.ids.map(skill).filter((s): s is Skill => !!s);
    const step = rec.macro.indexOf(k.col);
    return (
      <li key={k.col}>
        <kbd title={k.col === BASIC_COL ? t('keyLmbTitle') : undefined}>{label(k.col)}</kbd>
        <span className="g-key-tiles">{stack.map(tile)}</span>
        <span className="g-key-text">
          <span className="g-key-names">
            {stack.map((s) => s.name).join(' › ')}
            {step >= 0
              ? <span className="chip accent">{t('topRecStep', { n: step + 1 })}</span>
              : <span className="chip">{k.col === BASIC_COL ? t('topRecBasic') : t('topRecByHand')}</span>}
          </span>
        </span>
      </li>
    );
  };

  return (
    <TopCard title={t('topRecKeys')} icon={<Keyboard size={18} aria-hidden />} className="top-rec-keys">
      {!rec.hasLayout ? <p className="top-note">{t('topRecNoLayout')}</p> : (
        <>
          {rec.macro.length > 0 && (
            <div className="top-rec-macro">
              <span className="top-rec-macro-label">{t('topRecMacro')}</span>
              <ol aria-label={t('topRecMacro')}>
                {rec.macro.map((col, i) => <li key={i}><kbd>{label(col)}</kbd></li>)}
              </ol>
              <span className="top-note">{t('topRecMacroHint')}</span>
            </div>
          )}
          <ol className="g-keys top-rec-keylist">
            {rec.keys.map(row)}
            {rec.space && (
              <li>
                <kbd>{t('keySpace')}</kbd>
                <span className="g-key-tiles"><span className="top-rec-tile"><SkillIcon skill={rec.space} level={level(rec.space)} size={36} /></span></span>
                <span className="g-key-text">
                  <span className="g-key-names">{rec.space.name}<span className="chip">{t('topRecSpace')}</span></span>
                </span>
              </li>
            )}
          </ol>
        </>
      )}
      <p className="top-note">{t('topRecKeysNote', { n: stats.players })}</p>
      {guide && <a className="top-rec-link" href={guide}><BookOpen size={14} aria-hidden /> {t('topRecGuide')}</a>}
    </TopCard>
  );
}

function StigmaCard({ rec, of }: { rec: Recommendation; of: number }) {
  const { t, data } = useLoadedGame();
  return (
    <TopCard title={t('topStigmas')} icon={<Sparkles size={18} aria-hidden />} className="top-rec-stigmas">
      <ul className="top-rows">
        {rec.stigmas.map((x) => {
          const skill = data.skillById.get(x.id);
          return (
            <li key={x.id} className="top-row">
              <SkillIcon skill={skill} level={x.lv} size={36} />
              <span className="tr-main">
                <strong>{skill?.name ?? `#${x.id}`}</strong>
                <span className="tr-sub">{t('lv')} {x.lv}</span>
              </span>
              <Frac n={x.stat.slotted} of={of} sr={t('topSlottedBy', { n: x.stat.slotted, m: of })} />
            </li>
          );
        })}
      </ul>
    </TopCard>
  );
}

function LevelsCard({ rec, of }: { rec: Recommendation; of: number }) {
  const { t, data } = useLoadedGame();
  const skills = data.skills
    .filter((s) => s.classType === rec.build.c && !s.isStigma)
    .map((s) => ({ s, lv: effectiveLevel(data, rec.build, s) }))
    .sort((a, b) => Number(a.s.type === 'passive') - Number(b.s.type === 'passive') || b.lv.total - a.lv.total || a.s.name.localeCompare(b.s.name));
  return (
    <TopCard title={t('topRecLevels')} icon={<Swords size={18} aria-hidden />} className="top-rec-levels">
      <ul className="top-rec-levellist">
        {skills.map(({ s, lv }) => (
          <li key={s.id}>
            <SkillIcon skill={s} level={lv.total} size={32} />
            <span className="tr-main">
              <strong>{s.name}</strong>
              <span className="tr-sub">
                {t('lv')} {lv.total} · {t('topBought', { n: lv.base })}
                {lv.dv > 0 && ` ${t('topFromDv', { n: lv.dv })}`}
                {lv.gear > 0 && ` ${t('topFromGear', { n: lv.gear })}`}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="top-note">{t('topRecLevelsNote', { n: of })}</p>
    </TopCard>
  );
}

function BoardsCard({ rec, stats }: { rec: Recommendation; stats: TopStats }) {
  const { t } = useLoadedGame();
  const [id, setId] = useState<number | null>(null);
  const cur = rec.boards.find((b) => b.id === id) ?? rec.boards[0];
  // skills the recommended build uses: on its bar or in a stigma slot
  const mine = useMemo(() => new Set([
    ...Object.values(rec.build.bar).map(String),
    ...rec.build.st.flatMap((s) => (s.id != null ? [String(s.id)] : [])),
  ]), [rec.build]);
  if (!cur) return null;
  const stat = stats.boards.find((b) => b.id === cur.id);
  return (
    <TopCard title={t('topDaevanion')} icon={<Hexagon size={18} aria-hidden />} className="top-rec-dv">
      <BoardPicker
        label={t('dvBoardsLabel')}
        value={cur.id}
        onChange={setId}
        boards={rec.boards.map((b) => {
          const meta = t('topRecBoardMeta', { n: b.learned.size, pts: b.spent });
          return { id: b.id, name: b.board.name, meta, label: `${b.board.name}: ${meta}` };
        })}
      />
      <p className="top-rec-dv-sum">{t('topRecBoardSummary', { n: cur.learned.size, pts: cur.spent, m: stat?.heatOf ?? stats.players })}</p>
      <BoardMap
        key={cur.id}
        board={cur.board}
        learned={cur.learned}
        heat={stat ? { map: stat.heat, of: stat.heatOf } : undefined}
        labels={['topRecommended', 'topNotRecommended']}
        mine={mine}
        mineLabel="topLegendUsedRec"
      />
      {stat && stat.heatOf < stats.players && <p className="top-note">{t('topHeatUnread', { n: stats.players - stat.heatOf, m: stats.players })}</p>}
      <p className="top-note">{t('topRecDvHow')}</p>
    </TopCard>
  );
}
