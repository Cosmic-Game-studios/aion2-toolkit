import type { ClassType } from '../data/types';
import { useGame } from '../data/GameDataContext';
import { emblemUrl } from '../data/loadData';

interface Props { value: ClassType; onChange: (c: ClassType) => void }

export function ClassPicker({ value, onChange }: Props) {
  const { data, t } = useGame();
  if (!data) return null;
  return (
    <div className="class-picker" role="radiogroup" aria-label={t('class')}>
      {data.classes.map((c) => {
        const url = emblemUrl(c.classType);
        return (
          <button
            key={c.classType}
            type="button"
            role="radio"
            aria-checked={c.classType === value}
            className={`class-btn ${c.classType === value ? 'active' : ''}`}
            title={c.name}
            onClick={() => onChange(c.classType)}
          >
            {url ? <img src={url} alt="" /> : <span className="class-initial">{c.name.slice(0, 2)}</span>}
            <span className="class-name">{c.name}</span>
          </button>
        );
      })}
    </div>
  );
}
