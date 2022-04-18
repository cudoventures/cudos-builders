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

# result=$(jq ".app_state.nft.collections[].nfts[].approvedAddresses = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
# echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.auth.accounts = (.app_state.auth.accounts | map(select(.\"@type\" != \"/cosmos.vesting.v1beta1.PeriodicVestingAccount\")))" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq "del(.app_state.vesting)" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

if [ "$NETWORK_DRESSREHEARSAL" = "true" ]; then
    result=$(jq ".chain_id = \"cudos-dressrehearsal-2\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
    echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

    setAccountBalanceInCudosAdmin "$WORKING_MIGRATE_DIR/genesis.tmp.json" "cudos19m4ez024zrquym4vsku7gj4z78mdhazera5q2s" "1"

    encodedDenoms=$(jq -r ".app_state.bank.supply[].denom | @base64" "$WORKING_MIGRATE_DIR/genesis.tmp.json");

    result=$(jq ".app_state.bank.supply = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
    echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

    for encodedDenom in $encodedDenoms; do
        decodedDenom=$(echo $encodedDenom | base64 --decode);
        jq ".app_state.bank.balances | map(.coins) | flatten | map(select(.denom == \"$decodedDenom\") | .amount)" "$WORKING_MIGRATE_DIR/genesis.tmp.json" > "$tmpGenesisPath"
        totalSupply=$(sum $tmpGenesisPath)
        result=$(jq ".app_state.bank.supply += [{
            \"amount\": \"$totalSupply\",
            \"denom\": \"$decodedDenom\"
        }]" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
        echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"
    done
fi


\cp -f "$WORKING_MIGRATE_DIR/genesis.tmp.json" "$WORKING_MIGRATE_DIR/genesis.migrated.json"

START_THE_ORCHESTRATOR_AFTER_UPDATE="false"
