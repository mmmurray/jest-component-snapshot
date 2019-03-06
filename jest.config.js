module.exports = {
  ...require('mmm-scripts/jest.config'),
  collectCoverageFrom: [
    'src/**/*',
    '!src/global-hooks.ts',
    '!src/html.ts',
    '!src/puppeteer.ts',
  ],
}
