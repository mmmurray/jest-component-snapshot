import { toMatchImageSnapshot as toMatchImageSnapshotBase } from 'jest-image-snapshot'
import { toMatchSnapshot } from 'jest-snapshot'
import { a11ySnapshot, domSnapshot, imageSnapshot } from '.'

const extendExpect = () => {
  expect.extend({
    async toMatchA11ySnapshot(received) {
      return toMatchSnapshot.call(
        this,
        await a11ySnapshot(received),
        'toMatchA11ySnapshot',
      )
    },
  })

  expect.extend({
    async toMatchDomSnapshot(received) {
      return toMatchSnapshot.call(
        this,
        await domSnapshot(received),
        'toMatchDomSnapshot',
      )
    },
  })

  expect.extend({
    async toMatchImageSnapshot(received) {
      return toMatchImageSnapshotBase.call(
        this,
        await imageSnapshot(received),
        'toMatchImageSnapshot',
      )
    },
  })
}

export { extendExpect }
