import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { Crosshair, ExternalLink, Info } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import type { Lang } from '../../data/types';
import { NumberField, PageHeader } from '../../components/ui';
import { useClassName } from '../../components/ClassSelect';
import { storage } from '../../lib/storage';
import { fmtDate } from '../../lib/format';
import { ALWAYS_CRITS, CAP, CRIT_BUFF, CURVE, LUDRA_GLOBAL, MAX_STAT, SLOPE, SOURCES, capGap, critChance, type L } from './critData';

const T = {
  title: { en: 'Crit chance', de: 'Krit-Chance' },
  intro: {
    en: 'How much crit chance your Critical Hit gives against a target – and from where more of it is wasted on Global.',
    de: 'Wie viel Krit-Chance dein Kritischer Treffer gegen ein Ziel bringt – und ab wann mehr davon auf Global verschenkt ist.',
  },
  statCap: { en: 'crit chance at most on Global', de: 'Krit-Chance höchstens auf Global' },
  statGap: { en: 'Critical Hit above the target’s resist reach it', de: 'Kritischer Treffer über dem Widerstand des Ziels erreichen sie' },
  statSlope: { en: 'more chance per 100 Critical Hit', de: 'mehr Chance je 100 Kritischer Treffer' },
  statKorea: { en: 'is the cap in Korea, so Korean numbers don’t fit', de: 'ist die Grenze in Korea, darum passen koreanische Zahlen nicht' },
  estTitle: { en: 'A community estimate', de: 'Eine Schätzung der Community' },
  estText: {
    en: 'NCSOFT publishes no formula. The curve comes from player tests, mostly on Korean characters; the 50% cap is the Global client’s own tooltip. Worked out here, not measured: take it as a guide, not as an exact number.',
    de: 'NCSOFT veröffentlicht keine Formel. Die Kurve stammt aus Tests von Spielern, vor allem an koreanischen Charakteren; die Grenze von 50 % steht im Tooltip des Global-Clients. Hier gerechnet, nicht gemessen: Nimm es als Richtwert, nicht als genaue Zahl.',
  },
  calcTitle: { en: 'Your crit chance', de: 'Deine Krit-Chance' },
  crit: { en: 'Your Critical Hit', de: 'Dein Kritischer Treffer' },
  critHint: { en: 'The value in your character window.', de: 'Der Wert aus deinem Charakterfenster.' },
  resist: { en: 'Target’s Critical Hit Resist', de: 'Krit.-Widerstand des Ziels' },
  resistHint: {
    en: 'PvP: the other player’s value. For monsters and bosses no source names one; at 0 you see your best case.',
    de: 'PvP: der Wert des anderen Spielers. Für Monster und Bosse nennt keine Quelle Werte; bei 0 siehst du den besten Fall.',
  },
  result: { en: 'crit chance against this target on Global', de: 'Krit-Chance gegen dieses Ziel auf Global' },
  gap: { en: 'Gap to the resist', de: 'Abstand zum Widerstand' },
  capAt: { en: 'Critical Hit for 50%', de: 'Kritischer Treffer für 50 %' },
  toCap: { en: 'Missing to the cap', de: 'Fehlt bis zur Grenze' },
  overCap: { en: 'Above the cap', de: 'Über der Grenze' },
  plus100: { en: 'With 100 more', de: 'Mit 100 mehr' },
  atCap: { en: 'At the cap: more Critical Hit gives nothing against this target.', de: 'An der Grenze: Mehr Kritischer Treffer bringt gegen dieses Ziel nichts.' },
  calcNote: {
    en: 'Worked out, not measured. No source names an effect of your level or a base chance at a gap of 0, so neither counts here. This browser remembers your values.',
    de: 'Gerechnet, nicht gemessen. Einen Einfluss der Stufe oder eine Grundchance bei 0 Abstand nennt keine Quelle, darum zählt beides hier nicht. Dieser Browser merkt sich deine Werte.',
  },
  chartTitle: { en: 'How the chance rises', de: 'So steigt die Chance' },
  chartIntro: {
    en: 'Up to the target’s resist it is 0%. From there every 100 points of Critical Hit add about {s}, until {g} at {c} points above it. In Korea the curve keeps rising to {k}.',
    de: 'Bis zum Widerstand des Ziels sind es 0 %. Ab da bringen je 100 Punkte Kritischer Treffer etwa {s} mehr, bis {g} bei {c} Punkten darüber. In Korea steigt die Kurve weiter bis {k}.',
  },
  legendGlobal: { en: 'Global (cap {p})', de: 'Global (Grenze {p})' },
  legendKorea: { en: 'Korea (cap {p}), for comparison', de: 'Korea (Grenze {p}), zum Vergleich' },
  legendYou: { en: 'You: {v}', de: 'Du: {v}' },
  axisX: { en: 'Critical Hit', de: 'Kritischer Treffer' },
  chartLabel: {
    en: 'Line chart of crit chance by Critical Hit against a resist of {r}: 0% up to {r}, {g} from {c} on (Global), {k} from {ck} on (Korea). You: {v} Critical Hit, {p}.',
    de: 'Liniendiagramm der Krit-Chance nach Kritischer Treffer gegen einen Widerstand von {r}: 0 % bis {r}, {g} ab {c} (Global), {k} ab {ck} (Korea). Du: {v} Kritischer Treffer, {p}.',
  },
  tableCaption: { en: 'The curve in numbers, against a resist of {r}', de: 'Die Kurve in Zahlen, gegen einen Widerstand von {r}' },
  colCrit: { en: 'Critical Hit', de: 'Krit. Treffer' },
  colGap: { en: 'Gap', de: 'Abstand' },
  colGlobal: { en: 'Global', de: 'Global' },
  colKorea: { en: 'Korea', de: 'Korea' },
  capTag: { en: 'cap', de: 'Grenze' },
  meanTitle: { en: 'What it means for your build', de: 'Was das für deinen Build heißt' },
  mean1: {
    en: 'Up to the cap, crit chance gives most classes more than Critical Damage Boost. Above it, Critical Damage Boost and the other damage stats take over.',
    de: 'Bis zur Grenze bringt Krit-Chance den meisten Klassen mehr als Krit.-Schadensverstärkung. Darüber übernehmen Krit.-Schadensverstärkung und die anderen Schadenswerte.',
  },
  mean2: {
    en: 'Korean guides count with {k}: there {ck} above the resist still pay off, on Global only {c}. That is why their crit advice does not carry over.',
    de: 'Koreanische Guides rechnen mit {k}: Dort lohnen sich {ck} über dem Widerstand, auf Global nur {c}. Darum passen ihre Krit-Ratschläge nicht.',
  },
  mean3: {
    en: '{skill} ({cls}) always crits from skill level {lv}. That is why Gladiators gain more from Critical Damage Boost than from crit chance.',
    de: '{skill} ({cls}) trifft ab Fähigkeitsstufe {lv} immer kritisch. Darum bringt Gladiatoren Krit.-Schadensverstärkung mehr als Krit-Chance.',
  },
  mean4: {
    en: 'Extra crit chance on a single skill comes on top, but stops at the cap as well: on a skill that already crits at {g}, it is wasted.',
    de: 'Zusätzliche Krit-Chance auf einem einzelnen Skill kommt obendrauf, endet aber auch an der Grenze: Bei einem Skill, der schon zu {g} kritisch trifft, ist sie verschenkt.',
  },
  mean5: {
    en: 'Buffs only count while they run: {skill} ({cls}) gives +{n} Critical Hit for {s} s. Add it to your value for that time.',
    de: 'Buffs zählen nur, solange sie laufen: {skill} ({cls}) gibt {s} s lang +{n} Kritischer Treffer. Rechne das für diese Zeit auf deinen Wert.',
  },
  mean6: {
    en: 'For the Ludra raid on Global, MMO Herald guesses {lo}–{hi} Critical Hit; that is not confirmed yet.',
    de: 'Für den Ludra-Raid auf Global schätzt MMO Herald {lo}–{hi} Kritischer Treffer; bestätigt ist das noch nicht.',
  },
  sources: { en: 'Sources', de: 'Quellen' },
  srcDamage: {
    en: 'MMO Herald: how damage works (the curve, both caps, the Ludra estimate; model by kanonxo and Aion Research Lab)',
    de: 'MMO Herald: wie Schaden funktioniert (die Kurve, beide Grenzen, die Ludra-Schätzung; Modell von kanonxo und Aion Research Lab)',
  },
  srcWeights: { en: 'MMO Herald: stat weights (crit chance against crit damage)', de: 'MMO Herald: Gewichtung der Werte (Krit-Chance gegen Krit-Schaden)' },
  srcMetabot: {
    en: 'MetaBot: stats (the Global client’s tooltip: 50% at most, lowered by the target’s resist)',
    de: 'MetaBot: Werte (Tooltip des Global-Clients: höchstens 50 %, gesenkt durch den Widerstand des Ziels)',
  },
  srcNote: {
    en: 'Numbers only; the explanations here are our own. The {s} per 100 points is {p} over {g} points, as MMO Herald describes the curve. Skill values from this site’s skill data. As of {date}; a patch can change it.',
    de: 'Nur Zahlen; die Erklärungen hier sind eigene. Die {s} je 100 Punkte sind {p} auf {g} Punkte, wie MMO Herald die Kurve beschreibt. Skill-Werte aus den Skill-Daten dieser Seite. Stand {date}; ein Patch kann das ändern.',
  },
} satisfies Record<string, L>;

