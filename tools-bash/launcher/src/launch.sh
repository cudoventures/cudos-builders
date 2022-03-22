#!/bin/bash -i

launcherPath=$(basename $(pwd))
if [ "$launcherPath" != "launcher" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from laucher folder";
    exit 1
fi

source "./src/incs/var.sh"

rm -rf "$WORKING_EXPORT_DIR"
mkdir -p "$WORKING_EXPORT_DIR"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/validate-script-requirements.sh"

source "$WORKING_SRC_DIR/incs/topology.sh"

source "$WORKING_SRC_DIR/incs/validate-topology.sh"

source "$WORKING_SRC_DIR/incs/validate-staking-json.sh"

source "$WORKING_SRC_DIR/modules/load-ssh-keys.sh"

source "$WORKING_SRC_DIR/incs/validate-instances.sh"

echo "" # new line

source "$WORKING_SRC_DIR/modules/start-root-validator.sh"

echo "" # new line

source "$WORKING_SRC_DIR/modules/start-seeds.sh"

echo "" # new line

source "$WORKING_SRC_DIR/modules/start-sentries.sh"

echo "" # new line

source "$WORKING_SRC_DIR/modules/update-root-validator.sh"

echo "" # new line

source "$WORKING_SRC_DIR/modules/exports-launch.sh"

echo "" # new line

echo -e "${STYLE_GREEN}The network has been started${STYLE_DEFAULT}";
