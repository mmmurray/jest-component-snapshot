import { writeFile } from 'fs-extra'
import tmp from 'tmp-promise'
import { getPageHtml } from './html'
import { loadPage } from './puppeteer'
import ComponentElement from './types/component-element'

const loadComponentIntoPage = async (element: ComponentElement) => {
  const { page, teardown: teardownPage } = await loadPage()
  const { path, cleanup } = await tmp.file({ postfix: '.html' })
  await writeFile(path, getPageHtml(element))

  await page.goto(`file://${path}`)

  const teardown = async () => Promise.all([cleanup(), teardownPage()])

  return { page, teardown }
}

export { loadComponentIntoPage }
