import {
  useEffect, useId, useLayoutEffect, useMemo, useRef, useState,
  type CSSProperties, type FocusEvent, type KeyboardEvent, type MouseEvent, type PointerEvent, type RefObject,
} from 'react';
import { Check, Crosshair, ImageOff, Maximize, Minus, Plus, RotateCw, X } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { matches, MQ, useIsTouch } from '../../components/hooks';
import { categoryById, type Region } from './farmRules';
import type { MapArea } from './farmData';
import { categoryIcon, GROUP_COLOR } from './farmIcons';
import { buildSet, createMarkerLayer, HIT, type Box, type Mouse, type View, type ViewState } from './farmCanvas';
import { benchCount, benchMarkers, logBench } from './farmBench';

/*
 * The farm map: a picture of a region's in-game world map with the spots as markers. Own pan and zoom, no map
 * library: one layer at the picture's natural size holds the <img> and the area names and moves with a single
 * transform (translate + scale). The markers are drawn on a canvas over it (farmCanvas), in the same animation frame;
 * only the selected marker is a DOM button, in a second layer with the same transform above the canvas, so keys and
 * screen readers reach it (the spot list reaches every spot). DOM children are counter-scaled (--fm-k), so they keep
 * their size on screen. Gestures write the transform once per animation frame; React state only changes when a gesture
 * ends (the limits of the zoom buttons). Pick mode: the next click or tap on the picture, or Enter on the centre
 * crosshair, gives a position as fractions of the picture. Links: the page passes a view to show (goTo) and hears of
 * every view the map comes to rest at (onViewChange), so the address can name it. The search moves the map to what it
 * found (revealAt): centred and zoomed in far enough to tell the markers apart. On phones the selected spot's card is
 * a sheet over the map's lower part (cover): the view then keeps the selected marker in the room above it.
 */

/** `source`: a spot of the AION2 Interactive Map data or a Map Overlay gathering point (drawn smaller than the players'
 *  spots); `found`: the player marked it found (drawn dimmed, with a check badge) */
export interface MapMarker { id: string; pos: [number, number]; cat: string; label: string; pending?: boolean; source?: boolean; found?: boolean }

/** A view as a link names it: the picture point in the middle (fractions) and the zoom relative to the whole picture. */
export interface MapView { fx: number; fy: number; zoom: number }

/** A place to bring into the middle of the view (fractions of the picture), zoomed in to at least `zoom`. */
export interface MapReveal { pos: [number, number]; zoom: number }

