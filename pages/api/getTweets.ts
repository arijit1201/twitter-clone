// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {sanityClient} from '../../sanity';
import { Tweet } from '../../typings';
import { groq } from 'next-sanity';

type Data = {
  tweets: Tweet[]
}

const feedQuery = groq`
*[_type == "tweet" && (!blockTweet || blockTweet==undefined)]{
  ...
} | order(_createdAt desc)
`


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tweet[]>
) {
  const tweets: Tweet[] =  await sanityClient.fetch(feedQuery)
  console.log(tweets) 
  res.status(200).json(tweets)
}

//groq is how we query sanity cms