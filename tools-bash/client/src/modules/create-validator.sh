#!/bin/bash -i

if [ "$PARAM_VALIDATOR_MNEMONIC" != "" ]; then
    echo -ne "Creating the validator...";

    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys delete empty -y" 2>&1);
    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys delete validator -y" 2>&1);

    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys add empty" 2>&1);
    # No need to exit on error because the keyring may exists and it will lead to an error but it is actually not an error
    # if [ "$?" != 0 ]; then
    #     echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error creating the empty account $?: ${dockerResult}";
    #     exit 1;
    # fi;
    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "(echo \"$PARAM_VALIDATOR_MNEMONIC\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys add validator --recover" 2>&1);
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error importing your validator account $?: ${dockerResult}";
        exit 1;
    fi;
    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys delete empty -y" 2>&1);

    printSyncInfo="false"
    while true
    do
        dockerResult=$(docker exec "$START_CONTAINER_NAME" /bin/bash -c "cudos-noded status |& tee /tmp/cudos-status" 2>&1)
        if [ "$?" != 0 ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error creating the validator because the network is not running $?: ${dockerResult}";
            exit 1;
        fi;
        cudosNodedStatus=$(docker exec "$START_CONTAINER_NAME" /bin/bash -c "cat /tmp/cudos-status && rm -f /tmp/cudos-status")
        latestBlockHeight=$(echo $cudosNodedStatus | jq '.SyncInfo.latest_block_height')
        catchingUp=$(echo $cudosNodedStatus | jq '.SyncInfo.catching_up')
        latestBlockHeight=${latestBlockHeight//\"/}
        if [ "$catchingUp" = "false" ]; then
            if [ "$printSyncInfo" = "true" ]; then
                echo -ne "\n"
            fi
            break;
        fi
        echo -ne "\n${STYLE_BOLD}Node is syncing. Latest block $latestBlockHeight${STYLE_DEFAULT}"
        printSyncInfo="true"
        sleep 1
    done

    moniker=$(cat "$VOLUME_PATH/config/config.toml" | grep "moniker")
    moniker=${moniker// /}
    moniker=$(readEnvFromString "$moniker" "moniker")
    chainId=$(jq ".chain_id" "$VOLUME_PATH/config/genesis.json")
    chainId=${chainId//\"/}

    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded tx staking create-validator --amount \"${PARAM_STAKING_AMOUNT}acudos\" --from validator --pubkey=\$(cudos-noded tendermint show-validator) --moniker \"$moniker\" --chain-id \"$chainId\" --commission-rate "0.10" --commission-max-rate "0.20" --commission-max-change-rate "0.01" --min-self-delegation "2000000000000000000000000" --gas-prices "5000000000000acudos" -y" 2>&1);
    if [ "$?" != 0 ] || [[ "$dockerResult" =~ .*"failed".* ]]; then
        if [[ "$dockerResult" =~ .*"validator already exist for this operator address".* ]]; then
            echo -ne "Validator already exists..."
        else
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error creating the validator $?: ${dockerResult}";
            exit 1;
        fi
    fi;

    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
fi