export interface FarmMapProps {
  /** region.image is set (the page only renders the map then) */
  region: Region;
  /** already filtered */
  markers: MapMarker[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  /** pick mode: the next click/tap, or Enter on the centre crosshair, sets a position */
  picking?: { pos: [number, number] | null; onPick: (pos: [number, number]) => void; onCancel: () => void } | null;
  /** accessible name of the map */
  label: string;
  /** each new non-zero value pans the selected marker into view, also one that was selected already ("Show on map") */
  reveal?: number;
  /** area names, drawn on the picture at a fixed size on screen (the list names each spot's area for screen readers) */
  areas?: MapArea[];
  /** the F key on the map: the selected spot found or not found */
  onToggleFound?: (id: string) => void;
  /** the view once a gesture, an animation or a resize has ended (the page keeps it in the address) */
  onViewChange?: (v: MapView) => void;
  /** a view to show at once (a link's); each new object is applied once */
  goTo?: MapView | null;
  /** a place to move to (a pick of the search), animated (at once when the map mounts with it); a deeper zoom stays.
   *  Each new object is applied once. */
  revealAt?: MapReveal | null;
  /** an element laid over the map's lower part (the phones' card sheet): the picture may move up out from under it,
   *  and the selected marker is kept above it */
  cover?: HTMLElement | null;
}

/** the most zoom, as a multiple of the scale that shows the whole picture */
export const MAX_ZOOM = 8;
/** zoom factor of the buttons and the + / - keys */
const ZOOM_STEP = 1.5;
/** the arrow keys move a fifth of the view (with Shift half of it) */
const PAN_STEP = 0.2;
/** a marker selected from outside that sits nearer to the edge than this is panned into view */
const EDGE = 48;
const ANIM_MS = 260;

const fitScale = (b: Box, iw: number, ih: number) => (b.w > 0 && b.h > 0 ? Math.min(b.w / iw, b.h / ih) : 1);

/**
 * Keeps the zoom between "whole picture" and MAX_ZOOM and the picture in the view: centred on an axis where it is
 * smaller than the view, else covering the view (no dragging into empty space). `cover` px at the bottom lie under a
 * sheet: the room above them counts as the view's height, so the picture's bottom edge can come up to the sheet.
 */
function clampView(v: View, b: Box, iw: number, ih: number, cover = 0): View {
  const fit = fitScale(b, iw, ih);
  const s = Math.min(fit * MAX_ZOOM, Math.max(fit, v.s));
  const axis = (pos: number, room: number, len: number) => (len <= room ? (room - len) / 2 : Math.min(0, Math.max(room - len, pos)));
  return { s, x: axis(v.x, b.w, iw * s), y: axis(v.y, b.h - cover, ih * s) };
}

/** The view at scale s with the view point (px, py) still over the same point of the picture. */
const zoomAround = (v: View, px: number, py: number, s: number): View =>
  ({ s, x: px - ((px - v.x) / v.s) * s, y: py - ((py - v.y) / v.s) * s });

const round4 = (n: number) => Math.round(n * 10000) / 10000;
const base = () => import.meta.env.BASE_URL.replace(/[/]?$/, '/');
/** region pictures are paths inside public/ (maps/<region>.webp); full addresses stay as they are */
const resolveSrc = (src: string) => (/^[a-z][a-z0-9+.-]*:/i.test(src) ? src : base() + src.replace(/^[.]?[/]/, ''));

/** Keyboard focus; browsers without :focus-visible (they do not focus buttons on click either) count every focus. */
function focusVisible(el: Element) {
  try { return el.matches(':focus-visible'); } catch { return true; }
}

/** The top left of the element's padding box (the layer's coordinate origin) on screen. */
function originOf(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { left: r.left + el.clientLeft, top: r.top + el.clientTop };
}

/**
 * The pan / zoom state outside React: the view lives here and is written straight to the layers; onPaint draws what
 * follows the view (the marker canvas) in the same frame. onSettle gets the zoom (relative to the whole picture) and
 * the picture point in the middle whenever the view comes to rest.
 */
function createEngine(
  layerRefs: RefObject<HTMLDivElement>[],
  surfaceRef: RefObject<HTMLDivElement>,
  onSettle: (rel: number, centre: [number, number]) => void,
  onPaint: (st: ViewState, rel: number) => void,
) {
  const st = {
    view: { x: 0, y: 0, s: 1 } as View,
    box: { w: 0, h: 0 } as Box,
    iw: 1,
    ih: 1,
    /** a new picture waits for a view size to be fitted in */
    stale: true,
    /** a link's view that came before the view had a size: applied instead of the fit once it has one */
    pending: null as MapView | null,
    frame: 0,
    tween: 0,
    /** where a running animation ends */
    target: null as View | null,
    settle: 0,
    /** px of the view's bottom under a sheet (setCover) */
    cover: 0,
  };
  const clamp = (v: View) => clampView(v, st.box, st.iw, st.ih, st.cover);
  const fit = () => fitScale(st.box, st.iw, st.ih);
  const scaleIn = (s: number) => Math.min(fit() * MAX_ZOOM, Math.max(fit(), s));
  /** the view with the picture point (fx, fy) in the middle at zoom rel (clamped: an edge of the picture stays put) */
  const viewAt = ({ fx, fy, zoom }: MapView): View => {
    const s = scaleIn(fit() * zoom);
    return clamp({ s, x: st.box.w / 2 - fx * st.iw * s, y: st.box.h / 2 - fy * st.ih * s });
  };

  /** the canvas from the current view */
  const redraw = () => onPaint(st, st.view.s / fit());
  /** transform only, nothing that changes the layout; then the canvas */
  const paint = () => {
    st.frame = 0;
    const { x, y, s } = st.view;
    for (const ref of layerRefs) {
      const el = ref.current;
      if (!el) continue;
      el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
      el.style.setProperty('--fm-k', String(1 / s));
    }
    redraw();
  };
  /** at most one paint per frame (a hover ring, a view change) */
  const schedule = () => {
    if (!st.frame) st.frame = requestAnimationFrame(paint);
  };
  /** gestures send many events per frame: the view follows each, the layers are written once per frame */
  const set = (v: View) => {
    st.view = clamp(v);
    schedule();
  };
  const commit = () => {
    const v = st.view;
    // the picture point in the middle of the view (the middle of the picture on an axis where it is smaller)
    const fx = Math.min(1, Math.max(0, (st.box.w / 2 - v.x) / (v.s * st.iw)));
    const fy = Math.min(1, Math.max(0, (st.box.h / 2 - v.y) / (v.s * st.ih)));
    onSettle(v.s / fit(), [round4(fx), round4(fy)]);
  };
  const stop = () => {
    if (st.tween) cancelAnimationFrame(st.tween);
    st.tween = 0;
    st.target = null;
  };
  /** jumps to the end of a running animation (Enter picks where the view is going, not where it is on the way) */
  const finish = () => {
    const to = st.target;
    if (!to) return;
    stop();
    st.view = to;
    paint();
    commit();
  };
  /** the layer is promoted to its own compositing layer only while it moves, so it is drawn sharp when it rests */
  const moving = (on: boolean) => { surfaceRef.current?.toggleAttribute('data-moving', on); };
  const animate = (to: View) => {
    stop();
    const end = clamp(to);
    const from = st.view;
    // already there (an edge of the picture or the zoom limit): nothing to move
    if (Math.abs(end.x - from.x) < 0.5 && Math.abs(end.y - from.y) < 0.5 && Math.abs(end.s - from.s) < 1e-6 * from.s) return;
    if (matches(MQ.reducedMotion)) {
      st.view = end;
      paint();
      commit();
      return;
    }
    st.target = end;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ANIM_MS);
      const e = 1 - (1 - k) ** 3;
      st.view = clamp({ x: from.x + (end.x - from.x) * e, y: from.y + (end.y - from.y) * e, s: from.s + (end.s - from.s) * e });
      paint();
      if (k < 1) {
        st.tween = requestAnimationFrame(step);
      } else {
        st.tween = 0;
        st.target = null;
        commit();
      }
    };
    st.tween = requestAnimationFrame(step);
  };
  // buttons and keys build on a running animation's end, so quick presses add up
  const zoomBy = (f: number) => {
    const v = st.target ?? st.view;
    animate(zoomAround(v, st.box.w / 2, st.box.h / 2, scaleIn(v.s * f)));
  };
  const panBy = (dx: number, dy: number) => {
    const v = st.target ?? st.view;
    animate({ s: v.s, x: v.x + dx, y: v.y + dy });
  };
  /** the whole picture, centred (the clamp centres it) */
  const reset = () => animate({ s: fit(), x: 0, y: 0 });
  /** the view (same zoom) with the picture point (fx, fy) in the middle (of the room above a sheet); null when the
   *  point is in view already */
  const revealTarget = (fx: number, fy: number): View | null => {
    const b = st.box;
    const h = b.h - st.cover;
    if (!b.w || h <= 0) return null;
    const v = st.target ?? st.view;
    const px = v.x + fx * st.iw * v.s;
    const py = v.y + fy * st.ih * v.s;
    const mx = Math.min(EDGE, b.w / 4);
    const my = Math.min(EDGE, h / 4);
    if (px >= mx && px <= b.w - mx && py >= my && py <= h - my) return null;
    return { s: v.s, x: b.w / 2 - fx * st.iw * v.s, y: h / 2 - fy * st.ih * v.s };
  };
  /** pans (keeping the zoom) so the picture point (fx, fy) is in view, unless it already is */
  const reveal = (fx: number, fy: number) => {
    const to = revealTarget(fx, fy);
    if (to) animate(to);
  };
  /**
   * the picture point (fx, fy) in the middle, zoomed in to at least rel (relative to the whole picture); a deeper zoom
   * stays. Before the view has a size it is shown at once when it gets one.
   */
  const revealZoomed = (fx: number, fy: number, rel: number) => {
    if (st.stale || !st.box.w || !st.box.h) {
      st.pending = { fx, fy, zoom: rel };
      return;
    }
    const v = st.target ?? st.view;
    const s = scaleIn(Math.max(v.s, fit() * rel));
    animate({ s, x: st.box.w / 2 - fx * st.iw * s, y: (st.box.h - st.cover) / 2 - fy * st.ih * s });
  };
  /**
   * px of the view's bottom under a sheet; at most half the view, so a stray measure cannot hide the map. When the
   * sheet goes, the view moves back inside the usual bounds.
   */
  const setCover = (px: number) => {
    const c = Math.round(Math.max(0, Math.min(st.box.h / 2, px)));
    if (c === st.cover) return;
    st.cover = c;
    animate(st.target ?? st.view);
  };
  /**
   * reveal without an animation, for keyboard focus: the browser scrolls the page to a focused element right after
   * the focus event, so the marker must already sit inside the map then (else the page jumps to its clipped spot)
   */
  const revealNow = (fx: number, fy: number) => {
    // from where the view rests: a running animation ends now
    finish();
    const to = revealTarget(fx, fy);
    if (!to) return;
    st.view = clamp(to);
    paint();
    commit();
  };
  /** the picture point under a view point as fractions (4 places); null outside the picture */
  const toPicture = (px: number, py: number): [number, number] | null => {
    const v = st.view;
    const fx = (px - v.x) / (v.s * st.iw);
    const fy = (py - v.y) / (v.s * st.ih);
    return fx >= 0 && fx <= 1 && fy >= 0 && fy <= 1 ? [round4(fx), round4(fy)] : null;
  };
  /** a new view size (ResizeObserver) or, with refit, a new picture */
  const measure = (w: number, h: number, refit: boolean) => {
    if (refit) st.stale = true;
    if (!w || !h) return;
    const prev = st.box;
    if (!st.stale && prev.w === w && prev.h === h) return;
    stop();
    // a resize keeps the zoom (relative to the whole picture) and the picture point in the middle of the view
    const keep = !st.stale && prev.w > 0 && prev.h > 0;
    st.stale = false;
    const v = st.view;
    const rel = keep ? v.s / fitScale(prev, st.iw, st.ih) : 1;
    const cx = (prev.w / 2 - v.x) / v.s;
    const cy = (prev.h / 2 - v.y) / v.s;
    st.box = { w, h };
    const s = fit() * rel;
    st.view = clamp(keep ? { s, x: w / 2 - cx * s, y: h / 2 - cy * s } : { s, x: 0, y: 0 });
    if (!keep && st.pending) {
      st.view = viewAt(st.pending);
      st.pending = null;
    }
    paint();
    commit();
  };
  /** a link's view, at once (no animation: the page has just opened); kept for later while the view has no size */
  const jump = (to: MapView) => {
    if (st.stale || !st.box.w || !st.box.h) {
      st.pending = to;
      return;
    }
    stop();
    st.view = viewAt(to);
    paint();
    commit();
  };
  /** the wheel sends no end event: the zoom state follows once it has been quiet for a moment */
  const settle = () => {
    moving(true);
    clearTimeout(st.settle);
    st.settle = window.setTimeout(() => { moving(false); commit(); }, 160);
  };
  const dispose = () => {
    stop();
    cancelAnimationFrame(st.frame);
    st.frame = 0;
    clearTimeout(st.settle);
  };
  return { st, set, schedule, redraw, scaleIn, commit, stop, finish, moving, zoomBy, panBy, reset, reveal, revealNow, revealZoomed, setCover, toPicture, measure, jump, settle, dispose };
}

