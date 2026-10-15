import type { Board, BoardNode, ClassType, DaevanionData, DataMeta, GameData, Lang, Skill, SkillCosts, SkillPoints, ClassInfo } from './types';

const cache = new Map<Lang, Promise<GameData>>();
const STIGMA_UNLOCK_LEVEL = 22;

/** Global-client facts per skill id: the level that teaches it and the icon the game shows. */
interface LearnLevels { skills?: Record<string, [level: number, icon: string]> }

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
      const [classes, skills, costs, points, dv, learn, meta] = await Promise.all([
        getJson<ClassInfo[]>(lang, 'classes'),
        getJson<Skill[]>(lang, 'skills'),
        getJson<SkillCosts>(lang, 'skill-costs'),
        getJson<SkillPoints>(lang, 'skill-points'),
        getJson<RawDaevanion>(lang, 'daevanion'),
        optional<LearnLevels>('learn-levels'),
        optional<DataMeta>('meta'),
      ]);
      // dbaion2 reports acquireLevel 1 everywhere and some Korean-client icons; overlay the Global learn level and icon.
      for (const s of skills) {
        const known = learn?.skills?.[s.id];
        if (known) {
          s.acquireLevel = known[0];
          if (known[1]) s.icon = known[1];
        } else if (s.isStigma) s.acquireLevel = Math.max(s.acquireLevel, STIGMA_UNLOCK_LEVEL);
      }
      return {
        lang,
        meta,
        classes,
        skills,
        skillById: new Map(skills.map((s) => [s.id, s])),
        costs,
        points,
        daevanion: parseDaevanion(dv),
      };
    })();
    cache.set(lang, p);
    p.catch(() => cache.delete(lang));
  }
  return p;
}

export const iconUrl = (icon: string) => `${base()}icons/${icon}.webp`;

export const emblemUrl = (cls: ClassType): string | null => `${base()}emblems/${cls}.webp`;
