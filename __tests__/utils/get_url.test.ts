import { getUrl } from "../../src/utils/getUrl"

describe("getUrl", () => {
  test("constructing full url from given path", () => {
    const tests = [
      {
        base: "https://base",
        path: "/path/base",
        expected: "https://base/path/base"
      },
      {
        base: "https://base",
        path: "path/base",
        expected: "https://base/path/base"
      },
      {
        base: "https://base/",
        path: "/path/base",
        expected: "https://base/path/base"
      },
      {
        base: "https://base/",
        path: "/",
        expected: "https://base/"
      }
    ]
    tests.forEach(test => {
      process.env.NEXT_PUBLIC_BASE_API = test.base
      expect(getUrl(test.path)).toEqual(test.expected)
    })
  })
})
