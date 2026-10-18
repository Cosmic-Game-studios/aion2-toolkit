import { memo, useEffect, useId, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Check, ChevronDown, Clock, Crosshair, Flag, Link2, MapPin, Pencil, Plus, RotateCcw, SearchX, Send } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { EmptyState } from '../../components/ui';
import { SectionHead } from '../../components/SectionHead';
import { CATEGORIES, CATEGORY_GROUPS, GROUP_NAMES, categoryById, type CategoryGroup, type FarmSpot, type Lang, type Region } from './farmRules';
import { categoryIcon, GROUP_COLOR } from './farmIcons';
import type { Draft } from './farmDrafts';
import { canFind } from './farmFound';
import { reportUrl } from './farmSubmit';

/*
 * The spots of one region as cards: the player's own drafts first, then the approved spots grouped by category
 * group. A card with a position selects its marker on the map; a marker's spot shows as a preview card under the map.
 * A long group shows GROUP_CAP cards and a button for the rest (a region can have hundreds of spots). The selected
 * card and the preview have the "Found" switch and "Copy link"; the other cards only say that a spot was found (a
 * switch on each of hundreds of cards would be hundreds more tab stops), unless they cannot be selected (no position).
 * The Map Overlay's gathering points respawn and have no switch at all.
 */

const GROUP_CAP = 60;

/** Marker and selection id of a draft (approved spots use their own id, "<issue>-<n>"). */
export const draftKey = (cid: string) => `draft:${cid}`;
/** DOM id of a spot's card, so the page can scroll to it. */
export const cardDomId = (key: string) => `farm-spot-${key.replace(/[^A-Za-z0-9-]/g, '_')}`;

const CAT_ORDER = new Map(CATEGORIES.map((c, i) => [c.id, i]));
// a category the rules do not know (a hand edit of spots.json) still shows, under "Places"
const groupOf = (cat: string): CategoryGroup => categoryById(cat)?.group ?? 'place';
const isDraft = (s: FarmSpot | Draft): s is Draft => 'status' in s;

/**
 * The cards of a long group before "Show all": GROUP_CAP shared between its categories, so a big category (61
 * Kibelisks) does not push the ones after it (dungeon entrances, strongholds) out of the short list. The smallest
 * categories show in full and the others split what is left; the list keeps its order.
 */
function shortList(list: FarmSpot[]): Set<FarmSpot> {
  const counts = new Map<string, number>();
  for (const s of list) counts.set(s.cat, (counts.get(s.cat) ?? 0) + 1);
  const bySize = [...counts].sort((a, b) => a[1] - b[1]);
  const quota = new Map<string, number>();
  let left = GROUP_CAP;
  bySize.forEach(([cat, n], i) => {
    const q = Math.min(n, Math.floor(left / (bySize.length - i)));
    quota.set(cat, q);
    left -= q;
  });
  const taken = new Map<string, number>();
  return new Set(list.filter((s) => {
    const k = (taken.get(s.cat) ?? 0) + 1;
    taken.set(s.cat, k);
    return k <= (quota.get(s.cat) ?? 0);
  }));
}

const dayFormats = new Map<string, Intl.DateTimeFormat>();
/** "3 Oct 2026" / "3. Okt. 2026"; `utc` for the approval day (a plain YYYY-MM-DD), local time for drafts */
export function fmtDay(iso: string, lang: Lang, utc: boolean): string {
  const d = new Date(utc && /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  const key = `${lang}-${utc}`;
  let f = dayFormats.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: utc ? 'UTC' : undefined });
    dayFormats.set(key, f);
  }
  return f.format(d);
}

interface CardProps {
  spot: FarmSpot | Draft;
  /** marker id: the spot id, or draftKey(cid) */
  id: string;
  selected: boolean;
  hasImage: boolean;
  /** the map waits for a position: editing would drop the spot being placed */
  picking: boolean;
  onSelect: (id: string, showMap: boolean) => void;
  onEdit: (d: Draft) => void;
  /** the copy under the map: no element id (the list card keeps it) and no "Show on map" */
  preview?: boolean;
  /** the player marked the spot found (drafts and gathering points that respawn never are) */
  found?: boolean;
  onFound?: (id: string) => void;
  /** copies a link to the spot (spots with a marker only) */
  onCopyLink?: (id: string) => void;
}

