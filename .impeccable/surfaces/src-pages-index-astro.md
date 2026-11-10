---
version: 1
slug: "src-pages-home-tsx"
primary_target: "src/pages/Home.tsx"
related_targets: ["src/pages/Detail.tsx","src/pages/Metodologia.tsx"]
---

# Surface brief — Panel de embalses de Extremadura

## Scope and mode

Operate. An Astro static public data dashboard plus a reservoir detail read and a methodology page. React islands handle only the filterable catalogue, the historical chart and the optional live reading. Mobile-first, Spanish, for people checking water levels quickly and citing the source.

## Audience, job and action

Residents, farmers, irrigators, local press and students in Badajoz and Cáceres. Job: find a reservoir, understand its current level and weekly direction, compare it with its basin, and trust the date and source. Primary action: search/filter the catalogue and open a reservoir record. Secondary action: read the methodology.

## Proof and content

Real weekly MITECO data normalised by MapasDeEmbalses.es: capacity, stored volume, fill percentage, weekly change, 12-week snapshot history and 365-day live history. Attribution and licence are part of the product, not a footnote. Coverage is 42 of 50 catalogued reservoirs with a published volume.

## Chosen direction and memorable moment

A clear public-service dashboard whose signature move is the **measured waterline**: the aggregate level is a physical tank with a wave surface, depth ticks and a filled volume label; each card carries the same water level as a thin channel. The memory is the region's water seen as a depth, not a generic progress bar.

## Unresolved decisions

None material. The live API is read directly from the browser, cached for 30 minutes, with the bundled snapshot as the offline fallback. The canonical URL is configured through `VITE_SITE_URL`.

## Direction contract

THESIS: The waterline is the interface. Every level is read as a physical depth with a date and a source, while the catalogue stays as scannable as a public-service dashboard. It refuses the generic SaaS metric-card grid as the page's whole idea.

OWN-WORLD: Slate-50 ground, white surfaces with soft offset shadows, Public Sans with tabular numerals, hydro blue #1d4ed8 and cyan #0891b2, abyss navy #041c2c for the footer, emerald/rose only for weekly direction. One motif: the waterline and its wave; no texture, no glass, no illustration.

STORY: The visitor sees the region's total level and the week's direction, reads the two basins, finds their reservoir through search or filters, and leaves with a citable date, volume and source.

FIRST VIEWPORT: A 7/5 split. Left: the exact SEO h1 at display scale, a short explanation, primary CTA to the catalogue and a link to methodology, then the bulletin date and source. Right: the white Total Extremadura card with a live water tank, percentage, volume/capacity, available volume and weekly change. Below: three basin/balance indicators and the filter bar.

FORM: Code-led. The brief pins the palette and mood; no concept-seed roll was run because the visual world was supplied by the request. Astro serves every route as static HTML; React islands carry the catalogue filters, the historical chart and the on-demand live reading. The signature interaction is the animated waterline and the hover/keyboard chart readout.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
