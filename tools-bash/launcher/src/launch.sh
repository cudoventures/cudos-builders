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

source "./src/incs/utils.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/incs/validate-script-requirements.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/incs/topology.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/incs/validate-topology.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/modules/load-ssh-keys.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/incs/validate-instances.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

echo "" # new line

# start root-validator
source "$WORKING_SRC_DIR/modules/start-root-validator.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

echo "" # new line

# start sentries
source "$WORKING_SRC_DIR/modules/start-seeds.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

echo "" # new line

# start seeds
source "$WORKING_SRC_DIR/modules/start-sentries.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

echo "" # new line

echo -e "${STYLE_GREEN}The network has been started${STYLE_DEFAULT}";