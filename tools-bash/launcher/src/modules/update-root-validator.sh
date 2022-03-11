#!/bin/bash -i

validatorComputerId=$(getValidatorComputerId)
validatorComputerIndex=$(getComputerIndexById "$validatorComputerId")

validatorComputerIp=$(getComputerIp $validatorComputerIndex)
validatorComputerInternalIp=$(getComputerInternalIp $validatorComputerIndex)
validatorComputerPort=$(getComputerPort $validatorComputerIndex)
validatorComputerUser=$(getComputerUser $validatorComputerIndex)

echo -ne "Updating root-validator...";
arg=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosBuilders/docker/root-node && cat ./root-node.mainnet.arg")
validatorStartContainerName=$(readEnvFromString "$arg" "START_CONTAINER_NAME")
validatorVolumeName=$(readEnvFromString "$arg" "VOLUME_NAME")
unset arg

ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "cd $PARAM_SOURCE_DIR/CudosData/$validatorVolumeName/config && sudo sed -i \"s/persistent_peers = \".*\"/persistent_peers = \\\"$SENTRIES_PUBLIC_PEERS_LIST\\\"/g\" ./config.toml"

result=$(ssh -o "StrictHostKeyChecking no" ${validatorComputerUser}@${validatorComputerIp} -p ${validatorComputerPort} "sudo docker restart $validatorStartContainerName")

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

