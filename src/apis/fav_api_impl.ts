import type { Fav } from "../types/fav"
import type { FavApi } from './fav_api'
import { getUrl } from '../utils/getUrl'

export class FavApiImpl implements FavApi {
  async add(token: string, surah: number, verse: number): Promise<Fav[]> {
    const response = await fetch(getUrl("/fav"), {
      method: 'POST',
      body: JSON.stringify({
        surah,
        verse
      }),
      headers: {
        'x-access-token': token,
      }
    })

    type Json = {
      data: {
        favorites: {
          id: number
          surah: number
          verse: number
        }[]
      }
    }

    const json: Json = await response.json()

    return json.data.favorites.map((favorite: {
      id: number
      surah: number
      verse: number
    }) => {
      const fav: Fav = {
        id: favorite.id,
        surah: favorite.surah,
        verse: favorite.verse
      }
      return fav
    })
  }
}
