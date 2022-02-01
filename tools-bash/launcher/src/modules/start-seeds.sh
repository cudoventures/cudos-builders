#!/bin/bash -i

computersSize=$(getComputersSize)
seedsSize=$(getSeedsSize)

for i in $(seq 0 $(($seedsSize-1)))
do
    seedComputerIp=""
    seedComputerPort=""
    seedComputerUser=""
    seedComputerId=$(getSeedComputerId $i)

    for j in $(seq 0 $(($computersSize-1)))
    do
        computerId=$(getComputerId $j)
        if [ "$computerId" = "$seedComputerId" ]; then
            seedComputerIp=$(getComputerIp $j)
            seedComputerPort=$(getComputerPort $j)
            seedComputerUser=$(getComputerUser $j)

            branch="cudos-dev"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosNode && git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosBuilders && git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosGravityBridge && git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge"

            echo ${GENESIS_JSON//\"/\\\"}
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/config && echo \"${GENESIS_JSON//\"/\\\"}\" > ./genesis.mainnet.json"

            seedNodeEnv=$(cat $(getSeedEnvPath $i))
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && echo \"$seedNodeEnv\" > ./seed-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID@cudos-start-root-node:26656\\\"/g\" ./seed-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PRIVATE_PEERS=/PRIVATE_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID\\\"/g\" ./seed-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PORT26656=26656/PORT26656=\\\"60101\\\"/g\" ./seed-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PORT26657=26657/PORT26657=\\\"60102\\\"/g\" ./seed-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PORT26660=26660/PORT26660=\\\"60103\\\"/g\" ./seed-node.mainnet.arg" # only for dev

            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && docker-compose --env-file ./seed-node.mainnet.arg -f ./init-seed-node.yml -p cudos-init-seed-node up --build"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && docker-compose --env-file ./seed-node.mainnet.arg -f ./init-seed-node.yml -p cudos-init-seed-node down"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && docker-compose --env-file ./seed-node.mainnet.arg -f ./start-seed-node.yml -p cudos-start-seed-node down"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && docker-compose --env-file ./seed-node.mainnet.arg -f ./start-seed-node.yml -p cudos-start-seed-node up --build -d"
            break;
        fi
    done
done