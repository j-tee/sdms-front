#!/bin/bash

# Quick deployment test script
# Tests SSH connection and deployment readiness

set -e

SERVER="deploy@68.66.251.79"
PORT="7822"
REMOTE_PATH="/var/www/alphalogique/sdms/build"

echo "🔍 Testing CI/CD Setup..."
echo ""

# Test 1: SSH Connection
echo "1️⃣ Testing SSH connection..."
if ssh -p $PORT -o ConnectTimeout=5 $SERVER "echo 'Connection successful!'" 2>/dev/null; then
  echo "   ✅ SSH connection working"
else
  echo "   ❌ SSH connection failed"
  echo "   Check your SSH key and server access"
  exit 1
fi

# Test 2: Remote Directory
echo ""
echo "2️⃣ Checking remote directory..."
if ssh -p $PORT $SERVER "test -d $REMOTE_PATH" 2>/dev/null; then
  echo "   ✅ Remote directory exists: $REMOTE_PATH"
else
  echo "   ⚠️  Remote directory doesn't exist"
  read -p "   Create it? (yes/no): " CREATE
  if [ "$CREATE" = "yes" ]; then
    ssh -p $PORT $SERVER "mkdir -p $REMOTE_PATH"
    echo "   ✅ Directory created"
  else
    exit 1
  fi
fi

# Test 3: Write Permissions
echo ""
echo "3️⃣ Testing write permissions..."
if ssh -p $PORT $SERVER "touch $REMOTE_PATH/.test-write && rm $REMOTE_PATH/.test-write" 2>/dev/null; then
  echo "   ✅ Write permissions OK"
else
  echo "   ❌ No write permissions"
  echo "   Run on server: sudo chown -R deploy:deploy /var/www/alphalogique/sdms"
  exit 1
fi

# Test 4: Local Build
echo ""
echo "4️⃣ Testing local build..."
if [ -f "package.json" ]; then
  echo "   ✅ package.json found"
  if [ -d "node_modules" ]; then
    echo "   ✅ node_modules exists"
  else
    echo "   ⚠️  node_modules not found"
    read -p "   Run npm install? (yes/no): " INSTALL
    if [ "$INSTALL" = "yes" ]; then
      npm install
      echo "   ✅ Dependencies installed"
    fi
  fi
else
  echo "   ❌ package.json not found"
  exit 1
fi

# Test 5: GitHub Secrets Check
echo ""
echo "5️⃣ GitHub Secrets Checklist:"
echo "   Have you configured these secrets in GitHub?"
echo "   - SSH_PRIVATE_KEY"
echo "   - REMOTE_HOST (68.66.251.79)"
echo "   - REMOTE_USER (deploy)"
echo "   - REMOTE_PORT (7822)"
echo "   - REMOTE_TARGET (/var/www/alphalogique/sdms/build)"
echo ""
read -p "   All secrets configured? (yes/no): " SECRETS
if [ "$SECRETS" != "yes" ]; then
  echo "   ⚠️  Configure secrets before pushing: Settings → Secrets → Actions"
  exit 1
fi

# Test 6: Git Status
echo ""
echo "6️⃣ Checking git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
  echo "   ✅ Git repository detected"
  BRANCH=$(git branch --show-current)
  echo "   Current branch: $BRANCH"
  
  if [ "$BRANCH" = "master" ] || [ "$BRANCH" = "main" ]; then
    echo "   ✅ On deployment branch"
  else
    echo "   ⚠️  Not on master/main branch"
    echo "   CI/CD will trigger only on master/main push"
  fi
else
  echo "   ❌ Not a git repository"
  exit 1
fi

echo ""
echo "✅ All checks passed! Your CI/CD setup is ready."
echo ""
echo "📋 Next steps:"
echo "   1. Commit your changes: git add . && git commit -m 'Setup CI/CD'"
echo "   2. Push to trigger deployment: git push origin master"
echo "   3. Monitor at: https://github.com/$(git config --get remote.origin.url | sed 's/.*:\(.*\)\.git/\1/')/actions"
echo ""
echo "🔄 Or test manual deployment:"
echo "   npm run build"
echo "   rsync -avz -e \"ssh -p $PORT\" --delete ./build/ $SERVER:$REMOTE_PATH/"
