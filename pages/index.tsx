import { GetStaticProps } from 'next'
import Link from 'next/link'

import type { NextPage } from 'next'

const HomePage: NextPage = (props: any) => {
  return (
    <>
      <ol>
        {props.surahs.map((surah: any) => {
          return (
            <li key={surah.id}><Link href={`/surahs/${surah.id}`}><a><u>{`${surah.title}`}</u></a></Link></li>
          )
        })}
      </ol>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}`)
  const json = await resp.json()
  const surahInfos = json.data.surah_infos
  const surahs = surahInfos.map((surahInfo: any) => {
    return {
      id: surahInfo.surah_id,
      title: surahInfo.title
    }
  })
  return {
    props: {
      surahs
    },
  }
}


export default HomePage
