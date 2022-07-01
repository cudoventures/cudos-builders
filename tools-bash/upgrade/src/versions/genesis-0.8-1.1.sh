#!/bin/bash -i

tmpGenesisPath="/tmp/genesis.tmp.json"

# genesis
\cp -f "$WORKING_MIGRATE_DIR/genesis.migrated.json" "$WORKING_MIGRATE_DIR/genesis.tmp.json"

if [ "$NETWORK_TESTNET_PRIVATE" = "true" ]; then
    result=$(jq ".chain_id = \"$TARGET_CHAIN_ID\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
    echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"
fi


\cp -f "$WORKING_MIGRATE_DIR/genesis.tmp.json" "$WORKING_MIGRATE_DIR/genesis.migrated.json"
