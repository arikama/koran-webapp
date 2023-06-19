import { useContext, useEffect, useState } from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './app'
import { Button } from '../components/button'
import { FONT } from "../constants/font"
import { getSurahVerseId } from '../utils/get_surah_verse_id'

export default function FavsPage() {
  const authContext = useContext(AuthContext)
  const wireContext = useContext(WireContext)
  const router = useRouter()
  const [favs, setFavs] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      if (!authContext.isLoggedIn()) {
        router.push('/')
        return
      }

      const favSet = await wireContext.favManager().get()

      const favs = Array.from(favSet).sort((a, b) => {
        const aParsed = getSurahVerseId(a)
        const bParsed = getSurahVerseId(b)

        if (aParsed.surahId == bParsed.surahId) {
          return aParsed.verseId - bParsed.verseId
        } else {
          return aParsed.surahId - bParsed.surahId
        }
      })

      setFavs(favs)
    })()

  }, [authContext, router, wireContext])

  if (!authContext.isLoggedIn()) {
    return <></>
  }

  const renderTag = (surahVerse: string) => {
    const parsed = getSurahVerseId(surahVerse)

    return (
      <Button
        onClick={() => {
          router.push(`/surahs/${parsed.surahId}#${parsed.verseId}`)
        }}
      >
        {surahVerse}
      </Button>
    )
  }

  return (
    <>
      <Head>
        <title>Favorite</title>
      </Head>
      <div
        style={{
          fontSize: FONT.FONT_SIZE_S,
        }}
      >
        {
          favs.map(surahVerseFav => {
            return renderTag(surahVerseFav)
          })
        }
      </div>
    </>
  )
}
