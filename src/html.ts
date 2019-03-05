import ComponentElement from './types/component-element'

const getElementHtml = (element: ComponentElement) => {
  if (typeof element === 'string') {
    return element
  }

  return element.outerHTML
}

const getPageHtml = (element: ComponentElement) => {
  const elementHtml = getElementHtml(element)
  const styles: string[] = []

  return `<!doctype html><html><head><style>${styles.join(
    '\n',
  )}</style></head><body>${elementHtml}</body></html>`
}

export { getElementHtml, getPageHtml }
