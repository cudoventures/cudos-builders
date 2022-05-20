#!/bin/bash -i

cd $PARAM_SOURCE_DIR

echo -ne "Cloning the repos...";
branch="v0.8.0"
git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode
git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copying the .env files...";
\cp -f "$WORKING_DIR/config/node.env" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env";

dockerIgnorePath="$PARAM_SOURCE_DIR/.dockerignore"
if [ ! -f "$dockerIgnorePath" ]; then
    echo "CudosData" > $dockerIgnorePath;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
