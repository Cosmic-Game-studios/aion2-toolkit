import { Archive, Box, Castle, CookingPot, Crown, DoorOpen, Droplets, Feather, Flame, Gem, House, Leaf, MapPin, Pickaxe, Skull, Trees, Waypoints, type LucideIcon } from 'lucide-react';
import type { CategoryGroup } from './farmRules';

/** The icon of each spot category (farmRules CATEGORIES). */
export const CATEGORY_ICON: Record<string, LucideIcon> = {
  ore: Pickaxe,
  gem: Gem,
  plant: Leaf,
  food: CookingPot,
  wood: Trees,
  odyle: Droplets,
  mob: Skull,
  elite: Flame,
  boss: Crown,
  cube: Box,
  trace: Feather,
  chest: Archive,
  teleport: Waypoints,
  village: House,
  dungeon: DoorOpen,
  stronghold: Castle,
  other: MapPin,
};

export const categoryIcon = (cat: string): LucideIcon => CATEGORY_ICON[cat] ?? MapPin;

/** The colour of each category group: markers, chips and filter rows use it as `--fc`. */
export const GROUP_COLOR: Record<CategoryGroup, string> = {
  gather: 'var(--ok)',
  mob: 'var(--bad)',
  collect: 'var(--legend)',
  place: 'var(--accent)',
};
