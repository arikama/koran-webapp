import { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { QURAN_FONT_FAMILY, QURAN_FONT_SIZE_1P7 } from '../constants/font'
import { Button } from './../components/button'
import { KoranApiImpl } from './../apis/koran_api_impl'

import type { KoranApi } from './../apis/koran_api'
import type { SurahInfo } from './../types/surah_info'

export type Props = {
  surahInfos: SurahInfo[]
}

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter()

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
            cursor: 'pointer'
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
          <div style={{
            fontFamily: `${QURAN_FONT_FAMILY}`,
            fontSize: `${QURAN_FONT_SIZE_1P7}`,
            textAlign: 'right'
          }}>
            {surahInfo.titleArabic}
          </div>
        </div>
      </div>
    )
  })

  const renderShortcuts = () => {
    const shortcuts = [25, 50, 75, 100, 114]
    const buttons = shortcuts.map((surahId => {
      const href = `/#${surahId}`
      return (
        <u
          key={href}
          onClick={() => {
            router.push(href)
          }}
          style={{
            cursor: "pointer"
          }}
        >
          {surahId}
        </u>
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
