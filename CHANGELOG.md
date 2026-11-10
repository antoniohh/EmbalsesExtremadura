# Changelog

Todas las versiones relevantes de **Embalses de Extremadura**. El proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [1.0.1] — 2026-11-10

Versión de simplificación y optimización de portada: eliminación del quiz para priorizar la rapidez de consulta y la utilidad pública.

### Cambiado y Optimizado

- **Eliminación del Quiz («El reto del agua»)** ([`src/pages/index.astro`](src/pages/index.astro)):
  - Retirada la sección interactiva del cuestionario situada encima de las preguntas frecuentes.
  - Supresión de las dependencias e islas React asociadas (`EmbalseQuiz.tsx` y `quiz.ts`), aligerando el peso total del JavaScript transferido.
  - Transición visual directa desde la distribución por cuencas hacia las preguntas frecuentes.
- **Navegación del pie de página ([`src/components/Footer.astro`](src/components/Footer.astro))**:
  - Eliminado el enlace hacia `#reto` en la columna de exploración.
- **Suite de Calidad ([`scripts/test.mjs`](scripts/test.mjs))**:
  - Actualizadas las 42 pruebas automatizadas sin JS, de hidratación y responsive (42/42 superadas).

## [1.0.0] — 2026-11-10

Primera versión de producción de **Embalses de Extremadura**, desplegada en `https://embalses.antoniohorrillo.com/`.

### Añadido

- **Catálogo de 42 embalses monitorizados** en Badajoz y Cáceres a partir del Boletín Hidrológico Semanal del MITECO (normalizado por MapasDeEmbalses.es).
- **Portada con métricas autonómicas**:
  - Medidor visual tipo manómetro (*gauge*) con el porcentaje de llenado autonómico ponderado por capacidad real.
  - Distribución del agua embalsada y balance por cuencas (Guadiana y Tajo).
  - Indicadores de tendencia semanal (embalses que suben, bajan o se mantienen estables).
- **Catálogo interactivo con islas de React** (`FilterableGrid`):
  - Búsqueda en tiempo real por nombre de embalse.
  - Filtros instantáneos por provincia (Badajoz / Cáceres) y cuenca (Guadiana / Tajo).
  - Ordenación por volumen embalsado, porcentaje de llenado y capacidad total.
- **42 fichas estáticas individuales** (`/embalse/[slug]/`):
  - Gráfico interactivo (`HistoricalChart`) de evolución temporal (4, 12 y 52 semanas) con tabla accesible para lectores de pantalla.
  - Comparativa del embalse respecto a la media de su cuenca.
  - Lectura en vivo opcional (`LiveReading`) conectando bajo demanda al organismo de cuenca al pulsar «Actualizar».
- **El Reto del Agua** (`EmbalseQuiz`):
  - Cuestionario didáctico de 5 preguntas sobre hidrología y geografía extremeña con fallback HTML accesible sin JavaScript.
- **Página de Metodología y Fuentes** (`/metodologia/`):
  - Trazabilidad completa de las fuentes oficiales (MITECO / CC BY 4.0) y especificaciones técnicas del cálculo.
- **Privacidad y Google Consent Mode v2** (`CookieBanner.astro` y `/cookies/`):
  - Cumplimiento de RGPD / AEPD con señales denegadas por defecto para el Espacio Económico Europeo.
  - Integración con Google Tag Manager (`GTM-PT3SNCV5`).
  - Banner inferior flotante y modal accesible para configurar preferencias.
  - Página dedicada de Política de Cookies y Privacidad.
- **Soporte PWA e Instalación Móvil**:
  - Banner deslizante de instalación (`InstallPrompt.astro`) con soporte para el evento `beforeinstallprompt`.
  - Service Worker (`sw.js`) con almacenamiento en caché de activos estáticos y fallback offline.
  - Web App Manifest (`site.webmanifest`) con soporte `standalone`.
- **SEO Técnico y Datos Estructurados**:
  - Marcado Schema.org `@graph` (`WebSite`, `WebPage`, `Dataset`, `FAQPage`, `BreadcrumbList`).
  - Metadatos de geolocalización de Extremadura (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
  - Generación de `sitemap.xml` y `robots.txt` sincronizados con la fecha del boletín oficial.
- **Automatización y Despliegue**:
  - Flujo de GitHub Actions (`.github/workflows/deploy.yml`) para despliegue en GitHub Pages y actualización semanal automática cada martes.
  - Suite de 46 pruebas automatizadas con Playwright (`npm run test:ui`) verificando accesibilidad sin JS, hidratación y responsive.
