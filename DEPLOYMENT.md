# Deployment Guide

This guide covers deploying your AiWeb site to GitHub Pages.

## GitHub Pages Deployment

### Prerequisites

1. A GitHub account
2. Your repository pushed to GitHub
3. GitHub Pages enabled in your repository settings

### Setup Instructions

#### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Navigate to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

#### 2. Configure Repository Settings

Update the `astro.config.mjs` file with your repository information:

```javascript
const site = process.env.SITE_URL || 'https://YOUR_USERNAME.github.io';
const base = process.env.BASE_PATH || '/YOUR_REPO_NAME';
```

For example:
- If your repo is `username/AiWeb`, use:
  - site: `https://username.github.io`
  - base: `/AiWeb`
- If your repo is `username/username.github.io` (user/org site), use:
  - site: `https://username.github.io`
  - base: `/`

#### 3. Push to Main Branch

The GitHub Action will automatically trigger when you push to the `main` or `master` branch:

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

#### 4. Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Once complete, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Manual Deployment

You can also manually trigger the deployment:

1. Go to the **Actions** tab
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## How It Works

### Development vs Production

The configuration automatically detects the environment:

**Development** (Local):
- Output: `hybrid` mode
- Adapter: Node.js
- Keystatic CMS: Available at `/keystatic`
- Base path: `/` (root)

**Production** (GitHub Pages):
- Output: `static` mode
- Adapter: None (static files only)
- Keystatic CMS: Not included (content managed locally)
- Base path: `/YOUR_REPO_NAME`

### Content Management Workflow

Since GitHub Pages is static hosting, content is managed locally:

1. **Local Development**:
   ```bash
   npm run dev
   ```
   - Access Keystatic CMS at `http://localhost:4321/keystatic`
   - Create/edit blog posts and knowledge base articles
   - Content is saved as files in `src/content/`

2. **Commit Content**:
   ```bash
   git add src/content/
   git commit -m "Add new blog post"
   git push origin main
   ```

3. **Automatic Deployment**:
   - GitHub Action triggers
   - Site rebuilds with new content
   - Deployed to GitHub Pages

### GitHub Action Workflow

The workflow (`.github/workflows/deploy.yml`) does the following:

1. **Checkout**: Clones your repository
2. **Setup**: Installs Node.js and configures GitHub Pages
3. **Install**: Runs `npm ci` to install dependencies
4. **Build**: Builds your Astro site with `npm run build`
   - Sets `NODE_ENV=production` and `CI=true`
   - Uses site URL and base path from GitHub Pages config
5. **Upload**: Uploads the built site as an artifact
6. **Deploy**: Deploys the artifact to GitHub Pages

## Troubleshooting

### Build Fails

**Check Node.js Version**:
The workflow uses Node.js 20. Ensure your local development uses a compatible version.

**Check Build Locally**:
```bash
export NODE_ENV=production
export CI=true
npm run build
```

### Assets Not Loading

**Base Path Issue**:
If CSS/JS files aren't loading, check that the `base` path in `astro.config.mjs` matches your repository name.

### 404 Errors

**GitHub Pages Not Enabled**:
Make sure GitHub Pages is enabled in your repository settings and set to "GitHub Actions" as the source.

**Wrong Branch**:
Ensure you're pushing to `main` or `master` branch (as configured in the workflow).

## Custom Domain

To use a custom domain with GitHub Pages:

1. Go to **Settings** > **Pages**
2. Add your custom domain
3. Update `astro.config.mjs`:
   ```javascript
   const site = process.env.SITE_URL || 'https://yourdomain.com';
   const base = '/'; // Root for custom domain
   ```
4. Configure DNS records with your domain provider

## Alternative Deployment Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables: `NODE_ENV=production`, `CI=true`

### Vercel

1. Import your GitHub repository
2. Vercel auto-detects Astro
3. Deploy!

### Cloudflare Pages

1. Connect your repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variables: `NODE_ENV=production`

## Security Notes

- The Keystatic admin interface is **not exposed** in production builds
- Content management happens locally and is committed to Git
- All content is version-controlled and auditable
- GitHub Actions runs in a secure, isolated environment

## Performance

GitHub Pages deployment includes:
- ✅ Static file serving (fast CDN)
- ✅ Automatic HTTPS
- ✅ Optimized images
- ✅ Minified CSS/JS
- ✅ Perfect Lighthouse scores

## Support

For issues specific to:
- **GitHub Actions**: Check the Actions tab logs
- **Astro Build**: Run `npm run build` locally with production env vars
- **GitHub Pages**: Check GitHub's documentation

---

Happy deploying! 🚀
