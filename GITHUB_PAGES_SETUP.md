# GitHub Pages Setup Guide

## Important Note About Branch Restrictions

Due to the git proxy restrictions in this development environment, I cannot directly push to a `main` branch. All pushes must be to branches that start with `claude/` and end with the session ID.

**Current branch:** `claude/astro-cms-setup-011CULXEKtRobahQfgu2pQ4h`

## Two Options to Enable GitHub Pages

### Option 1: Use GitHub UI to Create Main Branch (Recommended)

1. **Go to your GitHub repository** at https://github.com/nilushan/AiWeb

2. **Create a Pull Request:**
   - Click on "Pull requests" tab
   - Click "New pull request"
   - Set base branch to: `main` (it will create it automatically)
   - Set compare branch to: `claude/astro-cms-setup-011CULXEKtRobahQfgu2pQ4h`
   - Click "Create pull request"
   - Review the changes and click "Merge pull request"

3. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

4. **Done!** The workflow will trigger automatically on the next push to `main`

### Option 2: Manual Deployment from Current Branch

You can manually trigger a deployment from any branch (including the current one) for testing:

1. **Enable GitHub Pages:**
   - Go to your repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Trigger Manual Deployment:**
   - Go to **Actions** tab
   - Click on "Deploy to GitHub Pages" workflow
   - Click "Run workflow"
   - Select branch: `claude/astro-cms-setup-011CULXEKtRobahQfgu2pQ4h`
   - Click "Run workflow"

3. **Site will be deployed!**
   - Watch the workflow run in the Actions tab
   - Once complete, your site will be live

**Note:**
- **All branches** get build validation on every push (catches errors early!)
- **Pull requests** to `main`/`master` will build and validate (no deployment)
- **Automatic deployments** only happen on commits/merges to `main` or `master` branches
- **Manual deployments** can be triggered from any branch via Actions tab

## After Main Branch is Created

Once you have a `main` branch (via Option 1), you can:

1. **Set it as the default branch:**
   - Go to **Settings** → **Branches**
   - Change default branch to `main`

2. **Future workflow:**
   - Make changes in feature branches
   - Create Pull Request to `main`
   - GitHub Action validates the build (no deployment)
   - Merge the PR after review
   - GitHub Pages deploys automatically after merge

3. **Content updates:**
   ```bash
   # Edit content locally
   npm run dev
   # Access Keystatic at http://localhost:4321/keystatic

   # Commit and push
   git add src/content/
   git commit -m "Add new content"
   git push

   # Merge to main via PR
   # Automatic deployment happens!
   ```

## Workflow Behavior

The GitHub Actions workflow runs differently based on the event:

### 📦 Push to Feature Branch
```
feature-branch → Push
  ↓
  ✅ Checkout code
  ✅ Install dependencies
  ✅ Build with Astro (validate)
  ❌ Skip: Pages setup
  ❌ Skip: Upload artifact
  ❌ Skip: Deploy
```
**Result:** Build validation only (catches errors early!)

### 🔀 Pull Request to Main
```
feature-branch → PR to main
  ↓
  ✅ Checkout code
  ✅ Install dependencies
  ✅ Build with Astro (validate)
  ❌ Skip: Pages setup
  ❌ Skip: Upload artifact
  ❌ Skip: Deploy
```
**Result:** Build validation (prevents broken PRs from being merged)

### 🚀 Push/Merge to Main
```
main branch → Push/Merge
  ↓
  ✅ Checkout code
  ✅ Install dependencies
  ✅ Setup Pages
  ✅ Build with Astro
  ✅ Upload Pages artifact
  ✅ Deploy to GitHub Pages
```
**Result:** Full deployment to production!

### 🎯 Manual Dispatch
```
Any branch → Manual trigger
  ↓
  ✅ All steps (same as main push)
  ✅ Deploy to GitHub Pages
```
**Result:** Manual deployment for testing

## What's Already Configured

✅ GitHub Actions workflow created
✅ **Build validation on ALL branches** (every push validates the build)
✅ Automatic deployment ONLY on push to main/master branches
✅ Build validation on pull requests (no deployment)
✅ Manual workflow dispatch enabled (works from any branch)
✅ Environment-aware build configuration
✅ Static output for GitHub Pages
✅ Keystatic CMS works locally
✅ Sitemap generation
✅ Production build tested and working

## Repository Configuration

Make sure these match your repository:

**File:** `astro.config.mjs` (lines 14-15)
```javascript
const site = process.env.SITE_URL || 'https://nilushan.github.io';
const base = process.env.BASE_PATH || '/AiWeb';
```

Update if your username or repository name is different.

## Testing the Deployment

You can test the deployment right now:

1. **Check the workflow file is committed:**
   ```bash
   git log --oneline -n 3
   ```
   You should see the commit about GitHub Actions

2. **Trigger manual deployment:**
   - Go to GitHub repository → Actions tab
   - Select "Deploy to GitHub Pages" workflow
   - Click "Run workflow"
   - Watch it build and deploy!

3. **Check the deployment:**
   - After ~2-3 minutes, visit:
   - `https://nilushan.github.io/AiWeb` (or your configured URL)

## Troubleshooting

### Workflow not appearing in Actions tab
- Make sure the `.github/workflows/deploy.yml` file is committed and pushed
- Check that you're on the right repository

### Build fails
- Check the Actions logs for specific errors
- Verify Node.js version (should be 20)
- Test build locally: `NODE_ENV=production CI=true npm run build`

### Pages not deploying
- Ensure GitHub Pages is enabled in Settings → Pages
- Check that "GitHub Actions" is selected as source
- Verify the workflow completed successfully

### Assets not loading
- Check that the `base` path in `astro.config.mjs` matches your repo name
- For user/org site (username.github.io), set `base: '/'`
- For project site (username.github.io/repo), set `base: '/repo'`

## Next Steps

1. ✅ Choose Option 1 or Option 2 above
2. ✅ Enable GitHub Pages in repository settings
3. ✅ Test the deployment
4. ✅ Update content via Keystatic locally
5. ✅ Commit and merge to main
6. ✅ Watch automatic deployments!

## Support

- Full deployment guide: See `DEPLOYMENT.md`
- Astro documentation: https://docs.astro.build
- GitHub Pages docs: https://docs.github.com/pages
- GitHub Actions docs: https://docs.github.com/actions

---

**Summary:** Due to branch naming restrictions, use the GitHub UI to create a Pull Request from the `claude/*` branch to `main`. Once merged, GitHub Pages will deploy automatically!
