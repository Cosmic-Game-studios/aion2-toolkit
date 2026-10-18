import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Layers, Link2, RotateCcw } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { NumberField } from '../../components/ui';
import { Modal } from '../../components/Modal';
import { useMediaQuery } from '../../components/hooks';
import { storage } from '../../lib/storage';
import { CATEGORIES, CATEGORY_GROUPS, GROUP_NAMES, LIMITS, categoryById, isMobCategory, type SpotInput } from './farmRules';
import { categoryIcon, GROUP_COLOR } from './farmIcons';
import { fold, type JumpEntry } from './farmJump';
import { FarmSearch } from './FarmSearch';

/*
 * The farm map's filters: layer presets, categories per group (with their counts in the region, and how many of them
 * the player has found; a gathering category with several materials in the region lists them as well), a text search
 * that also offers places to jump to (FarmSearch), a level range for monsters and "only spots with a position"; the
 * page adds its progress block (found spots, "hide found") at the end. The state lives in storage under one key, so the
 * page opens with the filters the player left. Below FARM_MOBILE everything but the search moves into a bottom sheet
 * ("Layers & filters").
 */

/** The farm map's phone layout (styles.css, farm map sections): the map takes the width, the filters and the selected
 *  spot's card open as bottom sheets. */
export const FARM_MOBILE = '(max-width: 767px)';

/** Layer presets: the categories each one shows (every other one is switched off). */
const PRESETS: { id: 'all' | 'none' | 'collect' | 'gather' | 'travel'; cats: string[] }[] = [
  { id: 'all', cats: CATEGORIES.map((c) => c.id) },
  { id: 'none', cats: [] },
  { id: 'collect', cats: ['cube', 'trace'] },
  // every gathering node, not Odyle alone: the same trip picks up the ore and plants next to it
  { id: 'gather', cats: CATEGORIES.filter((c) => c.group === 'gather').map((c) => c.id) },
  { id: 'travel', cats: ['teleport', 'village', 'dungeon', 'stronghold'] },
];
const PRESET_LABEL = {
  all: 'farmPresetAll', none: 'farmPresetNone', collect: 'farmPresetCollect', gather: 'farmPresetGather', travel: 'farmPresetTravel',
} as const;

export interface FarmFilterState {
  /**
   * categories the player switched off (so a category added later shows by default), and materials of categories that
   * are on ("gem:ruby", matKey)
   */
  off: string[];
  q: string;
  /** level range for monsters, either order; the full range means no limit */
  lv: [number, number];
  /** only spots with a position on the region picture (applies only while the region has one) */
  onlyPos: boolean;
  /** hide the spots the player marked found (the page applies it: it knows what was found) */
  hideFound: boolean;
}

const [LV_MIN, LV_MAX] = LIMITS.level;
export const NO_FILTERS: FarmFilterState = { off: [], q: '', lv: [LV_MIN, LV_MAX], onlyPos: false, hideFound: false };
const FILTER_KEY = 'farm:filters';

const isLevel = (n: unknown): n is number => typeof n === 'number' && Number.isInteger(n) && n >= LV_MIN && n <= LV_MAX;

/**
 * A material switched off, as `off` and the address keep it: "<category>:<material>" ("gem:ruby"), the material folded
 * to letters, digits and dashes, so it fits the address as it is. A page from before materials drops these entries
 * (they are no category), and old values hold none: both keep working.
 */
