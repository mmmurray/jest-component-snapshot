import {
  MatchImageSnapshotOptions,
  toMatchImageSnapshot as toMatchImageSnapshotBase,
} from 'jest-image-snapshot'
import { toMatchSnapshot } from 'jest-snapshot'
import { a11ySnapshot, domSnapshot, imageSnapshot } from '.'
import ComponentElement from './types/component-element'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchA11ySnapshot(): R
      toMatchDomSnapshot(): R
      toMatchImageSnapshot(options: MatchImageSnapshotOptions): R
    }
  }
}

const extendExpect = () => {
  expect.extend({
    async toMatchA11ySnapshot(received: ComponentElement) {
      return toMatchSnapshot.call(
        this as any,
        await a11ySnapshot(received),
        'toMatchA11ySnapshot',
      )
    },
  })

  expect.extend({
    async toMatchDomSnapshot(received: ComponentElement) {
      return toMatchSnapshot.call(
        this as any,
        await domSnapshot(received),
        'toMatchDomSnapshot',
      )
    },
  })

  expect.extend({
    async toMatchImageSnapshot(
      received: ComponentElement,
      options: MatchImageSnapshotOptions,
    ) {
      return (toMatchImageSnapshotBase as any).call(
        this as any,
        await imageSnapshot(received),
        options,
      )
    },
  })
}

export { extendExpect }
