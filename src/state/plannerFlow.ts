import { storage } from '../lib/storage';

/**
 * The planner pages in the order a player fills a build: the tab row, the sidebar, the "Next step" card and
 * the home page steps all follow it.
 */
export const PLANNER_FLOW = ['/skills', '/stigma', '/daevanion', '/hotbar', '/combos'] as const;
export type PlannerPath = (typeof PLANNER_FLOW)[number];

export const isPlannerPath = (p: string): p is PlannerPath => (PLANNER_FLOW as readonly string[]).includes(p);

const LAST_TAB_KEY = 'lastPlanner';

/** The planner page the player used last ("Continue your build"). */
export const lastTab = (): PlannerPath => {
  const p = storage.get<string>(LAST_TAB_KEY, '/skills');
  return isPlannerPath(p) ? p : '/skills';
};

export const rememberTab = (p: string) => { if (isPlannerPath(p)) storage.set(LAST_TAB_KEY, p); };
