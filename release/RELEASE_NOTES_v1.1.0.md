# Embalses de Extremadura 1.1.0

**Modernización a Astro 7 puro: eliminación de React 19, barra de red responsive, enlazado SEO entre proyectos, Google Analytics 4 con Consent Mode v2, cron semanal los martes por la noche y resolución de indexación en Google Search Console.**

Cuarta versión de producción de **Embalses de Extremadura**, disponible en `https://embalses.antoniohorrillo.com/`.

---

## Cambios en esta versión

### 1. Transformación a Astro 7 Puro (Zero-Runtime JS)
- **Desinstalación completa de dependencias de React**:
  - Eliminados `@astrojs/react`, `react`, `react-dom`, `lucide-react`, `@types/react*` y `oxc-transform-react`.
  - Retirada la integración `react()` en `astro.config.mjs`.
  - Eliminada la carpeta completa `src/components/react/`.
- **Reemplazo por componentes nativos de Astro**:
  - `src/components/EmbalseCard.astro`: tarjeta estática de embalse con dataset HTML (`data-*`) para filtrado instantáneo.
  - `src/components/FilterBar.astro`: controles de búsqueda, filtrado segmentado por provincia y cuenca, y ordenación.
  - `src/components/HistoricalChart.astro`: gráfico SVG responsivo nativo con selector de escala (4, 12 y 52 semanas) y tooltips dinámicos.
  - `src/components/ReservoirGauge.astro`, `src/components/TrendBadge.astro` y `src/components/WaterBar.astro`: componentes puros de servidor.
  - `src/scripts/filtro-embalses.ts`: lógica cliente de filtrado y ordenación en TypeScript puro (4.8 KB).
- **Reducción masiva del bundle**:
  - El peso de JavaScript transferido al cliente cae de más de 220 KB a tan solo 4.8 KB.
  - Supresión de las etiquetas `<astro-island>` y de la serialización masiva de props en el HTML.

### 2. Barra de Red Responsive y Enlazado SEO entre Proyectos
- **Barra de navegación de la red (`NetworkBar.astro`)**:
  - Barra superior responsive de 34 px de altura fija con scroll horizontal suave (`overflow-x-auto`) sin barra visible.
  - Enlaces directos a los cuatro proyectos del ecosistema:
    - *Luz Extremadura* (`https://luz.antoniohorrillo.com/`)
    - *Combustible Extremadura* (`https://combustible.antoniohorrillo.com/`)
    - *GlucoLuna* (`https://glucoluna.antoniohorrillo.com/`)
    - *Embalses de Extremadura* (`https://embalses.antoniohorrillo.com/`)
  - Píldora activa destacada para el proyecto actual.
- **Columna «Red de Proyectos» en el pie de página (`Footer.astro`)**:
  - 4 columnas equilibradas optimizadas para transferencia de autoridad SEO y navegación fluida entre sitios.

### 3. Migración a Google Analytics 4 y Google Consent Mode v2
- **Sustitución de GTM por GA4 directo**:
  - Retirado el contenedor `GTM-PT3SNCV5`.
  - Implementada la etiqueta oficial de Google Analytics 4 (`G-PT3SNCV5`) mediante `gtag.js`.
- **Paridad estricta con Google Consent Mode v2**:
  - Bloqueo por defecto (`analytics_storage: denied`) para España y el Espacio Económico Europeo (EEE), Reino Unido y Suiza.
  - Sincronización inmediata con el consentimiento guardado en `localStorage` (`embalses_extremadura_cookie_consent`).
  - Actualización de los textos legales en `src/pages/cookies.astro` y el modal de preferencias en `src/components/CookieBanner.astro`.

### 4. Automatización con Cron Semanal los Martes por la Noche y Retirada de Lectura en Tiempo Real
- **GitHub Actions (`.github/workflows/deploy.yml`)**:
  - Programación semanal fijada los **martes a las 20:35 UTC (21:35 CET / 22:35 CEST)** (`35 20 * * 2`), aplicando un desfase de unas 7 horas respecto a la publicación del MITECO para garantizar datos estables y sortear las horas punta de cola en GitHub Actions, además de ejecución en cada `push` a la rama `main`.
- **Retirada de la lectura provisional (`LiveReading`)**:
  - Eliminada la consulta bajo demanda en la ficha individual al no arrojar variaciones significativas frente al dato del boletín.

### 5. Resolución de Validación de Propiedad e Indexación en Google Search Console
- **Soporte `.nojekyll`**:
  - Añadido `public/.nojekyll` para evitar que el motor Jekyll de GitHub Pages filtre directorios con prefijo de guión bajo (`_astro/`), solventando errores 404 al recuperar hojas de estilo y scripts.
- **Verificación GSC**:
  - Resuelto el fallo de verificación por Google Analytics al incluir la etiqueta canónica de GA4 en el `<head>`.

---

## Verificación de Calidad

- **`astro check`**: 0 errores, 0 advertencias, 0 sugerencias en 30 archivos.
- **`astro build`**: 45 páginas estáticas generadas en 760 ms.
- **Bundle JS**: Reducido en más de un 97 %.

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.1.0.zip`
- **SHA256:** `bbe288da7a839cbbd1d4c8b998c9ecc80c5be0de94eea62f3e9c1db1ec24d482`
