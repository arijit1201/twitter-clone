import React, { useState, useEffect } from 'react'
import TimeAgo from 'react-timeago'
import { Comment, CommentBody, Tweet } from '../../typings'
import { fetchComments } from '../../utils/fetchComments'
import {
  ChatAlt2Icon,
  SwitchHorizontalIcon,
  HeartIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
interface Props {
  tweet: Tweet
}

function TweetComponent({ tweet }: Props) {
  const {data: session} = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState(false)
  const [inputComment, setInputComment] = useState<string>('')
  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }
  useEffect(() => {
    refreshComments()
  }, [])

  const postComment = async() => {
    const commentToast = toast.loading('Posting Comment...')
    const commentInfo: CommentBody = {
      comment: inputComment,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'user-default.png',
      tweetId: tweet._id
    }
    
    const result = await fetch('/api/addComment', {
      body: JSON.stringify(commentInfo),
      method: 'POST'
    })

    const res = await result.json()
    await refreshComments()
    toast('Comment Posted!', {
      icon: '✨',
      id: commentToast
    })
    return res
  }
  const handleSubmitComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    postComment()
    setInputComment('')
    setCommentBoxVisible(false)
  }


  return (
    <div className="flex flex-col border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1 ">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} ·
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text} </p>

          {tweet.image && (
            <img
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt=""
            />
          )}
        </div>
      </div>

      <div className=" mt-5 flex justify-between">
        <div 
        onClick ={() => session && setCommentBoxVisible(!commentBoxVisible)} 
        className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon
           className="h-5 w-5" />
          <p>{comments?.length>0 && comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/*Comment Box Logic */}

      {commentBoxVisible && (
      <form className="mt-3 flex space-x-3">
        <input
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)} 
        className="flex-1 rounded-lg bg-gray-100 p-2 outline-none placeholder:text-gray-300" placeholder='Enter your comment here...' type="text" />
        <button
        onClick={handleSubmitComment}
        disabled = {!inputComment} 
        className="text-twittered font-bold disabled:text-gray-400">Post</button>
      </form>)}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-auto scrollbar-hide border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twittered/30"/>
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="font-bold mr-1">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, '').toLowerCase()} ·
                  </p>
                  <TimeAgo
                  className="text-sm text-gray-500"
                  date={comment._createdAt}
                />
                </div>
                <p>{comment.comment}</p>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TweetComponent
