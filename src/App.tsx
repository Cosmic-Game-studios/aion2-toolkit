import { useEffect, useState } from 'react';
import { useGame } from './data/GameDataContext';
import { readHash } from './lib/shareLink';
import { LangSwitch } from './components/LangSwitch';
import { Credits } from './components/Credits';
import { SkillCalculator } from './features/skills/SkillCalculator';
import { SkillDatabase } from './features/database/SkillDatabase';
import { StigmaCalculator } from './features/stigma/StigmaCalculator';
import { DaevanionCalculator } from './features/daevanion/DaevanionCalculator';

const ROUTES = [
  { path: '/skills', key: 'navSkills', Comp: SkillCalculator },
  { path: '/database', key: 'navDatabase', Comp: SkillDatabase },
  { path: '/stigma', key: 'navStigma', Comp: StigmaCalculator },
  { path: '/daevanion', key: 'navDaevanion', Comp: DaevanionCalculator },
] as const;

export default function App() {
  const { t, data, error } = useGame();
  const [route, setRoute] = useState(() => readHash().route);

  useEffect(() => {
    const onHash = () => setRoute(readHash().route);
    window.addEventListener('hashchange', onHash);
    if (!location.hash) location.hash = '/skills';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const current = ROUTES.find((r) => r.path === route) ?? ROUTES[0];
  const Page = current.Comp;

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#/skills">
          <span className="brand-mark">A2</span>
          <span>{t('appTitle')}</span>
        </a>
        <nav className="nav">
          {ROUTES.map((r) => (
            <a key={r.path} href={`#${r.path}`} className={r.path === current.path ? 'active' : ''}>
              {t(r.key)}
            </a>
          ))}
        </nav>
        <LangSwitch />
      </header>
      <main className="main">
        {error ? (
          <p className="notice error">{t('loadError', { msg: error })}</p>
        ) : !data ? (
          <p className="notice">{t('loading')}</p>
        ) : (
          <Page key={`${current.path}-${data.lang}`} />
        )}
      </main>
      <Credits />
    </div>
  );
}
