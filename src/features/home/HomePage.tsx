import { useEffect, useId, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import {
  ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, FolderOpen, Globe2, Hexagon, Keyboard, Languages, Lock,
  Save, ScrollText, Share2, Sparkles, Swords, Trophy, Users, Workflow,
} from 'lucide-react';
import type { ClassType, Lang } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { NORMAL_COLS, STIGMA_COLS, isEmptyBuild, slotKey } from '../../state/build';
import { PLANNER_FLOW, lastTab, type PlannerPath } from '../../state/plannerFlow';
import type { StringKey } from '../../i18n/strings';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { LevelControl } from '../../components/LevelControl';
import { SkillTile } from '../../components/SkillTile';
import { Meter } from '../../components/ui';
import { useBuildActions } from '../../components/BuildActions';
import { MQ, matches } from '../../components/hooks';
import { BuildCard } from '../community/BuildCard';
import { COMMUNITY_ENABLED, listBuilds, type BuildSummary } from '../../lib/communityApi';
import { useSavedBuilds } from '../../state/savedBuilds';
import { useLoadSaved } from '../../components/SavedBuildsDialog';
import { classSkills, daevanionTotals, shardBudget, shardsSpent, shownLevel, skillPointBudget, skillPointsSpent } from '../../lib/buildCalc';
import { classCombos, comboReady } from '../../lib/combos';
import { decodeLearned, nodeKey } from '../../lib/daevanionGraph';
import { STIGMA_SLOT_LEVELS, unlockedStigmaSlots } from '../../lib/stigmaRules';
import { CLASS_ROLE, unreleasedClasses } from '../../lib/classInfo';

type StepState = 'todo' | 'busy' | 'done' | 'locked';

const STATE_LABEL: Record<StepState, StringKey> = {
  todo: 'stepStateTodo', busy: 'stepStateBusy', done: 'stepStateDone', locked: 'stepStateLocked',
};
const STEP_CTA: Record<StepState, StringKey> = { todo: 'start', busy: 'continueBuild', done: 'open', locked: 'open' };

/** Names of the planner pages ("Continue where you left off: Stigma"). */
const PAGE_NAME: Record<PlannerPath, StringKey> = {
  '/skills': 'navSkills', '/stigma': 'navStigma', '/daevanion': 'navDaevanion', '/hotbar': 'navHotbar', '/combos': 'navCombos',
};

/** Class guides on the guides page (#/guides/<id>); classes without a guide have no entry. */
const CLASS_GUIDE: Partial<Record<ClassType, string>> = {
  Gladiator: 'gladiator', Templar: 'templar', Assassin: 'assassin', Ranger: 'ranger', Sorcerer: 'sorcerer',
  Elementalist: 'spiritmaster', Cleric: 'cleric', Chanter: 'chanter',
};

/** "2 Oct 2026" / "2. Okt. 2026" – short enough for one line on a phone */
const shortDate = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const FAQ: [StringKey, StringKey][] = [
  ['faq1q', 'faq1a'], ['faq2q', 'faq2a'], ['faq4q', 'faq4a'], ['faq5q', 'faq5a'],
];
const FAQ_DATA_ID = 'faq-data';

function Step({ no, total, href, Icon, title, text, state, progress, status }: {
  no: number; total: number; href: string; Icon: typeof Swords; title: string; text: string;
  state: StepState; progress: number | null; status: ReactNode;
}) {
  const { t } = useLoadedGame();
  return (
    <li>
      <a href={href} className={`step-card ${state}`}>
        <span className="sr-only">{t('stepOf', { n: no, m: total })} · {t(STATE_LABEL[state])}: </span>
        <span className="step-no" aria-hidden>
          {state === 'done' ? <Check size={16} /> : state === 'locked' ? <Lock size={15} /> : no}
        </span>
        <span className="step-title"><Icon size={16} aria-hidden /> {title}</span>
        <span className="step-text">{text}</span>
        {progress != null && (
          <span className="step-track" aria-hidden><span style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }} /></span>
        )}
        <span className="step-status">{status}</span>
        <span className="step-cta" aria-hidden><span className="step-cta-label">{t(STEP_CTA[state])}</span><ArrowRight size={16} /></span>
      </a>
    </li>
  );
}

