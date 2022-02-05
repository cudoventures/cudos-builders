#!/bin/bash -i

targetFolder="$WORKING_DIR/exports"

rm -rf "$targetFolder"
mkdir -p "$targetFolder"

echo "$ORCH_02_MNEMONIC" > "$targetFolder/orch-02.mnemonic"
echo "$ORCH_03_MNEMONIC" > "$targetFolder/orch-03.mnemonic"
echo "$GRAVITY_CONTRACT_ADDRESS" > "$targetFolder/gravity-contract-address.txt"\

echo -e "2nd orchestrator mnemonic is: ${STYLE_BOLD}${ORCH_02_MNEMONIC}${STYLE_DEFAULT}";
echo -e "3nd orchestrator mnemonic is: ${STYLE_BOLD}${ORCH_03_MNEMONIC}${STYLE_DEFAULT}";
echo -e "The gravity contract address is: ${STYLE_BOLD}${GRAVITY_CONTRACT_ADDRESS}${STYLE_DEFAULT}";
echo -e "These values can be always found at ${STYLE_BOLD}${targetFolder}${STYLE_DEFAULT}";
