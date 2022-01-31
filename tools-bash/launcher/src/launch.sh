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

source "$WORKING_SRC_DIR/incs/validate.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/helpers/topology-helper.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

IP=$(getComputerIp 0)
PORT=$(getComputerPort 0)
USER=$(getComputerUser 0)
SSH_KEY_PATH=$(getComputerSshKeyPath 0)
PASS=$(getComputerPass 0)

DISPLAY=:0 SSH_ASKPASS="$WORKING_SRC_DIR/helpers/ask-pass-helper.sh" ssh-add $SSH_KEY_PATH < /dev/null

# DISPLAY=:0 SSH_ASKPASS="$WORKING_SRC_DIR/helpers/ask-pass-helper.sh" ssh -o "StrictHostKeyChecking no" ${USER}@${IP} -p ${PORT} < /dev/null
ssh -o "StrictHostKeyChecking no" ${USER}@${IP} -p ${PORT} "ls -la"

# Validate software requirements
# Start the nodes
