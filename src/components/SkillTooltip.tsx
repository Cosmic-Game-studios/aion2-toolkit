import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Timer, Droplet } from 'lucide-react';
import type { Skill } from '../data/types';
import { iconUrl } from '../data/loadData';
import { useGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { applyCdr, cdAt, cdTier, fmtCdLong } from '../lib/cooldown';
import { richText } from '../lib/format';

interface TipState { skill: Skill; level: number; rect: DOMRect }
interface Ctx { show: (skill: Skill, level: number, el: Element) => void; hide: () => void }

const TipCtx = createContext<Ctx>({ show: () => {}, hide: () => {} });

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [tip, setTip] = useState<TipState | null>(null);
  const show = useCallback((skill: Skill, level: number, el: Element) => setTip({ skill, level, rect: el.getBoundingClientRect() }), []);
  const hide = useCallback(() => setTip(null), []);
  useEffect(() => {
    if (!tip) return;
    window.addEventListener('scroll', hide, true);
    return () => window.removeEventListener('scroll', hide, true);
  }, [tip, hide]);
  return (
    <TipCtx.Provider value={{ show, hide }}>
      {children}
      {tip && <TipCard {...tip} />}
    </TipCtx.Provider>
  );
}

/** Spread onto any element to show the skill tooltip on hover / keyboard focus. */
export function useSkillTip(skill: Skill | undefined, level = 1) {
  const { show, hide } = useContext(TipCtx);
  if (!skill) return {};
  return {
    onMouseEnter: (e: React.MouseEvent) => show(skill, level, e.currentTarget),
    onMouseLeave: hide,
    onFocus: (e: React.FocusEvent) => show(skill, level, e.currentTarget),
    onBlur: hide,
  };
}

function TipCard({ skill, level, rect }: TipState) {
  const { t } = useGame();
  const { build } = useBuild();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: -9999, top: -9999 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const gap = 10;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    let left = rect.right + gap;
    let top = rect.top;
    if (left + w > vw - 8) left = rect.left - w - gap;
    if (left < 8) {
      // no room beside the element: place it below (or above)
      left = clamp(rect.left, 8, vw - w - 8);
      top = rect.bottom + gap + h > vh - 8 ? rect.top - h - gap : rect.bottom + gap;
    }
    setPos({ left, top: clamp(top, 8, vh - h - 8) });
  }, [rect]);

  const lv = Math.max(1, Math.min(skill.levels.length || 1, level));
  const base = cdAt(skill, lv);
  const cd = applyCdr(base, build.cdr);
  const desc = skill.levels[lv - 1]?.description ?? skill.description;
  const kind = skill.isStigma ? 'stigma' : skill.type;
  const mp = skill.cost?.mp;

  return (
    <div ref={ref} className={`tipcard tip-${kind}`} style={{ left: pos.left, top: pos.top }} role="tooltip">
      <div className="tip-head">
        <img src={iconUrl(skill.icon)} alt="" width={44} height={44} />
        <div>
          <div className="tip-name">{skill.name}</div>
          <div className="tip-sub">
            <span className={`kind-tag ${kind}`}>{skill.isStigma ? t('stigma') : t(skill.type)}</span>
            <span>{t('lv')} {lv}{skill.maxLevel ? ` / ${skill.maxLevel}` : ''}</span>
          </div>
        </div>
      </div>
      <div className="tip-stats">
        <span className={`cd-chip cd-${cdTier(cd)}`}>
          <Timer size={13} />
          {cd > 0 ? fmtCdLong(cd) : t('noCooldown')}
          {cd > 0 && cd !== base && <s>{fmtCdLong(base)}</s>}
        </span>
        {mp ? <span className="chip"><Droplet size={13} /> {mp} {t('mpCost')}</span> : null}
        <span className="chip">{skill.castTimeSec ? `${skill.castTimeSec} s` : t('instant')}</span>
      </div>
      <p className="tip-desc">{richText(desc)}</p>
    </div>
  );
}
