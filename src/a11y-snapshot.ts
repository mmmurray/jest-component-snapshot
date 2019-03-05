import { AXNode } from 'puppeteer'
import { loadComponentIntoPage } from './component'
import ComponentElement from './types/component-element'

const flattenContainers = (nodes: AXNode[]) =>
  nodes.reduce((acc: AXNode[], node: AXNode) => {
    const { role, children = [], name, ...properties } = node
    if (
      role === 'GenericContainer' &&
      Object.keys(properties).length === 0 &&
      !name
    ) {
      return [...acc, ...children]
    }

    return [...acc, node]
  }, [])

const removeEmpty = ({ children = [], ...node }: AXNode): AXNode => {
  const newNode = Object.keys(node).reduce(
    (acc, key) => {
      const value = (node as any)[key]

      return value === '' ? acc : { ...acc, [key]: value }
    },
    {} as AXNode,
  )

  const flattenedChildren = flattenContainers(children)

  return flattenedChildren.length > 0
    ? {
        ...newNode,
        children: flattenedChildren.map(removeEmpty),
      }
    : newNode
}

const a11ySnapshot = async (element: ComponentElement) => {
  const { page, teardown } = await loadComponentIntoPage(element)

  const snapshot = await page.accessibility.snapshot({
    interestingOnly: false,
  })

  await teardown()

  return removeEmpty(snapshot)
}

export { a11ySnapshot }
