# Embalses de Extremadura

Estado de los embalses de Extremadura: nivel de agua, capacidad, variación semanal e histórico con datos del boletín del MITECO. Astro + islas de React, desplegado en GitHub Pages.

**Web:** [embalses.antoniohorrillo.com](https://embalses.antoniohorrillo.com)

## Stack

- Astro 7 con `output: "static"` y `trailingSlash: "always"`
- React 19 como islas (`@astrojs/react`)
- Tailwind CSS 4
- Lucide (`@lucide/astro` para Astro, `lucide-react` para las islas)
- TypeScript estricto
- Datos: API pública de MapasDeEmbalses.es (normalización del Boletín Hidrológico del MITECO)

## Comandos

```bash
npm install
npm run dev          # http://localhost:4321
npm run data         # descarga la API y escribe src/data/embalses.json + public/datos/
npm run build        # genera dist/
npm run preview      # sirve dist/
npm run check        # astro check (0 errores)
npm run test:ui      # 46 comprobaciones con dev o preview levantado
npm run capture      # capturas en .impeccable/review/ (con preview en :4321)
```

## Datos

`scripts/fetch-data.mjs`:

1. Lee el catálogo de MapasDeEmbalses.es (444 embalses).
2. Filtra Badajoz y Cáceres con volumen y capacidad publicados.
3. Pide el detalle y el histórico de cada uno (hasta 60 semanas).
4. Escribe `src/data/embalses.json` y la copia pública `public/datos/embalses.json`.
5. Genera `public/sitemap.xml` y `public/robots.txt` con el dominio de producción.

Si la API falla, el script conserva el snapshot anterior y termina con éxito para que el build pueda seguir publicando el último boletín. Si no existe snapshot, falla.

### Fuente y licencia

- Fuente original: MITECO, Boletín Hidrológico Semanal (CC BY 4.0).
- Normalización y API: MapasDeEmbalses.es.
- Atribución requerida: «Datos procesados por MapasDeEmbalses.es · Fuente original: MITECO».

## Arquitectura

Las páginas son estáticas: el HTML inicial contiene el h1, los KPIs, las 42 tarjetas, el párrafo SEO y el JSON-LD. React solo se hidrata donde hace falta:

- `FilterableGrid` (`client:load`): búsqueda, filtros, ordenación y estado vacío.
- `HistoricalChart` (`client:visible`): gráfico 4/12/52 semanas, tooltip y tabla de datos.
- `LiveReading` (`client:idle`): lectura reciente del organismo de cuenca bajo demanda.

La lectura reciente es la única llamada a la API en el navegador. Se hace al pulsar «Actualizar», una sola petición por ficha, y se marca como provisional. El dato principal sigue siendo el boletín semanal del build.

## SEO y Privacidad

- HTML estático por ruta: `/`, `/metodologia/`, `/cookies/`, `/embalse/{slug}/` y `404.html`.
- Metadatos, canonical, Open Graph, Twitter Cards y Geo Tags de Extremadura en `BaseLayout.astro`.
- JSON-LD `@graph`: `WebSite`, `WebPage`, `Dataset`, `Article` y `BreadcrumbList` según la ruta.
- Google Consent Mode v2 integrado con Google Tag Manager (`GTM-PT3SNCV5`) y bloqueo estricto en EEE por defecto.
- Banner de instalación PWA (`InstallPrompt.astro`) y Service Worker (`public/sw.js`) con offline fallback.
- `public/sitemap.xml` y `public/robots.txt` generados con `lastmod` de la fecha del boletín.
- `public/datos/embalses.json` como distribución del `Dataset`.
- Imagen Open Graph en `public/assets/og-image.png`.

## Despliegue

GitHub Pages con GitHub Actions (`.github/workflows/deploy.yml`):

- En cada push a `main`.
- Cada martes a las 13:00 y 18:00 UTC.
- Manualmente con `workflow_dispatch`.

El flujo ejecuta `npm ci`, `npm run data`, `npm run build` y publica `dist/`. El dominio propio está en `public/CNAME` y en `site` de `astro.config.mjs`.

Si cambias de dominio, actualiza también `SITE` en `src/lib/site.ts` y el valor por defecto de `SITE_URL` en `scripts/fetch-data.mjs`.

Si el boletín se publica más tarde de lo previsto, lanza el workflow a mano o espera al segundo intento. La web siempre muestra la fecha del dato que está sirviendo.

## Calidad

- `npm run check` sin errores ni advertencias (34 archivos comprobados).
- `npm run test:ui` ejecuta **46 comprobaciones automáticas con Playwright**: HTML estático sin JavaScript (42 enlaces de embalses, FAQ y primera pregunta del reto), hidratación de filtros, ordenación y buscador, gráfico histórico, quiz, banner de cookies, modal accesible, Google Tag Manager, Geo-tags, banner de instalación PWA, metadatos, 404 y control estricto de desbordamiento horizontal a 320, 390, 768 y 1440 px.
- `npm run capture` genera las capturas de `desktop`, `mobile`, `user-320`, detalle y metodología en `.impeccable/review/`.

## Releases

Los paquetes de producción y notas de versión se generan en la carpeta `release/`:

- **v1.0.0**: `release/embalses-extremadura-v1.0.0.zip` (SHA256: `693f2f3adbe78dfc74d1783b61117f7398f43371b39452bcf1442aa36fdf49b0`).
- Detalles de cambios en [CHANGELOG.md](CHANGELOG.md) y [release/RELEASE_NOTES_v1.0.0.md](release/RELEASE_NOTES_v1.0.0.md).

## Licencia

El código de este proyecto se distribuye bajo la licencia MIT (ver [LICENSE](LICENSE)).

Los datos no son MIT: proceden del Boletín Hidrológico Semanal del MITECO (CC BY 4.0) y de la capa de normalización de MapasDeEmbalses.es. Conservan su propia atribución y condiciones de reutilización.
