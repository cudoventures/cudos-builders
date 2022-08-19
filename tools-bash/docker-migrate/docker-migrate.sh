#!/bin/bash

#------------------------------------------------------------------------------
#VARIABLES
NC='\033[0m'             # Text Reset
RED='\033[0;31m'         # Red
GREEN='\033[0;32m'       # Green

timestamp=('date +"%Y-%m-%d**%H:%M:%S"')

dataDir="/var/lib/cudos/cudos-data"
waitTime=10

#hardcoded names of expected docker container names to search for
containerNames="cudos-start-full-node-client-local-01,cudos-start-full-node-client-mainnet,cudos-start-full-node-client-testnet-private-01,cudos-start-full-node-client-testnet-public-01,cudos-start-full-node-testnet-public-zone02,cudos-start-full-node-testnet-public-zone03,cudos-start-root-node-02,cudos-start-root-node,cudos-start-seed-node-client-local-01,cudos-start-seed-node-client-mainnet,cudos-start-seed-node-client-testnet-private-01,cudos-start-seed-node-client-testnet-public-01,cudos-start-seed-node-01,cudos-start-seed-node-mainnet,cudos-start-seed-node-testnet-private,cudos-start-seed-node-testnet-public-zone01,cudos-start-seed-node-testnet-public-zone02,cudos-start-seed-node-testnet-public-zone03,cudos-start-sentry-node-client-local-01,cudos-start-sentry-node-client-mainnet,cudos-start-sentry-node-client-testnet-private-01,cudos-start-sentry-node-client-testnet-public-01,cudos-start-sentry-node-01,cudos-start-sentry-node-mainnet,cudos-start-sentry-node-testnet-private,cudos-start-sentry-node-testnet-public-zone01,cudos-start-sentry-node-testnet-public-zone02,cudos-start-sentry-node-testnet-public-zone03,cudos-standalone-node"
#------------------------------------------------------------------------------
#CHECKS
if [ "$EUID" -ne 0 ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed as root";
    exit 1;
fi

if [ ! -x "$(command -v jq)" ]; then
    echo -e "${RED}Error:${NC} You must install jq";
    exit 1;
fi

if [ ! -x "$(command -v rsync)" ]; then
    echo -e "${RED}Error:${NC} You must install rsync";
    exit 1;
fi

if ! id "cudos" &>/dev/null; then
    echo -e "${RED}Error:${NC} user \"cudos\" must exist";
    exit 1;
fi

#------------------------------------------------------------------------------
IFS=',' read -r -a containerNamesArray <<< "$containerNames";

#get list of active containers
dockerContainerList=$(docker container list)

#search for container name in active containers list
foundContainers=()
for containerName in "${containerNamesArray[@]}"
do
    #if container name found in list, check if it produces new blocks
    foundContainer=$(echo -e "$dockerContainerList" | grep $containerName);
    if [ ! -z "$foundContainer" ]; then 
        printf "$($timestamp): Checking container ${GREEN}${containerName}${NC} for activeness...\n";

        firstBlockCheckHeight=$(docker container exec -t ${containerName} cudos-noded status | tr -d '\r' | jq ".SyncInfo.latest_block_height") ;
        if [ ! -z "$firstBlockCheckHeight" ]; then
            printf "$($timestamp): ${GREEN}${containerName}${NC}: First block check height: ${GREEN}${firstBlockCheckHeight}${NC} \n";

            sleep ${waitTime};

            secondBlockCheckHeight=$(docker container exec -t ${containerName} cudos-noded status | tr -d '\r' | jq ".SyncInfo.latest_block_height");
            printf "$($timestamp): ${GREEN}${containerName}${NC}: Second block check height: ${GREEN}${secondBlockCheckHeight}${NC} \n";

            if [ "$firstBlockCheckHeight" != "$secondBlockCheckHeight" ]; then
                foundContainers+=("$containerName");
                printf "$($timestamp): Found active container that produces blocks: ${GREEN}${containerName}${NC}\n\n";
            else
                printf "$($timestamp): Container ${RED}${containerName}${NC} didn't produce a new block in ${waitTime} seconds.\n\n";
            fi
        else 
            printf "$($timestamp): ${RED}Block height not found${NC}. Container probably not producing blocks.\n\n";
        fi
    fi
done

# check how many containers found and continue only if ONLY 1 is found
foundContainersCount=${#foundContainers[@]}
if [[ $foundContainersCount -eq 0 ]]; then
    printf "$($timestamp): ${RED}ERROR: No active containers producing blocks found${NC}\n\n";
    exit 1;
elif [[ $foundContainersCount -gt 1 ]]; then
    printf "$($timestamp): ${RED}ERROR: More than 1 active containers producing blocks found${NC}\n\n";
    exit 1;
else
    printf "$($timestamp): Found active container producing blocks: ${GREEN}${foundContainers[0]}${NC}\n\n";
fi

containerName=${foundContainers[0]}

#find mounted dir for cudos-data
printf "$($timestamp): Finding mounted dir for cudos-data...\n";
mountedDir=$(docker container inspect ${containerName} | jq -c '.[0].Mounts | map(select( .Destination | contains("/usr/cudos/cudos-data"))) | .[0].Source');
mountedDir="${mountedDir//\"}";

#check if old and new data dir are on the same volume
mountedDirVolume=$(df -P -- "$mountedDir" | awk 'NR==2 {print $1}');
newDirVolume=$(df -P -- "$dataDir" | awk 'NR==2 {print $1}');

#if we are going to copy the data, check for enough space before stopping the container
if [ "$mountedDirVolume" != "$newDirVolume" ]; then
    printf "$($timestamp): Checking if space is enough to copy data from container to new dir...\n"

    freeSpaceInKiB=$(df -P "$dataDir" | tail -1 | awk '{print $4}');
    freeSpaceRequirementInKiB=$(sudo du -s /var/lib/cudos/cudos-data | cut -f1);

    if (( freeSpaceInKiB < freeSpaceRequirementInKiB )); then
        printf "${RED}ERROR:${NC} Free space is less than $freeSpaceRequirementInKiB KiB (Available = $freeSpaceInKiB KiB)...\n";
        exit 1;
    fi
fi

#stop container
printf "$($timestamp): Stopping container: ${GREEN}${containerName}${NC}...\n";
docker container stop ${containerName};

#if there are no more containers stop docker service as well
runningContainerCount=$(docker ps -q | wc -l);
if [ $runningContainerCount -eq 0 ]; then
    printf "$($timestamp): Stopping docker service...\n";
    systemctl stop docker.service
fi


#create dir for cudos-data
printf "$($timestamp): Creating data dir if missing...\n";
mkdir -p $dataDir;

#MOVE or COPY data folder
if [ "$mountedDirVolume" = "$newDirVolume" ]; then
    printf "$($timestamp): Mounted data dir and new data dir are on the same volume. Moving...\n"
    rsync -ra $mountedDir/* $dataDir/
else
    printf "$($timestamp): Mounted data dir and new data dir are NOT on the same volume. Copying...\n"
    \cp -rf $mountedDir/* $dataDir/
fi

printf "$($timestamp): Changing ownership of data dir to ${GREEN}cudos${NC}...\n\n"
chown -R cudos $dataDir

#start cosmovisor
printf "$($timestamp): Starting cosmovisor service...\n"
systemctl enable cosmovisor.service