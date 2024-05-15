import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"

import { Button } from "./../components/button"
import { FONT } from "../constants/font"
import { KoranApiImpl } from "./../apis/koran_api_impl"
import { QuranText } from "../components/quran_text"
import { getSurahSettings } from "../utils/get_surah_settings"

import type { NextPage } from "next"

import { DIMENSIONS } from "../constants/dimensions"
import type { KoranApi } from "../apis/koran_api"
import type { SurahInfo } from "../types/surah_info"

const SURAH_TITLE_HEIGHT = 70
const SURAH_SHORTCUTS = [25, 50, 75, 100, 114]

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter()
  const surahSettings = getSurahSettings()

  const renderSurahIndex = () => {
    return props.surahInfos.map(surahInfo => {
      const href = `/surahs/${surahInfo.surahId}`

      const onClick = () => {
        router.push(`/#${surahInfo.surahId.toString()}`)
        router.push(href)
      }

      const renderSurahId = () => {
        return (
          <div>{surahInfo.surahId}&nbsp;&nbsp;&nbsp;&nbsp;</div>
        )
      }

      const renderSurahEnglishTitleButton = () => {
        return (
          <Button
            onClick={onClick}
            style={{
              flex: 1,
              textAlign: "left",
              height: "100%",
              cursor: "pointer"
            }}
          >
            {surahSettings?.hideTranslation ? null : surahInfo.titleEnglish}
          </Button>
        )
      }

      const renderSurahArabicTitleButton = () => {
        return (
          <Button
            onClick={onClick}
            style={{
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            {surahSettings?.hideVerse ? null : <QuranText text={surahInfo.titleArabic} />}
          </Button>
        )
      }

      return (
        <div
          id={surahInfo.surahId.toString()}
          key={surahInfo.surahId.toString()}
          style={{
            display: "flex",
            alignItems: "center",
            height: `${SURAH_TITLE_HEIGHT}px`,
            paddingLeft: `${DIMENSIONS.SZ_6}px`
          }}
        >
          {renderSurahId()}
          {renderSurahEnglishTitleButton()}
          {renderSurahArabicTitleButton()}
        </div>
      )
    })
  }

  const renderShortcuts = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {
          SURAH_SHORTCUTS.map(surahId => {
            const href = `/#${surahId}`
            return (
              <Button
                key={href}
                onClick={() => { router.push(href) }}
              >
                {surahId}
              </Button>
            )
          })
        }
      </div>
    )
  }

  return (
    <>
      {renderShortcuts()}
      {renderSurahIndex()}
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  surahInfos: SurahInfo[]
}> = async () => {
  const koranApi: KoranApi = new KoranApiImpl()

  const surahInfos = await koranApi.getSurahInfos()

  return {
    props: {
      surahInfos
    },
  }
}

export default IndexPage
