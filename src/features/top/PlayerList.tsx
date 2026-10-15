import { useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, Gem, Hexagon, LayoutGrid, Shield, Sparkles, Swords } from 'lucide-react';
import type { Board, Skill } from '../../data/types';
import type { StringKey } from '../../i18n/strings';
import { useLoadedGame } from '../../data/GameDataContext';
import { normalizeBuild } from '../../state/build';
import { decodeLearned } from '../../lib/daevanionGraph';
import { useLoadBuild } from '../../components/SavedBuildsDialog';
import { InfoTip } from '../../components/InfoTip';
import type { TopGear, TopPlayer } from './types';
import { fmtDelta, fmtInt, gearGroup, gradeClass, slotName } from './topFormat';
import { BoardMap, BoardPicker } from './BoardMap';
import { GEAR_GROUPS } from './TopStatsView';
import { Ago, SkillIcon } from './parts';

const factionKey = (f: TopPlayer['faction']): StringKey | null => (f === 'Light' ? 'elyos' : f === 'Dark' ? 'asmodian' : null);

/** "8 bought · +3 Daevanion · +2 gear" */
/** bought is the planner's level (capped at what skill points can buy); levels nothing explains are shown as such */
function levelParts(t: ReturnType<typeof useLoadedGame>['t'], lv: number, dv: number, gear: number, bought: number) {
  const out = [t('topBought', { n: bought })];
  if (dv) out.push(t('topFromDv', { n: dv }));
  if (gear) out.push(t('topFromGear', { n: gear }));
  const unknown = lv - dv - gear - bought;
  if (unknown > 0) out.push(t('topUnknownSrc', { n: unknown }));
  return out.join(' · ');
}

function SkillItem({ skill, id, lv, sub, size = 40 }: { skill: Skill | undefined; id: number; lv: number; sub?: string; size?: number }) {
  const { t } = useLoadedGame();
  return (
    <li className="tp-skill">
      <SkillIcon skill={skill} level={lv} size={size} />
      <span className="tp-skill-text">
        <span className="tp-skill-name"><strong>{skill?.name ?? `#${id}`}</strong> <span className="lv-tag">{t('lv')} {lv}</span></span>
        {sub && <span className="tr-sub">{sub}</span>}
      </span>
    </li>
  );
}

function PlayerSkills({ p }: { p: TopPlayer }) {
  const { t, data } = useLoadedGame();
  const rows = p.skills
    .map((s) => ({ s, skill: data.skillById.get(s.id) }))
    .filter((r) => !r.skill?.isStigma)
    // bar skills first, then by level; same level: the game's order
    .sort((a, b) => Number(b.s.bar) - Number(a.s.bar) || b.s.lv - a.s.lv || a.s.id - b.s.id);
  const groups: { key: StringKey; list: typeof rows }[] = [
    { key: 'topOnBar', list: rows.filter((r) => r.s.bar) },
    { key: 'topOtherActives', list: rows.filter((r) => !r.s.bar && r.skill?.type !== 'passive') },
    { key: 'topPassiveSkills', list: rows.filter((r) => !r.s.bar && r.skill?.type === 'passive') },
  ];
  return (
    <section className="tp-sec tp-sec-wide">
      <h4><Swords size={14} aria-hidden /> {t('topSkills')}</h4>
      {groups.filter((g) => g.list.length).map((g) => (
        <div key={g.key} className="tp-sub">
          <h5>{t(g.key)} <span className="count">{g.list.length}</span></h5>
          <ul className="tp-skills">
            {g.list.map(({ s, skill }) => <SkillItem key={s.id} skill={skill} id={s.id} lv={s.lv} sub={levelParts(t, s.lv, s.dv, s.gear, p.build.lv[s.id] ?? 0)} />)}
          </ul>
        </div>
      ))}
    </section>
  );
}

