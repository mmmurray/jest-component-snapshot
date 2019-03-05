import React from 'react'
import { a11ySnapshot } from '../src'

test('can create a11y snapshot from HTML string', async () => {
  const element = '<section><h1>Hello</h1><a href="/world">World</a></section>'

  expect(await a11ySnapshot(element)).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "children": Array [
        Object {
          "children": Array [
            Object {
              "name": "Hello",
              "role": "text",
            },
          ],
          "level": 1,
          "name": "Hello",
          "role": "heading",
        },
        Object {
          "children": Array [
            Object {
              "name": "World",
              "role": "text",
            },
          ],
          "name": "World",
          "role": "link",
        },
      ],
      "name": "",
      "role": "region",
    },
  ],
  "name": "",
  "role": "WebArea",
}
`)
})

test('can create a11y snapshot from DOM element', async () => {
  const element = document.createElement('header')
  const heading = document.createElement('h1')
  heading.innerHTML = 'hello header'
  element.appendChild(heading)

  expect(await a11ySnapshot(element)).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "children": Array [
        Object {
          "children": Array [
            Object {
              "name": "hello header",
              "role": "text",
            },
          ],
          "level": 1,
          "name": "hello header",
          "role": "heading",
        },
      ],
      "name": "",
      "role": "banner",
    },
  ],
  "name": "",
  "role": "WebArea",
}
`)
})

test('can create a11y snapshot from React element', async () => {
  const element = (
    <section>
      <h1>Hello</h1>
      <a href="/world">World</a>
    </section>
  )

  expect(await a11ySnapshot(element)).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "children": Array [
        Object {
          "children": Array [
            Object {
              "name": "Hello",
              "role": "text",
            },
          ],
          "level": 1,
          "name": "Hello",
          "role": "heading",
        },
        Object {
          "children": Array [
            Object {
              "name": "World",
              "role": "text",
            },
          ],
          "name": "World",
          "role": "link",
        },
      ],
      "name": "",
      "role": "region",
    },
  ],
  "name": "",
  "role": "WebArea",
}
`)
})
