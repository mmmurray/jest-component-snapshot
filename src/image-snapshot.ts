import { loadComponentIntoPage } from './component'
import ComponentElement from './types/component-element'

const imageSnapshot = async (element: ComponentElement) => {
  const { page, teardown } = await loadComponentIntoPage(element)

  const snapshot = await page.screenshot()

  await teardown()

  return snapshot
}

export { imageSnapshot }
