import { useId, useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, Box, ChevronDown, Coins, ExternalLink, Info, KeyRound, Map as MapIcon, PawPrint, Sparkles, Swords, TrendingUp, type LucideIcon } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import type { Lang } from '../../data/types';
import { NumberField, PageHeader, Segmented } from '../../components/ui';
import { fmtDate } from '../../lib/format';
import {
  ACHIEVEMENT_TIERS, ANALYZE, GODSTONE_TIERS, KEY_SOURCES, MAPS, PET_GENERA, PET_GENUS_EXP, PET_SOULS, PET_TITLE, REWARDS, SOURCE, TARGETS,
  atLeastOnce, avgPerOpening, chanceOf, opensFor, type Cat, type Genus, type GlobalHas, type L, type Mode, type PetStat, type Reward, type Roll,
} from './cubeData';

/** the page's own texts (item names live in cubeData) */
const T = {
  title: { en: 'Hidden Cubes', de: 'Versteckte Würfel' },
  intro: {
    en: 'What a hidden cube gives and how often, with and without a key – from NCSOFT’s official probability list.',
    de: 'Was ein versteckter Würfel gibt und wie oft, mit und ohne Schlüssel – nach NCSOFTs offizieller Wahrscheinlichkeitsliste.',
  },
  statCubes: { en: 'cubes on 4 maps (Global)', de: 'Würfel auf 4 Karten (Global)' },
  statKeyOnly: { en: 'of them open only with a key', de: 'davon nur mit Schlüssel' },
  statDouble: { en: 'odds for wings, skins and emote with a key', de: 'Chance auf Flügel, Skins und Emote mit Schlüssel' },
  statWings: { en: 'Radiant Love Wings per keyed opening', de: 'Radiant Love Wings pro Öffnung mit Schlüssel' },
  korea: { en: 'Official odds for Korea', de: 'Offizielle Chancen für Korea' },
  koreaText: {
    en: 'The percentages are NCSOFT’s published list for the Korean service, as of {date}. NCSOFT publishes none for Global (NA/EU): there the opening window in the game shows the odds. Every line says whether Global has the reward and what is different there.',
    de: 'Die Prozente sind NCSOFTs veröffentlichte Liste für den koreanischen Dienst, Stand {date}. Für Global (NA/EU) veröffentlicht NCSOFT keine: Dort zeigt das Öffnen-Fenster im Spiel die Chancen. Jede Zeile sagt, ob Global die Belohnung auch hat und was dort anders ist.',
  },
  howTitle: { en: 'How a cube pays', de: 'So zahlt ein Würfel' },
  how1: { en: 'Every line rolls on its own. One opening can pay many lines at once.', de: 'Jede Zeile würfelt für sich. Eine Öffnung kann viele Zeilen auf einmal zahlen.' },
  how2: { en: 'A line pays one item of its list. Over 100%, it pays once per full 100% and rolls the rest.', de: 'Eine Zeile zahlt ein Teil aus ihrer Liste. Über 100 % zahlt sie einmal je volle 100 % und würfelt den Rest.' },
  how3: { en: 'A key opens the key table: more of everything and double odds on the rare looks.', de: 'Ein Schlüssel öffnet die Schlüssel-Tabelle: mehr von allem und doppelte Chance auf die seltenen Optiken.' },
  tableTitle: { en: 'What is inside', de: 'Was drin ist' },
  show: { en: 'Show', de: 'Zeigen' },
  all: { en: 'All rewards', de: 'Alle Belohnungen' },
  globalOnly: { en: 'Also on Global', de: 'Auch auf Global' },
  reward: { en: 'Reward', de: 'Belohnung' },
  noKey: { en: 'Without key', de: 'Ohne Schlüssel' },
  withKey: { en: 'With key', de: 'Mit Schlüssel' },
  keyOnly: { en: 'key only', de: 'nur mit Schlüssel' },
  times: { en: '{a}–{b} times', de: '{a}–{b} Mal' },
  gYes: { en: 'Global', de: 'Global' },
  gPart: { en: 'Global: partly', de: 'Global: teils' },
  gNo: { en: 'Korea only', de: 'nur Korea' },
  item: { en: 'Item', de: 'Teil' },
  amount: { en: 'Amount', de: 'Menge' },
  inLine: { en: 'Share of the line', de: 'Anteil der Zeile' },
  perOpen: { en: 'Per opening', de: 'Pro Öffnung' },
  avg: { en: 'On average per opening', de: 'Im Schnitt pro Öffnung' },
  godTiers: { en: 'The 34 godstones by share of the line', de: 'Die 34 Godstones nach Anteil der Zeile' },
  godTier: { en: '{n} kinds at {p} each', de: '{n} Sorten zu je {p}' },
  krNames: { en: 'Names of Korea-only items are translated from the Korean list.', de: 'Namen von Teilen, die es nur in Korea gibt, sind aus der koreanischen Liste übersetzt.' },
  calcTitle: { en: 'How many cubes until …?', de: 'Wie viele Würfel bis …?' },
  calcTarget: { en: 'What you want', de: 'Was du willst' },
  calcMode: { en: 'Opened', de: 'Geöffnet' },
  calcOpens: { en: 'Cubes opened', de: 'Geöffnete Würfel' },
  calcResult: { en: 'chance of at least one in {n} cubes', de: 'Chance auf mindestens eins in {n} Würfeln' },
  calcPer: { en: 'per cube', de: 'pro Würfel' },
  calc50: { en: 'for a 50% chance', de: 'für 50 % Chance' },
  calc90: { en: 'for a 90% chance', de: 'für 90 % Chance' },
  calcAvg: { en: 'on average every', de: 'im Schnitt jeder' },
  cubesN: { en: '{n} cubes', de: '{n} Würfel' },
  cubeNth: { en: '{n} cube', de: '{n}. Würfel' },
  calcNoNormal: { en: 'Not in the table without a key.', de: 'Nicht in der Tabelle ohne Schlüssel.' },
  calcNote: {
    en: 'Uses the Korean odds. Global’s may differ: there the opening window shows them.',
    de: 'Rechnet mit den koreanischen Chancen. Auf Global können sie anders sein: Dort zeigt sie das Öffnen-Fenster.',
  },
  calcKrOnly: { en: 'Not on Global.', de: 'Gibt es auf Global nicht.' },
  globalTitle: { en: 'On Global (NA/EU)', de: 'Auf Global (NA/EU)' },
  globalIntro: {
    en: 'From the Global client data as MetaBot reads it: where the cubes are, which need a key and where keys come from.',
    de: 'Aus den Daten des Global-Clients, wie MetaBot sie ausliest: wo die Würfel stehen, welche einen Schlüssel brauchen und woher Schlüssel kommen.',
  },
  map: { en: 'Map', de: 'Karte' },
  faction: { en: 'Faction', de: 'Fraktion' },
  cubes: { en: 'Cubes', de: 'Würfel' },
  spots: { en: 'Possible spots', de: 'Mögliche Orte' },
  key: { en: 'Key', de: 'Schlüssel' },
  keyNeeded: { en: 'always', de: 'immer' },
  keyFree: { en: 'free, or with a key for the key table', de: 'frei, oder mit Schlüssel für die Schlüssel-Tabelle' },
  facts: { en: 'Good to know', de: 'Gut zu wissen' },
  fact1: { en: 'Opening takes 4 seconds; clear the monsters around it first.', de: 'Öffnen dauert 4 Sekunden; räum die Monster drumherum vorher weg.' },
  fact2: { en: 'A cube opens once, for whoever is first, then it is gone.', de: 'Ein Würfel öffnet sich einmal, für den Ersten, dann ist er weg.' },
  fact3: { en: 'It comes back at another spot of its group. The client data has no timer for it.', de: 'Er kommt an einem anderen Ort seiner Gruppe wieder. Die Client-Daten haben keinen Timer dafür.' },
  fact4: { en: '15 cubes sit in water: check riverbeds and lakeshores.', de: '15 Würfel liegen im Wasser: Flussbetten und Seeufer absuchen.' },
  fact5: { en: 'Neither cubes nor spots show on the game’s map or minimap.', de: 'Weder Würfel noch Orte stehen auf der Karte oder Minikarte des Spiels.' },
  keysTitle: { en: 'Where keys come from', de: 'Woher Schlüssel kommen' },
  keysNote: {
    en: 'The key (“Key: Hidden Cube”) is bound to the character, cannot be traded and stacks to 100.',
    de: 'Der Schlüssel („Key: Hidden Cube“) ist an den Charakter gebunden, nicht handelbar und stapelt bis 100.',
  },
  source: { en: 'Source', de: 'Quelle' },
  keys: { en: 'Keys', de: 'Schlüssel' },
  achv: { en: 'Achievement tiers (cubes opened)', de: 'Erfolgsstufen (geöffnete Würfel)' },
  mapLink: { en: 'Cube spots on the map', de: 'Würfel-Orte auf der Karte' },
  mapLinkNote: { en: 'Verteron and Altgard, from the AION2 Interactive Map data', de: 'Verteron und Altgard, aus den Daten der AION2 Interactive Map' },
  petsTitle: { en: 'All pets at level 3: what it brings', de: 'Alle Haustiere auf Stufe 3: was das bringt' },
  petsIntro: {
    en: 'Every pet gives small permanent stats of its genus, whichever one you ride, and they add up over the whole collection. Level 3 is the max on Global. Here is what all pets together give at level 3 – worked out, not measured in the game.',
    de: 'Jedes Haustier gibt kleine Dauerwerte seiner Gattung, egal welches du reitest, und die addieren sich über die ganze Sammlung. Stufe 3 ist auf Global die Höchststufe. Hier, was alle Haustiere zusammen auf Stufe 3 geben – gerechnet, nicht im Spiel gemessen.',
  },
  petsCount: { en: 'pets with souls, plus {n} Special pets without stats', de: 'Haustiere mit Seelen, dazu {n} Special-Haustiere ohne Werte' },
  petsSouls: { en: 'souls for all of them at level 3 ({n} per pet)', de: 'Seelen für alle auf Stufe 3 ({n} pro Haustier)' },
  petsExp: { en: 'genus experience per pet at level 3 (Genus Insight)', de: 'Gattungs-Erfahrung pro Haustier auf Stufe 3 (Genus Insight)' },
  petsRolls: { en: 'Analyze rolls from 1,000 Soul Crystals, what one keyed cube gives', de: 'Analyze-Würfe aus 1.000 Soul Crystals, so viel wie ein Schlüssel-Würfel gibt' },
  petsAll: { en: 'Everything together', de: 'Alles zusammen' },
  genus: { en: 'Genus', de: 'Gattung' },
  pets: { en: 'Pets', de: 'Haustiere' },
  onePet: { en: 'One pet at level 3', de: 'Ein Haustier auf Stufe 3' },
  allPets: { en: 'All at level 3', de: 'Alle auf Stufe 3' },
  noStats: { en: 'No genus stats', de: 'Keine Gattungs-Werte' },
  riding: { en: 'When riding, on top', de: 'Beim Reiten zusätzlich' },
  ridingTag: { en: 'riding', de: 'Reiten' },
  petsMore: { en: 'What else level 3 gives', de: 'Was Stufe 3 sonst noch gibt' },
  petsMore1: { en: 'Transformation: Empathy Candy turns you into the pet for 5 minutes.', de: 'Verwandlung: Empathy Candy verwandelt dich 5 Minuten lang in das Haustier.' },
  petsMore2: { en: 'Its monster now drops crystals.', de: 'Sein Monster lässt jetzt Kristalle fallen.' },
  petsMore3: { en: 'Level 2 already lets you glide on the pet.', de: 'Gleiten mit dem Haustier geht schon ab Stufe 2.' },
  petsTitleLine: {
    en: 'Title {name} for {n} pets (any level): equipped {eq}; just owned {owned}.',
    de: 'Titel {name} für {n} Haustiere (egal welche Stufe): ausgerüstet {eq}; nur besessen {owned}.',
  },
  petsCubes: { en: 'What the cubes have to do with it', de: 'Was die Würfel damit zu tun haben' },
  petsCubesText: {
    en: 'Pet levels come from souls, not from the cubes. The Soul Crystals from the cubes pay for Analyze in Genus Insight: one roll costs {c} crystals and {k} Kina, so the 1,000 crystals of a keyed cube pay for {r} rolls.',
    de: 'Die Stufen der Haustiere kommen aus Seelen, nicht aus den Würfeln. Die Soul Crystals aus den Würfeln bezahlen Analyze in der Genus Insight: Ein Wurf kostet {c} Kristalle und {k} Kina, die 1.000 Kristalle eines Schlüssel-Würfels reichen also für {r} Würfe.',
  },
  petsWide: {
    en: 'Wide first, then deep: a new pet gives its genus 500 experience for 5 souls, levels 2 and 3 together 500 for 100 souls.',
    de: 'Erst breit, dann tief: Ein neues Haustier gibt seiner Gattung 500 Erfahrung für 5 Seelen, Stufe 2 und 3 zusammen 500 für 100 Seelen.',
  },
  petsGuide: { en: 'Everything about pets in the pets guide', de: 'Alles zu Haustieren im Haustier-Guide' },
  srcPets: { en: 'Pets: daevaguides and aion2builds (stats, souls, experience), MetaBot titles guide', de: 'Haustiere: daevaguides und aion2builds (Werte, Seelen, Erfahrung), MetaBot-Titel-Guide' },
  sources: { en: 'Sources', de: 'Quellen' },
  srcNc: { en: 'NCSOFT probability list (Korea): hidden cubes, Elyos and Asmodian pages', de: 'NCSOFT-Wahrscheinlichkeitsliste (Korea): versteckte Würfel, Seiten Elyos und Asmodier' },
  srcMb: { en: 'MetaBot: hidden cube page (Global client data)', de: 'MetaBot: Seite zu versteckten Würfeln (Daten des Global-Clients)' },
  srcMbGuide: { en: 'MetaBot: hidden cube guide', de: 'MetaBot: Guide zu versteckten Würfeln' },
  srcNote: {
    en: 'Numbers only; the explanations here are our own. All 20 cube types of the Korean list share the same two tables.',
    de: 'Nur Zahlen; die Erklärungen hier sind eigene. Alle 20 Würfeltypen der koreanischen Liste teilen dieselben zwei Tabellen.',
  },
} satisfies Record<string, L>;

