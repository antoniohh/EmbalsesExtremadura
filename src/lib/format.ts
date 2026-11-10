const integerFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0, useGrouping: true })
const decimalFormatter = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})
const flexibleFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2, useGrouping: true })

export function formatInteger(value: number): string {
  return integerFormatter.format(Number.isFinite(value) ? value : 0)
}

export function formatDecimal(value: number): string {
  return decimalFormatter.format(Number.isFinite(value) ? value : 0)
}

export function formatHm3(value: number): string {
  return flexibleFormatter.format(Number.isFinite(value) ? value : 0)
}

export function formatPct(value: number): string {
  return `${decimalFormatter.format(Number.isFinite(value) ? value : 0)} %`
}

export function formatPctCompact(value: number): string {
  return `${decimalFormatter.format(Number.isFinite(value) ? value : 0)}%`
}

export function formatSignedHm3(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${decimalFormatter.format(value)} hm³`
}

export function formatSignedPct(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${decimalFormatter.format(value)} pp`
}

function parseDate(value: string): Date {
  if (!value) return new Date(Number.NaN)
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(`${value.slice(0, 10)}T12:00:00`)
  }
  return new Date(value)
}

export function formatDateLong(value: string): string {
  const date = parseDate(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDateShort(value: string): string {
  const date = parseDate(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .replace('.', '')
}

export function formatChartDate(value: string): string {
  const date = parseDate(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short' })
    .format(date)
    .replace('.', '')
}

export function formatMonthYear(value: string): string {
  const date = parseDate(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date)
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
