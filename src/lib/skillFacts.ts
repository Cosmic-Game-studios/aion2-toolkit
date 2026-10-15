/**
 * Numbers read from an English skill text: direct damage, damage over time and defence cuts.
 * The hotbar uses them to tell attacks from buffs (src/features/hotbar/keyStacks.ts).
 *
 * The patterns read the English skill texts; ids are the same in every language.
 */

interface Facts {
  dmg: number;
  dot: number;
  defDown: number;
}

const n = (s: string | undefined) => (s ? Number(s.replace(/,/g, '')) : 0);
const avg = (a?: string, b?: string) => (b ? (n(a) + n(b)) / 2 : n(a));

export function parseFacts(text: string): Facts {
  const t = (text ?? '').replace(/\*\*/g, '').replace(/\s+/g, ' ');
  const f: Facts = { dmg: 0, dot: 0, defDown: 0 };

  const hit = /(?:Deals?|deal|deals|dealing) ([\d,]+)-([\d,]+) (?:[A-Z][a-z]+ )?damage(?! over Time)/i.exec(t);
  if (hit) f.dmg = avg(hit[1], hit[2]);
  // a few auras name one number ("periodically deals 394 Earth damage")
  const one = hit ? null : /deals ([\d,]+) (?:[A-Z][a-z]+ )?damage(?! over Time)/i.exec(t);
  if (one) f.dmg = n(one[1]);
  const dot1 = /([\d,]+)(?:-([\d,]+))? (?:[A-Z][a-z]+ )?Damage over Time(?: every (\d+)s)?[^.]*?for (\d+)s/i.exec(t);
  if (dot1) f.dot += avg(dot1[1], dot1[2]) * (n(dot1[4]) / Math.max(1, n(dot1[3]) || 1));
  const dot2 = /([\d,]+) damage every (\d+)s(?:[^.]*?for (\d+)s)?/i.exec(t);
  if (dot2 && !dot1) f.dot += n(dot2[1]) * ((n(dot2[3]) || 10) / Math.max(1, n(dot2[2])));

  const def = /reduces? (?:their |the target's |enemy |enemies' )?(?:Defense|PvE Damage Tolerance) by -?(\d+)%/i.exec(t);
  if (def) f.defDown = n(def[1]);
  return f;
}
