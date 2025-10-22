import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// Determine if we're building for production (static) or development (hybrid with Keystatic admin)
const isProduction = process.env.CI === 'true' || process.env.NODE_ENV === 'production';

// GitHub Pages configuration
// Update these values based on your repository
const site = process.env.SITE_URL || 'https://nilushan.github.io';
const base = process.env.BASE_PATH || '/AiWeb/';

// https://astro.build/config
export default defineConfig({
  site: site,
  base: isProduction ? base : '/',
  output: isProduction ? 'static' : 'hybrid',
  adapter: isProduction ? undefined : node({
    mode: 'standalone'
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    markdoc(),
    // Only include Keystatic in development (it requires server routes)
    ...(isProduction ? [] : [keystatic()]),
    sitemap(),
  ],
  image: {
    domains: ['nilushan.github.io', 'github.io'],
    remotePatterns: [{ protocol: 'https' }],
  },
  vite: {
    ssr: {
      noExternal: isProduction ? ['@keystatic/core'] : [],
    },
  },
});
