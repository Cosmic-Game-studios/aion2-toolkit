export type Lang = 'en' | 'de';

export type ClassType =
  | 'Assassin' | 'Chanter' | 'Cleric' | 'Elementalist' | 'Fighter'
  | 'Gladiator' | 'Ranger' | 'Sorcerer' | 'Templar';

export interface ClassInfo {
  classType: ClassType;
  name: string;
  skillCount: number;
}

export interface SkillEffect { group: number; type: string; id: number }

export interface SkillLevel {
  level: number;
  cooldown: number;
  cooldownSec: number;
  castTime: number;
  castTimeSec: number;
  effects: SkillEffect[];
  description: string;
}

export interface SkillPart { id: number; level: number; desc: string; icon: string }

export interface ChainSkill {
  id: number;
  name: string;
  icon: string;
  rate: number;
  time: number;
  desc: string[];
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  classType: ClassType;
  icon: string;
  acquireLevel: number;
  maxLevel: number;
  cooldown: number;
  cooldownSec: number;
  castTime: number;
  castTimeSec: number;
  cost: Record<string, number>;
  isStigma: boolean;
  type: 'active' | 'passive';
  levels: SkillLevel[];
  specSlots?: number[];
  parts?: SkillPart[];
  partsAuto?: boolean;
  chain?: ChainSkill[];
}

/** Entry i = cost to reach level i+1. A number = skill points; a tuple = [skillPoints, stigmaShards]. */
export type CostEntry = number | [number, number];
export type SkillCosts = Record<string, CostEntry[]>;

export interface PointSource { id: number; name: string; points: number }
export interface PointSourceGroup { kind: string; name: string; points: number; list: PointSource[] }
export interface SkillPoints {
  /** [charLevel, skillPoints, stigmaPoints] */
  level: [number, number, number][];
  Light: PointSourceGroup[];
  Dark: PointSourceGroup[];
}

export type NodeKind = 'S' | 'T' | 'K';
export type NodeGrade = 'None' | 'Common' | 'Rare' | 'Legend' | 'Unique';
export type PointType = 'DaevanionCrystal' | 'BattleCrystal' | 'ConquestCrystal';

export interface BoardNode {
  x: number;
  y: number;
  kind: NodeKind;
  grade: NodeGrade;
  label: string;
  /** stat key for T nodes, skill id (string) for K nodes */
  key: string;
  value: number | null;
  cost: number;
  needLevel: number;
}

export interface Board {
  id: number;
  name: string;
  needLevel: number;
  pointType: PointType;
  nodes: BoardNode[];
}

export interface DaevanionClass { name: string; boards: Board[] }

export interface DaevanionData {
  points: Record<PointType, { name: string; max: number }>;
  classes: Record<ClassType, DaevanionClass>;
}

/** Where a combo effect comes from: the skill text itself, one of its specialisations, or one of its chain skills. */
export type ComboVia = null | { part: number; level: number } | { chain: string };
export interface ComboSetup { id: number; status: string; chance: number; npc: boolean; cond: boolean; gauge?: number; via: ComboVia }
export type Combo =
  | { kind: 'status'; status: string; from: ComboSetup[]; to: { id: number; via: ComboVia }[] }
  | { kind: 'ref'; rel: 'cdr' | 'reset' | 'trigger' | 'amplify'; from: number; to: number; value: number | null; via: ComboVia }
  | { kind: 'burst'; from: number; stat: 'attack' | 'damage' | 'crit' | 'speed' | 'defense'; value: number; dur: number; to: number[] }
  | { kind: 'chance'; from: number; which: 'any' | 'impact'; value: number; to: number[] };
export interface ComboData { impact: string[]; classes: Partial<Record<ClassType, Combo[]>> }

export interface GameData {
  lang: Lang;
  combos: ComboData;
  classes: ClassInfo[];
  skills: Skill[];
  skillById: Map<number, Skill>;
  costs: SkillCosts;
  points: SkillPoints;
  daevanion: DaevanionData;
}
