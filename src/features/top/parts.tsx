import type { ReactNode } from 'react';
import type { Skill } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { SkillTile } from '../../components/SkillTile';
import { useSkillTip } from '../../components/SkillTooltip';
import { fmtAgo, fmtWhen } from './topFormat';

/** A skill icon that shows its tooltip on hover, keyboard focus and tap (a skill the data does not know: a blank frame). */
export function SkillIcon({ skill, level, size, showLevel }: { skill: Skill | undefined; level: number; size: number; showLevel?: boolean }) {
  const tip = useSkillTip(skill, Math.max(1, level), { tap: true, neutral: true });
  if (!skill) return <span className="top-tile-blank" style={{ width: size, height: size }} aria-hidden />;
  return (
    <button type="button" className="top-tip" aria-label={skill.name} {...tip}>
      <SkillTile skill={skill} level={Math.max(1, level)} size={size} tip={false} showCd={false} showLevel={showLevel} />
    </button>
  );
}

/** "7/10" with a small bar; screen readers get the sentence in `sr` instead. */
export function Frac({ n, of, sr }: { n: number; of: number; sr: string }) {
  return (
    <span className="top-frac">
      <span className="top-frac-bar" aria-hidden><span style={{ width: `${(n / Math.max(1, of)) * 100}%` }} /></span>
      <span className="top-frac-n" aria-hidden>{n}/{of}</span>
      <span className="sr-only">{sr}</span>
    </span>
  );
}

/** "3 hours ago" with the date and time in the title. */
export function Ago({ iso, short, children }: { iso: string; short?: boolean; children?: (ago: string) => ReactNode }) {
  const { lang } = useLoadedGame();
  const ago = fmtAgo(iso, lang, short);
  return <time dateTime={iso} title={fmtWhen(iso, lang)}>{children ? children(ago) : ago}</time>;
}
