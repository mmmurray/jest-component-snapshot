import puppeteer from 'puppeteer'

const loadPage = async () => {
  const connect = Boolean(process.env.PUPPETEER_WS_ENDPOINT)
  const browser = await (connect
    ? puppeteer.connect({
        browserWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT,
      })
    : puppeteer.launch({
        executablePath: process.env.CHROME_EXECUTABLE_PATH,
        args: (process.env.CHROME_ARGS || '').split(' ').filter(Boolean),
      }))

  const page = await browser.newPage()

  const teardown = async () => {
    await page.close()
    await (connect ? browser.disconnect() : browser.close())
  }

  return { page, teardown }
}

export { loadPage }
