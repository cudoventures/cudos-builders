#!/bin/bash -i

validatorIp=$(getComputerIp $validatorComputerIndex)

sentriesSize=$(getSentriesSize)

for i in $(seq 0 $(($sentriesSize-1)))
do
    sentryComputerId=$(getSentryComputerId $i)
    sentryComputerIndex=$(getComputerIndexById "$sentryComputerId")

    sentryComputerIp=$(getComputerIp $sentryComputerIndex)
    sentryComputerPort=$(getComputerPort $sentryComputerIndex)
    sentryComputerUser=$(getComputerUser $sentryComputerIndex)

    echo -ne "Preparing sentry($i)'s repos...";
    branch="cudos-dev"
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosNode && git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode"
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosBuilders && git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders"
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosGravityBridge && git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    arg=$(ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && cat ./sentry-node.mainnet.arg")
    startContainerName=$(readEnvFromString "$arg" "START_CONTAINER_NAME")
    unset arg
    result=$(ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sudo docker stop $startContainerName 2> /dev/null")
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosData"

    echo -ne "Preparing sentry($i)'s binary builder...";
    result=$(ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder && sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null")
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    sentryNodeEnv=$(cat $(getSentryEnvPath $i))
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && echo \"$sentryNodeEnv\" > ./sentry-node.mainnet.env"
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/config && echo \"${GENESIS_JSON//\"/\\\"}\" > ./genesis.mainnet.json"

    echo -ne "Preparing sentry($i)'s peers...";
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID@$validatorIp:26656\\\"/g\" ./sentry-node.mainnet.env"
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PRIVATE_PEERS=/PRIVATE_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID\\\"/g\" ./sentry-node.mainnet.env"
    ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/SEEDS=/SEEDS=\\\"$SEEDS_PEERS\\\"/g\" ./sentry-node.mainnet.env"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Initialize sentry($i)...";
    result=$(ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sudo docker-compose --env-file ./sentry-node.mainnet.arg -f ./init-sentry-node.yml -p cudos-init-sentry-node up --build 2> /dev/null")
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Clean-up after the initialization of the sentry($i)...";
    result=$(ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sudo docker-compose --env-file ./sentry-node.mainnet.arg -f ./init-sentry-node.yml -p cudos-init-sentry-node down 2> /dev/null")
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Starting sentry($i)...";
    result=$(ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sudo docker-compose --env-file ./sentry-node.mainnet.arg -f ./start-sentry-node.yml -p cudos-start-sentry-node up --build -d 2> /dev/null")
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sudo docker-compose --env-file ./seed-node.mainnet.arg -f ./start-seed-node.yml -p cudos-start-seed-node up --build -d 2> /dev/null")
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
done

echo -ne "Starting the sentries...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";