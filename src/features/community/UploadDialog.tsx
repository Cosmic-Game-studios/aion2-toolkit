import { useId, useRef, useState } from 'react';
import { Upload, Save, TriangleAlert } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { isEmptyBuild } from '../../state/build';
import { Modal } from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { BuildFacts } from '../../components/SavedBuildsDialog';
import { ApiError, createBuild, updateBuild, type BuildEntry } from '../../lib/communityApi';
import { storage } from '../../lib/storage';

interface Props {
  onClose: () => void;
  /** when set, the dialog edits this community build instead of creating a new one */
  editing?: BuildEntry;
  onSaved?: (entry: BuildEntry | null) => void;
}

const MAX_DESC = 2000;
const parseTags = (s: string) => [...new Set(s.split(',').map((x) => x.trim().replace(/^#+/, '')).filter(Boolean))];

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
  const [titleError, setTitleError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const uid = useId().replace(/:/g, '');

  const empty = isEmptyBuild(build);
  // a new upload needs something to show; an edit only needs it when the build is replaced
  const blocked = !editing && empty;
  const tagList = parseTags(tags);

  const submit = async () => {
    if (blocked || busy) return;
    if (title.trim().length < 3) { setTitleError(true); titleRef.current?.focus(); return; }
    setBusy(true);
    setError(null);
    const meta = { title: title.trim(), author: author.trim(), description: description.trim(), tags: tagList };
    storage.set('community:author', meta.author);
    try {
      if (editing) {
        const entry = await updateBuild(editing.id, meta, replace && !empty ? build : undefined);
        toast(t('saved'), 'ok');
        onSaved?.(entry);
      } else {
        const id = await createBuild(meta, build);
        toast(t('uploadOk'), 'ok');
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
      size="md"
      title={editing ? t('editBuild') : t('uploadTitle')}
      onClose={onClose}
      initialFocus={titleRef}
      footer={
        <>
          <button type="button" className="btn ghost" onClick={onClose}>{t('cancel')}</button>
          <button type="submit" form={`${uid}-form`} className="btn primary" disabled={busy || blocked}>
            {editing ? <Save size={16} aria-hidden /> : <Upload size={16} aria-hidden />}
            {busy ? t('uploading') : editing ? t('saveChanges') : t('upload')}
          </button>
        </>
      }
    >
      <form id={`${uid}-form`} className="form" onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate>
        {!editing && (
          <div className={`upload-summary ${empty ? 'empty' : ''}`}>
            <ClassEmblem cls={build.c} size={44} />
            <div>
              <div>{t('uploadSummary', { cls: className(build.c) })} <strong>{t('lv')} {build.l}</strong></div>
              {empty ? <p className="upload-empty"><TriangleAlert size={15} aria-hidden /> {t('cmUploadEmpty')}</p> : <BuildFacts build={build} />}
            </div>
          </div>
        )}
        {/* aria-labelledby: the hints and errors inside these labels are descriptions, not part of the field's name */}
        <label className="field-block">
          <span id={`${uid}-title-l`}>{t('buildTitle')} <span aria-hidden>*</span></span>
          <input
            ref={titleRef}
            value={title}
            maxLength={60}
            placeholder={t('buildTitlePh')}
            onChange={(e) => { setTitle(e.target.value); if (titleError && e.target.value.trim().length >= 3) setTitleError(false); }}
            required
            aria-labelledby={`${uid}-title-l`}
            aria-invalid={titleError || undefined}
            aria-describedby={titleError ? `${uid}-title-err` : undefined}
          />
          {titleError && <span className="field-error" id={`${uid}-title-err`} role="alert">{t('titleRequired')}</span>}
        </label>
        <div className="form-row">
          <label className="field-block">
            <span>{t('author')}</span>
            <input value={author} maxLength={30} placeholder={t('authorPh')} onChange={(e) => setAuthor(e.target.value)} autoComplete="nickname" />
          </label>
          <label className="field-block">
            <span id={`${uid}-tags-l`}>{t('tags')}</span>
            <input value={tags} maxLength={120} placeholder={t('tagsPh')} onChange={(e) => setTags(e.target.value)} aria-labelledby={`${uid}-tags-l`} aria-describedby={`${uid}-tags`} />
            <span className="field-hint upload-tags" id={`${uid}-tags`}>
              {tagList.length ? tagList.map((tag) => <span key={tag} className="tag">#{tag}</span>) : t('cmTagsHint')}
            </span>
          </label>
        </div>
        <label className="field-block">
          <span id={`${uid}-desc-l`}>{t('description')}</span>
          <textarea value={description} maxLength={MAX_DESC} rows={6} placeholder={t('descriptionPh')} onChange={(e) => setDescription(e.target.value)} aria-labelledby={`${uid}-desc-l`} aria-describedby={`${uid}-desc`} />
          <span className="field-hint upload-count" id={`${uid}-desc`}>{description.length} / {MAX_DESC}</span>
        </label>
        {editing && (
          <label className="check">
            <input type="checkbox" checked={replace} disabled={empty} onChange={(e) => setReplace(e.target.checked)} />
            <span>{t('replaceWithCurrent')} ({className(build.c)}, {t('lv')} {build.l})</span>
          </label>
        )}
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </Modal>
  );
}
