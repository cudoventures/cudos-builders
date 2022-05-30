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

if [ ! -x "$(command -v git)" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The host does not have git installed";
    exit 1;
fi

gitStatus=$(git branch --contains 7684715d335a699459770e7db7b12ab7f718daf5 2>&1)
if [[ "$gitStatus" == *"error:"* ]]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} You must pull the latest changes";
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

if [ "$PARAM_GRAVITY_DEFAULT_NETWORK" = "rinkeby" ]; then
    CUDOS_ACCESS_CONTROL_ADDRESS="0xf50E29dB8bf318fB61Ac6688578dc0CD35EA8142"
elif [ "$PARAM_GRAVITY_DEFAULT_NETWORK" = "mainnet" ]; then
    CUDOS_ACCESS_CONTROL_ADDRESS=""
else
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_GRAVITY_DEFAULT_NETWORK must not be empty. It MUST be ${STYLE_BOLD}rinkeby${STYLE_DEFAULT} | ${STYLE_BOLD}mainnet${STYLE_DEFAULT}";
    exit 1
fi

if [ "$PARAM_ETHERSCAN_API_KEY" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_ETHERSCAN_API_KEY must not be empty";
    exit 1
fi

walletBalanceJson=$(curl -X POST http://34.136.167.17:8545 -H "Content-Type: application/json" --data "{\"jsonrpc\": \"2.0\", \"method\": \"eth_getBalance\", \"params\": [\"$PARAM_CONTRACT_DEPLOYER_ETH_ADDRESS\", \"latest\"], \"id\": 1}" 2> /dev/null)
walletBalanceHex=$(echo "$walletBalanceJson" | jq .result)
walletBalanceHex=${walletBalanceHex//\"/}
if [ "$walletBalanceHex" = "" ] || (($walletBalanceHex < 50000000000000000)); then
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

if [ ! -f "$STAKING_JSON" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $STAKING_JSON file is missing";
    exit 1
fi

if [ ! -r "$STAKING_JSON" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Permission denied $STAKING_JSON";
    exit 1
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
