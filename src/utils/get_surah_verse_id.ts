export function getSurahVerseId(key: string): { surahId: number, verseId: number, ok: boolean } {
  const result = {
    surahId: -1,
    verseId: -1,
    ok: false
  }

  const arr = key.split(':')

  if (arr.length > 1) {
    const surahId = parseInt(arr[0])
    const verseId = parseInt(arr[1])

    if (surahId > 0 && verseId > 0) {
      result.surahId = surahId
      result.verseId = verseId
      result.ok = true
    }
  }

  return result
}
