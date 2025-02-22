import { type Post } from '../content/post.ts'

const getTags = (posts: Post[]): Set<string> => {
  const tags = new Set<string>()
  posts.forEach(post => {
    if (post.data.tags) {
      post.data.tags.forEach(tag => tags.add(tag))
    }
  })
  return tags
}

export default getTags
