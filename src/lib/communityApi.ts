import type { ClassType } from '../data/types';
import type { Build } from '../state/build';
import { normalizeBuild } from '../state/build';
import { storage } from './storage';

/** Community features need the API server; static hosts (GitHub Pages) build with VITE_COMMUNITY=off. */
export const COMMUNITY_ENABLED = import.meta.env.VITE_COMMUNITY !== 'off';

const API = `${(import.meta.env.VITE_API_BASE as string | undefined) ?? ''}/api`;

export interface BuildSummary {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  class: ClassType;
  level: number;
  likes: number;
  liked: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  preview: { bar: number[]; stigmas: number[]; macros: number };
}
export interface BuildEntry extends BuildSummary { build: Build }
export interface BuildList { items: BuildSummary[]; total: number; page: number; pages: number }
export interface BuildMeta { title: string; author: string; description: string; tags: string[] }

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export function clientId(): string {
  let id = storage.get<string | null>('clientId', null);
  if (!id) {
    id = crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    storage.set('clientId', id);
  }
  return id;
}

/** edit tokens of builds uploaded from this browser */
export const myTokens = () => storage.get<Record<string, string>>('community:tokens', {});
const saveToken = (id: string, token: string) => storage.set('community:tokens', { ...myTokens(), [id]: token });
const dropToken = (id: string) => { const t = myTokens(); delete t[id]; storage.set('community:tokens', t); };
export const isMine = (id: string) => !!myTokens()[id];

async function req<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      ...init,
      headers: { 'content-type': 'application/json', 'x-client-id': clientId(), ...(init.headers ?? {}) },
    });
  } catch {
    throw new ApiError('offline', 0);
  }
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('application/json')) throw new ApiError('offline', 0);
  const body = await res.json();
  if (!res.ok) throw new ApiError(body?.error ?? `HTTP ${res.status}`, res.status);
  return body as T;
}

export interface ListQuery { cls?: string; q?: string; tag?: string; sort?: 'new' | 'top'; page?: number; limit?: number }

export function listBuilds(query: ListQuery): Promise<BuildList> {
  const p = new URLSearchParams();
  if (query.cls) p.set('class', query.cls);
  if (query.q) p.set('q', query.q);
  if (query.tag) p.set('tag', query.tag);
  p.set('sort', query.sort ?? 'new');
  p.set('page', String(query.page ?? 1));
  if (query.limit) p.set('limit', String(query.limit));
  return req<BuildList>(`/builds?${p}`);
}

export async function getBuild(id: string): Promise<BuildEntry> {
  const e = await req<BuildEntry>(`/builds/${encodeURIComponent(id)}`);
  const b = normalizeBuild(e.build);
  if (!b) throw new ApiError('invalid build', 500);
  return { ...e, build: b };
}

export async function createBuild(meta: BuildMeta, build: Build): Promise<string> {
  const r = await req<{ id: string; editToken: string }>('/builds', { method: 'POST', body: JSON.stringify({ ...meta, build }) });
  saveToken(r.id, r.editToken);
  return r.id;
}

export function updateBuild(id: string, meta: BuildMeta, build?: Build): Promise<BuildEntry> {
  return req<BuildEntry>(`/builds/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'x-edit-token': myTokens()[id] ?? '' },
    body: JSON.stringify({ ...meta, ...(build ? { build } : {}) }),
  });
}

export async function deleteBuild(id: string): Promise<void> {
  await req(`/builds/${encodeURIComponent(id)}`, { method: 'DELETE', headers: { 'x-edit-token': myTokens()[id] ?? '' } });
  dropToken(id);
}

export const toggleLike = (id: string) =>
  req<{ likes: number; liked: boolean }>(`/builds/${encodeURIComponent(id)}/like`, { method: 'POST', body: JSON.stringify({ clientId: clientId() }) });

export const reportBuild = (id: string, reason: string) =>
  req<{ ok: true }>(`/builds/${encodeURIComponent(id)}/report`, { method: 'POST', body: JSON.stringify({ clientId: clientId(), reason }) });
