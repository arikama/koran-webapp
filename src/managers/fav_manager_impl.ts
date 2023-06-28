import { FavApi } from "../apis/fav_api"
import { getSurahVerseId } from "../utils/get_surah_verse_id"

import type { Fav } from "../types/fav"
import type { FavManager } from "./fav_manager"

export class FavManagerImpl implements FavManager {
  private favApi: FavApi

  constructor(favApi: FavApi) {
    this.favApi = favApi
  }

  async add(surahVerse: string): Promise<Set<string>> {
    const parsed = getSurahVerseId(surahVerse)
    const favs = await this.favApi.add(parsed.surah, parsed.verse)
    return Promise.resolve(this.toKeys(favs))
  }

  async remove(surahVerse: string): Promise<Set<string>> {
    const parsed = getSurahVerseId(surahVerse)
    const favs = await this.favApi.list()
    for (let i = 0; i < favs.length; i++) {
      if (favs[i].surah == parsed.surah && favs[i].verse == parsed.verse) {
        await this.favApi.remove(favs[i].id)
      }
    }
    const removed = await this.favApi.list()
    return Promise.resolve(this.toKeys(removed))
  }

  async get(): Promise<Set<string>> {
    const favs = await this.favApi.list()
    return Promise.resolve(this.toKeys(favs))
  }

  private toKeys(favs: Fav[]): Set<string> {
    const list = favs.map(item => {
      return `${item.surah}:${item.verse}`
    })
    return new Set(list)
  }
}
