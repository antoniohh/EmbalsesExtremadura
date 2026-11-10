import { chromium } from 'playwright-core'

const base = process.env.BASE_URL ?? 'http://127.0.0.1:4321'
const outDir = process.env.OUT_DIR ?? '.impeccable/review'

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

async function capture(name, path, viewport, fullPage = true) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    locale: 'es-ES',
  })
  const page = await context.newPage()
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('status of 404')) errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(700)
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    height: document.body.scrollHeight,
  }))
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage })
  console.log(`captured ${name} ${viewport.width}x${viewport.height} page=${metrics.height}px overflow=${metrics.scrollWidth > metrics.innerWidth}`)
  if (errors.length) console.log(`ERRORS ${name}:`, errors.slice(0, 5))
  await context.close()
}

await capture('desktop', '/', { width: 1440, height: 1000 })
await capture('mobile', '/', { width: 390, height: 844 })
await capture('user-320', '/', { width: 320, height: 900 })
await capture('detail-desktop', '/embalse/la-serena/', { width: 1440, height: 1000 })
await capture('detail-mobile', '/embalse/la-serena/', { width: 390, height: 844 })
await capture('cookies', '/cookies/', { width: 1440, height: 1000 })

await browser.close()
