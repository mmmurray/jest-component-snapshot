// @ts-ignore
import { toMatchImageSnapshot as toMatchImageSnapshotBase } from 'jest-image-snapshot'
// @ts-ignore
import { toMatchSnapshot } from 'jest-snapshot'
import { a11ySnapshot, domSnapshot, imageSnapshot } from '.'
import ComponentElement from './types/component-element'

const extendExpect = () => {
  // @ts-ignore
  expect.extend({
    async toMatchA11ySnapshot(received: ComponentElement) {
      return toMatchSnapshot.call(
        this,
        await a11ySnapshot(received),
        'toMatchA11ySnapshot',
      )
    },
  })

  // @ts-ignore
  expect.extend({
    async toMatchDomSnapshot(received: ComponentElement) {
      return toMatchSnapshot.call(
        this,
        await domSnapshot(received),
        'toMatchDomSnapshot',
      )
    },
  })

  // @ts-ignore
  expect.extend({
    async toMatchImageSnapshot(received: ComponentElement, options: any) {
      return toMatchImageSnapshotBase.call(
        this,
        await imageSnapshot(received),
        options,
      )
    },
  })
}

export { extendExpect }
