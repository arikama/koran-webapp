import { useContext, useEffect, useState } from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'

import { AuthContext } from './app'
import { DIMENSIONS } from '../constants/dimensions'
import { FONT } from "../constants/font"

export default function FavsPage() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

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
          justifyContent: "space-between",
          paddingLeft: `${DIMENSIONS.SZ_6}px`,
          flexDirection: "column"
        }}
      >
        <div style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          alignSelf: "end"
        }}>
          <div>Edit</div>
          <input type="checkbox" id="toggle" checked={isEditing} onClick={() => {
            setIsEditing(!isEditing)
          }}></input>
        </div>
      </div>
    </>
  )
}
