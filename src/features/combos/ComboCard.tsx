import type { ReactNode } from 'react';
import { ArrowRight, Check, CircleSlash } from 'lucide-react';
import type { Combo, ComboSetup, ComboVia } from '../../data/types';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { SkillTile } from '../../components/SkillTile';
import { activeSpecs, skillInBuild } from '../../lib/buildCalc';
import { comboReady, statusName } from '../../lib/combos';
import type { StringKey } from '../../i18n/strings';

/** Skill icon + name with badges for specialisation / chain source, chance and build state. */
function ComboSkill({ id, via, focus, extra }: { id: number; via?: ComboVia; focus?: number | null; extra?: ReactNode }) {
  const { t, data } = useLoadedGame();
  const { build } = useBuild();
  const s = data.skillById.get(id);
  if (!s) return null;
  const usable = skillInBuild(build, s);
  const part = via && 'part' in via ? via : null;
  const partOn = part ? activeSpecs(data, build, s).includes(part.part) : true;
  return (
    <span className={`combo-skill ${usable ? '' : 'missing'} ${focus === id ? 'focus' : ''}`} title={usable ? undefined : t('notInBuild')}>
      <SkillTile skill={s} size={34} dim={!usable} />
      <span className="cs-text">
        <span className="cs-name">{s.name}</span>
        <span className="cs-badges">
          {part && (
            <span className={`mini ${partOn ? 'ok' : 'warn'}`}>
              {t(s.partsAuto ? 'viaStigmaSpec' : 'viaSpec', { lvl: part.level })}
              {partOn ? <Check size={10} /> : s.partsAuto ? null : ` · ${t('specNotChosen')}`}
            </span>
          )}
          {via && 'chain' in via && <span className="mini">{t('viaChain', { name: via.chain })}</span>}
          {extra}
        </span>
      </span>
    </span>
  );
}

function setupBadges(f: ComboSetup, t: (k: StringKey, v?: Record<string, string | number>) => string) {
  return (
    <>
      {f.gauge ? <span className="mini">{t('gauge', { n: f.gauge })}</span> : f.chance > 0 && f.chance < 100 ? <span className="mini">{f.chance} %</span> : null}
      {f.npc && <span className="mini">NPC 100 %</span>}
      {f.cond && <span className="mini">{t('conditional')}</span>}
    </>
  );
}

const KIND_TITLE: Record<Combo['kind'], StringKey> = {
  status: 'comboKind_status', ref: 'comboKind_ref', burst: 'comboKind_burst', chance: 'comboKind_chance',
};

export function ComboCard({ combo: c, focus = null, compact }: { combo: Combo; focus?: number | null; compact?: boolean }) {
  const { t, data, lang } = useLoadedGame();
  const { build } = useBuild();
  const ready = comboReady(data, build, c);
  const name = (id: number) => data.skillById.get(id)?.name ?? String(id);

  let title: string;
  let text: string | null = null;
  let left: ReactNode;
  let right: ReactNode;
  let leftLabel: string | null = null;
  let rightLabel: string | null = null;

  switch (c.kind) {
    case 'status': {
      const st = statusName(c.status, lang);
      title = t('statusComboTitle', { status: st });
      leftLabel = c.status === 'Stagger' ? t('comboStaggerCauses') : c.status === 'Impact' ? t('comboImpactCauses') : t('comboCauses', { status: st });
      rightLabel = t('comboUses', { status: st });
      // the same skill can appear for several statuses of the Impact group: show it once
      const seen = new Set<string>();
      left = c.from.filter((f) => { const k = `${f.id}:${JSON.stringify(f.via)}`; if (seen.has(k)) return false; seen.add(k); return true; })
        .map((f) => (
          <ComboSkill key={`${f.id}-${f.status}-${JSON.stringify(f.via)}`} id={f.id} via={f.via} focus={focus}
            extra={<>{c.status === 'Impact' && <span className="mini">{statusName(f.status, lang)}</span>}{setupBadges(f, t)}</>} />
        ));
      right = c.to.map((x) => <ComboSkill key={`${x.id}-${JSON.stringify(x.via)}`} id={x.id} via={x.via} focus={focus} />);
      break;
    }
    case 'ref': {
      title = t('refComboTitle');
      const v = { a: name(c.from), b: name(c.to), n: c.value ?? 0 };
      text = c.rel === 'cdr' ? t(c.value ? 'comboRef_cdr' : 'comboRef_cdrPlain', v)
        : c.rel === 'reset' ? t('comboRef_reset', v)
          : c.rel === 'trigger' ? t(c.value ? 'comboRef_triggerChance' : 'comboRef_trigger', v)
            : t('comboRef_amplify', v);
      left = <ComboSkill id={c.from} via={c.via} focus={focus} />;
      right = <ComboSkill id={c.to} focus={focus} />;
      break;
    }
    case 'burst': {
      title = t('burstComboTitle');
      const effect = t(`burstEffect_${c.stat}` as StringKey, { n: c.value });
      text = t('burstText', { a: name(c.from), effect, s: c.dur });
      left = <ComboSkill id={c.from} focus={focus} />;
      right = c.to.map((id) => <ComboSkill key={id} id={id} focus={focus} />);
      break;
    }
    case 'chance': {
      title = t('chanceComboTitle');
      text = t(c.which === 'impact' ? 'chanceText_impact' : 'chanceText_any', { a: name(c.from), n: c.value });
      left = <ComboSkill id={c.from} focus={focus} />;
      right = c.to.map((id) => <ComboSkill key={id} id={id} focus={focus} />);
      break;
    }
  }

  return (
    <article className={`combo-card kind-${c.kind} ${ready ? 'ready' : ''} ${compact ? 'compact' : ''}`}>
      <header className="combo-head">
        <div>
          {!compact && <span className="combo-kind">{t(KIND_TITLE[c.kind])}</span>}
          <h3>{title}</h3>
        </div>
        <span className={`combo-state ${ready ? 'ok' : ''}`} title={ready ? t('comboReady') : t('notInBuild')}>
          {ready ? <Check size={14} /> : <CircleSlash size={14} />}
          {!compact && <span>{ready ? t('comboReady') : t('notInBuild')}</span>}
        </span>
      </header>
      {text && <p className="combo-text">{text}</p>}
      <div className="combo-flow">
        <div className="combo-col">
          {leftLabel && <span className="eyebrow">{leftLabel}</span>}
          <div className="combo-skills">{left}</div>
        </div>
        <ArrowRight className="combo-arrow" size={18} aria-hidden />
        <div className="combo-col">
          {rightLabel && <span className="eyebrow">{rightLabel}</span>}
          <div className="combo-skills">{right}</div>
        </div>
      </div>
    </article>
  );
}
