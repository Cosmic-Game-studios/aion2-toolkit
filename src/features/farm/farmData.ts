import { useCallback, useEffect, useState } from 'react';
import { categoryById, checkSpot, regionById, type FarmSpot, type L10n, type Lang, type SpotsFile } from './farmRules';

/** public/data/farm/spots.json: still loading, there, or failed (try again). A missing file counts as no spots. */
export type SpotsState =
  | { state: 'loading' }
  | { state: 'ok'; spots: FarmSpot[] }
  | { state: 'error'; error: string };

const base = () => import.meta.env.BASE_URL.replace(/\/?$/, '/');
const isFile = (x: unknown): x is SpotsFile =>
  !!x && typeof x === 'object' && (x as SpotsFile).v === 1 && Array.isArray((x as SpotsFile).spots);

const isStr = (x: unknown): x is string => typeof x === 'string';
const optStr = (x: unknown) => x === undefined || typeof x === 'string';
const pair = (x: unknown, ok: (n: unknown) => boolean) => Array.isArray(x) && x.length === 2 && x.every((n) => ok(n));

/**
 * Whether the page can show a spot of the file: the types the cards, the map and the search rely on. The rules
 * (checkSpot) are not required: a hand edit with a category the rules do not know still shows (under "Places"), and
 * tighter limits later do not hide spots that are on the map already.
 */
function isSpotShape(x: unknown): x is FarmSpot {
  if (!x || typeof x !== 'object' || Array.isArray(x)) return false;
  const s = x as Record<string, unknown>;
  return isStr(s.id) && s.id !== '' && isStr(s.cid) && isStr(s.region) && isStr(s.cat) && isStr(s.name)
    && isStr(s.added) && Number.isInteger(s.issue)
    && (s.pos === undefined || pair(s.pos, Number.isFinite))
    && (s.level === undefined || pair(s.level, Number.isInteger))
    && (s.drops === undefined || (Array.isArray(s.drops) && s.drops.every(isStr)))
    && optStr(s.area) && optStr(s.note) && optStr(s.by);
}

/** The spots one by one: a hand edit of spots.json that breaks one spot drops that spot, not the whole page. */
function readSpots(list: unknown[]): FarmSpot[] {
  const spots: FarmSpot[] = [];
  for (const x of list) {
    if (!isSpotShape(x)) {
      console.warn('spots.json: spot skipped, wrong format', x);
      continue;
    }
    // shown anyway; the warning tells the maintainer what the import would refuse
    const check = checkSpot(x);
    if (!check.ok) console.warn(`spots.json: spot ${x.id} breaks the rules (${check.errors.join(', ')})`);
    spots.push(x);
  }
  return spots;
}

let pending: Promise<FarmSpot[]> | null = null;
/** the spots once loaded, read during render so a second visit shows them without a loading frame */
let done: FarmSpot[] | null = null;

function load(): Promise<FarmSpot[]> {
  if (!pending) {
    pending = (async () => {
      const res = await fetch(`${base()}data/farm/spots.json`, { cache: 'no-cache' });
      // GitHub Pages answers 404 when there is no file: no spots yet
      if (res.status === 404) return [];
      // before the type check: a server error (502, 503) comes as an HTML page and must not count as "no spots"
      if (!res.ok) throw new Error(`spots.json: HTTP ${res.status}`);
      // the dev server answers 200 with the app page (HTML): no spots yet
      if (!(res.headers.get('content-type') ?? '').includes('json')) return [];
      const json: unknown = await res.json();
      if (!isFile(json)) throw new Error('spots.json: unexpected format');
      return readSpots(json.spots);
    })();
    // a failed load is fetched again on the next try
    pending.then((s) => { done = s; }, () => { pending = null; });
  }
  return pending;
}

/* ---------- the AION2 Interactive Map data (public/data/farm/tcimba.json, made by scripts/farm-tcimba.mjs) ---------- */

/** An area name on the map, at the place inside the area where it fits best. */
export interface MapArea { name: string; pos: [number, number] }

interface TcSource {
  name: string; by: string; url: string; license: string; licenseUrl: string; commit: string;
  /** day of the upstream commit the file was made from */
  date: string;
  /** day the marker and area data last changed (often months before `date`); missing in files without it */
  dataDate?: string;
}
interface TcSpot { id: string; c: string; a?: number; n?: string; p: [number, number] }
interface TcFile { v: 1; source: TcSource; regions: Record<string, { map: string; areas: MapArea[]; spots: TcSpot[] }> }

/* ---------- the Map Overlay's gathering points (public/data/farm/gathering.json, made by scripts/farm-gathering.mjs) ---------- */

