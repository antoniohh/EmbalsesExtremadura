import snapshot from '../data/embalses.json'
import type { Embalse, EmbalseResumen, Snapshot } from '../types'

export const data = snapshot as unknown as Snapshot
export const embalses = data.embalses

export const embalsesResumen: EmbalseResumen[] = embalses.map((embalse) => ({
  id: embalse.id,
  slug: embalse.slug,
  nombre: embalse.nombre,
  provincia: embalse.provincia,
  cuenca: embalse.cuenca,
  capacidad_hm3: embalse.capacidad_hm3,
  actual_hm3: embalse.actual_hm3,
  porcentaje: embalse.porcentaje,
  variacion_semana_hm3: embalse.variacion_semana_hm3,
  fecha_actualizacion: embalse.fecha_actualizacion,
  municipio: embalse.municipio,
  rio: embalse.rio,
}))

export function getEmbalse(slug: string): Embalse | undefined {
  return embalses.find((embalse) => embalse.slug === slug)
}

export const fechaActualizacion = data.fecha_actualizacion
export const totalCatalogo = data.catalogo_total
