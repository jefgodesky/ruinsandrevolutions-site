import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, describe, it } from 'vitest'
import BlogCard from './BlogCard.astro'

describe('BlogCard', () => {
  const url = '/posts/test'
  const frontmatter = {
    title: 'Test Post',
    pubDate: new Date('2025-01-01'),
    description: 'Test description',
    author: 'Tester',
    tags: ['testing']
  }

  it('renders the card for a blog post', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(BlogCard, {
      props: { frontmatter, url }
    })

    expect(result).toContain('<article class="card blog"')
    expect(result).toContain(`>${frontmatter.title}</h3>`)
    expect(result).toContain(`>${frontmatter.description}</p>`)
    expect(result).toContain(`<a href="${url}"`)
  })
})
