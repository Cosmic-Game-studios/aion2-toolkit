import { useId, useRef, useState } from 'react';
import { Check, Download, FolderOpen, Info, MoreHorizontal, Pencil, Save, Share2, Trash2, Upload, X } from 'lucide-react';
import type { ClassType } from '../data/types';
import type { StringKey } from '../i18n/strings';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { CLASS_TYPES, emptyBuild, isEmptyBuild, sameBuild, type Build } from '../state/build';
import { MAX_SAVED, parseSaved, savedBuilds, useLoadedFrom, useSavedBuilds, type SavedBuild } from '../state/savedBuilds';
import { daevanionTotals } from '../lib/buildCalc';
import { fmtDate } from '../lib/format';
import { Modal } from './Modal';
import { ClassEmblem, useClassName } from './ClassSelect';
import { useToast } from './Toast';
import { useBuildActions } from './BuildActions';
import { MQ, useMediaQuery } from './hooks';

/**
 * Short facts about a build: skills levelled, stigmas, hotbar slots, macro, Daevanion points.
 * `pills` (upload summary) or `line` (one compact text line in lists).
 */
export function BuildFacts({ build, variant = 'pills' }: { build: Build; variant?: 'pills' | 'line' }) {
  const { t, data } = useLoadedGame();
  const leveled = Object.values(build.lv).filter((v) => v > 1).length;
  const stigmas = build.st.filter((s) => s.id).length;
  const slots = Object.keys(build.bar).length;
  const macros = build.macros.length;
  const n = (count: number, one: StringKey, many: StringKey) => t(count === 1 ? one : many, { n: count });
  if (variant === 'line') {
    const parts = [
      leveled > 0 && n(leveled, 'svSkillsOne', 'skillsLeveled'),
      stigmas > 0 && n(stigmas, 'svStigmasOne', 'stigmasCount'),
      slots > 0 && n(slots, 'svSlotsOne', 'barCount'),
      macros > 0 && n(macros, 'svMacrosOne', 'macrosCount'),
    ].filter(Boolean);
    return <>{parts.length ? parts.join(' · ') : t('svEmptyBuild')}</>;
  }
  const dv = daevanionTotals(data, build);
  const dvSpent = Object.values(dv).reduce((a, x) => a + x.spent, 0);
  return (
    <ul className="facts">
      <li>{n(leveled, 'svSkillsOne', 'skillsLeveled')}</li>
      <li>{n(stigmas, 'svStigmasOne', 'stigmasCount')}</li>
      <li>{n(slots, 'svSlotsOne', 'barCount')}</li>
      <li>{n(macros, 'svMacrosOne', 'macrosCount')}</li>
      <li>{t('daevanionPts')}: {dvSpent} {t('pts')}</li>
    </ul>
  );
}

/**
 * Loads any build (saved, community, …) into the planner right away. When that replaces work of that class or
 * switches the class, the toast offers Undo, which brings back the previous build and class.
 */
export function useLoadBuild() {
  const { t } = useLoadedGame();
  const { build: active, builds, importBuild, setClass } = useBuild();
  const toast = useToast();
  return (b: Build, opts: { message?: string; savedId?: string | null } = {}) => {
    const prev = builds[b.c];
    const prevActive = active.c;
    const prevFrom = savedBuilds.loadedFrom(b.c);
    importBuild(JSON.parse(JSON.stringify(b)) as Build);
    savedBuilds.markLoaded(b.c, opts.savedId ?? null);
    const msg = opts.message ?? t('buildLoaded');
    const replaced = !!prev && !isEmptyBuild(prev) && !sameBuild(prev, b);
    if (!replaced && prevActive === b.c) { toast(msg, 'ok'); return; }
    toast(msg, 'ok', {
      action: {
        label: t('undo'),
        onClick: () => {
          importBuild(prev ?? emptyBuild(b.c, b.l));
          if (prevActive !== b.c) setClass(prevActive);
          savedBuilds.markLoaded(b.c, prevFrom);
          toast(t('buildRestored'), 'ok');
        },
      },
    });
  };
}

/** Loads a saved build into the planner (with Undo in the toast). Returns true, so callers can navigate on. */
export function useLoadSaved() {
  const load = useLoadBuild();
  const { t } = useLoadedGame();
  return (e: SavedBuild): boolean => {
    load(e.build, { savedId: e.id, message: t('svLoaded', { name: e.name }) });
    return true;
  };
}

