#!/bin/bash -i

if [ "$networkIdentified" = "true" ]; then
    echo -ne "${STYLE_RED}Error:${STYLE_DEFAULT} Multiple networks identified"
    if [ "$NETWORK_MAINNET" = "true" ]; then
        echo -ne "${STYLE_BOLD} MAINNET ${STYLE_DEFAULT}"
    fi
    if [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
        echo -ne "${STYLE_BOLD} DRESSREHEARSAL ${STYLE_DEFAULT}"
    fi
    if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
        echo -ne "${STYLE_BOLD} TESTNET PRIVATE ${STYLE_DEFAULT}"
    fi
    if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
        echo -ne "${STYLE_BOLD} TESTNET PUBLIC ${STYLE_DEFAULT}"
    fi
    echo ""
    exit 1;
fi
