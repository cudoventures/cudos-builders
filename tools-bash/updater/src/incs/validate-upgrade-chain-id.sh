#!/bin/bash -i

CURRENT_CHAIN_ID=""

if [ "$NETWORK_MAINNET" = "true" ]; then
    CURRENT_CHAIN_ID="cudos-1"
fi
if [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
    CURRENT_CHAIN_ID="cudos-1"
fi
if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
    if [ "$UPDATE_FROM_VERSION" = "v0.3.0" ]; then
        CURRENT_CHAIN_ID="cudos-testnet-private"
    fi
fi
if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
    if [ "$UPDATE_FROM_VERSION" = "v0.4.0" ]; then
        CURRENT_CHAIN_ID="cudos-testnet-public-2"
    fi
fi

if [ "$CURRENT_CHAIN_ID" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unsupported upgrade.";
    exit 1;
fi

if ! grep -q "\"chain_id\": \"$CURRENT_CHAIN_ID\"" "$VOLUME_PATH/config/genesis.json"; then
    echo -e "${STYLE_ERROR}Error:${STYLE_DEFAULT} Chain id mismatch. Expected $CURRENT_CHAIN_ID.";
    exit 1;
fi
