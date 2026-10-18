import type { ReactNode, Ref } from 'react';

/**
 * Head of a page section: a small gilded ornament, the title in the display font with the gold-cream fill
 * (.gold-text in styles.css), an optional badge beside the title (a .count), an optional line of text and an optional
 * action on the right (a link or button, styled with SECTION_LINK). `flush` drops the bottom margin for parents that
 * space their children with a gap. `headRef` makes the title a focus target (tabIndex -1) the page can move the focus
 * to. Built with Tailwind (prefix tw:, see index.css).
 */
export function SectionHead({ id, title, badge, text, action, flush, headRef }: {
  id?: string; title: ReactNode; badge?: ReactNode; text?: ReactNode; action?: ReactNode; flush?: boolean;
  headRef?: Ref<HTMLHeadingElement>;
}) {
  return (
    <div className={`tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-x-4 tw:gap-y-2 ${flush ? '' : 'tw:mb-3 tw:sm:mb-4'}`}>
      <div className="tw:min-w-0 tw:flex-[1_1_320px]">
        <SectionOrnament />
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          <h2 id={id} ref={headRef} tabIndex={headRef ? -1 : undefined} className="gold-text tw:font-heading tw:text-lg tw:font-bold tw:leading-tight tw:tracking-[.03em] tw:sm:text-xl">
            {title}
          </h2>
          {badge}
        </div>
        {text && <p className="tw:mt-1 tw:max-w-[70ch] tw:text-fg-2">{text}</p>}
      </div>
      {action}
    </div>
  );
}

/** The gilded line with a diamond above section titles (decoration only). */
export function SectionOrnament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`tw:mb-2 tw:flex tw:items-center tw:gap-1.5 ${className}`}>
      <span className="tw:h-px tw:w-5 tw:bg-linear-to-r tw:from-transparent tw:to-gold/70" />
      <span className="tw:size-1.5 tw:rotate-45 tw:bg-gold tw:shadow-[0_0_8px_rgba(227,184,102,.75)]" />
      <span className="tw:h-px tw:w-14 tw:bg-linear-to-r tw:from-gold/70 tw:to-transparent" />
    </div>
  );
}

/** Look of the action link / button next to a section title ("View all", "Manage"). */
export const SECTION_LINK =
  'tw:inline-flex tw:min-h-[var(--tap-sm)] tw:items-center tw:gap-1 tw:text-sm tw:font-semibold';
