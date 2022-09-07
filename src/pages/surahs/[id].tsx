import { GetStaticProps } from 'next'
import { KoranApiImpl } from './../../apis/koran_api_impl'

import type { KoranApi } from './../../apis/koran_api'
import type { Surah } from './../../types/surah'

export default function SurahPage(props: { surah: Surah }) {
  const Verses = props.surah.verses.map((verse) => {
    return (
      <div key={verse.verseId}>
        <div style={{
          fontSize: '0.9em'
        }}>
          {`${props.surah.surahId}:${verse.verseId}`}
        </div>
        <div style={{
          fontFamily: 'Scheherazade',
          fontSize: '2.5em',
          textAlign: 'right'
        }}>
          {verse.text}
        </div>
        <div style={{
          fontSize: '1em'
        }}>
          {verse.translation}
        </div>
        <br />
        <br />
      </div>
    )
  })
  return (
    <>
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
