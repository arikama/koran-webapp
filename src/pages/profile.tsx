import { useContext, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/app'
import { Button } from './../components/button'
import { DIMENSIONS } from "../constants/dimensions"

const IMG_SZ = 100

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: `${DIMENSIONS.SZ_6}px`,
        paddingRight: `${DIMENSIONS.SZ_6}px`
      }}
    >
      <Image
        src={authContext.user!.picture}
        alt='profile picture'
        width={IMG_SZ}
        height={IMG_SZ}
      />
      &nbsp;
      <div>{authContext.user!.name}</div>
      &nbsp;
      <div>{authContext.user!.email}</div>
      &nbsp;
      <Button
        onClick={() => {
          authContext.updateUser({ email: '', token: '', name: '', picture: '' })
          router.push('/')
        }}
        style={{
          alignSelf: 'flex-end',
          paddingRight: 0,
        }}
      >
        logout
      </Button>
    </div>
  )
}
