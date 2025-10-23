# Dockerfile for Keystatic CMS (Astro in hybrid mode)
# This builds the Astro app from ../web with server-side routes for Keystatic

FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /monorepo

# Copy workspace configuration
COPY package.json ./
COPY apps/web/package.json ./apps/web/

# Install all dependencies
RUN npm install

# Build Astro in hybrid mode with Keystatic enabled
FROM base AS builder
WORKDIR /monorepo

# Copy dependencies
COPY --from=deps /monorepo/node_modules ./node_modules
COPY --from=deps /monorepo/apps/web/node_modules ./apps/web/node_modules

# Copy web app source
COPY apps/web ./apps/web

# Build Astro with Keystatic (development mode to include CMS)
WORKDIR /monorepo/apps/web
ENV NODE_ENV=development
RUN npm run build

# Production runtime
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

# Copy built Astro application
COPY --from=builder --chown=astro:nodejs /monorepo/apps/web/dist ./dist
COPY --from=builder --chown=astro:nodejs /monorepo/apps/web/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /monorepo/apps/web/package.json ./package.json

USER astro

EXPOSE 8080

# Start Astro server (includes Keystatic routes)
CMD ["node", "./dist/server/entry.mjs"]
