import type { DragEvent } from 'react';
import type { GameData, Skill } from '../../data/types';
import { BAR_ORDER, BAR_ROWS, BASIC_COL, keyStack, slotKey, type Build } from '../../state/build';
import { buildCd } from '../../lib/buildCalc';
import { parseFacts } from '../../lib/skillFacts';

const text = (s: Skill) => s.levels[0]?.description ?? s.description ?? '';

/** Skills the player charges by hand (guides keep them out of the macro). */
export const isCharged = (s: Skill) => /Max \d Charge Levels?/.test(text(s));

/** The skills of one key, bottom (priority) first. */
export const stackSkills = (data: GameData, build: Build, col: number): Skill[] =>
  keyStack(build, col).map((id) => data.skillById.get(id)).filter((s): s is Skill => !!s);

/** Keys that hold an attack with a cooldown – what most players put in their macro (not the basic attack, not charged skills). */
export function attackKeys(data: GameData, build: Build): number[] {
  return BAR_ORDER.filter((c) => c !== BASIC_COL && stackSkills(data, build, c).some((s) => {
    if (isCharged(s) || buildCd(data, build, s) <= 0) return false;
    const f = parseFacts(text(s));
    return f.dmg > 0 || f.dot > 0 || f.defDown > 0;
  }));
}

/** The skill that blocks a key: the lowest skill has no cooldown, so it is always ready and the skills above never fire. */
export function keyBlocker(data: GameData, build: Build, col: number): Skill | null {
  const st = stackSkills(data, build, col);
  return st.length > 1 && buildCd(data, build, st[0]) <= 0 ? st[0] : null;
}

/** Slots ("row:col") whose skill never fires, with the skill below that blocks them. */
export function blockedSlots(data: GameData, build: Build): Map<string, Skill> {
  const out = new Map<string, Skill>();
  for (const col of BAR_ORDER) {
    const blocker = keyBlocker(data, build, col);
    if (!blocker) continue;
    let seenBlocker = false;
    for (let row = 0; row < BAR_ROWS; row++) {
      const id = build.bar[slotKey(row, col)];
      if (!id || !data.skillById.has(id)) continue;
      if (!seenBlocker) { seenBlocker = true; continue; }
      out.set(slotKey(row, col), blocker);
    }
  }
  return out;
}

export type StepIssue = 'empty' | 'basic' | 'blocked' | 'charged';

/** What is wrong with a macro step that presses key `col` (shown on the step row itself). */
export function stepIssues(data: GameData, build: Build, col: number): StepIssue[] {
  const out: StepIssue[] = [];
  const st = stackSkills(data, build, col);
  if (!st.length) out.push('empty');
  if (col === BASIC_COL) out.push('basic');
  if (keyBlocker(data, build, col)) out.push('blocked');
  if (st.some(isCharged)) out.push('charged');
  return out;
}

/** The key a skill sits on first (in the order of the skill window), by skill id. */
export function placedKeys(build: Build): Map<number, number> {
  const out = new Map<number, number>();
  for (const col of BAR_ORDER) {
    for (let row = 0; row < BAR_ROWS; row++) {
      const id = build.bar[slotKey(row, col)];
      if (id && !out.has(id)) out.set(id, col);
    }
  }
  return out;
}

/* ---- drag and drop: an own data type, so a drop on a text field does not paste "skill:123" ---- */
export const HOTBAR_MIME = 'application/x-daevaforge-hotbar';
/** a second type on slot drags only, so the skill list can tell them apart while they hover it */
const SLOT_MIME = 'application/x-daevaforge-slot';

export type DragPayload = { kind: 'skill'; id: number } | { kind: 'slot'; key: string };

export function startDrag(e: DragEvent, p: DragPayload) {
  e.dataTransfer.setData(HOTBAR_MIME, p.kind === 'skill' ? `skill:${p.id}` : `slot:${p.key}`);
  if (p.kind === 'slot') e.dataTransfer.setData(SLOT_MIME, p.key);
  e.dataTransfer.effectAllowed = p.kind === 'skill' ? 'copy' : 'move';
}

/** true while one of our drags hovers the element (the payload itself is only readable on drop). */
export const isHotbarDrag = (e: DragEvent) => Array.from(e.dataTransfer.types).includes(HOTBAR_MIME);
/** true while a slot (not a skill from the list) hovers the element */
export const isSlotDrag = (e: DragEvent) => Array.from(e.dataTransfer.types).includes(SLOT_MIME);

export function readDrag(e: DragEvent): DragPayload | null {
  const raw = e.dataTransfer.getData(HOTBAR_MIME);
  if (raw.startsWith('skill:')) {
    const id = Number(raw.slice(6));
    return Number.isFinite(id) && id > 0 ? { kind: 'skill', id } : null;
  }
  if (raw.startsWith('slot:')) return { kind: 'slot', key: raw.slice(5) };
  return null;
}
