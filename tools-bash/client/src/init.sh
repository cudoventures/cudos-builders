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

source "./src/incs/var.sh" "init"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/validate.sh"

source "$WORKING_SRC_DIR/incs/validate-init.sh"

source "$WORKING_SRC_DIR/modules/repos.sh"

source "$WORKING_SRC_DIR/incs/node-params.sh"

source "$WORKING_SRC_DIR/modules/process-env.sh"

source "$WORKING_SRC_DIR/modules/clean-docker.sh"

source "$WORKING_SRC_DIR/modules/binary-builder.sh"

source "$WORKING_SRC_DIR/modules/init-node.sh"

echo ""

echo -e "${STYLE_BOLD}Node id:${STYLE_DEFAULT} $TENDERMINT_NODE_ID"

echo ""

echo -e "${STYLE_GREEN}The node was initialized successful${STYLE_DEFAULT}";
