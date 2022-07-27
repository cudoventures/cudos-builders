#!/bin/bash -i

echo "" # new line

MIGRATED_NODE_ENV="$WORKING_MIGRATE_DIR/node.env"
MIGRATED_ORCHESTRATOR_ENV="$WORKING_MIGRATE_DIR/orchestrator.env"

echo -e "${STYLE_BOLD}Migrating the .envs:${STYLE_DEFAULT}";

echo -ne "Migrating .env files...";
\cp -f "$WORKING_EMERGENCY_BACKUP_DIR/$NODE_ENV_BASENAME" "$MIGRATED_NODE_ENV"
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    \cp -f "$WORKING_EMERGENCY_BACKUP_DIR/$ORCHESTRATOR_ENV_BASENAME" "$MIGRATED_ORCHESTRATOR_ENV"
fi

if [ "$UPDATE_FROM_VERSION" = "v0.3" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/envs-0.3-0.6.sh"
elif [ "$UPDATE_FROM_VERSION" = "v0.5.0" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/envs-0.5-0.6.sh"
elif [ "$UPDATE_FROM_VERSION" = "v0.4.0" ] && [ "$UPDATE_TO_VERSION" = "v0.9.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/envs-0.4-0.9.sh"
elif [ "$UPDATE_FROM_VERSION" = "v0.6.0" ] && [ "$UPDATE_TO_VERSION" = "v0.8.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/envs-0.6-0.8.sh"
elif [ "$UPDATE_FROM_VERSION" = "v0.8.0" ] && [ "$UPDATE_TO_VERSION" = "v1.1.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/envs-0.8-1.1.sh"
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copying .env files...";
\cp -f "$MIGRATED_NODE_ENV" "$NODE_ENV_PATH"
if [ "$HAS_ORCHESTRATOR" = "true" ]; then
    \cp -f "$MIGRATED_ORCHESTRATOR_ENV" "$ORCHESTRATOR_ENV_PATH"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
