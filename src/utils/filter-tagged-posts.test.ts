/** @vitest-environment node */

import { expect, describe, it } from 'vitest'
import { type Post, createPost } from '../content/post.ts'
import filterTaggedPosts from './filter-tagged-posts.ts'

describe('filterTaggedPosts', () => {
  const a = createPost('a', { tags: ['a'] })
  const b = createPost('b', { tags: ['b'] })

  it('filters to just the posts with the given tag', () => {
    const actual = filterTaggedPosts([a, b], 'a')
    expect(actual.map((post: Post) => post.id).join('')).toBe('a')
  })
})
