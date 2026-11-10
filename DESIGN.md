---
name: Embalses de Extremadura
description: Panel público del agua embalsada en Badajoz y Cáceres, con datos semanales del MITECO.
colors:
  primary: "#1d4ed8"
  primary-bright: "#2563eb"
  water-cyan: "#0891b2"
  water-cyan-light: "#22d3ee"
  abyss: "#041c2c"
  logo-navy: "#082f49"
  ink: "#020617"
  ink-soft: "#475569"
  ink-muted: "#64748b"
  ground: "#f8fafc"
  surface: "#ffffff"
  line: "#e2e8f0"
  rise: "#059669"
  fall: "#e11d48"
  warning: "#b45309"
typography:
  display:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.16em"
  numeric:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  micro:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.14em"
  caption:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
  small:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  title-sm:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.018em"
  metric-sm:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  metric:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  gauge:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.35rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.045em"
    fontFeature: "tnum"
  display-lg:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.4rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.055em"
    fontFeature: "tnum"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  14: "56px"
  20: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
    typography: "{typography.body}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
    typography: "{typography.body}"
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "20px"
  input-search:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 40px"
    height: "44px"
  chip-guadiana:
    backgroundColor: "#ecfeff"
    textColor: "#155e75"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  chip-tajo:
    backgroundColor: "#eff6ff"
    textColor: "#1e40af"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  nav-item-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
---

# Design System: Embalses de Extremadura

## Overview

**Creative North Star: "The Public Waterline"**

The system treats the waterline as its central tool. A level is never just a percentage; it is a depth with a surface, a volume, a date and a source. The page should feel like a well-kept public information desk: calm, exact, legible at a glance and honest about where the number came from.

The world is built from cool slate ground, white paper-like surfaces and two working blues. Cyan is the water itself; deep blue is the measured, institutional layer of links, actions and charts. Green and red appear only when the water has risen or fallen. There is no decorative texture, no glass, no gradient text and no second accent family. The only ornamental gesture is the wave at the top of a filled reservoir.

The density is deliberately uneven: a generous first viewport for the region's total, a compact filter bar, then a dense but orderly catalogue. On a phone the same hierarchy survives without a single clipped control.

**Key Characteristics:**
- Hydric blue and cyan on a near-white slate ground.
- White surfaces with a one-pixel cool border and soft, offset shadows.
- Public Sans with tabular numerals on every measurement.
- One waterline motif: the aggregate tank and the thin level channels on cards.
- State color only for direction: emerald for rise, rose for fall, slate for no change.

## Colors

A restrained, cool palette that gives water two voices: the calm surface (cyan) and the measured depth (blue).

