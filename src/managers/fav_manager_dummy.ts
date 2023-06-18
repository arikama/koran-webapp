import type { FavManager } from "./fav_manager"

const store: Set<string> = new Set()

export class FavManagerDummy implements FavManager {
  async add(surahVerse: string): Promise<Set<string>> {
    store.add(surahVerse)

    return Promise.resolve(new Set(store))
  }

  async remove(surahVerse: string): Promise<Set<string>> {
    if (store.has(surahVerse)) {
      store.delete(surahVerse)
    }

    return Promise.resolve(new Set(store))
  }

  async get(): Promise<Set<string>> {
    return Promise.resolve(new Set(store))
  }
}
