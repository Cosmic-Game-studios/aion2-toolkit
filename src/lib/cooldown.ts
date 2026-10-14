import type { Skill } from '../data/types';

/** Cooldown in seconds at a given skill level (falls back to the base value). */
export const cdAt = (s: Skill, lv: number): number =>
  s.levels[Math.max(0, Math.min(s.levels.length, lv) - 1)]?.cooldownSec ?? s.cooldownSec ?? 0;

/** Applies a manual cooldown reduction in percent. */
export const applyCdr = (cd: number, cdr: number): number =>
  cd <= 0 ? 0 : Math.round(cd * (1 - Math.min(90, Math.max(0, cdr)) / 100) * 10) / 10;

export type CdTier = 'none' | 'short' | 'mid' | 'long';
export const cdTier = (cd: number): CdTier => (cd <= 0 ? 'none' : cd < 15 ? 'short' : cd < 60 ? 'mid' : 'long');

const trim = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/** Badge format: 8s, 45s, 1:30, 2:00 */
export function fmtCdShort(cd: number): string {
  if (cd <= 0) return '';
  if (cd < 60) return `${trim(cd)}s`;
  const m = Math.floor(cd / 60);
  const s = Math.round(cd - m * 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Text format: 8 s, 45 s, 1 min 30 s */
export function fmtCdLong(cd: number): string {
  if (cd <= 0) return '';
  if (cd < 60) return `${trim(cd)} s`;
  const m = Math.floor(cd / 60);
  const s = Math.round(cd - m * 60);
  return s ? `${m} min ${s} s` : `${m} min`;
}

/** True when the cooldown changes between levels 1 and maxLevel. */
export const cdVaries = (s: Skill) => new Set(s.levels.map((l) => l.cooldownSec)).size > 1;
