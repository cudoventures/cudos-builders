#!/bin/bash -i

echo -ne "Preparing the binary builder...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder"
dockerResult=$(docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Preparing the $NODE_NAME...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME"
dockerResult=$(docker-compose --env-file ./$NODE_NAME.client.mainnet.arg -f ./init-$NODE_NAME.yml -p cudos-init-$NODE_NAME-client-mainnet up --build 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Configurating the $NODE_NAME...";
if [ "$IS_VALIDATOR" = "true" ]; then
    sed -i "s/pex = true/pex = false/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/laddr = \"tcp:\/\/0.0.0.0:26657\"/laddr = \"tcp:\/\/127.0.0.1:26657\"/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/cors_allowed_origins = .*/cors_allowed_origins = \[\]/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
fi
if [ "$IS_VALIDATOR" = "false" ]; then
    sed -i "s/pex = false/pex = true/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
    sed -i "s/cors_allowed_origins = \[\]/cors_allowed_origins = \[\"\*\"\]/" "$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/config/config.toml"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

if [ $IS_VALIDATOR = "true" ]; then
    echo -ne "Initializing the validator...";
    cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME";
    sed -i "s/cudos-noded start/sleep infinity/g" ./start-full-node.dockerfile;
    dockerResult=$(docker-compose --env-file ./full-node.client.mainnet.arg -f ./start-full-node.yml -p cudos-start-full-node-client-mainnet-01 up --build -d 2> /dev/null);
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
        exit 1;
    fi;
    sed -i "s/sleep infinity/cudos-noded start/g" ./start-full-node.dockerfile;
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Creating gen-tx...";
    startContainerName="cudos-start-full-node-client-mainnet";
    chainId="cudos-1";

    # delete the existing genesis file in order to initialize the chain again
    dockerResult=$(docker container exec $startContainerName /bin/bash -c "rm \$CUDOS_HOME/config/genesis.json");
    dockerResult=$(docker container exec $startContainerName /bin/bash -c "cudos-noded init \$MONIKER 2> /dev/null");

    # Creating a random empty account to ensure that the keyring-backed is initialized, because when it is initialized the password is requested first, otherwise - the mnemonic
    dockerResult=$(docker container exec $startContainerName /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys add empty --keyring-backend os 2> /dev/null");
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error creating the empty account $?: ${dockerResult}";
        exit 1;
    fi;
    emptyAddress=$(docker container exec $startContainerName /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys show empty -a --keyring-backend os");

    dockerResult=$(docker container exec $startContainerName /bin/bash -c "(echo \"$PARAM_VALIDATOR_MNEMONIC\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys add validator --recover --keyring-backend os 2> /dev/null");
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error importing your validator account $?: ${dockerResult}";
        exit 1;
    fi;
    validatorAddress=$(docker container exec $startContainerName /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys show validator -a --keyring-backend os");

    dockerResult=$(docker container exec $startContainerName /bin/bash -c "cudos-noded add-genesis-account $validatorAddress 2000000000000000000000000acudos");
    dockerResult=$(docker container exec $startContainerName /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded gentx validator "2000000000000000000000000acudos" 0x0000000000000000000000000000000000000000 $emptyAddress --chain-id $chainId --keyring-backend os 2> /dev/null");
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error creating gen-tx $?: ${dockerResult}";
        exit 1;
    fi;
    dockerResult=$(docker container exec $startContainerName /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys delete empty --keyring-backend os -y 2> /dev/null");
    dockerResult=$(docker stop $startContainerName);
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
fi