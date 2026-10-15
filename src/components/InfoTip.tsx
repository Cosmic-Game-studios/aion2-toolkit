import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';
import { useGame } from '../data/GameDataContext';

interface Props {
  /** the hint itself */
  text: ReactNode;
  /** accessible name of the (i) button; default "More information" */
  label?: string;
  /** icon size */
  size?: number;
  className?: string;
}

/**
 * Small (i) button with a hint that works everywhere: tap or click toggles it, mouse hover and keyboard focus show it.
 * Use it for hints that used to live only in a title attribute (phones cannot show those).
 */
export function InfoTip({ text, label, size = 15, className = '' }: Props) {
  const { t } = useGame();
  const [open, setOpen] = useState<false | 'hover' | 'pinned'>(false);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const id = `tip-${useId().replace(/:/g, '')}`;
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean } | null>(null);

  useLayoutEffect(() => {
    if (!open || !btn.current || !pop.current) { setPos(null); return; }
    const r = btn.current.getBoundingClientRect();
    const w = pop.current.offsetWidth;
    const h = pop.current.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.max(8, Math.min(vw - w - 8, r.left + r.width / 2 - w / 2));
    const below = r.bottom + 8;
    const above = below + h > vh - 8 && r.top - h - 8 > 8;
    setPos({ left, top: above ? r.top - h - 8 : below, above });
  }, [open, text]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onDown = (e: PointerEvent) => {
      const el = e.target as Node;
      if (!btn.current?.contains(el) && !pop.current?.contains(el)) close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); btn.current?.focus(); } };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btn}
        type="button"
        className={`info-tip ${open ? 'on' : ''} ${className}`}
        aria-label={label ?? t('moreInfo')}
        aria-expanded={!!open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((o) => (o === 'pinned' ? false : 'pinned'))}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen((o) => o || 'hover'); }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen((o) => (o === 'hover' ? false : o)); }}
        onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) setOpen((o) => o || 'hover'); }}
        onBlur={() => setOpen((o) => (o === 'hover' ? false : o))}
      >
        <Info size={size} aria-hidden />
      </button>
      {open && createPortal(
        <div
          ref={pop}
          id={id}
          role="tooltip"
          className={`info-pop ${pos?.above ? 'above' : ''}`}
          style={pos ? { left: pos.left, top: pos.top } : { left: -9999, top: -9999 }}
        >
          {text}
        </div>,
        document.body,
      )}
    </>
  );
}