type Point = { x: number; y: number };

/** One press: a mouse button or up to two fingers. */
interface Gesture {
  /** pointer positions relative to the view */
  ptrs: Map<number, Point>;
  /** the view's origin on screen when the gesture began */
  left: number;
  top: number;
  mode: 'pan' | 'pinch';
  /** the view when the current mode began */
  start: View;
  /** pan: where the pointer was then */
  from: Point;
  /** pinch: finger distance then and the picture point under the fingers' middle */
  pinch: { d: number; ix: number; iy: number };
  /** moved further than the slop: a drag, so the click that may follow is dropped */
  moved: boolean;
  slop: number;
}

export function FarmMap({ region, markers, selected, onSelect, picking, label, reveal, areas, onToggleFound, onViewChange, goTo, revealAt, cover }: FarmMapProps) {
  const { t } = useGame();
  const touch = useIsTouch();
  const helpId = useId();
  const pickId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  /** the layer above the canvas: the selected marker and the pick ghost */
  const topRef = useRef<HTMLDivElement>(null);
  /** holds the marker canvas, which the marker layer makes */
  const canvasRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  /** zoom relative to the whole picture (1 .. MAX_ZOOM), updated when a gesture or animation ends */
  const [zoom, setZoom] = useState(1);
  const viewCb = useRef(onViewChange);
  viewCb.current = onViewChange;
  const [layer] = useState(() => createMarkerLayer({ host: canvasRef, ring: ringRef, tip: tipRef, surface: surfaceRef }));
  const [eng] = useState(() => createEngine(
    [layerRef, topRef], surfaceRef,
    (z, [fx, fy]) => {
      setZoom(Math.round(z * 1000) / 1000);
      viewCb.current?.({ fx, fy, zoom: z });
    },
    (st, rel) => layer.draw(st, rel),
  ));
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const gesture = useRef<Gesture | null>(null);
  const suppress = useRef({ on: false, timer: 0 });
  /** the kind of pointer that pressed last: a finger hits a marker from further away */
  const pointerType = useRef('mouse');
  /** the id the map itself just selected: that marker is in view already, so the selection does not pan */
  const fromMap = useRef<string | null>(null);
  const pickRef = useRef(picking);
  pickRef.current = picking;

  const image = region.image;
  const hasImage = !!image;
  const iw = image?.w || 1;
  const ih = image?.h || 1;
  const src = image ? resolveSrc(image.src) : '';
  const failed = hasImage && failedSrc === src;
  const isPicking = !!picking;

  // a new picture: fit it before the first paint
  useLayoutEffect(() => {
    eng.st.iw = iw;
    eng.st.ih = ih;
    const el = surfaceRef.current;
    eng.measure(el?.clientWidth ?? 0, el?.clientHeight ?? 0, true);
  }, [eng, iw, ih, src]);

  useEffect(() => {
    const el = surfaceRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => eng.measure(el.clientWidth, el.clientHeight, false));
    ro.observe(el);
    return () => ro.disconnect();
  }, [eng, hasImage]);

  useEffect(() => () => eng.dispose(), [eng]);

  // DEV only: #/farm/<region>?bench=N adds N synthetic markers and logs the drawing time (farmBench). Read when the map
  // mounts and on each address change, from the event's address: the page has dropped the query by the time this
  // listener runs.
  const [bench, setBench] = useState(() => (import.meta.env.DEV ? benchCount() : 0));
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const onHash = (e: HashChangeEvent) => setBench(benchCount(e.newURL));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => (import.meta.env.DEV && bench ? logBench(layer.st, bench) : undefined), [layer, bench]);
  const drawn = useMemo(() => (import.meta.env.DEV && bench ? [...markers, ...benchMarkers(bench)] : markers), [markers, bench]);
  const set = useMemo(() => buildSet(drawn), [drawn]);

  // the canvas and its sprites, which follow the pixel ratio, the touch size and the colours; before the first paint,
  // so the markers show with the map (their icons follow a moment later the first time)
  useLayoutEffect(() => layer.mount(eng.redraw), [eng, layer, hasImage]);

  // new markers, another selection (its DOM button draws it) or pick mode: drawn before the browser paints, so the
  // selected marker never shows twice or not at all
  useLayoutEffect(() => {
    layer.update(set, selected, isPicking);
    eng.redraw();
  }, [eng, layer, set, selected, isPicking]);

  // a link's view: before the first paint, so the map does not show the whole picture first
  useLayoutEffect(() => {
    if (goTo) eng.jump(goTo);
  }, [eng, goTo]);

  // a pick of the search in another region mounts this map with its place: shown at once like a link's view (no frame
  // of the whole picture, no zoom from it); the effect for revealAt below then finds the view there already
  const openAt = useRef(revealAt);
  useLayoutEffect(() => {
    const r = openAt.current;
    if (r) eng.jump({ fx: r.pos[0], fy: r.pos[1], zoom: r.zoom });
  }, [eng]);

  // the wheel zooms at the cursor; React's wheel listener is passive, so this one is added by hand
  useEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.deltaY) return;
      const v = eng.st.view;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? eng.st.box.h : 1;
      // ctrl + wheel is a touchpad pinch: small steps that need a stronger factor
      const f = Math.exp(-e.deltaY * unit * (e.ctrlKey ? 0.01 : 0.002));
      const s = eng.scaleIn(v.s * f);
      // zoomed out all the way, scrolling down moves the page instead of getting stuck on the map
      if (s === v.s && f < 1 && !e.ctrlKey) return;
      e.preventDefault();
      eng.stop();
      const o = originOf(el);
      eng.set(zoomAround(v, e.clientX - o.left, e.clientY - o.top, s));
      eng.settle();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [eng, hasImage]);

  // a marker selected from outside (the list) is panned into view; the zoom stays
  const selIndex = selected ? set.byId.get(selected) : undefined;
  const sel = selIndex === undefined ? undefined : set.list[selIndex];
  const selX = sel?.pos[0];
  const selY = sel?.pos[1];
  const selPos = useRef<[number, number] | null>(null);
  selPos.current = selX != null && selY != null ? [selX, selY] : null;
  useEffect(() => {
    const own = fromMap.current !== null && fromMap.current === selected;
    fromMap.current = null;
    if (own || selX == null || selY == null) return;
    eng.reveal(selX, selY);
  }, [eng, selected, selX, selY]);

  // "Show on map" asks again, whoever selected the marker: the map may have been moved away from it since. When the
  // selection changes in the same render, the effect above has set the target already and this reveal finds it in view.
  useEffect(() => {
    const p = selPos.current;
    if (reveal && p) eng.reveal(p[0], p[1]);
  }, [eng, reveal]);

  // a pick of the search: after the two effects above, so it wins over their pan when it selects a marker as well
  useEffect(() => {
    if (revealAt) eng.revealZoomed(revealAt.pos[0], revealAt.pos[1], revealAt.zoom);
  }, [eng, revealAt]);

  // a sheet over the map's lower part: how far it reaches into the view, from its layout box (not its slide-in
  // transform), and the selected marker moved up out from under it. The first measure comes after the next layout,
  // when the page has brought the map into view; the page does not scroll while the sheet (a dialog) is open.
  useEffect(() => {
    const el = surfaceRef.current;
    if (!cover || !el || typeof ResizeObserver === 'undefined') {
      eng.setCover(0);
      return;
    }
    const measure = () => {
      const parent = cover.offsetParent;
      const top = (parent ? parent.getBoundingClientRect().top : 0) + cover.offsetTop;
      eng.setCover(el.getBoundingClientRect().bottom - top);
      const p = selPos.current;
      if (p) eng.reveal(p[0], p[1]);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(cover);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [eng, cover]);

  // pick mode: the map takes the focus (keyboard picking), comes into view, Esc cancels
  useEffect(() => {
    if (!isPicking) return;
    // after the form's dialog has closed and handed its focus back
    const raf = requestAnimationFrame(() => {
      const el = surfaceRef.current;
      const wrap = wrapRef.current;
      if (!el || !wrap) return;
      el.focus({ preventScroll: true });
      const r = wrap.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(wrap).scrollMarginTop) || 0;
      if (r.top < top || r.bottom > window.innerHeight) {
        wrap.scrollIntoView({ block: 'start', behavior: matches(MQ.reducedMotion) ? 'auto' : 'smooth' });
      }
      const pos = pickRef.current?.pos;
      if (pos) eng.reveal(pos[0], pos[1]);
    });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      e.preventDefault();
      pickRef.current?.onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, [eng, isPicking]);

  const capture = (id: number) => {
    try { surfaceRef.current?.setPointerCapture(id); } catch { /* the pointer is gone already */ }
  };
  const startPan = (g: Gesture, p: Point) => {
    g.mode = 'pan';
    g.start = eng.st.view;
    g.from = p;
  };
  const startPinch = (g: Gesture) => {
    const [a, b] = [...g.ptrs.values()];
    const v = eng.st.view;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    g.mode = 'pinch';
    g.start = v;
    g.pinch = { d: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), ix: (mx - v.x) / v.s, iy: (my - v.y) / v.s };
  };

  /** where the mouse is on screen while it hovers the map */
  const mouseAt = useRef<Point | null>(null);
  /** the mouse over the map: the marker under it gets a ring and shows its name (null: it left, or drags the map) */
  const hoverAt = (e: PointerEvent<HTMLDivElement> | null) => {
    let m: Mouse | null = null;
    if (e && !failed) {
      const o = originOf(e.currentTarget);
      m = { x: e.clientX - o.left, y: e.clientY - o.top };
    }
    mouseAt.current = e && m ? { x: e.clientX, y: e.clientY } : null;
    layer.setMouse(m);
    if (layer.updateHover(eng.st)) eng.schedule();
  };

  // the page scrolls under a resting mouse (the wheel scrolls it while the map is zoomed out, selecting a marker
  // scrolls the list): no pointer event follows, so the hover is found again for the map's new place under the mouse
  useEffect(() => {
    const onScroll = () => {
      const c = mouseAt.current;
      const el = surfaceRef.current;
      if (!c || !el) return;
      const o = originOf(el);
      const m = { x: c.x - o.left, y: c.y - o.top };
      const { w, h } = eng.st.box;
      const inside = m.x >= 0 && m.y >= 0 && m.x < w && m.y < h;
      if (!inside) mouseAt.current = null;
      layer.setMouse(inside ? m : null);
      if (layer.updateHover(eng.st)) eng.schedule();
    };
    // capture: any scrolling ancestor, not only the window
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => window.removeEventListener('scroll', onScroll, { capture: true });
  }, [eng, layer]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (failed || (e.pointerType === 'mouse' && e.button !== 0)) return;
    pointerType.current = e.pointerType;
    // a finger on a screen that also has a mouse: no tooltip left behind
    if (e.pointerType !== 'mouse') hoverAt(null);
    let g = gesture.current;
    // a mouse has one pointer, so its press always starts anew (a release outside the map may have been missed)
    if (g && (e.pointerType === 'mouse' || g.ptrs.has(e.pointerId))) {
      g = null;
      eng.moving(false);
    }
    if (!g) {
      // a press that stops a zoom animation may never move, so no gesture end would update the zoom buttons' limits
      const wasAnimating = eng.st.target !== null;
      eng.stop();
      if (wasAnimating) eng.commit();
      const o = originOf(e.currentTarget);
      g = {
        ptrs: new Map(), left: o.left, top: o.top, mode: 'pan', start: eng.st.view, from: { x: 0, y: 0 },
        pinch: { d: 1, ix: 0, iy: 0 }, moved: false, slop: e.pointerType === 'mouse' ? 5 : 10,
      };
      gesture.current = g;
      suppress.current.on = false;
    }
    if (g.ptrs.size >= 2) return;
    const p = { x: e.clientX - g.left, y: e.clientY - g.top };
    g.ptrs.set(e.pointerId, p);
    if (g.ptrs.size === 1) {
      // no pointer capture yet: a press that does not move stays a click on the marker or picture under it
      startPan(g, p);
    } else {
      g.moved = true;
      g.ptrs.forEach((_, id) => capture(id));
      eng.moving(true);
      startPinch(g);
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (e.pointerType === 'mouse' && !g?.moved) hoverAt(e);
    if (!g || !g.ptrs.has(e.pointerId)) return;
    // the button was released outside the map before the press was captured (no pointerup reached us): the gesture
    // is over, it must not follow the hovering cursor
    if (e.pointerType !== 'touch' && e.buttons === 0) {
      onPointerEnd(e);
      return;
    }
    const p = { x: e.clientX - g.left, y: e.clientY - g.top };
    g.ptrs.set(e.pointerId, p);
    if (g.mode === 'pan') {
      const dx = p.x - g.from.x;
      const dy = p.y - g.from.y;
      if (!g.moved) {
        if (Math.hypot(dx, dy) < g.slop) return;
        g.moved = true;
        capture(e.pointerId);
        eng.moving(true);
        hoverAt(null);
      }
      eng.set({ s: g.start.s, x: g.start.x + dx, y: g.start.y + dy });
      return;
    }
    const [a, b] = [...g.ptrs.values()];
    const s = eng.scaleIn((g.start.s * Math.hypot(a.x - b.x, a.y - b.y)) / g.pinch.d);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    eng.set({ s, x: mx - g.pinch.ix * s, y: my - g.pinch.iy * s });
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || !g.ptrs.delete(e.pointerId)) return;
    // one finger of a pinch lifted: the other one pans on from where it is
    if (g.ptrs.size === 1) {
      startPan(g, [...g.ptrs.values()][0]);
      return;
    }
    if (g.ptrs.size) return;
    gesture.current = null;
    if (!g.moved) return;
    eng.moving(false);
    eng.commit();
    // the click that may follow a drag must not select a marker or pick a position (the next press clears it too)
    const sup = suppress.current;
    sup.on = true;
    clearTimeout(sup.timer);
    sup.timer = window.setTimeout(() => { sup.on = false; }, 400);
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    // detail 0: a keyboard or screen reader click on a marker, never the end of a drag
    const pointer = e.detail > 0;
    if (pointer && suppress.current.on) {
      suppress.current.on = false;
      return;
    }
    if (failed) return;
    if (picking) {
      // keys pick with Enter on the crosshair
      if (!pointer) return;
      eng.finish();
      const o = originOf(e.currentTarget);
      const pos = eng.toPicture(e.clientX - o.left, e.clientY - o.top);
      if (pos) picking.onPick(pos);
      return;
    }
    // the selected marker is a DOM button; the others are on the canvas: the nearest one to the click (a keyboard
    // click on the map itself has no point and selects nothing)
    const btn = (e.target as Element).closest<HTMLElement>('.fm-marker');
    let id = btn?.dataset.id ?? null;
    if (!btn && pointer) {
      const o = originOf(e.currentTarget);
      id = layer.hit(eng.st, e.clientX - o.left, e.clientY - o.top, pointerType.current === 'touch' ? HIT.touch : HIT.mouse);
    }
    // only a change of the selection runs the effect that clears the flag, so the same id again must not set it
    fromMap.current = id !== selected ? id : null;
    onSelect(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (failed || e.altKey || e.ctrlKey || e.metaKey) return;
    const { w, h } = eng.st.box;
    const k = e.shiftKey ? 0.5 : PAN_STEP;
    switch (e.key) {
      case 'ArrowLeft': eng.panBy(w * k, 0); break;
      case 'ArrowRight': eng.panBy(-w * k, 0); break;
      case 'ArrowUp': eng.panBy(0, h * k); break;
      case 'ArrowDown': eng.panBy(0, -h * k); break;
      case '+': case '=': eng.zoomBy(ZOOM_STEP); break;
      case '-': case '_': eng.zoomBy(1 / ZOOM_STEP); break;
      case '0': eng.reset(); break;
      case 'f': case 'F': {
        // the selected spot found or not found (held down, the key would flip it back and forth)
        if (e.repeat || picking || !selected || !onToggleFound) return;
        onToggleFound(selected);
        break;
      }
      case 'Enter': {
        // Enter on a focused marker is that marker's click
        if (!picking || e.target !== e.currentTarget) return;
        eng.finish();
        const pos = eng.toPicture(w / 2, h / 2);
        if (pos) picking.onPick(pos);
        break;
      }
      default: return;
    }
    e.preventDefault();
  };

  // a marker reached with Tab may sit outside the view (a mouse click only focuses markers that are in view); it is
  // moved in at once, before the browser scrolls the page to the focused marker
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement;
    const id = el.classList.contains('fm-marker') && focusVisible(el) ? el.dataset.id : undefined;
    const i = id ? set.byId.get(id) : undefined;
    if (i !== undefined) eng.revealNow(set.x[i], set.y[i]);
  };

  const retryRef = useRef<HTMLButtonElement>(null);
  // the Retry button goes away with the message: its focus moves to the map instead of falling to the page
  const onRetry = (e: MouseEvent<HTMLButtonElement>) => {
    const a = document.activeElement;
    if (a === e.currentTarget || a === document.body) surfaceRef.current?.focus({ preventScroll: true });
    setFailedSrc(null);
    setAttempt((n) => n + 1);
  };
  // the picture failed (again) while the map had the focus: the message covers the map, so Retry takes the focus
  useEffect(() => {
    if (failed && document.activeElement === surfaceRef.current) retryRef.current?.focus({ preventScroll: true });
  }, [failed]);

  // the selected marker, the one marker in the DOM: a tab stop (the list reaches every spot), pressed, named. Its name
  // shows in the map's tooltip on hover, so it has no title.
  const selEl = useMemo(() => {
    if (!sel) return null;
    const Icon = categoryIcon(sel.cat);
    const style = { left: `${sel.pos[0] * 100}%`, top: `${sel.pos[1] * 100}%`, '--fc': GROUP_COLOR[categoryById(sel.cat)?.group ?? 'place'] } as CSSProperties;
    return (
      <button
        type="button"
        data-id={sel.id}
        className={`fm-marker on${sel.pending ? ' pending' : ''}${sel.source ? ' src' : ''}${sel.found ? ' found' : ''}`}
        style={style}
        aria-label={sel.label}
        aria-pressed
        tabIndex={isPicking ? -1 : 0}
        aria-hidden={isPicking || undefined}
      >
        <Icon size={15} strokeWidth={2.25} aria-hidden />
        {/* the canvas's check badge; the selected marker itself is not dimmed, it is the one being looked at */}
        {sel.found && <span className="fm-check" aria-hidden><Check strokeWidth={4} aria-hidden /></span>}
      </button>
    );
  }, [sel, isPicking]);

  const areaEls = useMemo(() => (areas?.length ? (
    <div className="fm-areas" aria-hidden>
      {areas.map((a) => (
        <span key={a.name} className="fm-area" style={{ left: `${a.pos[0] * 100}%`, top: `${a.pos[1] * 100}%` }}>{a.name}</span>
      ))}
    </div>
  ) : null), [areas]);

  if (!image) {
    return (
      <div className="fm">
        <div className="fm-msg fm-msg-static">
          <ImageOff size={28} aria-hidden />
          <p>{t('farmMapNoImage')}</p>
        </div>
      </div>
    );
  }

  const atMin = zoom <= 1.001;
  const atMax = zoom >= MAX_ZOOM - 0.001;
  const hint = t(touch ? 'farmMapPickHintTouch' : 'farmMapPickHint');

  return (
    <div className="fm" ref={wrapRef}>
      {picking && (
        <div className="fm-pickbar">
          <Crosshair size={18} aria-hidden />
          <p className="fm-pick-text" id={pickId}>
            <strong>{t('farmMapPickTitle')}</strong>
            <span>{hint}</span>
          </p>
          <button type="button" className="btn sm" onClick={picking.onCancel}>
            <X size={14} aria-hidden />
            {t('farmMapPickCancel')}
            {!touch && <kbd aria-hidden>Esc</kbd>}
          </button>
        </div>
      )}
      <div className="fm-frame">
        <div
          ref={surfaceRef}
          className={`fm-surface${isPicking ? ' picking' : ''}`}
          style={{ '--fm-ratio': `${iw} / ${ih}` } as CSSProperties}
          tabIndex={failed ? -1 : 0}
          role="application"
          aria-label={label}
          aria-describedby={isPicking ? `${pickId} ${helpId}` : helpId}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onPointerLeave={() => hoverAt(null)}
          // a capture lost without a pointerup (the window lost focus) must not leave a gesture hanging; the loss on a
          // child when the surface takes over a touch pointer bubbles here too and is not one
          onLostPointerCapture={(e) => { if (e.target === e.currentTarget) onPointerEnd(e); }}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onDragStart={(e) => e.preventDefault()}
          // old browsers without overflow: clip scroll the view to a focused marker; the transform does the moving
          onScroll={(e) => { e.currentTarget.scrollLeft = 0; e.currentTarget.scrollTop = 0; }}
        >
          <div className="fm-layer" ref={layerRef} style={{ width: iw, height: ih }}>
            <img key={attempt} src={src} alt="" width={iw} height={ih} draggable={false} decoding="async" onError={() => setFailedSrc(src)} />
            {areaEls}
          </div>
          {/* the markers: for the eyes only, the list is the way to every spot */}
          <div className="fm-canvas" ref={canvasRef} aria-hidden />
          <div className="fm-layer fm-top" ref={topRef} style={{ width: iw, height: ih }}>
            <span className="fm-ring" ref={ringRef} hidden aria-hidden />
            {selEl}
            {picking?.pos && (
              <span className="fm-ghost" style={{ left: `${picking.pos[0] * 100}%`, top: `${picking.pos[1] * 100}%` }} role="img" aria-label={t('farmMapGhost')} />
            )}
          </div>
          {isPicking && <Crosshair className="fm-cross" size={40} strokeWidth={1.5} aria-hidden />}
        </div>
        {failed ? (
          <div className="fm-msg" role="alert">
            <ImageOff size={28} aria-hidden />
            <p>{t('farmMapImageError')}</p>
            <button type="button" className="btn sm" ref={retryRef} onClick={onRetry}>
              <RotateCw size={14} aria-hidden />
              {t('farmMapRetry')}
            </button>
          </div>
        ) : (
          <div className="fm-tools" role="group" aria-label={t('farmMapTools')}>
            <button type="button" className="icon-btn" aria-label={t('farmMapZoomIn')} title={t('farmMapZoomIn')} aria-disabled={atMax} onClick={() => { if (!atMax) eng.zoomBy(ZOOM_STEP); }}>
              <Plus size={18} aria-hidden />
            </button>
            <button type="button" className="icon-btn" aria-label={t('farmMapZoomOut')} title={t('farmMapZoomOut')} aria-disabled={atMin} onClick={() => { if (!atMin) eng.zoomBy(1 / ZOOM_STEP); }}>
              <Minus size={18} aria-hidden />
            </button>
            <button type="button" className="icon-btn" aria-label={t('farmMapReset')} title={t('farmMapReset')} aria-disabled={atMin} onClick={() => { if (!atMin) eng.reset(); }}>
              <Maximize size={16} aria-hidden />
            </button>
          </div>
        )}
        {/* the hovered marker's name (its label, which the list and the selected marker's button carry as well); after
            the zoom buttons, so it lies over them */}
        <div className="fm-tip" ref={tipRef} hidden aria-hidden />
      </div>
      <p className="fm-help" id={helpId}>{t(touch ? 'farmMapHelpTouch' : 'farmMapHelp')}</p>
    </div>
  );
}
