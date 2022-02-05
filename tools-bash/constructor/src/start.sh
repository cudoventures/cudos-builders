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

source "./src/incs/var.sh" "start"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/incs/utils.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

if [ "$IS_VALIDATOR"  = "true" ] && [ "$PARAMS_ORCHESTRATOR_ENV_PATH" != "" ]; then
    SHOULD_START_ORCHESTRATOR="true"
fi

source "$WORKING_SRC_DIR/incs/validate.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi;

source "$WORKING_SRC_DIR/modules/start-node.sh"
if [ "$?" != 0 ]; then
    exit $?;
fi

if [ "$SHOULD_START_ORCHESTRATOR" = "true" ]; then
    source "$WORKING_SRC_DIR/modules/start-gravity.sh"
    if [ "$?" != 0 ]; then
        exit $?;
    fi  
fi

echo "" # new line

echo -e "You could inspect the logs of your node by executing: ${STYLE_BOLD}sudo docker logs cudos-start-$NODE_NAME-client-mainnet --tail=32${STYLE_DEFAULT}"

echo "" # new line

echo -ne "Starting...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
