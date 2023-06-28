import type { KoranApi } from './koran_api'
import type { Surah } from './../types/surah'
import type { SurahInfo } from './../types/surah_info'
import type { Verse } from './../types/verse'
import { getUrl } from '../utils/getUrl'

export class KoranApiImpl implements KoranApi {
  async getSurahInfos(): Promise<SurahInfo[]> {
    const response = await fetch(getUrl("/"))
    type Json = {
      data: {
        surah_infos: {
          surah_id: number
          title: string
          arabic: string
          english: string
          verses: number
          city: string
          juz_start: number
          juz_end: number
        }[]
      }
    }
    const json: Json = await response.json()
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

  async getSurah(surahId: number): Promise<Surah> {
    const response = await fetch(getUrl(`/surah/${surahId}`))
    type Json = {
      data: {
        surah: {
          surah_info: {
            surah_id: number
            title: string
            arabic: string
            english: string
            verses: number
            city: string
            juz_start: number
            juz_end: number
          },
          verses: {
            surah_id: number
            verse_id: number
            text: string
            translations: {
              pickthall: string
              clearquran: string
            }
          }[]
        }
      }
    }
    const json: Json = await response.json()
    const surah: Surah = {
      surahId: json.data.surah.surah_info.surah_id,
      englishName: json.data.surah.surah_info.english,
      arabicName: json.data.surah.surah_info.arabic,
      verses: json.data.surah.verses.map(surah => {
        return {
          verseId: surah.verse_id,
          text: surah.text,
          translation: surah.translations.clearquran
        }
      })
    }
    return surah
  }

  async getVerse(surahId: number, verseId: number): Promise<Verse> {
    const response = await fetch(getUrl(`/surah/${surahId}/verse/${verseId}`), {
      method: 'GET'
    })
    const json = await response.json()
    const verse: Verse = {
      key: `${surahId}:${verseId}`,
      verse: json.data.verse,
      translation: json.data.translations.clearquran
    }
    return verse
  }
}
