# Directrices para Agentes (AGENTS.md) — Embalses de Extremadura

Este documento define las reglas operativas, de arquitectura y de publicación de versiones que cualquier agente de IA debe cumplir estrictamente al trabajar en este repositorio.

---

## 1. Reglas Críticas sobre Git, Identidad y Releases

> **1. PROHIBIDO CREAR ETIQUETAS GIT (`git tag`) LOCALMENTE.**
> - **NUNCA** ejecutes `git tag` ni `git push --tags`.
> - El usuario gestiona la creación de etiquetas y la publicación de releases manualmente desde su cliente o la interfaz web de GitHub.
>
> **2. NUNCA CAMBIAR LA CONFIGURACIÓN DE GIT (USUARIO / EMAIL).**
> - Está terminantemente prohibido alterar `user.name` o `user.email` en git local ni global.
> - No ejecutar commits a menos que el usuario lo solicite explícitamente y con sus directrices.
>
> **3. FLUJO DE PREPARACIÓN DE RELEASES:**
> - Cuando el usuario pida preparar una nueva release (ej. `v1.0.0` o `v1.0.1`):
>   1. Actualizar la versión en `package.json` y `package-lock.json`.
>   2. Documentar la versión en `CHANGELOG.md` y `README.md`.
>   3. Verificar el proyecto con `npm run check` y compilar con `npm run build`.
>   4. Generar en la carpeta `release/`:
>      - `release/embalses-extremadura-vX.Y.Z.zip` (comprimiendo el contenido de `dist/`)
>      - `release/embalses-extremadura-vX.Y.Z.zip.sha256`
>      - `release/RELEASE_NOTES_vX.Y.Z.md`
>   5. Dejar los cambios preparados sin crear ningún tag.

---

## 2. Identidad y Configuración del Proyecto

- **Nombre:** Embalses de Extremadura (`embalses-extremadura`)
- **Dominio de producción:** `https://embalses.antoniohorrillo.com` (configurado en `public/CNAME`, `astro.config.mjs` y `src/lib/site.ts`)
- **Repositorio:** `https://github.com/antoniohh/EmbalsesExtremadura`
- **Autor:** Antonio Horrillo (`https://antoniohorrillo.com`)
- **Google Tag Manager:** `GTM-PT3SNCV5` (definido en `src/lib/site.ts` y cargado en `src/layouts/BaseLayout.astro`)
- **Clave LocalStorage de consentimiento:** `embalses_extremadura_cookie_consent`
- **Stack:** Astro 7 (`output: "static"`, `trailingSlash: "always"`), React 19 (`@astrojs/react`), Tailwind CSS v4 (`@tailwindcss/vite`), `@lucide/astro`, `lucide-react` y TypeScript estricto sobre Node.js `>= 22.23.4` (`.nvmrc`).

---

## 3. Arquitectura de Datos y Actualización Semanal

- Los datos semanales provienen de la API de normalización de MapasDeEmbalses.es a partir del Boletín Hidrológico Semanal del MITECO (CC BY 4.0).
- `scripts/fetch-data.mjs` (`npm run data`):
  1. Filtra los embalses de Badajoz y Cáceres con capacidad y volumen publicados.
  2. Descarga la serie histórica de hasta 60 semanas.
  3. Escribe `src/data/embalses.json` y la copia estática pública `public/datos/embalses.json`.
  4. Genera `public/sitemap.xml` y `public/robots.txt` sincronizados con la fecha del boletín.
- El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente todos los **martes a las 13:00 y 18:00 UTC** y en cada `push` a `main`.

---

## 4. Estándares de Interfaz, Accesibilidad y Privacidad

- **HTML estático primero:** Todo el contenido clave (KPIs, catálogo de 42 embalses y FAQ) debe existir en el HTML sin JavaScript para garantizar el 100 % de indexabilidad SEO y accesibilidad.
- **Privacidad (RGPD / AEPD):** Mantener Google Consent Mode v2 con `analytics_storage: 'denied'` por defecto para el EEE en `src/layouts/BaseLayout.astro`, gestión visual mediante `src/components/CookieBanner.astro` y documentación completa en `src/pages/cookies.astro`.
- **Instalabilidad PWA:** Mantener el banner `src/components/InstallPrompt.astro` y el Service Worker `public/sw.js` operativo para permitir la instalación en Android / Chrome móvil.
- **Calidad obligatoria:** Cualquier cambio debe pasar `npm run check` (0 errores) y `npm run test:ui` (40 pruebas Playwright de funcionalidad y responsive sin desbordamiento horizontal a 320, 390, 768 y 1440 px).
