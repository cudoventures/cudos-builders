#!/bin/bash -i

CURRENT_CHAIN_ID=""

if [ "$NETWORK_MAINNET" = "true" ]; then
    CURRENT_CHAIN_ID="cudos-1"
fi
if [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
    CURRENT_CHAIN_ID="cudos-1"
fi
if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
    if [ "$UPDATE_FROM_VERSION" = "v0.3" ]; then
        CURRENT_CHAIN_ID="cudos-testnet-private"
    fi
fi
if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
    if [ "$UPDATE_FROM_VERSION" = "v0.4.0" ]; then
        CURRENT_CHAIN_ID="cudos-testnet-public-2"
    fi
fi

if [ "$CURRENT_CHAIN_ID" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unsupported upgrade";
    exit 1;
fi

genesisChainId=$(jq ".chain_id" "$VOLUME_PATH/config/genesis.json")
genesisChainId=${genesisChainId//\"/}
if [ "$genesisChainId" != "$CURRENT_CHAIN_ID" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Chain id mismatch. Expected \"$CURRENT_CHAIN_ID\". Got \"$genesisChainId\".";
    exit 1;
fi
