# Embalses de Extremadura 1.1.2

**Corrección integral de Google Analytics 4 (`gtag.js`), reactividad en Google Consent Mode v2 y soporte para verificación en Google Search Console.**

Versión de producción de **Embalses de Extremadura**, disponible en `https://embalses.antoniohorrillo.com/`.

---

## Cambios en esta versión

### 1. Corrección de Google Analytics 4 y Google Tag ([`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro))
- **Eliminación de encapsulado IIFE:** Retirada la directiva `define:vars` del script en `<head>`, la cual confinaba la función `gtag()` en un ámbito privado y dejaba `window.gtag` como indefinido en el cliente.
- **Exposición global:** Se declara y expone explícitamente `window.gtag = gtag`.
- **String literal para analizadores y Search Console:** Se garantiza que la llamada `gtag("config", "G-MK7WEP5HN0")` y el script `googletagmanager.com/gtag/js?id=G-MK7WEP5HN0` figuren como cadenas literales en el HTML estático, permitiendo la detección regex automática del verificador de Google Search Console y Google Tag Assistant.

### 2. Sincronización Dinámica de Consentimiento ([`src/components/CookieBanner.astro`](../src/components/CookieBanner.astro))
- **Actualización reactiva de consentimiento:** Al pulsar «Aceptar todas» o guardar preferencias, se ejecuta efectivamente `window.gtag("consent", "update", ...)`.
- **Envío de `page_view` tras consentimiento:** Disparo inmediato del evento `page_view` al otorgar consentimiento para que GA4 registre la sesión activa y se visualice en los informes de tiempo real desde la primera visita.
- **Tipado TypeScript:** Tipado estricto sin dependencias dinámicas ni errores de compilación Astro.

### 3. Soporte para Verificación en Google Search Console ([`src/lib/site.ts`](../src/lib/site.ts) y [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro))
- Incorporada la constante `GOOGLE_SITE_VERIFICATION` y la metaetiqueta correspondiente `<meta name="google-site-verification" content="..." />` en `<head>` como método directo alternativo para la propiedad de prefijo de URL en GSC.

### 4. Verificación y Calidad
- **Astro Check (`npm run check`)**: 0 errores, 0 advertencias, 0 sugerencias en 30 archivos.
- **Compilación estática (`npm run build`)**: 45 páginas HTML generadas limpiamente en `dist/`.
- **Suite de Pruebas Playwright (`npm run test:ui`)**: 39 de 39 comprobaciones superadas (SEO, accesibilidad, ausencia de desbordamiento horizontal a 320, 390, 768 y 1440 px, flujo de cookies y carga analítica).

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.1.2.zip`
- **SHA256:** `2fbe02d105c118b93215eaca49ddf67202365d7a20ba28f036afd322139c28a6`
