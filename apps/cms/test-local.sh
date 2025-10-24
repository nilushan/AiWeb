#!/bin/bash

# Local Docker testing script for CMS
# Usage: ./apps/cms/test-local.sh

set -e

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
