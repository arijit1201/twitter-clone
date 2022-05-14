import { Tweet } from '../typings'

export const fetchTweets = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);
    const data: Tweet[] = await res.json();
    //console.log(data)
    return data
}
