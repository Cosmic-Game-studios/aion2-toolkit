import { Heart, ScrollText, Eye } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { ClassEmblem, useClassName } from '../../components/ClassSelect';
import { SkillTile } from '../../components/SkillTile';
import { isMine, type BuildSummary } from '../../lib/communityApi';

export const fmtDate = (iso: string, lang: string) => {
  try { return new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(new Date(iso)); } catch { return iso.slice(0, 10); }
};

export function BuildCard({ b }: { b: BuildSummary }) {
  const { t, data, lang } = useLoadedGame();
  const className = useClassName();
  return (
    <a className="build-card" href={`#/community/${b.id}`}>
      <div className="bc-head">
        <ClassEmblem cls={b.class} size={42} />
        <div className="bc-titles">
          <div className="bc-title">{b.title}</div>
          <div className="muted small">{className(b.class)} · {t('lv')} {b.level} · {t('by', { name: b.author })}</div>
        </div>
        {isMine(b.id) && <span className="chip accent">{t('yours')}</span>}
      </div>
      <div className="bc-icons">
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
      {b.description && <p className="bc-desc">{b.description}</p>}
      <div className="bc-foot">
        <div className="chips">{b.tags.slice(0, 4).map((tag) => <span key={tag} className="chip">#{tag}</span>)}</div>
        <div className="bc-stats">
          {b.preview.macros > 0 && <span title={t('macros')}><ScrollText size={14} /> {b.preview.macros}</span>}
          <span title={t('views')}><Eye size={14} /> {b.views}</span>
          <span title={t('likes')} className={b.liked ? 'liked' : ''}><Heart size={14} /> {b.likes}</span>
          <span className="muted">{fmtDate(b.createdAt, lang)}</span>
        </div>
      </div>
    </a>
  );
}
