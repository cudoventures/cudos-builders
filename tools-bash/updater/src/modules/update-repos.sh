#!/bin/bash -i

echo "" # new line

echo -e "${STYLE_BOLD}Updating repos:${STYLE_DEFAULT}";

echo -ne "Deleting old repos...";
rm -rf "$PARAM_SOURCE_DIR/CudosNode"
rm -rf "$PARAM_SOURCE_DIR/CudosBuilders"
rm -rf "$PARAM_SOURCE_DIR/CudosGravityBridge"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";


echo -ne "Cloning repos...";
branch="v0.6.0"
cd "$PARAM_SOURCE_DIR"
git clone -q --branch "$branch" https://github.com/CudoVentures/cudos-node.git CudosNode &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the repo cudos-node. Please try in a while";
    exit 1;
fi
git clone -q --branch "$branch" https://github.com/CudoVentures/cudos-builders.git CudosBuilders &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the repo cudos-node. Please try in a while";
    exit 1;
fi
git clone -q --branch "$branch" https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge &> /dev/null
if [ "$?" != 0 ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error cloning the repo cudos-node. Please try in a while";
    exit 1;
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";

