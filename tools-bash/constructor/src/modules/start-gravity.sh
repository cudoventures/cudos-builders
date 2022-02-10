#!/bin/bash -i

echo -ne "Registering the orchestrator...";
arg=$(cd $PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME && cat ./$NODE_NAME.client.mainnet.arg)
validatorStartContainerName=$(readEnvFromString "$arg" "START_CONTAINER_NAME")
unset arg

arg=$(cd $PARAM_SOURCE_DIR/CudosBuilders/docker/$NODE_NAME && cat ./$NODE_NAME.client.mainnet.env)
validatorMoniker=$(readEnvFromString "$arg" "MONIKER")
unset arg

orchNodeEnv=$(cat "$PARAM_ORCHESTRATOR_ENV_PATH")
orchestratorMnemonic=$(readEnvFromString "$orchNodeEnv" "COSMOS_ORCH_MNEMONIC")

validatorsJson=$(docker exec -it "$validatorStartContainerName" /bin/bash -c "cudos-noded q staking validators -o json")
validatorOperatorAddress=$(echo "$validatorsJson" |  jq .validators | jq "map(select(.description.moniker == \"$validatorMoniker\") | .operator_address)" | jq .[0])
validatorOperatorAddress=${validatorOperatorAddress//\"/}
if [ "$validatorOperatorAddress" = "" ] || [ "$validatorOperatorAddress" = "null" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Could not get validator's operator address";
    exit 1;
fi

dockerResult=$(docker container exec "$validatorStartContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys delete orchestrator -y --keyring-backend os 2> /dev/null");
dockerResult=$(docker container exec "$validatorStartContainerName" /bin/bash -c "(echo \"$orchestratorMnemonic\"; echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys add orchestrator --recover --keyring-backend os 2> /dev/null");
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error importing your orchestrator account $?: ${dockerResult}";
    exit 1;
fi;
orchestratorAddress=$(docker container exec "$validatorStartContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded keys show orchestrator -a --keyring-backend os");

dockerResult=$(docker container exec "$validatorStartContainerName" /bin/bash -c "(echo \"$PARAM_KEYRING_OS_PASS\") | cudos-noded tx gravity set-orchestrator-address \"$validatorOperatorAddress\" \"$orchestratorAddress\" \"$PARAM_ORCH_ETH_ADDRESS\" --from validator --keyring-backend os --chain-id cudos-1 -y 2> /dev/null");
transactionHeight=$(echo "$dockerResult" | jq '.height')
transactionHeight=${transactionHeight//\"/}
if [ "$?" != 0 ] || [ "$transactionHeight" = "0" ] || [[ "$dockerResult" =~ .*"failed".* ]]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error setting the orchestrator address $?: ${dockerResult}";
    exit 1;
fi;
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the orchestrator...";
cd "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator" 
echo "${orchNodeEnv//"/\\"}" > "./orchestrator.mainnet.env"
sed -i "s~GRPC=.*~GRPC=\"http://$validatorStartContainerName:9090\"~g" "./orchestrator.mainnet.env"

arg=$(cat "./orchestrator.mainnet.arg")
orchestratorStartContainerName=$(readEnvFromString "$arg" "CONTAINER_NAME")
unset arg

result=$(sudo docker-compose --env-file ./orchestrator.mainnet.arg -f ./orchestrator.release.yml -p $orchestratorStartContainerName up --build -d 2> /dev/null)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the gravity...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
