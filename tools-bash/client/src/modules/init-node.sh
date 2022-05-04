#!/bin/bash -i

echo -ne "Initializing the node...";
cd "$NODE_BUILDER_PATH"
dockerResult=$(docker-compose --env-file "$NODE_ARG_PATH" -f "$INIT_YML" -p "$INIT_CONTAINER_NAME" up --build 2>&1)
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error building the initializer $?: ${dockerResult}";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

if [ ! -f "$VOLUME_PATH/tendermint.nodeid" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error with the initialization";
    exit 1;
fi

TENDERMINT_NODE_ID=$(cat "$VOLUME_PATH/tendermint.nodeid")
