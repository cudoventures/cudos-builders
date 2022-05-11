#!/bin/bash -i

if [ "$EUID" -ne 0 ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed as root";
    exit 1
fi

relayerPath=$(basename $(pwd))
if [ "$relayerPath" != "relayer" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from relayer folder";
    exit 1
fi

source "./src/incs/var.sh"

rm -rf "$WORKING_EXPORT_DIR"
mkdir -p "$WORKING_EXPORT_DIR"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/validate.sh"

source "$WORKING_SRC_DIR/modules/repos.sh" "start"

source "$WORKING_SRC_DIR/modules/start-relayer.sh" "start"

echo "" # new line

source "$WORKING_SRC_DIR/modules/exports.sh"

echo "" # new line

echo -ne "Starting...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
