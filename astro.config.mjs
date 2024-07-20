import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://ruinsandrevolutions.com',
  integrations: [mdx(), react()],
  output: "server",
  adapter: netlify()
});