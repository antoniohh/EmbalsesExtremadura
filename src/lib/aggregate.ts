import type { Aggregate, Cuenca, EmbalseResumen, Provincia } from '../types'
import { normalizeText } from './format'

export type SortKey = 'capacidad' | 'llenado' | 'subida' | 'nombre'

export interface Filters {
  query: string
  provincia: Provincia | 'Todas'
  cuenca: Cuenca | 'Todas'
  orden: SortKey
}

export function aggregate(embalses: EmbalseResumen[]): Aggregate {
  const valid = embalses.filter((item) => item.capacidad_hm3 > 0 && item.actual_hm3 >= 0)
  const capacidad = valid.reduce((sum, item) => sum + item.capacidad_hm3, 0)
  const actual = valid.reduce((sum, item) => sum + item.actual_hm3, 0)
  const variacion = valid.reduce((sum, item) => sum + item.variacion_semana_hm3, 0)

  return {
    capacidad,
    actual,
    porcentaje: capacidad > 0 ? (actual / capacidad) * 100 : 0,
    variacion,
    total: valid.length,
    suben: valid.filter((item) => item.variacion_semana_hm3 > 0.0001).length,
    bajan: valid.filter((item) => item.variacion_semana_hm3 < -0.0001).length,
    estables: valid.filter((item) => Math.abs(item.variacion_semana_hm3) <= 0.0001).length,
  }
}

export function filterEmbalses(embalses: EmbalseResumen[], filters: Filters): EmbalseResumen[] {
  const query = normalizeText(filters.query)

  return embalses
    .filter((item) => {
      if (filters.provincia !== 'Todas' && item.provincia !== filters.provincia) return false
      if (filters.cuenca !== 'Todas' && item.cuenca !== filters.cuenca) return false
      if (!query) return true
      const haystack = normalizeText(`${item.nombre} ${item.municipio ?? ''} ${item.rio ?? ''}`)
      return haystack.includes(query)
    })
    .sort((a, b) => {
      switch (filters.orden) {
        case 'llenado':
          return b.porcentaje - a.porcentaje
        case 'subida':
          return b.variacion_semana_hm3 - a.variacion_semana_hm3
        case 'nombre':
          return a.nombre.localeCompare(b.nombre, 'es')
        case 'capacidad':
        default:
          return b.capacidad_hm3 - a.capacidad_hm3
      }
    })
}

export function availableHm3(item: EmbalseResumen): number {
  return Math.max(0, item.capacidad_hm3 - item.actual_hm3)
}

export function variationPoints(item: EmbalseResumen): number {
  if (item.capacidad_hm3 <= 0) return 0
  return (item.variacion_semana_hm3 / item.capacidad_hm3) * 100
}
