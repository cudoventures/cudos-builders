#!/bin/bash -i

launcherPath=$(basename $(pwd))
if [ "$launcherPath" != "launcher" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from laucher folder";
    exit 1
fi

source "./src/incs/var.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$LAUNCHER_SRC_DIR/incs/validate.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$LAUNCHER_SRC_DIR/helpers/topology-helper.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

# Validate software requirements
# Start the nodes