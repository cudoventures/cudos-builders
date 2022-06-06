#!/bin/bash -i

echo -ne "Validating...";

if [ ! -x "$(command -v docker)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker";
    exit 1;
fi

if [ ! -x "$(command -v docker-compose)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install docker-compose";
    exit 1;
fi

if [ ! -x "$(command -v jq)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install jq";
    exit 1;
fi

if [ ! -x "$(command -v git)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must install git";
    exit 1;
fi

if [ "$PARAM_SOURCE_DIR" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_SOURCE_DIR must not be empty";
    exit 1;
fi

if ([ "$PARAM_MODE" != "seed-node" ] && [ "$PARAM_MODE" != "sentry-node" ] && [ "$PARAM_MODE" != "validator-node" ]); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_NODE_NAME must be one of the following ${STYLE_BOLD}root-node${STYLE_DEFAULT} | ${STYLE_BOLD}seed-node${STYLE_DEFAULT} | ${STYLE_BOLD}sentry-node${STYLE_DEFAULT} | ${STYLE_BOLD}validator-node${STYLE_DEFAULT}";
    exit 1;
fi

if ([ "$PARAM_NETWORK" != "testnet-public" ] && [ "$PARAM_NETWORK" != "testnet-private" ] && [ "$PARAM_NETWORK" != "mainnet" ] && [ "$PARAM_NETWORK" != "local" ]); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_NETWORK must be one of the following ${STYLE_BOLD}testnet-public${STYLE_DEFAULT} | ${STYLE_BOLD}testnet-private${STYLE_DEFAULT} | ${STYLE_BOLD}mainnet${STYLE_DEFAULT} | ${STYLE_BOLD}local${STYLE_DEFAULT}";
    exit 1;
fi

if [ "$PARAM_NETWORK" = "local" ]; then

    if [ ! -f "$WORKING_DIR/../../docker/config/genesis.local.json" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/../../docker/config/genesis.local.json file is missing";
        exit 1
    fi

    if [ ! -f "$WORKING_DIR/../../docker/config/persistent-peers.local.config" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/../../docker/config/persistent-peers.local.config file is missing";
        exit 1
    fi

    if [ ! -f "$WORKING_DIR/../../docker/config/seeds.local.config" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/../../docker/config/seeds.local.config file is missing";
        exit 1
    fi

    if [ ! -f "$WORKING_DIR/../../docker/config/state-sync-rpc-servers.local.config" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/../../docker/config/state-sync-rpc-servers.local.config file is missing";
        exit 1
    fi

fi

if [ "$PARAM_MODE" = "seed-node" ]; then
    NODE_NAME="seed-node"

    if [ "$PARAM_NETWORK" = "testnet-private" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.env"
    elif [ "$PARAM_NETWORK" = "testnet-public" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.env"
    elif [ "$PARAM_NETWORK" = "mainnet" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.mainnet.env"
    elif [ "$PARAM_NETWORK" = "local" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.local01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.local01.env"
    fi

elif [ "$PARAM_MODE" = "sentry-node" ]; then
    NODE_NAME="sentry-node"

    if [ "$PARAM_NETWORK" = "testnet-private" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.env"
    elif [ "$PARAM_NETWORK" = "testnet-public" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.env"
    elif [ "$PARAM_NETWORK" = "mainnet" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.mainnet.env"
    elif [ "$PARAM_NETWORK" = "local" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.local01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.local01.env"
    fi

elif [ "$PARAM_MODE" = "validator-node" ]; then
    NODE_NAME="full-node"

    if [ "$PARAM_NETWORK" = "testnet-private" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.env"
    elif [ "$PARAM_NETWORK" = "testnet-public" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.env"
    elif [ "$PARAM_NETWORK" = "mainnet" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.mainnet.env"
    elif [ "$PARAM_NETWORK" = "local" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.local01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.local01.env"
    fi
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
