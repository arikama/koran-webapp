import { useContext, useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { AuthContext, WireContext } from "../pages/app"
import { Break } from "../components/break"
import { Button } from "../components/button"
import { DIMENSIONS } from "../constants/dimensions"
import { FONT } from "../constants/font"
import { QuranText } from "../components/quran_text"
import { STORAGE } from "../constants/storage"
import { TRACKING_ACTIONS } from "../constants/tracking_actions"
import { TranslationText } from "../components/translation_text"
import { getEmptyUser } from "../utils/get_empty_user"
import { getSurahVerseId } from "../utils/get_surah_verse_id"
import { triggerGtmUserclick } from "../utils/trigger_gtm_userclick"
import { usePersistentState } from "../hooks/use_persistent_state"

import type { BookmarkSettings } from "../types/bookmark_settings"
import type { Verse } from "../types/verse"

export default function BookmarkPage() {
  const router = useRouter()
  const wireContext = useContext(WireContext)
  const authContext = useContext(AuthContext)

  const [bookmarkSettings, setBookmarkSettings] = usePersistentState<BookmarkSettings>(STORAGE.BOOKMARK_SETTINGS_STORAGE_KEY, {
    hideVerse: false,
    hideTranslation: false
  })

  const [currentPointer, setCurrentPointer] = useState<string>("")
  const [verse, setVerse] = useState<Verse>({ key: "", verse: "", translation: "" })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [favSet, setFavSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    (async () => {
      if (!authContext.isLoggedIn()) {
        router.push("/")
        return
      }
      try {
        setIsLoading(true)

        const currentPointer = await wireContext.userApi().getUserPointer(authContext.user!.email, authContext.user!.token)
        const parsed = getSurahVerseId(currentPointer)
        const verse = await wireContext.koranApi().getVerse(parsed.surah, parsed.verse)

        setCurrentPointer(currentPointer)
        setVerse(verse)
        setIsLoading(false)
        setFavSet(await wireContext.favManager().get())
      } catch (e) {
        authContext.updateUser(getEmptyUser())
        setIsLoading(false)
      }
    })()
  }, [authContext, router, wireContext])

  const parsed = getSurahVerseId(currentPointer)

  const renderVerse = () => {
    if (bookmarkSettings.hideVerse) {
      return <></>
    }
    return (
      <>
        <Break />
        <QuranText text={verse.verse} />
      </>
    )
  }

  const renderTranslation = () => {
    if (bookmarkSettings.hideTranslation) {
      return (
        <></>
      )
    }
    return (
      <>
        <Break size={DIMENSIONS.SZ_8} />
        <TranslationText text={verse.translation} />
      </>
    )
  }

  const renderTag = () => {
    return (
      <Button
        onClick={() => {
          router.push(`/surahs/${parsed.surah}#${parsed.verse}`)
        }}
      >
        {currentPointer}
      </Button>
    )
  }

  const renderFav = () => {
    const isFav = favSet.has(currentPointer)

    return (
      <Button
        onClick={async () => {
          if (!isFav) {
            setFavSet(await wireContext.favManager().add(currentPointer))
          } else {
            setFavSet(await wireContext.favManager().remove(currentPointer))
          }
        }}
        style={{
          textDecoration: undefined
        }}
      >
        {!isFav ? "🩶" : "❤️"}
      </Button>
    )
  }

  const renderShowHideVerse = () => {
    return (
      <Button
        onClick={() => {
          setBookmarkSettings({
            ...bookmarkSettings,
            hideVerse: !bookmarkSettings.hideVerse
          })
        }}
        style={{
          textDecoration: undefined
        }}
      >
        {bookmarkSettings.hideVerse ? "🛐" : "☪️"}
      </Button>
    )
  }

  const renderShowHideTranslation = () => {
    return (
      <Button
        onClick={() => {
          setBookmarkSettings({
            ...bookmarkSettings,
            hideTranslation: !bookmarkSettings.hideTranslation
          })
        }}
        style={{
          textDecoration: undefined
        }}
      >
        {bookmarkSettings.hideTranslation ? "📕" : "📖"}
      </Button>
    )
  }

  const renderNext = () => {
    return (
      <>
        <Break size={DIMENSIONS.SZ_8} />
        <Button
          onClick={async () => {
            if (isLoading) {
              return
            }
            setIsLoading(true)
            triggerGtmUserclick(TRACKING_ACTIONS.BOOKMARK_NEXT)
            if (authContext.isLoggedIn() && authContext.user) {
              const currentPointer = await wireContext.userApi().advanceUserPointer(authContext.user.email, authContext.user.token)
              const parsed = getSurahVerseId(currentPointer)
              const verse = await wireContext.koranApi().getVerse(parsed.surah, parsed.verse)

              setCurrentPointer(currentPointer)
              setVerse(verse)
            }
            setIsLoading(false)
          }}
          isLoading={isLoading}
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'right'
          }}
        >
          next
        </Button>
      </>
    )
  }

  const renderReverse = () => {
    return (
      <>
        <Break size={DIMENSIONS.SZ_8} />
        <Button
          onClick={async () => {
            if (isLoading) {
              return
            }
            setIsLoading(true)
            triggerGtmUserclick(TRACKING_ACTIONS.BOOKMARK_NEXT)
            if (authContext.isLoggedIn() && authContext.user) {
              const currentPointer = await wireContext.userApi().reverseUserPointer(authContext.user.email, authContext.user.token)
              const parsed = getSurahVerseId(currentPointer)
              const verse = await wireContext.koranApi().getVerse(parsed.surah, parsed.verse)

              setCurrentPointer(currentPointer)
              setVerse(verse)
            }
            setIsLoading(false)
          }}
          isLoading={isLoading}
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'left'
          }}
        >
          reverse
        </Button>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Bookmark</title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>
          {renderTag()}
        </div>
        <div>
          {renderFav()}
          {renderShowHideVerse()}
          {renderShowHideTranslation()}
        </div>
      </div>
      <div
        style={{
          paddingLeft: `${DIMENSIONS.SZ_6}px`,
          paddingRight: `${DIMENSIONS.SZ_6}px`
        }}
      >
        {renderVerse()}
        {renderTranslation()}
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          {renderReverse()}
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          {renderNext()}
        </div>
      </div>
    </>
  )
}
