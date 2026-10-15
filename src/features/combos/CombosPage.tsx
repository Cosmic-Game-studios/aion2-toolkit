import { useEffect, useId, useMemo, useState } from 'react';
import { BookOpen, Check, ChevronDown, CircleDashed, RotateCcw, ShieldCheck, Workflow } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { Card, EmptyState, PageHeader, Segmented } from '../../components/ui';
import { useClassName } from '../../components/ClassSelect';
import { COMBO_CONTENT, COMBO_RATINGS, classCombos, comboTouchesBuild, sortCombos } from '../../lib/combos';
import { storage } from '../../lib/storage';
import type { CuratedCombo } from '../../data/combos';
import type { StringKey } from '../../i18n/strings';
import { ComboCard } from './ComboCard';
import { comboState } from './comboState';

type Rating = CuratedCombo['rating'];
type Content = CuratedCombo['content'][number];

const EXPAND_KEY = 'combos:expand';

export function CombosPage() {
  const { data, t } = useLoadedGame();
  const { build } = useBuild();
  const className = useClassName();
  const uid = useId().replace(/:/g, '');
  const [rating, setRating] = useState<'all' | Rating>('all');
  const [content, setContent] = useState<'all' | Content>('all');
  const [mine, setMine] = useState(false);
  // "Show all details": every card opens its "how to play it" (remembered)
  const [expand, setExpand] = useState(() => storage.get<boolean>(EXPAND_KEY, false));
  useEffect(() => { storage.set(EXPAND_KEY, expand); }, [expand]);

  const all = classCombos(data, build);
  const okRating = (c: CuratedCombo, r: 'all' | Rating) => r === 'all' || c.rating === r;
  const okContent = (c: CuratedCombo, x: 'all' | Content) => x === 'all' || c.content.includes(x);
  const okMine = (c: CuratedCombo) => !mine || comboTouchesBuild(data, build, c);

  const list = useMemo(
    () => sortCombos(data, build, all.filter((c) => okRating(c, rating) && okContent(c, content) && okMine(c))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, build, all, rating, content, mine],
  );
  const states = useMemo(() => new Map(list.map((c) => [c.id, comboState(data, build, c)])), [data, build, list]);
  const ready = list.filter((c) => states.get(c.id) === 'ready');
  const notReady = list.filter((c) => states.get(c.id) !== 'ready');

  // each facet counts what the other filters leave over, so the numbers match what a tap shows
  const countR = (r: 'all' | Rating) => all.filter((c) => okRating(c, r) && okContent(c, content) && okMine(c)).length;
  const countC = (x: 'all' | Content) => all.filter((c) => okContent(c, x) && okRating(c, rating) && okMine(c)).length;
  const filtered = rating !== 'all' || content !== 'all' || mine;
  const resetFilters = () => { setRating('all'); setContent('all'); setMine(false); };
  const cls = className(build.c);

  const grid = (items: CuratedCombo[]) => (
    <div className="combo-grid">
      {/* the key re-applies "Show all details" to every card when it is switched */}
      {items.map((c) => <ComboCard key={`${c.id}-${expand ? 1 : 0}`} combo={c} defaultOpen={expand} />)}
    </div>
  );

  return (
    <div className="page combos-page">
      <PageHeader
        icon={<Workflow size={22} />}
        title={`${t('combosTitle')} · ${cls}`}
        subtitle={t('combosSubtitle')}
        guide={{ id: 'combos', steps: [t('guideCombos1'), t('guideCombos2'), t('guideCombos3')] }}
      />

      {all.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Workflow size={28} />}
            text={t('noComboData')}
            action={<a className="btn sm" href={`#/database?cls=${build.c}`}><BookOpen size={15} aria-hidden /> {t('comboBrowseSkills', { cls })}</a>}
          />
        </Card>
      ) : (
        <>
          <Card className="combo-filters">
            <div className="combo-facets focus-inset">
              <Segmented<'all' | Rating>
                value={rating}
                onChange={setRating}
                label={t('comboRatingLabel')}
                options={[
                  { value: 'all', label: <>{t('all')} <span className="count">{countR('all')}</span></> },
                  ...COMBO_RATINGS.filter((r) => all.some((c) => c.rating === r)).map((r) => ({
                    value: r,
                    label: <>{t(`comboRating_${r}` as StringKey)} <span className="count">{countR(r)}</span></>,
                  })),
                ]}
              />
              <Segmented<'all' | Content>
                value={content}
                onChange={setContent}
                label={t('comboContentLabel')}
                options={[
                  { value: 'all', label: <>{t('comboContentAll')} <span className="count">{countC('all')}</span></> },
                  ...COMBO_CONTENT.filter((x) => all.some((c) => c.content.includes(x))).map((x) => ({
                    value: x,
                    label: <>{t(`comboContent_${x}` as StringKey)} <span className="count">{countC(x)}</span></>,
                  })),
                ]}
              />
            </div>
            <div className="combo-switches">
              <label className="toggle">
                <input type="checkbox" checked={mine} onChange={(e) => setMine(e.target.checked)} />
                <span className="toggle-ui" />
                {t('onlyMine')}
              </label>
              <label className="toggle">
                <input type="checkbox" checked={expand} onChange={(e) => setExpand(e.target.checked)} />
                <span className="toggle-ui" />
                {t('comboShowAll')}
              </label>
            </div>
            <div className="combo-filter-foot">
              <details className="combo-trust">
                <summary><ShieldCheck size={15} aria-hidden /> {t('combosCheckedShort')} <ChevronDown size={14} className="chev" aria-hidden /></summary>
                <p>{t('combosChecked')}</p>
              </details>
              <span className="combo-count" role="status">
                {t('comboCount', { n: list.length })} · {t('readyCount', { n: ready.length })}
              </span>
              {filtered && (
                <button type="button" className="btn ghost sm" onClick={resetFilters}>
                  <RotateCcw size={14} aria-hidden /> {t('comboResetFilters')}
                </button>
              )}
            </div>
          </Card>

          {list.length === 0 ? (
            <Card>
              <EmptyState
                icon={<Workflow size={28} />}
                text={t('noCombos')}
                action={<button type="button" className="btn sm" onClick={resetFilters}><RotateCcw size={14} aria-hidden /> {t('comboResetFilters')}</button>}
              />
            </Card>
          ) : (
            <>
              {ready.length > 0 && (
                <section className="combo-group" aria-labelledby={`${uid}-ready`}>
                  <h2 className="combo-group-title ok" id={`${uid}-ready`}>
                    <Check size={16} aria-hidden /> {t('comboReady')} <span className="count">{ready.length}</span>
                  </h2>
                  {grid(ready)}
                </section>
              )}
              {notReady.length > 0 && (
                <section className="combo-group" aria-labelledby={`${uid}-open`}>
                  <h2 className="combo-group-title" id={`${uid}-open`}>
                    <CircleDashed size={16} aria-hidden /> {t('comboGroupOpen')} <span className="count">{notReady.length}</span>
                  </h2>
                  {grid(notReady)}
                </section>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
