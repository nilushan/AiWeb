# Keystatic CMS Server

This directory contains the Docker configuration for deploying the Keystatic CMS as a separate server on Google Cloud Run.

## How It Works

**Important:** Keystatic cannot run as a standalone API server. It must run within the Astro application.

This Dockerfile:
1. Builds the Astro app from `../web` in **hybrid mode** (with server-side routes)
2. Includes Keystatic admin UI and API routes
3. Packages it for deployment to Cloud Run

## Architecture

```
apps/
├── web/              # Source code for Astro + Keystatic
└── cms/
    ├── Dockerfile    # Builds ../web in hybrid mode
    └── README.md     # This file
```

## What Gets Deployed

When you deploy the CMS to Cloud Run, you're deploying:
- The full Astro application with server-side rendering
- Keystatic admin UI at `/keystatic`
- All static pages pre-rendered
- Server routes for CMS functionality

## Local Development

You don't run the CMS separately in development. Instead:

```bash
# Run from repository root
npm run dev

# This starts the Astro app with Keystatic built-in
# Access CMS at: http://localhost:4321/keystatic
```

## Building the CMS Docker Image

```bash
# From repository root
npm run build:cms

# Or manually:
docker build -f apps/cms/Dockerfile -t aiweb-cms .
```

## Local Docker Testing

To test the CMS Docker container locally:

### 1. Set up environment variables

```bash
# Copy the example env file
cp apps/cms/.env.example apps/cms/.env.cms.local

# Edit with your GitHub credentials
nano apps/cms/.env.cms.local
```

Required variables:
- `GITHUB_REPO_OWNER` - Your GitHub username/org
- `GITHUB_REPO_NAME` - Your repository name
- `GITHUB_TOKEN` - GitHub Personal Access Token with `repo` scope

### 2. Run the test script

```bash
# From repository root
./apps/cms/test-local.sh
```

Or manually:

```bash
# Build image
docker build -f apps/cms/Dockerfile -t aiweb-cms .

# Run with env file
docker run -p 8080:8080 --env-file apps/cms/.env.cms.local aiweb-cms

# Or pass env vars directly
docker run -p 8080:8080 \
  -e GITHUB_REPO_OWNER=nilushan \
  -e GITHUB_REPO_NAME=AiWeb \
  -e GITHUB_TOKEN=ghp_your_token \
  aiweb-cms
```

Access the CMS at:
- Site: `http://localhost:8080`
- Admin: `http://localhost:8080/keystatic`

## Deployment

The CMS is automatically deployed to Cloud Run via GitHub Actions when you push to `main`.

Environment variables are injected at deployment time by Cloud Run (configured in the GitHub Actions workflow).

See `DEPLOYMENT_GUIDE.md` for full deployment instructions.

## Why Separate Deployments?

Even though the CMS uses the same source code as the web app, they're deployed separately:

- **Firebase Hosting** (apps/web): Static build, no server, fast CDN delivery
- **Cloud Run** (apps/cms): Hybrid mode with Keystatic, server-side routes for admin

This gives you:
- ✅ Fast static site for visitors (Firebase CDN)
- ✅ Admin panel with server routes (Cloud Run)
- ✅ Content managed via GitHub
- ✅ Automatic rebuilds when content changes
