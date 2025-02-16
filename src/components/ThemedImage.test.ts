import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, describe, it } from 'vitest'
import ThemedImage from './ThemedImage.astro'

describe('ThemedImage', () => {
  it('renders light and dark versions in a picture tag', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemedImage, {
      props: {
        light: '/light.png',
        dark: '/dark.png',
        alt: 'Alt text',
        height: 3000,
        width: 3000,
        classes: ['test']
      }
    })
    expect(result).toBe('<picture data-astro-source-file="/Users/jefgodesky/Sites/ruinsandrevolutions/site/src/components/ThemedImage.astro" data-astro-source-loc="35:10"> <source media="(prefers-color-scheme: dark)" srcset="/dark.png" data-astro-source-file="/Users/jefgodesky/Sites/ruinsandrevolutions/site/src/components/ThemedImage.astro" data-astro-source-loc="36:4"> <source media="(prefers-color-scheme: light)" srcset="/light.png" data-astro-source-file="/Users/jefgodesky/Sites/ruinsandrevolutions/site/src/components/ThemedImage.astro" data-astro-source-loc="37:4"> <img src="/light.png" alt="Alt text" height="3000" width="3000" class="themed-image test" data-astro-source-file="/Users/jefgodesky/Sites/ruinsandrevolutions/site/src/components/ThemedImage.astro" data-astro-source-loc="38:4"> </picture>')
  })
})