export interface GatherSource {
  name: string; by: string; url: string; license: string; licenseUrl: string; commit: string;
  /** day of the overlay's commit the file was made from */
  date: string;
  /** day the overlay took the gathering points from the AION2 Interactive Map's site: how old the positions are */
  retrieved: string;
  /** the project the overlay adapted them from */
  upstream: { name: string; by: string; url: string };
}
/** a material ("Orichalcum") and our category of it ("ore") */
interface GatherMaterial { id: string; name: string; c: string }
/** `m` and `a` index the region's materials and area names */
interface GatherSpot { id: string; m: number; a?: number; p: [number, number] }
interface GatherFile {
  v: 1; source: GatherSource;
  regions: Record<string, { map: string; materials: GatherMaterial[]; areas: string[]; spots: GatherSpot[] }>;
}

export interface SourceData {
  /** the AION2 Interactive Map data's source; null when tcimba.json did not load */
  source: TcSource | null;
  /** the Map Overlay's; null when gathering.json did not load */
  gather: GatherSource | null;
  /** area labels per region (the AION2 Interactive Map's) */
  areas: Record<string, MapArea[]>;
  /** the spots of both as map spots, named in the page language */
  spots: FarmSpot[];
}

/**
 * One of a category, for the names of the spots ("Empyrean trace 6", "Kibelisk #2"); villages are named after their
 * area. Dungeon entrances and strongholds carry their own name and use this only when the data has none.
 */
const ONE: Record<string, L10n> = {
  cube: { en: 'Hidden cube', de: 'Versteckter Würfel' },
  trace: { en: 'Empyrean trace', de: 'Empyreische Spur' },
  teleport: { en: 'Kibelisk', de: 'Kibelisk' },
  dungeon: { en: 'Dungeon entrance', de: 'Dungeon-Eingang' },
  stronghold: { en: 'Stronghold', de: 'Feindlager' },
};

/**
 * Both files are CC BY-NC 4.0 (non-commercial): a build with ads (VITE_ADSENSE_CLIENT) must not show them. Remove
 * these sources before turning ads on.
 */
const ADS = !!(import.meta.env.VITE_ADSENSE_CLIENT as string | undefined)?.trim();

const isTcFile = (x: unknown): x is TcFile => {
  const f = x as TcFile;
  return !!f && typeof f === 'object' && f.v === 1 && !!f.source && typeof f.source.name === 'string' && !!f.regions && typeof f.regions === 'object';
};
const isArea = (a: unknown): a is MapArea => !!a && typeof (a as MapArea).name === 'string' && pair((a as MapArea).pos, Number.isFinite);
const isTcSpot = (s: unknown): s is TcSpot => {
  const x = s as TcSpot;
  return !!x && isStr(x.id) && x.id !== '' && isStr(x.c) && pair(x.p, Number.isFinite)
    && (x.a === undefined || Number.isInteger(x.a)) && optStr(x.n);
};
const isGatherFile = (x: unknown): x is GatherFile => {
  const f = x as GatherFile;
  return !!f && typeof f === 'object' && f.v === 1 && !!f.source && isStr(f.source.name) && isStr(f.source.retrieved)
    && !!f.source.upstream && isStr(f.source.upstream.name) && isStr(f.source.upstream.url) && !!f.regions && typeof f.regions === 'object';
};
const isMaterial = (m: unknown): m is GatherMaterial => !!m && isStr((m as GatherMaterial).name) && isStr((m as GatherMaterial).c);
const isGatherSpot = (s: unknown): s is GatherSpot => {
  const x = s as GatherSpot;
  return !!x && isStr(x.id) && x.id !== '' && Number.isInteger(x.m) && pair(x.p, Number.isFinite) && (x.a === undefined || Number.isInteger(x.a));
};

/** One of the other sources' files, or null: not there, broken, or a build with ads. Never throws. */
async function loadOptional<F>(file: string, ok: (x: unknown) => x is F): Promise<F | null> {
  if (ADS) return null;
  try {
    const res = await fetch(`${base()}data/farm/${file}`, { cache: 'no-cache' });
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('json')) return null;
    const json: unknown = await res.json();
    if (!ok(json)) throw new Error('unexpected format');
    return json;
  } catch (e) {
    // the player spots work without it: the page just has fewer spots
    console.warn(`${file} not loaded`, e);
    return null;
  }
}

interface SourceFiles { tc: TcFile | null; gather: GatherFile | null }
let srcPending: Promise<SourceFiles> | null = null;
let srcDone: SourceFiles | undefined;

function loadSources(): Promise<SourceFiles> {
  if (!srcPending) {
    // both at once; either one works without the other
    srcPending = Promise.all([loadOptional('tcimba.json', isTcFile), loadOptional('gathering.json', isGatherFile)])
      .then(([tc, gather]) => ({ tc, gather }));
    srcPending.then((f) => { srcDone = f; });
  }
  return srcPending;
}

function buildSource({ tc, gather }: SourceFiles, lang: Lang): SourceData {
  const areas: Record<string, MapArea[]> = {};
  const spots: FarmSpot[] = [];
  if (tc) addTcSpots(tc, lang, areas, spots);
  if (gather) addGatherSpots(gather, spots);
  return { source: tc?.source ?? null, gather: gather?.source ?? null, areas, spots };
}

