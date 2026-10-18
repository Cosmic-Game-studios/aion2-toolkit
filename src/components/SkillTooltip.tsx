import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Timer, Droplet, Hourglass, Layers, Link2 } from 'lucide-react';
import type { Skill } from '../data/types';
import { iconUrl } from '../data/loadData';
import { useGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { applyCdr, cdAt, cdTier, fmtCdLong } from '../lib/cooldown';
import { richText } from '../lib/format';
import { skillCap } from '../lib/levelCap';
import { activeSpecs } from '../lib/buildCalc';
import { workingSpecs } from '../lib/specEffects';

/** `neutral`: the skill of someone else's build (top players) – the visitor's specialisations and cooldown reduction stay out */
interface TipState { skill: Skill; level: number; rect: DOMRect; anchor: Element; tap: boolean; neutral: boolean }
interface Ctx {
  show: (skill: Skill, level: number, el: Element, tap?: boolean, neutral?: boolean) => void;
  hide: () => void;
  /** focus left the element: closes a tooltip that hover or focus opened (a tapped one waits for the next tap) */
  blur: () => void;
}

const TipCtx = createContext<Ctx>({ show: () => {}, hide: () => {}, blur: () => {} });

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [tip, setTip] = useState<TipState | null>(null);
  const card = useRef<HTMLDivElement>(null);
  // a tap on the element of an open tapped tooltip closes it; the click of that same tap must not open it again
  const closedBy = useRef<{ el: Element; at: number } | null>(null);
  const show = useCallback((skill: Skill, level: number, el: Element, tap = false, neutral = false) => {
    const c = closedBy.current;
    closedBy.current = null;
    if (tap && c && c.el === el && Date.now() - c.at < 1000) return;
    setTip({ skill, level, rect: el.getBoundingClientRect(), anchor: el, tap, neutral });
  }, []);
  const hide = useCallback(() => setTip(null), []);
  const blur = useCallback(() => setTip((x) => (x?.tap ? x : null)), []);
  useEffect(() => {
    if (!tip) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') hide(); };
    // any tap or click elsewhere, scrolling, a page change (Back, a key) or Escape closes it – it never sticks
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (card.current?.contains(target)) return; // a tapped card closes on its own click
      closedBy.current = tip.tap && tip.anchor.contains(target) ? { el: tip.anchor, at: Date.now() } : null;
      hide();
    };
    window.addEventListener('scroll', hide, true);
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', hide);
    return () => {
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', hide);
    };
  }, [tip, hide]);
  const value = useMemo(() => ({ show, hide, blur }), [show, hide, blur]);
  return (
    <TipCtx.Provider value={value}>
      {children}
      {tip && <TipCard {...tip} cardRef={card} onClose={hide} />}
    </TipCtx.Provider>
  );
}

/** Anything a tap already does something with: a tap there keeps its own action and opens no tooltip. */
const TAP_ACTION = 'a[href], button, summary, label, input, select, textarea, [role="button"], [role="link"], [role="tab"], [role="option"], [role="menuitem"], [tabindex]:not([tabindex="-1"])';

/**
 * Spread onto any element to show the skill tooltip on mouse hover or keyboard focus.
 * `tap`: a tap (touch, pen) opens it too, and the next tap anywhere closes it – except where the tap already has
 * an action (the element sits in a link or button, or the tap lands on a control inside it).
 * `neutral`: the skill belongs to another player's build – the card leaves out the visitor's specialisations and
 * cooldown reduction and shows only what the level itself gives (a stigma's automatic options).
 */
