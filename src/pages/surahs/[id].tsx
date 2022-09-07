import { GetStaticProps } from 'next'
import { KoranApiImpl } from './../../apis/koran_api_impl'

import type { KoranApi } from './../../apis/koran_api'

export default function SurahPage(props: any) {
  return (
    <>
      {props.surah.data.surah.verses.map((verse: any) => {
        return (
          <div key={verse.verse_id}>
            <div style={{
              fontSize: '0.9em'
            }}>
              {`${verse.surah_id}:${verse.verse_id}`}
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
              {verse.translations.pickthall}
            </div>
            <br />
            <br />
          </div>
        )
      })}
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
  const surahId = context.params!.id
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/surah/${surahId}`)
  const json = await resp.json()
  return {
    props: {
      surah: json
    },
  }
}
