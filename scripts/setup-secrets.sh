#!/bin/bash

# Setup GitHub Secrets Script
# This script helps you configure all required secrets for CI/CD

echo "🔐 GitHub Secrets Setup for sdms-front"
echo "========================================"
echo ""

# Check if we have the SSH key
if [ ! -f ~/.ssh/github_deploy ]; then
    echo "📝 Step 1: Generate SSH Key Pair"
    echo "--------------------------------"
    ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -C "github-actions-sdms-deploy" -N ""
    echo "✅ SSH key pair generated!"
    echo ""
else
    echo "✅ SSH key pair already exists at ~/.ssh/github_deploy"
    echo ""
fi

# Display public key
echo "📋 Step 2: Add Public Key to Server"
echo "------------------------------------"
echo "Copy this public key and add it to your server:"
echo ""
cat ~/.ssh/github_deploy.pub
echo ""
echo "Run these commands on your server (68.66.251.79:7822):"
echo ""
echo "  ssh -p 7822 deploy@68.66.251.79"
echo "  mkdir -p ~/.ssh && chmod 700 ~/.ssh"
echo "  nano ~/.ssh/authorized_keys  # Paste the key above"
echo "  chmod 600 ~/.ssh/authorized_keys"
echo "  exit"
echo ""
read -p "Press Enter when you've added the key to the server..."

# Test SSH connection
echo ""
echo "🔍 Step 3: Test SSH Connection"
echo "-------------------------------"
if ssh -i ~/.ssh/github_deploy -p 7822 -o StrictHostKeyChecking=no deploy@68.66.251.79 "echo 'Connection successful!'" 2>/dev/null; then
    echo "✅ SSH connection working!"
else
    echo "❌ SSH connection failed. Please check:"
    echo "   1. Public key is added to server's ~/.ssh/authorized_keys"
    echo "   2. Permissions are correct (600 for authorized_keys)"
    echo "   3. Server is accessible"
    exit 1
fi

# Set GitHub secrets
echo ""
echo "🚀 Step 4: Configure GitHub Secrets"
echo "------------------------------------"

echo "Setting SSH_PRIVATE_KEY..."
gh secret set SSH_PRIVATE_KEY < ~/.ssh/github_deploy

echo "Setting REMOTE_HOST..."
echo "68.66.251.79" | gh secret set REMOTE_HOST

echo "Setting REMOTE_USER..."
echo "deploy" | gh secret set REMOTE_USER

echo "Setting REMOTE_PORT..."
echo "7822" | gh secret set REMOTE_PORT

echo "Setting REMOTE_TARGET..."
echo "/var/www/alphalogique/sdms/build" | gh secret set REMOTE_TARGET

echo ""
echo "✅ All secrets configured!"
echo ""

# List secrets
echo "📋 Configured Secrets:"
echo "----------------------"
gh secret list

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "  1. Test deployment: git commit --allow-empty -m 'Test CI/CD' && git push origin master"
echo "  2. Monitor at: https://github.com/j-tee/sdms-front/actions"
echo ""
