// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  output: 'server',
  site: isProd ? 'https://ruinsandrevolutions.com' : undefined,
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '4321'),
  },
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(), mdx()]
})
