import { STORAGE } from "../constants/storage"

import type { SurahSettings } from "../types/surah_settings"

export function getSurahSettings(): SurahSettings {
  const fallback = {
    hideVerse: false,
    hideTranslation: false
  }
  try {
    const blob = window.localStorage.getItem(STORAGE.SURAH_SETTINGS_STORAGE_KEY)
    if (blob) {
      return JSON.parse(blob) as SurahSettings
    }
    return fallback
  } catch (ignored) {
    return fallback
  }
}
