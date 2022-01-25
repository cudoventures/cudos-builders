#!/bin/bash -i

scriptDir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
LAUNCHER_SRC_DIR=$(cd $scriptDir/..  && pwd)
LAUNCHER_DIR=$(cd $scriptDir/../..  && pwd)

COLOR_RED='\033[1;31m'
COLOR_GREEN='\033[1;32m'
COLOR_DEFAULT='\033[m'

if [ ! -f "$LAUNCHER_DIR/config/.env" ]; then
    echo -e "${COLOR_RED}Error:${COLOR_DEFAULT} The $LAUNCHER_DIR/config/.env file is missing";
    exit 1
fi

source "$LAUNCHER_DIR/config/.env"