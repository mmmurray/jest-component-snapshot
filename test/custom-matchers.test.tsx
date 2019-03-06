import React from 'react'
import { extendExpect } from '../src'
import 'jest-component-snapshot'

extendExpect()

test('can use toMatchA11ySnapshot with HTML string', async () => {
  await expect(
    '<header><h1>Hello</h1><h2>World</h2></header>',
  ).toMatchA11ySnapshot()
})

test('can use toMatchA11ySnapshot with DOM element', async () => {
  const element = document.createElement('h1')
  element.innerHTML = 'Hello'

  await expect(element).toMatchA11ySnapshot()
})

test('can use toMatchA11ySnapshot with React element', async () => {
  await expect(
    <header>
      <h1>Hello</h1>
      <h2>World</h2>
    </header>,
  ).toMatchA11ySnapshot()
})

test('can use toMatchDomSnapshot with HTML string', async () => {
  await expect(
    '<header><h1>Hello</h1><h2>World</h2></header>',
  ).toMatchDomSnapshot()
})

test('can use toMatchDomSnapshot with DOM element', async () => {
  const element = document.createElement('h1')
  element.innerHTML = 'Hello'

  await expect(element).toMatchDomSnapshot()
})

test('can use toMatchDomSnapshot with React element', async () => {
  await expect(
    <header>
      <h1>Hello</h1>
      <h2>World</h2>
    </header>,
  ).toMatchDomSnapshot()
})
