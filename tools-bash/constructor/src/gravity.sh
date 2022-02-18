#!/bin/bash -i

if [ "$EUID" -ne 0 ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed as root";
    exit 1
fi

launcherPath=$(basename $(pwd))
if [ "$launcherPath" != "constructor" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from constructor folder";
    exit 1
fi

source "./src/incs/args.sh" $@

source "./src/incs/var.sh" "start"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/validate.sh"

source "$WORKING_SRC_DIR/modules/start-gravity.sh"  

echo "" # new line

echo -ne "Starting...";
echo -e "${STYLE_GREEN}DONE${STYLE_DEFAULT}";
