import type { VerseId } from "../types/verse_id"

export function getSurahVerseId(key: string): VerseId {
  const result = {
    surah: 0,
    verse: 0,
  }
  const arr = key.split(':')
  if (arr.length > 1) {
    const surahId = parseInt(arr[0])
    const verseId = parseInt(arr[1])
    if (surahId > 0 && verseId > 0) {
      result.surah = surahId
      result.verse = verseId
    }
  }
  return result
}
