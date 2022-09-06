#!/bin/bash

dataDir="/var/lib/cudos/cudos-data"
waitTime=10

# hardcoded names of expected docker container names to search for
containerNames="cudos-start-full-node-client-local-01,cudos-start-full-node-client-mainnet,cudos-start-full-node-client-testnet-private-01,cudos-start-full-node-client-testnet-public-01,cudos-start-full-node-testnet-public-zone02,cudos-start-full-node-testnet-public-zone03,cudos-start-root-node-02,cudos-start-root-node,cudos-start-seed-node-client-local-01,cudos-start-seed-node-client-mainnet,cudos-start-seed-node-client-testnet-private-01,cudos-start-seed-node-client-testnet-public-01,cudos-start-seed-node-01,cudos-start-seed-node-mainnet,cudos-start-seed-node-testnet-private,cudos-start-seed-node-testnet-public-zone01,cudos-start-seed-node-testnet-public-zone02,cudos-start-seed-node-testnet-public-zone03,cudos-start-sentry-node-client-local-01,cudos-start-sentry-node-client-mainnet,cudos-start-sentry-node-client-testnet-private-01,cudos-start-sentry-node-client-testnet-public-01,cudos-start-sentry-node-01,cudos-start-sentry-node-mainnet,cudos-start-sentry-node-testnet-private,cudos-start-sentry-node-testnet-public-zone01,cudos-start-sentry-node-testnet-public-zone02,cudos-start-sentry-node-testnet-public-zone03,cudos-standalone-node"

# checks ------------------------------------------------------------------------------
if [ "$EUID" -ne 0 ]; then
    echo -e "Error: The script MUST be executed as root";
    exit 1
fi

if [ ! -x "$(command -v jq)" ]; then
    echo -e "Error: You must install jq";
    exit 1;
fi

if [ ! id "cudos" &>/dev/null ]; then
    echo -e "Error: user \"cudos\" must exist. Have you installed the Top Level package?";
    exit 1;
fi

if [ ! -d "$dataDir" ]; then
    echo -e "Error: Data dir is missing. Have you installed the Top Level package?";
    exit 1;
fi

cudos-noded version &> /dev/null;
if [ "$?" != "0" ]; then
    echo -e "Error: cudos-noded binary is missing. Have you installed the Top Level package?";
    exit 1;
fi
exit 0;

# ------------------------------------------------------------------------------
IFS=',' read -r -a containerNamesArray <<< "$containerNames"

# get list of active containers
dockerContainerList=$(docker container list)

# search for container name in active containers list
foundContainers=()
for containerName in "${containerNamesArray[@]}"
do
    # if container name found in list, check if it produces new blocks
    validContainer=$(docker container inspect -f '{{.State.Running}}' "$containerName" 2>/dev/null)
    if [ "$?" = "0" ] && [ "$validContainer" = "true" ]; then # the container exists and it is running
        printf "$(date +"%Y-%m-%d**%H:%M:%S"): Checking container ${containerName} for activeness...\n"

        firstBlockCheckHeight=$(docker container exec -t ${containerName} cudos-noded status | tr -d '\r' | jq ".SyncInfo.latest_block_height") ;
        if [ ! -z "$firstBlockCheckHeight" ]; then
            printf "$(date +"%Y-%m-%d**%H:%M:%S"): ${containerName}: First block check height: ${firstBlockCheckHeight} \n"

            sleep ${waitTime};

            secondBlockCheckHeight=$(docker container exec -t ${containerName} cudos-noded status | tr -d '\r' | jq ".SyncInfo.latest_block_height")
            printf "$(date +"%Y-%m-%d**%H:%M:%S"): ${containerName}: Second block check height: ${secondBlockCheckHeight} \n"

            if [ "$firstBlockCheckHeight" != "$secondBlockCheckHeight" ]; then
                foundContainers+=("$containerName")
                printf "$(date +"%Y-%m-%d**%H:%M:%S"): Found active container that produces blocks: ${containerName}\n\n"
            else
                printf "$(date +"%Y-%m-%d**%H:%M:%S"): Container ${containerName} didn't produce a new block in ${waitTime} seconds.\n\n"
            fi
        else 
            printf "$(date +"%Y-%m-%d**%H:%M:%S"): Block height not found. Container probably not producing blocks.\n\n"
        fi
    fi
