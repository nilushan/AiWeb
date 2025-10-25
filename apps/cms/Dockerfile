# Dockerfile for Keystatic CMS (Astro in hybrid mode)
# This builds the Astro app from ../web with server-side routes for Keystatic

FROM node:20-alpine AS base

# Install git and build dependencies (required for npm install)
RUN apk add --no-cache git

# Install dependencies
FROM base AS deps
WORKDIR /monorepo

# Copy workspace configuration
COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/

# Install all dependencies (workspaces install to root node_modules)
RUN npm ci

# Build Astro in hybrid mode with Keystatic enabled
FROM base AS builder
WORKDIR /monorepo

# Copy dependencies from root (npm workspaces install everything here)
COPY --from=deps /monorepo/node_modules ./node_modules
COPY --from=deps /monorepo/package.json ./package.json

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

# Copy built Astro application and dependencies
COPY --from=builder --chown=astro:nodejs /monorepo/apps/web/dist ./dist
COPY --from=builder --chown=astro:nodejs /monorepo/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /monorepo/package.json ./package.json
COPY --from=builder --chown=astro:nodejs /monorepo/apps/web/package.json ./apps/web/package.json

USER astro

EXPOSE 8080

# Start Astro server (includes Keystatic routes)
CMD ["node", "./dist/server/entry.mjs"]
