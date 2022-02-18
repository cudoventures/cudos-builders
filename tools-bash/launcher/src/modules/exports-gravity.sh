#!/bin/bash -i

echo "$GRAVITY_CONTRACT_ADDRESS" > "$WORKING_EXPORT_DIR/gravity-smart-contract.address"\

echo -e "The gravity contract address is: ${STYLE_BOLD}${GRAVITY_CONTRACT_ADDRESS}${STYLE_DEFAULT}";

echo "" # new line

echo -e "These values can always be found at ${STYLE_BOLD}${WORKING_EXPORT_DIR}${STYLE_DEFAULT}";
