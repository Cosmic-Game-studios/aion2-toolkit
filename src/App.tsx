import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type ComponentType } from 'react';
import { BookOpen, ChevronRight, Hexagon, Home, Keyboard, LayoutGrid, Map as MapIcon, RefreshCw, ScrollText, Sparkles, Swords, TriangleAlert, Trophy, Users, Workflow, type LucideIcon } from 'lucide-react';
import { useGame } from './data/GameDataContext';
import type { StringKey } from './i18n/strings';
import { readHash } from './lib/shareLink';
import { COMMUNITY_ENABLED } from './lib/communityApi';
import { useBuild } from './state/BuildContext';
import { lastTab, rememberTab } from './state/plannerFlow';
import { LangSwitch } from './components/LangSwitch';
import { Credits } from './components/Credits';
import { BudgetPill, BuildBar } from './components/BuildBar';
import { AdSlot, adsOn } from './components/AdSlot';
import { ClassEmblem, useClassName } from './components/ClassSelect';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NextStep } from './components/NextStep';
import { DataUpdateNotice, SharedLinkBanner } from './components/ShellNotices';
import { MQ, matches, useMediaQuery } from './components/hooks';
import { HomePage } from './features/home/HomePage';
import { SkillCalculator } from './features/skills/SkillCalculator';
import { HotbarPage } from './features/hotbar/HotbarPage';
import { SkillDatabase } from './features/database/SkillDatabase';
import { StigmaCalculator } from './features/stigma/StigmaCalculator';
import { DaevanionCalculator } from './features/daevanion/DaevanionCalculator';
import { CommunityPage } from './features/community/CommunityPage';
import { CombosPage } from './features/combos/CombosPage';
import { QuickSearch, SearchButton, useQuickSearch, type SearchPage } from './features/search/QuickSearch';

// the biggest page loads on demand: all guide texts
const GuidesPage = lazy(() => import('./features/guides/GuidesPage').then((m) => ({ default: m.GuidesPage })));
// the top 10 per class (its data loads with the page, per class)
const TopPage = lazy(() => import('./features/top/TopPage').then((m) => ({ default: m.TopPage })));
// the farm map: spots players found in the game (its data loads with the page)
const FarmPage = lazy(() => import('./features/farm/FarmPage').then((m) => ({ default: m.FarmPage })));

type Group = 'start' | 'planner' | 'knowledge' | 'community';

interface RouteDef {
  path: string; key: StringKey; Icon: LucideIcon; Comp: ComponentType<{ param: string | null; visit: number }>;
  /** section in the desktop sidebar */
  group: Group;
  /** shows the build bar (class, level, points) */
  planner?: boolean;
  /** one of the planner tabs; the top navigation shows them as one "Planner" entry */
  tab?: boolean;
  /** shorter label for the phone navigation and the phone tab grid */
  short?: StringKey;
  /** more addresses that open the page (a shorter or an older name) */
  alias?: string[];
}

// planner tabs in the order a build is filled in (same as PLANNER_FLOW)
const ROUTES: RouteDef[] = [
  { path: '/', key: 'navHome', Icon: Home, Comp: HomePage, group: 'start' },
  { path: '/skills', key: 'navSkills', Icon: Swords, Comp: SkillCalculator, group: 'planner', planner: true, tab: true },
  { path: '/stigma', key: 'navStigma', Icon: Sparkles, Comp: StigmaCalculator, group: 'planner', planner: true, tab: true },
  { path: '/daevanion', key: 'navDaevanion', Icon: Hexagon, Comp: DaevanionCalculator, group: 'planner', planner: true, tab: true },
  { path: '/hotbar', key: 'navHotbar', short: 'navHotbarShort', Icon: Keyboard, Comp: HotbarPage, group: 'planner', planner: true, tab: true },
  { path: '/combos', key: 'navCombos', Icon: Workflow, Comp: CombosPage, group: 'planner', planner: true, tab: true },
  { path: '/database', key: 'navDatabase', Icon: BookOpen, Comp: SkillDatabase, group: 'knowledge' },
  { path: '/guides', key: 'navGuides', Icon: ScrollText, Comp: GuidesPage, group: 'knowledge' },
  { path: '/top', key: 'navTop', Icon: Trophy, Comp: TopPage, group: 'knowledge' },
  { path: '/farm', alias: ['/map'], key: 'navFarm', short: 'navFarmShort', Icon: MapIcon, Comp: FarmPage, group: 'knowledge' },
  { path: '/community', key: 'navCommunity', Icon: Users, Comp: CommunityPage, group: 'community' },
];

const GROUP_LABEL: Record<Group, StringKey | null> = {
  start: null, planner: 'navPlanner', knowledge: 'navGroupKnowledge', community: 'navCommunity',
};

const TABS = ROUTES.filter((r) => r.tab);
const visible = (r: RouteDef) => COMMUNITY_ENABLED || r.path !== '/community';
// the pages the quick search offers (Ctrl+K), in the order of the sidebar
const SEARCH_PAGES: SearchPage[] = ROUTES.filter(visible).map(({ path, key, Icon, group }) => ({ path, key, Icon, group: GROUP_LABEL[group] }));
const RAIL = '(min-width: 1200px) and (max-width: 1439px)';