const CAT_ICON: Record<Cat, LucideIcon> = { growth: TrendingUp, combat: Swords, material: Coins, look: Sparkles };

function fill(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
}

/** "0.25%" / "0,25 %": more digits for the small ones, never more than 3 significant */
export function pct(p: number, lang: Lang) {
  const digits = p >= 10 ? 1 : p >= 1 ? 2 : p >= 0.1 ? 2 : 3;
  const s = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: digits, maximumSignificantDigits: p >= 100 ? undefined : 3 }).format(p);
  return lang === 'de' ? `${s} %` : `${s}%`;
}
const num = (v: number, lang: Lang, d = 1) => new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: d }).format(v);
/** "21st" in English; German writes the dot in the text ("21.") */
const nth = (v: number, lang: Lang) => {
  if (lang === 'de') return num(v, lang, 0);
  const suffix = { one: 'st', two: 'nd', few: 'rd', other: 'th' }[new Intl.PluralRules('en-US', { type: 'ordinal' }).select(v) as 'one' | 'two' | 'few' | 'other'];
  return `${num(v, lang, 0)}${suffix}`;
};

/** width of a chance bar: log scale from 0.01% (empty) to 100% (full) */
const barW = (p: number) => `${Math.round(Math.min(1, Math.max(0.03, (Math.log10(Math.max(p, 0.01)) + 2) / 4)) * 100)}%`;

