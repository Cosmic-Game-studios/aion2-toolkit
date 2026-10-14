import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ClassType } from '../data/types';
import { useLoadedGame } from '../data/GameDataContext';
import { emblemUrl } from '../data/loadData';
import { useBuild } from '../state/BuildContext';

export function ClassEmblem({ cls, size = 28 }: { cls: ClassType; size?: number }) {
  const url = emblemUrl(cls);
  return url ? <img className="emblem" src={url} width={size} height={size} alt="" /> : null;
}

export const useClassName = () => {
  const { data } = useLoadedGame();
  return (c: ClassType) => data.classes.find((x) => x.classType === c)?.name ?? c;
};

/** Class switcher as a popover grid. Switching keeps a separate build per class. */
export function ClassSelect() {
  const { t, data } = useLoadedGame();
  const { build, setClass } = useBuild();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const className = useClassName();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  return (
    <div className="class-select" ref={ref}>
      <button type="button" className="class-current" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" title={t('chooseClass')}>
        <ClassEmblem cls={build.c} size={30} />
        <span className="class-current-text">
          <span className="eyebrow">{t('class')}</span>
          <strong>{className(build.c)}</strong>
        </span>
        <ChevronDown size={16} className={open ? 'rot' : ''} />
      </button>
      {open && (
        <div className="class-pop" role="menu">
          {data.classes.map((c) => (
            <button
              key={c.classType}
              type="button"
              role="menuitemradio"
              aria-checked={c.classType === build.c}
              className={c.classType === build.c ? 'on' : ''}
              onClick={() => { setClass(c.classType); setOpen(false); }}
            >
              <ClassEmblem cls={c.classType} size={40} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
