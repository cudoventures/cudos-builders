#!/bin/bash -i

relayerPath=$(basename $(pwd))
if [ "$relayerPath" != "relayer" ]; then
    echo -e "\033[1;31mError:\033[m The script MUST be executed from relayer folder";
    exit 1
fi

source "./src/incs/var.sh"

source "$WORKING_SRC_DIR/incs/utils.sh"

source "$WORKING_SRC_DIR/incs/validate.sh"

echo "" # new line

echo -e "${STYLE_GREEN}The verification was successful${STYLE_DEFAULT}";
