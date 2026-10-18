import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ImageOff, Info, Map as MapIcon, Plus, RefreshCw, TriangleAlert, X } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { PageHeader, Segmented } from '../../components/ui';
import { Modal } from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { MQ, matches, useMediaQuery } from '../../components/hooks';
import { copyText, readHash } from '../../lib/shareLink';
import { storage } from '../../lib/storage';
import { CATEGORIES, FACTIONS, FACTION_NAMES, REGIONS, categoryById, regionById, type FactionId, type FarmSpot, type Region, type SpotInput } from './farmRules';
import { useFarmSpots, useSourceData } from './farmData';
import { draftDone, useFarmDrafts, type Draft } from './farmDrafts';
import { canFind, foundIn, isSpotId, toggleFound, useFound } from './farmFound';
import { FarmMap, MAX_ZOOM, type MapMarker, type MapReveal, type MapView } from './FarmMap';
import { benchCount } from './farmBench';
import { SpotForm } from './SpotForm';
import { DraftsPanel } from './DraftsPanel';
import {
  FARM_MOBILE, FarmFilters, NO_FILTERS, matKey, parseCats, sameCats, searchText, spotCount, spotFilter, useFarmFilters, type FarmFilterState,
  type MatCount,
} from './FarmFilters';
import { FarmProgress } from './FarmProgress';
import { buildJumpIndex, type JumpEntry, type JumpSpot } from './farmJump';
import { SpotCard, SpotList, cardDomId, draftKey, fmtDay } from './SpotList';

/*
 * The farm map: spots players saw in the game, the AION2 Interactive Map's spots and the Map Overlay's gathering points
 * (farmData), per region. A faction switch and the region chips pick the region
 * (#/farm/<region>), the filters sit in a sticky left column, the map (once the region has a picture) and the spot
 * list on the right. Players note new spots as drafts in their browser and send them as a GitHub issue; the page also
 * runs the "set the position on the map" step of the form. Players mark spots found (farmFound); the address names
 * the selected spot, the view and the hidden categories, so a reload or a copied link opens the same. The search box
 * jumps to areas and spots of any region (farmJump). Below FARM_MOBILE the map takes the width, and the filters and
 * the selected spot's card open as bottom sheets.
 */

const REGION_KEY = 'farm:region';
const DEFAULT_REGION = 'verteron';
const NONE: FarmSpot[] = [];
/** the address follows the map this long after the last change (a view comes to rest many times while exploring) */
const HASH_DELAY = 500;
/** a copied spot link and a pick of the search open at least this far zoomed in: past DOTS_BELOW (farmCanvas), where
 *  every spot has its icon */
const LINK_ZOOM = 3;

/** The region of the address; else the last one the player looked at; else Verteron. */
function pickRegion(param: string | null): Region {
  return regionById((param ?? '').toLowerCase()) ?? regionById(storage.get<string>(REGION_KEY, '')) ?? regionById(DEFAULT_REGION) ?? REGIONS[0];
}

/** "<fx>,<fy>,<zoom>" of a link: the middle of the view as fractions of the picture and the zoom (1: the whole picture) */
function parseView(param: string | null): MapView | null {
  const n = (param ?? '').split(',').map((s) => (s.trim() ? Number(s) : NaN));
  if (n.length !== 3 || !n.every(Number.isFinite)) return null;
  const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
  return { fx: clamp(n[0], 0, 1), fy: clamp(n[1], 0, 1), zoom: clamp(n[2], 1, MAX_ZOOM) };
}

/** #/farm/<region>?m=<spot>&v=<fx>,<fy>,<zoom>&l=<hidden categories>, each part only when there is one */
function farmHash(region: string, { m, v, l, bench }: { m?: string | null; v?: MapView | null; l?: string[]; bench?: number }) {
  const q: string[] = [];
  if (m) q.push(`m=${encodeURIComponent(m)}`);
  if (v) q.push(`v=${+v.fx.toFixed(4)},${+v.fy.toFixed(4)},${+v.zoom.toFixed(2)}`);
  if (l?.length) q.push(`l=${l.join(',')}`);
  if (bench) q.push(`bench=${bench}`);
  return `#/farm/${region}${q.length ? `?${q.join('&')}` : ''}`;
}

/** What an address asks of the page: its region, and for this visit a spot, a view and the hidden categories. */
interface Link { region: string; m: string | null; v: MapView | null; l: string[] | null }

/**
 * The page marks the history entries it wrote (history.state[OWN_ENTRY]) and notes a link's categories that were in
 * force then: the `l` of such an entry are the player's own categories of that moment, not a link's.
 */
const OWN_ENTRY = 'farmPage';
interface OwnEntry { linkOff: string[] | null }

function ownEntry(): OwnEntry | null {
  const st: unknown = history.state;
  const e = st && typeof st === 'object' ? (st as Record<string, unknown>)[OWN_ENTRY] : null;
  if (!e || typeof e !== 'object') return null;
  const off = (e as Record<string, unknown>).linkOff;
  return { linkOff: Array.isArray(off) ? parseCats(off.filter((c): c is string => typeof c === 'string').join(',')) : null };
}

function readLink(param: string | null): Link {
  const h = readHash();
  const farm = h.base === '/farm';
  const region = pickRegion(farm ? h.param : param).id;
  if (!farm) return { region, m: null, v: null, l: null };
  const m = h.params.get('m');
  // back / forward or a reload on an entry the page wrote: its `l` may be older than the saved categories (they are
  // written to the address as the player changes them), so the saved ones count, or a link's that were in force then;
  // a link that was pasted or clicked is a new entry without the mark and brings its categories
  const own = ownEntry();
  const l = own ? own.linkOff : parseCats(h.params.get('l'));
  return { region, m: m && isSpotId(m) ? m : null, v: parseView(h.params.get('v')), l };
}

/** a view a link asks for, with its region (the map of another region must not take it) */
type GoTo = MapView & { region: string };
const goToOf = (link: Link): GoTo | null => (link.v ? { ...link.v, region: link.region } : null);

