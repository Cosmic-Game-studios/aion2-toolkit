import { useCallback, useEffect, useSyncExternalStore } from 'react';

/** The breakpoints of the design system (see the header of styles.css). */
export const MQ = {
  phone: '(max-width: 640px)',
  tablet: '(max-width: 900px)',
  /** details move from the side panel into a sheet below this width */
  narrow: '(max-width: 980px)',
  laptop: '(max-width: 1199px)',
  /** no hover: phones and tablets – use touch wording */
  touch: '(hover: none)',
  coarse: '(pointer: coarse)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;

const mql = (q: string) => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(q) : null);

/** true while the media query matches; re-renders when it changes. */
export function useMediaQuery(query: string): boolean {
  // stable per query, so a re-render does not drop and re-add the listener
  const subscribe = useCallback((cb: () => void) => {
    const m = mql(query);
    if (!m) return () => {};
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
  }, [query]);
  return useSyncExternalStore(subscribe, () => mql(query)?.matches ?? false, () => false);
}

/** Phones and tablets (no hover). Use it to pick touch wording ("tap" instead of "right-click"). */
export const useIsTouch = () => useMediaQuery(MQ.touch);

/** Non-hook check for event handlers. */
export const matches = (query: string) => mql(query)?.matches ?? false;

/** Sets the browser tab title for the current page ("<title> – Daevaforge"). App sets a default per route first. */
export function useDocumentTitle(title: string | null | undefined) {
  useEffect(() => {
    if (title) document.title = `${title} – Daevaforge`;
  }, [title]);
}
