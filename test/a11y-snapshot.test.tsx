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
      "role": "region",
    },
  ],
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
      "role": "banner",
    },
  ],
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
      "role": "region",
    },
  ],
  "role": "WebArea",
}
`)
})

test('should remove generic containers from a11y snapshot', async () => {
  const element = (
    <div>
      <div />
      <div>
        <h1>Hello</h1>
      </div>
      <div>
        <a href="/world">World</a>
      </div>
    </div>
  )

  expect(await a11ySnapshot(element)).toMatchInlineSnapshot(`
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
  "role": "WebArea",
}
`)
})