const scrollBehavior = (): ScrollBehavior => (matches(MQ.reducedMotion) ? 'auto' : 'smooth');
/** a pick of the search that leaves nothing to focus: on a phone the touch keyboard closes, so the page shows; with a
 *  keyboard (also in a narrow or zoomed-in window) the focus stays in the search box, where the player goes on */
const closeTouchKeyboard = () => {
  if (matches(FARM_MOBILE) && matches(MQ.coarse)) (document.activeElement as HTMLElement | null)?.blur();
};
/** the map comes into view: on phones its top under the top bar (a bottom sheet may cover its lower part), else with
 *  as little scrolling as it takes */
const mapBlock = (): ScrollLogicalPosition => (matches(FARM_MOBILE) ? 'start' : 'nearest');

/** The form stays mounted (it keeps the "I saw it myself" tick across the trip to the map) and starts from `initial`
 *  every time it opens. */
interface FormState {
  open: boolean;
  /** the region the spot belongs to */
  region: string;
  initial?: Partial<SpotInput>;
}

/** The spot being placed on the map while the form waits. */
interface Picking { region: string; current: Partial<SpotInput> }

/**
 * Selected marker / card; `scroll` says what to bring into view: the map ("Show on map"), or the spot's preview card
 * under the map (a marker click: the page stays at the map instead of jumping to the list).
 */
interface Selection { id: string; scroll: 'preview' | 'map' | 'card' | null }

function Skeleton() {
  const { t } = useGame();
  return (
    <div className="farm-skeleton" aria-busy="true">
      <div className="loading" role="status"><span className="spinner" aria-hidden />{t('farmPageLoading')}</div>
      <div className="farm-sk-grid" aria-hidden>{[0, 1, 2, 3].map((i) => <span key={i} className="sk farm-sk-card" />)}</div>
    </div>
  );
}

