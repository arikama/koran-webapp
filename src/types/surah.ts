export type Surah = {
  surahId: number
  verses: {
    verseId: number
    text: string
    translation: string
  }[]
}
