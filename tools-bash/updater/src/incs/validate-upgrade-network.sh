#!/bin/bash -i

echo -ne "Validating network...";

# validating .envs
networkIdentified="false"
NETWORK_MAINNET="false"
NETWORK_DRESSREHEARSAL="false"
NETWORK_TESTNET_PRIVATE="false"
NETWORK_TESTNET_PUBLIC="false"

NODE_DOCKER_BUILDER_PATH=""
NODE_ENV_PATH=""
NODE_ARG_PATH=""

if [ "$PARAM_NODE_NAME" = "root-node" ]; then
    
    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.mainnet.env"
        args=$(cat "$NODE_ENV_PATH")
        tokenContractAddress=$(readEnvFromString "$args" "CUDOS_TOKEN_CONTRACT_ADDRESS")
        if [ "$tokenContractAddress" = "0x28ea52f3ee46CaC5a72f72e8B3A387C0291d586d" ] || [ "$tokenContractAddress" = "0x12d474723cb8c02bcbf46cd335a3bb4c75e9de44" ]; then
            NETWORK_DRESSREHEARSAL="true"
            source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
            networkIdentified="true"
        fi
        if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
            NETWORK_MAINNET="true"
            source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
            networkIdentified="true"
        fi
        unset args
        unset tokenContractAddress
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.dressrehearsal.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.dressrehearsal.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.dressrehearsal.env"
        NETWORK_DRESSREHEARSAL="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.private.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.private.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.private.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/root-node/root-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

fi

if [ "$PARAM_NODE_NAME" = "seed-node" ]; then

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.private.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.private.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.private.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.dressrehearsal.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.dressrehearsal.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/seed-node/seed-node.client.dressrehearsal.env"
        NETWORK_DRESSREHEARSAL="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
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
            if [ "$tokenContractAddress" = "0x28ea52f3ee46CaC5a72f72e8B3A387C0291d586d" ] || [ "$tokenContractAddress" = "0x12d474723cb8c02bcbf46cd335a3bb4c75e9de44" ]; then
                NETWORK_DRESSREHEARSAL="true"
                source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
                networkIdentified="true"
            fi
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

fi

if [ "$PARAM_NODE_NAME" = "sentry-node" ]; then

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.private.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.private.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.private.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.dressrehearsal.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.dressrehearsal.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/sentry-node/sentry-node.client.dressrehearsal.env"
        NETWORK_DRESSREHEARSAL="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
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
            if [ "$tokenContractAddress" = "0x28ea52f3ee46CaC5a72f72e8B3A387C0291d586d" ] || [ "$tokenContractAddress" = "0x12d474723cb8c02bcbf46cd335a3bb4c75e9de44" ]; then
                NETWORK_DRESSREHEARSAL="true"
                source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
                networkIdentified="true"
            fi
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

fi

if [ "$PARAM_NODE_NAME" = "full-node" ]; then

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.private01.env"
        NETWORK_TESTNET_PRIVATE="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone02.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone03.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone03.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.testnet.public.zone03.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.testnet.public01.env"
        NETWORK_TESTNET_PUBLIC="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
        networkIdentified="true"
    fi

    if [ -f "$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.dressrehearsal.env" ]; then
        NODE_ARG_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.dressrehearsal.arg"
        NODE_ENV_PATH="$PARAM_SOURCE_DIR/CudosBuilders/docker/full-node/full-node.client.dressrehearsal.env"
        NETWORK_DRESSREHEARSAL="true"
        source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
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
            if [ "$tokenContractAddress" = "0x28ea52f3ee46CaC5a72f72e8B3A387C0291d586d" ] || [ "$tokenContractAddress" = "0x12d474723cb8c02bcbf46cd335a3bb4c75e9de44" ]; then
                NETWORK_DRESSREHEARSAL="true"
                source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
                networkIdentified="true"
            fi
            if [ "$tokenContractAddress" = "0x817bbDbC3e8A1204f3691d14bB44992841e3dB35" ]; then
                NETWORK_MAINNET="true"
                source "$WORKING_SRC_DIR/incs/validate-upgrade-verify-network.sh"
                networkIdentified="true"
            fi
            unset args
            unset volumeName
            unset tokenContractAddress
        fi
    fi

fi

if ([ "$NETWORK_MAINNET" = "false" ] && [ "$NETWORK_DRESSREHEARSAL" = "false" ] && [ "$NETWORK_TESTNET_PRIVATE" = "false" ] && [ "$NETWORK_TESTNET_PUBLIC" = "false" ]); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Could not identify a network"
    exit 1;
fi

args=$(cat "$NODE_ARG_PATH")
VOLUME_NAME=$(readEnvFromString "$args" "VOLUME_NAME")
START_CONTAINER_NAME=$(readEnvFromString "$args" "START_CONTAINER_NAME")
unset args

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
