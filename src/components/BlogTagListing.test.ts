import { expect, describe, it } from 'vitest'
import render from '../utils/testing/render.ts'
import getInnerHTML from '../utils/testing/get-inner-html.ts'
import BlogTagListing from './BlogTagListing.astro'

describe('BlogTagListing', () => {
  it('renders the tags for a post', async () => {
    const tags = ['test', 'two words']
    const actual = await render(
      BlogTagListing,
      { props: { tags}}
    )

    expect(actual.querySelector('nav.tags')).not.toBeNull()
    expect(getInnerHTML(actual, 'h3')).toBe('Tags')

    const links = actual.querySelectorAll('a')
    expect(links).toHaveLength(2)
    expect(links[0].getAttribute('href')).toBe('/blog/tags/test')
    expect(links[0].innerHTML).toBe('test')
    expect(links[1].getAttribute('href')).toBe('/blog/tags/two%20words')
    expect(links[1].innerHTML).toBe('two words')
  })
})
