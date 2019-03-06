import React from 'react'
import { extendExpect } from '../src'
import 'jest-component-snapshot'

extendExpect()

test('can use toMatchImageSnapshot with HTML string', async () => {
  await expect(
    '<header><h1>Hello</h1><h2>World</h2></header>',
  ).toMatchImageSnapshot()
})

test('can use toMatchImageSnapshot with DOM element', async () => {
  const element = document.createElement('h1')
  element.innerHTML = 'Hello'

  await expect(element).toMatchImageSnapshot()
})

test('can use toMatchImageSnapshot with React element', async () => {
  await expect(
    <header>
      <h1>Hello</h1>
      <h2>World</h2>
    </header>,
  ).toMatchImageSnapshot()
})
