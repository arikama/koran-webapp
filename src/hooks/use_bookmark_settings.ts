import { useEffect, useState } from "react"

import { STORAGE } from "../constants/storage"

import type { BookmarkSettings } from "../types/bookmark_settings"

export function useBookmarkSettings() {
  const [bookmarkSettings, setBookmarkSettings] = useState<BookmarkSettings>({
    hideVerse: false,
    hideTranslation: false
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const blob = window.localStorage.getItem(STORAGE.BOOKMARK_SETTINGS_STORAGE_KEY)
      if (blob) {
        const parsed = JSON.parse(blob) as BookmarkSettings
        if (parsed) {
          setBookmarkSettings(parsed)
        }
      }
    }
  }, [])

  const updateBookmarkSettings = (update: BookmarkSettings) => {
    if (typeof window !== "undefined") {
      const blob = JSON.stringify(update)
      window.localStorage.setItem(STORAGE.BOOKMARK_SETTINGS_STORAGE_KEY, blob)
    }
    setBookmarkSettings(update)
  }

  return { bookmarkSettings, updateBookmarkSettings }
}
