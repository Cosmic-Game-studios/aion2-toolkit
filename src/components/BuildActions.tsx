import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { Copy, Share2 } from 'lucide-react';
import { useGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import type { Build } from '../state/build';
import { buildShareUrl, copyText, readHash, shareOrCopy } from '../lib/shareLink';
import { COMMUNITY_ENABLED } from '../lib/communityApi';
import { UploadDialog } from '../features/community/UploadDialog';
import { SavedBuildsDialog } from './SavedBuildsDialog';
import { savedBuilds } from '../state/savedBuilds';
import { Modal } from './Modal';
import { useToast } from './Toast';

interface Actions {
  /** Share a build (default: the active one): share sheet on touch devices, else copy; on failure a dialog shows the link. */
  share: (build?: Build) => Promise<void>;
  /** the "My builds" dialog */
  openSavedBuilds: () => void;
  /** community upload (does nothing when the community is switched off) */
  openUpload: () => void;
  /** reset the active class build, with Undo in a toast */
  resetBuild: () => void;
}

const ActionsCtx = createContext<Actions | null>(null);

/** Build-wide actions shared by the build bar, the "Next step" card, the home page and dialogs. Mounted in main.tsx. */
export function BuildActionsProvider({ children }: { children: ReactNode }) {
  const { t, data } = useGame();
  const { build, importBuild, resetBuild: reset } = useBuild();
  const toast = useToast();
  const [saved, setSaved] = useState(false);
  const [upload, setUpload] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string | null>(null);
  // the latest values for stable callbacks
  const latest = useRef({ build, data, t });
  latest.current = { build, data, t };

  const className = (c: string) => latest.current.data?.classes.find((x) => x.classType === c)?.name ?? c;

  const share = useCallback(async (b?: Build) => {
    const { build: cur, t: tr } = latest.current;
    const target = b ?? cur;
    const url = buildShareUrl(readHash().base, target);
    const title = `${tr('shareTitle', { cls: className(target.c), l: target.l })} – Daevaforge`;
    const res = await shareOrCopy(url, title);
    if (res === 'copied') toast(tr('linkCopied'), 'ok');
    else if (res === 'failed') setLinkUrl(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  const resetBuild = useCallback(() => {
    const { build: snap, t: tr } = latest.current;
    const from = savedBuilds.loadedFrom(snap.c);
    reset();
    toast(tr('buildReset', { cls: className(snap.c) }), 'ok', {
      action: { label: tr('undo'), onClick: () => { importBuild(snap, from); toast(tr('buildRestored'), 'ok'); } },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, importBuild, toast]);

  const value = useMemo<Actions>(() => ({
    share,
    openSavedBuilds: () => setSaved(true),
    openUpload: () => { if (COMMUNITY_ENABLED) setUpload(true); },
    resetBuild,
  }), [share, resetBuild]);

  const closeSaved = useCallback(() => setSaved(false), []);
  const closeUpload = useCallback(() => setUpload(false), []);

  return (
    <ActionsCtx.Provider value={value}>
      {children}
      {data && saved && <SavedBuildsDialog onClose={closeSaved} />}
      {data && upload && COMMUNITY_ENABLED && <UploadDialog onClose={closeUpload} />}
      {linkUrl && <ShareLinkDialog url={linkUrl} onClose={() => setLinkUrl(null)} />}
    </ActionsCtx.Provider>
  );
}

export function useBuildActions(): Actions {
  const ctx = useContext(ActionsCtx);
  if (!ctx) throw new Error('useBuildActions outside BuildActionsProvider');
  return ctx;
}

/** Fallback when neither the share sheet nor the clipboard worked: the link in a field, ready to select. */
function ShareLinkDialog({ url, onClose }: { url: string; onClose: () => void }) {
  const { t } = useGame();
  const toast = useToast();
  const input = useRef<HTMLInputElement>(null);
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  return (
    <Modal
      open
      size="sm"
      title={t('shareDialogTitle')}
      description={t('shareDialogFailed')}
      onClose={onClose}
      initialFocus={input}
      footer={
        <>
          {canShare && (
            <button type="button" className="btn ghost" onClick={() => navigator.share({ url }).catch(() => {})}>
              <Share2 size={16} aria-hidden /> {t('shareVia')}
            </button>
          )}
          <span className="push" />
          <button type="button" className="btn ghost" onClick={onClose}>{t('close')}</button>
          <button
            type="button"
            className="btn primary"
            onClick={async () => {
              input.current?.select();
              if (await copyText(url)) { toast(t('linkCopied'), 'ok'); onClose(); }
              else toast(t('copyFailed'), 'error');
            }}
          >
            <Copy size={16} aria-hidden /> {t('copy')}
          </button>
        </>
      }
    >
      <label className="field-block share-field">
        <span>{t('shareLinkLabel')}</span>
        <input ref={input} type="text" readOnly value={url} onFocus={(e) => e.currentTarget.select()} />
      </label>
      <p className="field-hint">{t('shareDialogText')}</p>
    </Modal>
  );
}
