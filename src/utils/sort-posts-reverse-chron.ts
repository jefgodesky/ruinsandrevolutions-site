import { type Post } from '../content/post.ts'

const comparePubDates = (a: Post, b: Post): number => {
  const av = a.data.pubDate.getTime()
  const bv = b.data.pubDate.getTime()
  return bv - av
}

const sortPostsReverseChron = (posts: Post[]): Post[] => {
  return posts.sort(comparePubDates)
}

export default sortPostsReverseChron
