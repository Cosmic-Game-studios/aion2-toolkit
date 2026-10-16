import { useId, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Check, Crosshair, MapPin, MapPinOff, Save } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { Modal } from '../../components/Modal';
import {
  CATEGORIES, CATEGORY_GROUPS, GROUP_NAMES, LIMITS, REGIONS, categoryById, checkSpot, cleanText, isMobCategory,
  type Region, type SpotError, type SpotInput,
} from './farmRules';
import { GROUP_COLOR, categoryIcon } from './farmIcons';
import { useFarmSpots } from './farmData';
import { lastNick, newCid, rememberNick, useFarmDrafts } from './farmDrafts';

export interface SpotFormProps {
  open: boolean;
  onClose: () => void;
  region: Region;
  /** editing a draft (it has a cid) or coming back from picking a position */
  initial?: Partial<SpotInput>;
  /** only when region.image exists: the page closes the form, lets the player pick and reopens it with the position */
  onPickPosition?: (current: Partial<SpotInput>) => void;
  onSave: (spot: SpotInput) => void;
}

/** The fields as typed; checkSpot cleans them on save. */
interface Values {
  cat: string;
  name: string;
  pos: [number, number] | null;
  area: string;
  levelMin: string;
  levelMax: string;
  drops: string;
  note: string;
  by: string;
}

interface FormState {
  values: Values;
  /** the draft's cid when editing, else a new one */
  cid: string;
  editing: boolean;
  own: boolean;
  /** a save was tried: errors show (and follow the typing) from then on */
  tried: boolean;
  /** back from picking a position: "Change" takes the focus instead of the category */
  back: boolean;
  /** the nickname the form opened with (kept across picking): an edit remembers the nickname only if it changed */
  initialBy: string;
}

/** What the form keeps across the trip to the map. */
type Kept = Pick<FormState, 'own' | 'initialBy'>;

type Field = 'cat' | 'name' | 'pos' | 'area' | 'level' | 'drops' | 'note' | 'by' | 'own';
/** form order: the first invalid field gets the focus */
const FIELDS: Field[] = ['cat', 'name', 'pos', 'area', 'level', 'drops', 'note', 'by', 'own'];

/** counters show from this share of a limit on */
const NEAR = 0.8;
const MAX_NAME_SUGGESTIONS = 100;

const LEVEL_DIGITS = /^[0-9]+$/;
const parseLevel = (s: string): number | null => {
  const v = s.trim();
  return !v ? null : LEVEL_DIGITS.test(v) ? Number(v) : NaN;
};
/** one level typed: both ends are that level; text that is no whole number makes checkSpot refuse it */
function levelOf(v: Values): number[] | undefined {
  const lo = parseLevel(v.levelMin);
  const hi = parseLevel(v.levelMax);
  if (lo == null && hi == null) return undefined;
  return [lo ?? hi ?? NaN, hi ?? lo ?? NaN];
}
const NEWLINE = String.fromCharCode(10);
/** one drop per line or separated by commas */
const splitDrops = (s: string) => s.split(NEWLINE).flatMap((line) => line.split(',')).map((x) => x.trim()).filter(Boolean);

function valuesFrom(initial: Partial<SpotInput> | undefined, editing: boolean): Values {
  return {
    cat: initial?.cat && categoryById(initial.cat) ? initial.cat : '',
    name: initial?.name ?? '',
    pos: initial?.pos ?? null,
    area: initial?.area ?? '',
    levelMin: initial?.level ? String(initial.level[0]) : '',
    levelMax: initial?.level ? String(initial.level[1]) : '',
    drops: initial?.drops?.join(NEWLINE) ?? '',
    note: initial?.note ?? '',
    // a new spot starts with the last nickname; a draft or a form coming back from picking keeps its own
    by: editing || (initial && 'by' in initial) ? initial?.by ?? '' : lastNick(),
  };
}

function stateFrom(initial: Partial<SpotInput> | undefined, kept: Kept | null): FormState {
  const editing = !!initial?.cid;
  const values = valuesFrom(initial, editing);
  return {
    values,
    cid: initial?.cid ?? newCid(),
    editing,
    // a saved draft was confirmed already; coming back from picking keeps the tick as it was
    own: kept?.own ?? editing,
    tried: false,
    back: kept != null,
    initialBy: kept?.initialBy ?? values.by,
  };
}

