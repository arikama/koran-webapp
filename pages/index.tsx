import Link from 'next/link'
import type { NextPage } from 'next'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

const HomePage: NextPage = (props: any) => {
  return (
    <>
      <List>
        {props.surahs.map((surah: any) => {
          return (
            <ListItem><Link href={`/surahs/${surah.id}`}><MuiLink>{`${surah.id} ${surah.title}`}</MuiLink></Link></ListItem>
          )
        })}
      </List>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const resp = await fetch('https://koran-backend-production.up.railway.app/')
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
