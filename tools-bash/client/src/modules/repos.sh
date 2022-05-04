#!/bin/bash -i

echo -ne "Cloning repos...";
cd "$PARAM_SOURCE_DIR"
git clone -q --branch "$REPO_BRANCH" https://github.com/CudoVentures/cudos-node.git CudosNode &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the repo cudos-node. Please try in a while";
    exit 1;
fi
git clone -q --branch "$REPO_BRANCH" https://github.com/CudoVentures/cudos-builders.git CudosBuilders &> /dev/null
if [ "$?" != 0 ]; then
    if [ "$REPO_BRANCH" = "v0.4.0" ]; then
        git clone -q --branch v0.3.3 https://github.com/CudoVentures/cudos-builders.git CudosBuilders &> /dev/null
    fi
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the repo cudos-builders. Please try in a while";
        exit 1;
    fi
fi
git clone -q --branch "$REPO_BRANCH" https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the repo cudos-gravity-bridge. Please try in a while";
    exit 1;
fi

if [ "$PARAM_NETWORK" = "local" ]; then
    \cp -f "$WORKING_DIR/../../docker/config/genesis.local.json" "$PARAM_SOURCE_DIR/CudosBuilders/docker/config"
    \cp -f "$WORKING_DIR/../../docker/config/persistent-peers.local.config" "$PARAM_SOURCE_DIR/CudosBuilders/docker/config"
    \cp -f "$WORKING_DIR/../../docker/config/seeds.local.config" "$PARAM_SOURCE_DIR/CudosBuilders/docker/config"
    \cp -f "$WORKING_DIR/../../docker/config/state-sync-rpc-servers.local.config" "$PARAM_SOURCE_DIR/CudosBuilders/docker/config"
fi

dockerIgnorePath="$PARAM_SOURCE_DIR/.dockerignore"
if [ ! -f "$dockerIgnorePath" ]; then
    echo "CudosData" > $dockerIgnorePath;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

