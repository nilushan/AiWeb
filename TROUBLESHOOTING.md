# GitHub Actions Troubleshooting Guide

## Issue: Deployment Not Happening After PR Merge

If the GitHub Action runs but doesn't deploy to GitHub Pages after merging a PR to main, follow these steps:

### 1. Check the Actions Tab

Go to your repository → Actions tab → Click on the latest workflow run

### 2. Look for the Build Job

Click on the "Build" job and check the debug output:
- **Event name** - Should show `push`
- **Ref** - Should show `refs/heads/main` or `refs/heads/master`
- **Should deploy** - Should show `true`

### 3. Check if Deploy Job Ran

Look for a "Deploy" job in the workflow run:
- ✅ **If it exists and ran**: Check the logs for errors
- ❌ **If it doesn't exist**: The condition might not be matching

### 4. Common Issues

#### Issue: Deploy job doesn't run

**Cause**: The branch might not be named `main` or `master`

**Solution**: Check your default branch name:
```bash
git branch --show-current
```

If it's something else (like `master` instead of `main`), you have two options:
1. Rename your branch to `main`
2. Update `.github/workflows/deploy.yml` to include your branch name

#### Issue: GitHub Pages not enabled

**Cause**: GitHub Pages must be configured to use GitHub Actions

**Solution**:
1. Go to repository Settings → Pages
2. Under "Source", select **GitHub Actions**
3. NOT "Deploy from a branch"

#### Issue: Permissions error

**Cause**: The workflow doesn't have permission to deploy

**Solution**: Check that the workflow has these permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

This is already in the workflow, but verify it wasn't changed.

#### Issue: Artifact not uploaded

**Cause**: The build might be failing or the artifact wasn't created

**Solution**: In the Build job logs, check for:
- ✅ "Setup Pages" step completed
- ✅ "Upload Pages artifact" step completed
- ✅ No errors in build step

#### Issue: Concurrency blocking

**Cause**: Another deployment might be in progress

**Solution**: The workflow has this set:
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

This means it waits for previous deployments to complete. Check if there are other running workflows.

### 5. Manual Deployment Test

To test if deployment works at all:

1. Go to Actions tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select branch: `main` (or your default branch)
5. Click "Run workflow"

If this works, but automatic deployment doesn't, the issue is with the trigger conditions.

### 6. Check GitHub Pages Settings

Verify GitHub Pages is properly configured:

1. Settings → Pages
2. **Source**: GitHub Actions ✅
3. Check if there's a deployment URL shown
4. Try visiting the URL

### 7. Workflow Run History

Check previous successful deployments:
1. Go to Actions tab
2. Look for green checkmarks on previous runs
3. Compare what's different between successful and failed runs

### 8. Branch Protection Rules

If you have branch protection rules:
1. Go to Settings → Branches
2. Check if there are rules on `main`
3. Ensure the rules don't block deployments

### 9. Debug with Updated Workflow

The workflow now includes debug steps that will show:
- Event name and ref for build job
- Deploy job information

Check these outputs in the logs to see what values are being used.

### 10. Force a Deployment

If you need to deploy immediately:

**Option A: Manual Trigger**
1. Actions → Deploy to GitHub Pages → Run workflow
2. Select main branch
3. Run

**Option B: Empty Commit**
```bash
git checkout main
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

## Getting Help

If none of these solutions work:

1. **Check the full workflow logs**:
   - Copy any error messages
   - Note which step failed

2. **Verify your setup**:
   - Branch name: `git branch --show-current`
   - Remote: `git remote -v`
   - Last commit: `git log -1`

3. **Common commands**:
   ```bash
   # Check current branch
   git branch --show-current

   # Check remote branches
   git branch -r

   # Check last few commits
   git log --oneline -5

   # Verify main exists
   git show-ref --verify refs/heads/main
   ```

## Expected Workflow

When everything works correctly:

```
1. Create feature branch
2. Make changes and commit
   → ✅ Build validates
   → ❌ No deployment

3. Push feature branch
   → ✅ Build validates
   → ❌ No deployment

4. Create PR to main
   → ✅ Build validates
   → ❌ No deployment

5. Merge PR to main
   → ✅ Build validates
   → ✅ Deployment happens! 🚀

6. Visit your site
   → https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

## Quick Checklist

Before reporting an issue, verify:

- [ ] GitHub Pages is enabled (Settings → Pages → Source: GitHub Actions)
- [ ] Branch is named `main` or `master` (or workflow updated for your branch)
- [ ] Workflow file exists at `.github/workflows/deploy.yml`
- [ ] Workflow has proper permissions (contents, pages, id-token)
- [ ] No other workflows are blocking with concurrency
- [ ] Build job completes successfully
- [ ] Artifact is uploaded (check build logs)
- [ ] Deploy job runs (check workflow logs)
- [ ] No errors in deployment step

---

**Note**: The workflow includes debug output as of the latest update. Check the "Debug" steps in the workflow logs for detailed information about what's happening.
