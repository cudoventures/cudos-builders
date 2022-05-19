#!/bin/bash -i

tmpGenesisPath="/tmp/genesis.tmp.json"

# genesis
\cp -f "$WORKING_MIGRATE_DIR/genesis.migrated.json" "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_observed_nonce = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_tx_pool_id = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_outgoing_batch_id = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_slashed_logic_call_block = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_slashed_batched_block = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_slashed_valset_nonce = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_un_bonding_block_height = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.last_latest_valset_nonce = \"0\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.valsets = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.valset_confirms = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.batches = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.batch_confirms = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.logic_calls = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.logic_call_confirms = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.attestations = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.unbatched_transfers = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

gravityId=$(echo $RANDOM | sha1sum | head -c 31)
result=$(jq ".app_state.gravity.params.gravity_id = \"$gravityId\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq "del(.app_state.bank.params.send_enabled)" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.wasm.codes = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.wasm.contracts = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.wasm.sequences = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.wasm.gen_msgs = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
    result=$(jq ".chain_id = \"cudos-testnet-private-3\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
    echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

    distributionAddress=$(getModuleAddress "$WORKING_MIGRATE_DIR/genesis.tmp.json" "distribution")
    setAccountBalanceInAcudosWithoutAuthAccount "$WORKING_MIGRATE_DIR/genesis.tmp.json" "$distributionAddress" "255659558937535318690895660"

    result=$(jq ".app_state.gov.voting_params.voting_period = \"21600s\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
    echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

    result=$(jq ".app_state.gov.deposit_params.max_deposit_period = \"21600s\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
    echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

    result=$(jq ".app_state.staking.params.unbonding_time = \"28800s\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
    echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"
fi


\cp -f "$WORKING_MIGRATE_DIR/genesis.tmp.json" "$WORKING_MIGRATE_DIR/genesis.migrated.json"

START_THE_ORCHESTRATOR_AFTER_UPDATE="false"
