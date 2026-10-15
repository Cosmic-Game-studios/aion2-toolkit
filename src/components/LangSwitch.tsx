import { Languages } from 'lucide-react';
import { useGame } from '../data/GameDataContext';

/** EN / DE. Switching keeps the page and its state; the new texts arrive when the data of that language has loaded.
 *  The accessible name starts with the visible "EN" / "DE" (voice control) and adds the language's own name. */
export function LangSwitch() {
  const { lang, setLang, t, loading, data } = useGame();
  const busy = loading && !!data;
  return (
    <div className={`lang-switch ${busy ? 'busy' : ''}`} role="group" aria-label={t('language')} aria-busy={busy}>
      <Languages size={15} aria-hidden />
      <button type="button" className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} lang="en" onClick={() => setLang('en')}>EN<span className="sr-only"> – English</span></button>
      <button type="button" className={lang === 'de' ? 'active' : ''} aria-pressed={lang === 'de'} lang="de" onClick={() => setLang('de')}>DE<span className="sr-only"> – Deutsch</span></button>
    </div>
  );
}
