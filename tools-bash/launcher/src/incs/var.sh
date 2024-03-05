#!/bin/bash -i

echo -ne "Processing variables...";

scriptDir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
WORKING_SRC_DIR=$(cd $scriptDir/..  && pwd)
WORKING_DIR=$(cd $scriptDir/../..  && pwd)
WORKING_EXPORT_DIR="$WORKING_DIR/exports"
WORKING_DATA_GENESIS_DIR="$WORKING_DIR/genesises"
STAKING_JSON="$WORKING_DIR/config/staking.json"
RESULT_GENESIS_PATH="$WORKING_EXPORT_DIR/genesis.json"

STYLE_BOLD='\033[1m'
STYLE_RED='\033[1;31m'
STYLE_GREEN='\033[1;32m'
STYLE_ORANGE='\033[1;33m'
STYLE_DEFAULT='\033[0m'

REPO_BRANCH="v1.1.0"

if [ ! -f "$WORKING_DIR/config/.env" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/config/.env file is missing";
    exit 1
fi

source "$WORKING_DIR/config/.env"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
