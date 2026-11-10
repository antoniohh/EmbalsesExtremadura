# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 con `output: "static"` y React 19 como islas (`@astrojs/react`). Tailwind CSS 4, Lucide y TypeScript estricto. Los datos se descargan en el build con un script de Node desde la API pública de MapasDeEmbalses.es (normalización del Boletín Hidrológico del MITECO). El sitio se publica en GitHub Pages con GitHub Actions y se regenera cada martes.

## Users

Personas que viven, trabajan o tienen propiedades en Extremadura y quieren entender el estado del agua embalsada sin interpretar un boletín técnico: regantes, agricultores, vecinos de municipios ribereños, periodistas locales, estudiantes y técnicos que necesitan una lectura rápida y fiable. Consultan sobre todo desde el móvil, a menudo para comparar la situación de su embalse con la de la cuenca y con la semana anterior.

## Product Purpose

Ofrecer un panel público, claro y actualizado del estado de los embalses de Badajoz y Cáceres: capacidad, volumen embalsado, porcentaje de llenado, variación semanal e histórico reciente. El éxito es que alguien encuentre su embalse en segundos, entienda si el nivel sube o baja y pueda citar la fuente oficial.

## Positioning

No es un mapa genérico de España: es una lectura extremeña, curada y explicada. Combina el dato semanal oficial del MITECO con una interfaz de utilidad pública que traduce cada cifra a contexto (cuenca, provincia, evolución y comparación), conservando siempre la trazabilidad de la fuente. A diferencia de un cuadro de mando SPA, cada ficha se sirve como HTML estático indexable y solo hidrata las islas que necesitan interacción.

## Operating Context

Consulta recurrente, semanal o durante episodios de sequía y crecidas. El boletín del MITECO se publica los martes; un flujo de GitHub Actions descarga los datos, genera el snapshot, compila las 42 fichas y despliega en GitHub Pages. La fecha de referencia se muestra siempre. La ficha incluye una lectura reciente opcional del organismo de cuenca, consultada bajo demanda y marcada como provisional.

## Capabilities and Constraints

- Catálogo de embalses de Badajoz y Cáceres con dato de volumen disponible (actualmente 42 de 50 en el catálogo de la fuente).
- Home estática con KPIs de Extremadura, Guadiana y Tajo, balance semanal y catálogo completo en el HTML inicial.
- Isla React para búsqueda instantánea, filtros por provincia y cuenca, ordenación y estado vacío.
- Cierre editorial de la home con el reparto del agua por cuenca, un reto de 5 preguntas y 5 preguntas frecuentes con `FAQPage`.
- Ficha estática en `/embalse/:slug/` con migas de pan, métricas, histórico de hasta 60 semanas, comparación con la cuenca y párrafo SEO.
- Isla React para el gráfico histórico (4/12/52 semanas) y para la lectura reciente bajo demanda.
- Datos en vivo solo cuando el visitante pulsa «Actualizar» en la lectura reciente: una petición por ficha, nunca 47 por visita.
- Cumplimiento de privacidad RGPD/AEPD con Google Consent Mode v2 delimitado por región y Google Tag Manager (`GTM-PT3SNCV5`): bloqueo estricto por defecto en el EEE y página dedicada en `/cookies/`.
- Soporte PWA con Web App Manifest, Service Worker offline (`sw.js`) y banner instalable adaptado a móvil (`InstallPrompt.astro`).
- La fuente original es el MITECO (CC BY 4.0); MapasDeEmbalses.es exige atribución pública del servicio de normalización y conservar la fuente original.
- Los porcentajes agregados se calculan ponderando por capacidad, no como media simple.
- No se inventan datos, previsiones ni comparaciones que la fuente no permita calcular.

## Brand Commitments

Nombre de trabajo: Embalses de Extremadura. Tono de utilidad pública: preciso, sobrio y legible, sin alarmismo ni lenguaje comercial. El brief fija fondo `bg-slate-50`, tarjetas blancas con sombras suaves, acentos en azules hídricos (`blue-600`, `cyan-600`) y semáforo verde/rojo para la tendencia semanal.

## Evidence on Hand

- API pública documentada: `https://mapasdeembalses.es/api/v1/nacional`, `/embalses`, `/embalses/{slug}`, `/embalses/{slug}/historico`, `/provincias`, `/cuencas`.
- Atribución requerida: «Datos procesados por MapasDeEmbalses.es · Fuente original: MITECO».
- Snapshot generado desde la API el 2026-11-08; fecha de referencia del boletín: 2026-11-03. Incluye 60 semanas de histórico y lecturas recientes para 36 embalses.
- No hay logotipo, fotografía ni testimonio aportado; no deben fabricarse.

## Product Principles

1. El dato primero: cifra, unidad, fecha y fuente siempre visibles juntos.
2. SEO estructural: el contenido principal y los enlaces existen en el HTML inicial, no solo después de hidratar React.
3. La tendencia importa tanto como el nivel: subida, bajada y variación semanal tienen el mismo rango visual que el porcentaje.
4. Extremadura no es un apéndice de España: la jerarquía, el lenguaje y los agregados son extremeños.
5. Transparencia ante la incertidumbre: si el dato es de respaldo, está desactualizado o falta, se dice.
6. Móvil primero, sin sacrificar densidad: la consulta rápida y la lectura detallada caben en la misma página.

## Accessibility & Inclusion

Objetivo WCAG 2.2 AA: contraste suficiente, foco visible, navegación por teclado, etiquetas explícitas en los controles, alternativas textuales para las gráficas y respeto a `prefers-reduced-motion`.
