import { RefreshIcon } from '@heroicons/react/outline'
import React, {useState} from 'react'
import toast from 'react-hot-toast'
import { Tweet } from '../../typings'
import { fetchTweets } from '../../utils/fetchTweets'
import TweetBox from './TweetBox'
import TweetComponent from './TweetComponent'
interface Props{
  tweets: Tweet[]
}

function Feed({tweets: tweetsProp}:Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  const handleRefresh = async() => {
    const refreshToast = toast.loading("Refreshing feed...")
      const tweets = await fetchTweets();
      await setTweets(tweets)

      toast.success('Feed Updated!', {
        id: refreshToast
      })
  }
  
  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
      <div className='flex items-center justify-between'>
        <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
        <RefreshIcon onClick={handleRefresh} className="h-8 w-8 cursor-pointer text-twittered mr-5 mt-5
      transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>
      {/*Tweet Box */}
      <div>
        <TweetBox setTweets={setTweets}/>
      </div>

    <div>
      {tweets.map( (tweet) =>(
        <TweetComponent key={tweet._id} tweet={tweet}/>
        ))}
    </div>

    </div>
  )
}

export default Feed
