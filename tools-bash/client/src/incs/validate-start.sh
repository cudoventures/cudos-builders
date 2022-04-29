#!/bin/bash -i

echo -ne "Validating start...";

if [ "$PARAM_VALIDATOR_MNEMONIC" != "" ]; then

    if [ "$PARAM_STAKING_AMOUNT" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_STAKING_AMOUNT must not be empty";
        exit 1;
    fi

    if (( "$PARAM_STAKING_AMOUNT" < "2000000000000000000000000" )); then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_STAKING_AMOUNT must be >= 2000000000000000000000000";
        exit 1;
    fi

    if [ ${#PARAM_STAKING_AMOUNT} -lt 25 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_STAKING_AMOUNT must be >= 2000000000000000000000000";
        exit 1;
    fi

    if [ "$PARAM_KEYRING_OS_PASS" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_KEYRING_OS_PASS must not be empty";
        exit 1;
    fi

    if [ ${#PARAM_KEYRING_OS_PASS} -lt 8 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_KEYRING_OS_PASS must be at least 8 characters";
        exit 1;
    fi

fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosData" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Data folder is missing - $PARAM_SOURCE_DIR/CudosData does not exists";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosNode" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosNode older is missing - $PARAM_SOURCE_DIR/CudosNode does not exists";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosGravityBridge" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosGravityBridge folder is missing - $PARAM_SOURCE_DIR/CudosGravityBridge does not exists";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosBuilders" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosBuilders folder is missing - $PARAM_SOURCE_DIR/CudosBuilders does not exists";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
