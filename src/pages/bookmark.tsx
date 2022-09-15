import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './../pages/_app'
import {
  POINTER_FONT_SIZE,
  QURAN_FONT_FAMILY,
  QURAN_FONT_SIZE,
  TRANSLATION_FONT_SIZE,
} from './../constants/font'
import { Button } from './../components/button'
import { getSurahVerseId } from '../utils/get_surah_verse_id'
import { useBookmarkSettings } from '../hooks/use_bookmark_settings'

import type { Verse } from './../types/verse'

export default function BookmarkPage() {
  const wireContext = useContext(WireContext)
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const { bookmarkSettings, updateBookmarkSettings } = useBookmarkSettings()

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
          fontFamily: QURAN_FONT_FAMILY,
          fontSize: QURAN_FONT_SIZE,
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
          fontSize: TRANSLATION_FONT_SIZE
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
          updateBookmarkSettings({
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
          updateBookmarkSettings({
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
      <div
        style={{
          fontSize: POINTER_FONT_SIZE,
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
