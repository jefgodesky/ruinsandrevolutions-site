import { type Post } from '../content/post.ts'

const filterTaggedPosts = (posts: Post[], tag: string): Post[] => {
  return posts.filter(post => post.data.tags.includes(tag))
}

export default filterTaggedPosts
