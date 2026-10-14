// Server-side validation of uploaded builds. Rebuilds the object from scratch with only known fields,
// so nothing unexpected is ever stored. Mirrors src/state/build.ts normalizeBuild().
export const CLASS_TYPES = ['Assassin', 'Chanter', 'Cleric', 'Elementalist', 'Fighter', 'Gladiator', 'Ranger', 'Sorcerer', 'Templar'];
const BAR_ROWS = 5;
const BAR_COLS = 12;
const ID_MAX = 999_999_999;

const isObj = (v) => !!v && typeof v === 'object' && !Array.isArray(v);
const int = (v, min, max, def) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def;
};

/** Plain text: strips control characters (keeps newlines when multiline), trims, limits length. */
export function cleanText(v, max, multiline = false) {
  if (typeof v !== 'string') return '';
  const re = multiline ? /[\u0000-\u0009\u000B-\u001F\u007F​-‏‪-‮]/g : /[\u0000-\u001F\u007F​-‏‪-‮]/g;
  let s = v.replace(re, '').trim();
  if (multiline) s = s.replace(/\n{3,}/g, '\n\n');
  return s.slice(0, max);
}

export function cleanTags(v) {
  const list = Array.isArray(v) ? v : typeof v === 'string' ? v.split(',') : [];
  const out = [];
  for (const t of list) {
    const s = cleanText(String(t), 20).toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').trim();
    if (s && !out.includes(s)) out.push(s);
    if (out.length >= 6) break;
  }
  return out;
}

export function validateBuild(raw) {
  if (!isObj(raw) || !CLASS_TYPES.includes(raw.c)) return null;
  if (JSON.stringify(raw).length > 48 * 1024) return null;
  const b = {
    v: 1, c: raw.c, l: int(raw.l, 1, 100, 45), f: raw.f === 'Dark' ? 'Dark' : 'Light',
    x: Array.isArray(raw.x) ? raw.x.filter((s) => typeof s === 'string' && /^[\w-]{1,40}$/.test(s)).slice(0, 10) : [],
    e: int(raw.e, 0, 9999, 0), se: int(raw.se, 0, 9999, 0), cdr: int(raw.cdr, 0, 90, 0),
    lv: {}, st: [], dv: {}, bar: {}, auto: [], macros: [],
  };
  if (isObj(raw.lv)) {
    for (const [k, v] of Object.entries(raw.lv).slice(0, 80)) if (/^\d{1,9}$/.test(k)) b.lv[k] = int(v, 1, 40, 1);
  }
  const st = Array.isArray(raw.st) ? raw.st : [];
  for (let i = 0; i < 4; i++) {
    const s = st[i];
    b.st.push(isObj(s) ? { id: s.id == null ? null : int(s.id, 0, ID_MAX, 0) || null, lv: int(s.lv, 1, 25, 1) } : { id: null, lv: 1 });
  }
  if (isObj(raw.dv)) {
    for (const [k, v] of Object.entries(raw.dv).slice(0, 10)) {
      if (/^\d{1,6}$/.test(k) && typeof v === 'string' && /^[0-9a-f]{0,80}$/.test(v)) b.dv[k] = v;
    }
  }
  if (isObj(raw.bar)) {
    for (const [k, v] of Object.entries(raw.bar).slice(0, BAR_ROWS * BAR_COLS)) {
      const m = /^(\d):(\d{1,2})$/.exec(k);
      if (m && +m[1] < BAR_ROWS && +m[2] < BAR_COLS) {
        const id = int(v, 0, ID_MAX, 0);
        if (id) b.bar[k] = id;
      }
    }
  }
  if (Array.isArray(raw.auto)) b.auto = [...new Set(raw.auto.map((v) => int(v, 0, ID_MAX, 0)).filter(Boolean))].slice(0, 60);
  if (Array.isArray(raw.macros)) {
    b.macros = raw.macros.filter(isObj).slice(0, 10).map((m, i) => ({
      id: typeof m.id === 'string' && /^[\w-]{1,24}$/.test(m.id) ? m.id : `m${i}`,
      name: cleanText(m.name, 30),
      key: cleanText(m.key, 12),
      steps: (Array.isArray(m.steps) ? m.steps : []).filter(isObj).slice(0, 20)
        .map((s) => ({ id: int(s.id, 0, ID_MAX, 0), delay: int(s.delay, 0, 9900, 10) }))
        .filter((s) => s.id),
    }));
  }
  return b;
}
