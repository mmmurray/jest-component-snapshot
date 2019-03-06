import styled from '@emotion/styled'
import React from 'react'
import { extendExpect } from '../src'
import 'jest-component-snapshot'

extendExpect()

const stringToDomElement = html => {
  const div = document.createElement('div')
  div.innerHTML = html

  return div.firstChild
}

const StyledHeader = styled.header`
  padding: 12px;
  border-radius: 4px;
  background-color: lime;
  font-family: sans-serif;
`

const htmlStringElement = '<header><h1>Hello</h1><h2>World</h2></header>'
const domElement = stringToDomElement(htmlStringElement)
const reactElement = (
  <StyledHeader>
    <h1>Hello</h1>
    <h2>World</h2>
  </StyledHeader>
)

test('can use toMatchA11ySnapshot with HTML string', async () => {
  await expect(htmlStringElement).toMatchA11ySnapshot()
})

test('can use toMatchA11ySnapshot with DOM element', async () => {
  await expect(domElement).toMatchA11ySnapshot()
})

test('can use toMatchA11ySnapshot with React element', async () => {
  await expect(reactElement).toMatchA11ySnapshot()
})

test('can use toMatchDomSnapshot with HTML string', async () => {
  await expect(htmlStringElement).toMatchDomSnapshot()
})

test('can use toMatchDomSnapshot with DOM element', async () => {
  await expect(domElement).toMatchDomSnapshot()
})

test('can use toMatchDomSnapshot with React element', async () => {
  await expect(reactElement).toMatchDomSnapshot()
})

test('can use toMatchImageSnapshot with HTML string', async () => {
  await expect(htmlStringElement).toMatchImageSnapshot()
})

test('can use toMatchImageSnapshot with DOM element', async () => {
  await expect(domElement).toMatchImageSnapshot()
})

test('can use toMatchImageSnapshot with React element', async () => {
  await expect(reactElement).toMatchImageSnapshot()
})
