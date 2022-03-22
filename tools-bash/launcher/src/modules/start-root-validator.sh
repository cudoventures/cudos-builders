#!/bin/bash -i

validatorComputerId=$(getValidatorComputerId)
validatorComputerIndex=$(getComputerIndexById "$validatorComputerId")

validatorComputerIp=$(getComputerIp $validatorComputerIndex)
validatorComputerInternalIp=$(getComputerInternalIp $validatorComputerIndex)
validatorComputerPort=$(getComputerPort $validatorComputerIndex)
validatorComputerUser=$(getComputerUser $validatorComputerIndex)

echo -ne "Preparing root-validator's repos...";
branch="v0.5.0"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosNode && git clone -q --branch $branch https://github.com/CudoVentures/cudos-node.git CudosNode"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosBuilders && git clone -q --branch $branch https://github.com/CudoVentures/cudos-builders.git CudosBuilders"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosGravityBridge && git clone -q --branch $branch https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

arg=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && cat ./root-node.mainnet.arg")
validatorStartContainerName=$(readEnvFromString "$arg" "START_CONTAINER_NAME")
validatorVolumeName=$(readEnvFromString "$arg" "VOLUME_NAME")
unset arg
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker stop $validatorStartContainerName 2> /dev/null")
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR && sudo rm -rf ./CudosData"

echo -ne "Cleaning the docker...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker system prune -a -f 2> /dev/null")
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container prune -f 2> /dev/null")
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Preparing root-validator's binary builder...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/binary-builder && sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

rootNodeEnv=$(cat $(getValidatorEnvPath))
monitoringEnabled=$(readEnvFromString "$rootNodeEnv" "MONITORING_ENABLED")
numberOfOrchestrators=$(readEnvFromString "$rootNodeEnv" "NUMBER_OF_ORCHESTRATORS")
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && echo \"${rootNodeEnv//\"/\\\"}\" > ./root-node.mainnet.env"
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sed -i \"s/EXPOSE_IP=.*/EXPOSE_IP=\\\"$validatorComputerInternalIp\\\"/g\" ./root-node.mainnet.arg"

# stop any running instance
# stop the docker
echo -ne "Stopping previous instances of the root-validator...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./init-root-node.yml -p cudos-init-root-node down 2> /dev/null")
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node down 2> /dev/null")
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Initializing root-validator...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./init-root-node.yml -p cudos-init-root-node up --build 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosData/$validatorVolumeName/config && sudo sed -i \"158s/enable = false/enable = true/\" ./app.toml"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Clean-up after the initialization of the root-validator...";
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./init-root-node.yml -p cudos-init-root-node down 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

echo -ne "Starting root-validator...";
if [ "$monitoringEnabled" = "false" ]; then
    ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sed -i \"/{PORT26660}:26660/d\" ./start-root-node.yml"
fi
# start the contianer
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node up --build -d 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
# wait until there is at least 1 block
while true
do
    sleep 1
    result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker exec $validatorStartContainerName /bin/bash -c \"cudos-noded status |& tee /tmp/cudos-status\" 2> /dev/null")    
    sleep 1
    cudosNodedStatus=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker exec $validatorStartContainerName /bin/bash -c \"cat /tmp/cudos-status\"")
    latestBlockHeight=$(echo $cudosNodedStatus | jq '.SyncInfo.latest_block_height')
    latestBlockHeight=${latestBlockHeight//\"/}
    if [ "$latestBlockHeight" != "0" ]; then
        result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker exec $validatorStartContainerName /bin/bash -c \"rm -f /tmp/cudos-status\"")
        break
    fi
done
# stop the docker
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node down 2> /dev/null")
# set sleep infinity
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sed -i \"s/cudos-noded start/sleep infinity/\" ./start-root-node.dockerfile"
# start the sleeping docker
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node up --build -d 2> /dev/null")
# export genesis
tmpFilePath="/tmp/genesis.cudos.json"
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec $validatorStartContainerName /bin/bash -c \"cudos-noded export |& tee $tmpFilePath\" 2> /dev/null")
exportedGenesis=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec $validatorStartContainerName /bin/bash -c \"cat $tmpFilePath && rm -f $tmpFilePath\"")
# reset the data
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec $validatorStartContainerName /bin/bash -c \"cudos-noded unsafe-reset-all\" 2> /dev/null")
# stop the docker
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node down 2> /dev/null")
# merge genesis
echo $exportedGenesis > "$tmpFilePath"
cp "$tmpFilePath" "$WORKING_EXPORT_DIR/genesis-root.json"
source "$WORKING_SRC_DIR/modules/merge-genesis.sh" "$tmpFilePath"
rm -f "$tmpFilePath"
scp -o "StrictHostKeyChecking no" -P ${validatorComputerPort} "$RESULT_GENESIS_PATH" ${validatorComputerUser}@${validatorComputerIp}:"/tmp/genesis.mainnet.json" &>/dev/null
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosData/$validatorVolumeName/config && sudo mv /tmp/genesis.mainnet.json ./genesis.json"

# restore cudos-noded start
ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sed -i \"s/sleep infinity/cudos-noded start/\" ./start-root-node.dockerfile"
# start the node
result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && sudo docker-compose --env-file ./root-node.mainnet.arg -f ./start-root-node.yml -p cudos-start-root-node up --build -d 2> /dev/null")
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error $?: ${result}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

VALIDATOR_TENEDRMINT_NODE_ID=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec $validatorStartContainerName cudos-noded tendermint show-node-id")
if [ "$VALIDATOR_TENEDRMINT_NODE_ID" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Root validator's tendermint node id is not defined";
    exit 1;
fi

genesisJson=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec cudos-start-root-node /bin/bash -c \"head \\\$CUDOS_HOME/config/genesis.json\"")
if [ "$genesisJson" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The genesis.json is not defined";
    exit 1;
fi

orchestratorMnemonics=()
ORCHESTRATOR_MNEMONICS_LIST=""
for i in $(seq 1 $(($numberOfOrchestrators))); do
    orchMnemonic=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker container exec cudos-start-root-node /bin/bash -c \"cat \\\$CUDOS_HOME/orch-$i.wallet\" | tail -n 1")
    if [ "$orchMnemonic" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to get the wallet of orchestrator $i";
        exit 1;
    fi
    orchestratorMnemonics+=("orch-$i:${orchMnemonic// /_}\n")
done
ORCHESTRATOR_MNEMONICS_LIST=$(joinBy , ${orchestratorMnemonics[@]})
ORCHESTRATOR_MNEMONICS_LIST=${ORCHESTRATOR_MNEMONICS_LIST//,/}
ORCHESTRATOR_MNEMONICS_LIST=${ORCHESTRATOR_MNEMONICS_LIST//_/ }

echo -ne "Starting the root-validator...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
