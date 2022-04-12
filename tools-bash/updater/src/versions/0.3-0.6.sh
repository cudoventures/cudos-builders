#!/bin/bash -i

# genesis
\cp "$WORKING_MIGRATE_DIR/genesis.migrated.json" "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.params.minimum_transfer_to_eth = \"1\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.gravity.params.minimum_fee_transfer_to_eth = \"1200000000000000000000\"" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

result=$(jq ".app_state.nft.collections[].nfts[].approvedAddresses = []" "$WORKING_MIGRATE_DIR/genesis.tmp.json")
echo $result > "$WORKING_MIGRATE_DIR/genesis.tmp.json"

\cp "$WORKING_MIGRATE_DIR/genesis.tmp.json" "$WORKING_MIGRATE_DIR/genesis.migrated.json"

# node env
if [ "$PARAM_NODE_NAME" = "root-node" ]; then
    sed -i "/CUDOS_HOME/d" "$NODE_ENV_PATH"

    echo "MONITORING_ENABLED=\"false\"" >> "$NODE_ENV_PATH"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$NODE_ENV_PATH"
    echo "GRAVITY_MODULE_BALANCE=\"10000000000000000000000000000\"" >> "$NODE_ENV_PATH"
    echo "CUDOS_TOKEN_CONTRACT_ADDRESS=\"0x9fdE6D55dDa637806DbF016a03B6970613630333\"" >> "$NODE_ENV_PATH"
    echo "NUMBER_OF_VALIDATORS=\"3\"" >> "$NODE_ENV_PATH"
    echo "NUMBER_OF_ORCHESTRATORS=\"3\"" >> "$NODE_ENV_PATH"
    echo "VALIDATOR_BALANCE=\"2000000000000000000000000\"" >> "$NODE_ENV_PATH"
    echo "ORCHESTRATOR_BALANCE=\"1000000000000000000000000\"" >> "$NODE_ENV_PATH"
    echo "FAUCET_BALANCE=\"20000000000000000000000000000\"" >> "$NODE_ENV_PATH"
    echo "KEYRING_OS_PASS=\"123123123\"" >> "$NODE_ENV_PATH"
fi

if [ "$PARAM_NODE_NAME" = "seed-node" ]; then
    sed -i "/CUDOS_HOME/d" "$NODE_ENV_PATH"

    echo "SEEDS=\"\"" >> "$NODE_ENV_PATH"
    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$NODE_ENV_PATH"
    echo "MONITORING_ENABLED=\"false\"" >> "$NODE_ENV_PATH"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$NODE_ENV_PATH"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$NODE_ENV_PATH"
fi

if [ "$PARAM_NODE_NAME" = "sentry-node" ]; then
    sed -i "/CUDOS_HOME/d" "$NODE_ENV_PATH"

    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$NODE_ENV_PATH"
    echo "MONITORING_ENABLED=\"false\"" >> "$NODE_ENV_PATH"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$NODE_ENV_PATH"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$NODE_ENV_PATH"
fi

if [ "$PARAM_NODE_NAME" = "full-node" ]; then
    sed -i "/CUDOS_HOME/d" "$NODE_ENV_PATH"

    echo "SHOULD_USE_STATE_SYNC=\"false\"" >> "$NODE_ENV_PATH"
    echo "MONITORING_ENABLED=\"false\"" >> "$NODE_ENV_PATH"
    echo "EXTERNAL_ADDRESS=\"\"" >> "$NODE_ENV_PATH"
    echo "ADDR_BOOK_STRICT=\"true\"" >> "$NODE_ENV_PATH"
fi

# orchestrator env
if [ "$ORCHESTRATOR_ENV_PATH" != '' ]; then
    sed -i "s/FEES=.*/FEES=\"5000000000000acudos\"/g" "$ORCHESTRATOR_ENV_PATH"
fi
