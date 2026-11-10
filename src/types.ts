export interface HistoricoPunto {
  fecha: string
  actual_hm3: number
  porcentaje: number
}

export type Provincia = 'Badajoz' | 'Cáceres'
export type Cuenca = 'Guadiana' | 'Tajo'

export interface DatoReciente {
  fuente: string
  observed_at: string
  volumen_hm3: number | null
  nivel_m?: number | null
  frescura?: string | null
  atribucion?: string | null
  url_fuente?: string | null
}

export interface Embalse {
  id: number
  slug: string
  nombre: string
  provincia: Provincia
  cuenca: Cuenca
  capacidad_hm3: number
  actual_hm3: number
  porcentaje: number
  variacion_semana_hm3: number
  fecha_actualizacion: string
  historico: HistoricoPunto[]
  municipio?: string
  rio?: string
  dato_reciente?: DatoReciente | null
}

/** Lo que necesita una tarjeta del catálogo; evita enviar 60 semanas al island. */
export type EmbalseResumen = Omit<Embalse, 'historico' | 'dato_reciente'>

export interface Snapshot {
  generated_at: string
  fecha_actualizacion: string
  fuente: string
  normalizador: string
  catalogo_total: number
  embalses: Embalse[]
}

export interface Aggregate {
  capacidad: number
  actual: number
  porcentaje: number
  variacion: number
  total: number
  suben: number
  bajan: number
  estables: number
}
