import puppeteer from 'puppeteer'

const globalSetup = async () => {
  ;(global as any).browser = await puppeteer.launch({
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
  })
  process.env.PUPPETEER_WS_ENDPOINT = (global as any).browser.wsEndpoint()
}

const globalTeardown = async () => {
  await (global as any).browser.close()
  ;(global as any).browser = null
}

export { globalSetup, globalTeardown }
