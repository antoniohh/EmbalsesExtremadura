import { AlertTriangle, ArrowUpRight } from 'lucide-react'
import type { EmbalseResumen } from '../../types'
import { formatHm3, formatPctCompact } from '../../lib/format'
import { WaterBar } from './WaterBar'
import { TrendBadge } from './TrendBadge'

function CuencaBadge({ cuenca }: { cuenca: EmbalseResumen['cuenca'] }) {
  const isGuadiana = cuenca === 'Guadiana'
  return (
    <span
      className={
        isGuadiana
          ? 'inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-medium text-cyan-800 ring-1 ring-inset ring-cyan-200/70'
          : 'inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-800 ring-1 ring-inset ring-blue-200/70'
      }
    >
      <span className={isGuadiana ? 'h-1.5 w-1.5 rounded-full bg-cyan-500' : 'h-1.5 w-1.5 rounded-full bg-blue-500'} aria-hidden="true" />
      {cuenca}
    </span>
  )
}

interface EmbalseCardProps {
  embalse: EmbalseResumen
  index?: number
}

export function EmbalseCard({ embalse, index = 0 }: EmbalseCardProps) {
  const low = embalse.porcentaje < 25

  return (
    <article
      className="card-in group surface relative flex min-w-0 flex-col p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[var(--shadow-lift)] focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 focus-within:ring-offset-slate-50 motion-reduce:hover:translate-y-0"
      style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.018em] text-slate-950">
            <a
              href={`/embalse/${embalse.slug}/`}
              className="outline-none after:absolute after:inset-0 after:rounded-2xl"
              aria-label={`Ver histórico y detalles del embalse de ${embalse.nombre}`}
            >
              {embalse.nombre}
            </a>
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
              {embalse.provincia}
            </span>
            <CuencaBadge cuenca={embalse.cuenca} />
            {low && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                Nivel bajo
              </span>
            )}
          </div>

          {(embalse.rio || embalse.municipio) && (
            <p className="mt-2 truncate text-xs text-slate-500">
              {[embalse.rio, embalse.municipio].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[1.7rem] font-semibold leading-none tracking-[-0.035em] text-slate-950 tnum">
            {formatPctCompact(embalse.porcentaje)}
          </p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">lleno</p>
          <TrendBadge value={embalse.variacion_semana_hm3} className="mt-2" />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-2 text-[13px]">
          <span className="text-slate-500">Volumen embalsado</span>
          <span className="font-semibold text-slate-900 tnum">
            {formatHm3(embalse.actual_hm3)}{' '}
            <span className="font-normal text-slate-500">/ {formatHm3(embalse.capacidad_hm3)} hm³</span>
          </span>
        </div>
        <WaterBar
          value={embalse.porcentaje}
          label={`${embalse.nombre}: ${formatPctCompact(embalse.porcentaje)} de su capacidad`}
          height="md"
          className="mt-2.5"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3.5">
        <span className="text-xs text-slate-500 tnum">Capacidad {formatHm3(embalse.capacidad_hm3)} hm³</span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 transition-colors group-hover:text-blue-800">
          Ver histórico y detalles
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  )
}
