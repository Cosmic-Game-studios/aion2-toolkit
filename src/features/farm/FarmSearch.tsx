import { useEffect, useId, useMemo, useState, type CSSProperties, type KeyboardEvent, type RefObject } from 'react';
import { Layers, MapPin, Search, X } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { categoryById, regionById } from './farmRules';
import { categoryIcon, GROUP_COLOR } from './farmIcons';
import { searchJump, type JumpEntry } from './farmJump';

/*
 * The farm map's search box: what is typed filters the spot list (as before), and a list under the box offers places to
 * jump to (farmJump): areas and spots of every region, grouped by region, and the categories. An ARIA combobox: the
 * focus stays in the box, the arrow keys move through the results (aria-activedescendant), Enter takes the chosen one
 * (or, with none chosen, the one place the search clearly means: farmJump's `best`), Esc closes the list (a second Esc clears the box, as in any search field). "/" jumps into the box from anywhere on the
 * page but a field or a dialog.
 */

export function FarmSearch({ value, onChange, inputRef, index, region, onPick }: {
  value: string;
  onChange: (q: string) => void;
  inputRef: RefObject<HTMLInputElement>;
  /** null while the spots load: the box only filters the list then */
  index: readonly JumpEntry[] | null;
  /** the region on screen: its results come first */
  region: string;
  onPick: (e: JumpEntry) => void;
}) {
  const { t, lang } = useGame();
  const uid = useId().replace(/:/g, '');
  const listId = `${uid}-jump`;
  const optId = (i: number) => `${uid}-o${i}`;
  /** typing (or the arrow keys) opens the list; Esc, a pick and leaving the box close it */
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(-1);
  const { groups, best } = useMemo(() => (index ? searchJump(index, value, region, lang) : { groups: [], best: null }), [index, value, region, lang]);
  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);
  const open = show && flat.length > 0;
  // other results: no option is active until the arrow keys pick one
  useEffect(() => setActive(-1), [groups]);
  // the active option stays in view while the arrow keys move through a list taller than its box
  useEffect(() => {
    if (open && active >= 0) document.getElementById(`${uid}-o${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active, uid]);

  // "/" jumps into the box (keyboard users), unless a field has the focus or a dialog is open
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest('input, textarea, select, [contenteditable="true"]') || document.querySelector('.modal-backdrop')) return;
      const box = inputRef.current;
      if (!box) return;
      e.preventDefault();
      // a new search replaces the old one with the first key stroke
      box.focus();
      box.select();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inputRef]);

  const pick = (e: JumpEntry) => {
    setShow(false);
    setActive(-1);
    onPick(e);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey) return;
    const n = flat.length;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        if (!n) return;
        e.preventDefault();
        const down = e.key === 'ArrowDown';
        // Alt+Down only opens the list (the combobox pattern)
        if (!open) {
          setShow(true);
          setActive(e.altKey ? -1 : down ? 0 : n - 1);
          return;
        }
        setActive((a) => (down ? (a + 1) % n : a <= 0 ? n - 1 : a - 1));
        return;
      }
      case 'Enter':
        if (!open) return;
        e.preventDefault();
        // no option chosen: the place the search clearly means, else Enter just closes the list (the typed text keeps
        // filtering the spot list)
        if (active >= 0 && flat[active]) pick(flat[active]);
        else if (best) pick(best);
        else setShow(false);
        return;
      case 'Escape':
        // the list closes first; with it closed, the browser's own Esc clears the box
        if (!open) return;
        e.preventDefault();
        e.stopPropagation();
        setShow(false);
        setActive(-1);
        return;
      default:
    }
  };

  const groupName = (key: string) => (key === 'cat' ? t('farmJumpCats') : regionById(key)?.name[lang] ?? key);

  let i = -1;
  return (
    <div className="farm-search-wrap">
      <label className="search-field farm-search">
        <Search size={16} aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={value}
          maxLength={100}
          placeholder={t('farmFilterSearch')}
          aria-label={t('farmFilterSearchLabel')}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && active >= 0 ? optId(active) : undefined}
          aria-keyshortcuts="/"
          autoComplete="off"
          enterKeyHint="search"
          onChange={(e) => { onChange(e.target.value); setShow(true); }}
          onKeyDown={onKeyDown}
          // a click into the box brings back the list a pick or Esc closed (the focus stayed in the box)
          onClick={() => setShow(true)}
          onBlur={() => { setShow(false); setActive(-1); }}
        />
        {value ? (
          <button type="button" className="icon-btn sm" onClick={() => { onChange(''); inputRef.current?.focus(); }} aria-label={t('clear')}>
            <X size={14} />
          </button>
        ) : <kbd className="farm-kbd" aria-hidden>/</kbd>}
      </label>
      {/* always there (hidden when closed), so aria-controls names an element; a press inside keeps the focus in the box */}
      <div
        className="farm-jump" id={listId} role="listbox" aria-label={t('farmJumpLabel')} hidden={!open}
        onMouseDown={(e) => e.preventDefault()}
      >
        {open && groups.map((g) => {
          const headId = `${listId}-${g.key}`;
          return (
            <div key={g.key} className="farm-jump-group" role="group" aria-labelledby={headId}>
              <div className="farm-jump-head" id={headId} role="presentation">
                <span>{groupName(g.key)}</span>
                {/* matches, not spots: the region's areas count too, and a spot is also found by its area or drops (as
                    in the list); a cut list says how much more there is (a longer search finds it) */}
                <span className="farm-jump-n">
                  {g.total > g.hits.length ? t('farmJumpOf', { n: g.hits.length, total: g.total })
                    : g.total === 1 ? t('farmJumpHitsOne') : t('farmJumpHits', { n: g.total })}
                </span>
              </div>
              {g.hits.map((e) => {
                i += 1;
                const k = i;
                const cat = e.kind === 'spot' && e.cat ? categoryById(e.cat) : e.kind === 'cat' ? categoryById(e.id) : undefined;
                const Icon = e.kind === 'area' ? MapPin : e.kind === 'cat' ? Layers : categoryIcon(e.cat ?? '');
                const sub = e.kind === 'area' ? t('farmJumpArea')
                  : e.kind === 'cat' ? t('farmJumpCatOnly')
                    : [cat?.name[lang] ?? e.cat, e.area, e.draft ? t('farmPagePendingMarker') : ''].filter(Boolean).join(' · ');
                return (
                  <div
                    key={e.id} id={optId(k)} role="option" aria-selected={k === active}
                    className={`farm-jump-opt ${e.kind}`}
                    style={cat ? { '--fc': GROUP_COLOR[cat.group] } as CSSProperties : undefined}
                    onClick={() => pick(e)}
                  >
                    <Icon size={16} aria-hidden className="farm-jump-ico" />
                    <span className="farm-jump-text">
                      <span className="farm-jump-name">{e.name}</span>
                      <span className="farm-jump-sub">{sub}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
