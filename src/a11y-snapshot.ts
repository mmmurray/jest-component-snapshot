import { AXNode } from 'puppeteer'
import YAML from 'yamljs'
import { loadComponentIntoPage } from './component'
import ComponentElement from './types/component-element'

const flattenContainers = (nodes: AXNode[]): AXNode[] =>
  nodes.reduce((acc: AXNode[], node: AXNode) => {
    const { role, children = [], name, ...properties } = node
    if (
      role === 'GenericContainer' &&
      Object.keys(properties).length === 0 &&
      !name
    ) {
      return [...acc, ...flattenContainers(children)]
    }

    return [...acc, { ...node, children: flattenContainers(children) }]
  }, [])

const removeEmpty = ({ children, ...node }: AXNode): AXNode => {
  const initialNode: AXNode = {} as any
  const newNode = Object.keys(node).reduce((acc, key) => {
    const value = (node as any)[key]

    return value === '' ? acc : { ...acc, [key]: value }
  }, initialNode)

  return children.length > 0
    ? {
        ...newNode,
        children: children.map(removeEmpty),
      }
    : newNode
}

const a11ySnapshot = async (element: ComponentElement) => {
  const { page, teardown } = await loadComponentIntoPage(element)

  const snapshot = await page.accessibility.snapshot({
    interestingOnly: false,
  })

  await teardown()

  const { children, ...rootNode } = snapshot
  const flattenedNode = { ...rootNode, children: flattenContainers(children) }

  return YAML.stringify(removeEmpty(flattenedNode), Infinity, 2)
}

export { a11ySnapshot }
