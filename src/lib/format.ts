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
