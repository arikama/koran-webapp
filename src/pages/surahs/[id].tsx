import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from "../../pages/app"
import { Break } from '../../components/break'
import { Button } from '../../components/button'
import { DIMENSIONS } from '../../constants/dimensions'
import { FONT } from '../../constants/font'
import { GetStaticProps } from 'next'
import { KoranApiImpl } from '../../apis/koran_api_impl'
import { QuranText } from '../../components/quran_text'
import { STORAGE } from '../../constants/storage'
import { ShowHideButton } from '../../components/show_hide_button'
import { TranslationText } from '../../components/translation_text'
import { getSurahShortcuts } from '../../utils/get_surah_shortcuts'
import { usePersistentState } from '../../hooks/use_persistent_state'

import type { KoranApi } from '../../apis/koran_api'
import type { Surah } from '../../types/surah'
import type { SurahSettings } from '../../types/surah_settings'

export default function SurahPage(props: { surah: Surah }) {
  const router = useRouter()
  const wireContext = useContext(WireContext)
  const authContext = useContext(AuthContext)
  const [surahSettings, updateSurahSettings] = usePersistentState<SurahSettings>(
    STORAGE.SURAH_SETTINGS_STORAGE_KEY,
    {
      hideVerse: false,
      hideTranslation: false
    },
  )
  const [favSet, setFavSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    (async () => {
      setFavSet(await wireContext.favManager().get())
    })()
  }, [wireContext, router])

  const renderFav = (surahVerse: string) => {
    const isFav = favSet.has(surahVerse)

    return (
      <Button
        onClick={async () => {
          if (!isFav) {
            setFavSet(await wireContext.favManager().add(surahVerse))
          } else {
            setFavSet(await wireContext.favManager().remove(surahVerse))
          }
        }}
        style={{
          textDecoration: isFav ? undefined : "underline"
        }}
      >
        {!favSet.has(surahVerse) ? "favorite" : <div style={{ fontSize: `${FONT.FONT_SIZE_S}` }}>❤️</div>}
      </Button>
    )
  }

  const renderShowHideVerse = () => {
    return (
      <ShowHideButton
        what="verse"
        isHiding={surahSettings.hideVerse}
        onClick={() => {
          updateSurahSettings({
            ...surahSettings,
            hideVerse: !surahSettings.hideVerse
          })
        }}
      />
    )
  }

  const renderShowHideTranslation = () => {
    return (
      <ShowHideButton
        what="translation"
        isHiding={surahSettings.hideTranslation}
        onClick={() => {
          updateSurahSettings({
            ...surahSettings,
            hideTranslation: !surahSettings.hideTranslation
          })
        }}
      />
    )
  }

  const renderVerse = (verseText: string) => {
    if (surahSettings.hideVerse) {
      return <></>
    }
    return (
      <QuranText text={verseText} />
    )
  }

  const renderTranslation = (verseTranslation: string) => {
    if (surahSettings.hideTranslation) {
      return <></>
    }
    return (
      <TranslationText text={verseTranslation} />
    )
  }

  const renderVerses = () => {
    return props.surah.verses.map((verse) => {
      return (
        <div
          key={verse.verseId}
          id={`${verse.verseId}`}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: FONT.FONT_SIZE_S
            }}
          >
            <div>
              {`${props.surah.surahId}:${verse.verseId}`}
            </div>
            <div>
              {
                authContext.isLoggedIn() ?
                  renderFav(`${props.surah.surahId}:${verse.verseId}`)
                  :
                  null
              }
              <Button
                onClick={() => {
                  router.back()
                }}
              >
                back
              </Button>
            </div>
          </div>
          <Break size={DIMENSIONS.SZ_8} />
          {renderVerse(verse.text)}
          <Break />
          {renderTranslation(verse.translation)}
          <Break size={DIMENSIONS.SZ_64} />
        </div>
      )
    })
  }

  const renderShortcuts = () => {
    const surahSz = props.surah.verses.length
    const shortcuts = getSurahShortcuts(surahSz)
    const renderButtons = () => {
      return shortcuts.map(verseId => {
        const href = `/surahs/${props.surah.surahId}/#${verseId}`
        return (
          <Button
            key={href}
            onClick={() => {
              router.push(href)
            }}
          >
            {verseId}
          </Button>
        )
      })
    }
    return (
      <div
        style={{
          fontSize: FONT.FONT_SIZE_S
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {renderButtons()}
        </div>
        <Break />
      </div>
    )
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

  return (
    <>
      <Head>
        <title>{props.surah.englishName}</title>
      </Head>
      {renderShortcuts()}
      <div
        style={{
          paddingLeft: `${DIMENSIONS.SZ_6}px`,
          paddingRight: `${DIMENSIONS.SZ_6}px`
        }}
      >
        {renderUserActions()}
        {renderVerses()}
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const koranApi: KoranApi = new KoranApiImpl()

  const surahInfos = await koranApi.getSurahInfos()

  const paths = surahInfos.map((surahInfo) => {
    return {
      params: {
        id: surahInfo.surahId.toString()
      }
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const surahId = parseInt(context.params!.id as string)
  const koranApi: KoranApi = new KoranApiImpl()

  const surah = await koranApi.getSurah(surahId)

  return {
    props: {
      surah
    },
  }
}
