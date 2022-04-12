#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Migrating the .envs:${STYLE_DEFAULT}";

echo -ne "Migrating .env files...";
\cp "$WORKING_EMERGENCY_BACKUP_DIR/$NODE_ENV_BASENAME" "$WORKING_MIGRATE_DIR/node.env"
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    \cp "$WORKING_EMERGENCY_BACKUP_DIR/$ORCHESTRATOR_ENV_BASENAME" "$WORKING_MIGRATE_DIR/orchestrator.env"
fi

if [ "$UPDATE_FROM_VERSION" = "v0.3" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/envs-0.3-0.6.sh"
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copyng .env files...";
\cp "$WORKING_MIGRATE_DIR/node.env" "$NODE_ENV_PATH"
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    \cp "$WORKING_MIGRATE_DIR/orchestrator.env" "$ORCHESTRATOR_ENV_PATH"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
