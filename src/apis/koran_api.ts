import type { Surah } from './../types/surah'
import type { SurahInfo } from './../types/surah_info'
import type { Verse } from './../types/verse'

export interface KoranApi {
  getSurahInfos: () => Promise<SurahInfo[]>
  getSurah: (surahId: number) => Promise<Surah>
  getVerse: (surahId: number, verseId: number) => Promise<Verse>
}
