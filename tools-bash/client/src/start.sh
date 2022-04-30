#!/bin/bash -i

if [ "$EUID" -ne 0 ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed as root";
    exit 1
fi

clientPath=$(basename $(pwd))
if [ "$clientPath" != "client" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from client folder";
    exit 1
fi

source "./src/incs/var.sh" "start"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/validate.sh"

source "$WORKING_SRC_DIR/incs/validate-start.sh"

source "$WORKING_SRC_DIR/incs/node-params.sh"

source "$WORKING_SRC_DIR/modules/binary-builder.sh"

source "$WORKING_SRC_DIR/modules/configure-node.sh"

source "$WORKING_SRC_DIR/modules/start-node.sh"

source "$WORKING_SRC_DIR/modules/create-validator.sh"

echo ""

echo -e "${STYLE_GREEN}The node was start successful${STYLE_DEFAULT}";
