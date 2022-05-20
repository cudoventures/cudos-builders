#!/bin/bash -i

if ([ $# != "1" ]) || ([ "$1" != "change-contract" ]); then
    echo -e "\033[1;31mError:\033[m Please follow the usage template below";
    echo "Usage: gravity $0 [action]";
    echo '[action] = change-contract';
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

source "./src/incs/var.sh" "gravity"

echo "" # new line

echo -e "${STYLE_BOLD}THIS FEATURE MUST NOT BE USED IN PRODUCTION ENVIROMENT${STYLE_DEFAULT}";

echo "" # new line

source "$WORKING_SRC_DIR/incs/utils-common.sh"

source "$WORKING_SRC_DIR/incs/validate-gravity.sh"

source "$WORKING_SRC_DIR/modules/change-contract.sh"

source "$WORKING_SRC_DIR/modules/start-orchestrator.sh"

if [ "$action" = "change-contract" ]; then
    echo "" # new line

    echo -ne "Changing contract...";
fi
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
