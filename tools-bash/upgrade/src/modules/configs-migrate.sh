#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Migrating the configs:${STYLE_DEFAULT}";

MIGRATED_APP_TOML="$WORKING_MIGRATE_DIR/app.toml"
MIGRATED_CONFIG_TOML="$WORKING_MIGRATE_DIR/config.toml"

echo -ne "Migrating config files...";
\cp -f "$WORKING_EMERGENCY_BACKUP_DIR/config/app.toml" "$MIGRATED_APP_TOML"
\cp -f "$WORKING_EMERGENCY_BACKUP_DIR/config/config.toml" "$MIGRATED_CONFIG_TOML"

if [ "$UPDATE_FROM_VERSION" = "v0.3" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/configs-0.3-0.6.sh"
elif [ "$UPDATE_FROM_VERSION" = "v0.5.0" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/configs-0.5-0.6.sh"
elif [ "$UPDATE_FROM_VERSION" = "v0.4.0" ] && [ "$UPDATE_TO_VERSION" = "v0.9.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/configs-0.4-0.9.sh"
elif [ "$UPDATE_FROM_VERSION" = "v0.6.0" ] && [ "$UPDATE_TO_VERSION" = "v0.8.0" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/configs-0.6-0.8.sh"
elif [ "$UPDATE_FROM_VERSION" = "v1.0.0" ] && [ "$UPDATE_TO_VERSION" = "v1.0.1" ]; then
    source "$WORKING_SRC_VERSIONS_DIR/configs-1.0.0-1.0.1.sh"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copying config files...";
\cp -f "$MIGRATED_APP_TOML" "$VOLUME_PATH/config/app.toml"
\cp -f "$MIGRATED_CONFIG_TOML" "$VOLUME_PATH/config/config.toml"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
