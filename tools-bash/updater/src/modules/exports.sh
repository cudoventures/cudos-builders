#!/bin/bash -i

echo -ne "Exporting critical data for emergency cases...";

rm -rf "$WORKING_EXPORT_DIR"
mkdir "$WORKING_EXPORT_DIR"

\cp "$NODE_ENV_PATH" "$WORKING_EXPORT_DIR"

\cp -r "$VOLUME_PATH/config" "$WORKING_EXPORT_DIR"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
