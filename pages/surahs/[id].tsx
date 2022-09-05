import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

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
  return {
    props: {
      surah: {
        surahId: context.params!.id
      }
    },
  }
}

export default function Surah(props: any) {
  return (
    <>Surah {props.surah.surahId}</>
  )
}
