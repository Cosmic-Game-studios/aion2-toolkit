import { useEffect, useId, useLayoutEffect, useRef, type MouseEvent as ReactMouseEvent, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useOptionalGame } from '../data/GameDataContext';

interface Props {
  open: boolean;
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  /** legacy shortcut for size="wide" */
  wide?: boolean;
  size?: 'sm' | 'md' | 'wide';
  /** bottom sheet up to 980 px (details that sit next to a list on wide screens); every modal is a sheet on phones */
  sheet?: boolean;
  /** one line under the title, read as the dialog description */
  description?: ReactNode;
  /** element that gets the focus when the dialog opens */
  initialFocus?: RefObject<HTMLElement>;
  className?: string;
  bodyClassName?: string;
}

const FOCUSABLE = 'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

// open dialogs, top-most last: Escape and the focus trap only act on the top one
const stack: string[] = [];
let scrollLocks = 0;

// Older iOS Safari (no overscroll-behavior either) scrolls the page by touch despite overflow: hidden;
// there a one-finger drag may only move the dialog's body.
const legacyTouch = typeof CSS !== 'undefined' && !CSS.supports('overscroll-behavior', 'contain');
const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 1 && !(e.target as Element | null)?.closest?.('.modal-body')) e.preventDefault();
};

/**
 * The page behind a dialog must not scroll. The lock sits on <html>: html has overflow-x set, so an overflow on
 * <body> would not reach the viewport (and would turn body into a scroll box that breaks the sticky bars).
 */
function lockScroll() {
  const root = document.documentElement;
  // keep the room of a classic scrollbar, so the page does not shift sideways
  if (window.innerWidth > root.clientWidth) root.style.scrollbarGutter = 'stable';
  root.style.overflow = 'hidden';
  if (legacyTouch) document.addEventListener('touchmove', onTouchMove, { passive: false });
}

function unlockScroll() {
  const root = document.documentElement;
  root.style.overflow = '';
  root.style.scrollbarGutter = '';
  if (legacyTouch) document.removeEventListener('touchmove', onTouchMove);
}

const visible = (el: HTMLElement) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);

export function Modal({ open, title, onClose, children, footer, wide, size, sheet, description, initialFocus, className = '', bodyClassName = '' }: Props) {
  const game = useOptionalGame();
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  // keep the latest onClose without re-running the open effect (callers often pass inline functions)
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  // when the dialog opened; set during the commit, so no press can reach the backdrop before it
  const openedAt = useRef(0);
  useLayoutEffect(() => {
    if (open) openedAt.current = performance.now();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    stack.push(id);
    if (scrollLocks++ === 0) lockScroll();

    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return;
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current(); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(visible);
      if (!items.length) { e.preventDefault(); ref.current.focus(); return; }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      // toasts stay reachable (e.g. Undo after a delete inside the dialog): they follow the dialog's last control
      const toastBtns = [...document.querySelectorAll<HTMLElement>('.toasts button')].filter(visible);
      const ti = active ? toastBtns.indexOf(active) : -1;
      if (ti >= 0) {
        e.preventDefault();
        const k = ti + (e.shiftKey ? -1 : 1);
        (k < 0 ? last : k >= toastBtns.length ? first : toastBtns[k]).focus();
        return;
      }
      const inside = ref.current.contains(active);
      if (e.shiftKey && (!inside || active === first || active === ref.current)) {
        e.preventDefault();
        (inside ? toastBtns[toastBtns.length - 1] ?? last : last).focus();
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault();
        (inside ? toastBtns[0] ?? first : first).focus();
      }
    };
    window.addEventListener('keydown', onKey);

    // initial focus: explicit ref > autofocus > first field of the body > the dialog itself (never the X);
    // on touch screens an unasked-for field would open the keyboard over the dialog, so only the first two apply there
    const raf = requestAnimationFrame(() => {
      const root = ref.current;
      if (!root || root.contains(document.activeElement)) return;
      const firstField = window.matchMedia('(pointer: coarse)').matches ? null
        : root.querySelector<HTMLElement>('.modal-body :is(input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]))');
      const target = initialFocus?.current
        ?? root.querySelector<HTMLElement>('[autofocus], [data-autofocus]')
        ?? firstField
        ?? root;
      target.focus({ preventScroll: target === root });
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      const i = stack.lastIndexOf(id);
      if (i >= 0) stack.splice(i, 1);
      if (--scrollLocks === 0) unlockScroll();
      if (prev && document.contains(prev)) prev.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, id]);

  if (!open) return null;
  const sz = size ?? (wide ? 'wide' : 'md');
  // the second press of a double-click or double-tap whose first press opened the dialog lands on the backdrop:
  // it must not close it (and lose what the dialog holds); a deliberate backdrop click is a first press later on
  const onBackdrop = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.detail >= 2 || performance.now() - openedAt.current <= 300) return;
    // the press must not move the focus: the dialog gives it back to the button that opened it
    e.preventDefault();
    onClose();
  };
  // portal: ancestors with backdrop-filter (build bar) would otherwise trap the fixed backdrop
  return createPortal(
    <div className={`modal-backdrop ${sheet ? 'sheet' : ''}`} onMouseDown={onBackdrop}>
      <div
        className={`modal ${sz} ${sz === 'wide' ? 'wide' : ''} ${sheet ? 'sheet' : ''} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        ref={ref}
      >
        <header className="modal-head">
          <div className="modal-titles">
            <h2 id={titleId}>{title}</h2>
            {description && <p id={descId} className="modal-desc">{description}</p>}
          </div>
          <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label={game?.t('close') ?? 'Close'}><X size={18} /></button>
        </header>
        <div className={`modal-body ${bodyClassName}`}>{children}</div>
        {footer && <footer className="modal-foot">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
