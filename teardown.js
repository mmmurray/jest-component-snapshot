module.exports = async () => {
  await global.browser.close()
  global.browser = null
}
