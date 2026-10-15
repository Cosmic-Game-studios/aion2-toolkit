import { useId, useState, type ReactNode } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Meter } from '../../components/ui';
import { storage } from '../../lib/storage';

interface Props {
  label: string;
  icon?: ReactNode;
  spent: number;
  max: number;
  /** text of the button that shows where the budget comes from */
  toggleLabel: string;
  /** what the player added on top of the level budget (shown as a count on the button) */
  added?: number;
  /** remembers whether the sources are open */
  storageKey: string;
  /** the sources: breakdown, fields, hints */
  children: ReactNode;
}

/**
 * A budget (skill points, stigma shards) as one compact line: the meter with "N left", plus a button that
 * opens where the budget comes from. The open state is remembered per page.
 */
export function BudgetCard({ label, icon, spent, max, toggleLabel, added = 0, storageKey, children }: Props) {
  const [open, setOpen] = useState(() => storage.get<boolean>(storageKey, false));
  const panelId = `pc-${useId().replace(/:/g, '')}`;
  const toggle = () => setOpen((o) => { storage.set(storageKey, !o); return !o; });
  return (
    <section className="card points-card" aria-label={label}>
      <div className="pc-row">
        <Meter label={label} icon={icon} spent={spent} max={max} showLeft />
        <button type="button" className={`btn ghost sm pc-toggle ${open ? 'on' : ''}`} aria-expanded={open} aria-controls={panelId} onClick={toggle}>
          <SlidersHorizontal size={15} aria-hidden />
          {toggleLabel}
          {added !== 0 && <span className="count">{added > 0 ? '+' : ''}{added}</span>}
          <ChevronDown size={15} aria-hidden className="pc-chev" />
        </button>
      </div>
      {open && <div className="pc-panel" id={panelId}>{children}</div>}
    </section>
  );
}
