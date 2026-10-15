import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Lock } from 'lucide-react';
import type { ClassType } from '../data/types';
import { useLoadedGame } from '../data/GameDataContext';
import { emblemUrl } from '../data/loadData';
import { useBuild } from '../state/BuildContext';
import { CLASS_ROLE, unreleasedClasses } from '../lib/classInfo';
import type { StringKey } from '../i18n/strings';

export function ClassEmblem({ cls, size = 28 }: { cls: ClassType; size?: number }) {
  const url = emblemUrl(cls);
  return url ? <img className="emblem" src={url} width={size} height={size} alt="" /> : null;
}

export const useClassName = () => {
  const { data } = useLoadedGame();
  return (c: ClassType) => data.classes.find((x) => x.classType === c)?.name ?? c;
};

/**
 * Class switcher as a popover grid. Switching keeps a separate build per class.
 * New visitors (no class chosen yet) see a highlighted "Choose your class".
 */
export function ClassSelect() {
  const { t, data } = useLoadedGame();
  const { build, setClass, picked } = useBuild();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const popId = `classes-${useId().replace(/:/g, '')}`;
  const className = useClassName();
  const unreleased = unreleasedClasses(data);
  const classes = [...data.classes].sort((a, b) => Number(unreleased.has(a.classType)) - Number(unreleased.has(b.classType)));

  useEffect(() => {
    if (!open) return;
    // focus the current class, so arrow-free keyboard use starts where the player is
    requestAnimationFrame(() => ref.current?.querySelector<HTMLButtonElement>('.class-pop button[aria-pressed="true"]')?.focus());
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  // arrow keys move through the grid (3 columns)
  const onGridKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('button')];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 }[e.key];
    if (!step) return;
    e.preventDefault();
    items[Math.max(0, Math.min(items.length - 1, i + step))]?.focus();
  };

  return (
    <div className={`class-select ${picked ? '' : 'unpicked'}`} ref={ref}>
      <button
        ref={trigger}
        type="button"
        className="class-current"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={popId}
        aria-label={`${t('chooseClass')}: ${className(build.c)}`}
      >
        <ClassEmblem cls={build.c} size={30} />
        <span className="class-current-text">
          <span className="cc-label">{picked ? t('class') : t('pickYourClass')}</span>
          <strong>{className(build.c)}</strong>
        </span>
        <ChevronDown size={16} className={open ? 'rot' : ''} aria-hidden />
      </button>
      {open && (
        <div className="class-pop" id={popId} role="group" aria-label={t('chooseClass')} onKeyDown={onGridKey}>
          {classes.map((c) => {
            const on = c.classType === build.c;
            const off = unreleased.has(c.classType);
            return (
              <button
                key={c.classType}
                type="button"
                aria-pressed={on}
                className={`${on ? 'on' : ''} ${off ? 'off' : ''}`}
                onClick={() => { setClass(c.classType); setOpen(false); trigger.current?.focus(); }}
              >
                {on && <Check size={14} className="cp-check" aria-hidden />}
                <ClassEmblem cls={c.classType} size={40} />
                <span className="cp-text">
                  <span>{c.name}</span>
                  <small>{off ? <><Lock size={11} aria-hidden /> {t('notOnGlobal')}</> : t(`role_${CLASS_ROLE[c.classType]}` as StringKey)}</small>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
