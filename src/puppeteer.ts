import puppeteer from 'puppeteer'

const loadPage = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const teardown = async () => {
    await page.close()
    await browser.disconnect()
  }

  return { page, teardown }
}

export { loadPage }