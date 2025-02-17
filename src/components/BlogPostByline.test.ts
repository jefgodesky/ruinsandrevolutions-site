import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, describe, it } from 'vitest'
import BlogPostByline from './BlogPostByline.astro'

describe('BlogPostByline', () => {
  it('renders the byline for a blog post', async () => {
    const container = await AstroContainer.create()
    const pubDate = new Date('2025-01-01')
    const readableDate = pubDate.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })
    const result = await container.renderToString(BlogPostByline, {
      props: { author: 'Tester', pubDate }
    })

    expect(result).toContain('<p class="byline"')
    expect(result).toContain('>Tester</span>')
    expect(result).toContain('<time datetime="2025-01-01T00:00:00.000Z"')
    expect(result).toContain('>Wednesday, January 1, 2025</time> </p>')
  })
})
