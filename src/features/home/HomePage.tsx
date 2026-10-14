import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Hexagon, Keyboard, Sparkles, Swords, Users } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import type { StringKey } from '../../i18n/strings';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { BuildFacts } from '../community/UploadDialog';
import { BuildCard } from '../community/BuildCard';
import { listBuilds, type BuildSummary } from '../../lib/communityApi';

const TOOLS: { href: string; title: StringKey; text: StringKey; Icon: typeof Swords; tone: string }[] = [
  { href: '#/skills', title: 'navSkills', text: 'homeSkillsText', Icon: Swords, tone: 'blue' },
  { href: '#/hotbar', title: 'navHotbar', text: 'homeHotbarText', Icon: Keyboard, tone: 'teal' },
  { href: '#/stigma', title: 'navStigma', text: 'homeStigmaText', Icon: Sparkles, tone: 'violet' },
  { href: '#/daevanion', title: 'navDaevanion', text: 'homeDaevanionText', Icon: Hexagon, tone: 'gold' },
  { href: '#/database', title: 'navDatabase', text: 'homeDatabaseText', Icon: BookOpen, tone: 'slate' },
  { href: '#/community', title: 'navCommunity', text: 'homeCommunityText', Icon: Users, tone: 'rose' },
];

export function HomePage() {
  const { t } = useLoadedGame();
  const { build } = useBuild();
  const className = useClassName();
  const [latest, setLatest] = useState<BuildSummary[] | null>(null);

  useEffect(() => {
    listBuilds({ sort: 'new', limit: 3 }).then((r) => setLatest(r.items), () => setLatest(null));
  }, []);

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-text">
          <h1>{t('homeHeroTitle')}</h1>
          <p>{t('homeHeroText')}</p>
          <div className="hero-actions">
            <a className="btn primary lg" href="#/skills"><Swords size={18} /> {t('navSkills')}</a>
            <a className="btn ghost lg" href="#/community"><Users size={18} /> {t('navCommunity')}</a>
          </div>
        </div>
        <a className="hero-build card" href="#/skills">
          <span className="eyebrow">{t('yourBuild')}</span>
          <div className="hb-class">
            <ClassEmblem cls={build.c} size={56} />
            <div>
              <strong>{className(build.c)}</strong>
              <span className="muted">{t('lv')} {build.l}</span>
            </div>
          </div>
          <BuildFacts build={build} />
          <span className="hb-cta">{t('continueBuild')} <ArrowRight size={16} /></span>
        </a>
      </section>

      <section className="tool-grid">
        {TOOLS.map(({ href, title, text, Icon, tone }) => (
          <a key={href} href={href} className={`tool-tile tone-${tone}`}>
            <span className="tool-icon"><Icon size={22} /></span>
            <strong>{t(title)}</strong>
            <p>{t(text)}</p>
            <span className="tool-open">{t('open')} <ArrowRight size={14} /></span>
          </a>
        ))}
      </section>

      {latest && latest.length > 0 && (
        <section>
          <div className="section-head">
            <h2>{t('latestBuilds')}</h2>
            <a href="#/community" className="link">{t('viewAll')} <ArrowRight size={14} /></a>
          </div>
          <div className="build-grid">
            {latest.map((b) => <BuildCard key={b.id} b={b} />)}
          </div>
        </section>
      )}
    </div>
  );
}
