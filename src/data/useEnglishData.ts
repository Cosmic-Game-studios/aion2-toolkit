import { useEffect, useState } from 'react';
import { useLoadedGame } from './GameDataContext';
import { loadGameData } from './loadData';
import type { GameData } from './types';

/**
 * The English game data next to the UI language. The Daevanion stat priority, the specialisation effects and the
 * database search (English names) read the English data; ids are the same in every language, so results show with
 * the data of the UI language.
 */
export function useEnglishData(): GameData | null {
  const { data } = useLoadedGame();
  const [en, setEn] = useState<GameData | null>(data.lang === 'en' ? data : null);
  useEffect(() => {
    if (data.lang === 'en') { setEn(data); return; }
    let alive = true;
    loadGameData('en').then((d) => { if (alive) setEn(d); }, () => { if (alive) setEn(null); });
    return () => { alive = false; };
  }, [data]);
  return en;
}
