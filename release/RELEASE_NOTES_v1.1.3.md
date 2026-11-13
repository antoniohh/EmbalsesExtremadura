# Embalses de Extremadura 1.1.3

**Renovación integral de recursos gráficos, isotipo vectorial SVG, familia de iconos PWA/móvil de alta resolución y nueva tarjeta social Open Graph estilo observatorio de datos.**

Versión de producción de **Embalses de Extremadura**, disponible en `https://embalses.antoniohorrillo.com/`.

---

## Cambios en esta versión

### 1. Nuevo Isotipo Vectorial e Identidad de Marca ([`src/components/Logo.astro`](../src/components/Logo.astro), [`public/favicon.svg`](../public/favicon.svg), [`public/assets/favicon.svg`](../public/assets/favicon.svg) y [`public/assets/logo.svg`](../public/assets/logo.svg))
- **Rediseño vectorial completo:** Nuevo isotipo sobre contenedor *squircle* con degradado radial abisal (`#0c3b5e` → `#030914`), reborde luminoso cian, arco de nivel hidrológico exterior, gota de agua volumétrica con brillo especular, coronación de presa con aliviadero estructural y olas del embalse.
- **IDs únicos por instancia en `Logo.astro`:** Generación de identificadores únicos para degradados y `clipPath`, garantizando el renderizado simultáneo impecable en cabecera (`Brand.astro`) y pie de página (`Footer.astro`).
- **Unificación en el pie de página ([`src/components/Footer.astro`](../src/components/Footer.astro)):** Sustitución del icono genérico de Lucide por el componente de marca `<Logo />`.

### 2. Familia de Iconos de Alta Resolución y PWA ([`public/assets/`](../public/assets/) y [`public/favicon.ico`](../public/favicon.ico))
- Generación de la familia completa de iconos con recorte transparente sobre la silueta *squircle*:
  - `public/assets/icon-512.png` (`512×512` px)
  - `public/assets/icon-192.png` (`192×192` px)
  - `public/assets/apple-touch-icon.png` (`180×180` px)
  - `public/favicon.ico` (multirresolución `16×16`, `32×32` y `48×48` px)
- Enlace explícito a `favicon.ico` en [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro) y soporte `"purpose": "any maskable"` en [`public/site.webmanifest`](../public/site.webmanifest).

### 3. Nueva Tarjeta Social Open Graph (`1200×630` px) ([`public/assets/og-image.png`](../public/assets/og-image.png))
- Nueva creatividad social con estética oscura de observatorio de datos, tarjeta 3D con el mapa hidrográfico de Extremadura (cuencas del Tajo y Guadiana), nodos luminosos de embalses, curva de evolución y distintivo oficial del MITECO.
- Eliminado el antiguo archivo intermedio `public/assets/og-image.svg`.

### 4. Verificación y Calidad
- **Astro Check (`npm run check`)**: 0 errores, 0 advertencias, 0 sugerencias en 30 archivos.
- **Compilación estática (`npm run build`)**: 45 páginas HTML generadas limpiamente en `dist/`.
- **Suite de Pruebas Playwright (`npm run test:ui`)**: 39 de 39 comprobaciones superadas (SEO, accesibilidad, ausencia de desbordamiento horizontal a 320, 390, 768 y 1440 px, flujo de cookies y carga analítica).

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.1.3.zip`
- **SHA256:** `8e22320327063feef0c2397b5509904db9e150193e44b5a35246d01a51486ba5`
