import { getSurahSettings } from "../../src/utils/get_surah_settings"

describe("getSurahSettings", () => {
  test("local storage not set", () => {
    const surahSettings = getSurahSettings()

    expect(surahSettings.hideVerse).toBe(false)
    expect(surahSettings.hideTranslation).toBe(false)
  })

  test("local storage set", () => {
    window.localStorage.setItem("surahsettingsstoragekey", `{"hideVerse":true,"hideTranslation":true}`)

    const surahSettings = getSurahSettings()

    expect(surahSettings.hideVerse).toBe(true)
    expect(surahSettings.hideTranslation).toBe(true)
  })

  test("window undefined", () => {
    const win = global.window

    // @ts-ignore
    delete global.window

    const surahSettings = getSurahSettings()

    expect(surahSettings.hideVerse).toBe(false)
    expect(surahSettings.hideTranslation).toBe(false)

    global.window = win
  })
})
