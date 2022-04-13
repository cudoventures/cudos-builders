#!/bin/bash -i

echo -ne "Validating gravity...";

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

source "$WORKING_SRC_DIR/incs/validate-upgrade-params.sh"

source "$WORKING_SRC_DIR/incs/validate-upgrade-network.sh"

if [ "$HAS_ORCHESTRATOR" != "true" ] || [ "$PARAM_NODE_NAME" != "root-node" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Only root-node with orchestrator could change the gravity smart contract";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
