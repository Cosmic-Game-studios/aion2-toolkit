import { useEffect, useState, type ComponentType } from 'react';
import { BookOpen, Hexagon, Home, Keyboard, Sparkles, Swords, Users, Workflow, type LucideIcon } from 'lucide-react';
import { useGame } from './data/GameDataContext';
import type { StringKey } from './i18n/strings';
import { readHash } from './lib/shareLink';
import { COMMUNITY_ENABLED } from './lib/communityApi';
import { useBuild } from './state/BuildContext';
import { LangSwitch } from './components/LangSwitch';
import { Credits } from './components/Credits';
import { BuildBar } from './components/BuildBar';
import { useToast } from './components/Toast';
import { HomePage } from './features/home/HomePage';
import { SkillCalculator } from './features/skills/SkillCalculator';
import { HotbarPage } from './features/hotbar/HotbarPage';
import { SkillDatabase } from './features/database/SkillDatabase';
import { StigmaCalculator } from './features/stigma/StigmaCalculator';
import { DaevanionCalculator } from './features/daevanion/DaevanionCalculator';
import { CommunityPage } from './features/community/CommunityPage';
import { CombosPage } from './features/combos/CombosPage';

interface RouteDef { path: string; key: StringKey; Icon: LucideIcon; Comp: ComponentType<{ param: string | null }>; planner?: boolean }

const ROUTES: RouteDef[] = [
  { path: '/', key: 'navHome', Icon: Home, Comp: HomePage },
  { path: '/skills', key: 'navSkills', Icon: Swords, Comp: SkillCalculator, planner: true },
  { path: '/hotbar', key: 'navHotbar', Icon: Keyboard, Comp: HotbarPage, planner: true },
  { path: '/stigma', key: 'navStigma', Icon: Sparkles, Comp: StigmaCalculator, planner: true },
  { path: '/daevanion', key: 'navDaevanion', Icon: Hexagon, Comp: DaevanionCalculator, planner: true },
  { path: '/combos', key: 'navCombos', Icon: Workflow, Comp: CombosPage, planner: true },
  { path: '/database', key: 'navDatabase', Icon: BookOpen, Comp: SkillDatabase },
  { path: '/community', key: 'navCommunity', Icon: Users, Comp: CommunityPage },
];

export default function App() {
  const { t, data, error } = useGame();
  const { importedFromLink } = useBuild();
  const toast = useToast();
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    const onHash = () => { setHash(readHash()); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (importedFromLink && data) toast(t('importedFromLink'), 'info');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importedFromLink, !!data]);

  const current = ROUTES.find((r) => r.path === hash.base) ?? ROUTES[0];
  const Page = current.Comp;

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#/">
          <span className="brand-mark" aria-hidden>
            <svg viewBox="0 0 32 32" width="30" height="30"><path d="M16 2 4 9v14l12 7 12-7V9z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 8l-6 14h3l3-7 3 7h3z" fill="currentColor" /></svg>
          </span>
          <span className="brand-text">
            <strong>{t('appTitle')}</strong>
            <small>{t(COMMUNITY_ENABLED ? 'appTagline' : 'appTaglineLocal')}</small>
          </span>
        </a>
        <nav className="nav" aria-label="Main">
          {ROUTES.filter((r) => r.path !== '/' && (COMMUNITY_ENABLED || r.path !== '/community')).map(({ path, key, Icon }) => (
            <a key={path} href={`#${path}`} className={path === current.path ? 'active' : ''} aria-current={path === current.path ? 'page' : undefined}>
              <Icon size={16} />
              <span>{t(key)}</span>
            </a>
          ))}
        </nav>
        <LangSwitch />
      </header>

      {data && current.planner && <BuildBar />}

      <main className="main">
        {error ? (
          <p className="notice error">{t('loadError', { msg: error })}</p>
        ) : !data ? (
          <div className="loading"><span className="spinner" />{t('loading')}</div>
        ) : (
          <Page key={`${current.path}-${data.lang}`} param={hash.param} />
        )}
      </main>
      <Credits />
    </div>
  );
}
