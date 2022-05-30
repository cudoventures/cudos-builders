#!/bin/bash -i

echo -ne "Processing variables...";

scriptDir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
WORKING_SRC_DIR=$(cd $scriptDir/..  && pwd)
WORKING_DIR=$(cd $scriptDir/../..  && pwd)
WORKING_EXPORT_DIR="$WORKING_DIR/exports"
VALIDATOR_BALANCE="123456789987654321123456789"

STYLE_BOLD='\033[1m'
STYLE_RED='\033[1;31m'
STYLE_GREEN='\033[1;32m'
STYLE_DEFAULT='\033[0m'

REPO_BRANCH="v0.9.0"

if [ "$1" = "init" ]; then
    INITIALIZING="true";
    STARTING="false";
fi

if [ "$1" = "start" ]; then
    INITIALIZING="false";
    STARTING="true";
fi

if [ ! -f "$WORKING_DIR/config/init.env" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/config/init.env file is missing";
    exit 1
fi

source "$WORKING_DIR/config/init.env"

if [ $STARTING = "true" ]; then

    if [ ! -f "$WORKING_DIR/config/start.env" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/config/start.env file is missing";
        exit 1;
    fi;

    source "$WORKING_DIR/config/start.env";

fi

if [ ! -f "$WORKING_DIR/config/node.env" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/config/node.env file is missing";
    exit 1
fi

source "$WORKING_DIR/config/node.env"

if [ "$IS_VALIDATOR"  = "true" ] && [ "$PARAM_ORCHESTRATOR_ENV_PATH" != "" ]; then
    SHOULD_START_ORCHESTRATOR="true"
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
