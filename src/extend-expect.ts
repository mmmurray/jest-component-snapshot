import { toMatchSnapshot } from 'jest-snapshot'
import { a11ySnapshot, domSnapshot } from '.'

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
}

export { extendExpect }
