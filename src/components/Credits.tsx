import { Globe2 } from 'lucide-react';
import { useGame } from '../data/GameDataContext';
import { fmtDate } from '../lib/format';

export function Credits() {
  const { t, data, lang } = useGame();
  const meta = data?.meta;
  return (
    <footer className="credits">
      {meta && (
        <p className="data-status">
          <Globe2 size={13} aria-hidden /> {t('dataStatus', { date: meta.updatedAt ? fmtDate(meta.updatedAt, lang) : '–' })}
        </p>
      )}
      <p>{t('credits')}</p>
    </footer>
  );
}