const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
const num = (v: number, lang: Lang, d = 0) => new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: d }).format(v);
/** "37.5%" / "37,5 %" */
const pct = (v: number, lang: Lang, d = 1) => `${num(v, lang, d)}${lang === 'de' ? ' %' : '%'}`;
/** "+563" / "−120" */
const signed = (v: number, lang: Lang) => (v ? `${v < 0 ? '−' : '+'}${num(Math.abs(v), lang)}` : '0');

const GAP_G = capGap('global');
const GAP_K = capGap('korea');
/** the table rows: gaps above the resist, with the two caps */
const ROWS = [0, 100, 200, 300, 400, 500, 600, 700, GAP_G, 800, 1000, GAP_K];

const STORE_KEY = 'crit:calc';
interface Inputs { crit: number; resist: number }
const DEFAULTS: Inputs = { crit: 500, resist: 0 };
const valid = (v: unknown, d: number) => {
  const x = Number(v);
  return Number.isFinite(x) ? Math.min(MAX_STAT, Math.max(0, Math.round(x))) : d;
};
function loadInputs(): Inputs {
  const s = storage.get<Partial<Inputs> | null>(STORE_KEY, null);
  return { crit: valid(s?.crit, DEFAULTS.crit), resist: valid(s?.resist, DEFAULTS.resist) };
}

