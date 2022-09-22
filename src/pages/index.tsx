import { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button } from './../components/button'
import { KoranApiImpl } from './../apis/koran_api_impl'
import { QuranText } from '../components/quran_text'
import { STORAGE } from '../constants/storage'

import type { KoranApi } from './../apis/koran_api'
import type { SurahInfo } from './../types/surah_info'
import type { SurahSettings } from '../types/surah_settings'

export type Props = {
  surahInfos: SurahInfo[]
}

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter()

  let surahSettings: SurahSettings | null = null
  try {
    const blob = window.localStorage.getItem(STORAGE.SURAH_SETTINGS_STORAGE_KEY)
    if (blob) {
      surahSettings = JSON.parse(blob) as SurahSettings
    }
  } catch (ignored) { ; }

  const SurahInfos = props.surahInfos.map(surahInfo => {
    const href = `/surahs/${surahInfo.surahId}`

    return (
      <div
        id={surahInfo.surahId.toString()}
        key={surahInfo.surahId.toString()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            height: "70px"
          }}
        >
          <div>
            <span>{surahInfo.surahId}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              onClick={() => {
                router.push(`/#${surahInfo.surahId.toString()}`)
                router.push(href)
              }}
            >
              {surahInfo.titleEnglish}
            </Button>
          </div>
          {surahSettings?.hideVerse ? null : <QuranText text={surahInfo.titleArabic} />}
        </div>
      </div>
    )
  })

  const renderShortcuts = () => {
    const shortcuts = [25, 50, 75, 100, 114]
    const buttons = shortcuts.map((surahId => {
      const href = `/#${surahId}`
      return (
        <Button
          key={href}
          onClick={() => {
            router.push(href)
          }}
        >
          {surahId}
        </Button>
      )
    }))
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9em"
        }}
      >
        {buttons}
      </div>
    )
  }

  return (
    <>
      {renderShortcuts()}
      {SurahInfos}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const koranApi: KoranApi = new KoranApiImpl()

  const surahInfos = await koranApi.getSurahInfos()

  return {
    props: {
      surahInfos
    },
  }
}

export default IndexPage
