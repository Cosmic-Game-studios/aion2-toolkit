// Daevaforge community server: build sharing API + static hosting of the built frontend.
// No dependencies (Node >= 20). Storage: server/data/builds.json (atomic writes).
//
//   PORT=8787 node server/index.mjs
//   ADMIN_TOKEN=... enables deleting any build with header "x-admin-token".
//   CORS_ORIGIN=https://example.org allows a frontend on another origin to use the API.
//
// Endpoints
//   GET    /api/health
//   GET    /api/builds?class=&q=&tag=&sort=new|top&page=1&limit=24
//   GET    /api/builds/:id
//   POST   /api/builds                 -> { id, editToken }
//   PUT    /api/builds/:id             header x-edit-token
//   DELETE /api/builds/:id             header x-edit-token (or x-admin-token)
//   POST   /api/builds/:id/like        { clientId } -> toggles, returns { likes, liked }
//   POST   /api/builds/:id/report      { clientId, reason }
import { createServer } from 'node:http';
import { readFile, writeFile, rename, mkdir, stat } from 'node:fs/promises';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { join, normalize, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBuild, cleanText, cleanTags, CLASS_TYPES } from './validate.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(ROOT, 'data');
const DATA_FILE = join(DATA_DIR, 'builds.json');
const DIST = join(ROOT, '..', 'dist');
const PORT = Number(process.env.PORT) || 8787;
const HOST = process.env.HOST || '127.0.0.1';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const CORS_ORIGINS = (process.env.CORS_ORIGIN || '').split(',').map((x) => x.trim()).filter(Boolean);
const MAX_BODY = 96 * 1024;
const HIDE_AFTER_REPORTS = 5;

/** @type {Map<string, any>} */
let builds = new Map();

/** one view per viewer and build every 30 minutes (in memory) */
const recentViews = new Map();
const VIEW_WINDOW = 30 * 60_000;
function countView(key) {
  const now = Date.now();
  if (recentViews.size > 50_000) for (const [k, t] of recentViews) if (now - t > VIEW_WINDOW) recentViews.delete(k);
  const last = recentViews.get(key);
  if (last && now - last < VIEW_WINDOW) return false;
  recentViews.set(key, now);
  return true;
}

async function load() {
  try {
    const raw = JSON.parse(await readFile(DATA_FILE, 'utf8'));
    builds = new Map((raw.builds ?? []).map((b) => [b.id, b]));
  } catch (e) {
    if (e.code !== 'ENOENT') console.error('could not read builds.json:', e.message);
    builds = new Map();
  }
  console.log(`loaded ${builds.size} builds`);
}

let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await mkdir(DATA_DIR, { recursive: true });
      const tmp = `${DATA_FILE}.tmp`;
      await writeFile(tmp, JSON.stringify({ version: 1, builds: [...builds.values()] }));
      await rename(tmp, DATA_FILE);
    } catch (e) {
      console.error('save failed:', e.message);
    }
  }, 250);
}

// ---------- helpers ----------
const sha = (s) => createHash('sha256').update(s).digest('hex');
const ID_CHARS = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function newId() {
  let id;
  do {
    id = [...randomBytes(9)].map((b) => ID_CHARS[b % ID_CHARS.length]).join('');
  } while (builds.has(id));
  return id;
}
function safeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
const clientKey = (clientId) => (typeof clientId === 'string' && /^[\w-]{8,64}$/.test(clientId) ? sha(clientId).slice(0, 24) : null);

const rate = new Map();
/** sliding window limiter: true = allowed */
function allow(ip, bucket, max, windowMs) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const list = (rate.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) { rate.set(key, list); return false; }
  list.push(now);
  rate.set(key, list);
  return true;
}
setInterval(() => {
  const now = Date.now();
  for (const [k, list] of rate) if (!list.some((t) => now - t < 3_600_000)) rate.delete(k);
}, 600_000).unref();

function send(res, status, body, headers = {}) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    ...headers,
  });
  res.end(json);
}
const fail = (res, status, error) => send(res, status, { error });

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('payload too large'), { status: 413 })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { reject(Object.assign(new Error('invalid JSON'), { status: 400 })); }
    });
    req.on('error', reject);
  });
}

