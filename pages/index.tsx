import { GetStaticProps } from 'next'
import Link from 'next/link'

import type { NextPage } from 'next'

type Props = {
  surahs: Array<{
    id: number
    title: string
    arabic: string
  }>
}

const HomePage: NextPage<Props> = (props) => {
  return (
    <>
      {props.surahs.map((surah) => {
        return (
          <div key={`${surah.id}`}>
            <Link
              href={`/surahs/${surah.id}`}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <u>{surah.id}</u>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <u>{surah.title}</u>
                </div>
                <u style={{ textAlign: 'right' }}>{surah.arabic}</u>
              </div>
            </Link>
            <br />
          </div>
        )
      })}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}`)
  const json = await resp.json()
  const surahInfos = json.data.surah_infos
  console.log(surahInfos)
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
