#!/bin/bash -i

echo -ne "Validating...";

if [ "$PARAM_SOURCE_DIR" = "" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The param PARAM_SOURCE_DIR must not be empty";
    exit 1
fi

if [ ! -d "$PARAM_SOURCE_DIR" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The folder $PARAM_SOURCE_DIR does not exists";
    exit 1
fi

if [ ! -w "$PARAM_SOURCE_DIR" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} Permission denied while accessing folder $PARAM_SOURCE_DIR";
    exit 1
fi

if [ "$(ls -A $PARAM_SOURCE_DIR)" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The folder $PARAM_SOURCE_DIR is not empty";
    exit 1
fi

if [ ! -x "$(command -v docker)" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} You must install docker";
    exit 1
fi

if [ ! -x "$(command -v docker-compose)" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} You must install docker-compose";
    exit 1
fi

freeSpaceInKiB=$(df -P . | tail -1 | awk '{print $4}')
# freeSpaceRequirementInKiB=750000000
freeSpaceRequirementInKiB=10000000
if (( freeSpaceInKiB < freeSpaceRequirementInKiB )); then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} Free space is less than 1TB ($freeSpaceInKiB KiB < $freeSpaceRequirementInKiB KiB)";
    exit 1
fi

echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";