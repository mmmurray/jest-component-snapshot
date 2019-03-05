import { a11ySnapshot } from "../src";

test("can create a11y snapshot from HTML string", async () => {
  const html = '<section><h1>Hello</h1><a href="/world">World</a></section>';

  expect(await a11ySnapshot(html)).toMatchInlineSnapshot(`
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
`);
});
