interface Props {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  label?: string;
}

export function LevelStepper({ value, min, max, onChange, disabled, label }: Props) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, v)));
  return (
    <div className={`stepper ${disabled ? 'disabled' : ''}`} aria-label={label}>
      <button type="button" onClick={() => set(value - 1)} disabled={disabled || value <= min} aria-label="-">&minus;</button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => set(Number(e.target.value) || min)}
      />
      <button type="button" onClick={() => set(value + 1)} disabled={disabled || value >= max} aria-label="+">+</button>
      <button type="button" className="max" onClick={() => set(max)} disabled={disabled || value >= max}>MAX</button>
    </div>
  );
}
