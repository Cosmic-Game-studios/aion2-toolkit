import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowRight, Droplet, Lock, MoveHorizontal, Repeat, Zap } from 'lucide-react';
import type { Skill } from '../data/types';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { applyCdr, cdAt, cdVaries, fmtCdShort } from '../lib/cooldown';
import { richText } from '../lib/format';
import { capLevels, skillCap } from '../lib/levelCap';
import { NO_DELTA, type SpecDelta } from '../lib/specEffects';
import { SkillTile, PlainIcon } from './SkillTile';
import { CdChip } from './ui';
import { SpecPicker } from './SpecPicker';
import { ComboCard } from '../features/combos/ComboCard';
import { classCombos, comboSkillIds, sortCombos } from '../lib/combos';

/** Groups consecutive levels with the same cooldown: "Lv. 1–4: 63s". */
function cdRanges(skill: Skill, cdr: number) {
  const out: { from: number; to: number; cd: number }[] = [];
  capLevels(skill).forEach((l) => {
    const cd = applyCdr(l.cooldownSec, cdr);
    const last = out[out.length - 1];
    if (last && last.cd === cd) last.to = l.level;
    else out.push({ from: l.level, to: l.level, cd });
  });
  return out;
}

const fmtSec = (s: number) => `${Number(s.toFixed(2))} s`;

interface HeadProps {
  skill: Skill;
  level: number;
  locked?: boolean;
  extra?: ReactNode;
  /** the name is already the title around it (bottom sheet) */
  hideName?: boolean;
  /** no "Lv. x / y" chip (the caller shows its own level control) */
  noLevel?: boolean;
}

/** Icon, name and tags of a skill (top of every detail view). */
export function SkillHead({ skill, level, locked, extra, hideName, noLevel }: HeadProps) {
  const { t } = useLoadedGame();
  const cap = skillCap(skill);
  const kind = skill.isStigma ? 'stigma' : skill.type;
  return (
    <div className={`sd-head sd-${kind}`}>
      <SkillTile skill={skill} level={level} size={hideName ? 52 : 64} showCd={false} tip={false} />
      <div className="sd-titles">
        {!hideName && <h3 className="sd-name">{skill.name}</h3>}
        <div className="chips">
          <span className={`kind-tag ${kind}`}>{skill.isStigma ? t('stigma') : t(skill.type)}</span>
          {!noLevel && <span className="chip" title={t('levelCapHint', { n: cap })}>{t('lv')} {level} / {level > cap ? skill.maxLevel : cap}</span>}
          {level > cap && <span className="chip warn">{t('notInGameYet')}</span>}
          {skill.acquireLevel > 1 && <span className="chip">{t('acquireLevel')} {skill.acquireLevel}</span>}
          {locked && <span className="chip warn"><Lock size={12} aria-hidden /> {t('lockedUntil', { lvl: skill.acquireLevel })}</span>}
        </div>
        {extra}
      </div>
    </div>
  );
}

export interface DetailTab<T extends string> { id: T; label: ReactNode; count?: ReactNode }

/**
 * Tabs above a detail view (ARIA tabs: arrow keys, Home and End move between them). Uses the `.detail-tabs` look.
 * Render the content inside `<div role="tabpanel" id={`${idBase}-panel`} aria-labelledby={`${idBase}-tab-${value}`}>`.
 */
