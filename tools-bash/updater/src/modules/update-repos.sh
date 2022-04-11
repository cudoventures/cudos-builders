#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Updating repos:${STYLE_DEFAULT}";

echo -ne "Deleting old repos...";
rm -rf "$PARAM_SOURCE_DIR/CudosNode"
rm -rf "$PARAM_SOURCE_DIR/CudosBuilders"
rm -rf "$PARAM_SOURCE_DIR/CudosGravityBridge"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";


echo -ne "Cloning repos...";
branch="v0.5.0"
cd "$PARAM_SOURCE_DIR"
git clone -q --depth 1 --branch "$branch" https://github.com/CudoVentures/cudos-node.git CudosNode &> /dev/null
git clone -q --depth 1 --branch "$branch" https://github.com/CudoVentures/cudos-builders.git CudosBuilders &> /dev/null
git clone -q --depth 1 --branch "$branch" https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge &> /dev/null
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copyng .env files...";
\cp "$WORKING_EMERGENCY_BACKUP_DIR/$NODE_ENV_BASENAME" "$NODE_ENV_PATH"
if [ "$ORCHESTRATOR_ENV_PATH" != "" ]; then
    \cp "$WORKING_EMERGENCY_BACKUP_DIR/$ORCHESTRATOR_ENV_BASENAME" "$ORCHESTRATOR_ENV_PATH"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
