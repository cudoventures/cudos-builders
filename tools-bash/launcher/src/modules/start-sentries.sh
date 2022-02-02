#!/bin/bash -i

computersSize=$(getComputersSize)
sentriesSize=$(getSentriesSize)

for i in $(seq 0 $(($sentriesSize-1)))
do
    sentryComputerIp=""
    sentryComputerPort=""
    sentryComputerUser=""
    sentryComputerId=$(getSentryComputerId $i)

    for j in $(seq 0 $(($computersSize-1)))
    do
        computerId=$(getComputerId $j)
        if [ "$computerId" = "$sentryComputerId" ]; then
            sentryComputerIp=$(getComputerIp $j)
            sentryComputerPort=$(getComputerPort $j)
            sentryComputerUser=$(getComputerUser $j)

            branch="cudos-dev"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosNode && git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosBuilders && git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR && rm -rf ./CudosGravityBridge && git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge"

            echo ${GENESIS_JSON//\"/\\\"}
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/config && echo \"${GENESIS_JSON//\"/\\\"}\" > ./genesis.mainnet.json"

            sentryNodeEnv=$(cat $(getSentryEnvPath $i))
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && echo \"$sentryNodeEnv\" > ./sentry-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID@cudos-start-root-node:26656\\\"/g\" ./sentry-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PRIVATE_PEERS=/PRIVATE_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID\\\"/g\" ./sentry-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PORT26656=26656/PORT26656=\\\"60201\\\"/g\" ./sentry-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PORT26657=26657/PORT26657=\\\"60202\\\"/g\" ./sentry-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PORT26660=26660/PORT26660=\\\"60203\\\"/g\" ./sentry-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PORT1317=1317/PORT1317=\\\"60204\\\"/g\" ./sentry-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && sed -i \"s/PORT9090=9090/PORT9090=\\\"60205\\\"/g\" ./sentry-node.mainnet.arg" # only for dev

            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && docker-compose --env-file ./sentry-node.mainnet.arg -f ./init-sentry-node.yml -p cudos-init-sentry-node up --build"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && docker-compose --env-file ./sentry-node.mainnet.arg -f ./init-sentry-node.yml -p cudos-init-sentry-node down"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && docker-compose --env-file ./sentry-node.mainnet.arg -f ./start-sentry-node.yml -p cudos-start-sentry-node down"
            ssh -o "StrictHostKeyChecking no" ${sentryComputerUser}@${sentryComputerIp} -p ${sentryComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node && docker-compose --env-file ./sentry-node.mainnet.arg -f ./start-sentry-node.yml -p cudos-start-sentry-node up --build -d"
            break;
        fi
    done
done