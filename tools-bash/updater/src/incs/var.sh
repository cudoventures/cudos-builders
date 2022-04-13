#!/bin/bash -i

echo -ne "Processing variables...";

scriptDir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
WORKING_SRC_DIR=$(cd $scriptDir/..  && pwd)
WORKING_SRC_VERSIONS_DIR=$(cd $scriptDir/../versions  && pwd)
WORKING_DIR=$(cd $scriptDir/../..  && pwd)
WORKING_EMERGENCY_BACKUP_DIR="$WORKING_DIR/emergency-backup"
WORKING_MIGRATE_DIR="$WORKING_DIR/migrate"

rm -rf "$WORKING_MIGRATE_DIR"
mkdir "$WORKING_MIGRATE_DIR"

STYLE_BOLD='\033[1m'
STYLE_RED='\033[1;31m'
STYLE_GREEN='\033[1;32m'
STYLE_DEFAULT='\033[0m'

if [ ! -f "$WORKING_DIR/config/.env" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/config/.env file is missing";
    exit 1
fi

source "$WORKING_DIR/config/.env"

if [ "$1" = "gravity" ]; then

    if [ ! -f "$WORKING_DIR/config/gravity.env" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The $WORKING_DIR/config/gravity.env file is missing";
        exit 1
    fi

    source "$WORKING_DIR/config/gravity.env"

fi

LOCK_BACKUP_RESTORE="$PARAM_SOURCE_DIR/.backup-restore.lock"
LOCK_BACKUP_CREATE="$PARAM_SOURCE_DIR/.backup-create.lock"
LOCK_VALIDATE_PATH="$PARAM_SOURCE_DIR/.validate.lock"
LOCK_UPGRADE_PATH="$PARAM_SOURCE_DIR/.upgrade.lock"

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
