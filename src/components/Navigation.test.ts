import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, describe, it } from 'vitest'
import Navigation from './Navigation.astro'

describe('Navigation', () => {
  it('renders the main navigation component', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Navigation)

    expect(result).toContain('<a href="/" class="home"')
    expect(result).toContain('<a href="/blog" class="blog"')
    expect(result).toContain('<a href="/catalogue" class="catalogue"')
  })

  it('can specify it\'s on the homepage', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Navigation, {
      props: { section: 'home' }
    })

    expect(result).toContain('<a href="/" class="home current"')
    expect(result).toContain('<a href="/blog" class="blog"')
    expect(result).toContain('<a href="/catalogue" class="catalogue"')
  })

  it('can specify it\'s in the blog', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Navigation, {
      props: { section: 'blog' }
    })

    expect(result).toContain('<a href="/" class="home"')
    expect(result).toContain('<a href="/blog" class="blog current"')
    expect(result).toContain('<a href="/catalogue" class="catalogue"')
  })

  it('can specify it\'s in the catalogue', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Navigation, {
      props: { section: 'catalogue' }
    })

    expect(result).toContain('<a href="/" class="home"')
    expect(result).toContain('<a href="/blog" class="blog"')
    expect(result).toContain('<a href="/catalogue" class="catalogue current"')
  })
})