/** What checkSpot gets: level and drops only for monsters (the fields are hidden for the other categories). */
function candidate(v: Values, cid: string, region: string): Record<string, unknown> {
  const x: Record<string, unknown> = { cid, region, cat: v.cat, name: v.name, area: v.area, note: v.note, by: v.by };
  if (v.pos) x.pos = v.pos;
  if (isMobCategory(v.cat)) {
    const level = levelOf(v);
    if (level) x.level = level;
    const drops = splitDrops(v.drops);
    if (drops.length) x.drops = drops;
  }
  return x;
}

/** checkSpot says "link" for the whole spot: one probe per field finds the field(s) with the link. */
function linkFields(v: Values): Field[] {
  const hasLink = (extra: Record<string, unknown>) => {
    const res = checkSpot({ cid: 'probe0', region: REGIONS[0].id, cat: 'mob', name: 'x', area: 'x', ...extra });
    return !res.ok && res.errors.includes('link');
  };
  const out: Field[] = [];
  if (hasLink({ name: v.name })) out.push('name');
  if (hasLink({ area: v.area })) out.push('area');
  if (isMobCategory(v.cat) && hasLink({ drops: splitDrops(v.drops).slice(0, LIMITS.drops) })) out.push('drops');
  if (hasLink({ note: v.note })) out.push('note');
  if (hasLink({ by: v.by })) out.push('by');
  return out;
}

type Translate = ReturnType<typeof useGame>['t'];

/** The error text per field (and one for the whole form) for checkSpot's codes and the "own" tick. */
function errorsOf(result: ReturnType<typeof checkSpot>, own: boolean, v: Values, hasImage: boolean, t: Translate) {
  const out: Partial<Record<Field | 'form', string>> = {};
  const put = (f: Field | 'form', msg: string) => { out[f] ??= msg; };
  const tooLong = (n: number) => t('farmFormErrTooLong', { n });
  const codes: SpotError[] = result.ok ? [] : result.errors;
  for (const code of codes) {
    switch (code) {
      case 'cat': put('cat', t('farmFormErrCat')); break;
      case 'name': {
        // checkSpot refuses a name that is too long, empty after cleaning, or without a letter or digit ("...", "★")
        const name = cleanText(v.name);
        put('name', name.length > LIMITS.name ? tooLong(LIMITS.name) : name ? t('farmFormErrNameLetters') : t('farmFormErrName'));
        break;
      }
      case 'pos': put('pos', t('farmFormErrPos')); break;
      case 'area': put('area', tooLong(LIMITS.area)); break;
      // with a map picture either one will do; the text field is where most players fix it
      case 'where': put('area', hasImage ? t('farmFormErrWhere') : t('farmFormErrWhereText')); break;
      case 'level': put('level', t('farmFormErrLevel', { min: LIMITS.level[0], max: LIMITS.level[1] })); break;
      case 'drops': put('drops', t('farmFormErrDrops', { n: LIMITS.drops, m: LIMITS.drop })); break;
      case 'note': put('note', tooLong(LIMITS.note)); break;
      case 'by': put('by', tooLong(LIMITS.by)); break;
      case 'link': for (const f of linkFields(v)) put(f, t('farmFormErrLink')); break;
      case 'mobOnly': put('cat', t('farmFormErrMobOnly')); break;
      // cid, region, format: nothing the player typed
      default: put('form', t('farmFormErrOther'));
    }
  }
  if (!own) put('own', t('farmFormErrOwn'));
  return out;
}

/** "54 / 60 characters", shown once a field gets close to its limit */
function Counter({ id, n, max, unit }: { id: string; n: number; max: number; unit: string }) {
  if (n < max * NEAR) return null;
  return <span id={id} className={`ff-count ${n > max ? 'over' : ''}`}>{n} / {max}<span className="sr-only"> {unit}</span></span>;
}

