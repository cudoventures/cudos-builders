#!/bin/bash -i

cd $PARAM_SOURCE_DIR

echo -ne "Cloning the repos...";
branch="cudos-dev"
git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode
git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";

echo -ne "Copying the .env files...";
if [ "$NODE_NAME" = "full-node" ]; then
    cp "$WORKING_DIR/config/node.env" "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.mainnet.env";
fi

if [ "$NODE_NAME" = "seed-node" ]; then
    cp "$WORKING_DIR/config/node.env" "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.mainnet.env";
fi

if [ "$NODE_NAME" = "sentry-node" ]; then
    cp "$WORKING_DIR/config/node.env" "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.mainnet.env";
fi

if [ $IS_VALIDATOR = "true" ]; then
    cp "$WORKING_DIR/scripts/init-validator.sh" "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/init-validator.sh";
fi

dockerIgnorePath="$PARAM_SOURCE_DIR/.dockerignore"
if [ ! -f "$dockerIgnorePath" ]; then
    echo "CudosData" > $dockerIgnorePath;
fi

echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";