import { useContext, useEffect, useState } from 'react'

import { AuthContext } from './../pages/_app'
import { Button } from './../components/button'

type Verse = {
  verse: string
  translation: string
}

export default function BookmarkPage() {
  const authContext = useContext(AuthContext)
  const [currentPointer, setCurrentPointer] = useState<string>('')
  const [verse, setVerse] = useState<Verse>({ verse: '', translation: '' })
  useEffect(() => {
    const f = async () => {
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
      const [surahId, verseId] = cp.split(':')
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/surah/${surahId}/verse/${verseId}`, {
        method: 'GET'
      })
      const json2 = await response2.json()
      const verse = json2.data.verse
      const translation = json2.data.translations.pickthall
      console.log('! json2:', json2)
      setCurrentPointer(cp)
    }
    f()
  }, [authContext.user])
  useEffect(() => {
    const f = async () => {
      const cp = currentPointer
      const [surahId, verseId] = cp.split(':')
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/surah/${surahId}/verse/${verseId}`, {
        method: 'GET'
      })
      const json2 = await response2.json()
      const verse = json2.data.verse
      const translation = json2.data.translations.pickthall
      console.log('! json2:', json2)
      setVerse({
        verse,
        translation,
      })
    }
    f()
  }, [currentPointer])
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
