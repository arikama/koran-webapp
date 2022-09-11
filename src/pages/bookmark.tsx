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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/pointer`, {
        method: 'POST',
        body: JSON.stringify({
          email: authContext.user?.email,
        }),
        headers: {
          'x-access-token': authContext.user?.token!,
        }
      })
      const json = await response.json()
      const cp = (json.data.current_pointer as string)
      setCurrentPointer(cp)
    })()
  }, [authContext.user])
  useEffect(() => {
    (async () => {
      const parsed = getSurahVerseId(currentPointer)

      if (parsed.ok) {
        const verse = await wireContext.getKoranApi().getVerse(parsed.surahId, parsed.verseId)

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/pointer/advance`, {
              method: 'PATCH',
              body: JSON.stringify({
                email: authContext.user?.email,
              }),
              headers: {
                'x-access-token': authContext.user?.token!,
              }
            })
            const json = await response.json()
            console.log('!! json:', json)
            const cp = (json.data.current_pointer as string)
            setCurrentPointer(cp)
          }}
        >
          Next
        </Button>
      </div>
    </>
  )
}
