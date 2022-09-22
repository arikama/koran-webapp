import Head from 'next/head'
import { useRouter } from 'next/router'

import { Break } from '../../components/break'
import { Button } from './../../components/button'
import { FONT } from './../../constants/font'
import { GetStaticProps } from 'next'
import { KoranApiImpl } from './../../apis/koran_api_impl'
import { QuranText } from '../../components/quran_text'
import { STORAGE } from '../../constants/storage'
import { ShowHideButton } from '../../components/show_hide_button'
import { TranslationText } from '../../components/translation_text'
import { usePersistentState } from '../../hooks/use_persistent_state'

import { DIMENSIONS } from '../../constants/dimensions'
import type { KoranApi } from './../../apis/koran_api'
import type { Surah } from './../../types/surah'
import type { SurahSettings } from '../../types/surah_settings'

export default function SurahPage(props: { surah: Surah }) {
  const router = useRouter()
  const [surahSettings, updateSurahSettings] = usePersistentState<SurahSettings>(
    STORAGE.SURAH_SETTINGS_STORAGE_KEY,
    {
      hideVerse: false,
      hideTranslation: false
    },
  )

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

  const Verses = props.surah.verses.map((verse) => {
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
          <Button
            onClick={() => {
              router.back()
            }}
          >
            back
          </Button>
        </div>
        <Break />
        {renderVerse(verse.text)}
        <Break />
        {renderTranslation(verse.translation)}
        <Break size={DIMENSIONS.SZ_64} />
      </div>
    )
  })

  const renderShortcuts = () => {
    const surahSz = props.surah.verses.length
    const set = new Set<number>([
      Math.round(surahSz * 0.25),
      Math.round(surahSz * 0.5),
      Math.round(surahSz * 0.75),
      Math.round(surahSz * 1.0),
    ])
    const shortcuts = Array.from(set).sort((a, b) => {
      if (a === b) {
        return 0
      }
      if (a < b) {
        return -1
      } else {
        return 1
      }
    })
    const buttons = shortcuts.map((verseId => {
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
    }))
    return (
      <div
        style={{
          fontSize: "0.9em"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {buttons}
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
          fontSize: "0.9em",
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
      {Verses}
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
