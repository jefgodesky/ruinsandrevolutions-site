/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {
    test: {
      environment: 'happy-dom'
    }
  }, {
    site: 'https://example.com/',
    trailingSlash: 'always'
  }
)
