import { useEffect, useRef } from 'react';
import { useGame } from '../data/GameDataContext';

/**
 * Optional ad space (Google AdSense). Off unless the build sets VITE_ADSENSE_CLIENT (and a slot id per
 * placement); then the AdSense script loads once and Google's own consent message (AdSense →
 * Privacy & messaging) handles GDPR consent. Without configuration nothing is loaded or shown.
 * `npm run dev` or `?adpreview` in the URL shows grey placeholders to judge the layout.
 */
const CLIENT = (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined)?.trim() || '';
const SLOTS: Record<AdKind, string> = {
  rail: (import.meta.env.VITE_ADSENSE_SLOT_RAIL as string | undefined)?.trim() || '',
  inline: (import.meta.env.VITE_ADSENSE_SLOT_INLINE as string | undefined)?.trim() || '',
};
const PREVIEW = import.meta.env.DEV || (typeof location !== 'undefined' && new URLSearchParams(location.search).has('adpreview'));

export type AdKind = 'rail' | 'inline';
export const adsOn = (kind: AdKind) => (!!CLIENT && !!SLOTS[kind]) || PREVIEW;

let scriptAdded = false;
function loadScript() {
  if (scriptAdded || !CLIENT) return;
  scriptAdded = true;
  const s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(CLIENT)}`;
  document.head.appendChild(s);
}

const SIZE: Record<AdKind, string> = { rail: '300 × 600', inline: '728 × 90' };

export function AdSlot({ kind }: { kind: AdKind }) {
  const { t } = useGame();
  const ref = useRef<HTMLModElement>(null);
  const live = !!CLIENT && !!SLOTS[kind];

  useEffect(() => {
    if (!live || !ref.current || ref.current.dataset.adsbygoogleStatus) return;
    loadScript();
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch { /* blocked by an ad blocker – the page works without it */ }
  }, [live]);

  if (!adsOn(kind)) return null;
  return (
    <div className={`ad-slot ad-${kind}`}>
      <span className="ad-label">{t('adLabel')}</span>
      {live ? (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={CLIENT}
          data-ad-slot={SLOTS[kind]}
          data-ad-format={kind === 'rail' ? 'vertical' : 'horizontal'}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="ad-preview">{t('adPlaceholder', { size: SIZE[kind] })}</div>
      )}
    </div>
  );
}
