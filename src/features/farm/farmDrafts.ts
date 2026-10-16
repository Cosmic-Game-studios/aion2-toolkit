import { useSyncExternalStore } from 'react';
import { storage } from '../../lib/storage';
import { checkSpot, LIMITS, type SpotInput } from './farmRules';

/**
 * Spots a player noted on the farm map, kept in this browser until they are on the map. "sent" means the player
 * opened the prefilled GitHub issue for it; we cannot see whether they really submitted it, so it can be sent again.
 */
export interface Draft extends SpotInput {
  status: 'draft' | 'sent';
  savedAt: string;
  sentAt?: string;
  /** changed after it was sent: the version that gets approved may be the earlier one, so the change must not be lost */
  editedAfterSend?: true;
}

const KEY = 'farmDrafts';
const NICK_KEY = 'farmNick';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

/** A new client id: 12 random characters [a-z0-9]. */
export function newCid(): string {
  let out = '';
  while (out.length < 12) {
    // 252 = 7 × 36: higher bytes are skipped so every character is equally likely
    for (const b of crypto.getRandomValues(new Uint8Array(16))) {
      if (b < 252 && out.length < 12) out += ALPHABET[b % 36];
    }
  }
  return out;
}

const isIso = (x: unknown): x is string => typeof x === 'string' && x.length <= 40 && !Number.isNaN(Date.parse(x));

/** Drafts from storage (or another tab): entries that are not a valid spot or have no status are dropped. */
function parseDrafts(raw: unknown): Draft[] {
  if (!Array.isArray(raw)) return [];
  const out: Draft[] = [];
  const seen = new Set<string>();
  for (const e of raw) {
    if (!e || typeof e !== 'object') continue;
    const r = e as Record<string, unknown>;
    if (r.status !== 'draft' && r.status !== 'sent') continue;
    const res = checkSpot(r);
    if (!res.ok || seen.has(res.spot.cid)) continue;
    seen.add(res.spot.cid);
    const d: Draft = { ...res.spot, status: r.status, savedAt: isIso(r.savedAt) ? r.savedAt : new Date().toISOString() };
    if (d.status === 'sent' && isIso(r.sentAt)) d.sentAt = r.sentAt;
    if (r.editedAfterSend === true) d.editedAfterSend = true;
    out.push(d);
  }
  return out;
}

// A tiny external store, so the page, the form and the drafts panel always show the same list.
let cache: Draft[] | null = null;
const listeners = new Set<() => void>();
const read = () => (cache ??= parseDrafts(storage.get<unknown>(KEY, [])));
const emit = () => listeners.forEach((l) => l());
const write = (next: Draft[]) => {
  cache = next;
  if (next.length) storage.set(KEY, next);
  else storage.remove(KEY);
  emit();
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

if (typeof window !== 'undefined') {
  // another tab changed the drafts (storage.ts prefixes the key, e.g. "aion2tk:farmDrafts"; null = storage cleared)
  window.addEventListener('storage', (e) => {
    if (e.key == null || e.key.endsWith(`:${KEY}`)) { cache = null; emit(); }
  });
}

/** The fields of a spot in a fixed order, to tell whether two versions of it are the same. */
const spotKey = (s: SpotInput) =>
  JSON.stringify([s.cid, s.region, s.cat, s.name, s.pos ?? null, s.area ?? null, s.level ?? null, s.drops ?? null, s.note ?? null, s.by ?? null]);

/**
 * Whether a draft is done because its spot is on the map (`spot` = the approved spot with its cid). A draft the player
 * changed after sending stays until the map has that change too; the approved version is the earlier one then.
 */
export function draftDone(d: Draft, spot: SpotInput | undefined): boolean {
  return !!spot && (!d.editedAfterSend || spotKey(d) === spotKey(spot));
}

/** Adds a spot as a new draft, or replaces the draft with the same cid (it is a draft again: changed, not sent). */
function save(spot: SpotInput) {
  // the form only saves checked spots; anything else would be dropped on the next load anyway
  const res = checkSpot(spot);
  if (!res.ok) return;
  const list = read();
  const i = list.findIndex((x) => x.cid === res.spot.cid);
  const prev = list[i] as Draft | undefined;
  // saved without a change: a sent draft stays sent
  if (prev && spotKey(prev) === spotKey(res.spot)) return;
  const d: Draft = { ...res.spot, status: 'draft', savedAt: new Date().toISOString() };
  if (prev && (prev.status === 'sent' || prev.editedAfterSend)) d.editedAfterSend = true;
  write(i < 0 ? [...list, d] : list.map((x, k) => (k === i ? d : x)));
}

function remove(cid: string) {
  const list = read();
  if (list.some((x) => x.cid === cid)) write(list.filter((x) => x.cid !== cid));
}

/** The player opened the GitHub issue for these drafts. */
function markSent(cids: string[]) {
  const set = new Set(cids);
  const list = read();
  if (!list.some((x) => set.has(x.cid))) return;
  const sentAt = new Date().toISOString();
  write(list.map((x): Draft => (set.has(x.cid) ? { ...x, status: 'sent', sentAt } : x)));
}

/** Drops the drafts that are on the map now (`approved` = the approved spots by cid; see draftDone). */
function clearApproved(approved: ReadonlyMap<string, SpotInput>) {
  const list = read();
  const next = list.filter((x) => !draftDone(x, approved.get(x.cid)));
  if (next.length !== list.length) write(next);
}

/** Puts a removed draft back at its old position (Undo). Returns false when a draft with its cid exists again. */
export function restoreDraft(d: Draft, index: number): boolean {
  const list = read();
  if (list.some((x) => x.cid === d.cid)) return false;
  const next = [...list];
  next.splice(Math.max(0, Math.min(index, next.length)), 0, d);
  write(next);
  return true;
}

/** All drafts of every region, and the ways to change them. */
export function useFarmDrafts(): {
  drafts: Draft[];
  save: (d: SpotInput) => void;
  remove: (cid: string) => void;
  markSent: (cids: string[]) => void;
  clearApproved: (approved: ReadonlyMap<string, SpotInput>) => void;
} {
  const drafts = useSyncExternalStore(subscribe, read, read);
  return { drafts, save, remove, markSent, clearApproved };
}

/** The nickname the player gave last, so the next spot starts with it. */
export function lastNick(): string {
  const v = storage.get<unknown>(NICK_KEY, '');
  return typeof v === 'string' ? v.slice(0, LIMITS.by) : '';
}

export function rememberNick(nick: string) {
  storage.set(NICK_KEY, nick);
}
