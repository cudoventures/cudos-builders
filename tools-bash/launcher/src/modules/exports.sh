#!/bin/bash -i

echo "$SEEDS_PUBLIC_PEERS_LIST" > "$WORKING_EXPORT_DIR/seed-node.tendermint.nodeid"
echo "$SENTRIES_PUBLIC_PEERS_LIST" > "$WORKING_EXPORT_DIR/sentry-node.tendermint.nodeid"
echo "$ORCHESTRATOR_MNEMONICS" > "$WORKING_EXPORT_DIR/orchs.mnemonic"
echo "$GRAVITY_CONTRACT_ADDRESS" > "$WORKING_EXPORT_DIR/gravity-contract-address.txt"\

echo -e "Seed node IDs are: ${STYLE_BOLD}${SEEDS_PUBLIC_PEERS_LIST}${STYLE_DEFAULT}";
echo -e "Sentry node IDs are: ${STYLE_BOLD}${SENTRIES_PUBLIC_PEERS_LIST}${STYLE_DEFAULT}";
echo -e "The gravity contract address is: ${STYLE_BOLD}${GRAVITY_CONTRACT_ADDRESS}${STYLE_DEFAULT}";
echo -e "Genesis file is saved to: ${STYLE_BOLD}${RESULT_GENESIS_PATH}${STYLE_DEFAULT}"
echo -e "Orchestrator mnemonics are:\n${STYLE_BOLD}${ORCHESTRATOR_MNEMONICS_LIST}${STYLE_DEFAULT}";

echo "" # new line

echo -e "These values can always be found at ${STYLE_BOLD}${WORKING_EXPORT_DIR}${STYLE_DEFAULT}";
