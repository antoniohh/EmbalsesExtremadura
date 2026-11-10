import { chromium } from 'playwright-core'

const base = process.env.BASE_URL ?? 'http://127.0.0.1:4321'
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const results = []
function check(name, condition, detail = '') {
  results.push({ name, ok: Boolean(condition), detail })
  console.log(`${condition ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`)
}

// 1. HTML without JavaScript: the SEO baseline.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' })
  check('no-js h1', (await page.locator('main h1').innerText()).includes('Estado de los Embalses en Extremadura'))
  check('no-js 42 card links', (await page.locator('a[href^="/embalse/"]').count()) === 42, String(await page.locator('a[href^="/embalse/"]').count()))
  check('no-js detail links', (await page.locator('a[href="/embalse/la-serena/"]').count()) >= 1)
  check('no-js faq', (await page.locator('#preguntas-frecuentes details').count()) === 5)
  check('no-js quiz first question', (await page.getByText('¿Qué embalse tiene la mayor capacidad de Extremadura?').count()) >= 1)
  await page.goto(`${base}/embalse/la-serena/`, { waitUntil: 'domcontentloaded' })
  check('no-js detail h1', (await page.locator('main h1').innerText()).includes('La Serena'))
  check('no-js detail jsonld', (await page.locator('script[type="application/ld+json"]').count()) >= 1)
  await context.close()
}

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'es-ES' })
const page = await context.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
page.on('console', (message) => {
  if (message.type() === 'error' && !message.text().includes('status of 404')) errors.push(message.text())
})

await page.goto(`${base}/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
check('home title', (await page.title()).includes('Estado de los Embalses en Extremadura'))
check('home canonical', (await page.locator('link[rel=canonical]').getAttribute('href')) === 'https://embalses.antoniohorrillo.com/')
check('home jsonld', (await page.locator('script[type="application/ld+json"]').count()) >= 1)
check('home 42 cards', (await page.locator('#embalses article').count()) === 42, String(await page.locator('#embalses article').count()))

const search = page.getByLabel('Buscar embalse')
await search.fill('serena')
await page.waitForTimeout(700)
check('search hydrates', (await page.locator('#embalses article').count()) === 1)
check('search url', page.url().includes('q=serena'))
await page.getByRole('button', { name: 'Limpiar filtros' }).first().click()
await page.waitForTimeout(500)
check('clear filters', (await page.locator('#embalses article').count()) === 42)

await page.getByRole('button', { name: 'Badajoz', exact: true }).click()
await page.waitForTimeout(500)
check('province Badajoz', (await page.locator('#embalses article').count()) === 23, String(await page.locator('#embalses article').count()))
await page.getByRole('button', { name: 'Limpiar filtros' }).first().click()
await page.waitForTimeout(400)

await page.getByLabel('Ordenar por').selectOption('llenado')
await page.waitForTimeout(500)
const first = await page.locator('#embalses article h3').first().innerText()
check('sort by fill', first === 'Montijo', first)

check('faq count', (await page.locator('#preguntas-frecuentes details').count()) === 5)
check('faq schema', (await page.locator('script[type="application/ld+json"]').first().textContent()).includes('FAQPage'))
check('context section', (await page.locator('#contexto-agua').count()) === 1)

await page.locator('#reto').scrollIntoViewIfNeeded()
await page.waitForTimeout(900)
check('quiz hydrated', (await page.getByText('Pregunta 1 de 5').count()) === 1)
const quizOptions = page.locator('#reto [role=group] button')
check('quiz options', (await quizOptions.count()) === 4, String(await quizOptions.count()))
await quizOptions.filter({ hasText: 'La Serena' }).click()
await page.waitForTimeout(250)
check('quiz correct feedback', (await page.locator('#reto [aria-live=polite]').innerText()).includes('¡Correcto!'))
await page.getByRole('button', { name: 'Siguiente pregunta' }).click()
await page.waitForTimeout(250)
check('quiz next question', (await page.getByText('Pregunta 2 de 5').count()) === 1)

await page.goto(`${base}/embalse/la-serena/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
check('detail title', (await page.title()).includes('Embalse de La Serena'))
check('detail canonical', (await page.locator('link[rel=canonical]').getAttribute('href')) === 'https://embalses.antoniohorrillo.com/embalse/la-serena/')
check('detail jsonld', (await page.locator('script[type="application/ld+json"]').count()) >= 1)
check('detail h1', (await page.locator('main h1').innerText()).includes('La Serena'))
check('detail live reading', (await page.getByText('Última lectura').count()) >= 1)
check('chart default', (await page.getByRole('button', { name: '4 sem' }).getAttribute('aria-pressed')) === 'true')
const before = await page.getByText(/semanas con dato/).first().innerText()
await page.getByRole('button', { name: '12 sem' }).click()
await page.waitForTimeout(400)
const after = await page.getByText(/semanas con dato/).first().innerText()
check('chart range changes', before !== after, `${before} -> ${after}`)
await page.getByText('Ver los datos de la serie').click()
await page.waitForTimeout(200)
check('chart table rows', (await page.locator('details table tbody tr').count()) === 12, String(await page.locator('details table tbody tr').count()))

check('cookie banner exists', (await page.locator('#cookie-banner').count()) === 1)
check('cookie modal exists', (await page.locator('#cookie-modal').count()) === 1)
check('pwa install banner exists', (await page.locator('#pwa-install-banner').count()) === 1)
check('gtm script loaded', (await page.locator('script[src*="googletagmanager.com/gtm.js"]').count()) >= 1)
check('geo region meta tag', (await page.locator('meta[name="geo.region"]').getAttribute('content')) === 'ES-EX')

await page.goto(`${base}/cookies/`, { waitUntil: 'networkidle' })
check('cookies page h1', (await page.locator('main h1').innerText()).includes('Política de Cookies'))
check('cookies page open modal button', (await page.locator('[data-cookie-open-modal]').count()) >= 1)

await page.goto(`${base}/metodologia/`, { waitUntil: 'networkidle' })
check('methodology h1', (await page.locator('main h1').innerText()).includes('Metodología y fuentes'))
check('methodology jsonld', (await page.locator('script[type="application/ld+json"]').count()) >= 1)

await page.goto(`${base}/404.html`, { waitUntil: 'domcontentloaded' })
check('404 page', (await page.locator('main h1').innerText()).includes('Esta página no existe'))

check('no console errors', errors.length === 0, errors.slice(0, 3).join(' | '))
await context.close()

// 2. Overflow checks.
for (const width of [320, 390, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, locale: 'es-ES' })
  const p = await ctx.newPage()
  await p.goto(`${base}/`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(300)
  const metrics = await p.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }))
  check(`no overflow ${width}`, metrics.scrollWidth <= metrics.innerWidth, JSON.stringify(metrics))
  await ctx.close()
}

await browser.close()

const failed = results.filter((result) => !result.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) process.exitCode = 1
