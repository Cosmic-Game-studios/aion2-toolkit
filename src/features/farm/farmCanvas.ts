import { createElement, type RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { matches, MQ } from '../../components/hooks';
import { CATEGORIES, CATEGORY_GROUPS, categoryById, type CategoryGroup } from './farmRules';
import { categoryIcon, GROUP_COLOR } from './farmIcons';
import type { MapMarker } from './FarmMap';

/*
 * The farm map's markers on one <canvas> instead of a DOM button each, so a region can show thousands of spots. The
 * canvas lies over the picture but outside the moving layer: FarmMap's engine draws it again in the same animation
 * frame in which it moves the layer. The parts:
 * - sprites: every category in every look (a found spot's dimmed, with a check badge), drawn once at the screen's
 *   pixel ratio into one canvas after the CSS of the DOM marker (.fm-marker, which still draws the selected marker),
 *   so a frame only copies small squares;
 * - a grid over the picture: a view draws, and a click searches, only the cells it covers;
 * - two ways to copy the sprites: WebGL, where a frame costs a few calls whatever the number of markers (a 2D
 *   canvas spends about a microsecond per drawImage, too much for thousands of markers in a frame), and the 2D
 *   canvas where WebGL is missing;
 * - hover: the marker under the mouse is drawn on top, gets the ring of .fm-marker:hover (a DOM element over the
 *   canvas) and a tooltip with its name.
 */

export interface View { x: number; y: number; s: number }
export interface Box { w: number; h: number }
/** what the engine knows of the view: the view, its size and the picture's natural size */
export interface ViewState { view: View; box: Box; iw: number; ih: number }

/** below this zoom (relative to the whole picture) the other source's markers are plain dots: hundreds of icons would
 *  cover the map */
export const DOTS_BELOW = 2.5;
/** a click takes the nearest marker this close to it (CSS px); a finger is less exact than a mouse */
export const HIT = { mouse: 14, touch: 20 };

/** the grid: GRID × GRID cells over the picture */
const GRID = 64;
const CELLS = GRID * GRID;
/** draw order, bottom to top: the other source's spots found and not yet found, the players' spots found and not yet
 *  found, the player's own drafts (a dimmed found marker never covers one still to find) */
const LAYERS = 5;
/** markers this close outside the view (CSS px) are drawn too: their edge reaches into it */
const MARGIN = 24;
/** the dark ring and icon colour of .fm-marker, the same on every group colour */
const INK = '#0b0f15';

/* the looks, after .fm-marker in styles.css (CSS px): a player's spot (larger on touch screens), a draft that is not
   on the map yet (dashed ring, on the surface colour, a little see-through), a spot of the other source (smaller),
   and that spot as a dot when zoomed out; then the same spot looks for a spot the player has found: dimmed, with a
   check badge (a dot is too small for one). `name` is the look of the hover ring (.fm-ring[data-look]). */
const SPOT = 0;
const DRAFT = 1;
const SRC = 2;
const DOT = 3;
const SPOT_FOUND = 4;
const SRC_FOUND = 5;
const DOT_FOUND = 6;
const LOOKS = 7;
const LOOK = [
  { name: 'spot', d: 28, touch: 32, border: 2, icon: 15, found: false },
  { name: 'draft', d: 28, touch: 32, border: 2, icon: 15, found: false },
  { name: 'src', d: 22, touch: 22, border: 1.5, icon: 12, found: false },
  { name: 'dot', d: 11, touch: 11, border: 1, icon: 0, found: false },
  { name: 'spot', d: 28, touch: 32, border: 2, icon: 15, found: true },
  { name: 'src', d: 22, touch: 22, border: 1.5, icon: 12, found: true },
  { name: 'dot', d: 11, touch: 11, border: 1, icon: 0, found: true },
];
/** zoomed out, the other source's spots are dots: the look each look turns into then */
const FAR_LOOK = [SPOT, DRAFT, DOT, DOT, SPOT_FOUND, DOT_FOUND, DOT_FOUND];
const DRAFT_ALPHA = 0.85;
/** a found spot steps back (drawn into its sprite, the badge stays at full strength) */
const FOUND_ALPHA = 0.45;
/** the check badge of a found spot (CSS px): its radius per look, its centre on the disc's lower right */
const BADGE_R = { [SPOT_FOUND]: 6, [SRC_FOUND]: 5 } as Record<number, number>;
const BADGE_AT = 0.7;
/** lucide's Check, in its 24 × 24 box */
const CHECK = 'M20 6 9 17l-5-5';
/** pick mode quiets the markers (.fm-surface.picking .fm-marker) */
const PICK_ALPHA = 0.5;
/** a sprite's square (CSS px): the largest marker and its shadow */
const CELL = 48;
/** how far a marker's shadow reaches past its edge (CSS px): 5 px blur and 1 px down, to where it fades out */
const SHADOW = 8;
const ATLAS_COLS = 8;
/** the selected marker's DOM button is drawn this much larger (.fm-marker.on) */
const SELECTED_SCALE = 1.3;
/** the button's larger hit area around its badge (.fm-marker::before) */
const BUTTON_PAD = { mouse: 6, touch: 5 };

/** a look's radius on screen (CSS px) */
const radiusOf = (look: number, touch: boolean) => (touch ? LOOK[look].touch : LOOK[look].d) / 2;

const CAT_INDEX = new Map(CATEGORIES.map((c, i) => [c.id, i]));
/** a category the rules do not know draws as "other" (the pin under Places, as farmIcons and the filters show it) */
const OTHER = CAT_INDEX.get('other') ?? 0;

const spriteOf = (cat: number, look: number) => cat * LOOKS + look;
const lookOf = (sprite: number) => sprite % LOOKS;
/** the sprite at a zoom: the other source's spots are dots when zoomed out */
const spriteAt = (sprite: number, far: boolean) => (far ? sprite - lookOf(sprite) + FAR_LOOK[lookOf(sprite)] : sprite);

/* ---------- sprites ---------- */

/** What the sprites depend on: they are drawn again when one of these changes. */
interface Spec { key: string; dpr: number; touch: boolean; fill: string[]; paper: string; badge: string }

/**
 * The colours as the CSS has them now (a probe resolves the tokens, also nested ones), the pixel ratio and the touch
 * size. The app has one dark theme (:root in styles.css); a theme switch would change these values and so the key.
 */
function readSpec(el: HTMLElement): Spec {
  const probe = document.createElement('i');
  probe.hidden = true;
  el.appendChild(probe);
  const css = (value: string) => {
    probe.style.color = value;
    return getComputedStyle(probe).color;
  };
  const group = Object.fromEntries(CATEGORY_GROUPS.map((g) => [g, css(GROUP_COLOR[g])])) as Record<CategoryGroup, string>;
  const paper = css('var(--surface-solid)');
  // the badge of .fm-check: light on every group colour
  const badge = css('var(--text-strong)');
  probe.remove();
  const dpr = window.devicePixelRatio || 1;
  const touch = matches(MQ.coarse);
  return {
    key: [dpr, touch, paper, badge, ...CATEGORY_GROUPS.map((g) => group[g])].join('|'),
    dpr,
    touch,
    fill: CATEGORIES.map((c) => group[c.group]),
    paper,
    badge,
  };
}

interface Atlas {
  key: string;
  canvas: HTMLCanvasElement;
  dpr: number;
  /** a sprite's square in device pixels: even, so a sprite's centre falls on a whole pixel */
  cell: number;
  rows: number;
  /** per look, half the square a sprite really covers (device pixels, whole): an 11 px dot does not need the cell of
   *  a 32 px spot, and every pixel copied is blended (thousands of markers make that the GPU's main cost) */
  half: number[];
  /** counts the times the canvas was drawn on (the icons arrive later): WebGL uploads it again */
  version: number;
}

/** The circle of one sprite. */
function disc(ctx: CanvasRenderingContext2D, x: number, y: number, look: number, spec: Spec, fc: string) {
  const { border } = LOOK[look];
  const r = radiusOf(look, spec.touch);
  const draft = look === DRAFT;
  ctx.save();
  // box-shadow: 0 1px 5px rgba(0, 0, 0, .6); shadows ignore the transform, so they are given in device pixels
  ctx.shadowColor = 'rgba(0, 0, 0, .6)';
  ctx.shadowBlur = 5 * spec.dpr;
  ctx.shadowOffsetY = spec.dpr;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = draft ? spec.paper : fc;
  ctx.fill();
  ctx.restore();
  // a CSS border lies inside the box
  const rr = r - border / 2;
  ctx.beginPath();
  ctx.arc(x, y, rr, 0, Math.PI * 2);
  ctx.lineWidth = border;
  ctx.strokeStyle = draft ? fc : INK;
  if (draft) {
    // dashes that close up evenly around the circle
    const len = 2 * Math.PI * rr;
    const step = len / Math.round(len / 7);
    ctx.setLineDash([step * 0.6, step * 0.4]);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

/** the centre of sprite i in the atlas, CSS px */
const centreOf = (a: Atlas, i: number): [number, number] => {
  const u = a.cell / a.dpr;
  return [((i % ATLAS_COLS) + 0.5) * u, (Math.floor(i / ATLAS_COLS) + 0.5) * u];
};

/** The check badge of a found spot over the disc's lower right, as .fm-check draws it on the selected marker. */
function badge(ctx: CanvasRenderingContext2D, x: number, y: number, look: number, spec: Spec) {
  const br = BADGE_R[look];
  if (!br) return;
  const at = radiusOf(look, spec.touch) * BADGE_AT;
  const bx = x + at;
  const by = y + at;
  ctx.save();
  ctx.beginPath();
  ctx.arc(bx, by, br, 0, Math.PI * 2);
  ctx.fillStyle = spec.badge;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = INK;
  ctx.stroke();
  // the check fills most of the badge; its stroke is set in the 24 px box, so it is thick there
  const k = (br * 1.5) / 24;
  ctx.translate(bx - 12 * k, by - 12 * k);
  ctx.scale(k, k);
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke(new Path2D(CHECK));
  ctx.restore();
}

/**
 * One sprite: the disc, its icon once the shapes are there (stroked like lucide draws them: 2.25 in a 24 px box, round
 * ends) and, for a found look, the whole of it dimmed and the badge on top at full strength.
 */
function drawSprite(ctx: CanvasRenderingContext2D, a: Atlas, spec: Spec, ci: number, look: number, icons: Path2D[] | null) {
  const [x, y] = centreOf(a, spriteOf(ci, look));
  disc(ctx, x, y, look, spec, spec.fill[ci]);
  const size = LOOK[look].icon;
  if (size && icons) {
    ctx.save();
    ctx.translate(x - size / 2, y - size / 2);
    ctx.scale(size / 24, size / 24);
    ctx.lineWidth = 2.25;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // .fm-marker draws the icon in the ring colour, a draft in its group colour
    ctx.strokeStyle = look === DRAFT ? spec.fill[ci] : INK;
    for (const p of icons) ctx.stroke(p);
    ctx.restore();
  }
  if (!LOOK[look].found) return;
  // destination-in keeps FOUND_ALPHA of what is there (disc, icon and shadow alike); the clip keeps it to this
  // sprite's square, as the operation would otherwise clear the rest of the atlas
  const u = a.cell / a.dpr;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x - u / 2, y - u / 2, u, u);
  ctx.clip();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = `rgba(0, 0, 0, ${FOUND_ALPHA})`;
  ctx.fillRect(x - u / 2, y - u / 2, u, u);
  ctx.restore();
  badge(ctx, x, y, look, spec);
}

/** Draws every sprite of the atlas anew: the discs alone, or with their icons once the shapes are loaded. */
function paintAtlas(a: Atlas, spec: Spec, icons: Map<string, Path2D[]> | null) {
  const ctx = a.canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, a.canvas.width, a.canvas.height);
  ctx.setTransform(spec.dpr, 0, 0, spec.dpr, 0, 0);
  CATEGORIES.forEach((c, ci) => {
    const shapes = icons ? icons.get(c.id) ?? [] : null;
    for (let look = 0; look < LOOKS; look++) drawSprite(ctx, a, spec, ci, look, shapes);
  });
}

function drawDiscs(spec: Spec): Atlas {
  const cell = 2 * Math.ceil((CELL / 2) * spec.dpr);
  const rows = Math.ceil((CATEGORIES.length * LOOKS) / ATLAS_COLS);
  const canvas = document.createElement('canvas');
  canvas.width = ATLAS_COLS * cell;
  canvas.height = rows * cell;
  const half = LOOK.map((_, look) => Math.min(cell / 2, Math.ceil((radiusOf(look, spec.touch) + SHADOW) * spec.dpr)));
  const a: Atlas = { key: spec.key, canvas, dpr: spec.dpr, cell, rows, half, version: 1 };
  paintAtlas(a, spec, null);
  return a;
}

/** A shape of a lucide icon as a canvas path: the icons draw with path, circle, ellipse, rect, line, polyline and polygon. */
function toPath(el: Element): Path2D | null {
  const n = (name: string) => Number(el.getAttribute(name)) || 0;
  const p = new Path2D();
  switch (el.tagName.toLowerCase()) {
    case 'path':
      return new Path2D(el.getAttribute('d') ?? '');
    case 'circle':
      p.arc(n('cx'), n('cy'), n('r'), 0, Math.PI * 2);
      return p;
    case 'ellipse':
      p.ellipse(n('cx'), n('cy'), n('rx'), n('ry'), 0, 0, Math.PI * 2);
      return p;
    case 'rect': {
      const [x, y, w, h] = [n('x'), n('y'), n('width'), n('height')];
      const r = Math.min(n('rx') || n('ry'), w / 2, h / 2);
      p.moveTo(x + r, y);
      p.arcTo(x + w, y, x + w, y + h, r);
      p.arcTo(x + w, y + h, x, y + h, r);
      p.arcTo(x, y + h, x, y, r);
      p.arcTo(x, y, x + w, y, r);
      p.closePath();
      return p;
    }
    case 'line':
      p.moveTo(n('x1'), n('y1'));
      p.lineTo(n('x2'), n('y2'));
      return p;
    case 'polyline':
    case 'polygon': {
      const pts = (el.getAttribute('points') ?? '').trim().split(/[\s,]+/).map(Number);
      for (let i = 0; i + 1 < pts.length; i += 2) {
        if (i) p.lineTo(pts[i], pts[i + 1]);
        else p.moveTo(pts[i], pts[i + 1]);
      }
      if (el.tagName.toLowerCase() === 'polygon') p.closePath();
      return p;
    }
    default:
      return null;
  }
}

/** each category's icon as canvas paths in lucide's 24 × 24 box, once known */
let shapes: Map<string, Path2D[]> | null = null;
let shapesLoading: Promise<Map<string, Path2D[]>> | null = null;
/**
 * The category icons (the lucide icons of farmIcons), rendered once by React into a detached element and read back
 * as paths: no server renderer in the bundle, and no SVG image, which some browsers would not let WebGL read.
 */
function loadShapes(): Promise<Map<string, Path2D[]>> {
  shapesLoading ??= new Promise((resolve) => {
    const root = createRoot(document.createElement('div'));
    const read = (el: HTMLDivElement | null) => {
      if (!el) return;
      const out = new Map<string, Path2D[]>();
      // one <svg> per category, in the order of CATEGORIES
      el.querySelectorAll('svg').forEach((svg, i) => {
        out.set(CATEGORIES[i]?.id ?? '', [...svg.children].map(toPath).filter((x): x is Path2D => !!x));
      });
      shapes = out;
      resolve(out);
      // not while React is still committing this root
      setTimeout(() => root.unmount());
    };
    root.render(createElement('div', { ref: read }, CATEGORIES.map((c) => createElement(categoryIcon(c.id), { key: c.id }))));
  });
  return shapesLoading;
}

/** The sprites again with their icons (a found sprite is dimmed as a whole, so it cannot just get its icon on top). */
function drawIcons(a: Atlas, spec: Spec, icons: Map<string, Path2D[]>) {
  paintAtlas(a, spec, icons);
  a.version++;
}

/** the sprites of the last spec, shared by every map (a region switch mounts a new one) */
let cached: { atlas: Atlas; icons: Promise<void> } | null = null;
function atlasFor(spec: Spec) {
  if (cached?.atlas.key !== spec.key) {
    const atlas = drawDiscs(spec);
    let icons: Promise<void>;
    if (shapes) {
      drawIcons(atlas, spec, shapes);
      icons = Promise.resolve();
    } else {
      // the first time: discs now, icons a moment later
      icons = loadShapes().then((s) => drawIcons(atlas, spec, s));
    }
    cached = { atlas, icons };
  }
  return cached;
}

/**
 * Calls back when the sprites may need drawing again: another pixel ratio (browser zoom, another screen), touch sizes,
 * or a colour change. The app has no theme switch yet; one would follow the system scheme or set a class or data
 * attribute on <html>, so those are watched (the callback compares the values, a false alarm costs nothing).
 */
function watchSprites(cb: () => void): () => void {
  const offs: (() => void)[] = [];
  const listen = (query: string) => {
    const m = window.matchMedia?.(query);
    if (!m) return;
    m.addEventListener('change', cb);
    offs.push(() => m.removeEventListener('change', cb));
  };
  // a query for the current pixel ratio stops matching when it changes; it is asked again for the new one
  let offDpr = () => {};
  const watchDpr = () => {
    offDpr();
    const m = window.matchMedia?.(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    if (!m) return;
    const on = () => {
      watchDpr();
      cb();
    };
    m.addEventListener('change', on);
    offDpr = () => m.removeEventListener('change', on);
  };
  watchDpr();
  listen(MQ.coarse);
  listen('(prefers-color-scheme: dark)');
  listen('(prefers-contrast: more)');
  const mo = typeof MutationObserver === 'undefined' ? null : new MutationObserver(cb);
  mo?.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  return () => {
    offDpr();
    offs.forEach((off) => off());
    mo?.disconnect();
  };
}

/* ---------- the grid ---------- */

/** The markers ready to draw: positions and sprites in flat arrays, sorted into the grid. */
export interface MarkerSet {
  list: MapMarker[];
  /** position as fractions of the picture */
  x: Float64Array;
  y: Float64Array;
  /** category × LOOKS + look */
  sprite: Uint16Array;
  /** the markers of layer l in cell c are items[start[k] .. start[k + 1]), k = l × CELLS + c: by layer, then by cell */
  start: Uint32Array;
  items: Uint32Array;
  /** where each marker sits in items (the hovered one is drawn again from there) */
  slot: Uint32Array;
  byId: Map<string, number>;
}

const cellOf = (f: number) => Math.min(GRID - 1, Math.max(0, Math.floor(f * GRID)));

/** Sorts the markers into the grid (a counting sort: two passes, no per-cell arrays). */
export function buildSet(list: MapMarker[]): MarkerSet {
  const n = list.length;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const sprite = new Uint16Array(n);
  const key = new Uint32Array(n);
  const start = new Uint32Array(LAYERS * CELLS + 1);
  const byId = new Map<string, number>();
  list.forEach((m, i) => {
    x[i] = m.pos[0];
    y[i] = m.pos[1];
    // a draft is the player's own and never counts as found
    const look = m.pending ? DRAFT : m.source ? (m.found ? SRC_FOUND : SRC) : m.found ? SPOT_FOUND : SPOT;
    const layer = m.pending ? LAYERS - 1 : (m.source ? 0 : 2) + (m.found ? 0 : 1);
    sprite[i] = spriteOf(CAT_INDEX.get(m.cat) ?? OTHER, look);
    const k = layer * CELLS + cellOf(y[i]) * GRID + cellOf(x[i]);
    key[i] = k;
    start[k + 1]++;
    byId.set(m.id, i);
  });
  for (let k = 1; k < start.length; k++) start[k] += start[k - 1];
  const items = new Uint32Array(n);
  const slot = new Uint32Array(n);
  const next = start.slice(0, -1);
  for (let i = 0; i < n; i++) {
    const j = next[key[i]]++;
    items[j] = i;
    slot[i] = j;
  }
  return { list, x, y, sprite, start, items, slot, byId };
}

const EMPTY_SET = buildSet([]);

/* ---------- drawing ---------- */

/** One frame for a renderer, in device pixels. */
interface Frame {
  w: number;
  h: number;
  /** the picture's top left and size on the canvas */
  ox: number;
  oy: number;
  sx: number;
  sy: number;
  /** the screen's pixel ratio over the atlas's (not 1 only until the sprites are drawn again) */
  k: number;
  far: boolean;
  dim: boolean;
  /** the selected marker, drawn by its DOM button (-1: none) */
  skip: number;
  /** the parts of set.items in view, as [first, end) pairs */
  ranges: number[];
  /** the hovered marker (-1: none): left out of its place and drawn last, on top */
  hover: number;
  /** DEV benchmark: wait for the GPU, so the time measured includes its work */
  sync: boolean;
}

interface Renderer {
  canvas: HTMLCanvasElement;
  /** draws the frame, returns the number of markers it drew */
  draw(f: Frame, set: MarkerSet, atlas: Atlas): number;
  dispose(): void;
}

/** the top left of sprite s in the atlas (device pixels) */
const cornerOf = (a: Atlas, s: number): [number, number] => [(s % ATLAS_COLS) * a.cell, Math.floor(s / ATLAS_COLS) * a.cell];

/** The 2D canvas: one drawImage per marker. */
function create2d(canvas: HTMLCanvasElement): Renderer | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  return {
    canvas,
    draw(f, set, a) {
      ctx.clearRect(0, 0, f.w, f.h);
      // the culling below uses the largest sprite
      const half = (a.cell / 2) * f.k;
      ctx.imageSmoothingEnabled = f.k !== 1;
      const blit = (i: number, px: number, py: number) => {
        const s = spriteAt(set.sprite[i], f.far);
        const look = lookOf(s);
        // only the part of the cell the sprite covers, around the cell's centre
        const h = a.half[look];
        const [cx, cy] = cornerOf(a, s);
        const hk = h * f.k;
        ctx.globalAlpha = f.dim ? PICK_ALPHA : look === DRAFT ? DRAFT_ALPHA : 1;
        ctx.drawImage(a.canvas, cx + a.cell / 2 - h, cy + a.cell / 2 - h, 2 * h, 2 * h, Math.round(px - hk), Math.round(py - hk), 2 * hk, 2 * hk);
      };
      let drawn = 0;
      for (let r = 0; r < f.ranges.length; r += 2) {
        for (let j = f.ranges[r]; j < f.ranges[r + 1]; j++) {
          const i = set.items[j];
          if (i === f.skip || i === f.hover) continue;
          const px = f.ox + set.x[i] * f.sx;
          const py = f.oy + set.y[i] * f.sy;
          if (px < -half || py < -half || px > f.w + half || py > f.h + half) continue;
          blit(i, px, py);
          drawn++;
        }
      }
      if (f.hover >= 0) blit(f.hover, f.ox + set.x[f.hover] * f.sx, f.oy + set.y[f.hover] * f.sy);
      ctx.globalAlpha = 1;
      return drawn;
    },
    dispose() {},
  };
}

/* WebGL: every marker is a square of two triangles in one buffer that only changes with the markers; a frame sets the
   view as uniforms and draws the visible parts of the buffer. Squares on whole device pixels with the atlas's pixel
   size copy the sprites 1:1, as the 2D canvas does; each look's square is only as large as its sprite (Atlas.half).
   The selected marker (its DOM button draws it) and the hovered one (drawn last, on top) are moved out of the view. */
const VERTEX = `
attribute vec2 a_corner;
attribute vec2 a_pos;
attribute vec4 a_meta;
uniform vec2 u_origin;
uniform vec2 u_scale;
uniform vec2 u_canvas;
uniform float u_k;
uniform float u_half[${LOOKS}];
uniform float u_cell;
uniform vec2 u_size;
uniform float u_far;
uniform float u_skip;
uniform float u_hover;
varying vec2 v_uv;
varying float v_alpha;
void main() {
  if (abs(a_meta.w - u_skip) < 0.5 || abs(a_meta.w - u_hover) < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  float s = u_far > 0.5 ? a_meta.y : a_meta.x;
  float hs = u_half[int(mod(s, ${LOOKS}.0) + 0.5)];
  vec2 off = (a_corner * 2.0 - 1.0) * hs;
  vec2 p = floor(u_origin + a_pos * u_scale + 0.5) + off * u_k;
  gl_Position = vec4(p.x / u_canvas.x * 2.0 - 1.0, 1.0 - p.y / u_canvas.y * 2.0, 0.0, 1.0);
  float cols = ${ATLAS_COLS}.0;
  v_uv = ((vec2(mod(s, cols), floor(s / cols)) + 0.5) * u_cell + off) / u_size;
  v_alpha = a_meta.z;
}`;
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D u_atlas;
uniform float u_dim;
varying vec2 v_uv;
varying float v_alpha;
void main() {
  gl_FragColor = texture2D(u_atlas, v_uv) * (u_dim > 0.0 ? u_dim : v_alpha);
}`;
/** per vertex: corner (2), position (2), sprite, far sprite, alpha, marker index */
const FLOATS = 8;
const CORNERS = [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];

/** the vertices of every marker in the order of set.items (by layer, then by cell), so a run of items is a run here */
function vertices(set: MarkerSet): Float32Array {
  const out = new Float32Array(set.items.length * 6 * FLOATS);
  let o = 0;
  for (const i of set.items) {
    const s = set.sprite[i];
    const far = spriteAt(s, true);
    const alpha = lookOf(s) === DRAFT ? DRAFT_ALPHA : 1;
    for (let v = 0; v < 12; v += 2) {
      out[o] = CORNERS[v];
      out[o + 1] = CORNERS[v + 1];
      out[o + 2] = set.x[i];
      out[o + 3] = set.y[i];
      out[o + 4] = s;
      out[o + 5] = far;
      out[o + 6] = alpha;
      out[o + 7] = i;
      o += FLOATS;
    }
  }
  return out;
}

function createGl(canvas: HTMLCanvasElement, onRestored: () => void): Renderer | null {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) return null;

  const init = () => {
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error('no shader');
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
      return s;
    };
    const prog = gl.createProgram();
    if (!prog) throw new Error('no program');
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
    gl.useProgram(prog);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const attr = (name: string, size: number, offset: number) => {
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, FLOATS * 4, offset * 4);
    };
    attr('a_corner', 2, 0);
    attr('a_pos', 2, 2);
    attr('a_meta', 4, 4);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // the 2D atlas holds premultiplied colours: taken as they are, and blended as such
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const u = (name: string) => gl.getUniformLocation(prog, name);
    return {
      origin: u('u_origin'), scale: u('u_scale'), canvas: u('u_canvas'), k: u('u_k'), half: u('u_half'), cell: u('u_cell'),
      atlasSize: u('u_size'), far: u('u_far'), skip: u('u_skip'), hover: u('u_hover'), dim: u('u_dim'),
      /** a pixel read back by the DEV benchmark */
      pixel: new Uint8Array(4),
      /** what the GPU holds: uploaded again when they change */
      set: null as MarkerSet | null,
      atlas: null as Atlas | null,
      version: 0,
    };
  };

  let res: ReturnType<typeof init> | null = init();
  // the GPU can drop the context (driver reset, too many contexts): nothing is drawn until it is back
  const onLost = (e: Event) => {
    e.preventDefault();
    res = null;
  };
  const onBack = () => {
    try {
      res = init();
    } catch (err) {
      console.warn('farm map: WebGL could not start again', err);
    }
    onRestored();
  };
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onBack);

  return {
    canvas,
    draw(f, set, a) {
      gl.viewport(0, 0, f.w, f.h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const r = res;
      if (!r || gl.isContextLost()) return 0;
      if (r.set !== set) {
        gl.bufferData(gl.ARRAY_BUFFER, vertices(set), gl.STATIC_DRAW);
        r.set = set;
      }
      if (r.atlas !== a || r.version !== a.version) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, a.canvas);
        r.atlas = a;
        r.version = a.version;
      }
      gl.uniform2f(r.origin, f.ox, f.oy);
      gl.uniform2f(r.scale, f.sx, f.sy);
      gl.uniform2f(r.canvas, f.w, f.h);
      gl.uniform1f(r.k, f.k);
      gl.uniform1fv(r.half, a.half);
      gl.uniform1f(r.cell, a.cell);
      gl.uniform2f(r.atlasSize, ATLAS_COLS * a.cell, a.rows * a.cell);
      gl.uniform1f(r.far, f.far ? 1 : 0);
      gl.uniform1f(r.skip, f.skip);
      gl.uniform1f(r.hover, f.hover);
      gl.uniform1f(r.dim, f.dim ? PICK_ALPHA : 0);
      let drawn = 0;
      for (let k = 0; k < f.ranges.length; k += 2) {
        const first = f.ranges[k];
        const count = f.ranges[k + 1] - first;
        gl.drawArrays(gl.TRIANGLES, first * 6, count * 6);
        drawn += count;
      }
      if (f.hover >= 0) {
        gl.uniform1f(r.hover, -1);
        gl.drawArrays(gl.TRIANGLES, set.slot[f.hover] * 6, 6);
      }
      // the calls above only queue the work; reading a pixel waits until the GPU has done it
      if (f.sync) gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, r.pixel);
      return drawn;
    },
    dispose() {
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onBack);
      // the canvas is dropped with it: free the context now, browsers allow only a few at a time
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}

/* ---------- the layer ---------- */

/** The DEV benchmark's counters (farmBench): drawing and hit tests since it last logged them. */
export interface DrawStats { frames: number; ms: number; max: number; drawn: number; hits: number; hitMs: number }

export interface Refs {
  /** the element the canvas goes into (the layer makes the canvas: a failed WebGL start needs a fresh one) */
  host: RefObject<HTMLDivElement>;
  /** the ring of the hovered marker, in the layer above the canvas */
  ring: RefObject<HTMLSpanElement>;
  /** the tooltip, in the map's frame next to the surface (see placeTip) */
  tip: RefObject<HTMLDivElement>;
  surface: RefObject<HTMLDivElement>;
}

/** the mouse over the view (CSS px) */
export interface Mouse { x: number; y: number }

export function createMarkerLayer(refs: Refs) {
  const st = {
    set: EMPTY_SET,
    atlas: null as Atlas | null,
    renderer: null as Renderer | null,
    /** the canvas as laid out: CSS px (fractions included) and its backing store in device pixels */
    size: { cw: 0, ch: 0, w: 0, h: 0 },
    touch: false,
    /** the markers of the other source are dots (as last drawn) */
    far: false,
    /** the selected marker: its DOM button draws it */
    skip: -1,
    picking: false,
    mouse: null as Mouse | null,
    hover: -1,
    /** what the ring and the tooltip show now: marker and look */
    ringFor: -1,
    ringLook: -1,
    tipFor: -1,
    tipW: 0,
    tipH: 0,
    /** the surface's border: the tooltip's origin lies outside it */
    tipX: 0,
    tipY: 0,
    ranges: [] as number[],
    stats: null as DrawStats | null,
  };

  const update = (set: MarkerSet, selected: string | null, picking: boolean) => {
    if (set !== st.set) {
      // the indices point into the old list; the next hover check finds the marker under the mouse again, so the
      // pointer cursor goes with the old one
      st.hover = -1;
      st.ringFor = -1;
      st.tipFor = -1;
      refs.surface.current?.removeAttribute('data-hover');
    }
    st.set = set;
    st.skip = selected ? set.byId.get(selected) ?? -1 : -1;
    st.picking = picking;
  };

  /** the cells a rectangle of fractions covers */
  const cells = (x0: number, x1: number, y0: number, y1: number) => [cellOf(x0), cellOf(x1), cellOf(y0), cellOf(y1)];

  /**
   * The marker at the view point (px, py), or -1: the topmost marker whose drawn disc holds the point, as the eye sees
   * it (the hovered one lies on top of all), else the nearest centre within r CSS px (a dot is small, a finger is not
   * exact). The selected marker is not on the canvas: its DOM button takes its own clicks.
   */
  const markerAt = (vs: ViewState, px: number, py: number, r: number) => {
    const t0 = st.stats ? performance.now() : 0;
    const { set, far, touch, skip, hover } = st;
    const { view: v, iw, ih } = vs;
    const sx = v.s * iw;
    const sy = v.s * ih;
    const fx = (px - v.x) / sx;
    const fy = (py - v.y) / sy;
    // the search covers the largest disc as well
    const reach = Math.max(r, radiusOf(SPOT, touch));
    const [cx0, cx1, cy0, cy1] = cells(fx - reach / sx, fx + reach / sx, fy - reach / sy, fy + reach / sy);
    let best = -1;
    let bestD = r * r;
    let top = -1;
    let onHover = false;
    // in drawing order: by layer, then as the items lie (a run of cells is a run of items), so a later disc is on top
    for (let l = 0; l < LAYERS; l++) {
      for (let cy = cy0; cy <= cy1; cy++) {
        // the cells of a row lie next to each other in items
        const row = l * CELLS + cy * GRID;
        for (let j = set.start[row + cx0], end = set.start[row + cx1 + 1]; j < end; j++) {
          const i = set.items[j];
          const dx = (set.x[i] - fx) * sx;
          const dy = (set.y[i] - fy) * sy;
          const d = dx * dx + dy * dy;
          if (i !== skip) {
            const rr = radiusOf(lookOf(spriteAt(set.sprite[i], far)), touch);
            if (d <= rr * rr) {
              top = i;
              if (i === hover) onHover = true;
            }
          }
          if (d <= bestD) {
            bestD = d;
            best = i;
          }
        }
      }
    }
    if (st.stats) {
      st.stats.hits++;
      st.stats.hitMs += performance.now() - t0;
    }
    return onHover ? hover : top >= 0 ? top : best;
  };

  /** whether the view point (px, py) is on the selected marker's DOM button (its larger hit area included) */
  const onSelected = (vs: ViewState, px: number, py: number) => {
    const i = st.skip;
    if (i < 0) return false;
    const { view: v, iw, ih } = vs;
    const dx = v.x + st.set.x[i] * v.s * iw - px;
    const dy = v.y + st.set.y[i] * v.s * ih - py;
    // the button keeps its icon zoomed out: never the dot
    const r = (radiusOf(lookOf(st.set.sprite[i]), st.touch) + (st.touch ? BUTTON_PAD.touch : BUTTON_PAD.mouse)) * SELECTED_SCALE;
    return dx * dx + dy * dy <= r * r;
  };

  /** the id of the marker a click at the view point (px, py) hits, or null */
  const hit = (vs: ViewState, px: number, py: number, r: number) => {
    const i = markerAt(vs, px, py, r);
    return i < 0 ? null : st.set.list[i].id;
  };

  /**
   * The marker under the mouse (none while placing a spot, dragging or without a mouse); true when it changed. Found
   * from the position each time, the selected marker's button too: the view also moves under a resting mouse.
   */
  const updateHover = (vs: ViewState) => {
    const m = st.mouse;
    const i = !m || st.picking ? -1 : onSelected(vs, m.x, m.y) ? st.skip : markerAt(vs, m.x, m.y, HIT.mouse);
    if (i === st.hover) return false;
    st.hover = i;
    refs.surface.current?.toggleAttribute('data-hover', i >= 0);
    return true;
  };

  const setMouse = (m: Mouse | null) => { st.mouse = m; };

  /** the hovered marker's ring (the selected marker's button has its own :hover) */
  const placeRing = (far: boolean) => {
    const ring = refs.ring.current;
    if (!ring) return;
    const i = st.hover >= 0 && st.hover !== st.skip ? st.hover : -1;
    const look = i < 0 ? -1 : lookOf(spriteAt(st.set.sprite[i], far));
    if (i === st.ringFor && look === st.ringLook) return;
    st.ringFor = i;
    st.ringLook = look;
    ring.hidden = i < 0;
    if (i < 0) return;
    const m = st.set.list[i];
    ring.style.left = `${st.set.x[i] * 100}%`;
    ring.style.top = `${st.set.y[i] * 100}%`;
    ring.style.setProperty('--fc', GROUP_COLOR[categoryById(m.cat)?.group ?? 'place']);
    ring.dataset.look = LOOK[look].name;
  };

  /**
   * The tooltip over the hovered marker, or below it at the top edge, inside the view. It sits in the frame, not in
   * the surface (which isolates its children), so it lies over the zoom buttons instead of under them.
   */
  const placeTip = (vs: ViewState, far: boolean) => {
    const tip = refs.tip.current;
    if (!tip) return;
    const i = st.hover;
    if (i < 0) {
      tip.hidden = true;
      st.tipFor = -1;
      return;
    }
    if (st.tipFor !== i) {
      tip.textContent = st.set.list[i].label;
      tip.hidden = false;
      // the layout is read here anyway (the new label's size), not once per frame
      st.tipW = tip.offsetWidth;
      st.tipH = tip.offsetHeight;
      st.tipX = refs.surface.current?.clientLeft ?? 0;
      st.tipY = refs.surface.current?.clientTop ?? 0;
      st.tipFor = i;
    }
    const { view: v, box, iw, ih } = vs;
    const px = v.x + st.set.x[i] * v.s * iw;
    const py = v.y + st.set.y[i] * v.s * ih;
    const look = lookOf(spriteAt(st.set.sprite[i], far && i !== st.skip));
    const r = radiusOf(look, st.touch) * (i === st.skip ? SELECTED_SCALE : 1);
    const left = Math.max(4, Math.min(px - st.tipW / 2, box.w - st.tipW - 4));
    const above = py - r - 6 - st.tipH;
    const top = above >= 4 ? above : py + r + 6;
    tip.style.transform = `translate(${Math.round(left + st.tipX)}px, ${Math.round(top + st.tipY)}px)`;
  };

  /** the parts of set.items in view (plus the margin): per layer and grid row one run, joined where they touch */
  const visible = (vs: ViewState) => {
    const { view: v, box, iw, ih } = vs;
    const sx = v.s * iw;
    const sy = v.s * ih;
    const [cx0, cx1, cy0, cy1] = cells((-MARGIN - v.x) / sx, (box.w + MARGIN - v.x) / sx, (-MARGIN - v.y) / sy, (box.h + MARGIN - v.y) / sy);
    const { start } = st.set;
    const out = st.ranges;
    out.length = 0;
    for (let l = 0; l < LAYERS; l++) {
      for (let cy = cy0; cy <= cy1; cy++) {
        const row = l * CELLS + cy * GRID;
        const a = start[row + cx0];
        const b = start[row + cx1 + 1];
        if (a === b) continue;
        if (out.length && out[out.length - 1] === a) out[out.length - 1] = b;
        else out.push(a, b);
      }
    }
    return out;
  };

  /** Draws the markers for the view (rel: zoom relative to the whole picture). */
  const draw = (vs: ViewState, rel: number) => {
    const t0 = performance.now();
    const far = rel < DOTS_BELOW;
    st.far = far;
    // the view moved under the resting mouse (wheel, keys, an animation)
    updateHover(vs);
    placeRing(far);
    placeTip(vs, far);
    const ren = st.renderer;
    const a = st.atlas;
    if (!ren) return;
    const { view: v, iw, ih } = vs;
    const { w, h, cw, ch } = st.size;
    // a new size clears the canvas
    if (ren.canvas.width !== w || ren.canvas.height !== h) {
      ren.canvas.width = w;
      ren.canvas.height = h;
    }
    if (!a || !w || !h || !cw || !ch) return;
    // CSS px to backing pixels: the pixel ratio, adjusted for a box that does not end on a whole device pixel
    const kx = w / cw;
    const ky = h / ch;
    // the sprites follow the backing store: device emulation reports a pixel ratio of 2 or 3 while the device box (and
    // so the canvas) keeps the real screen's pixels, and sprites scaled by the reported ratio came out 2-3 times too big.
    // Otherwise the backing store matches the ratio and the sprites are drawn 1:1, unscaled and sharp.
    const dpr = window.devicePixelRatio || 1;
    const k = (Math.abs(kx - dpr) > 0.02 * dpr ? kx : dpr) / a.dpr;
    const drawn = ren.draw({
      w, h, ox: v.x * kx, oy: v.y * ky, sx: v.s * iw * kx, sy: v.s * ih * ky, k, far,
      dim: st.picking, skip: st.skip, ranges: visible(vs), hover: st.hover !== st.skip ? st.hover : -1, sync: !!st.stats,
    }, st.set, a);
    const stats = st.stats;
    if (stats) {
      const ms = performance.now() - t0;
      stats.frames++;
      stats.ms += ms;
      stats.max = Math.max(stats.max, ms);
      stats.drawn += drawn;
    }
  };

  /** Draws the sprites for the colours and pixel ratio the page has now, if they changed. */
  const refreshSprites = (surface: HTMLElement, redraw: () => void) => {
    const spec = readSpec(surface);
    st.touch = spec.touch;
    if (st.atlas?.key === spec.key) return;
    const { atlas, icons } = atlasFor(spec);
    st.atlas = atlas;
    redraw();
    icons.then(() => { if (st.atlas === atlas) redraw(); });
  };

  /**
   * Keeps st.size to the canvas's real size. The backing store must cover exactly the device pixels the canvas spans,
   * else the browser stretches the whole canvas by a fraction of a pixel and blurs every sprite: the surface's height
   * comes from its aspect ratio, and a pixel ratio of 1.25 or 1.5 rarely makes whole pixels. Browsers that report the
   * device pixel box get it exactly; the others get the box times the pixel ratio, also after a change of the ratio.
   * Returns the cleanup.
   */
  const watchSize = (canvas: HTMLCanvasElement, redraw: () => void) => {
    let exact = false;
    const fromRect = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      st.size = { cw: r.width, ch: r.height, w: Math.round(r.width * dpr), h: Math.round(r.height * dpr) };
    };
    fromRect();
    if (typeof ResizeObserver === 'undefined') return { remeasure: fromRect, stop: () => {} };
    const ro = new ResizeObserver((entries) => {
      const e = entries[entries.length - 1];
      const dev = e.devicePixelContentBoxSize?.[0];
      const css = e.contentBoxSize?.[0];
      exact = !!dev && !!css;
      if (dev && css) st.size = { cw: css.inlineSize, ch: css.blockSize, w: dev.inlineSize, h: dev.blockSize };
      else fromRect();
      // after layout, before the browser paints: the new size shows in the same frame
      redraw();
    });
    try {
      ro.observe(canvas, { box: 'device-pixel-content-box' });
    } catch {
      ro.observe(canvas);
    }
    return { remeasure: () => { if (!exact) fromRect(); }, stop: () => ro.disconnect() };
  };

  /**
   * Makes the canvas (WebGL where it works, else 2D), draws the sprites and keeps them up to date; returns the
   * cleanup. redraw draws the current view again.
   */
  const mount = (redraw: () => void) => {
    const host = refs.host.current;
    const surface = refs.surface.current;
    if (!host || !surface) return () => {};
    const make = (gl: boolean): Renderer | null => {
      const canvas = document.createElement('canvas');
      host.appendChild(canvas);
      let ren: Renderer | null = null;
      try {
        ren = gl ? createGl(canvas, redraw) : create2d(canvas);
      } catch (err) {
        // a shader the driver refuses
        console.warn('farm map: WebGL failed, drawing in 2D', err);
      }
      if (ren) return ren;
      // a canvas keeps the kind of its first context: the 2D one needs a canvas of its own
      canvas.remove();
      return gl ? make(false) : null;
    };
    st.renderer = make(true);
    const size = st.renderer ? watchSize(st.renderer.canvas, redraw) : null;
    const refresh = () => {
      // another pixel ratio: also another backing store
      size?.remeasure();
      refreshSprites(surface, redraw);
    };
    refresh();
    const unwatch = watchSprites(refresh);
    return () => {
      unwatch();
      size?.stop();
      st.renderer?.dispose();
      st.renderer?.canvas.remove();
      st.renderer = null;
    };
  };

  return { st, update, hit, updateHover, setMouse, draw, mount };
}

export type MarkerLayer = ReturnType<typeof createMarkerLayer>;
