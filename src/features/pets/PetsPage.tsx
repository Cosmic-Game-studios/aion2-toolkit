import { useEffect, useId, useState, type ReactNode } from 'react';
import { ArrowRight, Box, ExternalLink, Info, PawPrint, ScrollText } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import type { Lang } from '../../data/types';
import { NumberField, PageHeader } from '../../components/ui';
import { storage } from '../../lib/storage';
import { ANALYZE, COLLECTION, PET_GENERA, PET_LEVELS, PET_TITLES, SOURCES, type Genus, type L, type PetStat } from './petData';

const T = {
  title: { en: 'Pets', de: 'Haustiere' },
  intro: {
    en: 'What your pet collection gives in stats: all pets at level 3, or as many as you have – with souls, titles and crystals.',
    de: 'Was deine Haustier-Sammlung an Werten gibt: alle Haustiere auf Stufe 3 oder so viele, wie du hast – mit Seelen, Titeln und Kristallen.',
  },
  statPets: { en: 'pets: {a} with souls, {b} Special without stats', de: 'Haustiere: {a} mit Seelen, {b} Special ohne Werte' },
  statSouls: { en: 'souls for one pet at level 3', de: 'Seelen für ein Haustier auf Stufe 3' },
  statAll: { en: 'souls for all of them at level 3', de: 'Seelen für alle auf Stufe 3' },
  statMax: { en: 'is the max level on Global (Korea: 5)', de: 'ist auf Global die Höchststufe (Korea: 5)' },
  how: {
    en: 'Every pet gives small permanent stats of its genus, its Owned Effects. They work whichever pet you ride and add up over the whole collection. All pets of a genus give the same, so rarity adds nothing.',
    de: 'Jedes Haustier gibt kleine Dauerwerte seiner Gattung, seine Owned Effects. Sie wirken, egal welches du reitest, und addieren sich über die ganze Sammlung. Alle Haustiere einer Gattung geben dasselbe, Seltenheit bringt also nichts.',
  },
  calcTitle: { en: 'Your collection at level 3', de: 'Deine Sammlung auf Stufe 3' },
  calcIntro: {
    en: 'Set how many pets of each genus you have at level 3. This browser remembers it.',
    de: 'Stell ein, wie viele Haustiere jeder Gattung du auf Stufe 3 hast. Dieser Browser merkt es sich.',
  },
  allMax: { en: 'All at level 3', de: 'Alle auf Stufe 3' },
  allZero: { en: 'All to 0', de: 'Alle auf 0' },
  atL3: { en: 'pets at level 3', de: 'Haustiere auf Stufe 3' },
  of: { en: 'of {n}', de: 'von {n}' },
  ofMax: { en: 'of {v}', de: 'von {v}' },
  riding: { en: 'When riding, on top', de: 'Beim Reiten zusätzlich' },
  ridingTag: { en: 'riding', de: 'Reiten' },
  sumPets: { en: 'pets at level 3', de: 'Haustiere auf Stufe 3' },
  sumSouls: { en: 'souls in them', de: 'Seelen darin' },
  sumExp: { en: 'genus experience from them', de: 'Gattungs-Erfahrung daraus' },
  sumLeft: { en: 'souls at most until all are at level 3', de: 'Seelen höchstens, bis alle auf Stufe 3 sind' },
  calcNote: {
    en: 'Worked out, not measured in game. Pets below level 3 give part of it: which effect comes at level 1 and 2, the sources don’t say, so they are not counted here.',
    de: 'Gerechnet, nicht im Spiel gemessen. Haustiere unter Stufe 3 geben einen Teil davon: Welcher Wert auf Stufe 1 und 2 kommt, sagen die Quellen nicht, darum zählen sie hier nicht mit.',
  },
  generaTitle: { en: 'Per genus', de: 'Pro Gattung' },
  genus: { en: 'Genus', de: 'Gattung' },
  pets: { en: 'Pets', de: 'Haustiere' },
  onePet: { en: 'One pet at level 3', de: 'Ein Haustier auf Stufe 3' },
  allPets: { en: 'All at level 3', de: 'Alle auf Stufe 3' },
  noStats: { en: 'No genus stats', de: 'Keine Gattungs-Werte' },
  levelsTitle: { en: 'Levels and souls', de: 'Stufen und Seelen' },
  level: { en: 'Level', de: 'Stufe' },
  souls: { en: 'Souls', de: 'Seelen' },
  total: { en: 'Total', de: 'Gesamt' },
  exp: { en: 'Genus experience', de: 'Gattungs-Erfahrung' },
  gives: { en: 'What it gives', de: 'Was es bringt' },
  wide: {
    en: 'Wide first, then deep: a soul for a new pet gives its genus {a} experience, a soul for level 3 only {b}. Level 3 still pays off, because only then does the monster drop crystals.',
    de: 'Erst breit, dann tief: Eine Seele für ein neues Haustier bringt der Gattung {a} Erfahrung, eine Seele für Stufe 3 nur {b}. Stufe 3 lohnt sich trotzdem, denn erst dann lässt das Monster Kristalle fallen.',
  },
  titlesTitle: { en: 'The two pet titles', de: 'Die beiden Haustier-Titel' },
  titleCol: { en: 'Title', de: 'Titel' },
  need: { en: 'Condition', de: 'Bedingung' },
  equipped: { en: 'Equipped', de: 'Ausgerüstet' },
  owned: { en: 'Just owned', de: 'Nur besessen' },
  crystalsTitle: { en: 'Crystals and Analyze', de: 'Kristalle und Analyze' },
  analyze: {
    en: 'Pet levels come from souls. Soul Crystals pay for Analyze in Genus Insight: one roll costs {c} crystals of the genus (or rainbow crystals) and {k} Kina, rerolls all open lines and gives {e} genus experience per open line.',
    de: 'Die Stufen der Haustiere kommen aus Seelen. Soul Crystals bezahlen Analyze in der Genus Insight: Ein Wurf kostet {c} Kristalle der Gattung (oder Regenbogen-Kristalle) und {k} Kina, würfelt alle offenen Zeilen neu und gibt {e} Gattungs-Erfahrung pro offener Zeile.',
  },
  whereTitle: { en: 'Where crystals come from', de: 'Woher die Kristalle kommen' },
  where1: {
    en: 'Collection rewards in the pet window: with all 207 pets {c} Soul Crystals and {d} Empathy Candy, enough for {r} rolls.',
    de: 'Sammel-Belohnungen im Haustier-Fenster: mit allen 207 Haustieren {c} Soul Crystals und {d} Empathy Candy, genug für {r} Würfe.',
  },
  where2: { en: 'The monster of a pet at level 3 drops crystals of its genus.', de: 'Das Monster eines Haustiers auf Stufe 3 lässt Kristalle seiner Gattung fallen.' },
  where3: { en: 'Duty quests, hidden cubes and the Shugo Festival shop: crystals of every colour.', de: 'Duty Quests, versteckte Würfel und der Shugo-Festival-Shop: Kristalle aller Farben.' },
  cubesLink: { en: 'What a hidden cube gives', de: 'Was ein versteckter Würfel gibt' },
  cubesLinkNote: { en: 'with a key 1,000 Soul Crystals, enough for {r} rolls', de: 'mit Schlüssel 1.000 Soul Crystals, genug für {r} Würfe' },
  guideTitle: { en: 'What to do with it', de: 'Was du damit machst' },
  guideText: {
    en: 'Which genus first, what to roll for, when to lock and what the top players ride: that is in the pets guide.',
    de: 'Welche Gattung zuerst, worauf du würfelst, wann du sperrst und was die Top-Spieler reiten: Das steht im Haustier-Guide.',
  },
  guideLink: { en: 'Read the pets guide', de: 'Haustier-Guide lesen' },
  sources: { en: 'Sources', de: 'Quellen' },
  srcNote: {
    en: 'Numbers only; the explanations here are our own. Titles as of 15 Oct 2026. Values can change with patches.',
    de: 'Nur Zahlen; die Erklärungen hier sind eigene. Titel Stand 15. Oktober 2026. Werte können sich mit Patches ändern.',
  },
} satisfies Record<string, L>;

