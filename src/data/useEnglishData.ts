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
  return useEnglishDataState().en;
}

/** The English game data and whether loading it failed (`en` stays null then). */
export function useEnglishDataState(): { en: GameData | null; failed: boolean } {
  const { data } = useLoadedGame();
  const [state, setState] = useState<{ en: GameData | null; failed: boolean }>({ en: data.lang === 'en' ? data : null, failed: false });
  useEffect(() => {
    if (data.lang === 'en') { setState({ en: data, failed: false }); return; }
    let alive = true;
    loadGameData('en').then(
      (d) => { if (alive) setState({ en: d, failed: false }); },
      () => { if (alive) setState({ en: null, failed: true }); },
    );
    return () => { alive = false; };
  }, [data]);
  return state;
}
