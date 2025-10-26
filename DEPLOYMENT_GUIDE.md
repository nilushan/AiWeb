# Production Deployment Guide

This guide covers deploying the AiWeb monorepo to production with:
- **Static site** → Firebase Hosting
- **CMS server** → Google Cloud Run

## Architecture

```
┌─────────────────────────────────────────┐
│         Firebase Hosting                │
│     (Static Astro Site)                 │
│  https://your-site.web.app              │
└─────────────┬───────────────────────────┘
              │
              │ API Calls
              ▼
┌─────────────────────────────────────────┐
│      Google Cloud Run                   │
│   (Keystatic CMS Server)                │
│  https://cms.run.app/api/keystatic      │
└─────────────┬───────────────────────────┘
              │
              │ Git Operations
              ▼
┌─────────────────────────────────────────┐
│         GitHub Repository               │
│     (Content Storage)                   │
└─────────────────────────────────────────┘
```

## Prerequisites

1. **Google Cloud Platform Account**
   - Create a GCP project
   - Enable Cloud Run API
   - Enable Container Registry API

2. **Firebase Account**
   - Create a Firebase project (can link to existing GCP project)
   - Enable Hosting

3. **GitHub Repository**
   - Repository with your content
   - GitHub Personal Access Token with `repo` permissions

## Initial Setup

### 1. Firebase Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init hosting

# Select:
# - Use existing project or create new
# - Public directory: apps/web/dist
# - Configure as single-page app: Yes
# - Don't overwrite existing files
```

### 2. Google Cloud Setup

```bash
# Install gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Login to Google Cloud
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 3. Create Service Accounts

#### Firebase Service Account

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file securely

#### GCP Service Account

```bash
# Create service account
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Deployment"

# Grant necessary roles
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Create and download key
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

### 4. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and Variables → Actions

#### Secrets

Add the following secrets:

```
FIREBASE_SERVICE_ACCOUNT
  - Paste entire JSON from Firebase service account key

GCP_SERVICE_ACCOUNT_KEY
  - Paste entire JSON from GCP service account key

GITHUB_TOKEN
  - Create GitHub Personal Access Token with 'repo' scope
  - This is for CMS to access your repository
```

#### Variables

Add the following variables:

```
FIREBASE_PROJECT_ID
  - Your Firebase project ID

GCP_PROJECT_ID
  - Your Google Cloud project ID

