/** @vitest-environment node */

import { expect, describe, it } from 'vitest'
import { type Post, createPost } from '../content/post.ts'
import sortPostsReverseChron from './sort-posts-reverse-chron.ts'

describe('sortPostsReverseChron', () => {
  const a = createPost('a', { pubDate: new Date('2025-01-01') })
  const b = createPost('b', { pubDate: new Date('2025-01-02') })

  it('sorts posts in reverse chronological order', () => {
    const actual = sortPostsReverseChron([a, b])
    expect(actual.map((post: Post) => post.id).join('')).toBe('ba')
  })
})
