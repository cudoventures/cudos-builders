#!/bin/bash -i

if ([ $# != "1" ]) || ([ "$1" != "create" ] && [ "$1" != 'restore' ] && [ "$1" != 'clean' ] && [ "$1" != "validate" ]); then
    echo -e "\033[1;31mError:\033[m Please follow the usage template below";
    echo "Usage: sudo $0 [action]";
    echo '[action] = create | restore | clean | validate';
    exit 1
fi

action="$1"

if [ "$EUID" -ne 0 ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed as root";
    exit 1
fi

upgradePath=$(basename $(pwd))
if [ "$upgradePath" != "upgrade" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from upgrade folder";
    exit 1
fi

source "./src/incs/var.sh" "backup"

source "$WORKING_SRC_DIR/incs/utils-common.sh"

source "$WORKING_SRC_DIR/incs/validate-backup.sh"

if [ "$action" = "create" ]; then
    source "$WORKING_SRC_DIR/modules/clean-docker.sh"

    source "$WORKING_SRC_DIR/modules/backup-create.sh"
fi

if [ "$action" = "restore" ]; then
    source "$WORKING_SRC_DIR/modules/clean-docker.sh"

    source "$WORKING_SRC_DIR/modules/backup-restore.sh"
fi

if [ "$action" = "clean" ]; then
    source "$WORKING_SRC_DIR/modules/backup-clean.sh"
fi
