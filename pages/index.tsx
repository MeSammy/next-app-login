import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Create Auth Login App</title>
        <meta name="description" content="Auth app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="topCenter">
        <h1>Welcome Back</h1>
      </main>
    </div>
  )
}

export default Home
