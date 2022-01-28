#!/bin/bash -i

launcherPath=$(basename $(pwd))
if [ "$launcherPath" != "constructor" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from constructor folder";
    exit 1
fi

source "./src/incs/args.sh" $@
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "./src/incs/var.sh" "init"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/incs/validate.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/modules/repos.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/modules/init-node.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/modules/export-gentx.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

echo "" # new line

echo -e "This node ID is: ${STYLE_BOLD}$(cat $PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/tendermint.nodeid)${STYLE_DEFAULT}";
echo -e "This node ID can be found at ${STYLE_BOLD}$PARAM_SOURCE_DIR/CudosData/cudos-data-$NODE_NAME-client-mainnet/tendermint.nodeid${STYLE_DEFAULT}";
echo -e "This node ID could always be checked using ${STYLE_BOLD}cudos-noded tendermint show-node-id${STYLE_DEFAULT}";

echo "" # new line

echo -e "You ${STYLE_BOLD}MUST NOT${STYLE_DEFAULT} delete the constructor script nor the destination folder where node's data is. They will be used later on for starting the nodes.";