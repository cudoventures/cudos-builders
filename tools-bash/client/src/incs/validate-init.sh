#!/bin/bash -i

echo -ne "Validating init...";

if [ "$PARAM_MONIKER" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_MONIKER must not be empty";
    exit 1;
fi

if [ "$PARAM_MONITORING_ENABLED" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_MONITORING_ENABLED must be one of the following ${STYLE_BOLD}false${STYLE_DEFAULT} | ${STYLE_BOLD}true${STYLE_DEFAULT}";
    exit 1;
fi

if [ -d "$PARAM_SOURCE_DIR/CudosData" ]; then
    dataContent=$(ls -A "$PARAM_SOURCE_DIR/CudosData")
    if [ "$dataContent" != "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} $PARAM_SOURCE_DIR/CudosData folder is not empty. It contains -> $dataContent";
        exit 1;
    fi
fi

if [ -d "$PARAM_SOURCE_DIR/CudosNode" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosNode folder exists - $PARAM_SOURCE_DIR/CudosNode exists";
    exit 1;
fi

if [ -d "$PARAM_SOURCE_DIR/CudosGravityBridge" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosGravityBridge folder exists - $PARAM_SOURCE_DIR/CudosGravityBridge exists";
    exit 1;
fi

if [ -d "$PARAM_SOURCE_DIR/CudosBuilders" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosBuilders folder exists - $PARAM_SOURCE_DIR/CudosBuilders exists";
    exit 1;
fi

if [ "$PARAM_NETWORK" = "testnet-private" ]; then
    REPO_BRANCH="v0.8.0"
elif [ "$PARAM_NETWORK" = "testnet-public" ]; then
    REPO_BRANCH="v0.9.0"
elif [ "$PARAM_NETWORK" = "mainnet" ]; then
    REPO_BRANCH="v0.9.0"
elif [ "$PARAM_NETWORK" = "local" ]; then
    REPO_BRANCH="cudos-dev"
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
