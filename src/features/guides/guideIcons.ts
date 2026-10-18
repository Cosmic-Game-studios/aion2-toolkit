import { BookOpen, Gauge, Hammer, Keyboard, Leaf, PawPrint, Timer, TrendingUp, type LucideIcon } from 'lucide-react';
import type { GuideIcon } from './types';

/** The icon of each guide (class guides show the class emblem instead). Shared by the guides page and the quick search. */
export const GUIDE_ICONS: Record<GuideIcon, LucideIcon> = { speed: Timer, craft: Hammer, gather: Leaf, book: BookOpen, macro: Keyboard, power: TrendingUp, pet: PawPrint, score: Gauge };
