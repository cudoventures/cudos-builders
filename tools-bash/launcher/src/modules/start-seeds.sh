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

            seedNodeEnv=$(cat $(getSeedEnvPath $i))
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && echo \"$seedNodeEnv\" > ./seed-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PERSISTENT_PEERS=/PERSISTENT_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID@validatorComputerIp:60001\\\"/g\" ./seed-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PRIVATE_PEERS=/PRIVATE_PEERS=\\\"$VALIDATOR_TENEDRMINT_NODE_ID\\\"/g\" ./seed-node.mainnet.env"
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PORT26656=26656/PORT26656=\\\"60101\\\"/g\" ./seed-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PORT26660=26657/PORT26657=\\\"60102\\\"/g\" ./seed-node.mainnet.arg" # only for dev
            ssh -o "StrictHostKeyChecking no" ${seedComputerUser}@${seedComputerIp} -p ${seedComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node && sed -i \"s/PORT26660=26660/PORT26660=\\\"60103\\\"/g\" ./seed-node.mainnet.arg" # only for dev
            break;
        fi
    done
done

# `cd ${PathHelper.WORKING_DIR}/CudosBuilders/docker/seed-node`,
#                 `sed -i "s/PORT26656=60201/PORT26656=\"${seedNodeModel.port26656}\"/g" ./seed-node.local01.arg`,
#                 `sed -i "s/PORT26657=60202/PORT26657=\"${seedNodeModel.port26657}\"/g" ./seed-node.local01.arg`,
#                 `sed -i "s/PORT26660=60203/PORT26660=\"${seedNodeModel.port26660}\"/g" ./seed-node.local01.arg`,
#                 ...NodesHelper.getDockerExtraHosts('start-seed-node'),
#                 ...NodesHelper.getDockerConfig(this.genesisJsonString),
#                 `docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -p ${dockerContainerInitName} up --build`,
#                 `(docker-compose --env-file ./seed-node.local01.arg -f ./init-seed-node.yml -p ${dockerContainerInitName} down || true)`,
#                 `docker-compose --env-file ./seed-node.local01.arg -f ./start-seed-node.yml -p ${dockerContainerStartName} up --build -d`