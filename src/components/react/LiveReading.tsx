import { useState } from 'react'
import { ExternalLink, RefreshCw, Waves } from 'lucide-react'
import type { DatoReciente } from '../../types'
import { formatDateShort, formatDecimal, formatHm3 } from '../../lib/format'

const API_BASE = 'https://mapasdeembalses.es/api/v1'

const FRESHNESS_LABELS: Record<string, string> = {
  recent: 'Reciente',
  fresh: 'Reciente',
  delayed: 'Con retraso',
  stale: 'Antiguo',
  provisional: 'Provisional',
}

interface DetailPayload {
  data?: {
    dato_reciente?: DatoReciente | null
  }
}

interface LiveReadingProps {
  slug: string
  initial: DatoReciente | null
}

export function LiveReading({ slug, initial }: LiveReadingProps) {
  const [reading, setReading] = useState<DatoReciente | null>(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/embalses/${slug}`, {
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const payload = (await response.json()) as DetailPayload
      const next = payload.data?.dato_reciente ?? null
      if (!next) throw new Error('La fuente no ofrece una lectura reciente para este embalse.')
      setReading(next)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No se pudo consultar la lectura reciente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Waves className="h-4 w-4 text-cyan-700" aria-hidden="true" />
          Última lectura
        </h2>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950 disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw className={loading ? 'h-3.5 w-3.5 animate-spin' : 'h-3.5 w-3.5'} aria-hidden="true" />
          {loading ? 'Consultando' : 'Actualizar'}
        </button>
      </div>

      {reading ? (
        <div className="mt-4">
          <p className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 tnum">
            {reading.volumen_hm3 != null ? `${formatHm3(reading.volumen_hm3)} hm³` : 'Sin volumen publicado'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {formatDateShort(reading.observed_at)} · {reading.fuente}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 tnum">
            {reading.nivel_m != null && <span>Nivel: {formatDecimal(reading.nivel_m)} m</span>}
            {reading.frescura && <span>Estado: {FRESHNESS_LABELS[reading.frescura] ?? reading.frescura}</span>}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
            {reading.atribucion ?? 'Dato del organismo de cuenca'} · Lectura provisional que no sustituye al boletín
            semanal del MITECO.
          </p>
          {reading.url_fuente && (
            <a
              href={reading.url_fuente}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 transition-colors hover:text-blue-800"
            >
              Ver la fuente
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          No hay una lectura reciente publicada para este embalse. El dato semanal de la ficha sigue siendo la
          referencia.
        </p>
      )}

      {error && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900 ring-1 ring-inset ring-amber-200">
          {error}
        </p>
      )}
    </div>
  )
}
