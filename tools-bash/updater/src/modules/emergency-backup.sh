#!/bin/bash -i

echo -ne "Exporting critical data for emergency cases...";

rm -rf "$WORKING_EMERGENCY_BACKUP_DIR"
mkdir "$WORKING_EMERGENCY_BACKUP_DIR"

user=$(ls -ld "$WORKING_EMERGENCY_BACKUP_DIR/.." | awk '{print $3}')
group=$(ls -ld "$WORKING_EMERGENCY_BACKUP_DIR/.." | awk '{print $4}')

\cp "$NODE_ENV_PATH" "$WORKING_EMERGENCY_BACKUP_DIR"

\cp -r "$VOLUME_PATH/config" "$WORKING_EMERGENCY_BACKUP_DIR"

if [ "$ORCHESTRATOR_ENV_PATH" != "" ]; then
    \cp "$ORCHESTRATOR_ENV_PATH" "$WORKING_EMERGENCY_BACKUP_DIR"
fi

chown "$user":"$group" -R "$WORKING_EMERGENCY_BACKUP_DIR"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