/** One spot (memoised: a region can have hundreds). */
export const SpotCard = memo(function SpotCard({ spot, id, selected, hasImage, picking, onSelect, onEdit, preview, found, onFound, onCopyLink }: CardProps) {
  const { t, lang } = useGame();
  const cat = categoryById(spot.cat);
  const Icon = categoryIcon(spot.cat);
  const draft = isDraft(spot) ? spot : null;
  const onMap = hasImage && !!spot.pos;
  const lv = spot.level;
  const nameSr = <span className="sr-only">: {spot.name}</span>;
  // the switch where the player is looking at the spot, and on cards that cannot be selected (else they had none)
  const current = !!preview || (selected && onMap);
  const findable = !draft && !!onFound && canFind(spot as FarmSpot);
  const mat = draft ? undefined : (spot as FarmSpot).mat;
  const showSwitch = findable && (current || !onMap);

  const date = draft ? fmtDay(draft.savedAt, lang, false) : fmtDay((spot as FarmSpot).added, lang, true);
  const src = draft ? undefined : (spot as FarmSpot).src;
  const byLine = draft
    ? (spot.by ? t('farmListSavedBy', { name: spot.by, date }) : t('farmListSaved', { date }))
    // the Map Overlay's gathering points: its credit, the day they were taken and the client they come from
    : src === 'overlay' ? t('farmListFromOverlay', { date })
    // the cubes of that data are placed as in the KR/TW client; Global's cubes follow another model, so say so
    : src ? t(spot.cat === 'cube' ? 'farmListFromSourceKrTw' : 'farmListFromSource')
    : (spot.by ? t('farmListAddedBy', { name: spot.by, date }) : t('farmListAdded', { date }));

  // a click anywhere on the card selects its marker; its buttons and links keep their own action
  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!onMap || preview || (e.target as Element).closest('a, button')) return;
    onSelect(id, false);
  };

  return (
    <li
      id={preview ? undefined : cardDomId(id)}
      className={`farm-card ${draft ? 'pending' : ''} ${onMap && !preview ? 'has-map' : ''} ${selected ? 'on' : ''} ${preview ? 'preview' : ''} ${found && findable ? 'found' : ''}`}
      style={{ '--fc': GROUP_COLOR[groupOf(spot.cat)] } as CSSProperties}
      onClick={onClick}
    >
      <span className="farm-ico" aria-hidden><Icon size={18} /></span>
      <div className="farm-card-main">
        <h4 className="farm-card-name">
          {spot.name}
          {selected && onMap && <span className="sr-only"> ({t('farmListSelected')})</span>}
        </h4>
        <p className="farm-card-meta">
          <span>{cat?.name[lang] ?? spot.cat}</span>
          {mat && <span><span className="sr-only">{t('farmListMat')}: </span>{mat}</span>}
          {lv && <span className="farm-lv">{t('lv')} {lv[0] === lv[1] ? lv[0] : `${lv[0]}–${lv[1]}`}</span>}
        </p>
        {draft && (
          <p className={`farm-status ${draft.status}`}>
            {draft.status === 'sent' ? <Send size={13} aria-hidden /> : <Clock size={13} aria-hidden />}
            {t(draft.status === 'sent' ? 'farmListSent' : 'farmListDraft')}
          </p>
        )}
        {found && findable && !showSwitch && (
          <p className="farm-status found"><Check size={13} aria-hidden />{t('farmFound')}</p>
        )}
        {spot.area && (
          <p className="farm-card-area">
            <MapPin size={14} aria-hidden />
            <span><span className="sr-only">{t('farmListWhere')}: </span>{spot.area}</span>
          </p>
        )}
        {spot.drops && spot.drops.length > 0 && (
          <div className="farm-drops">
            <span className="farm-drops-label" aria-hidden>{t('farmListDrops')}</span>
            <ul className="chips" aria-label={t('farmListDrops')}>
              {spot.drops.map((d) => <li key={d} className="chip">{d}</li>)}
            </ul>
          </div>
        )}
        {spot.note && <p className="farm-card-note">{spot.note}</p>}
        <p className="farm-card-by">{byLine}</p>
        <div className="farm-card-actions">
          {onMap && !preview && (
            <button type="button" className="btn ghost sm" onClick={() => onSelect(id, true)}>
              <Crosshair size={14} aria-hidden /> {t('farmListShowOnMap')}{nameSr}
            </button>
          )}
          {showSwitch && (
            <button type="button" className="btn ghost sm farm-found-btn" aria-pressed={!!found} onClick={() => onFound?.(id)}>
              <Check size={14} aria-hidden /> {t('farmFound')}{nameSr}
            </button>
          )}
          {current && onMap && !draft && onCopyLink && (
            <button type="button" className="btn ghost sm" onClick={() => onCopyLink(id)}>
              <Link2 size={14} aria-hidden /> {t('farmCopyLink')}{nameSr}
            </button>
          )}
          {draft ? (
            <button type="button" className="btn sm" onClick={() => onEdit(draft)} disabled={picking}>
              <Pencil size={14} aria-hidden /> {t('edit')}{nameSr}
            </button>
          ) : (
            <a className="btn ghost sm" href={reportUrl(spot as FarmSpot, lang)} target="_blank" rel="noopener">
              <Flag size={14} aria-hidden /> {t('farmListReport')}{nameSr}<span className="sr-only"> ({t('gdNewTab')})</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
});

export function SpotList({ region, spots, drafts, total, selected, hasImage, picking, onSelect, onEdit, onAdd, onReset, found, onFound, onCopyLink }: {
  region: Region;
  /** approved spots of the region that pass the filters */
  spots: FarmSpot[];
  /** the player's drafts of this region (always shown, filters or not) */
  drafts: Draft[];
  /** approved spots of the region before filtering */
  total: number;
  selected: string | null;
  /** the region has a map picture ("Show on map" exists only then) */
  hasImage: boolean;
  picking: boolean;
  /** `showMap`: also bring the map into view ("Show on map"), not only highlight the marker */
  onSelect: (id: string, showMap: boolean) => void;
  onEdit: (d: Draft) => void;
  onAdd: () => void;
  onReset: () => void;
  /** the region's found spot ids */
  found: ReadonlySet<string>;
  onFound: (id: string) => void;
  onCopyLink: (id: string) => void;
}) {
  const { t, lang } = useGame();
  const headRef = useRef<HTMLHeadingElement>(null);
  const uid = useId().replace(/:/g, '');
  const regionName = region.name[lang];
  // groups the player opened in full; a new region starts short again
  const [open, setOpen] = useState<ReadonlySet<CategoryGroup>>(() => new Set());
  useEffect(() => setOpen(new Set()), [region.id]);

  const groups = useMemo(() => {
    // numeric: "Empyrean trace 2" before "Empyrean trace 10"
    const collator = new Intl.Collator(lang, { numeric: true });
    return CATEGORY_GROUPS.map((g) => ({
      g,
      spots: spots
        .filter((s) => groupOf(s.cat) === g)
        // per category the players' spots first, then the other source's by area ("Hidden cube #1" of each area)
        .sort((a, b) => (CAT_ORDER.get(a.cat) ?? 99) - (CAT_ORDER.get(b.cat) ?? 99)
          || Number(!!a.src) - Number(!!b.src)
          || (a.src ? collator.compare(a.area ?? '', b.area ?? '') : 0)
          || collator.compare(a.name, b.name)),
    }))
      .filter((x) => x.spots.length > 0)
      .map((x) => ({ ...x, short: x.spots.length > GROUP_CAP ? shortList(x.spots) : null }));
  }, [spots, lang]);

  // the empty state with the reset button disappears with the reset: the focus moves on to the list heading
  const reset = () => {
    onReset();
    requestAnimationFrame(() => headRef.current?.focus({ preventScroll: true }));
  };

  const card = (s: FarmSpot | Draft, id: string) => (
    <SpotCard
      key={id} spot={s} id={id} selected={selected === id} hasImage={hasImage} picking={picking} onSelect={onSelect} onEdit={onEdit}
      found={found.has(id)} onFound={onFound} onCopyLink={onCopyLink}
    />
  );

  return (
    <section className="farm-list" aria-labelledby={`${uid}-h`}>
      <SectionHead id={`${uid}-h`} headRef={headRef} title={t('farmListTitle', { region: regionName })} flush />

      {drafts.length > 0 && (
        <div className="farm-group farm-mine">
          <h3 className="farm-h3">{t('farmListMine')} <span className="count">{drafts.length}</span></h3>
          <ul className="farm-cards">{drafts.map((d) => card(d, draftKey(d.cid)))}</ul>
        </div>
      )}

      {total === 0 && drafts.length === 0 && (
        <div className="card farm-empty">
          <EmptyState
            icon={<MapPin size={28} aria-hidden />}
            text={t('farmListEmpty', { region: regionName })}
            action={(
              <button type="button" className="btn" onClick={onAdd} disabled={picking}>
                <Plus size={16} aria-hidden /> {t('farmPageAdd')}
              </button>
            )}
          />
        </div>
      )}
      {total > 0 && spots.length === 0 && (
        <div className="card farm-empty">
          <EmptyState
            icon={<SearchX size={28} aria-hidden />}
            text={t('farmListNoMatch')}
            action={<button type="button" className="btn sm" onClick={reset}><RotateCcw size={14} aria-hidden /> {t('farmFilterReset')}</button>}
          />
        </div>
      )}

      {groups.map(({ g, spots: list, short }) => {
        // the short list, or null when the group shows in full
        const cut = open.has(g) ? null : short;
        // the selected spot stays in the list even past the cut ("Show on map" and its highlight)
        const sel = cut && selected ? list.find((s) => s.id === selected) : undefined;
        const visible = cut ? list.filter((s) => cut.has(s) || s === sel) : list;
        const more = cut && (
          <button
            type="button" className="btn ghost sm farm-more"
            onClick={(e) => {
              // the focus moves on to the first card that was hidden
              const ul = e.currentTarget.previousElementSibling;
              const first = list.findIndex((s) => !cut.has(s));
              setOpen((o) => new Set(o).add(g));
              requestAnimationFrame(() => ul?.children[first]?.querySelector<HTMLElement>('button, a')?.focus());
            }}
          >
            {/* mid-sentence in English, so "places" (German nouns keep their capital) */}
            <ChevronDown size={14} aria-hidden /> {t('farmListShowAll', { n: list.length, group: lang === 'en' ? GROUP_NAMES[g].en.toLowerCase() : GROUP_NAMES[g].de })}
          </button>
        );
        return (
          <div key={g} className="farm-group" style={{ '--fc': GROUP_COLOR[g] } as CSSProperties}>
            <h3 className="farm-h3"><span className="farm-dot" aria-hidden />{GROUP_NAMES[g][lang]} <span className="count">{list.length}</span></h3>
            <ul className="farm-cards">{visible.map((s) => card(s, s.id))}</ul>
            {more}
          </div>
        );
      })}
    </section>
  );
}