export function useSkillTip(skill: Skill | undefined, level = 1, opts?: { tap?: boolean; neutral?: boolean }) {
  const { show, hide, blur } = useContext(TipCtx);
  if (!skill) return {};
  const tap = opts?.tap;
  const neutral = !!opts?.neutral;
  const onTap = (e: React.MouseEvent) => {
    if ((e.nativeEvent as PointerEvent).pointerType === 'mouse') return;
    const el = e.currentTarget as HTMLElement;
    const hit = (e.target as Element).closest(TAP_ACTION);
    if (hit && hit !== el && el.contains(hit)) return;
    if (el.parentElement?.closest(TAP_ACTION)) return;
    show(skill, level, el, true, neutral);
  };
  return {
    onPointerEnter: (e: React.PointerEvent) => { if (e.pointerType === 'mouse') show(skill, level, e.currentTarget, false, neutral); },
    onPointerLeave: (e: React.PointerEvent) => { if (e.pointerType === 'mouse') hide(); },
    onFocus: (e: React.FocusEvent) => { if ((e.currentTarget as HTMLElement).matches(':focus-visible')) show(skill, level, e.currentTarget, false, neutral); },
    onBlur: blur,
    ...(tap ? { onClick: onTap } : {}),
  };
}

function TipCard({ skill, level, rect, tap, neutral, cardRef: ref, onClose }: TipState & { cardRef: React.RefObject<HTMLDivElement>; onClose: () => void }) {
  const { t, data } = useGame();
  const { build } = useBuild();
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
  }, [rect, ref]);

  const cap = skillCap(skill);
  const lv = Math.max(1, Math.min(skill.levels.length || 1, cap, level));
  const base = cdAt(skill, lv);
  const cd = neutral ? base : applyCdr(base, build.cdr);
  const desc = skill.levels[lv - 1]?.description ?? skill.description;
  const kind = skill.isStigma ? 'stigma' : skill.type;
  const mp = skill.cost?.mp;
  // specialisations that work in the current build (only for the build's class); neutral: only those the level unlocks by itself
  const specIds = neutral ? workingSpecs(skill, lv, []) : data && skill.classType === build.c ? activeSpecs(data, build, skill) : [];
  const specs = specIds.map((id) => skill.parts?.find((x) => x.id === id)).filter((x): x is NonNullable<typeof x> => !!x);
  const chain = skill.chain ?? [];

  return (
    <div ref={ref} className={`tipcard tip-${kind} ${tap ? 'tapped' : ''}`} style={{ left: pos.left, top: pos.top }} role="tooltip" onClick={tap ? onClose : undefined}>
      <div className="tip-head">
        <img src={iconUrl(skill.icon)} alt="" width={46} height={46} />
        <div>
          <div className="tip-name">{skill.name}</div>
          <div className="tip-sub">
            <span className={`kind-tag ${kind}`}>{skill.isStigma ? t('stigma') : t(skill.type)}</span>
            <span>{t('lv')} {lv} / {cap}</span>
          </div>
        </div>
      </div>
      <div className="tip-stats">
        <span className={`cd-chip cd-${cdTier(cd)}`}>
          <Timer size={13} />
          {cd > 0 ? fmtCdLong(cd) : t('noCooldown')}
          {cd > 0 && cd !== base && <s>{fmtCdLong(base)}</s>}
        </span>
        <span className="chip"><Hourglass size={12} /> {skill.castTimeSec ? `${skill.castTimeSec} s` : t('instant')}</span>
        {mp ? <span className="chip"><Droplet size={12} /> {mp} MP</span> : null}
      </div>
      <p className="tip-desc">{richText(desc)}</p>
      {specs.length > 0 && (
        <div className="tip-sec">
          <div className="tip-sec-title"><Layers size={12} /> {t('tipSpecs')}</div>
          <ul className="tip-specs">
            {specs.map((p) => (
              <li key={p.id}><img src={iconUrl(p.icon)} alt="" width={18} height={18} /><span>{richText(p.desc)}</span></li>
            ))}
          </ul>
        </div>
      )}
      {chain.length > 0 && (
        <div className="tip-sec">
          <div className="tip-sec-title"><Link2 size={12} /> {t('chainSkills')}</div>
          <p className="tip-chain">{chain.map((c) => c.name).join(' · ')}</p>
        </div>
      )}
    </div>
  );
}
