import { ArrowRight, Droplet, Lock } from 'lucide-react';
import type { Skill } from '../data/types';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { applyCdr, cdAt, cdVaries, fmtCdShort } from '../lib/cooldown';
import { richText } from '../lib/format';
import { SkillTile, PlainIcon } from './SkillTile';
import { CdChip } from './ui';
import { SpecPicker } from './SpecPicker';
import { ComboCard } from '../features/combos/ComboCard';
import { classCombos, comboSkillIds, sortCombos } from '../lib/combos';

/** Groups consecutive levels with the same cooldown: "Lv. 1–4: 63s". */
function cdRanges(skill: Skill, cdr: number) {
  const out: { from: number; to: number; cd: number }[] = [];
  skill.levels.forEach((l) => {
    const cd = applyCdr(l.cooldownSec, cdr);
    const last = out[out.length - 1];
    if (last && last.cd === cd) last.to = l.level;
    else out.push({ from: l.level, to: l.level, cd });
  });
  return out;
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
}

export function SkillDetail({ skill, level, locked, cdr, editable, showCombos }: Props) {
  const { t } = useLoadedGame();
  const { build } = useBuild();
  const red = cdr ?? build.cdr;
  const lv = Math.max(1, Math.min(skill.levels.length || 1, level));
  const cur = skill.levels[lv - 1];
  const next = skill.levels[lv];
  const base = cdAt(skill, lv);
  const cd = applyCdr(base, red);
  const kind = skill.isStigma ? 'stigma' : skill.type;
  return (
    <div className="skill-detail">
      <div className="sd-head">
        <SkillTile skill={skill} level={lv} size={64} showCd={false} tip={false} />
        <div>
          <h3 className="sd-name">{skill.name}</h3>
          <div className="chips">
            <span className={`kind-tag ${kind}`}>{skill.isStigma ? t('stigma') : t(skill.type)}</span>
            <span className="chip">{t('lv')} {lv} / {skill.maxLevel}</span>
            {skill.acquireLevel > 1 && <span className="chip">{t('acquireLevel')} {skill.acquireLevel}</span>}
            {locked && <span className="chip warn"><Lock size={12} /> {t('lockedUntil', { lvl: skill.acquireLevel })}</span>}
          </div>
        </div>
      </div>

      <div className="sd-stats">
        <div className="stat-box">
          <span className="eyebrow">{t('cooldown')}</span>
          {cd > 0 ? <CdChip cd={cd} base={base} /> : <span className="muted">{t('noCooldown')}</span>}
        </div>
        <div className="stat-box">
          <span className="eyebrow">{t('castTime')}</span>
          <strong>{skill.castTimeSec ? `${skill.castTimeSec} s` : t('instant')}</strong>
        </div>
        {skill.cost?.mp ? (
          <div className="stat-box">
            <span className="eyebrow">{t('mpCost')}</span>
            <strong><Droplet size={13} /> {skill.cost.mp}</strong>
          </div>
        ) : null}
      </div>

      <p className="desc"><span className="lv-tag">{t('lv')} {lv}</span>{richText(cur?.description ?? skill.description)}</p>
      {next && <p className="desc next"><span className="lv-tag">{t('lv')} {lv + 1}</span>{richText(next.description)}</p>}

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

      {editable ? <SpecPicker skill={skill} /> : skill.parts && skill.parts.length > 0 && (
        <>
          <h4>{t('specialisations')}</h4>
          <ul className="parts">
            {skill.parts.map((p) => (
              <li key={p.id} className={lv >= p.level ? 'on' : ''}>
                <PlainIcon icon={p.icon} size={28} />
                <span><span className="lv-tag">{t('lv')} {p.level}</span>{richText(p.desc)}</span>
              </li>
            ))}
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

/** Combos of the build's class that involve this skill (max. 4, the rest on the combos page). */
function SkillCombos({ skillId }: { skillId: number }) {
  const { t, data } = useLoadedGame();
  const { build } = useBuild();
  const list = sortCombos(data, build, classCombos(data, build).filter((c) => comboSkillIds(c).includes(skillId)));
  if (!list.length) return null;
  return (
    <>
      <h4 className="spec-head">{t('navCombos')} <span className="count">{list.length}</span></h4>
      <div className="combo-list">
        {list.slice(0, 4).map((c, i) => <ComboCard key={i} combo={c} focus={skillId} compact />)}
      </div>
      <a className="link small" href="#/combos">{t('allCombos')} <ArrowRight size={13} /></a>
    </>
  );
}
