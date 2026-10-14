import { useState } from 'react';
import { Upload, Save } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import type { Build } from '../../state/build';
import { Modal } from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { ApiError, createBuild, updateBuild, type BuildEntry } from '../../lib/communityApi';
import { daevanionTotals } from '../../lib/buildCalc';
import { storage } from '../../lib/storage';

interface Props {
  onClose: () => void;
  /** when set, the dialog edits this community build instead of creating a new one */
  editing?: BuildEntry;
  onSaved?: (entry: BuildEntry | null) => void;
}

export function BuildFacts({ build }: { build: Build }) {
  const { t, data } = useLoadedGame();
  const leveled = Object.values(build.lv).filter((v) => v > 1).length;
  const stigmas = build.st.filter((s) => s.id).length;
  const slots = Object.keys(build.bar).length;
  const dv = daevanionTotals(data, build);
  const dvSpent = Object.values(dv).reduce((a, x) => a + x.spent, 0);
  return (
    <ul className="facts">
      <li>{t('skillsLeveled', { n: leveled })}</li>
      <li>{t('stigmasCount', { n: stigmas })}</li>
      <li>{t('barCount', { n: slots })}</li>
      <li>{t('macrosCount', { n: build.macros.length })}</li>
      <li>{t('daevanionPts')}: {dvSpent} {t('pts')}</li>
    </ul>
  );
}

export function UploadDialog({ onClose, editing, onSaved }: Props) {
  const { t } = useLoadedGame();
  const { build } = useBuild();
  const toast = useToast();
  const className = useClassName();
  const [title, setTitle] = useState(editing?.title ?? '');
  const [author, setAuthor] = useState(editing?.author ?? storage.get('community:author', ''));
  const [tags, setTags] = useState((editing?.tags ?? []).join(', '));
  const [description, setDescription] = useState(editing?.description ?? '');
  const [replace, setReplace] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (title.trim().length < 3) { setError(t('titleRequired')); return; }
    setBusy(true);
    setError(null);
    const meta = {
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      tags: tags.split(',').map((s) => s.trim()).filter(Boolean),
    };
    storage.set('community:author', meta.author);
    try {
      if (editing) {
        const entry = await updateBuild(editing.id, meta, replace ? build : undefined);
        toast(t('saved'));
        onSaved?.(entry);
      } else {
        const id = await createBuild(meta, build);
        toast(t('uploadOk'));
        onSaved?.(null);
        location.hash = `/community/${id}`;
      }
      onClose();
    } catch (e) {
      setError(e instanceof ApiError && e.status === 0 ? `${t('serverOffline')}. ${t('serverOfflineHint')}` : (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open
      title={editing ? t('editBuild') : t('uploadTitle')}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn ghost" onClick={onClose}>{t('cancel')}</button>
          <button type="button" className="btn primary" disabled={busy} onClick={submit}>
            {editing ? <Save size={16} /> : <Upload size={16} />}
            {busy ? t('uploading') : editing ? t('saveChanges') : t('upload')}
          </button>
        </>
      }
    >
      <form className="form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        {!editing && (
          <div className="upload-summary">
            <ClassEmblem cls={build.c} size={44} />
            <div>
              <div>{t('uploadSummary', { cls: className(build.c) })} <strong>{t('lv')} {build.l}</strong></div>
              <BuildFacts build={build} />
            </div>
          </div>
        )}
        <label className="field-block">
          <span>{t('buildTitle')} *</span>
          <input value={title} maxLength={60} placeholder={t('buildTitlePh')} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <div className="form-row">
          <label className="field-block">
            <span>{t('author')}</span>
            <input value={author} maxLength={30} placeholder={t('authorPh')} onChange={(e) => setAuthor(e.target.value)} />
          </label>
          <label className="field-block">
            <span>{t('tags')}</span>
            <input value={tags} maxLength={120} placeholder={t('tagsPh')} onChange={(e) => setTags(e.target.value)} />
          </label>
        </div>
        <label className="field-block">
          <span>{t('description')}</span>
          <textarea value={description} maxLength={2000} rows={6} placeholder={t('descriptionPh')} onChange={(e) => setDescription(e.target.value)} />
          <small className="muted">{description.length} / 2000</small>
        </label>
        {editing && (
          <label className="check">
            <input type="checkbox" checked={replace} onChange={(e) => setReplace(e.target.checked)} />
            <span>{t('replaceWithCurrent')} ({className(build.c)}, {t('lv')} {build.l})</span>
          </label>
        )}
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </Modal>
  );
}
