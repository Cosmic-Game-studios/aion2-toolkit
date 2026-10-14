import { useGame } from '../data/GameDataContext';

export function Credits() {
  const { t } = useGame();
  return (
    <footer className="credits">
      <p>{t('credits')}</p>
    </footer>
  );
}