### Primary
- **Reservoir Blue** (#1d4ed8): primary actions, links, active navigation, the chart line and the deep end of the water gradient.
- **Current Blue** (#2563eb): hover, focus, progress fills and the brand mark's lower half.

### Secondary
- **Surface Cyan** (#0891b2): the Guadiana basin, the top of the water gradient and the section markers in methodology.
- **Wave Cyan** (#22d3ee): the animated crest, the tank's shallow water and the connection between the two blues.

### Neutral
- **Slate Ground** (#f8fafc): page field; it keeps white cards feeling like paper rather than floating panels.
- **Paper White** (#ffffff): surfaces, cards, buttons and table grounds.
- **Abyss Navy** (#041c2c): the footer and the single dark field in the system; it anchors the page and carries the source attribution.
- **Ink** (#020617): headings and primary numbers.
- **Soft Ink** (#475569): body text.
- **Muted Ink** (#64748b): labels, units and secondary metadata.
- **Cool Line** (#e2e8f0): borders and dividers.
- **Rise Green** (#059669): weekly rise.
- **Fall Rose** (#e11d48): weekly fall.
- **Cautious Amber** (#b45309): low-level warnings and stale-data notices.

### Named Rules
**The Two Blues Rule.** Blue is the institution and cyan is the water. Never introduce a third accent hue for decoration; a new color must name a new state.

**The Direction Rule.** Green and red are reserved for weekly movement. They never style a basin, a button, a heading or a container.

**The Source Rule.** Every screen that shows a measurement also shows its date and its source within the same viewport.

## Typography

**Display Font:** Public Sans Variable (self-hosted via Fontsource)
**Body Font:** Public Sans Variable
**Label Font:** Public Sans Variable, uppercase, tracked

**Character:** A civic, slightly compressed grotesque with excellent numerals. It reads as a public document rather than a startup dashboard. Weight and scale carry hierarchy; no italics, no second display face.

### Hierarchy
- **Display** (700, clamp(2.25rem, 5vw, 4rem), 0.98): the home h1 and the reservoir name in detail.
- **Headline** (700, clamp(1.75rem, 3vw, 2.25rem), 1.1): section titles and the largest detail metric.
- **Title** (600, 1.125rem, 1.3): card names, panel headings and table labels.
- **Body** (400, 15–17px, 1.6): explanations, methodology prose and metadata; long prose stops at 3xl to preserve a readable measure.
- **Label** (600, 11px, 0.16em, uppercase): form legends, KPI captions and footer headings.
- **Numeric** (600, tabular): every hm³, percentage and weekly change.

### Named Rules
**The Tabular Rule.** Any number that can be compared with another is set in tabular numerals. No proportional digits in tables, cards or charts.

**The No-Kicker Rule.** A heading stands on its own. No small uppercase label floats above an h1 or h2.

## Layout

The shell is a single 1280px container with 16px mobile, 24px tablet and 32px desktop side padding. The header is 64px, sticky, on the page ground with a one-pixel bottom border. The footer is a full-bleed navy field with a 4px hydric accent line.

The home first viewport is a 7/5 split: the display h1 and its actions on the left, the Total Extremadura tank card on the right. Below it, three equal indicators sit on one row from 768px. The catalogue uses one column on mobile, two from 640px and three from 1280px, with 16px gaps. The detail page uses a 1.6/0.75 split from 1024px: chart on the left, technical record and basin comparison on the right; everything stacks below that. The methodology page uses a single readable column plus a 17rem sticky summary from 1024px.

Spacing follows a 4px base. Card interiors are 20px (24px on detail panels); headings get more space above than below. The filter bar is one surface with a 16px internal rhythm, never a collection of floating fields.

## Elevation & Depth

Depth is a hybrid of tonal layering and two soft, offset shadows. The ground is cooler and slightly darker than the cards; the navy footer is the deepest plane. There are no bevels, glows or glass.

### Shadow Vocabulary
- **Surface** (`0 1px 2px rgb(15 23 42 / 0.04), 0 12px 32px -20px rgb(15 23 42 / 0.28)`): the resting shadow of every white card.
- **Lift** (`0 2px 4px rgb(15 23 42 / 0.05), 0 22px 46px -24px rgb(15 23 42 / 0.34)`): the aggregate card and the hover state of a reservoir card.

### Named Rules
**The Lift-Only Rule.** Cards are quiet at rest. Elevation increases only when the surface is the page's focal point or the pointer is over an interactive card.

## Shapes

Cards use a 16px radius; controls use 12px; actions, chips and segmented controls use full pills. The tank uses a 16px radius, its surface is a 14px-wide wave, and progress channels are 8–10px tall with full rounding. Borders are always one pixel and cool. There are no left or right accent stripes, no cut corners, no geometric masks and no decorative diagonals.

## Components

### Buttons
- **Shape:** full pill (9999px), 12px × 20px padding, 14px label.
- **Primary:** Reservoir Blue ground, white text; hover deepens to `#1e40af`; focus is a 2px blue ring with 2px offset.
- **Secondary:** white ground, Cool Line border, Soft Ink text; hover darkens the border and ink. Used when the action is exploratory, never destructive.
- **Icon button:** 36px circle, white ground, one-pixel border; used only for refresh and compact utilities.

### Chips
- **Style:** full pill, 11px text, one-pixel ring, 2px × 8px padding.
- **Basins:** Guadiana is cyan-50/cyan-800; Tajo is blue-50/blue-800. The dot inside is the only filled mark.
- **State:** low level uses amber; direction uses emerald/rose text with an icon, never a full-bleed colored card.

### Cards / Containers
- **Corner Style:** 16px (2xl).
- **Background:** white; the page ground shows between cards.
- **Shadow Strategy:** Surface at rest; Lift on the aggregate and on card hover.
- **Border:** one pixel Cool Line at 80% opacity.
- **Internal Padding:** 20px; 24px on detail and methodology panels.

### Inputs / Fields
- **Style:** 44px tall, Slate Ground fill, 12px radius, one-pixel Cool Line, 14px text.
- **Focus:** white fill, blue border and a 4px blue-600/10 ring.
- **Search:** leading magnifier, trailing clear button; the native cancel control is hidden.
- **Select:** native select with a custom chevron, 44px tall, same focus treatment.

### Navigation
- **Style:** top bar, 14px medium labels, 8px × 14px pills. Active is white with a one-pixel border; idle is transparent with slate text and a white hover.
- **Mobile:** the nav collapses below 1024px; the status pill links to methodology and the primary CTA in the hero carries the catalogue jump.

### Signature: Reservoir Tank
A 144–160px deep vessel. The fill height is the weighted regional percentage; the surface is a slow SVG wave; dashed rules mark 25/50/75%; a dashed white line marks the current level; the filled volume sits in a navy label at the bottom. It is a data visual, not decoration. The same waterline appears as a 10px channel on every reservoir card.

### Signature: Historical Chart
A measured SVG line and area with a 4/12/52-week switch. It uses the real chart width (ResizeObserver) so labels stay 10.5px at every viewport. Hover and arrow keys move a vertical rule, a white-ringed dot and a tooltip; a `<details>` table carries the same series for keyboard and screen-reader access.

### Floating Components: Privacy & PWA
- **Cookie Banner:** Fixed bottom bar (`bg-slate-950/95` with slate border and backdrop blur). Cyan-accented icon and action button (`bg-cyan-500 hover:bg-cyan-400 text-slate-950`). Accessible dialog modal with keyboard trap and focus restoration.
- **Install Prompt (Mobile PWA):** Compact floating bottom card (`max-w-md`), 16px radius, dark slate container, app icon preview, primary install button (`bg-cyan-500`) and subtle dismiss button. Respects standalone mode and session dismissal.

## Do's and Don'ts

### Do:
- **Do** keep the date, volume, capacity and source visible together.
- **Do** use tabular numerals for every measurement and align them to the right.
- **Do** use blue and cyan for water and institutional actions; reserve emerald and rose for weekly direction.
- **Do** let the waterline carry the identity: the tank on the home page, the thin channel on cards.
- **Do** maintain the 16px card radius, 12px control radius and full-pill actions.
- **Do** say when data is stale or a value is missing; never convert a gap to zero.

### Don't:
- **Don't** add a kicker or eyebrow above a heading.
- **Don't** use gradient text, glass, blur as decoration, hard offset shadows or colored side stripes.
- **Don't** introduce a second illustration style, emoji iconography or a decorative map.
- **Don't** use green or red as a brand accent; they only mean rise and fall.
- **Don't** invent reservoir data, forecasts or comparisons the source cannot support.
- **Don't** let the catalogue become a wall of identical icon-and-text cards; the water level is the card's content.
