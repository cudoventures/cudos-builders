#!/bin/bash -i

if ([ $# != "2" ]) || ([ "$1" != "sentry-node" ] && [ "$1" != "seed-node" ] && [ "$1" != "root-node" ] && [ "$1" != "full-node" ]); then
    echo -e "\033[1;31mError:\033[m Please follow the usage template below";
    echo "Usage: sudo $0 [node] [path]";
    echo '[action] = sentry-node | seed-node | root-node | full-node';
    echo '[path] = absolute path to the directory that contains CudosData and CudosBuilders';
    exit 1
fi

function readEnvFromString {
    envAsString="$1"
    envName="$2"
    tmpFilePath="/tmp/cudos-launcher-string.env"

    echo "$1" > "$tmpFilePath"
    eval $(source "$tmpFilePath"; echo tmpEnv="\"${!envName}\"")
    echo "$tmpEnv"
    unset tmpEnv
    rm -f "$tmpFilePath"
}

TARGET_USER="kamen"

PARAM_NODE_NAME="$1"
PARAM_SOURCE_DIR="$2"

networkIdentified="false"
NETWORK_MAINNET="false"
NETWORK_TESTNET_PRIVATE="false"
NETWORK_TESTNET_PUBLIC="false"
NETWORK_NAME=""

NODE_ENV_PATH=""
NODE_ARG_PATH=""
ORCHESTRATOR_ENV_PATH=""
ORCHESTRATOR_ARG_PATH=""

HAS_ORCHESTRATOR="false"

if [ ! -d "$PARAM_SOURCE_DIR/CudosData" ]; then
    echo "Folder \"$PARAM_SOURCE_DIR/CudosData\" does not exists" >&2
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosBuilders" ]; then
    echo "Folder \"$PARAM_SOURCE_DIR/CudosBuilders\" does not exists" >&2
    exit 1;
fi

if [ "$PARAM_NODE_NAME" = "root-node" ]; then

    NODE_BUILDERS_DOCKER_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node"
    
    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.env"
        args=$(cat "$NODE_ENV_PATH")
        tokenContractAddress=$(readEnvFromString "$args" "CUDOS_TOKEN_CONTRACT_ADDRESS")
        if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
            NETWORK_MAINNET="true"

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
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
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
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
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
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
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
    
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

fi

if ([ "$NETWORK_MAINNET" = "false" ] && [ "$NETWORK_TESTNET_PRIVATE" = "false" ] && [ "$NETWORK_TESTNET_PUBLIC" = "false" ]); then
    echo "Error: Could not identify a network" >&2
    exit 1;
fi

if ([ "$PARAM_HAS_ORCHESTRATOR" = "true" ] && ([ "$ORCHESTRATOR_ARG_PATH" = "" ] || [ "$ORCHESTRATOR_ENV_PATH" = "" ])); then
    echo "Error: Unable to find the orchestrator .env files" >&2
    exit 1;
fi

if ([ "$PARAM_HAS_ORCHESTRATOR" = "false" ] && ([ "$ORCHESTRATOR_ARG_PATH" != "" ] || [ "$ORCHESTRATOR_ENV_PATH" != "" ])); then
    echo "Error: Orchestrator .env files are located but PARAM_HAS_ORCHESTRATOR is set to FALSE" >&2
    exit 1;
fi

if [ "$NETWORK_MAINNET" = "true" ]; then
    NETWORK_NAME="Mainnet"
fi
if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
    NETWORK_NAME="Private Testnet"
fi
if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
    NETWORK_NAME="Public Testnet"
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

if [ ! -d "$VOLUME_PATH" ]; then
    echo "Folder \"$VOLUME_PATH\" does not exists" >&2
    exit 1;
fi

docker stop "$START_CONTAINER_NAME";

mkdir -p /var/lib/cudos
rm -rf /var/lib/cudos/cudos-data
cp -r "$VOLUME_PATH" /var/lib/cudos/cudos-data/
chown -R "$TARGET_USER":"$TARGET_USER" /var/lib/cudos/cudos-data/
# TO DO: Should we completely disable docker? It could be used for something else.

su "$TARGET_USER" -s /bin/bash -c "~/go/bin/cudos-noded start --home /var/lib/cudos/cudos-data"
