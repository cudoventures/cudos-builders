#!/bin/bash -i

validatorComputerId=$(getValidatorComputerId)

validatorComputerIp=$(getComputerIp $validatorComputerIndex)
validatorComputerInternalIp=$(getComputerInternalIp $validatorComputerIndex)
validatorComputerPort=$(getComputerPort $validatorComputerIndex)
validatorComputerUser=$(getComputerUser $validatorComputerIndex)

sentryComputerId=$(getSentryComputerId 0)
sentryComputerIndex=$(getComputerIndexById "$sentryComputerId")
sentryComputerInternalIp=$(getComputerInternalIp $sentryComputerIndex)

echo -ne "Deploying gravity smart contract...";
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/gravity-contract-deployer && cp ./gravity-contract-deployer.env.example ./gravity-contract-deployer.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/gravity-contract-deployer && sed -i \"s~COSMOS_NODE=.*~COSMOS_NODE=\\\"http://$sentryComputerInternalIp:26657\\\"~g\" ./gravity-contract-deployer.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/gravity-contract-deployer && sed -i \"s~ETH_NODE=.*~ETH_NODE=\\\"$PARAM_ETH_RPC\\\"~g\" ./gravity-contract-deployer.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/gravity-contract-deployer && sed -i \"s/ETH_PRIV_KEY_HEX=.*/ETH_PRIV_KEY_HEX=\\\"$PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY\\\"/g\" ./gravity-contract-deployer.env"

result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/gravity-contract-deployer && sudo docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer up --build 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
if [[ "$result" =~ (Gravity deployed at Address[ ]*-[ ]*0x[0-9a-fA-F]+) ]]; then
    GRAVITY_CONTRACT_ADDRESS=${BASH_REMATCH[1]//Gravity deployed at Address[ ]*-/}
    GRAVITY_CONTRACT_ADDRESS=$(echo $GRAVITY_CONTRACT_ADDRESS | sed 's/ *$//g')
else
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find gravity contract address";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Clean-up after the deployment of the gravity smart contract...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/gravity-contract-deployer && sudo docker-compose --env-file ./gravity-contract-deployer.arg -f ./gravity-contract-deployer.yml -p cudos-gravity-contract-deployer down 2> /dev/null")
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the orchestrator...";
orchNodeEnv=$(cat $(getValidatorOrchEnvPath))
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator && echo \"${orchNodeEnv//\"/\\\"}\" > ./orchestrator.mainnet.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator && sed -i \"s~GRPC=.*~GRPC=\\\"http://$VALIDATOR_START_CONTAINER_NAME:9090\\\"~g\" ./orchestrator.mainnet.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator && sed -i \"s/CONTRACT_ADDR=.*/CONTRACT_ADDR=\\\"$GRAVITY_CONTRACT_ADDRESS\\\"/g\" ./orchestrator.mainnet.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator && sed -i \"s/COSMOS_ORCH_MNEMONIC=.*/COSMOS_ORCH_MNEMONIC=\\\"$ORCH_01_MNEMONIC\\\"/g\" ./orchestrator.mainnet.env"

arg=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator && cat ./orchestrator.mainnet.arg")
orchestratorStartContainerName=$(readEnvFromString "$arg" "CONTAINER_NAME")
unset arg

result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator && sudo docker-compose --env-file ./orchestrator.mainnet.arg -f ./orchestrator.release.yml -p $orchestratorStartContainerName up --build -d 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting the gravity...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";