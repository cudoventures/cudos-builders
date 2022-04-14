#!/bin/bash -i

echo -ne "Creating backup lock file...";
echo "" > "$LOCK_BACKUP_CREATE"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Removing old backups...";
rm -rf "$PARAM_SOURCE_DIR/CudosData/$VOLUME_NAME-backup"
rm -rf "$PARAM_SOURCE_DIR/CudosNode-backup"
rm -rf "$PARAM_SOURCE_DIR/CudosGravityBridge-backup"
rm -rf "$PARAM_SOURCE_DIR/CudosBuilders-backup"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Creating a backup...";
\cp -r "$PARAM_SOURCE_DIR/CudosData/$VOLUME_NAME" "$PARAM_SOURCE_DIR/CudosData/$VOLUME_NAME-backup"
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to copy $PARAM_SOURCE_DIR/CudosData/$VOLUME_NAME. Make sure you have enough space.";
    exit 1;
fi
\cp -r "$PARAM_SOURCE_DIR/CudosNode" "$PARAM_SOURCE_DIR/CudosNode-backup"
\cp -r "$PARAM_SOURCE_DIR/CudosGravityBridge" "$PARAM_SOURCE_DIR/CudosGravityBridge-backup"
\cp -r "$PARAM_SOURCE_DIR/CudosBuilders" "$PARAM_SOURCE_DIR/CudosBuilders-backup"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Releasing backup lock file...";
rm -f "$LOCK_BACKUP_CREATE"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

