module.exports = {
  transformJestConfig: config => ({
    ...config,
    collectCoverageFrom: [
      'src/**/*',
      '!src/global-hooks.ts',
      '!src/html.ts',
      '!src/puppeteer.ts',
    ],
  }),
}
