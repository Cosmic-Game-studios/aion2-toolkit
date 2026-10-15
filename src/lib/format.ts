import type { ReactNode } from 'react';
import { createElement, Fragment } from 'react';

/** Renders **bold** markdown spans used in the game descriptions. */
export function richText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return createElement(
    Fragment,
    null,
    ...parts.map((p, i) =>
      p.startsWith('**') && p.endsWith('**')
        ? createElement('b', { key: i }, p.slice(2, -2))
        : p,
    ),
  );
}

export const fmtSec = (s: number) => (s ? `${s % 1 === 0 ? s : s.toFixed(1)}s` : '–');

/** "2 October 2026" / "2. Oktober 2026". A date without a time ("2026-10-02") is that day here, not UTC midnight
 *  (which would show the day before west of UTC). */
export const fmtDate = (iso: string, lang: 'en' | 'de') => {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T00:00:00`) : new Date(iso);
  return d.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
