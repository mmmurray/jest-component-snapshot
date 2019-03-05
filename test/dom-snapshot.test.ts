import { domSnapshot } from '../src'

test('can snapshot DOM HTML', () => {
  const html = '<div><h1>Hello</h1><h2>world</h2></div>'

  expect(domSnapshot(html)).toMatchInlineSnapshot(`
"<div>
  <h1>Hello</h1>
  <h2>world</h2>
</div>"
`)
})
