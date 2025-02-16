import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, describe, it, afterEach, afterAll } from 'vitest'
import MatchMediaMock from 'vitest-matchmedia-mock'
import ThemedImage from './ThemedImage.astro'

describe('ThemedImage', () => {
  let matchMediaMock = new MatchMediaMock();
  const props = {
    light: '/light.png',
    dark: '/dark.png',
    alt: 'Test image',
    height: '100px',
    width: '100px',
    classes: 'custom'
  }

  afterEach(() => {
    localStorage.clear()
    matchMediaMock.clear()
  })

  afterAll(() => {
    matchMediaMock.destroy()
  })

  const expectContains = (result: string, contains: string, not: string): void => {
    expect(result).toContain(contains)
    expect(result).not.toContain(not)
  }

  const expectLight = (result: string): void => {
    expectContains(result, `src="${props.light}"`, `src="${props.dark}"`)
  }

  const expectDark = (result: string): void => {
    expectContains(result, `src="${props.dark}"`, `src="${props.light}"`)
  }

  it('renders the light image when localStorage is set to "light"', async () => {
    localStorage.setItem('theme', 'light')
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemedImage, { props })
    expectLight(result)
  })

  it('renders the dark image when localStorage is set to "dark"', async () => {
    localStorage.setItem('theme', 'dark')
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemedImage, { props })
    expectDark(result)
  })

  it('renders the light image when no stored theme but prefers-color-scheme is light', async () => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: light)')
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemedImage, { props })
    expectLight(result)
  })

  it('renders the dark image when no stored theme but prefers-color-scheme is dark', async () => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)')
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemedImage, { props })
    expectDark(result)
  })

  it('renders the light image when no stored theme and matchMedia returns nothing', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemedImage, { props })
    expectLight(result)
  })
})
