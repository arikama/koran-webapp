import type { Fav } from "../types/fav"

export interface FavApi {
  add: (token: string, surah: number, verse: number) => Promise<Fav[]>
}
