export type TweetBody = {
    text: string
    username: string
    profileImg: string
    image?: string
}

export interface Tweet extends TweetBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'Tweet'
    blockTweet: boolean
}

export type CommentBody = {
    comment: string
    username: string
    profileImg: string
    tweetId: string
}
export interface Comment extends CommentBody{
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'Comment'
    tweet: {
        _ref: string
        _type: "reference"
    }
}