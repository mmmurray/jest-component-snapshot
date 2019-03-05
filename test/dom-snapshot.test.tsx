import { domSnapshot } from '../src'

test('can create DOM snapshot from HTML string', () => {
  const element = '<div><h1>Hello</h1><h2>world</h2></div>'

  expect(domSnapshot(element)).toMatchInlineSnapshot(`
"<div>
  <h1>Hello</h1>
  <h2>world</h2>
</div>"
`)
})

test('can create DOM snapshot from DOM element', async () => {
  const element = document.createElement('header')
  const heading = document.createElement('h1')
  heading.innerHTML = 'hello header'
  element.appendChild(heading)

  expect(domSnapshot(element)).toMatchInlineSnapshot(`
"<header>
  <h1>hello header</h1>
</header>"
`)
})
