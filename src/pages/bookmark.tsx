import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
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

import type { Verse } from './../types/verse'

export default function BookmarkPage() {
  const wireContext = useContext(WireContext)
  const authContext = useContext(AuthContext)
  const router = useRouter()

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

  return (
    <>
      <div
        style={{
          fontSize: POINTER_FONT_SIZE
        }}
      >
        <Link
          href={`/surahs/${parsed.surahId}#${parsed.verseId}`}
        >
          <u>{currentPointer}</u>
        </Link>
      </div>
      <div
        style={{
          fontFamily: QURAN_FONT_FAMILY,
          fontSize: QURAN_FONT_SIZE,
          textAlign: 'right'
        }}
      >
        {verse.verse}
      </div>
      <div
        style={{
          fontSize: TRANSLATION_FONT_SIZE
        }}
      >
        {verse.translation}
      </div>
      &nbsp;
      <div
        style={{
          textAlign: 'right',
        }}
      >
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
      </div>
    </>
  )
}
