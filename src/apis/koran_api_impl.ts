import type { KoranApi } from './koran_api'
import type { SurahInfo } from './../types/surah_info'

export class KoranApiImpl implements KoranApi {
  baseUrl: string

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_BASE_API}`
  }

  async getSurahInfos(): Promise<SurahInfo[]> {
    const response = await fetch(this.baseUrl)
    const json = await response.json()

    return json.data.surah_infos.map((info: {
      surah_id: number
      title: string
      arabic: string
      english: string
      verses: number
      city: string
      juz_start: number
      juz_end: number
    }) => {
      const surahInfo: SurahInfo = {
        surahId: info.surah_id,
        titleEnglish: info.english,
        titleArabic: info.arabic
      }
      return surahInfo
    })
  }
}
