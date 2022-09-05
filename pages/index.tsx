import Link from 'next/link'
import type { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <>
      <div>home page</div>
      <Link href='/login'><button>login</button></Link>
    </>
  )
}

export default HomePage
