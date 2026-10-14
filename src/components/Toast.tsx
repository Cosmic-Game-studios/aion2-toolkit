import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Check, Info, TriangleAlert } from 'lucide-react';

type Kind = 'ok' | 'info' | 'error';
interface ToastItem { id: number; msg: string; kind: Kind }

const ToastCtx = createContext<(msg: string, kind?: Kind) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((msg: string, kind: Kind = 'ok') => {
    const id = Date.now() + Math.random();
    setItems((l) => [...l.slice(-3), { id, msg, kind }]);
    setTimeout(() => setItems((l) => l.filter((x) => x.id !== id)), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`toast toast-${t.kind}`}>
            {t.kind === 'ok' ? <Check size={16} /> : t.kind === 'error' ? <TriangleAlert size={16} /> : <Info size={16} />}
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
