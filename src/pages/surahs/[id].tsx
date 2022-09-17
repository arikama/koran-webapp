import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  POINTER_FONT_SIZE,
  QURAN_FONT_FAMILY,
  QURAN_FONT_SIZE,
  TRANSLATION_FONT_SIZE,
} from './../../constants/font'
import { Button } from './../../components/button'
import { GetStaticProps } from 'next'
import { KoranApiImpl } from './../../apis/koran_api_impl'
import { STORAGE } from '../../constants/storage'
import { ShowHideButton } from '../../components/show_hide_button'
import { usePersistentState } from '../../hooks/use_persistent_state'

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
        {verseText}
      </div>
    )
  }

  const renderTranslation = (verseTranslation: string) => {
    if (surahSettings.hideTranslation) {
      return <>&nbsp;</>
    }
    return (
      <div
        style={{
          fontSize: TRANSLATION_FONT_SIZE
        }}
      >
        {verseTranslation}
      </div>
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
            fontSize: POINTER_FONT_SIZE
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
        {renderVerse(verse.text)}
        {renderTranslation(verse.translation)}
        <br />
        <br />
      </div>
    )
  })
  return (
    <>
      <Head>
        <title>{props.surah.englishName}</title>
      </Head>
      <div
        style={{
          fontSize: POINTER_FONT_SIZE,
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        {renderShowHideVerse()}
        {renderShowHideTranslation()}
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
