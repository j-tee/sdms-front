# CI/CD Setup Guide

## Overview
This repository uses GitHub Actions to automatically build and deploy the React application to the production server whenever code is pushed to the `master` or `main` branch.

## Deployment Details
- **Deploy Method**: SSH
- **Server**: 68.66.251.79
- **Port**: 7822
- **User**: deploy
- **Target Directory**: /var/www/alphalogique/sdms/build

## Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

### Setting up GitHub Secrets
1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each of the following:

### Secret Configuration

#### 1. SSH_PRIVATE_KEY
Your SSH private key for authentication.

**To generate/get your SSH key:**
```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy"
# Save to: ~/.ssh/github_deploy

# Copy the private key
cat ~/.ssh/github_deploy
```

**Add the public key to the server:**
```bash
# Copy public key
cat ~/.ssh/github_deploy.pub

# SSH to server
ssh -p 7822 deploy@68.66.251.79

# Add to authorized_keys
echo "your-public-key-here" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**Add the PRIVATE key content to GitHub secret `SSH_PRIVATE_KEY`**

#### 2. REMOTE_HOST
```
68.66.251.79
```

#### 3. REMOTE_USER
```
deploy
```

#### 4. REMOTE_PORT
```
7822
```

#### 5. REMOTE_TARGET
```
/var/www/alphalogique/sdms/build
```

## Testing the Setup

### 1. Test SSH Connection Locally
```bash
# Test with your new key
ssh -i ~/.ssh/github_deploy -p 7822 deploy@68.66.251.79
```

### 2. Trigger GitHub Actions
```bash
# Commit and push to master/main
git add .
git commit -m "Setup CI/CD pipeline"
git push origin master
```

### 3. Monitor Deployment
- Go to your GitHub repository
- Click on **Actions** tab
- Watch the workflow execution in real-time

## Workflow Triggers

The deployment workflow runs when:
- Code is pushed to `master` or `main` branch
- Manually triggered via GitHub Actions UI (workflow_dispatch)

## Build Process

1. **Checkout**: Pulls the latest code
2. **Setup Node**: Installs Node.js 18
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Build**: Runs `npm run build` to create production build
5. **Deploy**: Uploads the `build/` folder to the server via SSH/rsync

## Manual Deployment

If you need to deploy manually:

```bash
# Build locally
npm run build

# Deploy using rsync
rsync -avz -e "ssh -p 7822" \
  --delete \
  ./build/ \
  deploy@68.66.251.79:/var/www/alphalogique/sdms/build/
```

## Troubleshooting

### SSH Permission Denied
- Ensure public key is added to server's `~/.ssh/authorized_keys`
- Check key permissions: `chmod 600 ~/.ssh/authorized_keys`
- Verify private key is correctly added to GitHub secrets

### Build Fails
- Check Node.js version compatibility
- Ensure all dependencies are in `package.json`
- Review build logs in GitHub Actions

### Deployment Fails
- Verify server path exists: `/var/www/alphalogique/sdms/build`
- Check deploy user has write permissions
- Ensure port 7822 is accessible from GitHub Actions runners

### Testing Connection
```bash
# Test from local machine
ssh -p 7822 deploy@68.66.251.79 "ls -la /var/www/alphalogique/sdms/"
```

## Server Permissions

Ensure the deploy user has proper permissions:

```bash
# On the server
sudo chown -R deploy:deploy /var/www/alphalogique/sdms
sudo chmod -R 755 /var/www/alphalogique/sdms
```

## Security Best Practices

1. **Use dedicated deploy key** - Don't use your personal SSH key
2. **Restrict deploy user** - Give minimal necessary permissions
3. **Rotate keys regularly** - Update SSH keys periodically
4. **Monitor deployments** - Review GitHub Actions logs
5. **Use branch protection** - Require reviews before merging to main

## Alternative: Manual Trigger

To deploy without pushing code:

1. Go to **Actions** tab in GitHub
2. Select **Build and Deploy** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## Notifications

To add Slack/Discord notifications on deployment:

1. Add webhook URL to GitHub secrets
2. Update `.github/workflows/deploy.yml` with notification step

## Rollback

If deployment causes issues:

```bash
# SSH to server
ssh -p 7822 deploy@68.66.251.79

# Backup current build
cd /var/www/alphalogique/sdms
cp -r build build-backup-$(date +%Y%m%d-%H%M%S)

# You can restore from backup if needed
```

## Environment Variables

If your app uses environment variables:

1. Create `.env.production` file
2. Add secrets to GitHub
3. Update workflow to create env file during build

Example:
```yaml
- name: Create env file
  run: |
    echo "REACT_APP_API_URL=${{ secrets.API_URL }}" >> .env.production
```

## Next Steps

1. ✅ Set up GitHub secrets
2. ✅ Test SSH connection
3. ✅ Push to trigger first deployment
4. ✅ Monitor GitHub Actions
5. ✅ Verify deployment on server
6. ✅ Test application in browser

## Support

For issues with deployment:
- Check GitHub Actions logs
- Review server logs: `journalctl -u nginx` or `journalctl -u apache2`
- Verify file permissions on server
