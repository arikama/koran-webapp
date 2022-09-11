import { useContext } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/_app'
import { Button } from './../components/button'

export default function ProfilePage() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <Button
        onClick={() => {
          authContext.updateUser!({ email: '', token: '', name: '', picture: '' })
          router.push('/')
        }}
      >
        Logout
      </Button>
    </div>
  )
}