SITE_URL
  - Your Firebase Hosting URL (e.g., https://your-site.web.app)

BASE_PATH
  - Base path for your site (usually '/')

CMS_API_URL
  - Cloud Run service URL (will be available after first deployment)
  - Format: https://keystatic-cms-xxx.run.app/api/keystatic

GITHUB_REPO_OWNER
  - Your GitHub username/org

GITHUB_REPO_NAME
  - Your repository name
```

## Deployment Process

### Automated Deployment (Recommended)

The GitHub Actions workflow automatically deploys on push to `main` or `master`:

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

The workflow will:
1. Build the static site
2. Deploy to Firebase Hosting
3. Build the CMS Docker image
4. Push to Google Container Registry
5. Deploy to Cloud Run

### Manual Deployment

#### Deploy Static Site

```bash
# Build the web app
cd apps/web
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

#### Deploy CMS Server

⚠️ **Important:** Docker build commands must be run from the repository root!

```bash
# Build Docker image (from repository root!)
docker build -f apps/cms/Dockerfile -t gcr.io/YOUR_PROJECT_ID/keystatic-cms .
#            ^^^ Dockerfile path      Build context = repo root ^

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/keystatic-cms

# Deploy to Cloud Run
gcloud run deploy keystatic-cms \
  --image gcr.io/YOUR_PROJECT_ID/keystatic-cms \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production,GITHUB_REPO_OWNER=your-username,GITHUB_REPO_NAME=your-repo" \
  --set-secrets "GITHUB_TOKEN=github-token:latest"
```

**What gets deployed:** The CMS deployment builds the Astro app from `apps/web` in hybrid mode (with server-side routes for Keystatic), packages it in a container, and deploys to Cloud Run. It's the same source code as the static site, just built differently to include the admin UI.

## Environment Configuration

### Web App (.env)

```bash
SITE_URL=https://your-site.web.app
BASE_PATH=/
PUBLIC_CMS_API_URL=https://your-cms.run.app/api/keystatic
```

### CMS Server (.env)

```bash
PORT=8080
NODE_ENV=production
GITHUB_REPO_OWNER=your-username
GITHUB_REPO_NAME=your-repo
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
ALLOWED_ORIGINS=https://your-site.web.app
```

## Local Development

### Setup

```bash
# Install dependencies
npm install

# Copy environment files
cp apps/web/.env.example apps/web/.env
cp apps/cms/.env.example apps/cms/.env

# Update with your values
```

### Run Development Servers

```bash
# Terminal 1 - Web app
npm run dev:web

# Terminal 2 - CMS server (optional, only if testing API mode)
npm run dev:cms
```

The web app will run at `http://localhost:4321` and includes the Keystatic admin at `http://localhost:4321/keystatic` in development mode.

## Troubleshooting

### Static Site Issues

**Build fails:**
```bash
# Check build locally
cd apps/web
npm run build
```

**Firebase deployment fails:**
```bash
# Verify Firebase configuration
firebase projects:list
firebase hosting:sites:list
```

### CMS Server Issues

**Cloud Run deployment fails:**
```bash
# Check Cloud Run logs
gcloud run services logs read keystatic-cms --region=us-central1

# Test Docker image locally (from repository root)
docker build -f apps/cms/Dockerfile -t gcr.io/YOUR_PROJECT_ID/keystatic-cms .
docker run -p 8080:8080 \
  -e GITHUB_REPO_OWNER=your-username \
  -e GITHUB_REPO_NAME=your-repo \
  -e GITHUB_TOKEN=ghp_your_token \
  gcr.io/YOUR_PROJECT_ID/keystatic-cms
```

**CMS can't access GitHub:**
- Verify GITHUB_TOKEN has repo permissions
- Check Cloud Run environment variables
- Verify CORS settings allow your site origin

### GitHub Actions Issues

**Workflow fails:**
- Check GitHub Actions logs
- Verify all secrets and variables are set
- Ensure service accounts have correct permissions

## Security Considerations

1. **Service Account Keys**: Store securely, never commit to repository
2. **GitHub Token**: Use fine-grained tokens with minimum required permissions
3. **CORS**: Restrict ALLOWED_ORIGINS to your actual domain
4. **Cloud Run**: Consider adding authentication for production CMS access
5. **Firebase**: Configure security rules appropriately

## Cost Optimization

### Firebase Hosting
- Free tier: 10GB storage, 360MB/day transfer
- Caching configured in firebase.json

### Cloud Run
- Configured with:
  - Min instances: 0 (scale to zero when idle)
  - Max instances: 10
  - 512Mi memory, 1 CPU
  - 300s timeout
- Estimated cost: $0-5/month for low traffic

## Monitoring

### Firebase

```bash
# View hosting analytics
firebase hosting:channel:list
```

### Cloud Run

```bash
# View service details
gcloud run services describe keystatic-cms --region=us-central1

# View logs
gcloud run services logs read keystatic-cms --region=us-central1 --limit=50

# View metrics in GCP Console
https://console.cloud.google.com/run
```

## Updating

### Update Dependencies

```bash
# Update all workspaces
npm update

# Update specific workspace
npm update --workspace=apps/web
npm update --workspace=apps/cms
```

### Redeploy

Push changes to main branch or run workflow manually via GitHub Actions UI.

## Rollback

### Firebase Hosting

```bash
# List previous deployments
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback
```

### Cloud Run

```bash
# List revisions
gcloud run revisions list --service=keystatic-cms --region=us-central1

# Rollback to specific revision
gcloud run services update-traffic keystatic-cms \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

## Support

For issues:
- Check GitHub Actions logs
- Review Cloud Run logs
- Check Firebase console
- Verify environment variables and secrets
