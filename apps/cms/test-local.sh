#!/bin/bash

# Local Docker testing script for CMS
# Usage: ./apps/cms/test-local.sh (from repository root)

set -e

# Check we're in the repository root
if [ ! -f "package.json" ] || [ ! -d "apps/cms" ] || [ ! -d "apps/web" ]; then
    echo "❌ Error: This script must be run from the repository root!"
    echo ""
    echo "Current directory: $(pwd)"
    echo ""
    echo "Usage:"
    echo "  cd /path/to/AiWeb"
    echo "  ./apps/cms/test-local.sh"
    exit 1
fi

echo "✓ Running from repository root: $(pwd)"
echo ""
echo "🔨 Building CMS Docker image..."
docker build -f apps/cms/Dockerfile -t aiweb-cms .

echo ""
echo "🚀 Starting CMS container..."
echo "Environment variables will be loaded from apps/cms/.env.cms.local"
echo ""

if [ ! -f apps/cms/.env.cms.local ]; then
    echo "❌ Error: apps/cms/.env.cms.local not found!"
    echo "Copy apps/cms/.env.example to apps/cms/.env.cms.local and update with your values"
    exit 1
fi

docker run -p 8080:8080 --env-file apps/cms/.env.cms.local aiweb-cms

echo ""
echo "✅ CMS running at http://localhost:8080"
echo "📝 Keystatic admin at http://localhost:8080/keystatic"
