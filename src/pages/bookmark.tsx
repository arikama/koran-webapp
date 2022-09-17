import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './../pages/app'
import { Button } from './../components/button'
import { FONT } from './../constants/font'
import { STORAGE } from '../constants/storage'
import { TRACKING_ACTIONS } from '../constants/tracking_actions'
import { getSurahVerseId } from '../utils/get_surah_verse_id'
import { triggerGtmUserclick } from '../utils/trigger_gtm_userclick'
import { usePersistentState } from '../hooks/use_persistent_state'

import type { BookmarkSettings } from '../types/bookmark_settings'
import type { Verse } from './../types/verse'

export default function BookmarkPage() {
  const wireContext = useContext(WireContext)
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [bookmarkSettings, setBookmarkSettings] = usePersistentState<BookmarkSettings>(STORAGE.BOOKMARK_SETTINGS_STORAGE_KEY, {
    hideVerse: false,
    hideTranslation: false
  })

  const [currentPointer, setCurrentPointer] = useState<string>('')
  const [verse, setVerse] = useState<Verse>({ key: '', verse: '', translation: '' })

  useEffect(() => {
    (async () => {
      if (!authContext.isLoggedIn()) {
        router.push('/')
        return
      }
      if (authContext.user) {
        const currentPointer = await wireContext.userApi().getUserPointer(authContext.user.email, authContext.user.token)

        setCurrentPointer(currentPointer)
      }
    })()
  }, [authContext, authContext.isLoggedIn, router, wireContext])

  useEffect(() => {
    (async () => {
      const parsed = getSurahVerseId(currentPointer)

      if (parsed.ok) {
        const verse = await wireContext.koranApi().getVerse(parsed.surahId, parsed.verseId)

        setVerse(verse)
      }
    })()
  }, [currentPointer, wireContext],)

  const parsed = getSurahVerseId(currentPointer)

  if (!verse.verse || !verse.translation) {
    return <></>
  }

  const renderVerse = () => {
    if (bookmarkSettings.hideVerse) {
      return <>&nbsp;</>
    }
    return (
      <div
        style={{
          fontFamily: FONT.QURAN_FONT_FAMILY,
          fontSize: FONT.QURAN_FONT_SIZE,
          textAlign: 'right'
        }}
      >
        {verse.verse}
      </div>
    )
  }

  const renderTranslation = () => {
    if (bookmarkSettings.hideTranslation) {
      return (
        <>&nbsp;</>
      )
    }
    return (
      <div
        style={{
          fontSize: FONT.FONT_SIZE_S
        }}
      >
        {verse.translation}
      </div>
    )
  }

  const renderTag = () => {
    return (
      <Button
        onClick={() => {
          router.push(`/surahs/${parsed.surahId}#${parsed.verseId}`)
        }}
      >
        {currentPointer}
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
      >
        {bookmarkSettings.hideVerse ? "show" : "hide"}&nbsp;verse
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
      >
        {bookmarkSettings.hideTranslation ? "show" : "hide"}&nbsp;translation
      </Button>
    )
  }

  const renderNext = () => {
    return (
      <Button
        onClick={async () => {
          triggerGtmUserclick(TRACKING_ACTIONS.BOOKMARK_NEXT)
          if (authContext.isLoggedIn() && authContext.user) {
            const currentPointer = await wireContext.userApi().advanceUserPointer(authContext.user.email, authContext.user.token)

            setCurrentPointer(currentPointer)
          }
        }}
      >
        Next
      </Button>
    )
  }

  return (
    <>
      <Head>
        <title>Bookmark</title>
      </Head>
      <div
        style={{
          fontSize: FONT.FONT_SIZE_S,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {renderTag()}
        <div>
          {renderShowHideVerse()}
          {renderShowHideTranslation()}
        </div>
      </div>
      {renderVerse()}
      {renderTranslation()}
      &nbsp;
      <div
        style={{
          textAlign: 'right',
        }}
      >
        {renderNext()}
      </div>
    </>
  )
}
