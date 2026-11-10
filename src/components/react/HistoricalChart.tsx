import { useEffect, useRef, useState } from 'react'
import type { HistoricoPunto } from '../../types'
import {
  clamp,
  cx,
  formatChartDate,
  formatDateShort,
  formatHm3,
  formatInteger,
  formatPctCompact,
} from '../../lib/format'

export type ChartRange = 4 | 12 | 52

interface HistoricalChartProps {
  data: HistoricoPunto[]
}

const RANGE_LABELS: Array<{ value: ChartRange; label: string }> = [
  { value: 4, label: '4 sem' },
  { value: 12, label: '12 sem' },
  { value: 52, label: '52 sem' },
]

function smoothPath(points: Array<{ x: number; y: number }>): string {
  if (!points.length) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`
  let path = `M ${points[0].x} ${points[0].y}`
  const tension = 0.85

  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index - 1] ?? points[index]
    const p1 = points[index]
    const p2 = points[index + 1]
    const p3 = points[index + 2] ?? p2
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }

  return path
}

function niceTicks(min: number, max: number, count: number): number[] {
  const span = max - min
  if (span <= 0) return [min]
  return Array.from({ length: count }, (_, index) => min + (span * index) / (count - 1))
}

export function HistoricalChart({ data }: HistoricalChartProps) {
  const [range, setRange] = useState<ChartRange>(4)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 720, height: 280 })
  const [active, setActive] = useState<number | null>(null)
  const [keyboard, setKeyboard] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const update = () => {
      const rect = element.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        setSize({ width: rect.width, height: rect.height })
      }
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setActive(null)
  }, [range])

  const points = data.slice(-range)
  const first = points[0]
  const last = points[points.length - 1]

  if (points.length < 2) {
    return (
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">Evolución del agua embalsada</h2>
            <p className="mt-1 text-sm text-slate-500">Serie histórica semanal</p>
          </div>
        </div>
        <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
          <p className="text-sm font-semibold text-slate-700">Todavía no hay una serie histórica para este embalse.</p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            El dato actual está disponible en la ficha, pero la fuente no ofrece semanas anteriores comparables.
          </p>
        </div>
      </div>
    )
  }

  const width = size.width
  const height = size.height
  const margin = {
    top: 20,
    right: width < 480 ? 10 : 16,
    bottom: 34,
    left: width < 480 ? 40 : 50,
  }
  const innerWidth = Math.max(1, width - margin.left - margin.right)
  const innerHeight = Math.max(1, height - margin.top - margin.bottom)

  const values = points.map((point) => point.actual_hm3)
  const rawMin = Math.min(...values)
  const rawMax = Math.max(...values)
  const rawSpan = rawMax - rawMin
  const padding = rawSpan > 0 ? rawSpan * 0.18 : Math.max(rawMax * 0.05, 1)
  const yMin = Math.max(0, rawMin - padding)
  const yMax = rawMax + padding
  const ySpan = yMax - yMin || 1

  const chartPoints = points.map((point, index) => ({
    x: margin.left + (innerWidth * index) / Math.max(1, points.length - 1),
    y: margin.top + innerHeight - ((point.actual_hm3 - yMin) / ySpan) * innerHeight,
  }))

  const linePath = smoothPath(chartPoints)
  const areaPath = `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${margin.top + innerHeight} L ${chartPoints[0].x} ${
    margin.top + innerHeight
  } Z`
  const yTicks = niceTicks(yMin, yMax, 4)

  const labelCount = clamp(Math.floor(width / 86), 2, 6)
  const labelIndexes = Array.from(
    new Set(
      Array.from({ length: labelCount }, (_, index) =>
        Math.round((index * (points.length - 1)) / Math.max(1, labelCount - 1)),
      ),
    ),
  )

  const activePoint = active != null ? chartPoints[active] : null
  const activeData = active != null ? points[active] : null

  function updateFromPointer(event: React.PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const ratio = clamp((x - margin.left) / innerWidth, 0, 1)
    const index = clamp(Math.round(ratio * (points.length - 1)), 0, points.length - 1)
    setActive(index)
    setKeyboard(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home' && event.key !== 'End') {
      return
    }
    event.preventDefault()
    setKeyboard(true)
    setActive((current) => {
      const base = current ?? points.length - 1
      if (event.key === 'Home') return 0
      if (event.key === 'End') return points.length - 1
      if (event.key === 'ArrowLeft') return Math.max(0, base - 1)
      return Math.min(points.length - 1, base + 1)
    })
  }

  const tooltipX = activePoint ? activePoint.x : 0
  const tooltipY = activePoint ? activePoint.y : 0
  const alignRight = tooltipX > width - 120
  const below = tooltipY < 90

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">Evolución del agua embalsada</h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
            <span>
              {points.length} semanas con dato · {formatDateShort(first.fecha)} – {formatDateShort(last.fecha)}
            </span>
          </p>
        </div>

        <div
          className="inline-flex self-start rounded-xl bg-slate-100 p-1 ring-1 ring-inset ring-slate-200/70"
          role="group"
          aria-label="Periodo del histórico"
        >
          {RANGE_LABELS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={range === option.value}
              onClick={() => setRange(option.value)}
              className={cx(
                'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-200',
                range === option.value
                  ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-4 h-60 w-full sm:h-72"
        tabIndex={0}
        role="img"
        aria-label={`Gráfica de evolución del volumen embalsado entre ${formatDateShort(first.fecha)} y ${formatDateShort(
          last.fecha,
        )}. Usa las flechas izquierda y derecha para recorrer los datos.`}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (active == null) {
            setActive(points.length - 1)
            setKeyboard(true)
          }
        }}
        onBlur={() => setActive(null)}
      >
        <svg
          className="h-full w-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          onPointerMove={updateFromPointer}
          onPointerLeave={() => {
            if (!keyboard) setActive(null)
          }}
        >
          <defs>
            <linearGradient id="water-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.34" />
              <stop offset="55%" stopColor="#2563eb" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((tick, index) => {
            const y = margin.top + innerHeight - ((tick - yMin) / ySpan) * innerHeight
            return (
              <g key={`y-${index}`}>
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray={index === 0 ? undefined : '3 5'}
                />
                <text x={margin.left - 8} y={y + 4} textAnchor="end" fontSize="10.5" fill="#64748b" className="tnum">
                  {formatInteger(tick)}
                </text>
              </g>
            )
          })}

          <text x={margin.left} y={12} fontSize="10" fontWeight="600" fill="#64748b" letterSpacing="0.08em">
            HM³
          </text>

          <path
            key={`area-${range}-${points.length}-${first.fecha}`}
            d={areaPath}
            fill="url(#water-area)"
            className="chart-area"
          />
          <path
            key={`line-${range}-${points.length}-${first.fecha}`}
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="chart-line"
          />

          {labelIndexes.map((index) => {
            const point = chartPoints[index]
            const item = points[index]
            return (
              <text
                key={`x-${index}`}
                x={point.x}
                y={height - 10}
                textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}
                fontSize="10.5"
                fill="#64748b"
              >
                {formatChartDate(item.fecha)}
              </text>
            )
          })}

          {activePoint && activeData && (
            <g>
              <line
                x1={activePoint.x}
                x2={activePoint.x}
                y1={margin.top}
                y2={margin.top + innerHeight}
                stroke="#1d4ed8"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.55"
              />
              <circle cx={activePoint.x} cy={activePoint.y} r="5.5" fill="#fff" stroke="#2563eb" strokeWidth="2.5" />
            </g>
          )}

          <circle
            cx={chartPoints[chartPoints.length - 1].x}
            cy={chartPoints[chartPoints.length - 1].y}
            r="4"
            fill="#2563eb"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>

        {activePoint && activeData && (
          <div
            className="pointer-events-none absolute z-10 w-max max-w-[11rem] rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg"
            style={{
              left: `${tooltipX}px`,
              top: `${tooltipY}px`,
              transform: `translate(${alignRight ? '-100%' : '-50%'}, ${below ? '14px' : '-115%'})`,
            }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
              {formatDateShort(activeData.fecha)}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950 tnum">{formatHm3(activeData.actual_hm3)} hm³</p>
            <p className="text-xs text-slate-500 tnum">{formatPctCompact(activeData.porcentaje)} de capacidad</p>
          </div>
        )}
      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Pasa el cursor o usa las flechas del teclado sobre la gráfica para consultar cada semana.
      </p>
      <span className="sr-only" aria-live="polite">
        {activeData
          ? `${formatDateShort(activeData.fecha)}: ${formatHm3(activeData.actual_hm3)} hectómetros cúbicos, ${formatPctCompact(
              activeData.porcentaje,
            )} de capacidad.`
          : ''}
      </span>

      <details className="group mt-4 rounded-xl border border-slate-200 bg-slate-50/60">
        <summary className="cursor-pointer list-none px-4 py-3 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-950">
          Ver los datos de la serie
          <span className="ml-1 font-normal text-slate-500">({points.length} semanas)</span>
        </summary>
        <div className="max-h-64 overflow-auto border-t border-slate-200">
          <table className="w-full text-left text-xs">
            <caption className="sr-only">Volumen embalsado y porcentaje de capacidad por semana</caption>
            <thead className="sticky top-0 bg-slate-50 text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-2 font-semibold">Semana</th>
                <th scope="col" className="px-4 py-2 text-right font-semibold">Volumen (hm³)</th>
                <th scope="col" className="px-4 py-2 text-right font-semibold">Llenado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {points.map((point) => (
                <tr key={point.fecha}>
                  <th scope="row" className="px-4 py-2 font-normal text-slate-600">
                    {formatDateShort(point.fecha)}
                  </th>
                  <td className="px-4 py-2 text-right text-slate-900 tnum">{formatHm3(point.actual_hm3)}</td>
                  <td className="px-4 py-2 text-right text-slate-600 tnum">{formatPctCompact(point.porcentaje)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  )
}
