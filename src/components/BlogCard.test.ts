import { expect, describe, it } from 'vitest'
import render from '../utils/testing/render.ts'
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
    const actual = await render(
      BlogCard,
      { props: { frontmatter, url }},
      true
    )

    const cardSelector = 'article.card.blog'
    const heading = actual.querySelector(cardSelector + ' h3')
    const description = actual.querySelector(cardSelector + ' p + p')
    const link = actual.querySelector(cardSelector + ' a.dest')

    expect(heading?.innerHTML).toBe(frontmatter.title)
    expect(description?.innerHTML).toBe(frontmatter.description)
    expect(link?.getAttribute('href')).toBe(url)
  })
})
