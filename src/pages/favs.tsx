import { useContext, useEffect, useState } from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './app'
import { Break } from '../components/break'
import { Button } from '../components/button'
import { DIMENSIONS } from '../constants/dimensions'
import { FONT } from '../constants/font'
import { QuranText } from '../components/quran_text'
import { STORAGE } from '../constants/storage'
import { ShowHideButton } from '../components/show_hide_button'
import { TranslationText } from '../components/translation_text'
import { getSurahVerseId } from '../utils/get_surah_verse_id'
import { usePersistentState } from '../hooks/use_persistent_state'

import type { FavSettings } from '../types/fav_settings'
import type { Verse } from '../types/verse'

export default function FavsPage() {
  const authContext = useContext(AuthContext)
  const wireContext = useContext(WireContext)
  const router = useRouter()
  const [favs, setFavs] = useState<Verse[]>([])

  const [favSettings, updateFavSettings] = usePersistentState<FavSettings>(
    STORAGE.FAV_SETTINGS_STORAGE_KEY,
    {
      hideVerse: false,
      hideTranslation: false
    },
  )

  useEffect(() => {
    (async () => {
      if (!authContext.isLoggedIn()) {
        router.push('/')
        return
      }

      const favSet = await wireContext.favManager().get()

      const favs: Verse[] = []

      for (const fav of Array.from(favSet)) {
        const id = getSurahVerseId(fav)

        const verse = await wireContext.koranApi().getVerse(id.surahId, id.verseId)

        favs.push(verse)
      }

      favs.sort((a, b) => {
        const aId = getSurahVerseId(a.key)
        const bId = getSurahVerseId(b.key)

        if (aId.surahId == bId.surahId) {
          return aId.verseId - bId.verseId
        } else {
          return aId.surahId - bId.surahId
        }
      })

      setFavs(favs)
    })()

  }, [authContext, router, wireContext])

  if (!authContext.isLoggedIn()) {
    return <></>
  }

  const renderUserActions = () => {
    return (
      <div
        style={{
          fontSize: FONT.FONT_SIZE_S,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          {renderShowHideVerse()}
          {renderShowHideTranslation()}
        </div>
        <Break />
      </div>
    )
  }

  const renderShowHideVerse = () => {
    return (
      <ShowHideButton
        what="verse"
        isHiding={favSettings.hideVerse}
        onClick={() => {
          updateFavSettings({
            ...favSettings,
            hideVerse: !favSettings.hideVerse
          })
        }}
      />
    )
  }

  const renderShowHideTranslation = () => {
    return (
      <ShowHideButton
        what="translation"
        isHiding={favSettings.hideTranslation}
        onClick={() => {
          updateFavSettings({
            ...favSettings,
            hideTranslation: !favSettings.hideTranslation
          })
        }}
      />
    )
  }

  const renderTag = (surahVerse: string) => {
    const parsed = getSurahVerseId(surahVerse)

    return (
      <Button
        onClick={() => {
          router.push(`/surahs/${parsed.surahId}#${parsed.verseId}`)
        }}
        style={{
          fontSize: FONT.FONT_SIZE_S,
        }}
      >
        {surahVerse}
      </Button>
    )
  }

  const renderSingleVerse = (verse: Verse) => {
    return (
      <div key={verse.key}>
        {renderTag(verse.key)}
        <div
          style={{
            paddingLeft: `${DIMENSIONS.SZ_6}px`,
            paddingRight: `${DIMENSIONS.SZ_6}px`
          }}
        >
          {
            favSettings.hideVerse ? null : (
              <div>
                <QuranText text={verse.verse} />
                <Break size={DIMENSIONS.SZ_8} />
              </div>
            )
          }
          <Break size={DIMENSIONS.SZ_8} />
          {
            favSettings.hideTranslation ? null : (
              <div>
                <TranslationText text={verse.translation} />
                <Break size={DIMENSIONS.SZ_8} />
              </div>
            )
          }
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Favorite</title>
      </Head>
      {renderUserActions()}
      <div>{favs.map(renderSingleVerse)}</div>
    </>
  )
}
