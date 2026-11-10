/**
 * Genera el snapshot local de embalses de Extremadura a partir de la API
 * pública de MapasDeEmbalses.es (normalización del Boletín Hidrológico del
 * MITECO) y escribe public/sitemap.xml.
 *
 * Uso: npm run data
 */
import { access, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const API = 'https://mapasdeembalses.es/api/v1'
const PROVINCIAS = new Set(['Badajoz', 'Cáceres'])
const CUENCAS = new Set(['Guadiana', 'Tajo'])
const HISTORY_POINTS = 60

const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d

async function fetchJson(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      if (attempt === retries) throw error
      await new Promise((r) => setTimeout(r, 500 * attempt))
    }
  }
}

async function mapPool(items, limit, task) {
  const results = new Array(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const index = next
      next += 1
      results[index] = await task(items[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

async function listAll() {
  const all = []
  for (let page = 1; page < 40; page += 1) {
    const payload = await fetchJson(`${API}/embalses?per_page=100&page=${page}`)
    const batch = payload.data ?? []
    all.push(...batch)
    if (batch.length < 100) break
  }
  return all
}

function relativeToAbsolute(history) {
  if (!Array.isArray(history)) return []
  return history
    .slice(0, HISTORY_POINTS)
    .filter((point) => point?.fecha && point?.volumen_hm3 != null && point?.fill_percentage != null)
    .map((point) => ({
      fecha: point.fecha,
      actual_hm3: round(point.volumen_hm3),
      porcentaje: round(point.fill_percentage),
    }))
    .reverse()
}

async function buildEmbalse(item) {
  let detail = null
  let history = []
  try {
    const detailPayload = await fetchJson(`${API}/embalses/${item.slug}`)
    detail = detailPayload.data ?? null
  } catch {
    // La ficha y el histórico son opcionales: el listado ya trae el dato actual.
  }
  try {
    const historyPayload = await fetchJson(`${API}/embalses/${item.slug}/historico`)
    history = relativeToAbsolute(historyPayload.data)
  } catch {
    // Sin histórico, la vista de detalle mostrará el punto actual.
  }

  const observation = detail?.referencia_semanal_miteco ?? detail?.observacion ?? null
  const capacidad = observation?.capacidad_hm3 ?? item.capacidad_hm3
  const actual = observation?.volumen_hm3 ?? item.volumen_hm3
  const porcentaje = observation?.fill_percentage ?? item.fill_percentage
  const fecha = observation?.fecha ?? item.fecha_observacion

  if (capacidad == null || actual == null || porcentaje == null || !fecha) return null

  const historico = history.length
    ? history
    : [{ fecha, actual_hm3: round(actual), porcentaje: round(porcentaje) }]

  const recent = detail?.dato_reciente ?? null

  return {
    id: item.id,
    slug: item.slug,
    nombre: item.nombre,
    provincia: item.provincia,
    cuenca: item.cuenca,
    capacidad_hm3: round(capacidad),
    actual_hm3: round(actual),
    porcentaje: round(porcentaje),
    variacion_semana_hm3: round(observation?.variacion_semanal_hm3 ?? 0),
    fecha_actualizacion: fecha,
    historico,
    municipio: detail?.municipio ?? undefined,
    rio: detail?.rio ?? item.rio ?? undefined,
    dato_reciente: recent
      ? {
          fuente: recent.fuente,
          observed_at: recent.observed_at,
          volumen_hm3: recent.volumen_hm3 != null ? round(recent.volumen_hm3) : null,
          nivel_m: recent.nivel_m != null ? round(recent.nivel_m) : null,
          frescura: recent.frescura ?? null,
          atribucion: recent.atribucion ?? null,
          url_fuente: recent.url_fuente ?? null,
        }
      : null,
  }
}

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (char) => {
    const map = { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }
    return map[char]
  })
}

async function main() {
  console.log('Leyendo catálogo…')
  const catalog = await listAll()
  const filtered = catalog.filter(
    (item) =>
      PROVINCIAS.has(item.provincia) &&
      CUENCAS.has(item.cuenca) &&
      item.fill_percentage != null &&
      item.capacidad_hm3 != null,
  )
  console.log(`Embalses de Extremadura con dato: ${filtered.length} de ${catalog.length} del catálogo.`)

  const embalses = (
    await mapPool(filtered, 6, async (item) => {
      try {
        return await buildEmbalse(item)
      } catch (error) {
        console.warn(`No se pudo procesar ${item.slug}:`, error.message)
        return null
      }
    })
  )
    .filter(Boolean)
    .sort((a, b) => b.capacidad_hm3 - a.capacidad_hm3)

  const fechas = embalses.map((item) => item.fecha_actualizacion).sort()
  const fechaActualizacion = fechas[fechas.length - 1] ?? new Date().toISOString().slice(0, 10)

  const snapshot = {
    generated_at: new Date().toISOString(),
    fecha_actualizacion: fechaActualizacion,
    fuente: 'MITECO — Boletín Hidrológico Semanal',
    normalizador: 'MapasDeEmbalses.es',
    catalogo_total: catalog.filter((item) => PROVINCIAS.has(item.provincia)).length,
    embalses,
  }

  const snapshotPath = resolve(root, 'src/data/embalses.json')
  const publicDataPath = resolve(root, 'public/datos/embalses.json')
  await mkdir(dirname(snapshotPath), { recursive: true })
  await mkdir(dirname(publicDataPath), { recursive: true })
  const serialized = `${JSON.stringify(snapshot, null, 2)}\n`
  await writeFile(snapshotPath, serialized, 'utf8')
  await writeFile(publicDataPath, serialized, 'utf8')
  console.log(`Snapshot escrito: ${snapshotPath} (${embalses.length} embalses)`)
  console.log(`Dataset público: ${publicDataPath}`)

  const siteUrl = (process.env.SITE_URL ?? 'https://embalses.antoniohorrillo.com').replace(/\/$/, '')
  const urls = [
    { loc: `${siteUrl}/`, priority: '1.0' },
    { loc: `${siteUrl}/cookies/`, priority: '0.3' },
    ...embalses.map((item) => ({ loc: `${siteUrl}/embalse/${item.slug}/`, priority: '0.8' })),
  ]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${fechaActualizacion}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
  await mkdir(resolve(root, 'public'), { recursive: true })
  await writeFile(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8')
  await writeFile(
    resolve(root, 'public/robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    'utf8',
  )
  console.log(`Sitemap escrito con ${urls.length} URLs (SITE_URL=${siteUrl}).`)
}

main().catch(async (error) => {
  console.error('No se pudo actualizar la fuente:', error)
  try {
    await access(resolve(root, 'src/data/embalses.json'))
    console.warn('Se conserva el snapshot existente. El build usará los últimos datos disponibles.')
    process.exitCode = 0
  } catch {
    console.error('No hay snapshot de respaldo. Ejecuta de nuevo cuando la API esté disponible.')
    process.exitCode = 1
  }
})
