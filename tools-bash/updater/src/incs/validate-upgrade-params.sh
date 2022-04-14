#!/bin/bash -i

echo -ne "Validating params...";

# validating binaries
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

# validating params 
if [ "$PARAM_SOURCE_DIR" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_SOURCE_DIR must not be empty";
    exit 1;
fi

if ([ "$PARAM_NODE_NAME" != "root-node" ] && [ "$PARAM_NODE_NAME" != "seed-node" ] && [ "$PARAM_NODE_NAME" != "sentry-node" ] && [ "$PARAM_NODE_NAME" != "full-node" ]); then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_NODE_NAME must be one of the following ${STYLE_BOLD}root-node${STYLE_DEFAULT} | ${STYLE_BOLD}seed-node${STYLE_DEFAULT} | ${STYLE_BOLD}sentry-node${STYLE_DEFAULT} | ${STYLE_BOLD}full-node${STYLE_DEFAULT}";
    exit 1;
fi

if [ "$PARAM_HAS_ORCHESTRATOR" != "true" ] && [ "$PARAM_HAS_ORCHESTRATOR" != "false" ]; then
    PARAM_HAS_ORCHESTRATOR="false"
fi

if [ "$PARAM_NODE_NAME" = "root-node" ] && [ "$PARAM_HAS_ORCHESTRATOR" != "true" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The param PARAM_HAS_ORCHESTRATOR is supposed to be TRUE for a root-node";
    exit 1;
fi

# validating folders
if [ ! -d "$PARAM_SOURCE_DIR/CudosData/$VOLUME_NAME" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Data folder is missing - $WORKING_DIR/CudosData/$VOLUME_NAME does not exists";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosNode" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosNode older is missing - $PARAM_SOURCE_DIR/CudosNode does not exists";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosGravityBridge" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosGravityBridge folder is missing - $PARAM_SOURCE_DIR/CudosGravityBridge does not exists";
    exit 1;
fi

if [ ! -d "$PARAM_SOURCE_DIR/CudosBuilders" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} CudosBuilders folder is missing - $PARAM_SOURCE_DIR/CudosBuilders does not exists";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
