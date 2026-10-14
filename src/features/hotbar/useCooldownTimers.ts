import { useCallback, useEffect, useState } from 'react';

export interface Timer { start: number; end: number; zero?: boolean }
export type Timers = Record<number, Timer>;

/** Live cooldown timers per skill id for the hotbar test mode. Re-renders every frame while one runs. */
export function useCooldownTimers() {
  const [timers, setTimers] = useState<Timers>({});
  const [now, setNow] = useState(() => performance.now());
  const running = Object.values(timers).some((x) => x.end > now);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const tick = () => { setNow(performance.now()); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    // fallback for contexts that pause animation frames (background tabs, embedded previews)
    const iv = setInterval(() => setNow(performance.now()), 200);
    return () => { cancelAnimationFrame(raf); clearInterval(iv); };
  }, [running]);

  /** Use a skill: starts its cooldown unless it is still running. Skills without cooldown flash briefly. */
  const trigger = useCallback((id: number, cd: number) => {
    const n = performance.now();
    setNow(n);
    setTimers((t) => {
      const cur = t[id];
      if (cur && !cur.zero && cur.end > n) return t;
      return { ...t, [id]: cd > 0 ? { start: n, end: n + cd * 1000 } : { start: n, end: n + 220, zero: true } };
    });
  }, []);

  const reset = useCallback(() => setTimers({}), []);
  return { timers, now, trigger, reset };
}

/** Remaining fraction (1 → 0) and seconds of a running timer, or null. */
export function timerState(t: Timer | undefined, now: number) {
  if (!t || t.end <= now) return null;
  const total = t.end - t.start;
  const rem = t.end - now;
  return { frac: rem / total, sec: rem / 1000, zero: !!t.zero };
}
