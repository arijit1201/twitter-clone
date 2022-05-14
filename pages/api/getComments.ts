  // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {sanityClient} from '../../sanity';
import { Comment } from '../../typings';
import { groq } from 'next-sanity';

type Data = {
  comments: Comment[]
}

const commentQuery = groq`*[_type == "comment" && references(*[_type=="tweet" && _id==$tweetId]._id)]{
  ...
} | order(_createdAt desc)`


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comment[]>
) {
  const {tweetId} = req.query;
  const comments: Comment[] =  await sanityClient.fetch(commentQuery, {
    tweetId,
  })
  
  res.status(200).json(comments)
}

//groq is how we query sanity cms