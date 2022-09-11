import {
  POINTER_FONT_SIZE,
  QURAN_FONT_FAMILY,
  QURAN_FONT_SIZE,
  TRANSLATION_FONT_SIZE,
} from './../../constants/font'
import { GetStaticProps } from 'next'
import { KoranApiImpl } from './../../apis/koran_api_impl'

import type { KoranApi } from './../../apis/koran_api'
import type { Surah } from './../../types/surah'

export default function SurahPage(props: { surah: Surah }) {
  const Verses = props.surah.verses.map((verse) => {
    return (
      <div key={verse.verseId}>
        <div
          style={{
            fontSize: POINTER_FONT_SIZE
          }}
        >
          {`${props.surah.surahId}:${verse.verseId}`}
        </div>
        <div
          style={{
            fontFamily: QURAN_FONT_FAMILY,
            fontSize: QURAN_FONT_SIZE,
            textAlign: 'right'
          }}
        >
          {verse.text}
        </div>
        <div
          style={{
            fontSize: TRANSLATION_FONT_SIZE
          }}
        >
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
