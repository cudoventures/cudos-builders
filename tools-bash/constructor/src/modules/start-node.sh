#!/bin/bash -i

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Configurating the $NODE_NAME...";
cp "$WORKING_DIR/config/genesis.mainnet.json" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/genesis.json"
sed -i "s/private_peer_ids = \".*\"/private_peer_ids = \"$PARAMS_PRIVATE_PEER_IDS\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
if [ "$IS_CLUSTERED_VALIDATOR" = "true" ]; then
    sed -i "s/seeds = \".*\"/seeds = \"\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PARAMS_PERSISTENT_PEERS\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
fi
if [ "$IS_CLUSTERED_VALIDATOR" = "false" ]; then
    sed -i "s/seeds = \".*\"/seeds = \"$PARAMS_SEED\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/persistent_peers = \".*\"/persistent_peers = \"\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
fi

if [ "$IS_CLUSTERED_VALIDATOR" = "true" ]; then
    sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"$PARAMS_PERSISTENT_PEERS\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SEEDS=.*/SEEDS=\"\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"false\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SHOULD_USE_STATE_SYNC=.*/SHOULD_USE_STATE_SYNC=\"false\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
fi

if [ "$IS_CLUSTERED_VALIDATOR" = "false" ]; then
    sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SEEDS=.*/SEEDS=\"$PARAMS_SEED\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"true\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/PRIVATE_PEERS=.*/PRIVATE_PEERS=\"$PARAMS_PRIVATE_PEER_IDS\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
fi

if [ "$SHOULD_START_ORCHESTRATOR" = "true" ]; then
    sed -i "158s/enable = false/enable = true/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/app.toml"
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the $NODE_NAME...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME";
dockerResult=$(docker-compose --env-file ./$NODE_NAME.client.mainnet.arg -f ./start-$NODE_NAME.yml -p cudos-start-$NODE_NAME-client-mainnet-01 up --build -d 2> /dev/null);
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi;
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";