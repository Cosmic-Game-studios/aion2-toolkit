import { useId } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { GAME_LEVEL_CAP } from '../lib/levelCap';
import { NumberField } from './ui';

/** Character level: − / number / + and an optional slider. The number commits on blur or Enter, so it can be retyped. */
export function LevelControl({ slider = true, id }: { slider?: boolean; id?: string }) {
  const { t } = useLoadedGame();
  const { build, setBuild } = useBuild();
  const setLevel = (l: number) => setBuild({ l: Math.min(GAME_LEVEL_CAP, Math.max(1, Math.round(l) || 1)) });
  // the level cap hint: a tooltip for the mouse, the field's description for screen readers
  const capId = `lv-cap-${useId().replace(/:/g, '')}`;
  return (
    <div className="level-ctl">
      <button type="button" className="icon-btn sm" onClick={() => setLevel(build.l - 1)} disabled={build.l <= 1} aria-label={t('levelDown')}><Minus size={15} /></button>
      <NumberField
        id={id}
        value={build.l}
        min={1}
        max={GAME_LEVEL_CAP}
        commit="blur"
        onChange={setLevel}
        aria-label={t('charLevel')}
        aria-describedby={capId}
        title={t('levelCapChar', { n: GAME_LEVEL_CAP })}
      />
      <span id={capId} className="sr-only">{t('levelCapChar', { n: GAME_LEVEL_CAP })}</span>
      <button type="button" className="icon-btn sm" onClick={() => setLevel(build.l + 1)} disabled={build.l >= GAME_LEVEL_CAP} aria-label={t('levelUp')}><Plus size={15} /></button>
      {slider && <input type="range" min={1} max={GAME_LEVEL_CAP} value={build.l} onChange={(e) => setLevel(Number(e.target.value))} aria-label={t('charLevel')} />}
    </div>
  );
}
