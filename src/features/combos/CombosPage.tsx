import { useMemo, useState } from 'react';
import { Info, Workflow } from 'lucide-react';
import { useLoadedGame } from '../../data/GameDataContext';
import { useBuild } from '../../state/BuildContext';
import { Card, EmptyState, PageHeader, Segmented } from '../../components/ui';
import { COMBO_KINDS, classCombos, comboReady, comboSkillIds, comboTouchesBuild, sortCombos, type ComboKind } from '../../lib/combos';
import type { Combo } from '../../data/types';
import type { StringKey } from '../../i18n/strings';
import { ComboCard } from './ComboCard';

export const comboKey = (c: Combo) => `${c.kind}-${'status' in c ? c.status : ''}-${'rel' in c ? c.rel : ''}-${comboSkillIds(c).join('.')}`;

export function CombosPage() {
  const { data, t } = useLoadedGame();
  const { build } = useBuild();
  const [kind, setKind] = useState<'all' | ComboKind>('all');
  const [mine, setMine] = useState(false);

  const all = classCombos(data, build);
  const list = useMemo(
    () => sortCombos(data, build, all.filter((c) => (kind === 'all' || c.kind === kind) && (!mine || comboTouchesBuild(data, build, c)))),
    [data, build, all, kind, mine],
  );
  const ready = all.filter((c) => comboReady(data, build, c)).length;
  const count = (k: ComboKind) => all.filter((c) => c.kind === k).length;

  return (
    <div className="page">
      <PageHeader icon={<Workflow size={22} />} title={t('combosTitle')} subtitle={t('homeCombosText')} />

      {all.length === 0 ? (
        <Card><EmptyState icon={<Workflow size={28} />} text={t('noComboData')} /></Card>
      ) : (
        <>
          <Card className="filters">
            <div className="filter-row">
              <Segmented<'all' | ComboKind>
                value={kind}
                onChange={setKind}
                options={[
                  { value: 'all', label: <>{t('all')} <span className="count">{all.length}</span></> },
                  ...COMBO_KINDS.filter((k) => count(k) > 0).map((k) => ({
                    value: k,
                    label: <>{t(`comboKind_${k}` as StringKey)} <span className="count">{count(k)}</span></>,
                  })),
                ]}
              />
              <label className="toggle">
                <input type="checkbox" checked={mine} onChange={(e) => setMine(e.target.checked)} />
                <span className="toggle-ui" />
                {t('onlyMine')}
              </label>
              <span className="muted small push">{t('comboCount', { n: list.length })} · {t('readyCount', { n: ready })}</span>
            </div>
          </Card>
          <p className="hint-box"><Info size={15} /> {t('combosHint')}</p>
          {list.length === 0
            ? <Card><EmptyState icon={<Workflow size={28} />} text={t('noCombos')} /></Card>
            : <div className="combo-grid">{list.map((c) => <ComboCard key={comboKey(c)} combo={c} />)}</div>}
        </>
      )}
    </div>
  );
}
