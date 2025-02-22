/** @vitest-environment node */

import { expect, describe, it } from 'vitest'
import { type Post, createPost } from '../content/post.ts'
import getTags from './get-tags.ts'

describe('getTags', () => {
  const a = createPost('a', { tags: ['a', 'test'] })
  const b = createPost('b', { tags: ['b', 'test'] })

  it('returns a set of all tags from the included posts', () => {
    const actual = getTags([a, b]) as Set<string>
    expect(actual.size).toBe(3)
    for (const item of ['a', 'b', 'test']) {
      expect(actual.has(item)).toBe(true)
    }
  })
})
