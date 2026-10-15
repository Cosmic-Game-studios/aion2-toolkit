import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import { useOptionalGame } from '../data/GameDataContext';
import { Modal } from './Modal';

export interface ConfirmOptions {
  title: string;
  message?: ReactNode;
  /** label of the confirming button (default "Continue") */
  confirmLabel?: string;
  cancelLabel?: string;
  /** destructive: red button, Cancel gets the focus first */
  danger?: boolean;
  icon?: ReactNode;
}
type ConfirmFn = (opts: ConfirmOptions | string) => Promise<boolean>;

const ConfirmCtx = createContext<ConfirmFn>(async (o) => window.confirm(typeof o === 'string' ? o : o.title));

interface Pending { opts: ConfirmOptions; resolve: (v: boolean) => void }

/** Styled replacement for window.confirm: `if (await confirm({ title, message, danger: true })) …` */
export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<Pending | null>(null);
  const game = useOptionalGame();
  const t = (k: 'cancel' | 'confirmYes', fallback: string) => game?.t(k) ?? fallback;
  const cancelRef = useRef<HTMLButtonElement>(null);
  const okRef = useRef<HTMLButtonElement>(null);

  const confirm = useCallback<ConfirmFn>((o) => new Promise<boolean>((resolve) => {
    const opts = typeof o === 'string' ? { title: o } : o;
    setPending((prev) => { prev?.resolve(false); return { opts, resolve }; });
  }), []);

  const close = (v: boolean) => {
    pending?.resolve(v);
    setPending(null);
  };

  const o = pending?.opts;
  return (
    <ConfirmCtx.Provider value={confirm}>
      {children}
      {o && (
        <Modal
          open
          size="sm"
          className={`confirm-dialog ${o.danger ? 'danger' : ''}`}
          title={<span className="confirm-title">{o.icon ?? (o.danger ? <TriangleAlert size={18} aria-hidden /> : null)}{o.title}</span>}
          onClose={() => close(false)}
          initialFocus={o.danger ? cancelRef : okRef}
          footer={
            <>
              <button ref={cancelRef} type="button" className="btn ghost" onClick={() => close(false)}>{o.cancelLabel ?? t('cancel', 'Cancel')}</button>
              <button ref={okRef} type="button" className={`btn ${o.danger ? 'danger solid' : 'primary'}`} onClick={() => close(true)}>
                {o.confirmLabel ?? t('confirmYes', 'Continue')}
              </button>
            </>
          }
        >
          {o.message ? <div className="confirm-message">{o.message}</div> : null}
        </Modal>
      )}
    </ConfirmCtx.Provider>
  );
}

export const useConfirm = () => useContext(ConfirmCtx);
