interface Props { label: string; spent: number; max: number; unit?: string; hint?: string }

export function PointBar({ label, spent, max, unit = '', hint }: Props) {
  const pct = max > 0 ? Math.min(100, (spent / max) * 100) : 0;
  const over = spent > max;
  return (
    <div className={`pointbar ${over ? 'over' : ''}`} title={hint}>
      <div className="pointbar-head">
        <span>{label}</span>
        <strong>{spent} / {max}{unit}</strong>
      </div>
      <div className="pointbar-track"><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
