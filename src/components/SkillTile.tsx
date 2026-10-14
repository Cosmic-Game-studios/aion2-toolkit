import type { CSSProperties, ReactNode } from 'react';
import type { Skill } from '../data/types';
import { iconUrl } from '../data/loadData';
import { useBuild } from '../state/BuildContext';
import { applyCdr, cdAt, cdTier, fmtCdShort } from '../lib/cooldown';
import { useSkillTip } from './SkillTooltip';

interface Props {
  skill: Skill;
  level?: number;
  size?: number;
  showCd?: boolean;
  showLevel?: boolean;
  tip?: boolean;
  dim?: boolean;
  /** cooldown reduction override (e.g. for a community build); defaults to the active build's value */
  cdr?: number;
  className?: string;
  children?: ReactNode;
}

/** Framed skill icon: type-coloured border, cooldown badge, optional level badge and hover tooltip. */
export function SkillTile({ skill, level = 1, size = 44, showCd = true, showLevel = false, tip = true, dim, cdr, className = '', children }: Props) {
  const { build } = useBuild();
  const tipProps = useSkillTip(tip ? skill : undefined, level);
  const cd = applyCdr(cdAt(skill, level), cdr ?? build.cdr);
  const kind = skill.isStigma ? 'stigma' : skill.type;
  return (
    <span
      className={`tile tile-${kind} ${dim ? 'dim' : ''} ${className}`}
      style={{ '--s': `${size}px` } as CSSProperties}
      {...tipProps}
    >
      <img src={iconUrl(skill.icon)} alt="" draggable={false} loading="lazy" />
      {showLevel && <span className="tile-lv">{level}</span>}
      {showCd && cd > 0 && <span className={`tile-cd cd-${cdTier(cd)}`}>{fmtCdShort(cd)}</span>}
      {children}
    </span>
  );
}

/** Plain icon by id (specialisations, chain skills). */
export function PlainIcon({ icon, size = 28 }: { icon: string; size?: number }) {
  return (
    <img
      className="plain-icon"
      src={iconUrl(icon)}
      width={size}
      height={size}
      alt=""
      loading="lazy"
      draggable={false}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
    />
  );
}
