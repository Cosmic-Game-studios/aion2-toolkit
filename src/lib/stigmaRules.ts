/** Character level at which stigma slot n (0-based) unlocks. */
export const STIGMA_SLOT_LEVELS = [22, 27, 32, 37] as const;
export const STIGMA_SLOTS = STIGMA_SLOT_LEVELS.length;
/** Stigma levels that unlock a specialisation. */
export const STIGMA_SPEC_LEVELS = [5, 10, 15, 20] as const;

export const unlockedStigmaSlots = (charLevel: number) =>
  STIGMA_SLOT_LEVELS.filter((l) => charLevel >= l).length;
