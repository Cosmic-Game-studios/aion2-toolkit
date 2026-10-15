import { isValidElement, useEffect, useId, useState, type ReactNode } from 'react';
import { ChevronDown, HelpCircle, Lightbulb, X } from 'lucide-react';
import { useGame } from '../data/GameDataContext';
import { storage } from '../lib/storage';
import { useIsTouch } from './hooks';

/** One step of a "how it works" guide: plain text, or separate wording for mouse and touch screens. */
export type GuideStep = ReactNode | { mouse: ReactNode; touch: ReactNode };
export interface GuideDef { id: string; steps: GuideStep[] }

const isVariant = (s: GuideStep): s is { mouse: ReactNode; touch: ReactNode } =>
  !!s && typeof s === 'object' && !isValidElement(s) && 'mouse' in s && 'touch' in s;

/**
 * Open state of a guide: open by itself on the first visit only, collapsed afterwards.
 * (Older versions stored `guide:<id>` = hidden; anyone who has that key has been here before.)
 */
export function useGuideOpen(id: string): [boolean, (v: boolean) => void] {
  const [open, setOpen] = useState(
    () => !storage.get<boolean>(`guide:seen:${id}`, false) && storage.get<boolean | null>(`guide:${id}`, null) === null,
  );
  // remember the visit (in an effect: render functions stay free of side effects)
  useEffect(() => { storage.set(`guide:seen:${id}`, true); }, [id]);
  return [open, setOpen];
}

/** The "How it works" button for a page header. */
export function GuideToggle({ open, onToggle, controls, count }: { open: boolean; onToggle: () => void; controls: string; count: number }) {
  const { t } = useGame();
  return (
    <button
      type="button"
      className={`btn ghost sm guide-toggle ${open ? 'on' : ''}`}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      title={t('howItWorksCount', { n: count })}
    >
      <HelpCircle size={16} aria-hidden />
      <span className="guide-toggle-label">{t('howItWorks')}</span>
    </button>
  );
}

/** The numbered steps. */
export function GuidePanel({ id, steps, onClose }: { id: string; steps: GuideStep[]; onClose: () => void }) {
  const { t } = useGame();
  const touch = useIsTouch();
  return (
    <section className="guide" id={id} aria-label={t('howItWorks')}>
      <div className="guide-head">
        <Lightbulb size={16} aria-hidden /> <strong>{t('howItWorks')}</strong>
        <button type="button" className="icon-btn sm push" onClick={onClose} aria-label={t('hideGuide')} title={t('hideGuide')}>
          <X size={15} />
        </button>
      </div>
      <ol className="guide-steps">
        {steps.map((s, i) => (
          <li key={i}><span className="guide-no" aria-hidden>{i + 1}</span><span>{isVariant(s) ? (touch ? s.touch : s.mouse) : s}</span></li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Standalone "how it works" block. Prefer `PageHeader guide={{ id, steps }}`, which puts the toggle into the header.
 * Open by itself only on the first visit; collapsed it is one slim row.
 */
export function PageGuide({ id, steps }: GuideDef) {
  const { t } = useGame();
  const [open, setOpen] = useGuideOpen(id);
  const panelId = `guide-${useId().replace(/:/g, '')}`;
  if (open) return <GuidePanel id={panelId} steps={steps} onClose={() => setOpen(false)} />;
  return (
    <button type="button" className="guide-reopen" aria-expanded={false} aria-controls={panelId} onClick={() => setOpen(true)}>
      <HelpCircle size={16} aria-hidden />
      <span>{t('howItWorksCount', { n: steps.length })}</span>
      <ChevronDown size={15} aria-hidden />
    </button>
  );
}
