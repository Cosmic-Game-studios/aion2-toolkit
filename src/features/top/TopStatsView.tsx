import type { ReactNode } from 'react';
import { BarChart3, Shield, Sparkles, Swords } from 'lucide-react';
import type { StringKey } from '../../i18n/strings';
import { useLoadedGame } from '../../data/GameDataContext';
import { SectionHead } from '../../components/SectionHead';
import type { GearSlotStat, TopStats } from './topStats';
import { fmtAvg, fmtInt, gearGroup, gradeClass, slotName, type GearGroup } from './topFormat';
import { Frac, SkillIcon } from './parts';

export const GEAR_GROUPS: { id: GearGroup; key: StringKey }[] = [
  { id: 'weapon', key: 'topGroupWeapon' },
  { id: 'armour', key: 'topGroupArmour' },
  { id: 'accessory', key: 'topGroupAccessory' },
  { id: 'rune', key: 'topGroupRune' },
];

/** Card with an h3 title (the section above has the h2). */
export function TopCard({ title, icon, children, className = '' }: { title: string; icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`card top-card ${className}`}>
      <header className="card-head"><h3>{icon}{title}</h3></header>
      {children}
    </section>
  );
}

function Overview({ s }: { s: TopStats }) {
  const { t, lang } = useLoadedGame();
  const kpis: [string, string][] = [];
  if (s.cp) {
    kpis.push([t('topCpRank', { n: s.cp.firstRank }), fmtInt(s.cp.first, lang)]);
    kpis.push([t('topCpRank', { n: s.cp.lastRank }), fmtInt(s.cp.last, lang)]);
    kpis.push([t('topCpMedian'), fmtInt(s.cp.median, lang)]);
  }
  if (s.avgItemLevel != null) kpis.push([t('topAvgItemLevel'), fmtInt(Math.round(s.avgItemLevel), lang)]);
  const faction = (f: string | null) => (f === 'Light' ? t('elyos') : f === 'Dark' ? t('asmodian') : t('topUnknown'));
  return (
    <TopCard title={t('topOverview')} icon={<BarChart3 size={18} aria-hidden />} className="top-overview">
      <dl className="top-kpis">
        {kpis.map(([label, value], i) => <div key={i}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <dl className="top-spread">
        <div>
          <dt>{t('topRegions')}</dt>
          <dd>{s.regions.map((r) => <span key={r.key} className="chip">{t(`topRegion_${r.key}` as StringKey)} <b>{r.n}</b></span>)}</dd>
        </div>
        <div>
          <dt>{t('topFactions')}</dt>
          <dd>{s.factions.map((f) => <span key={f.key ?? '-'} className="chip">{faction(f.key)} <b>{f.n}</b></span>)}</dd>
        </div>
      </dl>
    </TopCard>
  );
}

function StigmaStats({ s }: { s: TopStats }) {
  const { t, lang, data } = useLoadedGame();
  const list = s.stigmas.filter((x) => x.slotted > 0);
  const others = s.stigmas.filter((x) => x.slotted === 0);
  const name = (id: number) => data.skillById.get(id)?.name ?? `#${id}`;
  return (
    <TopCard title={t('topStigmas')} icon={<Sparkles size={18} aria-hidden />}>
      {s.stigmaSet && (
        <div className="top-set">
          <span className="eyebrow">{t('topCommonSet', { n: s.stigmaSet.ids.length })}</span>
          <div className="top-set-row">
            <span className="top-set-icons">
              {s.stigmaSet.ids.map((id) => <SkillIcon key={id} skill={data.skillById.get(id)} level={1} size={40} />)}
            </span>
            <span className="top-set-text">
              <span>{s.stigmaSet.ids.map(name).join(' · ')}</span>
              <strong>{t('topPlayersOf', { n: s.stigmaSet.n, m: s.players })}</strong>
            </span>
          </div>
        </div>
      )}
      <ul className="top-rows">
        {list.map((x) => {
          const skill = data.skillById.get(x.id);
          return (
            <li key={x.id} className="top-row">
              <SkillIcon skill={skill} level={Math.round(x.avgLv ?? 1)} size={36} />
              <span className="tr-main">
                <strong>{skill?.name ?? `#${x.id}`}</strong>
                {x.avgLv != null && <span className="tr-sub">{t('topAvgLv', { n: fmtAvg(x.avgLv, lang) })}</span>}
              </span>
              <Frac n={x.slotted} of={s.players} sr={t('topSlottedBy', { n: x.slotted, m: s.players })} />
            </li>
          );
        })}
      </ul>
      {others.length > 0 && (
        <p className="top-note">{t('topStigmaOthers')}: {others.map((x) => `${name(x.id)} (${x.learned}/${s.players})`).join(', ')}</p>
      )}
    </TopCard>
  );
}

function SkillStats({ s }: { s: TopStats }) {
  const { t, lang, data } = useLoadedGame();
  const known = s.skills.map((x) => ({ x, skill: data.skillById.get(x.id) })).filter((r) => !r.skill?.isStigma);
  const groups: { key: StringKey; rows: typeof known; bar: boolean }[] = [
    { key: 'topActiveSkills', rows: known.filter((r) => r.skill?.type !== 'passive'), bar: true },
    { key: 'topPassiveSkills', rows: known.filter((r) => r.skill?.type === 'passive'), bar: false },
  ];
  return (
    <TopCard title={t('topSkills')} icon={<Swords size={18} aria-hidden />} className="top-skills">
      {groups.filter((g) => g.rows.length).map((g) => (
        <div key={g.key} className="top-group">
          <h4>{t(g.key)}</h4>
          <ul className="top-rows">
            {g.rows.map(({ x, skill }) => (
              <li key={x.id} className="top-row">
                <SkillIcon skill={skill} level={Math.round(x.avgLv)} size={36} />
                <span className="tr-main">
                  <strong>{skill?.name ?? `#${x.id}`}</strong>
                  <span className="tr-sub">
                    {t('topAvgLvRange', { n: fmtAvg(x.avgLv, lang), min: x.minLv, max: x.maxLv })}
                    {(x.avgDv > 0 || x.avgGear > 0) && ` · ${t('topAvgParts', { dv: fmtAvg(x.avgDv, lang), gear: fmtAvg(x.avgGear, lang) })}`}
                  </span>
                </span>
                {g.bar
                  ? <Frac n={x.bar} of={s.players} sr={t('topOnBarOf', { n: x.bar, m: s.players })} />
                  : <Frac n={x.learned} of={s.players} sr={t('topLearnedBy', { n: x.learned, m: s.players })} />}
              </li>
            ))}
          </ul>
          {g.bar && <p className="top-note">{t('topBarNote')}</p>}
        </div>
      ))}
    </TopCard>
  );
}

export function GearRows({ rows, of }: { rows: GearSlotStat[]; of: number }) {
  const { t, lang } = useLoadedGame();
  return (
    <ul className="top-gear">
      {rows.map((g) => (
        <li key={g.slot}>
          <span className="tg-slot">{slotName(g.slot, lang)}</span>
          <span className={`tg-item ${gradeClass(g.top.grade)}`} title={g.top.grade}>
            {g.top.name}<span className="sr-only"> ({g.top.grade})</span>
          </span>
          <Frac n={g.top.n} of={of} sr={t('topPlayersOf', { n: g.top.n, m: of })} />
          <span className="tg-ench">
            {t('topAvgEnchant', { n: fmtAvg(g.avgEnchant, lang) })}
            {g.avgExceed > 0 && <small> {t('topAvgExceed', { n: fmtAvg(g.avgExceed, lang) })}</small>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function GearStats({ s }: { s: TopStats }) {
  const { t } = useLoadedGame();
  if (!s.gear.length && !s.arcana.length) return null;
  return (
    <TopCard title={t('topGear')} icon={<Shield size={18} aria-hidden />} className="top-gear-card">
      <p className="top-note">{t('topGearHint')}</p>
      {GEAR_GROUPS.map(({ id, key }) => {
        const rows = s.gear.filter((g) => gearGroup(g.slot) === id);
        return rows.length > 0 && (
          <div key={id} className="top-group">
            <h4>{t(key)}</h4>
            <GearRows rows={rows} of={s.players} />
          </div>
        );
      })}
      {s.arcana.length > 0 && (
        <div className="top-group">
          <h4>{t('topArcana')}</h4>
          <GearRows rows={s.arcana} of={s.players} />
        </div>
      )}
    </TopCard>
  );
}

/** Everything the page computes across the players of the class. */
export function TopStatsView({ s, headingId }: { s: TopStats; headingId: string }) {
  const { t } = useLoadedGame();
  return (
    <section className="top-section" aria-labelledby={headingId}>
      <SectionHead id={headingId} title={t('topStatsTitle', { n: s.players })} flush />
      <div className="top-stats">
        <Overview s={s} />
        <StigmaStats s={s} />
        <SkillStats s={s} />
        <GearStats s={s} />
      </div>
    </section>
  );
}
