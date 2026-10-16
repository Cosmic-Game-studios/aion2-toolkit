import { useId, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import {
  ChevronDown, CircleCheck, ExternalLink, Flag, Github, MapPin, MapPinCheck, NotebookPen, Pencil, RotateCcw, Send, Trash2,
  TriangleAlert, UserRound, ShieldCheck, Clock,
} from 'lucide-react';
import { useGame } from '../../data/GameDataContext';
import { useToast } from '../../components/Toast';
import { storage } from '../../lib/storage';
import { CATEGORIES, REGIONS, categoryById, type FarmSpot, type Lang } from './farmRules';
import { GROUP_COLOR, categoryIcon } from './farmIcons';
import { restoreDraft, type Draft } from './farmDrafts';
import { changeReportUrl, issueParts } from './farmSubmit';

export interface DraftsPanelProps {
  drafts: Draft[];
  onEdit: (d: Draft) => void;
  onRemove: (cid: string) => void;
  onSent: (cids: string[]) => void;
  /** the player is placing a spot on the map: editing or deleting a draft now would throw that spot away */
  editLocked?: boolean;
  /**
   * The approved spots by cid. A draft among `drafts` whose cid is approved was changed after sending (see draftDone):
   * its change goes to GitHub as a report on the approved spot, not as a new spot.
   */
  approved?: ReadonlyMap<string, FarmSpot>;
  /** takes the focus when the last draft is deleted and the panel goes away */
  fallbackFocus?: () => void;
}

/** whether the list is folded; the submit part always shows */
const OPEN_KEY = 'farmDraftsOpen';

const shortDate = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * The player's own spots that are not on the map yet (every region), and the links that send them to GitHub as
 * prefilled issues. Sent drafts stay until the import action puts them on the map (the page then drops them).
 */
export function DraftsPanel({ drafts, onEdit, onRemove, onSent, editLocked = false, approved, fallbackFocus }: DraftsPanelProps) {
  const { t, lang } = useGame();
  const toast = useToast();
  const uid = useId().replace(/:/g, '');
  const headRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(() => storage.get<boolean>(OPEN_KEY, true) !== false);
  const toggle = () => { storage.set(OPEN_KEY, !open); setOpen(!open); };

  // grouped by region in the order of the regions; within a region in the order they were noted
  const groups = useMemo(() => {
    const order = new Map(REGIONS.map((r, i) => [r.id, i]));
    const by = new Map<string, Draft[]>();
    for (const d of drafts) by.set(d.region, [...(by.get(d.region) ?? []), d]);
    return [...by.entries()]
      .sort(([a], [b]) => (order.get(a) ?? REGIONS.length) - (order.get(b) ?? REGIONS.length))
      .map(([region, items]) => ({ region, name: REGIONS.find((r) => r.id === region)?.name[lang] ?? region, items }));
  }, [drafts, lang]);

  // an earlier version is on the map: sending the draft again would be skipped as a duplicate
  const changed = useMemo(
    () => drafts.flatMap((d) => { const spot = approved?.get(d.cid); return spot ? [{ d, spot }] : []; }),
    [drafts, approved],
  );
  const unsent = useMemo(() => drafts.filter((d) => d.status === 'draft' && !approved?.has(d.cid)), [drafts, approved]);
  const sent = useMemo(() => drafts.filter((d) => d.status === 'sent' && !approved?.has(d.cid)), [drafts, approved]);
  const newParts = useMemo(() => issueParts(unsent, lang), [unsent, lang]);
  const againParts = useMemo(() => issueParts(sent, lang), [sent, lang]);
  const newLinks = newParts.links;
  const againLinks = againParts.links;
  // too long for any issue address: no link (it could not work), the player shortens them first
  const tooLong = useMemo(() => new Set([...newParts.tooLong, ...againParts.tooLong]), [newParts, againParts]);
  const tooLongDrafts = useMemo(() => drafts.filter((d) => tooLong.has(d.cid)), [drafts, tooLong]);
  // not sent yet: new spots and changes to spots on the map alike
  const waiting = drafts.filter((d) => d.status === 'draft').length;

  if (!drafts.length) return null;

  const remove = (d: Draft) => {
    const index = drafts.indexOf(d);
    // the row goes away: the focus moves to the next row (or the one before, or the heading)
    const rows = [...(listRef.current?.querySelectorAll<HTMLElement>('[data-fd-row]') ?? [])];
    const at = rows.findIndex((r) => r.dataset.fdRow === d.cid);
    const next = rows[at + 1] ?? rows[at - 1];
    const nextCid = next?.dataset.fdRow;
    onRemove(d.cid);
    toast(t('farmDraftDeleted', { name: d.name }), 'ok', {
      action: { label: t('undo'), onClick: () => { restoreDraft(d, index); } },
    });
    requestAnimationFrame(() => {
      const target = nextCid ? listRef.current?.querySelector<HTMLElement>(`[data-fd-row="${nextCid}"] .fd-delete`) : null;
      // the last draft: the page drops the panel, so the heading is gone too
      const el = target ?? headRef.current;
      if (el) el.focus();
      else fallbackFocus?.();
    });
  };

  /**
   * A link opens GitHub in a new tab (a middle click too) and marks its drafts as sent. The links are made again from
   * what is left, so the clicked one may go away: the focus then waits on the next link for the player's return.
   */
  const send = (cids: string[]) => {
    onSent(cids);
    requestAnimationFrame(() => {
      const box = submitRef.current;
      if (!box || box.contains(document.activeElement)) return;
      box.querySelector<HTMLElement>('[data-fd-send]')?.focus({ preventScroll: true });
    });
  };
  const sentBy = (cids: string[]) => ({
    onClick: () => send(cids),
    onAuxClick: (e: MouseEvent) => { if (e.button === 1) send(cids); },
  });
  const newTab = <span className="sr-only"> ({t('gdNewTab')})</span>;
  const spotCount = (n: number) => (n === 1 ? t('farmSubmitOneSpot') : t('farmSubmitSpots', { n }));

  return (
    <section className="card fd-panel" aria-labelledby={`${uid}-h`}>
      <header className="fd-head">
        <h2 id={`${uid}-h`} ref={headRef} tabIndex={-1}>
          <NotebookPen size={18} aria-hidden /> {t('farmDraftTitle')} <span className="count">{drafts.length}</span>
        </h2>
        <button type="button" className="btn ghost sm fd-toggle" aria-expanded={open} aria-controls={`${uid}-list`} onClick={toggle}>
          <ChevronDown size={15} aria-hidden className="fd-chevron" />
          {open ? t('farmDraftHide') : t('farmDraftShow')}
        </button>
      </header>
      <p className="fd-status" role="status">
        {waiting ? t('farmDraftUnsent', { n: waiting, all: drafts.length }) : t('farmDraftAllSent')}
      </p>

      <div className="fd-groups" id={`${uid}-list`} ref={listRef} hidden={!open}>
        {groups.map((g) => (
          <div key={g.region} className="fd-group" role="group" aria-labelledby={`${uid}-r-${g.region}`}>
            <h3 id={`${uid}-r-${g.region}`} className="fd-region">{g.name} <span className="count">{g.items.length}</span></h3>
            <ul className="fd-list">
              {g.items.map((d) => {
                const cat = categoryById(d.cat) ?? CATEGORIES[CATEGORIES.length - 1];
                const Icon = categoryIcon(d.cat);
                const state = approved?.has(d.cid) ? 'onmap' : tooLong.has(d.cid) ? 'toolong' : d.status;
                return (
                  <li key={d.cid} className={`fd-row ${d.status}`} data-fd-row={d.cid} style={{ '--fc': GROUP_COLOR[cat.group] } as CSSProperties}>
                    <span className="fd-icon" aria-hidden><Icon size={16} /></span>
                    <div className="fd-main">
                      <strong className="fd-name">{d.name}</strong>
                      <span className="fd-sub">
                        <span>{cat.name[lang]}</span>
                        <span className="fd-where">
                          {d.area ?? (d.pos ? <><MapPin size={12} aria-hidden /> {t('farmDraftPosSet')}</> : null)}
                        </span>
                      </span>
                    </div>
                    <span className={`fd-badge ${state}`}>
                      {state === 'onmap' ? <MapPinCheck size={13} aria-hidden />
                        : state === 'toolong' ? <TriangleAlert size={13} aria-hidden />
                        : state === 'sent' ? <CircleCheck size={13} aria-hidden /> : <Clock size={13} aria-hidden />}
                      {state === 'onmap' ? t('farmDraftOnMap')
                        : state === 'toolong' ? t('farmDraftTooLong')
                        : state === 'sent' ? (d.sentAt ? t('farmDraftSentOn', { date: shortDate(d.sentAt, lang) }) : t('farmDraftSent'))
                        : t('farmDraftDraft')}
                    </span>
                    <div className="fd-tools">
                      <button
                        type="button" className="icon-btn sm" onClick={() => onEdit(d)} disabled={editLocked}
                        aria-label={t('farmDraftEdit', { name: d.name })} title={t('farmDraftEdit', { name: d.name })}
                      >
                        <Pencil size={15} aria-hidden />
                      </button>
                      <button
                        type="button" className="icon-btn sm fd-delete" onClick={() => remove(d)} disabled={editLocked}
                        aria-label={t('farmDraftDelete', { name: d.name })} title={t('farmDraftDelete', { name: d.name })}
                      >
                        <Trash2 size={15} aria-hidden />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="fd-submit" role="group" aria-labelledby={`${uid}-s`} ref={submitRef}>
        <h3 id={`${uid}-s`} className="fd-submit-title"><Github size={16} aria-hidden /> {t('farmSubmitTitle')}</h3>
        <ul className="fd-how">
          <li><UserRound size={15} aria-hidden /> <span>{t('farmSubmitAccount')}</span></li>
          <li><Send size={15} aria-hidden /> <span>{t('farmSubmitSteps')}</span></li>
          <li><ShieldCheck size={15} aria-hidden /> <span>{t('farmSubmitOwn')}</span></li>
          <li><CircleCheck size={15} aria-hidden /> <span>{t('farmSubmitReview')}</span></li>
        </ul>

        {newLinks.length > 0 && (
          <>
            {newLinks.length > 1 && <p className="fd-parts">{t('farmSubmitParts', { n: newLinks.length })}</p>}
            <div className="fd-links">
              {newLinks.map((l, i) => (
                <a key={l.cids.join()} className="btn primary fd-link" href={l.url} target="_blank" rel="noopener" data-fd-send {...sentBy(l.cids)}>
                  <Send size={16} aria-hidden />
                  {newLinks.length > 1 ? t('farmSubmitPart', { i: i + 1, n: newLinks.length }) : t('farmSubmitOne')}
                  {' '}<span className="fd-link-n">{spotCount(l.cids.length)}</span>
                  <ExternalLink size={14} aria-hidden />
                  {newTab}
                </a>
              ))}
            </div>
          </>
        )}

        {tooLongDrafts.length > 0 && (
          <div className="hint-box warn fd-toolong">
            <TriangleAlert size={15} aria-hidden />
            <div className="fd-toolong-body">
              <p>{t('farmSubmitTooLong')}</p>
              <ul className="fd-fix-list">
                {tooLongDrafts.map((d) => (
                  <li key={d.cid}>
                    <button type="button" className="btn ghost sm" onClick={() => onEdit(d)} disabled={editLocked}>
                      <Pencil size={14} aria-hidden /> {t('farmDraftEdit', { name: d.name })}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {changed.length > 0 && (
          <div className="fd-again">
            <p className="field-hint">{t('farmSubmitChangedHint')}</p>
            <div className="fd-links">
              {changed.map(({ d, spot }) => (
                <a key={d.cid} className="btn ghost sm fd-link" href={changeReportUrl(spot, d, lang, t('farmReportChangeIntro'))} target="_blank" rel="noopener">
                  <Flag size={14} aria-hidden />
                  {t('farmSubmitReportChange', { name: d.name })}
                  {newTab}
                </a>
              ))}
            </div>
          </div>
        )}

        {againLinks.length > 0 && (
          <div className="fd-again">
            <p className="field-hint">{t('farmSubmitAgainHint')}</p>
            <div className="fd-links">
              {againLinks.map((l, i) => (
                <a key={l.cids.join()} className="btn ghost sm fd-link" href={l.url} target="_blank" rel="noopener" data-fd-send {...sentBy(l.cids)}>
                  <RotateCcw size={14} aria-hidden />
                  {againLinks.length > 1 ? t('farmSubmitAgainPart', { i: i + 1, n: againLinks.length }) : t('farmSubmitAgain')}
                  {' '}<span className="fd-link-n">{spotCount(l.cids.length)}</span>
                  {newTab}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
