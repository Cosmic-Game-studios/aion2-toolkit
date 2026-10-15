import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Check, Info, TriangleAlert, X } from 'lucide-react';
import { useOptionalGame } from '../data/GameDataContext';

export type ToastKind = 'ok' | 'info' | 'warn' | 'error';
export interface ToastAction { label: string; onClick: () => void }
export interface ToastOptions {
  /** a button in the toast, e.g. Undo; clicking it also closes the toast */
  action?: ToastAction;
  /** milliseconds until it closes by itself; 0 keeps it until the player closes it */
  duration?: number;
}
export interface ToastFn {
  (msg: string, kind?: ToastKind, opts?: ToastOptions): number;
  dismiss: (id: number) => void;
}

interface ToastItem { id: number; msg: string; kind: ToastKind; action?: ToastAction; duration: number }

const DURATION: Record<ToastKind, number> = { ok: 4000, info: 4000, warn: 6000, error: 7000 };
const WITH_ACTION = 8000;
const MAX_VISIBLE = 4;

const noop = Object.assign(() => 0, { dismiss: () => {} }) as ToastFn;
const ToastCtx = createContext<ToastFn>(noop);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => setItems((l) => l.filter((x) => x.id !== id)), []);
  const push = useMemo(() => {
    const fn = ((msg: string, kind: ToastKind = 'ok', opts: ToastOptions = {}) => {
      const id = nextId++;
      const duration = opts.duration ?? (opts.action ? WITH_ACTION : DURATION[kind]);
      setItems((l) => [...l.filter((x) => x.msg !== msg || x.kind !== kind).slice(-(MAX_VISIBLE - 1)), { id, msg, kind, action: opts.action, duration }]);
      return id;
    }) as ToastFn;
    fn.dismiss = dismiss;
    return fn;
  }, [dismiss]);

  const errors = items.filter((x) => x.kind === 'error');
  const others = items.filter((x) => x.kind !== 'error');
  return (
    <ToastCtx.Provider value={push}>
      {children}
      {/* both live regions always exist, so screen readers announce what is added to them */}
      <div className="toasts">
        <div className="toast-region" role="alert" aria-live="assertive">
          {errors.map((x) => <ToastView key={x.id} item={x} onClose={dismiss} />)}
        </div>
        <div className="toast-region" role="status" aria-live="polite">
          {others.map((x) => <ToastView key={x.id} item={x} onClose={dismiss} />)}
        </div>
      </div>
    </ToastCtx.Provider>
  );
}

function ToastView({ item, onClose }: { item: ToastItem; onClose: (id: number) => void }) {
  const game = useOptionalGame();
  const closeLabel = game?.t('close') ?? 'Close';
  const [paused, setPaused] = useState(false);
  const left = useRef(item.duration);

  // counts down only while the toast is neither hovered nor focused
  useEffect(() => {
    if (!item.duration || paused) return;
    const start = Date.now();
    const timer = window.setTimeout(() => onClose(item.id), left.current);
    return () => { window.clearTimeout(timer); left.current -= Date.now() - start; };
  }, [paused, item.id, item.duration, onClose]);

  const Icon = item.kind === 'ok' ? Check : item.kind === 'info' ? Info : TriangleAlert;
  return (
    <div
      className={`toast toast-${item.kind}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false); }}
    >
      <Icon size={17} aria-hidden />
      <span className="toast-msg">{item.msg}</span>
      {item.action && (
        <button type="button" className="btn sm toast-action" onClick={() => { item.action!.onClick(); onClose(item.id); }}>
          {item.action.label}
        </button>
      )}
      <button type="button" className="icon-btn sm toast-close" aria-label={closeLabel} onClick={() => onClose(item.id)}>
        <X size={15} />
      </button>
    </div>
  );
}

/** `toast(msg, kind?, { action?, duration? })` → id; `toast.dismiss(id)`. */
export const useToast = () => useContext(ToastCtx);
