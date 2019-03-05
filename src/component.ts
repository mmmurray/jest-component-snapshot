import { writeFile } from 'fs-extra'
import tmp from 'tmp-promise'
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
  const { path, cleanup } = await tmp.file({ postfix: '.html' })
  await writeFile(path, getHtml(element))

  await page.goto(`file://${path}`)

  const teardown = async () => Promise.all([cleanup(), teardownPage()])

  return { page, teardown }
}

export { loadComponentIntoPage }