const range = (lo: number, hi: number, lang: Lang) => (lo === hi ? num(lo, lang, 0) : `${num(lo, lang, 0)}–${num(hi, lang, 0)}`);
const qtyText = (roll: Roll, lang: Lang) => range(Math.min(...roll.picks.map((p) => p.lo)), Math.max(...roll.picks.map((p) => p.hi)), lang);

function GlobalBadge({ has, lang }: { has: GlobalHas; lang: Lang }) {
  const label = has === 'yes' ? T.gYes : has === 'part' ? T.gPart : T.gNo;
  return <span className={`cube-g cube-g-${has}`}>{label[lang]}</span>;
}

function Chance({ roll, lang, label }: { roll?: Roll; lang: Lang; label: string }) {
  if (!roll) return <div className="cube-cell none"><span className="cube-cell-label">{label}</span>–</div>;
  const p = Math.min(100, chanceOf(roll));
  const whole = Math.floor(roll.chance / 100);
  const multi = roll.chance > 100;
  return (
    <div className="cube-cell">
      <span className="cube-cell-label">{label}</span>
      <strong className={p >= 100 ? 'sure' : p < 1 ? 'rare' : ''}>{pct(p, lang)}</strong>
      <span className="cube-qty">
        {qtyText(roll, lang)}
        {multi && <> · {fill(T.times[lang], { a: whole, b: whole + (roll.chance % 100 ? 1 : 0) })}</>}
      </span>
      <span className="cube-bar" aria-hidden><span style={{ width: barW(p) }} /></span>
    </div>
  );
}