export function DetailTabs<T extends string>({ tabs, value, onChange, label, idBase, className = '', autoFocus }: {
  tabs: DetailTab<T>[]; value: T; onChange: (v: T) => void; label: string; idBase: string; className?: string;
  /** the selected tab takes the focus when a dialog around it opens (Modal looks for data-autofocus) */
  autoFocus?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onKey = (e: KeyboardEvent) => {
    const i = tabs.findIndex((x) => x.id === value);
    const to = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
    if (to == null) return;
    e.preventDefault();
    const next = tabs[(to + tabs.length) % tabs.length];
    onChange(next.id);
    ref.current?.querySelector<HTMLElement>(`#${idBase}-tab-${next.id}`)?.focus();
  };
  return (
    <div className={`detail-tabs ${className}`} role="tablist" aria-label={label} ref={ref} onKeyDown={onKey}>
      {tabs.map((x) => (
        <button
          key={x.id}
          id={`${idBase}-tab-${x.id}`}
          type="button"
          role="tab"
          aria-selected={x.id === value}
          aria-controls={`${idBase}-panel`}
          tabIndex={x.id === value ? 0 : -1}
          data-autofocus={autoFocus && x.id === value ? '' : undefined}
          className={x.id === value ? 'on' : ''}
          onClick={() => onChange(x.id)}
        >
          {x.label}{x.count != null && <span className="count">{x.count}</span>}
        </button>
      ))}
    </div>
  );
}

interface Props {
  skill: Skill;
  level: number;
  locked?: boolean;
  cdr?: number;
  /** specialisations can be chosen (skill calculator) */
  editable?: boolean;
  /** list the combos this skill takes part in */
  showCombos?: boolean;
  /** allow levels above the current in-game cap (skill database, "show all levels") */
  uncapped?: boolean;
  /** show the icon/name block (off when the caller shows SkillHead above tabs) */
  head?: boolean;
  /** hide the specialisation list (the caller shows it elsewhere) */
  hideSpecs?: boolean;
  /** what the working specialisations change (skill database) */
  delta?: SpecDelta;
}

export function SkillDetail({ skill, level, locked, cdr, editable, showCombos, uncapped, head = true, hideSpecs, delta = NO_DELTA }: Props) {
  const { t } = useLoadedGame();
  const { build } = useBuild();
  const red = cdr ?? build.cdr;
  const cap = skillCap(skill);
  const top = uncapped ? skill.levels.length || 1 : Math.min(skill.levels.length || 1, cap);
  const lv = Math.max(1, Math.min(top, level));
  const cur = skill.levels[lv - 1];
  const next = lv < top ? skill.levels[lv] : undefined;
  const base = cdAt(skill, lv);
  const cd = applyCdr(base, red);
  const cdSpec = delta.noCd ? 0 : Math.max(0, cd - delta.cd);
  const cast = skill.castTimeSec;
  const castSpec = delta.speed && cast ? cast / (1 + delta.speed / 100) : cast;
  const mp = skill.cost?.mp ?? 0;
  const mpSpec = delta.mp ? Math.round(mp * (1 - delta.mp / 100)) : mp;
  return (
    <div className="skill-detail">
      {head && <SkillHead skill={skill} level={lv} locked={locked} />}

      <div className="sd-stats">
        <div className={`stat-box ${cdSpec !== cd ? 'changed' : ''}`}>
          <span className="eyebrow">{t('cooldown')}</span>
          {cd > 0 ? <CdChip cd={cdSpec} base={cdSpec !== cd ? cd : base} /> : <span className="muted">{t('noCooldown')}</span>}
        </div>
        <div className={`stat-box ${castSpec !== cast ? 'changed' : ''}`}>
          <span className="eyebrow">{t('castTime')}</span>
          <strong>
            {cast ? fmtSec(castSpec) : t('instant')}
            {castSpec !== cast && <s className="muted">{fmtSec(cast)}</s>}
          </strong>
          {delta.speed > 0 && !cast && <span className="chip subtle"><Zap size={12} /> +{delta.speed}%</span>}
        </div>
        {mp ? (
          <div className={`stat-box ${mpSpec !== mp ? 'changed' : ''}`}>
            <span className="eyebrow">{t('mpCost')}</span>
            <strong><Droplet size={13} aria-hidden /> {mpSpec}{mpSpec !== mp && <s className="muted">{mp}</s>}</strong>
          </div>
        ) : null}
        {delta.range > 0 && (
          <div className="stat-box changed">
            <span className="eyebrow">{t('specRange')}</span>
            <strong><MoveHorizontal size={13} aria-hidden /> +{delta.range} m</strong>
          </div>
        )}
        {delta.uses > 0 && (
          <div className="stat-box changed">
            <span className="eyebrow">{t('specUses')}</span>
            <strong><Repeat size={13} aria-hidden /> +{delta.uses}</strong>
          </div>
        )}
      </div>

      <p className="desc"><span className="lv-tag">{t('lv')} {lv}</span>{richText(cur?.description ?? skill.description)}</p>
      {next && (
        <p className="desc next">
          <span className="desc-label">{t('nextLevel')}</span>
          <span className="lv-tag">{t('lv')} {lv + 1}</span>{richText(next.description)}
        </p>
      )}

      {cdVaries(skill) && (
        <>
          <h4>{t('cdByLevel')}</h4>
          <div className="cd-ranges">
            {cdRanges(skill, red).map((r) => (
              <span key={r.from} className={`chip ${lv >= r.from && lv <= r.to ? 'on' : ''}`}>
                {t('lv')} {r.from}{r.to !== r.from ? `–${r.to}` : ''}: <b>{fmtCdShort(r.cd)}</b>
              </span>
            ))}
          </div>
        </>
      )}

      {editable ? <SpecPicker skill={skill} /> : !hideSpecs && skill.parts && skill.parts.length > 0 && (
        <>
          <h4>{t('specialisations')}</h4>
          <ul className="parts">
            {skill.parts.map((p) => {
              const on = lv >= p.level;
              return (
                <li key={p.id} className={on ? 'on' : ''}>
                  <PlainIcon icon={p.icon} size={28} />
                  <span>
                    <span className="lv-tag">{!on && <Lock size={11} aria-hidden />} {t('lv')} {p.level}</span>{richText(p.desc)}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {showCombos && <SkillCombos skillId={skill.id} />}

      {skill.chain && skill.chain.length > 0 && (
        <>
          <h4>{t('chainSkills')}</h4>
          <ul className="parts">
            {skill.chain.map((c) => (
              <li key={c.id} className="on">
                <PlainIcon icon={c.icon} size={28} />
                <span>
                  <b>{c.name}</b> <span className="muted small">({c.rate}% {t('chainRate')}, {c.time}s {t('chainTime')})</span>
                  <br />{richText(c.desc[Math.min(c.desc.length - 1, lv - 1)] ?? c.desc[0] ?? '')}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/** Combos of the build's class that involve this skill, best first. */
export function useSkillCombos(skillId: number) {
  const { data } = useLoadedGame();
  const { build } = useBuild();
  return sortCombos(data, build, classCombos(data, build).filter((c) => comboSkillIds(c).includes(skillId)));
}

/** Combos with this skill (max. 4, the rest on the combos page). `inTab`: no heading (the tab names it). */
export function SkillCombos({ skillId, inTab }: { skillId: number; inTab?: boolean }) {
  const { t } = useLoadedGame();
  const list = useSkillCombos(skillId);
  if (!list.length) return null;
  return (
    <>
      {!inTab && <h4 className="spec-head">{t('navCombos')} <span className="count">{list.length}</span></h4>}
      <div className="combo-list">
        {list.slice(0, 4).map((c) => <ComboCard key={c.id} combo={c} focus={skillId} compact />)}
      </div>
      <a className="link sd-more" href="#/combos">{list.length > 4 ? t('allCombosN', { n: list.length }) : t('allCombos')} <ArrowRight size={14} aria-hidden /></a>
    </>
  );
}