/** the width of an element, followed while it changes */
function useWidth<E extends HTMLElement>() {
  const ref = useRef<E>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setW(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function StatInput({ id, label, hint, value, onChange }: { id: string; label: string; hint: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="cube-field crit-field">
      <label className="cube-label" htmlFor={id}>{label}</label>
      <div className="cube-opens">
        <input type="range" min={0} max={3000} step={10} value={Math.min(value, 3000)} onChange={(e) => onChange(Number(e.target.value))} aria-label={label} />
        <NumberField id={id} value={value} onChange={onChange} min={0} max={MAX_STAT} step={10} className="cube-opens-num" />
      </div>
      <p className="crit-hint">{hint}</p>
    </div>
  );
}

/** the curve for Global (gold) with Korea's for comparison (dashed), your value as a dot, a readout under the pointer */
function CritChart({ crit, resist, lang }: { crit: number; resist: number; lang: Lang }) {
  const [box, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const W = Math.max(width, 260);
  const H = W < 480 ? 220 : 260;
  const m = { l: 40, r: 14, t: 24, b: 34 };
  const xMax = Math.ceil(Math.max(resist + GAP_K + 150, crit + 150) / 500) * 500;
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const x = (v: number) => m.l + (Math.min(v, xMax) / xMax) * pw;
  const y = (p: number) => m.t + (1 - p / CAP.korea) * ph;
  const step = [250, 500, 1000, 2000].find((s) => xMax / s <= (W < 480 ? 4 : 7)) ?? 2500;
  const xTicks = Array.from({ length: Math.floor(xMax / step) + 1 }, (_, i) => i * step);
  const yTicks = [0, 25, CAP.global, CAP.korea];

  const startG = x(resist), capG = x(resist + GAP_G), capK = x(resist + GAP_K), end = x(xMax);
  const global = `M${m.l},${y(0)} H${startG} L${capG},${y(CAP.global)} H${end}`;
  const korea = `M${capG},${y(CAP.global)} L${capK},${y(CAP.korea)} H${end}`;
  const area = `${global} V${y(0)} Z`;
  const you = critChance(crit, resist);
  const yx = x(crit), yy = y(you);

  const onMove = (e: PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const v = Math.round((((e.clientX - r.left) / r.width) * xMax) / 10) * 10;
    setHover(Math.max(0, Math.min(xMax, v)));
  };
  const hx = hover == null ? 0 : x(hover);

  return (
    <div className="crit-chart" ref={box}>
      <ul className="crit-legend">
        <li><i className="sw-global" aria-hidden />{fill(T.legendGlobal[lang], { p: pct(CAP.global, lang, 0) })}</li>
        <li><i className="sw-korea" aria-hidden />{fill(T.legendKorea[lang], { p: pct(CAP.korea, lang, 0) })}</li>
        <li><i className="sw-you" aria-hidden />{fill(T.legendYou[lang], { v: `${num(crit, lang)} → ${pct(you, lang)}` })}</li>
      </ul>
      <div className="crit-plot">
        <svg
          width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img"
          aria-label={fill(T.chartLabel[lang], {
            r: num(resist, lang), g: pct(CAP.global, lang, 0), c: num(resist + GAP_G, lang), k: pct(CAP.korea, lang, 0), ck: num(resist + GAP_K, lang),
            v: num(crit, lang), p: pct(you, lang),
          })}
        >
          <defs>
            <linearGradient id="crit-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--gold)" stopOpacity=".22" />
              <stop offset="1" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {yTicks.map((p) => (
            <g key={p} className={`crit-grid ${p === CAP.global ? 'cap' : ''}`}>
              <line x1={m.l} x2={W - m.r} y1={y(p)} y2={y(p)} />
              <text x={m.l - 6} y={y(p)} dy="0.32em" textAnchor="end">{pct(p, lang, 0)}</text>
            </g>
          ))}
          {xTicks.map((v) => (
            <text key={v} className="crit-tick" x={x(v)} y={H - m.b + 16} textAnchor={v === 0 ? 'start' : v === xMax ? 'end' : 'middle'}>{num(v, lang)}</text>
          ))}
          <text className="crit-axis" x={W - m.r} y={H - 2} textAnchor="end">{T.axisX[lang]}</text>

          <path d={area} fill="url(#crit-area)" />
          <path d={korea} className="crit-korea" />
          <path d={global} className="crit-global" />
          <text className="crit-direct" x={end - 2} y={y(CAP.korea) - 6} textAnchor="end">Korea</text>
          <text className="crit-direct gold" x={end - 2} y={y(CAP.global) - 6} textAnchor="end">Global</text>

          <line className="crit-drop" x1={yx} x2={yx} y1={yy} y2={y(0)} />
          <circle className="crit-dot" cx={yx} cy={yy} r={5.5} />
          <text className="crit-you" x={yx} y={yy - 12} textAnchor={yx > W - 60 ? 'end' : yx < m.l + 30 ? 'start' : 'middle'}>{pct(you, lang)}</text>

          {hover != null && (
            <g className="crit-hover" aria-hidden>
              <line x1={hx} x2={hx} y1={m.t} y2={y(0)} />
              <circle cx={hx} cy={y(critChance(hover, resist))} r={4} />
              <circle cx={hx} cy={y(critChance(hover, resist, 'korea'))} r={3} className="k" />
            </g>
          )}
          <rect
            className="crit-hit" x={m.l} y={m.t} width={pw} height={ph}
            onPointerMove={onMove} onPointerDown={onMove} onPointerLeave={() => setHover(null)}
          />
        </svg>
        {hover != null && (
          <div className="crit-tip" style={{ left: Math.max(70, Math.min(W - 70, hx)) }} aria-hidden>
            <strong>{num(hover, lang)} {T.axisX[lang]}</strong>
            <span>Global {pct(critChance(hover, resist), lang)}</span>
            <span className="k">Korea {pct(critChance(hover, resist, 'korea'), lang)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CritCalc({ lang }: { lang: Lang }) {
  const [inp, setInp] = useState<Inputs>(loadInputs);
  const uid = useId();
  useEffect(() => { storage.set(STORE_KEY, inp); }, [inp]);
  const { crit, resist } = inp;
  const gap = crit - resist;
  const chance = critChance(crit, resist);
  const capAt = resist + GAP_G;
  const capped = chance >= CAP.global;
  return (
    <section className="card cube-calc" aria-labelledby={`${uid}-h`}>
      <h2 id={`${uid}-h`} className="cube-h2">{T.calcTitle[lang]}</h2>
      <div className="cube-calc-grid">
        <div className="cube-calc-in">
          <StatInput id={`${uid}-c`} label={T.crit[lang]} hint={T.critHint[lang]} value={crit} onChange={(v) => setInp((s) => ({ ...s, crit: v }))} />
          <StatInput id={`${uid}-r`} label={T.resist[lang]} hint={T.resistHint[lang]} value={resist} onChange={(v) => setInp((s) => ({ ...s, resist: v }))} />
        </div>
        <div className="cube-calc-out" aria-live="polite">
          <strong className="cube-big">{pct(chance, lang)}</strong>
          <span className="cube-big-label">{T.result[lang]}</span>
          <span className="crit-meter" aria-hidden><span style={{ width: `${(chance / CAP.global) * 100}%` }} /></span>
          <dl className="cube-calc-facts">
            <div><dt>{T.gap[lang]}</dt><dd>{signed(gap, lang)}</dd></div>
            <div><dt>{T.capAt[lang]}</dt><dd>{num(capAt, lang)}</dd></div>
            {capped
              ? <div><dt>{T.overCap[lang]}</dt><dd>{num(crit - capAt, lang)}</dd></div>
              : <div><dt>{T.toCap[lang]}</dt><dd>{num(capAt - crit, lang)}</dd></div>}
            <div><dt>{T.plus100[lang]}</dt><dd>{pct(critChance(crit + 100, resist), lang)}</dd></div>
          </dl>
          {capped && <p className="cube-calc-note"><Info size={13} aria-hidden /> <b>{T.atCap[lang]}</b></p>}
        </div>
      </div>
      <p className="cube-calc-note"><Info size={13} aria-hidden /> {T.calcNote[lang]}</p>

      <div className="crit-curve">
        <h3 className="cube-h3">{T.chartTitle[lang]}</h3>
        <p className="pet-text">
          {fill(T.chartIntro[lang], { s: pct(SLOPE * 100, lang), g: pct(CAP.global, lang, 0), c: num(GAP_G, lang), k: pct(CAP.korea, lang, 0) })}
        </p>
        <CritChart crit={crit} resist={resist} lang={lang} />
        <CurveTable crit={crit} resist={resist} lang={lang} />
      </div>
    </section>
  );
}

function CurveTable({ crit, resist, lang }: { crit: number; resist: number; lang: Lang }) {
  const gap = crit - resist;
  // the row the player is at: the last one at or below the gap
  const on = gap < 0 ? -1 : ROWS.reduce((at, g, i) => (g <= gap ? i : at), -1);
  return (
    <div className="table-wrap flat">
      <table className="table crit-table">
        <caption className="sr-only">{fill(T.tableCaption[lang], { r: num(resist, lang) })}</caption>
        <thead>
          <tr>
            <th scope="col">{T.colCrit[lang]}</th>
            <th scope="col">{T.colGap[lang]}</th>
            <th scope="col">{T.colGlobal[lang]}</th>
            <th scope="col">{T.colKorea[lang]}</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((g, i) => (
            <tr key={g} className={i === on ? 'on' : undefined}>
              <td>{num(resist + g, lang)}</td>
              <td>{signed(g, lang)}</td>
              <td className={g >= GAP_G ? 'cap' : undefined}>{pct(critChance(resist + g, resist), lang)}{g === GAP_G && <small>{T.capTag[lang]}</small>}</td>
              <td className={g >= GAP_K ? 'cap' : undefined}>{pct(critChance(resist + g, resist, 'korea'), lang)}{g === GAP_K && <small>{T.capTag[lang]}</small>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} <ExternalLink size={12} aria-hidden /></a>;
}

function SkillLink({ id }: { id: number }) {
  const { data } = useLoadedGame();
  return <a href={`#/database/${id}`}>{data.skillById.get(id)?.name ?? id}</a>;
}

/** a text with {skill} as a link to the skill in the database */
function WithSkill({ text, id, vars }: { text: string; id: number; vars: Record<string, string | number> }) {
  const [a, b = ''] = fill(text, vars).split('{skill}');
  return <>{a}<SkillLink id={id} />{b}</>;
}

export function CritPage(_: { param: string | null; visit: number }) {
  const { lang } = useLoadedGame();
  const className = useClassName();
  const date = fmtDate(SOURCES.date, lang);
  return (
    <div className="page crit-page">
      <PageHeader icon={<Crosshair size={22} />} title={T.title[lang]} subtitle={T.intro[lang]} />

      <dl className="cube-stats">
        <div><dt>{T.statCap[lang]}</dt><dd>{pct(CAP.global, lang, 0)}</dd></div>
        <div><dt>{T.statGap[lang]}</dt><dd>{num(GAP_G, lang)}</dd></div>
        <div><dt>{T.statSlope[lang]}</dt><dd>{pct(SLOPE * 100, lang)}</dd></div>
        <div><dt>{T.statKorea[lang]}</dt><dd>{pct(CAP.korea, lang, 0)}</dd></div>
      </dl>

      <div className="g-callout info">
        <Info size={18} aria-hidden />
        <div>
          <strong>{T.estTitle[lang]}</strong>
          <p>{T.estText[lang]}</p>
        </div>
      </div>

      <CritCalc lang={lang} />

      <section className="card pet-card" aria-labelledby="crit-mean-h">
        <h2 id="crit-mean-h" className="cube-h2">{T.meanTitle[lang]}</h2>
        <ul className="g-list">
          <li>{T.mean1[lang]}</li>
          <li>{fill(T.mean2[lang], { k: pct(CAP.korea, lang, 0), ck: num(GAP_K, lang), c: num(GAP_G, lang) })}</li>
          <li><WithSkill text={T.mean3[lang]} id={ALWAYS_CRITS.id} vars={{ skill: '{skill}', cls: className(ALWAYS_CRITS.cls), lv: ALWAYS_CRITS.from }} /></li>
          <li>{fill(T.mean4[lang], { g: pct(CAP.global, lang, 0) })}</li>
          <li><WithSkill text={T.mean5[lang]} id={CRIT_BUFF.id} vars={{ skill: '{skill}', cls: className(CRIT_BUFF.cls), n: CRIT_BUFF.plus, s: CRIT_BUFF.sec }} /></li>
          <li>{fill(T.mean6[lang], { lo: num(LUDRA_GLOBAL.lo, lang), hi: num(LUDRA_GLOBAL.hi, lang) })}</li>
        </ul>
      </section>

      <section className="cube-sources" aria-labelledby="crit-src-h">
        <h2 id="crit-src-h" className="cube-h3">{T.sources[lang]}</h2>
        <ul>
          <li><Ext href={SOURCES.damage}>{T.srcDamage[lang]}</Ext></li>
          <li><Ext href={SOURCES.weights}>{T.srcWeights[lang]}</Ext></li>
          <li><Ext href={SOURCES.metabot}>{T.srcMetabot[lang]}</Ext></li>
        </ul>
        <p className="muted small">
          {fill(T.srcNote[lang], { s: pct(SLOPE * 100, lang), p: pct(CURVE.pct, lang, 0), g: num(CURVE.gap, lang), date })}
        </p>
      </section>
    </div>
  );
}
