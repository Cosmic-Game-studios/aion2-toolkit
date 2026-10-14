// Derives skill combinations per class from the English skill texts in public/data/en/skills.json
// and writes them to public/data/combos.json (language independent: skill ids, part ids, status keys).
//
// Four kinds of combinations are detected:
//   status  – skill A inflicts a status (Knockdown, Stun, …), skill B only works on / deals more to targets with it
//   ref     – a text names another skill of the class: reduces/resets its cooldown, triggers it, or boosts it x1.5
//   burst   – a self buff (Attack, Damage Boost, Critical, Combat Speed) or a Defense debuff, followed by the class's
//             hardest hitting skills
//   chance  – something raises Status Effect / Impact-type chance, paired with skills that inflict a status by chance
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = process.cwd();
const skills = JSON.parse(await readFile(join(ROOT, 'public', 'data', 'en', 'skills.json'), 'utf8'));

const STATUSES = [
  'Knock Back', 'Knockdown', 'Airborne', 'Stun', 'Root', 'Slow', 'Seal', 'Blind', 'Frost', 'Fear',
  'Poison', 'Curse', 'Fire Mark', 'Embers', 'Debilitating Mark', 'Crimson Flames', 'Insignia', 'Stagger',
];
/** statuses counted as "Impact-type" by the game texts */
const IMPACT = ['Stun', 'Knockdown', 'Airborne'];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const STATUS_RE = STATUSES.map(esc).join('|');

const clean = (t) => (t ?? '').replace(/\*\*/g, '').replace(/\s+/g, ' ');
const firstNum = (t, re) => { const m = re.exec(t); return m ? Number(m[1]) : 0; };

/** All texts of a skill: description, specialisations (with part id + level) and chain skills. */
function sources(s) {
  const out = [{ text: clean(s.description), via: null }];
  for (const p of s.parts ?? []) out.push({ text: clean(p.desc), via: { part: p.id, level: p.level } });
  for (const c of s.chain ?? []) out.push({ text: clean(c.desc?.[0]), via: { chain: c.name } });
  return out;
}

function producers(text) {
  const found = new Map();
  const re = new RegExp(`(?:(\\d+)% chance to (?:\\w+ and )?)?(?:inflict(?:s|ing)?|engraves? \\d+) (?:an? )?(?:the target with )?(${STATUS_RE})s?\\b(?! Immunity)`, 'g');
  for (const m of text.matchAll(re)) {
    const status = m[2];
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 60);
    const npcOnly = /^ (?:for \d+s )?on NPC/.test(after);
    const chance = m[1] ? Number(m[1]) : 100;
    const cond = !npcOnly && /^[^.]*?\b(on Block|after using|while flying|on hitting|on targets with|on landing)\b/.test(after);
    const cur = found.get(status) ?? { status, chance: 0, npc: false, cond: false };
    if (npcOnly) cur.npc = true;
    else { cur.chance = Math.max(cur.chance, chance); cur.cond = cur.cond || cond; }
    found.set(status, cur);
  }
  // chance stays 0 when the text only says "100% chance to inflict X on NPC targets"
  return [...found.values()];
}

function consumers(text) {
  const set = new Set();
  const item = `(?:${STATUS_RE}|Impact-type(?: status)?)`;
  const re = new RegExp(`(?:targets?|enemies|enemy)\\s+(?:afflicted with|with)\\s+(?:an?\\s+)?(${item}(?:(?:,\\s*|\\s+or\\s+(?:an?\\s+)?)${item})*)`, 'g');
  for (const m of text.matchAll(re)) {
    for (const part of m[1].split(/,\s*|\s+or\s+(?:an?\s+)?/)) {
      if (/^Impact-type/.test(part)) set.add('Impact');
      else set.add(part);
    }
  }
  if (/\d+ stacks of Insignia/.test(text)) set.add('Insignia');
  if (/Impact-type Status target damage/.test(text)) set.add('Impact');
  return [...set];
}

const DMG_RE = /(\d+)-\d+ (?:[A-Z]?[a-z]+ )?[Dd]amage/;
const BUFF_STATS = [
  ['attack', /(?:caster's |the caster's )?Attack by (\d+)%/],
  ['damage', /PvE Damage Boost by (\d+(?:\.\d+)?)%/],
  ['crit', /Critical (?:Hit|Damage Boost) by (\d+(?:\.\d+)?)/],
  ['speed', /Combat Speed by (\d+)%/],
];

const out = { generatedAt: new Date().toISOString(), impact: IMPACT, classes: {} };

const byClass = new Map();
for (const s of skills) {
  if (!byClass.has(s.classType)) byClass.set(s.classType, []);
  byClass.get(s.classType).push(s);
}