function Details({ r, lang, id }: { r: Reward; lang: Lang; id: string }) {
  const rows = (r.key ?? r.normal)!.picks.map((p, i) => ({ p, n: r.normal?.picks[i], k: r.key?.picks[i] }));
  return (
    <div className="cube-details" id={id}>
      <div className="table-wrap flat">
        <table className="table cube-items">
          <thead>
            <tr>
              <th scope="col">{T.item[lang]}</th>
              <th scope="col">{T.inLine[lang]}</th>
              <th scope="col">{T.noKey[lang]}</th>
              <th scope="col">{T.withKey[lang]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, n, k }) => (
              <tr key={p.name.en}>
                <th scope="row">
                  <span className="cube-item-name">{p.name[lang]}</span>
                  {p.global === false && r.global !== 'no' && <span className="cube-g cube-g-no">{T.gNo[lang]}</span>}
                </th>
                <td>{n && k && Math.abs(n.share - k.share) > 1e-6 ? `${pct(n.share, lang)} / ${pct(k.share, lang)}` : pct(p.share, lang)}</td>
                <td>{n && r.normal ? <>{pct(chanceOf(r.normal, (x) => x === n), lang)}<small>{range(n.lo, n.hi, lang)}</small></> : '–'}</td>
                <td>{k && r.key ? <>{pct(chanceOf(r.key, (x) => x === k), lang)}<small>{range(k.lo, k.hi, lang)}</small></> : '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {r.id === 'godstone' && (
        <div className="cube-tiers">
          <span>{T.godTiers[lang]}</span>
          <div className="chips">
            {GODSTONE_TIERS.map(([count, share]) => <span key={share} className="chip">{fill(T.godTier[lang], { n: count, p: pct(share, lang) })}</span>)}
          </div>
        </div>
      )}
      {r.cat !== 'look' && (
        <p className="cube-avg">
          {T.avg[lang]}: {r.normal && <>{T.noKey[lang]} <b>{num(avgPerOpening(r.normal), lang, 2)}</b></>}
          {r.normal && r.key && ' · '}
          {r.key && <>{T.withKey[lang]} <b>{num(avgPerOpening(r.key), lang, 2)}</b></>}
        </p>
      )}
    </div>
  );
}

