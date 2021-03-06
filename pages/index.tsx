import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed/Feed'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgets from '../components/Widgets/Widgets'
import { Tweet } from '../typings'
import {fetchTweets} from '../utils/fetchTweets'

interface Props{
  tweets: Tweet[]
}

const Home = ({tweets}: Props) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="grid grid-cols-9">
        <Sidebar />

        <Feed tweets={tweets} />

        <Widgets />
      </main>
    </div>
  )
}

export default Home

//serverside rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  //console.log(tweets)
  return {
    props: {
      tweets,
    },
  }
}