function addTcSpots(file: TcFile, lang: Lang, areas: Record<string, MapArea[]>, spots: FarmSpot[]) {
  for (const [region, r] of Object.entries(file.regions)) {
    if (!regionById(region) || !r || !Array.isArray(r.spots)) continue;
    const list = Array.isArray(r.areas) ? r.areas.filter(isArea) : [];
    areas[region] = list;
    // spots without a game number or name are counted per area ("Hidden cube #3"), so cards and buttons tell them
    // apart; the file lists them north to south within an area
    const seen = new Map<string, number>();
    for (const s of r.spots) {
      if (!isTcSpot(s)) continue;
      const area = s.a !== undefined ? list[s.a]?.name : undefined;
      const one = ONE[s.c]?.[lang];
      let name = s.c === 'village' ? area ?? '' : '';
      // `n` is a game number ("Empyrean trace 6") or the spot's own name ("Cave of the Desperate")
      if (s.n && !/^\d+$/.test(s.n)) name = s.n;
      else if (one && s.n) name = `${one} ${s.n}`;
      else if (one) {
        const key = `${s.c}|${s.a ?? ''}`;
        const k = (seen.get(key) ?? 0) + 1;
        seen.set(key, k);
        name = `${one} #${k}`;
      }
      if (!name) continue;
      // the card's date says how old the position is, so it is the data's date, not the newest upstream commit's
      const added = file.source.dataDate ?? file.source.date;
      const spot: FarmSpot = { id: s.id, cid: s.id, region, cat: s.c, name, pos: s.p, added, issue: 0, src: 'tcimba' };
      if (area && s.c !== 'village') spot.area = area;
      spots.push(spot);
    }
  }
}

/**
 * The gathering points, named after their material and numbered per material and area ("Orichalcum #3"), as the
 * hidden cubes are; the file lists them north to south within an area. Material names are the game's own and the
 * same in every language. A material whose category is not a gathering category of the rules is left out.
 */
function addGatherSpots(file: GatherFile, spots: FarmSpot[]) {
  for (const [region, r] of Object.entries(file.regions)) {
    if (!regionById(region) || !r || !Array.isArray(r.spots) || !Array.isArray(r.materials)) continue;
    const mats = r.materials.map((m) => (isMaterial(m) && categoryById(m.c)?.group === 'gather' ? m : null));
    const names = Array.isArray(r.areas) ? r.areas : [];
    const seen = new Map<string, number>();
    for (const s of r.spots) {
      if (!isGatherSpot(s)) continue;
      const mat = mats[s.m];
      if (!mat) continue;
      const area = s.a !== undefined && isStr(names[s.a]) ? names[s.a] : undefined;
      const key = `${s.m}|${s.a ?? ''}`;
      const k = (seen.get(key) ?? 0) + 1;
      seen.set(key, k);
      // the card's date says how old the position is: the day the overlay took the points from their source
      const spot: FarmSpot = {
        id: s.id, cid: s.id, region, cat: mat.c, name: `${mat.name} #${k}`, pos: s.p, added: file.source.retrieved, issue: 0,
        src: 'overlay', mat: mat.name,
      };
      if (area) spot.area = area;
      spots.push(spot);
    }
  }
}

const built = new Map<Lang, SourceData>();

/**
 * The spots and area names of the AION2 Interactive Map and the Map Overlay's gathering points: 'loading', the data
 * of whichever loaded, or null (neither: no files, broken files, or a build with ads).
 */
export function useSourceData(lang: Lang): SourceData | null | 'loading' {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (srcDone !== undefined) return;
    let alive = true;
    loadSources().then(() => { if (alive) setTick((n) => n + 1); });
    return () => { alive = false; };
  }, []);
  if (srcDone === undefined) return 'loading';
  if (!srcDone.tc && !srcDone.gather) return null;
  let data = built.get(lang);
  if (!data) {
    data = buildSource(srcDone, lang);
    built.set(lang, data);
  }
  return data;
}

/** All approved farm spots (every region). */
export function useFarmSpots(): [SpotsState, () => void] {
  const [failed, setFailed] = useState<{ attempt: number; error: string } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [, setTick] = useState(0);
  useEffect(() => {
    if (done) return;
    let alive = true;
    load().then(
      () => { if (alive) setTick((n) => n + 1); },
      (e: unknown) => { if (alive) setFailed({ attempt, error: e instanceof Error ? e.message : String(e) }); },
    );
    return () => { alive = false; };
  }, [attempt]);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  if (done) return [{ state: 'ok', spots: done }, retry];
  if (failed && failed.attempt === attempt) return [{ state: 'error', error: failed.error }, retry];
  return [{ state: 'loading' }, retry];
}
