import { clamp, cx } from '../../lib/format'

interface WaterBarProps {
  value: number
  label: string
  className?: string
  height?: 'sm' | 'md'
  tone?: 'water' | 'cyan' | 'blue'
}

const toneClasses = {
  water: 'water-gradient-soft',
  cyan: 'bg-cyan-600',
  blue: 'bg-blue-600',
}

export function WaterBar({ value, label, className, height = 'sm', tone = 'water' }: WaterBarProps) {
  const safeValue = clamp(value, 0, 100)

  return (
    <div
      className={cx(
        'relative w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200/70',
        height === 'md' ? 'h-2.5' : 'h-2',
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(safeValue * 100) / 100}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cx('water-fill h-full rounded-full', toneClasses[tone])}
        style={{
          width: `${safeValue}%`,
          minWidth: safeValue > 0 ? '4px' : 0,
        }}
      />
    </div>
  )
}
