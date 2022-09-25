import { getSurahShortcuts } from "../../src/utils/get_surah_shortcuts"

describe("getSurahShortcuts", () => {
  test("shortcuts", () => {
    const actual = getSurahShortcuts(286)
    expect(actual).toEqual([72, 143, 215, 286])
  })

  test("short surah", () => {
    const actual = getSurahShortcuts(3)
    expect(actual).toEqual([1, 2, 3])
  })

  test("zero size", () => {
    const actual = getSurahShortcuts(0)
    expect(actual).toEqual([])
  })

  test("size one", () => {
    const actual = getSurahShortcuts(1)
    expect(actual).toEqual([1])
  })

  test("size two", () => {
    const actual = getSurahShortcuts(2)
    expect(actual).toEqual([1, 2])
  })
})
