import { a11ySnapshot } from "../src";

test("can create a11y snapshot from HTML string", async () => {
  const html = '<section><h1>Hello</h1><a href="/world">World</a></section>';

  expect(await a11ySnapshot(html)).toMatchInlineSnapshot(`
Object {
  "foo": "bar",
}
`);
});
