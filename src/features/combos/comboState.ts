import type { GameData } from '../../data/types';
import type { CuratedCombo } from '../../data/combos';
import type { Build } from '../../state/build';
import { comboReady, comboTouchesBuild } from '../../lib/combos';

/**
 * ready   – a setup and a payoff work in the build as it is now
 * spec    – the skills are in the build, but a specialisation (or stigma level) the combo needs is missing
 * missing – a setup or payoff skill is not in the build yet (stigma not equipped, level too low)
 */
export type ComboState = 'ready' | 'spec' | 'missing';

export const comboState = (data: GameData, build: Build, c: CuratedCombo): ComboState =>
  comboReady(data, build, c) ? 'ready' : comboTouchesBuild(data, build, c) ? 'spec' : 'missing';
