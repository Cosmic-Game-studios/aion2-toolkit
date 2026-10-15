import { Fragment } from 'react';
import { useLoadedGame } from '../data/GameDataContext';
import type { Skill } from '../data/types';
import { iconUrl } from '../data/loadData';
import { richText } from '../lib/format';
import { useSkillTip } from './SkillTooltip';

/** level shown in text tooltips: the highest level bought with skill points */
export const tipLevel = (s: Skill) => Math.min(10, s.levels.length || 1);

/** A skill named inside running text: small icon + name in the page language, tooltip on hover / focus, and on tap (touch). */
export function SkillChip({ skill }: { skill: Skill }) {
  const tip = useSkillTip(skill, tipLevel(skill), { tap: true });
  return (
    <span className={`skill-chip k-${skill.isStigma ? 'stigma' : skill.type}`} tabIndex={0} {...tip}>
      <img src={iconUrl(skill.icon)} alt="" loading="lazy" draggable={false} />
      {skill.name}
    </span>
  );
}

const SKILL_REF = /(\[\[\d+(?:\|[^\]]*)?\]\])/g;

/** Text with **bold** and [[id]] / [[id|name]] skill references, shown as skill chips in the page language. */
export function SkillText({ text }: { text: string }) {
  const { data } = useLoadedGame();
  return (
    <>
      {text.split(SKILL_REF).map((p, i) => {
        const m = /^\[\[(\d+)(?:\|([^\]]*))?\]\]$/.exec(p);
        if (!m) return <Fragment key={i}>{richText(p)}</Fragment>;
        const s = data.skillById.get(Number(m[1]));
        return s ? <SkillChip key={i} skill={s} /> : <b key={i}>{m[2] ?? m[1]}</b>;
      })}
    </>
  );
}

/** Plain-text version: [[id]] becomes the skill name, ** marks are dropped (titles, tooltips). */
export function skillTextPlain(text: string, name: (id: number) => string | undefined): string {
  return text.replace(/\[\[(\d+)(?:\|([^\]]*))?\]\]/g, (_, id, fallback) => name(Number(id)) ?? fallback ?? id).replace(/\*\*/g, '');
}
