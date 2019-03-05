import React from 'react'
import { a11ySnapshot } from '../src'

test('can create a11y snapshot from HTML string', async () => {
  const element = '<section><h1>Hello</h1><a href="/world">World</a></section>'

  expect(await a11ySnapshot(element)).toMatchInlineSnapshot(`
"role: WebArea
children:
  -
    role: region
    children:
      -
        role: heading
        name: Hello
        level: 1
        children:
          -
            role: text
            name: Hello
      -
        role: link
        name: World
        children:
          -
            role: text
            name: World
"
`)
})

test('can create a11y snapshot from DOM element', async () => {
  const element = document.createElement('header')
  const heading = document.createElement('h1')
  heading.innerHTML = 'hello header'
  element.appendChild(heading)

  expect(await a11ySnapshot(element)).toMatchInlineSnapshot(`
"role: WebArea
children:
  -
    role: banner
    children:
      -
        role: heading
        name: 'hello header'
        level: 1
        children:
          -
            role: text
            name: 'hello header'
"
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
"role: WebArea
children:
  -
    role: region
    children:
      -
        role: heading
        name: Hello
        level: 1
        children:
          -
            role: text
            name: Hello
      -
        role: link
        name: World
        children:
          -
            role: text
            name: World
"
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
"role: WebArea
children:
  -
    role: heading
    name: Hello
    level: 1
    children:
      -
        role: text
        name: Hello
  -
    role: link
    name: World
    children:
      -
        role: text
        name: World
"
`)
})
