import { useEffect, useRef, useState } from 'react';
import { CalendarClock, Link2, Save, Undo2, X } from 'lucide-react';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { sameBuild } from '../state/build';
import { MAX_SAVED, savedBuilds, useSavedBuilds } from '../state/savedBuilds';
import { daevanionTotals, shardBudget, shardsSpent, skillPointBudget, skillPointsSpent } from '../lib/buildCalc';
import { fmtDate } from '../lib/format';
import { storage } from '../lib/storage';
import { useClassName } from './ClassSelect';
import { useToast } from './Toast';

/**
 * Shown after a share link replaced the player's build of that class. The previous build is saved under
 * "My builds" automatically and "Back to my build" restores it.
 */
export function SharedLinkBanner() {
  const { t } = useLoadedGame();
  const { linkImport, dismissLinkImport, importBuild, build } = useBuild();
  const list = useSavedBuilds();
  const toast = useToast();
  const className = useClassName();
  const saving = useRef(false);
  const [backupState, setBackupState] = useState<'none' | 'saved' | 'full'>('none');

  // save the replaced build once (a ref, not state: React may run effects twice in development)
  useEffect(() => {
    const backup = linkImport?.backup;
    if (!backup || saving.current) return;
    saving.current = true;
    if (list.some((s) => sameBuild(s.build, backup))) { setBackupState('saved'); return; }
    const ok = savedBuilds.save(`${className(backup.c)} ${t('lv')} ${backup.l} – ${t('backupBeforeLink')}`, backup);
    setBackupState(ok ? 'saved' : 'full');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkImport]);

  if (!linkImport) return null;
  const shared = linkImport.build;
  const backup = linkImport.backup;
  const cls = className(shared.c);
  const sharedSaved = list.some((s) => sameBuild(s.build, shared));

  const restore = () => {
    if (!backup) return;
    const snap = build;
    const snapFrom = savedBuilds.loadedFrom(snap.c);
    importBuild(backup, linkImport.backupFrom);
    dismissLinkImport();
    toast(t('buildRestored'), 'ok', { action: { label: t('undo'), onClick: () => importBuild(snap, snapFrom) } });
  };
  const saveShared = () => {
    if (savedBuilds.save(`${cls} ${t('lv')} ${shared.l} – ${t('sharedName')}`, shared)) toast(t('buildSaved'), 'ok');
    else toast(t('savedFull', { n: MAX_SAVED }), 'error');
  };

  return (
    <div className="shell-notice info" role="status">
      <Link2 size={18} className="shell-notice-icon" aria-hidden />
      <div className="shell-notice-text">
        <strong>{t('sharedOpened', { cls, l: shared.l })}</strong>
        {backup && backupState !== 'none' && (
          <span>{t(backupState === 'saved' ? 'sharedBackupSaved' : 'sharedBackupFull', { cls })}</span>
        )}
        {linkImport.same && <span>{t('sharedSame')}</span>}
      </div>
      <div className="shell-notice-actions">
        {!sharedSaved && (
          <button type="button" className="btn sm ghost" onClick={saveShared}><Save size={15} aria-hidden /> {t('sharedSave')}</button>
        )}
        {backup && (
          <button type="button" className="btn sm" onClick={restore}><Undo2 size={15} aria-hidden /> {t('sharedUndo')}</button>
        )}
      </div>
      <button type="button" className="icon-btn sm shell-notice-close" aria-label={t('close')} onClick={dismissLinkImport}><X size={15} /></button>
    </div>
  );
}

const SEEN_KEY = 'dataSeen';

/** Returning players: "Game data updated on …" plus a quick check of the active build's budgets. */
export function DataUpdateNotice() {
  const { t, data, lang } = useLoadedGame();
  const { build, picked } = useBuild();
  const className = useClassName();
  const updatedAt = data.meta?.updatedAt ?? null;
  const [seen, setSeen] = useState(() => storage.get<string | null>(SEEN_KEY, null));

  // first visit (or nothing planned yet): remember the current data silently
  useEffect(() => {
    if (updatedAt && (!seen || !picked) && seen !== updatedAt) { storage.set(SEEN_KEY, updatedAt); setSeen(updatedAt); }
  }, [updatedAt, seen, picked]);

  if (!updatedAt || !seen || !picked || !(Date.parse(updatedAt) > Date.parse(seen))) return null;

  const dv = daevanionTotals(data, build).DaevanionCrystal;
  const checks = [
    { what: t('skillPoints'), path: '/skills', over: skillPointsSpent(data, build) - skillPointBudget(data, build).total },
    { what: t('stigmaShards'), path: '/stigma', over: shardsSpent(data, build) - shardBudget(data, build).total },
    ...(dv ? [{ what: t('daevanionPoints'), path: '/daevanion', over: dv.spent - dv.max }] : []),
  ].filter((c) => c.over > 0);
  const dismiss = () => { storage.set(SEEN_KEY, updatedAt); setSeen(updatedAt); };
  const cls = className(build.c);

  return (
    <div className={`shell-notice ${checks.length ? 'warn' : 'ok'}`} role="status">
      <CalendarClock size={18} className="shell-notice-icon" aria-hidden />
      <div className="shell-notice-text">
        <strong>{t('dataUpdated', { date: fmtDate(updatedAt, lang) })}</strong>
        <span>
          {checks.length
            ? t('dataUpdatedIssues', { cls, list: checks.map((c) => t('overByItem', { what: c.what, n: c.over })).join(', ') })
            : t('dataUpdatedOk', { cls })}
        </span>
      </div>
      <div className="shell-notice-actions">
        {checks.length > 0 && <a className="btn sm" href={`#${checks[0].path}`} onClick={dismiss}>{t('goTo', { page: checks[0].what })}</a>}
        <button type="button" className="btn sm ghost" onClick={dismiss}>{t('gotIt')}</button>
      </div>
    </div>
  );
}
