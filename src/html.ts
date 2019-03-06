import ComponentElement from './types/component-element'

const getReact = () => {
  try {
    return {
      React: require('react'),
      ReactDOMServer: require('react-dom/server'),
    }
  } catch {
    return {}
  }
}

const getElementHtml = (element: ComponentElement): string => {
  if (typeof element === 'string') {
    return element
  }

  if (element instanceof HTMLElement) {
    return element.outerHTML
  }

  const { React, ReactDOMServer } = getReact()

  if (React && ReactDOMServer && React.isValidElement(element)) {
    return ReactDOMServer.renderToStaticMarkup(element)
  }

  return ''
}

const getPageHtml = (element: ComponentElement) => {
  const elementHtml = getElementHtml(element)

  const styles = Array.from(document.querySelectorAll('style')).map(
    styleElement => styleElement.innerHTML,
  )

  return `<!doctype html><html><head><style>${styles.join(
    '\n',
  )}</style></head><body>${elementHtml}</body></html>`
}

export { getElementHtml, getPageHtml }
