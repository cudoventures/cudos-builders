#!/bin/bash -i
echo -ne "Cleaning the docker...";
dockerResult=$(docker system prune -a -f 2> /dev/null)
dockerResult=$(docker container prune -f 2> /dev/null)
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";


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

    # stopping previous instances of the root-validator
    dockerResult=$(docker-compose --env-file ./full-node.client.mainnet.arg -f ./start-full-node.yml -p cudos-start-full-node-client-mainnet-01 down 2> /dev/null);

    sed -i "s/cudos-noded start/sleep infinity/g" "./start-full-node.dockerfile";
    dockerResult=$(docker-compose --env-file ./full-node.client.mainnet.arg -f ./start-full-node.yml -p cudos-start-full-node-client-mainnet-01 up --build -d 2> /dev/null);
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
        exit 1;
    fi;
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Creating genesis...";
    startContainerName="cudos-start-full-node-client-mainnet";
    chainId="cudos-1";

    # delete the existing genesis file in order to initialize the chain again
    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "rm -f \$CUDOS_HOME/config/genesis.json");
    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "cudos-noded init \$MONIKER --chain-id $chainId 2> /dev/null");

    # Creating a random empty account to ensure that the keyring-backed is initialized, because when it is initialized the password is requested first, otherwise - the mnemonic
    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys add empty --keyring-backend os 2> /dev/null");
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error creating the empty account $?: ${dockerResult}";
        exit 1;
    fi;
    emptyAddress=$(docker container exec "$startContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys show empty -a --keyring-backend os");
    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "(echo \"$PARAM_VALIDATOR_MNEMONIC\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys add validator --recover --keyring-backend os 2> /dev/null");
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error importing your validator account $?: ${dockerResult}";
        exit 1;
    fi;
    validatorAddress=$(docker container exec "$startContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys show validator -a --keyring-backend os");

    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "cudos-noded add-genesis-account $validatorAddress ${VALIDATOR_BALANCE}acudos");
    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded gentx validator "${VALIDATOR_BALANCE}acudos" 0x364af07E1bb08288a1F3D9a578317baa9ED4fb2d $emptyAddress --chain-id $chainId --keyring-backend os --commission-rate="$PARAM_COMMISSION_RATE" \
    --commission-max-rate="$PARAM_COMMISSION_MAX_RATE" \
    --commission-max-change-rate="$PARAM_COMMISSION_MAX_CHANGE_RATE" 2> /dev/null");

    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error creating gen-tx $?: ${dockerResult}";
        exit 1;
    fi;

    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys delete empty --keyring-backend os -y 2> /dev/null");

    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "cat \"\${CUDOS_HOME}/config/genesis.json\" | jq '.app_state.staking.params.bond_denom = \"acudos\"' > \"\${CUDOS_HOME}/config/tmp_genesis.json\" && mv -f \"\${CUDOS_HOME}/config/tmp_genesis.json\" \"\${CUDOS_HOME}/config/genesis.json\"");
    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "cat \"\${CUDOS_HOME}/config/genesis.json\" | jq --arg validatorAddress \"$validatorAddress\" '.app_state.gravity.static_val_cosmos_addrs += [\$validatorAddress]' > \"\${CUDOS_HOME}/config/tmp_genesis.json\" && mv -f \"\${CUDOS_HOME}/config/tmp_genesis.json\" \"\${CUDOS_HOME}/config/genesis.json\"");

    dockerResult=$(docker container exec "$startContainerName" /bin/bash -c "cudos-noded collect-gentxs 2> /dev/null");

    # starting the chain
    sed -i "s/sleep infinity/cudos-noded start/g" "./start-full-node.dockerfile";
    dockerResult=$(docker-compose --env-file ./full-node.client.mainnet.arg -f ./start-full-node.yml -p cudos-start-full-node-client-mainnet-01 up --build -d 2> /dev/null);
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the container $?: ${dockerResult}";
        exit 1;
    fi;

    # wait until there is at least 1 block
    while true
    do
        sleep 1
        dockerResult=$(docker exec "$startContainerName" /bin/bash -c "cudos-noded status |& tee /tmp/cudos-status" 2> /dev/null)
        if [ "$?" != 0 ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error initializing the network $?: ${dockerResult}";
            exit 1;
        fi;
        sleep 1
        cudosNodedStatus=$(docker exec "$startContainerName" /bin/bash -c "cat /tmp/cudos-status && rm -f /tmp/cudos-status")
        latestBlockHeight=$(echo $cudosNodedStatus | jq '.SyncInfo.latest_block_height')
        latestBlockHeight=${latestBlockHeight//\"/}
        if [ "$latestBlockHeight" != "0" ]; then
            break
        fi
    done
    # stop the docker
    dockerResult=$(docker stop "$startContainerName");
    # set sleep infinity
    sed -i "s/cudos-noded start/sleep infinity/g" "./start-full-node.dockerfile";
    # start the sleeping docker
    dockerResult=$(docker-compose --env-file ./full-node.client.mainnet.arg -f ./start-full-node.yml -p cudos-start-full-node-client-mainnet-01 up --build -d 2> /dev/null);
    # export genesis
    tmpFilePath="/tmp/init-genesis.cudos.json"
    result=$(docker container exec "$startContainerName" /bin/bash -c "cudos-noded export |& tee $tmpFilePath" 2> /dev/null)
    EXPORTED_GENESIS=$(docker container exec "$startContainerName" /bin/bash -c "cat $tmpFilePath && rm -f $tmpFilePath")
    validJson=$(echo $EXPORTED_GENESIS | jq -e . 2> /dev/null)
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Invalid genesis $?: ${EXPORTED_GENESIS}";
        exit 1;
    fi;
    # reset the data
    result=$(docker container exec "$startContainerName" /bin/bash -c "cudos-noded unsafe-reset-all" 2> /dev/null)
    # stop the docker
    dockerResult=$(docker stop "$startContainerName");
    # restore cudos-noded start
    sed -i "s/sleep infinity/cudos-noded start/g" "./start-full-node.dockerfile";
    
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
fi
