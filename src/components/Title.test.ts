import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, describe, it } from 'vitest'
import Title from './Title.astro'

describe('Title', () => {
  it('renders "Ruins & Revolutions" if not given anything', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Title)
    expect(result).toContain('<title>Ruins &amp; Revolutions</title>')
  })

  it('adds the string given', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Title, {
      props: { page: 'Testing' }
    })
    expect(result).toContain('<title>Testing / Ruins &amp; Revolutions</title>')
  })
})
