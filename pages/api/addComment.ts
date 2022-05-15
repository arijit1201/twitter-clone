  // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
  import type { NextApiRequest, NextApiResponse } from 'next'
  import { CommentBody } from '../../typings';
  import { groq } from 'next-sanity';
  
  type Data = {
    message: string  
}
  
 
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    
    const data: CommentBody = JSON.parse(req.body);

    const mutations = {
        mutations: [
            {
                create: {
                    _type: 'comment',
                    comment: data.comment,
                    username: data.username,
                    profileImg: data.profileImg,
                    tweet: {
                      _type: 'reference',
                      _ref: data.tweetId
                    }
                }
            }
    ]
    }

    const apiEndPoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
    
    const result = await fetch(apiEndPoint, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
        },
        body: JSON.stringify(mutations),
        method: 'POST'
    })
    res.status(200).json({message: "Added Comment!"})
  }
  
  //groq is how we query sanity cms