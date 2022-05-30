#!/bin/bash -i

cd $PARAM_SOURCE_DIR

echo -ne "Cloning the repos...";
git clone -q --branch $REPO_BRANCH https://github.com/CudoVentures/cudos-node.git CudosNode &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the cudos-node repo. Please try in a while";
    exit 1;
fi
git clone -q --branch $REPO_BRANCH https://github.com/CudoVentures/cudos-builders.git CudosBuilders &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the cudos-builders repo. Please try in a while";
    exit 1;
fi
git clone -q --branch $REPO_BRANCH https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the cudos-gravity-bridge repo. Please try in a while";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Copying the .env files...";
\cp -f "$WORKING_DIR/config/node.env" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env";

dockerIgnorePath="$PARAM_SOURCE_DIR/.dockerignore"
if [ ! -f "$dockerIgnorePath" ]; then
    echo "CudosData" > $dockerIgnorePath;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
