import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import { cx, formatDecimal, formatSignedHm3 } from '../../lib/format'

interface TrendBadgeProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  showRange?: boolean
  className?: string
}

export function TrendBadge({ value, size = 'sm', showRange = false, className }: TrendBadgeProps) {
  const positive = value > 0.0001
  const negative = value < -0.0001
  const Icon = positive ? TrendingUp : negative ? TrendingDown : Minus
  const tone = positive
    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
    : negative
      ? 'border-rose-200 bg-rose-50 text-rose-700'
      : 'border-slate-200 bg-slate-50 text-slate-600'

  const sizeClasses =
    size === 'lg'
      ? 'gap-2 rounded-xl px-3 py-2 text-sm'
      : size === 'md'
        ? 'gap-1.5 rounded-lg px-2.5 py-1.5 text-xs'
        : 'gap-1 rounded-md px-2 py-1 text-[11px]'

  const label = positive
    ? `Subida de ${formatDecimal(value)} hectómetros cúbicos en los últimos 7 días`
    : negative
      ? `Bajada de ${formatDecimal(Math.abs(value))} hectómetros cúbicos en los últimos 7 días`
      : 'Sin cambios en los últimos 7 días'

  return (
    <span
      className={cx('inline-flex items-center border font-semibold tnum', tone, sizeClasses, className)}
      title={label}
    >
      <Icon className={size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden="true" strokeWidth={2.2} />
      <span className="sr-only">{label}: </span>
      <span>{formatSignedHm3(value)}</span>
      {showRange && <span className="font-medium opacity-70">· 7 días</span>}
    </span>
  )
}
