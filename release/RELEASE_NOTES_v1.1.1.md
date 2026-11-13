# Embalses de Extremadura 1.1.1

**Actualización de analítica web: configuración oficial de Google Analytics 4 (`G-MK7WEP5HN0`) con `gtag.js` y Google Consent Mode v2.**

Versión de producción de **Embalses de Extremadura**, disponible en `https://embalses.antoniohorrillo.com/`.

---

## Cambios en esta versión

### 1. Actualización de Google Analytics 4 ([`src/lib/site.ts`](../src/lib/site.ts) y [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro))
- **ID de Medición Oficial:** Sustituido el identificador provisional por el ID oficial `G-MK7WEP5HN0`.
- **Carga Estandarizada:** Inclusión del script asíncrono oficial `https://www.googletagmanager.com/gtag/js?id=G-MK7WEP5HN0` replicando exactamente el patrón consolidado en *Luz Extremadura* y *Combustible Extremadura*.
- **Consent Mode v2:** Mantenimiento de la política estricta de privacidad con `analytics_storage: denied` por defecto para el Espacio Económico Europeo (EEE), actualización inmediata tras la interacción del usuario y persistencia local.

### 2. Verificación y Calidad
- **Astro Check (`npm run check`)**: 0 errores, 0 advertencias, 0 sugerencias en 30 archivos.
- **Compilación estática (`npm run build`)**: 45 páginas HTML generadas limpiamente en `dist/`.

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.1.1.zip`
- **SHA256:** `cfba76a3e78219706245c7c53cb3617020bef2187d47fc54fdc447aced3f0b60`
