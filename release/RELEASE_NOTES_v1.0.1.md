# Embalses de Extremadura 1.0.1

**Optimización de portada: eliminación del quiz para una experiencia de consulta más limpia, rápida y enfocada.**

Segunda versión de producción de **Embalses de Extremadura**, disponible en `https://embalses.antoniohorrillo.com/`.

---

## Cambios en esta versión

### 1. Simplificación de la Portada
- **Eliminación del juego/quiz («El reto del agua»)** situado encima de la sección de preguntas frecuentes:
  - Elimina elementos lúdicos para concentrar la experiencia en la utilidad pública, la consulta rápida de datos hídricos y el acceso directo a las preguntas frecuentes.
  - Reduce el peso del bundle JavaScript al suprimir la isla React correspondiente (`EmbalseQuiz.tsx` y `quiz.ts`).
  - Navegación más directa hacia las preguntas frecuentes y el pie de página.
- **Navegación del pie de página ([`src/components/Footer.astro`](src/components/Footer.astro))**:
  - Retirado el enlace a la sección `#reto` en la columna de exploración.

### 2. Mantenimiento y Calidad
- **Suite de pruebas ([`scripts/test.mjs`](scripts/test.mjs))**:
  - Actualizadas las comprobaciones automáticas de Playwright para reflejar la eliminación del quiz y validar la presencia contigua de las preguntas frecuentes (42/42 pruebas superadas).
- **`npm run check`**: 0 errores, 0 warnings en 32 archivos.
- **`npm run build`**: 46 páginas estáticas compiladas en menos de 1 segundo.

---

## Paquete ZIP de producción

- **Archivo:** `embalses-extremadura-v1.0.1.zip`
- **SHA256:** `36193368d6f28957b600dd358809884fd8bdd234f7d383ab07d7a3a300ef9523`
