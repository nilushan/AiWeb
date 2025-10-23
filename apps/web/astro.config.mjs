import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

// Site configuration
const site = process.env.SITE_URL || 'https://your-site.web.app';
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: site,
  base: base,
  output: isProduction ? 'static' : 'hybrid',
  adapter: isDevelopment ? node({
    mode: 'standalone'
  }) : undefined,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    markdoc(),
    // Only include Keystatic in development (it requires server routes)
    // In production, CMS is handled by separate Cloud Run service
    ...(isDevelopment ? [keystatic()] : []),
    sitemap(),
  ],
  image: {
    domains: [
      'your-site.web.app',
      'firebasestorage.googleapis.com',
    ],
    remotePatterns: [{ protocol: 'https' }],
  },
  vite: {
    ssr: {
      noExternal: isProduction ? ['@keystatic/core'] : [],
    },
  },
});
