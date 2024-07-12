import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://ruinsandrevolutions.com',
  integrations: [mdx()],
  output: "server",
  adapter: netlify()
});