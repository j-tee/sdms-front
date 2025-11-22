#!/bin/bash

# Deployment backup and restore script
# Usage: 
#   ./deploy-backup.sh backup   - Create backup before deployment
#   ./deploy-backup.sh restore  - Restore from latest backup

SERVER="deploy@68.66.251.79"
PORT="7822"
REMOTE_PATH="/var/www/alphalogique/sdms/build"
BACKUP_DIR="/var/www/alphalogique/sdms/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

case "$1" in
  backup)
    echo "Creating backup on server..."
    ssh -p $PORT $SERVER << EOF
      mkdir -p $BACKUP_DIR
      if [ -d "$REMOTE_PATH" ]; then
        tar -czf $BACKUP_DIR/build-backup-$TIMESTAMP.tar.gz -C $REMOTE_PATH .
        echo "Backup created: $BACKUP_DIR/build-backup-$TIMESTAMP.tar.gz"
        # Keep only last 10 backups
        cd $BACKUP_DIR
        ls -t build-backup-*.tar.gz | tail -n +11 | xargs -r rm
        echo "Cleanup: Kept only last 10 backups"
      else
        echo "No build directory found to backup"
      fi
EOF
    ;;
    
  restore)
    echo "Available backups:"
    ssh -p $PORT $SERVER "ls -lh $BACKUP_DIR/build-backup-*.tar.gz 2>/dev/null | tail -10"
    
    read -p "Enter backup filename to restore (or press Enter for latest): " BACKUP_FILE
    
    if [ -z "$BACKUP_FILE" ]; then
      BACKUP_FILE=$(ssh -p $PORT $SERVER "ls -t $BACKUP_DIR/build-backup-*.tar.gz 2>/dev/null | head -1")
    else
      BACKUP_FILE="$BACKUP_DIR/$BACKUP_FILE"
    fi
    
    if [ -z "$BACKUP_FILE" ]; then
      echo "No backup found!"
      exit 1
    fi
    
    echo "Restoring from: $BACKUP_FILE"
    read -p "Are you sure? This will replace current build. (yes/no): " CONFIRM
    
    if [ "$CONFIRM" = "yes" ]; then
      ssh -p $PORT $SERVER << EOF
        rm -rf $REMOTE_PATH/*
        tar -xzf $BACKUP_FILE -C $REMOTE_PATH
        echo "Restore completed!"
EOF
    else
      echo "Restore cancelled."
    fi
    ;;
    
  list)
    echo "Available backups:"
    ssh -p $PORT $SERVER "ls -lh $BACKUP_DIR/build-backup-*.tar.gz 2>/dev/null"
    ;;
    
  *)
    echo "Usage: $0 {backup|restore|list}"
    echo ""
    echo "Commands:"
    echo "  backup  - Create backup of current build"
    echo "  restore - Restore from backup"
    echo "  list    - List all available backups"
    exit 1
    ;;
esac
