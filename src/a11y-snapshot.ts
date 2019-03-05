import { loadComponentIntoPage } from './component'
import ComponentElement from './types/component-element'

const a11ySnapshot = async (element: ComponentElement) => {
  const { page, teardown } = await loadComponentIntoPage(element)

  const snapshot = await page.accessibility.snapshot({
    interestingOnly: false,
  })

  await teardown()

  return snapshot
}

export { a11ySnapshot }