// named by its label: the text is hidden in the icon rail, on laptops with the link row and on small phones
function Brand() {
  const { t } = useGame();
  return (
    <a className="brand" href="#/" aria-label={`${t('appTitle')} – ${t('navHome')}`}>
      <span className="brand-mark" aria-hidden>
        <svg viewBox="0 0 32 32" width="30" height="30"><path d="M16 2 4 9v14l12 7 12-7V9z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 8l-6 14h3l3-7 3 7h3z" fill="currentColor" /></svg>
      </span>
      <span className="brand-text">
        <strong>{t('appTitle')}</strong>
        <small>{t('appTagline')}</small>
      </span>
    </a>
  );
}

/** Class and level of the current build, at the foot of the sidebar. */
function SidebarBuild({ rail }: { rail: boolean }) {
  const { t } = useGame();
  const { build } = useBuild();
  const className = useClassName();
  const label = `${className(build.c)} · ${t('lv')} ${build.l}`;
  return (
    <a className="sb-build" href={`#${lastTab()}`} title={rail ? `${t('sidebarBuild')}: ${label}` : undefined}>
      <ClassEmblem cls={build.c} size={32} />
      {/* class and level on their own lines: German class names with the level do not fit one line */}
      <span className="sb-build-text">
        <small>{t('sidebarBuild')}</small>
        <strong>{className(build.c)}</strong>
        <span className="sb-build-lv">{t('lv')} {build.l}</span>
      </span>
      <ChevronRight size={15} aria-hidden />
    </a>
  );
}

/** Shown while the game data loads for the first time: the frame of a page instead of a blank screen. */
function LoadingView({ home }: { home: boolean }) {
  const { t } = useGame();
  return (
    <div className={`boot ${home ? 'boot-home' : ''}`} aria-busy="true">
      {home ? (
        <div className="boot-hero">
          <span className="boot-title">{t('appTitle')}</span>
          <span className="boot-claim">{t('appTagline')}</span>
        </div>
      ) : (
        <div className="boot-head"><span className="sk sk-icon" /><span className="sk sk-title" /></div>
      )}
      <div className="loading" role="status"><span className="spinner" aria-hidden />{t('loading')}</div>
      <div className="boot-cards" aria-hidden><span className="sk sk-card" /><span className="sk sk-card" /></div>
    </div>
  );
}

/** Game data could not be loaded: a way out instead of a raw error line. */
function LoadErrorView() {
  const { t, error, retry, loading } = useGame();
  return (
    <div className="state-card error" role="alert">
      <TriangleAlert size={28} aria-hidden />
      <h2>{t('loadErrorTitle')}</h2>
      <p>{t('loadErrorText')}</p>
      <div className="state-actions">
        <button type="button" className="btn primary" onClick={retry} disabled={loading}>
          <RefreshCw size={16} aria-hidden className={loading ? 'spin' : ''} /> {t('tryAgain')}
        </button>
      </div>
      {error && (
        <details className="state-details">
          <summary>{t('errorDetails')}</summary>
          <code>{error}</code>
        </details>
      )}
    </div>
  );
}

