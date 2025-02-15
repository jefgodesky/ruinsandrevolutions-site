/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {
    test: {

    }
  }, {
    site: 'https://example.com/',
    trailingSlash: 'always'
  }
)
