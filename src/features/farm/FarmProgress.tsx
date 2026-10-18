import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowLeftRight, Copy, Download, ListChecks, RotateCcw, TriangleAlert, Upload } from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { Modal } from '../../components/Modal';
import { Segmented } from '../../components/ui';
import { useToast } from '../../components/Toast';
import { useConfirm } from '../../components/ConfirmDialog';
import { copyText } from '../../lib/shareLink';
import {
  decodeFound, encodeFound, foundData, foundFile, foundIn, foundSize, importFound, readFoundFile, resetRegion, restoreRegion, revertImport, useFound,
  FoundReadError, type FoundData, type FoundError,
} from './farmFound';
import type { Region } from './farmRules';

/*
 * The progress block at the end of the farm map's filters: how many of the region's spots the player has found,
 * "hide found", "reset region" (asked first, undone from the toast) and the dialog that takes the progress to another
 * browser or device as a code or a JSON file. Everything happens in the browser; nothing is uploaded.
 */

type T = ReturnType<typeof useGame>['t'];
type Mode = 'merge' | 'replace';

/** "120 found spots in 2 regions" */
function sizeText(t: T, data: FoundData) {
  const { n, regions } = foundSize(data);
  const spots = n === 1 ? t('farmProgressSpotsOne') : t('farmProgressSpots', { n });
  return `${spots} ${regions === 1 ? t('farmProgressRegionsOne') : t('farmProgressRegions', { n: regions })}`;
}

const today = () => new Date().toISOString().slice(0, 10);

