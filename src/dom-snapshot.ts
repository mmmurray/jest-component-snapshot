import pretty from 'pretty'
import { getElementHtml } from './html'
import ComponentElement from './types/component-element'

const domSnapshot = (element: ComponentElement) => {
  const html = getElementHtml(element)

  return pretty(html)
}

export { domSnapshot }
