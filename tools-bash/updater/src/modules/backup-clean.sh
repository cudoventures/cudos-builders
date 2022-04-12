#!/bin/bash -i

echo -ne "Creating backup lock file...";
echo "" > "$LOCK_BACKUP_CREATE"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Removing old backups...";
rm -rf "$PARAM_SOURCE_DIR/CudosData-backup"
rm -rf "$PARAM_SOURCE_DIR/CudosNode-backup"
rm -rf "$PARAM_SOURCE_DIR/CudosGravityBridge-backup"
rm -rf "$PARAM_SOURCE_DIR/CudosBuilders-backup"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Releasing backup lock file...";
rm -f "$LOCK_BACKUP_CREATE"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

