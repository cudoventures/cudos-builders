#!/bin/bash -i

echo -ne "Validating...";

if [ "$PARAM_SOURCE_DIR" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_SOURCE_DIR must not be empty";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR does not exists";
    exit 1;
fi

if [ ! -w "$PARAM_SOURCE_DIR" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Permission denied while accessing folder $PARAM_SOURCE_DIR";
    exit 1;
fi

if [ "$STARTING" = "true" ]; then

    if [ "$IS_CLUSTERED_VALIDATOR" = "true" ]; then

        if [ "$PARAMS_PERSISTENT_PEERS" = "" ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAMS_PERSISTENT_PEERS must not be empty";
            exit 1;
        fi;

    fi;

    if [ "$IS_CLUSTERED_VALIDATOR" = "false" ]; then

        if [ "$PARAMS_SEED" = "" ]; then
            echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAMS_SEED must not be empty";
            exit 1;
        fi;

    fi;

    if [ "$PARAMS_PRIVATE_PEER_IDS" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAMS_PRIVATE_PEER_IDS must not be empty";
        exit 1;
    fi;

fi

if [ "$INITIALIZING" = "true" ]; then
    if [ "$(ls -A $PARAM_SOURCE_DIR)" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR is not empty";
        exit 1;
    fi;
fi

if [ "$STARTING" = "true" ]; then
    if [ ! -d "$PARAM_SOURCE_DIR/CudosBuilders" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosBuilders does not exists";
        exit 1;
    fi;

    if [ ! -d "$PARAM_SOURCE_DIR/CudosData" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosData does not exists";
        exit 1;
    fi;

    if [ ! -d "$PARAM_SOURCE_DIR/CudosGravityBridge" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosGravityBridge does not exists";
        exit 1;
    fi;

    if [ ! -d "$PARAM_SOURCE_DIR/CudosNode" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The folder $PARAM_SOURCE_DIR/CudosNode does not exists";
        exit 1;
    fi;
fi

if [ "$PARAM_VALIDATOR_MNEMONIC" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_VALIDATOR_MNEMONIC must not be empty";
    exit 1;
fi

numberOfWords=$(echo "$PARAM_VALIDATOR_MNEMONIC" | wc -w)
if ([ "$numberOfWords" != "12" ] && [ "$numberOfWords" != "24" ]); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_VALIDATOR_MNEMONIC must be 12 or 24 words phrase";
    exit 1;
fi;

if [ "$PARAM_KEYRING_OS_PASS" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_KEYRING_OS_PASS must not be empty";
    exit 1;
fi

if [ ! -x "$(command -v docker)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker";
    exit 1;
fi

if [ ! -x "$(command -v docker-compose)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker-compose";
    exit 1;
fi

freeSpaceInKiB=$(df -P . | tail -1 | awk '{print $4}')
# freeSpaceRequirementInKiB=750000000
freeSpaceRequirementInKiB=10000000
if (( freeSpaceInKiB < freeSpaceRequirementInKiB )); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Free space is less than 1TB ($freeSpaceInKiB KiB < $freeSpaceRequirementInKiB KiB)";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";