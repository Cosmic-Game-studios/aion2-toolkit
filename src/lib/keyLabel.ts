import { BAR_KEYS, BASIC_COL } from '../state/build';
import type { StringKey } from '../i18n/strings';

/** Label of a hotbar key as the player presses it: the basic-attack slot is the left mouse button. */
export const keyLabel = (col: number, t: (key: StringKey) => string) => (col === BASIC_COL ? t('keyLmb') : BAR_KEYS[col]);