const MAT_KEY = /^([a-z]+):([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const matKeys = new Map<string, string>();
export function matKey(cat: string, mat: string): string {
  const id = `${cat}|${mat}`;
  let k = matKeys.get(id);
  if (k === undefined) {
    k = `${cat}:${fold(mat).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
    matKeys.set(id, k);
  }
  return k;
}
/** a material entry of a gathering category (the only ones with materials) */
const isMatKey = (k: string) => {
  const m = MAT_KEY.exec(k);
  return !!m && categoryById(m[1])?.group === 'gather';
};
const catOfKey = (k: string) => (k.includes(':') ? k.slice(0, k.indexOf(':')) : null);
const isOffEntry = (c: unknown): c is string => typeof c === 'string' && (!!categoryById(c) || isMatKey(c));

function readFilters(): FarmFilterState {
  const raw = storage.get<Partial<Record<keyof FarmFilterState, unknown>> | null>(FILTER_KEY, null);
  if (!raw || typeof raw !== 'object') return NO_FILTERS;
  const lv = Array.isArray(raw.lv) && raw.lv.length === 2 && raw.lv.every(isLevel) ? [raw.lv[0], raw.lv[1]] as [number, number] : NO_FILTERS.lv;
  return {
    off: Array.isArray(raw.off) ? raw.off.filter(isOffEntry) : [],
    q: typeof raw.q === 'string' ? raw.q.slice(0, 100) : '',
    lv,
    onlyPos: raw.onlyPos === true,
    hideFound: raw.hideFound === true,
  };
}

/**
 * The categories a link names ("cube,trace"): known ids only, in the rules' order, then its materials ("gem:ruby") in
 * a fixed order; null without the parameter.
 */
export function parseCats(param: string | null): string[] | null {
  if (param == null) return null;
  const ids = new Set(param.split(',').map((s) => s.trim()));
  return [...CATEGORIES.filter((c) => ids.has(c.id)).map((c) => c.id), ...[...ids].filter(isMatKey).sort()];
}

/** Whether two category lists hold the same ids. */
export const sameCats = (a: readonly string[], b: readonly string[]) => {
  const s = new Set(a);
  return s.size === new Set(b).size && b.every((c) => s.has(c));
};

/** The filter state, kept in storage. */
export function useFarmFilters(): [FarmFilterState, (f: FarmFilterState) => void] {
  const [f, setF] = useState(readFilters);
  useEffect(() => { storage.set(FILTER_KEY, f); }, [f]);
  return [f, setF];
}

/** A spot as the filters take it: a gathering point of the Map Overlay also has its material. */
type FilterSpot = SpotInput & { mat?: string };

/** The text the list search looks at: name, material, area, drops and note (folded like the jump search, farmJump). */
export const searchText = (s: FilterSpot) => fold([s.name, s.mat, s.area, ...(s.drops ?? []), s.note].filter(Boolean).join(' '));

const levelRange = (f: FarmFilterState): [number, number] => (f.lv[0] <= f.lv[1] ? f.lv : [f.lv[1], f.lv[0]]);
const levelOn = (f: FarmFilterState) => { const [lo, hi] = levelRange(f); return lo > LV_MIN || hi < LV_MAX; };

/** The filters that change what is shown (the position filter only counts while the region has a picture). */
export function activeFilters(f: FarmFilterState, hasImage: boolean) {
  return { q: f.q.trim() !== '', cats: f.off.length > 0, level: levelOn(f), pos: hasImage && f.onlyPos, found: f.hideFound };
}

/** A test for one spot; `hay` is the spot's searchText (computed once per spot by the caller). */
export function spotFilter(f: FarmFilterState, hasImage: boolean): (s: FilterSpot, hay: string) => boolean {
  const off = new Set(f.off);
  const anyMat = f.off.some((k) => k.includes(':'));
  const terms = fold(f.q).split(/\s+/).filter(Boolean);
  const [lo, hi] = levelRange(f);
  const lvOn = levelOn(f);
  const posOn = hasImage && f.onlyPos;
  return (s, hay) => {
    if (off.has(s.cat)) return false;
    if (anyMat && s.mat && off.has(matKey(s.cat, s.mat))) return false;
    if (posOn && !s.pos) return false;
    // the range only applies to monsters; a monster without a level passes
    if (lvOn && s.level && isMobCategory(s.cat) && (s.level[0] > hi || s.level[1] < lo)) return false;
    // every word must appear somewhere, in any order
    return terms.every((w) => hay.includes(w));
  };
}

type T = ReturnType<typeof useGame>['t'];
/** "1 spot" / "12 spots" */
export const spotCount = (t: T, n: number) => (n === 1 ? t('farmFilterCountOne') : t('farmFilterCount', { n }));

/** A material of a category in the region: its name (the game's, the same in every language), entry and count. */
export interface MatCount { name: string; key: string; n: number }

export function FarmFilters({ value, onChange, onReset, counts, mats, found, hasImage, shown, total, linkCats, progress, jump }: {
  value: FarmFilterState;
  onChange: (f: FarmFilterState) => void;
  /** "Reset filters": every filter back to its default */
  onReset: () => void;
  /** spots per category in the region (approved and the player's drafts); null while the spots load */
  counts: Map<string, number> | null;
  /** per gathering category with more than one material in the region: its materials (null while the spots load) */
  mats: ReadonlyMap<string, MatCount[]> | null;
  /** per category: the spots found (the x of "x/y") and the spots that can be found, drafts not among them (the y);
   *  null while the spots load */
  found: { n: Map<string, number>; of: Map<string, number> } | null;
  /** the region has a map picture: only then the position filter exists */
  hasImage: boolean;
  /** spots shown and spots in the region, for the result line; null while the spots load */
  shown: number | null;
  total: number;
  /** the categories come from a link for this visit: keep them as the player's own, or go back to the saved ones */
  linkCats?: { onKeep: () => void; onDrop: () => void } | null;
  /** the page's progress block, at the end of the filters */
  progress?: ReactNode;
  /** the search's places to jump to: the index (null while the spots load), the region on screen, and the page's jump */
  jump: { index: readonly JumpEntry[] | null; region: string; onPick: (e: JumpEntry) => void };
}) {
  const { t, lang } = useGame();
  const mobile = useMediaQuery(FARM_MOBILE);
  const [sheet, setSheet] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  /** the first preset: the sheet opens at the top of its content (else Modal would pick the first checkbox under it) */
  const presetRef = useRef<HTMLButtonElement>(null);
  const uid = useId().replace(/:/g, '');
  const off = new Set(value.off);
  const active = activeFilters(value, hasImage);
  const anyActive = active.q || active.cats || active.level || active.pos || active.found;
  // the search stays on the page on phones, so the badge counts the filters in the sheet only
  const folded = Number(active.cats) + Number(active.level) + Number(active.pos) + Number(active.found);
  // the sheet belongs to the phone layout: a wider window shows the filters in their column again
  const sheetOpen = sheet && mobile;
  useEffect(() => { if (!mobile) setSheet(false); }, [mobile]);
  // the link notice goes away with either answer: the focus moves on to the search instead of falling to the page
  const linkAnswer = (fn: () => void) => {
    const had = !!linkRef.current?.contains(document.activeElement);
    fn();
    if (had) requestAnimationFrame(() => searchRef.current?.focus({ preventScroll: true }));
  };

  const set = (patch: Partial<FarmFilterState>) => onChange({ ...value, ...patch });
  // a category switched on or off shows or hides all of its materials: their own entries go
  const setCats = (cats: string[], on: boolean) => {
    const drop = new Set(cats);
    const next = new Set(value.off.filter((k) => !drop.has(catOfKey(k) ?? '')));
    for (const c of cats) { if (on) next.delete(c); else next.add(c); }
    set({ off: [...next] });
  };
  // one material on or off (`keys`: every material of the category in the region). The category goes off with its
  // last material, so "nothing of it" is always the category's own switch; a material switched on while its category
  // is off shows that material alone.
  const setMat = (cat: string, keys: string[], key: string, on: boolean) => {
    const next = new Set(value.off);
    if (next.has(cat)) {
      if (!on) return;
      next.delete(cat);
      for (const k of keys) if (k !== key) next.add(k);
      next.delete(key);
    } else if (on) next.delete(key);
    else {
      next.add(key);
      if (keys.every((k) => next.has(k))) {
        next.add(cat);
        for (const k of keys) next.delete(k);
      }
    }
    set({ off: [...next] });
  };

  const result = shown == null ? '' : shown === total ? spotCount(t, total) : t('farmFilterCountOf', { n: shown, total });
  const reset = (
    // stays in place when nothing is set (aria-disabled), so the focus is not lost after a reset
    <button
      type="button" className="btn ghost sm" aria-disabled={!anyActive}
      onClick={() => { if (anyActive) onReset(); }}
    >
      <RotateCcw size={14} aria-hidden /> {t('farmFilterReset')}
    </button>
  );

  // a preset shows its categories and switches every other one off; its name says which they are
  const catNames = (ids: string[]) => new Intl.ListFormat(lang, { type: 'conjunction' }).format(ids.map((id) => categoryById(id)?.name[lang] ?? id));
  const presets = (
    <div className="farm-presets" role="group" aria-labelledby={`${uid}-layers`}>
      <span className="farm-fgroup-name" id={`${uid}-layers`}><Layers size={14} aria-hidden />{t('farmPresets')}</span>
      <div className="farm-preset-row">
        {PRESETS.map((p, i) => {
          const presetOff = CATEGORIES.filter((c) => !p.cats.includes(c.id)).map((c) => c.id);
          // pressed (.btn.ghost draws it) while the categories are exactly the preset's, like the region chips, so the
          // player sees which layers are on; a press on a pressed preset changes nothing
          const on = sameCats(presetOff, value.off);
          return (
            <button
              key={p.id} ref={i === 0 ? presetRef : undefined} type="button" className="btn ghost sm"
              aria-pressed={on} onClick={() => set({ off: presetOff })}
            >
              {t(PRESET_LABEL[p.id])}
              <span className="sr-only">
                : {p.id === 'all' ? t('farmPresetAllSr') : p.id === 'none' ? t('farmPresetNoneSr') : t('farmPresetOnly', { cats: catNames(p.cats) })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const groups = CATEGORY_GROUPS.map((g) => {
    const cats = CATEGORIES.filter((c) => c.group === g);
    const allOn = cats.every((c) => !off.has(c.id));
    const name = GROUP_NAMES[g][lang];
    const headId = `${uid}-${g}`;
    return (
      <div key={g} className="farm-fgroup" role="group" aria-labelledby={headId} style={{ '--fc': GROUP_COLOR[g] } as CSSProperties}>
        <div className="farm-fgroup-head">
          <span className="farm-fgroup-name" id={headId}><span className="farm-dot" aria-hidden />{name}</span>
          <button
            type="button" className="farm-fgroup-all" onClick={() => setCats(cats.map((c) => c.id), !allOn)}
            aria-label={t(allOn ? 'farmFilterHideGroup' : 'farmFilterShowGroup', { group: name })}
          >
            {t(allOn ? 'farmFilterHideAll' : 'farmFilterShowAll')}
          </button>
        </div>
        <ul className="farm-cats">
          {cats.map((c) => {
            const Icon = categoryIcon(c.id);
            const n = counts?.get(c.id) ?? 0;
            // "found/all" once the category has spots that can be found (a category of drafts only shows its count);
            // all found shows in the colour of done as well as in the numbers
            const f = found?.n.get(c.id) ?? 0;
            const of = found?.of.get(c.id) ?? 0;
            const showFound = of > 0;
            const list = mats?.get(c.id);
            const catOn = !off.has(c.id);
            // some of its materials off: the category's box is half ticked, and a click on it shows every material
            const partial = catOn && !!list?.some((m) => off.has(m.key));
            return (
              <li key={c.id}>
                <label className={`farm-cat ${counts && !n ? 'zero' : ''} ${showFound && f >= of ? 'done' : ''}`}>
                  <input
                    type="checkbox" checked={catOn} ref={(el) => { if (el) el.indeterminate = partial; }}
                    onChange={(e) => setCats([c.id], partial || e.target.checked)}
                  />
                  <Icon size={15} aria-hidden className="farm-cat-ico" />
                  <span className="farm-cat-name">{c.name[lang]}</span>
                  {counts && (
                    <>
                      <span className="farm-cat-n" aria-hidden>{showFound ? `${f}/${of}` : n}</span>
                      {/* the same numbers as on screen */}
                      <span className="sr-only">, {showFound ? t('farmFoundOf', { n: f, of }) : spotCount(t, n)}</span>
                    </>
                  )}
                </label>
                {list && (
                  <ul className="farm-mats" aria-label={t('farmFilterMats', { cat: c.name[lang] })}>
                    {list.map((m) => (
                      <li key={m.key}>
                        <label className="farm-mat">
                          <input
                            type="checkbox" checked={catOn && !off.has(m.key)}
                            onChange={(e) => setMat(c.id, list.map((x) => x.key), m.key, e.target.checked)}
                          />
                          <span>{m.name}</span>
                          <span className="farm-cat-n" aria-hidden>{m.n}</span>
                          <span className="sr-only">, {spotCount(t, m.n)}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  const body = (
    <div className="farm-fbody">
      {presets}
      {groups}
      <div className="farm-level" role="group" aria-labelledby={`${uid}-lv`}>
        <span className="farm-fgroup-name" id={`${uid}-lv`}>{t('farmFilterLevel')}</span>
        <div className="farm-level-row">
          <NumberField value={value.lv[0]} min={LV_MIN} max={LV_MAX} onChange={(v) => set({ lv: [v, value.lv[1]] })} aria-label={t('farmFilterLevelFrom')} />
          <span aria-hidden>–</span>
          <NumberField value={value.lv[1]} min={LV_MIN} max={LV_MAX} onChange={(v) => set({ lv: [value.lv[0], v] })} aria-label={t('farmFilterLevelTo')} />
        </div>
        <p className="field-hint">{t('farmFilterLevelHint')}</p>
      </div>
      {hasImage && (
        <label className="toggle farm-onlypos">
          <input type="checkbox" checked={value.onlyPos} onChange={(e) => set({ onlyPos: e.target.checked })} />
          <span className="toggle-ui" />
          {t('farmFilterOnlyPos')}
        </label>
      )}
      {progress}
    </div>
  );

  return (
    <section className="farm-filters" aria-labelledby={`${uid}-title`}>
      <h2 className={mobile ? 'sr-only' : 'farm-h2'} id={`${uid}-title`}>{t('farmFilterTitle')}</h2>
      <FarmSearch value={value.q} onChange={(q) => set({ q })} inputRef={searchRef} index={jump.index} region={jump.region} onPick={jump.onPick} />
      <div className="farm-fline">
        {/* while the sheet is open its own line says the count (the page behind a dialog is out of reach) */}
        <span className="farm-result" role={sheetOpen ? undefined : 'status'} aria-live={sheetOpen ? undefined : 'polite'}>{result}</span>
        {reset}
      </div>
      {/* outside the fold: the player sees that a link, not their own choice, set the categories */}
      {linkCats && (
        <div className="farm-linkcats" ref={linkRef}>
          <p><Link2 size={15} aria-hidden /> <span>{t('farmLinkCats')}</span></p>
          <div className="farm-linkcats-actions">
            <button type="button" className="btn sm" onClick={() => linkAnswer(linkCats.onKeep)}>{t('farmLinkCatsKeep')}</button>
            <button type="button" className="btn ghost sm" onClick={() => linkAnswer(linkCats.onDrop)}>{t('farmLinkCatsDrop')}</button>
          </div>
        </div>
      )}
      {mobile ? (
        <>
          <button type="button" className="btn farm-sheet-btn" aria-haspopup="dialog" aria-expanded={sheetOpen} onClick={() => setSheet(true)}>
            <Layers size={16} aria-hidden /> {t('farmFilterSheet')}
            {folded > 0 && <><span className="count" aria-hidden>{folded}</span><span className="sr-only"> ({t('farmFilterActive', { n: folded })})</span></>}
          </button>
          {/* a dialog (Modal: focus trap, Esc, the focus back on the button); every change shows on the page at once */}
          <Modal
            open={sheetOpen}
            sheet
            className="farm-sheet farm-filter-sheet"
            title={t('farmFilterSheet')}
            description={t('farmFilterMore')}
            initialFocus={presetRef}
            onClose={() => setSheet(false)}
            footer={(
              <>
                <span className="farm-result" role="status" aria-live="polite">{result}</span>
                {reset}
                <button type="button" className="btn primary" onClick={() => setSheet(false)}>{t('farmFilterDone')}</button>
              </>
            )}
          >
            {body}
          </Modal>
        </>
      ) : body}
    </section>
  );
}
