export interface FavManager {
  add: (surahVerse: string) => Promise<Set<string>>
  remove: (surahVerse: string) => Promise<Set<string>>
  get: () => Promise<Set<string>>
}
