import { useContext, useEffect } from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'

import { AuthContext } from './app'
import { FONT } from "../constants/font"

export default function ProfilePage() {
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
        <title>Favorites</title>
      </Head>
      <div
        style={{
          fontSize: FONT.FONT_SIZE_S,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>Coming soon.</div>
      </div>
    </>
  )
}