const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
const num = (v: number, lang: Lang, d = 1) => new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: d }).format(v);

/** "+1,230", "−13.8%": a signed stat value */
function statValue(v: number, unit: PetStat['unit'], lang: Lang) {
  const sign = v < 0 ? '−' : '+';
  const s = num(Math.abs(v), lang, 1);
  return unit === '%' ? `${sign}${s}${lang === 'de' ? ' %' : '%'}` : `${sign}${s}`;
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

const WITH_SOULS = PET_GENERA.filter((g) => g.perPet.length);
const SPECIAL = PET_GENERA.filter((g) => !g.perPet.length).reduce((s, g) => s + g.pets, 0);
const SOULS_PER_PET = PET_LEVELS.reduce((s, l) => s + l.souls, 0);
const EXP_PER_PET = PET_LEVELS.reduce((s, l) => s + l.exp, 0);
const MAX_PETS = WITH_SOULS.reduce((s, g) => s + g.pets, 0);
/** the combat stats in a fixed order (biggest total first), so the tiles don't jump while you change the counts */
const COMBAT = WITH_SOULS
  .flatMap((g) => g.perPet.filter((x) => !x.riding).map((x) => ({ genus: g.id, x, max: x.v * g.pets })))
  .sort((a, b) => b.max - a.max);
const RIDING = WITH_SOULS.flatMap((g) => g.perPet.filter((x) => x.riding).map((x) => ({ genus: g.id, x })));

type Counts = Partial<Record<Genus, number>>;
const FULL: Counts = Object.fromEntries(WITH_SOULS.map((g) => [g.id, g.pets]));
const STORE_KEY = 'pets:level3';

function loadCounts(): Counts {
  const saved = storage.get<Counts>(STORE_KEY, FULL);
  return Object.fromEntries(WITH_SOULS.map((g) => {
    const v = Number(saved?.[g.id]);
    return [g.id, Number.isFinite(v) ? Math.min(g.pets, Math.max(0, Math.round(v))) : g.pets];
  }));
}

function CollectionCalc({ lang }: { lang: Lang }) {
  const [counts, setCounts] = useState<Counts>(loadCounts);
  const uid = useId();
  useEffect(() => { storage.set(STORE_KEY, counts); }, [counts]);
  const set = (g: Genus, v: number) => setCounts((c) => ({ ...c, [g]: v }));
  const at = (g: Genus) => counts[g] ?? 0;
  const pets = WITH_SOULS.reduce((s, g) => s + at(g.id), 0);
  return (
    <section className="card pet-calc" aria-labelledby={`${uid}-h`}>
      <div className="pet-calc-head">
        <h2 id={`${uid}-h`} className="cube-h2">{T.calcTitle[lang]}</h2>
        <div className="pet-presets">
          <button type="button" className="btn ghost sm" onClick={() => setCounts(FULL)} disabled={pets === MAX_PETS}>{T.allMax[lang]}</button>
          <button type="button" className="btn ghost sm" onClick={() => setCounts(Object.fromEntries(WITH_SOULS.map((g) => [g.id, 0])))} disabled={pets === 0}>{T.allZero[lang]}</button>
        </div>
      </div>
      <p className="muted">{T.calcIntro[lang]}</p>

      <div className="pet-inputs">
        {WITH_SOULS.map((g) => (
          <div key={g.id} className={`pet-input g-${g.id}`}>
            <label htmlFor={`${uid}-${g.id}`}><span className="genus-dot" aria-hidden />{g.name}</label>
            <input type="range" min={0} max={g.pets} value={at(g.id)} onChange={(e) => set(g.id, Number(e.target.value))} aria-label={`${g.name}: ${T.atL3[lang]}`} />
            <NumberField id={`${uid}-${g.id}`} value={at(g.id)} onChange={(v) => set(g.id, v)} min={0} max={g.pets} className="pet-input-num" />
            <span className="pet-of">{fill(T.of[lang], { n: g.pets })}</span>
          </div>
        ))}
      </div>

      <div className="pet-result" aria-live="polite">
        <ul className="pet-totals">
          {COMBAT.map(({ genus, x, max }) => {
            const v = x.v * at(genus);
            return (
              <li key={x.stat.en} className={`g-${genus} ${v ? '' : 'zero'}`}>
                <strong>{statValue(v, x.unit, lang)}</strong>
                <span>{x.stat[lang]}</span>
                {v !== max && <small>{fill(T.ofMax[lang], { v: statValue(max, x.unit, lang) })}</small>}
                <i className="pet-fill" style={{ width: `${(v / max) * 100}%` }} aria-hidden />
              </li>
            );
          })}
        </ul>
        <p className="muted small">{T.riding[lang]}: {RIDING.map(({ genus, x }) => `${x.stat[lang]} ${statValue(x.v * at(genus), x.unit, lang)}`).join(' · ')}</p>
        <dl className="pet-sum">
          <div><dt>{T.sumPets[lang]}</dt><dd>{num(pets, lang, 0)}<small> / {num(MAX_PETS, lang, 0)}</small></dd></div>
          <div><dt>{T.sumSouls[lang]}</dt><dd>{num(pets * SOULS_PER_PET, lang, 0)}</dd></div>
          <div><dt>{T.sumExp[lang]}</dt><dd>+{num(pets * EXP_PER_PET, lang, 0)}</dd></div>
          <div><dt>{T.sumLeft[lang]}</dt><dd>{num((MAX_PETS - pets) * SOULS_PER_PET, lang, 0)}</dd></div>
        </dl>
      </div>
      <p className="cube-calc-note"><Info size={13} aria-hidden /> {T.calcNote[lang]}</p>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} <ExternalLink size={12} aria-hidden /></a>;
}

export function PetsPage(_: { param: string | null; visit: number }) {
  const { lang } = useGame();
  const rolls = (crystals: number) => num(Math.floor(crystals / ANALYZE.crystals), lang, 0);
  const [l1, , l3] = PET_LEVELS;
  return (
    <div className="page pets-page">
      <PageHeader icon={<PawPrint size={22} />} title={T.title[lang]} subtitle={T.intro[lang]} />

      <dl className="cube-stats">
        <div><dt>{fill(T.statPets[lang], { a: MAX_PETS, b: SPECIAL })}</dt><dd>{MAX_PETS + SPECIAL}</dd></div>
        <div><dt>{T.statSouls[lang]}</dt><dd>{SOULS_PER_PET}</dd></div>
        <div><dt>{T.statAll[lang]}</dt><dd>{num(MAX_PETS * SOULS_PER_PET, lang, 0)}</dd></div>
        <div><dt>{T.statMax[lang]}</dt><dd>{lang === 'de' ? 'Stufe 3' : 'Level 3'}</dd></div>
      </dl>

      <div className="g-callout info">
        <Info size={18} aria-hidden />
        <div><p>{T.how[lang]}</p></div>
      </div>

      <CollectionCalc lang={lang} />

      <section className="card pet-card" aria-labelledby="pet-genera-h">
        <h2 id="pet-genera-h" className="cube-h2">{T.generaTitle[lang]}</h2>
        <div className="table-wrap flat">
          <table className="table pet-genera">
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
                <tr key={g.id} className={`g-${g.id}`}>
                  <th scope="row"><span className="genus-dot" aria-hidden />{g.name}</th>
                  <td data-label={T.pets[lang]}>{g.pets}</td>
                  <td data-label={T.onePet[lang]}>{g.perPet.length ? <StatLines stats={g.perPet} times={1} lang={lang} /> : T.noStats[lang]}</td>
                  <td data-label={T.allPets[lang]}>{g.perPet.length ? <StatLines stats={g.perPet.filter((x) => !x.riding)} times={g.pets} lang={lang} /> : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card pet-card" aria-labelledby="pet-levels-h">
        <h2 id="pet-levels-h" className="cube-h2">{T.levelsTitle[lang]}</h2>
        <div className="table-wrap flat">
          <table className="table pet-levels">
            <thead>
              <tr>
                <th scope="col">{T.level[lang]}</th>
                <th scope="col">{T.souls[lang]}</th>
                <th scope="col">{T.total[lang]}</th>
                <th scope="col">{T.exp[lang]}</th>
                <th scope="col">{T.gives[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {PET_LEVELS.map((l, i) => (
                <tr key={l.level}>
                  <th scope="row" data-label={T.level[lang]}>{l.level}</th>
                  <td data-label={T.souls[lang]}>{i ? '+' : ''}{l.souls}</td>
                  <td data-label={T.total[lang]}>{PET_LEVELS.slice(0, i + 1).reduce((s, x) => s + x.souls, 0)}</td>
                  <td data-label={T.exp[lang]}>+{num(l.exp, lang, 0)}</td>
                  <td data-label={T.gives[lang]}>{l.gives[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="pet-text">{fill(T.wide[lang], { a: num(l1.exp / l1.souls, lang, 1), b: num(l3.exp / l3.souls, lang, 1) })}</p>
      </section>

      <section className="card pet-card" aria-labelledby="pet-titles-h">
        <h2 id="pet-titles-h" className="cube-h2">{T.titlesTitle[lang]}</h2>
        <ul className="pet-titles">
          {PET_TITLES.map((t) => (
            <li key={t.name}>
              <strong>{t.name}</strong>
              <span className="pet-need">{t.need[lang]}</span>
              <dl>
                <div><dt>{T.equipped[lang]}</dt><dd>{t.equipped.map((x) => <span key={x.en}>{x[lang]}</span>)}</dd></div>
                <div><dt>{T.owned[lang]}</dt><dd><span>{t.owned[lang]}</span></dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className="card pet-card" aria-labelledby="pet-crystals-h">
        <h2 id="pet-crystals-h" className="cube-h2">{T.crystalsTitle[lang]}</h2>
        <p className="pet-text">{fill(T.analyze[lang], { c: ANALYZE.crystals, k: num(ANALYZE.kina, lang, 0), e: ANALYZE.expPerLine })}</p>
        <div className="cube-global-grid">
          <div>
            <h3 className="cube-h3">{T.whereTitle[lang]}</h3>
            <ul className="g-list">
              <li>{fill(T.where1[lang], { c: num(COLLECTION.crystals, lang, 0), d: COLLECTION.candy, r: rolls(COLLECTION.crystals) })}</li>
              <li>{T.where2[lang]}</li>
              <li>{T.where3[lang]}</li>
            </ul>
            <a className="btn cube-map-link" href="#/cubes">
              <Box size={16} aria-hidden />
              <span>{T.cubesLink[lang]}<small>{fill(T.cubesLinkNote[lang], { r: rolls(1000) })}</small></span>
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
          <div>
            <h3 className="cube-h3">{T.guideTitle[lang]}</h3>
            <p className="pet-text">{T.guideText[lang]}</p>
            <a className="btn cube-map-link" href="#/guides/pets">
              <ScrollText size={16} aria-hidden />
              <span>{T.guideLink[lang]}</span>
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className="cube-sources" aria-labelledby="pet-src-h">
        <h2 id="pet-src-h" className="cube-h3">{T.sources[lang]}</h2>
        <ul>
          {SOURCES.map((s) => <li key={s.href}><Ext href={s.href}>{s.label}</Ext></li>)}
        </ul>
        <p className="muted small">{T.srcNote[lang]}</p>
      </section>
    </div>
  );
}
