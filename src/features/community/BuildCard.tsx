import { Heart, ScrollText, Eye } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { SkillTile } from '../../components/SkillTile';
import { isMine, type BuildSummary } from '../../lib/communityApi';
import { fmtDate } from '../../lib/format';

/** One community build in the list. The title link covers the whole card; tags filter the list. */
export function BuildCard({ b, onTag, onOpen }: { b: BuildSummary; onTag?: (tag: string) => void; onOpen?: () => void }) {
  const { t, data, lang } = useLoadedGame();
  const className = useClassName();
  return (
    <article className="build-card">
      <div className="bc-head">
        <ClassEmblem cls={b.class} size={42} />
        <div className="bc-titles">
          <h3 className="bc-title"><a className="bc-link" href={`#/community/${b.id}`} onClick={onOpen}>{b.title}</a></h3>
          <p className="bc-sub">{className(b.class)} · {t('lv')} {b.level} · {t('by', { name: b.author || t('cmAnonymous') })}</p>
        </div>
        {isMine(b.id) && <span className="chip accent">{t('yours')}</span>}
      </div>
      {(b.preview.bar.length > 0 || b.preview.stigmas.length > 0) && (
        <div className="bc-icons" aria-hidden>
          {b.preview.bar.map((id, i) => {
            const s = data.skillById.get(id);
            return s ? <SkillTile key={`b${i}`} skill={s} size={30} showCd={false} tip={false} /> : null;
          })}
          {b.preview.stigmas.length > 0 && <span className="bc-sep" />}
          {b.preview.stigmas.map((id) => {
            const s = data.skillById.get(id);
            return s ? <SkillTile key={`s${id}`} skill={s} size={30} showCd={false} tip={false} /> : null;
          })}
        </div>
      )}
      {b.description && <p className="bc-desc">{b.description}</p>}
      <div className="bc-foot">
        {b.tags.length > 0 && (
          <div className="bc-tags">
            {b.tags.slice(0, 4).map((tag) => onTag
              ? <button key={tag} type="button" className="chip bc-tag" onClick={() => onTag(tag)} aria-label={t('cmFilterTag', { tag })}>#{tag}</button>
              : <span key={tag} className="chip">#{tag}</span>)}
          </div>
        )}
        <div className="bc-stats">
          {b.preview.macros > 0 && <span><ScrollText size={14} aria-hidden /> {b.preview.macros}<span className="sr-only"> {t('macros')}</span></span>}
          <span><Eye size={14} aria-hidden /> {b.views}<span className="sr-only"> {t('views')}</span></span>
          <span className={b.liked ? 'liked' : ''}><Heart size={14} aria-hidden fill={b.liked ? 'currentColor' : 'none'} /> {b.likes}<span className="sr-only"> {t('likes')}</span></span>
          <time dateTime={b.createdAt}>{fmtDate(b.createdAt, lang)}</time>
        </div>
      </div>
    </article>
  );
}
