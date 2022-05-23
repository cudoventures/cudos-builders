#!/bin/bash -i

if ([ $# != "1" ]) || ([ "$1" != "upgrade" ] && [ "$1" != "upgrade-with-predefined-genesis" ] && [ "$1" != "validate" ]); then
    echo -e "\033[1;31mError:\033[m Please follow the usage template below";
    echo "Usage: sudo $0 [action]";
    echo '[action] = upgrade | upgrade-with-predefined-genesis | validate';
    exit 1
fi

action="$1"
USE_PREDEFINED_GENESIS="false"
if [ "$action" = "upgrade-with-predefined-genesis" ]; then
    action="upgrade"
    USE_PREDEFINED_GENESIS="true"
fi

if [ "$EUID" -ne 0 ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed as root";
    exit 1
fi

upgradePath=$(basename $(pwd))
if [ "$upgradePath" != "upgrade" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from upgrade folder";
    exit 1
fi

source "./src/incs/var.sh" "node"

source "$WORKING_SRC_DIR/incs/utils-common.sh"

source "$WORKING_SRC_DIR/incs/utils-genesis.sh"

source "$WORKING_SRC_DIR/incs/validate-node.sh"

if [ "$action" = "upgrade" ]; then
    echo "" # new line

    echo "" > "$LOCK_UPGRADE_PATH"

    source "$WORKING_SRC_DIR/modules/clean-docker.sh"

    source "$WORKING_SRC_DIR/modules/docker-ignore.sh"

    source "$WORKING_SRC_DIR/modules/emergency-backup.sh"

    if [ "$DO_HARD_FORK" = "true" ]; then
        if [ "$USE_PREDEFINED_GENESIS" = "false" ]; then
            source "$WORKING_SRC_DIR/modules/binary-builder.sh"

            source "$WORKING_SRC_DIR/modules/genesis-export.sh"
        fi
    fi

    source "$WORKING_SRC_DIR/modules/repos.sh"

    source "$WORKING_SRC_DIR/modules/clean-docker.sh"

    source "$WORKING_SRC_DIR/modules/envs-migrate.sh"

    source "$WORKING_SRC_DIR/modules/binary-builder.sh"

    if [ "$DO_HARD_FORK" = "true" ]; then
        source "$WORKING_SRC_DIR/modules/genesis-migrate.sh"
    fi

    source "$WORKING_SRC_DIR/modules/configs-migrate.sh"

    source "$WORKING_SRC_DIR/modules/start-node.sh"

    source "$WORKING_SRC_DIR/modules/start-orchestrator.sh"
fi

if [ "$action" = "validate" ]; then
    echo "" # new line

    echo -ne "Validating...";
fi
if [ "$action" = "upgrade" ]; then
    rm -f "$LOCK_UPGRADE_PATH"
    rm -f "$LOCK_VALIDATE_PATH"

    echo "" # new line

    echo -e "Emergency data stores to ${STYLE_BOLD}$WORKING_EMERGENCY_BACKUP_DIR${STYLE_DEFAULT}. It can safely be deleted if the node is producing blocks after the upgrade."

    echo "" # new line

    echo -ne "Upgrading...";
fi
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
