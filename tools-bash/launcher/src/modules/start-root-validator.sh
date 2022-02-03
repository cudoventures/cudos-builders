#!/bin/bash -i

validatorComputerId=$(getValidatorComputerId)
validatorOrchEthAddress=$(getValidatorOrchEthAddress)
validatorOrchEthPrivKey=$(getValidatorOrchEthPrivKey)
validatorComputerIndex=$(getComputerIndexById "$validatorComputerId")

validatorComputerIp=$(getComputerIp $validatorComputerIndex)
validatorComputerInternalIp=$(getComputerInternalIp $validatorComputerIndex)
validatorComputerPort=$(getComputerPort $validatorComputerIndex)
validatorComputerUser=$(getComputerUser $validatorComputerIndex)

echo -ne "Preparing root-validator's repos...";
branch="cudos-dev"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosNode && git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosBuilders && git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosGravityBridge && git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

arg=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && cat ./root-node.mainnet.arg")
VALIDATOR_START_CONTAINER_NAME=$(readEnvFromString "$arg" "START_CONTAINER_NAME")
unset arg
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker stop $VALIDATOR_START_CONTAINER_NAME 2> /dev/null")
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosData"

echo -ne "Preparing root-validator's binary builder...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder && sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

rootNodeEnv=$(cat $(getValidatorEnvPath))
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && echo \"${rootNodeEnv//\"/\\\"}\" > ./root-node.mainnet.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sed -i \"s/EXPOSE_IP=.*/EXPOSE_IP=\\\"$validatorComputerInternalIp\\\"/g\" ./root-node.mainnet.arg"

echo -ne "Initializing root-validator...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./init-root-node.yml -p cudos-init-root-node up --build 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Clean-up after the initialization of the root-validator...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./init-root-node.yml -p cudos-init-root-node down 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting root-validator...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node up --build -d 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

VALIDATOR_TENEDRMINT_NODE_ID=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec $VALIDATOR_START_CONTAINER_NAME cudos-noded tendermint show-node-id")
if [ "$VALIDATOR_TENEDRMINT_NODE_ID" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Root validator's tendermint node id is not defined";
    exit 1;
fi

GENESIS_JSON=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec cudos-start-root-node /bin/bash -c \"cat \\\$CUDOS_HOME/config/genesis.json\"")
if [ "$GENESIS_JSON" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The genesis.json is not defined";
    exit 1;
fi

ORCH_01_MNEMONIC=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec cudos-start-root-node /bin/bash -c \"cat \\\$CUDOS_HOME/orch-01.wallet\" | tail -n 1")
if [ "$ORCH_01_MNEMONIC" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to get the wallet of orchestrator 01";
    exit 1;
fi

ORCH_02_MNEMONIC=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec cudos-start-root-node /bin/bash -c \"cat \\\$CUDOS_HOME/orch-02.wallet\" | tail -n 1")
if [ "$ORCH_02_MNEMONIC" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to get the wallet of orchestrator 02";
    exit 1;
fi

ORCH_03_MNEMONIC=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec cudos-start-root-node /bin/bash -c \"cat \\\$CUDOS_HOME/orch-03.wallet\" | tail -n 1")
if [ "$ORCH_03_MNEMONIC" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to get the wallet of orchestrator 03";
    exit 1;
fi

echo -ne "Starting the root-validator...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";