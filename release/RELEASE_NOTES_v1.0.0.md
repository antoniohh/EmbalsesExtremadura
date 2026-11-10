# Embalses de Extremadura 1.0.0

**Estado del agua embalsada, capacidad, variación semanal e histórico de los 42 embalses monitorizados en Extremadura (Badajoz y Cáceres) con datos oficiales del MITECO.**

Primera release de producción de **Embalses de Extremadura**, desplegada bajo el dominio personalizado `https://embalses.antoniohorrillo.com/`.

---

## Incluye

### 1. Panel General y Métricas Autonómicas
- **42 embalses monitorizados** en las provincias de Badajoz (23 embalses) y Cáceres (19 embalses) con datos consolidados de volumen, capacidad y porcentaje de llenado.
- Agregados regionales y por cuenca (**Guadiana** y **Tajo**) con cálculo ponderado riguroso por capacidad real (sin medias simples engañosas).
- Balance semanal de tendencia: embalses que suben, bajan o se mantienen estables respecto al boletín anterior.
- Medidor visual tipo manómetro hídrico (*gauge*) y barras de distribución por cuenca.

### 2. Catálogo Interactivo y Fichas Individuales
- **Buscador y filtros en tiempo real** (`FilterableGrid`): filtrado por provincia, cuenca hidrográfica, búsqueda por nombre y ordenación por porcentaje de llenado, capacidad total o volumen embalsado.
- **42 fichas estáticas individuales** (`/embalse/[slug]/`) completamente indexables por motores de búsqueda con migas de pan y datos técnicos.
- **Gráfico histórico interactivo** (`HistoricalChart`): visualización de 4, 12 y 52 semanas con tooltip y desglose tabular accesible para lectores de pantalla.
- **Lectura reciente bajo demanda** (`LiveReading`): consulta provisional al organismo de cuenca al pulsar «Actualizar» (sin sobrecargar la red ni bloquear la renderización estática).

### 3. Reto Didáctico y Preguntas Frecuentes
- **El Reto del Agua** (`EmbalseQuiz`): quiz interactivo de 5 preguntas sobre la geografía hídrica extremeña con soporte accesible sin JavaScript (fallback con primera pregunta en HTML estático).
- **Preguntas frecuentes** en acordeón con marcado estructurado Schema.org `FAQPage`.
- Página de **Metodología y fuentes** (`/metodologia/`) explicando el origen de los datos (Boletín MITECO + API pública de MapasDeEmbalses.es bajo licencia CC BY 4.0).

### 4. Privacidad (Google Consent Mode v2) y Analítica
- Cumplimiento riguroso del RGPD y directrices AEPD mediante **Google Consent Mode v2**:
  - Estado predeterminado `denied` para los países del EEE (España, UE, UK, Suiza).
  - Regla global permisiva para tráfico fuera del EEE.
  - Sincronización inmediata de decisiones previas en `<head>` antes de disparar etiquetas de Google Tag Manager (`GTM-PT3SNCV5`).
- Componente `CookieBanner.astro` con banner flotante y modal de configuración accesible (teclado, focus trap, Escape).
- Página de [Política de Cookies y Privacidad](/cookies/) con selector para reconfigurar el consentimiento en cualquier momento.

### 5. SEO Técnico y PWA
- Metadatos completos: Open Graph, Twitter Cards (`summary_large_image`), Canonical y Geo-tags oficiales de Extremadura (`ES-EX`, coordenadas 39.1667; -6.1667).
- Marcado estructurado Schema.org `@graph` (`WebSite`, `WebPage`, `Dataset`, `BreadcrumbList`, `FAQPage`).
- Archivos `sitemap.xml` y `robots.txt` generados dinámicamente con la fecha del boletín.
- **PWA e Instalación Móvil**:
  - Manifest (`site.webmanifest`) con display standalone e iconos de alta resolución (180, 192 y 512 px).
  - Componente `InstallPrompt.astro` con banner inferior y animación suave en Chrome/Android.
  - Service Worker (`sw.js`) con estrategia de cacheo estático y fallback offline.

---

## Stack Tecnológico

- **Astro 7.4.2** (`output: "static"`, `trailingSlash: "always"`)
- **React 19** (islas interactivas `@astrojs/react`)
- **Tailwind CSS 4.3.3** (`@tailwindcss/vite`)
- **Lucide** (`@lucide/astro` + `lucide-react`)
- **TypeScript 5.9.3** estricto
- Node.js `>= 22.23.4` (`.nvmrc`)

---

## Calidad y Verificación

- `npm run check`: **0 errores, 0 advertencias, 0 sugerencias** en 34 archivos.
- `npm run build`: Generación estática de las **46 páginas** en menos de 1 segundo.
- `npm run test:ui`: **46 de 46 pruebas automatizadas aprobadas** (sin JS, hidratación, gráficas, quiz, cookies, GTM, Geo-tags y validación de desbordamiento horizontal en 320, 390, 768 y 1440 px).

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.0.0.zip`
- **SHA256:** `693f2f3adbe78dfc74d1783b61117f7398f43371b39452bcf1442aa36fdf49b0`