done

# check how many containers found and continue only if ONLY 1 is found
foundContainersCount=${#foundContainers[@]}
if [[ $foundContainersCount -eq 0 ]]; then
    printf "$(date +"%Y-%m-%d**%H:%M:%S"): ERROR: No active containers producing blocks found\n\n"
    exit 0
elif [[ $foundContainersCount -gt 1 ]]; then
    printf "$(date +"%Y-%m-%d**%H:%M:%S"): ERROR: More than 1 active containers producing blocks found\n\n"
    exit 0
else
    printf "$(date +"%Y-%m-%d**%H:%M:%S"): Selected active container that is producing blocks: ${foundContainers[0]}\n\n"
fi

containerName=${foundContainers[0]}

# find mounted dir for cudos-data
printf "$(date +"%Y-%m-%d**%H:%M:%S"): Finding mounted dir for cudos-data...\n"
mountedDir=$(docker container inspect ${containerName} | jq -c '.[0].Mounts | map(select(.Source | contains("CudosData/"))) | .[0].Source')
mountedDir="${mountedDir//\"}"

# check if old and new data dir are on the same volume
mountedDirVolume=$(df -P -- "$mountedDir" | awk 'NR==2 {print $1}')
newDirVolume=$(df -P -- "$dataDir" | awk 'NR==2 {print $1}')

if [ "$mountedDirVolume" != "$newDirVolume" ]; then
    dataBuffer="10000000"
    mountedDirSizeInKiB=$(du -s "$mountedDir" | awk '{print $1}')
    mountedDirSizeInKiB=$(($mountedDirSizeInKiB + $dataBuffer))
    newDirVolumefreeSpaceInKiB=$(df -P "$dataDir" | tail -1 | awk '{print $4}')
    if (($mountedDirSizeInKiB > $newDirVolumefreeSpaceInKiB)); then
        printf "$(date +"%Y-%m-%d**%H:%M:%S"): There is not enough space on the target volume. Current data dir size is ${mountedDirSizeInKiB} kB. The target volume's free space is ${newDirVolumefreeSpaceInKiB} kB  \n"
    fi
fi

# stop container
printf "$(date +"%Y-%m-%d**%H:%M:%S"): Stopping container: ${containerName}...\n";
docker container stop ${containerName};

# if there are no more containers stop docker service as well
runningContainerCount=$(docker ps -q | wc -l);
if [ $runningContainerCount -eq 0 ]; then
    printf "$(date +"%Y-%m-%d**%H:%M:%S"): Stopping container: ${containerName}...\n"
    systemctl disable docker.service
    systemctl disable docker.socket
    systemctl stop docker.service
    systemctl stop docker.socket
fi

# MOVE or COPY data folder
if [ "$mountedDirVolume" = "$newDirVolume" ]; then
    printf "$(date +"%Y-%m-%d**%H:%M:%S"): Mounted data dir and new data dir are on the same volume. Moving...\n"
    cd "$dataDir"
    for dataSubfolder in ./*; do
        [[ "$dataSubfolder" =~ .*"cosmovisor".* ]] && continue;
        rm -rf "$dataSubfolder"
    done
    mv -f "$mountedDir"/* "$dataDir"/
else
    printf "$(date +"%Y-%m-%d**%H:%M:%S"): Mounted data dir and new data dir are NOT on the same volume. Copying...\n"
    if [ ! -x "$(command -v rsync)" ]; then
        \cp -rf "$mountedDir"/* "$dataDir"/
    else
        rsync -ra "$mountedDir"/* "$dataDir"/
    fi
fi

printf "$(date +"%Y-%m-%d**%H:%M:%S"): Changing ownership of data dir to cudos...\n\n"
chown -R cudos:cudos "$dataDir"

#start cosmovisor
printf "$(date +"%Y-%m-%d**%H:%M:%S"): Starting cosmovisor service...\n"
systemctl enable cosmovisor@cudos
systemctl start cosmovisor@cudos
