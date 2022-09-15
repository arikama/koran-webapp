import { useEffect, useState } from "react"

import { USER_SETTINGS_STORAGE_KEY } from "../constants/storage"
import { UserSettings } from "../types/user_settings"

export function useUserSettings() {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    hideVerse: true,
    hideTranslation: true
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const blob = window.localStorage.getItem(USER_SETTINGS_STORAGE_KEY)
      if (blob) {
        const parsed = JSON.parse(blob) as UserSettings
        if (parsed) {
          setUserSettings(parsed)
        }
      }
    }
  }, [])

  const updateUserSettings = (user: UserSettings) => {
    if (typeof window !== "undefined") {
      const blob = JSON.stringify(user)
      window.localStorage.setItem(USER_SETTINGS_STORAGE_KEY, blob)
    }
    setUserSettings(user)
  }

  return { userSettings, updateUserSettings }
}
