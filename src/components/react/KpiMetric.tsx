import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '../../lib/format'

type Tone = 'cyan' | 'blue' | 'slate' | 'emerald' | 'rose'

const toneClasses: Record<Tone, string> = {
  cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  slate: 'bg-slate-100 text-slate-600 ring-slate-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
}

interface KpiMetricProps {
  label: string
  value: ReactNode
  unit?: string
  detail: ReactNode
  icon: LucideIcon
  tone?: Tone
  children?: ReactNode
  className?: string
}

export function KpiMetric({
  label,
  value,
  unit,
  detail,
  icon: Icon,
  tone = 'slate',
  children,
  className,
}: KpiMetricProps) {
  return (
    <article className={cx('surface flex min-w-0 flex-col p-5', className)}>
      <div className="flex items-center gap-2.5">
        <span className={cx('flex h-8 w-8 items-center justify-center rounded-lg ring-1', toneClasses[tone])}>
          <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
        </span>
        <h3 className="text-[13px] font-semibold leading-tight text-slate-700">{label}</h3>
      </div>

      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="text-[2rem] font-semibold leading-none tracking-[-0.035em] text-slate-950 tnum">
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
      </p>

      <div className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{detail}</div>

      {children && <div className="mt-auto pt-4">{children}</div>}
    </article>
  )
}