for (const [cls, list] of byClass) {
  const byName = new Map(list.map((s) => [s.name, s]));
  const combos = [];
  const actives = list.filter((s) => s.type === 'active');

  // ---------- status: setup -> payoff ----------
  const prod = new Map(); // status -> [{id, chance, npc, cond, via}]
  const cons = new Map(); // status -> [{id, via}]
  for (const s of list) {
    for (const src of sources(s)) {
      for (const p of producers(src.text)) {
        if (!prod.has(p.status)) prod.set(p.status, []);
        prod.get(p.status).push({ id: s.id, chance: p.chance, npc: p.npc, cond: p.cond, via: src.via });
      }
      for (const c of consumers(src.text)) {
        if (!cons.has(c)) cons.set(c, []);
        if (!cons.get(c).some((x) => x.id === s.id && JSON.stringify(x.via) === JSON.stringify(src.via))) cons.get(c).push({ id: s.id, via: src.via });
      }
    }
  }
  // Stagger builds up through "Stagger Gauge Damage" – the strongest gauge fillers are the setup.
  const stagger = actives
    .map((s) => ({ id: s.id, gauge: firstNum(clean(s.description), /(\d+) Stagger Gauge Damage/) }))
    .filter((x) => x.gauge >= 15)
    .sort((a, b) => b.gauge - a.gauge)
    .slice(0, 4)
    .map((x) => ({ id: x.id, gauge: x.gauge, chance: 100, npc: false, cond: false, via: null }));
  if (stagger.length) prod.set('Stagger', stagger);

  for (const [status, to] of cons) {
    const keys = status === 'Impact' ? IMPACT : [status];
    const from = keys.flatMap((k) => (prod.get(k) ?? []).map((p) => ({ ...p, status: k })));
    // a skill that is the only payoff does not count as its own setup
    const setups = from.filter((f) => !to.every((t) => t.id === f.id));
    if (!setups.length || !to.length) continue;
    combos.push({ kind: 'status', status, from: setups, to });
  }

  // ---------- explicit references between skills ----------
  for (const s of list) {
    for (const src of sources(s)) {
      for (const m of src.text.matchAll(/\[([^\]]+)\]/g)) {
        const target = byName.get(m[1]);
        if (!target || target.id === s.id) continue;
        const before = src.text.slice(Math.max(0, m.index - 30), m.index);
        const after = src.text.slice(m.index + m[0].length, m.index + m[0].length + 30);
        if (/does not stack|Cannot|together with|skill $/i.test(before + after)) continue;
        let rel = null;
        let value = null;
        if (/^ (?:and \[[^\]]+\] )?cooldown/.test(after) || (/(Reset|Removes) $/.test(before) && /cooldown/.test(after))) {
          rel = /(Reset|Removes)/.test(before) ? 'reset' : 'cdr';
          const sec = /-(\d+)s $/.exec(before);
          if (sec) value = Number(sec[1]);
        } else if (/(trigger|Triggers|Activates) $/.test(before) || /^ becomes available/.test(after)) {
          rel = 'trigger';
          const pct = /(\d+)% chance to trigger $/.exec(before);
          if (pct) value = Number(pct[1]);
        } else if (/x1\.5 $/.test(before)) {
          rel = 'amplify';
        }
        if (!rel) continue;
        const dup = combos.find((c) => c.kind === 'ref' && c.from === s.id && c.to === target.id && c.rel === rel);
        if (dup) continue;
        combos.push({ kind: 'ref', rel, from: s.id, to: target.id, value, via: src.via });
      }
    }
  }

  // ---------- burst windows ----------
  const hitters = actives
    .map((s) => ({ s, dmg: firstNum(clean(s.description), DMG_RE) }))
    .filter((x) => x.dmg > 0 && x.s.cooldownSec > 0);
  for (const s of actives) {
    const t = clean(s.description);
    const dur = firstNum(t, /for (\d+)s/);
    if (!dur || s.cooldownSec < 30) continue;
    let stat = null;
    let value = 0;
    if (/(?:increases|grants)[^.]*caster/i.test(t) || /^Increases the caster's/.test(t)) {
      for (const [k, re] of BUFF_STATS) {
        const v = firstNum(t, re);
        if (v) { stat = k; value = v; break; }
      }
    }
    if (!stat) {
      const def = /reduces (?:their |the target's |enemies' )?Defense by -?(\d+)%/.exec(t);
      if (def) { stat = 'defense'; value = Number(def[1]); }
    }
    if (!stat) continue;
    const to = hitters
      .filter((x) => x.s.id !== s.id)
      .sort((a, b) => b.dmg - a.dmg)
      .slice(0, 4)
      .map((x) => x.s.id);
    if (to.length) combos.push({ kind: 'burst', from: s.id, stat, value, dur, to });
  }

  // ---------- status chance boosters ----------
  const chancy = [...prod.entries()]
    .filter(([k]) => k !== 'Stagger')
    .flatMap(([, ps]) => ps.filter((p) => !p.via && p.chance > 0 && p.chance < 100))
    .map((p) => p.id);
  const chanceTargets = [...new Set(chancy)];
  for (const s of list) {
    const t = clean(s.description);
    const m = /(Status Effect|Impact-type) Chance by (\d+(?:\.\d+)?)%/.exec(t);
    if (!m) continue;
    const kind = m[1] === 'Impact-type' ? 'impact' : 'any';
    const to = chanceTargets.filter((id) => id !== s.id && (kind === 'any' || (prod.get('Stun') ?? []).concat(prod.get('Knockdown') ?? [], prod.get('Airborne') ?? []).some((p) => p.id === id)));
    if (to.length) combos.push({ kind: 'chance', from: s.id, which: kind, value: Number(m[2]), to });
  }

  out.classes[cls] = combos;
  const counts = combos.reduce((a, c) => ({ ...a, [c.kind]: (a[c.kind] ?? 0) + 1 }), {});
  console.log(cls.padEnd(13), JSON.stringify(counts));
}

await writeFile(join(ROOT, 'public', 'data', 'combos.json'), JSON.stringify(out));
console.log('wrote public/data/combos.json');
