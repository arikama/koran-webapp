import type { SurahInfo } from './../types/surah_info'

export interface KoranApi {
  getSurahInfos: () => Promise<SurahInfo[]>
}