export function SavedBuildsDialog({ onClose }: { onClose: () => void }) {
  const { t, lang } = useLoadedGame();
  const { build } = useBuild();
  const toast = useToast();
  const actions = useBuildActions();
  const className = useClassName();
  const list = useSavedBuilds();
  const fromId = useLoadedFrom(build.c);
  const loadSaved = useLoadSaved();
  const touch = useMediaQuery(MQ.coarse);
  const [name, setName] = useState(() => `${className(build.c)} ${t('lv')} ${build.l}`);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLButtonElement>(null);
  const uid = useId().replace(/:/g, '');

  const current = list.find((e) => sameBuild(e.build, build));
  const from = fromId ? list.find((e) => e.id === fromId) : undefined;
  // the build was loaded from (or saved as) this entry and has changed since: offer to update it
  const changedFrom = from && !current && from.build.c === build.c && !isEmptyBuild(build) ? from : undefined;
  const empty = isEmptyBuild(build);
  const date = (ms: number) => fmtDate(new Date(ms).toISOString(), lang);

  // the current class first, then the others in a fixed order
  const order: ClassType[] = [build.c, ...CLASS_TYPES.filter((c) => c !== build.c)];
  const groups = order.map((c) => ({ c, items: list.filter((e) => e.build.c === c) })).filter((g) => g.items.length);

  const saveNew = () => {
    const id = savedBuilds.saveNew(name, build);
    if (!id) { toast(t('savedFull', { n: MAX_SAVED }), 'error'); return; }
    savedBuilds.markLoaded(build.c, id);
    toast(t('buildSaved'), 'ok');
  };

  const update = (e: SavedBuild) => {
    const before = e;
    savedBuilds.overwrite(e.id, build);
    savedBuilds.markLoaded(build.c, e.id);
    toast(t('svUpdated', { name: e.name }), 'ok', { action: { label: t('undo'), onClick: () => savedBuilds.put(before) } });
  };

  const remove = (e: SavedBuild) => {
    const removed = savedBuilds.remove(e.id);
    setOpenId(null);
    if (!removed) return;
    const group = list.filter((x) => x.build.c === e.build.c);
    const i = group.findIndex((x) => x.id === e.id);
    refocus((group[i + 1] ?? group[i - 1])?.id ?? null);
    toast(t('svDeleted', { name: e.name }), 'ok', {
      action: {
        label: t('undo'),
        onClick: () => { if (!savedBuilds.restore(removed.entry, removed.index)) toast(t('savedFull', { n: MAX_SAVED }), 'error'); },
      },
    });
  };

  const exportAll = () => {
    const payload = { app: 'aion2-toolkit', v: 1, exportedAt: new Date().toISOString(), builds: list };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `aion2-builds-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const importFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error('too large');
      const entries = parseSaved(JSON.parse(await file.text()));
      if (!entries.length) throw new Error('empty');
      const n = savedBuilds.importMany(entries);
      toast(n ? t('importedN', { n }) : t('savedFull', { n: MAX_SAVED }), n ? 'ok' : 'error');
    } catch {
      toast(t('importFailed'), 'error');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  // the rename field, the menu and a deleted row disappear: the focus moves to a control that stays
  const refocus = (id: string | null) => requestAnimationFrame(() => {
    (id ? document.getElementById(`${uid}-more-${id}`) : mainRef.current)?.focus({ preventScroll: true });
  });
  const startRename = (e: SavedBuild) => { setEditing(e.id); setEditName(e.name); setOpenId(null); };
  const endRename = (id: string, commit: boolean) => {
    if (commit) savedBuilds.rename(id, editName);
    setEditing(null);
    refocus(id);
  };

  // first focus: the update button when the build changed since it was loaded, else the name field
  // (on touch screens the save button, so the keyboard does not cover the list right away)
  const initialFocus = changedFrom || touch ? mainRef : nameRef;
  const secondary = !!(changedFrom || current);

  return (
    <Modal
      open
      size="md"
      className="saved-dialog"
      title={<>{t('myBuilds')}{list.length > 0 && <span className="count">{list.length}</span>}</>}
      onClose={onClose}
      initialFocus={initialFocus}
      footer={
        <>
          <button type="button" className="btn ghost" onClick={exportAll} disabled={!list.length}><Download size={16} aria-hidden /> {t('exportBuilds')}</button>
          <button type="button" className="btn ghost" onClick={() => fileRef.current?.click()}><Upload size={16} aria-hidden /> {t('importBuilds')}</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => importFile(e.target.files?.[0])} />
          <span className="push" />
          <button type="button" className="btn" onClick={onClose}>{t('close')}</button>
        </>
      }
    >
      <section className="sv-save" aria-labelledby={`${uid}-save`}>
        {changedFrom && (
          <div className="sv-from">
            <Info size={16} aria-hidden />
            <p>{t('svFromChanged', { name: changedFrom.name })}</p>
            <button ref={mainRef} type="button" className="btn primary" onClick={() => update(changedFrom)}>
              <Save size={16} aria-hidden /> {t('svUpdateNamed', { name: changedFrom.name })}
            </button>
          </div>
        )}
        <form className="sv-new" onSubmit={(e) => { e.preventDefault(); saveNew(); }}>
          <ClassEmblem cls={build.c} size={40} />
          <label className="field-block">
            <span id={`${uid}-save`}>{secondary ? t('svSaveAsNew') : t('saveCurrent')}</span>
            <input ref={nameRef} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} aria-describedby={`${uid}-state`} />
          </label>
          <button ref={changedFrom ? undefined : mainRef} type="submit" className={`btn ${secondary ? '' : 'primary'}`}>
            <Save size={16} aria-hidden /> {secondary ? t('svSaveCopy') : t('save')}
          </button>
        </form>
        <p className={`sv-state ${current ? 'ok' : ''}`} id={`${uid}-state`}>
          {current ? <><Check size={14} aria-hidden /> {t('alreadySaved', { name: current.name })}</>
            : empty ? t('svEmptyHint')
            : t('myBuildsHint')}
        </p>
      </section>

      {list.length === 0 ? (
        <div className="sv-empty">
          <FolderOpen size={26} aria-hidden />
          <p>{t('noSavedBuilds')}</p>
        </div>
      ) : (
        <div className="sv-groups">
          {groups.map(({ c, items }) => (
            <section key={c} className="sv-group" aria-labelledby={`${uid}-g-${c}`}>
              <h3 className="sv-group-title" id={`${uid}-g-${c}`}>
                <ClassEmblem cls={c} size={22} />
                {className(c)}
                <span className="count">{items.length}</span>
                {c === build.c && <span className="sv-group-note">{t('svCurrentClass')}</span>}
              </h3>
              <ul className="sv-list">
                {items.map((e) => {
                  const isCurrent = current?.id === e.id;
                  const sameClass = e.build.c === build.c;
                  const open = openId === e.id;
                  const menuId = `${uid}-m-${e.id}`;
                  return (
                    <li key={e.id} className={`sv-row ${isCurrent ? 'current' : ''} ${open ? 'open' : ''}`}>
                      <div className="sv-main">
                        <div className="sv-text">
                          {editing === e.id ? (
                            <form className="sv-rename" onSubmit={(ev) => { ev.preventDefault(); endRename(e.id, true); }}>
                              <input
                                value={editName}
                                maxLength={60}
                                autoFocus
                                onChange={(ev) => setEditName(ev.target.value)}
                                onKeyDown={(ev) => { if (ev.key === 'Escape') { ev.stopPropagation(); endRename(e.id, false); } }}
                                aria-label={t('buildName')}
                              />
                              <button type="submit" className="icon-btn sm" aria-label={t('save')}><Check size={16} /></button>
                              <button type="button" className="icon-btn sm" aria-label={t('cancel')} onClick={() => endRename(e.id, false)}><X size={16} /></button>
                            </form>
                          ) : (
                            <strong className="sv-name">{e.name}</strong>
                          )}
                          <span className="sv-meta">{t('lv')} {e.build.l} · <BuildFacts build={e.build} variant="line" /></span>
                          <span className="sv-date">
                            {isCurrent && <span className="sv-badge"><Check size={13} aria-hidden /> {t('svOpenNow')}</span>}
                            {t('savedOn', { date: date(e.savedAt) })}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn sv-load"
                          disabled={isCurrent}
                          onClick={() => { if (loadSaved(e)) onClose(); }}
                          aria-label={isCurrent ? undefined : t('svLoadNamed', { name: e.name })}
                        >
                          <FolderOpen size={16} aria-hidden /> {t('load')}
                        </button>
                        <button
                          id={`${uid}-more-${e.id}`}
                          type="button"
                          className={`icon-btn sv-more ${open ? 'on' : ''}`}
                          aria-expanded={open}
                          aria-controls={menuId}
                          aria-label={t('svMoreFor', { name: e.name })}
                          onClick={() => setOpenId(open ? null : e.id)}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      {open && (
                        <div className="sv-menu" id={menuId} role="group" aria-label={t('svMoreFor', { name: e.name })}>
                          <button type="button" className="btn ghost sm" onClick={() => actions.share(e.build)}>
                            <Share2 size={15} aria-hidden /> {t('share')}
                          </button>
                          <button type="button" className="btn ghost sm" disabled={!sameClass || isCurrent} onClick={() => { update(e); setOpenId(null); refocus(e.id); }}>
                            <Save size={15} aria-hidden /> {t('svUpdate')}
                          </button>
                          <button type="button" className="btn ghost sm" onClick={() => startRename(e)}>
                            <Pencil size={15} aria-hidden /> {t('rename')}
                          </button>
                          <button type="button" className="btn ghost sm danger" onClick={() => remove(e)}>
                            <Trash2 size={15} aria-hidden /> {t('remove')}
                          </button>
                          {!sameClass && <p className="field-hint">{t('overwriteOtherClass', { cls: className(e.build.c) })}</p>}
                          {sameClass && isCurrent && <p className="field-hint">{t('svSameAsCurrent')}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Modal>
  );
}
