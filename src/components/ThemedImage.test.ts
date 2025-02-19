import { expect, describe, it } from 'vitest'
import render from '../utils/testing/render.ts'
import ThemedImage from './ThemedImage.astro'

describe('ThemedImage', () => {
  it('renders light and dark versions in a picture tag', async () => {
    const props: Record<string, string | string[] | number> = {
      light: '/light.png',
      dark: '/dark.png',
      alt: 'Alt text',
      height: 3000,
      width: 3000,
      classes: ['test']
    }

    const actual = await render(
      ThemedImage,
      { props }
    )

    const dark = actual?.querySelector('source[media="(prefers-color-scheme: dark)"]')
    const light = actual?.querySelector('source[media="(prefers-color-scheme: light)"]')
    const img = actual?.querySelector('img')
    const copied = ['alt', 'height', 'width']

    expect(dark?.getAttribute('srcset')).toBe(props.dark)
    expect(light?.getAttribute('srcset')).toBe(props.light)
    expect(img?.getAttribute('src')).toBe(props.light)
    expect(img?.className).toBe(['themed-image', ...(props.classes as string[])].join(' '))

    for (const attr of copied) {
      expect(img?.getAttribute(attr)).toBe(props[attr].toString())
    }
  })
})
