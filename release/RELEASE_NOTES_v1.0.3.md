# Embalses de Extremadura 1.0.3

**Refinamiento visual y de microcopia: corrección de la etiqueta de llenado en catálogo y reestructuración de la ficha de embalse.**

Cuarta versión de producción de **Embalses de Extremadura**, disponible en `https://embalses.antoniohorrillo.com/`.

---

## Cambios en esta versión

### 1. Corrección de Microcopia en Tarjetas de Embalse ([`src/components/react/EmbalseCard.tsx`](../src/components/react/EmbalseCard.tsx))
- **Ajuste terminológico:** Sustituido el término `llenado` bajo la cifra de porcentaje principal por `lleno` (ej. `85,2 % lleno`), ofreciendo una lectura gramaticalmente correcta y natural en castellano.

### 2. Optimización del Grid en la Ficha de Embalse ([`src/pages/embalse/[slug].astro`](../src/pages/embalse/[slug].astro))
- **Reubicación de contenido:** La tarjeta explicativa «Qué significa este dato» se ha movido al interior de la columna izquierda, inmediatamente debajo de la gráfica histórica y la tabla de serie temporal.
- **Eliminación de espacios en blanco:** En pantallas medianas y de escritorio (`lg`), ambas columnas alcanzan ahora una altura equilibrada (~720 px), eliminando por completo el hueco en blanco que aparecía entre la gráfica y el pie común frente a las tarjetas técnicas y de lectura en tiempo real.

### 3. Verificación y Calidad
- **Suite de pruebas ([`scripts/test.mjs`](../scripts/test.mjs))**: 40/40 comprobaciones Playwright superadas (sin JavaScript, interactividad y verificación responsive a 320, 390, 768 y 1440 px).
- **`npm run check`**: 0 errores, 0 advertencias, 0 sugerencias en 31 archivos.
- **`npm run build`**: 45 páginas estáticas generadas en ~0.9 segundos.

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.0.3.zip`
- **SHA256:** `21c62effa94f04420fa022c3272f33c3462f079537e00b1ee2b04f2216db8ee3`
