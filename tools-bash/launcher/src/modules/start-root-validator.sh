#!/bin/bash -i

validatorComputerId=$(getValidatorComputerId)
validatorOrchEthAddress=$(getValidatorOrchEthAddress)
validatorOrchEthPrivKey=$(getValidatorOrchEthPrivKey)

validatorComputerIp=""
validatorComputerPort=""
validatorComputerUser=""

computersSize=$(getComputersSize)
for i in $(seq 0 $(($computersSize-1)))
do
    computerId=$(getComputerId $i)
    if [ "$computerId" = "$validatorComputerId" ]; then
        validatorComputerIp=$(getComputerIp $i)
        validatorComputerPort=$(getComputerPort $i)
        validatorComputerUser=$(getComputerUser $i)
        break
    fi
done

alias SSH_VALIDATOR="ssh -o \"StrictHostKeyChecking no\" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort}"
branch="cudos-dev"
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR && rm -rf ./CudosNode && git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode"
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR && rm -rf ./CudosBuilders && git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders"
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR && rm -rf ./CudosGravityBridge && git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge"

rootNodeEnv=$(cat $(getValidatorEnvPath))
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && echo \"$rootNodeEnv\" > ./root-node.mainnet.env"

SSH_VALIDATOR "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sed -i \"s/PORT26656=26656/PORT26656=\\\"60001\\\"/g\" ./root-node.mainnet.arg" # only for dev
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sed -i \"s/PORT26660=26660/PORT26660=\\\"60002\\\"/g\" ./root-node.mainnet.arg" # only for dev

SSH_VALIDATOR "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && docker-compose --env-file ./root-node.mainnet.arg -f ./init-root-node.yml -p cudos-init-root-node up --build"
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && docker-compose --env-file ./root-node.mainnet.arg -f ./init-root-node.yml -p cudos-init-root-node down"
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node down"
SSH_VALIDATOR "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node up --build -d"

VALIDATOR_TENEDRMINT_NODE_ID=$(SSH_VALIDATOR "docker container exec cudos-start-root-node cudos-noded tendermint show-node-id")

GENESIS_JSON=$(SSH_VALIDATOR "docker container exec cudos-start-root-node /bin/bash -c \"cat \\\$CUDOS_HOME/config/genesis.json\"")

unalias SSH_VALIDATOR