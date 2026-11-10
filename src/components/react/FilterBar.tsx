import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import type { Filters, SortKey } from '../../lib/aggregate'
import type { Cuenca, Provincia } from '../../types'
import { cx } from '../../lib/format'

interface FilterBarProps {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  onClear: () => void
  hasActiveFilters: boolean
  resultCount: number
  totalCount: number
}

const provincias: Array<Provincia | 'Todas'> = ['Todas', 'Badajoz', 'Cáceres']
const cuencas: Array<Cuenca | 'Todas'> = ['Todas', 'Guadiana', 'Tajo']
const ordenes: Array<{ value: SortKey; label: string }> = [
  { value: 'capacidad', label: 'Mayor capacidad' },
  { value: 'llenado', label: 'Más lleno (%)' },
  { value: 'subida', label: 'Mayor subida semanal' },
  { value: 'nombre', label: 'Nombre (A–Z)' },
]

interface SegmentedProps<T extends string> {
  label: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
}

function Segmented<T extends string>({ label, value, options, onChange }: SegmentedProps<T>) {
  return (
    <fieldset className="min-w-0">
      <legend className="eyebrow mb-2">{label}</legend>
      <div className="flex w-full rounded-xl bg-slate-100 p-1 ring-1 ring-inset ring-slate-200/70 sm:w-auto">
        {options.map((option) => {
          const active = option === value
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cx(
                'flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-200 sm:flex-none',
                active
                  ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900',
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function FilterBar({
  filters,
  onChange,
  onClear,
  hasActiveFilters,
  resultCount,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="surface p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:items-end">
        <div className="min-w-0">
          <label htmlFor="buscar-embalse" className="eyebrow">
            Buscar embalse
          </label>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="buscar-embalse"
              type="search"
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              autoComplete="off"
              placeholder="La Serena, Cíjara, Guadiana…"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 [&::-webkit-search-cancel-button]:hidden"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onChange({ query: '' })}
                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Borrar búsqueda"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <Segmented
          label="Provincia"
          value={filters.provincia}
          options={provincias}
          onChange={(provincia) => onChange({ provincia })}
        />

        <Segmented
          label="Cuenca"
          value={filters.cuenca}
          options={cuencas}
          onChange={(cuenca) => onChange({ cuenca })}
        />

        <div className="min-w-0">
          <label htmlFor="orden-embalses" className="eyebrow">
            Ordenar por
          </label>
          <div className="relative mt-2">
            <select
              id="orden-embalses"
              value={filters.orden}
              onChange={(event) => onChange({ orden: event.target.value as SortKey })}
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-3.5 pr-9 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 sm:w-52"
            >
              {ordenes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3.5 text-[13px] sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-2 text-slate-500" aria-live="polite">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          {hasActiveFilters ? (
            <span>
              Mostrando <span className="font-semibold text-slate-900 tnum">{resultCount}</span> de{' '}
              <span className="tnum">{totalCount}</span> embalses
            </span>
          ) : (
            <span>
              <span className="font-semibold text-slate-900 tnum">{resultCount}</span> embalses disponibles
            </span>
          )}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 self-start rounded-lg px-2 py-1 text-[13px] font-semibold text-blue-700 transition-colors hover:bg-blue-50 hover:text-blue-800 sm:self-auto"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
