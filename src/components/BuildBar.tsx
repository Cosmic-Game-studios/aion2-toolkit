import { useState } from 'react';
import { Link2, RotateCcw, Timer, Upload, Minus, Plus } from 'lucide-react';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { daevanionTotals, shardBudget, shardsSpent, skillPointBudget, skillPointsSpent } from '../lib/buildCalc';
import { buildShareUrl, copyText, readHash } from '../lib/shareLink';
import { ClassSelect } from './ClassSelect';
import { Meter } from './ui';
import { useToast } from './Toast';
import { UploadDialog } from '../features/community/UploadDialog';
import { COMMUNITY_ENABLED } from '../lib/communityApi';

/** Sticky strip on every planner page: class, level, cooldown reduction, budgets and build actions. */
export function BuildBar() {
  const { t, data } = useLoadedGame();
  const { build, setBuild, resetBuild } = useBuild();
  const toast = useToast();
  const [uploadOpen, setUploadOpen] = useState(false);

  const sp = skillPointBudget(data, build);
  const shards = shardBudget(data, build);
  const dv = daevanionTotals(data, build).DaevanionCrystal;
  const setLevel = (l: number) => setBuild({ l: Math.min(100, Math.max(1, Math.round(l) || 1)) });

  return (
    <div className="buildbar">
      <div className="buildbar-inner">
        <ClassSelect />

        <div className="bb-field level-field">
          <span className="eyebrow">{t('charLevel')}</span>
          <div className="level-ctl">
            <button type="button" className="icon-btn sm" onClick={() => setLevel(build.l - 1)} aria-label="-"><Minus size={14} /></button>
            <input type="number" min={1} max={100} value={build.l} onChange={(e) => setLevel(Number(e.target.value))} aria-label={t('charLevel')} />
            <button type="button" className="icon-btn sm" onClick={() => setLevel(build.l + 1)} aria-label="+"><Plus size={14} /></button>
            <input type="range" min={1} max={100} value={build.l} onChange={(e) => setLevel(Number(e.target.value))} aria-label={t('charLevel')} />
          </div>
        </div>

        <label className="bb-field cdr-field" title={t('cdrHint')}>
          <span className="eyebrow"><Timer size={12} /> {t('cdr')}</span>
          <span className="suffix-input">
            <input type="number" min={0} max={90} value={build.cdr} onChange={(e) => setBuild({ cdr: Math.min(90, Math.max(0, Math.round(Number(e.target.value)) || 0)) })} />
            <span>%</span>
          </span>
        </label>

        <div className="bb-meters">
          <Meter label={t('skillPoints')} spent={skillPointsSpent(data, build)} max={sp.total} />
          <Meter label={t('stigmaShards')} spent={shardsSpent(data, build)} max={shards.total} />
          {dv && <Meter label={t('daevanionPts')} spent={dv.spent} max={dv.max} />}
        </div>

        <div className="bb-actions">
          <button
            type="button"
            className={`btn ${COMMUNITY_ENABLED ? 'ghost' : 'primary'}`}
            title={t('copyLink')}
            onClick={async () => {
              const url = buildShareUrl(readHash().base, build);
              toast((await copyText(url)) ? t('linkCopied') : t('copyFailed'), 'ok');
            }}
          >
            <Link2 size={16} /> <span className="hide-sm">{t('copyLink')}</span>
          </button>
          {COMMUNITY_ENABLED && (
            <button type="button" className="btn primary" title={t('uploadBuild')} onClick={() => setUploadOpen(true)}>
              <Upload size={16} /> <span className="hide-sm">{t('uploadBuild')}</span>
            </button>
          )}
          <button type="button" className="icon-btn" title={t('resetAll')} aria-label={t('resetAll')} onClick={() => { if (confirm(t('resetConfirm'))) resetBuild(); }}>
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      {uploadOpen && <UploadDialog onClose={() => setUploadOpen(false)} />}
    </div>
  );
}