export function SpotForm({ open, onClose, region, initial, onPickPosition, onSave }: SpotFormProps) {
  const { t, lang } = useGame();
  const uid = useId().replace(/:/g, '');
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(() => stateFrom(initial, null));
  // the form goes away while the player picks a position on the map; when it comes back the tick stays
  const [picking, setPicking] = useState(false);

  // a fresh form from `initial` every time it opens; while open, new props do not touch what the player typed
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      // only the spot that went to the map comes back with its tick (the page may open another one meanwhile);
      // current() has a cid only when editing, so a new spot comes back without one
      const same = (initial?.cid ?? null) === (form.editing ? form.cid : null);
      setForm(stateFrom(initial, picking && same ? { own: form.own, initialBy: form.initialBy } : null));
      setPicking(false);
    }
  }

  const { values: v, cid, editing, own, tried, back } = form;
  const set = <K extends keyof Values>(key: K, value: Values[K]) => setForm((f) => ({ ...f, values: { ...f.values, [key]: value } }));
  const mob = isMobCategory(v.cat);
  const hasImage = !!region.image;

  // names already used in this category (approved spots and drafts): this region's first
  const [spots] = useFarmSpots();
  const approved = spots.state === 'ok' ? spots.spots : null;
  const { drafts } = useFarmDrafts();
  const names = useMemo(() => {
    if (!v.cat) return [];
    const seen = new Map<string, { name: string; here: boolean }>();
    for (const s of [...(approved ?? []), ...drafts]) {
      if (s.cat !== v.cat) continue;
      const key = s.name.toLocaleLowerCase();
      const here = s.region === region.id || !!seen.get(key)?.here;
      seen.set(key, { name: seen.get(key)?.name ?? s.name, here });
    }
    return [...seen.values()]
      .sort((a, b) => Number(b.here) - Number(a.here) || a.name.localeCompare(b.name, lang))
      .slice(0, MAX_NAME_SUGGESTIONS)
      .map((x) => x.name);
  }, [approved, drafts, v.cat, region.id, lang]);

  const result = useMemo(() => checkSpot(candidate(v, cid, region.id)), [v, cid, region.id]);

  const errors = useMemo(() => (tried ? errorsOf(result, own, v, hasImage, t) : {}), [tried, result, own, v, hasImage, t]);

  const focusField = (f: Field) => {
    const root = formRef.current;
    const el = root?.querySelector<HTMLElement>(`[data-ff-field="${f}"]:checked`) ?? root?.querySelector<HTMLElement>(`[data-ff-field="${f}"]`);
    el?.focus();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!result.ok || !own) {
      setForm((f) => ({ ...f, tried: true }));
      const errs = errorsOf(result, own, v, hasImage, t);
      const first = FIELDS.find((f) => errs[f]);
      if (first) requestAnimationFrame(() => focusField(first));
      return;
    }
    // editing an old draft keeps the remembered nickname unless the player changed it here
    const by = result.spot.by ?? '';
    if (!form.editing || by !== form.initialBy) rememberNick(by);
    onSave(result.spot);
    onClose();
  };

  /** the fields as they are, for the way back from the map */
  const current = (): Partial<SpotInput> => {
    const c: Partial<SpotInput> = { region: region.id, name: v.name, area: v.area, note: v.note, by: v.by };
    if (editing) c.cid = cid;
    if (v.cat) c.cat = v.cat;
    if (v.pos) c.pos = v.pos;
    const level = levelOf(v);
    if (level && level.every((n) => Number.isInteger(n))) c.level = [level[0], level[1]];
    const drops = splitDrops(v.drops);
    if (drops.length) c.drops = drops;
    return c;
  };
  const pickPosition = () => {
    if (!onPickPosition) return;
    setPicking(true);
    onPickPosition(current());
  };
  const removePosition = () => {
    set('pos', null);
    // the Remove button goes away: the focus moves on to "Set on map"
    requestAnimationFrame(() => document.getElementById(`${uid}-pick`)?.focus());
  };

  const id = (f: string) => `${uid}-${f}`;
  const described = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(' ') || undefined;
  const errId = (f: Field) => (errors[f] ? id(`${f}-err`) : undefined);
  const near = (n: number, max: number, f: string) => (n >= max * NEAR ? id(`${f}-count`) : undefined);
  const chars = t('farmFormChars');
  const errorText = (f: Field) => (errors[f] ? <span className="ff-error" id={id(`${f}-err`)}>{errors[f]}</span> : null);
  const dropList = splitDrops(v.drops);

  return (
    <Modal
      open={open}
      size="md"
      title={editing ? t('farmFormEditTitle') : t('farmFormTitle')}
      description={t('farmFormDesc', { region: region.name[lang] })}
      onClose={onClose}
      className="ff-modal"
      footer={
        <>
          <button type="button" className="btn ghost" onClick={onClose}>{t('cancel')}</button>
          <button type="submit" form={id('form')} className="btn primary"><Save size={16} aria-hidden /> {editing ? t('farmFormSaveEdit') : t('farmFormSave')}</button>
        </>
      }
    >
      <form id={id('form')} ref={formRef} className="form ff-form" onSubmit={submit} noValidate>
        {/* errors are described on the controls themselves: screen readers skip a fieldset's description on focus */}
        <fieldset className={`ff-fieldset ${errors.cat ? 'invalid' : ''}`}>
          <legend className="ff-label">{t('farmFormCat')} <span aria-hidden>*</span></legend>
          <div className="ff-cats">
            {CATEGORY_GROUPS.map((g) => (
              <div key={g} className="ff-cat-group" role="group" aria-labelledby={id(`g-${g}`)} style={{ '--fc': GROUP_COLOR[g] } as CSSProperties}>
                <span className="ff-cat-group-name" id={id(`g-${g}`)}>{GROUP_NAMES[g][lang]}</span>
                <div className="ff-cat-list">
                  {CATEGORIES.filter((c) => c.group === g).map((c) => {
                    const Icon = categoryIcon(c.id);
                    const on = v.cat === c.id;
                    return (
                      <label key={c.id} className="ff-cat">
                        <input
                          type="radio" name={id('cat')} value={c.id} checked={on} data-ff-field="cat"
                          data-autofocus={on && !back ? '' : undefined}
                          aria-invalid={!!errors.cat || undefined} aria-describedby={errId('cat')}
                          onChange={() => set('cat', c.id)}
                        />
                        <span className="ff-cat-ui">
                          <Icon size={16} aria-hidden className="ff-cat-icon" />
                          <span className="ff-cat-name">{c.name[lang]}</span>
                          <Check size={14} aria-hidden className="ff-cat-check" />
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {errorText('cat')}
        </fieldset>

        {/* aria-labelledby: counters, hints and errors inside the labels describe the field, they are not its name */}
        <label className="field-block">
          <span id={id('name-l')}>{t('farmFormName')} <span aria-hidden>*</span></span>
          <input
            value={v.name} maxLength={LIMITS.name} list={id('names')} autoComplete="off" required data-ff-field="name"
            placeholder={t('farmFormNamePh')} onChange={(e) => set('name', e.target.value)}
            aria-labelledby={id('name-l')} aria-invalid={!!errors.name || undefined}
            aria-describedby={described(errId('name'), near(v.name.length, LIMITS.name, 'name'))}
          />
          <Counter id={id('name-count')} n={v.name.length} max={LIMITS.name} unit={chars} />
          {errorText('name')}
        </label>
        <datalist id={id('names')}>{names.map((n) => <option key={n} value={n} />)}</datalist>

        {hasImage && (
          <div className="ff-pos" role="group" aria-labelledby={id('pos-l')} aria-describedby={described(id('pos-state'), errId('pos'))}>
            <span className="ff-label" id={id('pos-l')}>{t('farmFormPos')}</span>
            <div className="ff-pos-row">
              <span className={`ff-pos-state ${v.pos ? 'set' : ''}`} id={id('pos-state')}>
                {v.pos ? <MapPin size={16} aria-hidden /> : <MapPinOff size={16} aria-hidden />}
                {v.pos ? t('farmFormPosSet') : t('farmFormPosNone')}
              </span>
              {onPickPosition && (
                <button
                  type="button" id={id('pick')} className="btn sm" onClick={pickPosition} data-ff-field="pos"
                  data-autofocus={back ? '' : undefined}
                >
                  <Crosshair size={15} aria-hidden /> {v.pos ? t('farmFormPosChange') : t('farmFormPosPick')}
                </button>
              )}
              {v.pos && (
                <button type="button" className="btn ghost sm" onClick={removePosition} data-ff-field={onPickPosition ? undefined : 'pos'}>
                  {t('farmFormPosRemove')}
                </button>
              )}
            </div>
            <span className="field-hint">{t('farmFormPosHint')}</span>
            {errorText('pos')}
          </div>
        )}

        <label className="field-block">
          <span id={id('area-l')}>{t('farmFormArea')} {!hasImage && <span aria-hidden>*</span>}</span>
          <input
            value={v.area} maxLength={LIMITS.area} autoComplete="off" data-ff-field="area" required={!hasImage}
            placeholder={t('farmFormAreaPh')} onChange={(e) => set('area', e.target.value)}
            aria-labelledby={id('area-l')} aria-invalid={!!errors.area || undefined}
            aria-describedby={described(errId('area'), id('area-hint'), near(v.area.length, LIMITS.area, 'area'))}
          />
          <span className="field-hint" id={id('area-hint')}>{hasImage ? t('farmFormAreaHintMap') : t('farmFormAreaHintText')}</span>
          <Counter id={id('area-count')} n={v.area.length} max={LIMITS.area} unit={chars} />
          {errorText('area')}
        </label>

        {mob && (
          <>
            <fieldset className="ff-fieldset">
              <legend className="ff-label">{t('farmFormLevel')}</legend>
              <div className="ff-levels">
                <label className="ff-level">
                  <span>{t('farmFormLevelMin')}</span>
                  <input
                    type="text" inputMode="numeric" pattern="[0-9]*" maxLength={3} autoComplete="off" data-ff-field="level"
                    value={v.levelMin} onChange={(e) => set('levelMin', e.target.value)} aria-invalid={!!errors.level || undefined}
                    aria-describedby={described(errId('level'), id('level-hint'))}
                  />
                </label>
                <span className="ff-level-dash" aria-hidden>–</span>
                <label className="ff-level">
                  <span>{t('farmFormLevelMax')}</span>
                  <input
                    type="text" inputMode="numeric" pattern="[0-9]*" maxLength={3} autoComplete="off"
                    value={v.levelMax} onChange={(e) => set('levelMax', e.target.value)} aria-invalid={!!errors.level || undefined}
                    aria-describedby={described(errId('level'), id('level-hint'))}
                  />
                </label>
              </div>
              <span className="field-hint" id={id('level-hint')}>{t('farmFormLevelHint')}</span>
              {errorText('level')}
            </fieldset>

            <label className="field-block">
              <span id={id('drops-l')}>{t('farmFormDrops')}</span>
              <textarea
                value={v.drops} rows={3} data-ff-field="drops" placeholder={t('farmFormDropsPh')}
                onChange={(e) => set('drops', e.target.value)}
                aria-labelledby={id('drops-l')} aria-invalid={!!errors.drops || undefined}
                aria-describedby={described(errId('drops'), id('drops-hint'))}
              />
              <span className="ff-hint-row">
                <span className="field-hint" id={id('drops-hint')}>{t('farmFormDropsHint', { n: LIMITS.drops })}</span>
                <span className={`ff-count ${dropList.length > LIMITS.drops ? 'over' : ''}`}>
                  {dropList.length} / {LIMITS.drops}<span className="sr-only"> {t('farmFormDropsUnit')}</span>
                </span>
              </span>
              {errorText('drops')}
            </label>
          </>
        )}

        <label className="field-block">
          <span id={id('note-l')}>{t('farmFormNote')}</span>
          <textarea
            value={v.note} rows={3} maxLength={LIMITS.note} data-ff-field="note" placeholder={t('farmFormNotePh')}
            onChange={(e) => set('note', e.target.value)}
            aria-labelledby={id('note-l')} aria-invalid={!!errors.note || undefined}
            aria-describedby={described(errId('note'), near(v.note.length, LIMITS.note, 'note'))}
          />
          <Counter id={id('note-count')} n={v.note.length} max={LIMITS.note} unit={chars} />
          {errorText('note')}
        </label>

        <label className="field-block">
          <span id={id('by-l')}>{t('farmFormBy')}</span>
          <input
            value={v.by} maxLength={LIMITS.by} autoComplete="nickname" data-ff-field="by" placeholder={t('farmFormByPh')}
            onChange={(e) => set('by', e.target.value)}
            aria-labelledby={id('by-l')} aria-invalid={!!errors.by || undefined}
            aria-describedby={described(errId('by'), id('by-hint'), near(v.by.length, LIMITS.by, 'by'))}
          />
          <span className="field-hint" id={id('by-hint')}>{t('farmFormByHint')}</span>
          <Counter id={id('by-count')} n={v.by.length} max={LIMITS.by} unit={chars} />
          {errorText('by')}
        </label>

        <div className="ff-own-wrap">
          <label className={`check ff-own ${errors.own ? 'invalid' : ''}`}>
            <input
              type="checkbox" checked={own} required data-ff-field="own"
              onChange={(e) => setForm((f) => ({ ...f, own: e.target.checked }))}
              aria-invalid={!!errors.own || undefined} aria-describedby={errId('own')}
            />
            <span>{t('farmFormOwn')} <span aria-hidden>*</span></span>
          </label>
          {errorText('own')}
        </div>

        {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
      </form>
    </Modal>
  );
}