function ProgressDialog({ onClose }: { onClose: () => void }) {
  const { t } = useGame();
  const toast = useToast();
  const confirm = useConfirm();
  const uid = useId().replace(/:/g, '');
  const found = useFound();
  // the store's snapshot changes with every change, so this follows the progress while the dialog is open
  const data = useMemo(() => foundData(found), [found]);
  const size = foundSize(data);
  const [code, setCode] = useState<string | null>(null);
  const [paste, setPaste] = useState('');
  const [mode, setMode] = useState<Mode>('merge');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const errId = `${uid}-err`;

  // the code is made in the browser (compressing is asynchronous); again whenever the progress changes
  useEffect(() => {
    let alive = true;
    setCode(null);
    encodeFound(data).then((c) => { if (alive) setCode(c); }, () => { if (alive) setCode(''); });
    return () => { alive = false; };
  }, [data]);

  const copy = async () => {
    if (!code) return;
    const ok = await copyText(code);
    toast(t(ok ? 'farmProgressCopied' : 'farmProgressCopyFailed'), ok ? 'ok' : 'error');
  };

  const download = () => {
    const url = URL.createObjectURL(foundFile(data));
    const a = document.createElement('a');
    a.href = url;
    a.download = `aion2-farm-progress-${today()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const errorText = (kind: FoundError, file: boolean) => t(
    kind === 'version' ? 'farmProgressErrVersion'
      : kind === 'size' ? 'farmProgressErrSize'
        : kind === 'unzip' ? 'farmProgressErrUnzip'
          : file ? 'farmProgressErrFile' : 'farmProgressErrInvalid',
  );

  /** reads a code or a file, asks before it changes anything, then takes it (Undo in the toast) */
  const take = async (read: () => Promise<FoundData>, file: boolean) => {
    if (busy) return;
    setError(null);
    setBusy(true);
    let got: FoundData;
    try {
      got = await read();
    } catch (e) {
      setError(errorText(e instanceof FoundReadError ? e.kind : 'invalid', file));
      return;
    } finally {
      setBusy(false);
    }
    if (!foundSize(got).n) {
      setError(t('farmProgressErrEmpty'));
      return;
    }
    const replace = mode === 'replace';
    const theirs = sizeText(t, got);
    const ok = await confirm(replace ? {
      title: t('farmProgressConfirmReplace'),
      message: t('farmProgressConfirmReplaceText', { mine: size.n ? sizeText(t, data) : t('farmProgressNothing'), theirs }),
      confirmLabel: t('farmProgressReplace'),
      danger: true,
    } : {
      title: t('farmProgressConfirmMerge'),
      message: t('farmProgressConfirmMergeText', { theirs }),
      confirmLabel: t('farmProgressLoadYes'),
    });
    if (!ok) return;
    const before = foundData();
    importFound(got, mode);
    // Undo takes back only the import's own change: a spot marked while the toast shows stays marked
    const after = foundData();
    toast(t('farmProgressLoaded'), 'ok', { action: { label: t('undo'), onClick: () => revertImport(before, after) } });
    onClose();
  };

  const loadCode = () => {
    if (!paste.trim()) {
      setError(t('farmProgressErrPaste'));
      return;
    }
    take(() => decodeFound(paste), false);
  };

  const loadFile = (f: File | undefined) => {
    if (fileRef.current) fileRef.current.value = '';
    if (f) take(() => readFoundFile(f), true);
  };

  return (
    <Modal
      open
      size="md"
      className="farm-progress-dialog"
      title={t('farmProgressTitle')}
      description={t('farmProgressDesc')}
      onClose={onClose}
      footer={<button type="button" className="btn" onClick={onClose}>{t('close')}</button>}
    >
      <section className="farm-progress-part" aria-labelledby={`${uid}-save`}>
        <h3 className="farm-h3" id={`${uid}-save`}>{t('farmProgressSave')}</h3>
        <p className="field-hint">{size.n ? `${sizeText(t, data)}.` : t('farmProgressNone')}</p>
        <label className="field-block">
          <span>{t('farmProgressCode')}</span>
          {/* selected on focus, so it can also be copied by hand */}
          <textarea
            className="farm-code" readOnly rows={3} value={code ?? ''} aria-busy={code === null}
            spellCheck={false} onFocus={(e) => e.currentTarget.select()}
          />
        </label>
        <div className="farm-progress-actions">
          <button type="button" className="btn sm" onClick={copy} disabled={!code || !size.n}>
            <Copy size={14} aria-hidden /> {t('farmProgressCopy')}
          </button>
          <button type="button" className="btn ghost sm" onClick={download} disabled={!size.n}>
            <Download size={14} aria-hidden /> {t('farmProgressDownload')}
          </button>
        </div>
      </section>

      <section className="farm-progress-part" aria-labelledby={`${uid}-load`}>
        <h3 className="farm-h3" id={`${uid}-load`}>{t('farmProgressLoad')}</h3>
        <label className="field-block">
          <span>{t('farmProgressPaste')}</span>
          <textarea
            className="farm-code" rows={3} value={paste} spellCheck={false} autoComplete="off" autoCapitalize="off"
            aria-invalid={error ? true : undefined} aria-describedby={error ? errId : undefined}
            onChange={(e) => { setPaste(e.target.value); setError(null); }}
          />
        </label>
        <div className="farm-progress-mode">
          <Segmented<Mode>
            value={mode}
            onChange={setMode}
            label={t('farmProgressMode')}
            options={[{ value: 'merge', label: t('farmProgressMerge') }, { value: 'replace', label: t('farmProgressReplace') }]}
          />
          <p className="field-hint">{t(mode === 'merge' ? 'farmProgressMergeHint' : 'farmProgressReplaceHint')}</p>
        </div>
        {error && <p className="farm-progress-error" id={errId} role="alert"><TriangleAlert size={15} aria-hidden /> <span>{error}</span></p>}
        <div className="farm-progress-actions">
          <button type="button" className="btn primary sm" onClick={loadCode} aria-busy={busy || undefined}>{t('farmProgressLoadCode')}</button>
          <button type="button" className="btn ghost sm" onClick={() => fileRef.current?.click()}>
            <Upload size={14} aria-hidden /> {t('farmProgressLoadFile')}
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => loadFile(e.target.files?.[0])} />
        </div>
      </section>
    </Modal>
  );
}

export function FarmProgress({ region, found, total, hideFound, onHideFound }: {
  region: Region;
  /** found spots of the region and all its spots that can be found (not the gathering points that respawn); null
   *  while the spots load */
  found: number | null;
  total: number;
  hideFound: boolean;
  onHideFound: (on: boolean) => void;
}) {
  const { t, lang } = useGame();
  const toast = useToast();
  const confirm = useConfirm();
  const uid = useId().replace(/:/g, '');
  const [open, setOpen] = useState(false);
  const name = region.name[lang];
  // what a reset clears: every id stored for the region, also those of spots a data update dropped (`found` counts
  // only the spots the region has now), so those can be cleared too and the question names the real number
  const stored = foundIn(useFound(), region.id).size;
  const canReset = stored > 0;

  const reset = async () => {
    if (!canReset) return;
    const ok = await confirm({
      title: t('farmProgressResetTitle', { region: name }),
      message: t(stored === 1 ? 'farmProgressResetTextOne' : 'farmProgressResetText', { n: stored, region: name }),
      confirmLabel: t('farmProgressResetYes'),
      danger: true,
    });
    if (!ok) return;
    const was = resetRegion(region.id);
    toast(t('farmProgressResetDone', { region: name }), 'ok', { action: { label: t('undo'), onClick: () => restoreRegion(region.id, was) } });
  };

  return (
    <div className="farm-progress" role="group" aria-labelledby={`${uid}-h`}>
      <span className="farm-fgroup-name" id={`${uid}-h`}><ListChecks size={14} aria-hidden />{t('farmProgress')}</span>
      {found !== null && <p className="farm-progress-sum">{t('farmProgressSummary', { n: found, total, region: name })}</p>}
      <label className="toggle">
        <input type="checkbox" checked={hideFound} onChange={(e) => onHideFound(e.target.checked)} />
        <span className="toggle-ui" />
        {t('farmProgressHide')}
      </label>
      <div className="farm-progress-actions">
        {/* stays in place when nothing is found (aria-disabled), so the focus is not lost after a reset */}
        <button type="button" className="btn ghost sm" aria-disabled={!canReset} onClick={() => { if (canReset) reset(); }}>
          <RotateCcw size={14} aria-hidden /> {t('farmProgressReset')}<span className="sr-only">: {name}</span>
        </button>
        <button type="button" className="btn ghost sm" onClick={() => setOpen(true)}>
          <ArrowLeftRight size={14} aria-hidden /> {t('farmProgressMove')}
        </button>
      </div>
      {open && <ProgressDialog onClose={() => setOpen(false)} />}
    </div>
  );
}
