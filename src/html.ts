import ComponentElement from './types/component-element'

const getElementHtml = (element: ComponentElement) => {
  return element
}

const getPageHtml = (element: ComponentElement) => {
  const elementHtml = getElementHtml(element)
  const styles: string[] = []

  return `<!doctype html><html><head><style>${styles.join(
    '\n',
  )}</style></head><body>${elementHtml}</body></html>`
}

export { getElementHtml, getPageHtml }
