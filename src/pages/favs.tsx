import { useContext, useEffect, useState } from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'

import { AuthContext } from './app'
import { DIMENSIONS } from '../constants/dimensions'
import { FONT } from "../constants/font"

export default function FavsPage() {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!authContext.isLoggedIn()) {
      router.push('/')
      return
    }
  }, [authContext, router])

  if (!authContext.isLoggedIn()) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>Favorite</title>
      </Head>
      <div
        style={{
          fontSize: FONT.FONT_SIZE_S,
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: `${DIMENSIONS.SZ_6}px`,
          flexDirection: "column"
        }}
      >
        <div>Coming soon.</div>
      </div>
    </>
  )
}
