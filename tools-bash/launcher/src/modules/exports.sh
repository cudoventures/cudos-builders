#!/bin/bash -i

echo "$SEEDS_PUBLIC_PEERS_LIST" > "$WORKING_EXPORT_DIR/seed-node.tendermint.nodeid"
echo "$SENTRIES_PUBLIC_PEERS_LIST" > "$WORKING_EXPORT_DIR/sentry-node.tendermint.nodeid"
echo "$ORCH_02_MNEMONIC" > "$WORKING_EXPORT_DIR/orch-02.mnemonic"
echo "$ORCH_03_MNEMONIC" > "$WORKING_EXPORT_DIR/orch-03.mnemonic"
echo "$GRAVITY_CONTRACT_ADDRESS" > "$WORKING_EXPORT_DIR/gravity-contract-address.txt"\

echo -e "Seed node IDs are: ${STYLE_BOLD}${SEEDS_PUBLIC_PEERS_LIST}${STYLE_DEFAULT}";
echo -e "Sentry node IDs are: ${STYLE_BOLD}${SENTRIES_PUBLIC_PEERS_LIST}${STYLE_DEFAULT}";
echo -e "2nd orchestrator mnemonic is: ${STYLE_BOLD}${ORCH_02_MNEMONIC}${STYLE_DEFAULT}";
echo -e "3nd orchestrator mnemonic is: ${STYLE_BOLD}${ORCH_03_MNEMONIC}${STYLE_DEFAULT}";
echo -e "The gravity contract address is: ${STYLE_BOLD}${GRAVITY_CONTRACT_ADDRESS}${STYLE_DEFAULT}";
echo -e "Genesis file is saved to: ${STYLE_BOLD}${RESULT_GENESIS_PATH}${STYLE_DEFAULT}"

echo "" # new line

echo -e "These values can be always found at ${STYLE_BOLD}${WORKING_EXPORT_DIR}${STYLE_DEFAULT}";