export default function App() {
  const { t, data, error, loading, lang } = useGame();
  const [hash, setHash] = useState(readHash);
  const mainRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const rail = useMediaQuery(RAIL);
  // the ad column only exists where it is shown (an ad in a hidden column would still load)
  const adColumn = useMediaQuery('(min-width: 1880px)');
  const search = useQuickSearch();

  // counts every visit of an address, also a click on a link to the address already shown (no hashchange there),
  // so a page can select its deep-link target again after the player picked something else
  const [visit, setVisit] = useState(0);
  useEffect(() => {
    const onHash = () => { setHash(readHash()); setVisit((v) => v + 1); };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (a && a.hash === location.hash) setVisit((v) => v + 1);
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('hashchange', onHash); document.removeEventListener('click', onClick); };
  }, []);

  const current = ROUTES.find((r) => r.path === hash.base || r.alias?.includes(hash.base)) ?? ROUTES[0];
  const Page = current.Comp;

  // a new page starts at the top and screen readers continue in the content (not when only a page parameter changed)
  const firstBase = useRef(true);
  useEffect(() => {
    if (firstBase.current) { firstBase.current = false; return; }
    window.scrollTo({ top: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [current.path]);

  useEffect(() => { if (current.tab) rememberTab(current.path); }, [current]);

  // browser tab title per page (layout effect: a page's own useDocumentTitle runs later and wins)
  useLayoutEffect(() => {
    document.title = current.path === '/' ? t('docTitleHome') : `${t(current.key)} – Daevaforge`;
  }, [current, lang, t]);

  // phones: keep the active planner tab in view
  useEffect(() => {
    tabsRef.current?.querySelector<HTMLElement>('a.on')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [current.path]);

  // top and bottom navigation: the planner tabs count as one "Planner" entry
  const navItems = [
    { path: current.tab ? current.path : lastTab(), key: 'navPlanner' as StringKey, short: 'navPlanner' as StringKey, Icon: LayoutGrid, active: !!current.tab },
    ...ROUTES.filter((r) => r.path !== '/' && !r.tab && visible(r))
      .map((r) => ({ path: r.path, key: r.key, short: r.short ?? r.key, Icon: r.Icon, active: r.path === current.path })),
  ];
  // phones: Home is a bottom item too while there is room for it (at most five items)
  const bottomItems = navItems.length < 5
    ? [{ path: '/', key: 'navHome' as StringKey, short: 'navHome' as StringKey, Icon: Home, active: current.path === '/' }, ...navItems]
    : navItems;
  const groups = (Object.keys(GROUP_LABEL) as Group[])
    .map((g) => ({ g, routes: ROUTES.filter((r) => r.group === g && visible(r)) }))
    .filter((x) => x.routes.length);

  const switching = loading && !!data;
  const notices = !!data && (current.path === '/' || !!current.planner);

  return (
    <div className="app">
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }}>{t('skipToContent')}</a>
      {switching && <div className="lang-progress" role="progressbar" aria-label={t('loading')} />}

      {/* desktop: all pages in one sidebar (an icon rail up to 1439 px), the build bar stays on top of the content */}
      <aside className="sidebar">
        <Brand />
        <SearchButton look="field" rail={rail} onOpen={search.show} />
        <nav className="sb-nav" aria-label={t('mainNav')}>
          {groups.map(({ g, routes }) => (
            <div key={g} className="sb-group">
              {GROUP_LABEL[g] && g !== 'community' && <span className="sb-group-title">{t(GROUP_LABEL[g]!)}</span>}
              {routes.map(({ path, key, Icon }) => {
                const active = path === current.path;
                return (
                  <a key={path} href={`#${path}`} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} title={rail ? t(key) : undefined}>
                    <Icon size={18} aria-hidden />
                    <span className="sb-label">{t(key)}</span>
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          {data && <SidebarBuild rail={rail} />}
          <LangSwitch />
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <Brand />
          <nav className="nav" aria-label={t('mainNav')}>
            {navItems.map(({ path, key, Icon, active }) => (
              <a key={key} href={`#${path}`} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>
                <Icon size={16} aria-hidden />
                <span>{t(key)}</span>
              </a>
            ))}
          </nav>
          {data && current.planner && <BudgetPill page={current.path} />}
          <SearchButton look="icon" onOpen={search.show} />
          <LangSwitch />
        </header>

        {current.tab && (
          <nav className="planner-tabs" aria-label={t('plannerTabs')}>
            <div className="planner-tabs-inner" ref={tabsRef}>
              {TABS.map(({ path, key, short, Icon }, i) => {
                const on = path === current.path;
                return (
                  // the visible label switches between .pt-label and .pt-short with the width, so the name is set here
                  <a key={path} href={`#${path}`} className={on ? 'on' : ''} aria-current={on ? 'page' : undefined} aria-label={t(key)}>
                    <span className="pt-no" aria-hidden>{i + 1}</span>
                    <Icon size={16} aria-hidden />
                    <span className="pt-label">{t(key)}</span>
                    <span className="pt-short" aria-hidden>{t(short ?? key)}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        )}
        {data && current.planner && <BuildBar page={current.path} />}

        <main className="main" id="main" tabIndex={-1} ref={mainRef} aria-busy={switching || undefined}>
          {notices && <SharedLinkBanner />}
          {notices && <DataUpdateNotice />}
          {!data ? (
            error ? <LoadErrorView /> : <LoadingView home={current.path === '/'} />
          ) : (
            <ErrorBoundary resetKey={current.path}>
              <Suspense fallback={<LoadingView home={false} />}>
                {/* keyed by page only: switching EN/DE keeps filters, selections and inputs */}
                <Page key={current.path} param={hash.param} visit={visit} />
              </Suspense>
              {current.tab && <NextStep page={current.path} />}
            </ErrorBoundary>
          )}
        </main>
        <Credits />
      </div>

      {/* very wide screens: optional ad column (nothing loads unless configured) */}
      {adsOn('rail') && adColumn && (
        <aside className="ad-rail">
          <div className="ad-rail-inner"><AdSlot kind="rail" /></div>
        </aside>
      )}

      {/* phones and tablets: the main navigation sits at the bottom, within thumb reach */}
      <nav className="bottom-nav" aria-label={t('mainNav')}>
        {bottomItems.map(({ path, key, short, Icon, active }) => (
          <a
            key={key}
            href={`#${path}`}
            className={active ? 'active' : ''}
            aria-current={active ? 'page' : undefined}
            // the active item scrolls back to the top (the hash does not change, so nothing else would happen)
            onClick={(e) => { if (active && readHash().base === hash.base) { e.preventDefault(); window.scrollTo({ top: 0, behavior: matches(MQ.reducedMotion) ? 'auto' : 'smooth' }); } }}
          >
            <span className="bn-icon"><Icon size={20} aria-hidden /></span>
            <span className="bn-label">{t(short)}</span>
          </a>
        ))}
      </nav>

      <QuickSearch open={search.open} onClose={search.hide} pages={SEARCH_PAGES} />
    </div>
  );
}
