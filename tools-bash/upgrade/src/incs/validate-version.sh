#!/bin/bash -i

echo -ne "Validating version...";

containerVersion=""
sourceVersion=""
UPDATE_FROM_VERSION=""
UPDATE_TO_VERSION="v1.0.1"

if [ "$(docker container inspect -f '{{.State.Status}}' "$START_CONTAINER_NAME" 2>&1)" = "running" ]; then
    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "cudos-noded version" 2>&1);
    if [ "$?" = "0" ]; then
        containerVersion=$(echo "$dockerResult" | cut -d '-' -f1 | sed 's/^v//')
        if [ "$containerVersion" != "" ]; then
            containerVersion="v$containerVersion"
        fi
    fi;
fi

result=$(cd "$PARAM_SOURCE_DIR/CudosNode" && git describe --tags 2>&1)
if [ "$?" = "0" ]; then
    sourceVersion=$(echo "$result" | cut -d '-' -f1)
fi;

if [ "$containerVersion" != "" ] && [ "$sourceVersion" = "" ]; then
    sourceVersion="$containerVersion"
fi

if [ "$containerVersion" = "" ] && [ "$sourceVersion" != "" ]; then
    containerVersion="$sourceVersion"
fi

if [ "$containerVersion" = "" ] && [ "$sourceVersion" = "" ]; then
    if [ "$NETWORK_MAINNET" = "true" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Mainnet entries should have been read successfully";
        exit 1;
    fi
    if [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
        containerVersion="v0.5.0"
        sourceVersion="v0.5.0"
    fi
    if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
        containerVersion="v0.3" # no special tag
        sourceVersion="v0.3" # no special tag
    fi
    if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
        containerVersion="v0.4.0"
        sourceVersion="v0.4.0"
    fi
fi

# if [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
#     containerVersion="v0.5.0"
#     sourceVersion="v0.5.0"
# fi

# if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
#     containerVersion="v0.4.0"
#     sourceVersion="v0.4.0"
# fi

# do not remove forever
if [ "$NETWORK_TESTNET_PRIVATE" = "true" ] && [ "$sourceVersion" = "v0.5.0" ] && [ "$containerVersion" = "v0.5.0" ]; then
    sourceVersion="v0.6.0"
    containerVersion="v0.6.0"
fi

if [ "$containerVersion" != "$sourceVersion" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The source code's version ($sourceVersion) is different from current running docker's version ($containerVersion)";
    exit 1;
fi

UPDATE_FROM_VERSION="$sourceVersion"
DO_HARD_FORK="false"

if [ "$NETWORK_TESTNET_PRIVATE" = "true" ] && [ "$UPDATE_FROM_VERSION" = "v0.3" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ] && [ "$DO_HARD_FORK" = "true" ]; then
    TARGET_CHAIN_ID="cudos-testnet-private-2"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}"
elif [ "$NETWORK_DRESSREHEARSAL" = "true" ] && [ "$UPDATE_FROM_VERSION" = "v0.5.0" ] && [ "$UPDATE_TO_VERSION" = "v0.6.0" ] && [ "$DO_HARD_FORK" = "true" ]; then
    TARGET_CHAIN_ID="cudos-dressrehearsal-2"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}"
elif [ "$NETWORK_TESTNET_PUBLIC" = "true" ] && [ "$UPDATE_FROM_VERSION" = "v0.4.0" ] && [ "$UPDATE_TO_VERSION" = "v0.9.0" ] && [ "$DO_HARD_FORK" = "true" ]; then
    TARGET_CHAIN_ID="cudos-testnet-public-3"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}"
elif [ "$NETWORK_TESTNET_PRIVATE" = "true" ] && [ "$UPDATE_FROM_VERSION" = "v0.6.0" ] && [ "$UPDATE_TO_VERSION" = "v0.8.0" ] && [ "$DO_HARD_FORK" = "true" ]; then
    TARGET_CHAIN_ID="cudos-testnet-private-3"
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}"
elif [ "$NETWORK_MAINNET" = "true" ] && [ "$UPDATE_FROM_VERSION" = "v1.0.0" ] && [ "$UPDATE_TO_VERSION" = "v1.0.1" ] && [ "$DO_HARD_FORK" = "false" ]; then
    echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}"
else
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Unsupported upgrade of $(getNetworkName) from $UPDATE_FROM_VERSION to $UPDATE_TO_VERSION";
    exit 1;
fi
