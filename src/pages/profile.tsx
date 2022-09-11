import { useContext } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/_app'

export default function ProfilePage() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <u
        onClick={() => {
          authContext.updateUser!({ email: '', token: '', name: '', picture: '' })
          router.push('/')
        }}
      >
        Logout
      </u>
    </div>
  )
}
