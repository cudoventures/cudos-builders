#!/bin/bash -i

echo -ne "Validating script requirements...";

if [ ! -x "$(command -v jq)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The host does not have jq installed";
    exit 1;
fi

if [ ! -x "$(command -v python3)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The host does not have python3 installed";
    exit 1;
fi

if [ "$PARAM_ETH_RPC" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_ETH_RPC must not be empty";
    exit 1
fi

if [ "$PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_CONTRACT_DEPLOYER_ETH_PRIV_KEY must not be empty";
    exit 1
fi

if [ "$PARAM_CONTRACT_DEPLOYER_ETH_ADDRESS" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_CONTRACT_DEPLOYER_ETH_ADDRESS must not be empty";
    exit 1
fi

walletBalanceJson=$(curl -X POST http://34.136.167.17:8545 -H "Content-Type: application/json" --data "{\"jsonrpc\": \"2.0\", \"method\": \"eth_getBalance\", \"params\": [\"$PARAM_CONTRACT_DEPLOYER_ETH_ADDRESS\", \"latest\"], \"id\": 1}" 2> /dev/null)
walletBalanceHex=$(echo "$walletBalanceJson" | jq .result)
walletBalanceHex=${walletBalanceHex//\"/}
if (($walletBalanceHex < 50000000000000000)); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The wallet $PARAM_CONTRACT_DEPLOYER_ETH_ADDRESS must have at least 0.05ETH. Current balance $(($walletBalanceHex)) wei";
    exit 1
fi

if [ "$PARAM_SOURCE_DIR" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_SOURCE_DIR must not be empty";
    exit 1
fi


if [ ! -f "$WORKING_DIR/config/topology.json" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/config/topology.json file is missing";
    exit 1
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";