import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import type { NextPage } from 'next'

export type Props = {
  surahs: Array<{
    id: number
    title: string
    arabic: string
  }>
}

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <>
      {props.surahs.map((surah) => {
        return (
          <div key={`${surah.id}`}>
            <Link
              href={`/surahs/${surah.id}`}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span>{surah.id}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <u>{surah.title}</u>
                </div>
                <div style={{ fontFamily: 'Scheherazade', fontSize: '2em', textAlign: 'right' }}>{surah.arabic}</div>
              </div>
            </Link>
            <br />
          </div>
        )
      })}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}`)
  const json = await resp.json()
  const surahInfos = json.data.surah_infos
  const surahs = surahInfos.map((surahInfo: any) => {
    return {
      id: surahInfo.surah_id,
      title: surahInfo.english,
      arabic: surahInfo.arabic
    }
  })
  return {
    props: {
      surahs
    },
  }
}


export default HomePage
