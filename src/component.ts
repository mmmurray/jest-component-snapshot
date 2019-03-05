import crypto from 'crypto'
import { unlink, writeFile } from 'fs-extra'
import { join } from 'path'
import { loadPage } from './puppeteer'
import ComponentElement from './types/component-element'

const getHtml = (element: ComponentElement) => {
  let elementHtml = element
  const styles: string[] = []

  return `<!doctype html><html><head><style>${styles.join(
    '\n',
  )}</style></head><body>${elementHtml}</body></html>`
}

const loadComponentIntoPage = async (element: ComponentElement) => {
  const { page, teardown: teardownPage } = await loadPage()

  const html = getHtml(element)
  const id = crypto.randomBytes(20).toString('hex')
  const filePath = join(__dirname, `test-${id}.html`)
  await writeFile(filePath, html)

  await page.goto(`file://${filePath}`)

  const teardown = async () => Promise.all([unlink(filePath), teardownPage()])

  return { page, teardown }
}

export { loadComponentIntoPage }
