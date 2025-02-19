import { expect, describe, it } from 'vitest'
import render from '../utils/testing/render.ts'
import getInnerHTML from '../utils/testing/get-inner-html.ts'
import Title from './Title.astro'

describe('Title', () => {
  const site = 'Ruins &amp; Revolutions'

  it('renders "Ruins & Revolutions" if not given anything', async () => {
    const actual = await render(Title)
    expect(getInnerHTML(actual, 'title')).toBe(site)
  })

  it('adds the string given', async () => {
    const page = 'Testing'
    const actual = await render(
      Title,
      { props: { page } }
    )

    expect(getInnerHTML(actual, 'title')).toBe(`${page} / ${site}`)
  })
})
