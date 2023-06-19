import type { Fav } from "../types/fav"

export interface FavApi {
  add: (surah: number, verse: number) => Promise<Fav[]>
  remove: (id: number) => Promise<Fav[]>
  list: () => Promise<Fav[]>
}
