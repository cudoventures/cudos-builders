#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Restoring envs:${STYLE_DEFAULT}";

echo -ne "Copyng .env files...";
\cp "$WORKING_EMERGENCY_BACKUP_DIR/$NODE_ENV_BASENAME" "$NODE_ENV_PATH"
if [ "$ORCHESTRATOR_ENV_PATH" != "" ]; then
    \cp "$WORKING_EMERGENCY_BACKUP_DIR/$ORCHESTRATOR_ENV_BASENAME" "$ORCHESTRATOR_ENV_PATH"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