function RewardRow({ r, lang }: { r: Reward; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const id = `cube-${useId().replace(/:/g, '')}`;
  const Icon = CAT_ICON[r.cat];
  return (
    <li className={`cube-row ${open ? 'open' : ''}`}>
      <button type="button" className="cube-head" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className={`cube-cat cat-${r.cat}`} aria-hidden><Icon size={16} /></span>
        <span className="cube-name">
          <strong>{r.name[lang]}</strong>
          <span className="cube-sub">
            <GlobalBadge has={r.global} lang={lang} />
            {!r.normal && <span className="cube-g cube-g-key"><KeyRound size={11} aria-hidden />{T.keyOnly[lang]}</span>}
            {r.note && <span className="cube-note">{r.note[lang]}</span>}
          </span>
          {r.globalNote && <span className="cube-gnote">{r.globalNote[lang]}</span>}
        </span>
        <Chance roll={r.normal} lang={lang} label={T.noKey[lang]} />
        <Chance roll={r.key} lang={lang} label={T.withKey[lang]} />
        <ChevronDown size={16} className="cube-chev" aria-hidden />
      </button>
      {open && <Details r={r} lang={lang} id={id} />}
    </li>
  );
}

function OddsCalculator({ lang }: { lang: Lang }) {
  const [targetId, setTargetId] = useState('radiant');
  const [mode, setMode] = useState<Mode>('key');
  const [opens, setOpens] = useState(100);
  const uid = useId();
  const target = TARGETS.find((x) => x.id === targetId)!;
  const reward = REWARDS.find((r) => r.id === target.reward)!;
  const roll = mode === 'key' ? reward.key : reward.normal;
  const p = roll ? Math.min(100, chanceOf(roll, target.pick)) : 0;
  const total = atLeastOnce(p, opens);
  return (
    <section className="card cube-calc" aria-labelledby={`${uid}-h`}>
      <h2 id={`${uid}-h`} className="cube-h2">{T.calcTitle[lang]}</h2>
      <div className="cube-calc-grid">
        <div className="cube-calc-in">
          <div className="cube-field">
            <span className="cube-label" id={`${uid}-t`}>{T.calcTarget[lang]}</span>
            <div className="chips" role="radiogroup" aria-labelledby={`${uid}-t`}>
              {TARGETS.map((x) => (
                <button key={x.id} type="button" role="radio" aria-checked={x.id === targetId} className={`chip ${x.id === targetId ? 'on' : ''}`} onClick={() => setTargetId(x.id)}>
                  {x.name[lang]}
                </button>
              ))}
            </div>
          </div>
          <div className="cube-field">
            <span className="cube-label">{T.calcMode[lang]}</span>
            <Segmented<Mode> value={mode} onChange={setMode} label={T.calcMode[lang]} options={[{ value: 'normal', label: T.noKey[lang] }, { value: 'key', label: <><KeyRound size={14} aria-hidden />{T.withKey[lang]}</> }]} />
          </div>
          <div className="cube-field">
            <label className="cube-label" htmlFor={`${uid}-n`}>{T.calcOpens[lang]}</label>
            <div className="cube-opens">
              <input type="range" min={1} max={1000} value={opens} onChange={(e) => setOpens(Number(e.target.value))} aria-label={T.calcOpens[lang]} />
              <NumberField id={`${uid}-n`} value={opens} onChange={setOpens} min={1} max={100000} className="cube-opens-num" />
            </div>
          </div>
        </div>
        <div className="cube-calc-out" aria-live="polite">
          {roll ? (
            <>
              {/* never round a near-certain chance up to a sure one */}
              <strong className="cube-big">{total < 100 && total >= 99.95 ? `> ${pct(99.9, lang)}` : pct(total, lang)}</strong>
              <span className="cube-big-label">{fill(T.calcResult[lang], { n: num(opens, lang, 0) })}</span>
              <dl className="cube-calc-facts">
                <div><dt>{T.calcPer[lang]}</dt><dd>{pct(p, lang)}</dd></div>
                <div><dt>{T.calc50[lang]}</dt><dd>{fill(T.cubesN[lang], { n: num(opensFor(p, 50), lang, 0) })}</dd></div>
                <div><dt>{T.calc90[lang]}</dt><dd>{fill(T.cubesN[lang], { n: num(opensFor(p, 90), lang, 0) })}</dd></div>
                <div><dt>{T.calcAvg[lang]}</dt><dd>{fill(T.cubeNth[lang], { n: nth(Math.round(100 / p), lang) })}</dd></div>
              </dl>
            </>
          ) : (
            <p className="cube-big-label">{T.calcNoNormal[lang]}</p>
          )}
          <p className="cube-calc-note"><Info size={13} aria-hidden /> {T.calcNote[lang]}{!target.global && <> <b>{T.calcKrOnly[lang]}</b></>}</p>
        </div>
      </div>
    </section>
  );
}

/** "+1,230", "−13.8%": a signed stat value */
function statValue(v: number, unit: PetStat['unit'], lang: Lang) {
  const sign = v < 0 ? '−' : '+';
  const s = num(Math.abs(v), lang, 1);
  return unit === '%' ? `${sign}${s}${lang === 'de' ? '\u202f%' : '%'}` : `${sign}${s}`;
}
function StatLines({ stats, times, lang }: { stats: PetStat[]; times: number; lang: Lang }) {
  return (
    <ul className="pet-lines">
      {stats.map((x) => (
        <li key={x.stat.en} className={x.riding ? 'ride' : undefined}>
          {x.stat[lang]} <b>{statValue(x.v * times, x.unit, lang)}</b>{x.riding && <small>{T.ridingTag[lang]}</small>}
        </li>
      ))}
    </ul>
  );
}

function PetsSection({ lang }: { lang: Lang }) {
  const withSouls = PET_GENERA.filter((g) => g.perPet.length);
  const petCount = withSouls.reduce((s, g) => s + g.pets, 0);
  const special = PET_GENERA.find((g) => g.id === 'special')?.pets ?? 0;
  const soulsPerPet = PET_SOULS.reduce((a, b) => a + b, 0);
  const expPerPet = PET_GENUS_EXP.reduce((a, b) => a + b, 0);
  // every combat stat once, with its total and genus, biggest first
  const totals = withSouls
    .flatMap((g) => g.perPet.filter((x) => !x.riding).map((x) => ({ genus: g.id, stat: x.stat, total: x.v * g.pets, unit: x.unit })))
    .sort((a, b) => b.total - a.total);
  const ridingTotals = withSouls.flatMap((g) => g.perPet.filter((x) => x.riding).map((x) => ({ ...x, v: x.v * g.pets })));
  return (
    <section className="card cube-pets" aria-labelledby="cube-pets-h">
      <h2 id="cube-pets-h" className="cube-h2"><PawPrint size={20} aria-hidden /> {T.petsTitle[lang]}</h2>
      <p className="muted">{T.petsIntro[lang]}</p>

      <dl className="cube-stats pets">
        <div><dt>{fill(T.petsCount[lang], { n: special })}</dt><dd>{petCount}</dd></div>
        <div><dt>{fill(T.petsSouls[lang], { n: soulsPerPet })}</dt><dd>{num(petCount * soulsPerPet, lang, 0)}</dd></div>
        <div><dt>{T.petsExp[lang]}</dt><dd>+{num(expPerPet, lang, 0)}</dd></div>
        <div><dt>{T.petsRolls[lang]}</dt><dd>{num(1000 / ANALYZE.crystals, lang, 0)}</dd></div>
      </dl>

      <h3 className="cube-h3">{T.petsAll[lang]}</h3>
      <ul className="pet-totals">
        {totals.map((x) => (
          <li key={x.stat.en} className={`g-${x.genus}`}>
            <strong>{statValue(x.total, x.unit, lang)}</strong>
            <span>{x.stat[lang]}</span>
          </li>
        ))}
      </ul>
      <p className="muted small">{T.riding[lang]}: {ridingTotals.map((x) => `${x.stat[lang]} ${statValue(x.v, x.unit, lang)}`).join(' · ')}</p>

      <div className="table-wrap flat">
        <table className="table cube-genera">
          <thead>
            <tr>
              <th scope="col">{T.genus[lang]}</th>
              <th scope="col">{T.pets[lang]}</th>
              <th scope="col">{T.onePet[lang]}</th>
              <th scope="col">{T.allPets[lang]}</th>
            </tr>
          </thead>
          <tbody>
            {PET_GENERA.map((g) => (
              <tr key={g.id}>
                <th scope="row"><span className={`genus-dot g-${g.id as Genus}`} aria-hidden />{g.name}</th>
                <td data-label={T.pets[lang]}>{g.pets}</td>
                <td data-label={T.onePet[lang]}>{g.perPet.length ? <StatLines stats={g.perPet} times={1} lang={lang} /> : T.noStats[lang]}</td>
                <td data-label={T.allPets[lang]}>{g.perPet.length ? <StatLines stats={g.perPet.filter((x) => !x.riding)} times={g.pets} lang={lang} /> : '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cube-global-grid">
        <div>
          <h3 className="cube-h3">{T.petsMore[lang]}</h3>
          <ul className="g-list">
            <li>{T.petsMore1[lang]}</li>
            <li>{T.petsMore2[lang]}</li>
            <li>{T.petsMore3[lang]}</li>
            <li>{fill(T.petsTitleLine[lang], { name: PET_TITLE.name, n: PET_TITLE.pets, eq: PET_TITLE.equipped.map((x) => x[lang]).join(', '), owned: PET_TITLE.owned[lang] })}</li>
          </ul>
        </div>
        <div>
          <h3 className="cube-h3">{T.petsCubes[lang]}</h3>
          <p className="cube-pets-text">{fill(T.petsCubesText[lang], { c: ANALYZE.crystals, k: num(ANALYZE.kina, lang, 0), r: num(1000 / ANALYZE.crystals, lang, 0) })}</p>
          <p className="cube-pets-text muted">{T.petsWide[lang]}</p>
          <a className="btn cube-map-link" href="#/guides/pets"><PawPrint size={16} aria-hidden /><span>{T.petsGuide[lang]}</span><ArrowRight size={16} aria-hidden /></a>
        </div>
      </div>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} <ExternalLink size={12} aria-hidden /></a>;
}

export function CubesPage(_: { param: string | null; visit: number }) {
  const { lang } = useGame();
  const [scope, setScope] = useState<'all' | 'global'>('all');
  const rewards = useMemo(() => (scope === 'global' ? REWARDS.filter((r) => r.global !== 'no') : REWARDS), [scope]);
  const date = fmtDate(SOURCE.date, lang);
  const wingsKey = chanceOf(REWARDS.find((r) => r.id === 'wings')!.key, (p) => p.name.en === 'Radiant Love Wings');
  const total = MAPS.reduce((s, m) => s + m.cubes, 0);
  const keyOnly = MAPS.filter((m) => m.key === 'only').reduce((s, m) => s + m.cubes, 0);

  return (
    <div className="page cubes-page">
      <PageHeader icon={<Box size={22} />} title={T.title[lang]} subtitle={T.intro[lang]} />

      <dl className="cube-stats">
        <div><dt>{T.statCubes[lang]}</dt><dd>{total}</dd></div>
        <div><dt>{T.statKeyOnly[lang]}</dt><dd>{keyOnly}</dd></div>
        <div><dt>{T.statDouble[lang]}</dt><dd>×2</dd></div>
        <div><dt>{T.statWings[lang]}</dt><dd>{pct(wingsKey, lang)}</dd></div>
      </dl>

      <div className="g-callout info">
        <Info size={18} aria-hidden />
        <div>
          <strong>{T.korea[lang]}</strong>
          <p>{fill(T.koreaText[lang], { date })}</p>
        </div>
      </div>

      <section className="card cube-table" aria-labelledby="cube-table-h">
        <div className="cube-table-head">
          <h2 id="cube-table-h" className="cube-h2">{T.tableTitle[lang]}</h2>
          <Segmented<'all' | 'global'> value={scope} onChange={setScope} label={T.show[lang]} options={[{ value: 'all', label: T.all[lang] }, { value: 'global', label: T.globalOnly[lang] }]} />
        </div>
        <ol className="cube-how" aria-label={T.howTitle[lang]}>
          <li>{T.how1[lang]}</li>
          <li>{T.how2[lang]}</li>
          <li>{T.how3[lang]}</li>
        </ol>
        <div className="cube-cols" aria-hidden>
          <span>{T.reward[lang]}</span>
          <span>{T.noKey[lang]}</span>
          <span><KeyRound size={12} /> {T.withKey[lang]}</span>
        </div>
        <ul className="cube-list">
          {rewards.map((r) => <RewardRow key={r.id} r={r} lang={lang} />)}
        </ul>
        <p className="cube-foot muted small">{T.krNames[lang]}</p>
      </section>

      <OddsCalculator lang={lang} />

      <PetsSection lang={lang} />

      <section className="card cube-global" aria-labelledby="cube-global-h">
        <h2 id="cube-global-h" className="cube-h2">{T.globalTitle[lang]}</h2>
        <p className="muted">{T.globalIntro[lang]}</p>
        <div className="table-wrap flat">
          <table className="table cube-maps">
            <thead>
              <tr>
                <th scope="col">{T.map[lang]}</th>
                <th scope="col">{T.faction[lang]}</th>
                <th scope="col">{T.cubes[lang]}</th>
                <th scope="col">{T.spots[lang]}</th>
                <th scope="col">{T.key[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {MAPS.map((m) => (
                <tr key={m.name.en}>
                  <th scope="row">{m.name[lang]}</th>
                  <td>{m.faction[lang]}</td>
                  <td>{m.cubes}</td>
                  <td>{num(m.spots, lang, 0)}</td>
                  <td>{m.key === 'only' ? <span className="cube-g cube-g-key"><KeyRound size={11} aria-hidden />{T.keyNeeded[lang]}</span> : T.keyFree[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cube-global-grid">
          <div>
            <h3 className="cube-h3">{T.facts[lang]}</h3>
            <ul className="g-list">
              <li>{T.fact1[lang]}</li>
              <li>{T.fact2[lang]}</li>
              <li>{T.fact3[lang]}</li>
              <li>{T.fact4[lang]}</li>
              <li>{T.fact5[lang]}</li>
            </ul>
            <a className="btn cube-map-link" href="#/farm">
              <MapIcon size={16} aria-hidden />
              <span>{T.mapLink[lang]}<small>{T.mapLinkNote[lang]}</small></span>
            </a>
          </div>
          <div>
            <h3 className="cube-h3">{T.keysTitle[lang]}</h3>
            <p className="muted small">{T.keysNote[lang]}</p>
            <div className="table-wrap flat">
              <table className="table cube-keys">
                <thead><tr><th scope="col">{T.source[lang]}</th><th scope="col">{T.keys[lang]}</th></tr></thead>
                <tbody>
                  {KEY_SOURCES.map((k) => <tr key={k.what.en}><td>{k.what[lang]}</td><td>{k.keys[lang]}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="cube-tiers">
              <span>{T.achv[lang]}</span>
              <div className="chips">{ACHIEVEMENT_TIERS.map((n) => <span key={n} className="chip">{n}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cube-sources" aria-labelledby="cube-src-h">
        <h2 id="cube-src-h" className="cube-h3">{T.sources[lang]}</h2>
        <ul>
          <li><Ext href={SOURCE.ncUrl}>{T.srcNc[lang]}</Ext> · {date}</li>
          <li><Ext href={SOURCE.metabotPage}>{T.srcMb[lang]}</Ext></li>
          <li><Ext href={SOURCE.metabotGuide}>{T.srcMbGuide[lang]}</Ext></li>
          <li><Ext href="https://daevaguides.com/en/guides/pets-genus-insight/">{T.srcPets[lang]}</Ext></li>
        </ul>
        <p className="muted small">{T.srcNote[lang]}</p>
      </section>
    </div>
  );
}
