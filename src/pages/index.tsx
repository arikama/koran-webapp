import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import { KoranApiImpl } from './../apis/koran_api_impl'

import type { NextPage } from 'next'

import type { KoranApi } from './../apis/koran_api'
import type { SurahInfo } from './../types/surah_info'

export type Props = {
  surahInfos: SurahInfo[]
}

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const SurahInfos = props.surahInfos.map(surahInfo => {
    const href = `/surahs/${surahInfo.surahId}`
    return (
      <div key={surahInfo.surahId.toString()}>
        <Link
          href={href}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <span>{surahInfo.surahId}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <u>{surahInfo.titleEnglish}</u>
            </div>
            <div style={{
              fontFamily: 'Scheherazade',
              fontSize: '2em', textAlign: 'right'
            }}>
              {surahInfo.titleArabic}
            </div>
          </div>
        </Link>
        <br />
      </div>
    )
  })
  return (
    <>
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
