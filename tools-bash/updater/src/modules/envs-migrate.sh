#!/bin/bash -i

echo "" # new line

MIGRATED_NODE_ENV="$WORKING_MIGRATE_DIR/node.env"
MIGRATED_ORCHESTRATOR_ENV="$WORKING_MIGRATE_DIR/orchestrator.env"

echo -e "${STYLE_BOLD}Migrating the .envs:${STYLE_DEFAULT}";

echo -ne "Migrating .env files...";
\cp "$WORKING_EMERGENCY_BACKUP_DIR/$NODE_ENV_BASENAME" "$MIGRATED_NODE_ENV"
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    \cp "$WORKING_EMERGENCY_BACKUP_DIR/$ORCHESTRATOR_ENV_BASENAME" "$MIGRATED_ORCHESTRATOR_ENV"
fi

if [ "$UPDATE_FROM_VERSION" = "v0.3" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/envs-0.3-0.6.sh"
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copying .env files...";
\cp "$MIGRATED_NODE_ENV" "$NODE_ENV_PATH"
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    \cp "$MIGRATED_ORCHESTRATOR_ENV" "$ORCHESTRATOR_ENV_PATH"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
