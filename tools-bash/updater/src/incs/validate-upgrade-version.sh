#!/bin/bash -i

echo -ne "Validating version...";

containerVersion=""
sourceVersion=""
UPDATE_FROM_VERSION=""
TO_VERSION="v0.5.0"

if [ "$(docker container inspect -f '{{.State.Status}}' "$START_CONTAINER_NAME" 2> /dev/null)" = "running" ]; then
    dockerResult=$(docker container exec "$START_CONTAINER_NAME" /bin/bash -c "cudos-noded version");
    if [ "$?" = "0" ]; then
        containerVersion=$(echo "$dockerResult" | cut -d '-' -f1)
    fi;
fi

result=$(cd "$PARAM_SOURCE_DIR/CudosNode" && git describe --tags)
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
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There is currently no mainnet";
        exit 1;
    fi
    if [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Dress rehearsal is running the latest version";
        exit 1;
    fi
    if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
        containerVersion="v0.3.0"
        sourceVersion="v0.3.0"
    fi
    if [ "$NETWORK_TESTNET_PUBLIC" = "true" ]; then
        containerVersion="v0.4.0"
        sourceVersion="v0.4.0"
    fi
fi

if [ "$containerVersion" != "$sourceVersion" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The source code's version ($sourceVersion) is different from current running docker's version ($containerVersion)";
    exit 1;
fi

UPDATE_FROM_VERSION="$sourceVersion"
DO_HARD_FORK="true"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
