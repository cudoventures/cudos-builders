#!/bin/bash -i

echo -ne "Validating instances...";

computersSize=$(getComputersSize)
for i in $(seq 0 $(($computersSize-1)))
do
    ip=$(getComputerIp $i)
    port=$(getComputerPort $i)
    user=$(getComputerUser $i)

    ssh -q -o "StrictHostKeyChecking no" ${user}@${ip} -p ${port} exit
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to establish SSH connection to ${user}@${ip}:${port}";
        exit 1;
    fi;

    result=$(ssh -o "StrictHostKeyChecking no" ${user}@${ip} -p ${port} "sudo -n true")
    if [ "$result" != "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The user $user of $ip:$port does not have sudo access without password";
        exit 1;
    fi

    ssh -o "StrictHostKeyChecking no" ${user}@${ip} -p ${port} "sudo mkdir -p \"$PARAM_SOURCE_DIR\" && sudo chown ${user} \"$PARAM_SOURCE_DIR\""

    result=$(ssh -o "StrictHostKeyChecking no" ${user}@${ip} -p ${port} "if [ ! -x \"$(command -v docker)\" ]; then echo '1'; fi;")
    if [ "$result" = "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The instance $ip:$port does not have docker installed";
        exit 1;
    fi

    result=$(ssh -o "StrictHostKeyChecking no" ${user}@${ip} -p ${port} "if [ ! -x \"$(command -v docker-compose)\" ]; then echo '1'; fi;")
    if [ "$result" = "1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The instance $ip:$port does not have docker installed";
        exit 1;
    fi

    freeSpaceInKiB=$(ssh -o "StrictHostKeyChecking no" ${user}@${ip} -p ${port} "df -P \"$PARAM_SOURCE_DIR\" | tail -1 | awk '{print \$4}'")
    freeSpaceRequirementInKiB=500000000
    if (( freeSpaceInKiB < freeSpaceRequirementInKiB )); then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The instance $ip:$port has less than $freeSpaceRequirementInKiB KiB free space available (Available = $freeSpaceInKiB KiB)";
        exit 1;
    fi
done

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";