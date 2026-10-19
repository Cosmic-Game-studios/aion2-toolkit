import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { MQ, matches } from './hooks';

/**
 * The living night sky behind every page: three slow aurora clouds, a few twinkling stars and a fine grain
 * (styles: "Light & material" in styles.css, movement in motion.css). Pure decoration: hidden from screen readers,
 * never catches clicks, and stands still with reduced motion.
 */
export function Sky() {
  return (
    <div className="sky" aria-hidden>
      <span className="sky-aura a1" />
      <span className="sky-aura a2" />
      <span className="sky-aura a3" />
      <span className="sky-twinkle">
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </span>
    </div>
  );
}

/** Surfaces that light up under the mouse (each puts var(--spot-layer, none) first in its background). */
const LIT = '.card, .build-card, .step-card, .guide-tile, .guide-feature, .guide-hero, .class-tile, .lp-path.guide, .lp-build';

/**
 * Writes the mouse position (--mx, --my in px and --px, --py from 0 to 1, relative to the element) on the lit surface
 * under the pointer and on lit surfaces around it, once per frame. Only on devices with a real mouse; touch and pen
 * never see the light.
 */
export function usePointerLight() {
  useEffect(() => {
    if (!matches('(hover: hover) and (pointer: fine)')) return;
    let x = 0;
    let y = 0;
    let target: Element | null = null;
    let frame = 0;
    const paint = () => {
      frame = 0;
      for (let el = target?.closest(LIT) ?? null; el; el = el.parentElement?.closest(LIT) ?? null) {
        const r = el.getBoundingClientRect();
        const { style } = el as HTMLElement;
        style.setProperty('--mx', `${Math.round(x - r.left)}px`);
        style.setProperty('--my', `${Math.round(y - r.top)}px`);
        style.setProperty('--px', ((x - r.left) / (r.width || 1)).toFixed(3));
        style.setProperty('--py', ((y - r.top) / (r.height || 1)).toFixed(3));
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      target = e.target as Element | null;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);
}

type ViewTransitionDoc = Document & { startViewTransition?: (update: () => void) => unknown };

/**
 * Runs a page change as a view transition where the browser has them (the old page fades out, the new one rises in,
 * the navigation marker glides to its new place – see motion.css). The update runs synchronously inside the
 * transition, so the new page is what the browser captures. Without support or with reduced motion: a plain update.
 * The browser starts the transition on its next frame; if no frame comes (a covered or throttled window), the
 * update runs anyway after a moment, once.
 */
export function pageTransition(update: () => void) {
  const doc = document as ViewTransitionDoc;
  if (!doc.startViewTransition || matches(MQ.reducedMotion) || document.visibilityState !== 'visible') { update(); return; }
  let done = false;
  const run = () => { if (!done) { done = true; update(); } };
  const fallback = window.setTimeout(run, 400);
  doc.startViewTransition(() => { window.clearTimeout(fallback); flushSync(run); });
}
