import { useContext, useEffect, useState } from 'react'

import { AuthContext, WireContext } from './../pages/_app'
import { Button } from './../components/button'
import { getSurahVerseId } from '../utils/get_surah_verse_id'

import type { Verse } from './../types/verse'

export default function BookmarkPage() {
  const wireContext = useContext(WireContext)
  const authContext = useContext(AuthContext)

  const [currentPointer, setCurrentPointer] = useState<string>('')
  const [verse, setVerse] = useState<Verse>({ key: '', verse: '', translation: '' })

  useEffect(() => {
    (async () => {
      if (authContext.isLoggedIn() && authContext.user) {
        const currentPointer = await wireContext.userApi().getUserPointer(authContext.user.email, authContext.user.token)

        setCurrentPointer(currentPointer)
      }
    })()
  }, [authContext, authContext.isLoggedIn, wireContext])
  useEffect(() => {
    (async () => {
      const parsed = getSurahVerseId(currentPointer)

      if (parsed.ok) {
        const verse = await wireContext.koranApi().getVerse(parsed.surahId, parsed.verseId)

        setVerse(verse)
      }
    })()
  }, [currentPointer, wireContext],)
  return (
    <>
      <div
        style={{
          fontSize: '0.9em'
        }}
      >
        {currentPointer}
      </div>
      <div style={{
        fontFamily: 'Scheherazade',
        fontSize: '2.5em',
        textAlign: 'right'
      }}>
        {verse.verse}
      </div>
      <div
        style={{
          fontSize: '1em'
        }}
      >
        {verse.translation}
      </div>
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
