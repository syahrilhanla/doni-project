import type { NextPage } from 'next'
import Head from 'next/head'
import Dashboard from "./login"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bimbingan Skripsi Teknologi Pendidikan</title>
        <meta name="description" content="Bimbingan Skripsi Teknologi Pendidikan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  )
}

export default Home
