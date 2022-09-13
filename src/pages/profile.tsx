import { useContext, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/_app'
import { Button } from './../components/button'

const IMG_SZ = 100

export default function ProfilePage() {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!authContext.isLoggedIn()) {
      return
    }
  }, [authContext, authContext.user, router, router.pathname])

  if (!authContext.isLoggedIn()) {
    return <></>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
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
          alignSelf: 'flex-end'
        }}
      >
        Logout
      </Button>
    </div>
  )
}
