import { useGame } from '../data/GameDataContext';

export function LangSwitch() {
  const { lang, setLang, t } = useGame();
  return (
    <div className="lang-switch" role="group" aria-label={t('language')}>
      <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      <button type="button" className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>DE</button>
    </div>
  );
}