/** The current build as a product shot: class, skills, stigmas, budgets and the first Daevanion board. */
function HeroBuild({ href }: { href: string }) {
  const { t, data } = useLoadedGame();
  const { build } = useBuild();
  const className = useClassName();
  const fresh = isEmptyBuild(build);
  const skills = classSkills(data, build);
  const actives = skills.filter((s) => s.type === 'active' && !s.isStigma).sort((a, b) => a.acquireLevel - b.acquireLevel || a.id - b.id).slice(0, 8);
  const equipped = build.st.map((x) => (x.id != null ? data.skillById.get(x.id) : undefined)).filter((s): s is NonNullable<typeof s> => !!s);
  const stigmas = (equipped.length ? equipped : skills.filter((s) => s.isStigma)).slice(0, 4);
  const board = data.daevanion.classes[build.c]?.boards[0];
  const learned = board ? decodeLearned(board, build.dv[String(board.id)] ?? '') : new Set<string>();
  const sp = skillPointBudget(data, build);
  const sh = shardBudget(data, build);
  const dv = daevanionTotals(data, build).DaevanionCrystal ?? { spent: 0, max: 0 };
  const name = className(build.c);
  return (
    <a className="lp-build" href={href} aria-label={`${name}, ${t('lv')} ${build.l} – ${t('lpOpenPlanner')}`}>
      <div className="lp-build-head">
        <ClassEmblem cls={build.c} size={46} />
        <div className="lp-build-name">
          <strong>{name}</strong>
          <span>{t('lv')} {build.l} · {t(`role_${CLASS_ROLE[build.c]}` as StringKey)}</span>
        </div>
        <span className="lp-build-open"><span className="hide-sm">{t('lpOpenPlanner')}</span><ArrowRight size={16} aria-hidden /></span>
      </div>
      <div className="lp-build-row actives">
        {actives.map((s) => (
          <SkillTile key={s.id} skill={s} level={shownLevel(data, build, s)} size={44} tip={false} showCd={false} showLevel={!fresh} />
        ))}
      </div>
      <div className="lp-build-row stigmas">
        {stigmas.map((s) => (
          <SkillTile key={s.id} skill={s} level={shownLevel(data, build, s)} size={40} tip={false} showCd={false} showLevel={!fresh && equipped.length > 0} />
        ))}
        <span className="lp-build-label">{t('stigma')}</span>
      </div>
      <div className="lp-build-meters">
        <Meter label={t('skillPoints')} spent={skillPointsSpent(data, build)} max={sp.total} />
        <Meter label={t('stigmaShards')} spent={shardsSpent(data, build)} max={sh.total} />
        <Meter label={t('daevanionPts')} spent={dv.spent} max={dv.max} />
      </div>
      {board && (
        <div className="lp-board" aria-hidden>
          {board.nodes.map((n) => (
            <span
              key={nodeKey(n)}
              className={`lp-node g-${n.grade} k-${n.kind} ${learned.has(nodeKey(n)) ? 'on' : ''}`}
              style={{ gridColumn: n.y, gridRow: n.x } as CSSProperties}
            />
          ))}
        </div>
      )}
      {fresh && <p className="lp-build-note">{t('lpPreviewEmpty')}</p>}
    </a>
  );
}

