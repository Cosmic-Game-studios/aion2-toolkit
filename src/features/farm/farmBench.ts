import { readHash } from '../../lib/shareLink';
import { CATEGORIES } from './farmRules';
import type { DrawStats } from './farmCanvas';
import type { MapMarker } from './FarmMap';

/*
 * DEV only: a benchmark for the marker canvas. #/farm/<region>?bench=15000 adds that many synthetic markers to the map
 * (not to the list) and logs the drawing time every few seconds while the map is moved. With WebGL the time includes
 * the GPU's work (while the benchmark runs, each frame waits for it), so it shows a fill rate that is too low as well.
 * FarmMap calls this only under import.meta.env.DEV, so a production build leaves the module out.
 */

/** the most synthetic markers: enough to find the limit, not enough to hang the tab */
const MAX = 100_000;
const LOG_MS = 3000;

/** The number of synthetic markers an address asks for (0: none); the current one by default. */
export function benchCount(url?: string): number {
  const params = url === undefined ? readHash().params : new URLSearchParams(new URL(url).hash.split('?')[1] ?? '');
  const n = Number(params.get('bench'));
  return Number.isInteger(n) && n > 0 ? Math.min(n, MAX) : 0;
}

/** mulberry32: the same markers on every load, so runs compare */
function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** n markers over the whole picture in every category: mostly the other source's (dots when zoomed out), some players'
 *  spots and drafts, as a full region would have them */
export function benchMarkers(n: number): MapMarker[] {
  const rnd = random(n);
  const list: MapMarker[] = [];
  for (let i = 0; i < n; i++) {
    const r = rnd();
    const pos: [number, number] = [Math.round(rnd() * 10000) / 10000, Math.round(rnd() * 10000) / 10000];
    list.push({
      id: `bench-${i}`, pos, cat: CATEGORIES[i % CATEGORIES.length].id, label: `Bench ${i + 1}`,
      source: r < 0.85 || undefined, pending: r > 0.97 || undefined,
    });
  }
  return list;
}

/** Logs the averages of the layer's counters every few seconds (only when something was drawn or hit). */
export function logBench(st: { stats: DrawStats | null }, n: number): () => void {
  const fresh = (): DrawStats => ({ frames: 0, ms: 0, max: 0, drawn: 0, hits: 0, hitMs: 0 });
  st.stats = fresh();
  const id = window.setInterval(() => {
    const s = st.stats;
    if (!s || (!s.frames && !s.hits)) return;
    const draw = s.frames
      ? `${s.frames} frames, draw ${(s.ms / s.frames).toFixed(2)} ms avg / ${s.max.toFixed(2)} ms max, ${Math.round(s.drawn / s.frames)} markers per frame`
      : 'no frames';
    const hit = s.hits ? `hit test ${((s.hitMs / s.hits) * 1000).toFixed(1)} µs avg (${s.hits})` : 'no hit tests';
    console.info(`[farm bench] ${n} synthetic markers: ${draw}; ${hit}`);
    st.stats = fresh();
  }, LOG_MS);
  return () => {
    clearInterval(id);
    st.stats = null;
  };
}
