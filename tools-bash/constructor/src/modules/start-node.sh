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
if [ "$IS_VALIDATOR" = "true" ]; then
    sed -i "s/pex = true/pex = false/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/seeds = \".*\"/seeds = \"\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PARAMS_PERSISTENT_PEERS\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/laddr = \"tcp:\/\/0.0.0.0:26657\"/laddr = \"tcp:\/\/127.0.0.1:26657\"/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/cors_allowed_origins = .*/cors_allowed_origins = \[\]/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
fi
if [ "$IS_VALIDATOR" = "false" ]; then
    sed -i "s/pex = false/pex = true/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/seeds = \".*\"/seeds = \"$PARAMS_SEED\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/persistent_peers = \".*\"/persistent_peers = \"\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/cors_allowed_origins = \[\]/cors_allowed_origins = \[\"\*\"\]/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
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