import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ArrowRight, SearchX } from 'lucide-react'
import type { EmbalseResumen } from '../../types'
import { filterEmbalses, type Filters, type SortKey } from '../../lib/aggregate'
import { FilterBar } from './FilterBar'
import { EmbalseCard } from './EmbalseCard'

const ORDENES: SortKey[] = ['capacidad', 'llenado', 'subida', 'nombre']

const DEFAULT_FILTERS: Filters = {
  query: '',
  provincia: 'Todas',
  cuenca: 'Todas',
  orden: 'capacidad',
}

function parseParams(params: URLSearchParams): Partial<Filters> {
  const provincia = params.get('provincia')
  const cuenca = params.get('cuenca')
  const orden = params.get('orden')

  return {
    query: params.get('q') ?? '',
    provincia: provincia === 'Badajoz' || provincia === 'Cáceres' ? provincia : 'Todas',
    cuenca: cuenca === 'Guadiana' || cuenca === 'Tajo' ? cuenca : 'Todas',
    orden: orden && ORDENES.includes(orden as SortKey) ? (orden as SortKey) : 'capacidad',
  }
}

function EmptyState({
  query,
  onClear,
  onSuggestion,
}: {
  query: string
  onClear: () => void
  onSuggestion: (name: string) => void
}) {
  return (
    <div className="surface flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <SearchX className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-slate-950">No encontramos ese embalse</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        {query ? (
          <>
            No hay resultados para <span className="font-semibold text-slate-700">«{query}»</span> con los filtros
            actuales. Prueba con otro nombre o quita alguna restricción.
          </>
        ) : (
          'No hay embalses que cumplan los filtros seleccionados. Prueba a cambiar la provincia o la cuenca.'
        )}
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        Limpiar filtros
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-500">Prueba con:</span>
        {['La Serena', 'Alcántara', 'Cíjara'].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onSuggestion(name)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

interface FilterableGridProps {
  embalses: EmbalseResumen[]
  totalCatalogo: number
}

export function FilterableGrid({ embalses, totalCatalogo }: FilterableGridProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [ready, setReady] = useState(false)
  const deferredQuery = useDeferredValue(filters.query)

  const filtered = useMemo(
    () => filterEmbalses(embalses, { ...filters, query: deferredQuery }),
    [embalses, filters.provincia, filters.cuenca, filters.orden, deferredQuery],
  )

  const hasActiveFilters =
    filters.query.trim() !== '' || filters.provincia !== 'Todas' || filters.cuenca !== 'Todas'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setFilters((current) => ({ ...current, ...parseParams(params) }))
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const params = new URLSearchParams()
    if (filters.query) params.set('q', filters.query)
    if (filters.provincia !== 'Todas') params.set('provincia', filters.provincia)
    if (filters.cuenca !== 'Todas') params.set('cuenca', filters.cuenca)
    if (filters.orden !== 'capacidad') params.set('orden', filters.orden)

    const search = params.toString()
    const next = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
    window.history.replaceState(null, '', next)
  }, [filters, ready])

  function updateFilters(patch: Partial<Filters>) {
    setFilters((current) => ({ ...current, ...patch }))
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <>
      <FilterBar
        filters={filters}
        onChange={updateFilters}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
        resultCount={filtered.length}
        totalCount={embalses.length}
      />

      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((embalse, index) => (
            <EmbalseCard key={embalse.slug} embalse={embalse} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <EmptyState
            query={filters.query}
            onClear={clearFilters}
            onSuggestion={(name) =>
              setFilters({ query: name, provincia: 'Todas', cuenca: 'Todas', orden: 'capacidad' })
            }
          />
        </div>
      )}

      <p className="mt-4 text-right text-xs text-slate-500 tnum">
        {totalCatalogo} embalses en el catálogo de Extremadura
      </p>
    </>
  )
}
