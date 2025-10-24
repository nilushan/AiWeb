# Local Development Guide

Quick guide to set up and run AiWeb locally.

## Prerequisites

- Node.js 18+ and npm
- Git
- GitHub account

## Setup

### 1. Install Dependencies

```bash
npm install
```

This installs dependencies for all workspaces.

### 2. Configure Environment Variables

```bash
# Copy the environment template
cp apps/web/.env.example apps/web/.env

# Edit the file
nano apps/web/.env  # or use your preferred editor
```

**Required for Keystatic CMS:**
- `GITHUB_REPO_OWNER` - Your GitHub username (e.g., `nilushan`)
- `GITHUB_REPO_NAME` - Your repository name (e.g., `AiWeb`)
- `GITHUB_TOKEN` - (Optional) GitHub Personal Access Token

**Creating a GitHub Token:**

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `AiWeb Local Development`
4. Select scope: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)
7. Paste into your `.env` file: `GITHUB_TOKEN=ghp_your_token_here`

**Note:** If you don't set a `GITHUB_TOKEN`, Keystatic will use OAuth and open a browser window for authentication when you first access the admin.

### 3. Run Development Server

```bash
npm run dev
```

This starts the Astro development server with hot-reload.

**Access:**
- Website: http://localhost:4321
- Keystatic Admin: http://localhost:4321/keystatic

## How .env Files Work

Astro automatically loads environment variables from `.env` files in this order:

1. `.env` - Committed to git (should contain example values only)
2. `.env.local` - **Not committed** - Your personal local config
3. `.env.production` - Production-specific variables
4. `.env.production.local` - **Not committed** - Local production overrides

**Best Practice:**
- Use `apps/web/.env.local` for your personal credentials
- Never commit files with real tokens/secrets
- `.gitignore` already excludes `.env.local` and `.env.*.local`

## Environment Variable Prefixes

Astro has special handling for environment variables:

- **`PUBLIC_*`** - Available in browser (client-side)
- **No prefix** - Server-only, not exposed to client

Example:
```bash
# Server-side only (secure)
GITHUB_TOKEN=ghp_secret

# Available in browser (public)
PUBLIC_GA_ID=UA-12345
```

## Common Tasks

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Clean build artifacts
```bash
npm run clean
```

## Keystatic CMS

Access the CMS at http://localhost:4321/keystatic

**Content Types:**
- **Blog Posts** - Articles for the blog
- **Knowledge Base** - Documentation and guides
- **Pages** - Custom pages with dynamic sections

**Where content is stored:**
- All content lives in `apps/web/src/content/`
- Content is stored as Markdown/MDOC files
- Committed to your GitHub repository

## Project Structure

```
AiWeb/
├── apps/
│   └── web/              # Astro application
│       ├── src/
│       │   ├── pages/    # Routes (file-based routing)
│       │   ├── content/  # CMS content (posts, KB, pages)
│       │   └── components/
│       ├── public/       # Static assets
│       ├── .env          # Environment template
│       └── .env.local    # Your local config (git-ignored)
├── package.json          # Workspace configuration
└── README.md
```

## Troubleshooting

### Keystatic admin not loading

**Issue:** Admin UI shows errors or doesn't load

**Solutions:**
1. Check your GitHub token is set in `.env.local`
2. Verify token has `repo` scope
3. Make sure repository owner/name match your GitHub repo

### Environment variables not loading

**Issue:** Variables from `.env` aren't available

**Solutions:**
1. Ensure file is named exactly `.env` or `.env.local`
2. Place it in `apps/web/` directory, not root
3. Restart the dev server (`npm run dev`)
4. Check for typos in variable names

### Content not saving

**Issue:** Keystatic admin can't save changes

**Solutions:**
1. Verify `GITHUB_TOKEN` has write permissions
2. Check GitHub repository owner/name are correct
3. Ensure you have push access to the repository

### Port 4321 already in use

**Issue:** Dev server won't start

**Solution:**
```bash
# Kill the process using port 4321
lsof -ti:4321 | xargs kill

# Or use a different port
npm run dev -- --port 3000
```

## Need Help?

- **Deployment:** See `DEPLOYMENT_GUIDE.md`
- **README:** See `README.md`
- **Astro Docs:** https://docs.astro.build
- **Keystatic Docs:** https://keystatic.com/docs
