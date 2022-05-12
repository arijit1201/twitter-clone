import React from 'react'
import { Tweet } from '../../typings'

interface Props{
  tweet: Tweet
}

function TweetComponent({tweet} : Props) {
  return (
    <div>Tweet</div>
  )
}

export default TweetComponent