# Embalses de Extremadura 1.0.2

**Optimización de experiencia y diseño: eliminación de la sección de metodología y simplificación del pie de página.**

Tercera versión de producción de **Embalses de Extremadura**, disponible en `https://embalses.antoniohorrillo.com/`.

---

## Cambios en esta versión

### 1. Supresión de Metodología y Limpieza de Enlaces
- **Eliminación de la página y sección `/metodologia/`**:
  - Al igual que en *Luz Extremadura* y *Combustible Extremadura*, se elimina la página por no aportar al usuario final, manteniendo la transparencia a través de la atribución directa en el pie de página.
  - Retirados los enlaces a metodología desde el hero, pie de catálogo, contexto y FAQ en la portada (`index.astro`), y de las fichas individuales (`[slug].astro`).
  - La píldora informativa en la cabecera (`Header.astro`) pasa a ser un distintivo estático de estado con la fecha del boletín.

### 2. Saneamiento del Pie de Página ([`src/components/Footer.astro`](src/components/Footer.astro))
- **Eliminación de la columna «Datos»**:
  - Suprimidos los enlaces externos redundantes (*Boletín del MITECO*, *MapasDeEmbalses.es* y *Licencia CC BY 4.0*).
- **Consolidación en la columna «Fuentes»**:
  - Atribución oficial clara y directa a la fuente original MITECO y al servicio de normalización de MapasDeEmbalses.es bajo licencia CC BY 4.0.
- **Reorganización del grid**:
  - Reajustado a 3 columnas equilibradas (Identidad, Explorar y Fuentes).

### 3. Mantenimiento, SEO y Calidad
- **Sitemap ([`public/sitemap.xml`](public/sitemap.xml))**: Actualizado a 45 URLs estáticas sincronizadas.
- **Suite de pruebas ([`scripts/test.mjs`](scripts/test.mjs))**: 40/40 comprobaciones Playwright superadas (sin JS, hidratación y responsive en 320, 390, 768 y 1440 px).
- **`npm run check`**: 0 errores, 0 advertencias, 0 sugerencias en 31 archivos.
- **`npm run build`**: 45 páginas estáticas generadas en ~0.9 segundos.

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.0.2.zip`
- **SHA256:** `c084a786af9f3e312cfe870846239a8a0f81ab0cf1bda49100d1bea6865b9ef2`
