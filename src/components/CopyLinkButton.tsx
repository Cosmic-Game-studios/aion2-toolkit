import { useState } from 'react';
import { useGame } from '../data/GameDataContext';
import { buildShareUrl, copyText } from '../lib/shareLink';

export function CopyLinkButton({ route, state }: { route: string; state: unknown }) {
  const { t } = useGame();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn"
      onClick={async () => {
        const url = buildShareUrl(route, state);
        history.replaceState(null, '', url);
        if (await copyText(url)) { setDone(true); setTimeout(() => setDone(false), 1500); }
      }}
    >
      {done ? t('linkCopied') : t('copyLink')}
    </button>
  );
}
