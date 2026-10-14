import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { GameData, Lang } from './types';
import { loadGameData } from './loadData';
import { STRINGS, type StringKey } from '../i18n/strings';
import { storage } from '../lib/storage';

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  data: GameData | null;
  error: string | null;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
}

const GameDataCtx = createContext<Ctx | null>(null);

function detectLang(): Lang {
  const saved = storage.get<Lang | null>('lang', null);
  if (saved === 'en' || saved === 'de') return saved;
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
}

export function GameDataProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const [data, setData] = useState<GameData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setError(null);
    loadGameData(lang).then(
      (d) => { if (alive) setData(d); },
      (e: Error) => { if (alive) setError(e.message); },
    );
    document.documentElement.lang = lang;
    return () => { alive = false; };
  }, [lang]);

  const value = useMemo<Ctx>(() => ({
    lang,
    setLang: (l) => { storage.set('lang', l); setLangState(l); },
    data,
    error,
    t: (key, vars) => {
      let s: string = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      return s;
    },
  }), [lang, data, error]);

  return <GameDataCtx.Provider value={value}>{children}</GameDataCtx.Provider>;
}

export function useGame(): Ctx {
  const ctx = useContext(GameDataCtx);
  if (!ctx) throw new Error('useGame outside GameDataProvider');
  return ctx;
}

/** Same as useGame, but only for components rendered after the data has loaded. */
export function useLoadedGame(): Omit<Ctx, 'data'> & { data: GameData } {
  const ctx = useGame();
  if (!ctx.data) throw new Error('game data not loaded yet');
  return { ...ctx, data: ctx.data };
}
