export type Surah = {
  surahId: number,
  englishName: string,
  arabicName: string
  verses: {
    verseId: number
    text: string
    translation: string
  }[]
}
