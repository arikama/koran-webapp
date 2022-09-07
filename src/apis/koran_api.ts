import type { Surah } from './../types/surah'
import type { SurahInfo } from './../types/surah_info'

export interface KoranApi {
  getSurahInfos: () => Promise<SurahInfo[]>
  getSurah: (surahId: number) => Promise<Surah>
}
