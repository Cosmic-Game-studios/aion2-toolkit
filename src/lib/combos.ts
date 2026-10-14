import type { Combo, ComboVia, GameData, Lang } from '../data/types';
import type { Build } from '../state/build';
import { activeSpecs, skillInBuild } from './buildCalc';

/** In-game names of the status effects used by the combo detection (EN key -> EN/DE label). */
const STATUS_NAMES: Record<string, { en: string; de: string }> = {
  'Knock Back': { en: 'Knock Back', de: 'Rückstoß' },
  Knockdown: { en: 'Knockdown', de: 'Niederschlag' },
  Airborne: { en: 'Airborne', de: 'Luftbann' },
  Stun: { en: 'Stun', de: 'Betäubung' },
  Root: { en: 'Root', de: 'Bann' },
  Slow: { en: 'Slow', de: 'Trägheit' },
  Seal: { en: 'Seal', de: 'Siegel' },
  Blind: { en: 'Blind', de: 'Blindheit' },
  Frost: { en: 'Frost', de: 'Einfrieren' },
  Fear: { en: 'Fear', de: 'Furcht' },
  Poison: { en: 'Poison', de: 'Vergiftung' },
  Curse: { en: 'Curse', de: 'Fluch' },
  'Fire Mark': { en: 'Fire Mark', de: 'Feuerzeichen' },
  Embers: { en: 'Embers', de: 'Glut' },
  'Debilitating Mark': { en: 'Debilitating Mark', de: 'Mal der Schwächung' },
  'Crimson Flames': { en: 'Crimson Flames', de: 'Rotglut' },
  Insignia: { en: 'Insignia', de: 'Glyphe' },
  Stagger: { en: 'Stagger', de: 'Benommenheit' },
  Impact: { en: 'Impact-type status', de: 'Schock-Status' },
};

export const statusName = (key: string, lang: Lang) => STATUS_NAMES[key]?.[lang] ?? key;

export type ComboKind = Combo['kind'];
export const COMBO_KINDS: ComboKind[] = ['status', 'ref', 'burst', 'chance'];

export const classCombos = (data: GameData, build: Build): Combo[] => data.combos.classes[build.c] ?? [];

/** Every skill id a combo mentions. */
export function comboSkillIds(c: Combo): number[] {
  switch (c.kind) {
    case 'status': return [...c.from.map((f) => f.id), ...c.to.map((t) => t.id)];
    case 'ref': return [c.from, c.to];
    default: return [c.from, ...c.to];
  }
}

/** true when the effect is available in the build: the skill is usable and, for a specialisation, it is active. */
export function viaReady(data: GameData, build: Build, id: number, via: ComboVia): boolean {
  const s = data.skillById.get(id);
  if (!s || !skillInBuild(build, s)) return false;
  if (via && 'part' in via) return activeSpecs(data, build, s).includes(via.part);
  return true;
}

const inBuild = (data: GameData, build: Build, id: number) => {
  const s = data.skillById.get(id);
  return !!s && skillInBuild(build, s);
};

/** A combo is ready when at least one setup and one payoff work in the build as it is now. */
export function comboReady(data: GameData, build: Build, c: Combo): boolean {
  switch (c.kind) {
    case 'status':
      return c.from.some((f) => viaReady(data, build, f.id, f.via)) && c.to.some((t) => viaReady(data, build, t.id, t.via));
    case 'ref':
      return viaReady(data, build, c.from, c.via) && inBuild(data, build, c.to);
    default:
      return inBuild(data, build, c.from) && c.to.some((id) => inBuild(data, build, id));
  }
}

/** true when every skill the combo needs at least partly comes from the build (used by the "only mine" filter). */
export function comboTouchesBuild(data: GameData, build: Build, c: Combo): boolean {
  switch (c.kind) {
    case 'status':
      return c.from.some((f) => inBuild(data, build, f.id)) && c.to.some((t) => inBuild(data, build, t.id));
    case 'ref':
      return inBuild(data, build, c.from) && inBuild(data, build, c.to);
    default:
      return inBuild(data, build, c.from) && c.to.some((id) => inBuild(data, build, id));
  }
}

const KIND_ORDER: Record<ComboKind, number> = { ref: 0, status: 1, burst: 2, chance: 3 };

/** Ready combos first, then by kind. Stable otherwise. */
export function sortCombos(data: GameData, build: Build, list: Combo[]): Combo[] {
  return list
    .map((c, i) => ({ c, i, ready: comboReady(data, build, c) ? 0 : 1 }))
    .sort((a, b) => a.ready - b.ready || KIND_ORDER[a.c.kind] - KIND_ORDER[b.c.kind] || a.i - b.i)
    .map((x) => x.c);
}
