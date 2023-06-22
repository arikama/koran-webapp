import { sortFavs } from "../../src/utils/sort_favs"

import type { VerseId } from "../../src/types/verse_id"

describe("sortFavs", () => {
  test("sorting unsorted favs", () => {
    const ids: VerseId[] = [
      {
        surah: 1,
        verse: 11
      },
      {
        surah: 1,
        verse: 1
      },
      {
        surah: 2,
        verse: 1
      },
      {
        surah: 2,
        verse: 2
      }
    ]

    ids.sort(sortFavs)

    expect(ids[0]).toEqual({ surah: 1, verse: 1 })
    expect(ids[1]).toEqual({ surah: 1, verse: 11 })
    expect(ids[2]).toEqual({ surah: 2, verse: 1 })
    expect(ids[3]).toEqual({ surah: 2, verse: 2 })
  })
})
