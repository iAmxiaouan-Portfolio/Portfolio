#!/bin/bash
# IAMXIAOXUAN Portfolio — One-click deploy to GitHub Pages
set -e

echo "🔐 Step 1: Login to GitHub..."
gh auth login

echo ""
echo "📦 Step 2: Creating GitHub repo..."
gh repo create iamxiaoxuan-portfolio --public --source=. --push

echo ""
echo "🌐 Step 3: Enabling GitHub Pages..."
gh api repos/{owner}/{repo}/pages \
  --method POST \
  -f "source[branch]=main" \
  -f "source[path]=/" 2>/dev/null || true

echo ""
echo "✅ Done! Your site will be live in ~1 min at:"
OWNER=$(gh api user -q .login)
echo "   https://${OWNER}.github.io/iamxiaoxuan-portfolio/"
echo ""
echo "You can also set a custom domain later in repo Settings > Pages."
