import { Award, BookOpen, Castle, Compass, Feather, Gauge, Gem, Hammer, Hexagon, Keyboard, Leaf, PawPrint, Rocket, Swords, Timer, TrendingUp, Users, Zap, type LucideIcon } from 'lucide-react';
import type { GuideIcon } from './types';

/** The icon of each guide (class guides show the class emblem instead). Shared by the guides page and the quick search. */
export const GUIDE_ICONS: Record<GuideIcon, LucideIcon> = { speed: Timer, craft: Hammer, gather: Leaf, book: BookOpen, macro: Keyboard, power: TrendingUp, pet: PawPrint, score: Gauge, users: Users, rocket: Rocket, gem: Gem, pvp: Swords, dungeon: Castle, board: Hexagon, compass: Compass, wings: Feather, award: Award, zap: Zap };
