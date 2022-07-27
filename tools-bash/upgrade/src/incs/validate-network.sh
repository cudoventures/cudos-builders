#!/bin/bash -i

echo -ne "Validating network...";

# validating .envs
networkIdentified="false"
NETWORK_MAINNET="false"
NETWORK_TESTNET_PRIVATE="false"
NETWORK_TESTNET_PUBLIC="false"
NETWORK_NAME=""

NODE_DOCKER_BUILDER_PATH=""
NODE_ENV_PATH=""
NODE_ARG_PATH=""
ORCHESTRATOR_ENV_PATH=""
ORCHESTRATOR_ARG_PATH=""

HAS_ORCHESTRATOR="false"
START_THE_ORCHESTRATOR_AFTER_UPDATE="true"

if [ "$PARAM_NODE_NAME" = "root-node" ]; then

    NODE_BUILDERS_DOCKER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node"
    
    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.env"
        args=$(cat "$NODE_ENV_PATH")
        tokenContractAddress=$(readEnvFromString "$args" "CUDOS_TOKEN_CONTRACT_ADDRESS")
        if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
            NETWORK_MAINNET="true"
            source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
            networkIdentified="true"
        fi
        unset args
        unset tokenContractAddress

        if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.mainnet.env" ]; then
            ORCHESTRATOR_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.mainnet.arg"
            ORCHESTRATOR_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.mainnet.env"
        fi
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.private.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.private.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.private.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"

        if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.private.env" ]; then
            ORCHESTRATOR_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.private.arg"
            ORCHESTRATOR_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.private.env"
        fi
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"

        if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone01.env" ]; then
            ORCHESTRATOR_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone01.arg"
            ORCHESTRATOR_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone01.env"
        fi
    fi

fi

if [ "$PARAM_NODE_NAME" = "seed-node" ]; then

    NODE_BUILDERS_DOCKER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node"

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.private.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.private.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.private.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.mainnet.env"
        args=$(cat "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.mainnet.arg")
        volumeName=$(readEnvFromString "$args" "VOLUME_NAME")
        if [ -f "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json" ]; then
            tokenContractAddress=$(jq ".app_state.gravity.erc20_to_denoms[0].erc20" "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json")
            tokenContractAddress=${tokenContractAddress//\"/}
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.mainnet.env"
        args=$(cat "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.mainnet.arg")
        volumeName=$(readEnvFromString "$args" "VOLUME_NAME")
        if [ -f "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json" ]; then
            tokenContractAddress=$(jq ".app_state.gravity.erc20_to_denoms[0].erc20" "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json")
            tokenContractAddress=${tokenContractAddress//\"/}
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

fi

if [ "$PARAM_NODE_NAME" = "sentry-node" ]; then

    NODE_BUILDERS_DOCKER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node"

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.private.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.private.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.private.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.mainnet.env"
        args=$(cat "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.mainnet.arg")
        volumeName=$(readEnvFromString "$args" "VOLUME_NAME")
        if [ -f "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json" ]; then
            tokenContractAddress=$(jq ".app_state.gravity.erc20_to_denoms[0].erc20" "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json")
            tokenContractAddress=${tokenContractAddress//\"/}
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.mainnet.env"
        args=$(cat "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.mainnet.arg")
        volumeName=$(readEnvFromString "$args" "VOLUME_NAME")
        if [ -f "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json" ]; then
            tokenContractAddress=$(jq ".app_state.gravity.erc20_to_denoms[0].erc20" "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json")
            tokenContractAddress=${tokenContractAddress//\"/}
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

fi

if [ "$PARAM_NODE_NAME" = "full-node" ]; then

    NODE_BUILDERS_DOCKER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node"

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"

        if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone02.env" ]; then
            ORCHESTRATOR_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone02.arg"
            ORCHESTRATOR_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone02.env"
        fi
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"

        if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone03.env" ]; then
            ORCHESTRATOR_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone03.arg"
            ORCHESTRATOR_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/orchestrator/orchestrator.testnet.public.zone03.env"
        fi
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.mainnet.env"
        args=$(cat "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.mainnet.arg")
        volumeName=$(readEnvFromString "$args" "VOLUME_NAME")
        if [ -f "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json" ]; then
            tokenContractAddress=$(jq ".app_state.gravity.erc20_to_denoms[0].erc20" "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json")
            tokenContractAddress=${tokenContractAddress//\"/}
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.mainnet.env"
        args=$(cat "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.mainnet.arg")
        volumeName=$(readEnvFromString "$args" "VOLUME_NAME")
        if [ -f "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json" ]; then
            tokenContractAddress=$(jq ".app_state.gravity.erc20_to_denoms[0].erc20" "$PARAM_SOURCE_DIR/CudosData/$volumeName/config/genesis.json")
            tokenContractAddress=${tokenContractAddress//\"/}
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/fn-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

fi

if ([ "$NETWORK_MAINNET" = "false" ] && [ "$NETWORK_TESTNET_PRIVATE" = "false" ] && [ "$NETWORK_TESTNET_PUBLIC" = "false" ]); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Could not identify a network"
    exit 1;
fi

if ([ "$PARAM_HAS_ORCHESTRATOR" = "true" ] && ([ "$ORCHESTRATOR_ARG_PATH" = "" ] || [ "$ORCHESTRATOR_ENV_PATH" = "" ])); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unable to find the orchestrator .env files"
    exit 1;
fi

if ([ "$PARAM_HAS_ORCHESTRATOR" = "false" ] && ([ "$ORCHESTRATOR_ARG_PATH" != "" ] || [ "$ORCHESTRATOR_ENV_PATH" != "" ])); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Orchestrator .env files are located but PARAM_HAS_ORCHESTRATOR is set to FALSE"
    exit 1;
fi

if [ "$NETWORK_MAINNET" = "true" ]; then
    NETWORK_NAME="Mainnet"
    BUILDERS_GENESIS_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/config/genesis.mainnet.json"
fi
if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
    NETWORK_NAME="Private Testnet"
    BUILDERS_GENESIS_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/config/genesis.testnet.private.json"
fi
if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
    NETWORK_NAME="Public Testnet"
    BUILDERS_GENESIS_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/config/genesis.testnet.public.json"
fi

NODE_ENV_BASENAME=$(basename "$NODE_ENV_PATH")
if [ "$ORCHESTRATOR_ENV_PATH" != "" ]; then
    ORCHESTRATOR_ENV_BASENAME=$(basename "$ORCHESTRATOR_ENV_PATH")
    HAS_ORCHESTRATOR="true"
fi

args=$(cat "$NODE_ARG_PATH")
START_DOCKERFILE="./start-$PARAM_NODE_NAME.dockerfile"
START_YML="./start-$PARAM_NODE_NAME.yml"
VOLUME_NAME=$(readEnvFromString "$args" "VOLUME_NAME")
VOLUME_PATH="$PARAM_SOURCE_DIR/CudosData/$VOLUME_NAME"
START_CONTAINER_NAME=$(readEnvFromString "$args" "START_CONTAINER_NAME")
TOKEN_CONTRACT_ADDRESS=$(jq ".app_state.gravity.erc20_to_denoms[0].erc20" "$VOLUME_PATH/config/genesis.json")
TOKEN_CONTRACT_ADDRESS=${TOKEN_CONTRACT_ADDRESS//\"/}
unset args

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
