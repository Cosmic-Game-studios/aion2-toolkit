import type { Board, BoardNode, ClassType, ComboData, DaevanionData, GameData, Lang, Skill, SkillCosts, SkillPoints, ClassInfo } from './types';

const cache = new Map<Lang, Promise<GameData>>();
const STIGMA_UNLOCK_LEVEL = 22;

interface LearnLevels { levels: Partial<Record<ClassType, Record<string, number>>> }

const base = () => import.meta.env.BASE_URL.replace(/\/?$/, '/');

async function getJson<T>(lang: Lang, file: string): Promise<T> {
  const res = await fetch(`${base()}data/${lang}/${file}.json`);
  if (!res.ok) throw new Error(`Failed to load ${file}.json (${res.status})`);
  return res.json() as Promise<T>;
}

type RawNode = [number, number, 'S' | 'T' | 'K', BoardNode['grade'], string, string, number | null, number, number];
interface RawBoard { id: number; name: string; needLevel: number; pointType: Board['pointType']; nodes: RawNode[] }
interface RawDaevanion {
  points: DaevanionData['points'];
  classes: Record<ClassType, { name: string; boards: RawBoard[] }>;
}

function parseDaevanion(raw: RawDaevanion): DaevanionData {
  const classes = {} as DaevanionData['classes'];
  for (const [cls, c] of Object.entries(raw.classes) as [ClassType, RawDaevanion['classes'][ClassType]][]) {
    classes[cls] = {
      name: c.name,
      boards: c.boards.map((b) => ({
        id: b.id,
        name: b.name,
        needLevel: b.needLevel,
        pointType: b.pointType,
        nodes: b.nodes.map(([x, y, kind, grade, label, key, value, cost, needLevel]) => ({
          x, y, kind, grade, label, key: String(key), value, cost, needLevel,
        })),
      })),
    };
  }
  return { points: raw.points, classes };
}

export function loadGameData(lang: Lang): Promise<GameData> {
  let p = cache.get(lang);
  if (!p) {
    p = (async () => {
      const optional = <T,>(file: string) =>
        fetch(`${base()}data/${file}.json`)
          .then((r) => (r.ok && (r.headers.get('content-type') ?? '').includes('json') ? (r.json() as Promise<T>) : null))
          .catch(() => null);
      const [classes, skills, costs, points, dv, learn, combos] = await Promise.all([
        getJson<ClassInfo[]>(lang, 'classes'),
        getJson<Skill[]>(lang, 'skills'),
        getJson<SkillCosts>(lang, 'skill-costs'),
        getJson<SkillPoints>(lang, 'skill-points'),
        getJson<RawDaevanion>(lang, 'daevanion'),
        optional<LearnLevels>('learn-levels'),
        optional<ComboData>('combos'),
      ]);
      // dbaion2 reports acquireLevel 1 everywhere; overlay the real learn levels (by class + icon) where known.
      for (const s of skills) {
        const lvl = learn?.levels?.[s.classType]?.[s.icon];
        if (lvl != null) s.acquireLevel = lvl;
        else if (s.isStigma) s.acquireLevel = Math.max(s.acquireLevel, STIGMA_UNLOCK_LEVEL);
      }
      return {
        lang,
        classes,
        skills,
        skillById: new Map(skills.map((s) => [s.id, s])),
        costs,
        points,
        daevanion: parseDaevanion(dv),
        combos: combos ?? { impact: [], classes: {} },
      };
    })();
    cache.set(lang, p);
    p.catch(() => cache.delete(lang));
  }
  return p;
}

export const iconUrl = (icon: string) => `${base()}icons/${icon}.webp`;

export const emblemUrl = (cls: ClassType): string | null => `${base()}emblems/${cls}.webp`;
