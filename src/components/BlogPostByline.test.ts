import { expect, describe, it } from 'vitest'
import render from '../utils/testing/render.ts'
import getInnerHtml from '../utils/testing/get-inner-html.ts'
import BlogPostByline from './BlogPostByline.astro'

describe('BlogPostByline', () => {
  it('renders the byline for a blog post', async () => {
    const pubDate = new Date('2025-01-01')
    const author = 'Tester'
    const readableDate = pubDate.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })

    const actual = await render(
      BlogPostByline,
      { props: { author, pubDate }}
    )

    const time = actual.querySelector( 'p.byline time')
    expect(getInnerHtml(actual, 'p.byline span')).toBe(author)
    expect(time?.getAttribute('datetime')).toBe('2025-01-01T00:00:00.000Z')
    expect(time?.innerHTML).toBe(readableDate)
  })
})
