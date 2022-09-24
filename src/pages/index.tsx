import { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button } from './../components/button'
import { KoranApiImpl } from './../apis/koran_api_impl'
import { QuranText } from '../components/quran_text'
import { getSurahSettings } from '../utils/get_surah_settings'

import type { KoranApi } from './../apis/koran_api'
import type { SurahInfo } from './../types/surah_info'

export type Props = {
  surahInfos: SurahInfo[]
}

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter()
  const surahSettings = getSurahSettings()

  const SurahInfos = props.surahInfos.map(surahInfo => {
    const href = `/surahs/${surahInfo.surahId}`
    const onClick = () => {
      router.push(`/#${surahInfo.surahId.toString()}`)
      router.push(href)
    }

    return (
      <div
        id={surahInfo.surahId.toString()}
        key={surahInfo.surahId.toString()}
        style={{
          display: "flex",
          alignItems: "center",
          height: "70px"
        }}
      >
        {surahInfo.surahId}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={onClick}
          style={{
            flex: 1,
            textAlign: "left",
            height: "100%",
            cursor: "pointer"
          }}
        >
          {surahSettings?.hideTranslation ? null : surahInfo.titleEnglish}
        </Button>
        <Button
          onClick={onClick}
          style={{
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          {surahSettings?.hideVerse ? null : <QuranText text={surahInfo.titleArabic} />}
        </Button>
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
