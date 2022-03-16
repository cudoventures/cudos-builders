#!/bin/bash -i

validatorInternalIp=$(getComputerInternalIp $validatorComputerIndex)

seedsSize=$(getSeedsSize)
SEEDS_PEERS=()
SEEDS_PUBLIC_PEERS=()
SEEDS_PEERS_LIST=""
SEEDS_PUBLIC_PEERS_LIST=""
for i in $(seq 0 $(($seedsSize-1)))
do
    seedComputerId=$(getSeedComputerId $i)
    seedComputerIndex=$(getComputerIndexById "$seedComputerId")

    seedComputerIp=$(getComputerIp $seedComputerIndex)
    seedComputerInternalIp=$(getComputerInternalIp $seedComputerIndex)
    seedComputerPort=$(getComputerPort $seedComputerIndex)
    seedComputerUser=$(getComputerUser $seedComputerIndex)

    echo -ne "Preparing seed($i)'s repos...";
    branch="cudos-dev"
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosNode && git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode"
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosBuilders && git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders"
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosGravityBridge && git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    arg=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && cat ./seed-node.mainnet.arg")
    startContainerName=$(readEnvFromString "$arg" "START_CONTAINER_NAME")
    unset arg
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sudo docker stop $startContainerName 2> /dev/null")
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosData"

    echo -ne "Cleaning the docker...";
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "sudo docker system prune -a -f 2> /dev/null")
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "sudo docker container prune -f 2> /dev/null")
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Preparing seed($i)'s binary builder...";
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder && sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null");
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    seedNodeEnv=$(cat $(getSeedEnvPath $i))
    monitoringEnabled=$(readEnvFromString "$seedNodeEnv" "MONITORING_ENABLED")
    loggingDriver=$(readEnvFromString "$seedNodeEnv" "LOGGING_DRIVER")
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && echo \"${seedNodeEnv//\"/\\\"}\" > ./seed-node.mainnet.env"
    # ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/EXPOSE_IP=.*/EXPOSE_IP=\\\"$seedComputerInternalIp\\\"/g\" ./seed-node.mainnet.arg"
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/EXTERNAL_ADDRESS=.*/EXTERNAL_ADDRESS=\\\"$seedComputerIp:26656\\\"/g\" ./seed-node.mainnet.env"
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/config && echo \"${GENESIS_JSON//\"/\\\"}\" > ./genesis.mainnet.json"

    echo -ne "Preparing seed($i)'s peers...";
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PERSISTENT_PEERS=.*/PERSISTENT_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID@$validatorInternalIp:26656\\\"/g\" ./seed-node.mainnet.env"
    ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PRIVATE_PEERS=.*/PRIVATE_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID\\\"/g\" ./seed-node.mainnet.env"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Stopping previous instances of the seed($i)...";
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sudo docker-compose --env-file ./seed-node.mainnet.arg -f ./init-seed-node.yml -p cudos-init-seed-node down 2> /dev/null")
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sudo docker-compose --env-file ./seed-node.mainnet.arg -f ./start-seed-node.yml -p cudos-start-seed-node down 2> /dev/null")
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Initializing seed($i)...";
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sudo docker-compose --env-file ./seed-node.mainnet.arg -f ./init-seed-node.yml -p cudos-init-seed-node up --build 2> /dev/null")
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Clean-up after the initialization of the seed($i)...";
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sudo docker-compose --env-file ./seed-node.mainnet.arg -f ./init-seed-node.yml -p cudos-init-seed-node down 2> /dev/null")
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    echo -ne "Starting seed($i)...";
    if [ "$loggingDriver" = "gcplogs" ]; then
        startYmlOverrideLogging="-f ./start-seed-node.override.logging.yml"
    else
        startYmlOverrideLogging=""
    fi
    # ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"/{PORT26660}:26657/d\" ./start-seed-node.yml"
    if [ "$monitoringEnabled" = "false" ]; then
        ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"/{PORT26660}:26660/d\" ./start-seed-node.yml"
    fi
    result=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sudo docker-compose --env-file ./seed-node.mainnet.arg -f ./start-seed-node.yml $startYmlOverrideLogging -p cudos-start-seed-node up --build -d 2> /dev/null")
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
        exit 1;
    fi
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

    tendermintNodeId=$(ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "sudo docker container exec $startContainerName cudos-noded tendermint show-node-id")
    SEEDS_PEERS+=("$tendermintNodeId@$seedComputerInternalIp:26656")
    SEEDS_PUBLIC_PEERS+=("$tendermintNodeId@$seedComputerIp:26656")
done

SEEDS_PEERS_LIST=$(joinBy , ${SEEDS_PEERS[@]})
SEEDS_PUBLIC_PEERS_LIST=$(joinBy , ${SEEDS_PUBLIC_PEERS[@]})

echo -ne "Starting the seeds...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
