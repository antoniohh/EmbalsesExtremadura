# Embalses de Extremadura

[![Versión](https://img.shields.io/badge/versi%C3%B3n-1.0.3-0284c7?style=for-the-badge)](CHANGELOG.md)
[![Astro](https://img.shields.io/badge/Astro-7.4.2-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages-0f172a?style=for-the-badge&logo=github&logoColor=white)](https://embalses.antoniohorrillo.com/)

Aplicación web estática (SSG con islas de React) para la consulta del estado del agua embalsada en Extremadura: nivel, capacidad, porcentaje de llenado, variación semanal e histórico de los **42 embalses monitorizados** en las provincias de Badajoz y Cáceres, con datos oficiales del **Boletín Hidrológico Semanal del MITECO** (normalizados vía MapasDeEmbalses.es).

- **Sitio web en producción:** [https://embalses.antoniohorrillo.com](https://embalses.antoniohorrillo.com)
- **Repositorio:** [https://github.com/antoniohh/EmbalsesExtremadura](https://github.com/antoniohh/EmbalsesExtremadura)
- **Autor:** Antonio Horrillo ([antoniohorrillo.com](https://antoniohorrillo.com))

---

## 🎯 Características Principales

1. **Manómetro Hídrico Autonómico y Distribución por Cuenca:**
   - Panel de control regional con cálculo ponderado riguroso por capacidad real (sin medias simples que distorsionen los embalses gigantes como La Serena o Alcántara).
   - Medidor visual tipo manómetro (*reservoir gauge*) con el llenado autonómico consolidado, volumen embalsado actual y capacidad disponible.
   - Balances y reparto territorial de las cuencas del **Guadiana** y del **Tajo**, con semáforo de tendencia semanal (suben, bajan o se mantienen).
2. **Catálogo Interactivo con Búsqueda y Filtros en Tiempo Real (`FilterableGrid`):**
   - Buscador instantáneo por nombre de embalse.
   - Filtros inmediatos por provincia (**Badajoz** / **Cáceres**) y cuenca hidrográfica (**Guadiana** / **Tajo**).
   - Ordenación flexible por porcentaje de llenado, capacidad total o volumen embalsado actual.
   - Renderizado en HTML estático inicial para máxima velocidad e indexabilidad SEO (42 tarjetas disponibles sin JavaScript).
3. **42 Fichas Individuales Indexables con Gráficos Históricos (`/embalse/[slug]/`):**
   - Gráfico de serie histórica interactivo con selector de **4, 12 y 52 semanas** (`HistoricalChart`), tooltip dinámico y tabla accesible para lectores de pantalla.
   - Comparativa del nivel del embalse frente a la media de su cuenca hidrográfica.
   - Botón opcional de **lectura provisional bajo demanda** (`LiveReading`), que conecta en vivo con el organismo de cuenca al pulsar «Actualizar» sin bloquear la carga estática.
4. **Preguntas Frecuentes con Marcado Estructurado:**
   - Acordeón de respuestas directas sobre hidrología extremeña generado dinámicamente a partir de los datos del boletín.
   - Marcado Schema.org `FAQPage` para enriquecer la presencia en los resultados de búsqueda de Google (SERP).
5. **SEO Técnico, PWA y Privacidad (RGPD / AEPD):**
   - Marcado estructurado Schema.org `@graph` exhaustivo (`WebSite`, `WebPage`, `Dataset`, `BreadcrumbList`, `FAQPage`).
   - Metadatos de geolocalización oficial de Extremadura (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
   - Cumplimiento estricto de privacidad mediante **Google Consent Mode v2**: bloqueo analítico por defecto para el Espacio Económico Europeo (EEE), sincronización con Google Tag Manager (`GTM-PT3SNCV5`), componente `CookieBanner.astro` con modal accesible y página dedicada de [Política de Cookies](/cookies/).
   - Instalación móvil (PWA) con banner deslizante (`InstallPrompt.astro`), Web App Manifest (`site.webmanifest`) y Service Worker (`sw.js`) con soporte offline.

---

## 🛠️ Comandos de Desarrollo y Scripts de Datos

```bash
# Instalar dependencias (requiere Node.js >= 22.23.4)
npm install

# Iniciar servidor de desarrollo local (http://localhost:4321)
npm run dev

# Descargar datos oficiales desde la API y generar snapshot local (src/data/ y public/datos/)
npm run data

# Compilar sitio estático para producción (genera dist/ con 45 páginas)
npm run build

# Compilar actualizando previamente los datos desde la API
npm run build:data

# Previsualizar la compilación de producción localmente
npm run preview

# Verificación de tipos y diagnóstico con Astro Check (0 errores garantizados)
npm run check

# Suite de pruebas automatizadas con Playwright (40 comprobaciones de SEO, responsive y UI)
npm run test:ui

# Generar capturas de revisión visual en .impeccable/review/
npm run capture
```

---

## 📁 Estructura del Proyecto

```text
EmbalsesExtremadura/
├── .github/
│   └── workflows/
│       ├── deploy.yml                             # Actualización de datos (martes 13:00 y 18:00 UTC) y deploy Pages
│       └── release.yml                            # Empaquetado ZIP y publicación de releases en tags v*
├── public/
│   ├── assets/
│   │   ├── apple-touch-icon.png                   # Icono táctil iOS (180x180 px)
│   │   ├── icon-192.png                           # Icono PWA para móvil (192x192 px)
│   │   ├── icon-512.png                           # Icono PWA alta resolución (512x512 px)
│   │   ├── og-image.png                           # Imagen Open Graph / Twitter Cards (1200x630 px)
│   │   └── og-image.svg
│   ├── datos/
│   │   └── embalses.json                          # Distribución pública del dataset oficial en JSON
│   ├── CNAME                                      # Dominio personalizado: embalses.antoniohorrillo.com
│   ├── favicon.svg                                # Icono vectorial hídrico
│   ├── robots.txt                                 # Directivas de rastreo para motores de búsqueda
│   ├── site.webmanifest                           # Manifiesto PWA (modo standalone)
│   ├── sitemap.xml                                # Mapa del sitio XML sincronizado con fecha del boletín
│   └── sw.js                                      # Service Worker PWA (caché de assets y fallback offline)
├── release/
│   ├── RELEASE_NOTES_v1.0.0.md                    # Notas y características de la versión 1.0.0
│   ├── RELEASE_NOTES_v1.0.1.md                    # Notas de la versión 1.0.1 (eliminación de quiz)
│   ├── RELEASE_NOTES_v1.0.2.md                    # Notas de la versión 1.0.2 (supresión de metodología)
│   ├── embalses-extremadura-v1.0.0.zip            # Paquete precompilado de producción v1.0.0
│   ├── embalses-extremadura-v1.0.0.zip.sha256     # Checksum SHA-256 v1.0.0
│   ├── embalses-extremadura-v1.0.1.zip            # Paquete precompilado de producción v1.0.1
│   ├── embalses-extremadura-v1.0.1.zip.sha256     # Checksum SHA-256 v1.0.1
│   ├── embalses-extremadura-v1.0.2.zip            # Paquete precompilado de producción v1.0.2
│   └── embalses-extremadura-v1.0.2.zip.sha256     # Checksum SHA-256 v1.0.2
├── scripts/
│   ├── capture.mjs                                # Script de capturas Playwright para revisión de diseño
│   ├── fetch-data.mjs                             # Extracción de datos desde MapasDeEmbalses.es y generación de sitemap
│   └── test.mjs                                   # 40 comprobaciones Playwright (sin JS, hidratación, cookies, responsive)
├── src/
│   ├── components/
│   │   ├── react/
│   │   │   ├── EmbalseCard.tsx                    # Tarjeta de embalse con barra de nivel y variaciones
│   │   │   ├── FilterBar.tsx                      # Barra de búsqueda, filtros de cuenca/provincia y ordenación
│   │   │   ├── FilterableGrid.tsx                 # Isla React interactiva de catálogo con URL params
│   │   │   ├── HistoricalChart.tsx                # Gráfico SVG responsivo con conmutador 4/12/52 semanas
│   │   │   ├── KpiMetric.tsx                      # Componente de métrica destacada
│   │   │   ├── LiveReading.tsx                    # Isla React de consulta de lectura en tiempo real
│   │   │   ├── ReservoirGauge.tsx                 # Manómetro hídrico SVG autonómico
│   │   │   ├── TrendBadge.tsx                     # Distintivo visual de subida/bajada/estabilidad
│   │   │   └── WaterBar.tsx                       # Barra de nivel de vaso
│   │   ├── Brand.astro                            # Logotipo e identidad visual
│   │   ├── CookieBanner.astro                     # Banner y modal accesible de Consent Mode v2
│   │   ├── Footer.astro                           # Pie de página con créditos, enlaces y atribución
│   │   ├── Header.astro                           # Cabecera sticky con navegación y estado de boletín
│   │   ├── InstallPrompt.astro                    # Banner PWA para instalación en Chrome móvil
│   │   └── Logo.astro                             # Isotipo vectorial
│   ├── data/
│   │   └── embalses.json                          # Snapshot de datos locales con series de hasta 60 semanas
│   ├── layouts/
│   │   └── BaseLayout.astro                       # Layout base: SEO, Geo-tags, Consent Mode v2, GTM y PWA
│   ├── lib/
│   │   ├── aggregate.ts                           # Lógica de cálculo ponderado autonómico y por cuenca
│   │   ├── data.ts                                # Carga y ordenación de embalses en tiempo de compilación
│   │   ├── format.ts                              # Formateo numérico y de fechas en español
│   │   └── site.ts                                # Constantes canónicas, dominio y configuración GTM
│   ├── pages/
│   │   ├── embalse/
│   │   │   └── [slug].astro                       # 42 fichas estáticas individuales generadas con getStaticPaths
│   │   ├── 404.astro                              # Página de error 404 personalizada
│   │   ├── cookies.astro                          # Política de Cookies y Privacidad con gestor de consentimiento
│   │   └── index.astro                            # Portada principal con catálogo completo y métricas
│   ├── styles/
│   │   └── global.css                             # Estilos globales y utilidades de Tailwind CSS v4
│   └── types.ts                                   # Definiciones de tipos TypeScript estrictos
├── .gitignore
├── .nvmrc                                         # Versión LTS fijada de Node.js (22.23.4)
├── AGENTS.md                                      # Directrices operativas para agentes de IA
├── CHANGELOG.md                                   # Historial de cambios por versión (SemVer)
├── DESIGN.md                                      # Sistema de diseño, paleta y pautas de interfaz
├── LICENSE                                        # Licencia MIT de código abierto
├── PRODUCT.md                                     # Definición de producto, público objetivo y posicionamiento
├── README.md
├── astro.config.mjs                               # Configuración de Astro con React y Tailwind CSS
├── package.json
└── tsconfig.json
```

---

## 🌐 Despliegue en GitHub Pages (`embalses.antoniohorrillo.com`)

El proyecto está configurado para publicarse de forma automática bajo el dominio personalizado `https://embalses.antoniohorrillo.com/`:

1. El repositorio utiliza el workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
2. Se ejecuta automáticamente en cada `push` a la rama `main` y todos los **martes a las 13:00 y 18:00 UTC** para sincronizarse con la publicación semanal del Boletín Hidrológico del MITECO.
3. El archivo [`public/CNAME`](public/CNAME) fija el dominio propio en GitHub Pages.
4. Si la API oficial experimenta alguna incidencia temporal, el script de extracción conserva el último snapshot disponible para que el despliegue nunca falle.

---

## 📦 Control de Versiones

Versión actual: **1.0.3** · [Historial completo en CHANGELOG.md](CHANGELOG.md)

| Versión | Fecha | Cambios principales |
|---|---|---|
| **1.0.3** | 2026-11-10 | Corrección de microcopia («lleno» en lugar de «llenado») en tarjetas de embalse y reestructuración de la ficha de embalse para eliminar espacios en blanco y equilibrar la rejilla de escritorio |
| **1.0.2** | 2026-11-10 | Supresión de la sección y página de metodología, simplificación del pie de página (retirada de columna «Datos» redundante) y consolidación de la atribución a fuentes oficiales |
| **1.0.1** | 2026-11-10 | Eliminación del juego/quiz («El reto del agua») en portada para enfocar la experiencia en la utilidad pública directa y aligerar el bundle JavaScript |
| **1.0.0** | 2026-11-10 | Lanzamiento inicial: panel autonómico con 42 embalses monitorizados, búsqueda y filtros en vivo, gráficos históricos de hasta 52 semanas, lectura provisional en tiempo real, Google Consent Mode v2 con GTM (`GTM-PT3SNCV5`), PWA y 46 pruebas automatizadas |

El workflow [`.github/workflows/release.yml`](.github/workflows/release.yml) compila el sitio y adjunta automáticamente el paquete comprimido `embalses-extremadura-vX.Y.Z.zip` al publicar una etiqueta `v*` en GitHub. Los paquetes precompilados locales y sus hashes de integridad se encuentran disponibles en la carpeta [`release/`](release/).

---

## 📄 Licencia y Autoría

Desarrollado por **[Antonio Horrillo](https://antoniohorrillo.com)** ([github.com/antoniohh](https://github.com/antoniohh)).

- El **código fuente** de este proyecto se distribuye bajo la licencia **MIT** (ver [LICENSE](LICENSE)).
- Los **datos de los embalses** proceden del **Boletín Hidrológico Semanal del MITECO** ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es)) y del servicio de normalización de [MapasDeEmbalses.es](https://mapasdeembalses.es/), conservando sus respectivas condiciones de reutilización y atribución oficial.
