import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { GameData, Lang } from './types';
import { loadGameData } from './loadData';
import { STRINGS, type StringKey } from '../i18n/strings';
import { storage } from '../lib/storage';

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** the loaded data; while another language loads it still holds the previous one */
  data: GameData | null;
  error: string | null;
  /** true while data for the current language is being fetched (first load or language switch) */
  loading: boolean;
  /** load again after an error */
  retry: () => void;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
}

const GameDataCtx = createContext<Ctx | null>(null);

function detectLang(): Lang {
  const saved = storage.get<Lang | null>('lang', null);
  if (saved === 'en' || saved === 'de') return saved;
  return typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
}

export function GameDataProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const [data, setData] = useState<GameData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setError(null);
    setLoading(true);
    // a failed load removes itself from the cache in loadGameData, so a retry fetches again
    loadGameData(lang).then(
      (d) => { if (alive) { setData(d); setLoading(false); } },
      (e: Error) => { if (alive) { setError(e.message || String(e)); setLoading(false); } },
    );
    document.documentElement.lang = lang;
    return () => { alive = false; };
  }, [lang, attempt]);

  const setLang = useCallback((l: Lang) => { storage.set('lang', l); setLangState(l); }, []);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const t = useCallback((key: StringKey, vars?: Record<string, string | number>) => {
    let s: string = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    return s;
  }, [lang]);

  const value = useMemo<Ctx>(() => ({ lang, setLang, data, error, loading, retry, t }), [lang, setLang, data, error, loading, retry, t]);

  return <GameDataCtx.Provider value={value}>{children}</GameDataCtx.Provider>;
}

export function useGame(): Ctx {
  const ctx = useContext(GameDataCtx);
  if (!ctx) throw new Error('useGame outside GameDataProvider');
  return ctx;
}

/** Like useGame, but returns null outside the provider (error fallbacks that must never throw). */
export const useOptionalGame = (): Ctx | null => useContext(GameDataCtx);

/** Same as useGame, but only for components rendered after the data has loaded. */
export function useLoadedGame(): Omit<Ctx, 'data'> & { data: GameData } {
  const ctx = useGame();
  if (!ctx.data) throw new Error('game data not loaded yet');
  return { ...ctx, data: ctx.data };
}
