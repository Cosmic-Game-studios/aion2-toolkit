import { Languages } from 'lucide-react';
import { useGame } from '../data/GameDataContext';

export function LangSwitch() {
  const { lang, setLang, t } = useGame();
  return (
    <div className="lang-switch" role="group" aria-label={t('language')}>
      <Languages size={15} aria-hidden />
      <button type="button" className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      <button type="button" className={lang === 'de' ? 'active' : ''} aria-pressed={lang === 'de'} onClick={() => setLang('de')}>DE</button>
    </div>
  );
}