export function FarmPage({ param, visit }: { param: string | null; visit: number }) {
  const { t, lang } = useGame();
  const toast = useToast();
  const [spotsState, retry] = useFarmSpots();
  const source = useSourceData(lang);
  const sourceData = source === 'loading' ? null : source;
  const { drafts, save, remove, markSent, clearApproved } = useFarmDrafts();
  const [filters, setFilters] = useFarmFilters();
  // the address on arrival: read during the first render, so the map opens at a link's view without a frame of the
  // whole picture first
  const [first] = useState(() => readLink(param));
  const [regionId, setRegionId] = useState(first.region);
  const [sel, setSel] = useState<Selection | null>(null);
  // counts "Show on map" presses: the map pans to the marker on each, also when it is selected already
  const [reveal, setReveal] = useState(0);
  const [form, setForm] = useState<FormState>(() => ({ open: false, region: regionId }));
  const [picking, setPicking] = useState<Picking | null>(null);
  /** a link's view, for the map of its region */
  const [goTo, setGoTo] = useState<GoTo | null>(() => goToOf(first));
  /** a link's hidden categories, in force for this visit instead of the saved ones (null: the saved ones); never
   *  saved unless the player keeps them */
  const [linkOff, setLinkOff] = useState<string[] | null>(() => (first.l && !sameCats(first.l, filters.off) ? first.l : null));
  /** a link's spot, waiting for the spots to load */
  const linkSpot = useRef<{ region: string; m: string } | null>(first.m ? { region: first.region, m: first.m } : null);
  /** counts the addresses read, so a link's spot is looked for again on each */
  const [linkTick, setLinkTick] = useState(0);
  /** the spot a link selected: shown whatever the filters say while it stays selected */
  const [pinned, setPinned] = useState<string | null>(null);
  /** what the F key or a pick of the search did, for screen readers (the focus stays on the map or in the search box,
   *  so nothing else would say it); `n` counts the presses, so the same words twice are said twice */
  const [said, setSaid] = useState({ text: '', n: 0 });
  /** the spot whose "Found" switch the player just pressed on a card: with "hide found" it stays until they move on */
  const [justFound, setJustFound] = useState<string | null>(null);
  /** a place the search picked, for the map of its region to move to */
  const [revealAt, setRevealAt] = useState<(MapReveal & { region: string }) | null>(null);
  /** phones: the selected spot whose card shows as a bottom sheet (a marker tap, a pick of the search, a link) */
  const [sheetFor, setSheetFor] = useState<string | null>(null);
  const sheetForRef = useRef(sheetFor);
  sheetForRef.current = sheetFor;
  /** that sheet, for the map to keep the selected marker above it */
  const [cardSheet, setCardSheet] = useState<HTMLElement | null>(null);
  const cardSheetRef = useCallback((el: HTMLElement | null) => setCardSheet(el?.closest<HTMLElement>('.modal') ?? null), []);
  const mobile = useMediaQuery(FARM_MOBILE);
  const mapRef = useRef<HTMLDivElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLElement>(null);
  const draftsRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);

  const region = regionById(regionId) ?? pickRegion(null);
  const regionName = region.name[lang];
  const hasImage = !!region.image;
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  // follow the address: back / forward, links and the navigation. A chip click replaces the address without a
  // hashchange, so the address itself can be ahead of `param`. A link's spot, view and categories count for this visit.
  // Another address while the page is open is the whole state: one without a spot drops the selection, one without a
  // view shows the whole picture (as it would on arrival). Keyed by the address read, so StrictMode's second run of
  // this effect on mount counts as the arrival, not as another address.
  const lastRead = useRef<string | null>(null);
  useEffect(() => {
    const link = readLink(param);
    const key = `${param}|${visit}`;
    const again = lastRead.current !== null && lastRead.current !== key;
    lastRead.current = key;
    setRegionId(link.region);
    linkSpot.current = link.m ? { region: link.region, m: link.m } : null;
    if (again && !link.m) setSel(null);
    setGoTo(goToOf(link) ?? (again ? { fx: 0.5, fy: 0.5, zoom: 1, region: link.region } : null));
    setLinkOff(link.l && !sameCats(link.l, filtersRef.current.off) ? link.l : null);
    setLinkTick((n) => n + 1);
  }, [param, visit]);

  useEffect(() => { storage.set(REGION_KEY, region.id); }, [region.id]);

  /* ---------- the address ---------- */
  // The address names the region, the selected spot, the view and the hidden categories, so a reload or a copied
  // address opens the same, and the page opens in the region next time. Replaced, never pushed: no history entries
  // and no hashchange, so App neither routes again nor counts a visit. Region, selection and categories are written at
  // once (leaving the page right after a click must not lose them); the view HASH_DELAY after it last came to rest.
  // The entry is marked as the page's own (OWN_ENTRY). DEV: the benchmark's ?bench=N stays in it, so a reload or a
  // copied link runs the benchmark again (farmBench).
  const viewRef = useRef<GoTo | null>(null);
  const goToRef = useRef(goTo);
  goToRef.current = goTo;
  const hashOf = useRef({ region: region.id, m: null as string | null, l: [] as string[], linkOff: null as string[] | null });
  const hashTimer = useRef(0);
  const writeHash = useCallback(() => {
    clearTimeout(hashTimer.current);
    // another page by now
    if (readHash().base !== '/farm') return;
    const s = hashOf.current;
    // a link's spot that still waits for the spots keeps its place in the address (also when they fail to load: a
    // retry or a reload still finds it); the region and the view follow the player meanwhile
    const wait = linkSpot.current;
    const m = wait?.region === s.region ? wait.m : s.m;
    // the map's view; until the map has one for this region (it has no size yet), the link's view it is about to show
    const v = viewRef.current?.region === s.region ? viewRef.current : goToRef.current?.region === s.region ? goToRef.current : null;
    // the whole picture needs no view in the address
    const view = v && v.zoom > 1.001 ? v : null;
    const want = farmHash(s.region, { m, v: view, l: s.l, bench: import.meta.env.DEV ? benchCount() : 0 });
    const own = ownEntry();
    const same = !!own && (own.linkOff && s.linkOff ? sameCats(own.linkOff, s.linkOff) : own.linkOff === s.linkOff);
    if (location.hash === want && same) return;
    const st: unknown = history.state;
    const base = st && typeof st === 'object' ? st : {};
    history.replaceState({ ...base, [OWN_ENTRY]: { linkOff: s.linkOff } satisfies OwnEntry }, '', want);
  }, []);
  const scheduleHash = useCallback(() => {
    clearTimeout(hashTimer.current);
    hashTimer.current = window.setTimeout(writeHash, HASH_DELAY);
  }, [writeHash]);
  useEffect(() => {
    // a reload right after a pan still keeps the view
    window.addEventListener('pagehide', writeHash);
    return () => {
      window.removeEventListener('pagehide', writeHash);
      // not written now: by unmount the address is another page's
      clearTimeout(hashTimer.current);
    };
  }, [writeHash]);
  const regionRef = useRef(region.id);
  regionRef.current = region.id;
  const onViewChange = useCallback((v: MapView) => {
    viewRef.current = { ...v, region: regionRef.current };
    scheduleHash();
  }, [scheduleHash]);

  // browser tab title; again after a language switch, where App sets its own title first
  const title = `${t('navFarm')}: ${regionName}`;
  useEffect(() => { document.title = `${title} – Daevaforge`; }, [title, lang]);

  /* ---------- spots and drafts ---------- */
  const ready = spotsState.state === 'ok' && source !== 'loading';
  const approved = spotsState.state === 'ok' ? spotsState.spots : NONE;
  // the other source's spots join the approved ones on the map and in the list; drafts only ever match player spots
  const allSpots = useMemo(() => (sourceData ? [...approved, ...sourceData.spots] : approved), [approved, sourceData]);
  const approvedByCid = useMemo(() => new Map(approved.map((s) => [s.cid, s])), [approved]);
  // a draft that is on the map already is about to be dropped; one changed after sending stays (its change is reported)
  const liveDrafts = useMemo(() => drafts.filter((d) => !draftDone(d, approvedByCid.get(d.cid))), [drafts, approvedByCid]);
  const draftsDone = liveDrafts.length !== drafts.length;
  // drafts of new spots: counted and drawn as pending markers; a change to an approved spot lives in the drafts panel only
  const newDrafts = useMemo(() => liveDrafts.filter((d) => !approvedByCid.has(d.cid)), [liveDrafts, approvedByCid]);

  // drafts whose spot was approved are done; again when such a draft shows up later (another tab)
  const clearRef = useRef(clearApproved);
  clearRef.current = clearApproved;
  useEffect(() => {
    if (ready) clearRef.current(approvedByCid);
  }, [ready, approvedByCid, draftsDone]);

  const regionCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of allSpots) m.set(s.region, (m.get(s.region) ?? 0) + 1);
    for (const d of newDrafts) m.set(d.region, (m.get(d.region) ?? 0) + 1);
    return m;
  }, [allSpots, newDrafts]);

  const regionSpots = useMemo(() => allSpots.filter((s) => s.region === region.id), [allSpots, region.id]);
  const regionAreas = sourceData?.areas[region.id];
  // each source's credit shows where its spots do
  const tcSource = regionSpots.some((s) => s.src === 'tcimba') ? sourceData?.source ?? null : null;
  const gatherSource = regionSpots.some((s) => s.src === 'overlay') ? sourceData?.gather ?? null : null;
  // the day the marker data last changed, for the credit line (not the newest upstream commit, which can be months
  // younger and would make the positions look fresher than they are); a file without a plain data date leaves it out
  const dataDate = tcSource?.dataDate;
  const isDay = (d: string | undefined): d is string => !!d && /^\d{4}-\d{2}-\d{2}$/.test(d);
  const sourceDay = isDay(dataDate) ? fmtDay(dataDate, lang, true) : null;
  // the gathering points are as old as the day the overlay took them from their source
  const gatherDay = isDay(gatherSource?.retrieved) ? fmtDay(gatherSource.retrieved, lang, true) : null;
  const regionDrafts = useMemo(() => newDrafts.filter((d) => d.region === region.id), [newDrafts, region.id]);
  const catCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of regionSpots) m.set(s.cat, (m.get(s.cat) ?? 0) + 1);
    for (const d of regionDrafts) m.set(d.cat, (m.get(d.cat) ?? 0) + 1);
    return m;
  }, [regionSpots, regionDrafts]);
  // the materials of each gathering category in the region, in the data's order: the filters list them where there is
  // a choice (more than one)
  const matCounts = useMemo(() => {
    const byCat = new Map<string, Map<string, number>>();
    for (const s of regionSpots) {
      if (!s.mat) continue;
      let m = byCat.get(s.cat);
      if (!m) byCat.set(s.cat, (m = new Map()));
      m.set(s.mat, (m.get(s.mat) ?? 0) + 1);
    }
    const out = new Map<string, MatCount[]>();
    for (const [cat, m] of byCat) if (m.size > 1) out.set(cat, [...m].map(([name, n]) => ({ name, key: matKey(cat, name), n })));
    return out;
  }, [regionSpots]);

  /* ---------- found spots ---------- */
  const found = foundIn(useFound(), region.id);
  // found per category, of the spots the region has now: drafts and the Map Overlay's gathering points (they respawn)
  // cannot be found, so they are not part of the "of" (and an id of a spot the data dropped is kept, but not counted)
  const foundCounts = useMemo(() => {
    const n = new Map<string, number>();
    const of = new Map<string, number>();
    for (const s of regionSpots) {
      if (!canFind(s)) continue;
      of.set(s.cat, (of.get(s.cat) ?? 0) + 1);
      if (found.has(s.id)) n.set(s.cat, (n.get(s.cat) ?? 0) + 1);
    }
    return { n, of };
  }, [regionSpots, found]);
  const foundTotal = useMemo(() => [...foundCounts.n.values()].reduce((a, b) => a + b, 0), [foundCounts]);
  const findable = useMemo(() => [...foundCounts.of.values()].reduce((a, b) => a + b, 0), [foundCounts]);

  // the filters in force: a link's categories for this visit, else the saved ones
  const applied = useMemo<FarmFilterState>(() => (linkOff ? { ...filters, off: linkOff } : filters), [filters, linkOff]);
  const linkActive = !!linkOff && !sameCats(linkOff, filters.off);
  // a link's spot stays on the map while it is selected, whatever the filters; with "hide found" the selected spot
  // and the card whose switch was just pressed (cards without a marker cannot be selected) stay until the player
  // looks elsewhere, so marking a spot found does not pull its card away under the pointer or the keyboard focus
  const pin = pinned && pinned === sel?.id ? pinned : null;
  const hideFound = applied.hideFound ? found : null;
  const keepId = hideFound ? sel?.id ?? null : null;
  const keepFound = hideFound ? justFound : null;
  useEffect(() => { setJustFound(null); }, [sel, applied, region.id]);

  // the search text of each spot is built once per region, not on every key stroke
  const hay = useMemo(() => new Map(regionSpots.map((s) => [s.id, searchText(s)])), [regionSpots]);
  const shown = useMemo(() => {
    const ok = spotFilter(applied, hasImage);
    const hidden = (id: string) => !!hideFound?.has(id) && id !== keepId && id !== keepFound;
    return regionSpots.filter((s) => s.id === pin || (ok(s, hay.get(s.id) ?? '') && !hidden(s.id)));
  }, [regionSpots, hay, applied, hasImage, pin, hideFound, keepId, keepFound]);

  // the filtered spots with a position, and the player's drafts with one as pending markers
  const markers = useMemo<MapMarker[]>(() => {
    if (!hasImage) return [];
    const label = (s: SpotInput) => `${s.name} – ${categoryById(s.cat)?.name[lang] ?? s.cat}`;
    const list: MapMarker[] = [];
    for (const s of shown) {
      if (!s.pos) continue;
      const done = canFind(s) && found.has(s.id);
      list.push({ id: s.id, pos: s.pos, cat: s.cat, label: done ? `${label(s)} (${t('farmFoundMarker')})` : label(s), source: !!s.src, found: done });
    }
    for (const d of regionDrafts) {
      if (d.pos) list.push({ id: draftKey(d.cid), pos: d.pos, cat: d.cat, label: `${label(d)} (${t('farmPagePendingMarker')})`, pending: true });
    }
    return list;
  }, [hasImage, shown, regionDrafts, lang, t, found]);

  // the selected spot, while its marker is on the map: shown as a card right under the map
  const selSpot = useMemo(() => {
    if (!sel || !markers.some((m) => m.id === sel.id)) return null;
    return regionSpots.find((s) => s.id === sel.id) ?? regionDrafts.find((d) => draftKey(d.cid) === sel.id) ?? null;
  }, [sel, markers, regionSpots, regionDrafts]);

  /* ---------- selection between map and list ---------- */
  // a spot the player picks by hand replaces a link's spot that still waits for the spots. On phones a marker opens
  // its card as a sheet, and the map's top goes under the top bar (at once, behind the sheet): the map keeps the marker
  // in the room above the sheet, and with the map low on the screen that room would reach under it
  const onMapSelect = useCallback((id: string | null) => {
    linkSpot.current = null;
    setSel(id ? { id, scroll: matches(FARM_MOBILE) ? 'map' : 'preview' } : null);
    setSheetFor(id);
  }, []);
  const onListSelect = useCallback((id: string, showMap: boolean) => {
    linkSpot.current = null;
    setSel({ id, scroll: showMap ? 'map' : null });
    // the same id does not change `selected`: the counter makes the map pan to a marker the player moved away from
    if (showMap) setReveal((n) => n + 1);
    // phones: there is no preview under the map, so the card shows as a sheet over it (not while a spot is placed:
    // the map stays free for the pick)
    if (showMap && matches(FARM_MOBILE) && !pickingRef.current) setSheetFor(id);
  }, []);
  useEffect(() => {
    if (!sel?.scroll) return;
    const el = sel.scroll === 'map' ? mapRef.current : sel.scroll === 'card' ? document.getElementById(cardDomId(sel.id)) : previewRef.current;
    // phones: the card's sheet opens with it and hides the move; the page is where it ends at once, so the map can
    // measure how far the sheet reaches into it
    const now = sel.scroll === 'map' && sheetForRef.current === sel.id;
    el?.scrollIntoView({ block: sel.scroll === 'map' ? mapBlock() : 'nearest', behavior: now ? 'auto' : scrollBehavior() });
  }, [sel]);
  // a link's spot is kept visible only while it is selected; the card's sheet belongs to the spot it opened for
  useEffect(() => {
    if (pinned && pinned !== sel?.id) setPinned(null);
    if (sheetFor && sheetFor !== sel?.id) setSheetFor(null);
  }, [pinned, sheetFor, sel]);

  /* ---------- found and links (stable callbacks for the memoised cards) ---------- */
  const spotsRef = useRef(regionSpots);
  spotsRef.current = regionSpots;
  /** a spot found or not found; drafts are the player's own and never count as found, gathering points respawn */
  const flip = (id: string) => {
    const spot = spotsRef.current.find((s) => s.id === id);
    return spot && canFind(spot) ? { on: toggleFound(spot.region, id), name: spot.name } : null;
  };
  const onFound = useCallback((id: string) => {
    if (flip(id)) setJustFound(id);
  }, []);
  const tRef = useRef(t);
  tRef.current = t;
  const langRef = useRef(lang);
  langRef.current = lang;
  const say = useCallback((text: string) => setSaid((s) => ({ text, n: s.n + 1 })), []);
  // the F key on the map: the focus stays on the map, so the change is said out loud
  const onKeyFound = useCallback((id: string) => {
    // a gathering point that respawns: F says why nothing happens
    const spot = spotsRef.current.find((s) => s.id === id);
    if (spot && !canFind(spot)) {
      say(tRef.current('farmFoundNever'));
      return;
    }
    const r = flip(id);
    if (r) say(tRef.current(r.on ? 'farmFoundSaid' : 'farmFoundUnsaid', { name: r.name }));
  }, [say]);
  /** a link to the spot: its marker in the middle, zoomed in at least to LINK_ZOOM (more if the player is) */
  const onCopyLink = useCallback(async (id: string) => {
    const spot = spotsRef.current.find((s) => s.id === id);
    if (!spot?.pos) return;
    const v = viewRef.current;
    const zoom = Math.max(LINK_ZOOM, v && v.region === spot.region ? v.zoom : 1);
    const url = new URL(location.href);
    url.search = '';
    url.hash = farmHash(spot.region, { m: id, v: { fx: spot.pos[0], fy: spot.pos[1], zoom } });
    const ok = await copyText(url.toString());
    toast(tRef.current(ok ? 'linkCopied' : 'copyFailed'), ok ? 'ok' : 'error');
  }, [toast]);

  /* ---------- filters: the player's own, and a link's categories for this visit ---------- */
  // while a link's categories are in force, the categories the player changes stay for this visit too; the other
  // filters are the player's own and are saved as always (useFarmFilters saves every change)
  const linkOffRef = useRef(linkOff);
  linkOffRef.current = linkOff;
  const changeFilters = useCallback((next: FarmFilterState) => {
    const saved = filtersRef.current;
    if (linkOffRef.current) {
      setLinkOff(sameCats(next.off, saved.off) ? null : next.off);
      setFilters({ ...next, off: saved.off });
    } else setFilters(next);
  }, [setFilters]);
  const resetFilters = useCallback(() => {
    setLinkOff(null);
    setFilters(NO_FILTERS);
  }, [setFilters]);
  const appliedRef = useRef(applied);
  appliedRef.current = applied;
  const linkCats = linkActive ? {
    onKeep: () => {
      if (linkOff) setFilters({ ...filters, off: linkOff });
      setLinkOff(null);
    },
    onDrop: () => setLinkOff(null),
  } : null;

  /* ---------- the form and placing a spot on the map ---------- */
  const openForm = (rid: string, initial?: Partial<SpotInput>) => setForm({ open: true, region: rid, initial });
  const closeForm = () => setForm((f) => (f.open ? { ...f, open: false } : f));
  const formRegion = regionById(form.region) ?? region;

  /**
   * The dialog gives the focus back to the button that opened it, but that button can be gone: the empty state's
   * "Add spot" after the first spot of a region, or the pick banner's Cancel. The focus then goes to the saved spot's
   * card, else to the header's "Add spot", instead of falling to the top of the page.
   */
  const refocus = (cid?: string) => requestAnimationFrame(() => {
    const a = document.activeElement;
    if (a && a !== document.body) return;
    const card = cid ? document.getElementById(cardDomId(draftKey(cid))) : null;
    (card?.querySelector<HTMLElement>('button') ?? addRef.current)?.focus();
  });
  // only the dialog's own close: startPick closes the form too, and the map takes the focus then
  const onFormClose = () => {
    closeForm();
    refocus();
  };

  // another region drops the selection; leaving the region while placing a spot brings the form back as it was
  const pickingRef = useRef(picking);
  pickingRef.current = picking;
  useEffect(() => {
    setSel(null);
    // a link's view and a place the search picked belong to their region: coming back later starts from the whole picture
    setGoTo((g) => (g && g.region !== region.id ? null : g));
    setRevealAt((r) => (r && r.region !== region.id ? null : r));
    const p = pickingRef.current;
    if (p && p.region !== region.id) {
      setPicking(null);
      setForm({ open: true, region: p.region, initial: p.current });
    }
  }, [region.id]);

  // a link's spot, once the spots are in (after the effect above, which drops the selection of the region before):
  // selected, kept on the map and in the list whatever the filters, and shown
  useEffect(() => {
    const link = linkSpot.current;
    if (!link || !ready) return;
    linkSpot.current = null;
    if (link.region !== region.id) return;
    const spot = regionSpots.find((s) => s.id === link.m);
    if (!spot) {
      // gone in a data update, or never there
      toast(t('farmLinkGone'), 'info');
      return;
    }
    setPinned(spot.id);
    // the selection shows one render later, but the address is written later in this commit already (the spots were
    // in on arrival): it must keep the spot, or StrictMode's second run of the effects reads an address without it
    hashOf.current = { ...hashOf.current, m: spot.id };
    if (spot.pos && hasImage) {
      setSel({ id: spot.id, scroll: 'map' });
      setSheetFor(spot.id);
      setReveal((n) => n + 1);
      // no marker (no position, or the region has no picture): its card in the list
    } else setSel({ id: spot.id, scroll: 'card' });
  }, [ready, region.id, regionSpots, hasImage, linkTick, toast, t]);

  /* ---------- the search: places to jump to ---------- */
  // every region's areas and spots (the player's drafts too) and the categories, in the page language; null while
  // the spots load (a failed spots file still leaves the other source's spots and the areas)
  const jumpIndex = useMemo(() => {
    if (source === 'loading' || spotsState.state === 'loading') return null;
    const spots: JumpSpot[] = [...allSpots, ...newDrafts.map((d) => ({ ...d, id: draftKey(d.cid), draft: true }))];
    return buildJumpIndex(spots, sourceData?.areas ?? {}, lang);
  }, [source, spotsState.state, allSpots, newDrafts, sourceData, lang]);

  /** an area or a spot the search picked: applied once its region shows (a region change drops the selection first) */
  const jumpRef = useRef<JumpEntry | null>(null);
  const [jumpTick, setJumpTick] = useState(0);
  const onJump = useCallback((e: JumpEntry) => {
    if (e.kind === 'cat') {
      // only this category, without the text filter: the words that found the category rarely match its spots' names
      changeFilters({ ...appliedRef.current, off: CATEGORIES.filter((c) => c.id !== e.id).map((c) => c.id), q: '' });
      say(tRef.current('farmJumpSaidCat', { cat: e.name }));
      closeTouchKeyboard();
      return;
    }
    if (!e.region) return;
    // a pick replaces a link's spot that still waits for the spots
    linkSpot.current = null;
    jumpRef.current = e;
    setJumpTick((n) => n + 1);
    // another region: its map mounts with the place, so it opens there at once instead of showing the whole picture
    // for a frame and zooming in from it (the effect below asks again; the map is there already then)
    if (e.region !== regionRef.current && e.pos && regionById(e.region)?.image) {
      setRevealAt({ region: e.region, pos: e.pos, zoom: LINK_ZOOM });
    }
    setRegionId(e.region);
  }, [changeFilters, say]);

  // after the region effect above (its selection drop comes first): the area in the middle of the map, or the spot
  // selected and kept visible whatever the filters (like a link's), both zoomed in to LINK_ZOOM at least. What changed
  // is said out loud: on wide screens the focus stays in the search box, which says nothing of the map or the region.
  useEffect(() => {
    const e = jumpRef.current;
    if (!e || e.region !== region.id) return;
    jumpRef.current = null;
    const pos = hasImage ? e.pos : undefined;
    const mobile = matches(FARM_MOBILE);
    const where = region.name[langRef.current];
    // phones: the map holds the focus (the touch keyboard closes), so the card's sheet gives it back there when it closes
    if (pos && mobile) mapRef.current?.focus({ preventScroll: true });
    if (e.kind === 'area') {
      setSel(null);
      if (pos) {
        setRevealAt({ region: region.id, pos, zoom: LINK_ZOOM });
        mapRef.current?.scrollIntoView({ block: mapBlock(), behavior: scrollBehavior() });
        say(tRef.current('farmJumpSaidArea', { region: where, name: e.name }));
      } else {
        say(tRef.current('farmJumpSaidRegion', { region: where }));
        closeTouchKeyboard();
      }
      return;
    }
    setPinned(e.id);
    say(tRef.current('farmJumpSaidSpot', { region: where, name: e.name }));
    if (pos) {
      setSel({ id: e.id, scroll: 'map' });
      setRevealAt({ region: region.id, pos, zoom: LINK_ZOOM });
      // not while a spot is placed: the map stays free for the pick
      if (!pickingRef.current) setSheetFor(e.id);
      return;
    }
    // no marker (no position, or the region has no picture): its card in the list; on phones the focus goes along to
    // the card (the touch keyboard closes), once it is there
    setSel({ id: e.id, scroll: 'card' });
    if (mobile) {
      requestAnimationFrame(() => {
        const btn = document.getElementById(cardDomId(e.id))?.querySelector<HTMLElement>('button');
        if (btn) btn.focus({ preventScroll: true });
        else closeTouchKeyboard();
      });
    }
  }, [region.id, jumpTick, hasImage, say]);

  // the address follows the region, the selection and the categories (the map reports its view itself); drafts are
  // the player's own and have no address
  hashOf.current = { region: region.id, m: sel && isSpotId(sel.id) ? sel.id : null, l: applied.off, linkOff };
  const hashKey = `${region.id}|${hashOf.current.m}|${applied.off.join(',')}|${linkOff ? 'link' : ''}`;
  // a click changed them: written at once
  useEffect(() => { writeHash(); }, [hashKey, writeHash]);
  // another address (back / forward, a link) or the spots arrived: written once the page shows it (the state follows
  // the address one render later, so writing now would put the page that is left back into the address)
  useEffect(() => { scheduleHash(); }, [param, visit, ready, scheduleHash]);

  // placing starts: the map comes into view; the focus goes to it unless the map took it itself
  const pickingOn = !!picking;
  useEffect(() => {
    const el = mapRef.current;
    if (!pickingOn || !el) return;
    el.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
    if (!el.contains(document.activeElement)) el.focus({ preventScroll: true });
  }, [pickingOn]);

  const startPick = (current: Partial<SpotInput>) => {
    const rid = form.region;
    closeForm();
    // the map must be free for the pick
    setSheetFor(null);
    setPicking({ region: rid, current });
    setRegionId(rid);
  };

  const pickProp = useMemo(() => {
    if (!picking || picking.region !== region.id) return null;
    const back = (initial: Partial<SpotInput>) => {
      setPicking(null);
      setForm({ open: true, region: picking.region, initial });
    };
    return {
      pos: picking.current.pos ?? null,
      onPick: (pos: [number, number]) => back({ ...picking.current, pos }),
      onCancel: () => back(picking.current),
    };
  }, [picking, region.id]);

  const openAdd = () => { if (!picking) openForm(region.id); };

  /** The card's sheet closes and drops the selection. Modal gives the focus back to what had it, but when that was the
   *  selected marker, the marker goes with the selection: the map takes the focus first, so it does not fall to the
   *  top of the page (Modal still moves it on to an element that stays, such as a list card's "Show on map"). */
  const closeCardSheet = () => {
    mapRef.current?.focus({ preventScroll: true });
    setSel(null);
  };

  const editDraft = (d: Draft) => {
    // the edit buttons are disabled while a spot is placed; opening the form now would throw that spot away
    if (pickingRef.current) {
      toast(t('farmPagePickFirst'), 'info');
      return;
    }
    const { status: _status, savedAt: _savedAt, sentAt: _sentAt, editedAfterSend: _edited, ...spot } = d;
    if (regionById(d.region)) setRegionId(d.region);
    openForm(d.region, spot);
  };
  // stable for the memoised cards
  const editRef = useRef(editDraft);
  editRef.current = editDraft;
  const onEdit = useCallback((d: Draft) => editRef.current(d), []);

  const showDrafts = () => {
    const el = draftsRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
  };

  const onSave = (spot: SpotInput) => {
    save(spot);
    closeForm();
    if (spot.region === region.id) setSel({ id: draftKey(spot.cid), scroll: null });
    else if (regionById(spot.region)) setRegionId(spot.region);
    toast(t('farmPageSaved'), 'ok', { action: { label: t('farmPageShowDrafts'), onClick: showDrafts } });
    refocus(spot.cid);
  };

  /* ---------- region switch ---------- */
  // another faction opens its first region with spots, else its first region
  const onFaction = (f: FactionId) => {
    const list = REGIONS.filter((r) => r.faction === f);
    const target = list.find((r) => (regionCounts.get(r.id) ?? 0) > 0) ?? list[0];
    if (target) setRegionId(target.id);
  };

  const onRegionKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('button')];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    items[Math.max(0, Math.min(items.length - 1, i + step))]?.focus();
  };

  // "Try again" disappears with the error: the focus moves on to the chosen region
  const onRetry = () => {
    retry();
    requestAnimationFrame(() => regionsRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus({ preventScroll: true }));
  };

  const addButton = (
    <button type="button" className="btn primary" ref={addRef} onClick={openAdd} aria-disabled={pickingOn || undefined}>
      <Plus size={16} aria-hidden /> {t('farmPageAdd')}
    </button>
  );

  const how = (
    <p className="farm-how">
      <Info size={15} aria-hidden />{' '}
      <span>{t(sourceData ? 'farmPageHowSource' : 'farmPageHow')}{sourceData?.gather && <> {t('farmPageHowGather')}</>}</span>
    </p>
  );
  const draftsPanel = liveDrafts.length > 0 && (
    <div className="farm-drafts" ref={draftsRef} tabIndex={-1}>
      <DraftsPanel
        drafts={liveDrafts}
        onEdit={onEdit}
        onRemove={remove}
        onSent={markSent}
        editLocked={pickingOn}
        approved={approvedByCid}
        fallbackFocus={() => addRef.current?.focus({ preventScroll: true })}
      />
    </div>
  );

  // phones: the map comes right after the search, so it is in sight on arrival; the player's drafts and the how-to
  // follow under it (in the page's order, so the focus order is the order on screen)
  return (
    <div className="page farm-page">
      <PageHeader icon={<MapIcon size={22} />} title={t('navFarm')} subtitle={t('farmPageIntro')} actions={addButton} />
      {!mobile && how}

      <div className="farm-where">
        <Segmented<FactionId>
          value={region.faction}
          onChange={onFaction}
          label={t('farmPageFaction')}
          options={FACTIONS.map((f) => ({ value: f, label: FACTION_NAMES[f][lang] }))}
        />
        <div className="farm-regions" ref={regionsRef} role="group" aria-label={t('farmPageRegion')} onKeyDown={onRegionKey}>
          {REGIONS.filter((r) => r.faction === region.faction).map((r) => {
            const on = r.id === region.id;
            const n = regionCounts.get(r.id) ?? 0;
            const name = r.name[lang];
            return (
              <button
                key={r.id} type="button" className={`farm-region ${on ? 'on' : ''}`} aria-pressed={on}
                aria-label={ready ? `${name}, ${spotCount(t, n)}` : undefined}
                onClick={() => setRegionId(r.id)}
              >
                <span>{name}</span>
                {/* counts once the spots are in, so they do not jump from the drafts alone to the full number */}
                {ready && <span className="count" aria-hidden>{n}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="farm-layout">
        {/* its own scroll box on desktop: focus rings are drawn inside (focus-inset) */}
        <div className="farm-side focus-inset">
          <FarmFilters
            value={applied}
            onChange={changeFilters}
            onReset={resetFilters}
            counts={ready ? catCounts : null}
            mats={ready ? matCounts : null}
            found={ready ? foundCounts : null}
            hasImage={hasImage}
            shown={ready ? shown.length + regionDrafts.length : null}
            total={regionSpots.length + regionDrafts.length}
            linkCats={linkCats}
            jump={{ index: jumpIndex, region: region.id, onPick: onJump }}
            progress={(
              <FarmProgress
                region={region}
                found={ready ? foundTotal : null}
                total={findable}
                hideFound={filters.hideFound}
                onHideFound={(on) => setFilters({ ...filters, hideFound: on })}
              />
            )}
          />
        </div>

        <div className="farm-main">
          {!mobile && draftsPanel}

          {/* a new node on every press: the same words again (found, unmarked on the card, F again) are said again;
              outside the map, which a region without a picture lacks (a live region must exist before its words change) */}
          <p className="sr-only" role="status" aria-live="polite"><span key={said.n}>{said.text}</span></p>
          {hasImage ? (
            <div className="farm-mapwrap">
              <div className="farm-map" ref={mapRef} tabIndex={-1}>
                <FarmMap
                  key={region.id}
                  region={region}
                  markers={markers}
                  selected={sel?.id ?? null}
                  reveal={reveal}
                  areas={regionAreas}
                  onSelect={onMapSelect}
                  picking={pickProp}
                  label={t('farmPageMapLabel', { region: regionName })}
                  onToggleFound={onKeyFound}
                  onViewChange={onViewChange}
                  goTo={goTo?.region === region.id ? goTo : null}
                  revealAt={revealAt?.region === region.id ? revealAt : null}
                  cover={cardSheet}
                />
              </div>
              {sel && selSpot && !mobile && (
                <section className="farm-sel" ref={previewRef} aria-label={t('farmPageSelected')}>
                  <ul className="farm-cards">
                    <SpotCard
                      spot={selSpot} id={sel.id} selected={false} hasImage picking={pickingOn} onSelect={onListSelect} onEdit={onEdit} preview
                      found={found.has(sel.id)} onFound={onFound} onCopyLink={onCopyLink}
                    />
                  </ul>
                  <button type="button" className="icon-btn farm-sel-close" aria-label={t('close')} title={t('close')} onClick={() => setSel(null)}>
                    <X size={16} aria-hidden />
                  </button>
                </section>
              )}
              {/* phones: the card as a bottom sheet over the map (Modal: focus trap, Esc, the focus back where it was);
                  closing it drops the selection, as the card's close button does on wide screens */}
              {sel && selSpot && mobile && sheetFor === sel.id && !pickingOn && (
                <Modal open sheet className="farm-sheet farm-card-sheet" title={t('farmPageSelected')} onClose={closeCardSheet}>
                  <ul className="farm-cards" ref={cardSheetRef}>
                    <SpotCard
                      spot={selSpot} id={sel.id} selected={false} hasImage picking={pickingOn} onSelect={onListSelect} onEdit={onEdit} preview
                      found={found.has(sel.id)} onFound={onFound} onCopyLink={onCopyLink}
                    />
                  </ul>
                </Modal>
              )}
            </div>
          ) : (
            <p className="farm-nomap"><ImageOff size={18} aria-hidden /> <span>{t('farmPageNoMap', { region: regionName })}</span></p>
          )}
          {mobile && <>{draftsPanel}{how}</>}

          {spotsState.state === 'loading' ? (
            <Skeleton />
          ) : spotsState.state === 'error' ? (
            <div className="state-card inline error" role="alert">
              <TriangleAlert size={28} aria-hidden />
              <h2>{t('farmPageErrorTitle')}</h2>
              <p>{t('farmPageErrorText')}</p>
              <div className="state-actions">
                <button type="button" className="btn" onClick={onRetry}><RefreshCw size={16} aria-hidden /> {t('tryAgain')}</button>
              </div>
              <details className="state-details"><summary>{t('errorDetails')}</summary><code>{spotsState.error}</code></details>
            </div>
          ) : (
            <SpotList
              region={region}
              spots={shown}
              drafts={regionDrafts}
              total={regionSpots.length}
              selected={sel?.id ?? null}
              hasImage={hasImage}
              picking={pickingOn}
              onSelect={onListSelect}
              onEdit={onEdit}
              onAdd={openAdd}
              onReset={resetFilters}
              found={found}
              onFound={onFound}
              onCopyLink={onCopyLink}
            />
          )}

          {/* CC BY-NC 4.0: name the source, its licence and what was changed wherever its data shows; also how old the
              data is and that it comes from another client, so nobody takes it for official Global data */}
          {(tcSource || gatherSource) && (
            <div className="farm-credits">
              {tcSource && (
                <p className="farm-credit">
                  <Info size={14} aria-hidden />
                  <span>
                    {t('farmSourceCredit')}{' '}
                    <a href={tcSource.url} target="_blank" rel="noopener">{tcSource.name}<span className="sr-only"> ({t('gdNewTab')})</span></a>{' '}
                    {t('farmSourceBy')}{' '}
                    <a href={tcSource.licenseUrl} target="_blank" rel="noopener license">{tcSource.license}<span className="sr-only"> ({t('gdNewTab')})</span></a>.{' '}
                    {sourceDay && <>{t('farmSourceDate', { date: sourceDay })}{' '}</>}
                    {t('farmSourceKrTw')}{!gatherSource && <> {t('farmUnofficial')}</>}
                  </span>
                </p>
              )}
              {/* the overlay adapted its points from the AION2 Interactive Map: both are named, and what was changed here */}
              {gatherSource && (
                <p className="farm-credit">
                  <Info size={14} aria-hidden />
                  <span>
                    {t('farmGatherCredit')}{' '}
                    <a href={gatherSource.url} target="_blank" rel="noopener">{gatherSource.name}<span className="sr-only"> ({t('gdNewTab')})</span></a>{' '}
                    {t('farmGatherBy', { by: gatherSource.by })}{' '}
                    <a href={gatherSource.licenseUrl} target="_blank" rel="noopener license">{gatherSource.license}<span className="sr-only"> ({t('gdNewTab')})</span></a>,{' '}
                    {t('farmGatherFrom')}{' '}
                    <a href={gatherSource.upstream.url} target="_blank" rel="noopener">{gatherSource.upstream.name}<span className="sr-only"> ({t('gdNewTab')})</span></a>{' '}
                    {t('farmGatherFromBy')}{' '}
                    {t('farmGatherChanges')}{' '}
                    {gatherDay && <>{t('farmGatherDate', { date: gatherDay })}{' '}</>}
                    {t('farmSourceKrTw')} {t('farmUnofficial')}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <SpotForm
        open={form.open}
        onClose={onFormClose}
        region={formRegion}
        initial={form.initial}
        onPickPosition={formRegion.image ? startPick : undefined}
        onSave={onSave}
      />
    </div>
  );
}
