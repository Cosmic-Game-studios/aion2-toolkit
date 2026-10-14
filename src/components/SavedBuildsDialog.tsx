import { useRef, useState } from 'react';
import { Check, Download, FolderOpen, Link2, Pencil, Save, Trash2, Upload, X } from 'lucide-react';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { isEmptyBuild, sameBuild } from '../state/build';
import { MAX_SAVED, parseSaved, savedBuilds, useSavedBuilds, type SavedBuild } from '../state/savedBuilds';
import { buildShareUrl, copyText, readHash } from '../lib/shareLink';
import { BuildFacts } from '../features/community/UploadDialog';
import { Modal } from './Modal';
import { ClassEmblem, useClassName } from './ClassSelect';
import { useToast } from './Toast';

/** Loads a saved build into the planner, asking first when unsaved work of that class would be lost. */
export function useLoadSaved() {
  const { t } = useLoadedGame();
  const { builds, importBuild } = useBuild();
  const list = useSavedBuilds();
  const toast = useToast();
  const className = useClassName();
  return (e: SavedBuild): boolean => {
    const cur = builds[e.build.c];
    const safe = !cur || isEmptyBuild(cur) || sameBuild(cur, e.build) || list.some((s) => sameBuild(s.build, cur));
    if (!safe && !confirm(t('loadConfirm', { cls: className(e.build.c) }))) return false;
    importBuild(JSON.parse(JSON.stringify(e.build)));
    toast(t('buildLoaded'));
    return true;
  };
}

export function SavedBuildsDialog({ onClose }: { onClose: () => void }) {
  const { t, lang } = useLoadedGame();
  const { build } = useBuild();
  const toast = useToast();
  const className = useClassName();
  const list = useSavedBuilds();
  const loadSaved = useLoadSaved();
  const [name, setName] = useState(() => `${className(build.c)} ${t('lv')} ${build.l}`);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const current = list.find((e) => sameBuild(e.build, build));
  const fmtDate = (ms: number) =>
    new Date(ms).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const save = () => {
    if (!savedBuilds.save(name, build)) { toast(t('savedFull', { n: MAX_SAVED }), 'error'); return; }
    toast(t('buildSaved'));
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

  const commitRename = (id: string) => {
    savedBuilds.rename(id, editName);
    setEditing(null);
  };

  return (
    <Modal
      open
      wide
      title={t('myBuilds')}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn ghost" onClick={exportAll} disabled={!list.length}><Download size={16} /> {t('exportBuilds')}</button>
          <button type="button" className="btn ghost" onClick={() => fileRef.current?.click()}><Upload size={16} /> {t('importBuilds')}</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => importFile(e.target.files?.[0])} />
          <span className="push" />
          <button type="button" className="btn" onClick={onClose}>{t('close')}</button>
        </>
      }
    >
      <form className="saved-new" onSubmit={(e) => { e.preventDefault(); save(); }}>
        <ClassEmblem cls={build.c} size={40} />
        <label className="field-block">
          <span>{t('saveCurrent')}</span>
          <input value={name} maxLength={60} onChange={(e) => setName(e.target.value)} aria-label={t('buildName')} />
        </label>
        <button type="submit" className="btn primary"><Save size={16} /> {t('save')}</button>
      </form>
      {current && <p className="saved-note"><Check size={14} /> {t('alreadySaved', { name: current.name })}</p>}
      <p className="muted small saved-hint">{t('myBuildsHint')}</p>

      {list.length === 0 ? (
        <p className="saved-empty">{t('noSavedBuilds')}</p>
      ) : (
        <ul className="saved-list">
          {list.map((e) => {
            const sameClass = e.build.c === build.c;
            return (
              <li key={e.id} className={`saved-item ${current?.id === e.id ? 'current' : ''}`}>
                <ClassEmblem cls={e.build.c} size={40} />
                <div className="si-body">
                  {editing === e.id ? (
                    <form className="si-rename" onSubmit={(ev) => { ev.preventDefault(); commitRename(e.id); }}>
                      <input
                        value={editName}
                        maxLength={60}
                        autoFocus
                        onChange={(ev) => setEditName(ev.target.value)}
                        onKeyDown={(ev) => { if (ev.key === 'Escape') { ev.stopPropagation(); setEditing(null); } }}
                        aria-label={t('buildName')}
                      />
                      <button type="submit" className="icon-btn sm" aria-label={t('save')} title={t('save')}><Check size={14} /></button>
                      <button type="button" className="icon-btn sm" aria-label={t('cancel')} title={t('cancel')} onClick={() => setEditing(null)}><X size={14} /></button>
                    </form>
                  ) : (
                    <strong className="si-name">{e.name}</strong>
                  )}
                  <span className="si-meta">{className(e.build.c)} · {t('lv')} {e.build.l} · {t('savedOn', { date: fmtDate(e.savedAt) })}</span>
                  <BuildFacts build={e.build} />
                </div>
                <div className="si-actions">
                  <button type="button" className="btn sm primary" onClick={() => { if (loadSaved(e)) onClose(); }}>
                    <FolderOpen size={14} /> {t('load')}
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    title={t('copyLink')}
                    aria-label={t('copyLink')}
                    onClick={async () => toast((await copyText(buildShareUrl(readHash().base, e.build))) ? t('linkCopied') : t('copyFailed'))}
                  >
                    <Link2 size={15} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    disabled={!sameClass || current?.id === e.id}
                    title={sameClass ? t('overwrite') : t('overwriteOtherClass', { cls: className(e.build.c) })}
                    aria-label={t('overwrite')}
                    onClick={() => { savedBuilds.overwrite(e.id, build); toast(t('buildUpdated')); }}
                  >
                    <Save size={15} />
                  </button>
                  <button type="button" className="icon-btn" title={t('rename')} aria-label={t('rename')} onClick={() => { setEditing(e.id); setEditName(e.name); }}>
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn danger"
                    title={t('remove')}
                    aria-label={t('remove')}
                    onClick={() => { if (confirm(t('removeConfirm', { name: e.name }))) savedBuilds.remove(e.id); }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
}
