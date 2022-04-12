#!/bin/bash -i

echo -ne "Exporting critical data for emergency cases...";

rm -rf "$WORKING_EMERGENCY_BACKUP_DIR"
mkdir "$WORKING_EMERGENCY_BACKUP_DIR"

\cp -f "$NODE_ENV_PATH" "$WORKING_EMERGENCY_BACKUP_DIR"

\cp -r "$VOLUME_PATH/config" "$WORKING_EMERGENCY_BACKUP_DIR"

if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    \cp -f "$ORCHESTRATOR_ENV_PATH" "$WORKING_EMERGENCY_BACKUP_DIR"
fi

user=$(ls -ld "$WORKING_EMERGENCY_BACKUP_DIR/.." | awk '{print $3}')
group=$(ls -ld "$WORKING_EMERGENCY_BACKUP_DIR/.." | awk '{print $4}')

chown "$user":"$group" -R "$WORKING_EMERGENCY_BACKUP_DIR"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
