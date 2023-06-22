import type { VerseId } from "../types/verse_id"

export function sortFavs(a: VerseId, b: VerseId) {
  if (a.surah == b.surah) {
    return a.verse - b.verse
  } else {
    return a.surah - b.surah
  }
}