export function HomePage() {
  const { t, data, lang } = useLoadedGame();
  const { build, setClass, picked } = useBuild();
  const className = useClassName();
  const actions = useBuildActions();
  const [latest, setLatest] = useState<BuildSummary[] | null>(null);
  const saved = useSavedBuilds();
  const loadSaved = useLoadSaved();
  const pickTitleId = useId();
  const pickHintId = useId();
  const stepsTitleId = useId();

  useEffect(() => {
    if (!COMMUNITY_ENABLED) return;
    listBuilds({ sort: 'new', limit: 3 }).then((r) => setLatest(r.items), () => setLatest(null));
  }, []);

  const unreleased = unreleasedClasses(data);
  const classes = [...data.classes].sort((a, b) => Number(unreleased.has(a.classType)) - Number(unreleased.has(b.classType)));
  const playable = classes.filter((c) => !unreleased.has(c.classType)).length;
  const fresh = isEmptyBuild(build);
  const cls = className(build.c);
  // returning players continue on the planner page they used last
  const resume = lastTab();
  const planHref = fresh ? '#/skills' : `#${resume}`;
  const guideId = CLASS_GUIDE[build.c];

  // progress of the planner steps (same order as the planner tabs)
  const sp = skillPointBudget(data, build);
  const spSpent = skillPointsSpent(data, build);
  const slots = unlockedStigmaSlots(build.l);
  const equipped = build.st.filter((s, i) => s.id != null && i < slots).length;
  const shards = shardBudget(data, build);
  const dv = daevanionTotals(data, build).DaevanionCrystal ?? { spent: 0, max: 0 };
  const barCount = Object.keys(build.bar).length;
  // the hotbar counts as done once the main row has its 8 keys and the macro has steps
  const mainKeys = [...NORMAL_COLS, ...STIGMA_COLS].filter((c) => build.bar[slotKey(0, c)] != null).length;
  const macroSteps = build.macros[0]?.steps.length ?? 0;
  const hotbarScore = Math.min(mainKeys, 8) + (macroSteps > 0 ? 2 : 0);
  const combos = classCombos(data, build);
  const readyCombos = combos.filter((c) => comboReady(data, build, c)).length;
  const state = (v: number, max: number): StepState => (v <= 0 ? 'todo' : v >= max ? 'done' : 'busy');
  const total = PLANNER_FLOW.length;

  // arrow keys move through the class grid (3 columns at every width)
  const onGridKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 } as Record<string, number>)[e.key];
    if (!step) return;
    const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('button')];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    // up in the top row / down in the bottom row stays put (clamping would jump sideways)
    items[i + step]?.focus();
  };

  // the data line opens the FAQ answer about the data source
  const openDataFaq = () => {
    const d = document.getElementById(FAQ_DATA_ID) as HTMLDetailsElement | null;
    if (!d) return;
    d.open = true;
    d.scrollIntoView({ behavior: matches(MQ.reducedMotion) ? 'auto' : 'smooth', block: 'center' });
    d.querySelector('summary')?.focus({ preventScroll: true });
  };

  const tools: { href: string; title: StringKey; text: StringKey; Icon: typeof Swords; tone: string }[] = [
    { href: '#/database', title: 'navDatabase', text: 'homeDatabaseText', Icon: BookOpen, tone: 'slate' },
    { href: '#/guides', title: 'navGuides', text: 'homeGuidesText', Icon: ScrollText, tone: 'rose' },
    { href: '#/top', title: 'navTop', text: 'homeTopText', Icon: Trophy, tone: 'gold' },
    ...(COMMUNITY_ENABLED ? [{ href: '#/community', title: 'navCommunity' as StringKey, text: 'homeCommunityText' as StringKey, Icon: Users, tone: 'teal' }] : []),
  ];

  return (
    <div className="page home landing">
      <section className="lp-hero">
        <div className="lp-hero-text">
          <span className="lp-kicker"><Sparkles size={14} aria-hidden /> {t('lpKicker')}</span>
          <h1 className="lp-title">{t('appTitle')}</h1>
          <p className="lp-claim">{t('lpClaim')}</p>

          {/* 1. the class first: both paths and the preview follow it */}
          <div className={`lp-pick ${picked ? '' : 'unpicked'}`}>
            <div className="lp-pick-head">
              <div className="lp-pick-titles">
                <h2 id={pickTitleId} className="lp-pick-title">{t('pickClassTitle')}</h2>
                <p id={pickHintId} className={`field-hint ${picked ? '' : 'lp-pick-first'}`}>{picked ? t('pickClassText') : t('lpPickFirst')}</p>
              </div>
              <div className="home-level">
                <label htmlFor="home-level" className="home-level-label">{t('charLevel')}</label>
                <LevelControl slider={false} id="home-level" />
              </div>
            </div>
            <div className="class-grid" role="group" aria-labelledby={pickTitleId} aria-describedby={pickHintId} onKeyDown={onGridKey}>
              {classes.map((c) => {
                const on = picked && c.classType === build.c;
                const off = unreleased.has(c.classType);
                return (
                  <button
                    key={c.classType}
                    type="button"
                    aria-pressed={on}
                    className={`class-tile${on ? ' on' : ''}${off ? ' off' : ''}`}
                    onClick={() => setClass(c.classType)}
                  >
                    <ClassEmblem cls={c.classType} size={36} />
                    <span className="ct-text">
                      <strong>{c.name}</strong>
                      <span className="ct-role">{off ? t('notOnGlobal') : t(`role_${CLASS_ROLE[c.classType]}` as StringKey)}</span>
                    </span>
                    {on && <Check size={14} className="class-check" aria-hidden />}
                    {off && !on && <Lock size={13} className="class-lock" aria-hidden />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. two ways in: plan the build, or learn the class first */}
          <div className="lp-paths">
            <a className="lp-path plan" href={planHref}>
              <span className="lp-path-icon" aria-hidden><Swords size={20} /></span>
              <span className="lp-path-text">
                <strong>{!picked ? t('lpCtaPlan') : fresh ? t('lpPathPlan', { cls }) : t('lpPathContinue', { cls })}</strong>
                <span>{fresh ? t('lpPathPlanText') : t('lpPathContinueText', { page: t(PAGE_NAME[resume]) })}</span>
              </span>
              <ArrowRight size={18} className="lp-path-go" aria-hidden />
            </a>
            <a className="lp-path guide" href={picked && guideId ? `#/guides/${guideId}` : '#/guides'}>
              <span className="lp-path-icon" aria-hidden><ScrollText size={20} /></span>
              <span className="lp-path-text">
                <strong>{picked && guideId ? t('lpClassGuide', { cls }) : t('lpCtaGuide')}</strong>
                <span>{t('lpPathGuideText')}</span>
              </span>
              <ArrowRight size={18} className="lp-path-go" aria-hidden />
            </a>
          </div>

          {/* 3. where the numbers come from */}
          <div className="lp-trust">
            {data.meta && (
              <button type="button" className="data-badge" onClick={openDataFaq}>
                <Globe2 size={14} aria-hidden />
                <span>{t('lpDataLine', { date: data.meta.updatedAt ? shortDate(data.meta.updatedAt, lang) : '–' })}</span>
                <ArrowDown size={14} aria-hidden className="data-badge-go" />
                <span className="sr-only"> – {t('faq2q')}</span>
              </button>
            )}
            <ul className="lp-facts">
              <li><Users size={14} aria-hidden /> {t('lpFactClasses', { n: playable })}</li>
              <li><Swords size={14} aria-hidden /> {t('lpFactSkills', { n: data.skills.filter((s) => !unreleased.has(s.classType)).length })}</li>
              <li><Languages size={14} aria-hidden /> {t('lpFactLang')}</li>
            </ul>
          </div>
        </div>
        <div className="lp-hero-visual"><HeroBuild href={planHref} /></div>
      </section>

      <section aria-labelledby={stepsTitleId}>
        <div className="home-head">
          <div>
            <h2 id={stepsTitleId}>{picked ? t('stepsTitle', { cls }) : t('stepsTitleAny')}</h2>
            <p>{t('lpFeaturesText')}</p>
          </div>
        </div>
        <ol className="steps">
          <Step no={1} total={total} href="#/skills" Icon={Swords} title={t('stepSkills')} text={t('stepSkillsText')}
            state={state(spSpent, sp.total)} progress={sp.total ? spSpent / sp.total : 0}
            status={t('stepPoints', { a: spSpent, b: sp.total })} />
          <Step no={2} total={total} href="#/stigma" Icon={Sparkles} title={t('stepStigma')} text={t('stepStigmaText')}
            state={slots === 0 ? 'locked' : state(equipped, slots)} progress={slots ? equipped / slots : null}
            status={slots === 0
              ? t('lockedUntil', { lvl: STIGMA_SLOT_LEVELS[0] })
              : t('stepStigmaStatus', { a: equipped, b: slots, s: shardsSpent(data, build), m: shards.total })} />
          <Step no={3} total={total} href="#/daevanion" Icon={Hexagon} title={t('stepDaevanion')} text={t('stepDaevanionText')}
            state={state(dv.spent, dv.max)} progress={dv.max ? dv.spent / dv.max : 0}
            status={t('stepPoints', { a: dv.spent, b: dv.max })} />
          <Step no={4} total={total} href="#/hotbar" Icon={Keyboard} title={t('stepHotbar')} text={t('stepHotbarText')}
            state={state(barCount || macroSteps ? Math.max(1, hotbarScore) : 0, 10)} progress={hotbarScore / 10}
            status={t('stepHotbarStatus', { n: barCount, m: macroSteps })} />
          <Step no={5} total={total} href="#/combos" Icon={Workflow} title={t('stepCombos')} text={t('stepCombosText')}
            state={fresh || !combos.length ? 'todo' : state(readyCombos, combos.length)}
            progress={combos.length && !fresh ? readyCombos / combos.length : null}
            status={combos.length ? t('stepCombosStatus', { a: readyCombos, b: combos.length }) : t('stepCombosNone')} />
        </ol>
        <div className="home-share">
          <span>{t('shareHint')}</span>
          <button type="button" className="btn ghost" onClick={actions.openSavedBuilds}><Save size={16} aria-hidden /> {t('saveBuild')}</button>
          <button type="button" className="btn" onClick={() => { void actions.share(build); }}><Share2 size={16} aria-hidden /> {t('share')}</button>
        </div>
      </section>

      {saved.length > 0 && (
        <section>
          <div className="home-head">
            <h2>{t('myBuilds')}</h2>
            <button type="button" className="link home-link" onClick={actions.openSavedBuilds}>{t('manage')} <ArrowRight size={14} aria-hidden /></button>
          </div>
          <div className="saved-grid">
            {saved.slice(0, 6).map((e) => (
              <button key={e.id} type="button" className="saved-tile" onClick={() => { if (loadSaved(e)) location.hash = '/skills'; }}>
                <ClassEmblem cls={e.build.c} size={40} />
                <div>
                  <strong>{e.name}</strong>
                  <span>{className(e.build.c)} · {t('lv')} {e.build.l}</span>
                </div>
                <FolderOpen size={16} className="push muted" aria-hidden />
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="home-head"><h2>{t('lpToolsTitle')}</h2></div>
        <div className="lp-features">
          {tools.map(({ href, title, text, Icon, tone }) => (
            <a key={href} href={href} className={`lp-feature tone-${tone}`}>
              <span className="tool-icon" aria-hidden><Icon size={20} /></span>
              <strong>{t(title)}</strong>
              <p>{t(text)}</p>
              <span className="tool-open" aria-hidden><span className="tool-open-label">{t('open')}</span><ArrowRight size={16} /></span>
            </a>
          ))}
        </div>
      </section>

      {latest && latest.length > 0 && (
        <section>
          <div className="home-head">
            <h2>{t('latestBuilds')}</h2>
            <a href="#/community" className="home-link">{t('viewAll')} <ArrowRight size={14} aria-hidden /></a>
          </div>
          <div className="build-grid">
            {latest.map((b) => <BuildCard key={b.id} b={b} />)}
          </div>
        </section>
      )}

      <section className="lp-faq">
        <div className="home-head"><h2>{t('faqTitle')}</h2></div>
        <div className="faq-list">
          {FAQ.map(([q, a]) => (
            <details key={q} className="faq" id={q === 'faq2q' ? FAQ_DATA_ID : undefined}>
              <summary>{t(q)} <ChevronDown size={16} aria-hidden /></summary>
              <p>{t(a)}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
