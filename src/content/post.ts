import { type CollectionEntry, type RenderResult } from 'astro:content'

export type Post = CollectionEntry<'posts'>

const createPost = (id: string, overrides: Partial<Post['data']> = {}): Post => {
  const data: Post['data'] = {
    title: 'Test Post',
    pubDate: new Date(),
    description: 'This is a test.',
    author: 'Tester',
    tags: ['testing']
  }

  return {
    id,
    slug: `/blog/${id}`,
    body: data.description,
    collection: 'posts',
    render: async (): Promise<RenderResult> => {
      return {} as RenderResult
    },
    data: {
      ...data,
      ...overrides
    }
  }
}

export { createPost }
