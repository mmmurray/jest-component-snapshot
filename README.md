# jest-component-snapshot 📸

[![Travis](https://img.shields.io/travis/mmmurray/jest-component-snapshot.svg)](https://travis-ci.com/mmmurray/jest-component-snapshot)
[![npm](https://img.shields.io/npm/v/jest-component-snapshot.svg)](https://www.npmjs.com/package/jest-component-snapshot)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Component snapshot testing made easy.

## Install ⚙️

```bash
yarn add -D jest-component-snapshot puppeteer
```

## Usage 🤖

The recommended way to use this library is be adding the following to your Jest config:

```json
{
  "globalSetup": "jest-component-snapshot/setup",
  "globalTeardown": "jest-component-snapshot/teardown",
  "setupFilesAfterEnv": ["jest-component-snapshot/extend-expect"]
}
```

This config is optional - the `globalSetup` and `globalTeardown` functions ensure that the same instance of Puppeteer is shared between tests to improve performance. If you not set these options then a new instance of Puppeteer will be launched for each test.

If you cannot configure `setupFilesAfterEnv` (such as in [create-react-app](https://github.com/facebook/create-react-app)), you can manually extend Jest in your test files using:

```js
import { extendExpect } from 'jest-component-snapshot'

extendExpect()
```

### Image snapshot tests

Creates an image snapshot from a component using [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot). All of the same options are supported.

```js
test('image snapshot from HTML string', () => {
  expect('<h1>Hello world</h1>').toMatchImageSnapshot()
})

test('image snapshot from DOM element', () => {
  const headingElement = document.createElement('h1')
  headingElement.innerHtml = 'Hello world'

  expect(headingElement).toMatchImageSnapshot()
})

test('image snapshot from React element', () => {
  expect(<h1>Hello world</h1>).toMatchImageSnapshot()
})
```

### A11y snapshot tests

Uses Puppeteer to create an [accessibility tree snapshot](https://pptr.dev/#?product=Puppeteer&show=api-class-accessibility). The snapshot is converted to YAML for readability and empty properties and generic containers are removed.

```js
test('a11y snapshot from HTML string', () => {
  expect('<h1>Hello world</h1>').toMatchA11ySnapshot()
})

test('a11y snapshot from DOM element', () => {
  const headingElement = document.createElement('h1')
  headingElement.innerHtml = 'Hello world'

  expect(headingElement).toMatchA11ySnapshot()
})

test('a11y snapshot from React element', () => {
  expect(<h1>Hello world</h1>).toMatchA11ySnapshot()
})
```

### DOM snapshot tests

Snapshots formatted HTML for the given component.

```js
test('DOM snapshot from HTML string', () => {
  expect('<h1>Hello world</h1>').toMatchDomSnapshot()
})

test('DOM snapshot from DOM element', () => {
  const headingElement = document.createElement('h1')
  headingElement.innerHtml = 'Hello world'

  expect(headingElement).toMatchDomSnapshot()
})

test('DOM snapshot from React element', () => {
  expect(<h1>Hello world</h1>).toMatchDomSnapshot()
})
```

## Alternatives 🙌

- [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)
- [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot)
