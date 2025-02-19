import { expect, describe, it } from 'vitest'
import render from '../utils/testing/render.ts'
import getHref from '../utils/testing/get-href.ts'
import Navigation from './Navigation.astro'

describe('Navigation', () => {
  it('renders the main navigation component', async () => {
    const actual = await render(Navigation)

    expect(getHref(actual, 'a.home')).toBe('/')
    expect(getHref(actual, 'a.blog')).toBe('/blog')
    expect(getHref(actual, 'a.catalogue')).toBe('/catalogue')
  })

  it('can specify it\'s on the homepage', async () => {
    const actual = await render(
      Navigation,
      { props: { section: 'home' } }
    )

    expect(actual?.querySelector('a.home.current')).not.toBeNull()
  })

  it('can specify it\'s on the homepage', async () => {
    const actual = await render(
      Navigation,
      { props: { section: 'blog' } }
    )

    expect(actual?.querySelector('a.blog.current')).not.toBeNull()
  })

  it('can specify it\'s on the homepage', async () => {
    const actual = await render(
      Navigation,
      { props: { section: 'catalogue' } }
    )

    expect(actual?.querySelector('a.catalogue.current')).not.toBeNull()
  })
})
