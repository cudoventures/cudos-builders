#!/bin/bash -i

launcherPath=$(basename $(pwd))
if [ "$launcherPath" != "launcher" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from laucher folder";
    exit 1
fi

source "./src/incs/var.sh"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/validate-script-requirements.sh"

source "$WORKING_SRC_DIR/incs/topology.sh"

source "$WORKING_SRC_DIR/incs/validate-topology.sh"

source "$WORKING_SRC_DIR/modules/load-ssh-keys.sh"

source "$WORKING_SRC_DIR/incs/validate-instances.sh"

echo "" # new line

source "$WORKING_SRC_DIR/modules/start-gravity.sh"

echo "" # new line

source "$WORKING_SRC_DIR/modules/exports-gravity.sh"

echo "" # new line

echo -e "${STYLE_GREEN}The gravity has been started${STYLE_DEFAULT}";
