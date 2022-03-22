#!/bin/bash -i

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Resetting the $NODE_NAME...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME";

arg=$(cat ./$NODE_NAME.client.mainnet.arg)
startContainerName=$(readEnvFromString "$arg" "START_CONTAINER_NAME")
unset arg

dockerResult=$(docker-compose --env-file ./$NODE_NAME.client.mainnet.arg -f ./start-$NODE_NAME.yml -p cudos-start-$NODE_NAME-client-mainnet-01 down 2> /dev/null);
sed -i "s/cudos-noded start/sleep infinity/g" "./start-$NODE_NAME.dockerfile";
sed -i "s/--state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2//g" "./start-$NODE_NAME.dockerfile";
dockerResult=$(docker-compose --env-file ./$NODE_NAME.client.mainnet.arg -f ./start-$NODE_NAME.yml -p cudos-start-$NODE_NAME-client-mainnet-01 up --build -d 2> /dev/null);
dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "cudos-noded unsafe-reset-all" 2> /dev/null)
if [ "$NODE_NAME" = "full-node" ]; then
    sed -i "s/sleep infinity/cudos-noded start/g" "./start-$NODE_NAME.dockerfile";
else
    sed -i "s/sleep infinity/cudos-noded start --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2/g" "./start-$NODE_NAME.dockerfile";
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Configurating the $NODE_NAME...";
\cp -f "$WORKING_DIR/config/genesis.mainnet.json" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/genesis.json"
sed -i "s/private_peer_ids = \".*\"/private_peer_ids = \"$PARAM_PRIVATE_PEER_IDS\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
if [ "$IS_CLUSTERED_VALIDATOR" = "true" ]; then
    sed -i "s/seeds = \".*\"/seeds = \"\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PARAM_PERSISTENT_PEERS\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
fi
if [ "$IS_CLUSTERED_VALIDATOR" = "false" ]; then # standalone validator and any other case
    if [ "$PARAM_SEED" != "" ]; then
        sed -i "s/seeds = \".*\"/seeds = \"$PARAM_SEED\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
        sed -i "s/persistent_peers = \".*\"/persistent_peers = \"\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    fi
    if [ "$PARAM_PERSISTENT_PEERS" != "" ]; then
        sed -i "s/persistent_peers = \".*\"/persistent_peers = \"$PARAM_PERSISTENT_PEERS\"/g" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    fi
fi

sed -i "s/PRIVATE_PEERS=.*/PRIVATE_PEERS=\"$PARAM_PRIVATE_PEER_IDS\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
if [ "$IS_CLUSTERED_VALIDATOR" = "true" ]; then
    sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"$PARAM_PERSISTENT_PEERS\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SEEDS=.*/SEEDS=\"\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"false\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    sed -i "s/SHOULD_USE_STATE_SYNC=.*/SHOULD_USE_STATE_SYNC=\"false\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
fi

if [ "$IS_CLUSTERED_VALIDATOR" = "false" ]; then # clustered validator and any other case
    if [ "$PARAM_SEED" != "" ]; then
        sed -i "s/SEEDS=.*/SEEDS=\"$PARAM_SEED\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
        sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    fi
    if [ "$PARAM_PERSISTENT_PEERS" != "" ]; then
        sed -i "s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\"$PARAM_PERSISTENT_PEERS\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
    fi
    sed -i "s/SHOULD_USE_GLOBAL_PEERS=.*/SHOULD_USE_GLOBAL_PEERS=\"true\"/" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.mainnet.env"
fi

if [ "$SHOULD_START_ORCHESTRATOR" = "true" ]; then
    sed -i "158s/enable = false/enable = true/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/app.toml"
fi

if [ "$IS_VALIDATOR" = "true" ]; then
    sed -i "/\${PORT26657}:26657/d" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/start-$NODE_NAME.yml"

    arg=$(cd $PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME && cat ./$NODE_NAME.client.mainnet.env)
    monitoringEnabled=$(readEnvFromString "$arg" "MONITORING_ENABLED")
    unset arg

    if [ "$monitoringEnabled" = "false" ]; then
        sed -i "/{PORT26660}:26660/d" "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME/start-$NODE_NAME.yml"
    fi
fi

cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME";
sed -i "s/EXPOSE_IP=.*/EXPOSE_IP=\"$PARAM_EXPOSE_IP\"/g" "./$NODE_NAME.client.mainnet.arg"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the $NODE_NAME...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME";
dockerResult=$(docker-compose --env-file ./$NODE_NAME.client.mainnet.arg -f ./start-$NODE_NAME.yml -p cudos-start-$NODE_NAME-client-mainnet-01 up --build -d 2> /dev/null);
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi;
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
