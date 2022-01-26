#!/bin/bash -i

cd $PARAM_SOURCE_DIR

echo -ne "Cloning the repos...";
git clone -q --branch cudos-master https://github.com/CudoVentures/cudos-node.git CudosNode
git clone -q --branch cudos-master https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone -q --branch cudos-master https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
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
echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";