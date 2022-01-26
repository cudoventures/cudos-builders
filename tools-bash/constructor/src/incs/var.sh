#!/bin/bash -i

echo -ne "Processing variables...";

scriptDir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
WORKING_SRC_DIR=$(cd $scriptDir/..  && pwd)
WORKING_DIR=$(cd $scriptDir/../..  && pwd)

COLOR_RED='\033[1;31m'
COLOR_GREEN='\033[1;32m'
COLOR_DEFAULT='\033[m'

if [ ! -f "$WORKING_DIR/config/script.env" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The $WORKING_DIR/config/script.env file is missing";
    exit 1
fi

source "$WORKING_DIR/config/script.env"

if [ ! -f "$WORKING_DIR/config/node.env" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The $WORKING_DIR/config/node.env file is missing";
    exit 1
fi

echo -e "${COLOR_GREEN}OK${COLOR_DEFAULT}";