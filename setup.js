const puppeteer = require('puppeteer')

module.exports = async () => {
  global.browser = await puppeteer.launch()
  process.env.PUPPETEER_WS_ENDPOINT = global.browser.wsEndpoint()
}
