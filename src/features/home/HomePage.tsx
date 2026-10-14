import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, BookOpen, FolderOpen, Hexagon, Keyboard, Sparkles, Swords, Users } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import type { StringKey } from '../../i18n/strings';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { BuildFacts } from '../community/UploadDialog';
import { BuildCard } from '../community/BuildCard';
import { COMMUNITY_ENABLED, listBuilds, type BuildSummary } from '../../lib/communityApi';
import { useSavedBuilds } from '../../state/savedBuilds';
import { SavedBuildsDialog, useLoadSaved } from '../../components/SavedBuildsDialog';

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
  const saved = useSavedBuilds();
  const loadSaved = useLoadSaved();
  const [manageOpen, setManageOpen] = useState(false);
  const closeManage = useCallback(() => setManageOpen(false), []);

  useEffect(() => {
    if (!COMMUNITY_ENABLED) return;
    listBuilds({ sort: 'new', limit: 3 }).then((r) => setLatest(r.items), () => setLatest(null));
  }, []);

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-text">
          <h1>{t('homeHeroTitle')}</h1>
          <p>{t(COMMUNITY_ENABLED ? 'homeHeroText' : 'homeHeroTextLocal')}</p>
          <div className="hero-actions">
            <a className="btn primary lg" href="#/skills"><Swords size={18} /> {t('navSkills')}</a>
            {COMMUNITY_ENABLED
              ? <a className="btn ghost lg" href="#/community"><Users size={18} /> {t('navCommunity')}</a>
              : <a className="btn ghost lg" href="#/hotbar"><Keyboard size={18} /> {t('navHotbar')}</a>}
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
        {TOOLS.filter((x) => COMMUNITY_ENABLED || x.href !== '#/community').map(({ href, title, text, Icon, tone }) => (
          <a key={href} href={href} className={`tool-tile tone-${tone}`}>
            <span className="tool-icon"><Icon size={22} /></span>
            <strong>{t(title)}</strong>
            <p>{t(text)}</p>
            <span className="tool-open">{t('open')} <ArrowRight size={14} /></span>
          </a>
        ))}
      </section>

      {saved.length > 0 && (
        <section>
          <div className="section-head">
            <h2>{t('myBuilds')}</h2>
            <button type="button" className="link" onClick={() => setManageOpen(true)}>{t('manage')} <ArrowRight size={14} /></button>
          </div>
          <div className="saved-grid">
            {saved.slice(0, 6).map((e) => (
              <button key={e.id} type="button" className="saved-tile" onClick={() => { if (loadSaved(e)) location.hash = '/skills'; }}>
                <ClassEmblem cls={e.build.c} size={40} />
                <div>
                  <strong>{e.name}</strong>
                  <span>{className(e.build.c)} · {t('lv')} {e.build.l}</span>
                </div>
                <FolderOpen size={16} className="push muted" />
              </button>
            ))}
          </div>
        </section>
      )}
      {manageOpen && <SavedBuildsDialog onClose={closeManage} />}

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
