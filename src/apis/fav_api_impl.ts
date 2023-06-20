import type { Fav } from "../types/fav"
import type { FavApi } from './fav_api'
import { getUrl } from '../utils/getUrl'

export class FavApiImpl implements FavApi {
  private token: string

  constructor(token: string) {
    this.token = token
  }

  async add(surah: number, verse: number): Promise<Fav[]> {
    const response = await fetch(getUrl("/fav"), {
      method: 'POST',
      body: JSON.stringify({
        surah,
        verse
      }),
      headers: {
        'x-access-token': this.token,
      }
    })

    return this.toFavs(response)
  }

  async remove(id: number): Promise<Fav[]> {
    const response = await fetch(getUrl("/fav/remove"), {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'x-access-token': this.token,
      }
    })

    return this.toFavs(response)
  }

  async list(): Promise<Fav[]> {
    const response = await fetch(getUrl("/fav"), {
      method: 'GET',
      headers: {
        'x-access-token': this.token,
      }
    })

    return this.toFavs(response)
  }

  private async toFavs(response: Response): Promise<Fav[]> {
    if (response.status != 200) {
      return []
    }

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
