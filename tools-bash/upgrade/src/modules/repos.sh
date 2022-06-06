#!/bin/bash -i

# Notes: Any exit 1 in this must be precended by a call to restore-old-repos-on-failure.sh.
# Otherwise the newly cloned repos will lack of an .env file therefore the subsequent call to any scripts from ./upgrader folder will fail because of inability to find the correct .env file.

echo "" # new line

echo -e "${STYLE_BOLD}Updating repos:${STYLE_DEFAULT}";

echo -ne "Deleting old repos...";
rm -rf "$PARAM_SOURCE_DIR/CudosNode"
rm -rf "$PARAM_SOURCE_DIR/CudosBuilders"
rm -rf "$PARAM_SOURCE_DIR/CudosGravityBridge"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";


echo -ne "Cloning repos...";
branch="cudos-dev"
cd "$PARAM_SOURCE_DIR"
git clone -q --branch "$branch" https://github.com/CudoVentures/cudos-node.git CudosNode &> /dev/null
if [ "$?" != 0 ]; then
    source "$WORKING_SRC_DIR/modules/restore-old-repos-on-failure.sh"
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the cudos-node repo. Please try in a while";
    exit 1;
fi
git clone -q --branch "$branch" https://github.com/CudoVentures/cudos-builders.git CudosBuilders &> /dev/null
if [ "$?" != 0 ]; then
    source "$WORKING_SRC_DIR/modules/restore-old-repos-on-failure.sh"
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the cudos-builders repo. Please try in a while";
    exit 1;
fi
git clone -q --branch "$branch" https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge &> /dev/null
if [ "$?" != 0 ]; then
    source "$WORKING_SRC_DIR/modules/restore-old-repos-on-failure.sh"
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the cudos-gravity-bridge repo. Please try in a while";
    exit 1;
fi

if [ "$USE_PREDEFINED_GENESIS" = "true" ]; then
    if [ ! -f "$BUILDERS_GENESIS_PATH" ]; then
        source "$WORKING_SRC_DIR/modules/restore-old-repos-on-failure.sh"
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $BUILDERS_GENESIS_PATH file is missing";
        exit 1;
    fi

    if [ ! -r "$BUILDERS_GENESIS_PATH" ]; then
        source "$WORKING_SRC_DIR/modules/restore-old-repos-on-failure.sh"
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Permission denied $BUILDERS_GENESIS_PATH";
        exit 1;
    fi

    genesisChainId=$(jq ".chain_id" "$BUILDERS_GENESIS_PATH" 2> /dev/null)
    genesisChainId=${genesisChainId//\"/}
    if [ "$?" != 0 ] || [ "$genesisChainId" != "$TARGET_CHAIN_ID" ]; then
        source "$WORKING_SRC_DIR/modules/restore-old-repos-on-failure.sh"
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $BUILDERS_GENESIS_PATH is invalid. The genesis chain id is ($genesisChainId) expected is ($TARGET_CHAIN_ID)";
        exit 1;
    fi
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

