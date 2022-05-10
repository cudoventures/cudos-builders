#!/bin/bash -i

source "$WORKING_SRC_DIR/incs/validate-params.sh"

echo -ne "Validating gravity params...";

if [ "$PARAM_ETH_RPC" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_ETH_RPC must not be empty";
    exit 1;
fi

if [ "$PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY must not be empty";
    exit 1;
fi

if [ "$PARAM_CHAIN_ENDPOINT_26657" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_CHAIN_ENDPOINT_26657 must not be empty";
    exit 1;
fi

if [ "$PARAM_ETHERSCAN_API_KEY" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_ETHERSCAN_API_KEY must not be empty";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

source "$WORKING_SRC_DIR/incs/validate-network.sh"

if [ "$HAS_ORCHESTRATOR" != "true" ] || [ "$PARAM_NODE_NAME" != "root-node" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Only root-node with orchestrator could change the gravity smart contract";
    exit 1;
fi

if [ "$NETWORK_MAINNET" = "true" ]; then
    CUDOS_ACCESS_CONTROL_ADDRESS=""
    GRAVITY_DEFAULT_NETWORK="mainnet"
else
    CUDOS_ACCESS_CONTROL_ADDRESS="0xf50E29dB8bf318fB61Ac6688578dc0CD35EA8142"
    GRAVITY_DEFAULT_NETWORK="rinkeby"
fi

