# Changelog

Todas las versiones relevantes de **Embalses de Extremadura**. El proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [1.1.2] — 2026-11-13

Corrección integral de la etiqueta de Google Analytics 4 (`gtag.js`), activación del flujo dinámico de Google Consent Mode v2 al interactuar con el banner de cookies y habilitación de soporte para verificación de propiedad en Google Search Console.

### Arreglado y Cambiado

- **Corrección de Google Analytics 4 y Google Tag ([`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro))**:
  - Eliminado el encapsulamiento de `define:vars` que confinaba la función `gtag()` en una clausura privada e impedía la definición de `window.gtag` en el navegador.
  - Declaración global explícita `window.gtag = gtag` e inyección del string literal `"G-MK7WEP5HN0"` en el HTML estático para garantizar la detección por rastreadores de Google y herramientas como Tag Assistant.
  - Resolución del problema de validación en Google Search Console: el verificador de GA4 ahora detecta la coincidencia exacta de `gtag('config', 'G-MK7WEP5HN0')` en `<head>`.
- **Sincronización Dinámica de Consentimiento ([`src/components/CookieBanner.astro`](src/components/CookieBanner.astro))**:
  - Supresión de `define:vars` y corrección de tipados de TypeScript para eventos del DOM.
  - Ejecución garantizada de `window.gtag('consent', 'update', ...)` al hacer clic en «Aceptar todas» o guardar preferencias.
  - Disparo de evento `page_view` al conceder consentimiento para reflejar la visita en tiempo real en GA4 desde la primera interacción del usuario.
- **Soporte de Verificación GSC ([`src/lib/site.ts`](src/lib/site.ts) y [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro))**:
  - Añadida la constante `GOOGLE_SITE_VERIFICATION` y soporte para la metaetiqueta `<meta name="google-site-verification" content="..." />` como vía alternativa directa para dar de alta la propiedad en Google Search Console.

## [1.1.1] — 2026-11-13

Actualización de la configuración de analítica web: integración del ID de medición oficial de Google Analytics 4 (`G-MK7WEP5HN0`) con el cargador estándar `gtag/js` y Google Consent Mode v2, alineado con la arquitectura de *Luz Extremadura* y *Combustible Extremadura*.

### Cambiado

- **Actualización de Google Analytics 4 ([`src/lib/site.ts`](src/lib/site.ts) y [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro))**:
  - Establecido el ID de medición oficial `G-MK7WEP5HN0` en sustitución del provisional.
  - Estandarizado el script asíncrono a `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` idéntico a las implementaciones activas en la red.
  - Mantenimiento estricto del Google Consent Mode v2 con bloqueo regionalizado por defecto en el EEE y sincronización instantánea de consentimiento.

## [1.1.0] — 2026-11-13

Versión de modernización arquitectónica a Astro 7 puro: eliminación completa de dependencias de React e islas de hidratación, integración de la barra de red responsive y enlazado SEO entre proyectos, migración a Google Analytics 4 (`G-PT3SNCV5`) con Consent Mode v2, automatización de despliegue con cron semanal optimizado para los martes por la noche y resolución integral de la indexación y validación de propiedad en Google Search Console.

### Añadido

- **Barra de Red Responsive ([`src/components/NetworkBar.astro`](src/components/NetworkBar.astro))**:
  - Mini-barra superior persistente (altura fija 34 px) con navegación horizontal responsive, desplazamiento táctil suave (`overflow-x-auto`, sin scrollbar visible) y píldora activa destacada para el proyecto actual.
  - Enlaza en red los cuatro proyectos: *Luz Extremadura*, *Combustible Extremadura*, *GlucoLuna* y *Embalses de Extremadura*.
- **Enlazado SEO en Pie de Página ([`src/components/Footer.astro`](src/components/Footer.astro))**:
  - Añadida la columna «Red de Proyectos» en el pie de página con enlaces descriptivos hacia `luz.antoniohorrillo.com`, `combustible.antoniohorrillo.com` y `glucoluna.antoniohorrillo.com` para potenciar el pagerank temático y SEO cruzado.
- **Componentes Nativos Astro Puro**:
  - `src/components/EmbalseCard.astro`: tarjeta estática con atributos `data-*` para filtrado ultrarrápido y accesible en el DOM.
  - `src/components/FilterBar.astro`: controles accesibles de búsqueda, filtros segmentados por provincia/cuenca y ordenación.
  - `src/components/HistoricalChart.astro`: gráfico SVG responsivo nativo con selector de escala temporal (4, 12 y 52 semanas) y tooltips interactivos mediante script ligero sin dependencias externas.
  - `src/components/ReservoirGauge.astro`, `src/components/TrendBadge.astro` y `src/components/WaterBar.astro`: renderizado 100 % estático en servidor.
  - `src/scripts/filtro-embalses.ts`: lógica cliente de filtrado y ordenación en TypeScript puro (4.8 KB totales).
- **Compatibilidad con Google Search Console (`public/.nojekyll`)**:
  - Añadido el archivo `.nojekyll` en la raíz de `public/` para evitar que el parser Jekyll de GitHub Pages descarte los recursos generados en la carpeta `_astro/`, garantizando que todos los rastreadores accedan al CSS y assets sin error 404.

### Cambiado y Optimizado

- **Desinstalación Completa de React 19 y Reducción Radical del Bundle**:
  - Eliminados `@astrojs/react`, `react`, `react-dom`, `lucide-react`, `@types/react`, `@types/react-dom`, `oxc-transform-react` y la integración `react()` de `astro.config.mjs`.
  - Supresión de la carpeta `src/components/react/`.
  - El peso transferido de JavaScript en cliente pasa de ~220 KB a un único script vanilla de 4.8 KB, optimizando el Time to Interactive (TTI), First Contentful Paint (FCP) y Core Web Vitals.
  - El catálogo de 42 embalses se entrega 100 % en HTML estático sin `<astro-island>` ni serialización masiva de props en el markup.
- **Migración a Google Analytics 4 y Google Consent Mode v2**:
  - Sustituido el contenedor de Google Tag Manager (`GTM-PT3SNCV5`) por la etiqueta directa de Google Analytics 4 (`G-PT3SNCV5`) vía `gtag.js`.
  - Implementación exacta del estándar Google Consent Mode v2 alineado con *Luz Extremadura* y *Combustible Extremadura*: bloqueo estricto por defecto (`analytics_storage: denied`) para España y el Espacio Económico Europeo (EEE), actualización instantánea tras la interacción del usuario y persistencia en `localStorage` (`embalses_extremadura_cookie_consent`).
  - Resuelto el fallo de validación de propiedad en Google Search Console al coincidir el ID de medición directo de GA4 con la etiqueta en el `<head>`.
- **Automatización de Despliegues en GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))**:
  - Programación semanal optimizada para los **martes a las 20:35 UTC (21:35 CET / 22:35 CEST)** (`35 20 * * 2`), aplicando un desfase de unas 7 horas respecto a la publicación del MITECO para garantizar datos estables y evitar las colas masivas en GitHub Actions, además de ejecución en cada `push` a la rama `main`.
- **Eliminación de la Lectura en Tiempo Real (`LiveReading`)**:
  - Retirada la consulta provisional bajo demanda en las fichas individuales (`/embalse/[slug]/`), al no presentar variación significativa respecto al dato consolidado del boletín oficial.

## [1.0.3] — 2026-11-10

Versión de refinamiento visual y microcopia: corrección de la etiqueta de llenado en las tarjetas del catálogo y optimización del diseño de la ficha individual para eliminar espacios en blanco.

### Cambiado y Optimizado

- **Microcopia en Tarjetas de Embalse ([`src/components/react/EmbalseCard.tsx`](src/components/react/EmbalseCard.tsx))**:
  - Sustituida la etiqueta `llenado` por `lleno` bajo el porcentaje principal, adaptando la redacción a una forma natural y concisa en castellano.
- **Equilibrio Visual en la Ficha Individual ([`src/pages/embalse/[slug].astro`](src/pages/embalse/[slug].astro))**:
  - Reubicada la tarjeta explicativa «Qué significa este dato» dentro de la columna izquierda bajo la gráfica interactiva y el desglose histórico.
  - Se equilibra la altura entre ambas columnas en resoluciones de escritorio (`lg`), eliminando el hueco en blanco inferior frente a las tarjetas técnicas y de lectura en tiempo real.
- **Suite de Calidad ([`scripts/test.mjs`](scripts/test.mjs))**:
  - Verificación superada con 40/40 pruebas Playwright sin desbordamiento horizontal en anchos de 320, 390, 768 y 1440 px.

## [1.0.2] — 2026-11-10

Versión de optimización de la experiencia: eliminación de la sección y página de metodología, y saneamiento de enlaces del pie de página para alinear el proyecto con la arquitectura de *Luz Extremadura* y *Combustible Extremadura*.

### Cambiado y Optimizado

- **Supresión de la Página y Sección de Metodología**:
  - Eliminada la ruta `/metodologia/` y todos los enlaces que apuntaban a ella desde portada (`index.astro`), fichas de embalses (`[slug].astro`) y cabecera (`Header.astro`).
  - La píldora de fecha en la cabecera pasa a ser un indicador estático de estado del boletín.
- **Simplificación del Pie de Página ([`src/components/Footer.astro`](src/components/Footer.astro))**:
  - Eliminada la columna redundante «Datos» (enlaces externos al MITECO, MapasDeEmbalses.es y CC BY 4.0).
  - La atribución legal y técnica de la fuente oficial se mantiene consolidada en la columna «Fuentes».
- **Suite de Calidad ([`scripts/test.mjs`](scripts/test.mjs))**:
  - 40 pruebas automáticas Playwright superadas (40/40).

## [1.0.1] — 2026-11-10

Versión de optimización de portada: eliminación del quiz para priorizar la rapidez de consulta y la utilidad pública.

### Cambiado y Optimizado

- **Eliminación del Quiz («El reto del agua»)** ([`src/pages/index.astro`](src/pages/index.astro)):
  - Retirada la sección interactiva del cuestionario situada encima de las preguntas frecuentes.
  - Supresión de las dependencias e islas React asociadas (`EmbalseQuiz.tsx` y `quiz.ts`), aligerando el peso total del JavaScript transferido.
  - Transición visual directa desde la distribución por cuencas hacia las preguntas frecuentes.
- **Navegación del pie de página ([`src/components/Footer.astro`](src/components/Footer.astro))**:
  - Eliminado el enlace hacia `#reto` en la columna de exploración.

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