function PlayerStigmas({ p }: { p: TopPlayer }) {
  const { t, data } = useLoadedGame();
  const slotted = p.stigmas.filter((s) => s.slot);
  const others = p.stigmas.filter((s) => !s.slot && s.lv > 0).sort((a, b) => b.lv - a.lv);
  const marked = p.stigmas.filter((s) => !s.slot && s.marked && s.lv === 0);
  const name = (id: number) => data.skillById.get(id)?.name ?? `#${id}`;
  return (
    <section className="tp-sec">
      <h4><Sparkles size={14} aria-hidden /> {t('topStigmas')}</h4>
      {slotted.length > 0
        ? <ul className="tp-skills one">{slotted.map((s) => <SkillItem key={s.id} skill={data.skillById.get(s.id)} id={s.id} lv={s.lv} />)}</ul>
        : <p className="top-note">{t('topNoStigmas')}</p>}
      {others.length > 0 && (
        <div className="tp-sub">
          <h5>{t('topAlsoLearned')}</h5>
          <ul className="tp-mini">
            {others.map((s) => (
              <li key={s.id}>
                <SkillIcon skill={data.skillById.get(s.id)} level={s.lv} size={28} />
                <span>{name(s.id)} <span className="tp-mini-lv">{t('lv')} {s.lv}</span></span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {marked.length > 0 && <p className="top-note">{t('topMarkedNote', { list: marked.map((s) => name(s.id)).join(', ') })}</p>}
    </section>
  );
}

function PlayerBoards({ p, boards }: { p: TopPlayer; boards: Board[] }) {
  const { t } = useLoadedGame();
  const known = boards.filter((b) => p.boards.some((x) => x.id === b.id) || p.build.dv[String(b.id)]);
  const [id, setId] = useState<number | null>(null);
  const board = known.find((b) => b.id === id) ?? known[0];
  const learned = useMemo(() => (board ? decodeLearned(board, p.build.dv[String(board.id)] ?? '') : new Set<string>()), [board, p.build.dv]);
  if (!board) return null;
  // open nodes at the source but no build: the board page could not be read, and an empty map would call them all
  // "not learned"
  const unread = !p.build.dv[String(board.id)] && (p.boards.find((x) => x.id === board.id)?.open ?? 0) > 0;
  return (
    <section className="tp-sec tp-sec-board">
      <h4><Hexagon size={14} aria-hidden /> {t('topDaevanion')}</h4>
      <BoardPicker
        label={t('dvBoardsLabel')}
        value={board.id}
        onChange={setId}
        boards={known.map((b) => {
          const src = p.boards.find((x) => x.id === b.id);
          const meta = t('topNodes', { n: src?.open ?? decodeLearned(b, p.build.dv[String(b.id)] ?? '').size, total: src?.total ?? b.nodes.length - 1 });
          return { id: b.id, name: b.name, meta, label: `${b.name}: ${meta}` };
        })}
      />
      {unread
        ? <p className="top-note">{t('topBoardUnread')}</p>
        : <BoardMap key={board.id} board={board} mode={{ learned }} />}
    </section>
  );
}

function GearList({ items }: { items: TopGear[] }) {
  const { t, lang } = useLoadedGame();
  return (
    <ul className="tp-gear">
      {items.map((g) => (
        <li key={g.slot}>
          <span className="tg-slot">{slotName(g.slot, lang)}</span>
          <span className={`tg-item ${gradeClass(g.grade)}`} title={g.grade}>{g.name}<span className="sr-only"> ({g.grade})</span></span>
          <span className="tg-ench">
            {g.enchant > 0 ? `+${g.enchant}` : ''}
            {g.exceed > 0 && <small> {t('topExceed', { n: g.exceed })}</small>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PlayerGear({ p }: { p: TopPlayer }) {
  const { t } = useLoadedGame();
  return (
    <section className="tp-sec">
      <h4><Shield size={14} aria-hidden /> {t('topGear')}</h4>
      {p.gear.length === 0 && <p className="top-note">{t('topNoGear')}</p>}
      {GEAR_GROUPS.map(({ id, key }) => {
        const items = p.gear.filter((g) => gearGroup(g.slot) === id);
        return items.length > 0 && (
          <div key={id} className="tp-sub">
            <h5>{t(key)}</h5>
            <GearList items={items} />
          </div>
        );
      })}
    </section>
  );
}

function PlayerExtras({ p }: { p: TopPlayer }) {
  const { t } = useLoadedGame();
  return (
    <section className="tp-sec">
      <h4><Gem size={14} aria-hidden /> {t('topArcana')}</h4>
      {p.arcana.length > 0 ? <GearList items={p.arcana} /> : <p className="top-note">{t('none')}</p>}
      <dl className="tp-facts">
        <div><dt>{t('topWings')}</dt><dd>{p.wings ?? t('none')}</dd></div>
        <div><dt>{t('topPet')}</dt><dd>{p.pet ?? t('none')}</dd></div>
      </dl>
    </section>
  );
}

/** The full build of one player (shown under the player's row). */
export function PlayerDetail({ p, id, boards }: { p: TopPlayer; id: string; boards: Board[] }) {
  const { t, lang } = useLoadedGame();
  const loadBuild = useLoadBuild();
  const build = useMemo(() => normalizeBuild(p.build), [p.build]);
  const open = () => {
    if (!build) return;
    loadBuild(build, { message: t('topLoaded', { name: p.name }) });
    location.hash = '#/skills';
  };
  const faction = factionKey(p.faction);
  return (
    <div className="tp-detail" id={id}>
      <dl className="tp-facts tp-head-facts">
        <div><dt>{t('charLevel')}</dt><dd>{p.level}</dd></div>
        <div>
          <dt>{t('topCp')}</dt>
          <dd>{fmtInt(p.cp, lang)}{p.cp7d != null && <small className={p.cp7d > 0 ? 'up' : p.cp7d < 0 ? 'down' : ''}> {t('topCp7d', { n: fmtDelta(p.cp7d, lang) })}</small>}</dd>
        </div>
        <div><dt>{t('topItemLevel')}</dt><dd>{fmtInt(p.itemLevel, lang)}</dd></div>
        <div><dt>{t('faction')}</dt><dd>{faction ? t(faction) : t('topUnknown')}</dd></div>
        <div><dt>{t('topServer')}</dt><dd>{p.server} · {t(`topRegion_${p.region}` as StringKey)}</dd></div>
        <div><dt>{t('topReadAt')}</dt><dd><Ago iso={p.updatedAt} /></dd></div>
      </dl>
      <div className="tp-actions">
        <button type="button" className="btn primary" onClick={open} disabled={!build}>
          <LayoutGrid size={16} aria-hidden /> {t('topOpenPlanner')}
        </button>
        <a className="btn ghost" href={p.url} target="_blank" rel="noopener">
          {t('topOpenSource')} <ExternalLink size={14} aria-hidden /><span className="sr-only"> ({t('gdNewTab')})</span>
        </a>
      </div>
      <p className="field-hint tp-import-note">
        <span>{t('topImportNote')}</span>
        {p.notes.length > 0 && <InfoTip label={t('topImportNotes')} text={<ul className="tp-notes">{p.notes.map((n) => <li key={n}>{n}</li>)}</ul>} />}
      </p>
      <div className="tp-sections">
        <PlayerSkills p={p} />
        <PlayerStigmas p={p} />
        <PlayerBoards p={p} boards={boards} />
        <PlayerGear p={p} />
        <PlayerExtras p={p} />
      </div>
    </div>
  );
}

function PlayerRow({ p, open, onToggle, boards, uid }: { p: TopPlayer; open: boolean; onToggle: () => void; boards: Board[]; uid: string }) {
  const { t, lang } = useLoadedGame();
  const id = `${uid}-p${p.rank}`;
  const faction = factionKey(p.faction);
  return (
    <li className={`top-player ${open ? 'open' : ''}`}>
      <h3 className="tp-h">
        <button type="button" className="tp-row" aria-expanded={open} aria-controls={open ? id : undefined} onClick={onToggle}>
          <span className={`tp-rank r${p.rank}`}><span className="sr-only">{t('topRank')} </span>{p.rank}</span>
          <span className="tp-who">
            <strong className="tp-name">{p.name}</strong>
            <span className="tp-where">
              {p.server} · {t(`topRegion_${p.region}` as StringKey)}{faction && <> · {t(faction)}</>}
            </span>
          </span>
          <span className="tp-stats">
            <span className="tp-num tp-cp"><span className="tp-v">{fmtInt(p.cp, lang)}</span> <span className="tp-l" aria-hidden>{t('topCpShort')}</span><span className="sr-only">{t('topCp')}</span></span>
            <span className="tp-num"><span className="tp-v">{fmtInt(p.itemLevel, lang)}</span> <span className="tp-l" aria-hidden>{t('topItemLevelShort')}</span><span className="sr-only">{t('topItemLevel')}</span></span>
            <span className="tp-upd"><Ago iso={p.updatedAt} short /></span>
          </span>
          <ChevronDown size={18} className="tp-chev" aria-hidden />
        </button>
      </h3>
      {open && <PlayerDetail p={p} id={id} boards={boards} />}
    </li>
  );
}

/** The players of the class: compact rows; a row opens the full build. */
export function PlayerList({ players, boards, headingId }: { players: TopPlayer[]; boards: Board[]; headingId: string }) {
  const { t } = useLoadedGame();
  const ranked = useMemo(() => [...players].sort((a, b) => a.rank - b.rank), [players]);
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const toggle = (rank: number) => setOpen((s) => {
    const next = new Set(s);
    if (!next.delete(rank)) next.add(rank);
    return next;
  });
  return (
    <section className="top-section" aria-labelledby={headingId}>
      <h2 className="top-h2" id={headingId}>{t('topPlayersTitle', { n: ranked.length })}</h2>
      <p className="top-note">{t('topPlayersHint')}</p>
      <ol className="top-players">
        {ranked.map((p) => <PlayerRow key={`${p.rank}-${p.name}`} p={p} open={open.has(p.rank)} onToggle={() => toggle(p.rank)} boards={boards} uid={headingId} />)}
      </ol>
    </section>
  );
}
