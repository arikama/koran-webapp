import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { stringify } from 'querystring'

export async function getStaticPaths() {
  const resp = await fetch('https://koran-backend-production.up.railway.app/')
  const json = await resp.json()
  const surahInfos = json.data.surah_infos
  const paths = surahInfos.map((surahInfo: any) => {
    return {
      params: {
        id: surahInfo.surah_id.toString()
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
  const resp = await fetch(`https://koran-backend-production.up.railway.app/surah/${surahId}`)
  const json = await resp.json()
  return {
    props: {
      surah: json
    },
  }
}

export default function Surah(props: any) {
  return (
    <>
      <ol>
        {/* {JSON.stringify(props.surah)} */}
        {props.surah.data.surah.verses.map((verse: any) => {
          return (
            <li key={verse.verse_id}>
              <p>{verse.text}</p>
              <p>{verse.translations.pickthall}</p>
            </li>
          )
        })}
      </ol>
    </>
  )
}
