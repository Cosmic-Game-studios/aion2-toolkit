import { iconUrl } from '../data/loadData';

interface Props { icon: string; size?: number; className?: string; title?: string }

export function SkillIcon({ icon, size = 40, className = '', title }: Props) {
  return (
    <img
      className={`skill-icon ${className}`}
      src={iconUrl(icon)}
      width={size}
      height={size}
      alt=""
      title={title}
      loading="lazy"
      draggable={false}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
    />
  );
}