function summary(b, viewerKey) {
  const bar = b.build.bar ?? {};
  const mainRow = Array.from({ length: 12 }, (_, c) => bar[`0:${c}`]).filter(Boolean);
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    description: b.description.slice(0, 220),
    tags: b.tags,
    class: b.build.c,
    level: b.build.l,
    likes: b.likes.length,
    liked: viewerKey ? b.likes.includes(viewerKey) : false,
    views: b.views,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
    preview: {
      bar: mainRow.slice(0, 8),
      stigmas: (b.build.st ?? []).map((s) => s.id).filter(Boolean),
      macros: (b.build.macros ?? []).length,
    },
  };
}
const full = (b, viewerKey) => ({ ...summary(b, viewerKey), description: b.description, build: b.build });

function parseMeta(body) {
  const title = cleanText(body.title, 60);
  const author = cleanText(body.author, 30) || 'Anonymous';
  const description = cleanText(body.description, 2000, true);
  const tags = cleanTags(body.tags);
  if (title.length < 3) return { error: 'title must have at least 3 characters' };
  return { title, author, description, tags };
}

// ---------- API ----------
async function api(req, res, url, ip) {
  const parts = url.pathname.split('/').filter(Boolean); // ['api', 'builds', id?, action?]
  const method = req.method;

  if (parts[1] === 'health') return send(res, 200, { ok: true, builds: builds.size });
  if (parts[1] !== 'builds') return fail(res, 404, 'not found');

  const id = parts[2];
  const action = parts[3];
  const viewerKey = clientKey(url.searchParams.get('clientId') ?? req.headers['x-client-id']);

  // list
  if (!id && method === 'GET') {
    const cls = url.searchParams.get('class');
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase().slice(0, 60);
    const tag = (url.searchParams.get('tag') ?? '').trim().toLowerCase().slice(0, 20);
    const sort = url.searchParams.get('sort') === 'top' ? 'top' : 'new';
    const limit = Math.min(48, Math.max(1, Number(url.searchParams.get('limit')) || 24));
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    let list = [...builds.values()].filter((b) => b.reports.length < HIDE_AFTER_REPORTS);
    if (cls && CLASS_TYPES.includes(cls)) list = list.filter((b) => b.build.c === cls);
    if (tag) list = list.filter((b) => b.tags.includes(tag));
    if (q) list = list.filter((b) => `${b.title} ${b.author} ${b.description} ${b.tags.join(' ')}`.toLowerCase().includes(q));
    list.sort(sort === 'top'
      ? (a, b) => b.likes.length - a.likes.length || b.createdAt.localeCompare(a.createdAt)
      : (a, b) => b.createdAt.localeCompare(a.createdAt));
    const total = list.length;
    const items = list.slice((page - 1) * limit, page * limit).map((b) => summary(b, viewerKey));
    return send(res, 200, { items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
  }

  // create
  if (!id && method === 'POST') {
    if (!allow(ip, 'create', 10, 3_600_000)) return fail(res, 429, 'too many uploads, try again later');
    const body = await readBody(req);
    const meta = parseMeta(body);
    if (meta.error) return fail(res, 400, meta.error);
    const build = validateBuild(body.build);
    if (!build) return fail(res, 400, 'invalid build');
    const editToken = randomBytes(24).toString('base64url');
    const now = new Date().toISOString();
    const entry = {
      id: newId(), ...meta, build, editHash: sha(editToken),
      likes: [], reports: [], views: 0, createdAt: now, updatedAt: now,
    };
    builds.set(entry.id, entry);
    scheduleSave();
    return send(res, 201, { id: entry.id, editToken });
  }

  const entry = id ? builds.get(id) : null;
  if (!entry || entry.reports.length >= HIDE_AFTER_REPORTS) return fail(res, 404, 'build not found');

  if (!action && method === 'GET') {
    if (countView(`${entry.id}:${viewerKey || ip}`)) {
      entry.views += 1;
      scheduleSave();
    }
    return send(res, 200, full(entry, viewerKey));
  }

  const isOwner = safeEqualHex(sha(String(req.headers['x-edit-token'] ?? '')), entry.editHash);
  const isAdmin = ADMIN_TOKEN && req.headers['x-admin-token'] === ADMIN_TOKEN;

  if (!action && method === 'PUT') {
    if (!isOwner) return fail(res, 403, 'edit token required');
    if (!allow(ip, 'edit', 60, 3_600_000)) return fail(res, 429, 'too many edits');
    const body = await readBody(req);
    const meta = parseMeta(body);
    if (meta.error) return fail(res, 400, meta.error);
    let build = entry.build;
    if (body.build !== undefined) {
      build = validateBuild(body.build);
      if (!build) return fail(res, 400, 'invalid build');
    }
    Object.assign(entry, meta, { build, updatedAt: new Date().toISOString() });
    scheduleSave();
    return send(res, 200, full(entry, viewerKey));
  }

  if (!action && method === 'DELETE') {
    if (!isOwner && !isAdmin) return fail(res, 403, 'edit token required');
    builds.delete(entry.id);
    scheduleSave();
    return send(res, 200, { ok: true });
  }

  if (action === 'like' && method === 'POST') {
    if (!allow(ip, 'like', 200, 3_600_000)) return fail(res, 429, 'too many requests');
    const body = await readBody(req);
    const key = clientKey(body.clientId);
    if (!key) return fail(res, 400, 'clientId required');
    const i = entry.likes.indexOf(key);
    if (i >= 0) entry.likes.splice(i, 1); else entry.likes.push(key);
    scheduleSave();
    return send(res, 200, { likes: entry.likes.length, liked: i < 0 });
  }

  if (action === 'report' && method === 'POST') {
    if (!allow(ip, 'report', 20, 3_600_000)) return fail(res, 429, 'too many requests');
    const body = await readBody(req);
    const key = clientKey(body.clientId);
    if (!key) return fail(res, 400, 'clientId required');
    if (!entry.reports.some((r) => r.key === key)) {
      entry.reports.push({ key, reason: cleanText(body.reason, 200), at: new Date().toISOString() });
      scheduleSave();
    }
    return send(res, 200, { ok: true });
  }

  return fail(res, 405, 'method not allowed');
}

// ---------- static files (production) ----------
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
};

async function serveStatic(req, res, url) {
  let path = decodeURIComponent(url.pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(DIST, path));
  if (!file.startsWith(DIST)) return fail(res, 403, 'forbidden');
  try {
    const s = await stat(file);
    if (!s.isFile()) throw new Error('not a file');
    const data = await readFile(file);
    const immutable = path.startsWith('/assets/');
    res.writeHead(200, {
      'content-type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream',
      'cache-control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
      'x-content-type-options': 'nosniff',
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    try {
      const html = await readFile(join(DIST, 'index.html'));
      res.writeHead(200, { 'content-type': MIME['.html'] });
      res.end(html);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('Frontend not built. Run "npm run build" first, or use "npm run dev:all" during development.');
    }
  }
}

// ---------- server ----------
await load();
createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const ip = (process.env.TRUST_PROXY ? String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() : '') || req.socket.remoteAddress || '?';
  try {
    if (url.pathname.startsWith('/api/')) {
      // optional CORS for a frontend hosted on another origin (CORS_ORIGIN=https://a.example,https://b.example)
      const origin = String(req.headers.origin ?? '');
      if (origin && CORS_ORIGINS.includes(origin)) {
        res.setHeader('access-control-allow-origin', origin);
        res.setHeader('vary', 'origin');
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'access-control-allow-methods': 'GET, POST, PUT, DELETE',
            'access-control-allow-headers': 'content-type, x-client-id, x-edit-token',
            'access-control-max-age': '86400',
          });
          return res.end();
        }
      }
      return await api(req, res, url, ip);
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return fail(res, 405, 'method not allowed');
    return await serveStatic(req, res, url);
  } catch (e) {
    if (!res.headersSent) fail(res, e.status ?? 500, e.status ? e.message : 'server error');
    if (!e.status) console.error(e);
  }
}).listen(PORT, HOST, () => console.log(`Daevaforge server on http://${HOST}:${PORT}`));
